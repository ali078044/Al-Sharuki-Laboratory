'use strict';
/* ====================== الأول المتوسط — الفصل الرابع: الحرارة (ص 59–72) ====================== */

/* ---------- shared drawing helpers for this chapter (namespace C4) ---------- */
const C4 = {
  _mix(a, b, t) { return a.map((v, i) => Math.round(v + (b[i] - v) * t)); },
  _rgb(T) {
    const st = [[-10, [30, 64, 175]], [0, [37, 99, 235]], [20, [96, 165, 250]], [30, [250, 204, 21]], [50, [251, 146, 60]], [100, [220, 38, 38]], [400, [185, 28, 28]], [700, [253, 224, 71]]];
    if (T <= st[0][0]) return st[0][1]; if (T >= st[st.length - 1][0]) return st[st.length - 1][1];
    for (let i = 1; i < st.length; i++) if (T <= st[i][0]) return C4._mix(st[i - 1][1], st[i][1], (T - st[i - 1][0]) / (st[i][0] - st[i - 1][0]));
    return st[0][1];
  },
  /* temperature → colour (blue cold … grey room … orange warm … red hot) */
  tcol(T, a = 1) { const c = C4._rgb(T); return `rgba(${c[0]},${c[1]},${c[2]},${a})`; },
  thex(T) { return '#' + C4._rgb(T).map(v => v.toString(16).padStart(2, '0')).join(''); },
  T(v) { return (Math.round(v * 10) / 10).toFixed(1) + ' °C'; },
  th(ctx, x, yb, h, T, t0, t1, o = {}) { if (o.card) K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.85)'; rr(ctx, x - 16, yb - h - 4, 58, h + 22, 10); ctx.fill(); }); K.thermo(ctx, x, yb, h, T, t0, t1, Object.assign({}, o, { show: false })); G.text(ctx, C4.T(T), x, yb - h - 12, { s: o.s || 13, w: 900, c: '#0f172a', mono: 1, bg: 'rgba(255,255,255,.85)', raw: 1 }); },
  mmss(s) { s = Math.max(0, Math.round(s)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); },
  /* thick animated heat-flow arrow */
  heat(ctx, x1, y1, x2, y2, wd, t, col = '#f97316') {
    const L = Math.hypot(x2 - x1, y2 - y1); if (L < 6 || wd < .4) return;
    K.raw(ctx, () => {
      ctx.save(); const a = Math.atan2(y2 - y1, x2 - x1), hs = wd * 2 + 8;
      G.arrow(ctx, x1, y1, x2, y2, col, wd, hs);
      ctx.setLineDash([5, 9]); ctx.lineDashOffset = -t * 45; ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = Math.max(1, wd * .35); ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - Math.cos(a) * hs, y2 - Math.sin(a) * hs); ctx.stroke(); ctx.restore();
    });
  },
  /* wavy radiation arrow (like light / infrared) */
  wave(ctx, x1, y1, x2, y2, t, col = '#dc2626', wd = 2.5, amp = 6, wl = 18) {
    const L = Math.hypot(x2 - x1, y2 - y1); if (L < 10) return; const ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    K.raw(ctx, () => {
      ctx.strokeStyle = col; ctx.lineWidth = wd; ctx.lineCap = 'round'; ctx.beginPath();
      for (let s = 0; s <= L - 10; s += 2) { const o = Math.sin((s / wl - t * 3) * TAU) * amp * Math.min(1, s / 12, (L - 10 - s) / 12 + .2); const xx = x1 + ux * s - uy * o, yy = y1 + uy * s + ux * o; s ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
      ctx.stroke(); ctx.lineCap = 'butt'; G.arrow(ctx, x2 - ux * 12, y2 - uy * 12, x2, y2, col, wd, 11);
    });
  },
  /* cartoon hand, fingertips at (x, y), pointing down */
  hand(ctx, x, y, s = 1, o = {}) {
    K.raw(ctx, () => {
      ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s);
      ctx.fillStyle = o.sleeve || '#60a5fa'; ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 1.6; rr(ctx, -27, -122, 54, 32, 8); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#fcd9b6'; ctx.strokeStyle = '#c08457'; ctx.lineWidth = 1.6;
      rr(ctx, -23, -94, 46, 48, 15); ctx.fill(); ctx.stroke();
      [44, 50, 48, 40].forEach((len, i) => { rr(ctx, -22 + i * 11.2, -54, 10.4, len + 4, 5); ctx.fill(); ctx.stroke(); });
      ctx.save(); ctx.translate(25, -66); ctx.rotate(-.5); rr(ctx, -6, -4, 12, 30, 6); ctx.fill(); ctx.stroke(); ctx.restore();
      ctx.fillStyle = '#fcd9b6'; ctx.fillRect(-21, -56, 42, 6);
      ctx.restore();
    });
  },
  /* cup / mug: bottom centre (x, yb); mat: metal | plastic | glass | paper; o.liq colour, o.lev 0..1 */
  cup(ctx, x, yb, cw, ch, o = {}) {
    const top = yb - ch, bw = cw * .82, mat = o.mat || 'glass', lev = top + ch * (1 - (o.lev ?? .85));
    K.raw(ctx, () => {
      const body = () => { ctx.beginPath(); ctx.moveTo(x - cw / 2, top); ctx.lineTo(x - bw / 2, yb - 6); ctx.quadraticCurveTo(x - bw / 2, yb, x - bw / 2 + 6, yb); ctx.lineTo(x + bw / 2 - 6, yb); ctx.quadraticCurveTo(x + bw / 2, yb, x + bw / 2, yb - 6); ctx.lineTo(x + cw / 2, top); ctx.closePath(); };
      // handle
      ctx.strokeStyle = mat === 'metal' ? '#94a3b8' : mat === 'plastic' ? (o.col2 || '#f43f5e') : '#cbd5e1'; ctx.lineWidth = cw * .09; ctx.beginPath(); ctx.ellipse(x + cw * .46, top + ch * .42, cw * .2, ch * .24, 0, -Math.PI / 2, Math.PI / 2); ctx.stroke();
      if (mat === 'glass') {
        ctx.save(); body(); ctx.clip(); if (o.liq) { ctx.globalAlpha = .82; ctx.fillStyle = o.liq; ctx.fillRect(x - cw, lev, cw * 2, yb - lev); ctx.globalAlpha = 1; } ctx.restore();
        ctx.fillStyle = 'rgba(224,242,254,.25)'; body(); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.fillRect(x - cw * .38, top + 10, 5, ch * .7);
      } else {
        const g = ctx.createLinearGradient(x - cw / 2, 0, x + cw / 2, 0);
        if (mat === 'metal') { g.addColorStop(0, '#64748b'); g.addColorStop(.3, '#f8fafc'); g.addColorStop(.55, '#cbd5e1'); g.addColorStop(1, '#475569'); }
        else { g.addColorStop(0, o.col2 || '#f43f5e'); g.addColorStop(.35, o.col1 || '#fecdd3'); g.addColorStop(1, o.col2 || '#e11d48'); }
        ctx.fillStyle = g; body(); ctx.fill(); ctx.strokeStyle = 'rgba(15,23,42,.45)'; ctx.lineWidth = 1.5; ctx.stroke();
      }
      // rim with liquid surface
      ctx.fillStyle = mat === 'metal' ? '#e2e8f0' : mat === 'glass' ? 'rgba(241,245,249,.6)' : (o.col1 || '#ffe4e6'); ctx.beginPath(); ctx.ellipse(x, top, cw / 2, cw * .11, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(15,23,42,.45)'; ctx.lineWidth = 1.3; ctx.stroke();
      if (o.liq && (o.lev ?? .85) > .8) { ctx.fillStyle = o.liq; ctx.beginPath(); ctx.ellipse(x, top + 3, cw / 2 - 5, cw * .09, 0, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.beginPath(); ctx.ellipse(x - cw * .12, top + 1, cw * .14, cw * .025, 0, 0, TAU); ctx.fill(); }
    });
    return { top, lev };
  },
  steam(ctx, x, y, t, k = 1, n = 3) {
    if (k <= .02) return;
    K.raw(ctx, () => {
      ctx.lineWidth = 3; ctx.lineCap = 'round';
      for (let j = 0; j < n; j++) { const ph = (t * .6 + j / n) % 1; ctx.strokeStyle = `rgba(148,163,184,${(.55 * k * Math.sin(ph * Math.PI)).toFixed(3)})`; ctx.beginPath(); for (let s = 0; s <= 1.001; s += .1) { const yy = y - 8 - (ph * 30 + s * 34) * (.6 + k * .5), xx = x + (j - (n - 1) / 2) * 14 + Math.sin(s * 6 + t * 4 + j * 2) * 5; s ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
      ctx.lineCap = 'butt';
    });
  },
  /* stopwatch card */
  clock(ctx, x, y, sec, label = 'الزمن') {
    K.raw(ctx, () => {
      ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, x - 70, y - 20, 140, 40, 12); ctx.fill(); ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#fef3c7'; ctx.beginPath(); ctx.arc(x + 48, y + 1, 12, 0, TAU); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#b45309'; ctx.beginPath(); ctx.moveTo(x + 48, y + 1); const a = sec / 60 * TAU - Math.PI / 2; ctx.lineTo(x + 48 + Math.cos(a) * 9, y + 1 + Math.sin(a) * 9); ctx.stroke(); ctx.fillRect(x + 45, y - 15, 6, 3);
    });
    G.text(ctx, C4.mmss(sec), x - 6, y + 1, { s: 18, w: 900, c: '#78350f', mono: 1, raw: 1 });
    G.text(ctx, label, x - 6, y - 26, { s: 11, w: 800, c: '#78350f', raw: 1 });
  },
  /* on-canvas button (pill) */
  btn(ctx, s, x, y, bw, bh, o = {}) {
    K.raw(ctx, () => { ctx.fillStyle = o.on ? (o.bgOn || '#16a34a') : (o.bg || '#fff'); rr(ctx, x - bw / 2, y - bh / 2, bw, bh, bh / 2); ctx.fill(); ctx.strokeStyle = o.bd || (o.on ? '#15803d' : '#94a3b8'); ctx.lineWidth = 2; ctx.stroke(); });
    G.text(ctx, s, x, y + 1, { s: o.s || 12.5, w: 800, c: o.on ? '#fff' : (o.c || '#1e293b'), raw: 1 });
  },
  /* simple line chart card */
  plot(ctx, x, y, w, h, series, o = {}) {
    K.raw(ctx, () => {
      ctx.fillStyle = 'rgba(255,255,255,.94)'; rr(ctx, x, y, w, h, 12); ctx.fill(); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.5; ctx.stroke();
      const px = x + 34, py = y + 22, pw = w - 46, ph = h - 46; const xm = o.xmax || 1, y0 = o.ymin ?? 0, y1 = o.ymax ?? 100;
      ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.beginPath(); for (let k = 0; k <= 4; k++) { const yy = py + ph * k / 4; ctx.moveTo(px, yy); ctx.lineTo(px + pw, yy); } ctx.stroke();
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(px, py - 4); ctx.lineTo(px, py + ph); ctx.lineTo(px + pw + 4, py + ph); ctx.stroke();
      ctx.fillStyle = '#475569'; ctx.font = '700 9px ui-monospace,monospace'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr';
      for (let k = 0; k <= 4; k++) ctx.fillText(String(Math.round(y1 - (y1 - y0) * k / 4)), px - 4, py + ph * k / 4);
      series.forEach(sr => { if (!sr.pts || sr.pts.length < 2) return; ctx.strokeStyle = sr.col; ctx.lineWidth = 2.6; ctx.lineJoin = 'round'; ctx.beginPath(); sr.pts.forEach((p, i) => { const xx = px + pw * clamp(p[0] / xm, 0, 1), yy = py + ph * (1 - clamp((p[1] - y0) / (y1 - y0), 0, 1)); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }); ctx.stroke();
        const l = sr.pts[sr.pts.length - 1]; ctx.fillStyle = sr.col; ctx.beginPath(); ctx.arc(px + pw * clamp(l[0] / xm, 0, 1), py + ph * (1 - clamp((l[1] - y0) / (y1 - y0), 0, 1)), 4, 0, TAU); ctx.fill(); });
      ctx.textBaseline = 'alphabetic';
    });
    if (o.title) G.text(ctx, o.title, x + w / 2, y + 11, { s: 11, w: 800, c: '#334155', raw: 1 });
    if (o.xl) G.text(ctx, o.xl, x + w - 8, y + h - 10, { s: 10, w: 700, c: '#64748b', a: 'right', raw: 1 });
    if (o.yl) G.text(ctx, o.yl, x + 8, y + h - 10, { s: 10, w: 700, c: '#64748b', a: 'left', raw: 1 });
  },
  /* moving particles inside a rect (liquid / gas); speed px/s */
  gas(arr, n, R, speed, dt) {
    while (arr.length < n) { const a = Math.random() * TAU; arr.push({ x: R.x + Math.random() * R.w, y: R.y + Math.random() * R.h, a }); }
    arr.length = n;
    arr.forEach(p => { p.a += (Math.random() - .5) * 1.2 * Math.min(dt * 10, 1); p.x += Math.cos(p.a) * speed * dt; p.y += Math.sin(p.a) * speed * dt;
      if (p.x < R.x) { p.x = R.x; p.a = Math.PI - p.a; } if (p.x > R.x + R.w) { p.x = R.x + R.w; p.a = Math.PI - p.a; } if (p.y < R.y) { p.y = R.y; p.a = -p.a; } if (p.y > R.y + R.h) { p.y = R.y + R.h; p.a = -p.a; } });
  },
  /* vibrating lattice (solid) inside a rect; amp px */
  lattice(ctx, R, cols, rows, amp, t, T) {
    const gx = R.w / cols, gy = R.h / rows, r = Math.min(gx, gy) * .36, col = C4.thex(T);
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { const ph = (i * 7.3 + j * 3.1) % TAU, w1 = 17 + (i * 5 + j * 3) % 7; K.ball(ctx, R.x + gx * (i + .5) + amp * Math.sin(t * w1 + ph), R.y + gy * (j + .5) + amp * Math.cos(t * (w1 + 3) + ph * 1.7), r, col); }
  },
  /* particle speed shown as short tails */
  dots(ctx, arr, r, T, tail = 0) {
    const col = C4.thex(T);
    if (tail) K.raw(ctx, () => { ctx.strokeStyle = C4.tcol(T, .35); ctx.lineWidth = 2; ctx.beginPath(); arr.forEach(p => { ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - Math.cos(p.a) * tail, p.y - Math.sin(p.a) * tail); }); ctx.stroke(); });
    arr.forEach(p => K.ball(ctx, p.x, p.y, r, col));
  },
  card(ctx, x, y, w, h, bd = '#7c3aed') { K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, x, y, w, h, 12); ctx.fill(); ctx.strokeStyle = bd; ctx.lineWidth = 2; ctx.stroke(); }); },
  inQuad(q, x, y) { let c = false; for (let i = 0, j = q.length - 1; i < q.length; j = i++) { if (((q[i][1] > y) !== (q[j][1] > y)) && (x < (q[j][0] - q[i][0]) * (y - q[i][1]) / (q[j][1] - q[i][1]) + q[i][0])) c = !c; } return c; }
};

