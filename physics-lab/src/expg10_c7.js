'use strict';
/* ====================== الرابع العلمي — الفصل السابع: المرايا (ch 47, ص 114–132) ======================
   Merged experiments (book order): g10_mir_plane (7-1, 7-2) · g10_mir_angle (7-3) · g10_mir_sph (7-4 + الزيغ الكروي)
   · g10_mir_images (7-5, 7-6, النشاطان 2 و 3) · g10_mir_eq (7-7, 7-8, الأمثلة 1–3) · g10_mir_apps (7-9) · g10_mir_review (أسئلة ومسائل ص 130–132).
   Local kit Q47 = Q42 + mirrors (plane, spherical, parabolic) with exact reflection, candle objects/images, eye, optical bench,
   and the ray-diagram engine Q47.diag() (principal rays hit the real mirror surface and meet exactly at the image of 1/f = 1/u + 1/v). */
LW({ id: 'g10_mr_plane', cat: 47, name: 'صورة المرآة المستوية', fx: '<i>v</i> = <i>u</i> ، <i>h′</i> = <i>h</i>', sym: 'صورة الجسم في المرآة المستوية خيالية معتدلة مساوية للجسم ومعكوسة الجوانب، وبعدها خلف المرآة يساوي بعد الجسم أمامها. زاوية السقوط = زاوية الانعكاس', calc: { in: [['u', 'بعد الجسم عن المرآة u', 'cm', 50]], out: 'بعد الصورة خلف المرآة', u: 'cm', f: v => v.u } });
LW({ id: 'g10_mr_n', cat: 47, name: 'عدد الصور في مرآتين متزاويتين', fx: '<i>n</i> = ' + FR('360°', '<i>θ</i>') + ' − 1', sym: 'n عدد الصور المتكونة لجسم موضوع بين مرآتين مستويتين الزاوية بينهما θ. المرآتان المتوازيتان تكوّنان عدداً لا نهائياً من الصور', calc: { in: [['t', 'الزاوية بين المرآتين θ', '°', 24]], out: 'عدد الصور n', u: '', f: v => 360 / v.t - 1 } });
LW({ id: 'g10_mr_fR', cat: 47, name: 'البعد البؤري ونصف قطر التكور', fx: '<i>f</i> = ' + FR('<i>R</i>', '2'), sym: 'البعد البؤري للمرآة الكروية يساوي نصف نصف قطر تكورها. البؤرة حقيقية أمام المرآة المقعرة وتقديرية خلف المرآة المحدبة', calc: { in: [['R', 'نصف قطر التكور R', 'cm', 30]], out: 'البعد البؤري f', u: 'cm', f: v => v.R / 2 } });
LW({ id: 'g10_mr_eq', cat: 47, name: 'القانون العام للمرايا', fx: FR('1', '<i>f</i>') + ' = ' + FR('1', '<i>u</i>') + ' + ' + FR('1', '<i>v</i>'), sym: 'u موجب للجسم الحقيقي، v موجب للصورة الحقيقية وسالب للخيالية، f موجب للمرآة المقعرة وسالب للمحدبة', calc: { in: [['f', 'البعد البؤري f (سالب للمحدبة)', 'cm', 20], ['u', 'بعد الجسم u', 'cm', 30]], out: 'بعد الصورة v', u: 'cm', f: v => v.u * v.f / (v.u - v.f) } });
LW({ id: 'g10_mr_M', cat: 47, name: 'قانون التكبير', fx: '<i>M</i> = ' + FR('<i>h′</i>', '<i>h</i>') + ' = − ' + FR('<i>v</i>', '<i>u</i>'), sym: 'M سالب للصورة الحقيقية المقلوبة وموجب للخيالية المعتدلة. |M| > 1 مكبرة ، |M| < 1 مصغرة ، |M| = 1 مساوية', calc: { in: [['v', 'بعد الصورة v', 'cm', 60], ['u', 'بعد الجسم u', 'cm', 30]], out: 'التكبير M', u: '', f: v => -v.v / v.u } });

const Q47 = Object.assign(Object.create(Q42), {
  C1: '#dc2626', C2: '#2563eb', C3: '#16a34a', C4: '#9333ea', BD: '#0891b2',
  card(ctx, S, L, o) { return Q31.card(ctx, S, L, Object.assign({ bd: '#0891b2' }, o || {})); },
  banner(ctx, w, s, col, y) { Q26.banner(ctx, w, s, col || '#0e7490', y); },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#f0fdff'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  nrm(a) { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; },
  refl(d, n) { const k = 2 * (d[0] * n[0] + d[1] * n[1]); return [d[0] - k * n[0], d[1] - k * n[1]]; },
  /* point where ray p+t·d leaves the box {x0,x1,y0,y1} */
  exit(p, d, b) { let t = 1e5; if (d[0] > 1e-9) t = Math.min(t, (b.x1 - p[0]) / d[0]); if (d[0] < -1e-9) t = Math.min(t, (b.x0 - p[0]) / d[0]); if (d[1] > 1e-9) t = Math.min(t, (b.y1 - p[1]) / d[1]); if (d[1] < -1e-9) t = Math.min(t, (b.y0 - p[1]) / d[1]); t = Math.max(0, t); return [p[0] + d[0] * t, p[1] + d[1] * t]; },
  /* ---------- mirror geometry. M = {k:'pl'|'cc'|'cv'|'par', vx, ay, R, ap} (front faces −x) ---------- */
  mpt(M, y) { const R = M.R; if (M.k === 'pl') return M.vx; if (M.k === 'par') return M.vx - y * y / (2 * R); if (M.k === 'cc') return M.vx - R + Math.sqrt(Math.max(0, R * R - y * y)); return M.vx + R - Math.sqrt(Math.max(0, R * R - y * y)); },
  mnorm(M, y) { const R = M.R, x = Q47.mpt(M, y); if (M.k === 'pl') return [-1, 0]; if (M.k === 'par') return Q47.nrm([-1, -y / R]); if (M.k === 'cc') return Q47.nrm([M.vx - R - x, -y]); return Q47.nrm([x - (M.vx + R), y]); },
  /* exact intersection with the reflecting surface; returns {pt:[x,y], n (front normal)} */
  mhit(M, p, d) { const ay = M.ay, py = p[1] - ay; let ts = [];
    if (M.k === 'pl') { if (Math.abs(d[0]) > 1e-9) ts = [(M.vx - p[0]) / d[0]]; }
    else if (M.k === 'par') { const A = d[1] * d[1] / (2 * M.R), B = d[0] + d[1] * py / M.R, C = p[0] - M.vx + py * py / (2 * M.R); if (Math.abs(A) < 1e-12) { if (Math.abs(B) > 1e-12) ts = [-C / B]; } else { const D = B * B - 4 * A * C; if (D >= 0) { const s = Math.sqrt(D); ts = [(-B - s) / (2 * A), (-B + s) / (2 * A)]; } } }
    else { const cx = M.k === 'cc' ? M.vx - M.R : M.vx + M.R, fx = p[0] - cx, b = fx * d[0] + py * d[1], c = fx * fx + py * py - M.R * M.R, D = b * b - c; if (D >= 0) { const s = Math.sqrt(D); ts = [-b - s, -b + s].filter(t => { const x = p[0] + t * d[0]; return M.k === 'cc' ? x >= cx : x <= cx; }); } }
    ts = ts.filter(t => t > 1e-6 && Math.abs(py + t * d[1]) <= M.ap + 1e-6).sort((a, b) => a - b); if (!ts.length) return null; const t = ts[0], pt = [p[0] + t * d[0], p[1] + t * d[1]];
    return { pt, n: Q47.mnorm(M, pt[1] - ay), t }; },
  /* draw a mirror (glass + silver backing + hatching) */
  mirror(ctx, M, o = {}) { const N = 48, P = [], Nn = []; for (let i = 0; i <= N; i++) { const y = -M.ap + 2 * M.ap * i / N; P.push([Q47.mpt(M, y), M.ay + y]); Nn.push(Q47.mnorm(M, y)); }
    Q47.curve(ctx, P, Nn, o); },
  curve(ctx, P, Nn, o = {}) { const th = o.th || 7;
    K.raw(ctx, () => { ctx.save(); const B = P.map((p, i) => [p[0] - Nn[i][0] * th, p[1] - Nn[i][1] * th]);
      ctx.fillStyle = o.glass || 'rgba(165,243,252,.85)'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = B.length - 1; i >= 0; i--) ctx.lineTo(B[i][0], B[i][1]); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 2.6; ctx.beginPath(); B.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.2; ctx.beginPath(); let acc = 0; for (let i = 1; i < B.length; i++) { acc += Math.hypot(B[i][0] - B[i - 1][0], B[i][1] - B[i - 1][1]); if (acc >= 9) { acc = 0; const n = Nn[i]; ctx.moveTo(B[i][0], B[i][1]); ctx.lineTo(B[i][0] - n[0] * 8 + n[1] * 5, B[i][1] - n[1] * 8 - n[0] * 5); } } ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 1.6; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
      ctx.strokeStyle = o.edge || '#0891b2'; ctx.lineWidth = .8; ctx.stroke(); ctx.restore(); }); },
  /* straight mirror a→b with front normal n */
  seg(ctx, a, b, n, o) { const P = [], Nn = []; for (let i = 0; i <= 12; i++) { P.push([a[0] + (b[0] - a[0]) * i / 12, a[1] + (b[1] - a[1]) * i / 12]); Nn.push(n); } Q47.curve(ctx, P, Nn, o); },
  /* candle standing on the axis line ay at x; hp = signed height of the flame tip in px (negative = inverted image) */
  cand(ctx, x, ay, hp, t, o = {}) { if (!isFinite(hp) || Math.abs(hp) < .5) return; const k = hp / 78;
    K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = o.a ?? 1; ctx.translate(x, ay); ctx.scale(Math.abs(k) * (o.sx || 1), k); Q26.candle(ctx, 0, 0, 1, t, true); ctx.restore();
      if (o.dash) { ctx.save(); ctx.globalAlpha = .9; ctx.setLineDash([4, 3]); ctx.strokeStyle = o.dash; ctx.lineWidth = 1.3; const W = 8 * Math.abs(k) + 3; ctx.strokeRect(x - W, Math.min(ay, ay - hp), 2 * W, Math.abs(hp)); ctx.restore(); } }); },
  eye(ctx, x, y, ang = 0, s = 1) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
      ctx.fillStyle = '#fde7d4'; ctx.beginPath(); ctx.ellipse(-4, 0, 24, 19, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(-16, 0); ctx.quadraticCurveTo(0, -14, 16, 0); ctx.quadraticCurveTo(0, 14, -16, 0); ctx.fill(); ctx.stroke();
      const g = ctx.createRadialGradient(7, -1, 1, 7, 0, 7); g.addColorStop(0, '#38bdf8'); g.addColorStop(1, '#075985'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(7, 0, 6.5, 0, TAU); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(8.5, 0, 3, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(6, -2.5, 1.4, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-14, -6); ctx.quadraticCurveTo(0, -18, 15, -6); ctx.stroke(); ctx.restore(); }); },
  pt(ctx, x, y, lab, col = '#0f172a', dy = 16) { Q41.dot(ctx, x, y, col, 4.5); if (lab) Q42.T(ctx, lab, x, y + dy, { s: 13, w: 900, c: col }); },
  ray(ctx, pts, col, o) { Q26.ray(ctx, pts, col, Object.assign({ w: 2.3 }, o || {})); },
  arc(ctx, x, y, r, a0, a1, col, lab, lr) { K.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.arc(x, y, r, Math.min(a0, a1), Math.max(a0, a1)); ctx.stroke(); }); if (lab) { const a = (a0 + a1) / 2, R2 = lr || r + 16; Q42.T(ctx, lab, x + Math.cos(a) * R2, y + Math.sin(a) * R2, { s: 11, w: 900, c: col }); } },
  /* optical bench rail with a cm scale; 0 at x0 (the mirror), increasing to the left */
  bench(ctx, x0, xl, y, pxcm, max) { K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y, 0, y + 22); g.addColorStop(0, '#e5e7eb'); g.addColorStop(.4, '#9ca3af'); g.addColorStop(1, '#4b5563'); ctx.fillStyle = g; rr(ctx, xl - 10, y, x0 - xl + 40, 22, 4); ctx.fill();
      ctx.fillStyle = '#fef3c7'; ctx.fillRect(xl, y + 3, x0 - xl, 10); ctx.strokeStyle = '#78350f';
      for (let c = 0; c <= max; c++) { const x = x0 - c * pxcm; if (x < xl) break; const L = c % 10 === 0 ? 9 : c % 5 === 0 ? 6 : 3; ctx.lineWidth = c % 10 ? .7 : 1.3; ctx.beginPath(); ctx.moveTo(x, y + 3); ctx.lineTo(x, y + 3 + L); ctx.stroke(); }
      ctx.fillStyle = '#374151'; ctx.fillRect(xl, y + 22, 12, 30); ctx.fillRect(x0 + 14, y + 22, 12, 30); });
    for (let c = 0; c <= max; c += 10) { const x = x0 - c * pxcm; if (x < xl) break; Q42.T(ctx, String(c), x, y + 30, { s: 9.5, w: 800, c: '#1f2937' }); } },
  /* sliding rider (holder) on the bench, top at yt */
  rider(ctx, x, yt, yb, col = '#334155') { K.raw(ctx, () => { const g = ctx.createLinearGradient(x - 4, 0, x + 4, 0); g.addColorStop(0, '#6b7280'); g.addColorStop(.5, '#e5e7eb'); g.addColorStop(1, '#4b5563'); ctx.fillStyle = g; ctx.fillRect(x - 3, yt, 6, yb - yt); ctx.fillStyle = col; rr(ctx, x - 16, yb - 6, 32, 14, 3); ctx.fill(); }); },
  /* ---------- paraxial image ---------- */
  img(f, u) { const den = u - f; if (Math.abs(den) < 1e-9 * Math.max(1, Math.abs(f))) return { v: Infinity, M: Infinity }; const v = u * f / den; return { v, M: -v / u }; },
  props(f, u) { const r = Q47.img(f, u); if (!isFinite(r.v)) return { v: r.v, M: r.M, real: null, txt: 'لا تتكون صورة: الأشعة تنعكس متوازية' }; const real = r.v > 0, a = Math.abs(r.M);
    return { v: r.v, M: r.M, real, kind: real ? 'حقيقية' : 'خيالية', dir: r.M < 0 ? 'مقلوبة' : 'معتدلة', size: Math.abs(a - 1) < .015 ? 'مساوية للجسم' : a > 1 ? 'مكبرة' : 'مصغرة', txt: (real ? 'حقيقية' : 'خيالية') + ' ، ' + (r.M < 0 ? 'مقلوبة' : 'معتدلة') + ' ، ' + (Math.abs(a - 1) < .015 ? 'مساوية للجسم' : a > 1 ? 'مكبرة' : 'مصغرة') }; },
  where(f, u) { const r = Q47.img(f, u); if (f < 0) return 'خلف المرآة بين القطب والبؤرة'; if (!isFinite(r.v)) return 'في اللانهاية'; const v = r.v; if (v < 0) return 'خلف المرآة'; if (Math.abs(v - 2 * f) < .02 * f) return 'في مركز التكور'; if (v > 2 * f) return 'أبعد من مركز التكور'; return 'بين البؤرة ومركز التكور'; },
  n(v, d = 1) { if (!isFinite(v)) return '∞'; const r = +v.toFixed(d); return (r < 0 ? '−' : '') + Math.abs(r); },
  /* ---------- ray diagram: o = {k:'cc'|'cv', vx, ay, f (px, >0), u (px), h (px), box:{x0,x1,y0,y1}, rays:[1,2,3,4], t, ap, img, lab, sc (px per cm for labels)} ---------- */
  diag(ctx, o) { const f = o.k === 'cc' ? o.f : -o.f, R = 2 * o.f, ay = o.ay, vx = o.vx, b = o.box, M = { k: o.k, vx, ay, R, ap: Math.min(o.ap || R * .8, R * .92) };
    K.raw(ctx, () => { ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(b.x0, ay); ctx.lineTo(b.x1, ay); ctx.stroke(); });
    Q47.mirror(ctx, M);
    if (o.lab !== false) { const F = vx - f, C = vx - 2 * f; Q47.pt(ctx, F, ay, 'F', '#b45309'); if (C > b.x0 && C < b.x1) Q47.pt(ctx, C, ay, 'C', '#0f766e'); Q47.pt(ctx, vx, ay, 'V', '#334155', 16); }
    const u = o.u, h = o.h, tip = [vx - u, ay - h], I = Q47.img(f, u), fin = isFinite(I.v) && Math.abs(I.v) < 40 * o.f, ip = fin ? [vx - I.v, ay - I.M * h] : null;
    const drawRay = (typ, col) => { let d, from = null;
      if (typ === 1) d = [1, 0];
      else if (typ === 2) { const F = [vx - f, ay]; d = Q47.nrm([F[0] - tip[0], F[1] - tip[1]]); if (Math.abs(F[0] - tip[0]) < 2) return; if (d[0] < 0) { d = [-d[0], -d[1]]; from = F; } }
      else if (typ === 3) { const C = [vx - 2 * f, ay]; if (Math.abs(C[0] - tip[0]) < 2) return; d = Q47.nrm([C[0] - tip[0], C[1] - tip[1]]); if (d[0] < 0) { d = [-d[0], -d[1]]; from = C; } }
      else d = Q47.nrm([vx - tip[0], ay - tip[1]]);
      const H = Q47.mhit(M, tip, d); if (!H) return;
      let dr; if (fin) dr = I.v > 0 ? Q47.nrm([ip[0] - H.pt[0], ip[1] - H.pt[1]]) : Q47.nrm([H.pt[0] - ip[0], H.pt[1] - ip[1]]); else dr = Q47.nrm([-u, h]);
      if (dr[0] > 0) dr = Q47.refl(d, H.n);
      if (from) Q47.ray(ctx, [from, tip], col, { dash: [3, 5], alpha: .55 });
      Q47.ray(ctx, [tip, H.pt], col, { glow: o.glow });
      Q47.ray(ctx, [H.pt, Q47.exit(H.pt, dr, b)], col, { glow: o.glow });
      if (fin && I.v < 0 && o.ext !== false) Q47.ray(ctx, [H.pt, Q47.exit(H.pt, [-dr[0], -dr[1]], { x0: b.x0, x1: Math.min(b.x1, ip[0] + 40), y0: b.y0, y1: b.y1 })], col, { dash: [6, 5], alpha: .75, arrows: false }); };
    const cols = [0, Q47.C1, Q47.C2, Q47.C3, Q47.C4]; (o.rays || [1, 2, 3]).forEach(k => drawRay(k, cols[k]));
    const OB = o.obj || ((c, x, y, hp, t, op) => Q47.cand(c, x, y, hp, t, op)); OB(ctx, tip[0], ay, h, o.t, {});
    if (o.img !== false) { if (fin && ip[0] > b.x0 && ip[0] < b.x1 && Math.abs(I.M * h) < (b.y1 - b.y0) * .6) OB(ctx, ip[0], ay, I.M * h, o.t + 1, { a: I.v > 0 ? .8 : .45, dash: I.v > 0 ? null : '#7c3aed' });
      else if (!fin) Q42.T(ctx, 'الصورة في اللانهاية', b.x0 + 90, b.y0 + 16, { s: 12, w: 900, c: '#fff', bg: '#7c3aed' });
      else Q42.T(ctx, ip[0] < b.x0 ? '← الصورة خارج اللوحة' : 'الصورة خارج اللوحة →', ip[0] < b.x0 ? b.x0 + 90 : b.x1 - 90, b.y0 + 16, { s: 12, w: 900, c: '#fff', bg: '#7c3aed' }); }
    return { M, I, ip, tip }; }
});

/* small drawing helpers used by several parts */
Q47.mtext = (ctx, s, x, y, o) => K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(-1, 1); G.text(ctx, s, 0, 0, Object.assign({ raw: 1 }, o || {})); ctx.restore(); });
Q47.table = (ctx, x0, x1, y) => K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y, 0, y + 20); g.addColorStop(0, '#d6a574'); g.addColorStop(1, '#8a5a33'); ctx.fillStyle = g; rr(ctx, x0, y, x1 - x0, 20, 4); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(x0, y, x1 - x0, 2); ctx.fillStyle = '#7c4a24'; ctx.fillRect(x0 + 20, y + 20, 12, 60); ctx.fillRect(x1 - 32, y + 20, 12, 60); });
Q47.dim = (ctx, x0, x1, y, lab, col = '#0f172a') => { K.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.moveTo(x0, y - 6); ctx.lineTo(x0, y + 6); ctx.moveTo(x1, y - 6); ctx.lineTo(x1, y + 6); ctx.stroke(); }); if (lab) Q42.T(ctx, lab, (x0 + x1) / 2, y + 14, { s: 12, w: 900, c: col }); };
Q47.bfly = (ctx, x, y, s, flip, t) => K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(flip ? -s : s, s); const fl = 1 - .12 * (1 + Math.sin(t * 5)) / 2;
  [[-1, '#f97316', '#7c2d12'], [1, '#fb923c', '#9a3412']].forEach(q => { const g = ctx.createRadialGradient(-6, q[0] * 14, 2, -6, q[0] * 14, 30); g.addColorStop(0, '#fde68a'); g.addColorStop(.6, q[1]); g.addColorStop(1, q[2]); ctx.fillStyle = g; ctx.save(); ctx.scale(1, fl); ctx.beginPath(); ctx.ellipse(-10, q[0] * 20, 22, 17, q[0] * .5, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(8, q[0] * 15, 13, 11, -q[0] * .4, 0, TAU); ctx.fill(); ctx.restore(); });
  ctx.fillStyle = '#1c1917'; ctx.beginPath(); ctx.ellipse(0, 0, 18, 4, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(19, 0, 5, 0, TAU); ctx.fill(); ctx.strokeStyle = '#1c1917'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(22, -3); ctx.quadraticCurveTo(30, -12, 34, -10); ctx.moveTo(22, 3); ctx.quadraticCurveTo(30, 12, 34, 10); ctx.stroke(); ctx.restore(); });
Q47.stepsCard = (ctx, S, st, o) => Q42.steps(ctx, S, st, Object.assign({ y: 70, x: S.W - 12, wd: 320 }, o || {}));

