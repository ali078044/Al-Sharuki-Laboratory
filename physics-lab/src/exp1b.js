'use strict';
/* ======== 3D capacitor lab (dielectric / area / distance) — direct manipulation ======== */
const Cap3D = {
  gap: S => S.p.d * .34 + .25,
  setP(S, k, v) { S.p[k] = v; const c = (S.E.controls || []).find(x => x.k === k); if (c && c._set) c._set(v); },
  setup(S, mode) { capSetup(S); S.conn = mode === 'dielectric' ? false : false; S.mode = mode; S.v3 = new View3D(); S.v3.showLabels = true; if (S.p.show === undefined) S.p.show = 1; },
  draw(ctx, w, h, S) {
    const V = S.v3, p = S.p, r = capPhys(S); V.step(1 / 60); G.bg(ctx, w, h, false); V.target = [0, -.35, 0]; V.frame(w, h);
    const g = this.gap(S), t = .12, A = p.A ?? 1, ins = p.ins ?? 0, k = p.k ?? 1, mode = S.mode;
    const xl = -g / 2, xr = g / 2, shiftY = -(1 - A) * 2;
    const L = [];
    // plates
    V.box(L, [xl - t / 2, 0, 0], [t, 2, 2], '#e07b17');
    V.box(L, [xr + t / 2, shiftY, 0], [t, 2, 2], '#7b8aa0');
    // overlap region
    const y0 = Math.max(-1, shiftY - 1), y1 = Math.min(1, shiftY + 1), hasOv = y1 > y0 + 1e-3;
    // dielectric slab (slides along z)
    const zF = 1 - 2 * ins; // front face of the inserted part (region z<zF? no: slab occupies [1-2ins-?])
    const slabZc = 2 - 2 * ins; // slab spans zc±1
    const showDiel = mode === 'dielectric' && k > 1.01;
    if (showDiel) V.box(L, [0, 0, slabZc], [g * .92, 2, 2], '#60a5fa', { alpha: .24, bias: .05 });
    const inDiel = z => showDiel && z < slabZc + 1 && z > slabZc - 1;
    // field lines (E = V/d is the same inside and outside the slab)
    if (p.lines !== false && hasOv && Math.abs(r.V) > .01) {
      const m = clamp(Math.round(1.5 + Math.abs(r.E) / 1300), 1, 7);
      for (let i = 0; i < m; i++) for (let j = 0; j < m; j++) { const y = y0 + (y1 - y0) * (i + .5) / m, z = -1 + 2 * (j + .5) / m; V.line(L, [xl + .02, y, z], [xr - .02, y, z], '#d97706', 1.8, { arrow: true, bias: .01 }); }
    }
    // free charges on plates (denser opposite the dielectric)
    if (p.charges !== false && Math.abs(r.Q) > 1e-14) {
      const n = clamp(Math.round(1.5 + 4.5 * Math.sqrt(Math.abs(r.E) / 6000)), 1, 7);
      for (let i = 0; i < n; i++) for (let j = 0; j < 2 * n; j++) {
        const y = y0 + (y1 - y0) * (i + .5) / n, z = -1 + 2 * (j + .5) / (2 * n); if (!hasOv) continue;
        const extra = inDiel(z) ? clamp(Math.round(k) - 1, 0, 3) : 0; const dy = (y1 - y0) / n * .28;
        for (let e = 0; e <= extra; e++) { const yy = y + (e ? (e % 2 ? dy : -dy) * Math.ceil(e / 2) : 0); V.sym(L, [xl + .01, yy, z], '+', '#dc2626', 18); V.sym(L, [xr - .01, yy + 0, z], '−', '#1d4ed8', 20); }
      }
      if (showDiel && p.charges !== false) { // bound (polarisation) charges on slab faces
        const nb = clamp(Math.round(n * (1 - 1 / k)), 1, 6);
        for (let i = 0; i < nb; i++) for (let j = 0; j < nb; j++) { const y = y0 + (y1 - y0) * (i + .5) / nb, z = slabZc - 1 + 2 * (j + .5) / nb; if (z > 1) continue; V.sym(L, [xl + g * .06 + .02, y, z], '−', '#1e40af', 12); V.sym(L, [xr - g * .06 - .02, y, z], '+', '#b91c1c', 12); }
      }
    }
    // battery + wires
    const by = -2.05; V.box(L, [0, by, 0], [.9, .45, .45], '#1f2937'); V.box(L, [-.52, by, 0], [.14, .45, .45], '#f5c542');
    if (S.conn) { V.poly3(L, [[xl - t, -1, 0], [xl - .8, -1, 0], [xl - .8, by, 0], [-.6, by, 0]], '#dc2626', 3); V.poly3(L, [[xr + t, shiftY - 1, 0], [xr + .8, shiftY - 1, 0], [xr + .8, by, 0], [.45, by, 0]], '#111827', 3); }
    V.label(L, [0, by - .45, 0], S.conn ? `البطارية ${S.Vb}V (موصولة)` : 'البطارية مفصولة', { s: 12, w: 800, c: S.conn ? '#15803d' : '#b91c1c' });
    V.render(ctx, L);
    // handles
    const HL = [];
    HL.push(['sep', [xr + t, shiftY + 1.1, -.7], [1, 0, 0], 'البعد d = ' + fmt(p.d, 2) + ' mm', '#7c3aed', dd => this.setP(S, 'd', clamp(+(p.d + dd * 2 / .34).toFixed(2), .5, 8))]);
    if (mode === 'area') HL.push(['area', [xr + t + .02, shiftY, 1.05], [0, 1, 0], 'المساحة المتقابلة ' + Math.round(A * 100) + '%', '#0e9f6e', dd => this.setP(S, 'A', clamp(+(A + dd / 2).toFixed(3), .1, 1))]);
    if (showDiel || (mode === 'dielectric')) HL.push(['diel', [0, -1.1, slabZc + 1], [0, 0, 1], 'اسحب العازل: ' + Math.round(ins * 100) + '%', '#2563eb', dd => this.setP(S, 'ins', clamp(+(ins - dd / 2).toFixed(3), 0, 1))]);
    HL.forEach(hh => V.handle(ctx, ...hh));
    // floating digital voltmeter (screen space)
    const vx = 16, vy = h - 96; const cvb = ctx.canvas, rw = cvb.__raw; cvb.__raw = true;
    ctx.fillStyle = '#facc15'; rr(ctx, vx, vy, 150, 80, 12); ctx.fill(); ctx.fillStyle = '#0b1a10'; rr(ctx, vx + 10, vy + 10, 130, 36, 6); ctx.fill();
    ctx.direction = 'ltr'; ctx.fillStyle = '#9fe870'; ctx.font = '800 22px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(fmt(r.V, 3) + ' V', vx + 75, vy + 29);
    ctx.direction = 'rtl'; ctx.fillStyle = '#1f2937'; ctx.font = '800 12px Tajawal,sans-serif'; ctx.fillText('فولطميتر رقمي', vx + 75, vy + 62); ctx.textBaseline = 'alphabetic'; cvb.__raw = rw;
    // probes from meter to plates
    const pl = V.P([xl - t, .6, 1]), pr = V.P([xr + t, shiftY + .6, 1]);
    ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(vx + 40, vy); ctx.quadraticCurveTo(vx + 40, pl[1] + 60, pl[0], pl[1]); ctx.stroke();
    ctx.strokeStyle = '#111827'; ctx.beginPath(); ctx.moveTo(vx + 110, vy); ctx.quadraticCurveTo(vx + 110, pr[1] + 80, pr[0], pr[1]); ctx.stroke();
    [[pl, '#dc2626'], [pr, '#111827']].forEach(([q, c]) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(q[0], q[1], 5, 0, TAU); ctx.fill(); });
    G.text(ctx, 'اسحب المقابض الملوّنة لتحريك الصفيحة أو العازل — واسحب الفراغ لتدوير المنظر', w / 2, 18, { s: 12, c: '#334155', bg: 'rgba(241,245,249,.92)', raw: 1 });
  },
  pointer(S, t, x, y) { const r = S.v3.pointer(t === 'dbl' ? 'up' : t, x, y); if (t === 'dbl') S.v3.setView(-.35, .28); const cv = Runner.cv; if (cv) cv.style.cursor = r === 'handle' || r === 'hover' ? 'grab' : S.v3.orbit ? 'grabbing' : 'default'; },
  wheel(S, dy) { S.v3.zoom = clamp(S.v3.zoom * (dy < 0 ? 1.1 : 1 / 1.1), .5, 2.5); },
  viewBtns: BT('المنظر', [{ t: 'ثلاثي الأبعاد', on: S => S.v3.setView(-.35, .28) }, { t: 'أمامي (كالكتاب)', on: S => S.v3.setView(0, 0) }, { t: 'علوي', on: S => S.v3.setView(0, 1.15) }]),
  showTgls: [TG('lines', 'خطوط المجال الكهربائي', true), TG('charges', 'الشحنات على الصفائح والعازل', true)]
};
[['c_dielectric', 'dielectric'], ['c_area', 'area'], ['c_dist', 'dist']].forEach(([id, mode]) => {
  const E = EXPS.find(e => e.id === id); if (!E) return;
  const oldSetup = E.setup;
  E.setup = S => { oldSetup(S); S.v3 = new View3D(); S.v3.showLabels = true; S.mode = mode; };
  E.draw = (ctx, w, h, S) => Cap3D.draw(ctx, w, h, S);
  E.pointer = (S, t, x, y) => Cap3D.pointer(S, t, x, y);
  E.wheel = (S, dy) => Cap3D.wheel(S, dy);
  E.controls = E.controls.concat([Cap3D.viewBtns, ...Cap3D.showTgls]);
  E.howto = 'المختبر ثلاثي الأبعاد: <b>اسحب المقبض البنفسجي</b> لتغيير البعد بين الصفيحتين' + (mode === 'area' ? '، و<b>المقبض الأخضر</b> لإزاحة الصفيحة وتغيير المساحة المتقابلة' : '') + (mode === 'dielectric' ? '، و<b>المقبض الأزرق</b> لإدخال العازل أو إخراجه بيدك' : '') + '. اسحب الفراغ لتدوير المنظر، وعجلة الفأرة للتكبير، والنقر المزدوج لإعادة المنظر.';
});