/* =====================================================================
   1) نشاط استهلالي (ص 60): سطح معدني وسطح عازل + مكعبا ثلج
   ===================================================================== */
{
  const INS = { plastic: { name: 'بلاستك', c1: '#fef9c3', c2: '#eab308', rate: 1 / 1000 }, wood: { name: 'خشب', ...K.MAT.wood, rate: 1 / 1300 } };
  const MET = { name: 'معدن', c1: '#f8fafc', c2: '#94a3b8', rate: 1 / 150 };
  const geo = S => {
    const w = S.W, h = S.H, by = h * .5, sc = clamp(w / 820, .62, 1);
    const pw = clamp(w * .3, 140, 250), dx = 92 * sc, dy = dx * .75, ph = 16;
    const x0 = Math.max(74, (w - (2 * pw + dx)) / 2 + 26), y0 = by + (h - by) * .6;
    const quad = x => [[x, y0 - ph], [x + pw, y0 - ph], [x + pw + dx, y0 - ph - dy], [x + dx, y0 - ph - dy]];
    return { w, h, by, sc, pw, dx, dy, ph, x0, y0, mx: x0, px: x0 + pw, qm: quad(x0), qp: quad(x0 + pw), s: clamp(w * .052, 30, 44), dish: { x: x0 + pw + dx * .5, y: by + 52 * sc + 20 } };
  };
  const home = (S, g) => { S.aX = g.dish.x - g.s * .75; S.aY = g.dish.y; S.bX = g.dish.x + g.s * .75; S.bY = g.dish.y; S.aOn = ''; S.bOn = ''; S.aM = 1; S.bM = 1; S.clk = 0; S.done = false; S.lX = g.x0 + 40; S.lY = g.by + 10; S.rX = g.x0 + 2 * g.pw + g.dx - 30; S.rY = g.by + 10; };
  const teaHome = S => { S.Tp = 80; S.Tm = 80; S.tclk = 0; S.pick = ''; S.teaDone = false; };
  const surfAt = (g, x, y) => C4.inQuad(g.qm, x, y) ? 'm' : C4.inQuad(g.qp, x, y) ? 'p' : '';
  const tgeo = S => { const w = S.W, h = S.H, by = h * .64, cw = clamp(w * .17, 80, 130); return { w, h, by, cw, ch: cw * 1.2, xp: w * .36 + 20, xm: w * .72, yb: by + 40 }; };
  X7({ id: 'g7_ice_surfaces', ch: 14, sec: 'نشاط استهلالي', page: 60, kind: 'نشاط', title: 'نشاط استهلالي: الحرارة — سطح معدني وسطح عازل',
    desc: 'نلمس سطحاً معدنياً وسطحاً عازلاً (بلاستك) ثم نضع على كل منهما مكعب ثلج: أي المكعبين ينصهر أسرع؟ ولماذا؟ ثم نتنبأ: هل يبقى الشاي ساخناً في الكأس البلاستيكية أم المعدنية؟',
    tags: 'حرارة توصيل معدن عازل ثلج انصهار شاي كأس',
    tools: ['سطحان: الأول معدني والثاني سطح عازل (بلاستك)', 'مكعبان من الثلج', 'ساعة توقيت'],
    steps: ['اجعل السطح المعدني يلامس السطح البلاستيكي (هما متلامسان في المشهد).', 'اسحب اليد اليسرى إلى السطح المعدني واليد اليمنى إلى السطح البلاستيكي: هل تشعر بفرق بين السطحين؟', 'فعّل «المحرار» لترى أن للسطحين درجة الحرارة نفسها رغم الإحساس المختلف!', 'اسحب مكعبي الثلج من الصحن وضع كل مكعب على سطح في الوقت نفسه، وشغّل المحاكاة.', 'راقب لمدة ثلاث دقائق (على الساعة): أي المكعبين ينصهر أسرع؟ ولماذا؟ فعّل «أسهم انتقال الحرارة».', 'بدّل المشهد إلى «تنبؤ: الشاي الساخن» واضغط الكأس التي تتوقع أن يبقى فيها الشاي ساخناً مدة أطول.'],
    concl: ['الحرارة تنتقل من الجسم الأعلى درجة حرارة (السطح) إلى الجسم الأقل درجة حرارة (الثلج).', 'المكعب الموضوع على السطح المعدني ينصهر أسرع لأن المعدن موصل جيد للحرارة ينقلها بسرعة إلى الثلج.', 'نشعر أن المعدن أبرد مع أن درجة حرارته مثل البلاستك، لأنه يسحب الحرارة من أيدينا بسرعة أكبر.', 'يبقى الشاي الساخن ساخناً مدة أطول في الكأس البلاستيكية لأن البلاستك عازل حراري.'],
    laws: ['g7_heat'],
    fact: ['سماعة الطبيب المعدنية تبدو باردة عند ملامستها للجلد، لأن المعدن يسحب الحرارة من جسم المريض بسرعة.', 'الأغنام في المناطق الجبلية الباردة يغطيها صوف كثيف؛ الصوف عازل حراري لأن فيه فراغات كثيرة مملوءة بالهواء (ص 70).', 'المواد الجيدة التوصيل للحرارة تكون عادة موصلات جيدة للكهرباء أيضاً.'],
    controls: [SEL('mode', 'المشهد', [['surf', 'السطحان والثلج'], ['tea', 'تنبؤ: الشاي الساخن']], 'surf', (v, S) => { if (v === 'tea') teaHome(S); }),
      SEL('ins', 'السطح العازل', [['plastic', 'بلاستك'], ['wood', 'خشب']], 'plastic'),
      TG('flow', 'أسهم انتقال الحرارة', true, null, 'heat'), TG('therm', 'المحرار (درجة حرارة السطحين)', false, null, 'meter'), TG('cold', 'المنطقة التي بردت', true, null, 'eye'), TG('lbl', 'الأسماء', true, null, 'labels'),
      BT('', [{ t: 'إعادة النشاط', on: S => { home(S, geo(S)); teaHome(S); } }])],
    setup(S) { S.W = S.W || 800; S.H = S.H || 700; home(S, geo(S)); teaHome(S); },
    update(S, dt) {
      if (S.p.mode === 'tea') { if (S.pick) { const f = 12; S.tclk += dt * f; S.Tp = 25 + (S.Tp - 25) * Math.exp(-dt * f / 1500); S.Tm = 25 + (S.Tm - 25) * Math.exp(-dt * f / 420); if (!S.teaDone && S.tclk > 300) { S.teaDone = true; if (S.pick === 'p') K.cheer(S, S.W / 2, S.H * .3); } } return; }
      const f = 10, rp = INS[S.p.ins].rate; let any = false;
      ['a', 'b'].forEach(k => { const on = S[k + 'On']; if (on && S[k + 'M'] > 0) { any = true; S[k + 'M'] = Math.max(0, S[k + 'M'] - dt * f * (on === 'm' ? MET.rate : rp)); } });
      if (any) S.clk += dt * f;
      if (!S.done && ((S.aOn === 'm' && S.aM <= 0 && S.bOn === 'p') || (S.bOn === 'm' && S.bM <= 0 && S.aOn === 'p'))) { S.done = true; K.cheer(S, S.W / 2, S.H * .3); }
    },
    draw(ctx, w, h, S) {
      const p = S.p, t = S.t;
      if (p.mode === 'tea') return drawTea(ctx, w, h, S);
      const g = geo(S); if (S._hw !== w) { if (S._hw && !S.aOn && !S.bOn) home(S, g); else if (!S._hw) home(S, g); S._hw = w; } K.bg(ctx, w, h, { benchY: g.by }); const IM = INS[p.ins];
      // dish of ice
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(186,230,253,.8)'; ctx.beginPath(); ctx.ellipse(g.dish.x, g.dish.y + 4, g.s * 1.9, g.s * .42, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 2; ctx.stroke(); });
      if (p.lbl) K.tag(ctx, 'صحن الثلج', g.dish.x, g.dish.y + g.s * .42 + 16, { s: 11, bg: 'rgba(3,105,161,.85)' });
      // plates
      [[g.mx, MET], [g.px, IM]].forEach(([x, M]) => K.box(ctx, x, g.y0, g.pw, g.ph, g.dx / .6, M));
      K.raw(ctx, () => { ctx.save(); ctx.beginPath(); g.qm.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.clip(); ctx.strokeStyle = 'rgba(100,116,139,.18)'; ctx.lineWidth = 1; for (let k = 0; k < 40; k++) { const yy = g.y0 - g.ph - g.dy * k / 40; ctx.beginPath(); ctx.moveTo(g.mx - 20, yy); ctx.lineTo(g.mx + g.pw + g.dx + 20, yy); ctx.stroke(); } ctx.restore(); });
      // cold zones under the ice
      const cubes = [['a', '#0ea5e9'], ['b', '#0284c7']].map(([k]) => ({ k, x: S[k + 'X'], y: S[k + 'Y'], on: S[k + 'On'], m: S[k + 'M'] }));
      if (p.cold) cubes.forEach(c => { if (!c.on || c.m <= 0) return; const q = c.on === 'm' ? g.qm : g.qp; K.raw(ctx, () => { ctx.save(); ctx.beginPath(); q.forEach((v, i) => i ? ctx.lineTo(v[0], v[1]) : ctx.moveTo(v[0], v[1])); ctx.closePath(); ctx.clip(); const R = c.on === 'm' ? g.pw * .8 : g.s * .95, a = c.on === 'm' ? .38 : .7; const gr = ctx.createRadialGradient(c.x, c.y, 2, c.x, c.y, R); gr.addColorStop(0, `rgba(59,130,246,${a})`); gr.addColorStop(1, 'rgba(59,130,246,0)'); ctx.fillStyle = gr; ctx.fillRect(c.x - R, c.y - R, 2 * R, 2 * R); ctx.restore(); }); });
      // heat flow into the ice
      if (p.flow) cubes.forEach(c => { if (!c.on || c.m <= 0) return; if (c.on === 'm') { [[.08, .2], [.92, .2], [.1, .85], [.9, .85], [.5, .02], [.5, .98]].forEach(([u, v]) => { const sx = g.mx + u * g.pw + v * g.dx, sy = g.y0 - g.ph - v * g.dy; const L = Math.hypot(sx - c.x, sy - c.y); if (L < g.s * 1.1) return; const k = (g.s * .75) / L; C4.heat(ctx, sx, sy, c.x + (sx - c.x) * k, c.y + (sy - c.y) * k, 4, t); }); C4.heat(ctx, c.x, c.y + 4, c.x, c.y - g.s * .55, 5, t); } else { C4.heat(ctx, c.x + g.s * 1.2, c.y + 6, c.x + g.s * .6, c.y + 3, 1.6, t); C4.heat(ctx, c.x, c.y + 4, c.x, c.y - g.s * .5, 1.6, t); } });
      // puddles + ice cubes
      cubes.forEach(c => { const sz = g.s * Math.cbrt(Math.max(c.m, 0)); const pr = (c.on ? 1 - c.m : 0); if (pr > 0) K.raw(ctx, () => { ctx.fillStyle = 'rgba(125,211,252,.55)'; ctx.beginPath(); ctx.ellipse(c.x, c.y, g.s * .5 + pr * g.s * .8, (g.s * .5 + pr * g.s * .8) * .35, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(2,132,199,.5)'; ctx.lineWidth = 1.2; ctx.stroke(); });
        if (sz > 2) K.box(ctx, c.x - sz * .62, c.y + sz * .18, sz, sz, sz * .7, 'ice', { alpha: .92 });
        if (c.on && p.lbl) K.tag(ctx, c.m > 0 ? 'انصهر ' + Math.round((1 - c.m) * 100) + '%' : 'انصهر كلياً 💧', c.x, c.y - g.s * 1.25, { s: 11.5, bg: c.on === 'm' ? '#0369a1' : '#a16207' }); });
      // labels + thermometers on the front face
      if (p.lbl) { K.tag(ctx, 'سطح معدني', g.mx + g.pw / 2, g.y0 + 18, { s: 13, bg: '#475569' }); K.tag(ctx, 'سطح عازل (' + IM.name + ')', g.px + g.pw / 2, g.y0 + 18, { s: 13, bg: '#a16207' }); }
      if (p.therm) { const Tm = 25 - (S.aOn === 'm' && S.aM > 0 || S.bOn === 'm' && S.bM > 0 ? 4 : 0); [[g.mx + g.pw * .5, Tm], [g.px + g.pw * .5, 25]].forEach(([x, T]) => { K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; rr(ctx, x - 40, g.y0 + 34, 80, 26, 7); ctx.fill(); }); G.text(ctx, C4.T(T), x, g.y0 + 47, { s: 14, w: 900, c: '#a3e635', mono: 1, raw: 1 }); });
        G.text(ctx, 'للسطحين درجة الحرارة نفسها (درجة حرارة الغرفة) قبل وضع الثلج!', w / 2 + 30, 100, { s: 12.5, w: 800, c: '#1e293b', bg: 'rgba(255,255,255,.9)', raw: 1 }); }
      // hands
      [['l', 'm'], ['r', 'p']].forEach(([k]) => { const x = S[k + 'X'], y = S[k + 'Y']; const on = surfAt(g, x, y);
        if (on && p.flow) C4.heat(ctx, x, y - 30, x, y + 8, on === 'm' ? 5 : 1.8, t, '#ef4444');
        C4.hand(ctx, x, y, g.sc * .78, { flip: k === 'r', sleeve: k === 'l' ? '#60a5fa' : '#34d399' });
        if (on) K.bubble(ctx, on === 'm' ? 'أشعر أنه بارد! ❄️' : 'أقل برودة 🙂', x, y - 100 * g.sc, { s: 13, bg: on === 'm' ? '#e0f2fe' : '#fef3c7', bd: on === 'm' ? '#0284c7' : '#f59e0b', c: on === 'm' ? '#075985' : '#78350f' }); });
      // clock + result
      C4.clock(ctx, w / 2 + 30, 50, S.clk, 'الزمن (يعمل عند وضع الثلج)');
      if (S.clk >= 180 || S.done) { const mm = [S.aOn === 'm' ? S.aM : S.bOn === 'm' ? S.bM : null, S.aOn === 'p' ? S.aM : S.bOn === 'p' ? S.bM : null]; if (mm[0] != null && mm[1] != null && mm[0] < mm[1]) K.bubble(ctx, 'الثلج على السطح المعدني انصهر أسرع!\nالمعدن ينقل الحرارة إلى الثلج بسرعة', w / 2 + 30, 128, { s: 13.5 }); }
      if (!S._touched) K.mascot(ctx, 110, g.by - 110, .8);
      K.party(ctx, S);
    },
    drags(S) {
      if (S.p.mode === 'tea') { const g = tgeo(S); return [
        { id: 'cupP', x: g.xp, y: g.yb - g.ch / 2, w: g.cw + 20, h: g.ch + 10, tip: 'اضغط إذا توقعت أن الشاي يبقى ساخناً في الكأس البلاستيكية', idle: 'اضغط الكأس التي تتوقعها ✋', click: S => { S.pick = 'p'; } },
        { id: 'cupM', x: g.xm, y: g.yb - g.ch / 2, w: g.cw + 20, h: g.ch + 10, tip: 'اضغط إذا توقعت أن الشاي يبقى ساخناً في الكأس المعدنية', hint: false, click: S => { S.pick = 'm'; } },
        { id: 'handT', x: S.lX, y: S.lY - 60, w: 60, h: 110, axis: 'xy', tip: 'اسحب اليد لتلمس الكأس', hint: false, drag: (S, d) => { S.lX = clamp(d.ox + d.x - d.sx, 70, S.W - 30); S.lY = clamp(d.oy + 60 + d.y - d.sy, 120, S.H - 20); } }]; }
      const g = geo(S);
      const cube = k => ({ id: 'ice' + k, x: S[k + 'X'], y: S[k + 'Y'] - g.s * .45, w: g.s + 16, h: g.s + 16, axis: 'xy', tip: 'اسحب مكعب الثلج وضعه على أحد السطحين', idle: k === 'a' ? 'اسحب مكعب الثلج إلى السطح ✋' : undefined, hint: k === 'a',
        down: S => { S[k + 'On'] = ''; },
        drag: (S, d) => { S[k + 'X'] = clamp(d.ox + d.x - d.sx, 70, S.W - 20); S[k + 'Y'] = clamp(d.oy + g.s * .45 + d.y - d.sy, 60, S.H - 20); },
        up: S => { const on = surfAt(g, S[k + 'X'], S[k + 'Y']); S[k + 'On'] = on; if (on && window.Sound) Sound.click(); if (!on) { S[k + 'X'] = g.dish.x + (k === 'a' ? -.75 : .75) * g.s; S[k + 'Y'] = g.dish.y; } } });
      const hand = k => ({ id: 'hand' + k, x: S[k + 'X'], y: S[k + 'Y'] - 55 * g.sc, w: 64 * g.sc, h: 110 * g.sc, axis: 'xy', tip: k === 'l' ? 'اسحب اليد اليسرى إلى السطح المعدني' : 'اسحب اليد اليمنى إلى السطح البلاستيكي', hint: false,
        drag: (S, d) => { S[k + 'X'] = clamp(d.ox + d.x - d.sx, 70, S.W - 30); S[k + 'Y'] = clamp(d.oy + 55 * g.sc + d.y - d.sy, 110 * g.sc, S.H - 10); } });
      return [cube('a'), cube('b'), hand('l'), hand('r')];
    },
    readings(S) {
      if (S.p.mode === 'tea') return [rd('الزمن', C4.mmss(S.tclk)), rd('الكأس البلاستيكية', C4.T(S.Tp)), rd('الكأس المعدنية', C4.T(S.Tm)), rd('توقعك', S.pick ? (S.pick === 'p' ? 'البلاستيكية' : 'المعدنية') : '— اضغط كأساً', 1)];
      const d = k => S[k + 'On'] ? (S[k + 'On'] === 'm' ? 'على المعدن' : 'على العازل') + ' — انصهر ' + Math.round((1 - S[k + 'M']) * 100) + '%' : 'في الصحن';
      return [rd('الزمن', C4.mmss(S.clk)), rd('درجة حرارة السطحين قبل الثلج', '25 °C (متساويتان)', 1), rd('المكعب الأول', d('a'), 1), rd('المكعب الثاني', d('b'), 1)];
    },
    record(S) { if (S.p.mode === 'tea') return { t: C4.mmss(S.tclk), m: '—', p: '—', tm: +S.Tm.toFixed(1), tp: +S.Tp.toFixed(1) }; const f = s => { const k = S.aOn === s ? 'a' : S.bOn === s ? 'b' : null; return k ? Math.round((1 - S[k + 'M']) * 100) : '—'; }; if (f('m') === '—' && f('p') === '—') { Runner.toast('ضع مكعبي الثلج على السطحين أولاً', 'info'); return null; } return { t: C4.mmss(S.clk), m: f('m'), p: f('p'), tm: '—', tp: '—' }; },
    cols: [['t', 'الزمن'], ['m', 'انصهار الثلج على المعدن %'], ['p', 'انصهار الثلج على العازل %'], ['tm', 'شاي الكأس المعدنية °C'], ['tp', 'شاي الكأس البلاستيكية °C']],
    explain(S) {
      if (S.p.mode === 'tea') return S.pick ? 'الحرارة تنتقل من الشاي الساخن عبر جدار الكأس إلى الهواء. <b>المعدن موصل جيد</b> فينقلها بسرعة فيبرد الشاي أسرع، أما <b>البلاستك فعازل</b> فيبقى الشاي ساخناً مدة أطول.' : 'توقّع أولاً: اضغط الكأس التي تظن أن الشاي يبقى فيها ساخناً مدة أطول.';
      if (S.aOn || S.bOn) return 'الحرارة تنتقل من السطح (الأسخن) إلى الثلج (الأبرد). <b>المعدن موصل جيد للحرارة</b> فينقل الحرارة من كل أجزائه إلى الثلج بسرعة، أما <b>العازل</b> فينقلها ببطء.';
      return 'السطحان في الغرفة نفسها لذا لهما <b>درجة الحرارة نفسها</b>، لكن المعدن يبدو أبرد عند لمسه لأنه يسحب الحرارة من يدك بسرعة.';
    },
    quiz: [
      { q: 'ما الذي يجعل المريض يشعر بأن سماعة الطبيب (المعدنية) باردة؟', o: ['لأن درجة حرارتها أقل بكثير من الغرفة', 'لأن المعدن موصل جيد يسحب الحرارة من الجلد بسرعة', 'لأن المعدن عازل للحرارة'], a: 1, why: 'الحرارة تنتقل بسرعة من الجلد (الأسخن) إلى المعدن الموصل، فنشعر بالبرودة (سؤال المراجعة ص 69).' },
      { q: 'أيهما أفضل لشرب الشاي الساخن: كأس من الزجاج أم كأس من الألمنيوم؟', o: ['الألمنيوم لأنه موصل جيد', 'الزجاج لأنه عازل حراري فيبقى الشاي ساخناً', 'لا فرق بينهما'], a: 1, why: 'الزجاج رديء التوصيل للحرارة، أما الألمنيوم فينقل الحرارة بسرعة إلى يدك وإلى الهواء (ص 66).' },
      { q: 'المواد التي توصل الطاقة الحرارية بشكل جيد تسمى:', o: ['العوازل الحرارية', 'الموصلات الحرارية', 'تيارات الحمل'], a: 1, why: 'مثل الفضة والنحاس والحديد (ص 66).' }
    ]
  });
  function drawTea(ctx, w, h, S) {
    const g = tgeo(S), p = S.p, t = S.t; K.bg(ctx, w, h, { benchY: g.by });
    [[g.xp, 'plastic', S.Tp, 'كأس بلاستيكية', 1 / 1500], [g.xm, 'metal', S.Tm, 'كأس معدنية', 1 / 420]].forEach(([x, mat, T, name, k], i) => {
      if (p.flow && S.pick) { const wd = clamp((T - 25) * k * 900, .6, 7); for (let j = 0; j < 3; j++) { const yy = g.yb - g.ch * (.25 + j * .25); C4.heat(ctx, x - g.cw * .45, yy, x - g.cw * .45 - 34 - wd * 3, yy - 6, wd, t); C4.heat(ctx, x + g.cw * .5, yy, x + g.cw * .5 + 34 + wd * 3, yy - 6, wd, t); } }
      const c = C4.cup(ctx, x, g.yb, g.cw, g.ch, { mat, liq: '#9a3412', lev: .88, col1: '#fecdd3', col2: '#e11d48' });
      C4.steam(ctx, x, c.top, t, clamp((T - 35) / 45, 0, 1));
      C4.th(ctx, x - g.cw * .18, g.yb - 22, g.ch + 60, T, 0, 100, { step: 20 });
      if (p.lbl) K.tag(ctx, name, x, g.yb + 24, { s: 13, bg: mat === 'metal' ? '#475569' : '#e11d48' });
      if (S.pick === (i ? 'm' : 'p')) K.tag(ctx, 'توقعك ✔', x, g.yb + 52, { s: 12, bg: '#16a34a' });
    });
    // hand touching a cup
    const hx = S.lX, hy = S.lY; const on = Math.abs(hx - g.xp) < g.cw * .6 && hy > g.yb - g.ch && hy < g.yb ? 'p' : Math.abs(hx - g.xm) < g.cw * .6 && hy > g.yb - g.ch && hy < g.yb ? 'm' : '';
    C4.hand(ctx, hx, hy, .7, { sleeve: '#60a5fa' });
    if (on) K.bubble(ctx, on === 'm' ? (S.Tm > 45 ? 'ساخنة جداً! 🔥 المعدن ينقل الحرارة إلى يدي' : 'دافئة') : 'أستطيع حملها، البلاستك عازل 🙂', hx, hy - 88, { s: 12.5 });
    if (!S.pick) K.bubble(ctx, 'تنبّأ: في أي كأس يبقى الشاي ساخناً مدة أطول؟\nاضغط الكأس التي تختارها', w / 2 + 30, 110, { s: 14 });
    else { C4.clock(ctx, w / 2 + 30, 50, S.tclk); if (S.teaDone) K.bubble(ctx, 'بقي الشاي ساخناً أكثر في الكأس البلاستيكية ✔\n' + (S.pick === 'p' ? 'توقعك صحيح! 🎉' : 'البلاستك عازل حراري، والمعدن موصل جيد'), w / 2 + 30, 150, { s: 13.5 }); }
    K.party(ctx, S);
  }
}

/* =====================================================================
   2) الحرارة والاتزان الحراري (ص 61–62)
   ===================================================================== */
{
  const cI = .45, cW = 4.18, mI = 300; // J/(g·°C), iron mass (g)
  const geo = S => { const w = S.W, h = S.H, by = h * .74, sc = clamp(w / 820, .6, 1); const bw = clamp(w * .27, 140, 220), bh = bw * 1.05; return { w, h, by, sc, bw, bh, bx: w * .43 + 10, bur: { x: w * .84, y: by - 70 * sc }, lev: by - bh * .72 }; };
  const restIron = (S, g) => { S.ix = g.bur.x; S.iy = g.bur.y - 30 * g.sc - 22; S.inW = false; S.onF = true; };
  const reset = S => { const g = geo(S); restIron(S, g); S.Ti = S.p.Ti0; S.Tw = S.p.Tw0; S.clk = 0; S.eq = false; S.hI = []; S.hW = []; S.pw = []; S.pl = null; };
  const ironSize = g => ({ iw: 64 * g.sc, ih: 40 * g.sc });
  X7({ id: 'g7_equilibrium', ch: 14, sec: 'الدرس 1', page: 61, kind: 'استكشاف', title: 'الحرارة والاتزان الحراري',
    desc: 'ماذا يحدث عندما تضع قطعة حديد ساخنة في ماء بارد؟ يبرد الحديد ويسخن الماء حتى تتساوى درجتا حرارتيهما (الاتزان الحراري). ونرى كيف تتحرك الجسيمات أسرع كلما ارتفعت درجة الحرارة.',
    tags: 'حرارة درجة الحرارة اتزان حراري جسيمات طاقة حركية كاكاو',
    tools: ['قطعة حديد ساخنة', 'كأس فيه ماء بارد', 'محراران', 'ماسك (ملقط)'],
    steps: ['قطعة الحديد تُسخَّن على اللهب. لاحظ قراءة محرارها ومحرار الماء البارد.', 'اسحب قطعة الحديد الساخنة وأسقطها في كأس الماء البارد.', 'راقب المحرارين والمنحني: ماذا يحدث لدرجة حرارة الحديد؟ ولدرجة حرارة الماء؟', 'فعّل «الجسيمات» لترى جسيمات الحديد تتباطأ وجسيمات الماء تتسارع.', 'انتظر حتى تتساوى القراءتان: هذه حالة «الاتزان الحراري». اضغط «تسجيل» لتسجيل قراءات عدة.', 'بدّل المشهد إلى «كاكاو ساخن ومثلج» واسحب محرار كل كأس لتغيير درجة حرارته وقارن سرعة الجسيمات.'],
    concl: ['الحرارة طاقة حرارية تنتقل دائماً من الجسم الساخن إلى الجسم البارد المتلامسين بسبب الفرق بين درجتي حرارتيهما.', 'الجسم ترتفع درجة حرارته عندما يكتسب طاقة حرارية، وتنخفض عندما يفقد طاقة حرارية.', 'الاتزان الحراري: الحالة التي تتساوى فيها درجة حرارة جسمين عندما يكونان في تماس مع بعضهما.', 'درجة الحرارة مقياس لمعدل الطاقة الحركية لجسيمات الجسم؛ جسيمات الكاكاو الساخن تتحرك أسرع من جسيمات الكاكاو المثلج.'],
    laws: ['g7_heat'],
    fact: ['الطاقة الحرارية هي مجموع طاقات جسيمات الجسم، أما درجة الحرارة فهي مقياس لمعدل هذه الطاقات.', 'عندما يتوقف انتقال الحرارة بين جسمين متلامسين نعرف أنهما وصلا إلى الاتزان الحراري.', 'المحرار نفسه يصل إلى اتزان حراري مع الجسم الذي يقيسه، لذلك ننتظر قليلاً قبل قراءته.'],
    controls: [SEL('mode', 'المشهد', [['eq', 'حديد ساخن في ماء بارد'], ['cocoa', 'كاكاو ساخن ومثلج']], 'eq'),
      R('Ti0', 'درجة حرارة الحديد الساخن', 50, 100, 100, 5, '°C', (v, S) => { if (!S.inW && !S.clk) S.Ti = v; }),
      R('Tw0', 'درجة حرارة الماء البارد', 5, 40, 15, 1, '°C', (v, S) => { if (!S.inW && !S.clk) S.Tw = v; }),
      R('mw', 'كتلة الماء', 100, 400, 200, 50, 'g'),
      TG('flow', 'أسهم انتقال الحرارة', true, null, 'heat'), TG('parts', 'الجسيمات (عدسة مكبرة)', true, null, 'atom'), TG('gph', 'منحني درجتي الحرارة', true, null, 'graph'), TG('lbl', 'الأسماء والقيم', true, null, 'labels'),
      BT('', [{ t: 'ابدأ من جديد', on: reset }])],
    setup(S) { S.W = S.W || 800; S.H = S.H || 700; reset(S); S.Th = 70; S.Tc = 5; S.ph = []; S.pc = []; S.lx = null; },
    update(S, dt) {
      const p = S.p, g = geo(S);
      if (p.mode === 'cocoa') return;
      if (S.inW) { const Ci = mI * cI, Cw = p.mw * cW, k = 55; const Q = k * (S.Ti - S.Tw) * dt; S.Ti -= Q / Ci; S.Tw += Q / Cw; S.clk += dt * 4;
        if (!S.eq && Math.abs(S.Ti - S.Tw) < .3) { S.eq = true; K.cheer(S, g.bx, g.lev - 40); } }
      else { const onFire = S.onF; if (onFire) { S.ix = g.bur.x; S.iy = g.bur.y - 30 * g.sc - 22; } S.Ti += ((onFire ? p.Ti0 : 25) - S.Ti) * (1 - Math.exp(-dt * (onFire ? .8 : .05))); if (S.clk) S.clk += dt * 4; }
      if (S.clk > 0) { const tt = +(S.clk.toFixed(1)); if (!S.hI.length || tt - S.hI[S.hI.length - 1][0] >= 1) { S.hI.push([tt, S.Ti]); S.hW.push([tt, S.Tw]); if (S.hI.length > 400) { S.hI.shift(); S.hW.shift(); } } }
    },
    draw(ctx, w, h, S) {
      const p = S.p, t = S.t; if (p.mode === 'cocoa') return drawCocoa(ctx, w, h, S);
      const g = geo(S); K.bg(ctx, w, h, { benchY: g.by }); const { iw, ih } = ironSize(g);
      // burner + tripod gauze
      K.burner(ctx, g.bur.x, g.bur.y, 1, t);
      K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; const ty = g.bur.y - 30 * g.sc; ctx.beginPath(); ctx.moveTo(g.bur.x - 44, g.by); ctx.lineTo(g.bur.x - 36, ty); ctx.moveTo(g.bur.x + 44, g.by); ctx.lineTo(g.bur.x + 36, ty); ctx.stroke(); ctx.fillStyle = '#94a3b8'; ctx.fillRect(g.bur.x - 46, ty - 4, 92, 5); });
      // beaker with water coloured by its temperature
      const top = g.by - g.bh, lev = g.lev;
      K.raw(ctx, () => { const gr = ctx.createLinearGradient(0, lev, 0, g.by); gr.addColorStop(0, C4.tcol(S.Tw, .45)); gr.addColorStop(1, C4.tcol(S.Tw, .6)); ctx.fillStyle = 'rgba(56,189,248,.35)'; ctx.fillRect(g.bx - g.bw / 2 + 2, lev, g.bw - 4, g.by - lev - 2); ctx.fillStyle = gr; ctx.fillRect(g.bx - g.bw / 2 + 2, lev, g.bw - 4, g.by - lev - 2); });
      // iron piece
      const ix = S.ix, iy = S.iy; const glow = clamp((S.Ti - 30) / 70, 0, 1);
      if (p.flow && S.inW && S.Ti - S.Tw > .4) { const wd = clamp((S.Ti - S.Tw) / 12, .8, 6); for (let k = 0; k < 6; k++) { const a = -Math.PI / 2 + (k - 2.5) * .55; C4.heat(ctx, ix + Math.cos(a) * iw * .55, iy + Math.sin(a) * ih * .8, ix + Math.cos(a) * (iw * .55 + 40), iy + Math.sin(a) * (ih * .8 + 34), wd, t); } }
      K.box(ctx, ix - iw / 2, iy + ih / 2, iw, ih, 26, { c1: C4.thex(20 + glow * 60).replace(/^#/, '#'), c2: '#475569' });
      K.raw(ctx, () => { ctx.fillStyle = C4.tcol(S.Ti, .25 + glow * .35); ctx.fillRect(ix - iw / 2, iy - ih / 2, iw, ih); });
      if (S.inW && S.Ti > 60) K.raw(ctx, () => { for (let k = 0; k < 6; k++) { const ph = (t * .9 + k / 6) % 1; ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.beginPath(); ctx.arc(ix + (k - 2.5) * iw * .18, iy - ih / 2 - ph * (iy - ih / 2 - lev), 2 + ph * 2, 0, TAU); ctx.fill(); } });
      K.beaker(ctx, g.bx, g.by, g.bw, g.bh, 0);
      if (p.lbl) { K.tag(ctx, 'ماء بارد', g.bx, g.by + 18, { s: 12.5, bg: '#0369a1' }); K.tag(ctx, S.inW ? 'قطعة حديد' : 'قطعة حديد ساخنة', ix, iy - ih / 2 - 16 - (S.inW ? 0 : 6), { s: 12, bg: '#b91c1c' }); }
      // thermometers: water (glass) + iron (digital probe)
      C4.th(ctx, g.bx + g.bw * .3, g.by - 20, g.bh + 70, S.Tw, 0, 110, { step: 20, liq: '#2563eb' });
      const dx = w - 80, dy = 112;
      K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(dx, dy + 22); ctx.bezierCurveTo(dx, dy + 90, ix + 40, iy - 60, ix + iw * .3, iy - ih * .2); ctx.stroke(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(ix + iw * .3, iy - ih * .2, 3.5, 0, TAU); ctx.fill();
        ctx.fillStyle = '#fde68a'; rr(ctx, dx - 58, dy - 26, 116, 50, 10); ctx.fill(); ctx.strokeStyle = '#a16207'; ctx.stroke(); ctx.fillStyle = '#0f172a'; rr(ctx, dx - 48, dy - 18, 96, 28, 6); ctx.fill(); });
      G.text(ctx, C4.T(S.Ti), dx, dy - 4, { s: 15, w: 900, c: '#fb923c', mono: 1, raw: 1 }); G.text(ctx, 'محرار الحديد', dx, dy + 18, { s: 10, w: 800, c: '#78350f', raw: 1 });
      // particles (magnifiers)
      if (p.parts) {
        const r = clamp(56 * g.sc, 40, 58), ax = g.bx - g.bw / 2 - r - 18, ay = lev + 10; const lx = Math.max(ax, 64 + r + 6);
        K.lens(ctx, lx, ay, r, () => { const R = { x: lx - r, y: ay - r, w: 2 * r, h: 2 * r }; ctx.fillStyle = C4.tcol(S.Tw, .25); ctx.fillRect(R.x, R.y, R.w, R.h); C4.gas(S.pw, 16, R, 18 + 1.7 * S.Tw, 1 / 60); C4.dots(ctx, S.pw, 5.5, S.Tw, 4 + S.Tw * .12); });
        G.text(ctx, 'جسيمات الماء', lx, ay + r + 14, { s: 11, w: 800, c: '#0369a1', raw: 1 });
        const bx2 = S.inW ? clamp(g.bx + g.bw / 2 + r + 22, 0, w - r - 8) : clamp(ix - iw / 2 - r - 24, 64 + r, w - r - 8), by2 = S.inW ? g.by - r - 10 : clamp(iy - r - 50, r + 150, g.by - r);
        K.lens(ctx, bx2, by2, r, () => { ctx.fillStyle = C4.tcol(S.Ti, .22); ctx.fillRect(bx2 - r, by2 - r, 2 * r, 2 * r); C4.lattice(ctx, { x: bx2 - r * .75, y: by2 - r * .75, w: r * 1.5, h: r * 1.5 }, 5, 5, .5 + S.Ti * .05, t, S.Ti); });
        G.text(ctx, 'جسيمات الحديد', bx2, by2 + r + 14, { s: 11, w: 800, c: '#b91c1c', raw: 1 });
      }
      // on-canvas graph
      if (p.gph) { const gw = clamp(w * .36, 190, 280), gh = 130; const xm = Math.max(60, Math.ceil(((S.hI[S.hI.length - 1] || [0])[0] + 1) / 30) * 30); C4.plot(ctx, 74, 12, gw, gh, [{ pts: S.hI, col: '#dc2626' }, { pts: S.hW, col: '#2563eb' }], { xmax: xm, ymin: 0, ymax: 100, title: 'درجة الحرارة (°C) مع الزمن', xl: 't (s)' });
        G.text(ctx, '■ الحديد', 74 + gw - 12, 12 + gh - 26, { s: 10, w: 800, c: '#dc2626', a: 'right', raw: 1 }); G.text(ctx, '■ الماء', 74 + gw - 70, 12 + gh - 26, { s: 10, w: 800, c: '#2563eb', a: 'right', raw: 1 }); }
      if (S.clk) C4.clock(ctx, w - 100, 40, S.clk);
      if (S.eq) K.bubble(ctx, 'اتزان حراري! ⚖️  الحديد والماء: ' + C4.T(S.Tw), g.bx, top - 10, { s: 14, bg: '#dcfce7', bd: '#16a34a', c: '#14532d' });
      else if (S.inW && p.lbl) K.tag(ctx, 'الحرارة تنتقل من الأسخن ← إلى الأبرد', g.bx, top - 22, { s: 12.5, bg: '#c2410c' });
      K.party(ctx, S);
    },
    drags(S) {
      if (S.p.mode === 'cocoa') { const g = cgeo(S); return [
        { id: 'thH', x: g.xh + g.cw * .62, y: g.tY(S.Th), r: 16, axis: 'y', tip: 'اسحب لأعلى أو لأسفل لتغيير درجة حرارة الكاكاو الساخن', idle: 'اسحب المحرار لتغيير درجة الحرارة ✋', drag: (S, d) => { S.Th = clamp(g.Tof(d.oy + d.y - d.sy), 35, 95); } },
        { id: 'thC', x: g.xc + g.cw * .62, y: g.tY(S.Tc), r: 16, axis: 'y', hint: false, tip: 'اسحب لتغيير درجة حرارة الكاكاو المثلج', drag: (S, d) => { S.Tc = clamp(g.Tof(d.oy + d.y - d.sy), 0, 30); } }]; }
      const g = geo(S), { iw, ih } = ironSize(g);
      return [{ id: 'iron', x: S.ix, y: S.iy, w: iw + 16, h: ih + 16, axis: 'xy', tip: 'اسحب قطعة الحديد الساخنة إلى الماء البارد', idle: 'اسحب الحديد الساخن إلى الماء ✋',
        down: S => { S.inW = false; S.onF = false; },
        drag: (S, d) => { S.ix = clamp(d.ox + d.x - d.sx, 80, S.W - 30); S.iy = clamp(d.oy + d.y - d.sy, 40, g.by - ih / 2); },
        up: S => { if (Math.abs(S.ix - g.bx) < g.bw / 2 && S.iy > g.by - g.bh - 40) { S.inW = true; S.ix = clamp(S.ix, g.bx - g.bw / 2 + iw / 2 + 4, g.bx + g.bw * .22 - iw / 2); S.iy = g.by - ih / 2 - 4; if (!S.clk) S.clk = .01; S.eq = false; if (window.Sound) Sound.click(); } else if (Math.hypot(S.ix - g.bur.x, S.iy - g.bur.y) < 90) restIron(S, g); } }];
    },
    readings(S) {
      if (S.p.mode === 'cocoa') return [rd('الكاكاو الساخن', C4.T(S.Th)), rd('الكاكاو المثلج', C4.T(S.Tc)), rd('أيهما جسيماته أسرع؟', 'الساخن — طاقته الحركية أكبر', 1)];
      return [rd('درجة حرارة الحديد', C4.T(S.Ti)), rd('درجة حرارة الماء', C4.T(S.Tw)), rd('الفرق', fmt(Math.abs(S.Ti - S.Tw), 2) + ' °C'), rd('الزمن', C4.mmss(S.clk)), rd('الحالة', S.eq ? 'اتزان حراري ⚖️' : S.inW ? 'الحديد يفقد حرارة والماء يكتسبها' : 'الحديد خارج الماء', 1)];
    },
    live: { title: 'درجتا حرارة الحديد والماء مع الزمن', data: S => ({ series: [{ pts: S.hI || [], color: '#dc2626', name: 'الحديد °C' }, { pts: S.hW || [], color: '#2563eb', name: 'الماء °C' }], opts: { xl: 't (s)', ymin: 0, ymax: 100, y0zero: false } }) },
    record(S) { if (!S.clk) { Runner.toast('أسقط قطعة الحديد في الماء أولاً', 'info'); return null; } if (S.eq && (S.rows || []).some(r => r.eq === 'نعم')) { } return { t: Math.round(S.clk), Ti: +S.Ti.toFixed(1), Tw: +S.Tw.toFixed(1), eq: S.eq ? 'نعم' : 'لا' }; },
    cols: [['t', 'الزمن (s)'], ['Ti', 'حرارة الحديد (°C)'], ['Tw', 'حرارة الماء (°C)'], ['eq', 'اتزان؟']],
    graph: { x: 't', y: 'Ti', xl: 'الزمن (s)', yl: 'درجة حرارة الحديد (°C)' },
    explain(S) {
      if (S.p.mode === 'cocoa') return 'جسيمات الكاكاو <b>الساخن</b> تتحرك أسرع من جسيمات الكاكاو <b>المثلج</b>، أي أن معدل طاقتها الحركية أكبر؛ لذلك درجة حرارته أعلى.';
      if (S.eq) return 'تساوت درجتا الحرارة فتوقف انتقال الحرارة: هذا هو <b>الاتزان الحراري</b>.';
      if (S.inW) return 'الحديد <b>يفقد</b> طاقة حرارية فتتباطأ جسيماته وتنخفض درجة حرارته، والماء <b>يكتسب</b> طاقة حرارية فتتسارع جسيماته وترتفع درجة حرارته.';
      return 'قطعة الحديد ساخنة (' + C4.T(S.Ti) + ') والماء بارد. اسحب الحديد إلى الماء وراقب المحرارين.';
    },
    quiz: [
      { q: 'لتحقيق حالة الاتزان الحراري بين جسمين يتطلب:', o: ['عزل الجسمين عن بعضهما', 'جعل الجسمين في تماس بعضهما مع بعض', 'صبغ الجسمين بلون واحد'], a: 1, why: 'الاتزان الحراري يحدث عندما يتلامس الجسمان فتنتقل الحرارة حتى تتساوى درجتا حرارتيهما (مراجعة الفصل).' },
      { q: 'مقياس معدل الطاقة الحركية لجسيمات الجسم يدعى:', o: ['الحرارة', 'درجة الحرارة', 'الجول'], a: 1, why: 'درجة الحرارة مقياس لمعدل الطاقة الحركية للجسيمات، أما الحرارة فطاقة تنتقل.' },
      { q: 'انتقال الطاقة الحرارية من جسم ساخن إلى جسم أقل سخونة منه يسمى:', o: ['درجة الحرارة', 'الحرارة', 'التمدد الحراري'], a: 1, why: 'الحرارة: الطاقة الحرارية التي تنتقل دائماً من الجسم الساخن إلى الجسم البارد.' }
    ]
  });
  const cgeo = S => { const w = S.W, h = S.H, by = h * .74, cw = clamp(w * .18, 80, 130), ch = cw * 1.1; const yb = by + 30, tb = yb - 16, th = ch + 70; return { w, h, by, cw, ch, yb, xh: w * .36 + 16, xc: w * .72, tb, th, tY: T => tb - 14 - (th - 26) * (T - 0) / 100, Tof: y => (tb - 14 - y) / (th - 26) * 100 }; };
  function drawCocoa(ctx, w, h, S) {
    const g = cgeo(S), t = S.t, p = S.p; K.bg(ctx, w, h, { benchY: g.by });
    [[g.xh, S.Th, S.ph, 'كاكاو ساخن'], [g.xc, S.Tc, S.pc, 'كاكاو مثلج']].forEach(([x, T, arr, name], i) => {
      const c = C4.cup(ctx, x, g.yb, g.cw, g.ch, { mat: 'glass', liq: '#7c2d12', lev: .85 });
      if (i) K.raw(ctx, () => { [[-.2, .35], [.15, .5]].forEach(([dx, dy]) => { K.box(ctx, x + dx * g.cw - 10, c.top + dy * g.ch, 20, 20, 12, 'ice', { alpha: .85 }); }); });
      C4.steam(ctx, x, c.top, t, clamp((T - 35) / 45, 0, 1));
      C4.th(ctx, x + g.cw * .62, g.tb, g.th, T, 0, 100, { step: 20 });
      K.raw(ctx, () => { ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.arc(x + g.cw * .62, g.tY(T), 7, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); });
      if (p.lbl) K.tag(ctx, name, x, g.yb + 22, { s: 13, bg: i ? '#0369a1' : '#b91c1c' });
      if (p.parts) { const r = clamp(g.cw * .58, 48, 72), ly = g.tb - g.th - r - 36; ctx.save(); K.raw(ctx, () => { ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, c.top); ctx.lineTo(x, ly + r); ctx.stroke(); ctx.setLineDash([]); }); ctx.restore();
        K.lens(ctx, x, ly, r, () => { const R = { x: x - r, y: ly - r, w: 2 * r, h: 2 * r }; ctx.fillStyle = 'rgba(146,64,14,.18)'; ctx.fillRect(R.x, R.y, R.w, R.h); C4.gas(arr, 18, R, 8 + T * 2.4, 1 / 60); C4.dots(ctx, arr, 6, T * 1.2, 3 + T * .14); });
        G.text(ctx, i ? 'جسيمات بطيئة' : 'جسيمات سريعة', x, ly - r - 14, { s: 13, w: 900, c: i ? '#0369a1' : '#b91c1c', bg: 'rgba(255,255,255,.9)', raw: 1 }); }
    });
  }
}

