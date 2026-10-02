'use strict';
/* ======== Chapter 2 visual upgrades: 3D eddy-current pendulums + Faraday magnet field lines ======== */

/* ---------------- Eddy pendulums (3D, drag the plates) ---------------- */
const Eddy3D = {
  L: 2.6, piv: 2.3, half: .6, Rf: .5,
  px(i) { return i ? 2.45 : -2.45; },
  geo(S, i) {
    const P = S.pend[i], th = P.th, px = this.px(i);
    const c = [px + this.L * Math.sin(th), this.piv - this.L * Math.cos(th)];
    const r = [Math.cos(th), Math.sin(th)], d = [Math.sin(th), -Math.cos(th)];
    return { P, c, r, d, px, m: [px, this.piv - this.L], v: [r[0] * this.L * P.w, r[1] * this.L * P.w], comb: P.f < .5 };
  },
  W(g, a, b, z = 0) { return [g.c[0] + a * g.r[0] - b * g.d[0], g.c[1] + a * g.r[1] - b * g.d[1], z]; },
  local(g, x, y) { const X = x - g.c[0], Y = y - g.c[1]; return [X * g.r[0] + Y * g.r[1], -(X * g.d[0] + Y * g.d[1])]; },
  inPlate(g, x, y) {
    const [a, b] = this.local(g, x, y); const H = this.half;
    if (Math.abs(a) > H || Math.abs(b) > H) return false;
    if (!g.comb || b > .35) return true;
    return ((a + H) % .2) < .11;
  },
  overlap(g) { // fraction of pole-face area covered by the plate
    let n = 0, k = 0; const R = this.Rf;
    for (let i = 0; i < 16; i++) for (let j = 0; j < 16; j++) { const x = -R + 2 * R * (i + .5) / 16, y = -R + 2 * R * (j + .5) / 16; if (x * x + y * y > R * R) continue; n++; if (this.inPlate(g, g.m[0] + x, g.m[1] + y)) k++; }
    return n ? k / n : 0;
  },
  update(S, dt) {
    const gg = 9.8, L = .8, B = S.p.B;
    S.pend.forEach((P, i) => {
      const g = this.geo(S, i); const ov = this.overlap(g);
      const phi = B * ov * Math.PI * .025 * .025; // Wb (pole radius 2.5 cm)
      P.dphi = (P.dphi || 0) + ((phi - (P.phi ?? phi)) / Math.max(dt, 1e-4) - (P.dphi || 0)) * Math.min(1, dt * 20); P.phi = phi; P.ov = ov;
      if (S.hold === i) { P.w = 0; P.eddy = 0; return; }
      const b = 2.6 * B * B * P.f * clamp(ov * 1.15, 0, 1) / (P.f < .5 ? .45 : 1);
      for (let k = 0; k < 10; k++) { const d = dt / 10; const acc = -gg / L * Math.sin(P.th) - b * P.w; P.w += acc * d; P.th += P.w * d; }
      P.eddy = Math.abs(b * P.w); P.b = b;
      P.heat = Math.max(0, (P.heat || 0) + (b * P.w * P.w * .6 - (P.heat || 0) * .35) * dt);
    });
    hist(S, 'hA', deg(S.pend[0].th)); hist(S, 'hB', deg(S.pend[1].th));
  },
  loop(V, L, c, R, cw, z, col, w, t, g, alpha) { // eddy loop clipped to plate, with moving arrowheads
    const N = 40; let seg = [];
    const flush = () => { if (seg.length > 1) V.poly3(L, seg, col, w, { alpha, bias: .2 }); seg = []; };
    for (let k = 0; k <= N; k++) { const a = TAU * k / N; const p = [c[0] + R * Math.cos(a), c[1] + R * Math.sin(a), z]; if (this.inPlate(g, p[0], p[1])) seg.push(p); else flush(); }
    flush();
    for (let k = 0; k < 3; k++) {
      const a = TAU * k / 3 + (cw ? -1 : 1) * t * 3; const da = (cw ? -1 : 1) * .35;
      const p0 = [c[0] + R * Math.cos(a), c[1] + R * Math.sin(a), z], p1 = [c[0] + R * Math.cos(a + da), c[1] + R * Math.sin(a + da), z];
      if (this.inPlate(g, p0[0], p0[1]) && this.inPlate(g, p1[0], p1[1])) V.line(L, p0, p1, col, w, { arrow: true, bias: .25 });
    }
  },
  draw(ctx, w, h, S) {
    const V = S.v3, p = S.p; V.step(1 / 60); G.bg(ctx, w, h, false); V.target = [0, .35, 0]; V.frame(w, h);
    const L = []; const B = p.B;
    S.pend.forEach((P, i) => {
      const g = this.geo(S, i), [mx, my] = g.m, px = g.px;
      // stand + magnet (C-shaped electromagnet: back pole S, front pole N semi-transparent)
      V.box(L, [px, this.piv + .1, 0], [1.5, .14, .5], '#64748b');
      V.box(L, [px, my - 1.2, 0], [1.1, .22, 1.7], '#475569');
      V.box(L, [px, my - .85, -.6], [1.1, .5, .22], '#475569'); V.box(L, [px, my - .85, .6], [1.1, .5, .22], '#475569', { alpha: .5 });
      V.box(L, [px, my, -.42], [1.1, 1.1, .45], '#2563eb');
      V.box(L, [px, my, .42], [1.1, 1.1, .45], '#dc2626', { alpha: .13 });
      V.label(L, [px - .45, my - .42, .66], 'N', { s: 15, w: 900, c: '#fff', bg: '#dc2626', raw: 1, bias: 5 });
      V.label(L, [px + .45, my + .45, -.66], 'S', { s: 14, w: 900, c: '#fff', bg: '#2563eb', raw: 1, bias: 0 });
      // magnetic field lines between the poles (N → S), with ⊗ marks (into the page in front view)
      if (p.lines !== false && B > .01) {
        const al = clamp(.35 + B * .45, .35, 1);
        for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) {
          const x = mx + a * .3, y = my + b * .3;
          V.line(L, [x, y, .19], [x, y, -.19], `rgba(8,145,178,${al})`, 1.6, { arrow: true, bias: -.05 });
          V.sym(L, [x, y, .2], '⊗', `rgba(8,145,178,${al})`, 13, { bias: .3 });
        }
        V.poly3(L, Array.from({ length: 41 }, (_, k) => [mx + this.Rf * Math.cos(TAU * k / 40), my + this.Rf * Math.sin(TAU * k / 40), .2]), 'rgba(8,145,178,.7)', 1.2, { dash: [4, 4], bias: .3 });
      }
      // rod
      V.line(L, [px, this.piv, 0], this.W(g, 0, this.half + .02, 0), '#94a3b8', 3);
      // plate (aluminium) — heat tint
      const ht = clamp((P.heat || 0) / 2.5, 0, 1); const col = ht > .02 ? mixHex('#cbd5e1', '#f97316', ht) : '#cbd5e1';
      const H = this.half; const rects = g.comb ? [[-H, .35, H, H]].concat(Array.from({ length: 6 }, (_, k) => [-H + k * .2, -H, -H + k * .2 + .11, .35])) : [[-H, -H, H, H]];
      rects.forEach(([a0, b0, a1, b1]) => {
        V.quad(L, [this.W(g, a0, b0, .03), this.W(g, a1, b0, .03), this.W(g, a1, b1, .03), this.W(g, a0, b1, .03)], col, { alpha: .93 });
        V.quad(L, [this.W(g, a0, b0, -.03), this.W(g, a1, b0, -.03), this.W(g, a1, b1, -.03), this.W(g, a0, b1, -.03)], col, { k: .75, alpha: .93 });
      });
      // eddy currents
      const sp = Math.hypot(g.v[0], g.v[1]); const Ie = B * sp * (P.ov || 0) * P.f;
      if (p.cur !== false && Ie > .02 && sp > .05) {
        const u = [g.v[0] / sp, g.v[1] / sp], al = clamp(Ie * 1.2, .25, 1), wd = clamp(1.2 + Ie * 2.5, 1.2, 4);
        if (!g.comb) {
          const d = .42, cA = [mx + u[0] * d, my + u[1] * d], cB = [mx - u[0] * d, my - u[1] * d];
          // ahead of the pole: plate leaving field → Φ decreases → CW (B into page); behind: Φ increases → CCW
          this.loop(V, L, cA, .3, true, .07, '#f59e0b', wd, S.t, g, al);
          this.loop(V, L, cB, .3, false, .07, '#f59e0b', wd, S.t, g, al);
          if (p.lbl !== false) {
            if (this.inPlate(g, cA[0], cA[1])) V.label(L, [cA[0], cA[1] + .42, .1], 'Φ يتناقص ↻', { s: 11, w: 800, c: '#92400e', bg: 'rgba(254,243,199,.92)', raw: 1 });
            if (this.inPlate(g, cB[0], cB[1])) V.label(L, [cB[0], cB[1] + .42, .1], 'Φ يتزايد ↺', { s: 11, w: 800, c: '#92400e', bg: 'rgba(254,243,199,.92)', raw: 1 });
          }
        } else { // comb: tiny loops confined inside each tooth
          for (let k = 0; k < 6; k++) { const a = -H + k * .2 + .055; for (const b of [-.35, -.05, .2]) { const q = this.W(g, a, b, .07); if (Math.hypot(q[0] - mx, q[1] - my) < this.Rf) this.loop(V, L, [q[0], q[1]], .04, k % 2 === 0, .07, '#f59e0b', 1, S.t, g, al * .55); } }
        }
      }
      // force & velocity arrows
      if (p.force !== false && sp > .05) {
        const u = [g.v[0] / sp, g.v[1] / sp]; const o = this.W(g, 0, -H - .12, .1);
        V.line(L, o, [o[0] + u[0] * clamp(sp * .35, .15, .7), o[1] + u[1] * clamp(sp * .35, .15, .7), .1], '#16a34a', 2.5, { arrow: true, bias: .4 });
        const Fm = (P.b || 0) * Math.abs(P.w) * .25;
        if (Fm > .02 && B > .01) { const q = this.W(g, 0, 0, .12); V.line(L, q, [q[0] - u[0] * clamp(Fm, .15, .9), q[1] - u[1] * clamp(Fm, .15, .9), .12], '#dc2626', 3.5, { arrow: true, bias: .45 }); if (p.lbl !== false && !g.comb) V.label(L, [q[0] - u[0] * clamp(Fm, .15, .9), q[1] - u[1] * clamp(Fm, .15, .9) - .2, .12], 'F معرقلة', { s: 11, w: 800, c: '#fff', bg: '#dc2626', raw: 1 }); }
      }
      V.label(L, [px, my - 1.55, 0], g.comb ? 'صفيحة مشقوقة (أسنان مشط)' : 'صفيحة كاملة', { s: 13, w: 800, c: '#1e293b', bg: 'rgba(241,245,249,.9)', raw: 1 });
    });
    V.render(ctx, L);
    S.pend.forEach((P, i) => { const g = this.geo(S, i); V.handle(ctx, 'p' + i, this.W(g, 0, -this.half - .02, .1), [g.r[0], g.r[1], 0], 'اسحب الصفيحة ثم أفلتها', '#7c3aed', dd => { P.th = clamp(P.th + dd / this.L, -1.15, 1.15); P.w = 0; S.hold = i; }); });
    // legend
    const lg = [['⊗', '#0891b2', 'B نحو داخل الصفحة'], ['↻', '#f59e0b', 'تيار دوامي'], ['→', '#dc2626', 'قوة معرقلة FB'], ['→', '#16a34a', 'السرعة v']];
    const cvb = ctx.canvas, rw = cvb.__raw; cvb.__raw = true;
    ctx.fillStyle = 'rgba(255,255,255,.92)'; rr(ctx, 62, 10, 166, 96, 10); ctx.fill(); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1; ctx.stroke();
    ctx.direction = 'rtl'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    lg.forEach(([s, c, t], k) => { ctx.fillStyle = c; ctx.font = '900 16px sans-serif'; ctx.fillText(s, 216, 28 + k * 21); ctx.fillStyle = '#1e293b'; ctx.font = '700 12px Tajawal,sans-serif'; ctx.fillText(t, 194, 28 + k * 21); });
    ctx.textBaseline = 'alphabetic'; cvb.__raw = rw;
    G.text(ctx, 'اسحب أي صفيحة جانباً ثم أفلتها — واسحب الفراغ لتدوير المنظر', w / 2 + 40, 18, { s: 12, c: '#334155', bg: 'rgba(241,245,249,.92)', raw: 1 });
  }
};
function mixHex(a, b, t) { const A = hexRGB(a), B = hexRGB(b); return '#' + A.map((v, i) => Math.round(lerp(v, B[i], t)).toString(16).padStart(2, '0')).join(''); }
(() => {
  const E = EXPS.find(e => e.id === 'eddy'); if (!E) return;
  const oldSetup = E.setup;
  E.setup = S => { oldSetup(S); S.v3 = new View3D(); S.v3.zoom = 1.15; S.v3.yaw = -.3; S.v3.pitch = .16; S.hold = null; };
  E.update = (S, dt) => Eddy3D.update(S, dt);
  E.draw = (ctx, w, h, S) => Eddy3D.draw(ctx, w, h, S);
  E.pointer = (S, t, x, y) => { const r = S.v3.pointer(t === 'dbl' ? 'up' : t, x, y); if (t === 'up' || t === 'dbl') S.hold = null; if (t === 'dbl') S.v3.setView(-.3, .16); const cv = Runner.cv; if (cv) cv.style.cursor = r === 'handle' || r === 'hover' ? 'grab' : S.v3.orbit ? 'grabbing' : 'default'; };
  E.wheel = (S, dy) => { S.v3.zoom = clamp(S.v3.zoom * (dy < 0 ? 1.1 : 1 / 1.1), .5, 2.5); };
  E.controls = E.controls.concat([
    BT('المنظر', [{ t: 'ثلاثي الأبعاد', on: S => S.v3.setView(-.3, .16) }, { t: 'أمامي (كالكتاب)', on: S => S.v3.setView(0, 0) }, { t: 'جانبي', on: S => S.v3.setView(-1.3, .1) }]),
    TG('lines', 'خطوط المجال المغناطيسي B', true), TG('cur', 'التيارات الدوامة', true), TG('force', 'القوة المعرقلة والسرعة', true), TG('lbl', 'تسميات توضيحية', true)]);
  E.readings = S => {
    const [A, Bp] = S.pend; const amp = P => { const En = .5 * P.w * P.w * .8 / 9.8 + (1 - Math.cos(P.th)); return deg(Math.acos(clamp(1 - En, -1, 1))); };
    const pct = P => Math.round(100 * (1 - Math.cos(rad(amp(P)))) / (1 - Math.cos(rad(S.p.a0))));
    return [rd('سعة الصفيحة الكاملة', fmt(amp(A), 3, '°')), rd('سعة الصفيحة المشقوقة', fmt(amp(Bp), 3, '°')), rd('الفيض خلال الكاملة Φ', fmtSI(A.phi || 0, 'Wb')), rd('ΔΦ/Δt (الكاملة)', fmtSI(A.dphi || 0, 'Wb/s')), rd('الطاقة المتبقية (كاملة)', pct(A) + ' %'), rd('الطاقة المتبقية (مشقوقة)', pct(Bp) + ' %')];
  };
  E.howto = 'مختبر ثلاثي الأبعاد: القطب الشمالي N (شفاف) أمام الصفيحة والجنوبي S خلفها، فخطوط المجال تخترق الصفيحة عمودياً (⊗). <b>اسحب أي صفيحة</b> بالمقبض البنفسجي ثم أفلتها. لاحظ: الدوامتان تظهران فقط حين تتحرك الصفيحة داخل المجال — دوامة أمام القطب (Φ يتناقص) وأخرى خلفه (Φ يتزايد) باتجاهين متعاكسين، والقوة الحمراء تعاكس السرعة دائماً (لنز). في المشط تنقطع المسارات فتبقى الدوامات صغيرة جداً.';
})();

