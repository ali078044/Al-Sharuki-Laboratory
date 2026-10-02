'use strict';
/* =====================================================================
   GROUP "mod": PhET-level upgrades for
   app_transformer, em_wave, modulation, app_radar, blackbody,
   photoelectric, app_solar, debroglie, relativity
   ===================================================================== */
const MZ = {
  E: id => EXPS.find(e => e.id === id),
  /* panel with pale fill (raw colours) */
  box(ctx, x, y, w, h, fill = 'rgba(255,255,255,.92)', stroke = '#cbd5e1', r = 10) {
    const cv = ctx.canvas, rw = cv.__raw; cv.__raw = true; ctx.fillStyle = fill; rr(ctx, x, y, w, h, r); ctx.fill(); if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke(); } cv.__raw = rw;
  },
  /* is the stage in book (white) look? */
  book: ctx => !!(ctx.canvas && ctx.canvas.__book),
  /* on-canvas push button / pill; returns its rect */
  pill(ctx, x, y, label, on, col = '#2563eb', o = {}) {
    ctx.font = `800 ${o.s || 12}px Tajawal,sans-serif`; const tw = ctx.measureText(label).width; const w = o.w || tw + 22, h = o.h || 26;
    const cv = ctx.canvas, rw = cv.__raw; cv.__raw = true;
    ctx.fillStyle = on ? col : (MZ.book(ctx) ? '#f1f5f9' : 'rgba(30,41,59,.9)'); rr(ctx, x - w / 2, y - h / 2, w, h, h / 2); ctx.fill();
    ctx.strokeStyle = on ? col : '#94a3b8'; ctx.lineWidth = 1.4; ctx.stroke(); cv.__raw = rw;
    G.text(ctx, label, x, y + 1, { s: o.s || 12, w: 800, c: on ? '#fff' : (MZ.book(ctx) ? '#334155' : '#e2e8f0'), raw: 1 });
    return { x, y, w, h };
  },
  /* rotary knob (value fraction 0..1) */
  knob(ctx, x, y, r, f, col = '#2563eb', label) {
    const cv = ctx.canvas, rw = cv.__raw; cv.__raw = true;
    const a0 = Math.PI * .75, a1 = Math.PI * 2.25; ctx.lineWidth = 4; ctx.strokeStyle = '#cbd5e1'; ctx.beginPath(); ctx.arc(x, y, r + 5, a0, a1); ctx.stroke();
    ctx.strokeStyle = col; ctx.beginPath(); ctx.arc(x, y, r + 5, a0, a0 + (a1 - a0) * clamp(f, 0, 1)); ctx.stroke();
    const g = ctx.createRadialGradient(x - r * .3, y - r * .3, 1, x, y, r); g.addColorStop(0, '#f8fafc'); g.addColorStop(1, '#94a3b8');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.stroke();
    const a = a0 + (a1 - a0) * clamp(f, 0, 1); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * .25, y + Math.sin(a) * r * .25); ctx.lineTo(x + Math.cos(a) * r * .9, y + Math.sin(a) * r * .9); ctx.stroke();
    cv.__raw = rw; if (label) G.text(ctx, label, x, y + r + 16, { s: 11, w: 800, c: MZ.book(ctx) ? '#334155' : '#cbd5e1', raw: 1 });
  },
  /* linear slider drawn on apparatus: from (x1,y1) to (x2,y2), fraction f */
  slider(ctx, x1, y1, x2, y2, f, col = '#2563eb') {
    const cv = ctx.canvas, rw = cv.__raw; cv.__raw = true;
    ctx.lineCap = 'round'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    const x = lerp(x1, x2, f), y = lerp(y1, y2, f); ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x, y); ctx.stroke(); ctx.lineCap = 'butt';
    ctx.fillStyle = '#fff'; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 9, 0, TAU); ctx.fill(); ctx.stroke(); cv.__raw = rw;
    return [x, y];
  },
  /* ⊙ / ⊗ symbol */
  sym(ctx, x, y, r, out, col, al = 1) {
    ctx.globalAlpha = al; ctx.strokeStyle = col; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); ctx.fillStyle = col;
    if (out) { ctx.beginPath(); ctx.arc(x, y, r * .35, 0, TAU); ctx.fill(); } else { const k = r * .62; ctx.beginPath(); ctx.moveTo(x - k, y - k); ctx.lineTo(x + k, y + k); ctx.moveTo(x + k, y - k); ctx.lineTo(x - k, y + k); ctx.stroke(); }
    ctx.globalAlpha = 1;
  },
  /* small scrolling plot in a box. series: [{pts:[[t,v]], col, name, dash}] */
  plot(ctx, x, y, w, h, series, o = {}) {
    MZ.box(ctx, x, y, w, h, MZ.book(ctx) ? 'rgba(255,255,255,.95)' : 'rgba(15,23,42,.85)', '#94a3b8', 8);
    const ym = y + h / 2; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + 8, ym); ctx.lineTo(x + w - 8, ym); ctx.stroke();
    const T = o.span || 4, t1 = o.t1, t0 = t1 - T;
    series.forEach(s => {
      const mx = s.max || 1; ctx.strokeStyle = s.col; ctx.lineWidth = s.w || 2; if (s.dash) ctx.setLineDash(s.dash); ctx.beginPath(); let st = false;
      for (const q of s.pts) { if (q[0] < t0) continue; const px = x + 8 + (q[0] - t0) / T * (w - 16), py = ym - clamp(q[1] / mx, -1.1, 1.1) * (h / 2 - 16); st ? ctx.lineTo(px, py) : ctx.moveTo(px, py); st = true; }
      ctx.stroke(); ctx.setLineDash([]);
    });
    let lx = x + w - 10; series.forEach(s => { if (!s.name) return; ctx.font = '800 11px Tajawal,sans-serif'; const tw = ctx.measureText(s.name).width; G.text(ctx, s.name, lx, y + 11, { s: 11, w: 800, c: s.col, a: 'right' }); lx -= tw + 14; });
    if (o.title) G.text(ctx, o.title, x + 10, y + 11, { s: 11, w: 700, c: MZ.book(ctx) ? '#475569' : '#94a3b8', a: 'left' });
  },
  /* photon wave-packet squiggle between (x1,y1) → direction a, length L */
  squiggle(ctx, x, y, a, L, col, amp = 4, n = 3, w = 2) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath();
    for (let i = 0; i <= 24; i++) { const u = i / 24; const px = -L + u * L; const env = Math.sin(Math.PI * u); const py = amp * env * Math.sin(u * n * TAU); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    ctx.stroke(); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(4, 0); ctx.lineTo(-3, -3.5); ctx.lineTo(-3, 3.5); ctx.closePath(); ctx.fill(); ctx.restore();
  },
  /* lamp symbol (circle with cross) and glow */
  lamp(ctx, x, y, r, g) {
    if (g > .02) { const cv = ctx.canvas, rw = cv.__raw; cv.__raw = true; G.glow(ctx, x, y, r * 2 + 40 * Math.min(1, g), 'rgba(255,200,60,A)', Math.min(1, g)); cv.__raw = rw; }
    const cv = ctx.canvas, rw = cv.__raw; cv.__raw = true; ctx.fillStyle = g > .02 ? `rgba(255,${Math.round(236 - 40 * Math.min(1, g))},120,${.35 + .6 * Math.min(1, g)})` : '#f8fafc'; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); cv.__raw = rw;
    ctx.strokeStyle = '#1b2437'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); const k = r * .7; ctx.beginPath(); ctx.moveTo(x - k, y - k); ctx.lineTo(x + k, y + k); ctx.moveTo(x + k, y - k); ctx.lineTo(x - k, y + k); ctx.stroke();
  },
  /* rheostat zig-zag with slider; returns slider pos */
  rheo(ctx, x, y, L, f, col = '#475569') {
    ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); const n = 8; ctx.moveTo(x - L / 2, y); for (let i = 0; i < n; i++) { const xx = x - L / 2 + (i + .5) * L / n; ctx.lineTo(xx, y + (i % 2 ? 8 : -8)); } ctx.lineTo(x + L / 2, y); ctx.stroke();
    const sx = x - L / 2 + f * L; G.arrow(ctx, sx, y - 26, sx, y - 9, '#2563eb', 2.4, 8); return [sx, y - 26];
  },
  logf: (v, a, b) => Math.log(v / a) / Math.log(b / a),
  unlog: (f, a, b) => a * Math.pow(b / a, clamp(f, 0, 1)),
  fg: ctx => MZ.book(ctx) ? '#1e293b' : '#e2e8f0',
  mute: ctx => MZ.book(ctx) ? '#64748b' : '#94a3b8'
};

/* =====================================================================
   1) app_transformer — laminated core, alternating flux, both windings
   ===================================================================== */