/* =====================================================================
   3) المحرار ومقاييس درجة الحرارة (ص 63–64)
   ===================================================================== */
{
  const ST = [{ n: 'ماء مع ثلج', T: 0 }, { n: 'هواء الغرفة', T: 20 }, { n: 'جسم الإنسان', T: 37 }, { n: 'ماء يغلي', T: 100 }];
  const QZ = [{ q: '49 °C = ? K', o: ['322 K', '224 K', '149 K'], a: 0 }, { q: '40 °C = ? K', o: ['233 K', '313 K', '140 K'], a: 1 }, { q: '0 °C = ? K', o: ['0 K', '100 K', '273 K'], a: 2 }, { q: '86 °C = ? K', o: ['359 K', '187 K', '186 K'], a: 0 }, { q: '373 K = ? °C', o: ['100 °C', '273 °C', '646 °C'], a: 0 }, { q: '750 °C = ? K', o: ['477 K', '1023 K', '850 K'], a: 1 }, { q: '310 K = ? °C', o: ['37 °C', '583 °C', '100 °C'], a: 0 }];
  const geo = S => {
    const w = S.W, h = S.H, by = h * .8, sc = clamp(w / 820, .62, 1), xa = 74, xb = w - 16, span = (xb - xa) / 4;
    const xs = [0, 1, 2, 3].map(i => xa + (i + .5) * span); const L = clamp(h * .4, 220, 320) - (w < 720 ? 50 : 0), bw = clamp(span * .72, 70, 120);
    return { w, h, by, sc, xs, span, L, bw, bh: bw * 1.05, hookY: by - 70 - L, boilY: by - 64 * sc,
      tgt: [[xs[0] - bw * .12, by - bw * .35], [xs[1], by - 70], [xs[2], by - 50 * sc], [xs[3] - bw * .12, by - 64 * sc - bw * .35]] };
  };
  const home = S => { const g = geo(S); S.tx = g.tgt[1][0]; S.ty = g.tgt[1][1]; S.st = 1; S.Tr = 20; };
  const range = p => p.typ === 'med' ? [35, 42] : p.typ === 'dig' ? [-50, 150] : [-10, 110];
  X7({ id: 'g7_thermometer', ch: 14, sec: 'الدرس 1', page: 63, kind: 'استكشاف', title: 'المحرار ومقاييس درجة الحرارة (السيليزي وكلفن)',
    desc: 'المحرار أنبوب زجاجي دقيق فيه سائل (زئبق أو كحول) يتمدد بالتسخين. نقيس به درجة حرارة الماء مع الثلج والغرفة والجسم والماء المغلي، ونقارن المقياس السيليزي بمقياس كلفن: K = 273 + °C.',
    tags: 'محرار ثرمومتر سيليزي كلفن زئبق كحول محرار طبي رقمي تمدد',
    tools: ['محرار زئبقي (أو كحولي)', 'كأس ماء مع ثلج', 'كأس ماء يغلي على مصدر حراري', 'محرار طبي', 'محرار رقمي'],
    steps: ['المحرار معلق في هواء الغرفة: اقرأ درجة الحرارة.', 'اسحب المحرار وضع مستودعه في الماء مع الثلج، وراقب السائل ينكمش وينزل.', 'انقله إلى فم الطفل (جسم الإنسان) ثم إلى الماء المغلي، ولاحظ تمدد السائل وارتفاعه.', 'فعّل «مقياس كلفن» وقارن التدريجين جنباً إلى جنب: K = 273 + °C.', 'اضغط «تسجيل» عند كل موضع، وارسم العلاقة بين K و °C.', 'جرّب المحرار الطبي (35–42 °C) والمحرار الرقمي، ثم حُلّ «تحدي التحويل».'],
    concl: ['المحرار يعمل بفضل خاصية التمدد الحراري للسائل فيه (زيادة الحجم بارتفاع درجة الحرارة).', 'في المقياس السيليزي: انجماد الماء النقي 0 °C وغليانه 100 °C تحت الضغط الجوي الاعتيادي.', 'في مقياس كلفن: انجماد الماء 273 K وغليانه 373 K، والعلاقة K = 273 + °C.', 'المحرار الطبي تدريجاته محصورة بين 35 °C و 42 °C، والمحرار الرقمي يحول الطاقة الحرارية إلى إشارة كهربائية.'],
    laws: ['g7_kelvin'],
    fact: ['يُستعمل الزئبق والكحول في المحارير لأنهما يبقيان سائلين ضمن مدى واسع من درجات الحرارة.', 'مثال الكتاب: يوم صيفي حار درجة حرارته 49 °C يساوي 273 + 49 = 322 K.', 'درجة حرارة جسم الإنسان السليم نحو 37 °C أي 310 K.'],
    controls: [SEL('typ', 'نوع المحرار', [['lab', 'زئبقي'], ['alc', 'كحولي'], ['med', 'طبي'], ['dig', 'رقمي']], 'lab'),
      TG('kel', 'مقياس كلفن بجانب السيليزي', true, null, 'swap'), TG('marks', 'النقاط المرجعية', true, null, 'labels'), TG('parts', 'جسيمات السائل (التمدد)', false, null, 'atom'), TG('chal', 'تحدي التحويل', true, null, 'energy'),
      BT('', [{ t: 'أعد المحرار إلى الحائط', on: home }])],
    setup(S) { S.W = S.W || 800; S.H = S.H || 700; home(S); S.qi = 0; S.qok = 0; S.qmsg = ''; S.lp = []; },
    update(S, dt) { const tg = ST[S.st] ? ST[S.st].T : 20; S.Tr += (tg - S.Tr) * (1 - Math.exp(-dt / (S.p.typ === 'dig' ? .5 : 1.1))); },
    draw(ctx, w, h, S) {
      const p = S.p, t = S.t, g = geo(S); if (S.st >= 0 && S._drag !== 1) { S.tx = g.tgt[S.st][0]; S.ty = g.tgt[S.st][1]; } K.bg(ctx, w, h, { benchY: g.by });
      // station 0: ice water
      const [x0, x1, x2, x3] = g.xs;
      K.raw(ctx, () => { ctx.globalAlpha = .45; ctx.fillStyle = '#7dd3fc'; ctx.fillRect(x0 - g.bw / 2 + 2, g.by - g.bh * .7, g.bw - 4, g.bh * .7 - 2); ctx.globalAlpha = 1; });
      [[-.28, .62], [.12, .66], [.25, .45]].forEach(([dx, dy]) => K.box(ctx, x0 + dx * g.bw - 10, g.by - g.bh * dy + 18, 20, 18, 12, 'ice', { alpha: .9 }));
      K.beaker(ctx, x0, g.by, g.bw, g.bh, 0);
      // station 1: hook on the wall
      K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.arc(x1, g.hookY - 8, 5, 0, TAU); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1, g.hookY - 8); ctx.lineTo(x1, g.hookY + 4); ctx.stroke(); });
      // station 2: child
      const hy = g.by - 70 * g.sc; K.raw(ctx, () => { ctx.save(); ctx.translate(x2, hy); ctx.scale(g.sc, g.sc); ctx.fillStyle = '#34d399'; ctx.beginPath(); ctx.moveTo(-48, 70); ctx.quadraticCurveTo(0, 20, 48, 70); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#fcd9b6'; ctx.strokeStyle = '#c08457'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, 36, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#7c2d12'; ctx.beginPath(); ctx.arc(0, -8, 37, Math.PI * 1.02, Math.PI * 1.98); ctx.fill(); ctx.fillStyle = '#0f172a'; [-13, 13].forEach(dx => { ctx.beginPath(); ctx.arc(dx, -2, 3.6, 0, TAU); ctx.fill(); }); ctx.fillStyle = '#f87171'; [-22, 22].forEach(dx => { ctx.globalAlpha = .4; ctx.beginPath(); ctx.arc(dx, 10, 6, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; }); ctx.fillStyle = '#9f1239'; ctx.beginPath(); ctx.ellipse(0, 20, 7, 5, 0, 0, TAU); ctx.fill(); ctx.restore(); });
      // station 3: boiling water on a burner
      const byb = g.boilY; K.burner(ctx, x3, g.by - 44 * g.sc, 1, t);
      K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x3 - g.bw * .5, g.by); ctx.lineTo(x3 - g.bw * .42, byb); ctx.moveTo(x3 + g.bw * .5, g.by); ctx.lineTo(x3 + g.bw * .42, byb); ctx.stroke(); ctx.globalAlpha = .45; ctx.fillStyle = '#60a5fa'; ctx.fillRect(x3 - g.bw / 2 + 2, byb - g.bh * .62, g.bw - 4, g.bh * .62 - 2); ctx.globalAlpha = 1;
        for (let k = 0; k < 9; k++) { const ph = (t * 1.3 + k * .37) % 1; ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.strokeStyle = 'rgba(59,130,246,.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x3 - g.bw * .4 + (k * 37 % 80) / 80 * g.bw * .8, byb - 6 - ph * g.bh * .58, 2 + ph * 3, 0, TAU); ctx.fill(); ctx.stroke(); } });
      K.beaker(ctx, x3, byb, g.bw, g.bh, 0); C4.steam(ctx, x3, byb - g.bh, t, 1);
      ST.forEach((s, i) => { K.tag(ctx, s.n, g.xs[i], g.by + 20, { s: 12.5, bg: ['#0369a1', '#475569', '#059669', '#b91c1c'][i] }); if (p.marks) { G.text(ctx, s.T + ' °C', g.xs[i], g.by + 44, { s: 12, w: 800, c: '#fff', mono: 1, raw: 1 }); if (p.kel) G.text(ctx, '= ' + (s.T + 273) + ' K', g.xs[i], g.by + 62, { s: 12, w: 800, c: '#e9d5ff', mono: 1, raw: 1 }); } });
      // the thermometer
      drawTherm(ctx, S, g, t);
      // cards: conversion + challenge
      if (p.kel) { C4.card(ctx, 72, 12, 196, 64, '#7c3aed'); G.text(ctx, 'K = 273 + °C', 170, 30, { s: 15, w: 900, c: '#6d28d9', mono: 1, raw: 1 }); const c = Math.round(S.Tr); G.text(ctx, `K = 273 + ${c} = ${273 + c} K`, 170, 56, { s: 13, w: 800, c: '#1e293b', mono: 1, raw: 1 }); }
      if (p.chal) { const Q = QZ[S.qi % QZ.length], cx = w - 150, cy = w < 720 && p.kel ? 84 : 12; C4.card(ctx, cx - 128, cy, 262, 104, '#f59e0b'); G.text(ctx, 'تحدي التحويل ⭐ ' + S.qok, cx + 5, cy + 16, { s: 12.5, w: 900, c: '#92400e', raw: 1 }); G.text(ctx, Q.q, cx + 5, cy + 42, { s: 16, w: 900, c: '#1e293b', mono: 1, raw: 1 });
        Q.o.forEach((o, i) => C4.btn(ctx, o, cx - 80 + i * 85, cy + 78, 78, 28, { s: 12.5, on: S.qmsg === 'ok' && i === Q.a, bg: S.qmsg === 'no' + i ? '#fee2e2' : '#fff', bd: S.qmsg === 'no' + i ? '#dc2626' : undefined }));
        if (S.qmsg === 'ok') K.bubble(ctx, 'صحيح! 🎉 اضغط الجواب مرة أخرى لسؤال جديد', cx, cy + 128, { s: 12, bg: '#dcfce7', bd: '#16a34a', c: '#14532d' }); else if (S.qmsg.startsWith('no')) K.bubble(ctx, 'حاول مرة أخرى: K = 273 + °C', cx, cy + 128, { s: 12 }); }
      K.party(ctx, S);
    },
    drags(S) {
      const g = geo(S), p = S.p, L = p.typ === 'dig' ? g.L * .75 : g.L;
      const rot = S.st === 2 && p.typ !== 'dig'; const out = [{ id: 'therm', x: rot ? S.tx - L * .3 : S.tx, y: rot ? S.ty - L * .3 : S.ty - L / 2 + 10, w: rot ? L * .6 : 50, h: rot ? L * .6 : L + 34, axis: 'xy', tip: 'اسحب المحرار وضع مستودعه في الماء أو في فم الطفل', idle: 'اسحب المحرار ✋',
        down: S => { S.st = -1; S._drag = 1; },
        drag: (S, d) => { S.tx = clamp(d.ox + (rot ? L * .3 : 0) + d.x - d.sx, 80, S.W - 30); S.ty = clamp(d.oy + (rot ? L * .3 : L / 2 - 10) + d.y - d.sy, L + 20, g.by - 14); },
        up: S => { S._drag = 0; let best = -1, bd = 1e9; g.tgt.forEach((q, i) => { const dd = Math.hypot(S.tx - q[0], S.ty - q[1]); if (dd < bd) { bd = dd; best = i; } }); if (bd < 70) { S.st = best; S.tx = g.tgt[best][0]; S.ty = g.tgt[best][1]; if (window.Sound) Sound.click(); } else S.st = -1; } }];
      if (p.chal) { const Q = QZ[S.qi % QZ.length], cx = S.W - 150, cy = S.W < 720 && p.kel ? 84 : 12; Q.o.forEach((o, i) => out.push({ id: 'ans' + i, x: cx - 80 + i * 85, y: cy + 78, w: 78, h: 28, hint: false, tip: 'اختر الجواب', click: S => { if (S.qmsg === 'ok') { S.qi++; S.qmsg = ''; return; } if (i === Q.a) { S.qmsg = 'ok'; S.qok++; K.cheer(S, cx, cy + 60); } else S.qmsg = 'no' + i; } })); }
      return out;
    },
    readings(S) { const r = range(S.p); const T = S.Tr; const loc = S.st >= 0 ? ST[S.st].n : 'هواء الغرفة'; return [rd('مكان المستودع', loc), rd('القراءة بالسيليزي', C4.T(T)), rd('القراءة بالكلفن', (273 + T).toFixed(1) + ' K'), rd('مدى تدريج المحرار', r[0] + ' إلى ' + r[1] + ' °C'), rd('ملاحظة', S.p.typ === 'med' && (T > 42.2 || T < 34.8) ? 'القراءة خارج مدى المحرار الطبي!' : S.p.typ === 'dig' ? 'يحول الطاقة الحرارية إلى إشارة كهربائية' : 'السائل يتمدد بالتسخين وينكمش بالتبريد', 1)]; },
    record(S) { if (S.st < 0) { Runner.toast('ضع مستودع المحرار في أحد المواضع أولاً', 'info'); return null; } const C = Math.round(S.Tr * 10) / 10; return { loc: ST[S.st].n, C, K: +(273 + C).toFixed(1) }; },
    cols: [['loc', 'الموضع'], ['C', 'بالسيليزي (°C)'], ['K', 'بالكلفن (K)']],
    graph: { x: 'C', y: 'K', xl: 'درجة الحرارة (°C)', yl: 'درجة الحرارة (K)', theory: x => 273 + x, xmin: 0, xmax: 100 },
    explain(S) { const T = S.Tr; if (S.p.typ === 'med' && T > 42.2) return 'المحرار الطبي تدريجاته محصورة بين <b>35 °C و 42 °C</b> فقط؛ لا يصلح لقياس الماء المغلي!'; return `المستودع في <b>${S.st >= 0 ? ST[S.st].n : 'هواء الغرفة'}</b>. ${S.p.typ === 'dig' ? 'المحرار الرقمي يحول الطاقة الحرارية إلى إشارة كهربائية ويعرض الرقم.' : 'السائل <b>يتمدد</b> عند التسخين فيرتفع في الأنبوب، و<b>ينكمش</b> عند التبريد.'} القراءة: <b>${C4.T(T)}</b> = <b>${(273 + T).toFixed(0)} K</b>.`; },
    quiz: [
      { q: 'ما نقطة انجماد الماء النقي عند مستوى سطح البحر في المقياس السيليزي ومقياس كلفن؟', o: ['0 °C و 273 K', '100 °C و 373 K', '0 °C و 0 K'], a: 0, why: 'K = 273 + 0 = 273 K (مراجعة الدرس ص 64).' },
      { q: 'حوّل 40 °C إلى كلفن:', o: ['233 K', '313 K', '400 K'], a: 1, why: 'K = 273 + 40 = 313 K.' },
      { q: 'ما مدى تدريجات المحرار الطبي؟', o: ['0 – 100 °C', '35 – 42 °C', '-10 – 110 °C'], a: 1, why: 'تدريجات المحرار الطبي محصورة بين 35 °C و 42 °C (ص 64).' }
    ]
  });
  function drawTherm(ctx, S, g, t) {
    const p = S.p, x = S.tx, yb = S.ty, T = S.Tr, sc = g.sc;
    if (p.typ === 'dig') {
      const L = g.L * .75; K.raw(ctx, () => { ctx.fillStyle = '#cbd5e1'; ctx.fillRect(x - 3, yb - L * .45, 6, L * .45); ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.arc(x, yb, 4, 0, TAU); ctx.fill();
        const gr = ctx.createLinearGradient(x - 22, 0, x + 22, 0); gr.addColorStop(0, '#1d4ed8'); gr.addColorStop(.5, '#60a5fa'); gr.addColorStop(1, '#1e40af'); ctx.fillStyle = gr; rr(ctx, x - 22, yb - L, 44, L * .58, 14); ctx.fill(); ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#d9f99d'; rr(ctx, x - 17, yb - L + 14, 34, 64, 6); ctx.fill(); ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.arc(x, yb - L * .5, 7, 0, TAU); ctx.fill(); });
      K.raw(ctx, () => { ctx.save(); ctx.translate(x, yb - L + 46); ctx.rotate(-Math.PI / 2); ctx.fillStyle = '#14532d'; ctx.font = '900 15px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr'; ctx.fillText(p.kel ? (273 + T).toFixed(1) + 'K' : T.toFixed(1) + '°C', 0, 0); ctx.restore(); });
      G.text(ctx, p.kel ? (273 + T).toFixed(1) + ' K' : C4.T(T), x, yb - L - 16, { s: 15, w: 900, c: '#1e3a8a', mono: 1, bg: 'rgba(255,255,255,.9)', raw: 1 });
      return;
    }
    const [t0, t1] = range(p), L = g.L, med = p.typ === 'med';
    const liq = p.typ === 'alc' ? '#dc2626' : '#9ca3af', liqD = p.typ === 'alc' ? '#991b1b' : '#475569';
    const top = yb - L, y0 = yb - 26, y1 = top + 18, yOf = v => y0 - (y0 - y1) * (v - t0) / (t1 - t0);
    const Tv = clamp(T, t0, t1); const over = med && T > t1 + .2; const rot = S.st === 2 ? -.75 : 0;
    ctx.save(); if (rot) { ctx.translate(x, yb); ctx.rotate(rot); ctx.translate(-x, -yb); }
    K.raw(ctx, () => {
      ctx.fillStyle = 'rgba(248,250,252,.95)'; rr(ctx, x - 24, top - 6, 48, L + 6, 14); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#fff'; rr(ctx, x - 5, y1 - 8, 10, y0 - y1 + 16, 5); ctx.fill(); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1; ctx.stroke();
      const gr = ctx.createRadialGradient(x - 4, yb - 4, 2, x, yb, 13); gr.addColorStop(0, '#fff'); gr.addColorStop(.4, liq); gr.addColorStop(1, liqD); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, yb, 13, 0, TAU); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.4; ctx.stroke();
      const yT = yOf(Tv); const lg = ctx.createLinearGradient(x - 3.5, 0, x + 3.5, 0); lg.addColorStop(0, liqD); lg.addColorStop(.4, p.typ === 'alc' ? '#f87171' : '#e5e7eb'); lg.addColorStop(1, liqD); ctx.fillStyle = lg; ctx.fillRect(x - 3.5, yT, 7, yb - 10 - yT); ctx.fillStyle = liqD; ctx.fillRect(x - 3.5, yT, 7, 2);
      if (med) { ctx.fillStyle = '#64748b'; ctx.fillRect(x - 5, y0 + 6, 10, 3); }
      const stp = med ? .1 : 1, maj = med ? 1 : 10, lab = med ? 1 : 20;
      ctx.font = '700 9.5px ui-monospace,monospace'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr';
      for (let v = t0; v <= t1 + 1e-6; v = +(v + stp).toFixed(2)) { if (!med && Math.round(v) % 2) continue; const yy = yOf(v); const isM = Math.abs(v / maj - Math.round(v / maj)) < 1e-6; const isH = !isM && Math.abs(v * 2 / maj - Math.round(v * 2 / maj)) < 1e-6; ctx.strokeStyle = '#334155'; ctx.lineWidth = isM ? 1.3 : .7; ctx.beginPath(); ctx.moveTo(x - 6, yy); ctx.lineTo(x - 6 - (isM ? 9 : isH ? 6 : 3.5), yy); ctx.stroke();
        if (isM && Math.abs(v / lab - Math.round(v / lab)) < 1e-6) { ctx.fillStyle = '#1e293b'; ctx.textAlign = 'right'; ctx.fillText(String(Math.round(v)), x - 17, yy); }
        if (p.kel && isM) { ctx.strokeStyle = '#6d28d9'; ctx.beginPath(); ctx.moveTo(x + 6, yy); ctx.lineTo(x + 15, yy); ctx.stroke(); if (Math.abs(v / lab - Math.round(v / lab)) < 1e-6) { ctx.fillStyle = '#6d28d9'; ctx.textAlign = 'left'; ctx.fillText(String(Math.round(v) + 273), x + 17, yy); } } }
      ctx.textAlign = 'center'; ctx.font = '900 11px ui-monospace,monospace'; ctx.fillStyle = '#1e293b'; ctx.fillText('°C', x - 30, top + 2); if (p.kel) { ctx.fillStyle = '#6d28d9'; ctx.fillText('K', x + 30, top + 2); }
      ctx.textBaseline = 'alphabetic';
    });
    if (p.marks && !med && !rot) [[0, 'انجماد الماء'], [37, 'الجسم'], [100, 'غليان الماء']].forEach(([v, n]) => { const yy = yOf(v); G.text(ctx, n, x - 50, yy, { s: 10.5, w: 800, c: '#fff', bg: 'rgba(3,105,161,.85)', a: 'right', raw: 1 }); });
    ctx.restore();
    const lblT = med && T > 42.2 ? '> 42 °C ⚠️ خارج المدى' : med && T < 34.8 ? '< 35 °C (أقل من المدى)' : p.kel ? `${C4.T(T)}  =  ${(273 + T).toFixed(1)} K` : C4.T(T);
    G.text(ctx, lblT, rot ? x - 150 : x, rot ? yb - L * .8 : top - 22, { s: 14, w: 900, c: '#0f172a', mono: /^[<>]/.test(lblT) ? 0 : 1, bg: 'rgba(255,255,255,.92)', raw: 1 });
    if (over) K.bubble(ctx, '⚠️ لا تضع المحرار الطبي في الماء المغلي!\nمداه 35 – 42 °C فقط', x, top - 36, { s: 12.5, bg: '#fee2e2', bd: '#dc2626', c: '#7f1d1d' });
    if (p.parts) { const r = 50, lx = x + (x > g.w - 150 ? -110 : 90), ly = yb - 40; K.raw(ctx, () => { ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(x + 12, yb); ctx.lineTo(lx, ly); ctx.stroke(); ctx.setLineDash([]); });
      K.lens(ctx, lx, ly, r, () => { const H = r * (.7 + .9 * clamp((T + 10) / 120, 0, 1)); const R = { x: lx - r * .6, y: ly + r * .85 - H, w: r * 1.2, h: H - 4 }; ctx.fillStyle = 'rgba(148,163,184,.25)'; ctx.fillRect(R.x, R.y, R.w, R.h); ctx.fillStyle = '#334155'; ctx.fillRect(R.x, R.y - 2, R.w, 2); C4.gas(S.lp, 12, R, 10 + T * 1.6, 1 / 60); C4.dots(ctx, S.lp, 5, T); });
      G.text(ctx, 'السائل يتمدد بالتسخين', lx, ly + r + 14, { s: 11, w: 800, c: '#334155', bg: 'rgba(255,255,255,.85)', raw: 1 }); }
  }
}