/* ---------------- Faraday: magnet & coil — real dipole field lines ---------------- */
function dipoleLines(N, Sp, n, bx) {
  const out = []; const ax = Math.atan2(N[1] - Sp[1], N[0] - Sp[0]);
  for (let k = 0; k < n; k++) {
    const a = ax - 2.7 + 5.4 * k / (n - 1); let x = N[0] + 7 * Math.cos(a), y = N[1] + 7 * Math.sin(a); const pts = [[x, y]];
    for (let s = 0; s < 900; s++) {
      const dx1 = x - N[0], dy1 = y - N[1], r1 = Math.pow(dx1 * dx1 + dy1 * dy1, 1.5) + 1e-6;
      const dx2 = x - Sp[0], dy2 = y - Sp[1], r2 = Math.pow(dx2 * dx2 + dy2 * dy2, 1.5) + 1e-6;
      let bxv = dx1 / r1 - dx2 / r2, byv = dy1 / r1 - dy2 / r2; const m = Math.hypot(bxv, byv) || 1;
      x += 4 * bxv / m; y += 4 * byv / m; pts.push([x, y]);
      if (Math.hypot(x - Sp[0], y - Sp[1]) < 7) break;
      if (x < bx[0] || x > bx[2] || y < bx[1] || y > bx[3]) break;
    }
    out.push(pts);
  }
  return out;
}
(() => {
  const E = EXPS.find(e => e.id === 'faraday_magnet'); if (!E) return;
  E.controls = E.controls.concat([TG('lines', 'خطوط المجال المغناطيسي', true), TG('cur', 'اتجاه التيار المحتث في اللفات', true)]);
  E.draw = (ctx, w, h, S) => {
    G.bg(ctx, w, h); const p = S.p; const cx = w * .56, cy = h * .42; const cw = 200, ch = 90;
    const mx = cx + S.mx; const mw = 150, mh = 38; const x0 = cx + cw / 2 - 30, cL = x0 - cw / 2, cR = x0 + cw / 2;
    // magnet: N faces the coil unless flipped
    const nR = [mx + mw / 2 - 12, cy], nL = [mx - mw / 2 + 12, cy];
    const Npos = p.flip ? nL : nR, Spos = p.flip ? nR : nL;
    let thread = 0;
    if (p.lines !== false) {
      const lines = dipoleLines(Npos, Spos, 28, [-40, -40, w + 40, h + 40]);
      // flux through the coil's middle cross-section (plane x = x0, radius ch/2)
      const rad0 = ch / 2 - 4, span = mx - mw / 2 < x0 && x0 < mx + mw / 2;
      const crossIn = pts => { for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i]; if ((a[0] - x0) * (b[0] - x0) <= 0 && a[0] !== b[0]) { const yy = a[1] + (b[1] - a[1]) * (x0 - a[0]) / (b[0] - a[0]); if (Math.abs(yy - cy) < rad0) return true; } } return false; };
      lines.forEach(pts => {
        const th = span ? !crossIn(pts) : crossIn(pts); if (th) thread++;
        ctx.strokeStyle = th ? 'rgba(37,99,235,.95)' : 'rgba(100,116,139,.55)'; ctx.lineWidth = th ? 2.2 : 1.2;
        ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke();
        // arrows (N → S direction) at two places
        [.25, .6].forEach(f => { const i = Math.floor(pts.length * f); if (i > 0 && i < pts.length - 2 && pts.length > 12) { const a = pts[i], b = pts[i + 2]; G.arrow(ctx, a[0], a[1], b[0], b[1], th ? '#2563eb' : '#94a3b8', th ? 2 : 1.2, th ? 9 : 7); } });
      });
    }
    G.coil(ctx, x0, cy, cw, ch, Math.round(p.N / 25) + 4, '#c87533', p.core);
    G.magnet(ctx, mx, cy, mw, mh, !p.flip);
    // induced current / pole
    const I = S.I; const turns = Math.round(p.N / 25) + 4;
    if (Math.abs(S.emf) > .003) {
      const facing = p.flip ? 'S' : 'N'; const inc = S.dphi * S.phi > 0; const lbl = inc ? facing : (facing === 'N' ? 'S' : 'N');
      G.text(ctx, 'قطب محتث: ' + lbl + (inc ? ' (يتنافر)' : ' (يتجاذب)'), cL, cy - ch / 2 - 18, { s: 13, w: 900, c: '#fff', bg: lbl === 'N' ? '#dc2626' : '#2563eb', raw: 1 });
      if (p.cur !== false) { const up = lbl === 'N'; const al = clamp(Math.abs(I) * 40, .35, 1); for (let i = 0; i < turns; i += 2) { const xx = cL + (i + .5) * cw / turns + cw / turns * .45; G.arrow(ctx, xx, cy + (up ? 12 : -12), xx, cy + (up ? -12 : 12), `rgba(234,88,12,${al})`, 2.4, 8); } }
    }
    // wires to galvanometer
    const gx = x0, gy = h * .8;
    const wA = [[cL + 6, cy + ch / 2], [cL + 6, gy], [gx - 40, gy]], wB = [[cR - 6, cy + ch / 2], [cR - 6, gy], [gx + 40, gy]];
    G.wire(ctx, wA, '#e5484d'); G.wire(ctx, wB, '#64748b');
    G.dotsAlong(ctx, wA, (S.q = (S.q || 0) + I * 900 * .016), '#f59e0b');
    G.meter(ctx, gx, gy - 10, 30, I * 1000, 1, 'G', fmt(I * 1000, 2) + ' mA', { center: true });
    G.text(ctx, 'N = ' + p.N + ' لفة', x0, cy + ch / 2 + 20, { s: 12, c: '#b45309' });
    // flux gauge
    if (p.lines !== false) {
      const bx = 66, by = 14, bw = 190; const cvb = ctx.canvas, rw = cvb.__raw; cvb.__raw = true;
      ctx.fillStyle = 'rgba(255,255,255,.93)'; rr(ctx, bx, by, bw, 74, 10); ctx.fill(); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1; ctx.stroke();
      ctx.direction = 'rtl'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#1e293b'; ctx.font = '800 12px Tajawal,sans-serif';
      ctx.fillText('خطوط تخترق الملف: ' + thread + ' / 28', bx + bw - 10, by + 16);
      ctx.fillStyle = '#e2e8f0'; rr(ctx, bx + 10, by + 30, bw - 20, 12, 6); ctx.fill(); ctx.fillStyle = '#2563eb'; rr(ctx, bx + 10, by + 30, Math.max(6, (bw - 20) * thread / 20), 12, 6); ctx.fill();
      const tr = Math.abs(S.dphi) < 1e-7 ? 'الفيض ثابت ⇒ لا تيار' : (S.dphi * S.phi > 0 ? 'الفيض يتزايد ▲' : 'الفيض يتناقص ▼');
      ctx.fillStyle = Math.abs(S.dphi) < 1e-7 ? '#64748b' : '#b91c1c'; ctx.fillText(tr, bx + bw - 10, by + 58); ctx.textBaseline = 'alphabetic'; cvb.__raw = rw;
    }
  };
  E.howto = 'اسحب المغناطيس بالفأرة. الخطوط <b>الزرقاء الغامقة</b> هي الخطوط التي تخترق الملف فعلاً؛ عدّها في المؤشر أعلى اليسار. يتولد تيار (وتتحرك النقاط في السلك) فقط عندما يتغير هذا العدد، والأسهم البرتقالية على اللفات تبين اتجاه التيار المحتث وفق قانون لنز.';
})();