/* =============== A1 — المرآة المستوية: الشمعة والعين، المصدر النقطي، الفراشة (7-1، 7-2، الأشكال 1-7، 2-7، 5-7 + فكر ص 116) =============== */
(() => {
  const BF = { title: 'فكر: الفراشة ص 116', q: 'ما صفات صورة الفراشة في المرآة المستوية؟ وكم تبعد صورة رأسها عنه إذا كان بعد رأسها عن المرآة 50 cm؟', lines: ['الصورة خيالية معتدلة مساوية للفراشة ومعكوسة الجوانب', 'بعد الصورة خلف المرآة = بعد الجسم أمامها = 50 cm', 'بعد صورة الرأس عن الرأس = 50 + 50', 'المسافة = 100 cm'] };
  const D = { id: 'g10_mr_plane', page: 114, fig: 'الأشكال 1-7 و 2-7 و 5-7 + فكر ص 116',
    desc: 'المرآة المستوية سطح مستوٍ صقيل ينعكس عنه الضوء انعكاساً منتظماً، وتصنع من لوح زجاج مصقول يطلى أحد وجهيه بمركب للفضة أو الألمنيوم. صورة الجسم فيها خيالية معتدلة مساوية له ومعكوسة الجوانب، وبعدها خلف المرآة يساوي بعد الجسم أمامها. نحدد موقع الصورة بمخطط الأشعة: الأشعة المنعكسة تتفرق لكن امتداداتها تلتقي في نقطة خلف المرآة هي الصورة.',
    tags: 'المرآة المستوية صورة خيالية معتدلة مساوية معكوسة الجوانب بعد الصورة يساوي بعد الجسم مخطط الأشعة قانونا الانعكاس زاوية السقوط زاوية الانعكاس مصدر نقطي امتدادات الأشعة الفراشة 50cm 100cm',
    tools: ['مرآة مستوية على حامل', 'شمعة متقدة', 'حاجز (شاشة) بيضاء', 'مسطرة'],
    steps: ['اسحب الشمعة نحو المرآة أو بعيداً عنها: الصورة تقترب وتبتعد بالمقدار نفسه (u = v).', 'اسحب العين: الأشعة التي تدخلها تنعكس عن المرآة بزاوية تساوي زاوية السقوط، وامتداداتها تمر بالصورة.', 'فعّل «حاجز عند موقع الصورة»: لا تظهر أي صورة عليه لأنها خيالية.', 'اختر «مصدر نقطي» لترى الشكل 5-7، ثم «فكر: الفراشة» وحل السؤال خطوة خطوة.'],
    concl: ['صورة الجسم في المرآة المستوية: خيالية ، معتدلة ، مساوية للجسم ، معكوسة الجوانب.', 'بعد الصورة خلف المرآة يساوي بعد الجسم أمامها: v = u.', 'الأشعة المنعكسة متفرقة، وتبدو كأنها صادرة من الصورة I خلف المرآة (تلتقي امتداداتها فيها).', 'زاوية السقوط = زاوية الانعكاس (قانونا الانعكاس).', 'الفراشة: صورة رأسها تبعد 100 cm عن رأسها.'],
    laws: ['g10_mr_plane'],
    controls: [R('nr', 'عدد الأشعة', 1, 6, 3, 1, ''), TG('ext', 'امتدادات الأشعة خلف المرآة', true, null, 'ray'), TG('nrm', 'العمود وزاويتا السقوط والانعكاس', true, null, 'labels'), TG('scr', 'حاجز عند موقع الصورة', false, null, 'eye')],
    setup(S) { S.md = 'cand'; S.u = 30; S.uT = 30; S.ex = 0; S.ey = 0; S.eyeOk = 0; S.k = 0; S.tt = 0; },
    update(S, dt) { S.tt += dt; S.u += (S.uT - S.u) * Math.min(1, dt * 10); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), mx = Math.round(L + (w - L) * .5), ty = Math.round(h * .62), px = 4.2; if (!S.ex) { S.ex = mx - 230; S.ey = ty - 200; } return { w, h, L, mx, ty, px, top: ty - 260 }; },
    draw(ctx, w, h, S) { const g = D.geo(S), u = S.u, ox = g.mx - u * g.px, ix = g.mx + u * g.px, md = S.md, nr = S.p.nr || 3; Q47.bg(ctx, w, h);
      Q47.table(ctx, g.L + 10, w - 20, g.ty);
      // mirror on a stand (edge view) — silvered back faces right
      K.raw(ctx, () => { ctx.fillStyle = '#334155'; rr(ctx, g.mx - 4, g.ty - 8, 26, 8, 2); ctx.fill(); });
      Q47.seg(ctx, [g.mx, g.top], [g.mx, g.ty - 6], [-1, 0], { th: 8 });
      Q42.T(ctx, 'مرآة مستوية', g.mx - 58, g.top + 12, { s: 12, w: 900, c: '#fff', bg: '#0891b2' });
      if (md === 'bfly') { const by = g.ty - 120; Q47.bfly(ctx, ox - 20, by, 1.25, 0, S.tt);
        K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = .35; ctx.fillStyle = '#e0f2fe'; ctx.fillRect(g.mx + 8, g.top, w - g.mx - 30, g.ty - g.top - 8); ctx.restore(); });
        K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = .55; Q47.bfly(ctx, ix + 20, by, 1.25, 1, S.tt); ctx.restore(); });
        Q42.T(ctx, 'الفراشة', ox - 20, by + 52, { s: 12, w: 900, c: '#9a3412' }); Q42.T(ctx, 'صورتها', ix + 20, by + 52, { s: 12, w: 900, c: '#7c3aed' });
        Q47.dim(ctx, ox + 26, g.mx, g.ty + 34, Q47.n(u, 0) + ' cm', '#9a3412'); Q47.dim(ctx, g.mx, ix - 26, g.ty + 34, Q47.n(u, 0) + ' cm', '#7c3aed'); Q47.dim(ctx, ox + 26, ix - 26, g.ty + 72, Q47.n(2 * u, 0) + ' cm', '#be185d');
        const C = Q41.stepChips(S, 'st', h - 128, g.L, 'حل سؤال فكر', S2 => { S2.uT = 50; }); Q42.drawChips(ctx, C); Q47.stepsCard(ctx, S, Object.assign({}, BF, { k: S.ex2 ? S.k : 0 }));
      } else {
        const T = md === 'pt' ? [ox, g.ty - 150] : [ox, g.ty - 100], I = [ix, T[1]];
        if (md === 'pt') { Q45.lamp(ctx, T[0], T[1], .8, 6); Q42.T(ctx, 'O', T[0] - 16, T[1] - 18, { s: 14, w: 900, c: '#b45309' }); K.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(T[0] - 2, T[1] + 10, 4, g.ty - T[1] - 10); }); }
        else Q47.cand(ctx, ox, g.ty, 100, S.tt);
        // image (virtual)
        if (md === 'pt') { Q41.dot(ctx, I[0], I[1], '#7c3aed', 5); Q42.T(ctx, 'I', I[0] + 14, I[1] - 14, { s: 14, w: 900, c: '#7c3aed' }); }
        else Q47.cand(ctx, ix, g.ty, 100, S.tt + 2, { a: .42, dash: '#7c3aed' });
        if (S.p.scr) { K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; rr(ctx, ix + 30, g.ty - 150, 16, 150, 3); ctx.fill(); ctx.stroke(); }); Q42.T(ctx, 'حاجز: لا صورة عليه', ix + 38, g.ty - 166, { s: 11, w: 900, c: '#fff', bg: '#dc2626' }); }
        // rays
        const box = { x0: g.L + 4, x1: g.mx, y0: 50, y1: g.ty }; let shown = 0, firstP = null, firstR = null;
        if (md === 'pt') { for (let i = 0; i < nr; i++) { const yy = g.top + 20 + (g.ty - g.top - 40) * (nr === 1 ? .5 : i / (nr - 1)), P = [g.mx, yy], d = Q47.nrm([P[0] - T[0], P[1] - T[1]]), r = [-d[0], d[1]];
            Q47.ray(ctx, [T, P], '#dc2626'); Q47.ray(ctx, [P, Q47.exit(P, r, box)], '#dc2626'); if (S.p.ext !== false) Q47.ray(ctx, [P, I], '#7c3aed', { dash: [6, 5], arrows: false, alpha: .8 }); if (!firstP) { firstP = P; firstR = Q47.exit(P, r, box); } } shown = 1; }
        else { const E = [S.ex, S.ey], t0 = (g.mx - E[0]) / (I[0] - E[0]), Py = E[1] + (I[1] - E[1]) * t0; S.eyeOk = Py > g.top && Py < g.ty - 6 ? 1 : 0;
          if (S.eyeOk) { for (let i = 0; i < nr; i++) { const off = nr === 1 ? 0 : (i / (nr - 1) - .5) * 14, Ep = [E[0] + 4, E[1] + off], tt = (g.mx - Ep[0]) / (I[0] - Ep[0]), P = [g.mx, Ep[1] + (I[1] - Ep[1]) * tt];
              Q47.ray(ctx, [T, P], '#dc2626'); Q47.ray(ctx, [P, Ep], '#dc2626'); if (S.p.ext !== false) Q47.ray(ctx, [P, I], '#7c3aed', { dash: [6, 5], arrows: false, alpha: .8 }); if (!firstP || i === Math.floor(nr / 2)) { firstP = P; firstR = Ep; } } shown = 1; }
          else Q42.T(ctx, 'العين لا ترى الصورة من هنا: الأشعة المنعكسة لا تصل إليها', g.L + 20 + 200, g.ty + 104, { s: 12, w: 900, c: '#fff', bg: '#dc2626' });
          Q47.eye(ctx, E[0], E[1], Math.atan2(firstP ? firstP[1] - E[1] : 0, firstP ? firstP[0] - E[0] : 1), 1.1); }
        if (shown && S.p.nrm !== false && firstP) { const P = firstP, nA = a => (a < 0 ? a + TAU : a), a1 = nA(Math.atan2(T[1] - P[1], T[0] - P[0])), a2 = nA(Math.atan2(firstR[1] - P[1], firstR[0] - P[0])), deg = Math.round(Math.abs(a1 - Math.PI) * 180 / Math.PI);
          Q41.line(ctx, [[P[0] - 120, P[1]], [P[0], P[1]]], '#0f172a', 1.3, [4, 4]); Q47.arc(ctx, P[0], P[1], 50, Math.PI, a1, '#dc2626', 'i', 64); Q47.arc(ctx, P[0], P[1], 36, Math.PI, a2, '#0f766e', 'r', 50);
          Q42.T(ctx, 'i = r = ' + deg + '°', P[0] - 172, P[1], { s: 12, w: 900, c: '#fff', bg: '#0f766e' }); }
        Q47.dim(ctx, ox, g.mx, g.ty + 34, 'u = ' + Q47.n(u, 0) + ' cm', '#b45309'); Q47.dim(ctx, g.mx, ix, g.ty + 34, 'v = ' + Q47.n(u, 0) + ' cm', '#7c3aed');
        Q42.card(ctx, S, [{ t: 'u = ' + Q47.n(u, 0) + ' cm ⟸ v = ' + Q47.n(u, 0) + ' cm', mono: 1 }, { t: 'خيالية: لا تستلم على حاجز', c: '#7c3aed', w: 900 }, { t: 'معتدلة ومساوية للجسم', c: '#0f766e', w: 900 }, { t: 'معكوسة الجوانب', c: '#b45309', w: 900 }], { title: 'صفات الصورة', y: 70, wd: 300 });
      }
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, md === 'bfly' ? 'اسحب الفراشة ثم اضغط «حل سؤال فكر»' : md === 'pt' ? 'اسحب المصدر النقطي O' : 'اسحب الشمعة والعين');
    },
    chips(S, g) { return Q42.chips(S, 'md', [['cand', 'الشمعة والعين'], ['pt', 'مصدر نقطي 5-7'], ['bfly', 'فكر: الفراشة']], g.h - 84, S.md, (S2, k) => { S2.md = k; S2.k = 0; S2.ex2 = 0; }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), ox = g.mx - S.u * g.px, oy = S.md === 'pt' ? g.ty - 150 : S.md === 'bfly' ? g.ty - 120 : g.ty - 60;
      const L = [{ id: 'obj', x: S.md === 'bfly' ? ox - 20 : ox, y: oy, r: 30, axis: 'x', keep: true, tip: 'اسحب نحو المرآة أو بعيداً عنها', idle: 'اسحب ✋', drag: (S2, d) => { S2.uT = clamp(Math.round((g.mx - d.x - (S2.md === 'bfly' ? 20 : 0)) / g.px), 8, 80); S2.ex2 = 0; } }];
      if (S.md === 'cand') L.push({ id: 'eye', x: S.ex, y: S.ey, r: 26, axis: 'xy', keep: true, hint: false, tip: 'اسحب العين', drag: (S2, d) => { S2.ex = clamp(d.x, g.L + 30, g.mx - 40); S2.ey = clamp(d.y, g.top - 20, g.ty - 20); } });
      if (S.md === 'bfly') L.push.apply(L, Q41.stepChips(S, 'st', g.h - 128, g.L, 'حل سؤال فكر', S2 => { S2.uT = 50; S2.ex2 = 1; }));
      return L.concat(D.chips(S, g)); },
    readings(S) { return [rd('بعد الجسم u', Q47.n(S.u, 0) + ' cm'), rd('بعد الصورة v', Q47.n(S.u, 0) + ' cm'), rd('المسافة بين الجسم وصورته', Q47.n(2 * S.u, 0) + ' cm'), rd('نوع الصورة', 'خيالية معتدلة مساوية')]; },
    record(S) { return { u: Math.round(S.u), v: Math.round(S.u) }; }, cols: [['u', 'u (cm)'], ['v', 'v (cm)']],
    explain(S) { return Q26.ex('الصورة تقع خلف المرآة على البعد نفسه، وتتحرك معك إذا اقتربت أو ابتعدت، ولا تظهر على حاجز.', 'كل شعاع ينعكس بزاوية تساوي زاوية سقوطه، فتخرج الأشعة المنعكسة متفرقة لكن امتداداتها تلتقي في نقطة واحدة خلف المرآة؛ لذلك تكون الصورة خيالية.', 'المرآة الجيدة: زجاج مصقول جيداً مطلي من الخلف بالفضة أو الألمنيوم، ويعتمد وضوحها على نوعية الزجاج ودرجة صقله.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — انعكاس الجوانب: اليد اليمنى، كلمة إسعاف، الرقم 81 (س3)، الساعة (س4) (الشكلان 3-7 و 4-7) =============== */
(() => {
  const ST = { n81: { title: 'س3 ص 131', q: 'وقف أحمد أمام مرآة مستوية مرتدياً قميصاً كتب عليه الرقم 81. ماذا تقرأ صورة الرقم؟', lines: ['المرآة المستوية تعكس الجوانب: اليمين يصبح يساراً', 'يظهر الرقم 1 في اليسار ثم الرقم 8 وكلاهما معكوس جانبياً', 'تُقرأ الصورة 18'] },
    clk: { title: 'س4 ص 131', q: 'الشكل يمثل صورة ساعة أمام مرآة مستوية. ما الوقت الذي تشير إليه الساعة؟', lines: ['الصورة في المرآة تشير إلى 4:50', 'المرآة تعكس الجوانب', 'الوقت الحقيقي = 12:00 − وقت الصورة', '12:00 − 4:50 = 7:10', 'الساعة تشير إلى 7:10'] } };
  const person = (ctx, x, yb, s, rR, rL, col) => K.raw(ctx, () => { ctx.save(); ctx.translate(x, yb); ctx.scale(s, s);
    ctx.fillStyle = '#1e3a8a'; ctx.fillRect(-22, -95, 18, 95); ctx.fillRect(4, -95, 18, 95); ctx.fillStyle = '#111827'; rr(ctx, -26, -8, 24, 10, 4); ctx.fill(); rr(ctx, 2, -8, 24, 10, 4); ctx.fill();
    const g = ctx.createLinearGradient(-30, 0, 30, 0); g.addColorStop(0, shade(col, -20)); g.addColorStop(.5, col); g.addColorStop(1, shade(col, -30)); ctx.fillStyle = g; rr(ctx, -30, -190, 60, 100, 12); ctx.fill();
    // arms: right arm of the person is on the viewer's left (-x)
    [[-1, rR, '#dc2626'], [1, rL, '#fde7d4']].forEach(q => { const sx = q[0] * 30, sy = -180, a = Math.PI / 2 - q[0] * (.25 + q[1] * 2.6) * -1, ang = q[0] < 0 ? Math.PI / 2 + .25 + q[1] * 2.55 : Math.PI / 2 - .25 - q[1] * 2.55; void a;
      const ex = sx + Math.cos(ang) * 78, ey = sy + Math.sin(ang) * 78; ctx.strokeStyle = col; ctx.lineWidth = 15; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke(); ctx.fillStyle = q[2]; ctx.beginPath(); ctx.arc(ex + Math.cos(ang) * 6, ey + Math.sin(ang) * 6, 10, 0, TAU); ctx.fill(); });
    ctx.fillStyle = '#fde7d4'; ctx.beginPath(); ctx.arc(0, -218, 26, 0, TAU); ctx.fill(); ctx.fillStyle = '#3f2a1d'; ctx.beginPath(); ctx.arc(0, -226, 27, Math.PI * 1.02, Math.PI * 1.98); ctx.fill(); ctx.fillRect(-27, -228, 9, 18);
    ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(-9, -218, 3, 0, TAU); ctx.arc(9, -218, 3, 0, TAU); ctx.fill(); ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, -210, 9, .3, Math.PI - .3); ctx.stroke(); ctx.restore(); });
  const clock = (ctx, x, y, r, mins, mir) => K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); if (mir) ctx.scale(-1, 1); ctx.fillStyle = 'rgba(15,23,42,.25)'; ctx.beginPath(); ctx.arc(-6, 8, r + 6, 0, TAU); ctx.fill();
    ctx.fillStyle = '#c2410c'; ctx.beginPath(); ctx.arc(0, 0, r + 8, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#0f172a';
    for (let k = 0; k < 12; k++) { const a = k * TAU / 12; ctx.lineWidth = k % 3 ? 4 : 6; ctx.beginPath(); ctx.moveTo(Math.sin(a) * r * .78, -Math.cos(a) * r * .78); ctx.lineTo(Math.sin(a) * r * .93, -Math.cos(a) * r * .93); ctx.stroke(); }
    const am = mins % 60 / 60 * TAU, ah = (mins / 60 % 12) / 12 * TAU; ctx.lineCap = 'round'; ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.sin(ah) * r * .5, -Math.cos(ah) * r * .5); ctx.stroke();
    ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.sin(am) * r * .8, -Math.cos(am) * r * .8); ctx.stroke(); ctx.fillStyle = '#c2410c'; ctx.beginPath(); ctx.arc(0, 0, 7, 0, TAU); ctx.fill(); ctx.restore(); });
  const hm = m => { m = ((Math.round(m) % 720) + 720) % 720; const H = Math.floor(m / 60) || 12, M = m % 60; return H + ':' + (M < 10 ? '0' : '') + M; };
  const D = { id: 'g10_mr_lateral', page: 115, fig: 'الشكلان 3-7 و 4-7 + س3 و س4 ص 131',
    desc: 'إذا حركت يدك اليمنى أمام المرآة المستوية ترى أن اليد اليسرى للصورة هي التي تتحرك، أي أن الصورة معكوسة الجوانب. وإذا وضعت كتابة أمام المرآة تجدها معكوسة في الصورة؛ لذلك تكتب كلمة إسعاف معكوسة على مقدمة سيارات الإسعاف ليقرأها سائق السيارة التي أمامها معتدلة في مرآته.',
    tags: 'انعكاس الجوانب معكوسة الجوانب اليد اليمنى اليسرى كلمة إسعاف سيارة الإسعاف مرآة السيارة الرقم 81 18 الساعة 7:10 4:50',
    tools: ['مرآة مستوية', 'سيارة إسعاف ومرآة سائق', 'قميص عليه رقم', 'ساعة'],
    steps: ['اضغط على يد الشخص لترفع اليمنى أو اليسرى: في الصورة ترتفع اليد المقابلة.', 'اختر «كلمة إسعاف»: لاحظ كيف تظهر الكتابة المعكوسة معتدلة في مرآة السائق، ثم ألغِ «الكتابة معكوسة على السيارة».', 'اختر «س3» وحل سؤال الرقم 81.', 'اختر «س4»: اسحب عقرب الدقائق الأحمر في صورة الساعة وراقب الوقت الحقيقي، ثم حل السؤال خطوة خطوة.'],
    concl: ['صورة المرآة المستوية معكوسة الجوانب: اليمين يظهر يساراً.', 'تكتب كلمة إسعاف معكوسة على مقدمة السيارة لتظهر معتدلة في مرآة السائق.', 'س3: صورة الرقم 81 تُقرأ 18.', 'س4: الوقت الحقيقي = 12:00 − وقت الصورة ، فالساعة تشير إلى 7:10.'],
    laws: ['g10_mr_plane'],
    controls: [TG('rev', 'الكتابة معكوسة على السيارة', true, null, 'flip'), TG('lab', 'التسميات', true, null, 'labels')],
    setup(S) { S.md = 'hand'; S.rR = 1; S.rL = 0; S.aR = 1; S.aL = 0; S.mi = 290; S.k = 0; S.ex = 0; S.tt = 0; S.m60 = 50; },
    update(S, dt) { S.tt += dt; const k = Math.min(1, dt * 6); S.aR += (S.rR - S.aR) * k; S.aL += (S.rL - S.aL) * k; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), mx = Math.round(L + (w - L) * (S.md === 'n81' || S.md === 'clk' ? .32 : .5)); return { w, h, L, mx, fy: Math.round(h * .66) }; },
    draw(ctx, w, h, S) { const g = D.geo(S), md = S.md, lab = S.p.lab !== false; Q47.bg(ctx, w, h);
      if (md === 'hand' || md === 'n81') { const top = g.fy - 330, s = md === 'n81' ? .95 : 1, x1 = md === 'n81' ? g.mx - 120 : g.mx - 170, x2 = 2 * g.mx - x1;
        K.raw(ctx, () => { ctx.fillStyle = '#e0f2fe'; ctx.fillRect(g.mx, top, (md === 'n81' ? 250 : w - g.mx - 20), g.fy - top); ctx.fillStyle = '#cbd5e1'; ctx.fillRect(g.L, g.fy, w - g.L - 12, 8); });
        Q47.seg(ctx, [g.mx, top], [g.mx, g.fy], [-1, 0], { th: 7 });
        person(ctx, x1, g.fy, s, S.aR, S.aL, md === 'n81' ? '#16a34a' : '#0ea5e9');
        K.raw(ctx, () => { ctx.save(); ctx.translate(x2, 0); ctx.scale(-1, 1); ctx.globalAlpha = .75; ctx.translate(-x2, 0); person(ctx, x2, g.fy, s, S.aR, S.aL, md === 'n81' ? '#16a34a' : '#0ea5e9'); ctx.restore(); });
        if (md === 'n81') { G.text(ctx, '81', x1, g.fy - 150 * s, { s: 34, w: 900, c: '#fff', raw: 1 }); K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = .9; ctx.restore(); }); Q47.mtext(ctx, '81', x2, g.fy - 150 * s, { s: 34, w: 900, c: '#fff' });
          Q42.T(ctx, 'أحمد', x1, g.fy + 26, { s: 13, w: 900, c: '#0f172a' }); Q42.T(ctx, 'صورته', x2, g.fy + 26, { s: 13, w: 900, c: '#7c3aed' });
          const C = Q41.stepChips(S, 'st', h - 128, g.L); Q42.drawChips(ctx, C); Q47.stepsCard(ctx, S, Object.assign({}, ST.n81, { k: S.ex ? S.k : 0 })); }
        else if (lab) { Q42.T(ctx, S.rR ? 'يرفع يده اليمنى' : S.rL ? 'يرفع يده اليسرى' : 'اضغط على يد', x1, g.fy + 26, { s: 13, w: 900, c: '#0f172a' }); Q42.T(ctx, S.rR ? 'الصورة ترفع يدها اليسرى' : S.rL ? 'الصورة ترفع يدها اليمنى' : 'الصورة', x2, g.fy + 26, { s: 13, w: 900, c: '#7c3aed' }); Q42.T(ctx, 'معكوسة الجوانب', g.mx, g.fy + 56, { s: 13, w: 900, c: '#fff', bg: '#b45309' }); }
      } else if (md === 'amb') { const ax = g.L + 170, ay = g.fy - 170, rv = S.p.rev !== false, sc = .85 + .15 * (1 + Math.sin(S.tt * .8)) / 2;
        // ambulance front
        const amb = (x, y, s, readable) => { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; rr(ctx, -110, -110, 220, 190, 18); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#93c5fd'; rr(ctx, -92, -92, 184, 70, 10); ctx.fill(); ctx.fillStyle = '#dc2626'; ctx.fillRect(-110, 0, 220, 14); ctx.fillStyle = '#ef4444'; rr(ctx, -40, -128, 80, 18, 6); ctx.fill();
            ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(-78, 48, 14, 0, TAU); ctx.arc(78, 48, 14, 0, TAU); ctx.fill(); ctx.fillStyle = '#1f2937'; ctx.fillRect(-100, 80, 40, 22); ctx.fillRect(60, 80, 40, 22); ctx.restore(); });
          if (readable) Q42.T(ctx, 'إسعاف', x, y + 36 * s - 4, { s: 30 * s, w: 900, c: '#dc2626' }); else Q47.mtext(ctx, 'إسعاف', x, y + 36 * s - 4, { s: 30 * s, w: 900, c: '#dc2626' }); };
        amb(ax, ay, 1, !rv); Q42.T(ctx, rv ? 'مكتوبة معكوسة على السيارة' : 'مكتوبة بشكل عادي', ax, ay + 130, { s: 12, w: 900, c: '#fff', bg: '#334155' });
        // the driver mirror
        const mx = g.L + 520, my = g.fy - 210; K.raw(ctx, () => { ctx.fillStyle = '#1f2937'; rr(ctx, mx - 140, my - 82, 280, 164, 22); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.fillRect(mx - 8, my - 120, 16, 40); ctx.save(); rr(ctx, mx - 128, my - 70, 256, 140, 16); ctx.clip(); const gg = ctx.createLinearGradient(0, my - 70, 0, my + 70); gg.addColorStop(0, '#e0f2fe'); gg.addColorStop(1, '#94a3b8'); ctx.fillStyle = gg; ctx.fillRect(mx - 130, my - 72, 260, 144); ctx.restore(); });
        K.raw(ctx, () => { ctx.save(); rr(ctx, mx - 128, my - 70, 256, 140, 16); ctx.clip(); ctx.translate(mx, my + 8); ctx.scale(-1, 1); ctx.translate(-mx, -(my + 8)); amb(mx, my + 8, .5 * sc, !rv); ctx.restore(); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.beginPath(); ctx.moveTo(mx - 120, my - 66); ctx.lineTo(mx - 60, my - 66); ctx.lineTo(mx - 120, my + 10); ctx.fill(); });
        Q42.T(ctx, 'مرآة السائق الذي أمامها', mx, my + 104, { s: 12, w: 900, c: '#fff', bg: '#0891b2' });
        Q42.T(ctx, rv ? 'يقرؤها السائق معتدلة: إسعاف ✓' : 'تظهر في المرآة معكوسة ✗', mx, my + 134, { s: 13, w: 900, c: '#fff', bg: rv ? '#16a34a' : '#dc2626' });
      } else if (md === 'clk') { const cy = g.fy - 170, r = 82, x1 = g.mx - 120, x2 = g.mx + 120;
        K.raw(ctx, () => { ctx.fillStyle = '#e0f2fe'; ctx.fillRect(g.mx, cy - 140, 230, 280); });
        Q47.seg(ctx, [g.mx, cy - 140], [g.mx, cy + 140], [-1, 0], { th: 7 });
        const real = 720 - S.mi; clock(ctx, x1, cy, r, real, false); clock(ctx, x2, cy, r, real, true);
        Q42.T(ctx, 'الساعة الحقيقية', x1, cy + r + 34, { s: 13, w: 900, c: '#0f172a' }); Q42.T(ctx, 'صورتها في المرآة', x2, cy + r + 34, { s: 13, w: 900, c: '#7c3aed' });
        if (lab) { Q42.T(ctx, hm(real), x1, cy + r + 62, { s: 16, w: 900, c: '#fff', bg: '#0f766e', mono: 1 }); Q42.T(ctx, hm(S.mi), x2, cy + r + 62, { s: 16, w: 900, c: '#fff', bg: '#7c3aed', mono: 1 }); }
        const C = Q41.stepChips(S, 'st', h - 128, g.L, 'حل س4', S2 => { S2.mi = 290; }); Q42.drawChips(ctx, C); Q47.stepsCard(ctx, S, Object.assign({}, ST.clk, { k: S.ex ? S.k : 0 }));
      }
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, md === 'hand' ? 'اضغط على يد الشخص لترفعها' : md === 'amb' ? 'غيّر طريقة الكتابة من لوحة التحكم' : md === 'clk' ? 'اسحب عقرب الدقائق في صورة الساعة' : 'اقرأ الرقم في الصورة ثم حل السؤال');
    },
    chips(S, g) { return Q42.chips(S, 'md', [['hand', 'اليد اليمنى'], ['amb', 'كلمة إسعاف'], ['n81', 'س3: الرقم 81'], ['clk', 'س4: الساعة']], g.h - 84, S.md, (S2, k) => { S2.md = k; S2.k = 0; S2.ex = 0; }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = [];
      if (S.md === 'hand') { const x1 = g.mx - 170; L.push({ id: 'rh', x: x1 - 50, y: g.fy - 200, r: 34, axis: 'none', keep: true, tip: 'ارفع اليد اليمنى', idle: 'اضغط ✋', click: S2 => { S2.rR = S2.rR ? 0 : 1; S2.rL = 0; } }, { id: 'lh', x: x1 + 50, y: g.fy - 200, r: 34, axis: 'none', hint: false, tip: 'ارفع اليد اليسرى', click: S2 => { S2.rL = S2.rL ? 0 : 1; S2.rR = 0; } }); }
      if (S.md === 'clk') { const cy = g.fy - 170, x2 = g.mx + 120, am = (S.mi % 60) / 60 * TAU; L.push({ id: 'hand', x: x2 - Math.sin(am) * 60, y: cy - Math.cos(am) * 60, r: 22, axis: 'xy', keep: true, tip: 'أدر عقرب الدقائق', idle: 'أدر العقرب ✋', drag: (S2, d) => { const a = Math.atan2(-(d.x - x2), -(d.y - cy)); let m = ((a / TAU * 60) % 60 + 60) % 60; let dm = m - S2.m60; if (dm > 30) dm -= 60; if (dm < -30) dm += 60; S2.m60 = m; S2.mi = ((S2.mi + dm) % 720 + 720) % 720; S2.ex = 0; }, down: S2 => { S2.m60 = S2.mi % 60; } }); L.push.apply(L, Q41.stepChips(S, 'st', g.h - 128, g.L, 'حل س4', S2 => { S2.mi = 290; })); }
      if (S.md === 'n81') { L.push({ id: 'ahmad', x: g.mx - 120, y: g.fy - 150, r: 50, axis: 'none', keep: true, tip: 'اضغط ليرفع أحمد يده اليمنى', idle: 'اضغط ✋', click: S2 => { S2.rR = S2.rR ? 0 : 1; S2.rL = 0; } }); L.push.apply(L, Q41.stepChips(S, 'st', g.h - 128, g.L)); }
      if (S.md === 'amb') L.push({ id: 'amb', x: g.L + 170, y: g.fy - 170, w: 220, h: 190, axis: 'none', keep: true, tip: 'اضغط لتغيير طريقة الكتابة', idle: 'اضغط ✋', click: S2 => setParam(S2, 'rev', S2.p.rev === false) });
      return L.concat(D.chips(S, g)); },
    readings(S) { if (S.md === 'clk') return [rd('وقت الصورة', hm(S.mi)), rd('الوقت الحقيقي', hm(720 - S.mi))]; if (S.md === 'n81') return [rd('الرقم على القميص', '81'), rd('يُقرأ في الصورة', '18')]; return [rd('نوع الصورة', 'خيالية معتدلة'), rd('الجوانب', 'معكوسة: اليمين ⟵ يسار')]; },
    explain(S) { return Q26.ex('اليد اليمنى تظهر يداً يسرى في الصورة، والكتابة تنقلب يميناً ويساراً، أما الأعلى والأسفل فلا ينقلبان.', 'كل نقطة تظهر خلف المرآة مقابل نفسها تماماً وعلى البعد نفسه، فتنعكس النقاط التي تختلف في بعدها عن المرآة (الأمام والخلف) فنرى الجوانب معكوسة.', 'تكتب كلمة إسعاف معكوسة على مقدمة سيارة الإسعاف ليقرأها السائق في مرآته معتدلة فيفسح لها الطريق.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — تعدد الصور في المرايا المتزاوية (7-3، النشاط 1، الشكل 6-7، مثال 24° + م2 120°) =============== */
(() => {
  const EX = { e24: { title: 'مثال ص 117', q: 'وضع جسم بين مرآتين مستويتين الزاوية بينهما 24°. ما عدد الصور المتكونة للجسم؟', lines: ['n = 360° / θ − 1', 'n = 360 / 24 − 1', 'n = 15 − 1', 'عدد الصور n = 14'], th: 24 },
    e120: { title: 'م2 ص 132', q: 'مرآتان مستويتان الزاوية بينهما 120°. احسب عدد الصور المتكونة فيهما', lines: ['n = 360° / θ − 1', 'n = 360 / 120 − 1', 'n = 3 − 1', 'عدد الصور n = 2'], th: 120 } };
  const EPS = 1e-9, mod = a => ((a % TAU) + TAU) % TAU;
  /* angles measured from mirror 1 towards mirror 2 (wedge = 0..th) */
  const front = (a, m, th) => { a = mod(a); if (m === 1) return a > EPS && a < Math.PI - EPS; const b = mod(a - (th - Math.PI)); return b > EPS && b < Math.PI - EPS; };
  const images = (phi, th) => { const out = []; [1, 2].forEach(st => { let src = phi, m = st, seq = []; for (let k = 0; k < 60; k++) { if (!front(src, m, th)) break; const nw = m === 1 ? -src : 2 * th - src; seq = seq.concat([m]); if (!out.some(o => Math.abs(mod(o.a - nw + 1e-7) - 1e-7) < 1e-6)) out.push({ a: nw, seq: seq.slice() }); src = nw; m = 3 - m; } }); return out; };
  const D = { id: 'g10_mr_angle', page: 116, fig: 'النشاط 1 + الشكل 6-7 + مثال ص 117',
    desc: 'نثبت مرآتين مستويتين على سطح أفقي بحيث يكون سطحاهما العاكسان متزاويين، ونضع شمعة متقدة بينهما ونعد الصور عند الزوايا 90° و 60° و 30°. عدد الصور يتغير بتغير الزاوية بين المرآتين حسب العلاقة n = 360°/θ − 1. والمرآتان المتقابلتان (المتوازيتان) في صالون الحلاقة تكوّنان صوراً لا نهاية لها.',
    tags: 'المرايا المتزاوية تعدد الصور n=360/θ-1 نشاط 1 شمعة منقلة 90 60 30 24 14 صورة 120 صورتان مرآتان متوازيتان صالون الحلاقة لا نهائية',
    tools: ['مرآتان مستويتان', 'شمعة متقدة', 'منقلة'],
    steps: ['اسحب المقبض الأزرق عند طرف المرآة الثانية (أو منزلق الزاوية) لتغيير الزاوية θ ، وعدّ صور الشمعة.', 'جرب الزوايا 90° و 60° و 30° من الأزرار وسجل عدد الصور في كل مرة.', 'اضغط على أي صورة لترى مسار الشعاع الذي يصل منها إلى العين، واسحب العين لترى أي الصور تراها.', 'حل المثال (24°) والمسألة 2 (120°)، ثم اختر «متوازيتان» لترى الصور اللانهائية.'],
    concl: ['عدد الصور n = 360°/θ − 1 (حين يكون 360/θ عدداً صحيحاً والشمعة في المنتصف).', '90° ⟸ 3 صور ، 60° ⟸ 5 صور ، 30° ⟸ 11 صورة.', 'المثال: θ = 24° ⟸ n = 14 صورة. المسألة 2: θ = 120° ⟸ n = 2.', 'المرآتان المتوازيتان تكوّنان عدداً لا نهائياً من الصور.'],
    laws: ['g10_mr_n'],
    controls: [R('th', 'الزاوية بين المرآتين θ', 20, 180, 90, 1, '°'), TG('ext', 'امتدادات المرآتين', true, null, 'ray'), TG('num', 'ترقيم الصور', true, null, 'labels'), TG('path', 'مسار الشعاع إلى العين', true, null, 'ray')],
    setup(S) { S.thv = S.p.th || 90; S.par = 0; S.rho = 110; S.fr = .5; S.sel = -1; S.ex = ''; S.k = 0; S.tt = 0; S.eo = null; },
    update(S, dt) { S.tt += dt; S.thv += ((S.p.th || 90) - S.thv) * Math.min(1, dt * 7); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), hx = Math.round(L + (w - 340 - L) / 2 + 30), hy = Math.round(h * .55), Lm = 200; return { w, h, L, hx, hy, Lm }; },
    eye(S, g) { return S.eo ? [g.hx + S.eo[0], g.hy + S.eo[1]] : [g.hx, g.hy - 255]; },
    model(S, g) { const th = S.thv * Math.PI / 180, a1 = -Math.PI / 2 - th / 2, P = a => [g.hx + Math.cos(a1 + a) * S.rho, g.hy + Math.sin(a1 + a) * S.rho], phi = th * S.fr;
      const m1 = [[g.hx, g.hy], [g.hx + Math.cos(a1) * g.Lm, g.hy + Math.sin(a1) * g.Lm]], m2 = [[g.hx, g.hy], [g.hx + Math.cos(a1 + th) * g.Lm, g.hy + Math.sin(a1 + th) * g.Lm]];
      const IM = images(phi, th).map(o => Object.assign(o, { p: P(o.a) })); const O = P(phi), E = D.eye(S, g);
      IM.forEach(o => { // ray path from the object to the eye through the reflections in o.seq
        // explicit construction
        const imgs = [O]; let src = phi; o.seq.forEach(m => { src = m === 1 ? -src : 2 * th - src; imgs.push(P(src)); });
        let A = E, path = [E], valid = true; for (let i = o.seq.length - 1; i >= 0 && valid; i--) { const m = o.seq[i] === 1 ? m1 : m2, B = imgs[i + 1], r = Q26.seg(A, [B[0] - A[0], B[1] - A[1]], m[0], m[1]); if (!r || r.t >= 1 || r.u < .01) { valid = false; break; } path.push(r.pt); A = r.pt; }
        if (valid) { path.push(O); o.path = path.reverse(); } else o.path = null; });
      return { th, a1, m1, m2, IM, O, E, phi }; },
    draw(ctx, w, h, S) { const g = D.geo(S); Q47.bg(ctx, w, h);
      if (S.par) D.drawPar(ctx, w, h, S, g);
      else { const M = D.model(S, g), num = S.p.num !== false;
        K.raw(ctx, () => { ctx.fillStyle = 'rgba(203,213,225,.35)'; ctx.beginPath(); ctx.arc(g.hx, g.hy, S.rho, 0, TAU); ctx.fill(); ctx.setLineDash([3, 5]); ctx.strokeStyle = 'rgba(100,116,139,.6)'; ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]); });
        if (S.p.ext !== false) [M.m1, M.m2].forEach(m => Q41.line(ctx, [m[0], [2 * m[0][0] - m[1][0], 2 * m[0][1] - m[1][1]]], '#94a3b8', 1.4, [6, 6]));
        // protractor arc
        K.raw(ctx, () => { ctx.strokeStyle = '#0891b2'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(g.hx, g.hy, 44, M.a1, M.a1 + M.th); ctx.stroke(); });
        const n1 = [Math.cos(M.a1 + Math.PI / 2), Math.sin(M.a1 + Math.PI / 2)], n2 = [Math.cos(M.a1 + M.th - Math.PI / 2), Math.sin(M.a1 + M.th - Math.PI / 2)];
        // selected path
        const sel = M.IM[S.sel]; if (sel && S.p.path !== false) { if (sel.path) { Q47.ray(ctx, sel.path, '#dc2626'); Q47.ray(ctx, [sel.path[sel.path.length - 2], sel.p], '#dc2626', { dash: [6, 5], arrows: false, alpha: .7 }); }  }
        M.IM.forEach((o, i) => { const vis = !!o.path; K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = (vis ? .75 : .3) * Math.max(.45, 1 - o.seq.length * .1); const gg = ctx.createRadialGradient(o.p[0], o.p[1], 1, o.p[0], o.p[1], 26); gg.addColorStop(0, 'rgba(254,215,170,.95)'); gg.addColorStop(1, 'rgba(254,215,170,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(o.p[0], o.p[1], 26, 0, TAU); ctx.fill(); ctx.fillStyle = '#fde68a'; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(o.p[0], o.p[1], 9, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.arc(o.p[0], o.p[1], 4, 0, TAU); ctx.fill(); if (S.sel === i) { ctx.globalAlpha = 1; ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(o.p[0], o.p[1], 15, 0, TAU); ctx.stroke(); } ctx.restore(); });
          if (num) Q42.T(ctx, String(i + 1), o.p[0] + 16, o.p[1] - 14, { s: 11, w: 900, c: '#fff', bg: vis ? '#7c3aed' : '#94a3b8' }); });
        Q47.seg(ctx, M.m1[0], M.m1[1], n1, { th: 7 }); Q47.seg(ctx, M.m2[0], M.m2[1], n2, { th: 7 });
        Q41.knob(ctx, M.m2[1][0], M.m2[1][1], '#2563eb', 11);
        // the candle (top view)
        K.raw(ctx, () => { const o = M.O, gg = ctx.createRadialGradient(o[0], o[1], 1, o[0], o[1], 34); gg.addColorStop(0, 'rgba(254,215,170,1)'); gg.addColorStop(1, 'rgba(254,215,170,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(o[0], o[1], 34, 0, TAU); ctx.fill(); ctx.fillStyle = '#fef3c7'; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(o[0], o[1], 11, 0, TAU); ctx.fill(); ctx.stroke(); const f = 1 + .15 * Math.sin(S.tt * 12); ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.arc(o[0], o[1], 5 * f, 0, TAU); ctx.fill(); ctx.fillStyle = '#fef08a'; ctx.beginPath(); ctx.arc(o[0], o[1], 2.4 * f, 0, TAU); ctx.fill(); });
        Q47.eye(ctx, M.E[0], M.E[1], Math.atan2(g.hy - 60 - M.E[1], g.hx - M.E[0]), 1);
        const nf = 360 / S.thv - 1, vis = M.IM.filter(o => o.path).length, intg = Math.abs(360 / Math.round(S.thv) - Math.round(360 / Math.round(S.thv))) < 1e-9;
        if (S.ex) Q47.stepsCard(ctx, S, Object.assign({}, EX[S.ex], { k: S.k }));
        else Q42.card(ctx, S, [{ t: 'n = 360 / ' + Math.round(S.thv) + ' − 1 = ' + Q47.n(360 / Math.round(S.thv) - 1, 2), mono: 1 }, intg ? { t: 'القانون ينطبق: 360/θ عدد صحيح', c: '#16a34a', w: 900, s: 11.5 } : { t: 'القانون للزوايا التي تقسم 360° بلا باقٍ', c: '#b45309', w: 800, s: 11.5 }, { t: 'الصور المرسومة: ' + M.IM.length, c: '#7c3aed', w: 900 }, { t: 'تراها العين من موضعها: ' + vis, c: '#0f766e', w: 900 }].concat(sel && !sel.path ? [{ t: 'الصورة ' + (S.sel + 1) + ' لا يصل منها شعاع إلى العين', c: '#dc2626', w: 900 }] : []), { title: 'عدد الصور عند θ = ' + Math.round(S.thv) + '°', y: 70, wd: 310 }); void nf;
      }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a); Q42.drawChips(ctx, C.b);
      Q42.banner(ctx, w, S.par ? 'مرآتان متقابلتان: صور لا نهائية' : 'غيّر الزاوية، اسحب الشمعة، واضغط على صورة');
    },
    drawPar(ctx, w, h, S, g) { const y0 = g.hy - 150, y1 = g.hy + 30, mid = Math.round((g.L + w) / 2), a = mid - 50, b = mid + 50, cx = a + 100 * S.fr;
      K.raw(ctx, () => { ctx.fillStyle = '#e0f2fe'; ctx.fillRect(g.L, y0, w - g.L - 12, y1 - y0); });
      const xs = []; [[a, b], [b, a]].forEach(q => { let x = cx, m1 = q[0], m2 = q[1]; for (let k = 1; k < 14; k++) { x = 2 * m1 - x; xs.push([x, k]); const t = m1; m1 = m2; m2 = t; } });
      xs.forEach(q => { if (q[0] > g.L + 10 && q[0] < w - 20) Q47.cand(ctx, q[0], y1, 70, S.tt + q[1], { a: .7 * Math.pow(.74, q[1]), sx: q[1] % 2 ? -1 : 1 }); }); Q42.T(ctx, '← ∞', g.L + 40, y1 - 120, { s: 16, w: 900, c: '#7c3aed' }); Q42.T(ctx, '∞ →', w - 50, y1 - 120, { s: 16, w: 900, c: '#7c3aed' });
      Q47.seg(ctx, [a, y0], [a, y1], [1, 0], { th: 7 }); Q47.seg(ctx, [b, y0], [b, y1], [-1, 0], { th: 7 }); Q47.cand(ctx, cx, y1, 70, S.tt);
      Q47.table(ctx, g.L + 10, w - 20, y1);
      Q42.T(ctx, 'صالون الحلاقة: مرآة أمامك وأخرى خلفك', mid, y0 - 30, { s: 13, w: 900, c: '#fff', bg: '#0891b2' });
      Q42.card(ctx, S, [{ t: 'θ = 0° ⟸ n = ∞', mono: 1 }, { t: 'كل صورة تصبح جسماً للمرآة الأخرى', c: '#0f766e', w: 800 }, { t: 'الصور تبهت لأن المرآة تمتص جزءاً من الضوء', c: '#b45309', w: 800 }], { title: 'مرآتان متوازيتان', y: 70, wd: 300 }); },
    chips(S, g) { const th = S.par ? 'par' : String(Math.round(S.p.th || 90)); const a = Q42.chips(S, 'th', [['90', '90°'], ['60', '60°'], ['30', '30°'], ['24', '24°'], ['120', '120°'], ['par', 'متوازيتان']], g.h - 84, th, (S2, k) => { S2.sel = -1; if (k === 'par') { S2.par = 1; return; } S2.par = 0; S2.fr = .5; setParam(S2, 'th', +k); }, { bw: 110 });
      const b = Q42.chips(S, 'ex', [['e24', 'مثال: 24°'], ['e120', 'مسألة 2'], ['nx', '⬇ الخطوة التالية']], g.h - 128, S.ex, (S2, k) => { if (k === 'nx') { if (!S2.ex) { S2.ex = 'e24'; S2.k = 0; } S2.k = Math.min(S2.k + 1, EX[S2.ex].lines.length); return; } S2.ex = S2.ex === k ? '' : k; S2.k = 0; S2.par = 0; S2.fr = .5; S2.sel = -1; setParam(S2, 'th', EX[k].th); }, { bw: 160 });
      return { a, b }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), L = [];
      if (!S.par) { const M = D.model(S, g);
        L.push({ id: 'cand', x: M.O[0], y: M.O[1], r: 22, axis: 'xy', keep: true, tip: 'اسحب الشمعة بين المرآتين', idle: 'اسحب ✋', drag: (S2, d) => { const dx = d.x - g.hx, dy = d.y - g.hy; S2.rho = clamp(Math.hypot(dx, dy), 50, g.Lm * .85); let a = Math.atan2(dy, dx) - M.a1; a = mod(a); if (a > Math.PI * 1.5) a -= TAU; S2.fr = clamp(a / M.th, .06, .94); S2.sel = -1; } });
        L.push({ id: 'm2', x: M.m2[1][0], y: M.m2[1][1], r: 20, axis: 'xy', keep: true, hint: false, tip: 'أدر المرآة الثانية لتغيير الزاوية', drag: (S2, d) => { let a = Math.atan2(d.y - g.hy, d.x - g.hx) - M.a1; a = mod(a); if (a > Math.PI * 1.6) a = 0; setParam(S2, 'th', clamp(Math.round(a * 180 / Math.PI), 20, 180)); S2.ex = ''; } });
        L.push({ id: 'eye', x: M.E[0], y: M.E[1], r: 24, axis: 'xy', keep: true, hint: false, tip: 'اسحب العين', drag: (S2, d) => { S2.eo = [clamp(d.x, g.L + 20, g.w - 30) - g.hx, clamp(d.y, 60, g.h - 160) - g.hy]; } });
        M.IM.forEach((o, i) => L.push({ id: 'im' + i, x: o.p[0], y: o.p[1], r: 15, axis: 'none', hint: false, tip: 'اضغط لترى مسار الشعاع', click: S2 => { S2.sel = S2.sel === i ? -1 : i; } })); }
      else { const mid = Math.round((g.L + g.w) / 2); L.push({ id: 'cand', x: mid - 50 + 100 * S.fr, y: g.hy - 10, r: 26, axis: 'x', keep: true, tip: 'اسحب الشمعة', idle: 'اسحب ✋', drag: (S2, d) => { S2.fr = clamp((d.x - mid + 50) / 100, .15, .85); } }); }
      return L.concat(C.a, C.b); },
    readings(S) { if (S.par) return [rd('الزاوية θ', '0° (متوازيتان)'), rd('عدد الصور', '∞')]; const g = D.geo(S), M = D.model(S, g); return [rd('الزاوية θ', Math.round(S.thv) + '°'), rd('n = 360/θ − 1', Q47.n(360 / Math.round(S.thv) - 1, 2)), rd('الصور المرسومة', String(M.IM.length)), rd('تراها العين', String(M.IM.filter(o => o.path).length))]; },
    record(S) { return S.par ? null : { th: Math.round(S.thv), n: images(S.thv * Math.PI / 180 * S.fr, S.thv * Math.PI / 180).length }; }, cols: [['th', 'θ (°)'], ['n', 'عدد الصور n']],
    explain(S) { return Q26.ex('كلما صغرت الزاوية بين المرآتين زاد عدد صور الشمعة: 90° ثلاث صور، 60° خمس، 30° إحدى عشرة.', 'صورة الشمعة في إحدى المرآتين تصبح جسماً تتكون له صورة في المرآة الأخرى، وهكذا حتى تقع الصورة خلف المرآتين كلتيهما. لذلك n = 360°/θ − 1.', 'تستعمل المرايا المتزاوية في الزخرفة والمحال التجارية والمشكال (الكاليدوسكوب) لتكوين صور متعددة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — المرايا الكروية: المفاهيم، البؤرة، الأشعة المتوازية، الزيغ الكروي (7-4، الأشكال 7-7 إلى 10-7 و 22-7 و 23-7) =============== */
(() => {
  const D = { id: 'g10_mr_focus', page: 118, fig: 'الأشكال 8-7 و 9-7 و 10-7 + 22-7 و 23-7',
    desc: 'المرآة الكروية سطحها العاكس جزء من سطح كرة مجوفة: إذا كان السطح العاكس هو الداخلي سميت مقعرة، وإذا كان الخارجي سميت محدبة. مركز التكور C مركز الكرة، والقطب V منتصف سطح المرآة، والمحور الأساس الخط المار بهما، ونصف قطر التكور R، والبؤرة F نقطة التقاء الأشعة المنعكسة (أو امتداداتها) الساقطة موازية للمحور، والبعد البؤري f = R/2. الأشعة البعيدة عن القطب لا تمر بالبؤرة نفسها: هذا هو الزيغ الكروي، ويُتخلص منه بمرآة على شكل قطع مكافئ أو بمرآة صغيرة الوجه.',
    tags: 'المرآة الكروية مقعرة محدبة مركز التكور قطب المرآة المحور الأساس نصف قطر التكور البؤرة البعد البؤري f=R/2 بؤرة حقيقية بؤرة تقديرية مجمعة مفرقة الزيغ الكروي قطع مكافئ ملعقة',
    tools: ['صندوق أشعة يعطي حزمة متوازية', 'مرآة مقعرة', 'مرآة محدبة', 'مرآة على شكل قطع مكافئ'],
    steps: ['شغّل صندوق الأشعة واسحبه للأعلى أو للأسفل: الأشعة الموازية للمحور القريبة منه تلتقي في البؤرة F.', 'اسحب مركز التكور C أو غيّر R من لوحة التحكم: البؤرة تبقى في منتصف المسافة بين C و V.', 'كبّر «عرض وجه المرآة»: الأشعة البعيدة عن القطب تقطع المحور أقرب إلى المرآة (الزيغ الكروي). ثم فعّل «قطع مكافئ».', 'اختر «محدبة» ثم «مقارنة»: المحدبة تفرق الأشعة وامتداداتها تمر بالبؤرة التقديرية خلف المرآة.'],
    concl: ['المقعرة سطحها العاكس داخلي (مجمعة) وبؤرتها حقيقية أمامها، والمحدبة سطحها العاكس خارجي (مفرقة) وبؤرتها تقديرية خلفها.', 'البعد البؤري يساوي نصف نصف قطر التكور: f = R/2.', 'الزيغ الكروي: عدم تجمع الأشعة المنعكسة عن مرآة كروية في نقطة واحدة؛ الأشعة البعيدة عن القطب تقطع المحور في نقطة أقرب إلى القطب من البؤرة.', 'للتخلص منه نستعمل مرآة على شكل قطع مكافئ أو مرآة كروية صغيرة الوجه (عاكسات الضوء والتلسكوبات).'],
    laws: ['g10_mr_fR'],
    controls: [R('R', 'نصف قطر التكور R', 20, 40, 30, 1, 'cm'), R('n', 'عدد الأشعة', 3, 13, 7, 2, ''), R('ap', 'عرض وجه المرآة', 20, 90, 45, 5, '%'), TG('par', 'مرآة بشكل قطع مكافئ', false, null, 'swap'), TG('lab', 'التسميات C و F و V و R و f', true, null, 'labels'), TG('sph', 'الكرة التي اقتطعت منها', true, null, 'grid')],
    setup(S) { S.md = 'cc'; S.by = 0; S.Rv = (S.p.R || 30) * 10; S.apv = (S.p.ap || 45) / 100; S.tt = 0; },
    update(S, dt) { S.tt += dt; const k = Math.min(1, dt * 7); S.Rv += ((S.p.R || 30) * 10 - S.Rv) * k; S.apv += ((S.p.ap || 45) / 100 - S.apv) * k; },
    rows(S) { const w = S.W, h = S.H, L = Q42.L(S); if (S.md === 'both') return [{ k: 'cc', vx: w - 170, ay: Math.round(h * .3), s: .62, x0: L }, { k: 'cv', vx: Math.round(L + (w - L) * .42), ay: Math.round(h * .66), s: .62, x0: L }];
      return [S.md === 'cc' ? { k: 'cc', vx: w - 150, ay: Math.round(h * .56), s: 1, x0: L } : { k: 'cv', vx: Math.round(L + (w - L) * .45), ay: Math.round(h * .56), s: 1, x0: L }]; },
    scene(ctx, S, r, one) { const w = S.W, R = S.Rv * r.s, par = S.p.par && r.k === 'cc', lab = S.p.lab !== false, maxAp = r.k === 'cc' ? .9 : (one ? .74 : .5), apF = r.s < 1 ? Math.min(S.apv, .42) : S.apv, ap = Math.min(R * maxAp, R * apF, one ? 190 : 120);
      const M = { k: par ? 'par' : r.k, vx: r.vx, ay: r.ay, R, ap }, f = R / 2, box = { x0: r.x0, x1: w - 8, y0: r.ay - (one ? 330 : 150), y1: r.ay + (one ? 220 : 130) };
      if (S.p.sph !== false && !par) K.raw(ctx, () => { const cx = r.k === 'cc' ? r.vx - R : r.vx + R; ctx.setLineDash([4, 6]); ctx.strokeStyle = 'rgba(8,145,178,.45)'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.arc(cx, r.ay, R, 0, TAU); ctx.stroke(); ctx.setLineDash([]); });
      K.raw(ctx, () => { ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(r.x0, r.ay); ctx.lineTo(w - 8, r.ay); ctx.stroke(); });
      // ray box
      const bx = r.x0 + 14, n = S.p.n || 7, half = ap * .97, cy = r.ay + S.by * r.s; K.raw(ctx, () => { const g = ctx.createLinearGradient(bx, 0, bx + 30, 0); g.addColorStop(0, '#1f2937'); g.addColorStop(1, '#475569'); ctx.fillStyle = g; rr(ctx, bx - 12, cy - half - 14, 34, 2 * half + 28, 6); ctx.fill(); ctx.fillStyle = '#fde047'; ctx.fillRect(bx + 20, cy - half - 6, 3, 2 * half + 12); });
      const cross = []; for (let i = 0; i < n; i++) { const y0 = cy - half + 2 * half * (n === 1 ? .5 : i / (n - 1)); const p = [bx + 22, y0], d = [1, 0], H = Q47.mhit(M, p, d); if (!H) { Q47.ray(ctx, [p, [w - 8, y0]], '#f59e0b', { alpha: .35 }); continue; }
        const rd2 = Q47.refl(d, H.n), far = Math.abs(H.pt[1] - r.ay) / R, col = far > .5 ? '#dc2626' : far > .25 ? '#f97316' : '#eab308';
        const pts = [p, H.pt]; let q0 = H.pt, d0 = rd2; for (let b = 0; b < 3; b++) { const H2 = Q47.mhit(M, q0, d0); if (!H2) break; pts.push(H2.pt); d0 = Q47.refl(d0, H2.n); q0 = H2.pt; } pts.push(Q47.exit(q0, d0, box));
        Q47.ray(ctx, [p, H.pt], col, { w: 2 }); for (let k = 1; k < pts.length - 1; k++) Q47.ray(ctx, [pts[k], pts[k + 1]], col, { w: 2 });
        if (r.k === 'cv') Q47.ray(ctx, [H.pt, Q47.exit(H.pt, [-rd2[0], -rd2[1]], { x0: r.x0, x1: Math.min(w - 8, r.vx + f * 1.6), y0: box.y0, y1: box.y1 })], col, { dash: [5, 5], arrows: false, alpha: .7 });
        if (Math.abs(rd2[1]) > 1e-6) { const t = (r.ay - H.pt[1]) / rd2[1]; cross.push(H.pt[0] + rd2[0] * t); } }
      Q47.mirror(ctx, M);
      const F = r.k === 'cc' ? r.vx - f : r.vx + f, C = r.k === 'cc' ? r.vx - R : r.vx + R;
      if (lab) { Q47.pt(ctx, F, r.ay, 'F', '#b45309', 18); if (!par && C > r.x0 && C < w - 10) Q47.pt(ctx, C, r.ay, 'C', '#0f766e', 18); Q47.pt(ctx, r.vx, r.ay, 'V', '#334155', 18);
        if (one) { const y = r.ay + (r.k === 'cc' ? 150 : 120); if (!par) Q47.dim(ctx, Math.min(C, r.vx), Math.max(C, r.vx), y, 'R = ' + Q47.n(R / 10, 1) + ' cm', '#0f766e'); Q47.dim(ctx, Math.min(F, r.vx), Math.max(F, r.vx), y - 44, 'f = ' + Q47.n(f / 10, 1) + ' cm', '#b45309'); }
        Q42.T(ctx, r.k === 'cc' ? 'مقعرة: سطح عاكس داخلي' : 'محدبة: سطح عاكس خارجي', r.k === 'cc' ? r.vx - 60 : r.vx + 10, r.ay - ap - 22, { s: 12, w: 900, c: '#fff', bg: r.k === 'cc' ? '#0891b2' : '#7c3aed' });
        Q42.T(ctx, r.k === 'cc' ? 'بؤرة حقيقية' : 'بؤرة تقديرية', F, r.ay - 26, { s: 11, w: 900, c: '#b45309' }); }
      return { cross, F, f, R, ap }; },
    draw(ctx, w, h, S) { Q47.bg(ctx, w, h); const rows = D.rows(S); let info = null; rows.forEach(r => { const q = D.scene(ctx, S, r, rows.length === 1); if (!info) info = Object.assign(q, { k: r.k }); });
      if (rows.length === 1) { const ab = info.cross.length ? Math.max.apply(null, info.cross.map(x => Math.abs(x - info.F))) : 0, cc = info.k === 'cc';
        Q42.card(ctx, S, [{ t: 'R = ' + Q47.n(info.R / 10, 1) + ' cm ⟸ f = R/2 = ' + Q47.n(info.f / 10, 1) + ' cm', mono: 1 }, cc ? { t: S.p.par ? 'قطع مكافئ: كل الأشعة تمر بالبؤرة' : 'مدى الزيغ الكروي: ' + Q47.n(ab / 10, 1) + ' cm', c: S.p.par || ab < 3 ? '#16a34a' : '#dc2626', w: 900 } : { t: 'الأشعة المنعكسة متفرقة', c: '#7c3aed', w: 900 }, { t: cc ? 'المقعرة مرآة مجمعة' : 'امتداداتها تمر بالبؤرة التقديرية', c: '#0f766e', w: 800 }], { title: cc ? 'المرآة المقعرة' : 'المرآة المحدبة', y: 60, wd: 290 }); }
      Q42.drawChips(ctx, D.chips(S));
      Q42.banner(ctx, w, 'اسحب صندوق الأشعة ومركز التكور C');
    },
    chips(S) { return Q42.chips(S, 'md', [['cc', 'مرآة مقعرة'], ['cv', 'مرآة محدبة'], ['both', 'مقارنة']], S.H - 84, S.md, (S2, k) => { S2.md = k; S2.by = 0; }, { bw: 160 }); },
    drags(S) { if (!S.W) return []; const rows = D.rows(S), L = []; rows.forEach((r, i) => { const R = S.Rv * r.s, ap = Math.min(R * .9, R * S.apv, 190), C = r.k === 'cc' ? r.vx - R : r.vx + R;
        L.push({ id: 'box' + i, x: r.x0 + 18, y: r.ay + S.by * r.s, r: 26, axis: 'y', keep: true, tip: 'اسحب صندوق الأشعة', idle: i ? undefined : 'اسحب ✋', hint: i ? false : undefined, drag: (S2, d) => { S2.by = clamp((d.y - r.ay) / r.s, -ap * .5 / r.s, ap * .5 / r.s); } });
        if (S.md !== 'both' && !(S.p.par && r.k === 'cc')) L.push({ id: 'C' + i, x: C, y: r.ay, r: 18, axis: 'x', keep: true, hint: false, tip: 'اسحب مركز التكور لتغيير R', drag: (S2, d) => { setParam(S2, 'R', clamp(Math.round(Math.abs(r.vx - d.x) / 10), 20, 40)); } }); });
      return L.concat(D.chips(S)); },
    readings(S) { const R = S.Rv / 10; return [rd('نصف قطر التكور R', Q47.n(R, 1) + ' cm'), rd('البعد البؤري f', Q47.n(R / 2, 1) + ' cm'), rd('نوع المرآة', S.md === 'cv' ? 'محدبة (مفرقة)' : S.md === 'cc' ? (S.p.par ? 'قطع مكافئ' : 'مقعرة (مجمعة)') : 'مقارنة')]; },
    explain(S) { return Q26.ex('الأشعة الموازية للمحور تنعكس عن المقعرة متجمعة في البؤرة، وعن المحدبة متفرقة كأنها صادرة من بؤرة خلفها. الأشعة البعيدة عن القطب تقطع المحور أقرب إلى المرآة.', 'كل شعاع ينعكس بزاوية انعكاس تساوي زاوية سقوطه على العمود، والعمود على المرآة الكروية هو نصف القطر المار بمركز التكور. للأشعة القريبة من المحور تكون نقطة الالتقاء في منتصف المسافة بين C و V فيكون f = R/2.', 'وجهك في الملعقة: داخلها مقعر يعطي صورة مقلوبة، وظهرها محدب يعطي صورة معتدلة مصغرة. والمصابيح والتلسكوبات تستعمل مرايا بشكل قطع مكافئ لتجنب الزيغ.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — قواعد رسم الأشعة في المرايا الكروية (الأشكال 11-7 و 12-7 و 13-7) =============== */
(() => {
  const RULE = { cc: { par: 'الشعاع الموازي للمحور ينعكس ماراً بالبؤرة الحقيقية', f: 'الشعاع المار بالبؤرة ينعكس موازياً للمحور', c: 'الشعاع المار بمركز التكور يرتد على نفسه', v: 'الشعاع الساقط على القطب ينعكس بزاوية مساوية عن المحور', free: 'زاوية السقوط = زاوية الانعكاس على نصف القطر' },
    cv: { par: 'الشعاع الموازي ينعكس بحيث يمر امتداده بالبؤرة التقديرية', f: 'الشعاع المتجه نحو البؤرة ينعكس موازياً للمحور', c: 'الشعاع المتجه نحو مركز التكور ينعكس على نفسه', v: 'الشعاع الساقط على القطب ينعكس بزاوية مساوية عن المحور', free: 'زاوية السقوط = زاوية الانعكاس على نصف القطر' } };
  const TY = [['par', 'موازٍ للمحور'], ['f', 'مار بالبؤرة'], ['c', 'مار بمركز التكور'], ['v', 'نحو القطب'], ['free', 'حر']];
  const D = { id: 'g10_mr_rays', page: 119, fig: 'الأشكال 11-7 و 12-7 و 13-7',
    desc: 'لتحديد الصورة المتكونة في المرآة الكروية نستعمل أشعة خاصة: الشعاع الموازي للمحور ينعكس ماراً بالبؤرة (أو يمر امتداده بها في المحدبة)، والشعاع المار بالبؤرة (أو المتجه نحوها) ينعكس موازياً للمحور، والشعاع المار بمركز التكور (أو المتجه نحوه) يرتد على نفسه لأنه يسقط عمودياً على المرآة.',
    tags: 'رسم الأشعة الشعاع الموازي الشعاع المار بالبؤرة الشعاع المار بمركز التكور يرتد على نفسه زاوية السقوط زاوية الانعكاس العمود نصف القطر مؤشر ليزر',
    tools: ['مؤشر ليزر', 'مرآة مقعرة', 'مرآة محدبة'],
    steps: ['اختر نوع الشعاع من الأزرار، ثم اسحب مؤشر الليزر إلى أي مكان: لاحظ أين يذهب الشعاع المنعكس.', 'العمود على المرآة الكروية هو نصف القطر المار بمركز التكور C: لاحظ أن زاوية السقوط تساوي زاوية الانعكاس دائماً.', 'اختر «حر» واسحب نقطة السقوط على المرآة.', 'بدّل إلى المرآة المحدبة وكرر، ثم فعّل «الأشعة الثلاثة معاً».'],
    concl: ['الموازي للمحور ⟸ يمر بالبؤرة (المقعرة) أو يمر امتداده بها (المحدبة).', 'المار بالبؤرة أو المتجه نحوها ⟸ ينعكس موازياً للمحور.', 'المار بمركز التكور أو المتجه نحوه ⟸ يرتد على نفسه لأنه عمودي على السطح.', 'في كل الحالات: زاوية السقوط = زاوية الانعكاس على العمود (نصف القطر).'],
    laws: ['g10_mr_fR'],
    controls: [R('R', 'نصف قطر التكور R', 20, 40, 30, 1, 'cm'), TG('nrm', 'العمود وزاويتا السقوط والانعكاس', true, null, 'labels'), TG('all', 'الأشعة الثلاثة معاً', false, null, 'ray')],
    setup(S) { S.mk = 'cc'; S.ty = 'par'; S.lx = 0; S.ly = -70; S.lxv = 0; S.lyv = -70; S.aim = -60; S.Rv = (S.p.R || 30) * 10; },
    update(S, dt) { const k = Math.min(1, dt * 10); S.lxv += (S.lx - S.lxv) * k; S.lyv += (S.ly - S.lyv) * k; S.Rv += ((S.p.R || 30) * 10 - S.Rv) * Math.min(1, dt * 7); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), cc = S.mk === 'cc', vx = cc ? w - 150 : Math.round(L + (w - L) * .5), ay = Math.round(h * .57), R = S.Rv; if (!S.lx) { S.lx = S.lxv = cc ? -(R * .75) : -260; } return { w, h, L, vx, ay, R, f: R / 2, cc }; },
    dirOf(g, p, ty, aim) { const cc = g.cc, F = [cc ? g.vx - g.f : g.vx + g.f, g.ay], C = [cc ? g.vx - g.R : g.vx + g.R, g.ay];
      let d = ty === 'par' ? [1, 0] : ty === 'f' ? Q47.nrm([F[0] - p[0], F[1] - p[1]]) : ty === 'c' ? Q47.nrm([C[0] - p[0], C[1] - p[1]]) : ty === 'v' ? Q47.nrm([g.vx - p[0], g.ay - p[1]]) : Q47.nrm([Q47.mpt({ k: cc ? 'cc' : 'cv', vx: g.vx, R: g.R }, aim) - p[0], g.ay + aim - p[1]]); let back = null;
      if (d[0] < 0) { d = [-d[0], -d[1]]; back = ty === 'f' ? F : ty === 'c' ? C : null; } return { d, back }; },
    shoot(ctx, S, g, p, ty, col, main) { const M = { k: g.cc ? 'cc' : 'cv', vx: g.vx, ay: g.ay, R: g.R, ap: Math.min(g.R * (g.cc ? .8 : .7), 180) }, q = D.dirOf(g, p, ty, S.aim), box = { x0: g.L, x1: g.w - 8, y0: 50, y1: g.h - 150 };
      const H = Q47.mhit(M, p, q.d); if (q.back) Q47.ray(ctx, [q.back, p], col, { dash: [3, 5], alpha: .5, arrows: false }); if (!H) { Q47.ray(ctx, [p, Q47.exit(p, q.d, box)], col, { alpha: .5 }); return null; }
      const r = Q47.refl(q.d, H.n); Q47.ray(ctx, [p, H.pt], col); Q47.ray(ctx, [H.pt, Q47.exit(H.pt, r, box)], col);
      if (!g.cc) Q47.ray(ctx, [H.pt, Q47.exit(H.pt, [-r[0], -r[1]], { x0: g.L, x1: Math.min(g.w - 8, g.vx + g.R * 1.05), y0: 50, y1: g.h - 150 })], col, { dash: [6, 5], alpha: .7, arrows: false });
      if (main && S.p.nrm !== false) { const C = [g.cc ? g.vx - g.R : g.vx + g.R, g.ay], n = H.n; Q41.line(ctx, [g.cc ? C : [H.pt[0] + n[0] * 90, H.pt[1] + n[1] * 90], g.cc ? [H.pt[0] - n[0] * 30, H.pt[1] - n[1] * 30] : C], '#0f172a', 1.2, [4, 4]);
        const nA = Math.atan2(n[1], n[0]), aI = Math.atan2(p[1] - H.pt[1], p[0] - H.pt[0]), aR = Math.atan2(r[1], r[0]), dif = (a, b) => { let x = a - b; while (x > Math.PI) x -= TAU; while (x < -Math.PI) x += TAU; return x; }, di = dif(aI, nA), dr = dif(aR, nA), deg = Math.round(Math.abs(di) * 180 / Math.PI);
        if (deg > 0) { Q47.arc(ctx, H.pt[0], H.pt[1], 70, nA, nA + di, '#dc2626', 'i', 86); Q47.arc(ctx, H.pt[0], H.pt[1], 52, nA, nA + dr, '#0f766e', 'r', 66); }
        return { deg, H }; } return { deg: null, H }; },
    laser(ctx, x, y, a) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); const g = ctx.createLinearGradient(0, -8, 0, 8); g.addColorStop(0, '#9ca3af'); g.addColorStop(.5, '#f3f4f6'); g.addColorStop(1, '#4b5563'); ctx.fillStyle = g; rr(ctx, -58, -8, 58, 16, 5); ctx.fill(); ctx.fillStyle = '#111827'; ctx.fillRect(-4, -6, 6, 12); ctx.fillStyle = '#dc2626'; rr(ctx, -40, -10, 12, 4, 2); ctx.fill(); ctx.restore(); }); },
    draw(ctx, w, h, S) { const g = D.geo(S), p = [g.vx + S.lxv, g.ay + S.lyv]; Q47.bg(ctx, w, h);
      K.raw(ctx, () => { ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(g.L, g.ay); ctx.lineTo(w - 8, g.ay); ctx.stroke(); });
      const F = g.cc ? g.vx - g.f : g.vx + g.f, C = g.cc ? g.vx - g.R : g.vx + g.R; let res = null;
      if (S.p.all) [['par', Q47.C1], ['f', Q47.C2], ['c', Q47.C3]].forEach((q, i) => { const r2 = D.shoot(ctx, S, g, p, q[0], q[1], i === 0); if (i === 0) res = r2; });
      else res = D.shoot(ctx, S, g, p, S.ty, '#dc2626', true);
      Q47.mirror(ctx, { k: g.cc ? 'cc' : 'cv', vx: g.vx, ay: g.ay, R: g.R, ap: Math.min(g.R * (g.cc ? .8 : .7), 180) });
      Q47.pt(ctx, F, g.ay, 'F', '#b45309', 18); if (C < w - 10) Q47.pt(ctx, C, g.ay, 'C', '#0f766e', 18); Q47.pt(ctx, g.vx, g.ay, 'V', '#334155', 18);
      const q = D.dirOf(g, p, S.p.all ? 'par' : S.ty, S.aim); D.laser(ctx, p[0], p[1], Math.atan2(q.d[1], q.d[0]));
      if (S.ty === 'free' && !S.p.all) { const ax = Q47.mpt({ k: g.cc ? 'cc' : 'cv', vx: g.vx, R: g.R }, S.aim); Q41.knob(ctx, ax, g.ay + S.aim, '#2563eb', 9); }
      const L = [{ t: RULE[S.mk][S.p.all ? 'par' : S.ty], c: '#0f172a', w: 900 }]; if (S.p.all) L.push({ t: 'الأحمر: موازٍ ، الأزرق: بالبؤرة ، الأخضر: بالمركز', c: '#334155', w: 800, s: 11.5 }); if (res && res.deg != null) L.push({ t: 'i = r = ' + res.deg + '°', mono: 1, c: '#0f766e', w: 900 });
      Q42.card(ctx, S, L, { title: g.cc ? 'المرآة المقعرة' : 'المرآة المحدبة', y: 60, wd: 300 });
      const C2c = D.chips(S, g); Q42.drawChips(ctx, C2c.a); Q42.drawChips(ctx, C2c.b);
      Q42.banner(ctx, w, 'اسحب مؤشر الليزر واختر نوع الشعاع'); },
    chips(S, g) { return { a: Q42.chips(S, 'ty', TY, g.h - 128, S.ty, (S2, k) => { S2.ty = k; }, { bw: 130 }), b: Q42.chips(S, 'mk', [['cc', 'مرآة مقعرة'], ['cv', 'مرآة محدبة']], g.h - 84, S.mk, (S2, k) => { if (S2.mk !== k) { S2.mk = k; S2.lx = 0; } }, { bw: 160 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), L = [{ id: 'laser', x: g.vx + S.lxv - 22, y: g.ay + S.lyv, r: 28, axis: 'xy', keep: true, tip: 'اسحب مؤشر الليزر', idle: 'اسحب ✋', drag: (S2, d) => { const mx = g.cc ? -40 : -40; S2.lx = clamp(d.x + 22 - g.vx, g.L + 70 - g.vx, mx); S2.ly = clamp(d.y - g.ay, -g.R * .78, g.R * .6); } }];
      if (S.ty === 'free' && !S.p.all) { const ax = Q47.mpt({ k: g.cc ? 'cc' : 'cv', vx: g.vx, R: g.R }, S.aim); L.push({ id: 'aim', x: ax, y: g.ay + S.aim, r: 18, axis: 'y', keep: true, hint: false, tip: 'اسحب نقطة السقوط', drag: (S2, d) => { S2.aim = clamp(d.y - g.ay, -Math.min(g.R * .7, 170), Math.min(g.R * .65, 170)); } }); }
      return L.concat(C.a, C.b); },
    readings(S) { const g = D.geo(S), q = D.dirOf(g, [g.vx + S.lxv, g.ay + S.lyv], S.ty, S.aim), M = { k: g.cc ? 'cc' : 'cv', vx: g.vx, ay: g.ay, R: g.R, ap: Math.min(g.R * .8, 180) }, H = Q47.mhit(M, [g.vx + S.lxv, g.ay + S.lyv], q.d); let deg = '—'; if (H) { const c = Math.abs(q.d[0] * H.n[0] + q.d[1] * H.n[1]); deg = Math.round(Math.acos(clamp(c, -1, 1)) * 180 / Math.PI) + '°'; }
      return [rd('نوع المرآة', g.cc ? 'مقعرة' : 'محدبة'), rd('زاوية السقوط i', deg), rd('زاوية الانعكاس r', deg), rd('البعد البؤري f', Q47.n(g.R / 20, 1) + ' cm')]; },
    explain(S) { return Q26.ex('الشعاع الموازي يمر بالبؤرة بعد الانعكاس، والمار بالبؤرة يخرج موازياً، والمار بمركز التكور يرتد على نفسه.', 'نصف القطر المرسوم من مركز التكور عمودي على سطح الكرة، فالشعاع الذي يمر بمركز التكور يسقط عمودياً (زاوية سقوطه صفر) فيرتد على نفسه. وبقية الأشعة تنعكس بزاوية تساوي زاوية سقوطها على هذا العمود.', 'هذه الأشعة الخاصة تكفي لرسم أي صورة: شعاعان منها يحددان موقع رأس الصورة.'); }
  };
  M8.P[D.id] = D;
})();

/* inset: what the eye sees when looking into the mirror (front view, clipped to the mirror face) */
Q47.inset = (ctx, x, y, r, M, t, title, cv) => { K.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(x, y, r + 7, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip(); const g = ctx.createRadialGradient(x - r * .3, y - r * .3, 4, x, y, r * 1.2); g.addColorStop(0, cv ? '#f1f5f9' : '#e0f2fe'); g.addColorStop(1, cv ? '#94a3b8' : '#7dd3fc'); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.restore(); });
  if (isFinite(M)) { const hp = clamp(M * 80, -r * 1.6, r * 1.6); K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip(); Q47.cand(ctx, x, y + hp / 2, hp, t); ctx.restore(); }); }
  else Q42.T(ctx, 'لا صورة واضحة', x, y, { s: 11, w: 900, c: '#334155' });
  K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.ellipse(x - r * .45, y - r * .45, r * .28, r * .14, -.7, 0, TAU); ctx.fill(); });
  Q42.T(ctx, title, x, y + r + 20, { s: 11.5, w: 900, c: '#fff', bg: '#0e7490' }); };

/* =============== D1 — النشاط 2: تكون الصور في المرآة المقعرة على المسطبة البصرية (الشكل 14-7) =============== */
(() => {
  const PRE = [['far', 'أبعد من 2f', 3], ['c', 'عند C', 2], ['fc', 'بين F و C', 1.4], ['in', 'أقل من f', .6]];
  const D = { id: 'g10_mr_bench', page: 119, fig: 'النشاط 2 + الشكل 14-7',
    desc: 'نضع المرآة المقعرة على حاملها ونوقد الشمعة ونضعها على بعد معين أمام المرآة، ثم نحرك الحاجز (قطعة كارتون بيضاء) أمام المرآة حتى تتكون صورة واضحة للهب، ونكرر بتغيير بعد الشمعة. الصورة التي تتجمع فيها الأشعة المنعكسة على حاجز صورة حقيقية، والجسم والصورة الحقيقية يقعان في جهة واحدة من المرآة المقعرة. أما الصورة الناتجة من امتدادات الأشعة فتسمى صورة خيالية.',
    tags: 'نشاط 2 المرآة المقعرة شمعة حاجز شاشة كارتون مسطبة بصرية صورة حقيقية صورة واضحة مقلوبة مكبرة مصغرة صورة خيالية',
    tools: ['مرآة مقعرة على حامل', 'شمعة', 'قطعة كارتون بيضاء (حاجز)', 'مسطبة بصرية مدرجة'],
    steps: ['اسحب الشمعة إلى بعد معين أمام المرآة.', 'اسحب الحاجز الأبيض ببطء حتى تصبح صورة اللهب عليه واضحة (الوضوح 100%).', 'سجّل بعد الشمعة وبعد الحاجز ولاحظ: هل الصورة مكبرة أم مصغرة؟ معتدلة أم مقلوبة؟', 'كرر بتغيير بعد الشمعة (أو بالأزرار)، ثم ضع الشمعة أقرب من البؤرة: هل تستطيع أن تجمع الصورة على الحاجز؟'],
    concl: ['يمكن تجميع الأشعة الصادرة من لهب الشمعة على الحاجز: الصورة حقيقية ومقلوبة.', 'الجسم والصورة الحقيقية يقعان في جهة واحدة بالنسبة للمرآة المقعرة.', 'كلما اقتربت الشمعة من البؤرة ابتعدت صورتها وكبرت.', 'إذا كانت الشمعة أقرب من البؤرة لا تتكون صورة على الحاجز؛ نرى في المرآة صورة خيالية معتدلة مكبرة.'],
    laws: ['g10_mr_eq', 'g10_mr_M'],
    controls: [R('f', 'البعد البؤري f', 10, 25, 15, 1, 'cm'), TG('rays', 'الأشعة', true, null, 'ray'), TG('img', 'موقع الصورة الحقيقية', false, null, 'eye'), TG('view', 'النظر في المرآة', true, null, 'eye')],
    setup(S) { S.u = 40; S.uT = 40; S.s = 80; S.sT = 80; S.tt = 0; },
    update(S, dt) { S.tt += dt; const k = Math.min(1, dt * 9); S.u += (S.uT - S.u) * k; S.s += (S.sT - S.s) * k; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), mx = w - 110, ry = Math.round(h * .75), ay = ry - 196, xl = L + 24, px = (mx - xl) / 100; return { w, h, L, mx, ry, ay, xl, px }; },
    calc(S) { const f = S.p.f || 15, P = Q47.props(f, S.u); return Object.assign({ f }, P); },
    draw(ctx, w, h, S) { const g = D.geo(S), c = D.calc(S), px = g.px, hp = 64, R = 2 * c.f * px, ap = Math.min(R * .45, 72), M = { k: 'cc', vx: g.mx, ay: g.ay, R, ap };
      Q47.bg(ctx, w, h); K.raw(ctx, () => { ctx.fillStyle = 'rgba(15,23,42,.06)'; ctx.fillRect(0, 0, w, h); });
      Q47.bench(ctx, g.mx, g.xl, g.ry, px, 100);
      const ox = g.mx - S.u * px, sx = g.mx - S.s * px, real = c.real === true, ix = real ? g.mx - c.v * px : null, ih = real ? c.M * hp : 0;
      // F and C marks on the axis
      Q41.line(ctx, [[g.xl, g.ay], [g.mx, g.ay]], 'rgba(100,116,139,.6)', 1, [5, 5]); Q47.pt(ctx, g.mx - c.f * px, g.ay, 'F', '#b45309', 18); if (2 * c.f <= 100) Q47.pt(ctx, g.mx - 2 * c.f * px, g.ay, 'C', '#0f766e', 18);
      // mirror on its stand
      Q47.rider(ctx, g.mx + 10, g.ay + ap - 4, g.ry); Q47.mirror(ctx, M);
      // candle on its holder
      Q47.rider(ctx, ox, g.ay + 4, g.ry, '#7c2d12'); K.raw(ctx, () => { ctx.fillStyle = '#78716c'; rr(ctx, ox - 16, g.ay, 32, 6, 2); ctx.fill(); }); Q47.cand(ctx, ox, g.ay, hp, S.tt);
      // screen
      const sy0 = g.ay - 18, sy1 = g.ay + 176; Q47.rider(ctx, sx, sy1, g.ry);
      K.raw(ctx, () => { ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.save(); ctx.translate(sx, 0); ctx.fillRect(-6, sy0, 12, sy1 - sy0); ctx.strokeRect(-6, sy0, 12, sy1 - sy0); ctx.restore(); });
      // rays
      const tip = [ox, g.ay - hp]; let blur = 99;
      if (S.p.rays !== false) [-.85, 0, .85].forEach(fy => { const y = fy * ap, P = [Q47.mpt(M, y), g.ay + y]; Q47.ray(ctx, [tip, P], '#f59e0b', { w: 1.8, alpha: .9 });
        let d; if (real) d = Q47.nrm([ix - P[0], g.ay - ih - P[1]]); else if (isFinite(c.v)) { const vi = [g.mx - c.v * px, g.ay - c.M * hp]; d = Q47.nrm([P[0] - vi[0], P[1] - vi[1]]); } else d = Q47.nrm([-S.u, hp / px]);
        let end = Q47.exit(P, d, { x0: g.xl - 10, x1: g.mx, y0: 60, y1: g.ry - 4 }); if (sx < P[0] - 2 && d[0] < 0) { const t = (sx + 6 - P[0]) / d[0], yy = P[1] + d[1] * t; if (yy > sy0 && yy < sy1 && t > 0) end = [sx + 6, yy]; }
        Q47.ray(ctx, [P, end], '#f59e0b', { w: 1.8, alpha: .9 }); });
      // image on the screen
      if (real) { const dco = Math.abs(sx - ix) * 2 * ap / Math.max(20, c.v * px); blur = dco; const sharp = Math.exp(-dco / 6);
        K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(sx - 6, sy0, 12, sy1 - sy0); ctx.clip(); ctx.globalAlpha = .25 + .75 * sharp; ctx.filter = 'blur(' + Math.min(14, dco / 2.5).toFixed(1) + 'px)'; Q47.cand(ctx, sx, g.ay, ih, S.tt + 1, { sx: .35 }); ctx.restore(); });
        // a face-on view of the screen card
        const cx = sx - 64, cy = sy1 + 10; void cx; void cy;
        if (S.p.img) Q47.cand(ctx, ix, g.ay, ih, S.tt + 1, { a: .35, dash: '#dc2626' }); }
      else K.raw(ctx, () => { ctx.save(); ctx.globalAlpha = .35; const gg = ctx.createLinearGradient(0, sy0, 0, sy1); gg.addColorStop(0, 'rgba(253,224,71,.6)'); gg.addColorStop(1, 'rgba(253,224,71,.1)'); ctx.fillStyle = gg; ctx.fillRect(sx - 6, sy0, 12, sy1 - sy0); ctx.restore(); });
      // front view of the screen (what the student sees on the card)
      const fx = g.L + 64, fy = 150; K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; rr(ctx, fx - 56, fy - 70, 112, 140, 6); ctx.fill(); ctx.stroke(); });
      if (real) K.raw(ctx, () => { ctx.save(); rr(ctx, fx - 56, fy - 70, 112, 140, 6); ctx.clip(); const sharp = Math.exp(-blur / 6); ctx.globalAlpha = .2 + .8 * sharp; ctx.filter = 'blur(' + Math.min(16, blur / 2).toFixed(1) + 'px)'; const hh = clamp(ih * .9, -120, 120); Q47.cand(ctx, fx, fy + hh / 2, hh, S.tt + 1); ctx.restore(); });
      else Q42.T(ctx, 'ضوء باهت فقط', fx, fy, { s: 11.5, w: 900, c: '#b45309' });
      Q42.T(ctx, 'ما يظهر على الحاجز', fx, fy + 86, { s: 11.5, w: 900, c: '#fff', bg: '#334155' });
      if (S.p.view !== false) Q47.inset(ctx, g.L + 230, 150, 64, real ? (S.u > c.f * 1.02 ? c.M : Infinity) : c.M, S.tt, 'تنظر في المرآة');
      const sharp = real ? Math.round(100 * Math.exp(-blur / 6)) : 0;
      Q42.card(ctx, S, [{ t: 'u = ' + Q47.n(S.u, 0) + ' cm ، f = ' + c.f + ' cm', mono: 1 }, { t: 'بعد الحاجز = ' + Q47.n(S.s, 0) + ' cm' }, real ? { t: 'وضوح الصورة على الحاجز: ' + sharp + '%', c: sharp > 90 ? '#16a34a' : '#b45309', w: 900 } : { t: 'لا تتكون صورة على الحاجز', c: '#dc2626', w: 900 }, { t: real ? (sharp > 90 ? 'الصورة ' + c.txt : 'حرك الحاجز حتى تتضح الصورة') : (isFinite(c.v) ? 'في المرآة: صورة خيالية معتدلة مكبرة' : 'الأشعة تنعكس متوازية'), c: '#7c3aed', w: 900 }], { title: 'النشاط 2', y: 70, wd: 300 });
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, 'اسحب الشمعة ثم الحاجز حتى تتضح الصورة');
    },
    chips(S, g) { return Q42.chips(S, 'pre', PRE.map(q => [q[0], q[1]]), g.h - 84, '', (S2, k) => { const q = PRE.find(q => q[0] === k); S2.uT = clamp(Math.round(q[2] * (S2.p.f || 15)), 6, 95); }, { bw: 140 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'cand', x: g.mx - S.u * g.px, y: g.ay - 30, r: 28, axis: 'x', keep: true, tip: 'اسحب الشمعة', idle: 'اسحب ✋', drag: (S2, d) => { S2.uT = clamp(Math.round((g.mx - d.x) / g.px), 6, 95); } },
      { id: 'scr', x: g.mx - S.s * g.px, y: g.ay + 90, r: 26, axis: 'x', keep: true, hint: false, tip: 'اسحب الحاجز حتى تتضح الصورة', drag: (S2, d) => { S2.sT = clamp(Math.round((g.mx - d.x) / g.px * 2) / 2, 4, 98); } }].concat(D.chips(S, g)); },
    readings(S) { const c = D.calc(S); return [rd('بعد الشمعة u', Q47.n(S.u, 0) + ' cm'), rd('بعد الحاجز', Q47.n(S.s, 1) + ' cm'), rd('بعد الصورة v (القانون)', isFinite(c.v) ? Q47.n(c.v, 1) + ' cm' : '∞'), rd('التكبير M', isFinite(c.M) ? Q47.n(c.M, 2) : '∞'), rd('صفات الصورة', c.txt)]; },
    record(S) { const c = D.calc(S); return { u: Math.round(S.u), s: +S.s.toFixed(1), v: isFinite(c.v) ? +c.v.toFixed(1) : '∞' }; }, cols: [['u', 'u (cm)'], ['s', 'بعد الحاجز (cm)'], ['v', 'v (cm)']],
    explain(S) { return Q26.ex('عندما تكون الشمعة أبعد من البؤرة تظهر على الحاجز صورة مقلوبة للهب في موضع واحد فقط؛ خارجه تصبح بقعة مشوشة.', 'الأشعة الصادرة من كل نقطة في اللهب تنعكس عن المرآة المقعرة متجمعة في نقطة واحدة أمامها، فإذا وضع الحاجز عندها ظهرت صورة حقيقية. إذا كانت الشمعة داخل البعد البؤري تنعكس الأشعة متفرقة فلا تتجمع على حاجز.', 'المرآة المقعرة تجمع ضوء الشمس في بؤرتها، وتستعمل في التلسكوبات العاكسة والأطباق اللاقطة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D2 — خصائص الصور في المرآة المقعرة: الحالات الخمس بمخطط الأشعة (7-5، الأشكال 15-7 إلى 19-7 + فكر) =============== */
(() => {
  const CASES = [['g2f', 'أبعد من 2f', 3, 'الشكل 15-7'], ['c', 'في C', 2, 'الشكل 16-7'], ['fc', 'بين F و C', 1.5, 'الشكل 17-7'], ['f', 'في F', 1, 'الشكل 18-7'], ['in', 'أقل من f', .55, 'الشكل 19-7'], ['inf', 'في اللانهاية', 0, 'فكر ص 120']];
  const D = { id: 'g10_mr_cases', page: 120, fig: 'الأشكال 15-7 إلى 19-7 + فكر ص 120',
    desc: 'خصائص الصور في المرآة المقعرة تعتمد على بعد الجسم: أبعد من 2f ⟸ الصورة بين F و C حقيقية مقلوبة مصغرة؛ في C ⟸ في C حقيقية مقلوبة مساوية؛ بين F و C ⟸ أبعد من C حقيقية مقلوبة مكبرة؛ في F ⟸ تنعكس الأشعة متوازية فلا تتكون صورة؛ أقل من f ⟸ خلف المرآة خيالية معتدلة مكبرة.',
    tags: 'خصائص الصور المرآة المقعرة مخطط الأشعة أبعد من 2f مركز التكور بين البؤرة ومركز التكور في البؤرة أقل من البعد البؤري حقيقية مقلوبة مصغرة مساوية مكبرة خيالية معتدلة اللانهاية',
    tools: ['مرآة مقعرة', 'شمعة (الجسم)', 'مخطط الأشعة الثلاثة'],
    steps: ['اختر حالة من الأزرار أو اسحب الشمعة على المحور ببطء من بعيد نحو المرآة.', 'لاحظ نقطة التقاء الأشعة الثلاثة: هناك يقع رأس الصورة.', 'اقرأ صفات الصورة في البطاقة: حقيقية أم خيالية؟ مقلوبة أم معتدلة؟ مكبرة أم مصغرة؟', 'أطفئ بعض الأشعة من لوحة التحكم: شعاعان يكفيان لتحديد الصورة.'],
    concl: ['u > 2f ⟸ الصورة بين F و C: حقيقية ، مقلوبة ، مصغرة.', 'u = 2f ⟸ الصورة في C: حقيقية ، مقلوبة ، مساوية للجسم.', 'f < u < 2f ⟸ الصورة أبعد من C: حقيقية ، مقلوبة ، مكبرة.', 'u = f ⟸ الأشعة تنعكس متوازية فلا تتكون صورة (في اللانهاية).', 'u < f ⟸ الصورة خلف المرآة: خيالية ، معتدلة ، مكبرة.', 'جسم في اللانهاية ⟸ صورته في البؤرة: حقيقية مقلوبة مصغرة جداً.'],
    laws: ['g10_mr_eq', 'g10_mr_M'],
    controls: [R('f', 'البعد البؤري f', 8, 13, 10, 1, 'cm'), R('h', 'طول الجسم h', 3, 8, 6, .5, 'cm'), TG('r1', 'الشعاع الموازي', true, null, 'ray'), TG('r2', 'الشعاع المار بالبؤرة', true, null, 'ray'), TG('r3', 'الشعاع المار بمركز التكور', true, null, 'ray')],
    setup(S) { S.cs = 'g2f'; S.u = 30; S.uT = 30; S.tt = 0; S.ia = .12; },
    update(S, dt) { S.tt += dt; S.u += (S.uT - S.u) * Math.min(1, dt * 6); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), vx = w - 190, ay = Math.round(h * .55); return { w, h, L, vx, ay, px: 10, box: { x0: L, x1: w - 8, y0: ay - 280, y1: h - 150 } }; },
    rays(S) { return [1, 2, 3].filter(k => S.p['r' + k] !== false); },
    draw(ctx, w, h, S) { const g = D.geo(S), f = S.p.f || 10, hcm = S.p.h || 6; Q47.bg(ctx, w, h);
      if (S.cs === 'inf') D.drawInf(ctx, S, g, f);
      else { Q47.diag(ctx, { k: 'cc', vx: g.vx, ay: g.ay, f: f * g.px, u: S.u * g.px, h: hcm * g.px, box: g.box, rays: D.rays(S), t: S.tt, ap: 2 * f * g.px * .78 });
        const P = Q47.props(f, S.u); Q42.card(ctx, S, [{ t: 'u = ' + Q47.n(S.u, 1) + ' cm ، f = ' + f + ' cm', mono: 1 }, { t: 'موقع الصورة: ' + Q47.where(f, S.u), c: '#0f172a', w: 900 }, { t: P.txt, c: P.real ? '#dc2626' : '#7c3aed', w: 900 }, isFinite(P.v) ? { t: 'v = ' + Q47.n(P.v, 1) + ' cm ، M = ' + Q47.n(P.M, 2), mono: 1 } : { t: 'v = ∞', mono: 1 }], { title: 'الصورة في المرآة المقعرة', y: 70, wd: 310 }); }
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, 'اسحب الشمعة على المحور أو اختر حالة');
    },
    drawInf(ctx, S, g, f) { const fp = f * g.px, R = 2 * fp, M = { k: 'cc', vx: g.vx, ay: g.ay, R, ap: R * .78 }, a = S.ia, box = g.box;
      K.raw(ctx, () => { ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(box.x0, g.ay); ctx.lineTo(box.x1, g.ay); ctx.stroke(); });
      const I = [g.vx - fp, g.ay + fp * Math.tan(a)]; [-.6, -.3, 0, .3, .6].forEach(k => { const y0 = g.ay + k * R * .78 - (g.vx - box.x0) * Math.tan(a) * 0, p = [box.x0 + 10, y0 - (g.vx - box.x0) * Math.tan(a)], d = [Math.cos(a), Math.sin(a)], H = Q47.mhit(M, p, d); if (!H) return; Q47.ray(ctx, [p, H.pt], '#f59e0b', { w: 2 }); const dd = Q47.nrm([I[0] - H.pt[0], I[1] - H.pt[1]]); Q47.ray(ctx, [H.pt, Q47.exit(H.pt, dd, box)], '#f59e0b', { w: 2 }); });
      Q47.mirror(ctx, M); Q47.pt(ctx, g.vx - fp, g.ay, 'F', '#b45309', -18); Q47.pt(ctx, g.vx - R, g.ay, 'C', '#0f766e', 18); Q47.pt(ctx, g.vx, g.ay, 'V', '#334155', 18);
      Q41.dot(ctx, I[0], I[1], '#dc2626', 6); Q42.T(ctx, 'الصورة', I[0], I[1] + 22, { s: 12, w: 900, c: '#dc2626' });
      Q42.T(ctx, 'أشعة من جسم بعيد جداً تصل متوازية', box.x0 + 170, g.ay - 240, { s: 12, w: 900, c: '#fff', bg: '#b45309' }); Q41.knob(ctx, box.x0 + 24, g.ay - (g.vx - box.x0 - 24) * Math.tan(a), '#b45309', 12);
      Q42.card(ctx, S, [{ t: 'الأشعة تصل متوازية وتتجمع في المستوي البؤري', c: '#0f172a', w: 800 }, { t: 'موقع الصورة: في البؤرة', c: '#0f172a', w: 900 }, { t: 'حقيقية ، مقلوبة ، مصغرة جداً', c: '#dc2626', w: 900 }], { title: 'فكر: جسم في اللانهاية', y: 70, wd: 310 }); },
    chips(S, g) { return Q42.chips(S, 'cs', CASES.map(q => [q[0], q[1]]), g.h - 84, S.cs, (S2, k) => { S2.cs = k; const q = CASES.find(q => q[0] === k); if (q[2]) S2.uT = q[2] * (S2.p.f || 10); }, { bw: 112 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = []; if (S.cs !== 'inf') L.push({ id: 'obj', x: g.vx - S.u * g.px, y: g.ay - (S.p.h || 6) * g.px * .6, r: 26, axis: 'x', keep: true, tip: 'اسحب الشمعة على المحور', idle: 'اسحب ✋', drag: (S2, d) => { const f = S2.p.f || 10; S2.uT = clamp((g.vx - d.x) / g.px, 2, (g.vx - g.L - 20) / g.px); S2.u = S2.uT; const r = S2.uT / f; S2.cs = Math.abs(r - 2) < .04 ? 'c' : Math.abs(r - 1) < .03 ? 'f' : r > 2 ? 'g2f' : r > 1 ? 'fc' : 'in'; if (Math.abs(r - 2) < .04) S2.uT = S2.u = 2 * f; if (Math.abs(r - 1) < .03) S2.uT = S2.u = f; } });
      else L.push({ id: 'beam', x: g.box.x0 + 24, y: g.ay - (g.vx - g.box.x0 - 24) * Math.tan(S.ia), r: 22, axis: 'y', keep: true, tip: 'اسحب لتغيير اتجاه الأشعة القادمة', idle: 'اسحب ✋', drag: (S2, d) => { S2.ia = clamp(Math.atan((g.ay - d.y) / (g.vx - g.box.x0 - 24)), -.2, .2); } });
      return L.concat(D.chips(S, g)); },
    readings(S) { const f = S.p.f || 10; if (S.cs === 'inf') return [rd('بعد الجسم', '∞'), rd('موقع الصورة', 'في البؤرة')]; const P = Q47.props(f, S.u); return [rd('بعد الجسم u', Q47.n(S.u, 1) + ' cm'), rd('بعد الصورة v', isFinite(P.v) ? Q47.n(P.v, 1) + ' cm' : '∞'), rd('التكبير M', isFinite(P.M) ? Q47.n(P.M, 2) : '∞'), rd('موقع الصورة', Q47.where(f, S.u)), rd('صفاتها', P.txt)]; },
    record(S) { const P = Q47.props(S.p.f || 10, S.u); return S.cs === 'inf' ? null : { u: +S.u.toFixed(1), v: isFinite(P.v) ? +P.v.toFixed(1) : '∞', m: isFinite(P.M) ? +P.M.toFixed(2) : '∞' }; }, cols: [['u', 'u (cm)'], ['v', 'v (cm)'], ['m', 'M']],
    explain(S) { return Q26.ex('كلما اقتربت الشمعة من البؤرة ابتعدت صورتها الحقيقية المقلوبة وكبرت، وعند البؤرة تختفي، وداخلها تظهر صورة معتدلة مكبرة خلف المرآة.', 'الأشعة الثلاثة الخاصة (الموازي، المار بالبؤرة، المار بمركز التكور) تلتقي بعد الانعكاس في رأس الصورة. إذا التقت الأشعة نفسها فالصورة حقيقية، وإذا التقت امتداداتها خلف المرآة فالصورة خيالية.', 'طبيب الأسنان يضع المرآة المقعرة قريبة من السن (أقل من f) فيرى صورة معتدلة مكبرة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D3 — خصائص الصورة في المرآة المحدبة + النشاط 3 (7-6، الشكلان 20-7 و 21-7) =============== */
(() => {
  const D = { id: 'g10_mr_convex', page: 121, fig: 'الشكلان 20-7 و 21-7 + النشاط 3',
    desc: 'الشعاع الموازي للمحور ينعكس عن المرآة المحدبة بحيث يمر امتداده بالبؤرة، والشعاع المتجه نحو البؤرة ينعكس موازياً للمحور. المرآة المحدبة تفرق الأشعة لذلك تسمى المرآة المفرقة. في النشاط 3 نحاول أن نكوّن صورة للشمعة على حاجز فلا ننجح؛ فمهما كان بعد الجسم عن المرآة المحدبة فإن صورته خيالية معتدلة مصغرة.',
    tags: 'المرآة المحدبة المفرقة النشاط 3 حاجز صورة خيالية معتدلة مصغرة خلف المرآة بين القطب والبؤرة البؤرة التقديرية مقارنة مقعرة',
    tools: ['مرآة محدبة على حامل', 'شمعة', 'حاجز'],
    steps: ['اسحب الشمعة بعيداً عن المرآة وقريباً منها: أين تقع صورتها؟ وهل تتغير صفاتها؟', 'اسحب الحاجز إلى أي موضع أمام المرآة: هل تظهر صورة الشمعة عليه؟', 'انظر في المرآة (الدائرة في الأعلى): الصورة معتدلة مصغرة، وتكبر قليلاً كلما اقتربت الشمعة.', 'اختر «قارن مع المقعرة» لترى الجسم نفسه أمام المرآتين.'],
    concl: ['المرآة المحدبة تفرق الأشعة الضوئية (مرآة مفرقة).', 'مهما كان بعد الجسم فإن صورته في المرآة المحدبة خيالية ، معتدلة ، مصغرة.', 'تقع الصورة خلف المرآة بين القطب والبؤرة، ولا يمكن استلامها على حاجز.'],
    laws: ['g10_mr_eq', 'g10_mr_M'],
    controls: [R('f', 'البعد البؤري |f|', 8, 14, 10, 1, 'cm'), R('h', 'طول الجسم h', 3, 8, 6, .5, 'cm'), TG('r1', 'الشعاع الموازي', true, null, 'ray'), TG('r2', 'الشعاع المتجه نحو البؤرة', true, null, 'ray'), TG('r3', 'الشعاع المتجه نحو مركز التكور', false, null, 'ray'), TG('scr', 'الحاجز', true, null, 'eye')],
    setup(S) { S.md = 'one'; S.u = 25; S.uT = 25; S.s = 12; S.tt = 0; },
    update(S, dt) { S.tt += dt; S.u += (S.uT - S.u) * Math.min(1, dt * 7); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, vx: Math.round(L + (w - L) * .56), ay: Math.round(h * .56), px: 10 }; },
    draw(ctx, w, h, S) { const g = D.geo(S), f = S.p.f || 10, hc = S.p.h || 6, rays = [1, 2, 3].filter(k => S.p['r' + k] === true || (S.p['r' + k] !== false && k < 3)); Q47.bg(ctx, w, h);
      if (S.md === 'cmp') { const s = .62, y1 = Math.round(h * .3), y2 = Math.round(h * .66), u = Math.min(S.u, 32);
        Q47.diag(ctx, { k: 'cc', vx: w - 130, ay: y1, f: f * 10 * s, u: u * 10 * s, h: hc * 10 * s, box: { x0: g.L, x1: w - 8, y0: y1 - 150, y1: y1 + 130 }, rays, t: S.tt, ap: 2 * f * 10 * s * .7 });
        Q47.diag(ctx, { k: 'cv', vx: Math.round(g.L + (w - g.L) * .5), ay: y2, f: f * 10 * s, u: u * 10 * s, h: hc * 10 * s, box: { x0: g.L, x1: w - 8, y0: y2 - 130, y1: y2 + 90 }, rays, t: S.tt, ap: 2 * f * 10 * s * .6 });
        const P1 = Q47.props(f, u), P2 = Q47.props(-f, u); Q42.T(ctx, 'مقعرة: ' + P1.txt, g.L + 150, y1 - 150, { s: 12, w: 900, c: '#fff', bg: '#0891b2' }); Q42.T(ctx, 'محدبة: ' + P2.txt, g.L + 150, y2 - 120, { s: 12, w: 900, c: '#fff', bg: '#7c3aed' });
      } else { Q47.diag(ctx, { k: 'cv', vx: g.vx, ay: g.ay, f: f * g.px, u: S.u * g.px, h: hc * g.px, box: { x0: g.L, x1: w - 8, y0: g.ay - 270, y1: h - 150 }, rays, t: S.tt, ap: 2 * f * g.px * .7 });
        if (S.p.scr !== false) { const sx = g.vx - S.s * g.px; K.raw(ctx, () => { ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.fillRect(sx - 6, g.ay + 6, 12, 120); ctx.strokeRect(sx - 6, g.ay + 6, 12, 120); }); Q42.T(ctx, 'حاجز: لا صورة', sx, g.ay + 142, { s: 11, w: 900, c: '#fff', bg: '#dc2626' }); }
        const P = Q47.props(-f, S.u); Q47.inset(ctx, g.L + 90, 150, 62, P.M, S.tt, 'تنظر في المرآة', true);
        Q42.card(ctx, S, [{ t: 'u = ' + Q47.n(S.u, 1) + ' cm ، f = −' + f + ' cm', mono: 1 }, { t: 'v = ' + Q47.n(P.v, 2) + ' cm ، M = ' + Q47.n(P.M, 2), mono: 1 }, { t: P.txt, c: '#7c3aed', w: 900 }, { t: 'تقع خلف المرآة بين القطب والبؤرة', c: '#0f172a', w: 800 }], { title: 'المرآة المحدبة (المفرقة)', y: 70, wd: 300 }); }
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, S.md === 'cmp' ? 'الجسم نفسه أمام المرآتين' : 'اسحب الشمعة والحاجز');
    },
    chips(S, g) { return Q42.chips(S, 'md', [['one', 'المرآة المحدبة'], ['cmp', 'قارن مع المقعرة']], g.h - 84, S.md, (S2, k) => { S2.md = k; if (k === 'cmp') S2.uT = Math.min(S2.uT, 25); }, { bw: 170 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = []; if (S.md === 'one') { L.push({ id: 'obj', x: g.vx - S.u * g.px, y: g.ay - (S.p.h || 6) * g.px * .6, r: 26, axis: 'x', keep: true, tip: 'اسحب الشمعة', idle: 'اسحب ✋', drag: (S2, d) => { S2.uT = clamp((g.vx - d.x) / g.px, 3, (g.vx - g.L - 24) / g.px); S2.u = S2.uT; } });
        if (S.p.scr !== false) L.push({ id: 'scr', x: g.vx - S.s * g.px, y: g.ay + 66, r: 24, axis: 'x', keep: true, hint: false, tip: 'اسحب الحاجز', drag: (S2, d) => { S2.s = clamp((g.vx - d.x) / g.px, 2, (g.vx - g.L - 20) / g.px); } }); }
      else L.push({ id: 'obj', x: S.W - 130 - Math.min(S.u, 32) * 6.2, y: Math.round(S.H * .3) - 20, r: 24, axis: 'x', keep: true, tip: 'اسحب الشمعة', idle: 'اسحب ✋', drag: (S2, d) => { S2.uT = clamp((S2.W - 130 - d.x) / 6.2, 3, 32); S2.u = S2.uT; } });
      return L.concat(D.chips(S, g)); },
    readings(S) { const P = Q47.props(-(S.p.f || 10), S.u); return [rd('بعد الجسم u', Q47.n(S.u, 1) + ' cm'), rd('بعد الصورة v', Q47.n(P.v, 2) + ' cm'), rd('التكبير M', Q47.n(P.M, 2)), rd('صفاتها', P.txt)]; },
    record(S) { const P = Q47.props(-(S.p.f || 10), S.u); return { u: +S.u.toFixed(1), v: +P.v.toFixed(2), m: +P.M.toFixed(2) }; }, cols: [['u', 'u (cm)'], ['v', 'v (cm)'], ['m', 'M']],
    explain(S) { return Q26.ex('أينما وضعت الشمعة أمام المرآة المحدبة تبقى صورتها خلف المرآة صغيرة ومعتدلة، ولا تظهر على أي حاجز.', 'المرآة المحدبة تفرق الأشعة؛ فالأشعة المنعكسة لا تلتقي أبداً، بل تلتقي امتداداتها خلف المرآة بين القطب والبؤرة، فالصورة خيالية.', 'لهذا تستعمل مرآةً جانبية في السيارات ومرآة مراقبة في الأسواق: تعطي صوراً مصغرة ومجال رؤية واسعاً.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E1 — القانون العام للمرايا وقانون التكبير + الأمثلة 1 و 2 و 3 (7-7، 7-8، الشكل 24-7، ص 122–127) =============== */
(() => {
  const EX = {
    e1: { t: 'مثال 1', title: 'مثال 1 ص 124', q: 'مرآة مقعرة بعدها البؤري 20 cm، جد موضع الصورة وصفاتها ومقدار التكبير لجسم موضوع على بعد 30 cm أمام المرآة', lines: ['المرآة مقعرة ⟸ f = +20 cm', '1/f = 1/u + 1/v', '1/20 = 1/30 + 1/v', '1/v = 1/20 − 1/30 = (3 − 2)/60 = 1/60', 'الصورة حقيقية: v = 60 cm أبعد من C', 'M = −v/u = −60/30 = −2', 'الصورة حقيقية مقلوبة مكبرة مرتين'], set: { mk: 'cc', f: 20, u: 30, h: 4 } },
    e21: { t: 'مثال 2-1', title: 'مثال 2 (1) ص 125', q: 'مرآة مقعرة بعدها البؤري 15 cm، أين يوضع الجسم لتتكون له صورة حقيقية مكبرة ثلاث مرات؟', lines: ['الصورة حقيقية مقلوبة ⟸ M = −3', 'M = −v/u ⟸ v = 3u', '1/15 = 1/u + 1/(3u)', '1/15 = (3 + 1)/(3u) = 4/(3u)', '3u = 60', 'بعد الجسم u = 20 cm', 'بعد الصورة v = 3 × 20 = 60 cm'], set: { mk: 'cc', f: 15, u: 20, h: 3 } },
    e22: { t: 'مثال 2-2', title: 'مثال 2 (2) ص 125', q: 'المرآة نفسها f = 15 cm، أين يوضع الجسم لتتكون له صورة تقديرية مكبرة ثلاث مرات؟', lines: ['الصورة تقديرية معتدلة ⟸ M = +3', 'M = −v/u ⟸ v = −3u', '1/15 = 1/u − 1/(3u)', '1/15 = (3 − 1)/(3u) = 2/(3u)', '3u = 30', 'بعد الجسم u = 10 cm', 'بعد الصورة v = −30 cm', 'الصورة تقديرية معتدلة مكبرة'], set: { mk: 'cc', f: 15, u: 10, h: 3 } },
    e3: { t: 'مثال 3', title: 'مثال 3 ص 126', q: 'مرآة محدبة نصف قطر تكورها 8 cm وضع أمامها جسم على بعد 6 cm من قطبها. جد بعد الصورة وقوة التكبير', lines: ['f = R/2 = 8/2 = 4 cm', 'المرآة محدبة ⟸ f = −4 cm', '1/v = 1/f − 1/u = −1/4 − 1/6', '1/v = (−3 − 2)/12 = −5/12', 'v = −12/5 = −2.4 cm', 'M = −v/u = 2.4/6 = +0.4', 'الإشارة الموجبة: الصورة خيالية معتدلة مصغرة'], set: { mk: 'cv', f: 4, u: 6, h: 2 } } };
  const SIGN = [{ t: 'u موجب للجسم الحقيقي أمام المرآة', c: '#0f172a', w: 800, s: 11.5 }, { t: 'v موجب للصورة الحقيقية وسالب للخيالية', c: '#0f172a', w: 800, s: 11.5 }, { t: 'f موجب للمقعرة وسالب للمحدبة', c: '#0f172a', w: 800, s: 11.5 }, { t: 'M سالب: حقيقية مقلوبة ، موجب: خيالية معتدلة', c: '#7c3aed', w: 800, s: 11.5 }, { t: 'M أكبر من 1 مكبرة ، أصغر من 1 مصغرة', c: '#7c3aed', w: 800, s: 11.5 }];
  const D = { id: 'g10_mr_eq', page: 122, fig: 'الشكل 24-7 + الأمثلة 1 و 2 و 3',
    desc: 'القانون العام للمرايا يربط بعد الجسم u وبعد الصورة v عن قطب المرآة بالبعد البؤري f: 1/f = 1/u + 1/v. قواعد الإشارات: u موجب للجسم الحقيقي، v موجب للصورة الحقيقية وسالب للخيالية، f موجب للمقعرة وسالب للمحدبة. والتكبير M = h′/h = −v/u: سالب للصورة الحقيقية المقلوبة وموجب للخيالية المعتدلة، ومقداره يبين التكبير أو التصغير.',
    tags: 'القانون العام للمرايا 1/f=1/u+1/v التكبير M=h/h=-v/u الإشارات طول الجسم طول الصورة مثال 1 60cm -2 مثال 2 20cm 10cm مثال 3 -2.4 0.4',
    tools: ['مسطبة بصرية مدرجة بالسنتيمتر', 'مرآة مقعرة ومرآة محدبة', 'شمعة'],
    steps: ['اسحب الشمعة (أو غيّر u من لوحة التحكم) وراقب التعويض في القانون العام لحظة بلحظة.', 'لاحظ الإشارات: v سالب عندما تكون الصورة خلف المرآة، و f سالب للمحدبة.', 'اختر مثالاً من الكتاب: تضبط الأجهزة على معطياته، ثم اضغط «الخطوة التالية» لكشف الحل.', 'فعّل «قواعد الإشارات» لتراجعها.'],
    concl: ['1/f = 1/u + 1/v مع مراعاة الإشارات.', 'M = h′/h = −v/u.', 'مثال 1: v = 60 cm ، M = −2 (حقيقية مقلوبة مكبرة مرتين).', 'مثال 2: حقيقية ⟸ u = 20 cm و v = 60 cm ، تقديرية ⟸ u = 10 cm و v = −30 cm.', 'مثال 3: v = −2.4 cm ، M = +0.4 (خيالية معتدلة مصغرة).'],
    laws: ['g10_mr_eq', 'g10_mr_M', 'g10_mr_fR'],
    controls: [R('f', 'البعد البؤري |f|', 4, 30, 20, 1, 'cm'), R('u', 'بعد الجسم u', 2, 90, 30, 1, 'cm'), R('h', 'طول الجسم h', 1, 10, 4, .5, 'cm'), TG('sg', 'قواعد الإشارات', false, null, 'labels'), TG('rays', 'الأشعة', true, null, 'ray')],
    setup(S) { S.mk = 'cc'; S.ex = ''; S.k = 0; S.z = 8; S.uv = S.p.u || 30; S.tt = 0; },
    update(S, dt) { S.tt += dt; S.uv += ((S.p.u || 30) - S.uv) * Math.min(1, dt * 8); const virt = S.mk === 'cc' && (S.p.u || 30) < (S.p.f || 20) ? 110 : 0; S.vxo = (S.vxo || 0) + (virt - (S.vxo || 0)) * Math.min(1, dt * 4); S.z += (D.zoom(S) - S.z) * Math.min(1, dt * 4); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), cc = S.mk === 'cc', vx = Math.round(cc ? w - 170 - (S.vxo || 0) : L + (w - L) * .62), ay = Math.round(h * .56); return { w, h, L, cc, vx, ay, box: { x0: L, x1: w - 8, y0: ay - 200, y1: h - 150 } }; },
    zoom(S) { if (!S.W) return 8; const g = D.geo(S), f = S.p.f || 20, u = S.p.u || 30, P = Q47.props(g.cc ? f : -f, u); let front = Math.max(u, g.cc ? 2 * f : 0) * 1.08, back = g.cc ? 0 : 2 * f; if (isFinite(P.v)) { if (P.v > 0) front = Math.max(front, Math.min(P.v, 200)); else back = Math.max(back, -P.v); }
      return clamp(Math.min((g.vx - g.L - 30) / front, back ? (g.w - g.vx - 20) / back : 99), 2, 16); },
    draw(ctx, w, h, S) { const g = D.geo(S), f = S.p.f || 20, u = S.uv, hc = S.p.h || 4, z = S.z, ff = g.cc ? f : -f, P = Q47.props(ff, u); Q47.bg(ctx, w, h);
      Q47.diag(ctx, { k: S.mk, vx: g.vx, ay: g.ay, f: f * z, u: u * z, h: hc * z, box: g.box, rays: S.p.rays === false ? [] : [1, 2, 3], t: S.tt, ap: Math.min(2 * f * z * .8, 130) });
      // centimetre ruler along the axis
      K.raw(ctx, () => { ctx.strokeStyle = 'rgba(15,23,42,.5)'; ctx.lineWidth = 1; const st = z > 8 ? 1 : z > 4 ? 2 : 5; for (let c = -Math.floor((g.w - g.vx) / z); c * z < g.vx - g.L; c++) { if (c % st) continue; const x = g.vx - c * z, L = c % (st * 5) === 0 ? 8 : 4; ctx.beginPath(); ctx.moveTo(x, g.ay + 3); ctx.lineTo(x, g.ay + 3 + L); ctx.stroke(); } });
      Q47.dim(ctx, g.vx - u * z, g.vx, g.ay + 140, 'u = ' + Q47.n(u, 1) + ' cm', '#b45309');
      if (isFinite(P.v) && Math.abs(P.v) * z < 600) Q47.dim(ctx, Math.min(g.vx, g.vx - P.v * z), Math.max(g.vx, g.vx - P.v * z), g.ay + 176, 'v = ' + Q47.n(P.v, 1) + ' cm', P.v > 0 ? '#dc2626' : '#7c3aed');
      if (S.ex) Q47.stepsCard(ctx, S, Object.assign({}, EX[S.ex], { k: S.k }), { wd: 330 });
      else { const iv = 1 / ff - 1 / u; Q42.card(ctx, S, [{ t: '1/f = 1/u + 1/v', mono: 1, c: '#0e7490', w: 900 }, { t: '1/v = 1/(' + Q47.n(ff, 1) + ') − 1/' + Q47.n(u, 1), mono: 1 }, { t: 'v = ' + (Math.abs(iv) < 1e-9 ? '∞' : Q47.n(1 / iv, 2) + ' cm'), mono: 1, c: '#dc2626', w: 900 }, isFinite(P.M) ? { t: 'M = −v/u = ' + Q47.n(P.M, 2), mono: 1, c: '#dc2626', w: 900 } : { t: 'M = ∞', mono: 1 }, isFinite(P.M) ? { t: "h′ = M h = " + Q47.n(P.M * hc, 2) + ' cm', mono: 1 } : { t: '—' }, { t: P.txt, c: P.real ? '#dc2626' : '#7c3aed', w: 900 }], { title: g.cc ? 'مرآة مقعرة f = +' + f + ' cm' : 'مرآة محدبة f = −' + f + ' cm', y: 70, wd: 310 }); }
      if (S.p.sg) Q42.card(ctx, S, SIGN, { title: 'قواعد الإشارات', x: g.L + 360, y: 56, wd: 350 });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a); Q42.drawChips(ctx, C.b);
      Q42.banner(ctx, w, S.ex ? 'اضغط «الخطوة التالية» لكشف الحل' : 'اسحب الشمعة وراقب القانون العام');
    },
    chips(S, g) { const a = Q42.chips(S, 'mk', [['cc', 'مرآة مقعرة'], ['cv', 'مرآة محدبة']], g.h - 84, S.mk, (S2, k) => { S2.mk = k; S2.ex = ''; }, { bw: 150 });
      const b = Q42.chips(S, 'ex', Object.keys(EX).map(k => [k, EX[k].t]).concat([['nx', '⬇ الخطوة التالية']]), g.h - 128, S.ex, (S2, k) => { if (k === 'nx') { if (!S2.ex) return D.pick(S2, 'e1'); S2.k = Math.min(S2.k + 1, EX[S2.ex].lines.length); return; } if (S2.ex === k) { S2.ex = ''; return; } D.pick(S2, k); }, { bw: 130 });
      return { a, b }; },
    pick(S, k) { const e = EX[k].set; S.ex = k; S.k = 0; S.mk = e.mk; setParam(S, 'f', e.f); setParam(S, 'u', e.u); setParam(S, 'h', e.h); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g); return [{ id: 'obj', x: g.vx - S.uv * S.z, y: g.ay - (S.p.h || 4) * S.z * .6, r: 26, axis: 'x', keep: true, tip: 'اسحب الشمعة', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'u', clamp(Math.round((g.vx - d.x) / S2.z), 2, 90)); S2.ex = ''; } }].concat(C.a, C.b); },
    readings(S) { const f = S.p.f || 20, ff = S.mk === 'cc' ? f : -f, P = Q47.props(ff, S.p.u || 30); return [rd('البعد البؤري f', Q47.n(ff, 1) + ' cm'), rd('بعد الجسم u', (S.p.u || 30) + ' cm'), rd('بعد الصورة v', isFinite(P.v) ? Q47.n(P.v, 2) + ' cm' : '∞'), rd('التكبير M', isFinite(P.M) ? Q47.n(P.M, 2) : '∞'), rd('طول الصورة h′', isFinite(P.M) ? Q47.n(P.M * (S.p.h || 4), 2) + ' cm' : '∞'), rd('صفاتها', P.txt)]; },
    record(S) { const f = S.p.f || 20, ff = S.mk === 'cc' ? f : -f, P = Q47.props(ff, S.p.u || 30); return { f: ff, u: S.p.u, v: isFinite(P.v) ? +P.v.toFixed(2) : '∞', m: isFinite(P.M) ? +P.M.toFixed(2) : '∞' }; }, cols: [['f', 'f (cm)'], ['u', 'u (cm)'], ['v', 'v (cm)'], ['m', 'M']],
    explain(S) { return Q26.ex('كلما غيرت بعد الجسم يتغير بعد الصورة وطولها، والقانون العام يعطي النتيجة نفسها التي يعطيها مخطط الأشعة.', 'القانون 1/f = 1/u + 1/v يأتي من تشابه المثلثات في مخطط الأشعة. الإشارات تميز الحقيقي (موجب) من الخيالي (سالب)، والتكبير −v/u يخبرنا هل الصورة مقلوبة (سالب) أم معتدلة (موجب) ومقدار تكبيرها.', 'يستعمل المصممون هذا القانون لتحديد موضع المصباح في عاكس السيارة وموضع الكاشف في التلسكوب.'); }
  };
  M8.P[D.id] = D;
})();

/* top-view car (heading up) */
Q47.car = (ctx, x, y, col, s = 1, o = {}) => K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (o.rot) ctx.rotate(o.rot); ctx.fillStyle = 'rgba(15,23,42,.25)'; rr(ctx, -27, -52, 58, 108, 14); ctx.fill(); const g = ctx.createLinearGradient(-28, 0, 28, 0); g.addColorStop(0, shade(col, -30)); g.addColorStop(.5, shade(col, 25)); g.addColorStop(1, shade(col, -30)); ctx.fillStyle = g; rr(ctx, -28, -54, 56, 108, 14); ctx.fill();
  ctx.fillStyle = '#1e293b'; rr(ctx, -22, -30, 44, 20, 5); ctx.fill(); rr(ctx, -22, 26, 44, 14, 5); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.25)'; rr(ctx, -18, -8, 36, 30, 6); ctx.fill(); ctx.fillStyle = '#fde047'; ctx.fillRect(-24, -54, 10, 4); ctx.fillRect(14, -54, 10, 4); ctx.fillStyle = '#dc2626'; ctx.fillRect(-24, 50, 10, 4); ctx.fillRect(14, 50, 10, 4); ctx.restore(); });
/* rear view of a car (what is seen in a mirror) */
Q47.carBack = (ctx, x, y, s, col, inv) => K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, inv ? -s : s); ctx.fillStyle = col; rr(ctx, -30, -22, 60, 36, 8); ctx.fill(); ctx.fillStyle = '#1e293b'; rr(ctx, -22, -36, 44, 18, 6); ctx.fill(); ctx.fillStyle = '#fde047'; ctx.fillRect(-26, -8, 12, 6); ctx.fillRect(14, -8, 12, 6); ctx.fillStyle = '#111827'; ctx.fillRect(-26, 14, 12, 8); ctx.fillRect(14, 14, 12, 8); ctx.restore(); });

/* =============== F1 — تطبيقات المرآة المستوية والمحدبة: مرايا السيارة ومرآة المراقبة (الأشكال 25-7 إلى 27-7 و 31-7 و 32-7 + س2) =============== */
(() => {
  const RM = [0, 260, 150, 100, 72, 55];
  const D = { id: 'g10_mr_car', page: 127, fig: 'الأشكال 27-7 و 31-7 و 32-7 + س2 ص 131',
    desc: 'المرآة الأمامية المستوية أمام السائق (العين الثالثة) يرى بها ما خلف السيارة، والمرآة المحدبة على جانبي السائق تسمى مرآة القيادة لأنها تعطي صوراً مصغرة ومعتدلة ومجال رؤية أوسع وأشمل. وتستعمل المحدبة أيضاً في الأسواق لمراقبة المتسوقين. أما المقعرة فلا تصلح مرآة جانبية لأنها تعطي للأجسام البعيدة صوراً مقلوبة ومجالاً ضيقاً.',
    tags: 'مرآة السيارة الجانبية محدبة مجال رؤية أوسع صور مصغرة معتدلة المرآة الأمامية مستوية العين الثالثة مرآة القيادة مراقبة المتسوقين السوق س2 مرآة مقعرة على جانبي السيارة',
    tools: ['سيارة بمرآة جانبية', 'مرآة أمامية داخلية', 'سيارات خلفها'],
    steps: ['اسحب السيارة الزرقاء في المسار الأيسر إلى الخلف وإلى الأمام: متى تظهر في المرآة الجانبية؟', 'بدّل المرآة الجانبية بين المستوية والمحدبة: قارن عرض المنطقة المضيئة (مجال الرؤية) وحجم صورة السيارة.', 'غيّر «درجة تحدب المرآة» من لوحة التحكم.', 'جرّب «مقعرة؟» (س2): لماذا لا تصلح؟ ثم فعّل المرآة الأمامية الداخلية.'],
    concl: ['المرآة المحدبة تعطي مجال رؤية أوسع وأشمل وصوراً مصغرة معتدلة؛ لذلك توضع على جانبي السائق.', 'المرآة الأمامية المستوية (العين الثالثة) تعطي صورة معتدلة بحجم طبيعي لما خلف السيارة.', 'س2: الاقتراح غير صحيح؛ المقعرة تعطي للأجسام البعيدة صوراً حقيقية مقلوبة ومجال رؤية ضيقاً.', 'تستعمل المرايا المحدبة في الأسواق لمراقبة حركة المتسوقين.'],
    laws: ['g10_mr_plane', 'g10_mr_eq'],
    controls: [R('cur', 'درجة تحدب المرآة الجانبية', 1, 5, 3, 1, ''), TG('fan', 'مجال الرؤية', true, null, 'ray'), TG('in', 'المرآة الأمامية الداخلية', true, null, 'eye')],
    setup(S) { S.mk = 'cv'; S.ya = 210; S.yb = 260; S.yav = 210; S.tt = 0; },
    update(S, dt) { S.tt += dt; S.yav += (S.ya - S.yav) * Math.min(1, dt * 8); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 30, lane = 150, cy = 150; return { w, h, L, x0, lane, lx: x0 + lane / 2, dx: x0 + lane * 1.5, cy, x1: x0 + 2 * lane, yb: h - 160 }; },
    /* fan of reflected eye rays from a small mirror centred at P, front normal n, half width a, radius Rm (+ convex, − concave, 0 plane) */
    fan(E, P, n, a, Rm) { const t = [-n[1], n[0]], out = []; for (let i = 0; i <= 10; i++) { const s = -a + 2 * a * i / 10, Q = [P[0] + t[0] * s, P[1] + t[1] * s], ang = Rm ? s / Rm : 0, c = Math.cos(ang), sn = Math.sin(ang), nn = [n[0] * c - n[1] * sn, n[0] * sn + n[1] * c], d = Q47.nrm([Q[0] - E[0], Q[1] - E[1]]); out.push({ Q, r: Q47.refl(d, nn), s: i / 10 }); } return out; },
    sees(F, C, rad) { let best = null; F.forEach(o => { const v = [C[0] - o.Q[0], C[1] - o.Q[1]], t = v[0] * o.r[0] + v[1] * o.r[1]; if (t <= 0) return; const dd = Math.abs(v[0] * o.r[1] - v[1] * o.r[0]); if (dd < rad && (!best || dd < best.dd)) best = { s: o.s, dd, t }; }); return best; },
    model(S, g) { const E = [g.dx - 12, g.cy + 18], Pm = [g.dx - 40, g.cy - 24], nm = Q47.nrm([.17, 1]), Rm = S.mk === 'pl' ? 0 : S.mk === 'cv' ? RM[S.p.cur || 3] : -RM[S.p.cur || 3] * .5, F = D.fan(E, Pm, nm, 7, Rm);
      const Pi = [g.dx - 2, g.cy - 34], ni = Q47.nrm([-.12, 1]), Fi = D.fan(E, Pi, ni, 11, 0); const A = [g.lx, g.cy + S.yav], B = [g.dx, g.cy + S.yb]; return { E, Pm, nm, Rm, F, Pi, ni, Fi, A, B, sa: D.sees(F, A, 34), sai: D.sees(Fi, A, 30), sbi: D.sees(Fi, B, 30), sb: D.sees(F, B, 30) }; },
    draw(ctx, w, h, S) { const g = D.geo(S), M = D.model(S, g), box = { x0: g.L, x1: g.x1 + 30, y0: 40, y1: g.yb };
      Q47.bg(ctx, w, h); K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(g.x0, 40, 2 * g.lane, g.yb - 40); ctx.fillStyle = '#86efac'; ctx.fillRect(g.L, 40, g.x0 - g.L, g.yb - 40); ctx.fillRect(g.x1, 40, 30, g.yb - 40); ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 3; ctx.setLineDash([22, 18]); ctx.lineDashOffset = -S.tt * 60; ctx.beginPath(); ctx.moveTo(g.x0 + g.lane, 40); ctx.lineTo(g.x0 + g.lane, g.yb); ctx.stroke(); ctx.setLineDash([]); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(g.x0 + 3, 40); ctx.lineTo(g.x0 + 3, g.yb); ctx.moveTo(g.x1 - 3, 40); ctx.lineTo(g.x1 - 3, g.yb); ctx.stroke(); });
      const fanPoly = (F, col) => { const a = F[0], b = F[F.length - 1], ea = Q47.exit(a.Q, a.r, box), eb = Q47.exit(b.Q, b.r, box); K.raw(ctx, () => { ctx.save(); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(a.Q[0], a.Q[1]); ctx.lineTo(ea[0], ea[1]); if (Math.abs(ea[0] - eb[0]) > 1 && Math.abs(ea[1] - eb[1]) > 1) ctx.lineTo(ea[1] > eb[1] ? eb[0] : ea[0], Math.max(ea[1], eb[1])); ctx.lineTo(eb[0], eb[1]); ctx.lineTo(b.Q[0], b.Q[1]); ctx.closePath(); ctx.fill(); ctx.restore(); }); [a, b].forEach(o => Q47.ray(ctx, [o.Q, Q47.exit(o.Q, o.r, box)], col.replace(/[\d.]+\)$/, '.9)'), { w: 1.6, glow: false, arrows: false })); };
      if (S.p.fan !== false) { if (S.mk === 'cc') M.F.forEach((o, i) => { if (i % 2 === 0) Q47.ray(ctx, [o.Q, Q47.exit(o.Q, o.r, box)], 'rgba(220,38,38,.75)', { w: 1.4, glow: false, arrows: false }); }); else fanPoly(M.F, S.mk === 'cv' ? 'rgba(250,204,21,.35)' : 'rgba(56,189,248,.35)'); if (S.p.in !== false) fanPoly(M.Fi, 'rgba(167,139,250,.3)'); }
      Q47.car(ctx, M.A[0], M.A[1], '#2563eb'); Q47.car(ctx, M.B[0], M.B[1], '#16a34a'); Q47.car(ctx, g.dx, g.cy, '#dc2626');
      Q47.seg(ctx, [M.Pm[0] - 7 * -M.nm[1], M.Pm[1] - 7 * M.nm[0]], [M.Pm[0] + 7 * -M.nm[1], M.Pm[1] + 7 * M.nm[0]], M.nm, { th: 4 }); K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(M.E[0], M.E[1], 5, 0, TAU); ctx.fill(); });
      Q42.T(ctx, 'السائق', g.dx + 52, g.cy + 6, { s: 11, w: 900, c: '#fff', bg: '#dc2626' });
      if (!M.sa && !M.sai) Q42.T(ctx, 'منطقة عمياء!', M.A[0], M.A[1] + 74, { s: 12, w: 900, c: '#fff', bg: '#dc2626' });
      // driver's views
      const vx = w - 175, vy = 320; D.view(ctx, S, vx, vy, 'المرآة الجانبية', M.F, M, M.Rm, [[M.sa, '#2563eb', M.A], [M.sb, '#16a34a', M.B]]);
      if (S.p.in !== false) D.view(ctx, S, vx, vy + 150, 'المرآة الأمامية: العين الثالثة', M.Fi, M, 0, [[M.sai, '#2563eb', M.A], [M.sbi, '#16a34a', M.B]]);
      const tx = { pl: ['مرآة مستوية', 'صورة معتدلة بحجمها الطبيعي', 'مجال رؤية ضيق'], cv: ['مرآة محدبة', 'صور مصغرة معتدلة', 'مجال رؤية أوسع وأشمل'], cc: ['مرآة مقعرة؟', 'صور مقلوبة للأجسام البعيدة', 'الاقتراح غير صحيح'] }[S.mk];
      Q42.card(ctx, S, [{ t: tx[1], c: '#0f172a', w: 900 }, { t: tx[2], c: S.mk === 'cc' ? '#dc2626' : '#0f766e', w: 900 }], { title: 'المرآة الجانبية: ' + tx[0], y: 60, wd: 300 });
      Q42.drawChips(ctx, D.chips(S, g)); Q42.banner(ctx, w, 'اسحب السيارة الزرقاء وبدّل نوع المرآة'); },
    view(ctx, S, x, y, title, F, M, Rm, cars) { const W = 300, H = 110; K.raw(ctx, () => { ctx.fillStyle = '#111827'; rr(ctx, x - W / 2 - 8, y - H / 2 - 8, W + 16, H + 16, 22); ctx.fill(); ctx.save(); rr(ctx, x - W / 2, y - H / 2, W, H, 16); ctx.clip(); const g = ctx.createLinearGradient(0, y - H / 2, 0, y + H / 2); g.addColorStop(0, '#bae6fd'); g.addColorStop(.5, '#e0f2fe'); g.addColorStop(.52, '#64748b'); g.addColorStop(1, '#475569'); ctx.fillStyle = g; ctx.fillRect(x - W / 2, y - H / 2, W, H); ctx.restore(); });
      cars.forEach(q => { const o = q[0]; if (!o) return; const dist = o.t + 40, cur = S.p.cur || 3, base = Rm > 0 ? [0, .78, .64, .52, .43, .36][cur] : Rm < 0 ? -.45 : 1, sc = clamp(base * 160 / dist, -1.6, 1.6), inv = sc < 0; K.raw(ctx, () => { ctx.save(); rr(ctx, x - W / 2, y - H / 2, W, H, 16); ctx.clip(); Q47.carBack(ctx, x - W / 2 + 20 + (W - 40) * (1 - o.s), y + 6, Math.abs(sc), q[1], inv); ctx.restore(); }); });
      Q42.T(ctx, title, x, y + H / 2 + 22, { s: 11.5, w: 900, c: '#fff', bg: '#0e7490' }); },
    chips(S, g) { return Q42.chips(S, 'mk', [['pl', 'مستوية'], ['cv', 'محدبة'], ['cc', 'مقعرة؟ س2']], g.h - 84, S.mk, (S2, k) => { S2.mk = k; }, { bw: 140 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'carA', x: g.lx, y: g.cy + S.yav, r: 34, axis: 'y', keep: true, tip: 'اسحب السيارة الزرقاء', idle: 'اسحب ✋', drag: (S2, d) => { S2.ya = clamp(d.y - g.cy, 60, g.yb - g.cy - 60); } },
      { id: 'carB', x: g.dx, y: g.cy + S.yb, r: 34, axis: 'y', keep: true, hint: false, tip: 'اسحب السيارة الخضراء', drag: (S2, d) => { S2.yb = clamp(d.y - g.cy, 130, g.yb - g.cy - 60); } }].concat(D.chips(S, g)); },
    readings(S) { const g = D.geo(S), M = D.model(S, g); return [rd('المرآة الجانبية', { pl: 'مستوية', cv: 'محدبة', cc: 'مقعرة' }[S.mk]), rd('السيارة الزرقاء في المرآة الجانبية', M.sa ? 'تظهر' : 'لا تظهر'), rd('السيارة الزرقاء في المرآة الأمامية', M.sai ? 'تظهر' : 'لا تظهر')]; },
    explain(S) { return Q26.ex('المنطقة التي يراها السائق في المرآة المحدبة أعرض بكثير منها في المستوية، لكن السيارات تبدو أصغر.', 'سطح المرآة المحدبة يغير اتجاه العمود من نقطة إلى أخرى، فتنفرج الأشعة المنعكسة إلى العين على مدى زاوي أوسع، والصورة خيالية معتدلة مصغرة.', 'مرآة القيادة الجانبية ومرايا المراقبة في الأسواق ومنعطفات الطرق محدبة. والمرآة الأمامية مستوية تعطي صورة بحجم طبيعي.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F2 — تطبيقات المرآة المقعرة: مصباح السيارة، الطباخ الشمسي، الطبق اللاقط، مرآة طبيب الأسنان (الأشكال 28-7 إلى 30-7 + هل تعلم) =============== */
(() => {
  const tooth = (ctx, x, y, s) => K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(Math.abs(s), s); ctx.fillStyle = '#fffbeb'; ctx.strokeStyle = '#a8a29e'; ctx.lineWidth = 1.5 / Math.abs(s); ctx.beginPath(); ctx.moveTo(-16, -20); ctx.quadraticCurveTo(-18, -34, -6, -32); ctx.quadraticCurveTo(0, -28, 6, -32); ctx.quadraticCurveTo(18, -34, 16, -20); ctx.quadraticCurveTo(14, 0, 10, 20); ctx.quadraticCurveTo(6, 30, 3, 10); ctx.lineTo(-3, 10); ctx.quadraticCurveTo(-6, 30, -10, 20); ctx.quadraticCurveTo(-14, 0, -16, -20); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#78350f'; ctx.beginPath(); ctx.arc(4, -20, 3.5, 0, TAU); ctx.fill(); ctx.restore(); });
  const D = { id: 'g10_mr_focusapps', page: 128, fig: 'الأشكال 28-7 و 29-7 و 30-7 + هل تعلم ص 129',
    desc: 'تطبيقات المرآة المقعرة: يستعملها أطباء الأسنان لتكبير صورة الأسنان، وفي مصابيح السيارة الأمامية يوضع المصباح في بؤرة عاكس على شكل قطع مكافئ فتنعكس الأشعة متوازية وتضيء إلى مسافات بعيدة، وفي الطباخ الشمسي تركز أشعة الشمس في بؤرتها لأغراض التدفئة والطبخ. والطبق اللاقط (الستلايت) يعمل عمل مرآة كبيرة تعكس موجات البث الفضائي وتركزها على وحدة الاستقبال LNB.',
    tags: 'تطبيقات المرآة المقعرة مصباح السيارة الأمامي قطع مكافئ بؤرة أشعة متوازية الطباخ الشمسي تركيز أشعة الشمس الطبق اللاقط الستلايت LNB طبيب الأسنان صورة مكبرة',
    tools: ['عاكس على شكل قطع مكافئ مع مصباح', 'طباخ شمسي وقدر وميزان حرارة', 'طبق لاقط ووحدة LNB', 'مرآة طبيب الأسنان'],
    steps: ['«مصباح السيارة»: اسحب المصباح على المحور: في البؤرة تخرج حزمة متوازية تضيء بعيداً، وخارجها تتفرق أو تتجمع.', '«الطباخ الشمسي»: اسحب القدر إلى البؤرة وراقب ميزان الحرارة، ثم غيّر زاوية الشمس: يجب توجيه الطباخ نحو الشمس.', '«الطبق اللاقط»: اسحب وحدة LNB إلى البؤرة لتحصل على أقوى إشارة.', '«طبيب الأسنان»: اسحب المرآة قريباً من السن (أقل من f) لترى صورة مكبرة معتدلة.'],
    concl: ['المصدر في بؤرة العاكس ⟸ الأشعة المنعكسة متوازية (مصباح السيارة).', 'الأشعة المتوازية القادمة من الشمس تتجمع في البؤرة ⟸ طاقة حرارية للطبخ والتدفئة.', 'الطبق اللاقط يجمع موجات البث في بؤرته حيث توضع وحدة LNB.', 'السن داخل البعد البؤري ⟸ صورة خيالية معتدلة مكبرة (مرآة طبيب الأسنان).'],
    laws: ['g10_mr_fR', 'g10_mr_eq'],
    controls: [R('n', 'عدد الأشعة', 8, 30, 16, 2, ''), R('ang', 'زاوية أشعة الشمس', -15, 15, 0, 1, '°'), TG('wall', 'شدة الإضاءة على الجدار', true, null, 'light')],
    setup(S) { S.md = 'lamp'; S.bx = 70; S.bxv = 70; S.by = 0; S.px = 70; S.py = 0; S.T = 25; S.du = 6; S.duv = 6; S.tt = 0; S.hits = 0; },
    update(S, dt) { S.tt += dt; const k = Math.min(1, dt * 9); S.bxv += (S.bx - S.bxv) * k; S.duv += (S.du - S.duv) * k; if (S.md === 'sun') S.T += ((25 + 9 * S.hits) - S.T) * Math.min(1, dt * .6); else S.T += (25 - S.T) * Math.min(1, dt * .3); },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, vx: w - 150, ay: Math.round(h * .55), fp: 70, ap: 150 }; },
    draw(ctx, w, h, S) { const g = D.geo(S), M = { k: 'par', vx: g.vx, ay: g.ay, R: 2 * g.fp, ap: g.ap }, box = { x0: g.L + 14, x1: w - 8, y0: 50, y1: h - 150 }, n = S.p.n || 16; Q47.bg(ctx, w, h);
      if (S.md === 'lamp') { const B = [g.vx - S.bxv, g.ay + S.by], bins = new Array(24).fill(0);
        K.raw(ctx, () => { ctx.fillStyle = '#334155'; rr(ctx, g.vx - 40, g.ay - g.ap - 24, 90, 2 * g.ap + 48, 20); ctx.fill(); ctx.fillStyle = 'rgba(15,23,42,.85)'; ctx.fillRect(g.L + 4, 60, 10, h - 220); });
        for (let i = 0; i < n * 2; i++) { const a = Math.PI * (-.9 + 1.8 * (i + .5) / (n * 2)), d = [Math.cos(a), Math.sin(a)], H = Q47.mhit(M, B, d); let p0 = B, dd = d, col = 'rgba(250,204,21,.5)'; if (H) { Q47.ray(ctx, [B, H.pt], '#facc15', { w: 1.4, glow: false, arrows: false }); p0 = H.pt; dd = Q47.refl(d, H.n); col = '#f59e0b'; } else if (d[0] > 0) continue;
          if (dd[0] >= -0.02) continue; const e = Q47.exit(p0, dd, box); Q47.ray(ctx, [p0, e], col, { w: 1.6, glow: !!H, arrows: !!H }); if (e[0] <= box.x0 + 1) { const b = Math.floor((e[1] - 60) / ((h - 220) / 24)); if (b >= 0 && b < 24) bins[b] += H ? 1 : .5; } }
        Q47.mirror(ctx, M); Q45.lamp(ctx, B[0], B[1], .55, 30); Q47.pt(ctx, g.vx - g.fp, g.ay, 'F', '#b45309', 22);
        if (S.p.wall !== false) { const mx = Math.max.apply(null, bins.concat([1])); bins.forEach((v, i) => K.raw(ctx, () => { ctx.fillStyle = 'rgba(253,224,71,' + (v / mx * .95).toFixed(2) + ')'; ctx.fillRect(g.L + 14, 60 + i * (h - 220) / 24, 16, (h - 220) / 24 + .5); })); Q42.T(ctx, 'الجدار', g.L + 22, h - 146, { s: 11, w: 900, c: '#334155' }); }
        const off = Math.abs(S.bxv - g.fp) < 3 && Math.abs(S.by) < 3; Q42.card(ctx, S, [{ t: off ? 'المصباح في البؤرة' : S.bxv < g.fp ? 'المصباح بين البؤرة والعاكس' : 'المصباح أبعد من البؤرة', c: '#0f172a', w: 900 }, { t: off ? 'الأشعة المنعكسة متوازية: إضاءة بعيدة' : S.bxv < g.fp ? 'الأشعة المنعكسة تتفرق' : 'الأشعة تتجمع ثم تتفرق', c: off ? '#16a34a' : '#b45309', w: 900 }], { title: 'مصباح السيارة الأمامي', y: 60, wd: 300 }); }
      else if (S.md === 'sun' || S.md === 'dish') { const a = (S.p.ang || 0) * Math.PI / 180, d = [Math.cos(a), Math.sin(a)], P = [g.vx - S.px, g.ay + S.py], rad = S.md === 'sun' ? 18 : 12; let hits = 0;
        if (S.md === 'sun') K.raw(ctx, () => { const sx = g.L + 50, sy = 90 - Math.tan(a) * 0; const gg = ctx.createRadialGradient(sx, sy, 4, sx, sy, 60); gg.addColorStop(0, '#fef9c3'); gg.addColorStop(.35, '#fde047'); gg.addColorStop(1, 'rgba(253,224,71,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(sx, sy, 60, 0, TAU); ctx.fill(); });
        for (let i = 0; i < n; i++) { const y = g.ay - g.ap * .95 + 2 * g.ap * .95 * (i + .5) / n, x0 = g.L + 30, p = [x0, y - (g.vx - x0) * Math.tan(a)], H = Q47.mhit(M, p, d); if (!H) continue; const r = Q47.refl(d, H.n); const col = S.md === 'sun' ? '#f59e0b' : '#38bdf8';
          // does the reflected ray hit the pot / LNB?
          const v = [P[0] - H.pt[0], P[1] - H.pt[1]], t = v[0] * r[0] + v[1] * r[1], dist = Math.abs(v[0] * r[1] - v[1] * r[0]); const blk = t > 0 && dist < rad; if (blk) hits++;
          Q47.ray(ctx, [p, H.pt], col, { w: 1.6, dash: S.md === 'dish' ? [10, 6] : undefined, glow: false }); Q47.ray(ctx, [H.pt, blk ? [H.pt[0] + r[0] * t, H.pt[1] + r[1] * t] : Q47.exit(H.pt, r, box)], col, { w: 1.6, glow: false, dash: S.md === 'dish' ? [10, 6] : undefined }); }
        S.hits = S.md === 'sun' ? hits / n * 13 : hits; Q47.mirror(ctx, M, { glass: S.md === 'dish' ? 'rgba(203,213,225,.95)' : undefined }); Q47.pt(ctx, g.vx - g.fp, g.ay, 'F', '#b45309', 24);
        if (S.md === 'sun') { K.raw(ctx, () => { ctx.fillStyle = '#1f2937'; rr(ctx, P[0] - 20, P[1] - 14, 40, 30, 6); ctx.fill(); ctx.fillStyle = '#4b5563'; ctx.fillRect(P[0] - 24, P[1] - 18, 48, 6); ctx.strokeStyle = '#111827'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(P[0] - 20, P[1]); ctx.lineTo(P[0] - 30, P[1]); ctx.moveTo(P[0] + 20, P[1]); ctx.lineTo(P[0] + 30, P[1]); ctx.stroke(); if (S.T > 90) { ctx.strokeStyle = 'rgba(148,163,184,.8)'; ctx.lineWidth = 2; for (let k = -1; k <= 1; k++) { ctx.beginPath(); for (let j = 0; j < 10; j++) ctx.lineTo(P[0] + k * 10 + Math.sin(S.tt * 4 + j + k) * 3, P[1] - 22 - j * 4); ctx.stroke(); } } });
          const tx = w - 40, ty = 330; K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; rr(ctx, tx - 9, ty - 90, 18, 180, 9); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(tx, ty + 92, 13, 0, TAU); ctx.fill(); const hh = clamp((S.T - 0) / 150, 0, 1) * 170; ctx.fillRect(tx - 4, ty + 85 - hh, 8, hh); });
          Q42.T(ctx, Math.round(S.T) + ' °C', tx - 2, ty - 116, { s: 14, w: 900, c: '#fff', bg: '#dc2626' });
          Q42.card(ctx, S, [{ t: 'أشعة الشمس تصل متوازية', c: '#0f172a', w: 800 }, { t: Math.abs(S.p.ang || 0) > 3 ? 'وجّه الطباخ نحو الشمس' : 'تتجمع في البؤرة F', c: '#b45309', w: 900 }, { t: 'حرارة القدر: ' + Math.round(S.T) + ' °C', c: '#dc2626', w: 900 }], { title: 'الطباخ الشمسي', y: 60, wd: 300 }); }
        else { K.raw(ctx, () => { ctx.save(); ctx.translate(P[0], P[1]); ctx.fillStyle = '#e5e7eb'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; rr(ctx, -14, -12, 34, 24, 5); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#334155'; ctx.fillRect(18, -4, 30, 8); ctx.restore(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(P[0] + 40, P[1]); ctx.lineTo(g.vx - 20, g.ay + g.ap * .6); ctx.stroke(); });
          Q42.T(ctx, 'LNB', P[0], P[1] - 24, { s: 12, w: 900, c: '#fff', bg: '#334155' }); const sig = Math.round(hits / n * 100), bx = g.L + 30, by = 110;
          for (let k = 0; k < 10; k++) K.raw(ctx, () => { ctx.fillStyle = k < sig / 10 ? (sig > 70 ? '#16a34a' : '#f59e0b') : '#cbd5e1'; ctx.fillRect(bx + k * 18, by - k * 5, 14, 20 + k * 5); });
          Q42.T(ctx, 'قوة الإشارة: ' + sig + '%', bx + 90, by + 40, { s: 12, w: 900, c: '#fff', bg: sig > 70 ? '#16a34a' : '#b45309' });
          Q42.card(ctx, S, [{ t: 'الطبق يعكس موجات البث الفضائي', c: '#0f172a', w: 800 }, { t: 'ويركزها في بؤرته على وحدة LNB', c: '#0369a1', w: 900 }], { title: 'هل تعلم: الطبق اللاقط', y: 60, wd: 300 }); } }
      else { const f = 10, z = 10, vx = w - 260, ay = Math.round(h * .55), P = Q47.props(f, S.duv);
        Q47.diag(ctx, { k: 'cc', vx, ay, f: f * z, u: S.duv * z, h: 3 * z, box: { x0: g.L, x1: w - 8, y0: ay - 240, y1: h - 150 }, rays: [1, 2, 3], t: S.tt, ap: 110, obj: (c, x, y, hp, t, op) => K.raw(c, () => { c.save(); c.globalAlpha = op.a ?? 1; tooth(c, x, y - hp / 2, hp / 64); c.restore(); if (op.dash) { c.save(); c.setLineDash([4, 3]); c.strokeStyle = op.dash; c.lineWidth = 1.3; c.strokeRect(x - Math.abs(hp) * .3, Math.min(y, y - hp), Math.abs(hp) * .6, Math.abs(hp)); c.restore(); } }) });
        Q47.inset(ctx, g.L + 100, 160, 70, NaN, 0, 'ما يراه الطبيب', false); K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.arc(g.L + 100, 160, 70, 0, TAU); ctx.clip(); ctx.fillStyle = '#e0f2fe'; ctx.fillRect(g.L + 30, 90, 140, 140); tooth(ctx, g.L + 100, 160, clamp(P.M * .55, -2, 2)); ctx.restore(); });
        Q42.card(ctx, S, [{ t: 'u = ' + Q47.n(S.duv, 1) + ' cm ، f = 10 cm', mono: 1 }, { t: isFinite(P.M) ? 'M = ' + Q47.n(P.M, 2) : 'M = ∞', mono: 1 }, { t: P.txt, c: P.real ? '#dc2626' : '#16a34a', w: 900 }], { title: 'مرآة طبيب الأسنان', y: 60, wd: 300 }); }
      Q42.drawChips(ctx, D.chips(S, g));
      Q42.banner(ctx, w, { lamp: 'اسحب المصباح على محور العاكس', sun: 'اسحب القدر إلى البؤرة', dish: 'اسحب وحدة LNB إلى البؤرة', dent: 'اسحب السن لتغيير بعده عن المرآة' }[S.md]); },
    chips(S, g) { return Q42.chips(S, 'md', [['lamp', 'مصباح السيارة'], ['sun', 'الطباخ الشمسي'], ['dish', 'الطبق اللاقط'], ['dent', 'طبيب الأسنان']], g.h - 84, S.md, (S2, k) => { S2.md = k; }, { bw: 150 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), L = [];
      if (S.md === 'lamp') L.push({ id: 'bulb', x: g.vx - S.bxv, y: g.ay + S.by, r: 22, axis: 'xy', keep: true, tip: 'اسحب المصباح', idle: 'اسحب ✋', drag: (S2, d) => { S2.bx = clamp(g.vx - d.x, 20, 140); S2.by = clamp(d.y - g.ay, -30, 30); if (Math.abs(S2.bx - g.fp) < 5 && Math.abs(S2.by) < 5) { S2.bx = g.fp; S2.by = 0; } } });
      else if (S.md === 'sun' || S.md === 'dish') L.push({ id: 'pot', x: g.vx - S.px, y: g.ay + S.py, r: 24, axis: 'xy', keep: true, tip: S.md === 'sun' ? 'اسحب القدر' : 'اسحب وحدة LNB', idle: 'اسحب ✋', drag: (S2, d) => { S2.px = clamp(g.vx - d.x, 20, 300); S2.py = clamp(d.y - g.ay, -120, 120); } });
      else { const vx = S.W - 260, ay = Math.round(S.H * .55); L.push({ id: 'tooth', x: vx - S.duv * 10, y: ay - 15, r: 24, axis: 'x', keep: true, tip: 'غيّر بعد السن عن المرآة', idle: 'اسحب ✋', drag: (S2, d) => { S2.du = clamp((vx - d.x) / 10, 2, 40); } }); }
      return L.concat(D.chips(S, g)); },
    readings(S) { if (S.md === 'lamp') return [rd('بعد المصباح عن القطب', Q47.n(S.bxv / 10, 1) + ' cm'), rd('البعد البؤري للعاكس', '7 cm')]; if (S.md === 'sun') return [rd('حرارة القدر', Math.round(S.T) + ' °C'), rd('زاوية الشمس', (S.p.ang || 0) + '°')]; if (S.md === 'dish') return [rd('الأشعة الواصلة إلى LNB', String(S.hits))]; const P = Q47.props(10, S.duv); return [rd('بعد السن u', Q47.n(S.duv, 1) + ' cm'), rd('التكبير M', isFinite(P.M) ? Q47.n(P.M, 2) : '∞'), rd('الصورة', P.txt)]; },
    explain(S) { return Q26.ex('المصباح في البؤرة يعطي حزمة متوازية، وأشعة الشمس المتوازية تتجمع في البؤرة فتسخن القدر.', 'مسار الشعاع يمكن عكسه: ما يصل موازياً للمحور ينعكس إلى البؤرة، وما يخرج من البؤرة ينعكس موازياً. والعاكس على شكل قطع مكافئ يجمع كل الأشعة في البؤرة تماماً بلا زيغ كروي.', 'مصابيح السيارات والمصابيح اليدوية، والطباخ الشمسي، والأطباق اللاقطة، ومرآة طبيب الأسنان.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== G1 — أسئلة الفصل السابع ومسائله (ص 130–132) =============== */
(() => {
  const PB = {
    m1: { t: 'م1', title: 'المسألة 1', q: 'تكونت صورة معتدلة باستعمال مرآة مقعرة نصف قطر تقعرها 36 cm، إذا كانت قوة التكبير 3 احسب موضع الجسم', lines: ['f = R/2 = 36/2 = 18 cm', 'الصورة معتدلة ⟸ خيالية: M = +3', 'M = −v/u ⟸ v = −3u', '1/18 = 1/u − 1/(3u) = 2/(3u)', '3u = 36', 'بعد الجسم u = 12 cm'], sc: { k: 'cc', f: 18, u: 12, h: 3 } },
    m2: { t: 'م2', title: 'المسألة 2', q: 'مرآتان مستويتان الزاوية بينهما 120°. احسب عدد الصور المتكونة', lines: ['n = 360° / θ − 1', 'n = 360 / 120 − 1', 'n = 3 − 1', 'عدد الصور n = 2'], sc: { ang: 120 } },
    m3: { t: 'م3', title: 'المسألة 3', q: 'وضع جسم على بعد 4 cm من مرآة فتكونت له صورة تقديرية مكبرة 3 مرات. ما نوع المرآة وما بعدها البؤري؟', lines: ['صورة تقديرية مكبرة ⟸ M = +3', 'v = −3u = −12 cm', '1/f = 1/4 − 1/12 = (3 − 1)/12 = 2/12', 'f = +6 cm', 'f موجب ⟸ المرآة مقعرة'], sc: { k: 'cc', f: 6, u: 4, h: 1.5 } },
    m4: { t: 'م4', title: 'المسألة 4', q: 'جسم أمام مرآة مقعرة بعدها البؤري 12 cm تكونت له صورة حقيقية مكبرة أربع مرات. جد بعد الجسم وبعد الصورة', lines: ['صورة حقيقية مقلوبة ⟸ M = −4', 'v = 4u', '1/12 = 1/u + 1/(4u) = 5/(4u)', '4u = 60', 'بعد الجسم u = 15 cm', 'بعد الصورة v = 4 × 15 = 60 cm'], sc: { k: 'cc', f: 12, u: 15, h: 2 } },
    m5: { t: 'م5', title: 'المسألة 5', q: 'جسم طوله 4 cm أمام مرآة محدبة نصف قطر تكورها 20 cm على بعد 40 cm، جد نوع الصورة وطولها', lines: ['f = −R/2 = −10 cm', '1/v = 1/f − 1/u = −1/10 − 1/40 = −5/40', 'v = −8 cm', 'M = −v/u = 8/40 = 0.2', "h′ = M h = 0.2 × 4 = 0.8 cm", 'صورة تقديرية معتدلة مصغرة طولها 0.8 cm'], sc: { k: 'cv', f: 10, u: 40, h: 4 } },
    q2: { t: 'س2', title: 'السؤال 2', q: 'يقترح أحدهم أن نضع مرآة مقعرة على جانبي السيارة بدلاً من المحدبة. هل اقتراحه صحيح؟ ولماذا؟', lines: ['الاقتراح غير صحيح', 'السيارات خلفنا بعيدة: أبعد من البؤرة', 'المقعرة تعطي لها صوراً حقيقية مقلوبة', 'ومجال رؤيتها ضيق', 'المحدبة تعطي صوراً معتدلة مصغرة ومجال رؤية واسعاً'], sc: { k: 'cc', f: 8, u: 40, h: 5 } },
    q5: { t: 'س5', title: 'السؤال 5', q: 'لماذا لا تتكون صورة لجسم موضوع في بؤرة مرآة مقعرة؟', lines: ['الأشعة الصادرة من البؤرة تنعكس موازية للمحور', 'والأشعة المنعكسة لا تلتقي ولا تلتقي امتداداتها', 'فالصورة في اللانهاية'], sc: { k: 'cc', f: 14, u: 14, h: 4 } },
    q6: { t: 'س6', title: 'السؤال 6', q: 'ما البؤرة الحقيقية وما البؤرة التقديرية؟', lines: ['البؤرة الحقيقية: تلتقي فيها الأشعة المنعكسة نفسها', 'وتقع أمام المرآة المقعرة', 'البؤرة التقديرية: تلتقي فيها امتدادات الأشعة المنعكسة', 'وتقع خلف المرآة المحدبة'], sc: { beam: 1 } },
    q7: { t: 'س7', title: 'السؤال 7', q: 'ميز بين المرآة المحدبة والمقعرة من حيث السطح العاكس وصفات الصور', lines: ['المقعرة: السطح العاكس هو السطح الداخلي', 'صورها حقيقية مقلوبة أو خيالية معتدلة مكبرة حسب بعد الجسم', 'المحدبة: السطح العاكس هو السطح الخارجي', 'صورها دائماً خيالية معتدلة مصغرة'], sc: { beam: 1 } },
    q8a: { t: 'س8 أ', title: 'السؤال 8 (أ)', q: 'بين بالرسم موقع صورة جسم يقع على بعد أكبر من نصف قطر تكور مرآة مقعرة', lines: ['الجسم أبعد من C', 'الصورة بين F و C', 'حقيقية مقلوبة مصغرة'], sc: { k: 'cc', f: 9, u: 32, h: 5 } },
    q8b: { t: 'س8 ب', title: 'السؤال 8 (ب)', q: 'بين بالرسم موقع صورة جسم يقع على بعد أكبر من نصف قطر تكور مرآة محدبة', lines: ['الجسم أبعد من نصف قطر التكور', 'الصورة خلف المرآة بين القطب والبؤرة', 'خيالية معتدلة مصغرة'], sc: { k: 'cv', f: 9, u: 30, h: 5 } } };
  const KEYS = Object.keys(PB);
  const D = { id: 'g10_mr_problems', page: 130, fig: 'الأسئلة والمسائل ص 130–132',
    desc: 'مسائل الفصل السابع وأسئلته على الجهاز: مسائل القانون العام والتكبير للمرايا المقعرة والمحدبة، وعدد الصور في مرآتين متزاويتين، وأسئلة المرآة الجانبية والبؤرة الحقيقية والتقديرية والرسم.',
    tags: 'مسائل الفصل السابع م1 12cm م2 2 م3 6cm مقعرة م4 15cm 60cm م5 0.8cm س2 س5 س6 س7 س8 البؤرة الحقيقية التقديرية',
    tools: ['مخطط الأشعة بمقياس رسم لكل مسألة'],
    steps: ['اختر مسألة أو سؤالاً من الأزرار: يُرسم مخططه بمقياس رسم صحيح.', 'حاول الحل أولاً، ثم اضغط «الخطوة التالية» لكشف الحل خطوة خطوة.', 'قارن الجواب بموقع الصورة في الرسم.'],
    concl: ['م1: u = 12 cm، م2: n = 2.', 'م3: مرآة مقعرة f = +6 cm.', 'م4: u = 15 cm ، v = 60 cm.', 'م5: صورة تقديرية معتدلة مصغرة طولها 0.8 cm.'],
    laws: ['g10_mr_eq', 'g10_mr_M', 'g10_mr_n', 'g10_mr_fR'],
    controls: [TG('rays', 'الأشعة', true, null, 'ray')],
    setup(S) { S.pb = 'm1'; S.k = 0; S.tt = 0; },
    update(S, dt) { S.tt += dt; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S); return { w, h, L, ay: Math.round(Math.min(h * .52, h - 300)) }; },
    scene(ctx, S, g) { const P = PB[S.pb], c = P.sc, w = g.w;
      if (c.k) { const cc = c.k === 'cc', I = Q47.props(cc ? c.f : -c.f, c.u), vx = cc ? w - 190 : Math.round(g.L + (w - g.L) * .6); let front = Math.max(c.u, cc ? 2 * c.f : 0) * 1.08, back = cc ? 0 : 2 * c.f; if (isFinite(I.v)) { if (I.v > 0) front = Math.max(front, I.v); else back = Math.max(back, -I.v); }
        const z = clamp(Math.min((vx - g.L - 30) / front, back ? (w - vx - 20) / back : 99), 2, 18);
        Q47.diag(ctx, { k: c.k, vx, ay: g.ay, f: c.f * z, u: c.u * z, h: c.h * z, box: { x0: g.L, x1: w - 8, y0: g.ay - 230, y1: g.h - 195 }, rays: S.p.rays === false ? [] : [1, 2, 3], t: S.tt, ap: Math.min(2 * c.f * z * .8, 120) });
        Q47.dim(ctx, vx - c.u * z, vx, g.ay + 80, 'u = ' + c.u + ' cm', '#b45309'); }
      else if (c.ang) { const hx = g.L + 230, hy = g.ay + 40, th = c.ang * Math.PI / 180, a1 = -Math.PI / 2 - th / 2, Lm = 170, rho = 90; const m = a => [hx + Math.cos(a) * Lm, hy + Math.sin(a) * Lm];
        Q47.seg(ctx, [hx, hy], m(a1), [Math.cos(a1 + Math.PI / 2), Math.sin(a1 + Math.PI / 2)]); Q47.seg(ctx, [hx, hy], m(a1 + th), [Math.cos(a1 + th - Math.PI / 2), Math.sin(a1 + th - Math.PI / 2)]);
        [[th / 2, 1], [-th / 2, .45], [2 * th - th / 2, .45]].forEach(q => K.raw(ctx, () => { const p = [hx + Math.cos(a1 + q[0]) * rho, hy + Math.sin(a1 + q[0]) * rho]; ctx.globalAlpha = q[1]; ctx.fillStyle = '#fde68a'; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p[0], p[1], 10, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.arc(p[0], p[1], 4, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; }));
        K.raw(ctx, () => { ctx.strokeStyle = '#0891b2'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(hx, hy, 40, a1, a1 + th); ctx.stroke(); }); Q42.T(ctx, '120°', hx, hy - 58, { s: 13, w: 900, c: '#fff', bg: '#0891b2' }); }
      else { [['cc', g.L + 40, w * .5 - 30, 'بؤرة حقيقية'], ['cv', w * .5 + 10, w - 20, 'بؤرة تقديرية']].forEach(q => { const R = 160, vx = q[0] === 'cc' ? q[2] - 20 : q[1] + 170, M = { k: q[0], vx, ay: g.ay, R, ap: 90 }, box = { x0: q[1], x1: q[2], y0: g.ay - 140, y1: g.ay + 110 };
          K.raw(ctx, () => { ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(q[1], g.ay); ctx.lineTo(q[2], g.ay); ctx.stroke(); });
          for (let i = 0; i < 5; i++) { const y = g.ay - 70 + 35 * i, p = [q[1] + 4, y], H = Q47.mhit(M, p, [1, 0]); if (!H) continue; const r = Q47.refl([1, 0], H.n); Q47.ray(ctx, [p, H.pt], '#f59e0b', { w: 1.8 }); Q47.ray(ctx, [H.pt, Q47.exit(H.pt, r, box)], '#f59e0b', { w: 1.8 }); if (q[0] === 'cv') Q47.ray(ctx, [H.pt, Q47.exit(H.pt, [-r[0], -r[1]], { x0: q[1], x1: vx + R / 2 + 4, y0: box.y0, y1: box.y1 })], '#7c3aed', { dash: [5, 5], arrows: false }); }
          Q47.mirror(ctx, M); const F = q[0] === 'cc' ? vx - R / 2 : vx + R / 2; Q47.pt(ctx, F, g.ay, 'F', '#b45309', 18); Q42.T(ctx, q[3], F, g.ay + 44, { s: 12, w: 900, c: '#fff', bg: q[0] === 'cc' ? '#0891b2' : '#7c3aed' }); }); } },
    draw(ctx, w, h, S) { const g = D.geo(S), P = PB[S.pb]; Q47.bg(ctx, w, h); D.scene(ctx, S, g);
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a); Q42.drawChips(ctx, C.b); C.n._lab = '⬇ الخطوة التالية'; C.n._col = '#be185d'; Q42.drawChips(ctx, [C.n]);
      Q47.stepsCard(ctx, S, { title: P.title, q: P.q, lines: P.lines, k: S.k }, { wd: 330 });
      Q42.banner(ctx, w, 'اختر مسألة ثم اضغط «الخطوة التالية»'); },
    chips(S, g) { const f = (S2, k) => { S2.pb = k; S2.k = 0; }; return { a: Q42.chips(S, 'pa', KEYS.slice(0, 5).map(k => [k, PB[k].t]), g.h - 172, S.pb, f, { bw: 110 }), b: Q42.chips(S, 'pb', KEYS.slice(5).map(k => [k, PB[k].t]), g.h - 128, S.pb, f, { bw: 110 }), n: Q42.btn('nx', { x: g.L + 90, y: g.h - 84, w: 170, h: 34 }, S2 => { S2.k = Math.min(S2.k + 1, PB[S2.pb].lines.length); }, { tip: 'الخطوة التالية' }) }; },
    drags(S) { if (!S.W) return []; const C = D.chips(S, D.geo(S)); return C.a.concat(C.b, [C.n]); },
    readings(S) { return [rd('السؤال', PB[S.pb].title), rd('الخطوات', S.k + ' / ' + PB[S.pb].lines.length)]; },
    explain(S) { return Q26.ex('كل مسألة في المرايا الكروية تحل بالقانون العام وقانون التكبير مع الإشارات الصحيحة.', '1/f = 1/u + 1/v و M = −v/u. f موجب للمقعرة وسالب للمحدبة، و v سالب للصورة الخيالية، و M موجب للصورة المعتدلة.', 'ارسم دائماً مخطط الأشعة لتتحقق من الجواب: موقع الصورة وصفاتها يجب أن يتفقا مع الحساب.'); }
  };
  M8.P[D.id] = D;
})();

/* tap-only items: no drag arrows; explanations bidi-safe */
Object.keys(M8.P).filter(k => /^g10_mr_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f) D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); });
Object.keys(M8.P).filter(id => /^g10_mr_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* ====================== merged experiments (book order) ====================== */
M8.merge({ id: 'g10_mir_plane', ch: 47, reg: X10, sec: '7-1 المرآة المستوية + 7-2 الصور في المرايا المستوية', page: 114, kind: 'نشاط',
  title: 'المرآة المستوية: موقع الصورة وصفاتها وانعكاس الجوانب',
  desc: 'نحرك شمعة أمام مرآة مستوية ونتتبع الأشعة التي تصل إلى العين، فنجد الصورة خلف المرآة على البعد نفسه، خيالية معتدلة مساوية ومعكوسة الجوانب. ثم نرى انعكاس الجوانب في اليد اليمنى وكلمة إسعاف ونحل سؤالي الرقم 81 والساعة.',
  tags: 'المرآة المستوية صورة خيالية انعكاس الجوانب إسعاف',
  fact: ['تصنع المرآة المستوية من لوح زجاج مصقول جيداً يطلى أحد وجهيه بمركب للفضة أو الألمنيوم، وتعتمد جودتها على نوعية الزجاج ودرجة صقله (ص 114).', 'تكتب كلمة إسعاف معكوسة على مقدمة سيارة الإسعاف ليقرأها السائق الذي أمامها معتدلة في مرآته (ص 115).'],
  quiz: [
    { q: 'الصورة الخيالية:', o: ['تكون معتدلة بالنسبة للجسم', 'تكون مقلوبة بالنسبة للجسم', 'يمكن إسقاطها على حاجز', 'تقع أمام المرآة'], a: 0, why: 'س1-1 ص 130.' },
    { q: 'شخص يقف على بعد 2 m من مرآة مستوية. المسافة بينه وبين صورته:', o: ['4 m', '2 m', '1 m', '8 m'], a: 0, why: 'بعد الصورة خلف المرآة يساوي بعد الجسم أمامها.' },
    { q: 'وقف أحمد أمام مرآة مستوية وعلى قميصه الرقم 81. تقرأ صورة الرقم:', o: ['18', '81', '88', '11'], a: 0, why: 'س3 ص 131: انعكاس الجوانب.' },
    { q: 'صورة ساعة في مرآة مستوية تشير إلى 4:50. الوقت الحقيقي:', o: ['7:10', '4:50', '5:40', '8:10'], a: 0, why: 'س4 ص 131: 12:00 − 4:50 = 7:10.' }],
  parts: [{ id: 'g10_mr_plane', n: 'الشمعة والعين والمصدر النقطي + فكر: الفراشة' }, { id: 'g10_mr_lateral', n: 'انعكاس الجوانب: اليد، إسعاف، س3، س4' }] });
M8.merge({ id: 'g10_mir_angle', ch: 47, reg: X10, sec: '7-3 تعدد الصور في المرايا المتزاوية', page: 116, kind: 'نشاط',
  title: 'النشاط 1: عدد الصور المتكونة لجسم بين مرآتين بينهما زاوية',
  desc: 'نغير الزاوية بين مرآتين مستويتين ونعد صور الشمعة، ونتتبع مسار الشعاع من كل صورة إلى العين، ونستنتج العلاقة n = 360°/θ − 1، ونحل المثال (24°) والمسألة 2 (120°)، ونرى الصور اللانهائية في المرآتين المتوازيتين.',
  tags: 'المرايا المتزاوية عدد الصور 360/θ',
  fact: ['في صالونات الحلاقة مرآتان متقابلتان أمامك وخلفك تريانك صوراً لا متناهية وترى الجزء الخلفي من رأسك (ص 116).', 'تستعمل المرآتان المتزاويتان في الزخرفة والمحال التجارية للحصول على صور متعددة (ص 128).'],
  quiz: [
    { q: 'عدد الصور المتكونة في المرايا المستوية المتقابلة (المتوازية):', o: ['لا نهائية', '30', '180', '0'], a: 0, why: 'س1-3 ص 130.' },
    { q: 'مرآتان مستويتان الزاوية بينهما 60°. عدد صور الشمعة بينهما:', o: ['5', '6', '3', '7'], a: 0, why: 'n = 360/60 − 1 = 5.' },
    { q: 'وضع جسم بين مرآتين الزاوية بينهما 24°. عدد الصور:', o: ['14', '15', '12', '24'], a: 0, why: 'مثال ص 117.' }],
  parts: [{ id: 'g10_mr_angle', n: 'المرآتان المتزاويتان + المثال والمسألة 2' }] });
M8.merge({ id: 'g10_mir_sph', ch: 47, reg: X10, sec: '7-4 المرايا الكروية + الزيغ الكروي', page: 118, kind: 'نشاط',
  title: 'المرايا الكروية: المفاهيم والبؤرة وقواعد رسم الأشعة والزيغ الكروي',
  desc: 'نسلط حزمة أشعة متوازية على مرآة مقعرة ثم محدبة فنحدد مركز التكور والقطب والبؤرة والبعد البؤري f = R/2، ونرى الزيغ الكروي وعلاجه بالقطع المكافئ، ثم نتتبع بمؤشر ليزر الأشعة الخاصة الثلاثة التي نرسم بها الصور.',
  tags: 'المرايا الكروية مقعرة محدبة البؤرة الزيغ الكروي رسم الأشعة',
  fact: ['انظر إلى وجهك في ملعقة طعام: سطحها الداخلي مقعر وسطحها الخارجي محدب (ص 118).', 'للتخلص من الزيغ الكروي تصنع المرآة المقعرة بشكل قطع مكافئ، أو تستعمل مرايا كروية صغيرة الوجه كما في عاكسات الضوء والتلسكوبات الفلكية العاكسة (ص 122).'],
  quiz: [
    { q: 'المحور الأساس لمرآة كروية هو المستقيم المار:', o: ['بمركز تكور المرآة وقطبها', 'بمركز تكور المرآة وأية نقطة أخرى', 'ببؤرة المرآة وأي نقطة على سطحها', 'مماساً لسطح المرآة'], a: 0, why: 'س1-4 ص 130.' },
    { q: 'نصف قطر تكور المرآة الكروية يساوي:', o: ['ضعف البعد البؤري', 'نصف البعد البؤري', 'ثلاثة أضعاف البعد البؤري', 'ثلث البعد البؤري'], a: 0, why: 'س1-6 ص 131: R = 2f.' },
    { q: 'مرآة كروية بعدها البؤري 15 cm فيكون نصف قطر تكورها:', o: ['30 cm', '15 cm', '7.5 cm', '60 cm'], a: 0, why: 'س1-8 ص 131.' },
    { q: 'الشعاع المار بمركز تكور المرآة المقعرة:', o: ['يرتد على نفسه', 'ينعكس ماراً بالبؤرة', 'ينعكس موازياً للمحور'], a: 0, why: 'الشكل 13-7.' }],
  parts: [{ id: 'g10_mr_focus', n: 'البؤرة والأشعة المتوازية والزيغ الكروي' }, { id: 'g10_mr_rays', n: 'قواعد رسم الأشعة بمؤشر الليزر' }] });
M8.merge({ id: 'g10_mir_images', ch: 47, reg: X10, sec: '7-5 الصور في المرآة المقعرة + 7-6 الصور في المرآة المحدبة', page: 119, kind: 'نشاط',
  title: 'النشاطان 2 و 3: تكون الصور في المرآة المقعرة والمحدبة',
  desc: 'على المسطبة البصرية نحرك الشمعة والحاجز أمام مرآة مقعرة حتى تتضح الصورة الحقيقية، ثم ندرس بمخطط الأشعة الحالات الخمس للمرآة المقعرة، ونحاول عبثاً أن نستلم صورة المرآة المحدبة على حاجز.',
  tags: 'نشاط 2 نشاط 3 صورة حقيقية خيالية مقعرة محدبة حاجز',
  fact: ['الصورة التي تنتج من تجمع الأشعة المنعكسة على حاجز صورة حقيقية، والتي تنتج من امتداداتها صورة خيالية (ص 119).', 'المرآة المحدبة تفرق الأشعة الساقطة عليها لذلك يطلق عليها اسم المرآة المفرقة (ص 121).'],
  quiz: [
    { q: 'المرآة المقعرة تظهر صورة معتدلة للجسم عندما يكون بعده عنها:', o: ['أقل من البعد البؤري', 'مساوياً للبعد البؤري', 'ضعف البعد البؤري', 'بعيداً جداً عن المرآة'], a: 0, why: 'س1-2 ص 130.' },
    { q: 'إذا نظرت في مرآة وكانت صورتك مكبرة تكون المرآة:', o: ['مقعرة', 'محدبة', 'مستوية', 'جميع الاحتمالات'], a: 0, why: 'س1-5 ص 130: المقعرة فقط تكبّر.' },
    { q: 'صفات الصورة المتكونة في المرآة المحدبة هي:', o: ['خيالية ومعتدلة ومصغرة', 'حقيقية ومعتدلة ومصغرة', 'حقيقية ومكبرة ومقلوبة', 'خيالية ومقلوبة ومكبرة'], a: 0, why: 'س1-7 ص 131.' },
    { q: 'جسم في مركز تكور مرآة مقعرة. صورته:', o: ['في C حقيقية مقلوبة مساوية', 'في F حقيقية مصغرة', 'خلف المرآة خيالية', 'في اللانهاية'], a: 0, why: 'الشكل 16-7.' }],
  parts: [{ id: 'g10_mr_bench', n: 'النشاط 2: المسطبة البصرية والحاجز' }, { id: 'g10_mr_cases', n: 'الحالات الخمس للمرآة المقعرة' }, { id: 'g10_mr_convex', n: 'المرآة المحدبة + النشاط 3' }] });
M8.merge({ id: 'g10_mir_eq', ch: 47, reg: X10, sec: '7-7 المعادلة العامة للمرايا + 7-8 قانون التكبير', page: 122, kind: 'مثال',
  title: 'القانون العام للمرايا والتكبير مع الأمثلة 1 و 2 و 3',
  desc: 'نغير بعد الجسم أمام مرآة مقعرة أو محدبة ونرى التعويض في 1/f = 1/u + 1/v والتكبير M = −v/u لحظة بلحظة مع مخطط أشعة بمقياس رسم، ثم نحل أمثلة الكتاب خطوة خطوة.',
  tags: 'القانون العام للمرايا التكبير الإشارات أمثلة',
  fact: ['يكون بعد الجسم u سالباً إذا كان الجسم خيالياً خلف المرآة، كما في نظام مكون من عدسة ومرآة كروية (ص 123).'],
  quiz: [
    { q: 'مسطرة طولها 10 cm عمودية أمام مرآة مقعرة f = +50 cm وعلى بعد 100 cm من قطبها. طول صورتها:', o: ['10 cm مقلوبة', '10 cm معتدلة', '3 cm معتدلة', '3 cm مقلوبة'], a: 0, why: 'س1-9 ص 131: v = 100 cm ، M = −1.' },
    { q: 'إشارة التكبير السالبة تعني أن الصورة:', o: ['حقيقية مقلوبة', 'خيالية معتدلة', 'مكبرة دائماً', 'مصغرة دائماً'], a: 0, why: 'قانون التكبير ص 124.' },
    { q: 'البعد البؤري للمرآة المحدبة في القانون العام يعوض:', o: ['بإشارة سالبة', 'بإشارة موجبة', 'بلا إشارة'], a: 0, why: 'ص 123.' }],
  parts: [{ id: 'g10_mr_eq', n: 'القانون العام والتكبير + الأمثلة 1 و 2 و 3' }] });
M8.merge({ id: 'g10_mir_apps', ch: 47, reg: X10, sec: '7-9 تطبيقات على المرايا', page: 127, kind: 'نشاط',
  title: 'تطبيقات المرايا: مرايا السيارة، مصباح السيارة، الطباخ الشمسي، الطبق اللاقط',
  desc: 'نقارن مجال الرؤية في المرآة الجانبية المستوية والمحدبة (ولماذا لا تصلح المقعرة)، ونحرك مصباح السيارة في عاكسه، ونركز أشعة الشمس على قدر الطباخ الشمسي، ونضبط وحدة LNB في بؤرة الطبق اللاقط، ونرى مرآة طبيب الأسنان.',
  tags: 'تطبيقات المرايا سيارة مصباح طباخ شمسي ستلايت طبيب أسنان',
  fact: ['المرآة الأمامية المستوية أمام السائق تسمى أحياناً العين الثالثة للسائق (ص 128).', 'الأطباق اللاقطة (الستلايت) تعمل عمل مرآة كبيرة تعكس موجات البث الفضائي وتركزها على وحدة الاستقبال LNB (ص 129).', 'تستعمل المرآة المحدبة في الأسواق لمراقبة حركة المتسوقين (ص 129).'],
  quiz: [
    { q: 'توضع على جانبي السائق مرآة:', o: ['محدبة لأنها تعطي مجال رؤية أوسع', 'مقعرة لأنها تكبر الصور', 'مستوية فقط'], a: 0, why: 'ص 129.' },
    { q: 'في مصباح السيارة الأمامي يوضع مصدر الضوء:', o: ['في بؤرة العاكس', 'في مركز التكور', 'خلف العاكس'], a: 0, why: 'ص 128: الأشعة تنعكس متوازية.' },
    { q: 'في الطباخ الشمسي يوضع القدر:', o: ['في بؤرة المرآة المقعرة', 'في مركز التكور', 'عند القطب'], a: 0, why: 'ص 129.' }],
  parts: [{ id: 'g10_mr_car', n: 'مرايا السيارة الجانبية والأمامية + س2' }, { id: 'g10_mr_focusapps', n: 'المصباح والطباخ الشمسي والطبق اللاقط وطبيب الأسنان' }] });
M8.merge({ id: 'g10_mir_review', ch: 47, reg: X10, sec: 'أسئلة الفصل السابع ومسائله', page: 130, kind: 'مثال',
  title: 'مسائل الفصل السابع وأسئلته على الجهاز',
  desc: 'نحل المسائل الخمس خطوة خطوة مع مخطط أشعة بمقياس رسم لكل منها، ونجيب عن أسئلة المرآة الجانبية المقعرة والجسم في البؤرة والبؤرة الحقيقية والتقديرية والمقارنة بين المرآتين والرسم.',
  tags: 'مسائل الفصل السابع أسئلة المرايا',
  fact: ['تحقق دائماً من الحل بالرسم: الصورة الحقيقية أمام المرآة و v موجب، والخيالية خلفها و v سالب (ص 123).'],
  quiz: [
    { q: 'وضع جسم على بعد 4 cm من مرآة فتكونت له صورة تقديرية مكبرة 3 مرات. المرآة وبعدها البؤري:', o: ['مقعرة f = +6 cm', 'محدبة f = −6 cm', 'مقعرة f = +3 cm', 'مستوية'], a: 0, why: 'م3 ص 132.' },
    { q: 'جسم طوله 4 cm أمام مرآة محدبة R = 20 cm على بعد 40 cm، طول صورته:', o: ['0.8 cm', '4 cm', '2 cm', '1.6 cm'], a: 0, why: 'م5 ص 132.' },
    { q: 'لا تتكون صورة لجسم في بؤرة مرآة مقعرة لأن:', o: ['الأشعة تنعكس متوازية', 'الأشعة تمتص', 'الصورة تقع على المرآة'], a: 0, why: 'س5 ص 131.' }],
  parts: [{ id: 'g10_mr_problems', n: 'المسائل م1–م5 والأسئلة س2، س5–س8' }] });
