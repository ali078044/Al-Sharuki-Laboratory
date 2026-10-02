'use strict';
/* =====================================================================
   Chapter 2 (electromagnetic induction) — PhET-style upgrades (group ch2)
   lorentz · faraday_ring · motional · generator · motor · mutual ·
   app_guitar · app_stove (drags + field)
   ===================================================================== */
(() => {
  const EXC = id => EXPS.find(e => e.id === id);
  const nowS = () => performance.now() / 1000;
  const wrapA = a => ((a % TAU) + TAU) % TAU;

  /* ---------- small drawing helpers (theme-aware: dark-scene colours are remapped in book look) ---------- */
  function sym2(ctx, x, y, r, out, col, lw = 1.8) {
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke();
    if (out) { ctx.beginPath(); ctx.arc(x, y, Math.max(1.6, r * .3), 0, TAU); ctx.fill(); }
    else { const k = r * .58; ctx.beginPath(); ctx.moveTo(x - k, y - k); ctx.lineTo(x + k, y + k); ctx.moveTo(x + k, y - k); ctx.lineTo(x - k, y + k); ctx.stroke(); }
  }
  function box2(ctx, x, y, w, h, r = 10) { ctx.fillStyle = 'rgba(15,23,42,.82)'; rr(ctx, x, y, w, h, r); ctx.fill(); ctx.strokeStyle = 'rgba(148,163,184,.5)'; ctx.lineWidth = 1; ctx.stroke(); }
  function chev(ctx, x, y, a, s, col) { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(s, 0); ctx.lineTo(-s * .75, -s * .8); ctx.lineTo(-s * .2, 0); ctx.lineTo(-s * .75, s * .8); ctx.closePath(); ctx.fill(); ctx.restore(); }
  function flow2(ctx, pts, phase, col, sp = 26, s = 6) {
    const seg = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); tot += l; }
    const off = ((phase % sp) + sp) % sp;
    for (let d = off; d < tot; d += sp) { let r = d, i = 0; while (i < seg.length - 1 && r > seg[i]) { r -= seg[i]; i++; } const a = pts[i], b = pts[i + 1]; const t = seg[i] ? clamp(r / seg[i], 0, 1) : 0; chev(ctx, lerp(a[0], b[0], t), lerp(a[1], b[1], t), Math.atan2(b[1] - a[1], b[0] - a[0]), s, col); }
  }
  function scope2(ctx, x, y, w, h, ser, title, span = 5) {
    box2(ctx, x, y, w, h);
    let t1 = span; ser.forEach(s => { if (s.pts.length) t1 = Math.max(t1, s.pts[s.pts.length - 1][0]); }); const t0 = t1 - span;
    const my = y + h / 2 + 9, ah = h / 2 - 17;
    ctx.strokeStyle = 'rgba(148,163,184,.55)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(x + 8, my); ctx.lineTo(x + w - 8, my); ctx.stroke(); ctx.setLineDash([]);
    ser.forEach(s => { ctx.strokeStyle = s.col; ctx.lineWidth = 2; ctx.beginPath(); let st = false; s.pts.forEach(([t, v]) => { if (t < t0) return; const X = x + 8 + (t - t0) / span * (w - 16), Y = my - clamp(v / s.max, -1.1, 1.1) * ah; if (st) ctx.lineTo(X, Y); else { ctx.moveTo(X, Y); st = true; } }); ctx.stroke(); });
    G.text(ctx, title, x + w - 10, y + 13, { s: 11.5, w: 800, c: '#e2e8f0', a: 'right' });
    let lx = x + 10; ser.forEach(s => { G.text(ctx, s.name, lx, y + 13, { s: 11.5, w: 900, c: s.col, a: 'left' }); ctx.font = '900 11.5px Tajawal,sans-serif'; lx += ctx.measureText(s.name).width + 14; });
  }
  function lbl(ctx, s, x, y, col, o = {}) { G.text(ctx, s, x, y, Object.assign({ s: 12, w: 800, c: '#fff', bg: col }, o)); }
  function bulb(ctx, x, y, r, g) { // lamp with glow g∈[0,1]
    if (g > .03) G.glow(ctx, x, y, r * 3 + 40 * g, 'rgba(255,200,60,A)', Math.min(1, g));
    setRaw(ctx, 1); ctx.fillStyle = g > .05 ? `rgba(255,${Math.round(236 - 40 * g)},${Math.round(150 - 100 * g)},1)` : 'rgba(226,232,240,.9)'; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); setRaw(ctx, 0);
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.stroke();
    ctx.strokeStyle = g > .05 ? '#b45309' : '#94a3b8'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x - r * .5, y + r * .3); ctx.lineTo(x - r * .25, y - r * .3); ctx.lineTo(x, y + r * .3); ctx.lineTo(x + r * .25, y - r * .3); ctx.lineTo(x + r * .5, y + r * .3); ctx.stroke();
  }
  function cell(ctx, x, y, vertical, lab) { // battery symbol: long plate (+) first (top / left)
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath();
    if (vertical) { ctx.moveTo(x - 16, y - 5); ctx.lineTo(x + 16, y - 5); ctx.stroke(); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x - 8, y + 5); ctx.lineTo(x + 8, y + 5); ctx.stroke(); G.text(ctx, '+', x + 24, y - 9, { s: 14, w: 900, c: '#dc2626' }); G.text(ctx, '−', x + 24, y + 9, { s: 14, w: 900, c: '#2563eb' }); }
    else { ctx.moveTo(x - 5, y - 16); ctx.lineTo(x - 5, y + 16); ctx.stroke(); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x + 5, y - 8); ctx.lineTo(x + 5, y + 8); ctx.stroke(); G.text(ctx, '+', x - 12, y - 22, { s: 14, w: 900, c: '#dc2626' }); G.text(ctx, '−', x + 12, y - 22, { s: 14, w: 900, c: '#2563eb' }); }
    if (lab) G.text(ctx, lab, vertical ? x : x, vertical ? y + 30 : y + 28, { s: 12, w: 800, c: '#fde68a' });
  }

  /* ---------- measuring tools: show the perpendicular (in/out of page) field component in the field meter ---------- */
  if (typeof Interact !== 'undefined' && !Interact._ch2FieldZ) {
    Interact._ch2FieldZ = 1; const dm = Interact.drawMeter;
    Interact.drawMeter = function (ctx, S) {
      dm.call(this, ctx, S); const E = S.E, m = S._tl && S._tl.mp; if (!E || !E.fieldZ || !m) return;
      const bz = E.fieldZ(S, m.x, m.y) || 0; const by = m.y + 113;
      ctx.fillStyle = 'rgba(30,58,138,.95)'; rr(ctx, m.x - 88, by, 176, 26, 8); ctx.fill();
      ctx.direction = 'ltr'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#fde68a'; ctx.font = '800 12.5px ui-monospace,monospace';
      ctx.fillText('B⊥ = ' + fmtSI(Math.abs(bz), 'T') + (Math.abs(bz) > 1e-9 ? (bz > 0 ? '  ⊗' : '  ⊙') : ''), m.x, by + 13); ctx.textBaseline = 'alphabetic';
    };
  }

  /* =====================================================================
     1) Lorentz force / velocity selector (book fig. 6, p.48)
     ===================================================================== */
  (() => {
    const E = EXC('lorentz'); if (!E) return;
    E.controls = E.controls.concat([
      TG('bout', 'عكس اتجاه B (⊙ نحو خارج الصفحة)', false, null, 'flip'), TG('auto', 'إطلاق تلقائي للجسيمات', true, null, 'dot'),
      TG('elines', 'خطوط المجال الكهربائي E', true, null, 'efield'), TG('bsym', 'رموز المجال المغناطيسي ⊗', true, null, 'bfield'),
      TG('trace', 'أثر مسار الجسيم', true, null, 'ray'), TG('vec', 'متجها القوتين FE و FB', true, null, 'force'),
      TG('vel', 'متجه السرعة v', true, null, 'velocity'), TG('fbd', 'مخطط القوى المؤثرة في الشحنة', true, null, 'vector'), TG('lbl', 'تسميات توضيحية', true, null, 'labels')]);
    const geo = S => {
      const w = S.W || 820, h = S.H || 740; const x0 = w * .32, x1 = w * .84, cy = h * .47; const gap = (S.gap || .46) * h;
      const yT = cy - gap / 2, yB = cy + gap / 2, bT = h * .13, bB = h * .83; const gx = Math.max(122, x0 - 118);
      const gy = clamp(cy + (S.gy || 0), bT + 20, bB - 20); const vs = 9;
      const a = S.aim || 0, v = S.p.v; return { w, h, x0, x1, cy, yT, yB, bT, bB, gx, gy, mx: gx + 46, sx: w - 26, tx: gx + 46 + v * vs * Math.cos(a), ty: gy + v * vs * Math.sin(a), vs };
    };
    function fire(S) { const g = geo(S), p = S.p, v = p.v * 40, a = S.aim || 0; S.parts.push({ x: g.mx, y: g.gy, vx: v * Math.cos(a), vy: v * Math.sin(a), q: +p.q, alive: true, tr: [[g.mx, g.gy]], age: 0, fe: 0, fb: [0, 0] }); if (S.parts.length > 7) S.parts.shift(); }
    const bt = E.controls.find(c => c.type === 'buttons'); if (bt) bt.btns[0].on = S => fire(S);
    const oldSetup = E.setup;
    E.setup = S => { oldSetup(S); S.gap = .46; S.gy = 0; S.aim = 0; S.hits = []; S.fireT = .15; };
    E.update = (S, dt) => {
      const p = S.p, g = geo(S); S.x0 = g.x0; S.x1 = g.x1; S.cy = g.cy;
      if (p.auto !== false) { S.fireT -= dt; if (S.fireT < 0) { fire(S); S.fireT = 1.7; } }
      const Ef = p.eon ? p.E : 0, B = (p.bon ? p.B : 0) * (p.bout ? -1 : 1);
      for (const pt of S.parts) {
        pt.age += dt; if (!pt.alive) continue;
        for (let k = 0; k < 10; k++) {
          const d = dt / 10; const inX = pt.x > g.x0 && pt.x < g.x1; const inB = inX && pt.y > g.bT && pt.y < g.bB, inE = inX && pt.y > g.yT && pt.y < g.yB;
          const ux = pt.vx / 40, uy = pt.vy / 40; const fbx = inB ? 80 * pt.q * uy * B : 0, fby = inB ? -80 * pt.q * ux * B : 0, fe = inE ? 80 * pt.q * Ef : 0;
          pt.fb = [fbx, fby]; pt.fe = fe; pt.inF = inB || inE;
          pt.vx += fbx * d; pt.vy += (fby + fe) * d; const oy = pt.y; pt.x += pt.vx * d; pt.y += pt.vy * d;
          if (pt.x > g.x0 && pt.x < g.x1 && ((oy - g.yT) * (pt.y - g.yT) <= 0 || (oy - g.yB) * (pt.y - g.yB) <= 0)) { pt.alive = false; pt.y = Math.abs(pt.y - g.yT) < Math.abs(pt.y - g.yB) ? g.yT : g.yB; pt.age = 0; break; }
          if (pt.x >= g.sx) { pt.alive = false; pt.x = g.sx; pt.age = 0; S.hits.push({ y: pt.y, q: pt.q }); if (S.hits.length > 14) S.hits.shift(); break; }
        }
        pt.tr.push([pt.x, pt.y]); if (pt.tr.length > 500) pt.tr.shift();
        if (pt.x > S.W + 30 || pt.x < -30 || pt.y < -30 || pt.y > S.H + 30) { pt.alive = false; pt.age = 0; }
      }
      S.parts = S.parts.filter(q => q.alive || q.age < 3.5);
    };
    E.draw = (ctx, w, h, S) => {
      G.bg(ctx, w, h, false); const p = S.p, g = geo(S); const Bon = p.bon && p.B > 0, Eon = p.eon && p.E > 0; const L = p.lbl !== false;
      const Bs = p.bout ? '⊙' : '⊗';
      // B region
      ctx.fillStyle = Bon ? `rgba(37,99,235,${.04 + .08 * p.B})` : 'rgba(100,116,139,.04)'; ctx.fillRect(g.x0, g.bT, g.x1 - g.x0, g.bB - g.bT);
      ctx.strokeStyle = 'rgba(37,99,235,.45)'; ctx.setLineDash([6, 5]); ctx.lineWidth = 1.2; ctx.strokeRect(g.x0, g.bT, g.x1 - g.x0, g.bB - g.bT); ctx.setLineDash([]);
      if (Bon && p.bsym !== false) { const al = .3 + .55 * p.B; for (let x = g.x0 + 22; x < g.x1 - 8; x += 40) for (let y = g.bT + 22; y < g.bB - 8; y += 40) { if (Math.abs(y - g.yT) < 12 || Math.abs(y - g.yB) < 12) continue; sym2(ctx, x, y, 6, !!p.bout, `rgba(59,130,246,${al})`, 1.5); } }
      // plates
      ctx.fillStyle = Eon ? '#dc2626' : '#64748b'; ctx.fillRect(g.x0, g.yT - 12, g.x1 - g.x0, 12); ctx.fillStyle = Eon ? '#2563eb' : '#64748b'; ctx.fillRect(g.x0, g.yB, g.x1 - g.x0, 12);
      if (Eon) { const n = Math.round(4 + p.E * 2.6); for (let i = 0; i < n; i++) { const x = g.x0 + (i + .5) * (g.x1 - g.x0) / n; G.text(ctx, '+', x, g.yT - 6, { s: 13, w: 900, c: '#fff' }); G.text(ctx, '−', x, g.yB + 6, { s: 14, w: 900, c: '#fff' }); } }
      if (Eon && p.elines !== false) { const n = Math.round(2 + p.E * 2.4); for (let i = 0; i < n; i++) { const x = g.x0 + (i + .5) * (g.x1 - g.x0) / n + 10; G.arrow(ctx, x, g.yT + 2, x, g.yB - 3, 'rgba(234,88,12,.55)', 1.6, 9); } if (L) lbl(ctx, 'E = ' + fmt(p.E, 3) + '×10⁵ V/m', g.x0 + 70, g.yT + 18, 'rgba(234,88,12,.9)', { s: 11.5 }); }
      if (L) { G.text(ctx, Eon ? 'الصفيحة الموجبة (+)' : 'صفيحة (غير مشحونة)', (g.x0 + g.x1) / 2, g.yT - 24, { s: 11.5, c: '#fca5a5', bg: 'rgba(15,23,42,.75)' }); G.text(ctx, Eon ? 'الصفيحة السالبة (−)' : 'صفيحة (غير مشحونة)', (g.x0 + g.x1) / 2, g.yB + 26, { s: 11.5, c: '#93c5fd', bg: 'rgba(15,23,42,.75)' }); }
      // B badge (clickable)
      lbl(ctx, Bon ? `B ${Bs} ${fmt(p.B, 2)} T` : 'B = 0', g.x1 - 62, g.bT + 17, Bon ? '#2563eb' : '#64748b', { s: 12.5 });
      if (L) G.text(ctx, p.bout ? 'مجال مغناطيسي نحو خارج الصفحة' : 'مجال مغناطيسي نحو داخل الصفحة', g.x0 + 110, g.bT + 17, { s: 11, c: '#93c5fd', bg: 'rgba(15,23,42,.75)' });
      // screen + hits
      ctx.fillStyle = 'rgba(34,197,94,.35)'; ctx.fillRect(g.sx - 3, g.bT, 9, g.bB - g.bT); if (L) G.text(ctx, 'الشاشة', g.sx - 2, g.bB + 16, { s: 11, c: '#86efac' });
      S.hits.forEach((ht, i) => { ctx.globalAlpha = .3 + .7 * (i + 1) / S.hits.length; ctx.fillStyle = ht.q > 0 ? '#ef4444' : '#3b82f6'; ctx.beginPath(); ctx.arc(g.sx + 1, ht.y, 4, 0, TAU); ctx.fill(); }); ctx.globalAlpha = 1;
      // straight-line reference
      if (L) { ctx.strokeStyle = 'rgba(148,163,184,.55)'; ctx.setLineDash([5, 6]); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(g.mx, g.gy); ctx.lineTo(g.mx + 2000 * Math.cos(S.aim || 0), g.gy + 2000 * Math.sin(S.aim || 0)); ctx.stroke(); ctx.setLineDash([]); }
      // gun
      ctx.fillStyle = '#475569'; rr(ctx, g.gx - 42, g.gy - 17, 74, 34, 7); ctx.fill(); ctx.fillStyle = '#334155'; ctx.save(); ctx.translate(g.gx + 30, g.gy); ctx.rotate(S.aim || 0); ctx.fillRect(0, -6, 18, 12); ctx.restore();
      const qc = +p.q > 0 ? '#dc2626' : '#2563eb'; ctx.fillStyle = qc; ctx.beginPath(); ctx.arc(g.gx - 20, g.gy, 11, 0, TAU); ctx.fill(); G.text(ctx, +p.q > 0 ? '+q' : '−q', g.gx - 20, g.gy + 1, { s: 11, w: 900, c: '#fff' });
      G.text(ctx, 'اطلق', g.gx + 10, g.gy + 1, { s: 11, w: 900, c: '#fff' });
      if (L) G.text(ctx, 'مصدر الجسيمات المشحونة', g.gx - 6, g.gy + 32, { s: 11, c: '#cbd5e1' });
      // velocity handle
      G.arrow(ctx, g.mx, g.gy, g.tx, g.ty, '#16a34a', 3, 11); ctx.fillStyle = 'rgba(22,163,74,.25)'; ctx.beginPath(); ctx.arc(g.tx, g.ty, 10, 0, TAU); ctx.fill(); ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2; ctx.stroke();
      if (L) G.text(ctx, 'v = ' + fmt(p.v, 3) + '×10⁵', g.tx, g.ty - 20, { s: 11.5, w: 800, c: '#4ade80' });
      // particles
      for (const pt of S.parts) {
        const fade = pt.alive ? 1 : clamp(1 - pt.age / 3.5, 0, 1);
        if (p.trace !== false && pt.tr.length > 1) { ctx.globalAlpha = .85 * fade; ctx.strokeStyle = pt.q > 0 ? '#ef4444' : '#3b82f6'; ctx.lineWidth = 2.2; ctx.beginPath(); pt.tr.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); ctx.globalAlpha = 1; }
        if (!pt.alive) { if (pt.age < 1) { ctx.globalAlpha = 1 - pt.age; G.glow(ctx, pt.x, pt.y, 18, 'rgba(250,204,21,A)', 1); ctx.globalAlpha = 1; } continue; }
        const sp = Math.hypot(pt.vx, pt.vy) || 1;
        if (pt.inF && p.vec !== false) {
          if (Math.abs(pt.fe) > 3) { G.arrow(ctx, pt.x + 4, pt.y, pt.x + 4, pt.y + pt.fe * .24, '#dc2626', 3, 10); if (L) G.text(ctx, 'FE', pt.x + 20, pt.y + pt.fe * .24, { s: 12, w: 900, c: '#dc2626' }); }
          const fbm = Math.hypot(pt.fb[0], pt.fb[1]); if (fbm > 3) { G.arrow(ctx, pt.x - 4, pt.y, pt.x - 4 + pt.fb[0] * .24, pt.y + pt.fb[1] * .24, '#2563eb', 3, 10); if (L) G.text(ctx, 'FB', pt.x - 20 + pt.fb[0] * .24, pt.y + pt.fb[1] * .24, { s: 12, w: 900, c: '#2563eb' }); }
        }
        if (p.vel !== false) G.arrow(ctx, pt.x, pt.y, pt.x + pt.vx / sp * 42, pt.y + pt.vy / sp * 42, '#16a34a', 2.5, 9);
        ctx.fillStyle = pt.q > 0 ? '#dc2626' : '#2563eb'; ctx.beginPath(); ctx.arc(pt.x, pt.y, 8, 0, TAU); ctx.fill(); G.text(ctx, pt.q > 0 ? '+' : '−', pt.x, pt.y + 1, { s: 13, w: 900, c: '#fff' });
      }
      // free-body diagram
      if (p.fbd !== false) {
        const bx = 70, by = Math.max(12, g.bT - 4), bw = 176, bh = 214; box2(ctx, bx, by, bw, bh);
        G.text(ctx, 'القوى على الشحنة داخل المنطقة', bx + bw / 2, by + 14, { s: 11.5, w: 800, c: '#e2e8f0' });
        const q = 1.6e-19, FE = p.eon ? q * p.E * 1e5 : 0, FB = p.bon ? q * p.v * 1e5 * p.B : 0, mx = Math.max(FE, FB, 1e-30);
        const cx = bx + bw / 2, cy = by + 90, sq = +p.q > 0 ? 1 : -1; const dE = sq, dB = -sq * (p.bout ? -1 : 1);
        if (FB > 0) { const l = 58 * FB / mx; G.arrow(ctx, cx - 12, cy, cx - 12, cy + dB * Math.max(l, 6), '#2563eb', 4, 11); G.text(ctx, 'FB = qvB', cx - 44, cy + dB * 38, { s: 11, w: 800, c: '#60a5fa' }); }
        if (FE > 0) { const l = 58 * FE / mx; G.arrow(ctx, cx + 12, cy, cx + 12, cy + dE * Math.max(l, 6), '#dc2626', 4, 11); G.text(ctx, 'FE = qE', cx + 44, cy + dE * 38, { s: 11, w: 800, c: '#f87171' }); }
        G.arrow(ctx, cx, cy, cx + 40, cy, '#16a34a', 2.5, 9); G.text(ctx, 'v', cx + 48, cy - 1, { s: 12, w: 900, c: '#4ade80' });
        ctx.fillStyle = sq > 0 ? '#dc2626' : '#2563eb'; ctx.beginPath(); ctx.arc(cx, cy, 11, 0, TAU); ctx.fill(); G.text(ctx, sq > 0 ? '+q' : '−q', cx, cy + 1, { s: 10.5, w: 900, c: '#fff' });
        const bal = p.eon && p.bon && FE > 0 && Math.abs(FE - FB) < FE * .03 && dE !== dB;
        G.text(ctx, bal ? 'FE = FB ⇐ يمر دون انحراف ✓' : (dE === dB && FE > 0 && FB > 0) ? 'القوتان بالاتجاه نفسه!' : FE > FB ? 'FE أكبر ⇐ ينحرف مع FE' : FB > FE ? 'FB أكبر ⇐ ينحرف مع FB' : 'لا قوة', cx, by + bh - 38, { s: 11.5, w: 800, c: bal ? '#4ade80' : '#fde68a' });
        G.text(ctx, 'v المنتقاة = E/B = ' + (p.B > 0 && p.bon ? fmt(p.E / p.B, 3) : '∞') + '×10⁵', cx, by + bh - 16, { s: 11, w: 700, c: '#cbd5e1' });
      }
    };
    E.drags = S => {
      const g = geo(S);
      return [
        { id: 'gun', x: g.gx - 5, y: g.gy, w: 78, h: 36, axis: 'y', tip: 'انقر لإطلاق جسيم — اسحب المدفع للأعلى أو الأسفل', idle: 'انقر المدفع لإطلاق جسيم ✋', drag: (S, d) => { S.gy = clamp(d.oy + d.y - d.sy, g.bT + 20, g.bB - 20) - g.cy; }, click: S => fire(S) },
        { id: 'qsign', x: g.gx - 20, y: g.gy, r: 12, hint: false, tip: 'انقر لعكس نوع الشحنة (+q ⇄ −q)', click: S => setParam(S, 'q', +S.p.q > 0 ? -1 : 1) },
        { id: 'vtip', x: g.tx, y: g.ty, r: 14, axis: 'xy', tip: 'اسحب رأس السهم: طوله = السرعة، واتجاهه = اتجاه الإطلاق', drag: (S, d) => { const dx = d.x - g.mx, dy = d.y - g.gy; setParam(S, 'v', Math.hypot(dx, dy) / g.vs); S.aim = clamp(Math.atan2(dy, Math.max(dx, 1)), -.6, .6); } },
        { id: 'ptop', x: (g.x0 + g.x1) / 2, y: g.yT - 6, w: g.x1 - g.x0, h: 16, axis: 'y', tip: 'اسحب الصفيحة: تقريب الصفيحتين يزيد E = V/d (الفولطية ثابتة)', down: S => { S._g0 = S.gap; S._E0 = S.p.E; }, drag: (S, d) => { const ng = clamp((g.cy - (d.oy + d.y - d.sy) - 6) * 2 / g.h, .2, .64); S.gap = ng; setParam(S, 'E', S._E0 * S._g0 / ng); } },
        { id: 'pbot', x: (g.x0 + g.x1) / 2, y: g.yB + 6, w: g.x1 - g.x0, h: 16, axis: 'y', hint: false, tip: 'اسحب الصفيحة: إبعاد الصفيحتين يقلل E = V/d', down: S => { S._g0 = S.gap; S._E0 = S.p.E; }, drag: (S, d) => { const ng = clamp(((d.oy + d.y - d.sy) - 6 - g.cy) * 2 / g.h, .2, .64); S.gap = ng; setParam(S, 'E', S._E0 * S._g0 / ng); } },
        { id: 'bbadge', x: g.x1 - 62, y: g.bT + 17, w: 110, h: 26, hint: false, tip: 'انقر لعكس اتجاه B (⊗ ⇄ ⊙) — عجلة الفأرة لتغيير مقداره', click: S => setParam(S, 'bout', !S.p.bout), wheel: (S, s) => setParam(S, 'B', S.p.B + s * .05) }
      ];
    };
    E.field = (S, x, y) => [0, 0];
    E.fieldZ = (S, x, y) => { const g = geo(S), p = S.p; return (p.bon && x > g.x0 && x < g.x1 && y > g.bT && y < g.bB) ? p.B * (p.bout ? -1 : 1) : 0; };
    E.howto = 'انقر <b>المدفع</b> لإطلاق جسيم (أو اتركه يطلق تلقائياً) واسحبه للأعلى/الأسفل. اسحب <b>رأس السهم الأخضر</b> لتغيير السرعة واتجاه الإطلاق. اسحب <b>إحدى الصفيحتين</b>: تقريبهما يزيد E (الفولطية ثابتة). انقر شارة <b>B</b> لعكس اتجاه المجال، وانقر علامة الشحنة على المدفع لعكس نوعها. على الجسيم: FE (أحمر) و FB (أزرق) و v (أخضر). عندما v = E/B تتساوى القوتان فيمر الجسيم مستقيماً.';
  })();

  /* =====================================================================
     2) Faraday's iron ring (book fig. 10-a, p.51)
     ===================================================================== */
  (() => {
    const E = EXC('faraday_ring'); if (!E) return;
    E.controls = E.controls.concat([TG('iron', 'حلقة من الحديد المطاوع (بدل الهواء)', true, null, 'core'), TG('flux', 'خطوط الفيض المغناطيسي في الحلقة', true, null, 'bfield'),
      TG('ind', 'الفيض المحتث المعاكس (لنز)', true, null, 'flip'), TG('cur', 'اتجاه التيار في الدائرتين واللفات', true, null, 'current'), TG('scope', 'رسم I₁ و ε₂ على اللوحة', true, null, 'graph'), TG('lbl', 'تسميات توضيحية', true, null, 'labels')]);
    const oldSetup = E.setup; E.setup = S => { oldSetup(S); S.q1 = 0; S.q2 = 0; S.phi = 0; };
    E.update = (S, dt) => {
      const p = S.p, iron = p.iron !== false; const L1 = iron ? .6 : .05, Rt = p.rh + 2; const target = S.sw ? p.E / Rt : 0; const old = S.I1;
      if (S.sw) S.I1 += (target - S.I1) * (1 - Math.exp(-dt * Rt / L1)); else S.I1 += (0 - S.I1) * (1 - Math.exp(-dt * 60));
      const M = .036 * (p.N2 / 300) * (iron ? 1 : .04); S.e2 = -M * (S.I1 - old) / Math.max(dt, 1e-4); S.phi = S.I1 * (iron ? 1 : .04);
      S.q1 += S.I1 * 70 * dt; S.q2 += Math.min(Math.abs(S.e2), 1) * 260 * dt; hist(S, 'h1', S.I1); hist(S, 'h2', S.e2);
    };
    const geo = S => {
      const w = S.W || 820, h = S.H || 740; const R0 = Math.min(w * .24, h * .245), cx = clamp(w * .55, 250, w - R0 - 150), cy = h * .43;
      const xL = Math.max(92, cx - R0 - 170), xR = Math.min(w - 64, cx + R0 + 128); const yT = cy - R0 * .72, yB = cy + R0 * .72;
      const lx = cx - R0 - 18, rx2 = cx + R0 + 18; const rhx = (xL + lx) / 2, rhw = Math.min(110, (lx - xL) * .8);
      return { w, h, cx, cy, R0, xL, xR, yT, yB, lx, rx2, rhx, rhw, swx: (xL + lx) / 2 + 6, bx: xL, by: cy };
    };
    const turns = (ctx, g, a0, n, col, front, dirSign, alpha) => { // coil around the ring near angle a0
      for (let i = 0; i < n; i++) {
        const t = a0 - .46 + .92 * i / (n - 1); const x = g.cx + Math.cos(t) * g.R0, y = g.cy + Math.sin(t) * g.R0;
        ctx.save(); ctx.translate(x, y); ctx.rotate(t); const s = Math.cos(t) > 0 ? 1 : -1; // local +y side is screen-down when s>0
        ctx.strokeStyle = front ? col : shade(col, -60); ctx.lineWidth = front ? 3.4 : 2; ctx.beginPath();
        if (front) ctx.ellipse(0, 0, 25, 6, 0, s > 0 ? 0 : Math.PI, s > 0 ? Math.PI : TAU); else ctx.ellipse(0, 0, 25, 6, 0, s > 0 ? Math.PI : 0, s > 0 ? TAU : Math.PI);
        ctx.stroke(); ctx.restore();
        if (front && dirSign && i % 2 === 0) { const fx = x + Math.cos(t + Math.PI / 2) * 6 * s, fy = y + Math.sin(t + Math.PI / 2) * 6 * s; const ang = dirSign > 0 ? 0 : Math.PI; ctx.globalAlpha = alpha; chev(ctx, fx + 5 * Math.cos(ang), fy, ang, 6, '#ea580c'); ctx.globalAlpha = 1; }
      }
    };
    E.draw = (ctx, w, h, S) => {
      G.bg(ctx, w, h); const p = S.p, g = geo(S), iron = p.iron !== false, L = p.lbl !== false;
      const n2 = Math.round(p.N2 / 60) + 4; const ae2 = Math.abs(S.e2), kick = ae2 > .004;
      // primary circuit wires (+ at top of the cell)
      const pTop = [[g.xL, g.cy - 14], [g.xL, g.yT], [g.lx, g.yT], [g.lx, g.cy - g.R0 * .42]], pBot = [[g.lx, g.cy + g.R0 * .42], [g.lx, g.yB], [g.xL, g.yB], [g.xL, g.cy + 14]];
      G.wire(ctx, pTop, '#e5484d', 3); G.wire(ctx, pBot, '#64748b', 3);
      const sTop = [[g.rx2, g.cy - g.R0 * .42], [g.rx2, g.yT], [g.xR, g.yT], [g.xR, g.cy - 30]], sBot = [[g.xR, g.cy + 30], [g.xR, g.yB], [g.rx2, g.yB], [g.rx2, g.cy + g.R0 * .42]];
      G.wire(ctx, sTop, '#64748b', 3); G.wire(ctx, sBot, '#64748b', 3);
      // back halves of the turns, then the ring
      turns(ctx, g, Math.PI, 9, '#e8914a', false); turns(ctx, g, 0, n2, '#d97706', false);
      if (iron) { ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 34; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R0, 0, TAU); ctx.stroke(); ctx.strokeStyle = '#6b7280'; ctx.lineWidth = 26; ctx.stroke(); }
      else { ctx.strokeStyle = 'rgba(148,163,184,.55)'; ctx.setLineDash([6, 6]); ctx.lineWidth = 1.5; [-17, 17].forEach(o => { ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R0 + o, 0, TAU); ctx.stroke(); }); ctx.setLineDash([]); }
      // flux loops inside the ring (clockwise: up the left leg)
      const f = clamp(Math.abs(S.phi) / 1.2, 0, 1);
      if (p.flux !== false && f > .01) {
        const nl = Math.max(1, Math.ceil(f * 4)); const al = clamp(.35 + f, .35, 1);
        for (let i = 0; i < nl; i++) {
          const r = g.R0 + (nl === 1 ? 0 : -9 + 18 * i / (nl - 1)); ctx.strokeStyle = `rgba(96,165,250,${al})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(g.cx, g.cy, r, 0, TAU); ctx.stroke();
          for (let k = 0; k < 8; k++) { const a = k * TAU / 8 + i * .2 + .4; chev(ctx, g.cx + Math.cos(a) * r, g.cy + Math.sin(a) * r, a + Math.PI / 2, 6, `rgba(96,165,250,${al})`); }
        }
      }
      // induced (opposing) flux in the secondary leg
      if (p.ind !== false && kick) {
        const up = S.e2 < 0; const al = clamp(ae2 * 6, .4, 1); const x = g.cx + g.R0 + 34, y0 = g.cy + (up ? 50 : -50), y1 = g.cy + (up ? -50 : 50);
        ctx.setLineDash([7, 5]); G.arrow(ctx, x, y0, x, y1, `rgba(234,88,12,${al})`, 3, 12); ctx.setLineDash([]);
        if (L) lbl(ctx, 'B المحتث ' + (up ? '↑' : '↓'), x + 6, y1 + (up ? -14 : 14), 'rgba(234,88,12,.92)', { s: 11 });
      }
      // front halves (with current arrows)
      const i1 = Math.abs(S.I1) > .01 ? 1 : 0; turns(ctx, g, Math.PI, 9, '#e8914a', true, p.cur !== false && i1 ? 1 : 0, clamp(S.I1 * 1.5, .35, 1));
      turns(ctx, g, 0, n2, '#d97706', true, p.cur !== false && kick ? (S.e2 < 0 ? 1 : -1) : 0, clamp(ae2 * 6, .4, 1));
      // battery (vertical, + on top), rheostat, switch
      ctx.fillStyle = '#e5e7eb'; setRaw(ctx, 1); ctx.fillStyle = 'rgba(255,255,255,.0)'; setRaw(ctx, 0);
      cell(ctx, g.xL, g.cy, true, S.p.E + ' V');
      const rx0 = g.rhx - g.rhw / 2, fx = rx0 + (p.rh - 2) / 18 * g.rhw;
      ctx.fillStyle = '#e2e8f0'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; rr(ctx, rx0, g.yT - 9, g.rhw, 18, 4); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = '#b45309'; ctx.lineWidth = 1.4; ctx.beginPath(); for (let i = 0; i <= 16; i++) { const x = rx0 + 4 + i * (g.rhw - 8) / 16; ctx.lineTo(x, g.yT + (i % 2 ? 6 : -6)); } ctx.stroke();
      ctx.fillStyle = '#7c3aed'; ctx.beginPath(); ctx.moveTo(fx, g.yT - 4); ctx.lineTo(fx - 8, g.yT - 18); ctx.lineTo(fx + 8, g.yT - 18); ctx.closePath(); ctx.fill(); ctx.fillRect(fx - 9, g.yT - 26, 18, 8);
      if (L) G.text(ctx, 'ريوستات ' + fmt(p.rh, 3) + ' Ω', g.rhx, g.yT - 40, { s: 11.5, w: 800, c: '#c4b5fd' });
      const sx = g.swx, sy = g.yB; ctx.fillStyle = '#7c4a1e'; rr(ctx, sx - 30, sy + 6, 60, 10, 3); ctx.fill();
      ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(sx - 22, sy, 4, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(sx + 22, sy, 4, 0, TAU); ctx.fill();
      ctx.save(); ctx.translate(sx - 22, sy); ctx.rotate(S.sw ? 0 : -.65); ctx.strokeStyle = S.sw ? '#16a34a' : '#dc2626'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(46, 0); ctx.stroke(); ctx.restore();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 0; setRaw(ctx, 1); ctx.fillStyle = '#fff'; ctx.fillRect(sx - 18, sy - 3, 36, 6); setRaw(ctx, 0);
      ctx.save(); ctx.translate(sx - 22, sy); ctx.rotate(S.sw ? 0 : -.65); ctx.strokeStyle = S.sw ? '#16a34a' : '#dc2626'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(46, 0); ctx.stroke(); ctx.restore();
      lbl(ctx, S.sw ? 'المفتاح مغلق' : 'المفتاح مفتوح — انقره', sx, sy + 30, S.sw ? '#16a34a' : '#dc2626', { s: 11.5 });
      // currents in the wires
      if (p.cur !== false) {
        if (Math.abs(S.I1) > .01) { ctx.globalAlpha = clamp(S.I1 * 1.4, .35, 1); flow2(ctx, pTop, S.q1, '#f59e0b', 30, 6); flow2(ctx, pBot, S.q1, '#f59e0b', 30, 6); ctx.globalAlpha = 1; }
        if (kick) { const pp = S.e2 > 0 ? [sTop, sBot] : [sBot.slice().reverse(), sTop.slice().reverse()]; ctx.globalAlpha = clamp(ae2 * 6, .4, 1); pp.forEach(q => flow2(ctx, q, S.q2, '#ea580c', 28, 6)); ctx.globalAlpha = 1; }
      }
      // galvanometer
      G.meter(ctx, g.xR, g.cy, 28, S.e2, .4, 'G', fmt(S.e2 * 1000, 3) + ' mV', { center: true });
      if (L) G.text(ctx, kick ? 'ينحرف المؤشر!' : 'المؤشر عند الصفر', g.xR, g.cy + 50, { s: 12, w: 900, c: kick ? '#f87171' : '#94a3b8' });
      if (L) {
        G.text(ctx, 'الملف الابتدائي', g.cx - g.R0, g.cy + g.R0 * .42 + 26, { s: 12, w: 800, c: '#fdba74', bg: 'rgba(15,23,42,.7)' }); G.text(ctx, 'الملف الثانوي (' + p.N2 + ' لفة)', g.cx + g.R0, g.cy + g.R0 * .42 + 26, { s: 12, w: 800, c: '#fdba74', bg: 'rgba(15,23,42,.7)' });
        G.text(ctx, iron ? 'حلقة مقفلة من الحديد المطاوع' : 'حلقة من الهواء (بدون حديد)', g.cx, g.cy + g.R0 + 28, { s: 12, w: 800, c: '#cbd5e1' });
        const dI = S.h1.length > 2 ? S.h1[S.h1.length - 1][1] - S.h1[S.h1.length - 3][1] : 0;
        const st = Math.abs(dI) > 1e-4 ? (dI > 0 ? 'الفيض يتزايد ▲' : 'الفيض يتناقص ▼') : Math.abs(S.phi) > .01 ? 'الفيض ثابت ⇐ لا تيار محتث' : 'لا فيض في الحلقة';
        lbl(ctx, st, g.cx, g.cy, Math.abs(dI) > 1e-4 ? '#b91c1c' : '#475569', { s: 12.5 });
        G.text(ctx, 'I₁ = ' + fmt(S.I1, 3) + ' A', g.cx, g.cy + 26, { s: 12, mono: 1, c: '#93c5fd' });
      }
      if (p.scope !== false) { const sw2 = Math.min(360, w * .5), sx0 = clamp(w / 2 - sw2 / 2 + 20, 72, w - sw2 - 10), sy0 = Math.min(h - 170, g.cy + g.R0 + 50); scope2(ctx, sx0, sy0, sw2, 92, [{ pts: S.h1, col: '#3b82f6', name: 'I₁', max: 3.2 }, { pts: S.h2, col: '#ef4444', name: 'ε₂', max: .45 }], 'تيار الابتدائي والقوة الدافعة المحتثة', 6); }
    };
    E.drags = S => {
      const g = geo(S), rx0 = g.rhx - g.rhw / 2, fx = rx0 + (S.p.rh - 2) / 18 * g.rhw, n2x = g.cx + g.R0;
      return [
        { id: 'ring', x: g.cx - g.R0 * .7, y: g.cy - g.R0 * .7, hit: (x, y) => Math.abs(Math.hypot(x - g.cx, y - g.cy) - g.R0) < 17, hint: false, tip: 'انقر الحلقة: حديد مطاوع ⇄ هواء', click: S => setParam(S, 'iron', S.p.iron === false) },
        { id: 'sw', x: g.swx, y: g.yB - 4, w: 70, h: 40, tip: 'انقر لغلق / فتح المفتاح', idle: 'انقر المفتاح ✋', click: S => { S.sw = !S.sw; } },
        { id: 'rh', x: fx, y: g.yT - 16, w: 26, h: 30, axis: 'x', tip: 'اسحب منزلق الريوستات لتغيير تيار الابتدائي', drag: (S, d) => setParam(S, 'rh', 2 + 18 * (d.ox + d.x - d.sx - rx0) / g.rhw) },
        { id: 'bat', x: g.xL, y: g.cy, w: 44, h: 40, axis: 'y', hint: false, tip: 'اسحب للأعلى/الأسفل أو استعمل العجلة: فولطية البطارية', down: S => { S._E0 = S.p.E; }, drag: (S, d) => setParam(S, 'E', S._E0 - (d.y - d.sy) / 12), wheel: (S, s) => setParam(S, 'E', S.p.E + s * .5) },
        { id: 'sec', x: n2x, y: g.cy, w: 60, h: g.R0 * .9, hint: false, tip: 'انقر الملف الثانوي لتغيير عدد لفاته (أو العجلة)', click: S => { const o = [100, 300, 600]; setParam(S, 'N2', o[(o.indexOf(+S.p.N2) + 1) % 3]); }, wheel: (S, s) => { const o = [100, 300, 600]; setParam(S, 'N2', o[clamp(o.indexOf(+S.p.N2) + s, 0, 2)]); } }
      ];
    };
    E.field = (S, x, y) => { const g = geo(S); const dx = x - g.cx, dy = y - g.cy, r = Math.hypot(dx, dy); if (Math.abs(r - g.R0) > 15) return [0, 0]; const B = .5 * S.phi; return [-dy / r * B, dx / r * B]; };
    E.fieldRef = () => .5;
    E.howto = 'انقر <b>المفتاح</b> على اللوحة لغلقه أو فتحه، واسحب <b>منزلق الريوستات</b> البنفسجي لتغيير تيار الابتدائي. الخطوط الزرقاء هي الفيض داخل الحلقة الحديدية: يزداد عددها أثناء نمو التيار ويقل أثناء تلاشيه. ينحرف مؤشر الكلفانوميتر فقط أثناء التغير، والسهم البرتقالي المتقطع يبين الفيض المحتث المعاكس للتغير (لنز). انقر الحلقة للمقارنة مع حلقة بدون حديد، وانقر الملف الثانوي لتغيير عدد لفاته.';
  })();

  /* =====================================================================
     3) Motional emf: rod on rails (book fig. 12, p.55)
     ===================================================================== */
  (() => {
    const E = EXC('motional'); if (!E) return;
    E.controls = E.controls.concat([TG('push', 'قوة خارجية تُبقي السرعة ثابتة', true, null, 'force'), TG('area', 'تظليل المساحة التي يخترقها الفيض', true, null, 'eye'),
      TG('bsym', 'رموز المجال المغناطيسي ⊗', true, null, 'bfield'), TG('chg', 'الشحنات في الساق', true, null, 'charges'), TG('efield', 'المجال الكهربائي E داخل الساق', true, null, 'efield'),
      TG('cur', 'اتجاه التيار المحتث', true, null, 'current'), TG('vec', 'القوى على الشحنة وعلى الساق', true, null, 'vector'), TG('lenz', 'المجال المحتث (لنز)', true, null, 'flip'), TG('lbl', 'تسميات وقيم', true, null, 'labels')]);
    E.pointer = null;
    const oldSetup = E.setup; E.setup = S => { oldSetup(S); S.drag = false; S.vd = 0; S.vfree = 0; S.ph = 0; S.sep = 0; S.glow = 0; };
    const geo = S => {
      const w = S.W || 820, h = S.H || 740, p = S.p; const cy = h * .38, k = Math.min(68, h * .085); const yT = cy - p.L * k, yB = cy + p.L * k;
      const xl = Math.max(118, w * .15), x0 = w * .3, x1 = w * .86, rx = x0 + clamp(S.x, 0, 1) * (x1 - x0), re = w * .94;
      return { w, h, cy, k, yT, yB, xl, x0, x1, rx, re, bT: 58, bB: Math.min(h * .68, yB + 90) };
    };
    E.update = (S, dt) => {
      const p = S.p; let v;
      if (S.drag) { if (nowS() - (S._lm || 0) > .08) S.vd *= Math.exp(-dt * 14); v = clamp(S.vd, -8, 8); }
      else if (p.push !== false) { v = p.v; S.x += v / 12 * dt; if (S.x > 1) { S.x = 1; if (v > 0) setParam(S, 'v', -v); } if (S.x < 0) { S.x = 0; if (v < 0) setParam(S, 'v', -v); } v = p.v; }
      else { const kb = p.open ? 0 : p.B * p.B * p.L * p.L / p.R / .02; S.vfree *= Math.exp(-kb * dt); v = S.vfree; S.x += v / 12 * dt; if (S.x > 1 || S.x < 0) { S.x = clamp(S.x, 0, 1); S.vfree = 0; } }
      S.vcur = v; const I = p.open ? 0 : v * p.B * p.L / p.R; S.I = I; S.q += I * 2000 * dt; S.ph += Math.abs(I) * 1400 * dt;
      S.sep += (clamp(Math.abs(v) * p.B / 3, 0, 1) - S.sep) * Math.min(1, dt * 6);
      S.glow = (S.glow || 0) + (Math.min(1.3, Math.sqrt(I * I * p.R / .32)) - (S.glow || 0)) * Math.min(1, dt * 10);
    };
    E.draw = (ctx, w, h, S) => {
      G.bg(ctx, w, h, false); const p = S.p, g = geo(S), L = p.lbl !== false; const v = S.vcur || 0, sv = Math.sign(v), I = S.I || 0;
      const X = (g.rx - g.xl) / (g.x1 - g.x0) * 12, phi = p.B * p.L * X;
      // B region
      ctx.fillStyle = `rgba(37,99,235,${.03 + .05 * p.B})`; ctx.fillRect(70, g.bT, w - 80, g.bB - g.bT);
      if (p.bsym !== false && p.B > 0) { const al = .25 + .4 * p.B / 1.5; for (let x = 92; x < w - 14; x += 38) for (let y = g.bT + 20; y < g.bB - 6; y += 38) sym2(ctx, x, y, 6, false, `rgba(59,130,246,${al})`, 1.4); }
      // flux area
      if (p.area !== false) { ctx.fillStyle = 'rgba(37,99,235,.13)'; ctx.fillRect(g.xl, g.yT, g.rx - g.xl, g.yB - g.yT); ctx.strokeStyle = 'rgba(37,99,235,.55)'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.4; ctx.strokeRect(g.xl, g.yT, g.rx - g.xl, g.yB - g.yT); ctx.setLineDash([]);
        if (L) lbl(ctx, 'Φ = B·A = ' + fmt(phi, 3) + ' Wb', (g.xl + g.rx) / 2, g.yB - 18, 'rgba(37,99,235,.9)', { s: 11.5 });
        if (Math.abs(v) > .05 && L) G.text(ctx, v > 0 ? 'المساحة تزداد ⇐ Φ يزداد' : 'المساحة تقل ⇐ Φ يقل', (g.xl + g.rx) / 2, g.yT + 18, { s: 11.5, w: 800, c: '#93c5fd' }); }
      // induced field (Lenz)
      if (p.lenz !== false && !p.open && Math.abs(I) > 1e-4 && g.rx - g.xl > 80) { const al = clamp(Math.abs(v) / 4, .35, 1); const out = v > 0; for (let x = g.xl + 45; x < g.rx - 25; x += 70) [-.45, .45].forEach(f => sym2(ctx, x, g.cy + f * (g.yB - g.yT) * .6, 9, out, `rgba(234,88,12,${al})`, 2.2)); if (L) G.text(ctx, out ? 'B المحتث ⊙ يعاكس الزيادة' : 'B المحتث ⊗ يعاكس النقصان', (g.xl + g.rx) / 2, g.cy, { s: 11.5, w: 800, c: '#fb923c', bg: 'rgba(15,23,42,.6)' }); }
      // rails + lamp column
      G.wire(ctx, [[g.re, g.yT], [g.xl, g.yT], [g.xl, g.yB], [g.re, g.yB]], '#94a3b8', 6); G.wire(ctx, [[g.re, g.yT], [g.xl, g.yT], [g.xl, g.yB], [g.re, g.yB]], '#cbd5e1', 2.5);
      ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.arc(g.re, g.yT, 9, 0, TAU); ctx.fill(); ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2; ctx.stroke();
      if (!p.open) { setRaw(ctx, 1); ctx.fillStyle = THEME.book ? '#ffffff' : '#0a1120'; setRaw(ctx, 0); ctx.fillRect(g.xl - 8, g.cy - 22, 16, 44); bulb(ctx, g.xl, g.cy, 16, clamp(S.glow, 0, 1)); if (L) G.text(ctx, 'مصباح R = ' + p.R + ' Ω', g.xl, g.cy + 38, { s: 11, c: '#fde68a', bg: 'rgba(15,23,42,.75)' }); }
      else { setRaw(ctx, 1); ctx.fillStyle = THEME.book ? '#ffffff' : '#0a1120'; setRaw(ctx, 0); ctx.fillRect(g.xl - 8, g.cy - 24, 16, 48); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.xl, g.cy + 24); ctx.lineTo(g.xl - 20, g.cy - 14); ctx.stroke(); if (L) G.text(ctx, 'دائرة مفتوحة', g.xl, g.cy + 38, { s: 11, c: '#fca5a5' }); }
      // current
      if (p.cur !== false && !p.open && Math.abs(I) > 1e-5) { const loop = [[g.rx, g.yB], [g.rx, g.yT], [g.xl, g.yT], [g.xl, g.yB], [g.rx, g.yB]]; ctx.globalAlpha = clamp(Math.abs(v) / 3, .4, 1); flow2(ctx, v >= 0 ? loop : loop.slice().reverse(), S.ph, '#f59e0b', 30, 7); ctx.globalAlpha = 1; if (L) lbl(ctx, 'I = ' + fmtSI(Math.abs(I), 'A'), (g.xl + g.rx) / 2, g.yT - 16, '#d97706', { s: 11.5 }); }
      // rod
      const rw = 24; setRaw(ctx, 1); ctx.fillStyle = '#d1d5db'; rr(ctx, g.rx - rw / 2, g.yT - 18, rw, g.yB - g.yT + 36, 6); ctx.fill(); ctx.strokeStyle = '#6b7280'; ctx.lineWidth = 1.5; ctx.stroke(); setRaw(ctx, 0);
      if (p.chg !== false) { const n = 5, top = sv >= 0; const Lr = g.yB - g.yT + 24;
        for (let i = 0; i < n; i++) { const u = g.yT - 12 + (i + .5) / n * Lr; const endP = top ? g.yT - 10 + i * 9 : g.yB + 10 - i * 9, endN = top ? g.yB + 10 - i * 9 : g.yT - 10 + i * 9;
          const yp = lerp(u, endP, S.sep), yn = lerp(u + Lr / n / 2 > g.yB + 12 ? u : u + Lr / n / 2, endN, S.sep);
          G.text(ctx, '+', g.rx - 5, yp, { s: 13, w: 900, c: '#dc2626' }); G.text(ctx, '−', g.rx + 5, yn, { s: 14, w: 900, c: '#2563eb' }); } }
      if (p.efield !== false && S.sep > .08) { const al = clamp(S.sep, .3, 1); const d = sv >= 0 ? 1 : -1; [-5, 5].forEach(o => G.arrow(ctx, g.rx + o, g.cy - d * (g.yB - g.yT) * .28, g.rx + o, g.cy + d * (g.yB - g.yT) * .28, `rgba(219,39,119,${al})`, 2, 8)); if (L) G.text(ctx, 'E', g.rx + 20, g.cy + d * (g.yB - g.yT) * .22, { s: 13, w: 900, c: '#db2777' }); }
      // test charge with FB and FE (fig 12-c)
      if (p.vec !== false && Math.abs(v) > .05) {
        const qy = g.cy - (g.yB - g.yT) * .12, fb = clamp(Math.abs(v) * p.B * 14, 10, 52), fe = fb * clamp(S.sep, 0, 1);
        G.arrow(ctx, g.rx, qy - 10, g.rx, qy - 10 - fb * sv, '#2563eb', 3.2, 10); if (fe > 4) G.arrow(ctx, g.rx, qy + 10, g.rx, qy + 10 + fe * sv, '#dc2626', 3.2, 10);
        ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(g.rx, qy, 9, 0, TAU); ctx.fill(); G.text(ctx, '+', g.rx, qy + 1, { s: 13, w: 900, c: '#fff' });
        if (L) { lbl(ctx, 'FB = qvB', g.rx + 52, qy - 10 - fb * sv * .7, '#2563eb', { s: 11 }); if (fe > 4) lbl(ctx, 'FE = qE', g.rx + 50, qy + 10 + fe * sv * .7, '#dc2626', { s: 11 }); }
      }
      // velocity (above) and forces on the rod (below)
      if (Math.abs(v) > .05) {
        const lv = clamp(Math.abs(v) * 14, 18, 90) * sv; G.arrow(ctx, g.rx, g.yT - 34, g.rx + lv, g.yT - 34, '#16a34a', 4, 12); if (L) G.text(ctx, 'v = ' + fmt(Math.abs(v), 2) + ' m/s', g.rx + lv + sv * 38, g.yT - 34, { s: 12, w: 900, c: '#4ade80' });
        if (p.vec !== false && !p.open) { const F = Math.abs(I * p.L * p.B), lf = clamp(F * 900, 14, 90) * -sv; G.arrow(ctx, g.rx, g.yB + 34, g.rx + lf, g.yB + 34, '#dc2626', 4, 12); if (L) G.text(ctx, 'F = BIℓ (معرقلة)', g.rx + lf - sv * 58, g.yB + 34, { s: 11.5, w: 800, c: '#f87171' });
          if (p.push !== false || S.drag) { G.arrow(ctx, g.rx, g.yB + 58, g.rx - lf, g.yB + 58, '#7c3aed', 4, 12); if (L) G.text(ctx, 'قوة اليد', g.rx - lf + sv * 34, g.yB + 58, { s: 11.5, w: 800, c: '#a78bfa' }); } }
      }
      if (L) { G.text(ctx, 'ℓ = ' + fmt(p.L, 3) + ' m', g.re - 4, g.yB + 22, { s: 12, w: 800, c: '#e2e8f0', bg: 'rgba(15,23,42,.7)' }); G.text(ctx, 'B ⊗ ' + fmt(p.B, 3) + ' T', w * .52, 34, { s: 12.5, w: 900, c: '#fff', bg: '#2563eb' }); }
      // formula strip
      if (L) { const fy = Math.min(h - 120, g.bB + 30), e = v * p.B * p.L; const items = [['ε = vBℓ', fmtSI(e, 'V'), '#b45309'], ['I = ε/R', fmtSI(p.open ? 0 : e / p.R, 'A'), '#d97706'], ['F = BIℓ', fmtSI(Math.abs(I * p.L * p.B), 'N'), '#dc2626'], ['P = I²R', fmtSI(I * I * p.R, 'W'), '#7c3aed']];
        const bw = Math.min(150, (w - 90) / 4 - 8); items.forEach(([a, b, c], i) => { const x = 74 + i * (bw + 8); box2(ctx, x, fy, bw, 50, 8); G.text(ctx, a, x + bw / 2, fy + 15, { s: 12, w: 800, c: '#e2e8f0' }); G.text(ctx, b, x + bw / 2, fy + 35, { s: 13, w: 900, c, mono: 1 }); }); }
    };
    E.drags = S => {
      const g = geo(S);
      return [
        { id: 'rod', x: g.rx, y: g.cy, w: 36, h: g.yB - g.yT + 40, axis: 'x', tip: 'اسحب الساق يميناً أو يساراً — سرعة يدك هي v', idle: 'اسحب الساق ✋',
          down: S => { S.drag = true; S.vd = 0; S._lm = nowS(); S._lx = S.x; }, drag: (S, d) => { const nx = clamp((d.ox + d.x - d.sx - g.x0) / (g.x1 - g.x0), 0, 1); const t = nowS(), dt = Math.max(t - S._lm, .008); const vi = (nx - S.x) * 12 / dt; S.vd = lerp(S.vd, vi, .5); S.x = nx; S._lm = t; },
          up: S => { S.drag = false; const v = Math.abs(S.vd) < .15 ? 0 : clamp(S.vd, -6, 6); if (S.p.push !== false) setParam(S, 'v', v); else S.vfree = v; } },
        { id: 'rail', x: g.re, y: g.yT, r: 14, axis: 'y', tip: 'اسحب لتغيير المسافة بين السكتين (طول الساق ℓ)', drag: (S, d) => setParam(S, 'L', (g.cy - (d.oy + d.y - d.sy)) / g.k) },
        { id: 'lamp', x: g.xl, y: g.cy, w: 40, h: 50, hint: false, tip: 'انقر المصباح: فصل / وصل الدائرة', click: S => setParam(S, 'open', !S.p.open) },
        { id: 'bb', x: g.w * .52, y: 34, w: 110, h: 26, axis: 'x', hint: false, tip: 'اسحب أو استعمل العجلة لتغيير B', down: S => { S._B0 = S.p.B; }, drag: (S, d) => setParam(S, 'B', S._B0 + (d.x - d.sx) / 200), wheel: (S, s) => setParam(S, 'B', S.p.B + s * .05) }
      ];
    };
    E.field = (S, x, y) => [0, 0];
    E.fieldZ = (S, x, y) => { const g = geo(S); return (x > 70 && x < S.W - 10 && y > g.bT && y < g.bB) ? S.p.B : 0; };
    const oldRd = E.readings; E.readings = S => { const r = oldRd(S); const g = geo(S); const X = (g.rx - g.xl) / (g.x1 - g.x0) * 12; r.push(rd('الفيض Φ = BℓX', fmt(S.p.B * S.p.L * X, 3, 'Wb'))); return r; };
    E.howto = '<b>اسحب الساق</b> بيدك: سرعة السحب هي v (أفلتها وهي تتحرك فتستمر بالسرعة نفسها). لاحظ: الشحنات الموجبة تتجمع في طرف والسالبة في الآخر (FB = qvB)، فينشأ مجال E داخل الساق يوازن القوة (FE = FB) ⇐ ε = vBℓ. المساحة المظللة (Φ = BA) تتغير، والتيار (البرتقالي) يولد مجالاً محتثاً يعاكس التغير، والقوة F = BIℓ تعاكس الحركة دائماً (لنز). اسحب الدائرة الخضراء لتغيير ℓ، وانقر المصباح لفتح الدائرة. أطفئ «القوة الخارجية» لترى الساق تتباطأ وحدها (الكبح المغناطيسي).';
  })();

  /* =====================================================================
     4 & 5) Rotating coil between poles: generator (fig. 37) and DC motor (fig. 43)
     ===================================================================== */
  const Rot = {
    geo(S) { const w = S.W || 820, h = S.H || 740; const sc = clamp(Math.min(w / 820, h / 760), .52, 1.2); const cx = Math.max(w * .4, 64 + 235 * sc), cy = h * .29; return { w, h, sc, cx, cy, a: 98 * sc, b: 66 * sc, pg: 24 * sc, pw: 64 * sc, pz: 58 * sc, rr: 20 * sc, ix: w - Math.max(88, 80 * sc) - 12, iy: h * .2 + 8, R: 62 * sc }; },
    P(g, x, y, z) { return [g.cx + x - z * .42, g.cy - y + z * .26]; },
    corners(g, th) { const wx = -Math.sin(th), wz = Math.cos(th); const c = (s, t) => [s * g.a * wx, t * g.b, s * g.a * wz]; return { TL: c(-1, 1), TR: c(1, 1), BR: c(1, -1), BL: c(-1, -1), wx, wz }; },
    poles(ctx, g, S) {
      const face = (pts, col) => { ctx.fillStyle = col; ctx.beginPath(); pts.forEach((q, i) => { const P = this.P(g, ...q); i ? ctx.lineTo(P[0], P[1]) : ctx.moveTo(P[0], P[1]); }); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(15,23,42,.35)'; ctx.lineWidth = 1; ctx.stroke(); };
      const y0 = -g.b - 22 * g.sc, y1 = g.b + 22 * g.sc;
      [[-g.a - g.pg - g.pw, -g.a - g.pg, '#dc2626', 'N'], [g.a + g.pg, g.a + g.pg + g.pw, '#2563eb', 'S']].forEach(([x0, x1, col, n]) => {
        face([[x0, y1, -g.pz], [x1, y1, -g.pz], [x1, y1, g.pz], [x0, y1, g.pz]], shade(col, 40));
        face([[x1, y0, -g.pz], [x1, y1, -g.pz], [x1, y1, g.pz], [x1, y0, g.pz]], shade(col, -35));
        face([[x0, y0, g.pz], [x1, y0, g.pz], [x1, y1, g.pz], [x0, y1, g.pz]], col);
        const c = this.P(g, (x0 + x1) / 2, 0, g.pz); G.text(ctx, n, c[0], c[1], { s: 26 * g.sc + 4, w: 900, c: '#fff' });
      });
    },
    blines(ctx, g, S, front, al) {
      for (const z of [-36, 0, 36]) { if ((z * g.sc >= 0) !== front) continue; for (const yf of [-.72, 0, .72]) { const y = yf * g.b, zz = z * g.sc; const A = this.P(g, -g.a - g.pg, y, zz), B = this.P(g, g.a + g.pg, y, zz), M = this.P(g, g.a * .55, y, zz), M0 = this.P(g, g.a * .55 - 12, y, zz); ctx.strokeStyle = `rgba(59,130,246,${al})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); G.arrow(ctx, M0[0], M0[1], M[0], M[1], `rgba(59,130,246,${al})`, 1.5, 9); } }
    },
    coil(ctx, g, S, th, o) { // o: {flux, vec, cur (circulation sign or 0), ph, lbl}
      const C = this.corners(g, th); const Pp = q => this.P(g, ...q);
      if (o.flux) { const f = Math.abs(Math.cos(th)); ctx.fillStyle = `rgba(37,99,235,${.05 + .3 * f})`; ctx.beginPath(); [C.TL, C.TR, C.BR, C.BL].forEach((q, i) => { const P = Pp(q); i ? ctx.lineTo(P[0], P[1]) : ctx.moveTo(P[0], P[1]); }); ctx.closePath(); ctx.fill(); }
      const ga = .1 * g.a; const Pa = [ga * C.wx, -g.b, ga * C.wz], Pb = [-ga * C.wx, -g.b, -ga * C.wz];
      const edges = [[C.TL, C.TR], [C.TR, C.BR], [C.BR, Pa], [Pb, C.BL], [C.BL, C.TL]].map(e => ({ e, z: (e[0][2] + e[1][2]) / 2 })).sort((u, v) => u.z - v.z);
      edges.forEach(({ e }) => { const A = Pp(e[0]), B = Pp(e[1]); ctx.lineCap = 'round'; ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 8 * g.sc + 1; ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 3.5 * g.sc + .5; ctx.stroke(); ctx.lineCap = 'butt'; });
      if (o.cur) { const loop = [C.BR, C.BL, C.TL, C.TR, C.BR].map(Pp); ctx.globalAlpha = o.al || 1; flow2(ctx, o.cur > 0 ? loop.slice().reverse() : loop, o.ph, '#b91c1c', 26 * g.sc + 4, 6 * g.sc + 1); ctx.globalAlpha = 1; }
      if (o.lbl) { const q = Pp(C.TR); G.text(ctx, '1', q[0] + 12, q[1] - 10, { s: 11, w: 900, c: '#fde68a' }); const q2 = Pp(C.TL); G.text(ctx, '2', q2[0] - 12, q2[1] - 10, { s: 11, w: 900, c: '#fde68a' }); }
      if (o.vec) { const c0 = Pp([0, 0, 0]), L = 78 * g.sc, n = [Math.cos(th) * L, 0, Math.sin(th) * L], t = Pp(n); G.arrow(ctx, c0[0], c0[1], t[0], t[1], '#7c3aed', 3.5, 12); G.text(ctx, 'A⃗', t[0] + (t[0] > c0[0] ? 14 : -14), t[1] - 8, { s: 15, w: 900, c: '#a78bfa' }); ctx.fillStyle = '#7c3aed'; ctx.beginPath(); ctx.arc(c0[0], c0[1], 3.5, 0, TAU); ctx.fill(); }
      return { Pa, Pb, C };
    },
    ringPts(g, y, r, a0 = 0, a1 = TAU, n = 28) { const out = []; for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; out.push(this.P(g, r * Math.cos(a), y, r * Math.sin(a))); } return out; },
    rings(ctx, g, S, th, dc, CO) { // returns brush contact points [left, right]
      const r = g.rr, yA = -g.b - 40 * g.sc, yB2 = -g.b - 64 * g.sc, yC = -g.b - 50 * g.sc;
      const ax0 = this.P(g, 0, -g.b, 0), ax1 = this.P(g, 0, -g.b - 92 * g.sc, 0); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 5 * g.sc; ctx.beginPath(); ctx.moveTo(ax0[0], ax0[1]); ctx.lineTo(ax1[0], ax1[1]); ctx.stroke();
      const lead = (from, ang, y, col) => { const t = this.P(g, r * Math.cos(ang), y, r * Math.sin(ang)), f = this.P(g, ...from); ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(f[0], f[1]); ctx.lineTo(t[0], t[1]); ctx.stroke(); };
      const stroke = (pts, col, lw) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); };
      if (!dc) {
        lead(CO.Pa, th + Math.PI / 2, yA, '#b45309'); lead(CO.Pb, th + 1.5 * Math.PI, yB2, '#92400e');
        stroke(this.ringPts(g, yA, r), '#ca8a04', 6 * g.sc + 1); stroke(this.ringPts(g, yB2, r), '#a16207', 6 * g.sc + 1);
        return { L: this.P(g, -r - 4, yA, 0), R: this.P(g, r + 4, yB2, 0), y: [yA, yB2] };
      }
      lead(CO.Pa, th + Math.PI / 2, yC, '#b45309'); lead(CO.Pb, th + 1.5 * Math.PI, yC, '#92400e');
      stroke(this.ringPts(g, yC, r, th + .14, th + Math.PI - .14, 16), '#ca8a04', 9 * g.sc + 1); stroke(this.ringPts(g, yC, r, th + Math.PI + .14, th + TAU - .14, 16), '#78350f', 9 * g.sc + 1);
      return { L: this.P(g, -r - 4, yC, 0), R: this.P(g, r + 4, yC, 0), y: [yC, yC] };
    },
    brushes(ctx, g, B) { ctx.fillStyle = '#1f2937'; const s = g.sc; rr(ctx, B.L[0] - 22 * s, B.L[1] - 6 * s, 22 * s, 12 * s, 2); ctx.fill(); rr(ctx, B.R[0], B.R[1] - 6 * s, 22 * s, 12 * s, 2); ctx.fill(); },
    top(ctx, g, S, th, o) { // top view inset: o {kind:'gen'|'mot', circ, F, om, lbl}
      const ix = g.ix, iy = g.iy, R = g.R; box2(ctx, ix - R - 22, iy - R - 34, 2 * R + 44, 2 * R + 76, 12);
      G.text(ctx, 'منظر علوي (من فوق المحور)', ix, iy - R - 20, { s: 11.5, w: 800, c: '#e2e8f0' });
      ctx.fillStyle = '#dc2626'; ctx.fillRect(ix - R - 16, iy - R * .8, 10, R * 1.6); ctx.fillStyle = '#2563eb'; ctx.fillRect(ix + R + 6, iy - R * .8, 10, R * 1.6);
      G.text(ctx, 'N', ix - R - 11, iy, { s: 11, w: 900, c: '#fff' }); G.text(ctx, 'S', ix + R + 11, iy, { s: 11, w: 900, c: '#fff' });
      const r = R * .8, wx = -Math.sin(th), wz = Math.cos(th); let thread = 0; const nL = 9;
      for (let i = 0; i < nL; i++) { const z = -R * .8 + R * 1.6 * i / (nL - 1); const th2 = Math.abs(z) <= r * Math.abs(wz) + 1e-6; if (th2) thread++; const al = th2 ? .95 : .35; ctx.strokeStyle = th2 ? `rgba(37,99,235,${al})` : `rgba(100,116,139,${al})`; ctx.lineWidth = th2 ? 2 : 1.1; ctx.beginPath(); ctx.moveTo(ix - R - 4, iy + z); ctx.lineTo(ix + R + 4, iy + z); ctx.stroke(); chev(ctx, ix + R * .6, iy + z, 0, 4, th2 ? '#2563eb' : '#94a3b8'); }
      const A = [ix + r * wx, iy + r * wz], Bq = [ix - r * wx, iy - r * wz];
      ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(Bq[0], Bq[1]); ctx.lineTo(A[0], A[1]); ctx.stroke(); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 3; ctx.stroke(); ctx.lineCap = 'butt';
      const n = [Math.cos(th), Math.sin(th)]; if (o.vec) { G.arrow(ctx, ix, iy, ix + n[0] * R * .62, iy + n[1] * R * .62, '#7c3aed', 3, 10); const aa = wrapA(th); ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(ix, iy, 16, 0, aa > Math.PI ? aa - TAU : aa, aa > Math.PI); ctx.stroke(); }
      // current symbols at the two sides (viewer above: current down = ⊗)
      if (o.circ) { sym2(ctx, A[0], A[1], 7, o.circ < 0, '#b91c1c', 2); sym2(ctx, Bq[0], Bq[1], 7, o.circ > 0, '#b91c1c', 2); }
      if (o.kind === 'gen' && Math.abs(o.om) > .05) { const s = Math.sign(o.om), L = 26; G.arrow(ctx, A[0], A[1], A[0] - n[0] * L * s, A[1] - n[1] * L * s, '#16a34a', 2.5, 8); G.arrow(ctx, Bq[0], Bq[1], Bq[0] + n[0] * L * s, Bq[1] + n[1] * L * s, '#16a34a', 2.5, 8); }
      if (o.kind === 'mot' && o.F) { const L = clamp(Math.abs(o.F) * 30, 8, 30), s = Math.sign(o.F); G.arrow(ctx, A[0], A[1], A[0], A[1] - L * s, '#dc2626', 3, 9); G.arrow(ctx, Bq[0], Bq[1], Bq[0], Bq[1] + L * s, '#dc2626', 3, 9); }
      ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.arc(A[0], A[1], 5, 0, TAU); ctx.fill();
      G.text(ctx, 'θ = ' + Math.round(deg(wrapA(th))) + '°', ix, iy + R + 14, { s: 12, w: 900, c: '#c4b5fd', mono: 1 });
      G.text(ctx, 'خطوط تخترق الملف: ' + thread + ' / ' + nL, ix, iy + R + 32, { s: 11, w: 800, c: '#93c5fd' });
      return { A };
    },
    field(S, x, y) { const g = this.geo(S), B = S.p.B; const gx = g.a + g.pg; const dx = x - g.cx, dy = y - g.cy; if (Math.abs(dx) > gx && Math.abs(dx) < gx + g.pw + 30 && Math.abs(dy) < g.b + 30) return null; if (Math.abs(dx) <= gx) { const k = Math.abs(dy) < g.b + 22 * g.sc ? 1 : Math.exp(-(Math.abs(dy) - g.b - 22 * g.sc) / 30); return [B * k, 0]; } return [0, 0]; },
    drags(S, hold) { // coil in main view (horizontal drag) + crank in the top view
      const g = this.geo(S), c0 = this.P(g, 0, 0, 0); const r = g.R * .8, th = S.th;
      const set = (S, dth) => { S.th += dth; const t = nowS(), dt = Math.max(t - (S._lm || t - .016), .008); S.hw = lerp(S.hw || 0, dth / dt, .45); S._lm = t; };
      const L = [{ id: 'coil', x: c0[0], y: c0[1], w: g.a * 2 + 20, h: g.b * 2 + 20, dir: 0, tip: 'اسحب الملف أفقياً لتدويره بيدك', idle: 'أدر الملف بيدك ✋', down: S => { S.hold = true; S.hw = 0; S._lm = nowS(); }, drag: (S, d) => set(S, -d.dx / g.a), up: S => { S.hold = false; hold && hold(S); } }];
      if (S.p.top !== false) L.push({ id: 'crank', x: g.ix + r * -Math.sin(th), y: g.iy + r * Math.cos(th), cx: g.ix, cy: g.iy, r: 16, tip: 'أدر المقبض حول المحور (منظر علوي)', down: S => { S.hold = true; S.hw = 0; S._lm = nowS(); }, drag: (S, d) => set(S, d.dang), up: S => { S.hold = false; hold && hold(S); } });
      return L;
    }
  };

  /* ---------- generator ---------- */
  (() => {
    const E = EXC('generator'); if (!E) return;
    E.controls = E.controls.concat([TG('auto', 'دوران تلقائي بسرعة ثابتة (التردد f)', true, null, 'wave'), TG('lines', 'خطوط المجال المغناطيسي B', true, null, 'bfield'), TG('vec', 'متجه المساحة A والزاوية θ', true, null, 'vector'),
      TG('flux', 'تظليل الفيض خلال الملف', true, null, 'eye'), TG('cur', 'اتجاه التيار المحتث', true, null, 'current'), TG('top', 'منظر علوي للملف', true, null, 'eye'), TG('graph', 'منحني Φ و ε مع الزاوية', true, null, 'graph'), TG('lbl', 'تسميات توضيحية', true, null, 'labels')]);
    const oldSetup = E.setup; E.setup = S => { oldSetup(S); S.om = TAU * S.p.f; S.hold = false; S.hw = 0; S.ph = 0; S.phx = 0; };
    E.update = (S, dt) => {
      const p = S.p; let om;
      if (S.hold) { if (nowS() - (S._lm || 0) > .08) S.hw *= Math.exp(-dt * 14); om = S.hw; }
      else if (p.auto !== false) { om = TAU * p.f; S.th += om * dt; }
      else { om = (S.om || 0) * Math.exp(-dt * .3); S.th += om * dt; }
      S.om = om; const ec = p.N * p.B * p.A * om * Math.sin(S.th); S.ec = ec; S.e = p.mode === 'dc' ? ec * Math.sign(Math.sin(S.th)) : ec; S.phi = p.B * p.A * Math.cos(S.th);
      const em = p.N * p.B * p.A * Math.max(Math.abs(om), 1e-9); S.ph += Math.abs(ec) / em * 120 * dt * clamp(Math.abs(om) / 3, .4, 2); S.phx += Math.abs(S.e) / em * 120 * dt * clamp(Math.abs(om) / 3, .4, 2);
      hist(S, 'hg', S.e, 500);
    };
    E.draw = (ctx, w, h, S) => {
      G.bg(ctx, w, h); const p = S.p, g = Rot.geo(S), L = p.lbl !== false, th = S.th, dc = p.mode === 'dc';
      const em = p.N * p.B * p.A * Math.max(Math.abs(S.om || 0), TAU * p.f), rel = clamp(Math.abs(S.ec || 0) / (p.N * p.B * p.A * TAU * 1.5 + 1e-9), 0, 1);
      Rot.poles(ctx, g, S); const al = clamp(.3 + p.B * .9, .3, .9);
      if (p.lines !== false) Rot.blines(ctx, g, S, false, al);
      const circ = Math.abs(S.ec) > em * .03 ? Math.sign(S.ec) : 0;
      const CO = Rot.coil(ctx, g, S, th, { flux: p.flux !== false, vec: p.vec !== false, cur: p.cur !== false ? circ : 0, ph: S.ph, al: clamp(rel * 2, .45, 1), lbl: L });
      if (p.lines !== false) Rot.blines(ctx, g, S, true, al);
      const B = Rot.rings(ctx, g, S, th, dc, CO); Rot.brushes(ctx, g, B);
      // external circuit: left brush → lamp → galvanometer → right brush
      const s = g.sc, ly = g.cy + g.b + 150 * s, Xl = g.cx - 125 * s, Xr = g.cx + 125 * s;
      const path = [[B.L[0] - 22 * s, B.L[1]], [Xl, B.L[1]], [Xl, ly], [Xr, ly], [Xr, B.R[1]], [B.R[0] + 22 * s, B.R[1]]];
      G.wire(ctx, path, '#94a3b8', 3);
      if (p.cur !== false && Math.abs(S.e) > em * .03) { ctx.globalAlpha = clamp(Math.abs(S.e) / em * 2, .45, 1); flow2(ctx, S.e > 0 ? path : path.slice().reverse(), S.phx, '#b91c1c', 28, 6); ctx.globalAlpha = 1; }
      bulb(ctx, g.cx - 40 * s, ly, 14, rel);
      G.meter(ctx, g.cx + 48 * s, ly - 4, 24, S.e || 0, em * 1.05, 'G', fmtSI(S.e || 0, 'V'), { center: true });
      if (L) { G.text(ctx, dc ? 'مبادل (حلقة مشقوقة)' : 'حلقتا انزلاق', g.cx - 115 * s, B.L[1] - 26 * s, { s: 11.5, w: 800, c: '#fde68a', bg: 'rgba(15,23,42,.65)' }); G.text(ctx, 'فرشاة', B.R[0] + 36 * s, B.R[1] + 18, { s: 11, c: '#cbd5e1' }); G.text(ctx, 'B →', g.cx, g.cy - g.b - 40 * s, { s: 13, w: 900, c: '#60a5fa' }); }
      if (p.top !== false) Rot.top(ctx, g, S, th, { kind: 'gen', circ: p.cur !== false ? circ : 0, om: S.om, vec: p.vec !== false });
      // graph Φ(θ), ε(θ)
      if (p.graph !== false) {
        const gx = 72, gw = w - gx - 18, gy = Math.max(ly + 40, h * .66), gh = Math.min(h - gy - 78, 150); if (gh > 60) {
          box2(ctx, gx, gy, gw, gh); const x0 = gx + 36, x1 = gx + gw - 14, my = gy + gh / 2 + 10, A = gh / 2 - 26; const X = a => x0 + a / TAU * (x1 - x0);
          ctx.strokeStyle = 'rgba(148,163,184,.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, my); ctx.lineTo(x1, my); ctx.stroke();
          for (let k = 0; k <= 4; k++) { const x = X(k * Math.PI / 2); ctx.beginPath(); ctx.moveTo(x, my - A - 4); ctx.lineTo(x, my + A + 4); ctx.stroke(); G.text(ctx, k * 90 + '°', x, gy + gh - 9, { s: 10, c: '#94a3b8', mono: 1 }); }
          const curve = (fn, col) => { ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.beginPath(); for (let i = 0; i <= 120; i++) { const a = TAU * i / 120; const y = my - fn(a) * A; i ? ctx.lineTo(X(a), y) : ctx.moveTo(X(a), y); } ctx.stroke(); };
          const sg = Math.sign(S.om || 1); curve(Math.cos, '#2563eb'); curve(a => dc ? Math.abs(Math.sin(a)) * sg : Math.sin(a) * sg, '#dc2626');
          const a = wrapA(th); ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(X(a), my - A - 6); ctx.lineTo(X(a), my + A + 6); ctx.stroke();
          const ev = (S.e || 0) / (p.N * p.B * p.A * Math.max(Math.abs(S.om || 0), 1e-9) || 1);
          ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.arc(X(a), my - Math.cos(a) * A, 5, 0, TAU); ctx.fill(); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(X(a), my - clamp(ev, -1, 1) * A, 5, 0, TAU); ctx.fill();
          for (let k = 0; k < 5; k++) { const aa = k * Math.PI / 2, x = X(aa), yy = gy + 12, l = 9; ctx.strokeStyle = '#d97706'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + Math.sin(aa) * l, yy - Math.cos(aa) * l * .6); ctx.lineTo(x - Math.sin(aa) * l, yy + Math.cos(aa) * l * .6); ctx.stroke(); }
          G.text(ctx, 'Φ = BA cosθ', X(Math.PI / 4), gy + 13, { s: 11.5, w: 900, c: '#60a5fa', bg: 'rgba(15,23,42,.8)' }); G.text(ctx, dc ? 'ε (بعد المبادل) = |NBAω sinθ|' : 'ε = NBAω sinθ', X(1.25 * Math.PI), gy + 13, { s: 11.5, w: 900, c: '#f87171', bg: 'rgba(15,23,42,.8)' });
          G.text(ctx, 'θ', x1 + 7, my - 10, { s: 12, w: 900, c: '#cbd5e1' });
        }
      }
      if (L) G.text(ctx, S.hold ? 'تدوير باليد: ω = ' + fmt(S.om, 3) + ' rad/s' : (p.auto !== false ? 'f = ' + p.f + ' Hz' : 'دوران حر (يتباطأ)'), g.cx, 20, { s: 12, w: 800, c: '#e2e8f0', bg: 'rgba(15,23,42,.6)' });
    };
    E.drags = S => { const g = Rot.geo(S); const L = Rot.drags(S, S => { S.om = S.hw; if (S.p.auto !== false && Math.abs(S.hw) > .3) setParam(S, 'f', clamp(Math.abs(S.hw) / TAU, .2, 3)); });
      const B = Rot.P(g, 0, -g.b - 52 * g.sc, 0);
      L.push({ id: 'rings', x: B[0], y: B[1], w: 60 * g.sc + 10, h: 44 * g.sc + 8, hint: false, tip: 'انقر: حلقتا انزلاق (AC) ⇄ مبادل (DC)', click: S => setParam(S, 'mode', S.p.mode === 'dc' ? 'ac' : 'dc') });
      const Np = Rot.P(g, -g.a - g.pg - g.pw / 2, 0, g.pz); L.push({ id: 'pole', x: Np[0], y: Np[1], w: g.pw, h: g.b * 2, axis: 'y', hint: false, tip: 'اسحب القطب للأعلى/الأسفل أو استعمل العجلة: كثافة الفيض B', down: S => { S._B0 = S.p.B; }, drag: (S, d) => setParam(S, 'B', S._B0 - (d.y - d.sy) / 250), wheel: (S, s) => setParam(S, 'B', S.p.B + s * .02) });
      return L; };
    E.field = (S, x, y) => Rot.field(S, x, y); E.fieldRef = S => S.p.B;
    E.readings = S => { const p = S.p, om = S.om || 0, em = p.N * p.B * p.A * Math.abs(om); return [rd('ε الآنية', fmtSI(S.e || 0, 'V')), rd('εmax = NBAω', fmtSI(em, 'V')), rd('الفيض Φ = BA cosθ', fmtSI(S.phi || 0, 'Wb')), rd('السرعة الزاوية ω', fmt(om, 3, 'rad/s')), rd('الزاوية θ', Math.round(deg(wrapA(S.th))) + '°'), rd(p.mode === 'dc' ? 'المتوسط 0.636 εmax' : 'المؤثر 0.707 εmax', fmtSI(em * (p.mode === 'dc' ? .636 : .707), 'V'))]; };
    E.live = { title: 'القوة الدافعة المحتثة ε(t)', data: S => { const m = S.p.N * S.p.B * S.p.A * Math.max(TAU * S.p.f, Math.abs(S.om || 0)) * 1.1; return { series: [{ pts: S.hg, name: 'ε', color: '#e11d48' }], opts: { xl: 't (s)', ymin: -m, ymax: m, y0zero: false } }; } };
    E.howto = '<b>أدر الملف بيدك</b>: اسحبه أفقياً، أو أدر المقبض الأخضر في المنظر العلوي. البنفسجي A⃗ متجه المساحة؛ الفيض Φ = BA cosθ أعظم حين يكون A⃗ موازياً لـ B (الملف عمودي على المجال) وعندها ε = 0، و ε أعظم حين يكون مستوى الملف موازياً لـ B. في المنظر العلوي: الخطوط الزرقاء الغامقة هي التي تخترق الملف، و ⊙/⊗ اتجاه التيار في ضلعي الملف. انقر <b>الحلقات</b> للتبديل بين حلقتي الانزلاق (AC) والمبادل (DC)، واسحب القطب N لتغيير B.';
  })();

  /* ---------- DC motor ---------- */
  (() => {
    const E = EXC('motor'); if (!E) return;
    E.controls = E.controls.concat([TG('lines', 'خطوط المجال المغناطيسي B', true, null, 'bfield'), TG('force', 'القوى على ضلعي الملف F = BIL', true, null, 'force'), TG('cur', 'اتجاه التيار', true, null, 'current'),
      TG('vec', 'متجه المساحة A', false, null, 'vector'), TG('top', 'منظر علوي للملف', true, null, 'eye'), TG('sch', 'معادلة الدائرة V = εback + IR', true, null, 'schematic'), TG('lbl', 'تسميات توضيحية', true, null, 'labels')]);
    const oldSetup = E.setup; E.setup = S => { oldSetup(S); S.hold = false; S.hw = 0; S.ph = 0; S.phx = 0; S.I = 0; S.eb = 0; };
    E.update = (S, dt) => {
      const p = S.p, k = .05;
      if (S.hold) { if (nowS() - (S._lm || 0) > .08) S.hw *= Math.exp(-dt * 14); S.w = S.hw / .05; S.eb = k * S.w; S.I = (p.V - S.eb) / p.Rm; }
      else { for (let i = 0; i < 10; i++) { const d = dt / 10; const eb = k * S.w; const I = (p.V - eb) / p.Rm; const tq = k * I - .0004 * S.w - p.load * .15 * Math.sign(S.w || 1) * (S.w > .5 ? 1 : 0); S.w = Math.max(0, S.w + tq / .004 * d); S.I = I; S.eb = eb; } S.th += S.w * dt * .05; }
      S.ph += clamp(Math.abs(S.I) / 3, 0, 2) * 60 * dt; hist(S, 'h1', S.I); hist(S, 'h2', S.eb);
    };
    E.draw = (ctx, w, h, S) => {
      G.bg(ctx, w, h); const p = S.p, g = Rot.geo(S), L = p.lbl !== false, th = S.th, s = g.sc; const I = S.I || 0;
      // brake pulley on top of the axle
      const pt0 = Rot.P(g, 0, g.b, 0), pt1 = Rot.P(g, 0, g.b + 34 * s, 0); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.moveTo(pt0[0], pt0[1]); ctx.lineTo(pt1[0], pt1[1]); ctx.stroke();
      const py = g.b + 30 * s, pr = 22 * s; ctx.fillStyle = '#94a3b8'; ctx.beginPath(); Rot.ringPts(g, py, pr).forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.stroke();
      const mk = Rot.P(g, pr * Math.cos(th), py, pr * Math.sin(th)); ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(mk[0], mk[1], 3, 0, TAU); ctx.fill();
      const bpos = Rot.P(g, -pr - 3 - (1 - p.load) * 14 * s, py, 0), lev = Rot.P(g, -pr - 70 * s, py + 26 * s - p.load * 30 * s, 0);
      ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bpos[0], bpos[1]); ctx.lineTo(lev[0], lev[1]); ctx.stroke(); ctx.fillStyle = '#7c2d12'; rr(ctx, bpos[0] - 10 * s, bpos[1] - 8 * s, 10 * s, 16 * s, 2); ctx.fill();
      ctx.fillStyle = '#7c3aed'; ctx.beginPath(); ctx.arc(lev[0], lev[1], 9, 0, TAU); ctx.fill(); if (L) G.text(ctx, 'مكبح (الحمل) ' + Math.round(p.load * 100) + '%', lev[0] - 6, lev[1] - 18, { s: 11, w: 800, c: '#c4b5fd' });
      Rot.poles(ctx, g, S); const al = .6;
      if (p.lines !== false) Rot.blines(ctx, g, S, false, al);
      const sn = Math.sin(th), circ = Math.abs(I) > .02 ? -Math.sign(sn || 1) * Math.sign(I) : 0;
      const CO = Rot.coil(ctx, g, S, th, { flux: false, vec: p.vec !== false, cur: p.cur !== false ? circ : 0, ph: S.ph, al: clamp(Math.abs(I) / 3, .45, 1), lbl: false });
      // forces on the two long sides: side +w carries current up when c>0 ⇒ F along −z
      if (p.force !== false && Math.abs(I) > .02) {
        const c = Math.sign(sn || 1) * Math.sign(I), Fl = clamp(Math.abs(I) * 22, 26, 110) * s; const C = CO.C;
        [[1, -c], [-1, c]].forEach(([side, dz]) => { const m = [side * g.a * C.wx, 0, side * g.a * C.wz]; const A = Rot.P(g, ...m), Bp = Rot.P(g, m[0], 0, m[2] + dz * Fl); G.arrow(ctx, A[0], A[1], Bp[0], Bp[1], '#dc2626', 4, 12); if (L) G.text(ctx, 'F', Bp[0] + (dz > 0 ? -12 : 12), Bp[1] + (dz > 0 ? 8 : -8), { s: 13, w: 900, c: '#f87171' }); });
      }
      if (p.lines !== false) Rot.blines(ctx, g, S, true, al);
      const B = Rot.rings(ctx, g, S, th, true, CO); Rot.brushes(ctx, g, B);
      // external circuit with the battery (current enters the left brush)
      const ly = g.cy + g.b + 150 * s, Xl = g.cx - 125 * s, Xr = g.cx + 125 * s;
      const path = [[B.R[0] + 22 * s, B.R[1]], [Xr, B.R[1]], [Xr, ly], [Xl, ly], [Xl, B.L[1]], [B.L[0] - 22 * s, B.L[1]]];
      G.wire(ctx, path, '#94a3b8', 3);
      if (p.cur !== false && Math.abs(I) > .02) { ctx.globalAlpha = clamp(Math.abs(I) / 3, .45, 1); flow2(ctx, I > 0 ? path : path.slice().reverse(), S.ph * 1.5, '#b91c1c', 28, 6); ctx.globalAlpha = 1; }
      setRaw(ctx, 1); ctx.fillStyle = THEME.book ? '#fff' : '#0f172a'; setRaw(ctx, 0); ctx.fillRect(g.cx + 44 * s - 10, ly - 20, 20, 40);
      cell(ctx, g.cx + 44 * s, ly, false, p.V + ' V');
      G.meter(ctx, g.cx - 40 * s, ly - 4, 24, I, 12, 'A', fmt(I, 3) + ' A');
      if (L) { G.text(ctx, 'مبادل', g.cx - 100 * s, B.L[1] - 22 * s, { s: 11.5, w: 800, c: '#fde68a', bg: 'rgba(15,23,42,.65)' }); G.text(ctx, 'rpm ≈ ' + Math.round((S.w || 0) * 60 / TAU), g.cx, 20, { s: 12.5, w: 900, mono: 1, c: '#fde68a', bg: 'rgba(15,23,42,.6)' }); if (S.hold) G.text(ctx, 'الملف مُمسَك باليد', g.cx, 44, { s: 11.5, w: 800, c: '#fff', bg: '#7c3aed' }); }
      if (p.top !== false) Rot.top(ctx, g, S, th, { kind: 'mot', circ: p.cur !== false ? circ : 0, F: p.force !== false ? Math.sign(sn || 1) * I / 3 : 0, vec: p.vec !== false });
      // V = εback + IR bar
      if (p.sch !== false) {
        const bx = 72, bw = w - bx - 18, by = Math.max(ly + 40, h * .68), bh = 86; if (by + bh < h - 70) {
          box2(ctx, bx, by, bw, bh); G.text(ctx, 'V = εback + IR   ⇐   I = (V − εback) / R', bx + bw / 2, by + 15, { s: 12.5, w: 900, c: '#e2e8f0' });
          const x0 = bx + 16, x1 = bx + bw - 16, Vm = 24, X = v => x0 + clamp(v / Vm, -.2, 1.2) * (x1 - x0), yb = by + 32;
          const eb = S.eb || 0, ir = I * p.Rm; ctx.fillStyle = '#2563eb'; ctx.fillRect(X(0), yb, X(eb) - X(0), 22); ctx.fillStyle = '#dc2626'; ctx.fillRect(X(eb), yb, X(eb + ir) - X(eb), 22);
          ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(p.V), yb - 5); ctx.lineTo(X(p.V), yb + 27); ctx.stroke();
          G.text(ctx, 'εback = ' + fmt(eb, 3) + ' V', X(0) + 6, yb + 38, { s: 11.5, w: 800, c: '#60a5fa', a: 'left' }); G.text(ctx, 'IR = ' + fmt(ir, 3) + ' V', X(eb + ir / 2), yb + 11, { s: 11, w: 900, c: '#fff' }); G.text(ctx, 'V = ' + p.V + ' V', X(p.V), yb + 38, { s: 11.5, w: 900, c: '#4ade80' });
        }
      }
    };
    E.drags = S => { const g = Rot.geo(S), s = g.sc; const L = Rot.drags(S, S => { S.w = Math.max(0, S.hw / .05); }); const p = S.p;
      const py = g.b + 30 * s, pr = 22 * s, lev = Rot.P(g, -pr - 70 * s, py + 26 * s - p.load * 30 * s, 0);
      L.push({ id: 'brake', x: lev[0], y: lev[1], r: 14, axis: 'y', tip: 'اسحب ذراع المكبح للأسفل لزيادة الحمل', down: S => { S._l0 = S.p.load; }, drag: (S, d) => setParam(S, 'load', S._l0 + (d.y - d.sy) / (30 * s + 20)) });
      const ly = g.cy + g.b + 150 * s; L.push({ id: 'bat', x: g.cx + 44 * s, y: ly, w: 44, h: 44, axis: 'y', hint: false, tip: 'اسحب للأعلى/الأسفل أو العجلة: الفولطية المسلطة', down: S => { S._V0 = S.p.V; }, drag: (S, d) => setParam(S, 'V', S._V0 - (d.y - d.sy) / 6), wheel: (S, st) => setParam(S, 'V', S.p.V + st) });
      return L; };
    E.field = (S, x, y) => Rot.field(S, x, y); E.fieldRef = () => .3;
    Object.defineProperty(E, '_rotB', { value: 1 });
    E.howto = 'المحرك يدور بتأثير القوتين F = BIL على ضلعي الملف (بالأحمر) — لاحظ في المنظر العلوي أنهما مزدوج يدير الملف، وأن المبادل يعكس التيار في الملف كل نصف دورة فيبقى الدوران باتجاه واحد. <b>اسحب ذراع المكبح</b> للأسفل لزيادة الحمل: تقل السرعة فتقل εback ويزداد التيار. <b>امسك الملف</b> (اسحبه) وأوقفه: εback = 0 والتيار أعظم ما يمكن. أدره بيدك أسرع من المحرك فتصبح εback أكبر من V وينعكس التيار (يعمل مولداً). اسحب البطارية لتغيير V.';
  })();

  /* =====================================================================
     6) Mutual induction between two coils (book fig. 49, p.79)
     ===================================================================== */
  (() => {
    const E = EXC('mutual'); if (!E) return;
    E.controls = E.controls.concat([TG('lines', 'خطوط المجال المغناطيسي للملف الابتدائي', true, null, 'bfield'), TG('ind', 'المجال المحتث في الثانوي (لنز)', true, null, 'flip'),
      TG('cur', 'اتجاه التيار في الملفين', true, null, 'current'), TG('scope', 'رسم I₁ و ε₂ على اللوحة', true, null, 'graph'), TG('lbl', 'تسميات توضيحية', true, null, 'labels')]);
    const oldSetup = E.setup; E.setup = S => { oldSetup(S); S.sw = true; S.q1 = 0; S.q2 = 0; S._lc = null; };
    E.update = (S, dt) => {
      const p = S.p; let rh = p.rh; if (p.auto) rh = 16 + 13 * (2 / Math.PI) * Math.asin(Math.sin(S.t * 2)); S.rhE = rh;
      const I = S.sw === false ? 0 : 12 / (rh + 2); const old = S.I1; S.I1 += (I - S.I1) * Math.min(1, dt * (S.sw === false ? 45 : 30));
      const L1 = .5, L2 = .08; const k = (p.core ? .95 : .35) * Math.exp(-p.dist * 2.2); S.M = k * Math.sqrt(L1 * L2); S.e2 = -S.M * (S.I1 - old) / Math.max(dt, 1e-4);
      S.q1 += S.I1 * 40 * dt; S.q2 += Math.min(Math.abs(S.e2), 3) * 90 * dt; hist(S, 'h1', S.I1); hist(S, 'h2', S.e2);
    };
    const geo = S => {
      const w = S.W || 820, h = S.H || 740, p = S.p; const sc = clamp(Math.min(w / 820, h / 760), .6, 1.15); const cy = h * .4, r = 52 * sc, hw1 = 88 * sc, hw2 = 62 * sc; const gap = (20 + p.dist * 160) * sc;
      const x1 = Math.max(64 + hw1 + 70 * sc, w * .5 - (hw1 + gap + 2 * hw2) / 2 + 10), x2 = x1 + hw1 + gap + hw2;
      const coreL = x1 - hw1 - 16, coreR = p.core ? x2 + hw2 + 16 : x1 + hw1 + 16;
      return { w, h, sc, cy, r, hw1, hw2, gap, x1, x2, coreL, coreR, ty: cy - r - 88 * sc, by: cy + r + 92 * sc };
    };
    const lines = (S, g) => {
      const key = [Math.round(g.x1), Math.round(g.x2), g.cy, S.p.core, g.w, g.h].join(); if (S._lc && S._lc.key === key) return S._lc;
      const Np = [S.p.core ? g.coreR - 6 : g.x1 + g.hw1, g.cy], Sp = [g.coreL + (S.p.core ? 6 : 16), g.cy];
      const ext = dipoleLines(Np, Sp, 22, [-60, -60, g.w + 60, g.h + 60]).filter(l => l.length > 6 && !l.some(q => q[0] > Sp[0] + 4 && q[0] < Np[0] - 4 && Math.abs(q[1] - g.cy) < g.r + 4));
      const cross = pts => { for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i]; if ((a[0] - g.x2) * (b[0] - g.x2) <= 0 && a[0] !== b[0]) { const yy = a[1] + (b[1] - a[1]) * (g.x2 - a[0]) / (b[0] - a[0]); if (Math.abs(yy - g.cy) < g.r - 3) return true; } } return false; };
      const L = ext.map(pts => ({ pts, th: cross(pts) })); const nin = 5; const inner = []; for (let k = 0; k < nin; k++) { const y = g.cy + (k - (nin - 1) / 2) * g.r * .34; inner.push({ pts: [[Sp[0], y], [Np[0], y]], th: Np[0] > g.x2 && Sp[0] < g.x2 }); }
      S._lc = { key, L: L.concat(inner), n: L.concat(inner).filter(q => q.th).length, tot: L.length + nin }; return S._lc;
    };
    const coilT = (ctx, x, cy, hw, r, n, col, front, dir, al) => { for (let i = 0; i < n; i++) { const xx = x - hw + (i + .5) * 2 * hw / n, rx = hw / n * .55; ctx.strokeStyle = front ? col : shade(col, -55); ctx.lineWidth = front ? 3.2 : 2; ctx.beginPath(); ctx.ellipse(xx, cy, rx, r, 0, -Math.PI / 2, Math.PI / 2, !front); ctx.stroke(); if (front && dir && i % 2 === 1) { ctx.globalAlpha = al; chev(ctx, xx + rx, cy + dir * 4, dir * Math.PI / 2, 6, '#ea580c'); ctx.globalAlpha = 1; } } };
    E.draw = (ctx, w, h, S) => {
      G.bg(ctx, w, h); const p = S.p, g = geo(S), L = p.lbl !== false; const Imax = 6, f = clamp(S.I1 / Imax, 0, 1), ae2 = Math.abs(S.e2), kick = ae2 > .01;
      const LC = lines(S, g);
      // wires & circuits (behind)
      const rhx = g.x1, rhw = 120 * g.sc, rx0 = rhx - rhw / 2, fx = rx0 + (clamp(S.rhE ?? p.rh, 2, 30) - 2) / 28 * rhw;
      const pL = [[g.x1 - g.hw1 + 4, g.cy - g.r], [g.x1 - g.hw1 + 4, g.ty], [g.x1 - g.hw1 - 40 * g.sc, g.ty]], swX = g.x1 + g.hw1 + 12 * g.sc;
      const prim = [[g.x1 + g.hw1 - 4, g.cy - g.r], [g.x1 + g.hw1 - 4, g.ty], [g.x1 - g.hw1 - 40 * g.sc, g.ty]];
      G.wire(ctx, [[g.x1 - g.hw1 + 4, g.cy - g.r], [g.x1 - g.hw1 + 4, g.ty], [g.x1 + g.hw1 - 4, g.ty], [g.x1 + g.hw1 - 4, g.cy - g.r]], '#e5484d', 3);
      const sec = [[g.x2 - g.hw2 + 4, g.cy + g.r], [g.x2 - g.hw2 + 4, g.by], [g.x2 + g.hw2 - 4, g.by], [g.x2 + g.hw2 - 4, g.cy + g.r]];
      G.wire(ctx, sec, '#64748b', 3);
      // core
      if (p.core) { ctx.fillStyle = '#6b7280'; rr(ctx, g.coreL, g.cy - g.r * .45, g.coreR - g.coreL, g.r * .9, 4); ctx.fill(); ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 1; ctx.stroke(); }
      coilT(ctx, g.x1, g.cy, g.hw1, g.r, 12, '#e8914a', false); coilT(ctx, g.x2, g.cy, g.hw2, g.r, 8, '#d97706', false);
      // field lines
      if (p.lines !== false && f > .01) {
        LC.L.forEach(({ pts, th }) => { const a = th ? clamp(.35 + f * 1.3, .35, 1) : clamp(.2 + f * .7, .2, .6); ctx.strokeStyle = th ? `rgba(37,99,235,${a})` : `rgba(100,116,139,${a})`; ctx.lineWidth = th ? 2.2 : 1.2; ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke();
          if (pts.length === 2) { const x = (pts[0][0] + pts[1][0]) / 2; chev(ctx, g.x1, pts[0][1], 0, 5, `rgba(37,99,235,${a})`); if (th) chev(ctx, g.x2, pts[0][1], 0, 5, `rgba(37,99,235,${a})`); void x; }
          else { const i = Math.floor(pts.length * .35); if (i > 0 && i < pts.length - 2) { const q0 = pts[i], q1 = pts[i + 2]; chev(ctx, q0[0], q0[1], Math.atan2(q1[1] - q0[1], q1[0] - q0[0]), 5, th ? `rgba(37,99,235,${a})` : `rgba(100,116,139,${a})`); } } });
      }
      // induced field in the secondary
      if (p.ind !== false && kick) { const right = S.e2 > 0; const al = clamp(ae2 * 2, .4, 1); ctx.setLineDash([7, 5]); G.arrow(ctx, right ? g.x2 - g.hw2 + 6 : g.x2 + g.hw2 - 6, g.cy - g.r * .66, right ? g.x2 + g.hw2 - 6 : g.x2 - g.hw2 + 6, g.cy - g.r * .66, `rgba(234,88,12,${al})`, 3.2, 12); ctx.setLineDash([]); if (L) lbl(ctx, 'B المحتث يعاكس التغير', g.x2, g.cy - g.r - 14, 'rgba(234,88,12,.92)', { s: 11 }); }
      coilT(ctx, g.x1, g.cy, g.hw1, g.r, 12, '#e8914a', true, p.cur !== false && S.I1 > .05 ? 1 : 0, clamp(f * 1.5, .4, 1));
      coilT(ctx, g.x2, g.cy, g.hw2, g.r, 8, '#d97706', true, p.cur !== false && kick ? (S.e2 < 0 ? -1 : 1) : 0, clamp(ae2 * 2, .4, 1));
      // primary: battery + rheostat + switch on the top wire
      setRaw(ctx, 1); ctx.fillStyle = THEME.book ? '#fff' : '#111a2e'; setRaw(ctx, 0); ctx.fillRect(g.x1 - g.hw1 - 6, g.ty - 20, 20, 40); ctx.fillRect(swX - 34, g.ty - 8, 36, 16);
      cell(ctx, g.x1 - g.hw1 + 4, g.ty, false); G.text(ctx, '12 V', g.x1 - g.hw1 - 22, g.ty + 22, { s: 12, w: 800, c: '#fde68a' });
      ctx.fillStyle = '#e2e8f0'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; rr(ctx, rx0, g.ty - 9, rhw, 18, 4); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#b45309'; ctx.lineWidth = 1.4; ctx.beginPath(); for (let i = 0; i <= 18; i++) ctx.lineTo(rx0 + 4 + i * (rhw - 8) / 18, g.ty + (i % 2 ? 6 : -6)); ctx.stroke();
      ctx.fillStyle = p.auto ? '#94a3b8' : '#7c3aed'; ctx.beginPath(); ctx.moveTo(fx, g.ty - 4); ctx.lineTo(fx - 8, g.ty - 18); ctx.lineTo(fx + 8, g.ty - 18); ctx.closePath(); ctx.fill(); ctx.fillRect(fx - 9, g.ty - 26, 18, 8);
      if (L) G.text(ctx, 'ريوستات ' + fmt(S.rhE ?? p.rh, 3) + ' Ω' + (p.auto ? ' (تلقائي)' : ''), rhx, g.ty - 40, { s: 11.5, w: 800, c: '#c4b5fd' });
      ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(swX - 30, g.ty, 3.5, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(swX, g.ty, 3.5, 0, TAU); ctx.fill();
      ctx.save(); ctx.translate(swX - 30, g.ty); ctx.rotate(S.sw === false ? -.6 : 0); ctx.strokeStyle = S.sw === false ? '#dc2626' : '#16a34a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(32, 0); ctx.stroke(); ctx.restore();
      if (L) G.text(ctx, S.sw === false ? 'مفتوح' : 'مغلق', swX - 15, g.ty + 18, { s: 11, w: 800, c: S.sw === false ? '#f87171' : '#4ade80' });
      if (p.cur !== false && S.I1 > .05) { ctx.globalAlpha = clamp(f * 1.5, .4, 1); flow2(ctx, [[g.x1 - g.hw1 + 4, g.cy - g.r], [g.x1 - g.hw1 + 4, g.ty], [g.x1 + g.hw1 - 4, g.ty], [g.x1 + g.hw1 - 4, g.cy - g.r]].reverse(), S.q1, '#f59e0b', 30, 6); ctx.globalAlpha = 1; }
      if (p.cur !== false && kick) { ctx.globalAlpha = clamp(ae2 * 2, .4, 1); flow2(ctx, S.e2 > 0 ? sec : sec.slice().reverse(), S.q2, '#ea580c', 28, 6); ctx.globalAlpha = 1; }
      void pL; void prim;
      G.meter(ctx, g.x2, g.by, 26, S.e2, 1.2, 'G', fmt(S.e2, 3) + ' V', { center: true });
      if (L) {
        G.text(ctx, 'ملف (1) الابتدائي', g.x1, g.cy + g.r + 18, { s: 12, w: 800, c: '#fdba74' }); G.text(ctx, 'ملف (2) الثانوي', g.x2, g.cy + g.r + 18, { s: 12, w: 800, c: '#fdba74' });
        G.text(ctx, 'I₁ = ' + fmt(S.I1, 3) + ' A', g.x1, g.cy + g.r + 38, { s: 12, mono: 1, c: '#93c5fd' });
        if (p.lines !== false) lbl(ctx, 'خطوط تخترق الملف (2): ' + LC.n, g.x2 + 10, g.cy + g.r + 40, '#2563eb', { s: 11 });
        G.text(ctx, 'M = ' + fmtSI(S.M || 0, 'H'), g.x2 + g.hw2 + 40 * g.sc, g.cy - g.r - 14, { s: 12, w: 900, mono: 1, c: '#fde68a' });
        if (p.core) G.text(ctx, 'قلب من الحديد المطاوع', (g.coreL + g.coreR) / 2, g.cy - g.r - 34 * g.sc, { s: 11, c: '#cbd5e1' });
      }
      if (p.scope !== false) { const sw2 = Math.min(360, w * .5), sx0 = clamp(w / 2 - sw2 / 2 + 20, 72, w - sw2 - 10), sy0 = Math.min(h - 170, g.by + 48); scope2(ctx, sx0, sy0, sw2, 92, [{ pts: S.h1, col: '#3b82f6', name: 'I₁', max: 6 }, { pts: S.h2, col: '#ef4444', name: 'ε₂', max: 1.2 }], 'تيار الابتدائي و ε₂ = −M ΔI₁/Δt', 6); }
    };
    E.drags = S => {
      const g = geo(S), rhw = 120 * g.sc, rx0 = g.x1 - rhw / 2, fx = rx0 + (clamp(S.rhE ?? S.p.rh, 2, 30) - 2) / 28 * rhw, swX = g.x1 + g.hw1 + 12 * g.sc;
      return [
        { id: 'core', x: (g.coreL + g.coreR) / 2, y: g.cy, w: g.coreR - g.coreL, h: g.r * .9, hint: false, tip: 'انقر لإدخال / إخراج قلب الحديد المشترك', click: S => setParam(S, 'core', !S.p.core) },
        { id: 'sec', x: g.x2, y: g.cy, w: g.hw2 * 2 + 10, h: g.r * 2 + 10, axis: 'x', tip: 'اسحب الملف الثانوي لتقريبه أو إبعاده', idle: 'اسحب الملف (2) ✋', down: S => { S._d0 = S.p.dist; }, drag: (S, d) => setParam(S, 'dist', S._d0 + (d.x - d.sx) / (160 * g.sc)) },
        { id: 'rh', x: fx, y: g.ty - 16, w: 26, h: 30, axis: 'x', tip: 'اسحب منزلق الريوستات (يوقف التغيير التلقائي)', down: S => { if (S.p.auto) { setParam(S, 'rh', S.rhE); setParam(S, 'auto', false); } }, drag: (S, d) => setParam(S, 'rh', 2 + 28 * (d.ox + d.x - d.sx - rx0) / rhw) },
        { id: 'sw', x: swX - 15, y: g.ty, w: 44, h: 30, tip: 'انقر لغلق / فتح مفتاح الابتدائي', click: S => { S.sw = S.sw === false; } }
      ];
    };
    E.field = (S, x, y) => {
      const g = geo(S), k = (S.p.core ? 3 : 1) * S.I1 * .004; if (Math.abs(x - g.x1) < g.hw1 && Math.abs(y - g.cy) < g.r) return [k * .25, 0];
      if (S.p.core && x > g.coreL && x < g.coreR && Math.abs(y - g.cy) < g.r * .45) return [k * .25, 0];
      const Np = [S.p.core ? g.coreR - 6 : g.x1 + g.hw1, g.cy], Sp = [g.coreL + (S.p.core ? 6 : 16), g.cy]; const f = (P, s) => { const dx = x - P[0], dy = y - P[1], r = Math.max(10, Math.hypot(dx, dy)); return [s * k * 900 * dx / r ** 3, s * k * 900 * dy / r ** 3]; }; const a = f(Np, 1), b = f(Sp, -1); return [a[0] + b[0], a[1] + b[1]];
    };
    E.fieldRef = () => .005;
    E.howto = '<b>اسحب الملف (2)</b> لتقريبه أو إبعاده: لاحظ عدد خطوط المجال (الزرقاء الغامقة) التي تخترقه ومعامل الحث M. اسحب <b>منزلق الريوستات</b> بسرعة (أو انقر <b>المفتاح</b>) ليتغير I₁: ينحرف الكلفانوميتر فقط أثناء التغير، والسهم البرتقالي المتقطع هو المجال المحتث في الملف (2) الذي يعاكس التغير. انقر القلب الحديدي لإدخاله أو إخراجه.';
  })();

  /* =====================================================================
     7) Electric guitar pickup (book fig. 55, p.83)
     ===================================================================== */
  (() => {
    const E = EXC('app_guitar'); if (!E) return;
    E.controls = E.controls.concat([TG('lines', 'خطوط المجال المغناطيسي', true, null, 'bfield'), TG('poles', 'أقطاب الوتر الممغنط', true, null, 'magnet'), TG('cur', 'التيار المحتث في الملف', true, null, 'current'),
      TG('scope', 'إشارة الملف على اللوحة', true, null, 'graph'), TG('lbl', 'تسميات توضيحية', true, null, 'labels')]);
    const pluck = (S, u, A) => { const bn = []; for (let n = 1; n <= 5; n++) bn.push(2 * A * Math.sin(n * Math.PI * u) / (n * n * Math.PI * Math.PI * u * (1 - u))); S.bn = bn; S.A = 1; S.t0 = S.t; S.hold = null; if (typeof Sound !== 'undefined' && Sound.beep) try { Sound.beep(S.p.note * 2, 1.2, 'triangle', .08 * clamp(Math.abs(A) / 40, .2, 1)); } catch (e) { } };
    const btn = E.controls.find(c => c.type === 'buttons'); if (btn) btn.btns[0].on = S => pluck(S, .5, 36);
    const oldSetup = E.setup; E.setup = S => { oldSetup(S); S.up = .74; S.bn = [0, 0, 0, 0, 0]; S.hold = null; S.hE = []; S.phi = 0; S.emf = 0; S.qc = 0; };
    const geo = S => { const w = S.W || 820, h = S.H || 740; const x0 = Math.max(90, w * .1), x1 = w - 40, ys = h * .2; const px = x0 + (S.up ?? .74) * (x1 - x0); const g0 = 48; return { w, h, x0, x1, ys, px, g0, mt: ys + g0, mh: 150, mw: 38 }; };
    const f1 = S => Math.min(S.p.note / 40, 4.2);
    const disp = (S, u) => { if (S.hold) { const { u: uh, A } = S.hold; return u <= uh ? A * u / uh : A * (1 - u) / (1 - uh); } const tau = S.t - S.t0, w1 = TAU * f1(S); let y = 0; S.bn.forEach((b, i) => { const n = i + 1; if (n * f1(S) > 13) return; y += b * Math.sin(n * Math.PI * u) * Math.cos(n * w1 * tau); }); return y * (S.A || 0); };
    const vel = (S, u) => { if (S.hold) return 0; const tau = S.t - S.t0, w1 = TAU * f1(S); let v = 0; S.bn.forEach((b, i) => { const n = i + 1; if (n * f1(S) > 13) return; v += -b * Math.sin(n * Math.PI * u) * n * w1 * Math.sin(n * w1 * tau); }); return v * (S.A || 0) - .9 * disp(S, u); };
    E.update = (S, dt) => {
      if (!S.hold) S.A *= Math.exp(-dt * .9); const g = geo(S); const y = disp(S, S.up), v = vel(S, S.up);
      const gap = Math.max(8, g.g0 - y); S.phi = g.g0 / gap; const dphi = g.g0 / (gap * gap) * v; S.emf = -dphi / 9; S.yp = y;
      S.qc += clamp(S.emf, -1.5, 1.5) * 120 * dt; hist(S, 'h', y / 40, 300); hist(S, 'hE', S.emf, 300);
    };
    E.draw = (ctx, w, h, S) => {
      G.bg(ctx, w, h); const p = S.p, g = geo(S), L = p.lbl !== false; const px = g.px;
      // pickup: magnet (N top) with coil around it
      const mt = g.mt, mb = mt + g.mh, mw = g.mw;
      const Np = [px, mt + 6], Sp = [px, mb - 6];
      if (p.lines !== false) {
        if (!S._gl || S._gl.k !== px + ',' + mt) S._gl = { k: px + ',' + mt, L: dipoleLines(Np, Sp, 16, [-40, -40, w + 40, h + 40]) };
        S._gl.L.forEach(pts => { ctx.strokeStyle = 'rgba(100,116,139,.45)'; ctx.lineWidth = 1.1; ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); const i = Math.floor(pts.length * .3); if (i > 0 && i < pts.length - 2) chev(ctx, pts[i][0], pts[i][1], Math.atan2(pts[i + 2][1] - pts[i][1], pts[i + 2][0] - pts[i][0]), 4.5, 'rgba(100,116,139,.7)'); });
        // bundle concentrated by the magnetised string
        const ysn = g.ys + (S.yp || 0), n = clamp(Math.round(2 + 6 * (S.phi - .6)), 1, 11), al = clamp(.45 + (S.phi - 1) * .5, .4, 1);
        for (let k = 0; k < n; k++) { const x = px + (k - (n - 1) / 2) * 5.5; ctx.strokeStyle = `rgba(37,99,235,${al})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, mt); ctx.quadraticCurveTo(x, (mt + ysn) / 2, px + (k - (n - 1) / 2) * 3, ysn + 3); ctx.stroke(); }
        chev(ctx, px - 18, (mt + ysn) / 2, -Math.PI / 2, 5, `rgba(37,99,235,${al})`); chev(ctx, px + 18, (mt + ysn) / 2, -Math.PI / 2, 5, `rgba(37,99,235,${al})`);
      }
      ctx.fillStyle = '#dc2626'; rr(ctx, px - mw / 2, mt, mw, g.mh / 2, 4); ctx.fill(); ctx.fillStyle = '#2563eb'; rr(ctx, px - mw / 2, mt + g.mh / 2, mw, g.mh / 2, 4); ctx.fill();
      G.text(ctx, 'N', px, mt + 16, { s: 15, w: 900, c: '#fff' }); G.text(ctx, 'S', px, mb - 14, { s: 15, w: 900, c: '#fff' });
      // coil (front turns) + leads to the amplifier
      const ct = mt + 38, cb = mb - 32, nT = 11, cw = mw + 34;
      const ampX = Math.min(w - 90, px + 150), ampY = mb + 40; const lead1 = [[px + cw / 2, ct + 4], [ampX - 40, ct + 4], [ampX - 40, ampY - 10]], lead2 = [[px + cw / 2, cb - 4], [ampX - 58, cb - 4], [ampX - 58, ampY - 10]];
      const useL = ampX - 40 > px + cw / 2 + 10; const l1 = useL ? lead1 : [[px - cw / 2, ct + 4], [px - cw / 2 - 60, ct + 4], [px - cw / 2 - 60, ampY - 10]], l2 = useL ? lead2 : [[px - cw / 2, cb - 4], [px - cw / 2 - 42, cb - 4], [px - cw / 2 - 42, ampY - 10]];
      G.wire(ctx, l1, '#b45309', 2.5); G.wire(ctx, l2, '#b45309', 2.5);
      for (let i = 0; i < nT; i++) { const y = ct + i * (cb - ct) / (nT - 1); ctx.strokeStyle = '#b45309'; ctx.lineWidth = 3.2; ctx.beginPath(); ctx.ellipse(px, y, cw / 2, 5, 0, 0, Math.PI); ctx.stroke(); }
      const ae = Math.abs(S.emf || 0), on = ae > .02;
      if (p.cur !== false && on) { ctx.globalAlpha = clamp(ae * 2, .4, 1); for (let i = 1; i < nT; i += 3) { const y = ct + i * (cb - ct) / (nT - 1) + 5; chev(ctx, px + (S.emf > 0 ? 6 : -6), y, S.emf > 0 ? 0 : Math.PI, 6, '#ea580c'); } flow2(ctx, S.emf > 0 ? l1 : l1.slice().reverse(), Math.abs(S.qc), '#ea580c', 24, 5); flow2(ctx, S.emf > 0 ? l2.slice().reverse() : l2, Math.abs(S.qc), '#ea580c', 24, 5); ctx.globalAlpha = 1; }
      // amplifier + speaker
      const ax = useL ? ampX - 49 : px - cw / 2 - 51; ctx.fillStyle = '#1f2937'; rr(ctx, ax - 44, ampY - 10, 88, 46, 8); ctx.fill(); G.text(ctx, 'المضخم', ax, ampY + 4, { s: 12, w: 800, c: '#fff' });
      ctx.fillStyle = '#16a34a'; for (let k = 0; k < 8; k++) { const on2 = ae * 7 > k; ctx.globalAlpha = on2 ? 1 : .2; ctx.fillRect(ax - 36 + k * 9, ampY + 20, 7, 8); } ctx.globalAlpha = 1;
      if (L) { G.text(ctx, 'مغناطيس دائم', px - mw / 2 - 78, mt + 22, { s: 11.5, w: 800, c: '#fca5a5' }); G.text(ctx, 'ملف', px - cw / 2 - 22, (ct + cb) / 2 + 20, { s: 11.5, w: 800, c: '#fdba74' }); G.text(ctx, 'اللاقط (اسحبه يميناً/يساراً)', px, mb + 16, { s: 11, c: '#cbd5e1' }); }
      // string + bridge/nut
      ctx.fillStyle = '#78350f'; rr(ctx, g.x0 - 16, g.ys - 18, 12, 36, 3); ctx.fill(); rr(ctx, g.x1 + 4, g.ys - 18, 12, 36, 3); ctx.fill();
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 3.2; ctx.beginPath(); for (let i = 0; i <= 120; i++) { const u = i / 120, x = g.x0 + u * (g.x1 - g.x0), y = g.ys + disp(S, u); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
      if (p.poles !== false) { const y = g.ys + (S.yp || 0); ctx.fillStyle = '#dc2626'; ctx.fillRect(px - 14, y - 7, 28, 5); ctx.fillStyle = '#2563eb'; ctx.fillRect(px - 14, y + 2, 28, 5); G.text(ctx, 'N', px + 24, y - 8, { s: 11, w: 900, c: '#dc2626' }); G.text(ctx, 'S', px + 24, y + 8, { s: 11, w: 900, c: '#2563eb' }); if (L) G.text(ctx, 'الوتر يتمغنط', px - 50, y - 16, { s: 11, w: 800, c: '#e2e8f0' }); }
      if (L) { G.text(ctx, 'وتر معدني (فيرومغناطيسي) — اسحبه ثم أفلته', (g.x0 + g.x1) / 2 - 60, g.ys - 34, { s: 12, w: 800, c: '#e2e8f0', bg: 'rgba(15,23,42,.6)' }); G.text(ctx, p.note + ' Hz', g.x0 + 30, g.ys + 30, { s: 12, w: 900, mono: 1, c: '#fde68a' }); }
      // flux gauge
      if (L) { const bx = 72, by = mt + 10, bw = Math.min(170, px - mw - 150); if (bw > 110) { box2(ctx, bx, by, bw, 66); G.text(ctx, 'الفيض في الملف Φ', bx + bw / 2, by + 14, { s: 11.5, w: 800, c: '#e2e8f0' }); ctx.fillStyle = 'rgba(148,163,184,.35)'; rr(ctx, bx + 10, by + 28, bw - 20, 10, 5); ctx.fill(); ctx.fillStyle = '#2563eb'; rr(ctx, bx + 10, by + 28, (bw - 20) * clamp(S.phi / 2, .03, 1), 10, 5); ctx.fill(); const d = (S.hE.length > 1 ? Math.sign(-(S.emf || 0)) : 0); G.text(ctx, ae > .02 ? (d > 0 ? 'يتزايد ▲' : 'يتناقص ▼') : 'ثابت', bx + bw / 2, by + 52, { s: 11.5, w: 900, c: ae > .02 ? '#f87171' : '#94a3b8' }); } }
      if (p.scope !== false) { const sy0 = Math.max(ampY + 60, h * .64), sh = Math.min(130, h - sy0 - 80); if (sh > 60) scope2(ctx, 72, sy0, w - 90, sh, [{ pts: S.h, col: '#64748b', name: 'إزاحة الوتر فوق اللاقط', max: 1.3 }, { pts: S.hE, col: '#ef4444', name: 'ε في الملف', max: 1.2 }], 'الإشارة إلى المضخم', 3); }
    };
    E.drags = S => {
      const g = geo(S); const u0 = .3, xs = g.x0 + u0 * (g.x1 - g.x0);
      const hitS = (x, y) => { if (x < g.x0 || x > g.x1) return false; const u = (x - g.x0) / (g.x1 - g.x0); return Math.abs(y - g.ys - disp(S, u)) < 16; };
      return [
        { id: 'string', x: xs, y: g.ys + disp(S, u0), hit: hitS, axis: 'y', tip: 'اسحب الوتر للأعلى أو الأسفل ثم أفلته ليهتز — العجلة تغيّر الوتر', idle: 'اسحب الوتر وأفلته ✋',
          down: (S, x) => { S.hold = { u: clamp((x - g.x0) / (g.x1 - g.x0), .06, .94), A: 0 }; S.A = 1; }, drag: (S, d) => { if (S.hold) S.hold.A = clamp(d.y - g.ys, -60, 60); }, up: S => { if (S.hold) pluck(S, S.hold.u, S.hold.A); },
          wheel: (S, s) => { const o = [82.4, 110, 146.8, 196, 329.6]; setParam(S, 'note', o[clamp(o.indexOf(+S.p.note) + s, 0, 4)]); } },
        { id: 'pickup', x: g.px, y: g.mt + g.mh / 2, w: g.mw + 36, h: g.mh, axis: 'x', tip: 'اسحب اللاقط على طول الوتر', drag: (S, d) => { S.up = clamp((d.ox + d.x - d.sx - g.x0) / (g.x1 - g.x0), .12, .92); } }
      ];
    };
    E.field = (S, x, y) => { const g = geo(S); if (Math.abs(x - g.px) < g.mw / 2 && y > g.mt && y < g.mt + g.mh) return null; const Np = [g.px, g.mt + 6], Sp = [g.px, g.mt + g.mh - 6]; const f = (P, s) => { const dx = x - P[0], dy = y - P[1], r = Math.max(8, Math.hypot(dx, dy)); return [s * 30 * dx / r ** 3, s * 30 * dy / r ** 3]; }; const a = f(Np, 1), b = f(Sp, -1); return [a[0] + b[0], a[1] + b[1]]; };
    E.fieldRef = () => 30 / 70 / 70;
    E.readings = S => [rd('تردد الوتر', S.p.note + ' Hz'), rd('تردد الإشارة المتولدة', S.p.note + ' Hz'), rd('سعة الاهتزاز', Math.round((S.A || 0) * 100) + ' %'), rd('ε في الملف (نسبي)', fmt(S.emf || 0, 2))];
    E.explain = S => (S.A || 0) > .05 || S.hold ? 'الوتر الممغنط يقترب من اللاقط ويبتعد عنه فيتغير <b>الفيض</b> الذي يخترق الملف، فتتولد <b>قوة دافعة متناوبة</b> بتردد الوتر نفسه. لاحظ أن ε تكون أكبر حين يمر الوتر بموضع اتزانه (أسرع تغير في الفيض) وتساوي صفراً عند أقصى إزاحة.' : 'اسحب الوتر ثم أفلته (أو اضغط «اعزف»).';
    E.howto = '<b>اسحب الوتر</b> من أي نقطة للأعلى أو الأسفل ثم أفلته فيهتز. الوتر يتمغنط بالمغناطيس (N/S على الوتر)، وحزمة الخطوط الزرقاء بين المغناطيس والوتر تزداد حين يقترب الوتر وتقل حين يبتعد ⇐ يتغير الفيض في الملف فيتولد تيار (الأسهم البرتقالية) يذهب إلى المضخم. <b>اسحب اللاقط</b> على طول الوتر وقارن شكل الإشارة، واستعمل عجلة الفأرة فوق الوتر لتغيير النغمة.';
  })();

  /* =====================================================================
     8) Induction stove: drag the pot on/off the hob, click to swap metal ⇄ glass
     ===================================================================== */
  (() => {
    const E = EXC('app_stove'); if (!E) return;
    const oldSetup = E.setup; E.setup = S => { oldSetup(S); S.potX = 0; S.lift = 0; S.ov = 1; };
    const oldUpdate = E.update;
    E.update = (S, dt) => {
      const T0 = S.T; oldUpdate(S, dt); const p = S.p; const ov = S.ov ?? 1;
      if (p.pot === 'metal') { const heat = p.P * p.f / 25 * 1.2 * dt; S.T = clamp(S.T - heat * (1 - ov), 20, 100); if (ov < .3 && S.T < T0) { /* cooling only */ } }
      S.Ie = (S.Ie || 0) * ov;
    };
    const geo = S => { const w = S.W || 820, h = S.H || 740, p = S.p; const showTop = p.top !== false && w > 620; const cx = showTop ? w * .4 : w * .5, top = h * .64, pw = 150, ph = 150, base = top - 2 - (S.lift || 0);
      const xMin = 70 + pw - cx, xMax = showTop ? (w * .83 - Math.min(96, h * .2) - 30) - cx - pw : w - 20 - pw - cx; const px = cx + clamp(S.potX || 0, xMin, xMax);
      return { w, h, showTop, cx, top, pw, ph, base, px, xMin, xMax, yc: top + 30 };
    };
    const coilR = 36 + 5 * 22 + 8;
    const sym = (ctx, x, y, r, out, col, al) => { ctx.globalAlpha = al; sym2(ctx, x, y, r, out, col, 2); ctx.globalAlpha = 1; };
    E.draw = (ctx, w, h, S) => {
      G.bg(ctx, w, h); const p = S.p, g = geo(S); const showTop = g.showTop, cx = g.cx, top = g.top, metal = p.pot === 'metal';
      const I = S.Ic || 0, Ie = S.Ie || 0, sI = Math.sign(I) || 1, aI = Math.abs(I);
      const pw = g.pw, base = g.base, bt = 14, ph = g.ph, px = g.px;
      const ovX = clamp((Math.min(px + pw, cx + coilR) - Math.max(px - pw, cx - coilR)) / (2 * pw), 0, 1); S.ov = ovX * Math.exp(-(S.lift || 0) / 35);
      ctx.fillStyle = '#1f2937'; rr(ctx, cx - 230, top, 460, 84, 10); ctx.fill(); ctx.fillStyle = 'rgba(148,163,184,.55)'; ctx.fillRect(cx - 225, top, 450, 7); ctx.fillStyle = '#374151'; ctx.fillRect(cx - 170, top + 52, 340, 10);
      const Tn = clamp((S.T - 25) / 75, 0, 1);
      if (metal) { ctx.fillStyle = '#9ca3af'; ctx.strokeStyle = '#6b7280'; } else { ctx.fillStyle = 'rgba(186,230,253,.35)'; ctx.strokeStyle = '#38bdf8'; }
      ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(px - pw, base - ph); ctx.lineTo(px - pw, base); ctx.lineTo(px + pw, base); ctx.lineTo(px + pw, base - ph); ctx.stroke();
      ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(px + pw, base - ph + 16); ctx.lineTo(px + pw + 46, base - ph + 6); ctx.stroke();
      const wc = `rgb(${Math.round(80 + (S.T - 25) * 2)},${Math.round(160 - (S.T - 25))},${Math.round(230 - (S.T - 25) * 1.8)})`;
      setRaw(ctx, 1); ctx.fillStyle = wc; ctx.globalAlpha = .75; ctx.fillRect(px - pw + 3, base - ph + 30, 2 * pw - 6, ph - 30 - bt); ctx.globalAlpha = 1;
      ctx.fillStyle = metal ? `rgb(${Math.round(156 + 90 * Tn)},${Math.round(163 - 70 * Tn)},${Math.round(175 - 120 * Tn)})` : 'rgba(186,230,253,.6)'; ctx.fillRect(px - pw, base - bt, 2 * pw, bt); setRaw(ctx, 0);
      S.bub.forEach(b => { ctx.strokeStyle = '#e0f2fe'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(px - pw + 15 + b.x * (2 * pw - 30), base - bt - 6 - b.y * (ph - 50), 4, 0, TAU); ctx.stroke(); });
      const yc = g.yc;
      if (p.lines !== false && p.P > 0) {
        const al = clamp(aI * 1.1, .08, .95);
        [-1, 1].forEach(side => { const xc = cx + side * 90; for (let k = 0; k < 4; k++) { const rx = 74 + k * 10, ry = 30 + k * 38; ctx.strokeStyle = `rgba(37,99,235,${al})`; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.ellipse(xc, yc, rx, ry, 0, 0, TAU); ctx.stroke(); const dir = side * sI; G.arrow(ctx, xc - dir * 8, yc - ry, xc + dir * 8, yc - ry, `rgba(37,99,235,${al})`, 2, 8); const ix = xc - side * rx; G.arrow(ctx, ix, yc + sI * 8, ix, yc - sI * 8, `rgba(37,99,235,${al})`, 2, 8); } });
        G.text(ctx, sI > 0 ? 'B ↑ نحو الأعلى' : 'B ↓ نحو الأسفل', cx, top + 102, { s: 12, w: 800, c: '#fff', bg: `rgba(37,99,235,${clamp(.35 + aI, .35, 1)})`, raw: 1 });
      }
      for (let k = 0; k < 6; k++) [-1, 1].forEach(side => { const x = cx + side * (36 + k * 22); ctx.fillStyle = '#c87533'; ctx.beginPath(); ctx.arc(x, yc, 8, 0, TAU); ctx.fill(); if (aI > .03) sym(ctx, x, yc, 7, side < 0 ? sI > 0 : sI < 0, '#fff', clamp(aI * 1.4, .3, 1)); });
      const sE = Math.sign(Ie) || 1, aE = Math.abs(Ie);
      if (metal && p.eddy !== false && p.P > 0) {
        for (let k = 0; k < 5; k++) [-1, 1].forEach(side => { const x = cx + side * (30 + k * 26); if (aE > .03 && Math.abs(x - px) < pw - 4) sym(ctx, x, base - bt / 2, 5, side < 0 ? sE > 0 : sE < 0, '#f59e0b', clamp(aE * 1.3, .25, 1)); });
        if (aE > .1) G.text(ctx, '← تيارات دوامة في القاعدة', px + pw + 88, base - 7, { s: 12, w: 800, c: '#fff', bg: 'rgba(217,119,6,.9)', raw: 1 });
        else if (S.ov < .15) G.text(ctx, 'الإناء بعيد عن الملف: لا فيض ⇐ لا تسخين', px, base - ph - 16, { s: 12, w: 800, c: '#fff', bg: 'rgba(71,85,105,.9)', raw: 1 });
      } else if (!metal) G.text(ctx, 'الزجاج عازل: لا تيارات فيه', px + pw + 80, base - 7, { s: 12, w: 800, c: '#fff', bg: 'rgba(14,116,144,.9)', raw: 1 });
      G.text(ctx, 'ملف التسخين (مقطع عرضي) — تيار متناوب', cx, top + 76, { s: 12, c: '#f8fafc', raw: 1 });
      G.text(ctx, Math.round(S.T) + ' °C', px, base - ph + 16, { s: 17, w: 900, c: S.T > 80 ? '#dc2626' : '#1d4ed8' });
      G.text(ctx, (metal ? 'إناء معدني' : 'إناء زجاجي') + ' — انقره للتبديل، اسحبه لتحريكه', px, base - ph - 40, { s: 11, w: 800, c: '#cbd5e1' });
      const gx = Math.max(96, cx - 230 - 10), gy = top + 110; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(gx + 30, gy + 30, 22, 0, TAU); ctx.stroke(); G.arrow(ctx, gx + 30, gy + 30, gx + 30 + 20 * Math.cos(S.ph || 0), gy + 30 - 20 * Math.sin(S.ph || 0), '#2563eb', 2.5, 8);
      G.text(ctx, 'طور التيار ' + (p.slow !== false ? '(مُبطّأ)' : p.f + ' kHz'), gx + 110, gy + 30, { s: 11, c: '#475569' });
      if (showTop) {
        const ix = w * .83, iy = h * .36, R = Math.min(96, h * .2); const cvb = ctx.canvas, rw = cvb.__raw; cvb.__raw = true;
        ctx.fillStyle = THEME.book ? 'rgba(255,255,255,.95)' : 'rgba(15,23,42,.85)'; rr(ctx, ix - R - 18, iy - R - 38, 2 * R + 36, 2 * R + 84, 12); ctx.fill(); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1; ctx.stroke(); cvb.__raw = rw;
        G.text(ctx, 'منظر علوي لقاعدة الإناء', ix, iy - R - 20, { s: 12, w: 800, c: THEME.book ? '#1e293b' : '#e2e8f0', raw: 1 }); setRaw(ctx, 1);
        const po = clamp((px - cx) / coilR, -1.6, 1.6) * R * .6; ctx.fillStyle = metal ? '#cbd5e1' : 'rgba(186,230,253,.55)'; ctx.beginPath(); ctx.arc(ix + po, iy, R * .82, 0, TAU); ctx.fill();
        ctx.setLineDash([5, 4]); ctx.strokeStyle = '#c87533'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ix, iy, R * .95, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
        const circArrows = (x0, r, ccw, col, n, wd, spd) => { for (let k = 0; k < n; k++) { const a = TAU * k / n + (ccw ? -1 : 1) * (S.t || 0) * spd; const d = (ccw ? -1 : 1) * .3; G.arrow(ctx, x0 + r * Math.cos(a), iy + r * Math.sin(a), x0 + r * Math.cos(a + d), iy + r * Math.sin(a + d), col, wd, 8); } };
        if (aI > .03) circArrows(ix, R * .95, sI > 0, '#c87533', 4, 2, .6);
        if (p.lines !== false && aI > .03) for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) if (a || b) sym(ctx, ix + a * R * .42, iy + b * R * .42, 6, sI > 0, '#2563eb', clamp(aI, .25, .9));
        if (aI > .03) sym(ctx, ix, iy, 11, sI > 0, '#2563eb', clamp(aI * 1.2, .3, 1));
        if (metal && p.eddy !== false) { ctx.globalAlpha = clamp(aE * 1.2, .1, 1); [.3, .52, .72].forEach(f => { ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ix + po, iy, R * f, 0, TAU); ctx.stroke(); }); ctx.globalAlpha = 1; if (aE > .05) [.3, .52, .72].forEach(f => circArrows(ix + po, R * f, Ie > 0, `rgba(217,119,6,${clamp(aE * 1.3, .3, 1)})`, 3, 2.4, 1.2)); }
        setRaw(ctx, 0); G.text(ctx, '⊙ B خارج  ⊗ B داخل', ix, iy + R + 12, { s: 11, c: '#2563eb', w: 800, raw: 1 });
        G.text(ctx, metal ? 'البرتقالي: التيار الدوامي (يعاكس تغيّر تيار الملف)' : 'لا تيارات دوامة في الزجاج', ix, iy + R + 30, { s: 10.5, c: '#b45309', w: 700, raw: 1 });
      }
    };
    E.drags = S => { const g = geo(S);
      return [
        { id: 'coil', x: g.cx, y: g.yc + 10, w: 400, h: 50, hint: false, tip: 'عجلة الفأرة فوق الملف: مستوى القدرة', wheel: (S, s) => setParam(S, 'P', S.p.P + s) },
        { id: 'pot', x: g.px, y: g.base - g.ph / 2, w: g.pw * 2, h: g.ph, axis: 'xy', tip: 'اسحب الإناء (ارفعه أو أزحه عن الملف) — انقره للتبديل معدني ⇄ زجاجي', idle: 'اسحب الإناء أو انقره ✋',
          down: S => { S._p0 = S.potX = clamp(S.potX || 0, g.xMin, g.xMax); S._l0 = S.lift || 0; }, drag: (S, d) => { S.potX = clamp(S._p0 + d.x - d.sx, g.xMin, g.xMax); S.lift = clamp(S._l0 - (d.y - d.sy), 0, Math.max(0, g.top - g.ph - 90)); }, up: S => { if ((S.lift || 0) < 14) S.lift = 0; },
          click: S => setParam(S, 'pot', S.p.pot === 'metal' ? 'glass' : 'metal') }
      ]; };
    E.field = (S, x, y) => { const g = geo(S); const k = .004 * (S.Ic || 0); let bx = 0, by = 0; for (let i = 0; i < 6; i++) [-1, 1].forEach(side => { const X = x - (g.cx + side * (36 + i * 22)), Y = y - g.yc, r2 = Math.max(64, X * X + Y * Y); const s = side < 0 ? 1 : -1; bx += s * k * Y / r2 * 10; by += s * k * -X / r2 * 10; }); return [bx, by]; };
    E.fieldRef = S => .004 * S.p.P / 10 * 10 * 6 / 40;
  })();
})();