(() => {
  const E = MZ.E('app_transformer'); if (!E) return;
  E.controls = E.controls.concat([
    TG('flux', 'الفيض المغناطيسي المتناوب في القلب', true, null, 'bfield'),
    TG('cur', 'التيار المتناوب في الملفين والأسلاك', true, null, 'current'),
    TG('emf', 'منحنيات الفولطية والفيض مع الزمن', true, null, 'graph'),
    TG('lab', 'القيم والنسبة Vs/Vp = Ns/Np على الشكل', true, null, 'labels'),
    TG('lam', 'قلب مصفح (شرائح حديد معزولة)', true, null, 'core'),
    TG('slow', 'عرض بطيء للتيار المتناوب', true, null, 'slow')
  ]);
  E.setup = S => { S.ph = 0; S.sw = true; S.amp = 1; S.phiDC = 0; S.dphi = 0; S.hVp = []; S.hVs = []; S.hF = []; S.q1 = 0; S.q2 = 0; S.heat = 0; };
  const eff = S => S.p.lam === false ? .72 : 1;
  E.calc = function (S) { const p = S.p; if (!S.sw || p.src === 'dc') return { Vs: 0, Is: 0, Ip: S.sw && p.src === 'dc' ? p.Vp / 2 : 0, P: 0 }; const Vs = p.Vp * p.Ns / p.Np * Math.sqrt(eff(S)), Is = Vs / p.RL, Ip = Is * p.Ns / p.Np / Math.sqrt(eff(S)); return { Vs, Is, Ip, P: Vs * Is }; };
  E.update = (S, dt) => {
    const p = S.p; const w = p.slow !== false ? TAU * .45 : TAU * 3; S.ph += w * dt;
    S.amp += ((S.sw ? 1 : 0) - S.amp) * Math.min(1, dt * 12);
    const Vpk = p.Vp * Math.SQRT2, k = p.Ns / p.Np;
    if (p.src === 'ac') {
      S.vp = Vpk * Math.sin(S.ph) * S.amp; S.phi = -Math.cos(S.ph) * S.amp; S.vs = S.vp * k * Math.sqrt(eff(S)); S.phiDC = 0;
    } else {
      const tgt = S.sw ? 1 : 0, tau = .35; const d = (tgt - S.phiDC) / tau; S.phiDC += d * dt; S.dphi = d;
      S.vp = S.sw ? p.Vp : 0; S.phi = S.phiDC; S.vs = k * Vpk * d * tau * .9;
    }
    S.is = S.vs / p.RL; S.ip = S.is * k + (p.src === 'dc' && S.sw ? S.phiDC * p.Vp / 2 : 0);
    S.heat += ((p.lam === false && S.sw && p.src === 'ac' ? 1 : 0) - S.heat) * dt * .6;
    hist(S, 'hVp', S.vp, 260); hist(S, 'hVs', S.vs, 260); hist(S, 'hF', S.phi, 260);
  };
  const geo = S => {
    const w = S.W || 820, h = S.H || 780; const nar = w < 700; const cw = nar ? clamp(w - 370, 140, 380) : Math.min(380, w * .46); const cx = nar ? 232 + cw / 2 : w * .5, cy = h * .36; const chh = Math.min(270, h * .36), t = 40;
    const xl = cx - cw / 2, xr = cx + cw / 2, yt = cy - chh / 2, yb = cy + chh / 2;
    return { w, h, cx, cy, cw, chh, t, xl, xr, yt, yb, sx: Math.max(122, xl - 120), lx: Math.min(w - 60, xr + (nar ? 95 : 120)) };
  };
  const nVis = N => clamp(Math.round(Math.sqrt(N) * .75), 3, 40);
  function coil(ctx, g, x, N, col, back, I, showI, S) {
    const m = nVis(N), y0 = g.yt + 34, y1 = g.yb - 34, rx = g.t / 2 + 9;
    for (let i = 0; i < m; i++) {
      const y = m > 1 ? y0 + i * (y1 - y0) / (m - 1) : (y0 + y1) / 2;
      ctx.strokeStyle = back ? shade(col, -40) : col; ctx.lineWidth = m > 26 ? 2.2 : 3;
      ctx.beginPath(); ctx.ellipse(x, y, rx, 4.5, -.12, back ? Math.PI : 0, back ? TAU : Math.PI); ctx.stroke();
    }
    if (!back && showI && Math.abs(I) > .02) {
      const al = clamp(Math.abs(I), .3, 1); const dir = Math.sign(I);
      for (let i = 1; i < m; i += Math.max(2, Math.round(m / 5))) { const y = y0 + i * (y1 - y0) / Math.max(1, m - 1) + 4; G.arrow(ctx, x - dir * 10, y + 1, x + dir * 10, y - 1, `rgba(234,88,12,${al})`, 2.4, 8); }
    }
  }
  E.draw = (ctx, w, h, S) => {
    G.bg(ctx, w, h); const p = S.p, g = geo(S); const r = E.calc(S); const ac = p.src === 'ac';
    const phi = S.phi || 0, vs = S.vs || 0, vp = S.vp || 0;
    const Vpk = p.Vp * Math.SQRT2, Vspk = Vpk * p.Ns / p.Np;
    const iP = clamp((S.ip || 0) / Math.max(1e-9, Math.abs(r.Ip) * 1.414 || 1), -1.2, 1.2), iS = clamp(vs / Math.max(1e-9, Vspk || 1), -1.2, 1.2);
    // ---- coils (back halves) ----
    coil(ctx, g, g.xl, p.Np, '#c2410c', true); coil(ctx, g, g.xr, p.Ns, '#b45309', true);
    // ---- laminated core ----
    const cvb = ctx.canvas; setRaw(ctx, 1);
    ctx.fillStyle = S.heat > .05 ? `rgb(${Math.round(120 + 110 * S.heat)},${Math.round(125 - 40 * S.heat)},${Math.round(135 - 90 * S.heat)})` : '#8b95a3';
    ctx.beginPath(); ctx.rect(g.xl - g.t / 2, g.yt - g.t / 2, g.cw + g.t, g.chh + g.t); ctx.rect(g.xl + g.t / 2, g.yt + g.t / 2, g.cw - g.t, g.chh - g.t); ctx.fill('evenodd');
    ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 1.5; ctx.strokeRect(g.xl - g.t / 2, g.yt - g.t / 2, g.cw + g.t, g.chh + g.t); ctx.strokeRect(g.xl + g.t / 2, g.yt + g.t / 2, g.cw - g.t, g.chh - g.t);
    if (p.lam !== false) { ctx.strokeStyle = 'rgba(55,65,81,.45)'; ctx.lineWidth = 1; for (let k = -g.t / 2 + 5; k < g.t / 2; k += 5) ctx.strokeRect(g.xl - k, g.yt - k, g.cw + 2 * k, g.chh + 2 * k); }
    setRaw(ctx, 0);
    // ---- alternating flux in the core ----
    if (p.flux !== false) {
      const a = Math.abs(phi), sg = Math.sign(phi) || 1; const al = clamp(a, 0, 1);
      if (al > .03) [-11, 0, 11].forEach((o, j) => {
        const x0 = g.xl + o, y0 = g.yt + o, x1 = g.xr - o, y1 = g.yb - o;
        ctx.strokeStyle = `rgba(37,99,235,${.25 + .7 * al})`; ctx.lineWidth = 1.5 + 1.8 * al; ctx.setLineDash([]); ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
        // arrows: flux goes UP through the primary limb when phi>0 (clockwise loop on screen)
        const hs = 6 + 6 * al, col = `rgba(29,78,216,${.35 + .65 * al})`;
        const put = (x, y, dx, dy) => G.arrow(ctx, x - dx * 7 * sg, y - dy * 7 * sg, x + dx * 7 * sg, y + dy * 7 * sg, col, 2.2, hs);
        if (j === 1) [.3, .7].forEach(f => { put(lerp(x0, x1, f), y0, 1, 0); put(lerp(x1, x0, f), y1, -1, 0); });
      });
      G.text(ctx, al > .03 ? 'Φ ' + (phi > 0 ? '↻ مع عقارب الساعة' : '↺ عكس عقارب الساعة') : 'Φ = 0 (لحظياً)', g.cx, g.yt - g.t / 2 - 16, { s: 12, w: 800, c: '#fff', bg: `rgba(37,99,235,${.45 + .5 * al})`, raw: 1 });
      if (p.lab !== false) G.text(ctx, 'الفيض نفسه يخترق كل لفة من الملفين', g.cx, g.cy - 14, { s: 12, w: 700, c: '#1d4ed8' });
    }
    // eddy currents in solid core
    if (p.lam === false && S.sw && ac) {
      const aE = Math.abs(Math.sin(S.ph)); [[g.cx, g.yt], [g.cx, g.yb], [g.xl, g.cy + 60], [g.xr, g.cy + 60]].forEach(([x, y]) => { ctx.strokeStyle = `rgba(234,88,12,${.3 + .6 * aE})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(x, y, 13, 9, 0, 0, TAU); ctx.stroke(); G.arrow(ctx, x + 12, y - 2, x + 12, y + (Math.sin(S.ph) > 0 ? 6 : -6) - 2, `rgba(234,88,12,${.4 + .6 * aE})`, 2, 7); });
      G.text(ctx, 'قلب مصمت: تيارات دوامة تسخّن القلب وتضيع الطاقة', g.cx, g.cy + 16, { s: 12, w: 800, c: '#fff', bg: 'rgba(234,88,12,.92)', raw: 1 });
    }
    // ---- coils front ----
    coil(ctx, g, g.xl, p.Np, '#c2410c', false, iP, p.cur !== false, S); coil(ctx, g, g.xr, p.Ns, '#b45309', false, iS, p.cur !== false, S);
    G.text(ctx, 'الملف الابتدائي', g.xl, g.yb + g.t / 2 + 14, { s: 12, w: 800, c: '#9a3412' }); G.text(ctx, 'الملف الثانوي', g.xr, g.yb + g.t / 2 + 14, { s: 12, w: 800, c: '#92400e' });
    G.text(ctx, 'Np = ' + p.Np, g.xl, g.yb + g.t / 2 + 32, { s: 14, w: 900, c: '#c2410c', mono: 1 }); G.text(ctx, 'Ns = ' + p.Ns, g.xr, g.yb + g.t / 2 + 32, { s: 14, w: 900, c: '#b45309', mono: 1 });
    // ---- primary circuit: source + switch ----
    const yA = g.yt + 34, yB = g.yb - 34, sx = g.sx, sy = g.cy;
    const swx = (sx + g.xl) / 2, wireC = '#334155';
    const pw1 = [[g.xl - 18, yA], [swx + 22, yA]], pw2 = [[swx - 20, yA], [sx, yA], [sx, sy - 26]], pw3 = [[sx, sy + 26], [sx, yB], [g.xl - 18, yB]];
    [pw1, pw2, pw3].forEach(q => G.wire(ctx, q, wireC, 2.5));
    // switch
    ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(swx - 20, yA, 4, 0, TAU); ctx.arc(swx + 22, yA, 4, 0, TAU); ctx.fill();
    ctx.strokeStyle = S.sw ? '#16a34a' : '#dc2626'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(swx - 20, yA); ctx.lineTo(swx + 20, S.sw ? yA : yA - 24); ctx.stroke();
    G.text(ctx, S.sw ? 'مغلق (انقر)' : 'مفتوح (انقر)', swx, yA - 34, { s: 11, w: 800, c: S.sw ? '#15803d' : '#b91c1c' });
    // source (knob inside)
    setRaw(ctx, 1); ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.arc(sx, sy, 26, 0, TAU); ctx.fill(); setRaw(ctx, 0); ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2.2; ctx.stroke();
    if (ac) { ctx.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20; const x = sx - 14 + 28 * u, y = sy - 9 * Math.sin(u * TAU); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
    else { ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx - 12, sy - 6); ctx.lineTo(sx + 12, sy - 6); ctx.moveTo(sx - 6, sy + 5); ctx.lineTo(sx + 6, sy + 5); ctx.stroke(); }
    MZ.knob(ctx, sx, yB + 44, 15, (p.Vp - 5) / 235, '#c2410c');
    G.text(ctx, 'Vp = ' + p.Vp + ' V', sx, yB + 80, { s: 13, w: 900, c: '#9a3412', mono: 1 });
    // AC / DC selector
    S._acR = MZ.pill(ctx, sx - 22, sy - 62, 'AC ~', ac, '#2563eb', { w: 44 }); S._dcR = MZ.pill(ctx, sx + 24, sy - 62, 'DC', !ac, '#dc2626', { w: 44 });
    // ---- secondary circuit: load (lamp + rheostat) ----
    const lx = g.lx; const sw1 = [[g.xr + 18, yA], [lx, yA], [lx, sy - 20]], sw2 = [[lx, sy + 20], [lx, sy + 36]], sw3 = [[lx, sy + 86], [lx, yB], [g.xr + 18, yB]];
    [sw1, sw2, sw3].forEach(q => G.wire(ctx, q, wireC, 2.5));
    const Pn = clamp(Math.abs(vs * (S.is || 0)) / 60, 0, 1.3);
    MZ.lamp(ctx, lx, sy, 20, Pn);
    // rheostat vertical
    ctx.save(); ctx.translate(lx, sy + 61); ctx.rotate(Math.PI / 2); const rf = MZ.logf(p.RL, 10, 5000); MZ.rheo(ctx, 0, 0, 50, rf); ctx.restore();
    G.text(ctx, 'RL = ' + fmtSI(p.RL, 'Ω'), lx, sy + 108, { s: 12, w: 800, c: MZ.fg(ctx), mono: 1 });
    // moving charges in wires
    if (p.cur !== false) {
      const sp1 = clamp(iP, -1, 1), sp2 = clamp(iS, -1, 1); S._qa = (S._qa || 0) + sp1 * 3; S._qb = (S._qb || 0) + sp2 * 3;
      if (Math.abs(sp1) > .02 || (p.src === 'dc' && S.sw)) { const loop1 = [[g.xl - 18, yA], [sx, yA], [sx, yB], [g.xl - 18, yB]]; G.dotsAlong(ctx, loop1, p.src === 'dc' ? S.t * 40 : S._qa, '#f59e0b', 18); }
      if (Math.abs(sp2) > .02) { const loop2 = [[g.xr + 18, yB], [lx, yB], [lx, yA], [g.xr + 18, yA]]; G.dotsAlong(ctx, loop2, S._qb, '#f59e0b', 18); }
    }
    // ---- instantaneous values / ratio ----
    if (p.lab !== false) {
      G.text(ctx, 'vp = ' + fmt(vp, 3) + ' V', g.xl, g.yt - g.t / 2 - 42, { s: 12, w: 800, c: '#c2410c', mono: 1 });
      G.text(ctx, 'vs = ' + fmt(vs, 3) + ' V', g.xr, g.yt - g.t / 2 - 42, { s: 12, w: 800, c: '#b45309', mono: 1 });
      const bx = g.cx, by = g.yb + g.t / 2 + 78; const ratio = p.Ns / p.Np;
      MZ.box(ctx, bx - 190, by - 26, 380, 52, MZ.book(ctx) ? 'rgba(236,253,245,.95)' : 'rgba(6,78,59,.6)', '#10b981');
      G.text(ctx, `Vs/Vp = ${fmt(r.Vs / (S.sw && ac ? p.Vp : 1) || 0, 3)}     Ns/Np = ${fmt(ratio, 3)}`, bx, by - 8, { s: 14, w: 900, c: MZ.book(ctx) ? '#065f46' : '#6ee7b7', mono: 1 });
      const kind = !ac ? 'مصدر مستمر: الفيض ثابت ⇐ لا فولطية في الثانوي (إلا لحظة الغلق والفتح)' : !S.sw ? 'المفتاح مفتوح: لا تيار ولا فيض' : ratio > 1.001 ? 'محولة رافعة: Ns > Np ⇐ Vs > Vp و Is < Ip' : ratio < .999 ? 'محولة خافضة: Ns < Np ⇐ Vs < Vp و Is > Ip' : 'نسبة 1:1';
      G.text(ctx, kind, bx, by + 12, { s: 12, w: 800, c: !ac ? '#b91c1c' : MZ.book(ctx) ? '#047857' : '#a7f3d0' });
    }
    // ---- graph ----
    if (p.emf !== false) {
      const gy = Math.min(h - 170, g.yb + g.t / 2 + 120), gh = Math.min(120, h - 90 - gy); if (gh > 60) {
        const mx = Math.max(Vpk, Vspk * Math.sqrt(eff(S)), 1) * 1.05;
        MZ.plot(ctx, 76, gy, w - 152, gh, [{ pts: S.hF, col: '#2563eb', max: 1.05, dash: [5, 4], name: 'Φ' }, { pts: S.hVp, col: '#c2410c', max: mx, name: 'vp' }, { pts: S.hVs, col: '#ca8a04', max: mx, name: 'vs' }], { t1: S.t, span: p.slow !== false ? 5 : 1.4, title: 'مع الزمن (مقياس مشترك للفولطيتين)' });
      }
    }
  };
  E.drags = S => {
    const g = geo(S), sx = g.sx, sy = g.cy, lx = g.lx; const hC = g.chh - 50;
    const logDrag = (k, a, b) => ({ down: S => { S._v0 = S.p[k]; }, drag: (S, d) => setParam(S, k, Math.round(clamp(S._v0 * Math.exp(-(d.y - d.sy) / 90), a, b) / 10) * 10), wheel: (S, s) => setParam(S, k, Math.round(S.p[k] * (s > 0 ? 1.12 : 1 / 1.12) / 10) * 10) });
    return [
      Object.assign({ id: 'coilP', x: g.xl, y: g.cy, w: g.t + 26, h: hC, axis: 'y', tip: 'اسحب للأعلى لزيادة لفات الابتدائي Np (أو استعمل العجلة)', idle: 'اسحب الملف لتغيير عدد لفاته ✋' }, logDrag('Np', 50, 1000)),
      Object.assign({ id: 'coilS', x: g.xr, y: g.cy, w: g.t + 26, h: hC, axis: 'y', tip: 'اسحب للأعلى لزيادة لفات الثانوي Ns (أو استعمل العجلة)' }, logDrag('Ns', 10, 4000)),
      { id: 'sw', x: (sx + g.xl) / 2, y: g.yt + 28, w: 60, h: 34, hint: false, tip: 'انقر لغلق / فتح مفتاح الدائرة الابتدائية', click: S => { S.sw = !S.sw; } },
      { id: 'knob', x: sx, y: g.yb - 34 + 44, r: 22, axis: 'y', tip: 'اسحب للأعلى/الأسفل لتغيير فولطية المصدر Vp', down: S => { S._v0 = S.p.Vp; }, drag: (S, d) => setParam(S, 'Vp', S._v0 - (d.y - d.sy) * 1.2), wheel: (S, s) => setParam(S, 'Vp', S.p.Vp + s * 5) },
      { id: 'ac', x: sx - 22, y: sy - 62, w: 44, h: 26, hint: false, tip: 'مصدر تيار متناوب', click: S => setParam(S, 'src', 'ac') },
      { id: 'dc', x: sx + 24, y: sy - 62, w: 44, h: 26, hint: false, tip: 'مصدر تيار مستمر (بطارية)', click: S => setParam(S, 'src', 'dc') },
      Object.assign({ id: 'load', x: lx, y: sy + 61, w: 40, h: 60, axis: 'y', hint: false, tip: 'اسحب منزلق المقاومة لتغيير مقاومة الحمل RL' }, { down: S => { S._v0 = S.p.RL; }, drag: (S, d) => setParam(S, 'RL', clamp(S._v0 * Math.exp((d.y - d.sy) / 50), 10, 5000)), wheel: (S, s) => setParam(S, 'RL', S.p.RL * (s > 0 ? 1.2 : 1 / 1.2)) })
    ];
  };
  E.pointer = null;
  // B field only inside the core (direction along the magnetic circuit)
  E.field = (S, x, y) => {
    const g = geo(S); const o = g.t / 2; const inO = x > g.xl - o && x < g.xr + o && y > g.yt - o && y < g.yb + o, inI = x > g.xl + o && x < g.xr - o && y > g.yt + o && y < g.yb - o;
    if (!inO || inI) return [0, 0]; const B = 1.2 * (S.phi || 0); // phi>0 : clockwise on screen (up the left limb)
    if (Math.abs(x - g.xl) <= o) return [0, -B]; if (Math.abs(x - g.xr) <= o) return [0, B]; if (Math.abs(y - g.yt) <= o) return [B, 0]; return [-B, 0];
  };
  E.fieldRef = () => .6;
  E.readings = function (S) { const r = E.calc(S); const p = S.p; const Phm = S.sw && p.src === 'ac' ? p.Vp * Math.SQRT2 / (p.Np * TAU * 50) : 0; return [rd('Vs = Vp × Ns/Np', fmtSI(r.Vs, 'V')), rd('تيار الثانوي Is', fmtSI(r.Is, 'A')), rd('تيار الابتدائي Ip', fmtSI(r.Ip, 'A')), rd('القدرة المنقولة', fmtSI(r.P, 'W')), rd('نسبة التحويل Ns/Np', fmt(p.Ns / p.Np, 3)), rd('أعظم فيض في القلب Φm', fmtSI(Phm, 'Wb')), rd('الكفاءة', Math.round(eff(S) * 100) + ' %')]; };
  E.explain = S => { const p = S.p; if (!S.sw) return 'المفتاح <b>مفتوح</b>: لا تيار في الابتدائي فلا فيض في القلب ولا فولطية في الثانوي. انقر المفتاح على الشكل.'; if (p.src === 'dc') return 'مع المصدر المستمر يتولد فيض <b>ثابت</b> في القلب، فلا تتولد فولطية في الثانوي إلا <b>لحظة</b> غلق المفتاح أو فتحه (حين يتغير الفيض). جرّب النقر على المفتاح.'; return `التيار المتناوب في الابتدائي يولد فيضاً <b>متناوباً</b> (الأسهم الزرقاء تنقلب كل نصف دورة) يسري في القلب الحديدي ويخترق <b>كل لفة</b> من الملفين، فتتولد في كل لفة القوة الدافعة نفسها؛ لذلك Vs/Vp = Ns/Np = <b>${fmt(p.Ns / p.Np, 3)}</b>. ${p.lam === false ? 'القلب المصمت تتولد فيه تيارات دوامة تهدر جزءاً من الطاقة؛ لذلك يصنع من شرائح معزولة.' : ''}`; };
  E.howto = 'اسحب <b>أي ملف</b> للأعلى أو الأسفل (أو حرّك عجلة الفأرة فوقه) لتغيير عدد لفاته، وانقر <b>المفتاح</b> لغلق الدائرة، ودوّر <b>مقبض المصدر</b> لتغيير Vp، واختر AC أو DC من الزرين فوق المصدر، واسحب منزلق <b>مقاومة الحمل</b>. أسهم الفيض الزرقاء في القلب تبين اتجاه الفيض الذي ينقلب مع التيار المتناوب.';
})();

/* =====================================================================
   2) em_wave — oscillating dipole: exact Hertz-dipole E-field lines
      (contours of Ψ = sin²θ[cos(kr−ωt)/(kr) + sin(kr−ωt)]), B as ⊙/⊗,
      charges/current on the antenna, draggable probe, 3D E⊥B⊥c view
   ===================================================================== */
(() => {
  const E = MZ.E('em_wave'); if (!E) return;
  E.controls = E.controls.concat([
    R('ant', 'طول الهوائي ℓ', .2, 25, 3.3, .1, 'm'),
    SEL('view', 'طريقة العرض', [['2d', 'مجالات الهوائي'], ['3d', 'ثلاثي الأبعاد']], '2d'),
    TG('lines', 'خطوط المجال الكهربائي E', true, null, 'efield'),
    TG('chg', 'الشحنات والتيار في الهوائي', true, null, 'charges'),
    TG('probe', 'مجس المجال (اسحبه)', true, null, 'meter'),
    TG('graph', 'منحني E عند المجس مع الزمن', true, null, 'graph'),
    TG('lab', 'التسميات والقيم', true, null, 'labels'),
    TG('slow', 'عرض بطيء', true, null, 'slow')
  ]);
  const phys = S => { const L = S.p.L * 1e-6, C = S.p.Cp * 1e-12; const f = 1 / (TAU * Math.sqrt(L * C)); const lam = 3e8 / f; const r = S.p.ant / (lam / 2); const A = 1 / (1 + 5 * (r - 1) ** 2); return { f, lam, r, A }; };
  E.setup = S => { S.ph = 0; S.pr = null; S.hE = []; S.hE0 = []; S.v3 = new View3D(); S.v3.showLabels = true; S.v3.yaw = -.6; S.v3.pitch = .32; S.v3.zoom = .72; };
  E.update = (S, dt) => { S.ph += dt * TAU * (S.p.slow !== false ? .35 : .9); S.v3 && S.v3.step(dt); const g = geo(S); if (!S.pr) S.pr = { x: g.ax + g.lp * 1.25, y: g.cy - 40 }; const q = fieldAt(S, g, S.pr.x, S.pr.y); hist(S, 'hE', q ? -q.Ey : 0, 300); hist(S, 'hE0', Math.cos(S.ph), 300); };
  const geo = S => { const w = S.W || 820, h = S.H || 780; const P = phys(S); const lp = clamp(260 * Math.pow(P.lam / 6.57, .4), 120, 520); const sc = lp / P.lam; const ax = Math.max(190, w * .25), cy = h * .44; const arm = clamp(S.p.ant / 2 * sc, 10, h * .36); return { w, h, ax, cy, lp, sc, arm, k: TAU / lp, P, x1: w - 14, y0: 56, y1: h - 170 }; };
  const psi = (X, Z, k, wt, A) => { const r = Math.hypot(X, Z); const kr = Math.max(.45, k * r); const s2 = (X * X) / (r * r || 1); const u = kr - wt; return A * s2 * (Math.cos(u) / kr + Math.sin(u)); };
  function fieldAt(S, g, x, y) {
    const X = x - g.ax, Z = g.cy - y; if (X < 2) return null; const r = Math.hypot(X, Z); if (g.k * r < .5) return null; const A = g.P.A, wt = S.ph, h = 1.5;
    const dR = (psi(X + h, Z, g.k, wt, A) - psi(X - h, Z, g.k, wt, A)) / (2 * h), dZ = (psi(X, Z + h, g.k, wt, A) - psi(X, Z - h, g.k, wt, A)) / (2 * h);
    const Ez = dR / X, Er = -dZ / X; const kr = g.k * r, u = kr - wt, sn = X / r;
    const B = -A * sn * (Math.cos(u) - Math.sin(u) / kr) * 3 / (3 + kr / 2);
    return { Ex: Er * g.lp, Ey: -Ez * g.lp, B };
  }
  function contours(ctx, S, g) {
    const cs = 7, x0 = g.ax + 3, nx = Math.floor((g.x1 - x0) / cs), ny = Math.floor((g.y1 - g.y0) / cs); const A = g.P.A, wt = S.ph;
    const V = new Float32Array((nx + 1) * (ny + 1));
    for (let j = 0; j <= ny; j++) for (let i = 0; i <= nx; i++) V[j * (nx + 1) + i] = psi(x0 + i * cs - g.ax, g.cy - (g.y0 + j * cs), g.k, wt, A);
    const levels = [-1.4, -.85, -.45, -.15, .15, .45, .85, 1.4]; const arrows = [];
    ctx.strokeStyle = '#ea580c'; ctx.lineWidth = 1.7; ctx.beginPath();
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
      const a = V[j * (nx + 1) + i], b = V[j * (nx + 1) + i + 1], c = V[(j + 1) * (nx + 1) + i + 1], d = V[(j + 1) * (nx + 1) + i];
      const X = x0 + i * cs, Y = g.y0 + j * cs;
      for (const L of levels) {
        const pts = []; const e = (v1, v2, p1, p2) => { if ((v1 - L) * (v2 - L) < 0) { const t = (L - v1) / (v2 - v1); pts.push([p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t]); } };
        e(a, b, [X, Y], [X + cs, Y]); e(b, c, [X + cs, Y], [X + cs, Y + cs]); e(c, d, [X + cs, Y + cs], [X, Y + cs]); e(d, a, [X, Y + cs], [X, Y]);
        if (pts.length >= 2) { ctx.moveTo(pts[0][0], pts[0][1]); ctx.lineTo(pts[1][0], pts[1][1]); if (pts.length === 4) { ctx.moveTo(pts[2][0], pts[2][1]); ctx.lineTo(pts[3][0], pts[3][1]); }
          if (i % 11 === 6 && (j + i) % 2 === 0 && arrows.length < 90) arrows.push([(pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2]); }
      }
    }
    ctx.stroke();
    arrows.forEach(([x, y]) => { const q = fieldAt(S, g, x, y); if (!q) return; const m = Math.hypot(q.Ex, q.Ey); if (m < 1e-6) return; const ux = q.Ex / m, uy = q.Ey / m; G.arrow(ctx, x - ux * 5, y - uy * 5, x + ux * 5, y + uy * 5, '#ea580c', 1.6, 8); });
  }
  function osc(ctx, S, g) {
    const bx = g.ax - 118, by = g.cy - 70, bw = 96, bh = 140;
    MZ.box(ctx, bx, by, bw, bh, MZ.book(ctx) ? 'rgba(220,252,231,.95)' : 'rgba(20,83,45,.75)', '#16a34a', 10);
    G.text(ctx, 'مذبذب LC', bx + bw / 2, by + 14, { s: 12, w: 900, c: MZ.book(ctx) ? '#166534' : '#bbf7d0' });
    // coil
    const cx = bx + 26, c0 = by + 34; ctx.strokeStyle = '#c2410c'; ctx.lineWidth = 2.2; ctx.beginPath(); for (let i = 0; i < 5; i++) ctx.arc(cx, c0 + 9 + i * 17, 8.5, -Math.PI / 2, Math.PI / 2); ctx.stroke();
    G.text(ctx, 'L', cx - 16, c0 + 50, { s: 13, w: 900, c: '#c2410c' });
    // variable capacitor + knob
    const kx = bx + 68, ky = by + 60; ctx.strokeStyle = MZ.fg(ctx); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(kx - 12, ky - 4); ctx.lineTo(kx + 12, ky - 4); ctx.moveTo(kx - 12, ky + 4); ctx.lineTo(kx + 12, ky + 4); ctx.stroke(); G.arrow(ctx, kx - 14, ky + 14, kx + 14, ky - 14, MZ.fg(ctx), 1.5, 6);
    MZ.knob(ctx, kx, by + 108, 13, (S.p.Cp - .5) / 19.5, '#16a34a', 'C');
    ctx.strokeStyle = MZ.fg(ctx); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(cx, c0); ctx.lineTo(cx, by + 28); ctx.lineTo(kx, by + 28); ctx.lineTo(kx, ky - 4); ctx.moveTo(kx, ky + 4); ctx.lineTo(kx, by + 90); ctx.moveTo(cx, c0 + 85); ctx.lineTo(cx, by + 128); ctx.lineTo(kx - 20, by + 128); ctx.stroke();
    return { bx, by, bw, bh, kx, ky: by + 108, cx, cy: c0 + 42 };
  }
  function draw2d(ctx, w, h, S, g) {
    const p = S.p; const wt = S.ph; const q = Math.cos(wt), I = -Math.sin(wt);
    if (p.lines !== false) contours(ctx, S, g);
    // B: ⊙ / ⊗ grid
    if (p.showB) { const sp = 44; for (let y = g.y0 + 18; y < g.y1; y += sp) for (let x = g.ax + 28; x < g.x1 - 6; x += sp) { const f = fieldAt(S, g, x, y); if (!f) continue; const m = Math.min(1, Math.abs(f.B)); if (m < .12) continue; MZ.sym(ctx, x, y, 3 + 5 * m, f.B < 0, '#2563eb', .3 + .7 * m); } }
    // antenna arms + feed
    const O = osc(ctx, S, g); S._osc = O;
    const top = g.cy - 8 - g.arm, bot = g.cy + 8 + g.arm;
    G.wire(ctx, [[O.bx + O.bw, g.cy - 30], [g.ax - 14, g.cy - 30], [g.ax - 14, g.cy - 8], [g.ax, g.cy - 8]], MZ.fg(ctx), 2); G.wire(ctx, [[O.bx + O.bw, g.cy + 30], [g.ax - 14, g.cy + 30], [g.ax - 14, g.cy + 8], [g.ax, g.cy + 8]], MZ.fg(ctx), 2);
    const topCol = q > 0 ? '#dc2626' : '#2563eb', botCol = q > 0 ? '#2563eb' : '#dc2626';
    setRaw(ctx, 1); ctx.fillStyle = p.chg !== false ? topCol : '#94a3b8'; ctx.fillRect(g.ax - 5, top, 10, g.cy - 8 - top); ctx.fillStyle = p.chg !== false ? botCol : '#94a3b8'; ctx.fillRect(g.ax - 5, g.cy + 8, 10, bot - g.cy - 8); setRaw(ctx, 0);
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.strokeRect(g.ax - 5, top, 10, g.cy - 8 - top); ctx.strokeRect(g.ax - 5, g.cy + 8, 10, bot - g.cy - 8);
    if (p.chg !== false) {
      // charge density ∝ sin along the arm (max at the ends), sign flips with q
      const n = 5; for (let i = 0; i < n; i++) { const f = (i + .5) / n; const dens = Math.sin(f * Math.PI / 2) * Math.abs(q); if (dens < .15) continue; const al = clamp(dens, .2, 1);
        G.text(ctx, q > 0 ? '+' : '−', g.ax + 16, g.cy - 8 - f * (g.cy - 8 - top), { s: 14, w: 900, c: q > 0 ? `rgba(220,38,38,${al})` : `rgba(37,99,235,${al})` });
        G.text(ctx, q > 0 ? '−' : '+', g.ax + 16, g.cy + 8 + f * (bot - g.cy - 8), { s: 14, w: 900, c: q > 0 ? `rgba(37,99,235,${al})` : `rgba(220,38,38,${al})` }); }
      // current (max at the centre): arrows on both arms, same direction
      if (Math.abs(I) > .1) { const dir = I > 0 ? -1 : 1, L = 10 + 16 * Math.abs(I); [g.cy - 8 - g.arm * .35, g.cy + 8 + g.arm * .35].forEach(yy => G.arrow(ctx, g.ax - 20, yy - dir * L / 2, g.ax - 20, yy + dir * L / 2, '#d97706', 2.6, 8)); G.text(ctx, 'I', g.ax - 32, g.cy - 8 - g.arm * .35, { s: 13, w: 900, c: '#d97706' }); }
    }
    // tip handles
    [top, bot].forEach(y => { setRaw(ctx, 1); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(g.ax, y, 6, 0, TAU); ctx.fill(); ctx.stroke(); setRaw(ctx, 0); });
    // probe
    if (p.probe !== false && S.pr) { const f = fieldAt(S, g, S.pr.x, S.pr.y); const x = S.pr.x, y = S.pr.y;
      setRaw(ctx, 1); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y, 12, 0, TAU); ctx.fill(); ctx.stroke(); setRaw(ctx, 0);
      if (f) { const m = Math.hypot(f.Ex, f.Ey), sc = clamp(m * g.lp / TAU * 40, 0, 60) / (m || 1); if (m * sc > 2) G.arrow(ctx, x, y, x + f.Ex * sc, y + f.Ey * sc, '#ea580c', 3.2, 11); if (p.showB && Math.abs(f.B) > .05) MZ.sym(ctx, x, y, 7, f.B < 0, '#2563eb', 1);
        G.text(ctx, 'E = ' + fmt(m * g.lp / TAU, 2) + '  (نسبي)', x, y + 26, { s: 11, w: 800, c: '#fff', bg: 'rgba(124,58,237,.9)', raw: 1 }); }
      else G.text(ctx, 'قرب الهوائي', x, y + 26, { s: 11, w: 800, c: '#fff', bg: 'rgba(124,58,237,.9)', raw: 1 });
    }
    if (p.lab !== false) {
      // wavelength bar
      const yb = g.y0 + 6; const xa = g.ax + 30; G.arrow(ctx, xa + g.lp / 2, yb, xa, yb, '#7c3aed', 1.8, 7); G.arrow(ctx, xa + g.lp / 2, yb, xa + g.lp, yb, '#7c3aed', 1.8, 7); G.text(ctx, 'λ = ' + fmtSI(g.P.lam, 'm'), xa + g.lp / 2, yb + 13, { s: 12, w: 900, c: '#7c3aed', mono: 1 });
      G.text(ctx, 'ℓ = ' + fmt(p.ant, 3) + ' m', g.ax, bot + 22, { s: 12, w: 900, c: MZ.fg(ctx), mono: 1 });
      const ok = g.P.A; G.text(ctx, g.P.r > 1.12 ? 'الهوائي أطول من λ/2' : g.P.r < .88 ? 'الهوائي أقصر من λ/2' : 'ℓ ≈ λ/2 : أفضل إشعاع ✓', g.ax, bot + 42, { s: 11, w: 800, c: '#fff', bg: ok > .8 ? 'rgba(22,163,74,.9)' : 'rgba(234,88,12,.9)', raw: 1 });
      G.text(ctx, 'f = ' + fmtSI(g.P.f, 'Hz'), O.bx + O.bw / 2, O.by + O.bh + 16, { s: 12, w: 900, c: '#16a34a', mono: 1 });
      if (p.showB) G.text(ctx, '⊙ B خارج الصفحة   ⊗ B داخل الصفحة', g.x1 - 8, g.y1 + 16, { s: 11, w: 800, c: '#2563eb', a: 'right' });
      if (p.lines !== false) G.text(ctx, 'خطوط E تنفصل عن الهوائي وتنتشر بسرعة c ⟵', g.x1 - 8, g.y1 + 36, { s: 11, w: 800, c: '#ea580c', a: 'right' });
    }
    if (p.graph !== false) { const gy = g.y1 + 12, gh = Math.min(80, g.h - 90 - gy); if (gh > 40) MZ.plot(ctx, 76, gy, Math.max(200, Math.min(290, g.w / 2 - 130)), gh, [{ pts: S.hE0, col: '#dc2626', max: 1.1, name: 'q على الهوائي', dash: [4, 3], w: 1.5 }, { pts: S.hE, col: '#ea580c', max: Math.max(.2, ...S.hE.slice(-150).map(q => Math.abs(q[1]))) * 1.1, name: 'E عند المجس' }], { t1: S.t, span: 5 }); }
  }
  function draw3d(ctx, w, h, S) {
    const v = S.v3; v.frame(w, h); v.target = [2.6, 0, 0]; const L = []; const p = S.p; const g = geo(S); const A = g.P.A;
    const ph = S.ph; const lam3 = 2.4, x0 = 0, x1 = 5.6, amp = 1.1 * Math.max(.25, A);
    // floor grid
    for (let x = 0; x <= 6; x += 1) v.line(L, [x, -1.6, -1.4], [x, -1.6, 1.4], 'rgba(148,163,184,.35)', 1, { bias: -5 });
    for (let z = -1.4; z <= 1.41; z += .7) v.line(L, [0, -1.6, z], [6, -1.6, z], 'rgba(148,163,184,.35)', 1, { bias: -5 });
    // antenna (along y)
    const q = Math.cos(ph); v.box(L, [-.6, .75, 0], [.12, 1.3, .12], q > 0 ? '#dc2626' : '#2563eb'); v.box(L, [-.6, -.75, 0], [.12, 1.3, .12], q > 0 ? '#2563eb' : '#dc2626');
    v.label(L, [-.6, 1.65, 0], q > 0 ? '+' : '−', { s: 16, w: 900, c: q > 0 ? '#dc2626' : '#2563eb' });
    // axis
    v.line(L, [x0, 0, 0], [x1 + .5, 0, 0], MZ.fg(ctx), 2, { arrow: 1 }); v.label(L, [x1 + .75, 0, 0], 'c', { s: 16, w: 900, c: MZ.fg(ctx) });
    const Ep = [], Bp = [];
    for (let x = x0; x <= x1; x += .06) { const u = TAU * x / lam3 - ph; const e = amp * Math.cos(u) * (1 - .08 * x / x1); Ep.push([x, e, 0]); Bp.push([x, 0, e * .85]); }
    if (p.lines !== false) { v.poly3(L, Ep, '#ea580c', 2.6); for (let i = 0; i < Ep.length; i += 5) { const P = Ep[i]; if (Math.abs(P[1]) > .08) v.line(L, [P[0], 0, 0], P, 'rgba(234,88,12,.75)', 1.6, { arrow: Math.abs(P[1]) > .3 }); } }
    if (p.showB) { v.poly3(L, Bp, '#2563eb', 2.6); for (let i = 0; i < Bp.length; i += 5) { const P = Bp[i]; if (Math.abs(P[2]) > .08) v.line(L, [P[0], 0, 0], P, 'rgba(37,99,235,.75)', 1.6, { arrow: Math.abs(P[2]) > .3 }); } }
    if (p.lab !== false) { v.label(L, [1.0, amp + .35, 0], 'E', { s: 17, w: 900, c: '#ea580c' }); v.label(L, [1.0, 0, amp + .4], 'B', { s: 17, w: 900, c: '#2563eb' });
      // right-hand triad at the end
      const t = [x1 + .2, -1.2, 0]; v.line(L, t, [t[0], t[1] + .7, t[2]], '#ea580c', 2.5, { arrow: 1 }); v.line(L, t, [t[0], t[1], t[2] + .7], '#2563eb', 2.5, { arrow: 1 }); v.line(L, t, [t[0] + .7, t[1], t[2]], MZ.fg(ctx), 2.5, { arrow: 1 });
      v.label(L, [t[0], t[1] + .9, t[2]], 'E', { s: 13, w: 900, c: '#ea580c' }); v.label(L, [t[0], t[1], t[2] + .95], 'B', { s: 13, w: 900, c: '#2563eb' }); v.label(L, [t[0] + .95, t[1], t[2]], 'c', { s: 13, w: 900, c: MZ.fg(ctx) }); }
    v.render(ctx, L);
    if (p.lab !== false) G.text(ctx, 'E ⊥ B ⊥ c ، والمجالان متفقان في الطور (يبلغان القيمة العظمى معاً)', w / 2, h - 108, { s: 13, w: 800, c: MZ.fg(ctx), bg: MZ.book(ctx) ? 'rgba(241,245,249,.95)' : 'rgba(15,23,42,.8)', raw: 1 });
    const bt = [['أمامي (كالكتاب)', 0, 0], ['ثلاثي الأبعاد', -.6, .32], ['علوي', 0, 1.2]]; S._vb = bt.map((b, i) => MZ.pill(ctx, 150 + i * 118, h - 140 + 0, b[0], false, '#2563eb', { w: 108 }));
    G.text(ctx, 'اسحب في أي مكان لتدوير المنظر', w / 2, 24, { s: 12, w: 700, c: MZ.mute(ctx) });
  }
  E.draw = (ctx, w, h, S) => {
    G.bg(ctx, w, h, S.p.view !== '3d'); const g = geo(S);
    S._pv = MZ.pill(ctx, 180, 22, S.p.view === '3d' ? '⟵ مجالات الهوائي (2D)' : 'عرض ثلاثي الأبعاد E⊥B ⟶', true, '#7c3aed', { w: 190 });
    if (S.p.view === '3d') draw3d(ctx, w, h, S); else draw2d(ctx, w, h, S, g);
  };
  E.pointer = (S, t, x, y) => { if (S.p.view !== '3d') return; S.v3.pointer(t === 'dbl' ? 'up' : t, x, y); if (t === 'dbl') S.v3.setView(-.6, .32); };
  E.wheel = (S, dy) => { if (S.p.view === '3d') S.v3.zoom = clamp(S.v3.zoom * (dy < 0 ? 1.1 : 1 / 1.1), .5, 2.5); };
  E.drags = S => {
    const g = geo(S), w = g.w, h = g.h; const L = [{ id: 'view', x: 180, y: 22, w: 190, h: 26, hint: false, tip: 'انقر للتبديل بين مجالات الهوائي والعرض الثلاثي الأبعاد', click: S => setParam(S, 'view', S.p.view === '3d' ? '2d' : '3d') }];
    if (S.p.view === '3d') { [[0, 0], [-.6, .32], [0, 1.2]].forEach((v, i) => L.push({ id: 'vb' + i, x: 150 + i * 118, y: h - 140, w: 108, h: 26, hint: false, tip: 'غيّر زاوية النظر', click: S => S.v3.setView(v[0], v[1]) })); return L; }
    const top = g.cy - 8 - g.arm, bot = g.cy + 8 + g.arm; const O = { bx: g.ax - 118, by: g.cy - 70 };
    const antDrag = sgn => ({ down: S => { S._v0 = S.p.ant; }, drag: (S, d) => { const gg = geo(S); setParam(S, 'ant', S._v0 + sgn * -(d.y - d.sy) * 2 / gg.sc); }, wheel: (S, s) => setParam(S, 'ant', S.p.ant * (s > 0 ? 1.08 : 1 / 1.08)) });
    L.push(Object.assign({ id: 'antT', x: g.ax, y: top, r: 16, axis: 'y', tip: 'اسحب طرف الهوائي لتغيير طوله ℓ (الأفضل ℓ = λ/2)', idle: 'اسحب طرف الهوائي ✋' }, antDrag(1)));
    L.push({ id: 'capC', x: O.bx + 68, y: O.by + 108, r: 18, axis: 'y', tip: 'مقبض المتسعة المتغيرة: اسحب للأعلى/للأسفل لتغيير C ومن ثم التردد', down: S => { S._v0 = S.p.Cp; }, drag: (S, d) => setParam(S, 'Cp', S._v0 - (d.y - d.sy) * .08), wheel: (S, s) => setParam(S, 'Cp', S.p.Cp + s * .3) });
    if (S.p.probe !== false && S.pr) L.push({ id: 'probe', x: S.pr.x, y: S.pr.y, r: 16, axis: 'xy', tip: 'مجس المجال الكهربائي: ضعه في أي نقطة', drag: (S, d) => { const gg = geo(S); S.pr = { x: clamp(d.ox + d.x - d.sx, gg.ax + 20, gg.x1 - 10), y: clamp(d.oy + d.y - d.sy, gg.y0 + 10, gg.y1 - 10) }; } });
    L.push(Object.assign({ id: 'antB', x: g.ax, y: bot, r: 16, axis: 'y', hint: false, tip: 'اسحب طرف الهوائي لتغيير طوله ℓ' }, antDrag(-1)));
    L.push({ id: 'coilL', x: O.bx + 26, y: O.by + 76, w: 26, h: 90, axis: 'y', hint: false, tip: 'الملف L: اسحب أو استعمل العجلة لتغيير معامل الحث', down: S => { S._v0 = S.p.L; }, drag: (S, d) => setParam(S, 'L', S._v0 - (d.y - d.sy) * .08), wheel: (S, s) => setParam(S, 'L', S.p.L + s * .4) });
    return L;
  };
  E.readings = S => { const P = phys(S); return [rd('التردد الرنيني fr', fmtSI(P.f, 'Hz')), rd('الطول الموجي λ = c/f', fmtSI(P.lam, 'm')), rd('طول الهوائي المناسب ℓ = λ/2', fmtSI(P.lam / 2, 'm')), rd('طول الهوائي الحالي ℓ', fmtSI(S.p.ant, 'm')), rd('كفاءة الإشعاع (نسبية)', Math.round(P.A * 100) + ' %'), rd('الهوائي المؤرض λ/4', fmtSI(P.lam / 4, 'm')), rd('c = 1/√(μ₀ε₀)', fmt(1 / Math.sqrt(4e-7 * Math.PI * 8.854e-12), 4, 'm/s'), 1)]; };
  E.howto = 'دوّر <b>مقبض المتسعة C</b> في المذبذب (أو استعمل العجلة فوق الملف L) لتغيير التردد، واسحب <b>طرفي الهوائي</b> لتغيير طوله — أقوى إشعاع عندما ℓ = λ/2. الخطوط البرتقالية هي خطوط المجال الكهربائي المحسوبة لثنائي القطب، ⊙/⊗ الزرقاء هي المجال المغناطيسي. اسحب <b>المجس البنفسجي</b> لقراءة E في أي نقطة، وانقر زر «ثلاثي الأبعاد» لرؤية E⊥B⊥c (اسحب لتدوير المنظر).';
})();

/* =====================================================================
   3) modulation — AM / FM / PM with directly draggable waveforms
   ===================================================================== */
(() => {
  const E = MZ.E('modulation'); if (!E) return;
  E.controls = E.controls.concat([
    R('fc', 'تردد الموجة الحاملة (نسبي)', 3, 10, 6, .5, ''), R('Ac', 'سعة الموجة الحاملة', .3, 1, .8, .05, ''),
    TG('env', 'غلاف الموجة المضمنة (يطابق شكل الإشارة)', true, null, 'wave'),
    TG('ref', 'الحاملة غير المضمنة للمقارنة', false, null, 'wave'),
    TG('cur', 'مؤشر الزمن عبر الموجات الثلاث', true, null, 'dot'),
    TG('lab', 'التسميات والقيم اللحظية', true, null, 'labels')
  ]);
  const ST = [[600, 'محطة 1'], [900, 'محطتنا'], [1300, 'محطة 3']]; const LRX = 200e-6, Q = 25;
  E.setup = S => { S.ph = 0; S.cur = .55; };
  E.update = (S, dt) => { S.ph += dt; };
  const lay = S => { const w = S.W || 820, h = S.H || 780; const x0 = 84, x1 = w < 700 ? w * .62 : Math.max(360, w * .64); const top = 64, bot = h - 96; const rh = (bot - top) / 3; return { w, h, x0, x1, top, bot, rh, rows: [0, 1, 2].map(i => top + rh * (i + .5)), unit: rh * .2, rx0: x1 + 18, rx1: w - 14 }; };
  const sig = (S, t) => {
    const p = S.p; const fmH = p.fm * .5; const msg = Math.sin(TAU * fmH * t); const car = p.Ac * Math.sin(TAU * p.fc * t); let mod, env = null, finst = p.fc, dph = 0;
    if (p.mode === 'AM') { env = p.Ac * (1 + p.m * msg); mod = env * Math.sin(TAU * p.fc * t); }
    else if (p.mode === 'FM') { const df = .3 * p.fc * p.m; mod = p.Ac * Math.sin(TAU * p.fc * t - df / fmH * Math.cos(TAU * fmH * t)); finst = p.fc + df * msg; }
    else { dph = 2.5 * p.m * msg; mod = p.Ac * Math.sin(TAU * p.fc * t + dph); }
    return { msg: p.m * msg, car, mod, env, finst, dph, raw: msg };
  };
  const tAt = (S, g, x) => (x - g.x0) / (g.x1 - g.x0) * 4 + S.ph * .5;
  E.draw = (ctx, w, h, S) => {
    G.bg(ctx, w, h); const p = S.p, g = lay(S);
    // mode buttons
    const modes = [['AM', 'تضمين سعوي AM'], ['FM', 'تضمين ترددي FM'], ['PM', 'تضمين طوري PM']]; S._mb = [];
    const pw = w < 700 ? 92 : 124; modes.forEach((m, i) => { const x = (g.x0 + g.x1) / 2 + (i - 1) * (pw + 8); S._mb.push(MZ.pill(ctx, x, 24, w < 700 ? m[0] : m[1], p.mode === m[0], '#d97706', { w: pw, h: 28 })); });
    const rows = [['الإشارة (المعلومات) — صوت', '#16a34a', 'msg'], ['الموجة الحاملة (عالية التردد)', '#2563eb', 'car'], ['الموجة المضمنة ' + p.mode + ' (ترسل من الهوائي)', '#d97706', 'mod']];
    rows.forEach((r, i) => {
      const cy = g.rows[i]; MZ.box(ctx, g.x0 - 8, cy - g.rh / 2 + 6, g.x1 - g.x0 + 16, g.rh - 12, MZ.book(ctx) ? 'rgba(248,250,252,.9)' : 'rgba(15,23,42,.55)', '#cbd5e1', 10);
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(g.x0, cy); ctx.lineTo(g.x1, cy); ctx.stroke();
      if (p.lab !== false) G.text(ctx, r[0], g.x1 - 6, cy - g.rh / 2 + 20, { s: 12, w: 800, c: r[1], a: 'right' });
      if (i === 2 && p.ref) { ctx.strokeStyle = 'rgba(37,99,235,.35)'; ctx.lineWidth = 1.2; ctx.setLineDash([3, 3]); ctx.beginPath(); for (let x = g.x0; x <= g.x1; x += 1) { const y = cy - sig(S, tAt(S, g, x)).car * g.unit; x === g.x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); ctx.setLineDash([]); }
      if (i === 2 && p.env !== false && p.mode === 'AM') [1, -1].forEach(sg => { ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2; ctx.setLineDash([6, 4]); ctx.beginPath(); for (let x = g.x0; x <= g.x1; x += 2) { const y = cy - sg * sig(S, tAt(S, g, x)).env * g.unit; x === g.x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); ctx.setLineDash([]); });
      ctx.strokeStyle = r[1]; ctx.lineWidth = i === 0 ? 2.6 : 1.8; ctx.beginPath();
      for (let x = g.x0; x <= g.x1; x += 1) { const y = cy - sig(S, tAt(S, g, x))[r[2]] * g.unit; x === g.x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
      if (i === 2 && p.env !== false && p.mode !== 'AM') { // FM: shade compressions / PM: show shifted phase markers
        if (p.mode === 'FM') G.text(ctx, 'السعة ثابتة — تتقارب الموجات عند قمم الإشارة وتتباعد عند قيعانها', (g.x0 + g.x1) / 2, cy + g.rh / 2 - 20, { s: 11, w: 700, c: '#b45309' });
        else G.text(ctx, 'السعة والتردد الأساسي ثابتان — يتقدم الطور أو يتأخر تبعاً للإشارة', (g.x0 + g.x1) / 2, cy + g.rh / 2 - 20, { s: 11, w: 700, c: '#b45309' });
      }
      if (i === 2 && p.env !== false && p.mode === 'AM' && p.lab !== false) G.text(ctx, 'الغلاف (المتقطع) له شكل الإشارة نفسها', (g.x0 + g.x1) / 2, cy + g.rh / 2 - 20, { s: 11, w: 700, c: '#15803d' });
    });
    if (p.lab !== false) G.text(ctx, 'المُضمِّن يحمّل الإشارة على الحاملة ↓', g.x0 + 120, g.rows[1] + g.rh / 2, { s: 11, w: 800, c: '#fff', bg: 'rgba(217,119,6,.92)', raw: 1 });
    // time cursor
    if (p.cur !== false) {
      const cx = lerp(g.x0, g.x1, S.cur); const t = tAt(S, g, cx); const s = sig(S, t);
      ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(cx, g.top + 6); ctx.lineTo(cx, g.bot - 6); ctx.stroke(); ctx.setLineDash([]);
      [['msg', 0, '#16a34a'], ['car', 1, '#2563eb'], ['mod', 2, '#d97706']].forEach(([k, i, c]) => { setRaw(ctx, 1); ctx.fillStyle = '#fff'; ctx.strokeStyle = c; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(cx, g.rows[i] - s[k] * g.unit, 5, 0, TAU); ctx.fill(); ctx.stroke(); setRaw(ctx, 0); });
      setRaw(ctx, 1); ctx.fillStyle = '#7c3aed'; ctx.beginPath(); ctx.moveTo(cx - 9, g.bot - 4); ctx.lineTo(cx + 9, g.bot - 4); ctx.lineTo(cx, g.bot - 16); ctx.closePath(); ctx.fill(); setRaw(ctx, 0);
      if (p.lab !== false) { const info = p.mode === 'AM' ? 'السعة اللحظية = ' + fmt(s.env, 2) : p.mode === 'FM' ? 'التردد اللحظي = ' + fmt(s.finst, 3) : 'إزاحة الطور = ' + fmt(deg(s.dph), 3) + '°';
        G.text(ctx, 'الإشارة = ' + fmt(s.msg, 2) + '  ⇐  ' + info, clamp(cx, g.x0 + 130, g.x1 - 130), g.bot + 12, { s: 12, w: 800, c: '#fff', bg: 'rgba(124,58,237,.92)', raw: 1 }); }
    }
    // ---------- receiver ----------
    const rx0 = g.rx0, rx1 = g.rx1, rw = rx1 - rx0, rcx = (rx0 + rx1) / 2; const fr = 1 / (TAU * Math.sqrt(LRX * p.Crx * 1e-12)) / 1e3; S.fr = fr;
    MZ.box(ctx, rx0, 58, rw, h - 150, MZ.book(ctx) ? 'rgba(241,245,249,.96)' : 'rgba(15,23,42,.8)', '#94a3b8', 12);
    G.text(ctx, rw < 200 ? 'المستقبل' : 'جهاز الاستقبال (دائرة التنغيم)', rcx, 76, { s: 13, w: 900, c: MZ.fg(ctx) });
    // antenna + LC tank
    const ay = 104, ty = 170; ctx.strokeStyle = MZ.fg(ctx); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(rx0 + 30, ay + 40); ctx.lineTo(rx0 + 30, ay); ctx.moveTo(rx0 + 20, ay); ctx.lineTo(rx0 + 30, ay + 12); ctx.lineTo(rx0 + 40, ay); ctx.stroke();
    const lx = rcx - 40, kx = rcx + 36; ctx.strokeStyle = '#c2410c'; ctx.lineWidth = 2.2; ctx.beginPath(); for (let i = 0; i < 4; i++) ctx.arc(lx, ty - 24 + i * 16, 8, -Math.PI / 2, Math.PI / 2); ctx.stroke();
    ctx.strokeStyle = MZ.fg(ctx); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx, ty - 32); ctx.lineTo(lx, ty - 44); ctx.lineTo(kx, ty - 44); ctx.lineTo(kx, ty - 5); ctx.moveTo(kx, ty + 5); ctx.lineTo(kx, ty + 40); ctx.lineTo(lx, ty + 40); ctx.lineTo(lx, ty + 32); ctx.moveTo(rx0 + 30, ay + 40); ctx.lineTo(lx, ay + 40 > ty - 44 ? ty - 44 : ay + 40); ctx.stroke();
    ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(kx - 14, ty - 5); ctx.lineTo(kx + 14, ty - 5); ctx.moveTo(kx - 14, ty + 5); ctx.lineTo(kx + 14, ty + 5); ctx.stroke(); G.arrow(ctx, kx - 16, ty + 16, kx + 16, ty - 16, MZ.fg(ctx), 1.5, 6);
    G.text(ctx, 'L', lx - 20, ty, { s: 13, w: 900, c: '#c2410c' });
    const kny = ty + 84; MZ.knob(ctx, rcx, kny, 22, (p.Crx - 50) / 350, '#16a34a', 'C = ' + p.Crx + ' pF'); S._kn = [rcx, kny];
    G.text(ctx, 'fr = 1/(2π√LC) = ' + fr.toFixed(0) + ' kHz', rcx, kny + 60, { s: 12, w: 900, c: MZ.book(ctx) ? '#92400e' : '#fde68a', mono: 1 });
    // stations
    let best = 0, bi = -1; S._st = [];
    ST.forEach((s, i) => { const x = s[0] / fr; const resp = 1 / Math.sqrt(1 + Q * Q * (x - 1 / x) ** 2); if (resp > best) { best = resp; bi = i; } const yy = kny + 80 + i * 36; const bw = rw - 36;
      MZ.box(ctx, rx0 + 18, yy, bw, 28, MZ.book(ctx) ? '#e2e8f0' : '#0f172a', null, 6); MZ.box(ctx, rx0 + 18, yy, Math.max(6, bw * resp), 28, `rgba(22,163,74,${.25 + .75 * resp})`, null, 6);
      G.text(ctx, s[1] + '  ' + s[0] + ' kHz', rcx, yy + 14, { s: 12, w: 800, c: MZ.fg(ctx) }); S._st.push({ x: rcx, y: yy + 14, w: bw, h: 28, f: s[0] }); });
    S.best = best; S.bi = bi;
    // detected audio
    const oy = Math.min(h - 130, kny + 80 + 3 * 36 + 60); const ow = rw - 36;
    G.text(ctx, 'الصوت المستخلص (بعد الكشف)', rcx, oy - 34, { s: 11, w: 800, c: MZ.mute(ctx) });
    ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2.2; ctx.beginPath();
    for (let i = 0; i <= ow; i += 2) { const t = i / ow * 4 + S.ph * .5; const v = bi === 1 ? Math.sin(TAU * p.fm * .5 * t) * p.m : Math.sin(TAU * (bi === 0 ? .8 : 2.2) * t) * .7; const y = oy - v * 22 * (best > .15 ? best : 0); i ? ctx.lineTo(rx0 + 18 + i, y) : ctx.moveTo(rx0 + 18, y); } ctx.stroke();
    if (p.lab !== false) G.text(ctx, best > .7 ? (bi === 1 ? '✓ رنين مع محطتنا: نسمع إشارتنا' : '✓ رنين مع ' + ST[bi][1]) : 'غيّر C حتى يحدث الرنين', rcx, oy + 34, { s: 11, w: 800, c: '#fff', bg: best > .7 ? 'rgba(22,163,74,.92)' : 'rgba(100,116,139,.92)', raw: 1 });
  };
  E.drags = S => {
    const g = lay(S); const L = [];
    const waveDrag = (id, i, ka, kf, a0, a1, tip, idle) => ({ id, x: (g.x0 + g.x1) / 2, y: g.rows[i], w: g.x1 - g.x0, h: g.rh - 40, axis: 'xy', tip, idle,
      down: (S, x, y) => { S._a0 = S.p[ka]; S._f0 = S.p[kf]; S._sg = y < g.rows[i] ? 1 : -1; },
      drag: (S, d) => { setParam(S, ka, S._a0 - S._sg * (d.y - d.sy) / g.unit); setParam(S, kf, S._f0 * Math.exp(-(d.x - d.sx) / 160)); },
      wheel: (S, s) => setParam(S, kf, S.p[kf] * (s > 0 ? 1.08 : 1 / 1.08)) });
    L.push(waveDrag('msg', 0, 'm', 'fm', .1, 1, 'اسحب الإشارة: عمودياً لتغيير سعتها (نسبة التضمين) — أفقياً لتغيير ترددها', 'اسحب الموجة ✋'));
    L.push(waveDrag('car', 1, 'Ac', 'fc', .3, 1, 'اسحب الحاملة: عمودياً لتغيير سعتها — أفقياً لتغيير ترددها'));
    L.push({ id: 'knob', x: (g.rx0 + g.rx1) / 2, y: 170 + 84, r: 28, axis: 'y', tip: 'مقبض المتسعة المتغيرة: اسحب للأعلى/للأسفل لتنغيم المستقبل', down: S => { S._v0 = S.p.Crx; }, drag: (S, d) => setParam(S, 'Crx', S._v0 - (d.y - d.sy) * 1.5), wheel: (S, s) => setParam(S, 'Crx', S.p.Crx + s * 3) });
    if (S.p.cur !== false) L.push({ id: 'cursor', x: lerp(g.x0, g.x1, S.cur), y: g.bot - 12, w: 22, h: 26, axis: 'x', hint: false, tip: 'اسحب مؤشر الزمن لمقارنة الموجات الثلاث في اللحظة نفسها', drag: (S, d) => { S.cur = clamp((d.ox + d.x - d.sx - g.x0) / (g.x1 - g.x0), 0, 1); } });
    const pw = g.w < 700 ? 92 : 124; [['AM', -1], ['FM', 0], ['PM', 1]].forEach(([m, i]) => L.push({ id: 'm' + m, x: (g.x0 + g.x1) / 2 + i * (pw + 8), y: 24, w: pw, h: 28, hint: false, tip: 'اختر نوع التضمين', click: S => setParam(S, 'mode', m) }));
    (S._st || []).forEach((s, i) => L.push({ id: 'st' + i, x: s.x, y: s.y, w: s.w, h: s.h, hint: false, tip: 'انقر لتنغيم المستقبل على هذه المحطة (تُضبط C تلقائياً)', click: S => setParam(S, 'Crx', Math.round(1 / (LRX * (TAU * s.f * 1e3) ** 2) * 1e12)) }));
    return L;
  };
  E.howto = 'اختر <b>AM / FM / PM</b> من الأزرار أعلى الشكل. <b>اسحب موجة الإشارة</b> (الخضراء) عمودياً لتغيير سعتها وأفقياً لتغيير ترددها، و<b>اسحب الحاملة</b> (الزرقاء) بالطريقة نفسها. اسحب <b>مؤشر الزمن</b> البنفسجي لمقارنة الموجات في اللحظة نفسها. في المستقبل دوّر <b>مقبض المتسعة</b> أو انقر إحدى المحطات حتى يحدث الرنين.';
})();

/* =====================================================================
   4) app_radar — aim/click to send pulses, echoes, A-scope timing d = ct/2
   ===================================================================== */
(() => {
  const E = MZ.E('app_radar'); if (!E) return;
  E.controls = E.controls.concat([
    TG('beam', 'حزمة الهوائي (اتجاه الإرسال)', true, null, 'ray'),
    TG('waves', 'النبضات المرسلة والصدى المنعكس', true, null, 'wave'),
    TG('scope', 'شاشة الزمن (راسم الذبذبات)', true, null, 'graph'),
    TG('ppi', 'شاشة الرادار الدائرية', true, null, 'eye'),
    TG('lab', 'المسافات والقيم', true, null, 'labels')
  ]);
  const RMAX = 160, VIS = 110; // km, km per (sim) second of the slowed-down pulses
  E.setup = S => { S.sweep = 40; S.pulses = []; S.echoes = []; S.blips = []; S.pt = 0; S.auto = false; S.t2 = { d: 120, ang: 250 }; S.last = null; S.trace = null; S.shots = 0; S.autoT = 1.2; };
  const tg = S => [{ d: S.p.d, ang: S.p.ang, k: 0 }, { d: S.t2.d, ang: S.t2.ang, k: 1 }];
  const fire = S => { S.pulses.push({ a: S.sweep, r: 0, hit: [] }); S.trace = { t: 0, spikes: [] }; S.shots++; Sound.beep && Sound.beep(900, .04, 'sine', .02); };
  E.update = (S, dt) => {
    if (S.auto) { S.sweep = (S.sweep + dt * 36) % 360; S.pt += dt; if (S.pt > .6) { S.pt = 0; S.pulses.push({ a: S.sweep, r: 0, hit: [] }); } }
    else { S.autoT -= dt; if (S.autoT < 0 && !S.shots) { fire(S); } }
    if (S.trace) S.trace.t += dt;
    S.pulses.forEach(p => { const r0 = p.r; p.r += dt * VIS; tg(S).forEach(t => { const diff = Math.abs(((p.a - t.ang) + 540) % 360 - 180); if (diff < 6 && r0 < t.d && p.r >= t.d && !p.hit.includes(t.k)) { p.hit.push(t.k); S.echoes.push({ k: t.k, ang: t.ang, d: t.d, r: 0 }); } }); });
    S.pulses = S.pulses.filter(p => p.r < RMAX + 5);
    S.echoes.forEach(e => { e.r += dt * VIS; if (!e.done && e.r >= e.d) { e.done = true; const tt = 2 * e.d * 1e3 / 3e8; S.last = { t: tt, d: e.d, k: e.k }; S.blips.push({ a: e.ang, d: e.d, life: 4 }); if (S.trace) S.trace.spikes.push({ t: tt, k: e.k }); Sound.beep && Sound.beep(1400, .05, 'sine', .03); } });
    S.echoes = S.echoes.filter(e => e.r < e.d + 12);
    S.blips.forEach(b => b.life -= dt); S.blips = S.blips.filter(b => b.life > 0);
  };
  const lay = S => { const w = S.W || 820, h = S.H || 780; const side = w > 640; const mx = side ? Math.max(250, w * .37) : w * .5, my = h * .42; const R0 = Math.min(side ? w * .255 : w * .42, h * .36); return { w, h, mx, my, R0, sc: R0 / RMAX, side, px: w * .68 + 6, pw: w * .32 - 20 }; };
  const pos = (g, d, ang) => { const a = rad(ang - 90); return [g.mx + Math.cos(a) * d * g.sc, g.my + Math.sin(a) * d * g.sc]; };
  const plane = (ctx, x, y, ang, col) => { ctx.save(); ctx.translate(x, y); ctx.rotate(rad(ang + 90)); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(14, 0); ctx.lineTo(2, -3); ctx.lineTo(-2, -13); ctx.lineTo(-6, -13); ctx.lineTo(-4, -3); ctx.lineTo(-12, -3); ctx.lineTo(-15, -7); ctx.lineTo(-17, -7); ctx.lineTo(-15, 0); ctx.lineTo(-17, 7); ctx.lineTo(-15, 7); ctx.lineTo(-12, 3); ctx.lineTo(-4, 3); ctx.lineTo(-6, 13); ctx.lineTo(-2, 13); ctx.lineTo(2, 3); ctx.closePath(); ctx.fill(); ctx.restore(); };
  E.draw = (ctx, w, h, S) => {
    G.bg(ctx, w, h, false); const p = S.p, g = lay(S); const bk = MZ.book(ctx);
    // map
    MZ.box(ctx, g.mx - g.R0, g.my - g.R0, 2 * g.R0, 2 * g.R0, bk ? '#eef6ff' : '#0b1728', null, g.R0);
    ctx.strokeStyle = bk ? 'rgba(37,99,235,.25)' : 'rgba(148,163,184,.3)'; ctx.lineWidth = 1;
    for (let r = 40; r <= RMAX; r += 40) { ctx.beginPath(); ctx.arc(g.mx, g.my, r * g.sc, 0, TAU); ctx.stroke(); if (p.lab !== false) G.text(ctx, r + ' km', g.mx + 3, g.my - r * g.sc + 9, { s: 10, w: 700, c: MZ.mute(ctx), a: 'left' }); }
    for (let a = 0; a < 360; a += 30) { const q = pos(g, RMAX, a), q2 = pos(g, RMAX + 9, a); ctx.beginPath(); ctx.moveTo(g.mx, g.my); ctx.lineTo(q[0], q[1]); ctx.stroke(); if (p.lab !== false && w > 600) G.text(ctx, a + '°', q2[0], q2[1], { s: 9, w: 700, c: MZ.mute(ctx) }); }
    // beam sector
    if (p.beam !== false) { const a = rad(S.sweep - 90); setRaw(ctx, 1); const gr = ctx.createRadialGradient(g.mx, g.my, 0, g.mx, g.my, g.R0); gr.addColorStop(0, 'rgba(22,163,74,.35)'); gr.addColorStop(1, 'rgba(22,163,74,.05)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(g.mx, g.my); ctx.arc(g.mx, g.my, g.R0, a - rad(6), a + rad(6)); ctx.closePath(); ctx.fill(); setRaw(ctx, 0); }
    // outgoing pulses (arc within the beam) + echoes (circles from the target)
    if (p.waves !== false) {
      S.pulses.forEach(q => { const a = rad(q.a - 90); ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(g.mx, g.my, Math.max(1, q.r * g.sc), a - rad(6), a + rad(6)); ctx.stroke(); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(g.mx, g.my, Math.max(1, q.r * g.sc - 6), a - rad(5), a + rad(5)); ctx.stroke(); });
      S.echoes.forEach(e => { const c = pos(g, e.d, e.ang); const r = e.r * g.sc; const toR = Math.atan2(g.my - c[1], g.mx - c[0]); ctx.strokeStyle = 'rgba(220,38,38,.25)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(c[0], c[1], Math.max(1, r), 0, TAU); ctx.stroke(); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(c[0], c[1], Math.max(1, r), toR - .22, toR + .22); ctx.stroke(); });
    }
    // targets
    tg(S).forEach(t => { const c = pos(g, t.d, t.ang); plane(ctx, c[0], c[1], t.ang + 60, t.k ? '#7c3aed' : '#0f172a'); if (p.lab !== false) G.text(ctx, (t.k ? 'هدف 2: ' : 'هدف 1: ') + Math.round(t.d) + ' km', c[0], c[1] + 24, { s: 11, w: 800, c: t.k ? '#7c3aed' : MZ.fg(ctx) }); });
    // radar dish at centre
    ctx.save(); ctx.translate(g.mx, g.my); ctx.rotate(rad(S.sweep)); setRaw(ctx, 1); ctx.fillStyle = '#475569'; ctx.fillRect(-4, -4, 8, 8); ctx.fillStyle = '#e2e8f0'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(0, -10, 16, 6, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#334155'; ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(0, -24); ctx.stroke(); setRaw(ctx, 0); ctx.restore();
    // buttons
    S._fb = MZ.pill(ctx, g.mx - 70, g.my + g.R0 + 26, '📡 إرسال نبضة', true, '#16a34a', { w: 120, h: 30 });
    S._ab = MZ.pill(ctx, g.mx + 70, g.my + g.R0 + 26, S.auto ? 'مسح دوّار: يعمل' : 'مسح دوّار: متوقف', S.auto, '#2563eb', { w: 128, h: 30 });
    if (p.lab !== false) G.text(ctx, 'النبضات مبطأة جداً للمشاهدة (سرعتها الحقيقية c = 3×10⁸ m/s)', g.mx, g.my - g.R0 - 16, { s: 11, w: 700, c: MZ.mute(ctx) });
    // ------------- right panel -------------
    if (!g.side) return; const px = g.px, pw = g.pw; let y = 58;
    if (p.scope !== false) {
      const sh = 170; MZ.box(ctx, px, y, pw, sh, bk ? 'rgba(240,253,244,.97)' : 'rgba(5,46,22,.85)', '#16a34a', 10);
      G.text(ctx, 'شاشة الزمن: النبضة المرسلة والصدى', px + pw / 2, y + 14, { s: 12, w: 900, c: bk ? '#166534' : '#bbf7d0' });
      const ax0 = px + 14, ax1 = px + pw - 14, ay = y + sh - 38, TM = 1100; const X = t => ax0 + t / TM * (ax1 - ax0);
      ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(ax0, ay); ctx.lineTo(ax1, ay); ctx.stroke();
      for (let t = 0; t <= 1000; t += 200) { ctx.beginPath(); ctx.moveTo(X(t), ay); ctx.lineTo(X(t), ay + 4); ctx.stroke(); G.text(ctx, t + '', X(t), ay + 13, { s: 9, w: 700, c: MZ.mute(ctx), mono: 1 }); }
      G.text(ctx, 'µs', ax1, ay + 25, { s: 10, w: 700, c: MZ.mute(ctx) });
      if (S.trace) { const tr = S.trace; const tnow = Math.min(TM, tr.t * VIS * 2 / 300 * 1e3 / 2 * 1); // elapsed vis → real µs: d_equiv = t*VIS/2 km → 2d/c
        const tus = tr.t * VIS / 2 * 1e3 * 2 / 3e8 * 1e6; ctx.strokeStyle = '#15803d'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ax0, ay); const spk = (x, hh) => { ctx.lineTo(x - 3, ay); ctx.lineTo(x, ay - hh); ctx.lineTo(x + 3, ay); };
        spk(X(0) + 3, 90); tr.spikes.forEach(s => { if (s.t * 1e6 <= tus) spk(X(s.t * 1e6), s.k ? 40 : 55); }); ctx.lineTo(X(Math.min(TM, tus)), ay); ctx.stroke(); void tnow;
        G.text(ctx, 'النبضة المرسلة', X(0) + 8, ay - 96, { a: 'left', s: 10, w: 800, c: '#15803d' });
        tr.spikes.forEach(s => { if (s.t * 1e6 <= tus) { const x = X(s.t * 1e6); ctx.setLineDash([3, 3]); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(0) + 3, ay - 66 - s.k * 14); ctx.lineTo(x, ay - 66 - s.k * 14); ctx.stroke(); ctx.setLineDash([]); G.text(ctx, 't = ' + fmt(s.t * 1e6, 3) + ' µs', (X(0) + x) / 2 + 12, ay - 74 - s.k * 14, { s: 10, w: 800, c: s.k ? '#7c3aed' : '#dc2626', mono: 1 }); } });
        if (tus < TM) { ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.arc(X(tus), ay, 3.5, 0, TAU); ctx.fill(); }
      } else G.text(ctx, 'انقر «إرسال نبضة»', px + pw / 2, ay - 40, { s: 12, w: 700, c: MZ.mute(ctx) });
      y += sh + 10;
    }
    if (S.last && p.lab !== false) {
      const bh = 70; MZ.box(ctx, px, y, pw, bh, bk ? 'rgba(254,242,242,.97)' : 'rgba(69,10,10,.8)', '#dc2626', 10);
      G.text(ctx, 'زمن الذهاب والإياب t = ' + fmt(S.last.t * 1e6, 4) + ' µs', px + pw / 2, y + 18, { s: 12, w: 800, c: bk ? '#991b1b' : '#fecaca' });
      G.text(ctx, 'd = c·t/2 = ' + fmt(S.last.d, 4) + ' km', px + pw / 2, y + 44, { s: 15, w: 900, c: bk ? '#991b1b' : '#fecaca', mono: 1 });
      y += bh + 10;
    }
    if (p.ppi !== false) {
      const R = Math.min(pw / 2 - 12, (h - 110 - y) / 2 - 12); if (R > 40) { const cx = px + pw / 2, cy = y + R + 10; setRaw(ctx, 1);
        ctx.fillStyle = '#052e16'; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(74,222,128,.35)'; ctx.lineWidth = 1; for (let r = 1; r <= 4; r++) { ctx.beginPath(); ctx.arc(cx, cy, R * r / 4, 0, TAU); ctx.stroke(); }
        const a = rad(S.sweep - 90); const gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, R); gr.addColorStop(0, 'rgba(74,222,128,.55)'); gr.addColorStop(1, 'rgba(74,222,128,0)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, a - .5, a); ctx.closePath(); ctx.fill();
        S.blips.forEach(b => { const ba = rad(b.a - 90); ctx.fillStyle = `rgba(250,250,120,${b.life / 4})`; ctx.beginPath(); ctx.arc(cx + Math.cos(ba) * b.d / RMAX * R, cy + Math.sin(ba) * b.d / RMAX * R, 5, 0, TAU); ctx.fill(); });
        setRaw(ctx, 0); G.text(ctx, 'شاشة الرادار', cx, cy + R + 12, { s: 11, w: 800, c: MZ.mute(ctx) }); }
    }
  };
  E.drags = S => {
    const g = lay(S); const L = [];
    L.push({ id: 'fire', x: g.mx - 70, y: g.my + g.R0 + 26, w: 120, h: 30, hint: false, tip: 'انقر لإرسال نبضة راديوية باتجاه الحزمة', idle: 'انقر لإرسال نبضة 📡', click: S => fire(S) });
    tg(S).forEach(t => { const c = pos(g, t.d, t.ang); L.push({ id: 'tg' + t.k, x: c[0], y: c[1], r: 20, axis: 'xy', tip: 'اسحب الطائرة إلى أي بعد واتجاه', idle: 'اسحب الطائرة ✋', drag: (S, d) => { const x = d.ox + d.x - d.sx - g.mx, y = d.oy + d.y - d.sy - g.my; const dd = clamp(Math.hypot(x, y) / g.sc, 5, 150), an = (deg(Math.atan2(y, x)) + 90 + 360) % 360; if (t.k) { S.t2.d = dd; S.t2.ang = an; } else { setParam(S, 'd', dd); setParam(S, 'ang', an); } } }); });
    const hp = pos(g, 36, S.sweep);
    L.push({ id: 'dish', x: hp[0], y: hp[1], r: 18, cx: g.mx, cy: g.my, hint: false, tip: 'دوّر الهوائي لتوجيه الحزمة (انقر مرتين لإرسال نبضة)', drag: (S, d) => { S.auto = false; S.sweep = (deg(d.ang) + 90 + 360) % 360; }, click: S => fire(S) });
    L.push({ id: 'auto', x: g.mx + 70, y: g.my + g.R0 + 26, w: 128, h: 30, hint: false, tip: 'تشغيل / إيقاف المسح الدوّار التلقائي', click: S => { S.auto = !S.auto; } });
    return L;
  };
  E.readings = S => { const t = 2 * S.p.d * 1e3 / 3e8; const r = [rd('زمن الذهاب والإياب للهدف 1', fmtSI(t, 's')), rd('البعد d = ct/2', fmt(S.p.d, 4) + ' km'), rd('اتجاه الهدف 1', Math.round(S.p.ang) + '°'), rd('سرعة النبضة', '3×10⁸ m/s')]; if (S.last) r.push(rd('آخر صدى: t → d', fmt(S.last.t * 1e6, 4) + ' µs → ' + fmt(S.last.d, 4) + ' km', 1)); return r; };
  E.explain = S => S.last ? `وصل الصدى بعد <b>${fmt(S.last.t * 1e6, 4)} µs</b>. النبضة قطعت المسافة ذهاباً وإياباً، لذا البعد = c × t ÷ 2 = <b>${fmt(S.last.d, 4)} km</b>.` : 'وجّه الهوائي نحو الطائرة (اسحبه) ثم انقر «إرسال نبضة»، وراقب النبضة الخضراء تذهب والصدى الأحمر يعود.';
  E.howto = 'اسحب <b>الطائرتين</b> إلى أي مكان، ودوّر <b>الهوائي</b> (اسحب المقبض الدائري حول مركز الرادار) لتوجيه الحزمة، ثم انقر <b>«إرسال نبضة»</b>. النبضة الخضراء تنتشر داخل الحزمة، وعندما تصطدم بطائرة ينتشر صدى أحمر يعود إلى الهوائي. شاشة الزمن تبين زمن رجوع الصدى t، والبعد d = ct/2. زر «مسح دوّار» يجعل الهوائي يدور ويرسل نبضات باستمرار.';
})();

/* =====================================================================
   5) blackbody — furnace with heater slider, draggable λmax (Wien) and
      reading cursor, area = σT⁴, classical vs Planck, emitted photons
   ===================================================================== */
(() => {
  const E = MZ.E('blackbody'); if (!E) return;
  E.controls = E.controls.concat([
    TG('area', 'المساحة تحت المنحني (الشدة الكلية σT⁴)', true, null, 'energy'),
    TG('vis', 'حزمة الطيف المرئي', true, null, 'light'),
    TG('wien', 'مؤشر قمة المنحني λm (قانون فين)', true, null, 'vector'),
    TG('cursor', 'مؤشر القراءة على المنحني', true, null, 'meter'),
    TG('ph', 'الفوتونات المنبعثة من الفتحة', true, null, 'photon'),
    TG('lab', 'التسميات والقيم', true, null, 'labels')
  ]);
  const b = 2.898e-3, LM = 3000e-9;
  E.setup = S => { S.cur = 1200; S.phs = []; S.acc = 0; };
  const lay = S => { const w = S.W || 820, h = S.H || 780; const side = w > 640; return { w, h, x0: 84, x1: side ? w * .66 : w - 30, y1: 56, y0: h - 120, side, fx: w * .69, fw: w * .31 - 16 }; };
  const sampleLam = T => { for (let k = 0; k < 20; k++) { const l = (100 + Math.random() * 2900) * 1e-9; if (Math.random() < planckI(l, T) / planckI(b / T, T)) return l * 1e9; } return b / T * 1e9; };
  E.update = (S, dt) => { const T = S.p.T; const g = lay(S); const rate = 6 + 34 * Math.pow(T / 8000, 4) * 1.5; S.acc += rate * dt; while (S.acc > 1 && S.phs.length < 60) { S.acc--; const a = Math.PI + (Math.random() - .5) * .9; S.phs.push({ x: 0, y: 0, a, l: sampleLam(T) }); } S.phs.forEach(p => { p.x += Math.cos(p.a) * 110 * dt; p.y += Math.sin(p.a) * 110 * dt; }); S.phs = S.phs.filter(p => Math.hypot(p.x, p.y) < Math.min(130, g.fw * .6)); };
  const Imax = S => { const T = S.p.cmp ? Math.max(S.p.T, 6000) : S.p.T; return planckI(b / T, T) * 1.1; };
  const X = (g, l) => g.x0 + l / LM * (g.x1 - g.x0), Y = (g, I, S) => g.y0 - I / Imax(S) * (g.y0 - g.y1);
  E.draw = (ctx, w, h, S) => {
    G.bg(ctx, w, h, false); const p = S.p, T = p.T, g = lay(S); const Im = Imax(S);
    if (p.vis !== false) { ctx.globalAlpha = .28; for (let nm = 380; nm <= 750; nm += 2) { ctx.fillStyle = wlColor(nm); ctx.fillRect(X(g, nm * 1e-9), g.y1, 2.4, g.y0 - g.y1); } ctx.globalAlpha = 1; G.text(ctx, 'مرئي', X(g, 565e-9), g.y1 + 10, { s: 10, w: 800, c: '#e2e8f0' }); G.text(ctx, 'فوق البنفسجي', X(g, 190e-9), g.y1 + 10, { s: 10, w: 700, c: '#c4b5fd' }); G.text(ctx, 'تحت الأحمر', X(g, 1300e-9), g.y1 + 10, { s: 10, w: 700, c: '#fca5a5' }); }
    ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(g.x0, g.y1); ctx.lineTo(g.x0, g.y0); ctx.lineTo(g.x1, g.y0); ctx.stroke();
    for (let l = 500; l <= 3000; l += 500) { const x = X(g, l * 1e-9); ctx.beginPath(); ctx.moveTo(x, g.y0); ctx.lineTo(x, g.y0 + 4); ctx.stroke(); G.text(ctx, l + '', x, g.y0 + 14, { s: 10, mono: 1, c: '#94a3b8' }); }
    G.text(ctx, 'الطول الموجي λ (nm)', (g.x0 + g.x1) / 2, g.y0 + 32, { s: 12, w: 800, c: '#cbd5e1' });
    ctx.save(); ctx.translate(g.x0 - 18, (g.y0 + g.y1) / 2); ctx.rotate(-Math.PI / 2); G.text(ctx, 'شدة الإشعاع', 0, 0, { s: 12, w: 800, c: '#cbd5e1' }); ctx.restore();
    const path = TT => { const pts = []; for (let x = g.x0 + 1; x <= g.x1; x += 2) { const l = (x - g.x0) / (g.x1 - g.x0) * LM; pts.push([x, Math.max(g.y1 - 4, Y(g, planckI(l, TT), S))]); } return pts; };
    const stroke = (pts, col, lw) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); };
    const main = path(T);
    if (p.area !== false) { ctx.fillStyle = 'rgba(244,114,182,.18)'; ctx.beginPath(); ctx.moveTo(g.x0, g.y0); main.forEach(q => ctx.lineTo(q[0], q[1])); ctx.lineTo(g.x1, g.y0); ctx.closePath(); ctx.fill(); if (p.lab !== false) G.text(ctx, 'المساحة ∝ σT⁴ = ' + fmtSI(PHY.sigma * T ** 4, 'W/m²'), X(g, 2300e-9), g.y0 - 70, { s: 11, w: 800, c: '#f9a8d4' }); }
    if (p.cmp) [[4000, '#f97316'], [6000, '#facc15']].forEach(([TT, c]) => { const q = path(TT); stroke(q, c, 1.4); const xm = X(g, b / TT), ym = Y(g, planckI(b / TT, TT), S); G.text(ctx, TT + 'K', xm + 24, ym - 8, { s: 11, w: 800, c }); });
    if (p.rj) { ctx.strokeStyle = '#60a5fa'; ctx.setLineDash([6, 4]); ctx.lineWidth = 1.8; ctx.beginPath(); let st = false; for (let x = g.x0 + 4; x <= g.x1; x += 2) { const l = (x - g.x0) / (g.x1 - g.x0) * LM; const y = Y(g, 2 * PHY.c * PHY.kB * T / Math.pow(l, 4), S); if (y < g.y1) { st = false; continue; } st ? ctx.lineTo(x, y) : ctx.moveTo(x, y); st = true; } ctx.stroke(); ctx.setLineDash([]); G.text(ctx, 'رايلي-جينز (كلاسيكي) ← يتزايد بلا حد: كارثة فوق البنفسجي', g.x1 - 4, g.y1 + 40, { s: 11, w: 800, c: '#93c5fd', a: 'right' }); }
    stroke(main, '#f472b6', 2.8);
    // Wien marker
    const lm = b / T, xm = X(g, lm), ym = Y(g, planckI(lm, T), S);
    if (p.wien !== false) { ctx.strokeStyle = '#f472b6'; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(xm, ym); ctx.lineTo(xm, g.y0); ctx.stroke(); ctx.setLineDash([]); setRaw(ctx, 1); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#db2777'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(xm, ym, 8, 0, TAU); ctx.fill(); ctx.stroke(); setRaw(ctx, 0);
      G.text(ctx, 'λm = ' + fmt(lm * 1e9, 4) + ' nm', xm, g.y0 + 50, { s: 12, w: 900, c: '#fff', bg: 'rgba(219,39,119,.9)', mono: 1 }); G.text(ctx, 'λm·T = 2.898×10⁻³ m·K', xm, ym - 20, { s: 11, w: 800, c: '#f9a8d4' }); }
    // reading cursor
    if (p.cursor !== false) { const x = X(g, S.cur * 1e-9), I = planckI(S.cur * 1e-9, T), y = Y(g, I, S); ctx.strokeStyle = '#22d3ee'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, g.y1); ctx.lineTo(x, g.y0); ctx.stroke();
      setRaw(ctx, 1); ctx.fillStyle = '#22d3ee'; ctx.beginPath(); ctx.moveTo(x - 8, g.y0 + 2); ctx.lineTo(x + 8, g.y0 + 2); ctx.lineTo(x, g.y0 - 10); ctx.closePath(); ctx.fill(); if (y > g.y1) { ctx.beginPath(); ctx.arc(x, y, 5, 0, TAU); ctx.fill(); } setRaw(ctx, 0);
      const tx = clamp(x, g.x0 + 90, g.x1 - 90); G.text(ctx, 'λ = ' + Math.round(S.cur) + ' nm   I = ' + fmtSI(I, 'W/m³'), tx, Math.max(g.y1 + 52, Math.min(g.y0 - 60, y - 22)), { s: 11, w: 800, c: '#0f172a', bg: 'rgba(103,232,249,.95)', mono: 1, raw: 1 }); }
    // ------- furnace -------
    if (!g.side) return; const fx = g.fx, fw = g.fw, fy = 64, fh = Math.min(300, h * .42); const c = tempColor(T); const glowA = clamp(Math.pow((T - 800) / 4000, 1.2), 0, 1);
    MZ.box(ctx, fx, fy, fw, fh, '#1e293b', '#475569', 12); setRaw(ctx, 1);
    const hx = fx + 26, hy = fy + fh * .45; // hole on the left face
    ctx.fillStyle = '#7c2d12'; rr(ctx, fx + 22, fy + 40, fw - 70, fh - 80, 10); ctx.fill();
    const cav = ctx.createRadialGradient(fx + fw * .45, hy, 4, fx + fw * .45, hy, fw * .4); cav.addColorStop(0, `rgba(${c},${.35 + .65 * glowA})`); cav.addColorStop(1, `rgba(${c},${.1 + .4 * glowA})`); ctx.fillStyle = cav; rr(ctx, fx + 32, fy + 50, fw - 90, fh - 100, 30); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.fillRect(fx + 14, hy - 12, 20, 24); G.glow(ctx, hx, hy, 34, `rgba(${c},A)`, glowA); ctx.fillStyle = `rgb(${c})`; ctx.globalAlpha = .3 + .7 * glowA; ctx.fillRect(fx + 20, hy - 9, 14, 18); ctx.globalAlpha = 1;
    setRaw(ctx, 0);
    G.text(ctx, 'فرن (جسم أسود: تجويف بفتحة صغيرة)', fx + fw / 2, fy + 18, { s: 11, w: 800, c: '#e2e8f0' });
    // heater slider (vertical, right edge)
    const sx = fx + fw - 26, s0 = fy + fh - 30, s1 = fy + 44; MZ.slider(ctx, sx, s0, sx, s1, (T - 1000) / 7000, '#ef4444'); S._hs = [sx, s0, s1];
    G.text(ctx, 'T = ' + T + ' K', fx + fw / 2 - 12, fy + fh - 16, { s: 14, w: 900, c: '#fecaca', mono: 1 });
    // photons flying out of the hole (towards the left)
    if (p.ph !== false) S.phs.forEach(q => { const col = q.l < 380 ? '#a78bfa' : q.l > 750 ? 'rgba(220,38,38,.55)' : wlColor(q.l); MZ.squiggle(ctx, hx - 6 + q.x, hy + q.y, q.a, 16, col, 3, 2.5, 1.6); });
    // colour swatch
    const cy2 = fy + fh + 50; G.glow(ctx, fx + fw / 2, cy2, 40, `rgba(${c},A)`, .9); ctx.fillStyle = `rgb(${c})`; setRaw(ctx, 1); ctx.beginPath(); ctx.arc(fx + fw / 2, cy2, 18, 0, TAU); ctx.fill(); setRaw(ctx, 0);
    G.text(ctx, 'اللون الظاهري للجسم', fx + fw / 2, cy2 + 34, { s: 11, w: 800, c: '#cbd5e1' });
    if (p.lab !== false) { G.text(ctx, 'البنفسجي: فوق بنفسجي — الأحمر الباهت: تحت أحمر', fx + fw / 2, cy2 + 56, { s: 10, w: 700, c: '#94a3b8' }); G.text(ctx, 'E = hf لكل فوتون (فرضية بلانك)', fx + fw / 2, cy2 + 74, { s: 11, w: 800, c: '#fde68a' }); }
  };
  E.drags = S => {
    const g = lay(S); const T = S.p.T; const lm = b / T; const L = [];
    if (g.side && S._hs) { const [sx, s0, s1] = S._hs; L.push({ id: 'heat', x: sx, y: lerp(s0, s1, (T - 1000) / 7000), r: 16, axis: 'y', tip: 'منظم التسخين: اسحب للأعلى لرفع درجة الحرارة', idle: 'اسحب لتسخين الفرن ✋', drag: (S, d) => setParam(S, 'T', 1000 + clamp((s0 - (d.oy + d.y - d.sy)) / (s0 - s1), 0, 1) * 7000), wheel: (S, s) => setParam(S, 'T', S.p.T + s * 100) }); }
    if (S.p.wien !== false) L.push({ id: 'peak', x: X(g, lm), y: Y(g, planckI(lm, T), S), r: 14, axis: 'x', tip: 'اسحب قمة المنحني يساراً/يميناً: T = 2.898×10⁻³ / λm', drag: (S, d) => { const l = (d.ox + d.x - d.sx - g.x0) / (g.x1 - g.x0) * LM; setParam(S, 'T', b / clamp(l, b / 8000, b / 1000)); } });
    if (S.p.cursor !== false) L.push({ id: 'cur', x: X(g, S.cur * 1e-9), y: g.y0 - 4, w: 22, h: 28, axis: 'x', tip: 'اسحب مؤشر القراءة لقراءة الشدة عند أي طول موجي', drag: (S, d) => { S.cur = clamp((d.ox + d.x - d.sx - g.x0) / (g.x1 - g.x0) * 3000, 50, 3000); } });
    return L;
  };
  E.readings = S => { const T = S.p.T; const lm = b / T; return [rd('λm = 2.898×10⁻³/T', fmtSI(lm, 'm')), rd('I = σT⁴', fmtSI(PHY.sigma * T ** 4, 'W/m²')), rd('طاقة فوتون عند λm', fmt(PHY.h * PHY.c / lm / PHY.e, 3, 'eV')), rd('منطقة λm', lm < 380e-9 ? 'فوق البنفسجي' : lm < 750e-9 ? 'مرئي' : 'تحت الأحمر'), rd('عند المؤشر λ = ' + Math.round(S.cur) + ' nm', fmtSI(planckI(S.cur * 1e-9, T), 'W/m³'))]; };
  E.explain = S => { const T = S.p.T; return `عند <b>${T} K</b> تقع قمة الإشعاع عند λm = <b>${fmt(b / T * 1e9, 4)} nm</b>. كلما ارتفعت درجة الحرارة <b>انزاحت القمة نحو الأطوال الأقصر</b> (فين) و<b>ازدادت المساحة</b> تحت المنحني بنسبة T⁴ (ستيفان-بولتزمان). ${S.p.rj ? 'المنحني الكلاسيكي (المتقطع) يتزايد بلا حد عند الأطوال القصيرة — فشلت الفيزياء الكلاسيكية، ونجح بلانك بفرض أن الطاقة مكمّاة E = hf.' : ''}`; };
  E.howto = 'اسحب <b>منظم التسخين</b> الأحمر على جانب الفرن لتغيير T، أو اسحب <b>نقطة القمة</b> الوردية على المنحني يساراً ويميناً (قانون فين يحدد T). اسحب <b>المؤشر</b> السماوي على محور الطول الموجي لقراءة شدة الإشعاع. فعّل «رايلي-جينز» لمقارنة التنبؤ الكلاسيكي.';
})();

/* =====================================================================
   6) photoelectric — lamp (colour & intensity), photons → electrons,
      retarding/accelerating field, rheostat, metals, KEmax = hf − W
   ===================================================================== */
(() => {
  const E = MZ.E('photoelectric'); if (!E) return;
  E.controls = E.controls.concat([
    TG('phot', 'الفوتونات الساقطة', true, null, 'photon'),
    TG('elec', 'الإلكترونات الضوئية ومتجهات سرعتها', true, null, 'velocity'),
    TG('field', 'المجال الكهربائي بين اللوحين', true, null, 'efield'),
    TG('energy', 'مخطط الطاقة: KEmax = hf − W', true, null, 'energy'),
    TG('iv', 'منحني التيار–الجهد', true, null, 'graph'),
    TG('lab', 'التسميات والقيم', true, null, 'labels')
  ]);
  E.setup = S => { S.els = []; S.phs = []; S.acc = 0; S.fl = []; S.coll = 0; };
  const lay = S => { const w = S.W || 820, h = S.H || 780; const side = w >= 700; const th = 150; let tw, tcx, tcy, sx0 = 84, sx1, ly;
    if (side) { tw = Math.min(360, w * .42); tcx = Math.max(w * .6, 76 + 230 + tw / 2); tcy = h * .3; sx1 = Math.min(sx0 + 200, tcx - tw / 2 - 34); ly = tcy - 120; }
    else { tw = Math.min(360, w - 196); tcx = 86 + tw / 2; tcy = Math.max(h * .4, 330); sx1 = Math.min(sx0 + 200, w - 40); ly = tcy - 250; }
    const kx = tcx - tw / 2 + 52, ax = tcx + tw / 2 - 44; return { w, h, tcx, tcy, tw, th, kx, ax, D: ax - kx - 12, lx: side ? (sx0 + sx1) / 2 : sx1 - 20, ly, by: Math.max(h * .55, tcy + th / 2 + 110), sx0, sx1, side }; };
  const phCol = l => l < 380 ? '#8b5cf6' : wlColor(l);
  E.update = (S, dt) => {
    const g = lay(S), r = peCalc(S), p = S.p; const k = g.D / (.9 * Math.sqrt(3)), a = p.V * k * k / (2 * g.D);
    S.acc += (p.I / 100) * 16 * dt; while (S.acc > 1) { S.acc--; S.phs.push({ t: 0, off: (Math.random() - .5) * 90 }); }
    S.phs.forEach(q => { q.t += dt * 1.6; if (q.t >= 1 && !q.done) { q.done = true; if (r.KE > 0) { const ke = r.KE * Math.sqrt(Math.random()); S.els.push({ x: 0, y: q.off, v: k * Math.sqrt(ke), ke }); } else S.fl.push({ y: q.off, life: .5 }); } });
    S.phs = S.phs.filter(q => !q.done);
    S.els.forEach(e => { e.v += a * dt; e.x += e.v * dt; }); S.els = S.els.filter(e => { if (e.x >= g.D) { S.coll++; return false; } return e.x >= 0; });
    S.fl.forEach(f => f.life -= dt); S.fl = S.fl.filter(f => f.life > 0);
  };
  const ivPts = S => { const v0 = S.p.V, pts = []; for (let v = -6; v <= 6.01; v += .1) { S.p.V = v; pts.push([v, peCalc(S).I * 1e6]); } S.p.V = v0; return pts; };
  E.draw = (ctx, w, h, S) => {
    G.bg(ctx, w, h); const p = S.p, g = lay(S), r = peCalc(S); const bk = MZ.book(ctx); const pc = phCol(p.lam);
    // glass tube
    setRaw(ctx, 1); ctx.fillStyle = bk ? 'rgba(224,242,254,.55)' : 'rgba(200,230,255,.08)'; rr(ctx, g.tcx - g.tw / 2, g.tcy - g.th / 2, g.tw, g.th, 70); ctx.fill(); setRaw(ctx, 0); ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 2.5; ctx.stroke();
    if (p.lab !== false) G.text(ctx, 'أنبوبة مفرغة من الهواء', g.tcx, g.tcy - g.th / 2 + 14, { s: 11, w: 700, c: MZ.mute(ctx) });
    // E field between plates (points from + plate to − plate)
    if (p.field !== false && Math.abs(p.V) > .05) { const sgn = p.V > 0 ? -1 : 1; const al = clamp(Math.abs(p.V) / 6, .25, .9); for (let k = 0; k < 4; k++) { const y = g.tcy - 45 + k * 30; const x0 = g.kx + 16, x1 = g.ax - 10; G.arrow(ctx, sgn < 0 ? x1 : x0, y, sgn < 0 ? x0 : x1, y, `rgba(234,88,12,${al})`, 1.5, 8); } if (p.lab !== false) G.text(ctx, 'E', g.tcx, g.tcy - 58, { s: 13, w: 900, c: '#ea580c' }); }
    // cathode (curved) and anode
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(g.kx - 40, g.tcy, 58, -.85, .85); ctx.stroke(); const mc = METALS.find(m => m[0] === p.metal);
    ctx.fillStyle = '#b45309'; ctx.fillRect(g.ax - 4, g.tcy - 52, 8, 104);
    G.text(ctx, 'الباعث C (' + mc[0] + ')' + (p.V > 0 ? ' −' : p.V < 0 ? ' +' : ''), g.kx - 6, g.tcy + g.th / 2 - 12, { s: 11, w: 800, c: MZ.fg(ctx) }); G.text(ctx, 'الجامع A' + (p.V > 0 ? ' +' : p.V < 0 ? ' −' : ''), g.ax, g.tcy + g.th / 2 - 12, { s: 11, w: 800, c: MZ.fg(ctx) });
    // lamp
    const on = p.I > 0; if (on) { setRaw(ctx, 1); G.glow(ctx, g.lx, g.ly, 50, p.lam < 380 ? 'rgba(167,139,250,A)' : wlColor(p.lam).replace(/rgba?\(([^,]+),([^,]+),([^,)]+).*$/, 'rgba($1,$2,$3,A)'), .3 + .6 * p.I / 100); setRaw(ctx, 0); }
    ctx.fillStyle = '#334155'; rr(ctx, g.lx - 26, g.ly - 20, 52, 40, 8); ctx.fill(); setRaw(ctx, 1); ctx.fillStyle = on ? pc : '#475569'; ctx.beginPath(); ctx.arc(g.lx + 22, g.ly + 10, 12, 0, TAU); ctx.fill(); setRaw(ctx, 0);
    if (p.lab !== false) G.text(ctx, 'مصدر ضوئي' + (on ? '' : ' (مطفأ)'), g.lx, g.ly - 32, { s: 11, w: 800, c: MZ.fg(ctx) });
    // beam cone
    const tgx = g.kx - 4, tgy = g.tcy; if (on) { setRaw(ctx, 1); ctx.fillStyle = p.lam < 380 ? `rgba(139,92,246,${.05 + .12 * p.I / 100})` : wlColor(p.lam, .05 + .12 * p.I / 100); ctx.beginPath(); ctx.moveTo(g.lx + 22, g.ly + 10); ctx.lineTo(tgx, tgy - 50); ctx.lineTo(tgx, tgy + 50); ctx.closePath(); ctx.fill(); setRaw(ctx, 0); }
    if (p.phot !== false) S.phs.forEach(q => { const x = lerp(g.lx + 22, tgx, q.t), y = lerp(g.ly + 10, tgy + q.off, q.t); MZ.squiggle(ctx, x, y, Math.atan2(tgy + q.off - g.ly - 10, tgx - g.lx - 22), 18, pc, 3.5, 2.5, 2); });
    S.fl.forEach(f => G.text(ctx, '×', tgx - 6, tgy + f.y, { s: 14, w: 900, c: `rgba(220,38,38,${f.life * 2})` }));
    // electrons
    if (p.elec !== false) S.els.forEach(e => { const x = g.kx + 10 + e.x, y = g.tcy + e.y; setRaw(ctx, 1); ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.arc(x, y, 4.5, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(x - 2.5, y - .8, 5, 1.6); setRaw(ctx, 0); if (Math.abs(e.v) > 8) G.arrow(ctx, x, y, x + e.v * .12, y, '#16a34a', 1.8, 6); });
    // spectrum (wavelength) slider under the lamp
    const sy = g.ly + 60, sx0 = g.sx0, sx1 = g.sx1; const L2X = l => lerp(sx0, sx1, (l - 150) / 550);
    for (let x = sx0; x <= sx1; x += 2) { const l = 150 + (x - sx0) / (sx1 - sx0) * 550; setRaw(ctx, 1); ctx.fillStyle = l < 380 ? `rgba(139,92,246,${.25 + .5 * (l - 150) / 230})` : wlColor(l); ctx.fillRect(x, sy - 6, 2.2, 12); setRaw(ctx, 0); }
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.strokeRect(sx0, sy - 6, sx1 - sx0, 12);
    const x0l = L2X(clamp(r.l0, 150, 700)); if (r.l0 <= 700) { ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2; ctx.setLineDash([3, 2]); ctx.beginPath(); ctx.moveTo(x0l, sy - 12); ctx.lineTo(x0l, sy + 12); ctx.stroke(); ctx.setLineDash([]); if (p.lab !== false) G.text(ctx, 'λ₀', x0l, sy + 20, { s: 11, w: 900, c: '#dc2626' }); }
    setRaw(ctx, 1); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(L2X(p.lam), sy, 9, 0, TAU); ctx.fill(); ctx.stroke(); setRaw(ctx, 0);
    G.text(ctx, 'λ = ' + p.lam + ' nm', (sx0 + sx1) / 2, sy - 18, { s: 12, w: 900, c: MZ.fg(ctx), mono: 1 }); if (p.lam < 380) G.text(ctx, 'فوق بنفسجي', sx1, sy - 18, { s: 10, w: 800, c: '#7c3aed', a: 'right' });
    const iy = sy + 42; MZ.slider(ctx, sx0, iy, sx1, iy, p.I / 100, '#f59e0b'); G.text(ctx, 'الشدة ' + p.I + ' %', (sx0 + sx1) / 2, iy + 18, { s: 11, w: 800, c: MZ.fg(ctx) });
    S._sl = { sy, iy, sx0, sx1 };
    // metal chips
    const cy = g.tcy + g.th / 2 + 28, cw = 44; S._mc = [];
    METALS.forEach((m, i) => { const x = g.tcx + (i - 3) * (cw + 6); const sel = m[0] === p.metal; MZ.box(ctx, x - cw / 2, cy - 15, cw, 30, sel ? '#b45309' : (bk ? '#f1f5f9' : '#1e293b'), sel ? '#78350f' : '#94a3b8', 7); G.text(ctx, m[0] + ' ' + m[2], x, cy, { s: 10, w: 900, c: sel ? '#fff' : MZ.fg(ctx), raw: sel ? 1 : 0, mono: 1 }); S._mc.push([x, cy, m[0]]); });
    if (p.lab !== false) G.text(ctx, 'اختر معدن الباعث (دالة الشغل W بوحدة eV) — انقر', g.tcx, cy + 26, { s: 11, w: 700, c: MZ.mute(ctx) });
    // circuit
    const by = g.by, rx = g.tcx, RL = Math.min(170, g.tw * .45);
    G.wire(ctx, [[g.kx - 10, g.tcy + 50], [g.kx - 10, g.tcy + g.th / 2 + 4]], '#334155'); G.wire(ctx, [[g.ax, g.tcy + 52], [g.ax, g.tcy + g.th / 2 + 4]], '#334155');
    G.wire(ctx, [[g.tcx - g.tw / 2 - 12, g.tcy], [g.tcx - g.tw / 2 - 30, g.tcy], [g.tcx - g.tw / 2 - 30, by], [rx - RL / 2, by]], '#334155'); G.wire(ctx, [[g.kx - 40, g.tcy], [g.tcx - g.tw / 2 - 12, g.tcy]], '#334155');
    const mX = Math.min(g.tcx + g.tw / 2 + 58, w - 44); G.wire(ctx, [[g.ax, g.tcy], [g.tcx + g.tw / 2 + 12, g.tcy]], '#334155'); G.wire(ctx, [[g.tcx + g.tw / 2 + 12, g.tcy], [mX, g.tcy], [mX, by], [rx + RL / 2, by]], '#334155');
    // potentiometer with centre tap: slider sets V = −6..+6
    const f = (p.V + 6) / 12; const sp = MZ.rheo(ctx, rx, by, RL, f, '#475569'); S._rh = { rx, by, RL };
    G.text(ctx, 'مصدر فولطية مستمرة قابل للعكس (مقسم جهد)', rx, by + 26, { s: 11, w: 700, c: MZ.mute(ctx) });
    G.text(ctx, (p.V >= 0 ? '+' : '') + p.V.toFixed(2) + ' V', sp[0], sp[1] - 14, { s: 13, w: 900, c: p.V >= 0 ? '#15803d' : '#b91c1c', mono: 1 });
    G.text(ctx, '−6 V', rx - RL / 2, by + 44, { s: 10, w: 700, c: '#b91c1c', mono: 1 }); G.text(ctx, '0', rx, by + 44, { s: 10, w: 700, c: MZ.mute(ctx), mono: 1 }); G.text(ctx, '+6 V', rx + RL / 2, by + 44, { s: 10, w: 700, c: '#15803d', mono: 1 });
    G.meter(ctx, mX, (g.tcy + by) / 2 + 20, 30, r.I * 1e6, 60, 'µA', fmt(r.I * 1e6, 3) + ' µA');
    if (r.I > 1e-9) G.dotsAlong(ctx, [[g.ax, g.tcy], [mX, g.tcy], [mX, by], [rx + RL / 2, by]], S.t * 60 * r.I / 50e-6, '#2563eb', 20);
    // energy diagram
    const gy0 = h - 104; if (p.energy !== false) { const ex = 76, ew = Math.min(230, w * .28), eh = Math.min(200, h - 104 - (by + 60)); if (eh > 110) { const ey = gy0 - eh; MZ.box(ctx, ex, ey, ew, eh, bk ? 'rgba(255,255,255,.95)' : 'rgba(15,23,42,.85)', '#94a3b8', 8);
      const sc = (eh - 50) / (Math.max(r.E, r.W) + 1), base = ey + eh - 14; const Y = e => base - e * sc; const c0 = ex + 50;
      ctx.strokeStyle = MZ.fg(ctx); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(ex + 20, base); ctx.lineTo(ex + ew - 10, base); ctx.stroke();
      G.arrow(ctx, c0, base, c0, Y(r.E), pc, 4, 10); G.text(ctx, 'hf = ' + fmt(r.E, 3) + ' eV', c0 + 8, Y(r.E) - 8, { s: 11, w: 900, c: MZ.fg(ctx), a: 'left' });
      ctx.fillStyle = 'rgba(100,116,139,.35)'; ctx.fillRect(c0 + 34, Y(r.W), 34, base - Y(r.W)); G.text(ctx, 'W = ' + r.W, c0 + 51, Y(r.W) + 12, { s: 10, w: 900, c: MZ.fg(ctx) });
      ctx.strokeStyle = '#64748b'; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(ex + 20, Y(r.W)); ctx.lineTo(ex + ew - 10, Y(r.W)); ctx.stroke(); ctx.setLineDash([]);
      if (r.KE > 0) { const kx2 = c0 + 110; G.arrow(ctx, kx2, Y(r.W), kx2, Y(r.E), '#16a34a', 3.5, 9); G.text(ctx, 'KEmax = ' + fmt(r.KE, 3), kx2 + 6, (Y(r.W) + Y(r.E)) / 2, { s: 11, w: 900, c: '#16a34a', a: 'left' }); }
      else G.text(ctx, 'hf < W : لا انبعاث', c0 + 120, Y(r.W) - 14, { s: 11, w: 900, c: '#dc2626' });
      G.text(ctx, 'KEmax = hf − W = eVs', ex + ew / 2, ey + 12, { s: 11, w: 900, c: MZ.fg(ctx) }); } }
    // I–V graph
    if (p.iv !== false && w > 600) { const gw = Math.min(250, w * .3), gx = w - gw - 18, gh = Math.min(200, h - 104 - (by + 60)); if (gh > 110) { const gy = gy0 - gh; MZ.box(ctx, gx, gy, gw, gh, bk ? 'rgba(255,255,255,.95)' : 'rgba(15,23,42,.85)', '#94a3b8', 8);
      const X = v => gx + 14 + (v + 6) / 12 * (gw - 28), Y = i => gy + gh - 22 - i / 60 * (gh - 44); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx + 10, Y(0)); ctx.lineTo(gx + gw - 10, Y(0)); ctx.moveTo(X(0), gy + 16); ctx.lineTo(X(0), Y(0)); ctx.stroke();
      ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 2.2; ctx.beginPath(); ivPts(S).forEach((q, i) => i ? ctx.lineTo(X(q[0]), Y(q[1])) : ctx.moveTo(X(q[0]), Y(q[1]))); ctx.stroke();
      setRaw(ctx, 1); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(X(p.V), Y(r.I * 1e6), 5, 0, TAU); ctx.fill(); setRaw(ctx, 0);
      if (r.KE > 0 && r.KE < 6) { G.text(ctx, '−Vs', X(-r.KE), Y(0) + 11, { s: 10, w: 900, c: '#dc2626' }); }
      G.text(ctx, 'I (µA)', X(0) + 4, gy + 12, { s: 10, w: 800, c: MZ.mute(ctx), a: 'left' }); G.text(ctx, 'V', gx + gw - 14, Y(0) - 9, { s: 10, w: 800, c: MZ.mute(ctx) }); } }
    if (r.KE <= 0) G.text(ctx, 'f < f₀ : لا تنبعث إلكترونات مهما كانت الشدة', g.tcx, 22, { s: 13, w: 800, c: '#fff', bg: 'rgba(220,38,38,.9)', raw: 1 });
    else if (p.V <= -r.KE) G.text(ctx, 'الجهد العكسي ≥ جهد القطع: الإلكترونات ترتد ولا تصل الجامع (I = 0)', g.tcx, 22, { s: 12, w: 800, c: '#fff', bg: 'rgba(234,88,12,.92)', raw: 1 });
  };
  E.drags = S => {
    const g = lay(S); const L = []; const sl = S._sl; if (!sl) return L;
    const L2X = l => lerp(sl.sx0, sl.sx1, (l - 150) / 550), X2L = x => 150 + (x - sl.sx0) / (sl.sx1 - sl.sx0) * 550;
    L.push({ id: 'lam', x: L2X(S.p.lam), y: sl.sy, r: 14, axis: 'x', tip: 'اسحب لتغيير لون (الطول الموجي) ضوء المصباح', idle: 'اسحب لتغيير لون الضوء ✋', drag: (S, d) => setParam(S, 'lam', X2L(d.ox + d.x - d.sx)) });
    L.push({ id: 'rheo', x: lerp(S._rh.rx - S._rh.RL / 2, S._rh.rx + S._rh.RL / 2, (S.p.V + 6) / 12), y: S._rh.by - 20, r: 16, axis: 'x', tip: 'اسحب المنزلق: يميناً جهد موجب على الجامع، يساراً جهد عكسي (سالب)', drag: (S, d) => setParam(S, 'V', ((d.ox + d.x - d.sx) - (S._rh.rx - S._rh.RL / 2)) / S._rh.RL * 12 - 6), wheel: (S, s) => setParam(S, 'V', S.p.V + s * .1) });
    L.push({ id: 'int', x: lerp(sl.sx0, sl.sx1, S.p.I / 100), y: sl.iy, r: 14, axis: 'x', tip: 'اسحب لتغيير شدة الضوء', drag: (S, d) => setParam(S, 'I', ((d.ox + d.x - d.sx) - sl.sx0) / (sl.sx1 - sl.sx0) * 100) });
    L.push({ id: 'lamp', x: g.lx, y: g.ly, w: 70, h: 44, hint: false, tip: 'انقر لإطفاء/إشعال المصباح — العجلة: تغيير الطول الموجي', click: S => setParam(S, 'I', S.p.I > 0 ? 0 : 60), wheel: (S, s) => setParam(S, 'lam', S.p.lam - s * 10) });
    (S._mc || []).forEach(([x, y, m]) => L.push({ id: 'm_' + m, x, y, w: 44, h: 30, hint: false, tip: 'انقر لاختيار هذا المعدن للوح الباعث', click: S => setParam(S, 'metal', m) }));
    return L;
  };
  E.howto = 'اسحب المؤشر على <b>شريط الألوان</b> لتغيير الطول الموجي (λ₀ الأحمر المتقطع هو طول موجة العتبة)، واسحب منزلق <b>الشدة</b>، وانقر المصباح لإطفائه. انقر أحد <b>المعادن</b> لتغيير دالة الشغل. اسحب منزلق <b>مقسم الجهد</b> يساراً لجعل الجامع سالباً حتى تنعكس الإلكترونات ويصبح التيار صفراً (جهد القطع). مخطط الطاقة يبين hf و W و KEmax.';
})();

/* =====================================================================
   7) app_solar — pn-junction cross-section: photons → electron–hole
      pairs, built-in field separates them, current through the load
   ===================================================================== */
(() => {
  const E = MZ.E('app_solar'); if (!E) return;
  E.controls = E.controls.concat([
    TG('phot', 'الفوتونات الساقطة', true, null, 'photon'),
    TG('pairs', 'أزواج إلكترون–فجوة وانفصالها', true, null, 'charges'),
    TG('field', 'المجال الكهربائي في منطقة الاستنزاف', true, null, 'efield'),
    TG('flow', 'حركة الإلكترونات في الدائرة الخارجية', true, null, 'electron'),
    TG('iv', 'منحني I–V ونقطة أعظم قدرة', true, null, 'graph'),
    TG('lab', 'التسميات والقيم', true, null, 'labels')
  ]);
  const Leff = S => S.p.L * Math.max(0, Math.cos(rad(S.th || 0)));
  const op = (S, R) => { const IL = .006 * Leff(S), Is = 1e-9, vt = .0335; let lo = 0, hi = .8; for (let k = 0; k < 50; k++) { const V = (lo + hi) / 2; const I = IL - Is * (Math.exp(V / vt) - 1); if (I > V / R) lo = V; else hi = V; } return { V: lo, I: lo / R }; };
  const bt = E.controls.find(c => c.type === 'buttons'); if (bt) bt.btns[0].on = S => { S.rows = []; for (let r = 1; r <= 200; r *= 1.35) { const q = op(S, r); S.rows.push({ V: +q.V.toFixed(3), I: +(q.I * 1e3).toFixed(1), P: +(q.V * q.I * 1e3).toFixed(1) }); } Runner.table(Runner.cur, S); };
  E.setup = S => { S.th = S.th || 0; S.phs = []; S.prs = []; S.acc = 0; S.q = 0; };
  const lay = S => { const w = S.W || 820, h = S.H || 780; const x0 = 96, cw = Math.min(360, w * .44), cT = h * .37; return { w, h, x0, cw, x1: x0 + cw, cT, nH: 34, dH: 22, pH: 118, cB: cT + 174, px: x0 + cw / 2, Rs: Math.min(230, cT - 40), lx: Math.min(w - 90, x0 + cw + Math.max(150, (w - x0 - cw) * .55)) }; };
  const sunPos = (S, g) => [g.px + g.Rs * Math.sin(rad(S.th)), g.cT - g.Rs * Math.cos(rad(S.th))];
  E.update = (S, dt) => {
    const g = lay(S); const q = op(S, S.p.RL); const Le = Leff(S);
    S.acc += Le / 100 * 14 * dt; while (S.acc > 1) { S.acc--; const x = g.x0 + 20 + Math.random() * (g.cw - 40); S.phs.push({ x, t: 0, depth: g.nH * .5 + Math.random() * (g.dH + g.pH * .55) }); }
    const sp = sunPos(S, g);
    S.phs.forEach(p => { p.t += dt * 1.4; if (p.t >= 1 && !p.done) { p.done = true; const y = g.cT + p.depth; S.prs.push({ x: p.x + Math.tan(rad(S.th)) * p.depth * .3, ye: y, yh: y, st: 0, life: 0 }); } });
    S.phs = S.phs.filter(p => !p.done); void sp;
    const jn = g.cT + g.nH + g.dH / 2; const drive = q.I > 1e-5 ? 1 : .15;
    S.prs.forEach(p => { p.life += dt; if (p.life < .25) return; p.ye = Math.max(g.cT + 6, p.ye - dt * 110 * (p.ye > jn - 6 ? 1.2 : .9 * drive)); p.yh = Math.min(g.cB - 6, p.yh + dt * 80 * (p.yh < jn + 6 ? 1.2 : .9 * drive)); });
    S.prs = S.prs.filter(p => p.life < 1.7);
    S.q += dt * q.I * 3000;
  };
  E.draw = (ctx, w, h, S) => {
    G.bg(ctx, w, h); const p = S.p, g = lay(S); const q = op(S, p.RL); const bk = MZ.book(ctx); const Le = Leff(S);
    const sp = sunPos(S, g); const jn = g.cT + g.nH + g.dH / 2;
    // sun + rays
    setRaw(ctx, 1); G.glow(ctx, sp[0], sp[1], 70, 'rgba(250,204,21,A)', .2 + .7 * p.L / 100); ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(sp[0], sp[1], 24, 0, TAU); ctx.fill(); ctx.strokeStyle = '#ca8a04'; ctx.lineWidth = 2; ctx.stroke(); setRaw(ctx, 0);
    if (p.lab !== false) G.text(ctx, 'الشمس ' + p.L + '%  (زاوية ' + Math.round(S.th) + '°)', sp[0], sp[1] - 38, { s: 11, w: 800, c: MZ.fg(ctx) });
    ctx.strokeStyle = 'rgba(202,138,4,.35)'; ctx.setLineDash([4, 6]); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(g.px, g.cT); ctx.lineTo(sp[0], sp[1]); ctx.stroke(); ctx.moveTo(g.px, g.cT); ctx.beginPath(); ctx.moveTo(g.px, g.cT); ctx.lineTo(g.px, g.cT - g.Rs * .5); ctx.stroke(); ctx.setLineDash([]);
    // cell layers
    setRaw(ctx, 1); ctx.fillStyle = bk ? '#dbeafe' : '#1e3a8a'; ctx.fillRect(g.x0, g.cT, g.cw, g.nH); ctx.fillStyle = bk ? '#f1f5f9' : '#334155'; ctx.fillRect(g.x0, g.cT + g.nH, g.cw, g.dH); ctx.fillStyle = bk ? '#fee2e2' : '#7f1d1d'; ctx.fillRect(g.x0, g.cT + g.nH + g.dH, g.cw, g.pH); setRaw(ctx, 0);
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.strokeRect(g.x0, g.cT, g.cw, g.cB - g.cT);
    ctx.fillStyle = '#64748b'; for (let x = g.x0 + 20; x < g.x1 - 10; x += 60) ctx.fillRect(x, g.cT - 6, 10, 6); ctx.fillRect(g.x0, g.cT - 8, g.cw, 3); ctx.fillStyle = '#475569'; ctx.fillRect(g.x0, g.cB, g.cw, 8);
    if (p.lab !== false) { G.text(ctx, 'طبقة n', g.x0 + 8, g.cT + g.nH / 2, { s: 11, w: 900, c: '#1d4ed8', a: 'left' }); G.text(ctx, 'منطقة الاستنزاف (الوصلة)', g.x0 + 8, g.cT + g.nH + g.dH / 2, { s: 10, w: 800, c: MZ.mute(ctx), a: 'left' }); G.text(ctx, 'طبقة p', g.x0 + 8, g.cB - 14, { s: 11, w: 900, c: '#b91c1c', a: 'left' }); G.text(ctx, 'قطب علوي (−)', g.x1 - 4, g.cT - 18, { s: 10, w: 800, c: MZ.fg(ctx), a: 'right' }); G.text(ctx, 'قطب سفلي (+)', g.x1 - 4, g.cB + 20, { s: 10, w: 800, c: MZ.fg(ctx), a: 'right' }); }
    // depletion ions + field
    if (p.field !== false) { for (let x = g.x0 + 80; x < g.x1 - 10; x += 36) { G.text(ctx, '⊕', x, g.cT + g.nH + 5, { s: 10, w: 900, c: '#dc2626' }); G.text(ctx, '⊖', x + 10, g.cT + g.nH + g.dH - 5, { s: 10, w: 900, c: '#2563eb' }); }
      for (let x = g.x0 + 98; x < g.x1 - 10; x += 72) G.arrow(ctx, x, g.cT + g.nH + 2, x, g.cT + g.nH + g.dH - 2, '#ea580c', 2, 7);
      if (p.lab !== false) G.text(ctx, 'E', g.x1 - 14, jn, { s: 11, w: 900, c: '#ea580c' }); }
    // photons
    if (p.phot !== false) S.phs.forEach(ph => { const tx = ph.x, ty = g.cT + ph.depth; const x = lerp(sp[0] + (tx - g.px) * .3, tx, ph.t), y = lerp(sp[1] + 20, ty, ph.t); MZ.squiggle(ctx, x, y, Math.atan2(ty - sp[1], tx - sp[0] - (tx - g.px) * .3), 16, '#d97706', 3, 2.5, 1.8); });
    // pairs
    if (p.pairs !== false) S.prs.forEach(pr => { const a = pr.life < .25 ? pr.life / .25 : 1; if (pr.life < .35) { ctx.strokeStyle = `rgba(250,204,21,${1 - pr.life * 2.5})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(pr.x, pr.ye, 9 + pr.life * 20, 0, TAU); ctx.stroke(); }
      ctx.globalAlpha = a; setRaw(ctx, 1); ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.arc(pr.x - 4, pr.ye, 4.5, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(pr.x - 6.5, pr.ye - .8, 5, 1.6);
      ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 1.8; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(pr.x + 4, pr.yh, 4.5, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#dc2626'; ctx.fillRect(pr.x + 1.5, pr.yh - .8, 5, 1.6); ctx.fillRect(pr.x + 3.2, pr.yh - 2.5, 1.6, 5); setRaw(ctx, 0); ctx.globalAlpha = 1; });
    // external circuit
    const lx = g.lx, ty = g.cT - 30, byy = g.cB + 34; const topW = [[g.x1 - 20, g.cT - 8], [g.x1 - 20, ty], [lx, ty], [lx, g.cT + 18]], botW = [[lx, g.cT + 130], [lx, byy], [g.x1 - 20, byy], [g.x1 - 20, g.cB + 8]];
    G.wire(ctx, topW, '#334155'); G.wire(ctx, botW, '#334155'); G.wire(ctx, [[lx, g.cT + 58], [lx, g.cT + 70]], '#334155');
    MZ.lamp(ctx, lx, g.cT + 38, 20, clamp(q.V * q.I / .45, 0, 1.2));
    const rf = (p.RL - 1) / 199; ctx.save(); ctx.translate(lx, g.cT + 100); ctx.rotate(Math.PI / 2); MZ.rheo(ctx, 0, 0, 60, rf); ctx.restore(); S._rh = [lx, g.cT + 70, g.cT + 130];
    if (p.lab !== false) G.text(ctx, 'RL = ' + p.RL + ' Ω', lx - 16, g.cT + 100, { s: 11, w: 800, c: MZ.fg(ctx), mono: 1, a: 'right' });
    if (p.flow !== false && q.I > 1e-5) { const path = [[g.x1 - 20, g.cT - 8], [g.x1 - 20, ty], [lx, ty], [lx, byy], [g.x1 - 20, byy], [g.x1 - 20, g.cB + 8]]; setRaw(ctx, 1); G.dotsAlong(ctx, path, S.q, '#2563eb', 22); setRaw(ctx, 0); if (p.lab !== false) G.text(ctx, 'e⁻ →', (g.x1 + lx) / 2, ty - 12, { s: 11, w: 900, c: '#2563eb' }); }
    G.meter(ctx, (g.x1 + lx) / 2 - 10, ty + 44, 24, q.I * 1e3, 600, 'mA', fmt(q.I * 1e3, 3) + ' mA'); G.meter(ctx, (g.x1 + lx) / 2 - 10, byy - 50, 24, q.V, .7, 'V', fmt(q.V, 3) + ' V');
    // I–V graph
    if (p.iv !== false) { const gx = 76, gy = g.cB + 60, gw = Math.min(300, w * .38), gh = Math.min(170, h - 104 - gy); if (gh > 90) { MZ.box(ctx, gx, gy, gw, gh, bk ? 'rgba(255,255,255,.95)' : 'rgba(15,23,42,.85)', '#94a3b8', 8);
      const IL = .006 * Math.max(Le, 1), X = v => gx + 16 + v / .7 * (gw - 30), Y = i => gy + gh - 18 - i / (.006 * 100) * (gh - 36);
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(0), gy + 12); ctx.lineTo(X(0), Y(0)); ctx.lineTo(gx + gw - 8, Y(0)); ctx.stroke();
      ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 2.2; ctx.beginPath(); let best = { P: 0 }; for (let v = 0; v <= .7; v += .005) { const i = Math.max(0, .006 * Le - 1e-9 * (Math.exp(v / .0335) - 1)); if (v * i > best.P) best = { P: v * i, v, i }; v ? ctx.lineTo(X(v), Y(i)) : ctx.moveTo(X(v), Y(i)); } ctx.stroke(); void IL;
      ctx.strokeStyle = 'rgba(100,116,139,.6)'; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(.7), Y(.7 / p.RL)); ctx.stroke(); ctx.setLineDash([]);
      if (best.P > 0) { setRaw(ctx, 1); ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.arc(X(best.v), Y(best.i), 5, 0, TAU); ctx.fill(); setRaw(ctx, 0); G.text(ctx, 'أعظم قدرة', X(best.v) - 10, Y(best.i) - 12, { s: 10, w: 800, c: '#16a34a' }); }
      setRaw(ctx, 1); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(X(q.V), Y(q.I), 5.5, 0, TAU); ctx.fill(); setRaw(ctx, 0);
      G.text(ctx, 'I', X(0) + 8, gy + 12, { s: 11, w: 900, c: MZ.mute(ctx) }); G.text(ctx, 'V', gx + gw - 12, Y(0) - 10, { s: 11, w: 900, c: MZ.mute(ctx) }); G.text(ctx, 'P = ' + fmt(q.V * q.I * 1e3, 3) + ' mW', gx + gw / 2 + 30, gy + 14, { s: 11, w: 900, c: '#dc2626', mono: 1 }); } }
  };
  E.drags = S => {
    const g = lay(S); const sp = sunPos(S, g); const [lx, r0, r1] = S._rh || [g.lx, g.cT + 70, g.cT + 130];
    return [
      { id: 'sun', x: sp[0], y: sp[1], r: 28, cx: g.px, cy: g.cT, tip: 'اسحب الشمس لتغيير زاوية سقوط الضوء — العجلة: الشدة', idle: 'اسحب الشمس ✋', drag: (S, d) => { S.th = clamp(deg(Math.atan2(d.x - g.px, g.cT - d.y)), -75, 75); }, wheel: (S, s) => setParam(S, 'L', S.p.L + s * 5) },
      { id: 'rheo', x: lx, y: lerp(r0, r1, (S.p.RL - 1) / 199), r: 16, axis: 'y', tip: 'اسحب منزلق مقاومة الحمل RL', drag: (S, d) => setParam(S, 'RL', 1 + clamp(((d.oy + d.y - d.sy) - r0) / (r1 - r0), 0, 1) * 199), wheel: (S, s) => setParam(S, 'RL', S.p.RL + s * 3) },
      { id: 'cell', x: g.px, y: (g.cT + g.cB) / 2, w: g.cw, h: g.cB - g.cT, axis: 'y', hint: false, tip: 'اسحب للأعلى/للأسفل فوق الخلية لتغيير شدة الضوء', down: S => { S._v0 = S.p.L; }, drag: (S, d) => setParam(S, 'L', S._v0 - (d.y - d.sy) * .6), wheel: (S, s) => setParam(S, 'L', S.p.L + s * 5) }
    ];
  };
  E.readings = S => { const q = op(S, S.p.RL); return [rd('التيار', fmtSI(q.I, 'A')), rd('الفولطية', fmtSI(q.V, 'V')), rd('القدرة الخارجة', fmtSI(q.V * q.I, 'W')), rd('تيار الدائرة القصيرة', fmtSI(.006 * Leff(S), 'A')), rd('زاوية السقوط', Math.round(S.th || 0) + '°'), rd('الشدة الفعالة L·cosθ', fmt(Leff(S), 3) + ' %')]; };
  E.record = S => { const q = op(S, S.p.RL); return { V: +q.V.toFixed(3), I: +(q.I * 1e3).toFixed(1), P: +(q.V * q.I * 1e3).toFixed(1) }; };
  E.explain = S => `كل فوتون يمتص قرب الوصلة يولد <b>زوج إلكترون–فجوة</b>؛ المجال الكهربائي في منطقة الاستنزاف (من n إلى p) يدفع <b>الإلكترون نحو n</b> و<b>الفجوة نحو p</b>، فتتولد قوة دافعة وتنساب الإلكترونات عبر الحمل من القطب العلوي إلى السفلي. الشدة الفعالة = L cosθ = <b>${fmt(Leff(S), 3)}%</b> — ${Math.abs(S.th || 0) > 5 ? 'الضوء المائل يعطي تياراً أقل.' : 'الضوء العمودي يعطي أكبر تيار.'}`;
  E.howto = 'اسحب <b>الشمس</b> على القوس لتغيير زاوية السقوط (أو العجلة فوقها لتغيير الشدة)، واسحب فوق <b>الخلية</b> عمودياً لتغيير الشدة، واسحب منزلق <b>مقاومة الحمل</b>. راقب الأزواج (− أزرق / + أحمر) تنفصل عند الوصلة، ونقطة التشغيل الحمراء على منحني I–V مقارنة بنقطة أعظم قدرة الخضراء.';
})();

/* =====================================================================
   8) debroglie — electron diffraction tube: HV slider, wave packets
      (λ = h/p), graphite foil, movable screen, rings built from hits
   ===================================================================== */
(() => {
  const E = MZ.E('debroglie'); if (!E) return;
  E.controls = E.controls.concat([
    TG('pack', 'الموجة المرافقة (رزمة موجية)', true, null, 'wave'),
    TG('cone', 'مسارات الحيود بزاوية 2θ', true, null, 'ray'),
    TG('hits', 'مواقع وصول الإلكترونات على الشاشة', true, null, 'electron'),
    TG('rings', 'حلقات الحيود المتوقعة (نظرياً)', false, null, 'dot'),
    TG('lab', 'التسميات والقيم', true, null, 'labels')
  ]);
  const D1 = 2.13e-10, D2 = 1.23e-10, RS = .065;
  E.setup = S => { S.pk = []; S.fly = []; S.hits = []; S.acc = 0; S.Lm = .08; S.beam = true; S.key = ''; };
  const lay = S => { const w = S.W || 820, h = S.H || 780; const cy = h * .27, sideR = Math.min(105, h * .14); const ppm = sideR / RS; const xf = Math.max(250, w * .34); return { w, h, cy, sideR, ppm, xf, xs: xf + S.Lm * ppm, gx: 84, fx: w * .5, fy: h * .67, Rf: Math.min(h * .19, w * .2) }; };
  const rings = S => { const l = E.lam(S); return [[D1, .45], [D2, .25]].map(([d, wgt]) => { const s = l / (2 * d); if (s >= 1) return null; const th2 = 2 * Math.asin(s); return { th2, R: S.Lm * Math.tan(th2), wgt }; }); };
  E.update = (S, dt) => {
    const g = lay(S); const key = S.p.V + S.p.part + S.Lm.toFixed(3); if (key !== S.key) { S.key = key; S.hits = []; }
    const rg = rings(S);
    if (S.beam) { S.acc += dt * 14; while (S.acc > 1) { S.acc--; S.pk.push({ x: g.gx + 70 }); } }
    S.pk.forEach(p => p.x += dt * 260); S.pk = S.pk.filter(p => { if (p.x < g.xf) return true;
      // choose where it lands (probabilities follow the diffraction intensity)
      const u = Math.random(); let R = 0; let c = null; if (u > .3) { c = u < .75 ? rg[0] : rg[1]; } if (c) R = c.R + gauss() * .0012; else R = Math.abs(gauss()) * .0015;
      const ph = Math.random() * TAU; S.fly.push({ t: 0, R, ph }); return false; });
    S.fly.forEach(f => f.t += dt * 2.6); S.fly = S.fly.filter(f => { if (f.t < 1) return true; if (f.R < RS) { S.hits.push([f.R, f.ph]); if (S.hits.length > 900) S.hits.shift(); } return false; });
  };
  E.draw = (ctx, w, h, S) => {
    G.bg(ctx, w, h); const p = S.p, g = lay(S); const l = E.lam(S); const rg = rings(S);
    // tube outline
    ctx.strokeStyle = 'rgba(148,163,184,.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.gx, g.cy - 22); ctx.lineTo(g.xf - 30, g.cy - 22); ctx.quadraticCurveTo(g.xs - 40, g.cy - g.sideR - 30, g.xs + 6, g.cy - g.sideR - 8); ctx.moveTo(g.gx, g.cy + 22); ctx.lineTo(g.xf - 30, g.cy + 22); ctx.quadraticCurveTo(g.xs - 40, g.cy + g.sideR + 30, g.xs + 6, g.cy + g.sideR + 8); ctx.stroke();
    // gun
    ctx.fillStyle = '#334155'; rr(ctx, g.gx, g.cy - 18, 70, 36, 6); ctx.fill(); ctx.fillStyle = S.beam ? '#f97316' : '#64748b'; ctx.fillRect(g.gx + 8, g.cy - 6, 14, 12); ctx.fillStyle = '#94a3b8'; ctx.fillRect(g.gx + 50, g.cy - 18, 5, 13); ctx.fillRect(g.gx + 50, g.cy + 5, 5, 13);
    G.text(ctx, S.beam ? 'مدفع إلكتروني' : 'المدفع متوقف', g.gx + 35, g.cy - 30, { s: 11, w: 800, c: '#cbd5e1' });
    // HV slider
    const hy = g.cy + 60, h0 = g.gx, h1 = g.gx + Math.min(220, g.xf - g.gx - 30); const fV = MZ.logf(p.V, 20, 5000); MZ.slider(ctx, h0, hy, h1, hy, fV, '#f97316'); S._hv = [h0, h1, hy];
    G.text(ctx, 'فرق جهد التعجيل V = ' + p.V + ' V', (h0 + h1) / 2, hy + 20, { s: 12, w: 900, c: '#fdba74' });
    // particle pills
    S._pp = [MZ.pill(ctx, (h0 + h1) / 2 - 48, hy + 48, 'إلكترون', p.part === 'e', '#2563eb', { w: 88 }), MZ.pill(ctx, (h0 + h1) / 2 + 48, hy + 48, 'بروتون', p.part === 'p', '#dc2626', { w: 88 })];
    // wave packets towards the foil
    const lamPx = clamp(l * 1e11 * 2.2, 3.5, 60);
    if (p.pack !== false) S.pk.forEach(k => { ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 1.8; ctx.beginPath(); for (let x = -26; x <= 26; x++) { const env = Math.exp(-(x * x) / 150); const y = g.cy - 11 * env * Math.sin(TAU * (k.x + x) / lamPx); x === -26 ? ctx.moveTo(k.x + x, y) : ctx.lineTo(k.x + x, y); } ctx.stroke(); });
    else S.pk.forEach(k => { ctx.fillStyle = '#7dd3fc'; ctx.beginPath(); ctx.arc(k.x, g.cy, 3, 0, TAU); ctx.fill(); });
    if (p.lab !== false) G.text(ctx, 'λ = h/p = ' + fmtSI(l, 'm'), (g.gx + 70 + g.xf) / 2 + 20, g.cy - 36, { s: 12, w: 900, c: '#7dd3fc', mono: 1 });
    // foil
    ctx.fillStyle = '#a3a3a3'; ctx.fillRect(g.xf - 3, g.cy - 30, 6, 60); if (p.lab !== false) G.text(ctx, 'رقيقة غرافيت', g.xf, g.cy + 44, { s: 11, w: 800, c: '#d4d4d4' });
    // diffraction cones
    if (p.cone !== false) { rg.forEach((r, i) => { if (!r) return; const yR = Math.min(g.sideR, r.R * g.ppm); const col = i ? 'rgba(134,239,172,.35)' : 'rgba(134,239,172,.6)'; [1, -1].forEach(sg => { ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(g.xf, g.cy); ctx.lineTo(r.R < RS ? g.xs : g.xf + g.sideR / Math.tan(r.th2), g.cy - sg * yR); ctx.stroke(); }); if (i === 0 && p.lab !== false && r.R < RS) { ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(g.xf, g.cy, 46, -r.th2, 0); ctx.stroke(); G.text(ctx, '2θ = ' + fmt(deg(r.th2), 3) + '°', g.xf + 60, g.cy - 12, { s: 11, w: 800, c: '#fde68a', a: 'left' }); } });
      ctx.strokeStyle = 'rgba(134,239,172,.6)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(g.xf, g.cy); ctx.lineTo(g.xs, g.cy); ctx.stroke(); ctx.setLineDash([]); }
    // flying electrons (particles after the foil)
    S.fly.forEach(f => { const x = lerp(g.xf, g.xs, f.t), y = g.cy - f.R * g.ppm * Math.sin(f.ph) * f.t; if (Math.abs(y - g.cy) > g.sideR + 4) return; ctx.fillStyle = '#bae6fd'; ctx.beginPath(); ctx.arc(x, y, 2, 0, TAU); ctx.fill(); });
    // screen (side)
    ctx.fillStyle = '#14532d'; ctx.fillRect(g.xs, g.cy - g.sideR, 7, 2 * g.sideR); ctx.fillStyle = '#86efac'; ctx.fillRect(g.xs, g.cy - g.sideR, 2, 2 * g.sideR);
    if (p.lab !== false) { G.text(ctx, 'شاشة متوهجة', g.xs + 4, g.cy + g.sideR + 18, { s: 11, w: 800, c: '#86efac' }); const ly = g.cy - g.sideR - 22; G.arrow(ctx, (g.xf + g.xs) / 2 - 10, ly, g.xf, ly, '#94a3b8', 1.2, 6); G.arrow(ctx, (g.xf + g.xs) / 2 + 10, ly, g.xs, ly, '#94a3b8', 1.2, 6); G.text(ctx, 'L = ' + fmt(S.Lm * 100, 3) + ' cm', (g.xf + g.xs) / 2, ly, { s: 11, w: 800, c: '#e2e8f0', bg: 'rgba(15,23,42,.9)', mono: 1 }); }
    // ---- front view of the screen ----
    const fx = g.fx, fy = g.fy, Rf = g.Rf, k = Rf / RS; ctx.fillStyle = '#052e16'; ctx.beginPath(); ctx.arc(fx, fy, Rf, 0, TAU); ctx.fill(); ctx.strokeStyle = '#166534'; ctx.lineWidth = 3; ctx.stroke();
    G.glow(ctx, fx, fy, 14, 'rgba(134,239,172,A)', .9);
    if (p.hits !== false) { ctx.fillStyle = 'rgba(187,247,208,.75)'; S.hits.forEach(([R, a]) => { ctx.fillRect(fx + Math.cos(a) * R * k - 1, fy + Math.sin(a) * R * k - 1, 2, 2); }); }
    if (p.rings) rg.forEach((r, i) => { if (!r || r.R > RS) return; ctx.strokeStyle = i ? 'rgba(250,204,21,.5)' : 'rgba(250,204,21,.8)'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(fx, fy, r.R * k, 0, TAU); ctx.stroke(); ctx.setLineDash([]); });
    G.text(ctx, 'الشاشة من الأمام (' + S.hits.length + ' إلكترون) — انقر لمسحها', fx, fy + Rf + 16, { s: 11, w: 800, c: '#86efac' });
    if (p.lab !== false) { const r0 = rg[0]; G.text(ctx, r0 && r0.R < RS ? 'نصف قطر الحلقة الأولى ≈ ' + fmt(r0.R * 100, 3) + ' cm' : 'الحلقات خارج الشاشة (λ كبير)', fx, fy - Rf - 14, { s: 12, w: 800, c: '#fde68a' }); }
    // λ vs d comparison bar
    if (p.lab !== false && w > 640) { const bx = w - 200, by = h * .5; MZ.box(ctx, bx, by, 180, 96, 'rgba(15,23,42,.85)', '#475569', 8); const sc = 150 / 3e-10; G.text(ctx, 'مقارنة λ بالمسافة بين الذرات d', bx + 90, by + 14, { s: 10, w: 800, c: '#cbd5e1' });
      ctx.fillStyle = '#a3a3a3'; ctx.fillRect(bx + 15, by + 34, D1 * sc, 8); G.text(ctx, 'd = 0.213 nm', bx + 15 + D1 * sc / 2, by + 52, { s: 10, w: 700, c: '#d4d4d4', mono: 1 });
      ctx.fillStyle = '#7dd3fc'; ctx.fillRect(bx + 15, by + 66, Math.max(1, Math.min(160, l * sc)), 8); G.text(ctx, 'λ = ' + fmt(l * 1e9, 3) + ' nm', bx + 90, by + 86, { s: 10, w: 700, c: '#7dd3fc', mono: 1 }); }
  };
  E.drags = S => { const g = lay(S); const L = []; if (!S._hv) return L; const [h0, h1, hy] = S._hv;
    L.push({ id: 'hv', x: lerp(h0, h1, MZ.logf(S.p.V, 20, 5000)), y: hy, r: 15, axis: 'x', tip: 'اسحب لتغيير فرق جهد التعجيل V', idle: 'اسحب لتغيير جهد التعجيل ✋', drag: (S, d) => setParam(S, 'V', Math.round(MZ.unlog(((d.ox + d.x - d.sx) - h0) / (h1 - h0), 20, 5000) / 10) * 10), wheel: (S, s) => setParam(S, 'V', S.p.V * (s > 0 ? 1.1 : 1 / 1.1)) });
    L.push({ id: 'screen', x: g.xs + 3, y: g.cy, w: 22, h: 2 * g.sideR, axis: 'x', tip: 'اسحب الشاشة لتغيير بعدها عن البلورة L', drag: (S, d) => { S.Lm = clamp((d.ox + d.x - d.sx - g.xf) / g.ppm, .04, Math.min(.2, (g.w - 230 - g.xf) / g.ppm)); } });
    L.push({ id: 'gun', x: g.gx + 35, y: g.cy, w: 70, h: 36, hint: false, tip: 'انقر لتشغيل / إيقاف حزمة الإلكترونات', click: S => { S.beam = !S.beam; } });
    L.push({ id: 'front', x: g.fx, y: g.fy, r: g.Rf, hint: false, tip: 'انقر لمسح الشاشة ومشاهدة تكوّن الحلقات من جديد', click: S => { S.hits = []; } });
    (S._pp || []).forEach((b, i) => L.push({ id: 'pp' + i, x: b.x, y: b.y, w: b.w, h: b.h, hint: false, tip: 'اختر الجسيم', click: S => setParam(S, 'part', i ? 'p' : 'e') }));
    return L; };
  E.explain = S => { const l = E.lam(S); const r = rings(S)[0]; return `λ = h/√(2meV) = <b>${fmtSI(l, 'm')}</b>. كل إلكترون يصل الشاشة <b>كنقطة</b> (جسيم)، لكن تجمّع النقاط يكوّن <b>حلقات حيود</b> (موجة). ${r && r.R < RS ? 'زيادة V تزيد الزخم p فيقل λ و<b>تصغر الحلقات</b>.' : 'λ كبير نسبياً فالحلقات واسعة جداً (خارج الشاشة) — زد V.'} ${S.p.part === 'p' ? 'البروتون أثقل بكثير: λ صغير جداً فتنكمش الحلقات نحو المركز.' : ''}`; };
  E.howto = 'اسحب منزلق <b>فرق جهد التعجيل</b>، واسحب <b>الشاشة</b> لتغيير بعدها L، وانقر <b>المدفع</b> لإيقاف الحزمة. الرزم الموجية الزرقاء تمثل الموجة المرافقة (λ = h/p)، وبعد البلورة يصل كل إلكترون إلى الشاشة كنقطة؛ انقر الشاشة الأمامية لمسحها وشاهد الحلقات تتكون تدريجياً. جرّب البروتون.';
})();

/* =====================================================================
   9) relativity — light clocks: stationary vs moving (seen from Earth),
      contracted ship vs ruler, throttle lever, t = γ t₀, L = L₀/γ
   ===================================================================== */
(() => {
  const E = MZ.E('relativity'); if (!E) return;
  E.controls = E.controls.concat([
    TG('clock', 'الساعتان الضوئيتان (نبضة الضوء)', true, null, 'light'),
    TG('path', 'مسار الضوء المائل في الساعة المتحركة', true, null, 'ray'),
    TG('geom', 'مثلث الاشتقاق: (ct/2)² = (ct₀/2)² + (vt/2)²', true, null, 'vector'),
    TG('len', 'المسطرة وتقلص طول المركبة', true, null, 'eye'),
    TG('dial', 'الساعتان التقليديتان', true, null, 'stopwatch'),
    TG('lab', 'التسميات والقيم', true, null, 'labels')
  ]);
  const T0 = 1.2; // proper tick period (s, sim)
  const gam = S => 1 / Math.sqrt(1 - S.p.b ** 2);
  E.setup = S => { S.t0 = 0; S.te = 0; S.x = 0; S.trail = []; S.hold = false; };
  const lay = S => { const w = S.W || 820, h = S.H || 780; return { w, h, y1: 70, bandH: Math.min(230, h * .3), H: Math.min(120, h * .15), ppm: Math.min(2.2, (w - 160) / 300), x0: 76, x1: w - 20 }; };
  E.update = (S, dt) => { const g = lay(S); const y = gam(S); S.te += dt; S.t0 += dt / y; if (!S.hold) S.x = (S.x || 0) + S.p.b * (2 * g.H / T0) * dt; const span = g.x1 - g.x0 + 260; if (S.x > span) { S.x -= span; S.trail = []; } };
  E.draw = (ctx, w, h, S) => {
    G.bg(ctx, w, h, false); const p = S.p, g = lay(S), y = gam(S);
    ctx.fillStyle = 'rgba(255,255,255,.5)'; for (let i = 0; i < 70; i++) ctx.fillRect((i * 97 + 13) % w, (i * 53 + 7) % h, 1.5, 1.5);
    // ---------- band 1: Earth frame, moving ship with light clock ----------
    const by = g.y1, bh = g.bandH; MZ.box(ctx, g.x0 - 6, by - 8, g.x1 - g.x0 + 12, bh + 16, 'rgba(30,41,59,.55)', '#475569', 10);
    G.text(ctx, 'كما يرصدها الراصد على الأرض (الإطار الساكن S)', g.x1 - 8, by + 8, { s: 12, w: 900, c: '#e2e8f0', a: 'right' });
    const L0px = 100 * g.ppm, Lpx = L0px / y; const sx = g.x0 - 180 + S.x; const cyS = by + bh * .55; const shipH = g.H + 36;
    // ruler (stationary) at the bottom of the band
    if (p.len !== false) { const ry = by + bh - 14; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(g.x0, ry); ctx.lineTo(g.x1, ry); ctx.stroke(); for (let m = 0; m * g.ppm <= g.x1 - g.x0; m += 25) { const x = g.x0 + m * g.ppm; ctx.beginPath(); ctx.moveTo(x, ry); ctx.lineTo(x, ry - (m % 100 ? 5 : 10)); ctx.stroke(); if (m % 100 === 0) G.text(ctx, m + ' m', x, ry + 9, { s: 9, w: 700, c: '#94a3b8', mono: 1 }); } }
    // ship body (contracted)
    ctx.save(); ctx.beginPath(); ctx.rect(g.x0 - 6, by - 8, g.x1 - g.x0 + 12, bh + 16); ctx.clip();
    ctx.fillStyle = 'rgba(203,213,225,.18)'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sx, cyS - shipH / 2); ctx.lineTo(sx + Lpx * .82, cyS - shipH / 2); ctx.lineTo(sx + Lpx, cyS); ctx.lineTo(sx + Lpx * .82, cyS + shipH / 2); ctx.lineTo(sx, cyS + shipH / 2); ctx.closePath(); ctx.fill(); ctx.stroke();
    if (p.b > .01) { ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.moveTo(sx, cyS - 14); ctx.lineTo(sx - 12 - 30 * p.b, cyS); ctx.lineTo(sx, cyS + 14); ctx.closePath(); ctx.fill(); }
    // light clock inside ship (mirrors H apart)
    const mx = sx + Lpx * .4, mT = cyS - g.H / 2, mB = cyS + g.H / 2; ctx.fillStyle = '#e2e8f0'; ctx.fillRect(mx - 12 / Math.min(y, 3), mT - 4, 24 / Math.min(y, 3), 4); ctx.fillRect(mx - 12 / Math.min(y, 3), mB, 24 / Math.min(y, 3), 4);
    // photon: proper phase from t0
    const ph = (S.t0 % T0) / T0; const yPh = ph < .5 ? mB - (ph * 2) * g.H : mT + (ph - .5) * 2 * g.H;
    if (p.clock !== false) { if (p.path !== false) { S.trail.push([mx, yPh]); if (S.trail.length > 400) S.trail.shift(); ctx.strokeStyle = 'rgba(250,204,21,.55)'; ctx.lineWidth = 1.5; ctx.beginPath(); S.trail.forEach((q, i) => i && Math.abs(q[0] - S.trail[i - 1][0]) < 40 ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); }
      G.glow(ctx, mx, yPh, 12, 'rgba(250,204,21,A)', 1); ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(mx, yPh, 4, 0, TAU); ctx.fill(); }
    ctx.restore();
    if (p.lab !== false) { G.text(ctx, 'v = ' + p.b.toFixed(3) + ' c', clamp(sx + Lpx / 2, g.x0 + 40, g.x1 - 40), cyS - shipH / 2 - 12, { s: 12, w: 900, c: '#fdba74', mono: 1 }); if (p.len !== false) G.text(ctx, 'L = L₀/γ = ' + fmt(100 / y, 4) + ' m', clamp(sx + Lpx / 2, g.x0 + 60, g.x1 - 60), cyS - shipH / 2 - 30, { s: 11, w: 800, c: '#7dd3fc', mono: 1 }); }
    // ---------- band 2: two identical clocks compared ----------
    const b2 = by + bh + 24, c1x = g.x0 + (g.x1 - g.x0) * .18, c2x = g.x0 + (g.x1 - g.x0) * .5; const H = g.H;
    if (p.clock !== false) {
      // stationary clock (Earth)
      const pe = (S.te % T0) / T0, ye = pe < .5 ? b2 + H - pe * 2 * H : b2 + (pe - .5) * 2 * H;
      ctx.fillStyle = '#e2e8f0'; ctx.fillRect(c1x - 14, b2 - 4, 28, 4); ctx.fillRect(c1x - 14, b2 + H, 28, 4); ctx.strokeStyle = 'rgba(250,204,21,.4)'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(c1x, b2); ctx.lineTo(c1x, b2 + H); ctx.stroke(); ctx.setLineDash([]);
      G.glow(ctx, c1x, ye, 12, 'rgba(250,204,21,A)', 1); ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(c1x, ye, 4, 0, TAU); ctx.fill();
      G.text(ctx, 'ساعة ساكنة: دقات = ' + Math.floor(S.te / T0), c1x, b2 + H + 20, { s: 11, w: 800, c: '#fde68a' });
      // moving clock seen from Earth: one tick = γT0, horizontal shift vγT0 (scaled into the box)
      const tickE = y * T0, vpx = p.b * 2 * H / T0; const run = Math.min(vpx * tickE, (g.x1 - c2x) - 30); const k = run / Math.max(1e-6, vpx * tickE);
      const pm = (S.te % tickE) / tickE; const px = c2x + run * pm, pyy = pm < .5 ? b2 + H - pm * 2 * H : b2 + (pm - .5) * 2 * H;
      ctx.fillStyle = '#e2e8f0'; [0, 1].forEach(j => { const xx = c2x + run * j; ctx.globalAlpha = j ? .35 : .35; ctx.fillRect(xx - 14, b2 - 4, 28, 4); ctx.fillRect(xx - 14, b2 + H, 28, 4); }); ctx.globalAlpha = 1; ctx.fillRect(px - 14, b2 - 4, 28, 4); ctx.fillRect(px - 14, b2 + H, 28, 4);
      if (p.path !== false) { ctx.strokeStyle = 'rgba(250,204,21,.6)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(c2x, b2 + H); ctx.lineTo(c2x + run / 2, b2); ctx.lineTo(c2x + run, b2 + H); ctx.stroke(); }
      G.glow(ctx, px, pyy, 12, 'rgba(250,204,21,A)', 1); ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(px, pyy, 4, 0, TAU); ctx.fill();
      G.text(ctx, 'ساعة المركبة (متحركة): دقات = ' + Math.floor(S.t0 / T0), c2x + Math.max(run, 60) / 2, b2 + H + 20, { s: 11, w: 800, c: '#7dd3fc' });
      if (p.geom !== false && run > 30) { const mxg = c2x + run / 2; ctx.strokeStyle = '#f472b6'; ctx.lineWidth = 1.4; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(mxg, b2); ctx.lineTo(mxg, b2 + H); ctx.lineTo(c2x, b2 + H); ctx.stroke(); ctx.setLineDash([]);
        G.text(ctx, 'ct₀/2', mxg + 22, b2 + H / 2, { s: 11, w: 900, c: '#f9a8d4' }); G.text(ctx, 'vt/2', c2x + run / 4 + 16, b2 + H - 10, { s: 11, w: 900, c: '#f9a8d4' }); G.text(ctx, 'ct/2', c2x + run / 4 - 14, b2 + H / 2 - 8, { s: 11, w: 900, c: '#fde047' });
        if (k < .999) G.text(ctx, '(المسافة الأفقية مصغّرة لتتسع)', c2x + run / 2, b2 - 16, { s: 10, w: 700, c: '#94a3b8' }); }
      if (p.lab !== false) G.text(ctx, 'نبضة الضوء في الساعة المتحركة تقطع مساراً أطول بالسرعة c نفسها ⇐ دقاتها أبطأ: t = γt₀', (g.x0 + g.x1) / 2, b2 + H + 58, { s: 12, w: 800, c: '#e2e8f0', bg: 'rgba(15,23,42,.8)' });
    }
    // ---------- band 3: dials + throttle ----------
    const b3 = b2 + H + 110; const R = Math.min(46, (h - 100 - b3) / 2 - 16);
    if (p.dial !== false && R > 20) { const clock = (cx, t, name, col) => { ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, b3 + R, R, 0, TAU); ctx.stroke(); for (let k = 0; k < 12; k++) { const a = k * TAU / 12; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * R * .85, b3 + R + Math.sin(a) * R * .85); ctx.lineTo(cx + Math.cos(a) * R, b3 + R + Math.sin(a) * R); ctx.stroke(); } const a = t * TAU / 10 - Math.PI / 2; G.arrow(ctx, cx, b3 + R, cx + Math.cos(a) * R * .8, b3 + R + Math.sin(a) * R * .8, col, 3, 8); G.text(ctx, name + '  ' + t.toFixed(2) + ' s', cx, b3 + 2 * R + 14, { s: 12, w: 800, c: col, mono: 0 }); };
      clock(g.x0 + 70, S.te, 'ساعة الأرض t', '#fde68a'); clock(g.x0 + 230, S.t0, 'ساعة المركبة t₀', '#7dd3fc'); }
    // throttle lever
    const tx0 = Math.max(g.x0 + 330, w * .5), tx1 = g.x1 - 30, ty = b3 + 30; MZ.slider(ctx, tx0, ty, tx1, ty, p.b / .995, '#f97316'); S._th = [tx0, tx1, ty];
    G.text(ctx, 'مقبض السرعة: v = ' + p.b.toFixed(3) + ' c', (tx0 + tx1) / 2, ty - 22, { s: 12, w: 900, c: '#fdba74' });
    G.text(ctx, 'γ = 1/√(1 − v²/c²) = ' + fmt(y, 4), (tx0 + tx1) / 2, ty + 26, { s: 13, w: 900, c: '#f9a8d4', mono: 1 });
    [.5, .9, .99].forEach(v => { const x = lerp(tx0, tx1, v / .995); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, ty + 8); ctx.lineTo(x, ty + 12); ctx.stroke(); });
  };
  E.drags = S => { const g = lay(S), y = gam(S); const L = []; if (!S._th) return L; const [tx0, tx1, ty] = S._th;
    L.push({ id: 'thr', x: lerp(tx0, tx1, S.p.b / .995), y: ty, r: 15, axis: 'x', tip: 'اسحب مقبض السرعة لتغيير v/c', idle: 'اسحب لزيادة سرعة المركبة ✋', drag: (S, d) => setParam(S, 'b', clamp(((d.ox + d.x - d.sx) - tx0) / (tx1 - tx0), 0, 1) * .995), wheel: (S, s) => setParam(S, 'b', S.p.b + s * .005) });
    const Lpx = 100 * g.ppm / y, sx = g.x0 - 180 + S.x, cyS = g.y1 + g.bandH * .55;
    L.push({ id: 'ship', x: sx + Lpx / 2, y: cyS, w: Math.max(40, Lpx), h: g.H + 36, axis: 'x', tip: 'اسحب المركبة لتحريكها — العجلة: تغيير السرعة', down: S => { S.hold = true; S.trail = []; }, drag: (S, d) => { S.x = clamp(S.x + d.dx, 0, g.x1 - g.x0 + 260); }, up: S => { S.hold = false; }, wheel: (S, s) => setParam(S, 'b', S.p.b + s * .01) });
    return L; };
  E.explain = S => { const y = gam(S); return `عند v = <b>${S.p.b.toFixed(3)}c</b> يكون γ = <b>${fmt(y, 4)}</b>: كل ثانية على ساعة المركبة تقابل ${fmt(y, 4)} ثانية على ساعة الأرض (<b>تمدد الزمن</b>)، وطول المركبة كما يقيسه الراصد الأرضي ${fmt(100 / y, 4)} m بدل 100 m (<b>تقلص الطول</b> باتجاه الحركة فقط). السبب: الضوء يسير بالسرعة c نفسها لكل الراصدين، لكن مساره في الساعة المتحركة أطول.`; };
  E.howto = 'اسحب <b>مقبض السرعة</b> البرتقالي (أو العجلة فوق المركبة) لتغيير v، واسحب <b>المركبة</b> نفسها لإعادة وضعها أمام المسطرة. قارن نبضة الضوء في الساعة الساكنة بنظيرتها في الساعة المتحركة: المسار المائل أطول ⇐ الدقات أبطأ (t = γt₀). المثلث الوردي يبين الاشتقاق.';
})();