/* =====================================================================
   4) التوصيل الحراري — نشاط: اختلاف قابلية المواد في توصيلها الحراري (ص 65–66)
   ===================================================================== */
{
  const M4 = { silver: { name: 'فضة', D: 18.75, c1: '#f8fafc', c2: '#94a3b8' }, copper: { name: 'نحاس', D: 15, c1: '#fdba74', c2: '#c2410c' }, alu: { name: 'ألمنيوم', D: 12, c1: '#f1f5f9', c2: '#a1a1aa' }, iron: { name: 'حديد', D: 3.15, c1: '#94a3b8', c2: '#334155' }, glass: { name: 'زجاج', D: .12, c1: '#e0f2fe', c2: '#7dd3fc' }, wood: { name: 'خشب', D: .05, c1: '#e8b77a', c2: '#a16207' } };
  const MOPT = [['silver', 'فضة'], ['copper', 'نحاس'], ['alu', 'ألمنيوم'], ['iron', 'حديد'], ['glass', 'زجاج'], ['wood', 'خشب']];
  const N = 30, BALLS = [5, 11, 17, 23, 29], TA = 25, TW = 60;
  const SP = { steel: { name: 'ملعقة معدنية', D: 9, c1: '#f1f5f9', c2: '#94a3b8' }, plastic: { name: 'ملعقة بلاستيكية', D: .15, c1: '#fecdd3', c2: '#e11d48' }, wood: { name: 'ملعقة خشبية', D: .1, c1: '#e8b77a', c2: '#a16207' } };
  const geo = S => {
    const w = S.W, h = S.H, by = h * .78, sc = clamp(w / 820, .6, 1); const hx = Math.max(170, w * .3), hy = by - 128 * sc, L = w - hx - 60 * sc;
    const n = S.p.third ? 3 : 2; const far = n === 2 ? [-60, 55] : [-85, -5, 75], near = n === 2 ? [-6, 6] : [-10, 0, 10];
    const rods = Array.from({ length: n }, (_, i) => ({ x1: hx, y1: hy + near[i] * sc, x2: hx + L, y2: hy + far[i] * sc }));
    return { w, h, by, sc, hx, hy, L, rods, bury: by - 56 * sc };
  };
  const mats = p => [p.m1, p.m2, p.m3];
  const resetRods = S => { S.R = [0, 1, 2].map(() => ({ T: new Array(N).fill(TA), b: BALLS.map(() => ({ st: 0, y: 0, vy: 0, t: null, dx: (Math.random() - .5) * 8 })) })); S.clk = 0; S.won = false; S.nA = 0; S.nB = 0; S.nC = 0; };
  const resetSp = S => { S.sp = ['steel', 'plastic', 'wood'].map((m, i) => ({ m, i, inC: false, T: new Array(20).fill(TA), x: null, y: null })); S.spMoves = 0; S.hx = null; S.hy = null; };
  const cell = (r, c) => [r.x1 + (r.x2 - r.x1) * c / (N - 1), r.y1 + (r.y2 - r.y1) * c / (N - 1)];
  X7({ id: 'g7_conduction', ch: 14, sec: 'الدرس 2', page: 65, kind: 'نشاط', title: 'نشاط: اختلاف قابلية المواد في توصيلها الحراري (التوصيل)',
    desc: 'ساقان من الحديد والنحاس ألصقت بهما كرات صغيرة من الشمع على أبعاد متساوية، ونسخن طرفيهما المتقاربين بمصدر حراري: عن أي ساق تسقط كرات الشمع أسرع؟ ونرى الجسيمات المهتزة تنقل الطاقة من جسيم إلى آخر.',
    tags: 'توصيل حراري موصلات عوازل نحاس حديد فضة شمع ملعقة',
    tools: ['ساقان: إحداهما من الحديد والأخرى من النحاس', 'كرات صغيرة من الشمع', 'مصدر حراري', 'حاملان'],
    steps: ['لاحظ كرات الشمع الملصقة على الساقين على أبعاد متساوية.', 'اسحب المصدر الحراري (اللهب) إلى تحت طرفي الساقين المتقاربين بحيث تصلهما الحرارة بالتساوي.', 'راقب: كرات الشمع تسقط واحدة بعد الأخرى. عن أي ساق تسقط أسرع؟', 'فعّل «جسيمات الساق» لترى الجسيمات تهتز أسرع وتنقل الطاقة إلى جاراتها دون أن تنتقل من مواضعها.', 'اضغط «تسجيل» لتسجيل عدد الكرات الساقطة، ثم غيّر مادة الساقين أو أضف ساقاً ثالثة (فضة، زجاج، خشب) وكرر.', 'بدّل المشهد إلى «ملعقة في شاي ساخن» وضع الملاعق في الشاي ثم المس مقابضها باليد.'],
    concl: ['التوصيل الحراري: انتقال الطاقة الحرارية عند التماس المباشر من مادة إلى أخرى أو ضمن المادة نفسها.', 'تنتقل الطاقة الحركية من جزيء إلى آخر دون أن تنتقل الجزيئات نفسها من مواضعها.', 'تسقط كرات الشمع عن ساق النحاس أسرع لأن النحاس أجود توصيلاً للحرارة من الحديد؛ والفضة أجودها ويليها النحاس.', 'المعادن موصلات جيدة (لوجود الإلكترونات الحرة)، أما الزجاج والخشب والورق والصوف والهواء فعوازل حرارية.'],
    laws: ['g7_heat'],
    fact: ['الفضة أجود المواد توصيلاً للحرارة ويليها النحاس، لذلك تُصنع قواعد بعض القدور من النحاس.', 'مقابض القدور تُصنع من الخشب أو البلاستك لأنها عوازل حرارية تحمي أيدينا.', 'المواد الجيدة التوصيل للحرارة تعد موصلات جيدة للكهرباء أيضاً.'],
    controls: [SEL('mode', 'المشهد', [['rods', 'ساقان وكرات الشمع'], ['spoon', 'ملعقة في شاي ساخن']], 'rods'),
      SEL('m1', 'الساق الأولى', MOPT, 'copper', (v, S) => resetRods(S)), SEL('m2', 'الساق الثانية', MOPT, 'iron', (v, S) => resetRods(S)), SEL('m3', 'الساق الثالثة', MOPT, 'silver', (v, S) => resetRods(S)),
      TG('third', 'إضافة ساق ثالثة', false, (v, S) => resetRods(S), 'dot'), TG('tcol', 'ألوان درجة الحرارة', true, null, 'heat'), TG('parts', 'جسيمات الساق (الاهتزاز)', false, null, 'atom'), TG('flow', 'أسهم انتقال الحرارة', true, null, 'vector'), TG('lbl', 'الأسماء', true, null, 'labels'),
      BT('', [{ t: 'ألصق كرات الشمع من جديد', on: S => { resetRods(S); resetSp(S); } }])],
    setup(S) { S.W = S.W || 800; S.H = S.H || 700; resetRods(S); resetSp(S); S.bx = null; S.fire = true; },
    update(S, dt) {
      const p = S.p, g = geo(S);
      if (p.mode === 'spoon') { S.sp.forEach(s => { const D = SP[s.m].D, Tt = 85; const n = Math.max(1, Math.ceil(dt * D / .35)), h = dt / n; for (let k = 0; k < n; k++) { const T = s.T, nT = T.slice(); for (let c = 0; c < 20; c++) { const l = T[Math.max(0, c - 1)], r = T[Math.min(19, c + 1)]; nT[c] = T[c] + h * (D * (l + r - 2 * T[c]) - .02 * (T[c] - TA)); if (s.inC && c < 7) nT[c] = Tt; } s.T = nT; } }); return; }
      if (S.bx == null) S.bx = Math.max(95, g.hx - 130);
      const heating = S.fire && g.rods.some(r => Math.abs(r.x1 - S.bx) < 60);
      if (S.fire && g.rods.some(r => Math.min(Math.abs(r.x1 - S.bx), Math.abs(r.x2 - S.bx)) < 60 || (S.bx > r.x1 && S.bx < r.x2))) S.clk += dt;
      g.rods.forEach((r, i) => { const R = S.R[i], D = M4[mats(p)[i]].D; const n = Math.max(1, Math.ceil(dt * D / .4)), h = dt / n;
        for (let k = 0; k < n; k++) { const T = R.T, nT = T.slice(); for (let c = 0; c < N; c++) { const l = T[Math.max(0, c - 1)], rr2 = T[Math.min(N - 1, c + 1)]; let q = 0; if (S.fire) { const [cx] = cell(r, c); const sg = 1.6 * Math.hypot(r.x2 - r.x1, r.y2 - r.y1) / (N - 1); q = .9 * Math.exp(-(((cx - S.bx) / sg) ** 2)) * (260 - T[c]); } nT[c] = T[c] + h * (D * (l + rr2 - 2 * T[c]) - .02 * (T[c] - TA) + q); } R.T = nT; }
        R.b.forEach((b, k) => { if (b.st === 0 && R.T[BALLS[k]] > TW) { b.st = 1; b.vy = 0; b.y = 0; b.t = S.clk; if (window.Sound && Sound.click) Sound.click(); } if (b.st === 1) { b.vy += 900 * dt; b.y += b.vy * dt; const [, cy] = cell(r, BALLS[k]); if (cy + 12 + b.y >= g.by + 14 + i * 8) { b.y = g.by + 14 + i * 8 - cy - 12; b.st = 2; } } });
      });
      S.nA = S.R[0].b.filter(b => b.st).length; S.nB = S.R[1].b.filter(b => b.st).length; S.nC = p.third ? S.R[2].b.filter(b => b.st).length : 0;
      if (!S.won && (S.nA === 5 || S.nB === 5 || S.nC === 5)) { S.won = true; K.cheer(S, g.w / 2, g.hy - 80); }
      void heating;
    },
    draw(ctx, w, h, S) {
      const p = S.p, t = S.t; if (p.mode === 'spoon') return drawSpoon(ctx, w, h, S);
      const g = geo(S); K.bg(ctx, w, h, { benchY: g.by }); if (S.bx == null) S.bx = Math.max(95, g.hx - 130); const ms = mats(p);
      // stands at far ends
      g.rods.forEach(r => K.raw(ctx, () => { ctx.fillStyle = '#475569'; rr(ctx, r.x2 - 26, g.by - 6, 52, 12, 4); ctx.fill(); ctx.fillStyle = '#64748b'; ctx.fillRect(r.x2 + 10, r.y2 - 18, 6, g.by - r.y2 + 12); ctx.fillStyle = '#334155'; rr(ctx, r.x2 - 6, r.y2 - 9, 24, 18, 4); ctx.fill(); }));
      // burner
      K.burner(ctx, S.bx, g.bury, S.fire ? 1 : 0, t);
      K.raw(ctx, () => { ctx.fillStyle = S.fire ? '#16a34a' : '#dc2626'; ctx.beginPath(); ctx.arc(S.bx + 30, g.bury + 36, 8, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); });
      if (p.lbl) K.tag(ctx, 'مصدر حراري', S.bx, g.by + 24, { s: 12, bg: '#c2410c' });
      // rods
      g.rods.forEach((r, i) => { const R = S.R[i], M = M4[ms[i]]; const ang = Math.atan2(r.y2 - r.y1, r.x2 - r.x1), nx = -Math.sin(ang), ny = Math.cos(ang);
        K.raw(ctx, () => { ctx.lineCap = 'round'; ctx.strokeStyle = M.c2; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(r.x1, r.y1); ctx.lineTo(r.x2, r.y2); ctx.stroke(); ctx.strokeStyle = M.c1; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(r.x1 - nx * 2, r.y1 - ny * 2); ctx.lineTo(r.x2 - nx * 2, r.y2 - ny * 2); ctx.stroke(); ctx.lineCap = 'butt';
          if (p.tcol) for (let c = 0; c < N - 1; c++) { const T = (R.T[c] + R.T[c + 1]) / 2, a = clamp((T - 32) / 120, 0, .92); if (a < .02) continue; const [xa, ya] = cell(r, c), [xb, yb] = cell(r, c + 1); ctx.strokeStyle = C4.tcol(T, a); ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(xa, ya); ctx.lineTo(xb + (xb - xa) * .1, yb + (yb - ya) * .1); ctx.stroke(); } });
        if (p.parts) for (let c = 1; c < N; c += 2) { const [cx, cy] = cell(r, c), T = R.T[c], A = clamp((T - 20) * .025, .3, 5.5); const o = A * Math.sin(t * (22 + c % 5) + c * 1.7); K.ball(ctx, cx + (-ny) * 0 + nx * o, cy + ny * o, 4.3, C4.thex(T)); }
        if (p.flow) [5, 13, 21].forEach(c => { const gr = R.T[c - 2] - R.T[c + 2]; if (gr < 3) return; const [xa, ya] = cell(r, c - 2), [xb, yb] = cell(r, c + 2); const off = i === 0 ? -1 : 1; C4.heat(ctx, xa + nx * 17 * off, ya + ny * 17 * off, xb + nx * 17 * off, yb + ny * 17 * off, clamp(gr / 25, 1.2, 5), t); });
        // wax balls
        R.b.forEach((b, k) => { const [cx, cy] = cell(r, BALLS[k]); const x = cx + (b.st === 2 ? b.dx : 0), y = cy + 12 + b.y; K.raw(ctx, () => { const gr = ctx.createRadialGradient(x - 3, y - 3, 1, x, y, 8); gr.addColorStop(0, '#fffbeb'); gr.addColorStop(.6, '#fde68a'); gr.addColorStop(1, '#d97706'); ctx.fillStyle = gr; ctx.beginPath(); if (b.st === 2) ctx.ellipse(x, y + 3, 10, 5, 0, 0, TAU); else ctx.arc(x, y, 7.5, 0, TAU); ctx.fill(); if (b.st === 0) { ctx.fillStyle = '#fde68a'; ctx.fillRect(x - 3, cy + 3, 6, 4); } }); });
        if (p.lbl) { K.tag(ctx, M.name + (S.clk ? '  (سقط ' + R.b.filter(b => b.st).length + ' من 5)' : ''), r.x2 - 80 * g.sc, r.y2 + (i === 0 ? -26 : 30), { s: 12.5, bg: shade(M.c2, -10) }); }
      });
      if (p.lbl) { const [kx, ky] = cell(g.rods[0], 8); K.tag(ctx, 'كرات الشمع', kx, ky - 26, { s: 12, bg: '#b45309' }); }
      C4.clock(ctx, w - 100, 40, S.clk);
      if (S.won) { const i = [S.nA, S.nB, S.nC].indexOf(5); K.bubble(ctx, `سقطت كل كرات الشمع عن ساق ${M4[ms[i]].name} أولاً!\n${M4[ms[i]].name} أجود توصيلاً للحرارة`, w / 2 + 30, 110, { s: 13.5 }); }
      else if (!S.clk) K.tag(ctx, '← اسحب اللهب إلى تحت طرفي الساقين المتقاربين', Math.min(S.bx + 150, w - 160), g.by + 52, { s: 13, bg: '#b45309' });
      K.party(ctx, S);
    },
    drags(S) {
      const p = S.p;
      if (p.mode === 'spoon') { const g = sgeo(S); const out = S.sp.map(s => { const P = spPos(S, s, g); return { id: 'spoon' + s.i, x: P.cx, y: P.cy, r: 30, axis: 'xy', tip: 'اسحب الملعقة إلى كأس الشاي الساخن', idle: s.i === 0 ? 'ضع الملعقة في الشاي ✋' : undefined, hint: s.i === 0,
        down: S => { s.inC = false; s.x = P.cx; s.y = P.cy; }, drag: (S, d) => { s.x = d.ox + d.x - d.sx; s.y = d.oy + d.y - d.sy; S.spMoves++; },
        up: S => { if (Math.abs(s.x - g.cx) < g.cw * .7 && s.y < g.yb && s.y > g.top - 120) { s.inC = true; if (window.Sound) Sound.click(); } s.x = null; S.spMoves++; } }; });
        out.push({ id: 'hand', x: (S.hx ?? g.w - 90), y: (S.hy ?? g.top - 10) - 55, w: 60, h: 110, axis: 'xy', hint: false, tip: 'اسحب اليد لتلمس مقبض الملعقة', drag: (S, d) => { S.hx = clamp(d.ox + d.x - d.sx, 70, S.W - 20); S.hy = clamp(d.oy + 55 + d.y - d.sy, 120, S.H - 20); } });
        return out; }
      const g = geo(S);
      return [{ id: 'burner', x: S.bx ?? Math.max(95, g.hx - 130), y: g.bury + 8, w: 56, h: 80, axis: 'x', tip: 'اسحب المصدر الحراري تحت الساقين', idle: 'اسحب اللهب ✋', drag: (S, d) => { S.bx = clamp(d.ox + d.x - d.sx, 80, S.W - 40); } },
        { id: 'knob', x: (S.bx ?? Math.max(95, g.hx - 130)) + 30, y: g.bury + 36, r: 10, hint: false, tip: 'تشغيل / إطفاء اللهب', click: S => { S.fire = !S.fire; } }];
    },
    readings(S) { const p = S.p, ms = mats(p); if (p.mode === 'spoon') return S.sp.map(s => rd(SP[s.m].name + (s.inC ? ' (في الشاي)' : ''), 'حرارة المقبض ' + C4.T(s.T[19]))); const out = [rd('الزمن', C4.mmss(S.clk))]; const n = p.third ? 3 : 2; for (let i = 0; i < n; i++) out.push(rd('ساق ' + M4[ms[i]].name, 'سقط ' + S.R[i].b.filter(b => b.st).length + ' من 5 كرات')); out.push(rd('المصدر الحراري', S.fire ? 'مشتعل' : 'مطفأ')); return out; },
    record(S) { const p = S.p, ms = mats(p); if (p.mode === 'spoon') { const f = i => SP[S.sp[i].m].name + ': ' + S.sp[i].T[19].toFixed(0) + ' °C'; return { t: '—', a: f(0), b: f(1), c: f(2) }; } const f = i => i < (p.third ? 3 : 2) ? M4[ms[i]].name + ': ' + S.R[i].b.filter(b => b.st).length : '—'; return { t: Math.round(S.clk), a: f(0), b: f(1), c: f(2) }; },
    cols: [['t', 'الزمن (s)'], ['a', 'الساق الأولى (كرات ساقطة)'], ['b', 'الساق الثانية'], ['c', 'الساق الثالثة']],
    explain(S) { if (S.p.mode === 'spoon') return 'مقبض الملعقة <b>المعدنية</b> يسخن بسرعة لأن المعدن موصل جيد للحرارة، أما مقبضا الملعقتين <b>البلاستيكية والخشبية</b> فيبقيان باردين لأنهما عازلان.'; if (!S.clk) return 'ضع المصدر الحراري تحت طرفي الساقين المتقاربين وراقب كرات الشمع.'; return 'الجسيمات عند الطرف الساخن تكتسب طاقة حركية فتهتز بسعة أكبر وتصطدم بجاراتها فتنقل إليها الطاقة شيئاً فشيئاً: هذا هو <b>التوصيل الحراري</b>. الساق الأجود توصيلاً تُسقط كراتها أسرع.'; },
    quiz: [
      { q: 'على ماذا تعتمد سرعة انسياب الحرارة في المواد؟', o: ['على لون المادة', 'على طبيعة (نوع) المادة', 'على شكل الإناء فقط'], a: 1, why: 'إن سرعة انسياب الحرارة في المواد تعتمد على طبيعة المواد (ص 66).' },
      { q: 'لماذا تنتقل الحرارة في الأجسام الصلبة بطريقة التوصيل ولا تنتقل بطريقة الحمل؟', o: ['لأن جزيئاتها مقيدة الحركة في مواضعها', 'لأن جزيئاتها تتحرك بحرية لمسافات كبيرة', 'لأنها لا تحتوي على جزيئات'], a: 0, why: 'في الصلب تنتقل الطاقة بالاهتزاز من جزيء إلى آخر دون أن تنتقل الجزيئات نفسها (ص 67).' },
      { q: 'أي المواد الآتية أجودها توصيلاً للحرارة؟', o: ['الحديد', 'الفضة', 'الخشب'], a: 1, why: 'وُجد أن الفضة أجود المواد توصيلاً للحرارة ويليها النحاس (ص 66).' }
    ]
  });
  const sgeo = S => { const w = S.W, h = S.H, by = h * .72, cw = clamp(w * .2, 110, 160), ch = cw * 1.05, cx = w * .4 + 20, yb = by + 30; return { w, h, by, cw, ch, cx, yb, top: yb - ch, len: clamp(w * .24, 130, 190) }; };
  const spPos = (S, s, g) => { if (s.x != null) { const over = Math.abs(s.x - g.cx) < g.cw * .7 && s.y < g.yb && s.y > g.top - 120; return { cx: s.x, cy: s.y, a: over ? -1.15 : 0 }; } if (s.inC) return { cx: g.cx - 20 + s.i * 22, cy: g.top - g.len * .1, a: -1.2 + s.i * .12 }; return { cx: g.w * .8, cy: g.by + 34 + s.i * 34, a: 0 }; };
  function drawSpoon(ctx, w, h, S) {
    const g = sgeo(S), t = S.t, p = S.p; K.bg(ctx, w, h, { benchY: g.by });
    K.raw(ctx, () => { ctx.fillStyle = '#f0fdf4'; rr(ctx, g.w * .8 - g.len * .62, g.by + 12, g.len * 1.24, 110, 10); ctx.fill(); ctx.strokeStyle = '#86efac'; ctx.lineWidth = 2; ctx.stroke(); });
    const back = S.sp.filter(s => s.inC), front = S.sp.filter(s => !s.inC);
    const drawOne = s => { const P = spPos(S, s, g), M = SP[s.m]; const ca = Math.cos(P.a), sa = Math.sin(P.a), L = g.len; // bowl end = -L/2 along direction rotated so bowl is down-left when in cup
      const pt = u => [P.cx + ca * (u - .5) * L, P.cy + sa * (u - .5) * L];
      K.raw(ctx, () => { ctx.lineCap = 'round'; for (let c = 0; c < 19; c++) { const [xa, ya] = pt(c / 19), [xb, yb] = pt((c + 1) / 19); const T = (s.T[c] + s.T[c + 1]) / 2; ctx.strokeStyle = M.c2; ctx.lineWidth = c < 5 ? 5 : 9; ctx.beginPath(); ctx.moveTo(xa, ya); ctx.lineTo(xb, yb); ctx.stroke(); if (p.tcol) { const a = clamp((T - 30) / 45, 0, .9); if (a > .02) { ctx.strokeStyle = C4.tcol(T, a); ctx.beginPath(); ctx.moveTo(xa, ya); ctx.lineTo(xb, yb); ctx.stroke(); } } }
        const [bx, by] = pt(0); ctx.fillStyle = M.c1; ctx.strokeStyle = M.c2; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(bx, by, 16, 10, P.a + Math.PI, 0, TAU); ctx.fill(); ctx.stroke(); ctx.lineCap = 'butt'; });
      if (p.flow && s.inC && M.D > 1) { const [xa, ya] = pt(.3), [xb, yb] = pt(.85); C4.heat(ctx, xa + 16, ya, xb + 16, yb, 3, t); }
      if (p.parts) for (let c = 2; c < 20; c += 3) { const [cx, cy] = pt(c / 19), A = clamp((s.T[c] - 20) * .06, .3, 4.5); K.ball(ctx, cx + A * Math.sin(t * 24 + c), cy + A * Math.cos(t * 21 + c), 3.6, C4.thex(s.T[c])); }
      const [hx, hy] = pt(1); if (p.lbl) K.tag(ctx, M.name.replace('ملعقة ', '') + ' ' + C4.T(s.T[19]), hx + (s.inC ? 20 + s.i * 6 : 0), hy - (s.inC ? 22 + s.i * 22 : 18), { s: 11.5, bg: shade(M.c2, -15) });
      return [hx, hy]; };
    const ends = {}; back.forEach(s => ends[s.i] = drawOne(s));
    const c = C4.cup(ctx, g.cx, g.yb, g.cw, g.ch, { mat: 'glass', liq: '#b45309', lev: .8 }); C4.steam(ctx, g.cx - 20, c.top, t, 1);
    if (p.lbl) K.tag(ctx, 'شاي ساخن 85 °C', g.cx, g.yb + 22, { s: 12.5, bg: '#9a3412' });
    front.forEach(s => ends[s.i] = drawOne(s));
    const hx = S.hx ?? g.w - 90, hy = S.hy ?? g.top - 10; C4.hand(ctx, hx, hy, .7, { sleeve: '#a78bfa' });
    let near = null, nd = 36; Object.keys(ends).forEach(k => { const e = ends[k], d = Math.hypot(e[0] - hx, e[1] - hy); if (d < nd) { nd = d; near = S.sp[k]; } });
    if (near) { const T = near.T[19]; K.bubble(ctx, T > 45 ? 'المقبض ساخن! 🔥' : T > 32 ? 'المقبض دافئ' : 'المقبض ليس ساخناً 🙂', hx, hy - 90, { s: 13 }); }
    if (!S.sp.some(s => s.inC)) K.bubble(ctx, 'ضع الملاعق الثلاث في الشاي الساخن\nثم المس مقابضها بعد قليل', g.cx, g.top - 60, { s: 13 });
  }
}

