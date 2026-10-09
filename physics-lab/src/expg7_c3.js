'use strict';
/* ====================== الأول المتوسط — الفصل الثالث: الضغط (ch 13) ====================== */

/* ---------- local drawing helpers for this chapter ---------- */
const C3 = {
  T(ctx, s, x, y, o = {}) { G.text(ctx, s, x, y, Object.assign({ raw: 1, c: '#0f172a', w: 800 }, o)); },
  /* white rounded card: lines centred at x, from top y */
  card(ctx, x, y, lines, o = {}) {
    const s = o.s || 14, lh = s + 9; let W = o.w || 0;
    const mono = l => /^[A-Za-zρPFVWmh0-9(]/.test(l);
    K.raw(ctx, () => { lines.forEach(l => { ctx.font = `900 ${s + 1}px ${mono(l) ? 'ui-monospace,monospace' : 'Tajawal,sans-serif'}`; W = Math.max(W, ctx.measureText(l).width + 30); }); const H = lines.length * lh + 14; ctx.fillStyle = o.bg || 'rgba(255,255,255,.95)'; rr(ctx, x - W / 2, y, W, H, 12); ctx.fill(); ctx.strokeStyle = o.bd || '#7c3aed'; ctx.lineWidth = 2; ctx.stroke(); });
    lines.forEach((l, i) => C3.T(ctx, l, x, y + 7 + lh * (i + .5), { s: i === (o.hi ?? -1) ? s + 1 : s, c: i === (o.hi ?? -1) ? (o.hc || '#6d28d9') : (o.c || '#1e293b'), w: i === (o.hi ?? -1) ? 900 : 700, mono: mono(l) ? 1 : 0 }));
    return lines.length * lh + 14;
  },
  /* task banner at the top centre */
  task(ctx, w, s, col = '#0f766e') { C3.T(ctx, s, w / 2 + 20, 26, { s: 14.5, w: 900, c: '#fff', bg: col }); },
  /* on-canvas button */
  btn(ctx, x, y, w, h, label, col = '#2563eb', on = false) {
    K.raw(ctx, () => { ctx.fillStyle = on ? col : '#ffffff'; rr(ctx, x - w / 2, y - h / 2, w, h, 10); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.stroke(); });
    C3.T(ctx, label, x, y + 1, { s: 13, w: 900, c: on ? '#fff' : col });
  },
  hitR: (x, y, w, h) => ({ x, y, w, h }),
  /* dial gauge */
  gauge(ctx, x, y, r, v, vmin, vmax, title, unit, o = {}) {
    K.raw(ctx, () => {
      ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.strokeStyle = o.col || '#334155'; ctx.lineWidth = 4; ctx.stroke();
      const a0 = Math.PI * .75, a1 = Math.PI * 2.25, n = o.ticks || 10;
      for (let k = 0; k <= n * 2; k++) { const a = a0 + (a1 - a0) * k / (n * 2), big = k % 2 === 0; ctx.strokeStyle = '#334155'; ctx.lineWidth = big ? 2 : 1; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * (r - 4), y + Math.sin(a) * (r - 4)); ctx.lineTo(x + Math.cos(a) * (r - (big ? 13 : 8)), y + Math.sin(a) * (r - (big ? 13 : 8))); ctx.stroke(); }
      if (o.mark != null) { const a = a0 + (a1 - a0) * clamp((o.mark - vmin) / (vmax - vmin), 0, 1); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r - 7, a - .05, a + .05); ctx.stroke(); }
      const a = a0 + (a1 - a0) * clamp((v - vmin) / (vmax - vmin), 0, 1.02);
      ctx.strokeStyle = o.needle || '#dc2626'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * (r - 16), y + Math.sin(a) * (r - 16)); ctx.stroke(); ctx.lineCap = 'butt';
      ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(x, y, 5, 0, TAU); ctx.fill();
    });
    C3.T(ctx, o.txt || (fmt(v, 4) + ' ' + unit), x, y + r * .45, { s: 12.5, mono: 1, c: '#0f172a' });
    if (title) C3.T(ctx, title, x, y - r - 12, { s: 12, c: '#fff', bg: o.col || '#334155' });
  },
  /* liquid rectangle (raw) */
  liquid(ctx, x, y, w, h, col = '#38bdf8', a = .55) { if (h <= 0) return; K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, col); g.addColorStop(1, shade(col, -35)); ctx.globalAlpha = a; ctx.fillStyle = g; ctx.fillRect(x, y, w, h); ctx.globalAlpha = 1; ctx.strokeStyle = shade(col, -45); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke(); }); },
  arrow(ctx, x1, y1, x2, y2, col, w = 3) { if (Math.hypot(x2 - x1, y2 - y1) < 3) return; K.raw(ctx, () => G.arrow(ctx, x1, y1, x2, y2, col, w, 7 + w * 1.6)); },
  /* a friendly pressing hand (palm down) centred at x, bottom y */
  hand(ctx, x, y, s = 1) {
    K.raw(ctx, () => {
      ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
      ctx.fillStyle = '#fcd9b6'; ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 2;
      ctx.fillStyle = '#3b82f6'; rr(ctx, -26, -110, 52, 44, 8); ctx.fill(); ctx.stroke(); // sleeve
      ctx.fillStyle = '#fcd9b6'; rr(ctx, -30, -70, 60, 58, 16); ctx.fill(); ctx.stroke(); // palm
      for (let k = 0; k < 4; k++) { rr(ctx, -28 + k * 14.5, -22, 13, 22, 6); ctx.fill(); ctx.stroke(); }
      ctx.beginPath(); ctx.ellipse(-34, -42, 9, 18, -.4, 0, TAU); ctx.fill(); ctx.stroke(); // thumb
      ctx.restore();
    });
  },
  /* people / animals: simple friendly shapes */
  person(ctx, x, yFoot, H, stance, t) {
    K.raw(ctx, () => {
      const s = H / 300; ctx.save(); ctx.translate(x, yFoot); ctx.scale(s, s);
      const lift = stance === 'two' ? 0 : 14; ctx.lineCap = 'round';
      ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 22;
      // legs
      ctx.beginPath(); ctx.moveTo(-16, -150 - lift); ctx.lineTo(-18, -22 - lift); ctx.stroke();
      if (stance === 'one') { ctx.beginPath(); ctx.moveTo(16, -150 - lift); ctx.lineTo(40, -90 - lift); ctx.lineTo(30, -40 - lift); ctx.stroke(); }
      else { ctx.beginPath(); ctx.moveTo(16, -150 - lift); ctx.lineTo(18, -22 - lift); ctx.stroke(); }
      // shoes / feet
      ctx.fillStyle = '#fcd9b6'; ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 2;
      const foot = (fx, up) => { ctx.save(); ctx.translate(fx, -lift - 10); if (stance !== 'two' && !up) ctx.rotate(.9); if (up) ctx.rotate(-.5); ctx.beginPath(); ctx.ellipse(8, 0, 24, 9, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); };
      if (stance === 'two') { foot(-18); foot(18); } else if (stance === 'toes') { foot(-18); foot(18); } else { foot(-18); ctx.save(); ctx.translate(48, -40 + 30); foot(0, 1); ctx.restore(); }
      // body
      ctx.fillStyle = '#16a34a'; ctx.strokeStyle = '#14532d'; rr(ctx, -40, -265 - lift, 80, 125, 22); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 18; const sw = stance === 'one' ? .6 : .15;
      ctx.beginPath(); ctx.moveTo(-36, -250 - lift); ctx.lineTo(-62 - 20 * sw, -190 - lift - 30 * sw); ctx.stroke(); ctx.beginPath(); ctx.moveTo(36, -250 - lift); ctx.lineTo(62 + 20 * sw, -190 - lift - 30 * sw); ctx.stroke();
      ctx.fillStyle = '#fcd9b6'; ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, -300 - lift, 34, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#3f2a1d'; ctx.beginPath(); ctx.arc(0, -310 - lift, 34, Math.PI * 1.05, Math.PI * 1.95); ctx.fill();
      ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(-11, -300 - lift, 3.5, 0, TAU); ctx.arc(11, -300 - lift, 3.5, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#9a3412'; ctx.beginPath(); ctx.arc(0, -290 - lift, 9, .15 * Math.PI, .85 * Math.PI); ctx.stroke();
      ctx.restore();
    });
  },
  camel(ctx, x, y, s, ph, sink) {
    K.raw(ctx, () => {
      ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const col = '#d4a15a', dk = '#8a5a2b';
      ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineWidth = 11;
      [-38, -22, 26, 42].forEach((lx, i) => { const sw = Math.sin(ph + (i % 2 ? Math.PI : 0)) * 10; ctx.beginPath(); ctx.moveTo(lx, -70); ctx.lineTo(lx + sw, -4 + sink); ctx.stroke(); ctx.fillStyle = dk; ctx.beginPath(); ctx.ellipse(lx + sw, -2 + sink, 13, 5, 0, 0, TAU); ctx.fill(); });
      ctx.fillStyle = col; ctx.strokeStyle = dk; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(0, -84, 60, 26, 0, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(-2, -108, 26, 22, 0, Math.PI, TAU); ctx.fill(); ctx.stroke();
      ctx.lineWidth = 15; ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(50, -90); ctx.quadraticCurveTo(78, -100, 76, -134); ctx.stroke();
      ctx.fillStyle = col; ctx.strokeStyle = dk; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(86, -138, 18, 10, .15, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(88, -142, 2.4, 0, TAU); ctx.fill();
      ctx.restore();
    });
  },
  horse(ctx, x, y, s, ph, sink) {
    K.raw(ctx, () => {
      ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const col = '#7c4a2d', dk = '#3b1f10';
      ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineWidth = 8;
      [-34, -20, 24, 38].forEach((lx, i) => { const sw = Math.sin(ph + (i % 2 ? Math.PI : 0)) * 9; ctx.beginPath(); ctx.moveTo(lx, -58); ctx.lineTo(lx + sw, -6 + sink); ctx.stroke(); ctx.fillStyle = '#111827'; ctx.fillRect(lx + sw - 5, -8 + sink, 10, 8); });
      ctx.fillStyle = col; ctx.strokeStyle = dk; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(0, -70, 52, 20, 0, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.lineWidth = 16; ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(40, -78); ctx.lineTo(62, -114); ctx.stroke();
      ctx.fillStyle = col; ctx.strokeStyle = dk; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(74, -114, 20, 9, .5, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = dk; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(36, -84); ctx.lineTo(56, -122); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-50, -74); ctx.quadraticCurveTo(-68, -60, -62, -34); ctx.stroke();
      ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(72, -119, 2.2, 0, TAU); ctx.fill();
      ctx.restore();
    });
  }
};

/* =====================================================================
   1) نشاط استهلالي: ضغط الهواء (الضغط الجوي) — القنينة المنكمشة (ص 43)
   ===================================================================== */
const B1 = {
  geo(S) {
    const w = S.W, h = S.H, by = h * .82; const bw = clamp(w * .16, 96, 140), bh = clamp(h * .42, 220, 320);
    const bx = w * .5 + (S.shx || 0), yb = by - 16, top = yb - bh, nw = bw * .38, nh = bh * .12, sh = bh * .12, yT = top + nh + sh;
    return { w, h, by, bw, bh, bx, bx0: w * .5, yb, top, nw, nh, sh, yT, capOff: [w * .5 + bw * .78, by - 18], kPour: [w * .5 + bw * .5 + 56, top - 34], jPour: [w * .5 - bw * .1 - 40, top - 96] };
  },
  dent(S) { return clamp((1 - S.V) * 2.4, 0, .85); },
  prof(t, k) { return Math.pow(Math.sin(Math.PI * t), .8) * (1 + .28 * Math.sin(7 * t + k * 2.1)); },
  path(ctx, g, S) {
    const d = B1.dent(S) * g.bw * .5, x0 = g.bx - g.bw / 2, x1 = g.bx + g.bw / 2, bulge = Math.max(0, S.V - 1) * g.bw * 3;
    ctx.beginPath(); ctx.moveTo(g.bx - g.nw / 2, g.top); ctx.lineTo(g.bx - g.nw / 2, g.top + g.nh); ctx.quadraticCurveTo(x0 - bulge * .3, g.top + g.nh, x0 - bulge * .3, g.yT);
    for (let i = 1; i <= 18; i++) { const t = i / 18; ctx.lineTo(x0 + d * B1.prof(t, 0) - bulge * Math.sin(Math.PI * t), g.yT + (g.yb - 10 - g.yT) * t); }
    ctx.quadraticCurveTo(x0, g.yb, x0 + 12, g.yb); ctx.lineTo(x1 - 12, g.yb); ctx.quadraticCurveTo(x1, g.yb, x1, g.yb - 10);
    for (let i = 17; i >= 0; i--) { const t = i / 18; ctx.lineTo(x1 - d * B1.prof(t, 1) + bulge * Math.sin(Math.PI * t), g.yT + (g.yb - 10 - g.yT) * t); }
    ctx.quadraticCurveTo(x1 + bulge * .3, g.top + g.nh, g.bx + g.nw / 2, g.top + g.nh); ctx.lineTo(g.bx + g.nw / 2, g.top); ctx.closePath();
  },
  Vroot(nTr) { const f = V => V <= 1 ? nTr / V - 1 + .35 * (1 - V) : nTr / V - 1 - 6 * (V - 1); let a = .45, b = 1.12; for (let i = 0; i < 30; i++) { const m = (a + b) / 2; if (f(m) > 0) a = m; else b = m; } return (a + b) / 2; },
  kettle(ctx, x, y, ang, col, t, label) {
    K.raw(ctx, () => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
      ctx.fillStyle = col; ctx.strokeStyle = shade(col, -60); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-28, -30); ctx.lineTo(-50, -26); ctx.lineTo(-56, -34); ctx.lineTo(-30, -14); ctx.closePath(); ctx.fill(); ctx.stroke(); // spout
      ctx.beginPath(); ctx.moveTo(-30, 34); ctx.lineTo(-24, -30); ctx.quadraticCurveTo(0, -42, 24, -30); ctx.lineTo(30, 34); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.lineWidth = 6; ctx.strokeStyle = shade(col, -40); ctx.beginPath(); ctx.arc(34, 0, 18, -Math.PI * .6, Math.PI * .55); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(-18, -22, 6, 48);
      ctx.restore();
    });
    C3.T(ctx, label, x, y + 50, { s: 12, c: '#fff', bg: shade(col, -40) });
  },
  step(S, dt) {
    const g = B1.geo(S);
    // pouring states
    S.pourHot = S.kx != null && Math.hypot(S.kx - g.kPour[0], S.ky - g.kPour[1]) < 4 && S.dragK !== true;
    S.pourCold = S.jx != null && Math.hypot(S.jx - g.jPour[0], S.jy - g.jPour[1]) < 4 && S.dragJ !== true;
    if (S.pourHot && S.water >= .24 && !S.dragK) { S.kx = g.bx0 + g.bw * 2.2; S.ky = g.by - 36; S.pourHot = false; }
    if (S.pourHot) { if (!S.cap && S.water < .24) { S.Tw = (S.Tw * S.water + 90 * dt * .08) / (S.water + dt * .08); S.water += dt * .08; } }
    const shaking = S.shakeT > 0; S.shakeT = Math.max(0, S.shakeT - dt);
    // temperatures (°C)
    if (S.pourCold) { S.Tw += (10 - S.Tw) * (1 - Math.exp(-dt * .5)); S.Ta += (10 - S.Ta) * (1 - Math.exp(-dt * .7)); }
    else { if (S.water > .02) S.Ta += (S.Tw - S.Ta) * (1 - Math.exp(-dt * (shaking ? 1.3 : .12))); else S.Ta += (25 - S.Ta) * (1 - Math.exp(-dt * .05)); S.Tw += (25 - S.Tw) * (1 - Math.exp(-dt * .006)); }
    const Tr = (S.Ta + 273) / 298;
    if (!S.cap) { const nt = S.V * 1 / Tr; S.n += (nt - S.n) * (1 - Math.exp(-dt * 3)); if (S.heated && S.opened === 0) S.opened = 1; }
    const Vt = B1.Vroot(S.n * Tr); S.V += (Vt - S.V) * (1 - Math.exp(-dt * 3));
    S.Pin = S.n * Tr / S.V;
    if (S.cap && S.Ta > 55 && S.water > .1) S.heated = true;
    if (S.opened === 1 && S.cap) S.opened = 2;
    if (S.V < .92 && !S.crushed) { S.crushed = true; K.cheer(S, g.bx, g.yT); }
    if (S.V > .97) S.crushed = false;
    // shaking spring-back & slosh
    if (!S.dragB) S.shx *= Math.exp(-dt * 9); S.shv = (S.shx - (S._pshx || 0)) / Math.max(dt, 1e-3); S._pshx = S.shx;
    // molecules inside: target count ∝ n
    const target = Math.round(26 * S.n);
    const inside = S.mIn.filter(m => !m.esc);
    if (inside.length > target) { const m = inside[inside.length - 1]; m.esc = 1; }
    if (inside.length < target && Math.random() < dt * 8) S.mIn.push({ x: (Math.random() - .5) * 10, y: -g.sh - g.nh + 4, vx: (Math.random() - .5) * 40, vy: 60, ent: .4 });
    const sp = 70 * Math.sqrt((S.Ta + 273) / 298), dpx = B1.dent(S) * g.bw * .5 * .85, bodyH = g.yb - g.yT - 6 - S.water * (g.yb - g.yT);
    S.mIn.forEach(m => {
      const k = sp / Math.max(1, Math.hypot(m.vx, m.vy)); m.vx *= k; m.vy *= k;
      if (m.esc) { m.vx = -m.x * 4; m.vy = -90; m.x += m.vx * dt; m.y += m.vy * dt; if (m.y < -g.sh - g.nh - 30) m.gone = 1; return; }
      if (m.ent > 0) { m.ent -= dt; m.y += 90 * dt; m.x *= .96; return; }
      m.x += m.vx * dt; m.y += m.vy * dt; const hx = g.bw / 2 - dpx - 6;
      if (m.x < -hx) { m.x = -hx; m.vx = Math.abs(m.vx); S.hits++; } if (m.x > hx) { m.x = hx; m.vx = -Math.abs(m.vx); S.hits++; }
      if (m.y < 4) { m.y = 4; m.vy = Math.abs(m.vy); } if (m.y > bodyH) { m.y = bodyH; m.vy = -Math.abs(m.vy); }
    });
    S.mIn = S.mIn.filter(m => !m.gone);
    // outside air
    const osp = 70; const R = [g.bx0 - g.bw * 2.4, g.top - 70, g.bx0 + g.bw * 2.4, g.yb - 6];
    S.mOut.forEach(m => { m.x += m.vx * dt * osp / 60; m.y += m.vy * dt * osp / 60; if (m.x < R[0] || m.x > R[2]) m.vx *= -1; if (m.y < R[1] || m.y > R[3]) m.vy *= -1; m.x = clamp(m.x, R[0], R[2]); m.y = clamp(m.y, R[1], R[3]);
      if (m.x > g.bx - g.bw / 2 - 8 && m.x < g.bx + g.bw / 2 + 8 && m.y > g.top - 6) { m.x = m.x < g.bx ? g.bx - g.bw / 2 - 9 : g.bx + g.bw / 2 + 9; m.vx *= -1; } });
  }
};
X7({ id: 'g7_bottle', ch: 13, sec: 'الفصل 3', page: 43, kind: 'نشاط استهلالي', title: 'نشاط استهلالي: ضغط الهواء (الضغط الجوي) — القنينة المنكمشة',
  desc: 'نضع ماءً حاراً في قنينة بلاستيكية ونغلقها ونرجّها، ثم نفتحها قليلاً ونغلقها ونصب عليها ماءً بارداً… فتنكمش القنينة! لماذا؟',
  tags: 'ضغط جوي هواء قنينة انكماش جزيئات',
  tools: ['قنينة بلاستيكية صغيرة', 'ماء ساخن (إبريق)', 'ماء بارد'],
  steps: ['اسحب الإبريق الأحمر (ماء حار جداً) إلى فوهة القنينة ليصب فيها قليلاً من الماء.', 'اضغط على الغطاء لإغلاق القنينة بإحكام.', 'رُجّ القنينة عدة مرات: اسحبها يميناً ويساراً. راقب حرارة الهواء وضغطه داخلها.', 'افتح الغطاء قليلاً (اضغط عليه) ليخرج الهواء المتمدد، ثم أغلقه بإحكام مرة أخرى.', 'اسحب إبريق الماء البارد فوق القنينة ليصب الماء عليها. ماذا تلاحظ؟ هل تغير شكل القنينة؟', 'فعّل «جزيئات الهواء» و«أسهم الضغط»: قارن الضغط داخل القنينة بالضغط الجوي خارجها وفسّر سبب الانكماش.'],
  concl: ['تسخين الهواء داخل القنينة يجعله يتمدد، فيخرج جزء منه عند فتح الغطاء.', 'عند تبريد القنينة المغلقة تبطؤ حركة جزيئات الهواء داخلها ويقل عددها، فيقل الضغط داخلها.', 'يصبح الضغط الجوي خارج القنينة أكبر من الضغط داخلها، فيدفع جدرانها إلى الداخل فتنكمش.', 'للهواء (الغلاف الجوي) وزن، والضغط الذي يسببه يسمى الضغط الجوي.'],
  laws: ['g7_atm'],
  fact: ['الضغط الجوي عند مستوى سطح البحر يساوي تقريباً وزن 10 أطنان على كل متر مربع!', 'لا نشعر بالضغط الجوي لأن في أجسامنا ضغطاً داخلياً يكافئه.', 'لو صببت الماء البارد والقنينة مفتوحة لما انكمشت، لأن الهواء يدخل إليها فيتساوى الضغطان.'],
  controls: [
    BT('', [{ t: 'قنينة جديدة', on: S => { const E = EXPS.find(e => e.id === 'g7_bottle'); E.setup(S); } }]),
    TG('mol', 'جزيئات الهواء داخل القنينة وخارجها', true, null, 'atom'), TG('arrows', 'أسهم الضغط (داخل / خارج)', true, null, 'force'), TG('gauge', 'مقياس الضغط وميزان الحرارة', true, null, 'meter'), TG('labels', 'الأسماء والإرشادات', true, null, 'labels')],
  setup(S) {
    Object.assign(S, { water: 0, Tw: 25, Ta: 25, n: 1, V: 1, Pin: 1, cap: false, heated: false, opened: 0, crushed: false, shx: 0, shv: 0, shakeT: 0, shake: 0, hits: 0, kx: null, ky: null, jx: null, jy: null, dragK: false, dragJ: false, dragB: false, pourHot: false, pourCold: false });
    S.mIn = Array.from({ length: 26 }, () => ({ x: (Math.random() - .5) * 60, y: 10 + Math.random() * 150, vx: Math.random() - .5, vy: Math.random() - .5 }));
    S.mOut = Array.from({ length: 46 }, () => ({ x: Math.random() * 800, y: 100 + Math.random() * 400, vx: Math.random() * 2 - 1, vy: Math.random() * 2 - 1 }));
    S._init = false;
  },
  update(S, dt) { if (!S.W) return; B1.step(S, Math.min(dt, .05)); },
  draw(ctx, w, h, S) {
    const p = S.p, g = B1.geo(S); K.bg(ctx, w, h, { benchY: g.by });
    if (!S._init) { S._init = true; S.mOut.forEach(m => { m.x = g.bx0 - g.bw * 2.4 + Math.random() * g.bw * 4.8; m.y = g.top - 70 + Math.random() * (g.yb - g.top + 60); }); }
    if (S.kx == null) { S.kx = g.bx0 + g.bw * 2.2; S.ky = g.by - 36; S.jx = Math.max(64 + 56, g.bx0 - g.bw * 2.25); S.jy = g.by - 36; }
    // tray
    K.raw(ctx, () => { ctx.fillStyle = '#94a3b8'; rr(ctx, g.bx0 - g.bw * 1.05, g.by - 18, g.bw * 2.1, 18, 8); ctx.fill(); ctx.fillStyle = 'rgba(56,189,248,.45)'; if (S.pourCold || S.coldPoured) rr(ctx, g.bx0 - g.bw, g.by - 14, g.bw * 2, 8, 4), ctx.fill(); });
    // outside molecules
    if (p.mol) S.mOut.forEach(m => K.ball(ctx, m.x, m.y, 4.2, '#94a3b8'));
    // bottle body
    K.raw(ctx, () => {
      B1.path(ctx, g, S); ctx.fillStyle = 'rgba(186,230,253,.38)'; ctx.fill();
      ctx.save(); B1.path(ctx, g, S); ctx.clip();
      if (S.water > 0) { const wh = S.water * (g.yb - g.yT), tilt = clamp(S.shv * .05, -18, 18); const hot = clamp((S.Tw - 25) / 65, 0, 1); ctx.fillStyle = hot > .3 ? `rgba(${Math.round(56 + 150 * hot)},${Math.round(189 - 60 * hot)},${Math.round(248 - 150 * hot)},.6)` : 'rgba(56,189,248,.6)'; ctx.beginPath(); ctx.moveTo(g.bx - g.bw, g.yb - wh + tilt); ctx.lineTo(g.bx + g.bw, g.yb - wh - tilt); ctx.lineTo(g.bx + g.bw, g.yb + 2); ctx.lineTo(g.bx - g.bw, g.yb + 2); ctx.closePath(); ctx.fill(); }
      if (p.mol) S.mIn.forEach(m => { if (!m.esc || m.y > -g.sh - g.nh) K.ball(ctx, g.bx + m.x, g.yT + m.y, 4.2, S.Ta > 45 ? '#ef4444' : S.Ta < 18 ? '#3b82f6' : '#8b5cf6'); });
      ctx.restore();
      B1.path(ctx, g, S); ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 2.4; ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(g.bx - g.bw / 2 + 10 + B1.dent(S) * g.bw * .2, g.yT + 14, 6, (g.yb - g.yT) * .6);
      // crumple lines
      if (B1.dent(S) > .15) { ctx.strokeStyle = 'rgba(3,105,161,.5)'; ctx.lineWidth = 1.5; const d = B1.dent(S); for (let k = 0; k < 4; k++) { const yy = g.yT + (g.yb - g.yT) * (.2 + k * .2); ctx.beginPath(); ctx.moveTo(g.bx - g.bw / 2 + d * g.bw * .4, yy); ctx.quadraticCurveTo(g.bx, yy + (k % 2 ? 10 : -10) * d, g.bx + g.bw / 2 - d * g.bw * .4, yy + 4); ctx.stroke(); } }
      // neck threads
      ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 1.2; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(g.bx - g.nw / 2, g.top + 5 + k * 5); ctx.lineTo(g.bx + g.nw / 2, g.top + 8 + k * 5); ctx.stroke(); }
    });
    if (p.mol) S.mIn.filter(m => m.esc && m.y <= -g.sh - g.nh).forEach(m => K.ball(ctx, g.bx + m.x, g.yT + m.y, 4.2, '#8b5cf6'));
    // steam from hot open bottle
    if (!S.cap && S.Tw > 50 && S.water > .02) K.raw(ctx, () => { for (let k = 0; k < 3; k++) { const ph = (S.t * .7 + k / 3) % 1; ctx.strokeStyle = `rgba(148,163,184,${.6 * (1 - ph)})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.bx + (k - 1) * 6, g.top - 4 - ph * 50); ctx.quadraticCurveTo(g.bx + (k - 1) * 6 + 10, g.top - 14 - ph * 50, g.bx + (k - 1) * 6, g.top - 24 - ph * 50); ctx.stroke(); } });
    // cap
    const capXY = S.cap ? [g.bx, g.top - 2] : g.capOff;
    K.raw(ctx, () => { ctx.fillStyle = '#2563eb'; rr(ctx, capXY[0] - g.nw / 2 - 5, capXY[1] - 16, g.nw + 10, 18, 4); ctx.fill(); ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.5)'; for (let k = 1; k < 6; k++) { const xx = capXY[0] - g.nw / 2 - 5 + (g.nw + 10) * k / 6; ctx.beginPath(); ctx.moveTo(xx, capXY[1] - 14); ctx.lineTo(xx, capXY[1]); ctx.stroke(); } });
    if (p.labels) C3.T(ctx, S.cap ? 'مغلق 🔒' : 'الغطاء', capXY[0] + (S.cap ? g.nw / 2 + 44 : 0), capXY[1] - (S.cap ? 8 : 30), { s: 11.5, c: '#fff', bg: '#1d4ed8' });
    // pressure arrows
    if (p.arrows) {
      const d = B1.dent(S) * g.bw * .5, Lo = 34, Li = 34 * S.Pin;
      [.28, .55, .8].forEach(t => { const y = g.yT + (g.yb - 10 - g.yT) * t; const xl = g.bx - g.bw / 2 + d * B1.prof(t, 0), xr = g.bx + g.bw / 2 - d * B1.prof(t, 1);
        C3.arrow(ctx, xl - 8 - Lo, y, xl - 5, y, '#dc2626', 3.5); C3.arrow(ctx, xr + 8 + Lo, y, xr + 5, y, '#dc2626', 3.5);
        C3.arrow(ctx, xl + 8 + Li, y, xl + 6, y, '#2563eb', 3); C3.arrow(ctx, xr - 8 - Li, y, xr - 6, y, '#2563eb', 3); });
      C3.T(ctx, 'الضغط الجوي (خارج)', g.bx - g.bw / 2 - 58, g.yT - 22, { s: 11.5, c: '#fff', bg: '#dc2626' });
      C3.T(ctx, 'ضغط الهواء داخل القنينة', g.bx + g.bw / 2 + 70, g.yT - 22, { s: 11.5, c: '#fff', bg: '#2563eb' });
    }
    // kettle (hot) and jug (cold)
    const kp = S.pourHot && !S.cap && S.water < .24, jp = S.pourCold;
    if (kp) K.raw(ctx, () => { ctx.strokeStyle = 'rgba(249,115,22,.75)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(S.kx - 52, S.ky + 2); ctx.quadraticCurveTo(g.bx + 6, S.ky - 4, g.bx + 2, g.top + 4); ctx.lineTo(g.bx + 2, g.yb - S.water * (g.yb - g.yT)); ctx.stroke(); });
    B1.kettle(ctx, S.kx, S.ky, kp ? -.55 : 0, '#ef4444', S.t, 'ماء حار جداً 🔥');
    if (jp) K.raw(ctx, () => { for (let k = 0; k < 14; k++) { const ph = (S.t * 1.6 + k / 14) % 1; const side = k % 2 ? 1 : -1; const d = B1.dent(S) * g.bw * .5; const yy = g.top - 20 + ph * (g.yb - g.top + 20); const xx = yy < g.yT ? g.bx + side * (g.nw / 2 + 6 + (yy - g.top) * .6) : g.bx + side * (g.bw / 2 + 5 - d * B1.prof((yy - g.yT) / (g.yb - g.yT), side > 0 ? 1 : 0)); ctx.fillStyle = 'rgba(14,165,233,.8)'; ctx.beginPath(); ctx.ellipse(xx, yy, 3, 6, 0, 0, TAU); ctx.fill(); }
      ctx.strokeStyle = 'rgba(14,165,233,.7)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(S.jx + 44, S.jy + 12); ctx.quadraticCurveTo(g.bx, S.jy + 4, g.bx, g.top - 18); ctx.stroke(); });
    B1.kettle(ctx, S.jx, S.jy, S.pourCold ? .55 : 0, '#0ea5e9', S.t, 'ماء بارد ❄️');
    K.raw(ctx, () => { if (!S.pourCold) return; }); // (jug spout mirrored via rotation)
    // gauge & thermometer
    if (p.gauge) {
      const gx = 64 + 78, gy = 150; C3.gauge(ctx, gx, gy, 62, S.Pin * 101.3, 70, 130, 'الضغط داخل القنينة', 'kPa', { mark: 101.3, txt: (S.Pin * 101.3).toFixed(1) + ' kPa' });
      C3.T(ctx, 'الخط الأحمر = الضغط الجوي 101.3 kPa', gx, gy + 82, { s: 10.5, c: '#991b1b' });
      if (w > 680) { K.thermo(ctx, gx, gy + 300, 170, Math.round(S.Ta), 0, 100, { step: 20 }); C3.T(ctx, 'حرارة الهواء داخلها', gx, gy + 322, { s: 11, c: '#fff', bg: '#b91c1c' }); } else C3.T(ctx, 'حرارة الهواء: ' + Math.round(S.Ta) + ' °C', gx, gy + 104, { s: 11.5, c: '#fff', bg: '#b91c1c' });
    }
    // guidance
    let msg, col = '#0f766e';
    if (S.crushed) { msg = S.cap ? 'انكمشت القنينة! 😮 الضغط الجوي خارجها أكبر من الضغط داخلها' : 'القنينة مفتوحة: دخل الهواء فعادت إلى شكلها'; col = S.cap ? '#7c3aed' : '#0f766e'; }
    else if (S.water < .1) msg = '1) اسحب الإبريق الأحمر إلى فوهة القنينة لتصب ماءً حاراً ✋';
    else if (!S.heated && !S.cap) msg = S.pourCold ? 'القنينة مفتوحة! الهواء يدخل إليها… أغلقها أولاً' : '2) اضغط على الغطاء الأزرق لإغلاق القنينة بإحكام';
    else if (!S.heated) msg = '3) رُجّ القنينة: اسحبها يميناً ويساراً عدة مرات ↔';
    else if (S.opened === 0) msg = '4) افتح الغطاء قليلاً (اضغط عليه) ليخرج الهواء المتمدد';
    else if (!S.cap) msg = '5) أغلق الغطاء بإحكام مرة أخرى';
    else msg = S.pourCold ? 'راقب… الضغط داخل القنينة يقل' : '6) اسحب إبريق الماء البارد فوق القنينة ❄️';
    if (p.labels) C3.task(ctx, w, msg, col);
    if (S.shakeT > 0 && !S.cap && S.water > .05 && p.labels) K.bubble(ctx, 'أغلق القنينة قبل رجّها!', g.bx, g.top - 20, { s: 13 });
    if (p.labels && S.cap && S.Pin > 1.03) C3.T(ctx, 'الضغط داخلها أكبر ← الهواء المسخن يتمدد', g.bx, g.yb + 26, { s: 12, c: '#fff', bg: '#b45309' });
    else if (p.labels && S.cap && S.Pin < .985) C3.T(ctx, 'الضغط داخلها أقل من الضغط الجوي', g.bx, g.yb + 26, { s: 12, c: '#fff', bg: '#7c3aed' });
    if (!S._touched) K.mascot(ctx, w - 80, 70, .75);
    K.party(ctx, S);
  },
  drags(S) {
    if (!S.W) return [];
    const g = B1.geo(S), L = [];
    const capXY = S.cap ? [g.bx, g.top - 9] : [g.capOff[0], g.capOff[1] - 7];
    L.push({ id: 'bottle', x: g.bx, y: (g.yT + g.yb) / 2, w: g.bw, h: g.yb - g.yT, axis: 'x', tip: 'اسحب القنينة يميناً ويساراً لرجّها', idle: 'رُجّني ↔', hint: S.cap && !S.heated,
      down: S => { S.dragB = true; }, drag: (S, d) => { S.shx = clamp(d.x - d.sx, -55, 55); if (Math.abs(d.dx) > 1) { S.shakeT = .5; S.shake += Math.abs(d.dx); } }, up: S => { S.dragB = false; } });
    L.push({ id: 'cap', x: capXY[0], y: capXY[1], w: g.nw + 26, h: 30, tip: S.cap ? 'اضغط لفتح الغطاء' : 'اضغط لإغلاق القنينة بالغطاء', hint: S.water > .1 && !S.cap, click: S => { S.cap = !S.cap; if (!S.cap && S.Pin > 1.02 && window.Sound) Sound.noise(.3, .15); } });
    const mk = (id, kx, ky, pour, lab, dragKey) => ({ id, x: S[kx], y: S[ky], w: 90, h: 80, axis: 'xy', tip: 'اسحب الإبريق إلى القنينة ليصب ' + lab, idle: id === 'kettle' ? 'اسحبني إلى فوهة القنينة ✋' : undefined, hint: id === 'kettle' ? S.water < .1 : S.cap && S.opened === 2,
      down: S => { S[dragKey] = true; }, drag: (S, d) => { S[kx] = clamp(d.ox + d.x - d.sx, 70, g.w - 50); S[ky] = clamp(d.oy + d.y - d.sy, 60, g.by - 30); },
      up: S => { S[dragKey] = false; if (Math.hypot(S[kx] - pour[0], S[ky] - pour[1]) < 110) { S[kx] = pour[0]; S[ky] = pour[1]; if (id === 'jug') S.coldPoured = true; } } });
    L.push(mk('kettle', 'kx', 'ky', g.kPour, 'ماءً حاراً', 'dragK'));
    L.push(mk('jug', 'jx', 'jy', g.jPour, 'ماءً بارداً عليها', 'dragJ'));
    return L;
  },
  readings(S) { return [rd('الضغط داخل القنينة', (S.Pin * 101.3).toFixed(1) + ' kPa'), rd('الضغط الجوي خارجها', '101.3 kPa'), rd('حرارة الهواء داخلها', Math.round(S.Ta) + ' °C'), rd('الغطاء', S.cap ? 'مغلق' : 'مفتوح'), rd('شكل القنينة', S.V < .92 ? 'منكمشة 😮' : S.V > 1.01 ? 'منتفخة قليلاً' : 'طبيعي', 1)]; },
  explain(S) {
    if (S.V < .92 && S.cap) return 'بعد التبريد <b>تبطؤ جزيئات الهواء</b> داخل القنينة، وعددها أصبح أقل (خرج جزء منها عند فتح الغطاء)، فيقل عدد اصطداماتها بالجدران ← <b>الضغط داخلها أقل</b> من الضغط الجوي، فيدفع الهواء الخارجي جدرانها إلى الداخل.';
    if (S.cap && S.Pin > 1.02) return 'الهواء داخل القنينة <b>سَخُن</b>: جزيئاته أسرع وتصطدم بالجدران بقوة أكبر، فأصبح <b>الضغط داخلها أكبر</b> من الضغط الجوي.';
    if (!S.cap) return 'القنينة <b>مفتوحة</b>: الهواء يدخل ويخرج بحرية، لذلك <b>الضغط داخلها = الضغط الجوي</b> خارجها.';
    return 'القنينة مغلقة بإحكام: كمية الهواء داخلها ثابتة. غيّر حرارته لترى ماذا يحدث للضغط.';
  },
  quiz: [
    { q: 'لماذا انكمشت القنينة البلاستيكية المغلقة بعد صب الماء البارد عليها؟', o: ['لأن الماء البارد ثقيل', 'لأن الضغط داخلها أصبح أقل من الضغط الجوي خارجها', 'لأن الهواء دخل إليها'], a: 1, why: 'التبريد يقلل ضغط الهواء المحصور داخلها، فيدفعها الضغط الجوي الأكبر إلى الداخل.' },
    { q: 'الضغط الذي يسببه وزن الغلاف الجوي يسمى:', o: ['ضغط السائل', 'الضغط الجوي', 'قوة الطفو'], a: 1, why: 'مراجعة الفصل: الضغط الجوي هو الضغط الذي يسببه وزن الغلاف الجوي.' },
    { q: 'نعلم أن الضغط الجوي المسلط علينا كبير ولكننا لا نعاني تأثيره، لماذا؟', o: ['لأنه يؤثر في الأرض فقط', 'لوجود ضغط داخلي في أجسامنا يكافئه', 'لأن الهواء ليس له وزن'], a: 1, why: 'ص 50: لا نشعر به بسبب وجود ضغط داخلي يكافئه في أجسامنا.' }
  ]
});

/* =====================================================================
   2) نشاط: ما العلاقة بين الضغط والمساحة السطحية؟ (ص 44–45)
   ===================================================================== */
const B2 = {
  AR: [4, 8, 12, 16],
  geo(S) {
    const w = S.W, h = S.H, by = h * .8, W = clamp(w - 64 - 240, 220, 480), bx = 64 + 24 + W / 2;
    const yc = by - 64 - 62, cw = W * .86; const spots = B2.AR.map((A, i) => bx - cw / 2 + cw * (i + .5) / 4);
    const tx0 = bx + W / 2 + 26, tw = Math.min(190, w - tx0 - 14); const tr = B2.AR.map((A, i) => [tx0 + tw * (i % 2 ? .74 : .27), i < 2 ? by - 84 : by - 8]);
    return { w, h, by, W, bx, yc, cw, spots, tray: tr, tx0, tw, px: 2.6 };
  },
  dia: A => 19 * Math.sqrt(A), th: A => 120 / A + 5,
  disc(ctx, x, yTop, A, sel) {
    const d = B2.dia(A), t = B2.th(A);
    K.raw(ctx, () => { const g = ctx.createLinearGradient(x - d / 2, 0, x + d / 2, 0); g.addColorStop(0, '#64748b'); g.addColorStop(.45, '#e2e8f0'); g.addColorStop(1, '#475569'); ctx.fillStyle = g; ctx.fillRect(x - d / 2, yTop, d, t); ctx.beginPath(); ctx.ellipse(x, yTop + t, d / 2, d * .16, 0, 0, Math.PI); ctx.fill(); ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.ellipse(x, yTop, d / 2, d * .16, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = sel ? '#f59e0b' : '#334155'; ctx.lineWidth = sel ? 2.5 : 1.2; ctx.stroke(); });
    C3.T(ctx, A + ' cm²', x, yTop + t / 2 + 2, { s: 10.5, c: '#fff', bg: 'rgba(15,23,42,.75)', mono: 1 });
  },
  depth: (F, A) => 1.6 * F / A,
  stances: { two: { A: 450, n: 'واقف على كلتا قدميه' }, toes: { A: 20, n: 'على أطراف أصابع القدمين' }, one: { A: 10, n: 'على طرف أصابع قدم واحدة' } }
};
X7({ id: 'g7_pressure_area', ch: 13, sec: 'الدرس 1', page: 45, kind: 'نشاط', title: 'نشاط: ما العلاقة بين الضغط والمساحة السطحية؟',
  desc: 'نضغط أقراصاً متساوية الكتلة مختلفة المساحة (4، 8، 12، 16 cm²) في الطين الاصطناعي بالقوة نفسها (الميزان يقرأ 30 kg) ونقيس العمق بالمسطرة. ثم الشاب الواقف، والجمل والحصان، والمسمار.',
  tags: 'ضغط مساحة قوة باسكال طين مسمار جمل حصان قدم',
  tools: ['أقراص معدنية متساوية الكتلة مساحاتها 4، 8، 12، 16 cm²', 'طين اصطناعي', 'ميزان رقمي', 'مسطرة'],
  steps: ['اضغط على القرص الصغير (4 cm²) في الصينية لتضعه على الطين الاصطناعي فوق الميزان الرقمي.', 'اسحب اليد إلى الأسفل لتضغط على القرص حتى يقرأ الميزان 30 kg، ثم اتركها.', 'اضغط على قرص آخر أكبر مساحة، واضغط عليه حتى 30 kg أيضاً.', 'كرر للأقراص جميعها، وسجّل العمق في كل مرة («تسجيل»). قارن الأعماق بالمسطرة.', 'هل اختلفت القوة الضاغطة؟ ما العلاقة بين المساحة والعمق (الضغط)؟', 'جرّب المشاهد الأخرى: الشاب الواقف (585 N)، الجمل والحصان في الرمل، والمسمار.'],
  concl: ['الضغط هو القوة العمودية المؤثرة في وحدة المساحة: P = F / A ووحدته الباسكال Pa = N/m².', 'بثبوت القوة: كلما صغرت المساحة ازداد الضغط (زاد العمق في الطين)، وكلما كبرت المساحة قل الضغط.', 'العوامل المؤثرة في الضغط: القوة العمودية المؤثرة، ومساحة السطح الذي تؤثر فيه القوة.'],
  laws: ['g7_p'],
  fact: ['خف الجمل عريض فلا يغوص في الرمل، مع أن وزنه أكبر من وزن الحصان الذي تغوص حوافره.', 'عربات الحراثة والدبابات لها إطارات عريضة وسرفة لتقليل الضغط على التربة الطينية.', 'الشاب (585 N) الواقف على طرف إصبع قدم واحدة يضغط على الأرض 45 مرة أكثر من وقوفه على قدميه!'],
  controls: [
    SEL('view', 'المشهد', [['clay', 'الأقراص والطين'], ['feet', 'الشاب'], ['sand', 'الجمل والحصان'], ['nail', 'المسمار']], 'clay'),
    BT('', [{ t: 'طين جديد / إعادة', on: S => { const E = EXPS.find(e => e.id === 'g7_pressure_area'); const v = S.p.view; E.setup(S); S.p.view = v; } }]),
    TG('arrows', 'أسهم القوة والضغط', true, null, 'force'), TG('ruler', 'المسطرة (قياس العمق)', true, null, 'labels'), TG('calc', 'حساب الضغط P = F / A', true, null, 'graph')],
  setup(S) { Object.assign(S, { act: -1, push: 0, pressing: false, lastSpot: -1, stance: 'two', stAcc: 0, camX: null, horX: null, nailIn: 0, nailFlip: false, hamY: -80, dragH: false, strikes: 0, F: 0 }); S.dent = [0, 0, 0, 0]; S.Fmax = [0, 0, 0, 0]; S.prints = []; },
  update(S, dt) {
    if (!S.pressing) S.push = Math.max(0, S.push - dt * 140);
    S.F = S.act >= 0 ? S.push * .6 : 0; // kg
    if (S.act >= 0) { const d = B2.depth(S.F, B2.AR[S.act]); if (d > S.dent[S.act]) { S.dent[S.act] = d; S.Fmax[S.act] = Math.max(S.Fmax[S.act], S.F); } }
    if (!S.dragH) S.hamY += (-80 - S.hamY) * (1 - Math.exp(-dt * 6));
  },
  draw(ctx, w, h, S) {
    const p = S.p; const g = B2.geo(S); K.bg(ctx, w, h, { benchY: g.by });
    const v = p.view;
    if (v === 'clay') {
      const Fr = S.F; K.balance(ctx, g.bx, g.by - 64, Fr, { w: g.W, unit: 'kg', fmt: x => (Math.round(x * 10) / 10).toFixed(1) });
      // clay slab with dents
      K.raw(ctx, () => { const cg = ctx.createLinearGradient(0, g.yc, 0, g.yc + 62); cg.addColorStop(0, '#86efac'); cg.addColorStop(1, '#16a34a'); ctx.fillStyle = cg; rr(ctx, g.bx - g.cw / 2 - 8, g.yc, g.cw + 16, 62, 10); ctx.fill(); ctx.strokeStyle = '#166534'; ctx.lineWidth = 1.5; ctx.stroke();
        g.spots.forEach((x, i) => { const dp = S.dent[i] * g.px; if (dp < .5) return; const d = B2.dia(B2.AR[i]); ctx.fillStyle = '#dcfce7'; ctx.fillRect(x - d / 2, g.yc, d, dp); ctx.strokeStyle = '#14532d'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - d / 2, g.yc); ctx.lineTo(x - d / 2, g.yc + dp); ctx.lineTo(x + d / 2, g.yc + dp); ctx.lineTo(x + d / 2, g.yc); ctx.stroke(); ctx.fillStyle = 'rgba(20,83,45,.25)'; ctx.fillRect(x - d / 2, g.yc + dp - 4, d, 4); }); });
      C3.T(ctx, 'طين اصطناعي (مقطع)', g.bx - g.cw / 2 + 60, g.yc + 48, { s: 11, c: '#fff', bg: '#166534' });
      // discs: on tray or on clay
      K.raw(ctx, () => { ctx.fillStyle = '#b45309'; rr(ctx, g.tx0, g.by - 14, g.tw, 12, 5); ctx.fill(); rr(ctx, g.tx0, g.by - 90, g.tw, 12, 5); ctx.fill(); ctx.fillStyle = '#92400e'; ctx.fillRect(g.tx0, g.by - 90, 6, 78); ctx.fillRect(g.tx0 + g.tw - 6, g.by - 90, 6, 78); });
      C3.T(ctx, 'أقراص متساوية الكتلة', g.tx0 + g.tw / 2, g.by + 16, { s: 11.5, c: '#fff', bg: '#92400e' });
      B2.AR.forEach((A, i) => { if (i === S.act) return; const [x, y] = g.tray[i]; B2.disc(ctx, x, y - B2.th(A) - 6, A, false); });
      if (S.act >= 0) { const A = B2.AR[S.act], x = g.spots[S.act], sink = S.dent[S.act] * g.px, top = g.yc - B2.th(A) + sink - 2;
        B2.disc(ctx, x, top, A, true);
        const hy = top - 6 - (S.push > 0 ? 0 : 16); C3.hand(ctx, x, hy, .85);
        if (p.arrows && S.F > .5) { C3.arrow(ctx, x + 44, hy - 80, x + 44, hy - 80 + 20 + S.F * 1.4, '#dc2626', 4); C3.T(ctx, 'F = ' + fmt(S.F * 9.8, 3) + ' N', x + 44, hy - 94, { s: 12, c: '#fff', bg: '#dc2626', mono: 1 });
          const Pn = S.F * 9.8 / A, n = 5, d = B2.dia(A); for (let k = 0; k < n; k++) { const xx = x - d / 2 + d * (k + .5) / n; C3.arrow(ctx, xx, g.yc + sink + 4, xx, g.yc + sink + 6 + Pn * .45, '#f97316', 2.2); } }
        if (S.F > 29 && S.F < 31.5) K.bubble(ctx, '30 kg ✓ توقّف', x - 50, hy - 60, { s: 13, side: 'l' }); else if (S.F >= 31.5) K.bubble(ctx, 'أكثر من 30 kg! خفّف', x - 50, hy - 60, { s: 13, side: 'l', bg: '#fee2e2', bd: '#dc2626', c: '#991b1b' });
      }
      // depth labels (ruler)
      if (p.ruler) { g.spots.forEach((x, i) => { if (S.dent[i] > .05 && i !== S.act) C3.T(ctx, fmt(S.dent[i], 2) + ' mm', x, g.yc - 16, { s: 11.5, c: '#fff', bg: '#7c3aed', mono: 1 }); });
        const li = S.lastSpot; if (li >= 0 && li !== S.act && S.dent[li] > .05) { const lx = w - 110, ly = 150, r = 72; K.lens(ctx, lx, ly, r, () => { const d = B2.dia(B2.AR[li]) * 1.2, dp = S.dent[li] * 5; ctx.fillStyle = '#4ade80'; ctx.fillRect(lx - r, ly - 20, 2 * r, r + 30); ctx.fillStyle = '#fff'; ctx.fillRect(lx - d / 2, ly - 20, d, dp); ctx.fillStyle = '#fde047'; ctx.fillRect(lx + d / 2 + 4, ly - 60, 22, 110); ctx.fillStyle = '#422006'; ctx.font = '700 9px monospace'; ctx.textAlign = 'left'; for (let k = 0; k <= 20; k++) { const yy = ly - 20 + k * 5; ctx.fillRect(lx + d / 2 + 4, yy, k % 5 ? 5 : 10, 1); if (k % 5 === 0 && k) ctx.fillText(String(k), lx + d / 2 + 15, yy + 3); } ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx - d / 2, ly - 20 + dp); ctx.lineTo(lx + d / 2 + 4, ly - 20 + dp); ctx.stroke(); }); C3.T(ctx, 'العمق = ' + fmt(S.dent[li], 2) + ' mm', lx, ly + r + 18, { s: 12, c: '#fff', bg: '#7c3aed' }); } }
      if (p.calc && S.act >= 0) { const A = B2.AR[S.act], F = S.F * 9.8; C3.card(ctx, (64 + w) / 2 - 90, 58, ['P = F / A', `P = ${fmt(F, 3)} N ÷ ${A} cm² = ${fmt(F / A, 3)} N/cm²`], { hi: 1, s: 13.5 }); }
      C3.task(ctx, w, S.act < 0 ? 'اضغط على قرص في الصينية لتضعه على الطين ✋' : S.F < 1 ? 'اسحب اليد إلى الأسفل حتى يقرأ الميزان 30 kg ⬇' : 'القوة نفسها (30 kg) … قارن العمق مع كل قرص', '#0f766e');
    } else if (v === 'feet') {
      const st = B2.stances[S.stance], P = 585 / st.A, dep = 4 + .55 * P; const mx = 64 + (w - 64) * .3, fy = g.by;
      K.raw(ctx, () => { ctx.fillStyle = '#fda4af'; ctx.fillRect(64, fy - 30, w - 64, 30); ctx.fillStyle = '#fb7185'; ctx.fillRect(64, fy - 30, w - 64, 4); const fx = S.stance === 'one' ? [mx - 18 * 1.07] : [mx - 18 * 1.07, mx + 18 * 1.07]; const fw = S.stance === 'two' ? 50 : S.stance === 'toes' ? 16 : 11; fx.forEach(x => { ctx.fillStyle = '#e11d48'; ctx.beginPath(); ctx.moveTo(x - fw * 1.3 + 8, fy - 30); ctx.quadraticCurveTo(x + 8, fy - 30 + dep * 2, x + fw * 1.3 + 8, fy - 30); ctx.fill(); }); });
      C3.T(ctx, 'فرشة إسفنجية (تغوص أكثر كلما زاد الضغط)', mx + 60, fy + 20, { s: 11.5, c: '#fff', bg: '#9f1239' });
      C3.person(ctx, mx, fy - 30 + dep * .5, clamp(h * .5, 260, 380), S.stance, S.t);
      if (p.arrows) { C3.arrow(ctx, mx + 90, fy - 330, mx + 90, fy - 230, '#dc2626', 5); C3.T(ctx, 'الوزن 585 N', mx + 90, fy - 345, { s: 12, c: '#fff', bg: '#dc2626' }); const fx = S.stance === 'one' ? [mx - 19] : [mx - 19, mx + 19]; fx.forEach(x => { for (let k = -1; k <= 1; k++) C3.arrow(ctx, x + 8 + k * 8, fy - 28 + dep * .4, x + 8 + k * 8, fy - 24 + dep * .4 + Math.min(60, P * .9), '#f97316', 2.4); }); }
      // cards with book numbers
      const cx = 64 + (w - 64) * .74; let yy = 70;
      Object.entries(B2.stances).forEach(([k, s]) => { const on = k === S.stance; yy += C3.card(ctx, cx, yy, [s.n, `P = 585 / ${s.A} = ${fmt(585 / s.A, 4)} N/cm²`], { hi: 1, s: 13, bd: on ? '#dc2626' : '#cbd5e1', bg: on ? '#fff7ed' : 'rgba(255,255,255,.85)' }) + 10; });
      // three stance buttons
      [['two', 'على القدمين'], ['toes', 'على الأطراف'], ['one', 'طرف إصبع واحد']].forEach(([k, l], i) => C3.btn(ctx, cx, yy + 22 + i * 44, 170, 34, l, '#dc2626', S.stance === k));
      if (p.calc) { const A = st.A; C3.T(ctx, `مساحة التماس A = ${A} cm²`, cx, yy + 160, { s: 13, c: '#7c3aed', mono: 0 }); }
      C3.task(ctx, w, 'اسحب الشاب إلى الأعلى ليقف على أطراف أصابعه (أو اضغط الأزرار) ⬆', '#0f766e');
    } else if (v === 'sand') {
      const y1 = h * .5, y2 = h * .8; if (S.camX == null) { S.camX = 64 + 150; S.horX = 64 + 150; }
      K.raw(ctx, () => { const sg = ctx.createLinearGradient(0, h * .38, 0, h); sg.addColorStop(0, '#fde68a'); sg.addColorStop(1, '#d97706'); ctx.fillStyle = sg; ctx.fillRect(0, h * .38, w, h * .62); ctx.fillStyle = '#fef3c7'; ctx.fillRect(0, 0, w, h * .38); ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(w - 120, 90, 34, 0, TAU); ctx.fill(); });
      const cam = { W: 5000, A: 4 * 200 }, hor = { W: 4000, A: 4 * 60 }; const Pc = cam.W / cam.A, Ph = hor.W / hor.A; const dC = Pc * 1.6, dH = Ph * 1.6, sc = clamp(h / 700, .8, 1.25);
      const lane = (y, top) => K.raw(ctx, () => { const g2 = ctx.createLinearGradient(0, y - 6, 0, y + 40); g2.addColorStop(0, top ? '#fcd34d' : 'rgba(252,211,77,.97)'); g2.addColorStop(1, '#f59e0b'); ctx.fillStyle = g2; ctx.fillRect(0, y - (top ? 8 : -1), w, top ? 10 : 40); });
      lane(y1, 1); lane(y2, 1);
      C3.camel(ctx, S.camX, y1, sc, S.camX * .08, dC); lane(y1, 0);
      C3.horse(ctx, S.horX, y2, sc, S.horX * .09, dH); lane(y2, 0);
      S.prints.forEach(f => K.raw(ctx, () => { ctx.fillStyle = 'rgba(120,53,15,.65)'; ctx.beginPath(); ctx.ellipse(f.x, f.y, f.c ? 13 : 6, f.c ? 4 : 3, 0, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(69,26,3,.35)'; ctx.fillRect(f.x - (f.c ? 11 : 5), f.y + 1, f.c ? 22 : 10, f.d * .8); }));
      if (p.ruler) { C3.T(ctx, 'عمق الأثر ≈ ' + (Pc * .16).toFixed(1) + ' cm', S.camX, y1 + 30, { s: 11.5, c: '#fff', bg: '#7c3aed' }); C3.T(ctx, 'عمق الأثر ≈ ' + (Ph * .16).toFixed(1) + ' cm', S.horX, y2 + 40, { s: 11.5, c: '#fff', bg: '#7c3aed' }); }
      const cxc = w - 150; C3.card(ctx, cxc, h * .4 - 118, ['الجمل 🐪: الوزن 5000 N', 'مساحة الخفاف 800 cm²', `P = ${fmt(Pc, 3)} N/cm²`], { hi: 2, s: 12.5, bd: '#b45309' });
      C3.card(ctx, cxc, y2 - 250 + 70, ['الحصان 🐎: الوزن 4000 N', 'مساحة الحوافر 240 cm²', `P = ${Ph.toFixed(1)} N/cm²`], { hi: 2, s: 12.5, bd: '#7c2d12' });
      if (p.arrows) { C3.arrow(ctx, S.camX, y1 - 170, S.camX, y1 - 170 + 50, '#dc2626', 4); C3.arrow(ctx, S.horX, y2 - 140, S.horX, y2 - 140 + 40, '#dc2626', 4); }
      C3.task(ctx, w, 'اسحب الجمل والحصان ليمشيا على الرمل، وقارن عمق آثار أقدامهما 👣', '#b45309');
    } else {
      const nx = 64 + (w - 64) * .38, wy = g.by - 90, nl = 140, flip = S.nailFlip; const nIn = S.nailIn;
      K.box(ctx, nx - 162, g.by, 300, 90, 40, 'wood');
      const ntop = wy - nl + nIn;
      K.raw(ctx, () => { ctx.fillStyle = '#94a3b8'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5;
        if (!flip) { ctx.fillRect(nx - 3.5, ntop, 7, nl - 16); ctx.beginPath(); ctx.moveTo(nx - 3.5, ntop + nl - 16); ctx.lineTo(nx, ntop + nl); ctx.lineTo(nx + 3.5, ntop + nl - 16); ctx.fill(); rr(ctx, nx - 16, ntop - 6, 32, 7, 2); ctx.fill(); ctx.stroke(); }
        else { ctx.fillRect(nx - 3.5, ntop + 16, 7, nl - 16); ctx.beginPath(); ctx.moveTo(nx - 3.5, ntop + 16); ctx.lineTo(nx, ntop); ctx.lineTo(nx + 3.5, ntop + 16); ctx.fill(); rr(ctx, nx - 16, ntop + nl - 1, 32, 7, 2); ctx.fill(); ctx.stroke(); }
        ctx.globalAlpha = .62; const wg = ctx.createLinearGradient(0, wy, 0, g.by); wg.addColorStop(0, '#e8b77a'); wg.addColorStop(1, '#b7793f'); ctx.fillStyle = wg; ctx.fillRect(nx - 20, wy, 40, 88); ctx.globalAlpha = 1; ctx.strokeStyle = 'rgba(120,60,20,.6)'; ctx.setLineDash([4, 3]); ctx.strokeRect(nx - 20, wy, 40, 88); ctx.setLineDash([]); });
      if (nIn > 0) C3.T(ctx, 'مقطع: المسمار داخل الخشب', nx - 100, wy + 60, { s: 11, c: '#fff', bg: 'rgba(120,53,15,.85)' });
      const hy = ntop - (flip ? 0 : 6) + S.hamY; // hammer face y
      K.raw(ctx, () => { ctx.save(); ctx.translate(nx, hy); ctx.fillStyle = '#92400e'; rr(ctx, 10, -18, 170, 14, 6); ctx.fill(); ctx.fillStyle = '#475569'; rr(ctx, -26, -40, 52, 40, 6); ctx.fill(); ctx.fillStyle = '#94a3b8'; ctx.fillRect(-26, -8, 52, 8); ctx.restore(); });
      const A = flip ? 0.8 : 0.02, F = 200, P = F / A;
      if (p.arrows) { C3.arrow(ctx, nx - 60, hy - 60, nx - 60, hy - 10, '#dc2626', 4); C3.T(ctx, 'F = 200 N', nx - 60, hy - 74, { s: 12, c: '#fff', bg: '#dc2626', mono: 1 }); }
      if (p.calc) C3.card(ctx, 64 + (w - 64) * .78, 70, [flip ? 'الطرف العريض (الرأس) للأسفل' : 'الطرف الحاد للأسفل', `A = ${A} cm²`, `P = 200 / ${A} = ${fmt(P, 5)} N/cm²`], { hi: 2, s: 13 });
      C3.btn(ctx, 64 + (w - 64) * .78, 250, 190, 38, 'اقلب المسمار 🔄', '#7c3aed', false);
      C3.T(ctx, 'دخل في الخشب: ' + fmt(nIn / 10, 3) + ' cm', 64 + (w - 64) * .78, 300, { s: 13, c: '#fff', bg: '#92400e' });
      C3.task(ctx, w, 'اسحب المطرقة إلى الأسفل لتطرق المسمار ⬇ ثم اقلبه وقارن', '#0f766e');
    }
    K.party(ctx, S);
  },
  drags(S) {
    if (!S.W) return []; const g = B2.geo(S), v = S.p.view, w = S.W, h = S.H, L = [];
    if (v === 'clay') {
      B2.AR.forEach((A, i) => { if (i === S.act) return; const [x, y] = g.tray[i]; L.push({ id: 'disc' + A, x, y: y - B2.th(A) / 2 - 6, w: B2.dia(A) + 8, h: B2.th(A) + 20, tip: 'اضغط لوضع القرص على الطين', idle: i === 0 ? 'اضغط على القرص ✋' : undefined, hint: S.act < 0 && i === 0, click: S => { S.act = i; S.lastSpot = i; S.push = 0; } }); });
      if (S.act >= 0) { const A = B2.AR[S.act], x = g.spots[S.act], top = g.yc - B2.th(A) + S.dent[S.act] * g.px; L.push({ id: 'hand', x, y: top - 50, w: 70, h: 80, dir: Math.PI / 2, tip: 'اسحب اليد إلى الأسفل لتضغط على القرص', idle: 'اسحبني إلى الأسفل ⬇', down: S => { S.pressing = true; }, drag: (S, d) => { S.push = clamp(S.push + d.along, 0, 60); }, up: S => { S.pressing = false; } }); }
    } else if (v === 'feet') {
      const mx = 64 + (w - 64) * .3, cx = 64 + (w - 64) * .74; const order = ['two', 'toes', 'one'];
      L.push({ id: 'man', x: mx, y: g.by - 170, w: 120, h: 300, axis: 'y', tip: 'اسحب الشاب إلى الأعلى ليقف على أطراف أصابعه، أو إلى الأسفل ليقف على قدميه', idle: 'اسحبني إلى الأعلى ⬆',
        down: S => { S.stAcc = 0; }, drag: (S, d) => { S.stAcc += d.dy; const i = order.indexOf(S.stance); if (S.stAcc < -22 && i < 2) { S.stance = order[i + 1]; S.stAcc = 0; } if (S.stAcc > 22 && i > 0) { S.stance = order[i - 1]; S.stAcc = 0; } }, click: S => { S.stance = order[(order.indexOf(S.stance) + 1) % 3]; } });
      let yy = 70; Object.values(B2.stances).forEach(() => { yy += 2 * 22 + 14 + 10; });
      order.forEach((k, i) => L.push({ id: 'st_' + k, x: cx, y: yy + 22 + i * 44, w: 170, h: 34, hint: false, tip: 'اختر طريقة الوقوف', click: S => { S.stance = k; } }));
    } else if (v === 'sand') {
      const y1 = h * .5, y2 = h * .8; const cam = S.camX ?? 214, hor = S.horX ?? 214;
      const walk = (key, y, c) => (S, d) => { const nx = clamp(S[key] + d.dx, 64 + 80, w - 120); if (Math.floor(nx / 26) !== Math.floor(S[key] / 26)) { S.prints.push({ x: nx - 30, y: y + 3, c, d: c ? 5000 / 800 * 1.6 : 4000 / 240 * 1.6 }); if (S.prints.length > 60) S.prints.shift(); } S[key] = nx; };
      L.push({ id: 'camel', x: cam + 20, y: y1 - 80, w: 170, h: 150, axis: 'x', tip: 'اسحب الجمل ليمشي على الرمل', idle: 'اسحب الجمل ↔', drag: walk('camX', y1, 1) });
      L.push({ id: 'horse', x: hor + 20, y: y2 - 70, w: 160, h: 130, axis: 'x', tip: 'اسحب الحصان ليمشي على الرمل', drag: walk('horX', y2, 0) });
    } else {
      const nx = 64 + (w - 64) * .38, wy = g.by - 90, ntop = wy - 140 + S.nailIn, hy = ntop - (S.nailFlip ? 0 : 6) + S.hamY;
      L.push({ id: 'hammer', x: nx + 40, y: hy - 20, w: 190, h: 50, dir: Math.PI / 2, tip: 'اسحب المطرقة إلى الأسفل بسرعة لتطرق المسمار', idle: 'اسحبني إلى الأسفل ⬇',
        down: S => { S.dragH = true; }, drag: (S, d) => { const prev = S.hamY; S.hamY = clamp(S.hamY + d.dy, -150, 0); if (S.hamY >= 0 && prev < 0) { S.strikes++; S.nailIn = Math.min(120, S.nailIn + (S.nailFlip ? .6 : 16)); if (window.Sound) Sound.click(); S.hamY = -6; } }, up: S => { S.dragH = false; },
        click: S => { S.strikes++; S.nailIn = Math.min(120, S.nailIn + (S.nailFlip ? .6 : 16)); if (window.Sound) Sound.click(); } });
      const bx = 64 + (w - 64) * .78; L.push({ id: 'flip', x: bx, y: 250, w: 190, h: 38, hint: false, tip: 'اقلب المسمار', click: S => { S.nailFlip = !S.nailFlip; S.nailIn = 0; } });
      L.push({ id: 'nail', x: nx, y: ntop + 60, w: 30, h: 120, hint: false, tip: 'اضغط لقلب المسمار', click: S => { S.nailFlip = !S.nailFlip; S.nailIn = 0; } });
    }
    return L;
  },
  readings(S) {
    const v = S.p.view;
    if (v === 'clay') { if (S.act < 0) return [rd('القرص', '— اختر قرصاً')]; const A = B2.AR[S.act]; return [rd('مساحة القرص A', A + ' cm²'), rd('قراءة الميزان', fmt(S.F, 3) + ' kg'), rd('القوة F = m g', fmt(S.F * 9.8, 3) + ' N'), rd('الضغط P = F/A', fmt(S.F * 9.8 / A, 3) + ' N/cm²'), rd('عمق الأثر', fmt(S.dent[S.act], 2) + ' mm')]; }
    if (v === 'feet') { const s = B2.stances[S.stance]; return [rd('الوزن (القوة)', '585 N'), rd('مساحة التماس', s.A + ' cm²'), rd('الضغط', fmt(585 / s.A, 4) + ' N/cm²', 1)]; }
    if (v === 'sand') return [rd('ضغط الجمل', (5000 / 800).toFixed(1) + ' N/cm²'), rd('ضغط الحصان', (4000 / 240).toFixed(1) + ' N/cm²'), rd('من يغوص أكثر؟', 'الحصان — مساحة حوافره أصغر', 1)];
    const A = S.nailFlip ? .8 : .02; return [rd('القوة', '200 N'), rd('المساحة', A + ' cm²'), rd('الضغط', fmt(200 / A, 5) + ' N/cm²'), rd('دخل في الخشب', fmt(S.nailIn / 10, 3) + ' cm')];
  },
  record(S) { if (S.p.view !== 'clay' || S.lastSpot < 0 || S.dent[S.lastSpot] < .05) { Runner.toast('اضغط قرصاً في الطين أولاً (مشهد الأقراص)', 'info'); return null; } const i = S.lastSpot, A = B2.AR[i], F = S.Fmax[i]; if (S.rows.length === 3) K.cheer(S, S.W / 2, S.H * .3); return { A, F: +(F * 9.8).toFixed(0), P: +(F * 9.8 / A).toFixed(1), d: +S.dent[i].toFixed(1) }; },
  cols: [['A', 'المساحة (cm²)'], ['F', 'القوة (N)'], ['P', 'الضغط (N/cm²)'], ['d', 'العمق (mm)']],
  graph: { x: 'A', y: 'd', xl: 'المساحة A (cm²)', yl: 'العمق (mm)', xmin: 0, xmax: 18 },
  explain(S) {
    const v = S.p.view;
    if (v === 'clay') return S.act < 0 ? 'الأقراص <b>متساوية الكتلة</b> لكن مساحاتها مختلفة. ضع قرصاً على الطين واضغط بالقوة نفسها (30 kg).' : `القوة نفسها تتوزع على مساحة <b>${B2.AR[S.act]} cm²</b>. كلما <b>صغرت المساحة</b> كان نصيب كل 1 cm² من القوة أكبر ← <b>ضغط أكبر</b> وأثر أعمق.`;
    if (v === 'feet') return 'وزن الشاب ثابت (585 N)، لكن <b>مساحة التماس</b> تتغير، فيتغير الضغط: P = F / A.';
    if (v === 'sand') return 'الجمل أثقل من الحصان، لكن <b>خفه عريض</b> فيتوزع وزنه على مساحة كبيرة ← ضغط أقل فلا يغوص.';
    return 'الطرف الحاد للمسمار مساحته صغيرة جداً ← <b>ضغط كبير جداً</b> فيدخل الخشب بسهولة. الرأس العريض لا يدخل.';
  },
  quiz: [
    { q: 'قوة مقدارها 50 N أثرت في مساحة مقدارها 2 m². الضغط المسلط يساوي:', o: ['100 Pa', '25 Pa', '52 Pa'], a: 1, why: 'P = F / A = 50 ÷ 2 = 25 Pa (مراجعة الدرس ص 46).' },
    { q: 'ما الفائدة من وضع سرفة حول عجلات الدبابات وبعض المكائن الزراعية؟', o: ['زيادة الضغط على التربة', 'تقليل الضغط المسلط على التربة', 'زيادة سرعتها'], a: 1, why: 'السرفة تزيد مساحة التماس فيقل الضغط فلا تغوص في التربة.' },
    { q: 'لماذا تكون لإبرة المحقنة الطبية وإبرة الخياطة نهايات حادة؟', o: ['لتقليل المساحة فيزداد الضغط', 'لزيادة المساحة فيقل الضغط', 'لتقليل وزنها'], a: 0, why: 'بثبوت القوة: كلما صغرت المساحة ازداد الضغط.' }
  ]
});

/* =====================================================================
   3) نشاط: وزن عمود السائل يولد ضغطاً (ص 47–49) + مقياس الضغط + السد
   ===================================================================== */
const B3 = {
  LIQ: { water: { n: 'ماء', rho: 1000, c: '#38bdf8' }, oil: { n: 'نفط', rho: 800, c: '#d97706' }, salt: { n: 'ماء مالح', rho: 1200, c: '#0d9488' } },
  HOLES: [['a', 17, 1], ['b', 10, 1], ['c', 3, 1], ['d', 3, -1]],
  geoH(S) { const w = S.W, h = S.H, by = h * .86; const s = Math.min((w - 64 - 90) / 100, h * .6 / 52); const bw = 12 * s, bx = 64 + (w - 64) * .5 + 8, yl = by - 12, base = yl - 22 * s; return { w, h, by, s, bw, bx, yl, base, top: base - 26 * s }; },
  geoT(S) { const w = S.W, h = S.H, by = h * .84; const x0 = 64 + 30, x1 = 64 + (w - 64) * .56, top = h * .2, ys = top + 34, yb = by - 12; return { w, h, by, x0, x1, top, ys, yb, ppc: (yb - ys) / 50 }; },
  vel(H, z) { return H > z ? Math.sqrt(2 * 980 * (H - z)) : 0; },
  probeP(S, u, v) { return B3.LIQ[S.p.liq].rho * 9.8 * (v * .5); } // depth v*50 cm
};
X7({ id: 'g7_liquid_pressure', ch: 13, sec: 'الدرس 2', page: 49, kind: 'نشاط', title: 'نشاط: وزن عمود السائل يولد ضغطاً',
  desc: 'علبة بلاستيكية فيها ثقوب على ارتفاعات مختلفة (a، b، c) وثقب رابع (d) في الجانب الآخر: ننزع الشريط اللاصق فيندفع الماء. ثم نقيس الضغط داخل السائل بمجس، ونرى لماذا تكون قاعدة السد عريضة.',
  tags: 'ضغط السائل عمق كثافة ثقوب سد ضغط جانبي',
  tools: ['علبة من البلاستك فيها أربعة ثقوب', 'شريط لاصق', 'حوض بلاستك', 'ماء', 'مقياس ضغط (مجس)'],
  steps: ['في العلبة ثلاثة ثقوب على ارتفاعات مختلفة (a، b، c) وثقب رابع (d) في الجانب الآخر بمستوى الثقب c، والثقوب مسدودة بالشريط اللاصق.', 'اضغط على الشريط اللاصق الأيمن لنزعه بسرعة: قارن اندفاع الماء من الثقوب الثلاثة.', 'انزع الشريط الأيسر أيضاً: لماذا يكون اندفاع الماء من الثقب d مساوياً لاندفاعه من الثقب c؟', 'انتقل إلى مشهد «مقياس الضغط» واسحب المجسين إلى أعماق مختلفة، ثم إلى العمق نفسه. غيّر نوع السائل.', 'اضغط على المجس لتدير غشاءه: هل يتغير الضغط باتجاه الغشاء؟ (الضغط الجانبي).', 'في مشهد «السد» اسحب سطح الماء إلى الأعلى وراقب أسهم الضغط على جدار السد.'],
  concl: ['ضغط السائل الساكن = وزن عمود السائل ÷ مساحة القاعدة التي يقع عليها.', 'يزداد ضغط السائل بازدياد العمق (لذلك يندفع الماء أبعد من الثقب الأقرب إلى القاعدة).', 'يكون ضغط السائل متساوياً في جميع النقاط التي تقع في مستوى أفقي واحد (اندفاع d = اندفاع c).', 'يسلط السائل ضغطاً على جدران الإناء يسمى الضغط الجانبي، ويزداد الضغط بزيادة كثافة السائل.'],
  laws: ['g7_pliq'],
  fact: ['تصمم قاعدة السد أعرض وأسمك من قمته لتتحمل ضغط الماء الكبير عند قعره.', 'يمكن استخدام مياه السدود لتوليد الطاقة الكهربائية بتدفقها عبر التوربينات المتصلة بالمولدات.', 'في أعمق نقطة في المحيط (حوالي 11 km) يزيد ضغط الماء على ألف ضعف الضغط الجوي!'],
  controls: [
    SEL('view', 'المشهد', [['holes', 'العلبة المثقوبة'], ['probe', 'مقياس الضغط'], ['dam', 'السد']], 'holes'),
    SEL('liq', 'السائل', [['water', 'ماء'], ['oil', 'نفط'], ['salt', 'ماء مالح']], 'water'),
    TG('fill', 'الحنفية: إبقاء العلبة ممتلئة', true, null, 'eye'),
    BT('', [{ t: 'إعادة لصق الشريط وملء العلبة', on: S => { S.tapeR = true; S.tapeL = true; S.plug = { a: 1, b: 1, c: 1, d: 1 }; S.lev = 22; } }]),
    TG('press', 'أسهم ضغط السائل (الضغط الجانبي)', true, null, 'force'), TG('vel', 'سرعة اندفاع الماء', true, null, 'velocity'), TG('column', 'عمود السائل فوق النقطة', true, null, 'eye'), TG('labels', 'الأسماء والقيم', true, null, 'labels')],
  setup(S) { Object.assign(S, { plug: { a: 1, b: 1, c: 1, d: 1 }, lev: 22, tapeR: true, tapeL: true, aU: .3, aV: .35, bU: .75, bV: .7, aDir: 0, bDir: 0, damL: .55, wall: 'thick', crack: 0 }); S.drops = []; },
  update(S, dt) {
    const p = S.p;
    if (p.view === 'holes') { let q = 0; B3.HOLES.forEach(([n, z, sd]) => { const open = !S.plug[n]; if (open) q += B3.vel(S.lev, z); }); S.lev = Math.max(0, S.lev - q * .07 / 96 * dt * 6); if (p.fill) S.lev = Math.min(22, S.lev + dt * 6); }
    if (p.view === 'dam') { if (S.wall === 'thin' && S.damL > .72) S.crack = Math.min(1, S.crack + dt * .5); }
  },
  draw(ctx, w, h, S) {
    const p = S.p, L = B3.LIQ[p.liq];
    if (p.view === 'holes') {
      const g = B3.geoH(S); K.bg(ctx, w, h, { benchY: g.by }); const s = g.s;
      // basin
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(56,189,248,.35)'; ctx.fillRect(64 + 10, g.yl, w - 64 - 30, g.by - g.yl); ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(64 + 6, g.yl - 16); ctx.lineTo(64 + 10, g.by); ctx.lineTo(w - 20, g.by); ctx.lineTo(w - 16, g.yl - 16); ctx.stroke();
        ctx.fillStyle = '#64748b'; ctx.fillRect(g.bx - g.bw / 2 - 6, g.base, g.bw + 12, 8); ctx.fillStyle = '#94a3b8'; ctx.fillRect(g.bx - g.bw / 2 + 4, g.base + 8, 10, g.yl - g.base - 8); ctx.fillRect(g.bx + g.bw / 2 - 14, g.base + 8, 10, g.yl - g.base - 8); });
      C3.T(ctx, 'حوض بلاستك', 64 + 70, g.by - 6, { s: 11, c: '#fff', bg: '#0369a1' });
      // bottle and water
      const wtop = g.base - S.lev * s;
      C3.liquid(ctx, g.bx - g.bw / 2 + 2, wtop, g.bw - 4, g.base - wtop, L.c, .6);
      K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(g.bx - g.bw / 2, g.top); ctx.lineTo(g.bx - g.bw / 2, g.base); ctx.lineTo(g.bx + g.bw / 2, g.base); ctx.lineTo(g.bx + g.bw / 2, g.top); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(g.bx - g.bw / 2 + 5, g.top + 6, 4, g.base - g.top - 12); });
      if (p.fill) { K.raw(ctx, () => { ctx.fillStyle = '#94a3b8'; rr(ctx, g.bx - g.bw / 2 - 40, g.top - 44, 50, 14, 5); ctx.fill(); ctx.fillRect(g.bx - g.bw / 2 + 2, g.top - 44, 8, 22); ctx.strokeStyle = 'rgba(56,189,248,.8)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(g.bx - g.bw / 2 + 6, g.top - 22); ctx.lineTo(g.bx - g.bw / 2 + 6, wtop); ctx.stroke(); }); }
      // jets
      B3.HOLES.forEach(([n, z, sd]) => {
        const open = !S.plug[n], hx = g.bx + sd * g.bw / 2, hy = g.base - z * s, v = B3.vel(S.lev, z);
        if (open && v > 0) { const tl = Math.sqrt((z + 22) / 490); K.raw(ctx, () => { ctx.strokeStyle = L.c; ctx.globalAlpha = .75; ctx.lineWidth = 4; ctx.beginPath(); for (let k = 0; k <= 24; k++) { const t = tl * k / 24; ctx.lineTo(hx + sd * s * v * t, hy + s * 490 * t * t); } ctx.stroke(); ctx.globalAlpha = 1; ctx.fillStyle = shade(L.c, -30);
          for (let k = 0; k < 6; k++) { const t = tl * ((S.t * 1.8 + k / 6) % 1); ctx.beginPath(); ctx.arc(hx + sd * s * v * t, hy + s * 490 * t * t, 3, 0, TAU); ctx.fill(); }
          const R = sd * s * v * tl; ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(hx + R, g.yl, 6 + 3 * Math.sin(S.t * 12), Math.PI, TAU); ctx.stroke(); });
          if (p.labels) C3.T(ctx, n + ': ' + (v * tl).toFixed(1) + ' cm', clamp(hx + sd * s * v * tl, 110, w - 60), g.yl + 14 + (n === 'b' ? 20 : 0), { s: 10.5, c: '#fff', bg: 'rgba(3,105,161,.85)', mono: 1 }); }
        if (p.vel && open && v > 0) C3.arrow(ctx, hx + sd * 4, hy, hx + sd * (8 + v * .2), hy, '#16a34a', 3);
        K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(hx, hy, 3, 0, TAU); ctx.fill(); });
        if (p.labels) C3.T(ctx, n, hx + sd * 16, hy - 12, { s: 14, c: '#be123c', w: 900 });
      });
      // tapes
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(250,204,21,.9)'; ctx.strokeStyle = '#a16207'; ctx.lineWidth = 1;
        B3.HOLES.forEach(([n, z, sd], k) => { const hx = g.bx + sd * g.bw / 2, hy = g.base - z * s; if (S.plug[n]) { rr(ctx, hx - 7, hy - 9, 14, 18, 3); ctx.fill(); ctx.stroke(); } else { rr(ctx, g.bx + sd * (g.bw / 2 + 30 + k * 16), g.yl - 10, 12, 8, 2); ctx.fill(); } }); });
      // lateral pressure arrows
      if (p.press) { for (let z = 1; z < S.lev; z += 4) { const d = (S.lev - z), Lp = d * s * .2 * L.rho / 1000; const y = g.base - z * s; C3.arrow(ctx, g.bx + g.bw / 2 - 4 - Lp, y - 5, g.bx + g.bw / 2 - 4, y - 5, '#f97316', 2); C3.arrow(ctx, g.bx - g.bw / 2 + 4 + Lp, y - 5, g.bx - g.bw / 2 + 4, y - 5, '#f97316', 2); } for (let k = -1; k <= 1; k++) C3.arrow(ctx, g.bx + k * g.bw * .3, g.base - 10 - 1, g.bx + k * g.bw * .3, g.base - 2, '#f97316', 2); if (p.labels) C3.T(ctx, 'الضغط الجانبي يزداد مع العمق', g.bx - g.bw / 2 - 90, g.base - 26 * s + 40, { s: 11, c: '#fff', bg: '#ea580c' }); }
      if (false) { const y = g.base - 3 * s; K.raw(ctx, () => { ctx.fillStyle = 'rgba(124,58,237,.18)'; ctx.fillRect(g.bx + g.bw / 2 - 26, wtop, 20, y - wtop); ctx.strokeStyle = '#7c3aed'; ctx.setLineDash([4, 3]); ctx.strokeRect(g.bx + g.bw / 2 - 26, wtop, 20, y - wtop); ctx.setLineDash([]); }); }
      if (p.labels) { const ex = 64 + 120; let yy = 70; C3.card(ctx, ex + 20, yy, ['عمق الثقب تحت سطح الماء:', ...B3.HOLES.map(([n, z]) => `${n}: h = ${fmt(Math.max(0, S.lev - z), 3)} cm`)], { s: 12.5 }); }
      C3.task(ctx, w, (S.plug.a && S.plug.b && S.plug.c) ? 'اضغط على الشريط اللاصق الأصفر لتنزعه بسرعة ✋' : S.plug.d ? 'الأبعد اندفاعاً هو الأعمق (c). انزع الشريط الأيسر (d) وقارن' : 'd و c على العمق نفسه ← الضغط نفسه ← الاندفاع نفسه ✓', '#0f766e');
    } else if (p.view === 'probe') {
      const g = B3.geoT(S); K.bg(ctx, w, h, { benchY: g.by });
      C3.liquid(ctx, g.x0 + 2, g.ys, g.x1 - g.x0 - 4, g.yb - g.ys, L.c, .5);
      K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.x0, g.top); ctx.lineTo(g.x0, g.yb); ctx.lineTo(g.x1, g.yb); ctx.lineTo(g.x1, g.top); ctx.stroke(); ctx.fillStyle = '#334155'; ctx.font = '700 10px monospace'; ctx.textAlign = 'right'; for (let c = 0; c <= 50; c += 10) { const y = g.ys + c * g.ppc; ctx.fillRect(g.x1 - 12, y, 12, 1.5); ctx.fillText(c + ' cm', g.x1 - 14, y + 3); } });
      C3.T(ctx, 'العمق', g.x1 - 30, g.ys - 14, { s: 11, c: '#334155' });
      const probes = [['a', S.aU, S.aV, S.aDir, '#dc2626'], ['b', S.bU, S.bV, S.bDir, '#2563eb']];
      probes.forEach(([k, u, v, dir, col], i) => {
        const x = g.x0 + 20 + u * (g.x1 - g.x0 - 40), y = g.ys + v * (g.yb - g.ys), P = B3.probeP(S, u, v);
        const ux = 64 + (w - 64) * (.7 + i * .16), uy = g.by - 60, Hm = 200, dh = P / 5000 * 90;
        K.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.bezierCurveTo(x, g.top - 40, ux - 12, g.top - 60, ux - 12, uy - Hm); ctx.stroke();
          // U-tube manometer
          ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.strokeRect(ux - 18, uy - Hm, 12, Hm); ctx.strokeRect(ux + 6, uy - Hm, 12, Hm); ctx.strokeRect(ux - 18, uy - 2, 36, 12);
          ctx.fillStyle = 'rgba(22,163,74,.75)'; const m = uy - Hm * .45; ctx.fillRect(ux - 17, m + dh, 10, uy - m - dh); ctx.fillRect(ux + 7, m - dh, 10, uy - m + dh); ctx.fillRect(ux - 17, uy - 1, 34, 10);
          ctx.strokeStyle = '#7c3aed'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(ux - 26, m + dh); ctx.lineTo(ux + 26, m + dh); ctx.moveTo(ux - 26, m - dh); ctx.lineTo(ux + 26, m - dh); ctx.stroke(); ctx.setLineDash([]); });
        C3.T(ctx, Math.round(P) + ' Pa', ux, uy + 30, { s: 13, c: '#fff', bg: col, mono: 1 }); C3.T(ctx, 'مانوميتر ' + k.toUpperCase(), ux, uy - Hm - 16, { s: 11.5, c: col });
        if (p.column && i === 0) K.raw(ctx, () => { ctx.fillStyle = 'rgba(124,58,237,.18)'; ctx.fillRect(x - 16, g.ys, 32, y - g.ys); ctx.strokeStyle = '#7c3aed'; ctx.setLineDash([4, 3]); ctx.strokeRect(x - 16, g.ys, 32, y - g.ys); ctx.setLineDash([]); });
        if (p.press) for (let k2 = 0; k2 < 8; k2++) { const a = k2 * Math.PI / 4, Lp = 8 + P / 5000 * 30; C3.arrow(ctx, x + Math.cos(a) * (16 + Lp), y + Math.sin(a) * (16 + Lp), x + Math.cos(a) * 15, y + Math.sin(a) * 15, '#f97316', 2); }
        K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(dir * Math.PI / 2); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(0, 0, 12, Math.PI * .5, Math.PI * 1.5); ctx.fill(); ctx.fillStyle = '#fef3c7'; ctx.fillRect(-2, -12, 5, 24); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1; ctx.strokeRect(-2, -12, 5, 24); ctx.restore(); });
        if (p.labels) C3.T(ctx, `${k.toUpperCase()}: h = ${(v * 50).toFixed(1)} cm`, x, y - 28, { s: 11.5, c: '#fff', bg: col, mono: 1 });
      });
      if (p.column) C3.T(ctx, 'عمود السائل فوق المجس A', g.x0 + 20 + S.aU * (g.x1 - g.x0 - 40), g.ys - 16, { s: 11, c: '#fff', bg: '#7c3aed' });
      const Pa = B3.probeP(S, S.aU, S.aV), Pb = B3.probeP(S, S.bU, S.bV), same = Math.abs(S.aV - S.bV) < .005;
      C3.card(ctx, (g.x0 + g.x1) / 2, g.by + 8, [`P(A) = ρ g h = ${L.rho} × 9.8 × ${(S.aV * .5).toFixed(3)} = ${Math.round(Pa)} Pa`], { s: 12.5, bd: '#dc2626' });
      C3.task(ctx, w, same ? 'المجسان على العمق نفسه ← الضغط متساوٍ ✓ (مستوى أفقي واحد)' : 'اسحب المجسين إلى أعماق مختلفة، ثم ضعهما على العمق نفسه', same ? '#7c3aed' : '#0f766e');
      if (same && !S._same) { S._same = true; K.cheer(S, (g.x0 + g.x1) / 2, g.ys + 40); } if (!same) S._same = false; void Pb;
    } else {
      K.bg(ctx, w, h, { benchY: h * .86, tiles: false, top: '#bae6fd', bottom: '#e0f2fe' }); const by = h * .86, dx = 64 + (w - 64) * .55, Hd = h * .6, top = by - Hd; const thin = S.wall === 'thin';
      const wl = by - S.damL * Hd;
      K.raw(ctx, () => { ctx.fillStyle = '#a3e635'; ctx.fillRect(dx, by - 20, w - dx, 20); ctx.fillStyle = 'rgba(56,189,248,.5)'; ctx.fillRect(dx + 150, by - 26, w - dx - 150, 8); const lg = ctx.createLinearGradient(0, wl, 0, by); lg.addColorStop(0, L.c); lg.addColorStop(1, shade(L.c, -60)); ctx.fillStyle = lg; ctx.globalAlpha = .75; ctx.fillRect(64, wl, dx - 64, by - wl); ctx.globalAlpha = 1;
        ctx.fillStyle = '#9ca3af'; ctx.strokeStyle = '#374151'; ctx.lineWidth = 2; ctx.beginPath(); if (thin) { ctx.rect(dx, top, 22, Hd); } else { ctx.moveTo(dx, top); ctx.lineTo(dx + 34, top); ctx.lineTo(dx + 170, by); ctx.lineTo(dx, by); ctx.closePath(); } ctx.fill(); ctx.stroke();
        ctx.strokeStyle = 'rgba(55,65,81,.35)'; ctx.lineWidth = 1; for (let y = top + 20; y < by; y += 22) { ctx.beginPath(); ctx.moveTo(dx, y); ctx.lineTo(dx + (thin ? 22 : 34 + (y - top) / Hd * 136), y); ctx.stroke(); }
        if (S.crack > 0) { ctx.strokeStyle = '#111827'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(dx, by - 40); ctx.lineTo(dx + 8, by - 60 - 20 * S.crack); ctx.lineTo(dx + 14, by - 50); ctx.lineTo(dx + 22, by - 80 * S.crack); ctx.stroke(); ctx.strokeStyle = L.c; ctx.lineWidth = 6 * S.crack; ctx.beginPath(); ctx.moveTo(dx + 22, by - 45); ctx.quadraticCurveTo(dx + 80, by - 45, dx + 120, by - 18); ctx.stroke(); } });
      if (p.press) for (let y = wl + 18; y < by - 4; y += 24) { const d = (y - wl) / Hd; const Lp = d * 120; C3.arrow(ctx, dx - 6 - Lp, y, dx - 3, y, '#f97316', 3); }
      if (p.labels) { C3.T(ctx, thin ? 'جدار رفيع' : 'قاعدة السد عريضة وسميكة', dx + 70, by + 16, { s: 12, c: '#fff', bg: '#374151' }); C3.T(ctx, 'ضغط الماء على السد يزداد مع العمق', (64 + dx) / 2, wl - 40 > 60 ? wl - 20 : 80, { s: 12.5, c: '#fff', bg: '#ea580c' }); }
      C3.btn(ctx, w - 110, 80, 170, 34, 'سد عريض من الأسفل', '#374151', !thin); C3.btn(ctx, w - 110, 122, 170, 34, 'جدار رفيع', '#b91c1c', thin);
      if (S.crack > .2) K.bubble(ctx, 'الجدار الرفيع تشقق! الضغط عند القعر كبير', dx + 40, by - 120, { s: 13, bg: '#fee2e2', bd: '#dc2626', c: '#991b1b' });
      C3.task(ctx, w, 'اسحب سطح الماء خلف السد إلى الأعلى ⬆ وراقب أسهم الضغط', '#0f766e');
    }
    K.party(ctx, S);
  },
  drags(S) {
    if (!S.W) return []; const p = S.p, w = S.W, h = S.H, L = [];
    if (p.view === 'holes') {
      const g = B3.geoH(S), s = g.s;
      B3.HOLES.forEach(([n, z, sd], k) => L.push({ id: 'plug_' + n, x: g.bx + sd * g.bw / 2, y: g.base - z * s, w: 22, h: 24, hint: k === 0, idle: k === 0 ? 'انزع سدادة الثقب a ✋' : undefined, tip: S.plug[n] ? 'اضغط لنزع سدادة الثقب ' + n : 'اضغط لسد الثقب ' + n, click: S => { S.plug[n] = S.plug[n] ? 0 : 1; } }));

      L.push({ id: 'tap', x: g.bx - g.bw / 2 - 15, y: g.top - 37, w: 60, h: 26, hint: false, tip: 'الحنفية: تشغيل / إيقاف', click: S => setParam(S, 'fill', !S.p.fill) });
    } else if (p.view === 'probe') {
      const g = B3.geoT(S);
      [['a', 'aU', 'aV', 'aDir'], ['b', 'bU', 'bV', 'bDir']].forEach(([k, ku, kv, kd], i) => { const x = g.x0 + 20 + S[ku] * (g.x1 - g.x0 - 40), y = g.ys + S[kv] * (g.yb - g.ys);
        L.push({ id: 'probe' + k, x, y, r: 20, axis: 'xy', tip: 'اسحب المجس إلى أي عمق — اضغط عليه لتدير غشاءه', idle: i === 0 ? 'اسحب المجس ✋' : undefined, hint: i === 0,
          drag: (S, d) => { S[ku] = clamp((d.ox + d.x - d.sx - g.x0 - 20) / (g.x1 - g.x0 - 40), 0, 1); S[kv] = Math.round(clamp((d.oy + d.y - d.sy - g.ys) / (g.yb - g.ys), .02, 1) * 100) / 100; }, click: S => { S[kd] = (S[kd] + 1) % 4; } }); });
    } else {
      const by = h * .86, Hd = h * .6, dx = 64 + (w - 64) * .55, wl = by - S.damL * Hd;
      L.push({ id: 'level', x: (64 + dx) / 2, y: wl, w: dx - 100, h: 26, axis: 'y', tip: 'اسحب سطح الماء خلف السد', idle: 'اسحب سطح الماء ⬆', drag: (S, d) => { S.damL = clamp((by - (d.oy + d.y - d.sy)) / Hd, .1, .97); } });
      L.push({ id: 'thick', x: w - 110, y: 80, w: 170, h: 34, hint: false, tip: 'سد عريض من الأسفل', click: S => { S.wall = 'thick'; S.crack = 0; } });
      L.push({ id: 'thin', x: w - 110, y: 122, w: 170, h: 34, hint: false, tip: 'جدار رفيع', click: S => { S.wall = 'thin'; S.crack = 0; } });
    }
    return L;
  },
  readings(S) {
    const p = S.p, L = B3.LIQ[p.liq];
    if (p.view === 'holes') return B3.HOLES.map(([n, z, sd]) => rd('سرعة الاندفاع من ' + n, !S.plug[n] ? (B3.vel(S.lev, z) / 100).toFixed(2) + ' m/s' : 'مسدود')).concat([rd('ارتفاع الماء', fmt(S.lev, 3) + ' cm')]);
    if (p.view === 'probe') return [rd('كثافة ' + L.n, L.rho + ' kg/m³'), rd('عمق المجس A', (S.aV * 50).toFixed(1) + ' cm'), rd('الضغط عند A', Math.round(B3.probeP(S, S.aU, S.aV)) + ' Pa'), rd('عمق المجس B', (S.bV * 50).toFixed(1) + ' cm'), rd('الضغط عند B', Math.round(B3.probeP(S, S.bU, S.bV)) + ' Pa')];
    const Hd = 40; return [rd('عمق الماء خلف السد', fmt(S.damL * Hd, 3) + ' m'), rd('الضغط عند القعر', fmt(L.rho * 9.8 * S.damL * Hd / 1000, 4) + ' kPa'), rd('الجدار', S.wall === 'thin' ? 'رفيع' : 'عريض من الأسفل')];
  },
  record(S) { if (S.p.view !== 'probe') { Runner.toast('انتقل إلى مشهد «مقياس الضغط» لتسجيل القراءات', 'info'); return null; } const L = B3.LIQ[S.p.liq]; return { liq: L.n, h: +(S.aV * 50).toFixed(1), P: Math.round(B3.probeP(S, S.aU, S.aV)) }; },
  cols: [['liq', 'السائل'], ['h', 'العمق h (cm)'], ['P', 'الضغط (Pa)']],
  graph: { x: 'h', y: 'P', xl: 'العمق h (cm)', yl: 'الضغط (Pa)', xmin: 0, xmax: 52 },
  explain(S) {
    const p = S.p;
    if (p.view === 'holes') return (S.plug.a && S.plug.b && S.plug.c && S.plug.d) ? 'الماء في العلبة ساكن ويضغط على جدرانها. انزع الشريط لترى!' : 'كلما كان الثقب <b>أعمق</b> تحت سطح الماء كان <b>وزن عمود الماء فوقه أكبر</b> ← ضغط أكبر ← يندفع الماء بسرعة أكبر. الثقبان <b>c</b> و<b>d</b> على العمق نفسه فيندفع الماء منهما بالمقدار نفسه.';
    if (p.view === 'probe') return 'ضغط السائل عند المجس = <b>وزن عمود السائل فوقه ÷ مساحة القاعدة</b>. يزداد بزيادة <b>العمق</b> وبزيادة <b>كثافة السائل</b>، ويكون متساوياً في جميع الاتجاهات عند النقطة نفسها.';
    return 'ضغط الماء يزداد بزيادة العمق، لذلك <b>تُصمم قاعدة السد عريضة وسميكة</b> لتتحمل الضغط الكبير عند القعر، ويقل سمكها نحو القمة.';
  },
  quiz: [
    { q: 'ضغط سائل في نقطة منه 640 Pa وفي نقطة ثانية 800 Pa. ما سبب الاختلاف؟', o: ['النقطة الثانية أعمق في السائل', 'النقطة الثانية أقرب إلى السطح', 'اختلاف شكل الإناء'], a: 0, why: 'ضغط السائل يزداد بزيادة العمق (مراجعة الدرس ص 51).' },
    { q: 'عند نقطتين على عمق متساوٍ في خزانين من النفط والماء، يكون ضغط الماء أكبر لأن:', o: ['كثافة الماء أكبر من كثافة النفط', 'حجم الماء أكبر', 'كثافة النفط أكبر'], a: 0, why: 'بثبوت العمق يزداد ضغط السائل بزيادة كثافته.' },
    { q: 'لماذا تُصمم قاعدة السد أعرض وأسمك من قمته؟', o: ['لأن ضغط الماء يزداد بزيادة العمق', 'لأن ضغط الماء أكبر عند السطح', 'لتجميل شكله'], a: 0, why: 'لتتحمل ضغط المياه الكبير عند قعره والأقل عند أعلاه.' }
  ]
});

/* =====================================================================
   4) الأواني المستطرقة (ص 48)
   ===================================================================== */
const B4 = {
  SH: [
    { n: 'أنبوب مستقيم', w: y => 28, off: y => 0 },
    { n: 'مخروطي', w: y => 22 + 74 * y, off: y => 0 },
    { n: 'منتفخ', w: y => 26 + 60 * Math.pow(Math.sin(Math.PI * y), 1.2), off: y => 0 },
    { n: 'دورق', w: y => 94 - 68 * y, off: y => 0 },
    { n: 'مائل', w: y => 26, off: y => .2 * y }
  ],
  geo(S) {
    const w = S.W, h = S.H, by = h * .84, Hv = clamp(h * .46, 220, 380), y0 = by - 60, x0 = 64 + 60, x1 = w - 120, sc = clamp((w - 64) / 760, .72, 1.2);
    const xs = B4.SH.map((s, i) => x0 + (x1 - x0) * (i + .5) / 5);
    const key = [Hv, sc].join(); if (!B4._c || B4._k !== key) { B4._k = key; B4._c = B4.SH.map(s => { const c = [0]; for (let k = 1; k <= Math.ceil(Hv); k++) c.push(c[k - 1] + s.w((k - .5) / Hv) * sc); return c; }); }
    return { w, h, by, Hv, y0, x0, x1, sc, xs, cum: B4._c };
  },
  vol(g, i, lv) { const c = g.cum[i], k = Math.floor(lv); if (k >= c.length - 1) return c[c.length - 1]; return c[k] + (c[k + 1] - c[k]) * (lv - k); },
  lev(g, i, V) { const c = g.cum[i]; if (V <= 0) return 0; if (V >= c[c.length - 1]) return c.length - 1; let a = 0, b = c.length - 1; while (b - a > 1) { const m = (a + b) >> 1; if (c[m] < V) a = m; else b = m; } return a + (V - c[a]) / Math.max(1e-6, c[b] - c[a]); },
  edge(g, i, yy, side) { const s = B4.SH[i], y = yy / g.Hv; return g.xs[i] + s.off(y) * g.Hv + side * s.w(y) * g.sc / 2; }
};
X7({ id: 'g7_vessels', ch: 13, sec: 'الدرس 2', page: 48, kind: 'تطبيق', title: 'الأواني المستطرقة',
  desc: 'أوانٍ مختلفة الأشكال مفتوحة من الأعلى ومتصلة من الأسفل: صُبّ الماء في أي منها وراقب سطح الماء فيها جميعاً.',
  tags: 'أواني مستطرقة ضغط السائل مستوى أفقي',
  tools: ['مجموعة أوانٍ مستطرقة مختلفة الأشكال', 'إبريق ماء', 'حنفية لتفريغ الماء'],
  steps: ['اسحب إبريق الماء فوق فوهة أي إناء (مثلاً الإناء العريض) واتركه يصب.', 'راقب كيف ينتقل الماء عبر الأنبوب السفلي إلى الأواني الأخرى.', 'بعد أن يستقر الماء: هل ارتفع سطح الماء إلى المستوى الأفقي نفسه في كل الأواني؟', 'فعّل «ضغط الماء على القواعد»: قارن الضغط على قاعدة الإناء الضيق والإناء العريض والمائل.', 'صُبّ في إناء آخر، أو افتح الحنفية لتفريغ جزء من الماء، وراقب من جديد.'],
  concl: ['عند ملء الأواني المستطرقة بالماء يرتفع سطح الماء إلى المستوى الأفقي نفسه في كل الأواني.', 'ضغط الماء على قواعد الأواني المختلفة متساوٍ رغم اختلاف أشكالها.', 'ضغط السائل لا يعتمد على شكل الإناء وحجمه، بل على عمق السائل وكثافته.'],
  laws: ['g7_pliq'],
  fact: ['خزان الماء على سطح البيت والحنفيات في الطابق الأرضي تعمل كأوانٍ مستطرقة.', 'إبريق الشاي: سطح الشاي في الفوهة الجانبية وفي الإبريق بالمستوى نفسه، لذلك تُصنع الفوهة بارتفاع الإبريق.', 'يستعمل البنّاؤون خرطوماً شفافاً مملوءاً بالماء (ميزان الماء) لتحديد المستوى الأفقي.'],
  controls: [
    BT('', [{ t: 'تفريغ الأواني', on: S => { S.lv = [8, 8, 8, 8, 8]; S.pour = -1; S._eq = false; } }]),
    TG('level', 'خط المستوى الأفقي', true, null, 'eye'), TG('press', 'ضغط الماء على القواعد', true, null, 'force'), TG('labels', 'الأسماء والقيم', true, null, 'labels')],
  setup(S) { Object.assign(S, { jx: null, jy: null, dragJ: false, pour: -1, drain: false, _eq: false, poured: 0 }); S.lv = [30, 30, 30, 30, 30]; },
  update(S, dt) {
    if (!S.W) return; const g = B4.geo(S); dt = Math.min(dt, .05);
    const V = S.lv.map((l, i) => B4.vol(g, i, l));
    if (S.pour >= 0 && !S.dragJ) { V[S.pour] += 6500 * g.sc * dt; S.poured += dt; }
    if (S.drain) V[4] = Math.max(0, V[4] - 2000 * dt);
    const n = 6; for (let s = 0; s < n; s++) { const lv = V.map((v, i) => B4.lev(g, i, v)); for (let i = 0; i < 4; i++) { const q = 260 * (lv[i] - lv[i + 1]) * dt / n; V[i] -= q; V[i + 1] += q; } }
    S.lv = V.map((v, i) => Math.min(g.Hv - 2, B4.lev(g, i, v)));
    const mx = Math.max(...S.lv), mn = Math.min(...S.lv); S.eq = mx - mn < 2.5;
    if (S.eq && S.poured > 1.5 && S.pour < 0 && !S._eq) { S._eq = true; K.cheer(S, S.W / 2, g.y0 - mx - 30); }
    if (!S.eq) S._eq = false;
  },
  draw(ctx, w, h, S) {
    const p = S.p, g = B4.geo(S); K.bg(ctx, w, h, { benchY: g.by });
    if (S.jx == null) { S.jx = w - 110; S.jy = 120; }
    // stand
    K.raw(ctx, () => { ctx.fillStyle = '#a16207'; rr(ctx, g.x0 - 40, g.by - 20, g.x1 - g.x0 + 90, 20, 6); ctx.fill(); ctx.fillStyle = '#ca8a04'; ctx.fillRect(g.x0 - 30, g.y0 + 22, 14, g.by - g.y0 - 40); ctx.fillRect(g.x1 + 20, g.y0 + 22, 14, g.by - g.y0 - 40); });
    // base tube (always full)
    const tx0 = g.xs[0] - 40, tx1 = g.xs[4] + 70, ty = g.y0;
    K.raw(ctx, () => { ctx.fillStyle = 'rgba(56,189,248,.6)'; ctx.fillRect(tx0, ty, tx1 - tx0, 24); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(tx0, ty); ctx.lineTo(tx0, ty + 24); ctx.lineTo(tx1, ty + 24); ctx.moveTo(tx0, ty); ctx.lineTo(g.xs[0] - 14 * g.sc, ty); ctx.stroke();
      // tap
      ctx.fillStyle = S.drain ? '#16a34a' : '#dc2626'; ctx.fillRect(tx1, ty + 4, 20, 16); ctx.fillStyle = '#334155'; rr(ctx, tx1 + 4, ty - 14, 12, 18, 3); ctx.fill(); ctx.save(); ctx.translate(tx1 + 10, ty - 14); ctx.rotate(S.drain ? Math.PI / 2 : 0); ctx.fillStyle = '#f59e0b'; rr(ctx, -16, -5, 32, 10, 4); ctx.fill(); ctx.restore();
      if (S.drain) { ctx.strokeStyle = 'rgba(56,189,248,.8)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(tx1 + 20, ty + 12); ctx.quadraticCurveTo(tx1 + 34, ty + 14, tx1 + 36, g.by - 20); ctx.stroke(); } });
    // vessels
    B4.SH.forEach((s, i) => {
      const lv = S.lv[i];
      K.raw(ctx, () => {
        // water
        ctx.beginPath(); for (let k = 0; k <= 30; k++) { const yy = lv * k / 30; ctx.lineTo(B4.edge(g, i, yy, -1), g.y0 - yy); } for (let k = 30; k >= 0; k--) { const yy = lv * k / 30; ctx.lineTo(B4.edge(g, i, yy, 1), g.y0 - yy); } ctx.closePath();
        const lg = ctx.createLinearGradient(0, g.y0 - lv, 0, g.y0); lg.addColorStop(0, 'rgba(56,189,248,.55)'); lg.addColorStop(1, 'rgba(2,132,199,.7)'); ctx.fillStyle = lg; ctx.fill();
        ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(B4.edge(g, i, lv, -1), g.y0 - lv); ctx.lineTo(B4.edge(g, i, lv, 1), g.y0 - lv); ctx.stroke();
        // glass
        ctx.strokeStyle = '#475569'; ctx.lineWidth = 2.4; [-1, 1].forEach(sd => { ctx.beginPath(); for (let k = 0; k <= 40; k++) { const yy = g.Hv * k / 40; ctx.lineTo(B4.edge(g, i, yy, sd), g.y0 - yy); } ctx.stroke(); });
        ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(B4.edge(g, i, g.Hv * .5, -1) + 5, g.y0 - g.Hv * .8, 4, g.Hv * .5);
        // cover the tube top inside the vessel mouth join
        ctx.fillStyle = 'rgba(56,189,248,.6)'; ctx.fillRect(B4.edge(g, i, 0, -1) + 1, g.y0 - 1, s.w(0) * g.sc - 2, 3);
      });
      if (p.labels) C3.T(ctx, s.n, g.xs[i] + s.off(0) * g.Hv, g.by + 12, { s: 11.5, c: '#fff', bg: 'rgba(30,41,59,.85)' });
      if (p.press) { const Pv = 1000 * 9.8 * lv / g.Hv * .3; C3.arrow(ctx, g.xs[i], g.y0 - 30, g.xs[i], g.y0 - 30 + 8 + lv * .16, '#f97316', 3.5); if (p.labels) C3.T(ctx, Math.round(Pv) + ' Pa', g.xs[i], g.y0 + 38, { s: 11, c: '#fff', bg: '#ea580c', mono: 1 }); }
    });
    // level line
    const avg = S.lv.reduce((a, b) => a + b, 0) / 5;
    if (p.level) K.raw(ctx, () => { ctx.strokeStyle = S.eq ? '#7c3aed' : 'rgba(124,58,237,.45)'; ctx.lineWidth = 2; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.moveTo(g.x0 - 50, g.y0 - avg); ctx.lineTo(g.x1 + 40, g.y0 - avg); ctx.stroke(); ctx.setLineDash([]); });
    if (p.level && S.eq && p.labels) C3.T(ctx, 'المستوى الأفقي نفسه ✓', g.x0 + 10, g.y0 - avg - 16, { s: 12, c: '#fff', bg: '#7c3aed' });
    // jug
    const pouring = S.pour >= 0 && !S.dragJ;
    if (pouring) { const i = S.pour, mx = g.xs[i] + B4.SH[i].off(1) * g.Hv; K.raw(ctx, () => { ctx.strokeStyle = 'rgba(56,189,248,.8)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(S.jx - 48, S.jy + 4); ctx.quadraticCurveTo(mx, S.jy, mx, g.y0 - g.Hv); ctx.lineTo(mx, g.y0 - S.lv[i]); ctx.stroke(); }); }
    B1.kettle(ctx, S.jx, S.jy, pouring ? -.55 : 0, '#0ea5e9', S.t, 'إبريق ماء');
    C3.task(ctx, w, pouring ? 'الماء ينتقل عبر الأنبوب السفلي إلى كل الأواني…' : S.eq && S.poured > 1 ? 'سطح الماء في المستوى الأفقي نفسه في كل الأواني ✓' : 'اسحب الإبريق فوق فوهة أي إناء ليصب الماء ✋', S.eq && S.poured > 1 && !pouring ? '#7c3aed' : '#0f766e');
    K.party(ctx, S);
  },
  drags(S) {
    if (!S.W || S.jx == null) return []; const g = B4.geo(S); const tx1 = g.xs[4] + 70;
    return [
      { id: 'jug', x: S.jx, y: S.jy, w: 96, h: 84, axis: 'xy', tip: 'اسحب الإبريق فوق فوهة إناء ليصب الماء', idle: 'اسحبني فوق إناء ✋',
        down: S => { S.dragJ = true; }, drag: (S, d) => { S.jx = clamp(d.ox + d.x - d.sx, 110, S.W - 50); S.jy = clamp(d.oy + d.y - d.sy, 60, g.by - 60); },
        up: S => { S.dragJ = false; S.pour = -1; let best = -1, bd = 1e9; B4.SH.forEach((s, i) => { const mx = g.xs[i] + s.off(1) * g.Hv, dd = Math.hypot(S.jx - 48 - mx, S.jy - (g.y0 - g.Hv - 50)); if (dd < bd) { bd = dd; best = i; } }); if (bd < 110) { const mx = g.xs[best] + B4.SH[best].off(1) * g.Hv; S.jx = mx + 50; S.jy = g.y0 - g.Hv - 52; S.pour = best; S.poured = 0; } } },
      { id: 'tap', x: tx1 + 10, y: g.y0 - 8, w: 40, h: 40, hint: false, tip: 'الحنفية: فتح / غلق لتفريغ الماء', click: S => { S.drain = !S.drain; } },
      { id: 'stop', x: S.jx, y: S.jy - 60, r: 1, hint: false, click: S => { S.pour = -1; } }
    ].filter(o => o.id !== 'stop' || S.pour >= 0);
  },
  readings(S) { if (!S.W) return []; const g = B4.geo(S); const avg = S.lv.reduce((a, b) => a + b, 0) / 5, cm = avg / g.Hv * 30; return [rd('ارتفاع الماء (متوسط)', cm.toFixed(1) + ' cm'), rd('الفرق بين أعلى وأدنى سطح', ((Math.max(...S.lv) - Math.min(...S.lv)) / g.Hv * 30).toFixed(1) + ' cm'), rd('الضغط على كل قاعدة', Math.round(1000 * 9.8 * cm / 100) + ' Pa'), rd('الحنفية', S.drain ? 'مفتوحة' : 'مغلقة')]; },
  explain(S) { return S.pour >= 0 ? 'الماء في الإناء الذي نصب فيه <b>أعلى</b>، فضغطه عند الأسفل أكبر، لذلك يندفع الماء عبر الأنبوب السفلي إلى الأواني الأخرى حتى <b>يتساوى الضغط</b>.' : 'عندما يستقر الماء يكون <b>الضغط متساوياً</b> عند القواعد جميعها، وهذا يحدث فقط عندما يكون <b>سطح الماء في المستوى الأفقي نفسه</b> — مهما كان شكل الإناء أو حجمه أو ميله.'; },
  quiz: [
    { q: 'عند ملء أوانٍ مستطرقة مختلفة الأشكال بالماء، يكون سطح الماء فيها:', o: ['أعلى في الإناء الضيق', 'في المستوى الأفقي نفسه', 'أعلى في الإناء العريض'], a: 1, why: 'ص 48: يرتفع سطح الماء إلى المستوى الأفقي نفسه في كل الأوعية.' },
    { q: 'الضغط على قاعدة إناء مملوء بسائل لا يعتمد على:', o: ['كثافة السائل', 'ارتفاع السائل', 'مساحة سطح السائل (شكل الإناء)'], a: 2, why: 'مراجعة الفصل: ضغط السائل لا يعتمد على شكل الإناء وحجمه.' },
    { q: 'ضغط الماء على قواعد الأواني المستطرقة المختلفة الأشكال يكون:', o: ['متساوياً', 'أكبر في الإناء العريض', 'أكبر في الإناء المائل'], a: 0, why: 'لأن عمق الماء فوق كل قاعدة هو نفسه.' }
  ]
});

/* =====================================================================
   5) ما العوامل التي يعتمد عليها ضغط الغاز؟ (ص 49)
   ===================================================================== */
const B5 = {
  OBJ: { tyre: { n: 'إطار دراجة', N0: 1.0, k: .1 }, ball: { n: 'كرة قدم', N0: 1.3, k: .06 }, balloon: { n: 'بالون', N0: .35, k: .05 } },
  geo(S) { const w = S.W, h = S.H, by = h * .84, lr = clamp(Math.min((w - 64) * .22, h * .25), 80, 180), lx = 64 + (w - 64) * .64, ly = h * .43, ox = 64 + (w - 64) * .3, oy = h * .5; return { w, h, by, lr, lx, ly, ox, oy, pxp: 64 + 44, tx: Math.min(w - 44, lx + lr + 60) }; },
  state(S) { const o = S.p.obj, Tr = (S.p.T + 273) / 293, NT = S.N * Tr; let V; if (o === 'tyre') V = NT < 1 ? .6 + .4 * NT : 1; else if (o === 'ball') V = clamp(Math.pow(NT / 1.3, .35), .6, 1.3); else V = Math.pow(NT, .82); return { V, P: NT / V, Tr }; },
  rad(S, g) { const st = B5.state(S), o = S.p.obj; if (o === 'balloon') return 44 * Math.sqrt(st.V) * clamp(g.h / 700, .8, 1.3); const R = clamp(g.h * .16, 80, 125); return o === 'ball' ? R * .75 * Math.cbrt(st.V) : R; }
};
X7({ id: 'g7_gas_pressure', ch: 13, sec: 'الدرس 2', page: 49, kind: 'تطبيق', title: 'ما العوامل التي يعتمد عليها ضغط الغاز؟',
  desc: 'نضخ الهواء في إطار الدراجة (أو البالون) بالمنفاخ، ونسخّن الهواء أو نبرّده، ونراقب جزيئات الهواء واصطداماتها بالجدار من خلال عدسة مكبرة.',
  tags: 'ضغط الغاز جزيئات تصادم منفاخ إطار بالون حرارة',
  tools: ['منفاخ هوائي', 'إطار دراجة / كرة قدم / بالون', 'مقياس ضغط', 'ميزان حرارة'],
  steps: ['انظر داخل العدسة المكبرة: جزيئات الهواء تتحرك باستمرار في جميع الاتجاهات وتصطدم بالجدار.', 'اسحب ذراع المنفاخ إلى الأسفل عدة مرات لتدفع هواءً إلى داخل الإطار. راقب عدد الجزيئات وعدد الاصطدامات والضغط.', 'اسحب ميزان الحرارة إلى الأعلى (صيف ☀️): ماذا يحدث لسرعة الجزيئات وللضغط؟ ثم إلى الأسفل (شتاء ❄️).', 'اختر «كرة قدم» وبرّدها: لماذا تنكمش الكرة المملوءة بالهواء شتاءً؟', 'اختر «بالون» وانفخه: كلما زادت كمية الهواء زاد الضغط وازداد حجم البالون. احذر أن ينفجر!', 'اضغط على صمام الإطار لإخراج بعض الهواء.'],
  concl: ['ضغط الغاز هو الضغط الذي تسلطه جزيئات الغاز نتيجة اصطدامها فيما بينها وبجدران الإناء.', 'عند إضافة كمية أخرى من الهواء يزداد عدد الجزيئات فتزداد الاصطدامات ويزداد الضغط.', 'عند ثبوت كمية الغاز يزداد ضغطه بزيادة درجة حرارته، لأن سرعة الجزيئات وتصادماتها تزداد.'],
  laws: [],
  fact: ['تنفجر بعض إطارات العجلات صيفاً في أثناء حركتها، لأن الحرارة تزيد ضغط الهواء داخلها.', 'تنكمش كرة القدم المملوءة بالهواء شتاءً لأن الهواء داخلها يبرد فيقل ضغطه.', 'يُفضّل تخزين البخاخات والأوعية التي فيها غاز في أماكن باردة وفي الظل.'],
  controls: [
    SEL('obj', 'الجسم', [['tyre', 'إطار دراجة'], ['ball', 'كرة قدم'], ['balloon', 'بالون']], 'tyre', (v, S) => { S.N = B5.OBJ[v].N0; S.burst = 0; S.leak = false; }),
    R('T', 'درجة حرارة الهواء', -10, 60, 20, 1, '°C'),
    BT('', [{ t: '❄️ شتاء (0°C)', on: S => setParam(S, 'T', 0) }, { t: '☀️ صيف (50°C)', on: S => setParam(S, 'T', 50) }, { t: 'جسم جديد', on: S => { S.N = B5.OBJ[S.p.obj].N0; S.burst = 0; S.leak = false; } }]),
    TG('mol', 'جزيئات الهواء (العدسة المكبرة)', true, null, 'atom'), TG('hits', 'ومضات الاصطدام بالجدار', true, null, 'dot'), TG('press', 'أسهم ضغط الغاز', true, null, 'force'), TG('labels', 'الأسماء والقيم', true, null, 'labels')],
  setup(S) { Object.assign(S, { N: B5.OBJ[S.p.obj || 'tyre'].N0, pump: 0, dragP: false, leak: false, burst: 0, hits: 0, rate: 0, _hc: 0, _ht: 0, dragT: false }); S.mol = []; S.sparks = []; S.frag = []; },
  update(S, dt) {
    if (!S.W) return; dt = Math.min(dt, .05); const g = B5.geo(S), o = S.p.obj;
    if (!S.dragP) S.pump = Math.max(0, S.pump - dt * 2.5);
    if (S.leak) { S.N = Math.max(o === 'balloon' ? .3 : .5, S.N - dt * .5); if (B5.state(S).P < 1.05) S.leak = false; }
    const st = B5.state(S);
    if (!S.burst && ((o === 'tyre' && st.P > 4.6) || (o === 'ball' && st.P > 2.6) || (o === 'balloon' && st.V > 3.4))) { S.burst = 1; S.N = o === 'balloon' ? 0 : .45; if (window.Sound) Sound.pop(); S.frag = Array.from({ length: 16 }, () => ({ a: Math.random() * TAU, v: 120 + Math.random() * 160, t: 0 })); }
    if (S.burst) { S.burst += dt; S.frag.forEach(f => f.t += dt); }
    // molecules in the lens
    const target = S.burst && o === 'balloon' ? 0 : Math.round(clamp(40 * S.N / st.V, 0, 180)), R = g.lr - 7, sp = 110 * Math.sqrt(st.Tr);
    const fresh = S.mol.length === 0; while (S.mol.length < target) { if (fresh) { const r = R * Math.sqrt(Math.random()), a = Math.random() * TAU, b = Math.random() * TAU; S.mol.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, vx: Math.cos(b), vy: Math.sin(b) }); } else { const a = Math.PI + (Math.random() - .5) * .5, b = (Math.random() - .5) * 2; S.mol.push({ x: Math.cos(a) * (R - 3), y: Math.sin(a) * (R - 3), vx: Math.cos(b), vy: Math.sin(b) }); } }
    if (S.mol.length > target) S.mol.length = target;
    S.mol.forEach(m => { const k = sp / Math.max(1e-3, Math.hypot(m.vx, m.vy)); m.vx *= k; m.vy *= k; m.x += m.vx * dt; m.y += m.vy * dt; const r = Math.hypot(m.x, m.y); if (r > R) { const nx = m.x / r, ny = m.y / r, dot = m.vx * nx + m.vy * ny; if (dot > 0) { m.vx -= 2 * dot * nx; m.vy -= 2 * dot * ny; S._hc++; if (S.sparks.length < 40) S.sparks.push({ x: nx * (R + 5), y: ny * (R + 5), t: 0 }); } m.x = nx * R; m.y = ny * R; } });
    S.sparks.forEach(s => s.t += dt); S.sparks = S.sparks.filter(s => s.t < .18);
    S._ht += dt; if (S._ht > .5) { S.rate = Math.round(S.rate * .4 + S._hc / S._ht * .6); S._hc = 0; S._ht = 0; }
  },
  draw(ctx, w, h, S) {
    const p = S.p, g = B5.geo(S), o = p.obj, st = B5.state(S); K.bg(ctx, w, h, { benchY: g.by, top: p.T > 35 ? '#fef3c7' : p.T < 5 ? '#e0f2fe' : '#e0f2fe' });
    if (p.T > 35) K.raw(ctx, () => { ctx.fillStyle = 'rgba(251,191,36,.9)'; ctx.beginPath(); ctx.arc(w - 150, 70, 26, 0, TAU); ctx.fill(); });
    if (p.T < 5) K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.95)'; for (let k = 0; k < 18; k++) { const x = (k * 97 + S.t * 20) % (w - 64) + 64, y = (k * 53 + S.t * 40) % (g.by - 20); ctx.beginPath(); ctx.arc(x, y, 2.5, 0, TAU); ctx.fill(); } });
    const R = B5.rad(S, g);
    // pump (left)
    const px = g.pxp, pb = g.by, bh = clamp(h * .32, 170, 240), hy = pb - bh - 30 + S.pump * (bh * .55);
    K.raw(ctx, () => { ctx.fillStyle = '#334155'; rr(ctx, px - 34, pb - 12, 68, 12, 4); ctx.fill(); ctx.fillStyle = '#2563eb'; rr(ctx, px - 14, pb - bh, 28, bh - 10, 6); ctx.fill(); ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillStyle = '#94a3b8'; ctx.fillRect(px - 3, hy, 6, pb - bh - hy + 4); ctx.fillStyle = '#111827'; rr(ctx, px - 40, hy - 10, 80, 14, 7); ctx.fill();
      // hose to object
      const vx = g.ox, vy = o === 'balloon' ? g.oy + R * 1.18 + 8 : g.oy - R + 2; ctx.strokeStyle = '#111827'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(px + 14, pb - 30); if (o === 'balloon') ctx.bezierCurveTo(px + 90, pb - 20, vx, pb - 20, vx, vy); else ctx.bezierCurveTo(px + 70, pb - 30, vx - R - 60, vy - 70, vx, vy - 4); ctx.stroke(); });
    if (p.labels) C3.T(ctx, 'منفاخ', px, pb + 14, { s: 12, c: '#fff', bg: '#1e3a8a' });
    // object
    const burst = S.burst > 0;
    K.raw(ctx, () => {
      ctx.save(); ctx.translate(g.ox, g.oy);
      if (o === 'tyre') { const soft = clamp(1.6 - st.P, 0, .6), th = 16; ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 2; for (let k = 0; k < 16; k++) { const a = k * TAU / 16; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * (R - th - 4), Math.sin(a) * (R - th - 4)); ctx.stroke(); }
        ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, 0, R - th - 2, 0, TAU); ctx.stroke(); ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.arc(0, 0, 10, 0, TAU); ctx.fill();
        ctx.strokeStyle = burst ? '#57534e' : '#1f2937'; ctx.lineWidth = th * 1.6; ctx.beginPath(); ctx.ellipse(0, soft * 18, R - th / 2 + soft * 10, R - th / 2 - soft * 18, 0, 0, TAU); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.15)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, R - 4, -2.4, -1.2); ctx.stroke();
        ctx.fillStyle = '#facc15'; ctx.fillRect(-4, -R + 2, 8, 16); }
      else if (o === 'ball') { if (!burst) { const gg = ctx.createRadialGradient(-R * .3, -R * .3, 4, 0, 0, R); gg.addColorStop(0, '#fff'); gg.addColorStop(1, '#cbd5e1'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ctx.fill(); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#0f172a'; const pent = (cx, cy, r) => { ctx.beginPath(); for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * TAU / 5; ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } ctx.closePath(); ctx.fill(); }; pent(0, 0, R * .28); [0, 1, 2, 3, 4].forEach(k => { const a = -Math.PI / 2 + k * TAU / 5; pent(Math.cos(a) * R * .78, Math.sin(a) * R * .78, R * .18); }); } else { ctx.fillStyle = '#e5e7eb'; ctx.beginPath(); ctx.ellipse(0, R * .5, R * 1.1, R * .45, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#0f172a'; ctx.stroke(); } }
      else { if (!burst) { const gg = ctx.createRadialGradient(-R * .3, -R * .4, 4, 0, 0, R * 1.2); gg.addColorStop(0, '#fecaca'); gg.addColorStop(1, '#dc2626'); ctx.fillStyle = gg; ctx.beginPath(); ctx.ellipse(0, 0, R, R * 1.18, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#b91c1c'; ctx.beginPath(); ctx.moveTo(-6, R * 1.18 + 8); ctx.lineTo(6, R * 1.18 + 8); ctx.lineTo(0, R * 1.18 - 2); ctx.fill(); } }
      if (burst && S.burst < 1.2) { S.frag.forEach(f => { ctx.fillStyle = o === 'balloon' ? '#dc2626' : '#374151'; ctx.save(); ctx.translate(Math.cos(f.a) * (R + f.v * f.t), Math.sin(f.a) * (R + f.v * f.t)); ctx.rotate(f.t * 9); ctx.fillRect(-6, -3, 12, 6); ctx.restore(); }); }
      ctx.restore();
    });
    if (burst && S.burst < 2.5) K.bubble(ctx, 'بوم! 💥 انفجر! الضغط أكبر مما يتحمله', g.ox, g.oy - R - 20, { s: 14, bg: '#fee2e2', bd: '#dc2626', c: '#991b1b' });
    if (p.press && !burst) { const n = 10, Lp = clamp(st.P * 12, 4, 60); for (let k = 0; k < n; k++) { const a = k * TAU / n + .3; const rx = o === 'balloon' ? R : R * .72, ry = o === 'balloon' ? R * 1.18 : R * .72; C3.arrow(ctx, g.ox + Math.cos(a) * (rx - Lp - 4), g.oy + Math.sin(a) * (ry - Lp - 4), g.ox + Math.cos(a) * (rx - 4), g.oy + Math.sin(a) * (ry - 4), '#f97316', 2.6); } }
    if (p.labels) C3.T(ctx, B5.OBJ[o].n, g.ox, g.oy + (o === 'balloon' ? R * 1.18 + 40 : R + 22), { s: 12.5, c: '#fff', bg: '#334155' });
    // callout lines to lens
    K.raw(ctx, () => { ctx.strokeStyle = 'rgba(71,85,105,.45)'; ctx.lineWidth = 1.5; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.moveTo(g.ox + R * .5, g.oy - R * .3); ctx.lineTo(g.lx - g.lr * .7, g.ly - g.lr * .7); ctx.moveTo(g.ox + R * .5, g.oy + R * .1); ctx.lineTo(g.lx - g.lr * .7, g.ly + g.lr * .7); ctx.stroke(); ctx.setLineDash([]); });
    // lens with molecules
    K.lens(ctx, g.lx, g.ly, g.lr, () => { ctx.fillStyle = S.p.T > 35 ? '#fff7ed' : S.p.T < 5 ? '#eff6ff' : '#f8fafc'; ctx.fillRect(g.lx - g.lr, g.ly - g.lr, 2 * g.lr, 2 * g.lr);
      if (p.mol) S.mol.forEach(m => { const c = S.p.T > 35 ? '#ef4444' : S.p.T < 5 ? '#3b82f6' : '#8b5cf6'; K.ball(ctx, g.lx + m.x, g.ly + m.y, 5, c); });
      if (p.hits) S.sparks.forEach(s => { ctx.fillStyle = `rgba(250,204,21,${1 - s.t / .18})`; ctx.beginPath(); ctx.arc(g.lx + s.x, g.ly + s.y, 7, 0, TAU); ctx.fill(); }); });
    if (p.labels) C3.T(ctx, 'داخل ' + B5.OBJ[o].n + ' (مكبّر)', g.lx, g.ly - g.lr - 16, { s: 12, c: '#fff', bg: '#475569' });
    // counters
    C3.card(ctx, g.lx, g.ly + g.lr + 16, [`عدد الجزيئات في العدسة: ${S.mol.length}`, `الاصطدامات بالجدار: ${S.rate} في الثانية`], { s: 12.5, bd: '#f59e0b' });
    // gauge on the pump
    C3.gauge(ctx, px + 96, 120, 50, st.P * 101.3, 0, 500, 'مقياس الضغط', 'kPa', { txt: Math.round(st.P * 101.3) + ' kPa', mark: 101.3 });
    // thermometer (draggable)
    K.thermo(ctx, g.tx, g.by - 40, clamp(h * .5, 240, 360), p.T, -10, 60, { step: 10 });
    C3.T(ctx, p.T > 35 ? 'صيف ☀️' : p.T < 5 ? 'شتاء ❄️' : 'معتدل', g.tx, g.by - 12, { s: 12, c: '#fff', bg: p.T > 35 ? '#ea580c' : p.T < 5 ? '#2563eb' : '#16a34a' });
    C3.task(ctx, w, burst ? 'اضغط «جسم جديد» (أو على الجسم) لتجرب مرة أخرى' : 'اسحب ذراع المنفاخ إلى الأسفل ⬇ … ثم اسحب ميزان الحرارة ⬆⬇', burst ? '#b91c1c' : '#0f766e');
    K.party(ctx, S);
  },
  drags(S) {
    if (!S.W) return []; const g = B5.geo(S), h = S.H, o = S.p.obj, R = B5.rad(S, g), bh = clamp(h * .32, 170, 240), hy = g.by - bh - 30 + S.pump * (bh * .55), th = clamp(h * .5, 240, 360);
    const Ty = g.by - 40 - 14 - (th - 26) * (S.p.T + 10) / 70;
    return [
      { id: 'pump', x: g.pxp, y: hy - 3, w: 90, h: 30, dir: Math.PI / 2, tip: 'اسحب ذراع المنفاخ إلى الأسفل لتدفع الهواء', idle: 'اسحبني إلى الأسفل ⬇',
        down: S => { S.dragP = true; }, drag: (S, d) => { const np = clamp(S.pump + d.along / (bh * .55), 0, 1); if (np > S.pump && !S.burst) { S.N += (np - S.pump) * B5.OBJ[S.p.obj].k * 2.2; S.leak = false; } S.pump = np; }, up: S => { S.dragP = false; } },
      { id: 'thermo', x: g.tx, y: Ty, w: 36, h: 40, axis: 'y', tip: 'اسحب ميزان الحرارة لتسخين الهواء أو تبريده', hint: false, drag: (S, d) => { setParam(S, 'T', Math.round(-10 + 70 * (g.by - 54 - (d.oy + d.y - d.sy)) / (th - 26))); } },
      { id: 'obj', x: g.ox, y: g.oy, r: Math.max(40, R * .8), hint: false, tip: S.burst ? 'اضغط لإحضار جسم جديد' : 'اضغط على الصمام لإخراج بعض الهواء', click: S => { if (S.burst) { S.N = B5.OBJ[S.p.obj].N0; S.burst = 0; } else S.leak = !S.leak; } }
    ];
  },
  readings(S) { const st = B5.state(S); return [rd('كمية الهواء (نسبية)', fmt(S.N, 3)), rd('درجة الحرارة', S.p.T + ' °C'), rd('الضغط', Math.round(st.P * 101.3) + ' kPa'), rd('الاصطدامات / ثانية', String(S.rate)), rd('الحجم (نسبي)', fmt(st.V, 3))]; },
  record(S) { const st = B5.state(S); return { obj: B5.OBJ[S.p.obj].n, N: +S.N.toFixed(2), T: S.p.T, P: Math.round(st.P * 101.3), hits: S.rate }; },
  cols: [['obj', 'الجسم'], ['N', 'كمية الهواء'], ['T', 'الحرارة (°C)'], ['P', 'الضغط (kPa)'], ['hits', 'اصطدامات/ث']],
  explain(S) { const st = B5.state(S); if (S.burst) return 'ازداد الضغط داخل الجسم أكثر مما تتحمله جدرانه فانفجر! لهذا تنفجر بعض الإطارات صيفاً.'; return `جزيئات الهواء تصطدم بالجدار <b>${S.rate}</b> مرة في الثانية (في العدسة). المزيد من الجزيئات (نفخ) أو جزيئات أسرع (تسخين) ← <b>اصطدامات أكثر وأقوى</b> ← <b>ضغط أكبر</b>${S.p.obj !== 'tyre' ? '، فيزداد حجم ' + B5.OBJ[S.p.obj].n : ''}.`; },
  quiz: [
    { q: 'ما سبب انفجار بعض إطارات العجلات صيفاً في أثناء حركتها؟', o: ['تقل سرعة جزيئات الهواء داخلها', 'ترتفع الحرارة فتزداد سرعة الجزيئات وتصادماتها فيزداد الضغط', 'يقل عدد الجزيئات داخلها'], a: 1, why: 'عند ثبوت كمية الغاز يزداد ضغطه بزيادة درجة حرارته.' },
    { q: 'لماذا تنكمش كرة القدم المملوءة بالهواء شتاءً؟', o: ['لأن الهواء داخلها يبرد فتبطؤ جزيئاته ويقل ضغطه', 'لأن الهواء يخرج منها', 'لأن جلدها يتمدد'], a: 0, why: 'التبريد يقلل سرعة الجزيئات وتصادماتها فيقل الضغط.' },
    { q: 'ما العوامل التي يعتمد عليها ضغط الغاز؟', o: ['لون الغاز فقط', 'كمية الغاز (عدد جزيئاته) ودرجة حرارته', 'شكل الإناء فقط'], a: 1, why: 'إضافة هواء يزيد عدد الجزيئات، والتسخين يزيد سرعتها — كلاهما يزيد الضغط.' }
  ]
});

/* =====================================================================
   6) الضغط الجوي (ص 50): الجبل، قصبة الشرب
   ===================================================================== */
const B6 = {
  P: alt => 101.325 * Math.exp(-alt / 8400),
  geoM(S) { const w = S.W, h = S.H, by = h * .88, xb = 64 + 40, px = 64 + (w - 64) * .5, py = h * .15; return { w, h, by, xb, px, py }; },
  geoS(S) { const w = S.W, h = S.H, by = h * .84, pc = clamp(h / 42, 12, 19), gx = 64 + (w - 64) * .4, gw = 9 * pc, gh = 14 * pc; return { w, h, by, pc, gx, gw, gh, gtop: by - gh, stx: gx + gw * .18, stTop: by - 23 * pc }; }
};
X7({ id: 'g7_atm', ch: 13, sec: 'الدرس 2', page: 50, kind: 'تطبيق', title: 'الضغط الجوي: تسلّق الجبل والشرب بالقصبة',
  desc: 'الغلاف الجوي له وزن، ووزن عمود الهواء يسبب الضغط الجوي. تسلّق جبلاً وراقب الضغط والتنفس، ثم اشرب العصير بقصبة لترى كيف يدفعه الضغط الجوي.',
  tags: 'ضغط جوي غلاف جوي ارتفاع جبل قصبة شرب atm mmHg',
  tools: ['مقياس الضغط الجوي (باروميتر زئبقي)', 'كأس عصير', 'قصبة شرب'],
  steps: ['في مشهد «الجبل» اسحب المتسلق إلى أعلى الجبل ببطء. راقب الباروميتر وعمود الهواء فوق المتسلق.', 'لماذا يقل الضغط كلما ارتفعنا؟ ولماذا يجد المتسلق صعوبة في التنفس عند القمة؟', 'انتقل إلى مشهد «قصبة الشرب». اضغط مع الاستمرار على فم الطفل (أو اسحب إلى الأعلى) لسحب الهواء من القصبة.', 'راقب: الضغط داخل القصبة يقل، والضغط الجوي على سطح العصير يدفعه إلى الأعلى.', 'اختر «كأس بغطاء محكم» وحاول الشرب! ثم اضغط على الغطاء لتثقبه وحاول مرة أخرى.'],
  concl: ['الغلاف الجوي طبقة من الغازات تجذبها الأرض، فيكون له وزن، والضغط الذي يسببه وزنه يسمى الضغط الجوي.', 'عند مستوى سطح البحر: 1 atm = 101325 Pa = 760 mmHg.', 'يقل الضغط الجوي كلما ارتفعنا لأن عمود الهواء فوقنا يصبح أقصر وأقل وزناً.', 'عند الشرب بالقصبة يقل الضغط داخلها، فيدفع الضغط الجوي العصير إلى الأعلى (من الضغط العالي إلى الضغط المنخفض).'],
  laws: ['g7_atm'],
  fact: ['على قمة إيفرست (8848 m) يكون الضغط الجوي نحو ثلث قيمته عند سطح البحر.', 'لا نشعر بالضغط الجوي لأن في أجسامنا ضغطاً داخلياً يكافئه.', 'يسحب الفيل الماء بخرطومه كما نشرب بالقصبة: يوسّع رئتيه فيقل الضغط داخل الخرطوم فيدفع الضغط الجوي الماء إلى الداخل.'],
  controls: [
    SEL('view', 'المشهد', [['mountain', 'الجبل'], ['straw', 'قصبة الشرب']], 'mountain'),
    SEL('lid', 'الكأس', [['open', 'كأس مفتوح'], ['sealed', 'كأس بغطاء محكم']], 'open', (v, S) => { S.hole = false; S.rise = 0; }),
    BT('', [{ t: 'ملء الكأس من جديد', on: S => { S.juice = .7; S.rise = 0; } }]),
    TG('air', 'جزيئات الهواء', true, null, 'atom'), TG('column', 'عمود الهواء فوق المتسلق', true, null, 'eye'), TG('arrows', 'أسهم الضغط', true, null, 'force'), TG('labels', 'الأسماء والقيم', true, null, 'labels')],
  setup(S) { Object.assign(S, { alt: 0, suck: 0, sucking: false, rise: 0, juice: .7, hole: false, sip: 0, breath: 0 }); S.air = Array.from({ length: 190 }, () => { const z = -8400 * Math.log(1 - Math.random() * .78); return { u: Math.random(), z, ph: Math.random() * TAU }; }); },
  update(S, dt) {
    dt = Math.min(dt, .05); S.breath += dt * (1 + 2.5 * (1 - B6.P(S.alt) / 101.325)) * 1.3;
    S.suck = S.sucking ? Math.min(1, S.suck + dt * 1.4) : Math.max(0, S.suck - dt * 1.8);
    const dP = S.suck * 3000, sealed = S.p.lid === 'sealed' && !S.hole; const heq = dP / (1050 * 9.8) * 100 / (sealed ? 22 : 1); // cm
    S.rise += (heq - S.rise) * (1 - Math.exp(-dt * 4));
    if (S.W) { const g = B6.geoS(S); const above = (g.stTop - (g.by - S.juice * g.gh)) / g.pc; if (S.rise >= above - .3 && S.suck > .5 && S.juice > .08) { S.juice = Math.max(.06, S.juice - dt * .03); S.sip += dt; } }
  },
  draw(ctx, w, h, S) {
    const p = S.p;
    if (p.view === 'mountain') {
      const g = B6.geoM(S); K.bg(ctx, w, h, { benchY: g.by, tiles: false, top: '#1e40af', bottom: '#bae6fd', bench: false });
      K.raw(ctx, () => { ctx.fillStyle = '#38bdf8'; ctx.fillRect(0, g.by, w, h - g.by); });
      const yOf = z => g.by - z / 8848 * (g.by - g.py);
      if (p.air) S.air.forEach(a => { const y = yOf(a.z); if (y < 4) return; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.beginPath(); ctx.arc(64 + a.u * (w - 64) + Math.sin(S.t * 2 + a.ph) * 3, y + Math.cos(S.t * 2.3 + a.ph) * 3, 3, 0, TAU); ctx.fill(); }); });
      // mountain
      K.raw(ctx, () => { const mg = ctx.createLinearGradient(0, g.py, 0, g.by); mg.addColorStop(0, '#78716c'); mg.addColorStop(1, '#365314'); ctx.fillStyle = mg; ctx.beginPath(); ctx.moveTo(g.xb, g.by); ctx.lineTo(g.px, g.py); ctx.lineTo(g.px + 60, g.py + 50); ctx.lineTo(g.px + 110, g.py + 30); ctx.lineTo(64 + (w - 64) * .95, g.by); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.moveTo(g.px - (g.px - g.xb) * .18, g.py + (g.by - g.py) * .18); ctx.lineTo(g.px, g.py); ctx.lineTo(g.px + 60, g.py + 50); ctx.lineTo(g.px + 30, g.py + 70); ctx.lineTo(g.px - 10, g.py + 50); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#e2e8f0'; ctx.font = '700 11px monospace'; ctx.textAlign = 'left'; for (let z = 0; z <= 8000; z += 2000) { const y = yOf(z); ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.fillRect(64 + 4, y, 14, 2); ctx.fillText(z + ' m', 64 + 22, y + 4); } });
      // climber
      const a = S.alt / 8848, cx = lerp(g.xb, g.px, a), cy = lerp(g.by, g.py, a);
      if (p.column) K.raw(ctx, () => { ctx.fillStyle = 'rgba(250,204,21,.22)'; ctx.fillRect(cx - 18, 0, 36, cy - 40); ctx.strokeStyle = '#facc15'; ctx.setLineDash([5, 4]); ctx.lineWidth = 2; ctx.strokeRect(cx - 18, 0, 36, cy - 40); ctx.setLineDash([]); });
      if (p.column && p.labels) C3.T(ctx, 'عمود الهواء فوقه', cx + 70, Math.max(150, (cy - 40) * .75), { s: 12, c: '#0f172a', bg: '#fde047' });
      if (p.arrows) C3.arrow(ctx, cx, cy - 110, cx, cy - 110 + 16 + 44 * B6.P(S.alt) / 101.3, '#dc2626', 5);
      K.raw(ctx, () => { ctx.save(); ctx.translate(cx + 7, cy + 3); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -18); ctx.lineTo(-7, -2); ctx.moveTo(0, -18); ctx.lineTo(8, -4); ctx.moveTo(0, -18); ctx.lineTo(0, -36); ctx.lineTo(12, -28); ctx.stroke(); ctx.fillStyle = '#dc2626'; rr(ctx, -12, -38, 12, 18, 4); ctx.fill(); ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(2, -44, 7, 0, TAU); ctx.fill(); ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(2, -47, 7, Math.PI, TAU); ctx.fill(); ctx.restore(); });
      const br = (Math.sin(S.breath * TAU) + 1) / 2; K.raw(ctx, () => { ctx.fillStyle = `rgba(255,255,255,${.7 * br})`; ctx.beginPath(); ctx.arc(cx + 16 + br * 8, cy - 44, 4 + br * 4, 0, TAU); ctx.fill(); });
      if (S.alt > 5000) K.bubble(ctx, 'أتنفس بصعوبة! 😮‍💨', cx + 10, cy - 60, { s: 13 });
      // barometer panel
      const P = B6.P(S.alt), mm = P / 101.325 * 760, bx = w - 70, btop = 90, bh = clamp(h * .5, 260, 380), ybot = btop + bh;
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, bx - 56, btop - 40, 112, bh + 158, 12); ctx.fill(); ctx.fillStyle = '#e2e8f0'; ctx.fillRect(bx - 8, btop, 16, bh); const hm = mm / 800 * (bh - 10); ctx.fillStyle = '#94a3b8'; ctx.fillRect(bx - 6, ybot - hm, 12, hm); ctx.fillStyle = '#64748b'; rr(ctx, bx - 26, ybot - 6, 52, 22, 6); ctx.fill();
        ctx.fillStyle = '#334155'; ctx.font = '700 9px monospace'; ctx.textAlign = 'right'; for (let v = 0; v <= 800; v += 100) { const y = ybot - v / 800 * (bh - 10); ctx.fillRect(bx - 16, y, 7, 1.2); ctx.fillText(v, bx - 18, y + 3); } ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx - 10, ybot - hm); ctx.lineTo(bx + 30, ybot - hm); ctx.stroke(); });
      C3.T(ctx, 'باروميتر', bx, btop - 22, { s: 12, c: '#334155' }); C3.T(ctx, Math.round(mm) + ' mmHg', bx, ybot + 30, { s: 12.5, c: '#fff', bg: '#dc2626', mono: 1 }); C3.T(ctx, (P * 1000).toFixed(0) + ' Pa', bx, ybot + 54, { s: 11.5, c: '#0f172a', mono: 1 });
      if (p.labels) { const o2 = P / 101.325 * 100; C3.card(ctx, 64 + 175, 50, [`الارتفاع: ${Math.round(S.alt)} m`, `الضغط الجوي: ${P.toFixed(1)} kPa = ${(P / 101.325).toFixed(2)} atm`, `الهواء في كل نَفَس: ${Math.round(o2)}% مما عند سطح البحر`], { s: 12.5, bd: '#1e40af', hi: 1 }); }
      C3.T(ctx, '1 atm =', bx, ybot + 74, { s: 10.5, c: '#1e3a8a', mono: 1 }); C3.T(ctx, '101325 Pa', bx, ybot + 89, { s: 10.5, c: '#1e3a8a', mono: 1 }); C3.T(ctx, '= 760 mmHg', bx, ybot + 104, { s: 10.5, c: '#1e3a8a', mono: 1 });
      if (S.alt > 8700 && !S._top) { S._top = true; K.cheer(S, cx, cy - 40); } if (S.alt < 8000) S._top = false;
      C3.task(ctx, w, 'اسحب المتسلق إلى أعلى الجبل ⬆ وراقب الباروميتر', '#1e40af');
    } else {
      const g = B6.geoS(S); K.bg(ctx, w, h, { benchY: g.by }); const pc = g.pc, sealed = p.lid === 'sealed' && !S.hole, lidOn = p.lid === 'sealed';
      const jl = g.by - S.juice * g.gh, sx = g.stx, sw = 12;
      // outside air molecules
      if (p.air) K.raw(ctx, () => { for (let k = 0; k < 26; k++) { const x = g.gx - g.gw * 1.3 + ((k * 53) % (g.gw * 2.6)), y = g.gtop - 150 + ((k * 37) % 140) + Math.sin(S.t * 3 + k) * 4; ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.arc(x, y, 3.5, 0, TAU); ctx.fill(); } });
      // glass & juice
      C3.liquid(ctx, g.gx - g.gw / 2 + 3, jl, g.gw - 6, g.by - jl - 3, '#f97316', .75);
      K.raw(ctx, () => { ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.gx - g.gw / 2 - 4, g.gtop); ctx.lineTo(g.gx - g.gw / 2, g.by); ctx.lineTo(g.gx + g.gw / 2, g.by); ctx.lineTo(g.gx + g.gw / 2 + 4, g.gtop); ctx.stroke(); if (lidOn) { ctx.fillStyle = '#334155'; rr(ctx, g.gx - g.gw / 2 - 10, g.gtop - 10, g.gw + 20, 12, 4); ctx.fill(); if (S.hole) { ctx.fillStyle = '#fef3c7'; ctx.beginPath(); ctx.arc(g.gx - g.gw * .25, g.gtop - 4, 5, 0, TAU); ctx.fill(); } } });
      // straw with juice
      const ry = jl - S.rise * pc, top = g.stTop;
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(sx - sw / 2, top, sw, g.by - 20 - top); ctx.fillStyle = 'rgba(249,115,22,.85)'; ctx.fillRect(sx - sw / 2 + 2, Math.max(top, ry), sw - 4, g.by - 22 - Math.max(top, ry)); ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2; ctx.strokeRect(sx - sw / 2, top, sw, g.by - 20 - top); ctx.setLineDash([6, 6]); ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.beginPath(); ctx.moveTo(sx, top); ctx.lineTo(sx, g.by - 22); ctx.stroke(); ctx.setLineDash([]); });
      if (p.air) { const n = Math.round(10 * (1 - 7 * S.suck * 3000 / 101325)); K.raw(ctx, () => { for (let k = 0; k < n; k++) { const y = top + 8 + ((k * 23 + S.t * 30 * (k % 2 ? 1 : -1)) % Math.max(10, ry - top - 10) + Math.max(10, ry - top - 10)) % Math.max(10, ry - top - 10); ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.arc(sx, y, 3, 0, TAU); ctx.fill(); } }); }
      // kid head at straw top
      const hx = sx + 34, hy2 = top - 26; K.raw(ctx, () => { ctx.fillStyle = '#fcd9b6'; ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(hx, hy2, 38, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#3f2a1d'; ctx.beginPath(); ctx.arc(hx, hy2 - 8, 38, Math.PI * 1.02, Math.PI * 1.98); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(hx - 12, hy2 - 2, 3.5, 0, TAU); ctx.arc(hx + 12, hy2 - 2, 3.5, 0, TAU); ctx.fill(); ctx.fillStyle = '#be123c'; ctx.beginPath(); ctx.ellipse(sx + 6, hy2 + 22, 9 - S.suck * 3, 6 - S.suck * 2, 0, 0, TAU); ctx.fill(); if (S.suck > .2) { ctx.strokeStyle = '#9a3412'; ctx.beginPath(); ctx.arc(hx - 24, hy2 + 12, 6, 0, Math.PI); ctx.arc(hx + 24, hy2 + 12, 6, 0, Math.PI); ctx.stroke(); } ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sx, top + 2); ctx.lineTo(sx + 2, hy2 + 22); ctx.stroke(); ctx.lineCap = 'butt'; });
      // arrows
      const dP = S.suck * 3000;
      if (p.arrows) { if (!sealed) [-.38, -.1, .3].forEach(f => C3.arrow(ctx, g.gx + f * g.gw, jl - 60, g.gx + f * g.gw, jl - 4, '#dc2626', 3.5)); else C3.T(ctx, 'لا هواء خارجي يدفع العصير!', g.gx, jl - 30, { s: 11.5, c: '#fff', bg: '#b91c1c' }); C3.arrow(ctx, sx, Math.max(top + 30, ry - 50), sx, Math.max(top + 30, ry - 50) + 44 * (1 - 14 * dP / 101325), '#2563eb', 2.5); if (dP > 200 && !sealed) C3.arrow(ctx, sx - 20, g.by - 30, sx - 20, g.by - 40 - Math.min(80, dP / 3000 * 80), '#16a34a', 4);
        if (p.labels && !sealed) C3.T(ctx, 'الضغط الجوي يدفع العصير', g.gx - g.gw * .1, jl - 74, { s: 11.5, c: '#fff', bg: '#dc2626' }); }
      if (p.labels) C3.card(ctx, 64 + (w - 64) * .78, 60, ['الضغط على سطح العصير:', '101.3 kPa', 'الضغط داخل القصبة:', ((101325 - dP) / 1000).toFixed(1) + ' kPa'], { s: 12.5, bd: '#2563eb', hi: 3 });
      if (S.sip > .2 && S.suck > .5) K.bubble(ctx, 'ممم… لذيذ 😋', hx + 30, hy2 - 30, { s: 13 });
      C3.btn(ctx, 64 + (w - 64) * .78, 250, 180, 40, S.sucking ? 'أسحب الهواء…' : 'اضغط مع الاستمرار: اشرب', '#ea580c', S.sucking);
      C3.task(ctx, w, sealed && S.suck > .3 ? 'الكأس مغلق بإحكام! اضغط على الغطاء لتثقبه' : 'اضغط مع الاستمرار على فم الطفل لتسحب الهواء من القصبة 🥤', sealed && S.suck > .3 ? '#b91c1c' : '#0f766e');
    }
    K.party(ctx, S);
  },
  drags(S) {
    if (!S.W) return []; const p = S.p, L = [];
    if (p.view === 'mountain') { const g = B6.geoM(S), a = S.alt / 8848, cx = lerp(g.xb, g.px, a), cy = lerp(g.by, g.py, a);
      L.push({ id: 'climber', x: cx, y: cy - 25, r: 30, dir: Math.atan2(g.py - g.by, g.px - g.xb), tip: 'اسحب المتسلق إلى أعلى الجبل أو أسفله', idle: 'اسحبني إلى القمة ⬆', drag: (S, d) => { const ux = g.px - g.xb, uy = g.py - g.by, L2 = ux * ux + uy * uy; const t = ((d.ox + d.x - d.sx - g.xb) * ux + (d.oy + 25 + d.y - d.sy - g.by) * uy) / L2; S.alt = Math.round(clamp(t, 0, 1) * 8848); }, wheel: (S, st) => { S.alt = clamp(S.alt + st * 250, 0, 8848); } }); }
    else { const g = B6.geoS(S), top = g.stTop, hx = g.stx + 34, hy2 = top - 26;
      const suck = { down: S => { S.sucking = true; }, up: S => { S.sucking = false; }, drag: (S, d) => { S.sucking = true; } };
      L.push(Object.assign({ id: 'mouth', x: hx, y: hy2, r: 40, axis: 'y', tip: 'اضغط مع الاستمرار لسحب الهواء من القصبة', idle: 'اضغط مع الاستمرار ✋' }, suck));
      L.push(Object.assign({ id: 'drink', x: 64 + (S.W - 64) * .78, y: 250, w: 180, h: 40, hint: false, tip: 'اضغط مع الاستمرار لتشرب' }, suck));
      if (p.lid === 'sealed') L.push({ id: 'lid', x: g.gx - g.gw * .25, y: g.gtop - 4, w: g.gw * .5, h: 20, hint: false, tip: 'اضغط لثقب الغطاء', click: S => { S.hole = !S.hole; } }); }
    return L;
  },
  readings(S) { if (S.p.view === 'mountain') { const P = B6.P(S.alt); return [rd('الارتفاع', Math.round(S.alt) + ' m'), rd('الضغط الجوي', P.toFixed(1) + ' kPa'), rd('بالـ mmHg', Math.round(P / 101.325 * 760) + ' mmHg'), rd('بالـ atm', (P / 101.325).toFixed(2) + ' atm')]; } const dP = S.suck * 3000; return [rd('الضغط الجوي', '101.3 kPa'), rd('الضغط داخل القصبة', ((101325 - dP) / 1000).toFixed(1) + ' kPa'), rd('فرق الضغط', Math.round(dP) + ' Pa'), rd('ارتفاع العصير في القصبة', S.rise.toFixed(1) + ' cm')]; },
  record(S) { if (S.p.view !== 'mountain') { Runner.toast('سجّل القراءات في مشهد الجبل', 'info'); return null; } const P = B6.P(S.alt); return { z: Math.round(S.alt), P: +P.toFixed(1), mm: Math.round(P / 101.325 * 760) }; },
  cols: [['z', 'الارتفاع (m)'], ['P', 'الضغط (kPa)'], ['mm', 'الضغط (mmHg)']],
  graph: { x: 'z', y: 'P', xl: 'الارتفاع (m)', yl: 'الضغط الجوي (kPa)', xmin: 0, xmax: 9000 },
  explain(S) { if (S.p.view === 'mountain') return S.alt < 100 ? 'عند مستوى سطح البحر يضغط علينا <b>عمود هواء طويل</b> وزنه كبير: 1 atm = 101325 Pa.' : `كلما ارتفع المتسلق أصبح <b>عمود الهواء فوقه أقصر</b> والهواء <b>أقل كثافة</b> ← الضغط الجوي أقل (${fmt(B6.P(S.alt), 3)} kPa)، وفي كل نَفَس يدخل هواء أقل، لذلك يتنفس بصعوبة.`; if (S.p.lid === 'sealed' && !S.hole) return 'الكأس مغلق بإحكام: لا يوجد هواء خارجي فوق العصير يدفعه، لذلك لا يرتفع العصير في القصبة مهما سحبت!'; return 'عند سحب الهواء من القصبة <b>ينخفض الضغط داخلها</b>، بينما يبقى الضغط الجوي على سطح العصير كما هو، فيدفع <b>الضغط الجوي</b> العصير إلى داخل القصبة (من الضغط العالي إلى المنخفض).'; },
  quiz: [
    { q: 'لماذا تكون قيمة الضغط الجوي عند قمة جبل مرتفع أقل منها عند مستوى سطح البحر؟', o: ['لأن عمود الهواء فوق القمة أقصر وأقل وزناً', 'لأن الحرارة هناك أعلى', 'لأن الجاذبية تنعدم هناك'], a: 0, why: 'الضغط الجوي ينشأ من وزن الغلاف الجوي، ويقل كلما ارتفعنا.' },
    { q: 'مقدار الضغط الجوي عند مستوى سطح البحر (1 atm) يساوي:', o: ['101325 Pa = 760 mmHg', '1000 Pa = 76 mmHg', '760 Pa'], a: 0, why: 'ص 50: 1 atm = 101325 Pa = 760 mmHg.' },
    { q: 'يتطلب تفريغ علبة مغلقة مملوءة بسائل عمل ثقبين فيها. لماذا؟', o: ['ليدخل الهواء من أحدهما فيدفع الضغط الجوي السائل للخروج من الآخر', 'لكي يصبح السائل أخف', 'لزيادة كثافة السائل'], a: 0, why: 'بدون دخول الهواء ينخفض الضغط داخل العلبة فلا يخرج السائل (كالكأس المغلق مع القصبة).' }
  ]
});

/* =====================================================================
   7) نشاط: قياس مقدار قوة الطفو — مبدأ أرخميدس (ص 52–53)
   ===================================================================== */
const B7 = {
  OBJ: { stone: { n: 'حجر', rho: 3.5, V: 408, mat: 'stone' }, iron: { n: 'حديد', rho: 7.86, V: 180, mat: 'iron' }, alu: { n: 'ألمنيوم', rho: 2.7, V: 400, mat: 'alu' }, wood: { n: 'خشب', rho: .6, V: 500, mat: 'wood' } },
  LIQ: { water: { n: 'ماء', rho: 1, c: '#38bdf8' }, salt: { n: 'ماء مالح', rho: 1.2, c: '#0d9488' }, oil: { n: 'زيت', rho: .9, c: '#eab308' } },
  A: 20.1, Ls: 180, // can: mL per px of height, spout level (px above bottom)
  geo(S) { const w = S.W, h = S.H, by = h * .84, fs = clamp((w - 64) / 50, 11, 16), cardH = Math.round(fs * 4.6), armY = 44 + cardH + 18, cx = 64 + (w - 64) * .28, L = clamp(h * .16, 90, 140); const o = B7.OBJ[S.p.obj], hs = Math.cbrt(o.V) * 10; const bot0 = armY + 22 + L + 24 + 16 + hs; const canW = 150, spX = cx + canW / 2 + 44, spY = by - B7.Ls; const bx = spX + 62, bkTop = spY + 34, bkW = 74, bkH = 84, L2 = clamp(h * .13, 80, 110), y2 = bkTop - 18 - L2 - 24; return { w, h, by, cx, L, armY, hs, bot0, lowMax: by - 10 - bot0, canW, canTop: by - 210, bx, fs, cardH, spX, spY, bkTop, bkW, bkH, L2, y2 }; },
  solve(S, g) {
    const o = B7.OBJ[S.p.obj], l = B7.LIQ[S.p.liq], A = B7.A, W = o.rho * o.V / 1000 * 9.8;
    const botHang = g.bot0 + S.low;
    const sub = (ys, bot) => o.V * clamp((bot - ys) / g.hs, 0, 1);
    let L = S.Vw / A; for (let k = 0; k < 10; k++) L = (S.Vw + sub(g.by - L, botHang)) / A;
    let bot = botHang, float = false;
    const FbH = l.rho * sub(g.by - Math.min(L, B7.Ls), botHang) / 1000 * 9.8;
    if (FbH >= W - 1e-6 && o.rho < l.rho) { float = true; const f = o.rho / l.rho; L = (S.Vw + o.V * f) / A; bot = g.by - Math.min(L, B7.Ls) + f * g.hs; }
    let over = 0; if (L > B7.Ls) { const s2 = float ? o.V * o.rho / l.rho : sub(g.by - B7.Ls, bot); const Vn = A * B7.Ls - s2; over = S.Vw - Vn; L = B7.Ls; if (float) bot = g.by - B7.Ls + o.rho / l.rho * g.hs; }
    const Vsub = float ? o.V * o.rho / l.rho : sub(g.by - L, bot); const Fb = l.rho * Vsub / 1000 * 9.8;
    return { W, Fb, R: Math.max(0, W - Fb), L, bot, float, over, Vsub };
  }
};
B7.reset = S => { S.low = 10; S.Vw = B7.A * B7.Ls; S.Vc = 0; S._ok = false; };
/* draw a row of coloured "chips" from right to left (RTL), numbers drawn LTR so they never get reordered */
B7.row = (ctx, parts, xr, y, fs, maxW) => {
  K.raw(ctx, () => {
    const meas = pc => { ctx.font = `${pc.w || 800} ${fs * (pc.k || 1)}px ${pc.ltr ? 'ui-monospace,monospace' : 'Tajawal,sans-serif'}`; return ctx.measureText(pc.t).width + (pc.bg ? 14 : 6); };
    let tot = parts.reduce((s, pc) => s + meas(pc), 0); if (maxW && tot > maxW) { fs *= maxW / tot; tot = maxW; }
    let x = xr - (maxW ? (maxW - tot) / 2 : 0); ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
    parts.forEach(pc => { const wd = meas(pc); const xc = x - wd / 2;
      if (pc.bg) { ctx.fillStyle = pc.bg; rr(ctx, x - wd + 1, y - fs * .82, wd - 2, fs * 1.64, 7); ctx.fill(); }
      ctx.fillStyle = pc.c || '#1e293b'; ctx.direction = pc.ltr ? 'ltr' : 'rtl'; ctx.font = `${pc.w || 800} ${fs * (pc.k || 1)}px ${pc.ltr ? 'ui-monospace,monospace' : 'Tajawal,sans-serif'}`; ctx.fillText(pc.t, xc, y + 1); x -= wd; });
    ctx.textBaseline = 'alphabetic'; ctx.direction = 'rtl';
  });
};
X7({ id: 'g7_archimedes', ch: 13, sec: 'الدرس 3', page: 53, kind: 'نشاط', title: 'نشاط: قياس مقدار قوة الطفو (مبدأ أرخميدس)',
  desc: 'نعلّق قطعة حجر بالنابض الحلزوني ونقرأ وزنها في الهواء، ثم نغمرها في الماء داخل إناء الإزاحة: تقل القراءة، ووزن الماء المزاح يساوي قوة الطفو.',
  tags: 'أرخميدس قوة الطفو وزن ظاهري نابض إزاحة',
  tools: ['قطعة حجر', 'نابض حلزوني (ميزان نابضي)', 'إناء إزاحة مملوء بالماء حتى الفوهة', 'كأس لجمع الماء المزاح', 'ميزان رقمي'],
  steps: ['علّق قطعة الحجر بخطاف النابض الحلزوني وهي في الهواء، واقرأ مؤشر النابض (الوزن الحقيقي 14 N).', 'اسحب النابض إلى الأسفل لتغمر الحجر في الماء بشكل كامل، واقرأ المؤشر مرة أخرى (الوزن الظاهري).', 'لماذا تشير القراءة إلى رقم أصغر؟ قوة الطفو = الوزن الحقيقي − الوزن الظاهري.', 'قارن قوة الطفو بوزن الماء المزاح الذي تجمّع في الكأس على الميزان.', 'سجّل النتائج، ثم جرّب أجساماً أخرى (حديد، ألمنيوم، خشب) وسوائل أخرى (ماء مالح، زيت).'],
  concl: ['قوة الطفو: قوة دفع السائل للأجسام المغمورة فيه (كلياً أو جزئياً) وتتجه شاقولياً نحو الأعلى.', 'قوة الطفو = الوزن الحقيقي (في الهواء) − الوزن الظاهري (في السائل).', 'مبدأ أرخميدس: قوة الطفو تساوي وزن السائل الذي أزاحه الجسم، وحجم السائل المزاح يساوي حجم الجزء المغمور من الجسم.', 'تزداد قوة الطفو بزيادة حجم الجزء المغمور وبزيادة كثافة السائل.'],
  laws: ['g7_buoy'],
  fact: ['يشعر السبّاح في حوض السباحة بأن جسمه أخف بسبب قوة الطفو.', 'قاعدة أرخميدس تنطبق على الغازات أيضاً: لذلك يرتفع البالون المملوء بغاز الهيليوم.', 'يقال إن أرخميدس اكتشف مبدأه وهو في حوض الاستحمام فصاح: «وجدتها!».'],
  controls: [
    SEL('obj', 'الجسم', [['stone', 'حجر'], ['iron', 'حديد'], ['alu', 'ألمنيوم'], ['wood', 'خشب']], 'stone', (v, S) => B7.reset(S)),
    SEL('liq', 'السائل', [['water', 'ماء'], ['salt', 'ماء مالح'], ['oil', 'زيت']], 'water', (v, S) => B7.reset(S)),
    BT('', [{ t: 'إعادة ملء الإناء وتفريغ الكأس', on: S => B7.reset(S) }]),
    TG('forces', 'أسهم القوى (الوزن، الطفو، الشد)', true, null, 'force'), TG('press', 'ضغط السائل على الجسم', false, null, 'vector'), TG('disp', 'إبراز الماء المزاح', true, null, 'eye'), TG('labels', 'الأسماء والقيم', true, null, 'labels')],
  setup(S) { Object.assign(S, { low: 20, Vw: B7.A * B7.Ls, Vc: 0, flowT: 0, drag7: false, R: 0, Fb: 0 }); },
  update(S, dt) { if (!S.W) return; const g = B7.geo(S); S.low = clamp(S.low, 0, g.lowMax); let r = B7.solve(S, g); if (r.over > .5) { S.Vw -= r.over; S.Vc += r.over; S.flowT = .35; }
    else if (r.L < B7.Ls - .05 && S.Vc > .5) { const back = Math.min(S.Vc, (B7.Ls - r.L) * B7.A); S.Vw += back; S.Vc -= back; S.backT = .6; }
    S.flowT = Math.max(0, S.flowT - dt); S.backT = Math.max(0, (S.backT || 0) - dt); r = B7.solve(S, g); S.R = +r.R.toFixed(2); S.Fb = +r.Fb.toFixed(2); },
  draw(ctx, w, h, S) {
    const p = S.p, g = B7.geo(S), o = B7.OBJ[p.obj], l = B7.LIQ[p.liq], r = B7.solve(S, g); K.bg(ctx, w, h, { benchY: g.by });
    const GR = '#16a34a', Wd = Math.round(l.rho * S.Vc / 1000 * 9.8 * 100) / 100, Rd = Math.round((r.float ? 0 : r.R) * 100) / 100;
    // retort stand: one long arm carries BOTH spring balances
    const sx = 64 + 36; K.raw(ctx, () => { ctx.fillStyle = '#334155'; rr(ctx, sx - 30, g.by - 14, 90, 14, 5); ctx.fill(); ctx.fillStyle = '#94a3b8'; ctx.fillRect(sx - 4, g.armY - 20, 8, g.by - g.armY + 6); ctx.fillStyle = '#64748b'; ctx.fillRect(sx - 4, g.armY - 4, g.bx - sx + 24, 8); ctx.fillStyle = '#1e293b'; rr(ctx, sx - 10, g.armY - 10, 20, 20, 4); ctx.fill(); });
    // spring balance 1 (object)
    const sy = g.armY + 22 + S.low; K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.cx, g.armY + 4); ctx.lineTo(g.cx, sy - 20); ctx.moveTo(g.bx, g.armY + 4); ctx.lineTo(g.bx, g.y2 - 20); ctx.stroke(); });
    const hk = K.springBalance(ctx, g.cx, sy, Rd, 20, { len: g.L, ticks: 4 });
    // overflow can
    const x0 = g.cx - g.canW / 2, x1 = g.cx + g.canW / 2, ys = g.by - r.L, spY = g.spY;
    C3.liquid(ctx, x0 + 2, ys, g.canW - 4, g.by - ys - 2, l.c, .5);
    const bot = r.bot, top = bot - g.hs, ox = g.cx;
    K.raw(ctx, () => { ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(hk.hx, hk.hy - 6); if (r.float && top > hk.hy + 6) ctx.quadraticCurveTo(ox + 20, (hk.hy + top) / 2, ox, top); else ctx.lineTo(ox, top); ctx.stroke(); });
    if (o.mat === 'stone') K.raw(ctx, () => { const s = g.hs; const pts = [[-.45, -.1], [-.3, -.48], [.1, -.5], [.45, -.3], [.5, .15], [.3, .5], [-.2, .48], [-.5, .25]]; const gg = ctx.createLinearGradient(ox - s / 2, top, ox + s / 2, bot); gg.addColorStop(0, '#d6d3d1'); gg.addColorStop(1, '#78716c'); ctx.fillStyle = gg; ctx.beginPath(); pts.forEach(([a, b], i) => ctx.lineTo(ox + a * s, top + s / 2 + b * s)); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#44403c'; ctx.lineWidth = 1.5; ctx.stroke(); });
    else K.box(ctx, ox - g.hs / 2, bot, g.hs, g.hs, 0, o.mat);
    K.raw(ctx, () => { ctx.globalAlpha = .28; ctx.fillStyle = l.c; ctx.fillRect(x0 + 2, ys, g.canW - 4, g.by - ys - 2); ctx.globalAlpha = 1; });
    if (p.disp && r.Vsub > 1) K.raw(ctx, () => { const f = r.Vsub / o.V; ctx.fillStyle = 'rgba(124,58,237,.16)'; ctx.fillRect(ox - g.hs / 2 - 3, Math.max(top, ys) - 1, g.hs + 6, g.hs * f + 2); ctx.strokeStyle = '#7c3aed'; ctx.setLineDash([4, 3]); ctx.lineWidth = 2; ctx.strokeRect(ox - g.hs / 2 - 3, Math.max(top, ys) - 1, g.hs + 6, g.hs * f + 2); ctx.setLineDash([]); });
    K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, g.canTop); ctx.lineTo(x0, g.by); ctx.lineTo(x1, g.by); ctx.lineTo(x1, g.canTop); ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = '#64748b'; ctx.beginPath(); ctx.moveTo(x1, spY - 2); ctx.lineTo(g.spX, spY + 14); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x0 + 6, g.canTop + 8, 5, 180); });
    // spring balance 2 (green) holding the catch beaker = weighs the displaced liquid
    const hk2 = K.springBalance(ctx, g.bx, g.y2, Wd, 5, { len: g.L2, ticks: 5, col: '#4ade80' });
    const lev = clamp(S.Vc / 560, 0, 1), bkB = g.bkTop + g.bkH;
    K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(hk2.hx - 2, hk2.hy - 6); ctx.lineTo(g.bx - g.bkW / 2 + 3, g.bkTop + 2); ctx.moveTo(hk2.hx - 2, hk2.hy - 6); ctx.lineTo(g.bx + g.bkW / 2 - 3, g.bkTop + 2); ctx.stroke(); });
    K.beaker(ctx, g.bx, bkB, g.bkW, g.bkH, lev, { liq: l.c, liqA: .7 });
    if (p.disp && S.Vc > 1) K.raw(ctx, () => { const yl = bkB - g.bkH * lev; ctx.strokeStyle = '#7c3aed'; ctx.setLineDash([4, 3]); ctx.lineWidth = 2; ctx.strokeRect(g.bx - g.bkW / 2 + 1, yl - 1, g.bkW - 2, bkB - yl); ctx.setLineDash([]); });
    if (S.flowT > 0) K.raw(ctx, () => { ctx.strokeStyle = l.c; ctx.globalAlpha = .85; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(g.spX, spY + 14); ctx.quadraticCurveTo(g.spX + 14, spY + 18, g.bx - 10, bkB - g.bkH * lev); ctx.stroke(); ctx.globalAlpha = 1; });
    if (S.backT > 0 && p.labels) C3.T(ctx, '↩ نُعيد الماء المزاح إلى الإناء', g.spX, spY - 26, { s: 11, c: '#fff', bg: '#0369a1' });
    if (p.labels) { C3.T(ctx, 'إناء الإزاحة', g.cx, g.by + 16, { s: 11.5, c: '#fff', bg: '#334155' }); C3.T(ctx, 'الماء المزاح: ' + Math.round(S.Vc) + ' mL', g.bx, bkB + 16, { s: 11.5, c: '#fff', bg: '#7c3aed' });
      const lx = Math.min(w - 70, g.bx + 92); C3.T(ctx, 'ميزان ٢', lx, g.y2 + 16, { s: 12, c: '#fff', bg: GR }); C3.T(ctx, 'يزن الماء المزاح', lx, g.y2 + 38, { s: 11, c: '#15803d' });
      C3.T(ctx, 'ميزان ١', g.cx - 58, sy + 16, { s: 12, c: '#fff', bg: '#d97706' }); C3.T(ctx, 'الوزن في الماء', g.cx - 58, sy + 38, { s: 11, c: '#b45309' }); }
    // forces
    const cyo = (top + bot) / 2, k = 9;
    if (p.forces) { C3.arrow(ctx, ox - 12, cyo, ox - 12, cyo + r.W * 5 + 10, '#dc2626', 4); if (p.labels) C3.T(ctx, 'W = ' + r.W.toFixed(1) + ' N', ox - 12 - 52, cyo + r.W * 5, { s: 11.5, c: '#fff', bg: '#dc2626', mono: 1 });
      if (r.Fb > .05) { C3.arrow(ctx, ox + 12, cyo, ox + 12, cyo - r.Fb * k - 10, GR, 5); if (p.labels) C3.T(ctx, 'قوة الطفو ' + r.Fb.toFixed(1) + ' N', ox + 12 + 62, cyo - r.Fb * k * .5, { s: 12, c: '#fff', bg: GR }); }
      if (!r.float && r.R > .05) C3.arrow(ctx, ox + 30, top - 4, ox + 30, top - 4 - r.R * 3 - 6, '#f59e0b', 3);
      if (Wd > .05) { const yb = bkB - g.bkH * lev / 2; C3.arrow(ctx, g.bx, yb, g.bx, yb + Wd * k + 10, GR, 5); if (p.labels) C3.T(ctx, 'وزن الماء المزاح ' + Wd.toFixed(1) + ' N', Math.min(w - 72, g.bx + g.bkW / 2 + 64), yb + 6, { s: 12, c: '#fff', bg: GR }); } }
    if (p.press && r.Vsub > 1) { const dTop = Math.max(0, top - ys), dBot = Math.max(0, bot - ys); for (let k = -1; k <= 1; k++) { if (dTop > 0) C3.arrow(ctx, ox + k * g.hs * .3, top - 6 - dTop * .12, ox + k * g.hs * .3, top - 2, '#f97316', 2); C3.arrow(ctx, ox + k * g.hs * .3, bot + 6 + dBot * .12, ox + k * g.hs * .3, bot + 2, '#f97316', 2.4); } }
    // big live equation card
    const eq = Math.abs(Wd - r.Fb) < .06, cw = w - 64 - 24, cxr = w - 12, fs = g.fs, y0 = 44;
    K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.96)'; rr(ctx, 64 + 12, y0, cw, g.cardH, 14); ctx.fill(); ctx.strokeStyle = r.Fb > .05 && eq ? GR : '#94a3b8'; ctx.lineWidth = 2.5; ctx.stroke(); });
    const f1 = v => v.toFixed(1);
    B7.row(ctx, [{ t: 'قوة الطفو', bg: GR, c: '#fff', w: 900 }, { t: '=' }, { t: 'الوزن في الهواء', c: '#b91c1c' }, { t: '−', k: 1.2 }, { t: 'الوزن في الماء', c: '#b45309' }, { t: '=' }, { t: f1(r.W) + ' − ' + f1(Rd), ltr: 1, w: 800 }, { t: '=' }, { t: f1(r.Fb) + ' N', ltr: 1, bg: GR, c: '#fff', w: 900 }], cxr - 14, y0 + g.cardH * .29, fs, cw - 20);
    B7.row(ctx, [{ t: 'وزن السائل المزاح', bg: '#7c3aed', c: '#fff', w: 900 }, { t: '(' + Math.round(S.Vc) + ' mL ' + l.n + ')', w: 700, k: .85, c: '#6d28d9' }, { t: '=' }, { t: f1(Wd) + ' N', ltr: 1, bg: GR, c: '#fff', w: 900 }, { t: r.Fb > .05 ? (eq ? '✓ قوة الطفو = وزن السائل المزاح' : '…') : '(اغمر الجسم)', c: r.Fb > .05 && eq ? '#15803d' : '#64748b', w: 900 }], cxr - 14, y0 + g.cardH * .72, fs, cw - 20);
    const inW = r.Vsub > o.V * .98 || r.float;
    if (inW && eq && !S._ok) { S._ok = true; K.cheer(S, g.bx, g.y2); }
    C3.task(ctx, w, r.float ? 'الخشب يطفو! قوة الطفو = وزنه، والنابض يقرأ صفراً' : r.Vsub < 1 ? 'اسحب النابض إلى الأسفل لتغمر ' + o.n + ' في ' + l.n + ' ⬇' : inW ? 'قوة الطفو = وزن السائل المزاح ✓ (مبدأ أرخميدس)' : 'مغمور جزئياً: قارن الميزانين… ثم اغمره كلياً', inW ? '#15803d' : '#0f766e');
    K.party(ctx, S);
  },
  drags(S) { if (!S.W) return []; const g = B7.geo(S), sy = g.armY + 22 + S.low; return [{ id: 'spring', x: g.cx, y: sy + g.L / 2, w: 50, h: g.L + 20, axis: 'y', tip: 'اسحب النابض إلى الأسفل أو الأعلى لغمر الجسم', idle: 'اسحبني إلى الأسفل ⬇', drag: (S, d) => { S.low = clamp(d.oy + d.y - d.sy - (g.armY + 22 + g.L / 2), 0, g.lowMax); }, wheel: (S, s) => { S.low = clamp(S.low - s * 10, 0, g.lowMax); } }]; },
  reset(S) { B7.reset(S); },
  readings(S) { if (!S.W) return []; const g = B7.geo(S), r = B7.solve(S, g), l = B7.LIQ[S.p.liq]; return [rd('الوزن الحقيقي', r.W.toFixed(1) + ' N'), rd('قراءة النابض', (r.float ? 0 : r.R).toFixed(1) + ' N'), rd('قوة الطفو', r.Fb.toFixed(2) + ' N'), rd('حجم الجزء المغمور', Math.round(r.Vsub) + ' cm³'), rd('وزن السائل المزاح', (l.rho * S.Vc / 1000 * 9.8).toFixed(2) + ' N')]; },
  record(S) { const g = B7.geo(S), r = B7.solve(S, g), l = B7.LIQ[S.p.liq]; if (r.Vsub < 1) { Runner.toast('اغمر الجسم في السائل أولاً', 'info'); return null; } return { obj: B7.OBJ[S.p.obj].n, liq: l.n, W: +r.W.toFixed(1), Wa: +(r.float ? 0 : r.R).toFixed(1), Fb: +r.Fb.toFixed(1), Wd: +(l.rho * S.Vc / 1000 * 9.8).toFixed(1) }; },
  cols: [['obj', 'الجسم'], ['liq', 'السائل'], ['W', 'الوزن في الهواء (N)'], ['Wa', 'الوزن الظاهري (N)'], ['Fb', 'قوة الطفو (N)'], ['Wd', 'وزن السائل المزاح (N)']],
  explain(S) { if (!S.W) return ''; const r = B7.solve(S, B7.geo(S)); if (r.Vsub < 1) return 'الجسم معلق في الهواء: النابض يقرأ <b>وزنه الحقيقي</b>.'; if (r.float) return 'كثافة الخشب أقل من كثافة السائل، فتصبح قوة الطفو مساوية لوزنه قبل أن يُغمر كلياً ← <b>يطفو</b>.'; return `السائل يدفع الجسم إلى الأعلى بقوة <b>${r.Fb.toFixed(1)} N</b> (قوة الطفو)، لذلك يقرأ النابض أقل. ضغط السائل على أسفل الجسم أكبر من ضغطه على أعلاه لأن الأسفل أعمق — هذا سبب قوة الطفو.`; },
  quiz: [
    { q: 'جسم معلق بنابض حلزوني يقرأ 9.5 N في الهواء و 7.5 N في الماء. قوة الطفو المؤثرة فيه:', o: ['17 N', '2 N', '7.5 N'], a: 1, why: 'قوة الطفو = 9.5 − 7.5 = 2 N (مراجعة الفصل).' },
    { q: 'ما سبب نقصان وزن الجسم عند غمره في سائل ما؟', o: ['قوة الطفو التي يدفعه بها السائل إلى الأعلى', 'تنقص كتلته', 'يتبخر جزء منه'], a: 0, why: 'السائل يدفع الجسم المغمور بقوة تتجه شاقولياً نحو الأعلى.' },
    { q: 'ينص مبدأ أرخميدس على أن قوة الطفو تساوي:', o: ['وزن الجسم في الهواء', 'وزن السائل الذي أزاحه الجسم', 'كتلة الجسم'], a: 1, why: 'ص 53: مقدارها يساوي وزن كمية السائل أو الغاز التي أزاحها الجسم.' }
  ]
});

/* =====================================================================
   8) نشاط: طفو الأجسام — البيضة والملح (ص 54)
   ===================================================================== */
const B8 = {
  rhoE: 1.068,
  geo(S) { const w = S.W, h = S.H, by = h * .84, gx = 64 + (w - 64) * .4, gw = clamp(h * .27, 150, 220), gh = clamp(h * .44, 230, 340), wt = by - gh * .85, rx = gw * .21; return { w, h, by, gx, gw, gh, wt, rx, ry: rx * .78, jx: 64 + (w - 64) * .74, jy: by - 30 }; },
  rho: S => 1 + .017 * S.dis / 6,
  /* salt jar: centre (free when dragged) + tilt; mouth = lid opening */
  jar(S, g) { const x = S.jarX ?? g.jx, y = S.jarY ?? g.jy - 36, a = S.jarA || 0; return { x, y, a, mx: x + 46 * Math.sin(a), my: y - 46 * Math.cos(a) }; },
  over(S, g, x, y) { return y < g.by - g.gh + 30 && Math.abs(x - g.gx) < g.gw * .5 + 70; },
  addGrain(S, g, x, y, vx, vy) { S.grains.push({ x, y, vx, vy }); S.pourN = (S.pourN || 0) + 1; if (S.pourN >= 16) { S.pourN = 0; S.sp++; } },
  state(S) { const d = B8.rho(S) - B8.rhoE; return Math.abs(d) < .004 ? 'hang' : d < 0 ? 'sink' : 'float'; }
};
X7({ id: 'g7_egg', ch: 13, sec: 'الدرس 3', page: 54, kind: 'نشاط', title: 'نشاط: طفو الأجسام (البيضة والماء المالح)',
  desc: 'نضع بيضة في كأس ماء فتغطس، ثم نذيب الملح تدريجياً: ترتفع البيضة وتبقى معلقة، ثم تطفو! لماذا؟',
  tags: 'طفو غطس تعلق كثافة ملح بيضة',
  tools: ['كأس زجاجية', 'ماء', 'بيضة', 'ملح وملعقة', 'ساق زجاجية للتحريك'],
  steps: ['خذ كأساً زجاجية مملوءة بالماء وضع فيها بيضة. ماذا تلاحظ؟', 'اضغط على علبة الملح لتضيف ملعقة ملح، ثم حرّك الماء بالساق الزجاجية (اسحبها يميناً ويساراً) ليذوب الملح.', 'أضف الملح بالتدريج: ما الذي جعل البيضة ترتفع قليلاً إلى الأعلى؟', 'عندما تصبح البيضة معلقة داخل الماء، قارن كثافتها بكثافة الماء المالح.', 'استمر بإذابة الملح: ماذا يحصل للبيضة؟ ما سبب صعودها وبقائها طافية على سطح الماء؟', 'فعّل «مقارنة: بطة، سمكة، صخرة» لترى الحالات الثلاث.'],
  concl: ['يطفو الجسم عندما يكون وزنه مساوياً لقوة الطفو وكثافته أصغر من كثافة السائل (كالبطة).', 'يبقى الجسم معلقاً تحت سطح السائل عندما تكون كثافة الجسم = كثافة السائل (كالسمكة).', 'يغوص الجسم عندما يكون وزنه أكبر من قوة الطفو وكثافته أكبر من كثافة السائل (كالصخرة).', 'إذابة الملح تزيد كثافة الماء فتزداد قوة الطفو على البيضة.'],
  laws: ['g7_buoy', 'g7_rho'],
  fact: ['يطفو الإنسان بسهولة في البحر الميت لأن ماءه مالح جداً وكثافته كبيرة.', 'البيضة الطازجة تغطس في الماء العذب، والبيضة القديمة قد تطفو لأن فيها هواءً أكثر.', 'زيت الزيتون يطفو على سطح الماء لأن كثافته أقل من كثافة الماء.'],
  controls: [
    BT('', [{ t: 'كأس ماء جديد', on: S => { const E = EXPS.find(e => e.id === 'g7_egg'); E.setup(S); } }]),
    TG('forces', 'أسهم القوى (الوزن وقوة الطفو)', true, null, 'force'), TG('bars', 'مقارنة الكثافتين', true, null, 'graph'), TG('cases', 'مقارنة: بطة، سمكة، صخرة', false, null, 'eye'), TG('labels', 'الأسماء والقيم', true, null, 'labels')],
  setup(S) { Object.assign(S, { sp: 0, dis: 0, und: 0, stir: 0, rodX: 0, eggY: null, eggV: 0, dragE: false, jarX: null, jarY: null, jarA: 0, jarDrag: false, shake: 0, pourN: 0, pourAcc: 0 }); S.grains = []; },
  update(S, dt) {
    if (!S.W) return; dt = Math.min(dt, .05); const g = B8.geo(S);
    // salt jar: tilt over the glass, pour grains continuously (faster when shaken), spring back home when released
    { const j = B8.jar(S, g), dir = j.x >= g.gx ? -1 : 1, tgt = S.jarDrag && B8.over(S, g, j.x, j.y) ? dir * 2.0 : 0; S.jarA = (S.jarA || 0) + (tgt - (S.jarA || 0)) * Math.min(1, dt * 9);
      if (!S.jarDrag && S.jarX != null) { S.jarX += (g.jx - S.jarX) * Math.min(1, dt * 7); S.jarY += (g.jy - 36 - S.jarY) * Math.min(1, dt * 7); if (Math.hypot(S.jarX - g.jx, S.jarY - g.jy + 36) < 1) { S.jarX = S.jarY = null; } }
      S.shake = Math.max(0, (S.shake || 0) - dt * 3);
      if (Math.abs(S.jarA) > 1.3 && S.jarDrag) { S.pourAcc = (S.pourAcc || 0) + dt * (6 + 30 * Math.min(1, S.shake)); while (S.pourAcc >= 1) { S.pourAcc--; const j2 = B8.jar(S, g); B8.addGrain(S, g, j2.mx + (Math.random() - .5) * 10, j2.my + (Math.random() - .5) * 6, (Math.random() - .5) * 30 + Math.sin(S.jarA) * 20, 20 + Math.random() * 30); } } }
    const x0g = g.gx - g.gw / 2 + 4, x1g = g.gx + g.gw / 2 - 4;
    S.grains.forEach(q => { q.vy += 400 * dt; q.y += q.vy * dt; q.x += q.vx * dt; if (q.y > g.wt && q.x > x0g && q.x < x1g) { q.vy = Math.min(q.vy, 60); q.vx *= .9; } if (q.y > g.by - 8) { q.done = 1; q.inG = q.x > x0g && q.x < x1g; } });
    const land = S.grains.filter(q => q.done && q.inG).length; if (land) { S.und += land * 6 / 16; } S.grains = S.grains.filter(q => !q.done);
    const r = S.und * (.04 + S.stir * 1.6) * dt; S.und = Math.max(0, S.und - r); S.dis += r; S.stir = Math.max(0, S.stir - dt * 1.2);
    if (S.eggY == null) S.eggY = g.by - 8 - g.ry;
    if (!S.dragE) {
      const f = clamp((S.eggY + g.ry - g.wt) / (2 * g.ry), 0, 1), rl = B8.rho(S);
      let a = 9.8 * (rl * f / B8.rhoE - 1) * 60; if (B8.state(S) === 'hang' && f >= 1) a = ((g.wt + g.by) / 2 - S.eggY) * 1.2;
      S.eggV += a * dt; S.eggV *= Math.exp(-dt * 4); S.eggY += S.eggV * dt;
      const lo = g.by - 8 - g.ry; if (S.eggY > lo) { S.eggY = lo; S.eggV = 0; }
      if (S.eggY < g.wt - g.ry) { S.eggY = g.wt - g.ry; S.eggV = Math.max(0, S.eggV); }
    }
    const st = B8.state(S); if (st !== S._st) { if (S._st && st !== 'sink') K.cheer(S, g.gx, g.wt); S._st = st; }
  },
  draw(ctx, w, h, S) {
    const p = S.p, g = B8.geo(S), rl = B8.rho(S), st = B8.state(S); K.bg(ctx, w, h, { benchY: g.by });
    const x0 = g.gx - g.gw / 2, x1 = g.gx + g.gw / 2, salty = clamp(S.dis / 40, 0, 1);
    C3.liquid(ctx, x0 + 3, g.wt, g.gw - 6, g.by - g.wt - 3, salty > .05 ? '#5eead4' : '#7dd3fc', .45 + salty * .15);
    // undissolved salt pile
    if (S.und > .2) K.raw(ctx, () => { const pw = Math.min(g.gw * .7, 20 + S.und * 3); ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#cbd5e1'; ctx.beginPath(); ctx.ellipse(g.gx, g.by - 4, pw / 2, Math.min(14, 3 + S.und * .5), 0, Math.PI, TAU); ctx.fill(); ctx.stroke(); });
    // egg
    if (S.eggY != null) K.raw(ctx, () => { const gg = ctx.createRadialGradient(g.gx - g.rx * .3, S.eggY - g.ry * .4, 3, g.gx, S.eggY, g.rx * 1.1); gg.addColorStop(0, '#fffbeb'); gg.addColorStop(1, '#d6a36b'); ctx.fillStyle = gg; ctx.beginPath(); ctx.ellipse(g.gx, S.eggY, g.rx, g.ry, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.5; ctx.stroke(); });
    // grains
    K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#94a3b8'; S.grains.forEach(q => { ctx.fillRect(q.x - 2, q.y - 2, 4, 4); ctx.strokeRect(q.x - 2, q.y - 2, 4, 4); }); });
    // front water tint
    K.raw(ctx, () => { ctx.globalAlpha = .18; ctx.fillStyle = '#38bdf8'; ctx.fillRect(x0 + 3, g.wt, g.gw - 6, g.by - g.wt - 3); ctx.globalAlpha = 1; });
    // stirring rod
    const rx = g.gx + g.gw * .28 + S.rodX; K.raw(ctx, () => { ctx.strokeStyle = 'rgba(148,163,184,.9)'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(rx + 14, g.by - g.gh - 50); ctx.lineTo(rx, g.by - 14); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 2; ctx.stroke(); ctx.lineCap = 'butt'; if (S.stir > .1) { ctx.strokeStyle = `rgba(255,255,255,${S.stir * .7})`; ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(g.gx, g.by - 40 - k * 40, g.gw * .35, 6, 0, S.t * 5 + k, S.t * 5 + k + 2); ctx.stroke(); } } });
    // glass
    K.raw(ctx, () => { ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0 - 4, g.by - g.gh); ctx.lineTo(x0, g.by); ctx.lineTo(x1, g.by); ctx.lineTo(x1 + 4, g.by - g.gh); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(x0 + 7, g.by - g.gh + 10, 6, g.gh - 30); });
    // forces
    if (p.forces && S.eggY != null) { const f = clamp((S.eggY + g.ry - g.wt) / (2 * g.ry), 0, 1), Wl = 50, Fb = 50 * rl * f / B8.rhoE; C3.arrow(ctx, g.gx - 8, S.eggY, g.gx - 8, S.eggY + Wl, '#dc2626', 4); C3.arrow(ctx, g.gx + 8, S.eggY, g.gx + 8, S.eggY - Fb, '#16a34a', 4); if (p.labels) { C3.T(ctx, 'الوزن', g.gx - 40, S.eggY + Wl, { s: 11, c: '#fff', bg: '#dc2626' }); C3.T(ctx, 'قوة الطفو', g.gx + 50, S.eggY - Fb, { s: 11, c: '#fff', bg: '#16a34a' }); } }
    // salt jar (draggable: tilt over the glass and shake to pour; click = one spoon)
    { const J = B8.jar(S, g), sh = S.jarDrag ? Math.sin(S.t * 60) * 3 * Math.min(1, S.shake) : 0, home = S.jarX == null;
      if (home) K.raw(ctx, () => { ctx.strokeStyle = '#a16207'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(g.jx + 20, g.jy - 90); ctx.lineTo(g.jx + 60, g.jy - 130); ctx.stroke(); ctx.lineCap = 'butt'; });
      K.raw(ctx, () => { ctx.save(); ctx.translate(J.x + sh, J.y); ctx.rotate(J.a); ctx.fillStyle = '#e0f2fe'; rr(ctx, -34, -34, 68, 80, 12); ctx.fill(); ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#f8fafc'; rr(ctx, -30, -6, 60, 48, 8); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(-30, 0, 60, 42); ctx.fillStyle = '#0369a1'; rr(ctx, -36, -46, 72, 16, 6); ctx.fill(); ctx.fillStyle = '#e2e8f0'; for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.arc(k * 11, -38, 2.4, 0, TAU); ctx.fill(); }
        ctx.fillStyle = '#0369a1'; ctx.font = '900 16px Tajawal,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'rtl'; ctx.fillText('ملح', 0, 18); ctx.restore(); ctx.textBaseline = 'alphabetic'; });
      if (p.labels) C3.T(ctx, 'ملاعق: ' + S.sp, g.jx, g.jy + 26, { s: 12, c: '#fff', bg: '#0369a1' });
      if (S.jarDrag && p.labels) C3.T(ctx, Math.abs(J.a) > 1.3 ? 'هزّ العلبة لتنثر ملحاً أكثر ↕' : 'قرّبها فوق الكأس لتميل وتصبّ', J.x, J.y - 74, { s: 11.5, c: '#fff', bg: '#0369a1' }); }
    // density bars
    if (p.bars) { const bx = 64 + 40, base = g.by - 20, sc = 1400; K.raw(ctx, () => { [[B8.rhoE, '#d97706'], [rl, '#0d9488']].forEach(([v, c], i) => { const hh = (v - .95) * sc; ctx.fillStyle = c; rr(ctx, bx + i * 50, base - hh, 36, hh, 6); ctx.fill(); }); }); C3.T(ctx, 'البيضة', bx + 18, base + 14, { s: 11, c: '#92400e' }); C3.T(ctx, 'الماء', bx + 68, base + 14, { s: 11, c: '#0f766e' }); C3.T(ctx, B8.rhoE.toFixed(3), bx + 18, base - (B8.rhoE - .95) * sc - 12, { s: 11, mono: 1, c: '#92400e' }); C3.T(ctx, rl.toFixed(3), bx + 68, base - (rl - .95) * sc - 12, { s: 11, mono: 1, c: '#0f766e' }); C3.T(ctx, 'الكثافة g/cm³', bx + 43, base - 230, { s: 11.5, c: '#334155' }); }
    // cases inset
    if (p.cases) { const cx = w - 150, cy = 90, cw = 230, ch = 150; K.raw(ctx, () => { ctx.fillStyle = 'rgba(186,230,253,.95)'; rr(ctx, cx - cw / 2, cy, cw, ch, 10); ctx.fill(); ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.ellipse(cx - 70, cy + 16, 18, 10, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(cx - 56, cy + 2, 7, 0, TAU); ctx.fill(); ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.moveTo(cx - 50, cy + 1); ctx.lineTo(cx - 42, cy + 4); ctx.lineTo(cx - 50, cy + 6); ctx.fill();
      ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.ellipse(cx, cy + 75, 20, 9, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.moveTo(cx - 18, cy + 75); ctx.lineTo(cx - 30, cy + 66); ctx.lineTo(cx - 30, cy + 84); ctx.fill();
      ctx.fillStyle = '#78716c'; ctx.beginPath(); ctx.moveTo(cx + 50, cy + ch - 4); ctx.lineTo(cx + 58, cy + ch - 26); ctx.lineTo(cx + 84, cy + ch - 30); ctx.lineTo(cx + 96, cy + ch - 4); ctx.fill(); });
      C3.T(ctx, 'بطة تطفو: ρ أقل', cx + 30, cy + 16, { s: 10.5, c: '#0f172a' }); C3.T(ctx, 'سمكة معلقة: ρ متساوية', cx + 50, cy + 60, { s: 10.5, c: '#0f172a' }); C3.T(ctx, 'صخرة تغوص: ρ أكبر', cx - 30, cy + ch - 16, { s: 10.5, c: '#0f172a' }); }
    const names = { sink: 'البيضة تغوص ⬇ (كثافتها أكبر من كثافة الماء)', hang: 'البيضة معلقة ⚖️ (كثافتها = كثافة الماء المالح)', float: 'البيضة تطفو ⬆ (كثافتها أقل من كثافة الماء المالح)' };
    if (p.labels) C3.T(ctx, names[st], g.gx, g.by - g.gh - 76, { s: 13, c: '#fff', bg: st === 'sink' ? '#b91c1c' : st === 'hang' ? '#7c3aed' : '#15803d' });
    C3.task(ctx, w, S.und > 3 ? 'حرّك الماء بالساق الزجاجية (اسحبها ↔) ليذوب الملح' : 'اسحب علبة الملح فوق الكأس وهزّها 🧂 (أو اضغط عليها لملعقة)', '#0f766e');
    K.party(ctx, S);
  },
  drags(S) {
    if (!S.W) return []; const g = B8.geo(S), rx = g.gx + g.gw * .28 + S.rodX;
    return [
      { id: 'salt', x: B8.jar(S, g).x, y: B8.jar(S, g).y, w: 80, h: 100, axis: 'xy', tip: 'اسحب علبة الملح فوق الكأس وهزّها لتنثر الملح، أو اضغط عليها لإضافة ملعقة', idle: 'اسحبني فوق الكأس وهزّني 🧂',
        down: S => { const J = B8.jar(S, g); S.jarX = J.x; S.jarY = J.y; S.jarDrag = true; },
        drag: (S, d) => { S.jarX = clamp(d.ox + d.x - d.sx, 100, S.W - 40); S.jarY = clamp(d.oy + d.y - d.sy, 70, g.by - 50); S.shake = Math.min(1.5, (S.shake || 0) + Math.hypot(d.dx, d.dy) * .012); },
        up: S => { S.jarDrag = false; },
        click: S => { S.sp++; for (let k = 0; k < 16; k++) S.grains.push({ x: g.gx + (Math.random() - .5) * 30, y: g.by - g.gh - 20 - Math.random() * 20, vx: (Math.random() - .5) * 40, vy: 0 }); } },
      { id: 'rod', x: rx + 8, y: g.by - g.gh * .6, w: 30, h: g.gh * .7, axis: 'x', tip: 'اسحب الساق يميناً ويساراً لتحريك الماء', hint: S.und > 3, drag: (S, d) => { S.rodX = clamp(S.rodX + d.dx, -g.gw * .5, 0); S.stir = Math.min(1, S.stir + Math.abs(d.dx) * .02); } },
      { id: 'egg', x: g.gx, y: S.eggY ?? g.by - 30, w: g.rx * 2, h: g.ry * 2, axis: 'y', hint: false, tip: 'اسحب البيضة داخل الماء ثم اتركها', down: S => { S.dragE = true; }, drag: (S, d) => { S.eggY = clamp(d.oy + d.y - d.sy, g.wt - g.ry, g.by - 8 - g.ry); S.eggV = 0; }, up: S => { S.dragE = false; } }
    ];
  },
  readings(S) { const st = B8.state(S); return [rd('ملاعق الملح', String(S.sp)), rd('الملح المذاب', S.dis.toFixed(1) + ' g'), rd('كثافة الماء المالح', B8.rho(S).toFixed(3) + ' g/cm³'), rd('كثافة البيضة', B8.rhoE + ' g/cm³'), rd('حالة البيضة', { sink: 'تغوص', hang: 'معلقة', float: 'طافية' }[st], 1)]; },
  record(S) { return { sp: S.sp, rho: +B8.rho(S).toFixed(3), st: { sink: 'تغوص', hang: 'معلقة', float: 'طافية' }[B8.state(S)] }; },
  cols: [['sp', 'ملاعق الملح'], ['rho', 'كثافة الماء (g/cm³)'], ['st', 'حالة البيضة']],
  explain(S) { const st = B8.state(S); return st === 'sink' ? 'كثافة البيضة (1.068 g/cm³) <b>أكبر</b> من كثافة الماء، فوزنها أكبر من قوة الطفو ← <b>تغوص</b>. أذب الملح لتزيد كثافة الماء.' : st === 'hang' ? 'كثافة الماء المالح أصبحت <b>مساوية</b> لكثافة البيضة: وزنها = قوة الطفو ← تبقى <b>معلقة</b> داخل الماء (كالسمكة).' : 'كثافة الماء المالح أصبحت <b>أكبر</b> من كثافة البيضة، فقوة الطفو تدفعها إلى الأعلى حتى تطفو (كالبطة).'; },
  quiz: [
    { q: 'ما الذي جعل البيضة ترتفع إلى الأعلى عند إذابة الملح في الماء؟', o: ['زادت كثافة الماء فزادت قوة الطفو', 'نقصت كثافة الماء', 'زاد وزن البيضة'], a: 0, why: 'الملح يزيد كثافة الماء، وقوة الطفو تزداد بزيادة كثافة السائل.' },
    { q: 'يبقى الجسم معلقاً تحت سطح السائل (كالسمكة) عندما تكون:', o: ['كثافة الجسم = كثافة السائل', 'كثافة الجسم أكبر من كثافة السائل', 'كثافة الجسم أقل من كثافة السائل'], a: 0, why: 'ص 54: وزن الجسم = قوة الطفو أو كثافة الجسم = كثافة السائل.' },
    { q: 'ما الذي يجعل قطعة حديد تغطس في الماء بينما تطفو على سطح الزئبق؟', o: ['كثافة الزئبق أكبر من كثافة الحديد', 'الزئبق أخف من الماء', 'الحديد يذوب في الماء'], a: 0, why: 'يطفو الجسم إذا كانت كثافته أقل من كثافة السائل (الزئبق 13.6 g/cm³).' }
  ]
});

/* =====================================================================
   9) الغواصة وتوازن البواخر (ص 55) — لعبة
   ===================================================================== */
const B9 = {
  geo(S) { const w = S.W, h = S.H, ys = h * .22, yb = h * .92; return { w, h, ys, yb, m2px: (yb - ys - 40) / 100 }; },
  newTarget(S) { const w = S.W || 800; S.tz = 20 + Math.round(Math.random() * 70); S.tx = 64 + 140 + Math.random() * (w - 64 - 330); S.hold = 0; },
  geoB(S) { const w = S.W, h = S.H, x0 = 64 + 30, x1 = w - 30, ws = h * .42, bot = h * .84; return { w, h, x0, x1, ws, bot }; }
};
X7({ id: 'g7_submarine', ch: 13, sec: 'الدرس 3', page: 55, kind: 'لعبة', title: 'الغواصة وتوازن البواخر (لعبة)',
  desc: 'قُد الغواصة! أدخل الماء إلى مستودعاتها لتغطس، وأخرجه بالهواء المضغوط لتصعد، وحاول الوصول إلى الكنز على العمق المطلوب. ثم اكتشف لماذا تطفو الباخرة الحديدية وتغطس كرة الحديد.',
  tags: 'غواصة باخرة طفو غطس كثافة مستودعات',
  tools: ['غواصة بمستودعات (خزانات موازنة)', 'هواء مضغوط', 'كرة حديد وباخرة حديد لهما الكتلة نفسها'],
  steps: ['اضغط «إدخال الماء 💧»: يدخل الماء إلى مستودعات الغواصة فيزداد وزنها فتغطس.', 'اضغط «إيقاف ✋» لتثبيت كمية الماء، و«هواء مضغوط 💨» لطرد الماء فتصعد الغواصة.', 'اسحب الغواصة يميناً ويساراً، وحاول إيقافها عند الكنز 🎯 على العمق المطلوب لتربح نقطة.', 'راقب ضغط الماء على جسم الغواصة كلما غاصت أعمق.', 'انتقل إلى مشهد «الكرة والباخرة»: الكتلة نفسها من الحديد. اسحب جانب الباخرة لتوسيع تجويفها حتى تطفو.'],
  concl: ['تغوص الغواصة عندما يدخل الماء إلى مستودعاتها فيزداد وزنها، وتصعد عندما يُطرد الماء بالهواء المضغوط.', 'تطفو الباخرة إذا جعلنا فيها تجويفاً كبيراً فيزداد حجمها وتقل كثافتها الكلية فتصبح أقل من كثافة الماء.', 'كرة الحديد تغطس لأن كثافتها (7.86 g/cm³) أكبر من كثافة الماء.'],
  laws: ['g7_buoy', 'g7_rho'],
  fact: ['يمكن للغواصات الغوص حتى 6500 m بسبب امتلاكها هياكل قوية جداً لتحمل ضغط المياه.', 'السمكة تغيّر عمقها بتغيير كمية الغاز في كيس هوائي داخل جسمها (المثانة الهوائية).', 'المبتدئ في السباحة يستعين بإطار مطاطي منفوخ لأنه يزيد الحجم فتزداد قوة الطفو.'],
  controls: [
    SEL('mode', 'المشهد', [['game', 'لعبة الغواصة'], ['ship', 'الكرة والباخرة']], 'game'),
    BT('', [{ t: 'هدف جديد 🎯', on: S => B9.newTarget(S) }]),
    TG('press', 'ضغط الماء على الغواصة', true, null, 'force'), TG('forces', 'الوزن وقوة الطفو', true, null, 'vector'), TG('tanks', 'مقطع المستودعات', true, null, 'eye'), TG('labels', 'الأسماء والقيم', true, null, 'labels')],
  setup(S) { Object.assign(S, { b: .2, z: 4.2, v: 0, valve: 'hold', subX: null, score: 0, hold: 0, bw: 90, ballY: null, boatY: null, ballV: 0, boatV: 0, dragO: '' }); B9.newTarget(S); },
  update(S, dt) {
    if (!S.W) return; dt = Math.min(dt, .05);
    if (S.p.mode === 'game') {
      const T = dt * 3; if (S.valve === 'fill') S.b = Math.min(1, S.b + .06 * T); if (S.valve === 'blow') S.b = Math.max(0, S.b - .08 * T);
      const m = 900 + 200 * S.b, f = clamp((S.z + 5) / 10, 0, 1), Fb = 1025 * f; const a = (m - Fb) / (m * 2) * 9.8 - .012 * S.v * Math.abs(S.v);
      S.v += a * T; S.z += S.v * T; if (S.z > 95) { S.z = 95; S.v = 0; }
      const g = B9.geo(S); if (S.subX == null) S.subX = 64 + (S.W - 64) * .4;
      if (Math.abs(S.z - S.tz) < 4 && Math.abs(S.subX - S.tx) < 60) { S.hold += dt; if (S.hold > 1.2) { S.score++; K.cheer(S, S.tx, g.ys + S.tz * g.m2px); B9.newTarget(S); } } else S.hold = 0;
    } else {
      const g = B9.geoB(S), V = S.bw * 14, rhoB = 2000 / V, hb = 50, rB = 22;
      if (S.ballY == null) { S.ballY = g.ws - 90; S.boatY = g.ws - 90; }
      const step = (key, vk, target, isDrag) => { if (isDrag) { S[vk] = 0; return; } if (S[key] < g.ws) S[vk] += 900 * dt; else { S[vk] += (target - S[key]) * 12 * dt; S[vk] *= Math.exp(-dt * 4); } S[key] += S[vk] * dt; if (S[key] > g.bot - 2) { S[key] = g.bot - 2; S[vk] = 0; } };
      step('ballY', 'ballV', g.bot - 2, S.dragO === 'ball');
      step('boatY', 'boatV', rhoB < 1 ? g.ws + rhoB * hb : g.bot - 2, S.dragO === 'boat');
    }
  },
  draw(ctx, w, h, S) {
    const p = S.p;
    if (p.mode === 'game') {
      const g = B9.geo(S); if (S.subX == null) S.subX = 64 + (w - 64) * .4;
      K.bg(ctx, w, h, { benchY: g.ys, tiles: false, bench: false, top: '#7dd3fc', bottom: '#e0f2fe' });
      K.raw(ctx, () => { const sg = ctx.createLinearGradient(0, g.ys, 0, g.yb); sg.addColorStop(0, '#38bdf8'); sg.addColorStop(1, '#0c4a6e'); ctx.fillStyle = sg; ctx.fillRect(0, g.ys, w, h - g.ys); ctx.fillStyle = '#d6b370'; ctx.beginPath(); ctx.moveTo(0, g.yb); for (let x = 0; x <= w; x += 40) ctx.lineTo(x, g.yb - 6 * Math.sin(x * .03)); ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 2; ctx.beginPath(); for (let x = 0; x <= w; x += 10) ctx.lineTo(x, g.ys + 3 * Math.sin(x * .05 + S.t * 2)); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.font = '700 11px monospace'; ctx.textAlign = 'left'; for (let z = 0; z <= 100; z += 20) { const y = g.ys + z * g.m2px; ctx.fillRect(64 + 4, y, 14, 2); ctx.fillText(z + ' m', 64 + 22, y + 4); }
        for (let k = 0; k < 4; k++) { const fx = (k * 211 + S.t * 30 * (k % 2 ? 1 : -1)) % (w - 64); const x = (fx < 0 ? fx + w - 64 : fx) + 64, y = g.ys + 60 + k * 90; ctx.fillStyle = ['#f97316', '#facc15', '#f472b6', '#a3e635'][k]; ctx.beginPath(); ctx.ellipse(x, y, 12, 6, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.moveTo(x + (k % 2 ? -12 : 12), y); ctx.lineTo(x + (k % 2 ? -20 : 20), y - 6); ctx.lineTo(x + (k % 2 ? -20 : 20), y + 6); ctx.fill(); } });
      // target
      const ty = g.ys + S.tz * g.m2px; K.raw(ctx, () => { ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.ellipse(S.tx, ty, 70, 4 * g.m2px + 12, 0, 0, TAU); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = 'rgba(250,204,21,.18)'; ctx.fill(); });
      C3.T(ctx, '🎯 الكنز: ' + S.tz + ' m', S.tx, ty - 4 * g.m2px - 24, { s: 12, c: '#0f172a', bg: '#fde047' });
      if (S.hold > 0) C3.T(ctx, 'ثبّت… ' + (1.2 - S.hold).toFixed(1), S.tx, ty + 4 * g.m2px + 26, { s: 12, c: '#fff', bg: '#16a34a' });
      // submarine
      const sy = g.ys + S.z * g.m2px, L = clamp(w * .2, 130, 190), H = L * .3, x = S.subX;
      if (p.press && S.z > -3) { const P = 101.3 + 10.05 * Math.max(0, S.z), Lp = 6 + P / 1100 * 40; for (let k = 0; k < 10; k++) { const a = k * TAU / 10; const ex = x + Math.cos(a) * L / 2, ey = sy + Math.sin(a) * H / 2; if (ey < g.ys) continue; C3.arrow(ctx, ex + Math.cos(a) * (Lp + 4), ey + Math.sin(a) * (Lp + 4), ex + Math.cos(a) * 3, ey + Math.sin(a) * 3, '#f97316', 2.2); } }
      K.raw(ctx, () => { ctx.fillStyle = '#facc15'; ctx.strokeStyle = '#854d0e'; ctx.lineWidth = 2; rr(ctx, x - L * .12, sy - H / 2 - H * .5, L * .24, H * .6, 6); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, sy - H - H * .1); ctx.lineTo(x, sy - H - H * .5); ctx.lineTo(x + 12, sy - H - H * .5); ctx.stroke();
        const sg = ctx.createLinearGradient(0, sy - H / 2, 0, sy + H / 2); sg.addColorStop(0, '#fde047'); sg.addColorStop(1, '#ca8a04'); ctx.fillStyle = sg; ctx.beginPath(); ctx.ellipse(x, sy, L / 2, H / 2, 0, 0, TAU); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#e0f2fe'; [-.2, 0, .2].forEach(k => { ctx.beginPath(); ctx.arc(x + k * L, sy - H * .1, H * .13, 0, TAU); ctx.fill(); ctx.stroke(); });
        ctx.save(); ctx.translate(x - L / 2 - 6, sy); ctx.fillStyle = '#475569'; const a = S.t * 12; ctx.fillRect(-3, -H * .35 * Math.cos(a), 6, H * .7 * Math.cos(a)); ctx.restore();
        if (p.tanks) { const tw = L * .7, th = H * .28, tx = x - tw / 2, tyy = sy + H * .12; ctx.fillStyle = '#fff'; rr(ctx, tx, tyy, tw, th, 4); ctx.fill(); ctx.fillStyle = '#0284c7'; ctx.fillRect(tx + 1, tyy + th * (1 - S.b), tw - 2, th * S.b); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; rr(ctx, tx, tyy, tw, th, 4); ctx.stroke(); } });
      if (S.valve === 'blow' && S.b > 0) K.raw(ctx, () => { for (let k = 0; k < 8; k++) { const ph = (S.t * 1.5 + k / 8) % 1; ctx.strokeStyle = `rgba(255,255,255,${1 - ph})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x + (k - 4) * 8, sy + H / 2 - ph * 60 - 10 + (k % 2) * 5, 3 + k % 3, 0, TAU); ctx.stroke(); } });
      if (S.valve === 'fill' && S.b < 1) for (let k = -1; k <= 1; k++) C3.arrow(ctx, x + k * L * .2, sy + H / 2 + 22, x + k * L * .2, sy + H / 2 - 2, '#0ea5e9', 2.5);
      if (p.forces) { const m = 900 + 200 * S.b, f = clamp((S.z + 5) / 10, 0, 1), Fb = 1025 * f, k = .07; C3.arrow(ctx, x - 20, sy, x - 20, sy + m * k, '#dc2626', 4); C3.arrow(ctx, x + 20, sy, x + 20, sy - Fb * k, '#16a34a', 4); if (p.labels) { C3.T(ctx, 'الوزن', x - 20, sy + m * k + 14, { s: 11, c: '#fff', bg: '#dc2626' }); C3.T(ctx, 'الطفو', x + 20, sy - Fb * k - 14, { s: 11, c: '#fff', bg: '#16a34a' }); } }
      // control buttons & dashboard
      const bx = w - 100; [['fill', 'إدخال الماء 💧', '#0284c7'], ['hold', 'إيقاف ✋', '#475569'], ['blow', 'هواء مضغوط 💨', '#16a34a']].forEach(([k, l, c], i) => C3.btn(ctx, bx, 84 + i * 46, 160, 38, l, c, S.valve === k));
      const P = 101.3 + 10.05 * Math.max(0, S.z);
      if (p.labels) C3.card(ctx, 64 + 150, 50, [`العمق: ${Math.max(0, S.z).toFixed(1)} m`, `ضغط الماء: ${Math.round(P)} kPa`, `الماء في المستودعات: ${Math.round(S.b * 100)}%`, `النقاط: ${S.score} ⭐`], { s: 12.5, bd: '#0369a1', hi: 3, hc: '#b45309' });
      C3.task(ctx, w, S.z < 0 && S.b < .5 ? 'اضغط «إدخال الماء 💧» لتغطس الغواصة' : 'أوصل الغواصة إلى الكنز 🎯 وثبّتها هناك', '#0369a1');
    } else {
      const g = B9.geoB(S); K.bg(ctx, w, h, { benchY: g.bot + 6 });
      C3.liquid(ctx, g.x0 + 3, g.ws, g.x1 - g.x0 - 6, g.bot - g.ws, '#38bdf8', .5);
      K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.x0, g.ws - 90); ctx.lineTo(g.x0, g.bot); ctx.lineTo(g.x1, g.bot); ctx.lineTo(g.x1, g.ws - 90); ctx.stroke(); });
      if (S.ballY == null) { S.ballY = g.ws - 90; S.boatY = g.ws - 90; }
      const bx = g.x0 + (g.x1 - g.x0) * .25, rB = 22; K.ball(ctx, bx, S.ballY - rB, rB, '#64748b');
      const V = S.bw * 14, rhoB = 2000 / V, hb = 50, ox = g.x0 + (g.x1 - g.x0) * .64, by2 = S.boatY;
      K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, by2 - hb, 0, by2); gg.addColorStop(0, '#94a3b8'); gg.addColorStop(1, '#475569'); ctx.fillStyle = gg; ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ox - S.bw / 2 - 14, by2 - hb); ctx.lineTo(ox + S.bw / 2 + 14, by2 - hb); ctx.lineTo(ox + S.bw / 2, by2); ctx.lineTo(ox - S.bw / 2, by2); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(ox - S.bw / 2 - 6, by2 - hb + 5, S.bw + 12, 4); ctx.fillStyle = '#f8fafc'; ctx.fillRect(ox - S.bw / 2 - 8, by2 - hb, S.bw + 16, hb * .12); });
      K.raw(ctx, () => { ctx.globalAlpha = .25; ctx.fillStyle = '#38bdf8'; ctx.fillRect(g.x0 + 3, g.ws, g.x1 - g.x0 - 6, g.bot - g.ws); ctx.globalAlpha = 1; });
      // width handle
      K.raw(ctx, () => { ctx.fillStyle = '#7c3aed'; ctx.beginPath(); ctx.arc(ox + S.bw / 2 + 14, by2 - hb, 9, 0, TAU); ctx.fill(); });
      if (p.labels) { C3.T(ctx, 'كرة حديد 2 kg', bx, g.ws - 130, { s: 12, c: '#fff', bg: '#475569' }); C3.T(ctx, 'ρ = 7.86 g/cm³ ← تغوص', bx, g.ws - 106, { s: 11.5, c: '#b91c1c' });
        C3.T(ctx, 'باخرة حديد 2 kg', ox, g.ws - 130, { s: 12, c: '#fff', bg: '#475569' }); C3.T(ctx, `الحجم ${Math.round(V)} cm³ ← الكثافة الكلية ${rhoB.toFixed(2)} g/cm³`, ox, g.ws - 106, { s: 11.5, c: rhoB < 1 ? '#15803d' : '#b91c1c' }); }
      C3.T(ctx, rhoB < 1 ? 'تطفو ✓ كثافتها الكلية أقل من الماء' : 'تغوص — وسّع التجويف', ox, g.ws + 90 > g.bot - 30 ? g.bot - 30 : g.ws + 90, { s: 12.5, c: '#fff', bg: rhoB < 1 ? '#15803d' : '#b91c1c' });
      if (rhoB < 1 && !S._fl) { S._fl = true; K.cheer(S, ox, g.ws); } if (rhoB >= 1) S._fl = false;
      C3.task(ctx, w, 'اسحب المقبض البنفسجي لتوسيع تجويف الباخرة ↔ واسحب الكرة والباخرة وأسقطهما في الماء', '#0f766e');
    }
    K.party(ctx, S);
  },
  drags(S) {
    if (!S.W) return []; const p = S.p, w = S.W, L = [];
    if (p.mode === 'game') { const g = B9.geo(S), Lw = clamp(w * .2, 130, 190), bx = w - 100; if (S.subX == null) return [];
      L.push({ id: 'sub', x: S.subX, y: g.ys + S.z * g.m2px, w: Lw, h: Lw * .4, axis: 'x', tip: 'اسحب الغواصة يميناً أو يساراً', idle: 'اسحبني ↔', hint: false, drag: (S, d) => { S.subX = clamp(d.ox + d.x - d.sx, 64 + 100, w - 200); } });
      [['fill', 'إدخال الماء'], ['hold', 'إيقاف'], ['blow', 'هواء مضغوط']].forEach(([k, t], i) => L.push({ id: 'v_' + k, x: bx, y: 84 + i * 46, w: 160, h: 38, hint: k === 'fill' && S.b < .5, idle: k === 'fill' ? 'اضغط هنا ✋' : undefined, tip: t, click: S => { S.valve = k; } })); }
    else { const g = B9.geoB(S), bx = g.x0 + (g.x1 - g.x0) * .25, ox = g.x0 + (g.x1 - g.x0) * .64; if (S.ballY == null) return [];
      const mk = (id, x, key, ww, hh) => ({ id, x, y: S[key] - hh / 2, w: ww, h: hh, axis: 'y', tip: 'اسحب إلى الأعلى ثم اترك', hint: false, down: S => { S.dragO = id; }, drag: (S, d) => { S[key] = clamp(d.oy + hh / 2 + d.y - d.sy, 60 + hh, g.bot - 2); }, up: S => { S.dragO = ''; } });
      L.push(mk('ball', bx, 'ballY', 50, 46)); L.push(mk('boat', ox, 'boatY', S.bw + 20, 50));
      L.push({ id: 'width', x: ox + S.bw / 2 + 14, y: S.boatY - 50, r: 14, axis: 'x', tip: 'اسحب لتوسيع تجويف الباخرة (زيادة حجمها)', idle: 'اسحبني لتوسيع الباخرة ↔', drag: (S, d) => { S.bw = clamp(S.bw + d.dx * 2, 50, Math.min(280, (g.x1 - ox) * 2 - 60)); } }); }
    return L;
  },
  readings(S) { if (S.p.mode === 'game') { const m = 900 + 200 * S.b; return [rd('العمق', Math.max(0, S.z).toFixed(1) + ' m'), rd('ضغط الماء', Math.round(101.3 + 10.05 * Math.max(0, S.z)) + ' kPa'), rd('كتلة الغواصة', Math.round(m) + ' t'), rd('الماء في المستودعات', Math.round(S.b * 100) + '%'), rd('النقاط', String(S.score))]; } const V = S.bw * 14; return [rd('كتلة الكرة = كتلة الباخرة', '2 kg'), rd('حجم الباخرة', Math.round(V) + ' cm³'), rd('كثافتها الكلية', (2000 / V).toFixed(2) + ' g/cm³'), rd('الباخرة', 2000 / V < 1 ? 'تطفو' : 'تغوص', 1)]; },
  explain(S) { if (S.p.mode === 'ship') return 'للكرة والباخرة الكتلة نفسها، لكن تجويف الباخرة <b>يزيد حجمها</b> فتقل <b>كثافتها الكلية</b> (ρ = m/V). عندما تصبح أقل من كثافة الماء تطفو.'; const m = 900 + 200 * S.b; return m > 1025 ? 'المستودعات مملوءة بالماء: <b>وزن الغواصة أكبر من قوة الطفو</b> ← تغوص.' : m < 1020 ? 'الهواء المضغوط طرد الماء: <b>وزنها أقل من قوة الطفو</b> (وهي مغمورة) ← تصعد إلى السطح.' : 'وزن الغواصة ≈ قوة الطفو ← تبقى معلقة على العمق نفسه.'; },
  quiz: [
    { q: 'تغوص الغواصة عندما تثقل بإدخال الماء إلى مستودعاتها لغرض:', o: ['زيادة وزنها', 'زيادة حجمها', 'تقليل حجمها'], a: 0, why: 'مراجعة الفصل: إدخال الماء يزيد وزنها فتغطس.' },
    { q: 'تطفو البواخر إذا جعلنا فيها تجويفاً كبيراً بسبب:', o: ['زيادة حجمها ونقصان كثافتها', 'بقاء حجمها وكثافتها ثابتين', 'قلة حجمها وزيادة كثافتها'], a: 0, why: 'التجويف يزيد الحجم فتقل الكثافة الكلية عن كثافة الماء.' },
    { q: 'كيف تعود الغواصة إلى سطح الماء؟', o: ['بإدخال مزيد من الماء', 'بطرد الماء من مستودعاتها بالهواء المضغوط', 'بزيادة وزنها'], a: 1, why: 'ص 55: تعود إلى السطح عندما يفرغ الماء بإحلاله بهواء مضغوط.' }
  ]
});
