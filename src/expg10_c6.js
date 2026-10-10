'use strict';
/* ====================== الرابع العلمي — الفصل السادس: انعكاس وانكسار الضوء (ch 46, ص 95–113) ======================
   Merged experiments (book order): g10_rr_intro (6-1) · g10_rr_reflect (6-2) · g10_rr_refract (6-3) · g10_rr_snell (6-4)
   · g10_rr_tir (6-5) · g10_rr_fiber (6-6, 6-7) · g10_rr_review (questions ص 111–113).
   Local kit Q46 = Q42 + exact 2-D ray tracer (segments + circular arcs, Snell + Fresnel + total internal reflection),
   laser / ray box, protractor, mirror, glass, water, eye. All ray geometry is computed exactly (no fake bends). */
const Q46 = Object.assign(Object.create(Q42), {
  C: 3e8, col: '#7c3aed',
  /* Table 2 (ص 103): absolute refractive index for sodium light 589 nm */
  TAB: [['g', 'غازات', [['air', 'هواء', 1.00029], ['vap', 'بخار ماء', 1.00025], ['co2', 'ثنائي أوكسيد الكاربون', 1.00045]]],
    ['l', 'سوائل', [['water', 'الماء', 1.33], ['acet', 'الأسيتون', 1.36], ['ccl4', 'رابع كلوريد الكاربون', 1.46], ['glyc', 'الكليسرين', 1.47]]],
    ['s', 'مواد صلبة', [['poly', 'البوليستيرين', 1.49], ['crown', 'زجاج تاجي', 1.52], ['nacl', 'كلوريد الصوديوم', 1.54], ['zirc', 'الزركون', 1.92], ['dia', 'الماس', 2.42]]]],
  mat(k) { for (const g of Q46.TAB) for (const m of g[2]) if (m[0] === k) return m; return null; },
  /* wrap Greek/Latin/number runs (θ₁ = 30°) in LTR isolates when mixed with Arabic */
  iso(s) { s = String(s); if (!/[\u0600-\u06FF]/.test(s)) return s; return s.replace(/[(A-Za-z0-9θλαβγδπΔΦσ′₀-₉⁰-⁹°√][A-Za-z0-9θλαβγδπΔΦσ′₀-₉⁰-⁹° .=×÷+\-−\/√()·,:≈%<>→]*[A-Za-z0-9θλαβγδπΔΦσ′₀-₉⁰-⁹°)%]|[0-9θλ]/g, m => '\u2066' + m + '\u2069'); },
  T(ctx, s, x, y, o) { Q42.T(ctx, Q46.iso(s), x, y, o); },
  card(ctx, S, L, o) { o = Object.assign({ bd: '#7c3aed' }, o || {}); if (o.title) o.title = Q46.iso(o.title); return Q42.card(ctx, S, L.map(q => typeof q === 'string' ? Q46.iso(q) : Object.assign({}, q, { t: Q46.iso(q.t) })), o); },
  /* step-by-step card: st.q may be an array (Arabic sentence + pure formula lines) */
  steps(ctx, S, st, o = {}) { const isF = t => /[=×÷]/.test(t) && !/[\u0600-\u06FF]/.test(t);
    const L = [].concat(st.q).map(t => ({ t, s: 12, c: '#334155', w: 800, mono: isF(t) ? 1 : 0 })).concat(st.lines.slice(0, st.k).map((t, i) => ({ t, mono: isF(t) ? 1 : 0, c: i === st.lines.length - 1 ? '#b91c1c' : '#1e293b', w: i === st.lines.length - 1 ? 900 : 700 })));
    if (st.k < st.lines.length) L.push({ t: '⬇ اضغط «التالية» (' + st.k + '/' + st.lines.length + ')', c: '#7c3aed', s: 11.5, w: 800 });
    return Q46.card(ctx, S, L, Object.assign({ title: st.title, bd: '#be185d' }, o)); },
  banner(ctx, w, s, col, y) { Q26.banner(ctx, w, s, col || '#6d28d9', y); },
  drawChips(ctx, list) { list.forEach(b => Q42.drawBtn(ctx, b, Q46.iso(b._lab), b._on ? (b._col || '#7c3aed') : '#64748b', b._on)); },
  rad: d => d * Math.PI / 180, deg: r => r * 180 / Math.PI,
  f2: (v, d = 2) => (+v).toFixed(d),
  /* Snell: angle of refraction (rad) or null for total internal reflection */
  snell(n1, n2, a) { const s = n1 / n2 * Math.sin(a); return Math.abs(s) > 1 ? null : Math.asin(s); },
  crit(n1, n2) { return n2 < n1 ? Math.asin(n2 / n1) : null; },
  /* Fresnel reflectance for unpolarised light; ci = cos of incidence */
  fres(n1, n2, ci) { const st = n1 / n2 * Math.sqrt(Math.max(0, 1 - ci * ci)); if (st >= 1) return 1; const ct = Math.sqrt(1 - st * st);
    const rs = (n1 * ci - n2 * ct) / (n1 * ci + n2 * ct), rp = (n1 * ct - n2 * ci) / (n1 * ct + n2 * ci); return (rs * rs + rp * rp) / 2; },
  /* ---------- exact 2-D ray tracer ----------
     edges: {k:'s', a:[x,y], b:[x,y], mir?, R?} or {k:'c', c:[x,y], r, a0, a1 (ccw sweep a0→a1, canvas angles), mir?}
     nAt(p) → refractive index at point p. Returns {segs:[{a,b,I,path,n}], hits:[{q,N,n1,n2,ci,tir,path,d}]} */
  hit(e, p, d) {
    if (e.k === 's') { const ex = e.b[0] - e.a[0], ey = e.b[1] - e.a[1], den = d[0] * ey - d[1] * ex; if (Math.abs(den) < 1e-12) return null;
      const wx = e.a[0] - p[0], wy = e.a[1] - p[1], t = (wx * ey - wy * ex) / den, u = (wx * d[1] - wy * d[0]) / den;
      if (t < 1e-6 || u < -1e-9 || u > 1 + 1e-9) return null; const L = Math.hypot(ex, ey); return { t, N: [ey / L, -ex / L] }; }
    const ox = p[0] - e.c[0], oy = p[1] - e.c[1], b = ox * d[0] + oy * d[1], c = ox * ox + oy * oy - e.r * e.r, D = b * b - c; if (D < 0) return null;
    const sq = Math.sqrt(D); let best = null;
    for (const t of [-b - sq, -b + sq]) { if (t < 1e-6) continue; const x = ox + d[0] * t, y = oy + d[1] * t; if (e.a0 != null) { let a = Math.atan2(y, x) - e.a0, sw = e.a1 - e.a0; while (a < 0) a += TAU; while (sw < 0) sw += TAU; if (a > sw + 1e-9) continue; }
      if (!best || t < best.t) best = { t, N: [x / e.r, y / e.r] }; }
    return best;
  },
  trace(E, nAt, p, d, o = {}) {
    const segs = [], hits = [], minI = o.minI ?? .025, maxD = o.depth || 16, far = o.far || 2400, part = o.part !== false;
    const go = (p, d, I, dep, path) => {
      let best = null; for (const e of E) { const h = Q46.hit(e, p, d); if (h && (!best || h.t < best.t)) { best = h; best.e = e; } }
      if (!best) { segs.push({ a: p, b: [p[0] + d[0] * far, p[1] + d[1] * far], I, path, n: nAt([p[0] + d[0] * 2, p[1] + d[1] * 2]), out: 1 }); return; }
      const q = [p[0] + d[0] * best.t, p[1] + d[1] * best.t]; segs.push({ a: p, b: q, I, path, n: nAt([(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]) });
      if (dep >= maxD) return;
      let N = best.N, ci = -(d[0] * N[0] + d[1] * N[1]); if (ci < 0) { N = [-N[0], -N[1]]; ci = -ci; }
      const r = [d[0] + 2 * ci * N[0], d[1] + 2 * ci * N[1]];
      if (best.e.mir) { hits.push({ q, N, ci, mir: 1, path, d, I }); const R = best.e.R ?? .9; if (I * R > minI) go(q, r, I * R, dep + 1, path + 'r'); return; }
      const n1 = nAt([q[0] - d[0] * .02, q[1] - d[1] * .02]), n2 = nAt([q[0] + d[0] * .02, q[1] + d[1] * .02]);
      if (Math.abs(n1 - n2) < 1e-12) { go(q, d, I, dep, path); return; }
      const eta = n1 / n2, s2 = eta * eta * (1 - ci * ci), tir = s2 >= 1;
      let R = 1, T = null; if (!tir) { const c2 = Math.sqrt(1 - s2); R = o.ar && ci > .985 ? 0 : Q46.fres(n1, n2, ci); T = [eta * d[0] + (eta * ci - c2) * N[0], eta * d[1] + (eta * ci - c2) * N[1]]; }
      hits.push({ q, N, n1, n2, ci, tir, path, d, I, R });
      if (tir) { go(q, r, I, dep + 1, path + 'r'); return; }
      if (part) { if (I * (1 - R) > minI) go(q, T, I * (1 - R), dep + 1, path + 't'); if (I * R > minI) go(q, r, I * R, dep + 1, path + 'r'); }
      else go(q, T, I, dep + 1, path + 't');
    };
    go(p, d, o.I ?? 1, 0, ''); return { segs, hits };
  },
  /* polygon helpers */
  polyE(P, o = {}) { return P.map((a, i) => Object.assign({ k: 's', a, b: P[(i + 1) % P.length] }, o)); },
  inPoly(P, p) { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const a = P[i], b = P[j]; if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; },
  rotP(P, c, a) { const C = Math.cos(a), s = Math.sin(a); return P.map(p => [c[0] + (p[0] - c[0]) * C - (p[1] - c[1]) * s, c[1] + (p[0] - c[0]) * s + (p[1] - c[1]) * C]); },
  dir: a => [Math.cos(a), Math.sin(a)],
  ease(S, k, tgt, dt, r = 9) { const v = S[k] == null ? tgt : S[k]; S[k] = Math.abs(tgt - v) < 1e-4 ? tgt : v + (tgt - v) * Math.min(1, dt * r); },
  /* wavelength (nm) → css colour */
  wl(nm, a = 1) { let r = 0, g = 0, b = 0; if (nm < 440) { r = (440 - nm) / 60; b = 1; } else if (nm < 490) { g = (nm - 440) / 50; b = 1; } else if (nm < 510) { g = 1; b = (510 - nm) / 20; } else if (nm < 580) { r = (nm - 510) / 70; g = 1; } else if (nm < 645) { r = 1; g = (645 - nm) / 65; } else r = 1;
    return 'rgba(' + Math.round(r * 255) + ',' + Math.round(g * 255) + ',' + Math.round(b * 255) + ',' + a + ')'; }
});

/* ---------- Q46 drawing kit ---------- */
Object.assign(Q46, {
  /* dark optics bench: dim room so the beams glow */
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#0b1020'); g.addColorStop(.6, '#151b2e'); g.addColorStop(1, '#1e2537'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(148,163,184,.06)'; ctx.lineWidth = 1; for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); } for (let y = 0; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); } }); },
  /* glowing laser beam a→b with intensity I (0..1) */
  beam(ctx, a, b, I = 1, col = '#ff3030', wd = 3, o = {}) {
    if (I < .004) return; K.raw(ctx, () => { ctx.save(); ctx.lineCap = 'round'; ctx.globalCompositeOperation = o.comp || 'lighter'; const al = clamp(I, 0, 1);
      const ln = (lw, a2, c) => { ctx.globalAlpha = a2; ctx.strokeStyle = c; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); };
      ln(wd * 5, .10 * Math.sqrt(al), col); ln(wd * 2.2, .25 * Math.sqrt(al), col); ln(wd, .35 + .6 * Math.sqrt(al), col); if (al > .2 && !o.comp) ln(wd * .35, .7 * al, '#fff3f3');
      ctx.restore();
      if (o.arrow !== false && Math.hypot(b[0] - a[0], b[1] - a[1]) > 50) { const L = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L, f = o.at ?? (L > 600 ? 120 / L : .5), mx = a[0] + (b[0] - a[0]) * f, my = a[1] + (b[1] - a[1]) * f, s = 7;
        ctx.save(); ctx.globalAlpha = .45 + .55 * Math.sqrt(al); ctx.fillStyle = o.ac || col; ctx.beginPath(); ctx.moveTo(mx + ux * s, my + uy * s); ctx.lineTo(mx - ux * s - uy * s * .8, my - uy * s + ux * s * .8); ctx.lineTo(mx - ux * s + uy * s * .8, my - uy * s - ux * s * .8); ctx.closePath(); ctx.fill(); ctx.restore(); } });
  },
  /* draw every traced segment; dust>0 adds scattering speckles inside media (chalk powder) */
  drawTrace(ctx, T, col = '#ff3030', wd = 3, o = {}) { if (o.clip) { K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(o.clip[0], o.clip[1], o.clip[2], o.clip[3]); ctx.clip(); }); } T.segs.forEach(s => { if (o.skip && o.skip(s)) return; const I = o.I ? o.I(s) : s.I; Q46.beam(ctx, s.a, s.b, I, (o.colf && o.colf(s)) || col, wd, { arrow: o.arrow !== false && I > .08, comp: o.comp }); }); if (o.clip) K.raw(ctx, () => ctx.restore()); },
  /* laser pointer whose aperture is at (x,y), firing in direction ang */
  laser(ctx, x, y, ang, o = {}) {
    const L = o.L || 78, R = o.R || 11; K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
      ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 8; const g = ctx.createLinearGradient(0, -R, 0, R); g.addColorStop(0, '#9ca3af'); g.addColorStop(.35, '#f3f4f6'); g.addColorStop(.7, '#4b5563'); g.addColorStop(1, '#1f2937');
      ctx.fillStyle = g; rr(ctx, -L, -R, L - 6, 2 * R, 5); ctx.fill(); ctx.shadowBlur = 0; ctx.fillStyle = '#111827'; ctx.fillRect(-8, -R * .7, 8, R * 1.4);
      ctx.fillStyle = o.on === false ? '#7f1d1d' : '#ef4444'; ctx.beginPath(); ctx.arc(-L * .55, -R + 1, 3, 0, TAU); ctx.fill();
      ctx.fillStyle = 'rgba(15,23,42,.55)'; ctx.fillRect(-L * .85, -R, 3, 2 * R); ctx.fillRect(-L * .78, -R, 3, 2 * R);
      if (o.on !== false) { const gg = ctx.createRadialGradient(0, 0, 0, 0, 0, 12); gg.addColorStop(0, 'rgba(255,255,255,.95)'); gg.addColorStop(.4, 'rgba(255,60,60,.7)'); gg.addColorStop(1, 'rgba(255,60,60,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(0, 0, 12, 0, TAU); ctx.fill(); }
      ctx.restore(); });
  },
  /* ray box (white light): aperture slit at (x,y) */
  rayBox(ctx, x, y, ang, o = {}) {
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 10;
      const g = ctx.createLinearGradient(0, -24, 0, 24); g.addColorStop(0, '#475569'); g.addColorStop(.3, '#94a3b8'); g.addColorStop(1, '#1e293b'); ctx.fillStyle = g; rr(ctx, -72, -24, 66, 48, 6); ctx.fill(); ctx.shadowBlur = 0;
      ctx.fillStyle = '#0f172a'; ctx.fillRect(-8, -16, 8, 32); ctx.fillStyle = '#fef9c3'; ctx.fillRect(-3, -2.5, 3, 5);
      for (let k = 0; k < 4; k++) { ctx.fillStyle = 'rgba(15,23,42,.6)'; ctx.fillRect(-62 + k * 9, -20, 4, 10); }
      const gg = ctx.createRadialGradient(-38, 6, 2, -38, 6, 14); gg.addColorStop(0, '#fffbeb'); gg.addColorStop(1, 'rgba(253,224,71,.0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(-38, 6, 14, 0, TAU); ctx.fill(); ctx.restore(); });
  },
  /* circular protractor centred at (cx,cy); 0° along the normal direction nA (both ways), 90° along the surface */
  protractor(ctx, cx, cy, R, nA, o = {}) {
    K.raw(ctx, () => { ctx.save(); ctx.translate(cx, cy); ctx.rotate(nA); const a0 = o.half ? -Math.PI / 2 : 0, a1 = o.half ? Math.PI / 2 : TAU;
      ctx.fillStyle = o.fill || 'rgba(255,255,255,.07)'; ctx.beginPath(); if (o.half) { ctx.moveTo(0, 0); ctx.arc(0, 0, R, a0, a1); ctx.closePath(); } else ctx.arc(0, 0, R, 0, TAU); ctx.fill();
      ctx.strokeStyle = o.line || 'rgba(226,232,240,.55)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(0, 0, R, a0, a1); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, R * .78, a0, a1); ctx.stroke();
      for (let k = 0; k < 360; k++) { const a = k * Math.PI / 180; if (o.half && (k > 90 && k < 270)) continue; const L = k % 10 === 0 ? 12 : k % 5 === 0 ? 8 : 4; ctx.lineWidth = k % 10 === 0 ? 1.3 : .7; ctx.beginPath(); ctx.moveTo(Math.cos(a) * R, Math.sin(a) * R); ctx.lineTo(Math.cos(a) * (R - L), Math.sin(a) * (R - L)); ctx.stroke(); }
      ctx.restore(); });
    for (let k = 0; k < 360; k += (o.step || 10)) { if (o.half && (k > 90 && k < 270)) continue; const v = k % 180 <= 90 ? k % 180 : 180 - k % 180, a = nA + k * Math.PI / 180; Q42.T(ctx, v + '°', cx + Math.cos(a) * (R - 22), cy + Math.sin(a) * (R - 22), { s: 8.5, w: 700, c: o.tc || 'rgba(226,232,240,.75)' }); }
  },
  /* angle arc at centre c between directions a0 and a1 (shorter way) + label */
  arcAng(ctx, c, r, a0, a1, col, lab, o = {}) {
    let d = a1 - a0; while (d > Math.PI) d -= TAU; while (d < -Math.PI) d += TAU; if (Math.abs(d) < .005) return;
    K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.fillStyle = col; ctx.globalAlpha = .18; ctx.beginPath(); ctx.moveTo(c[0], c[1]); ctx.arc(c[0], c[1], r, a0, a0 + d, d < 0); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; ctx.beginPath(); ctx.arc(c[0], c[1], r, a0, a0 + d, d < 0); ctx.stroke(); ctx.restore(); });
    if (lab) { const m = a0 + d / 2, rr2 = r + (o.lr || 16); Q42.T(ctx, lab, c[0] + Math.cos(m) * rr2, c[1] + Math.sin(m) * rr2, { s: o.s || 11, w: 900, c: '#fff', bg: col }); }
  },
  /* dashed normal through p along direction a (both sides, length L each) */
  normal(ctx, p, a, L = 120, o = {}) { Q41.line(ctx, [[p[0] - Math.cos(a) * (o.L2 ?? L), p[1] - Math.sin(a) * (o.L2 ?? L)], [p[0] + Math.cos(a) * L, p[1] + Math.sin(a) * L]], o.c || 'rgba(255,255,255,.75)', 1.5, [7, 5]); if (o.lab) Q42.T(ctx, o.lab, p[0] + Math.cos(a) * (L + 14), p[1] + Math.sin(a) * (L + 14), { s: 10, w: 800, c: '#e2e8f0' }); },
  /* plane mirror a→b, silver on the side opposite to n (unit normal of reflecting face) */
  mirror(ctx, a, b, o = {}) {
    K.raw(ctx, () => { const L = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L; let nx = -uy, ny = ux; if (o.side === -1) { nx = -nx; ny = -ny; }
      ctx.save(); ctx.lineCap = 'butt'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.4; for (let s = 6; s < L; s += 9) { const x = a[0] + ux * s, y = a[1] + uy * s; ctx.beginPath(); ctx.moveTo(x - nx * 3, y - ny * 3); ctx.lineTo(x - nx * 12 - ux * 6, y - ny * 12 - uy * 6); ctx.stroke(); }
      const g = ctx.createLinearGradient(a[0], a[1], b[0], b[1]); g.addColorStop(0, '#cbd5e1'); g.addColorStop(.5, '#f8fafc'); g.addColorStop(1, '#94a3b8'); ctx.strokeStyle = g; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(a[0] - nx * 2, a[1] - ny * 2); ctx.lineTo(b[0] - nx * 2, b[1] - ny * 2); ctx.stroke();
      ctx.strokeStyle = 'rgba(186,230,253,.9)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(a[0] + nx, a[1] + ny); ctx.lineTo(b[0] + nx, b[1] + ny); ctx.stroke(); ctx.restore(); });
  },
  /* transparent solid (glass, diamond…) along a path builder */
  glass(ctx, path, o = {}) {
    K.raw(ctx, () => { ctx.save(); ctx.beginPath(); path(ctx); const bb = o.bb || [0, 0, 0, 300]; const g = ctx.createLinearGradient(bb[0], bb[1], bb[2], bb[3]); const c = o.tint || [165, 243, 252];
      g.addColorStop(0, 'rgba(' + c + ',' + (o.a1 ?? .26) + ')'); g.addColorStop(1, 'rgba(' + c + ',' + (o.a2 ?? .12) + ')'); ctx.fillStyle = g; ctx.fill();
      ctx.strokeStyle = o.bd || 'rgba(207,250,254,.85)'; ctx.lineWidth = o.lw || 2; ctx.stroke(); ctx.restore(); });
  },
  polyPath(P) { return ctx => { P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); }; },
  /* water body in a glass tank (x,y0)-(x+w,y1), surface at lvl */
  tank(ctx, x, y0, w, y1, lvl, o = {}) {
    K.raw(ctx, () => { const g = ctx.createLinearGradient(0, lvl, 0, y1); g.addColorStop(0, o.c1 || 'rgba(56,189,248,.30)'); g.addColorStop(1, o.c2 || 'rgba(14,116,144,.45)'); ctx.fillStyle = g; ctx.fillRect(x, lvl, w, y1 - lvl);
      ctx.strokeStyle = 'rgba(186,230,253,.9)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x, lvl); ctx.lineTo(x + w, lvl); ctx.stroke();
      ctx.strokeStyle = 'rgba(203,213,225,.8)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.lineTo(x + w, y1); ctx.lineTo(x + w, y0); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(x + 4, y0, 7, y1 - y0); });
  },
  /* stylised eye at (x,y) looking in direction a */
  eye(ctx, x, y, a, s = 1) {
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s); ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-16, 0); ctx.quadraticCurveTo(0, -14, 16, 0); ctx.quadraticCurveTo(0, 14, -16, 0); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#0369a1'; ctx.beginPath(); ctx.arc(6, 0, 6, 0, TAU); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(8, 0, 2.8, 0, TAU); ctx.fill(); ctx.restore(); });
  },
  /* label with dark-friendly default */
  tag(ctx, s, x, y, bg, o = {}) { Q46.T(ctx, s, x, y, Object.assign({ s: 11, w: 900, c: '#fff', bg }, o)); },
  lab(ctx, s, x, y, o = {}) { Q46.T(ctx, s, x, y, Object.assign({ s: 11, w: 800, c: '#e2e8f0' }, o)); },
  /* example chips: list [[key,label]], + «التالية»; EX[key] = {lines, load(S)} */
  exChips(S, id, list, y, EX, o = {}) { return Q42.chips(S, id, list.concat([['nx', '⬇ التالية']]), y, S.ex, (S2, k) => { if (k === 'nx') { if (!S2.ex) { const k0 = list.find(q => EX[q[0]])[0]; S2.ex = k0; S2.k = 0; EX[k0].load && EX[k0].load(S2); } S2.k = Math.min((S2.k || 0) + 1, EX[S2.ex].lines.length); return; } if (!EX[k]) { S2.ex = null; S2.k = 0; return; } S2.ex = k; S2.k = 0; EX[k].load && EX[k].load(S2); }, Object.assign({ bw: 120, col: '#be185d' }, o)); },
  /* bar meter (0..1) */
  ltr: s => '\u2066' + s + '\u2069',
  /* chalk-dust speckles that make a beam visible inside a liquid/solid */
  dust(ctx, T, col = 'rgba(255,120,120,', only, clip) { K.raw(ctx, () => { ctx.save(); if (clip) { ctx.beginPath(); ctx.rect(clip[0], clip[1], clip[2], clip[3]); ctx.clip(); } ctx.globalCompositeOperation = 'lighter'; T.segs.forEach((sg, j) => { if (sg.n <= 1.001 || (only && !only(sg))) return; const L = Math.min(900, Math.hypot(sg.b[0] - sg.a[0], sg.b[1] - sg.a[1])), ux = (sg.b[0] - sg.a[0]) / Math.max(1, Math.hypot(sg.b[0] - sg.a[0], sg.b[1] - sg.a[1])), uy = (sg.b[1] - sg.a[1]) / Math.max(1, Math.hypot(sg.b[0] - sg.a[0], sg.b[1] - sg.a[1]));
    for (let k = 0, i = 0; k < L; k += 5, i++) { const hsh = Math.sin((i + 1) * 12.9898 + j * 78.233) * 43758.5453, fr = hsh - Math.floor(hsh), off = (fr - .5) * 9; ctx.fillStyle = col + (.5 * sg.I * (1 - Math.abs(off) / 6)) + ')'; ctx.fillRect(sg.a[0] + ux * k - uy * off, sg.a[1] + uy * k + ux * off, 1.6, 1.6); } }); ctx.restore(); }); },
  bar(ctx, x, y, w, h, v, col, lab, txt) { K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.08)'; rr(ctx, x, y, w, h, 4); ctx.fill(); ctx.fillStyle = col; rr(ctx, x, y, Math.max(2, w * clamp(v, 0, 1)), h, 4); ctx.fill(); }); if (lab) Q42.T(ctx, lab, x + w + 8, y + h / 2, { s: 10.5, w: 800, c: '#e2e8f0', a: 'left' }); if (txt) Q42.T(ctx, txt, x + 6, y + h / 2, { s: 10, w: 900, c: '#fff', a: 'left' }); }
});