/* =====================================================================
   5) الحمل (ص 66–67): نشارة الخشب في ماء يسخن + مكيف الهواء في الغرفة
   ===================================================================== */
{
  /* two convection cells in a box (u,v ∈ [0,1], v up), rising at ub */
  const cellV = (u, v, ub) => { const left = u < ub; const U = left ? u : 1 - u, B = left ? ub : 1 - ub; const vx = Math.PI * Math.sin(Math.PI * U / B) * Math.cos(Math.PI * v), vy = -Math.cos(Math.PI * U / B) * Math.sin(Math.PI * v) * Math.PI; return [left ? vx : -vx, vy]; };
  const geo = S => { const w = S.W, h = S.H, by = h * .82, sc = clamp(w / 820, .6, 1); const bw = clamp(w * .44, 210, 340), bh = bw * .9, bx = w * .5 + 24, yb = by - 92 * sc; return { w, h, by, sc, bw, bh, bx, yb, top: yb - bh, lev: yb - bh * .86, xL: bx - bw / 2 + 4, W: bw - 8, H: bh * .86 - 6, bury: by - 42 }; };
  const rgeo = S => { const w = S.W, h = S.H; const fy = h * .86, x0 = 70, x1 = w - 14, y0 = 26; return { w, h, fy, x0, x1, y0, W: x1 - x0, H: fy - y0, acX: x1 - 40 }; };
  const initSaw = S => { S.saw = Array.from({ length: 110 }, () => ({ u: .04 + Math.random() * .92, v: Math.random() * .25 })); S.Tw = 20; S.A = 0; S.hT = []; };
  const initAir = S => { const g = rgeo(S); S.L = new Array(14).fill(33); S.air = Array.from({ length: 150 }, () => ({ x: g.x0 + Math.random() * g.W, y: g.y0 + Math.random() * g.H, vx: 0, vy: 0, T: 30 + Math.random() * 6 })); S.rt = 0; S.hH = []; S.hF = []; S.headT = 33; S.footT = 33; };
  X7({ id: 'g7_convection', ch: 14, sec: 'الدرس 2', page: 66, kind: 'استكشاف', title: 'انتقال الحرارة بالحمل (تيارات الحمل)',
    desc: 'نضع ماءً ونشارة خشب ناعمة في كأس زجاجية ونسخنها بهدوء من الأسفل: تصعد النشارة من وسط الكأس وتهبط من الجوانب (تيارات الحمل). ثم نرى لماذا توضع مكيفات الهواء في الأعلى قرب السقف.',
    tags: 'حمل تيار الحمل نشارة خشب كثافة سائل غاز مكيف هواء',
    tools: ['كأس زجاجية فيها ماء', 'قليل من نشارة الخشب الناعمة', 'مصدر حراري', 'حامل ثلاثي وشبكة'],
    steps: ['لاحظ نشارة الخشب الساكنة في قعر الكأس.', 'اسحب المصدر الحراري إلى تحت منتصف الكأس (الزر الأخضر يشعل اللهب أو يطفئه).', 'راقب النشارة: تصعد من وسط الكأس، وعندما تصل إلى أعلى الماء تهبط من الجوانب.', 'فعّل «ألوان درجة الحرارة» و«أسهم تيارات الحمل» و«جسيمات الماء» لترى السبب: الماء الساخن يتمدد فتقل كثافته فيرتفع.', 'حرّك اللهب إلى جانب الكأس ولاحظ تغير مكان تيار الحمل.', 'بدّل المشهد إلى «الغرفة ومكيف الهواء» واسحب المكيف إلى الأعلى ثم إلى الأسفل وقارن درجة الحرارة عند الرأس.'],
    concl: ['الماء في قعر الكأس يسخن أولاً فيتمدد وتصبح كثافته أقل من كثافة الماء البارد فوقه، لذلك يرتفع إلى الأعلى.', 'في الوقت نفسه يهبط الماء البارد (الأكبر كثافة) إلى القعر من الجوانب.', 'تيار الحمل: انتقال الطاقة الحرارية بوساطة حركة جزيئات السائل (أو الغاز) نفسها.', 'الحمل يقتصر على الموائع (السوائل والغازات) ولا يحدث في المواد الصلبة لأن جزيئاتها مقيدة الحركة في مواضعها.', 'يوضع المكيف قرب السقف لأن الهواء البارد أكبر كثافة فيهبط ويحل محله الهواء الساخن الذي يرتفع، فتبرد الغرفة كلها.'],
    laws: ['g7_heat'],
    fact: ['تيارات الحمل هي السبب الرئيس لحركة الرياح والأعاصير: الهواء الساخن يرتفع مكوناً منطقة ضغط منخفض فتحل محله طبقات الهواء الباردة (ص 70).', 'تهوية الغرفة ونسيم البر والبحر أمثلة على تيارات الحمل في الهواء.', 'عند سلق الخضراوات يتحرك غطاء القدر إلى الأعلى بسبب البخار والهواء الساخن المتمدد.'],
    controls: [SEL('mode', 'المشهد', [['beaker', 'نشارة الخشب في الماء'], ['room', 'الغرفة ومكيف الهواء']], 'beaker', (v, S) => { if (v === 'room') initAir(S); }),
      TG('saw', 'نشارة الخشب / جزيئات الهواء', true, null, 'dot'), TG('tcol', 'ألوان درجة الحرارة', true, null, 'heat'), TG('arrows', 'أسهم تيارات الحمل', true, null, 'current'), TG('parts', 'جسيمات الماء (الكثافة)', false, null, 'atom'), TG('lbl', 'الأسماء', true, null, 'labels'),
      BT('', [{ t: 'ابدأ من جديد', on: S => { initSaw(S); initAir(S); } }, { t: 'المكيف قرب السقف', on: S => { S.acY = .12; } }, { t: 'المكيف قرب الأرض', on: S => { S.acY = .86; } }])],
    setup(S) { S.W = S.W || 800; S.H = S.H || 700; initSaw(S); initAir(S); S.bx = null; S.fire = true; S.acY = .12; S.pw = []; S.pc = []; S.clk = 0; },
    update(S, dt) {
      const p = S.p; S.clk += dt;
      if (p.mode === 'room') { const g = rgeo(S), NL = S.L.length, L = S.L; const ia = clamp(Math.round(S.acY * (NL - 1)), 0, NL - 1), hi = S.acY < .5;
        const n = Math.max(1, Math.ceil(dt / .02)), hh = dt / n;
        for (let k = 0; k < n; k++) { L[0] += (40 - L[0]) * .25 * hh; for (let i = 0; i < NL; i++) L[i] += (32 - L[i]) * .01 * hh; L[ia] += (16 - L[ia]) * 1.2 * hh;
          for (let i = 0; i < NL - 1; i++) { if (L[i] < L[i + 1]) { const m = (L[i] + L[i + 1]) / 2; L[i] += (m - L[i]) * Math.min(1, 6 * hh); L[i + 1] += (m - L[i + 1]) * Math.min(1, 6 * hh); } const d = (L[i + 1] - L[i]) * .08 * hh; L[i] += d; L[i + 1] -= d; } }
        const Lat = y => L[clamp(Math.round((y - g.y0) / g.H * (NL - 1)), 0, NL - 1)];
        S.air.forEach(a => { const u = (a.x - g.x0) / g.W, v = (g.fy - a.y) / g.H; let vx = 0, vy = 0;
          if (hi) { vx = Math.PI * Math.sin(Math.PI * u) * Math.cos(Math.PI * v) * g.W * .035; vy = -(-Math.PI * Math.cos(Math.PI * u) * Math.sin(Math.PI * v)) * g.H * .035; }
          else if (v < .16) vx = -g.W * .12;
          a.x += (vx + (Math.random() - .5) * 40) * dt; a.y += (vy + (Math.random() - .5) * 40) * dt;
          if (a.x < g.x0 + 4) a.x = !hi && v < .16 ? g.x1 - 60 : g.x0 + 4; if (a.x > g.x1 - 4) a.x = g.x1 - 4; a.y = clamp(a.y, g.y0 + 4, g.fy - 4); a.T = Lat(a.y); });
        S.headT = Lat(g.fy - g.H * .55); S.footT = Lat(g.fy - 20);
        hist(S, 'hH', S.headT); hist(S, 'hF', S.footT); return; }
      const g = geo(S); if (S.bx == null) S.bx = Math.max(100, g.xL - 70);
      const H = S.fire ? Math.exp(-(((S.bx - g.bx) / (g.bw * .42)) ** 2)) : 0; S.H0 = H;
      S.A += (H - S.A) * (1 - Math.exp(-dt / 1.6)); S.Tw += (.9 * H * (100 - S.Tw) / 80 - .004 * (S.Tw - 20)) * dt; hist(S, 'hT', S.Tw);
      const ub = clamp((S.bx - g.xL) / g.W, .18, .82); S.ub = ub;
      S.saw.forEach(q => { const [vx, vy] = cellV(q.u, q.v, ub); const cw = q.u < ub ? ub : 1 - ub; q.u += (.075 * S.A * vx * cw + (Math.random() - .5) * .02) * dt; q.v += (.075 * S.A * vy * cw - .03 * (1 - S.A) + (Math.random() - .5) * .02) * dt; q.u = clamp(q.u, .02, .98); q.v = clamp(q.v, .015, .97); });
    },
    draw(ctx, w, h, S) {
      const p = S.p, t = S.t; if (p.mode === 'room') return drawRoom(ctx, w, h, S);
      const g = geo(S); K.bg(ctx, w, h, { benchY: g.by }); if (S.bx == null) S.bx = Math.max(100, g.xL - 70);
      const ub = S.ub ?? .5, A = S.A || 0, X = u => g.xL + u * g.W, Y = v => g.yb - 4 - v * g.H;
      K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.bx - g.bw * .42, g.by); ctx.lineTo(g.bx - g.bw * .36, g.yb + 4); ctx.moveTo(g.bx + g.bw * .42, g.by); ctx.lineTo(g.bx + g.bw * .36, g.yb + 4); ctx.stroke(); ctx.fillStyle = '#94a3b8'; ctx.fillRect(g.bx - g.bw * .45, g.yb, g.bw * .9, 5); });
      K.burner(ctx, S.bx, g.bury, S.fire ? 1 : 0, t);
      K.raw(ctx, () => { ctx.fillStyle = S.fire ? '#16a34a' : '#dc2626'; ctx.beginPath(); ctx.arc(S.bx + 30, g.bury + 36, 8, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); });
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(125,211,252,.45)'; ctx.fillRect(g.xL, g.lev, g.W, g.yb - 4 - g.lev);
        if (p.tcol) { ctx.save(); ctx.beginPath(); ctx.rect(g.xL, g.lev, g.W, g.yb - 4 - g.lev); ctx.clip(); const cx = X(ub); const gr = ctx.createRadialGradient(cx, g.yb, 4, cx, g.yb - g.H * .4, g.H * (.35 + .7 * A)); gr.addColorStop(0, `rgba(239,68,68,${(.65 * A).toFixed(3)})`); gr.addColorStop(.5, `rgba(251,146,60,${(.4 * A).toFixed(3)})`); gr.addColorStop(1, 'rgba(251,146,60,0)'); ctx.fillStyle = gr; ctx.fillRect(g.xL, g.lev, g.W, g.H + 10);
          const pl = ctx.createLinearGradient(cx - g.W * .12, 0, cx + g.W * .12, 0); pl.addColorStop(0, 'rgba(249,115,22,0)'); pl.addColorStop(.5, `rgba(249,115,22,${(.35 * A).toFixed(3)})`); pl.addColorStop(1, 'rgba(249,115,22,0)'); ctx.fillStyle = pl; ctx.fillRect(cx - g.W * .12, g.lev, g.W * .24, g.H);
          [0, 1].forEach(sd => { const ex = sd ? g.xL + g.W : g.xL; const sg = ctx.createLinearGradient(ex, 0, ex + (sd ? -1 : 1) * g.W * .2, 0); sg.addColorStop(0, `rgba(37,99,235,${(.35 * A).toFixed(3)})`); sg.addColorStop(1, 'rgba(37,99,235,0)'); ctx.fillStyle = sg; ctx.fillRect(Math.min(ex, ex + (sd ? -1 : 1) * g.W * .2), g.lev, g.W * .2, g.H); }); ctx.restore(); } });
      if (p.saw) K.raw(ctx, () => { ctx.fillStyle = '#92400e'; S.saw.forEach((q, i) => { const x = X(q.u), y = Y(q.v); ctx.save(); ctx.translate(x, y); ctx.rotate(i * 1.3 + t * (i % 3 - 1)); ctx.fillRect(-2.8, -1.3, 5.6, 2.6); ctx.restore(); }); });
      if (p.arrows && A > .08) { const a = clamp(A, 0, 1); [[0, ub], [ub, 1]].forEach(([u0, u1], k) => { const cu = (u0 + u1) / 2, inner = k ? u0 : u1, outer = k ? u1 : u0; const wd = 2 + 3 * a, sg = k ? 1 : -1;
        K.raw(ctx, () => { ctx.globalAlpha = .35 + .6 * a; });
        C4.heat(ctx, X(inner + sg * .05), Y(.18), X(inner + sg * .05), Y(.8), wd, t, '#ef4444');
        C4.heat(ctx, X(cu - sg * .12), Y(.9), X(cu + sg * .16), Y(.9), wd, t, '#f59e0b');
        C4.heat(ctx, X(outer - sg * .06), Y(.8), X(outer - sg * .06), Y(.2), wd, t, '#2563eb');
        C4.heat(ctx, X(cu + sg * .16), Y(.08), X(cu - sg * .12), Y(.08), wd, t, '#3b82f6');
        K.raw(ctx, () => { ctx.globalAlpha = 1; }); }); }
      K.beaker(ctx, g.bx, g.yb, g.bw, g.bh, 0);
      C4.th(ctx, g.bx + g.bw / 2 - 22, g.yb - 30, g.bh + 30, S.Tw, 0, 100, { step: 20, s: 12 });
      if (p.lbl) { K.tag(ctx, 'ماء + نشارة خشب ناعمة', g.bx, g.top - 16, { s: 12.5, bg: '#0369a1' }); if (A > .3) { K.tag(ctx, 'ماء ساخن: كثافة أقل ↑', X(ub), Y(.62), { s: 12, bg: '#dc2626' }); K.tag(ctx, 'ماء بارد يهبط ↓', X(ub < .5 ? .84 : .16), Y(.45), { s: 12, bg: '#1d4ed8' }); } K.tag(ctx, 'مصدر حراري', S.bx, g.by + 22, { s: 12, bg: '#c2410c' }); }
      if (p.parts) { const r = clamp(46 * g.sc, 34, 46); const lx1 = Math.max(64 + r + 4, g.xL - r - 26), ly1 = Y(.72), ly2 = Y(.2) - 26;
        K.lens(ctx, lx1, ly1, r, () => { const R = { x: lx1 - r, y: ly1 - r, w: 2 * r, h: 2 * r }; ctx.fillStyle = 'rgba(37,99,235,.15)'; ctx.fillRect(R.x, R.y, R.w, R.h); C4.gas(S.pc, 22, R, 25, 1 / 60); C4.dots(ctx, S.pc, 5, 12, 3); });
        G.text(ctx, 'ماء بارد: متقارب (كثافة أكبر)', lx1, ly1 + r + 13, { s: 10.5, w: 800, c: '#1d4ed8', bg: 'rgba(255,255,255,.85)', raw: 1 });
        const hTw = 20 + 60 * A; K.lens(ctx, lx1, ly2, r, () => { const R = { x: lx1 - r, y: ly2 - r, w: 2 * r, h: 2 * r }; ctx.fillStyle = 'rgba(239,68,68,.12)'; ctx.fillRect(R.x, R.y, R.w, R.h); C4.gas(S.pw, Math.round(22 - 11 * A), R, 25 + 90 * A, 1 / 60); C4.dots(ctx, S.pw, 5, hTw, 3 + 8 * A); });
        G.text(ctx, 'ماء ساخن: متباعد (كثافة أقل)', lx1, ly2 + r + 13, { s: 10.5, w: 800, c: '#dc2626', bg: 'rgba(255,255,255,.85)', raw: 1 }); }
      if (!S._touched) K.tag(ctx, '← اسحب اللهب إلى تحت منتصف الكأس', Math.min(S.bx + 150, w - 150), g.by + 52, { s: 13, bg: '#b45309' });
    },
    drags(S) {
      if (S.p.mode === 'room') { const g = rgeo(S); return [{ id: 'ac', x: g.acX, y: g.y0 + g.H * S.acY, w: 70, h: 44, axis: 'y', tip: 'اسحب المكيف إلى الأعلى أو الأسفل على الحائط', idle: 'اسحب المكيف ✋', drag: (S, d) => { S.acY = clamp((d.oy + d.y - d.sy - g.y0) / g.H, .08, .9); } }]; }
      const g = geo(S), bx = S.bx ?? Math.max(100, g.xL - 70);
      return [{ id: 'burner', x: bx, y: g.bury + 8, w: 56, h: 80, axis: 'x', tip: 'اسحب المصدر الحراري تحت الكأس', idle: 'اسحب اللهب ✋', drag: (S, d) => { S.bx = clamp(d.ox + d.x - d.sx, 80, S.W - 40); } },
        { id: 'knob', x: bx + 30, y: g.bury + 36, r: 10, hint: false, tip: 'تشغيل / إطفاء اللهب', click: S => { S.fire = !S.fire; } }];
    },
    readings(S) { if (S.p.mode === 'room') return [rd('موضع المكيف', S.acY < .4 ? 'قرب السقف' : S.acY > .6 ? 'قرب الأرض' : 'في المنتصف'), rd('حرارة الهواء عند الرأس', C4.T(S.headT)), rd('حرارة الهواء عند القدمين', C4.T(S.footT)), rd('النتيجة', S.acY < .4 ? 'الهواء البارد يهبط فتبرد الغرفة كلها' : 'الهواء البارد يبقى قرب الأرض والأعلى حار', 1)]; return [rd('درجة حرارة الماء', C4.T(S.Tw)), rd('المصدر الحراري', S.fire ? (S.H0 > .5 ? 'تحت الكأس' : 'بعيد عن الكأس') : 'مطفأ'), rd('شدة تيار الحمل', Math.round((S.A || 0) * 100) + '%'), rd('حركة النشارة', (S.A || 0) > .3 ? 'تصعد من فوق اللهب وتهبط من الجوانب' : 'ساكنة تقريباً', 1)]; },
    live: { title: 'درجة الحرارة مع الزمن', data: S => S.p.mode === 'room' ? { series: [{ pts: S.hH || [], color: '#dc2626', name: 'عند الرأس °C' }, { pts: S.hF || [], color: '#2563eb', name: 'عند القدمين °C' }], opts: { xl: 't (s)', ymin: 10, ymax: 45, y0zero: false } } : { series: [{ pts: S.hT || [], color: '#dc2626', name: 'الماء °C' }], opts: { xl: 't (s)', ymin: 0, ymax: 100, y0zero: false } } },
    explain(S) { if (S.p.mode === 'room') return S.acY < .4 ? 'الهواء البارد الخارج من المكيف <b>أكبر كثافة فيهبط</b>، والهواء الساخن <b>يرتفع</b> إلى المكيف فيبرد؛ تتكون تيارات حمل تبرد الغرفة كلها. لهذا يوضع المكيف قرب السقف.' : 'المكيف قرب الأرض: الهواء البارد الأكبر كثافة <b>يبقى قرب الأرض</b> ولا يصعد، فيبقى الهواء الساخن في أعلى الغرفة (عند رؤوسنا).'; return (S.A || 0) > .3 ? 'الماء في القعر فوق اللهب يسخن فيتمدد وتقل كثافته فيرتفع حاملاً معه الحرارة، ويهبط الماء البارد من الجوانب: هذه <b>تيارات الحمل</b>.' : 'ضع اللهب تحت الكأس وانتظر قليلاً لترى حركة نشارة الخشب.'; },
    quiz: [
      { q: 'عملية انتقال الحرارة في السوائل والغازات تسمى:', o: ['التوصيل', 'الحمل', 'الامتصاص'], a: 1, why: 'تيار الحمل: انتقال الطاقة الحرارية بوساطة حركة جزيئات السائل أو الغاز (مراجعة الفصل).' },
      { q: 'لماذا توضع مكيفات الهواء إلى الأعلى قريبة من السقف؟', o: ['لأن الهواء البارد أكبر كثافة فيهبط ويبرد الغرفة كلها', 'لأن الهواء البارد يرتفع إلى الأعلى', 'لكي لا تتسخ'], a: 0, why: 'الهواء البارد يهبط والساخن يرتفع فتتكون تيارات حمل (ص 67).' },
      { q: 'ترتفع جزيئات الهواء الساخنة نحو الأعلى، بينما تتجه الباردة نحو الأسفل، لأن:', o: ['الهواء الساخن كثافته أقل', 'الهواء الساخن كثافته أكبر', 'الهواء البارد أخف'], a: 0, why: 'الهواء الساخن يتمدد فتقل كثافته فيرتفع، والبارد أكبر كثافة فيهبط (تفكير ناقد ص 69).' }
    ]
  });
  function drawRoom(ctx, w, h, S) {
    const g = rgeo(S), p = S.p, t = S.t; G.bg(ctx, w, h, false); const acy = g.y0 + g.H * S.acY;
    K.raw(ctx, () => { const wg = ctx.createLinearGradient(0, g.y0, 0, g.fy); wg.addColorStop(0, '#fef3c7'); wg.addColorStop(1, '#fff7ed'); ctx.fillStyle = wg; ctx.fillRect(g.x0, g.y0, g.W, g.H); ctx.fillStyle = '#a16207'; ctx.fillRect(g.x0 - 8, g.fy, g.W + 16, h - g.fy); ctx.fillStyle = '#78716c'; ctx.fillRect(g.x0 - 8, g.y0 - 14, g.W + 16, 14);
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 3; ctx.strokeRect(g.x0, g.y0, g.W, g.H);
      ctx.fillStyle = '#bae6fd'; rr(ctx, g.x0 + 16, g.y0 + g.H * .2, 60, 90, 6); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.stroke(); ctx.beginPath(); ctx.moveTo(g.x0 + 46, g.y0 + g.H * .2); ctx.lineTo(g.x0 + 46, g.y0 + g.H * .2 + 90); ctx.stroke(); ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(g.x0 + 62, g.y0 + g.H * .2 + 20, 9, 0, TAU); ctx.fill(); });
    if (p.lbl) K.tag(ctx, 'السقف حار (شمس الصيف)', g.x0 + g.W * .4, g.y0 + 16, { s: 11.5, bg: '#b91c1c' });
    if (p.saw) S.air.forEach(a => K.ball(ctx, a.x, a.y, 4.2, p.tcol ? C4.thex(a.T) : '#94a3b8'));
    const px = g.x0 + g.W * .42, headY = g.fy - g.H * .55;
    K.raw(ctx, () => { ctx.fillStyle = '#2563eb'; rr(ctx, px - 22, headY + 26, 44, g.fy - headY - 70, 12); ctx.fill(); ctx.fillStyle = '#1e3a8a'; ctx.fillRect(px - 18, g.fy - 48, 14, 48); ctx.fillRect(px + 4, g.fy - 48, 14, 48); ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(px, headY, 22, 0, TAU); ctx.fill(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(px, headY - 6, 22, Math.PI * 1.05, Math.PI * 1.95); ctx.fill(); });
    K.bubble(ctx, S.headT > 28 ? 'الجو حار عند رأسي 🥵' : 'الغرفة باردة ومنعشة 😊', px, headY - 26, { s: 12.5 });
    [[headY, S.headT, 'عند الرأس'], [g.fy - 30, S.footT, 'عند القدمين']].forEach(([y, T, n]) => { K.raw(ctx, () => { ctx.strokeStyle = 'rgba(15,23,42,.35)'; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(px + 30, y); ctx.lineTo(px + 90, y); ctx.stroke(); ctx.setLineDash([]); }); G.text(ctx, n + ': ' + C4.T(T), px + 94, y, { s: 12.5, w: 900, c: '#fff', bg: C4.tcol(T, .95), a: 'left', raw: 1 }); });
    K.raw(ctx, () => { ctx.fillStyle = '#f8fafc'; rr(ctx, g.acX - 34, acy - 22, 64, 44, 8); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.stroke(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(g.acX - 28, acy + 4 + k * 4); ctx.lineTo(g.acX + 24, acy + 4 + k * 4); ctx.stroke(); } ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.arc(g.acX + 20, acy - 12, 3, 0, TAU); ctx.fill(); });
    if (p.lbl) K.tag(ctx, 'مكيف الهواء', g.acX - 6, acy - 36, { s: 11.5, bg: '#0369a1' });
    if (p.arrows) {
      if (S.acY < .5) { C4.heat(ctx, g.acX - 40, acy + 6, g.x0 + 150, acy + 16, 5, t, '#2563eb'); C4.heat(ctx, g.x0 + 110, acy + 40, g.x0 + 110, g.fy - 60, 4.5, t, '#3b82f6'); C4.heat(ctx, g.x0 + 140, g.fy - 36, g.acX - 190, g.fy - 36, 3.5, t, '#f59e0b'); C4.heat(ctx, g.acX - 170, g.fy - 60, g.acX - 170, acy + 40, 4, t, '#ef4444'); if (p.lbl) { K.tag(ctx, 'البارد يهبط', g.x0 + 150, (acy + g.fy) / 2, { s: 12, bg: '#1d4ed8' }); K.tag(ctx, 'الساخن يرتفع إلى المكيف', g.acX - 170, (acy + g.fy) / 2 + 40, { s: 12, bg: '#dc2626' }); } }
      else { C4.heat(ctx, g.acX - 40, acy + 6, g.acX - 150, acy + 10, 5, t, '#2563eb'); C4.heat(ctx, g.acX - 160, g.fy - 20, g.x0 + 140, g.fy - 20, 4.5, t, '#3b82f6'); if (p.lbl) { K.tag(ctx, 'الهواء البارد يبقى قرب الأرض', g.x0 + g.W * .3, g.fy - 46, { s: 12, bg: '#1d4ed8' }); K.tag(ctx, 'الهواء الساخن يبقى في الأعلى', g.x0 + g.W * .62, g.y0 + 60, { s: 12, bg: '#dc2626' }); } } }
  }
}