/* ---- faraday_magnet: direct manipulation + field for compass tools ---- */
(() => {
  const E = EXPS.find(e => e.id === 'faraday_magnet'); if (!E) return;
  const geo = S => { const cx = S.W * .56, cy = S.H * .42, mx = cx + S.mx, mw = 150; const nR = [mx + mw / 2 - 12, cy], nL = [mx - mw / 2 + 12, cy]; return { cx, cy, mx, mw, N: S.p.flip ? nL : nR, Sp: S.p.flip ? nR : nL }; };
  E.pointer = null;
  E.drags = S => { const g = geo(S); return [
    { id: 'mag', x: g.mx, y: g.cy, w: 150, h: 40, axis: 'x', tip: 'اسحب المغناطيس نحو الملف أو بعيداً عنه — انقر لعكس قطبيه', idle: 'اسحب المغناطيس ✋', down: S => { S.auto = null; }, drag: (S, d) => { S.mx = clamp(d.ox + (d.x - d.sx) - g.cx, -S.W * .5 + 80, 60); }, click: S => { setParam(S, 'flip', !S.p.flip); } },
    { id: 'coil', x: g.cx + 70, y: g.cy, w: 200, h: 96, axis: 'y', hint: false, tip: 'عجلة الفأرة فوق الملف: تغيير عدد اللفات', wheel: (S, s) => { const o = [50, 100, 200, 400]; const i = clamp(o.indexOf(S.p.N) + s, 0, 3); setParam(S, 'N', o[i]); } }
  ]; };
  E.field = (S, x, y) => { const g = geo(S); if (Math.abs(x - g.mx) < g.mw / 2 + 2 && Math.abs(y - g.cy) < 21) return null; const k = 40 * (S.p.core ? 1 : 1); const f = (P, s) => { const dx = x - P[0], dy = y - P[1], r = Math.max(8, Math.hypot(dx, dy)); return [s * k * dx / r ** 3, s * k * dy / r ** 3]; }; const a = f(g.N, 1), b = f(g.Sp, -1); return [a[0] + b[0], a[1] + b[1]]; };
  E.fieldRef = () => 40 / 60 / 60;
})();
