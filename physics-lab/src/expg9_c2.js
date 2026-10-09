'use strict';
/* ====================== الثالث المتوسط — الفصل الثاني: المغناطيسية (ch 32, ص 31–46) ======================
   g9_mag_intro · g9_mag_materials · g9_mag_poles · g9_mag_field · g9_mag_through · g9_magnetize
   Shared magnetism renderer MAG9: any set of bar / U / rock magnets (pole model, poles always in pairs) →
   field lines seeded with equal flux, closing inside the magnet (S→N), iron filings, compass grid, compasses, domains. */
LW({ id: 'g9_poles', cat: 32, name: 'الأقطاب المغناطيسية والقوى بينها', fx: 'الأقطاب المتشابهة تتنافر ، الأقطاب المختلفة تتجاذب', sym: 'لكل مغناطيس قطبان: شمالي N (الباحث عن الشمال) وجنوبي S (الباحث عن الجنوب)، عندهما تكون القوة المغناطيسية أعظم ما يمكن. الأقطاب لا توجد منفردة: لو قطّعنا المغناطيس فكل قطعة لها قطبان N و S (ص 36–38).' });
LW({ id: 'g9_flines', cat: 32, name: 'خطوط المجال المغناطيسي', fx: 'خارج المغناطيس: N ⟵ S ... تتجه من N نحو S ، وداخله من S نحو N', sym: 'المجال المغناطيسي هو الحيز المحيط بالمغناطيس الذي يظهر فيه تأثير القوى المغناطيسية. خطوطه مقفلة غير مرئية، تتجه من القطب الشمالي نحو الجنوبي خارج المغناطيس وتكمل دورتها داخله، لا تتقاطع، وتتزاحم قرب الأقطاب. ترسم بالبوصلة أو تكشف ببرادة الحديد (ص 39–40).' });
LW({ id: 'g9_mattypes', cat: 32, name: 'أنواع المواد المغناطيسية', fx: 'دايا: تنافر ضعيف ، بارا: تجاذب ضعيف ، فيرو: تجاذب قوي', sym: 'الدايامغناطيسية (بزموث، إنتيمون، نحاس، سيليكون، فضة) تتنافر مع المغناطيس القوي تنافراً ضعيفاً. البارامغناطيسية (ألمنيوم، كالسيوم، صوديوم، تيتانيوم) تنجذب للمغناطيس القوي تجاذباً ضعيفاً. الفيرومغناطيسية (حديد، فولاذ، نيكل، كوبلت) تنجذب للمغناطيس الاعتيادي ولها قابلية تمغنط عالية (ص 34–35).' });
LW({ id: 'g9_magz', cat: 32, name: 'طرائق التمغنط', fx: 'الدلك ، الحث (التقريب) ، التيار الكهربائي المستمر', sym: 'بالدلك: القطب المتولد في نهاية جهة الدلك مخالف للقطب الدالك. بالحث: الطرف القريب من المغناطيس يصير قطباً مخالفاً والبعيد قطباً مشابهاً. بالتيار: ملف حول الفوالذ يوصل ببطارية فنحصل على مغناطيس كهربائي (ص 42–43).' });
LW({ id: 'g9_emag', cat: 32, name: 'قوة المغناطيس الكهربائي', fx: 'تزداد بزيادة: التيار المستمر ، عدد اللفات ، ونوع المادة', sym: 'مقدار قوة المغناطيس الكهربائي يعتمد على: 1) مقدار التيار المستمر المنساب في الدائرة 2) عدد لفات السلك حول قطعة الفوالذ 3) نوع المادة المراد مغنطتها. ويفقد المغناطيس مغناطيسيته بالطرق القوي والتسخين الشديد (ص 43).' });

const MAG9 = (() => {
  const L = {};
  L.T = (ctx, s, x, y, o) => C2.T(ctx, s, x, y, o);
  L.raw = (ctx, f) => K.raw(ctx, f);
  L.KT = 25;               // model units → tesla (for the field meter)
  L.COL = { N: '#dc2626', S: '#2563eb', line: '#0e7490', fil: '#1f2937' };
  /* ---------- seeded random ---------- */
  L.rng = seed => { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; };
  /* ---------- magnet geometry ----------
     m = { kind:'bar'|'U'|'rock'|'needle', x, y, a (direction of the N end for bar / of the tips for U), L,T (bar) | W,H,t (U), str, flip } */
  L.bar = (x, y, a, Ln, T, str = 1, o = {}) => Object.assign({ kind: 'bar', x, y, a, L: Ln, T, str }, o);
  L.U = (x, y, a, W, H, t, str = 1, o = {}) => Object.assign({ kind: 'U', x, y, a, W, H, t, str }, o);
  L.geo = m => {
    const key = m.kind + '|' + m.x.toFixed(1) + '|' + m.y.toFixed(1) + '|' + m.a.toFixed(4) + '|' + m.L + '|' + m.T + '|' + m.W + '|' + m.H + '|' + m.t + '|' + (m.str ?? 1).toFixed(3) + '|' + (m.flip ? 1 : 0);
    if (m._g && m._g.key === key) return m._g;
    const d = [Math.cos(m.a), Math.sin(m.a)], e = [-d[1], d[0]];
    const W = (lx, lv) => [m.x + lx * e[0] + lv * d[0], m.y + lx * e[1] + lv * d[1]];
    const sg = m.flip ? -1 : 1, str = m.str ?? 1; let poly = [], poles = [], inner = [], tips = [];
    if (m.kind === 'U') {
      const R = m.W / 2, t = m.t, H = m.H, ri = R - t, n = 16, inset = Math.min(.1 * H, t * .5);
      poly.push(W(R, H), W(R, 0)); for (let k = 1; k < n; k++) { const th = k / n * Math.PI; poly.push(W(R * Math.cos(th), -R * Math.sin(th))); }
      poly.push(W(-R, 0), W(-R, H), W(-ri, H), W(-ri, 0)); for (let k = n - 1; k > 0; k--) { const th = k / n * Math.PI; poly.push(W(ri * Math.cos(th), -ri * Math.sin(th))); } poly.push(W(ri, 0), W(ri, H));
      for (let k = 0; k < 4; k++) { const lx = ri + t * (.15 + .7 * k / 3); poles.push([...W(lx, H - inset), str * sg / 4], [...W(-lx, H - inset), -str * sg / 4]); }
      const rm = R - t / 2;
      [-.28, 0, .28].forEach(f => { const r = rm + f * t, pl = []; pl.push(W(-r, H - 2)); pl.push(W(-r, 0)); for (let k = 1; k < n; k++) { const th = Math.PI - k / n * Math.PI; pl.push(W(r * Math.cos(th), -r * Math.sin(th))); } pl.push(W(r, 0)); pl.push(W(r, H - 2)); inner.push(sg > 0 ? pl : pl.reverse()); });
      tips.push({ p: W(rm * sg, H + 2), out: d, s: 'N' }, { p: W(-rm * sg, H + 2), out: d, s: 'S' });
    } else {
      const hl = m.L / 2, ht = m.T / 2, inset = m.kind === 'needle' ? .04 * m.L : .085 * m.L, np = m.kind === 'needle' ? 2 : 5;
      poly = m.kind === 'rock' ? Array.from({ length: 18 }, (_, k) => { const th = k / 18 * TAU, r = 1 + .13 * Math.sin(3 * th + 1) + .08 * Math.sin(5 * th); return W(ht * r * Math.sin(th) * 1.05, hl * r * Math.cos(th)); }) : [W(-ht, -hl), W(ht, -hl), W(ht, hl), W(-ht, hl)];
      for (let k = 0; k < np; k++) { const lx = np === 1 ? 0 : -ht * .7 + 1.4 * ht * k / (np - 1); poles.push([...W(lx, sg * (hl - inset)), str / np], [...W(lx, -sg * (hl - inset)), -str / np]); }
      [-.28, 0, .28].forEach(f => inner.push([W(f * m.T, -sg * (hl - 3)), W(f * m.T, sg * (hl - 3))]));
      tips.push({ p: W(0, sg * (hl + 2)), out: [d[0] * sg, d[1] * sg], s: 'N' }, { p: W(0, -sg * (hl + 2)), out: [-d[0] * sg, -d[1] * sg], s: 'S' });
    }
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; poly.forEach(p => { x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]); x1 = Math.max(x1, p[0]); y1 = Math.max(y1, p[1]); });
    m._g = { key, poly, poles, inner, tips, d, e, W, bb: [x0, y0, x1, y1], sg };
    return m._g;
  };
  L.inPoly = (poly, x, y) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const a = poly[i], b = poly[j]; if ((a[1] > y) !== (b[1] > y) && x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; };
  L.inside = (m, x, y) => { const g = L.geo(m); if (x < g.bb[0] || x > g.bb[2] || y < g.bb[1] || y > g.bb[3]) return false; return L.inPoly(g.poly, x, y); };
  L.insideAny = (mags, x, y) => mags.some(m => !m.ghost && L.inside(m, x, y));
  /* flat pole array [x,y,q,...] (+ optional extra point poles e.g. induced) */
  L.prep = (mags, extra) => { const a = []; mags.forEach(m => { if ((m.str ?? 1) === 0) return; L.geo(m).poles.forEach(p => a.push(p[0], p[1], p[2])); }); if (extra) extra.forEach(p => a.push(p[0], p[1], p[2])); return a; };
  L.Bp = (P, x, y, ext, out) => { let bx = ext ? ext[0] : 0, by = ext ? ext[1] : 0, rm = 1e9;
    for (let i = 0; i < P.length; i += 3) { const dx = x - P[i], dy = y - P[i + 1], r2 = dx * dx + dy * dy + 16; if (r2 < rm) rm = r2; const f = P[i + 2] / (r2 * Math.sqrt(r2)); bx += f * dx; by += f * dy; }
    if (out) out.rm = rm; return [bx, by]; };
  L.B = (mags, x, y, ext) => L.Bp(L.prep(mags), x, y, ext);
  /* tesla for the meter */
  L.tesla = b => [b[0] * L.KT, b[1] * L.KT];
  /* ---------- field lines ---------- */
  L.trace = (P, mags, x, y, dir, rect, ext, maxN = 900) => {
    const pts = [[x, y]], o = {}; let end = 'max';
    for (let i = 0; i < maxN; i++) {
      const b1 = L.Bp(P, x, y, ext, o), m1 = Math.hypot(b1[0], b1[1]); if (m1 < 1e-13) { end = 'zero'; break; }
      const h = clamp(Math.sqrt(o.rm) * .16, 1.6, 6);
      const xm = x + dir * b1[0] / m1 * h / 2, ym = y + dir * b1[1] / m1 * h / 2; const b2 = L.Bp(P, xm, ym, ext), m2 = Math.hypot(b2[0], b2[1]) || 1;
      x += dir * b2[0] / m2 * h; y += dir * b2[1] / m2 * h; pts.push([x, y]);
      if (x < rect[0] - 60 || x > rect[2] + 60 || y < rect[1] - 60 || y > rect[3] + 60) { end = 'out'; break; }
      if (i > 2 && L.insideAny(mags, x, y)) { end = 'mag'; break; }
      if (i > 40 && Math.hypot(x - pts[0][0], y - pts[0][1]) < h * .9) { end = 'loop'; break; }
    }
    return { pts, end };
  };
  /* equal-flux seeds along the outline of every magnet; flux of reference bar calibrates the density */
  L.flux = (P, m, ext) => {
    const g = L.geo(m), out = [], pl = g.poly;
    for (let i = 0; i < pl.length; i++) { const a = pl[i], b = pl[(i + 1) % pl.length]; const len = Math.hypot(b[0] - a[0], b[1] - a[1]); if (len < .01) continue; let nx = (b[1] - a[1]) / len, ny = -(b[0] - a[0]) / len;
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2; if (L.inPoly(pl, mx + nx * 1.5, my + ny * 1.5)) { nx = -nx; ny = -ny; }
      const n = Math.max(1, Math.ceil(len / 3)); for (let k = 0; k < n; k++) { const f = (k + .5) / n, x = a[0] + (b[0] - a[0]) * f + nx * 2.2, y = a[1] + (b[1] - a[1]) * f + ny * 2.2; const B = L.Bp(P, x, y, ext); out.push([x, y, (B[0] * nx + B[1] * ny) * len / n]); } }
    return out;
  };
  L._ref = null;
  L.refFlux = () => { if (L._ref) return L._ref; const m = L.bar(0, 0, 0, 150, 34, 1); const P = L.prep([m]); L._ref = L.flux(P, m).reduce((s, q) => s + Math.max(0, q[2]), 0); return L._ref; };
  L.seeds = (samples, n, sign) => { const S = samples.filter(q => q[2] * sign > 0); const tot = S.reduce((s, q) => s + Math.abs(q[2]), 0); if (!n || !tot) return []; const res = []; let acc = 0, k = 0; const step = tot / n;
    for (const q of S) { const f = Math.abs(q[2]); while (k < n && acc + f >= (k + .5) * step) { res.push([q[0], q[1]]); k++; } acc += f; } return res; };
  /* lines(mags, rect, {n: lines for a str=1 bar, ext}) → cached [{pts, end}] */
  L.lines = (C, mags, rect, o = {}) => {
    const key = mags.map(m => L.geo(m).key + (m.ghost ? 'g' : '')).join('#') + '|' + rect.map(v => v | 0).join(',') + '|' + (o.n || 16) + '|' + (o.ext ? o.ext.map(v => v.toExponential(2)).join(',') : '');
    if (C.key === key) return C.res;
    const P = L.prep(mags, o.extra), solid = mags.filter(m => !m.ghost), res = []; const dens = (o.n || 16) / L.refFlux();
    solid.forEach(m => { if ((m.str ?? 1) === 0 || m.noLines) return; const fl = L.flux(P, m, o.ext); const pos = fl.reduce((s, q) => s + Math.max(0, q[2]), 0), neg = fl.reduce((s, q) => s + Math.max(0, -q[2]), 0);
      L.seeds(fl, Math.round(pos * dens), 1).forEach(s => { const t = L.trace(P, solid, s[0], s[1], 1, rect, o.ext); if (t.pts.length > 3) res.push(t); });
      L.seeds(fl, Math.round(neg * dens), -1).forEach(s => { const t = L.trace(P, solid, s[0], s[1], -1, rect, o.ext); if (t.end !== 'mag' && t.pts.length > 3) { t.pts.reverse(); res.push(t); } }); });
    C.key = key; C.res = res; return res;
  };
  L.arrowHead = (ctx, x, y, a, s, col) => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(s, 0); ctx.lineTo(-s * .8, -s * .75); ctx.lineTo(-s * .35, 0); ctx.lineTo(-s * .8, s * .75); ctx.closePath(); ctx.fill(); ctx.restore(); };
  L.arrowsOn = (ctx, pts, col, s = 6, every = 170, phase = 0) => {
    let tot = 0; for (let i = 1; i < pts.length; i++) tot += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (tot < 30) return;
    const marks = tot < every * 1.5 ? [tot / 2] : []; if (!marks.length) for (let s0 = (every / 2 + phase) % every; s0 < tot; s0 += every) marks.push(s0);
    let acc = 0, mi = 0; for (let i = 1; i < pts.length && mi < marks.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); while (mi < marks.length && acc + l >= marks[mi]) { const f = (marks[mi] - acc) / (l || 1); L.arrowHead(ctx, pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f, Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0]), s, col); mi++; } acc += l; }
  };
  L.drawLines = (ctx, lines, o = {}) => L.raw(ctx, () => {
    const col = o.col || L.COL.line; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.strokeStyle = col; ctx.globalAlpha = o.alpha ?? .9; ctx.lineWidth = o.lw || 1.6; ctx.beginPath();
    lines.forEach(l => { const p = l.pts; ctx.moveTo(p[0][0], p[0][1]); for (let i = 1; i < p.length; i++) ctx.lineTo(p[i][0], p[i][1]); }); ctx.stroke();
    if (o.flow) { ctx.globalAlpha = .85; ctx.strokeStyle = o.flowCol || '#22d3ee'; ctx.lineWidth = (o.lw || 1.6) + 1.2; ctx.setLineDash([5, 13]); ctx.lineDashOffset = -o.flow * 26; ctx.beginPath(); lines.forEach(l => { const p = l.pts; ctx.moveTo(p[0][0], p[0][1]); for (let i = 1; i < p.length; i++) ctx.lineTo(p[i][0], p[i][1]); }); ctx.stroke(); ctx.setLineDash([]); }
    ctx.globalAlpha = 1; if (o.arrows !== false) lines.forEach(l => L.arrowsOn(ctx, l.pts, col, o.as || 5.5, o.every || 170));
  });
  L.drawInner = (ctx, mags, o = {}) => L.raw(ctx, () => { const col = o.col || L.COL.line; mags.forEach(m => { if ((m.str ?? 1) === 0 || m.ghost) return; const g = L.geo(m);
    g.inner.forEach(pl => { ctx.strokeStyle = col; ctx.globalAlpha = .75; ctx.lineWidth = 1.4; ctx.setLineDash([4, 3]); ctx.beginPath(); pl.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1; L.arrowsOn(ctx, pl, col, 5, 9999); }); }); });
  /* ---------- iron filings ---------- */
  L._fp = null;
  L.filPts = () => { if (L._fp) return L._fp; const r = L.rng(7), a = []; for (let i = 0; i < 14000; i++) a.push({ u: r(), v: r(), q: r(), a0: r() * Math.PI, l: .7 + .6 * r(), dl: r() }); L._fp = a; return a; };
  /* compute visible filings for rect; C = cache object; o.ref = |B| (model) that saturates the density */
  L.filings = (C, mags, rect, o = {}) => {
    const key = mags.map(m => L.geo(m).key).join('#') + '|' + rect.map(v => v | 0).join(',') + '|' + (o.dens || 1) + (o.ext ? o.ext.join(',') : '') + '|' + (o.extraKey || '');
    if (C.key === key) return C.res;
    const P = L.prep(mags, o.extra), W = rect[2] - rect[0], H = rect[3] - rect[1], n = Math.min(14000, Math.round(W * H / 46 * (o.dens || 1))), pts = L.filPts(), res = [], ref = o.ref || 2.2e-4;
    for (let i = 0; i < n; i++) { const q = pts[i], x = rect[0] + q.u * W, y = rect[1] + q.v * H; if (L.insideAny(mags, x, y)) continue; if (o.skip && o.skip(x, y)) continue;
      const b = L.Bp(P, x, y, o.ext), m = Math.hypot(b[0], b[1]); const p = clamp(.05 + .95 * Math.sqrt(m / ref), 0, 1); if (q.q > p) continue;
      res.push([x, y, Math.atan2(b[1], b[0]), q.l * (4 + 4 * clamp(Math.sqrt(m / ref), 0, 1.2)), q.a0, q.dl, i]); }
    C.key = key; C.res = res; return res;
  };
  /* draw filings; o.settle 0..1 (tapping aligns them), o.mask(i,x,y) visibility */
  L.drawFilings = (ctx, F, o = {}) => L.raw(ctx, () => {
    const st0 = o.settle ?? 1; ctx.strokeStyle = o.col || '#27272a'; ctx.lineWidth = o.lw || 1.25; ctx.globalAlpha = o.alpha || .85; ctx.lineCap = 'round'; ctx.beginPath();
    for (const f of F) { if (o.mask && !o.mask(f)) continue; let a = f[2]; const st = o.alA ? o.alA[f[6]] : st0; if (st < 1) { const k = o.alA ? st : clamp((st - f[5] * .35) / .65, 0, 1), e = k * k * (3 - 2 * k); let da = a - f[4]; da = ((da + Math.PI / 2) % Math.PI + Math.PI) % Math.PI - Math.PI / 2; a = f[4] + da * e; }
      const c = Math.cos(a) * f[3] / 2, s = Math.sin(a) * f[3] / 2; ctx.moveTo(f[0] - c, f[1] - s); ctx.lineTo(f[0] + c, f[1] + s); }
    ctx.stroke(); ctx.globalAlpha = 1; ctx.lineCap = 'butt';
  });
  /* ---------- compass needles ---------- */
  L.needle = (ctx, x, y, a, len, alpha = 1, o = {}) => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.globalAlpha = alpha; const w = o.w || len * .17;
    ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(len, 0); ctx.lineTo(0, -w); ctx.lineTo(0, w); ctx.closePath(); ctx.fill();
    ctx.fillStyle = o.sCol || '#cbd5e1'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(-len, 0); ctx.lineTo(0, -w); ctx.lineTo(0, w); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); };
  L.cgrid = (ctx, mags, rect, o = {}) => L.raw(ctx, () => { const P = L.prep(mags, o.extra), sp = o.sp || 40, ref = o.ref || 1.2e-4;
    for (let y = rect[1] + sp / 2; y < rect[3]; y += sp) for (let x = rect[0] + sp / 2; x < rect[2]; x += sp) { if (L.insideAny(mags, x, y) || (o.skip && o.skip(x, y))) continue; const b = L.Bp(P, x, y, o.ext), m = Math.hypot(b[0], b[1]); if (m < 1e-14) continue;
      L.needle(ctx, x, y, Math.atan2(b[1], b[0]), sp * .36, clamp(Math.pow(m / ref, .35), .18, 1)); } ctx.globalAlpha = 1; });
  /* damped needle (st.a angle, st.w angular velocity) */
  L.turn = (st, target, dt, k = 60, c = 6) => { const n = 4, h = Math.min(dt, .05) / n; for (let i = 0; i < n; i++) { let d = target - st.a; d = Math.atan2(Math.sin(d), Math.cos(d)); st.w += (k * Math.sin(d) - c * st.w) * h; st.a += st.w * h; } };
  /* realistic brass compass (book fig 6): needle angle a, dial rotation rot */
  L.compass = (ctx, x, y, r, a, o = {}) => L.raw(ctx, () => {
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.3)'; ctx.shadowBlur = r * .25; ctx.shadowOffsetY = r * .08;
    const g = ctx.createRadialGradient(x - r * .3, y - r * .3, r * .2, x, y, r * 1.1); g.addColorStop(0, '#fde68a'); g.addColorStop(.6, '#ca8a04'); g.addColorStop(1, '#713f12');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore();
    if (o.ring) { ctx.strokeStyle = '#a16207'; ctx.lineWidth = r * .09; ctx.beginPath(); ctx.arc(x, y - r * 1.12, r * .14, 0, TAU); ctx.stroke(); }
    const fr = r * .84; const fg = ctx.createRadialGradient(x, y, fr * .1, x, y, fr); fg.addColorStop(0, '#fffdf5'); fg.addColorStop(1, '#efe6cf'); ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(x, y, fr, 0, TAU); ctx.fill();
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
    if (r > 26) { ctx.strokeStyle = '#3f3f46'; for (let k = 0; k < 72; k++) { const aa = k * TAU / 72, l = k % 9 === 0 ? .14 : k % 3 === 0 ? .09 : .05; ctx.lineWidth = k % 9 === 0 ? 1.4 : .7; ctx.beginPath(); ctx.moveTo(Math.cos(aa) * fr * .97, Math.sin(aa) * fr * .97); ctx.lineTo(Math.cos(aa) * fr * (.97 - l), Math.sin(aa) * fr * (.97 - l)); ctx.stroke(); } }
    const lab = [['N', -Math.PI / 2, '#b91c1c'], ['E', 0, '#1f2937'], ['S', Math.PI / 2, '#1f2937'], ['W', Math.PI, '#1f2937']];
    if (r > 20) { ctx.font = '900 ' + Math.round(r * .22) + 'px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr'; lab.forEach(([t, aa, c]) => { ctx.fillStyle = c; ctx.save(); ctx.translate(Math.cos(aa) * fr * .66, Math.sin(aa) * fr * .66); ctx.rotate(aa + Math.PI / 2); ctx.fillText(t, 0, 0); ctx.restore(); }); }
    ctx.restore();
    L.needle(ctx, x, y, a, fr * .78, 1, { w: fr * .11, sCol: '#e5e7eb' });
    ctx.fillStyle = '#a16207'; ctx.beginPath(); ctx.arc(x, y, fr * .08, 0, TAU); ctx.fill(); ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.arc(x - fr * .02, y - fr * .02, fr * .035, 0, TAU); ctx.fill();
    const gl = ctx.createLinearGradient(x - fr, y - fr, x + fr * .2, y + fr * .2); gl.addColorStop(0, 'rgba(255,255,255,.55)'); gl.addColorStop(.5, 'rgba(255,255,255,.05)'); gl.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(x, y, fr, 0, TAU); ctx.fill();
  });
  /* small plotting compass (glass top, no dial) */
  L.miniCompass = (ctx, x, y, r, a) => L.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 4; ctx.shadowOffsetY = 1.5; const g = ctx.createRadialGradient(x - r * .3, y - r * .3, 1, x, y, r); g.addColorStop(0, '#fef3c7'); g.addColorStop(1, '#b45309'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore();
    ctx.fillStyle = '#fffbeb'; ctx.beginPath(); ctx.arc(x, y, r * .8, 0, TAU); ctx.fill(); L.needle(ctx, x, y, a, r * .7, 1, { w: r * .16 }); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(x, y, r * .1, 0, TAU); ctx.fill(); });
  /* ---------- magnet drawing ---------- */
  L.pathPoly = (ctx, pl) => { ctx.beginPath(); pl.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); };
  L.drawMag = (ctx, m, o = {}) => L.raw(ctx, () => {
    const g = L.geo(m); const dim = (m.str ?? 1) === 0;
    if (o.shadow !== false) { ctx.save(); ctx.translate(4, 6); ctx.fillStyle = 'rgba(15,23,42,.18)'; L.pathPoly(ctx, g.poly); ctx.fill(); ctx.restore(); }
    if (m.kind === 'U') { L.drawU(ctx, m, g, o); }
    else if (m.kind === 'rock') {
      const rg = ctx.createRadialGradient(m.x - m.T * .2, m.y - m.T * .3, 2, m.x, m.y, m.L * .6); rg.addColorStop(0, '#6b7280'); rg.addColorStop(.5, '#27272a'); rg.addColorStop(1, '#09090b'); ctx.fillStyle = rg; L.pathPoly(ctx, g.poly); ctx.fill();
      const r = L.rng(3); ctx.fillStyle = 'rgba(203,213,225,.35)'; for (let k = 0; k < 26; k++) { const u = r() - .5, v = r() - .5; const p = g.W(u * m.T * .8, v * m.L * .8); ctx.beginPath(); ctx.arc(p[0], p[1], 1 + r() * 2, 0, TAU); ctx.fill(); }
    } else {
      const hl = m.L / 2, ht = m.T / 2; ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(m.a - Math.PI / 2);   // local: +y = N end (lv), x = lx
      const sg = g.sg; const half = (s, col) => { const gg = ctx.createLinearGradient(-ht, 0, ht, 0); gg.addColorStop(0, shade(col, -55)); gg.addColorStop(.35, shade(col, 35)); gg.addColorStop(.6, col); gg.addColorStop(1, shade(col, -45)); ctx.fillStyle = gg; ctx.fillRect(-ht, s > 0 ? 0 : -hl, 2 * ht, hl); };
      if (m.kind === 'needle' && m.plain) { const gg = ctx.createLinearGradient(-ht, 0, ht, 0); gg.addColorStop(0, '#64748b'); gg.addColorStop(.4, '#e2e8f0'); gg.addColorStop(1, '#475569'); ctx.fillStyle = gg; ctx.fillRect(-ht, -hl, 2 * ht, 2 * hl); }
      else { half(sg, dim ? '#94a3b8' : (o.nCol || L.COL.N)); half(-sg, dim ? '#cbd5e1' : (o.sCol || L.COL.S)); }
      ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.fillRect(-ht * .55, -hl + 2, ht * .35, 2 * hl - 4);
      ctx.strokeStyle = 'rgba(15,23,42,.55)'; ctx.lineWidth = 1; ctx.strokeRect(-ht, -hl, 2 * ht, 2 * hl);
      ctx.restore();
      if (o.labels !== false && !(m.kind === 'needle' && m.plain) && m.T >= 12 && !dim) { const fs = clamp(m.T * .55, 10, 22); const pN = g.W(0, sg * (hl - fs * .9)), pS = g.W(0, -sg * (hl - fs * .9));
        ctx.font = '900 ' + fs + 'px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr'; ctx.fillStyle = '#fff'; ctx.fillText('N', pN[0], pN[1] + 1); ctx.fillText('S', pS[0], pS[1] + 1); ctx.textBaseline = 'alphabetic'; }
    }
  });
  L.drawU = (ctx, m, g, o) => {
    const R = m.W / 2, t = m.t, H = m.H, ri = R - t; const sg = g.sg;
    // body: grey (book fig 14) or two coloured halves (book questions) — style o.uStyle: 'tips' | 'halves' | 'red'
    const st = o.uStyle || m.uStyle || 'halves';
    const side = (s) => { const pl = []; const n = 10; pl.push(g.W(s * R, H), g.W(s * R, 0)); for (let k = 1; k <= n; k++) { const th = (s > 0 ? 0 : Math.PI) + s * k / n * Math.PI / 2; pl.push(g.W(R * Math.cos(th), -R * Math.sin(th))); } for (let k = n; k >= 0; k--) { const th = (s > 0 ? 0 : Math.PI) + s * k / n * Math.PI / 2; pl.push(g.W(ri * Math.cos(th), -ri * Math.sin(th))); } pl.push(g.W(s * ri, H)); return pl; };
    const fillSide = (s, col) => { const pl = side(s); const c = g.W(s * (R - t / 2), H * .4), c2 = g.W(s * (R + t * .6), H * .4); const gg = ctx.createLinearGradient(c[0] - (c2[0] - c[0]), c[1] - (c2[1] - c[1]), c2[0], c2[1]); gg.addColorStop(0, shade(col, 30)); gg.addColorStop(.5, col); gg.addColorStop(1, shade(col, -50)); ctx.fillStyle = gg; L.pathPoly(ctx, pl); ctx.fill(); };
    const colR = st === 'halves' ? (sg > 0 ? L.COL.N : L.COL.S) : st === 'red' ? '#dc2626' : '#3f3f46', colL = st === 'halves' ? (sg > 0 ? L.COL.S : L.COL.N) : st === 'red' ? '#dc2626' : '#3f3f46';
    fillSide(1, colR); fillSide(-1, colL);
    if (st !== 'halves') { const tl = Math.min(H * .32, t * 1.3); [[1, sg > 0 ? 'N' : 'S'], [-1, sg > 0 ? 'S' : 'N']].forEach(([s, p]) => { const col = st === 'red' ? '#d4d4d8' : (p === 'N' ? L.COL.N : L.COL.S); const pl = [g.W(s * R, H), g.W(s * R, H - tl), g.W(s * ri, H - tl), g.W(s * ri, H)]; const gg = ctx.createLinearGradient(pl[0][0], pl[0][1], pl[2][0], pl[2][1]); gg.addColorStop(0, shade(col, -40)); gg.addColorStop(.5, shade(col, 25)); gg.addColorStop(1, shade(col, -30)); ctx.fillStyle = gg; L.pathPoly(ctx, pl); ctx.fill(); }); }
    ctx.strokeStyle = 'rgba(15,23,42,.5)'; ctx.lineWidth = 1; L.pathPoly(ctx, g.poly); ctx.stroke();
    if (o.labels !== false) { const fs = clamp(t * .5, 10, 20); ctx.font = '900 ' + fs + 'px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr'; ctx.fillStyle = '#fff';
      const pN = g.W(sg * (R - t / 2), H - fs * .9), pS = g.W(-sg * (R - t / 2), H - fs * .9); ctx.fillText('N', pN[0], pN[1]); ctx.fillText('S', pS[0], pS[1]); ctx.textBaseline = 'alphabetic'; }
  };
  /* ---------- small objects ---------- */
  L.clip = (ctx, x, y, a, s = 1, col = '#94a3b8') => L.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s); ctx.strokeStyle = shade(col, -40); ctx.lineWidth = 2.6; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const p = () => { ctx.beginPath(); ctx.moveTo(-3, 5); ctx.lineTo(-3, -8); ctx.arc(0, -8, 3, Math.PI, 0); ctx.lineTo(3, 9); ctx.arc(-.5, 9, 3.5, 0, Math.PI); ctx.lineTo(-4, -10); ctx.arc(.5, -10, 4.5, Math.PI, 0); ctx.lineTo(5, 6); };
    p(); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = 1.3; p(); ctx.stroke(); ctx.restore(); });
  L.nail = (ctx, x, y, a, len, o = {}) => L.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); const w = o.w || Math.max(2.8, len * .09); const gg = ctx.createLinearGradient(0, -w, 0, w); gg.addColorStop(0, '#cbd5e1'); gg.addColorStop(.45, o.col || '#64748b'); gg.addColorStop(1, '#1e293b'); ctx.fillStyle = gg;
    ctx.beginPath(); ctx.moveTo(-len / 2, -w / 2); ctx.lineTo(len / 2 - w * 1.6, -w / 2); ctx.lineTo(len / 2, 0); ctx.lineTo(len / 2 - w * 1.6, w / 2); ctx.lineTo(-len / 2, w / 2); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#334155'; rr(ctx, -len / 2 - w * .6, -w * 1.25, w * .7, w * 2.5, 1); ctx.fill(); ctx.restore(); });
  L.pin = (ctx, x, y, a, len) => L.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(-len / 2, 0); ctx.lineTo(len / 2, 0); ctx.stroke(); ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(-len / 2, 0, 2.8, 0, TAU); ctx.fill(); ctx.restore(); });
  /* fist gripping a magnet (book fig 13): x,y = centre of the grip, a = direction the arm comes FROM */
  L.fist = (ctx, x, y, a, s = 1, o = {}) => L.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s);
    const sl = ctx.createLinearGradient(0, -16, 0, 16); sl.addColorStop(0, '#60a5fa'); sl.addColorStop(1, '#1d4ed8'); ctx.fillStyle = o.sleeve || sl; rr(ctx, 26, -15, 70, 30, 7); ctx.fill();
    ctx.fillStyle = '#f2c29b'; ctx.fillRect(14, -11, 16, 22);
    const sk = ctx.createRadialGradient(-4, -8, 3, 0, 0, 26); sk.addColorStop(0, '#fde2c4'); sk.addColorStop(1, '#e0a77c'); ctx.fillStyle = sk; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 1.1;
    ctx.beginPath(); ctx.ellipse(2, 0, 21, 17, 0, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = 'rgba(146,64,14,.55)'; for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(-17, k * 8.5); ctx.quadraticCurveTo(-8, k * 8.5 + 2, -2, k * 8.5); ctx.stroke(); }
    ctx.fillStyle = '#f5c9a3'; ctx.strokeStyle = '#b45309'; ctx.beginPath(); ctx.ellipse(-6, -14, 13, 6, -.15, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); });
  /* domains (small magnets) in a box: cells = [{a}] laid in nx×ny grid */
  L.domains = (ctx, x, y, w, h, cells, nx, ny, o = {}) => L.raw(ctx, () => { const cw = w / nx, ch = h / ny;
    cells.forEach((c, i) => { const cx = x + (i % nx + .5) * cw, cy = y + (Math.floor(i / nx) + .5) * ch, l = Math.min(cw, ch) * .42; if (o.cells !== false) { ctx.strokeStyle = 'rgba(100,116,139,.35)'; ctx.lineWidth = .8; ctx.strokeRect(cx - cw / 2, cy - ch / 2, cw, ch); }
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(c.a); ctx.fillStyle = L.COL.N; ctx.fillRect(0, -l * .22, l, l * .44); ctx.fillStyle = L.COL.S; ctx.fillRect(-l, -l * .22, l, l * .44); ctx.restore(); }); });
  /* order parameter of domain array along angle a */
  L.order = (cells, a = 0) => cells.reduce((s, c) => s + Math.cos(c.a - a), 0) / (cells.length || 1);
  /* uniform-field lines through a cylinder / shell of permeability mu (2D exact solution) — book fig 7 */
  L.cylField = (mu, a, b, B0) => {
    // potential f(r) cosθ: inner A r ; shell C r + D/r ; outer -B0 r + E/r  (H = -grad)
    a = Math.max(a, b * 1e-4); const M = [[a, -a, -1 / a, 0, 0], [1, -mu, mu / (a * a), 0, 0], [0, b, 1 / b, -1 / b, -B0 * b], [0, mu, -mu / (b * b), 1 / (b * b), -B0]];
    for (let c = 0; c < 4; c++) { let p = c; for (let r = c + 1; r < 4; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r; [M[c], M[p]] = [M[p], M[c]]; for (let r = 0; r < 4; r++) if (r !== c) { const f = M[r][c] / M[c][c]; for (let k = c; k < 5; k++) M[r][k] -= f * M[c][k]; } }
    const A = M[0][4] / M[0][0], C = M[1][4] / M[1][1], D = M[2][4] / M[2][2], E = M[3][4] / M[3][3];
    return (x, y) => { const r = Math.hypot(x, y) || 1e-6, c = x / r, s = y / r; let f, fp, m = 1;
      if (r < a) { f = -A * r; fp = -A; m = 1; } else if (r < b) { f = -(C * r + D / r); fp = -(C - D / (r * r)); m = mu; } else { f = B0 * r - E / r; fp = B0 + E / (r * r); m = 1; }
      const Hr = fp * c, Ht = -f / r * s; return [m * (Hr * c - Ht * s), m * (Hr * s + Ht * c)]; };
  };
  L.traceF = (F, x, y, rect, h = 3, maxN = 700) => { const pts = [[x, y]]; for (let i = 0; i < maxN; i++) { const b = F(x, y), m = Math.hypot(b[0], b[1]) || 1; const xm = x + b[0] / m * h / 2, ym = y + b[1] / m * h / 2; const b2 = F(xm, ym), m2 = Math.hypot(b2[0], b2[1]) || 1; x += b2[0] / m2 * h; y += b2[1] / m2 * h; pts.push([x, y]); if (x < rect[0] || x > rect[2] || y < rect[1] || y > rect[3]) break; } return pts; };
  /* panel / button helpers */
  L.card = (ctx, x, y, w, h, o) => C2.card(ctx, x, y, w, h, o || {});
  L.btn = (ctx, b, label, o) => C2.btn(ctx, b.x, b.y, b.w, b.h, label, o || {});
  L.btnObj = (id, b, click, o = {}) => Object.assign({ id, x: b.x, y: b.y, w: b.w, h: b.h, tip: o.tip || 'اضغط', hint: !!o.hint, click }, o.idle ? { idle: o.idle } : {});
  L.banner = (ctx, w, s, col = '#0e7490', y = 20) => C2.T(ctx, s, 72, y, { s: w < 520 ? 11.5 : 13, w: 900, c: '#fff', bg: col, a: 'left' });
  L.extra = (ctx, w, s) => C2.T(ctx, '➕ من المختبرات العالمية' + (s ? ': ' + s : ''), 72, 20, { s: w < 520 ? 11.5 : 13, w: 900, c: '#fff', bg: '#7c3aed', a: 'left' });
  L.lines2 = (ctx, Ls, x, y, wd, o) => C2.lines(ctx, Ls, x, y, wd, Object.assign({ bd: '#0e7490' }, o || {}));
  L.cx = w => (w + 64) / 2;
  L.sc = (w, h) => clamp(Math.min((w - 64) / 760, h / 700), .5, 1.25);
  /* pickup engine: items {x,y,a,kind,ferro,st:'rest'|'fly'|'att'|'fall',hx,hy,..}; tips from magnets; gravity hangs */
  L.tipsOf = mags => { const T = []; mags.forEach((m, mi) => { if ((m.str ?? 1) === 0) return; L.geo(m).tips.forEach((t, k) => T.push({ mi, k, p: t.p, out: t.out, str: m.str ?? 1 })); }); return T; };
  L.slotPos = (tip, j, len) => { const row = Math.floor(j / 3), col = j % 3 - 1; const dn = [0, 1]; // hang downward (gravity)
    const ox = col * len * .42 * (1 - row * .12) + tip.out[0] * len * .25, oy = row * len * .8 + len * .5 + Math.max(0, tip.out[1]) * len * .2; return [tip.p[0] + ox * 1 + dn[0], tip.p[1] + oy, col * .25 * (1 - row * .2)]; };
  L.pick = (S, mags, items, dt, o = {}) => {
    const T = L.tipsOf(mags), P = L.prep(mags), cap = o.cap || 6, len = o.len || 26, by = o.benchY, th = o.th || 5e-5;
    const used = {}; items.forEach(it => { if (it.st === 'att' || it.st === 'fly') { const k = it.tip; used[k] = (used[k] || 0) + 1; } });
    items.forEach(it => {
      if (it.st === 'rest') { if (!it.ferro) return; const b = L.Bp(P, it.x, it.y), m = Math.hypot(b[0], b[1]); if (m * (it.k || 1) < th) return;
        let best = null, bd = 1e9; T.forEach(t => { const key = t.mi + ':' + t.k; if ((used[key] || 0) >= Math.round(cap * t.str * (o.capF || 1))) return; const d = Math.hypot(t.p[0] - it.x, t.p[1] - it.y); if (d < bd) { bd = d; best = t; } });
        if (best && bd < (o.reach || 140)) { const key = best.mi + ':' + best.k; it.tip = key; it.slot = used[key] || 0; used[key] = it.slot + 1; it.st = 'fly'; it.f = 0; it.sx = it.x; it.sy = it.y; it.sa = it.a; if (o.onAttach) o.onAttach(it); } }
      else if (it.st === 'fly' || it.st === 'att') { const t = T.find(q => q.mi + ':' + q.k === it.tip); if (!t) { it.st = 'fall'; it.vy = 0; return; } const sp = L.slotPos(t, it.slot, len);
        if (it.st === 'fly') { it.f = Math.min(1, it.f + dt * 4.5); const e = it.f * it.f; it.x = it.sx + (sp[0] - it.sx) * e; it.y = it.sy + (sp[1] - it.sy) * e; it.a = it.sa + (Math.PI / 2 + sp[2] - it.sa) * e; if (it.f >= 1) it.st = 'att'; }
        else { it.x += (sp[0] - it.x) * Math.min(1, dt * 18); it.y += (sp[1] - it.y) * Math.min(1, dt * 18); it.a += (Math.PI / 2 + sp[2] + Math.sin(S.t * 3 + it.slot) * .04 - it.a) * Math.min(1, dt * 8); } }
      else if (it.st === 'fall') { it.vy = (it.vy || 0) + 1400 * dt; it.y += it.vy * dt; it.a += (it.ra - it.a) * Math.min(1, dt * 6); if (it.y >= it.y0) { it.y = it.y0; it.st = 'rest'; it.vy = 0; } }
    });
  };
  L.dropAll = items => items.forEach(it => { if (it.st === 'att' || it.st === 'fly') { it.st = 'fall'; it.vy = 0; it.tip = null; } });
  L.drawItem = (ctx, it, s = 1) => { if (it.kind === 'clip') L.clip(ctx, it.x, it.y, it.a, s); else if (it.kind === 'nail') L.nail(ctx, it.x, it.y, it.a, 34 * s); else if (it.kind === 'pin') L.pin(ctx, it.x, it.y, it.a, 24 * s); else if (it.kind === 'needle') L.nail(ctx, it.x, it.y, it.a, 30 * s, { w: 1.6, col: '#94a3b8' }); };
  return L;
})();
/* register a part of this chapter */
const P92 = D => { D.ch = 32; M8.P[D.id] = D; return D; };
/* merged experiment of this chapter: adds E.field (compass / field-meter tools) dispatching to the current part */
const M92 = M => { const E = M8.merge(Object.assign({ ch: 32, reg: X9 }, M));
  E.field = (S, x, y) => { const s = S._subs && S._subs[S._part], D = M8.P[S._part]; if (!s || !D || !D.field) return null; const b = D.field(s, x, y); return b ? MAG9.tesla(b) : null; };
  E.fieldRef = S => { const D = M8.P[S._part]; return D && D.fref ? D.fref : 3e-3; };
  return E; };
/* field-scene helper shared by many parts */
const MF9 = {
  rect: (w, h) => [64, 40, w, h - 38],
  cache(s, id) { s._c = s._c || {}; return (s._c[id] = s._c[id] || { l: {}, f: {}, h: {} }); },
  clip(ctx, rect, f) { ctx.save(); ctx.beginPath(); ctx.rect(rect[0], rect[1], rect[2] - rect[0], rect[3] - rect[1]); ctx.clip(); try { f(); } finally { ctx.restore(); } },
  /* o: {lines, inner, fil, cg, flow, ext, n, col, heat, magO, noMag} */
  draw(ctx, s, id, mags, rect, o = {}) {
    const c = MF9.cache(s, id);
    MF9.clip(ctx, rect, () => {
      if (o.heat) MF9.heat(ctx, c, mags, rect, o);
      if (o.fil) MAG9.drawFilings(ctx, MAG9.filings(c.f, mags, rect, { ext: o.ext, dens: o.dens, extra: o.extra, extraKey: o.extraKey }), { settle: o.settle });
      if (o.cg) MAG9.cgrid(ctx, mags, rect, { ext: o.ext, sp: o.sp, extra: o.extra, ref: o.cgRef });
      if (o.lines) MAG9.drawLines(ctx, MAG9.lines(c.l, mags, rect, { n: o.n, ext: o.ext, extra: o.extra }), { col: o.col, flow: o.flow ? s.t : 0, lw: o.lw });
    });
    if (!o.noMag) mags.forEach(m => { if (!m.ghost) MAG9.drawMag(ctx, m, o.magO || {}); });
    if (o.inner) MAG9.drawInner(ctx, mags, { col: o.col });
  },
  heat(ctx, c, mags, rect, o) {
    const key = mags.map(m => MAG9.geo(m).key).join('#') + rect.join(',');
    if (c.h.key !== key) { const cs = 10, nx = Math.ceil((rect[2] - rect[0]) / cs), ny = Math.ceil((rect[3] - rect[1]) / cs); const cv = c.h.cv || document.createElement('canvas'); cv.width = nx; cv.height = ny; const x2 = cv.getContext('2d'); const im = x2.createImageData(nx, ny); const P = MAG9.prep(mags);
      for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { const x = rect[0] + (i + .5) * cs, y = rect[1] + (j + .5) * cs; const b = MAG9.Bp(P, x, y), m = Math.hypot(b[0], b[1]); const k = clamp(Math.log10(m / 4e-6) / 2.6, 0, 1); const q = (j * nx + i) * 4;
        im.data[q] = 250; im.data[q + 1] = Math.round(204 - 150 * k); im.data[q + 2] = Math.round(21 + 20 * k); im.data[q + 3] = Math.round(200 * k * k); }
      x2.putImageData(im, 0, 0); c.h = { key, cv }; }
    MAG9.raw(ctx, () => { ctx.imageSmoothingEnabled = true; ctx.globalAlpha = .75; ctx.drawImage(c.h.cv, rect[0], rect[1], c.h.cv.width * 10, c.h.cv.height * 10); ctx.globalAlpha = 1; });
  },
  /* draggable magnet (moves its x,y; optional rotation knob) */
  magDrag(id, m, bound, o = {}) { const g = MAG9.geo(m); return { id, x: m.x, y: m.y, hit: (x, y) => MAG9.inside(m, x, y) || Math.hypot(x - m.x, y - m.y) < 26, axis: o.axis || 'xy', keep: true, tip: o.tip || 'اسحب المغناطيس', idle: o.idle, hint: o.hint,
    down: (S) => { m._ox = m.x; m._oy = m.y; o.down && o.down(S); }, drag: (S, d) => { m.x = clamp(m._ox + d.x - d.sx, bound[0], bound[2]); m.y = clamp(m._oy + d.y - d.sy, bound[1], bound[3]); o.drag && o.drag(S); }, up: o.up, click: o.click }; },
  rotDrag(id, m, o = {}) { const g = MAG9.geo(m); const hl = m.kind === 'U' ? m.H + 18 : m.L / 2 + 20; const kx = m.x + Math.cos(m.a) * hl * (m.flip ? -1 : 1), ky = m.y + Math.sin(m.a) * hl * (m.flip ? -1 : 1);
    return { id, x: kx, y: ky, r: 16, cx: m.x, cy: m.y, keep: true, tip: o.tip || 'اسحب المقبض لتدوير المغناطيس', hint: false, drag: (S, d) => { m.a = Math.atan2(d.y - m.y, d.x - m.x) - (m.flip ? Math.PI : 0); if (o.snap) m.a = Math.round(m.a / (Math.PI / 12)) * Math.PI / 12; } }; },
  knob(ctx, d) { MAG9.raw(ctx, () => { ctx.fillStyle = '#16a34a'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(d.x, d.y, 9, 0, TAU); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(d.x, d.y, 4.5, -2.4, 1.2); ctx.stroke(); }); },
  /* force on a small piece of iron ~ grad |B|^2 */
  gradB2(P, x, y) { const e = 2, f = (a, b) => { const B = MAG9.Bp(P, a, b); return B[0] * B[0] + B[1] * B[1]; }; return [(f(x + e, y) - f(x - e, y)) / (2 * e), (f(x, y + e) - f(x, y - e)) / (2 * e)]; },
  /* on-canvas field meter probe (PhET style) */
  meter(ctx, x, y, b, o = {}) { const T = MAG9.tesla(b || [0, 0]), m = Math.hypot(T[0], T[1]); MAG9.raw(ctx, () => {
    ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 3; ctx.fillStyle = 'rgba(191,219,254,.35)'; ctx.beginPath(); ctx.arc(x, y, 13, 0, TAU); ctx.fill(); ctx.stroke(); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x - 8, y); ctx.lineTo(x + 8, y); ctx.moveTo(x, y - 8); ctx.lineTo(x, y + 8); ctx.stroke();
    ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, y + 13); ctx.lineTo(x, y + 30); ctx.stroke();
    const bx = clamp(x - 84, 66, (o.w || 9999) - 172), by = y + 30; ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.3)'; ctx.shadowBlur = 8; const gg = ctx.createLinearGradient(0, by, 0, by + 74); gg.addColorStop(0, '#1e40af'); gg.addColorStop(1, '#172554'); ctx.fillStyle = gg; rr(ctx, bx, by, 168, 74, 10); ctx.fill(); ctx.restore();
    ctx.fillStyle = '#0f172a'; rr(ctx, bx + 8, by + 6, 152, 26, 5); ctx.fill(); ctx.direction = 'ltr'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#4ade80'; ctx.font = '800 14px ui-monospace,monospace';
    ctx.fillText('B = ' + (m * 1e3).toFixed(m * 1e3 < 10 ? 2 : 1) + ' mT', bx + 84, by + 19); ctx.font = '700 10.5px ui-monospace,monospace'; ctx.fillStyle = '#bfdbfe';
    ctx.fillText('Bx ' + (T[0] * 1e3).toFixed(2) + '  By ' + (-T[1] * 1e3).toFixed(2), bx + 84, by + 44); ctx.fillText('θ = ' + Math.round(deg(Math.atan2(-T[1], T[0]))) + '°   ' + Math.round(m * 1e4) + ' G', bx + 84, by + 61); ctx.textBaseline = 'alphabetic';
    if (m > 1e-7) { const a = Math.atan2(b[1], b[0]); G.arrow(ctx, x, y, x + Math.cos(a) * 34, y + Math.sin(a) * 34, '#f59e0b', 3, 9); } }); },
  /* glass sheet (activity plate) */
  glass(ctx, x, y, w, h, o = {}) { MAG9.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.18)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 4; ctx.fillStyle = o.fill || 'rgba(224,242,254,.32)'; rr(ctx, x, y, w, h, 6); ctx.fill(); ctx.restore();
    ctx.strokeStyle = 'rgba(14,116,144,.55)'; ctx.lineWidth = 2; rr(ctx, x, y, w, h, 6); ctx.stroke(); const g = ctx.createLinearGradient(x, y, x + w * .4, y + h * .4); g.addColorStop(0, 'rgba(255,255,255,.55)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x + 10, y + 4); ctx.lineTo(x + w * .3, y + 4); ctx.lineTo(x + 10, y + h * .45); ctx.closePath(); ctx.fill(); }); },
  paper(ctx, x, y, w, h) { MAG9.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.18)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; ctx.fillStyle = '#fffef8'; ctx.fillRect(x, y, w, h); ctx.restore(); ctx.strokeStyle = 'rgba(148,163,184,.25)'; ctx.lineWidth = 1; for (let yy = y + 24; yy < y + h; yy += 24) { ctx.beginPath(); ctx.moveTo(x + 6, yy); ctx.lineTo(x + w - 6, yy); ctx.stroke(); } }); },
  T: (ctx, s, x, y, o) => C2.T(ctx, s, x, y, o),
  /* property / option chips on canvas (right column) */
  chips(ctx, list, cur, x, y, wd, hh, o = {}) { const B = []; list.forEach((it, i) => { const b = { x, y: y + i * (hh + 6), w: wd, h: hh, k: it[0] }; B.push(b); const on = it[0] === cur; MAG9.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.15)'; ctx.shadowBlur = on ? 8 : 4; ctx.fillStyle = on ? (o.on || '#0e7490') : 'rgba(255,255,255,.95)'; rr(ctx, b.x - wd / 2, b.y - hh / 2, wd, hh, 9); ctx.fill(); ctx.restore(); ctx.strokeStyle = o.bd || '#0e7490'; ctx.lineWidth = 1.5; rr(ctx, b.x - wd / 2, b.y - hh / 2, wd, hh, 9); ctx.stroke(); });
    C2.T(ctx, it[1], b.x, b.y, { s: o.s || 12, w: 800, c: on ? '#fff' : '#0f172a' }); }); return B; }
};
/* =========================================================================================
   EXPERIMENT 1 (book 1-2, p33–34): مفهوم المغناطيسية — الحجر المغناطيسي، المغانط الصناعية، استعمالاتها
   ========================================================================================= */
/* ---- 1.1 lodestone & artificial magnets pick up iron (figs 1, 2) ---- */
(() => {
  const MG = [['rock', 'الحجر المغناطيسي (الشكل 1)'], ['bar', 'ساق مغناطيسية'], ['U', 'مغناطيس بشكل حرف U'], ['bigU', 'مغناطيس U كبير']];
  const D = P92({ id: 'g9m_lode', page: 33, fig: 'الشكلان 1 و 2',
    desc: 'منذ 25 قرناً اكتشف اليونانيون معدناً يجذب إليه قطع الحديد أطلقوا عليه اسم المغنيت، يتركب من أوكسيد الحديد الأسود (Fe₃O₄)، وأصبح معروفاً بالحجر المغناطيسي. وتوجد أنواع مختلفة من المغانط الصناعية منها بشكل ساق ومنها بشكل حرف U.',
    tags: 'الحجر المغناطيسي مغنيت أوكسيد الحديد الأسود Fe3O4 مغانط صناعية ساق حرف U',
    tools: ['حجر مغناطيسي', 'ساق مغناطيسية', 'مغناطيس حرف U', 'مشابك ورق', 'مسامير حديد'],
    controls: [SEL('mg', 'المغناطيس', MG, 'rock'), BT('', [{ t: '🧲 انزع ما التصق', on: S => MAG9.dropAll(S.it) }, { t: '↺ أعد القطع', on: S => D.reset(S) }]), TG('lines', 'خطوط المجال', false, null, 'bfield'), TG('info', 'بطاقة المعلومات', true, null, 'labels')],
    steps: ['اختر الحجر المغناطيسي (المغنيت) كما في الشكل 1.', 'اسحبه فوق مشابك الورق ومسامير الحديد الموضوعة على الطاولة: ماذا يحدث؟', 'اضغط «انزع ما التصق» ثم جرّب المغانط الصناعية (الشكل 2): الساق المغناطيسية ومغناطيس حرف U.', 'لاحظ أين تلتصق القطع: عند طرفي المغناطيس (الأقطاب).'],
    concl: ['الحجر المغناطيسي (المغنيت Fe₃O₄) مغناطيس طبيعي يجذب قطع الحديد.', 'توجد مغانط صناعية بأشكال مختلفة: ساق مستقيمة، حرف U … وتكون عادةً أقوى من الحجر المغناطيسي.'],
    laws: ['g9_poles'],
    fact: ['اسم «مغناطيس» جاء من منطقة «مغنيسيا» في اليونان القديمة حيث وُجد الحجر المغناطيسي.'],
    setup(S) { D.reset(S); S.mu = { u: .5, v: .3 }; },
    reset(S) { const r = MAG9.rng(11); S.it = []; for (let i = 0; i < 18; i++) { const kind = i < 13 ? 'clip' : 'nail'; S.it.push({ kind, ferro: true, k: kind === 'nail' ? .8 : 1, u: .1 + .8 * r(), a: r() * Math.PI, ra: (r() - .5) * .5, st: 'rest', x: 0, y: 0 }); } S.it.forEach(it => { it.ra = (it.kind === 'nail' ? 0 : it.a); it.a = it.ra; }); S.place = 1; },
    geo(S) { const w = S.W, h = S.H, k = MAG9.sc(w, h), by = h * .8, x0 = 90, x1 = w - 30; const t = S.p.mg; let m;
      const mx = x0 + S.mu.u * (x1 - x0), my = 60 + S.mu.v * (by - 120);
      if (t === 'rock') m = Object.assign(S._rock || (S._rock = { kind: 'rock', a: 0, str: .5 }), { x: mx, y: my, L: Math.round(150 * k), T: Math.round(100 * k) });
      else if (t === 'bar') m = Object.assign(S._bar || (S._bar = MAG9.bar(0, 0, 0, 1, 1, 1)), { x: mx, y: my, L: Math.round(170 * k), T: Math.round(34 * k) });
      else m = Object.assign(S['_' + t] || (S['_' + t] = MAG9.U(0, 0, Math.PI / 2, 1, 1, 1, 1, { uStyle: 'red' })), t === 'U' ? { x: mx, y: my, W: Math.round(100 * k), H: Math.round(70 * k), t: Math.round(28 * k), str: 1.1 } : { x: mx, y: my, W: Math.round(150 * k), H: Math.round(110 * k), t: Math.round(42 * k), str: 1.6 });
      return { w, h, k, by, x0, x1, m }; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); if (S.place) { S.place = 0; S.it.forEach(it => { it.x = g.x0 + it.u * (g.x1 - g.x0); it.y0 = g.by - 6; it.y = it.y0; }); } S.it.forEach(it => { it.y0 = g.by - 6; if (it.st === 'rest') it.y = it.y0; });
      MAG9.pick(S, [g.m], S.it, dt, { cap: 6, len: 24 * g.k + 4, th: S.p.mg === 'rock' ? 8e-5 : 1.3e-4, reach: 150 * g.k }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { benchY: g.by });
      if (p.lines) MF9.clip(ctx, [64, 40, w, g.by], () => MAG9.drawLines(ctx, MAG9.lines(MF9.cache(S, 'l' + p.mg).l, [g.m], [64, 40, w, h], { n: 14 }), { col: '#0e7490', alpha: .6 }));
      S.it.filter(it => it.st === 'rest' || it.st === 'fall').forEach(it => MAG9.drawItem(ctx, it, g.k * .9 + .1));
      MAG9.drawMag(ctx, g.m, { uStyle: 'red' }); if (p.mg === 'rock') MF9.T(ctx, 'Fe₃O₄', g.m.x, g.m.y, { s: 12, w: 900, c: '#fde68a' });
      S.it.filter(it => it.st === 'att' || it.st === 'fly').forEach(it => MAG9.drawItem(ctx, it, g.k * .9 + .1));
      const n = S.it.filter(it => it.st === 'att').length; MF9.T(ctx, 'عدد القطع الملتصقة: ' + n, MAG9.cx(w), g.by + 26, { s: 13, w: 900, c: '#fff', bg: n ? '#15803d' : '#475569' });
      if (p.info !== false) { const L = p.mg === 'rock' ? ['منذ 25 قرناً اكتشفه اليونانيون', 'اسمه: المغنيت (الحجر المغناطيسي)', 'Lode stone : بالإنكليزية', 'يتركب من أوكسيد الحديد الأسود Fe₃O₄', 'مغناطيس طبيعي يجذب قطع الحديد'] : ['مغناطيس صناعي (الشكل 2)', p.mg === 'bar' ? 'شكله: ساق مستقيمة' : 'شكله: حرف U (حدوة الحصان)', 'المغانط الصناعية أقوى من الحجر الطبيعي', 'تلتصق القطع عند طرفيه (القطبين)'];
        C2.lines(ctx, L.map(t => ({ t, s: 12 })), w - 12, 46, Math.min(270, w * .42), { title: p.mg === 'rock' ? 'الحجر المغناطيسي' : 'المغانط الصناعية', bd: '#b45309', lh: 19 }); }
      MAG9.banner(ctx, w, 'الحجر المغناطيسي والمغانط الصناعية: اسحب المغناطيس فوق القطع', '#b45309');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'mag', x: g.m.x, y: g.m.y, hit: (x, y) => MAG9.inside(g.m, x, y) || Math.hypot(x - g.m.x, y - g.m.y) < 40, axis: 'xy', keep: true, tip: 'اسحب المغناطيس فوق القطع ثم ارفعه', idle: 'اسحبني فوق المشابك ✋', down: () => { S._a = g.m.x; S._b = g.m.y; }, drag: (S2, d) => { S.mu = { u: clamp((S._a + d.x - d.sx - g.x0) / (g.x1 - g.x0), 0, 1), v: clamp((S._b + d.y - d.sy - 60) / (g.by - 120), 0, 1.25) }; } }]; },
    field(S, x, y) { if (!S.W) return null; const m = D.geo(S).m; return MAG9.inside(m, x, y) ? null : MAG9.B([m], x, y); },
    readings(S) { const n = S.it.filter(it => it.st === 'att').length; return [rd('المغناطيس', MG.find(q => q[0] === S.p.mg)[1], 1), rd('القطع الملتصقة', String(n))]; },
    explain(S) { const n = S.it.filter(it => it.st === 'att').length; return (S.p.mg === 'rock' ? 'الحجر المغناطيسي (المغنيت Fe₃O₄) <b>مغناطيس طبيعي</b>: يجذب قطع الحديد كما اكتشف اليونانيون قبل 25 قرناً.' : 'المغانط <b>الصناعية</b> تُصنع بأشكال مختلفة (ساق، حرف U…) وهي أقوى من الحجر المغناطيسي.') + (n ? ' التصقت ' + n + ' قطعة، ولاحظ أنها تتجمع عند <b>طرفي المغناطيس</b> حيث القوة أعظم (الأقطاب).' : ' اسحب المغناطيس قرب القطع.'); }
  });
})();
/* ---- 1.2 uses of magnets (figs 3–6) + review Q2 (fridge) + ➕ maglev ---- */
(() => {
  const SC = [['crane', 'رفع الخردة (الشكل 3)'], ['spk', 'السماعة (الشكل 4)'], ['type', 'الآلة الكاتبة (الشكل 5)'], ['comp', 'بوصلة الملاحة (الشكل 6)'], ['fridge', 'باب الثلاجة (س2)'], ['maglev', '➕ القطار المغناطيسي المعلّق']];
  const D = P92({ id: 'g9m_uses', page: 33, fig: 'الأشكال 3–6',
    desc: 'تلعب المغناطيسية دوراً مهماً في حياتنا اليومية وفي الصناعة: المغانط الكهربائية الضخمة ترفع قطع الفولاذ وحديد الخردة، وتستعمل في السماعة والمولدات والمحركات والتلفاز وأجهزة التسجيل، وفي الحروف المطبعية للآلة الكاتبة، وفي بوصلات الملاحة.',
    tags: 'استعمالات المغناطيس رافعة خردة سماعة آلة كاتبة بوصلة ملاحة ثلاجة قطار معلق',
    tools: ['مغناطيس كهربائي', 'سماعة', 'آلة كاتبة', 'بوصلة'],
    controls: [SEL('sc', 'الاستعمال', SC, 'crane'), BT('', [{ t: '⚡ تشغيل/إطفاء التيار', on: S => { S.on = !S.on; } }]), R('f', 'تردد الصوت (للسماعة)', 1, 6, 2, .5, 'Hz'), TG('lines', 'خطوط المجال', true, null, 'bfield'), TG('labels', 'أسماء الأجزاء', true, null, 'labels')],
    steps: ['اختر الاستعمال من القائمة.', 'الرافعة: اسحب المغناطيس الكهربائي فوق الخردة وشغّل التيار، ثم انقلها وأطفئ التيار.', 'السماعة: شغّل التيار المتناوب وغيّر التردد، ولاحظ اهتزاز المخروط.', 'الآلة الكاتبة: اضغط على حرف فيسحب المغناطيس الكهربائي ذراع الحرف ليطبعه.', 'البوصلة: أدر علبة البوصلة فتبقى الإبرة متجهة نحو الشمال، ثم قرّب منها مغناطيساً.', 'الثلاجة (س2): افتح الباب ثم اتركه قريباً من الإطار.'],
    concl: ['المغانط الكهربائية الضخمة تستعمل لرفع قطع الفولاذ وحديد الخردة، ويمكن إطفاؤها لإسقاط الحمل.', 'تستعمل المغانط في السماعة والمولدات والمحركات والتلفاز وأجهزة التسجيل وفي الآلة الكاتبة.', 'إبرة البوصلة مغناطيس دائمي صغير يمكنه الدوران بحرية في مستوى أفقي حول محور شاقولي مدبب.', 'المغانط في أبواب الثلاجات والخزانات تجذب الإطار الفولاذي فتُغلق الباب بإحكام دون أقفال.'],
    laws: ['g9_poles'],
    setup(S) { S.on = false; S.cr = { u: .55, v: .25 }; S.scrap = null; S.ph = 0; S.paper = ''; S.key = null; S.kt = 0; S.crot = 0; S.cm = { u: .85, v: .7 }; S.nd = { a: -Math.PI / 2, w: 0 }; S.door = 0; S.dv = 0; S.dragD = 0; S.tx = .2; S.tv = 0; },
    geo(S) { const w = S.W, h = S.H; return { w, h, k: MAG9.sc(w, h), cx: MAG9.cx(w), by: h * .82 }; },
    /* ---------- crane ---------- */
    craneG(S) { const g = D.geo(S), top = 70, x0 = 110, x1 = g.w - 40; const dx = x0 + 60 + S.cr.u * (x1 - x0 - 90), dy = top + 60 + S.cr.v * (g.by - top - 150); return Object.assign(g, { top, x0, x1, dx, dy, dw: 110 * g.k + 20, dh: 30 * g.k + 8 }); },
    initScrap(S, c) { const r = MAG9.rng(5); S.scrap = []; for (let i = 0; i < 16; i++) { const fe = i !== 3 && i !== 11; const sz = (14 + 16 * r()) * c.k + 4; const pts = Array.from({ length: 6 }, (_, j) => { const th = j / 6 * TAU + r() * .5; return [Math.cos(th) * sz * (.6 + .5 * r()), Math.sin(th) * sz * (.35 + .3 * r())]; });
      S.scrap.push({ fe, pts, x: c.x0 + 40 + r() * (c.x1 - c.x0 - 80), y: c.by - 8 - r() * 16, a: r() * TAU, col: fe ? ['#57534e', '#78716c', '#44403c', '#6b7280', '#7c2d12'][i % 5] : (i === 3 ? '#a16207' : '#cbd5e1'), name: fe ? null : (i === 3 ? 'خشب' : 'ألمنيوم'), st: 'rest', vy: 0 }); } },
    crane(ctx, S) { const c = D.craneG(S), p = S.p; if (!S.scrap) D.initScrap(S, c);
      MAG9.raw(ctx, () => { const sky = ctx.createLinearGradient(0, 0, 0, c.by); sky.addColorStop(0, '#bfdbfe'); sky.addColorStop(1, '#f1f5f9'); ctx.fillStyle = sky; ctx.fillRect(0, 0, c.w, c.by); const gr = ctx.createLinearGradient(0, c.by, 0, c.h); gr.addColorStop(0, '#78716c'); gr.addColorStop(1, '#44403c'); ctx.fillStyle = gr; ctx.fillRect(0, c.by, c.w, c.h - c.by);
        // tower + boom (lattice)
        ctx.strokeStyle = '#ca8a04'; ctx.lineWidth = 3; const tx = c.x0 + 10; ctx.strokeRect(tx - 14, c.top, 28, c.by - c.top); ctx.lineWidth = 1.5; for (let y = c.top; y < c.by; y += 26) { ctx.beginPath(); ctx.moveTo(tx - 14, y); ctx.lineTo(tx + 14, y + 26); ctx.moveTo(tx + 14, y); ctx.lineTo(tx - 14, y + 26); ctx.stroke(); }
        ctx.lineWidth = 3; ctx.strokeRect(tx - 14, c.top - 12, c.x1 - tx + 4, 18); ctx.lineWidth = 1.4; for (let x = tx - 14; x < c.x1 - 10; x += 22) { ctx.beginPath(); ctx.moveTo(x, c.top - 12); ctx.lineTo(x + 22, c.top + 6); ctx.stroke(); }
        ctx.fillStyle = '#facc15'; rr(ctx, tx - 30, c.top + 18, 34, 26, 4); ctx.fill(); ctx.fillStyle = '#93c5fd'; ctx.fillRect(tx - 26, c.top + 22, 14, 10);
        // trolley + cable
        ctx.fillStyle = '#334155'; rr(ctx, c.dx - 18, c.top + 4, 36, 12, 3); ctx.fill(); ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(c.dx - 6, c.top + 16); ctx.lineTo(c.dx - 6, c.dy - c.dh / 2); ctx.moveTo(c.dx + 6, c.top + 16); ctx.lineTo(c.dx + 6, c.dy - c.dh / 2); ctx.stroke();
        // scrap pile (resting)
        S.scrap.filter(q => q.st !== 'att').forEach(q => D.piece(ctx, q));
        // electromagnet disc
        const dg = ctx.createLinearGradient(c.dx - c.dw / 2, 0, c.dx + c.dw / 2, 0); dg.addColorStop(0, '#1f2937'); dg.addColorStop(.4, '#6b7280'); dg.addColorStop(1, '#111827'); ctx.fillStyle = dg; rr(ctx, c.dx - c.dw / 2, c.dy - c.dh / 2, c.dw, c.dh, 6); ctx.fill();
        ctx.fillStyle = '#374151'; ctx.beginPath(); ctx.ellipse(c.dx, c.dy - c.dh / 2, c.dw / 2, 7, 0, 0, TAU); ctx.fill(); ctx.fillStyle = S.on ? '#facc15' : '#64748b'; ctx.beginPath(); ctx.arc(c.dx, c.dy - c.dh / 2, 4, 0, TAU); ctx.fill();
        if (S.on) { ctx.save(); ctx.shadowColor = '#fde047'; ctx.shadowBlur = 16; ctx.strokeStyle = 'rgba(250,204,21,.8)'; ctx.lineWidth = 2; rr(ctx, c.dx - c.dw / 2, c.dy - c.dh / 2, c.dw, c.dh, 6); ctx.stroke(); ctx.restore(); }
        if (S.on && p.lines !== false) { ctx.strokeStyle = 'rgba(14,116,144,.75)'; ctx.lineWidth = 1.5; for (let k = 1; k <= 3; k++) { ctx.beginPath(); ctx.ellipse(c.dx - c.dw * .22, c.dy + c.dh / 2, c.dw * .12 * k, 16 * k, 0, 0, Math.PI); ctx.stroke(); ctx.beginPath(); ctx.ellipse(c.dx + c.dw * .22, c.dy + c.dh / 2, c.dw * .12 * k, 16 * k, 0, 0, Math.PI); ctx.stroke(); } }
        S.scrap.filter(q => q.st === 'att').forEach(q => D.piece(ctx, q)); });
      if (p.labels !== false) { MF9.T(ctx, 'مغناطيس كهربائي ضخم', c.dx, c.dy - c.dh / 2 - 16, { s: 11.5, w: 900, c: '#fff', bg: 'rgba(30,41,59,.85)' }); S.scrap.filter(q => q.name && q.st === 'rest').forEach(q => MF9.T(ctx, q.name, q.x, q.y - 18, { s: 10.5, w: 800, c: '#fff', bg: 'rgba(100,116,139,.85)' })); }
      const b = { x: c.w - 92, y: c.by - 40, w: 128, h: 38 }; MAG9.btn(ctx, b, S.on ? '⚡ التيار يعمل' : '⏻ شغّل التيار', { col: S.on ? '#ca8a04' : '#475569', on: S.on }); S._btn = b;
      const n = S.scrap.filter(q => q.st === 'att').length; MF9.T(ctx, S.on ? 'التيار يعمل: المغناطيس يرفع ' + n + ' قطعة حديد' : 'التيار مقطوع: المغناطيس لا يجذب شيئاً', MAG9.cx(c.w), c.by + 24, { s: 12.5, w: 900, c: '#fff', bg: S.on ? '#15803d' : '#475569' }); },
    piece(ctx, q) { ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.a); ctx.fillStyle = q.col; ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 1; MAG9.pathPoly(ctx, q.pts); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.beginPath(); ctx.arc(-3, -3, 3, 0, TAU); ctx.fill(); ctx.restore(); },
    craneUp(S, dt) { const c = D.craneG(S); if (!S.scrap) D.initScrap(S, c); let n = 0;
      S.scrap.forEach(q => { if (q.st === 'att') { if (!S.on) { q.st = 'fall'; q.vy = 0; return; } q.x += (c.dx + q.ox - q.x) * Math.min(1, dt * 12); q.y += (c.dy + c.dh / 2 + q.oy - q.y) * Math.min(1, dt * 12); n++; }
        else if (q.st === 'rest' && S.on && q.fe && n < 8 && Math.abs(q.x - c.dx) < c.dw * .7 && q.y - (c.dy + c.dh / 2) < 80 * c.k + 30) { q.st = 'att'; q.ox = (Math.random() - .5) * c.dw * .8; q.oy = 6 + Math.random() * 14; n++; }
        else if (q.st === 'fall') { q.vy += 1300 * dt; q.y += q.vy * dt; const gy = c.by - 8 - (q.ox ? Math.abs(q.ox) % 10 : 4); if (q.y >= gy) { q.y = gy; q.st = 'rest'; } } }); },
    /* ---------- loudspeaker ---------- */
    spk(ctx, S) { const g = D.geo(S), p = S.p, cx = g.cx - 90 * g.k, cy = g.h * .48, k = g.k * 1.1; const x = S.on ? Math.sin(S.ph) * 9 * k : 0, I = S.on ? Math.cos(S.ph) : 0;
      MAG9.raw(ctx, () => { const bg = ctx.createLinearGradient(0, 0, 0, g.h); bg.addColorStop(0, '#f8fafc'); bg.addColorStop(1, '#e2e8f0'); ctx.fillStyle = bg; ctx.fillRect(0, 0, g.w, g.h);
        // magnet (cross-section): two halves N (front plate) / S (back) — ring magnet around pole piece
        const mx = cx - 120 * k; [-1, 1].forEach(s => { const yy = cy + s * 50 * k; ctx.fillStyle = L.N; const gg = ctx.createLinearGradient(mx, 0, mx + 60 * k, 0); gg.addColorStop(0, '#1d4ed8'); gg.addColorStop(.5, '#2563eb'); gg.addColorStop(.5, '#dc2626'); gg.addColorStop(1, '#b91c1c'); ctx.fillStyle = gg; ctx.fillRect(mx, yy - 24 * k, 60 * k, 48 * k); ctx.fillStyle = '#9ca3af'; ctx.fillRect(mx + 60 * k, yy - 24 * k, 10 * k, 48 * k);
          ctx.fillStyle = '#fff'; ctx.font = '900 ' + Math.round(13 * k) + 'px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr'; ctx.fillText('S', mx + 15 * k, yy); ctx.fillText('N', mx + 45 * k, yy); });
        ctx.fillStyle = '#6b7280'; ctx.fillRect(mx - 12 * k, cy - 76 * k, 12 * k, 152 * k); ctx.fillRect(mx - 12 * k, cy - 14 * k, 92 * k, 28 * k);   // back plate + pole piece
        // voice coil on former
        const vx = mx + 74 * k + x; ctx.fillStyle = '#fef3c7'; ctx.fillRect(vx - 4 * k, cy - 22 * k, 46 * k, 44 * k);
        for (let j = 0; j < 5; j++) { const xx = vx + j * 8 * k; [-1, 1].forEach(s => { ctx.fillStyle = '#b45309'; ctx.beginPath(); ctx.arc(xx, cy + s * 19 * k, 3.6 * k, 0, TAU); ctx.fill(); if (S.on) { ctx.fillStyle = '#fff'; ctx.font = '900 ' + Math.round(7 * k) + 'px system-ui'; ctx.fillText((I * s > 0) ? '•' : '×', xx, cy + s * 19 * k); } }); }
        // cone + surround + frame
        const c0 = vx + 40 * k; ctx.fillStyle = '#d6d3d1'; ctx.strokeStyle = '#57534e'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(c0, cy - 22 * k); ctx.lineTo(c0 + 110 * k, cy - 120 * k); ctx.lineTo(c0 + 118 * k, cy - 120 * k); ctx.lineTo(c0 + 118 * k, cy + 120 * k); ctx.lineTo(c0 + 110 * k, cy + 120 * k); ctx.lineTo(c0, cy + 22 * k); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#44403c'; ctx.beginPath(); ctx.ellipse(c0 + 4 * k, cy, 9 * k, 22 * k, 0, 0, TAU); ctx.fill();
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(mx - 12 * k, cy - 76 * k); ctx.lineTo(c0 + 118 * k - x, cy - 135 * k); ctx.moveTo(mx - 12 * k, cy + 76 * k); ctx.lineTo(c0 + 118 * k - x, cy + 135 * k); ctx.stroke();
        // sound waves
        if (S.on) { for (let j = 0; j < 6; j++) { const rr2 = ((S.ph / TAU + j / 6) % 1) * 260 * k + 20; ctx.strokeStyle = 'rgba(37,99,235,' + (.6 * (1 - rr2 / (280 * k))) + ')'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(c0 + 118 * k, cy, rr2, -.6, .6); ctx.stroke(); } }
        if (p.lines !== false) { ctx.strokeStyle = 'rgba(14,116,144,.7)'; ctx.lineWidth = 1.4; [-1, 1].forEach(s => { ctx.beginPath(); ctx.moveTo(mx + 70 * k, cy + s * 34 * k); ctx.lineTo(mx + 80 * k, cy + s * 8 * k); ctx.stroke(); MAG9.arrowHead(ctx, mx + 76 * k, cy + s * 20 * k, s > 0 ? -Math.PI / 2 - .35 : Math.PI / 2 + .35, 5, 'rgba(14,116,144,.9)'); }); } });
      if (p.labels !== false) { MF9.T(ctx, 'مغناطيس دائمي', cx - 90 * k, cy + 100 * k, { s: 12, w: 900, c: '#fff', bg: '#b91c1c' }); MF9.T(ctx, 'ملف (يمر فيه التيار)', cx + 10 * k, cy - 52 * k, { s: 12, w: 900, c: '#fff', bg: '#b45309' }); MF9.T(ctx, 'المخروط يهتز فيصدر الصوت', cx + 120 * k, cy + 150 * k, { s: 12, w: 900, c: '#fff', bg: '#475569' }); }
      const b = { x: g.w - 92, y: g.h * .85, w: 128, h: 38 }; MAG9.btn(ctx, b, S.on ? '🔊 الصوت يعمل' : '▶ شغّل الصوت', { col: S.on ? '#2563eb' : '#475569', on: S.on }); S._btn = b; },
    /* ---------- typewriter ---------- */
    type(ctx, S) { const g = D.geo(S), p = S.p, cx = g.cx, k = g.k, ty = g.h * .5;
      MAG9.raw(ctx, () => { ctx.fillStyle = '#f1f5f9'; ctx.fillRect(0, 0, g.w, g.h);
        // paper with typed text
        ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.2)'; ctx.shadowBlur = 6; ctx.fillStyle = '#fff'; ctx.fillRect(cx - 150 * k, ty - 230 * k, 300 * k, 160 * k); ctx.restore();
        ctx.fillStyle = '#111827'; ctx.font = '700 ' + Math.round(20 * k) + 'px "Courier New",monospace'; ctx.textAlign = 'left'; ctx.direction = 'ltr'; ctx.fillText(S.paper.slice(-18), cx - 136 * k, ty - 112 * k);
        // body
        const bg = ctx.createLinearGradient(0, ty - 80 * k, 0, ty + 120 * k); bg.addColorStop(0, '#3f3f46'); bg.addColorStop(1, '#09090b'); ctx.fillStyle = bg; rr(ctx, cx - 200 * k, ty - 80 * k, 400 * k, 200 * k, 18 * k); ctx.fill();
        ctx.fillStyle = '#18181b'; rr(ctx, cx - 180 * k, ty - 96 * k, 360 * k, 26 * k, 10); ctx.fill(); ctx.fillStyle = '#a1a1aa'; ctx.fillRect(cx - 200 * k, ty - 90 * k, 14 * k, 14 * k); ctx.fillRect(cx + 186 * k, ty - 90 * k, 14 * k, 14 * k);
        // inside window: electromagnet + type bar
        const wx = cx - 70 * k, wy = ty - 50 * k; ctx.fillStyle = '#fef9c3'; rr(ctx, wx, wy, 140 * k, 70 * k, 8); ctx.fill(); ctx.strokeStyle = '#a16207'; ctx.lineWidth = 2; ctx.stroke();
        const on = S.kt > 0, pull = on ? Math.sin(Math.min(1, (0.35 - S.kt) / .35) * Math.PI) : 0;
        ctx.fillStyle = '#b45309'; for (let j = 0; j < 7; j++) { ctx.fillRect(wx + 14 * k + j * 6 * k, wy + 44 * k, 4 * k, 18 * k); } ctx.fillStyle = '#6b7280'; ctx.fillRect(wx + 10 * k, wy + 50 * k, 50 * k, 6 * k);
        if (on) { ctx.save(); ctx.shadowColor = '#facc15'; ctx.shadowBlur = 12; ctx.strokeStyle = '#facc15'; ctx.lineWidth = 2; ctx.strokeRect(wx + 10 * k, wy + 42 * k, 50 * k, 22 * k); ctx.restore(); }
        ctx.save(); ctx.translate(wx + 100 * k, wy + 60 * k); ctx.rotate(-.2 - pull * 1.15); ctx.fillStyle = '#d4d4d8'; ctx.fillRect(-4 * k, -52 * k, 8 * k, 56 * k); ctx.fillStyle = '#52525b'; ctx.fillRect(-7 * k, -60 * k, 14 * k, 10 * k); ctx.restore();
        ctx.strokeStyle = '#71717a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(wx + 60 * k, wy + 53 * k); ctx.lineTo(wx + 96 * k, wy + 56 * k); ctx.stroke(); });
      // keyboard
      const keys = ['P', 'H', 'Y', 'S', 'I', 'C', 'S', '!']; S._keys = []; const kw = Math.min(40 * k, (g.w - 120) / 8 - 6); keys.forEach((c, i) => { const b = { x: cx + (i - 3.5) * (kw + 6), y: ty + 70 * k, w: kw, h: kw, c }; S._keys.push(b); const dn = S.key === i && S.kt > 0;
        MAG9.raw(ctx, () => { ctx.fillStyle = dn ? '#a1a1aa' : '#e4e4e7'; ctx.strokeStyle = '#3f3f46'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(b.x, b.y + (dn ? 2 : 0), kw / 2, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#111827'; ctx.font = '800 ' + Math.round(kw * .45) + 'px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr'; ctx.fillText(c, b.x, b.y + (dn ? 2 : 0)); ctx.textBaseline = 'alphabetic'; }); });
      if (p.labels !== false) { MF9.T(ctx, 'مغناطيس كهربائي يسحب ذراع الحرف', cx - 70 * k, ty - 64 * k, { s: 11.5, w: 900, c: '#fff', bg: '#a16207' }); MF9.T(ctx, 'اضغط على الحروف لتطبع', cx, ty + 70 * k + kw / 2 + 22, { s: 12, w: 900, c: '#fff', bg: '#334155' }); } },
    /* ---------- navigation compass ---------- */
    compG(S) { const g = D.geo(S), R = Math.min(150 * g.k + 10, (g.h - 140) / 2.6); const cx = g.cx - 40, cy = g.h * .5; const m = S._cm || (S._cm = MAG9.bar(0, 0, Math.PI, 150, 32, 1.2)); m.L = Math.round(150 * g.k); m.T = Math.round(32 * g.k); m.x = 80 + S.cm.u * (g.w - 160); m.y = 60 + S.cm.v * (g.h - 120); return Object.assign(g, { R, ccx: cx, ccy: cy, m }); },
    comp(ctx, S) { const c = D.compG(S), p = S.p; MAG9.raw(ctx, () => { const bg = ctx.createRadialGradient(c.ccx, c.ccy, 10, c.ccx, c.ccy, c.w); bg.addColorStop(0, '#fefce8'); bg.addColorStop(1, '#d6d3d1'); ctx.fillStyle = bg; ctx.fillRect(0, 0, c.w, c.h); });
      if (p.lines !== false) MF9.clip(ctx, [64, 40, c.w, c.h], () => MAG9.drawLines(ctx, MAG9.lines(MF9.cache(S, 'cm').l, [c.m], [64, 40, c.w, c.h], { n: 12 }), { col: '#0e7490', alpha: .35 }));
      MAG9.compass(ctx, c.ccx, c.ccy, c.R, S.nd.a, { rot: S.crot, ring: true }); MAG9.drawMag(ctx, c.m);
      MF9.knob(ctx, { x: c.ccx + Math.cos(S.crot - Math.PI / 2) * c.R * 1.06, y: c.ccy + Math.sin(S.crot - Math.PI / 2) * c.R * 1.06 });
      const ix = c.w - 110, iy = c.h - 130; MAG9.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.strokeStyle = '#a16207'; ctx.lineWidth = 2; rr(ctx, ix - 90, iy - 56, 180, 112, 10); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ix, iy + 34); ctx.lineTo(ix, iy - 4); ctx.stroke(); ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.moveTo(ix - 4, iy - 4); ctx.lineTo(ix + 4, iy - 4); ctx.lineTo(ix, iy - 12); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(ix + 64, iy - 12); ctx.lineTo(ix, iy - 18); ctx.lineTo(ix, iy - 8); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.moveTo(ix - 64, iy - 12); ctx.lineTo(ix, iy - 18); ctx.lineTo(ix, iy - 8); ctx.closePath(); ctx.fill(); });
      MF9.T(ctx, 'مقطع: إبرة على محور شاقولي مدبب', ix, iy + 44, { s: 10.5, w: 800, c: '#7c2d12' });
      MAG9.raw(ctx, () => G.arrow(ctx, c.w - 34, 120, c.w - 34, 66, '#16a34a', 4, 11)); MF9.T(ctx, 'الشمال', c.w - 34, 134, { s: 11, w: 900, c: '#fff', bg: '#16a34a' });
      const dev = Math.abs(Math.atan2(Math.sin(S.nd.a + Math.PI / 2), Math.cos(S.nd.a + Math.PI / 2))); MF9.T(ctx, dev < .15 ? 'الإبرة تشير إلى الشمال مهما أدرت علبة البوصلة ✓' : 'المغناطيس القريب يحرف الإبرة عن الشمال!', MAG9.cx(c.w), 58, { s: 12.5, w: 900, c: '#fff', bg: dev < .15 ? '#15803d' : '#b91c1c' }); },
    /* ---------- fridge door (Q2) ---------- */
    fridge(ctx, S) { const g = D.geo(S), k = g.k, fx = g.cx - 160 * k, fw = 210 * k, fy = 60, fh = g.h - 150; const op = S.door; const dw = fw * Math.cos(op * 1.3);
      MAG9.raw(ctx, () => { ctx.fillStyle = '#f5f5f4'; ctx.fillRect(0, 0, g.w, g.h); ctx.fillStyle = '#d6d3d1'; ctx.fillRect(0, fy + fh, g.w, g.h);
        ctx.fillStyle = '#e2e8f0'; rr(ctx, fx, fy, fw, fh, 12); ctx.fill(); ctx.fillStyle = '#cbd5e1'; rr(ctx, fx + 10, fy + 10, fw - 20, fh - 20, 8); ctx.fill(); ctx.fillStyle = '#f8fafc'; for (let j = 1; j < 4; j++) ctx.fillRect(fx + 14, fy + j * fh / 4, fw - 28, 4);
        ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.arc(fx + fw * .3, fy + fh * .2, 14, 0, TAU); ctx.fill(); ctx.fillStyle = '#86efac'; ctx.fillRect(fx + fw * .55, fy + fh * .43, 30, 24); ctx.fillStyle = '#fca5a5'; ctx.fillRect(fx + fw * .2, fy + fh * .68, 40, 22);
        // steel frame
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 8; rr(ctx, fx, fy, fw, fh, 12); ctx.stroke();
        // door (hinged on the left edge)
        const sh = 1 - op * .35; ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 10; const dg = ctx.createLinearGradient(fx, 0, fx + dw, 0); dg.addColorStop(0, '#f8fafc'); dg.addColorStop(1, op > .05 ? '#cbd5e1' : '#e5e7eb'); ctx.fillStyle = dg; ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx + dw, fy + op * 26); ctx.lineTo(fx + dw, fy + fh - op * 26); ctx.lineTo(fx, fy + fh); ctx.closePath(); ctx.fill(); ctx.restore();
        ctx.fillStyle = '#9ca3af'; ctx.fillRect(fx + dw - 26 * sh, fy + fh * .35, 10 * sh, fh * .25);
        ctx.fillStyle = '#334155'; ctx.fillRect(fx + dw - 4, fy + op * 26 + 6, 4, fh - op * 52 - 12); });
      // inset: gasket cross-section
      const ix = g.w - 120, iy = g.h * .42; MAG9.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#0e7490'; ctx.lineWidth = 2; rr(ctx, ix - 95, iy - 90, 190, 180, 10); ctx.fill(); ctx.stroke(); const gap = 6 + S.door * 46;
        ctx.fillStyle = '#94a3b8'; ctx.fillRect(ix - 70, iy + 10, 140, 26); ctx.fillStyle = '#e5e7eb'; rr(ctx, ix - 50, iy - 40 - gap, 100, 40, 10); ctx.fill(); ctx.strokeStyle = '#9ca3af'; ctx.stroke(); ctx.fillStyle = L.N; ctx.fillRect(ix - 40, iy - 18 - gap, 40, 12); ctx.fillStyle = L.S; ctx.fillRect(ix, iy - 18 - gap, 40, 12);
        if (S.p.lines !== false && gap < 60) { ctx.strokeStyle = 'rgba(14,116,144,.8)'; ctx.lineWidth = 1.4; for (let j = 1; j <= 2; j++) { ctx.beginPath(); ctx.ellipse(ix, iy - 6 - gap, 20 * j, (10 + gap / 2) * j * .7 + 8, 0, 0, Math.PI); ctx.stroke(); } } });
      MF9.T(ctx, 'شريط مغناطيسي داخل المطاط', ix, iy - 104, { s: 10.5, w: 900, c: '#0e7490' }); MF9.T(ctx, 'إطار فولاذي', ix, iy + 52, { s: 10.5, w: 900, c: '#475569' });
      MF9.T(ctx, S.door < .02 ? 'الباب مغلق بإحكام: المغناطيس يجذب الإطار الفولاذي ✓' : 'اسحب الباب ثم اتركه قريباً من الإطار', MAG9.cx(g.w), 58, { s: 12.5, w: 900, c: '#fff', bg: S.door < .02 ? '#15803d' : '#475569' }); },
    /* ---------- ➕ maglev ---------- */
    maglev(ctx, S) { const g = D.geo(S), k = g.k, ty = g.h * .62; const gap = S.on ? 16 * k : 0; const x = 80 + S.tx * (g.w - 340 * k);
      MAG9.raw(ctx, () => { const sky = ctx.createLinearGradient(0, 0, 0, g.h); sky.addColorStop(0, '#dbeafe'); sky.addColorStop(1, '#f8fafc'); ctx.fillStyle = sky; ctx.fillRect(0, 0, g.w, g.h);
        ctx.fillStyle = '#9ca3af'; ctx.fillRect(64, ty + 20 * k, g.w - 64, 30 * k); ctx.fillStyle = '#6b7280'; for (let px = 100; px < g.w; px += 160) ctx.fillRect(px, ty + 50 * k, 26, g.h - ty);
        for (let xx = 64; xx < g.w; xx += 24 * k) { ctx.fillStyle = (Math.floor(xx / (24 * k)) % 2) ? L.N : L.N; ctx.fillRect(xx, ty + 14 * k, 22 * k, 8 * k); }
        const by = ty - gap; const bg = ctx.createLinearGradient(0, by - 70 * k, 0, by); bg.addColorStop(0, '#f8fafc'); bg.addColorStop(1, '#94a3b8'); ctx.fillStyle = bg; ctx.beginPath(); ctx.moveTo(x, by + 8 * k); ctx.lineTo(x, by - 50 * k); ctx.quadraticCurveTo(x + 10 * k, by - 72 * k, x + 50 * k, by - 72 * k); ctx.lineTo(x + 260 * k, by - 72 * k); ctx.quadraticCurveTo(x + 330 * k, by - 66 * k, x + 340 * k, by - 10 * k); ctx.lineTo(x + 340 * k, by + 8 * k); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#1d4ed8'; ctx.fillRect(x, by - 30 * k, 340 * k, 8 * k); ctx.fillStyle = '#0f172a'; for (let j = 0; j < 7; j++) rr(ctx, x + 40 * k + j * 38 * k, by - 60 * k, 26 * k, 18 * k, 4), ctx.fill();
        for (let xx = x + 8 * k; xx < x + 330 * k; xx += 24 * k) { ctx.fillStyle = L.N; ctx.fillRect(xx, by + 2 * k, 22 * k, 7 * k); }
        if (S.on && S.p.lines !== false) { ctx.strokeStyle = 'rgba(220,38,38,.6)'; ctx.lineWidth = 2; for (let xx = x + 30 * k; xx < x + 320 * k; xx += 48 * k) { G.arrow(ctx, xx, ty + 12 * k, xx, by + 12 * k, '#dc2626', 2, 6); } } });
      MF9.T(ctx, S.on ? 'قوة تنافر بين الأقطاب المتشابهة ترفع القطار فلا يلامس السكة' : 'شغّل المغانط ليرتفع القطار', MAG9.cx(g.w), g.h * .25, { s: 13, w: 900, c: '#fff', bg: S.on ? '#7c3aed' : '#475569' });
      const b = { x: g.w - 92, y: g.h - 70, w: 128, h: 38 }; MAG9.btn(ctx, b, S.on ? '🧲 المغانط تعمل' : '⏻ شغّل المغانط', { col: S.on ? '#7c3aed' : '#475569', on: S.on }); S._btn = b; },
    update(S, dt) { if (!S.W) return; const sc = S.p.sc;
      if (sc === 'crane') D.craneUp(S, dt);
      if (sc === 'spk' && S.on) S.ph += dt * TAU * S.p.f;
      if (sc === 'type' && S.kt > 0) { const was = S.kt > .175; S.kt -= dt; if (was && S.kt <= .175) S.paper += S._keys[S.key].c; }
      if (sc === 'comp') { const c = D.compG(S); const b = MAG9.B([c.m], c.ccx, c.ccy, [0, -2.2e-6]); MAG9.turn(S.nd, Math.atan2(b[1], b[0]), dt, 30, 4); }
      if (sc === 'fridge' && !S.dragD) { const pull = S.door < .18 ? -3.5 : 0; S.dv += (pull - S.dv * 3) * dt; S.door = clamp(S.door + S.dv * dt, 0, 1); if (S.door === 0) S.dv = 0; }
      if (sc === 'maglev' && S.on) { S.tx += dt * .12; if (S.tx > 1) S.tx = 0; } },
    draw(ctx, w, h, S) { G.bg(ctx, w, h, false); const sc = S.p.sc; D[sc](ctx, S); MAG9.banner(ctx, w, sc === 'maglev' ? '➕ من المختبرات العالمية: القطار المغناطيسي المعلّق' : 'استعمالات المغناطيس: ' + SC.find(q => q[0] === sc)[1], sc === 'maglev' ? '#7c3aed' : '#b45309'); },
    drags(S) { if (!S.W) return []; const sc = S.p.sc, L = []; const bt = () => S._btn && L.push(MAG9.btnObj('pow', S._btn, () => { S.on = !S.on; }, { tip: 'شغّل / أطفئ', idle: 'اضغط ✋', hint: true }));
      if (sc === 'crane') { const c = D.craneG(S); L.push({ id: 'disc', x: c.dx, y: c.dy, w: c.dw + 20, h: c.dh + 30, axis: 'xy', keep: true, tip: 'اسحب المغناطيس الكهربائي', idle: 'اسحب الرافعة ✋', down: () => { S._a = S.cr.u; S._b = S.cr.v; }, drag: (S2, d) => { S.cr.u = clamp(S._a + (d.x - d.sx) / (c.x1 - c.x0 - 90), 0, 1); S.cr.v = clamp(S._b + (d.y - d.sy) / (c.by - c.top - 150), 0, 1); } }); bt(); }
      if (sc === 'spk' || sc === 'maglev') bt();
      if (sc === 'type' && S._keys) S._keys.forEach((b, i) => L.push(MAG9.btnObj('k' + i, b, () => { if (S.kt <= 0) { S.key = i; S.kt = .35; } }, { tip: 'اضغط الحرف', idle: i === 0 ? 'اضغط حرفاً ✋' : null, hint: i === 0 })));
      if (sc === 'comp') { const c = D.compG(S); L.push({ id: 'rot', x: c.ccx + Math.cos(S.crot - Math.PI / 2) * c.R * 1.06, y: c.ccy + Math.sin(S.crot - Math.PI / 2) * c.R * 1.06, r: 18, cx: c.ccx, cy: c.ccy, keep: true, tip: 'أدر علبة البوصلة', idle: 'أدر البوصلة ✋', drag: (S2, d) => { S.crot = Math.atan2(d.y - c.ccy, d.x - c.ccx) + Math.PI / 2; } });
        L.push(Object.assign(MF9.magDrag('m', c.m, [0, 0, 1e4, 1e4], { tip: 'قرّب المغناطيس من البوصلة' }), { drag: (S2, d) => { S.cm.u = clamp((c.m._ox + d.x - d.sx - 80) / (c.w - 160), 0, 1); S.cm.v = clamp((c.m._oy + d.y - d.sy - 60) / (c.h - 120), 0, 1); } })); }
      if (sc === 'fridge') { const g = D.geo(S), k = g.k, fx = g.cx - 160 * k, fw = 210 * k; const dx = fx + fw * Math.cos(S.door * 1.3); L.push({ id: 'door', x: dx - 20, y: g.h * .45, w: 60, h: 140, axis: 'x', keep: true, tip: 'اسحب الباب لتفتحه ثم اتركه', idle: 'افتح الباب ✋', down: () => { S.dragD = 1; }, drag: (S2, d) => { S.door = clamp(Math.acos(clamp((d.x + 20 - fx) / fw, -1, 1)) / 1.3, 0, 1); }, up: () => { S.dragD = 0; S.dv = 0; } }); }
      return L; },
    field(S, x, y) { if (!S.W || S.p.sc !== 'comp') return null; const c = D.compG(S); return MAG9.inside(c.m, x, y) ? null : MAG9.B([c.m], x, y, [0, -2.2e-6]); },
    readings(S) { const sc = S.p.sc; const L = [rd('الاستعمال', SC.find(q => q[0] === sc)[1], 1)]; if (sc === 'crane' && S.scrap) L.push(rd('قطع مرفوعة', String(S.scrap.filter(q => q.st === 'att').length)), rd('التيار', S.on ? 'يعمل' : 'مقطوع')); if (sc === 'spk') L.push(rd('التردد', S.p.f + ' Hz')); if (sc === 'type') L.push(rd('النص المطبوع', S.paper || '—')); if (sc === 'comp') L.push(rd('اتجاه الإبرة', Math.round(deg(-S.nd.a)) + '°')); return L; },
    explain(S) { const sc = S.p.sc; return ({ crane: 'عند مرور التيار في ملف المغناطيس الكهربائي يصبح <b>مغناطيساً قوياً</b> يرفع قطع الفولاذ وحديد الخردة (الشكل 3). عند قطع التيار يزول تأثيره فتسقط القطع. لاحظ أن الخشب والألمنيوم لا يُرفعان لأنهما ليسا من المواد الفيرومغناطيسية.', spk: 'في السماعة (الشكل 4) يمر تيار متغير في ملف موضوع في مجال <b>مغناطيس دائمي</b>، فيتأثر الملف بقوة تدفعه وتسحبه، فيهتز المخروط المتصل به ويصدر الصوت. زد التردد يصبح الاهتزاز أسرع.', type: 'في الآلة الكاتبة (الشكل 5) عند الضغط على حرف يمر تيار في <b>مغناطيس كهربائي</b> صغير فيسحب ذراع الحرف ليضرب الورقة ويطبعه، ثم يعود.', comp: 'إبرة البوصلة <b>مغناطيس دائمي صغير</b> يمكنه الدوران بحرية في مستوى أفقي حول محور شاقولي مدبب (الشكل 6)، فيتجه طرفها الشمالي نحو الشمال الجغرافي دائماً مهما أدرنا العلبة. المغناطيس القريب يحرفها، لذلك نبعد البوصلة عن المغانط والحديد.', fridge: '<b>س2 (علل):</b> تكون المغانط ملائمة لأبواب خزانات الملابس والثلاجة لأن الشريط المغناطيسي في الباب <b>يجذب الإطار الفولاذي</b> (مادة فيرومغناطيسية) فيُغلق الباب بإحكام ويمنع تسرب الهواء البارد، ويمكن فتحه بسحب بسيط دون الحاجة إلى أقفال.', maglev: '➕ القطار المغناطيسي المعلّق (ماجليف): مغانط في أسفل القطار وأخرى في السكة <b>أقطابها متشابهة متقابلة فتتنافر</b>، فيرتفع القطار ولا يلامس السكة، فيقل الاحتكاك جداً ويسير بسرعة عالية جداً.' })[sc]; }
  });
  const L = MAG9.COL;
})();
/* =========================================================================================
   EXPERIMENT 2 (book 2-2, p34–35 + Q3): المواد المغناطيسية
   ========================================================================================= */
const MAT9 = { dia: { n: 'دايامغناطيسية', c: '#0f766e', ex: 'بزموث، إنتيمون، نحاس، سيليكون، فضة', d: 'تتنافر مع المغناطيس القوي تنافراً ضعيفاً', mu: .45, chi: -.15 },
  para: { n: 'بارامغناطيسية', c: '#7c3aed', ex: 'ألمنيوم، كالسيوم، صوديوم، تيتانيوم', d: 'تنجذب للمغناطيس القوي تجاذباً ضعيفاً', mu: 1.9, chi: .15 },
  ferro: { n: 'فيرومغناطيسية', c: '#b91c1c', ex: 'حديد، فولاذ، نيكل، كوبلت', d: 'تنجذب للمغناطيس الاعتيادي بقوة، ولها قابلية تمغنط عالية', mu: 60, chi: 40 } };
const MATL9 = [['bi', 'بزموث', 'dia', '#9ca3af'], ['sb', 'إنتيمون', 'dia', '#cbd5e1'], ['cu', 'نحاس', 'dia', '#c2410c'], ['si', 'سيليكون', 'dia', '#475569'], ['ag', 'فضة', 'dia', '#e5e7eb'],
  ['al', 'ألمنيوم', 'para', '#d1d5db'], ['ca', 'كالسيوم', 'para', '#f5f5f4'], ['na', 'صوديوم', 'para', '#e7e5e4'], ['ti', 'تيتانيوم', 'para', '#a8a29e'],
  ['fe', 'حديد', 'ferro', '#6b7280'], ['st', 'فولاذ', 'ferro', '#94a3b8'], ['ni', 'نيكل', 'ferro', '#a3a3a3'], ['co', 'كوبلت', 'ferro', '#64748b']];
/* ---- 2.1 the three kinds (fig 7 a,b,c) + strong-magnet test ---- */
(() => {
  const D = P92({ id: 'g9m_types', page: 34, fig: 'الشكل 7 (a ، b ، c)',
    desc: 'تصنف المواد المختلفة وفقاً لخواصها المغناطيسية إلى ثلاثة أنواع: الدايامغناطيسية، البارامغناطيسية، الفيرومغناطيسية. قارن خطوط المجال خلال كل نوع (الشكل 7)، ثم اختبر أي مادة بمغناطيس قوي.',
    tags: 'دايامغناطيسية بارامغناطيسية فيرومغناطيسية بزموث نحاس فضة ألمنيوم حديد نيكل كوبلت مغناطيس قوي',
    tools: ['مغناطيس قوي', 'خيط', 'حامل', 'عينات من مواد مختلفة'],
    controls: [SEL('mat', 'العينة المعلّقة', MATL9.map(q => [q[0], q[1] + ' (' + MAT9[q[2]].n + ')']), 'bi'), TG('lines', 'خطوط المجال (الشكل 7)', true, null, 'bfield'), TG('arrow', 'سهم القوة على العينة', true, null, 'force'), TG('ex', 'أمثلة كل نوع', true, null, 'labels')],
    steps: ['انظر إلى الشكل 7: خطوط مجال منتظم تمر قرب ثلاث عينات من الأنواع الثلاثة.', 'الدايامغناطيسية: الخطوط تبتعد عنها قليلاً (تطردها). البارامغناطيسية: تتقارب نحوها قليلاً. الفيرومغناطيسية: تتزاحم داخلها بقوة.', 'في الأسفل: اختر عينة من القائمة (أو اضغط على اسمها)، ثم اسحب المغناطيس القوي نحوها.', 'لاحظ: البزموث يبتعد قليلاً، الألمنيوم يقترب قليلاً، والحديد ينجذب بقوة ويلتصق.'],
    concl: ['الدايامغناطيسية (بزموث، إنتيمون، نحاس، سيليكون، فضة): تتنافر مع المغناطيس القوي تنافراً ضعيفاً.', 'البارامغناطيسية (ألمنيوم، كالسيوم، صوديوم، تيتانيوم): تنجذب بالمغناطيس القوي تجاذباً ضعيفاً.', 'الفيرومغناطيسية (حديد، فولاذ، نيكل، كوبلت): تنجذب بالمغناطيس الاعتيادي ولها قابلية تمغنط عالية.'],
    laws: ['g9_mattypes'],
    setup(S) { S.md = .55; S.th = 0; S.om = 0; },
    geo(S) { const w = S.W, h = S.H, x0 = 70, x1 = w - 8, y0 = 44, ym = h * .5; const pw = (x1 - x0) / 3; const P = ['dia', 'para', 'ferro'].map((k, i) => ({ k, r: [x1 - (i + 1) * pw + 4, y0, x1 - i * pw - 4, ym] })); return { w, h, P, ym, x0, x1, k: MAG9.sc(w, h) }; },
    panel(ctx, S, q) { const r = q.r, cx = (r[0] + r[2]) / 2, cy = (r[1] + r[3]) / 2 + 6, b = Math.min(r[2] - r[0], r[3] - r[1]) * .26, M = MAT9[q.k];
      MAG9.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = S.p.mat && MATL9.find(z => z[0] === S.p.mat)[2] === q.k ? M.c : '#cbd5e1'; ctx.lineWidth = 2.5; rr(ctx, r[0], r[1], r[2] - r[0], r[3] - r[1], 10); ctx.fill(); ctx.stroke(); });
      const c = MF9.cache(S, 'cyl' + q.k); const key = r.map(v => v | 0).join(',');
      if (c.key !== key) { const F = MAG9.cylField(M.mu, q.k === 'ferro' ? b * .66 : 0, b, 1); const Fw = (x, y) => F(x - cx, y - cy); const n = 13, L = []; for (let i = 0; i < n; i++) { const y = r[1] + 30 + (r[3] - r[1] - 50) * (i + .5) / n; L.push(MAG9.traceF(Fw, r[0] + 4, y, [r[0] + 2, r[1], r[2] - 2, r[3]], 2.5, 900)); } c.key = key; c.L = L; }
      MAG9.raw(ctx, () => { if (q.k === 'ferro') { const g = ctx.createRadialGradient(cx, cy, b * .6, cx, cy, b); g.addColorStop(0, '#9a3412'); g.addColorStop(.5, '#c2410c'); g.addColorStop(1, '#7c2d12'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, b, 0, TAU); ctx.arc(cx, cy, b * .66, 0, TAU, true); ctx.fill(); }
        else { const g = ctx.createRadialGradient(cx - b * .3, cy - b * .3, 2, cx, cy, b); g.addColorStop(0, '#4d7c0f'); g.addColorStop(1, '#365314'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(cx, cy, b, b * .92, 0, 0, TAU); ctx.fill(); } });
      if (S.p.lines !== false) MF9.clip(ctx, r, () => MAG9.drawLines(ctx, c.L.map(pts => ({ pts })), { col: '#0891b2', lw: 1.3, every: 9999, as: 5 }));
      MF9.T(ctx, (q.k === 'dia' ? '(7-a) ' : q.k === 'para' ? '(7-b) ' : '(7-c) ') + M.n, cx, r[1] + 14, { s: 12, w: 900, c: '#fff', bg: M.c });
      if (S.p.ex !== false) MF9.T(ctx, M.ex, cx, r[3] - 12, { s: (r[2] - r[0]) < 190 ? 9.5 : 11, w: 800, c: M.c }); },
    test(S) { const g = D.geo(S), y0 = g.ym + 30, by = g.h - 70, sx = MAG9.cx(g.w) + 60 * g.k, top = y0 + 30, Lth = Math.min(160, by - top - 60); const mx = sx - 40 - S.md * 220 * g.k; return { y0, by, sx, top, Lth, mx, my: top + Lth }; },
    update(S, dt) { if (!S.W) return; const t = D.test(S), mat = MATL9.find(q => q[0] === S.p.mat), M = MAT9[mat[2]]; const bx = t.sx + Math.sin(S.th) * t.Lth; const d = Math.max(8, bx - 18 - (t.mx + 22)); let F = M.chi * 9e5 / Math.pow(d + 30, 3);
      if (M.chi > 10 && d < 40) F *= 4; const tau = -F * Math.cos(S.th) - 9.8 * Math.sin(S.th) * 1.2; S.om += (tau * 4 - 4 * S.om) * Math.min(dt, .03); S.th += S.om * Math.min(dt, .03); const thMin = Math.asin(clamp((t.mx + 22 + 18 - t.sx) / t.Lth, -.95, .95)); S.th = clamp(S.th, Math.max(-.9, thMin), .55); S.stick = S.th <= thMin + .002 && F > 0 ? 1 : 0; if (S.stick) S.om = 0; S.F = F; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; G.bg(ctx, w, h, false); MAG9.raw(ctx, () => { ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, w, h); });
      g.P.forEach(q => D.panel(ctx, S, q));
      // strong magnet test
      const t = D.test(S), mat = MATL9.find(q => q[0] === p.mat), M = MAT9[mat[2]];
      K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, g.ym + 8, 0, h); gg.addColorStop(0, '#eef2ff'); gg.addColorStop(1, '#e0e7ff'); ctx.fillStyle = gg; rr(ctx, 70, g.ym + 10, w - 78, h - g.ym - 52, 12); ctx.fill(); });
      Q24.stand(ctx, t.sx + 70, t.by, t.top - 20, 150); MAG9.raw(ctx, () => { ctx.fillStyle = '#b45309'; ctx.fillRect(t.sx - 4, t.top - 24, 78, 7); });
      const bx = t.sx + Math.sin(S.th) * t.Lth, byy = t.top + Math.cos(S.th) * t.Lth;
      MAG9.raw(ctx, () => { ctx.strokeStyle = '#78716c'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(t.sx, t.top - 18); ctx.lineTo(bx, byy - 12); ctx.stroke(); const gg = ctx.createLinearGradient(bx - 18, 0, bx + 18, 0); gg.addColorStop(0, shade(mat[3], -60)); gg.addColorStop(.4, shade(mat[3], 30)); gg.addColorStop(1, shade(mat[3], -70)); ctx.fillStyle = gg; rr(ctx, bx - 18, byy - 12, 36, 24, 5); ctx.fill(); });
      MF9.T(ctx, mat[1], bx, byy + 24, { s: 12, w: 900, c: '#fff', bg: M.c });
      const mag = MAG9.bar(t.mx, t.my, 0, 160 * g.k + 20, 44 * g.k + 6, 2); mag.x = t.mx - mag.L / 2 + 22; MAG9.drawMag(ctx, mag); MF9.T(ctx, 'مغناطيس قوي', mag.x, t.my - mag.T / 2 - 14, { s: 11.5, w: 900, c: '#fff', bg: '#334155' });
      if (p.arrow !== false && Math.abs(S.F) > .2) { const l = clamp(Math.sign(S.F) * Math.sqrt(Math.abs(S.F)) * 9, -80, 80); C2.force(ctx, bx, byy - 30, -l, 0, S.F > 0 ? (M.chi > 10 ? 'تجاذب قوي' : 'تجاذب ضعيف') : 'تنافر ضعيف', S.F > 0 ? '#dc2626' : '#2563eb', 3.5); }
      MF9.T(ctx, M.chi > 10 ? 'فيرومغناطيسية: تنجذب بقوة' + (S.stick ? ' وتلتصق بالمغناطيس ✓' : '') : (M.chi > 0 ? 'بارامغناطيسية: تنجذب قليلاً' : 'دايامغناطيسية: تبتعد قليلاً') + ' (الحركة مكبّرة للتوضيح)', (70 + w) / 2, h - 88, { s: 12, w: 900, c: '#fff', bg: M.c });
      MF9.T(ctx, 'اختبار بمغناطيس قوي', 140, g.ym + 28, { s: 12, w: 900, c: '#3730a3' });
      MAG9.banner(ctx, w, 'المواد المغناطيسية: الأنواع الثلاثة (الشكل 7)', '#7c3aed');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), t = D.test(S), L = [{ id: 'mag', x: t.mx - 40, y: t.my, w: 130, h: 60, axis: 'x', keep: true, tip: 'اسحب المغناطيس القوي نحو العينة', idle: 'قرّب المغناطيس ✋', down: () => { S._a = S.md; }, drag: (S2, d) => { S.md = clamp(S._a - (d.x - d.sx) / (220 * g.k), -.12, 1); } }];
      g.P.forEach(q => L.push({ id: 'pn' + q.k, x: (q.r[0] + q.r[2]) / 2, y: (q.r[1] + q.r[3]) / 2, w: q.r[2] - q.r[0] - 10, h: q.r[3] - q.r[1] - 40, tip: 'اختر عينة من هذا النوع', hint: false, click: () => { const list = MATL9.filter(z => z[2] === q.k); const cur = list.findIndex(z => z[0] === S.p.mat); setParam(S, 'mat', list[(cur + 1) % list.length][0]); S.th = 0; S.om = 0; } })); return L; },
    readings(S) { const mat = MATL9.find(q => q[0] === S.p.mat), M = MAT9[mat[2]]; return [rd('العينة', mat[1]), rd('نوعها', M.n), rd('سلوكها', M.d, 1)]; },
    explain(S) { const mat = MATL9.find(q => q[0] === S.p.mat), M = MAT9[mat[2]]; return '<b>' + mat[1] + '</b> مادة <b>' + M.n + '</b>: ' + M.d + '. ' + (mat[2] === 'dia' ? 'لذلك تبتعد العينة قليلاً عن المغناطيس القوي، وخطوط المجال تتباعد عنها (الشكل 7-a).' : mat[2] === 'para' ? 'لذلك تقترب العينة قليلاً من المغناطيس القوي، وتتقارب الخطوط نحوها قليلاً (الشكل 7-b).' : 'لذلك تنجذب بقوة حتى بمغناطيس اعتيادي، وتتزاحم الخطوط داخلها (الشكل 7-c).') + '<br><small>ملاحظة: حركة الدايا والبارا ضعيفة جداً في الواقع، كبّرناها هنا لنراها.</small>'; }
  });
})();
/* ---- 2.2 what is attracted? (fig 8) ---- */
(() => {
  const IT = [['clip', 'مشبك ورق', 1], ['clip', 'مشبك ورق', 1], ['clip', 'مشبك ورق', 1], ['pin', 'دبوس', 1], ['pin', 'دبوس', 1], ['needle', 'إبرة', 1], ['pencil', 'قلم رصاص', 0], ['chalk', 'طباشير', 0], ['chalk2', 'طباشير', 0], ['eraser', 'ممحاة', 0],
    ['nail', 'مسمار حديد ➕', 1], ['spoon', 'ملعقة فولاذ ➕', 1], ['can', 'علبة ألمنيوم ➕', 0], ['coin', 'نقود نحاسية ➕', 0]];
  const D = P92({ id: 'g9m_sort', page: 35, fig: 'الشكل 8',
    desc: 'من الشكل 8 نلاحظ بعضاً من المواد المصنوعة من الفيرومغناطيسية تنجذب بقوة نحو المغناطيس (مثل ماسكات الأوراق والدبابيس والإبر…) بينما قلم الرصاص وقطع الطباشير والممحاة لا تتأثر بالمغناطيس.',
    tags: 'ماسكات الأوراق دبابيس إبر قلم رصاص طباشير ممحاة تنجذب لا تنجذب',
    tools: ['مغناطيس حرف U', 'مشابك ورق', 'دبابيس', 'إبر', 'قلم رصاص', 'طباشير', 'ممحاة'],
    controls: [BT('', [{ t: '🧲 انزع ما التصق', on: S => MAG9.dropAll(S.it) }, { t: '↺ من جديد', on: S => D.setup(S) }]), TG('tab', 'جدول النتائج', true, null, 'labels'), TG('lines', 'خطوط المجال', false, null, 'bfield')],
    steps: ['اسحب مغناطيس حرف U (كما في الشكل 8) فوق الأشياء الموضوعة على الطاولة.', 'لاحظ الأشياء التي تقفز وتلتصق بالمغناطيس، والأشياء التي لا تتأثر.', 'كل شيء يقترب منه المغناطيس يُسجَّل في جدول النتائج.', 'جرّب أيضاً الأشياء الإضافية (➕): مسمار، ملعقة فولاذ، علبة ألمنيوم، نقود نحاسية.'],
    concl: ['الأشياء المصنوعة من مواد فيرومغناطيسية (حديد، فولاذ) كماسكات الأوراق والدبابيس والإبر تنجذب بقوة نحو المغناطيس.', 'قلم الرصاص والطباشير والممحاة (وكذلك الألمنيوم والنحاس) لا تتأثر بالمغناطيس الاعتيادي.'],
    laws: ['g9_mattypes'],
    setup(S) { S.mu = { u: .5, v: .1 }; S.tested = {}; S.it = IT.map((q, i) => ({ kind: q[0], name: q[1], ferro: !!q[2], k: 1, u: .04 + .92 * ((i * 5) % IT.length) / (IT.length - 1), a: 0, ra: 0, st: 'rest', x: 0, y: 0, id: i })); S.place = 1; },
    geo(S) { const w = S.W, h = S.H, k = MAG9.sc(w, h), by = h * .72, x0 = 90, x1 = S.p.tab !== false && w > 600 ? w - 230 : w - 30; let m = S._m || (S._m = MAG9.U(0, 0, Math.PI / 2, 1, 1, 1, 1.4, { uStyle: 'red' })); Object.assign(m, { x: x0 + S.mu.u * (x1 - x0), y: 70 + S.mu.v * (by - 120), W: Math.round(120 * k), H: Math.round(90 * k), t: Math.round(34 * k) }); return { w, h, k, by, x0, x1, m }; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); if (S.place) { S.place = 0; } S.it.forEach(it => { it.y0 = g.by - 8; if (it.st === 'rest') { it.x = g.x0 + it.u * (g.x1 - g.x0); it.y = it.y0; } });
      MAG9.pick(S, [g.m], S.it, dt, { cap: 5, len: 26 * g.k + 4, th: 1.1e-4, reach: 160 * g.k });
      const P = MAG9.prep([g.m]); S.it.forEach(it => { const b = MAG9.Bp(P, it.x, it.y); if (Math.hypot(b[0], b[1]) > 1.1e-4 || it.st !== 'rest') S.tested[it.name] = it.ferro; }); },
    drawThing(ctx, it, k) { const x = it.x, y = it.y, a = it.st === 'rest' ? 0 : it.a - Math.PI / 2; MAG9.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(k, k);
      if (it.kind === 'pencil') { ctx.fillStyle = '#facc15'; ctx.fillRect(-40, -5, 70, 10); ctx.fillStyle = '#f5d0a9'; ctx.beginPath(); ctx.moveTo(30, -5); ctx.lineTo(44, 0); ctx.lineTo(30, 5); ctx.fill(); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.moveTo(40, -1.5); ctx.lineTo(44, 0); ctx.lineTo(40, 1.5); ctx.fill(); ctx.fillStyle = '#f472b6'; ctx.fillRect(-48, -5, 8, 10); }
      else if (it.kind === 'chalk' || it.kind === 'chalk2') { ctx.fillStyle = it.kind === 'chalk' ? '#f8fafc' : '#f9a8d4'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; rr(ctx, -20, -5, 40, 10, 4); ctx.fill(); ctx.stroke(); }
      else if (it.kind === 'eraser') { ctx.fillStyle = '#fef3c7'; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 1; rr(ctx, -18, -8, 36, 16, 4); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#60a5fa'; ctx.fillRect(-18, -8, 14, 16); }
      else if (it.kind === 'spoon') { ctx.fillStyle = '#cbd5e1'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(18, 0, 11, 7, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillRect(-26, -2, 36, 4); ctx.strokeRect(-26, -2, 36, 4); }
      else if (it.kind === 'can') { const gg = ctx.createLinearGradient(0, -14, 0, 14); gg.addColorStop(0, '#f8fafc'); gg.addColorStop(.5, '#cbd5e1'); gg.addColorStop(1, '#64748b'); ctx.fillStyle = gg; rr(ctx, -16, -14, 32, 28, 5); ctx.fill(); ctx.fillStyle = '#ef4444'; ctx.fillRect(-16, -5, 32, 8); }
      else if (it.kind === 'coin') { const gg = ctx.createRadialGradient(-3, -3, 1, 0, 0, 10); gg.addColorStop(0, '#fdba74'); gg.addColorStop(1, '#9a3412'); ctx.fillStyle = gg; ctx.beginPath(); ctx.ellipse(0, 3, 11, 5, 0, 0, TAU); ctx.fill(); }
      ctx.restore(); });
      if (['clip', 'pin', 'needle', 'nail'].includes(it.kind)) MAG9.drawItem(ctx, Object.assign({}, it, { a: it.st === 'rest' ? 0 : it.a }), k); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { benchY: g.by });
      MAG9.raw(ctx, () => { ctx.fillStyle = 'rgba(134,239,172,.75)'; ctx.beginPath(); ctx.moveTo(g.x0 - 30, g.by + 2); ctx.lineTo(g.x1 + 30, g.by + 2); ctx.lineTo(g.x1 + 46, g.by + 34); ctx.lineTo(g.x0 - 46, g.by + 34); ctx.closePath(); ctx.fill(); });
      if (p.lines) MF9.clip(ctx, [64, 40, w, g.by], () => MAG9.drawLines(ctx, MAG9.lines(MF9.cache(S, 's').l, [g.m], [64, 40, w, h], { n: 12 }), { col: '#0e7490', alpha: .5 }));
      S.it.filter(it => it.st === 'rest' || it.st === 'fall').forEach(it => D.drawThing(ctx, it, g.k * .9 + .15));
      C2.hand(ctx, g.m.x + 2, g.m.y - g.m.W / 2 + 6, 1, 1.2, { rot: Math.PI / 2, sleeve: '#2563eb' });
      MAG9.drawMag(ctx, g.m, { uStyle: 'red' }); S.it.filter(it => it.st === 'att' || it.st === 'fly').forEach(it => D.drawThing(ctx, it, g.k * .9 + .15));
      if (p.tab !== false) { const yes = Object.keys(S.tested).filter(k => S.tested[k]), no = Object.keys(S.tested).filter(k => !S.tested[k]); const X = w - 12, wd = w > 600 ? 210 : Math.min(200, w * .5);
        const h1 = C2.lines(ctx, (yes.length ? yes : ['—']).map(t => ({ t: '✓ ' + t, c: '#15803d', s: 12 })), X, 46, wd, { title: 'تنجذب للمغناطيس', bd: '#15803d', lh: 19 });
        C2.lines(ctx, (no.length ? no : ['—']).map(t => ({ t: '✗ ' + t, c: '#b91c1c', s: 12 })), X, 56 + h1, wd, { title: 'لا تتأثر بالمغناطيس', bd: '#b91c1c', lh: 19 }); }
      MAG9.banner(ctx, w, 'الشكل 8: ماذا ينجذب إلى المغناطيس؟ اسحب المغناطيس فوق الأشياء', '#b91c1c');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'mag', x: g.m.x, y: g.m.y, hit: (x, y) => MAG9.inside(g.m, x, y) || Math.hypot(x - g.m.x, y - g.m.y) < 50, axis: 'xy', keep: true, tip: 'اسحب المغناطيس فوق الأشياء', idle: 'اسحب المغناطيس ✋', down: () => { S._a = g.m.x; S._b = g.m.y; }, drag: (S2, d) => { S.mu = { u: clamp((S._a + d.x - d.sx - g.x0) / (g.x1 - g.x0), 0, 1), v: clamp((S._b + d.y - d.sy - 70) / (g.by - 120), 0, 1.2) }; } }]; },
    field(S, x, y) { if (!S.W) return null; const m = D.geo(S).m; return MAG9.inside(m, x, y) ? null : MAG9.B([m], x, y); },
    readings(S) { const n = Object.keys(S.tested).length; return [rd('أشياء مختبرة', n + ' من ' + new Set(IT.map(q => q[1])).size), rd('تنجذب', Object.keys(S.tested).filter(k => S.tested[k]).join('، ') || '—', 1), rd('لا تنجذب', Object.keys(S.tested).filter(k => !S.tested[k]).join('، ') || '—', 1)]; },
    explain(S) { const n = Object.keys(S.tested).length; return (n ? 'اختبرت ' + n + ' أشياء. ' : '') + 'ماسكات الأوراق والدبابيس والإبر مصنوعة من <b>الفولاذ</b> (مادة فيرومغناطيسية) فتنجذب بقوة. أما قلم الرصاص (خشب وجرافيت) والطباشير والممحاة فلا تتأثر بالمغناطيس. والألمنيوم والنحاس لا يتأثران بالمغناطيس الاعتيادي لأن تأثرهما ضعيف جداً (بارا ودايا).'; }
  });
})();
/* ---- 2.3 review Q3: identify aluminium, iron and a magnet among three identical rods ---- */
(() => {
  const TY = { al: 'ألمنيوم', fe: 'حديد', mg: 'مغناطيس' }, CY = ['?', 'al', 'fe', 'mg'];
  const D = P92({ id: 'g9m_q3', page: 46, fig: 'أسئلة الفصل: س3',
    desc: 'س3: لو أعطيت ثلاث سيقان معدنية متشابهة تماماً إحداها ألمنيوم والأخرى حديد والثالثة مغناطيس دائمي، وضّح كيف يمكنك أن تميّز الواحدة منها عن الأخريات. استعمل البوصلة وبرادة الحديد وتقريب السيقان من بعضها.',
    tags: 'س3 سيقان ألمنيوم حديد مغناطيس تمييز بوصلة برادة',
    tools: ['ثلاث سيقان متشابهة', 'بوصلة', 'برادة الحديد'],
    controls: [BT('', [{ t: '✅ تحقّق من إجابتي', on: S => D.check(S) }, { t: '🔀 سيقان جديدة', on: S => D.setup(S) }]), TG('lines', 'خطوط المجال (للتأكد)', false, null, 'bfield')],
    steps: ['السيقان الثلاث تبدو متشابهة تماماً: 1 و 2 و 3.', 'الاختبار 1: اسحب البوصلة قرب طرفي كل ساق: الساق التي تجذب أحد طرفي الإبرة وتطرد الآخر هي المغناطيس.', 'الاختبار 2: اسحب ساقاً إلى صحن برادة الحديد: التي تجمع البرادة عند طرفيها هي المغناطيس.', 'الاختبار 3: قرّب طرف ساق من ساق أخرى: المغناطيس والحديد يتجاذبان، أما الألمنيوم فلا يتأثر.', 'اضغط على البطاقة تحت كل ساق لتختار نوعها، ثم «تحقّق».'],
    concl: ['المغناطيس: يجذب أحد طرفي إبرة البوصلة ويطرد الطرف الآخر، ويجمع برادة الحديد عند طرفيه.', 'الحديد: يجذب طرفي إبرة البوصلة كليهما (يتمغنط بالحث)، ولا يجمع البرادة، وينجذب إلى المغناطيس.', 'الألمنيوم: لا يؤثر في البوصلة ولا في البرادة ولا ينجذب إلى المغناطيس.'],
    laws: ['g9_mattypes', 'g9_poles'],
    setup(S) { const r = MAG9.rng((Date.now() / 1000) | 0); const t = ['al', 'fe', 'mg'].sort(() => r() - .5); S.R = t.map((ty, i) => ({ ty, u: .2 + .3 * i, v: .3, a: Math.PI / 2, flip: r() > .5, ans: 0 })); S.cp = { u: .9, v: .5 }; S.nd = { a: -Math.PI / 2, w: 0 }; S.res = null; S.msg = ''; },
    geo(S) { const w = S.W, h = S.H, k = MAG9.sc(w, h), r = [70, 44, w - 10, h - 40]; const tray = { x: r[0] + 80, y: r[3] - 70, w: 140 * k + 40, h: 50 };
      const rods = S.R.map((q, i) => { const m = q.m || (q.m = MAG9.bar(0, 0, Math.PI / 2, 1, 1, 1)); Object.assign(m, { x: r[0] + q.u * (r[2] - r[0]), y: r[1] + q.v * (r[3] - r[1]), L: Math.round(150 * k), T: Math.round(24 * k), flip: q.flip, str: q.ty === 'mg' ? 1 : 0 }); return m; });
      return { w, h, k, r, tray, rods }; },
    /* effective poles: magnet = its poles; iron rods get induced poles from the compass/magnet nearby */
    poles(S, g, cx, cy) { const P = []; S.R.forEach((q, i) => { const m = g.rods[i]; if (q.ty === 'mg') P.push(...MAG9.prep([m])); }); return P; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S), [cx, cy] = [g.r[0] + S.cp.u * (g.r[2] - g.r[0]), g.r[1] + S.cp.v * (g.r[3] - g.r[1])];
      const P = D.poles(S, g); const b = MAG9.Bp(P, cx, cy, [0, -2.2e-6]); let tg = Math.atan2(b[1], b[0]);
      // nearest iron rod end attracts the nearer end of the needle
      S.R.forEach((q, i) => { if (q.ty !== 'fe') return; const m = g.rods[i], gg = MAG9.geo(m); gg.tips.forEach(t => { const d = Math.hypot(t.p[0] - cx, t.p[1] - cy); if (d < 70 * g.k + 30) { const dir = Math.atan2(t.p[1] - cy, t.p[0] - cx); const e1 = Math.abs(Math.atan2(Math.sin(dir - S.nd.a), Math.cos(dir - S.nd.a))); tg = e1 < Math.PI / 2 ? dir : dir + Math.PI; } }); });
      MAG9.turn(S.nd, tg, dt, 50, 6);
      // filings tray / touch tests
      S.R.forEach((q, i) => { const m = g.rods[i]; q.inTray = Math.abs(m.x - (g.tray.x)) < g.tray.w / 2 && Math.abs(m.y + m.L / 2 - g.tray.y) < 40; }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { benchY: 44, tiles: false });
      if (p.lines) MF9.clip(ctx, g.r, () => MAG9.drawLines(ctx, MAG9.lines(MF9.cache(S, 'q3').l, g.rods.filter((m, i) => S.R[i].ty === 'mg'), g.r, { n: 12 }), { col: '#0e7490', alpha: .45 }));
      // filings tray
      MAG9.raw(ctx, () => { const t = g.tray; ctx.fillStyle = '#e7e5e4'; ctx.strokeStyle = '#78716c'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(t.x, t.y, t.w / 2, t.h / 2, 0, 0, TAU); ctx.fill(); ctx.stroke(); const r2 = MAG9.rng(4); ctx.fillStyle = '#292524'; for (let k = 0; k < 160; k++) { const a = r2() * TAU, rr2 = Math.sqrt(r2()); ctx.fillRect(t.x + Math.cos(a) * rr2 * t.w * .45, t.y + Math.sin(a) * rr2 * t.h * .4, 2, 1.2); } });
      MF9.T(ctx, 'صحن برادة الحديد', g.tray.x, g.tray.y + 40, { s: 11, w: 800, c: '#44403c' });
      S._lab = [];
      g.rods.forEach((m, i) => { const q = S.R[i];
        MAG9.drawMag(ctx, Object.assign({}, m, { kind: 'needle', plain: true, _g: null, str: 1 }), {});
        MF9.T(ctx, String(i + 1), m.x, m.y, { s: 15, w: 900, c: '#1f2937', bg: 'rgba(255,255,255,.85)' });
        if (q.inTray && q.ty === 'mg') MAG9.raw(ctx, () => { const gg = MAG9.geo(m); ctx.strokeStyle = '#1c1917'; ctx.lineWidth = 1.2; gg.tips.forEach(t => { for (let k = 0; k < 26; k++) { const a = Math.atan2(t.out[1], t.out[0]) + (k / 25 - .5) * 2.6, l = 6 + (k % 5) * 2.5; ctx.beginPath(); ctx.moveTo(t.p[0] + Math.cos(a) * 3, t.p[1] + Math.sin(a) * 3); ctx.lineTo(t.p[0] + Math.cos(a) * l * 1.6, t.p[1] + Math.sin(a) * l * 1.6); ctx.stroke(); } }); });
        const lb = { x: m.x, y: m.y + m.L / 2 + 22, w: 92, h: 28, i }; S._lab.push(lb); const c = CY[q.ans]; const ok = S.res && S.res[i];
        MAG9.btn(ctx, lb, c === '?' ? 'ما نوعها؟' : TY[c], { col: S.res ? (ok ? '#15803d' : '#dc2626') : '#475569', s: 12 }); });
      // touching rods
      const T = D.touch(S, g); if (T) MF9.T(ctx, T, MAG9.cx(w), 60, { s: 13, w: 900, c: '#fff', bg: '#0e7490' });
      const [cx, cy] = [g.r[0] + S.cp.u * (g.r[2] - g.r[0]), g.r[1] + S.cp.v * (g.r[3] - g.r[1])]; MAG9.compass(ctx, cx, cy, 30, S.nd.a);
      if (S.res) MF9.T(ctx, S.res.every(x => x) ? '✓ أحسنت! ميّزت السيقان الثلاث' : '✗ بعض الإجابات غير صحيحة، أعد الاختبارات', MAG9.cx(w), h - 96, { s: 13, w: 900, c: '#fff', bg: S.res.every(x => x) ? '#15803d' : '#dc2626' });
      K.party(ctx, S); MAG9.banner(ctx, w, 'س3: ميّز بين ساق ألمنيوم وساق حديد ومغناطيس', '#be123c');
    },
    touch(S, g) { for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { if (i === j) continue; const a = MAG9.geo(g.rods[i]), b = g.rods[j]; for (const t of a.tips) { const bb = MAG9.geo(b); const dx = Math.abs(t.p[0] - b.x), dy = Math.abs(t.p[1] - b.y); if (dx < b.T / 2 + 14 && dy < b.L / 2 + 14) { const A = S.R[i].ty, B = S.R[j].ty; const at = (A === 'mg' && B !== 'al') || (B === 'mg' && A !== 'al'); return 'الساقان ' + (i + 1) + ' و ' + (j + 1) + ': ' + (at ? 'تتجاذبان 🧲' : 'لا تتجاذبان'); } } } return null; },
    check(S) { S.res = S.R.map(q => CY[q.ans] === q.ty); if (S.res.every(x => x) && S.W) K.cheer(S, S.W / 2, S.H * .3); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = [];
      g.rods.forEach((m, i) => L.push({ id: 'rod' + i, x: m.x, y: m.y, w: m.T + 26, h: m.L, axis: 'xy', keep: true, tip: 'اسحب الساق', idle: i === 0 ? 'اسحب الساق ✋' : null, hint: i === 0, down: () => { S._a = m.x; S._b = m.y; }, drag: (S2, d) => { S.R[i].u = clamp((S._a + d.x - d.sx - g.r[0]) / (g.r[2] - g.r[0]), .03, .97); S.R[i].v = clamp((S._b + d.y - d.sy - g.r[1]) / (g.r[3] - g.r[1]), .12, .8); S.res = null; } }));
      (S._lab || []).forEach(b => L.push(MAG9.btnObj('lab' + b.i, b, () => { const q = S.R[b.i]; q.ans = (q.ans + 1) % 4; if (!q.ans) q.ans = 1; S.res = null; }, { tip: 'اضغط لتختار نوع الساق' })));
      const [cx, cy] = [g.r[0] + S.cp.u * (g.r[2] - g.r[0]), g.r[1] + S.cp.v * (g.r[3] - g.r[1])]; L.push({ id: 'comp', x: cx, y: cy, r: 32, axis: 'xy', keep: true, tip: 'اسحب البوصلة قرب أطراف السيقان', down: () => { S._c = cx; S._d = cy; }, drag: (S2, d) => { S.cp = { u: clamp((S._c + d.x - d.sx - g.r[0]) / (g.r[2] - g.r[0]), .03, .97), v: clamp((S._d + d.y - d.sy - g.r[1]) / (g.r[3] - g.r[1]), .05, .95) }; } });
      return L; },
    field(S, x, y) { if (!S.W) return null; const g = D.geo(S); const M = g.rods.filter((m, i) => S.R[i].ty === 'mg'); return MAG9.insideAny(g.rods, x, y) ? null : MAG9.B(M, x, y, [0, -2.2e-6]); },
    readings(S) { return S.R.map((q, i) => rd('الساق ' + (i + 1), CY[q.ans] === '?' ? '؟' : TY[CY[q.ans]] + (S.res ? (S.res[i] ? ' ✓' : ' ✗') : ''))); },
    explain(S) { return 'فكرة الحل: <b>المغناطيس</b> هو الساق الوحيدة التي تجذب أحد طرفي إبرة البوصلة وتطرد الطرف الآخر (التنافر يحدث فقط بين مغناطيسين)، وتجمع برادة الحديد عند طرفيها. <b>الحديد</b> يجذب طرفي الإبرة كليهما، وينجذب إلى المغناطيس. <b>الألمنيوم</b> لا يتأثر بشيء من ذلك.'; }
  });
})();
/* =========================================================================================
   EXPERIMENT 3 (book p36–38): الأقطاب المغناطيسية والقوى بينها
   ========================================================================================= */
/* ---- 3.1 where is the force greatest? dipping a magnet in iron filings / clips (fig 9 a,b,c) ---- */
(() => {
  const D = P92({ id: 'g9m_poles', page: 36, fig: 'الشكل 9 (a ، b ، c)',
    desc: 'المغناطيس يحتوي قطبين مغناطيسيين: شمالي (الباحث عن الشمال) وجنوبي (الباحث عن الجنوب). الأقطاب المغناطيسية مناطق في المغناطيس يكون عندها مقدار القوة المغناطيسية بأعظم ما يمكن. اغمس المغناطيس في برادة الحديد أو في مشابك الورق وارفعه.',
    tags: 'الأقطاب المغناطيسية قطب شمالي جنوبي باحث عن الشمال برادة الحديد تجمع عند القطبين',
    tools: ['ساق مغناطيسية', 'مغناطيس حرف U', 'برادة الحديد', 'مشابك ورق'],
    controls: [SEL('mg', 'المغناطيس', [['bar', 'ساق مستقيمة (9-a)'], ['U', 'حرف U (9-c)']], 'bar'), SEL('dip', 'نغمسه في', [['fil', 'برادة الحديد'], ['clip', 'مشابك ورق (9-b)']], 'fil'), BT('', [{ t: '🧹 نظّف المغناطيس', on: S => { S.dipped = 0; MAG9.dropAll(S.it); } }]), TG('graph', 'منحنى شدة القوة على طول المغناطيس', true, null, 'graph'), TG('lines', 'خطوط المجال', false, null, 'bfield')],
    steps: ['امسك المغناطيس (اسحبه) واغمسه في صحن برادة الحديد ثم ارفعه.', 'لاحظ: تتجمع البرادة بتركيز عالٍ عند طرفي المغناطيس (القطبين)، ولا تكاد تلتصق في وسطه (الشكل 9-a).', 'غيّر المغناطيس إلى حرف U وكرر (الشكل 9-c).', 'اختر «مشابك ورق» واغمس المغناطيس فيها: تتعلق المشابك عند القطبين (الشكل 9-b).', 'شغّل «منحنى شدة القوة»: القوة أعظم ما يمكن عند الطرفين وأقل ما يمكن في الوسط.'],
    concl: ['للمغناطيس قطبان: شمالي N (الباحث عن الشمال) وجنوبي S (الباحث عن الجنوب).', 'الأقطاب المغناطيسية مناطق في المغناطيس يكون عندها مقدار القوة المغناطيسية بأعظم ما يمكن، لذلك تتجمع البرادة عندها.'],
    laws: ['g9_poles'],
    setup(S) { S.my = .2; S.dipped = 0; S.it = []; },
    geo(S) { const w = S.W, h = S.H, k = MAG9.sc(w, h), cx = MAG9.cx(w) - 30, ty = h * .74, tw = Math.min(w - 140, 520 * k + 60), th = 70 * k + 20; const top = 120, y = top + S.my * (ty + 10 - top);
      let m; if (S.p.mg === 'bar') m = Object.assign(S._b || (S._b = MAG9.bar(0, 0, 0, 1, 1, 1)), { x: cx, y, L: Math.round(260 * k), T: Math.round(40 * k) }); else m = Object.assign(S._u || (S._u = MAG9.U(0, 0, Math.PI / 2, 1, 1, 1, 1.2, { uStyle: 'red' })), { x: cx, y: y - 60 * k, W: Math.round(170 * k), H: Math.round(120 * k), t: Math.round(46 * k) });
      return { w, h, k, cx, ty, tw, th, m, top }; },
    inTray(g) { const bb = MAG9.geo(g.m).bb; return bb[3] > g.ty + 6; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); if (S.p.dip === 'fil') { if (D.inTray(g)) S.dipped = 1; }
      else { if (!S.it.length || S._mg !== S.p.mg) { S._mg = S.p.mg; S.it = []; const r = MAG9.rng(9); for (let i = 0; i < 30; i++) S.it.push({ kind: 'clip', ferro: true, k: 1, x: g.cx - g.tw * .42 + r() * g.tw * .84, y: g.ty + 14 + r() * (g.th - 30), a: r() * 3, st: 'rest' }); S.it.forEach(it => { it.y0 = it.y; it.ra = it.a; }); }
        MAG9.pick(S, [g.m], S.it, dt, { cap: 6, len: 24 * g.k + 4, th: 1.5e-4, reach: 60 * g.k + 20 }); } },
    tufts(ctx, S, g) { const m = g.m, gg = MAG9.geo(m), P = MAG9.prep([m]), pl = gg.poly, r = MAG9.rng(3); MAG9.raw(ctx, () => { ctx.strokeStyle = '#1c1917'; ctx.lineWidth = 1.1; ctx.lineCap = 'round'; ctx.beginPath();
      for (let i = 0; i < pl.length; i++) { const a = pl[i], b = pl[(i + 1) % pl.length]; const len = Math.hypot(b[0] - a[0], b[1] - a[1]); const n = Math.ceil(len / 2.2); for (let k = 0; k < n; k++) { const f = (k + r()) / n, x = a[0] + (b[0] - a[0]) * f, y = a[1] + (b[1] - a[1]) * f; let nx = (b[1] - a[1]) / len, ny = -(b[0] - a[0]) / len; if (MAG9.inPoly(pl, x + nx * 2, y + ny * 2)) { nx = -nx; ny = -ny; }
        const B = MAG9.Bp(P, x + nx * 3, y + ny * 3), mB = Math.hypot(B[0], B[1]); const L = clamp(Math.pow(mB / 1.2e-3, .8) * 26 * g.k, 0, 30 * g.k); if (L < 1.5 || r() > clamp(mB / 4e-4, 0, 1)) continue; let ux = B[0] / mB, uy = B[1] / mB; if (ux * nx + uy * ny < 0) { ux = -ux; uy = -uy; }
        // a tuft: a few bristles following the field, sagging under gravity
        for (let j = 0; j < 2; j++) { const jx = (r() - .5) * 3, jy = (r() - .5) * 3; ctx.moveTo(x + jx, y + jy); const ex = x + jx + ux * L * (.6 + .4 * r()), ey = y + jy + uy * L * (.6 + .4 * r()) + L * .15; ctx.quadraticCurveTo((x + ex) / 2 + ux * 2, (y + ey) / 2 + uy * 2, ex, ey); } } }
      ctx.stroke(); ctx.lineCap = 'butt'; }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { benchY: g.ty + g.th - 6 });
      if (p.lines) MF9.clip(ctx, [64, 40, w, g.ty], () => MAG9.drawLines(ctx, MAG9.lines(MF9.cache(S, 'l' + p.mg).l, [g.m], [64, 40, w, h], { n: 14 }), { col: '#0e7490', alpha: .55 }));
      // tray
      MAG9.raw(ctx, () => { const x = g.cx - g.tw / 2; const gg = ctx.createLinearGradient(0, g.ty, 0, g.ty + g.th); gg.addColorStop(0, '#d6d3d1'); gg.addColorStop(1, '#a8a29e'); ctx.fillStyle = gg; rr(ctx, x, g.ty, g.tw, g.th, 10); ctx.fill(); ctx.strokeStyle = '#78716c'; ctx.lineWidth = 2; ctx.stroke();
        if (p.dip === 'fil') { const r2 = MAG9.rng(2); ctx.fillStyle = '#292524'; for (let k = 0; k < 900; k++) ctx.fillRect(x + 8 + r2() * (g.tw - 16), g.ty + 6 + r2() * (g.th - 12), 1.8, 1.1); } });
      if (p.dip === 'clip') S.it.filter(it => it.st === 'rest' || it.st === 'fall').forEach(it => MAG9.drawItem(ctx, it, g.k * .9 + .1));
      // hand holding magnet
      if (p.mg === 'bar') C2.hand(ctx, g.m.x - 4, g.m.y - g.m.T / 2 + 2, 1, 1.15, { rot: Math.PI / 2, sleeve: '#0ea5e9' }); else C2.hand(ctx, g.m.x + 2, g.m.y - g.m.W / 2 + 6, 1, 1.15, { rot: Math.PI / 2, sleeve: '#0ea5e9' });
      MAG9.drawMag(ctx, g.m, { uStyle: 'red' });
      if (p.dip === 'fil' && S.dipped) D.tufts(ctx, S, g);
      if (p.dip === 'clip') S.it.filter(it => it.st === 'att' || it.st === 'fly').forEach(it => MAG9.drawItem(ctx, it, g.k * .9 + .1));
      if (p.graph !== false && p.mg === 'bar') { const m = g.m, P = MAG9.prep([m]), y0 = m.y - m.T / 2 - 70 * g.k - 20, H = 50 * g.k + 10, pts = []; for (let i = 0; i <= 60; i++) { const x = m.x - m.L / 2 - 14 + (m.L + 28) * i / 60; const B = MAG9.Bp(P, x, m.y - m.T / 2 - 8); pts.push([x, Math.hypot(B[0], B[1])]); } const mx = Math.max(...pts.map(q => q[1]));
        MAG9.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.88)'; rr(ctx, m.x - m.L / 2 - 24, y0 - H - 10, m.L + 48, H + 22, 8); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(m.x - m.L / 2 - 18, y0); ctx.lineTo(m.x + m.L / 2 + 18, y0); ctx.stroke(); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2.5; ctx.beginPath(); pts.forEach((q, i) => { const yy = y0 - q[1] / mx * H; i ? ctx.lineTo(q[0], yy) : ctx.moveTo(q[0], yy); }); ctx.stroke(); });
        MF9.T(ctx, 'شدة القوة المغناطيسية على طول المغناطيس', m.x, y0 - H - 20, { s: 11.5, w: 900, c: '#b91c1c' }); MF9.T(ctx, 'أعظم', m.x - m.L / 2, y0 - H + 4, { s: 10.5, w: 900, c: '#fff', bg: '#dc2626' }); MF9.T(ctx, 'أعظم', m.x + m.L / 2, y0 - H + 4, { s: 10.5, w: 900, c: '#fff', bg: '#dc2626' }); MF9.T(ctx, 'أقل ما يمكن', m.x, y0 - 12, { s: 10.5, w: 900, c: '#475569' }); }
      if (p.dip === 'fil') MF9.T(ctx, !S.dipped ? 'اسحب المغناطيس إلى داخل صحن البرادة ثم ارفعه' : 'تجمعت البرادة بكثافة عند القطبين ✓', MAG9.cx(w), g.ty + g.th + 22, { s: 12.5, w: 900, c: '#fff', bg: S.dipped ? '#15803d' : '#b45309' });
      MAG9.banner(ctx, w, 'الأقطاب المغناطيسية: أين تكون القوة أعظم؟ (الشكل 9)', '#b91c1c');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'mag', x: g.m.x, y: g.m.y, hit: (x, y) => MAG9.inside(g.m, x, y) || Math.hypot(x - g.m.x, y - g.m.y) < 50, axis: 'y', keep: true, tip: 'اسحب المغناطيس إلى الأسفل لتغمسه ثم ارفعه', idle: 'اغمس المغناطيس ✋', down: () => { S._a = S.my; }, drag: (S2, d) => { S.my = clamp(S._a + (d.y - d.sy) / (g.ty + 10 - g.top), 0, 1.02); } }]; },
    field(S, x, y) { if (!S.W) return null; const m = D.geo(S).m; return MAG9.inside(m, x, y) ? null : MAG9.B([m], x, y); },
    readings(S) { const n = S.it.filter(it => it.st === 'att').length; return [rd('المغناطيس', S.p.mg === 'bar' ? 'ساق مستقيمة' : 'حرف U'), S.p.dip === 'fil' ? rd('البرادة', S.dipped ? 'تجمعت عند القطبين' : 'لم نغمسه بعد') : rd('مشابك معلّقة', String(n))]; },
    explain(S) { return 'تتجمع البرادة (أو المشابك) بتركيز عالٍ عند <b>طرفي المغناطيس</b> لأن القوة المغناطيسية هناك <b>أعظم ما يمكن</b>؛ هذان الطرفان هما <b>القطبان</b>: الشمالي N (الباحث عن الشمال) والجنوبي S (الباحث عن الجنوب). أما وسط المغناطيس فلا يكاد يجذب شيئاً.'; }
  });
})();
/* ---- 3.2 cutting a magnet: poles always come in pairs (fig 10) ---- */
(() => {
  const D = P92({ id: 'g9m_cut', page: 36, fig: 'الشكل 10',
    desc: 'الأقطاب المغناطيسية لا توجد بشكل منفرد، بل توجد بشكل أزواج متساوية بالمقدار ومختلفة في النوع. فإذا قُطّع المغناطيس إلى عدة قطع كبيرة أو صغيرة ومهما كان عددها، نجد أن كل قطعة تمتلك قطبين: شمالياً وجنوبياً.',
    tags: 'تقطيع المغناطيس أزواج أقطاب قطع كل قطعة مغناطيس',
    tools: ['ساق مغناطيسية', 'منشار'],
    controls: [BT('', [{ t: '✂ قطّع كل قطعة إلى نصفين', on: S => D.cut(S) }, { t: '↺ مغناطيس كامل', on: S => D.setup(S) }]), R('gap', 'المسافة بين القطع', 0, 60, 26, 2, 'px'), TG('lines', 'خطوط المجال', true, null, 'bfield'), TG('dom', 'المغانط الصغيرة داخل القطع', false, null, 'atom'), TG('tree', 'مخطط الكتاب (الشكل 10)', true, null, 'schematic')],
    steps: ['هذه ساق مغناطيسية لها قطب شمالي N وقطب جنوبي S.', 'اضغط «قطّع» (أو اضغط على المغناطيس) لتقطعها إلى نصفين: هل حصلنا على قطب شمالي وحده وقطب جنوبي وحده؟', 'كرر التقطيع: 4 قطع ثم 8 قطع.', 'لاحظ أن كل قطعة صارت مغناطيساً كاملاً له قطبان N و S، وأن خطوط المجال تحيط بكل قطعة.', 'شغّل «المغانط الصغيرة» لترى السبب: المغناطيس مكوّن من مغانط صغيرة جداً مرتبة بالاتجاه نفسه.'],
    concl: ['الأقطاب المغناطيسية لا توجد بشكل منفرد، بل بشكل أزواج متساوية بالمقدار ومختلفة في النوع.', 'إذا قُطّع المغناطيس إلى عدة قطع، فكل قطعة هي مغناطيس يمتلك قطبين: أحدهما شمالي والآخر جنوبي.'],
    laws: ['g9_poles'],
    setup(S) { S.n = 1; S.anim = 0; S.hist = [1]; },
    cut(S) { if (S.n >= 8) { C2.msg(S, 'يكفي! حتى أصغر قطعة لها قطبان N و S', 2.5); return; } S.n *= 2; S.hist.push(S.n); S.anim = 0; if (window.Sound && Sound.tick) try { Sound.tick(); } catch (e) { } },
    geo(S) { const w = S.W, h = S.H, k = MAG9.sc(w, h), cx = MAG9.cx(w), cy = S.p.tree !== false ? h * .62 : h * .5, Ltot = Math.min(w - 140, 480 * k + 40), T = Math.round(40 * k), gap = S.p.gap * clamp(S.anim * 2, 0, 1) * (S.n > 1 ? 1 : 0);
      const n = S.n, Lp = Ltot / n, tot = Ltot + gap * (n - 1); const M = []; for (let i = 0; i < n; i++) { const x = cx - tot / 2 + Lp / 2 + i * (Lp + gap); const m = (S._ms = S._ms || [])[i] || (S._ms[i] = MAG9.bar(0, 0, 0, 1, 1, 1)); Object.assign(m, { x, y: cy, L: Math.round(Lp), T, str: 1 }); M.push(m); } return { w, h, k, cx, cy, M, Ltot, T }; },
    update(S, dt) { S.anim = Math.min(1, S.anim + dt); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; G.bg(ctx, w, h, false); MAG9.raw(ctx, () => { ctx.fillStyle = '#fafaf9'; ctx.fillRect(0, 0, w, h); });
      const r = [64, p.tree !== false ? h * .3 : 40, w, h - 38];
      MF9.draw(ctx, S, 'cut' + S.n + '_' + Math.round(g.M.length > 1 ? g.M[1].x - g.M[0].x : 0), g.M, r, { lines: p.lines !== false, n: 12, col: '#0e7490', noMag: true });
      g.M.forEach(m => { MAG9.drawMag(ctx, m, { labels: m.L > 34 });
        if (p.dom) { const nx = Math.max(2, Math.round(m.L / 14)), cells = Array.from({ length: nx * 2 }, () => ({ a: 0 })); MAG9.domains(ctx, m.x - m.L / 2 + 2, m.y - m.T / 2 + 2, m.L - 4, m.T - 4, cells, nx, 2, { cells: false }); }
        if (m.L <= 34) { MF9.T(ctx, 'N', m.x + m.L / 2 - 8, m.y - m.T / 2 - 10, { s: 11, w: 900, c: '#dc2626' }); MF9.T(ctx, 'S', m.x - m.L / 2 + 8, m.y - m.T / 2 - 10, { s: 11, w: 900, c: '#2563eb' }); } });
      if (p.tree !== false) { const rows = S.hist, rh = Math.min(42, (h * .26 - 40) / Math.max(1, rows.length)); rows.forEach((n, j) => { const L = Math.min(w - 160, 340), y = 58 + j * rh, Lp = L / n, gp = 8; for (let i = 0; i < n; i++) { const x0 = MAG9.cx(w) - (L + gp * (n - 1)) / 2 + i * (Lp + gp); MAG9.raw(ctx, () => { ctx.fillStyle = MAG9.COL.S; ctx.fillRect(x0, y, Lp / 2, rh * .42); ctx.fillStyle = MAG9.COL.N; ctx.fillRect(x0 + Lp / 2, y, Lp / 2, rh * .42); }); if (Lp > 30) { MF9.T(ctx, 'S', x0 + Lp * .25, y + rh * .21, { s: 9.5, w: 900, c: '#fff' }); MF9.T(ctx, 'N', x0 + Lp * .75, y + rh * .21, { s: 9.5, w: 900, c: '#fff' }); } } });
        MF9.T(ctx, 'الشكل 10: كل قطعة لها قطبان', MAG9.cx(w) + Math.min(w - 160, 340) / 2 + 10, 50, { s: 11, w: 900, c: '#475569', a: 'left' }); }
      const b = { x: MAG9.cx(w), y: g.cy + g.T / 2 + 46, w: 210, h: 38 }; S._b = b; MAG9.btn(ctx, b, S.n < 8 ? '✂ قطّع (' + S.n + ' ← ' + S.n * 2 + ')' : 'وصلت إلى 8 قطع', { col: S.n < 8 ? '#dc2626' : '#64748b' });
      MF9.T(ctx, 'عدد القطع: ' + S.n + '  ⟸  عدد الأقطاب: ' + S.n + ' N و ' + S.n + ' S', MAG9.cx(w), g.cy - g.T / 2 - 40, { s: 13, w: 900, c: '#fff', bg: '#0e7490' });
      C2.drawMsg(ctx, S, MAG9.cx(w), g.cy - 70);
      MAG9.banner(ctx, w, 'تقطيع المغناطيس: هل نحصل على قطب منفرد؟ (الشكل 10)', '#dc2626');
    },
    drags(S) { if (!S.W || !S._b) return []; return [MAG9.btnObj('cut', S._b, () => D.cut(S), { tip: 'قطّع كل قطعة إلى نصفين', idle: 'قطّع ✋', hint: true })]; },
    field(S, x, y) { if (!S.W) return null; const M = D.geo(S).M; return MAG9.insideAny(M, x, y) ? null : MAG9.B(M, x, y); },
    readings(S) { return [rd('عدد القطع', String(S.n)), rd('أقطاب شمالية N', String(S.n)), rd('أقطاب جنوبية S', String(S.n)), rd('هل وُجد قطب منفرد؟', 'لا، أبداً', 1)]; },
    explain(S) { return S.n === 1 ? 'مغناطيس واحد له قطبان: N و S. ماذا سيحدث لو قطعناه؟' : 'قطعنا المغناطيس إلى <b>' + S.n + '</b> قطع، فحصلنا على <b>' + S.n + '</b> مغانط كاملة، لكل منها قطب شمالي وقطب جنوبي. ' + (S.p.dom ? 'السبب: المغناطيس مكوّن من مغانط صغيرة جداً مرتبة بالاتجاه نفسه، فكل جزء منه مغناطيس.' : 'شغّل «المغانط الصغيرة» لتعرف السبب.') + '<br>الأقطاب لا توجد منفردة، بل أزواجاً <b>متساوية بالمقدار ومختلفة في النوع</b>.'; }
  });
})();
/* ---- 3.3 activity 1: attraction & repulsion with a suspended magnet (figs 11–13) ---- */
(() => {
  const PY = .42, NORTH = -.62;  // perspective squash; geographic north direction in the table plane
  const D = P92({ id: 'g9m_force', page: 37, fig: 'الأشكال 11، 12، 13',
    desc: 'نشاط (1): قوى التجاذب والتنافر بين الأقطاب المغناطيسية. أدوات النشاط: ساقان مغناطيسيتان، خيط، كلاب، حامل (من مادة لا تتأثر بالمغناطيس). نعلّق ساقاً من منتصفها فتتجه شمال–جنوب، ثم نقرب منها أقطاب الساق الأخرى الممسوكة باليد.',
    tags: 'نشاط 1 قوى التجاذب التنافر أقطاب متشابهة مختلفة ساق معلقة خيط حامل',
    tools: ['ساقان مغناطيسيتان', 'خيط', 'كلاب', 'حامل (من مادة لا تتأثر بالمغناطيس)'],
    controls: [BT('', [{ t: '⇄ اقلب الساق في يدك', on: S => { S.hs = -S.hs; } }, { t: '(a) N من N', on: S => D.preset(S, 1, 1) }, { t: '(b) S من S', on: S => D.preset(S, -1, -1) }, { t: '(c) N من S', on: S => D.preset(S, 1, -1) }, { t: '✋ أبعد يدك', on: S => { S.hx = 1.6; S.hz = 1.2; } }]),
      TG('vec', 'أسهم القوة', true, null, 'force'), TG('north', 'اتجاه الشمال الجغرافي', true, null, 'compass'), TG('lab', 'أسماء الأقطاب', true, null, 'labels')],
    steps: ['نعلّق الساق المغناطيسية من مركز ثقلها (منتصفها) بالخيط والكلاب والحامل ونتركها حرة: تتخذ وضعاً أفقياً بموازاة خط الشمال–الجنوب الجغرافي تقريباً (الشكل 12).', 'نمسك بيدنا ساقاً أخرى ونجعل قطبها الشمالي N بارزاً من اليد (اسحب يدك).', 'نقرب القطب الشمالي للساق الممسوكة من القطب الشمالي للساق المعلّقة (الشكل 13-a): ماذا نلاحظ؟', 'نعكس قطبية الساق في اليد (S بارز) ونقربه من القطب الجنوبي للساق المعلّقة (13-b).', 'نقرب القطب الشمالي للساق الممسوكة من القطب الجنوبي للمعلّقة (13-c). سجّل كل ملاحظة في الجدول.'],
    concl: ['الساق المغناطيسية المعلقة بحرية تتجه شمال–جنوب جغرافي تقريباً.', 'الأقطاب المغناطيسية المتشابهة تتنافر مع بعضها، بينما الأقطاب المغناطيسية المختلفة تتجاذب مع بعضها.', 'القوى بين المغانط تشبه القوى بين الشحنات الكهربائية: المتشابهة تتنافر والمختلفة تتجاذب.'],
    laws: ['g9_poles'],
    setup(S) { S.ph = NORTH + 1.2; S.w = 0; S.dx = 0; S.dz = 0; S.vx = 0; S.vz = 0; S.hx = 1.6; S.hz = 1.2; S.hs = 1; S.rows = S.rows || []; },
    preset(S, hand, target) { // place the hand so its protruding pole `hand` faces the suspended pole `target`
      const e = target * (S.p ? 1 : 1); const dir = S.ph + (target > 0 ? 0 : Math.PI); S.hs = hand; S.tgt = { dir, d: 1.25 }; S.hx = null; },
    geo(S) { const w = S.W, h = S.H, k = MAG9.sc(w, h), cx = MAG9.cx(w) - 30 * k, base = h * .8, hang = h * .5, L = 190 * k + 20, R = 95 * k + 10; return { w, h, k, cx, base, hang, L, R, T: 26 * k + 6, Hh: 16 * k + 4 }; },
    P(g, X, Z) { return [g.cx + X, g.hang + Z * PY]; },
    hand(S, g) { if (S.hx == null && S.tgt) { const d = S.tgt.d * g.L / 2 + 30; S.hx = (Math.cos(S.tgt.dir) * d) / (g.L * .8); S.hz = (Math.sin(S.tgt.dir) * d) / (g.L * .8); }
      const X = S.hx * g.L * .8, Z = S.hz * g.L * .8; const dir = Math.atan2(-Z + S.dz, -X + S.dx); return { X, Z, dir }; },
    poles(S, g) { const hl = g.L / 2 - g.L * .08; const s = [[S.dx + Math.cos(S.ph) * hl, S.dz + Math.sin(S.ph) * hl, 1], [S.dx - Math.cos(S.ph) * hl, S.dz - Math.sin(S.ph) * hl, -1]];
      const hd = D.hand(S, g); const hn = [hd.X + Math.cos(hd.dir) * (g.L * .05), hd.Z + Math.sin(hd.dir) * (g.L * .05)]; const hf = [hd.X - Math.cos(hd.dir) * (g.L * .76), hd.Z - Math.sin(hd.dir) * (g.L * .76)];
      const h = [[hn[0], hn[1], S.hs], [hf[0], hf[1], -S.hs]]; return { s, h, hd }; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); const n = 6, hh = Math.min(dt, .04) / n; S.Fn = [0, 0];
      for (let it = 0; it < n; it++) { const { s, h } = D.poles(S, g); let fx = 0, fz = 0, tq = 0; const Q = 3e5 * g.k;
        s.forEach(a => h.forEach(b => { const dx = a[0] - b[0], dz = a[1] - b[1], r2 = dx * dx + dz * dz + 140, r = Math.sqrt(r2); const f = Q * a[2] * b[2] / r2; const Fx = f * dx / r, Fz = f * dz / r; fx += Fx; fz += Fz; tq += (a[0] - S.dx) * Fz - (a[1] - S.dz) * Fx; }));
        tq += -2600 * Math.sin(S.ph - NORTH); S.w += (tq / 40 - 1.5 * S.w) * hh; S.ph += S.w * hh;
        S.vx += (fx * 1.2 - 14 * S.dx - 5 * S.vx) * hh; S.vz += (fz * 1.2 - 14 * S.dz - 5 * S.vz) * hh; S.dx += S.vx * hh; S.dz += S.vz * hh; const dm = Math.hypot(S.dx, S.dz), mx = 60 * g.k + 10; if (dm > mx) { S.dx *= mx / dm; S.dz *= mx / dm; S.vx *= .5; S.vz *= .5; }
        // contact: suspended pole can't pass into the hand magnet
        const P2 = D.poles(S, g); P2.s.forEach(a => { const b = P2.h[0], dd = Math.hypot(a[0] - b[0], a[1] - b[1]); if (dd < 14) { const ux = (a[0] - b[0]) / (dd || 1), uz = (a[1] - b[1]) / (dd || 1); S.dx += ux * (14 - dd); S.dz += uz * (14 - dd); S.vx *= .3; S.vz *= .3; S.w *= .7; } });
        S.Fn = [fx, fz]; }
      const { s, h } = D.poles(S, g); let best = null; s.forEach(a => { const b = h[0], d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (!best || d < best.d) best = { d, a: a[2], b: b[2] }; }); S.near = best && best.d < g.L * .7 ? best : null; },
    bar3(ctx, g, X, Z, ang, L, sgn, o = {}) { // draw a horizontal bar magnet lying in the plane: centre (X,Z), direction ang (N end), thickness
      const c = Math.cos(ang), s = Math.sin(ang), wv = g.T / 2, hv = g.Hh; const corner = (u, v) => D.P(g, X + c * u - s * v, Z + s * u + c * v);
      const half = (u0, u1, col) => { const a = corner(u0, -wv), b = corner(u1, -wv), cc = corner(u1, wv), d = corner(u0, wv); MAG9.raw(ctx, () => {
        const lo = [a, b, cc, d].sort((p, q) => q[1] - p[1]); ctx.fillStyle = shade(col, -60); ctx.beginPath(); ctx.moveTo(lo[0][0], lo[0][1]); ctx.lineTo(lo[1][0], lo[1][1]); ctx.lineTo(lo[1][0], lo[1][1] + hv); ctx.lineTo(lo[0][0], lo[0][1] + hv); ctx.closePath(); ctx.fill();
        [[a, b], [b, cc], [cc, d], [d, a]].forEach(([p, q]) => { if (Math.max(p[1], q[1]) >= lo[1][1] - .5) { ctx.fillStyle = shade(col, -40); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.lineTo(q[0], q[1] + hv); ctx.lineTo(p[0], p[1] + hv); ctx.closePath(); ctx.fill(); } });
        const gg = ctx.createLinearGradient(a[0], a[1], d[0], d[1]); gg.addColorStop(0, shade(col, 30)); gg.addColorStop(1, col); ctx.fillStyle = gg; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(cc[0], cc[1]); ctx.lineTo(d[0], d[1]); ctx.closePath(); ctx.fill(); }); };
      const N = MAG9.COL.N, Sc = MAG9.COL.S; const far = Math.sin(ang) < 0; // draw the farther half first
      const hN = () => half(0, L / 2, sgn > 0 ? N : Sc), hS = () => half(-L / 2, 0, sgn > 0 ? Sc : N); if (far) { hN(); hS(); } else { hS(); hN(); }
      if (o.lab !== false) { const pn = corner(L / 2 - 14, 0), ps = corner(-L / 2 + 14, 0); MF9.T(ctx, sgn > 0 ? 'N' : 'S', pn[0], pn[1] - 2, { s: 12, w: 900, c: '#fff' }); MF9.T(ctx, sgn > 0 ? 'S' : 'N', ps[0], ps[1] - 2, { s: 12, w: 900, c: '#fff' }); } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { benchY: g.base - 30 });
      // base disc (book: yellow→purple)
      MAG9.raw(ctx, () => { const gg = ctx.createLinearGradient(g.cx - g.R * 2, 0, g.cx + g.R * 2, 0); gg.addColorStop(0, '#fde047'); gg.addColorStop(.5, '#d8b4fe'); gg.addColorStop(1, '#6b21a8'); ctx.fillStyle = gg; ctx.beginPath(); ctx.ellipse(g.cx + 60 * g.k, g.base, g.R * 2.1, g.R * .55, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 2; ctx.stroke(); });
      if (p.north !== false) { const a = D.P(g, Math.cos(NORTH) * g.R * 1.9, Math.sin(NORTH) * g.R * 1.9), b = D.P(g, -Math.cos(NORTH) * g.R * 1.9, -Math.sin(NORTH) * g.R * 1.9); const yo = g.base - g.hang; MAG9.raw(ctx, () => { G.arrow(ctx, b[0], b[1] + yo, a[0], a[1] + yo, '#111827', 5, 14); G.arrow(ctx, a[0], a[1] + yo, b[0], b[1] + yo, '#111827', 5, 14); }); MF9.T(ctx, 'اتجاه الشمال الجغرافي', a[0], a[1] + yo - 16, { s: 11, w: 900, c: '#fff', bg: '#111827' }); MF9.T(ctx, 'اتجاه الجنوب الجغرافي', b[0], b[1] + yo + 18, { s: 11, w: 900, c: '#fff', bg: '#111827' }); }
      // stand: rod + arm (glass-like plastic, not magnetic)
      const sx = g.cx + 60 * g.k + g.R * 1.2, top = g.hang - 190 * g.k - 40; MAG9.raw(ctx, () => { ctx.fillStyle = 'rgba(148,163,184,.55)'; ctx.beginPath(); ctx.ellipse(sx, g.base - 4, 26, 9, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#475569'; ctx.fillRect(sx - 4, top, 8, g.base - top - 6); ctx.fillRect(g.cx - 6, top - 2, sx - g.cx + 10, 7); });
      const ctr = D.P(g, S.dx, S.dz); MAG9.raw(ctx, () => { ctx.strokeStyle = '#78716c'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(g.cx, top + 4); ctx.lineTo(ctr[0], ctr[1] - 2); ctx.stroke(); ctx.fillStyle = '#a8a29e'; ctx.fillRect(ctr[0] - 5, ctr[1] - 6, 10, 6); });
      const { s, h: hp, hd } = D.poles(S, g);
      // hand magnet: protruding pole near end, fist at the far end
      const hc = [hd.X - Math.cos(hd.dir) * g.L * .36, hd.Z - Math.sin(hd.dir) * g.L * .36]; const handFar = hd.Z < S.dz;
      const drawHand = () => { D.bar3(ctx, g, hc[0], hc[1], hd.dir, g.L * .96, S.hs, { lab: p.lab !== false }); const f = D.P(g, hd.X - Math.cos(hd.dir) * g.L * .68, hd.Z - Math.sin(hd.dir) * g.L * .68); const sd = D.P(g, -Math.cos(hd.dir), -Math.sin(hd.dir)); MAG9.fist(ctx, f[0], f[1] - g.Hh * .2, Math.atan2(sd[1] - D.P(g, 0, 0)[1], sd[0] - D.P(g, 0, 0)[0]), g.k * .9 + .25); };
      if (handFar) drawHand(); D.bar3(ctx, g, S.dx, S.dz, S.ph, g.L, 1, { lab: p.lab !== false }); if (!handFar) drawHand();
      if (p.vec !== false && S.near) { const F = S.Fn, m = Math.hypot(F[0], F[1]); if (m > 30) { const a = s[S.near.a > 0 ? 0 : 1]; const pa = D.P(g, a[0], a[1]); const ux = F[0] / m, uz = F[1] / m; const l = clamp(Math.sqrt(m) * 2.2, 22, 90); const pb = D.P(g, a[0] + ux * l, a[1] + uz * l); const rep = S.near.a === S.near.b; C2.force(ctx, pa[0], pa[1] - 22, pb[0] - pa[0], pb[1] - pa[1], rep ? 'قوة تنافر' : 'قوة تجاذب', rep ? '#16a34a' : '#dc2626', 4); } }
      const st = S.near ? (S.near.a === S.near.b ? (S.near.a > 0 ? 'N قرب N: تنافر ← يبتعد القطب الشمالي للساق المعلّقة' : 'S قرب S: تنافر ← يبتعد القطب الجنوبي للساق المعلّقة') : (S.near.b > 0 ? 'N قرب S: تجاذب ← ينجذب القطبان' : 'S قرب N: تجاذب ← ينجذب القطبان')) : 'الساق المعلّقة تتجه شمال – جنوب تقريباً (الشكل 12)';
      MF9.T(ctx, st, MAG9.cx(w), 56, { s: 13, w: 900, c: '#fff', bg: S.near ? (S.near.a === S.near.b ? '#16a34a' : '#dc2626') : '#334155' });
      MAG9.banner(ctx, w, 'نشاط (1): قوى التجاذب والتنافر بين الأقطاب المغناطيسية', '#16a34a');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), hd = D.hand(S, g); const f = D.P(g, hd.X - Math.cos(hd.dir) * g.L * .5, hd.Z - Math.sin(hd.dir) * g.L * .5);
      return [{ id: 'hand', x: f[0], y: f[1], w: g.L * .9, h: 70, axis: 'xy', keep: true, tip: 'اسحب يدك لتقرّب قطب الساق الممسوكة', idle: 'اسحب يدك ✋', down: () => { S._a = S.hx; S._b = S.hz; S.tgt = null; }, drag: (S2, d) => { S.hx = clamp(S._a + (d.x - d.sx) / (g.L * .8), -1.9, 1.9); S.hz = clamp(S._b + (d.y - d.sy) / PY / (g.L * .8), -1.4, 1.6); } }]; },
    readings(S) { const n = S.near; return [rd('القطب في يدك', S.hs > 0 ? 'N (شمالي)' : 'S (جنوبي)'), rd('القطب الأقرب في الساق المعلّقة', n ? (n.a > 0 ? 'N' : 'S') : '—'), rd('الملاحظة', n ? (n.a === n.b ? 'تنافر' : 'تجاذب') : 'لا تأثير يُذكر (بعيد)', 1)]; },
    record(S) { const n = S.near; if (!n) { Runner.toast('قرّب الساق الممسوكة من أحد قطبي الساق المعلّقة أولاً', 'info'); return null; } return { c: (n.b > 0 ? 'N' : 'S') + ' ← ' + (n.a > 0 ? 'N' : 'S'), o: n.a === n.b ? 'تنافر (يبتعد)' : 'تجاذب (يقترب)', t: n.a === n.b ? 'متشابهان' : 'مختلفان' }; },
    cols: [['c', 'القطب الممسوك ← القطب المعلّق'], ['t', 'نوع القطبين'], ['o', 'ماذا نلاحظ؟']],
    explain(S) { const n = S.near; if (!n) return 'الساق المعلّقة من منتصفها حرة الدوران، فاتخذت وضعاً أفقياً بموازاة خط <b>الشمال – الجنوب الجغرافي</b> تقريباً: قطبها الشمالي (الباحث عن الشمال) نحو الشمال. الآن قرّب الساق التي في يدك.'; return n.a === n.b ? 'القطبان <b>متشابهان</b> (' + (n.a > 0 ? 'N و N' : 'S و S') + '): يبتعد القطب في الساق المعلّقة عن القطب الممسوك باليد ⟸ <b>تنافر</b>.' : 'القطبان <b>مختلفان</b>: ينجذب القطبان نحو بعضهما ⟸ <b>تجاذب</b>.'; }
  });
})();
/* ---- 3.4 ➕ floating ring magnets ---- */
(() => {
  const D = P92({ id: 'g9m_rings', page: 38, fig: '➕ من المختبرات العالمية',
    desc: '➕ من المختبرات العالمية: حلقات مغناطيسية في عمود خشبي. إذا تقابلت الأقطاب المتشابهة تتنافر الحلقات فتطفو في الهواء، وإذا تقابلت الأقطاب المختلفة تتجاذب وتلتصق. اضغط على أي حلقة لتقلبها.',
    tags: 'حلقات مغناطيسية طافية تنافر تجاذب عمود',
    tools: ['حلقات مغناطيسية', 'عمود خشبي'],
    controls: [R('n', 'عدد الحلقات', 2, 5, 4, 1, ''), BT('', [{ t: '⇅ تنافر بين كل حلقتين', on: S => S.o.forEach((q, i) => S.o[i] = i % 2 ? -1 : 1) }, { t: '⇈ كلها بالاتجاه نفسه', on: S => S.o.fill(1) }]), TG('lab', 'الأقطاب N و S', true, null, 'labels'), TG('vec', 'أسهم القوى', true, null, 'force')],
    steps: ['اضغط على أي حلقة لتقلبها (يتبدل وجهها العلوي بين N و S).', 'إذا كان الوجه السفلي لحلقة مشابهاً للوجه العلوي للتي تحتها: تتنافران فتطفو الحلقة.', 'لاحظ أن الحلقة السفلى تحمل وزن كل ما فوقها، لذلك تكون المسافة فوقها أصغر.', 'اجعلها كلها بالاتجاه نفسه: تتجاذب وتلتصق.'],
    concl: ['الأقطاب المتشابهة تتنافر: قوة التنافر تعادل الوزن فتطفو الحلقة.', 'الأقطاب المختلفة تتجاذب فتلتصق الحلقات.'],
    laws: ['g9_poles'],
    setup(S) { S.o = [1, -1, 1, -1, 1]; S.y = [0, 40, 80, 120, 160]; S.v = [0, 0, 0, 0, 0]; },
    geo(S) { const w = S.W, h = S.H, k = MAG9.sc(w, h); return { w, h, k, cx: MAG9.cx(w), base: h * .82, rw: 80 * k + 20, th: 18 * k + 6 }; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S), n = S.p.n, m = 1, gr = 900, K2 = 3e10 * Math.pow(g.k, 4); const st = 8, hh = Math.min(dt, .04) / st;
      for (let it = 0; it < st; it++) { const F = new Array(n).fill(-gr * m);
        for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const d = Math.max(4, S.y[j] - S.y[i] - g.th + 22 * g.k); const f = (S.o[i] === S.o[j] ? -1 : 1) * K2 / Math.pow(d, 4) * 1; F[j] += f; F[i] -= f; }   // opposite orientation → like faces → repel
        for (let i = 0; i < n; i++) { S.v[i] += (F[i] / m - 6 * S.v[i]) * hh; S.y[i] += S.v[i] * hh; const lo = i === 0 ? 0 : S.y[i - 1] + g.th; if (S.y[i] < lo) { S.y[i] = lo; if (S.v[i] < 0) S.v[i] = 0; } S.y[i] = Math.min(S.y[i], g.base - 120); } } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, n = p.n; K.bg(ctx, w, h, { benchY: g.base });
      MAG9.raw(ctx, () => { const bg = ctx.createLinearGradient(g.cx - 90, 0, g.cx + 90, 0); bg.addColorStop(0, '#92400e'); bg.addColorStop(.5, '#d97706'); bg.addColorStop(1, '#78350f'); ctx.fillStyle = bg; rr(ctx, g.cx - g.rw * 1.1, g.base - 18, g.rw * 2.2, 22, 6); ctx.fill();
        const rg = ctx.createLinearGradient(g.cx - 7, 0, g.cx + 7, 0); rg.addColorStop(0, '#a16207'); rg.addColorStop(.5, '#fde68a'); rg.addColorStop(1, '#854d0e'); ctx.fillStyle = rg; ctx.fillRect(g.cx - 7, g.base - 380 * g.k - 60, 14, 380 * g.k + 44); });
      S._r = [];
      for (let i = 0; i < n; i++) { const yb = g.base - 18 - S.y[i], top = S.o[i] > 0 ? 'N' : 'S', bot = S.o[i] > 0 ? 'S' : 'N';
        MAG9.raw(ctx, () => { const ry = g.rw * .2; ctx.fillStyle = shade(top === 'N' ? '#dc2626' : '#2563eb', -60); ctx.beginPath(); ctx.ellipse(g.cx, yb, g.rw, ry, 0, 0, Math.PI); ctx.lineTo(g.cx - g.rw, yb - g.th); ctx.ellipse(g.cx, yb - g.th, g.rw, ry, 0, Math.PI, 0, true); ctx.closePath(); ctx.fill();
          ctx.fillStyle = shade(bot === 'N' ? '#dc2626' : '#2563eb', -20); ctx.fillRect(g.cx - g.rw, yb - g.th / 2, 2 * g.rw, 2); const tg = ctx.createRadialGradient(g.cx - 20, yb - g.th - 8, 4, g.cx, yb - g.th, g.rw); tg.addColorStop(0, shade(top === 'N' ? '#dc2626' : '#2563eb', 50)); tg.addColorStop(1, top === 'N' ? '#b91c1c' : '#1d4ed8'); ctx.fillStyle = tg; ctx.beginPath(); ctx.ellipse(g.cx, yb - g.th, g.rw, ry, 0, 0, TAU); ctx.fill();
          ctx.fillStyle = '#e7e5e4'; ctx.beginPath(); ctx.ellipse(g.cx, yb - g.th, g.rw * .3, ry * .3, 0, 0, TAU); ctx.fill(); const rg = ctx.createLinearGradient(g.cx - 7, 0, g.cx + 7, 0); rg.addColorStop(0, '#a16207'); rg.addColorStop(.5, '#fde68a'); rg.addColorStop(1, '#854d0e'); ctx.fillStyle = rg; ctx.fillRect(g.cx - 7, yb - g.th - 30 * g.k - 20, 14, 30 * g.k + 20); });
        if (p.lab !== false) { MF9.T(ctx, top, g.cx + g.rw * .62, yb - g.th, { s: 13, w: 900, c: '#fff' }); MF9.T(ctx, bot, g.cx + g.rw + 16, yb - g.th * .3, { s: 11, w: 900, c: bot === 'N' ? '#dc2626' : '#2563eb' }); }
        S._r.push({ x: g.cx, y: yb - g.th / 2, w: g.rw * 2, h: g.th + g.rw * .5, i }); }
      if (p.vec !== false) for (let i = 1; i < n; i++) { const gap = S.y[i] - S.y[i - 1] - g.th; if (S.o[i] !== S.o[i - 1] && gap > 3) { const y = g.base - 18 - S.y[i] + 4; C2.force(ctx, g.cx - g.rw - 28, y, 0, -30, '', '#16a34a', 3.5); MF9.T(ctx, 'تنافر', g.cx - g.rw - 56, y - 14, { s: 11, w: 900, c: '#16a34a' }); } }
      MAG9.extra(ctx, w, 'حلقات مغناطيسية طافية'); MF9.T(ctx, 'اضغط على أي حلقة لتقلبها', MAG9.cx(w), g.base + 26, { s: 12.5, w: 900, c: '#fff', bg: '#7c3aed' });
    },
    drags(S) { if (!S.W || !S._r) return []; return S._r.map(b => MAG9.btnObj('ring' + b.i, b, () => { S.o[b.i] = -S.o[b.i]; S.v[b.i] += 60; }, { tip: 'اضغط لتقلب الحلقة', idle: b.i === S._r.length - 1 ? 'اقلب الحلقة ✋' : null, hint: b.i === S._r.length - 1 })); },
    readings(S) { const n = S.p.n, L = []; for (let i = 1; i < n; i++) L.push(rd('بين الحلقتين ' + i + ' و ' + (i + 1), S.o[i] !== S.o[i - 1] ? 'تنافر (تطفو)' : 'تجاذب (ملتصقتان)')); return L; },
    explain(S) { return 'كل حلقة مغناطيس وجهاها قطبان. عندما يتقابل قطبان <b>متشابهان</b> تتنافر الحلقتان، وتطفو العليا حيث تتساوى قوة التنافر مع وزنها. الحلقة السفلى تتحمل وزن الحلقات فوقها فتقترب أكثر (لأن قوة التنافر تزداد كلما قلت المسافة). عندما يتقابل قطبان <b>مختلفان</b> تتجاذبان وتلتصقان.'; }
  });
})();
/* ---- 3.5 ➕ the Earth is a big magnet: why the suspended magnet points north ---- */
(() => {
  const D = P92({ id: 'g9m_earth', page: 37, fig: '➕ من المختبرات العالمية',
    desc: '➕ من المختبرات العالمية (على غرار «مختبر فاراداي» من PhET): الأرض تتصرف كأن في داخلها مغناطيساً كبيراً، لذلك تتجه الساق المعلّقة والبوصلة نحو الشمال. اسحب البوصلة حول الأرض.',
    tags: 'الأرض مغناطيس كبير المجال الأرضي القطب الشمالي الجغرافي القطب المغناطيسي بوصلة',
    tools: ['بوصلة', 'كرة أرضية'],
    controls: [TG('inside', 'المغناطيس الخيالي داخل الأرض', true, null, 'magnet'), TG('lines', 'خطوط المجال الأرضي', true, null, 'bfield'), TG('cg', 'بوصلات حول الأرض', false, null, 'compass'), TG('lab', 'الأسماء', true, null, 'labels')],
    steps: ['انظر إلى الأرض: خطوط مجالها تشبه خطوط مجال ساق مغناطيسية.', 'اسحب البوصلة إلى أماكن مختلفة حول الأرض: يتجه طرفها الشمالي دائماً نحو الشمال الجغرافي تقريباً.', 'لاحظ: القطب الذي قرب الشمال الجغرافي هو في الحقيقة قطب مغناطيسي جنوبي S، لذلك يجذب القطب الشمالي للبوصلة!'],
    concl: ['الأرض مغناطيس كبير، والبوصلة والساق المعلّقة تصطفان مع مجالها.', 'القطب الشمالي للمغناطيس (الباحث عن الشمال) يتجه نحو الشمال الجغرافي لأن هناك قطباً مغناطيسياً جنوبياً (الأقطاب المختلفة تتجاذب).'],
    laws: ['g9_poles', 'g9_flines'],
    setup(S) { S.cp = { a: -.5 }; S.nd = { a: 0, w: 0 }; },
    geo(S) { const w = S.W, h = S.H, cx = MAG9.cx(w), cy = h * .52, R = Math.min(w - 140, h - 120) * .3; const m = S._m || (S._m = MAG9.bar(0, 0, Math.PI / 2 + .19, 1, 1, 1)); Object.assign(m, { x: cx, y: cy, L: Math.round(R * 1.1), T: Math.round(R * .2), ghost: false }); const ca = S.cp.a, cr = R * 1.42; return { w, h, cx, cy, R, m, cpx: cx + Math.cos(ca) * cr, cpy: cy + Math.sin(ca) * cr, cr }; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); const b = MAG9.B([g.m], g.cpx, g.cpy); MAG9.turn(S.nd, Math.atan2(b[1], b[0]), dt, 60, 6); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; G.bg(ctx, w, h, false); MAG9.raw(ctx, () => { const bg = ctx.createRadialGradient(g.cx, g.cy, g.R, g.cx, g.cy, w); bg.addColorStop(0, '#1e1b4b'); bg.addColorStop(1, '#020617'); ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h); const r = MAG9.rng(8); ctx.fillStyle = '#e0e7ff'; for (let k = 0; k < 90; k++) ctx.fillRect(r() * w, r() * h, 1.4, 1.4); });
      if (p.lines !== false) MF9.clip(ctx, [64, 40, w, h], () => MAG9.drawLines(ctx, MAG9.lines(MF9.cache(S, 'e').l, [g.m], [64, 40, w, h], { n: 16 }), { col: '#67e8f9', alpha: .75 }));
      if (p.cg) MAG9.cgrid(ctx, [g.m], [64, 40, w, h], { sp: 46, skip: (x, y) => Math.hypot(x - g.cx, y - g.cy) < g.R + 8 });
      MAG9.raw(ctx, () => { const eg = ctx.createRadialGradient(g.cx - g.R * .35, g.cy - g.R * .35, g.R * .1, g.cx, g.cy, g.R); eg.addColorStop(0, '#60a5fa'); eg.addColorStop(.7, '#1d4ed8'); eg.addColorStop(1, '#172554'); ctx.globalAlpha = p.inside !== false ? .82 : 1; ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R, 0, TAU); ctx.fill();
        ctx.save(); ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R, 0, TAU); ctx.clip(); ctx.fillStyle = 'rgba(74,222,128,.75)'; [[-.35, -.25, .32, .22], [.25, -.1, .25, .35], [-.1, .35, .2, .12], [.45, .45, .18, .1]].forEach(([u, v, a, b]) => { ctx.beginPath(); ctx.ellipse(g.cx + u * g.R, g.cy + v * g.R, a * g.R, b * g.R, u, 0, TAU); ctx.fill(); }); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.beginPath(); ctx.ellipse(g.cx, g.cy - g.R * .95, g.R * .4, g.R * .1, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(g.cx, g.cy + g.R * .95, g.R * .4, g.R * .1, 0, 0, TAU); ctx.fill(); ctx.restore(); ctx.globalAlpha = 1;
        ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.setLineDash([6, 5]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(g.cx, g.cy - g.R * 1.25); ctx.lineTo(g.cx, g.cy + g.R * 1.25); ctx.stroke(); ctx.setLineDash([]); });
      if (p.inside !== false) MAG9.drawMag(ctx, g.m, { shadow: false });
      if (p.lab !== false) { MF9.T(ctx, 'القطب الشمالي الجغرافي', g.cx, g.cy - g.R * 1.32, { s: 12, w: 900, c: '#fff', bg: '#15803d' }); MF9.T(ctx, 'القطب الجنوبي الجغرافي', g.cx, g.cy + g.R * 1.32, { s: 12, w: 900, c: '#fff', bg: '#15803d' });
        if (p.inside !== false) { const tN = MAG9.geo(g.m).tips; MF9.T(ctx, 'قطب مغناطيسي جنوبي S', tN[1].p[0] + 70, tN[1].p[1] - 6, { s: 11, w: 900, c: '#fff', bg: '#2563eb' }); } }
      MAG9.compass(ctx, g.cpx, g.cpy, 24, S.nd.a); MF9.T(ctx, 'N ← رأس الإبرة نحو الشمال', g.cpx, g.cpy + 38, { s: 10.5, w: 800, c: '#fde68a' });
      MAG9.extra(ctx, w, 'الأرض مغناطيس كبير');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'comp', x: g.cpx, y: g.cpy, r: 28, cx: g.cx, cy: g.cy, keep: true, tip: 'اسحب البوصلة حول الأرض', idle: 'حرّك البوصلة ✋', drag: (S2, d) => { S.cp.a = Math.atan2(d.y - g.cy, d.x - g.cx); } }]; },
    field(S, x, y) { if (!S.W) return null; const g = D.geo(S); return Math.hypot(x - g.cx, y - g.cy) < g.R ? null : MAG9.B([g.m], x, y); },
    readings(S) { return [rd('موقع البوصلة', Math.round(deg(-S.cp.a)) + '°'), rd('اتجاه الإبرة', Math.round(deg(-S.nd.a)) + '°')]; },
    explain() { return 'تتصرف الأرض كأن في داخلها <b>ساقاً مغناطيسية كبيرة</b> قطبها <b>الجنوبي S قرب الشمال الجغرافي</b>. لذلك ينجذب القطب الشمالي لإبرة البوصلة (أو للساق المعلّقة) نحو الشمال، ولهذا سُمّي «القطب الباحث عن الشمال».'; }
  });
})();
/* =========================================================================================
   EXPERIMENT 4 (book 3-2, p39–40 + review): المجال المغناطيسي وخطوطه
   ========================================================================================= */
/* ---- 4.1 the field region (fig 14) ---- */
(() => {
  const D = P92({ id: 'g9m_region', page: 39, fig: 'الشكل 14',
    desc: 'المجال المغناطيسي في منطقة ما هو الحيز الذي يحيط بالمغناطيس والذي يظهر فيه تأثير القوى المغناطيسية. حرّك مشبك الورق حول المغناطيس ولاحظ أين يتأثر بقوة وأين لا يكاد يتأثر.',
    tags: 'مجال مغناطيسي حيز تأثير القوى ساق مغناطيسية حرف U',
    tools: ['ساق مغناطيسية', 'مغناطيس بشكل حرف U', 'مشبك ورق'],
    controls: [SEL('mag', 'المغناطيس', [['both', 'كلاهما (الشكل 14)'], ['bar', 'ساق مستقيمة'], ['U', 'حرف U']], 'both'),
      TG('lines', 'خطوط المجال', true, null, 'bfield'), TG('heat', 'حيّز المجال (شدته بالألوان)', true, null, 'heat'), TG('force', 'القوة على مشبك الورق', true, null, 'force')],
    steps: ['انظر إلى الشكل 14: ساق مغناطيسية ومغناطيس بشكل حرف U مع خطوط المجال حولهما.', 'اسحب مشبك الورق حول المغناطيس: يظهر سهم القوة المغناطيسية المؤثرة فيه.', 'لاحظ أن القوة كبيرة قرب الأقطاب، وتضعف كلما ابتعدنا حتى لا تكاد تُلاحظ.', 'المنطقة الملوّنة حول المغناطيس هي الحيز الذي يظهر فيه تأثير القوى المغناطيسية: المجال المغناطيسي.', 'اسحب المغناطيس نفسه، فينتقل مجاله معه.'],
    concl: ['المجال المغناطيسي: الحيز الذي يحيط بالمغناطيس والذي يظهر فيه تأثير القوى المغناطيسية.', 'يكون المجال أقوى ما يمكن قرب الأقطاب، ويضعف كلما ابتعدنا عن المغناطيس.'],
    laws: ['g9_flines'],
    setup(S) { S.pr = { u: .5, v: .86 }; S.uv = { bar: { u: .5, v: .5 }, U: { u: .5, v: .55 } }; S.att = 0; S.M = { bar: MAG9.bar(0, 0, -Math.PI / 2, 150, 34, 1), U: MAG9.U(0, 0, -Math.PI / 2, 112, 92, 30, 1, { flip: true, uStyle: 'tips' }) }; },
    panels(S) { const w = S.W, h = S.H, r = MF9.rect(w, h), md = S.p.mag, k = MAG9.sc(w, h); let P = [];
      if (md === 'both') { if (w - 64 > h * .95) { const xm = (r[0] + r[2]) / 2; P = [{ k: 'bar', r: [r[0], r[1], xm, r[3]] }, { k: 'U', r: [xm, r[1], r[2], r[3]] }]; } else { const ym = (r[1] + r[3]) / 2; P = [{ k: 'bar', r: [r[0], r[1], r[2], ym] }, { k: 'U', r: [r[0], ym, r[2], r[3]] }]; } }
      else P = [{ k: md, r }];
      P.forEach(p => { const m = S.M[p.k], q = S.uv[p.k], sc = Math.min(k, (p.r[3] - p.r[1]) / 330); if (m.kind === 'bar') { m.L = Math.round(150 * sc); m.T = Math.round(34 * sc); } else { m.W = Math.round(112 * sc); m.H = Math.round(92 * sc); m.t = Math.round(30 * sc); } m.x = p.r[0] + q.u * (p.r[2] - p.r[0]); m.y = p.r[1] + q.v * (p.r[3] - p.r[1]); p.m = m; }); return P; },
    probe(S) { const r = MF9.rect(S.W, S.H); return [r[0] + S.pr.u * (r[2] - r[0]), r[1] + S.pr.v * (r[3] - r[1])]; },
    panelAt(P, x, y) { return P.find(p => x >= p.r[0] && x <= p.r[2] && y >= p.r[1] && y <= p.r[3]) || P[0]; },
    F(S, P) { const [x, y] = D.probe(S), p = D.panelAt(P, x, y), g = MF9.gradB2(MAG9.prep([p.m]), x, y); const L = Math.sqrt(Math.hypot(g[0], g[1])) * 3e6; return { x, y, p, g, L }; },
    update(S, dt) { if (!S.W) return; const P = D.panels(S); if (S.att && !S.drag) { const f = D.F(S, P), t = MAG9.geo(f.p.m).tips; let best = t[0]; t.forEach(q => { if (Math.hypot(q.p[0] - f.x, q.p[1] - f.y) < Math.hypot(best.p[0] - f.x, best.p[1] - f.y)) best = q; }); const tx = best.p[0] + best.out[0] * 12, ty = best.p[1] + best.out[1] * 12, r = MF9.rect(S.W, S.H);
      S.pr.u += ((tx - r[0]) / (r[2] - r[0]) - S.pr.u) * Math.min(1, dt * 10); S.pr.v += ((ty - r[1]) / (r[3] - r[1]) - S.pr.v) * Math.min(1, dt * 10); } },
    draw(ctx, w, h, S) {
      G.bg(ctx, w, h, false); MAG9.raw(ctx, () => { ctx.fillStyle = '#fbfdff'; ctx.fillRect(0, 0, w, h); });
      const P = D.panels(S), p = S.p;
      P.forEach((q, i) => { MF9.draw(ctx, S, 'p' + q.k, [q.m], q.r, { lines: p.lines !== false, heat: p.heat !== false, n: 18, col: '#15803d' });
        if (P.length > 1) MAG9.raw(ctx, () => { ctx.strokeStyle = 'rgba(100,116,139,.35)'; ctx.lineWidth = 1.5; ctx.setLineDash([6, 6]); ctx.strokeRect(q.r[0] + 4, q.r[1] + 4, q.r[2] - q.r[0] - 8, q.r[3] - q.r[1] - 8); ctx.setLineDash([]); });
        MF9.T(ctx, q.k === 'bar' ? 'ساق مغناطيسية' : 'مغناطيس بشكل حرف U', (q.r[0] + q.r[2]) / 2, q.r[3] - 18, { s: 12, w: 800, c: '#fff', bg: 'rgba(30,41,59,.8)' }); });
      const f = D.F(S, P);
      if (p.force !== false && f.L > 2) { const a = Math.atan2(f.g[1], f.g[0]), l = clamp(f.L, 8, 95); C2.force(ctx, f.x, f.y, Math.cos(a) * l, Math.sin(a) * l, 'قوة مغناطيسية', '#dc2626', 3.5); }
      MAG9.clip(ctx, f.x, f.y, S.att ? Math.PI / 2 : .5, 1.3);
      const lvl = f.L > 40 ? ['المشبك داخل المجال: قوة كبيرة', '#b91c1c'] : f.L > 8 ? ['المشبك داخل المجال: قوة ضعيفة', '#b45309'] : ['المشبك بعيد: لا يكاد يتأثر', '#475569'];
      MF9.T(ctx, lvl[0], clamp(f.x, 150, w - 110), Math.max(54, f.y - 34), { s: 12, w: 900, c: '#fff', bg: lvl[1] });
      if (p.heat !== false) { const lx = w - 128, ly = 52; MAG9.raw(ctx, () => { const g = ctx.createLinearGradient(lx, 0, lx + 110, 0); g.addColorStop(0, 'rgba(250,204,21,.1)'); g.addColorStop(1, 'rgba(250,54,41,.85)'); ctx.fillStyle = g; rr(ctx, lx, ly, 110, 10, 4); ctx.fill(); }); MF9.T(ctx, 'ضعيف ← شدة المجال → قوي', lx + 55, ly + 22, { s: 10.5, w: 800 }); }
      MAG9.banner(ctx, w, 'المجال المغناطيسي: الحيّز حول المغناطيس الذي يظهر فيه تأثير القوى المغناطيسية', '#0e7490');
    },
    drags(S) { if (!S.W) return []; const P = D.panels(S), r = MF9.rect(S.W, S.H), [x, y] = D.probe(S); const L = P.map(q => { const o = MF9.magDrag('m' + q.k, q.m, [q.r[0] + 50, q.r[1] + 50, q.r[2] - 50, q.r[3] - 50], { tip: 'اسحب المغناطيس', hint: false }); o.drag = (S2, d) => { const nx = clamp(q.m._ox + d.x - d.sx, q.r[0] + 50, q.r[2] - 50), ny = clamp(q.m._oy + d.y - d.sy, q.r[1] + 50, q.r[3] - 50); S.uv[q.k] = { u: (nx - q.r[0]) / (q.r[2] - q.r[0]), v: (ny - q.r[1]) / (q.r[3] - q.r[1]) }; }; return o; });
      L.push({ id: 'clip', x, y, r: 24, axis: 'xy', keep: true, tip: 'اسحب مشبك الورق حول المغناطيس', idle: 'حرّك المشبك ✋', down: S2 => { S.drag = 1; S.att = 0; S._px = x; S._py = y; },
        drag: (S2, d) => { S.pr.u = clamp((S._px + d.x - d.sx - r[0]) / (r[2] - r[0]), .03, .97); S.pr.v = clamp((S._py + d.y - d.sy - r[1]) / (r[3] - r[1]), .03, .97); }, up: S2 => { S.drag = 0; const f = D.F(S, D.panels(S)); if (f.L > 70) S.att = 1; } });
      return L; },
    field(S, x, y) { if (!S.W) return null; const P = D.panels(S), q = D.panelAt(P, x, y); if (MAG9.inside(q.m, x, y)) return null; return MAG9.B([q.m], x, y); },
    readings(S) { if (!S.W) return []; const f = D.F(S, D.panels(S)); const b = MAG9.tesla(MAG9.B([f.p.m], f.x, f.y)); return [rd('شدة المجال عند المشبك', fmt(Math.hypot(b[0], b[1]) * 1e3, 3) + ' mT'), rd('القوة على المشبك', f.L > 40 ? 'كبيرة' : f.L > 8 ? 'ضعيفة' : 'لا تكاد تُلاحظ'), rd('أين المشبك؟', f.L > 8 ? 'داخل المجال المغناطيسي' : 'خارج المجال تقريباً', 1)]; },
    explain(S) { if (!S.W) return ''; const f = D.F(S, D.panels(S)); return (f.L > 40 ? 'المشبك قريب من أحد القطبين: <b>المجال قوي</b> فتؤثر فيه قوة كبيرة تجذبه' + (S.att ? '، وقد انجذب والتصق بالقطب!' : '. اتركه ليلتصق بالقطب.') : f.L > 8 ? 'المشبك ما زال داخل المجال لكن <b>القوة ضعيفة</b> لأنه بعيد نسبياً.' : 'المشبك بعيد جداً: <b>لا يكاد يتأثر</b>، فهو خارج الحيز الذي يظهر فيه تأثير المغناطيس تقريباً.') + '<br>تذكّر: المجال المغناطيسي هو الحيّز المحيط بالمغناطيس الذي يظهر فيه تأثير القوى المغناطيسية، وهو أقوى قرب الأقطاب.'; }
  });
})();
/* ---- 4.2 properties of field lines (fig 15) ---- */
(() => {
  const PR = [['closed', '1) خطوط مقفلة'], ['invis', '2) غير مرئية'], ['out', '3) خارج المغناطيس: من N إلى S'], ['in', '4) تكمل دورتها داخله: من S إلى N'], ['cross', '5) لا تتقاطع'], ['dense', '6) تتزاحم قرب الأقطاب']];
  const TXT = { closed: 'كل خط يخرج من القطب الشمالي ويدخل في القطب الجنوبي ثم يكمل دورته داخل المغناطيس، فهو حلقة مقفلة ليس لها بداية ولا نهاية.', invis: 'لا نستطيع رؤية خطوط المجال بأعيننا؛ هي طريقة رسم نتخيلها. نكشف عنها ببرادة الحديد أو بالبوصلة.', out: 'خارج المغناطيس تتجه الخطوط من القطب الشمالي N نحو القطب الجنوبي S (تابع حركة النقاط).', in: 'داخل المغناطيس تكمل الخطوط دورتها من S إلى N، لذلك تكون مقفلة.', cross: 'عند كل نقطة للمجال اتجاه واحد فقط (تشير إليه إبرة البوصلة)، لذلك لا يمكن أن يتقاطع خطان، فلو تقاطعا لكان للمجال اتجاهان في النقطة نفسها!', dense: 'قرب الأقطاب تتزاحم الخطوط (عددها في الدائرة أكبر) لأن المجال هناك أقوى؛ وبعيداً عن المغناطيس تتباعد لأن المجال أضعف.' };
  const D = P92({ id: 'g9m_lines', page: 39, fig: 'الشكل 15',
    desc: 'يمثّل المجال المغناطيسي بالرسم بخطوط تمتاز بكونها: مقفلة، غير مرئية، تتجه من القطب الشمالي نحو الجنوبي خارج المغناطيس ومكملة دورتها داخله. اختر كل خاصية لتراها على الرسم.',
    tags: 'خطوط المجال مقفلة غير مرئية لا تتقاطع تتزاحم',
    tools: ['ساق مغناطيسية'],
    controls: [SEL('prop', 'الخاصية', PR, 'closed'), TG('flow', 'حركة اتجاه الخطوط', true, null, 'velocity'), TG('inner', 'الخطوط داخل المغناطيس', true, null, 'bfield'), TG('probe', 'نقطة الاختبار (اتجاه المجال)', true, null, 'compass')],
    steps: ['هذا هو الشكل 15: ساق مغناطيسية وحولها خطوط المجال.', 'اختر الخواص واحدة بعد الأخرى (من القائمة أو بالضغط على البطاقات).', 'اسحب نقطة الاختبار: يظهر عندها اتجاه واحد فقط للمجال.', 'لاحظ: الخطوط مقفلة، غير مرئية، من N إلى S خارج المغناطيس، تكمل دورتها داخله، لا تتقاطع، وتتزاحم قرب الأقطاب.'],
    concl: ['خطوط المجال المغناطيسي خطوط مقفلة غير مرئية تتجه من القطب الشمالي نحو القطب الجنوبي خارج المغناطيس ومكملة دورتها داخله.', 'لا تتقاطع خطوط المجال، وتتزاحم قرب الأقطاب حيث المجال أقوى.'],
    laws: ['g9_flines'],
    setup(S) { S.pu = .62; S.pv = .2; S.m = MAG9.bar(0, 0, 0, 180, 30, 1); },
    geo(S) { const w = S.W, h = S.H, r = MF9.rect(w, h), wide = w >= 640, k = MAG9.sc(w, h); const fr = wide ? [r[0], r[1] + 20, r[2] - 210, r[3]] : [r[0], r[1] + 20, r[2], r[3] - 70]; const m = S.m; m.L = Math.round(180 * k); m.T = Math.round(30 * k); m.x = (fr[0] + fr[2]) / 2; m.y = (fr[1] + fr[3]) / 2; return { r, fr, wide, m }; },
    draw(ctx, w, h, S) {
      G.bg(ctx, w, h, false); MAG9.raw(ctx, () => { ctx.fillStyle = '#fbfdff'; ctx.fillRect(0, 0, w, h); });
      const g = D.geo(S), p = S.p, pr = p.prop, m = g.m, c = MF9.cache(S, 'l');
      const Ls = MAG9.lines(c.l, [m], g.fr, { n: 22 });
      MF9.clip(ctx, g.fr, () => {
        if (pr === 'invis') { MAG9.drawFilings(ctx, MAG9.filings(c.f, [m], g.fr, { dens: .7 }), { alpha: .55 }); MAG9.drawLines(ctx, Ls, { col: '#1d4ed8', alpha: .12, arrows: false }); }
        else MAG9.drawLines(ctx, Ls, { col: '#1d4ed8', flow: (p.flow !== false || pr === 'out') ? S.t : 0, flowCol: '#7dd3fc', alpha: pr === 'closed' ? .45 : .9 });
      });
      MAG9.raw(ctx, () => { const gg = MAG9.geo(m); ctx.fillStyle = 'rgba(255,255,255,.9)'; MAG9.pathPoly(ctx, gg.poly); ctx.fill(); ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 1.6; ctx.stroke(); ctx.font = '900 15px system-ui'; ctx.fillStyle = '#1d4ed8'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr'; ctx.fillText('N', m.x + m.L / 2 - 12, m.y); ctx.fillText('S', m.x - m.L / 2 + 12, m.y); ctx.textBaseline = 'alphabetic'; });
      if (p.inner !== false || pr === 'in' || pr === 'closed') MAG9.drawInner(ctx, [m], { col: pr === 'in' ? '#ea580c' : '#1d4ed8' });
      if (pr === 'closed') { let best = null, bl = 0; Ls.forEach(l => { if (l.end !== 'mag') return; const ys = l.pts.reduce((a, q) => Math.min(a, q[1]), 1e9); if (m.y - ys > bl && m.y - ys < (g.fr[3] - g.fr[1]) * .3) { bl = m.y - ys; best = l; } });
        if (best) { const inn = MAG9.geo(m).inner[1]; const loop = best.pts.concat([inn[0], inn[1], best.pts[0]]); MAG9.raw(ctx, () => { ctx.strokeStyle = '#ea580c'; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath(); loop.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke();
          let tot = 0; const seg = []; for (let i = 1; i < loop.length; i++) { const l = Math.hypot(loop[i][0] - loop[i - 1][0], loop[i][1] - loop[i - 1][1]); seg.push(l); tot += l; } let s0 = (S.t * 120) % tot; for (let i = 0; i < seg.length; i++) { if (s0 <= seg[i]) { const f = s0 / (seg[i] || 1); const x = loop[i][0] + (loop[i + 1][0] - loop[i][0]) * f, y = loop[i][1] + (loop[i + 1][1] - loop[i][1]) * f; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#ea580c'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 7, 0, TAU); ctx.fill(); ctx.stroke(); break; } s0 -= seg[i]; } });
          MF9.T(ctx, 'حلقة مقفلة: تخرج من N، تدخل في S، وتكمل دورتها داخل المغناطيس', m.x, Math.max(g.fr[1] + 14, m.y - bl - 22), { s: 12, w: 900, c: '#fff', bg: '#ea580c' }); } }
      if (pr === 'out') { MF9.T(ctx, 'خارج المغناطيس: من N إلى S', m.x, m.y + m.T * 2.6, { s: 12.5, w: 900, c: '#fff', bg: '#1d4ed8' }); }
      if (pr === 'in') MF9.T(ctx, 'داخل المغناطيس: من S إلى N', m.x, m.y + m.T * 1.5, { s: 12.5, w: 900, c: '#fff', bg: '#ea580c' });
      if (pr === 'invis') MF9.T(ctx, '👁 الخطوط غير مرئية — نكشف عنها ببرادة الحديد أو بالبوصلة', m.x, g.fr[1] + 16, { s: 12.5, w: 900, c: '#fff', bg: '#475569' });
      if (pr === 'dense') { const P = [[m.x + m.L / 2 + 18, m.y, 'قرب القطب'], [m.x, m.y - Math.min(170, (g.fr[3] - g.fr[1]) * .36), 'بعيداً عن المغناطيس']]; P.forEach(([x, y, t]) => { const R = 30; let n = 0; Ls.forEach(l => { if (l.pts.some(q => Math.hypot(q[0] - x, q[1] - y) < R)) n++; }); MAG9.raw(ctx, () => { ctx.fillStyle = 'rgba(250,204,21,.2)'; ctx.strokeStyle = '#ca8a04'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.fill(); ctx.stroke(); }); MF9.T(ctx, t + ': ' + n + ' خطوط', x, y - R - 12, { s: 12, w: 900, c: '#fff', bg: '#a16207' }); }); }
      // probe
      const px = g.fr[0] + S.pu * (g.fr[2] - g.fr[0]), py = g.fr[1] + S.pv * (g.fr[3] - g.fr[1]);
      if (p.probe !== false || pr === 'cross') { const b = MAG9.B([m], px, py), a = Math.atan2(b[1], b[0]); MAG9.miniCompass(ctx, px, py, 17, a); MAG9.raw(ctx, () => G.arrow(ctx, px + Math.cos(a) * 20, py + Math.sin(a) * 20, px + Math.cos(a) * 50, py + Math.sin(a) * 50, '#ea580c', 3, 9));
        if (pr === 'cross') { const a2 = a + .9; MAG9.raw(ctx, () => { ctx.strokeStyle = 'rgba(220,38,38,.7)'; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(px - Math.cos(a2) * 55, py - Math.sin(a2) * 55); ctx.lineTo(px + Math.cos(a2) * 55, py + Math.sin(a2) * 55); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#dc2626'; ctx.font = '900 26px system-ui'; ctx.textAlign = 'center'; ctx.fillText('✗', px + Math.cos(a2) * 62, py + Math.sin(a2) * 62 + 8); });
          MF9.T(ctx, 'اتجاه واحد فقط عند كل نقطة ⟸ لا تقاطع', clamp(px, 170, w - 150), py + 46, { s: 12, w: 900, c: '#fff', bg: '#dc2626' }); } }
      // property cards
      if (g.wide) { const B = MF9.chips(ctx, PR, pr, w - 108, 92, 196, 34, { s: 11.5 }); S._chips = B; const y0 = 92 + PR.length * 40 + 8; C2.lines(ctx, MF9.wrap(TXT[pr], 25).map(t => ({ t, s: 12 })), w - 10, y0, 196, { title: 'لماذا؟', bd: '#1d4ed8', lh: 19 }); }
      else { S._chips = null; C2.lines(ctx, MF9.wrap(TXT[pr], Math.max(30, Math.floor((w - 90) / 7.2))).map(t => ({ t, s: 12 })), w - 10, h - 40 - 70, w - 84, { bd: '#1d4ed8', lh: 18 }); }
      MAG9.banner(ctx, w, 'خصائص خطوط المجال المغناطيسي (الشكل 15)', '#1d4ed8');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), px = g.fr[0] + S.pu * (g.fr[2] - g.fr[0]), py = g.fr[1] + S.pv * (g.fr[3] - g.fr[1]); const L = [];
      L.push({ id: 'probe', x: px, y: py, r: 24, axis: 'xy', keep: true, tip: 'اسحب نقطة الاختبار: يظهر عندها اتجاه المجال', idle: 'اسحب البوصلة ✋', down: () => { S._a = px; S._b = py; }, drag: (S2, d) => { S.pu = clamp((S._a + d.x - d.sx - g.fr[0]) / (g.fr[2] - g.fr[0]), .03, .97); S.pv = clamp((S._b + d.y - d.sy - g.fr[1]) / (g.fr[3] - g.fr[1]), .03, .97); } });
      (S._chips || []).forEach(b => L.push(MAG9.btnObj('pr_' + b.k, b, () => setParam(S, 'prop', b.k), { tip: 'اعرض هذه الخاصية' }))); return L; },
    field(S, x, y) { if (!S.W) return null; const m = D.geo(S).m; return MAG9.inside(m, x, y) ? null : MAG9.B([m], x, y); },
    readings(S) { return [rd('الخاصية المعروضة', PR.find(q => q[0] === S.p.prop)[1], 1)]; },
    explain(S) { return '<b>' + PR.find(q => q[0] === S.p.prop)[1] + ':</b> ' + TXT[S.p.prop]; }
  });
})();
/* ---- 4.3 plotting field lines with a compass (fig 16) ---- */
(() => {
  const D = P92({ id: 'g9m_plot', page: 39, fig: 'الشكل 16',
    desc: 'ترسم خطوط المجال المغناطيسي حول مغناطيس باستعمال البوصلة المغناطيسية أو مجموعة بوصلات صغيرة. ضع البوصلة قرب القطب، علّم نقطة عند رأس إبرتها، ثم انقلها فتتكوّن نقاط الخط واحدة بعد الأخرى.',
    tags: 'رسم خطوط المجال بوصلة نقاط ورقة',
    tools: ['ساق مغناطيسية', 'بوصلة مغناطيسية صغيرة', 'ورقة', 'قلم'],
    controls: [BT('', [{ t: '📍 علّم رأس الإبرة', on: S => D.mark(S) }, { t: '➡ انقل البوصلة', on: S => D.hop(S) }, { t: '✏ ارسم خطاً كاملاً', on: S => { D.newLine(S); S.auto = 1; } }, { t: '🧽 امسح الورقة', on: S => { S.done = []; S.dots = []; S.si = 0; } }]),
      TG('ring', 'مجموعة بوصلات صغيرة (الشكل 16)', false, null, 'compass'), TG('real', 'قارن مع الخطوط الحقيقية', false, null, 'bfield'), TG('fil', 'برادة الحديد تحت الورقة', false, null, 'dot')],
    steps: ['ضع الساق المغناطيسية على ورقة بيضاء.', 'اسحب البوصلة الصغيرة إلى قرب القطب الشمالي N.', 'اضغط «علّم رأس الإبرة» لتضع نقطة عند الطرف الشمالي للإبرة.', 'اضغط «انقل البوصلة» فتنتقل حتى يقع ذيل الإبرة على النقطة، ثم علّم من جديد… كرر حتى تصل إلى القطب الجنوبي S.', 'صل النقاط فيتكون خط مجال؛ ابدأ من نقطة أخرى قرب N لترسم خطاً آخر (أو اضغط «ارسم خطاً كاملاً»).', 'شغّل «مجموعة بوصلات صغيرة» لترى كيف تصطف البوصلات على طول خط المجال كما في الشكل 16.'],
    concl: ['إبرة البوصلة مغناطيس دائمي صغير يتجه طرفها الشمالي باتجاه المجال في كل نقطة، لذلك نستعملها لرسم خطوط المجال.', 'الخطوط المرسومة تخرج من القطب الشمالي وتدخل في القطب الجنوبي خارج المغناطيس.'],
    laws: ['g9_flines'],
    setup(S) { S.cu = .3; S.cv = .3; S.dots = []; S.done = []; S.nd = { a: 0, w: 0 }; S.si = 0; S.auto = 0; S.at = 0; S.m = MAG9.bar(0, 0, Math.PI, 190, 40, 1); },
    geo(S) { const w = S.W, h = S.H, r = MF9.rect(w, h), k = MAG9.sc(w, h); const pr = [r[0] + 14, r[1] + 26, r[2] - 14, r[3] - 8]; const m = S.m; m.L = Math.round(190 * k); m.T = Math.round(40 * k); m.x = (pr[0] + pr[2]) / 2; m.y = pr[1] + (pr[3] - pr[1]) * .6; return { r, pr, m, cr: Math.round(17 * clamp(k, .8, 1.1)) }; },
    cpos(S) { const g = D.geo(S); return [g.pr[0] + S.cu * (g.pr[2] - g.pr[0]), g.pr[1] + S.cv * (g.pr[3] - g.pr[1])]; },
    setC(S, x, y) { const g = D.geo(S); S.cu = clamp((x - g.pr[0]) / (g.pr[2] - g.pr[0]), 0, 1); S.cv = clamp((y - g.pr[1]) / (g.pr[3] - g.pr[1]), 0, 1); },
    dir(S, x, y) { const b = MAG9.B([D.geo(S).m], x, y); return Math.atan2(b[1], b[0]); },
    mark(S) { if (!S.W) return; const g = D.geo(S), [x, y] = D.cpos(S), a = D.dir(S, x, y), L = g.cr * .72; if (!S.dots.length) S.dots.push([x - Math.cos(a) * L, y - Math.sin(a) * L]); S.dots.push([x + Math.cos(a) * L, y + Math.sin(a) * L]); S.nd.a = a; },
    hop(S) { if (!S.W || !S.dots.length) { C2.msg(S, 'علّم نقطة أولاً 📍', 2); return; } const g = D.geo(S), q = S.dots[S.dots.length - 1]; const a = D.dir(S, q[0], q[1]), L = g.cr * .72; D.setC(S, q[0] + Math.cos(a) * L, q[1] + Math.sin(a) * L); S.nd.a = a; },
    newLine(S) { if (!S.W) return; if (S.dots.length > 1) S.done.push(S.dots); S.dots = []; const g = D.geo(S); const P = MAG9.prep([g.m]); const fl = MAG9.flux(P, g.m); const sd = MAG9.seeds(fl, 16, 1).filter(q => MAG9.trace(P, [g.m], q[0], q[1], 1, g.pr).end === 'mag'); if (!sd.length) return; const ord = sd.map((q, i) => i).sort((a, b) => Math.abs(a - (sd.length - 1) / 2) - Math.abs(b - (sd.length - 1) / 2)); const s = sd[ord[S.si++ % sd.length]]; const a = D.dir(S, s[0], s[1]); D.setC(S, s[0] + Math.cos(a) * (g.cr * .72 + 3), s[1] + Math.sin(a) * (g.cr * .72 + 3)); S.nd.a = a; },
    update(S, dt) { if (!S.W) return; if (!S.ini) { S.ini = 1; const g = D.geo(S); D.setC(S, g.m.x - g.m.L / 2 - g.cr - 14, g.m.y - g.m.T * .8); } const [x, y] = D.cpos(S); MAG9.turn(S.nd, D.dir(S, x, y), dt, 90, 9);
      if (S.auto) { S.at += dt; if (S.at > .13) { S.at = 0; D.mark(S); D.hop(S); const g = D.geo(S), [cx, cy] = D.cpos(S); const end = MAG9.inside(g.m, cx, cy) || Math.hypot(cx - (g.m.x + g.m.L / 2), cy - g.m.y) < g.cr + 4 || S.dots.length > 90 || cx <= g.pr[0] + 2 || cx >= g.pr[2] - 2 || cy <= g.pr[1] + 2 || cy >= g.pr[3] - 2; if (end) { S.auto = 0; S.done.push(S.dots); S.dots = []; } } } },
    draw(ctx, w, h, S) {
      K.bg(ctx, w, h, { benchY: 46, tiles: false }); const g = D.geo(S), p = S.p, m = g.m; MF9.paper(ctx, g.pr[0], g.pr[1], g.pr[2] - g.pr[0], g.pr[3] - g.pr[1]);
      const c = MF9.cache(S, 'p'); MF9.clip(ctx, g.pr, () => { if (p.fil) MAG9.drawFilings(ctx, MAG9.filings(c.f, [m], g.pr, { dens: .8 }), { alpha: .5 }); if (p.real) MAG9.drawLines(ctx, MAG9.lines(c.l, [m], g.pr, { n: 14 }), { col: '#0e7490', alpha: .35, arrows: false }); });
      MAG9.drawMag(ctx, m);
      const pen = (pts, col) => { if (pts.length < 1) return; MAG9.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); ctx.fillStyle = '#111827'; pts.forEach(q => { ctx.beginPath(); ctx.arc(q[0], q[1], 2.6, 0, TAU); ctx.fill(); }); if (pts.length > 4) MAG9.arrowsOn(ctx, pts, col, 6, 150); }); };
      S.done.forEach(l => pen(l, '#475569')); pen(S.dots, '#7c3aed');
      if (p.ring) { const P = MAG9.prep([m]); for (let k = 0; k < 9; k++) { const th = Math.PI * (1.08 + .84 * k / 8), R = m.L * .62; const x = m.x + Math.cos(th) * R, y = m.y + Math.sin(th) * R * .95; const b = MAG9.Bp(P, x, y); MAG9.miniCompass(ctx, x, y, g.cr * .9, Math.atan2(b[1], b[0])); } }
      const [cx, cy] = D.cpos(S); MAG9.miniCompass(ctx, cx, cy, g.cr, S.nd.a);
      MAG9.raw(ctx, () => { ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.arc(cx, cy, g.cr + 5, 0, TAU); ctx.stroke(); ctx.setLineDash([]); });
      MF9.T(ctx, 'عدد الخطوط المرسومة: ' + S.done.length + (S.dots.length ? '  (نقاط الخط الحالي: ' + S.dots.length + ')' : ''), MAG9.cx(w), g.pr[3] - 16, { s: 12, w: 800, c: '#fff', bg: 'rgba(30,41,59,.82)' });
      C2.drawMsg(ctx, S, cx, cy - 26);
      MAG9.banner(ctx, w, 'رسم خطوط المجال بالبوصلة (الشكل 16)', '#7c3aed');
    },
    drags(S) { if (!S.W) return []; const [x, y] = D.cpos(S); return [{ id: 'comp', x, y, r: 26, axis: 'xy', keep: true, tip: 'اسحب البوصلة — ثم علّم رأس إبرتها', idle: 'اسحب البوصلة ✋', down: () => { S._a = x; S._b = y; S.auto = 0; }, drag: (S2, d) => D.setC(S, S._a + d.x - d.sx, S._b + d.y - d.sy), click: () => D.mark(S) }]; },
    field(S, x, y) { if (!S.W) return null; const m = D.geo(S).m; return MAG9.inside(m, x, y) ? null : MAG9.B([m], x, y); },
    readings(S) { return [rd('الخطوط المرسومة', String(S.done.length)), rd('نقاط الخط الحالي', String(S.dots.length)), rd('اتجاه إبرة البوصلة', Math.round(deg(-S.nd.a)) + '°')]; },
    explain(S) { return 'إبرة البوصلة مغناطيس صغير، يتجه طرفها الشمالي (الأحمر) <b>باتجاه المجال</b> في مكانها. عندما نعلّم نقطة عند رأسها ثم ننقلها لتصبح النقطة عند ذيلها ونكرر، تتكون سلسلة نقاط هي <b>خط المجال</b> الذي يخرج من N ويصل إلى S.' + (S.done.length >= 3 ? '<br>✓ رسمت ' + S.done.length + ' خطوط: لاحظ أنها لا تتقاطع وأنها تتقارب قرب الأقطاب.' : ''); }
  });
})();
/* ---- 4.4 activity: iron filings on a glass sheet (fig 17, fig 11) ---- */
(() => {
  const AR = [['bar', 'ساق مستقيمة (الشكل 17)'], ['U', 'حرف U (الشكل 9-c)'], ['NN', 'قطبان متشابهان (11-a)'], ['SN', 'قطبان مختلفان (11-b)']];
  const D = P92({ id: 'g9m_filings', page: 40, fig: 'الشكل 17',
    desc: 'نشاط: الكشف عن خطوط المجال المغناطيسي باستعمال برادة الحديد. أدوات النشاط: ساق مغناطيسية، لوح من الزجاج، برادة الحديد. ننثر البرادة على اللوح فوق المغناطيس، ثم ننقر اللوح بلطف.',
    tags: 'برادة الحديد لوح زجاج نشاط الكشف عن خطوط المجال',
    tools: ['ساق مغناطيسية', 'لوح من الزجاج', 'برادة الحديد'],
    controls: [SEL('arr', 'ترتيب المغانط', AR, 'bar'), BT('', [{ t: '✨ انثر على اللوح كله', on: S => D.sprAll(S) }, { t: '👆 انقر اللوح بلطف', on: S => D.tap(S) }, { t: '🧹 نظّف اللوح', on: S => D.clear(S) }]),
      TG('lines', 'قارن مع خطوط المجال', false, null, 'bfield'), TG('mag', 'أظهر المغناطيس تحت الزجاج', true, null, 'magnet')],
    steps: ['نضع لوح الزجاج على الساق المغناطيسية وبمستوٍ أفقي.', 'ننثر برادة الحديد على لوح الزجاج: اسحب المِنثَرة فوق اللوح (أو اضغط «انثر على اللوح كله»).', 'ننقر اللوح بلطف: اضغط «انقر اللوح» أو انقر على الزجاج مرتين أو ثلاثاً.', 'ماذا نلاحظ؟ ترتبت البرادة بشكل خطوط تمثل خطوط المجال المغناطيسي حول الساق (الشكل 17).', 'جرّب ترتيبات أخرى: مغناطيس حرف U، قطبان متشابهان، وقطبان مختلفان (الشكل 11).'],
    concl: ['تترتب برادة الحديد بشكل خطوط تمثل خطوط المجال المغناطيسي حول الساق المغناطيسية.', 'تتجمع البرادة بكثافة عالية عند القطبين حيث المجال أقوى.', 'بين قطبين مختلفين تمتد البرادة من قطب إلى آخر (تجاذب)، وبين قطبين متشابهين تبتعد عن المنطقة الوسطى (تنافر).'],
    laws: ['g9_flines', 'g9_poles'],
    setup(S) { S.vis = new Uint8Array(14000); S.al = new Float32Array(14000); S.tapT = 0; S.sh = { u: .2, v: .25 }; S.par = []; S.lastSp = null; S.arrK = null; S.nvis = 0; S.taps = 0; },
    geo(S) { const w = S.W, h = S.H, r = MF9.rect(w, h), k = MAG9.sc(w, h); const gl = [r[0] + 20, r[1] + 34, r[2] - 20, r[3] - 20]; const cx = (gl[0] + gl[2]) / 2, cy = (gl[1] + gl[3]) / 2, a = S.p.arr;
      const Lb = Math.round(170 * k), Tb = Math.round(36 * k); let M;
      if (a === 'bar') M = [MAG9.bar(cx, cy, 0, Lb, Tb, 1)];
      else if (a === 'U') M = [MAG9.U(cx, cy + 40 * k, -Math.PI / 2, 130 * k, 100 * k, 34 * k, 1, { uStyle: 'red' })];
      else { const gap = 70 * k, L2 = Math.round(Lb * .82); M = [MAG9.bar(cx - gap / 2 - L2 / 2, cy, a === 'NN' ? 0 : 0, L2, Tb, 1), MAG9.bar(cx + gap / 2 + L2 / 2, cy, a === 'NN' ? Math.PI : 0, L2, Tb, 1)]; }
      S._M = M; return { r, gl, M }; },
    fil(S) { const g = D.geo(S); const c = MF9.cache(S, 'f' + S.p.arr); const F = MAG9.filings(c.f, g.M, g.gl, { dens: 1.15 }); if (S.arrK !== c.f.key) { S.arrK = c.f.key; S.vis.fill(0); S.al.fill(0); S.nvis = 0; } return F; },
    spr(S, x, y, R = 34) { const F = D.fil(S); F.forEach(f => { if (!S.vis[f[6]] && Math.hypot(f[0] - x, f[1] - y) < R * (.6 + .4 * f[5])) { S.vis[f[6]] = 1; S.al[f[6]] = 0; S.nvis++; } }); for (let k = 0; k < 8; k++) S.par.push({ x: x + (Math.random() - .5) * 22, y: y - 26, vy: 60 + Math.random() * 80, t: 0 }); },
    sprAll(S) { if (!S.W) return; const g = D.geo(S); for (let y = g.gl[1] + 20; y < g.gl[3]; y += 36) for (let x = g.gl[0] + 20; x < g.gl[2]; x += 36) D.spr(S, x, y, 46); },
    tap(S) { if (!S.nvis) { C2.msg(S, 'انثر البرادة أولاً ✨', 2); return; } S.tapT = .5; S.taps++; if (window.Sound && Sound.tick) try { Sound.tick(); } catch (e) { } },
    clear(S) { S.vis.fill(0); S.al.fill(0); S.nvis = 0; S.taps = 0; },
    update(S, dt) { if (!S.W) return; if (S.tapT > 0) { S.tapT -= dt; const F = D.fil(S); F.forEach(f => { if (S.vis[f[6]]) S.al[f[6]] = Math.min(1, S.al[f[6]] + dt * (1.1 + .6 * f[5])); }); }
      S.par = S.par.filter(q => (q.t += dt) < .45); S.par.forEach(q => { q.vy += 900 * dt; q.y += q.vy * dt; }); },
    draw(ctx, w, h, S) {
      K.bg(ctx, w, h, { benchY: h * .08, tiles: false }); const g = D.geo(S), p = S.p, F = D.fil(S); const jx = S.tapT > 0 ? Math.sin(S.t * 90) * 2.2 : 0;
      ctx.save(); ctx.translate(jx, 0);
      MAG9.raw(ctx, () => { ctx.fillStyle = '#f1f5f9'; ctx.fillRect(g.gl[0], g.gl[1], g.gl[2] - g.gl[0], g.gl[3] - g.gl[1]); });
      if (p.mag !== false) g.M.forEach(m => MAG9.drawMag(ctx, m, { shadow: false })); else g.M.forEach(m => MAG9.raw(ctx, () => { ctx.strokeStyle = 'rgba(100,116,139,.5)'; ctx.setLineDash([4, 4]); MAG9.pathPoly(ctx, MAG9.geo(m).poly); ctx.stroke(); ctx.setLineDash([]); }));
      MF9.glass(ctx, g.gl[0], g.gl[1], g.gl[2] - g.gl[0], g.gl[3] - g.gl[1]);
      if (p.lines) MF9.clip(ctx, g.gl, () => MAG9.drawLines(ctx, MAG9.lines(MF9.cache(S, 'l' + p.arr).l, g.M, g.gl, { n: 16 }), { col: '#0ea5e9', alpha: .7 }));
      MF9.clip(ctx, g.gl, () => MAG9.drawFilings(ctx, F, { mask: f => S.vis[f[6]], alA: S.al, col: '#1c1917', lw: 1.3 }));
      ctx.restore();
      // shaker
      const sx = g.gl[0] + S.sh.u * (g.gl[2] - g.gl[0]), sy = g.gl[1] + S.sh.v * (g.gl[3] - g.gl[1]); D.shaker(ctx, sx, sy - 34);
      MAG9.raw(ctx, () => { ctx.fillStyle = '#292524'; S.par.forEach(q => ctx.fillRect(q.x, q.y, 1.6, 2.6)); });
      const st = !S.nvis ? 'اسحب المِنثرة لتنثر البرادة على الزجاج' : S.taps === 0 ? 'البرادة مبعثرة… انقر اللوح بلطف 👆' : 'ترتبت البرادة بشكل خطوط المجال ✓';
      MF9.T(ctx, st, MAG9.cx(w), g.gl[3] - 18, { s: 12.5, w: 900, c: '#fff', bg: S.taps ? '#15803d' : '#b45309' });
      MF9.T(ctx, 'لوح زجاج', g.gl[2] - 46, g.gl[1] + 16, { s: 11, w: 800, c: '#0e7490' });
      C2.drawMsg(ctx, S, MAG9.cx(w), h * .4);
      MAG9.banner(ctx, w, 'نشاط: الكشف عن خطوط المجال باستعمال برادة الحديد', '#15803d');
    },
    shaker(ctx, x, y) { MAG9.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(-.5); ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 6; const g = ctx.createLinearGradient(-15, 0, 15, 0); g.addColorStop(0, '#92400e'); g.addColorStop(.4, '#fbbf24'); g.addColorStop(1, '#78350f'); ctx.fillStyle = g; rr(ctx, -15, -44, 30, 46, 6); ctx.fill(); ctx.shadowBlur = 0;
      const cg = ctx.createLinearGradient(-16, 0, 16, 0); cg.addColorStop(0, '#6b7280'); cg.addColorStop(.5, '#e5e7eb'); cg.addColorStop(1, '#4b5563'); ctx.fillStyle = cg; rr(ctx, -16, 0, 32, 12, 4); ctx.fill(); ctx.fillStyle = '#1f2937'; for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.arc(k * 5, 12, 1.4, 0, TAU); ctx.fill(); }
      ctx.fillStyle = '#fff'; ctx.font = '800 9px system-ui'; ctx.textAlign = 'center'; ctx.restore(); }); MF9.T(ctx, 'برادة الحديد', x + 4, y - 66, { s: 10.5, w: 800, c: '#fff', bg: 'rgba(120,53,15,.85)' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), sx = g.gl[0] + S.sh.u * (g.gl[2] - g.gl[0]), sy = g.gl[1] + S.sh.v * (g.gl[3] - g.gl[1]);
      return [{ id: 'shaker', x: sx, y: sy - 50, w: 54, h: 70, axis: 'xy', keep: true, tip: 'اسحب المِنثرة فوق اللوح لتنثر البرادة', idle: 'انثر البرادة ✋', down: () => { S._a = sx; S._b = sy; },
        drag: (S2, d) => { const nx = clamp(S._a + d.x - d.sx, g.gl[0], g.gl[2]), ny = clamp(S._b + d.y - d.sy, g.gl[1] + 10, g.gl[3]); S.sh = { u: (nx - g.gl[0]) / (g.gl[2] - g.gl[0]), v: (ny - g.gl[1]) / (g.gl[3] - g.gl[1]) }; if (!S.lastSp || Math.hypot(nx - S.lastSp[0], ny - S.lastSp[1]) > 12) { S.lastSp = [nx, ny]; D.spr(S, nx, ny); } } },
        { id: 'glass', x: (g.gl[0] + g.gl[2]) / 2, y: g.gl[3] - 40, w: g.gl[2] - g.gl[0] - 120, h: 50, tip: 'انقر الزجاج بلطف', hint: false, click: () => D.tap(S) }]; },
    field(S, x, y) { if (!S.W) return null; const M = D.geo(S).M; return MAG9.insideAny(M, x, y) ? null : MAG9.B(M, x, y); },
    readings(S) { return [rd('ترتيب المغانط', AR.find(q => q[0] === S.p.arr)[1], 1), rd('برادة منثورة (قطع)', String(S.nvis)), rd('عدد النقرات', String(S.taps))]; },
    explain(S) { const a = S.p.arr; if (!S.nvis) return 'ابدأ بنثر برادة الحديد على لوح الزجاج.'; if (!S.taps) return 'البرادة مبعثرة عشوائياً لأن الاحتكاك يمنعها من الدوران. عندما ننقر اللوح تتحرك قليلاً فتستطيع كل قطعة أن تتجه مع المجال.';
      return 'كل قطعة برادة تتمغنط بالحث فتصبح مغناطيساً صغيراً يتجه مع المجال، لذلك <b>ترتبت البرادة بشكل خطوط</b> تمثل خطوط المجال، وهي <b>أكثف عند الأقطاب</b>. ' + (a === 'NN' ? 'بين القطبين المتشابهين تبتعد الخطوط عن بعضها وتبقى منطقة في الوسط شبه خالية: <b>تنافر</b> (الشكل 11-a).' : a === 'SN' ? 'بين القطبين المختلفين تمتد الخطوط من قطب إلى الآخر مباشرة: <b>تجاذب</b> (الشكل 11-b).' : a === 'U' ? 'في مغناطيس حرف U تتجمع البرادة بكثافة عند القطبين، وتمتد بينهما خطوط شبه مستقيمة.' : ''); }
  });
})();
/* ---- 4.5 review: Q4 draw field lines + Q1-3 compass between the poles of a U magnet ---- */
(() => {
  const CS = [['a', 'س4 (a): مغناطيس حرف U'], ['b', 'س4 (b): N S  N S'], ['c', 'س4 (c): N S  S N'], ['q13', 'س1-3: بوصلة بين قطبي U']];
  const OPT = { a: Math.PI / 2, b: 0, c: -Math.PI / 2, d: Math.PI };   // direction of the needle's N end (canvas)
  const D = P92({ id: 'g9m_q4', page: 46, fig: 'أسئلة الفصل: س4 ، س1-3',
    desc: 'أسئلة الفصل: ارسم مخططاً يوضح شكل خطوط المجال المغناطيسي للحالات (a) و (b) و (c)، وحدد الاتجاه الصحيح الذي تصطف به إبرة بوصلة موضوعة بين قطبي مغناطيس بشكل حرف U.',
    tags: 'أسئلة الفصل ارسم خطوط المجال بوصلة بين قطبي U',
    tools: ['مغناطيس بشكل حرف U', 'ساقان مغناطيسيتان', 'بوصلة'],
    controls: [SEL('cs', 'الحالة', CS, 'a'), BT('', [{ t: '✏ ارسم الخطوط', on: S => { S.rv = 0; S.draw = 1; } }, { t: '↺ من جديد', on: S => { S.rv = 0; S.draw = 0; S.ans = null; } }]), TG('cg', 'شبكة بوصلات', false, null, 'compass')],
    steps: ['اختر الحالة (a) أو (b) أو (c) من س4.', 'فكر أولاً: كيف ستكون الخطوط؟ ثم اضغط «ارسم الخطوط» لتراها تُرسم تدريجياً.', 'في (b) القطبان المتقابلان S و N مختلفان ⟸ خطوط تمتد بينهما (تجاذب). في (c) القطبان S و S متشابهان ⟸ الخطوط تتنافر وتنعطف بعيداً.', 'اختر «س1-3» واضغط على الاتجاه الذي تراه صحيحاً لإبرة البوصلة.'],
    concl: ['بين قطبي مغناطيس حرف U يتجه المجال من القطب N إلى القطب S، فيتجه الطرف الشمالي لإبرة البوصلة نحو القطب الجنوبي S.', 'بين قطبين مختلفين تمتد الخطوط من أحدهما إلى الآخر، وبين قطبين متشابهين تتباعد الخطوط وتوجد نقطة متعادلة يكون عندها المجال صفراً تقريباً.'],
    laws: ['g9_flines', 'g9_poles'],
    setup(S) { S.rv = 0; S.draw = 0; S.ans = null; S.nd = { a: -Math.PI / 2, w: 0 }; },
    geo(S) { const w = S.W, h = S.H, r = MF9.rect(w, h), k = MAG9.sc(w, h), cx = (r[0] + r[2]) / 2, cy = (r[1] + r[3]) / 2 + 10, c = S.p.cs; let M;
      if (c === 'a' || c === 'q13') M = [MAG9.U(cx, cy + 60 * k, -Math.PI / 2, 190 * k, 130 * k, 56 * k, 1, { uStyle: 'halves' })];
      else { const L2 = Math.round(150 * k), T = Math.round(30 * k), gap = 64 * k; M = [MAG9.bar(cx - gap / 2 - L2 / 2, cy, Math.PI, L2, T, 1), MAG9.bar(cx + gap / 2 + L2 / 2, cy, c === 'b' ? Math.PI : 0, L2, T, 1)]; }
      return { r, M, k, cx, cy }; },
    update(S, dt) { if (S.draw && S.rv < 1) S.rv = Math.min(1, S.rv + dt * .45); if (S.p.cs === 'q13' && S.ans && S.W) { const g = D.geo(S), m = g.M[0], b = MAG9.B(g.M, m.x, m.y - m.H * .62); MAG9.turn(S.nd, Math.atan2(b[1], b[0]), dt, 40, 5); } },
    draw(ctx, w, h, S) {
      G.bg(ctx, w, h, false); MAG9.raw(ctx, () => { ctx.fillStyle = '#fffef7'; ctx.fillRect(0, 0, w, h); }); const g = D.geo(S), p = S.p, c = p.cs; const r = g.r;
      const Ls = MAG9.lines(MF9.cache(S, 'q' + c).l, g.M, r, { n: 20 });
      const show = c === 'q13' ? (S.ans ? 1 : 0) : S.rv;
      if (p.cg) MAG9.cgrid(ctx, g.M, r, { sp: 44 });
      if (show > 0) MF9.clip(ctx, r, () => { const part = Ls.map(l => ({ pts: l.pts.slice(0, Math.max(2, Math.round(l.pts.length * show))) })); MAG9.drawLines(ctx, part, { col: '#be123c', lw: 1.8, arrows: show > .95 }); });
      g.M.forEach(m => MAG9.drawMag(ctx, m));
      if (c === 'q13') { const m = g.M[0], cy = m.y - m.H * .62; MAG9.compass(ctx, m.x, cy, 30 * g.k + 6, S.nd.a); if (!S.ans) { MAG9.raw(ctx, () => { ctx.fillStyle = 'rgba(30,41,59,.85)'; ctx.beginPath(); ctx.arc(m.x, cy, (30 * g.k + 6) * .84, 0, TAU); ctx.fill(); }); MF9.T(ctx, '؟', m.x, cy, { s: 30, w: 900, c: '#fde68a' }); } MF9.T(ctx, 'بوصلة', m.x, cy - 46 * g.k - 6, { s: 12, w: 900, c: '#fff', bg: '#334155' });
        const ow = Math.min(84, (w - 80) / 4 - 8), oy = r[3] - ow / 2 - 30; S._ob = []; ['a', 'b', 'c', 'd'].forEach((k, i) => { const ox = MAG9.cx(w) + (1.5 - i) * (ow + 10); const b = { x: ox, y: oy, w: ow, h: ow, k }; S._ob.push(b); const ok = S.ans && k === 'd', bad = S.ans === k && k !== 'd';
          MAG9.raw(ctx, () => { ctx.fillStyle = ok ? '#dcfce7' : bad ? '#fee2e2' : '#fff'; ctx.strokeStyle = ok ? '#16a34a' : bad ? '#dc2626' : '#64748b'; ctx.lineWidth = 2; rr(ctx, ox - ow / 2, oy - ow / 2, ow, ow, 10); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(ox, oy - 6, ow * .3, 0, TAU); ctx.stroke(); });
          MAG9.raw(ctx, () => MAG9.needle(ctx, ox, oy - 6, OPT[k], ow * .26, 1, { w: ow * .07 })); const a = OPT[k];
          MAG9.raw(ctx, () => { ctx.font = '800 10px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr'; ctx.fillStyle = '#334155'; ctx.fillText('N', ox + Math.cos(a) * ow * .4, oy - 6 + Math.sin(a) * ow * .4); ctx.fillText('S', ox - Math.cos(a) * ow * .4, oy - 6 - Math.sin(a) * ow * .4); ctx.font = '800 12px system-ui'; ctx.fillText('(' + k + ')', ox, oy + ow / 2 - 9); ctx.textBaseline = 'alphabetic'; }); });
        MF9.T(ctx, S.ans ? (S.ans === 'd' ? '✓ صحيح (d): المجال بين القطبين من N إلى S، فيتجه الطرف الشمالي للإبرة نحو القطب S' : '✗ ليس (' + S.ans + '). الجواب (d): الطرف الشمالي للإبرة يتجه نحو القطب S') : 'اضغط على الاتجاه الصحيح لإبرة البوصلة', MAG9.cx(w), oy - ow / 2 - 18, { s: 12, w: 900, c: '#fff', bg: S.ans ? (S.ans === 'd' ? '#15803d' : '#dc2626') : '#334155' }); }
      else { const lab = c === 'a' ? 'الحالة (a)' : c === 'b' ? 'الحالة (b): القطبان المتقابلان S و N مختلفان ⟸ تجاذب' : 'الحالة (c): القطبان المتقابلان S و S متشابهان ⟸ تنافر'; MF9.T(ctx, lab, MAG9.cx(w), r[3] - 20, { s: 12.5, w: 900, c: '#fff', bg: '#be123c' });
        if (c === 'c' && S.rv > .95) { const P = MAG9.prep(g.M); let best = [g.cx, g.cy], bm = 1e9; for (let y = g.cy - 120; y <= g.cy + 120; y += 4) { const b = MAG9.Bp(P, g.cx, y), m = Math.hypot(b[0], b[1]); if (m < bm && Math.abs(y - g.cy) > 20) { bm = m; best = [g.cx, y]; } } MAG9.raw(ctx, () => { ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(best[0], best[1], 9, 0, TAU); ctx.stroke(); }); MF9.T(ctx, 'نقطة متعادلة (المجال ≈ 0)', best[0], best[1] - 22, { s: 11, w: 800, c: '#fff', bg: '#7c3aed' }); } }
      MAG9.banner(ctx, w, 'أسئلة الفصل: س4 (ارسم خطوط المجال) و س1-3 (البوصلة)', '#be123c');
    },
    drags(S) { if (!S.W) return []; if (S.p.cs !== 'q13' || !S._ob) return []; return S._ob.map(b => MAG9.btnObj('o' + b.k, b, () => { S.ans = b.k; if (b.k === 'd') { const g = D.geo(S); K.cheer(S, g.cx, g.cy - 80); } }, { tip: 'اختر هذا الاتجاه', idle: b.k === 'a' ? 'اختر ✋' : null, hint: b.k === 'a' })); },
    field(S, x, y) { if (!S.W) return null; const M = D.geo(S).M; return MAG9.insideAny(M, x, y) ? null : MAG9.B(M, x, y); },
    readings(S) { const c = S.p.cs; return [rd('الحالة', CS.find(q => q[0] === c)[1], 1), rd(c === 'q13' ? 'إجابتك' : 'الرسم', c === 'q13' ? (S.ans ? '(' + S.ans + ')' + (S.ans === 'd' ? ' ✓' : ' ✗') : '—') : Math.round(S.rv * 100) + '%')]; },
    explain(S) { const c = S.p.cs; return c === 'a' ? 'خطوط مجال مغناطيس حرف U تخرج من القطب N وتدخل في القطب S، وتكون بين القطبين متقاربة وشبه مستقيمة (مجال قوي منتظم تقريباً).' : c === 'b' ? 'القطبان المتقابلان مختلفان (S و N): تخرج الخطوط من القطب N للمغناطيس الأيمن وتدخل في القطب S المقابل له، فتتصل الخطوط بين المغناطيسين وهذا يدل على <b>التجاذب</b>.' : c === 'c' ? 'القطبان المتقابلان متشابهان (S و S): الخطوط القادمة من كل جهة تنعطف بعيداً ولا تتصل، وتبقى بينهما <b>نقطة متعادلة</b> مجالها صفر تقريباً: دليل <b>التنافر</b>.' : 'إبرة البوصلة مغناطيس صغير يصطف مع المجال: الطرف الشمالي للإبرة يتجه باتجاه المجال، أي من القطب N نحو القطب S. لذلك الجواب <b>(d)</b>.'; }
  });
})();
/* ---- 4.6 ➕ PhET-style bar-magnet lab (Magnets & Electromagnets / Faraday's Electromagnetic Lab) ---- */
(() => {
  const EARTH = 2.2e-6; // ≈ 55 µT in model units (north = up on the screen)
  const D = P92({ id: 'g9m_lab', page: 39, fig: '➕ من المختبرات العالمية',
    desc: '➕ من المختبرات العالمية (على غرار PhET «المغانط والمغانط الكهربائية» و«مختبر فاراداي»): ساق مغناطيسية تسحبها وتديرها، شبكة بوصلات، مقياس للمجال، قلب الأقطاب، تغيير القوة، مغناطيس ثانٍ، ومجال الأرض.',
    tags: 'PhET مختبر المغناطيس مقياس المجال شبكة بوصلات قلب الأقطاب مجال الأرض',
    tools: ['ساق مغناطيسية', 'بوصلة', 'مقياس المجال المغناطيسي'],
    controls: [R('str', 'قوة المغناطيس', 0, 100, 75, 5, '%'),
      BT('', [{ t: '⇄ اقلب الأقطاب', on: S => { S.m1.flip = !S.m1.flip; } }, { t: '➕ مغناطيس ثانٍ', on: S => { S.two = !S.two; } }, { t: '⟲ أعد الترتيب', on: S => D.setup(S) }]),
      TG('lines', 'خطوط المجال', true, null, 'bfield'), TG('cg', 'شبكة البوصلات', true, null, 'grid'), TG('fil', 'برادة الحديد', false, null, 'dot'), TG('meter', 'مقياس المجال', true, null, 'meter'), TG('comp', 'بوصلة كبيرة', true, null, 'compass'), TG('earth', 'مجال الأرض', false, null, 'eye'), TG('inner', 'الخطوط داخل المغناطيس', false, null, 'magnet')],
    steps: ['اسحب المغناطيس إلى أي مكان، واسحب المقبض الأخضر عند طرفه لتدويره.', 'راقب شبكة البوصلات: كل إبرة تتجه مع المجال في مكانها، وتكون باهتة حيث المجال ضعيف.', 'ضع مقياس المجال في نقاط مختلفة: قرب القطب، في الوسط، وبعيداً… قارن القيم.', 'اضغط «اقلب الأقطاب» ولاحظ انقلاب جميع الإبر والخطوط.', 'أضف مغناطيساً ثانياً وقرّب الأقطاب المتشابهة ثم المختلفة.', 'شغّل «مجال الأرض» وابتعد بالبوصلة عن المغناطيس: تتجه نحو الشمال الجغرافي.'],
    concl: ['المجال أقوى ما يمكن قرب الأقطاب ويضعف بسرعة كلما ابتعدنا.', 'اتجاه المجال خارج المغناطيس من N إلى S، وقلب الأقطاب يقلب اتجاه المجال في كل مكان.', 'بعيداً عن المغانط لا يبقى إلا مجال الأرض الضعيف، فتشير البوصلة إلى الشمال.'],
    laws: ['g9_flines', 'g9_poles'],
    setup(S) { S.m1 = MAG9.bar(0, 0, 0, 170, 38, 1); S.m2 = MAG9.bar(0, 0, Math.PI, 130, 32, .8); S.u1 = { u: .42, v: .45 }; S.u2 = { u: .78, v: .45 }; S.mp = { u: .7, v: .2 }; S.cp = { u: .18, v: .75 }; S.nd = { a: 0, w: 0 }; S.two = false; },
    geo(S) { const w = S.W, h = S.H, r = MF9.rect(w, h), k = MAG9.sc(w, h); const pos = (q) => [r[0] + q.u * (r[2] - r[0]), r[1] + q.v * (r[3] - r[1])];
      const m1 = S.m1; [m1.x, m1.y] = pos(S.u1); m1.L = Math.round(170 * k); m1.T = Math.round(38 * k); m1.str = S.p.str / 100 * 1.6;
      const M = [m1]; if (S.two) { const m2 = S.m2; [m2.x, m2.y] = pos(S.u2); m2.L = Math.round(130 * k); m2.T = Math.round(32 * k); M.push(m2); }
      return { r, M, k, pos, ext: S.p.earth ? [0, -EARTH] : null }; },
    setPos(S, key, x, y) { const r = MF9.rect(S.W, S.H); S[key] = { u: clamp((x - r[0]) / (r[2] - r[0]), .04, .96), v: clamp((y - r[1]) / (r[3] - r[1]), .05, .95) }; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S), [x, y] = g.pos(S.cp); const b = MAG9.B(g.M, x, y, g.ext); if (Math.hypot(b[0], b[1]) > 1e-9) MAG9.turn(S.nd, Math.atan2(b[1], b[0]), dt, 70, 5); },
    draw(ctx, w, h, S) {
      G.bg(ctx, w, h, false); MAG9.raw(ctx, () => { const gg = ctx.createLinearGradient(0, 0, 0, h); gg.addColorStop(0, '#f8fafc'); gg.addColorStop(1, '#eef2ff'); ctx.fillStyle = gg; ctx.fillRect(0, 0, w, h); });
      const g = D.geo(S), p = S.p;
      MF9.draw(ctx, S, 'lab', g.M, g.r, { lines: p.lines !== false, cg: p.cg !== false, fil: p.fil, ext: g.ext, n: 18, inner: p.inner, cgRef: 6e-5, sp: Math.round(38 * clamp(g.k, .8, 1.1)) });
      g.M.forEach(m => MF9.knob(ctx, MF9.rotDrag('', m)));
      if (p.earth) { const ex = w - 46, ey = 92; MAG9.raw(ctx, () => G.arrow(ctx, ex, ey + 30, ex, ey - 22, '#16a34a', 4, 12)); MF9.T(ctx, 'الشمال الجغرافي', ex - 4, ey + 46, { s: 11, w: 900, c: '#fff', bg: '#16a34a' }); }
      if (p.comp !== false) { const [x, y] = g.pos(S.cp); MAG9.compass(ctx, x, y, 34, S.nd.a); }
      if (p.meter !== false) { const [x, y] = g.pos(S.mp); MF9.meter(ctx, x, y, MAG9.insideAny(g.M, x, y) ? null : MAG9.B(g.M, x, y, g.ext), { w }); }
      MAG9.extra(ctx, w, 'مختبر الساق المغناطيسية (PhET)');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = [];
      g.M.forEach((m, i) => { const key = i ? 'u2' : 'u1'; L.push(Object.assign(MF9.magDrag('mag' + i, m, g.r, { tip: 'اسحب المغناطيس', idle: i ? null : 'اسحب المغناطيس ✋' }), { drag: (S2, d) => D.setPos(S, key, m._ox + d.x - d.sx, m._oy + d.y - d.sy) })); L.push(MF9.rotDrag('rot' + i, m)); });
      if (S.p.meter !== false) { const [x, y] = g.pos(S.mp); L.push({ id: 'meter', x, y, r: 22, axis: 'xy', keep: true, tip: 'ضع مجس المقياس في أي نقطة', down: () => { S._a = x; S._b = y; }, drag: (S2, d) => D.setPos(S, 'mp', S._a + d.x - d.sx, S._b + d.y - d.sy) }); }
      if (S.p.comp !== false) { const [x, y] = g.pos(S.cp); L.push({ id: 'comp', x, y, r: 34, axis: 'xy', keep: true, tip: 'اسحب البوصلة', down: () => { S._c = x; S._d = y; }, drag: (S2, d) => D.setPos(S, 'cp', S._c + d.x - d.sx, S._d + d.y - d.sy) }); }
      return L; },
    field(S, x, y) { if (!S.W) return null; const g = D.geo(S); return MAG9.insideAny(g.M, x, y) ? null : MAG9.B(g.M, x, y, g.ext); },
    readings(S) { if (!S.W) return []; const g = D.geo(S), [x, y] = g.pos(S.mp); const b = MAG9.tesla(MAG9.B(g.M, x, y, g.ext)), m = Math.hypot(b[0], b[1]); return [rd('B عند المجس', fmt(m * 1e3, 3) + ' mT'), rd('اتجاه المجال θ', Math.round(deg(Math.atan2(-b[1], b[0]))) + '°'), rd('قوة المغناطيس', S.p.str + '%'), rd('القطب N يتجه', S.m1.flip ? 'عكس المقبض' : 'نحو المقبض الأخضر'), rd('مجال الأرض', S.p.earth ? 'مُفعّل (≈ 0.05 mT)' : 'مُطفأ')]; },
    explain(S) { if (!S.W) return ''; const g = D.geo(S), [x, y] = g.pos(S.mp); const b = MAG9.tesla(MAG9.B(g.M, x, y, g.ext)), m = Math.hypot(b[0], b[1]) * 1e3; return 'المقياس يقرأ <b>' + fmt(m, 3) + ' mT</b>. ' + (m > 20 ? 'المجس قريب جداً من قطب: مجال قوي.' : m > 1 ? 'المجال متوسط.' : 'المجال ضعيف هنا' + (S.p.earth ? ' ومجال الأرض (≈ 0.05 mT) يصبح مهماً.' : '.')) + '<br>كل إبرة في الشبكة تتجه مع المجال في مكانها، فهي «ترسم» لك خطوط المجال. ' + (S.two ? 'مع مغناطيسين يجمع المجالان معاً في كل نقطة.' : ''); }
  });
})();
/* =========================================================================================
   EXPERIMENT 5 (book p40–41 + «هل تعلم» p43): نفاذ المجال المغناطيسي خلال المواد
   ========================================================================================= */
/* ---- 5.1 activity 1: through the human hand (fig 18) ---- */
(() => {
  const D = P92({ id: 'g9m_hand', page: 40, fig: 'الشكل 18',
    desc: 'نشاط (1): المجال المغناطيسي يمكنه النفاذ خلال جسم الإنسان. أدوات النشاط: مجموعة من مثبتات الورق مصنوعة من الفولاذ (مواد فيرومغناطيسية)، مغناطيس قوي. نضع الساق المغناطيسية على كف يدنا، ونضع راحة يدنا على مثبتات الورق، ثم نرفع كف يدنا.',
    tags: 'نشاط نفاذ المجال جسم الإنسان كف اليد مثبتات الورق',
    tools: ['مثبتات ورق من الفولاذ', 'مغناطيس قوي'],
    controls: [SEL('bar', 'بين المغناطيس والمشابك', [['hand', 'كف اليد (الكتاب)'], ['none', 'لا شيء (للمقارنة)']], 'hand'), BT('', [{ t: '↺ أعد المشابك', on: S => D.reset(S) }]), TG('lines', 'خطوط المجال خلال اليد', true, null, 'bfield')],
    steps: ['نضع الساق المغناطيسية على ظهر كف اليد (كما في الشكل 18).', 'نضع راحة اليد على مجموعة من مثبتات الورق: اسحب اليد إلى الأسفل حتى تلامس المشابك.', 'نرفع كف اليد إلى الأعلى: ماذا نلاحظ؟', 'نجد أن مجموعة كبيرة من المشابك انجذبت إلى راحة كف اليد. ما تفسير ذلك؟', 'قارن: اختر «لا شيء» وكرر — العدد متقارب، فاليد لم تمنع المجال.'],
    concl: ['المجال المغناطيسي يمكنه النفاذ خلال جسم الإنسان، لذلك تنجذب المشابك إلى راحة اليد رغم أن المغناطيس فوق الكف.'],
    laws: ['g9_flines'],
    setup(S) { S.hy = .1; S.hx = .5; D.reset(S); },
    reset(S) { const r = MAG9.rng(21); S.it = []; for (let i = 0; i < 34; i++) S.it.push({ u: (r() - .5) * 1.3, v: r(), a: r() * Math.PI, st: 'rest' }); S.cnt = 0; },
    geo(S) { const w = S.W, h = S.H, k = MAG9.sc(w, h), by = h * .82, cx = 90 + S.hx * (w - 180), top = 110, palm = top + S.hy * (by - 40 - top); const th = S.p.bar === 'hand' ? 26 * k + 8 : 0; const m = S._m || (S._m = MAG9.bar(0, 0, 0, 1, 1, 1.5)); Object.assign(m, { x: cx, y: palm - th - 16 * k - 2, L: Math.round(110 * k), T: Math.round(30 * k) }); return { w, h, k, by, cx, palm, th, m, pw: 120 * k + 20 }; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S), P = MAG9.prep([g.m]); const B = MAG9.Bp(P, g.cx, g.palm + 4), Bm = Math.hypot(B[0], B[1]); const cap = Math.round(clamp(Bm / 5e-5, 0, 7)); const cols = 5;
      let n = S.it.filter(it => it.st === 'att').length; S.it.forEach(it => { const hx = g.cx + it.u * g.pw * 1.2, hy = g.by - 6;
        if (it.st === 'rest') { it.x = hx; it.y = hy; if (g.palm > g.by - 46 && Math.abs(it.u) < .5 && n < cols * cap) { it.st = 'att'; it.slot = n++; } }
        else if (it.st === 'att') { const c = it.slot % cols, r = Math.floor(it.slot / cols); if (r >= cap) { it.st = 'fall'; it.vy = 0; return; } const tx = g.cx + (c - 2) * 15 * g.k, ty = g.palm + 12 + r * 19 * g.k; it.x += (tx - it.x) * Math.min(1, dt * 14); it.y += (ty - it.y) * Math.min(1, dt * 14); }
        else if (it.st === 'fall') { it.vy += 1400 * dt; it.y += it.vy * dt; if (it.y >= g.by - 6) { it.st = 'rest'; it.u = (Math.random() - .5) * 1.3; } } });
      S.cnt = S.it.filter(it => it.st === 'att').length; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { benchY: g.by });
      if (p.lines !== false) MF9.clip(ctx, [64, 40, w, g.by], () => MAG9.drawLines(ctx, MAG9.lines(MF9.cache(S, 'h').l, [g.m], [64, 40, w, h], { n: 14 }), { col: '#0e7490', alpha: .55 }));
      S.it.filter(it => it.st !== 'att').forEach(it => MAG9.clip(ctx, it.x, it.y, it.a, g.k * .9 + .1));
      S.it.filter(it => it.st === 'att').forEach(it => MAG9.clip(ctx, it.x, it.y, Math.PI / 2 + (it.slot % 3 - 1) * .15, g.k * .9 + .1));
      if (p.bar === 'hand') MAG9.raw(ctx, () => { const x0 = g.cx - g.pw * .8, x1 = g.cx + g.pw * .75, y0 = g.palm - g.th, y1 = g.palm, t = g.th;
        // forearm + sleeve (from the right), palm, four fingers (side view, palm down) and the thumb
        const sk = ctx.createLinearGradient(0, y0, 0, y1); sk.addColorStop(0, '#f8d3b0'); sk.addColorStop(.6, '#eab48a'); sk.addColorStop(1, '#c98a5e'); ctx.fillStyle = sk; ctx.strokeStyle = '#a0522d'; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(w + 10, y0 - t * .25); ctx.lineTo(x1, y0 - t * .1); ctx.quadraticCurveTo(g.cx, y0 - t * .25, x0 + t * 1.2, y0 + t * .05); ctx.quadraticCurveTo(x0 + t * .2, y0 + t * .1, x0 - t * .9, y0 + t * .45); ctx.quadraticCurveTo(x0 - t * 1.25, y0 + t * .75, x0 - t * .85, y1 - t * .02); ctx.quadraticCurveTo(x0 + t * .2, y1 + t * .02, x0 + t * 1.4, y1); ctx.lineTo(x1, y1 + t * .05); ctx.lineTo(w + 10, y1 + t * .25); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = 'rgba(160,82,45,.5)'; ctx.lineWidth = 1; for (let j = 1; j <= 3; j++) { const yy = y0 + t * (.25 + j * .18); ctx.beginPath(); ctx.moveTo(x0 - t * .75 + j * 2, yy); ctx.quadraticCurveTo(x0, yy + 1.5, x0 + t * 1.3, yy + 1); ctx.stroke(); }
        ctx.strokeStyle = 'rgba(160,82,45,.45)'; ctx.beginPath(); ctx.moveTo(x0 + t * .9, y0 + t * .1); ctx.lineTo(x0 + t * .9, y1 - 2); ctx.stroke();
        ctx.fillStyle = '#f2c29b'; ctx.strokeStyle = '#a0522d'; ctx.beginPath(); ctx.ellipse(x0 + t * 1.9, y1 + t * .08, t * .9, t * .28, -.15, 0, TAU); ctx.fill(); ctx.stroke();
        const sl = ctx.createLinearGradient(0, y0 - t * .5, 0, y1 + t * .5); sl.addColorStop(0, '#60a5fa'); sl.addColorStop(1, '#1d4ed8'); ctx.fillStyle = sl; rr(ctx, x1 + 40, y0 - t * .55, w - x1, t * 2.1, 8); ctx.fill(); });
      else MAG9.raw(ctx, () => { ctx.fillStyle = '#64748b'; ctx.fillRect(g.cx + g.m.L / 2, g.m.y - 3, 160, 6); });
      MAG9.drawMag(ctx, g.m);
      MF9.T(ctx, 'عدد المشابك المنجذبة: ' + S.cnt, MAG9.cx(w), g.by + 26, { s: 13, w: 900, c: '#fff', bg: S.cnt ? '#15803d' : '#475569' });
      if (p.bar === 'hand') MF9.T(ctx, 'المغناطيس فوق ظهر الكف', g.m.x, g.m.y - g.m.T / 2 - 14, { s: 11.5, w: 900, c: '#fff', bg: '#334155' });
      MAG9.banner(ctx, w, 'نشاط (1): المجال المغناطيسي يمكنه النفاذ خلال جسم الإنسان', '#0e7490');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'hand', x: g.cx, y: g.palm - 20, w: g.pw * 1.6, h: 80, axis: 'xy', keep: true, tip: 'اسحب اليد إلى المشابك ثم ارفعها', idle: 'ضع يدك على المشابك ✋', down: () => { S._a = S.hx; S._b = S.hy; }, drag: (S2, d) => { S.hx = clamp(S._a + (d.x - d.sx) / (g.w - 180), 0, 1); S.hy = clamp(S._b + (d.y - d.sy) / (g.by - 40 - 110), 0, 1); } }]; },
    field(S, x, y) { if (!S.W) return null; const m = D.geo(S).m; return MAG9.inside(m, x, y) ? null : MAG9.B([m], x, y); },
    readings(S) { return [rd('بين المغناطيس والمشابك', S.p.bar === 'hand' ? 'كف اليد' : 'لا شيء'), rd('مشابك منجذبة', String(S.cnt))]; },
    explain(S) { return S.cnt ? 'انجذبت <b>' + S.cnt + '</b> مشابك إلى راحة الكف رغم أن المغناطيس فوق ظهرها: <b>المجال المغناطيسي يمكنه النفاذ خلال جسم الإنسان</b>. (لاحظ خطوط المجال تمر خلال اليد كأنها غير موجودة.)' : 'ضع راحة يدك على المشابك ثم ارفعها.'; }
  });
})();
/* ---- 5.2 activity 2 (a): through cardboard / wood / glass (fig 19-a) ---- */
(() => {
  const MT = [['card', 'ورق مقوى (كارتون)', '#c69c6d'], ['wood', 'قطعة خشب', '#a16207'], ['glass', 'زجاج', 'rgba(186,230,253,.55)']];
  const D = P92({ id: 'g9m_card', page: 41, fig: 'الشكل 19-a',
    desc: 'نشاط (2) الجزء (a): المجال المغناطيسي يمكنه النفاذ من خلال مواد مختلفة. نمسك الساق المغناطيسية بوضع شاقولي، ونضع بعض مسامير الحديد على قطعة ورق مقوى فوق القطب العلوي، ثم نحرك الساق تحت الورقة بمسار دائري أو بخط مستقيم.',
    tags: 'نشاط 2 ورق مقوى كارتون خشب زجاج مسامير الحديد تتبع حركة القطب',
    tools: ['ساق مغناطيسية', 'قطعة من ورق المقوى أو الخشب أو الزجاج', 'مسامير حديد'],
    controls: [SEL('mt', 'القطعة', MT.map(q => [q[0], q[1]]), 'card'), BT('', [{ t: '⭕ حرّك بمسار دائري', on: S => { S.auto = 'c'; } }, { t: '↔ حرّك بخط مستقيم', on: S => { S.auto = 'l'; } }, { t: '✋ توقف', on: S => { S.auto = null; } }]), TG('xray', 'أظهر المغناطيس تحت الورقة', true, null, 'eye'), TG('path', 'مسار حركة القطب', true, null, 'velocity')],
    steps: ['نمسك الساق المغناطيسية بوضع شاقولي باليد (تحت الورقة).', 'نضع بعض مسامير الحديد بلطف على قطعة ورق المقوى.', 'نضع الورقة فوق القطب العلوي للمغناطيس.', 'نحرك الساق المغناطيسية تحت الورقة بمسار دائري أو بخط مستقيم (اسحبها أو استعمل الأزرار). ماذا نلاحظ؟', 'نجد أن المسامير تنجذب نحو القطب وتتحرك متبعة المسار نفسه لحركة القطب. جرّب الخشب والزجاج.'],
    concl: ['المسامير تنجذب نحو القطب المغناطيسي للساق وتتحرك متبعة المسار نفسه لحركة القطب.', 'المجال المغناطيسي يمكنه النفاذ خلال مواد مختلفة مثل ورق المقوى السميك والخشب والزجاج.'],
    laws: ['g9_flines'],
    setup(S) { S.pX = 0; S.pZ = 0; S.auto = null; S.ph = 0; S.trail = []; const r = MAG9.rng(31); S.N = Array.from({ length: 9 }, () => ({ X: (r() - .5) * .3, Z: (r() - .5) * .3, a: r() * Math.PI, vx: 0, vz: 0, up: 0 })); },
    geo(S) { const w = S.W, h = S.H, k = MAG9.sc(w, h), cx = MAG9.cx(w), cy = h * .46, W2 = Math.min(w - 150, 560 * k + 60) / 2, H2 = 120 * k + 30; return { w, h, k, cx, cy, W2, H2, P: (X, Z) => [cx + X * W2 + Z * W2 * .18, cy + Z * H2] }; },
    update(S, dt) { if (!S.W) return; if (S.auto) { S.ph += dt * .9; if (S.auto === 'c') { S.pX = .4 * Math.sin(S.ph); S.pZ = .4 * (1 - Math.cos(S.ph)) - .2; } else { S.pX = .6 * Math.sin(S.ph); S.pZ = 0; } }
      S.trail.push([S.pX, S.pZ]); if (S.trail.length > 160) S.trail.shift();
      S.N.forEach((n, i) => { const dx = S.pX - n.X, dz = S.pZ - n.Z, d = Math.hypot(dx, dz) + .02; const F = .06 / (d * d + .015); let fx = F * dx / d, fz = F * dz / d;
        S.N.forEach((o, j) => { if (j === i) return; const ex = n.X - o.X, ez = n.Z - o.Z, e = Math.hypot(ex, ez) + .001; if (e < .07) { fx += (.07 - e) * 30 * ex / e; fz += (.07 - e) * 30 * ez / e; } });
        const fm = Math.hypot(fx, fz); if (fm < .25 && Math.hypot(n.vx, n.vz) < .01) { n.vx = 0; n.vz = 0; } else { n.vx += (fx * 6 - n.vx * 7) * dt; n.vz += (fz * 6 - n.vz * 7) * dt; } n.X = clamp(n.X + n.vx * dt, -.95, .95); n.Z = clamp(n.Z + n.vz * dt, -.9, .9); n.up += ((d < .12 ? 1 : 0) - n.up) * Math.min(1, dt * 6); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, mt = MT.find(q => q[0] === p.mt); K.bg(ctx, w, h, { benchY: h * .9 });
      const pole = g.P(S.pX, S.pZ); const mL = 170 * g.k + 20, mT = 34 * g.k + 6;
      // magnet below (vertical, N up) + hand
      const drawMag = (alpha) => MAG9.raw(ctx, () => { ctx.globalAlpha = alpha; const m = MAG9.bar(pole[0], pole[1] + mL / 2 + 10, -Math.PI / 2, mL, mT, 1); MAG9.drawMag(ctx, m, { shadow: false }); ctx.globalAlpha = 1; });
      drawMag(1); MAG9.fist(ctx, pole[0] + 4, pole[1] + mL * .8, -Math.PI / 2, g.k * .9 + .3);
      // sheet (parallelogram)
      const c = [g.P(-1, -1), g.P(1, -1), g.P(1, 1), g.P(-1, 1)]; MAG9.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 6; ctx.fillStyle = mt[2]; MAG9.pathPoly(ctx, c); ctx.fill(); ctx.restore();
        if (p.mt === 'wood') { ctx.strokeStyle = 'rgba(120,53,15,.4)'; ctx.lineWidth = 1; for (let k = -8; k <= 8; k++) { const a = g.P(-1, k / 9), b = g.P(1, k / 9 + .05); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.bezierCurveTo(a[0] + 100, a[1] - 4, b[0] - 100, b[1] + 4, b[0], b[1]); ctx.stroke(); } }
        if (p.mt === 'card') { ctx.strokeStyle = 'rgba(120,80,40,.25)'; ctx.lineWidth = 2; const a = g.P(-1, .7), b = g.P(1, .7); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
        ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 2; MAG9.pathPoly(ctx, c); ctx.stroke(); ctx.fillStyle = shade('#78716c', 0); const e1 = g.P(-1, 1), e2 = g.P(1, 1); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(e1[0], e1[1], e2[0] - e1[0], 5); });
      if (p.xray !== false) { MAG9.raw(ctx, () => { ctx.save(); MAG9.pathPoly(ctx, c); ctx.clip(); ctx.globalAlpha = .35; ctx.fillStyle = MAG9.COL.N; ctx.beginPath(); ctx.ellipse(pole[0], pole[1], mT / 2 + 3, mT / 4 + 2, 0, 0, TAU); ctx.fill(); ctx.restore(); }); MF9.T(ctx, 'N', pole[0], pole[1], { s: 11, w: 900, c: '#fff' }); }
      if (p.path !== false && S.trail.length > 2) MAG9.raw(ctx, () => { ctx.strokeStyle = 'rgba(234,88,12,.7)'; ctx.lineWidth = 2.5; ctx.setLineDash([6, 5]); ctx.beginPath(); S.trail.forEach((q, i) => { const P = g.P(q[0], q[1]); i ? ctx.lineTo(P[0], P[1]) : ctx.moveTo(P[0], P[1]); }); ctx.stroke(); ctx.setLineDash([]); });
      // hands holding the sheet edges
      const hl = g.P(-1.02, .1), hr = g.P(1.02, -.1); C2.hand(ctx, hl[0] + 8, hl[1], 1, 1.2, { sleeve: '#16a34a' }); C2.hand(ctx, hr[0] - 8, hr[1], -1, 1.2, { sleeve: '#16a34a' });
      // nails
      S.N.slice().sort((a, b) => a.Z - b.Z).forEach(n => { const P = g.P(n.X, n.Z); const L = 30 * g.k + 6; if (n.up > .5) { MAG9.raw(ctx, () => { ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(P[0], P[1], 5, 2, 0, 0, TAU); ctx.fill(); }); MAG9.nail(ctx, P[0] + (n.X - S.pX) * 30, P[1] - L / 2 * n.up, Math.PI / 2 + (n.X - S.pX) * 2 + Math.PI, L * (0.6 + .4 * n.up)); } else MAG9.nail(ctx, P[0], P[1], n.a, L); });
      MF9.T(ctx, mt[1] + ': المجال ينفذ خلالها ✓', MAG9.cx(w), g.P(0, 1)[1] + 26, { s: 12.5, w: 900, c: '#fff', bg: '#0e7490' });
      MAG9.banner(ctx, w, 'نشاط (2) الجزء (a): المسامير تتبع حركة القطب تحت الورقة', '#0e7490');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), pole = g.P(S.pX, S.pZ); return [{ id: 'mag', x: pole[0], y: pole[1] + 60, w: 90, h: 170, axis: 'xy', keep: true, tip: 'اسحب المغناطيس تحت الورقة', idle: 'حرّك المغناطيس ✋', down: () => { S.auto = null; S._a = S.pX; S._b = S.pZ; }, drag: (S2, d) => { S.pZ = clamp(S._b + (d.y - d.sy) / g.H2, -.85, .85); S.pX = clamp(S._a + (d.x - d.sx - (S.pZ - S._b) * g.W2 * .18) / g.W2, -.9, .9); } }]; },
    readings(S) { const near = S.N.filter(n => Math.hypot(n.X - S.pX, n.Z - S.pZ) < .2).length; return [rd('القطعة', MT.find(q => q[0] === S.p.mt)[1]), rd('مسامير تتبع القطب', near + ' من ' + S.N.length)]; },
    explain(S) { const mt = MT.find(q => q[0] === S.p.mt)[1]; return 'المغناطيس تحت ' + mt + '، ومع ذلك تنجذب المسامير نحو قطبه وتتبع مساره: <b>المجال المغناطيسي ينفذ خلال ' + mt + '</b>. لاحظ أن المسامير القريبة جداً من القطب تقف منتصبة لأنها تصطف مع خطوط المجال.'; }
  });
})();
/* ---- 5.3 activity 2 (b): through glass and water (fig 19-b) ---- */
(() => {
  const D = P92({ id: 'g9m_water', page: 41, fig: 'الشكل 19-b',
    desc: 'نشاط (2) الجزء (b): نضع مجموعة مسامير الحديد داخل أسطوانة زجاجية، ثم نصب كمية مناسبة من الماء. نقرب أحد قطبي الساق المغناطيسية من جدار الأسطوانة، ثم نحرك القطب حول الأسطوانة.',
    tags: 'أسطوانة زجاجية ماء مسامير الحديد تنجذب تتبع القطب',
    tools: ['ساق مغناطيسية', 'أسطوانة من الزجاج', 'ماء', 'مسامير حديد'],
    controls: [BT('', [{ t: '💧 صب الماء', on: S => { S.fill = 1; } }, { t: '⭕ حرّك القطب حول الأسطوانة', on: S => { S.auto = !S.auto; } }]), TG('top', 'منظر علوي', true, null, 'eye'), TG('lines', 'خطوط المجال', false, null, 'bfield')],
    steps: ['نضع مسامير الحديد داخل الأسطوانة الزجاجية، ثم نصب كمية مناسبة من الماء (اضغط «صب الماء»).', 'نقرب أحد قطبي الساق المغناطيسية من جدار الأسطوانة (اسحب المغناطيس قرب الجدار). ماذا نلاحظ؟', 'تنجذب المسامير نحو قطب المغناطيس القريب منها.', 'نحرك القطب حول الأسطوانة (اسحبه يميناً ويساراً أو اضغط الزر): تتحرك المسامير متبعة المسار نفسه.'],
    concl: ['المسامير داخل الماء تنجذب نحو قطب المغناطيس خارج الأسطوانة وتتبع حركته.', 'المجال المغناطيسي يمكنه النفاذ خلال الزجاج والماء.'],
    laws: ['g9_flines'],
    setup(S) { S.th = .3; S.dist = .35; S.fill = 0; S.lvl = 0; S.auto = false; const r = MAG9.rng(41); S.N = Array.from({ length: 7 }, () => ({ a: r() * TAU, r: .2 + r() * .4, va: 0, vr: 0, rot: r() * TAU })); },
    geo(S) { const w = S.W, h = S.H, k = MAG9.sc(w, h), cx = MAG9.cx(w) - (S.p.top !== false && w > 600 ? 70 : 0), R = 120 * k + 20, ry = R * .3, yb = h * .78, Hc = 300 * k + 40; return { w, h, k, cx, R, ry, yb, Hc }; },
    update(S, dt) { if (!S.W) return; S.lvl += ((S.fill ? 1 : 0) - S.lvl) * Math.min(1, dt * 1.2); if (S.auto) S.th += dt * .8; const near = 1 - clamp(S.dist, 0, 1);
      S.N.forEach(n => { const tx = Math.cos(S.th) * .82, tz = Math.sin(S.th) * .82; const x = Math.cos(n.a) * n.r, z = Math.sin(n.a) * n.r; const dx = tx - x, dz = tz - z, d = Math.hypot(dx, dz) + .05; const F = near * near * .35 / (d * d); const drag = S.lvl > .5 ? 4 : 1.5;
        let fx = F * dx / d, fz = F * dz / d; if (F < .25) { fx = 0; fz = 0; } n.vx = ((n.vx || 0) + (fx - (n.vx || 0) * drag * 3) * dt); n.vz = ((n.vz || 0) + (fz - (n.vz || 0) * drag * 3) * dt); let nx = x + n.vx * dt, nz = z + n.vz * dt; const rr2 = Math.hypot(nx, nz); if (rr2 > .86) { nx *= .86 / rr2; nz *= .86 / rr2; } n.a = Math.atan2(nz, nx); n.r = Math.hypot(nx, nz); n.rot += (Math.atan2(dz, dx) - n.rot) * Math.min(1, dt * 2 * near); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { benchY: g.yb + g.ry * .6 }); const cx = g.cx;
      const mx = cx + Math.cos(S.th) * (g.R + 20 + S.dist * 160 * g.k), mz = Math.sin(S.th); const mBack = mz < 0;
      const mag = () => { const yy = g.yb - 26; const m = MAG9.bar(mx + (Math.cos(S.th) >= 0 ? 1 : -1) * 70 * g.k, yy + mz * g.ry * .9, Math.cos(S.th) >= 0 ? Math.PI : 0, 140 * g.k + 20, 30 * g.k + 6, 1); MAG9.drawMag(ctx, m); MAG9.fist(ctx, m.x + (Math.cos(S.th) >= 0 ? 1 : -1) * m.L * .38, m.y, Math.cos(S.th) >= 0 ? 0 : Math.PI, g.k * .8 + .25); };
      if (mBack) mag();
      MAG9.raw(ctx, () => { const top = g.yb - g.Hc; ctx.fillStyle = 'rgba(224,242,254,.35)'; ctx.beginPath(); ctx.ellipse(cx, g.yb, g.R, g.ry, 0, 0, TAU); ctx.fill();
        if (S.lvl > .02) { const wl = g.yb - g.Hc * .7 * S.lvl; const wg = ctx.createLinearGradient(0, wl, 0, g.yb); wg.addColorStop(0, 'rgba(56,189,248,.35)'); wg.addColorStop(1, 'rgba(14,116,144,.45)'); ctx.fillStyle = wg; ctx.beginPath(); ctx.ellipse(cx, g.yb, g.R - 3, g.ry - 1, 0, 0, Math.PI); ctx.lineTo(cx - g.R + 3, wl); ctx.ellipse(cx, wl, g.R - 3, g.ry - 1, 0, Math.PI, 0, true); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(186,230,253,.55)'; ctx.beginPath(); ctx.ellipse(cx, wl, g.R - 3, g.ry - 1, 0, 0, TAU); ctx.fill(); } });
      // nails on the bottom
      S.N.slice().sort((a, b) => Math.sin(a.a) * a.r - Math.sin(b.a) * b.r).forEach(n => { const x = cx + Math.cos(n.a) * n.r * (g.R - 8), y = g.yb + Math.sin(n.a) * n.r * (g.ry - 3) - 4; MAG9.nail(ctx, x, y, n.rot * .3, 30 * g.k + 6); });
      MAG9.raw(ctx, () => { const top = g.yb - g.Hc; ctx.strokeStyle = 'rgba(14,116,144,.75)'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.ellipse(cx, top, g.R, g.ry, 0, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx - g.R, top); ctx.lineTo(cx - g.R, g.yb); ctx.ellipse(cx, g.yb, g.R, g.ry, 0, Math.PI, 0, true); ctx.lineTo(cx + g.R, top); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(cx - g.R * .75, top + 10, 8, g.Hc - 30); });
      if (!mBack) mag();
      if (S.lvl > .5) MF9.T(ctx, 'ماء', cx + g.R * .5, g.yb - g.Hc * .35, { s: 12, w: 900, c: '#0e7490' }); MF9.T(ctx, 'أسطوانة من الزجاج', cx, g.yb - g.Hc - g.ry - 14, { s: 12, w: 900, c: '#0e7490' });
      if (p.top !== false) { const ix = w - 92, iy = 150, ir = 58; MAG9.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#0e7490'; ctx.lineWidth = 2; rr(ctx, ix - 76, iy - 82, 152, 172, 10); ctx.fill(); ctx.stroke(); ctx.fillStyle = S.lvl > .5 ? 'rgba(56,189,248,.3)' : 'rgba(224,242,254,.5)'; ctx.beginPath(); ctx.arc(ix, iy, ir, 0, TAU); ctx.fill(); ctx.strokeStyle = '#0e7490'; ctx.stroke();
        S.N.forEach(n => { ctx.fillStyle = '#475569'; ctx.save(); ctx.translate(ix + Math.cos(n.a) * n.r * ir, iy + Math.sin(n.a) * n.r * ir); ctx.rotate(n.rot); ctx.fillRect(-7, -1.5, 14, 3); ctx.restore(); });
        const d = ir + 10 + S.dist * 30; ctx.save(); ctx.translate(ix + Math.cos(S.th) * d, iy + Math.sin(S.th) * d); ctx.rotate(S.th); ctx.fillStyle = MAG9.COL.N; ctx.fillRect(0, -5, 14, 10); ctx.fillStyle = MAG9.COL.S; ctx.fillRect(14, -5, 14, 10); ctx.restore(); });
        MF9.T(ctx, 'منظر من الأعلى', ix, iy + 76, { s: 11, w: 900, c: '#0e7490' }); }
      MF9.T(ctx, !S.fill ? 'اضغط «صب الماء» ثم قرّب المغناطيس' : S.dist < .5 ? 'المسامير تنجذب نحو القطب خلال الزجاج والماء ✓' : 'قرّب القطب من جدار الأسطوانة', MAG9.cx(w), 56, { s: 12.5, w: 900, c: '#fff', bg: S.dist < .5 && S.fill ? '#15803d' : '#475569' });
      MAG9.banner(ctx, w, 'نشاط (2) الجزء (b): خلال الزجاج والماء', '#0e7490');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), mx = g.cx + Math.cos(S.th) * (g.R + 20 + S.dist * 160 * g.k); return [{ id: 'mag', x: mx + (Math.cos(S.th) >= 0 ? 1 : -1) * 60 * g.k, y: g.yb - 26 + Math.sin(S.th) * g.ry * .9, w: 150, h: 60, axis: 'xy', keep: true, tip: 'اسحب المغناطيس: أفقياً حول الأسطوانة، رأسياً للتقريب والإبعاد', idle: 'قرّب المغناطيس ✋', down: () => { S.auto = false; S._a = S.th; S._b = S.dist; S._x = mx; },
      drag: (S2, d) => { const x = S._x + d.x - d.sx - g.cx; const c = clamp(x / (g.R + 40), -1, 1); S.th = (Math.sin(S._a) >= 0 ? 1 : -1) * Math.acos(c); S.dist = clamp(S._b + (Math.abs(x) - Math.abs(S._x - g.cx)) / (160 * g.k) * 0 + (d.y - d.sy) / 120, 0, 1); } }]; },
    readings(S) { return [rd('الماء', S.fill ? 'في الأسطوانة' : 'لم نصبه بعد'), rd('بعد القطب عن الجدار', S.dist < .2 ? 'ملاصق تقريباً' : S.dist < .6 ? 'قريب' : 'بعيد')]; },
    explain(S) { return 'المغناطيس خارج الأسطوانة، وبينه وبين المسامير <b>زجاج وماء</b>، ومع ذلك تنجذب المسامير نحو قطبه وتتبع حركته حول الأسطوانة: <b>المجال المغناطيسي ينفذ خلال الزجاج والماء</b>. الماء يبطئ حركة المسامير فقط (مقاومة الماء) ولا يمنع المجال.<br><small>اسحب المغناطيس أفقياً لتدويره حول الأسطوانة، ورأسياً لتقريبه أو إبعاده.</small>'; }
  });
})();
/* ---- 5.4 «هل تعلم» p43 + ➕: magnetic shielding — the floating paper clip ---- */
(() => {
  const SH = [['none', 'لا شيء', null, 0], ['paper', 'ورقة', '#f8fafc', 0], ['card', 'كارتون', '#c69c6d', 0], ['glass', 'زجاج', 'rgba(186,230,253,.7)', 0], ['wood', 'خشب', '#a16207', 0], ['al', 'ألمنيوم', '#d1d5db', 0], ['cu', 'نحاس', '#c2410c', 0], ['hand', 'يد', '#f2c29b', 0], ['fe', 'صفيحة حديد', '#52525b', 1]];
  const D = P92({ id: 'g9m_shield', page: 43, fig: 'هل تعلم ص 43 + ➕',
    desc: '«هل تعلم» (ص 43): الحافظة المغناطيسية مادة فيرومغناطيسية تستعمل لحماية الأجهزة من التأثيرات المغناطيسية الخارجية (كالساعات). ➕ تجربة المشبك الطافي المشهورة: مشبك مربوط بخيط يطفو تحت مغناطيس؛ ندخل بينهما صفائح من مواد مختلفة.',
    tags: 'حافظة مغناطيسية حجب المجال مشبك طافي صفيحة حديد ألمنيوم زجاج خشب',
    tools: ['مغناطيس', 'مشبك ورق', 'خيط', 'صفائح من مواد مختلفة'],
    controls: [SEL('sh', 'الصفيحة بين المغناطيس والمشبك', SH.map(q => [q[0], q[1]]), 'none'), TG('lines', 'خطوط المجال', true, null, 'bfield')],
    steps: ['المشبك مربوط بخيط مثبت في القاعدة، ويطفو في الهواء لأن المغناطيس يجذبه.', 'اختر صفيحة (ورقة، زجاج، خشب، ألمنيوم، نحاس، يد…) لتدخل بين المغناطيس والمشبك: يبقى المشبك طافياً.', 'اختر «صفيحة حديد»: يسقط المشبك! لأن الحديد يجمع خطوط المجال داخله ويحجبها.', 'هذه فكرة «الحافظة المغناطيسية» التي تحمي الساعات والأجهزة.'],
    concl: ['المجال المغناطيسي ينفذ خلال الورق والزجاج والخشب والألمنيوم والنحاس وجسم الإنسان.', 'المواد الفيرومغناطيسية (كالحديد) تجمع خطوط المجال داخلها فتحجبه عمّا خلفها: لذلك تستعمل حافظةً مغناطيسية لحماية الأجهزة.'],
    laws: ['g9_mattypes', 'g9_flines'],
    setup(S) { S.cy = 0; S.vy = 0; S.sx = 0; },
    geo(S) { const w = S.W, h = S.H, k = MAG9.sc(w, h), cx = MAG9.cx(w), base = h * .84, mtop = 70, mL = 150 * k + 20, poleY = mtop + mL, rest = base - 40, float = poleY + 80 * k + 30; return { w, h, k, cx, base, mtop, mL, poleY, rest, float, shY: (poleY + float) / 2 + 4 }; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S), sh = SH.find(q => q[0] === S.p.sh); S.sx += ((sh[0] === 'none' ? 0 : 1) - S.sx) * Math.min(1, dt * 4); const block = sh[3] && S.sx > .7; const tgt = block ? g.rest : g.float; const y = g.float + S.cy;
      if (block) { S.vy += 1500 * dt; S.cy += S.vy * dt; if (g.float + S.cy >= g.rest) { S.cy = g.rest - g.float; S.vy = 0; } } else { S.vy += (-(S.cy) * 60 - S.vy * 8) * dt; S.cy += S.vy * dt; } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, sh = SH.find(q => q[0] === p.sh), block = sh[3] && S.sx > .7; K.bg(ctx, w, h, { benchY: g.base });
      Q24.stand(ctx, g.cx + 120 * g.k + 40, g.base, g.mtop - 20, 160); MAG9.raw(ctx, () => { ctx.fillStyle = '#b45309'; ctx.fillRect(g.cx - 20, g.mtop - 24, 160 * g.k + 80, 8); ctx.fillStyle = '#64748b'; rr(ctx, g.cx - 24, g.mtop - 30, 48, 22, 4); ctx.fill(); });
      const m = MAG9.bar(g.cx, g.mtop + g.mL / 2, Math.PI / 2, g.mL, 40 * g.k + 8, 1.4); MAG9.drawMag(ctx, m);
      const cyy = g.float + S.cy, sw = 230 * g.k + 40, sx = g.cx - sw / 2 + (1 - S.sx) * (w * .6);
      // field lines (stylised): straight fan from the N pole to the clip, or bent into the iron sheet
      if (p.lines !== false) MAG9.raw(ctx, () => { ctx.strokeStyle = 'rgba(14,116,144,.75)'; ctx.lineWidth = 1.6; for (let k = -3; k <= 3; k++) { const x0 = g.cx + k * 5, y0 = g.poleY + 2;
        if (block) { const ex = g.cx + k * (sw / 7) + Math.sign(k || 1) * 10; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo(x0 + k * 4, g.shY - 10, g.cx + k * 18, g.shY - 2); ctx.lineTo(ex, g.shY - 2); ctx.quadraticCurveTo(ex + Math.sign(k || 1) * 40, g.shY - 20, ex + Math.sign(k || 1) * 50, g.mtop + 60); ctx.stroke(); MAG9.arrowHead(ctx, (g.cx + k * 18 + ex) / 2, g.shY - 2, k >= 0 ? 0 : Math.PI, 5, 'rgba(14,116,144,.9)'); }
        else { ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo(x0 + k * 10, (y0 + cyy) / 2, g.cx + k * 3, cyy - 12); ctx.stroke(); MAG9.arrowHead(ctx, x0 + k * 5, (y0 + cyy) / 2, Math.PI / 2, 5, 'rgba(14,116,144,.9)'); } } });
      // thread + clip
      const anchor = [g.cx, g.base - 4]; MAG9.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(anchor[0] - 10, anchor[1] - 4, 20, 6); ctx.strokeStyle = '#78716c'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(anchor[0], anchor[1]); if (block) ctx.quadraticCurveTo(anchor[0] + 30, anchor[1] - 20, g.cx, cyy + 10); else ctx.lineTo(g.cx, cyy + 10); ctx.stroke(); });
      MAG9.clip(ctx, g.cx, cyy, Math.PI / 2 + (block ? 1.2 : 0), 1.3);
      // sheet
      if (sh[2]) MAG9.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 6; ctx.fillStyle = sh[2]; ctx.beginPath(); ctx.moveTo(sx, g.shY - 6); ctx.lineTo(sx + sw, g.shY - 6); ctx.lineTo(sx + sw + 26, g.shY - 14); ctx.lineTo(sx + 26, g.shY - 14); ctx.closePath(); ctx.fill(); ctx.fillRect(sx, g.shY - 6, sw, 7); ctx.restore(); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.strokeRect(sx, g.shY - 6, sw, 7); });
      if (sh[2]) MF9.T(ctx, sh[1], sx + sw + 50, g.shY - 6, { s: 12, w: 900, c: '#fff', bg: '#334155' });
      MF9.T(ctx, block ? 'الحديد حجب المجال فسقط المشبك! (حافظة مغناطيسية)' : sh[0] === 'none' ? 'المشبك يطفو: المغناطيس يجذبه عبر الهواء' : 'المجال ينفذ خلال ' + sh[1] + ' فيبقى المشبك طافياً ✓', MAG9.cx(w), g.base + 26, { s: 12.5, w: 900, c: '#fff', bg: block ? '#b91c1c' : '#15803d' });
      MAG9.banner(ctx, w, '«هل تعلم» ص 43 + ➕ المشبك الطافي: الحافظة المغناطيسية', '#7c3aed');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'sheet', x: g.cx + 160, y: g.shY - 8, w: 120, h: 40, tip: 'اضغط لتجرّب الصفيحة التالية', idle: 'جرّب صفيحة ✋', click: () => { const i = SH.findIndex(q => q[0] === S.p.sh); setParam(S, 'sh', SH[(i + 1) % SH.length][0]); S.sx = 0; S.cy = 0; S.vy = 0; } }]; },
    readings(S) { const sh = SH.find(q => q[0] === S.p.sh); return [rd('الصفيحة', sh[1]), rd('المشبك', sh[3] && S.sx > .7 ? 'سقط (حُجب المجال)' : 'طافٍ (المجال ينفذ)')]; },
    explain(S) { const sh = SH.find(q => q[0] === S.p.sh); return sh[3] ? 'صفيحة الحديد مادة <b>فيرومغناطيسية</b>: تجمع خطوط المجال داخلها وتوجهها إلى جانبيها، فيضعف المجال تحتها كثيراً ويسقط المشبك. هذه هي <b>الحافظة المغناطيسية</b> (هل تعلم ص 43) التي تحمي الساعات والأجهزة من المجالات الخارجية.' : 'المجال المغناطيسي <b>ينفذ</b> خلال ' + sh[1] + '، لذلك يبقى المشبك منجذباً وطافياً. المواد غير الفيرومغناطيسية لا تحجب المجال.'; }
  });
})();
/* =========================================================================================
   EXPERIMENT 6 (book 4-2, p42–43): تمغنط المواد — الدلك، الحث بالتقريب، التيار المستمر، فقدان المغناطيسية
   ========================================================================================= */
const DOM9 = {
  rand: (n, seed) => { const r = MAG9.rng(seed || 5); return Array.from({ length: n }, () => ({ a: r() * TAU })); },
  M: cells => cells.reduce((s, c) => s + Math.cos(c.a), 0) / cells.length,   // magnetisation along +x (−1…1)
  /* draw a rod (nail / needle) with domains inside + induced pole letters */
  rod(ctx, x, y, L, T, cells, nx, o = {}) { MAG9.raw(ctx, () => { const gg = ctx.createLinearGradient(0, y - T / 2, 0, y + T / 2); gg.addColorStop(0, '#e2e8f0'); gg.addColorStop(.45, o.col || '#94a3b8'); gg.addColorStop(1, '#334155'); ctx.fillStyle = gg;
    if (o.nail) { ctx.beginPath(); ctx.moveTo(x - L / 2, y - T / 2); ctx.lineTo(x + L / 2 - T, y - T / 2); ctx.lineTo(x + L / 2, y); ctx.lineTo(x + L / 2 - T, y + T / 2); ctx.lineTo(x - L / 2, y + T / 2); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#334155'; rr(ctx, x - L / 2 - T * .5, y - T * 1.1, T * .55, T * 2.2, 2); ctx.fill(); }
    else { ctx.beginPath(); ctx.moveTo(x - L / 2, y); ctx.lineTo(x - L / 2 + T * 2, y - T / 2); ctx.lineTo(x + L / 2 - T * 2, y - T / 2); ctx.lineTo(x + L / 2, y); ctx.lineTo(x + L / 2 - T * 2, y + T / 2); ctx.lineTo(x - L / 2 + T * 2, y + T / 2); ctx.closePath(); ctx.fill(); }
    ctx.strokeStyle = 'rgba(15,23,42,.4)'; ctx.lineWidth = 1; ctx.stroke(); });
    if (o.dom !== false && cells) { const ny = cells.length / nx; MAG9.domains(ctx, x - L / 2 + T * (o.nail ? .2 : 1.6), y - T / 2 + 1, L - T * (o.nail ? 1.4 : 3.2), T - 2, cells, nx, ny, { cells: false }); }
    const M = DOM9.M(cells || []); if (o.poles !== false && Math.abs(M) > .3) { const l = M > 0 ? 'S' : 'N', r = M > 0 ? 'N' : 'S'; MF9.T(ctx, l, x - L / 2 - 12, y - T, { s: 13, w: 900, c: l === 'N' ? '#dc2626' : '#2563eb' }); MF9.T(ctx, r, x + L / 2 + 12, y - T, { s: 13, w: 900, c: r === 'N' ? '#dc2626' : '#2563eb' }); } },
  bar(x, y, L, T, M, k = .9) { return MAG9.bar(x, y, M >= 0 ? 0 : Math.PI, L, T, Math.abs(M) * k); }
};
/* ---- 6.1 magnetising by stroking (fig 20) ---- */
(() => {
  const NX = 18;
  const D = P92({ id: 'g9m_stroke', page: 42, fig: 'الشكل 20',
    desc: 'طريقة التمغنط بالدلك: يتم مغنطة قطعة فولاذ (مثلاً إبرة الخياطة) بدلكها بأحد قطبي مغناطيس، ويجب تحريك القطب فوق الإبرة باتجاه واحد فقط وبحركة بطيئة وتكرر مرات عدة. القطب المتولد في نهاية جهة الدلك يكون دائماً مخالفاً للقطب الدالك.',
    tags: 'التمغنط بالدلك إبرة فولاذ اتجاه واحد القطب المتولد مخالف للقطب الدالك',
    tools: ['ساق مغناطيسية', 'إبرة خياطة من الفولاذ', 'بوصلة صغيرة'],
    controls: [SEL('pole', 'القطب الدالك', [['N', 'القطب الشمالي N (الكتاب)'], ['S', 'القطب الجنوبي S']], 'N'), BT('', [{ t: '🤖 ادلك 5 مرات تلقائياً', on: S => { S.auto = 5; S.ap = 0; } }, { t: '↺ إبرة جديدة', on: S => D.reset(S) }]), TG('dom', 'المغانط الصغيرة داخل الإبرة', true, null, 'atom'), TG('arr', 'أسهم الكتاب (اتجاه حركة القطب)', true, null, 'velocity'), TG('test', 'بوصلة لاختبار الإبرة', true, null, 'compass')],
    steps: ['امسك المغناطيس مائلاً بحيث يلامس قطبه الشمالي N الإبرة عند طرفها الأيسر (الشكل 20).', 'اسحبه ببطء على طول الإبرة نحو اليمين (باتجاه واحد فقط).', 'عند النهاية ارفعه بعيداً عن الإبرة وأعده إلى البداية من الأعلى (لا تلامس الإبرة في طريق العودة).', 'كرر عدة مرات (أو اضغط «ادلك 5 مرات»): لاحظ كيف تترتب المغانط الصغيرة داخل الإبرة.', 'لاحظ: الطرف الذي ينتهي عنده الدلك (الأيمن) صار قطباً جنوبياً S مخالفاً للقطب الدالك N. جرّب الدلك ذهاباً وإياباً: ماذا يحدث؟'],
    concl: ['تصير إبرة الفولاذ مغناطيساً بعد دلكها بأحد قطبي مغناطيس باتجاه واحد مرات عدة.', 'القطب المتولد في نهاية جهة الدلك يكون دائماً مخالفاً في النوع للقطب الدالك.', 'الدلك ذهاباً وإياباً يُفسد الترتيب، لذلك يجب أن يكون الدلك باتجاه واحد فقط.'],
    laws: ['g9_magz'],
    setup(S) { D.reset(S); S.mu = { u: .1, v: .2 }; S.nd = { a: -Math.PI / 2, w: 0 }; S.auto = 0; },
    reset(S) { S.cells = DOM9.rand(NX * 2, 77); S.n = 0; S.bad = 0; S.inC = 0; S.dir = 0; },
    geo(S) { const w = S.W, h = S.H, k = MAG9.sc(w, h), ny = h * .6, L = Math.min(w - 200, 560 * k + 40), x0 = MAG9.cx(w) - L / 2; const tx = x0 - 30 + S.mu.u * (L + 60), ty = 90 + S.mu.v * (ny - 90); return { w, h, k, ny, L, x0, tx: tx, ty: Math.min(ty, ny - 5), T: 9 * k + 4, ML: 210 * k + 30, MT: 40 * k + 8 }; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S);
      if (S.auto > 0) { S.ap += dt * .55; const ph = S.ap % 1; if (ph < .62) { S.mu.u = .03 + ph / .62 * .94; S.mu.v = 1; } else { const q = (ph - .62) / .38; S.mu.u = .97 - q * .94; S.mu.v = .35 * Math.sin(q * Math.PI) < .02 ? .95 : 1 - Math.sin(q * Math.PI) * .7; } if (S.ap >= 1) { S.ap -= 1; S.auto--; } }
      const contact = g.ty >= g.ny - 8 && g.tx > g.x0 - 10 && g.tx < g.x0 + g.L + 10; const vx = (g.tx - (S.px ?? g.tx)); S.px = g.tx;
      if (contact && Math.abs(vx) > .2) { const i = Math.floor((g.tx - g.x0) / g.L * NX); const dirMove = vx > 0 ? 0 : Math.PI; const tgt = S.p.pole === 'N' ? dirMove + Math.PI : dirMove;
        [i - 1, i].forEach(c => { if (c < 0 || c >= NX) return; [c, c + NX].forEach(j => { const cl = S.cells[j]; let d = tgt - cl.a; d = Math.atan2(Math.sin(d), Math.cos(d)); cl.a += d * Math.min(1, Math.abs(vx) * .008); }); });
        if (!S.inC) { S.inC = 1; S.dir = Math.sign(vx); S.startX = g.tx; } else if (Math.sign(vx) !== S.dir && Math.abs(vx) > 1) { S.bad = 2.5; S.dir = Math.sign(vx); } }
      if (!contact && S.inC) { S.inC = 0; if (Math.abs(g.tx - S.startX) > g.L * .6) S.n++; }
      if (S.bad > 0) S.bad -= dt;
      const M = DOM9.M(S.cells); const cx = g.x0 + g.L - 30, cy = g.ny + 120; const b = MAG9.B([DOM9.bar(g.x0 + g.L / 2, g.ny, g.L, g.T, M, 1.2)], cx, cy, [0, -6e-6]); MAG9.turn(S.nd, Math.atan2(b[1], b[0]), dt, 50, 6); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { benchY: g.ny + 14 }); const M = DOM9.M(S.cells);
      if (p.arr !== false) { const row = (y, dir) => { for (let k = 0; k < 6; k++) { const x = g.x0 + g.L * (k + .5) / 6; MAG9.raw(ctx, () => G.arrow(ctx, x - dir * 18, y, x + dir * 18, y, '#16a34a', 6, 14)); } }; row(g.ny - 90, 1); row(g.ny - 150, -1); MF9.T(ctx, 'اتجاه حركة القطب المغناطيسي الدالك', MAG9.cx(w), g.ny - 186, { s: 12, w: 900, c: '#15803d' }); MAG9.raw(ctx, () => { ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(g.x0 + g.L + 14, g.ny - 120, 30, -Math.PI / 2, Math.PI / 2); ctx.stroke(); ctx.beginPath(); ctx.arc(g.x0 - 14, g.ny - 120, 30, Math.PI / 2, Math.PI * 1.5); ctx.stroke(); }); }
      DOM9.rod(ctx, g.x0 + g.L / 2, g.ny, g.L, g.T * 1.6, p.dom !== false ? S.cells : null, NX, { col: '#94a3b8' }); MAG9.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(g.x0 + 12, g.ny, 7, 2.5, 0, 0, TAU); ctx.stroke(); });
      MF9.T(ctx, 'إبرة من الفولاذ', g.x0 + 60, g.ny + 26, { s: 11.5, w: 900, c: '#334155' });
      // tilted magnet: lower tip at (tx,ty)
      const ang = -Math.PI / 2.9, ux = Math.cos(ang), uy = Math.sin(ang); const m = MAG9.bar(g.tx + ux * g.ML / 2, g.ty + uy * g.ML / 2, p.pole === 'N' ? ang + Math.PI : ang, g.ML, g.MT, 1); MAG9.drawMag(ctx, m);
      if (p.test !== false) { const cx = g.x0 + g.L - 30, cy = g.ny + 120; MAG9.compass(ctx, cx, cy, 26, S.nd.a); MF9.T(ctx, 'بوصلة اختبار', cx, cy + 40, { s: 10.5, w: 800, c: '#334155' }); }
      MF9.T(ctx, 'عدد مرات الدلك الصحيحة: ' + S.n + '   ⟸   تمغنط الإبرة: ' + Math.round(Math.abs(M) * 100) + '%', MAG9.cx(w), g.ny + 54, { s: 12.5, w: 900, c: '#fff', bg: Math.abs(M) > .6 ? '#15803d' : '#475569' });
      if (S.bad > 0) MF9.T(ctx, '⚠ رجعت والقطب ملامس للإبرة! هذا يُفسد الترتيب — ارفع المغناطيس في طريق العودة', MAG9.cx(w), 58, { s: 12.5, w: 900, c: '#fff', bg: '#dc2626' });
      else if (Math.abs(M) > .6) MF9.T(ctx, 'صارت الإبرة مغناطيساً: الطرف الأيمن (نهاية الدلك) ' + (M < 0 ? 'S' : 'N') + ' مخالف للقطب الدالك ' + p.pole + ' ✓', MAG9.cx(w), 58, { s: 12.5, w: 900, c: '#fff', bg: '#15803d' });
      MAG9.banner(ctx, w, '4-2 (a): طريقة التمغنط بالدلك (الشكل 20)', '#ea580c');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), ang = -Math.PI / 2.9; return [{ id: 'mag', x: g.tx + Math.cos(ang) * g.ML * .45, y: g.ty + Math.sin(ang) * g.ML * .45, w: 80, h: g.ML * .8, axis: 'xy', keep: true, tip: 'اسحب المغناطيس على الإبرة باتجاه واحد ثم ارفعه', idle: 'ادلك الإبرة ✋', down: () => { S.auto = 0; S._a = S.mu.u; S._b = S.mu.v; }, drag: (S2, d) => { S.mu.u = clamp(S._a + (d.x - d.sx) / (g.L + 60), 0, 1); S.mu.v = clamp(S._b + (d.y - d.sy) / (g.ny - 90), 0, 1.1); } }]; },
    readings(S) { const M = DOM9.M(S.cells); return [rd('القطب الدالك', S.p.pole), rd('مرات الدلك', String(S.n)), rd('درجة التمغنط', Math.round(Math.abs(M) * 100) + '%'), rd('طرف الإبرة الأيمن (نهاية الدلك)', Math.abs(M) > .3 ? (M < 0 ? 'S' : 'N') : 'غير ممغنط')]; },
    record(S) { const M = DOM9.M(S.cells); return { n: S.n, m: Math.round(Math.abs(M) * 100), p: S.p.pole, e: Math.abs(M) > .3 ? (M < 0 ? 'S' : 'N') : '—' }; },
    cols: [['n', 'مرات الدلك'], ['m', 'التمغنط (%)'], ['p', 'القطب الدالك'], ['e', 'قطب نهاية الدلك']],
    explain(S) { const M = DOM9.M(S.cells); return 'داخل الفولاذ مغانط صغيرة جداً (مناطق) مبعثرة الاتجاهات فيلغي بعضها بعضاً. كلما مرّ القطب الدالك فوقها في <b>اتجاه واحد</b> تدور وتترتب بالاتجاه نفسه، فتصير الإبرة مغناطيساً.' + (Math.abs(M) > .3 ? ' الآن طرف الإبرة الذي انتهى عنده الدلك (الأيمن) قطب <b>' + (M < 0 ? 'S' : 'N') + '</b>: <b>مخالف</b> للقطب الدالك ' + S.p.pole + '.' : '') + ' لو دلكنا ذهاباً وإياباً فإن الحركة المعاكسة تعيد بعثرة المغانط الصغيرة.'; }
  });
})();
/* ---- 6.2 magnetising by induction (approach) — soft iron vs steel (fig 21) ---- */
(() => {
  const NX = 12;
  const D = P92({ id: 'g9m_induce', page: 42, fig: 'الشكل 21',
    desc: 'التمغنط بالتقريب (الحث): عند وضع مادة فيرومغناطيسية غير ممغنطة (مثل مسمار من الحديد) قرب مغناطيس قوي من غير تماس، يكتسب المسمار المغناطيسية بالحث، ويتولد على طرفيه قطبان: الطرف القريب مخالف للقطب المؤثر، والبعيد مشابه له. قارن الحديد المطاوع بالفولاذ.',
    tags: 'التمغنط بالحث التقريب مسمار حديد الطرف القريب مخالف البعيد مشابه حديد مطاوع فولاذ مؤقت دائم',
    tools: ['ساق مغناطيسية قوية', 'مسمار من الحديد المطاوع', 'مسمار من الفولاذ', 'مشابك ورق'],
    controls: [SEL('face', 'القطب المؤثر المواجه للمسمار', [['S', 'S (الشكل 21)'], ['N', 'N']], 'S'), BT('', [{ t: '↺ مسامير غير ممغنطة', on: S => D.reset(S) }]), TG('lines', 'خطوط المجال', true, null, 'bfield'), TG('dom', 'المغانط الصغيرة (المناطق)', true, null, 'atom'), TG('cmp', 'مقارنة: حديد مطاوع وفولاذ', true, null, 'swap')],
    steps: ['قرّب المغناطيس من رأس المسمار من غير أن يلمسه (اسحب المغناطيس).', 'لاحظ: يتمغنط المسمار بالحث: الطرف القريب صار قطباً مخالفاً للقطب المؤثر، والطرف البعيد قطباً مشابهاً له، ويجذب المسمار مشابك الورق.', 'اقلب القطب المؤثر (N) ولاحظ انقلاب قطبي المسمار.', 'أبعد المغناطيس: مسمار الحديد المطاوع يفقد مغناطيسيته فوراً فتسقط المشابك (مغناطيس مؤقت)، والفولاذ يحتفظ بجزء منها (مغناطيس دائم).'],
    concl: ['المادة الفيرومغناطيسية القريبة من مغناطيس قوي تتمغنط بالحث (التأثير) دون تماس.', 'الطرف القريب من المغناطيس المؤثر يكون قطباً مخالفاً له في النوع، والطرف البعيد قطباً مشابهاً له.', 'الحديد المطاوع يتمغنط بسهولة ويفقد مغناطيسيته بسهولة (مغانط مؤقتة)، والفولاذ أصعب تمغنطاً لكنه يحتفظ بمغناطيسيته (مغانط دائمة).'],
    laws: ['g9_magz'],
    setup(S) { S.mx = .1; D.reset(S); },
    reset(S) { S.c1 = DOM9.rand(NX * 2, 3); S.c2 = DOM9.rand(NX * 2, 4); S.keep = 0; S.cl1 = 0; S.cl2 = 0; },
    geo(S) { const w = S.W, h = S.H, k = MAG9.sc(w, h), two = S.p.cmp !== false, rows = two ? [h * .38, h * .72] : [h * .55]; const nL = 200 * k + 40, nT = 16 * k + 6, nx = MAG9.cx(w) + 90 * k; const mL = 190 * k + 30, mT = 42 * k + 8; const gap = 12 + S.mx * 260 * k; const mxx = nx - nL / 2 - gap - mL / 2;
      const mags = rows.map(y => MAG9.bar(mxx, y, S.p.face === 'S' ? Math.PI : 0, mL, mT, 1.4)); return { w, h, k, rows, nL, nT, nx, mags, two, gap }; },
    induced(S, g, i) { const m = g.mags[i], P = MAG9.prep([m]); const b = MAG9.Bp(P, g.nx, g.rows[i]); return b[0]; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); g.rows.forEach((y, i) => { const cells = i === 0 ? S.c1 : S.c2, steel = i === 1; const Bx = D.induced(S, g, i); const sgn = Math.sign(Bx), mag = Math.abs(Bx);
      const drive = clamp(mag / (steel ? 1.6e-4 : 1e-4), 0, 1);   // how strongly domains are pushed
      cells.forEach((c, j) => { c.r0 = c.r0 ?? (((j * 2.399) % TAU)); const tgt = sgn >= 0 ? 0 : Math.PI; let d = tgt - c.a; d = Math.atan2(Math.sin(d), Math.cos(d));
        if (drive > ((j * .618) % 1) * (steel ? 1 : .6)) c.a += d * Math.min(1, dt * (steel ? 2 : 8));
        else if (!steel) { let e = c.r0 - c.a; e = Math.atan2(Math.sin(e), Math.cos(e)); c.a += e * Math.min(1, dt * 5); } }); });
      const M1 = Math.abs(DOM9.M(S.c1)), M2 = Math.abs(DOM9.M(S.c2)); S.cl1 = Math.round(clamp((M1 - .25) * 8, 0, 6)); S.cl2 = Math.round(clamp((M2 - .25) * 8, 0, 6)); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; G.bg(ctx, w, h, false); MAG9.raw(ctx, () => { ctx.fillStyle = '#fdfcfb'; ctx.fillRect(0, 0, w, h); });
      g.rows.forEach((y, i) => { if (!g.two && i > 0) return; const cells = i === 0 ? S.c1 : S.c2, M = DOM9.M(cells), steel = i === 1; const nailMag = DOM9.bar(g.nx, y, g.nL, g.nT, M, .9); const r = [64, y - (g.two ? h * .17 : h * .3), w, y + (g.two ? h * .17 : h * .3)];
        if (p.lines !== false) MF9.clip(ctx, r, () => MAG9.drawLines(ctx, MAG9.lines(MF9.cache(S, 'i' + i).l, [g.mags[i], Object.assign(nailMag, { noLines: true })], r, { n: 14 }), { col: '#db2777', alpha: .7, lw: 1.4 }));
        MAG9.drawMag(ctx, g.mags[i]); DOM9.rod(ctx, g.nx, y, g.nL, g.nT, p.dom !== false ? cells : null, NX, { nail: true, col: steel ? '#64748b' : '#9ca3af' });
        for (let k = 0; k < (i === 0 ? S.cl1 : S.cl2); k++) MAG9.clip(ctx, g.nx + g.nL / 2 + 6 + (k % 2) * 6, y + 16 + k * 17 * g.k, Math.PI / 2 + (k % 2 ? .12 : -.12), g.k * .9 + .1);
        MF9.T(ctx, steel ? 'مسمار من الفولاذ' : 'مسمار من الحديد المطاوع', g.nx, y - g.nT - 26, { s: 12, w: 900, c: '#fff', bg: steel ? '#475569' : '#78716c' });
        MF9.T(ctx, 'تمغنط: ' + Math.round(Math.abs(M) * 100) + '%', g.nx + g.nL / 2 + 60, y - g.nT - 26, { s: 11, w: 800, c: '#334155' }); });
      MF9.T(ctx, 'المسافة بين المغناطيس والمسمار: ' + (g.gap < 20 ? 'قريب جداً (بلا تماس)' : g.gap < 120 * g.k ? 'قريب' : 'بعيد'), MAG9.cx(w), h - 70, { s: 12, w: 900, c: '#fff', bg: '#334155' });
      MAG9.banner(ctx, w, '4-2 (b) أولاً: التمغنط بالتقريب (الحث) — الشكل 21', '#db2777');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return g.mags.map((m, i) => ({ id: 'mag' + i, x: m.x, y: m.y, w: m.L, h: m.T + 20, axis: 'x', keep: true, tip: 'قرّب المغناطيس من المسمار أو أبعده', idle: i === 0 ? 'قرّب المغناطيس ✋' : null, hint: i === 0, down: () => { S._a = S.mx; }, drag: (S2, d) => { S.mx = clamp(S._a - (d.x - d.sx) / (260 * g.k), 0, 1); } })); },
    field(S, x, y) { if (!S.W) return null; const g = D.geo(S); const M = g.mags.concat(g.rows.map((yy, i) => DOM9.bar(g.nx, yy, g.nL, g.nT, DOM9.M(i ? S.c2 : S.c1), .9))); return MAG9.insideAny(M, x, y) ? null : MAG9.B(M, x, y); },
    readings(S) { const M1 = DOM9.M(S.c1), M2 = DOM9.M(S.c2), face = S.p.face, opp = face === 'S' ? 'N' : 'S'; return [rd('القطب المؤثر', face), rd('الطرف القريب من المسمار', Math.abs(M1) > .3 ? opp + ' (مخالف)' : '—'), rd('الطرف البعيد', Math.abs(M1) > .3 ? face + ' (مشابه)' : '—'), rd('الحديد المطاوع', Math.round(Math.abs(M1) * 100) + '% ، مشابك ' + S.cl1), rd('الفولاذ', Math.round(Math.abs(M2) * 100) + '% ، مشابك ' + S.cl2)]; },
    explain(S) { const M1 = Math.abs(DOM9.M(S.c1)), M2 = Math.abs(DOM9.M(S.c2)), face = S.p.face, opp = face === 'S' ? 'N' : 'S'; const g = S.W ? D.geo(S) : { gap: 999 }; return (M1 > .3 ? 'المسمار تمغنط <b>بالحث</b>: الطرف القريب صار <b>' + opp + '</b> (مخالف للقطب المؤثر ' + face + ')، والبعيد <b>' + face + '</b> (مشابه). لذلك ينجذب المسمار نحو المغناطيس ويجذب المشابك.' : 'المسمار غير ممغنط: مغانطه الصغيرة مبعثرة.') + (g.gap > 150 && M2 > .3 ? '<br>أبعدت المغناطيس: <b>الحديد المطاوع فقد مغناطيسيته</b> (مؤقت)، أما <b>الفولاذ فاحتفظ بها</b> (دائم).' : ''); }
  });
})();
/* ---- 6.3 magnetising by direct current: the electromagnet (fig 22 + three factors) ---- */
(() => {
  const CORE = [['fe', 'حديد مطاوع', 1, 0], ['st', 'فولاذ', .75, .55], ['al', 'ألمنيوم (ليس فيرومغناطيسياً)', .03, 0], ['air', 'بلا قلب (هواء)', .03, 0]];
  const D = P92({ id: 'g9m_coil', page: 42, fig: 'الشكل 22',
    desc: 'التمغنط بالتيار الكهربائي المستمر: نلف سلكاً موصلاً معزولاً حول مسمار أو برغي من الفولاذ ونوصل طرفيه بقطبي بطارية، فنحصل على مغناطيس كهربائي. مقدار قوته يعتمد على: 1) مقدار التيار 2) عدد اللفات 3) نوع المادة.',
    tags: 'مغناطيس كهربائي تيار مستمر ملف بطارية عدد اللفات نوع المادة برغي فولاذ',
    tools: ['سلك موصل معزول', 'برغي أو مسمار من الفولاذ', 'بطارية', 'مفتاح', 'مشابك ورق'],
    controls: [R('I', 'التيار المستمر', 0, 3, 1.5, .5, 'A'), R('n', 'عدد اللفات', 5, 40, 20, 5, ''), SEL('core', 'المادة داخل الملف', CORE.map(q => [q[0], q[1]]), 'st'), BT('', [{ t: '⏻ أغلق/افتح الدائرة', on: S => { S.on = !S.on; } }, { t: '⇄ اعكس البطارية', on: S => { S.rev = -S.rev; } }]), TG('lines', 'خطوط المجال', true, null, 'bfield'), TG('cur', 'حركة التيار في السلك', true, null, 'current')],
    steps: ['لفّ السلك المعزول حول البرغي (عدد اللفات من المنزلق) ووصّل طرفيه بالبطارية.', 'أغلق الدائرة (اضغط المفتاح): صار البرغي مغناطيساً كهربائياً يجذب المشابك.', 'غيّر التيار: كلما زاد التيار زاد عدد المشابك المرفوعة.', 'غيّر عدد اللفات: كلما زادت اللفات زادت قوة المغناطيس.', 'غيّر المادة: الحديد والفولاذ يزيدان القوة كثيراً، والألمنيوم لا يفيد. سجّل القراءات في الجدول.', 'افتح الدائرة: الحديد المطاوع يفقد مغناطيسيته، والفولاذ يبقى ممغنطاً (الطريقة المفضلة لصنع مغناطيس من الفولاذ).'],
    concl: ['المغناطيس الكهربائي: سلك معزول ملفوف حول قطعة فيرومغناطيسية يمر فيه تيار مستمر.', 'تزداد قوته بزيادة: مقدار التيار المستمر، عدد اللفات، وتعتمد على نوع المادة المراد مغنطتها.', 'عكس البطارية يعكس قطبي المغناطيس الكهربائي.'],
    laws: ['g9_emag', 'g9_magz'],
    setup(S) { S.on = true; S.rev = 1; S.ret = 0; S.ph = 0; S.rows = S.rows || []; },
    strength(S) { const c = CORE.find(q => q[0] === S.p.core); return S.on ? S.p.I * S.p.n * c[2] / 60 : 0; },
    update(S, dt) { const c = CORE.find(q => q[0] === S.p.core); const st = D.strength(S); if (S.on && c[3] > 0) S.ret = st * c[3] * S.rev; if (!S.on && c[3] === 0) S.ret = 0; if (S.on && c[3] === 0) S.ret = 0; S.ph += dt * (S.on ? S.p.I : 0) * 1.5; S._core = S.p.core; },
    total(S) { return S.on ? D.strength(S) * S.rev : S.ret; },
    geo(S) { const w = S.W, h = S.H, k = MAG9.sc(w, h), cx = MAG9.cx(w) - 40 * k, cy = h * .42, L = 260 * k + 40, T = 30 * k + 8; return { w, h, k, cx, cy, L, T }; },
    mag(S, g) { const M = D.total(S); return MAG9.bar(g.cx, g.cy, M >= 0 ? 0 : Math.PI, g.L * .96, g.T, clamp(Math.abs(M) * 1.1, 0, 2.4)); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, M = D.total(S), n = p.n; G.bg(ctx, w, h, false); MAG9.raw(ctx, () => { ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h); });
      const m = D.mag(S, g); if (p.lines !== false && Math.abs(M) > .05) MF9.clip(ctx, [64, 40, w, h - 38], () => MAG9.drawLines(ctx, MAG9.lines(MF9.cache(S, 'c').l, [m], [64, 40, w, h], { n: 16 }), { col: '#0ea5e9', alpha: .7 }));
      // bolt
      MAG9.raw(ctx, () => { const c = CORE.find(q => q[0] === p.core); const x0 = g.cx - g.L / 2, x1 = g.cx + g.L / 2; if (p.core !== 'air') { const gg = ctx.createLinearGradient(0, g.cy - g.T / 2, 0, g.cy + g.T / 2); gg.addColorStop(0, '#f1f5f9'); gg.addColorStop(.45, p.core === 'al' ? '#e5e7eb' : '#94a3b8'); gg.addColorStop(1, '#334155'); ctx.fillStyle = gg; ctx.fillRect(x0, g.cy - g.T / 2, g.L, g.T); ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.moveTo(x0 - g.T * .5, g.cy - g.T); ctx.lineTo(x0, g.cy - g.T); ctx.lineTo(x0, g.cy + g.T); ctx.lineTo(x0 - g.T * .5, g.cy + g.T); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(15,23,42,.25)'; for (let x = x1 - g.L * .3; x < x1; x += 5) { ctx.beginPath(); ctx.moveTo(x, g.cy - g.T / 2); ctx.lineTo(x - 3, g.cy + g.T / 2); ctx.stroke(); } }
        // coil turns
        const cx0 = x0 + g.L * .1, cx1 = x1 - g.L * .1, dx = (cx1 - cx0) / n; for (let i = 0; i < n; i++) { const x = cx0 + (i + .5) * dx; ctx.strokeStyle = '#b91c1c'; ctx.lineWidth = Math.min(5, dx * .8); ctx.beginPath(); ctx.ellipse(x, g.cy, dx * .45, g.T * .62, 0, -Math.PI / 2, Math.PI / 2); ctx.stroke(); ctx.strokeStyle = '#ef4444'; ctx.lineWidth = Math.min(3, dx * .5); ctx.beginPath(); ctx.ellipse(x + .5, g.cy, dx * .45, g.T * .62, 0, -Math.PI / 2, Math.PI / 2); ctx.stroke(); }
        // leads to battery
        const bx = g.cx + g.L * .15, by = g.cy + 130 * g.k + 40; ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx0, g.cy + g.T * .6); ctx.quadraticCurveTo(cx0 - 40, by, bx - 40, by); ctx.moveTo(cx1, g.cy + g.T * .6); ctx.quadraticCurveTo(cx1 + 60, by, bx + 80, by); ctx.stroke();
        // battery (book: red/yellow box)
        ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 6; ctx.fillStyle = '#fde68a'; rr(ctx, bx - 40, by - 30, 80, 60, 6); ctx.fill(); ctx.restore(); ctx.fillStyle = '#dc2626'; ctx.fillRect(bx - 40, by - 30, 80, 22); ctx.fillStyle = '#fff'; ctx.font = '800 11px system-ui'; ctx.textAlign = 'center'; ctx.direction = 'ltr'; ctx.fillText('Battery', bx, by - 15); ctx.fillStyle = '#111827'; ctx.font = '900 14px system-ui'; ctx.fillText(S.rev > 0 ? '−   +' : '+   −', bx, by + 16);
        if (p.cur !== false && S.on && p.I > 0) { ctx.fillStyle = '#facc15'; for (let i = 0; i < n; i++) { const x = cx0 + (i + .5) * dx, a = ((S.ph * S.rev + i * .3) % 1) * Math.PI - Math.PI / 2; ctx.beginPath(); ctx.arc(x + Math.cos(a) * dx * .45, g.cy + Math.sin(a) * g.T * .62, 2.2, 0, TAU); ctx.fill(); } } });
      // switch
      const sb = { x: g.cx + g.L * .15 + 150, y: g.cy + 130 * g.k + 40, w: 110, h: 36 }; S._sw = sb; MAG9.btn(ctx, sb, S.on ? '⏻ مغلقة' : '⏻ مفتوحة', { col: S.on ? '#15803d' : '#64748b', on: S.on });
      // poles + clips
      if (Math.abs(M) > .05) { const l = M > 0 ? 'S' : 'N', r = M > 0 ? 'N' : 'S'; MF9.T(ctx, l, g.cx - g.L / 2 - 26, g.cy, { s: 16, w: 900, c: l === 'N' ? '#dc2626' : '#2563eb' }); MF9.T(ctx, r, g.cx + g.L / 2 + 16, g.cy - 22, { s: 16, w: 900, c: r === 'N' ? '#dc2626' : '#2563eb' }); }
      const nc = Math.round(clamp(Math.abs(M) * 6, 0, 14)); for (let k = 0; k < nc; k++) { const col = Math.floor(k / 5), row = k % 5; MAG9.clip(ctx, g.cx + g.L / 2 + 8 + col * 12, g.cy + 14 + row * 18 * g.k, Math.PI / 2 + (col % 2 ? .15 : -.1), g.k * .9 + .1); }
      MAG9.raw(ctx, () => { ctx.fillStyle = '#d6d3d1'; rr(ctx, g.cx + g.L / 2 - 20, h - 92, 110, 18, 6); ctx.fill(); }); for (let k = 0; k < 14 - nc; k++) MAG9.clip(ctx, g.cx + g.L / 2 - 10 + (k % 7) * 12, h - 96 - Math.floor(k / 7) * 6, .4 + k, g.k * .8 + .1);
      MF9.T(ctx, 'المشابك المرفوعة: ' + nc + (S.on ? '' : (Math.abs(M) > .05 ? ' (الفولاذ بقي ممغنطاً)' : ' (فقد مغناطيسيته)')), MAG9.cx(w), 58, { s: 13, w: 900, c: '#fff', bg: nc ? '#15803d' : '#475569' });
      MAG9.banner(ctx, w, '4-2 (b) ثانياً: التمغنط بالتيار الكهربائي المستمر (الشكل 22)', '#b91c1c');
    },
    drags(S) { if (!S.W || !S._sw) return []; return [MAG9.btnObj('sw', S._sw, () => { S.on = !S.on; }, { tip: 'أغلق / افتح الدائرة', idle: 'المفتاح ✋', hint: true })]; },
    field(S, x, y) { if (!S.W) return null; const g = D.geo(S), m = D.mag(S, g); return MAG9.inside(m, x, y) ? null : MAG9.B([m], x, y); },
    readings(S) { const M = D.total(S); return [rd('التيار', S.on ? S.p.I + ' A' : '0 A (مفتوحة)'), rd('عدد اللفات', String(S.p.n)), rd('المادة', CORE.find(q => q[0] === S.p.core)[1]), rd('المشابك المرفوعة', String(Math.round(clamp(Math.abs(M) * 6, 0, 14))))]; },
    record(S) { const M = D.total(S); return { I: S.on ? S.p.I : 0, n: S.p.n, c: CORE.find(q => q[0] === S.p.core)[1], k: Math.round(clamp(Math.abs(M) * 6, 0, 14)) }; },
    cols: [['I', 'التيار (A)'], ['n', 'عدد اللفات'], ['c', 'المادة'], ['k', 'عدد المشابك']],
    graph: { x: 'n', y: 'k', xl: 'عدد اللفات', yl: 'عدد المشابك المرفوعة' },
    explain(S) { const c = CORE.find(q => q[0] === S.p.core); if (!S.on) return 'الدائرة مفتوحة فلا يمر تيار. ' + (S.ret > .05 ? '<b>الفولاذ</b> بقي ممغنطاً (مغناطيس دائم) — لهذا تُعدّ هذه الطريقة المفضلة لمغنطة الفولاذ.' : 'المادة فقدت مغناطيسيتها (' + c[1] + ').'); return 'التيار المستمر في الملف يمغنط ' + (S.p.core === 'air' ? 'الهواء داخله قليلاً جداً' : c[1]) + '. قوة المغناطيس الكهربائي تزداد بزيادة <b>التيار</b> (الآن ' + S.p.I + ' A) و<b>عدد اللفات</b> (الآن ' + S.p.n + ')، وتعتمد على <b>نوع المادة</b>' + (c[2] < .1 ? ': الألمنيوم والهواء لا يزيدان القوة لأنهما ليسا فيرومغناطيسيين.' : '.'); }
  });
})();
/* ---- 6.4 losing magnetism: hammering & strong heating (fig 23) + keeper («هل تعلم» p43) ---- */
(() => {
  const NX = 6, NY = 4;
  const D = P92({ id: 'g9m_lose', page: 43, fig: 'الشكل 23 + هل تعلم',
    desc: 'يفقد المغناطيس مغناطيسيته بطرائق عدة منها: (a) الطرق القوي، (b) التسخين الشديد (الشكل 23). وفي «هل تعلم»: الحافظة المغناطيسية تحفظ المغانط الدائمة من زوال مغناطيسيتها بمرور الوقت.',
    tags: 'فقدان المغناطيسية الطرق القوي التسخين الشديد مناطق مغناطيسية حافظة',
    tools: ['مغناطيس', 'مطرقة', 'مصباح بنزن', 'حافظة مغناطيسية'],
    controls: [SEL('mode', 'الطريقة', [['ham', '(a) الطرق القوي'], ['heat', '(b) التسخين الشديد'], ['keep', 'هل تعلم: الحافظة المغناطيسية']], 'ham'), BT('', [{ t: '🔨 اطرق المغناطيس', on: S => D.hit(S) }, { t: '🧲 مغنطه من جديد', on: S => D.reset(S) }]), R('yr', 'مرور الزمن (للحافظة)', 0, 20, 0, 1, 'سنة'), TG('clips', 'المشابك تحت المغناطيس', true, null, 'magnet')],
    steps: ['المغناطيس مكوّن من مغانط صغيرة مرتبة كلها بالاتجاه نفسه (N S N S…) كما في الشكل 23.', '(a) اطرق المغناطيس بقوة عدة مرات (اضغط على المطرقة أو الزر): تتبعثر المغانط الصغيرة فيضعف المغناطيس وتسقط المشابك.', '(b) اختر التسخين الشديد واسحب المصباح تحت المغناطيس: كلما ارتفعت الحرارة تبعثرت المغانط الصغيرة أكثر.', 'هل تعلم: قارن مغناطيسين بمرور السنين: أحدهما محفوظ بحافظة مغناطيسية والآخر بدونها.'],
    concl: ['يفقد المغناطيس مغناطيسيته بالطرق القوي والتسخين الشديد، لأن المغانط الصغيرة داخله تتبعثر اتجاهاتها.', 'الحافظة المغناطيسية (مادة فيرومغناطيسية) تحفظ المغانط الدائمة من زوال مغناطيسيتها بمرور الوقت.'],
    laws: ['g9_emag', 'g9_magz'],
    setup(S) { D.reset(S); S.bx = .15; S.T = 25; S.hp = 0; },
    reset(S) { S.cells = Array.from({ length: NX * NY }, () => ({ a: 0 })); S.hits = 0; S.T = 25; },
    hit(S) { if (S.p.mode !== 'ham') setParam(S, 'mode', 'ham'); const r = Math.random; S.cells.forEach(c => { c.a += (r() - .5) * 1.6; }); S.hits++; S.hp = .35; if (window.Sound && Sound.tick) try { Sound.tick(); } catch (e) { } },
    geo(S) { const w = S.W, h = S.H, k = MAG9.sc(w, h), cx = MAG9.cx(w), cy = h * .42, bw = 300 * k + 40, bh = 150 * k + 20; return { w, h, k, cx, cy, bw, bh, by: h * .82 }; },
    update(S, dt) { if (!S.W) return; S.hp = Math.max(0, S.hp - dt); const g = D.geo(S); if (S.p.mode === 'heat') { const bx = 80 + S.bx * (g.w - 160); const under = Math.abs(bx - g.cx) < g.bw / 2; S.T += ((under ? 900 : 25) - S.T) * dt * .25; const agit = clamp((S.T - 200) / 570, 0, 1); S.cells.forEach(c => { c.a += (Math.random() - .5) * agit * dt * 9; }); } else S.T += (25 - S.T) * dt * .5; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { benchY: g.by }); const M = Math.max(0, DOM9.M(S.cells));
      if (p.mode === 'keep') { D.keeper(ctx, S, g); MAG9.banner(ctx, w, 'هل تعلم (ص 43): الحافظة المغناطيسية', '#a16207'); return; }
      const shx = S.hp > 0 ? Math.sin(S.t * 120) * 3 : 0; const x0 = g.cx - g.bw / 2 + shx, y0 = g.cy - g.bh / 2;
      MAG9.raw(ctx, () => { ctx.fillStyle = 'rgba(148,163,184,.35)'; ctx.beginPath(); ctx.moveTo(x0 - 40, y0 + g.bh + 30); ctx.lineTo(x0 + g.bw + 40, y0 + g.bh + 30); ctx.lineTo(x0 + g.bw + 80, y0 + g.bh - 10); ctx.lineTo(x0, y0 + g.bh - 10); ctx.closePath(); ctx.fill();
        const hot = clamp((S.T - 25) / 800, 0, 1); const gg = ctx.createLinearGradient(0, y0, 0, y0 + g.bh); gg.addColorStop(0, hot > .3 ? '#fdba74' : '#fde68a'); gg.addColorStop(1, hot > .3 ? '#ea580c' : '#ca8a04'); ctx.fillStyle = gg; rr(ctx, x0, y0, g.bw, g.bh, 6); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.beginPath(); ctx.moveTo(x0 + g.bw, y0); ctx.lineTo(x0 + g.bw + 30, y0 - 18); ctx.lineTo(x0 + g.bw + 30, y0 + g.bh - 18); ctx.lineTo(x0 + g.bw, y0 + g.bh); ctx.closePath(); ctx.fill(); });
      // domain magnets with N S letters (book fig 23)
      const cw = g.bw / NX, ch = g.bh / NY; S.cells.forEach((c, i) => { const x = x0 + (i % NX + .5) * cw, y = y0 + (Math.floor(i / NX) + .5) * ch; MAG9.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(c.a); const l = cw * .38, t = ch * .3; ctx.fillStyle = '#dc2626'; ctx.fillRect(0, -t / 2, l, t); ctx.fillStyle = '#2563eb'; ctx.fillRect(-l, -t / 2, l, t); ctx.fillStyle = '#fff'; ctx.font = '900 ' + Math.round(t * .8) + 'px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr'; ctx.fillText('N', l / 2, 0); ctx.fillText('S', -l / 2, 0); ctx.restore(); }); });
      if (p.clips !== false) { const n = Math.round(clamp((M - .2) * 9, 0, 7)); for (let k = 0; k < n; k++) MAG9.clip(ctx, x0 + g.bw - 14 - (k % 2) * 10, y0 + g.bh + 14 + k * 15, Math.PI / 2, .9); for (let k = 0; k < 7 - n; k++) MAG9.clip(ctx, x0 + g.bw + 60 + k * 12, g.by - 8, .3 + k, .9); }
      if (p.mode === 'ham') { const hx = x0 + g.bw * .5, hy = y0 - 10 - (S.hp > 0 ? 0 : 50); MAG9.raw(ctx, () => { ctx.save(); ctx.translate(hx, hy); ctx.rotate(S.hp > 0 ? .1 : -.5); const gg = ctx.createLinearGradient(-40, 0, 40, 0); gg.addColorStop(0, '#6b7280'); gg.addColorStop(.5, '#e5e7eb'); gg.addColorStop(1, '#374151'); ctx.fillStyle = gg; rr(ctx, -42, -22, 84, 30, 5); ctx.fill(); ctx.fillStyle = '#92400e'; rr(ctx, 30, -14, 120, 14, 6); ctx.fill(); ctx.restore(); }); if (S.hp > 0) MAG9.raw(ctx, () => { ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3; for (let k = 0; k < 8; k++) { const a = k / 8 * TAU; ctx.beginPath(); ctx.moveTo(hx + Math.cos(a) * 30, y0 + Math.sin(a) * 12); ctx.lineTo(hx + Math.cos(a) * 52, y0 + Math.sin(a) * 22); ctx.stroke(); } }); S._hb = { x: hx + 40, y: hy - 6, w: 170, h: 50 }; }
      else { const bx = 80 + S.bx * (w - 160); K.burner(ctx, bx, y0 + g.bh + 70, Math.abs(bx - g.cx) < g.bw / 2 ? 1 : .6, S.t); K.thermo(ctx, w - 70, g.by - 20, 220, Math.min(S.T, 110), -10, 110, {}); MF9.T(ctx, Math.round(S.T) + ' °C', w - 70, g.by - 250, { s: 13, w: 900, c: '#fff', bg: S.T > 500 ? '#dc2626' : '#475569' }); }
      MF9.T(ctx, 'قوة المغناطيس: ' + Math.round(M * 100) + '%' + (p.mode === 'ham' ? '   (عدد الطرقات: ' + S.hits + ')' : ''), MAG9.cx(w), 58, { s: 13, w: 900, c: '#fff', bg: M > .6 ? '#15803d' : M > .3 ? '#b45309' : '#dc2626' });
      MAG9.banner(ctx, w, 'فقدان المغناطيسية (الشكل 23): ' + (p.mode === 'ham' ? '(a) الطرق القوي' : '(b) التسخين الشديد'), '#a16207');
    },
    keeper(ctx, S, g) { const yr = S.p.yr, k = g.k; [[-1, true], [1, false]].forEach(([s, kp]) => { const x = g.cx + s * 150 * k + s * 20, y = g.cy + 20; const str = kp ? 1 : Math.max(.35, 1 - yr * .033); const m = MAG9.U(x, y, -Math.PI / 2, 150 * k + 20, 110 * k + 10, 44 * k + 6, str, { uStyle: 'red' }); MAG9.drawMag(ctx, m, { uStyle: 'red' });
      if (kp) MAG9.raw(ctx, () => { const gg = MAG9.geo(m); const a = gg.W(-m.W / 2 - 4, m.H + 4), b = gg.W(m.W / 2 + 4, m.H + 16); ctx.fillStyle = '#475569'; ctx.fillRect(Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1])); });
      MF9.T(ctx, kp ? 'مع حافظة (قطعة حديد مطاوع)' : 'بدون حافظة', x, y + 70 * k + 30, { s: 12, w: 900, c: '#fff', bg: kp ? '#15803d' : '#64748b' }); MF9.T(ctx, 'قوته بعد ' + yr + ' سنة: ' + Math.round(str * 100) + '%', x, y + 70 * k + 56, { s: 12, w: 800, c: '#334155' }); });
      MF9.T(ctx, 'حرّك منزلق «مرور الزمن» وقارن', MAG9.cx(g.w), 58, { s: 12.5, w: 900, c: '#fff', bg: '#a16207' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); if (S.p.mode === 'ham' && S._hb) return [MAG9.btnObj('ham', S._hb, () => D.hit(S), { tip: 'اطرق بقوة', idle: 'اطرق ✋', hint: true })]; if (S.p.mode === 'heat') { const bx = 80 + S.bx * (g.w - 160), y = g.cy + g.bh / 2 + 70; return [{ id: 'burner', x: bx, y, w: 80, h: 90, axis: 'x', keep: true, tip: 'اسحب المصباح تحت المغناطيس', idle: 'سخّن ✋', down: () => { S._a = S.bx; }, drag: (S2, d) => { S.bx = clamp(S._a + (d.x - d.sx) / (g.w - 160), 0, 1); } }]; } return []; },
    readings(S) { const M = Math.max(0, DOM9.M(S.cells)); return S.p.mode === 'keep' ? [rd('مرور الزمن', S.p.yr + ' سنة'), rd('مع حافظة', '100%'), rd('بدون حافظة', Math.round(Math.max(.35, 1 - S.p.yr * .033) * 100) + '%')] : [rd('قوة المغناطيس', Math.round(M * 100) + '%'), rd('الطرقات', String(S.hits)), rd('درجة الحرارة', Math.round(S.T) + ' °C')]; },
    explain(S) { if (S.p.mode === 'keep') return '<b>هل تعلم:</b> الحافظة المغناطيسية مادة فيرومغناطيسية (قطعة حديد مطاوع) توضع على قطبي المغناطيس فتكمل دائرة خطوط المجال، فتحفظ المغانط الدائمة من زوال مغناطيسيتها بمرور الوقت، وتستعمل أيضاً لحماية الأجهزة كالساعات من التأثيرات المغناطيسية الخارجية.'; const M = Math.max(0, DOM9.M(S.cells)); return 'داخل المغناطيس مغانط صغيرة مرتبة بالاتجاه نفسه (N S N S…). ' + (S.p.mode === 'ham' ? '<b>الطرق القوي</b> يهزّها فتتبعثر اتجاهاتها' : '<b>التسخين الشديد</b> يزيد اهتزازها فتتبعثر اتجاهاتها') + '، فيلغي بعضها تأثير بعض ويضعف المغناطيس (القوة الآن ' + Math.round(M * 100) + '%).'; }
  });
})();
/* ---- 6.5 ➕ comparison: stroking vs induction (objective of the chapter) ---- */
(() => {
  const NX = 10;
  const D = P92({ id: 'g9m_cmp', page: 42, fig: '➕ مقارنة (هدف الفصل)',
    desc: '➕ مقارنة جنباً إلى جنب (هدف سلوكي للفصل): يقارن بين المغناطيس المتولد من طريقة التمغنط بالدلك وطريقة التمغنط بالحث (التأثير). شاهد المغانط الصغيرة في الحالتين، ثم أبعد المغناطيس.',
    tags: 'مقارنة الدلك الحث مؤقت دائم مناطق',
    tools: ['ساق مغناطيسية', 'إبرة فولاذ', 'مسمار حديد'],
    controls: [BT('', [{ t: '▶ ابدأ التمغنط', on: S => { S.st = 1; S.tt = 0; } }, { t: '✋ أبعد المغناطيس', on: S => { S.st = 2; S.tt = 0; } }, { t: '↺ من جديد', on: S => D.setup(S) }]), TG('dom', 'المغانط الصغيرة', true, null, 'atom')],
    steps: ['اضغط «ابدأ التمغنط»: في اليمين ندلك إبرة فولاذ بالقطب N، وفي اليسار نقرب القطب S من مسمار حديد.', 'قارن قطبي كل منهما مع القطب المؤثر.', 'اضغط «أبعد المغناطيس» وقارن: أيهما بقي ممغنطاً؟'],
    concl: ['بالدلك: القطب المتولد عند نهاية الدلك مخالف للقطب الدالك، ويحتاج تماساً وحركة باتجاه واحد، والفولاذ يبقى ممغنطاً (دائم).', 'بالحث: الطرف القريب مخالف للقطب المؤثر والبعيد مشابه له، دون تماس، والحديد المطاوع يفقد مغناطيسيته عند إبعاد المغناطيس (مؤقت).'],
    laws: ['g9_magz'],
    setup(S) { S.a = DOM9.rand(NX * 2, 11); S.b = DOM9.rand(NX * 2, 12); S.b.forEach(c => c.r0 = c.a); S.st = 0; S.tt = 0; },
    update(S, dt) { S.tt += dt; if (S.st === 1) { const ph = (S.tt * .6) % 1, pass = Math.floor(S.tt * .6); if (pass < 5 && ph < .6) { const x = ph / .6; const i = Math.floor(x * NX); [i, i + NX].forEach(j => { const c = S.a[j]; if (c) { let d = Math.PI - c.a; d = Math.atan2(Math.sin(d), Math.cos(d)); c.a += d * .25; } }); } S.b.forEach((c, j) => { let d = Math.PI - c.a; d = Math.atan2(Math.sin(d), Math.cos(d)); if ((j * .618) % 1 < Math.min(1, S.tt)) c.a += d * Math.min(1, dt * 6); }); }
      if (S.st === 2) S.b.forEach(c => { let d = c.r0 - c.a; d = Math.atan2(Math.sin(d), Math.cos(d)); c.a += d * Math.min(1, dt * 4); }); },
    draw(ctx, w, h, S) {
      G.bg(ctx, w, h, false); MAG9.raw(ctx, () => { ctx.fillStyle = '#fbfaf8'; ctx.fillRect(0, 0, w, h); }); const k = MAG9.sc(w, h), x0 = 70, xm = (x0 + w) / 2, top = 50, pw = (w - x0) / 2 - 10, ph = h * .5;
      const panel = (x, title, col) => { MAG9.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = col; ctx.lineWidth = 2.5; rr(ctx, x, top, pw, ph, 12); ctx.fill(); ctx.stroke(); }); MF9.T(ctx, title, x + pw / 2, top + 18, { s: 13, w: 900, c: '#fff', bg: col }); };
      panel(xm + 5, 'التمغنط بالدلك (إبرة فولاذ)', '#ea580c'); panel(x0, 'التمغنط بالحث (مسمار حديد مطاوع)', '#db2777');
      const L = pw * .7, ry = top + ph * .62, T = 12 * k + 6;
      // stroking panel
      const xa = xm + 5 + pw / 2; DOM9.rod(ctx, xa, ry, L, T * 1.3, S.p.dom !== false ? S.a : null, NX, {}); if (S.st === 1 && S.tt * .6 < 5) { const ph2 = (S.tt * .6) % 1; const tx = ph2 < .6 ? xa - L / 2 + ph2 / .6 * L : xa + L / 2 - (ph2 - .6) / .4 * L, ty = ph2 < .6 ? ry - T : ry - 60 * Math.sin((ph2 - .6) / .4 * Math.PI) - T; const ang = -Math.PI / 2.9; MAG9.drawMag(ctx, MAG9.bar(tx + Math.cos(ang) * 60, ty + Math.sin(ang) * 60, ang + Math.PI, 120, 26, 1)); }
      // induction panel
      const Ln = pw * .5, xb = x0 + pw * .66; const near = S.st === 1; DOM9.rod(ctx, xb, ry, Ln, T * 1.3, S.p.dom !== false ? S.b : null, NX, { nail: true }); const mLn = Math.min(120, pw * .26); MAG9.drawMag(ctx, MAG9.bar(xb - Ln / 2 - (near ? 16 : pw * .1) - mLn / 2, ry, Math.PI, mLn, 26, 1));
      // comparison table
      const rows = [['', 'بالدلك', 'بالحث'], ['التماس', 'يلزم تماس وحركة باتجاه واحد', 'بلا تماس (تقريب فقط)'], ['قطب الطرف', 'نهاية الدلك: مخالف للقطب الدالك', 'القريب مخالف، البعيد مشابه'], ['المادة المناسبة', 'الفولاذ', 'الحديد المطاوع'], ['بعد إبعاد المغناطيس', 'يبقى ممغنطاً (دائم)', 'يفقد مغناطيسيته (مؤقت)']];
      const ty0 = top + ph + 16, rh = Math.min(30, (h - ty0 - 46) / rows.length), c1 = w - 10, cw = (w - x0 - 10) / 3; rows.forEach((r, i) => r.forEach((t, j) => { const x = c1 - (j + 1) * cw, y = ty0 + i * rh; MAG9.raw(ctx, () => { ctx.fillStyle = i === 0 ? '#334155' : (i % 2 ? '#f8fafc' : '#eef2ff'); ctx.fillRect(x, y, cw - 2, rh - 2); }); MF9.T(ctx, t, x + cw / 2, y + rh / 2, { s: cw < 200 ? 10 : 11.5, w: i === 0 || j === 0 ? 900 : 700, c: i === 0 ? '#fff' : '#1e293b' }); }));
      MAG9.extra(ctx, w, 'مقارنة الدلك والحث');
    },
    readings(S) { return [rd('الإبرة (دلك)', Math.round(Math.abs(DOM9.M(S.a)) * 100) + '%'), rd('المسمار (حث)', Math.round(Math.abs(DOM9.M(S.b)) * 100) + '%')]; },
    explain(S) { return S.st === 2 ? 'أبعدنا المغناطيس: <b>الإبرة الفولاذ بقيت ممغنطة</b> (مغناطيس دائم)، أما <b>مسمار الحديد المطاوع فقد مغناطيسيته</b> وعادت مغانطه الصغيرة للتبعثر (مغناطيس مؤقت).' : 'في الدلك يجب أن يلمس القطب الإبرة ويتحرك باتجاه واحد؛ وفي الحث يكفي تقريب المغناطيس دون تماس. في الحالتين تترتب المغانط الصغيرة داخل المادة.'; }
  });
})();
/* ---- 6.6 ➕ PhET-style electromagnet: battery voltage ±, AC, loops, compass grid, field meter ---- */
(() => {
  const D = P92({ id: 'g9m_emag', page: 43, fig: '➕ من المختبرات العالمية',
    desc: '➕ من المختبرات العالمية (على غرار PhET «المغانط والمغانط الكهربائية»): ملف حول مسمار مع بطارية تغيّر جهدها من −10 V إلى +10 V، أو مصدر متناوب، مع شبكة بوصلات ومقياس للمجال وحركة الإلكترونات.',
    tags: 'PhET مغناطيس كهربائي بطارية متناوب شبكة بوصلات مقياس المجال إلكترونات',
    tools: ['ملف', 'بطارية', 'مصدر متناوب', 'بوصلة', 'مقياس المجال'],
    controls: [SEL('src', 'المصدر', [['dc', 'بطارية (مستمر)'], ['ac', 'متناوب']], 'dc'), R('V', 'جهد البطارية', -10, 10, 7, 1, 'V'), R('loops', 'عدد اللفات', 1, 4, 3, 1, ''), TG('cg', 'شبكة البوصلات', true, null, 'grid'), TG('lines', 'خطوط المجال', false, null, 'bfield'), TG('el', 'الإلكترونات', true, null, 'electron'), TG('meter', 'مقياس المجال', true, null, 'meter')],
    steps: ['غيّر جهد البطارية بالمنزلق: لاحظ تغير شدة المجال (لون البوصلات).', 'اجعل الجهد سالباً: ينعكس اتجاه التيار فتنقلب الأقطاب وكل البوصلات.', 'زد عدد اللفات: يقوى المجال.', 'اختر المصدر المتناوب: تتأرجح البوصلات لأن الأقطاب تنقلب باستمرار.', 'اسحب المقياس لقراءة شدة المجال في أي نقطة.'],
    concl: ['شدة مجال المغناطيس الكهربائي تزداد بزيادة التيار (الجهد) وعدد اللفات.', 'عكس اتجاه التيار يعكس قطبي المغناطيس الكهربائي.'],
    laws: ['g9_emag'],
    setup(S) { S.ph = 0; S.mp = { u: .78, v: .3 }; S.ac = 0; },
    I(S) { return S.p.src === 'dc' ? S.p.V / 10 : Math.sin(S.ac); },
    geo(S) { const w = S.W, h = S.H, k = MAG9.sc(w, h), cx = MAG9.cx(w), cy = h * .46, L = 150 * k + 30; const I = D.I(S); const m = S._m || (S._m = MAG9.bar(0, 0, 0, 1, 1, 1)); Object.assign(m, { x: cx, y: cy, a: I >= 0 ? 0 : Math.PI, L, T: 34 * k + 6, str: Math.abs(I) * S.p.loops * .45 }); return { w, h, k, cx, cy, L, m, I }; },
    update(S, dt) { if (S.p.src === 'ac') S.ac += dt * 2.2; const I = D.I(S); S.ph += dt * I * 1.6; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, r = [64, 40, w, h - 38]; G.bg(ctx, w, h, false); MAG9.raw(ctx, () => { ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, w, h); });
      if (p.cg !== false && g.m.str > .01) MAG9.cgrid(ctx, [g.m], r, { sp: 40, ref: 5e-5 });
      if (p.lines && g.m.str > .05) MF9.clip(ctx, r, () => MAG9.drawLines(ctx, MAG9.lines(MF9.cache(S, 'em').l, [g.m], r, { n: 16 }), { col: '#0e7490', alpha: .6 }));
      // nail + loops (front half drawn after)
      const x0 = g.cx - g.L / 2, x1 = g.cx + g.L / 2, R = g.m.T * .95;
      MAG9.raw(ctx, () => { const gg = ctx.createLinearGradient(0, g.cy - g.m.T / 2, 0, g.cy + g.m.T / 2); gg.addColorStop(0, '#e2e8f0'); gg.addColorStop(.5, '#94a3b8'); gg.addColorStop(1, '#334155'); ctx.fillStyle = gg; ctx.fillRect(x0 - 10, g.cy - g.m.T * .3, g.L + 20, g.m.T * .6);
        const n = p.loops, cx0 = g.cx - g.L * .32, dx = g.L * .64 / Math.max(1, n - 1); for (let i = 0; i < n; i++) { const x = n === 1 ? g.cx : cx0 + i * dx; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(x, g.cy, 12, R, 0, 0, TAU); ctx.stroke();
          if (p.el !== false) { ctx.fillStyle = '#2563eb'; for (let e = 0; e < 4; e++) { const a = (S.ph + e / 4) * TAU; ctx.beginPath(); ctx.arc(x + Math.cos(a) * 12, g.cy + Math.sin(a) * R, 3.2, 0, TAU); ctx.fill(); } } }
        // wires to source
        const by = g.cy + 160 * g.k + 30; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(g.cx - g.L * .32, g.cy + R); ctx.lineTo(g.cx - g.L * .32, by); ctx.lineTo(g.cx - 50, by); ctx.moveTo(g.cx + g.L * .32, g.cy + R); ctx.lineTo(g.cx + g.L * .32, by); ctx.lineTo(g.cx + 50, by); ctx.stroke();
        if (p.src === 'dc') { const bw = 100; ctx.fillStyle = '#111827'; rr(ctx, g.cx - bw / 2, by - 18, bw, 36, 5); ctx.fill(); ctx.fillStyle = '#f59e0b'; rr(ctx, g.cx - bw / 2 + (p.V >= 0 ? bw * .6 : 0), by - 18, bw * .4, 36, 5); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '900 13px system-ui'; ctx.textAlign = 'center'; ctx.direction = 'ltr'; ctx.textBaseline = 'middle'; ctx.fillText(p.V + ' V', g.cx, by); ctx.textBaseline = 'alphabetic'; }
        else { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#111827'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(g.cx, by, 26, 0, TAU); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const x = g.cx - 16 + i * 32 / 30, y = by - Math.sin(i / 30 * TAU) * 10; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); } });
      if (g.m.str > .05) { const gN = MAG9.geo(g.m).tips; MF9.T(ctx, 'N', gN[0].p[0] + gN[0].out[0] * 18, g.cy - 30, { s: 16, w: 900, c: '#dc2626' }); MF9.T(ctx, 'S', gN[1].p[0] + gN[1].out[0] * 18, g.cy - 30, { s: 16, w: 900, c: '#2563eb' }); }
      if (p.meter !== false) { const x = r[0] + S.mp.u * (r[2] - r[0]), y = r[1] + S.mp.v * (r[3] - r[1]); MF9.meter(ctx, x, y, MAG9.inside(g.m, x, y) ? null : MAG9.B([g.m], x, y), { w }); }
      MAG9.extra(ctx, w, 'المغناطيس الكهربائي (PhET)');
    },
    drags(S) { if (!S.W || S.p.meter === false) return []; const r = [64, 40, S.W, S.H - 38], x = r[0] + S.mp.u * (r[2] - r[0]), y = r[1] + S.mp.v * (r[3] - r[1]); return [{ id: 'meter', x, y, r: 22, axis: 'xy', keep: true, tip: 'ضع مجس المقياس في أي نقطة', idle: 'حرّك المقياس ✋', down: () => { S._a = x; S._b = y; }, drag: (S2, d) => { S.mp = { u: clamp((S._a + d.x - d.sx - r[0]) / (r[2] - r[0]), .03, .97), v: clamp((S._b + d.y - d.sy - r[1]) / (r[3] - r[1]), .05, .95) }; } }]; },
    field(S, x, y) { if (!S.W) return null; const g = D.geo(S); return MAG9.inside(g.m, x, y) ? null : MAG9.B([g.m], x, y); },
    readings(S) { const I = D.I(S); return [rd('المصدر', S.p.src === 'dc' ? 'بطارية ' + S.p.V + ' V' : 'متناوب'), rd('التيار (نسبي)', fmt(I, 2)), rd('عدد اللفات', String(S.p.loops)), rd('القطب N على', I >= 0 ? 'اليمين' : 'اليسار')]; },
    explain(S) { return S.p.src === 'ac' ? 'التيار المتناوب يغيّر اتجاهه باستمرار، فينقلب القطبان N و S باستمرار وتتأرجح البوصلات.' : 'الجهد ' + S.p.V + ' V. ' + (S.p.V === 0 ? 'لا تيار ⟸ لا مجال.' : 'التيار يجعل المسمار مغناطيساً كهربائياً؛ زيادة الجهد (التيار) أو عدد اللفات تقوّي المجال، وعكس الجهد يعكس الأقطاب.'); }
  });
})();
MF9.wrap = (s, n) => { const W = String(s).split(' '), L = []; let cur = ''; W.forEach(w => { if ((cur + ' ' + w).trim().length > n && cur) { L.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); }); if (cur) L.push(cur); return L; };
/* @@PARTS */
/* ======================= merged experiments (book order) ======================= */
M92({ id: 'g9_mag_intro', sec: '2-1 مفهوم المغناطيسية', page: 33, kind: 'نشاط', fig: 'الأشكال 1–6',
  title: 'مفهوم المغناطيسية: الحجر المغناطيسي والمغانط واستعمالاتها',
  desc: 'نتعرف على الحجر المغناطيسي (المغنيت Fe₃O₄) والمغانط الصناعية (ساق، حرف U)، ونشغّل استعمالات المغناطيس من الكتاب: رافعة الخردة، السماعة، الآلة الكاتبة، بوصلة الملاحة، وباب الثلاجة (س2)، مع القطار المغناطيسي المعلّق ➕.',
  tags: 'مفهوم المغناطيسية حجر مغناطيسي مغانط صناعية استعمالات',
  fact: ['منذ 25 قرناً اكتشف اليونانيون الحجر المغناطيسي (ص 33).', 'المغانط الكهربائية الضخمة ترفع أطناناً من حديد الخردة، وتُطفأ فتسقط الحمولة.', 'القطار المغناطيسي المعلّق يسير بسرعة تزيد على 400 km/h لأنه لا يلامس السكة.'],
  quiz: [
    { q: 'يتركب الحجر المغناطيسي (المغنيت) من:', o: ['أوكسيد الحديد الأسود Fe₃O₄', 'النحاس', 'الألمنيوم'], a: 0, why: 'ص 33: المغنيت يتركب من أوكسيد الحديد الأسود Fe₃O₄.' },
    { q: 'تستعمل البوصلة المغناطيسية لرسم خطوط المجال لأن إبرتها:', o: ['مغناطيس دائمي صغير يدور بحرية في مستوى أفقي حول محور شاقولي مدبب', 'مصنوعة من النحاس', 'مغناطيس كهربائي يفقد مغناطيسيته'], a: 0, why: 'أسئلة الفصل س1-1: الجواب (a).' },
    { q: 'علل: تكون المغانط ملائمة لأبواب خزانات الملابس والثلاجة:', o: ['لأنها تجذب الإطار الفولاذي فتغلق الباب بإحكام دون أقفال', 'لأنها تبرّد الثلاجة', 'لأنها تتنافر مع الإطار'], a: 0, why: 'أسئلة الفصل س2.' }
  ],
  parts: [{ id: 'g9m_lode', n: 'الحجر المغناطيسي والمغانط الصناعية (الشكلان 1، 2)' }, { id: 'g9m_uses', n: 'استعمالات المغناطيس (الأشكال 3–6) + س2' }] });
M92({ id: 'g9_mag_materials', sec: '2-2 المواد المغناطيسية', page: 34, kind: 'نشاط', fig: 'الشكلان 7 و 8',
  title: 'المواد المغناطيسية: الدايا والبارا والفيرو مغناطيسية',
  desc: 'نقارن الأنواع الثلاثة جنباً إلى جنب كما في الشكل 7 ونختبرها بمغناطيس قوي، ثم نفرز أشياء الشكل 8 (ما ينجذب وما لا ينجذب)، ونحل س3: تمييز ساق ألمنيوم وساق حديد ومغناطيس.',
  tags: 'مواد مغناطيسية دايا بارا فيرو تصنيف',
  fact: ['الماء والإنسان مواد دايامغناطيسية: بمغناطيس قوي جداً رُفع ضفدع حي في الهواء!', 'النيكل والكوبلت يستعملان مع الحديد لصنع مغانط دائمية قوية.'],
  quiz: [
    { q: 'تصنف المواد وفقاً لخواصها المغناطيسية إلى:', o: ['الدايا مغناطيسية والبارا مغناطيسية والفيرو مغناطيسية', 'الفيرو مغناطيسية فقط', 'الدايا والبارا فقط'], a: 0, why: 'أسئلة الفصل س1-4: الجواب (d).' },
    { q: 'مادة تنجذب للمغناطيس القوي تجاذباً ضعيفاً مثل الألمنيوم هي:', o: ['بارامغناطيسية', 'دايامغناطيسية', 'فيرومغناطيسية'], a: 0, why: 'ص 35 الشكل 7-b.' },
    { q: 'كيف تميّز المغناطيس بين ثلاث سيقان (ألمنيوم، حديد، مغناطيس)؟', o: ['هو الوحيد الذي يطرد أحد طرفي إبرة البوصلة', 'هو الأثقل', 'هو الذي لا يتأثر بالبوصلة'], a: 0, why: 'س3: التنافر لا يحدث إلا بين مغناطيسين.' }
  ],
  parts: [{ id: 'g9m_types', n: 'الأنواع الثلاثة (الشكل 7)' }, { id: 'g9m_sort', n: 'ماذا ينجذب؟ (الشكل 8)' }, { id: 'g9m_q3', n: 'س3: ميّز السيقان الثلاث' }] });
M92({ id: 'g9_mag_poles', sec: '2-2 الأقطاب المغناطيسية والقوى بينها', page: 36, kind: 'نشاط', fig: 'الأشكال 9–13',
  title: 'الأقطاب المغناطيسية والقوى بينها (نشاط 1)',
  desc: 'أين تكون القوة المغناطيسية أعظم؟ (البرادة والمشابك عند القطبين)، تقطيع المغناطيس (الأقطاب أزواج دائماً)، ونشاط (1) بالساق المعلّقة: المتشابهة تتنافر والمختلفة تتجاذب. ➕ حلقات مغناطيسية طافية، والأرض مغناطيس كبير.',
  tags: 'أقطاب تجاذب تنافر نشاط 1 تقطيع',
  fact: ['الأقطاب المغناطيسية لا توجد منفردة أبداً، حتى في أصغر قطعة (ص 36).', 'القطب الشمالي الجغرافي للأرض يقع قربه قطب مغناطيسي جنوبي، لذلك يتجه إليه القطب الشمالي للبوصلة.'],
  quiz: [
    { q: 'عند تقطيع ساق مغناطيسية إلى قطع صغيرة:', o: ['تمتلك كل قطعة قطبين أحدهما شمالي والآخر جنوبي', 'تمتلك كل قطعة قطباً واحداً', 'نحصل على قطع غير ممغنطة'], a: 0, why: 'أسئلة الفصل س1-6: الجواب (d).' },
    { q: 'قرّبنا القطب الشمالي لساق ممسوكة من القطب الجنوبي لساق معلّقة، فإنهما:', o: ['يتجاذبان', 'يتنافران', 'لا يتأثران'], a: 0, why: 'نشاط (1) الشكل 13-c.' },
    { q: 'الأقطاب المغناطيسية هي مناطق في المغناطيس تكون عندها القوة المغناطيسية:', o: ['أعظم ما يمكن', 'صفراً', 'أقل ما يمكن'], a: 0, why: 'ص 36.' }
  ],
  parts: [{ id: 'g9m_poles', n: 'أين القوة أعظم؟ (الشكل 9)' }, { id: 'g9m_cut', n: 'تقطيع المغناطيس (الشكل 10)' }, { id: 'g9m_force', n: 'نشاط (1): التجاذب والتنافر (الأشكال 11–13)' }, { id: 'g9m_rings', n: '➕ حلقات مغناطيسية طافية' }, { id: 'g9m_earth', n: '➕ الأرض مغناطيس كبير' }] });
M92({ id: 'g9_mag_field', sec: '2-3 المجال المغناطيسي', page: 39, kind: 'نشاط', fig: 'الأشكال 14–17 + س4، س5',
  title: 'المجال المغناطيسي وخطوطه (نشاط البرادة)',
  desc: 'الحيّز حول المغناطيس، خصائص خطوط المجال، رسمها بالبوصلة، نشاط الكشف ببرادة الحديد (مع الشكل 11)، وأسئلة الفصل س4 و س1-3، ثم ➕ مختبر الساق المغناطيسية على غرار PhET.',
  tags: 'مجال مغناطيسي خطوط المجال برادة بوصلة',
  fact: ['خطوط المجال لا وجود حقيقي لها؛ هي طريقة لرسم اتجاه المجال وشدته (ص 39).', 'شدة مجال مغناطيس الثلاجة نحو 5 mT، ومجال الأرض نحو 0.05 mT فقط.'],
  quiz: [
    { q: 'يمثل المجال المغناطيسي بخطوط تمتاز بأنها:', o: ['تتجه من القطب الشمالي نحو الجنوبي خارج المغناطيس', 'غير مقفلة', 'تتقاطع فيما بينها'], a: 0, why: 'أسئلة الفصل س1-5: الجواب (b).' },
    { q: 'وضعت بوصلة بين قطبي مغناطيس حرف U (S يساراً و N يميناً). تتجه إبرتها الشمالية نحو:', o: ['القطب S (اليسار)', 'القطب N (اليمين)', 'الأعلى'], a: 0, why: 'س1-3: الجواب (d)، المجال من N إلى S.' },
    { q: 'في نشاط برادة الحديد ننقر لوح الزجاج بلطف لكي:', o: ['تستطيع البرادة أن تتحرك وتترتب مع المجال', 'تتمغنط الزجاجة', 'تسقط البرادة'], a: 0, why: 'س5 والشكل 17.' }
  ],
  parts: [{ id: 'g9m_region', n: 'الحيّز حول المغناطيس (الشكل 14)' }, { id: 'g9m_lines', n: 'خصائص خطوط المجال (الشكل 15)' }, { id: 'g9m_plot', n: 'الرسم بالبوصلة (الشكل 16)' }, { id: 'g9m_filings', n: 'نشاط: برادة الحديد (الشكلان 17، 11)' }, { id: 'g9m_q4', n: 'أسئلة الفصل: س4 و س1-3' }, { id: 'g9m_lab', n: '➕ مختبر الساق المغناطيسية (PhET)' }] });
M92({ id: 'g9_mag_through', sec: '2-3 نفاذ المجال المغناطيسي خلال المواد', page: 40, kind: 'نشاط', fig: 'الشكلان 18 و 19',
  title: 'نفاذ المجال المغناطيسي خلال المواد (نشاطان)',
  desc: 'سؤال الكتاب: هل يمكن للمجال المغناطيسي النفاذ خلال جسم الإنسان أو مواد أخرى؟ نشاط (1): خلال كف اليد. نشاط (2): خلال الكارتون والخشب والزجاج، ثم الزجاج والماء. ثم «هل تعلم»: الحافظة المغناطيسية ➕ المشبك الطافي.',
  tags: 'نفاذ المجال جسم الإنسان كارتون زجاج ماء حافظة',
  fact: ['أجهزة الرنين المغناطيسي في المستشفيات تستعمل مجالاً قوياً ينفذ خلال جسم الإنسان لتصويره.', 'الحافظة المغناطيسية تحمي الساعات من المجالات الخارجية (ص 43).'],
  quiz: [
    { q: 'انجذبت المشابك إلى راحة اليد والمغناطيس فوق ظهر الكف، لأن:', o: ['المجال المغناطيسي ينفذ خلال جسم الإنسان', 'اليد ممغنطة', 'المشابك من الألمنيوم'], a: 0, why: 'نشاط (1) ص 40.' },
    { q: 'المسامير داخل أسطوانة زجاجية فيها ماء تتبع قطب المغناطيس خارجها، نستنتج أن المجال:', o: ['ينفذ خلال الزجاج والماء', 'لا ينفذ خلال الماء', 'يوقفه الزجاج'], a: 0, why: 'نشاط (2) الجزء b ص 41.' },
    { q: 'أي صفيحة تحجب المجال فيسقط المشبك الطافي؟', o: ['صفيحة حديد', 'صفيحة ألمنيوم', 'لوح زجاج'], a: 0, why: 'المواد الفيرومغناطيسية تجمع خطوط المجال (الحافظة المغناطيسية).' }
  ],
  parts: [{ id: 'g9m_hand', n: 'نشاط (1): خلال جسم الإنسان (الشكل 18)' }, { id: 'g9m_card', n: 'نشاط (2-a): كارتون، خشب، زجاج (19-a)' }, { id: 'g9m_water', n: 'نشاط (2-b): زجاج وماء (19-b)' }, { id: 'g9m_shield', n: 'هل تعلم + ➕ الحافظة المغناطيسية' }] });
M92({ id: 'g9_magnetize', sec: '2-4 تمغنط المواد', page: 42, kind: 'نشاط', fig: 'الأشكال 20–23',
  title: 'تمغنط المواد: الدلك، الحث، التيار المستمر، وفقدان المغناطيسية',
  desc: 'نمغنط إبرة فولاذ بالدلك، ومسماراً بالحث (ونقارن الحديد المطاوع بالفولاذ)، ونصنع مغناطيساً كهربائياً ونختبر العوامل الثلاثة، ثم نفقد المغناطيسية بالطرق والتسخين، مع الحافظة المغناطيسية. ➕ مقارنة الدلك بالحث، ومغناطيس كهربائي على غرار PhET.',
  tags: 'تمغنط دلك حث مغناطيس كهربائي فقدان المغناطيسية مناطق',
  fact: ['المغانط الدائمية تُصنع من الفولاذ لأنه يحتفظ بمغناطيسيته (أسئلة الفصل س1-2).', 'الحديد يفقد مغناطيسيته تماماً إذا سُخّن فوق نحو 770 °C.'],
  quiz: [
    { q: 'المغانط الدائمية تصنع من مادة:', o: ['الفولاذ', 'النحاس', 'الحديد المطاوع'], a: 0, why: 'أسئلة الفصل س1-2: الجواب (d).' },
    { q: 'دلكنا إبرة فولاذ بالقطب الشمالي N من اليسار إلى اليمين. الطرف الأيمن يصير:', o: ['قطباً جنوبياً S', 'قطباً شمالياً N', 'غير ممغنط'], a: 0, why: 'القطب المتولد في نهاية الدلك مخالف للقطب الدالك (ص 42).' },
    { q: 'لا يعتمد مقدار قوة المغناطيس الكهربائي على:', o: ['لون السلك', 'مقدار التيار', 'عدد اللفات'], a: 0, why: 'يعتمد على التيار وعدد اللفات ونوع المادة (ص 43).' }
  ],
  parts: [{ id: 'g9m_stroke', n: 'التمغنط بالدلك (الشكل 20)' }, { id: 'g9m_induce', n: 'التمغنط بالحث: حديد مطاوع وفولاذ (الشكل 21)' }, { id: 'g9m_coil', n: 'التمغنط بالتيار المستمر (الشكل 22)' }, { id: 'g9m_lose', n: 'فقدان المغناطيسية + الحافظة (الشكل 23)' }, { id: 'g9m_cmp', n: '➕ مقارنة: الدلك والحث' }, { id: 'g9m_emag', n: '➕ المغناطيس الكهربائي (PhET)' }] });
/* END */