/* =============== A1 — سقوط الضوء على سطح: انعكاس ونفاذ وامتصاص + سرعة الضوء في الوسطين (الأشكال 1-6، 2-6، 4-6) =============== */
(() => {
  const MAT = { glass: ['زجاج', 1.52, .02], water: ['ماء', 1.33, .03], mirror: ['مرآة مستوية', 0, .10], black: ['سطح أسود معتم', 0, .95] };
  const D = { id: 'g10_r_intro', page: 95, fig: 'الأشكال 1-6 و 2-6 و 4-6',
    desc: 'إذا سقط الضوء على سطح ما انعكس جزء منه، ونفذ جزء آخر خلال الأجسام الشفافة، وامتص الباقي ذلك السطح (الشكل 2-6). انعكاس الضوء: ارتداد الضوء الساقط على سطح فاصل بين وسطين إلى الوسط الذي قدم منه. انكسار الضوء: تغير اتجاه الشعاع عند انتقاله مائلاً بين وسطين شفافين مختلفين في الكثافة الضوئية، لأن سرعة الضوء تقل كلما كبرت الكثافة الضوئية للوسط (الشكل 4-6).',
    tags: 'انعكاس انكسار امتصاص نفاذ كثافة ضوئية سرعة الضوء v1 v2 زجاج ماء مرآة سطح أسود العمود المقام',
    tools: ['مصدر ليزري', 'لوح زجاج', 'حوض ماء', 'مرآة مستوية', 'سطح أسود'],
    steps: ['اسحب المصدر الليزري حول نقطة السقوط لتغيير زاوية السقوط.', 'بدّل السطح: زجاج، ماء، مرآة، سطح أسود، وقارن أشرطة الطاقة: منعكس، نافذ، ممتص.', 'شغّل «نبضات الضوء» ولاحظ أن النبضات تتقارب داخل الزجاج: سرعة الضوء فيه أقل (الشكل 4-6).'],
    concl: ['عند سقوط الضوء على سطح: ينعكس جزء، وينفذ جزء في الأجسام الشفافة، ويمتص السطح الباقي.', 'الانعكاس يعيد الضوء إلى الوسط الذي قدم منه، والانكسار يغير اتجاهه عند دخوله وسطاً آخر بصورة مائلة.', 'كلما كبرت الكثافة الضوئية للوسط قلت سرعة الضوء فيه: v₂ في الزجاج أقل من v₁ في الهواء.', 'السقوط العمودي لا يغير اتجاه الضوء النافذ.'],
    laws: ['g10_rl_nabs'],
    controls: [R('ang', 'زاوية السقوط θ₁', 0, 85, 45, 1, '°'), TG('nrm', 'العمود المقام', true, null, 'ray'), TG('spd', 'نبضات الضوء: السرعة في الوسطين', true, null, 'wave')],
    setup(S) { S.m = 'glass'; S.a = 45; S.clk = 0; },
    update(S, dt) { Q46.ease(S, 'a', S.p.ang, dt); S.clk = (S.clk + dt) % 1000; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = Math.min(w - 350, 480), sy = 330, th = 120; return { w, h, L, x0, x1, sy, th, O: [(x0 + x1) / 2, sy] }; },
    scene(S, g) { const m = MAT[S.m], a = Q46.rad(S.a), P = [g.O[0] - 230 * Math.sin(a), g.O[1] - 230 * Math.cos(a)], d = [Math.sin(a), Math.cos(a)];
      const B = [[g.x0, g.sy], [g.x1, g.sy], [g.x1, g.sy + g.th], [g.x0, g.sy + g.th]];
      let E, nAt; if (m[1]) { E = Q46.polyE(B); nAt = p => Q46.inPoly(B, p) ? m[1] : 1; } else { E = [{ k: 's', a: B[0], b: B[1], mir: 1, R: S.m === 'mirror' ? .9 : .05 }]; nAt = () => 1; }
      const T = Q46.trace(E, nAt, P, d, { minI: .03, depth: 5 }); const ci = Math.cos(a);
      const R = m[1] ? Q46.fres(1, m[1], ci) : 1 - m[2], A = m[2], Tr = m[1] ? Math.max(0, 1 - R - A) : 0; return { m, a, P, d, B, T, R, A, Tr }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = D.scene(S, g), m = c.m; Q46.bg(ctx, w, h);
      // the surface
      if (S.m === 'glass') Q46.glass(ctx, Q46.polyPath(c.B), { bb: [0, g.sy, 0, g.sy + g.th] });
      else if (S.m === 'water') Q46.tank(ctx, g.x0, g.sy - 30, g.x1 - g.x0, g.sy + g.th, g.sy);
      else if (S.m === 'mirror') Q46.mirror(ctx, [g.x0, g.sy], [g.x1, g.sy], { side: -1 });
      else K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, g.sy, 0, g.sy + 40); gg.addColorStop(0, '#27272a'); gg.addColorStop(1, '#09090b'); ctx.fillStyle = gg; ctx.fillRect(g.x0, g.sy, g.x1 - g.x0, 40); const hg = ctx.createRadialGradient(g.O[0], g.sy + 4, 2, g.O[0], g.sy + 4, 60); hg.addColorStop(0, 'rgba(249,115,22,' + (.25 + .3 * Math.sin(S.clk * 3) ** 2) + ')'); hg.addColorStop(1, 'rgba(249,115,22,0)'); ctx.fillStyle = hg; ctx.fillRect(g.O[0] - 60, g.sy, 120, 40); });
      Q46.lab(ctx, 'هواء', g.x0 + 24, g.sy - 16); if (m[1]) Q46.lab(ctx, m[0], g.x0 + 30, g.sy + 18, { c: '#a5f3fc' });
      if (S.p.nrm) Q46.normal(ctx, g.O, -Math.PI / 2, 150, { L2: S.m === 'black' || S.m === 'mirror' ? 0 : g.th, lab: 'العمود المقام' });
      Q46.drawTrace(ctx, c.T, '#ff3030', 3, { clip: [0, 0, w, g.sy + g.th + 18] });
      Q46.laser(ctx, c.P[0], c.P[1], Math.atan2(c.d[1], c.d[0]));
      // angles at O
      const up = -Math.PI / 2, ain = Math.atan2(-c.d[1], -c.d[0]); Q46.arcAng(ctx, g.O, 54, up, ain, '#dc2626', 'θ₁');
      const rs = c.T.segs.find(s => s.path === 'r'); if (rs && c.R > .02) Q46.arcAng(ctx, g.O, 46, up, Math.atan2(rs.b[1] - rs.a[1], rs.b[0] - rs.a[0]), '#2563eb', 'θ′₁');
      const ts = c.T.segs.find(s => s.path === 't'); if (ts && S.a > 1) Q46.arcAng(ctx, g.O, 50, Math.PI / 2, Math.atan2(ts.b[1] - ts.a[1], ts.b[0] - ts.a[0]), '#16a34a', 'θ₂');
      // light pulses: same emission rate, slower inside the medium (Fig 6-4)
      if (S.p.spd && ts) { const L1 = Math.hypot(g.O[0] - c.P[0], g.O[1] - c.P[1]), L2 = Math.hypot(ts.b[0] - ts.a[0], ts.b[1] - ts.a[1]), V = 110, per = .55;
        K.raw(ctx, () => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let k = 0; k < 40; k++) { const s = ((S.clk % (per * 40)) - k * per) * V; if (s < 0) continue; let x, y; if (s < L1) { x = c.P[0] + c.d[0] * s; y = c.P[1] + c.d[1] * s; } else { const s2 = (s - L1) / m[1]; if (s2 > L2) continue; x = ts.a[0] + (ts.b[0] - ts.a[0]) * s2 / L2; y = ts.a[1] + (ts.b[1] - ts.a[1]) * s2 / L2; }
          const gg = ctx.createRadialGradient(x, y, 0, x, y, 9); gg.addColorStop(0, 'rgba(255,255,255,.95)'); gg.addColorStop(1, 'rgba(255,80,80,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(x, y, 9, 0, TAU); ctx.fill(); } ctx.restore(); });
        Q46.tag(ctx, 'v₁ = 3×10⁸ m/s', (c.P[0] + g.O[0]) / 2 - 70, (c.P[1] + g.O[1]) / 2, '#b91c1c'); Q46.tag(ctx, 'v₂ = ' + Q42.sci(3e8 / m[1], 3, 'm/s'), g.O[0] + 70, g.sy + g.th / 2 + 6, '#0e7490'); }
      // energy bars
      const by = g.sy + g.th + 34, bx = g.x0 + 10, bw = 220; Q46.lab(ctx, 'أين تذهب طاقة الضوء الساقط؟', bx + 150, by - 12, { s: 11.5, w: 900 });
      Q46.bar(ctx, bx, by, bw, 18, c.R, '#3b82f6', 'منعكس', (c.R * 100).toFixed(1) + '%'); Q46.bar(ctx, bx, by + 26, bw, 18, c.Tr, '#16a34a', 'نافذ', (c.Tr * 100).toFixed(1) + '%'); Q46.bar(ctx, bx, by + 52, bw, 18, c.A, '#f97316', 'ممتص', (c.A * 100).toFixed(1) + '%');
      const Lc = [{ t: 'ينعكس جزء: ' + (c.R * 100).toFixed(1) + '%', c: '#1d4ed8', w: 900 }, { t: 'ينفذ جزء: ' + (c.Tr * 100).toFixed(1) + '%', c: '#15803d', w: 900 }, { t: 'يمتص السطح الباقي: ' + (c.A * 100).toFixed(1) + '%', c: '#c2410c', w: 900 }];
      if (m[1]) Lc.push({ t: 'v₂ = c / n = ' + Q42.sci(3e8 / m[1], 3, 'm/s'), mono: 1 }, { t: 'السرعة v₂ أقل من v₁ لأن كثافة ' + m[0] + ' الضوئية أكبر', c: '#334155' }, { t: S.a < .5 ? 'سقوط عمودي: لا انكسار' : 'سقوط مائل: الشعاع ينكسر', c: '#7c3aed', w: 800 });
      else Lc.push({ t: S.m === 'mirror' ? 'المرآة تعكس معظم الضوء ولا ينفذ منه شيء' : 'السطح الأسود يمتص معظم الضوء فيسخن', c: '#334155' });
      Q46.card(ctx, S, Lc, { title: 'سقوط الضوء على ' + m[0], y: 70, wd: 310 });
      Q46.drawChips(ctx, D.chips(S, g)); Q46.banner(ctx, w, 'اسحب الليزر لتغيير زاوية السقوط، وبدّل السطح');
    },
    chips(S, g) { return Q42.chips(S, 'm', Object.keys(MAT).map(k => [k, MAT[k][0]]), g.h - 84, S.m, (S2, k) => { S2.m = k; }, { bw: 150, col: '#7c3aed' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), a = Q46.rad(S.a);
      return [{ id: 'src', x: g.O[0] - 230 * Math.sin(a), y: g.O[1] - 230 * Math.cos(a), r: 26, cx: g.O[0], cy: g.O[1], keep: true, tip: 'اسحب الليزر حول نقطة السقوط', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'ang', Math.round(clamp(Q46.deg(-d.ang - Math.PI / 2), 0, 85))); } }].concat(D.chips(S, g)); },
    readings(S) { const c = D.scene(S, D.geo(S)); return [rd('السطح', c.m[0]), rd('زاوية السقوط θ₁', S.p.ang + '°'), rd('المنعكس', (c.R * 100).toFixed(1) + '%'), rd('النافذ', (c.Tr * 100).toFixed(1) + '%'), rd('الممتص', (c.A * 100).toFixed(1) + '%')]; },
    record(S) { const c = D.scene(S, D.geo(S)); return { m: c.m[0], a: S.p.ang, r: +(c.R * 100).toFixed(1), t: +(c.Tr * 100).toFixed(1), ab: +(c.A * 100).toFixed(1) }; },
    cols: [['m', 'السطح'], ['a', 'θ₁ (°)'], ['r', 'منعكس %'], ['t', 'نافذ %'], ['ab', 'ممتص %']],
    explain(S) { return Q26.ex('جزء من الشعاع يرتد عن السطح، وجزء ينفذ وينحرف داخل الزجاج أو الماء، والسطح الأسود يمتص معظمه ويسخن.', 'الضوء ينتقل في الزجاج بسرعة أقل منها في الهواء (كثافته الضوئية أكبر)، فإذا سقط مائلاً تغير اتجاهه: هذا هو الانكسار. وكلما زادت زاوية السقوط زادت نسبة الضوء المنعكس.', 'صورة الجبال والأشجار في ماء البحيرة الساكن سببها انعكاس الضوء (الشكل 1-6).'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — العمق الحقيقي والظاهري: السمكة والقطعة النقدية والقلم المكسور (الشكل 3-6) =============== */
(() => {
  const PX = 10; // px per cm
  const D = { id: 'g10_r_depth', page: 95, fig: 'الشكل 3-6',
    desc: 'لماذا تبدو السمكة في حوض الماء على عمق أقل من عمقها الحقيقي؟ ولماذا يبدو القلم مكسوراً في كأس ماء؟ السبب انكسار الضوء: الأشعة الخارجة من الجسم تنكسر مبتعدة عن العمود المقام عند خروجها إلى الهواء، فتراها العين صادرة من نقطة أعلى (الصورة الظاهرية). الأشعة هنا محسوبة بدقة بقانون سنيل لموقع العين الفعلي.',
    tags: 'العمق الظاهري العمق الحقيقي سمكة قلم مكسور قطعة نقود انكسار الضوء حوض ماء الشكل 3-6',
    tools: ['حوض ماء', 'سمكة أو قطعة نقود', 'قلم', 'عين الراصد'],
    steps: ['اسحب العين فوق الماء: تتحرك الصورة الظاهرية (الشبح) لأن الأشعة الواصلة إلى العين تتغير.', 'اسحب الجسم داخل الماء وقارن العمق الحقيقي بالعمق الظاهري.', 'اختر «قلم» ولاحظ كيف يبدو القلم مكسوراً عند سطح الماء.', 'غيّر السائل (أو معامل الانكسار): كلما كبر معامل الانكسار بدا الجسم أقرب إلى السطح.'],
    concl: ['الجسم المغمور في الماء يبدو أقرب إلى السطح من موقعه الحقيقي بسبب انكسار الضوء الخارج منه.', 'عند النظر عمودياً تقريباً: العمق الحقيقي ÷ العمق الظاهري ≈ n.', 'كلما نظرنا بصورة أكثر ميلاً بدت الصورة أقرب إلى السطح أكثر.', 'القلم يبدو مكسوراً لأن صورة جزئه المغمور ترتفع بينما جزؤه الذي في الهواء لا يتغير.'],
    laws: ['g10_rl_snell'],
    controls: [R('n', 'معامل انكسار السائل n', 1, 2.42, 1.33, .01, ''), TG('rays', 'الأشعة', true, null, 'ray'), TG('real', 'الموضع الحقيقي', true, null, 'eye')],
    setup(S) { S.ob = 'fish'; S.ox = 210; S.oy = 470; S.ex = 380; S.ey = 150; S.tx = 300; S.ty = 470; S.ex2 = 380; S.ey2 = 150; },
    update(S, dt) { Q46.ease(S, 'ex2', S.ex, dt, 12); Q46.ease(S, 'ey2', S.ey, dt, 12); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = Math.min(w - 350, 480); return { w, h, L, x0, x1, top: 230, ws: 280, yb: 560 }; },
    /* exact surface point s where the ray from object o reaches the eye e (Snell n·sinθw = sinθa) */
    sOf(o, e, n, ws) { if (Math.abs(e[0] - o[0]) < 1e-9) return o[0]; let a = Math.min(o[0], e[0]), b = Math.max(o[0], e[0]);
      const f = s => n * (s - o[0]) / Math.hypot(s - o[0], o[1] - ws) - (e[0] - s) / Math.hypot(e[0] - s, ws - e[1]);
      for (let i = 0; i < 60; i++) { const m = (a + b) / 2; if (f(m) > 0) b = m; else a = m; } return (a + b) / 2; },
    img(o, e, n, ws, dl = 8) { const r = [-dl, dl].map(dx => { const E = [e[0] + dx, e[1]], s = D.sOf(o, E, n, ws); return { s: [s, ws], u: [E[0] - s, E[1] - ws], E }; });
      const [A, B] = r, den = A.u[0] * B.u[1] - A.u[1] * B.u[0]; let I = o.slice();
      if (Math.abs(den) > 1e-9) { const t = ((B.s[0] - A.s[0]) * B.u[1] - (B.s[1] - A.s[1]) * B.u[0]) / den; I = [A.s[0] + A.u[0] * t, A.s[1] + A.u[1] * t]; }
      return { I, r }; },
    pts(S, g) { if (S.ob !== 'pencil') return [[S.ox, S.oy]]; const top = [g.x0 + 50, g.ws - 120], tip = [S.tx, S.ty], out = []; const t0 = (g.ws - top[1]) / (tip[1] - top[1]);
      for (let k = 0; k <= 16; k++) { const t = t0 + (1 - t0) * k / 16; out.push([top[0] + (tip[0] - top[0]) * t, top[1] + (tip[1] - top[1]) * t]); } return out; },
    fish(ctx, x, y, sy, al, col) { K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = al; ctx.translate(x, y); ctx.scale(1, sy); const g = ctx.createLinearGradient(0, -14, 0, 14); g.addColorStop(0, col[0]); g.addColorStop(1, col[1]); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, 0, 26, 12, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.moveTo(-22, 0); ctx.lineTo(-40, -12); ctx.lineTo(-40, 12); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(14, -3, 2.6, 0, TAU); ctx.fill(); ctx.restore(); }); },
    coin(ctx, x, y, sy, al) { K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = al; ctx.translate(x, y); ctx.scale(1, sy); const g = ctx.createRadialGradient(-5, -3, 2, 0, 0, 18); g.addColorStop(0, '#fef9c3'); g.addColorStop(.6, '#eab308'); g.addColorStop(1, '#854d0e'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, 0, 18, 6, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#713f12'; ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore(); }); },
    pencil(ctx, P, al, dash) { K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = al; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash([6, 6]); ctx.strokeStyle = '#a16207'; ctx.lineWidth = 12; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.strokeStyle = '#facc15'; ctx.lineWidth = 8; ctx.stroke(); ctx.restore(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), n = S.p.n, e = [S.ex2, S.ey2], ws = g.ws; Q46.bg(ctx, w, h);
      Q46.tank(ctx, g.x0, g.top, g.x1 - g.x0, g.yb, ws); K.raw(ctx, () => { ctx.fillStyle = 'rgba(120,113,108,.6)'; for (let i = 0; i < 26; i++) { ctx.beginPath(); ctx.ellipse(g.x0 + 10 + i * 14, g.yb - 5, 8, 4, 0, 0, TAU); ctx.fill(); } });
      Q46.lab(ctx, n > 1.005 ? 'سائل n = ' + n.toFixed(2) : 'هواء فقط', g.x0 + 60, ws + 16, { c: '#a5f3fc' }); Q46.lab(ctx, 'هواء', g.x0 + 30, ws - 16);
      const P = D.pts(S, g), Ims = P.map(p => D.img(p, e, n, ws)), main = Ims[S.ob === 'pencil' ? P.length - 1 : 0], o = P[S.ob === 'pencil' ? P.length - 1 : 0], I = main.I;
      // rays from the object to both edges of the pupil (exact), and their backward extensions
      if (S.p.rays) { main.r.forEach((r, k) => { Q46.beam(ctx, o, r.s, .8, '#fde047', 2.2, { arrow: k === 0 }); Q46.beam(ctx, r.s, r.E, .8, '#fde047', 2.2, { arrow: k === 0 }); Q41.line(ctx, [r.s, I], 'rgba(255,255,255,.7)', 1.3, [5, 4]); });
        const s0 = main.r[0].s; Q46.normal(ctx, s0, -Math.PI / 2, 60, { L2: 60, c: 'rgba(255,255,255,.45)' }); }
      if (S.ob === 'fish') { const sy = clamp((I[1] - ws) / Math.max(1, o[1] - ws), .3, 1); if (S.p.real) D.fish(ctx, o[0], o[1], 1, .35, ['#fb923c', '#c2410c']); D.fish(ctx, I[0], I[1], sy, .95, ['#fdba74', '#ea580c']); }
      else if (S.ob === 'coin') { const sy = clamp((I[1] - ws) / Math.max(1, o[1] - ws), .3, 1); if (S.p.real) D.coin(ctx, o[0], o[1], 1, .35); D.coin(ctx, I[0], I[1], sy, 1); }
      else { const top = [g.x0 + 50, ws - 120]; if (S.p.real) D.pencil(ctx, P, .35, true); D.pencil(ctx, [top, P[0]].concat(Ims.map(q => q.I)), 1, false); K.raw(ctx, () => { ctx.fillStyle = '#fda4af'; ctx.beginPath(); ctx.arc(top[0], top[1], 6, 0, TAU); ctx.fill(); }); }
      if (S.p.real) { Q46.tag(ctx, 'الموضع الحقيقي', o[0] + (S.ob === 'pencil' ? 0 : -6), o[1] + 26, '#475569', { s: 10 }); }
      Q46.tag(ctx, 'الصورة الظاهرية', I[0] + 4, I[1] - 24, '#7c3aed', { s: 10 });
      // depth markers
      const dx = g.x1 - 22; Q41.line(ctx, [[dx, ws], [dx, o[1]]], '#f97316', 2); Q41.line(ctx, [[dx - 10, ws], [dx - 10, I[1]]], '#a78bfa', 2); Q46.tag(ctx, 'd', dx + 10, (ws + o[1]) / 2, '#ea580c', { s: 10 }); Q46.tag(ctx, 'd′', dx - 22, (ws + I[1]) / 2, '#7c3aed', { s: 10 });
      Q46.eye(ctx, e[0], e[1], Math.atan2(main.r[0].s[1] - e[1], main.r[0].s[0] - e[0]), 1.1);
      const d = (o[1] - ws) / PX, da = (I[1] - ws) / PX;
      Q46.card(ctx, S, [{ t: 'العمق الحقيقي d = ' + d.toFixed(1) + ' cm', c: '#c2410c', w: 900 }, { t: 'العمق الظاهري d′ = ' + da.toFixed(1) + ' cm', c: '#6d28d9', w: 900 }, { t: 'd / d′ = ' + (d / Math.max(.01, da)).toFixed(2) + '   n = ' + n.toFixed(2), mono: 1 }, { t: 'عند النظر عمودياً تقريباً تكون النسبة ≈ n', c: '#334155' }, { t: n > 1.005 ? 'يبدو الجسم أقرب إلى السطح' : 'لا انكسار: الصورة في الموضع الحقيقي', c: '#0f766e', w: 800 }], { title: 'العمق الحقيقي والظاهري', y: 70, wd: 310 });
      const C = D.chips(S, g); Q46.drawChips(ctx, C.o); Q46.drawChips(ctx, C.l);
      Q46.banner(ctx, w, 'اسحب العين والجسم، وبدّل بين السمكة والقلم');
    },
    chips(S, g) { return { o: Q42.chips(S, 'ob', [['fish', 'سمكة'], ['coin', 'قطعة نقود'], ['pencil', 'قلم في الماء']], g.h - 84, S.ob, (S2, k) => { S2.ob = k; }, { bw: 150, col: '#7c3aed' }),
      l: Q42.chips(S, 'lq', [['1.33', 'ماء 1.33'], ['1.47', 'كليسرين 1.47'], ['1', 'بلا سائل 1.00']], g.h - 128, String(S.p.n), (S2, k) => { setParam(S2, 'n', +k); }, { bw: 150, col: '#0e7490' }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), pen = S.ob === 'pencil';
      return [{ id: 'eye', x: S.ex2, y: S.ey2, r: 24, axis: 'xy', keep: true, tip: 'اسحب العين', idle: 'اسحب العين ✋', drag: (S2, d) => { S2.ex = clamp(d.ox + d.x - d.sx, g.x0 + 10, g.x1 - 10); S2.ey = clamp(d.oy + d.y - d.sy, 90, g.ws - 40); } },
        { id: 'obj', x: pen ? S.tx : S.ox, y: pen ? S.ty : S.oy, r: 26, axis: 'xy', keep: true, hint: false, tip: pen ? 'اسحب رأس القلم' : 'اسحب الجسم داخل الماء', drag: (S2, d) => { const x = clamp(d.ox + d.x - d.sx, g.x0 + 40, g.x1 - 50), y = clamp(d.oy + d.y - d.sy, g.ws + 40, g.yb - 20); if (S2.ob === 'pencil') { S2.tx = x; S2.ty = y; } else { S2.ox = x; S2.oy = y; } } }].concat(C.o, C.l); },
    readings(S) { const g = D.geo(S), P = D.pts(S, g), o = P[P.length - 1], I = D.img(o, [S.ex, S.ey], S.p.n, g.ws).I; return [rd('معامل الانكسار n', S.p.n.toFixed(2)), rd('العمق الحقيقي', ((o[1] - g.ws) / PX).toFixed(1) + ' cm'), rd('العمق الظاهري', ((I[1] - g.ws) / PX).toFixed(1) + ' cm')]; },
    record(S) { const g = D.geo(S), P = D.pts(S, g), o = P[P.length - 1], I = D.img(o, [S.ex, S.ey], S.p.n, g.ws).I, d = (o[1] - g.ws) / PX, da = (I[1] - g.ws) / PX; return { n: S.p.n, d: +d.toFixed(1), da: +da.toFixed(1), r: +(d / da).toFixed(2) }; },
    cols: [['n', 'n'], ['d', 'd (cm)'], ['da', 'd′ (cm)'], ['r', 'd / d′']],
    explain(S) { return Q26.ex('الجسم المغمور يبدو أعلى من موقعه الحقيقي، والقلم يبدو مكسوراً عند سطح الماء.', 'الشعاع الخارج من الماء إلى الهواء ينكسر مبتعداً عن العمود المقام، والعين تمد الأشعة الواصلة إليها على استقامتها إلى الخلف فتلتقي في نقطة أعلى: الصورة الظاهرية.', 'الصياد بالرمح يصوب أسفل السمكة التي يراها، والمسبح يبدو أقل عمقاً مما هو عليه.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — نشاط 1: قانونا الانعكاس بالمرآة المستوية والمنقلة (الشكلان 5-6 و 6-6 + الجدول 1) =============== */
(() => {
  const ANG = [25, 30, 35, 40];
  const D = { id: 'g10_r_mirror', page: 97, fig: 'الشكلان 5-6 و 6-6 + الجدول (1)',
    desc: 'نشاط 1: نسقط بصورة مائلة حزمة رفيعة من مصدر ليزري باتجاه مرآة مستوية عمودية على ورقة رسمت عليها منقلة، فينعكس الضوء من نقطة السقوط. نرسم العمود المقام من نقطة السقوط ونقيس زاوية السقوط θ₁ (بين الشعاع الساقط والعمود المقام) وزاوية الانعكاس θ′₁ (بين الشعاع المنعكس والعمود المقام)، ونكرر لعدة زوايا وندون النتائج في الجدول (1).',
    tags: 'نشاط 1 قانونا الانعكاس زاوية السقوط زاوية الانعكاس العمود المقام نقطة السقوط مرآة مستوية منقلة بوليستيرين مستو واحد الجدول 1',
    tools: ['مصدر ليزري (حزمة ضوئية متوازية)', 'مرآة مستوية', 'قطعة بوليستيرين لتثبيت المرآة', 'ورقة عليها منقلة مدرجة'],
    steps: ['اسحب المصدر الليزري حول نقطة السقوط (أو اضغط 25° ، 30° ، 35° ، 40°).', 'اقرأ على المنقلة زاوية السقوط θ₁ وزاوية الانعكاس θ′₁ ، وراقب امتلاء الجدول (1).', 'شغّل «المنظر المائل» لترى أن الشعاع الساقط والمنعكس والعمود المقام تقع كلها في مستوي الورقة.', 'إثراء: دوّر المرآة بزاوية صغيرة (اسحب طرفها الأيمن): يدور الشعاع المنعكس ضعفها.'],
    concl: ['القانون الأول للانعكاس: الشعاع الساقط والشعاع المنعكس والعمود المقام من نقطة السقوط تقع جميعها في مستوٍ واحد.', 'القانون الثاني للانعكاس: زاوية السقوط تساوي زاوية الانعكاس θ₁ = θ′₁.', 'الجدول (1): 25° ← 25° ، 30° ← 30° ، 35° ← 35° ، 40° ← 40°.', 'تدوير المرآة بزاوية α يدير الشعاع المنعكس بزاوية 2α.'],
    laws: ['g10_rl_reflect'],
    controls: [R('ang', 'موضع الليزر على المنقلة', 0, 80, 30, 1, '°'), R('tilt', 'تدوير المرآة', -15, 15, 0, 1, '°'), TG('nrm', 'العمود المقام', true, null, 'ray'), TG('plane', 'منظر مائل: المستوي الواحد', true, null, 'eye')],
    setup(S) { S.a = 30; S.tl = 0; S.tab = {}; },
    update(S, dt) { Q46.ease(S, 'a', S.p.ang, dt); Q46.ease(S, 'tl', S.p.tilt, dt); const k = Math.round(S.a); if (ANG.includes(S.p.ang) && Math.abs(S.a - S.p.ang) < .25 && Math.abs(S.tl) < .05) S.tab[S.p.ang] = S.p.ang; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = Math.min(w - 350, 480); return { w, h, L, x0, x1, O: [(x0 + x1) / 2, 450], Rs: 225 }; },
    rays(S, g) { const t = Q46.rad(S.tl), f = Q46.rad(S.a), n = [Math.sin(t), -Math.cos(t)], P = [g.O[0] - g.Rs * Math.sin(f), g.O[1] - g.Rs * Math.cos(f)], L = Math.hypot(g.O[0] - P[0], g.O[1] - P[1]), d = [(g.O[0] - P[0]) / L, (g.O[1] - P[1]) / L];
      const dn = d[0] * n[0] + d[1] * n[1], r = [d[0] - 2 * dn * n[0], d[1] - 2 * dn * n[1]], th = Q46.deg(Math.acos(clamp(-dn, -1, 1))); return { t, n, P, d, r, th }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = D.rays(S, g), O = g.O; Q46.bg(ctx, w, h);
      // paper sheet with printed protractor
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 14; ctx.fillStyle = '#e8ebf0'; ctx.fillRect(g.x0, 76, g.x1 - g.x0, O[1] + 70 - 76); ctx.restore(); });
      Q46.protractor(ctx, O[0], O[1], 170, -Math.PI / 2, { half: 1, fill: 'rgba(124,58,237,.05)', line: 'rgba(30,41,59,.6)', tc: '#334155' });
      Q41.line(ctx, [[g.x0 + 8, O[1]], [g.x1 - 8, O[1]]], 'rgba(30,41,59,.35)', 1, [3, 3]);
      // mirror on its polystyrene block (rotates about O)
      const u = [Math.cos(c.t), Math.sin(c.t)], A = [O[0] - u[0] * 160, O[1] - u[1] * 160], B = [O[0] + u[0] * 160, O[1] + u[1] * 160];
      K.raw(ctx, () => { ctx.save(); ctx.translate(O[0], O[1]); ctx.rotate(c.t); ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#cbd5e1'; ctx.fillRect(-150, 4, 300, 34); ctx.strokeRect(-150, 4, 300, 34); ctx.fillStyle = 'rgba(148,163,184,.4)'; for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc(-145 + (i * 37) % 290, 10 + (i * 13) % 26, 1.6, 0, TAU); ctx.fill(); } ctx.restore(); });
      Q46.mirror(ctx, A, B, { side: -1 }); Q46.lab(ctx, 'بوليستيرين', O[0] + 100, O[1] + 26, { c: '#475569', s: 10 });
      if (S.p.nrm) { Q46.normal(ctx, O, Math.atan2(c.n[1], c.n[0]), 190, { L2: 0, c: 'rgba(30,41,59,.85)' }); Q46.tag(ctx, 'العمود المقام', O[0] + c.n[0] * 205, O[1] + c.n[1] * 205 - 6, '#334155', { s: 10 }); }
      Q46.beam(ctx, c.P, O, 1, '#dc2626', 3, { comp: 'source-over' }); Q46.beam(ctx, O, [O[0] + c.r[0] * 240, O[1] + c.r[1] * 240], .95, '#dc2626', 3, { comp: 'source-over' });
      Q46.laser(ctx, c.P[0], c.P[1], Math.atan2(c.d[1], c.d[0]));
      const nA = Math.atan2(c.n[1], c.n[0]); Q46.arcAng(ctx, O, 70, nA, Math.atan2(-c.d[1], -c.d[0]), '#dc2626', 'θ₁ = ' + c.th.toFixed(0) + '°', { lr: 30 }); Q46.arcAng(ctx, O, 58, nA, Math.atan2(c.r[1], c.r[0]), '#2563eb', 'θ′₁ = ' + c.th.toFixed(0) + '°', { lr: 34 });
      Q46.tag(ctx, 'نقطة السقوط', O[0], O[1] + 52, '#7c3aed', { s: 10 }); Q46.tag(ctx, 'الشعاع الساقط', (c.P[0] + O[0]) / 2 - 30, (c.P[1] + O[1]) / 2 - 18, '#b91c1c', { s: 10 }); Q46.tag(ctx, 'الشعاع المنعكس', O[0] + c.r[0] * 170 + 30, O[1] + c.r[1] * 170 - 14, '#1d4ed8', { s: 10 });
      const Lc = [{ t: 'زاوية السقوط θ₁ = ' + c.th.toFixed(0) + '°', c: '#b91c1c', w: 900 }, { t: 'زاوية الانعكاس θ′₁ = ' + c.th.toFixed(0) + '°', c: '#1d4ed8', w: 900 }, { t: 'θ₁ = θ′₁', mono: 1, w: 900, c: '#7c3aed' }];
      if (Math.abs(S.tl) > .3) Lc.push({ t: 'دوّرنا المرآة ' + Math.abs(S.tl).toFixed(0) + '° فدار المنعكس ' + Math.abs(2 * S.tl).toFixed(0) + '°', c: '#0f766e', w: 800 });
      const ch = Q46.card(ctx, S, Lc, { title: 'قانونا الانعكاس', y: 70, wd: 310 });
      // Table (1)
      const tx = w - 12 - 310, ty = 70 + ch + 14, cw = 52, c0 = 102; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, tx, ty, 310, 92, 8); ctx.fill(); ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1; for (let i = 1; i < 3; i++) { ctx.beginPath(); ctx.moveTo(tx, ty + 26 + (i - 1) * 33); ctx.lineTo(tx + 310, ty + 26 + (i - 1) * 33); ctx.stroke(); } for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(tx + 310 - c0 - k * cw, ty + 26); ctx.lineTo(tx + 310 - c0 - k * cw, ty + 92); ctx.stroke(); } });
      Q46.T(ctx, 'الجدول (1)', tx + 155, ty + 13, { s: 12, w: 900, c: '#6d28d9' }); Q46.T(ctx, 'زاوية السقوط θ₁', tx + 310 - c0 / 2, ty + 42, { s: 10, w: 800 }); Q46.T(ctx, 'زاوية الانعكاس θ′₁', tx + 310 - c0 / 2, ty + 75, { s: 10, w: 800 });
      ANG.forEach((a, k) => { const x = tx + 310 - c0 - k * cw - cw / 2; Q46.T(ctx, a + '°', x, ty + 42, { s: 12, w: 900, c: '#b91c1c' }); Q46.T(ctx, S.tab[a] != null ? S.tab[a] + '°' : '؟', x, ty + 75, { s: 12, w: 900, c: S.tab[a] != null ? '#1d4ed8' : '#94a3b8' }); });
      // oblique view: everything lies in the plane of the paper (first law)
      if (S.p.plane) { const ix = w - 12 - 310, iy = ty + 108, iw = 310, ih = 190, cx = ix + iw / 2 + 20, cy = iy + 80, k = .58, Pj = (X, Y, Z = 0) => [cx + X * k - Y * k * .4, cy + Y * k * .3 - Z * k];
        K.raw(ctx, () => { ctx.fillStyle = 'rgba(15,23,42,.85)'; rr(ctx, ix, iy, iw, ih, 10); ctx.fill(); ctx.strokeStyle = '#7c3aed'; ctx.stroke();
          const q = [Pj(-210, -20), Pj(210, -20), Pj(210, 250), Pj(-210, 250)]; ctx.fillStyle = 'rgba(232,235,240,.9)'; ctx.beginPath(); q.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill();
          const m = [Pj(-150 * u[0], 150 * u[1]), Pj(150 * u[0], -150 * u[1]), Pj(150 * u[0], -150 * u[1], 60), Pj(-150 * u[0], 150 * u[1], 60)]; ctx.fillStyle = 'rgba(186,230,253,.55)'; ctx.strokeStyle = '#64748b'; ctx.beginPath(); m.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); ctx.stroke(); });
        const v = (x, y) => [x, -y]; const p0 = Pj(0, 0), pS = Pj(...v(c.P[0] - O[0], c.P[1] - O[1])), pR = Pj(...v(c.r[0] * 220, c.r[1] * 220)), pN = Pj(...v(c.n[0] * 200, c.n[1] * 200));
        Q46.beam(ctx, pS, p0, 1, '#dc2626', 2.4, { comp: 'source-over', arrow: false }); Q46.beam(ctx, p0, pR, 1, '#dc2626', 2.4, { comp: 'source-over', arrow: false }); Q41.line(ctx, [p0, pN], '#334155', 1.4, [5, 4]);
        Q46.T(ctx, 'منظر مائل: الأشعة والعمود في مستوي الورقة', cx, iy + 16, { s: 10.5, w: 900, c: '#e9d5ff' }); }
      const C = D.chips(S, g); Q46.drawChips(ctx, C.a); Q46.drawChips(ctx, C.c);
      Q46.banner(ctx, w, 'اسحب الليزر حول نقطة السقوط، أو اضغط زوايا الجدول');
    },
    chips(S, g) { return { a: Q42.chips(S, 'an', ANG.map(a => [String(a), Q46.ltr(a + '°')]), g.h - 84, S.p.tilt === 0 ? String(S.p.ang) : '', (S2, k) => { setParam(S2, 'ang', +k); setParam(S2, 'tilt', 0); }, { bw: 90, col: '#b91c1c' }),
      c: Q42.chips(S, 'clr', [['clr', 'مسح الجدول'], ['all', 'املأ الجدول']], g.h - 84, '', (S2, k) => { if (k === 'clr') S2.tab = {}; else { ANG.forEach(a => { S2.tab[a] = a; }); } }, { bw: 130, x0: g.L + 400 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), c = D.rays(S, g), C = D.chips(S, g), u = [Math.cos(c.t), Math.sin(c.t)];
      return [{ id: 'src', x: c.P[0], y: c.P[1], r: 26, cx: g.O[0], cy: g.O[1], keep: true, tip: 'اسحب الليزر حول نقطة السقوط', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'ang', Math.round(clamp(Q46.deg(-d.ang - Math.PI / 2), 0, 80))); } },
        { id: 'mir', x: g.O[0] + u[0] * 150, y: g.O[1] + u[1] * 150, r: 20, cx: g.O[0], cy: g.O[1], keep: true, hint: false, tip: 'اسحب طرف المرآة لتدويرها', drag: (S2, d) => { setParam(S2, 'tilt', Math.round(clamp(Q46.deg(d.ang), -15, 15))); } }].concat(C.a, C.c); },
    readings(S) { const c = D.rays(S, D.geo(S)); return [rd('زاوية السقوط θ₁', c.th.toFixed(1) + '°'), rd('زاوية الانعكاس θ′₁', c.th.toFixed(1) + '°'), rd('تدوير المرآة', S.p.tilt + '°')]; },
    record(S) { const c = D.rays(S, D.geo(S)); return { a: +c.th.toFixed(1), b: +c.th.toFixed(1) }; },
    cols: [['a', 'θ₁ (°)'], ['b', 'θ′₁ (°)']],
    graph: { x: 'a', y: 'b', xl: 'زاوية السقوط θ₁ (°)', yl: 'زاوية الانعكاس θ′₁ (°)' },
    explain(S) { return Q26.ex('كلما غيّرنا زاوية السقوط تغيرت زاوية الانعكاس بالمقدار نفسه، والأشعة والعمود كلها على سطح الورقة.', 'الضوء يرتد عن السطح العاكس بحيث تكون زاوية السقوط مساوية لزاوية الانعكاس، والشعاعان والعمود المقام في مستوٍ واحد: هذان قانونا الانعكاس.', 'في لعبة البلياردو ترتد الكرة عن الحافة بزاوية تساوي زاوية اصطدامها، كما يرتد الضوء عن المرآة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B2 — الانعكاس المنتظم وغير المنتظم: سطح أملس وسطح خشن (إثراء للشكل 1-6) =============== */
(() => {
  const RND = [.31, .86, .12, .64, .47, .95, .05, .72, .38, .58, .22, .91, .44, .03, .79, .27, .68, .15, .83, .52, .09, .61, .36, .88, .2, .7];
  const D = { id: 'g10_r_diffuse', page: 96, fig: 'الشكل 1-6 + الشكل 5-6',
    desc: 'تتكون صورة الجبال والأشجار في ماء البحيرة الساكن لأن سطحه أملس فيعكس الأشعة المتوازية متوازية (انعكاس منتظم). أما السطح الخشن (كالورق أو الماء المضطرب) فيعكس الأشعة في اتجاهات مختلفة (انعكاس غير منتظم)، مع أن كل شعاع يخضع لقانوني الانعكاس عند نقطة سقوطه.',
    tags: 'انعكاس منتظم انعكاس غير منتظم سطح أملس سطح خشن صورة الجبال في الماء الشكل 1-6 قانونا الانعكاس',
    tools: ['حزمة أشعة متوازية', 'مرآة (سطح أملس)', 'ورقة أو ماء مضطرب (سطح خشن)', 'عين الراصد'],
    steps: ['اسحب مقبض الحزمة لتغيير زاوية السقوط: الأشعة المنعكسة عن السطح الأملس تبقى متوازية.', 'زِد «خشونة السطح»: تتشتت الأشعة المنعكسة في اتجاهات مختلفة.', 'شغّل «الأعمدة المقامة»: كل شعاع يحقق θ₁ = θ′₁ عند نقطة سقوطه.', 'اسحب العينين: السطح الأملس يُرى من اتجاه واحد فقط (وهج)، والخشن يُرى من اتجاهات كثيرة.'],
    concl: ['الانعكاس المنتظم: سطح أملس يعكس الأشعة المتوازية متوازية فتتكون صورة واضحة (الماء الساكن، المرآة).', 'الانعكاس غير المنتظم: سطح خشن يعكس الأشعة في اتجاهات مختلفة فنرى السطح من كل مكان ولا تتكون صورة.', 'قانونا الانعكاس يتحققان في الحالتين عند كل نقطة سقوط.'],
    laws: ['g10_rl_reflect'],
    controls: [R('ang', 'زاوية سقوط الحزمة', 10, 70, 40, 1, '°'), R('rough', 'خشونة السطح الخشن', 0, 1, .7, .05, ''), TG('nrm', 'الأعمدة المقامة', false, null, 'ray')],
    setup(S) { S.a = 40; S.rg = .7; S.e1 = null; S.e2 = null; },
    update(S, dt) { Q46.ease(S, 'a', S.p.ang, dt); Q46.ease(S, 'rg', S.p.rough, dt); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 16, x2 = w - 12, mid = (x0 + x2) / 2; return { w, h, L, P: [[x0, mid - 8], [mid + 8, x2]], top: 250, sy: 540 }; },
    surf(S, g, k) { const [a, b] = g.P[k], N = 26, pts = []; for (let i = 0; i <= N; i++) { const x = a + (b - a) * i / N; pts.push([x, g.sy - (k ? S.rg * 26 * RND[i % RND.length] : 0)]); } return pts; },
    eyeP(S, g, k) { const e = k ? S.e2 : S.e1; if (e) return e; const [a, b] = g.P[k], c = (a + b) / 2, t = Q46.rad(S.a); return [c + 190 * Math.sin(t) + (k ? 0 : 0), g.sy - 190 * Math.cos(t)]; },
    run(S, g, k) { const pts = D.surf(S, g, k), E = []; for (let i = 0; i < pts.length - 1; i++) E.push({ k: 's', a: pts[i], b: pts[i + 1], mir: 1, R: .92 }); const [a, b] = g.P[k], c = (a + b) / 2, t = Q46.rad(S.a), d = [Math.sin(t), Math.cos(t)], out = [], eye = D.eyeP(S, g, k); let seen = 0;
      for (let j = -5; j <= 5; j++) { const x = c + j * 20, p = [x - d[0] * 420, g.sy - d[1] * 420], T = Q46.trace(E, () => 1, p, d, { depth: 4, far: 700 }); out.push(T);
        T.segs.filter(s => s.out).forEach(s => { const ux = s.b[0] - s.a[0], uy = s.b[1] - s.a[1], L = Math.hypot(ux, uy), tt = ((eye[0] - s.a[0]) * ux + (eye[1] - s.a[1]) * uy) / L; if (tt > 0 && Math.abs((eye[0] - s.a[0]) * uy - (eye[1] - s.a[1]) * ux) / L < 22) seen++; }); }
      return { pts, out, eye, seen }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S); Q46.bg(ctx, w, h);
      [0, 1].forEach(k => { const [a, b] = g.P[k], r = D.run(S, g, k);
        K.raw(ctx, () => { ctx.save(); ctx.fillStyle = 'rgba(255,255,255,.035)'; rr(ctx, a, g.top, b - a, g.sy + 50 - g.top, 10); ctx.fill(); ctx.beginPath(); ctx.rect(a, g.top, b - a, g.sy + 60 - g.top); ctx.clip(); });
        r.out.forEach(T => Q46.drawTrace(ctx, T, '#ffd23f', 2.2, { arrow: true }));
        if (S.p.nrm) r.out.forEach(T => T.hits.forEach(hh => Q41.line(ctx, [hh.q, [hh.q[0] + hh.N[0] * 40, hh.q[1] + hh.N[1] * 40]], 'rgba(255,255,255,.6)', 1.2, [4, 3])));
        K.raw(ctx, () => { ctx.fillStyle = k ? '#a8a29e' : '#cbd5e1'; ctx.beginPath(); ctx.moveTo(a, g.sy + 40); r.pts.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(b, g.sy + 40); ctx.closePath(); ctx.fill(); if (!k) { const gg = ctx.createLinearGradient(a, 0, b, 0); gg.addColorStop(0, '#e2e8f0'); gg.addColorStop(.5, '#ffffff'); gg.addColorStop(1, '#94a3b8'); ctx.strokeStyle = gg; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(a, g.sy); ctx.lineTo(b, g.sy); ctx.stroke(); } ctx.restore(); });
        const lit = r.seen > 0; K.raw(ctx, () => { if (lit) { const gg = ctx.createRadialGradient(r.eye[0], r.eye[1], 2, r.eye[0], r.eye[1], 34); gg.addColorStop(0, 'rgba(255,230,120,.8)'); gg.addColorStop(1, 'rgba(255,230,120,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(r.eye[0], r.eye[1], 34, 0, TAU); ctx.fill(); } });
        Q46.eye(ctx, r.eye[0], r.eye[1], Math.atan2((a + b) / 2 - r.eye[0], g.sy - r.eye[1]), 1);
        Q46.tag(ctx, lit ? 'تصل العين ' + r.seen + ' أشعة من 11' : 'لا يصل ضوء إلى العين', r.eye[0], r.eye[1] + 28, lit ? '#b45309' : '#475569', { s: 10 });
        Q46.tag(ctx, k ? 'سطح خشن: انعكاس غير منتظم' : 'سطح أملس: انعكاس منتظم', (a + b) / 2, g.sy + 62, k ? '#57534e' : '#0369a1', { s: 12 }); });
      Q46.card(ctx, S, [{ t: 'الأملس: الأشعة المنعكسة متوازية', c: '#0369a1', w: 900 }, { t: 'الخشن: الأشعة المنعكسة مبعثرة', c: '#57534e', w: 900 }, { t: 'كل شعاع يحقق θ₁ = θ′₁ عند نقطته', c: '#7c3aed', w: 800 }], { title: 'الانعكاس المنتظم وغير المنتظم', y: 70, wd: 320 });
      const hp = D.hp(S, g); Q41.knob(ctx, hp[0], hp[1], '#f59e0b', 12);
      Q46.drawChips(ctx, D.chips(S, g)); Q46.banner(ctx, w, 'اسحب مقبض الحزمة البرتقالي، وغيّر خشونة السطح');
    },
    hp(S, g) { const [a, b] = g.P[0], c = (a + b) / 2, t = Q46.rad(S.a); return [c - 260 * Math.sin(t), g.sy - 260 * Math.cos(t)]; },
    chips(S, g) { return Q42.chips(S, 'sf', [['0', 'ماء ساكن'], ['.35', 'ماء مضطرب قليلاً'], ['.7', 'ورقة خشنة'], ['1', 'سطح خشن جداً']], g.h - 84, String(S.p.rough), (S2, k) => { setParam(S2, 'rough', +k); }, { bw: 160, col: '#57534e' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), hp = D.hp(S, g), [a, b] = g.P[0];
      const ed = k => ({ id: 'eye' + k, x: D.eyeP(S, g, k)[0], y: D.eyeP(S, g, k)[1], r: 24, axis: 'xy', keep: true, hint: false, tip: 'اسحب العين', drag: (S2, d) => { const [a2, b2] = g.P[k], p = [clamp(d.ox + d.x - d.sx, a2 + 20, b2 - 20), clamp(d.oy + d.y - d.sy, g.top + 20, g.sy - 50)]; if (k) S2.e2 = p; else S2.e1 = p; } });
      return [{ id: 'beam', x: hp[0], y: hp[1], r: 22, cx: (a + b) / 2, cy: g.sy, keep: true, tip: 'اسحب لتغيير زاوية السقوط', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'ang', Math.round(clamp(Q46.deg(-d.ang - Math.PI / 2), 10, 70))); } }, ed(0), ed(1)].concat(D.chips(S, g)); },
    readings(S) { const g = D.geo(S); return [rd('زاوية السقوط', S.p.ang + '°'), rd('خشونة السطح', S.p.rough.toFixed(2)), rd('أشعة تصل العين (أملس)', D.run(S, g, 0).seen + ' / 11'), rd('أشعة تصل العين (خشن)', D.run(S, g, 1).seen + ' / 11')]; },
    explain(S) { return Q26.ex('الأشعة المتوازية تنعكس متوازية عن السطح الأملس، وتتبعثر عن السطح الخشن.', 'في السطح الخشن تختلف اتجاهات الأعمدة المقامة من نقطة لأخرى، فتختلف اتجاهات الأشعة المنعكسة مع أن كل شعاع يحقق θ₁ = θ′₁.', 'نرى صورة الجبال في البحيرة الساكنة، وتختفي الصورة عندما تهب الرياح ويضطرب سطح الماء.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — نشاط 2: انكسار الضوء في حوض الماء ومسحوق الطباشير (الأشكال 7-6 إلى 11-6 + مثال 2 + مسألتا 4 و 6) =============== */
(() => {
  const EX = {
    e2: { t: 'مثال 2 ص 105', q: ['سقط شعاع ضوئي من الهواء على سطح الماء بزاوية سقوط 60° فكانت زاوية انكساره 40.5°. جد معامل الانكسار المطلق للماء.', 'sin 60° = 0.866 ,  sin 40.5° = 0.649'], lines: ['n₁ sin θ₁ = n₂ sin θ₂', '1 × sin 60° = n₂ × sin 40.5°', '1 × 0.866 = n₂ × 0.649', 'n₂ = 0.866 / 0.649', 'معامل الانكسار المطلق للماء n₂ = 1.33'], load: S => { setParam(S, 'n', 1.33); S.nov = null; setParam(S, 'ang', 60); setParam(S, 'flip', false); } },
    p4: { t: 'مسألة 4 ص 113', q: ['سقط ضوء من الهواء على سطح الماء بزاوية سقوط 30° فانعكس جزء منه وانكسر جزء آخر. جد زاوية الانعكاس وزاوية الانكسار.', 'n = 4/3 ,  sin 30° = 0.5', 'sin 22.02° = 0.375'], lines: ['زاوية الانعكاس تساوي زاوية السقوط', 'θ′₁ = 30°', 'n₁ sin θ₁ = n₂ sin θ₂', '1 × 0.5 = (4/3) × sin θ₂', 'sin θ₂ = 0.375', 'θ₂ = 22.02°'], load: S => { setParam(S, 'n', 1.33); S.nov = 4 / 3; setParam(S, 'ang', 30); setParam(S, 'flip', false); setParam(S, 'part', true); } },
    p6: { t: 'مسألة 6 ص 113 (a)', q: ['يسقط ضوء من الهواء على مادة شفافة معامل انكسارها 1.5 بزاوية سقوط 30°. جد زاوية الانكسار.', 'sin 30° = 0.5 ,  sin 19.45° = 0.333'], lines: ['n₁ sin θ₁ = n₂ sin θ₂', '1 × sin 30° = 1.5 × sin θ₂', 'sin θ₂ = 0.5 / 1.5 = 0.333', 'θ₂ = 19.45°'], load: S => { setParam(S, 'n', 1.5); S.nov = null; setParam(S, 'ang', 30); setParam(S, 'flip', false); } } };
  const D = { id: 'g10_r_tank', page: 98, fig: 'الأشكال 7-6 و 8-6 و 9-6 و 10-6 و 11-6 + مثال 2',
    desc: 'نشاط 2: حوض شفاف فيه ماء ومسحوق طباشير (ليظهر مسار الضوء)، ومصدر ضوئي ومنقلة في مكان مظلم. نسقط الضوء عمودياً فينفذ دون انكسار، ثم مائلاً فينكسر. نقيس زاوية السقوط θ₁ وزاوية الانكسار θ₂ لعدة زوايا، فنجد أن النسبة sin θ₁ / sin θ₂ ثابتة. عند الانتقال من الهواء إلى الماء ينكسر الشعاع مقترباً من العمود المقام (الشكل 8-6)، وعند الانتقال من الماء إلى الهواء ينكسر مبتعداً عنه (الشكل 9-6).',
    tags: 'نشاط 2 انكسار الضوء قانونا الانكسار حوض ماء مسحوق طباشير منقلة sin θ1 / sin θ2 ثابت مقترباً من العمود مبتعداً عن العمود مثال 2 مسألة 4 مسألة 6',
    tools: ['حوض شفاف فيه ماء', 'مصدر ضوئي ذو طول موجي معين (ليزر)', 'مسحوق طباشير', 'منقلة', 'ورقة'],
    steps: ['أسقط الضوء عمودياً (θ₁ = 0): ينفذ دون انحراف.', 'اسحب الليزر لسقوط مائل: قِس θ₁ و θ₂ على المنقلة واضغط «سجّل القياس» لعدة زوايا.', 'لاحظ عمود sin θ₁ / sin θ₂ في الجدول: مقدار ثابت.', 'فعّل «من الماء إلى الهواء»: الشعاع ينكسر مبتعداً عن العمود المقام.', 'حل مثال 2 والمسألتين 4 و 6 خطوة خطوة.'],
    concl: ['القانون الأول للانكسار: الشعاع الساقط والشعاع المنكسر والعمود المقام من نقطة السقوط تقع جميعها في مستوٍ واحد عمودي على السطح الفاصل.', 'القانون الثاني للانكسار: النسبة بين جيب زاوية السقوط وجيب زاوية الانكسار مقدار ثابت.', 'من وسط أقل كثافة ضوئية إلى أكبر: θ₁ > θ₂ (يقترب من العمود). والعكس يبتعد عنه.', 'لكل زاوية سقوط زاوية انكسار معينة خاصة بها بين وسطين مختلفين في الكثافة الضوئية.', 'مثال 2: n = 0.866 / 0.649 = 1.33.'],
    laws: ['g10_rl_snell', 'g10_rl_nrel'],
    controls: [R('ang', 'زاوية السقوط θ₁', 0, 89, 40, 1, '°'), R('n', 'معامل انكسار الماء (الوسط)', 1, 2.42, 1.33, .01, '', (v, S) => { if (S) S.nov = null; }), TG('flip', 'الضوء من الماء إلى الهواء', false, null, 'flip'), TG('part', 'الشعاع المنعكس جزئياً', true, null, 'ray')],
    setup(S) { S.a = 40; S.rows = []; S.ex = null; S.k = 0; S.nov = null; },
    update(S, dt) { Q46.ease(S, 'a', S.p.ang, dt); },
    n(S) { return S.nov || S.p.n; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = Math.min(w - 350, 480); return { w, h, L, x0, x1, top: 300, ws: 360, yb: 560, O: [(x0 + x1) / 2, 360], Rs: 200 }; },
    run(S, g) { const n = D.n(S), t = Q46.rad(S.a), fl = S.p.flip, P = fl ? [g.O[0] - 170 * Math.sin(t), g.O[1] + 170 * Math.cos(t)] : [g.O[0] - g.Rs * Math.sin(t), g.O[1] - g.Rs * Math.cos(t)], d = fl ? [Math.sin(t), -Math.cos(t)] : [Math.sin(t), Math.cos(t)];
      const E = [{ k: 's', a: [g.x0, g.ws], b: [g.x1, g.ws] }], nAt = p => (p[1] > g.ws && p[0] > g.x0 && p[0] < g.x1) ? n : 1, T = Q46.trace(E, nAt, P, d, { part: S.p.part, depth: 2, minI: .01 });
      const n1 = fl ? n : 1, n2 = fl ? 1 : n, t2 = Q46.snell(n1, n2, t); return { n, t, P, d, T, n1, n2, t2, R: Q46.fres(n1, n2, Math.cos(t)), fl }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = D.run(S, g), O = g.O; Q46.bg(ctx, w, h);
      Q46.protractor(ctx, O[0], O[1], 165, -Math.PI / 2, { fill: 'rgba(255,255,255,.05)' });
      Q46.tank(ctx, g.x0, g.top, g.x1 - g.x0, g.yb, g.ws);
      Q46.lab(ctx, 'هواء  n₁ = 1', g.x0 + 60, g.ws - 16); Q46.lab(ctx, 'ماء + طباشير  n₂ = ' + c.n.toFixed(c.n === 4 / 3 ? 3 : 2), g.x0 + 90, g.yb - 16, { c: '#a5f3fc' });
      Q46.normal(ctx, O, -Math.PI / 2, 175, { L2: 175, lab: 'العمود المقام' });
      Q46.drawTrace(ctx, c.T, '#ff3030', 3, { clip: [0, 0, w, g.yb] }); Q46.dust(ctx, c.T, undefined, null, [g.x0, g.ws, g.x1 - g.x0, g.yb - g.ws]);
      if (c.fl) K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(g.x0, g.ws, g.x1 - g.x0, g.yb - g.ws); ctx.clip(); }); Q46.laser(ctx, c.P[0], c.P[1], Math.atan2(c.d[1], c.d[0]), { L: 70 }); if (c.fl) K.raw(ctx, () => ctx.restore());
      const ain = Math.atan2(-c.d[1], -c.d[0]), nIn = c.fl ? Math.PI / 2 : -Math.PI / 2; Q46.arcAng(ctx, O, 62, nIn, ain, '#dc2626', 'θ₁');
      const ts = c.T.segs.find(q => q.path === 't'); if (ts && S.a > .5) Q46.arcAng(ctx, O, 74, -nIn, Math.atan2(ts.b[1] - ts.a[1], ts.b[0] - ts.a[0]), '#16a34a', 'θ₂');
      const rs = c.T.segs.find(q => q.path === 'r'); if (rs && (S.p.part || !ts) && S.a > .5) Q46.arcAng(ctx, O, 48, nIn, Math.atan2(rs.b[1] - rs.a[1], rs.b[0] - rs.a[0]), '#2563eb', 'θ′₁');
      // live card or step solution
      let ch; const s1 = Math.sin(c.t), s2 = c.t2 == null ? null : Math.sin(c.t2);
      if (S.ex) ch = Q46.steps(ctx, S, Object.assign({}, EX[S.ex], { title: EX[S.ex].t, k: S.k }), { y: 70, x: w - 12, wd: 320 });
      else ch = Q46.card(ctx, S, [{ t: 'θ₁ = ' + S.a.toFixed(1) + '°    θ₂ = ' + (c.t2 == null ? '—' : Q46.deg(c.t2).toFixed(2) + '°'), mono: 1, w: 900 }, { t: 'sin θ₁ = ' + s1.toFixed(3) + '    sin θ₂ = ' + (s2 == null ? '—' : s2.toFixed(3)), mono: 1 }, { t: 'sin θ₁ / sin θ₂ = ' + (s2 ? (s1 / s2).toFixed(3) : '—'), mono: 1, c: '#b91c1c', w: 900 },
        { t: c.t2 == null ? 'انعكاس كلي داخلي: لا شعاع منكسر' : S.a < .5 ? 'سقوط عمودي: ينفذ دون انكسار' : c.fl ? 'من الأكثف إلى الأقل كثافة: يبتعد عن العمود' : 'من الأقل كثافة إلى الأكثف: يقترب من العمود', c: '#7c3aed', w: 800 }, { t: 'الشعاع المنعكس جزئياً: ' + (c.R * 100).toFixed(1) + '%', c: '#1d4ed8' }], { title: c.fl ? 'من الماء إلى الهواء' : 'من الهواء إلى الماء', y: 70, wd: 320 });
      // measurement table
      const tx = w - 12 - 320, ty = 70 + ch + 12, rh = 22, cols = ['θ₁', 'θ₂', 'sin θ₁', 'sin θ₂', 'النسبة'], cw = 64;
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, tx, ty, 320, 30 + rh * Math.max(1, S.rows.length), 8); ctx.fill(); ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 1.5; ctx.stroke(); });
      cols.forEach((t, i) => Q46.T(ctx, t, tx + 320 - cw / 2 - i * cw, ty + 15, { s: 10.5, w: 900, c: '#6d28d9' }));
      if (!S.rows.length) Q46.T(ctx, 'اضغط «سجّل القياس» لتملأ الجدول', tx + 160, ty + 30 + rh / 2 - 4, { s: 10.5, w: 700, c: '#64748b' });
      S.rows.forEach((r, j) => r.forEach((v, i) => Q46.T(ctx, v, tx + 320 - cw / 2 - i * cw, ty + 30 + rh * j + rh / 2 - 4, { s: 11, w: 800, c: i === 4 ? '#b91c1c' : '#1e293b' })));
      const C = D.chips(S, g); Q46.drawChips(ctx, C.r); C.e.forEach(b => { if (b.id === 'ex_nx') b._on = 1; }); Q46.drawChips(ctx, C.e);
      Q46.banner(ctx, w, 'اسحب الليزر حول نقطة السقوط، وسجّل القياسات');
    },
    rec(S) { const c = D.run(S, D.geo(S)); if (c.t2 == null) return null; return [c.t * 0 + S.a.toFixed(0) + '°', Q46.deg(c.t2).toFixed(1) + '°', Math.sin(c.t).toFixed(3), Math.sin(c.t2).toFixed(3), (Math.sin(c.t) / Math.sin(c.t2)).toFixed(2)]; },
    chips(S, g) { return { r: Q42.chips(S, 'rc', [['add', '📋 سجّل القياس'], ['clr', 'مسح الجدول']], g.h - 128, '', (S2, k) => { if (k === 'clr') { S2.rows = []; return; } const r = D.rec(S2); if (r && S2.a > .5) { S2.rows.push(r); if (S2.rows.length > 5) S2.rows.shift(); } }, { bw: 150 }),
      e: Q46.exChips(S, 'ex', [['free', 'حر'], ['e2', 'مثال 2'], ['p4', 'مسألة 4'], ['p6', 'مسألة 6']], g.h - 84, EX, { bw: 115 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), c = D.run(S, g), C = D.chips(S, g);
      return [{ id: 'src', x: c.P[0], y: c.P[1], r: 26, cx: g.O[0], cy: g.O[1], keep: true, tip: 'اسحب الليزر حول نقطة السقوط', idle: 'اسحب ✋', drag: (S2, d) => { const a = S2.p.flip ? d.ang - Math.PI / 2 : -d.ang - Math.PI / 2; setParam(S2, 'ang', Math.round(clamp(Q46.deg(a), 0, 89))); S2.ex = null; } }].concat(C.r, C.e); },
    readings(S) { const c = D.run(S, D.geo(S)); return [rd('زاوية السقوط θ₁', S.p.ang + '°'), rd('زاوية الانكسار θ₂', c.t2 == null ? 'انعكاس كلي' : Q46.deg(c.t2).toFixed(2) + '°'), rd('sin θ₁ / sin θ₂', c.t2 ? (Math.sin(c.t) / Math.sin(c.t2)).toFixed(3) : '—'), rd('n₂', c.n.toFixed(3))]; },
    record(S) { const c = D.run(S, D.geo(S)); if (c.t2 == null) return null; return { a: S.p.ang, b: +Q46.deg(c.t2).toFixed(2), s1: +Math.sin(c.t).toFixed(3), s2: +Math.sin(c.t2).toFixed(3), r: +(Math.sin(c.t) / Math.sin(c.t2)).toFixed(3) }; },
    cols: [['a', 'θ₁ (°)'], ['b', 'θ₂ (°)'], ['s1', 'sin θ₁'], ['s2', 'sin θ₂'], ['r', 'النسبة']],
    graph: { x: 's2', y: 's1', xl: 'sin θ₂', yl: 'sin θ₁' },
    explain(S) { return Q26.ex('الشعاع ينحرف عند سطح الماء: يقترب من العمود عند دخوله الماء، ويبتعد عنه عند خروجه إلى الهواء، والسقوط العمودي لا يغير اتجاهه.', 'سرعة الضوء في الماء أقل منها في الهواء، فيتغير اتجاه الشعاع عند السقوط المائل. والنسبة sin θ₁ / sin θ₂ تبقى ثابتة لهذين الوسطين وتساوي معامل الانكسار النسبي.', 'لهذا يبدو القلم مكسوراً في كأس الماء، وتبدو قاع البركة أقرب مما هي.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — متوازي المستطيلات الزجاجي: الانكسار عند وجهين والانعكاسات الجزئية (س2-7 ص 112) =============== */
(() => {
  const PX = 30, EX = { q7: { t: 'س7 ص 112', q: 'إذا كان الشعاع 1 هو الشعاع الساقط، فما الأشعة المنعكسة والأشعة المنكسرة من الأشعة الأربعة الأخرى؟', lines: ['الشعاع 1: الساقط على الوجه العلوي', 'الشعاع 2: ينعكس عن الوجه العلوي في الهواء', 'الشعاع 3: ينكسر داخل الزجاج مقترباً من العمود', 'الشعاع 4: ينعكس عن الوجه السفلي داخل الزجاج', 'الشعاع 5: ينكسر خارجاً إلى الهواء ويوازي 2', 'المنعكسة: 2 و 4 ، والمنكسرة: 3 و 5'], load: S => { setParam(S, 'part', true); setParam(S, 'num', true); setParam(S, 'ang', 50); setParam(S, 'n', 1.52); } } };
  const D = { id: 'g10_r_block', page: 99, fig: 'السؤال 7 ص 112 + الشكلان 8-6 و 9-6',
    desc: 'نسقط شعاع ليزر على متوازي مستطيلات من الزجاج: ينكسر عند الوجه العلوي مقترباً من العمود المقام، ثم ينكسر عند الوجه السفلي مبتعداً عنه فيخرج موازياً للشعاع الساقط مزاحاً عنه جانبياً. وعند كل وجه ينعكس جزء من الضوء، كما في صورة السؤال 7 ص 112 (الأشعة 1 إلى 5).',
    tags: 'متوازي مستطيلات زجاجي انكسار وجهين الإزاحة الجانبية انعكاس جزئي سؤال 7 الأشعة 1 2 3 4 5 الشعاع الخارج يوازي الساقط',
    tools: ['متوازي مستطيلات من الزجاج', 'مصدر ليزري', 'ورقة ومنقلة'],
    steps: ['اسحب الليزر لتغيير زاوية السقوط، ولاحظ أن الشعاع الخارج يوازي الشعاع الساقط.', 'اسحب الوجه السفلي للمتوازي لتغيير سمكه: تزداد الإزاحة الجانبية d.', 'فعّل «ترقيم الأشعة» وأجب عن السؤال 7: أي الأشعة منعكسة وأيها منكسرة؟', 'غيّر معامل الانكسار (زجاج، الماس) ولاحظ اقتراب الشعاع من العمود داخل المادة.'],
    concl: ['عند الدخول (هواء ← زجاج) يقترب الشعاع من العمود، وعند الخروج (زجاج ← هواء) يبتعد عنه بالزاوية نفسها.', 'الشعاع الخارج يوازي الشعاع الساقط وينزاح عنه جانبياً: d = t sin(θ₁ − θ₂) / cos θ₂.', 'عند كل سطح فاصل ينعكس جزء من الضوء ويَنفُذ الباقي.', 'س7: المنعكسة 2 و 4 ، والمنكسرة 3 و 5.'],
    laws: ['g10_rl_snell'],
    controls: [R('ang', 'زاوية السقوط θ₁', 0, 80, 45, 1, '°'), R('n', 'معامل انكسار المتوازي n', 1.3, 2.42, 1.52, .01, ''), R('th', 'سمك المتوازي t', 2, 6, 4, .5, 'cm'), TG('part', 'الانعكاسات الجزئية', true, null, 'ray'), TG('num', 'ترقيم الأشعة (س7)', false, null, 'labels')],
    setup(S) { S.a = 45; S.tk = 4; S.ex = null; S.k = 0; },
    update(S, dt) { Q46.ease(S, 'a', S.p.ang, dt); Q46.ease(S, 'tk', S.p.th, dt); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 20, x1 = Math.min(w - 345, 485), top = 270; return { w, h, L, x0, x1, top, bot: top + S.tk * PX, O: [x0 + 120, top] }; },
    run(S, g) { const n = S.p.n, t = Q46.rad(S.a), P = [g.O[0] - 200 * Math.sin(t), g.O[1] - 200 * Math.cos(t)], d = [Math.sin(t), Math.cos(t)], B = [[g.x0, g.top], [g.x1, g.top], [g.x1, g.bot], [g.x0, g.bot]];
      const T = Q46.trace(Q46.polyE(B), p => Q46.inPoly(B, p) ? n : 1, P, d, { part: S.p.part || S.p.num, depth: 6, minI: .012 }), t2 = Q46.snell(1, n, t), dsh = S.tk * Math.sin(t - t2) / Math.cos(t2); return { n, t, P, d, B, T, t2, dsh }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = D.run(S, g), O = g.O; Q46.bg(ctx, w, h);
      Q46.glass(ctx, Q46.polyPath(c.B), { bb: [0, g.top, 0, g.bot] }); Q46.lab(ctx, 'زجاج n = ' + c.n.toFixed(2), g.x1 - 70, g.bot - 16, { c: '#a5f3fc' }); Q46.lab(ctx, 'هواء', g.x0 + 24, g.top - 16);
      Q46.normal(ctx, O, -Math.PI / 2, 120, { L2: 0 });
      const tt = c.T.segs.find(q => q.path === 'tt'), t1 = c.T.segs.find(q => q.path === 't');
      if (tt) Q46.normal(ctx, tt.a, Math.PI / 2, 90, { L2: 0 });
      // backward extension of the incident ray through the block (dashed)
      Q41.line(ctx, [O, [O[0] + c.d[0] * 380, O[1] + c.d[1] * 380]], 'rgba(255,255,255,.35)', 1.4, [6, 5]);
      Q46.drawTrace(ctx, c.T, '#ff3030', 3, { clip: [0, 0, w, h - 150] }); Q46.dust(ctx, c.T, 'rgba(255,140,140,');
      Q46.laser(ctx, c.P[0], c.P[1], Math.atan2(c.d[1], c.d[0]));
      Q46.arcAng(ctx, O, 56, -Math.PI / 2, Math.atan2(-c.d[1], -c.d[0]), '#dc2626', 'θ₁'); if (t1 && S.a > .5) Q46.arcAng(ctx, O, 60, Math.PI / 2, Math.atan2(t1.b[1] - t1.a[1], t1.b[0] - t1.a[0]), '#16a34a', 'θ₂');
      if (tt && S.a > .5) { Q46.arcAng(ctx, tt.a, 50, Math.PI / 2, Math.atan2(tt.b[1] - tt.a[1], tt.b[0] - tt.a[0]), '#dc2626', 'θ₁');
        // lateral shift d: perpendicular from the exit point to the extended incident line
        const v = [tt.a[0] - O[0], tt.a[1] - O[1]], pr = v[0] * c.d[0] + v[1] * c.d[1], F = [O[0] + c.d[0] * pr, O[1] + c.d[1] * pr]; if (Math.hypot(tt.a[0] - F[0], tt.a[1] - F[1]) > 6) { Q41.line(ctx, [tt.a, F], '#fbbf24', 2.4); Q46.tag(ctx, 'd = ' + c.dsh.toFixed(2) + ' cm', (tt.a[0] + F[0]) / 2 + 40, (tt.a[1] + F[1]) / 2 + 14, '#b45309', { s: 10.5 }); } }
      if (S.p.num) { const lab = { '': '1', 'r': '2', 't': '3', 'tr': '4', 'trt': '5' }; c.T.segs.forEach(q => { const k = lab[q.path]; if (!k) return; const L = Math.hypot(q.b[0] - q.a[0], q.b[1] - q.a[1]), f = q.out ? Math.min(.5, 110 / L) : .5, x = q.a[0] + (q.b[0] - q.a[0]) * f, y = q.a[1] + (q.b[1] - q.a[1]) * f;
        K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x + 16, y - 4, 12, 0, TAU); ctx.fill(); ctx.stroke(); }); Q46.T(ctx, k, x + 16, y - 4, { s: 13, w: 900, c: '#6d28d9' }); }); }
      if (S.ex) Q46.steps(ctx, S, Object.assign({}, EX[S.ex], { title: EX[S.ex].t, k: S.k }), { y: 70, x: w - 12, wd: 320 });
      else Q46.card(ctx, S, [{ t: 'θ₁ = ' + S.a.toFixed(0) + '°    θ₂ = ' + Q46.deg(c.t2).toFixed(1) + '°', mono: 1, w: 900 }, { t: 'زاوية الخروج = θ₁ = ' + S.a.toFixed(0) + '°', c: '#b91c1c', w: 800 }, { t: 'الشعاع الخارج يوازي الساقط', c: '#7c3aed', w: 800 }, { t: 'd = t sin(θ₁ − θ₂) / cos θ₂', mono: 1 }, { t: 'd = ' + c.dsh.toFixed(2) + ' cm   (t = ' + S.tk.toFixed(1) + ' cm)', mono: 1, c: '#b45309', w: 900 }], { title: 'الانكسار في متوازي المستطيلات', y: 70, wd: 320 });
      Q41.knob(ctx, g.x1 - 30, g.bot, '#22d3ee', 9);
      const C = D.chips(S, g); Q46.drawChips(ctx, C.m); Q46.drawChips(ctx, C.e);
      Q46.banner(ctx, w, 'اسحب الليزر، واسحب الوجه السفلي لتغيير السمك');
    },
    chips(S, g) { return { m: Q42.chips(S, 'mt', [['1.52', 'زجاج تاجي 1.52'], ['1.49', 'بوليستيرين 1.49'], ['2.42', 'الماس 2.42']], g.h - 128, String(S.p.n), (S2, k) => { setParam(S2, 'n', +k); }, { bw: 160, col: '#0e7490' }),
      e: Q46.exChips(S, 'ex', [['free', 'حر'], ['q7', 'سؤال 7: الأشعة 1–5']], g.h - 84, EX, { bw: 170 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), c = D.run(S, g), C = D.chips(S, g);
      return [{ id: 'src', x: c.P[0], y: c.P[1], r: 26, cx: g.O[0], cy: g.O[1], keep: true, tip: 'اسحب الليزر حول نقطة السقوط', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'ang', Math.round(clamp(Q46.deg(-d.ang - Math.PI / 2), 0, 80))); } },
        { id: 'bot', x: g.x1 - 30, y: g.bot, r: 18, axis: 'y', keep: true, hint: false, tip: 'اسحب لتغيير سمك المتوازي', drag: (S2, d) => { setParam(S2, 'th', Math.round(clamp((d.oy + d.y - d.sy - g.top) / PX, 2, 6) * 2) / 2); } }].concat(C.m, C.e); },
    readings(S) { const c = D.run(S, D.geo(S)); return [rd('زاوية السقوط θ₁', S.p.ang + '°'), rd('زاوية الانكسار θ₂', Q46.deg(c.t2).toFixed(2) + '°'), rd('زاوية الخروج', S.p.ang + '°'), rd('الإزاحة الجانبية d', c.dsh.toFixed(2) + ' cm')]; },
    record(S) { const c = D.run(S, D.geo(S)); return { a: S.p.ang, n: S.p.n, t: S.p.th, d: +c.dsh.toFixed(2) }; },
    cols: [['a', 'θ₁ (°)'], ['n', 'n'], ['t', 't (cm)'], ['d', 'd (cm)']],
    explain(S) { return Q26.ex('الشعاع ينكسر مرتين ويخرج موازياً لاتجاهه الأصلي لكنه مزاح جانبياً، وعند كل وجه تنعكس نسبة صغيرة من الضوء.', 'الوجهان متوازيان، فزاوية السقوط على الوجه السفلي تساوي θ₂ ، وبتطبيق قانون سنيل مرة أخرى تكون زاوية الخروج مساوية θ₁.', 'زجاج النافذة يزيح صورة الأشياء إزاحة صغيرة جداً لأنه رقيق، ونرى أيضاً انعكاسات خافتة على الزجاج.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D1 — معامل الانكسار المطلق n = c / v ، الطول الموجي، والجدول (2) (6-4 + مثال 1 + مسائل 1 و 2 و 6) =============== */
(() => {
  const EX = {
    e1: { t: 'مثال 1 ص 102', q: ['وجد أن سرعة الضوء في وسط شفاف تساوي 1.56×10⁸ m/s. جد معامل الانكسار المطلق لهذا الوسط، إذا علمت أن سرعة الضوء في الفراغ 3×10⁸ m/s.'], lines: ['n = c / v', 'n = 3×10⁸ / 1.56×10⁸', 'n = 3 / 1.56', 'معامل الانكسار المطلق n = 1.92', 'وهذا يطابق الزركون في الجدول (2)'], load: S => D.pick(S, 'zirc') },
    p1: { t: 'مسألة 1 ص 112', q: ['معامل الانكسار المطلق للماس 2.42 وسرعة الضوء في الفراغ 3×10⁸ m/s. جد سرعة الضوء في الماس.'], lines: ['n = c / v', 'v = c / n', 'v = 3×10⁸ / 2.42', 'سرعة الضوء في الماس v = 1.24×10⁸ m/s'], load: S => D.pick(S, 'dia') },
    p2: { t: 'مسألة 2 ص 112', q: ['سرعة الضوء في أحد المواد الشفافة تساوي c / 1.52 حيث c سرعة الضوء في الفراغ. ما معامل انكساره المطلق؟'], lines: ['n = c / v', 'n = c / (c / 1.52)', 'معامل الانكسار المطلق n = 1.52'], load: S => D.pick(S, 'crown') },
    p6: { t: 'مسألة 6 ص 113 (b)', q: ['يسقط ضوء من الهواء على مادة شفافة معامل انكسارها 1.5 ، جد طول موجة الضوء في المادة إذا كان طول موجته في الهواء 600 nm.'], lines: ['n₂ / n₁ = λ₁ / λ₂', '1.5 / 1 = 600 / λ₂', 'λ₂ = 600 / 1.5', 'طول الموجة في المادة λ₂ = 400 nm'], load: S => { S.mat = null; S.nv = 1.5; setParam(S, 'n', 1.5, false); setParam(S, 'lam', 600); } } };
  const D = { id: 'g10_r_index', page: 100, fig: 'المعادلات 1-6 إلى 11-6 + الجدول (2) + مثال 1',
    desc: 'معامل الانكسار النسبي ₁n₂ = sin θ₁ / sin θ₂ = v₁ / v₂ = λ₁ / λ₂. وإذا كان الوسط الأول هو الفراغ (v₁ = c = 3×10⁸ m/s) سمي معامل الانكسار المطلق n = c / v. سرعة الضوء في أي مادة أقل دائماً من سرعته في الفراغ، ومعامل الانكسار المطلق للفراغ يساوي واحداً. ومن n₁ = c / v₁ و n₂ = c / v₂ نجد ₁n₂ = n₂ / n₁ = v₁ / v₂ = λ₁ / λ₂. الجدول (2) يبين معامل الانكسار المطلق لبعض المواد لضوء الصوديوم 589 nm.',
    tags: 'معامل الانكسار المطلق n=c/v معامل الانكسار النسبي 1n2 سرعة الضوء الطول الموجي λ1/λ2 مبدأ هايجنز الجدول 2 هواء ماء أسيتون كليسرين زجاج تاجي الزركون الماس مثال 1 1.92 مسألة 1 1.24×10⁸ مسألة 2 1.52 مسألة 6 400nm',
    tools: ['جدول معاملات الانكسار (الجدول 2)', 'نبضة ضوء في الفراغ وفي المادة', 'جبهات موجة مستوية'],
    steps: ['اختر مادة من الجدول (2) على اليمين: قارن سرعة نبضة الضوء فيها بسرعتها في الفراغ.', 'لاحظ جبهات الموجة عند السطح الفاصل: التردد ثابت، والطول الموجي يقصر في المادة بنسبة n.', 'غيّر زاوية سقوط جبهة الموجة والطول الموجي من لوحة التحكم.', 'حل مثال 1 والمسائل 1 و 2 و 6b خطوة خطوة.'],
    concl: ['n = c / v: معامل الانكسار المطلق نسبة بين سرعة الضوء في الفراغ وسرعته في المادة، ولا وحدة له.', 'معامل الانكسار المطلق للفراغ = 1 ، وللمواد أكبر من 1 لأن v < c دائماً.', '₁n₂ = sin θ₁ / sin θ₂ = v₁ / v₂ = λ₁ / λ₂ = n₂ / n₁.', 'تردد الضوء لا يتغير عند انتقاله من وسط إلى آخر، أما سرعته وطوله الموجي فيتغيران.', 'مثال 1: n = 1.92. مسألة 1: v = 1.24×10⁸ m/s. مسألة 2: n = 1.52. مسألة 6b: λ₂ = 400 nm.'],
    laws: ['g10_rl_nabs', 'g10_rl_nrel'],
    controls: [R('n', 'معامل الانكسار n (مادة مخصّصة)', 1, 2.42, 1.33, .01, '', (v, S) => { if (S && Math.abs(v - S.nv) > .004) { S.mat = null; S.nv = v; } }), R('ang', 'زاوية سقوط جبهة الموجة', 0, 70, 35, 1, '°'), R('lam', 'الطول الموجي في الفراغ λ₁', 400, 700, 589, 1, 'nm')],
    setup(S) { S.mat = 'water'; S.nv = 1.33; S.clk = 0; S.race = 0; S.a = 35; S.ex = null; S.k = 0; },
    update(S, dt) { S.clk += dt; S.race += dt; if (S.race > 3.6) S.race = 0; Q46.ease(S, 'a', S.p.ang, dt); },
    pick(S, k) { const m = Q46.mat(k); S.mat = k; S.nv = m[2]; setParam(S, 'n', Math.round(m[2] * 100) / 100, false); setParam(S, 'lam', 589); S.race = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = Math.min(w - 345, 480); return { w, h, L, x0, x1, ry: 92, wy: 235, yb: 410, wb: 590, tx: w - 12 - 320, ty: 318 }; },
    name(S) { return S.mat ? Q46.mat(S.mat)[1] : 'مادة مخصّصة'; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), n = S.nv, lam = S.p.lam, col = Q46.wl(lam); Q46.bg(ctx, w, h);
      // ---- race: same time, distance ∝ speed ----
      const xs = g.x0 + 92, xe = g.x1 - 14, Lr = xe - xs, f = Math.min(1, S.race / 2.4);
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.05)'; rr(ctx, g.x0, g.ry - 16, g.x1 - g.x0, 112, 10); ctx.fill(); [g.ry + 18, g.ry + 66].forEach((y, i) => { ctx.fillStyle = i ? 'rgba(165,243,252,.22)' : 'rgba(255,255,255,.06)'; rr(ctx, xs, y - 13, Lr, 26, 13); ctx.fill(); ctx.strokeStyle = 'rgba(203,213,225,.5)'; ctx.stroke(); }); });
      Q46.lab(ctx, 'الفراغ', g.x0 + 44, g.ry + 18, { s: 11.5, w: 900 }); Q46.lab(ctx, D.name(S).length > 12 ? D.name(S).split(' ')[0] : D.name(S), g.x0 + 44, g.ry + 66, { s: 10.5, w: 900, c: '#a5f3fc' });
      [[f, g.ry + 18], [f / n, g.ry + 66]].forEach(q => { const x = xs + 12 + (Lr - 24) * q[0]; Q46.beam(ctx, [xs + 6, q[1]], [x, q[1]], .5, col, 3, { arrow: false }); K.raw(ctx, () => { const gg = ctx.createRadialGradient(x, q[1], 0, x, q[1], 14); gg.addColorStop(0, '#fff'); gg.addColorStop(.4, col); gg.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(x, q[1], 14, 0, TAU); ctx.fill(); }); });
      Q46.T(ctx, 'c = 3×10⁸ m/s', xs + Lr - 70, g.ry, { s: 10, w: 800, c: '#e2e8f0' }); Q46.T(ctx, 'v = c / n = ' + Q42.sci(3e8 / n, 3, 'm/s'), xs + Lr - 90, g.ry + 48, { s: 10, w: 800, c: '#a5f3fc' });
      // ---- wavefronts crossing the boundary (Huygens) ----
      const Oc = [(g.x0 + g.x1) / 2, g.yb], th = Q46.rad(S.a), th2 = Math.asin(Math.sin(th) / n), l1 = 46 * lam / 589, l2 = l1 / n, ph = ((S.clk * .7) % 1) * l1, k1 = [Math.sin(th), Math.cos(th)], k2 = [Math.sin(th2), Math.cos(th2)];
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.03)'; ctx.fillRect(g.x0, g.wy, g.x1 - g.x0, g.yb - g.wy); ctx.fillStyle = 'rgba(103,232,249,.16)'; ctx.fillRect(g.x0, g.yb, g.x1 - g.x0, g.wb - g.yb); });
      const crest = (k, c0, lam2, y0, y1) => K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(g.x0, y0, g.x1 - g.x0, y1 - y0); ctx.clip(); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.shadowColor = col; ctx.shadowBlur = 8; const t = [-k[1], k[0]];
        for (let m = -14; m <= 14; m++) { const c = m * lam2 + c0, p0 = [Oc[0] + k[0] * c, Oc[1] + k[1] * c]; ctx.beginPath(); ctx.moveTo(p0[0] - t[0] * 600, p0[1] - t[1] * 600); ctx.lineTo(p0[0] + t[0] * 600, p0[1] + t[1] * 600); ctx.stroke(); } ctx.restore(); });
      crest(k1, ph, l1, g.wy, g.yb); crest(k2, ph / n, l2, g.yb, g.wb);
      Q41.line(ctx, [[g.x0, g.yb], [g.x1, g.yb]], 'rgba(186,230,253,.9)', 2); Q46.normal(ctx, Oc, -Math.PI / 2, 150, { L2: 150, c: 'rgba(255,255,255,.4)' });
      Q46.beam(ctx, [Oc[0] - k1[0] * 165, Oc[1] - k1[1] * 165], Oc, .7, '#ffffff', 2, { at: .6 }); Q46.beam(ctx, Oc, [Oc[0] + k2[0] * 160, Oc[1] + k2[1] * 160], .7, '#ffffff', 2, { at: .6 });
      if (S.a > .5) { Q46.arcAng(ctx, Oc, 44, -Math.PI / 2, Math.atan2(-k1[1], -k1[0]), '#dc2626', 'θ₁'); Q46.arcAng(ctx, Oc, 44, Math.PI / 2, Math.atan2(k2[1], k2[0]), '#16a34a', 'θ₂'); }
      Q46.tag(ctx, 'λ₁ = ' + lam + ' nm', g.x0 + 64, g.wy + 18, '#334155', { s: 10.5 }); Q46.tag(ctx, 'λ₂ = λ₁ / n = ' + (lam / n).toFixed(0) + ' nm', g.x0 + 90, g.wb - 16, '#0e7490', { s: 10.5 });
      Q46.lab(ctx, 'الفراغ n₁ = 1', g.x1 - 60, g.yb - 14, { s: 10 }); Q46.lab(ctx, (D.name(S).length > 12 ? D.name(S).split(' ')[0] : D.name(S)) + '  n = ' + n, g.x1 - 70, g.yb + 16, { s: 10, c: '#a5f3fc' });
      Q46.tag(ctx, 'التردد f ثابت', (g.x0 + g.x1) / 2 + 100, g.wy + 18, '#7c3aed', { s: 10 });
      // ---- card / steps ----
      if (S.ex) Q46.steps(ctx, S, Object.assign({}, EX[S.ex], { title: EX[S.ex].t, k: S.k }), { y: 70, x: w - 12, wd: 320 });
      else Q46.card(ctx, S, [{ t: D.name(S) + ':  n = ' + (n < 1.01 ? n.toFixed(5) : n.toFixed(2)), w: 900, c: '#0e7490' }, { t: 'v = c / n = ' + Q42.sci(3e8 / n, 3, 'm/s'), mono: 1, c: '#b91c1c', w: 900 }, { t: 'λ₂ = λ₁ / n = ' + (lam / n).toFixed(0) + ' nm', mono: 1 }, { t: '₁n₂ = sinθ₁/sinθ₂ = v₁/v₂ = λ₁/λ₂', mono: 1, c: '#6d28d9' }, { t: 'سرعة الضوء في المادة أقل من c دائماً', c: '#334155' }], { title: 'معامل الانكسار المطلق n = c / v', y: 70, wd: 320 });
      // ---- Table (2) ----
      const rh = 17.4; let y = g.ty; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.96)'; rr(ctx, g.tx, y - 6, 320, 22 + rh * 15 + 4, 8); ctx.fill(); ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 1.5; ctx.stroke(); });
      Q46.T(ctx, 'الجدول (2): معامل الانكسار المطلق لضوء الصوديوم', g.tx + 160, y + 6, { s: 10.5, w: 900, c: '#6d28d9' }); y += 22;
      Q46.TAB.forEach(gr => { Q46.T(ctx, gr[1], g.tx + 300, y + rh / 2, { s: 10.5, w: 900, c: '#be185d', a: 'right' }); y += rh; gr[2].forEach(m => { const on = S.mat === m[0]; if (on) K.raw(ctx, () => { ctx.fillStyle = 'rgba(124,58,237,.16)'; ctx.fillRect(g.tx + 6, y, 308, rh); });
        Q46.T(ctx, m[1], g.tx + 290, y + rh / 2, { s: 10.5, w: on ? 900 : 700, c: '#1e293b', a: 'right' }); Q46.T(ctx, String(m[2]), g.tx + 60, y + rh / 2, { s: 10.5, w: 900, c: on ? '#6d28d9' : '#334155' }); y += rh; }); });
      Q46.drawChips(ctx, D.chips(S, g)); Q46.banner(ctx, w, 'اختر مادة من الجدول (2)، وقارن السرعة والطول الموجي');
    },
    rows(S, g) { const out = [], rh = 17.4; let y = g.ty + 22; Q46.TAB.forEach(gr => { y += rh; gr[2].forEach(m => { out.push({ id: 'row_' + m[0], x: g.tx + 160, y: y + rh / 2, w: 300, h: rh, axis: 'none', hint: false, tip: m[1] + ' ' + m[2], click: S2 => { D.pick(S2, m[0]); S2.ex = null; } }); y += rh; }); }); return out; },
    chips(S, g) { return Q46.exChips(S, 'ex', [['free', 'حر'], ['e1', 'مثال 1'], ['p1', 'مسألة 1'], ['p2', 'مسألة 2'], ['p6', 'مسألة 6b']], g.h - 84, EX, { bw: 110 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), Oc = [(g.x0 + g.x1) / 2, g.yb], th = Q46.rad(S.a);
      return [{ id: 'wave', x: Oc[0] - Math.sin(th) * 150, y: Oc[1] - Math.cos(th) * 150, r: 22, cx: Oc[0], cy: Oc[1], keep: true, tip: 'اسحب لتغيير زاوية سقوط جبهة الموجة', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'ang', Math.round(clamp(Q46.deg(-d.ang - Math.PI / 2), 0, 70))); } },
        { id: 'race', x: (g.x0 + g.x1) / 2, y: g.ry + 42, w: g.x1 - g.x0, h: 90, axis: 'none', hint: false, tip: 'اضغط لإعادة السباق', click: S2 => { S2.race = 0; } }].concat(D.rows(S, g), D.chips(S, g)); },
    readings(S) { return [rd('المادة', D.name(S)), rd('n', String(S.nv)), rd('v = c / n', Q42.sci(3e8 / S.nv, 3, 'm/s')), rd('λ₂', (S.p.lam / S.nv).toFixed(0) + ' nm')]; },
    record(S) { return { m: D.name(S), n: S.nv, v: +(3 / S.nv).toFixed(3), l: +(S.p.lam / S.nv).toFixed(0) }; },
    cols: [['m', 'المادة'], ['n', 'n'], ['v', 'v (×10⁸ m/s)'], ['l', 'λ₂ (nm)']],
    explain(S) { return Q26.ex('النبضة في المادة تتأخر عن النبضة في الفراغ، وجبهات الموجة تتقارب داخل المادة وتنحرف.', 'n = c / v: كلما كبر معامل الانكسار قلت سرعة الضوء في المادة. التردد يحدده المصدر فلا يتغير، لذا يقصر الطول الموجي λ = v / f بالنسبة نفسها.', 'الماس (n = 2.42) يبطئ الضوء إلى 1.24×10⁸ m/s تقريباً، وهذا سر بريقه.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D2 — تفريق الضوء الأبيض بالموشور: n يعتمد على الطول الموجي (إثراء للجدول 2: ضوء الصوديوم 589 nm) =============== */
(() => {
  const WL = [700, 640, 590, 550, 500, 460, 420], MT = { crown: ['زجاج تاجي', 1.52, .0042], flint: ['زجاج فلنت', 1.62, .0098], water: ['ماء', 1.33, .003], dia: ['الماس', 2.42, .012] };
  const D = { id: 'g10_r_disperse', page: 103, fig: 'الجدول (2): القيم لضوء الصوديوم 589 nm',
    desc: 'قيم الجدول (2) مقيسة لضوء الصوديوم (طوله الموجي 589 nm) لأن معامل الانكسار يختلف قليلاً باختلاف الطول الموجي: يكون للبنفسجي أكبر منه للأحمر. لذلك ينكسر كل لون بزاوية مختلفة عند مروره في الموشور فيتفرق الضوء الأبيض إلى ألوان الطيف. كل شعاع هنا محسوب بقانون سنيل عند الوجهين بمعامل انكساره الخاص.',
    tags: 'تفريق الضوء موشور زجاجي طيف ألوان معامل الانكسار يعتمد على الطول الموجي أحمر بنفسجي زاوية الانحراف أقل انحراف 589nm',
    tools: ['صندوق ضوئي (ضوء أبيض)', 'موشور زجاجي متساوي الأضلاع', 'شاشة بيضاء'],
    steps: ['اسحب الموشور لتدويره، ولاحظ تغير زاوية الانحراف ومكان الطيف على الشاشة.', 'اضغط «أقل انحراف» ليمر الشعاع متماثلاً داخل الموشور.', 'بدّل المادة: الزجاج الفلنت والماس يفرقان الألوان أكثر من الماء.', 'أطفئ «الضوء الأبيض» لترى شعاعاً أحمر واحداً لا يتفرق.'],
    concl: ['معامل الانكسار يعتمد على الطول الموجي: n للبنفسجي أكبر من n للأحمر.', 'لذلك ينحرف البنفسجي أكثر من الأحمر فيتفرق الضوء الأبيض إلى ألوان الطيف.', 'الضوء أحادي اللون (أحمر فقط) ينكسر ولا يتفرق.', 'لهذا تذكر جداول معامل الانكسار طولاً موجياً محدداً (589 nm).'],
    laws: ['g10_rl_snell'],
    controls: [R('rot', 'تدوير الموشور', -30, 30, 0, 1, '°'), R('disp', 'تكبير التفريق (للتوضيح)', 1, 6, 3, .5, '×'), TG('white', 'ضوء أبيض (وإلا أحمر فقط)', true, null, 'light')],
    setup(S) { S.m = 'crown'; S.rt = 0; },
    update(S, dt) { if (!S._md && S.W) { S._md = 1; D.minDev(S); S.rt = S.p.rot; } Q46.ease(S, 'rt', S.p.rot, dt, 7); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, C: [L + 210, 370], side: 220, y0: 340 }; },
    nOf(S, nm) { const m = MT[S.m], B = m[2] * S.p.disp, A = m[1] - B / (.589 * .589); return A + B / ((nm / 1000) ** 2); },
    prism(S, g) { const R0 = g.side / Math.sqrt(3), P = [-90, 30, 150].map(a => [g.C[0] + R0 * Math.cos(Q46.rad(a)), g.C[1] + R0 * Math.sin(Q46.rad(a))]); return Q46.rotP(P, g.C, Q46.rad(S.rt)); },
    run(S, g, rt) { if (rt != null) S = Object.assign({}, S, { rt }); const P = D.prism(S, g), E = Q46.polyE(P), src = [g.L + 20, g.y0], d = [1, 0];
      return (S.p.white ? WL : [700]).map(nm => { const n = D.nOf(S, nm); return { nm, n, T: Q46.trace(E, p => Q46.inPoly(P, p) ? n : 1, src, d, { part: false, depth: 4, far: 900 }) }; }); },
    dev(T) { const s = T.segs[T.segs.length - 1]; if (!s || !s.out) return null; const a = Math.atan2(s.b[1] - s.a[1], s.b[0] - s.a[0]); return Q46.deg(a); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = D.prism(S, g), R = D.run(S, g), yel = R.find(r => r.nm === 590) || R[0], ys = yel.T.segs[yel.T.segs.length - 1]; Q46.bg(ctx, w, h);
      // screen perpendicular to the yellow ray, 250 px after the prism
      let scr = null; if (ys && ys.out) { const L = Math.hypot(ys.b[0] - ys.a[0], ys.b[1] - ys.a[1]), u = [(ys.b[0] - ys.a[0]) / L, (ys.b[1] - ys.a[1]) / L], c = [ys.a[0] + u[0] * 250, ys.a[1] + u[1] * 250], t = [-u[1], u[0]]; scr = { c, u, t, a: [c[0] - t[0] * 70, c[1] - t[1] * 70], b: [c[0] + t[0] * 70, c[1] + t[1] * 70] }; }
      Q46.rayBox(ctx, g.L + 20, g.y0, 0);
      const hitScr = s => { if (!scr || !s.out) return null; const den = s.b[0] - s.a[0], dy = s.b[1] - s.a[1], L = Math.hypot(den, dy), d = [den / L, dy / L], q = d[0] * scr.u[0] + d[1] * scr.u[1]; if (q <= 0) return null; const t = ((scr.c[0] - s.a[0]) * scr.u[0] + (scr.c[1] - s.a[1]) * scr.u[1]) / q; return [s.a[0] + d[0] * t, s.a[1] + d[1] * t]; };
      const marks = [];
      R.forEach(r => { r.T.segs.forEach((s, i) => { if (i === 0) return; let b = s.b; if (s.out) { const hp = hitScr(s); if (hp) { b = hp; marks.push([hp, r.nm]); } } Q46.beam(ctx, s.a, b, S.p.white ? .55 : 1, Q46.wl(r.nm), S.p.white ? 2 : 3, { arrow: false }); }); });
      Q46.beam(ctx, [g.L + 20, g.y0], R[0].T.segs[0].b, 1, S.p.white ? '#ffffff' : '#ff2a2a', 3.4);
      Q46.glass(ctx, Q46.polyPath(P), { bb: [g.C[0] - 100, g.C[1] - 100, g.C[0] + 100, g.C[1] + 100] });
      if (scr) { K.raw(ctx, () => { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#f1f5f9'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(scr.a[0], scr.a[1]); ctx.lineTo(scr.b[0], scr.b[1]); ctx.stroke(); ctx.globalCompositeOperation = 'source-over'; marks.forEach(m => { ctx.fillStyle = Q46.wl(m[1]); ctx.beginPath(); ctx.arc(m[0][0], m[0][1], 4.5, 0, TAU); ctx.fill(); }); ctx.restore(); }); Q46.lab(ctx, 'شاشة', scr.b[0] + 26, scr.b[1] + 6, { s: 10.5 }); }
      const dR = D.dev(R[0].T), dV = D.dev(R[R.length - 1].T), m = MT[S.m];
      const Lc = [{ t: 'المادة: ' + m[0], w: 900, c: '#0e7490' }, { t: 'للأحمر 700 nm:  n = ' + R[0].n.toFixed(4), c: '#b91c1c', w: 800 }];
      if (S.p.white) Lc.push({ t: 'للبنفسجي 420 nm:  n = ' + R[R.length - 1].n.toFixed(4), c: '#6d28d9', w: 800 }, { t: dR != null && dV != null ? 'زاوية الانحراف: الأحمر ' + dR.toFixed(1) + '° والبنفسجي ' + dV.toFixed(1) + '°' : 'الضوء لا يخرج: انعكاس كلي', c: '#334155' }, { t: 'البنفسجي ينحرف أكثر من الأحمر', c: '#be185d', w: 900 });
      else Lc.push({ t: 'لون واحد: ينكسر ولا يتفرق', c: '#be185d', w: 900 });
      Q46.card(ctx, S, Lc, { title: 'تفريق الضوء بالموشور', y: 70, wd: 320 });
      const C = D.chips(S, g); Q46.drawChips(ctx, C.m); Q46.drawChips(ctx, C.o);
      Q46.banner(ctx, w, 'اسحب الموشور لتدويره، وبدّل مادته');
    },
    minDev(S2) { const g = D.geo(S2); let best = 0, bd = 1e9; for (let r = -30; r <= 30; r += .5) { const R = D.run(S2, g, r), y = R.find(q => q.nm === 590) || R[0], dv = D.dev(y.T); if (dv != null && Math.abs(dv) < bd) { bd = Math.abs(dv); best = r; } } setParam(S2, 'rot', Math.round(best)); },
    chips(S, g) { return { m: Q42.chips(S, 'mt', Object.keys(MT).map(k => [k, MT[k][0]]), g.h - 84, S.m, (S2, k) => { S2.m = k; }, { bw: 140, col: '#0e7490' }), o: Q42.chips(S, 'op', [['min', 'أقل انحراف'], ['z', 'إعادة الموشور']], g.h - 128, '', (S2, k) => { if (k === 'min') D.minDev(S2); else setParam(S2, 'rot', 0); }, { bw: 150 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), P = D.prism(S, g);
      return [{ id: 'prism', x: P[1][0] - 20, y: P[1][1] - 10, r: 30, cx: g.C[0], cy: g.C[1], keep: true, tip: 'اسحب لتدوير الموشور', idle: 'دوّر ✋', drag: (S2, d) => { setParam(S2, 'rot', clamp(S2.p.rot + Q46.deg(d.dang), -30, 30)); } }].concat(C.m, C.o); },
    readings(S) { const R = D.run(S, D.geo(S)), dR = D.dev(R[0].T), dV = D.dev(R[R.length - 1].T); return [rd('n للأحمر', R[0].n.toFixed(4)), rd('n للبنفسجي', R[R.length - 1].n.toFixed(4)), rd('انحراف الأحمر', dR == null ? '—' : dR.toFixed(2) + '°'), rd('انحراف البنفسجي', dV == null ? '—' : dV.toFixed(2) + '°')]; },
    explain(S) { return Q26.ex('الضوء الأبيض يخرج من الموشور طيفاً من الألوان: الأحمر أقلها انحرافاً والبنفسجي أكثرها.', 'معامل الانكسار للبنفسجي أكبر قليلاً منه للأحمر، فبحسب قانون سنيل تكون زاوية انكساره أصغر داخل الموشور وانحرافه الكلي أكبر.', 'قوس قزح يتكون بانكسار ضوء الشمس وتفرقه داخل قطرات المطر.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E1 — الزاوية الحرجة والانعكاس الكلي الداخلي: نصف الأسطوانة الزجاجية (الأشكال 12-6 إلى 14-6 + مثال 3 + مسألتا 3 و 5) =============== */
(() => {
  const NW = 4 / 3;
  const EX = {
    e3: { t: 'مثال 3 ص 107', q: ['إذا علمت أن الزاوية الحرجة للضوء المنتقل من مادة شفافة إلى الهواء 41.1° ، فما معامل الانكسار المطلق لهذه المادة؟', 'sin 41.1° = 0.657'], lines: ['n = 1 / sin θc', 'n = 1 / sin 41.1°', 'n = 1 / 0.657', 'معامل الانكسار المطلق n = 1.52'], load: S => { setParam(S, 'n1', 1.52); setParam(S, 'wat', false); setParam(S, 'ang', 41.1); } },
    p3: { t: 'مسألة 3 ص 112', q: ['معامل الانكسار المطلق للماء 4/3 ولأحد أنواع الزجاج 3/2. جد الزاوية الحرجة بين هذين الوسطين.', 'sin 62.75° = 0.889'], lines: ['sin θc = n₂ / n₁', 'sin θc = (4/3) / (3/2)', 'sin θc = 8 / 9 = 0.889', 'θc = 62.75°', 'تحدث في الزجاج لأن معامل انكساره أكبر'], load: S => { setParam(S, 'n1', 1.5); setParam(S, 'wat', true); setParam(S, 'ang', 62.8); } },
    p5: { t: 'مسألة 5 ص 113', q: ['سرعة الضوء في الجليد تساوي c / 1.31. جد الزاوية الحرجة للضوء المنتقل من الجليد إلى الهواء.', 'sin 49.73° = 0.763'], lines: ['n = c / v = c / (c / 1.31) = 1.31', 'sin θc = 1 / n', 'sin θc = 1 / 1.31 = 0.763', 'θc = 49.73°'], load: S => { setParam(S, 'n1', 1.31); setParam(S, 'wat', false); setParam(S, 'ang', 49.7); } } };
  const D = { id: 'g10_r_semi', page: 105, fig: 'الأشكال 12-6 و 13-6 و 14-6 + مثال 3',
    desc: 'إذا سقط شعاع من وسط معامل انكساره كبير (كالزجاج) إلى وسط معامل انكساره أصغر (كالهواء) ابتعد الشعاع المنكسر عن العمود المقام، وكلما زادت زاوية السقوط زادت زاوية الانكسار حتى تصبح 90°: عندها تسمى زاوية السقوط بالزاوية الحرجة θc. وإذا زادت زاوية السقوط على الزاوية الحرجة انعكس الضوء كله انعكاساً كلياً داخلياً. sin θc = n₂ / n₁ ، وعندما يكون الوسط الثاني هواء: n = 1 / sin θc.',
    tags: 'الزاوية الحرجة الانعكاس الكلي الداخلي نصف أسطوانة زجاجية sin θc = n2/n1 n = 1/sin θc مثال 3 41.1 1.52 مسألة 3 62.75 مسألة 5 جليد 49.73 الماس 24.4',
    tools: ['قطعة زجاج نصف أسطوانية', 'مصدر ليزري', 'قرص منقلة'],
    steps: ['الليزر يتجه نحو مركز الوجه المستوي فلا ينكسر عند السطح المنحني. اسحبه لزيادة زاوية السقوط θ₁.', 'لاحظ: الشعاع المنكسر يبتعد عن العمود، ويزداد سطوع الشعاع المنعكس.', 'عند θ₁ = θc يمر الشعاع المنكسر مماساً للسطح (θ₂ = 90°)، وبعدها ينعكس الضوء كله.', 'بدّل المادة (جليد، ماء، الماس) أو اجعل الوسط الخارجي ماءً، وحل مثال 3 والمسألتين 3 و 5.'],
    concl: ['الزاوية الحرجة: زاوية السقوط في الوسط الأكثف ضوئياً التي تقابلها زاوية انكسار قائمة 90° في الوسط الأقل كثافة.', 'شرطا الانعكاس الكلي الداخلي: انتقال الضوء من وسط أكثف ضوئياً إلى أقل كثافة، وزاوية سقوط أكبر من الزاوية الحرجة.', 'sin θc = n₂ / n₁ ، وللهواء n = 1 / sin θc.', 'مثال 3: n = 1.52. مسألة 3: θc = 62.75°. مسألة 5: θc = 49.73°.', 'الماس: θc ≈ 24.4° من أصغر الزوايا الحرجة، لذا يتألق.'],
    laws: ['g10_rl_crit', 'g10_rl_snell'],
    controls: [R('ang', 'زاوية السقوط داخل المادة θ₁', 0, 89, 30, .1, '°'), R('n1', 'معامل انكسار نصف الأسطوانة n₁', 1.3, 2.42, 1.52, .01, ''), TG('wat', 'الوسط الخارجي ماء n = 4/3', false, null, 'flip'), TG('gr', 'منحنى شدة الانعكاس', true, null, 'graph')],
    setup(S) { S.a = 30; S.ex = null; S.k = 0; },
    update(S, dt) { Q46.ease(S, 'a', S.p.ang, dt); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = Math.min(w - 350, 480); return { w, h, L, x0, x1, O: [(x0 + x1) / 2, 330], R: 150 }; },
    n2(S) { return S.p.wat ? NW : 1; },
    run(S, g) { const n1 = S.p.n1, n2 = D.n2(S), t = Q46.rad(S.a), O = g.O, P = [O[0] - 215 * Math.sin(t), O[1] + 215 * Math.cos(t)], d = [Math.sin(t), -Math.cos(t)];
      const E = [{ k: 's', a: [O[0] - g.R, O[1]], b: [O[0] + g.R, O[1]] }, { k: 'c', c: O, r: g.R, a0: 0, a1: Math.PI }];
      const nAt = p => (p[1] > O[1] && Math.hypot(p[0] - O[0], p[1] - O[1]) < g.R) ? n1 : n2, T = Q46.trace(E, nAt, P, d, { depth: 4, minI: .006, ar: true });
      const tc = Q46.crit(n1, n2), t2 = Q46.snell(n1, n2, t), R = Q46.fres(n1, n2, Math.cos(t)); return { n1, n2, t, P, d, T, tc, t2, R }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = D.run(S, g), O = g.O; Q46.bg(ctx, w, h);
      if (S.p.wat) Q46.tank(ctx, g.x0, O[1] - 210, g.x1 - g.x0, O[1] + 4, O[1] - 190, { c1: 'rgba(56,189,248,.22)', c2: 'rgba(56,189,248,.28)' });
      Q46.protractor(ctx, O[0], O[1], 190, -Math.PI / 2, { fill: 'rgba(255,255,255,.05)' });
      Q46.glass(ctx, ctx2 => { ctx2.moveTo(O[0] - g.R, O[1]); ctx2.arc(O[0], O[1], g.R, Math.PI, 0, true); ctx2.closePath(); }, { bb: [0, O[1], 0, O[1] + g.R] });
      Q46.normal(ctx, O, -Math.PI / 2, 200, { L2: 200 });
      if (c.tc != null) { const a = Math.PI / 2 + c.tc; Q41.line(ctx, [O, [O[0] + Math.cos(a) * 180, O[1] + Math.sin(a) * 180]], 'rgba(251,191,36,.7)', 1.4, [3, 4]); Q46.tag(ctx, 'θc', O[0] + Math.cos(a) * 160 - 14, O[1] + Math.sin(a) * 160, '#b45309', { s: 10 }); }
      Q46.drawTrace(ctx, c.T, '#ff3030', 3, { clip: [0, 0, w, h - 150] }); Q46.dust(ctx, c.T, 'rgba(255,140,140,', null, [0, O[1], w, g.R]);
      Q46.laser(ctx, c.P[0], c.P[1], Math.atan2(c.d[1], c.d[0]));
      Q46.arcAng(ctx, O, 60, Math.PI / 2, Math.atan2(-c.d[1], -c.d[0]), '#dc2626', 'θ₁');
      if (c.t2 != null && S.a > .5) Q46.arcAng(ctx, O, 72, -Math.PI / 2, -Math.PI / 2 + c.t2, '#16a34a', 'θ₂');
      if (c.t2 == null) { Q46.tag(ctx, 'انعكاس كلي داخلي', O[0], O[1] - 40, '#be185d', { s: 12 }); }
      else if (c.tc != null && Math.abs(S.a - Q46.deg(c.tc)) < .35) Q46.tag(ctx, 'زاوية حرجة: θ₂ = 90°', O[0], O[1] - 40, '#b45309', { s: 12 });
      Q46.lab(ctx, 'n₁ = ' + c.n1.toFixed(2), O[0] - 70, O[1] + 40, { c: '#a5f3fc' }); Q46.lab(ctx, (S.p.wat ? 'ماء' : 'هواء') + '  n₂ = ' + (S.p.wat ? '4/3' : '1'), g.x0 + 60, O[1] - 18);
      let ch;
      if (S.ex) ch = Q46.steps(ctx, S, Object.assign({}, EX[S.ex], { title: EX[S.ex].t, k: S.k }), { y: 70, x: w - 12, wd: 320 });
      else ch = Q46.card(ctx, S, [{ t: 'θ₁ = ' + S.a.toFixed(1) + '°    θ₂ = ' + (c.t2 == null ? '—' : Q46.deg(c.t2).toFixed(1) + '°'), mono: 1, w: 900 }, { t: c.tc == null ? 'لا زاوية حرجة: n₁ ≤ n₂' : 'sin θc = n₂ / n₁ ⟸ θc = ' + Q46.deg(c.tc).toFixed(2) + '°', c: '#b45309', w: 900 },
        { t: c.t2 == null ? 'زاوية السقوط أكبر من θc: ينعكس الضوء كله' : 'زاوية السقوط أصغر من θc: ينكسر جزء وينعكس جزء', c: c.t2 == null ? '#be185d' : '#15803d', w: 900 }, { t: 'نسبة الضوء المنعكس: ' + (c.R * 100).toFixed(1) + '%', c: '#1d4ed8' }], { title: 'الزاوية الحرجة والانعكاس الكلي', y: 70, wd: 320 });
      // reflectance curve R(θ₁)
      if (S.p.gr) { const gx = w - 12 - 320, gy = Math.max(70 + ch + 14, 300), gw = 320, gh = Math.min(200, h - 160 - gy); if (gh > 110) { const X = a => gx + 40 + (gw - 60) * a / 90, Y = r => gy + gh - 28 - (gh - 52) * r;
        K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, gx, gy, gw, gh, 8); ctx.fill(); ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(0), Y(1)); ctx.lineTo(X(0), Y(0)); ctx.lineTo(X(90), Y(0)); ctx.stroke();
          ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 2.4; ctx.beginPath(); for (let a = 0; a <= 90; a += .5) { const r = Q46.fres(c.n1, c.n2, Math.cos(Q46.rad(a))); a ? ctx.lineTo(X(a), Y(r)) : ctx.moveTo(X(a), Y(r)); } ctx.stroke();
          if (c.tc != null) { ctx.setLineDash([4, 3]); ctx.strokeStyle = '#b45309'; ctx.beginPath(); ctx.moveTo(X(Q46.deg(c.tc)), Y(0)); ctx.lineTo(X(Q46.deg(c.tc)), Y(1)); ctx.stroke(); ctx.setLineDash([]); }
          ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(X(S.a), Y(c.R), 5, 0, TAU); ctx.fill(); });
        Q46.T(ctx, 'نسبة الضوء المنعكس مع زاوية السقوط', gx + gw / 2, gy + 13, { s: 10.5, w: 900, c: '#6d28d9' }); Q46.T(ctx, '100%', X(0) - 18, Y(1), { s: 9, w: 700, c: '#334155' }); Q46.T(ctx, '0', X(0) - 10, Y(0), { s: 9, w: 700, c: '#334155' }); [0, 30, 60, 90].forEach(a => Q46.T(ctx, a + '°', X(a), Y(0) + 11, { s: 9, w: 700, c: '#334155' })); if (c.tc != null) Q46.T(ctx, 'θc', X(Q46.deg(c.tc)) + 12, Y(1) + 8, { s: 10, w: 900, c: '#b45309' }); } }
      const C = D.chips(S, g); Q46.drawChips(ctx, C.m); Q46.drawChips(ctx, C.e);
      Q46.banner(ctx, w, 'اسحب الليزر لزيادة زاوية السقوط حتى الانعكاس الكلي');
    },
    chips(S, g) { return { m: Q42.chips(S, 'mt', [['1.52', 'زجاج 1.52'], ['1.31', 'جليد 1.31'], ['1.33', 'ماء 1.33'], ['2.42', 'الماس 2.42']], g.h - 128, String(S.p.n1), (S2, k) => { setParam(S2, 'n1', +k); S2.ex = null; }, { bw: 120, col: '#0e7490' }),
      e: Q46.exChips(S, 'ex', [['free', 'حر'], ['e3', 'مثال 3'], ['p3', 'مسألة 3'], ['p5', 'مسألة 5']], g.h - 84, EX, { bw: 115 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), c = D.run(S, g), C = D.chips(S, g);
      return [{ id: 'src', x: c.P[0], y: c.P[1], r: 26, cx: g.O[0], cy: g.O[1], keep: true, tip: 'اسحب الليزر حول القرص', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'ang', Math.round(clamp(Q46.deg(d.ang - Math.PI / 2), 0, 89) * 2) / 2); } }].concat(C.m, C.e); },
    readings(S) { const c = D.run(S, D.geo(S)); return [rd('زاوية السقوط θ₁', S.p.ang + '°'), rd('زاوية الانكسار θ₂', c.t2 == null ? 'انعكاس كلي' : Q46.deg(c.t2).toFixed(2) + '°'), rd('الزاوية الحرجة θc', c.tc == null ? '—' : Q46.deg(c.tc).toFixed(2) + '°'), rd('المنعكس', (c.R * 100).toFixed(1) + '%')]; },
    record(S) { const c = D.run(S, D.geo(S)); return { n: S.p.n1, a: S.p.ang, b: c.t2 == null ? 'كلي' : +Q46.deg(c.t2).toFixed(1), r: +(c.R * 100).toFixed(1) }; },
    cols: [['n', 'n₁'], ['a', 'θ₁ (°)'], ['b', 'θ₂ (°)'], ['r', 'المنعكس %']],
    explain(S) { return Q26.ex('كلما زادت زاوية السقوط ابتعد الشعاع المنكسر عن العمود وخفت، واشتد الشعاع المنعكس، حتى يختفي المنكسر كلياً بعد الزاوية الحرجة.', 'حسب قانون سنيل n₁ sin θ₁ = n₂ sin θ₂ ، وعندما n₁ > n₂ تصل θ₂ إلى 90° عند θ₁ = θc. بعدها لا يوجد حل لزاوية الانكسار فينعكس الضوء كله إلى الوسط الأكثف.', 'بريق الماس، والموشور العاكس في الناظور، والألياف البصرية كلها تعتمد على الانعكاس الكلي الداخلي.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E2 — الموشور العاكس وتطبيقاته: تغيير 90° و 180° ، البيريسكوب، الناظور، وبريق الماس (الأشكال 15-6 إلى 18-6) =============== */
(() => {
  const MODES = [['m90', 'تغيير 90°'], ['m180', 'تغيير 180°'], ['peri', 'البيريسكوب'], ['bino', 'الناظور'], ['dia', 'الماس']], COL = ['#ff3b3b', '#22c55e', '#38bdf8'];
  const D = { id: 'g10_r_prism', page: 108, fig: 'الأشكال 15-6 و 16-6 و 17-6 و 18-6',
    desc: 'الموشور العاكس موشور زجاجي قائم زواياه 45° – 90° – 45° ، يغير مسار الأشعة بزاوية 90° أو 180° بالانعكاس الكلي الداخلي (لأن زاوية السقوط 45° أكبر من الزاوية الحرجة للزجاج 41.1°). يستعمل في الناظور ذي الموشورين والبيريسكوب في الغواصات، ويفضل على المرآة المستوية لأنه يعكس نحو 100% من الضوء بينما المرآة النموذجية تعكس نحو 90%. والماس يتألق لأن زاويته الحرجة صغيرة (24.4°) فيعاني الضوء داخله عدة انعكاسات كلية.',
    tags: 'الموشور العاكس 45 90 45 تغيير 90 تغيير 180 الناظور البيريسكوب غواصة المرآة 90% الانعكاس الكلي 100% بريق الماس تألق الماس 24.4 2.42',
    tools: ['موشوران عاكسان قائما الزاوية', 'مصدر ليزري', 'مرآة مستوية للمقارنة', 'قطعة ماس'],
    steps: ['اختر «تغيير 90°» ثم «تغيير 180°»: تتبع الأشعة الثلاثة ولاحظ ترتيب ألوانها بعد الانعكاس.', 'اسحب الموشور لتدويره، وقلل معامل الانكسار تحت 1.41: يهرب الضوء لأن الزاوية الحرجة تصبح أكبر من 45°.', 'فعّل «مرآة بدل الموشور» وقارن شدة الضوء الخارج في البيريسكوب والناظور.', 'اختر «الماس» وقارنه بالزجاج (n = 1.52): أين يذهب الضوء؟'],
    concl: ['الموشور العاكس يغير مسار الضوء 90° (انعكاس كلي واحد) أو 180° (انعكاسان كليان).', 'يشترط أن تكون زاوية السقوط 45° أكبر من الزاوية الحرجة للمادة (للزجاج 41.1°).', 'الموشور أفضل من المرآة: انعكاسه الكلي ≈ 100% والمرآة ≈ 90% ، فالصورة أوضح وأكثر سطوعاً.', 'يتألق الماس لأن زاويته الحرجة 24.4° صغيرة، فيعاني الضوء عدة انعكاسات كلية ثم يخرج من الأعلى إلى عين الناظر.'],
    laws: ['g10_rl_crit'],
    controls: [R('n', 'معامل انكسار الموشور n', 1.3, 2.42, 1.52, .01, ''), R('rot', 'تدوير الموشور', -20, 20, 0, 1, '°'), TG('mir', 'مرآة مستوية بدل الموشور', false, null, 'flip'), TG('part', 'الانعكاسات الجزئية', false, null, 'ray')],
    setup(S) { S.md = 'm90'; S.rt = 0; },
    update(S, dt) { Q46.ease(S, 'rt', S.p.rot, dt, 7); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, cx: L + 210, cy: 300 }; },
    /* scene: list of prisms (polygons) and rays */
    scene(S, g, mir) { const md = S.md, cx = g.cx, cy = g.cy, rot = Q46.rad(S.rt), pr = [], rays = [], extra = {};
      const tri = (P, c) => pr.push({ P: Q46.rotP(P, c || P.reduce((a, p) => [a[0] + p[0] / P.length, a[1] + p[1] / P.length], [0, 0]), rot), hyp: [0, 2] });
      if (md === 'm90') { tri([[cx - 85, cy - 85], [cx - 85, cy + 85], [cx + 85, cy + 85]]); pr[0].hyp = [2, 0]; [-50, -20, 10].forEach((y, i) => rays.push({ p: [g.L + 52, cy + y], d: [1, 0], c: COL[i] })); }
      else if (md === 'm180') { tri([[cx - 40, cy - 120], [cx - 40, cy + 120], [cx + 80, cy]]); pr[0].hyp = [0, 1]; [-90, -62, -34].forEach((y, i) => rays.push({ p: [g.L + 52, cy + y], d: [1, 0], c: COL[i] })); }
      else if (md === 'peri') { const x0 = cx - 40, y0 = 120, y1 = 440, L = 90; extra.tube = [x0 - 6, y0 - 6, L + 12, y1 + L - y0 + 12]; extra.eye = [x0 - 70, y1 + L / 2]; extra.obj = [g.L + 26, y0 + L / 2];
        tri([[x0, y0], [x0 + L, y0 + L], [x0, y0 + L]]); pr[0].hyp = [0, 1]; tri([[x0, y1], [x0 + L, y1], [x0, y1 + L]]); pr[1].hyp = [1, 2]; [24, 45, 66].forEach((y, i) => rays.push({ p: [g.L + 40, y0 + y], d: [1, 0], c: COL[i] })); }
      else if (md === 'bino') { const xa = cx + 40, ya = cy - 70; tri([[xa, ya - 85], [xa, ya + 85], [xa + 85, ya]]); pr[0].hyp = [0, 1]; const xb = xa - 120, yb = ya + 95; tri([[xb, yb - 85], [xb, yb + 85], [xb - 85, yb]]); pr[1].hyp = [0, 1];
        [-62, -40, -18].forEach((y, i) => rays.push({ p: [g.L + 52, ya + y], d: [1, 0], c: COL[i] })); extra.lens = [g.L + 74, ya - 40]; extra.eye = [xa + 170, yb + 55]; }
      else { const R0 = 120, cY = cy + 10, ch = .44 * R0 * Math.tan(Q46.rad(34.5)), pv = R0 * Math.tan(Q46.rad(40.75)); pr.push({ P: Q46.rotP([[cx - .56 * R0, cY - ch], [cx + .56 * R0, cY - ch], [cx + R0, cY], [cx, cY + pv], [cx - R0, cY]], [cx, cY], rot), dia: 1 });
        [-48, -24, 0, 24, 48].forEach((x, i) => rays.push({ p: [cx + x + 6, cy - 190], d: [0, 1], c: ['#ffffff', '#fde68a', '#ffffff', '#fde68a', '#ffffff'][i] })); }
      let E = [], nAt; if (mir && md !== 'dia') { pr.forEach(q => { const a = q.P[q.hyp[0]], b = q.P[q.hyp[1]]; E.push({ k: 's', a, b, mir: 1, R: .9 }); }); nAt = () => 1; }
      else { pr.forEach(q => { E = E.concat(Q46.polyE(q.P)); }); nAt = p => pr.some(q => Q46.inPoly(q.P, p)) ? S.p.n : 1; }
      const out = rays.map(r => Object.assign({}, r, { T: Q46.trace(E, nAt, r.p, r.d, { part: S.p.part, ar: true, depth: 12, minI: .02, far: md === 'dia' ? 240 : 900 }) }));
      return { pr, rays: out, extra, E }; },
    eff(sc) { let s = 0; sc.rays.forEach(r => r.T.segs.forEach(q => { if (q.out && q.path.length) s += q.I; })); return s / sc.rays.length; },
    nTIR(sc) { return sc.rays[0].T.hits.filter(h => h.tir || h.mir).length; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), mir = S.p.mir && S.md !== 'dia', sc = D.scene(S, g, mir); Q46.bg(ctx, w, h);
      if (sc.extra.tube) K.raw(ctx, () => { const t = sc.extra.tube; ctx.fillStyle = 'rgba(71,85,105,.35)'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; rr(ctx, t[0], t[1], t[2], t[3], 8); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#0b1020'; ctx.fillRect(t[0] - 4, t[1] + 8, 8, t[2] - 10); ctx.fillRect(t[0] - 4, t[1] + t[3] - t[2], 8, t[2] - 10); });
      if (S.md === 'peri') { K.raw(ctx, () => { ctx.fillStyle = 'rgba(56,189,248,.25)'; ctx.fillRect(g.L + 10, 280, 420, 330); }); Q46.lab(ctx, 'ماء البحر', g.L + 60, 300, { c: '#7dd3fc' }); Q46.lab(ctx, 'سفينة فوق سطح الماء', g.L + 80, 96, { s: 10 }); }
      if (S.md === 'bino') K.raw(ctx, () => { const l = sc.extra.lens; ctx.fillStyle = 'rgba(186,230,253,.25)'; ctx.strokeStyle = '#bae6fd'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(l[0], l[1], 9, 48, 0, 0, TAU); ctx.fill(); ctx.stroke(); });
      sc.rays.forEach(r => Q46.drawTrace(ctx, r.T, r.c, 2.6, { clip: [0, 0, w, h - 150] }));
      sc.rays.forEach(r => Q46.laser(ctx, r.p[0] - (r.d[0] ? 0 : 0), r.p[1], Math.atan2(r.d[1], r.d[0]), { L: 44, R: 6 }));
      if (mir) sc.E.forEach(e => Q46.mirror(ctx, e.a, e.b, { side: S.md === 'm180' || S.md === 'bino' ? 1 : -1 }));
      else sc.pr.forEach(q => Q46.glass(ctx, Q46.polyPath(q.P), { bb: [q.P[0][0], q.P[0][1], q.P[2][0], q.P[2][1]], tint: q.dia ? [224, 242, 254] : [165, 243, 252], a1: q.dia ? .35 : .26 }));
      if (S.md === 'dia') { const ups = []; sc.rays.forEach(r => r.T.segs.forEach(q => { if (q.out && q.path.length && q.b[1] < q.a[1]) ups.push(q); }));
        K.raw(ctx, () => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ups.forEach(q => { const x = q.a[0], y = q.a[1], r = 8 + 10 * q.I; ctx.strokeStyle = 'rgba(255,255,255,' + (.5 + .5 * q.I) + ')'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x - r, y); ctx.lineTo(x + r, y); ctx.moveTo(x, y - r); ctx.lineTo(x, y + r); ctx.stroke(); }); ctx.restore(); }); }
      if (sc.extra.eye) Q46.eye(ctx, sc.extra.eye[0], sc.extra.eye[1], S.md === 'peri' ? 0 : Math.PI, 1.2);
      // brightness comparison prism vs mirror
      const scP = mir ? D.scene(S, g, false) : sc, scM = mir ? sc : (S.md !== 'dia' ? D.scene(S, g, true) : null), eP = D.eff(scP), k = D.nTIR(scP);
      const tc = Q46.crit(S.p.n, 1), Lc = [];
      if (S.md === 'dia') { let up = 0, dn = 0; sc.rays.forEach(r => r.T.segs.forEach(q => { if (q.out && q.path.length) { if (q.b[1] < q.a[1]) up += q.I; else dn += q.I; } })); const tot = up + dn || 1;
        Lc.push({ t: 'n = ' + S.p.n.toFixed(2) + '   θc = ' + Q46.deg(tc).toFixed(1) + '°', mono: 1, w: 900 }, { t: 'ضوء يعود إلى الأعلى (بريق): ' + (up / tot * 100).toFixed(0) + '%', c: '#b45309', w: 900 }, { t: 'ضوء يهرب من الأسفل: ' + (dn / tot * 100).toFixed(0) + '%', c: '#475569', w: 800 }, { t: S.p.n > 2 ? 'زاوية حرجة صغيرة: انعكاسات كلية متعددة' : 'زاوية حرجة كبيرة: يهرب الضوء', c: '#7c3aed', w: 800 }); }
      else { Lc.push({ t: 'n = ' + S.p.n.toFixed(2) + '   θc = ' + Q46.deg(tc).toFixed(1) + '°', mono: 1, w: 900 }, { t: tc < Q46.rad(45) ? 'زاوية السقوط 45° أكبر من θc: انعكاس كلي' : 'زاوية السقوط 45° أصغر من θc: يهرب الضوء', c: tc < Q46.rad(45) ? '#15803d' : '#be185d', w: 900 });
        if (S.md === 'm180' || S.md === 'bino') Lc.push({ t: 'ترتيب الألوان ينقلب: الصورة مقلوبة', c: '#7c3aed', w: 800 }); }
      const ch = Q46.card(ctx, S, Lc, { title: MODES.find(q => q[0] === S.md)[1], y: 70, wd: 320 });
      if (scM) { const bx = w - 12 - 320, by = 70 + ch + 12; K.raw(ctx, () => { ctx.fillStyle = 'rgba(15,23,42,.85)'; rr(ctx, bx, by, 320, 92, 8); ctx.fill(); ctx.strokeStyle = '#7c3aed'; ctx.stroke(); }); Q46.T(ctx, 'شدة الضوء الخارج', bx + 160, by + 14, { s: 11, w: 900, c: '#e9d5ff' });
        const eM = D.eff(scM); Q46.bar(ctx, bx + 20, by + 32, 200, 18, eP, '#22c55e', '', (eP * 100).toFixed(0) + '%'); Q46.T(ctx, 'الموشور', bx + 300, by + 41, { s: 10.5, w: 800, c: '#e2e8f0', a: 'right' }); Q46.bar(ctx, bx + 20, by + 60, 200, 18, eM, '#94a3b8', '', (eM * 100).toFixed(0) + '%'); Q46.T(ctx, 'المرآة', bx + 300, by + 69, { s: 10.5, w: 800, c: '#e2e8f0', a: 'right' }); }
      const C = D.chips(S, g); Q46.drawChips(ctx, C);
      Q46.banner(ctx, w, 'اختر التطبيق، واسحب الموشور لتدويره');
    },
    chips(S, g) { return Q42.chips(S, 'md', MODES, g.h - 84, S.md, (S2, k) => { S2.md = k; setParam(S2, 'rot', 0); if (k === 'dia') setParam(S2, 'n', 2.42); }, { bw: 130, col: '#7c3aed' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), sc = D.scene(S, g, false), P = sc.pr[0].P, c = P.reduce((a, p) => [a[0] + p[0] / P.length, a[1] + p[1] / P.length], [0, 0]);
      return [{ id: 'prism', x: c[0], y: c[1], r: 34, cx: c[0], cy: c[1] + 0.001, keep: true, tip: 'اسحب لتدوير الموشور', idle: 'دوّر ✋', drag: (S2, d) => { setParam(S2, 'rot', clamp(S2.p.rot + Q46.deg(d.dang), -20, 20)); } }].concat(D.chips(S, g)); },
    readings(S) { const g = D.geo(S), tc = Q46.crit(S.p.n, 1), sc = D.scene(S, g, false); return [rd('معامل الانكسار n', S.p.n.toFixed(2)), rd('الزاوية الحرجة θc', Q46.deg(tc).toFixed(2) + '°'), rd('انعكاسات كلية للشعاع الأول', String(D.nTIR(sc))), rd('شدة الضوء الخارج', (D.eff(sc) * 100).toFixed(0) + '%')]; },
    explain(S) { return Q26.ex('في الموشور العاكس يرتد الضوء عن الوجه المائل كله دون أن يفقد شيئاً، فيدور 90° أو 180°.', 'زاوية السقوط على الوجه المائل 45° وهي أكبر من الزاوية الحرجة للزجاج (41.1°) فيحدث انعكاس كلي داخلي ≈ 100%، أما المرآة فتمتص جزءاً من الضوء وتعكس نحو 90% فقط.', 'الناظور ذو الموشورين والبيريسكوب في الغواصات، وبريق الماس الذي زاويته الحرجة 24.4°.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E3 — السراب: انحناء الضوء والانعكاس الكلي في طبقات الهواء الساخن فوق الطريق (ص 108) =============== */
(() => {
  const TA = 303, HL = .25, CARH = 1.5, VS = 72;
  const D = { id: 'g10_r_mirage', page: 108, fig: 'ظاهرة السراب (ص 108)',
    desc: 'السراب من الظواهر الطبيعية التي تفسَّر بالانعكاس الكلي الداخلي: الهواء الملاصق للطريق الحار أسخن وأقل كثافة ضوئية (معامل انكساره أصغر) من الهواء فوقه. الشعاع النازل من جسم بعيد ينتقل من طبقات أكثف إلى أقل كثافة فيبتعد عن العمود تدريجياً حتى تصل زاوية سقوطه إلى الزاوية الحرجة فينعكس كلياً صاعداً إلى العين، فترى العين صورة مقلوبة للجسم وبقعة من السماء على الطريق تشبه الماء. المسار محسوب عددياً بقانون سنيل في طبقات الهواء المتدرجة.',
    tags: 'السراب الانعكاس الكلي الداخلي طبقات الهواء الساخن طريق حار صورة مقلوبة بقعة ماء وهمية معامل انكسار الهواء يتغير مع درجة الحرارة',
    tools: ['طريق إسفلتي حار', 'سيارة بعيدة', 'عين الراصد'],
    steps: ['لاحظ «ما تراه العين» في الأعلى: صورة مقلوبة للسيارة وبقعة زرقاء على الطريق.', 'اجعل فرق الحرارة صفراً: يختفي السراب لأن معامل الانكسار يصبح متساوياً.', 'اسحب السيارة لتغيير بعدها، واسحب العين لتغيير ارتفاعها: السراب يظهر للأجسام البعيدة فقط.', 'تتبّع الشعاع الأحمر: ينحني تدريجياً ثم يرتد صاعداً، والعين تمده على استقامته فترى الصورة تحت الطريق.'],
    concl: ['الهواء الساخن قرب الطريق أقل كثافة ضوئية: n يزداد مع الارتفاع.', 'الشعاع النازل ينكسر مبتعداً عن العمود في كل طبقة حتى ينعكس انعكاساً كلياً ويصعد.', 'تمد العين الشعاع على استقامته فترى صورة مقلوبة تحت سطح الطريق، وترى صورة السماء كأنها ماء.', 'كلما زاد فرق الحرارة اقترب السراب وصار أوضح.'],
    laws: ['g10_rl_crit', 'g10_rl_snell'],
    controls: [R('dT', 'فرق حرارة الطريق عن الهواء', 0, 40, 30, 1, '°C'), R('eh', 'ارتفاع العين', .6, 2, 1.2, .1, 'm'), R('D', 'بعد السيارة', 200, 600, 400, 10, 'm'), TG('rays', 'الأشعة', true, null, 'ray')],
    setup(S) { S._mc = null; S.clk6 = 0; },
    update(S, dt) { S.clk6 += dt; },
    nH(S, h) { return 1 + .0844 / (TA + S.p.dT * Math.exp(-h / HL)); },
    dn(S, h) { const e = Math.exp(-h / HL), T = TA + S.p.dT * e; return .0844 * S.p.dT * e / HL / (T * T); },
    /* trace from the eye with elevation a (rad): returns {hD, xg, up, pts} */
    ray(S, a, keep) { let x = 0, h = S.p.eh, al = a; const D2 = S.p.D, pts = keep ? [[0, h]] : null, ds = .5; let hD = null;
      for (let i = 0; i < 6000; i++) { const n = D.nH(S, h); al += Math.cos(al) / n * D.dn(S, h) * ds; const x2 = x + Math.cos(al) * ds, h2 = h + Math.sin(al) * ds;
        if (hD == null && x2 >= D2) { hD = h + (h2 - h) * (D2 - x) / (x2 - x); if (keep) { pts.push([D2, hD]); if (hD < CARH && hD > 0) return { hD, pts }; } }
        x = x2; h = h2; if (keep && i % 6 === 0) pts.push([x, h]);
        if (h <= 0) return { hD, xg: x, pts }; if (x > D2 * 2.5 || h > 30) return { hD, up: al > 0, pts }; }
      return { hD, up: al > 0, pts }; },
    cache(S) { const key = S.p.dT + '|' + S.p.eh + '|' + S.p.D; if (S._mc && S._mc.key === key) return S._mc;
      const rows = [], N = 150, a0 = Q46.rad(.38), a1 = Q46.rad(-.62); for (let i = 0; i < N; i++) { const a = a0 + (a1 - a0) * i / (N - 1); rows.push(Object.assign({ a }, D.ray(S, a, false))); }
      // special rays: direct to car top, mirage to car, mirage to sky (pool)
      const find = (tgt, lo, hi, turned) => { let best = null, bd = 1e9; for (let k = 0; k <= 400; k++) { const a = lo + (hi - lo) * k / 400, r = D.ray(S, a, true); if (r.hD == null) continue; const mn = Math.min(...r.pts.map(p => p[1])); const tr = mn < S.p.eh * .5 && r.pts[r.pts.length - 1][1] > mn + .01; if (!!turned !== tr) continue; const e = Math.abs(r.hD - tgt); if (e < bd) { bd = e; best = r; best.a = a; } } return bd < .25 ? best : null; };
      const aD = Math.atan2(CARH * .8 - S.p.eh, S.p.D), direct = D.ray(S, aD, true); direct.a = aD;
      const mir = S.p.dT > 0 ? find(.9, Q46.rad(-.7), Q46.rad(-.05), true) : null, sky = S.p.dT > 0 ? find(2.0, Q46.rad(-.7), Q46.rad(-.05), true) : null;
      S._mc = { key, rows, N, a0, a1, direct, mir, sky }; return S._mc; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 30, x1 = w - 30; return { w, h, L, x0, x1, gy: 585, ix: L + 16, iy: 70, iw: Math.min(w - 350, 480) - L - 16, ih: 190 }; },
    X(S, g, x) { return g.x0 + 40 + x / (S.p.D * 1.08) * (g.x1 - g.x0 - 60); },
    car(ctx, x, y, s, flip) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, flip ? -s : s); ctx.fillStyle = '#dc2626'; rr(ctx, -30, -22, 60, 16, 4); ctx.fill(); ctx.fillStyle = '#b91c1c'; rr(ctx, -16, -36, 32, 15, 6); ctx.fill(); ctx.fillStyle = '#bfdbfe'; ctx.fillRect(-12, -33, 11, 9); ctx.fillRect(1, -33, 11, 9); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(-17, -5, 6, 0, TAU); ctx.arc(17, -5, 6, 0, TAU); ctx.fill(); ctx.restore(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), mc = D.cache(S), Y = hh => g.gy - hh * VS, X = x => D.X(S, g, x); Q46.bg(ctx, w, h);
      // side view: sky, road, hot layer
      const top = Y(3.9); K.raw(ctx, () => { const sg = ctx.createLinearGradient(0, top, 0, g.gy); sg.addColorStop(0, '#1e3a8a'); sg.addColorStop(1, '#7dd3fc'); ctx.fillStyle = sg; rr(ctx, g.x0, top, g.x1 - g.x0, g.gy - top + 36, 10); ctx.fill();
        ctx.fillStyle = '#3f3f46'; ctx.fillRect(g.x0, g.gy, g.x1 - g.x0, 30); ctx.fillStyle = '#fafafa'; for (let x = g.x0 + 20; x < g.x1 - 30; x += 60) ctx.fillRect(x, g.gy + 13, 30, 3);
        const hg = ctx.createLinearGradient(0, Y(.9), 0, g.gy); hg.addColorStop(0, 'rgba(251,146,60,0)'); hg.addColorStop(1, 'rgba(251,146,60,' + (.45 * S.p.dT / 40) + ')'); ctx.fillStyle = hg; ctx.fillRect(g.x0, Y(.9), g.x1 - g.x0, Y(0) - Y(.9)); });
      for (let m = 0; m <= 3; m++) { Q41.line(ctx, [[g.x0, Y(m)], [g.x0 + 10, Y(m)]], '#e2e8f0', 1.2); Q46.T(ctx, m + ' m', g.x0 + 26, Y(m), { s: 9.5, w: 800, c: '#e2e8f0' }); }
      Q46.T(ctx, 'المقياس الرأسي مكبّر كثيراً', g.x1 - 90, top + 14, { s: 10, w: 800, c: '#e0f2fe' });
      const ex = X(0), ey = Y(S.p.eh); K.raw(ctx, () => { ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ex - 8, g.gy); ctx.lineTo(ex - 8, ey + 6); ctx.stroke(); }); Q46.eye(ctx, ex, ey, 0, .9);
      D.car(ctx, X(S.p.D) + 20, g.gy, 1.05, false);
      K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(g.x0, top, g.x1 - g.x0, g.gy - top + 36); ctx.clip(); });
      if (S.p.rays) { const pl = (r, col, lab) => { if (!r) return; const P = r.pts.filter(p => p[0] <= S.p.D + 1).map(p => [X(p[0]), Y(p[1])]); K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.shadowColor = col; ctx.shadowBlur = 8; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); });
          if (lab) { const a = r.a, L = S.p.D; Q41.line(ctx, [[ex, ey], [X(L), Y(S.p.eh + Math.tan(a) * L)]], 'rgba(255,255,255,.75)', 1.4, [6, 5]); } };
        pl(mc.direct, '#fde047'); pl(mc.mir, '#ef4444', 1); pl(mc.sky, '#38bdf8', 1);
        if (mc.mir) { const yI = Y(S.p.eh + Math.tan(mc.mir.a) * S.p.D); D.car(ctx, X(S.p.D) + 20, Y(0) + (Y(0) - Y(.0)) + 2, .7, true); K.raw(ctx, () => { }); } }
      K.raw(ctx, () => ctx.restore()); if (S.p.rays && mc.mir) Q46.tag(ctx, 'صورة وهمية مقلوبة تحت الطريق', X(S.p.D) - 150, g.gy + 50, '#b91c1c', { s: 10 });
      // what the eye sees
      const ix = g.ix, iy = g.iy, iw = g.iw, ih = g.ih, pxd = ih / Q46.deg(mc.a0 - mc.a1), cxI = ix + iw / 2;
      K.raw(ctx, () => { ctx.save(); rr(ctx, ix, iy, iw, ih, 10); ctx.clip(); const rh = ih / mc.N + .6;
        mc.rows.forEach((r, i) => { const y = iy + i * ih / mc.N; let col; if (r.xg != null && (r.hD == null || r.hD > CARH)) { const f = clamp(r.xg / (S.p.D * 1.6), 0, 1); col = 'rgb(' + Math.round(70 + 60 * f) + ',' + Math.round(70 + 60 * f) + ',' + Math.round(76 + 64 * f) + ')'; } else { const e = clamp((Q46.deg(r.a) + .7) / 1.1, 0, 1); col = 'rgb(' + Math.round(186 - 120 * e) + ',' + Math.round(230 - 90 * e) + ',' + Math.round(253 - 40 * e) + ')'; }
          if (r.a < 0 && !(r.xg != null && (r.hD == null || r.hD > CARH))) { const rp = .5 + .5 * Math.sin(i * 1.7 + S.clk6 * 4); col = 'rgb(' + Math.round(96 + 30 * rp) + ',' + Math.round(165 + 25 * rp) + ',' + Math.round(250) + ')'; }
          ctx.fillStyle = col; ctx.fillRect(ix, y, iw, rh);
          if (r.hD != null && r.hD > 0 && r.hD < CARH) { const half = r.hD < 1 ? 2.25 : 1.2, wpx = Q46.deg(Math.atan(half / S.p.D)) * pxd; ctx.fillStyle = r.hD < .35 ? '#111827' : r.hD < .55 ? '#dc2626' : r.hD < .65 ? '#7f1d1d' : r.hD < 1 ? '#ef4444' : r.hD < 1.4 ? '#93c5fd' : '#b91c1c'; ctx.fillRect(cxI - wpx, y, 2 * wpx, rh); if (r.hD < .35) { ctx.fillStyle = col; ctx.fillRect(cxI - wpx * .45, y, wpx * .9, rh); } } });
        const yh = iy + Q46.deg(mc.a0) * pxd; ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(ix, yh); ctx.lineTo(ix + iw, yh); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2; rr(ctx, ix, iy, iw, ih, 10); ctx.stroke(); });
      Q46.tag(ctx, 'ما تراه العين', ix + 60, iy + 14, '#6d28d9', { s: 10.5 }); if (mc.mir) Q46.tag(ctx, 'بقعة تشبه الماء', ix + 70, iy + Q46.deg(mc.a0) * pxd + 24, '#1d4ed8', { s: 10 }); Q46.T(ctx, 'الأفق', ix + iw - 22, iy + Q46.deg(mc.a0) * pxd - 9, { s: 9.5, w: 800, c: '#334155' });
      const n0 = D.nH(S, 0), n2 = D.nH(S, 2);
      Q46.card(ctx, S, [{ t: 'معامل الانكسار عند الطريق = ' + n0.toFixed(6), c: '#c2410c', w: 800 }, { t: 'معامل الانكسار على ارتفاع 2 m = ' + n2.toFixed(6), c: '#0369a1', w: 800 }, { t: S.p.dT > 0 ? 'الهواء الساخن أقل كثافة ضوئية فينحني الشعاع وينعكس كلياً' : 'لا فرق في الحرارة: لا سراب', c: '#7c3aed', w: 800 }, { t: mc.mir ? 'العين ترى صورة مقلوبة وبقعة سماء كالماء' : 'لا تصل أشعة منعكسة إلى العين', c: '#334155' }], { title: 'السراب', y: 70, wd: 320 });
      Q46.banner(ctx, w, 'غيّر حرارة الطريق، واسحب السيارة والعين');
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S);
      return [{ id: 'car', x: D.X(S, g, S.p.D) + 20, y: g.gy - 22, r: 30, axis: 'x', keep: true, tip: 'اسحب السيارة لتغيير بعدها', idle: 'اسحب ✋', drag: (S2, d) => { const x = d.ox + d.x - d.sx - 20, Dn = (x - g.x0 - 40) / (g.x1 - g.x0 - 60) * S.p.D * 1.08; setParam(S2, 'D', Math.round(clamp(Dn, 200, 600) / 10) * 10); } },
        { id: 'eye', x: D.X(S, g, 0), y: g.gy - S.p.eh * VS, r: 22, axis: 'y', keep: true, hint: false, tip: 'اسحب العين لتغيير ارتفاعها', drag: (S2, d) => { setParam(S2, 'eh', Math.round(clamp((g.gy - (d.oy + d.y - d.sy)) / VS, .6, 2) * 10) / 10); } }]; },
    readings(S) { const mc = D.cache(S); return [rd('فرق الحرارة', S.p.dT + ' °C'), rd('n عند الطريق', D.nH(S, 0).toFixed(6)), rd('n على ارتفاع 2 m', D.nH(S, 2).toFixed(6)), rd('السراب', mc.mir ? 'يظهر' : 'لا يظهر')]; },
    explain(S) { return Q26.ex('على الطريق الحار ترى العين بقعة لامعة تشبه الماء وصورة مقلوبة للسيارة البعيدة.', 'الهواء قرب الطريق أسخن فمعامل انكساره أصغر. الشعاع النازل يمر من طبقات أكثف إلى أقل كثافة فيبتعد عن العمود حتى تتجاوز زاوية سقوطه الزاوية الحرجة فينعكس كلياً صاعداً، والعين تمد الشعاع على استقامته فترى الصورة تحت الطريق.', 'السراب في الصحراء يوهم المسافر بوجود بحيرة ماء أمامه.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F1 — بصريات الألياف وتطبيقاتها (6-6 و 6-7، الأشكال 19-6 إلى 24-6) =============== */
(() => {
  const N1 = 1.5, RC = 13, RL = 22, APPS = [['light', 'نقل الضوء'], ['endo', 'ناظور الجوف'], ['arth', 'الأرثروسكوب'], ['comm', 'الاتصالات'], ['ind', 'الصناعة']];
  const INFO = { light: ['ينتقل الضوء بالانعكاس الكلي الداخلي', 'ويخرج من طرفه الآخر ولو كان منحنياً', 'يقطع كيلومترات دون فقدان يُذكر'],
    endo: ['ناظور الجوف: تنظير المعدة والكليتين', 'ألياف تنقل الضوء وأخرى تنقل الصورة', 'ويستعمل لأخذ عينة أو كيّ أو جراحة'],
    arth: ['الأرثروسكوب: تشخيص أمراض المفاصل', 'وعلاجها، ويستعمل في جراحة الركبة'],
    comm: ['زوج أسلاك نحاسية: 32 مكالمة على الأكثر', 'ليف بصري واحد: أكثر من مليون مكالمة', 'المعلومات محمّلة على أشعة الليزر'],
    ind: ['فحص الأجزاء الداخلية للمكائن', 'والأجهزة الإلكترونية والمفاعلات النووية'] };
  const D = { id: 'g10_r_fiber', page: 109, fig: 'الأشكال 19-6 إلى 24-6',
    desc: 'الألياف البصرية ألياف زجاجية أو بلاستيكية دقيقة تنقل الضوء من مكان إلى آخر بالانعكاس الكلي الداخلي. إذا سقط الضوء على أحد طرفي الليف بحيث تكون زاوية سقوطه على غلافه الداخلي أكبر من الزاوية الحرجة انعكس كلياً وبقي داخل الليف وخرج من طرفه الآخر حتى لو كان منحنياً. غلاف الليف معامل انكساره أقل قليلاً من قلبه، وهذا يمنع هروب الضوء. تستعمل في الطب (ناظور الجوف والأرثروسكوب)، وفي فحص المكائن والمفاعلات، وفي الاتصالات.',
    tags: 'الألياف البصرية الألياف الضوئية قلب الليف الغلاف الانعكاس الكلي الداخلي ليف منحن ناظور الجوف أندوسكوب أرثروسكوب الاتصالات الليزر مليون مكالمة 32 مكالمة',
    tools: ['ليف بصري (قلب + غلاف)', 'مصدر ليزري', 'نماذج للتطبيقات'],
    steps: ['اسحب الليزر لتغيير زاوية دخوله إلى الليف: تتبع الانعكاسات الكلية داخل القلب.', 'اسحب مقبض الانحناء لتقليل نصف قطر الانحناء: في الانحناء الحاد جداً تقل زاوية السقوط فيتسرب الضوء.', 'ارفع معامل انكسار الغلاف حتى يقترب من القلب (1.50): تكبر الزاوية الحرجة ويهرب الضوء.', 'اختر تطبيقاً من الأزرار لترى استعمالات الألياف البصرية.'],
    concl: ['ينتقل الضوء في الليف البصري بانعكاسات كلية داخلية متتالية على السطح الفاصل بين القلب والغلاف.', 'يشترط أن تكون زاوية السقوط على الغلاف أكبر من الزاوية الحرجة: sin θc = n₂ / n₁.', 'معامل انكسار الغلاف أقل قليلاً من القلب فيمنع هروب الضوء، والضوء يخرج من الطرف الآخر حتى لو كان الليف منحنياً.', 'تطبيقات: ناظور الجوف والأرثروسكوب في الطب، فحص المكائن والمفاعلات، الاتصالات (أكثر من مليون مكالمة في ليف واحد مقابل 32 في زوج أسلاك نحاسية).'],
    laws: ['g10_rl_crit'],
    controls: [R('ang', 'زاوية دخول الليزر', -40, 40, 14, 1, '°'), R('rb', 'نصف قطر انحناء الليف', 4, 20, 14, .5, 'mm'), R('n2', 'معامل انكسار الغلاف n₂', 1.3, 1.5, 1.46, .01, ''), TG('clad', 'الغلاف', true, null, 'layers')],
    setup(S) { S.sh = 'bend'; S.app = 'light'; S.rbe = 140; S.ae = 14; S.clk = 0; },
    update(S, dt) { Q46.ease(S, 'rbe', S.p.rb * 10, dt, 8); Q46.ease(S, 'ae', S.p.ang, dt, 9); S.clk += dt; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 124, bend = S.sh === 'bend', x1 = bend ? 330 : Math.min(w - 350, 500), yc = 230, Rb = S.rbe, yend = 590; return { w, h, L, x0, x1, bend, yc, Rb, yend, C: [x1, yc + Rb] }; },
    build(S, g) { const n2 = S.p.clad ? S.p.n2 : 1, E = [{ k: 's', a: [g.x0, g.yc - RL], b: [g.x0, g.yc + RL] }];
      [RC, RL].forEach(r => { E.push({ k: 's', a: [g.x0, g.yc - r], b: [g.x1, g.yc - r] }, { k: 's', a: [g.x0, g.yc + r], b: [g.x1, g.yc + r] }); if (g.bend) { E.push({ k: 'c', c: g.C, r: g.Rb + r, a0: -Math.PI / 2, a1: 0 }, { k: 'c', c: g.C, r: g.Rb - r, a0: -Math.PI / 2, a1: 0 }); const xv = g.x1 + g.Rb; E.push({ k: 's', a: [xv - r, g.yc + g.Rb], b: [xv - r, g.yend] }, { k: 's', a: [xv + r, g.yc + g.Rb], b: [xv + r, g.yend] }); } });
      if (g.bend) E.push({ k: 's', a: [g.x1 + g.Rb - RL, g.yend], b: [g.x1 + g.Rb + RL, g.yend] }); else E.push({ k: 's', a: [g.x1, g.yc - RL], b: [g.x1, g.yc + RL] });
      const dist = p => { if (p[0] < g.x0 - 1e-9) return 1e9; if (!g.bend) return p[0] > g.x1 ? 1e9 : Math.abs(p[1] - g.yc); if (p[0] <= g.x1) return Math.abs(p[1] - g.yc); if (p[1] <= g.yc + g.Rb) return Math.abs(Math.hypot(p[0] - g.C[0], p[1] - g.C[1]) - g.Rb); if (p[1] <= g.yend) return Math.abs(p[0] - (g.x1 + g.Rb)); return 1e9; };
      return { E, nAt: p => { const d = dist(p); return d < RC ? N1 : d < RL ? n2 : 1; }, n2 }; },
    run(S, g) { const b = D.build(S, g), a = Q46.rad(S.ae), tgt = [g.x0, g.yc + 3], P = [tgt[0] - 96 * Math.cos(a), tgt[1] - 96 * Math.sin(a)], d = [Math.cos(a), Math.sin(a)];
      const T = Q46.trace(b.E, b.nAt, P, d, { depth: 140, minI: .02, far: 500 }); let out = 0, leak = 0, tir = 0; const exitP = g.bend ? (q => q.a[1] >= g.yend - .5) : (q => q.a[0] >= g.x1 - .5);
      T.segs.forEach(q => { if (q.out && q.path.length > 1) { if (exitP(q)) out += q.I; else leak += q.I; } }); T.hits.forEach(hh => { if (hh.tir) tir++; });
      // main chain for the travelling pulse
      const by = {}; T.segs.forEach(q => { by[q.path] = q; }); const chain = []; let pth = ''; while (by[pth] && chain.length < 160) { chain.push(by[pth]); const t1 = by[pth + 't'], r1 = by[pth + 'r']; pth = !t1 ? pth + 'r' : !r1 ? pth + 't' : (t1.I >= r1.I ? pth + 't' : pth + 'r'); }
      return { T, P, d, out, leak, tir, chain, n2: b.n2 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = D.run(S, g); Q46.bg(ctx, w, h);
      // fibre body: cladding then core
      const body = (r, fill, st) => K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.moveTo(g.x0, g.yc - r); ctx.lineTo(g.x1, g.yc - r); if (g.bend) { ctx.arc(g.C[0], g.C[1], g.Rb + r, -Math.PI / 2, 0); ctx.lineTo(g.x1 + g.Rb + r, g.yend); ctx.lineTo(g.x1 + g.Rb - r, g.yend); ctx.arc(g.C[0], g.C[1], g.Rb - r, 0, -Math.PI / 2, true); } else { ctx.lineTo(g.x1, g.yc + r); } ctx.lineTo(g.x0, g.yc + r); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = st; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); });
      if (S.p.clad) body(RL, 'rgba(148,163,184,.28)', 'rgba(203,213,225,.7)'); body(RC, 'rgba(165,243,252,.22)', 'rgba(207,250,254,.8)');
      Q46.drawTrace(ctx, c.T, '#ff3030', 2.2, { arrow: false, clip: [0, 0, w, h - 150] });
      // travelling pulse along the main path
      const Ls = c.chain.map(q => Math.hypot(q.b[0] - q.a[0], q.b[1] - q.a[1])), tot = Ls.reduce((a, b) => a + Math.min(b, 400), 0); if (tot > 0) { let s = (S.clk * 260) % tot; for (let i = 0; i < c.chain.length; i++) { const L = Math.min(Ls[i], 400); if (s <= L) { const q = c.chain[i], f = s / Ls[i], x = q.a[0] + (q.b[0] - q.a[0]) * f, y = q.a[1] + (q.b[1] - q.a[1]) * f; K.raw(ctx, () => { const gg = ctx.createRadialGradient(x, y, 0, x, y, 12); gg.addColorStop(0, 'rgba(255,255,255,1)'); gg.addColorStop(1, 'rgba(255,60,60,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(x, y, 12, 0, TAU); ctx.fill(); }); break; } s -= L; } }
      Q46.laser(ctx, c.P[0], c.P[1], Math.atan2(c.d[1], c.d[0]));
      // exit glow
      const ex = g.bend ? [g.x1 + g.Rb, g.yend] : [g.x1, g.yc]; K.raw(ctx, () => { const gg = ctx.createRadialGradient(ex[0], ex[1], 2, ex[0], ex[1], 40); gg.addColorStop(0, 'rgba(255,90,90,' + clamp(c.out, 0, 1) * .9 + ')'); gg.addColorStop(1, 'rgba(255,90,90,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(ex[0], ex[1], 40, 0, TAU); ctx.fill(); });
      Q46.tag(ctx, 'قلب الليف n₁ = 1.50', g.x0 + 90, g.yc - 40, '#0e7490', { s: 10 }); if (S.p.clad) Q46.tag(ctx, 'الغلاف n₂ = ' + S.p.n2.toFixed(2), g.x0 + 100, g.yc + 42, '#475569', { s: 10 });
      if (g.bend) Q41.knob(ctx, g.C[0] + (g.Rb - RL - 14) * Math.cos(-Math.PI / 4), g.C[1] + (g.Rb - RL - 14) * Math.sin(-Math.PI / 4), '#a78bfa', 10);
      const tc = Q46.crit(N1, c.n2), NA = Math.sqrt(Math.max(0, N1 * N1 - c.n2 * c.n2)), amax = NA >= 1 ? 90 : Q46.deg(Math.asin(NA));
      const L1 = [{ t: 'الزاوية الحرجة θc = ' + Q46.deg(tc).toFixed(1) + '°', c: '#b45309', w: 900 }, { t: 'انعكاسات كلية داخلية: ' + c.tir, c: '#7c3aed', w: 800 }, { t: 'الضوء الخارج من الطرف الآخر: ' + (c.out * 100).toFixed(0) + '%', c: '#15803d', w: 900 }, { t: 'الضوء المتسرب: ' + (c.leak * 100).toFixed(0) + '%', c: c.leak > .05 ? '#be185d' : '#64748b', w: 800 }, { t: 'أكبر زاوية دخول تُحبس: ' + amax.toFixed(1) + '°', c: '#334155' }];
      Q46.card(ctx, S, L1, { title: 'الليف البصري', y: 70, wd: 300 });
      D.app(ctx, S, w - 12 - 236, 300, 236, 300);
      const C = D.chips(S, g); Q46.drawChips(ctx, C.s); Q46.drawChips(ctx, C.a);
      Q46.banner(ctx, w, 'اسحب الليزر ومقبض الانحناء، واختر تطبيقاً');
    },
    app(ctx, S, x, y, wd, ht) { K.raw(ctx, () => { ctx.fillStyle = 'rgba(15,23,42,.85)'; rr(ctx, x, y, wd, ht, 10); ctx.fill(); ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 1.5; ctx.stroke(); });
      const cx = x + wd / 2, cy = y + 110, a = S.app; Q46.T(ctx, APPS.find(q => q[0] === a)[1], cx, y + 16, { s: 12, w: 900, c: '#e9d5ff' });
      if (a === 'light') { K.raw(ctx, () => { ctx.strokeStyle = 'rgba(165,243,252,.6)'; ctx.lineWidth = 2; for (let k = -4; k <= 4; k++) { ctx.beginPath(); ctx.moveTo(cx - 90, cy + k * 3); ctx.bezierCurveTo(cx - 20, cy + k * 3 - 70, cx + 20, cy + k * 3 + 70, cx + 90, cy + k * 3); ctx.stroke(); } const gg = ctx.createRadialGradient(cx + 92, cy, 0, cx + 92, cy, 26); gg.addColorStop(0, 'rgba(255,255,255,.95)'); gg.addColorStop(1, 'rgba(56,189,248,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(cx + 92, cy, 26, 0, TAU); ctx.fill(); }); }
      else if (a === 'endo') K.raw(ctx, () => { ctx.fillStyle = 'rgba(244,114,182,.45)'; ctx.strokeStyle = '#f9a8d4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(cx + 10, cy + 20, 70, 45, -.4, 0, TAU); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(cx - 90, cy - 80); ctx.quadraticCurveTo(cx - 60, cy - 10, cx - 10, cy + 10); ctx.stroke(); const gg = ctx.createRadialGradient(cx - 6, cy + 12, 0, cx - 6, cy + 12, 30); gg.addColorStop(0, 'rgba(255,255,255,.95)'); gg.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(cx - 6, cy + 12, 30, 0, TAU); ctx.fill(); });
      else if (a === 'arth') K.raw(ctx, () => { ctx.fillStyle = '#fde68a'; ctx.strokeStyle = '#a16207'; ctx.lineWidth = 2; rr(ctx, cx - 18, cy - 90, 36, 80, 14); ctx.fill(); ctx.stroke(); rr(ctx, cx - 16, cy + 5, 32, 80, 14); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(56,189,248,.35)'; ctx.beginPath(); ctx.ellipse(cx, cy - 2, 34, 18, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(cx + 90, cy - 40); ctx.lineTo(cx + 10, cy - 2); ctx.stroke(); });
      else if (a === 'comm') { const bx = x + 24, bw = wd - 48; Q46.T(ctx, 'عدد المكالمات في الوقت نفسه', cx, y + 44, { s: 10.5, w: 800, c: '#e2e8f0' }); const lg = v => Math.log10(v) / 6.2; Q46.bar(ctx, bx, y + 70, bw, 22, lg(32), '#f59e0b', '', '32'); Q46.T(ctx, 'زوج أسلاك نحاسية', cx, y + 104, { s: 10, w: 800, c: '#fde68a' }); Q46.bar(ctx, bx, y + 124, bw, 22, lg(1.2e6), '#22c55e', '', '1 000 000+'); Q46.T(ctx, 'ليف بصري واحد', cx, y + 158, { s: 10, w: 800, c: '#bbf7d0' }); Q46.T(ctx, 'المقياس لوغارتمي', cx, y + 178, { s: 9.5, w: 700, c: '#94a3b8' }); }
      else K.raw(ctx, () => { ctx.fillStyle = '#64748b'; rr(ctx, cx - 70, cy - 40, 140, 90, 10); ctx.fill(); ctx.fillStyle = '#334155'; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(cx - 45 + k * 30, cy - 10, 10, 0, TAU); ctx.fill(); } ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(cx - 100, cy - 80); ctx.quadraticCurveTo(cx - 60, cy - 60, cx - 40, cy - 10); ctx.stroke(); const gg = ctx.createRadialGradient(cx - 40, cy - 10, 0, cx - 40, cy - 10, 20); gg.addColorStop(0, 'rgba(255,255,255,.9)'); gg.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(cx - 40, cy - 10, 20, 0, TAU); ctx.fill(); });
      INFO[a].forEach((t, i) => Q46.T(ctx, t, x + wd - 10, y + 208 + i * 28, { s: 10, w: 700, c: '#e2e8f0', a: 'right' })); },
    chips(S, g) { return { s: Q42.chips(S, 'sh', [['straight', 'ليف مستقيم'], ['bend', 'ليف منحنٍ']], g.h - 128, S.sh, (S2, k) => { S2.sh = k; }, { bw: 150, col: '#0e7490' }), a: Q42.chips(S, 'ap', APPS, g.h - 84, S.app, (S2, k) => { S2.app = k; }, { bw: 130, col: '#7c3aed' }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), c = D.run(S, g), C = D.chips(S, g), L = [{ id: 'src', x: c.P[0], y: c.P[1], r: 26, cx: g.x0, cy: g.yc + 3, keep: true, tip: 'اسحب الليزر لتغيير زاوية الدخول', idle: 'اسحب ✋', drag: (S2, d) => { let a = d.ang + Math.PI; while (a > Math.PI) a -= TAU; setParam(S2, 'ang', Math.round(clamp(Q46.deg(a), -40, 40))); } }];
      if (g.bend) { const r = g.Rb - RL - 14; L.push({ id: 'bend', x: g.C[0] + r * Math.cos(-Math.PI / 4), y: g.C[1] + r * Math.sin(-Math.PI / 4), r: 18, axis: 'xy', keep: true, hint: false, tip: 'اسحب لتغيير نصف قطر الانحناء', drag: (S2, d) => { const px = d.ox + d.x - d.sx; setParam(S2, 'rb', Math.round(clamp(((px - g.x1) / Math.SQRT1_2 + RL + 14) / 10, 4, 20) * 2) / 2); } }); }
      return L.concat(C.s, C.a); },
    readings(S) { const c = D.run(S, D.geo(S)); return [rd('زاوية الدخول', S.p.ang + '°'), rd('الزاوية الحرجة', Q46.deg(Q46.crit(N1, c.n2)).toFixed(1) + '°'), rd('انعكاسات كلية', String(c.tir)), rd('الضوء الخارج', (c.out * 100).toFixed(0) + '%'), rd('المتسرب', (c.leak * 100).toFixed(0) + '%')]; },
    explain(S) { return Q26.ex('الشعاع يرتد بين جداري القلب مرات كثيرة ويخرج من الطرف الآخر، ويتسرب فقط إذا كان الانحناء حاداً جداً أو كان معامل انكسار الغلاف قريباً من القلب.', 'زاوية سقوط الضوء على السطح الفاصل بين القلب (n₁ = 1.50) والغلاف أكبر من الزاوية الحرجة sin θc = n₂ / n₁ فينعكس كلياً في كل مرة دون أن يفقد طاقته.', 'الإنترنت السريع يصل إلى البيوت عبر الألياف البصرية، والطبيب يرى داخل المعدة بناظور الجوف.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== G1 — أسئلة الفصل السادس ومسائله على الجهاز (ص 111–113) =============== */
(() => {
  const PB = {
    p1: { t: 'مسألة 1', q: ['معامل الانكسار المطلق للماس 2.42 وسرعة الضوء في الفراغ 3×10⁸ m/s. جد سرعة الضوء في الماس.'], lines: ['n = c / v ⟸ v = c / n', 'v = 3×10⁸ / 2.42', 'سرعة الضوء في الماس v = 1.24×10⁸ m/s'], sc: ['race', 2.42, 'الماس'] },
    p2: { t: 'مسألة 2', q: ['سرعة الضوء في أحد المواد الشفافة c / 1.52 حيث c سرعة الضوء في الفراغ. ما معامل انكساره المطلق؟'], lines: ['n = c / v', 'n = c / (c / 1.52)', 'معامل الانكسار المطلق n = 1.52'], sc: ['race', 1.52, 'المادة'] },
    p3: { t: 'مسألة 3', q: ['معامل الانكسار المطلق للماء 4/3 ولأحد أنواع الزجاج 3/2. جد الزاوية الحرجة بين هذين الوسطين.', 'sin 62.75° = 0.889'], lines: ['تحدث في الزجاج لأن معامل انكساره أكبر', 'sin θc = n₂ / n₁', 'sin θc = (4/3) / (3/2) = 8 / 9', 'sin θc = 0.889', 'θc = 62.75°'], sc: ['bnd', 4 / 3, 1.5, Q46.deg(Math.asin(8 / 9)) - .001, 1, 'ماء 4/3', 'زجاج 3/2'] },
    p4: { t: 'مسألة 4', q: ['سقط ضوء من الهواء على سطح الماء بزاوية سقوط 30° فانعكس جزء منه وانكسر جزء آخر. معامل انكسار الماء 4/3. جد زاوية الانعكاس وزاوية الانكسار.'], lines: ['زاوية الانعكاس تساوي زاوية السقوط', 'θ′₁ = 30°', 'n₁ sin θ₁ = n₂ sin θ₂', '1 × 0.5 = (4/3) sin θ₂', 'sin θ₂ = 0.375', 'θ₂ = 22.02°'], sc: ['bnd', 1, 4 / 3, 30, 0, 'هواء', 'ماء 4/3'] },
    p5: { t: 'مسألة 5', q: ['سرعة الضوء في الجليد c / 1.31. جد الزاوية الحرجة للضوء المنتقل من الجليد إلى الهواء.', 'sin 49.73° = 0.763'], lines: ['n = c / v = 1.31', 'sin θc = 1 / n = 1 / 1.31', 'sin θc = 0.763', 'θc = 49.73°'], sc: ['bnd', 1, 1.31, Q46.deg(Math.asin(1 / 1.31)) - .001, 1, 'هواء', 'جليد 1.31'] },
    p6: { t: 'مسألة 6', q: ['يسقط ضوء من الهواء على مادة شفافة معامل انكسارها 1.5 بزاوية سقوط 30°. جد زاوية الانكسار، وطول موجة الضوء في المادة إذا كان طولها في الهواء 600 nm.'], lines: ['a) n₁ sin θ₁ = n₂ sin θ₂', '1 × 0.5 = 1.5 sin θ₂', 'sin θ₂ = 0.333 ⟸ θ₂ = 19.45°', 'b) n₂ / n₁ = λ₁ / λ₂', 'λ₂ = 600 / 1.5', 'λ₂ = 400 nm'], sc: ['bnd', 1, 1.5, 30, 0, 'هواء  λ₁ = 600 nm', 'مادة 1.5  λ₂ = 400 nm', 1] },
    q1: { t: 'س2-1', q: ['ما سبب تألق الماس؟'], lines: ['زاويته الحرجة صغيرة: حوالي 24.4°', 'لأن معامل انكساره كبير: حوالي 2.42', 'الضوء النافذ إلى داخله يعاني عدة انعكاسات كلية داخلية', 'ثم يخرج إلى عين الناظر فيكسبه بريقاً متألقاً'], sc: ['dia'] },
    q2: { t: 'س2-2', q: ['أيهما أكثر جودة في عكس الضوء: الموشور العاكس أم المرآة المستوية؟ ولماذا؟'], lines: ['الموشور العاكس أفضل', 'ينعكس الضوء فيه انعكاساً كلياً داخلياً بنسبة تقارب 100%', 'المرآة تمتص جزءاً من الضوء فتعكس نحو 90% فقط', 'لذا تبدو الصورة بالموشور حادة المعالم وأكثر سطوعاً'], sc: ['pm'] },
    q3: { t: 'س2-3', q: ['ما قانونا الانعكاس؟ وما قانونا الانكسار؟'], lines: ['الانعكاس: الشعاع الساقط والمنعكس والعمود المقام في مستوٍ واحد', 'الانعكاس: زاوية السقوط تساوي زاوية الانعكاس', 'الانكسار: الساقط والمنكسر والعمود في مستوٍ واحد عمودي على السطح الفاصل', 'الانكسار: النسبة sin θ₁ / sin θ₂ مقدار ثابت'], sc: ['bnd', 1, 1.52, 40, 0, 'هواء', 'زجاج 1.52'] },
    q4: { t: 'س2-4', q: ['اذكر الصيغة الرياضية لقانون سنيل موضحاً المعنى الفيزيائي لكل رمز.'], lines: ['n₁ sin θ₁ = n₂ sin θ₂', 'الرمز n₁: معامل الانكسار المطلق للوسط الأول', 'الرمز θ₁: زاوية السقوط في الوسط الأول', 'الرمز n₂: معامل الانكسار المطلق للوسط الثاني', 'الرمز θ₂: زاوية الانكسار في الوسط الثاني'], sc: ['bnd', 1, 1.33, 50, 0, 'الوسط الأول n₁', 'الوسط الثاني n₂'] },
    q5: { t: 'س2-5', q: ['ماذا نقصد بالزاوية الحرجة؟ وما علاقتها بمعامل الانكسار المطلق لمادة شفافة؟'], lines: ['زاوية السقوط في الوسط الأكثف ضوئياً', 'التي تقابلها زاوية انكسار قائمة 90° في الوسط الأقل كثافة', 'sin θc = n₂ / n₁', 'وإذا كان الوسط الثاني هواءً: n = 1 / sin θc'], sc: ['bnd', 1, 1.52, Q46.deg(Math.asin(1 / 1.52)) - .001, 1, 'هواء', 'زجاج 1.52'] },
    q6: { t: 'س2-6', q: ['ما المقصود بالقول إن معامل الانكسار المطلق للماء 1.33؟'], lines: ['سرعة الضوء في الفراغ أكبر من سرعته في الماء 1.33 مرة', 'n = c / v ⟸ v = c / 1.33', 'v = 2.26×10⁸ m/s'], sc: ['race', 1.33, 'الماء'] },
    q7: { t: 'س2-7', q: ['إذا كان الشعاع 1 هو الشعاع الساقط، فما الأشعة المنعكسة والأشعة المنكسرة من الأشعة الأربعة الأخرى؟'], lines: ['الشعاع 2: ينعكس عن الوجه العلوي', 'الشعاع 3: ينكسر داخل الزجاج', 'الشعاع 4: ينعكس عن الوجه السفلي داخل الزجاج', 'الشعاع 5: ينكسر خارجاً ويوازي الشعاع 2', 'المنعكسة: 2 و 4 ، والمنكسرة: 3 و 5'], sc: ['q7'] } };
  const KP = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'], KQ = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'];
  const D = { id: 'g10_r_problems', page: 111, fig: 'أسئلة الفصل ومسائله ص 111–113',
    desc: 'مسائل الفصل السادس على الجهاز: سرعة الضوء في الماس، معامل الانكسار من السرعة، الزاوية الحرجة بين الماء والزجاج، الانعكاس والانكسار عند سطح الماء، الزاوية الحرجة للجليد، وزاوية الانكسار والطول الموجي في مادة شفافة، مع أسئلة س2 كلها. كل رسم محسوب بقانون سنيل.',
    tags: 'مسائل الفصل السادس أسئلة س2 سرعة الضوء في الماس 1.24×10⁸ 1.52 62.75 22.02 49.73 19.45 400nm تألق الماس الموشور العاكس قانونا الانعكاس والانكسار قانون سنيل الزاوية الحرجة 1.33',
    tools: ['الأجهزة المرسومة لكل سؤال'],
    steps: ['اختر مسألة (م1–م6) أو سؤالاً (س2-1 إلى س2-7).', 'اضغط «الخطوة التالية» لكشف الحل خطوة خطوة، وقارن بجوابك.', 'في رسوم الانكسار غيّر زاوية السقوط من لوحة التحكم لترى القانون نفسه بزوايا أخرى.'],
    concl: ['م1: v = 1.24×10⁸ m/s. م2: n = 1.52. م3: θc = 62.75°.', 'م4: θ′₁ = 30° و θ₂ = 22.02°. م5: θc = 49.73°.', 'م6: θ₂ = 19.45° و λ₂ = 400 nm.'],
    laws: ['g10_rl_nabs', 'g10_rl_snell', 'g10_rl_crit', 'g10_rl_nrel'],
    controls: [R('da', 'تغيير زاوية السقوط في الرسم', -20, 20, 0, 1, '°'), TG('part', 'الشعاع المنعكس جزئياً', true, null, 'ray')],
    setup(S) { S.pb = 'p1'; S.k = 0; S.clk = 0; },
    update(S, dt) { S.clk += dt; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = Math.min(w - 360, 470); return { w, h, L, x0, x1, cx: (x0 + x1) / 2, cy: 340 }; },
    bnd(ctx, S, g, sc) { const [, nT, nB, th0, fromB, lT, lB, wav] = sc, th = clamp(th0 + S.p.da, 0, 89), O = [g.cx, g.cy], t = Q46.rad(th), P = fromB ? [O[0] - 200 * Math.sin(t), O[1] + 200 * Math.cos(t)] : [O[0] - 200 * Math.sin(t), O[1] - 200 * Math.cos(t)], d = fromB ? [Math.sin(t), -Math.cos(t)] : [Math.sin(t), Math.cos(t)];
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(103,232,249,' + (.08 + .1 * (nB - 1)) + ')'; ctx.fillRect(g.x0, O[1], g.x1 - g.x0, 210); ctx.fillStyle = 'rgba(103,232,249,' + (.06 * (nT - 1) * 3) + ')'; ctx.fillRect(g.x0, O[1] - 230, g.x1 - g.x0, 230); });
      Q41.line(ctx, [[g.x0, O[1]], [g.x1, O[1]]], 'rgba(186,230,253,.9)', 2); Q46.normal(ctx, O, -Math.PI / 2, 200, { L2: 200 });
      const T = Q46.trace([{ k: 's', a: [g.x0, O[1]], b: [g.x1, O[1]] }], p => p[1] > O[1] ? nB : nT, P, d, { part: S.p.part, depth: 2, minI: .01, far: 260 });
      Q46.drawTrace(ctx, T, '#ff3030', 3); Q46.laser(ctx, P[0], P[1], Math.atan2(d[1], d[0]));
      const nIn = fromB ? Math.PI / 2 : -Math.PI / 2; Q46.arcAng(ctx, O, 60, nIn, Math.atan2(-d[1], -d[0]), '#dc2626', (Math.abs(th - Math.round(th)) < .02 ? th.toFixed(0) : th.toFixed(1)) + '°');
      const ts = T.segs.find(q => q.path === 't'), rs = T.segs.find(q => q.path === 'r'); if (ts && th > .3) { const a2 = Math.atan2(ts.b[1] - ts.a[1], ts.b[0] - ts.a[0]), v = Q46.deg(Math.abs(Math.asin(Math.sin(a2 - (fromB ? -Math.PI / 2 : Math.PI / 2))))); Q46.arcAng(ctx, O, 74, -nIn, a2, '#16a34a', v > 88.5 ? '90°' : v.toFixed(1) + '°'); }
      if (rs && (S.p.part || !ts) && th > .3) Q46.arcAng(ctx, O, 46, nIn, Math.atan2(rs.b[1] - rs.a[1], rs.b[0] - rs.a[0]), '#2563eb', (Math.abs(th - Math.round(th)) < .02 ? th.toFixed(0) : th.toFixed(1)) + '°', { lr: 24 });
      if (!ts) Q46.tag(ctx, 'انعكاس كلي', O[0] + 90, O[1] + (fromB ? 40 : -40), '#be185d');
      Q46.lab(ctx, lT, g.x0 + 70, O[1] - 18, { s: 11, w: 900 }); Q46.lab(ctx, lB, g.x0 + 76, O[1] + 20, { s: 11, w: 900, c: '#a5f3fc' });
      if (wav) { const ts2 = ts; if (ts2) { const u = [(ts2.b[0] - ts2.a[0]), (ts2.b[1] - ts2.a[1])], L = Math.hypot(u[0], u[1]); for (let k = 1; k < 7; k++) { const q = [O[0] + u[0] / L * k * 24, O[1] + u[1] / L * k * 24]; Q41.line(ctx, [[q[0] - u[1] / L * 14, q[1] + u[0] / L * 14], [q[0] + u[1] / L * 14, q[1] - u[0] / L * 14]], '#fbbf24', 2); } for (let k = 1; k < 5; k++) { const q = [O[0] - d[0] * k * 36, O[1] - d[1] * k * 36]; Q41.line(ctx, [[q[0] - d[1] * 14, q[1] + d[0] * 14], [q[0] + d[1] * 14, q[1] - d[0] * 14]], '#fbbf24', 2); } } } },
    race(ctx, S, g, n, name) { const xs = g.x0 + 70, xe = g.x1 - 10, Lr = xe - xs, f = Math.min(1, (S.clk % 3.4) / 2.4), col = '#ff4d4d';
      [[g.cy - 80, 1, 'الفراغ'], [g.cy + 20, n, name]].forEach(q => { K.raw(ctx, () => { ctx.fillStyle = q[1] > 1 ? 'rgba(165,243,252,.22)' : 'rgba(255,255,255,.06)'; rr(ctx, xs, q[0] - 16, Lr, 32, 16); ctx.fill(); ctx.strokeStyle = 'rgba(203,213,225,.5)'; ctx.stroke(); }); Q46.lab(ctx, q[2], g.x0 + 34, q[0], { s: 11.5, w: 900 });
        const x = xs + 14 + (Lr - 28) * f / q[1]; Q46.beam(ctx, [xs + 8, q[0]], [x, q[0]], .6, col, 3, { arrow: false }); K.raw(ctx, () => { const gg = ctx.createRadialGradient(x, q[0], 0, x, q[0], 15); gg.addColorStop(0, '#fff'); gg.addColorStop(.4, col); gg.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(x, q[0], 15, 0, TAU); ctx.fill(); }); });
      Q46.T(ctx, 'c = 3×10⁸ m/s', xs + Lr - 80, g.cy - 110, { s: 10.5, w: 800, c: '#e2e8f0' }); Q46.T(ctx, 'v = c / ' + n + ' = ' + Q42.sci(3e8 / n, 3, 'm/s'), xs + Lr - 110, g.cy + 52, { s: 10.5, w: 800, c: '#a5f3fc' });
      Q46.tag(ctx, 'في الزمن نفسه يقطع الضوء في المادة مسافة أقل ' + n + ' مرة', g.cx, g.cy + 110, '#7c3aed', { s: 10.5 }); },
    dia(ctx, S, g) { const R0 = 110, cx = g.cx, cY = g.cy, ch = .44 * R0 * Math.tan(Q46.rad(34.5)), pv = R0 * Math.tan(Q46.rad(40.75)), P = [[cx - .56 * R0, cY - ch], [cx + .56 * R0, cY - ch], [cx + R0, cY], [cx, cY + pv], [cx - R0, cY]], E = Q46.polyE(P);
      [-40, -14, 14, 40].forEach((x, i) => { const T = Q46.trace(E, p => Q46.inPoly(P, p) ? 2.42 : 1, [cx + x + 5, cY - 200], [0, 1], { part: false, depth: 10, far: 150 }); Q46.drawTrace(ctx, T, i % 2 ? '#fde68a' : '#ffffff', 2.2, { arrow: false }); T.segs.forEach(q => { if (q.out && q.path.length && q.b[1] < q.a[1]) K.raw(ctx, () => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(q.a[0] - 12, q.a[1]); ctx.lineTo(q.a[0] + 12, q.a[1]); ctx.moveTo(q.a[0], q.a[1] - 12); ctx.lineTo(q.a[0], q.a[1] + 12); ctx.stroke(); ctx.restore(); }); }); });
      Q46.glass(ctx, Q46.polyPath(P), { tint: [224, 242, 254], a1: .35, bb: [cx, cY - 40, cx, cY + 90] }); Q46.tag(ctx, 'الماس: n = 2.42 ، θc = 24.4°', cx, cY + pv + 30, '#0e7490', { s: 11 }); },
    pm(ctx, S, g) { [[g.x0 + 20, 'الموشور العاكس', 0], [g.cx + 10, 'المرآة المستوية', 1]].forEach(q => { const x = q[0], y = g.cy - 60, L = 120, P = [[x + 40, y], [x + 40, y + L], [x + 40 + L, y + L]];
        const E = q[2] ? [{ k: 's', a: P[0], b: P[2], mir: 1, R: .9 }] : Q46.polyE(P), T = Q46.trace(E, p => !q[2] && Q46.inPoly(P, p) ? 1.52 : 1, [x, y + 40], [1, 0], { part: false, ar: true, far: 140 });
        Q46.drawTrace(ctx, T, '#ff3030', 3); if (q[2]) Q46.mirror(ctx, P[0], P[2], { side: -1 }); else Q46.glass(ctx, Q46.polyPath(P), { bb: [x, y, x + L, y + L] });
        const last = T.segs[T.segs.length - 1]; Q46.tag(ctx, q[1], x + 90, y - 26, q[2] ? '#475569' : '#0e7490', { s: 11 }); Q46.tag(ctx, (last.I * 100).toFixed(0) + '%', x + 75, y + L + 110, q[2] ? '#64748b' : '#15803d', { s: 13 }); }); },
    q7(ctx, S, g) { const top = g.cy - 40, bot = g.cy + 80, B = [[g.x0 + 10, top], [g.x1 - 10, top], [g.x1 - 10, bot], [g.x0 + 10, bot]], t = Q46.rad(50), O = [g.x0 + 120, top], P = [O[0] - 190 * Math.sin(t), O[1] - 190 * Math.cos(t)];
      const T = Q46.trace(Q46.polyE(B), p => Q46.inPoly(B, p) ? 1.52 : 1, P, [Math.sin(t), Math.cos(t)], { part: true, depth: 4, minI: .012, far: 230 }); Q46.glass(ctx, Q46.polyPath(B), { bb: [0, top, 0, bot] });
      Q46.drawTrace(ctx, T, '#ff3030', 3, { skip: q => q.path.length > 3 || q.path === 'tt' }); Q46.laser(ctx, P[0], P[1], t > 0 ? Math.atan2(Math.cos(t), Math.sin(t)) : 0);
      const lab = { '': '1', 'r': '2', 't': '3', 'tr': '4', 'trt': '5' }; T.segs.forEach(q => { const k = lab[q.path]; if (!k) return; const L = Math.hypot(q.b[0] - q.a[0], q.b[1] - q.a[1]), f = q.out ? Math.min(.5, 100 / L) : .5, x = q.a[0] + (q.b[0] - q.a[0]) * f + 16, y = q.a[1] + (q.b[1] - q.a[1]) * f - 4;
        K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y, 12, 0, TAU); ctx.fill(); ctx.stroke(); }); Q46.T(ctx, k, x, y, { s: 13, w: 900, c: '#6d28d9' }); }); },
    draw(ctx, w, h, S) { const g = D.geo(S), P = PB[S.pb], sc = P.sc; Q46.bg(ctx, w, h);
      if (sc[0] === 'bnd') D.bnd(ctx, S, g, sc); else if (sc[0] === 'race') D.race(ctx, S, g, sc[1], sc[2]); else D[sc[0]](ctx, S, g);
      Q46.steps(ctx, S, { title: P.t, q: P.q, lines: P.lines, k: S.k }, { y: 70, x: w - 12, wd: 340 });
      const C = D.chips(S, g); Q46.drawChips(ctx, C.a); Q46.drawChips(ctx, C.b); C.n._lab = '⬇ الخطوة التالية'; C.n._on = 1; C.n._col = '#be185d'; Q46.drawChips(ctx, [C.n, C.r]);
      Q46.banner(ctx, w, 'اختر مسألة أو سؤالاً ثم اضغط «الخطوة التالية»'); },
    chips(S, g) { const f = (S2, k) => { S2.pb = k; S2.k = 0; setParam(S2, 'da', 0); };
      return { a: Q42.chips(S, 'pa', KP.map(k => [k, 'م' + k.slice(1) + ' ' + PB[k].t.replace('مسألة ', '').replace(/\d/, '') ]).map(q => [q[0], 'مسألة ' + q[0].slice(1)]), g.h - 172, S.pb, f, { bw: 115, col: '#be185d' }),
        b: Q42.chips(S, 'pq', KQ.map(k => [k, PB[k].t]), g.h - 128, S.pb, f, { bw: 98, col: '#7c3aed' }),
        n: Q42.btn('nx', { x: g.L + 90, y: g.h - 84, w: 170, h: 34 }, S2 => { S2.k = Math.min(S2.k + 1, PB[S2.pb].lines.length); }, { tip: 'الخطوة التالية' }),
        r: Object.assign(Q42.btn('rs', { x: g.L + 270, y: g.h - 84, w: 170, h: 34 }, S2 => { S2.k = PB[S2.pb].lines.length; }, { tip: 'أظهر الحل كله' }), { _lab: 'أظهر الحل كله', _on: 0 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), sc = PB[S.pb].sc, L = [];
      if (sc[0] === 'bnd') { const th = clamp(sc[3] + S.p.da, 0, 89), t = Q46.rad(th), fb = sc[4], P = fb ? [g.cx - 200 * Math.sin(t), g.cy + 200 * Math.cos(t)] : [g.cx - 200 * Math.sin(t), g.cy - 200 * Math.cos(t)];
        L.push({ id: 'src', x: P[0], y: P[1], r: 26, cx: g.cx, cy: g.cy, keep: true, tip: 'اسحب الليزر لتغيير زاوية السقوط', idle: 'اسحب ✋', drag: (S2, d) => { const a = Q46.deg(fb ? d.ang - Math.PI / 2 : -d.ang - Math.PI / 2); setParam(S2, 'da', Math.round(clamp(a - sc[3], -20, 20))); } }); }
      return L.concat(C.a, C.b, [C.n, C.r]); },
    readings(S) { return [rd('السؤال', PB[S.pb].t), rd('الخطوات', S.k + ' / ' + PB[S.pb].lines.length)]; },
    explain(S) { return Q26.ex('كل مسألة تحل بقانون واحد من قوانين الفصل، والرسم يبين الأشعة بزواياها الحقيقية.', 'n = c / v ، ₁n₂ = sin θ₁ / sin θ₂ = v₁ / v₂ = λ₁ / λ₂ ، قانون سنيل n₁ sin θ₁ = n₂ sin θ₂ ، والزاوية الحرجة sin θc = n₂ / n₁.', 'هذه القوانين تستعمل في تصميم العدسات والنواظير والألياف البصرية.'); }
  };
  M8.P[D.id] = D;
})();

/* laws */
LW({ id: 'g10_rl_reflect', cat: 46, name: 'قانونا الانعكاس', fx: '<i>θ</i><sub>1</sub> = <i>θ′</i><sub>1</sub>', sym: 'الأول: الشعاع الساقط والشعاع المنعكس والعمود المقام من نقطة السقوط تقع جميعها في مستوٍ واحد. الثاني: زاوية السقوط تساوي زاوية الانعكاس', calc: { in: [['a', 'زاوية السقوط θ₁', '°', 30]], out: 'زاوية الانعكاس θ′₁', u: '°', f: v => v.a } });
LW({ id: 'g10_rl_nabs', cat: 46, name: 'معامل الانكسار المطلق', fx: '<i>n</i> = ' + FR('<i>c</i>', '<i>v</i>'), sym: 'النسبة بين سرعة الضوء في الفراغ c = 3×10⁸ m/s وسرعته في المادة الشفافة. ليس له وحدات، وللفراغ n = 1 ، وللمواد أكبر من 1', calc: { in: [['v', 'سرعة الضوء في المادة v', 'm/s', 1.56e8]], out: 'معامل الانكسار المطلق n', u: '', f: v => 3e8 / v.v } });
LW({ id: 'g10_rl_nrel', cat: 46, name: 'معامل الانكسار النسبي', fx: '<sub>1</sub><i>n</i><sub>2</sub> = ' + FR('sin <i>θ</i><sub>1</sub>', 'sin <i>θ</i><sub>2</sub>') + ' = ' + FR('<i>v</i><sub>1</sub>', '<i>v</i><sub>2</sub>') + ' = ' + FR('<i>λ</i><sub>1</sub>', '<i>λ</i><sub>2</sub>') + ' = ' + FR('<i>n</i><sub>2</sub>', '<i>n</i><sub>1</sub>'), sym: 'معامل الانكسار من الوسط الأول إلى الوسط الثاني: نسبة ثابتة لهذين الوسطين (القانون الثاني للانكسار). التردد لا يتغير عند الانتقال بين الوسطين', calc: { in: [['a1', 'زاوية السقوط θ₁', '°', 60], ['a2', 'زاوية الانكسار θ₂', '°', 40.5]], out: 'معامل الانكسار النسبي ₁n₂', u: '', f: v => Math.sin(v.a1 * Math.PI / 180) / Math.sin(v.a2 * Math.PI / 180) } });
LW({ id: 'g10_rl_snell', cat: 46, name: 'قانون سنيل', fx: '<i>n</i><sub>1</sub> sin <i>θ</i><sub>1</sub> = <i>n</i><sub>2</sub> sin <i>θ</i><sub>2</sub>', sym: 'معامل الانكسار المطلق للوسط الأول × جيب زاوية السقوط فيه = معامل الانكسار المطلق للوسط الثاني × جيب زاوية الانكسار فيه', calc: { in: [['n1', 'معامل انكسار الوسط الأول n₁', '', 1], ['a', 'زاوية السقوط θ₁', '°', 30], ['n2', 'معامل انكسار الوسط الثاني n₂', '', 1.5]], out: 'زاوية الانكسار θ₂', u: '°', f: v => { const s = v.n1 * Math.sin(v.a * Math.PI / 180) / v.n2; return Math.abs(s) > 1 ? NaN : Math.asin(s) * 180 / Math.PI; } } });
LW({ id: 'g10_rl_crit', cat: 46, name: 'الزاوية الحرجة', fx: 'sin <i>θ</i><sub>c</sub> = ' + FR('<i>n</i><sub>2</sub>', '<i>n</i><sub>1</sub>') + ' ، <i>n</i> = ' + FR('1', 'sin <i>θ</i><sub>c</sub>'), sym: 'زاوية السقوط في الوسط الأكثف ضوئياً (n₁ > n₂) التي تقابلها زاوية انكسار 90°. إذا زادت زاوية السقوط عليها حدث انعكاس كلي داخلي. وإذا كان الوسط الثاني هواء فإن n = 1 / sin θc', calc: { in: [['n1', 'معامل انكسار الوسط الأكثف n₁', '', 1.5], ['n2', 'معامل انكسار الوسط الآخر n₂', '', 1.3333]], out: 'الزاوية الحرجة θc', u: '°', f: v => v.n2 >= v.n1 ? NaN : Math.asin(v.n2 / v.n1) * 180 / Math.PI } });

/* tap-only items: no drag arrows; explanations bidi-safe */
Object.keys(M8.P).filter(k => /^g10_r_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f) D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); });
Object.keys(M8.P).filter(id => /^g10_r_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* ====================== merged experiments (book order) ====================== */
M8.merge({ id: 'g10_rr_intro', ch: 46, reg: X10, sec: '6-1 مقدمة في انعكاس وانكسار الضوء', page: 95, kind: 'نشاط',
  title: 'مقدمة: ماذا يحدث عندما يسقط الضوء على سطح؟ والعمق الظاهري',
  desc: 'نسقط شعاع ليزر على زجاج وماء ومرآة وسطح أسود ونرى كيف ينعكس جزء منه وينفذ جزء ويمتص الباقي (الشكل 2-6)، ونقارن سرعة الضوء في الوسطين (الشكل 4-6). ثم نرى لماذا تبدو السمكة أقرب إلى السطح ويبدو القلم مكسوراً في الماء (الشكل 3-6).',
  tags: 'انعكاس انكسار امتصاص كثافة ضوئية سرعة الضوء العمق الظاهري قلم مكسور سمكة',
  fact: ['يقصد بانعكاس الضوء ارتداد الضوء الساقط على سطح فاصل بين وسطين إلى الوسط الذي قدم منه (ص 95).', 'الكثافة الضوئية صفة للوسط الشفاف تعتمد عليها سرعة الضوء المار فيه، فكلما كبرت الكثافة الضوئية قلت سرعة الضوء فيه (ص 96).', 'سبب تكون صورة الجبال والأشجار في الماء هو انعكاس الضوء (الشكل 1-6).'],
  quiz: [
    { q: 'سرعة الضوء في الزجاج هي:', o: ['أقل من سرعة الضوء في الفراغ', 'أكبر من سرعة الضوء في الفراغ', 'تساوي سرعة الضوء في الفراغ', 'جميع الاحتمالات السابقة'], a: 0, why: 'س1-2 ص 111: الكثافة الضوئية للزجاج أكبر فسرعة الضوء فيه أقل.' },
    { q: 'يبدو القلم مكسوراً عند وضعه في كأس ماء بسبب:', o: ['انكسار الضوء', 'انعكاس الضوء', 'امتصاص الضوء', 'تفريق الضوء'], a: 0, why: 'ص 95: الشكل 3-6.' },
    { q: 'الشعاع الساقط عمودياً على السطح الفاصل بين الهواء والماء:', o: ['ينفذ دون أن ينحرف', 'ينكسر مقترباً من العمود', 'ينكسر مبتعداً عن العمود', 'ينعكس كلياً'], a: 0, why: 'نشاط 2 ص 99: السقوط العمودي لا يغير اتجاه الضوء.' }],
  parts: [{ id: 'g10_r_intro', n: 'سقوط الضوء على سطح: انعكاس ونفاذ وامتصاص (الأشكال 1-6 و 2-6 و 4-6)' }, { id: 'g10_r_depth', n: 'العمق الظاهري: السمكة والقلم المكسور (الشكل 3-6)' }] });
M8.merge({ id: 'g10_rr_reflect', ch: 46, reg: X10, sec: '6-2 انعكاس الضوء وقانونا الانعكاس', page: 96, kind: 'نشاط',
  title: 'نشاط 1: قانونا الانعكاس بالمرآة المستوية والمنقلة + الانعكاس المنتظم وغير المنتظم',
  desc: 'نسقط حزمة ليزر رفيعة على مرآة مستوية مثبتة على البوليستيرين فوق ورقة عليها منقلة، ونقيس زاويتي السقوط والانعكاس لعدة زوايا ونملأ الجدول (1)، فنتوصل إلى قانوني الانعكاس. ثم نقارن انعكاس حزمة متوازية عن سطح أملس وسطح خشن.',
  tags: 'نشاط 1 قانونا الانعكاس زاوية السقوط زاوية الانعكاس العمود المقام مرآة مستوية الجدول 1 انعكاس منتظم غير منتظم',
  fact: ['القانون الأول للانعكاس: الشعاع الساقط والشعاع المنعكس والعمود المقام من نقطة السقوط تقع جميعها في مستوٍ واحد (ص 97).', 'القانون الثاني للانعكاس: زاوية السقوط تساوي زاوية الانعكاس (ص 97).', 'الجدول (1): لزوايا السقوط 25° و 30° و 35° و 40° كانت زوايا الانعكاس مساوية لها (ص 97).'],
  quiz: [
    { q: 'أي من العبارات الآتية تعبر عن أحد قانوني الانعكاس:', o: ['زاوية السقوط تساوي زاوية الانعكاس', 'زاوية السقوط تساوي ضعف زاوية الانعكاس', 'زاوية السقوط تساوي نصف زاوية الانعكاس', 'زاوية السقوط تساوي الجذر التربيعي لزاوية الانعكاس'], a: 0, why: 'س1-1 ص 111: القانون الثاني للانعكاس.' },
    { q: 'زاوية السقوط هي الزاوية المحصورة بين:', o: ['الشعاع الساقط والعمود المقام', 'الشعاع الساقط والسطح العاكس', 'الشعاع الساقط والشعاع المنعكس'], a: 0, why: 'نشاط 1 ص 97.' },
    { q: 'إذا سقط شعاع على مرآة مستوية بزاوية 35° فإن الزاوية بين الشعاع الساقط والمنعكس:', o: ['70°', '35°', '55°', '110°'], a: 0, why: 'θ₁ + θ′₁ = 35° + 35°.' },
    { q: 'تتكون صورة واضحة للأشجار في ماء البحيرة عندما يكون سطح الماء:', o: ['ساكناً أملس', 'مضطرباً', 'معتماً'], a: 0, why: 'الشكل 1-6: الانعكاس المنتظم عن سطح أملس.' }],
  parts: [{ id: 'g10_r_mirror', n: 'نشاط 1: المرآة والمنقلة والجدول (1)' }, { id: 'g10_r_diffuse', n: 'الانعكاس المنتظم وغير المنتظم' }] });
M8.merge({ id: 'g10_rr_refract', ch: 46, reg: X10, sec: '6-3 انكسار الضوء وقانونا الانكسار', page: 98, kind: 'نشاط',
  title: 'نشاط 2: انكسار الضوء في حوض الماء ومتوازي المستطيلات الزجاجي',
  desc: 'نسقط الضوء على ماء فيه مسحوق طباشير عمودياً ثم مائلاً، ونقيس زاويتي السقوط والانكسار ونسجلها لنجد أن sin θ₁ / sin θ₂ ثابت (قانونا الانكسار)، ونرى الانكسار مقترباً من العمود ومبتعداً عنه (الشكلان 8-6 و 9-6)، ونحل مثال 2 والمسألتين 4 و 6. ثم نتتبع الشعاع خلال متوازي مستطيلات زجاجي مع الانعكاسات الجزئية (س7).',
  tags: 'نشاط 2 قانونا الانكسار حوض ماء طباشير منقلة متوازي مستطيلات انعكاس جزئي سؤال 7 مثال 2',
  fact: ['تذكر: لكل زاوية سقوط زاوية انكسار معينة خاصة بها بين وسطين مختلفين في الكثافة الضوئية (ص 100).', 'يفضل أن يكون مكان العمل ذا خلفية مظلمة، ويوضع مسحوق الطباشير في الماء ليظهر مسار الضوء (ص 98).', 'القانون الأول للانكسار: الشعاع الساقط والمنكسر والعمود المقام تقع في مستوٍ واحد عمودي على السطح الفاصل. والثاني: sin θ₁ / sin θ₂ مقدار ثابت (ص 99).'],
  quiz: [
    { q: 'النسبة بين جيب زاوية السقوط في الوسط الشفاف الأول وجيب زاوية الانكسار في الوسط الثاني نسبة ثابتة تسمى:', o: ['معامل الانكسار النسبي بين الوسطين الشفافين', 'طاقة الإشعاع الضوئي', 'زخم الإشعاع الضوئي', 'تردد الإشعاع الضوئي'], a: 0, why: 'س1-3 ص 111.' },
    { q: 'عند انتقال الضوء مائلاً من الهواء إلى الزجاج فإنه:', o: ['ينكسر مقترباً من العمود المقام', 'ينكسر مبتعداً عن العمود المقام', 'لا ينكسر'], a: 0, why: 'الشكل 8-6: θ₁ > θ₂.' },
    { q: 'الشعاع الخارج من متوازي مستطيلات زجاجي:', o: ['يوازي الشعاع الساقط', 'عمودي على الشعاع الساقط', 'على استقامة الشعاع الساقط دائماً'], a: 0, why: 'الوجهان متوازيان فزاوية الخروج تساوي زاوية السقوط.' },
    { q: 'في صورة السؤال 7 ص 112 الأشعة المنعكسة هي:', o: ['2 و 4', '3 و 5', '2 و 3', '4 و 5'], a: 0, why: 'س2-7: المنعكسة 2 و 4 والمنكسرة 3 و 5.' }],
  parts: [{ id: 'g10_r_tank', n: 'نشاط 2: حوض الماء والطباشير + مثال 2 + مسألتا 4 و 6' }, { id: 'g10_r_block', n: 'متوازي المستطيلات الزجاجي + س7' }] });
M8.merge({ id: 'g10_rr_snell', ch: 46, reg: X10, sec: '6-4 معامل الانكسار وقانون سنيل', page: 100, kind: 'مثال',
  title: 'معامل الانكسار المطلق والنسبي، الطول الموجي، الجدول (2) وتفريق الضوء',
  desc: 'نقارن سرعة الضوء في الفراغ وفي مواد الجدول (2): n = c / v ، ونرى جبهات الموجة تقصر داخل المادة (λ₂ = λ₁ / n) والتردد ثابت، فنصل إلى ₁n₂ = sin θ₁ / sin θ₂ = v₁ / v₂ = λ₁ / λ₂ = n₂ / n₁ وقانون سنيل n₁ sin θ₁ = n₂ sin θ₂. نحل مثال 1 والمسائل 1 و 2 و 6. ثم نرى أن n يعتمد على الطول الموجي فيتفرق الضوء الأبيض بالموشور.',
  tags: 'معامل الانكسار المطلق النسبي قانون سنيل الجدول 2 الطول الموجي مثال 1 تفريق الضوء موشور',
  fact: ['تذكر: معامل الانكسار المطلق للفراغ يساوي واحداً n = 1 (ص 102).', 'سرعة الضوء في أي مادة أقل دائماً من سرعته في الفراغ 3×10⁸ m/s (ص 102).', 'قيم الجدول (2) لضوء الصوديوم (طوله الموجي حوالي 589 nm) في درجة حرارة 20 °C ، والغازات في ضغط جو واحد ودرجة 0 °C (ص 103).', 'قانون سنيل: n₁ sin θ₁ = n₂ sin θ₂ (المعادلة 13-6 ص 104).'],
  quiz: [
    { q: 'وحدة معامل الانكسار المطلق لمادة شفافة هي:', o: ['ليس له وحدات', 'm', '1/m', 'm²'], a: 0, why: 'س1-4 ص 111: n = c / v نسبة بين سرعتين.' },
    { q: 'سرعة الضوء في وسط 1.56×10⁸ m/s. معامل انكساره المطلق:', o: ['1.92', '1.56', '0.52', '4.68'], a: 0, why: 'مثال 1 ص 102: n = 3 / 1.56.' },
    { q: 'عند انتقال الضوء من الهواء إلى الماء فإن الكمية التي لا تتغير:', o: ['التردد', 'السرعة', 'الطول الموجي', 'الاتجاه عند السقوط المائل'], a: 0, why: 'λ₁ / λ₂ = v₁ / v₂ والتردد ثابت.' },
    { q: 'معامل الانكسار المطلق للماس 2.42. سرعة الضوء فيه:', o: ['1.24×10⁸ m/s', '7.26×10⁸ m/s', '2.42×10⁸ m/s'], a: 0, why: 'مسألة 1 ص 112.' }],
  parts: [{ id: 'g10_r_index', n: 'n = c / v والطول الموجي والجدول (2) + مثال 1 + المسائل 1 و 2 و 6' }, { id: 'g10_r_disperse', n: 'تفريق الضوء بالموشور (n يعتمد على الطول الموجي)' }] });
M8.merge({ id: 'g10_rr_tir', ch: 46, reg: X10, sec: '6-5 الزاوية الحرجة والانعكاس الكلي الداخلي', page: 105, kind: 'مثال',
  title: 'الزاوية الحرجة والانعكاس الكلي الداخلي: نصف الأسطوانة، الموشور العاكس، الماس، والسراب',
  desc: 'نزيد زاوية السقوط داخل نصف أسطوانة زجاجية حتى تصبح زاوية الانكسار 90° (الزاوية الحرجة) ثم ينعكس الضوء كلياً، ونحل مثال 3 والمسألتين 3 و 5. ثم نرى تطبيقات الانعكاس الكلي: الموشور العاكس (تغيير 90° و 180°) في البيريسكوب والناظور، وبريق الماس، وظاهرة السراب.',
  tags: 'الزاوية الحرجة الانعكاس الكلي الداخلي نصف أسطوانة موشور عاكس بيريسكوب ناظور الماس السراب مثال 3',
  fact: ['تذكر: لا يحدث الانعكاس الكلي الداخلي إلا إذا انتقل الضوء من وسط شفاف إلى آخر أقل منه كثافة ضوئية، وكانت زاوية السقوط في الوسط الأكثف أكبر من الزاوية الحرجة (ص 106).', 'يدين الماس بقدر كبير من جماله للانعكاس الكلي الداخلي: زاويته الحرجة حوالي 24.4° ومعامل انكساره حوالي 2.42 (ص 107).', 'المرآة النموذجية تعكس حوالي 90% من الضوء، بينما ينعكس الضوء في الموشور العاكس انعكاساً كلياً بنسبة تقارب 100% (ص 108).'],
  quiz: [
    { q: 'الزاوية الحرجة للضوء المنتقل من مادة إلى الهواء 41.1° (sin 41.1° = 0.657). معامل انكسار المادة:', o: ['1.52', '0.657', '1.33', '2.42'], a: 0, why: 'مثال 3 ص 107: n = 1 / sin θc.' },
    { q: 'تحدث الزاوية الحرجة دائماً في الوسط:', o: ['الذي معامل انكساره أكبر', 'الذي معامل انكساره أصغر', 'في أي من الوسطين'], a: 0, why: 'ص 106.' },
    { q: 'الموشور العاكس في الناظور والبيريسكوب زواياه:', o: ['45° – 90° – 45°', '60° – 60° – 60°', '30° – 60° – 90°'], a: 0, why: 'ص 108 الشكل 16-6.' },
    { q: 'الزاوية الحرجة بين الماء (4/3) والزجاج (3/2):', o: ['62.75°', '41.1°', '48.6°', '27.25°'], a: 0, why: 'مسألة 3 ص 112: sin θc = 8 / 9.' },
    { q: 'السراب ظاهرة طبيعية تفسَّر بـ:', o: ['الانعكاس الكلي الداخلي', 'الانعكاس المنتظم عن الماء', 'امتصاص الضوء'], a: 0, why: 'ص 108.' }],
  parts: [{ id: 'g10_r_semi', n: 'نصف الأسطوانة: الزاوية الحرجة + مثال 3 + مسألتا 3 و 5' }, { id: 'g10_r_prism', n: 'الموشور العاكس والبيريسكوب والناظور وبريق الماس' }, { id: 'g10_r_mirage', n: 'السراب فوق الطريق الحار' }] });
M8.merge({ id: 'g10_rr_fiber', ch: 46, reg: X10, sec: '6-6 بصريات الألياف + 6-7 تطبيقات الألياف البصرية', page: 109, kind: 'نشاط',
  title: 'الألياف البصرية: نقل الضوء بالانعكاس الكلي الداخلي وتطبيقاتها',
  desc: 'نطلق ليزراً في ليف بصري مستقيم ثم منحنٍ ونتتبع انعكاساته الكلية بين القلب والغلاف، ونرى متى يتسرب الضوء (انحناء حاد أو غلاف قريب من القلب). ثم نستعرض التطبيقات: ناظور الجوف والأرثروسكوب والصناعة والاتصالات.',
  tags: 'الألياف البصرية قلب غلاف ناظور الجوف أرثروسكوب اتصالات',
  fact: ['الحزمة الضوئية تستطيع أن تقطع مسافة طويلة جداً، عدة كيلومترات في بعض الحالات، داخل الليف قبل أن تضيع كمية محسوسة من الضوء (ص 109).', 'يكون غلاف الليف البصري ذا معامل انكسار أقل قليلاً من قلبه، وهذا يمنع هروب الضوء (ص 109).', 'زوج من الأسلاك النحاسية يحمل 32 مكالمة هاتفية على الأكثر في الوقت نفسه، بينما يحمل الليف البصري الواحد أكثر من مليون مكالمة (ص 110).'],
  quiz: [
    { q: 'ينتقل الضوء داخل الليف البصري بظاهرة:', o: ['الانعكاس الكلي الداخلي', 'الانكسار فقط', 'التفريق', 'الامتصاص'], a: 0, why: 'ص 109.' },
    { q: 'معامل انكسار غلاف الليف البصري:', o: ['أقل قليلاً من معامل انكسار القلب', 'أكبر من معامل انكسار القلب', 'يساوي معامل انكسار القلب'], a: 0, why: 'ص 109: ليحدث الانعكاس الكلي ويمنع هروب الضوء.' },
    { q: 'الجهاز المستعمل في تنظير المعدة والكليتين:', o: ['ناظور الجوف (الأندوسكوب)', 'الأرثروسكوب', 'البيريسكوب'], a: 0, why: 'ص 110 الشكل 22-6.' },
    { q: 'يستعمل الأرثروسكوب في:', o: ['جراحة الركبة وأمراض المفاصل', 'فحص المعدة', 'رؤية الأجسام فوق سطح الماء'], a: 0, why: 'ص 110 الشكل 23-6.' }],
  parts: [{ id: 'g10_r_fiber', n: 'الليف البصري المستقيم والمنحني والتطبيقات' }] });
M8.merge({ id: 'g10_rr_review', ch: 46, reg: X10, sec: 'أسئلة الفصل السادس ومسائله', page: 111, kind: 'مثال',
  title: 'مسائل الفصل السادس وأسئلته على الجهاز',
  desc: 'نحل مسائل الكتاب الست خطوة خطوة مع رسوم محسوبة بقانون سنيل، ونجيب عن أسئلة س2: تألق الماس، الموشور مقابل المرآة، قانونا الانعكاس والانكسار، قانون سنيل، الزاوية الحرجة، معنى n = 1.33 ، والأشعة في السؤال 7.',
  tags: 'مسائل الفصل السادس أسئلة س2',
  fact: ['أجوبة المسائل: م1 v = 1.24×10⁸ m/s ، م2 n = 1.52 ، م3 θc = 62.75° ، م4 θ′₁ = 30° و θ₂ = 22.02° ، م5 θc = 49.73° ، م6 θ₂ = 19.45° و λ₂ = 400 nm (ص 112–113).'],
  quiz: [
    { q: 'معامل الانكسار المطلق للماء 1.33 يعني:', o: ['سرعة الضوء في الفراغ أكبر من سرعته في الماء 1.33 مرة', 'الماء يعكس 1.33 من الضوء', 'سرعة الضوء في الماء أكبر 1.33 مرة'], a: 0, why: 'س2-6: n = c / v.' },
    { q: 'سقط ضوء من الهواء على مادة n = 1.5 بزاوية 30°. زاوية الانكسار:', o: ['19.45°', '30°', '48.6°', '22.02°'], a: 0, why: 'مسألة 6 ص 113.' },
    { q: 'طول موجة الضوء 600 nm في الهواء. طولها في مادة n = 1.5:', o: ['400 nm', '900 nm', '600 nm'], a: 0, why: 'مسألة 6 ص 113: λ₂ = λ₁ / n.' }],
  parts: [{ id: 'g10_r_problems', n: 'المسائل م1–م6 وأسئلة س2' }] });