/* =====================================================================
   6) الإشعاع (ص 67) وقنينة الترموس (ص 70)
   ===================================================================== */
{
  const geoH = S => { const w = S.W, h = S.H, by = h * .74, sc = clamp(w / 820, .6, 1); return { w, h, by, sc, hx: 110 * sc + 50, hy: by - 90 * sc }; };
  const geoT = S => { const w = S.W, h = S.H, sc = clamp(w / 820, .6, 1); const fw = clamp(w * .27, 140, 210), fh = clamp(h * .6, 320, 460); const fx = Math.max(74 + fw / 2 + 36, w * .3); const fb = h * .88; return { w, h, sc, fw, fh, fx, fb, ft: fb - fh }; };
  const kRoutes = p => ({ cd: p.vac ? .0008 : .012, cv: p.vac ? 0 : .012, rd: p.silver ? .0012 : .012, top: p.cork ? .0006 : .03 });
  const refill = S => { S.Tf = S.p.fill === 'hot' ? 90 : 5; S.tm = 0; S.hF = []; S.hC = []; S.Tc = S.Tf; };
  const swX = (g) => Math.min(g.fx + g.fw / 2 + 110, g.w - 92);
  X7({ id: 'g7_radiation', ch: 14, sec: 'الدرس 2', page: 67, kind: 'استكشاف', title: 'الإشعاع الحراري وقنينة الترموس',
    desc: 'كيف تصلك حرارة المدفأة الكهربائية وحرارة الشمس عبر الفراغ؟ بالإشعاع: موجات كهرومغناطيسية لا تحتاج إلى وسط. ثم نفحص قنينة الترموس: كيف يمنع الفراغ والطلاء الفضي والسدادة انتقال الحرارة؟',
    tags: 'إشعاع موجات كهرومغناطيسية أشعة تحت الحمراء فراغ شمس مدفأة ترموس',
    tools: ['مدفأة كهربائية', 'محرار', 'لوح من الكارتون', 'قنينة ترموس'],
    steps: ['شغّل المدفأة (اضغطها) واسحب المحرار مقترباً منها ومبتعداً عنها: متى تكون القراءة أكبر؟', 'اسحب لوح الكارتون بين المدفأة والمحرار: ماذا يحدث للإشعاع؟', 'فعّل «ناقوس مفرغ من الهواء»: الإشعاع يصل رغم عدم وجود هواء، أما الهواء الساخن (الحمل) فيتوقف.', 'بدّل إلى «الشمس والأرض» واسحب المحرار في الفضاء: حرارة الشمس تقطع نحو 150 مليون km من الفراغ بالإشعاع.', 'بدّل إلى «قنينة الترموس» واضغط الأزرار: الفراغ، الطلاء الفضي، السدادة. أي طرائق انتقال الحرارة تُمنع؟', 'راقب منحني درجة حرارة الشاي مع الزمن وقارنه بكأس عادية، ثم جرّب «عصير بارد».'],
    concl: ['الإشعاع: انتقال الطاقة على شكل موجات كهرومغناطيسية كالضوء المرئي أو الأشعة تحت الحمراء.', 'يمكن للإشعاع الحراري أن ينتقل في الفراغ وعبر المواد الشفافة، بعكس التوصيل والحمل.', 'تصلنا حرارة الشمس بالإشعاع لخلو الفضاء بين الشمس والأرض من الهواء.', 'قنينة الترموس: الفراغ بين جداريها يمنع التوصيل والحمل، والطلاء الفضي يعكس الإشعاع، والسدادة تمنع الحمل من الأعلى؛ فيبقى ما فيها محافظاً على درجة حرارته ساعات عدة.'],
    laws: ['g7_heat'],
    fact: ['الغلاف الجوي يحبس جزءاً من الطاقة الحرارية بسبب غازات مثل بخار الماء وثنائي أوكسيد الكاربون، فيحافظ على دفء الأرض؛ وارتفاع نسبتها يسبب الاحتباس الحراري (ص 68).', 'تبعد الشمس عن الأرض نحو 150 مليون كيلومتر، وضوؤها وحرارتها يصلاننا في نحو 8 دقائق.', 'قنينة الترموس تحفظ المشروبات الباردة باردة أيضاً، لأنها تمنع دخول الحرارة إليها.'],
    controls: [SEL('mode', 'المشهد', [['heater', 'المدفأة'], ['sun', 'الشمس والأرض'], ['thermos', 'قنينة الترموس']], 'heater', (v, S) => { if (v === 'thermos') refill(S); }),
      SEL('fill', 'في داخل الترموس', [['hot', 'شاي ساخن'], ['cold', 'عصير بارد']], 'hot', (v, S) => refill(S)),
      TG('vac', 'الفراغ بين جداري القنينة', true, null, 'dot'), TG('silver', 'الطلاء الفضي (يعكس الإشعاع)', true, null, 'light'), TG('cork', 'السدادة', true, null, 'core'),
      TG('rays', 'أسهم الإشعاع', true, null, 'ray'), TG('other', 'أسهم التوصيل والحمل', true, null, 'heat'), TG('jar', 'ناقوس مفرغ من الهواء (المدفأة)', false, null, 'eye'), TG('cmp', 'منحني كأس عادية للمقارنة', true, null, 'graph'), TG('lbl', 'الأسماء', true, null, 'labels'),
      BT('', [{ t: 'املأ الترموس من جديد', on: refill }])],
    setup(S) { S.W = S.W || 800; S.H = S.H || 700; S.on = true; S.px = null; S.shX = null; S.sun = true; S.spx = null; S.spy = null; refill(S); },
    update(S, dt) {
      const p = S.p; if (p.mode !== 'thermos') return;
      const k = kRoutes(p), kt = k.cd + k.cv + k.rd + k.top, f = 5; // 1 s = 5 min
      S.tm += dt * f; S.Tf = 25 + (S.Tf - 25) * Math.exp(-kt * dt * f); S.Tc = 25 + (S.Tc - 25) * Math.exp(-.06 * dt * f);
      if (!S.hF.length || S.tm / 60 - S.hF[S.hF.length - 1][0] > .05) { S.hF.push([S.tm / 60, S.Tf]); S.hC.push([S.tm / 60, S.Tc]); if (S.hF.length > 600) { S.hF.shift(); S.hC.shift(); } }
    },
    draw(ctx, w, h, S) { const p = S.p; if (p.mode === 'sun') return drawSun(ctx, w, h, S); if (p.mode === 'thermos') return drawFlask(ctx, w, h, S); drawHeater(ctx, w, h, S); },
    drags(S) {
      const p = S.p;
      if (p.mode === 'thermos') { const g = geoT(S); const bx = swX(g); const cy = g.ft + (p.cork ? 0 : -70);
        return [['vac', 'الفراغ'], ['silver', 'الطلاء الفضي'], ['cork', 'السدادة']].map(([k, n], i) => ({ id: 'sw_' + k, x: bx, y: g.ft + 40 + i * 44, w: 150, h: 34, hint: i === 0, idle: i === 0 ? 'اضغط لإزالة الفراغ ✋' : undefined, tip: 'اضغط لإضافة أو إزالة ' + n, click: S => setParam(S, k, !S.p[k]) }))
          .concat([{ id: 'stopper', x: g.fx, y: cy + 8, w: g.fw * .45, h: 44, axis: 'y', hint: false, tip: 'اسحب السدادة لأعلى لنزعها أو لأسفل لإغلاق القنينة', drag: (S, d) => { const dy = d.y - d.sy; if (dy < -20 && S.p.cork) setParam(S, 'cork', false); if (dy > 20 && !S.p.cork) setParam(S, 'cork', true); } }]); }
      if (p.mode === 'sun') { const w = S.W, h = S.H; const sx = w * .2 + 30, sy = h * .42; return [{ id: 'sun', x: sx, y: sy, r: 60, hint: false, tip: 'اضغط لإطفاء أو تشغيل الشمس (تجربة خيالية!)', click: S => { S.sun = !S.sun; } },
        { id: 'probe', x: S.spx ?? w * .5, y: S.spy ?? h * .64, r: 22, axis: 'xy', idle: 'اسحب المحرار في الفضاء ✋', tip: 'اسحب المحرار في الفضاء (جرّب ظل الأرض)', drag: (S, d) => { S.spx = clamp(d.ox + d.x - d.sx, 80, S.W - 20); S.spy = clamp(d.oy + d.y - d.sy, 40, S.H - 80); } }]; }
      const g = geoH(S); const px = S.px ?? g.w * .62, shx = S.shX ?? g.w - 60;
      return [{ id: 'heater', x: g.hx - 10, y: g.hy, w: 100 * g.sc, h: 150 * g.sc, hint: false, tip: 'اضغط لتشغيل أو إطفاء المدفأة', click: S => { S.on = !S.on; } },
        { id: 'probe', x: px, y: g.by - 70 * g.sc, w: 44, h: 150 * g.sc, axis: 'x', idle: 'اسحب المحرار نحو المدفأة ✋', tip: 'اسحب المحرار مقترباً من المدفأة أو مبتعداً عنها', drag: (S, d) => { S.px = clamp(d.ox + d.x - d.sx, g.hx + 90 * g.sc, S.W - 40); } },
        { id: 'shield', x: shx, y: g.by - 85 * g.sc, w: 36, h: 170 * g.sc, axis: 'x', hint: false, tip: 'اسحب لوح الكارتون بين المدفأة والمحرار', drag: (S, d) => { S.shX = clamp(d.ox + d.x - d.sx, g.hx + 80 * g.sc, S.W - 30); } }];
    },
    readings(S) {
      const p = S.p;
      if (p.mode === 'thermos') { const k = kRoutes(p); return [rd('الزمن', Math.floor(S.tm / 60) + ' ساعة و ' + Math.round(S.tm % 60) + ' دقيقة'), rd(p.fill === 'hot' ? 'درجة حرارة الشاي' : 'درجة حرارة العصير', C4.T(S.Tf)), rd('في كأس عادية', C4.T(S.Tc)), rd('التوصيل والحمل عبر الجدار', p.vac ? 'ممنوعان (فراغ)' : 'يحدثان (هواء)'), rd('الإشعاع', p.silver ? 'يُعكس (طلاء فضي)' : 'ينفذ'), rd('من الأعلى', p.cork ? 'السدادة تمنع الحمل' : 'حمل وتبخر من الفوهة'), rd('سرعة فقدان الحرارة', Math.round((k.cd + k.cv + k.rd + k.top) * 1000) / 10 + ' ٪ من الفرق كل دقيقة', 1)]; }
      if (p.mode === 'sun') return [rd('المسافة بين الشمس والأرض', '≈ 150 مليون km'), rd('الوسط بينهما', 'فراغ (لا هواء)'), rd('طريقة انتقال الحرارة', 'الإشعاع فقط', 1), rd('قراءة المحرار في الفضاء', C4.T(S.Ts ?? 120))];
      return [rd('المدفأة', S.on ? 'تعمل' : 'مطفأة'), rd('قراءة المحرار', C4.T(S.Th ?? 25)), rd('لوح الكارتون', blocked(S) ? 'يحجب الإشعاع' : 'ليس بينهما'), rd('الناقوس', p.jar ? 'مفرغ من الهواء — الإشعاع يصل' : 'لا يوجد', 1)];
    },
    record(S) { const p = S.p; if (p.mode === 'thermos') return { a: Math.round(S.tm) + ' min', b: C4.T(S.Tf), c: (p.vac ? 'فراغ' : 'هواء') + '، ' + (p.silver ? 'فضي' : 'بلا طلاء') + '، ' + (p.cork ? 'مغلقة' : 'مفتوحة') }; if (p.mode === 'sun') return { a: 'الفضاء', b: C4.T(S.Ts ?? 120), c: S.sun ? 'الشمس تعمل' : 'الشمس مطفأة' }; const g = geoH(S); return { a: Math.round(((S.px ?? g.w * .62) - g.hx) / (100 * g.sc) * 10) / 10 + ' (وحدة)', b: C4.T(S.Th ?? 25), c: blocked(S) ? 'خلف اللوح' : 'مباشرة' }; },
    cols: [['a', 'الزمن / البعد'], ['b', 'درجة الحرارة'], ['c', 'الحالة']],
    live: { title: 'درجة الحرارة داخل الترموس مع الزمن', data: S => ({ series: [{ pts: S.hF || [], color: '#dc2626', name: 'الترموس' }].concat(S.p.cmp ? [{ pts: S.hC || [], color: '#94a3b8', name: 'كأس عادية' }] : []), opts: { xl: 'الزمن (ساعة)', ymin: 0, ymax: 100, y0zero: false } }) },
    explain(S) { const p = S.p; if (p.mode === 'thermos') return `الفراغ ${p.vac ? '<b>يمنع</b>' : 'غير موجود فلا يمنع'} التوصيل والحمل، والطلاء الفضي ${p.silver ? '<b>يعكس</b>' : 'غير موجود فلا يعكس'} الإشعاع، والسدادة ${p.cork ? '<b>تمنع</b>' : 'منزوعة فلا تمنع'} الحمل من الأعلى.`; if (p.mode === 'sun') return 'الفضاء بين الشمس والأرض <b>فراغ</b>، فلا يمكن أن تنتقل الحرارة بالتوصيل أو الحمل؛ تصلنا بـ<b>الإشعاع</b> (موجات كهرومغناطيسية).'; return 'سلك المدفأة الساخن يطلق <b>أشعة تحت الحمراء</b> تنتقل بخطوط مستقيمة وتصل إلى المحرار حتى بلا هواء. كلما اقتربت منها زادت الطاقة التي تصلك.'; },
    quiz: [
      { q: 'حرارة الشمس تصل الأرض بطريقة:', o: ['التوصيل', 'الإشعاع', 'الحمل'], a: 1, why: 'لخلو الفضاء بين الشمس والأرض من الهواء (مراجعة الفصل).' },
      { q: 'لماذا لا تصلنا حرارة الشمس بطريقتي التوصيل أو الحمل؟', o: ['لأن الشمس باردة', 'لأن الفضاء بين الشمس والأرض فراغ لا يوجد فيه هواء', 'لأن الغلاف الجوي يمنعهما'], a: 1, why: 'التوصيل والحمل يحتاجان إلى مادة، أما الإشعاع فينتقل في الفراغ (ص 67).' },
      { q: 'في قنينة الترموس، الفراغ بين الجدارين يمنع انتقال الحرارة بطريقتي:', o: ['التوصيل والحمل', 'الإشعاع فقط', 'الإشعاع والتوصيل'], a: 0, why: 'الفراغ خالٍ من الهواء فلا تنتقل فيه الحرارة بالتوصيل أو الحمل (ص 70).' }
    ]
  });
  function blocked(S) { const g = geoH(S); const px = S.px ?? g.w * .62, shx = S.shX ?? g.w - 60; return shx > g.hx + 40 && shx < px - 10; }
  function heaterT(S) { const g = geoH(S); const px = S.px ?? g.w * .62; if (!S.on || blocked(S)) return 25; const d = Math.max(40, px - g.hx) / (100 * g.sc); return 25 + 42 / (d * d); }
  function sunT(S) { const w = S.W, h = S.H; const x = S.spx ?? w * .5, y = S.spy ?? h * .64; const ex = w * .82, ey = h * .5, er = Math.min(w, h) * .12; const shadow = x > ex && Math.abs(y - ey) < er; if (!S.sun || shadow) return -150; return 120; }
  function drawHeater(ctx, w, h, S) {
    const g = geoH(S), p = S.p, t = S.t; K.bg(ctx, w, h, { benchY: g.by }); const sc = g.sc;
    const px = S.px ?? w * .62, py = g.by - 110 * sc, shx = S.shX ?? w - 60, bl = blocked(S), hx = g.hx, hy = g.hy;
    K.raw(ctx, () => { ctx.fillStyle = '#475569'; rr(ctx, hx - 40 * sc, g.by - 10, 80 * sc, 10, 3); ctx.fill(); ctx.fillStyle = '#64748b'; ctx.fillRect(hx - 5, hy + 60 * sc, 10, g.by - hy - 60 * sc);
      const rg = ctx.createLinearGradient(hx - 50 * sc, 0, hx + 30 * sc, 0); rg.addColorStop(0, '#94a3b8'); rg.addColorStop(1, '#f1f5f9'); ctx.fillStyle = rg; ctx.beginPath(); ctx.moveTo(hx - 30 * sc, hy - 70 * sc); ctx.quadraticCurveTo(hx - 70 * sc, hy, hx - 30 * sc, hy + 70 * sc); ctx.lineTo(hx + 20 * sc, hy + 60 * sc); ctx.lineTo(hx + 20 * sc, hy - 60 * sc); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.stroke();
      for (let k = 0; k < 2; k++) { const yy = hy - 22 * sc + k * 44 * sc; if (S.on) { ctx.fillStyle = 'rgba(251,146,60,.3)'; ctx.beginPath(); ctx.arc(hx - 12 * sc, yy - 6 * sc, 24 * sc, 0, TAU); ctx.fill(); } ctx.strokeStyle = S.on ? '#f97316' : '#78716c'; ctx.lineWidth = 7 * sc; ctx.beginPath(); ctx.moveTo(hx - 12 * sc, yy - 30 * sc); ctx.lineTo(hx - 12 * sc, yy + 18 * sc); ctx.stroke(); if (S.on) { ctx.strokeStyle = '#fde047'; ctx.lineWidth = 2.5; ctx.stroke(); } } });
    if (p.jar) K.raw(ctx, () => { ctx.fillStyle = 'rgba(224,242,254,.35)'; ctx.strokeStyle = '#0ea5e9'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(hx - 70 * sc, g.by); ctx.lineTo(hx - 70 * sc, hy - 70 * sc); ctx.quadraticCurveTo(hx - 70 * sc, hy - 110 * sc, hx, hy - 112 * sc); ctx.quadraticCurveTo(hx + 55 * sc, hy - 110 * sc, hx + 55 * sc, hy - 70 * sc); ctx.lineTo(hx + 55 * sc, g.by); ctx.fill(); ctx.stroke(); });
    if (p.lbl) { K.tag(ctx, S.on ? 'مدفأة كهربائية (اضغطها)' : 'مدفأة مطفأة — اضغطها', hx - 5, g.by + 22, { s: 12, bg: '#c2410c' }); if (p.jar) K.tag(ctx, 'ناقوس مفرغ من الهواء: فراغ', hx, hy - 126 * sc, { s: 11.5, bg: '#0369a1' }); }
    if (S.on && p.other && !p.jar) { K.raw(ctx, () => { ctx.strokeStyle = 'rgba(249,115,22,.55)'; ctx.lineWidth = 2.5; for (let k = 0; k < 3; k++) { const ph = (t * .5 + k / 3) % 1; ctx.beginPath(); for (let s = 0; s <= 1.001; s += .1) { const yy = hy - 70 * sc - ph * 60 - s * 40, xx = hx - 12 * sc + (k - 1) * 18 + Math.sin(s * 7 + t * 3 + k) * 5; s ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } }); if (p.lbl) K.tag(ctx, 'هواء ساخن يرتفع (حمل)', hx + 10, hy - 160 * sc, { s: 11, bg: '#ea580c' }); }
    if (S.on && p.rays) { const x2 = bl ? shx - 14 : px - 16; for (let k = 0; k < 4; k++) { const y1 = hy - 45 * sc + k * 30 * sc; C4.wave(ctx, hx + 26 * sc, y1, x2, y1 + (py - y1) * .3, t + k * .2, '#dc2626', 2.5, 5, 16); } if (p.lbl) K.tag(ctx, 'إشعاع حراري (أشعة تحت الحمراء)', (hx + x2) / 2 + 20, hy - 82 * sc, { s: 12, bg: '#dc2626' }); }
    K.raw(ctx, () => { ctx.fillStyle = '#d6b588'; rr(ctx, shx - 8, g.by - 170 * sc, 16, 170 * sc, 3); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.5; ctx.stroke(); });
    if (p.lbl) K.tag(ctx, 'لوح كارتون', shx, g.by + 22, { s: 11.5, bg: '#92400e' });
    const T = heaterT(S); S.Th = (S.Th ?? 25) + (T - (S.Th ?? 25)) * .05; C4.th(ctx, px, g.by - 16, 150 * sc, S.Th, 0, 100, { step: 20 });
    if (S.on && !bl) K.bubble(ctx, S.Th > 55 ? 'حار جداً! 🔥' : S.Th > 35 ? 'أشعر بالدفء' : 'دفء قليل', px, g.by - 150 * sc - 40, { s: 12 });
    if (bl && S.on) K.bubble(ctx, 'اللوح يحجب الإشعاع فلا يصل إلى المحرار', px, g.by - 150 * sc - 40, { s: 12.5 });
  }
  function drawSun(ctx, w, h, S) {
    const p = S.p, t = S.t; G.bg(ctx, w, h, false); const sx = w * .2 + 30, sy = h * .42, ex = w * .82, ey = h * .5, er = Math.min(w, h) * .12;
    K.raw(ctx, () => { ctx.fillStyle = '#0b1020'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#fff'; for (let k = 0; k < 80; k++) { const x = (k * 97.3) % w, y = (k * 53.7) % h; ctx.globalAlpha = .3 + (k % 5) / 8; ctx.fillRect(x, y, 1.6, 1.6); } ctx.globalAlpha = 1;
      if (S.sun) { const gr = ctx.createRadialGradient(sx, sy, 10, sx, sy, 110); gr.addColorStop(0, '#fff7ae'); gr.addColorStop(.45, '#fbbf24'); gr.addColorStop(.7, 'rgba(249,115,22,.5)'); gr.addColorStop(1, 'rgba(249,115,22,0)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(sx, sy, 110, 0, TAU); ctx.fill(); } else { ctx.fillStyle = '#44403c'; ctx.beginPath(); ctx.arc(sx, sy, 55, 0, TAU); ctx.fill(); }
      ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(ex, ey - er, w - ex, 2 * er);
      const eg = ctx.createRadialGradient(ex - er * .3, ey - er * .3, 4, ex, ey, er); eg.addColorStop(0, '#93c5fd'); eg.addColorStop(.6, '#2563eb'); eg.addColorStop(1, '#1e3a8a'); ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(ex, ey, er, 0, TAU); ctx.fill(); ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.ellipse(ex - er * .2, ey - er * .1, er * .35, er * .25, .5, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(ex + er * .3, ey + er * .35, er * .25, er * .18, -.3, 0, TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(125,211,252,.55)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(ex, ey, er + 7, 0, TAU); ctx.stroke();
      ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.beginPath(); ctx.arc(ex, ey, er, -Math.PI / 2, Math.PI / 2); ctx.fill(); });
    if (S.sun && p.rays) for (let k = 0; k < 5; k++) { const y = sy - 60 + k * 30, y2 = ey - er * .7 + k * er * .35; C4.wave(ctx, sx + 70, y, ex - er - 6, y2, t + k * .3, k % 2 ? '#fbbf24' : '#ef4444', 2.4, 5, 20); }
    G.text(ctx, 'فراغ — لا توجد مادة (لا توصيل ولا حمل)', (sx + ex) / 2, h * .12, { s: 14, w: 900, c: '#fff', bg: 'rgba(3,105,161,.8)', raw: 1 });
    K.raw(ctx, () => { ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.setLineDash([6, 6]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(sx, h * .78); ctx.lineTo(ex, h * .78); ctx.stroke(); ctx.setLineDash([]); });
    G.text(ctx, '≈ 150 مليون km', (sx + ex) / 2, h * .78 - 14, { s: 13, w: 800, c: '#e2e8f0', raw: 1 });
    if (p.lbl) { G.text(ctx, S.sun ? 'الشمس (اضغطها)' : 'الشمس مطفأة (تجربة خيالية)', sx, sy + 125, { s: 13, w: 800, c: '#fde68a', raw: 1 }); G.text(ctx, 'الأرض', ex, ey + er + 24, { s: 13, w: 800, c: '#bfdbfe', raw: 1 }); if (S.sun && p.rays) G.text(ctx, 'ضوء مرئي + أشعة تحت الحمراء', (sx + ex) / 2, sy - 86, { s: 12.5, w: 800, c: '#fecaca', raw: 1 }); G.text(ctx, 'الغلاف الجوي يحبس جزءاً من الحرارة', ex - 20, ey - er - 26, { s: 11.5, w: 800, c: '#7dd3fc', raw: 1 }); G.text(ctx, 'ظل الأرض', Math.min(w - 40, ex + er + 40), ey, { s: 11, w: 800, c: '#94a3b8', raw: 1 }); }
    const x = S.spx ?? w * .5, y = S.spy ?? h * .64, T = sunT(S); S.Ts = (S.Ts ?? T) + (T - (S.Ts ?? T)) * .05;
    K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; rr(ctx, x - 16, y - 20, 32, 40, 8); ctx.fill(); ctx.fillStyle = '#0f172a'; rr(ctx, x - 12, y - 14, 24, 14, 3); ctx.fill(); ctx.fillStyle = '#94a3b8'; ctx.fillRect(x - 2, y + 20, 4, 14); });
    G.text(ctx, 'محرار: ' + C4.T(S.Ts), x, y - 34, { s: 12.5, w: 900, c: '#0f172a', bg: S.Ts > 0 ? '#fed7aa' : '#bfdbfe', raw: 1 });
  }
  function drawFlask(ctx, w, h, S) {
    const g = geoT(S), p = S.p, t = S.t; K.bg(ctx, w, h, { benchY: g.fb }); const { fx, fw, fb, ft } = g; const hot = p.fill === 'hot';
    const o1 = fw / 2, o2 = fw * .42, i1 = fw * .34, bt = fb - 14, neckW = fw * .2, shoulder = ft + 70;
    const bottle = (hw, inset) => { ctx.beginPath(); ctx.moveTo(fx - neckW - inset * .4, ft + 18 + inset * .3); ctx.lineTo(fx - neckW - inset * .4, shoulder - 20); ctx.quadraticCurveTo(fx - hw, shoulder - 10, fx - hw, shoulder + 30); ctx.lineTo(fx - hw, bt - 30 - inset); ctx.quadraticCurveTo(fx - hw, bt - inset, fx - hw + 30, bt - inset); ctx.lineTo(fx + hw - 30, bt - inset); ctx.quadraticCurveTo(fx + hw, bt - inset, fx + hw, bt - 30 - inset); ctx.lineTo(fx + hw, shoulder + 30); ctx.quadraticCurveTo(fx + hw, shoulder - 10, fx + neckW + inset * .4, shoulder - 20); ctx.lineTo(fx + neckW + inset * .4, ft + 18 + inset * .3); };
    const wall = () => { ctx.strokeStyle = p.silver ? '#94a3b8' : '#7dd3fc'; ctx.lineWidth = p.silver ? 5 : 2.5; ctx.stroke(); if (p.silver) { ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 1.5; ctx.stroke(); } };
    K.raw(ctx, () => {
      const cg = ctx.createLinearGradient(fx - o1, 0, fx + o1, 0); cg.addColorStop(0, '#9f1239'); cg.addColorStop(.3, '#fb7185'); cg.addColorStop(1, '#881337'); ctx.fillStyle = cg; rr(ctx, fx - o1, shoulder - 40, 2 * o1, fb - shoulder + 40, 24); ctx.fill();
      ctx.fillStyle = '#fff1f2'; rr(ctx, fx - o1 + 7, shoulder - 30, 2 * o1 - 14, fb - shoulder + 22, 18); ctx.fill();
      bottle(o2, 0); ctx.closePath(); ctx.fillStyle = p.vac ? '#f8fafc' : '#dbeafe'; ctx.fill(); wall();
      if (!p.vac) { ctx.fillStyle = '#3b82f6'; for (let k = 0; k < 44; k++) { const side = k % 2 ? 1 : -1, ph = (t * .15 + k * .137) % 1; const span = bt - shoulder - 90; const yy = side < 0 ? bt - 40 - ph * span : shoulder + 40 + ph * span; const xx = fx + side * ((o2 + i1) / 2 + 12) * (k % 4 < 2 ? 1 : .96); ctx.beginPath(); ctx.arc(xx + Math.sin(k * 3 + t * 5) * 2, yy, 2.2, 0, TAU); ctx.fill(); } }
      bottle(i1, 12); ctx.closePath(); const lg = ctx.createLinearGradient(0, shoulder, 0, bt); lg.addColorStop(0, hot ? '#c2410c' : '#fdba74'); lg.addColorStop(1, hot ? '#7c2d12' : '#f97316'); ctx.fillStyle = lg; ctx.fill(); wall();
      if (!hot) [[-.3, .5], [.1, .62], [.25, .42]].forEach(([dx, dy]) => { ctx.fillStyle = 'rgba(240,249,255,.9)'; ctx.fillRect(fx + dx * i1 * 2 - 9, shoulder + dy * (bt - shoulder) - 9, 18, 18); });
      const cy = ft + (p.cork ? 0 : -70); ctx.fillStyle = '#d6a36a'; rr(ctx, fx - neckW + 2, cy + 4, 2 * neckW - 4, 40, 6); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillStyle = '#9f1239'; rr(ctx, fx - neckW - 10, cy - 14, 2 * neckW + 20, 22, 8); ctx.fill();
    });
    if (hot && !p.cork) C4.steam(ctx, fx, ft + 16, t, 1);
    const midY = (shoulder + bt) / 2;
    const block = (x, y) => K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, y, 11, 0, TAU); ctx.fill(); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.arc(x, y, 11, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 7, y + 7); ctx.lineTo(x + 7, y - 7); ctx.stroke(); });
    if (p.other) {
      [midY - 60, midY + 50].forEach(y => { const a = fx - i1 + 10, b = fx - o1 - 36; if (p.vac) { C4.heat(ctx, hot ? a : fx - o2 - 30, y, hot ? fx - i1 - 8 : fx - o2 + 4, y, 4, t, '#f97316'); block(fx - (o2 + i1) / 2, y); } else C4.heat(ctx, hot ? a : b, y, hot ? b : a, y, 4, t, '#f97316'); });
      if (!p.cork) { if (hot) { C4.heat(ctx, fx - 8, ft + 40, fx - 26, ft - 40, 4, t, '#0ea5e9'); } else C4.heat(ctx, fx + 26, ft - 40, fx + 8, ft + 40, 4, t, '#0ea5e9'); } else block(fx, ft - 26);
    }
    if (p.rays) { const y = midY - 10; if (p.silver) { C4.wave(ctx, fx + i1 * .1, y, fx + i1 - 6, y, t, '#dc2626', 2.4, 4, 14); C4.wave(ctx, fx + i1 - 6, y + 26, fx + i1 * .1, y + 26, t, '#dc2626', 2.4, 4, 14); if (p.lbl) G.text(ctx, 'ينعكس', fx + i1 * .5, y + 48, { s: 11, w: 800, c: '#fff', bg: '#dc2626', raw: 1 }); }
      else { const a = hot ? fx + i1 * .1 : fx + o1 + 60, b = hot ? fx + o1 + 60 : fx + i1 * .1; C4.wave(ctx, a, y, b, y, t, '#dc2626', 2.4, 4, 14); } }
    const bx = swX(g);
    [['vac', 'الفراغ'], ['silver', 'الطلاء الفضي'], ['cork', 'السدادة']].forEach(([k, n], i) => C4.btn(ctx, (p[k] ? '✔ ' : '✘ ') + n, bx, ft + 40 + i * 44, 150, 34, { on: p[k], s: 13, bg: '#fee2e2', bd: p[k] ? undefined : '#dc2626' }));
    const ly = ft + 196; C4.card(ctx, bx - 88, ly - 14, 176, 104, '#94a3b8');
    G.text(ctx, 'طرائق انتقال الحرارة', bx, ly - 14, { s: 12, w: 900, c: '#334155', bg: '#fff', raw: 1 });
    [['التوصيل', !p.vac, '#f97316'], ['الحمل', !p.vac || !p.cork, '#0ea5e9'], ['الإشعاع', !p.silver, '#dc2626']].forEach(([n, ok, c], i) => { G.text(ctx, n, bx + 76, ly + 14 + i * 28, { s: 13, w: 900, c, a: 'right', raw: 1 }); G.text(ctx, ok ? 'تنتقل ✘' : 'ممنوعة ✔', bx - 78, ly + 14 + i * 28, { s: 12.5, w: 800, c: ok ? '#b91c1c' : '#15803d', a: 'left', raw: 1 }); });
    G.text(ctx, (hot ? 'الشاي: ' : 'العصير: ') + C4.T(S.Tf), fx, midY + 20, { s: 16, w: 900, c: '#fff', bg: 'rgba(15,23,42,.75)', raw: 1 });
    if (p.lbl) { K.tag(ctx, p.vac ? 'فراغ بين الجدارين' : 'هواء بين الجدارين', fx, shoulder - 52, { s: 11.5, bg: '#0369a1' }); K.tag(ctx, 'قنينة الترموس', fx, fb + 18, { s: 12, bg: '#9f1239' }); }
    const gx = bx - 100, gy = ly + 104, gw = Math.min(220, w - gx - 10), gh = Math.min(128, h - gy - 80);
    if (gh > 80) C4.plot(ctx, gx, gy, gw, gh, [{ pts: S.hF, col: '#dc2626' }].concat(p.cmp ? [{ pts: S.hC, col: '#94a3b8' }] : []), { xmax: Math.max(2, Math.ceil((S.tm / 60 + .01) / 2) * 2), ymin: 0, ymax: 100, title: p.cmp ? 'الترموس (أحمر) / كأس عادية (رمادي)' : 'درجة الحرارة في الترموس', xl: 'ساعة' });
    C4.clock(ctx, 150, 40, S.tm, 'الزمن (ساعة:دقيقة)');
  }
}

/* =====================================================================
   7) نسيم البحر ونسيم البر (ص 68)
   ===================================================================== */
{
  const TL = hr => 25 + 11 * Math.sin(Math.PI * (hr - 9) / 12), TS = hr => 25 + 1.5 * Math.sin(Math.PI * (hr - 11) / 12);
  const geo = S => { const w = S.W, h = S.H, gy = h * .7, x0 = 64, W = w - 64 - 6, top = 20; const xc = x0 + W * .5; const R = Math.min(W * .44, (gy - top) * .82); return { w, h, gy, x0, W, top, H: gy - top, xc, cx: x0 + W / 2, cy: gy - 20, R }; };
  const bodyPos = (S, g) => { const hr = S.hr, day = hr >= 6 && hr < 18; const f = day ? (hr - 6) / 12 : (((hr - 18) % 24 + 24) % 24) / 12; const a = Math.PI * (1 - f); return { day, x: g.cx + Math.cos(a) * g.R, y: g.cy - Math.sin(a) * g.R * .9 }; };
  const initAir = S => { const g = geo(S); S.air = Array.from({ length: 130 }, () => ({ x: g.x0 + Math.random() * g.W, y: g.top + 30 + Math.random() * (g.H - 40), T: 24 })); };
  X7({ id: 'g7_breeze', ch: 14, sec: 'الدرس 2', page: 68, kind: 'استكشاف', title: 'نسيم البحر ونسيم البر',
    desc: 'في النهار تسخن اليابسة أسرع من ماء البحر فيرتفع الهواء الساخن فوقها ويهب الهواء البارد من البحر إلى اليابسة (نسيم البحر). وفي الليل تبرد اليابسة أسرع فيهب الهواء من اليابسة إلى البحر (نسيم البر).',
    tags: 'نسيم البحر نسيم البر تيارات الحمل هواء ساحل نهار ليل',
    tools: ['نموذج ساحل: يابسة وبحر', 'محراران فوق اليابسة والبحر'],
    steps: ['اسحب الشمس عبر السماء (أو غيّر «الساعة») لتختار وقتاً من النهار.', 'قارن قراءتي المحرارين فوق اليابسة وفوق البحر: أيهما أسخن نهاراً؟', 'فعّل «جزيئات الهواء» و«أسهم تيار الحمل»: أين يرتفع الهواء الساخن؟ ومن أين يأتي الهواء البارد؟', 'اسحب القمر لتنتقل إلى الليل وراقب انعكاس اتجاه النسيم (العلم على الشاطئ).', 'فعّل «دوران الوقت تلقائياً» وتابع منحني درجتي حرارة اليابسة والبحر خلال 24 ساعة.'],
    concl: ['نهاراً: أشعة الشمس ترفع درجة حرارة اليابسة أكثر من سطح الماء، فيسخن الهواء الملامس لها ويرتفع، ويتحرك الهواء البارد فوق البحر نحو اليابسة ليحل محله: نسيم البحر (يحدث نهاراً).', 'ليلاً: تبرد اليابسة أسرع من ماء البحر، فيرتفع الهواء الدافئ فوق البحر ويتحرك الهواء من اليابسة نحو البحر: نسيم البر (يحدث ليلاً).', 'نسيم البر والبحر مثالان على تيارات الحمل في الهواء.'],
    laws: ['g7_heat'],
    fact: ['نسيم البحر هواء منعش يلطف حرارة المدن الساحلية في أيام الصيف.', 'تؤدي تيارات الحمل دوراً مهماً في الطقس: فهي السبب الرئيس لحركة الرياح والأعاصير (ص 70).', 'كان الصيادون قديماً يخرجون بقواربهم الشراعية ليلاً مع نسيم البر ويعودون نهاراً مع نسيم البحر.'],
    controls: [R('hour', 'الساعة', 0, 23.5, 14, .5, 'h', (v, S) => { S.hr = v; }),
      TG('run', 'دوران الوقت تلقائياً', false, null, 'stopwatch'), TG('air', 'جزيئات الهواء', true, null, 'dot'), TG('arrows', 'أسهم تيار الحمل (النسيم)', true, null, 'current'), TG('therm', 'المحراران', true, null, 'meter'), TG('rays', 'أشعة الشمس / الحرارة المنبعثة', true, null, 'ray'), TG('lbl', 'الأسماء', true, null, 'labels'),
      BT('', [{ t: 'نهار (الساعة 2 ظهراً)', on: S => { S.hr = 14; setParam(S, 'hour', 14, false); } }, { t: 'ليل (الساعة 2 ليلاً)', on: S => { S.hr = 2; setParam(S, 'hour', 2, false); } }])],
    setup(S) { S.W = S.W || 800; S.H = S.H || 700; S.hr = S.p.hour; initAir(S); },
    update(S, dt) {
      const p = S.p, g = geo(S); if (p.run) { S.hr = (S.hr + dt * .8) % 24; setParam(S, 'hour', Math.round(S.hr * 2) / 2 % 24, false); }
      const tl = TL(S.hr), ts = TS(S.hr), A = clamp((tl - ts) / 9, -1.2, 1.2); S.A = A;
      S.air.forEach(a => { const u = clamp((a.x - g.x0) / g.W, 0, 1), v = clamp((g.gy - a.y) / g.H, 0, 1); const vx = -A * Math.PI * Math.sin(Math.PI * u) * Math.cos(Math.PI * v), vy = A * Math.PI * Math.cos(Math.PI * u) * Math.sin(Math.PI * v);
        a.x += (vx * g.W * .03 + (Math.random() - .5) * 30) * dt; a.y -= (vy * g.H * .03 + (Math.random() - .5) * 30) * dt;
        if (a.x < g.x0 + 3) a.x = g.x0 + 3; if (a.x > g.x0 + g.W - 3) a.x = g.x0 + g.W - 3; if (a.y < g.top + 26) a.y = g.top + 26; if (a.y > g.gy - 6) a.y = g.gy - 6;
        const gT = a.x < g.xc ? tl : ts; if (v < .22) a.T += (gT - a.T) * 1.5 * dt; else a.T += (25 - 4 * v - a.T) * .25 * dt; });
    },
    draw(ctx, w, h, S) {
      const p = S.p, t = S.t, g = geo(S), hr = S.hr, tl = TL(hr), ts = TS(hr), A = S.A ?? clamp((tl - ts) / 9, -1.2, 1.2); G.bg(ctx, w, h, false);
      const alt = Math.sin(Math.PI * (hr - 6) / 12), k = clamp(alt * 2.5 + .45, 0, 1), B = bodyPos(S, g);
      K.raw(ctx, () => { const mix = (a, b) => { const c = C4._mix(a, b, k); return `rgb(${c[0]},${c[1]},${c[2]})`; }; const sg = ctx.createLinearGradient(0, 0, 0, g.gy); sg.addColorStop(0, mix([15, 23, 42], [56, 189, 248])); sg.addColorStop(1, mix([30, 58, 138], [224, 242, 254])); ctx.fillStyle = sg; ctx.fillRect(0, 0, w, g.gy + 4);
        if (k < .5) { ctx.fillStyle = '#fff'; for (let i = 0; i < 50; i++) { ctx.globalAlpha = (.5 - k) * 1.6 * (.4 + (i % 4) / 6); ctx.fillRect((i * 131.7) % w, (i * 71.3) % (g.gy * .7), 1.8, 1.8); } ctx.globalAlpha = 1; }
        if (B.day) { const gr = ctx.createRadialGradient(B.x, B.y, 4, B.x, B.y, 48); gr.addColorStop(0, '#fffbeb'); gr.addColorStop(.45, '#facc15'); gr.addColorStop(1, 'rgba(250,204,21,0)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(B.x, B.y, 48, 0, TAU); ctx.fill(); }
        else { ctx.fillStyle = '#f1f5f9'; ctx.beginPath(); ctx.arc(B.x, B.y, 22, 0, TAU); ctx.fill(); ctx.fillStyle = mix([15, 23, 42], [56, 189, 248]); ctx.beginPath(); ctx.arc(B.x + 10, B.y - 6, 20, 0, TAU); ctx.fill(); }
        // land
        ctx.fillStyle = '#e9c46a'; ctx.beginPath(); ctx.moveTo(0, g.gy); ctx.lineTo(g.xc - 10, g.gy); ctx.quadraticCurveTo(g.xc + 20, g.gy + 6, g.xc + 50, g.gy + 40); ctx.lineTo(g.xc + 70, h); ctx.lineTo(0, h); ctx.closePath(); ctx.fill();
        ctx.fillStyle = C4.tcol(tl, .35); ctx.fillRect(0, g.gy, g.xc, 12);
        ctx.fillStyle = '#a16207'; ctx.fillRect(0, g.gy + 40, g.xc + 30, h - g.gy - 40);
        // sea
        const wg = ctx.createLinearGradient(0, g.gy + 6, 0, h); wg.addColorStop(0, k > .5 ? '#0ea5e9' : '#1e40af'); wg.addColorStop(1, '#1e3a8a'); ctx.fillStyle = wg; ctx.beginPath(); ctx.moveTo(g.xc + 20, g.gy + 8); ctx.lineTo(w, g.gy + 8); ctx.lineTo(w, h); ctx.lineTo(g.xc + 75, h); ctx.quadraticCurveTo(g.xc + 50, g.gy + 30, g.xc + 20, g.gy + 8); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 2; for (let r = 0; r < 3; r++) { ctx.beginPath(); for (let x = g.xc + 60; x < w; x += 6) { const y = g.gy + 20 + r * 22 + Math.sin(x / 18 + t * 2 + r) * 3; x === g.xc + 60 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); }
        ctx.fillStyle = C4.tcol(ts, .3); ctx.fillRect(g.xc + 30, g.gy + 8, w - g.xc - 30, 10);
        // palm tree + house
        const px = g.x0 + g.W * .16, lean = -A * .12; ctx.strokeStyle = '#78350f'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px, g.gy); ctx.quadraticCurveTo(px + 8, g.gy - 60, px + 12 + lean * 60, g.gy - 120); ctx.stroke(); ctx.lineCap = 'butt';
        ctx.fillStyle = '#16a34a'; for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * .55 + lean; ctx.save(); ctx.translate(px + 12 + lean * 60, g.gy - 120); ctx.rotate(a); ctx.beginPath(); ctx.ellipse(28, 0, 30, 7, 0, 0, TAU); ctx.fill(); ctx.restore(); }
        const hx2 = g.x0 + g.W * .3; ctx.fillStyle = '#fef3c7'; ctx.fillRect(hx2, g.gy - 44, 60, 44); ctx.fillStyle = '#b91c1c'; ctx.beginPath(); ctx.moveTo(hx2 - 6, g.gy - 44); ctx.lineTo(hx2 + 30, g.gy - 70); ctx.lineTo(hx2 + 66, g.gy - 44); ctx.fill(); ctx.fillStyle = k > .5 ? '#7dd3fc' : '#fde047'; ctx.fillRect(hx2 + 10, g.gy - 32, 14, 14);
        // flag at the shore
        const fx = g.xc - 20; ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(fx, g.gy); ctx.lineTo(fx, g.gy - 96); ctx.stroke(); const dirF = -Math.sign(A) || 1, L = 40 * clamp(Math.abs(A) * 1.4, .25, 1); ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.moveTo(fx, g.gy - 96); for (let s = 0; s <= 1.001; s += .1) ctx.lineTo(fx + dirF * L * s, g.gy - 96 + 6 * s + Math.sin(s * 6 + t * 8) * 3 * s); for (let s = 1; s >= 0; s -= .1) ctx.lineTo(fx + dirF * L * s, g.gy - 72 - 6 * s + Math.sin(s * 6 + t * 8) * 3 * s); ctx.closePath(); ctx.fill();
      });
      // rays
      if (p.rays) { if (B.day && alt > .05) { [[g.x0 + g.W * .22, g.gy - 4], [g.x0 + g.W * .4, g.gy - 4], [g.x0 + g.W * .66, g.gy + 8], [g.x0 + g.W * .86, g.gy + 8]].forEach(([x, y], i) => C4.wave(ctx, B.x + (x - B.x) * .18, B.y + (y - B.y) * .18, x, y, t + i * .2, '#f59e0b', 2.2, 4, 18)); }
        else if (!B.day) { [[g.x0 + g.W * .2, 1], [g.x0 + g.W * .38, 1], [g.x0 + g.W * .78, .4]].forEach(([x, s], i) => C4.wave(ctx, x, g.gy - 6, x + 6, g.gy - 60 - 40 * s, t + i * .3, s > .5 ? '#f97316' : '#fdba74', 1.5 + s * 1.5, 4, 14)); } }
      // air particles
      if (p.air) S.air.forEach(a => K.ball(ctx, a.x, a.y, 4, C4.thex(a.T)));
      // circulation arrows
      if (p.arrows && Math.abs(A) > .12) { const s = Math.sign(A), wd = 2.5 + 3 * clamp(Math.abs(A), 0, 1), xl = g.x0 + g.W * .2, xr = g.x0 + g.W * .8, yLow = g.gy - 34, yHigh = g.top + g.H * .3;
        C4.heat(ctx, s > 0 ? xr - 30 : xl + 30, yLow, s > 0 ? xl + 60 : xr - 60, yLow, wd + 1, t, '#2563eb');
        C4.heat(ctx, s > 0 ? xl : xr, yLow - 30, s > 0 ? xl : xr, yHigh + 26, wd, t, '#ef4444');
        C4.heat(ctx, s > 0 ? xl + 40 : xr - 40, yHigh, s > 0 ? xr - 40 : xl + 40, yHigh, wd * .8, t, '#f59e0b');
        C4.heat(ctx, s > 0 ? xr : xl, yHigh + 26, s > 0 ? xr : xl, yLow - 30, wd * .8, t, '#60a5fa');
        if (p.lbl) { K.tag(ctx, 'هواء ساخن يرتفع', s > 0 ? xl : xr, yHigh + 50 + (g.gy - yHigh) * .25, { s: 12, bg: '#dc2626' }); K.tag(ctx, 'هواء بارد يهبط', s > 0 ? xr : xl, yHigh + 50 + (g.gy - yHigh) * .25, { s: 12, bg: '#1d4ed8' }); } }
      // thermometers
      if (p.therm) { C4.th(ctx, g.x0 + g.W * .08 + 20, g.gy - 16, 120, tl, 0, 50, { step: 10, s: 12, card: 1 }); C4.th(ctx, g.x0 + g.W * .9, g.gy - 4, 120, ts, 0, 50, { step: 10, s: 12, card: 1 }); }
      if (p.lbl) { K.tag(ctx, 'اليابسة', g.x0 + g.W * .26, g.gy + 26, { s: 13, bg: '#92400e' }); K.tag(ctx, 'البحر', g.x0 + g.W * .78, g.gy + 64, { s: 13, bg: '#1e40af' });
        const title = Math.abs(A) <= .12 ? 'هدوء: درجتا حرارة اليابسة والبحر متقاربتان' : A > 0 ? 'نسيم البحر (يحدث نهاراً): هواء بارد يهب من البحر إلى اليابسة' : 'نسيم البر (يحدث ليلاً): هواء بارد يهب من اليابسة إلى البحر';
        G.text(ctx, title, g.x0 + g.W / 2, g.gy + 110, { s: 14.5, w: 900, c: '#fff', bg: A > .12 ? '#0369a1' : A < -.12 ? '#7c3aed' : '#475569', raw: 1 }); }
      const hh = Math.floor(hr), mm = Math.round((hr - hh) * 60); G.text(ctx, (B.day ? '☀️ نهار  ' : '🌙 ليل  ') + String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0'), w - 90, 34, { s: 15, w: 900, c: '#0f172a', bg: 'rgba(255,255,255,.92)', raw: 1 });
      if (!S._touched) K.bubble(ctx, B.day ? 'اسحب الشمس عبر السماء ✋' : 'اسحب القمر ✋', B.x, B.y - 30, { s: 12.5 });
    },
    drags(S) { const g = geo(S), B = bodyPos(S, g); return [{ id: 'sky', x: B.x, y: B.y, r: 34, axis: 'xy', tip: B.day ? 'اسحب الشمس لتغيير وقت النهار' : 'اسحب القمر لتغيير وقت الليل', hint: false,
      drag: (S, d) => { const x = d.ox + d.x - d.sx, y = d.oy + d.y - d.sy; const a = clamp(Math.atan2((g.cy - y) / .9, x - g.cx), 0, Math.PI); const f = 1 - a / Math.PI; S.hr = B.day ? 6 + 12 * f : (18 + 12 * f) % 24; S.hr = Math.min(S.hr, 23.99); setParam(S, 'hour', Math.round(S.hr * 2) / 2 % 24, false); } },
      { id: 'daynight', x: S.W - 90, y: 34, w: 150, h: 34, hint: false, tip: 'اضغط للتبديل بين النهار والليل', click: S => { S.hr = (S.hr >= 6 && S.hr < 18) ? 2 : 14; setParam(S, 'hour', S.hr, false); } }]; },
    readings(S) { const tl = TL(S.hr), ts = TS(S.hr), A = (tl - ts) / 9; return [rd('الساعة', S.hr.toFixed(1) + ' h'), rd('حرارة اليابسة', C4.T(tl)), rd('حرارة سطح البحر', C4.T(ts)), rd('الأسخن', tl > ts ? 'اليابسة' : 'البحر'), rd('النسيم', Math.abs(A) <= .12 ? 'هدوء تقريباً' : A > 0 ? 'نسيم البحر: من البحر إلى اليابسة' : 'نسيم البر: من اليابسة إلى البحر', 1)]; },
    record(S) { return { h: S.hr.toFixed(1), L: +TL(S.hr).toFixed(1), Sea: +TS(S.hr).toFixed(1), b: TL(S.hr) > TS(S.hr) + 1 ? 'نسيم البحر' : TL(S.hr) < TS(S.hr) - 1 ? 'نسيم البر' : 'هدوء' }; },
    cols: [['h', 'الساعة'], ['L', 'اليابسة (°C)'], ['Sea', 'البحر (°C)'], ['b', 'النسيم']],
    aux(ctx, w, h, S) { const dk = App.isDark(); const px = 34, py = 18, pw = w - 48, ph = h - 44; K.raw(ctx, () => { ctx.strokeStyle = dk ? '#475569' : '#cbd5e1'; ctx.lineWidth = 1; ctx.strokeRect(px, py, pw, ph); ctx.fillStyle = dk ? 'rgba(30,41,59,.6)' : 'rgba(15,23,42,.06)'; ctx.fillRect(px, py, pw * 6 / 24, ph); ctx.fillRect(px + pw * 18 / 24, py, pw * 6 / 24, ph);
        const Y = T => py + ph * (1 - (T - 10) / 30); [[TL, '#dc2626'], [TS, '#2563eb']].forEach(([f, c]) => { ctx.strokeStyle = c; ctx.lineWidth = 2.5; ctx.beginPath(); for (let x = 0; x <= 24; x += .25) { const xx = px + pw * x / 24, yy = Y(f(x)); x ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); });
        const mx = px + pw * S.hr / 24; ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(mx, py); ctx.lineTo(mx, py + ph); ctx.stroke();
        ctx.fillStyle = dk ? '#cbd5e1' : '#475569'; ctx.font = '700 9px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.direction = 'ltr'; [0, 6, 12, 18, 24].forEach(x => ctx.fillText(String(x), px + pw * x / 24, py + ph + 11)); ctx.textAlign = 'right'; [10, 25, 40].forEach(T => ctx.fillText(T + '°', px - 3, Y(T) + 3)); });
      G.text(ctx, '■ اليابسة', w - 14, 9, { s: 10, w: 800, c: '#dc2626', a: 'right', raw: 1 }); G.text(ctx, '■ البحر', w - 80, 9, { s: 10, w: 800, c: '#2563eb', a: 'right', raw: 1 }); G.text(ctx, 'الساعة', px + 20, h - 6, { s: 10, w: 700, c: dk ? '#cbd5e1' : '#64748b', raw: 1 }); },
    auxTitle: 'درجة حرارة اليابسة والبحر خلال 24 ساعة',
    explain(S) { const tl = TL(S.hr), ts = TS(S.hr); if (Math.abs(tl - ts) < 1.1) return 'درجتا حرارة اليابسة والبحر متقاربتان الآن، لذا يكون الهواء هادئاً تقريباً.'; return tl > ts ? 'نهاراً: اليابسة تسخن <b>أسرع</b> من الماء، فيسخن الهواء فوقها وتقل كثافته فيرتفع، ويتحرك الهواء البارد من فوق البحر نحو اليابسة ليحل محله: <b>نسيم البحر</b>.' : 'ليلاً: اليابسة تبرد <b>أسرع</b> من ماء البحر، فيرتفع الهواء الدافئ فوق البحر ويتحرك الهواء البارد من اليابسة نحو البحر: <b>نسيم البر</b>.'; },
    quiz: [
      { q: 'نسيم البر يهب خلال:', o: ['النهار', 'الليل', 'الصيف فقط'], a: 1, why: 'في الليل تبرد اليابسة أسرع من ماء البحر (مراجعة الفصل).' },
      { q: 'تيار الهواء الذي يهب في الليل من الأرض الباردة إلى البحر الدافئ يسمى:', o: ['نسيم البحر', 'نسيم البر', 'نسيم الهواء'], a: 1, why: 'يسمى نسيم البر لأنه يهب من البر (اليابسة) نحو البحر.' },
      { q: 'لماذا يحدث نسيم البحر نهاراً؟', o: ['لأن الماء يسخن أسرع من اليابسة', 'لأن اليابسة تسخن أسرع فيرتفع الهواء فوقها ويحل محله هواء البحر البارد', 'لأن الرياح تأتي دائماً من البحر'], a: 1, why: 'أشعة الشمس ترفع حرارة اليابسة أكثر من سطح الماء (ص 68).' }
    ]
  });
}
