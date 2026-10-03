'use strict';
/* ====================== الثاني المتوسط — الفصل الأول: الحركة (ch 21) — بترتيب الكتاب ======================
   القياس (ص 6–10) · الحركة وأنواعها (ص 11–13) · وصف الحركة (ص 14–19) · الفيزياء والمجتمع (ص 20) · مراجعة الفصل (ص 21–22)
   Merged (teacher feedback): 7 experiments made of parts (M8.merge, expg8_0kit.js) — g8_measure · g8_motion · g8_kinds · g8_displace · g8_speedx · g8_velacc · g8_compare (comparison d/x/S/v/a).
   Every activity below is registered as a part with P8(); the merges are at the end of the file. */
LW({ id: 'g8_speed', cat: 21, name: 'الانطلاق', fx: '<i>S</i> = ' + FR('<i>d</i>', '<i>t</i>'), sym: 'S الانطلاق (m/s)، d المسافة (m)، t الزمن (s) — كمية مقدارية', calc: { in: [['d', 'المسافة d', 'm', 30], ['t', 'الزمن t', 's', 2]], out: 'الانطلاق S', u: 'm/s', f: v => v.d / v.t } });
LW({ id: 'g8_avgspeed', cat: 21, name: 'معدل الانطلاق', fx: '<i>S</i><sub>average</sub> = ' + FR('<i>d</i><sub>total</sub>', '<i>t</i><sub>total</sub>'), sym: 'المسافة الكلية المقطوعة ÷ الزمن الكلي المستغرق لقطعها', calc: { in: [['d', 'المسافة الكلية', 'km', 450], ['t', 'الزمن الكلي', 'h', 5]], out: 'معدل الانطلاق', u: 'km/h', f: v => v.d / v.t } });
LW({ id: 'g8_kmh', cat: 21, name: 'تحويل km/h إلى m/s', fx: '1 km/h = ' + FR('1000 m', '3600 s') + ' ⇒ <i>v</i>(m/s) = <i>v</i>(km/h) × ' + FR('1000', '3600'), sym: 'نضرب في 1000 (km → m) ونقسم على 3600 (h → s)', calc: { in: [['v', 'الانطلاق', 'km/h', 90]], out: 'الانطلاق', u: 'm/s', f: v => v.v * 1000 / 3600 } });
LW({ id: 'g8_velocity', cat: 21, name: 'السرعة (المتجهة)', fx: '<i>v</i> = ' + FR('<i>x</i>', '<i>t</i>'), sym: 'v السرعة (m/s) مع الاتجاه، x الإزاحة (m)، t الزمن (s) — كمية اتجاهية', calc: { in: [['x', 'الإزاحة x', 'm', 30], ['t', 'الزمن t', 's', 6]], out: 'السرعة v', u: 'm/s', f: v => v.x / v.t } });
LW({ id: 'g8_accel', cat: 21, name: 'التعجيل', fx: '<i>a</i> = ' + FR('Δ<i>v</i>', '<i>t</i>') + ' = ' + FR('<i>v</i><sub>f</sub> − <i>v</i><sub>i</sub>', '<i>t</i>'), sym: 'a التعجيل (m/s²)، Δv تغير السرعة (m/s)، t الزمن (s) — موجب: تسارعي، سالب: تباطؤي', calc: { in: [['vi', 'السرعة الابتدائية', 'm/s', 0], ['vf', 'السرعة النهائية', 'm/s', 20], ['t', 'الزمن t', 's', 8]], out: 'التعجيل a', u: 'm/s²', f: v => (v.vf - v.vi) / v.t } });
LW({ id: 'g8_resultant', cat: 21, name: 'محصلة إزاحتين', fx: '<i>X</i><sub>R</sub> = <i>X</i><sub>1</sub> + <i>X</i><sub>2</sub> (باتجاه واحد) &nbsp;|&nbsp; <i>X</i><sub>R</sub> = <i>X</i><sub>1</sub> − <i>X</i><sub>2</sub> (باتجاهين متعاكسين)', sym: 'باتجاهين متعاكسين يكون اتجاه المحصلة باتجاه الإزاحة الأكبر', calc: { in: [['x1', 'X₁', 'km', 8], ['x2', 'X₂ (سالبة إذا عاكست)', 'km', 6]], out: 'المحصلة X_R', u: 'km', f: v => v.x1 + v.x2 } });
LW({ id: 'g8_prefix', cat: 21, name: 'البادئات وتحويل الوحدات', fx: 'k = 10³ ، M = 10⁶ ، G = 10⁹ ، c = 10⁻² ، m = 10⁻³ ، μ = 10⁻⁶ ، n = 10⁻⁹ ، p = 10⁻¹²', sym: 'من وحدة كبيرة إلى صغيرة نضرب، ومن صغيرة إلى كبيرة نقسم (1 km = 1000 m ، 1 m = 1000 mm)', calc: { in: [['m', 'الطول بالمتر', 'm', 20]], out: 'بالمليمتر', u: 'mm', f: v => v.m * 1000 } });
LW({ id: 'g8_scale', cat: 21, name: 'مقياس الرسم للإزاحة', fx: 'طول المتجه = الإزاحة × ' + FR('1 cm', 'المقياس'), sym: 'مثال: مقياس 1 cm لكل 100 m ⇒ إزاحة 300 m تمثل بسهم طوله 3 cm', calc: { in: [['x', 'الإزاحة', 'm', 300], ['k', 'كل 1 cm يمثل', 'm', 100]], out: 'طول السهم', u: 'cm', f: v => v.x / v.k } });
LW({ id: 'g8_period', cat: 21, name: 'زمن الاهتزازة الواحدة', fx: '<i>T</i> = ' + FR('<i>t</i>', '<i>n</i>'), sym: 'T زمن الاهتزازة الكاملة (s)، t الزمن الكلي، n عدد الاهتزازات', calc: { in: [['t', 'زمن الاهتزازات', 's', 20], ['n', 'عدد الاهتزازات', '', 10]], out: 'الزمن الدوري T', u: 's', f: v => v.t / v.n } });

(() => {
  /* ---------------- shared drawing kit for this chapter (H) ---------------- */
  const T = (ctx, s, x, y, o = {}) => G.text(ctx, s, x, y, Object.assign({ c: '#1e293b', raw: 1 }, o));
  const H = {
    snd(k) { try { if (!window.Sound) return; if (k === 'ok' && Sound.ok) Sound.ok(); else if (k === 'bad' && Sound.beep) Sound.beep(180, .18, 'sawtooth', .05); else if (Sound.click) Sound.click(); } catch (e) { } },
    card(ctx, x, y, w, h, o = {}) { K.raw(ctx, () => { ctx.fillStyle = o.bg || 'rgba(255,255,255,.95)'; rr(ctx, x, y, w, h, o.r ?? 14); ctx.fill(); ctx.strokeStyle = o.bd || '#0284c7'; ctx.lineWidth = o.lw || 2; ctx.stroke(); }); },
    /* card centred at x, top y; lines: [text | [text,{s,w,c}]] */
    box(ctx, x, y, w, title, lines, o = {}) {
      const lh = o.lh || 22, hh = lines.length * lh + 18 + (title ? lh : 0);
      H.card(ctx, x - w / 2, y, w, hh, o); let yy = y + 9 + lh / 2;
      if (title) { T(ctx, title, x, yy, { s: 13.5, w: 900, c: o.bd || '#0284c7' }); yy += lh; }
      lines.forEach(L => { const [t, q] = Array.isArray(L) ? L : [L, {}]; T(ctx, t, x, yy, { s: q.s || 14, w: q.w || 800, c: q.c || '#1e293b', mono: q.mono }); yy += lh; });
      return hh;
    },
    chip(ctx, x, y, w, h, label, on, col = '#0284c7', s = 13) { K.raw(ctx, () => { ctx.fillStyle = on ? col : 'rgba(255,255,255,.96)'; rr(ctx, x - w / 2, y - h / 2, w, h, Math.min(h / 2, 14)); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.stroke(); }); T(ctx, label, x, y + 1, { s, w: 800, c: on ? '#fff' : col }); },
    arrow(ctx, x1, y1, x2, y2, col, lw = 4, label, o = {}) {
      const L = Math.hypot(x2 - x1, y2 - y1); if (L < 3) return;
      K.raw(ctx, () => G.arrow(ctx, x1, y1, x2, y2, col, lw, o.head || 9 + lw * 1.4));
      if (label) { const nx = -(y2 - y1) / L, ny = (x2 - x1) / L, off = o.off ?? -16; T(ctx, label, (x1 + x2) / 2 + nx * off, (y1 + y2) / 2 + ny * off, { s: o.s || 12.5, w: 900, c: '#fff', bg: col }); }
    },
    zone(ctx, x, y, w, h, hot, label) {
      const t = performance.now() / 1000, pu = .5 + .5 * Math.sin(t * 6);
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = '#16a34a'; ctx.shadowBlur = hot ? 24 : 10 + 8 * pu; ctx.fillStyle = hot ? 'rgba(34,197,94,.22)' : `rgba(34,197,94,${.06 + .06 * pu})`; rr(ctx, x - w / 2, y - h / 2, w, h, 14); ctx.fill(); ctx.strokeStyle = '#16a34a'; ctx.lineWidth = hot ? 4 : 2.5; ctx.setLineDash(hot ? [] : [9, 6]); ctx.lineDashOffset = -t * 30; ctx.stroke(); ctx.setLineDash([]); ctx.restore(); });
      if (label) K.tag(ctx, label, x, y - h / 2 - 14, { s: 12, bg: hot ? '#15803d' : 'rgba(22,101,52,.85)' });
    },
    /* outdoor background: sky, hills, ground from gy */
    sky(ctx, w, h, gy, o = {}) {
      G.bg(ctx, w, h, false);
      K.raw(ctx, () => {
        const g = ctx.createLinearGradient(0, 0, 0, gy); g.addColorStop(0, o.top || '#bae6fd'); g.addColorStop(1, '#f0f9ff'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, gy);
        if (o.hills !== false) { ctx.fillStyle = '#bbf7d0'; ctx.beginPath(); ctx.moveTo(0, gy); for (let x = 0; x <= w; x += 20) ctx.lineTo(x, gy - 30 - 18 * Math.sin(x / 140) - 10 * Math.sin(x / 53)); ctx.lineTo(w, gy); ctx.fill(); ctx.fillStyle = '#86efac'; ctx.beginPath(); ctx.moveTo(0, gy); for (let x = 0; x <= w; x += 20) ctx.lineTo(x, gy - 12 - 10 * Math.sin(x / 90 + 1)); ctx.lineTo(w, gy); ctx.fill(); }
        const gg = ctx.createLinearGradient(0, gy, 0, h); gg.addColorStop(0, o.g1 || '#86c06c'); gg.addColorStop(1, o.g2 || '#4d7c3a'); ctx.fillStyle = gg; ctx.fillRect(0, gy, w, h - gy);
        if (o.road) { ctx.fillStyle = '#cbd5e1'; ctx.fillRect(0, gy, w, o.road); ctx.fillStyle = '#94a3b8'; ctx.fillRect(0, gy + o.road - 3, w, 3); }
      });
    },
    tree(ctx, x, y, s = 1) { K.raw(ctx, () => { ctx.fillStyle = '#7c4a1e'; ctx.fillRect(x - 4 * s, y - 30 * s, 8 * s, 30 * s); ctx.fillStyle = '#15803d'; [[0, -70, 26], [-14, -50, 20], [14, -50, 20], [0, -96, 18]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.moveTo(x + dx * s, y + (dy - r) * s); ctx.lineTo(x + (dx - r) * s, y + (dy + r * .9) * s); ctx.lineTo(x + (dx + r) * s, y + (dy + r * .9) * s); ctx.closePath(); ctx.fill(); }); }); },
    /* the book's small blue-grey car, side view; x = centre, y = ground, facing +x (o.flip → −x) */
    car(ctx, x, y, s = 1, o = {}) {
      K.raw(ctx, () => {
        ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s);
        ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(0, 0, 58, 5, 0, 0, TAU); ctx.fill();
        ctx.fillStyle = o.col || '#88a4b8'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(-60, -13); ctx.quadraticCurveTo(-63, -34, -40, -36); ctx.quadraticCurveTo(-28, -64, 0, -64); ctx.quadraticCurveTo(28, -64, 40, -37); ctx.quadraticCurveTo(62, -33, 60, -13); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#e0f2fe'; ctx.beginPath(); ctx.moveTo(-31, -38); ctx.quadraticCurveTo(-23, -58, -3, -58); ctx.lineTo(-3, -38); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(3, -38); ctx.lineTo(3, -58); ctx.quadraticCurveTo(24, -58, 33, -38); ctx.closePath(); ctx.fill(); ctx.stroke();
        if (o.driver !== false) { ctx.fillStyle = '#7c4a1e'; ctx.beginPath(); ctx.arc(14, -47, 6.5, 0, TAU); ctx.fill(); ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(16, -46, 5, -1.2, 1.6); ctx.fill(); }
        ctx.strokeStyle = 'rgba(51,65,85,.6)'; ctx.beginPath(); ctx.moveTo(0, -36); ctx.lineTo(0, -16); ctx.stroke(); ctx.fillStyle = '#475569'; ctx.fillRect(-12, -32, 7, 2.5);
        ctx.fillStyle = '#e2e8f0'; ctx.fillRect(-64, -17, 9, 5); ctx.fillRect(55, -17, 9, 5);
        ctx.fillStyle = '#fef08a'; ctx.beginPath(); ctx.arc(53, -27, 4.5, 0, TAU); ctx.fill(); ctx.fillStyle = '#ef4444'; ctx.fillRect(-61, -29, 4, 6);
        [-36, 36].forEach(wx => { ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(wx, -12, 12, 0, TAU); ctx.fill(); ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.arc(wx, -12, 5.5, 0, TAU); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; const a = (o.rot || 0); for (let k = 0; k < 3; k++) { const b = a + k * TAU / 3; ctx.beginPath(); ctx.moveTo(wx, -12); ctx.lineTo(wx + Math.cos(b) * 9, -12 + Math.sin(b) * 9); ctx.stroke(); } });
        ctx.restore();
      });
    },
    /* runner (book style: white shirt, red shorts), feet on y, facing +x */
    runner(ctx, x, y, s = 1, ph = 0, o = {}) {
      K.raw(ctx, () => {
        ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        const run = o.still ? 0 : 1, hip = [0, -46], sh = [5, -78];
        const leg = (off, dark) => { const a = Math.sin(ph + off); const th = .7 * a * run; const k = [hip[0] + Math.sin(th) * 23, hip[1] + Math.cos(th) * 23]; const sA = th - run * (.25 + .9 * Math.max(0, -a)); const f = [k[0] + Math.sin(sA) * 23, k[1] + Math.cos(sA) * 23];
          ctx.strokeStyle = dark ? '#d9a77f' : '#f2c49b'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(hip[0], hip[1]); ctx.lineTo(k[0], k[1]); ctx.lineTo(f[0], f[1]); ctx.stroke();
          ctx.fillStyle = dark ? '#1e3a8a' : '#2563eb'; ctx.beginPath(); ctx.ellipse(f[0] + 4, f[1] - 1, 7, 3.6, 0, 0, TAU); ctx.fill(); };
        const arm = (off, dark) => { const a = Math.sin(ph + off); const ua = -.8 * a * run + (run ? 0 : .1); const e = [sh[0] + Math.sin(ua) * 15, sh[1] + Math.cos(ua) * 15]; const fa = ua + (run ? 1.6 : .2); const hnd = [e[0] + Math.sin(fa) * 14, e[1] + Math.cos(fa) * 14 * (run ? -1 : 1)];
          ctx.strokeStyle = dark ? '#d9a77f' : '#f2c49b'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(sh[0], sh[1] + 3); ctx.lineTo(e[0], e[1]); ctx.lineTo(hnd[0], hnd[1]); ctx.stroke(); };
        leg(Math.PI, 1); arm(0, 1);
        ctx.fillStyle = o.shorts || '#dc2626'; rr(ctx, -9, -52, 18, 14, 4); ctx.fill();
        ctx.fillStyle = o.shirt || '#f8fafc'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-8, -50); ctx.lineTo(-6, -82); ctx.lineTo(14, -82); ctx.lineTo(10, -50); ctx.closePath(); ctx.fill(); ctx.stroke();
        leg(0, 0);
        ctx.fillStyle = '#f2c49b'; ctx.beginPath(); ctx.arc(7, -91, 8.5, 0, TAU); ctx.fill(); ctx.fillStyle = '#5b3716'; ctx.beginPath(); ctx.arc(5, -94, 8.5, Math.PI * .95, Math.PI * 2.05); ctx.fill();
        arm(Math.PI, 0);
        ctx.restore(); ctx.lineCap = 'butt';
      });
    },
    /* clock face with a hand (t in s; the hand turns 30° per second like the book's strobe clocks) */
    clock(ctx, x, y, r, t, label) {
      K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke();
        ctx.lineWidth = 1.2; for (let k = 0; k < 12; k++) { const a = k * TAU / 12; ctx.beginPath(); ctx.moveTo(x + Math.sin(a) * r * .78, y - Math.cos(a) * r * .78); ctx.lineTo(x + Math.sin(a) * r * .92, y - Math.cos(a) * r * .92); ctx.stroke(); }
        const a = t * TAU / 12; ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(a) * r * .8, y - Math.cos(a) * r * .8); ctx.stroke(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(x, y, 2.5, 0, TAU); ctx.fill(); });
      if (label) T(ctx, label, x, y + r + 12, { s: 11.5, w: 800, c: '#334155', mono: 1 });
    },
    /* stopwatch: centre x,y radius r, time t (s) */
    stopwatch(ctx, x, y, r, t, on) {
      K.raw(ctx, () => { ctx.fillStyle = '#94a3b8'; rr(ctx, x - 7, y - r - 14, 14, 12, 3); ctx.fill(); ctx.fillStyle = on ? '#16a34a' : '#ef4444'; ctx.beginPath(); ctx.arc(x, y - r - 16, 6, 0, TAU); ctx.fill();
        const g = ctx.createRadialGradient(x - r * .3, y - r * .3, 2, x, y, r); g.addColorStop(0, '#f1f5f9'); g.addColorStop(1, '#cbd5e1'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.stroke();
        ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, y, r * .86, 0, TAU); ctx.fill();
        ctx.strokeStyle = '#334155'; for (let k = 0; k < 60; k++) { const a = k * TAU / 60; ctx.lineWidth = k % 5 ? .8 : 1.8; ctx.beginPath(); ctx.moveTo(x + Math.sin(a) * r * .86, y - Math.cos(a) * r * .86); ctx.lineTo(x + Math.sin(a) * r * (k % 5 ? .8 : .74), y - Math.cos(a) * r * (k % 5 ? .8 : .74)); ctx.stroke(); }
        const a = (t % 60) / 60 * TAU; ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(a) * r * .78, y - Math.cos(a) * r * .78); ctx.stroke(); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(x, y, 3.5, 0, TAU); ctx.fill();
        ctx.fillStyle = '#0f172a'; rr(ctx, x - r * .5, y + r * .22, r, r * .3, 4); ctx.fill(); ctx.fillStyle = '#a3e635'; ctx.font = `800 ${Math.round(r * .22)}px ui-monospace,monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr'; ctx.fillText(t.toFixed(2) + ' s', x, y + r * .37); ctx.textBaseline = 'alphabetic'; });
    },
    /* analog speedometer */
    speedo(ctx, x, y, r, v, vmax, unit, label) {
      K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(x, y, r, Math.PI * .85, Math.PI * 2.15); ctx.lineTo(x, y); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.fillStyle = '#e2e8f0'; ctx.font = `700 ${Math.round(r * .17)}px ui-monospace,monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr';
        const n = 4, A = k => Math.PI * (.85 + 1.3 * k);
        for (let k = 0; k <= 20; k++) { const a = A(k / 20); ctx.lineWidth = k % 5 ? 1 : 2.2; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * .92, y + Math.sin(a) * r * .92); ctx.lineTo(x + Math.cos(a) * r * (k % 5 ? .84 : .78), y + Math.sin(a) * r * (k % 5 ? .84 : .78)); ctx.stroke(); }
        for (let k = 0; k <= n; k++) { const a = A(k / n); ctx.fillText(String(Math.round(vmax * k / n)), x + Math.cos(a) * r * .6, y + Math.sin(a) * r * .6); }
        const a = A(clamp(v / vmax, 0, 1.02)); ctx.strokeStyle = '#f97316'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * r * .86, y + Math.sin(a) * r * .86); ctx.stroke(); ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.arc(x, y, 5, 0, TAU); ctx.fill();
        ctx.fillStyle = '#a3e635'; ctx.font = `800 ${Math.round(r * .2)}px ui-monospace,monospace`; ctx.fillText(fmt(v, 3) + ' ' + unit, x, y + r * .3); ctx.textBaseline = 'alphabetic'; });
      if (label) T(ctx, label, x, y + r * .62, { s: 11, w: 800, c: '#334155' });
    },
    /* small live graph. series: [{pts:[[x,y]..], c, dots}] */
    graph(ctx, x, y, w, h, o) {
      H.card(ctx, x, y, w, h, { bd: '#cbd5e1', lw: 1.5, r: 10 });
      const L = x + 40, R = x + w - 12, Tp = y + 26, B = y + h - 26, X = v => L + (R - L) * v / o.xmax, Y = v => B - (B - Tp) * (v - (o.ymin || 0)) / (o.ymax - (o.ymin || 0));
      if (o.title) T(ctx, o.title, x + w / 2, y + 12, { s: 12, w: 900, c: '#0f172a' });
      K.raw(ctx, () => { ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.beginPath(); for (let k = 1; k <= 4; k++) { ctx.moveTo(L, B - (B - Tp) * k / 4); ctx.lineTo(R, B - (B - Tp) * k / 4); ctx.moveTo(L + (R - L) * k / 4, B); ctx.lineTo(L + (R - L) * k / 4, Tp); } ctx.stroke();
        G.arrow(ctx, L, B, R + 6, B, '#334155', 1.6, 7); G.arrow(ctx, L, B, L, Tp - 8, '#334155', 1.6, 7);
        ctx.fillStyle = '#475569'; ctx.font = '700 10px ui-monospace,monospace'; ctx.direction = 'ltr'; ctx.textAlign = 'center'; for (let k = 0; k <= 4; k++) ctx.fillText(+(o.xmax * k / 4).toFixed(1), L + (R - L) * k / 4, B + 12); ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; for (let k = 0; k <= 4; k++) ctx.fillText(+((o.ymin || 0) + (o.ymax - (o.ymin || 0)) * k / 4).toFixed(1), L - 4, B - (B - Tp) * k / 4); ctx.textBaseline = 'alphabetic';
        (o.series || []).forEach(sr => { const P = sr.pts.filter(p => p[0] <= o.xmax * 1.001); if (!P.length) return; ctx.strokeStyle = sr.c; ctx.lineWidth = sr.lw || 2.5; ctx.setLineDash(sr.dash || []); ctx.beginPath(); P.forEach((p, i) => { const px = X(p[0]), py = Y(clamp(p[1], (o.ymin || 0) - 1e9, 1e9)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.stroke(); ctx.setLineDash([]); if (sr.dots) { ctx.fillStyle = sr.c; P.forEach(p => { ctx.beginPath(); ctx.arc(X(p[0]), Y(p[1]), 3.6, 0, TAU); ctx.fill(); }); } }); });
      T(ctx, o.xl, R - 4, B + 21, { s: 10.5, w: 800, c: '#334155', a: 'right' }); T(ctx, o.yl, L + 4, Tp - 12, { s: 10.5, w: 800, c: '#334155', a: 'left' });
      return { X, Y, L, R, T: Tp, B };
    },
    /* kid standing (for kicks / throws); legAng rotates the front leg (+ = back) */
    kid(ctx, x, y, s = 1, o = {}) {
      K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s); ctx.lineCap = 'round';
        const hip = [0, -50], la = o.leg || 0;
        ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(hip[0] - 3, hip[1]); ctx.lineTo(-5, -2); ctx.stroke(); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.ellipse(-1, -2, 9, 4.5, 0, 0, TAU); ctx.fill();
        const fx = hip[0] + Math.sin(-la) * 48, fy = hip[1] + Math.cos(la) * 48; ctx.strokeStyle = '#1d4ed8'; ctx.beginPath(); ctx.moveTo(hip[0] + 3, hip[1]); ctx.lineTo(fx, fy); ctx.stroke(); ctx.fillStyle = '#111827'; ctx.save(); ctx.translate(fx, fy); ctx.rotate(-la); ctx.beginPath(); ctx.ellipse(4, -1, 9, 4.5, 0, 0, TAU); ctx.fill(); ctx.restore();
        ctx.fillStyle = o.shirt || '#16a34a'; rr(ctx, -10, -88, 20, 42, 7); ctx.fill();
        ctx.strokeStyle = '#f2c49b'; ctx.lineWidth = 6; const aa = o.arm ?? .5; ctx.beginPath(); ctx.moveTo(0, -84); ctx.lineTo(Math.sin(aa) * 30, -84 + Math.cos(aa) * 30); ctx.moveTo(0, -84); ctx.lineTo(-Math.sin(aa) * 26, -84 + Math.cos(aa) * 26); ctx.stroke();
        ctx.fillStyle = '#f2c49b'; ctx.beginPath(); ctx.arc(2, -99, 11, 0, TAU); ctx.fill(); ctx.fillStyle = '#3f2a14'; ctx.beginPath(); ctx.arc(0, -102, 11, Math.PI * .9, Math.PI * 2.1); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(7, -100, 1.6, 0, TAU); ctx.fill();
        ctx.restore(); ctx.lineCap = 'butt'; });
      return [x + (o.flip ? -1 : 1) * Math.sin(-(o.leg || 0)) * 48 * s, y + (-50 + Math.cos(o.leg || 0) * 48) * s];
    },
    ballKind(ctx, x, y, r, kind, rot = 0) {
      K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
        if (kind === 'ball') { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#111'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#111'; ctx.beginPath(); for (let k = 0; k < 5; k++) { const a = k * TAU / 5; ctx.lineTo(Math.cos(a) * r * .32, Math.sin(a) * r * .32); } ctx.fill(); for (let k = 0; k < 5; k++) { const a = k * TAU / 5 + .63; ctx.beginPath(); ctx.arc(Math.cos(a) * r * .86, Math.sin(a) * r * .86, r * .2, 0, TAU); ctx.fill(); } }
        else if (kind === 'bask') { ctx.fillStyle = '#ea580c'; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#431407'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.beginPath(); ctx.moveTo(-r, 0); ctx.lineTo(r, 0); ctx.moveTo(0, -r); ctx.lineTo(0, r); ctx.stroke(); ctx.beginPath(); ctx.arc(-r * 1.1, 0, r * .8, -.8, .8); ctx.stroke(); ctx.beginPath(); ctx.arc(r * 1.1, 0, r * .8, Math.PI - .8, Math.PI + .8); ctx.stroke(); }
        else { const g = ctx.createRadialGradient(-r * .3, -r * .3, 1, 0, 0, r); g.addColorStop(0, '#fff'); g.addColorStop(.4, '#60a5fa'); g.addColorStop(1, '#1e3a8a'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#f97316'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, r * .55, -.6, 1.2); ctx.stroke(); }
        ctx.restore(); });
    },
    eye(ctx, x, y, s = 1, flip = true, col = '#2563eb') { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(flip ? -s : s, s); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-20, 0); ctx.quadraticCurveTo(0, -16, 20, 0); ctx.quadraticCurveTo(0, 16, -20, 0); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(7, 0, 7, 0, TAU); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(9, 0, 3.2, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(5, -3, 1.8, 0, TAU); ctx.fill(); ctx.restore(); }); },
    banner(ctx, w, s, col = '#0284c7', y = 24) { T(ctx, s, (64 + w - 236) / 2 + 4, y, { s: 14.5, w: 900, c: '#fff', bg: col }); },
    progress(ctx, x, y, w, items) { // items [[label, done]]
      const n = items.length, cw = w / n; items.forEach(([l, d], i) => { const cx = x + w - cw * (i + .5); K.raw(ctx, () => { ctx.fillStyle = d ? '#16a34a' : '#fff'; ctx.strokeStyle = d ? '#16a34a' : '#94a3b8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, y, 11, 0, TAU); ctx.fill(); ctx.stroke(); if (i < n - 1) { ctx.strokeStyle = items[i + 1][1] ? '#16a34a' : '#cbd5e1'; ctx.beginPath(); ctx.moveTo(cx - 12, y); ctx.lineTo(cx - cw + 12, y); ctx.stroke(); } }); T(ctx, d ? '✓' : String(i + 1), cx, y + 1, { s: 12, w: 900, c: d ? '#fff' : '#64748b' }); T(ctx, l, cx, y + 22, { s: 11, w: 800, c: d ? '#15803d' : '#475569' }); });
    },
    dragging(id) { const A = typeof Interact !== 'undefined' && Interact.act; return !!(A && A.id === id); },
    act(S, k) { S.lastAct = k + ':' + ((S._ac = (S._ac || 0) + 1)); }
  };
  /* every activity below is a PART of a merged experiment (M8.merge at the end of the file) */
  const P8 = D => { M8.P[D.id] = D; return D; };

  /* =========================================================================================
     1) نشاط استهلالي: مفهوم السرعة (ص 6) — نركل الكرة من A، نوقّت، نعلّم B، نقيس بالشريط
     ========================================================================================= */
  (() => {
    const SC = { ball: { n: '⚽ كرة قدم في الساحة', a: 1.1, v: 9, L: 40, r: 15 }, bask: { n: '🏀 كرة سلة في الملعب', a: .8, v: 7, L: 32, r: 15 }, car: { n: '🚗 سيارة لعبة في الصف', a: .45, v: 3.2, L: 12, r: 0 }, marble: { n: '🔵 كرة زجاجية (دُعبُل)', a: .3, v: 2.2, L: 8, r: 8 } };
    const geo = S => { const w = S.W, h = S.H, c = SC[S.p.sc], gy = h * .56, x0 = 150, x1 = w - 48, ppm = (x1 - x0) / c.L; return { w, h, c, gy, x0, x1, ppm, X: m => x0 + m * ppm, M: px => (px - x0) / ppm }; };
    const reset = S => { S.bx = 0; S.bv = 0; S.ph = 'ready'; S.sw = 0; S.swOn = false; S.Bm = -1; S.tape = 0; S.kickT = 0; S.chalk = null; S.pull = 0; };
    const kick = S => { const c = SC[S.p.sc]; S.bx = 0; S.bv = c.v * S.p.F / 100; S.ph = 'roll'; S.kickT = .3; S.Bm = -1; S.tape = 0; S.kicks = (S.kicks || 0) + 1; if (S.p.auto) { S.sw = 0; S.swOn = true; } H.snd(); H.act(S, 'kick'); };
    const measured = S => S.ph === 'stop' && S.Bm >= 0 && Math.abs(S.tape - S.Bm) < .02;
    P8({
      id: 'g8_speed_intro', ch: 21, sec: 'نشاط استهلالي', page: 6, kind: 'نشاط', title: 'نشاط استهلالي: مفهوم السرعة (اركل الكرة وقِس المسافة والزمن)',
      desc: 'نحدد نقطة البداية A بالطباشير، نركل الكرة ونشغّل ساعة التوقيت، نوقفها لحظة توقف الكرة ونعلّم نقطة النهاية B، ثم نقيس البعد بشريط القياس ونكرر بركلة أقوى.',
      tags: 'سرعة انطلاق مسافة زمن ساعة توقيت شريط قياس طباشير كرة',
      tools: ['شريط قياس', 'ساعة توقيت', 'قطع طباشير', 'كرة'],
      steps: ['النقطة A معلّمة بالطباشير والكرة موضوعة عليها.', 'اسحب قدم اللاعب إلى الخلف (كلما سحبت أكثر كانت الركلة أقوى) ثم اتركها لتركل الكرة — تبدأ ساعة التوقيت.', 'عند توقف الكرة تتوقف الساعة (أو أوقفها أنت بالنقر عليها إذا ألغيت «التوقيت التلقائي»).', 'علّم نقطة توقف الكرة B بالطباشير (تلقائياً، أو اسحب قطعة الطباشير إلى الكرة).', 'اسحب طرف شريط القياس من A إلى B واقرأ المسافة d.', 'احسب الانطلاق S = d ÷ t واضغط «تسجيل»، ثم كرر بركلة أقوى: ماذا تلاحظ؟'],
      concl: ['النقطة التي بدأت منها الحركة هي نقطة البداية A، والتي انتهت إليها هي نقطة النهاية B.', 'لوصف حركة الكرة نحتاج قياس المسافة (بشريط القياس) والزمن (بساعة التوقيت).', 'المسافة المقطوعة في وحدة الزمن هي الانطلاق: S = d / t.', 'كلما ركلنا الكرة بقوة أكبر قطعت مسافة أكبر وكان انطلاقها أكبر.'],
      laws: ['g8_speed'],
      fact: ['أسرع ركلة كرة قدم مسجلة تجاوز انطلاقها 210 km/h!', 'الحكم في المباريات يستعمل ساعة توقيت دقتها 0.01 s، لكن رد فعل يد الإنسان يحتاج نحو 0.2 s — لذلك يختلف التوقيت اليدوي قليلاً عن التلقائي.'],
      controls: [SEL('sc', 'المثال', Object.keys(SC).map(k => [k, SC[k].n]), 'ball', (v, S) => reset(S)),
        R('F', 'قوة الركلة', 10, 100, 60, 5, '%'),
        TG('auto', 'التوقيت والتعليم التلقائي', true, null, 'stopwatch'), TG('trail', 'آثار الكرة كل ثانية', true, null, 'dot'), TG('vel', 'سهم الانطلاق', true, null, 'velocity'), TG('calc', 'بطاقة الحساب', true, null, 'graph'),
        BT('', [{ t: 'اركل ▶', on: S => kick(S) }, { t: 'أعد الكرة إلى A', on: S => reset(S) }])],
      setup(S) { reset(S); S.kicks = 0; S.trailPts = []; },
      update(S, dt) {
        const c = SC[S.p.sc]; if (S.kickT > 0) S.kickT -= dt;
        if (S.ph === 'roll') { const t0 = S.rollT || 0; S.bv -= c.a * dt; S.bx += Math.max(S.bv, 0) * dt; S.rollT = t0 + dt; if (Math.floor(S.rollT) > Math.floor(t0)) (S.trailPts = S.trailPts || []).push(S.bx);
          if (S.bx > c.L - .3) { S.bx = c.L - .3; S.bv = 0; }
          if (S.bv <= 0) { S.bv = 0; S.ph = 'stop'; if (S.p.auto) { S.swOn = false; S.Bm = S.bx; } H.snd(); } }
        else S.rollT = 0;
        if (S.ph === 'ready') S.trailPts = [];
        if (S.swOn) S.sw += dt;
        if (S.p.auto && S.ph === 'stop' && S.Bm >= 0 && !S.tapeDrag) { S.tape += (S.Bm - S.tape) * Math.min(1, dt * 2.5); if (Math.abs(S.tape - S.Bm) < .01) S.tape = S.Bm; }
      },
      draw(ctx, w, h, S) {
        const g = geo(S), c = g.c, p = S.p, sc = p.sc;
        if (sc === 'ball') H.sky(ctx, w, h, g.gy, { g1: '#7ccf62', g2: '#3f8f2f' });
        else if (sc === 'bask') H.sky(ctx, w, h, g.gy, { g1: '#e9b872', g2: '#b7793f', hills: false, top: '#e0e7ff' });
        else { K.bg(ctx, w, h, { benchY: g.gy, bench: false }); K.raw(ctx, () => { ctx.fillStyle = '#e7d3b0'; ctx.fillRect(0, g.gy, w, h - g.gy); ctx.strokeStyle = 'rgba(120,80,40,.18)'; for (let x = 0; x < w; x += 60) { ctx.beginPath(); ctx.moveTo(x, g.gy); ctx.lineTo(x - 30, h); ctx.stroke(); } }); }
        if (sc === 'ball') { H.tree(ctx, w * .55, g.gy - 26, .8); H.tree(ctx, w * .82, g.gy - 30, .65); }
        H.banner(ctx, w, 'اركل الكرة من A، أوقف الساعة عند توقفها، علّم B وقِس المسافة', '#0284c7');
        // lane, chalk A
        K.raw(ctx, () => { ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 3; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(g.x0, g.gy + 26); ctx.lineTo(g.x1, g.gy + 26); ctx.stroke(); ctx.setLineDash([]);
          ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(g.x0 - 10, g.gy + 14); ctx.lineTo(g.x0 + 10, g.gy + 38); ctx.moveTo(g.x0 + 10, g.gy + 14); ctx.lineTo(g.x0 - 10, g.gy + 38); ctx.stroke(); });
        T(ctx, 'A', g.x0, g.gy + 56, { s: 18, w: 900, c: '#fff', bg: '#0f172a' });
        if (S.Bm >= 0) { const bx = g.X(S.Bm); K.raw(ctx, () => { ctx.strokeStyle = '#fde047'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bx - 10, g.gy + 14); ctx.lineTo(bx + 10, g.gy + 38); ctx.moveTo(bx + 10, g.gy + 14); ctx.lineTo(bx - 10, g.gy + 38); ctx.stroke(); }); T(ctx, 'B', bx, g.gy + 56, { s: 18, w: 900, c: '#0f172a', bg: '#fde047' }); }
        // tape measure (case at A, tape along the ground)
        const ty = g.gy + 78, tx = g.X(S.tape);
        K.raw(ctx, () => { if (S.tape > 0) { ctx.fillStyle = '#facc15'; ctx.fillRect(g.x0, ty - 8, tx - g.x0, 16); ctx.strokeStyle = '#a16207'; ctx.lineWidth = 1; ctx.strokeRect(g.x0, ty - 8, tx - g.x0, 16);
          const step = c.L > 20 ? 1 : .5; ctx.fillStyle = '#422006'; ctx.font = '700 10px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.direction = 'ltr';
          for (let m = 0; m <= S.tape + 1e-6; m += step / 5) { const xx = g.X(m), major = Math.abs(m / step - Math.round(m / step)) < 1e-6; ctx.strokeStyle = '#422006'; ctx.lineWidth = major ? 1.2 : .6; ctx.beginPath(); ctx.moveTo(xx, ty - 8); ctx.lineTo(xx, ty - (major ? 1 : 4)); ctx.stroke(); if (major && Math.round(m / step) % (c.L > 20 ? 5 : 2) === 0) ctx.fillText(String(+m.toFixed(1)), xx, ty + 6); } }
          ctx.fillStyle = '#eab308'; ctx.strokeStyle = '#854d0e'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(g.x0 - 34, ty, 20, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(g.x0 - 34, ty, 7, 0, TAU); ctx.fill();
          ctx.fillStyle = '#854d0e'; rr(ctx, tx - 3, ty - 13, 8, 26, 3); ctx.fill(); });
        T(ctx, 'شريط القياس', g.x0 - 34, ty + 32, { s: 11, w: 800, c: '#fff', bg: 'rgba(15,23,42,.75)' });
        if (S.tape > .05) T(ctx, 'd = ' + fmt(S.tape, 3) + ' m', tx, ty - 26, { s: 13, w: 900, c: '#fff', bg: measured(S) ? '#16a34a' : '#a16207', mono: 1 });
        if (H.dragging('tape') && S.Bm >= 0) H.zone(ctx, g.X(S.Bm), ty, 40, 34, Math.abs(S.tape - S.Bm) < .02, 'ضع الطرف عند B');
        // trail marks (one per second)
        if (p.trail) (S.trailPts || []).forEach((m, i) => { K.raw(ctx, () => { ctx.globalAlpha = .45; }); if (sc === 'car') H.car(ctx, g.X(m), g.gy + 4, .32, { driver: false }); else H.ballKind(ctx, g.X(m), g.gy - c.r + 4, c.r, sc === 'marble' ? 'm' : sc); K.raw(ctx, () => { ctx.globalAlpha = 1; }); T(ctx, (i + 1) + ' s', g.X(m), g.gy - 2 * Math.max(c.r, 12) - 6, { s: 10, c: '#334155', w: 800 }); });
        // kicker / pusher
        const legA = S.kickT > 0 ? -.6 * (S.kickT / .3) : S.pull * 1.0;
        if (sc === 'ball' || sc === 'bask') H.kid(ctx, g.x0 - 52, g.gy + 8, 1.05, { leg: legA, shirt: sc === 'ball' ? '#16a34a' : '#7c3aed' });
        else { const hx = g.X(S.ph === 'ready' ? 0 : 0) - 30 - S.pull * 40 + (S.kickT > 0 ? 24 : 0); K.raw(ctx, () => { ctx.strokeStyle = '#f2c49b'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(hx - 70, g.gy - 70); ctx.lineTo(hx, g.gy - 8); ctx.stroke(); ctx.fillStyle = '#f2c49b'; ctx.beginPath(); ctx.arc(hx, g.gy - 8, 10, 0, TAU); ctx.fill(); ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(hx - 110, g.gy - 110); ctx.lineTo(hx - 70, g.gy - 70); ctx.stroke(); ctx.lineCap = 'butt'; }); }
        // the ball
        const bx = g.X(S.bx);
        if (sc === 'car') H.car(ctx, bx, g.gy + 4, .32, { driver: false, col: '#ef4444', rot: S.bx * 8 }); else H.ballKind(ctx, bx, g.gy - c.r + 4, c.r, sc === 'marble' ? 'm' : sc, S.bx * g.ppm / c.r);
        if (p.vel && S.bv > .02) H.arrow(ctx, bx, g.gy - 2 * Math.max(c.r, 14) - 18, bx + S.bv / c.v * 120 + 10, g.gy - 2 * Math.max(c.r, 14) - 18, '#16a34a', 4, fmt(S.bv, 2) + ' m/s', { off: 14 });
        if (S.pull > .02 && S.ph === 'ready') { K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.9)'; rr(ctx, g.x0 - 120, g.gy - 170, 110, 14, 7); ctx.fill(); ctx.fillStyle = '#dc2626'; rr(ctx, g.x0 - 120, g.gy - 170, 110 * S.p.F / 100, 14, 7); ctx.fill(); }); T(ctx, 'قوة الركلة ' + p.F + '%', g.x0 - 65, g.gy - 186, { s: 12, w: 900, c: '#dc2626' }); }
        // stopwatch (click)
        const swx = w - 92, swy = 112; H.stopwatch(ctx, swx, swy, 50, S.sw, S.swOn);
        T(ctx, S.swOn ? 'انقر لإيقافها ■' : 'انقر لتشغيلها ▶', swx, swy + 72, { s: 11.5, w: 800, c: '#fff', bg: S.swOn ? '#dc2626' : '#16a34a' });
        // chalk (manual marking)
        if (!p.auto) { const ch = S.chalk || [w - 200, g.gy + 120]; K.raw(ctx, () => { ctx.save(); ctx.translate(ch[0], ch[1]); ctx.rotate(-.4); ctx.fillStyle = '#fde047'; rr(ctx, -22, -6, 44, 12, 5); ctx.fill(); ctx.strokeStyle = '#a16207'; ctx.stroke(); ctx.restore(); }); if (!S.chalk) T(ctx, 'طباشير — اسحبها إلى مكان توقف الكرة', ch[0], ch[1] + 22, { s: 11, w: 800, c: '#fff', bg: 'rgba(15,23,42,.75)' }); if (S.chalk && S.ph === 'stop') H.zone(ctx, g.X(S.bx), g.gy + 26, 46, 40, Math.abs(S.chalk[0] - g.X(S.bx)) < 26 && Math.abs(S.chalk[1] - g.gy - 26) < 40, 'علّم B'); }
        // progress + calc card
        const done = [true, S.kicks > 0, S.ph === 'stop' && !S.swOn, S.Bm >= 0, measured(S), measured(S)];
        H.progress(ctx, 90, h - 108, Math.min(w - 160, 620), [['علّم A', done[0]], ['اركل', done[1]], ['أوقف الساعة', done[2]], ['علّم B', done[3]], ['قِس d', done[4]], ['احسب S', done[5]]]);
        if (p.calc) { const ok = measured(S) && S.sw > 0; H.box(ctx, w / 2 + 40, 52, 300, 'الانطلاق = المسافة ÷ الزمن', ok ? [['S = d / t = ' + fmt(S.tape, 3) + ' / ' + fmt(S.sw, 3), { mono: 1 }], ['S = ' + fmt(S.tape / S.sw, 3) + ' m/s', { s: 17, w: 900, c: '#0369a1', mono: 1 }]] : [['S = d / t', { mono: 1 }], [S.ph === 'roll' ? 'الكرة تتحرك… انتظر توقفها' : S.ph === 'ready' ? 'اسحب القدم للخلف واتركها' : 'قِس المسافة من A إلى B', { s: 12.5, c: '#64748b' }]], { bd: '#0284c7' }); }
        if (measured(S) && !S._cheered) { S._cheered = 1; K.cheer(S, w / 2, h * .35); } if (S.ph !== 'stop') S._cheered = 0;
        K.party(ctx, S);
      },
      drags(S) {
        const g = geo(S), L = [], sc = S.p.sc, ty = g.gy + 78;
        const fx = sc === 'ball' || sc === 'bask' ? g.x0 - 52 + Math.sin(-S.pull) * 50 : g.x0 - 30 - S.pull * 40, fy = sc === 'ball' || sc === 'bask' ? g.gy - 42 + Math.cos(S.pull) * 46 : g.gy - 12;
        L.push({ id: 'foot', x: fx, y: fy, r: 30, axis: 'x', keep: true, idle: sc === 'ball' || sc === 'bask' ? 'اسحب القدم للخلف ثم اتركها ✋' : 'اسحب اليد للخلف ثم اتركها ✋', tip: 'اسحب للخلف (قوة الركلة) ثم اترك',
          down: S => { if (S.ph !== 'ready') reset(S); }, drag: (S, d) => { S.pull = clamp((g.x0 - 30 - d.x) / 80, 0, 1); setParam(S, 'F', clamp(Math.round(S.pull * 100 / 5) * 5, 10, 100)); H.act(S, 'pull'); }, up: S => { if (S.pull > .06) kick(S); S.pull = 0; } });
        L.push({ id: 'watch', x: S.W - 92, y: 112, r: 54, hint: false, tip: 'انقر لتشغيل/إيقاف ساعة التوقيت', click: S => { if (!S.swOn && S.ph === 'ready') S.sw = 0; S.swOn = !S.swOn; if (!S.swOn && S.ph === 'stop' && S.p.auto) { } H.snd(); } });
        L.push({ id: 'tape', x: g.X(S.tape) + 1, y: ty, r: 22, axis: 'x', keep: true, hint: false, tip: 'اسحب طرف شريط القياس إلى النقطة B',
          down: S => { S.tapeDrag = true; }, drag: (S, d) => { let m = clamp(g.M(d.x), 0, g.c.L); if (S.Bm >= 0 && Math.abs(g.X(m) - g.X(S.Bm)) < 14) m = S.Bm; S.tape = m; }, up: S => { S.tapeDrag = false; if (measured(S)) H.snd('ok'); } });
        if (!S.p.auto) { const ch = S.chalk || [S.W - 200, g.gy + 120]; L.push({ id: 'chalk', x: ch[0], y: ch[1], r: 26, axis: 'xy', keep: true, hint: false, tip: 'اسحب الطباشير إلى مكان توقف الكرة لتعليم B',
          drag: (S, d) => { S.chalk = [d.x, d.y]; }, up: S => { if (S.ph === 'stop' && Math.abs(S.chalk[0] - g.X(S.bx)) < 30 && Math.abs(S.chalk[1] - g.gy - 26) < 46) { S.Bm = S.bx; H.snd('ok'); } S.chalk = null; } }); }
        return L;
      },
      readings(S) { return [rd('قوة الركلة', S.p.F + ' %'), rd('زمن الحركة t (الساعة)', fmt(S.sw, 3) + ' s'), rd('المسافة d (الشريط)', S.tape > 0 ? fmt(S.tape, 3) + ' m' : '—'), rd('الانطلاق S = d / t', measured(S) && S.sw > 0 ? fmt(S.tape / S.sw, 3) + ' m/s' : '—'), rd('حالة الكرة', { ready: 'ساكنة عند A', roll: 'تتحرك', stop: 'توقفت' }[S.ph], 1)]; },
      record(S) { if (!measured(S) || S.sw <= 0) { Runner.toast('أكمل الخطوات: أوقف الساعة، علّم B وقِس المسافة بالشريط', 'info'); return null; } return { F: S.p.F, d: +S.tape.toFixed(2), t: +S.sw.toFixed(2), S: +(S.tape / S.sw).toFixed(2) }; },
      cols: [['F', 'قوة الركلة (%)'], ['d', 'المسافة d (m)'], ['t', 'الزمن t (s)'], ['S', 'الانطلاق S (m/s)']],
      graph: { x: 'F', y: 'S', xl: 'قوة الركلة (%)', yl: 'الانطلاق S (m/s)' },
      explain(S) { if (S.ph === 'ready') return 'الكرة <b>ساكنة</b> عند نقطة البداية <b>A</b>. اسحب القدم للخلف واتركها لتركل الكرة.'; if (S.ph === 'roll') return 'الكرة <b>تتحرك</b>: موقعها يتغير مع الزمن، وساعة التوقيت تعدّ الزمن. لاحظ أن آثار الكرة كل ثانية تتقارب لأن الكرة تتباطأ.'; return measured(S) ? `قطعت الكرة <b>${fmt(S.tape, 3)} m</b> في <b>${fmt(S.sw, 3)} s</b>، أي <b>${fmt(S.tape / S.sw, 3)} m</b> في كل ثانية تقريباً — هذا هو <b>الانطلاق</b> S = d / t. اركل بقوة أكبر وقارن.` : 'توقفت الكرة عند نقطة النهاية <b>B</b>. اسحب طرف شريط القياس من A إلى B لقياس المسافة.'; },
      quiz: [
        { q: 'المسافة المقطوعة خلال وحدة الزمن هي:', o: ['الانطلاق', 'الموقع', 'مسار الحركة'], a: 0, why: 'الانطلاق = المسافة ÷ الزمن (مراجعة الفصل س1).' },
        { q: 'قطعت كرة 30 m في 6 s. انطلاقها:', o: ['180 m/s', '5 m/s', '0.2 m/s'], a: 1, why: 'S = d / t = 30 ÷ 6 = 5 m/s.' },
        { q: 'ما الأداة التي نقيس بها زمن حركة الكرة؟', o: ['شريط القياس', 'ساعة التوقيت', 'الميزان'], a: 1, why: 'الزمن يقاس بساعة التوقيت، والمسافة بشريط القياس.' }
      ]
    });
  })();

  /* ---------------- generic "drag the card into the right box" sorter ----------------
     cfg: { items:S=>[{id,label,bin,icon?,why?}], bins:S=>[{id,label,col,sub?}], cols, cw, ch, top, binCols, binTop(h), drawItem(ctx,it,x,y,cw,ch,S), chip(it) } */
  const Sorter = cfg => {
    const lay = S => {
      const w = S.W, h = S.H, its = cfg.items(S), bs = cfg.bins(S), x0 = 78, x1 = w - 18, top = cfg.top || 78;
      const cols = cfg.cols || 4, cw = Math.min(cfg.cw || 170, (x1 - x0 - (cols - 1) * 10) / cols), ch = cfg.ch || 54, gx = cols > 1 ? (x1 - x0 - cols * cw) / (cols - 1) : 0;
      const slot = i => [x1 - cw / 2 - (i % cols) * (cw + gx), top + ch / 2 + Math.floor(i / cols) * (ch + 10)];
      const rows = Math.ceil(its.length / cols), ib = top + rows * (ch + 10);
      const bc = (typeof cfg.binCols === 'function' ? cfg.binCols(S) : cfg.binCols) || bs.length, br = Math.ceil(bs.length / bc), by0 = cfg.binTop ? cfg.binTop(h, ib) : ib + 26;
      const bh = Math.max(70, Math.min(cfg.bh || 230, (h - 96 - by0) / br - 12)), bw = (x1 - x0 - (bc - 1) * 12) / bc;
      const bin = j => ({ x: x1 - bw / 2 - (j % bc) * (bw + 12), y: by0 + bh / 2 + Math.floor(j / bc) * (bh + 12), w: bw, h: bh });
      return { w, h, its, bs, cw, ch, slot, bin };
    };
    const st = S => S.so || (S.so = { pos: {}, bin: {}, bad: 0, ok: 0, msg: null, mt: 0, shake: {} });
    const binAt = (L, x, y) => L.bs.findIndex((b, j) => { const q = L.bin(j); return Math.abs(x - q.x) < q.w / 2 + 6 && Math.abs(y - q.y) < q.h / 2 + 6; });
    const drawCard = (ctx, it, x, y, cw, ch, S, o = {}) => {
      if (cfg.drawItem) return cfg.drawItem(ctx, it, x, y, cw, ch, S, o);
      K.raw(ctx, () => { ctx.save(); if (o.lift) { ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 6; } ctx.fillStyle = '#fff'; rr(ctx, x - cw / 2, y - ch / 2, cw, ch, 12); ctx.fill(); ctx.restore(); ctx.strokeStyle = o.bad ? '#dc2626' : '#94a3b8'; ctx.lineWidth = o.bad ? 3 : 1.6; rr(ctx, x - cw / 2, y - ch / 2, cw, ch, 12); ctx.stroke(); });
      if (it.icon) T(ctx, it.icon, x + cw / 2 - 20, y, { s: 20 });
      T(ctx, it.label, x - (it.icon ? 12 : 0), y - (it.sub ? 8 : 0), { s: 14, w: 900 });
      if (it.sub) T(ctx, it.sub, x - (it.icon ? 12 : 0), y + 12, { s: 11.5, w: 800, c: '#64748b' });
    };
    return {
      reset(S) { S.so = null; st(S); S._sdone = 0; },
      left(S) { const so = st(S); return cfg.items(S).filter(it => !so.bin[it.id]).length; },
      draw(ctx, w, h, S) {
        const L = lay(S), so = st(S), A = typeof Interact !== 'undefined' && Interact.act, dragId = A && A.id && A.id.startsWith('card:') ? A.id.slice(5) : null;
        const hot = dragId && so.pos[dragId] ? binAt(L, so.pos[dragId][0], so.pos[dragId][1]) : -1;
        L.bs.forEach((b, j) => {
          const q = L.bin(j), on = j === hot;
          K.raw(ctx, () => { ctx.save(); if (on) { ctx.shadowColor = b.col; ctx.shadowBlur = 22; } ctx.fillStyle = on ? b.col + '33' : b.col + '14'; rr(ctx, q.x - q.w / 2, q.y - q.h / 2, q.w, q.h, 16); ctx.fill(); ctx.restore(); ctx.strokeStyle = b.col; ctx.lineWidth = on ? 4 : 2.4; ctx.setLineDash(on ? [] : [10, 6]); rr(ctx, q.x - q.w / 2, q.y - q.h / 2, q.w, q.h, 16); ctx.stroke(); ctx.setLineDash([]);
            ctx.fillStyle = b.col; rr(ctx, q.x - q.w / 2, q.y - q.h / 2, q.w, 30, 16); ctx.fill(); ctx.fillRect(q.x - q.w / 2, q.y - q.h / 2 + 14, q.w, 16); });
          T(ctx, b.label, q.x, q.y - q.h / 2 + 15, { s: q.w < 130 ? 12 : 14, w: 900, c: '#fff' });
          if (b.sub) T(ctx, b.sub, q.x, q.y - q.h / 2 + 44, { s: 11.5, w: 800, c: b.col });
          const inb = L.its.filter(it => so.bin[it.id] === b.id), y0 = q.y - q.h / 2 + (b.sub ? 64 : 48);
          const per = Math.max(1, Math.floor((q.h - (y0 - (q.y - q.h / 2)) - 4) / 25)), ncol = Math.ceil(inb.length / per), chw = (q.w - 12) / Math.max(1, ncol);
          inb.forEach((it, k) => { const cx = q.x + q.w / 2 - 6 - chw * (Math.floor(k / per) + .5), cy = y0 + (k % per) * 25; const lab = (cfg.chip ? cfg.chip(it) : it.label); T(ctx, '✓ ' + lab, cx, cy, { s: chw < 110 ? 11 : 12, w: 800, c: '#fff', bg: b.col }); });
        });
        L.its.forEach((it, i) => { if (so.bin[it.id] || it.id === dragId) return; const [x, y] = L.slot(i); const sh = so.shake[it.id] > 0 ? Math.sin(so.shake[it.id] * 40) * 6 : 0; drawCard(ctx, it, x + sh, y, L.cw, L.ch, S, { bad: so.shake[it.id] > 0 }); });
        if (dragId && so.pos[dragId]) { const it = L.its.find(q => q.id === dragId); if (it) drawCard(ctx, it, so.pos[dragId][0], so.pos[dragId][1], L.cw, L.ch, S, { lift: 1 }); }
        Object.keys(so.shake).forEach(k => { so.shake[k] -= 1 / 60; if (so.shake[k] <= 0) delete so.shake[k]; });
        if (so.msg && so.mt > 0 && S.p.tip !== false) { so.mt -= 1 / 60; T(ctx, so.msg, (64 + w) / 2, h - 82, { s: 14, w: 900, c: '#fff', bg: so.good ? '#16a34a' : '#dc2626' }); }
        if (!this.left(S) && !S._sdone) { S._sdone = 1; K.cheer(S, w / 2, h * .4); }
        K.party(ctx, S);
      },
      drags(S) {
        const L = lay(S), so = st(S);
        return L.its.map((it, i) => { if (so.bin[it.id]) return null; const [x, y] = so.pos[it.id] || L.slot(i);
          return { id: 'card:' + it.id, x, y, w: L.cw, h: L.ch, axis: 'xy', keep: true, hint: i === 1, idle: i === 1 ? 'اسحب البطاقة إلى الصندوق المناسب ✋' : undefined, tip: 'اسحب «' + it.label + '» إلى الصندوق المناسب',
            down: (S, px, py) => { const s = st(S); s.off = [x - px, y - py]; s.pos[it.id] = [x, y]; },
            drag: (S, d) => { const s = st(S); s.pos[it.id] = [d.x + s.off[0], d.y + s.off[1]]; H.act(S, 'card'); },
            up: (S, px, py) => { const s = st(S), P = s.pos[it.id] || [px, py], j = binAt(L, P[0], P[1]); delete s.pos[it.id];
              if (j < 0) return; const b = L.bs[j];
              if (b.id === it.bin) { s.bin[it.id] = b.id; s.ok++; s.good = 1; s.msg = (cfg.okMsg ? cfg.okMsg(it, b) : 'أحسنت! «' + it.label + '» ← ' + b.label); s.mt = 2.2; H.snd('ok'); }
              else { s.bad++; s.good = 0; s.shake[it.id] = .5; s.msg = (it.why || ('ليس هنا: «' + it.label + '» لا ينتمي إلى «' + b.label + '»')); s.mt = 3; H.snd('bad'); } } };
        }).filter(Boolean);
      }
    };
  };

  /* =========================================================================================
     2) دقة القياس: خطأ زاوية النظر (ص 7، شكل 1)
     ========================================================================================= */
  (() => {
    const SC = {
      bur: { n: '🧪 أنبوب مدرج (سحاحة) — كالكتاب', u: 'mL', tv: 19.70, vc: 19.7, ppu: 120, sg: 1, gap: 46, dec: 2, minor: .1, major: 1 },
      cyl: { n: '🥛 مخبار مدرج فيه ماء', u: 'mL', tv: 47.0, vc: 47, ppu: 24, sg: -1, gap: 50, dec: 1, minor: 1, major: 5 },
      spring: { n: '⚖️ نابض ومؤشر أمام مسطرة', u: 'cm', tv: 11.80, vc: 11.6, ppu: 120, sg: 1, gap: -44, dec: 2, minor: .1, major: 1 },
      thermo: { n: '🌡️ محرار طبي', u: '°C', tv: 36.8, vc: 37, ppu: 48, sg: -1, gap: 30, dec: 1, minor: .1, major: 1 }
    };
    const geo = S => { const w = S.W, h = S.H, c = SC[S.p.sc], xo = 64 + (w - 64) * .46, yc = h * .5, xe = w - 92;
      const yv = v => yc + c.sg * (v - c.vc) * c.ppu, vAt = y => c.vc + (y - yc) / (c.sg * c.ppu), yo = yv(c.tv), xs = xo + c.gap;
      return { w, h, c, xo, yc, xe, yv, vAt, yo, xs }; };
    const reading = (S, g) => { g = g || geo(S); const ye = g.yo + S.eye; if (Math.abs(S.eye) < 6) return { y: g.yo, v: g.c.tv, ok: true };
      const y = ye + (g.yo - ye) * (g.xs - g.xe) / (g.xo - g.xe); return { y, v: g.vAt(y), ok: false }; };
    const where = S => Math.abs(S.eye) < 6 ? 'بمستوى السطح ✓' : S.eye < 0 ? 'أعلى من المستوى' : 'أسفل من المستوى';
    P8({
      id: 'g8_accuracy', ch: 21, sec: 'الدرس الأول: القياس', page: 7, fig: 'شكل 1', kind: 'نشاط', title: 'دقة القياس: أين أضع عيني عند القراءة؟',
      desc: 'نحرّك العين إلى الأعلى والأسفل أمام أداة قياس ونرى كيف تتغير القراءة بسبب زاوية النظر، ونكتشف أن القراءة الصحيحة تكون عندما يكون خط النظر عمودياً على التدريج.',
      tags: 'القياس دقة خطأ زاوية النظر سحاحة مخبار نابض محرار',
      tools: ['أنبوب مدرج (سحاحة)', 'مخبار مدرج', 'نابض ومسطرة', 'محرار'],
      steps: ['اختر أداة القياس من «المثال».', 'اسحب العين 👁️ إلى الأعلى: اقرأ القيمة التي يشير إليها خط النظر.', 'اسحب العين إلى الأسفل واقرأ مرة أخرى — هل تغيرت القراءة؟', 'ضع العين بمستوى سطح السائل (أو المؤشر) تماماً: هذه هي القراءة الصحيحة.', 'اضغط «تسجيل» في كل وضع، وقارن الخطأ في الجدول.'],
      concl: ['يصاحب كل عملية قياس نسبة من الخطأ: انحراف القيمة المقاسة عن القيمة الحقيقية.', 'من أسباب الخطأ: اختيار أداة غير مناسبة أو وجود عيب فيها، أو إجراء القياس بطريقة خاطئة مثل النظر إلى المؤشر أو التدريج بزاوية.', 'للقراءة الصحيحة يجب أن يكون خط النظر عمودياً على التدريج وبمستوى سطح السائل أو المؤشر.', 'للقياس ثلاثة عناصر: الكمية الفيزيائية، ونظام وحدات القياس، وأدوات أو أجهزة القياس.'],
      laws: [],
      fact: ['يسمى هذا الخطأ «خطأ اختلاف المنظر»، ولهذا تضع بعض العدادات الدقيقة مرآة خلف المؤشر: عندما يختفي خيال المؤشر في المرآة تكون عينك في المكان الصحيح.', 'للحصول على أفضل النتائج يكرر العلماء القياس عدة مرات ثم يأخذون المتوسط.'],
      controls: [SEL('sc', 'المثال', Object.keys(SC).map(k => [k, SC[k].n]), 'bur', (v, S) => { S.eye = -120; }),
        TG('line', 'خط النظر', true, null, 'eye'), TG('lens', 'ما تراه العين (مكبّر)', true, null, 'eye'), TG('level', 'المستوى الصحيح', true, null, 'labels'), TG('err', 'مقدار الخطأ', true, null, 'meter'),
        BT('', [{ t: 'العين فوق', on: S => { S.eye = -130; } }, { t: 'بمستوى السطح', on: S => { S.eye = 0; } }, { t: 'العين تحت', on: S => { S.eye = 130; } }])],
      setup(S) { S.eye = -120; },
      update(S, dt) { },
      draw(ctx, w, h, S) {
        const g = geo(S), c = g.c, p = S.p, sc = p.sc, rdg = reading(S, g), ye = g.yo + S.eye;
        K.bg(ctx, w, h, { benchY: h * .9 });
        H.banner(ctx, w, 'اسحب العين 👁️ للأعلى وللأسفل — متى تكون القراءة صحيحة؟', '#0284c7');
        const vTop = g.vAt(84), vBot = g.vAt(h * .88), vlo = Math.min(vTop, vBot), vhi = Math.max(vTop, vBot);
        const ticks = (x, dirx) => { K.raw(ctx, () => { ctx.strokeStyle = '#1e293b'; ctx.fillStyle = '#1e293b'; ctx.font = '800 13px ui-monospace,monospace'; ctx.direction = 'ltr'; ctx.textAlign = dirx > 0 ? 'left' : 'right'; ctx.textBaseline = 'middle';
          for (let v = Math.ceil(vlo / c.minor) * c.minor; v <= vhi; v += c.minor) { const y = g.yv(v), mj = Math.abs(v / c.major - Math.round(v / c.major)) < 1e-6, hf = Math.abs(v / (c.major / 2) - Math.round(v / (c.major / 2))) < 1e-6; ctx.lineWidth = mj ? 2 : 1; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + dirx * (mj ? 18 : hf ? 12 : 7), y); ctx.stroke(); if (mj) ctx.fillText(String(Math.round(v)), x + dirx * 22, y); } ctx.textBaseline = 'alphabetic'; }); };
        if (sc === 'bur' || sc === 'cyl' || sc === 'thermo') {
          const half = sc === 'thermo' ? 22 : 46, top = 76, bot = h * .9 - 6;
          K.raw(ctx, () => {
            if (sc !== 'thermo') { const lg = ctx.createLinearGradient(g.xo - half, 0, g.xo + half, 0); lg.addColorStop(0, '#7dd3fc'); lg.addColorStop(.5, '#e0f2fe'); lg.addColorStop(1, '#7dd3fc'); ctx.fillStyle = lg; ctx.globalAlpha = .75;
              const ly = g.yo; ctx.beginPath(); ctx.moveTo(g.xo - half + 3, ly - 7); ctx.quadraticCurveTo(g.xo, ly + 9, g.xo + half - 3, ly - 7); ctx.lineTo(g.xo + half - 3, bot); ctx.lineTo(g.xo - half + 3, bot); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
              ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(g.xo - half + 3, ly - 7); ctx.quadraticCurveTo(g.xo, ly + 9, g.xo + half - 3, ly - 7); ctx.stroke(); }
            else { ctx.fillStyle = '#f8fafc'; rr(ctx, g.xo - half, top, half * 2, bot - top, half); ctx.fill(); ctx.fillStyle = '#dc2626'; rr(ctx, g.xo - 4, g.yo, 8, bot - g.yo, 3); ctx.fill(); ctx.beginPath(); ctx.arc(g.xo, bot - 4, 14, 0, TAU); ctx.fill(); }
            ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.xo - half, top - 10); ctx.lineTo(g.xo - half, bot); ctx.moveTo(g.xo + half, top - 10); ctx.lineTo(g.xo + half, bot); ctx.stroke();
            ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(g.xo - half + 6, top, 6, bot - top);
          });
          ticks(g.xs, -1);
          T(ctx, sc === 'bur' ? 'سحاحة' : sc === 'cyl' ? 'مخبار مدرج' : 'محرار', g.xo, 58, { s: 12, w: 900, c: '#fff', bg: '#334155' });
        } else {
          // spring with pointer in front of a wooden scale (scale behind = left)
          K.raw(ctx, () => { const bx = g.xs - 70; ctx.fillStyle = '#f5deb3'; rr(ctx, bx, 70, 70, h * .9 - 80, 6); ctx.fill(); ctx.strokeStyle = '#a16207'; ctx.lineWidth = 1.5; ctx.stroke();
            ctx.fillStyle = '#475569'; ctx.fillRect(g.xo - 60, 62, 160, 10); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3; ctx.beginPath(); const n = 18, y0 = 72, y1 = g.yo - 26; for (let k = 0; k <= n; k++) { const yy = y0 + (y1 - y0) * k / n; ctx.lineTo(g.xo + (k % 2 ? 16 : -16) * (k > 0 && k < n ? 1 : 0), yy); } ctx.stroke();
            ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.xo, y1); ctx.lineTo(g.xo, g.yo + 40); ctx.stroke();
            ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(g.xs + 2, g.yo); ctx.lineTo(g.xo + 4, g.yo - 6); ctx.lineTo(g.xo + 4, g.yo + 6); ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#64748b'; rr(ctx, g.xo - 28, g.yo + 40, 56, 48, 6); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '800 13px Tajawal'; ctx.textAlign = 'center'; ctx.fillText('ثقل', g.xo, g.yo + 70); });
          ticks(g.xs, -1);
        }
        // correct level guide
        if (p.level) K.raw(ctx, () => { ctx.strokeStyle = 'rgba(22,163,74,.55)'; ctx.lineWidth = 2; ctx.setLineDash([4, 6]); ctx.beginPath(); ctx.moveTo(g.xs, g.yo); ctx.lineTo(g.xe + 30, g.yo); ctx.stroke(); ctx.setLineDash([]); });
        // ghost eyes 1 2 3
        [[-130, '1', '✗'], [0, '2', '✓'], [130, '3', '✗']].forEach(([dy, n, m]) => { K.raw(ctx, () => { ctx.globalAlpha = .28; }); H.eye(ctx, g.xe + 40, g.yo + dy, .7, true, '#64748b'); K.raw(ctx, () => { ctx.globalAlpha = 1; }); T(ctx, n + m, g.xe + 70, g.yo + dy, { s: 12, w: 900, c: m === '✓' ? '#16a34a' : '#dc2626' }); });
        // sight line
        if (p.line) K.raw(ctx, () => { const ex = g.xe - 20; ctx.strokeStyle = rdg.ok ? '#16a34a' : '#dc2626'; ctx.lineWidth = 2.5; ctx.setLineDash([9, 6]); ctx.beginPath(); ctx.moveTo(ex, ye); const xEnd = Math.min(g.xs, g.xo) - 6; ctx.lineTo(xEnd, ye + (g.yo - ye) * (xEnd - ex) / (g.xo - ex)); ctx.stroke(); ctx.setLineDash([]);
          ctx.fillStyle = rdg.ok ? '#16a34a' : '#dc2626'; ctx.beginPath(); ctx.arc(g.xs, rdg.y, 6, 0, TAU); ctx.fill(); });
        H.eye(ctx, g.xe, ye, 1.4, true);
        T(ctx, where(S), g.xe, ye + 32, { s: 12.5, w: 900, c: '#fff', bg: rdg.ok ? '#16a34a' : '#475569' });
        // reading tag at the scale
        T(ctx, rdg.v.toFixed(c.dec) + ' ' + c.u, g.xs - (c.gap > 0 ? 60 : -150), rdg.y, { s: 14, w: 900, c: '#fff', bg: rdg.ok ? '#16a34a' : '#dc2626', mono: 1 });
        // lens: what the eye sees
        if (p.lens) { const lx = 64 + 108, ly = 190, r = 88; K.lens(ctx, lx, ly, r, () => {
            ctx.fillStyle = sc === 'spring' ? '#f5deb3' : '#f0f9ff'; ctx.fillRect(lx - r, ly - r, 2 * r, 2 * r); const k = 2.2, Y = v => ly + c.sg * (v - rdg.v) * c.ppu * k;
            ctx.strokeStyle = '#1e293b'; ctx.fillStyle = '#1e293b'; ctx.font = '800 14px ui-monospace,monospace'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr';
            for (let v = Math.floor((rdg.v - 1.2 * r / (c.ppu * k)) / c.minor) * c.minor; v <= rdg.v + 1.2 * r / (c.ppu * k); v += c.minor) { const y = Y(v), mj = Math.abs(v / c.major - Math.round(v / c.major)) < 1e-6; ctx.lineWidth = mj ? 2.4 : 1.2; ctx.beginPath(); ctx.moveTo(lx - 30, y); ctx.lineTo(lx - 30 + (mj ? 34 : 18), y); ctx.stroke(); if (mj || c.ppu * k * c.minor > 20) ctx.fillText(String(+v.toFixed(2)), lx + 10, y); }
            const yo = ly; if (sc === 'spring') { ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(lx - 32, yo); ctx.lineTo(lx - 90, yo - 9); ctx.lineTo(lx - 90, yo + 9); ctx.closePath(); ctx.fill(); }
            else if (sc === 'thermo') { ctx.fillStyle = '#dc2626'; ctx.fillRect(lx - 66, yo, 12, r); }
            else { ctx.fillStyle = 'rgba(56,189,248,.45)'; ctx.fillRect(lx - r, yo, r - 30, r); ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(lx - r, yo - 12); ctx.quadraticCurveTo(lx - r / 2 - 15, yo + 6, lx - 30, yo - 4); ctx.stroke(); }
            ctx.strokeStyle = rdg.ok ? '#16a34a' : '#dc2626'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(lx - r, ly); ctx.lineTo(lx + r, ly); ctx.stroke(); ctx.setLineDash([]); ctx.textBaseline = 'alphabetic'; });
          T(ctx, 'ما تراه العين', lx, ly - r - 14, { s: 12.5, w: 900, c: '#fff', bg: '#334155' }); }
        if (p.err) { const e = rdg.v - c.tv; H.box(ctx, 64 + 108, 310, 196, 'الخطأ في القياس', [['القراءة: ' + rdg.v.toFixed(c.dec) + ' ' + c.u, { mono: 1, s: 13 }], ['الحقيقية: ' + c.tv.toFixed(c.dec) + ' ' + c.u, { mono: 1, s: 13 }], [(rdg.ok ? 'لا خطأ ✓' : 'الخطأ = ' + (e > 0 ? '+' : '') + e.toFixed(c.dec) + ' ' + c.u), { s: 15, w: 900, c: rdg.ok ? '#16a34a' : '#dc2626', mono: !rdg.ok }]], { bd: rdg.ok ? '#16a34a' : '#dc2626' }); }
        if (rdg.ok && !S._ch) { S._ch = 1; K.cheer(S, g.xe - 40, g.yo); } if (!rdg.ok) S._ch = 0;
        K.party(ctx, S);
      },
      drags(S) { const g = geo(S); return [
        { id: 'eye', x: g.xe, y: g.yo + S.eye, r: 34, axis: 'y', keep: true, idle: 'اسحب العين للأعلى والأسفل ✋', tip: 'اسحب العين لتغيير زاوية النظر',
          drag: (S, d) => { let e = clamp(d.y - g.yo, -210, 210); if (Math.abs(e) < 10) e = 0; S.eye = e; } },
        ...[-130, 0, 130].map((dy, i) => ({ id: 'ghost' + i, x: g.xe + 40, y: g.yo + dy, r: 16, hint: false, tip: 'ضع العين في الموضع ' + (i + 1), click: S => { S.eye = dy; } }))]; },
      readings(S) { const c = SC[S.p.sc], r = reading(S); return [rd('موضع العين', where(S)), rd('القراءة', r.v.toFixed(c.dec) + ' ' + c.u), rd('القيمة الحقيقية', c.tv.toFixed(c.dec) + ' ' + c.u), rd('الخطأ', (r.v - c.tv).toFixed(c.dec) + ' ' + c.u)]; },
      record(S) { const c = SC[S.p.sc], r = reading(S); return { pos: where(S), v: +r.v.toFixed(c.dec), e: +(r.v - c.tv).toFixed(c.dec) }; },
      cols: [['pos', 'موضع العين'], ['v', 'القراءة'], ['e', 'الخطأ']],
      explain(S) { const r = reading(S), c = SC[S.p.sc]; return r.ok ? `العين <b>بمستوى</b> ${S.p.sc === 'spring' ? 'المؤشر' : 'سطح السائل'} وخط النظر <b>عمودي</b> على التدريج، فالقراءة <b>${c.tv.toFixed(c.dec)} ${c.u}</b> صحيحة.` : `العين <b>${S.eye < 0 ? 'أعلى' : 'أسفل'}</b> من المستوى، فخط النظر مائل ويقطع التدريج عند <b>${r.v.toFixed(c.dec)} ${c.u}</b> بدلاً من ${c.tv.toFixed(c.dec)} ${c.u} — هذا <b>خطأ في طريقة القياس</b>.` + (S.p.sc === 'bur' ? '<br><span style="color:#475569">في شكل 1 بالكتاب: القراءات الثلاث 19.82 mL و 19.70 mL و 19.62 mL، والصحيحة هي <b>19.70 mL</b> (العين بمستوى السطح، الموضع 2 ✓).</span>' : ''); },
      quiz: [
        { q: 'أين يجب أن تكون العين عند قراءة حجم سائل في مخبار مدرج؟', o: ['أعلى من سطح السائل', 'بمستوى سطح السائل', 'أسفل سطح السائل'], a: 1, why: 'يكون خط النظر عمودياً على التدريج عندما تكون العين بمستوى السطح.' },
        { q: 'ما المقصود بالخطأ في القياس؟', o: ['انحراف القيمة المقاسة عن القيمة الحقيقية', 'تكرار القياس عدة مرات', 'استعمال وحدة القياس الدولية'], a: 0, why: 'الخطأ هو الفرق بين القيمة المقاسة والقيمة الحقيقية.' },
        { q: 'من أسباب الخطأ في القياس:', o: ['النظر إلى التدريج بزاوية', 'استعمال النظام الدولي للوحدات', 'تسجيل النتائج في جدول'], a: 0, why: 'النظر بزاوية بدلاً من أن يكون خط النظر عمودياً يسبب خطأ.' }
      ]
    });
  })();

  /* =========================================================================================
     3) الكميات الفيزيائية والنظام الدولي للوحدات (ص 8، جدول 1)
     ========================================================================================= */
  (() => {
    const QS = [
      { id: 'mass', label: 'الكتلة', sub: '5 kg', icon: '🧱', bin: 'sc' }, { id: 'time', label: 'الزمن', sub: '20 s', icon: '⏱️', bin: 'sc' },
      { id: 'vol', label: 'الحجم', sub: '2 m³', icon: '📦', bin: 'sc' }, { id: 'dist', label: 'المسافة', sub: '300 m', icon: '🛣️', bin: 'sc' },
      { id: 'spd', label: 'الانطلاق', sub: '15 m/s', icon: '🏃', bin: 'sc' }, { id: 'temp', label: 'درجة الحرارة', sub: '25 °C', icon: '🌡️', bin: 'sc' },
      { id: 'disp', label: 'الإزاحة', sub: '300 m شرقاً', icon: '➡️', bin: 'vec', why: 'الإزاحة تحتاج اتجاهاً (مثلاً 300 m شرقاً) فهي كمية اتجاهية.' },
      { id: 'vel', label: 'السرعة', sub: '15 m/s شمالاً', icon: '🚗', bin: 'vec', why: 'السرعة = الإزاحة ÷ الزمن ولها اتجاه، فهي كمية اتجاهية.' },
      { id: 'acc', label: 'التعجيل', sub: '2 m/s² شرقاً', icon: '🚀', bin: 'vec', why: 'التعجيل كمية اتجاهية (له مقدار واتجاه).' },
      { id: 'force', label: 'القوة', sub: '10 N للأسفل', icon: '💪', bin: 'vec', why: 'القوة لها مقدار واتجاه، فهي كمية اتجاهية.' }
    ].map(q => q.bin === 'sc' && !q.why ? Object.assign(q, { why: '«' + q.label + '» تكفي معرفة مقدارها ووحدتها فقط — هي كمية مقدارية.' }) : q);
    const SI = [
      { id: 'u_m', label: 'متر', sub: 'm', bin: 'L' }, { id: 'u_kg', label: 'كيلوغرام', sub: 'kg', bin: 'M' }, { id: 'u_s', label: 'ثانية', sub: 's', bin: 'T' }, { id: 'u_K', label: 'كلفن', sub: 'K', bin: 'K' },
      { id: 'u_A', label: 'أمبير', sub: 'A', bin: 'I' }, { id: 'u_cd', label: 'شمعة قياسية', sub: 'cd', bin: 'J' }, { id: 'u_mol', label: 'مول', sub: 'mol', bin: 'N' },
      { id: 'u_N', label: 'نيوتن', sub: 'N = kg·m/s²', bin: 'D', why: 'النيوتن ليس وحدة أساسية: N = kg·m/s² (وحدة مشتقة).' }, { id: 'u_ms', label: 'متر/ثانية', sub: 'm/s', bin: 'D', why: 'm/s وحدة مشتقة: المتر مقسوماً على الثانية.' }, { id: 'u_m3', label: 'متر مكعب', sub: 'm³', bin: 'D', why: 'm³ وحدة مشتقة: مكعب وحدة المتر.' }
    ];
    const SB = [{ id: 'L', label: 'الطول أو البعد', col: '#2563eb' }, { id: 'M', label: 'الكتلة', col: '#7c3aed' }, { id: 'T', label: 'الزمن', col: '#0891b2' }, { id: 'K', label: 'درجة الحرارة', col: '#dc2626' },
      { id: 'I', label: 'التيار الكهربائي', col: '#ca8a04' }, { id: 'J', label: 'قوة الإضاءة', col: '#ea580c' }, { id: 'N', label: 'كمية المادة', col: '#16a34a' }, { id: 'D', label: 'وحدة مشتقة', col: '#475569', sub: 'ليست أساسية' }];
    const so = Sorter({
      items: S => S.p.mode === 'si' ? SI : QS,
      bins: S => S.p.mode === 'si' ? SB : [{ id: 'sc', label: 'كمية مقدارية (عددية)', sub: 'مقدار + وحدة', col: '#0284c7' }, { id: 'vec', label: 'كمية اتجاهية', sub: 'مقدار + وحدة + اتجاه →', col: '#dc2626' }],
      cols: 5, ch: 56, top: 92, binCols: S => S.p.mode === 'si' ? 4 : 2, bh: 300,
      chip: it => it.label + (it.sub && it.sub.length < 6 ? ' (' + it.sub + ')' : '')
    });
    P8({
      id: 'g8_quantities', ch: 21, sec: 'الدرس الأول: القياس', page: 8, fig: 'جدول 1', kind: 'نشاط', title: 'الكميات المقدارية والاتجاهية والوحدات الأساسية',
      desc: 'نفرز الكميات الفيزيائية إلى مقدارية (تكفي بمقدارها ووحدتها) واتجاهية (تحتاج اتجاهاً أيضاً)، ثم نطابق الوحدات الأساسية السبع في النظام الدولي مع كمياتها ونميز الوحدات المشتقة.',
      tags: 'كمية مقدارية اتجاهية النظام الدولي SI وحدات أساسية مشتقة متر كيلوغرام ثانية',
      tools: ['بطاقات الكميات', 'بطاقات الوحدات'],
      steps: ['في وضع «مقدارية أم اتجاهية؟» اسحب كل بطاقة إلى الصندوق المناسب.', 'فكّر: هل يكفي أن أقول «5 kg»؟ أم يجب أن أذكر الاتجاه مثل «300 m شرقاً»؟', 'انتقل إلى وضع «الوحدات الأساسية (SI)» واسحب كل وحدة إلى الكمية التي تقيسها (جدول 1).', 'ضع الوحدات المشتقة (N ، m/s ، m³) في صندوق «وحدة مشتقة».'],
      concl: ['الكميات المقدارية (العددية): توصف بذكر مقدارها ووحدة قياسها، مثل الحجم والكتلة والمسافة والانطلاق.', 'الكميات الاتجاهية: توصف بذكر مقدارها ووحدة قياسها مع ذكر اتجاهها، مثل الإزاحة والسرعة والتعجيل والقوة.', 'يشتمل النظام الدولي للوحدات (SI) على سبع وحدات أساسية: m ، kg ، s ، K ، A ، cd ، mol.', 'الكميات المشتقة تعرّف بدلالة الأساسية: الحجم m³ ، السرعة m/s ، القوة N = kg·m/s².'],
      laws: ['g8_speed', 'g8_velocity'],
      fact: ['هناك أنظمة أخرى للوحدات: النظام البريطاني (باوند، قدم، ثانية) والنظام الگاوسي (غرام، سنتيمتر، ثانية).', 'منذ عام 2019 تعرّف وحدة الكيلوغرام بثابت فيزيائي (ثابت بلانك) بدلاً من أسطوانة معدنية محفوظة في فرنسا.'],
      controls: [SEL('mode', 'النشاط', [['sort', 'مقدارية أم اتجاهية؟'], ['si', 'الوحدات الأساسية (SI)']], 'sort', (v, S) => so.reset(S)), TG('tip', 'رسالة التصحيح والتلميح', true, null, 'labels'),
        BT('', [{ t: 'أعد البطاقات', on: S => so.reset(S) }])],
      setup(S) { so.reset(S); },
      draw(ctx, w, h, S) {
        K.bg(ctx, w, h, { benchY: h + 10, bench: false });
        H.banner(ctx, w, S.p.mode === 'si' ? 'اسحب كل وحدة إلى الكمية التي تقيسها (جدول 1)' : 'اسحب كل كمية: هل تحتاج اتجاهاً؟', '#0284c7');
        if (S.p.mode === 'si') T(ctx, 'الوحدات الأساسية السبع في النظام الدولي (SI) + وحدات مشتقة', (64 + w) / 2, 56, { s: 13, w: 800, c: '#334155' });
        else { T(ctx, 'مثال: «الكتلة 5 kg» تكفي — أما «الإزاحة 300 m» فلا تكفي حتى نقول: شرقاً أم غرباً؟', (64 + w) / 2, 56, { s: 13, w: 800, c: '#334155' }); }
        so.draw(ctx, w, h, S);
        const L = so.left(S), n = (S.p.mode === 'si' ? SI : QS).length; T(ctx, L ? 'بقي ' + L + ' من ' + n : 'أكملت الفرز! 🎉', 74, h - 50, { s: 13, w: 900, c: '#fff', bg: L ? '#475569' : '#16a34a', a: 'left' });
      },
      drags(S) { return so.drags(S); },
      readings(S) { const s = S.so || {}; return [rd('الصحيح', String(s.ok || 0)), rd('المحاولات الخاطئة', String(s.bad || 0)), rd('المتبقي', String(so.left(S)))]; },
      explain(S) { const s = S.so || {}; if (s.msg && s.mt > 0) return s.msg; return S.p.mode === 'si' ? 'في الجدول (1): الطول ← المتر <b>m</b>، الكتلة ← الكيلوغرام <b>kg</b>، الزمن ← الثانية <b>s</b>، درجة الحرارة ← الكلفن <b>K</b>، التيار ← الأمبير <b>A</b>، قوة الإضاءة ← الشمعة القياسية <b>cd</b>، كمية المادة ← المول <b>mol</b>.' : 'اسأل نفسك عن كل كمية: <b>هل يتغير المعنى إذا غيرنا الاتجاه؟</b> إذا نعم فهي <b>اتجاهية</b>، وإلا فهي <b>مقدارية</b>.'; },
      quiz: [
        { q: 'واحدة مما يلي لا تعد وحدة أساسية:', o: ['N', 's', 'kg'], a: 0, why: 'النيوتن N وحدة مشتقة = kg·m/s² (مراجعة الفصل س2-5).' },
        { q: 'أيّ مما يلي يمثل قياساً للسرعة؟', o: ['20 m شرقاً', '5 km/h جنوباً', '70 km/h'], a: 1, why: 'السرعة كمية اتجاهية: مقدار + وحدة سرعة + اتجاه (س2-6).' },
        { q: 'الكمية المقدارية من بين الآتية:', o: ['الإزاحة', 'التعجيل', 'الكتلة'], a: 2, why: 'الكتلة توصف بمقدارها ووحدتها فقط.' }
      ]
    });
  })();

  /* =========================================================================================
     4) نشاط: أدوات القياس (ص 9، شكل 2) — نقيس طول القلم بأدوات مختلفة + نصنّف أدوات القياس
     ========================================================================================= */
  (() => {
    const OBJ = { pencil: { n: '✏️ قلم رصاص', L: 14.27 }, eraser: { n: '🧽 ممحاة', L: 4.63 }, key: { n: '🔑 مفتاح', L: 5.86 }, coin: { n: '🪙 قطعة نقدية (قطرها)', L: 2.48 } };
    const TL = { tape: { n: 'شريط القياس (القماش)', st: 'الأول', res: 1, dig: 0, max: 20, cal: false, div: '1 cm' }, ruler: { n: 'المسطرة', st: 'الثاني', res: .1, dig: 1, max: 20, cal: false, div: '1 mm' },
      vern: { n: 'القدمة ذات الورنية', st: 'الثالث', res: .01, dig: 2, max: 16, cal: true, div: '0.1 mm' }, digi: { n: 'القدمة الرقمية', st: 'الرابع', res: .001, dig: 3, max: 16, cal: true, div: '0.01 mm' } };
    const TK = Object.keys(TL);
    const geo = S => { const w = S.W, h = S.H, t = TL[S.p.tool], x0 = 150, ppc = (w - 60 - x0) / t.max, y = h * .5; return { w, h, t, x0, ppc, y, X: c => x0 + c * ppc }; };
    const q = (v, r) => Math.round(v / r + 1e-9) * r;
    const meas = S => { const t = TL[S.p.tool], L = OBJ[S.p.sc].L; if (t.cal) { const j = Math.max(S.jaw, L); return { end: q(j, t.res), start: 0, len: q(j, t.res), ok: Math.abs(j - L) < .004 }; } const e = S.ox + L; return { end: q(e, t.res), start: q(S.ox, t.res), len: q(e, t.res) - q(S.ox, t.res), ok: Math.abs(S.ox) < 1e-6 }; };
    const drawObj = (ctx, kind, x, y, Lpx, s) => K.raw(ctx, () => {
      ctx.save(); ctx.translate(x, y);
      if (kind === 'pencil') { const hh = 18; ctx.fillStyle = '#f9a8d4'; rr(ctx, 0, -hh / 2, 16, hh, 3); ctx.fill(); ctx.fillStyle = '#cbd5e1'; ctx.fillRect(14, -hh / 2, 10, hh); ctx.fillStyle = '#facc15'; ctx.fillRect(24, -hh / 2, Lpx - 24 - 34, hh); ctx.fillStyle = '#eab308'; ctx.fillRect(24, -2, Lpx - 58, 4); ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.moveTo(Lpx - 34, -hh / 2); ctx.lineTo(Lpx, 0); ctx.lineTo(Lpx - 34, hh / 2); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.moveTo(Lpx - 10, -3); ctx.lineTo(Lpx, 0); ctx.lineTo(Lpx - 10, 3); ctx.fill(); }
      else if (kind === 'eraser') { ctx.fillStyle = '#e0f2fe'; rr(ctx, 0, -14, Lpx, 28, 5); ctx.fill(); ctx.fillStyle = '#2563eb'; ctx.fillRect(Lpx * .45, -14, Lpx * .55, 28); ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 1.2; rr(ctx, 0, -14, Lpx, 28, 5); ctx.stroke(); }
      else if (kind === 'key') { ctx.fillStyle = '#d4a017'; ctx.strokeStyle = '#854d0e'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(Lpx * .17, 0, Lpx * .17, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(Lpx * .1, 0, Lpx * .05, 0, TAU); ctx.fill(); ctx.fillStyle = '#d4a017'; ctx.fillRect(Lpx * .32, -5, Lpx * .68, 10); ctx.beginPath(); for (let k = 0; k < 4; k++) { ctx.rect(Lpx * (.55 + k * .1), 5, Lpx * .06, 5 + (k % 2) * 4); } ctx.fill(); }
      else { const r = Lpx / 2; const g = ctx.createRadialGradient(r * .7, -r * .3, 2, r, 0, r); g.addColorStop(0, '#f1f5f9'); g.addColorStop(1, '#94a3b8'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(r, 0, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillStyle = '#475569'; ctx.font = `800 ${Math.round(r * .7)}px ui-monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('250', r, 1); ctx.textBaseline = 'alphabetic'; }
      ctx.restore(); });
    /* tool scales */
    const drawScale = (ctx, g, S) => {
      const t = g.t, k = S.p.tool, ppc = g.ppc;
      K.raw(ctx, () => {
        ctx.direction = 'ltr'; ctx.textAlign = 'center';
        if (!t.cal) {
          const y = g.y + 16; // scale strip under the object
          if (k === 'tape') { ctx.fillStyle = '#fde047'; ctx.fillRect(g.x0 - 30, y, t.max * ppc + 50, 36); ctx.strokeStyle = '#a16207'; ctx.strokeRect(g.x0 - 30, y, t.max * ppc + 50, 36); ctx.fillStyle = '#b45309'; rr(ctx, g.x0 - 34, y - 4, 26, 44, 4); ctx.fill(); }
          else { ctx.fillStyle = 'rgba(224,242,254,.92)'; ctx.fillRect(g.x0 - 18, y, t.max * ppc + 36, 46); ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 1.5; ctx.strokeRect(g.x0 - 18, y, t.max * ppc + 36, 46); }
          ctx.strokeStyle = '#1e293b'; ctx.fillStyle = '#1e293b'; ctx.font = '800 11px ui-monospace,monospace';
          const step = k === 'tape' ? 1 : .1;
          for (let c = 0; c <= t.max + 1e-6; c = +(c + step).toFixed(2)) { const x = g.X(c), mj = Math.abs(c - Math.round(c)) < 1e-6, hf = Math.abs(c * 2 - Math.round(c * 2)) < 1e-6; ctx.lineWidth = mj ? 1.6 : .8; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + (mj ? 16 : hf ? 11 : 6)); ctx.stroke(); if (mj) ctx.fillText(String(Math.round(c)), x, y + 28); }
          ctx.font = '800 10px Tajawal'; ctx.fillText('cm', g.X(t.max) + 2, y + 40);
        } else {
          const by = g.y - 46; // steel beam with mm scale; object hangs below between the jaws
          const bg = ctx.createLinearGradient(0, by, 0, by + 34); bg.addColorStop(0, '#e2e8f0'); bg.addColorStop(1, '#94a3b8'); ctx.fillStyle = bg; ctx.fillRect(g.x0 - 50, by, t.max * ppc + 80, 34); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.2; ctx.strokeRect(g.x0 - 50, by, t.max * ppc + 80, 34);
          ctx.strokeStyle = '#0f172a'; ctx.fillStyle = '#0f172a'; ctx.font = '800 11px ui-monospace,monospace';
          for (let mm = 0; mm <= t.max * 10; mm++) { const x = g.X(mm / 10), mj = mm % 10 === 0; ctx.lineWidth = mj ? 1.5 : .7; ctx.beginPath(); ctx.moveTo(x, by + 34); ctx.lineTo(x, by + 34 - (mj ? 14 : mm % 5 ? 6 : 10)); ctx.stroke(); if (mj) ctx.fillText(String(mm / 10), x, by + 12); }
          // fixed jaw at 0
          ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.moveTo(g.x0 - 50, by); ctx.lineTo(g.x0, by); ctx.lineTo(g.x0, g.y + 46); ctx.lineTo(g.x0 - 14, g.y + 46); ctx.lineTo(g.x0 - 30, by + 34); ctx.lineTo(g.x0 - 50, by + 34); ctx.closePath(); ctx.fill();
          // sliding jaw
          const jx = g.X(Math.max(S.jaw, OBJ[S.p.sc].L)); ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.moveTo(jx, by - 8); ctx.lineTo(jx + 80, by - 8); ctx.lineTo(jx + 80, by + 54); ctx.lineTo(jx + 30, by + 54); ctx.lineTo(jx + 14, g.y + 46); ctx.lineTo(jx, g.y + 46); ctx.closePath(); ctx.fill();
          if (k === 'vern') { ctx.fillStyle = '#f1f5f9'; ctx.fillRect(jx, by + 34, 76, 18); ctx.strokeStyle = '#0f172a'; for (let i = 0; i <= 10; i++) { const x = jx + i * .9 * ppc / 10 * 1; ctx.lineWidth = i % 5 ? .7 : 1.4; ctx.beginPath(); ctx.moveTo(x, by + 34); ctx.lineTo(x, by + 34 + (i % 5 ? 6 : 10)); ctx.stroke(); } }
          else { ctx.fillStyle = '#0f172a'; rr(ctx, jx + 8, by - 4, 66, 26, 4); ctx.fill(); ctx.fillStyle = '#a3e635'; ctx.font = '800 15px ui-monospace,monospace'; ctx.fillText((meas(S).len * 10).toFixed(2), jx + 41, by + 14); ctx.font = '700 8px ui-monospace'; ctx.fillStyle = '#e2e8f0'; ctx.fillText('mm', jx + 41, by + 31); }
          ctx.fillStyle = '#fff'; ctx.font = '800 11px Tajawal'; ctx.fillText('↔', jx + 52, by + 47);
        }
        ctx.textAlign = 'left';
      });
    };
    const gal = Sorter({
      items: () => [{ id: 'ruler', label: 'مسطرة', bin: 'L' }, { id: 'calip', label: 'القدمة', bin: 'L' }, { id: 'tape', label: 'شريط قياس', bin: 'L' }, { id: 'spring', label: 'ميزان نابضي', bin: 'M', why: 'الميزان النابضي يقيس الوزن/الكتلة وليس الطول أو الزمن.' }, { id: 'digscale', label: 'ميزان رقمي', bin: 'M' }, { id: 'pans', label: 'ميزان ذو كفتين', bin: 'M' }, { id: 'stop', label: 'ساعة توقيت', bin: 'T' }, { id: 'watch', label: 'ساعة رقمية', bin: 'T' }, { id: 'sand', label: 'ساعة رملية', bin: 'T', why: 'الساعة الرملية أداة قديمة لقياس الزمن.' }],
      bins: () => [{ id: 'L', label: 'أدوات قياس الطول', sub: 'وحدتها m', col: '#2563eb' }, { id: 'M', label: 'أدوات قياس الكتلة', sub: 'وحدتها kg', col: '#7c3aed' }, { id: 'T', label: 'أدوات قياس الزمن', sub: 'وحدتها s', col: '#0891b2' }],
      cols: 3, ch: 74, cw: 190, top: 64,
      drawItem(ctx, it, x, y, cw, ch, S, o) {
        K.raw(ctx, () => { ctx.save(); if (o.lift) { ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 6; } ctx.fillStyle = '#fff'; rr(ctx, x - cw / 2, y - ch / 2, cw, ch, 12); ctx.fill(); ctx.restore(); ctx.strokeStyle = o.bad ? '#dc2626' : '#94a3b8'; ctx.lineWidth = o.bad ? 3 : 1.6; rr(ctx, x - cw / 2, y - ch / 2, cw, ch, 12); ctx.stroke();
          const ix = x + cw / 2 - 40, iy = y; ctx.save(); ctx.translate(ix, iy); ctx.lineWidth = 2; ctx.strokeStyle = '#334155';
          switch (it.id) {
            case 'ruler': ctx.fillStyle = '#e0f2fe'; ctx.fillRect(-30, -9, 60, 18); ctx.strokeRect(-30, -9, 60, 18); for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(-27 + i * 5, -9); ctx.lineTo(-27 + i * 5, i % 2 ? -4 : 0); ctx.stroke(); } break;
            case 'calip': ctx.fillStyle = '#94a3b8'; ctx.fillRect(-30, -14, 60, 8); ctx.fillRect(-30, -14, 7, 30); ctx.fillStyle = '#475569'; ctx.fillRect(4, -18, 16, 14); ctx.fillRect(4, -6, 6, 22); ctx.fillStyle = '#0f172a'; ctx.fillRect(6, -16, 12, 7); break;
            case 'tape': ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(-6, 0, 18, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(-6, 0, 6, 0, TAU); ctx.fill(); ctx.fillStyle = '#fde047'; ctx.fillRect(8, 8, 26, 8); ctx.strokeRect(8, 8, 26, 8); break;
            case 'spring': ctx.fillStyle = '#e2e8f0'; rr(ctx, -8, -26, 16, 40, 5); ctx.fill(); ctx.stroke(); ctx.beginPath(); for (let i = 0; i < 7; i++) ctx.lineTo(i % 2 ? 4 : -4, -20 + i * 5); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, 14); ctx.lineTo(0, 20); ctx.arc(0, 24, 4, -Math.PI / 2, Math.PI); ctx.stroke(); break;
            case 'digscale': ctx.fillStyle = '#cbd5e1'; rr(ctx, -30, -6, 60, 20, 4); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.ellipse(0, -8, 24, 5, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.fillRect(-14, 0, 28, 9); ctx.fillStyle = '#a3e635'; ctx.font = '700 8px monospace'; ctx.textAlign = 'center'; ctx.fillText('0.00', 0, 8); break;
            case 'pans': ctx.fillStyle = '#86efac'; ctx.fillRect(-4, -10, 8, 22); ctx.fillRect(-20, 12, 40, 6); ctx.strokeRect(-26, -12, 52, 3); ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.ellipse(-24, -14, 12, 4, 0, 0, TAU); ctx.ellipse(24, -14, 12, 4, 0, 0, TAU); ctx.fill(); ctx.stroke(); break;
            case 'stop': ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(0, 2, 18, 0, TAU); ctx.fill(); ctx.fillStyle = '#a3e635'; ctx.fillRect(-12, -4, 24, 11); ctx.fillStyle = '#1f2937'; ctx.fillRect(-3, -22, 6, 6); break;
            case 'watch': ctx.fillStyle = '#111827'; ctx.fillRect(-8, -26, 16, 52); rr(ctx, -15, -14, 30, 28, 6); ctx.fill(); ctx.fillStyle = '#ef4444'; ctx.font = '800 10px monospace'; ctx.textAlign = 'center'; ctx.fillText('12:00', 0, 4); break;
            case 'sand': ctx.fillStyle = '#7c4a1e'; ctx.fillRect(-14, -24, 28, 4); ctx.fillRect(-14, 20, 28, 4); ctx.fillStyle = '#e0f2fe'; ctx.beginPath(); ctx.moveTo(-10, -20); ctx.lineTo(10, -20); ctx.lineTo(2, 0); ctx.lineTo(10, 20); ctx.lineTo(-10, 20); ctx.lineTo(-2, 0); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#eab308'; ctx.beginPath(); ctx.moveTo(-6, -12); ctx.lineTo(6, -12); ctx.lineTo(1, -2); ctx.lineTo(-1, -2); ctx.fill(); ctx.beginPath(); ctx.moveTo(-9, 20); ctx.lineTo(0, 10); ctx.lineTo(9, 20); ctx.fill(); break;
          }
          ctx.restore(); });
        T(ctx, it.label, x - 30, y, { s: 14.5, w: 900 });
      }
    });
    P8({
      id: 'g8_tools', ch: 21, sec: 'الدرس الأول: القياس', page: 9, fig: 'شكل 2', kind: 'نشاط', title: 'نشاط: أدوات القياس — أيّ أداة أدق في قياس طول القلم؟',
      desc: 'يقيس أربعة طلاب طول القلم نفسه بأدوات قياس طول مختلفة (شريط قياس، مسطرة، قدمة ذات ورنية، قدمة رقمية)، نسجل النتائج في جدول ونناقش سبب اختلافها وأي الأدوات أدق. ثم نصنّف أدوات القياس في الشكل 2.',
      tags: 'أدوات القياس مسطرة قدمة شريط قياس دقة أصغر تدريج ميزان ساعة',
      tools: ['قلم رصاص', 'شريط قياس', 'مسطرة', 'قدمة ذات ورنية', 'قدمة رقمية'],
      steps: ['اختر «قياس طول القلم» وأداة الطالب الأول (شريط القياس).', 'اسحب القلم حتى ينطبق طرفه على الصفر (يتوهج الصفر بالأخضر) — للقدمة: اسحب الفك المتحرك حتى يلامس القلم.', 'اقرأ الطول من المكبّر واضغط «تسجيل».', 'كرر مع أدوات الطلاب الآخرين (انقر على بطاقة الطالب أعلى الشاشة).', 'قارن النتائج في الجدول: لماذا اختلفت؟ وما الأداة الأدق؟', 'في وضع «صنّف أدوات القياس» اسحب كل أداة من الشكل 2 إلى الكمية التي تقيسها.'],
      concl: ['تختلف نتائج قياس الطول نفسه باختلاف أداة القياس.', 'الأداة الأدق هي التي يكون أصغر تدريج فيها أصغر: القدمة الرقمية (0.01 mm) أدق من القدمة ذات الورنية (0.1 mm) أدق من المسطرة (1 mm) أدق من شريط القماش (1 cm).', 'يجب أن يبدأ القياس من الصفر، وإلا فالطول = قراءة النهاية − قراءة البداية.', 'لكل كمية أدوات لقياسها: الطول (مسطرة، قدمة، شريط)، الكتلة (موازين)، الزمن (ساعات).'],
      laws: [],
      fact: ['نستعمل القدمة لقياس القطر الداخلي لأسطوانة مجوفة بدقة (مراجعة الدرس س6) — لها فكّان صغيران من الأعلى لهذا الغرض.', 'لقياس حجم كرة صغيرة نضعها في مخبار مدرج فيه ماء ونقيس ارتفاع الماء (الإزاحة).'],
      controls: [SEL('mode', 'النشاط', [['act', 'قياس طول القلم'], ['gal', 'صنّف أدوات القياس (شكل 2)']], 'act', (v, S) => gal.reset(S)),
        SEL('sc', 'الجسم المقاس', Object.keys(OBJ).map(k => [k, OBJ[k].n]), 'pencil', (v, S) => { S.res = {}; S.ox = 1.3; S.jaw = OBJ[v].L + 1.4; }),
        SEL('tool', 'أداة القياس', TK.map(k => [k, 'الطالب ' + TL[k].st + ': ' + TL[k].n]), 'tape', (v, S) => { S.ox = 1.3; S.jaw = OBJ[S.p.sc].L + 1.4; }),
        TG('lens', 'المكبّر عند طرف الجسم', true, null, 'eye'), TG('zero', 'إبراز الصفر', true, null, 'labels'),
        BT('', [{ t: 'أعد الأدوات', on: S => { S.res = {}; S.ox = 1.3; S.jaw = OBJ[S.p.sc].L + 1.4; gal.reset(S); } }])],
      setup(S) { S.res = {}; S.ox = 1.3; S.jaw = OBJ[S.p.sc].L + 1.4; gal.reset(S); },
      draw(ctx, w, h, S) {
        K.bg(ctx, w, h, { benchY: h * .3 });
        if (S.p.mode === 'gal') { K.bg(ctx, w, h, { bench: false, benchY: h + 5 }); H.banner(ctx, w, 'شكل 2: اسحب كل أداة إلى ما تقيسه', '#0284c7'); gal.draw(ctx, w, h, S); return; }
        const g = geo(S), o = OBJ[S.p.sc], t = g.t, m = meas(S);
        H.banner(ctx, w, 'كل طالب يقيس الطول نفسه بأداة مختلفة', '#0284c7');
        // student cards (= the book's table)
        const cw = Math.min(170, (w - 100) / 4);
        TK.forEach((k, i) => { const cx = w - 30 - cw / 2 - i * (cw + 6), cy = 92, on = S.p.tool === k, r = S.res[k];
          H.card(ctx, cx - cw / 2, cy - 34, cw, 78, { bd: on ? '#0284c7' : '#cbd5e1', lw: on ? 3 : 1.5, bg: on ? '#e0f2fe' : 'rgba(255,255,255,.95)' });
          T(ctx, 'الطالب ' + TL[k].st, cx, cy - 18, { s: 13, w: 900, c: '#0f172a' }); T(ctx, TL[k].n, cx, cy + 2, { s: 11.5, w: 800, c: '#475569' });
          T(ctx, r != null ? r.toFixed(TL[k].dig) + ' cm' : '؟', cx, cy + 26, { s: 14, w: 900, c: r != null ? '#16a34a' : '#94a3b8', mono: 1 }); });
        drawScale(ctx, g, S);
        const ox = t.cal ? 0 : S.ox, oy = t.cal ? g.y + 22 : g.y;
        if (S.p.zero && !t.cal) H.zone(ctx, g.X(0), g.y + 30, 26, 70, m.ok, m.ok ? 'عند الصفر ✓' : 'الصفر');
        drawObj(ctx, S.p.sc, g.X(ox), oy, o.L * g.ppc);
        if (t.cal) { const touch = m.ok; T(ctx, touch ? 'الفك يلامس الجسم ✓' : 'اسحب الفك المتحرك حتى يلامس الجسم ←', Math.min(g.X(Math.max(S.jaw, o.L)) + 40, w - 150), g.y + 70, { s: 12.5, w: 900, c: '#fff', bg: touch ? '#16a34a' : '#0284c7' }); }
        // lens at the far end
        if (S.p.lens) { const endC = t.cal ? Math.max(S.jaw, o.L) : S.ox + o.L, lx = 64 + 130, ly = h * .78, r = 92, k = 160 / (t.res >= 1 ? 2 : t.res >= .1 ? .5 : .25) * .5 / 2;
          K.lens(ctx, lx, ly, r, () => { const Z = c => lx + (c - endC) * k * 2; ctx.fillStyle = t.cal ? '#cbd5e1' : S.p.tool === 'tape' ? '#fde047' : '#e0f2fe'; ctx.fillRect(lx - r, ly, 2 * r, r);
            ctx.strokeStyle = '#0f172a'; ctx.fillStyle = '#0f172a'; ctx.font = '800 13px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.direction = 'ltr';
            const st = S.p.tool === 'tape' ? 1 : .1; for (let c = Math.floor((endC - 1.2) / st) * st; c <= endC + 1.2; c = +(c + st).toFixed(2)) { const x = Z(c); if (x < lx - r || x > lx + r) continue; const mj = Math.abs(c - Math.round(c)) < 1e-6; ctx.lineWidth = mj ? 2.2 : 1.1; ctx.beginPath(); ctx.moveTo(x, ly); ctx.lineTo(x, ly + (mj ? 26 : 14)); ctx.stroke(); if (mj || st === .1 && Math.abs(c * 2 - Math.round(c * 2)) < 1e-6) ctx.fillText(String(+c.toFixed(1)), x, ly + 42); }
            if (S.p.tool === 'vern') { const j = endC; ctx.fillStyle = '#f8fafc'; ctx.fillRect(Z(j), ly + 48, 0.95 * k * 2, 30); for (let i = 0; i <= 10; i++) { const x = Z(j + i * .09), aligned = i === Math.round(((j * 10) % 1) * 10) % 10 || (i === 10 && Math.round(((j * 10) % 1) * 10) === 10); ctx.strokeStyle = aligned ? '#dc2626' : '#0f172a'; ctx.lineWidth = aligned ? 3 : 1.2; ctx.beginPath(); ctx.moveTo(x, ly + 48); ctx.lineTo(x, ly + (i % 5 ? 60 : 66)); ctx.stroke(); } ctx.fillStyle = '#334155'; ctx.font = '700 10px Tajawal'; ctx.fillText('الورنية', Z(j) + 30, ly + 80); }
            ctx.fillStyle = '#facc15'; ctx.globalAlpha = .9; if (S.p.sc === 'pencil') { ctx.fillRect(lx - r, ly - 22, Z(endC) - lx + r - 30, 16); ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.moveTo(Z(endC) - 30, ly - 22); ctx.lineTo(Z(endC), ly - 14); ctx.lineTo(Z(endC) - 30, ly - 6); ctx.fill(); } else { ctx.fillStyle = S.p.sc === 'eraser' ? '#2563eb' : S.p.sc === 'key' ? '#d4a017' : '#94a3b8'; ctx.fillRect(lx - r, ly - 24, Z(endC) - lx + r, 20); } ctx.globalAlpha = 1;
            ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 1.6; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(Z(endC), ly - 40); ctx.lineTo(Z(endC), ly + 30); ctx.stroke(); ctx.setLineDash([]); });
          T(ctx, 'مكبّر عند طرف الجسم', lx, ly - r - 14, { s: 12, w: 900, c: '#fff', bg: '#334155' }); }
        const lines = t.cal ? [['قراءة القدمة = ' + m.len.toFixed(t.dig) + ' cm', { mono: 1 }], ['= ' + (m.len * 10).toFixed(t.dig - 1 < 0 ? 0 : t.dig - 1) + ' mm', { mono: 1, c: '#475569', s: 12.5 }]] : [['قراءة النهاية − قراءة البداية', { s: 12.5, c: '#475569' }], [m.end.toFixed(t.dig) + ' − ' + m.start.toFixed(t.dig) + ' = ' + m.len.toFixed(t.dig) + ' cm', { mono: 1 }]];
        H.box(ctx, w - 160, h * .7, 250, 'الطالب ' + t.st + ' (أصغر تدريج ' + t.div + ')', lines.concat([['الطول = ' + m.len.toFixed(t.dig) + ' cm', { s: 17, w: 900, c: m.ok ? '#16a34a' : '#b45309', mono: 1 }]]), { bd: m.ok ? '#16a34a' : '#b45309' });
        K.party(ctx, S);
      },
      drags(S) {
        if (S.p.mode === 'gal') return gal.drags(S);
        const g = geo(S), o = OBJ[S.p.sc], L = [];
        TK.forEach((k, i) => { const cw = Math.min(170, (S.W - 100) / 4); L.push({ id: 'st' + i, x: S.W - 30 - cw / 2 - i * (cw + 6), y: 92, w: cw, h: 78, hint: false, tip: 'اختر أداة الطالب ' + TL[k].st, click: S => setParam(S, 'tool', k) }); });
        if (!g.t.cal) L.push({ id: 'obj', x: g.X(S.ox + o.L / 2), y: g.y, w: o.L * g.ppc, h: 40, axis: 'x', keep: true, idle: 'اسحب الجسم ليبدأ من الصفر ✋', tip: 'اسحب الجسم على أداة القياس',
          down: (S, x) => { S._grab = (x - g.x0) / g.ppc - S.ox; }, drag: (S, d) => { let v = clamp((d.x - g.x0) / g.ppc - S._grab, -0.5, g.t.max - o.L); if (Math.abs(v) < .15) v = 0; S.ox = v; H.act(S, 'obj'); }, up: S => { if (S.ox === 0) H.snd('ok'); } });
        else L.push({ id: 'jaw', x: g.X(Math.max(S.jaw, o.L)) + 50, y: g.y - 46, w: 90, h: 70, axis: 'x', keep: true, idle: 'اسحب الفك المتحرك ✋', tip: 'اسحب الفك حتى يلامس الجسم',
          drag: (S, d) => { let v = clamp((d.x - 50 - g.x0) / g.ppc, o.L, g.t.max - .2); if (v - o.L < .12) v = o.L; S.jaw = v; H.act(S, 'jaw'); }, up: S => { if (S.jaw === o.L) H.snd('ok'); } });
        return L;
      },
      readings(S) { if (S.p.mode === 'gal') { const s = S.so || {}; return [rd('الصحيح', String(s.ok || 0)), rd('المتبقي', String(gal.left(S)))]; } const t = TL[S.p.tool], m = meas(S); return [rd('الأداة', t.n), rd('أصغر تدريج', t.div), rd('الطول المقاس', m.len.toFixed(t.dig) + ' cm'), rd('الطول الحقيقي', OBJ[S.p.sc].L.toFixed(2) + ' cm'), rd('الحالة', m.ok ? 'قياس صحيح الطريقة ✓' : t.cal ? 'الفك لا يلامس الجسم' : 'الجسم لا يبدأ من الصفر', 1)]; },
      record(S) { if (S.p.mode === 'gal') return null; const t = TL[S.p.tool], m = meas(S); S.res[S.p.tool] = m.len; if (!S._chk && Object.keys(S.res).length === 4) { S._chk = 1; K.cheer(S, S.W / 2, S.H * .3); } return { st: t.st, tool: t.n, L: +m.len.toFixed(t.dig), div: t.div }; },
      cols: [['st', 'الطالب'], ['tool', 'أداة القياس'], ['L', 'نتيجة القياس (cm)'], ['div', 'أصغر تدريج']],
      explain(S) { if (S.p.mode === 'gal') return 'في الشكل (2) أدوات لقياس <b>الطول</b> (مسطرة، قدمة، شريط قياس) و<b>الكتلة</b> (موازين) و<b>الزمن</b> (ساعات).'; const t = TL[S.p.tool], m = meas(S); if (!m.ok) return t.cal ? 'حرّك <b>الفك المتحرك</b> حتى يلامس الجسم، فالقراءة الآن أكبر من الطول الحقيقي.' : 'الجسم <b>لا يبدأ من الصفر</b>: إما أن تحركه إلى الصفر، أو تطرح قراءة البداية من قراءة النهاية.'; return `الطالب ${t.st} قاس <b>${m.len.toFixed(t.dig)} cm</b> بـ${t.n}. أصغر تدريج فيها <b>${t.div}</b> — كلما صغر أصغر تدريج كان القياس <b>أدق</b>.`; },
      quiz: [
        { q: 'أيّ الأدوات الآتية أدق في قياس طول القلم؟', o: ['شريط القماش (1 cm)', 'المسطرة (1 mm)', 'القدمة (0.1 mm)'], a: 2, why: 'الأدق هي الأداة ذات أصغر تدريج.' },
        { q: 'ماذا تستخدم لقياس القطر الداخلي لأسطوانة مجوفة بدقة؟', o: ['شريط القياس', 'القدمة', 'الميزان الرقمي'], a: 1, why: 'القدمة لها فكان داخليان لقياس الأقطار الداخلية بدقة (مراجعة الدرس س6).' },
        { q: 'الساعة الرملية أداة لقياس:', o: ['الزمن', 'الطول', 'الكتلة'], a: 0, why: 'الساعة الرملية والرقمية وساعة التوقيت تقيس الزمن (شكل 2).' }
      ]
    });
  })();

  /* =========================================================================================
     5) البادئات وتحويل الوحدات (ص 10، جدول 2، مثال 1 و 2)
     ========================================================================================= */
  (() => {
    const PF = [['T', 'tera', 'تيرا', 12], ['G', 'giga', 'گيگا', 9], ['M', 'mega', 'ميگا', 6], ['k', 'kilo', 'كيلو', 3], ['', '—', 'الوحدة نفسها', 0], ['c', 'centi', 'سنتي', -2], ['m', 'milli', 'ملي', -3], ['μ', 'micro', 'مايكرو', -6], ['n', 'nano', 'نانو', -9], ['p', 'pico', 'بيكو', -12], ['f', 'femto', 'فيمتو', -15]];
    const EX = {
      ex1: { n: 'مثال 1: عبّر عن 20 m بوحدات mm', v: 20, f: 0, t: -3, u: 'm' }, ex2: { n: 'مثال 2: حوّل 4.5 m إلى km', v: 4.5, f: 0, t: 3, u: 'm' },
      ex3: { n: 'تفكير ناقد: حوّل 20 pm إلى km', v: 20, f: -12, t: 3, u: 'm' }, road: { n: '🚗 بغداد – البصرة 450 km إلى m', v: 450, f: 3, t: 0, u: 'm' },
      hair: { n: '💇 سمك شعرة 80 μm إلى mm', v: 80, f: -6, t: -3, u: 'm' }, virus: { n: '🦠 فايروس 100 nm إلى m', v: 100, f: -9, t: 0, u: 'm' },
      rice: { n: '🍚 كتلة حبة رز 25 mg إلى g', v: 25, f: -3, t: 0, u: 'g' }, flash: { n: '📸 ومضة كاميرا 1 ms إلى s', v: 1, f: -3, t: 0, u: 's' }, free: { n: '✍️ قيمتي أنا', v: 7, f: 0, t: -2, u: 'm' } };
    const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
    const sup = n => String(n).split('').map(c => SUP[c] || c).join('');
    const sci = v => { if (v === 0) return '0'; let e = Math.floor(Math.log10(Math.abs(v)) + 1e-9), m = +(v / Math.pow(10, e)).toPrecision(4); if (m >= 10) { m = +(m / 10).toPrecision(4); e++; } return e === 0 ? String(m) : m + ' × 10' + sup(e); };
    const dec = v => { const a = Math.abs(v); if (a === 0) return '0'; if (a >= 1e9 || a < 1e-6) return null; return String(+v.toPrecision(6)); };
    const ri = e => PF.findIndex(r => r[3] === e);
    const geo = S => { const w = S.W, h = S.H, top = 96, rh = Math.min(46, (h * .78 - top) / PF.length), lw = 230, lx = w - lw - 24; return { w, h, top, rh, lx, lw, ry: i => top + rh * (i + .5) }; };
    P8({
      id: 'g8_prefixes', ch: 21, sec: 'الدرس الأول: القياس', page: 10, fig: 'جدول 2', kind: 'مثال', title: 'البادئات وتحويل الوحدات (سلّم البادئات)',
      desc: 'نستعمل جدول البادئات كسلّم: ننقل علامة «من» و«إلى» بين البادئات فنرى متى نضرب ومتى نقسم، وتظهر خطوات الحل كما في الكتاب مع الكتابة العلمية (أسس العشرة).',
      tags: 'البادئات كيلو ملي مايكرو نانو بيكو تحويل الوحدات أسس عشرة كتابة علمية',
      tools: ['جدول البادئات', 'آلة حاسبة'],
      steps: ['اختر مثالاً من الكتاب (مثال 1 أو 2) أو من الحياة.', 'اسحب العلامة الزرقاء «من» إلى بادئة الوحدة المعطاة، والبرتقالية «إلى» إلى بادئة الوحدة المطلوبة.', 'لاحظ: من وحدة كبيرة إلى صغيرة نضرب (ننزل في السلّم)، ومن صغيرة إلى كبيرة نقسم (نصعد).', 'اقرأ خطوات الحل والنتيجة بالكتابة العلمية.', 'جرّب «قيمتي أنا» وغيّر القيمة من المنزلق.'],
      concl: ['البادئات عبارات تسبق الوحدة وتكتب كدالة أسية للرقم عشرة.', 'تكون البادئة جزءاً من الوحدة عندما يكون الأس سالباً (c, m, μ, n, p, f) ومضاعفات لها عندما يكون الأس موجباً (k, M, G, T).', 'للتحويل من وحدة كبيرة إلى صغيرة نضرب، ومن صغيرة إلى كبيرة نقسم: 20 m = 20 × 1000 mm = 2 × 10⁴ mm ، 4.5 m = 4.5 × 10⁻³ km.'],
      laws: ['g8_prefix'],
      fact: ['البادئة «نانو» من كلمة يونانية تعني «القزم»: 1 nm أصغر من سمك الشعرة بنحو 80000 مرة!', 'سعة ذاكرة الهاتف تقاس بالـ GB (گيگا بايت) أي مليار بايت تقريباً.'],
      controls: [SEL('ex', 'المثال', Object.keys(EX).map(k => [k, EX[k].n]), 'ex1', (v, S) => { const e = EX[v]; setParam(S, 'v', e.v); setParam(S, 'f', e.f); setParam(S, 't', e.t); }),
        R('v', 'القيمة', .1, 1000, 20, .1), SEL('f', 'من بادئة', PF.map(r => [r[3], (r[0] || '—') + ' (' + r[2] + ')']), 0), SEL('t', 'إلى بادئة', PF.map(r => [r[3], (r[0] || '—') + ' (' + r[2] + ')']), -3),
        TG('steps', 'خطوات الحل', true, null, 'labels'), TG('scale', 'شريط الأحجام (من الذرة إلى القمر)', true, null, 'eye')],
      setup(S) { },
      draw(ctx, w, h, S) {
        const g = geo(S), p = S.p, e = EX[p.ex], u = e.u, f = +p.f, t = +p.t, v = p.v, d = f - t, res = v * Math.pow(10, d);
        K.bg(ctx, w, h, { bench: false, benchY: h + 5 });
        H.banner(ctx, w, 'اسحب «من» و«إلى» على سلّم البادئات', '#7c3aed');
        // ladder table
        T(ctx, 'جدول (2) بعض بادئات النظام الدولي', g.lx + g.lw / 2, g.top - 18, { s: 13, w: 900, c: '#7c3aed' });
        const iF = ri(f), iT = ri(t);
        PF.forEach((r, i) => { const y = g.ry(i), between = i > Math.min(iF, iT) && i <= Math.max(iF, iT);
          K.raw(ctx, () => { ctx.fillStyle = r[3] === 0 ? '#ede9fe' : i % 2 ? '#fff' : '#f8fafc'; ctx.fillRect(g.lx, y - g.rh / 2, g.lw, g.rh); ctx.strokeStyle = '#e2e8f0'; ctx.strokeRect(g.lx, y - g.rh / 2, g.lw, g.rh); });
          T(ctx, r[2], g.lx + g.lw - 8, y, { s: 12.5, w: 800, c: '#334155', a: 'right' }); T(ctx, r[0] ? r[0] + u : u, g.lx + g.lw - 104, y, { s: 15, w: 900, c: '#0f172a', mono: 1 }); T(ctx, '10' + sup(r[3]), g.lx + 40, y, { s: 15, w: 900, c: '#7c3aed', mono: 1 });
        });
        // arrows between from and to
        if (iF !== iT) { const down = iT > iF, x = g.lx - 150, y1 = g.ry(iF), y2 = g.ry(iT); H.arrow(ctx, x, y1, x, y2, down ? '#16a34a' : '#dc2626', 5); T(ctx, (down ? '× 10' : '÷ 10') + sup(Math.abs(d)), x - 40, (y1 + y2) / 2, { s: 15, w: 900, c: '#fff', bg: down ? '#16a34a' : '#dc2626', mono: 1 }); T(ctx, down ? 'ننزل: نضرب' : 'نصعد: نقسم', x - 40, (y1 + y2) / 2 + 26, { s: 12, w: 900, c: down ? '#16a34a' : '#dc2626' }); }
        // tokens
        const tok = (i, lab, col, xt) => { const y = g.ry(i); K.raw(ctx, () => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(xt, y); ctx.lineTo(xt - 14, y - 15); ctx.lineTo(xt - 62, y - 15); ctx.lineTo(xt - 62, y + 15); ctx.lineTo(xt - 14, y + 15); ctx.closePath(); ctx.fill(); }); T(ctx, lab, xt - 36, y, { s: 13, w: 900, c: '#fff' }); };
        tok(iF, 'من', '#2563eb', g.lx - 4); tok(iT, 'إلى', '#ea580c', g.lx - 72); if (iF === iT) T(ctx, '(نفس الوحدة)', g.lx + g.lw / 2, g.ry(iF) + g.rh / 2 + 10, { s: 11, c: '#64748b' });
        // computation card
        const fu = (PF[iF][0] || '') + u, tu = (PF[iT][0] || '') + u, cwid = Math.min(380, g.lx - 236 - 74), cx = 74 + cwid / 2;
        const one = d >= 0 ? '1 ' + fu + ' = ' + (dec(Math.pow(10, d)) || '10' + sup(d)) + ' ' + tu : '1 ' + tu + ' = ' + (dec(Math.pow(10, -d)) || '10' + sup(-d)) + ' ' + fu;
        const L = [[v + ' ' + fu + ' = ? ' + tu, { mono: 1, s: 17, c: '#0f172a' }]];
        if (p.steps) { L.push([one, { mono: 1, s: 14, c: '#7c3aed' }]); L.push([d >= 0 ? v + ' × ' + (dec(Math.pow(10, d)) || '10' + sup(d)) : v + ' × 1/' + (dec(Math.pow(10, -d)) || '10' + sup(-d)), { mono: 1, s: 14 }]); if (dec(res)) L.push(['= ' + dec(res) + ' ' + tu, { mono: 1, s: 15, w: 900 }]); }
        L.push(['= ' + sci(res) + ' ' + tu, { mono: 1, s: 19, w: 900, c: '#16a34a' }]);
        H.box(ctx, cx, 120, cwid, d > 0 ? 'من كبيرة إلى صغيرة: نضرب' : d < 0 ? 'من صغيرة إلى كبيرة: نقسم' : 'الوحدة نفسها', L, { bd: '#7c3aed', lh: 28 });
        // size strip (metres only)
        if (p.scale && u === 'm') { const vm = v * Math.pow(10, f), sy = g.top + PF.length * g.rh + 64, x0 = 90, x1 = w - 40, X = lg => x0 + (lg + 15) / 27 * (x1 - x0);
          const IC = [[-15, '⚛', 'نواة'], [-10, '⚛️', 'ذرة'], [-7, '🦠', 'فايروس'], [-4.1, '💇', 'شعرة'], [-2.4, '🐜', 'نملة'], [.2, '🧍', 'إنسان'], [2, '🏢', 'عمارة'], [5.6, '🏙️', 'بغداد–البصرة'], [7.1, '🌍', 'الأرض'], [8.6, '🌙', 'القمر'], [11.2, '☀️', 'الشمس']];
          T(ctx, 'أين تقع قيمتك؟ (مقياس قوى العشرة بالمتر)', (x0 + x1) / 2, sy - 70, { s: 12.5, w: 900, c: '#334155' });
          K.raw(ctx, () => { const gr = ctx.createLinearGradient(x0, 0, x1, 0); gr.addColorStop(0, '#a78bfa'); gr.addColorStop(.5, '#38bdf8'); gr.addColorStop(1, '#fbbf24'); ctx.fillStyle = gr; rr(ctx, x0, sy - 5, x1 - x0, 10, 5); ctx.fill(); ctx.fillStyle = '#334155'; ctx.font = '700 9.5px ui-monospace'; ctx.textAlign = 'center'; ctx.direction = 'ltr'; for (let e2 = -15; e2 <= 12; e2 += 3) { ctx.fillRect(X(e2) - .5, sy + 5, 1, 6); ctx.fillText('10' + sup(e2), X(e2), sy + 22); } });
          IC.forEach(([lg, ic, n], i) => { T(ctx, ic, X(lg), sy - 26 - (i % 2) * 18, { s: 17 }); });
          const lv = Math.log10(Math.max(vm, 1e-16)); const mx = X(clamp(lv, -15, 12)); K.raw(ctx, () => { ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(mx, sy + 2); ctx.lineTo(mx - 9, sy + 34); ctx.lineTo(mx + 9, sy + 34); ctx.closePath(); ctx.fill(); });
          const near = IC.reduce((a, b) => Math.abs(b[0] - lv) < Math.abs(a[0] - lv) ? b : a); T(ctx, sci(vm) + ' m', mx, sy + 46, { s: 12.5, w: 900, c: '#fff', bg: '#dc2626', mono: 1 }); T(ctx, '≈ ' + near[2], mx, sy + 70, { s: 12, w: 900, c: '#dc2626' }); }
      },
      drags(S) { const g = geo(S), L = [], tokDrag = (key, i, col) => ({ id: key + 'tok', x: key === 'f' ? g.lx - 34 : g.lx - 102, y: g.ry(i), w: 66, h: 32, axis: 'y', keep: true, idle: key === 'f' ? 'اسحب «من» ✋' : undefined, hint: key === 'f', tip: 'اسحب لاختيار البادئة',
          drag: (S, d) => { const j = clamp(Math.round((d.y - g.top) / g.rh - .5), 0, PF.length - 1); setParam(S, key, PF[j][3]); setParam(S, 'ex', 'free', false); H.act(S, key); } });
        const iF = ri(+S.p.f), iT = ri(+S.p.t);
        // when both tokens are on the same row, the 'to' one sits slightly lower so both stay grabbable
        const a = tokDrag('f', iF), b = tokDrag('t', iT); 
        PF.forEach((r, i) => L.push({ id: 'row' + i, x: g.lx + g.lw / 2, y: g.ry(i), w: g.lw, h: g.rh - 2, hint: false, tip: 'انقر: اجعلها البادئة المطلوبة «إلى»', click: S => { setParam(S, 't', r[3]); } }));
        L.push(a, b); return L; },
      readings(S) { const p = S.p, e = EX[p.ex], d = +p.f - +p.t, res = p.v * Math.pow(10, d); return [rd('من', p.v + ' ' + (PF[ri(+p.f)][0] || '') + e.u), rd('إلى', (PF[ri(+p.t)][0] || '') + e.u), rd('نضرب/نقسم في', (d >= 0 ? '× ' : '÷ ') + '10' + sup(Math.abs(d))), rd('النتيجة', sci(res) + ' ' + (PF[ri(+p.t)][0] || '') + e.u, 1)]; },
      explain(S) { const d = +S.p.f - +S.p.t; return d > 0 ? `ننتقل من وحدة <b>كبيرة</b> إلى وحدة <b>صغيرة</b> (ننزل ${Math.abs(d)} درجات أسية في السلّم) فـ<b>نضرب</b> في 10${sup(d)}: العدد يكبر لأن الوحدة صغرت.` : d < 0 ? `ننتقل من وحدة <b>صغيرة</b> إلى وحدة <b>كبيرة</b> فـ<b>نقسم</b> على 10${sup(-d)} (أي نضرب في 10${sup(d)}): العدد يصغر لأن الوحدة كبرت.` : 'الوحدتان متساويتان، فلا تغيير.'; },
      quiz: [
        { q: 'النانو (n) يساوي:', o: ['10⁻³', '10⁻⁹', '10⁶'], a: 1, why: 'من جدول البادئات: nano = 10⁻⁹ (مراجعة الفصل س2-4).' },
        { q: '20 m بوحدات mm تساوي:', o: ['2 × 10⁴ mm', '2 × 10⁻² mm', '200 mm'], a: 0, why: '1 m = 1000 mm ⇒ 20 × 1000 = 20000 mm = 2 × 10⁴ mm (مثال 1).' },
        { q: '20 pm بوحدات km تساوي:', o: ['2 × 10⁻¹⁴ km', '2 × 10⁻¹¹ km', '2 × 10¹⁶ km'], a: 0, why: '20 pm = 20 × 10⁻¹² m = 2 × 10⁻¹¹ m = 2 × 10⁻¹⁴ km (نقسم على 10³).' }
      ]
    });
  })();

  /* small person figure (standing), feet at y */
  const person = (ctx, x, y, s = 1, o = {}) => K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s); ctx.lineCap = 'round';
    ctx.strokeStyle = o.pants || '#1e3a8a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-4, -44); ctx.lineTo(-6, -2); ctx.moveTo(4, -44); ctx.lineTo(6, -2); ctx.stroke();
    ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.ellipse(-5, -2, 7, 3.5, 0, 0, TAU); ctx.ellipse(8, -2, 7, 3.5, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = o.shirt || '#f97316'; rr(ctx, -10, -82, 20, 42, 7); ctx.fill(); ctx.strokeStyle = '#f2c49b'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-8, -78); ctx.lineTo(-13, -50); ctx.moveTo(8, -78); ctx.lineTo(o.wave ? 22 : 13, o.wave ? -100 : -50); ctx.stroke();
    ctx.fillStyle = '#f2c49b'; ctx.beginPath(); ctx.arc(0, -93, 10, 0, TAU); ctx.fill(); ctx.fillStyle = o.hair || '#3f2a14'; ctx.beginPath(); ctx.arc(0, -96, 10, Math.PI * .95, Math.PI * 2.05); ctx.fill();
    ctx.restore(); ctx.lineCap = 'butt'; });

  /* =========================================================================================
     6) الحركة والسكون مفهومان نسبيان — نقطة الإسناد والموقع (ص 11)
     ========================================================================================= */
  (() => {
    const LW = 48; // world loop length (m)
    const OBJS = {
      bus: S => [{ id: 'ground', n: 'الأرض (الرصيف)', x: 0, v: 0, lane: 0 }, { id: 'man', n: 'رجل في الموقف', x: 6, v: 0, lane: 0 }, { id: 'bus', n: 'الحافلة', x: -12, v: S.p.v, lane: 1 }, { id: 'pass', n: 'التلميذ الجالس', x: -12 + 7.5, v: S.p.v, lane: 1 }, { id: 'car', n: 'السيارة', x: -4, v: S.p.v2, lane: 2 }],
      train: S => [{ id: 'ground', n: 'الأرض (الرصيف)', x: 0, v: 0, lane: 0 }, { id: 'man', n: 'رجل على الرصيف', x: 6, v: 0, lane: 0 }, { id: 'bus', n: 'القطار الأحمر', x: -16, v: S.p.v, lane: 1 }, { id: 'pass', n: 'مسافر في القطار', x: -16 + 9, v: S.p.v, lane: 1 }, { id: 'car', n: 'القطار الأزرق', x: -12, v: S.p.v2, lane: 2 }]
    };
    const wx = (o, t) => o.x + o.v * t;
    const md = (a, m) => ((a % m) + m) % m;
    P8({
      id: 'g8_reference', ch: 21, sec: 'الدرس الثاني: الحركة وأنواعها', page: 11, fig: 'شكل 1', kind: 'نشاط', title: 'الحركة والسكون نسبيان: اختر نقطة الإسناد',
      desc: 'نختار نقطة الإسناد بالنقر على أي جسم (الأرض، الحافلة، التلميذ الجالس، السيارة…) فيبقى ذلك الجسم ثابتاً على الشاشة ونرى أي الأجسام متحركة وأيها ساكنة بالنسبة له. وفي مشهد الصف نحدد موقع التلميذ بالبعد والاتجاه.',
      tags: 'الحركة السكون نسبي نقطة الإسناد الموقع حافلة قطار',
      tools: ['حافلة / قطار', 'أشخاص', 'مخطط الصف'],
      steps: ['مشهد الشلال (شكل 1): الأرض نقطة إسناد ثابتة — الماء الساقط متحرك والصخور ساكنة. انقر على قطرة الماء أو القارب لتغيير نقطة الإسناد.', 'في مشهد الحافلة: الحافلة تتحرك والرجل في الموقف ينتظر.', 'انقر على «الأرض» (أو الرجل) لتجعلها نقطة الإسناد: من المتحرك ومن الساكن؟', 'انقر على التلميذ الجالس في الحافلة: أصبحت الحافلة ساكنة بالنسبة له، والرجل في الموقف هو الذي يتحرك إلى الخلف!', 'اجعل سرعة السيارة مساوية لسرعة الحافلة: ماذا تلاحظ؟', 'في مشهد «موقعي في الصف» اسحب التلميذ وصف موقعه بالبعد والاتجاه بالنسبة للباب أو السبورة.'],
      concl: ['الموقع: مكان وجود الجسم، يحدَّد بالبعد وبالاتجاه بالنسبة إلى جسم آخر يكون ثابتاً.', 'الحركة: تغير مستمر في موقع الجسم نسبة إلى جسم آخر يكون ثابتاً.', 'الحركة مفهوم نسبي يعتمد على موقع نقطة الإسناد: فأنت متحرك نسبة إلى نقطة إسناد ثابتة في حين أنك ساكن نسبة إلى نقطة إسناد أخرى.', 'الجسم الساكن: الذي لا يغير موقعه بالنسبة لنقطة ثابتة مع مرور الزمن، ويعدّ سطح الأرض نقطة إسناد ثابتة.'],
      laws: [],
      fact: ['أنت الآن «ساكن» بالنسبة لكرسيك، لكنك تدور مع الأرض حول محورها بانطلاق يقارب 1600 km/h عند خط الاستواء، وتدور حول الشمس بنحو 107000 km/h!', 'في الشلال (شكل 1) نعدّ سطح الأرض نقطة إسناد ثابتة لحركة الماء الساقط.'],
      controls: [SEL('sc', 'المشهد', [['fall', '🏞️ الشلال (شكل 1 — كالكتاب)'], ['bus', '🚌 حافلة المدرسة والموقف'], ['train', '🚆 قطاران متجاوران'], ['class', '🏫 موقعي في الصف']], 'fall', (v, S) => { setParam(S, 'ref', 'ground'); }),
        SEL('ref', 'نقطة الإسناد', [['ground', 'الأرض'], ['man', 'الرجل الواقف'], ['bus', 'الحافلة/القطار/قطرة الماء'], ['pass', 'الراكب'], ['car', 'السيارة/القطار الآخر/القارب']], 'ground'),
        R('v', 'انطلاق الحافلة/القطار الأحمر', 0, 12, 6, .5, 'm/s'), R('v2', 'انطلاق السيارة/القطار الأزرق', -8, 12, 3, .5, 'm/s'),
        SEL('cref', 'الموقع بالنسبة إلى (الصف)', [['door', 'الباب'], ['board', 'السبورة'], ['win', 'الشباك']], 'door'),
        TG('vel', 'أسهم السرعة النسبية', true, null, 'velocity'), TG('tags', 'بطاقات ساكن/متحرك', true, null, 'labels'), TG('grid', 'شبكة الأمتار', true, null, 'grid')],
      setup(S) { S.tt = 0; S.kx = 3; S.ky = 2; },
      update(S, dt) { S.tt += dt; },
      draw(ctx, w, h, S) {
        const p = S.p;
        if (p.sc === 'class') return this.drawClass(ctx, w, h, S);
        if (p.sc === 'fall') return this.drawFall(ctx, w, h, S);
        const objs = OBJS[p.sc](S), ref = objs.find(o => o.id === p.ref) || objs[0], t = S.tt, ppm = (w - 74) / 30, cam = wx(ref, t);
        const anchor = ref.id === 'ground' ? 15 : ref.id === 'man' ? 15 : 12;
        const SX = x => { let d = md(x - cam + anchor, LW); if (d > LW - 15) d -= LW; return 74 + d * ppm; };
        const gy = h * .7, lanes = [h * .45 + 74, gy - 4, gy + 60];
        H.sky(ctx, w, h, h * .45, { hills: false });
        // far hills move with parallax relative to ground
        K.raw(ctx, () => { ctx.fillStyle = '#bbf7d0'; ctx.beginPath(); ctx.moveTo(0, h * .45); for (let x = 0; x <= w; x += 16) { const wxx = (x - 74) / ppm + cam * .3; ctx.lineTo(x, h * .45 - 26 - 16 * Math.sin(wxx / 6) - 8 * Math.sin(wxx / 2.3)); } ctx.lineTo(w, h * .45); ctx.fill(); });
        K.raw(ctx, () => { ctx.fillStyle = '#d6d3d1'; ctx.fillRect(0, h * .45, w, gy - h * .45 - 30); ctx.strokeStyle = 'rgba(120,113,108,.35)'; ctx.lineWidth = 1; for (let m = 0; m < LW; m += 1) { const x = SX(m); ctx.beginPath(); ctx.moveTo(x, h * .45); ctx.lineTo(x, gy - 30); ctx.stroke(); } ctx.fillStyle = '#475569'; ctx.fillRect(0, gy - 30, w, 110); ctx.fillStyle = '#cbd5e1'; ctx.fillRect(0, gy + 24, w, 6);
          ctx.strokeStyle = '#fde047'; ctx.lineWidth = 4; ctx.setLineDash([26, 22]); ctx.lineDashOffset = cam * ppm; ctx.beginPath(); ctx.moveTo(0, gy + 27); ctx.lineTo(w, gy + 27); ctx.stroke(); ctx.setLineDash([]);
          if (p.sc === 'train') { ctx.fillStyle = '#78350f'; for (let k = 0; k < LW; k += 1.5) { [gy, gy + 60].forEach(yy => { const x = SX(k); ctx.fillRect(x - 3, yy - 4, 6, 10); }); } ctx.fillStyle = '#334155'; [gy, gy + 60].forEach(yy => { ctx.fillRect(0, yy - 2, w, 3); }); } });
        if (p.grid) K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.font = '700 10px ui-monospace'; ctx.textAlign = 'center'; ctx.direction = 'ltr'; for (let m = 0; m < LW; m += 2) { const x = SX(m); ctx.fillRect(x - .5, gy + 80, 1, m % 8 ? 6 : 12); } ctx.fillRect(84, gy + 98, 4 * ppm, 3); ctx.fillText('4 m', 84 + 2 * ppm, gy + 114); });
        // trees + bus stop (fixed to the ground)
        for (let m = 2; m < LW; m += 12) H.tree(ctx, SX(m), h * .45 + 6, .6);
        const ow = o => SX(wx(o, t));
        objs.forEach(o => {
          const x = ow(o), y = lanes[o.lane], isRef = o.id === p.ref;
          if (o.id === 'man') { if (p.sc === 'bus') K.raw(ctx, () => { ctx.fillStyle = '#0369a1'; ctx.fillRect(x + 26, y - 110, 6, 110); ctx.fillStyle = '#0284c7'; rr(ctx, x + 10, y - 120, 40, 22, 5); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '900 13px Tajawal'; ctx.textAlign = 'center'; ctx.fillText('🚏', x + 30, y - 104); }); person(ctx, x, y, .9, { shirt: '#f97316', wave: 1 }); }
          if (o.id === 'bus') K.raw(ctx, () => { const L = (p.sc === 'bus' ? 12 : 18) * ppm, H2 = p.sc === 'bus' ? 92 : 80, top = y - 30 - H2 - 10;
            ctx.fillStyle = p.sc === 'bus' ? '#facc15' : '#dc2626'; rr(ctx, x, top, L, H2, 14); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.stroke();
            ctx.fillStyle = '#e0f2fe'; const nw = p.sc === 'bus' ? 5 : 7; for (let k = 0; k < nw; k++) { rr(ctx, x + 12 + k * (L - 24) / nw, top + 12, (L - 24) / nw - 8, 32, 4); ctx.fill(); }
            if (p.sc === 'bus') { ctx.fillStyle = '#111827'; ctx.font = '900 14px Tajawal'; ctx.textAlign = 'center'; ctx.fillText('حافلة المدرسة', x + L / 2, top + 66); }
            [.18, .82].forEach(f => { const cx = x + L * f, cy = y - 30; ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(cx, cy, 14, 0, TAU); ctx.fill(); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2; const a = wx(o, t) / .45; ctx.beginPath(); ctx.moveTo(cx - Math.cos(a) * 9, cy - Math.sin(a) * 9); ctx.lineTo(cx + Math.cos(a) * 9, cy + Math.sin(a) * 9); ctx.stroke(); });
            // other passenger heads
            for (let k = 0; k < nw; k++) if (k !== 3) { ctx.fillStyle = '#f2c49b'; ctx.beginPath(); ctx.arc(x + 12 + (k + .5) * (L - 24) / nw - 4, top + 34, 7, 0, TAU); ctx.fill(); } });
          if (o.id === 'pass') K.raw(ctx, () => { const top = y - 30 - (p.sc === 'bus' ? 92 : 80) - 10; ctx.fillStyle = '#16a34a'; rr(ctx, x - 9, top + 34, 18, 12, 4); ctx.fill(); ctx.fillStyle = '#f2c49b'; ctx.beginPath(); ctx.arc(x, top + 27, 8, 0, TAU); ctx.fill(); ctx.fillStyle = '#3f2a14'; ctx.beginPath(); ctx.arc(x, top + 24, 8, Math.PI, TAU); ctx.fill(); });
          if (o.id === 'car') { if (p.sc === 'bus') H.car(ctx, x, y - 4, .9, { col: '#60a5fa', flip: o.v < 0 }); else K.raw(ctx, () => { const L = 16 * ppm, top = y - 92; ctx.fillStyle = '#2563eb'; rr(ctx, x, top, L, 74, 14); ctx.fill(); ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#e0f2fe'; for (let k = 0; k < 6; k++) { rr(ctx, x + 12 + k * (L - 24) / 6, top + 12, (L - 24) / 6 - 8, 26, 4); ctx.fill(); } ctx.fillStyle = '#111827'; [.2, .8].forEach(f => { ctx.beginPath(); ctx.arc(x + L * f, y - 14, 11, 0, TAU); ctx.fill(); }); }); }
        });
        // relative motion tags
        objs.forEach(o => { if (o.id === 'ground') return; const vr = o.v - ref.v, x = ow(o) + (o.id === 'bus' ? (p.sc === 'bus' ? 6 : 9) * ppm : o.id === 'car' ? (p.sc === 'bus' ? 0 : 8 * ppm) : 0), y = o.id === 'man' ? lanes[0] - 128 : o.id === 'pass' ? lanes[1] - (p.sc === 'bus' ? 150 : 138) : o.id === 'bus' ? lanes[1] - 47 : lanes[2] + 26;
          const still = Math.abs(vr) < .01, isRef = o.id === p.ref;
          if (p.tags) T(ctx, isRef ? '📍 نقطة الإسناد' : still ? o.n + ': ساكن' : o.n + ': متحرك', x, y, { s: 12.5, w: 900, c: '#fff', bg: isRef ? '#7c3aed' : still ? '#16a34a' : '#dc2626' });
          if (p.vel && !still) H.arrow(ctx, x - vr * 7, y + 22, x + vr * 7, y + 22, '#dc2626', 4, (vr > 0 ? '+' : '') + vr.toFixed(1) + ' m/s', { off: -2, s: 11 }); });
        const gref = ref.id === 'ground'; if (p.tags && !gref) T(ctx, 'الأرض والأشجار تتحرك ← بالنسبة لـ ' + ref.n, (64 + w) / 2, h * .45 - 80, { s: 12.5, w: 900, c: '#fff', bg: '#dc2626' });
        H.box(ctx, 64 + 150, 54, 260, 'نقطة الإسناد: ' + ref.n, [['انقر على أي جسم لتجعله نقطة الإسناد', { s: 12, c: '#475569' }]], { bd: '#7c3aed' });
        H.banner(ctx, w, 'من يتحرك؟ ومن ساكن؟ — حسب نقطة الإسناد', '#7c3aed');
      },

      /* waterfall (book fig 1): the ground is a fixed reference point for the falling water */
      fallObjs(S) { const t = S.tt, per = 2.3, tf = t % per, fallT = Math.sqrt(2 * 20 / 9.8), tt = Math.min(tf, fallT), under = tf > fallT;
        return { drop: { y: 4.9 * tt * tt, v: under ? 0 : 9.8 * tt, under }, boat: { x: S.p.v2 * .5 * t, v: S.p.v2 * .5 } }; },
      fallRel(S) { const F = this.fallObjs(S), V = { ground: [0, 0], man: [0, 0], bus: [0, F.drop.v], pass: [0, F.drop.v], car: [F.boat.v, 0] }, r = V[S.p.ref] || [0, 0];
        return { F, V, r, N: { ground: 'الأرض (الصخور)', man: 'رجل على الضفة', bus: 'قطرة الماء الساقطة', pass: 'قطرة الماء الساقطة', car: 'القارب' } }; },
      drawFall(ctx, w, h, S) {
        const p = S.p, R = this.fallRel(S), F = R.F, ref = p.ref === 'pass' ? 'bus' : p.ref, x0 = 74, xc = x0 + (w - x0) * .5, yl = 112, yp = h * .7, ppm = (yp - yl) / 20;
        const span = w - x0, bx0 = x0 + span * .7, bxw = span * .62, boatX = x0 + md(F.boat.x * 9 + (bx0 - x0), span + 120) - 60;
        const dropY = yl + F.drop.y * ppm, anchorY = yl + (yp - yl) * .3, anchorX = x0 + span * .5;
        const oy = ref === 'bus' && !F.drop.under ? anchorY - dropY : 0, ox = ref === 'car' ? anchorX - boatX : 0;
        const t = S.tt;
        G.bg(ctx, w, h, false);
        K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#bae6fd'); g.addColorStop(1, '#e0f2fe'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); });
        K.raw(ctx, () => { ctx.save(); ctx.translate(ox, oy);
          const ext = 2000;
          // cliffs (rock layers)
          const rock = (xa, xb, top, rough) => { const g = ctx.createLinearGradient(xa, 0, xb, 0); g.addColorStop(0, '#a16207'); g.addColorStop(.5, '#c9a36b'); g.addColorStop(1, '#8b5e34'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(xa, yp + 40); ctx.lineTo(xa, top); for (let x = xa; x <= xb; x += 14) ctx.lineTo(x, top - 6 * Math.sin(x * rough) - 4 * Math.sin(x * .13)); ctx.lineTo(xb, yp + 40); ctx.closePath(); ctx.fill();
            ctx.strokeStyle = 'rgba(92,52,20,.35)'; ctx.lineWidth = 2; for (let y = top + 22; y < yp; y += 26) { ctx.beginPath(); ctx.moveTo(xa, y); for (let x = xa; x <= xb; x += 20) ctx.lineTo(x, y + 4 * Math.sin(x * .05 + y)); ctx.stroke(); } };
          rock(x0 - ext, xc - 40, yl - 6, .07); rock(xc + 40, w + ext, yl - 30, .05);
          // greenery on top
          ctx.fillStyle = '#4d7c0f'; for (let x = x0 - 200; x < xc - 50; x += 26) { ctx.beginPath(); ctx.arc(x, yl - 14 - 6 * Math.sin(x), 16, 0, TAU); ctx.fill(); } for (let x = xc + 50; x < w + 200; x += 26) { ctx.beginPath(); ctx.arc(x, yl - 38 - 6 * Math.sin(x), 16, 0, TAU); ctx.fill(); }
          ctx.fillStyle = '#65a30d'; for (let x = x0 + 10; x < xc - 80; x += 34) { ctx.beginPath(); ctx.arc(x, yp - 30, 22, Math.PI, TAU); ctx.fill(); }
          // river on top feeding the fall
          ctx.fillStyle = '#60a5fa'; ctx.fillRect(xc - 40, yl - 34, 80, 30);
          // waterfall column
          const wg = ctx.createLinearGradient(xc - 40, 0, xc + 40, 0); wg.addColorStop(0, 'rgba(219,234,254,.85)'); wg.addColorStop(.5, '#ffffff'); wg.addColorStop(1, 'rgba(191,219,254,.9)'); ctx.fillStyle = wg; ctx.beginPath(); ctx.moveTo(xc - 40, yl - 6); ctx.lineTo(xc + 40, yl - 6); ctx.lineTo(xc + 52, yp); ctx.lineTo(xc - 52, yp); ctx.closePath(); ctx.fill();
          ctx.strokeStyle = 'rgba(96,165,250,.55)'; ctx.lineWidth = 2.5; for (let k = 0; k < 9; k++) { const xx = xc - 34 + k * 8.5, ph = (t * 1.6 + k * .37) % 1; for (let j = 0; j < 4; j++) { const f = (ph + j / 4) % 1, ya = yl + f * f * (yp - yl), yb = ya + 18 + 40 * f; ctx.beginPath(); ctx.moveTo(xx + (xx - xc) * .25 * f, ya); ctx.lineTo(xx + (xx - xc) * .25 * f, Math.min(yb, yp)); ctx.stroke(); } }
          // pool
          const pg = ctx.createLinearGradient(0, yp, 0, h); pg.addColorStop(0, '#2dd4bf'); pg.addColorStop(1, '#0f766e'); ctx.fillStyle = pg; ctx.fillRect(x0 - ext, yp, w + 2 * ext, h - yp + ext);
          ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 2; for (let k = 0; k < 40; k++) { const xx = x0 - 400 + k * 60 + 10 * Math.sin(t + k), yy = yp + 18 + (k % 4) * 22; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.quadraticCurveTo(xx + 12, yy - 5, xx + 24, yy); ctx.stroke(); }
          ctx.fillStyle = 'rgba(255,255,255,.75)'; for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.ellipse(xc - 60 + k * 20, yp + 4, 18 + 4 * Math.sin(t * 3 + k), 9, 0, 0, TAU); ctx.fill(); }
          // bank on the right where the man stands
          ctx.fillStyle = '#d6d3d1'; ctx.fillRect(xc + 120, yp - 14, w + ext, 16); ctx.fillStyle = '#78716c'; for (let x = xc + 120; x < w + 40; x += 22) ctx.fillRect(x, yp - 26, 3, 14); ctx.fillRect(xc + 120, yp - 27, w, 3);
          ctx.restore(); });
        // objects in screen coords (world + frame offset)
        const manX = xc + 170 + ox, manY = yp - 14 + oy; person(ctx, manX, manY, .75, { shirt: '#f97316', wave: 1 });
        const by = yp + 26 + oy, bX = boatX + ox;
        K.raw(ctx, () => { ctx.save(); ctx.translate(bX, by); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(0, 10, 62, 8, 0, 0, TAU); ctx.fill(); const g = ctx.createLinearGradient(0, -14, 0, 14); g.addColorStop(0, '#e5e7eb'); g.addColorStop(1, '#6b7280'); ctx.fillStyle = g; rr(ctx, -58, -12, 116, 24, 12); ctx.fill(); ctx.strokeStyle = '#374151'; ctx.lineWidth = 1.5; ctx.stroke();
          [-30, 0, 28].forEach((dx, k) => { ctx.fillStyle = ['#ef4444', '#2563eb', '#f59e0b'][k]; rr(ctx, dx - 7, -30, 14, 20, 5); ctx.fill(); ctx.fillStyle = '#f2c49b'; ctx.beginPath(); ctx.arc(dx, -36, 7, 0, TAU); ctx.fill(); ctx.fillStyle = '#3f2a14'; ctx.beginPath(); ctx.arc(dx, -38, 7, Math.PI, TAU); ctx.fill(); }); ctx.restore(); });
        const dX = xc + ox, dY = (F.drop.under ? yp : dropY) + oy;
        if (!F.drop.under) K.raw(ctx, () => { ctx.save(); ctx.shadowColor = '#1d4ed8'; ctx.shadowBlur = 12; ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.moveTo(dX, dY - 16); ctx.quadraticCurveTo(dX + 11, dY - 2, dX, dY + 8); ctx.quadraticCurveTo(dX - 11, dY - 2, dX, dY - 16); ctx.fill(); ctx.restore(); ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.beginPath(); ctx.arc(dX - 3, dY - 2, 2.5, 0, TAU); ctx.fill(); });
        // tags + relative velocity arrows
        const P = { man: [manX, manY - 112], car: [bX, by - 60], bus: [dX + 120, dY] };
        if (p.tags) { ['man', 'car', 'bus'].forEach(k => { if (k === 'bus' && F.drop.under) return; const vr = [R.V[k][0] - R.r[0], R.V[k][1] - R.r[1]], sp = Math.hypot(vr[0], vr[1]), isRef = k === ref, still = sp < .01;
            const [x, y] = P[k]; T(ctx, isRef ? '📍 نقطة الإسناد' : R.N[k] + (still ? ': ساكن' : ': متحرك'), x, y, { s: 12.5, w: 900, c: '#fff', bg: isRef ? '#7c3aed' : still ? '#16a34a' : '#dc2626' });
            if (p.vel && !still) { const k2 = 5, L = Math.min(90, sp * k2), ux = vr[0] / sp, uy = vr[1] / sp; const ax = k === 'bus' ? dX - 34 : x, ay = k === 'bus' ? dY - L / 2 * uy : y + 30; H.arrow(ctx, ax - ux * L / 2, ay - (k === 'bus' ? 0 : uy * L / 2), ax + ux * L / 2, ay + (k === 'bus' ? L * uy : uy * L / 2), '#dc2626', 4, sp.toFixed(1) + ' m/s', { off: -2, s: 11 }); } });
          if (ref !== 'ground' && ref !== 'man') T(ctx, ref === 'bus' ? 'الصخور والأرض تبدو صاعدة إلى الأعلى ↑ بالنسبة للقطرة!' : 'الصخور والشلال تبدو متحركة بعكس اتجاه القارب!', (64 + w) / 2, 84, { s: 12.5, w: 900, c: '#fff', bg: '#dc2626' });
          else T(ctx, 'سطح الأرض نقطة إسناد ثابتة: الماء الساقط متحرك والصخور ساكنة', (64 + w) / 2, 84, { s: 12.5, w: 900, c: '#fff', bg: '#16a34a' }); }
        H.box(ctx, 64 + 150, 108, 260, 'نقطة الإسناد: ' + R.N[ref], [['انقر على الصخور أو الرجل أو القطرة أو القارب', { s: 11.5, c: '#475569' }]], { bd: '#7c3aed' });
        H.banner(ctx, w, 'شكل 1: الشلال — من يتحرك؟ ومن ساكن؟', '#7c3aed');
        this._fg = { P, dX, dY, bX, by, manX, manY, yp, under: F.drop.under, xc };
      },
      drawClass(ctx, w, h, S) {
        const p = S.p, x0 = 110, y0 = 110, cw = Math.min(w - 170, 560), ch = Math.min(h - 260, 470), ppm = Math.min(cw / 8, ch / 6), Wm = 8, Hm = 6;
        K.bg(ctx, w, h, { bench: false, benchY: h + 5 });
        H.banner(ctx, w, 'اسحب التلميذ وصف موقعه: البعد + الاتجاه', '#7c3aed');
        const X = m => x0 + m * ppm, Y = m => y0 + m * ppm;
        K.raw(ctx, () => { ctx.fillStyle = '#fef9c3'; ctx.fillRect(X(0), Y(0), Wm * ppm, Hm * ppm); ctx.strokeStyle = '#78350f'; ctx.lineWidth = 8; ctx.strokeRect(X(0), Y(0), Wm * ppm, Hm * ppm);
          if (p.grid) { ctx.strokeStyle = 'rgba(120,53,15,.15)'; ctx.lineWidth = 1; for (let m = 1; m < Wm; m++) { ctx.beginPath(); ctx.moveTo(X(m), Y(0)); ctx.lineTo(X(m), Y(Hm)); ctx.stroke(); } for (let m = 1; m < Hm; m++) { ctx.beginPath(); ctx.moveTo(X(0), Y(m)); ctx.lineTo(X(Wm), Y(m)); ctx.stroke(); } }
          ctx.fillStyle = '#14532d'; ctx.fillRect(X(2), Y(0) - 4, 4 * ppm, 12); // board (top wall)
          ctx.fillStyle = '#fef9c3'; ctx.fillRect(X(Wm) - 6, Y(4), 12, ppm * 1.2); ctx.fillStyle = '#92400e'; ctx.fillRect(X(Wm) - 4, Y(4), 8, ppm * 1.2); // door (right wall)
          ctx.fillStyle = '#7dd3fc'; ctx.fillRect(X(0) - 6, Y(1.5), 12, ppm * 2.5); // window (left wall)
          ctx.fillStyle = '#a16207'; for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { rr(ctx, X(1.3 + c * 2.2), Y(2.2 + r * 1.3), ppm * 1.2, ppm * .55, 4); ctx.fill(); } });
        T(ctx, 'السبورة', X(4), Y(0) - 18, { s: 13, w: 900, c: '#fff', bg: '#14532d' }); T(ctx, 'الباب', X(Wm) + 30, Y(4.6), { s: 13, w: 900, c: '#fff', bg: '#92400e' }); T(ctx, 'الشباك', X(0) - 28, Y(2.75), { s: 13, w: 900, c: '#fff', bg: '#0284c7' });
        const kx = S.kx, ky = S.ky, R0 = { door: [Wm, 4.6], board: [4, 0], win: [0, 2.75] }[p.cref];
        // measuring lines from reference to kid
        K.raw(ctx, () => { ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2.5; ctx.setLineDash([7, 5]); ctx.beginPath(); ctx.moveTo(X(R0[0]), Y(R0[1])); ctx.lineTo(X(kx), Y(R0[1])); ctx.lineTo(X(kx), Y(ky)); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#7c3aed'; ctx.beginPath(); ctx.arc(X(R0[0]), Y(R0[1]), 7, 0, TAU); ctx.fill(); });
        const dx = kx - R0[0], dy = ky - R0[1];
        const hor = Math.abs(dx) < .01 ? '' : fmt(Math.abs(dx), 2) + ' m ' + (dx > 0 ? 'إلى اليمين' : 'إلى اليسار'), ver = Math.abs(dy) < .01 ? '' : fmt(Math.abs(dy), 2) + ' m ' + (dy > 0 ? 'نحو مؤخرة الصف' : 'نحو السبورة');
        if (hor) T(ctx, hor, (X(R0[0]) + X(kx)) / 2, Y(R0[1]) + (p.cref === 'board' ? 16 : -16), { s: 12.5, w: 900, c: '#fff', bg: '#7c3aed' });
        if (ver) T(ctx, ver, X(kx) + 14, (Y(R0[1]) + Y(ky)) / 2, { s: 12.5, w: 900, c: '#fff', bg: '#7c3aed', a: 'left' });
        // kid (top view)
        K.raw(ctx, () => { const cx = X(kx), cy = Y(ky); ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.ellipse(cx, cy, 20, 14, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#3f2a14'; ctx.beginPath(); ctx.arc(cx, cy, 11, 0, TAU); ctx.fill(); });
        T(ctx, 'أنا', X(kx), Y(ky) + 28, { s: 12, w: 900, c: '#fff', bg: '#16a34a' });
        const nm = { door: 'الباب', board: 'السبورة', win: 'الشباك' }[p.cref];
        H.box(ctx, (64 + w) / 2, h - 190, Math.min(560, w - 120), 'موقعي بالنسبة إلى ' + nm, [[[hor, ver].filter(Boolean).join(' و ') || 'أنا عند ' + nm + ' تماماً', { s: 15, w: 900, c: '#7c3aed' }], ['الموقع = بُعد + اتجاه، بالنسبة إلى جسم ثابت (نقطة إسناد)', { s: 12, c: '#475569' }]], { bd: '#7c3aed' });
        this._cg = { X, Y, ppm, Wm, Hm, x0, y0 };
      },
      drags(S) {
        const p = S.p, w = S.W, h = S.H;
        if (p.sc === 'fall') { const g = this._fg; if (!g) return []; const L = [{ id: 'pick_ground', x: g.xc - 160, y: g.yp - 120, w: 150, h: 120, hint: false, tip: 'انقر: اجعل الأرض (الصخور) نقطة الإسناد', click: S => setParam(S, 'ref', 'ground') }, { id: 'pick_man', x: g.manX, y: g.manY - 45, w: 44, h: 90, hint: false, tip: 'انقر: اجعل الرجل نقطة الإسناد', click: S => setParam(S, 'ref', 'man') }, { id: 'pick_car', x: g.bX, y: g.by - 10, w: 120, h: 56, hint: false, tip: 'انقر: اجعل القارب نقطة الإسناد', click: S => setParam(S, 'ref', 'car') }];
          if (!g.under) L.push({ id: 'pick_bus', x: g.dX, y: g.dY, w: 70, h: 70, hint: true, idle: 'انقر على القطرة لتراقب من مكانها 👀', tip: 'انقر: اجعل قطرة الماء نقطة الإسناد', click: S => setParam(S, 'ref', 'bus') }); return L.filter(o => o.x > 70 && o.x < S.W - 10); }
        if (p.sc === 'class') { const g = this._cg; if (!g) return []; return [{ id: 'kid', x: g.X(S.kx), y: g.Y(S.ky), r: 26, axis: 'xy', keep: true, idle: 'اسحب التلميذ ✋', tip: 'اسحب التلميذ إلى مكان آخر', drag: (S, d) => { S.kx = clamp(Math.round((d.x - g.x0) / g.ppm * 2) / 2, .5, g.Wm - .5); S.ky = clamp(Math.round((d.y - g.y0) / g.ppm * 2) / 2, .5, g.Hm - .5); } },
          ...['door', 'board', 'win'].map((k, i) => { const P = { door: [g.Wm, 4.6], board: [4, 0], win: [0, 2.75] }[k]; return { id: 'ref_' + k, x: g.X(P[0]), y: g.Y(P[1]), r: 24, hint: false, tip: 'انقر لجعلها نقطة الإسناد', click: S => setParam(S, 'cref', k) }; })]; }
        const objs = OBJS[p.sc](S), ref = objs.find(o => o.id === p.ref) || objs[0], t = S.tt, ppm = (w - 74) / 30, cam = wx(ref, t), anchor = ref.id === 'ground' || ref.id === 'man' ? 15 : 12;
        const SX = x => { let d = md(x - cam + anchor, LW); if (d > LW - 15) d -= LW; return 74 + d * ppm; };
        const gy = h * .7, lanes = [h * .45 + 74, gy - 4, gy + 60], L = [];
        L.push({ id: 'pick_ground', x: (64 + w) / 2, y: gy + 92, w: w - 140, h: 30, hint: false, tip: 'انقر: اجعل الأرض نقطة الإسناد', click: S => setParam(S, 'ref', 'ground') });
        objs.forEach(o => { if (o.id === 'ground') return; const x = SX(wx(o, t)); let hx = x, hy, hw = 60, hh = 60;
          if (o.id === 'man') { hy = lanes[0] - 45; hw = 40; hh = 90; }
          else if (o.id === 'bus') { const Lb = (p.sc === 'bus' ? 12 : 18) * ppm; hx = x + Lb * .7; hy = lanes[1] - 80; hw = Lb * .5; hh = 80; }
          else if (o.id === 'pass') { hy = lanes[1] - (p.sc === 'bus' ? 105 : 92); hw = 34; hh = 34; }
          else { hx = p.sc === 'bus' ? x : x + 8 * ppm; hy = p.sc === 'bus' ? lanes[2] - 30 : lanes[2] - 50; hw = p.sc === 'bus' ? 110 : 16 * ppm; hh = 60; }
          if (hx < 70 || hx > w - 10) return;
          L.push({ id: 'pick_' + o.id, x: hx, y: hy, w: hw, h: hh, hint: o.id === 'pass', idle: o.id === 'pass' ? 'انقر على التلميذ لتراقب من مكانه 👀' : undefined, tip: 'انقر: اجعل «' + o.n + '» نقطة الإسناد', click: S => setParam(S, 'ref', o.id) }); });
        return L;
      },
      readings(S) { const p = S.p; if (p.sc === 'fall') { const R = this.fallRel(S), ref = p.ref === 'pass' ? 'bus' : p.ref; return [rd('نقطة الإسناد', R.N[ref])].concat(['ground', 'man', 'bus', 'car'].filter(k => k !== ref).map(k => { const sp = Math.hypot(R.V[k][0] - R.r[0], R.V[k][1] - R.r[1]); return rd(R.N[k], sp < .01 ? 'ساكن' : 'متحرك ' + sp.toFixed(1) + ' m/s'); })); }
        if (p.sc === 'class') return [rd('نقطة الإسناد', { door: 'الباب', board: 'السبورة', win: 'الشباك' }[p.cref]), rd('موقعي (أفقياً، عمودياً)', '(' + S.kx + ' m , ' + S.ky + ' m)')]; const objs = OBJS[p.sc](S), ref = objs.find(o => o.id === p.ref) || objs[0]; return [rd('نقطة الإسناد', ref.n)].concat(objs.filter(o => o.id !== 'ground' && o.id !== p.ref).map(o => rd(o.n, Math.abs(o.v - ref.v) < .01 ? 'ساكن' : 'متحرك ' + (o.v - ref.v).toFixed(1) + ' m/s'))); },
      explain(S) { const p = S.p; if (p.sc === 'fall') { const r = p.ref; if (r === 'ground' || r === 'man') return 'في <b>شكل 1</b> نعدّ <b>سطح الأرض</b> نقطة إسناد ثابتة: الماء الساقط <b>متحرك</b> لأن موقعه يتغير بالنسبة للصخور، والصخور والرجل على الضفة <b>ساكنون</b>.'; return r === 'car' ? 'نقطة الإسناد الآن <b>القارب</b>: الركاب ساكنون بالنسبة له، أما الصخور والشلال والرجل فتبدو <b>متحركة</b> بعكس اتجاه القارب. الحركة والسكون <b>مفهومان نسبيان</b>.' : 'تخيّل أنك <b>قطرة الماء</b>: أنت ساكنة بالنسبة لنفسك، والصخور والرجل يبدون <b>صاعدين إلى الأعلى</b>! لذلك نقول: الحركة <b>نسبية</b> تعتمد على نقطة الإسناد، ونختار عادة سطح الأرض نقطة إسناد ثابتة.'; }
        if (p.sc === 'class') return 'لتحديد <b>موقع</b> جسم نذكر <b>البعد</b> و<b>الاتجاه</b> بالنسبة إلى جسم ثابت، مثل: «أجلس على بعد مترين يمين الباب».'; const objs = OBJS[p.sc](S), ref = objs.find(o => o.id === p.ref) || objs[0];
        if (ref.id === 'ground' || ref.id === 'man') return 'نقطة الإسناد ثابتة على <b>الأرض</b>: الحافلة والتلميذ الجالس فيها <b>متحركان</b>، والرجل في الموقف <b>ساكن</b>.';
        return `نقطة الإسناد هي <b>${ref.n}</b>: ${ref.id === 'pass' || ref.id === 'bus' ? 'التلميذ <b>ساكن</b> بالنسبة للحافلة، أما الرجل في الموقف فيبدو <b>متحركاً إلى الخلف</b>!' : 'ما يبدو ساكناً أو متحركاً تغير بتغير نقطة الإسناد.'} لذلك نقول: <b>الحركة والسكون مفهومان نسبيان</b>.`; },
      quiz: [
        { q: 'تغير مستمر في موقع الجسم نسبة إلى جسم آخر يكون ثابتاً هو:', o: ['الحركة', 'الموقع', 'الانطلاق'], a: 0, why: 'تعريف الحركة (مراجعة الفصل س1-2).' },
        { q: 'تلميذ جالس في حافلة متحركة. يكون ساكناً بالنسبة إلى:', o: ['الأشجار على الطريق', 'مقعد الحافلة', 'رجل واقف في الموقف'], a: 1, why: 'لا يتغير موقعه بالنسبة للمقعد، فهو ساكن بالنسبة له.' },
        { q: 'الجسم الذي لا يغير موقعه بالنسبة إلى نقطة الإسناد الثابتة مع مرور الزمن هو:', o: ['الجسم الساكن', 'الجسم المتحرك', 'مسار الحركة'], a: 0, why: 'تعريف الجسم الساكن (س1-4).' }
      ]
    });
  })();

  /* =========================================================================================
     7) مسار الحركة (ص 12، شكل 2 و 3) — نرسم مسار الجسم بنقاط متعددة
     ========================================================================================= */
  (() => {
    const g0 = 9.8;
    const SC = { drop: '🏐 إسقاط كرة من شرفة (شكل 2)', bask: '🏀 رمية كرة السلة', wheel: '🎡 مقصورة دولاب الهواء', car: '🚗 سيارة على طريق متعرّج', free: '✍️ ارسم مسارك بيدك' };
    const reset = S => { S.pts = []; S.mv = false; S.pt = 0; const sc = S.p.sc; S.k = sc === 'drop' ? { x: 1.6, y: .9, vx: 0, vy: 0 } : sc === 'bask' ? { x: 1, y: 5.3, vx: 0, vy: 0 } : { x: 5, y: 3, vx: 0, vy: 0 }; S.lastDot = -1; S.kind = ''; };
    const classify = P => { if (P.length < 4) return ''; let L = 0; for (let i = 1; i < P.length; i++) L += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); const c = Math.hypot(P[P.length - 1][0] - P[0][0], P[P.length - 1][1] - P[0][1]); if (L < 30) return ''; if (c < .12 * L && L > 200) return 'circ'; return c / L > .96 ? 'line' : 'curve'; };
    const KN = { line: ['مسار مستقيم', '#2563eb'], curve: ['مسار منحنٍ', '#ea580c'], circ: ['مسار دائري (مغلق)', '#7c3aed'] };
    P8({
      id: 'g8_path', ch: 21, sec: 'الدرس الثاني: الحركة وأنواعها', page: 12, fig: 'شكل 2 و 3', kind: 'نشاط', title: 'مسار الحركة: صِل النقاط التي يمر بها الجسم',
      desc: 'نطلق الجسم (كرة تسقط، رمية سلة، مقصورة دولاب الهواء، سيارة على طريق متعرج) فتظهر نقاط مواقعه كل فترة زمنية متساوية، وبوصل النقاط نحصل على مسار الحركة: مستقيم أو منحنٍ أو دائري. ويمكنك رسم مسارك بيدك.',
      tags: 'مسار الحركة مستقيم منحني دائري نقاط',
      tools: ['كرة', 'كرة سلة', 'دولاب الهواء', 'سيارة لعبة'],
      steps: ['اختر المثال واضغط «ابدأ» (أو اسحب كرة السلة للخلف واتركها لترميها).', 'لاحظ النقاط التي تتركها الكرة في الهواء كل فترة زمنية.', 'شغّل «وصل النقاط» لترى مسار الحركة.', 'حدد شكل المسار: مستقيم، منحنٍ، دائري.', 'في «ارسم مسارك بيدك» اسحب الكرة على الشاشة كما تشاء وسيخبرك المختبر بنوع مسارك.'],
      concl: ['مسار الحركة: الخط الواصل بين مختلف المواقع التي يمر خلالها الجسم المتحرك في أثناء حركته.', 'يمكن أن يأخذ المسار أشكالاً متنوعة: مستقيم، منحنٍ، دائري (شكل 3).', 'الكرة الساقطة إلى الأسفل مسارها مستقيم، وكرة السلة المرمية مسارها منحنٍ، ومقصورة دولاب الهواء مسارها دائري.'],
      laws: [],
      fact: ['في الأفلام الرياضية يستعمل المصورون «التصوير الومضي» فتظهر الكرة في صورة واحدة عدة مرات، فنرى مسارها كاملاً.', 'مسار القمر الصناعي حول الأرض مغلق (دائري تقريباً) ويتكرر كل فترة زمنية.'],
      controls: [SEL('sc', 'المثال', Object.keys(SC).map(k => [k, SC[k]]), 'drop', (v, S) => reset(S)),
        R('dt', 'الزمن بين نقطتين', .05, .3, .1, .05, 's'),
        TG('dots', 'نقاط المواقع', true, null, 'dot'), TG('line', 'وصل النقاط (المسار)', true, null, 'vector'), TG('vel', 'سهم اتجاه الحركة', true, null, 'velocity'),
        BT('', [{ t: 'ابدأ ▶', on: S => start(S) }, { t: 'امسح', on: S => reset(S) }])],
      setup(S) { reset(S); },
      update(S, dt) {
        if (!S.mv) return; const p = S.p, k = S.k, w = S.W, h = S.H; S.pt += dt;
        if (p.sc === 'drop') { k.vy += g0 * dt; k.y += k.vy * dt; if (k.y >= 6.6) { k.y = 6.6; S.mv = false; } }
        else if (p.sc === 'bask') { k.vy += g0 * dt; k.x += k.vx * dt; k.y += k.vy * dt; if (k.y > 6.8 || k.x > 11) S.mv = false; }
        else if (p.sc === 'wheel') { if (S.pt > 2 * Math.PI / .5) S.mv = false; }
        else if (p.sc === 'car') { if (S.pt > 9) S.mv = false; }
        if (Math.floor(S.pt / p.dt) > S.lastDot) { S.lastDot = Math.floor(S.pt / p.dt); S.pts.push(this.pos(S)); }
        if (!S.mv) { S.pts.push(this.pos(S)); S.kind = classify(S.pts.map(q => this.px(S, q))); }
      },
      /* world positions → px */
      geo(S) { const w = S.W, h = S.H; return { w, h, ppm: Math.min((w - 140) / 12, (h - 220) / 7.5), ox: 120, oy: 110 }; },
      pos(S) { const p = S.p, k = S.k; if (p.sc === 'wheel') { const a = -Math.PI / 2 + S.pt * .5; return [6 + 3 * Math.cos(a), 3.6 + 3 * Math.sin(a)]; } if (p.sc === 'car') { const x = 1 + S.pt * 1.15; return [x, 4 + .9 * Math.sin(x * 1.1)]; } if (p.sc === 'free') return [k.x, k.y]; return [k.x, k.y]; },
      px(S, q) { const g = this.geo(S); return [g.ox + q[0] * g.ppm, g.oy + q[1] * g.ppm]; },
      draw(ctx, w, h, S) {
        const p = S.p, g = this.geo(S), P = q => this.px(S, q), sc = p.sc;
        H.sky(ctx, w, h, g.oy + 7 * g.ppm, { hills: sc !== 'free' });
        H.banner(ctx, w, sc === 'free' ? 'اسحب الكرة وارسم أي مسار تريد' : 'ما شكل المسار الذي ترسمه نقاط مواقع الجسم؟', '#ea580c');
        if (sc === 'drop') { K.raw(ctx, () => { const [bx, by] = P([1.6, 1.25]); ctx.fillStyle = '#e2e8f0'; ctx.fillRect(g.ox - 60, by, bx - g.ox + 64, 12); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx + 4, by + 12); ctx.lineTo(bx + 4, g.oy + 7 * g.ppm); ctx.stroke(); }); person(ctx, P([.2, 0])[0], P([0, 1.25])[1], 1.05, { shirt: '#22c55e', hair: '#78350f' }); }
        if (sc === 'bask') { K.raw(ctx, () => { const [hx, hy] = P([10.4, 3.6]); ctx.fillStyle = '#64748b'; ctx.fillRect(hx + 34, hy - 70, 8, g.oy + 7 * g.ppm - hy + 70); ctx.fillStyle = '#fff'; ctx.fillRect(hx + 22, hy - 70, 12, 70); ctx.strokeStyle = '#ea580c'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(hx - 22, hy); ctx.lineTo(hx + 22, hy); ctx.stroke(); ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5; for (let k = -18; k <= 18; k += 9) { ctx.beginPath(); ctx.moveTo(hx + k, hy); ctx.lineTo(hx + k * .5, hy + 30); ctx.stroke(); } }); H.kid(ctx, P([.4, 0])[0], g.oy + 7 * g.ppm, 1.1, { shirt: '#7c3aed', arm: 2.6 }); }
        if (sc === 'wheel') K.raw(ctx, () => { const [cx, cy] = P([6, 3.6]), R = 3 * g.ppm; ctx.strokeStyle = '#475569'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx - R * .6, g.oy + 7 * g.ppm); ctx.moveTo(cx, cy); ctx.lineTo(cx + R * .6, g.oy + 7 * g.ppm); ctx.stroke(); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke(); ctx.lineWidth = 1.5; for (let k = 0; k < 8; k++) { const a = k * TAU / 8 + S.pt * .5; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.stroke(); if (k) { ctx.fillStyle = ['#ef4444', '#3b82f6', '#22c55e', '#a855f7'][k % 4]; rr(ctx, cx + Math.cos(a) * R - 11, cy + Math.sin(a) * R, 22, 18, 5); ctx.fill(); } } });
        if (sc === 'car') K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); for (let x = 0; x <= 11.6; x += .1) { const q = P([x, 4 + .9 * Math.sin(x * 1.1)]); x ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); } ctx.stroke(); ctx.strokeStyle = '#fde047'; ctx.lineWidth = 2; ctx.setLineDash([12, 10]); ctx.stroke(); ctx.setLineDash([]); ctx.lineCap = 'butt'; });
        // dots + path
        const pts = S.pts.map(P);
        if (p.line && pts.length > 1) K.raw(ctx, () => { ctx.strokeStyle = S.kind ? KN[S.kind][1] : '#334155'; ctx.lineWidth = 3; ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); });
        if (p.dots) K.raw(ctx, () => { pts.forEach(q => { ctx.fillStyle = '#1d4ed8'; ctx.beginPath(); ctx.arc(q[0], q[1], 5, 0, TAU); ctx.fill(); }); });
        // the moving body
        const cur = P(this.pos(S));
        if (sc === 'drop' || sc === 'free') H.ballKind(ctx, cur[0], cur[1], 14, sc === 'drop' ? 'm' : 'ball');
        else if (sc === 'bask') H.ballKind(ctx, cur[0], cur[1], 14, 'bask', S.pt * 6);
        else if (sc === 'wheel') K.raw(ctx, () => { ctx.fillStyle = '#dc2626'; rr(ctx, cur[0] - 15, cur[1], 30, 24, 6); ctx.fill(); ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(cur[0], cur[1] + 8, 5, 0, TAU); ctx.fill(); });
        else { const x = 1 + S.pt * 1.15, sl = Math.atan(.9 * 1.1 * Math.cos(x * 1.1)); K.raw(ctx, () => { ctx.save(); ctx.translate(cur[0], cur[1] + 4); ctx.rotate(sl); H.car(ctx, 0, 0, .42, { driver: false, col: '#ef4444' }); ctx.restore(); }); }
        if (sc === 'bask' && !S.mv && !S.pts.length) { const a = S.aim || [4.85, -10.1]; for (let i = 1; i < 6; i++) { const tt = i * .08, q = P([1 + a[0] * tt, 5.3 + a[1] * tt + g0 * tt * tt / 2]); K.raw(ctx, () => { ctx.fillStyle = 'rgba(234,88,12,.5)'; ctx.beginPath(); ctx.arc(q[0], q[1], 3, 0, TAU); ctx.fill(); }); } }
        if (p.vel && pts.length > 1 && S.mv) { const a = pts[pts.length - 1], dx = cur[0] - a[0], dy = cur[1] - a[1], L = Math.hypot(dx, dy); if (L > .5) H.arrow(ctx, cur[0], cur[1], cur[0] + dx / L * 50, cur[1] + dy / L * 50, '#16a34a', 4); }
        // result
        if (S.kind) { const [n, c] = KN[S.kind]; T(ctx, 'شكل المسار: ' + n, (64 + w) / 2, 62, { s: 16, w: 900, c: '#fff', bg: c }); if (!S._ch) { S._ch = 1; K.cheer(S, (64 + w) / 2, 80); } } else S._ch = 0;
        // legend shapes like fig 3
        K.raw(ctx, () => { const y = h - 64, x = 96; ctx.lineWidth = 2.5; ctx.strokeStyle = '#2563eb'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 60, y); ctx.stroke(); ctx.strokeStyle = '#ea580c'; ctx.beginPath(); for (let k = 0; k <= 60; k += 3) ctx.lineTo(x + 90 + k, y + 8 * Math.sin(k / 9)); ctx.stroke(); ctx.strokeStyle = '#7c3aed'; ctx.beginPath(); ctx.arc(x + 210, y, 13, 0, TAU); ctx.stroke(); });
        T(ctx, 'مستقيم', 126, h - 44, { s: 11, w: 900, c: '#fff', bg: '#2563eb' }); T(ctx, 'منحنٍ', 216, h - 44, { s: 11, w: 900, c: '#fff', bg: '#ea580c' }); T(ctx, 'دائري', 306, h - 40, { s: 11, w: 900, c: '#fff', bg: '#7c3aed' });
        K.party(ctx, S);
      },
      drags(S) {
        const p = S.p, g = this.geo(S), cur = this.px(S, this.pos(S));
        if (p.sc === 'free') return [{ id: 'pen', x: cur[0], y: cur[1], r: 26, axis: 'xy', keep: true, idle: 'اسحب الكرة وارسم مساراً ✋', tip: 'اسحب الكرة لترسم مسارها',
          down: S => { S.pts = []; S.kind = ''; S._lp = null; }, drag: (S, d) => { const k = S.k; k.x = clamp((d.x - g.ox) / g.ppm, -.5, 12); k.y = clamp((d.y - g.oy) / g.ppm, -.3, 7); const q = [k.x, k.y]; if (!S._lp || Math.hypot(q[0] - S._lp[0], q[1] - S._lp[1]) > .35) { S.pts.push(q); S._lp = q; } H.act(S, 'pen'); }, up: S => { S.kind = classify(S.pts.map(q => this.px(S, q))); } }];
        if (p.sc === 'bask') { const [bx, by] = this.px(S, [1, 5.3]); return [{ id: 'aim', x: bx, y: by, r: 30, axis: 'xy', keep: true, idle: 'اسحب الكرة للخلف واتركها لترميها ✋', tip: 'اسحب للخلف (القوة والاتجاه) ثم اترك',
          down: S => { reset(S); }, drag: (S, d) => { const dx = clamp((d.sx - d.x) / g.ppm, 0, 3), dy = clamp((d.sy - d.y) / g.ppm, -3, 0); S.aim = [3.5 + dx * 1.5, -8.5 + dy * 1.2]; S.k.x = 1 - dx * .15; S.k.y = 5.3 - dy * .15; H.act(S, 'aim'); }, up: S => { const a = S.aim || [4.85, -10.1]; S.k = { x: 1, y: 5.3, vx: a[0], vy: a[1] }; S.mv = true; S.pt = 0; S.lastDot = -1; S.pts = []; } }]; }
        return [{ id: 'go', x: cur[0], y: cur[1], r: 28, hint: true, idle: 'انقر على الجسم ليبدأ الحركة 👆', tip: 'انقر لبدء الحركة', click: S => start(S) }];
      },
      readings(S) { return [rd('عدد النقاط', String(S.pts.length)), rd('الزمن بين نقطتين', S.p.dt + ' s'), rd('شكل المسار', S.kind ? KN[S.kind][0] : '—', 1)]; },
      explain(S) { if (S.kind) return `وصلنا النقاط التي مر بها الجسم فحصلنا على <b>${KN[S.kind][0]}</b>. <b>مسار الحركة</b> هو الخط الواصل بين مختلف المواقع التي يمر بها الجسم.`; return S.mv ? 'الجسم يتحرك ويترك <b>نقطة</b> عند موقعه كل ' + S.p.dt + ' s. لاحظ تباعد النقاط: كلما تباعدت كان الجسم أسرع.' : 'ابدأ الحركة وراقب النقاط التي يتركها الجسم.'; },
      quiz: [
        { q: 'الخط الواصل بين المواقع التي يمر بها الجسم خلال حركته يسمى:', o: ['مسار الحركة', 'الموقع', 'الإزاحة'], a: 0, why: 'تعريف مسار الحركة (مراجعة الفصل س1-3).' },
        { q: 'مسار كرة السلة من اللاعب إلى السلة:', o: ['مستقيم', 'منحنٍ', 'دائري'], a: 1, why: 'كرة السلة المرمية تتحرك حركة انتقالية على مسار منحنٍ.' },
        { q: 'كرة تسقط سقوطاً حراً إلى الأسفل، شكل مسارها:', o: ['مستقيم', 'دائري', 'متعرج'], a: 0, why: 'تمر النقاط على خط مستقيم رأسي (شكل 2).' }
      ]
    });
    function start(S) { const p = S.p; reset(S); S.mv = true; if (p.sc === 'drop') S.k = { x: 1.6, y: .9, vx: 0, vy: 0 }; if (p.sc === 'bask') { const a = S.aim || [4.85, -10.1]; S.k = { x: 1, y: 5.3, vx: a[0], vy: a[1] }; } if (p.sc === 'free') S.mv = false; H.snd(); }
  })();

  /* =========================================================================================
     8) أنواع الحركة (ص 12–13) — لكل نوع من أنواع الكتاب جزء خاص: مثال واقعي متحرك (عدة أمثلة)، المسار يُرسم مباشرة،
        إبراز الميزة التي تحدد النوع، شرح مبسط (ماذا ترى؟ لماذا؟ من حياتك)، وتحدٍّ قصير «ما نوع هذه الحركة؟»
     ========================================================================================= */
  const KT = { line: { n: 'انتقالية — خط مستقيم', col: '#2563eb' }, curve: { n: 'انتقالية — مسار منحنٍ', col: '#ea580c' }, closed: { n: 'دورية — مسار مغلق', col: '#7c3aed' }, vib: { n: 'دورية — اهتزازية', col: '#db2777' }, rand: { n: 'عشوائية', col: '#0891b2' } };
  const wrapT = (t, n) => { const out = []; let cur = ''; String(t).split(' ').forEach(wd => { if ((cur + ' ' + wd).trim().length > n && cur) { out.push(cur); cur = wd; } else cur = (cur + ' ' + wd).trim(); }); if (cur) out.push(cur); return out; };
  const ease = u => { u = clamp(u, 0, 1); return u * u * (3 - 2 * u); };
  /* explanation card at the bottom of the canvas. rows: [[chip, text, colour, keepOnPhone]]. ctx = null → only measure. returns the card's top y */
  const infoCard = (ctx, w, h, rows, show) => {
    if (!show) return h - 56;
    const narrow = w < 600, x1 = w - 12, x0 = 72, cw = x1 - x0, chipW = narrow ? 0 : 142, tw = cw - chipW - 24, n = Math.max(18, Math.floor(tw / 6.3)), lh = 18;
    const R = (narrow ? rows.filter(r => r[3]) : rows).map(r => ({ r, L: wrapT(r[1], n) }));
    const hh = R.reduce((a, q) => a + q.L.length * lh + (narrow ? lh : 0) + 8, 0) + 8, y0 = h - 60 - hh;
    if (!ctx) return y0;
    C2.card(ctx, x0, y0, cw, hh, { bd: '#94a3b8' }); let y = y0 + 8;
    R.forEach(({ r, L }, i) => {
      if (i) K.raw(ctx, () => { ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0 + 10, y - 4); ctx.lineTo(x1 - 10, y - 4); ctx.stroke(); });
      if (narrow) { T(ctx, r[0], x1 - 10, y + lh / 2, { s: 12.5, w: 900, c: r[2], a: 'right' }); y += lh; }
      else T(ctx, r[0], x1 - 8 - chipW / 2, y + L.length * lh / 2, { s: 12, w: 900, c: '#fff', bg: r[2] });
      L.forEach((t, k) => T(ctx, t, x1 - chipW - 16, y + lh * (k + .5), { s: 12.5, w: 700, c: '#1e293b', a: 'right' })); y += L.length * lh + 8;
    });
    return y0;
  };
  /* world (metres, y up) → screen, fitted in the scene rectangle */
  const geoW = (S, box, top, bot) => { const x0 = 72, x1 = S.W - 14, k = Math.min((x1 - x0) / (box[2] - box[0]), Math.max(20, bot - top) / (box[3] - box[1]));
    const ox = (x0 + x1) / 2 - (box[0] + box[2]) / 2 * k, oy = (top + bot) / 2 + (box[1] + box[3]) / 2 * k; return { k, X: x => ox + x * k, Y: y => oy - y * k, x0, x1, top, bot }; };
  const flag = (ctx, x, y, label, col, on = true) => { K.raw(ctx, () => { ctx.globalAlpha = on ? 1 : .45; ctx.strokeStyle = '#334155'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 46); ctx.stroke(); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, y - 46); ctx.lineTo(x + 24, y - 39); ctx.lineTo(x, y - 32); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; }); T(ctx, label, x, y - 58, { s: 12, w: 900, c: '#fff', bg: on ? col : '#94a3b8' }); };
  const dot = (ctx, x, y, r, col, hollow) => K.raw(ctx, () => { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); if (hollow) { ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]); } else { ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); } });
  /* projectile that leaves (x0,y0) at angle th and passes through (x1,y1) */
  const shot = (x0, y0, x1, y1, th) => { const dx = x1 - x0, dy = y1 - y0, c = Math.cos(th), v = Math.sqrt(9.8 * dx * dx / (2 * c * c * (dx * Math.tan(th) - dy))); return { v, T: dx / (v * c), at: t => [x0 + v * c * t, y0 + v * Math.sin(th) * t - 4.9 * t * t], vel: t => [v * c, v * Math.sin(th) - 9.8 * t] }; };
  /* top-view car: centre (x,y) px, heading a (screen radians), length L px */
  const carTop = (ctx, x, y, a, L, col = '#2563eb', num) => K.raw(ctx, () => { const W = L * .44; ctx.save(); ctx.translate(x, y); ctx.rotate(a);
    ctx.fillStyle = 'rgba(0,0,0,.25)'; rr(ctx, -L / 2 + 2, -W / 2 + 3, L, W, W * .3); ctx.fill();
    ctx.fillStyle = '#111827'; [[-.3, -1], [-.3, 1], [.3, -1], [.3, 1]].forEach(([u, v]) => { rr(ctx, u * L - L * .09, v * W / 2 - W * .12, L * .18, W * .24, 2); ctx.fill(); });
    const g = ctx.createLinearGradient(0, -W / 2, 0, W / 2); g.addColorStop(0, shade(col, 30)); g.addColorStop(.5, col); g.addColorStop(1, shade(col, -30)); ctx.fillStyle = g; rr(ctx, -L / 2, -W / 2, L, W, W * .35); ctx.fill(); ctx.strokeStyle = shade(col, -50); ctx.lineWidth = 1.2; ctx.stroke();
    ctx.fillStyle = '#bfdbfe'; rr(ctx, L * .08, -W * .38, L * .16, W * .76, 3); ctx.fill(); ctx.fillStyle = '#93c5fd'; rr(ctx, -L * .34, -W * .34, L * .1, W * .68, 3); ctx.fill();
    ctx.fillStyle = shade(col, -18); rr(ctx, -L * .22, -W * .36, L * .3, W * .72, 4); ctx.fill();
    ctx.fillStyle = '#fef08a'; ctx.fillRect(L / 2 - 3, -W * .4, 3, W * .18); ctx.fillRect(L / 2 - 3, W * .22, 3, W * .18); ctx.fillStyle = '#ef4444'; ctx.fillRect(-L / 2, -W * .4, 2.5, W * .16); ctx.fillRect(-L / 2, W * .24, 2.5, W * .16);
    if (num) { ctx.rotate(Math.PI / 2); ctx.fillStyle = '#fff'; ctx.font = `900 ${Math.round(W * .45)}px ui-monospace,monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(num, 0, -L * .07); ctx.textBaseline = 'alphabetic'; }
    ctx.restore(); });
  const field = (ctx, w, h, c1 = '#86c06c', c2 = '#4d7c3a') => { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, c1); g.addColorStop(1, c2); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); ctx.fillStyle = 'rgba(255,255,255,.05)'; for (let x = 0; x < w; x += 60) ctx.fillRect(x, 0, 30, h); }); };
  const treeTop = (ctx, x, y, r) => K.raw(ctx, () => { ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.arc(x + r * .25, y + r * .25, r, 0, TAU); ctx.fill(); const g = ctx.createRadialGradient(x - r * .3, y - r * .3, 2, x, y, r); g.addColorStop(0, '#4ade80'); g.addColorStop(1, '#166534'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); });

  /* ---------- mini challenge «ما نوع هذه الحركة؟» shared by the kinds parts ---------- */
  const WHY = {
    run: 'العدّاء يبدأ من خط البداية وينتهي عند خط النهاية في خط مستقيم: انتقالية على خط مستقيم.',
    slide: 'الطفل ينتقل من أعلى الزحليقة (البداية) إلى أسفلها (النهاية) على خط مستقيم: انتقالية.',
    bike: 'الدراجة تنتقل من مكان إلى آخر على طريق مستقيم: انتقالية على خط مستقيم.',
    bask: 'الكرة تبدأ من يد اللاعب وتنتهي في السلة على مسار منحنٍ: انتقالية على مسار منحنٍ.',
    race: 'السيارة تنعطف من مكان إلى آخر فيتغير اتجاهها: انتقالية على مسار منحنٍ.',
    wheel: 'دولاب الهواء يدور في مسار مغلق ويرجع إلى الموضع نفسه بعد أزمان متساوية: دورية.',
    fan: 'ريشة المروحة تدور في دائرة وتكرر دورتها في أزمان متساوية: دورية في مسار مغلق.',
    sat: 'القمر الصناعي يدور حول الأرض في مسار مغلق ويكرر دورته: دورية.',
    swing: 'الأرجوحة تذهب وتعود حول موضع الاتزان: دورية اهتزازية.',
    spring: 'الثقل يصعد وينزل حول موضع اتزانه مرة بعد مرة: دورية اهتزازية.',
    pend: 'بندول الساعة يتحرك ذهاباً وإياباً حول موضع الاتزان: دورية اهتزازية.',
    gas: 'دقائق الغاز تتصادم وتتحرك في كل الاتجاهات بلا نظام: عشوائية.'
  };
  const CHN = { run: 'عدّاؤون في سباق', slide: 'طفل على زحليقة', bike: 'دراجة على طريق مستقيم', bask: 'رمية كرة سلة', race: 'سيارة في منعطف', wheel: 'دولاب الهواء', fan: 'مروحة سقفية', sat: 'قمر صناعي حول الأرض', swing: 'أرجوحة', spring: 'ثقل معلّق بنابض', pend: 'بندول ساعة', gas: 'دقائق غاز في وعاء' };
  const CHK = { run: 'line', slide: 'line', bike: 'line', bask: 'curve', race: 'curve', wheel: 'closed', fan: 'closed', sat: 'closed', swing: 'vib', spring: 'vib', pend: 'vib', gas: 'rand' };
  const CH = {
    opts: ['line', 'curve', 'closed', 'vib', 'rand'],
    st: S => S.cq || (S.cq = { i: 0, pick: null, ok: 0 }),
    lay(S) { const w = S.W, h = S.H, narrow = w < 600, cx = (72 + w - 12) / 2, tw = Math.min(w - 100, 440), th = Math.min(230, h * .3), ty = 64;
      const bw = narrow ? (w - 100) / 2 : Math.min(150, (w - 120) / 5 - 8), bh = 46, by = ty + th + 52;
      const B = CH.opts.map((k, j) => narrow ? { x: j === 4 ? cx : cx + (j % 2 ? -1 : 1) * (bw / 2 + 5), y: by + Math.floor(j / 2) * (bh + 8), w: bw, h: bh } : { x: cx + (2 - j) * (bw + 8), y: by, w: bw, h: bh });
      const fy = (narrow ? by + 3 * (bh + 8) : by + bh + 10) + 18; return { cx, tw, th, ty, B, fy, nx: { x: cx - 95, y: fy + 66, w: 170, h: 42 }, bk: { x: cx + 95, y: fy + 66, w: 170, h: 42 } }; },
    draw(ctx, w, h, S, items) {
      const q = CH.st(S), L = CH.lay(S), done = q.i >= items.length, it = items[Math.min(q.i, items.length - 1)];
      K.bg(ctx, w, h, { bench: false, benchY: h + 5 });
      H.banner(ctx, w, done ? '🎯 انتهى التحدي' : '🎯 تحدٍّ: ما نوع هذه الحركة؟ (' + (q.i + 1) + ' من ' + items.length + ')', '#0f766e');
      if (done) { H.box(ctx, L.cx, L.ty + 40, Math.min(w - 100, 380), 'نتيجتك', [[q.ok + ' من ' + items.length, { s: 26, w: 900, c: q.ok === items.length ? '#16a34a' : '#b45309', mono: 1 }], [q.ok === items.length ? 'ممتاز! ميّزت كل الحركات 🎉' : 'راجع الشرح ثم أعد المحاولة', { s: 14 }]], { bd: '#0f766e' });
        C2.btn(ctx, L.nx.x, L.ty + 190, 170, 42, '↺ أعد التحدي', { col: '#0f766e' }); C2.btn(ctx, L.bk.x, L.ty + 190, 170, 42, '👀 عودة للمشاهدة', { col: '#475569' }); K.party(ctx, S); return; }
      C2.card(ctx, L.cx - L.tw / 2 - 6, L.ty - 6, L.tw + 12, L.th + 40, { bd: '#0f766e' });
      const kk = 2.2; K.raw(ctx, () => { ctx.save(); ctx.translate(L.cx, L.ty + L.th / 2); ctx.scale(kk, kk); }); H.anim(ctx, it.a, 0, 0, L.tw / kk, L.th / kk, S.t); K.raw(ctx, () => ctx.restore());
      T(ctx, CHN[it.a], L.cx, L.ty + L.th + 17, { s: 14.5, w: 900, c: '#0f172a' });
      L.B.forEach((b, j) => { const k = CH.opts[j], right = q.pick && k === CHK[it.a], wrong = q.pick === k && !right; C2.btn(ctx, b.x, b.y, b.w, b.h, KT[k].n, { col: q.pick ? (right ? '#16a34a' : wrong ? '#dc2626' : '#94a3b8') : KT[k].col, on: q.pick === k, s: b.w < 135 ? 11.5 : 12.5 }); });
      if (q.pick) { const ok = q.pick === CHK[it.a]; const Lw = wrapT((ok ? '✔ صحيح! ' : '✘ ليس صحيحاً. ') + WHY[it.a], Math.floor(Math.min(w - 100, 560) / 6.6)); Lw.forEach((t, k) => T(ctx, t, L.cx, L.fy + k * 20, { s: 13.5, w: 900, c: ok ? '#15803d' : '#b91c1c' }));
        C2.btn(ctx, L.nx.x, L.nx.y, L.nx.w, L.nx.h, q.i + 1 < items.length ? 'السؤال التالي ←' : 'النتيجة ←', { col: '#0f766e' }); }
      else T(ctx, 'انقر على نوع الحركة الصحيح', L.cx, L.fy, { s: 13.5, w: 800, c: '#475569' });
      C2.btn(ctx, L.bk.x, L.bk.y, L.bk.w, L.bk.h, '👀 عودة للمشاهدة', { col: '#475569' });
      T(ctx, 'نقاطك: ' + q.ok, 80, h - 52, { s: 13, w: 900, c: '#fff', bg: '#0f766e', a: 'left' }); K.party(ctx, S);
    },
    drags(S, items) {
      const q = CH.st(S), L = CH.lay(S), back = { id: 'chBack', x: L.bk.x, y: q.i >= items.length ? L.ty + 190 : L.bk.y, w: L.bk.w, h: L.bk.h, hint: false, tip: 'عودة لمشاهدة الحركة', click: S2 => { S2.chal = false; } };
      if (q.i >= items.length) return [{ id: 'chAgain', x: L.nx.x, y: L.ty + 190, w: 170, h: 42, hint: false, tip: 'أعد التحدي', click: S2 => { S2.cq = null; } }, back];
      const it = items[q.i], D = L.B.map((b, j) => ({ id: 'opt' + j, x: b.x, y: b.y, w: b.w, h: b.h, hint: j === 0 && !q.pick && q.i === 0, idle: j === 0 && q.i === 0 ? 'انقر على نوع الحركة ✋' : undefined, tip: 'اختر: ' + KT[CH.opts[j]].n,
        click: S2 => { const s = CH.st(S2); if (s.pick) return; s.pick = CH.opts[j]; if (s.pick === CHK[it.a]) { s.ok++; H.snd('ok'); K.cheer(S2, b.x, b.y); } else H.snd('bad'); H.act(S2, 'opt'); } }));
      if (q.pick) D.push({ id: 'chNext', x: L.nx.x, y: L.nx.y, w: L.nx.w, h: L.nx.h, hint: false, tip: 'السؤال التالي', click: S2 => { const s = CH.st(S2); s.i++; s.pick = null; } });
      D.push(back); return D;
    },
    explain(S, items) { const q = CH.st(S); if (q.i >= items.length) return 'انتهى التحدي: أجبت إجابة صحيحة عن <b>' + q.ok + ' من ' + items.length + '</b>.'; return 'شاهد الحركة في البطاقة واسأل نفسك: <b>هل لها نقطة بداية ونهاية؟</b> (انتقالية) <b>هل تتكرر في أزمان متساوية؟</b> (دورية) <b>هل تذهب وتعود حول موضع اتزان؟</b> (اهتزازية) <b>هل هي بلا نظام؟</b> (عشوائية).'; }
  };

  /* ---------- factory: one «kind of motion» part ---------- */
  const KP = cfg => {
    const keys = Object.keys(cfg.EX), ex = S => cfg.EX[S.p.ex] || cfg.EX[keys[0]], col = KT[cfg.k].col;
    const reset = S => { S.tt = 0; S.trace = []; S.hold = 0; S.ts = 0; S.laps = 0; S.flash = 0; S.cq = null; S.chal = false; const e = ex(S); e.init && e.init(S); };
    const rows = S => { const e = ex(S); return [['👀 ماذا ترى؟', e.see, '#0f766e', 0], ['🔎 ' + cfg.whyT, cfg.why, col, 1], ['🏠 من حياتك', cfg.life, '#b45309', 0]]; };
    const geo = S => { const e = ex(S), top = infoCard(null, S.W, S.H, rows(S), S.p.info); return Object.assign(geoW(S, e.box, e.top || 50, top - 12), { e }); };
    const D = P8({
      id: cfg.id, page: cfg.page, fig: cfg.fig, desc: cfg.desc, tags: cfg.tags, tools: [], laws: [], steps: cfg.steps, concl: cfg.concl,
      controls: [SEL('ex', 'المثال', keys.map(k => [k, cfg.EX[k].n]), keys[0], (v, S) => reset(S)), R('sp', 'سرعة العرض', .25, 2, 1, .25, '×'),
        TG('trace', 'رسم المسار مباشرة', true, null, 'vector'), TG('feat', cfg.featL, true, null, 'labels'), TG('info', 'بطاقة الشرح على الشاشة', true, null, 'eye'),
        BT('', [{ t: '↺ أعد الحركة', on: S => reset(S) }, { t: '🎯 تحدٍّ: ما نوع الحركة؟', on: S => { const c = !S.chal; reset(S); S.chal = c; } }])],
      setup(S) { reset(S); },
      update(S, dt) {
        if (S.chal || !S.W) return; const e = ex(S); dt = Math.min(dt, .05) * S.p.sp * (e.slow || 1);
        S.flash = Math.max(0, (S.flash || 0) - dt / (e.slow || 1));
        if (e.dur) { if (S.tt >= e.dur) { S.hold += dt / (e.slow || 1); if (S.hold > 3.5) { S.tt = 0; S.trace = []; S.hold = 0; e.init && e.init(S); } return; } S.tt = Math.min(e.dur, S.tt + dt); }
        else { const n0 = e.T ? Math.floor(S.tt / e.T) : 0; S.tt += dt; if (e.T && Math.floor(S.tt / e.T) > n0) { S.laps++; S.flash = 2; H.snd('ok'); } }
        if (e.sim) e.sim(S, dt);
        S.ts += dt; if (S.ts >= (e.dtr || .04) || (e.dur && S.tt >= e.dur)) { S.ts = 0; S.trace.push(e.pos(S.tt, S)); if (S.trace.length > (e.maxTr || 500)) S.trace.shift(); }
      },
      draw(ctx, w, h, S) {
        if (S.chal) { CH.draw(ctx, w, h, S, cfg.chal); return; }
        const g = geo(S), e = g.e, t = S.tt;
        e.bg(ctx, g, S, t, w, h);
        if (S.p.feat && cfg.under) cfg.under(ctx, g, S, e, t);
        if (e.traceTop) e.body(ctx, g, S, t);
        if (S.p.trace && S.trace.length > 1) K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = e.tc || col; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.shadowColor = 'rgba(255,255,255,.9)'; ctx.shadowBlur = 4; ctx.beginPath(); S.trace.forEach((p, i) => i ? ctx.lineTo(g.X(p[0]), g.Y(p[1])) : ctx.moveTo(g.X(p[0]), g.Y(p[1]))); const q = e.pos(t, S); ctx.lineTo(g.X(q[0]), g.Y(q[1])); ctx.stroke(); ctx.restore(); });
        if (!e.traceTop) e.body(ctx, g, S, t);
        if (S.p.feat) cfg.feature(ctx, g, S, e, t, w, h);
        H.banner(ctx, w, cfg.banner + (e.slow && e.slow < 1 ? '  (عرض بطيء)' : ''), col);
        C2.btn(ctx, w - 82, 64, 124, 34, '🎯 التحدي', { col: '#0f766e', s: 13 });
        infoCard(ctx, w, h, rows(S), S.p.info);
        K.party(ctx, S);
      },
      drags(S) { if (S.chal) return CH.drags(S, cfg.chal); return [{ id: 'chGo', x: S.W - 82, y: 64, w: 124, h: 34, hint: false, tip: 'تحدٍّ: ما نوع هذه الحركة؟', click: S2 => { reset(S2); S2.chal = true; } }]; },
      readings(S) { if (S.chal) { const q = CH.st(S); return [rd('السؤال', Math.min(q.i + 1, cfg.chal.length) + ' / ' + cfg.chal.length), rd('الإجابات الصحيحة', String(q.ok))]; } return [rd('نوع الحركة', KT[cfg.k].n)].concat(cfg.readings(S, ex(S))); },
      explain(S) { if (S.chal) return CH.explain(S, cfg.chal); const e = ex(S); return '<b>👀 ماذا ترى؟</b> ' + e.see + '<br><b>🔎 ' + cfg.whyT + '</b> ' + cfg.why + '<br><b>🏠 من حياتك:</b> ' + cfg.life; }
    });
    return D;
  };

  /* ---------- realistic scene pieces ---------- */
  const trainSide = (ctx, g, x0, alpha = 1) => K.raw(ctx, () => {
    const X = g.X, Y = g.Y, k = g.k, rot = x0 / .5; ctx.save(); ctx.globalAlpha = alpha; ctx.lineJoin = 'round';
    const car = (a, b, loco) => { const gr = ctx.createLinearGradient(0, Y(4), 0, Y(.8)); gr.addColorStop(0, loco ? '#f87171' : '#f1f5f9'); gr.addColorStop(1, loco ? '#991b1b' : '#94a3b8'); ctx.fillStyle = gr; ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 1.5; ctx.beginPath();
      if (loco) { ctx.moveTo(X(a), Y(.85)); ctx.lineTo(X(a), Y(3.9)); ctx.lineTo(X(b - 2.4), Y(3.9)); ctx.quadraticCurveTo(X(b), Y(3.7), X(b), Y(1.6)); ctx.lineTo(X(b), Y(.85)); ctx.closePath(); } else { rr(ctx, X(a), Y(3.95), (b - a) * k, 3.1 * k, .3 * k); }
      ctx.fill(); ctx.stroke(); ctx.fillStyle = loco ? '#fde047' : '#2563eb'; ctx.fillRect(X(a), Y(1.75), (b - a - (loco ? .1 : 0)) * k, .28 * k);
      ctx.fillStyle = '#bae6fd'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 1;
      if (loco) { ctx.beginPath(); ctx.moveTo(X(b - 2.3), Y(3.5)); ctx.lineTo(X(b - .5), Y(3.4)); ctx.lineTo(X(b - .2), Y(2.5)); ctx.lineTo(X(b - 2.3), Y(2.5)); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillRect(X(a + 1), Y(3.4), 1.6 * k, .9 * k); ctx.fillStyle = '#fef9c3'; ctx.beginPath(); ctx.arc(X(b - .25), Y(1.25), .2 * k, 0, TAU); ctx.fill(); }
      else for (let i = 0; i < 6; i++) { ctx.fillRect(X(a + .9 + i * 1.95), Y(3.45), 1.3 * k, 1.05 * k); ctx.strokeRect(X(a + .9 + i * 1.95), Y(3.45), 1.3 * k, 1.05 * k); }
      [a + 1.7, a + 3.1, b - 3.1, b - 1.7].forEach(wx => { ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(X(wx), Y(.5), .5 * k, 0, TAU); ctx.fill(); ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.arc(X(wx), Y(.5), .22 * k, 0, TAU); ctx.fill(); ctx.strokeStyle = '#6b7280'; ctx.lineWidth = 1.5; for (let s = 0; s < 3; s++) { const q = -rot + s * TAU / 3; ctx.beginPath(); ctx.moveTo(X(wx), Y(.5)); ctx.lineTo(X(wx) + Math.cos(q) * .45 * k, Y(.5) + Math.sin(q) * .45 * k); ctx.stroke(); } });
      ctx.fillStyle = '#374151'; ctx.fillRect(X(a + 1), Y(.95), (b - a - 2) * k, .12 * k); };
    car(x0, x0 + 13, false); ctx.fillStyle = '#374151'; ctx.fillRect(X(x0 + 13), Y(1.35), .6 * k, .3 * k); car(x0 + 13.6, x0 + 28, true);
    ctx.restore(); });
  const rails = (ctx, g, w) => K.raw(ctx, () => { const gy = g.Y(0), k = g.k; ctx.fillStyle = '#a8a29e'; ctx.beginPath(); ctx.moveTo(0, gy + .7 * k); ctx.lineTo(w, gy + .7 * k); ctx.lineTo(w, gy - .05 * k); ctx.lineTo(0, gy - .05 * k); ctx.fill();
    ctx.fillStyle = '#78350f'; for (let x = 0; x < w; x += .7 * k) ctx.fillRect(x, gy - .02 * k, .22 * k, .3 * k); ctx.fillStyle = '#6b7280'; ctx.fillRect(0, gy - .06 * k, w, Math.max(2, .1 * k)); ctx.fillStyle = '#d1d5db'; ctx.fillRect(0, gy - .06 * k, w, 1.2); });

  /* ======== part 1: الحركة الانتقالية على خط مستقيم ======== */
  KP({ id: 'g8_k_line', k: 'line', page: 12, fig: 'شكل 2 و 4', banner: 'الحركة الانتقالية على خط مستقيم',
    desc: 'نشاهد قطاراً على سكته وعدّائين في سباق وسيارة على طريق مستقيم وكرة تسقط (شكل 2)، فنرى نقطة البداية ونقطة النهاية، ويُرسم المسار المستقيم، وتتحرك كل نقاط الجسم المسافة نفسها وبالاتجاه نفسه.',
    tags: 'الحركة الانتقالية خط مستقيم قطار عداؤون سقوط', featL: 'نقطتا البداية والنهاية ونقاط الجسم', whyT: 'لماذا هي انتقالية؟',
    why: 'للحركة نقطة بداية ونقطة نهاية، فالجسم ينتقل من موقع إلى موقع آخر، ومساره خط مستقيم. ولاحظ أن كل نقطة على الجسم تقطع المسافة نفسها وبالاتجاه نفسه.',
    life: 'القطار على سكته، سقوط تفاحة من الشجرة، المصعد، مشيك في ممر المدرسة المستقيم.',
    steps: ['اختر مثالاً وراقب الجسم من نقطة البداية إلى نقطة النهاية.', 'لاحظ المسار الأزرق الذي يُرسم خلف الجسم: هل هو مستقيم؟', 'في القطار والسيارة: قارن أسهم النقاط الملونة الثلاث — هل قطعت المسافة نفسها وبالاتجاه نفسه؟', 'جرّب «التحدي» لتختبر نفسك.'],
    concl: ['الحركة الانتقالية حركة تتميز بوجود نقطة بداية ونقطة نهاية.', 'تكون على خط مستقيم مثل حركة القطار على سكة القطار، أو حركة العدّائين في السباق.', 'في الحركة الانتقالية تتحرك كل نقاط الجسم المسافة نفسها وبالاتجاه نفسه.'],
    chal: [{ a: 'bike' }, { a: 'wheel' }, { a: 'slide' }, { a: 'bask' }],
    EX: {
      train: { n: '🚆 قطار على سكة القطار (كالكتاب)', box: [0, -3, 52, 10], dur: 8, see: 'القطار يبدأ من نقطة البداية A ويتحرك على السكة المستقيمة حتى يقف عند نقطة النهاية B.',
        x(t) { return 2 + 20 * ease(t / 8); }, pos(t) { return [this.x(t) + 28, -.3]; }, shift(t) { return this.x(t) - this.x(0); },
        marks: [[.4, 2.4, '#16a34a', 'مؤخرة العربة'], [13.3, 3.2, '#7c3aed', 'وسط القطار'], [27.7, 1.6, '#dc2626', 'مقدمة القاطرة']],
        bg(ctx, g, S, t, w, h) { H.sky(ctx, w, h, g.Y(0) + 1); [5, 21, 37, 49].forEach((x, i) => H.tree(ctx, g.X(x), g.Y(0) - .9 * g.k, .55 + .15 * (i % 2))); rails(ctx, g, w); },
        ghost(ctx, g) { trainSide(ctx, g, this.x(0), .22); }, body(ctx, g, S, t) { trainSide(ctx, g, this.x(t)); } },
      runners: { n: '🏃 عدّاؤون في سباق (كالكتاب)', box: [-1, -.6, 16, 6.5], dur: 1.75, slow: .6, see: 'كل عدّاء ينطلق من خط البداية ويركض في حارته المستقيمة حتى خط النهاية.',
        V: [9.2, 9.8, 8.8], x(i, t) { return Math.min(14.5, .5 + this.V[i] * Math.max(0, t - .1)); }, pos(t) { return [this.x(1, t), 1.3]; }, shift(t) { return this.x(1, t) - this.x(1, 0); },
        bg(ctx, g, S, t, w, h) { H.sky(ctx, w, h, g.Y(2.9)); K.raw(ctx, () => { const y0 = g.Y(2.9), y1 = g.Y(-.5); ctx.fillStyle = '#c2410c'; ctx.fillRect(0, y0, w, y1 - y0); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; [2.9, 1.95, 1, .05].forEach(y => { ctx.beginPath(); ctx.moveTo(0, g.Y(y)); ctx.lineTo(w, g.Y(y)); ctx.stroke(); });
          ctx.fillStyle = '#4d7c3a'; ctx.fillRect(0, y1, w, h - y1); ctx.fillStyle = '#fff'; ctx.fillRect(g.X(.5) - 2, y0, 4, y1 - y0); for (let j = 0; j < 12; j++) { ctx.fillStyle = j % 2 ? '#111' : '#fff'; ctx.fillRect(g.X(14.5) - 4, y0 + (y1 - y0) * j / 12, 8, (y1 - y0) / 12); } });
          T(ctx, 'خط البداية', g.X(.5), g.Y(3.4), { s: 12, w: 900, c: '#fff', bg: '#15803d' }); T(ctx, 'خط النهاية', g.X(14.5), g.Y(3.4), { s: 12, w: 900, c: '#fff', bg: '#111827' }); },
        body(ctx, g, S, t) { const s0 = 1.75 * g.k / 100; [2, 1, 0].forEach(i => { const x = this.x(i, t), run = x < 14.4 && t > .1; H.runner(ctx, g.X(x), g.Y(i * .95 + .35), s0 * (1 - .07 * i), x * 2.4, { still: !run, shirt: ['#f8fafc', '#fde047', '#93c5fd'][i], shorts: ['#dc2626', '#1d4ed8', '#16a34a'][i] }); }); } },
      car: { n: '🚗 سيارة على طريق مستقيم', box: [0, -1.6, 24, 5], dur: 5, see: 'السيارة تتحرك على طريق مستقيم من مكان إلى مكان آخر ثم تقف.',
        x(t) { return 3 + 16 * ease(t / 5); }, pos(t) { return [this.x(t) + 2.1, -.45]; }, shift(t) { return this.x(t) - this.x(0); }, sc(g) { return 4.4 * g.k / 124; },
        marks: [[-58, -20, '#16a34a', 'المؤخرة'], [0, -60, '#7c3aed', 'السقف'], [58, -22, '#dc2626', 'المقدمة']], px: true,
        bg(ctx, g, S, t, w, h) { H.sky(ctx, w, h, g.Y(0), { road: .9 * g.k }); [1, 8, 15, 22].forEach((x, i) => H.tree(ctx, g.X(x), g.Y(0) - 2, .7 + .2 * (i % 2))); K.raw(ctx, () => { ctx.fillStyle = '#fff'; for (let x = 0; x < 24; x += 2.5) ctx.fillRect(g.X(x), g.Y(0) + .45 * g.k, 1.2 * g.k, 3); }); },
        ghost(ctx, g) { K.raw(ctx, () => { ctx.globalAlpha = .25; }); H.car(ctx, g.X(this.x(0)), g.Y(0) + .2 * g.k, this.sc(g), { driver: false }); K.raw(ctx, () => { ctx.globalAlpha = 1; }); },
        body(ctx, g, S, t) { H.car(ctx, g.X(this.x(t)), g.Y(0) + .2 * g.k, this.sc(g), { rot: this.x(t) / .3 }); } },
      fall: { n: '🔴 كرة تسقط من يد بنت (شكل 2)', box: [-3.2, -.3, 3.8, 5.4], dur: .91, slow: .3, strobe: .06, see: 'الكرة تسقط من يد البنت إلى الأرض، فتمر بنقاط كثيرة تقع كلها على خط شاقولي مستقيم.',
        pos(t) { return [.32, Math.max(.12, 4.2 - 4.9 * t * t)]; }, shift(t) { return 4.2 - this.pos(t)[1]; },
        bg(ctx, g, S, t, w, h) { H.sky(ctx, w, h, g.Y(0)); K.raw(ctx, () => { const gr = ctx.createLinearGradient(g.X(-3), 0, g.X(0), 0); gr.addColorStop(0, '#a16207'); gr.addColorStop(1, '#ca8a04'); ctx.fillStyle = gr; ctx.fillRect(g.X(-3), g.Y(3), 3 * g.k, 3 * g.k); ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 1; for (let y = 0; y < 3; y += .25) { ctx.beginPath(); ctx.moveTo(g.X(-3), g.Y(y)); ctx.lineTo(g.X(0), g.Y(y)); ctx.stroke(); } ctx.fillStyle = '#78350f'; ctx.fillRect(g.X(-3.1), g.Y(3.1), 3.25 * g.k, .12 * g.k); }); },
        body(ctx, g, S, t) { const s = 1.5 * g.k / 112, held = t < .02; H.kid(ctx, g.X(-.1), g.Y(3.1), s, { shirt: '#22c55e', arm: held ? 1.2 : 1.6 }); const p = this.pos(t); K.ball(ctx, g.X(p[0]), g.Y(p[1]), Math.max(8, .12 * g.k), '#dc2626'); } }
    },
    under(ctx, g, S, e, t) { if (e.ghost) e.ghost(ctx, g, S); },
    feature(ctx, g, S, e, t) {
      const X = g.X, Y = g.Y, p0 = e.pos(0, S), p1 = e.pos(e.dur, S), end = t >= e.dur - 1e-6, vert = e === this.EX.fall, d = e.shift(t);
      if (vert) { T(ctx, 'البداية', X(p0[0]) + 52, Y(p0[1]), { s: 12, w: 900, c: '#fff', bg: '#15803d' }); T(ctx, 'النهاية', X(p1[0]) + 52, Y(p1[1]), { s: 12, w: 900, c: '#fff', bg: end ? '#b91c1c' : '#94a3b8' });
        K.raw(ctx, () => { ctx.strokeStyle = 'rgba(37,99,235,.5)'; ctx.setLineDash([6, 6]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(p0[0]), Y(p0[1])); ctx.lineTo(X(p1[0]), Y(p1[1])); ctx.stroke(); ctx.setLineDash([]); });
        for (let s = e.strobe; s <= t; s += e.strobe) { const q = e.pos(s); K.raw(ctx, () => { ctx.globalAlpha = .45; }); K.ball(ctx, X(q[0]), Y(q[1]), Math.max(6, .1 * g.k), '#dc2626'); K.raw(ctx, () => { ctx.globalAlpha = 1; }); }
        T(ctx, 'صورة للكرة كل ' + e.strobe + ' s — كلها على خط مستقيم شاقولي', (g.x0 + g.x1) / 2, 92, { s: 13, w: 900, c: '#fff', bg: '#2563eb' }); }
      else if (e !== this.EX.runners) { const yy = Y(0) + (e.px ? .9 * g.k : .7 * g.k) + 4; [[p0[0], 'A نقطة البداية', '#15803d', true], [p1[0], 'B نقطة النهاية', '#b91c1c', end]].forEach(([xx, lab, c, on]) => { K.raw(ctx, () => { ctx.fillStyle = on ? c : '#94a3b8'; ctx.beginPath(); ctx.moveTo(X(xx), yy); ctx.lineTo(X(xx) - 8, yy + 13); ctx.lineTo(X(xx) + 8, yy + 13); ctx.closePath(); ctx.fill(); }); T(ctx, lab, Math.min(X(xx), g.x1 - 52), yy + 28, { s: 12.5, w: 900, c: '#fff', bg: on ? c : '#94a3b8' }); }); }
      if (e.marks && d > .05) {
        e.marks.forEach(([mx, my, c, lab]) => { let a, b; if (e.px) { const s = e.sc(g); a = [X(e.x(0)) + mx * s, Y(0) + .2 * g.k + my * s]; b = [X(e.x(t)) + mx * s, a[1]]; } else { a = [X(e.x(0) + mx), Y(my)]; b = [X(e.x(t) + mx), Y(my)]; }
          dot(ctx, a[0], a[1], 7, c, true); if (b[0] - a[0] > 16) H.arrow(ctx, a[0], a[1], b[0] - 8, b[1], c, 3.5); dot(ctx, b[0], b[1], 7.5, c); T(ctx, d.toFixed(1) + ' m', (a[0] + b[0]) / 2, a[1] - 14, { s: 12, w: 900, c: '#fff', bg: c, mono: 1 }); });
        T(ctx, 'كل النقاط الملوّنة تحركت ' + d.toFixed(1) + ' m وبالاتجاه نفسه ⇐ حركة انتقالية', (g.x0 + g.x1) / 2, 92, { s: 13.5, w: 900, c: '#fff', bg: '#2563eb' });
      } else if (e === this.EX.runners) T(ctx, 'كل عدّاء يبقى في حارته المستقيمة من خط البداية إلى خط النهاية', (g.x0 + g.x1) / 2, 92, { s: 13.5, w: 900, c: '#fff', bg: '#2563eb' });
      if (end) T(ctx, '✔ وصل إلى نقطة النهاية', (g.x0 + g.x1) / 2, 122, { s: 14, w: 900, c: '#fff', bg: '#15803d' });
    },
    readings(S, e) { const t = S.tt; return [rd('الزمن', fmt(t, 3) + ' s'), rd('المسافة المقطوعة', fmt(e.shift(t), 3) + ' m'), rd('شكل المسار', 'خط مستقيم'), rd('نقطة النهاية', t >= e.dur ? 'وصل ✔' : 'لم يصل بعد')]; }
  });

  /* ======== part 2: الحركة الانتقالية على مسار منحنٍ ======== */
  const ROAD = { L1: 14, R: 10, L3: 10 }; ROAD.tot = ROAD.L1 + Math.PI / 2 * ROAD.R + ROAD.L3;
  const roadAt = s => { s = clamp(s, 0, ROAD.tot); if (s <= ROAD.L1) return [s, 2, 0]; s -= ROAD.L1; const arc = Math.PI / 2 * ROAD.R; if (s <= arc) { const f = s / ROAD.R - Math.PI / 2; return [ROAD.L1 + ROAD.R * Math.cos(f), 2 + ROAD.R + ROAD.R * Math.sin(f), f + Math.PI / 2]; } s -= arc; return [ROAD.L1 + ROAD.R, 2 + ROAD.R + s, Math.PI / 2]; };
  const BSK = shot(.27, 1.7, 7.1, 3.12, rad(54)), PEN = shot(.35, .11, 11.5, 1.95, rad(24));
  KP({ id: 'g8_k_curve', k: 'curve', page: 12, fig: 'شكل 4', banner: 'الحركة الانتقالية على مسار منحنٍ',
    desc: 'نشاهد رمية كرة سلة (كالكتاب) وسيارة تدور في طريق منحنٍ وركلة جزاء: للحركة بداية ونهاية لكن اتجاه الحركة يتغير باستمرار فيكون المسار منحنياً. أسهم الاتجاه وصور الجسم المتتالية تُظهر ذلك.',
    tags: 'الحركة الانتقالية مسار منحني كرة السلة منعطف', featL: 'أسهم اتجاه الحركة وصور الجسم', whyT: 'لماذا هي انتقالية؟',
    why: 'للحركة نقطة بداية ونقطة نهاية فهي انتقالية، لكن اتجاه الحركة (السهم البرتقالي) يتغير باستمرار، فيكون المسار منحنياً لا مستقيماً.',
    life: 'رمية كرة السلة، ركلة كرة القدم، دوران السيارة في طريق منحنٍ، قفزة الدلفين من الماء.',
    steps: ['اختر مثالاً وراقب الجسم من البداية إلى النهاية.', 'لاحظ أسهم «اتجاه الحركة»: هل يبقى الاتجاه نفسه أم يتغير؟', 'قارن شكل المسار الذي رُسم مع المسار المستقيم في الجزء الأول.', 'جرّب «التحدي».'],
    concl: ['الحركة الانتقالية قد تكون في مسار منحنٍ، مثل دوران السيارة في طريق منحنٍ ورمية كرة السلة.', 'في المسار المنحني يتغير اتجاه حركة الجسم باستمرار.', 'مسار كرة السلة من اللاعب إلى السلة مسار منحنٍ (التفكير الناقد 1).'],
    chal: [{ a: 'race' }, { a: 'run' }, { a: 'swing' }, { a: 'bask' }],
    EX: {
      bask: { n: '🏀 رمية كرة سلة نحو السلة (كالكتاب)', box: [-1.3, -.2, 8.4, 4.6], dur: BSK.T, slow: .4, strobe: .1, see: 'الكرة تنطلق من يد اللاعب (البداية) فترتفع ثم تنزل حتى تدخل السلة (النهاية) على مسار منحنٍ يشبه القوس.',
        pos(t) { return BSK.at(Math.min(t, BSK.T)); }, vel(t) { return BSK.vel(t); },
        bg(ctx, g, S, t, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, 0, 0, g.Y(0)); gr.addColorStop(0, '#fef3c7'); gr.addColorStop(1, '#fde68a'); ctx.fillStyle = gr; ctx.fillRect(0, 0, w, g.Y(0)); const fl = ctx.createLinearGradient(0, g.Y(0), 0, h); fl.addColorStop(0, '#d97706'); fl.addColorStop(1, '#92400e'); ctx.fillStyle = fl; ctx.fillRect(0, g.Y(0), w, h - g.Y(0)); ctx.strokeStyle = 'rgba(0,0,0,.12)'; for (let x = 0; x < w; x += 46) { ctx.beginPath(); ctx.moveTo(x, g.Y(0)); ctx.lineTo(x - 30, h); ctx.stroke(); }
          ctx.fillStyle = '#475569'; ctx.fillRect(g.X(7.75), g.Y(4.1), .14 * g.k, 4.1 * g.k); ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.fillRect(g.X(7.48), g.Y(4.1), .1 * g.k, 1.1 * g.k); ctx.strokeRect(g.X(7.48), g.Y(4.1), .1 * g.k, 1.1 * g.k); ctx.fillStyle = '#475569'; ctx.fillRect(g.X(7.58), g.Y(3.4), .17 * g.k, .06 * g.k);
          ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 1.2; for (let i = 0; i <= 6; i++) { const u = i / 6; ctx.beginPath(); ctx.moveTo(g.X(6.87 + .56 * u), g.Y(3.05)); ctx.lineTo(g.X(6.98 + .36 * u), g.Y(2.62)); ctx.stroke(); } }); },
        body(ctx, g, S, t) { H.kid(ctx, g.X(0), g.Y(0), 1.72 * g.k / 112, { shirt: '#f97316', arm: t < .02 ? 2.55 : 2.85 }); const p = this.pos(t); H.ballKind(ctx, g.X(p[0]), g.Y(p[1]), Math.max(9, .12 * g.k), 'bask', t * 6);
          K.raw(ctx, () => { ctx.strokeStyle = '#ea580c'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.ellipse(g.X(7.15), g.Y(3.05), .28 * g.k, .05 * g.k, 0, 0, TAU); ctx.stroke(); }); } },
      road: { n: '🚗 سيارة تدور في طريق منحنٍ (كالكتاب)', box: [-2, -2.5, 30, 24], dur: 6, see: 'السيارة تسير على الطريق ثم تدور مع المنعطف، فيتغير اتجاهها ويصبح مسارها منحنياً (منظر من الأعلى).', strobe: .6,
        pos(t) { return roadAt(ROAD.tot * ease(t / 6)).slice(0, 2); }, vel(t) { const a = roadAt(ROAD.tot * ease(t / 6))[2]; return [Math.cos(a), Math.sin(a)]; },
        bg(ctx, g, S, t, w, h) { field(ctx, w, h); const P = []; for (let s = -6; s <= ROAD.tot + 6; s += .5) { const q = s < 0 ? [s, 2] : s > ROAD.tot ? [24, 22 + s - ROAD.tot] : roadAt(s); P.push([g.X(q[0]), g.Y(q[1])]); }
          K.raw(ctx, () => { const ln = (wd, c, dash) => { ctx.strokeStyle = c; ctx.lineWidth = wd; ctx.setLineDash(dash || []); ctx.lineJoin = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.setLineDash([]); }; ln(7.6 * g.k, '#e5e7eb'); ln(7 * g.k, '#4b5563'); ln(2, '#fde047', [.9 * g.k, .7 * g.k]); });
          [[4, 9], [6, 15.5], [2, 19], [27, 4], [8, 8.5], [29, 13], [28, 19], [11, 20.5]].forEach(([x, y], i) => treeTop(ctx, g.X(x), g.Y(y), (.9 + .3 * (i % 3)) * g.k));
          K.raw(ctx, () => { ctx.fillStyle = '#b45309'; ctx.fillRect(g.X(15), g.Y(18.5), 4 * g.k, 3.5 * g.k); ctx.fillStyle = '#7f1d1d'; ctx.beginPath(); ctx.moveTo(g.X(14.7), g.Y(18.5)); ctx.lineTo(g.X(17), g.Y(17.2)); ctx.lineTo(g.X(19.3), g.Y(18.5)); ctx.closePath(); ctx.fill(); }); },
        body(ctx, g, S, t) { const q = roadAt(ROAD.tot * ease(t / 6)); carTop(ctx, g.X(q[0]), g.Y(q[1]), -q[2], 4.4 * g.k, '#2563eb'); } },
      pen: { n: '⚽ ركلة جزاء نحو المرمى', box: [-1.4, -.3, 13.4, 4.2], dur: PEN.T, slow: .5, strobe: .1, see: 'الكرة تنطلق من قدم اللاعب فترتفع ثم تنزل حتى تدخل المرمى، على مسار منحنٍ.',
        pos(t) { return PEN.at(Math.min(t, PEN.T)); }, vel(t) { return PEN.vel(t); },
        bg(ctx, g, S, t, w, h) { H.sky(ctx, w, h, g.Y(0), { hills: false, g1: '#65a30d', g2: '#3f6212' }); K.raw(ctx, () => { ctx.fillStyle = '#94a3b8'; ctx.fillRect(0, g.Y(0) - 70, w, 40); ctx.fillStyle = 'rgba(255,255,255,.4)'; for (let x = 0; x < w; x += 9) ctx.fillRect(x, g.Y(0) - 66 + (x * 7 % 22), 4, 4);
          ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = Math.max(3, .12 * g.k); ctx.beginPath(); ctx.moveTo(g.X(11.5), g.Y(0)); ctx.lineTo(g.X(11.5), g.Y(2.44)); ctx.lineTo(g.X(12.9), g.Y(1.8)); ctx.lineTo(g.X(13.1), g.Y(0)); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 1; for (let i = 1; i < 8; i++) { ctx.beginPath(); ctx.moveTo(g.X(11.5), g.Y(2.44 * i / 8)); ctx.lineTo(g.X(13), g.Y(1.8 * i / 8)); ctx.stroke(); } ctx.fillStyle = '#fff'; ctx.fillRect(g.X(.25), g.Y(0) - 2, .2 * g.k, 4); }); },
        body(ctx, g, S, t) { H.kid(ctx, g.X(-.35), g.Y(0), 1.6 * g.k / 112, { shirt: '#dc2626', leg: t < .25 ? -.9 : -.2 }); const p = this.pos(t); H.ballKind(ctx, g.X(p[0]), g.Y(p[1]), Math.max(9, .11 * g.k), 'ball', -t * 8); } }
    },
    feature(ctx, g, S, e, t) {
      const X = g.X, Y = g.Y, p0 = e.pos(0, S), p1 = e.pos(e.dur, S), end = t >= e.dur - 1e-6;
      T(ctx, 'البداية', X(p0[0]), Y(p0[1]) - 30, { s: 12, w: 900, c: '#fff', bg: '#15803d' }); T(ctx, 'النهاية', X(p1[0]), Y(p1[1]) - 30, { s: 12, w: 900, c: '#fff', bg: end ? '#b91c1c' : '#94a3b8' });
      const arr = (s, main) => { const p = e.pos(s), v = e.vel(s), L = Math.hypot(v[0], v[1]) || 1, a = [X(p[0]), Y(p[1])], len = main ? 64 : 38; H.arrow(ctx, a[0], a[1], a[0] + v[0] / L * len, a[1] - v[1] / L * len, main ? '#ea580c' : 'rgba(234,88,12,.75)', main ? 4 : 2.5, main ? 'اتجاه الحركة' : null, { s: 11.5 }); };
      for (let s = 0; s < t - 1e-6; s += e.strobe) { const q = e.pos(s); dot(ctx, X(q[0]), Y(q[1]), 4.5, '#ea580c'); arr(s, false); }
      if (!end) arr(t, true);
      T(ctx, end ? '✔ وصل إلى النهاية — المسار منحنٍ لأن اتجاه الحركة تغيّر' : 'لاحظ: سهم «اتجاه الحركة» يغيّر اتجاهه باستمرار', (g.x0 + g.x1) / 2, 92, { s: 13.5, w: 900, c: '#fff', bg: end ? '#15803d' : '#ea580c' });
    },
    readings(S, e) { const v = e.vel(S.tt), a = Math.round(deg(Math.atan2(v[1], v[0]))); return [rd('الزمن', fmt(S.tt, 3) + ' s'), rd('اتجاه الحركة الآن', a + '°'), rd('شكل المسار', 'منحنٍ'), rd('نقطة النهاية', S.tt >= e.dur ? 'وصل ✔' : 'لم يصل بعد')]; }
  });

  /* ======== part 3: الحركة الدورية في مسار مغلق ======== */
  const TRK = { a: 14, r: 9 }; TRK.P = 4 * TRK.a + TAU * TRK.r;
  const trackAt = s => { const a = TRK.a, r = TRK.r; s = ((s % TRK.P) + TRK.P) % TRK.P; if (s < 2 * a) return [-a + s, -r, 0]; s -= 2 * a; if (s < Math.PI * r) { const f = -Math.PI / 2 + s / r; return [a + r * Math.cos(f), r * Math.sin(f), f + Math.PI / 2]; } s -= Math.PI * r; if (s < 2 * a) return [a - s, r, Math.PI]; s -= 2 * a; const f = Math.PI / 2 + s / r; return [-a + r * Math.cos(f), r * Math.sin(f), f + Math.PI / 2]; };
  KP({ id: 'g8_k_closed', k: 'closed', page: 12, fig: 'شكل 4', banner: 'الحركة الدورية في مسار مغلق',
    desc: 'نشاهد دولاب الهواء (كالكتاب) والأرض حول الشمس وسيارة سباق حول المضمار: الجسم يعود إلى الموضع نفسه بعد أزمان متساوية. عدّاد الدورات وساعة تسجّل زمن كل دورة، وعلامة موضع البداية.',
    tags: 'الحركة الدورية مسار مغلق دولاب الهواء الكواكب مضمار', featL: 'موضع البداية وعدّاد الدورات وأزمنتها', whyT: 'لماذا هي دورية؟',
    why: 'الحركة تكرر نفسها على فترات زمنية متساوية (انظر أزمنة الدورات: كلها متساوية)، والجسم يتحرك في مسار مغلق يعود فيه إلى موضع البداية.',
    life: 'عقارب الساعة، دوران الكواكب حول الشمس، دولاب الهواء، مروحة السقف، دوران القمر حول الأرض.',
    steps: ['اختر مثالاً وراقب العلامة «موضع البداية».', 'في كل مرة يعود الجسم إلى موضع البداية يزداد عدّاد الدورات وتُسجّل زمن الدورة.', 'قارن أزمنة الدورات: هل هي متساوية؟', 'لاحظ أن المسار المرسوم مغلق (يرجع إلى أوله).', 'جرّب «التحدي».'],
    concl: ['الحركة الدورية هي حركة تكرر نفسها على فترات زمنية متساوية.', 'قد تكون في مسار مغلق مثل حركة الكواكب حول الشمس ودولاب الهواء وسيارات السباق حول المضمار (التفكير الناقد 2-جـ).', 'الزمن اللازم لإكمال دورة واحدة يكون نفسه في كل دورة.'],
    chal: [{ a: 'sat' }, { a: 'pend' }, { a: 'fan' }, { a: 'bike' }],
    EX: {
      wheel: { n: '🎡 دولاب الهواء (كالكتاب)', box: [-14.5, -.8, 21, 27.2], T: 12, Treal: 15, u: 'min', traceTop: true, see: 'المقصورة الحمراء تدور مع دولاب الهواء وترجع إلى الموضع نفسه (الأسفل) بعد كل دورة.', tc: '#a855f7',
        ang(t, i = 0) { return -Math.PI / 2 + TAU * t / this.T + i * TAU / 12; }, pos(t) { const a = this.ang(t); return [12 * Math.cos(a), 14.6 + 12 * Math.sin(a)]; },
        bg(ctx, g, S, t, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, 0, 0, g.Y(0)); gr.addColorStop(0, '#1e1b4b'); gr.addColorStop(.6, '#3b5998'); gr.addColorStop(1, '#f59e0b'); ctx.fillStyle = gr; ctx.fillRect(0, 0, w, g.Y(0)); ctx.fillStyle = '#1f2937'; ctx.fillRect(0, g.Y(0), w, h - g.Y(0));
          const X = g.X, Y = g.Y, k = g.k, C = [X(0), Y(14.6)]; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = Math.max(3, .35 * k); ctx.beginPath(); ctx.moveTo(X(-6), Y(0)); ctx.lineTo(C[0], C[1]); ctx.lineTo(X(6), Y(0)); ctx.moveTo(X(-3.5), Y(0)); ctx.lineTo(C[0], C[1]); ctx.lineTo(X(3.5), Y(0)); ctx.stroke(); }); },
        body(ctx, g, S, t) { const X = g.X, Y = g.Y, k = g.k, C = [X(0), Y(14.6)], R = 12 * k;
          K.raw(ctx, () => { ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(C[0], C[1], R, 0, TAU); ctx.stroke(); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(C[0], C[1], R * .93, 0, TAU); ctx.stroke(); ctx.strokeStyle = 'rgba(226,232,240,.8)'; ctx.lineWidth = 1.2; for (let i = 0; i < 24; i++) { const a = this.ang(t) + i * TAU / 24; ctx.beginPath(); ctx.moveTo(C[0], C[1]); ctx.lineTo(C[0] + Math.cos(a) * R, C[1] - Math.sin(a) * R); ctx.stroke(); }
            for (let i = 0; i < 36; i++) { const a = this.ang(t) + i * TAU / 36; ctx.fillStyle = i % 2 ? '#fde047' : '#fb923c'; ctx.beginPath(); ctx.arc(C[0] + Math.cos(a) * R, C[1] - Math.sin(a) * R, 2.2, 0, TAU); ctx.fill(); }
            ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.arc(C[0], C[1], .7 * k, 0, TAU); ctx.fill();
            for (let i = 11; i >= 0; i--) { const a = this.ang(t, i), px = C[0] + Math.cos(a) * R, py = C[1] - Math.sin(a) * R, red = i === 0, cw = 2 * k, chh = 1.9 * k; ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + .5 * k); ctx.stroke();
              const gr = ctx.createLinearGradient(px - cw / 2, 0, px + cw / 2, 0); gr.addColorStop(0, red ? '#ef4444' : ['#22c55e', '#38bdf8', '#f472b6', '#facc15'][i % 4]); gr.addColorStop(1, shade(red ? '#ef4444' : ['#22c55e', '#38bdf8', '#f472b6', '#facc15'][i % 4], -35)); ctx.fillStyle = gr; rr(ctx, px - cw / 2, py + .45 * k, cw, chh, .35 * k); ctx.fill(); ctx.fillStyle = 'rgba(224,242,254,.85)'; ctx.fillRect(px - cw * .38, py + .75 * k, cw * .76, chh * .38); if (red) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5; rr(ctx, px - cw / 2, py + .45 * k, cw, chh, .35 * k); ctx.stroke(); } } }); } },
      earth: { n: '🌍 الأرض حول الشمس (حركة الكواكب)', box: [-14.5, -13, 21, 13], T: 12, Treal: 365, u: 'يوماً', see: 'الأرض تدور حول الشمس في مسار مغلق، وتعود إلى الموضع نفسه بعد سنة واحدة (نحو 365 يوماً).', tc: '#c4b5fd',
        pos(t) { const a = -Math.PI / 2 + TAU * t / this.T; return [12 * Math.cos(a), 11.4 * Math.sin(a)]; },
        bg(ctx, g, S, t, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { ctx.fillStyle = '#020617'; ctx.fillRect(0, 0, w, h); for (let i = 0; i < 140; i++) { const x = (i * 197.3) % w, y = (i * 83.7 + i * i * .37) % h; ctx.fillStyle = `rgba(255,255,255,${.25 + .5 * ((i * 7) % 10) / 10})`; ctx.fillRect(x, y, 1.6, 1.6); }
          const C = [g.X(0), g.Y(0)], r = 2.2 * g.k, gl = ctx.createRadialGradient(C[0], C[1], r * .2, C[0], C[1], r * 2.6); gl.addColorStop(0, '#fff7ed'); gl.addColorStop(.35, '#fbbf24'); gl.addColorStop(.5, 'rgba(251,146,60,.5)'); gl.addColorStop(1, 'rgba(251,146,60,0)'); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(C[0], C[1], r * 2.6, 0, TAU); ctx.fill(); }); T(ctx, 'الشمس', g.X(0), g.Y(0) + 2.9 * g.k, { s: 12.5, w: 900, c: '#fde68a' }); },
        body(ctx, g, S, t) { const p = this.pos(t), x = g.X(p[0]), y = g.Y(p[1]), r = Math.max(10, .9 * g.k);
          K.raw(ctx, () => { const gr = ctx.createRadialGradient(x - r * .3, y - r * .3, 1, x, y, r); gr.addColorStop(0, '#93c5fd'); gr.addColorStop(1, '#1d4ed8'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.ellipse(x - r * .2, y - r * .1, r * .4, r * .25, .6, 0, TAU); ctx.fill();
            const a = Math.atan2(y - g.Y(0), x - g.X(0)); ctx.fillStyle = 'rgba(2,6,23,.55)'; ctx.beginPath(); ctx.arc(x, y, r, a - Math.PI / 2, a + Math.PI / 2); ctx.fill();
            const ma = TAU * t / this.T * 12.4, mx = x + Math.cos(ma) * 2 * g.k, my = y - Math.sin(ma) * 2 * g.k; ctx.fillStyle = '#e5e7eb'; ctx.beginPath(); ctx.arc(mx, my, Math.max(3.5, .3 * g.k), 0, TAU); ctx.fill(); });
          T(ctx, 'الأرض', x, y + r + 12, { s: 12, w: 900, c: '#bfdbfe' }); } },
      race: { n: '🏎️ سيارة سباق حول المضمار', box: [-25, -13.5, 34, 13.5], T: 6, Treal: 6, u: 's', see: 'سيارة السباق تدور حول المضمار وتمر بخط البداية مرة بعد مرة، وتستغرق الزمن نفسه في كل دورة.',
        pos(t) { return trackAt(TRK.a + TRK.P * t / this.T).slice(0, 2); },
        bg(ctx, g, S, t, w, h) { field(ctx, w, h); const P = []; for (let s = 0; s <= TRK.P + .5; s += .5) { const q = trackAt(s); P.push([g.X(q[0]), g.Y(q[1])]); }
          K.raw(ctx, () => { const ln = (wd, c, dash) => { ctx.strokeStyle = c; ctx.lineWidth = wd; ctx.setLineDash(dash || []); ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.stroke(); ctx.setLineDash([]); }; ln(7 * g.k, '#dc2626', [.8 * g.k, .8 * g.k]); ln(6.2 * g.k, '#374151'); ln(1.5, 'rgba(255,255,255,.7)', [8, 8]);
            for (let j = 0; j < 8; j++) for (let m = 0; m < 2; m++) { ctx.fillStyle = (j + m) % 2 ? '#111' : '#fff'; ctx.fillRect(g.X(0) + m * .4 * g.k, g.Y(-9 + 3.1) + j * 6.2 * g.k / 8, .4 * g.k, 6.2 * g.k / 8); }
            ctx.fillStyle = '#64748b'; ctx.fillRect(g.X(-12), g.Y(13.4), 24 * g.k, 1 * g.k); for (let i = 0; i < 90; i++) { ctx.fillStyle = ['#ef4444', '#3b82f6', '#facc15', '#22c55e', '#f8fafc'][i % 5]; ctx.beginPath(); ctx.arc(g.X(-11.6 + (i % 45) * .53), g.Y(13.15 - Math.floor(i / 45) * .5), 2.4, 0, TAU); ctx.fill(); } }); },
        body(ctx, g, S, t) { const q = trackAt(TRK.a + TRK.P * t / this.T); carTop(ctx, g.X(q[0]), g.Y(q[1]), -q[2], 4.8 * g.k, '#dc2626', '7'); } }
    },
    feature(ctx, g, S, e, t, w) {
      const p0 = e.pos(0, S), x = g.X(p0[0]), y = g.Y(p0[1]), on = S.flash > 0;
      K.raw(ctx, () => { ctx.save(); ctx.strokeStyle = on ? '#22c55e' : '#fde047'; ctx.lineWidth = 3; ctx.setLineDash([5, 4]); ctx.shadowColor = '#22c55e'; ctx.shadowBlur = on ? 18 : 0; ctx.beginPath(); ctx.arc(x, y, 17, 0, TAU); ctx.stroke(); ctx.restore(); });
      T(ctx, on ? '⟲ عاد إلى موضع البداية!' : 'موضع البداية', x, y + 32, { s: 12.5, w: 900, c: '#fff', bg: on ? '#16a34a' : '#7c3aed' });
      const toR = s => e.Treal * s / e.T, tR = toR(t), cx = w - 96;
      H.box(ctx, cx, 92, 168, 'الزمن', [[tR.toFixed(1) + ' ' + e.u, { s: 16, w: 900, c: '#0f172a', mono: 1 }]], { bd: '#7c3aed' });
      const rows = []; for (let i = Math.max(0, S.laps - 4); i < S.laps; i++) rows.push(['الدورة ' + (i + 1) + ':  ' + fmt(e.Treal, 3) + ' ' + e.u, { s: 12.5, c: '#15803d' }]);
      H.box(ctx, cx, 168, 168, 'عدد الدورات: ' + S.laps, rows.length ? rows : [['انتظر أول دورة…', { s: 12, c: '#64748b' }]], { bd: '#7c3aed', lh: 20 });
      if (S.laps >= 2) T(ctx, 'كل الدورات استغرقت الزمن نفسه ⇐ حركة دورية', (g.x0 + g.x1) / 2, 92, { s: 13.5, w: 900, c: '#fff', bg: '#7c3aed' });
    },
    readings(S, e) { return [rd('الزمن', (e.Treal * S.tt / e.T).toFixed(1) + ' ' + e.u), rd('عدد الدورات', String(S.laps)), rd('زمن الدورة الواحدة', fmt(e.Treal, 3) + ' ' + e.u), rd('شكل المسار', 'مغلق')]; }
  });

  /* ======== part 5: الحركة العشوائية (حقيقة علمية ص 13) ======== */
  const gasInit = (S, n, box, sp) => { S.ps = []; for (let i = 0; i < n; i++) { let x, y, ok, tries = 0; do { x = box[0] + .3 + Math.random() * (box[2] - box[0] - .6); y = box[1] + .3 + Math.random() * (box[3] - box[1] - .6); ok = S.ps.every(q => Math.hypot(q.x - x, q.y - y) > .5); } while (!ok && ++tries < 50); const a = Math.random() * TAU, v = sp * (.7 + .6 * Math.random()); S.ps.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v }); } S.hits = 0; S.hitP = []; };
  KP({ id: 'g8_k_rand', k: 'rand', page: 13, fig: 'حقيقة علمية', banner: 'الحركة العشوائية (حقيقة علمية)',
    desc: 'دقائق غاز في وعاء مغلق تتصادم مع بعضها ومع الجدران (كالكتاب)، وذرات غبار في شعاع الشمس. نتتبع دقيقة واحدة فيُرسم مسارها المتعرج: لا نظام ولا تكرار ولا نقطة نهاية.',
    tags: 'الحركة العشوائية دقائق الغاز تصادم الغبار', featL: 'أسهم اتجاهات الدقائق ومواضع التصادم', whyT: 'لماذا هي عشوائية؟',
    why: 'لا توجد نقطة نهاية محددة، ولا تتكرر الحركة، ويتغير اتجاه الدقيقة فجأة عند كل تصادم فلا يكون للمسار شكل منتظم.',
    life: 'حركة دقائق الغاز والهواء، انتشار رائحة العطر في الغرفة، حركة ذرات الغبار في ضوء الشمس.',
    steps: ['راقب الدقيقة الحمراء: إنها تسير بخط مستقيم حتى تصطدم.', 'عند كل تصادم (نجمة صفراء) يتغير اتجاهها فجأة ويزداد عدّاد التصادمات.', 'انظر إلى المسار المرسوم بعد مدة: هل له شكل منتظم؟ هل يتكرر؟', 'جرّب مثال ذرات الغبار في شعاع الشمس، ثم «التحدي».'],
    concl: ['هناك حركة ثالثة هي الحركة العشوائية كما في حالة حركة دقائق الغاز عند تصادمها مع بعضها.', 'الحركة العشوائية ليس لها مسار منتظم ولا تتكرر، ويتغير اتجاهها باستمرار.'],
    chal: [{ a: 'gas' }, { a: 'spring' }, { a: 'race' }, { a: 'wheel' }],
    EX: {
      gas: { n: '💨 دقائق غاز في وعاء مغلق (كالكتاب)', box: [-.4, -.6, 10.4, 7.4], top: 118, dtr: .03, maxTr: 900, see: 'كل دقيقة غاز تتحرك بخط مستقيم حتى تصطدم بدقيقة أخرى أو بجدار الوعاء فيتغير اتجاهها فجأة.', tc: '#dc2626',
        init(S) { gasInit(S, 26, [0, 0, 10, 7], 2.6); }, pos(t, S) { return [S.ps[0].x, S.ps[0].y]; },
        sim(S, dt) { const r = .2, n = 3, h = dt / n; for (let k = 0; k < n; k++) { S.ps.forEach(p => { p.x += p.vx * h; p.y += p.vy * h; let hit = false; if (p.x < r) { p.x = r; p.vx = Math.abs(p.vx); hit = true; } if (p.x > 10 - r) { p.x = 10 - r; p.vx = -Math.abs(p.vx); hit = true; } if (p.y < r) { p.y = r; p.vy = Math.abs(p.vy); hit = true; } if (p.y > 7 - r) { p.y = 7 - r; p.vy = -Math.abs(p.vy); hit = true; } if (hit && p === S.ps[0]) { S.hits++; S.hitP.push([p.x, p.y, S.tt]); } });
          for (let i = 0; i < S.ps.length; i++) for (let j = i + 1; j < S.ps.length; j++) { const a = S.ps[i], b = S.ps[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy); if (d < 2 * r && d > 1e-6) { const nx = dx / d, ny = dy / d, rv = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny; if (rv < 0) { a.vx += rv * nx; a.vy += rv * ny; b.vx -= rv * nx; b.vy -= rv * ny; if (i === 0) { S.hits++; S.hitP.push([a.x, a.y, S.tt]); } } const o = (2 * r - d) / 2; a.x -= nx * o; a.y -= ny * o; b.x += nx * o; b.y += ny * o; } } } if (S.hitP.length > 8) S.hitP.shift(); },
        bg(ctx, g, S, t, w, h) { K.bg(ctx, w, h, { bench: false, benchY: h + 5 }); K.raw(ctx, () => { const x0 = g.X(0), y0 = g.Y(7), W = 10 * g.k, Hh = 7 * g.k; ctx.fillStyle = 'rgba(186,230,253,.35)'; ctx.fillRect(x0, y0, W, Hh); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 5; ctx.strokeRect(x0, y0, W, Hh); ctx.fillStyle = '#475569'; ctx.fillRect(x0 - 10, y0 - 14, W + 20, 10); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(x0 + 8, y0 + 8, 6, Hh - 16); }); T(ctx, 'وعاء مغلق فيه غاز', g.X(5), g.Y(7) - 26, { s: 12.5, w: 900, c: '#334155' }); },
        body(ctx, g, S) { S.ps.forEach((p, i) => { if (i) K.ball(ctx, g.X(p.x), g.Y(p.y), Math.max(5, .2 * g.k), '#0ea5e9'); }); const p = S.ps[0]; K.ball(ctx, g.X(p.x), g.Y(p.y), Math.max(7, .26 * g.k), '#dc2626'); } },
      dust: { n: '☀️ ذرات غبار في شعاع الشمس', box: [-.4, -.4, 10.4, 7.4], top: 104, dtr: .03, maxTr: 900, see: 'ذرات الغبار في شعاع الشمس تتحرك هنا وهناك بلا نظام، لأن دقائق الهواء غير المرئية تصطدم بها من كل الجهات.', tc: '#f97316',
        init(S) { gasInit(S, 34, [2.4, .4, 7.4, 6.6], .35); S.kick = 0; }, pos(t, S) { return [S.ps[0].x, S.ps[0].y]; },
        sim(S, dt) { S.kick += dt; const kk = S.kick >= .08; if (kk) S.kick = 0; S.ps.forEach((p, i) => { if (kk) { const a = Math.random() * TAU, m = .25 + Math.random() * .5; p.vx += Math.cos(a) * m; p.vy += Math.sin(a) * m; if (i === 0 && m > .62) { S.hits++; S.hitP.push([p.x, p.y, S.tt]); } } p.vx *= .985; p.vy *= .985; p.vy -= .004; p.x += p.vx * dt; p.y += p.vy * dt;
          const xl = 2.25 + p.y * .19, xr = 7.55 - p.y * .16; if (p.x < xl) { p.x = xl; p.vx = Math.abs(p.vx); } if (p.x > xr) { p.x = xr; p.vx = -Math.abs(p.vx); } if (p.y < .3) { p.y = .3; p.vy = Math.abs(p.vy); } if (p.y > 6.6) { p.y = 6.6; p.vy = -Math.abs(p.vy); } }); if (S.hitP.length > 8) S.hitP.shift(); },
        bg(ctx, g, S, t, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { ctx.fillStyle = '#292524'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#44403c'; ctx.fillRect(0, g.Y(0), w, h - g.Y(0)); ctx.fillStyle = '#fde68a'; ctx.fillRect(g.X(3.5), g.Y(7.4), 3 * g.k, .6 * g.k); ctx.strokeStyle = '#78350f'; ctx.lineWidth = 4; ctx.strokeRect(g.X(3.5), g.Y(7.4), 3 * g.k, .6 * g.k);
          const gr = ctx.createLinearGradient(0, g.Y(7), 0, g.Y(0)); gr.addColorStop(0, 'rgba(254,240,138,.55)'); gr.addColorStop(1, 'rgba(254,240,138,.12)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(g.X(3.5), g.Y(6.8)); ctx.lineTo(g.X(6.5), g.Y(6.8)); ctx.lineTo(g.X(7.6), g.Y(0)); ctx.lineTo(g.X(2.2), g.Y(0)); ctx.closePath(); ctx.fill(); }); T(ctx, 'نافذة', g.X(5), g.Y(7.4) - 12, { s: 12, w: 900, c: '#fde68a' }); },
        body(ctx, g, S) { K.raw(ctx, () => { S.ps.forEach((p, i) => { ctx.fillStyle = i ? 'rgba(255,251,235,.85)' : '#f97316'; ctx.beginPath(); ctx.arc(g.X(p.x), g.Y(p.y), i ? 2.6 : 6, 0, TAU); ctx.fill(); }); }); } }
    },
    feature(ctx, g, S, e, t) {
      if (e === this.EX.gas) S.ps.forEach((p, i) => { if (i % 2 && i) H.arrow(ctx, g.X(p.x), g.Y(p.y), g.X(p.x + p.vx * .32), g.Y(p.y + p.vy * .32), 'rgba(14,116,144,.85)', 2); });
      S.hitP.forEach(q => { const a = clamp(1 - (S.tt - q[2]) / 2.5, .25, 1); T(ctx, '✸', g.X(q[0]), g.Y(q[1]), { s: 20, w: 900, c: `rgba(234,179,8,${a})` }); });
      const p = S.ps[0]; H.arrow(ctx, g.X(p.x), g.Y(p.y), g.X(p.x) + p.vx / (Math.hypot(p.vx, p.vy) || 1) * 46, g.Y(p.y) - p.vy / (Math.hypot(p.vx, p.vy) || 1) * 46, '#dc2626', 3.5);
      T(ctx, 'نتتبّع ' + (e === this.EX.gas ? 'الدقيقة الحمراء' : 'ذرة الغبار البرتقالية') + ': تغيّر اتجاهها ' + S.hits + ' مرة', (g.x0 + g.x1) / 2, 92, { s: 13.5, w: 900, c: '#fff', bg: '#0891b2' });
    },
    readings(S, e) { const p = S.ps[0]; return [rd('الزمن', fmt(S.tt, 3) + ' s'), rd('عدد مرات تغيّر الاتجاه', String(S.hits)), rd('اتجاه الحركة الآن', Math.round(deg(Math.atan2(p.vy, p.vx))) + '°'), rd('شكل المسار', 'غير منتظم')]; }
  });

  /* =========================================================================================
     8-و) لعبة: صنّف الحركات (ص 12 شكل 4، مراجعة الفصل س5) — صنّف الحركات المتحركة
     ========================================================================================= */
  (() => {
    const anim = (ctx, id, cx, cy, W, Hh, t) => K.raw(ctx, () => {
      ctx.save(); ctx.beginPath(); ctx.rect(cx - W / 2, cy - Hh / 2, W, Hh); ctx.clip(); ctx.lineCap = 'round';
      const sky = (c1, c2) => { const g = ctx.createLinearGradient(0, cy - Hh / 2, 0, cy + Hh / 2); g.addColorStop(0, c1); g.addColorStop(1, c2); ctx.fillStyle = g; ctx.fillRect(cx - W / 2, cy - Hh / 2, W, Hh); };
      const B = cy + Hh / 2, L = cx - W / 2;
      switch (id) {
        case 'run': { sky('#fecaca', '#f87171'); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(L, cy - Hh / 2 + k * Hh / 4); ctx.lineTo(L + W, cy - Hh / 2 + k * Hh / 4); ctx.stroke(); } for (let k = 0; k < 3; k++) { const x = L + ((t * (40 + k * 6) + k * 30) % (W + 30)) - 15; H.runner(ctx, x, cy - Hh / 2 + (k + 1) * Hh / 4 + 6, .26, t * 9 + k); } break; }
        case 'slide': { sky('#e0f2fe', '#bae6fd'); ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(L + 14, cy - Hh / 2 + 10); ctx.lineTo(L + W - 10, B - 6); ctx.stroke(); const f = (t * .45) % 1, x = L + 14 + f * (W - 24), y = cy - Hh / 2 + 10 + f * (Hh - 16); ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.arc(x, y - 10, 6, 0, TAU); ctx.fill(); ctx.fillStyle = '#f2c49b'; ctx.beginPath(); ctx.arc(x + 2, y - 19, 4.5, 0, TAU); ctx.fill(); break; }
        case 'bike': { sky('#dcfce7', '#86efac'); ctx.fillStyle = '#94a3b8'; ctx.fillRect(L, B - 10, W, 10); const x = L + ((t * 34) % (W + 40)) - 20, y = B - 18; ctx.strokeStyle = '#111827'; ctx.lineWidth = 2; [x - 9, x + 9].forEach(xx => { ctx.beginPath(); ctx.arc(xx, y, 7, 0, TAU); ctx.stroke(); }); ctx.strokeStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(x - 9, y); ctx.lineTo(x, y - 8); ctx.lineTo(x + 9, y); ctx.moveTo(x, y - 8); ctx.lineTo(x + 6, y - 12); ctx.stroke(); ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.arc(x + 1, y - 20, 4, 0, TAU); ctx.fill(); break; }
        case 'bask': { sky('#ede9fe', '#ddd6fe'); const f = (t * .5) % 1, x = L + 12 + f * (W - 34), y = B - 10 - Math.sin(f * Math.PI) * (Hh - 22); ctx.strokeStyle = 'rgba(37,99,235,.5)'; ctx.setLineDash([3, 4]); ctx.lineWidth = 1.5; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const ff = k / 20; ctx.lineTo(L + 12 + ff * (W - 34), B - 10 - Math.sin(ff * Math.PI) * (Hh - 22)); } ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#ea580c'; ctx.beginPath(); ctx.arc(x, y, 6, 0, TAU); ctx.fill(); ctx.strokeStyle = '#ea580c'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(L + W - 26, B - 12); ctx.lineTo(L + W - 8, B - 12); ctx.stroke(); break; }
        case 'race': { sky('#d1fae5', '#a7f3d0'); ctx.strokeStyle = '#475569'; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(cx - W / 2 + 10, cy + Hh / 2 - 6, Hh * .75, -Math.PI / 2, 0); ctx.stroke(); const a = -Math.PI / 2 + ((t * .6) % 1) * Math.PI / 2, x = cx - W / 2 + 10 + Math.cos(a) * Hh * .75, y = cy + Hh / 2 - 6 + Math.sin(a) * Hh * .75; ctx.save(); ctx.translate(x, y); ctx.rotate(a + Math.PI / 2); ctx.fillStyle = '#f8fafc'; rr(ctx, -9, -4, 18, 8, 3); ctx.fill(); ctx.fillStyle = '#111827'; ctx.fillRect(-6, -5, 3, 10); ctx.fillRect(4, -5, 3, 10); ctx.restore(); break; }
        case 'wheel': { sky('#1e3a8a', '#1e40af'); const R = Hh * .38; ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy - 2, R, 0, TAU); ctx.stroke(); for (let k = 0; k < 8; k++) { const a = k * TAU / 8 + t * .7; ctx.beginPath(); ctx.moveTo(cx, cy - 2); ctx.lineTo(cx + Math.cos(a) * R, cy - 2 + Math.sin(a) * R); ctx.stroke(); ctx.fillStyle = ['#ef4444', '#22c55e', '#38bdf8', '#f472b6'][k % 4]; ctx.fillRect(cx + Math.cos(a) * R - 4, cy - 2 + Math.sin(a) * R, 8, 7); } ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx - 14, B); ctx.moveTo(cx, cy); ctx.lineTo(cx + 14, B); ctx.stroke(); break; }
        case 'fan': { sky('#f8fafc', '#e2e8f0'); ctx.fillStyle = '#78350f'; for (let k = 0; k < 5; k++) { const a = k * TAU / 5 + t * 5; ctx.save(); ctx.translate(cx, cy); ctx.rotate(a); ctx.beginPath(); ctx.ellipse(Hh * .22, 0, Hh * .22, 6, 0, 0, TAU); ctx.fill(); ctx.restore(); } ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.arc(cx, cy, 8, 0, TAU); ctx.fill(); ctx.fillRect(cx - 2, cy - Hh / 2, 4, Hh / 2 - 6); break; }
        case 'sat': { sky('#0f172a', '#1e293b'); ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(cx, cy, 13, 0, TAU); ctx.fill(); ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.arc(cx - 3, cy - 3, 6, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(cx, cy, W * .32, Hh * .36, 0, 0, TAU); ctx.stroke(); const a = t * 1.4, x = cx + Math.cos(a) * W * .32, y = cy + Math.sin(a) * Hh * .36; ctx.fillStyle = '#e2e8f0'; ctx.fillRect(x - 3, y - 3, 6, 6); ctx.fillStyle = '#60a5fa'; ctx.fillRect(x - 11, y - 2, 6, 4); ctx.fillRect(x + 5, y - 2, 6, 4); break; }
        case 'swing': { sky('#fef3c7', '#fde68a'); const px = cx, py = cy - Hh / 2 + 6, a = .6 * Math.sin(t * 2.4), l = Hh * .7; ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px - 30, py); ctx.lineTo(px + 30, py); ctx.stroke(); const sx = px + Math.sin(a) * l, sy = py + Math.cos(a) * l; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy); ctx.stroke(); ctx.fillStyle = '#7c2d12'; ctx.fillRect(sx - 8, sy - 2, 16, 4); ctx.fillStyle = '#ec4899'; ctx.beginPath(); ctx.arc(sx, sy - 9, 6, 0, TAU); ctx.fill(); ctx.fillStyle = '#f2c49b'; ctx.beginPath(); ctx.arc(sx, sy - 19, 4.5, 0, TAU); ctx.fill(); break; }
        case 'spring': { sky('#f1f5f9', '#e2e8f0'); ctx.fillStyle = '#475569'; ctx.fillRect(cx - 24, cy - Hh / 2 + 2, 48, 5); const yb = cy + 8 + Math.sin(t * 4) * 10; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy - Hh / 2 + 7); for (let k = 1; k < 12; k++) ctx.lineTo(cx + (k % 2 ? 7 : -7), cy - Hh / 2 + 7 + (yb - 12 - (cy - Hh / 2 + 7)) * k / 12); ctx.lineTo(cx, yb - 12); ctx.stroke(); ctx.fillStyle = '#b45309'; ctx.fillRect(cx - 10, yb - 12, 20, 18); break; }
        case 'pend': { sky('#fef9c3', '#fde68a'); ctx.fillStyle = '#92400e'; ctx.fillRect(cx - 20, cy - Hh / 2, 40, Hh); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(cx, cy - Hh / 2 + 16, 12, 0, TAU); ctx.fill(); const a = .35 * Math.sin(t * 4.4), py = cy - Hh / 2 + 28; ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, py); ctx.lineTo(cx + Math.sin(a) * (Hh - 40), py + Math.cos(a) * (Hh - 40)); ctx.stroke(); ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(cx + Math.sin(a) * (Hh - 40), py + Math.cos(a) * (Hh - 40), 6, 0, TAU); ctx.fill(); break; }
        case 'gas': { sky('#f0f9ff', '#e0f2fe'); for (let k = 0; k < 12; k++) { const x = cx + Math.sin(t * (1.3 + k * .17) + k * 2) * W * .4, y = cy + Math.cos(t * (1.1 + k * .13) + k) * Hh * .38; ctx.fillStyle = '#0ea5e9'; ctx.beginPath(); ctx.arc(x, y, 3.5, 0, TAU); ctx.fill(); } break; }
      }
      ctx.restore(); });
    H.anim = anim;
    const IT = [
      { id: 'run', label: 'عدّاؤون في سباق', bin: 'line' }, { id: 'wheel', label: 'دولاب الهواء', bin: 'rot', why: 'دولاب الهواء يدور في مسار مغلق ويكرر حركته — حركة دورية.' }, { id: 'swing', label: 'أرجوحة', bin: 'vib', why: 'الأرجوحة تذهب وتعود حول موضع الاتزان — حركة دورية اهتزازية.' },
      { id: 'bask', label: 'رمية كرة سلة', bin: 'curve', why: 'الكرة تبدأ من نقطة وتنتهي في نقطة على مسار منحنٍ — انتقالية.' }, { id: 'fan', label: 'مروحة سقفية', bin: 'rot' }, { id: 'slide', label: 'طفل على زحليقة', bin: 'line' },
      { id: 'spring', label: 'ثقل معلّق بنابض', bin: 'vib' }, { id: 'race', label: 'سيارة في منعطف', bin: 'curve', why: 'سيارة تدور في طريق منحنٍ: حركة انتقالية على مسار منحنٍ.' }, { id: 'sat', label: 'قمر صناعي حول الأرض', bin: 'rot', why: 'يدور حول الأرض في مسار مغلق ويكرر دورته على فترات متساوية — حركة دورية.' },
      { id: 'bike', label: 'دراجة على طريق مستقيم', bin: 'line' }, { id: 'pend', label: 'بندول ساعة', bin: 'vib' }, { id: 'gas', label: 'دقائق غاز', bin: 'rand', why: 'دقائق الغاز تتصادم وتتحرك في كل الاتجاهات — حركة عشوائية.' }
    ];
    const BINS = [{ id: 'line', label: 'انتقالية', sub: 'مسار مستقيم', col: '#2563eb' }, { id: 'curve', label: 'انتقالية', sub: 'مسار منحنٍ', col: '#ea580c' }, { id: 'rot', label: 'دورية', sub: 'مسار مغلق', col: '#7c3aed' }, { id: 'vib', label: 'دورية', sub: 'اهتزازية', col: '#db2777' }, { id: 'rand', label: 'عشوائية', sub: 'كل الاتجاهات', col: '#0891b2' }];
    const so = Sorter({ items: () => IT, bins: () => BINS, cols: 4, ch: 96, top: 64,
      chip: it => it.label.split(' ')[0] + (it.label.split(' ')[1] ? ' ' + it.label.split(' ')[1] : ''),
      drawItem(ctx, it, x, y, cw, ch, S, o) {
        K.raw(ctx, () => { ctx.save(); if (o.lift) { ctx.shadowColor = 'rgba(15,23,42,.35)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 6; } ctx.fillStyle = '#fff'; rr(ctx, x - cw / 2, y - ch / 2, cw, ch, 12); ctx.fill(); ctx.restore(); });
        anim(ctx, it.id, x, y - 12, cw - 10, ch - 34, S.t);
        K.raw(ctx, () => { ctx.strokeStyle = o.bad ? '#dc2626' : '#94a3b8'; ctx.lineWidth = o.bad ? 3 : 1.6; rr(ctx, x - cw / 2, y - ch / 2, cw, ch, 12); ctx.stroke(); });
        T(ctx, it.label, x, y + ch / 2 - 12, { s: 12.5, w: 900 });
      } });
    P8({
      id: 'g8_k_sort', ch: 21, sec: 'الدرس الثاني: الحركة وأنواعها', page: 12, fig: 'شكل 4', kind: 'نشاط', title: 'أنواع الحركة: انتقالية ودورية واهتزازية',
      desc: 'نشاهد حركات متحركة من الحياة (عدّاؤون، دولاب الهواء، أرجوحة، مروحة، قمر صناعي، نابض…) ونسحب كل حركة إلى نوعها: انتقالية على مسار مستقيم أو منحنٍ، دورية في مسار مغلق، دورية اهتزازية، أو عشوائية.',
      tags: 'أنواع الحركة انتقالية دورية اهتزازية عشوائية دولاب الهواء أرجوحة بندول',
      tools: ['صور متحركة للحركات'],
      steps: ['راقب كل بطاقة: كيف يتحرك الجسم؟ هل له نقطة بداية ونهاية؟ هل تتكرر حركته؟', 'اسحب البطاقة إلى صندوق نوع الحركة المناسب.', 'إذا أخطأت ستهتز البطاقة وتظهر لك نصيحة — حاول مرة أخرى.', 'أكمل تصنيف كل الحركات (مثل سؤال 5 في مراجعة الفصل).'],
      concl: ['الحركة الانتقالية: حركة تتميز بوجود نقطة بداية ونقطة نهاية، وتكون إما في خط مستقيم (حركة القطار على سكته) أو في مسار منحنٍ (دوران السيارة في طريق منحنٍ).', 'الحركة الدورية: حركة تكرر نفسها على فترات زمنية متساوية، إما في مسار مغلق مثل حركة الكواكب حول الشمس، أو اهتزازية مثل حركة بندول الساعة.', 'هناك حركة ثالثة هي الحركة العشوائية كما في حالة حركة دقائق الغاز عند تصادمها مع بعضها.'],
      laws: [],
      fact: ['حقيقة علمية: هناك حركة ثالثة هي الحركة العشوائية كما في حالة حركة دقائق الغاز عند تصادمها مع بعضها.', 'الأرض تتحرك حركتين دوريتين معاً: تدور حول نفسها كل يوم، وحول الشمس كل سنة.'],
      controls: [TG('tip', 'رسالة التصحيح والتلميح', true, null, 'labels'), BT('', [{ t: 'أعد البطاقات', on: S => so.reset(S) }])],
      setup(S) { so.reset(S); },
      draw(ctx, w, h, S) { K.bg(ctx, w, h, { bench: false, benchY: h + 5 }); H.banner(ctx, w, 'اسحب كل حركة إلى نوعها', '#db2777'); so.draw(ctx, w, h, S); const L = so.left(S); T(ctx, L ? 'بقي ' + L + ' من ' + IT.length : 'أحسنت! صنّفت كل الحركات 🎉', 74, h - 50, { s: 13, w: 900, c: '#fff', bg: L ? '#475569' : '#16a34a', a: 'left' }); },
      drags(S) { return so.drags(S); },
      readings(S) { const s = S.so || {}; return [rd('الصحيح', String(s.ok || 0)), rd('المحاولات الخاطئة', String(s.bad || 0)), rd('المتبقي', String(so.left(S)))]; },
      explain(S) { const s = S.so || {}; if (s.msg && s.mt > 0) return s.msg; return 'سؤالان يساعدانك: <b>هل للحركة نقطة بداية ونهاية؟</b> (انتقالية) أم <b>تكرر نفسها على فترات زمنية متساوية؟</b> (دورية). وإذا كان الجسم يذهب ويعود حول موضع اتزانه فهي <b>اهتزازية</b>.'; },
      quiz: [
        { q: 'حركة بندول الساعة حركة:', o: ['انتقالية', 'دورية اهتزازية', 'عشوائية'], a: 1, why: 'تكرر نفسها على فترات زمنية متساوية ذهاباً وإياباً (التفكير الناقد 2-أ).' },
        { q: 'حركتك من منزلك إلى المدرسة حركة:', o: ['انتقالية', 'دورية', 'اهتزازية'], a: 0, why: 'لها نقطة بداية (المنزل) ونقطة نهاية (المدرسة) (التفكير الناقد 2-ب).' },
        { q: 'حركة سيارات السباق حول مضمار السباق حركة:', o: ['دورية', 'اهتزازية', 'عشوائية'], a: 0, why: 'تدور في مسار مغلق وتكرر الدورات (التفكير الناقد 2-جـ).' }
      ]
    });
  })();

  /* =========================================================================================
     9) نشاط: الحركة الاهتزازية (ص 13) — البندول البسيط
     ========================================================================================= */
  (() => {
    const g0 = 9.8;
    const SC = { ball: { n: '⚪ كرة وخيط على حامل (كالكتاب)', Lmin: .2, Lmax: 1.2 }, swing: { n: '🧒 أرجوحة في الحديقة', Lmin: 1.5, Lmax: 3 }, clock: { n: '🕰️ بندول ساعة الحائط', Lmin: .25, Lmax: .25 }, spring: { n: '🟫 ثقل معلّق بنابض', Lmin: 0, Lmax: 0 } };
    const kS = 20;
    const reset = S => { S.th = 0; S.om = 0; S.y = 0; S.vy = 0; S.held = false; S.cnt = 0; S.tm = 0; S.go = false; S.done = false; S.th0 = 0; S.hist = []; S.amp = 0; S.tc = 0; S.lapT = []; };
    const VCH = [{ a: 'spring' }, { a: 'swing' }, { a: 'wheel' }, { a: 'gas' }];
    const Lof = S => S.p.sc === 'clock' ? .25 : S.p.sc === 'swing' ? clamp(S.p.L, 1.5, 3) : clamp(S.p.L, .2, 1.2);
    const geo = S => { const w = S.W, h = S.H, sc = S.p.sc, L = Lof(S), top = sc === 'swing' ? 120 : 132; const ppm = sc === 'swing' ? (h * .56) / 3 : sc === 'clock' ? 560 : (h * .5) / 1.2; return { w, h, cx: 64 + (w - 64) * .58, cy: top, L, ppm, R: sc === 'spring' ? 0 : L * ppm }; };
    const disp = S => S.p.sc === 'spring' ? S.y : Lof(S) * Math.sin(S.th); // m
    P8({
      id: 'g8_pendulum', ch: 21, sec: 'الدرس الثاني: الحركة وأنواعها', page: 13, kind: 'نشاط', title: 'نشاط: الحركة الاهتزازية (البندول)',
      desc: 'نزيح كرة البندول بزاوية مناسبة ونتركها فتهتز ذهاباً وإياباً حول موضع اتزانها. نعدّ الاهتزازات ونقيس زمنها فنحسب زمن الاهتزازة الواحدة، ونرسم مسار الحركة. أمثلة: كرة وخيط، أرجوحة، بندول ساعة، ثقل معلق بنابض.',
      tags: 'حركة اهتزازية دورية بندول أرجوحة نابض موضع الاتزان زمن الاهتزازة',
      tools: ['كرة صغيرة', 'خيط', 'حامل ذو قاعدة', 'ساعة توقيت'],
      steps: ['اسحب الكرة جانباً بزاوية مناسبة (يظهر قوس المسار).', 'اترك الكرة: ماذا تلاحظ؟ (تبدأ ساعة التوقيت وعدّاد الاهتزازات تلقائياً).', 'انتظر حتى تكتمل 10 اهتزازات فتتوقف الساعة ويُحسب زمن الاهتزازة الواحدة T = t ÷ n.', 'كرر بإزاحة أخرى وبطول خيط آخر، وسجل النتائج.', 'استنتج نوع الحركة وميزاتها، وجرّب الأرجوحة وبندول الساعة والنابض كأمثلة لهذا النوع.'],
      concl: ['تتحرك الكرة ذهاباً وإياباً حول موضع اتزانها وتكرر حركتها على فترات زمنية متساوية: هذه حركة دورية اهتزازية.', 'مسار حركة كرة البندول جزء من دائرة (قوس) بين موضعي أقصى إزاحة.', 'زمن الاهتزازة الواحدة T = زمن الاهتزازات ÷ عددها، ولا يتغير تقريباً بتغير الإزاحة الصغيرة، ويزداد بزيادة طول الخيط.', 'من أمثلتها: بندول الساعة، الأرجوحة، الثقل المعلق بنابض، أوتار الآلات الموسيقية.'],
      laws: ['g8_period'],
      fact: ['لاحظ العالم گاليليو أن زمن اهتزازة ثريا الكنيسة لا يتغير مع تناقص سعة اهتزازها، فاستعمل نبضه لقياسه! ومن ذلك جاءت فكرة ساعة البندول.', 'بندول ساعة الحائط طوله نحو 25 cm فيكمل اهتزازة كاملة في ثانية واحدة تقريباً.'],
      controls: [SEL('sc', 'المثال', Object.keys(SC).map(k => [k, SC[k].n]), 'ball', (v, S) => { reset(S); if (v === 'swing') setParam(S, 'L', 2.4); else if (v === 'ball') setParam(S, 'L', .6); }),
        R('L', 'طول الخيط L', .2, 3, .6, .05, 'm', (v, S) => reset(S)), R('mk', 'كتلة الثقل (للنابض)', 100, 1000, 300, 50, 'g', (v, S) => reset(S)), R('n', 'عدد الاهتزازات المطلوب عدّها', 1, 20, 10, 1),
        TG('arc', 'مسار الحركة (القوس)', true, null, 'vector'), TG('pos', 'موضع الاتزان وأقصى إزاحة', true, null, 'labels'), TG('ghost', 'مواضع الكرة (كالشكل)', false, null, 'eye'), TG('graph', 'منحني الإزاحة – الزمن', true, null, 'graph'), TG('vel', 'سهم السرعة', false, null, 'velocity'),
        BT('', [{ t: 'أزِح بزاوية 20° واترك ▶', on: S => { reset(S); if (S.p.sc === 'spring') S.y = .08; else S.th = rad(20); S.th0 = S.p.sc === 'spring' ? S.y : S.th; S.amp = Math.abs(S.th0); S.go = true; } }, { t: 'أوقف', on: S => reset(S) }, { t: '🎯 تحدٍّ: ما نوع الحركة؟', on: S => { const c = !S.chal; reset(S); S.cq = null; S.chal = c; } }])],
      setup(S) { reset(S); S.chal = false; },
      update(S, dt) {
        if (S.held || !S.go || S.chal) return; const sc = S.p.sc, b = .04;
        const n = Math.max(1, Math.ceil(dt / .004)), h = dt / n;
        for (let i = 0; i < n; i++) {
          const prev = sc === 'spring' ? S.vy : S.om;
          if (sc === 'spring') { const k = kS, m = S.p.mk / 1000; S.vy += (-(k / m) * S.y - b * S.vy) * h; S.y += S.vy * h; }
          else { S.om += (-(g0 / Lof(S)) * Math.sin(S.th) - b * S.om) * h; S.th += S.om * h; }
          const cur = sc === 'spring' ? S.vy : S.om, x = sc === 'spring' ? S.y : S.th, side = Math.sign(S.th0) || 1;
          if (!S.done) { S.tm += h; if (Math.sign(prev) === side && Math.sign(cur) !== side && Math.sign(x) === side) { S.cnt++; S.tc = S.tm; S.lapT.push(S.tm); if (S.cnt >= S.p.n) { S.done = true; H.snd('ok'); K.cheer(S, S.W / 2, S.H * .3); } } }
        }
        S.ht = (S.ht || 0) + dt; if (S.ht > .04) { S.ht = 0; (S.hist = S.hist || []).push([S.tm, disp(S) * 100]); if (S.hist.length > 400) S.hist.shift(); }
      },
      draw(ctx, w, h, S) {
        if (S.chal) { CH.draw(ctx, w, h, S, VCH); return; }
        const g = geo(S), p = S.p, sc = p.sc, L = g.L;
        if (sc === 'swing') H.sky(ctx, w, h, h * .82, {}); else K.bg(ctx, w, h, { benchY: h * .84 });
        H.banner(ctx, w, 'اسحب الكرة جانباً ثم اتركها — عُدّ الاهتزازات', '#db2777');
        const bob = th => [g.cx + Math.sin(th) * g.R, g.cy + Math.cos(th) * g.R];
        if (sc === 'spring') {
          const ppm = 900, y0 = g.cy + 230, yb = y0 + S.y * ppm;
          K.raw(ctx, () => { ctx.fillStyle = '#8a5a33'; ctx.fillRect(g.cx - 160, h * .84 - 12, 200, 12); ctx.fillStyle = '#64748b'; ctx.fillRect(g.cx - 150, g.cy - 30, 12, h * .84 - g.cy + 18); ctx.fillRect(g.cx - 150, g.cy - 30, 190, 12);
            ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.cx, g.cy - 18); const nC = 16; for (let k = 1; k < nC; k++) ctx.lineTo(g.cx + (k % 2 ? 16 : -16), g.cy - 18 + (yb - 30 - g.cy + 18) * k / nC); ctx.lineTo(g.cx, yb - 30); ctx.stroke();
            const s = Math.cbrt(p.mk / 300); ctx.fillStyle = '#b45309'; rr(ctx, g.cx - 30 * s, yb - 30, 60 * s, 56 * s, 6); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '800 13px ui-monospace'; ctx.textAlign = 'center'; ctx.direction = 'ltr'; ctx.fillText(p.mk + ' g', g.cx, yb - 30 + 30 * s); });
          if (p.pos) { K.raw(ctx, () => { ctx.strokeStyle = '#16a34a'; ctx.setLineDash([6, 5]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.cx - 120, y0); ctx.lineTo(g.cx + 120, y0); ctx.stroke(); ctx.setLineDash([]); }); T(ctx, 'موضع الاتزان', g.cx + 170, y0, { s: 12, w: 900, c: '#fff', bg: '#16a34a' });
            if (S.amp) [1, -1].forEach(sg => { const yy = y0 + sg * S.amp * ppm; K.raw(ctx, () => { ctx.strokeStyle = '#dc2626'; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(g.cx - 90, yy); ctx.lineTo(g.cx + 90, yy); ctx.stroke(); ctx.setLineDash([]); }); T(ctx, 'أقصى إزاحة', g.cx + 150, yy, { s: 11.5, w: 900, c: '#dc2626' }); }); }
          if (p.vel && Math.abs(S.vy) > .02) H.arrow(ctx, g.cx + 60, yb, g.cx + 60, yb + S.vy * 140, '#16a34a', 4, 'v');
        } else {
          // support
          K.raw(ctx, () => {
            if (sc === 'ball') { ctx.fillStyle = '#c2410c'; rr(ctx, g.cx - 170, h * .84 - 18, 150, 18, 4); ctx.fill(); ctx.fillStyle = '#475569'; ctx.fillRect(g.cx - 110, g.cy - 14, 9, h * .84 - g.cy); ctx.fillRect(g.cx - 110, g.cy - 14, 140, 8); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(g.cx, g.cy - 6, 6, 0, TAU); ctx.fill(); }
            else if (sc === 'swing') { ctx.strokeStyle = '#334155'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(g.cx - 170, g.cy - 6); ctx.lineTo(g.cx + 170, g.cy - 6); ctx.moveTo(g.cx - 160, g.cy - 6); ctx.lineTo(g.cx - 220, h * .82); ctx.moveTo(g.cx - 160, g.cy - 6); ctx.lineTo(g.cx - 110, h * .82); ctx.moveTo(g.cx + 160, g.cy - 6); ctx.lineTo(g.cx + 110, h * .82); ctx.moveTo(g.cx + 160, g.cy - 6); ctx.lineTo(g.cx + 220, h * .82); ctx.stroke(); ctx.fillStyle = '#d6b37a'; ctx.fillRect(g.cx - 260, h * .82, 520, 40); }
            else { ctx.fillStyle = '#7c2d12'; rr(ctx, g.cx - 95, g.cy - 110, 190, 300, 18); ctx.fill(); ctx.fillStyle = '#fef3c7'; ctx.beginPath(); ctx.arc(g.cx, g.cy - 40, 62, 0, TAU); ctx.fill(); ctx.strokeStyle = '#78350f'; ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = '#1e293b'; ctx.font = '800 12px ui-monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; for (let k = 1; k <= 12; k++) { const a = k * TAU / 12; ctx.fillText(String(k), g.cx + Math.sin(a) * 50, g.cy - 40 - Math.cos(a) * 50); } ctx.textBaseline = 'alphabetic'; ctx.strokeStyle = '#111827'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.cx, g.cy - 40); ctx.lineTo(g.cx + Math.sin(S.t * .1) * 34, g.cy - 40 - Math.cos(S.t * .1) * 34); ctx.stroke(); ctx.fillStyle = 'rgba(254,243,199,.35)'; rr(ctx, g.cx - 80, g.cy + 30, 160, 140, 10); ctx.fill(); }
          });
          const a = L * g.ppm;
          if (p.arc && S.amp) K.raw(ctx, () => { ctx.strokeStyle = '#db2777'; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R, Math.PI / 2 - S.amp, Math.PI / 2 + S.amp); ctx.stroke(); ctx.setLineDash([]); });
          if (p.pos) { K.raw(ctx, () => { ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.moveTo(g.cx, g.cy); ctx.lineTo(g.cx, g.cy + g.R + 40); ctx.stroke(); ctx.setLineDash([]); }); T(ctx, 'موضع الاتزان', g.cx, g.cy + g.R + (sc === 'swing' ? 40 : 54), { s: 12, w: 900, c: '#fff', bg: '#16a34a' });
            if (S.amp) [1, -1].forEach(sg => { const q = bob(sg * S.amp); T(ctx, 'أقصى إزاحة', q[0] + sg * 46, q[1] - 30, { s: 11.5, w: 900, c: '#fff', bg: '#dc2626' }); }); }
          if (p.ghost && S.amp) [-S.amp, 0, S.amp].forEach(t2 => { const q = bob(t2); K.raw(ctx, () => { ctx.globalAlpha = .3; ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(g.cx, g.cy); ctx.lineTo(q[0], q[1]); ctx.stroke(); }); if (sc !== 'swing') K.ball(ctx, q[0], q[1], 14, '#7e22ce'); K.raw(ctx, () => { ctx.globalAlpha = 1; }); });
          const q = bob(S.th);
          if (sc === 'swing') K.raw(ctx, () => { ctx.save(); ctx.translate(g.cx, g.cy); ctx.rotate(-S.th); ctx.strokeStyle = '#78350f'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-24, 0); ctx.lineTo(-24, a); ctx.moveTo(24, 0); ctx.lineTo(24, a); ctx.stroke(); ctx.fillStyle = '#7c2d12'; rr(ctx, -34, a - 4, 68, 10, 3); ctx.fill();
            // seated child facing right: hips on the seat, thighs forward, shins down, hands on the ropes
            ctx.lineCap = 'round'; ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(-6, a - 8); ctx.lineTo(26, a - 8); ctx.lineTo(30, a + 26); ctx.stroke(); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.ellipse(34, a + 28, 8, 4, 0, 0, TAU); ctx.fill();
            ctx.fillStyle = '#ec4899'; rr(ctx, -16, a - 54, 22, 46, 8); ctx.fill(); ctx.strokeStyle = '#f2c49b'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-2, a - 48); ctx.lineTo(16, a - 36); ctx.lineTo(24, a - 46); ctx.stroke();
            ctx.fillStyle = '#f2c49b'; ctx.beginPath(); ctx.arc(-4, a - 66, 12, 0, TAU); ctx.fill(); ctx.fillStyle = '#7c2d12'; ctx.beginPath(); ctx.arc(-7, a - 70, 12, Math.PI * .8, Math.PI * 2.1); ctx.fill(); ctx.lineCap = 'butt'; ctx.restore(); });
          else K.raw(ctx, () => { ctx.strokeStyle = sc === 'clock' ? '#b45309' : '#334155'; ctx.lineWidth = sc === 'clock' ? 4 : 1.8; ctx.beginPath(); ctx.moveTo(g.cx, g.cy); ctx.lineTo(q[0], q[1]); ctx.stroke(); });
          if (sc === 'ball') K.ball(ctx, q[0], q[1], 16, '#7e22ce'); else if (sc === 'clock') K.ball(ctx, q[0], q[1], 18, '#f59e0b');
          if (p.vel && Math.abs(S.om) > .05) { const v = S.om * L, tx = Math.cos(S.th), ty = -Math.sin(S.th), qq = sc === 'swing' ? [q[0], q[1] - 40] : q; H.arrow(ctx, qq[0], qq[1], qq[0] + tx * v * 60, qq[1] + ty * v * 60, '#16a34a', 4, 'v'); }
          if (!S.go && !S.held && !S.amp) T(ctx, 'اسحبني جانباً ثم اتركني ✋', q[0], q[1] + (sc === 'swing' ? 60 : 40), { s: 12.5, w: 900, c: '#fff', bg: '#db2777' });
          if (S.held) T(ctx, 'الزاوية ' + Math.round(Math.abs(deg(S.th))) + '°', q[0], q[1] + 40, { s: 13, w: 900, c: '#fff', bg: '#334155' });
        }
        // stopwatch + counter
        const swx = w - 96, swy = 130; H.stopwatch(ctx, swx, swy, 54, S.tm, S.go && !S.done);
        H.box(ctx, swx, 214, 170, 'عدد الاهتزازات', [[S.cnt + ' / ' + p.n, { s: 24, w: 900, c: '#db2777', mono: 1 }]], { bd: '#db2777' });
        if (S.lapT.length && !S.done) { const L = S.lapT.slice(-4).map((t2, i, A) => { const j = S.lapT.length - A.length + i, d = t2 - (j ? S.lapT[j - 1] : 0); return ['الاهتزازة ' + (j + 1) + ':  ' + fmt(d, 3) + ' s', { s: 12.5, c: '#15803d' }]; }); H.box(ctx, swx - 10, 300, 190, 'زمن كل اهتزازة', L, { bd: '#16a34a', lh: 20 }); if (S.lapT.length >= 2) T(ctx, 'أزمنة متساوية ⇐ حركة دورية', swx - 10, 300 + 32 + L.length * 20 + 14, { s: 11.5, w: 900, c: '#fff', bg: '#16a34a' }); }
        C2.btn(ctx, w - 82, h - 112, 124, 34, '🎯 التحدي', { col: '#0f766e', s: 13 });
        if (S.done) H.box(ctx, swx - 10, 300, 190, 'زمن الاهتزازة الواحدة', [['T = t / n', { mono: 1, s: 13 }], [fmt(S.tm, 3) + ' / ' + p.n, { mono: 1, s: 13 }], ['T = ' + fmt(S.tm / p.n, 3) + ' s', { mono: 1, s: 17, w: 900, c: '#16a34a' }]], { bd: '#16a34a' });
        if (p.graph && S.hist && S.hist.length > 1) { const t1 = S.hist[S.hist.length - 1][0], A = Math.max(2, ...S.hist.map(q => Math.abs(q[1]))); const x0 = t1 > 8 ? t1 - 8 : 0; H.graph(ctx, 80, h - 250, 260, 150, { title: 'الإزاحة – الزمن', xl: 't (s)', yl: 'x (cm)', xmax: 8, ymin: -Math.ceil(A), ymax: Math.ceil(A), series: [{ pts: S.hist.map(q => [q[0] - x0, q[1]]).filter(q => q[0] >= 0), c: '#db2777' }] }); }
        K.party(ctx, S);
      },
      drags(S) {
        if (S.chal) return CH.drags(S, VCH);
        const chGo = { id: 'chGo', x: S.W - 82, y: S.H - 112, w: 124, h: 34, hint: false, tip: 'تحدٍّ: ما نوع هذه الحركة؟', click: S2 => { reset(S2); S2.cq = null; S2.chal = true; } };
        return [chGo].concat(this.drags0(S));
      },
      drags0(S) {
        const g = geo(S), sc = S.p.sc;
        if (sc === 'spring') { const y0 = g.cy + 230, yb = y0 + S.y * 900; return [{ id: 'mass', x: g.cx, y: yb, w: 80, h: 70, axis: 'y', keep: true, idle: 'اسحب الثقل للأسفل ثم اتركه ✋', tip: 'اسحب الثقل للأسفل أو الأعلى ثم اتركه',
          down: S => { reset(S); S.held = true; }, drag: (S, d) => { S.y = clamp((d.y - y0) / 900, -.12, .12); H.act(S, 'm'); }, up: S => { S.held = false; if (Math.abs(S.y) > .005) { S.th0 = S.y; S.amp = Math.abs(S.y); S.go = true; S.vy = 0; } } }]; }
        const q = [g.cx + Math.sin(S.th) * g.R, g.cy + Math.cos(S.th) * g.R - (sc === 'swing' ? 30 : 0)];
        return [{ id: 'bob', x: q[0], y: q[1], r: sc === 'swing' ? 46 : 30, cx: g.cx, cy: g.cy, keep: true, idle: 'اسحبني جانباً ثم اتركني ✋', tip: 'اسحب لتغيير زاوية الإزاحة ثم اترك',
          down: S => { reset(S); S.held = true; }, drag: (S, d) => { S.th = clamp(Math.atan2(d.x - g.cx, d.y - g.cy), -rad(60), rad(60)); S.amp = Math.abs(S.th); H.act(S, 'b'); }, up: S => { S.held = false; if (Math.abs(S.th) > rad(2)) { S.th0 = S.th; S.amp = Math.abs(S.th); S.go = true; S.om = 0; } } }];
      },
      readings(S) { const sc = S.p.sc; return [rd(sc === 'spring' ? 'كتلة الثقل' : 'طول الخيط L', sc === 'spring' ? S.p.mk + ' g' : fmt(Lof(S), 3) + ' m'), rd('الإزاحة الآن', fmt(disp(S) * 100, 3) + ' cm'), rd('عدد الاهتزازات n', String(S.cnt)), rd('الزمن t', fmt(S.tm, 3) + ' s'), rd('زمن الاهتزازة T = t/n', S.cnt ? fmt(S.tc / S.cnt, 3) + ' s' : '—')]; },
      record(S) { if (!S.cnt) { Runner.toast('اترك البندول يهتز وعدّ اهتزازة واحدة على الأقل', 'info'); return null; } return { L: S.p.sc === 'spring' ? S.p.mk : +Lof(S).toFixed(2), n: S.cnt, t: +S.tc.toFixed(2), T: +(S.tc / S.cnt).toFixed(3) }; },
      cols: [['L', 'الطول L (m) / الكتلة (g)'], ['n', 'عدد الاهتزازات n'], ['t', 'الزمن t (s)'], ['T', 'T = t/n (s)']],
      graph: { x: 'L', y: 'T', xl: 'الطول L (m)', yl: 'زمن الاهتزازة T (s)' },
      explain(S) { if (S.chal) return CH.explain(S, VCH); return this.explain0(S) + '<br><b>🔎 لماذا هي دورية اهتزازية؟</b> لأن الجسم يتحرك <b>ذهاباً وإياباً حول موضع اتزانه</b> (الخط الأخضر) بين موضعي أقصى إزاحة، ويكرر حركته على <b>فترات زمنية متساوية</b> (انظر «زمن كل اهتزازة»).<br><b>🏠 من حياتك:</b> بندول الساعة، الأرجوحة، الثقل المعلّق بنابض، وتر العود عند العزف.'; },
      explain0(S) { if (S.held) return 'أزحت الجسم عن <b>موضع اتزانه</b>. اتركه لترى حركته.'; if (!S.go) return 'الجسم ساكن في <b>موضع الاتزان</b>. اسحبه جانباً ثم اتركه.'; return S.done ? `أكمل الجسم <b>${S.p.n}</b> اهتزازات في <b>${fmt(S.tm, 3)} s</b>، فزمن الاهتزازة الواحدة <b>T = ${fmt(S.tm / S.p.n, 3)} s</b>. الحركة تكرر نفسها على فترات زمنية متساوية: <b>حركة دورية اهتزازية</b>.` : 'الجسم يتحرك <b>ذهاباً وإياباً</b> حول موضع اتزانه على مسار على شكل <b>قوس</b>، ويكرر حركته — راقب العداد والساعة.'; },
      quiz: [
        { q: 'حركة كرة البندول ذهاباً وإياباً حول موضع اتزانها حركة:', o: ['انتقالية', 'دورية اهتزازية', 'عشوائية'], a: 1, why: 'تكرر نفسها على فترات زمنية متساوية حول موضع الاتزان.' },
        { q: 'أكمل بندول 10 اهتزازات في 20 s. زمن الاهتزازة الواحدة:', o: ['2 s', '200 s', '0.5 s'], a: 0, why: 'T = t ÷ n = 20 ÷ 10 = 2 s.' },
        { q: 'شكل مسار كرة البندول:', o: ['خط مستقيم', 'قوس (جزء من دائرة)', 'دائرة كاملة'], a: 1, why: 'الكرة مربوطة بخيط ثابت الطول فتتحرك على قوس.' }
      ]
    });
  })();

  /* =========================================================================================
     10) المسافة والإزاحة (ص 14 شكل 1، ص 15، مثال 2 ص 16، التفكير الناقد ص 19)
     ========================================================================================= */
  (() => {
    const SC = {
      lab: { n: '🏫 من الصف (P) إلى المختبر (Q) — شكل 1', u: 'm', k: 3, pts: [[1.2, 1.3], [2, .4], [4, -.4], [6, .3], [7.2, -.2], [9, -.6], [11.4, .2], [11.8, 2.2], [10.6, 3.6], [11.4, 5.4], [10, 6.4], [6.4, 5.9], [4, 6.6], [1.5, 6.8], [.6, 5.6], [1.6, 4.4], [3.6, 4.3], [3.1, 3.7], [1.3, 3.5], [1.2, 2.5]], lab: ['P', 'Q'] },
      quad: { n: '📐 مثال 2: A → B → C → D → A', u: 'm', k: 1, pts: [[0, 0], [2.298, -1.928], [4.298, -1.928], [5.719, 1.814], [0, 0]], lab: ['A', 'B', 'C', 'D', 'A'] },
      school: { n: '🏠 ذهاباً إلى المدرسة 200 m وإياباً', u: 'm', k: 50, pts: [[0, 0], [4, 0], [0, 0]], lab: ['المنزل', 'المدرسة', 'المنزل'] },
      free: { n: '✍️ ارسم طريقك على الشبكة (انقر نقاطاً)', u: 'm', k: 1, pts: null, lab: [] }
    };
    const pts = S => { const c = SC[S.p.sc]; return c.pts ? c.pts : (S.my && S.my.length ? S.my : [[1, 1]]); };
    const lens = P => { const L = [0]; for (let i = 1; i < P.length; i++) L.push(L[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1])); return L; };
    const at = (P, Ls, s) => { s = clamp(s, 0, Ls[Ls.length - 1]); for (let i = 1; i < P.length; i++) if (s <= Ls[i] + 1e-9) { const f = (s - Ls[i - 1]) / (Ls[i] - Ls[i - 1] || 1); return [P[i - 1][0] + (P[i][0] - P[i - 1][0]) * f, P[i - 1][1] + (P[i][1] - P[i - 1][1]) * f, i - 1]; } return [P[P.length - 1][0], P[P.length - 1][1], P.length - 2]; };
    const geo = S => { const w = S.W, h = S.H, sc = S.p.sc; const box = sc === 'quad' ? [-.8, -3, 6.8, 2.8] : sc === 'school' ? [-.8, -2, 4.8, 2] : [0, -1, 12.6, 7.6]; const ppm = Math.min((w - 140) / (box[2] - box[0]), (h - 330) / (box[3] - box[1])); const ox = 90 - box[0] * ppm + ((w - 140) - (box[2] - box[0]) * ppm) / 2, oy = 150 - box[1] * ppm; return { w, h, ppm, X: x => ox + x * ppm, Y: y => oy + y * ppm, ox, oy }; };
    P8({
      id: 'g8_distance', ch: 21, sec: 'الدرس الثالث: وصف الحركة', page: 14, fig: 'شكل 1', kind: 'مثال', title: 'المسافة والإزاحة: طول الطريق أم أقصر خط؟',
      desc: 'نحرك التلميذ على طريقه (من الصف إلى المختبر، أو حول الشكل A B C D، أو من البيت إلى المدرسة والعودة، أو طريقاً نرسمه بأنفسنا) فنرى المسافة تزداد مع كل خطوة، بينما الإزاحة هي السهم المستقيم من نقطة البداية إلى الموقع الحالي.',
      tags: 'المسافة الإزاحة متجه كمية مقدارية اتجاهية مسار',
      tools: ['شبكة مربعات', 'مسار'],
      steps: ['اسحب التلميذ 🧒 على طريقه (أو اضغط «امشِ»).', 'راقب عداد المسافة d: يزداد مع كل متر تقطعه مهما كان الاتجاه.', 'راقب سهم الإزاحة x الأحمر: يبدأ دائماً من نقطة البداية وينتهي عند الموقع الحالي.', 'في مثال 2 أكمل الدوران إلى A: كم المسافة الكلية؟ وكم الإزاحة؟', 'في «ارسم طريقك» انقر على نقاط الشبكة لترسم طريقاً ثم امشِ عليه.'],
      concl: ['المسافة (d): طول المسار الذي يسلكه الجسم للانتقال من نقطة إلى أخرى، وهي كمية مقدارية تقاس بالمتر (m).', 'الإزاحة (x): التغير في موقع الجسم بالنسبة لنقطة ثابتة، وهي أقصر مسار مستقيم يسلكه الجسم بين نقطتي البداية والنهاية وباتجاه ثابت؛ كمية اتجاهية تقاس بالمتر.', 'تمثل الإزاحة بسهم: بدايته بداية المتجه، وطوله يتناسب مع مقدار الإزاحة، واتجاهه هو اتجاه الإزاحة.', 'إذا رجع الجسم إلى نقطة البداية تكون الإزاحة الكلية صفراً مهما كانت المسافة: d = 3 + 2 + 4 + 6 = 15 m بينما x = 0.'],
      laws: ['g8_speed'],
      fact: ['عدّاد المسافات في السيارة يقيس المسافة لا الإزاحة: لو درت بالسيارة حول الحي وعدت إلى البيت لزاد العداد رغم أن إزاحتك صفر!', 'الطائرات تسلك أقصر الطرق فتقترب مسافة رحلتها من مقدار الإزاحة.'],
      controls: [SEL('sc', 'المثال', Object.keys(SC).map(k => [k, SC[k].n]), 'lab', (v, S) => { S.s = 0; S.walk = false; }),
        R('spd', 'سرعة المشي', .5, 4, 1.5, .5, 'm/s'),
        TG('disp', 'سهم الإزاحة x', true, null, 'vector'), TG('trail', 'المسافة المقطوعة (المسار الملوّن)', true, null, 'dot'), TG('arrows', 'أسهم اتجاه الطريق', true, null, 'velocity'), TG('grid', 'الشبكة', true, null, 'grid'),
        BT('', [{ t: 'امشِ ▶', on: S => { const P = pts(S), Ls = lens(P); if (S.s >= Ls[Ls.length - 1] - 1e-6) S.s = 0; S.walk = true; } }, { t: 'إلى البداية', on: S => { S.s = 0; S.walk = false; } }, { t: 'امسح طريقي', on: S => { S.my = []; S.s = 0; } }])],
      setup(S) { S.s = 0; S.walk = false; S.my = [[1, 1], [5, 1], [5, 4], [9, 4]]; },
      update(S, dt) { if (!S.walk) return; const P = pts(S), Ls = lens(P), L = Ls[Ls.length - 1], c = SC[S.p.sc]; S.s += S.p.spd * dt * (S.p.sc === 'school' ? .4 : 1); if (S.s >= L) { S.s = L; S.walk = false; H.snd('ok'); } },
      draw(ctx, w, h, S) {
        const g = geo(S), c = SC[S.p.sc], P = pts(S), Ls = lens(P), Ltot = Ls[Ls.length - 1], cur = at(P, Ls, S.s), k = c.k, p = S.p;
        G.bg(ctx, w, h, false); K.raw(ctx, () => { ctx.fillStyle = '#fffdf5'; ctx.fillRect(0, 0, w, h); });
        if (p.grid) K.raw(ctx, () => { ctx.strokeStyle = 'rgba(14,116,144,.14)'; ctx.lineWidth = 1; ctx.beginPath(); for (let x = g.ox % g.ppm; x < w; x += g.ppm) { ctx.moveTo(x, 60); ctx.lineTo(x, h); } for (let y = g.oy % g.ppm; y < h; y += g.ppm) { ctx.moveTo(0, y); ctx.lineTo(w, y); } ctx.stroke(); });
        H.banner(ctx, w, 'المسافة = طول الطريق   |   الإزاحة = سهم من البداية إلى النهاية', '#0f766e');
        if (p.grid) T(ctx, 'كل مربع = ' + k + ' m', w - 80, h - 94, { s: 12, w: 800, c: '#0f766e' });
        if (S.p.sc === 'school') K.raw(ctx, () => { ctx.fillStyle = '#cbd5e1'; ctx.fillRect(g.X(-.4), g.Y(0) - 22, g.X(4.4) - g.X(-.4), 44); });
        // whole path
        const off = (i) => S.p.sc === 'school' && i >= 1 ? 10 : 0;
        const PP = P.map((q, i) => [g.X(q[0]), g.Y(q[1]) + (S.p.sc === 'school' ? (i === 0 ? -10 : i === 1 ? 0 : 10) : 0)]);
        K.raw(ctx, () => { ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); PP.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); });
        if (p.arrows) for (let i = 1; i < PP.length; i++) { const a = PP[i - 1], b = PP[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]); if (L < 40) continue; const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L; K.raw(ctx, () => G.arrow(ctx, mx - ux * 14 - uy * 14, my - uy * 14 + ux * 14, mx + ux * 14 - uy * 14, my + uy * 14 + ux * 14, '#64748b', 2, 8)); }
        // travelled part
        if (p.trail && S.s > 0) K.raw(ctx, () => { ctx.strokeStyle = '#f97316'; ctx.lineWidth = 9; ctx.globalAlpha = .75; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(PP[0][0], PP[0][1]); for (let i = 1; i <= cur[2]; i++) ctx.lineTo(PP[i][0], PP[i][1]); const f = (S.s - Ls[cur[2]]) / ((Ls[cur[2] + 1] - Ls[cur[2]]) || 1), a = PP[cur[2]], b = PP[cur[2] + 1] || a; ctx.lineTo(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f); ctx.stroke(); ctx.globalAlpha = 1; ctx.lineCap = 'butt'; });
        // segment lengths for example 2
        if (S.p.sc === 'quad') for (let i = 1; i < P.length; i++) { const a = PP[i - 1], b = PP[i]; const L = Ls[i] - Ls[i - 1]; T(ctx, Math.round(L) + ' m', (a[0] + b[0]) / 2 + (b[1] - a[1]) / Math.hypot(b[0] - a[0], b[1] - a[1]) * 22, (a[1] + b[1]) / 2 - (b[0] - a[0]) / Math.hypot(b[0] - a[0], b[1] - a[1]) * 22, { s: 13, w: 900, c: '#1d4ed8' }); }
        if (S.p.sc === 'school') { T(ctx, '200 m', (PP[0][0] + PP[1][0]) / 2, g.Y(0) - 40, { s: 14, w: 900, c: '#1d4ed8' }); T(ctx, '🏠', g.X(-.4), g.Y(0) - 56, { s: 40 }); T(ctx, '🏫', g.X(4.3), g.Y(0) - 56, { s: 40 }); }
        // labels
        c.lab.forEach((l, i) => { if (S.p.sc === 'school' || (i === c.lab.length - 1 && S.p.sc === 'quad')) return; const q = i === 1 && S.p.sc === 'lab' ? PP[PP.length - 1] : PP[i]; K.raw(ctx, () => { ctx.fillStyle = i ? '#7c3aed' : '#475569'; ctx.beginPath(); ctx.arc(q[0], q[1], 15, 0, TAU); ctx.fill(); }); T(ctx, l, q[0], q[1], { s: 14, w: 900, c: '#fff' }); });
        if (S.p.sc === 'lab') T(ctx, 'نقطة الانطلاق', PP[0][0], PP[0][1] - 30, { s: 11.5, w: 800, c: '#475569' });
        if (S.p.sc === 'free') PP.forEach((q, i) => { K.raw(ctx, () => { ctx.fillStyle = i ? '#1d4ed8' : '#16a34a'; ctx.beginPath(); ctx.arc(q[0], q[1], 7, 0, TAU); ctx.fill(); }); });
        // displacement
        const cx = g.X(cur[0]), cy = g.Y(cur[1]) + (S.p.sc === 'school' ? (S.s > Ls[1] ? 10 : -10) : 0), sx = PP[0][0], sy = PP[0][1];
        const dxm = (cur[0] - P[0][0]) * k, dym = (cur[1] - P[0][1]) * k, xmag = Math.hypot(dxm, dym), dist = S.s * k;
        if (p.disp && xmag > .05 * k) H.arrow(ctx, sx, sy, cx, cy, '#dc2626', 5, 'x = ' + fmt(xmag, 3) + ' m', { off: -18 });
        // walker
        K.raw(ctx, () => { ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(cx, cy + 4, 16, 6, 0, 0, TAU); ctx.fill(); });
        T(ctx, '🧒', cx, cy - 6, { s: 32 });
        // cards
        const done = S.s >= Ltot - 1e-6;
        H.box(ctx, 64 + 140, h - 200, 250, 'المسافة d (طول الطريق)', [['d = ' + fmt(dist, 3) + ' m', { s: 18, w: 900, c: '#ea580c', mono: 1 }], [S.p.sc === 'quad' ? 'd = d₁ + d₂ + d₃ + d₄' : 'تزداد دائماً مع الحركة', { s: 12, c: '#64748b' }]], { bd: '#ea580c' });
        H.box(ctx, 64 + 410, h - 200, 250, 'الإزاحة x (من البداية إلى الآن)', [['x = ' + fmt(xmag, 3) + ' m', { s: 18, w: 900, c: '#dc2626', mono: 1 }], [xmag < .01 && dist > 0 ? 'رجع إلى البداية: x = 0 !' : 'لها مقدار واتجاه (سهم)', { s: 12, c: xmag < .01 && dist > 0 ? '#dc2626' : '#64748b', w: xmag < .01 && dist > 0 ? 900 : 700 }]], { bd: '#dc2626' });
        if (done && dist > 0 && !S._ch) { S._ch = 1; K.cheer(S, cx, cy); } if (!done) S._ch = 0;
        K.party(ctx, S);
      },
      drags(S) {
        const g = geo(S), P = pts(S), Ls = lens(P), Lt = Ls[Ls.length - 1], cur = at(P, Ls, S.s), L = [];
        L.push({ id: 'walker', x: g.X(cur[0]), y: g.Y(cur[1]), r: 28, axis: 'xy', keep: false, idle: 'اسحبني على الطريق ✋', tip: 'اسحب التلميذ على طريقه',
          drag: (S, d) => { S.walk = false; const mx = (d.x - g.ox) / g.ppm, my = (d.y - g.oy) / g.ppm; let best = null; for (let i = 1; i < P.length; i++) { const a = P[i - 1], b = P[i], vx = b[0] - a[0], vy = b[1] - a[1], LL = vx * vx + vy * vy || 1; const f = clamp(((mx - a[0]) * vx + (my - a[1]) * vy) / LL, 0, 1), px = a[0] + vx * f, py = a[1] + vy * f, s = Ls[i - 1] + f * Math.sqrt(LL), dd = Math.hypot(mx - px, my - py) + Math.abs(s - S.s) * .15; if (!best || dd < best[0]) best = [dd, s]; } if (best) S.s = clamp(best[1], 0, Lt); H.act(S, 'w'); } });
        if (S.p.sc === 'free') L.unshift({ id: 'gridclick', x: S.W / 2 + 32, y: S.H / 2, w: S.W - 140, h: S.H - 300, hint: false, tip: 'انقر لإضافة نقطة إلى طريقك', click: (S, x, y) => { const q = [Math.round((x - g.ox) / g.ppm), Math.round((y - g.oy) / g.ppm)]; S.my = (S.my || []).concat([q]); H.act(S, 'pt'); } });
        return L;
      },
      readings(S) { const c = SC[S.p.sc], P = pts(S), Ls = lens(P), cur = at(P, Ls, S.s), k = c.k; const dx = (cur[0] - P[0][0]) * k, dy = (cur[1] - P[0][1]) * k; return [rd('المسافة المقطوعة d', fmt(S.s * k, 3) + ' m'), rd('مقدار الإزاحة x', fmt(Math.hypot(dx, dy), 3) + ' m'), rd('طول الطريق كله', fmt(Ls[Ls.length - 1] * k, 3) + ' m')]; },
      record(S) { const c = SC[S.p.sc], P = pts(S), Ls = lens(P), cur = at(P, Ls, S.s), k = c.k; return { d: +(S.s * k).toFixed(1), x: +Math.hypot((cur[0] - P[0][0]) * k, (cur[1] - P[0][1]) * k).toFixed(1) }; },
      cols: [['d', 'المسافة d (m)'], ['x', 'الإزاحة x (m)']],
      explain(S) { const c = SC[S.p.sc], P = pts(S), Ls = lens(P), cur = at(P, Ls, S.s), k = c.k, x = Math.hypot((cur[0] - P[0][0]) * k, (cur[1] - P[0][1]) * k), d = S.s * k; if (d < .01) return 'التلميذ عند <b>نقطة البداية</b>: المسافة = 0 والإزاحة = 0. اسحبه على الطريق.'; if (x < .01) return `قطع التلميذ مسافة <b>${fmt(d, 3)} m</b> لكنه <b>رجع إلى نقطة البداية</b>، فالإزاحة الكلية <b>x = 0</b>.`; return `المسافة <b>${fmt(d, 3)} m</b> (طول الطريق الملوّن) أكبر من مقدار الإزاحة <b>${fmt(x, 3)} m</b> (السهم الأحمر المستقيم). المسافة لا تقل أبداً عن مقدار الإزاحة.`; },
      quiz: [
        { q: 'تحرك تلميذ من A إلى B (3 m) ثم إلى C (2 m) ثم إلى D (4 m) ثم رجع إلى A (6 m). الإزاحة الكلية:', o: ['15 m', 'صفر', '6 m'], a: 1, why: 'رجع إلى نقطة البداية فالإزاحة الكلية صفر، أما المسافة فهي 15 m (مثال 2).' },
        { q: 'تسير صباحاً 200 m إلى المدرسة وتعود ظهراً من الطريق نفسه. المسافة الكلية:', o: ['صفر', '200 m', '400 m'], a: 2, why: 'المسافة = 200 + 200 = 400 m، والإزاحة الكلية = صفر (التفكير الناقد 1).' },
        { q: 'مقدار الإزاحة الكلية لجسم يتحرك من نقطة البداية راجعاً إليها هو:', o: ['ضعف المسافة', 'مساوٍ للمسافة', 'صفر'], a: 2, why: 'مراجعة الفصل س2-7.' }
      ]
    });
  })();

  /* =========================================================================================
     11) الانطلاق ومعدل الانطلاق ومخطط (المسافة – الزمن) (ص 14–15، مثال 1، س4 مراجعة الفصل، الفيزياء والمجتمع ص 20)
     ========================================================================================= */
  (() => {
    const SC = {
      trip: { n: '🚗✈️ مثال 1: سيارة وطائرة من بغداد إلى البصرة', T: 5, tu: 'h', du: 'km' },
      city: { n: '🚦 سيارة في المدينة (إشارات المرور)', T: 60, tu: 's', du: 'm' },
      odo: { n: '⏱️ س4: مقياس الزمن ومقياس المسافة', T: 2, tu: 'h', du: 'km' },
      toy: { n: '🧸 لعبة تتحرك 1 m كل ثانية (شكل 2)', T: 5, tu: 's', du: 'm' },
      moon: { n: '🌙 الليزر وقياس بعد القمر (الفيزياء والمجتمع)', T: 2.56, tu: 's', du: 'm' }
    };
    /* city drive: distance as a function of time (m), with stops at two red lights */
    const cityV = t => { const seg = [[0, 0], [8, 14], [16, 14], [20, 0], [30, 0], [36, 12], [44, 12], [48, 0], [52, 0], [56, 10], [60, 10]]; for (let i = 1; i < seg.length; i++) if (t <= seg[i][0]) { const f = (t - seg[i - 1][0]) / (seg[i][0] - seg[i - 1][0]); return seg[i - 1][1] + (seg[i][1] - seg[i - 1][1]) * f; } return 10; };
    const cityD = (() => { const tab = [0]; let d = 0; for (let k = 1; k <= 6000; k++) { const t = k / 100; d += (cityV(t) + cityV(t - .01)) / 2 * .01; tab.push(d); } return t => tab[clamp(Math.round(t * 100), 0, 6000)]; })();
    const dist = (S, t) => { const sc = S.p.sc; if (sc === 'trip') return [Math.min(90 * t, 450), Math.min(450 * t, 450)]; if (sc === 'city') return [cityD(t)]; if (sc === 'odo') return [142 * (t / 2 - Math.sin(t * Math.PI) / (Math.PI * 2))]; if (sc === 'toy') return [t]; return [3e8 * t]; };
    const clk = h => { const m = Math.round(10 * 60 + 40 + h * 60); return Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0'); };
    P8({
      id: 'g8_avgspeed', ch: 21, sec: 'الدرس الثالث: وصف الحركة', page: 15, fig: 'شكل 2', kind: 'مثال', title: 'الانطلاق ومعدل الانطلاق ومخطط (المسافة – الزمن)',
      desc: 'نشغّل الرحلة أو نسحب مؤشر الزمن فنرى المسافة المقطوعة ومخطط (المسافة – الزمن) يُرسم مباشرة، ونحسب معدل الانطلاق = المسافة الكلية ÷ الزمن الكلي، ونحوّل من km/h إلى m/s كما في مثال 1 وسؤال 4، ونعرف كيف قاس العلماء بعد القمر بالليزر.',
      tags: 'انطلاق معدل الانطلاق مخطط المسافة الزمن km/h m/s تحويل عداد المسافات ليزر القمر',
      tools: ['ساعة', 'عداد المسافات', 'خريطة'],
      steps: ['اختر المثال واضغط «انطلق» أو اسحب مؤشر الزمن أسفل الشاشة.', 'راقب المسافة المقطوعة والزمن، ومخطط (المسافة – الزمن) وهو يُرسم.', 'في مثال 1 قارن ميل خط السيارة وخط الطائرة: أيهما أسرع؟', 'عند نهاية الرحلة اقرأ معدل الانطلاق وتحويله إلى m/s.', 'في السؤال 4 اقرأ مقياسي الزمن والمسافة في البداية والنهاية واحسب.'],
      concl: ['الانطلاق: المسافة المقطوعة خلال وحدة الزمن S = d / t ، وهو كمية مقدارية وحدته m/s.', 'قد يتزايد انطلاق الجسم أو يقل في أثناء حركته (إشارات المرور) لذلك نستعمل معدل الانطلاق = المسافة الكلية ÷ الزمن الكلي.', 'في مخطط (المسافة – الزمن) يمثل المحور الأفقي الزمن والعمودي المسافة؛ الخط الأشد ميلاً يمثل انطلاقاً أكبر، والخط الأفقي يعني أن الجسم متوقف.', 'للتحويل من km/h إلى m/s نضرب في 1000 ونقسم على 3600: 90 km/h = 25 m/s و 450 km/h = 125 m/s.'],
      laws: ['g8_speed', 'g8_avgspeed', 'g8_kmh'],
      fact: ['قاس العلماء بعد القمر بإطلاق ليزر نحو مرايا تركها رواد أبولو 11 و 14 على سطحه: يعود الضوء بعد نحو 2.56 s فيكون بعد القمر نحو 384000 km.', 'عداد السرعة في السيارة يقيس الانطلاق اللحظي، أما معدل الانطلاق فنحسبه للرحلة كلها.'],
      controls: [SEL('sc', 'المثال', Object.keys(SC).map(k => [k, SC[k].n]), 'trip', (v, S) => { S.tt = 0; S.play = false; }),
        TG('graph', 'مخطط المسافة – الزمن', true, null, 'graph'), TG('speedo', 'عداد الانطلاق', true, null, 'meter'), TG('calc', 'بطاقة الحساب', true, null, 'labels'), TG('dots', 'علامة كل وحدة زمن', true, null, 'dot'),
        BT('', [{ t: 'انطلق ▶', on: S => { if (S.tt >= SC[S.p.sc].T - 1e-6) S.tt = 0; S.play = true; } }, { t: 'إيقاف ⏸', on: S => { S.play = false; } }, { t: 'من البداية', on: S => { S.tt = 0; S.play = false; } }])],
      setup(S) { S.tt = 0; S.play = false; },
      update(S, dt) { if (!S.play) return; const c = SC[S.p.sc], rate = { trip: .5, city: 6, odo: .25, toy: 1, moon: .25 }[S.p.sc]; S.tt = Math.min(c.T, S.tt + dt * rate); if (S.tt >= c.T) { S.play = false; H.snd('ok'); } },
      draw(ctx, w, h, S) {
        const c = SC[S.p.sc], sc = S.p.sc, p = S.p, t = S.tt, D = dist(S, t), fin = t >= c.T - 1e-6;
        const tl = { x0: 110, x1: w - 60, y: h - 112 };
        if (sc === 'moon') { G.bg(ctx, w, h, false); K.raw(ctx, () => { ctx.fillStyle = '#020617'; ctx.fillRect(0, 0, w, h); for (let k = 0; k < 90; k++) { ctx.fillStyle = 'rgba(255,255,255,' + (.3 + (k * 37 % 7) / 10) + ')'; ctx.fillRect((k * 173) % w, (k * 97) % (h - 140), 2, 2); } }); }
        else if (sc === 'trip') { K.bg(ctx, w, h, { bench: false, benchY: h + 5, top: '#ecfccb', bottom: '#fef9c3', tiles: false }); }
        else H.sky(ctx, w, h, h * .42, { road: 60 });
        H.banner(ctx, w, 'معدل الانطلاق = المسافة الكلية ÷ الزمن الكلي', '#0369a1');
        let speedNow = 0;
        if (sc === 'trip') {
          const ax = 140, ay = 120, bx = w - 120, by = h * .45, P = f => [ax + (bx - ax) * f, ay + (by - ay) * f + Math.sin(f * Math.PI) * 60];
          K.raw(ctx, () => { ctx.strokeStyle = '#a8a29e'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); for (let f = 0; f <= 1.001; f += .02) { const q = P(f); f ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); } ctx.stroke(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.setLineDash([10, 8]); ctx.stroke(); ctx.setLineDash([]); ctx.strokeStyle = 'rgba(37,99,235,.45)'; ctx.lineWidth = 2; ctx.setLineDash([4, 6]); ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); ctx.setLineDash([]); ctx.lineCap = 'butt';
            ctx.fillStyle = '#0ea5e9'; ctx.beginPath(); ctx.moveTo(bx + 10, by + 30); ctx.quadraticCurveTo(bx + 60, by + 60, bx + 40, by + 120); ctx.lineTo(w, by + 120); ctx.lineTo(w, by + 20); ctx.fill(); });
          [[ax, ay, 'بغداد'], [bx, by, 'البصرة']].forEach(([x, y, n]) => { K.raw(ctx, () => { ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(x, y, 9, 0, TAU); ctx.fill(); }); T(ctx, n, x, y - 22, { s: 14, w: 900, c: '#fff', bg: '#334155' }); });
          T(ctx, '450 km', (ax + bx) / 2 + 30, (ay + by) / 2 - 24, { s: 13, w: 900, c: '#57534e' });
          const qc = P(D[0] / 450); H.car(ctx, qc[0], qc[1] + 6, .32, { driver: false, col: '#16a34a' }); T(ctx, fmt(D[0], 3) + ' km', qc[0], qc[1] + 24, { s: 11.5, w: 900, c: '#fff', bg: '#16a34a' });
          const f2 = D[1] / 450, qp = [ax + (bx - ax) * f2, ay + (by - ay) * f2 - 40]; T(ctx, '✈️', qp[0], qp[1], { s: 30 }); T(ctx, fmt(D[1], 3) + ' km', qp[0], qp[1] - 26, { s: 11.5, w: 900, c: '#fff', bg: '#2563eb' });
          if (p.dots) for (let k = 1; k <= Math.floor(t + 1e-9); k++) { const q = P(Math.min(90 * k, 450) / 450); K.raw(ctx, () => { ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.arc(q[0], q[1], 5, 0, TAU); ctx.fill(); }); T(ctx, k + ' h', q[0] + 16, q[1] + 12, { s: 10.5, w: 800, c: '#15803d' }); }
          speedNow = D[0] < 450 ? 90 : 0;
          H.clock(ctx, 64 + 50, 230, 30, (t * 12) % 12, fmt(t, 3) + ' h');
        } else if (sc === 'city' || sc === 'odo' || sc === 'toy') {
          const gy = h * .42, L = sc === 'city' ? cityD(60) : sc === 'odo' ? 142 : 5, X = d => 110 + (w - 200) * d / L, cx = X(D[0]);
          if (sc === 'city') [[cityD(18), 20, 30], [cityD(46), 48, 52]].forEach(([d, t1, t2]) => { const x = X(d) + 40, red = t > t1 - 2 && t < t2; K.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(x - 3, gy - 110, 6, 110); rr(ctx, x - 12, gy - 150, 24, 50, 6); ctx.fill(); ctx.fillStyle = red ? '#ef4444' : '#7f1d1d'; ctx.beginPath(); ctx.arc(x, gy - 138, 7, 0, TAU); ctx.fill(); ctx.fillStyle = !red ? '#22c55e' : '#14532d'; ctx.beginPath(); ctx.arc(x, gy - 114, 7, 0, TAU); ctx.fill(); }); });
          if (sc === 'odo') { T(ctx, 'بداية الرحلة', X(0), gy - 90, { s: 12, w: 900, c: '#fff', bg: '#334155' }); T(ctx, 'نهاية الرحلة', X(142), gy - 90, { s: 12, w: 900, c: '#fff', bg: '#334155' }); }
          if (sc === 'toy') K.raw(ctx, () => { ctx.fillStyle = '#e7d3b0'; ctx.fillRect(0, gy, w, 60); for (let m = 0; m <= 5; m++) { ctx.fillStyle = '#78350f'; ctx.fillRect(X(m) - 1, gy + 2, 2, 18); ctx.font = '800 12px ui-monospace'; ctx.textAlign = 'center'; ctx.direction = 'ltr'; ctx.fillText(m + ' m', X(m), gy + 36); } });
          if (p.dots) { const step = sc === 'city' ? 5 : sc === 'odo' ? .25 : 1; for (let k = 1; k * step <= t + 1e-9; k++) { const x = X(dist(S, k * step)[0]); K.raw(ctx, () => { ctx.fillStyle = '#1d4ed8'; ctx.beginPath(); ctx.arc(x, gy + 48, 5, 0, TAU); ctx.fill(); }); } T(ctx, 'نقطة كل ' + (sc === 'odo' ? '15 min' : step + ' s') + ' — تقاربها يعني بطئاً', 110, gy + 70, { s: 11.5, w: 800, c: '#1e3a8a', a: 'left' }); }
          if (sc === 'toy') { T(ctx, '🧸', cx, gy - 18, { s: 34 }); } else H.car(ctx, cx, gy + 30, .6, { col: sc === 'odo' ? '#88a4b8' : '#ef4444', rot: D[0] / 2 });
          speedNow = sc === 'city' ? cityV(t) * 3.6 : sc === 'odo' ? (t > 0 && t < 2 ? 71 * (1 - Math.cos(t * Math.PI)) : 0) : (t < 5 ? 1 : 0);
          if (sc === 'odo') { const dial = (x, y, val, lab) => { K.raw(ctx, () => { ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(x, y, 44, 0, TAU); ctx.stroke(); ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(x, y, 34, -Math.PI * 1.3, Math.PI * .3); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, y, 30, 0, TAU); ctx.fill(); }); T(ctx, val, x, y, { s: 15, w: 900, c: '#0f172a', mono: 1 }); T(ctx, lab, x, y + 60, { s: 12, w: 900, c: '#334155' }); };
            const yy = h * .6; dial(w - 120, yy, clk(t), 'مقياس الزمن (h)'); dial(w - 240, yy, String(Math.round(30382 + D[0])), 'مقياس المسافة (km)'); T(ctx, 'البداية: 10:40 و 30382 km', w - 180, yy - 66, { s: 12, w: 800, c: '#475569' }); }
        } else {
          // laser to the moon
          const ex = 210, ey = h * .5, mx = w - 110, my = h * .3, f = t / 2.56, ph = f < .5 ? f * 2 : 2 - f * 2, lx = ex + (mx - ex) * ph, ly = ey + (my - ey) * ph;
          K.raw(ctx, () => { const g2 = ctx.createRadialGradient(ex - 20, ey - 20, 10, ex, ey, 70); g2.addColorStop(0, '#38bdf8'); g2.addColorStop(1, '#1e3a8a'); ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(ex - 60, ey + 30, 80, 0, TAU); ctx.fill(); ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(mx, my, 44, 0, TAU); ctx.fill(); ctx.fillStyle = '#cbd5e1'; [[-12, -10, 9], [14, 8, 6], [-4, 18, 5]].forEach(([a, b, r]) => { ctx.beginPath(); ctx.arc(mx + a, my + b, r, 0, TAU); ctx.fill(); });
            ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 3; ctx.shadowColor = '#22c55e'; ctx.shadowBlur = 12; ctx.beginPath(); ctx.moveTo(ex, ey); if (f < .5) ctx.lineTo(lx, ly); else { ctx.lineTo(mx, my); ctx.moveTo(mx, my); ctx.lineTo(lx, ly); } ctx.stroke(); ctx.shadowBlur = 0; ctx.fillStyle = '#bbf7d0'; ctx.beginPath(); ctx.arc(lx, ly, 6, 0, TAU); ctx.fill(); });
          T(ctx, 'محطة أرضية ترسل الليزر', ex, ey + 70, { s: 12.5, w: 900, c: '#fff', bg: '#16a34a' }); T(ctx, 'مرآة عاكسة على القمر', mx, my + 62, { s: 12.5, w: 900, c: '#fff', bg: '#475569' });
          speedNow = 3e8;
        }
        // timeline scrubber
        K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.9)'; rr(ctx, tl.x0 - 20, tl.y - 16, tl.x1 - tl.x0 + 40, 32, 16); ctx.fill(); ctx.fillStyle = '#cbd5e1'; ctx.fillRect(tl.x0, tl.y - 3, tl.x1 - tl.x0, 6); ctx.fillStyle = '#0369a1'; ctx.fillRect(tl.x0, tl.y - 3, (tl.x1 - tl.x0) * t / c.T, 6); ctx.fillStyle = '#0369a1'; ctx.beginPath(); ctx.arc(tl.x0 + (tl.x1 - tl.x0) * t / c.T, tl.y, 11, 0, TAU); ctx.fill(); });
        T(ctx, 't = ' + fmt(t, 3) + ' ' + c.tu, tl.x0 + (tl.x1 - tl.x0) * t / c.T, tl.y - 26, { s: 12, w: 900, c: '#fff', bg: '#0369a1', mono: 1 });
        // graph
        if (p.graph && sc !== 'moon') { const N = 60, ser = (sc === 'trip' ? [0, 1] : [0]).map(j => ({ pts: Array.from({ length: N + 1 }, (_, i) => { const tt = c.T * i / N; return [tt, dist(S, tt)[j]]; }).filter(q => q[0] <= t + 1e-9), c: j ? '#2563eb' : '#16a34a', lw: 3 })); const ymax = sc === 'trip' ? 450 : sc === 'city' ? 600 : sc === 'odo' ? 150 : 5; H.graph(ctx, 74, sc === 'trip' ? h * .55 : h * .5 + 60, Math.max(200, Math.min(330, w * .42, w - 74 - 40 - (p.calc ? clamp(w - 470, 250, 330) : 0))), 200, { title: 'مخطط (المسافة – الزمن)', xl: 't (' + c.tu + ')', yl: 'd (' + c.du + ')', xmax: c.T, ymax, series: ser.concat(sc === 'toy' ? [{ pts: Array.from({ length: Math.floor(t) + 1 }, (_, i) => [i, i]), c: '#dc2626', dots: 1, lw: 0 }] : []) }); if (sc === 'trip') { T(ctx, 'الطائرة', 74 + 60, h * .55 + 40, { s: 11, w: 900, c: '#2563eb' }); T(ctx, 'السيارة', 74 + 200, h * .55 + 120, { s: 11, w: 900, c: '#16a34a' }); } }
        if (p.speedo && sc !== 'moon') H.speedo(ctx, sc === 'odo' ? 64 + 130 : w - 96, sc === 'odo' ? 130 : 150, 66, speedNow, sc === 'trip' ? 500 : sc === 'odo' ? 160 : sc === 'city' ? 60 : 2, sc === 'toy' ? 'm/s' : 'km/h', sc === 'trip' ? 'انطلاق السيارة' : 'الانطلاق اللحظي');
        // calc card
        if (p.calc) { const cw = clamp(w - 470, 250, 330), cx = sc === 'moon' ? (64 + w) / 2 : w - 30 - cw / 2, cy = sc === 'moon' ? h * .62 : (sc === 'odo' ? 74 : h * .5 + 40); let L;
          if (sc === 'trip') L = fin ? [['السيارة: 450 km / 5 h = 90 km/h', { mono: 1, s: 12.5 }], ['= 90 × 1000 / 3600 = 25 m/s', { mono: 1, s: 12.5, c: '#16a34a', w: 900 }], ['الطائرة: 450 km / 1 h = 450 km/h', { mono: 1, s: 12.5 }], ['= 450 × 1000 / 3600 = 125 m/s', { mono: 1, s: 12.5, c: '#2563eb', w: 900 }]] : [['S = d / t', { mono: 1 }], ['السيارة: ' + fmt(D[0], 3) + ' km في ' + fmt(t, 3) + ' h', { s: 12.5 }], ['الطائرة: ' + fmt(D[1], 3) + ' km', { s: 12.5 }]];
          else if (sc === 'city') L = [['d = ' + fmt(D[0], 3) + ' m   t = ' + fmt(t, 3) + ' s', { mono: 1, s: 13 }], ['S_avg = d_total / t_total', { mono: 1, s: 13 }], [t > 0 ? '= ' + fmt(D[0] / t, 3) + ' m/s' : '—', { mono: 1, s: 16, w: 900, c: '#0369a1' }], ['الانطلاق اللحظي الآن: ' + fmt(cityV(t), 2) + ' m/s', { s: 12, c: '#64748b' }]];
          else if (sc === 'odo') L = fin ? [['t = 12:40 − 10:40 = 2 h', { mono: 1, s: 13 }], ['d = 30524 − 30382 = 142 km', { mono: 1, s: 13 }], ['S_avg = 142 / 2 = 71 km/h', { mono: 1, s: 16, w: 900, c: '#0369a1' }]] : [['اقرأ المقياسين عند البداية وعند النهاية', { s: 12.5, c: '#64748b' }], ['الزمن الآن: ' + clk(t) + '   المسافة: ' + Math.round(30382 + D[0]) + ' km', { s: 12.5, mono: 1 }]];
          else if (sc === 'toy') L = [['d = ' + fmt(D[0], 3) + ' m   t = ' + fmt(t, 3) + ' s', { mono: 1 }], ['S = d / t = ' + (t > 0 ? fmt(D[0] / t, 3) : '—') + ' m/s', { mono: 1, s: 16, w: 900, c: '#0369a1' }], ['خط مستقيم في المخطط: انطلاق ثابت', { s: 12, c: '#64748b' }]];
          else L = [['S = 3 × 10⁸ m/s   t = ' + fmt(t, 3) + ' s', { mono: 1, s: 13 }], ['مسار الضوء (ذهاباً وإياباً) = S × t', { s: 12.5 }], ['= ' + (3 * t).toFixed(2) + ' × 10⁸ m', { mono: 1, s: 14, w: 900 }], [fin ? 'بعد القمر = نصفه = 3.84 × 10⁸ m' : 'انتظر عودة النبضة…', { s: 14, w: 900, c: '#16a34a' }]];
          H.box(ctx, cx, cy, cw, sc === 'moon' ? 'd = S t' : 'معدل الانطلاق', L, { bd: '#0369a1' }); }
        if (fin && !S._ch) { S._ch = 1; K.cheer(S, w / 2, h * .3); } if (!fin) S._ch = 0;
        K.party(ctx, S);
      },
      drags(S) { const c = SC[S.p.sc], w = S.W, h = S.H, x0 = 110, x1 = w - 60; return [{ id: 'time', x: x0 + (x1 - x0) * S.tt / c.T, y: h - 112, r: 22, axis: 'x', keep: true, idle: 'اسحب مؤشر الزمن ✋', tip: 'اسحب لتغيير الزمن', down: S => { S.play = false; }, drag: (S, d) => { S.tt = clamp((d.x - x0) / (x1 - x0), 0, 1) * c.T; } }]; },
      readings(S) { const c = SC[S.p.sc], D = dist(S, S.tt), t = S.tt; const L = [rd('الزمن t', fmt(t, 3) + ' ' + c.tu), rd('المسافة d', fmt(D[0], 4) + ' ' + c.du)]; if (S.p.sc === 'trip') L.push(rd('مسافة الطائرة', fmt(D[1], 4) + ' km')); if (t > 0) L.push(rd('معدل الانطلاق حتى الآن', fmt(D[0] / t, 3) + ' ' + c.du + '/' + c.tu)); return L; },
      record(S) { const c = SC[S.p.sc], D = dist(S, S.tt); return { t: +S.tt.toFixed(2), d: +D[0].toFixed(1), s: S.tt > 0 ? +(D[0] / S.tt).toFixed(2) : 0 }; },
      cols: [['t', 'الزمن t'], ['d', 'المسافة d'], ['s', 'معدل الانطلاق d/t']],
      graph: { x: 't', y: 'd', xl: 'الزمن', yl: 'المسافة' },
      explain(S) { const sc = S.p.sc; if (sc === 'trip') return 'السيارة والطائرة تقطعان <b>المسافة نفسها 450 km</b>، لكن الطائرة في <b>1 h</b> والسيارة في <b>5 h</b>: خط الطائرة في المخطط <b>أشد ميلاً</b> لأن انطلاقها أكبر (125 m/s مقابل 25 m/s).'; if (sc === 'city') return 'انطلاق السيارة <b>يتغير</b>: يزداد عند الضوء الأخضر ويصبح صفراً عند الأحمر (خط أفقي في المخطط). لذلك نستعمل <b>معدل الانطلاق</b> = المسافة الكلية ÷ الزمن الكلي.'; if (sc === 'odo') return 'الزمن المستغرق = قراءة النهاية − قراءة البداية = 2 h، والمسافة = 30524 − 30382 = 142 km، فمعدل الانطلاق = <b>71 km/h</b>.'; if (sc === 'toy') return 'اللعبة تقطع <b>1 m كل ثانية</b>، فالنقاط في مخطط (المسافة – الزمن) تقع على <b>خط مستقيم</b> كما في الشكل 2، وانطلاقها ثابت 1 m/s.'; return 'يقطع الليزر المسافة إلى القمر ذهاباً وإياباً بانطلاق 3 × 10⁸ m/s، فنحسب d = S t ثم نأخذ النصف لبعد القمر.'; },
      quiz: [
        { q: 'قطعت سيارة 450 km في 5 h. معدل انطلاقها بوحدة m/s:', o: ['90 m/s', '25 m/s', '125 m/s'], a: 1, why: '450 ÷ 5 = 90 km/h = 90 × 1000 / 3600 = 25 m/s (مثال 1).' },
        { q: 'يمكن تمثيل الانطلاق بمخطط:', o: ['المسافة – الزمن', 'الإزاحة – الزمن', 'المسافة والسرعة'], a: 0, why: 'مراجعة الفصل س2-2.' },
        { q: 'مقياس الزمن من 10:40 إلى 12:40 والمسافة من 30382 km إلى 30524 km. معدل الانطلاق:', o: ['142 km/h', '71 km/h', '284 km/h'], a: 1, why: 'd = 142 km ، t = 2 h ⇒ 142 ÷ 2 = 71 km/h (س4).' }
      ]
    });
  })();

  /* =========================================================================================
     12) نشاط: كيفية تمثيل متجه الإزاحة بالرسم (ص 16، مثال 3، شكل 2، سؤال)
     ========================================================================================= */
  (() => {
    const DIR = { E: [1, 0, 'شرقاً'], N: [0, -1, 'شمالاً'], W: [-1, 0, 'غرباً'], S: [0, 1, 'جنوباً'], NE: [Math.SQRT1_2, -Math.SQRT1_2, 'شمال الشرق'], SE: [Math.SQRT1_2, Math.SQRT1_2, 'جنوب الشرق'], NW: [-Math.SQRT1_2, -Math.SQRT1_2, 'شمال الغرب'], SW: [-Math.SQRT1_2, Math.SQRT1_2, 'جنوب الغرب'] };
    const TASK = { ex3: { n: 'مثال 3: 300 m جنوباً و 500 m شمال الشرق', u: 'm', v: [[300, 'S'], [500, 'NE']], ks: [50, 100, 200] }, act: { n: 'النشاط: سيارتان 30 km شمالاً و 50 km شرقاً', u: 'km', v: [[30, 'N'], [50, 'E']], ks: [5, 10, 20] }, q: { n: 'سؤال: 30 km غرباً و 40 km شرق الجنوب', u: 'km', v: [[30, 'W'], [40, 'SE']], ks: [5, 10, 20] } };
    const geo = S => { const w = S.W, h = S.H, c = Math.min((w - 150) / 15, (h - 310) / 11.5); return { w, h, c, ox: 80 + (w - 110) / 2 - 20, oy: 92 + 5.75 * c }; };
    const dirOf = q => { const L = Math.hypot(q[0], q[1]); if (L < .01) return null; let best = null; for (const k in DIR) { const d = DIR[k], s = (q[0] * d[0] + q[1] * d[1]) / L; if (!best || s > best[1]) best = [k, s]; } return best[0]; };
    const ok = (S, i) => { const t = TASK[S.p.task], q = S.tips[i], need = t.v[i][0] / K8(S); return dirOf(q) === t.v[i][1] && Math.abs(Math.hypot(q[0], q[1]) - need) < .02; };
    const resetTips = S => { S.tips = [[1, 0], [0, -1]]; };
    const K8 = S => TASK[S.p.task].ks[+S.p.ki];
    P8({
      id: 'g8_vecdraw', ch: 21, sec: 'الدرس الثالث: وصف الحركة', page: 16, fig: 'شكل 2', kind: 'نشاط', title: 'نشاط: تمثيل متجه الإزاحة بالرسم (مقياس الرسم)',
      desc: 'نختار مقياس رسم مناسباً، نحسب طول كل متجه = الإزاحة × (1 cm ÷ المقياس)، ثم نرسم المتجهين على ورقة المربعات بسحب رأس كل سهم إلى الطول والاتجاه الصحيحين ابتداءً من نقطة الأصل (0).',
      tags: 'متجه الإزاحة مقياس الرسم سهم اتجاه شمال جنوب شرق غرب تمثيل بالرسم',
      tools: ['ورقة مربعات', 'مسطرة', 'منقلة'],
      steps: ['اختر المسألة (مثال 3، أو النشاط، أو السؤال).', 'اختر مقياس رسم مناسباً (كل 1 cm يمثل …) بحيث يتسع الرسم في الورقة.', 'احسب طول كل متجه من بطاقة الحساب.', 'اسحب رأس السهم الأزرق ثم البرتقالي إلى الطول والاتجاه الصحيحين ابتداءً من النقطة 0.', 'عندما يصبح السهم صحيحاً يتحول إلى اللون الأخضر ✓.'],
      concl: ['لتمثيل الإزاحة بالرسم نختار مقياس رسم مناسباً، ثم نحسب طول المتجه = الإزاحة × (1 cm ÷ المقياس): 300 m × (1 cm/100 m) = 3 cm.', 'نرسم الاتجاهات الأربعة ثم نرسم كل متجه ابتداءً من نقطة الأصل (0) بالمسطرة.', 'الفائدة العملية: يمكن تمثيل إزاحات كبيرة جداً (كيلومترات) على ورقة صغيرة مع المحافظة على النسبة والاتجاه، كما في الخرائط.'],
      laws: ['g8_scale'],
      fact: ['الخرائط كلها مرسومة بمقياس رسم: على خريطة مقياسها 1 cm لكل 10 km تكون المسافة بين بغداد والحلة (نحو 100 km) قرابة 10 cm.', 'اتجاه «شمال الشرق» يقع في منتصف الزاوية بين الشمال والشرق (45°).'],
      controls: [SEL('task', 'المسألة', Object.keys(TASK).map(k => [k, TASK[k].n]), 'ex3', (v, S) => resetTips(S)),
        SEL('ki', 'مقياس الرسم (كل 1 cm يمثل)', [[0, '50 m  (أو 5 km)'], [1, '100 m  (أو 10 km)'], [2, '200 m  (أو 20 km)']], 1),
        TG('calc', 'بطاقة حساب الطول', true, null, 'labels'), TG('ticks', 'تدريج المسطرة على السهم', true, null, 'meter'), TG('rose', 'وردة الاتجاهات', true, null, 'compass'),
        BT('', [{ t: 'أعد السهمين', on: S => resetTips(S) }, { t: 'أرني الحل', on: S => { const t = TASK[S.p.task]; S.tips = t.v.map(([v, d]) => { const L = v / K8(S); return [DIR[d][0] * L, DIR[d][1] * L]; }); } }])],
      setup(S) { resetTips(S); },
      draw(ctx, w, h, S) {
        const g = geo(S), t = TASK[S.p.task], k = K8(S), p = S.p, X = x => g.ox + x * g.c, Y = y => g.oy + y * g.c;
        G.bg(ctx, w, h, false); K.raw(ctx, () => { ctx.fillStyle = '#fffdf7'; ctx.fillRect(0, 0, w, h); ctx.lineWidth = 1; for (let i = -7; i <= 7; i++) { ctx.strokeStyle = 'rgba(14,116,144,.18)'; ctx.beginPath(); ctx.moveTo(X(i), Y(-5.5)); ctx.lineTo(X(i), Y(5.5)); ctx.stroke(); } for (let j = -5; j <= 5; j++) { ctx.beginPath(); ctx.moveTo(X(-7), Y(j)); ctx.lineTo(X(7), Y(j)); ctx.stroke(); }
          ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(-7), Y(0)); ctx.lineTo(X(7), Y(0)); ctx.moveTo(X(0), Y(-5.5)); ctx.lineTo(X(0), Y(5.5)); ctx.stroke(); });
        T(ctx, 'شمال', X(0), Y(-5.5) - 12, { s: 13, w: 900, c: '#334155' }); T(ctx, 'جنوب', X(0), Y(5.5) + 12, { s: 13, w: 900, c: '#334155' }); T(ctx, 'شرق', X(7) + 22, Y(0), { s: 13, w: 900, c: '#334155' }); T(ctx, 'غرب', X(-7) - 22, Y(0), { s: 13, w: 900, c: '#334155' }); T(ctx, '0', X(0) - 10, Y(0) + 12, { s: 13, w: 900, c: '#0f172a' });
        T(ctx, 'كل مربع = 1 cm', X(-7) + 50, Y(5.5) + 12, { s: 11.5, w: 800, c: '#0f766e' });
        H.banner(ctx, w, 'اسحب رأس كل سهم إلى الطول والاتجاه الصحيحين', '#0f766e');
        if (p.rose) { const rx = w - 70, ry = 92; K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(rx, ry, 34, 0, TAU); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.stroke(); ['N', 'E', 'S', 'W', 'NE', 'SE', 'SW', 'NW'].forEach((d, i) => { const D = DIR[d], L = i < 4 ? 28 : 18; ctx.strokeStyle = i ? '#475569' : '#dc2626'; ctx.lineWidth = i < 4 ? 2.5 : 1.5; ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx + D[0] * L, ry + D[1] * L); ctx.stroke(); }); }); T(ctx, 'ش', rx, ry - 44, { s: 12, w: 900, c: '#dc2626' }); }
        const cols = ['#2563eb', '#ea580c'];
        S.tips.forEach((q, i) => {
          const good = ok(S, i), col = good ? '#16a34a' : cols[i], L = Math.hypot(q[0], q[1]);
          if (p.ticks && L > .2) K.raw(ctx, () => { const ux = q[0] / L, uy = q[1] / L; ctx.strokeStyle = col; ctx.lineWidth = 1.5; for (let m = 1; m < L - .05; m++) { const cx = X(ux * m), cy = Y(uy * m); ctx.beginPath(); ctx.moveTo(cx - uy * 7, cy + ux * 7); ctx.lineTo(cx + uy * 7, cy - ux * 7); ctx.stroke(); } });
          H.arrow(ctx, X(0), Y(0), X(q[0]), Y(q[1]), col, 5);
          const d = dirOf(q); T(ctx, (good ? '✓ ' : '') + 'X' + (i + 1) + ' = ' + fmt(L, 2) + ' cm' + (d ? ' ' + DIR[d][2] : ''), X(q[0]) + (q[0] >= 0 ? 12 : -12), Y(q[1]) + (q[1] > 0 ? 20 : -18), { s: 12.5, w: 900, c: '#fff', bg: col, a: q[0] >= 0 ? 'left' : 'right' });
          K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(X(q[0]), Y(q[1]), 9, 0, TAU); ctx.fill(); ctx.stroke(); });
        });
        if (p.calc) { const lines = t.v.map(([v, d], i) => { const L = v / k, fits = L <= (DIR[d][0] && DIR[d][1] ? 7.5 : (DIR[d][0] ? 7 : 5.5)); return [`X${i + 1} = ${v} ${t.u} ${DIR[d][2]}: ${v} × (1 cm / ${k} ${t.u}) = ${fmt(L, 3)} cm` + (fits ? '' : ' ⚠️'), { s: 12.5, c: ok(S, i) ? '#16a34a' : cols[i], w: 900 }]; });
          const big = t.v.some(([v, d]) => v / k > (DIR[d][0] && DIR[d][1] ? 7.5 : (DIR[d][0] ? 7 : 5.5)));
          if (big) lines.push(['⚠️ المقياس صغير: المتجه لا يتسع في الورقة — اختر مقياساً أكبر', { s: 12, c: '#dc2626', w: 900 }]);
          H.box(ctx, (64 + w) / 2, h - 186, Math.min(w - 110, 560), 'طول المتجه = الإزاحة × (1 cm ÷ المقياس)', lines, { bd: '#0f766e' }); }
        if (ok(S, 0) && ok(S, 1)) { if (!S._ch) { S._ch = 1; K.cheer(S, X(0), Y(0)); } T(ctx, 'أحسنت! مثّلت الإزاحتين بالرسم 🎉', (64 + w) / 2, 58, { s: 15, w: 900, c: '#fff', bg: '#16a34a' }); } else S._ch = 0;
        K.party(ctx, S);
      },
      drags(S) { const g = geo(S); return S.tips.map((q, i) => ({ id: 'tip' + i, x: g.ox + q[0] * g.c, y: g.oy + q[1] * g.c, r: 22, axis: 'xy', keep: true, hint: i === 0, idle: i === 0 ? 'اسحب رأس السهم ✋' : undefined, tip: 'اسحب رأس السهم X' + (i + 1),
        drag: (S, d) => { const x = (d.x - g.ox) / g.c, y = (d.y - g.oy) / g.c; let L = Math.round(Math.hypot(x, y) * 2) / 2; L = clamp(L, .5, 8); const a = Math.round(Math.atan2(y, x) / (Math.PI / 4)) * Math.PI / 4; let nx = Math.cos(a) * L, ny = Math.sin(a) * L; nx = clamp(nx, -7, 7); ny = clamp(ny, -5.5, 5.5); S.tips[i] = [Math.abs(nx) < 1e-9 ? 0 : nx, Math.abs(ny) < 1e-9 ? 0 : ny]; H.act(S, 'tip'); }, up: S => { if (ok(S, i)) H.snd('ok'); } })); },
      readings(S) { const t = TASK[S.p.task]; return S.tips.map((q, i) => rd('X' + (i + 1) + ' (المطلوب ' + fmt(t.v[i][0] / K8(S), 3) + ' cm ' + DIR[t.v[i][1]][2] + ')', fmt(Math.hypot(q[0], q[1]), 2) + ' cm ' + (dirOf(q) ? DIR[dirOf(q)][2] : '') + (ok(S, i) ? ' ✓' : ''), 1)); },
      explain(S) { const t = TASK[S.p.task], k = K8(S); return `بمقياس <b>1 cm لكل ${k} ${t.u}</b>: الإزاحة ${t.v[0][0]} ${t.u} تمثل بسهم طوله <b>${fmt(t.v[0][0] / k, 3)} cm</b>، والإزاحة ${t.v[1][0]} ${t.u} بسهم طوله <b>${fmt(t.v[1][0] / k, 3)} cm</b>. السهم يبدأ من نقطة الأصل 0 ويتجه باتجاه الإزاحة.`; },
      quiz: [
        { q: 'بمقياس رسم 1 cm لكل 100 m، الإزاحة 300 m تمثل بسهم طوله:', o: ['30 cm', '3 cm', '0.3 cm'], a: 1, why: '300 m × (1 cm / 100 m) = 3 cm (مثال 3).' },
        { q: 'من مميزات متجه الإزاحة أن طوله:', o: ['يتناسب مع مقدار الإزاحة', 'ثابت دائماً', 'يساوي المسافة المقطوعة'], a: 0, why: 'طول المتجه يتناسب مع مقدار الإزاحة واتجاهه هو اتجاه الإزاحة.' },
        { q: 'نبدأ رسم متجهات الإزاحة من:', o: ['نهاية الورقة', 'نقطة الأصل (0)', 'أي نقطة عشوائية'], a: 1, why: 'نرسم كل متجه ابتداءً من نقطة الأصل (0) (شكل 2).' }
      ]
    });
  })();

  /* =========================================================================================
     13) حساب محصلة إزاحتين (ص 17، مثال 4، سؤال)
     ========================================================================================= */
  (() => {
    const SC = { r1: { n: '🏃 العدّاء: 3 km شرقاً ثم 3 km شرقاً', x1: 3, x2: 3, dir: 'same', u: 'km', dw: ['الشرق', 'الغرب'] }, r2: { n: '🏃 العدّاء: 6 km شرقاً ثم 2 km غرباً', x1: 6, x2: 2, dir: 'opp', u: 'km', dw: ['الشرق', 'الغرب'] },
      e4a: { n: 'مثال 4-1: 8 km و 6 km باتجاه الشرق', x1: 8, x2: 6, dir: 'same', u: 'km', dw: ['الشرق', 'الغرب'] }, e4b: { n: 'مثال 4-2: 8 km شرقاً و 6 km غرباً', x1: 8, x2: 6, dir: 'opp', u: 'km', dw: ['الشرق', 'الغرب'] },
      car: { n: '🚗 سؤال: سيارة 50 km شمالاً ثم 20 km شمالاً', x1: 50, x2: 20, dir: 'same', u: 'km', dw: ['الشمال', 'الجنوب'] }, bike: { n: '🚲 دراجة: اختر بنفسك', x1: 5, x2: 7, dir: 'opp', u: 'km', dw: ['الشرق', 'الغرب'] } };
    const vals = S => { const s = S.p.dir === 'opp' ? -1 : 1; return { x1: S.p.x1, x2: s * S.p.x2, xr: S.p.x1 + s * S.p.x2, d: S.p.x1 + S.p.x2 }; };
    const geo = S => { const w = S.W, h = S.H, V = vals(S), span = Math.max(V.x1, V.x1 + Math.max(0, V.x2)) - Math.min(0, V.xr, V.x1 + V.x2); const lo = Math.min(0, V.x1 + V.x2), ppk = (w - 200) / Math.max(span, 1), x0 = 110 - lo * ppk; return { w, h, ppk, X: v => x0 + v * ppk, x0, gy: h * .5 }; };
    const where = (S, f) => { const V = vals(S), a = Math.abs(V.x1), b = Math.abs(V.x2), s = f * (a + b); return s <= a ? s * Math.sign(V.x1 || 1) : V.x1 + (s - a) * Math.sign(V.x2); };
    P8({
      id: 'g8_resultant', ch: 21, sec: 'الدرس الثالث: وصف الحركة', page: 17, kind: 'مثال', title: 'حساب محصلة إزاحتين (باتجاه واحد وباتجاهين متعاكسين)',
      desc: 'العدّاء يتحرك إزاحتين متتاليتين X₁ ثم X₂. نسحب النقطتين B و C لتغيير الإزاحتين ونرى سهم المحصلة X_R من A إلى C: تُجمع الإزاحتان إذا كانتا باتجاه واحد وتُطرحان إذا كانتا متعاكستين، ويكون اتجاه المحصلة باتجاه الإزاحة الأكبر.',
      tags: 'محصلة إزاحتين جمع طرح متجهات اتجاه واحد متعاكسين',
      tools: ['مسار مستقيم', 'علامات A B C'],
      steps: ['اختر المثال (العدّاء، مثال 4، السيارة).', 'اضغط «اركض» وراقب العدّاء يقطع الإزاحة الأولى X₁ ثم الثانية X₂.', 'اسحب النقطة B (نهاية X₁) أو C (نهاية X₂) لتغيير الإزاحتين.', 'غيّر «اتجاه الإزاحة الثانية» وقارن: متى نجمع ومتى نطرح؟', 'قارن المحصلة X_R بالمسافة الكلية d.'],
      concl: ['إذا كانت الإزاحتان باتجاه واحد: X_R = X₁ + X₂ (3 + 3 = 6 km باتجاه الشرق).', 'إذا كانت الإزاحتان باتجاهين متعاكسين: X_R = X₁ − X₂ (6 − 2 = 4 km باتجاه الشرق).', 'يكون اتجاه الإزاحة المحصلة باتجاه الإزاحة الأكبر.', 'المسافة الكلية d = X₁ + X₂ دائماً (لأنها كمية مقدارية).'],
      laws: ['g8_resultant'],
      fact: ['الطيار يحسب محصلة إزاحة الطائرة وإزاحة الرياح معاً، لذلك يحتاج معرفة السرعة المتجهة للرياح لا مقدارها فقط (التفكير الناقد 2 ص 19).', 'في سباق التتابع 4 × 100 m على مضمار مستقيم تكون المحصلة 400 m لأن الإزاحات كلها باتجاه واحد.'],
      controls: [SEL('sc', 'المثال', Object.keys(SC).map(k => [k, SC[k].n]), 'r1', (v, S) => { const c = SC[v]; setParam(S, 'x1', c.x1); setParam(S, 'x2', c.x2); setParam(S, 'dir', c.dir); S.f = 0; S.go = false; }),
        R('x1', 'الإزاحة الأولى X₁', 1, 60, 3, 1, 'km'), R('x2', 'الإزاحة الثانية X₂', 1, 60, 3, 1, 'km'), SEL('dir', 'اتجاه X₂', [['same', 'باتجاه X₁ نفسه'], ['opp', 'باتجاه معاكس']], 'same'),
        TG('res', 'سهم المحصلة X_R', true, null, 'vector'), TG('dist', 'المسافة الكلية d', true, null, 'labels'), TG('calc', 'بطاقة الحساب', true, null, 'graph'),
        BT('', [{ t: 'اركض ▶', on: S => { S.f = 0; S.go = true; } }, { t: 'إلى A', on: S => { S.f = 0; S.go = false; } }])],
      setup(S) { S.f = 0; S.go = false; },
      update(S, dt) { if (!S.go) return; S.f += dt / 6; if (S.f >= 1) { S.f = 1; S.go = false; H.snd('ok'); } S.ph = (S.ph || 0) + dt * 10; },
      draw(ctx, w, h, S) {
        const c = SC[S.p.sc], g = geo(S), V = vals(S), p = S.p, u = c.u, car = S.p.sc === 'car', bike = S.p.sc === 'bike';
        H.sky(ctx, w, h, g.gy + 20, { road: 50 }); [.2, .55, .85].forEach((f, i) => H.tree(ctx, 64 + (w - 64) * f, g.gy + 10, .8 + i * .1));
        H.banner(ctx, w, p.dir === 'same' ? 'إزاحتان باتجاه واحد: نجمع' : 'إزاحتان باتجاهين متعاكسين: نطرح', p.dir === 'same' ? '#2563eb' : '#dc2626');
        const ay = g.gy + 46; K.raw(ctx, () => { ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(70, ay); ctx.lineTo(w - 20, ay); ctx.stroke(); G.arrow(ctx, w - 60, ay, w - 20, ay, '#0f172a', 2.5, 10); });
        T(ctx, 'باتجاه ' + c.dw[0] + ' →', w - 80, ay - 18, { s: 11.5, w: 800, c: '#0f172a' });
        const pt = (v, l, col) => { const x = g.X(v); K.raw(ctx, () => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, ay, 8, 0, TAU); ctx.fill(); }); T(ctx, l, x, ay + 24, { s: 17, w: 900, c: '#0f172a' }); };
        pt(0, 'A', '#0f172a'); pt(V.x1, 'B', '#2563eb'); pt(V.x1 + V.x2, 'C', '#ea580c');
        // vectors
        const y1 = g.gy + 92, y2 = g.gy + 128, yr = g.gy + 176;
        H.arrow(ctx, g.X(0), y1, g.X(V.x1), y1, '#2563eb', 5, 'X₁ = ' + V.x1 + ' ' + u, { off: -16 });
        H.arrow(ctx, g.X(V.x1), y2, g.X(V.x1 + V.x2), y2, '#ea580c', 5, 'X₂ = ' + Math.abs(V.x2) + ' ' + u, { off: V.x2 > 0 ? 16 : -16 });
        if (p.res && Math.abs(V.xr) > .01) H.arrow(ctx, g.X(0), yr, g.X(V.xr), yr, '#dc2626', 7, 'X_R = ' + Math.abs(V.xr) + ' ' + u, { off: V.xr > 0 ? 18 : -18 });
        K.raw(ctx, () => { ctx.strokeStyle = 'rgba(15,23,42,.25)'; ctx.setLineDash([4, 5]); ctx.lineWidth = 1.5; [0, V.x1, V.x1 + V.x2].forEach(v => { ctx.beginPath(); ctx.moveTo(g.X(v), ay); ctx.lineTo(g.X(v), yr + 10); ctx.stroke(); }); ctx.setLineDash([]); });
        // mover
        const pos = where(S, S.f || 0), mx = g.X(pos), back = S.f > Math.abs(V.x1) / (Math.abs(V.x1) + Math.abs(V.x2)) && V.x2 < 0;
        if (car) H.car(ctx, mx, g.gy + 20, .5, { flip: back, rot: pos }); else if (bike) K.raw(ctx, () => { ctx.save(); ctx.translate(mx, g.gy + 18); ctx.scale(back ? -1 : 1, 1); ctx.strokeStyle = '#111827'; ctx.lineWidth = 3; [-18, 18].forEach(x => { ctx.beginPath(); ctx.arc(x, -14, 13, 0, TAU); ctx.stroke(); }); ctx.strokeStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(-18, -14); ctx.lineTo(0, -30); ctx.lineTo(18, -14); ctx.moveTo(0, -30); ctx.lineTo(12, -38); ctx.stroke(); ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.arc(2, -58, 8, 0, TAU); ctx.fill(); ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, -50); ctx.lineTo(-2, -34); ctx.stroke(); ctx.restore(); });
        else H.runner(ctx, mx, g.gy + 22, .9, S.go ? S.ph : 0, { flip: back, still: !S.go });
        // cards
        if (p.calc) { const same = p.dir === 'same', big = Math.abs(V.xr) < .01 ? '' : (V.xr > 0 ? c.dw[0] : c.dw[1]);
          const L = same ? [['X_R = X₁ + X₂', { mono: 1 }], ['= ' + p.x1 + ' + ' + p.x2 + ' = ' + Math.abs(V.xr) + ' ' + u, { mono: 1, s: 17, w: 900, c: '#dc2626' }], ['باتجاه ' + big, { s: 13, w: 900, c: '#dc2626' }]]
            : [[p.x1 >= p.x2 ? 'X_R = X₁ − X₂' : 'X_R = X₂ − X₁', { mono: 1 }], ['= ' + Math.max(p.x1, p.x2) + ' − ' + Math.min(p.x1, p.x2) + ' = ' + Math.abs(V.xr) + ' ' + u, { mono: 1, s: 17, w: 900, c: '#dc2626' }], [big ? 'باتجاه ' + big + ' (باتجاه الإزاحة الأكبر)' : 'المحصلة صفر: رجع إلى A', { s: 12.5, w: 900, c: '#dc2626' }]];
          H.box(ctx, w - 30 - 140, 52, 280, 'الإزاحة المحصلة', L, { bd: '#dc2626' }); }
        if (p.dist) H.box(ctx, 64 + 120, 52, 220, 'المسافة الكلية (مقدارية)', [['d = ' + p.x1 + ' + ' + p.x2 + ' = ' + V.d + ' ' + u, { mono: 1, s: 15, w: 900, c: '#475569' }]], { bd: '#94a3b8' });
      },
      drags(S) { const g = geo(S), V = vals(S), ay = g.gy + 46; return [
        { id: 'B', x: g.X(V.x1), y: ay, r: 22, axis: 'x', keep: true, idle: 'اسحب B ✋', tip: 'اسحب النقطة B لتغيير X₁', drag: (S, d) => { setParam(S, 'x1', Math.round((d.x - g.x0) / g.ppk)); H.act(S, 'B'); } },
        { id: 'C', x: g.X(V.x1 + V.x2), y: ay, r: 22, axis: 'x', keep: true, hint: false, tip: 'اسحب النقطة C لتغيير X₂ واتجاهها', drag: (S, d) => { const v = Math.round((d.x - g.x0) / g.ppk) - S.p.x1; if (v === 0) return; setParam(S, 'dir', v > 0 ? 'same' : 'opp'); setParam(S, 'x2', Math.abs(v)); H.act(S, 'C'); } }]; },
      readings(S) { const V = vals(S), c = SC[S.p.sc]; return [rd('X₁', V.x1 + ' ' + c.u + ' باتجاه ' + c.dw[0]), rd('X₂', Math.abs(V.x2) + ' ' + c.u + ' باتجاه ' + (V.x2 > 0 ? c.dw[0] : c.dw[1])), rd('المحصلة X_R', Math.abs(V.xr) + ' ' + c.u + (Math.abs(V.xr) > .01 ? ' باتجاه ' + (V.xr > 0 ? c.dw[0] : c.dw[1]) : ''), 1), rd('المسافة الكلية d', V.d + ' ' + c.u)]; },
      record(S) { const V = vals(S); return { x1: V.x1, x2: V.x2, xr: V.xr, d: V.d }; },
      cols: [['x1', 'X₁'], ['x2', 'X₂ (سالبة إذا عاكست)'], ['xr', 'X_R'], ['d', 'المسافة d']],
      explain(S) { const V = vals(S), c = SC[S.p.sc]; return S.p.dir === 'same' ? `الإزاحتان باتجاه <b>${c.dw[0]}</b> نفسه، فنجمعهما: X_R = ${S.p.x1} + ${S.p.x2} = <b>${V.xr} ${c.u}</b>. هنا المحصلة تساوي المسافة.` : `الإزاحتان <b>متعاكستان</b>، فنطرح الصغرى من الكبرى: X_R = <b>${Math.abs(V.xr)} ${c.u}</b> باتجاه الإزاحة الأكبر، بينما المسافة الكلية ${V.d} ${c.u}.`; },
      quiz: [
        { q: 'إزاحتان 8 km شرقاً و 6 km شرقاً. المحصلة:', o: ['14 km شرقاً', '2 km شرقاً', '48 km'], a: 0, why: 'X_R = 8 + 6 = 14 km باتجاه الشرق (مثال 4-1).' },
        { q: 'إزاحتان 8 km شرقاً و 6 km غرباً. المحصلة:', o: ['14 km غرباً', '2 km شرقاً', '2 km غرباً'], a: 1, why: 'X_R = 8 − 6 = 2 km باتجاه الإزاحة الأكبر (الشرق) (مثال 4-2).' },
        { q: 'تحركت سيارة 50 km شمالاً ثم 20 km شمالاً. محصلة إزاحتها:', o: ['30 km شمالاً', '70 km شمالاً', '70 km جنوباً'], a: 1, why: 'باتجاه واحد: 50 + 20 = 70 km باتجاه الشمال (سؤال ص 17).' }
      ]
    });
  })();

  /* =========================================================================================
     14) السرعة المنتظمة وغير المنتظمة (ص 18) — العدّاء والساعات كل ثانية
     ========================================================================================= */
  (() => {
    const BOOK = { uni: [0, 5, 10, 15, 20, 25, 30], non: [0, 5, 15, 25, 30] };
    const xAt = (S, t) => { if (S.p.mode === 'you') return S.mx; const P = BOOK[S.p.mode], k = Math.floor(t); if (k >= P.length - 1) return P[P.length - 1]; return P[k] + (P[k + 1] - P[k]) * (t - k); };
    const tEnd = S => S.p.mode === 'you' ? 8 : BOOK[S.p.mode].length - 1;
    const reset = S => { S.tt = 0; S.go = false; S.snaps = [0]; S.mx = 0; S.started = false; };
    const geo = S => { const w = S.W, h = S.H, x0 = 110, ppm = (w - 170) / 31; return { w, h, x0, ppm, X: m => x0 + m * ppm, gy: h * .5 }; };
    const drawWho = (ctx, who, x, y, ph, still) => { if (who === 'run') H.runner(ctx, x, y, .9, ph, { still }); else if (who === 'car') H.car(ctx, x, y, .42, { rot: ph }); else K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.strokeStyle = '#111827'; ctx.lineWidth = 3; [-18, 18].forEach(xx => { ctx.beginPath(); ctx.arc(xx, -14, 13, 0, TAU); ctx.stroke(); }); ctx.strokeStyle = '#16a34a'; ctx.beginPath(); ctx.moveTo(-18, -14); ctx.lineTo(0, -30); ctx.lineTo(18, -14); ctx.moveTo(0, -30); ctx.lineTo(12, -38); ctx.stroke(); ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(2, -60, 8, 0, TAU); ctx.fill(); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(0, -52); ctx.lineTo(-2, -34); ctx.stroke(); ctx.restore(); }); };
    P8({
      id: 'g8_uniform', ch: 21, sec: 'الدرس الثالث: وصف الحركة', page: 18, kind: 'مثال', title: 'السرعة المنتظمة وغير المنتظمة (صورة كل ثانية)',
      desc: 'نصوّر العدّاء كل ثانية (الساعات فوقه كما في الكتاب): في السرعة المنتظمة يقطع إزاحات متساوية (5 m كل ثانية)، وفي غير المنتظمة إزاحات غير متساوية. ونجرب أن نكون نحن العدّاء بالسحب ونحاول الحفاظ على سرعة منتظمة، مع مخطط (الإزاحة – الزمن).',
      tags: 'سرعة منتظمة ثابتة غير منتظمة متغيرة معدل السرعة عداء صورة كل ثانية',
      tools: ['مضمار مدرج بالأمتار', 'ساعات'],
      steps: ['اختر «سرعة منتظمة» واضغط «انطلق»: لاحظ صورة العدّاء والساعة كل ثانية.', 'اقرأ الإزاحة في كل ثانية من شريط النقاط: هل هي متساوية؟', 'اختر «سرعة غير منتظمة» وأعد التجربة: ماذا تغير؟', 'جرّب «أنا العدّاء»: اسحب العدّاء بيدك 8 ثوانٍ وحاول أن تقطع إزاحات متساوية.', 'قارن شكل مخطط (الإزاحة – الزمن) في الحالتين.'],
      concl: ['السرعة = الإزاحة ÷ الزمن (v = x / t)، وهي كمية اتجاهية وحدتها m/s.', 'السرعة المنتظمة (الثابتة): حركة الجسم الذي يقطع إزاحات متساوية خلال فترات زمنية متساوية — مخططها خط مستقيم.', 'السرعة غير المنتظمة: حركة الجسم الذي يقطع إزاحات غير متساوية خلال فترات زمنية متساوية، أي أن سرعته تتغير (تزداد أو تقل)، ومن الأفضل هنا استعمال معدل السرعة.', 'تصبح سرعة الجسم مساوية لانطلاقه عندما يتحرك في خط مستقيم وباتجاه واحد.'],
      laws: ['g8_velocity', 'g8_speed'],
      fact: ['مثبّت السرعة (Cruise control) في السيارات الحديثة يحافظ على سرعة منتظمة على الطرق الخارجية دون أن يضغط السائق على الدواسة.', 'أسرع العدّائين يقطعون 100 m في أقل من 10 s، لكن سرعتهم غير منتظمة: يتسارعون في البداية ثم تثبت سرعتهم تقريباً.'],
      controls: [SEL('mode', 'نوع الحركة', [['uni', 'سرعة منتظمة'], ['non', 'سرعة غير منتظمة'], ['you', 'أنا العدّاء ✋']], 'uni', (v, S) => reset(S)),
        SEL('who', 'المثال', [['run', '🏃 عدّاء'], ['bike', '🚲 دراجة'], ['car', '🚗 سيارة']], 'run'),
        TG('ghost', 'صورة كل ثانية + الساعة', true, null, 'stopwatch'), TG('tape', 'شريط النقاط والإزاحات', true, null, 'dot'), TG('graph', 'مخطط الإزاحة – الزمن', true, null, 'graph'), TG('vel', 'سهم السرعة', true, null, 'velocity'),
        BT('', [{ t: 'انطلق ▶', on: S => { reset(S); if (S.p.mode !== 'you') S.go = true; } }, { t: 'من البداية', on: S => reset(S) }])],
      setup(S) { reset(S); },
      update(S, dt) {
        const run = S.go || (S.p.mode === 'you' && S.started && S.tt < tEnd(S)); if (!run) return; const t0 = S.tt; S.tt = Math.min(tEnd(S), S.tt + dt); S.ph = (S.ph || 0) + dt * 10;
        if (Math.floor(S.tt + 1e-9) > Math.floor(t0 + 1e-9)) { S.snaps.push(xAt(S, Math.floor(S.tt + 1e-9))); H.snd(); }
        if (S.tt >= tEnd(S)) { S.go = false; if (S.p.mode === 'you') { const d = S.snaps.slice(1).map((x, i) => x - S.snaps[i]); S.uni = Math.max(...d) - Math.min(...d) < 1.6; } }
      },
      draw(ctx, w, h, S) {
        const g = geo(S), p = S.p, x = xAt(S, S.tt), who = p.who;
        H.sky(ctx, w, h, g.gy + 10, {}); H.tree(ctx, g.X(4), g.gy - 4, 1); H.tree(ctx, g.X(14), g.gy - 6, .6); K.raw(ctx, () => { ctx.fillStyle = '#cbd5e1'; ctx.fillRect(0, g.gy, w, 34); });
        H.banner(ctx, w, p.mode === 'uni' ? 'سرعة منتظمة: إزاحات متساوية في أزمان متساوية' : p.mode === 'non' ? 'سرعة غير منتظمة: إزاحات غير متساوية' : 'اسحب العدّاء — حاول أن تقطع 4 m كل ثانية!', p.mode === 'non' ? '#dc2626' : '#16a34a');
        // metre axis like the book
        K.raw(ctx, () => { ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.X(-1), g.gy + 30); ctx.lineTo(g.X(31), g.gy + 30); ctx.stroke(); G.arrow(ctx, g.X(30.5), g.gy + 30, g.X(31.3), g.gy + 30, '#0f172a', 2, 8); ctx.fillStyle = '#0f172a'; ctx.font = '800 13px ui-monospace'; ctx.textAlign = 'center'; ctx.direction = 'ltr'; for (let m = 0; m <= 30; m++) { ctx.fillRect(g.X(m) - .5, g.gy + 24, 1, m % 5 ? 6 : 12); if (m % 5 === 0) ctx.fillText(String(m), g.X(m), g.gy + 50); } ctx.font = '800 13px Tajawal'; ctx.fillText('meters', g.X(15), g.gy + 68); ctx.fillText('X', g.X(31.3) + 10, g.gy + 34); });
        if (p.ghost) S.snaps.forEach((sx, k) => { const gx = g.X(sx); K.raw(ctx, () => { ctx.globalAlpha = k === S.snaps.length - 1 && Math.abs(sx - x) < .01 ? 1 : .42; }); drawWho(ctx, who, gx, g.gy + 18, k * 1.7, true); K.raw(ctx, () => { ctx.globalAlpha = 1; }); H.clock(ctx, gx, g.gy - 150 - (k % 2) * 0, 15, k); T(ctx, k + ' s', gx, g.gy - 124, { s: 11, w: 900, c: '#334155' }); });
        drawWho(ctx, who, g.X(x), g.gy + 18, S.ph || 0, !(S.go || S.dragging));
        // speed arrow
        const v = p.mode === 'you' ? (S.vNow || 0) : (S.tt < tEnd(S) ? (xAt(S, Math.min(S.tt + .01, tEnd(S))) - x) / .01 : 0);
        if (p.vel && v > .1) H.arrow(ctx, g.X(x), g.gy - 108, g.X(x) + v * 9, g.gy - 108, '#16a34a', 4, fmt(v, 2) + ' m/s', { off: -14 });
        // ticker tape
        if (p.tape) { const ty = g.gy + 96; K.raw(ctx, () => { ctx.fillStyle = '#fef3c7'; ctx.fillRect(g.X(-.5), ty - 14, g.X(30.5) - g.X(-.5), 28); ctx.strokeStyle = '#d97706'; ctx.strokeRect(g.X(-.5), ty - 14, g.X(30.5) - g.X(-.5), 28); S.snaps.forEach(sx => { ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(g.X(sx), ty, 5, 0, TAU); ctx.fill(); }); });
          S.snaps.forEach((sx, k) => { if (!k) return; const d = sx - S.snaps[k - 1]; T(ctx, fmt(d, 2) + ' m', (g.X(sx) + g.X(S.snaps[k - 1])) / 2, ty + 28, { s: 11.5, w: 900, c: '#fff', bg: '#b45309' }); });
          T(ctx, 'الإزاحة في كل ثانية', g.X(-.5), ty - 26, { s: 11.5, w: 900, c: '#92400e', a: 'left' }); }
        if (p.graph) { const pts = S.snaps.map((sx, k) => [k, sx]); if (S.tt % 1 > .01) pts.push([S.tt, x]); H.graph(ctx, 80, h - 240, 270, 160, { title: 'مخطط (الإزاحة – الزمن)', xl: 't (s)', yl: 'x (m)', xmax: tEnd(S), ymax: 35, series: [{ pts, c: p.mode === 'non' ? '#dc2626' : '#16a34a', dots: 1 }] }); }
        const done = S.tt >= tEnd(S) - 1e-6;
        const lines = done ? [['x = ' + fmt(x, 3) + ' m ، t = ' + fmt(S.tt, 2) + ' s', { mono: 1, s: 13 }], ['معدل السرعة = ' + fmt(x / S.tt, 3) + ' m/s', { mono: 1, s: 15, w: 900, c: '#0369a1' }]] : [['v = x / t', { mono: 1, s: 15 }], [S.tt > 0 ? fmt(x, 3) + ' / ' + fmt(S.tt, 2) + ' = ' + fmt(x / S.tt, 3) + ' m/s' : 'اضغط «انطلق»' + (p.mode === 'you' ? ' أو اسحب العدّاء' : ''), { mono: S.tt > 0, s: 13 }]];
        if (p.mode === 'you' && done) lines.push([S.uni ? 'رائع! إزاحاتك متقاربة: سرعة شبه منتظمة 👍' : 'إزاحاتك غير متساوية: سرعة غير منتظمة', { s: 12.5, w: 900, c: S.uni ? '#16a34a' : '#dc2626' }]);
        H.box(ctx, w - 180, h - 226, 290, 'السرعة', lines, { bd: '#0369a1' });
        if (p.mode === 'you' && !S.started) T(ctx, 'اسحب العدّاء نحو اليمين — تبدأ الساعة مع أول حركة', (64 + w) / 2, g.gy - 190, { s: 13, w: 900, c: '#fff', bg: '#16a34a' });
        if (p.mode === 'you') T(ctx, 't = ' + fmt(S.tt, 2) + ' s', w - 90, 64, { s: 16, w: 900, c: '#fff', bg: '#0f172a', mono: 1 });
        if (done && !S._ch) { S._ch = 1; if (p.mode !== 'you' || S.uni) K.cheer(S, w / 2, h * .3); } if (!done) S._ch = 0;
        K.party(ctx, S);
      },
      drags(S) { if (S.p.mode !== 'you') return [{ id: 'go', x: geo(S).X(xAt(S, S.tt)), y: geo(S).gy - 30, w: 70, h: 100, hint: false, tip: 'انقر لبدء الحركة', click: S => { reset(S); S.go = true; } }]; const g = geo(S);
        return [{ id: 'me', x: g.X(S.mx), y: g.gy - 30, w: 70, h: 100, axis: 'x', keep: true, idle: 'اسحبني نحو اليمين ✋', tip: 'اسحب العدّاء بسرعة منتظمة',
          down: S => { if (S.tt >= tEnd(S)) reset(S); S.dragging = true; S.started = true; }, drag: (S, d) => { if (S.tt >= tEnd(S)) return; const nx = clamp((d.x - g.x0) / g.ppm, S.mx, 30); S.vNow = (nx - S.mx) / (1 / 60); S.mx = nx; }, up: S => { S.dragging = false; S.vNow = 0; } }]; },
      readings(S) { const x = xAt(S, S.tt); return [rd('الزمن t', fmt(S.tt, 2) + ' s'), rd('الإزاحة x', fmt(x, 3) + ' m'), rd('الإزاحات كل ثانية', S.snaps.slice(1).map((sx, k) => fmt(sx - S.snaps[k], 2)).join(' ، ') || '—', 1)]; },
      record(S) { return { t: +S.tt.toFixed(2), x: +xAt(S, S.tt).toFixed(2) }; },
      cols: [['t', 'الزمن t (s)'], ['x', 'الإزاحة x (m)']], graph: { x: 't', y: 'x', xl: 'الزمن (s)', yl: 'الإزاحة (m)' },
      explain(S) { const d = S.snaps.slice(1).map((x, k) => x - S.snaps[k]); if (!d.length) return 'اضغط «انطلق» وراقب الصورة التي تؤخذ للعدّاء <b>كل ثانية</b>.'; const eq = Math.max(...d) - Math.min(...d) < .3; return eq ? `يقطع العدّاء <b>${fmt(d[0], 2)} m كل ثانية</b> — إزاحات متساوية في أزمان متساوية: <b>سرعة منتظمة</b> ونقاط المخطط على خط مستقيم.` : `الإزاحات في كل ثانية <b>غير متساوية</b> (${d.map(v => fmt(v, 2)).join('، ')} m): <b>سرعة غير منتظمة</b> — نستعمل معدل السرعة.`; },
      quiz: [
        { q: 'سرعة الجسم الذي يقطع إزاحات متساوية في أزمان متساوية تسمى:', o: ['سرعة منتظمة', 'سرعة غير منتظمة', 'معدل السرعة'], a: 0, why: 'مراجعة الفصل س2-1.' },
        { q: 'عدّاء قطع 30 m في 6 s بسرعة منتظمة. سرعته:', o: ['180 m/s', '5 m/s', '0.2 m/s'], a: 1, why: 'v = x / t = 30 ÷ 6 = 5 m/s.' },
        { q: 'متى تصبح سرعة جسم مساوية لانطلاقه؟', o: ['عندما يتحرك في خط مستقيم وباتجاه واحد', 'عندما يرجع إلى نقطة البداية', 'عندما يتحرك في دائرة'], a: 0, why: 'عندها تتساوى الإزاحة والمسافة.' }
      ]
    });
  })();

  /* =========================================================================================
     15) التعجيل: التسارعي والتباطؤي (ص 18–19، شكل 4 و 5)
     ========================================================================================= */
  (() => {
    const VEH = { car: { n: '🚗 سيارة (كالكتاب)', v0: 20, a: 2.5 }, bike: { n: '🚲 راكب دراجة', v0: 8, a: 1 } };
    const reset = S => { const c = VEH[S.p.who]; S.tt = 0; S.go = false; S.v = S.p.mode === 'dec' ? c.v0 : 0; S.x = 0; S.snaps = [[0, S.v, 0]]; S.dots = [0]; S.vh = [[0, S.v]]; S.pedal = ''; };
    const aNow = S => { const c = VEH[S.p.who]; if (S.p.mode === 'acc') return S.go ? c.a : 0; if (S.p.mode === 'dec') return S.go && S.v > 0 ? -c.a : 0; if (S.pedal === 'gas') return c.a * 1.2; if (S.pedal === 'brake') return S.v > 0 ? -c.a * 2 : 0; return S.v > 0 ? -.3 : 0; };
    P8({
      id: 'g8_accel', ch: 21, sec: 'الدرس الثالث: وصف الحركة', page: 19, fig: 'شكل 4 و 5', kind: 'مثال', title: 'التعجيل: سيارة تسير بتسارع وبتباطؤ منتظم',
      desc: 'نضغط دواسة البنزين أو الفرامل فتتغير سرعة السيارة بانتظام: تظهر صورتها كل 2 s مع سرعتها كما في الشكلين 4 و 5، وسهم التعجيل باتجاه السرعة (تسارعي) أو عكسها (تباطؤي)، ويرسم مخطط (السرعة – الزمن) ونحسب a = Δv / t.',
      tags: 'التعجيل تسارعي تباطؤي دواسة البنزين الفرامل تغير السرعة مخطط السرعة الزمن',
      tools: ['سيارة', 'ساعة', 'عداد السرعة'],
      steps: ['اختر «تسارع منتظم» واضغط «انطلق» (أو اسحب دواسة البنزين للأسفل): تتحرك السيارة من السكون.', 'راقب صورة السيارة كل 2 s وسرعتها: 0 ، 5 ، 10 ، 15 ، 20 m/s.', 'لاحظ سهم التعجيل: باتجاه السرعة (تعجيل تسارعي).', 'اختر «تباطؤ منتظم»: السائق يضغط الفرامل من 20 m/s حتى تتوقف — أين يتجه سهم التعجيل؟', 'في «قُد بنفسك» اسحب الدواستين واقرأ التعجيل من مخطط (السرعة – الزمن).'],
      concl: ['التعجيل هو المعدل الزمني لتغير السرعة: a = Δv / t ، ووحدته m/s² ، وهو من الكميات الاتجاهية.', 'عندما تزداد سرعة الجسم بانتظام يكون التعجيل باتجاه السرعة ويسمى التعجيل التسارعي: a = (20 − 0) / 8 = 2.5 m/s².', 'عندما تتناقص سرعة الجسم بانتظام يكون التعجيل باتجاه معاكس لاتجاه السرعة ويسمى التعجيل التباطؤي: a = (0 − 20) / 8 = −2.5 m/s².', 'الحركة التي تتغير فيها السرعة بمقدار ثابت لكل وحدة زمن توصف بأنها حركة خطية بتعجيل ثابت (منتظم).'],
      laws: ['g8_accel'],
      fact: ['تتسارع بعض السيارات الرياضية من 0 إلى 100 km/h في أقل من 3 s، أي بتعجيل يقارب 10 m/s²!', 'وسائد الهواء في السيارة تعمل عندما تحس بتعجيل تباطؤي كبير جداً في أثناء الاصطدام.'],
      controls: [SEL('mode', 'الحالة', [['acc', 'تسارع منتظم (شكل 5)'], ['dec', 'تباطؤ منتظم (شكل 4)'], ['drive', 'قُد بنفسك 🦶']], 'acc', (v, S) => reset(S)),
        SEL('who', 'المثال', Object.keys(VEH).map(k => [k, VEH[k].n]), 'car', (v, S) => reset(S)),
        TG('frames', 'صورة كل 2 s مع السرعة', true, null, 'stopwatch'), TG('vel', 'أسهم السرعة', true, null, 'velocity'), TG('acc', 'سهم التعجيل a', true, null, 'force'), TG('graph', 'مخطط السرعة – الزمن', true, null, 'graph'), TG('dots', 'آثار كل 1 s', true, null, 'dot'),
        BT('', [{ t: 'انطلق ▶', on: S => { reset(S); S.go = true; } }, { t: 'من البداية', on: S => reset(S) }])],
      setup(S) { reset(S); },
      update(S, dt) {
        const drive = S.p.mode === 'drive'; if (!S.go && !drive) return; if (drive && !S.go && !S.pedal && S.v <= 0) return; if (drive) S.go = true;
        const t0 = S.tt, a = aNow(S); S.v = Math.max(0, S.v + a * dt); S.x += S.v * dt; S.tt += dt; S.rot = (S.rot || 0) + S.v * dt / .3;
        if (!drive && S.tt >= 8) { S.tt = 8; S.go = false; H.snd('ok'); }
        if (Math.floor(S.tt / 2 + 1e-9) > Math.floor(t0 / 2 + 1e-9)) { const tb = Math.floor(S.tt / 2 + 1e-9) * 2, vb = Math.max(0, S.v - a * (S.tt - tb)); S.snaps.push([tb, Math.abs(vb - Math.round(vb)) < .15 ? Math.round(vb) : vb, S.x]); if (S.snaps.length > 5) S.snaps.shift(); }
        if (Math.floor(S.tt + 1e-9) > Math.floor(t0 + 1e-9)) { S.dots.push(S.x); if (S.dots.length > 40) S.dots.shift(); }
        S.ht = (S.ht || 0) + dt; if (S.ht > .1) { S.ht = 0; S.vh.push([S.tt, S.v]); if (S.vh.length > 200) S.vh.shift(); }
      },
      draw(ctx, w, h, S) {
        const c = VEH[S.p.who], p = S.p, isCar = p.who === 'car';
        H.sky(ctx, w, h, h * .62, { road: 64 });
        H.banner(ctx, w, p.mode === 'acc' ? 'تسارع منتظم: السرعة تزداد بالمقدار نفسه كل ثانية' : p.mode === 'dec' ? 'تباطؤ منتظم: السرعة تقل بالمقدار نفسه كل ثانية' : 'اسحب دواسة البنزين أو الفرامل للأسفل', p.mode === 'dec' ? '#dc2626' : '#16a34a');
        const veh = (x, y, s, v, rot) => { if (isCar) H.car(ctx, x, y, s, { rot }); else K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s * 2.2, s * 2.2); ctx.strokeStyle = '#111827'; ctx.lineWidth = 3; [-18, 18].forEach(xx => { ctx.beginPath(); ctx.arc(xx, -14, 13, 0, TAU); ctx.stroke(); }); ctx.strokeStyle = '#2563eb'; ctx.beginPath(); ctx.moveTo(-18, -14); ctx.lineTo(0, -30); ctx.lineTo(18, -14); ctx.moveTo(0, -30); ctx.lineTo(12, -38); ctx.stroke(); ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(2, -60, 8, 0, TAU); ctx.fill(); ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(0, -52); ctx.lineTo(-2, -34); ctx.stroke(); ctx.restore(); }); };
        // book-style strip of frames every 2 s
        if (p.frames) { const n = 5, fw = (w - 100) / n; S.snaps.forEach((sn, i) => { const cx = w - 30 - fw * (n - i - .5) - 0; const xx = 70 + fw * (i + .5); T(ctx, 't = ' + sn[0] + ' s', xx, 58, { s: 13, w: 900, c: '#0f172a', mono: 1 }); T(ctx, fmt(sn[1], 3) + ' m/s', xx, 78, { s: 13, w: 900, c: '#0f172a', mono: 1 }); if (p.vel && sn[1] > .05) H.arrow(ctx, xx - 6 - sn[1] * 1.5, 96, xx - 6 + sn[1] * 1.5 + 8, 96, '#0f172a', 2.5); veh(xx, 150, .5, sn[1], 0); });
          if (p.acc && (p.mode !== 'drive' || Math.abs(aNow(S)) > .05)) { const a = p.mode === 'acc' ? 1 : p.mode === 'dec' ? -1 : Math.sign(aNow(S)); const cx = (64 + w) / 2; H.arrow(ctx, cx - a * 70, 178, cx + a * 70, 178, a > 0 ? '#16a34a' : '#dc2626', 5, 'a', { off: -14 }); T(ctx, a > 0 ? 'سيارة تسير بتسارع منتظم' : 'سيارة تسير بتباطؤ منتظم', cx, 204, { s: 13, w: 900, c: '#db2777' }); } }
        // live road (camera follows)
        const gy = h * .62 + 40, ppm = (w - 180) / 90, cam = Math.max(0, S.x - 60), X = m => 110 + (m - cam) * ppm, x = X(S.x);
        K.raw(ctx, () => { ctx.fillStyle = '#fff'; for (let m = Math.floor(cam / 5) * 5; m < cam + 100; m += 5) { const xx = X(m); ctx.fillRect(xx - 8, gy + 10, 16, 3); } ctx.fillStyle = '#334155'; ctx.font = '700 10px ui-monospace'; ctx.textAlign = 'center'; ctx.direction = 'ltr'; for (let m = Math.ceil(cam / 20) * 20; m < cam + 100; m += 20) { const xx = X(m); ctx.fillRect(xx - 2, gy - 120, 4, 120); ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(xx + 10, gy - 120, 6, 0, TAU); ctx.fill(); ctx.fillStyle = '#334155'; ctx.fillText(m + ' m', xx, gy + 40); } });
        if (p.dots) S.dots.forEach(d => { const xx = X(d); if (xx < 70) return; K.raw(ctx, () => { ctx.fillStyle = '#1d4ed8'; ctx.beginPath(); ctx.arc(xx, gy + 24, 5, 0, TAU); ctx.fill(); }); });
        veh(x, gy, isCar ? .75 : .6, S.v, S.rot || 0);
        if (p.vel && S.v > .05) H.arrow(ctx, x - 10, gy - 92, x - 10 + S.v * 6 + 10, gy - 92, '#0f172a', 4, 'v = ' + fmt(S.v, 3) + ' m/s', { off: -16 });
        const an = aNow(S); if (p.acc && Math.abs(an) > .05) H.arrow(ctx, x, gy + 46, x + Math.sign(an) * 60, gy + 46, an > 0 ? '#16a34a' : '#dc2626', 5, 'a = ' + fmt(an, 2) + ' m/s²', { off: 16 });
        H.speedo(ctx, w - 96, h * .62 - 120, 62, S.v, isCar ? 25 : 10, 'm/s', 'عداد السرعة');
        // pedals (drive mode, or showing the auto pedal)
        const pdx = w - 210, pdy = h - 140; [['brake', 'الفرامل', '#dc2626', 0], ['gas', 'البنزين', '#16a34a', 70]].forEach(([k, n, col, dx]) => { const on = S.pedal === k || (p.mode === 'acc' && S.go && k === 'gas') || (p.mode === 'dec' && S.go && k === 'brake'); K.raw(ctx, () => { ctx.save(); ctx.translate(pdx + dx, pdy + (on ? 8 : 0)); ctx.fillStyle = '#334155'; rr(ctx, -24, -36, 48, 72, 8); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.stroke(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; for (let k2 = -24; k2 <= 24; k2 += 8) { ctx.beginPath(); ctx.moveTo(-16, k2); ctx.lineTo(16, k2); ctx.stroke(); } ctx.restore(); }); T(ctx, n, pdx + dx, pdy + 54, { s: 12, w: 900, c: '#fff', bg: col }); });
        if (p.graph) { const tmax = p.mode === 'drive' ? Math.max(10, Math.ceil(S.tt / 5) * 5) : 8; H.graph(ctx, 80, h - 250, 270, 160, { title: 'مخطط (السرعة – الزمن)', xl: 't (s)', yl: 'v (m/s)', xmax: tmax, ymax: isCar ? 25 : 10, series: [{ pts: S.vh.filter(q => q[0] >= tmax - (p.mode === 'drive' ? 1e9 : 1e9)), c: an < 0 || p.mode === 'dec' ? '#dc2626' : '#16a34a' }] }); }
        // calc card
        const v0 = S.snaps[0] ? S.snaps[0][1] : 0, t0 = S.snaps[0] ? S.snaps[0][0] : 0, dtt = S.tt - (p.mode === 'drive' ? t0 : 0), vi = p.mode === 'drive' ? v0 : (p.mode === 'dec' ? c.v0 : 0);
        H.box(ctx, (64 + w) / 2 + 80, h - 250, 240, 'التعجيل = تغير السرعة ÷ الزمن', [['a = (v_f − v_i) / t', { mono: 1, s: 13 }], [S.tt > .05 ? '= (' + fmt(S.v, 3) + ' − ' + fmt(vi, 3) + ') / ' + fmt(dtt, 2) : 'اضغط «انطلق»', { mono: S.tt > .05, s: 13 }], [S.tt > .05 ? 'a = ' + fmt((S.v - vi) / Math.max(dtt, .01), 3) + ' m/s²' : '', { mono: 1, s: 17, w: 900, c: (S.v - vi) < 0 ? '#dc2626' : '#16a34a' }]], { bd: '#0369a1' });
      },
      drags(S) { const w = S.W, h = S.H, pdx = w - 210, pdy = h - 140; const ped = (k, dx) => ({ id: 'ped_' + k, x: pdx + dx, y: pdy, w: 52, h: 76, axis: 'y', keep: true, hint: k === 'gas', idle: k === 'gas' ? 'اسحب الدواسة للأسفل ✋' : undefined, tip: 'اضغط (اسحب للأسفل) دواسة ' + (k === 'gas' ? 'البنزين' : 'الفرامل'),
          down: S => { if (S.p.mode !== 'drive') setParam(S, 'mode', 'drive'); S.pedal = k; }, drag: (S) => { S.pedal = k; H.act(S, k); }, up: S => { S.pedal = ''; } });
        return [ped('gas', 70), ped('brake', 0)]; },
      readings(S) { return [rd('الزمن t', fmt(S.tt, 2) + ' s'), rd('السرعة v', fmt(S.v, 3) + ' m/s'), rd('التعجيل a', fmt(aNow(S), 3) + ' m/s²'), rd('نوع التعجيل', aNow(S) > .05 ? 'تسارعي (باتجاه السرعة)' : aNow(S) < -.05 ? 'تباطؤي (عكس السرعة)' : 'لا تعجيل', 1)]; },
      record(S) { return { t: +S.tt.toFixed(1), v: +S.v.toFixed(2) }; },
      cols: [['t', 'الزمن t (s)'], ['v', 'السرعة v (m/s)']], graph: { x: 't', y: 'v', xl: 'الزمن (s)', yl: 'السرعة (m/s)' },
      explain(S) { const a = aNow(S); if (a > .05) return `السرعة <b>تزداد</b> بمقدار ${fmt(a, 2)} m/s في كل ثانية: التعجيل <b>باتجاه السرعة</b> — <b>تعجيل تسارعي</b>. لاحظ تباعد الآثار الزرقاء.`; if (a < -.05) return `السرعة <b>تتناقص</b> بمقدار ${fmt(-a, 2)} m/s في كل ثانية: التعجيل <b>عكس اتجاه السرعة</b> — <b>تعجيل تباطؤي</b>. لاحظ تقارب الآثار.`; return S.v > .05 ? 'السرعة ثابتة تقريباً: التعجيل صفر.' : 'السيارة ساكنة. اضغط «انطلق» أو اسحب دواسة البنزين.'; },
      quiz: [
        { q: 'إذا زادت سرعة راكب دراجة تدريجياً وبانتظام فإنه يمتلك:', o: ['تعجيلاً تسارعياً', 'تعجيلاً تباطؤياً', 'سرعة ثابتة'], a: 0, why: 'مراجعة الفصل س2-3.' },
        { q: 'سيارة تغيرت سرعتها من 0 إلى 20 m/s في 8 s. تعجيلها:', o: ['160 m/s²', '2.5 m/s²', '0.4 m/s²'], a: 1, why: 'a = (20 − 0) / 8 = 2.5 m/s² (شكل 5).' },
        { q: 'هل التعجيل كمية متجهة؟', o: ['نعم، له مقدار واتجاه', 'لا، له مقدار فقط', 'لا، له اتجاه فقط'], a: 0, why: 'التعجيل من الكميات الاتجاهية: يكون باتجاه السرعة (تسارعي) أو عكسها (تباطؤي).' }
      ]
    });
  })();

  /* =========================================================================================
     16) مقارنة: المسافة والإزاحة · الانطلاق والسرعة · التعجيل — حركة واحدة وكل الكميات معاً (ص 14–19)
         الجزء 1: قُد أو اختر حركة وشاهد الكميات الخمس حيّة + جدول المقارنة
         الجزء 2: تحديات «A أم B؟» (انطلاق واحد وسرعتان، إزاحة صفر ومسافة 400 m، عداد ثابت وسرعة تتغير، الطيار والرياح…)
         الجزء 3: رتّب بطاقات جدول المقارنة
     ========================================================================================= */
  (() => {
    const COL = { d: '#ea580c', x: '#dc2626', S: '#0284c7', v: '#16a34a', a: '#7c3aed' };
    const n1 = v => String(+(Math.abs(v) < .005 ? 0 : v).toFixed(1));
    const n2 = v => String(+(Math.abs(v) < .005 ? 0 : v).toFixed(2));
    /* direction name of a vector (x east, y north) */
    const dirN = (vx, vy) => { const m = Math.hypot(vx, vy); if (m < .02) return ''; let a = Math.atan2(vy, vx) * 180 / Math.PI; if (a < 0) a += 360;
      const near = c => Math.abs(((a - c + 540) % 360) - 180) < 2.5; if (near(0)) return 'شرقاً'; if (near(90)) return 'شمالاً'; if (near(180)) return 'غرباً'; if (near(270)) return 'جنوباً';
      return a < 90 ? 'شمال الشرق' : a < 180 ? 'شمال الغرب' : a < 270 ? 'جنوب الغرب' : 'جنوب الشرق'; };
    /* speed profile: start from rest, accelerate in ta, cruise at V, brake in ta, stop after distance D */
    const prof = (t, D, V, ta) => { const tc = Math.max(0, (D - V * ta) / V), T = 2 * ta + tc; if (t <= 0 || t >= T) return 0; if (t < ta) return V * t / ta; if (t < ta + tc) return V; return V * (T - t) / ta; };
    const profT = (D, V, ta) => 2 * ta + Math.max(0, (D - V * ta) / V);
    /* trips: prog(t) → velocity [vx, vy] (m/s); end = [x, y, d] exact; f = 1 car, .5 runner */
    const TR = {
      line: { n: '➡️ رحلة مستقيمة باتجاه واحد (200 m)', mk: f => { const V = 10 * f; return { T: profT(200, V, 2), prog: t => [prof(t, 200, V, 2), 0], end: [200, 0, 200], marks: [['flag', 200, 0, 'النهاية']] }; } },
      round: { n: '🏫 إلى المدرسة 200 m والعودة (التفكير الناقد ص 19)', mk: f => { const V = 10 * f, T1 = profT(200, V, 2), P = 1.2; return { T: 2 * T1 + P, prog: t => t < T1 ? [prof(t, 200, V, 2), 0] : t < T1 + P ? [0, 0] : [-prof(t - T1 - P, 200, V, 2), 0], end: [0, 0, 400], marks: [['school', 200, 0, 'المدرسة']], wide: 1 }; } },
      circle: { n: '🏟️ لفة كاملة في مضمار دائري (400 m)', mk: f => { const V = 10 * f, R = 400 / TAU, w = V / R; return { T: 400 / V, prog: t => [V * Math.cos(w * t), V * Math.sin(w * t)], end: [0, 0, 400], track: 1 }; } },
      speedup: { n: '⛽ تسارع منتظم 0 → 20 m/s (شكل 5)', mk: f => { const V = 20 * f; return { T: 8, prog: t => [V * clamp(t / 8, 0, 1), 0], end: [4 * V, 0, 4 * V], marks: [['flag', 4 * V, 0, '']] }; } },
      slowdown: { n: '🛑 تباطؤ منتظم 20 → 0 m/s (شكل 4)', mk: f => { const V = 20 * f; return { T: 8, prog: t => [V * clamp(1 - t / 8, 0, 1), 0], end: [4 * V, 0, 4 * V] }; } },
      turn: { n: '↱ 120 m شرقاً ثم انعطاف 90 m شمالاً', mk: f => { const V = 10 * f, T1 = profT(120, V, 2), P = .8, T2 = profT(90, V, 2); return { T: T1 + P + T2, prog: t => t < T1 ? [prof(t, 120, V, 2), 0] : t < T1 + P ? [0, 0] : [0, prof(t - T1 - P, 90, V, 2)], end: [120, 90, 210], marks: [['stop', 120, 0, 'قف'], ['flag', 120, 90, 'النهاية']] }; } },
      drive: { n: '🕹️ قُد بنفسك (بنزين، فرامل، مقود)', mk: f => ({ ext: f < 1 ? [-70, 70, -45, 45] : [-140, 140, -90, 90], free: 1 }) },
      /* used by the challenges */
      cE: { mk: () => ({ T: 12, prog: () => [15, 0], end: [180, 0, 180] }) }, cW: { mk: () => ({ T: 12, prog: () => [-15, 0], end: [-180, 0, 180] }) },
      l400: { mk: f => { const V = 10 * f; return { T: profT(400, V, 2), prog: t => [prof(t, 400, V, 2), 0], end: [400, 0, 400], marks: [['flag', 400, 0, 'النهاية']] }; } },
      lc10: { mk: () => ({ T: 400 / 10, prog: () => [10, 0], end: [400, 0, 400] }) },
      windE: { mk: () => ({ T: 10, prog: () => [20, 50], end: [200, 500, 10 * Math.hypot(20, 50)], nose: Math.PI / 2, wind: [20, 0], plan: [0, 500] }) },
      windW: { mk: () => ({ T: 10, prog: () => [-20, 50], end: [-200, 500, 10 * Math.hypot(20, 50)], nose: Math.PI / 2, wind: [-20, 0], plan: [0, 500] }) }
    };
    const WHO = { car: { n: '🚗 سيارة', f: 1 }, run: { n: '🏃 عدّاء', f: .5 } };
    /* ---------- the motion engine (one moving body) ---------- */
    const route = tr => { if (tr._r) return tr._r; const P = [[0, 0]]; let x = 0, y = 0; const h = .05; for (let t = 0; t < tr.T; t += h) { const v = tr.prog(t + h / 2); x += v[0] * h; y += v[1] * h; P.push([x, y]); } P.push([tr.end[0], tr.end[1]]); return (tr._r = P); };
    const extOf = tr => { if (tr.ext) return tr.ext; const P = route(tr).concat(tr.plan ? [tr.plan] : []); let a = 0, b = 0, c = 0, d = 0; P.forEach(([x, y]) => { a = Math.min(a, x); b = Math.max(b, x); c = Math.min(c, y); d = Math.max(d, y); });
      const sx = Math.max(b - a, 40), sy = Math.max(d - c, 40), mx = (a + b) / 2, my = (c + d) / 2; return [mx - sx * .62, mx + sx * .62, my - sy * .62, my + sy * .62]; };
    const sim = (key, f, vk) => { const tr = TR[key].mk(f); const r = { key, f, vk: vk || 'car', tr, st: 0, x: 0, y: 0, d: 0, vx: 0, vy: 0, sp: 0, hd: tr.nose || 0, hist: [], path: [[0, 0]], snaps: [], done: false };
      if (tr.prog) { const v = tr.prog(0); r.vx = v[0]; r.vy = v[1]; if (Math.hypot(v[0], v[1]) > .01) r.hd = tr.nose ?? Math.atan2(v[1], v[0]); }
      r.hist = [[0, r.vx, r.vy]]; r.snaps = [{ t: 0, x: 0, y: 0, vx: r.vx, vy: r.vy }]; return r; };
    const step = (r, h, c) => {
      const tr = r.tr, t0 = r.st; let vx, vy;
      if (tr.prog) { const v = tr.prog(t0 + h / 2); vx = v[0]; vy = v[1]; }
      else { let s = r.sp + (c.gas ? 3 * r.f : c.brake ? -7 * r.f : -.35 * r.f) * h; s = clamp(s, 0, 20 * r.f); r.sp = s; r.hd += (c.left ? 1 : c.right ? -1 : 0) * Math.min(.9 * Math.min(1, s / (3 * r.f)), 3.5 * r.f / Math.max(s, .1)) * h; vx = s * Math.cos(r.hd); vy = s * Math.sin(r.hd); }
      const ox = r.x, oy = r.y; r.x += vx * h; r.y += vy * h;
      if (tr.ext) { const E = tr.ext, m = 4 * r.f; if (r.x < E[0] + m || r.x > E[1] - m || r.y < E[2] + m || r.y > E[3] - m) { r.x = clamp(r.x, E[0] + m, E[1] - m); r.y = clamp(r.y, E[2] + m, E[3] - m); r.sp = 0; r.bump = 1.2; } }
      r.d += Math.hypot(r.x - ox, r.y - oy); r.st = t0 + h;
      if (tr.prog) { const v = tr.prog(r.st); r.vx = v[0]; r.vy = v[1]; } else { r.vx = r.sp * Math.cos(r.hd); r.vy = r.sp * Math.sin(r.hd); }
      if (tr.T && r.st >= tr.T - 1e-9) { r.st = tr.T; r.x = tr.end[0]; r.y = tr.end[1]; r.d = tr.end[2]; r.done = true; }
      if (tr.prog && Math.hypot(r.vx, r.vy) > .05 && tr.nose == null) r.hd = Math.atan2(r.vy, r.vx);
      r.hist.push([r.st, r.vx, r.vy]); while (r.hist.length > 2 && r.hist[1][0] <= r.st - 1) r.hist.shift();
      const lp = r.path[r.path.length - 1]; if (Math.hypot(r.x - lp[0], r.y - lp[1]) > .3 * r.f || r.done) r.path.push([r.x, r.y]);
      if (Math.floor(r.st + 1e-9) > Math.floor(t0 + 1e-9)) r.snaps.push({ t: Math.round(r.st), x: r.x, y: r.y, vx: r.vx, vy: r.vy });
      if (r.bump) r.bump = Math.max(0, r.bump - h);
    };
    const run = (r, dt, c) => { let rem = dt; while (rem > 1e-9 && !r.done) { const h = Math.min(rem, 1 / 120); step(r, h, c || {}); rem -= h; } };
    /* acceleration as the book defines it: a = Δv / t, measured over the last 1 s */
    const acc = r => { const tq = Math.max(0, r.st - 1), H0 = r.hist; let v1 = [H0[0][1], H0[0][2]];
      for (let i = 0; i < H0.length - 1; i++) { const A = H0[i], B = H0[i + 1]; if (A[0] <= tq && B[0] >= tq) { const k = B[0] > A[0] ? (tq - A[0]) / (B[0] - A[0]) : 0; v1 = [A[1] + (B[1] - A[1]) * k, A[2] + (B[2] - A[2]) * k]; break; } }
      const dt = r.st - tq; if (dt < .15) return { ax: 0, ay: 0, dvx: 0, dvy: 0, v1, dt: 0 };
      const dvx = r.vx - v1[0], dvy = r.vy - v1[1]; return { ax: dvx / dt, ay: dvy / dt, dvx, dvy, v1, dt }; };
    const akind = (r, a) => { const am = Math.hypot(a.ax, a.ay), vm = Math.hypot(r.vx, r.vy), vm1 = Math.hypot(a.v1[0], a.v1[1]); if (am < .05) return 'لا تعجيل: السرعة ثابتة'; if (vm < .05 && vm1 < .05) return 'لا تعجيل';
      const ux = vm > .05 ? r.vx / vm : a.v1[0] / vm1, uy = vm > .05 ? r.vy / vm : a.v1[1] / vm1, c = (a.ax * ux + a.ay * uy) / am;
      return c > .9 ? 'تسارعي: السرعة تزداد' : c < -.9 ? 'تباطئي: السرعة تقل' : Math.abs(c) < .35 ? 'يغيّر اتجاه السرعة' : c > 0 ? 'يزيد السرعة ويغيّر اتجاهها' : 'يقلل السرعة ويغيّر اتجاهها'; };
    /* ---------- drawing ---------- */
    const carTop = (ctx, x, y, hd, s = 1, col = '#2563eb') => K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(-hd); ctx.scale(s, s);
      ctx.fillStyle = 'rgba(0,0,0,.25)'; rr(ctx, -21, -10, 46, 24, 7); ctx.fill();
      ctx.fillStyle = '#111827'; [[-13, -12], [11, -12], [-13, 9], [11, 9]].forEach(([a, b]) => { rr(ctx, a, b, 9, 4, 1.5); ctx.fill(); });
      const g = ctx.createLinearGradient(0, -11, 0, 11); g.addColorStop(0, shade(col, 30)); g.addColorStop(.5, col); g.addColorStop(1, shade(col, -30)); ctx.fillStyle = g; rr(ctx, -22, -11, 44, 22, 8); ctx.fill(); ctx.strokeStyle = 'rgba(15,23,42,.7)'; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.fillStyle = '#bfdbfe'; rr(ctx, 4, -8, 9, 16, 3); ctx.fill(); ctx.fillStyle = '#93c5fd'; rr(ctx, -15, -7.5, 6, 15, 2.5); ctx.fill(); ctx.fillStyle = shade(col, -15); rr(ctx, -8, -8.5, 11, 17, 3); ctx.fill();
      ctx.fillStyle = '#fef08a'; ctx.fillRect(20, -9, 2.5, 4); ctx.fillRect(20, 5, 2.5, 4); ctx.fillStyle = '#ef4444'; ctx.fillRect(-22.5, -9, 2, 4); ctx.fillRect(-22.5, 5, 2, 4); ctx.restore(); });
    const runTop = (ctx, x, y, hd, ph, s = 1) => K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(-hd); ctx.scale(s, s); ctx.lineCap = 'round'; const sw = Math.sin(ph) * 7;
      ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(-2, 2, 11, 13, 0, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, -4); ctx.lineTo(sw, -5); ctx.moveTo(0, 4); ctx.lineTo(-sw, 5); ctx.stroke();
      ctx.strokeStyle = '#f2c49b'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(-sw * .8, -12); ctx.moveTo(0, 9); ctx.lineTo(sw * .8, 12); ctx.stroke();
      ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(0, 0, 6, 10.5, 0, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#5b3716'; ctx.beginPath(); ctx.arc(1, 0, 5.2, 0, TAU); ctx.fill(); ctx.fillStyle = '#f2c49b'; ctx.beginPath(); ctx.arc(3.2, 0, 2.6, -1.3, 1.3); ctx.fill(); ctx.restore(); ctx.lineCap = 'butt'; });
    const planeTop = (ctx, x, y, hd, s = 1) => K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(-hd); ctx.scale(s, s);
      ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(-4, 6, 26, 6, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#cbd5e1'; ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(4, 0); ctx.lineTo(-6, -24); ctx.lineTo(-12, -24); ctx.lineTo(-6, 0); ctx.lineTo(-12, 24); ctx.lineTo(-6, 24); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-20, 0); ctx.lineTo(-25, -9); ctx.lineTo(-28, -9); ctx.lineTo(-25, 0); ctx.lineTo(-28, 9); ctx.lineTo(-25, 9); ctx.closePath(); ctx.fill(); ctx.stroke();
      const g = ctx.createLinearGradient(0, -5, 0, 5); g.addColorStop(0, '#f8fafc'); g.addColorStop(1, '#94a3b8'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(-2, 0, 27, 4.8, 0, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#1e3a8a'; ctx.beginPath(); ctx.ellipse(18, 0, 4, 2.5, 0, 0, TAU); ctx.fill(); ctx.restore(); });
    const body = (ctx, r, x, y, s = 1) => { if (r.tr.nose != null) planeTop(ctx, x, y, r.tr.nose, s); else if (r.vk === 'run') runTop(ctx, x, y, r.hd, r.d / (.9 * r.f) * 1.4, s * 1.5); else carTop(ctx, x, y, r.hd, s, r.col || '#2563eb'); };
    const flag = (ctx, x, y, col, lab) => { K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 30); ctx.stroke(); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, y - 30); ctx.lineTo(x + 18, y - 25); ctx.lineTo(x, y - 19); ctx.closePath(); ctx.fill(); }); if (lab) T(ctx, lab, x, y + 13, { s: 11, w: 900, c: '#fff', bg: col }); };
    /* map of one motion inside box B {x,y,w,h}; o = {path, disp, vel, acc, snap, small} */
    const drawMap = (ctx, r, B, o) => {
      const tr = r.tr, E = extOf(tr), pad = o.small ? 16 : 26, ppm = Math.min((B.w - 2 * pad) / (E[1] - E[0]), (B.h - 2 * pad) / (E[3] - E[2])), cx = B.x + B.w / 2, cy = B.y + B.h / 2, mx = (E[0] + E[1]) / 2, my = (E[2] + E[3]) / 2;
      const X = x => cx + (x - mx) * ppm, Y = y => cy - (y - my) * ppm, air = tr.nose != null;
      K.raw(ctx, () => { ctx.save(); ctx.beginPath(); rr(ctx, B.x, B.y, B.w, B.h, 12); ctx.clip();
        const g = ctx.createLinearGradient(0, B.y, 0, B.y + B.h); if (air) { g.addColorStop(0, '#7dd3fc'); g.addColorStop(1, '#bae6fd'); } else { g.addColorStop(0, '#9fd17f'); g.addColorStop(1, '#6faa52'); } ctx.fillStyle = g; ctx.fillRect(B.x, B.y, B.w, B.h);
        if (air) { ctx.fillStyle = 'rgba(255,255,255,.75)'; for (let k = 0; k < 6; k++) { const xx = B.x + ((k * 137 + (o.t || 0) * 18 * Math.sign(tr.wind[0])) % B.w + B.w) % B.w, yy = B.y + 20 + (k * 53) % (B.h - 30); ctx.beginPath(); ctx.ellipse(xx, yy, 22, 8, 0, 0, TAU); ctx.ellipse(xx + 14, yy - 5, 14, 8, 0, 0, TAU); ctx.fill(); } }
        // grid in metres
        const st = [5, 10, 20, 25, 50, 100, 200].find(q => q * ppm >= (o.small ? 34 : 44)) || 500; ctx.strokeStyle = air ? 'rgba(255,255,255,.35)' : 'rgba(255,255,255,.22)'; ctx.lineWidth = 1; ctx.beginPath();
        for (let gx = Math.ceil(E[0] / st) * st - st * 4; gx <= E[1] + st * 4; gx += st) { ctx.moveTo(X(gx), B.y); ctx.lineTo(X(gx), B.y + B.h); }
        for (let gy = Math.ceil(E[2] / st) * st - st * 4; gy <= E[3] + st * 4; gy += st) { ctx.moveTo(B.x, Y(gy)); ctx.lineTo(B.x + B.w, Y(gy)); } ctx.stroke(); o._st = st;
        // the road / track / plaza
        if (tr.free) { ctx.fillStyle = '#9ca3af'; rr(ctx, X(E[0]) + 6, Y(E[3]) + 6, (E[1] - E[0]) * ppm - 12, (E[3] - E[2]) * ppm - 12, 14); ctx.fill(); ctx.strokeStyle = '#f8fafc'; ctx.setLineDash([10, 10]); ctx.lineWidth = 2; ctx.strokeRect(X(E[0]) + 14, Y(E[3]) + 14, (E[1] - E[0]) * ppm - 28, (E[3] - E[2]) * ppm - 28); ctx.setLineDash([]); }
        else if (!air) { const P = route(tr), rw = r.vk === 'run' ? 16 : 20; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
          ctx.strokeStyle = r.vk === 'run' ? '#b45309' : '#4b5563'; ctx.lineWidth = rw + 4; ctx.beginPath(); P.forEach(([x, y], i) => i ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y))); ctx.stroke();
          ctx.strokeStyle = r.vk === 'run' ? '#c2410c' : '#6b7280'; ctx.lineWidth = rw; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 1.6; ctx.setLineDash(r.vk === 'run' ? [] : [9, 9]); ctx.stroke(); ctx.setLineDash([]); ctx.lineCap = 'butt'; }
        if (air && tr.plan) { ctx.strokeStyle = 'rgba(30,41,59,.45)'; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(tr.plan[0]), Y(tr.plan[1])); ctx.stroke(); ctx.setLineDash([]); }
        if (air) { ctx.strokeStyle = 'rgba(14,116,144,.55)'; ctx.fillStyle = 'rgba(14,116,144,.55)'; for (let k = 0; k < 4; k++) { const yy = B.y + 30 + k * (B.h - 50) / 3, xx = B.x + B.w * .14, L = 40 * Math.sign(tr.wind[0]); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(xx - L / 2, yy); ctx.lineTo(xx + L / 2, yy); ctx.stroke(); ctx.beginPath(); ctx.moveTo(xx + L / 2, yy); ctx.lineTo(xx + L / 2 - 8 * Math.sign(L), yy - 5); ctx.lineTo(xx + L / 2 - 8 * Math.sign(L), yy + 5); ctx.fill(); } }
        ctx.restore(); });
      if (air) T(ctx, 'الرياح 20 m/s ' + dirN(tr.wind[0], 0), B.x + B.w * .14, B.y + 16, { s: 11, w: 900, c: '#fff', bg: '#0e7490' });
      if (air && tr.plan) T(ctx, 'الوجهة المقصودة', X(tr.plan[0]), Y(tr.plan[1]) - 2, { s: 10.5, w: 800, c: '#fff', bg: 'rgba(30,41,59,.7)' });
      // marks
      (tr.marks || []).forEach(([k, x, y, lab]) => { const px = X(x), py = Y(y); if (k === 'school') { K.raw(ctx, () => { ctx.fillStyle = '#fde68a'; ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.5; ctx.fillRect(px - 20, py - 52, 40, 26); ctx.strokeRect(px - 20, py - 52, 40, 26); ctx.fillStyle = '#b91c1c'; ctx.beginPath(); ctx.moveTo(px - 24, py - 52); ctx.lineTo(px, py - 66); ctx.lineTo(px + 24, py - 52); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#7c2d12'; ctx.fillRect(px - 5, py - 40, 10, 14); }); T(ctx, lab, px, py - 76, { s: 11, w: 900, c: '#fff', bg: '#92400e' }); }
        else if (k === 'stop') { K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px + 22, py + 14); ctx.lineTo(px + 22, py - 14); ctx.stroke(); ctx.fillStyle = '#dc2626'; ctx.beginPath(); for (let i = 0; i < 8; i++) { const a = Math.PI / 8 + i * Math.PI / 4; ctx.lineTo(px + 22 + 11 * Math.cos(a), py - 22 + 11 * Math.sin(a)); } ctx.closePath(); ctx.fill(); }); T(ctx, lab, px + 22, py - 22, { s: 9.5, w: 900, c: '#fff' }); }
        else if (k === 'flag' && !o.small) flag(ctx, px + 4, py - 12, '#0f172a', lab); });
      if (!tr.free && !air) flag(ctx, X(0) - 4, Y(0) - 12, '#16a34a', o.small ? '' : 'البداية O');
      else { K.raw(ctx, () => { ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.arc(X(0), Y(0), 5, 0, TAU); ctx.fill(); }); T(ctx, 'O', X(0) - 12, Y(0) + 10, { s: 11, w: 900, c: '#fff', bg: '#16a34a' }); }
      // stroboscopic pictures every 1 s
      if (o.snap) r.snaps.forEach(q => { K.raw(ctx, () => { ctx.globalAlpha = .38; }); body(ctx, Object.assign({}, r, { hd: Math.hypot(q.vx, q.vy) > .05 && r.tr.nose == null ? Math.atan2(q.vy, q.vx) : r.hd }), X(q.x), Y(q.y), o.small ? .6 : .75); K.raw(ctx, () => { ctx.globalAlpha = 1; });
        if (!o.small && q.t % 2 === 0) T(ctx, q.t + ' s', X(q.x), Y(q.y) + 18, { s: 9.5, w: 800, c: '#fff', bg: 'rgba(15,23,42,.55)' }); });
      // distance: the path actually travelled
      if (o.path) K.raw(ctx, () => { ctx.strokeStyle = COL.d; ctx.lineWidth = o.small ? 3.5 : 5; ctx.lineJoin = 'round'; ctx.beginPath(); r.path.forEach(([x, y], i) => i ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y))); ctx.lineTo(X(r.x), Y(r.y)); ctx.stroke(); });
      // displacement arrow
      const xm = Math.hypot(r.x, r.y);
      if (o.disp && xm * ppm > 6) H.arrow(ctx, X(0), Y(0), X(r.x), Y(r.y), COL.x, o.small ? 3.5 : 4.5, o.small ? 'x' : 'x = ' + n1(xm) + ' m', { off: -15, s: o.small ? 11 : 12 });
      else if (o.disp && r.st > 0 && r.d > 1 && !o.small) T(ctx, 'x = 0 (رجع إلى البداية!)', X(0), Y(0) - 46, { s: 12, w: 900, c: '#fff', bg: COL.x });
      // the body itself + its vectors
      const bx = X(r.x), by = Y(r.y); body(ctx, r, bx, by, o.small ? .8 : 1);
      if (r.bump) T(ctx, 'حافة الساحة!', bx, by - 30, { s: 11, w: 900, c: '#fff', bg: '#dc2626' });
      const kv = (o.small ? 2.2 : 3.4) / Math.max(.5, r.f) * (air ? .35 : 1), vm = Math.hypot(r.vx, r.vy);
      if (o.vel && vm > .05) H.arrow(ctx, bx, by, bx + r.vx * kv, by - r.vy * kv, COL.v, o.small ? 3.5 : 4.5, o.small ? 'v' : 'v = ' + n1(vm) + ' m/s', { off: 14, s: o.small ? 11 : 12 });
      if (o.acc) { const a = acc(r), am = Math.hypot(a.ax, a.ay), ka = (o.small ? 9 : 14) / Math.max(.5, r.f); if (am > .05) H.arrow(ctx, bx, by, bx + a.ax * ka, by - a.ay * ka, COL.a, o.small ? 3 : 4, o.small ? 'a' : 'a = ' + n2(am) + ' m/s²', { off: -24, s: o.small ? 11 : 12 }); }
      // compass + scale bar
      if (!o.small) { const qx = B.x + B.w - 62, qy = B.y + 34; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.88)'; ctx.beginPath(); ctx.arc(qx, qy, 19, 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.2; ctx.stroke(); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(qx, qy - 15); ctx.lineTo(qx + 5, qy); ctx.lineTo(qx - 5, qy); ctx.fill(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.moveTo(qx, qy + 15); ctx.lineTo(qx + 5, qy); ctx.lineTo(qx - 5, qy); ctx.fill(); }); T(ctx, 'شمال', qx, qy - 28, { s: 10, w: 900, c: '#fff', bg: '#dc2626' }); T(ctx, 'شرق', qx + 36, qy, { s: 10, w: 900, c: '#fff', bg: '#334155' });
        const sb = o._st * ppm, sx = B.x + 14, sy = B.y + B.h - 14; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.9)'; rr(ctx, sx - 4, sy - 20, sb + 8, 26, 5); ctx.fill(); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sx, sy - 4); ctx.lineTo(sx, sy); ctx.lineTo(sx + sb, sy); ctx.lineTo(sx + sb, sy - 4); ctx.stroke(); }); T(ctx, o._st + ' m', sx + sb / 2, sy - 11, { s: 10.5, w: 900, c: '#0f172a', mono: 1 }); }
      return { X, Y, ppm };
    };
    /* small instruments */
    const compass = (ctx, x, y, R, vx, vy, col) => { const m = Math.hypot(vx, vy);
      K.raw(ctx, () => { ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#e2e8f0'; ctx.beginPath(); ctx.moveTo(x - R, y); ctx.lineTo(x + R, y); ctx.moveTo(x, y - R); ctx.lineTo(x, y + R); ctx.stroke(); });
      T(ctx, 'ش', x, y - R + 8, { s: 9, w: 900, c: '#64748b' }); T(ctx, 'ق', x + R - 8, y, { s: 9, w: 900, c: '#64748b' }); T(ctx, 'ج', x, y + R - 8, { s: 9, w: 900, c: '#64748b' }); T(ctx, 'غ', x - R + 8, y, { s: 9, w: 900, c: '#64748b' });
      if (m > .02) H.arrow(ctx, x, y, x + vx / m * R * .8, y - vy / m * R * .8, col, 3.5); else K.raw(ctx, () => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 4, 0, TAU); ctx.fill(); }); };
    const odometer = (ctx, x, y, d) => { const s = ('0000' + d.toFixed(1)).slice(-6); K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; rr(ctx, x - 50, y - 16, 100, 32, 6); ctx.fill(); ctx.direction = 'ltr'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '800 17px ui-monospace,monospace';
      for (let i = 0; i < 6; i++) { const cx = x - 40 + i * 16; if (s[i] === '.') { ctx.fillStyle = '#fbbf24'; ctx.fillText('.', cx, y + 2); continue; } ctx.fillStyle = i === 5 ? '#b91c1c' : '#1e293b'; rr(ctx, cx - 7, y - 12, 14, 24, 3); ctx.fill(); ctx.fillStyle = '#f8fafc'; ctx.fillText(s[i], cx, y + 1); } ctx.textBaseline = 'alphabetic'; }); T(ctx, 'm', x + 58, y, { s: 11, w: 900, c: '#334155', mono: 1 }); };
    const dvPic = (ctx, x, y, R, r, a) => { const v0 = a.v1, v1 = [r.vx, r.vy], M = Math.max(Math.hypot(v0[0], v0[1]), Math.hypot(v1[0], v1[1]), .01), k = R / M, ox = x - (v1[0] + v0[0]) / 2 * k * .5, oy = y + (v1[1] + v0[1]) / 2 * k * .5;
      K.raw(ctx, () => { ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; rr(ctx, x - R - 8, y - R - 6, 2 * R + 16, 2 * R + 12, 8); ctx.fill(); ctx.stroke(); });
      if (Math.hypot(v0[0], v0[1]) > .05) { K.raw(ctx, () => { ctx.globalAlpha = .4; }); H.arrow(ctx, ox, oy, ox + v0[0] * k, oy - v0[1] * k, COL.v, 3); K.raw(ctx, () => { ctx.globalAlpha = 1; }); }
      if (Math.hypot(v1[0], v1[1]) > .05) H.arrow(ctx, ox, oy, ox + v1[0] * k, oy - v1[1] * k, COL.v, 3);
      const dm = Math.hypot(a.dvx, a.dvy); if (dm > .03) H.arrow(ctx, ox + v0[0] * k, oy - v0[1] * k, ox + v1[0] * k, oy - v1[1] * k, COL.a, 3, 'Δv', { off: -10, s: 10 }); else T(ctx, 'Δv = 0', x, y + R - 4, { s: 10.5, w: 900, c: COL.a, mono: 1 }); };
    /* the live comparison table under the map */
    const ROWS = {
      d: { h: 'المسافة d', ty: 'مقدارية', u: 'm', law: 'طول المسار كله', ins: 'عدّاد المسافات' },
      x: { h: 'الإزاحة x', ty: 'اتجاهية', u: 'm + اتجاه', law: 'من البداية إلى النهاية', ins: 'سهم مستقيم من O' },
      S: { h: 'الانطلاق S', ty: 'مقدارية', u: 'm/s', law: 'S = d / t', ins: 'عداد السرعة: رقم فقط' },
      v: { h: 'السرعة v', ty: 'اتجاهية', u: 'm/s + اتجاه', law: 'v = x / t', ins: 'رقم + اتجاه (سهم)' },
      a: { h: 'التعجيل a', ty: 'اتجاهية', u: 'm/s²', law: 'a = Δv / t', ins: 'تغيّر السرعة كل 1 s' } };
    const tableH = full => 24 + 88 + 40 + (full ? 3 * 19 + 6 : 0);
    const drawTable = (ctx, x0, y0, W, r, full) => {
      const keys = ['d', 'x', 'S', 'v', 'a'], cw = W / 5, Ht = tableH(full), a = acc(r), xm = Math.hypot(r.x, r.y), vm = Math.hypot(r.vx, r.vy), t = r.st, am = Math.hypot(a.ax, a.ay);
      H.card(ctx, x0, y0, W, Ht, { bd: '#cbd5e1', lw: 1.5, r: 12 });
      keys.forEach((k, i) => { const cx = x0 + W - cw * (i + .5), c = COL[k], R = ROWS[k];
        K.raw(ctx, () => { ctx.fillStyle = c; rr(ctx, cx - cw / 2 + 3, y0 + 3, cw - 6, 22, 7); ctx.fill(); if (i) { ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx + cw / 2, y0 + 28); ctx.lineTo(cx + cw / 2, y0 + Ht - 6); ctx.stroke(); } });
        T(ctx, R.h, cx, y0 + 14, { s: 12.5, w: 900, c: '#fff' });
        const iy = y0 + 24 + 44;
        if (k === 'd') { odometer(ctx, cx - 6, iy - 6, r.d); T(ctx, 'عدّاد المسافات', cx, iy + 28, { s: 10, w: 800, c: '#64748b' }); }
        if (k === 'x') compass(ctx, cx, iy, 36, r.x, r.y, c);
        if (k === 'S') H.speedo(ctx, cx, iy + 10, 40, vm, 25 * r.f, 'm/s');
        if (k === 'v') compass(ctx, cx, iy, 36, r.vx, r.vy, c);
        if (k === 'a') dvPic(ctx, cx, iy, 32, r, a);
        const vy1 = y0 + 24 + 88 + 10, vy2 = vy1 + 18, sm = cw < 140 ? 11 : 12;
        if (k === 'd') { T(ctx, 'd = ' + n1(r.d) + ' m', cx, vy1, { s: sm + 1, w: 900, c, mono: 1 }); T(ctx, 'رقم فقط (بلا اتجاه)', cx, vy2, { s: 10.5, w: 800, c: '#64748b' }); }
        if (k === 'x') { T(ctx, 'x = ' + n1(xm) + ' m', cx, vy1, { s: sm + 1, w: 900, c, mono: 1 }); T(ctx, dirN(r.x, r.y) || (r.d > 1 ? 'صفر: عاد إلى O' : '—'), cx, vy2, { s: 11, w: 900, c }); }
        if (k === 'S') { T(ctx, 'd/t = ' + (t > .05 ? n1(r.d / t) : '0') + ' m/s', cx, vy1, { s: sm, w: 900, c, mono: 1 }); T(ctx, 'العداد الآن: ' + n1(vm), cx, vy2, { s: 10.5, w: 800, c: '#334155' }); }
        if (k === 'v') { T(ctx, 'x/t = ' + (t > .05 ? n1(xm / t) : '0') + ' m/s', cx, vy1, { s: sm, w: 900, c, mono: 1 }); T(ctx, vm > .05 ? 'الآن: ' + n1(vm) + ' ' + dirN(r.vx, r.vy) : 'الآن: 0', cx, vy2, { s: 10.5, w: 900, c }); }
        if (k === 'a') { T(ctx, 'Δv/t = ' + n2(am) + ' m/s²', cx, vy1, { s: sm, w: 900, c, mono: 1 }); T(ctx, akind(r, a), cx, vy2, { s: 10, w: 900, c }); }
        if (full) { const ry = y0 + 24 + 88 + 40 + 10; [['النوع: ', R.ty], ['الوحدة: ', R.u], ['', R.law], ['', R.ins]].slice(0, 3).forEach(([p, q], j) => T(ctx, p + q, cx, ry + j * 19, { s: 11, w: j ? 800 : 900, c: j ? '#334155' : (R.ty === 'اتجاهية' ? '#b91c1c' : '#0369a1'), mono: j === 2 && /=/.test(q) })); }
      });
    };
    const phoneB = () => (typeof Runner !== 'undefined' && Runner.cv && Runner.cv.__k < 1) ? 64 : 0; // the floating toolbar covers the bottom of the canvas on phones
    const ctlOf = S => ({ gas: S.kGas, brake: S.kBrake, left: S.kL, right: S.kR });
    const lay1 = S => { const w = S.W, h = S.H, full = S.p.table, th = tableH(full), top = 46, bot = h - 58 - phoneB() - th - 6; return { map: { x: 74, y: top, w: w - 74 - 12, h: Math.max(160, bot - top) }, ty: Math.max(160, bot - top) + top + 8, th, full }; };
    const reset1 = S => { const f = WHO[S.p.who].f; S.sim = sim(S.p.trip, f, S.p.who); S.sim.col = '#2563eb'; S.run = S.p.trip !== 'drive'; S.kGas = S.kBrake = S.kL = S.kR = false; };
    const TIP = {
      line: r => r.done ? 'رحلة مستقيمة باتجاه واحد: <b>المسافة = مقدار الإزاحة = 200 m</b>، لذلك <b>الانطلاق المتوسط = مقدار السرعة المتوسطة</b>. التعجيل ظهر فقط عند الانطلاق (تسارعي) وعند التوقف (تباطئي).' : 'في الخط المستقيم وباتجاه واحد يكون عدّاد المسافات مساوياً لطول سهم الإزاحة، ورقم عداد السرعة مساوياً لطول سهم السرعة.',
      round: r => r.done ? 'قطعتَ <b>400 m</b> (ذهاباً وإياباً) لكنك رجعت إلى نقطة البداية: <b>الإزاحة = صفر</b>! لذلك معدل الانطلاق d/t ليس صفراً، أما السرعة المتوسطة x/t = <b>صفر</b> (التفكير الناقد ص 19).' : r.x > 100 && r.vx < 0 ? 'في طريق العودة: <b>المسافة تزداد</b> لكن <b>الإزاحة تقل</b>، وسهم السرعة انقلب نحو الغرب مع أن عداد السرعة يقرأ الرقم نفسه.' : 'في الذهاب إلى المدرسة: المسافة والإزاحة متساويتان حتى الآن. انتظر طريق العودة!',
      circle: r => 'عداد السرعة ثابت على <b>' + n1(10 * r.f) + ' m/s</b> طوال اللفة، لكن <b>سهم السرعة يدور</b> فيتغير اتجاهه — إذن <b>السرعة تتغير</b> ويوجد <b>تعجيل</b> (Δv ليس صفراً) يتجه نحو مركز المضمار.' + (r.done ? ' وبعد لفة كاملة: المسافة 400 m والإزاحة <b>صفر</b>.' : ''),
      speedup: () => 'شكل 5: السائق يضغط دواسة البنزين فتزداد السرعة <b>بانتظام</b> 2.5 m/s كل ثانية. سهم التعجيل <b>باتجاه السرعة</b> = تعجيل تسارعي.',
      slowdown: () => 'شكل 4: السائق يضغط الفرامل فتقل السرعة <b>بانتظام</b> حتى تتوقف. سهم التعجيل <b>بعكس اتجاه السرعة</b> = تعجيل تباطئي.',
      turn: r => r.done ? 'المسافة d = 120 + 90 = <b>210 m</b>، أما الإزاحة فهي خط مستقيم من O إلى النهاية = <b>150 m شمال الشرق</b>. لذلك الانطلاق المتوسط أكبر من مقدار السرعة المتوسطة.' : 'عند الانعطاف يتغير اتجاه السرعة. لاحظ أن المسافة صارت أكبر من مقدار الإزاحة.',
      drive: r => 'اضغط مطولاً على ⛽ للتسريع و🛑 للفرامل، و↺ ↻ للمقود. جرّب: لفّ دائرة كاملة وارجع إلى O — كم المسافة؟ وكم الإزاحة؟ وحاول أن تبقي عداد السرعة ثابتاً وأنت تنعطف: هل يوجد تعجيل؟' };
    P8({
      id: 'g8_cmp_live', ch: 21, sec: 'الدرس الثالث: وصف الحركة', page: 18, fig: 'مقارنة ص 14–19', kind: 'نشاط', title: 'حركة واحدة وخمس كميات: المسافة والإزاحة، الانطلاق والسرعة والتعجيل',
      desc: 'نختار حركة (أو نقود السيارة بأنفسنا) فنرى في اللحظة نفسها: المسافة (المسار البرتقالي وعدّاد المسافات)، الإزاحة (السهم الأحمر من O)، الانطلاق (عداد السرعة: رقم فقط)، السرعة (السهم الأخضر: رقم واتجاه)، والتعجيل (تغيّر السرعة Δv كل ثانية)، مع جدول مقارنة حيّ.',
      tags: 'مقارنة المسافة الإزاحة الانطلاق السرعة التعجيل مقدارية اتجاهية عداد السرعة عداد المسافات مضمار ذهاب وإياب',
      tools: ['سيارة / عدّاء', 'عدّاد المسافات', 'عدّاد السرعة', 'بوصلة الاتجاهات', 'ساعة توقيت'],
      steps: ['اختر «الحركة» و«الجسم المتحرك» (سيارة أو عدّاء)؛ تبدأ الحركة تلقائياً.', 'راقب المسار البرتقالي (المسافة) والسهم الأحمر من O (الإزاحة): متى يتساويان؟ ومتى يختلفان؟', 'قارن عداد السرعة (الانطلاق: رقم فقط) بالسهم الأخضر (السرعة: رقم واتجاه).', 'راقب عمود التعجيل: السهم الباهت هو السرعة قبل ثانية، والغامق هو السرعة الآن، والبنفسجي Δv هو تغيّر السرعة.', 'جرّب «الذهاب إلى المدرسة والعودة» و«المضمار الدائري» ثم «قُد بنفسك».', 'اضغط «تسجيل» في نهاية كل رحلة وقارن القيم في الجدول.'],
      concl: ['المسافة (مقدارية): طول المسار كله. الإزاحة (اتجاهية): أقصر خط مستقيم من البداية إلى النهاية مع الاتجاه.', 'الانطلاق (مقداري) S = d / t ويبيّنه عداد السرعة رقماً فقط. السرعة (اتجاهية) v = x / t: مقدار مع اتجاه.', 'التعجيل (اتجاهي) a = Δv / t: يحدث إذا تغيّر مقدار السرعة (تسارع أو تباطؤ) أو تغيّر اتجاهها (انعطاف).', 'في خط مستقيم وباتجاه واحد: المسافة = مقدار الإزاحة، والانطلاق = مقدار السرعة.', 'إذا رجع الجسم إلى نقطة البداية فإزاحته صفر مهما كانت المسافة التي قطعها.'],
      laws: ['g8_speed', 'g8_velocity', 'g8_accel', 'g8_avgspeed'],
      fact: ['عداد السرعة في السيارة يقيس الانطلاق فقط (رقم بلا اتجاه)، أما جهاز الملاحة GPS فيعرف الانطلاق والاتجاه معاً — أي السرعة.', 'في مضمار سباق 400 m يقطع العدّاء في السباق الكامل مسافة 400 m لكن إزاحته صفر لأنه ينتهي حيث بدأ.'],
      controls: [SEL('trip', 'الحركة', Object.keys(TR).filter(k => TR[k].n).map(k => [k, TR[k].n]), 'line', (v, S) => reset1(S)),
        SEL('who', 'الجسم المتحرك', Object.keys(WHO).map(k => [k, WHO[k].n]), 'car', (v, S) => { setParam(S, 'ff', v === 'run' ? '4' : '2'); reset1(S); }),
        SEL('ff', 'تسريع الزمن', [['1', '×1 (الزمن الحقيقي)'], ['2', '×2'], ['4', '×4']], '2'),
        TG('path', 'المسافة: المسار المقطوع', true, null, 'dot'), TG('disp', 'سهم الإزاحة', true, null, 'vector'), TG('vel', 'سهم السرعة', true, null, 'velocity'), TG('acc', 'سهم التعجيل', true, null, 'force'), TG('snap', 'صورة كل ثانية', false, null, 'stopwatch'), TG('table', 'جدول المقارنة (النوع والوحدة والقانون)', true, null, 'graph'),
        BT('', [{ t: '▶ / ⏸ الحركة', on: S => { if (S.sim.done) reset1(S); else S.run = !S.run; } }, { t: '↺ من البداية', on: S => reset1(S) }])],
      setup(S) { reset1(S); },
      update(S, dt) { if (!S.sim) reset1(S); if (S.run) { run(S.sim, dt * (+S.p.ff || 1), ctlOf(S)); if (S.sim.done) { S.run = false; if (!S._fin) { S._fin = 1; H.snd('ok'); } } } else S._fin = S.sim.done ? 1 : 0; },
      draw(ctx, w, h, S) {
        const r = S.sim, L = lay1(S), p = S.p;
        G.bg(ctx, w, h, false); K.raw(ctx, () => { ctx.fillStyle = '#eef2f7'; ctx.fillRect(0, 0, w, h); });
        drawMap(ctx, r, L.map, { path: p.path, disp: p.disp, vel: p.vel, acc: p.acc, snap: p.snap, t: S.t });
        H.banner(ctx, w, 'حركة واحدة… خمس كميات: d · x · S · v · a', '#0f766e', 22);
        // stopwatch + play button on the map
        const sx = L.map.x + 44, sy = L.map.y + 64; H.stopwatch(ctx, sx, sy, 28, r.st, S.run);
        if (!r.tr.free) C2.btn(ctx, sx + 92, sy - 10, 104, 34, r.done ? '↺ أعِد' : S.run ? '⏸ إيقاف' : '▶ انطلق', { col: S.run ? '#b45309' : '#16a34a', s: 12.5 });
        if (+p.ff > 1) T(ctx, 'الزمن مُسرَّع ×' + p.ff, sx, sy + 44, { s: 10, w: 800, c: '#fff', bg: 'rgba(15,23,42,.6)' });
        if (r.tr.free) { const B = this.pedals(S); B.forEach(b => C2.btn(ctx, b.x, b.y, b.w, b.h, b.l, { col: b.c, on: S[b.k], s: 13 })); }
        drawTable(ctx, 74, L.ty, w - 86, r, L.full);
        if (r.done && !S._party) { S._party = 1; K.cheer(S, L.map.x + L.map.w / 2, L.map.y + 60); } if (!r.done) S._party = 0; K.party(ctx, S);
      },
      pedals(S) { const L = lay1(S), m = L.map, y = m.y + m.h - 36, bw = 70, bh = 48;
        return [{ k: 'kGas', l: '⛽ بنزين', c: '#16a34a', x: m.x + m.w - 50, y, w: bw, h: bh }, { k: 'kBrake', l: '🛑 فرامل', c: '#dc2626', x: m.x + m.w - 130, y, w: bw, h: bh }, { k: 'kL', l: '↺ يسار', c: '#2563eb', x: m.x + 130, y, w: bw, h: bh }, { k: 'kR', l: '↻ يمين', c: '#2563eb', x: m.x + 210, y, w: bw, h: bh }]; },
      drags(S) { const r = S.sim; if (!r) return []; const L = lay1(S), sx = L.map.x + 44, sy = L.map.y + 64, D = [];
        if (!r.tr.free) D.push({ id: 'go', x: sx + 92, y: sy - 10, w: 110, h: 40, hint: !S.run && !r.done && r.st === 0, idle: 'انقر للتشغيل أو الإيقاف ✋', tip: 'تشغيل / إيقاف الحركة', click: S2 => { if (S2.sim.done) reset1(S2); else S2.run = !S2.run; H.snd(); } });
        else this.pedals(S).forEach((b, i) => D.push({ id: 'ped_' + b.k, x: b.x, y: b.y, w: b.w + 6, h: b.h + 6, axis: 'xy', keep: true, hint: i === 0, idle: i === 0 ? 'اضغط مطولاً على البنزين ✋' : undefined, tip: 'اضغط مطولاً: ' + b.l,
          down: S2 => { S2[b.k] = true; S2.run = true; }, drag: S2 => { S2[b.k] = true; }, up: S2 => { S2[b.k] = false; } }));
        return D; },
      readings(S) { const r = S.sim; if (!r) return []; const a = acc(r), xm = Math.hypot(r.x, r.y), vm = Math.hypot(r.vx, r.vy), t = r.st;
        return [rd('الزمن t', n1(t) + ' s'), rd('المسافة d', n1(r.d) + ' m'), rd('الإزاحة x', n1(xm) + ' m ' + dirN(r.x, r.y)), rd('عداد السرعة (الانطلاق الآن)', n1(vm) + ' m/s = ' + n1(vm * 3.6) + ' km/h'), rd('معدل الانطلاق S = d / t', t > .05 ? n2(r.d / t) + ' m/s' : '—'),
          rd('السرعة الآن', n1(vm) + ' m/s ' + dirN(r.vx, r.vy)), rd('السرعة المتوسطة v = x / t', t > .05 ? n2(xm / t) + ' m/s ' + dirN(r.x, r.y) : '—'), rd('التعجيل a = Δv / t', n2(Math.hypot(a.ax, a.ay)) + ' m/s² — ' + akind(r, a), 1)]; },
      record(S) { const r = S.sim, xm = Math.hypot(r.x, r.y), t = r.st; if (t < .2) { Runner.toast('شغّل الحركة أولاً', 'info'); return null; } const a = acc(r);
        return { trip: (TR[S.p.trip].n || '').replace(/^\S+\s/, '').slice(0, 26), t: +t.toFixed(1), d: +r.d.toFixed(1), x: +xm.toFixed(1), S: +(r.d / t).toFixed(2), v: +(xm / t).toFixed(2), a: +Math.hypot(a.ax, a.ay).toFixed(2) }; },
      cols: [['trip', 'الحركة'], ['t', 't (s)'], ['d', 'المسافة d (m)'], ['x', 'الإزاحة x (m)'], ['S', 'S = d/t (m/s)'], ['v', 'v = x/t (m/s)'], ['a', 'a (m/s²)']],
      graph: { x: 'd', y: 'x', xl: 'المسافة d (m)', yl: 'مقدار الإزاحة x (m)' },
      explain(S) { const r = S.sim; if (!r) return ''; const vm = Math.hypot(r.vx, r.vy), xm = Math.hypot(r.x, r.y), a = acc(r);
        return '<div style="margin-bottom:6px">' + TIP[S.p.trip](r) + '</div>' +
          `<div>🟠 <b style="color:${COL.d}">المسافة</b> ${n1(r.d)} m: كم مشيت على الطريق كله (رقم فقط).<br>🔴 <b style="color:${COL.x}">الإزاحة</b> ${n1(xm)} m ${dirN(r.x, r.y)}: من نقطة البداية إلى مكانك الآن بخط مستقيم.<br>🔵 <b style="color:${COL.S}">الانطلاق</b> ${n1(vm)} m/s: ما يقرؤه عداد السرعة — رقم بلا اتجاه.<br>🟢 <b style="color:${COL.v}">السرعة</b> ${n1(vm)} m/s ${dirN(r.vx, r.vy)}: الرقم نفسه <b>مع الاتجاه</b>.<br>🟣 <b style="color:${COL.a}">التعجيل</b> ${n2(Math.hypot(a.ax, a.ay))} m/s²: ${akind(r, a)}.</div>`; },
      quiz: [
        { q: 'سيارة سارت في مضمار دائري وعداد سرعتها ثابت على 10 m/s. هل لها تعجيل؟', o: ['لا، لأن الانطلاق ثابت', 'نعم، لأن اتجاه السرعة يتغير', 'لا، لأنها لا تتوقف'], a: 1, why: 'التعجيل = تغير السرعة ÷ الزمن، والسرعة كمية اتجاهية: تغيّر الاتجاه وحده يعني تغيّر السرعة.' },
        { q: 'أيّ مما يأتي يقيسه عداد السرعة في السيارة؟', o: ['الانطلاق', 'السرعة مع الاتجاه', 'الإزاحة'], a: 0, why: 'العداد يعطي رقماً بلا اتجاه، أي الانطلاق.' },
        { q: 'سرت 120 m شرقاً ثم 90 m شمالاً. المسافة والإزاحة:', o: ['210 m و 210 m', '210 m و 150 m شمال الشرق', '150 m و 210 m'], a: 1, why: 'المسافة = 120 + 90 = 210 m، والإزاحة = خط مستقيم من البداية إلى النهاية = 150 m.' }
      ]
    });

    /* ---------- Part 2: challenges «A أم B؟» ---------- */
    const CASES = {
      c1: { n: 'نفس الانطلاق… والسرعة مختلفة؟', A: ['cE', 'car', 'السيارة A: 15 m/s شرقاً'], B: ['cW', 'car', 'السيارة B: 15 m/s غرباً'],
        q: 'عدّادا السرعة يقرآن 15 m/s في السيارتين. هل للسيارتين السرعة نفسها؟', o: ['نعم، لأن الرقم نفسه', 'لا؛ الانطلاق نفسه لكن الاتجاه مختلف فالسرعة مختلفة', 'لا؛ لأن انطلاقهما مختلف'], a: 1,
        why: 'الانطلاق رقم فقط (15 m/s في الاثنين). السرعة رقم + اتجاه: A شرقاً و B غرباً، إذن سرعتاهما مختلفتان.' },
      c2: { n: 'إزاحة صفر… ومسافة 400 m', A: ['round', 'run', 'A: إلى المدرسة 200 m ثم العودة'], B: ['l400', 'run', 'B: يسير 400 m في خط مستقيم'],
        q: 'بعد انتهاء الرحلتين، قطع كلٌّ منهما 400 m. أيّهما إزاحته صفر؟', o: ['A: الذهاب إلى المدرسة والعودة', 'B: السير 400 m في خط مستقيم', 'كلاهما، لأن المسافة 400 m'], a: 0,
        why: 'A رجع إلى نقطة البداية فإزاحته صفر مع أن المسافة 400 m (التفكير الناقد ص 19). أما B فإزاحته 400 m شرقاً.' },
      c3: { n: 'العداد ثابت… والسرعة تتغير', A: ['circle', 'car', 'A: مضمار دائري 10 m/s'], B: ['lc10', 'car', 'B: طريق مستقيم 10 m/s'],
        q: 'العدادان ثابتان على 10 m/s طوال الوقت. أيّ السيارتين لها تعجيل؟', o: ['A: في المضمار الدائري', 'B: على الطريق المستقيم', 'لا أحد؛ لأن الانطلاق ثابت'], a: 0,
        why: 'في A يتغير اتجاه السرعة باستمرار، فتتغير السرعة (Δv ≠ 0) ويوجد تعجيل. في B لا يتغير المقدار ولا الاتجاه: التعجيل صفر.' },
      c4: { n: 'متى تساوي السرعةُ الانطلاقَ؟', A: ['line', 'car', 'A: 200 m في خط مستقيم'], B: ['turn', 'car', 'B: 120 m شرقاً ثم 90 m شمالاً'],
        q: 'في أيّ رحلة يكون مقدار الإزاحة مساوياً للمسافة، فيتساوى معدل الانطلاق ومقدار السرعة المتوسطة؟', o: ['A: خط مستقيم وباتجاه واحد', 'B: رحلة فيها انعطاف', 'في الرحلتين'], a: 0,
        why: 'تصبح سرعة الجسم مساوية لانطلاقه (مقداراً) عندما يتحرك في خط مستقيم وباتجاه واحد (مراجعة الدرس ص 19). في B: d = 210 m و x = 150 m.' },
      c5: { n: 'تعجيل تسارعي أم تباطئي؟', A: ['speedup', 'car', 'A: تسارع 0 → 20 m/s (شكل 5)'], B: ['slowdown', 'car', 'B: تباطؤ 20 → 0 m/s (شكل 4)'],
        q: 'في أيّ سيارة يكون التعجيل بعكس اتجاه السرعة؟', o: ['A: السيارة التي تتسارع', 'B: السيارة التي تتباطأ', 'لا يوجد تعجيل في الحالتين'], a: 1,
        why: 'عند الضغط على الفرامل تتناقص السرعة بانتظام ويكون التعجيل باتجاه معاكس لاتجاه السرعة: تعجيل تباطئي (شكل 4).' },
      c6: { n: 'الطيار والرياح (التفكير الناقد ص 19)', A: ['windE', 'plane', 'A: الرياح 20 m/s شرقاً'], B: ['windW', 'plane', 'B: الرياح 20 m/s غرباً'],
        q: 'الطائرتان تتجهان شمالاً، والرياح لها الانطلاق نفسه 20 m/s. هل تصلان إلى المكان نفسه؟', o: ['نعم، لأن انطلاق الرياح نفسه', 'لا؛ اتجاه الرياح مختلف، لذلك يحتاج الطيار سرعة الرياح (مقدار + اتجاه)', 'لا؛ لأن انطلاق الطائرتين مختلف'], a: 1,
        why: 'الرياح تدفع الطائرة A نحو الشرق و B نحو الغرب. لذلك يتطلب من الطيار معرفة السرعة المتجهة للرياح (مقدارها واتجاهها) وليس مقدار سرعتها فقط.' } };
    const CK = Object.keys(CASES);
    const reset2 = S => { const c = CASES[S.p.cs]; const fo = k => k === 'run' ? .5 : 1; S.A = sim(c.A[0], fo(c.A[1]), c.A[1]); S.B = sim(c.B[0], fo(c.B[1]), c.B[1]); S.A.col = '#2563eb'; S.B.col = '#e11d48'; S.run = true; S.pick = null; };
    const lay2 = S => { const w = S.W, h = S.H - phoneB(), qh = 196, top = 46, lh = Math.max(110, (h - 34 - qh - top - 8) / 2), pw = Math.min(250, (w - 74) * .36);
      const lane = i => ({ map: { x: 74, y: top + i * (lh + 4), w: w - 74 - 12 - pw - 6, h: lh }, pan: { x: w - 12 - pw, y: top + i * (lh + 4), w: pw, h: lh } });
      const qy = top + 2 * lh + 12, bw = Math.min(w - 100, 640), ox = (74 + w - 12) / 2; return { lane, qy, bw, ox, opt: j => ({ x: ox, y: qy + 64 + j * 38, w: bw, h: 33 }), next: { x: 74 + 70, y: qy + 16, w: 128, h: 28 } }; };
    const miniPanel = (ctx, P, r, tag, col) => {
      H.card(ctx, P.x, P.y, P.w, P.h, { bd: col, lw: 2, r: 12 }); T(ctx, tag, P.x + P.w / 2, P.y + 13, { s: 11.5, w: 900, c: '#fff', bg: col });
      const a = acc(r), vm = Math.hypot(r.vx, r.vy), xm = Math.hypot(r.x, r.y), sr = Math.min(40, P.h * .19), cy = P.y + 34 + sr;
      H.speedo(ctx, P.x + P.w * .28, cy, sr, vm, r.tr.nose != null ? 60 : 25 * r.f, 'm/s');
      compass(ctx, P.x + P.w * .74, cy - sr * .1, sr * .85, r.vx, r.vy, COL.v);
      T(ctx, 'عداد السرعة', P.x + P.w * .28, cy + sr * .72, { s: 10, w: 900, c: COL.S }); T(ctx, 'اتجاه السرعة', P.x + P.w * .74, cy + sr * .9, { s: 10, w: 900, c: COL.v });
      const L = [['المسافة d = ' + n1(r.d) + ' m', COL.d], ['الإزاحة x = ' + n1(xm) + ' m ' + (dirN(r.x, r.y) || ''), COL.x], ['السرعة v = ' + n1(vm) + ' m/s ' + (dirN(r.vx, r.vy) || ''), COL.v], ['التعجيل a = ' + n2(Math.hypot(a.ax, a.ay)) + ' m/s²', COL.a]];
      const y0 = cy + sr + 16, lh = Math.min(20, (P.y + P.h - 10 - y0) / 3.5); L.forEach(([t, c], i) => T(ctx, t, P.x + P.w - 12, y0 + i * lh, { s: 12, w: 900, c, a: 'right' }));
    };
    P8({
      id: 'g8_cmp_cases', ch: 21, sec: 'الدرس الثالث: وصف الحركة', page: 19, fig: 'التفكير الناقد ص 19', kind: 'نشاط', title: 'تحديات المقارنة: A أم B؟',
      desc: 'حركتان تجريان معاً (A و B) ولكل منهما عداد سرعة وبوصلة لاتجاه السرعة وقيم d و x و v و a. نجيب عن سؤال يكشف الفرق: انطلاق واحد وسرعتان، إزاحة صفر ومسافة 400 m، عداد ثابت وسرعة تتغير، تسارع وتباطؤ، والطيار والرياح.',
      tags: 'تحدي مقارنة انطلاق سرعة إزاحة مسافة تعجيل الرياح الطيار',
      tools: ['سيارتان / عدّاءان / طائرتان', 'عدادا سرعة', 'بوصلتان'],
      steps: ['اختر التحدي (1 إلى 6). تبدأ الحركتان A و B معاً.', 'راقب عدّاد السرعة وبوصلة اتجاه السرعة والقيم d و x و v و a لكل حركة.', 'اقرأ السؤال وانقر على الإجابة التي تراها صحيحة.', 'اقرأ التفسير، ثم انقر «التحدي التالي».'],
      concl: ['الانطلاق نفسه لا يعني السرعة نفسها: يجب أن يكون الاتجاه نفسه أيضاً.', 'الإزاحة صفر إذا عاد الجسم إلى نقطة البداية، مهما كانت المسافة.', 'إذا تغيّر اتجاه السرعة ولو بقي الانطلاق ثابتاً فهناك تعجيل.', 'يحتاج الطيار سرعة الرياح المتجهة (مقدار + اتجاه) لا مقدارها فقط.'],
      laws: ['g8_velocity', 'g8_accel'],
      fact: ['تُعطى الطائرات قبل الإقلاع نشرة جوية فيها سرعة الرياح واتجاهها على ارتفاعات مختلفة، فيعدّل الطيار اتجاه الطائرة ليصل إلى وجهته.'],
      controls: [SEL('cs', 'التحدي', CK.map((k, i) => [k, (i + 1) + ') ' + CASES[k].n]), 'c1', (v, S) => reset2(S)),
        BT('', [{ t: '↺ أعِد الحركتين', on: S => { const pk = S.pick; reset2(S); S.pick = pk; } }, { t: 'التحدي التالي ←', on: S => { setParam(S, 'cs', CK[(CK.indexOf(S.p.cs) + 1) % CK.length]); reset2(S); } }])],
      setup(S) { S.score = 0; S.tried = 0; reset2(S); },
      update(S, dt) { if (!S.A) reset2(S); if (S.run) { const k = CASES[S.p.cs].A[1] === 'run' ? 4 : 2; run(S.A, dt * k); run(S.B, dt * k); if (S.A.done && S.B.done) S.run = false; } },
      draw(ctx, w, h, S) {
        const c = CASES[S.p.cs], L = lay2(S);
        G.bg(ctx, w, h, false); K.raw(ctx, () => { ctx.fillStyle = '#eef2f7'; ctx.fillRect(0, 0, w, h); });
        H.banner(ctx, w, '🎯 التحدي ' + (CK.indexOf(S.p.cs) + 1) + ' من ' + CK.length + ': ' + c.n, '#0f766e', 22);
        [[S.A, c.A[2], '#2563eb'], [S.B, c.B[2], '#e11d48']].forEach(([r, tag, col], i) => { const Q = L.lane(i); drawMap(ctx, r, Q.map, { path: true, disp: true, vel: true, acc: true, small: true, t: S.t });
          T(ctx, i ? 'B' : 'A', Q.map.x + 16, Q.map.y + 16, { s: 14, w: 900, c: '#fff', bg: col }); miniPanel(ctx, Q.pan, r, tag, col); });
        H.card(ctx, 74, L.qy, w - 86, h - phoneB() - 34 - L.qy - 4, { bd: '#0f766e', lw: 2, r: 12 });
        const ql = wrapT(c.q, Math.floor((w - 400) / 7)); ql.forEach((t, k) => T(ctx, t, (74 + 220 + w - 90) / 2, L.qy + 16 + k * 19, { s: 13.5, w: 900, c: '#0f172a' }));
        c.o.forEach((t, j) => { const b = L.opt(j), right = S.pick != null && j === c.a, wrong = S.pick === j && j !== c.a; C2.btn(ctx, b.x, b.y, b.w, b.h, t, { col: S.pick == null ? '#475569' : right ? '#16a34a' : wrong ? '#dc2626' : '#94a3b8', on: S.pick === j, s: b.w < 520 ? 11.5 : 12.5 }); });
        { const nb = L.next; C2.btn(ctx, nb.x, nb.y, nb.w, nb.h, S.pick != null ? 'التحدي التالي ←' : '↺ أعد الحركتين', { col: S.pick != null ? '#0f766e' : '#475569', s: 11.5 }); }
        T(ctx, 'نقاطك: ' + S.score + ' / ' + S.tried, w - 56, L.qy - 2, { s: 11.5, w: 900, c: '#fff', bg: '#0f766e' });
        K.party(ctx, S);
      },
      drags(S) { const c = CASES[S.p.cs], L = lay2(S), nb = L.next, D = [{ id: 'next', x: nb.x, y: nb.y, w: nb.w, h: nb.h, hint: true, idle: 'شاهد الحركتين ثم انقر إجابتك ✋', tip: S.pick != null ? 'التحدي التالي' : 'أعد تشغيل الحركتين',
          click: S2 => { if (S2.pick != null) { setParam(S2, 'cs', CK[(CK.indexOf(S2.p.cs) + 1) % CK.length]); reset2(S2); } else { reset2(S2); } H.snd(); } }].concat(c.o.map((t, j) => { const b = L.opt(j); return { id: 'opt' + j, x: b.x, y: b.y, w: b.w, h: b.h, hint: false, tip: 'اختر: ' + t,
          click: S2 => { if (S2.pick != null) return; S2.pick = j; S2.tried++; if (j === c.a) { S2.score++; H.snd('ok'); K.cheer(S2, b.x, b.y); } else H.snd('bad'); H.act(S2, 'opt'); } }; }));
        return D; },
      readings(S) { if (!S.A) return []; const f = r => n1(r.d) + ' m | x ' + n1(Math.hypot(r.x, r.y)) + ' m'; const c = CASES[S.p.cs]; return [rd('A: d | x', f(S.A)), rd('B: d | x', f(S.B)), rd('A: v', n1(Math.hypot(S.A.vx, S.A.vy)) + ' m/s ' + dirN(S.A.vx, S.A.vy)), rd('B: v', n1(Math.hypot(S.B.vx, S.B.vy)) + ' m/s ' + dirN(S.B.vx, S.B.vy)), rd('إجابتك', S.pick == null ? '—' : (S.pick === c.a ? '✔ صحيحة' : '✘ خاطئة'), 1), rd('النقاط', S.score + ' / ' + S.tried)]; },
      explain(S) { const c = CASES[S.p.cs]; if (S.pick == null) return 'شاهد الحركتين A و B وقارن <b>عداد السرعة</b> (الانطلاق) مع <b>سهم السرعة</b> (الاتجاه)، و<b>المسافة</b> d مع <b>الإزاحة</b> x، ثم أجب: ' + c.q;
        return (S.pick === c.a ? '<b style="color:#15803d">✔ صحيح!</b> ' : '<b style="color:#b91c1c">✘ ليس صحيحاً.</b> الإجابة: <b>' + c.o[c.a] + '</b>. ') + c.why; },
      quiz: [
        { q: 'لماذا يتطلب من الطيار معرفة السرعة المتجهة للرياح لا مقدارها فقط؟', o: ['لأن اتجاه الرياح يغيّر المكان الذي تصل إليه الطائرة', 'لأن الرياح لا تؤثر في الطائرة', 'لأن الانطلاق كمية اتجاهية'], a: 0, why: 'التفكير الناقد 2 ص 19: الرياح تدفع الطائرة باتجاهها.' },
        { q: 'سيارتان عداد كل منهما 15 m/s، الأولى شرقاً والثانية غرباً. أيّ العبارات صحيحة؟', o: ['لهما الانطلاق نفسه وسرعتان مختلفتان', 'لهما السرعة نفسها', 'لهما انطلاقان مختلفان'], a: 0, why: 'الانطلاق رقم فقط، والسرعة رقم واتجاه.' },
        { q: 'صباح كل يوم تسير 200 m إلى المدرسة وتعود ظهراً من الطريق نفسه. الإزاحة الكلية والمسافة الكلية:', o: ['صفر و 400 m', '400 m و صفر', '200 m و 200 m'], a: 0, why: 'التفكير الناقد 1 ص 19.' }
      ]
    });

    /* ---------- Part 3: build the comparison table (sorter) ---------- */
    const CT = [
      { id: 'd1', label: 'طول المسار كله', bin: 'd' }, { id: 'd2', label: 'عدّاد المسافات', bin: 'd' }, { id: 'd3', label: '400 m', sub: 'ذهاباً وإياباً', bin: 'd', why: '400 m هي طول الطريق كله ذهاباً وإياباً: مسافة (أما الإزاحة فصفر).' },
      { id: 'x1', label: 'أقصر خط مستقيم', sub: 'من البداية إلى النهاية', bin: 'x' }, { id: 'x2', label: '150 m', sub: 'شمال الشرق', bin: 'x', why: 'قيمة لها مقدار بالمتر واتجاه: إزاحة.' }, { id: 'x3', label: 'صفر', sub: 'إذا عاد إلى البداية', bin: 'x' },
      { id: 's1', label: 'S = d / t', bin: 'S' }, { id: 's2', label: 'عداد السرعة', sub: 'رقم بلا اتجاه', bin: 'S' }, { id: 's3', label: '72 km/h', sub: 'بلا اتجاه', bin: 'S', why: 'وحدة سرعة بلا اتجاه: انطلاق.' },
      { id: 'v1', label: 'v = x / t', bin: 'v' }, { id: 'v2', label: '20 m/s شرقاً', bin: 'v', why: 'وحدة سرعة مع اتجاه: سرعة (متجهة).' }, { id: 'v3', label: 'سرعة الرياح', sub: 'يحتاجها الطيار', bin: 'v' },
      { id: 'a1', label: 'a = Δv / t', bin: 'a' }, { id: 'a2', label: 'm/s²', sub: 'وحدة القياس', bin: 'a' }, { id: 'a3', label: 'البنزين والفرامل', sub: 'والمقود', bin: 'a', why: 'دواسة البنزين والفرامل والمقود تغيّر السرعة مقداراً أو اتجاهاً: تعجيل.' }];
    const CB = [{ id: 'd', label: 'المسافة', sub: 'مقدارية', col: COL.d }, { id: 'x', label: 'الإزاحة', sub: 'اتجاهية', col: COL.x }, { id: 'S', label: 'الانطلاق', sub: 'مقدارية', col: COL.S }, { id: 'v', label: 'السرعة', sub: 'اتجاهية', col: COL.v }, { id: 'a', label: 'التعجيل', sub: 'اتجاهية', col: COL.a }];
    const so = Sorter({ items: () => CT, bins: () => CB, cols: 5, ch: 52, top: 84, binCols: 5, bh: 300, chip: it => it.label });
    P8({
      id: 'g8_cmp_sort', ch: 21, sec: 'الدرس الثالث: وصف الحركة', page: 19, fig: 'مقارنة', kind: 'نشاط', title: 'رتّب جدول المقارنة',
      desc: 'نسحب كل بطاقة (تعريف، قانون، جهاز، قيمة، وحدة) إلى عمود الكمية المناسبة فنبني بأنفسنا جدول المقارنة بين المسافة والإزاحة والانطلاق والسرعة والتعجيل.',
      tags: 'جدول مقارنة بطاقات تصنيف', tools: ['بطاقات'],
      steps: ['اقرأ البطاقة: هل فيها اتجاه؟ هل هي طول طريق أم خط مستقيم؟ هل فيها تغيّر للسرعة؟', 'اسحبها إلى عمود الكمية المناسبة.', 'أكمل الجدول كله ثم راجع: أي الكميات مقدارية وأيها اتجاهية؟'],
      concl: ['المسافة والانطلاق كميتان مقداريتان (رقم + وحدة).', 'الإزاحة والسرعة والتعجيل كميات اتجاهية (رقم + وحدة + اتجاه).', 'القوانين: S = d / t ، v = x / t ، a = Δv / t.'],
      laws: ['g8_speed', 'g8_velocity', 'g8_accel'], fact: ['كلمة «السرعة» في الحياة اليومية تعني غالباً الانطلاق، أما في الفيزياء فالسرعة لها اتجاه دائماً.'],
      controls: [TG('tip', 'رسالة التصحيح والتلميح', true, null, 'labels'), BT('', [{ t: 'أعد البطاقات', on: S => so.reset(S) }])],
      setup(S) { so.reset(S); },
      draw(ctx, w, h, S) { K.bg(ctx, w, h, { benchY: h + 10, bench: false }); H.banner(ctx, w, 'اسحب كل بطاقة إلى عمود الكمية المناسبة', '#0f766e'); T(ctx, 'ابنِ جدول المقارنة بنفسك: تعريف · جهاز · مثال · قانون · وحدة', (64 + w) / 2, 56, { s: 13, w: 800, c: '#334155' }); so.draw(ctx, w, h, S);
        const Lf = so.left(S); T(ctx, Lf ? 'بقي ' + Lf + ' من ' + CT.length : 'أكملت الجدول! 🎉', 74, h - 50, { s: 13, w: 900, c: '#fff', bg: Lf ? '#475569' : '#16a34a', a: 'left' }); },
      drags(S) { return so.drags(S); },
      readings(S) { const s = S.so || {}; return [rd('الصحيح', String(s.ok || 0)), rd('المحاولات الخاطئة', String(s.bad || 0)), rd('المتبقي', String(so.left(S)))]; },
      explain(S) { const s = S.so || {}; if (s.msg && s.mt > 0) return s.msg; return 'اسأل نفسك عن كل بطاقة: <b>هل فيها اتجاه؟</b> (إزاحة أو سرعة أو تعجيل) — <b>هل هي طول الطريق كله؟</b> (مسافة) — <b>هل هي رقم سرعة فقط؟</b> (انطلاق) — <b>هل فيها تغيّر للسرعة؟</b> (تعجيل).'; },
      quiz: [
        { q: 'أيّ الكميات الآتية مقدارية؟', o: ['المسافة والانطلاق', 'الإزاحة والسرعة', 'السرعة والتعجيل'], a: 0, why: 'المسافة والانطلاق يوصفان بالمقدار والوحدة فقط.' },
        { q: 'وحدة قياس التعجيل:', o: ['m/s²', 'm/s', 'm'], a: 0, why: 'التعجيل = تغير السرعة (m/s) ÷ الزمن (s) = m/s² (ص 18).' }
      ]
    });
  })();

  /* =========================================================================================
     الدمج: 15 نشاطاً صغيراً → 6 تجارب غنية، كل تجربة بأجزاء (لكل جزء شرحه وقراءاته وصفحته)
     ========================================================================================= */
  const MG = (o, n = 2) => { const ids = o.parts.map(q => q.id); M8.merge(Object.assign({ ch: 21,
    fact: [].concat(...ids.map(id => (M8.P[id].fact || []).slice(0, 1))).concat(o.factX || []),
    quiz: [].concat(...ids.map(id => (M8.P[id].quiz || []).slice(0, n))).concat(o.quizX || []) }, o)); };
  /* review questions of the book (مراجعة الدرس، التفكير الناقد، مراجعة الفصل) not already asked by the parts */
  const RQ = {
    measure: [
      { q: 'القياس هو:', o: ['طريقة لوصف الكميات والتعبير عنها بأرقام', 'تحويل الوحدات الكبيرة إلى صغيرة', 'استعمال الميزان فقط'], a: 0, why: 'تعريف القياس ص 7 (مراجعة الدرس 1).' },
      { q: 'العناصر الثلاثة لأي عملية قياس هي:', o: ['الكميات الفيزيائية، ونظام وحدات القياس، وأدوات القياس', 'الطول والكتلة والزمن', 'المتر والكيلوغرام والثانية'], a: 0, why: 'ص 7: للقياس ثلاثة عناصر أساسية (مراجعة الدرس 3).' },
      { q: 'الوحدة الأساسية لقياس «كمية المادة» في النظام الدولي:', o: ['mol', 'cd', 'K'], a: 0, why: 'جدول 1: كمية المادة ← المول mol (مراجعة الدرس 5).' },
      { q: 'كيف أقيس حجم كرة صغيرة؟ (التفكير الناقد)', o: ['أغمرها في مخبار مدرج فيه ماء: حجمها = الفرق بين القراءتين', 'أقيس قطرها بشريط القياس فقط', 'أزنها بالميزان ذي الكفتين'], a: 0, why: 'ارتفاع الماء في المخبار المدرج يساوي حجم الجسم المغمور.' },
      { q: 'حوّل 4.5 m إلى km (مثال 2):', o: ['4.5 × 10⁻³ km', '4.5 × 10³ km', '45 km'], a: 0, why: '1 km = 1000 m ⇒ 4.5 × 1/1000 = 4.5 × 10⁻³ km.' },
      { q: 'جهاز الفولتميتر يستعمل لقياس (الفيزياء والمجتمع):', o: ['فرق الجهد الكهربائي', 'ضغط الدم', 'بُعد القمر'], a: 0, why: 'ص 20: الفولتميتر جهاز يستخدم لقياس فرق الجهد الكهربائي.' }],
    motion: [
      { q: 'مكان وجود الجسم يحدَّد بالاتجاه والبعد بالنسبة إلى جسم آخر يكون ثابتاً يسمى:', o: ['الموقع', 'الحركة', 'الانطلاق'], a: 0, why: 'مراجعة الفصل س1-1.' },
      { q: 'لماذا تعدّ الحركة مفهوماً نسبياً؟', o: ['لأنها تعتمد على موقع نقطة الإسناد', 'لأن الأجسام كلها ساكنة', 'لأنها تقاس بالمتر'], a: 0, why: 'سؤال ص 11: الجسم متحرك نسبة إلى نقطة إسناد وساكن نسبة إلى أخرى.' },
      { q: 'متى أقول إن الجسم تحرك؟', o: ['عندما يتغير موقعه بالنسبة إلى نقطة إسناد ثابتة مع مرور الزمن', 'عندما يكون كبيراً', 'عندما يكون على سطح الأرض'], a: 0, why: 'مراجعة الدرس 2 س7.' },
      { q: 'في شكل 1 (الشلال) نعدّ سطح الأرض:', o: ['نقطة إسناد ثابتة لحركة الماء الساقط', 'جسماً متحركاً', 'مسار الحركة'], a: 0, why: 'شكل 1 ص 11.' }],
    kinds: [
      { q: 'من أمثلة الحركة الدورية الدورانية (س3-هـ):', o: ['مروحة السقف ودولاب الهواء', 'رمية كرة السلة', 'سقوط كرة من شرفة'], a: 0, why: 'تكرر حركتها في مسار مغلق.' },
      { q: 'الحركة الاهتزازية هي حركة:', o: ['دورية ذهاباً وإياباً حول موضع الاتزان', 'انتقالية على خط مستقيم', 'عشوائية'], a: 0, why: 'مثل بندول الساعة والأرجوحة (مراجعة الدرس 2 س4).' }],
    displace: [
      { q: 'الفرق بين المسافة والإزاحة (س3-ب):', o: ['المسافة طول المسار كله (مقدارية)، والإزاحة أقصر خط بين البداية والنهاية مع الاتجاه (اتجاهية)', 'لا فرق بينهما', 'الإزاحة دائماً أكبر من المسافة'], a: 0, why: 'ص 14–15.' },
      { q: 'سيارة تحركت 50 km شمالاً من a إلى b ثم 20 km شمالاً من b إلى c. الإزاحة المحصلة:', o: ['70 km شمالاً', '30 km شمالاً', '70 km جنوباً'], a: 0, why: 'سؤال ص 17: باتجاه واحد نجمع X_R = 50 + 20 = 70 km شمالاً.' },
      { q: 'بمقياس رسم 1 cm لكل 10 km: الإزاحتان 30 km غرباً و 40 km جنوباً تمثلان بسهمين طولهما:', o: ['3 cm و 4 cm', '30 cm و 40 cm', '0.3 cm و 0.4 cm'], a: 0, why: 'سؤال ص 16: 30 × 1/10 = 3 cm و 40 × 1/10 = 4 cm.' },
      { q: 'اتجاه متجه الإزاحة هو:', o: ['اتجاه الإزاحة', 'اتجاه الشمال دائماً', 'عكس اتجاه الحركة'], a: 0, why: 'مميزات متجه الإزاحة ص 15 (مراجعة الدرس 3 س2).' }],
    speedx: [
      { q: 'قطعت طائرة 450 km في 1 h. معدل انطلاقها بوحدة m/s:', o: ['125 m/s', '450 m/s', '25 m/s'], a: 0, why: 'مثال 1 ص 15: 450 × 1000 / 3600 = 125 m/s.' },
      { q: 'سيارة قطعت 30 m في 2 s. انطلاقها:', o: ['15 m/s', '60 m/s', '32 m/s'], a: 0, why: 'ص 14: S = d / t = 30 / 2 = 15 m/s.' },
      { q: 'مقدار المسافة المقطوعة خلال وحدة الزمن هو (س1-5):', o: ['الانطلاق', 'مسار الحركة', 'الموقع'], a: 0, why: 'مراجعة الفصل س1-5.' }],
    velacc: [
      { q: 'قارن بين السرعة والانطلاق (س3-ج):', o: ['السرعة اتجاهية = الإزاحة ÷ الزمن، والانطلاق مقداري = المسافة ÷ الزمن', 'هما الشيء نفسه', 'الانطلاق اتجاهي والسرعة مقدارية'], a: 0, why: 'ص 14 و 18.' },
      { q: 'عند الضغط على الفرامل تتناقص سرعة السيارة بانتظام، ويكون التعجيل:', o: ['بعكس اتجاه السرعة (تباطئي)', 'باتجاه السرعة (تسارعي)', 'صفراً'], a: 0, why: 'شكل 4 ص 19.' },
      { q: 'أعبّر عن مفهوم التعجيل بعلاقة رياضية:', o: ['a = Δv / t', 'a = d / t', 'a = x × t'], a: 0, why: 'التعجيل = تغير السرعة ÷ الزمن (مراجعة الدرس 3 س5).' }] };
  MG({ id: 'g8_measure', quizX: RQ.measure, factX: ['الفيزياء والمجتمع (ص 20): من أجهزة القياس الفولتميتر لقياس فرق الجهد الكهربائي، وجهاز قياس ضغط الدم؛ وتختلف أخطاء القياس بسبب الأداة (دقتها وعمرها) أو الظروف المحيطة (درجة الحرارة وميلان الأسطح) أو قلة مهارة الشخص، لذلك نكرر القياس ونأخذ المتوسط.'], sec: 'الدرس الأول: القياس', page: 7, title: 'القياس: الكميات والوحدات وأدوات القياس ودقته',
    desc: 'تجربة واحدة بأربعة أجزاء: (1) دقة القياس وأين نضع العين، (2) الكميات المقدارية والاتجاهية والوحدات الأساسية، (3) أدوات القياس وأيّها أدق، (4) البادئات وتحويل الوحدات والصيغة العلمية.',
    tags: 'القياس الوحدات الكميات', parts: [{ id: 'g8_accuracy', n: 'دقة القياس: أين أضع عيني؟' }, { id: 'g8_quantities', n: 'الكميات المقدارية والاتجاهية والوحدات' }, { id: 'g8_tools', n: 'أدوات القياس: أيّها أدق؟' }, { id: 'g8_prefixes', n: 'البادئات وتحويل الوحدات' }] });
  MG({ id: 'g8_motion', quizX: RQ.motion, sec: 'الدرس الثاني: الحركة وأنواعها', page: 11, title: 'الحركة والسكون ونقطة الإسناد ومسار الحركة',
    desc: 'تجربة واحدة بجزأين: (1) الحركة والسكون نسبيان — نختار نقطة الإسناد فنحكم هل الجسم متحرك أم ساكن، (2) مسار الحركة — نصل النقاط التي يمر بها الجسم فيظهر شكل مساره.',
    tags: 'الحركة السكون نقطة الإسناد مسار الحركة', parts: [{ id: 'g8_reference', n: 'الحركة والسكون ونقطة الإسناد' }, { id: 'g8_path', n: 'مسار الحركة' }] }, 3);
  M8.merge({ id: 'g8_kinds', ch: 21, sec: 'الدرس الثاني: الحركة وأنواعها', page: 12, fig: 'شكل 4', title: 'أنواع الحركة: كيف تحدث كل حركة؟',
    desc: 'تجربة واحدة بستة أجزاء، جزء لكل نوع في الكتاب: (1) الانتقالية على خط مستقيم، (2) الانتقالية على مسار منحنٍ، (3) الدورية في مسار مغلق، (4) نشاط البندول: الدورية الاهتزازية، (5) العشوائية، (6) لعبة تصنيف الحركات. في كل جزء أمثلة واقعية متحركة، والمسار يُرسم مباشرة، والميزة التي تحدد النوع مُبرزة، وتحدٍّ قصير.',
    tags: 'أنواع الحركة انتقالية دورية اهتزازية عشوائية',
    parts: [{ id: 'g8_k_line', n: 'الحركة الانتقالية على خط مستقيم' }, { id: 'g8_k_curve', n: 'الحركة الانتقالية على مسار منحنٍ' }, { id: 'g8_k_closed', n: 'الحركة الدورية في مسار مغلق' }, { id: 'g8_pendulum', n: 'نشاط: الحركة الدورية الاهتزازية (البندول)' }, { id: 'g8_k_rand', n: 'الحركة العشوائية' }, { id: 'g8_k_sort', n: 'لعبة: صنّف الحركات' }],
    fact: M8.P.g8_k_sort.fact.concat(M8.P.g8_pendulum.fact.slice(0, 1)),
    quiz: [
      { q: 'الحركة التي تتميز بوجود نقطة بداية ونقطة نهاية هي الحركة:', o: ['الانتقالية', 'الدورية', 'العشوائية'], a: 0, why: 'تعريف الحركة الانتقالية (ص 12).' },
      { q: 'في الحركة الانتقالية للقطار على سكته، نقاط القطار كلها تتحرك:', o: ['المسافة نفسها وبالاتجاه نفسه', 'مسافات مختلفة', 'في دوائر'], a: 0, why: 'في الحركة الانتقالية ينتقل الجسم كله من موقع إلى آخر.' },
      { q: 'رمية كرة السلة من اللاعب إلى السلة حركة انتقالية على مسار:', o: ['منحنٍ', 'مستقيم', 'مغلق'], a: 0, why: 'اتجاه حركة الكرة يتغير باستمرار (التفكير الناقد 1).' },
      { q: 'الحركة التي تكرر نفسها على فترات زمنية متساوية هي الحركة:', o: ['الدورية', 'الانتقالية', 'العشوائية'], a: 0, why: 'تعريف الحركة الدورية (ص 12).' },
      ...M8.P.g8_k_sort.quiz, M8.P.g8_pendulum.quiz[1],
      { q: 'حركة دقائق الغاز عند تصادمها مع بعضها حركة:', o: ['عشوائية', 'دورية', 'انتقالية'], a: 0, why: 'حقيقة علمية ص 13.' }, ...RQ.kinds] });
  MG({ id: 'g8_displace', quizX: RQ.displace, sec: 'الدرس الثالث: وصف الحركة', page: 14, title: 'المسافة والإزاحة ومتجه الإزاحة والمحصلة',
    desc: 'تجربة واحدة بثلاثة أجزاء: (1) المسافة والإزاحة — طول الطريق أم أقصر خط؟، (2) تمثيل متجه الإزاحة بالرسم بمقياس رسم، (3) حساب محصلة إزاحتين باتجاه واحد وباتجاهين متعاكسين.',
    tags: 'المسافة الإزاحة المتجه المحصلة', parts: [{ id: 'g8_distance', n: 'المسافة والإزاحة' }, { id: 'g8_vecdraw', n: 'تمثيل متجه الإزاحة بالرسم' }, { id: 'g8_resultant', n: 'محصلة إزاحتين' }] });
  MG({ id: 'g8_speedx', quizX: RQ.speedx, sec: 'نشاط استهلالي + الدرس الثالث', page: 15, title: 'الانطلاق ومعدل الانطلاق',
    desc: 'تجربة واحدة بجزأين: (1) النشاط الاستهلالي — نركل الكرة ونقيس المسافة بالشريط والزمن بساعة التوقيت فنفهم معنى السرعة، (2) الانطلاق ومعدل الانطلاق وتحويل km/h إلى m/s ومخطط (المسافة – الزمن).',
    tags: 'الانطلاق معدل الانطلاق', parts: [{ id: 'g8_speed_intro', n: 'نشاط استهلالي: مفهوم السرعة' }, { id: 'g8_avgspeed', n: 'الانطلاق ومعدل الانطلاق' }] }, 3);
  MG({ id: 'g8_velacc', quizX: RQ.velacc, sec: 'الدرس الثالث: وصف الحركة', page: 18, title: 'السرعة المنتظمة وغير المنتظمة والتعجيل',
    desc: 'تجربة واحدة بجزأين: (1) السرعة كمية اتجاهية، والسرعة المنتظمة وغير المنتظمة بصورة كل ثانية، (2) التعجيل: سيارة تتسارع وتتباطأ بانتظام مع حساب a = Δv / t.',
    tags: 'السرعة المنتظمة التعجيل', parts: [{ id: 'g8_uniform', n: 'السرعة المنتظمة وغير المنتظمة' }, { id: 'g8_accel', n: 'التعجيل: تسارع وتباطؤ' }] }, 3);

  M8.merge({ id: 'g8_compare', ch: 21, sec: 'الدرس الثالث: وصف الحركة', page: 18, fig: 'مقارنة ص 14–19', title: 'مقارنة: المسافة والإزاحة، الانطلاق والسرعة والتعجيل',
    desc: 'تجربة مقارنة بثلاثة أجزاء: (1) حركة واحدة نختارها أو نقودها ونرى معاً المسافة والإزاحة والانطلاق والسرعة والتعجيل مع جدول مقارنة حيّ، (2) تحديات A أم B: انطلاق واحد وسرعتان، إزاحة صفر ومسافة 400 m، عداد ثابت وسرعة تتغير، الطيار والرياح، (3) نبني جدول المقارنة بالبطاقات.',
    tags: 'مقارنة المسافة الإزاحة الانطلاق السرعة التعجيل',
    parts: [{ id: 'g8_cmp_live', n: 'حركة واحدة وخمس كميات (مباشر)' }, { id: 'g8_cmp_cases', n: 'تحديات المقارنة: A أم B؟' }, { id: 'g8_cmp_sort', n: 'رتّب جدول المقارنة' }],
    fact: M8.P.g8_cmp_live.fact.concat(M8.P.g8_cmp_cases.fact),
    quiz: M8.P.g8_cmp_live.quiz.concat(M8.P.g8_cmp_cases.quiz, M8.P.g8_cmp_sort.quiz) });

  /*@@END*/
})();
