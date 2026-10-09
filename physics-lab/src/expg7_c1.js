'use strict';
/* ====================== الأول المتوسط — الفصل الأول: خواص المادة (بترتيب الكتاب) ====================== */
/* ---------- small shared helpers for chapter 1 (namespace C1) ---------- */
const C1 = {
  /* white rounded card; x = centre, y = top; lines = [str | [str, {s,w,c,mono}]] */
  card(ctx, x, y, w, lines, o = {}) {
    const lh = o.lh || 22, pad = o.pad ?? 12, hh = lines.length * lh + pad * 2 - 4 + (o.title ? lh : 0);
    K.raw(ctx, () => { ctx.fillStyle = o.bg || 'rgba(255,255,255,.95)'; rr(ctx, x - w / 2, y, w, hh, 14); ctx.fill(); ctx.strokeStyle = o.bd || '#7c3aed'; ctx.lineWidth = 2; ctx.stroke(); });
    let yy = y + pad + lh / 2 - 2;
    if (o.title) { G.text(ctx, o.title, x, yy, { s: 13, w: 900, c: o.bd || '#7c3aed', raw: 1 }); yy += lh; }
    lines.forEach(L => { const [t, q] = Array.isArray(L) ? L : [L, {}]; G.text(ctx, t, x, yy, { s: q.s || 13.5, w: q.w || 700, c: q.c || '#1e293b', mono: q.mono ?? (/^[A-Za-zρV0-9(]/.test(t) ? 1 : 0), raw: 1 }); yy += lh; });
    return hh;
  },
  /* on-canvas pill button */
  chip(ctx, x, y, w, h, label, on, col = '#2563eb', o = {}) {
    K.raw(ctx, () => { ctx.fillStyle = on ? col : 'rgba(255,255,255,.95)'; rr(ctx, x - w / 2, y - h / 2, w, h, h / 2); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.stroke(); });
    G.text(ctx, label, x, y + 1, { s: o.s || 12.5, w: 800, c: on ? '#fff' : col, raw: 1 });
  },
  /* seeded random */
  rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; },
  /* a friendly eye (for reading at eye level) looking to +x (or -x if flip) */
  eye(ctx, x, y, s = 1, flip = false) {
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(flip ? -s : s, s);
      ctx.fillStyle = '#fff'; ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-20, 0); ctx.quadraticCurveTo(0, -16, 20, 0); ctx.quadraticCurveTo(0, 16, -20, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.arc(6, 0, 7, 0, TAU); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(8, 0, 3.2, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(4, -3, 1.8, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.6; for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(k * 6, -10 + Math.abs(k)); ctx.lineTo(k * 7.5, -16 + Math.abs(k) * 1.5); ctx.stroke(); }
      ctx.restore(); });
  },
  /* bottle with liquid (for pouring). (x,yb) bottom centre, w,h, level 0..1, rotation ang (rad) around the bottom centre */
  bottle(ctx, x, yb, w, h, lev, col, label, ang = 0, o = {}) {
    K.raw(ctx, () => {
      ctx.save(); ctx.translate(x, yb); ctx.rotate(ang);
      const body = () => { ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.lineTo(-w / 2, -h * .62); ctx.quadraticCurveTo(-w / 2, -h * .78, -w * .18, -h * .84); ctx.lineTo(-w * .18, -h); ctx.lineTo(w * .18, -h); ctx.lineTo(w * .18, -h * .84); ctx.quadraticCurveTo(w / 2, -h * .78, w / 2, -h * .62); ctx.lineTo(w / 2, 0); ctx.closePath(); };
      body(); ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fill();
      if (lev > 0) { ctx.save(); body(); ctx.clip(); ctx.rotate(-ang); const ly = -h * .62 * lev * Math.cos(ang); ctx.globalAlpha = .85; ctx.fillStyle = col; ctx.fillRect(-w * 2, ly, w * 4, h * 2); ctx.restore(); }
      body(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.fillRect(-w / 2 + 4, -h * .6, 4, h * .52);
      if (o.cap !== false) { ctx.fillStyle = o.capCol || '#334155'; ctx.fillRect(-w * .2, -h - 6, w * .4, 7); }
      if (label) { ctx.fillStyle = 'rgba(255,255,255,.92)'; rr(ctx, -w / 2 + 3, -h * .45, w - 6, 22, 5); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.font = `800 ${o.ls || 11}px Tajawal,sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'rtl'; ctx.fillText(label, 0, -h * .45 + 11); ctx.textBaseline = 'alphabetic'; }
      ctx.restore();
    });
  },
  /* liquid stream from (x1,y1) down to (x2,y2) */
  stream(ctx, x1, y1, x2, y2, col, t, wd = 5) {
    K.raw(ctx, () => { ctx.strokeStyle = col; ctx.globalAlpha = .85; ctx.lineWidth = wd; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(x1 + (x2 - x1) * .2, y1 + (y2 - y1) * .3, x2 + Math.sin(t * 30) * 1.2, y2); ctx.stroke(); ctx.globalAlpha = 1; ctx.lineCap = 'butt';
      ctx.fillStyle = col; for (let k = 0; k < 3; k++) { const a = (t * 7 + k * .33) % 1; ctx.beginPath(); ctx.arc(x2 + Math.sin(k * 5 + t * 9) * 8, y2 - 4 - a * 6, 2, 0, TAU); ctx.fill(); } });
  },
  wrong() { if (window.Sound && Sound.beep) Sound.beep(180, .18, 'sawtooth', .05); },
  good() { if (window.Sound && Sound.ok) Sound.ok(); },
  /* drop-zone highlight shown while the student holds an object: pulsing green glow around the target (x,y = centre).
     hot = the object would snap here if released now */
  zone(ctx, x, y, w, h, hot, label, o = {}) {
    const t = performance.now() / 1000, pu = .5 + .5 * Math.sin(t * 6), col = o.c || '#16a34a';
    K.raw(ctx, () => { ctx.save(); ctx.shadowColor = col; ctx.shadowBlur = hot ? 26 : 12 + 8 * pu;
      ctx.fillStyle = hot ? 'rgba(34,197,94,.20)' : `rgba(34,197,94,${.06 + .06 * pu})`; rr(ctx, x - w / 2, y - h / 2, w, h, o.r ?? 16); ctx.fill();
      ctx.strokeStyle = col; ctx.lineWidth = hot ? 4 : 2.5; ctx.setLineDash(hot ? [] : [10, 7]); ctx.lineDashOffset = -t * 30; ctx.stroke(); ctx.setLineDash([]); ctx.restore(); });
    if (label !== false) K.tag(ctx, hot ? (o.hot || 'أفلت هنا ✓') : (label || 'ضعه هنا ⬇'), x, y - h / 2 - 16, { s: hot ? 13.5 : 12, bg: hot ? '#15803d' : 'rgba(22,101,52,.85)' });
  },
  /* smooth glide of a drawn position towards its rest position (real time, so it also settles while paused).
     o keeps _ax/_ay; when `now` is true the position is set directly (object under the finger) */
  ease(o, tx, ty, now, k = 16) {
    const T = performance.now() / 1000, dt = clamp(T - (o._et || T), 0, .1); o._et = T;
    if (now || o._ax == null || !isFinite(o._ax)) { o._ax = tx; o._ay = ty; }
    else { const f = 1 - Math.exp(-k * dt); o._ax += (tx - o._ax) * f; o._ay += (ty - o._ay) * f; if (Math.hypot(tx - o._ax, ty - o._ay) < .3) { o._ax = tx; o._ay = ty; } }
    return [o._ax, o._ay];
  },
  /* is any object being dragged right now (pointer moved after pointer-down)? */
  dragging(id) { const A = typeof Interact !== 'undefined' && Interact.act; return !!(A && (id == null || A.id === id || (id instanceof RegExp && id.test(A.id)))); }
};

/* ---------- نشاط استهلالي: حركة الجزيئات وعلاقتها بحالة المادة (ص 6) ---------- */
(() => {
  const NX = 9, NY = 6, N = NX * NY, BW = 18, BH = 12; // box inner size in marble radii
  const COLS = ['#38bdf8', '#22c55e', '#f97316', '#a855f7', '#ef4444', '#eab308', '#14b8a6', '#ec4899'];
  const stOf = n => n >= 50 ? 0 : n >= 16 ? 1 : 2; // صلب / سائل / غاز
  const ST = [{ n: 'صلب', c: '#2563eb', ic: '🧊', mv: 'الكرات لا تتحرك تقريباً — تهتز في مكانها فقط' }, { n: 'سائل', c: '#0891b2', ic: '💧', mv: 'الكرات تنزلق بجانب بعضها وتجري' }, { n: 'غاز', c: '#dc2626', ic: '💨', mv: 'الكرات تتطاير بسرعة في كل الاتجاهات' }];
  const D = {
    id: 'g7_particles', ch: 11, sec: 'نشاط استهلالي', page: 6, kind: 'نشاط', title: 'نشاط استهلالي: حركة الجزيئات وعلاقتها بحالة المادة',
    desc: 'صندوق خشبي مملوء بكرات زجاجية متشابهة الحجم: نحرّك الصندوق أفقياً ونلاحظ حركة الكرات، ثم نُخرج بعض الكرات ونكرر. الكرات تمثل جزيئات المادة.',
    tags: 'جزيئات حالات المادة صلب سائل غاز فراغات',
    tools: ['صندوق خشبي', 'كرات زجاجية متشابهة الحجم'],
    steps: ['الصندوق مملوء بالكرات الزجاجية دون أي فراغ بينها. اسحب الصندوق (من إطاره الخشبي أو أرضيته) يميناً ويساراً لتحريكه أفقياً. ماذا تلاحظ؟',
      'أخرج بعض الكرات: انقر على أي كرة (أو اسحبها خارج الصندوق) فتذهب إلى الوعاء — أو اضغط «أخرج بعض الكرات».',
      'حرّك الصندوق مرة أخرى بالطريقة نفسها. ماذا تلاحظ الآن؟',
      'أخرج عدداً أكبر من الكرات (اضغط «أخرج عدداً أكبر»)، ثم حرّك الصندوق. ماذا تلاحظ؟',
      'فعّل «سهم سرعة كل كرة» و«حالة المادة المشابهة». ما علاقة الفراغات بين الكرات بحركتها؟',
      'انقر على الوعاء لإعادة كرة إلى الصندوق.'],
    concl: ['كلما كانت الفراغات بين الكرات (الجزيئات) أصغر كانت حركتها أقل: تهتز في مكانها فقط ← تشبه الحالة الصلبة.', 'عندما تزداد الفراغات تنزلق الكرات بجانب بعضها ← تشبه الحالة السائلة التي تجري وتأخذ شكل الإناء.', 'عندما تكون الفراغات كبيرة جداً تتحرك الكرات بحرية وسرعة في الاتجاهات جميعها ← تشبه الحالة الغازية.', 'تختلف حالات المادة باختلاف المسافات البينية بين جزيئاتها وقوى التجاذب بينها.'],
    laws: [],
    fact: ['كل المواد تتكون من جسيمات صغيرة جداً تسمى الذرات أو الجزيئات — في قطرة ماء واحدة يوجد أكثر من مليار مليار جزيء!', 'جزيئات الهواء في غرفتك تتحرك بسرعة تقارب 500 متر في الثانية!', 'حتى في المادة الصلبة لا تتوقف الجزيئات عن الحركة؛ إنها تهتز حول مواضعها.'],
    controls: [
      BT('', [{ t: 'املأ الصندوق', on: S => D.fill(S, N) }, { t: 'أخرج بعض الكرات', on: S => D.fill(S, 36) }, { t: 'أخرج عدداً أكبر', on: S => D.fill(S, 8) }]),
      R('amp', 'شدة تحريك الصندوق', 0.5, 3, 1.6, .1, ''),
      TG('auto', 'تحريك الصندوق تلقائياً', false, null, 'wave'),
      TG('vel', 'سهم سرعة كل كرة', false, null, 'velocity'),
      TG('state', 'حالة المادة المشابهة', true, null, 'atom'),
      TG('gaps', 'مقياس الفراغات والحركة', true, null, 'meter'),
      SEL('pick', 'اختر الحالة مباشرة', [[0, '🧊 صلب'], [1, '💧 سائل'], [2, '💨 غاز']], 0, (v, S, init) => { if (!init && stOf(S.n) !== +v) D.setState(S, +v); }),
      TG('therm', 'حركة ذاتية للكرات حسب الحالة', true, null, 'heat')],
    NST: [N, 30, 8],
    setState(S, k) { D.fill(S, D.NST[k]); S.shake = k === 0 ? 1.2 : 0; const R = Math.random; S.m.forEach(q => { if (q.out) return; const a = R() * TAU, v = [0, 2.5, 9][k] * (.6 + .8 * R()); q.vx = Math.cos(a) * v; q.vy = Math.sin(a) * v; }); S.lastSt = k; S.stFlash = 2.6; S.lastPick = k; if (window.Sound) Sound.click(); },
    btnGeo(S) { const g = D.geo(S), bw = clamp(g.s * 4.4, 96, 132), gap = bw + 14; return [0, 1, 2].map(k => ({ k, x: g.cx + (1 - k) * gap, y: g.by + 34, w: bw, h: 46 })); },
    setup(S) { S.ox = 0; S.oy = 0; S.vx = 0; S.vy = 0; S.tx = 0; S.ty = 0; S.drag = false; S.hold = -1; S.moves = 0; S.flyers = []; S.shake = 0; S.lastSt = 0; S.spd = 0; D.fill(S, N); },
    fill(S, n) { const r = C1.rng(7); S.m = []; for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) S.m.push({ x: 1 + 2 * i, y: 1 + 2 * j, vx: 0, vy: 0, out: false, c: COLS[(i * 7 + j * 3) % COLS.length] });
      // remove marbles spread over the box
      const idx = S.m.map((_, k) => k).sort(() => r() - .5); for (let k = 0; k < N - n; k++) S.m[idx[k]].out = true;
      S.n = n; S.hold = -1; S.shake = 1.2; },
    geo(S) { const w = S.W, h = S.H; const by = h * .13; const aw = w - 70 - 200; const s = clamp(Math.min(aw * .86 / BW, h * .5 / BH), 12, 30); const cx = 70 + aw / 2 + 8, cy = h * .52; const rim = s * 1.4;
      return { w, h, by, s, cx, cy, rim, x0: cx - BW * s / 2 + S.ox * s, y0: cy - BH * s / 2 + S.oy * s, bowl: { x: w - 110, y: h * .8, r: clamp(s * 2.6, 44, 62) }, pan: { x: w - 110, y: h * .2 } }; },
    update(S, dt) {
      dt = Math.min(dt, 1 / 30); const p = S.p;
      if (p.auto) { const om = 11; S.tx = p.amp * Math.sin(S.t * om); S.ty = p.amp * .35 * Math.sin(S.t * om * .5 + 1); }
      else if (S.shake > 0) { S.shake -= dt; S.tx = S.shake > 0 ? p.amp * Math.sin(S.t * 12) : 0; }
      else if (!S.drag) { S.tx = 0; S.ty = 0; }
      const k = 700, c = 45; const ax = k * (S.tx - S.ox) - c * S.vx, ay = k * (S.ty - S.oy) - c * S.vy;
      S.vx += ax * dt; S.vy += ay * dt; S.ox += S.vx * dt; S.oy += S.vy * dt;
      const M = S.m.filter((q, i) => !q.out && i !== S.hold); const e = .88, sub = 4, h = dt / sub; const n = M.length;
      const damp = Math.exp(-(n > 40 ? 3 : n > 15 ? 1.2 : .35) * h);
      for (let s = 0; s < sub; s++) {
        M.forEach(q => { q.vx = (q.vx - ax * h) * damp; q.vy = (q.vy - ay * h) * damp; q.x += q.vx * h; q.y += q.vy * h; });
        for (let i = 0; i < n; i++) { const a = M[i]; for (let j = i + 1; j < n; j++) { const b = M[j]; const dx = b.x - a.x, dy = b.y - a.y; const d2 = dx * dx + dy * dy; if (d2 < 4 && d2 > 1e-9) { const d = Math.sqrt(d2), nx = dx / d, ny = dy / d, ov = (2 - d) / 2; a.x -= nx * ov; a.y -= ny * ov; b.x += nx * ov; b.y += ny * ov; const vn = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny; if (vn < 0) { const im = -(1 + e) * vn / 2; a.vx -= im * nx; a.vy -= im * ny; b.vx += im * nx; b.vy += im * ny; } } } }
        M.forEach(q => { if (q.x < 1) { q.x = 1; if (q.vx < 0) q.vx *= -.6; } if (q.x > BW - 1) { q.x = BW - 1; if (q.vx > 0) q.vx *= -.6; } if (q.y < 1) { q.y = 1; if (q.vy < 0) q.vy *= -.6; } if (q.y > BH - 1) { q.y = BH - 1; if (q.vy > 0) q.vy *= -.6; } });
      }
      if (p.therm !== false && n) { const st0 = stOf(S.n), sg = [0, .55, 1.1][st0] * Math.sqrt(dt * 60); if (sg) M.forEach(q => { q.vx += (Math.random() - .5) * 2 * sg; q.vy += (Math.random() - .5) * 2 * sg; }); if (st0 === 2) M.forEach(q => { const v = Math.hypot(q.vx, q.vy); if (v < 5) { const f = 5 / Math.max(v, .1); q.vx *= f; q.vy *= f; } }); }
      if (S.stFlash > 0) S.stFlash -= dt;
      const sp = n ? M.reduce((a, q) => a + Math.hypot(q.vx, q.vy), 0) / n : 0; S.spd += (sp - S.spd) * Math.min(1, dt * 4);
      S.flyers.forEach(f => f.t += dt * 2.6); S.flyers = S.flyers.filter(f => f.t < 1);
      S.n = S.m.filter(q => !q.out).length; const st = stOf(S.n); if (st !== S.lastSt) { S.lastSt = st; S.stFlash = 2.6; } if (+p.pick !== st) setParam(S, 'pick', st);
    },
    draw(ctx, w, h, S) {
      const p = S.p, g = D.geo(S), s = g.s; K.bg(ctx, w, h, { benchY: g.by });
      K.tag(ctx, 'منظر من الأعلى: صندوق خشبي على الطاولة', 70 + (w - 270) / 2 + 8, g.by - 18, { s: 12.5, bg: 'rgba(120,53,15,.85)' });
      // box: rim + floor
      K.raw(ctx, () => { const X = g.x0 - g.rim, Y = g.y0 - g.rim, W = BW * s + 2 * g.rim, H = BH * s + 2 * g.rim;
        ctx.fillStyle = 'rgba(60,30,10,.25)'; rr(ctx, X + 8, Y + 10, W, H, 10); ctx.fill();
        const wg = ctx.createLinearGradient(X, Y, X + W, Y + H); wg.addColorStop(0, '#e9b97f'); wg.addColorStop(1, '#b7793f'); ctx.fillStyle = wg; rr(ctx, X, Y, W, H, 10); ctx.fill(); ctx.strokeStyle = '#7c4a1e'; ctx.lineWidth = 2; ctx.stroke();
        ctx.strokeStyle = 'rgba(120,60,20,.3)'; ctx.lineWidth = 1; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(X + 4, Y + g.rim * k / 4); ctx.lineTo(X + W - 4, Y + g.rim * k / 4); ctx.moveTo(X + 4, Y + H - g.rim * k / 4); ctx.lineTo(X + W - 4, Y + H - g.rim * k / 4); ctx.stroke(); }
        const fg = ctx.createLinearGradient(0, g.y0, 0, g.y0 + BH * s); fg.addColorStop(0, '#f6dcb4'); fg.addColorStop(1, '#e8c28e'); ctx.fillStyle = fg; ctx.fillRect(g.x0, g.y0, BW * s, BH * s);
        ctx.strokeStyle = 'rgba(90,50,20,.5)'; ctx.lineWidth = 2; ctx.strokeRect(g.x0, g.y0, BW * s, BH * s);
        ctx.strokeStyle = 'rgba(150,90,40,.18)'; for (let k = 1; k < 8; k++) { ctx.beginPath(); ctx.moveTo(g.x0, g.y0 + BH * s * k / 8); ctx.bezierCurveTo(g.x0 + BW * s * .3, g.y0 + BH * s * k / 8 - 3, g.x0 + BW * s * .7, g.y0 + BH * s * k / 8 + 3, g.x0 + BW * s, g.y0 + BH * s * k / 8); ctx.stroke(); } });
      // marbles
      const mx = q => g.x0 + q.x * s, my = q => g.y0 + q.y * s;
      const st0 = stOf(S.n), jit = st0 === 0 && p.therm !== false ? s * .07 : 0;
      S.m.forEach((q, i) => { if (q.out || i === S.hold) return; D.marble(ctx, mx(q) + jit * Math.sin(S.t * 31 + i * 1.7), my(q) + jit * Math.cos(S.t * 27 + i * 2.3), s * .97, q.c); });
      // big state buttons: choose the state directly
      D.btnGeo(S).forEach(b => { const q = ST[b.k], on = b.k === st0; K.raw(ctx, () => { ctx.save(); if (on) { ctx.shadowColor = q.c; ctx.shadowBlur = 14 + (S.stFlash > 0 ? 10 * Math.abs(Math.sin(S.t * 8)) : 0); } ctx.fillStyle = on ? q.c : 'rgba(255,255,255,.96)'; rr(ctx, b.x - b.w / 2, b.y - b.h / 2, b.w, b.h, 14); ctx.fill(); ctx.restore(); ctx.strokeStyle = q.c; ctx.lineWidth = on ? 3 : 2; rr(ctx, b.x - b.w / 2, b.y - b.h / 2, b.w, b.h, 14); ctx.stroke(); });
        G.text(ctx, q.ic + ' ' + q.n, b.x, b.y + 1, { s: 17, w: 900, c: on ? '#fff' : q.c, raw: 1 }); });
      if (p.vel) S.m.forEach((q, i) => { if (q.out || i === S.hold) return; const v = Math.hypot(q.vx, q.vy); if (v > .4) K.raw(ctx, () => G.arrow(ctx, mx(q), my(q), mx(q) + q.vx * s * .18, my(q) + q.vy * s * .18, '#dc2626', 2.5, 8)); });
      // bowl for removed marbles
      const B = g.bowl; K.raw(ctx, () => { const bg = ctx.createRadialGradient(B.x - B.r * .3, B.y - B.r * .3, 4, B.x, B.y, B.r); bg.addColorStop(0, 'rgba(255,255,255,.9)'); bg.addColorStop(1, 'rgba(186,230,253,.7)'); ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(B.x, B.y, B.r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.stroke(); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(B.x, B.y, B.r - 7, 0, TAU); ctx.stroke(); });
      const outs = S.m.filter(q => q.out); const rb = Math.min(s * .55, B.r / 6.2); outs.forEach((q, k) => { const a = k * 2.4, rr0 = rb * 1.05 * Math.sqrt(k + .5) * 1.25; if (rr0 < B.r - rb - 6) D.marble(ctx, B.x + Math.cos(a) * rr0, B.y + Math.sin(a) * rr0, rb, q.c); });
      K.tag(ctx, `الوعاء: ${outs.length} كرة (انقر لإعادة كرة)`, B.x, B.y + B.r + 16, { s: 11.5, bg: 'rgba(30,41,59,.85)' });
      // flying marbles
      S.flyers.forEach(f => { const e = f.t * f.t * (3 - 2 * f.t); D.marble(ctx, lerp(f.x, B.x, e), lerp(f.y, B.y, e) - Math.sin(Math.PI * f.t) * 60, s * lerp(.97, .6, e), f.c); });
      // held marble
      if (S.hold >= 0) { const q = S.m[S.hold]; D.marble(ctx, S.hx, S.hy, s * 1.1, q.c); }
      // state panel
      const st = stOf(S.n);
      if (p.state) { const px = w - 110, pw = 176; let yy = g.by + 18; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.9)'; rr(ctx, px - pw / 2, yy - 6, pw, 3 * 92 + 34, 14); ctx.fill(); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.5; ctx.stroke(); });
        G.text(ctx, 'تشبه حالة المادة:', px, yy + 8, { s: 12.5, w: 900, c: '#334155', raw: 1 }); yy += 24;
        ST.forEach((q, k) => { const on = k === st; K.raw(ctx, () => { ctx.fillStyle = on ? q.c : '#f8fafc'; rr(ctx, px - pw / 2 + 8, yy, pw - 16, 84, 12); ctx.fill(); ctx.strokeStyle = on ? q.c : '#e2e8f0'; ctx.lineWidth = 2; ctx.stroke(); });
          G.text(ctx, q.ic + ' ' + q.n, px + 36, yy + 16, { s: 14, w: 900, c: on ? '#fff' : '#94a3b8', raw: 1 });
          D.mini(ctx, px - 42, yy + 46, k, S.t, on); yy += 92; }); }
      // meters
      if (p.gaps) { const mx0 = 84, my0 = h - 118; const gap = 1 - S.n / N; const mv = clamp(S.spd / 8, 0, 1);
        K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.93)'; rr(ctx, mx0, my0, 196, 76, 12); ctx.fill(); ctx.strokeStyle = '#cbd5e1'; ctx.stroke();
          [[gap, '#0ea5e9'], [mv, '#f97316']].forEach(([v, c], k) => { ctx.fillStyle = '#e2e8f0'; rr(ctx, mx0 + 12, my0 + 28 + k * 32, 120, 11, 5); ctx.fill(); ctx.fillStyle = c; rr(ctx, mx0 + 12, my0 + 28 + k * 32, Math.max(6, 120 * v), 11, 5); ctx.fill(); }); });
        G.text(ctx, 'الفراغات ' + Math.round(gap * 100) + '%', mx0 + 186, my0 + 18, { s: 12, w: 800, c: '#0369a1', a: 'right', raw: 1 });
        G.text(ctx, 'حركة الكرات', mx0 + 186, my0 + 50, { s: 12, w: 800, c: '#c2410c', a: 'right', raw: 1 });
        G.text(ctx, S.n + ' كرة', mx0 + 150, my0 + 34, { s: 11, w: 800, c: '#334155', a: 'left', raw: 1 }); }
      // mascot comment
      K.tag(ctx, 'الآن تشبه ' + ST[st].ic + ' ' + ST[st].n + ' — ' + ST[st].mv, g.cx, g.y0 + BH * s + g.rim + 20, { s: S.stFlash > 0 ? 14.5 : 13, bg: ST[st].c });
      if (Math.abs(S.vx) > 1.5 || p.auto) K.bubble(ctx, ST[st].mv, g.cx + BW * s * .2, g.y0 - g.rim - 6, { s: 12.5 });
      else if (!S._touched) { K.mascot(ctx, 120, g.by + 40, .75); }
      K.party(ctx, S);
    },
    marble(ctx, x, y, r, c) { K.ball(ctx, x, y, r, c); K.raw(ctx, () => { ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = Math.max(1, r * .16); ctx.beginPath(); ctx.arc(x + r * .1, y + r * .1, r * .5, 2.2, 4.2); ctx.stroke(); }); },
    /* mini molecular picture of a state (k: 0 solid, 1 liquid, 2 gas) */
    mini(ctx, x, y, k, t, on) { const c = on ? '#fff' : '#94a3b8'; K.raw(ctx, () => { ctx.strokeStyle = on ? 'rgba(255,255,255,.8)' : '#cbd5e1'; ctx.lineWidth = 1.5; ctx.strokeRect(x - 30, y - 26, 60, 52); });
      const r = 4.2; const R = C1.rng(3 + k);
      if (k === 0) { for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) K.ball(ctx, x - 22 + i * 11 + Math.sin(t * 20 + i + j * 3) * (on ? 1.2 : 0), y + 18 - j * 11 + Math.cos(t * 17 + i * 2 + j) * (on ? 1.2 : 0), r, on ? '#bfdbfe' : '#cbd5e1'); }
      else if (k === 1) { for (let i = 0; i < 14; i++) { const bx = x - 24 + R() * 48, byy = y + 20 - R() * 22; K.ball(ctx, bx + (on ? Math.sin(t * 3 + i) * 3 : 0), byy + (on ? Math.cos(t * 2.5 + i) * 1.5 : 0), r, on ? '#a5f3fc' : '#cbd5e1'); } }
      else { for (let i = 0; i < 6; i++) { const a = R() * TAU, sp = on ? 22 : 0; let bx = x - 25 + ((R() * 50 + Math.cos(a) * sp * t) % 50 + 50) % 50, byy = y - 21 + ((R() * 42 + Math.sin(a) * sp * t) % 42 + 42) % 42; K.ball(ctx, bx, byy, r, on ? '#fecaca' : '#cbd5e1'); } }
      void c; },
    drags(S) {
      const g = D.geo(S), s = g.s, L = [];
      L.push({ id: 'box', x: g.x0 + 90, y: g.y0 + BH * s + g.rim / 2, hit: (x, y) => x > g.x0 - g.rim && x < g.x0 + BW * s + g.rim && y > g.y0 - g.rim && y < g.y0 + BH * s + g.rim, axis: 'xy', tip: 'اسحب الصندوق يميناً ويساراً لتحريكه أفقياً', idle: 'حرّك الصندوق ✋',
        down: S => { S.drag = true; S.p.auto && setParam(S, 'auto', false); S.shake = 0; }, drag: (S, d) => { S.tx = clamp((d.x - d.sx) / s, -4, 4); S.ty = clamp((d.y - d.sy) / s, -2.5, 2.5); }, up: S => { S.drag = false; S.tx = 0; S.ty = 0; } });
      const vis = S.m.map((q, i) => [q, i]).filter(([q, i]) => !q.out && i !== S.hold); const rep = vis.length ? vis.reduce((a, b) => (b[0].y < a[0].y - .5 || (Math.abs(b[0].y - a[0].y) < .5 && b[0].x > a[0].x)) ? b : a) : null;
      const at = (x, y) => vis.find(([q]) => Math.hypot(g.x0 + q.x * s - x, g.y0 + q.y * s - y) < s * .95);
      if (vis.length) L.push({ id: 'marble', x: g.x0 + rep[0].x * s, y: g.y0 + rep[0].y * s, r: s, hint: false, hit: (x, y) => !!at(x, y) || S.hold >= 0, axis: 'xy', tip: 'انقر على الكرة لإخراجها، أو اسحبها خارج الصندوق',
        down: (S, x, y) => { const f = at(x, y); S._cand = f ? f[1] : -1; },
        drag: (S, d) => { if (S._cand >= 0 && S.hold < 0) { S.hold = S._cand; } if (S.hold >= 0) { S.hx = d.x; S.hy = d.y; } },
        click: S => { if (S._cand >= 0) D.remove(S, S._cand); },
        up: S => { if (S.hold < 0) return; const i = S.hold; S.hold = -1; S.moves++; const q = S.m[i]; const g2 = D.geo(S); const lx = (S.hx - g2.x0) / s, ly = (S.hy - g2.y0) / s;
          if (lx < 0 || lx > BW || ly < 0 || ly > BH) D.remove(S, i, S.hx, S.hy); else { q.x = clamp(lx, 1, BW - 1); q.y = clamp(ly, 1, BH - 1); q.vx = q.vy = 0; } } });
      L.push({ id: 'bowl', x: g.bowl.x, y: g.bowl.y, r: g.bowl.r, hint: false, tip: 'انقر لإعادة كرة إلى الصندوق', click: S => D.back(S) });
      D.btnGeo(S).forEach(b => L.push({ id: 'st' + b.k, x: b.x, y: b.y, w: b.w, h: b.h, hint: false, tip: 'اجعل الكرات تشبه حالة ' + ST[b.k].n + ' (' + D.NST[b.k] + ' كرة)', click: S => { D.setState(S, b.k); setParam(S, 'pick', b.k); } }));
      if (S.p.state) { const px = g.w - 110, pw = 176; ST.forEach((q, k) => L.push({ id: 'card' + k, x: px, y: g.by + 18 + 24 + k * 92 + 42, w: pw - 16, h: 84, hint: false, tip: 'انقر لاختيار حالة ' + q.n, click: S => { D.setState(S, k); setParam(S, 'pick', k); } })); }
      return L;
    },
    remove(S, i, x, y) { const g = D.geo(S), q = S.m[i]; if (q.out) return; q.out = true; q.vx = q.vy = 0; S.flyers.push({ x: x ?? g.x0 + q.x * g.s, y: y ?? g.y0 + q.y * g.s, c: q.c, t: 0 }); S.n = S.m.filter(z => !z.out).length; if (window.Sound) Sound.click();
      if (S.n === 15 && !S._g) { S._g = 1; K.cheer(S, g.cx, g.cy); } },
    back(S) { const q = S.m.find(z => z.out); if (!q) { Runner.toast('الوعاء فارغ', 'info'); return; } const M = S.m.filter(z => !z.out); for (let tr = 0; tr < 300; tr++) { const x = 1 + Math.random() * (BW - 2), y = 1 + Math.random() * (BH - 2); if (M.every(z => Math.hypot(z.x - x, z.y - y) >= 2)) { q.out = false; q.x = x; q.y = y; q.vx = q.vy = 0; S.n++; return; } } Runner.toast('لا يوجد فراغ كافٍ في الصندوق!', 'info'); },
    readings(S) { const st = stOf(S.n); return [rd('عدد الكرات في الصندوق', S.n + ' / ' + N), rd('الكرات في الوعاء', String(N - S.n)), rd('نسبة الفراغات', Math.round((1 - S.n / N) * 100) + ' %'), rd('حركة الكرات', S.spd < .6 ? 'ساكنة تقريباً' : S.spd < 3 ? 'بطيئة' : S.spd < 7 ? 'متوسطة' : 'سريعة'), rd('تشبه الحالة', ST[st].ic + ' ' + ST[st].n + ' — ' + ST[st].mv, 1)]; },
    record(S) { return { n: S.n, gap: Math.round((1 - S.n / N) * 100), mv: S.spd < .6 ? 'لا تتحرك تقريباً' : S.spd < 3 ? 'تنزلق ببطء' : 'تتطاير بسرعة', st: ST[stOf(S.n)].n }; },
    cols: [['n', 'عدد الكرات'], ['gap', 'الفراغات %'], ['mv', 'حركة الكرات'], ['st', 'تشبه الحالة']],
    explain(S) { const st = stOf(S.n); return [
      'الصندوق <b>ممتلئ</b> بالكرات ولا توجد فراغات بينها؛ عند تحريك الصندوق تتحرك الكرات معه ككتلة واحدة ولا تتحرك إحداها بالنسبة للأخرى — مثل جزيئات <b>المادة الصلبة</b> التي تهتز في مواضعها فقط.',
      'بعد إخراج بعض الكرات ظهرت <b>فراغات</b>، فأصبحت الكرات <b>تنزلق</b> بجانب بعضها وتجري نحو جهة الحركة — مثل جزيئات <b>السائل</b>.',
      'بقيت كرات قليلة وفراغات كبيرة جداً، فالكرات <b>تتطاير</b> وتصطدم بالجدران وتملأ الصندوق كله — مثل جزيئات <b>الغاز</b>.'][st]; },
    quiz: [
      { q: 'ماذا يحدث للمسافات البينية بين جزيئات الماء عند تحوله من جليد (صلب) إلى ماء سائل ثم إلى بخار (غاز)؟', o: ['تقل', 'تزداد', 'لا تتغير'], a: 1, why: 'المسافات البينية صغيرة جداً في الصلب، أكبر في السائل، وكبيرة جداً في الغاز.' },
      { q: 'حركة جزيئات المادة الصلبة تكون:', o: ['انتقالية سريعة في كل الاتجاهات', 'اهتزازية موضعية حول مواضع استقرارها', 'انزلاقية بجانب بعضها'], a: 1, why: 'قوى التجاذب كبيرة جداً والمسافات صغيرة جداً، فتهتز الجزيئات في مكانها فقط.' },
      { q: 'في النشاط، الصندوق الذي فيه كرات قليلة جداً تتطاير بحرية يشبه:', o: ['الحالة الغازية', 'الحالة السائلة', 'الحالة الصلبة'], a: 0, why: 'في الغاز تكون المسافات البينية كبيرة جداً فتتحرك الجزيئات بسرعة في الاتجاهات جميعها.' }
    ]
  };
  X7(D);
})();

/* ---------- نشاط: كيف أميز بين التغير الفيزيائي والتغير الكيميائي؟ (ص 8) ---------- */
(() => {
  const L0 = 12, RATE = .45; // cm, cm per minute
  const CARDS = [
    ['ice', '🧊', 'انصهار الثلج', 0, 'الماء يبقى ماءً، ويمكن تجميده ليعود ثلجاً.'],
    ['butter', '🧈', 'ذوبان الزبدة', 0, 'الزبدة المنصهرة تبقى زبدة (مثال الكتاب).'],
    ['sugar', '🍬', 'ذوبان السكر في الماء', 0, 'السكر لم يتغير تركيبه؛ بتبخير الماء يعود السكر.'],
    ['cut', '✂️', 'قص قطعة معدن', 0, 'تغيّر الشكل فقط، والمعدن هو نفسه.'],
    ['bend', '🔨', 'طرق المعادن وثنيها', 0, 'تغيّر الشكل فقط دون تغيّر تركيب المادة.'],
    ['wax', '🕯️', 'انصهار الشمع', 0, 'الشمع المنصهر يتجمد ثانية ويبقى شمعاً.'],
    ['wood', '🔥', 'حرق الخشب', 1, 'ينتج رماد ودخان وغازات — مواد جديدة لا يمكن إرجاعها خشباً.'],
    ['egg', '🥚', 'سلق البيض', 1, 'لا يمكن إرجاع البيضة المسلوقة نيئة؛ تغيّر تركيبها.'],
    ['tooth', '🦷', 'تسوس الأسنان', 1, 'تتفاعل الأحماض مع مادة السن فتتكون مواد جديدة (مثال الكتاب).'],
    ['rot', '🍌', 'تعفن الفاكهة', 1, 'تتكون مواد جديدة لها رائحة ولون مختلفان (سؤال الكتاب ص 8).'],
    ['apple', '🍎', 'تغير لون قطع التفاح', 1, 'يتفاعل التفاح مع أوكسجين الهواء فيتكون لون بني جديد.'],
    ['caramel', '🍮', 'حرق السكر', 1, 'يتكون الكراميل: مادة جديدة لونها وطعمها مختلفان.']];
  const D = {
    id: 'g7_changes', ch: 11, sec: 'الدرس 1', page: 8, kind: 'نشاط', title: 'نشاط: كيف أميز بين التغير الفيزيائي والتغير الكيميائي؟',
    desc: 'نشعل شمعة معلومة الطول ونراقبها خمس دقائق: انصهار الشمع تغير فيزيائي، واحتراق الفتيل تغير كيميائي. ثم نلعب لعبة تصنيف التغيرات.',
    tags: 'تغير فيزيائي كيميائي شمعة احتراق انصهار',
    tools: ['شمعة معلومة الطول', 'عود ثقاب', 'مسطرة', 'ساعة توقيت', 'جدول لتسجيل الطول واللون والحالة'],
    steps: ['قِس طول الشمعة: اسحب المسطرة الصفراء وضع صفرها عند قاعدة الشمعة (تثبت تلقائياً)، ثم اضغط «تسجيل».',
      'اسحب عود الثقاب من علبته (يشتعل) وقرّبه من فتيل الشمعة لإشعالها.',
      'راقب الشمعة خمس دقائق (سرّع الزمن ×30). ماذا تلاحظ على الشمع؟ وعلى الفتيل؟',
      'فعّل «جزيئات الشمع» و«نواتج الاحتراق» لترى ما يحدث للجزيئات.',
      'بعد 5 دقائق قِس طول الشمعة وسجّله مع حالتها في الجدول. انقر على اللهب لإطفائه.',
      'ماذا يمثل انصهار الشمع؟ وماذا يمثل احتراق الفتيل؟',
      'العب «لعبة التصنيف»: اسحب كل بطاقة إلى سلة «تغير فيزيائي» أو «تغير كيميائي».'],
    concl: ['التغير الفيزيائي: تتغير بعض الخواص الفيزيائية (الشكل، الحالة) دون أن يتغير تركيب المادة، وتبقى الجزيئات نفسها — مثل انصهار الشمع والثلج وذوبان السكر.', 'التغير الكيميائي: يتغير تركيب المادة وتنتج مادة جديدة لا يمكن إرجاعها — مثل احتراق خيط الشمعة وحرق الخشب وسلق البيض.', 'أغلب التغيرات الكيميائية تكون مصحوبة بحرارة أو ضوء أو كليهما.', 'يقل طول الشمعة لأن الشمع يحترق ويتحول إلى غازات جديدة (ثنائي أكسيد الكربون وبخار الماء).'],
    laws: [],
    fact: ['اللهب الذي تراه في الشمعة هو احتراق بخار الشمع وليس الشمع الصلب!', 'تسوس الأسنان تغير كيميائي — حافظ على صحة أسنانك من التسوس 🦷', 'في التغير الفيزيائي تبقى الذرات والجزيئات المكونة للمادة نفسها لا تتغير.'],
    controls: [
      SEL('mode', 'النشاط', [['candle', '🕯️ تجربة الشمعة'], ['sort', '🧩 لعبة التصنيف']], 'candle'),
      SEL('spd', 'سرعة الزمن', [[1, 'عادي ×1'], [30, 'أسرع ×30'], [60, 'أسرع ×60']], 30),
      BT('', [{ t: 'شمعة جديدة', on: S => D.newCandle(S) }, { t: 'إعادة اللعبة', on: S => D.deal(S) }]),
      TG('mol', 'جزيئات الشمع (المنصهر = الجزيئات نفسها)', false, null, 'atom'),
      TG('prod', 'نواتج الاحتراق (مواد جديدة)', true, null, 'energy'),
      TG('tags', 'نوع كل تغير على الشكل', true, null, 'labels'),
      TG('clock', 'ساعة التوقيت', true, null, 'stopwatch')],
    setup(S) { D.newCandle(S); D.deal(S); },
    newCandle(S) { S.lit = false; S.T = 0; S.L = L0; S.drips = []; S.puffs = []; S.mol = []; S.pool = 0; S.matchOn = false; S.mx = null; S.my = null; S.burnt = 0; S.rx = null; S.ry = null; S.done5 = false; S.smoke = 0; },
    deal(S) { S.cards = CARDS.map((c, i) => ({ i, k: c[0], bin: -1, x: null, y: null, sh: 0 })); S.score = 0; S.miss = 0; S.last = ''; S.msg = null; S.drag = -1; },
    geo(S) { const w = S.W, h = S.H, by = h * .8; const ppc = clamp(h * .42 / L0, 14, 28); return { w, h, by, ppc, cx: 70 + (w - 70) * .42, holdY: by - 16, cw: clamp(ppc * 1.25, 22, 34) }; },
    update(S, dt) {
      if (S.p.mode !== 'candle') return;
      const k = +S.p.spd;
      if (S.lit) { S.T += dt * k / 60; S.L = Math.max(2, L0 - RATE * S.T); S.pool = Math.min(1, S.pool + dt * k / 40);
        if (Math.random() < dt * k * .012 && S.drips.length < 7) S.drips.push({ hd: S.L - .1, len: 0, max: 1 + Math.random() * 2.2, side: Math.random() < .5 ? -1 : 1, g: 0 });
        if (S.L <= 2) { S.lit = false; Runner.toast('انتهت الشمعة تقريباً!', 'info'); }
        if (S.T >= 5 && !S.done5) { S.done5 = true; K.cheer(S, D.geo(S).cx, S.H * .3); }
        if (S.p.prod && Math.random() < dt * 3.2) S.mol.push({ x: (Math.random() - .5) * 10, y: 0, t: 0, k: Math.random() < .5 ? 'co2' : 'h2o', vx: (Math.random() - .5) * 40 });
      } else S.pool = Math.max(0, S.pool - dt * k / 90);
      S.drips.forEach(d => { if (d.len < d.max) d.len += dt * k / 50; else d.g = Math.min(1, d.g + dt * k / 60); });
      S.mol.forEach(m => { m.t += dt; m.y -= dt * 42; m.x += m.vx * dt; }); S.mol = S.mol.filter(m => m.t < 3.2);
      S.puffs.forEach(m => { m.t += dt; m.y -= dt * 30; m.x += Math.sin(m.t * 3 + m.s) * 12 * dt; }); S.puffs = S.puffs.filter(m => m.t < 2.5);
      if (S.matchOn) { S.burnt += dt; if (S.burnt > 8) { S.matchOn = false; } }
    },
    tipY(S, g) { return g.holdY - S.L * g.ppc; },
    rulerPos(S, g) { return [S.rx ?? g.cx + g.cw + 90, S.ry ?? g.by - 6]; },
    aligned(S, g) { const [x, y] = D.rulerPos(S, g); return Math.abs(y - g.holdY) < 1 && x > g.cx + g.cw / 2 - 2 && x < g.cx + g.cw / 2 + 30; },
    matchPos(S, g) { const bx = g.w - 150, byy = g.by - 8; return S.mx == null ? [bx + 10, byy - 26] : [S.mx, S.my]; },
    draw(ctx, w, h, S) {
      if (S.p.mode === 'sort') return D.drawSort(ctx, w, h, S);
      const p = S.p, g = D.geo(S), cx = g.cx, ty = D.tipY(S, g), cw = g.cw; K.bg(ctx, w, h, { benchY: g.by, top: S.lit ? '#fef3c7' : undefined });
      // glow
      if (S.lit) K.raw(ctx, () => { const r = 160 + Math.sin(S.t * 13) * 6; const gg = ctx.createRadialGradient(cx, ty - 30, 5, cx, ty - 30, r); gg.addColorStop(0, 'rgba(253,224,71,.45)'); gg.addColorStop(1, 'rgba(253,224,71,0)'); ctx.fillStyle = gg; ctx.fillRect(cx - r, ty - 30 - r, 2 * r, 2 * r); });
      // holder
      K.raw(ctx, () => { const hg = ctx.createLinearGradient(0, g.holdY, 0, g.by); hg.addColorStop(0, '#fcd34d'); hg.addColorStop(1, '#b45309'); ctx.fillStyle = hg; ctx.beginPath(); ctx.ellipse(cx, g.by - 4, cw * 2.3, 9, 0, 0, TAU); ctx.fill(); rr(ctx, cx - cw * .8, g.holdY, cw * 1.6, g.by - g.holdY - 4, 4); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.2; ctx.stroke(); });
      // candle body
      K.raw(ctx, () => { const bg = ctx.createLinearGradient(cx - cw / 2, 0, cx + cw / 2, 0); bg.addColorStop(0, '#fde7ef'); bg.addColorStop(.45, '#fff7fb'); bg.addColorStop(1, '#f5c6d6'); ctx.fillStyle = bg; rr(ctx, cx - cw / 2, ty, cw, g.holdY - ty, 3); ctx.fill(); ctx.strokeStyle = '#d88aa6'; ctx.lineWidth = 1.2; ctx.stroke();
        // drips
        S.drips.forEach(d => { const y0 = g.holdY - d.hd * g.ppc, x0 = cx + d.side * cw / 2; if (y0 < ty - 2) return; ctx.fillStyle = d.g > .5 ? '#f9d3e0' : 'rgba(255,240,246,.95)'; ctx.strokeStyle = '#d88aa6'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + d.side * 5, y0 + 3); ctx.lineTo(x0 + d.side * 5, y0 + d.len * g.ppc); ctx.arc(x0 + d.side * 2.5, y0 + d.len * g.ppc, 2.5, 0, Math.PI); ctx.lineTo(x0, y0); ctx.fill(); ctx.stroke(); });
        // melted pool
        if (S.pool > .02) { ctx.fillStyle = `rgba(255,236,179,${.35 + .55 * S.pool})`; ctx.beginPath(); ctx.ellipse(cx, ty + 2, cw / 2 - 1, 3 + 3 * S.pool, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(217,119,6,.5)'; ctx.stroke(); }
        // wick
        ctx.strokeStyle = S.lit ? '#1f2937' : '#334155'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(cx, ty + 2); ctx.quadraticCurveTo(cx + 2, ty - 7, cx + (S.lit ? 3 : 1), ty - 12); ctx.stroke();
        if (S.lit) { ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.arc(cx + 3, ty - 12, 2.2, 0, TAU); ctx.fill(); } });
      if (S.lit) D.flame(ctx, cx + 2, ty - 10, S.t, 1);
      // heat & light
      if (S.lit && p.prod) K.raw(ctx, () => { ctx.strokeStyle = 'rgba(234,88,12,.55)'; ctx.lineWidth = 2; for (let k = -1; k <= 1; k += 2) { ctx.beginPath(); for (let i = 0; i < 20; i++) { const yy = ty - 60 - i * 4, xx = cx + k * 42 + Math.sin(i * .8 - S.t * 8) * 5; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
        ctx.strokeStyle = 'rgba(250,204,21,.8)'; ctx.lineWidth = 2.5; for (let a = 0; a < 8; a++) { const an = a * TAU / 8 + .2; ctx.beginPath(); ctx.moveTo(cx + Math.cos(an) * 46, ty - 32 + Math.sin(an) * 46); ctx.lineTo(cx + Math.cos(an) * 60, ty - 32 + Math.sin(an) * 60); ctx.stroke(); } });
      // combustion products
      if (p.prod) S.mol.forEach(m => D.molecule(ctx, cx + 2 + m.x, ty - 55 + m.y, m.k, Math.min(1, 3.2 - m.t)));
      S.puffs.forEach(m => K.raw(ctx, () => { ctx.fillStyle = `rgba(100,116,139,${.4 * (1 - m.t / 2.5)})`; ctx.beginPath(); ctx.arc(cx + m.x, ty - 20 + m.y, 6 + m.t * 8, 0, TAU); ctx.fill(); }));
      // tags
      if (p.tags && (S.lit || S.pool > .1)) {
        K.tag(ctx, 'انصهار الشمع = تغير فيزيائي', cx - cw / 2 - 110, ty + 18, { s: 12, bg: '#2563eb' }); K.raw(ctx, () => G.arrow(ctx, cx - cw / 2 - 30, ty + 18, cx - cw / 2 - 3, ty + 6, '#2563eb', 2, 8));
        if (S.lit) { K.tag(ctx, 'احتراق الفتيل = تغير كيميائي', cx - 150, ty - 64, { s: 12, bg: '#ea580c' }); K.raw(ctx, () => G.arrow(ctx, cx - 64, ty - 56, cx - 8, ty - 26, '#ea580c', 2, 8)); if (p.prod) K.tag(ctx, 'مواد جديدة + حرارة + ضوء', cx - 150, ty - 100, { s: 11.5, bg: 'rgba(30,41,59,.85)' }); } }
      // wax molecules inset
      if (p.mol) D.inset(ctx, w - 130, g.by * .1 + 60, S);
      // ruler (vertical)
      const [rx, ry] = D.rulerPos(S, g); const RL = 14; K.ruler(ctx, rx, ry, RL * g.ppc, RL, { rot: -Math.PI / 2 });
      if (D.aligned(S, g)) { K.raw(ctx, () => { ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(cx - cw / 2 - 6, ty); ctx.lineTo(rx + 26, ty); ctx.stroke(); ctx.setLineDash([]); }); K.tag(ctx, 'L = ' + fmt(S.L, 1) + ' cm', rx + 66, ty, { s: 13, bg: '#16a34a' }); }
      else K.tag(ctx, 'ضع صفر المسطرة عند قاعدة الشمعة', rx + 20, ry - RL * g.ppc - 16, { s: 11, bg: 'rgba(161,98,7,.9)' });
      // matchbox + match
      const bx = w - 150, byy = g.by - 8; K.raw(ctx, () => { ctx.fillStyle = '#dc2626'; rr(ctx, bx - 40, byy - 22, 90, 26, 4); ctx.fill(); ctx.fillStyle = '#7f1d1d'; ctx.fillRect(bx - 40, byy - 6, 90, 6); ctx.fillStyle = '#fff'; ctx.font = '800 11px Tajawal,sans-serif'; ctx.textAlign = 'center'; ctx.direction = 'rtl'; ctx.fillText('كبريت', bx + 5, byy - 10); });
      if (S.burnt < 8) { const [mx, my] = D.matchPos(S, g); K.raw(ctx, () => { ctx.save(); ctx.translate(mx, my); ctx.rotate(-.5); ctx.fillStyle = '#fcd34d'; ctx.fillRect(-2.5, 0, 5, 58); ctx.fillStyle = S.matchOn ? '#1f2937' : '#b91c1c'; ctx.beginPath(); ctx.ellipse(0, 0, 4.5, 6.5, 0, 0, TAU); ctx.fill(); ctx.restore(); }); if (S.matchOn) D.flame(ctx, mx, my - 4, S.t * 1.3, .55); }
      // clock
      if (p.clock) { const ck = 84, cy2 = 120; K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(ck + 40, cy2, 38, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#334155'; ctx.fillRect(ck + 36, cy2 - 48, 8, 8);
          for (let i = 0; i < 12; i++) { const a = i * TAU / 12; ctx.lineWidth = i % 3 ? 1 : 2; ctx.beginPath(); ctx.moveTo(ck + 40 + Math.sin(a) * 30, cy2 - Math.cos(a) * 30); ctx.lineTo(ck + 40 + Math.sin(a) * 35, cy2 - Math.cos(a) * 35); ctx.stroke(); }
          const a = S.T / 10 * TAU; ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ck + 40, cy2); ctx.lineTo(ck + 40 + Math.sin(a) * 28, cy2 - Math.cos(a) * 28); ctx.stroke();
          ctx.fillStyle = 'rgba(34,197,94,.25)'; ctx.beginPath(); ctx.moveTo(ck + 40, cy2); ctx.arc(ck + 40, cy2, 26, -Math.PI / 2, -Math.PI / 2 + Math.min(S.T, 5) / 10 * TAU); ctx.fill(); });
        const mm = Math.floor(S.T), ss = Math.floor((S.T - mm) * 60); G.text(ctx, `${mm}:${String(ss).padStart(2, '0')} min`, ck + 40, cy2 + 56, { s: 15, w: 900, mono: 1, c: '#0f172a', raw: 1 }); }
      if (S.done5 && S.lit) K.bubble(ctx, 'مرت 5 دقائق! قِس طول الشمعة وسجّله 📏', cx + 40, ty - 90, { s: 13 });
      else if (!S.lit && S.T === 0 && S._touched) K.bubble(ctx, 'اسحب عود الثقاب إلى الفتيل 🔥', w - 150, g.by - 70, { s: 12.5, side: 'l' });
      K.party(ctx, S);
    },
    flame(ctx, x, y, t, s) { K.raw(ctx, () => { const f = 1 + .06 * Math.sin(t * 21) + .04 * Math.sin(t * 33); const H = 46 * s * f, W = 13 * s; ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 7) * .04);
      let gr = ctx.createRadialGradient(0, -H * .3, 1, 0, -H * .35, H * .75); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.35, 'rgba(253,224,71,.95)'); gr.addColorStop(.75, 'rgba(249,115,22,.85)'); gr.addColorStop(1, 'rgba(249,115,22,0)');
      ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(0, -H); ctx.bezierCurveTo(W * 1.2, -H * .45, W, 0, 0, 2); ctx.bezierCurveTo(-W, 0, -W * 1.2, -H * .45, 0, -H); ctx.fill();
      ctx.fillStyle = 'rgba(59,130,246,.55)'; ctx.beginPath(); ctx.ellipse(0, -3, W * .45, H * .12, 0, 0, TAU); ctx.fill(); ctx.restore(); }); },
    molecule(ctx, x, y, k, a) { K.raw(ctx, () => { ctx.globalAlpha = clamp(a, 0, 1) * .95; if (k === 'co2') { K.ball(ctx, x - 7, y, 4.5, '#ef4444'); K.ball(ctx, x + 7, y, 4.5, '#ef4444'); K.ball(ctx, x, y, 5, '#334155'); } else { K.ball(ctx, x - 5, y + 3, 3, '#e2e8f0'); K.ball(ctx, x + 5, y + 3, 3, '#e2e8f0'); K.ball(ctx, x, y, 4.8, '#ef4444'); } ctx.globalAlpha = 1; }); },
    inset(ctx, x, y, S) { const W = 220, H = 250; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.96)'; rr(ctx, x - W / 2, y - 16, W, H, 14); ctx.fill(); ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2; ctx.stroke(); });
      G.text(ctx, '🔬 داخل الشمعة', x, y, { s: 13, w: 900, c: '#6d28d9', raw: 1 });
      const wax = (xx, yy, a) => K.raw(ctx, () => { ctx.save(); ctx.translate(xx, yy); ctx.rotate(a); for (let i = 0; i < 4; i++) K.ball(ctx, -9 + i * 6, Math.sin(i * 2) * 1.5, 3.4, '#a8a29e'); ctx.restore(); });
      // solid wax (ordered-ish) → melted (same molecules sliding)
      G.text(ctx, 'شمع صلب', x + 55, y + 22, { s: 11, w: 800, c: '#334155', raw: 1 }); G.text(ctx, 'شمع منصهر', x - 55, y + 22, { s: 11, w: 800, c: '#334155', raw: 1 });
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) wax(x + 35 + i * 20 + Math.sin(S.t * 20 + i + j) * .6, y + 42 + j * 12, 0);
      for (let i = 0; i < 9; i++) wax(x - 75 + ((i * 23 + S.t * 9 * (i % 2 ? 1 : -1)) % 60 + 60) % 60 + 8, y + 40 + (i % 3) * 13 + Math.sin(S.t * 3 + i) * 2, Math.sin(i * 3 + S.t) * .6);
      G.text(ctx, '← الجزيئات نفسها: تغير فيزيائي', x, y + 92, { s: 11.5, w: 900, c: '#2563eb', raw: 1 });
      K.raw(ctx, () => { ctx.strokeStyle = '#e2e8f0'; ctx.beginPath(); ctx.moveTo(x - W / 2 + 10, y + 106); ctx.lineTo(x + W / 2 - 10, y + 106); ctx.stroke(); });
      G.text(ctx, 'في اللهب:', x, y + 122, { s: 11.5, w: 900, c: '#334155', raw: 1 });
      wax(x + 80, y + 150, 0); K.ball(ctx, x + 50, y + 150, 4, '#ef4444'); K.ball(ctx, x + 57, y + 150, 4, '#ef4444');
      G.text(ctx, '←', x + 22, y + 150, { s: 16, w: 900, c: '#ea580c', raw: 1 });
      D.molecule(ctx, x - 12, y + 146, 'co2', 1); D.molecule(ctx, x - 48, y + 148, 'h2o', 1); D.molecule(ctx, x - 80, y + 150, 'co2', 1);
      G.text(ctx, 'شمع + أوكسجين', x + 65, y + 172, { s: 10.5, c: '#475569', raw: 1 }); G.text(ctx, 'CO₂ + H₂O', x - 48, y + 172, { s: 10.5, c: '#475569', raw: 1, mono: 1 });
      G.text(ctx, '← مواد جديدة: تغير كيميائي', x, y + 198, { s: 11.5, w: 900, c: '#ea580c', raw: 1 }); },
    /* ---------- sorting game ---------- */
    sortGeo(S) { const w = S.W, h = S.H; const x0 = 78, aw = w - x0 - 16; const cw = Math.min(170, aw / 4 - 10), ch = 70; const binY = h * .6, binH = h * .3 - 20; return { w, h, x0, aw, cw, ch, binY, binH, bins: [{ x: x0 + aw * .75, lab: 'تغير فيزيائي', c: '#2563eb', sub: 'تتغير الخواص الفيزيائية فقط — المادة نفسها' }, { x: x0 + aw * .25, lab: 'تغير كيميائي', c: '#ea580c', sub: 'تتكون مادة جديدة لا يمكن إرجاعها' }], bw: aw / 2 - 16 }; },
    cardPos(S, c, g) { if (S.drag === c.i && c.x != null) return [c.x, c.y]; if (c.bin >= 0) { const B = g.bins[c.bin]; const same = S.cards.filter(q => q.bin === c.bin); const k = same.indexOf(c); return [B.x - g.bw / 2 + 12 + (k % 2) * (g.bw / 2 - 6) + (g.bw / 2 - 18) / 2, g.binY + 60 + (k >> 1) * 30]; } const k = c.i; const col = k % 4, row = k >> 2; return [g.x0 + g.aw - (col + .5) * g.aw / 4 + (c.sh ? Math.sin(S.t * 50) * 6 * c.sh : 0), 118 + row * (g.ch + 14)]; },
    drawSort(ctx, w, h, S) {
      const g = D.sortGeo(S); K.bg(ctx, w, h, { benchY: g.binY - 14 });
      G.text(ctx, 'اسحب كل بطاقة إلى السلة المناسبة', g.x0 + g.aw / 2, 26, { s: 15, w: 900, c: '#0f172a', raw: 1 });
      G.text(ctx, `صحيح: ${S.score} من 12   •   خطأ: ${S.miss}`, g.x0 + g.aw / 2, 50, { s: 13, w: 800, c: '#334155', raw: 1 });
      g.bins.forEach((B, k) => { K.raw(ctx, () => { const X = B.x - g.bw / 2, Y = g.binY; const gr = ctx.createLinearGradient(0, Y, 0, Y + g.binH); gr.addColorStop(0, k ? '#ffedd5' : '#dbeafe'); gr.addColorStop(1, k ? '#fed7aa' : '#bfdbfe'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(X + g.bw, Y); ctx.lineTo(X + g.bw - 14, Y + g.binH); ctx.lineTo(X + 14, Y + g.binH); ctx.closePath(); ctx.fill(); ctx.strokeStyle = B.c; ctx.lineWidth = 3; ctx.stroke();
          ctx.strokeStyle = B.c + '33'; ctx.lineWidth = 1; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(X + g.bw * i / 6, Y); ctx.lineTo(X + 14 + (g.bw - 28) * i / 6, Y + g.binH); ctx.stroke(); } });
        K.tag(ctx, (k ? '⚗️ ' : '💧 ') + B.lab, B.x, g.binY + 18, { s: 15, bg: B.c }); G.text(ctx, B.sub, B.x, g.binY + 40, { s: 11, w: 700, c: '#334155', raw: 1 }); });
      S.cards.forEach(c => { if (S.drag === c.i) return; D.drawCard(ctx, S, c, g); }); const dc = S.cards.find(c => c.i === S.drag); if (dc) D.drawCard(ctx, S, dc, g);
      if (S.msg) { K.bubble(ctx, S.msg.t, g.x0 + g.aw / 2, g.binY - 20, { s: 12.5, bg: S.msg.ok ? '#dcfce7' : '#fee2e2', bd: S.msg.ok ? '#16a34a' : '#dc2626', c: S.msg.ok ? '#14532d' : '#7f1d1d' }); S.msg.life -= 1 / 60; if (S.msg.life < 0) S.msg = null; }
      S.cards.forEach(c => { if (c.sh > 0) c.sh = Math.max(0, c.sh - 1 / 40); });
      if (S.score === 12) K.bubble(ctx, 'رائع! صنّفت كل التغيرات بشكل صحيح 🎉', g.x0 + g.aw / 2, 150, { s: 14 });
      K.party(ctx, S);
    },
    drawCard(ctx, S, c, g) { const C = CARDS[c.i]; const [x, y] = D.cardPos(S, c, g); if (c.bin >= 0 && S.drag !== c.i) { const bw = g.bw / 2 - 18; K.raw(ctx, () => { ctx.fillStyle = '#fff'; rr(ctx, x - bw / 2, y - 12, bw, 24, 8); ctx.fill(); ctx.strokeStyle = g.bins[c.bin].c; ctx.lineWidth = 1.5; ctx.stroke(); }); G.text(ctx, C[1] + ' ' + C[2] + ' ✓', x, y + 1, { s: 11.5, w: 800, c: '#0f172a', raw: 1 }); return; }
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(15,23,42,.15)'; rr(ctx, x - g.cw / 2 + 3, y - g.ch / 2 + 4, g.cw, g.ch, 12); ctx.fill(); ctx.fillStyle = '#fff'; rr(ctx, x - g.cw / 2, y - g.ch / 2, g.cw, g.ch, 12); ctx.fill(); ctx.strokeStyle = c.sh ? '#dc2626' : '#94a3b8'; ctx.lineWidth = 2; ctx.stroke(); ctx.font = '28px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(C[1], x, y - 12); ctx.textBaseline = 'alphabetic'; });
      G.text(ctx, C[2], x, y + 20, { s: 12.5, w: 800, c: '#0f172a', raw: 1 }); },
    drags(S) {
      if (S.p.mode === 'sort') { const g = D.sortGeo(S); return S.cards.filter(c => c.bin < 0).map((c, j) => { const [x, y] = D.cardPos(S, c, g); return { id: 'card_' + c.k, x, y, w: g.cw, h: g.ch, axis: 'xy', hint: j === 0, idle: j === 0 ? 'اسحب البطاقة إلى إحدى السلتين ✋' : undefined, tip: 'اسحب البطاقة إلى السلة المناسبة',
        down: S => { S.drag = c.i; c.x = x; c.y = y; }, drag: (S, d) => { c.x = d.ox + d.x - d.sx; c.y = d.oy + d.y - d.sy; },
        up: S => { const g2 = D.sortGeo(S); S.drag = -1; S.last = c.k; if (c.y > g2.binY - 20) { const b = c.x > g2.x0 + g2.aw / 2 ? 0 : 1; const C = CARDS[c.i]; if (b === C[3]) { c.bin = b; S.score++; C1.good(); S.msg = { t: '✓ ' + C[2] + ': ' + C[4], ok: 1, life: 3.5 }; if (S.score === 12) K.cheer(S, g2.x0 + g2.aw / 2, 160); } else { S.miss++; c.sh = 1; C1.wrong(); S.msg = { t: '✗ ليس ' + g2.bins[b].lab + '! ' + C[4], ok: 0, life: 4 }; } } c.x = null; } }; }); }
      const g = D.geo(S), ty = D.tipY(S, g); const [rx, ry] = D.rulerPos(S, g); const [mx, my] = D.matchPos(S, g); const L = [];
      L.push({ id: 'ruler', x: rx + 8, y: ry - 7 * g.ppc, w: 30, h: 14 * g.ppc, axis: 'xy', hint: false, tip: 'اسحب المسطرة وضع صفرها عند قاعدة الشمعة',
        down: S => { S.rx = rx; S.ry = ry; }, drag: (S, d) => { let x = d.ox - 8 + d.x - d.sx, y = d.oy + 7 * g.ppc + d.y - d.sy; if (Math.abs(x - (g.cx + g.cw / 2 + 4)) < 22 && Math.abs(y - g.holdY) < 22) { x = g.cx + g.cw / 2 + 4; y = g.holdY; } S.rx = clamp(x, 80, g.w - 40); S.ry = clamp(y, 14 * g.ppc + 10, g.h - 20); } });
      L.push({ id: 'wick', x: g.cx, y: ty - 16, r: 22, hint: false, tip: S.lit ? 'انقر على اللهب لإطفاء الشمعة' : 'قرّب عود الثقاب المشتعل من الفتيل', click: S => { if (S.lit) { S.lit = false; for (let i = 0; i < 8; i++) S.puffs.push({ x: (Math.random() - .5) * 8, y: 0, t: i * .12, s: Math.random() * 6 }); } else if (S.matchOn) D.light(S); else Runner.toast('أشعل عود الثقاب أولاً — اسحبه من علبة الكبريت', 'info'); } });
      if (S.burnt < 8) L.push({ id: 'match', x: mx, y: my + 14, r: 22, axis: 'xy', idle: 'اسحب عود الثقاب إلى الفتيل 🔥', tip: 'اسحب عود الثقاب (يشتعل عند إخراجه من العلبة)',
        down: S => { S.mx = mx; S.my = my; }, drag: (S, d) => { S.mx = d.ox + d.x - d.sx; S.my = d.oy - 14 + d.y - d.sy; if (!S.matchOn && Math.hypot(S.mx - (g.w - 140), S.my - (g.by - 34)) > 40) { S.matchOn = true; S.burnt = 0; } const t2 = D.tipY(S, g); if (S.matchOn && !S.lit && Math.hypot(S.mx - g.cx, S.my - (t2 - 14)) < 26) D.light(S); },
        up: S => { if (S.lit || !S.matchOn) { S.mx = null; S.my = null; S.matchOn = false; } } });
      return L;
    },
    light(S) { S.lit = true; S.matchOn = false; S.mx = null; S.my = null; C1.good(); },
    readings(S) { if (S.p.mode === 'sort') return [rd('تصنيفات صحيحة', S.score + ' / 12'), rd('محاولات خاطئة', String(S.miss))]; const g = D.geo(S); return [rd('الزمن', fmt(S.T, 2) + ' min'), rd('طول الشمعة', D.aligned(S, g) ? fmt(S.L, 2) + ' cm' : 'ضع المسطرة بجانبها'), rd('النقص في الطول', fmt(L0 - S.L, 2) + ' cm'), rd('حالة الشمعة', S.lit ? 'مشتعلة — الشمع ينصهر أعلاها' : S.T > 0 ? 'مطفأة — الشمع المنصهر تجمد' : 'صلبة غير مشتعلة', 1)]; },
    record(S) { if (S.p.mode === 'sort') { Runner.toast('الجدول لتجربة الشمعة', 'info'); return null; } const g = D.geo(S); if (!D.aligned(S, g)) { Runner.toast('ضع صفر المسطرة عند قاعدة الشمعة لقياس طولها أولاً', 'info'); return null; } return { T: +S.T.toFixed(1), L: +S.L.toFixed(1), c: S.pool > .3 ? 'وردي، أعلاها شفاف (منصهر)' : 'وردي فاتح', st: S.lit ? 'صلبة + سائل في أعلاها' : 'صلبة' }; },
    cols: [['T', 'الزمن (min)'], ['L', 'طول الشمعة (cm)'], ['c', 'اللون'], ['st', 'الحالة']],
    explain(S) { if (S.p.mode === 'sort') return 'اسأل نفسك: هل تكونت <b>مادة جديدة</b> لا يمكن إرجاعها؟ إذا نعم فهو <b>تغير كيميائي</b>، وإذا تغيّر الشكل أو الحالة فقط فهو <b>تغير فيزيائي</b>.'; if (!S.lit && S.T === 0) return 'الشمعة صلبة وطولها 12 cm. أشعلها بعود الثقاب وراقب ما يحدث.'; if (S.lit) return `حرارة اللهب <b>تصهر الشمع</b> فيتحول من صلب إلى سائل (تغير فيزيائي — الجزيئات نفسها). بخار الشمع يصعد في الفتيل و<b>يحترق</b> مع الأوكسجين فتتكون مواد جديدة: ثنائي أكسيد الكربون وبخار الماء مع حرارة وضوء (تغير كيميائي). لذلك يقل طول الشمعة: نقص حتى الآن <b dir="ltr">${fmt(L0 - S.L, 2)} cm</b>.`; return 'أُطفئت الشمعة: الشمع المنصهر <b>تجمد</b> مرة أخرى وعاد صلباً (تغير فيزيائي عكسي)، أما الشمع الذي احترق فلا يعود أبداً (تغير كيميائي).'; },
    quiz: [
      { q: 'ماذا نسمي التغير الذي يحدث عند تعفن الفاكهة؟', o: ['تغير فيزيائي', 'تغير كيميائي', 'ليس تغيراً'], a: 1, why: 'تتكون مواد جديدة لها لون ورائحة مختلفان ولا يمكن إرجاع الفاكهة كما كانت.' },
      { q: 'أيٌّ مما يأتي دليل على حدوث تغير كيميائي؟', o: ['تغير شكل المادة فقط', 'انبعاث حرارة وضوء وتكوّن مادة جديدة', 'تحول المادة من صلب إلى سائل'], a: 1, why: 'أغلب التغيرات الكيميائية تكون مصحوبة بحرارة أو ضوء أو كليهما مع تكون مادة جديدة.' },
      { q: 'انصهار الشمعة يمثل تغيراً ...... ، واحتراق خيطها يمثل تغيراً ......', o: ['فيزيائياً / كيميائياً', 'كيميائياً / فيزيائياً', 'فيزيائياً / فيزيائياً'], a: 0, why: 'الشمع المنصهر يبقى شمعاً (فيزيائي)، والاحتراق ينتج مواد جديدة (كيميائي).' }
    ]
  };
  X7(D);
})();

/* ---------- حالات المادة وخواصها (ص 9–11): نموذج الجزيئات + الشد السطحي + اللزوجة ---------- */
(() => {
  const RW = 400, RH = 360, PR = 9; // sim region, particle radius
  const CONT = {
    cyl: { n: 'أسطوانة بمكبس', pts: [[110, 20], [290, 20], [290, 360], [110, 360]] },
    flask: { n: 'دورق', pts: [[170, 20], [230, 20], [230, 130], [370, 318], [370, 360], [30, 360], [30, 318], [170, 130]] },
    wide: { n: 'حوض عريض', pts: [[20, 200], [380, 200], [380, 360], [20, 360]] }};
  const STS = {
    cry: { n: 'صلب بلوري', ic: '💎', c: '#2563eb', ex: 'الماس، الجليد', shape: 'ثابت (لا يأخذ شكل الإناء)', vol: 'ثابت', gap: 'صغيرة جداً — مرتبة بنمط منتظم', mv: 'اهتزازية حول مواضع ثابتة' },
    amo: { n: 'صلب غير بلوري', ic: '🕯️', c: '#7c3aed', ex: 'الشمع، المطاط، الزجاج', shape: 'ثابت', vol: 'ثابت', gap: 'صغيرة جداً — مرتبة عشوائياً', mv: 'اهتزازية حول مواضع ثابتة' },
    liq: { n: 'سائل', ic: '💧', c: '#0891b2', ex: 'الماء، النفط، الحليب', shape: 'متغير — يأخذ شكل الإناء', vol: 'ثابت (محدد)', gap: 'أكبر من الصلب', mv: 'انتقالية — تنزلق بجانب بعضها' },
    gas: { n: 'غاز', ic: '💨', c: '#dc2626', ex: 'الهواء، بخار الماء', shape: 'متغير — يملأ الإناء', vol: 'متغير — يملأ الإناء كله', gap: 'كبيرة جداً', mv: 'سريعة في الاتجاهات جميعها' },
    pla: { n: 'بلازما', ic: '⚡', c: '#c026d3', ex: 'البرق، اللهب، الشمس، مصباح النيون', shape: 'لا تحافظ على شكلها', vol: 'متغير', gap: 'جسيمات مشحونة (+ و −)', mv: 'سريعة جداً ولها طاقة هائلة' }};
  const SK = ['cry', 'amo', 'liq', 'gas', 'pla'];
  const LQ = [{ n: 'ماء', c: '#60a5fa', v: 380, a: .35 }, { n: 'زيت', c: '#facc15', v: 110, a: .55 }, { n: 'عسل', c: '#d97706', v: 30, a: .8 }];
  const inPoly = (pts, x, y) => { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
  const D = {
    id: 'g7_states', ch: 11, sec: 'الدرس 1', page: 9, kind: 'نشاط', title: 'حالات المادة وخواصها: صلب، سائل، غاز، بلازما',
    desc: 'نموذج جزيئي حيّ لحالات المادة: اسكب المادة في أوانٍ مختلفة الشكل، واضغط المكبس، وسخّن لتسرع الجزيئات. ثم جرّب الشد السطحي واللزوجة.',
    tags: 'صلب سائل غاز بلازما بلوري غير بلوري شد سطحي لزوجة جزيئات انضغاط',
    tools: ['أوانٍ مختلفة الشكل', 'أسطوانة بمكبس', 'حوض ماء، مشبك ورق، حشرة، صابون', 'أنابيب فيها ماء وزيت وعسل وكرات فولاذية'],
    steps: ['اختر حالة المادة من الأزرار أعلى الشكل (صلب بلوري، صلب غير بلوري، سائل، غاز، بلازما).',
      'اسكب المادة في إناء آخر: انقر «دورق» أو «حوض عريض». هل تغيّر شكل المادة؟ هل تغيّر حجمها؟',
      'اختر «أسطوانة بمكبس» واسحب المكبس إلى الأسفل. أيّ الحالات يمكن ضغطها؟',
      'حرّك منزلق «سرعة الجزيئات (التسخين)» وراقب حركة الجزيئات.',
      'انتقل إلى «الشد السطحي»: اسحب مشبك الورق والحشرة إلى سطح الماء، ثم اضغط المشبك إلى الأسفل، ثم أضف الصابون.',
      'انتقل إلى «اللزوجة»: اسحب الكرات إلى الأنابيب (أو «أسقط الكرات معاً»). في أي سائل تنزل الكرة أبطأ؟ لماذا؟'],
    concl: ['المادة الصلبة لها حجم وشكل محددان؛ جزيئاتها متقاربة جداً وتهتز حول مواضع استقرارها. البلورية مرتبة بنمط منتظم (الماس والجليد) وغير البلورية عشوائية (الشمع والمطاط والزجاج).', 'المادة السائلة لها حجم محدد وشكل متغير تأخذ شكل الوعاء؛ جزيئاتها تنزلق بجانب بعضها.', 'المادة الغازية حجمها وشكلها متغيران وتملأ الوعاء كله؛ المسافات بين جزيئاتها كبيرة جداً لذا يمكن ضغطها.', 'البلازما جسيمات مشحونة كهربائياً ولها طاقة هائلة (البرق، اللهب، الشمس).', 'الشد السطحي: يتصرف سطح السائل كغشاء رقيق مرن بسبب قوى تجذب جزيئات السطح نحو الداخل.', 'اللزوجة: مقاومة السائل للانسياب، وتزداد بزيادة قوى التجاذب بين جزيئاته (العسل > الزيت > الماء).'],
    laws: ['g7_states'],
    fact: ['الشد السطحي يسمح لحشرة «متزلج الماء» أن تمشي على سطح الماء وكأنه غشاء رقيق!', 'لزوجة العسل أكبر بآلاف المرات من لزوجة الماء.', 'أكثر من 99% من المادة المرئية في الكون في حالة بلازما — مثل الشمس والنجوم.'],
    controls: [
      SEL('mode', 'القسم', [['model', 'حالات المادة'], ['tension', 'الشد السطحي'], ['visc', 'اللزوجة']], 'model', (v, S) => { S.msg = null; }),
      SEL('st', 'حالة المادة', SK.map(k => [k, STS[k].ic + ' ' + STS[k].n]), 'liq', (v, S, init) => { if (!init) D.pour(S); }),
      R('T', 'سرعة الجزيئات (التسخين)', 1, 10, 5, 1, ''),
      BT('', [{ t: 'أسقط الكرات معاً (اللزوجة)', on: S => { setParam(S, 'mode', 'visc'); D.dropAll(S); } }, { t: 'ماء نظيف (الشد السطحي)', on: S => D.resetT(S) }]),
      TG('vel', 'أسهم سرعة الجزيئات', false, null, 'velocity'),
      TG('bond', 'قوى التجاذب بين الجزيئات', true, null, 'force'),
      TG('props', 'بطاقة خواص الحالة', true, null, 'labels'),
      TG('zoom', 'تكبير جزيئات السطح/السائل', true, null, 'atom')],
    setup(S) { S.cont = 'cyl'; S.pis = 20; S.pv = 0; S.noComp = 0; S.solY = 0; S.solV = 0; S.P = 1; S.pmsg = 0; D.pour(S); D.resetT(S); D.resetV(S); },
    /* ---------------- particle model ---------------- */
    pour(S) { const st = S.p.st, R = C1.rng(11); S.pts = []; S.solY = -260; S.solV = 0; if (S.cont !== 'cyl') S.pis = 20; else if (st === 'liq' || st === 'cry' || st === 'amo') S.pis = 20;
      if (st === 'cry' || st === 'amo') { const H = []; if (st === 'cry') { for (let j = 0; j < 6; j++) for (let i = 0; i < 8; i++) H.push([128.75 + i * 19 + (j % 2 ? 9.5 : 0), 360 - PR - 1 - j * 16.5]); } else { let tries = 0; while (H.length < 44 && tries++ < 4000) { const x = 200 - 76 + R() * 152, y = 360 - PR - 1 - R() * 90; if (H.every(([a, b]) => Math.hypot(a - x, b - y) > 17)) H.push([x, y]); } } H.forEach(([x, y]) => S.pts.push({ hx: x, hy: y, x, y, vx: 0, vy: 0, ph: R() * TAU, q: 0, d: 0 })); return; }
      const n = st === 'liq' ? 78 : st === 'gas' ? 34 : 40; const c = CONT[S.cont]; const top = c.pts.reduce((a, p) => Math.min(a, p[1]), 999);
      for (let i = 0; i < n; i++) S.pts.push({ x: 200 + (R() - .5) * 20, y: Math.max(top, S.pis) + PR + 4 + R() * 6, vx: (R() - .5) * 60, vy: st === 'liq' ? 60 : (R() - .5) * 300, d: S.t + i * (st === 'liq' ? .045 : .02), q: st === 'pla' ? (i % 2 ? 1 : -1) : 0, ph: 0 }); },
    stepModel(S, dt) {
      const st = S.p.st, T = S.p.T; const c = CONT[S.cont]; const pts = c.pts;
      if (st === 'cry' || st === 'amo') { if (S.solY < 0) { S.solV += 1400 * dt; S.solY = Math.min(0, S.solY + S.solV * dt); if (S.solY === 0) S.solV = 0; } const A = .6 + T * .35; S.pts.forEach(q => { q.x = q.hx + Math.sin(S.t * 30 + q.ph) * A; q.y = q.hy + S.solY + Math.cos(S.t * 27 + q.ph * 1.7) * A; q.vx = Math.cos(S.t * 30 + q.ph) * A * 30; q.vy = -Math.sin(S.t * 27 + q.ph * 1.7) * A * 27; }); return; }
      const act = S.pts.filter(q => S.t >= q.d); const n = act.length; const liq = st === 'liq'; const sub = liq ? 3 : 4, h = dt / sub; const vT = liq ? 0 : (st === 'pla' ? 120 : 70) + T * (st === 'pla' ? 40 : 28);
      for (let s = 0; s < sub; s++) {
        act.forEach(q => { q.px = q.x; q.py = q.y; if (liq) { q.vy += 900 * h; const kick = T * 2.4; q.vx += (Math.random() - .5) * kick; q.vy += (Math.random() - .5) * kick; q.vx *= .996; q.vy *= .996; } q.x += q.vx * h; q.y += q.vy * h; });
        for (let i = 0; i < n; i++) { const a = act[i]; for (let j = i + 1; j < n; j++) { const b = act[j]; const dx = b.x - a.x, dy = b.y - a.y, d2 = dx * dx + dy * dy; const rr0 = (a.q < 0 || b.q < 0) ? PR * 1.3 : 2 * PR; if (d2 < rr0 * rr0 && d2 > 1e-6) { const d = Math.sqrt(d2), nx = dx / d, ny = dy / d, ov = (rr0 - d) / 2; a.x -= nx * ov; a.y -= ny * ov; b.x += nx * ov; b.y += ny * ov; const vn = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny; if (vn < 0) { const e = liq ? .15 : 1, im = -(1 + e) * vn / 2; a.vx -= im * nx; a.vy -= im * ny; b.vx += im * nx; b.vy += im * ny; } }
          else if (liq && d2 < (2.7 * PR) ** 2 && d2 > 1e-6) { const d = Math.sqrt(d2), f = 140 * h * (d - 2 * PR) / PR; a.vx += dx / d * f; a.vy += dy / d * f; b.vx -= dx / d * f; b.vy -= dy / d * f; } } }
        act.forEach(q => { const r = q.q < 0 ? 4 : PR;
          for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [ax, ay] = pts[j], [bx, by] = pts[i]; const ex = bx - ax, ey = by - ay, L2 = ex * ex + ey * ey; let t = ((q.x - ax) * ex + (q.y - ay) * ey) / L2; t = clamp(t, 0, 1); const cx = ax + ex * t, cy = ay + ey * t; const dx = q.x - cx, dy = q.y - cy, d = Math.hypot(dx, dy); if (d < r && d > 1e-6 && inPoly(pts, q.x, q.y)) { const nx = dx / d, ny = dy / d; q.x = cx + nx * r; q.y = cy + ny * r; const vn = q.vx * nx + q.vy * ny; if (vn < 0) { const e = liq ? .2 : 1; q.vx -= (1 + e) * vn * nx; q.vy -= (1 + e) * vn * ny; } } }
          if (!inPoly(pts, q.x, q.y)) { q.x = q.px; q.y = q.py; q.vx *= -1; q.vy *= -1; if (!inPoly(pts, q.x, q.y)) { q.x = 200; q.y = 330; } }
          if (S.cont === 'cyl' && q.y - r < S.pis) { q.y = S.pis + r; if (q.vy < 0) q.vy = -q.vy * (liq ? .2 : 1); q.vy += Math.max(0, S.pv); } });
      }
      if (!liq && n) { const m = act.reduce((a, q) => a + Math.hypot(q.vx, q.vy), 0) / n; const f = 1 + (vT / Math.max(m, 1) - 1) * Math.min(1, dt * 3); act.forEach(q => { q.vx *= f; q.vy *= f; }); }
    },
    minPis(S) { const st = S.p.st; if (st === 'gas' || st === 'pla') return 255; const top = S.pts.reduce((a, q) => Math.min(a, q.y), 360); return Math.max(20, top - PR - 2); },
    update(S, dt) {
      dt = Math.min(dt, 1 / 30); const md = S.p.mode;
      if (md === 'model') { D.stepModel(S, dt); S.pv *= .8; if (S.pis > D.minPis(S) + 1) S.pis = D.minPis(S);
        S.noComp = Math.max(0, S.noComp - dt); const Vr = (360 - S.pis) / 340; S.P = (S.p.st === 'gas' || S.p.st === 'pla') ? (1 / Vr) * (.5 + S.p.T / 10) : 1; }
      if (md === 'tension') D.stepT(S, dt);
      if (md === 'visc') D.stepV(S, dt);
    },
    geo(S) { const w = S.W, h = S.H; const aw = w - 70 - 250; const sc = Math.min(aw / 420, h * .56 / RH); const ox = 70 + (aw - RW * sc) / 2 + 6, oy = h * .21; return { w, h, aw, sc, ox, oy, by: oy + RH * sc + 3, X: x => ox + x * sc, Y: y => oy + y * sc, px: w - 128 }; },
    draw(ctx, w, h, S) { const md = S.p.mode; if (md === 'tension') return D.drawT(ctx, w, h, S); if (md === 'visc') return D.drawV(ctx, w, h, S); D.drawModel(ctx, w, h, S); },
    drawModel(ctx, w, h, S) {
      const p = S.p, g = D.geo(S), st = p.st, M = STS[st], c = CONT[S.cont]; K.bg(ctx, w, h, { benchY: g.by, top: st === 'pla' ? '#ede9fe' : undefined });
      // state chips
      SK.forEach((k, i) => { const cw = Math.min(118, (w - 90) / 5 - 6); C1.chip(ctx, 80 + cw / 2 + i * (cw + 6), 44, cw, 30, STS[k].ic + ' ' + STS[k].n, k === st, STS[k].c, { s: 12 }); });
      const path = () => { ctx.beginPath(); c.pts.forEach(([x, y], i) => i ? ctx.lineTo(g.X(x), g.Y(y)) : ctx.moveTo(g.X(x), g.Y(y))); ctx.closePath(); };
      K.raw(ctx, () => { path(); ctx.fillStyle = st === 'pla' ? 'rgba(76,29,149,.85)' : 'rgba(255,255,255,.55)'; ctx.fill(); });
      // plasma glow
      if (st === 'pla') K.raw(ctx, () => { ctx.save(); path(); ctx.clip(); const gg = ctx.createRadialGradient(g.X(200), g.Y(250), 10, g.X(200), g.Y(250), 260 * g.sc); gg.addColorStop(0, 'rgba(232,121,249,' + (.45 + .15 * Math.sin(S.t * 17)) + ')'); gg.addColorStop(1, 'rgba(232,121,249,0)'); ctx.fillStyle = gg; ctx.fillRect(g.X(0), g.Y(0), RW * g.sc, RH * g.sc); ctx.restore(); });
      // bonds
      const act = S.pts.filter(q => q.hx != null || S.t >= q.d);
      if (p.bond && st !== 'pla') K.raw(ctx, () => { const lim = (st === 'gas' ? 2.3 : 2.6) * PR; ctx.strokeStyle = st === 'liq' ? 'rgba(8,145,178,.45)' : st === 'gas' ? 'rgba(220,38,38,.35)' : 'rgba(124,58,237,.55)'; ctx.lineWidth = st === 'liq' ? 1.6 : 2.4; ctx.beginPath(); for (let i = 0; i < act.length; i++) for (let j = i + 1; j < act.length; j++) { const a = act[i], b = act[j]; if (Math.abs(a.x - b.x) < lim && Math.hypot(a.x - b.x, a.y - b.y) < lim) { ctx.moveTo(g.X(a.x), g.Y(a.y)); ctx.lineTo(g.X(b.x), g.Y(b.y)); } } ctx.stroke(); });
      // particles
      const col = { cry: '#3b82f6', amo: '#8b5cf6', liq: '#06b6d4', gas: '#ef4444', pla: '#f97316' }[st];
      act.forEach(q => { if (q.q < 0) { K.ball(ctx, g.X(q.x), g.Y(q.y), 4 * g.sc, '#38bdf8'); G.text(ctx, '−', g.X(q.x), g.Y(q.y), { s: 9, w: 900, c: '#fff', raw: 1 }); } else { K.ball(ctx, g.X(q.x), g.Y(q.y), PR * g.sc * (st === 'cry' || st === 'amo' ? .8 : st === 'liq' ? .93 : 1), col); if (q.q > 0) G.text(ctx, '+', g.X(q.x), g.Y(q.y) + 1, { s: 11, w: 900, c: '#fff', raw: 1 }); } });
      if (p.vel) act.forEach(q => { const v = Math.hypot(q.vx, q.vy); if (v > 5) K.raw(ctx, () => G.arrow(ctx, g.X(q.x), g.Y(q.y), g.X(q.x + q.vx * (st === 'pla' ? .07 : .12)), g.Y(q.y + q.vy * (st === 'pla' ? .07 : .12)), '#16a34a', 2, 7)); });
      // container outline (+ lid)
      K.raw(ctx, () => { path(); ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(g.X(c.pts[0][0]) + 5, g.Y(c.pts[0][1]) + 10, 5, 80); });
      if (S.cont !== 'cyl' && (st === 'gas' || st === 'pla')) { const [a, b] = [c.pts[0], c.pts[1]]; K.raw(ctx, () => { ctx.fillStyle = '#92400e'; rr(ctx, g.X(a[0]) - 6, g.Y(a[1]) - 14, (b[0] - a[0]) * g.sc + 12, 16, 5); ctx.fill(); }); K.tag(ctx, 'غطاء محكم', g.X(200), g.Y(a[1]) - 26, { s: 11, bg: '#92400e' }); }
      // piston
      if (S.cont === 'cyl') { const y = g.Y(S.pis), x0 = g.X(112), x1 = g.X(288); K.raw(ctx, () => { const pg = ctx.createLinearGradient(0, y - 22, 0, y); pg.addColorStop(0, '#cbd5e1'); pg.addColorStop(1, '#64748b'); ctx.fillStyle = pg; rr(ctx, x0, y - 20, x1 - x0, 20, 4); ctx.fill(); ctx.fillStyle = '#475569'; ctx.fillRect(g.X(200) - 6, g.oy - 40, 12, y - 20 - g.oy + 40); ctx.fillStyle = '#1e293b'; rr(ctx, g.X(200) - 40, g.oy - 50, 80, 16, 8); ctx.fill(); });
        if (S.noComp > 0) K.bubble(ctx, 'لا يمكن ضغط ' + (st === 'liq' ? 'السائل' : 'الصلب') + '! المسافات بين جزيئاته صغيرة', g.X(200), y - 26, { s: 12.5, bg: '#fee2e2', bd: '#dc2626', c: '#7f1d1d' });
        if (st === 'gas' || st === 'pla') { const gx = g.X(330), gy = g.Y(90); K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(gx, gy, 34, 0, TAU); ctx.fill(); ctx.stroke(); ctx.lineWidth = 1.5; for (let k = 0; k <= 8; k++) { const a = Math.PI * .75 + k * Math.PI * 1.5 / 8; ctx.beginPath(); ctx.moveTo(gx + Math.cos(a) * 26, gy + Math.sin(a) * 26); ctx.lineTo(gx + Math.cos(a) * 31, gy + Math.sin(a) * 31); ctx.stroke(); } const a = Math.PI * .75 + clamp(S.P / 4, 0, 1) * Math.PI * 1.5; ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + Math.cos(a) * 25, gy + Math.sin(a) * 25); ctx.stroke(); ctx.strokeStyle = '#334155'; ctx.beginPath(); ctx.moveTo(gx - 34, gy); ctx.lineTo(g.X(290), gy); ctx.stroke(); }); G.text(ctx, 'الضغط', gx, gy + 48, { s: 11.5, w: 800, c: '#334155', raw: 1 }); } }
      // volume marker
      if (st === 'liq' && act.length === S.pts.length) { const ys = act.map(q => q.y).sort((a, b) => a - b); const top = ys[6]; K.tag(ctx, 'حجم السائل نفسه في كل إناء', g.X(200), g.Y(top) - 28, { s: 11.5, bg: 'rgba(8,145,178,.9)' }); }
      if (st === 'gas' && !S._touched) K.tag(ctx, 'الغاز يملأ الإناء كله', g.X(200), g.by - 20, { s: 11.5, bg: 'rgba(220,38,38,.9)' });
      // container chips
      G.text(ctx, 'اسكب المادة في:', g.X(RW) + 4, g.by + 22, { s: 12, w: 900, c: '#fff', a: 'right', raw: 1 });
      Object.keys(CONT).forEach((k, i) => C1.chip(ctx, D.contX(g, i), g.by + 52, 118, 30, CONT[k].n, S.cont === k, '#0f766e'));
      // properties card
      if (p.props) { C1.card(ctx, g.px, 76, 232, [['الشكل: ' + M.shape, { s: 11.5 }], ['الحجم: ' + M.vol, { s: 11.5 }], ['المسافات: ' + M.gap, { s: 11.5 }], ['الحركة: ' + M.mv, { s: 11.5 }], ['أمثلة: ' + M.ex, { s: 11.5, c: '#475569' }]], { title: M.ic + ' ' + M.n, bd: M.c, lh: 21 }); }
      G.text(ctx, 'درجة الحرارة ' + ['منخفضة جداً', 'منخفضة', 'معتدلة', 'مرتفعة', 'مرتفعة جداً'][Math.min(4, (p.T - 1) / 2 | 0)] + ' 🌡️', g.px, g.by - 16, { s: 12, w: 800, c: '#9a3412', raw: 1, bg: 'rgba(255,237,213,.95)' });
    },
    contX(g, i) { return g.ox + RW * g.sc - 60 - i * 128; },
    /* ---------------- surface tension ---------------- */
    resetT(S) { S.soap = 0; S.obj = [{ k: 'clip', n: 'مشبك ورق', st: 'shelf', x: 0, y: 0, push: 0, dep: 8, wd: 46 }, { k: 'bug', n: 'حشرة', st: 'shelf', x: 0, y: 0, push: 0, dep: 5, wd: 26 }, { k: 'coin', n: 'قطعة نقود معدنية ثقيلة', st: 'shelf', x: 0, y: 0, push: 0, dep: 0, wd: 30 }]; S.hold = -1; },
    tGeo(S) { const w = S.W, h = S.H; return { w, h, x0: 90, x1: w - 30, ys: h * .5, yb: h * .84, by: h * .86, shelfY: h * .2, sx: [w * .3, w * .5, w * .68], soap: [w - 90, h * .22] }; },
    surfY(S, g, x) { let y = g.ys; S.obj.forEach((o, i) => { if (o.st !== 'float' && !(o.st === 'hold' && o.onW)) return; const dep = o.dep + o.push; if (o.k === 'bug') { [-18, -6, 6, 18].forEach(dx => { y += dep * Math.exp(-(((x - o.x - dx) / 7) ** 2)); }); } else y += dep * Math.exp(-(((x - o.x) / (o.wd / 2)) ** 2)); void i; }); return y; },
    stepT(S, dt) { const g = D.tGeo(S); S.obj.forEach(o => { if (o.st === 'sink') { o.vy = Math.min(120, (o.vy || 0) + 200 * dt); o.y = Math.min(g.yb - 10, o.y + o.vy * dt); } if (o.st === 'float') { o.push = Math.max(0, o.push - dt * 40); if (S.soap > .5 && o.k !== 'coin') { o.st = 'sink'; o.vy = 10; S.msg = 'الصابون قلّل الشد السطحي فغاص ' + o.n + '!'; } } }); if (S.soap > 0 && S.soap < 1) S.soap = Math.min(1, S.soap + dt); },
    objPos(S, o, i, g) { if (o.st === 'shelf') return [g.sx[i], g.shelfY]; if (o.st === 'float') return [o.x, D.surfY(S, g, o.x) - (o.k === 'bug' ? 8 : 3)]; return [o.x, o.y]; },
    drawObj(ctx, o, x, y, t) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y);
      if (o.k === 'clip') { ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-18, 0); ctx.lineTo(16, 0); ctx.arc(16, -5, 5, Math.PI / 2, -Math.PI / 2, true); ctx.lineTo(-14, -10); ctx.arc(-14, -5, 5, -Math.PI / 2, Math.PI / 2, true); ctx.lineTo(10, 0); ctx.stroke(); ctx.lineCap = 'butt'; }
      else if (o.k === 'bug') { ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 1.6; [-18, -6, 6, 18].forEach(dx => { ctx.beginPath(); ctx.moveTo(dx * .3, -6); ctx.quadraticCurveTo(dx * .8, -14, dx, 6); ctx.stroke(); }); ctx.fillStyle = '#78350f'; ctx.beginPath(); ctx.ellipse(0, -8, 12, 4, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(13, -9, 3, 0, TAU); ctx.fill(); }
      else { const gg = ctx.createLinearGradient(-14, -14, 14, 14); gg.addColorStop(0, '#fde68a'); gg.addColorStop(1, '#a16207'); ctx.fillStyle = gg; ctx.beginPath(); ctx.ellipse(0, -3, 15, 5, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#854d0e'; ctx.stroke(); }
      ctx.restore(); }); void t; },
    drawT(ctx, w, h, S) {
      const g = D.tGeo(S), p = S.p; K.bg(ctx, w, h, { benchY: g.by });
      // shelf
      K.raw(ctx, () => { ctx.fillStyle = '#b7793f'; rr(ctx, g.sx[0] - 70, g.shelfY + 6, g.sx[2] - g.sx[0] + 140, 10, 4); ctx.fill(); });
      // water
      K.raw(ctx, () => { ctx.beginPath(); ctx.moveTo(g.x0, g.yb); for (let x = g.x0; x <= g.x1; x += 4) ctx.lineTo(x, D.surfY(S, g, x)); ctx.lineTo(g.x1, g.yb); ctx.closePath(); const wg = ctx.createLinearGradient(0, g.ys, 0, g.yb); wg.addColorStop(0, S.soap ? 'rgba(147,197,253,.75)' : 'rgba(125,211,252,.7)'); wg.addColorStop(1, 'rgba(14,116,144,.6)'); ctx.fillStyle = wg; ctx.fill();
        ctx.strokeStyle = S.soap ? '#a855f7' : '#0369a1'; ctx.lineWidth = 2.5; ctx.beginPath(); for (let x = g.x0; x <= g.x1; x += 4) { const y = D.surfY(S, g, x); x === g.x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
        if (S.soap) { ctx.fillStyle = 'rgba(216,180,254,.5)'; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.arc(g.x0 + 30 + i * (g.x1 - g.x0 - 60) / 13, g.ys - 2 + Math.sin(i * 3) * 2, 4 + (i % 3), 0, TAU); ctx.fill(); } }
        ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.x0 - 6, g.ys - 60); ctx.lineTo(g.x0 - 6, g.yb + 6); ctx.lineTo(g.x1 + 6, g.yb + 6); ctx.lineTo(g.x1 + 6, g.ys - 60); ctx.stroke(); });
      // surface membrane label
      if (p.bond) { K.raw(ctx, () => { ctx.strokeStyle = 'rgba(3,105,161,.5)'; ctx.setLineDash([3, 5]); ctx.lineWidth = 1.5; ctx.beginPath(); for (let x = g.x0; x <= g.x1; x += 4) { const y = D.surfY(S, g, x) + 5; x === g.x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); ctx.setLineDash([]); });
        K.tag(ctx, S.soap ? 'الصابون أضعف «الغشاء» — الشد السطحي قلّ' : 'سطح الماء يعمل كغشاء رقيق مرن (الشد السطحي)', (g.x0 + g.x1) / 2 + 90, g.ys + 78, { s: 12, bg: S.soap ? '#7e22ce' : '#0369a1' }); }
      // objects
      S.obj.forEach((o, i) => { const [x, y] = D.objPos(S, o, i, g); D.drawObj(ctx, o, x, y, S.t); if (o.st === 'shelf') G.text(ctx, o.n, x, g.shelfY + 30, { s: 11.5, w: 800, c: '#334155', raw: 1 });
        if (o.st === 'float' && p.bond) { K.force(ctx, x + 30, y - 4, 0, 30, 'الوزن', '#dc2626', 3); K.force(ctx, x - 30, y + 20, 0, -30, 'الشد السطحي', '#16a34a', 3); } });
      // soap bottle
      const [sx, sy] = g.soap; C1.bottle(ctx, sx, sy + 50, 44, 90, .7, '#d8b4fe', 'صابون', S.soap ? -.9 : 0, { capCol: '#7e22ce' }); if (!S.soap) G.text(ctx, 'انقر لإضافة الصابون', sx, sy + 66, { s: 11, w: 800, c: '#6b21a8', raw: 1 });
      // zoom lens on molecules at the surface
      if (p.zoom) { const lx = 170, ly = g.ys + (g.yb - g.ys) * .55, R = 62; K.lens(ctx, lx, ly, R, () => { ctx.fillStyle = 'rgba(125,211,252,.45)'; ctx.fillRect(lx - R, ly - 18, 2 * R, 2 * R); ctx.fillStyle = '#e0f2fe'; ctx.fillRect(lx - R, ly - R, 2 * R, R - 18);
          for (let i = -3; i <= 3; i++) for (let j = 0; j < 4; j++) K.ball(ctx, lx + i * 18 + (j % 2) * 9, ly - 10 + j * 18, 7, '#0ea5e9');
          K.ball(ctx, lx, ly - 10, 8, '#f97316'); [[0, 1], [-1, 0], [1, 0]].forEach(([a, b]) => G.arrow(ctx, lx, ly - 10, lx + a * 22, ly - 10 + b * 22, '#dc2626', 2, 6));
          K.ball(ctx, lx + 9, ly + 26, 8, '#22c55e'); [[0, 1], [0, -1], [-1, 0], [1, 0]].forEach(([a, b]) => G.arrow(ctx, lx + 9, ly + 26, lx + 9 + a * 18, ly + 26 + b * 18, '#15803d', 2, 6)); });
        K.tag(ctx, 'جزيء السطح يُسحب للداخل ↓', lx + 5, ly - R - 30, { s: 11, bg: '#ea580c' }); K.tag(ctx, 'جزيء داخلي: قوى متزنة', lx + 5, ly + R + 18, { s: 11, bg: '#15803d' }); }
      const msg = S.msg || (S.obj.every(o => o.st === 'shelf') ? 'اسحب المشبك أو الحشرة إلى سطح الماء ✋' : S.obj.some(o => o.st === 'float') && !S.soap ? 'اضغط المشبك إلى الأسفل بقوة… أو أضف الصابون!' : null);
      if (msg) K.bubble(ctx, msg, (g.x0 + g.x1) / 2 + 60, g.ys - 70, { s: 13 });
    },
    /* ---------------- viscosity race ---------------- */
    resetV(S) { S.balls = LQ.map((q, i) => ({ i, st: 'rack', y: 0, v: 0, t: 0, done: false, x: null })); S.rank = 0; },
    dropAll(S) { D.resetV(S); S.balls.forEach(b => { b.st = 'fall'; b.y = 0; b.v = 0; b.t = 0; }); },
    vGeo(S) { const w = S.W, h = S.H; const aw = w - 90; return { w, h, xs: LQ.map((_, i) => 80 + aw * (i + .5) / 3), top: h * .24, bot: h * .84, tw: Math.min(86, aw / 3 - 60), by: h * .86 }; },
    stepV(S, dt) { const g = D.vGeo(S); const L = g.bot - g.top - 16; S.balls.forEach(b => { if (b.st !== 'fall' || b.done) return; const vt = LQ[b.i].v * L / 470; b.v += (vt - b.v) * Math.min(1, dt * 8); b.y += b.v * dt; b.t += dt; if (b.y >= L) { b.y = L; b.done = true; b.rank = ++S.rank; if (S.rank === 3) K.cheer(S, S.W / 2, S.H * .3); } }); },
    drawV(ctx, w, h, S) {
      const g = D.vGeo(S), p = S.p; K.bg(ctx, w, h, { benchY: g.by });
      G.text(ctx, 'سباق الكرات: في أي سائل تنزل الكرة أسرع؟', w / 2 + 30, 26, { s: 15, w: 900, c: '#0f172a', raw: 1 });
      LQ.forEach((q, i) => { const x = g.xs[i], tw = g.tw; K.raw(ctx, () => { ctx.globalAlpha = q.a; ctx.fillStyle = q.c; ctx.fillRect(x - tw / 2 + 2, g.top + 20, tw - 4, g.bot - g.top - 22); ctx.globalAlpha = 1; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - tw / 2, g.top); ctx.lineTo(x - tw / 2, g.bot); ctx.lineTo(x + tw / 2, g.bot); ctx.lineTo(x + tw / 2, g.top); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.fillRect(x - tw / 2 + 5, g.top + 24, 5, g.bot - g.top - 40);
          ctx.fillStyle = '#475569'; rr(ctx, x - tw / 2 - 16, g.bot, tw + 32, 12, 4); ctx.fill(); });
        K.tag(ctx, q.n, x, g.bot + 30, { s: 14, bg: shade(q.c, -60) });
        const b = S.balls[i]; const L = g.bot - g.top - 16; let bx = x, by = g.top - 26; if (b.st === 'fall') by = g.top + 12 + b.y; else if (b.x != null) { bx = b.x; by = b.yy; }
        K.ball(ctx, bx, by, 11, '#94a3b8');
        if (b.st === 'fall') { K.tag(ctx, fmt(b.t, 2) + ' s', x + tw / 2 + 34, Math.min(by, g.bot - 20), { s: 12, bg: '#0f172a' }); if (b.done) K.tag(ctx, ['', '🥇 الأسرع', '🥈 الثاني', '🐢 الأبطأ'][b.rank], x, g.top - 30, { s: 13, bg: ['', '#16a34a', '#2563eb', '#dc2626'][b.rank] }); }
        if (p.vel && b.st === 'fall' && !b.done) K.raw(ctx, () => G.arrow(ctx, bx - 22, by, bx - 22, by + clamp(b.v * .25, 6, 60), '#16a34a', 2.5, 8));
        if (p.zoom) { const cx = x, cy = g.top + (g.bot - g.top) * .7, R = Math.min(34, tw / 2 - 4); K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R - 2, 0, TAU); ctx.clip();
            const sp = [9, 3, .8][i], R0 = C1.rng(5 + i), P = []; for (let k = 0; k < 11; k++) { const a0 = R0() * TAU; P.push([cx + Math.cos(a0 + S.t * sp * .3) * R0() * (R - 8), cy + Math.sin(a0 * 1.3 + S.t * sp * .25) * R0() * (R - 8)]); }
            if (p.bond) { ctx.strokeStyle = shade(q.c, -70); ctx.lineWidth = [0, 1.5, 3][i]; if (i) { ctx.beginPath(); P.forEach((a, k) => P.forEach((b2, j) => { if (j > k && Math.hypot(a[0] - b2[0], a[1] - b2[1]) < [0, 16, 22][i]) { ctx.moveTo(a[0], a[1]); ctx.lineTo(b2[0], b2[1]); } })); ctx.stroke(); } }
            P.forEach(a => K.ball(ctx, a[0], a[1], 4.5, shade(q.c, -30))); ctx.restore(); });
          G.text(ctx, ['تجاذب ضعيف', 'تجاذب متوسط', 'تجاذب قوي'][i], cx, cy + R + 12, { s: 11, w: 800, c: '#334155', raw: 1, bg: 'rgba(255,255,255,.85)' }); }
      });
      if (S.balls.every(b => b.st === 'rack')) K.bubble(ctx, 'اسحب كل كرة إلى فوهة الأنبوب ✋', g.xs[1], g.top - 44, { s: 12.5 });
      K.party(ctx, S);
    },
    /* ---------------- interaction ---------------- */
    drags(S) {
      const md = S.p.mode, L = [];
      if (md === 'model') { const g = D.geo(S);
        SK.forEach((k, i) => { const cw = Math.min(118, (S.W - 90) / 5 - 6); L.push({ id: 'st_' + k, x: 80 + cw / 2 + i * (cw + 6), y: 44, w: cw, h: 30, hint: false, tip: 'اختر حالة المادة: ' + STS[k].n, click: S => { setParam(S, 'st', k); } }); });
        Object.keys(CONT).forEach((k, i) => L.push({ id: 'c_' + k, x: D.contX(g, i), y: g.by + 52, w: 118, h: 30, hint: false, tip: 'اسكب المادة في ' + CONT[k].n, click: S => { S.cont = k; S.pis = 20; S.pisT = null; D.pour(S); } }));
        if (S.cont === 'cyl') L.push({ id: 'piston', x: g.X(200), y: g.oy - 42, w: 80, h: 26, axis: 'y', idle: 'اسحب المكبس إلى الأسفل ✋', tip: 'اسحب المكبس لأسفل لضغط المادة',
          drag: (S, d) => { const want = clamp(S.pis + d.dy / g.sc, 20, 340), mp = D.minPis(S); if (want > mp + 6 && S.p.st !== 'gas' && S.p.st !== 'pla') S.noComp = 1.6; const np = Math.min(want, mp); S.pv = (np - S.pis) * 30; S.pis = np; } });
        return L; }
      if (md === 'tension') { const g = D.tGeo(S);
        S.obj.forEach((o, i) => { if (o.st === 'sink') return; const [x, y] = D.objPos(S, o, i, g); L.push({ id: 'o_' + o.k, x, y: y - 6, r: 26, axis: 'xy', hint: i === 0, idle: i === 0 ? 'اسحب المشبك إلى سطح الماء ✋' : undefined, tip: o.st === 'float' ? 'اسحب إلى الأسفل للضغط على سطح الماء' : 'اسحب إلى سطح الماء',
          down: S => { o.wasF = o.st === 'float'; o.x = x; o.y = y; if (!o.wasF) o.st = 'hold'; o.oy0 = y; }, drag: (S, d) => { o.x = clamp(d.ox + d.x - d.sx, g.x0 + 20, g.x1 - 20); if (o.wasF) { o.push = clamp((d.y - d.sy) * .6, 0, 40); if (o.push > 24) { o.st = 'sink'; o.y = D.surfY(S, g, o.x); o.vy = 20; S.msg = 'ضغطتَ بقوة كبيرة فانكسر «الغشاء» وغاص ' + o.n + '!'; C1.wrong(); } } else { o.y = d.oy + d.y - d.sy; } },
          up: S => { if (o.wasF) { o.push = 0; return; } if (o.st !== 'hold') return; if (o.x > g.x0 && o.x < g.x1 && Math.abs(o.y - g.ys) < 70) { if (o.k === 'coin') { o.st = 'sink'; o.y = g.ys; o.vy = 30; S.msg = 'قطعة النقود ثقيلة جداً: وزنها أكبر من قوة الشد السطحي فغاصت'; } else if (S.soap) { o.st = 'sink'; o.y = g.ys; o.vy = 10; S.msg = 'الماء فيه صابون: الشد السطحي ضعيف فغاص ' + o.n; } else { o.st = 'float'; S.msg = null; C1.good(); } } else o.st = 'shelf'; } }); });
        L.push({ id: 'soap', x: g.soap[0], y: g.soap[1] + 10, w: 50, h: 90, hint: false, tip: 'انقر لإضافة قطرة صابون', click: S => { if (!S.soap) { S.soap = .01; } } });
        return L; }
      const g = D.vGeo(S);
      S.balls.forEach((b, i) => { if (b.st === 'fall') return; const x = b.x ?? g.xs[i], y = b.x != null ? b.yy : g.top - 26; L.push({ id: 'ball' + i, x, y, r: 20, axis: 'xy', hint: i === 0, tip: 'اسحب الكرة إلى فوهة الأنبوب',
        down: S => { b.x = x; b.yy = y; }, drag: (S, d) => { b.x = d.ox + d.x - d.sx; b.yy = d.oy + d.y - d.sy; S.lastB = i + ':' + Math.round(b.x); },
        up: S => { const k = g.xs.findIndex(X => Math.abs(X - b.x) < g.tw / 2 + 20); if (k >= 0 && b.yy > g.top - 60) { const bb = S.balls[k]; if (bb.st !== 'fall') { bb.st = 'fall'; bb.y = 0; bb.v = 0; bb.t = 0; bb.done = false; } if (k !== i) b.x = null; else b.x = null; } else b.x = null; } }); });
      return L;
    },
    readings(S) { const md = S.p.mode, M = STS[S.p.st];
      if (md === 'tension') return [rd('الشد السطحي', S.soap ? 'ضعيف (يوجد صابون)' : 'قوي — ماء نقي'), rd('طافٍ على السطح', S.obj.filter(o => o.st === 'float').map(o => o.n).join('، ') || '—', 1), rd('غاص', S.obj.filter(o => o.st === 'sink').map(o => o.n).join('، ') || '—', 1)];
      if (md === 'visc') return S.balls.map((b, i) => rd('زمن النزول في ' + LQ[i].n, b.st === 'fall' ? fmt(b.t, 2) + ' s' + (b.done ? ' ✓' : '') : '—'));
      return [rd('الحالة', M.ic + ' ' + M.n), rd('الإناء', CONT[S.cont].n), rd('الشكل', M.shape, 1), rd('الحجم', M.vol, 1), (S.p.st === 'gas' || S.p.st === 'pla') && S.cont === 'cyl' ? rd('حجم الغاز النسبي', Math.round((360 - S.pis) / 3.4) + ' %') : rd('ينضغط؟', S.p.st === 'gas' || S.p.st === 'pla' ? 'نعم — يمكن ضغطه' : 'لا يمكن ضغطه تقريباً')]; },
    record(S) { if (S.p.mode !== 'visc') { Runner.toast('الجدول لسباق اللزوجة: انتقل إلى «اللزوجة»', 'info'); return null; } const done = S.balls.filter(b => b.done); if (!done.length) { Runner.toast('انتظر حتى تصل كرة إلى القاع', 'info'); return null; } const b = done[done.length - 1]; return { liq: LQ[b.i].n, t: +b.t.toFixed(2), r: ['', 'الأسرع', 'الثاني', 'الأبطأ'][b.rank], vis: ['صغيرة', 'متوسطة', 'كبيرة'][b.i] }; },
    cols: [['liq', 'السائل'], ['t', 'زمن النزول (s)'], ['r', 'الترتيب'], ['vis', 'اللزوجة']],
    explain(S) { const md = S.p.mode, st = S.p.st;
      if (md === 'tension') return S.soap ? 'الصابون يُضعف قوى التماسك بين جزيئات سطح الماء، فيقل <b>الشد السطحي</b> ولا يستطيع السطح حمل المشبك.' : 'جزيئات السطح تُسحب نحو الداخل (للأسفل)، فيتصرف السطح كأنه <b>غشاء رقيق مرن</b> يحمل الأجسام الخفيفة مثل المشبك والحشرة. انظر إلى الانخفاض الصغير في السطح تحتها!';
      if (md === 'visc') return 'قوى التجاذب بين جزيئات العسل كبيرة فهو <b>يقاوم الانسياب</b> (لزوجته كبيرة) فتنزل الكرة فيه ببطء. الماء لزوجته صغيرة فتنزل الكرة فيه بسرعة.';
      return { cry: 'جزيئات <b>الصلب البلوري</b> مرتبة بنمط منتظم متكرر وتهتز فقط حول مواضعها؛ لذلك له شكل وحجم ثابتان ولا يأخذ شكل الإناء ولا ينضغط.', amo: 'جزيئات <b>الصلب غير البلوري</b> (كالشمع والمطاط والزجاج) مرتبة عشوائياً، لكنها أيضاً متقاربة جداً وتهتز في مواضعها فقط.', liq: 'جزيئات <b>السائل</b> تنزلق بجانب بعضها فيجري السائل ويأخذ <b>شكل الإناء</b>، لكن حجمه يبقى ثابتاً ولا ينضغط لأن جزيئاته متقاربة.', gas: 'جزيئات <b>الغاز</b> متباعدة جداً وتتحرك بسرعة في كل الاتجاهات، لذلك <b>يملأ الغاز الإناء كله</b> ويمكن ضغطه بسهولة.', pla: '<b>البلازما</b> غاز ساخن جداً انفصلت فيه الإلكترونات (−) عن الأيونات (+)، فجسيماتها مشحونة ولها طاقة هائلة وتتوهج.' }[st]; },
    quiz: [
      { q: 'أي حالات المادة لها حجم محدد وشكل متغير (تأخذ شكل الوعاء)؟', o: ['الصلبة', 'السائلة', 'الغازية'], a: 1, why: 'السائل حجمه ثابت، لكن جزيئاته تنزلق فيأخذ شكل الإناء.' },
      { q: 'اذكر مثالاً لمادة يصعب ضغطها ولا تنساب ويكون شكلها ثابتاً:', o: ['الهواء', 'الماء', 'الحديد'], a: 2, why: 'الحديد مادة صلبة: شكلها وحجمها ثابتان.' },
      { q: 'أيٌّ مما يلي مادة صلبة متبلورة؟', o: ['الزجاج', 'المطاط', 'الجليد'], a: 2, why: 'جزيئات الجليد (والماس) مرتبة بنمط منتظم، أما الزجاج والمطاط فغير بلورية.' }
    ]
  };
  X7(D);
})();

/* ---------- كيف أقيس حجوم الأجسام الصلبة ذات الأشكال المنتظمة؟ (ص 13) ---------- */
(() => {
  const DX = .58, DY = .42; // oblique projection of depth
  const D = {
    id: 'g7_vol_regular', ch: 11, sec: 'الدرس 2', page: 13, kind: 'نشاط', title: 'قياس حجم الأجسام المنتظمة: المكعب ومتوازي المستطيلات',
    desc: 'نقيس أبعاد صندوق (الطول والعرض والارتفاع) بالمسطرة ونحسب حجمه V = L × W × h، ونتحقق بعدّ المكعبات الصغيرة (1 cm³) التي تملؤه.',
    tags: 'حجم مكعب متوازي مستطيلات طول عرض ارتفاع cm3',
    tools: ['صندوق على شكل متوازي مستطيلات', 'مكعب', 'مسطرة', 'مكعبات صغيرة حجم كل منها 1 cm³'],
    steps: ['اسحب المقابض الملونة لتغيير أبعاد الصندوق: الأحمر للطول L، والأخضر للعرض W، والأزرق للارتفاع h.',
      'اسحب المسطرة الصفراء وضع صفرها عند زاوية الصندوق لقياس الطول (انقر زر ⟳ على المسطرة لتدويرها وقياس الارتفاع).',
      'احسب الحجم: V = L × W × h — وتأكد من بطاقة الحساب.',
      'اضغط «املأ بالمكعبات» وعُدّ المكعبات الصغيرة (كل منها 1 cm³). هل يساوي عددها الحجم الذي حسبته؟',
      'مثال الكتاب: صندوق 5cm × 3cm × 4cm — اضغط «مثال الكتاب» وتحقق أن حجمه 60 cm³.',
      'بدّل الشكل إلى «مكعب» وجرّب V = a³. سجّل النتائج في الجدول.'],
    concl: ['الحجم هو مقدار الحيز الذي تشغله المادة، ويقاس للأجسام الصلبة بالوحدات المكعبة (cm³ أو m³).', 'حجم متوازي المستطيلات = الطول × العرض × الارتفاع (V = L × W × h).', 'حجم المكعب = طول الضلع × نفسه × نفسه (V = a³).', 'عدد المكعبات الصغيرة (1 cm³) التي تملأ الصندوق يساوي حجمه.'],
    laws: ['g7_vbox', 'g7_vcube', 'g7_units'],
    fact: ['1 m³ = 1000000 cm³ — أي أن مكعباً طول ضلعه متر واحد يتسع لمليون مكعب صغير طول ضلع كل منها 1 cm!', 'حجم الكرة V = ⁴⁄₃ π r³ وحجم الأسطوانة V = π r² h (للاطلاع).', 'لا يمكن لمادتين أن تشغلا الحيز نفسه وفي الوقت نفسه.'],
    controls: [
      SEL('shape', 'الشكل', [['box', 'متوازي مستطيلات'], ['cube', 'مكعب']], 'box', (v, S) => { if (v === 'cube') { setParam(S, 'W', S.p.L); setParam(S, 'h', S.p.L); } S.fillN = 0; S.filling = false; }),
      R('L', 'الطول L', 1, 10, 5, 1, 'cm', (v, S) => D.sync(S, 'L')), R('W', 'العرض W', 1, 7, 3, 1, 'cm', (v, S) => D.sync(S, 'W')), R('h', 'الارتفاع h', 1, 7, 4, 1, 'cm', (v, S) => D.sync(S, 'h')),
      BT('', [{ t: 'املأ بالمكعبات 1 cm³', cls: 'primary', on: S => { setParam(S, 'cubes', true); S.fillN = 0; S.filling = true; } }, { t: 'مثال الكتاب 5×3×4', on: S => { setParam(S, 'shape', 'box'); setParam(S, 'L', 5); setParam(S, 'W', 3); setParam(S, 'h', 4); } }]),
      TG('dims', 'الأبعاد على الشكل', true, null, 'labels'), TG('cubes', 'المكعبات الصغيرة (العدّ)', false, null, 'grid'), TG('calc', 'بطاقة حساب الحجم', true, null, 'graph')],
    setup(S) { S.fillN = 0; S.filling = false; S.rx = null; S.ry = null; S.rv = false; S.fn = 0; },
    sync(S, k) { S.fillN = 0; S.filling = false; if (S.p.shape === 'cube') { const v = Math.min(S.p[k], 7); ['L', 'W', 'h'].forEach(q => { if (S.p[q] !== v) setParam(S, q, v, false); }); } },
    V(S) { return S.p.L * S.p.W * S.p.h; },
    geo(S) { const w = S.W, h = S.H, by = h * .8; const ppc = clamp(Math.min((w - 220) / (10 + 7 * DX), h * .52 / (7 + 7 * DY)), 18, 46); return { w, h, by, ppc, x0: 100, y0: by - 14 }; },
    P(g, x, y, z) { return [g.x0 + (x + z * DX) * g.ppc, g.y0 - (y + z * DY) * g.ppc]; },
    update(S, dt) { if (S.filling) { const V = D.V(S); S.fillN = Math.min(V, S.fillN + dt * Math.max(8, V / 4)); if (S.fillN >= V) { S.filling = false; K.cheer(S, S.W * .4, S.H * .3); } } S.fn = Math.floor(S.fillN); },
    faces(ctx, g, x, y, z, a, b, c, col, alpha = 1, stroke = 'rgba(15,23,42,.55)') { const P = (X, Y, Z) => D.P(g, X, Y, Z); const poly = (pts, f) => { ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.fillStyle = f; ctx.fill(); ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke(); };
      ctx.globalAlpha = alpha; poly([P(x, y, z), P(x + a, y, z), P(x + a, y + b, z), P(x, y + b, z)], col[0]); poly([P(x, y + b, z), P(x + a, y + b, z), P(x + a, y + b, z + c), P(x, y + b, z + c)], col[1]); poly([P(x + a, y, z), P(x + a, y, z + c), P(x + a, y + b, z + c), P(x + a, y + b, z)], col[2]); ctx.globalAlpha = 1; },
    handles(S, g) { const { L, W, h } = S.p; return [{ k: 'L', c: '#dc2626', p: D.P(g, L, h / 2, 0), dir: 0 }, { k: 'h', c: '#2563eb', p: D.P(g, L / 2, h, W / 2), dir: -Math.PI / 2 }, { k: 'W', c: '#16a34a', p: D.P(g, L, 0, W), dir: -Math.atan2(DY, DX) }]; },
    rulerPos(S, g) { return [S.rx ?? g.w - 250, S.ry ?? g.by + 34]; },
    draw(ctx, w, h, S) {
      const p = S.p, g = D.geo(S), { L, W } = p, H = p.h, V = L * W * H; K.bg(ctx, w, h, { benchY: g.by });
      K.raw(ctx, () => { // shadow
        ctx.fillStyle = 'rgba(60,30,10,.2)'; const a = D.P(g, 0, 0, 0), b = D.P(g, L, 0, 0), c = D.P(g, L, 0, W), d = D.P(g, 0, 0, W); ctx.beginPath(); ctx.moveTo(a[0] + 6, a[1] + 4); ctx.lineTo(b[0] + 10, b[1] + 4); ctx.lineTo(c[0] + 10, c[1] + 4); ctx.lineTo(d[0] + 6, d[1] + 4); ctx.fill(); });
      if (p.cubes) { // glass box + unit cubes
        K.raw(ctx, () => { D.faces(ctx, g, 0, 0, 0, L, H, W, ['rgba(224,242,254,.35)', 'rgba(224,242,254,.35)', 'rgba(186,230,253,.35)'], 1, 'rgba(3,105,161,.35)');
          const n = S.filling || S.fillN > 0 ? S.fn : V; let k = 0; const cols = ['#fbbf24', '#f59e0b', '#d97706'];
          for (let y = 0; y < H; y++) for (let z = W - 1; z >= 0; z--) for (let x = 0; x < L; x++) { if (k >= n) break; const hue = (y % 2) ? ['#60a5fa', '#3b82f6', '#1d4ed8'] : cols; D.faces(ctx, g, x, y, z, 1, 1, 1, hue); k++; }
          const E = (a, b) => { const A = D.P(g, ...a), B = D.P(g, ...b); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); }; ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 2; ctx.beginPath(); E([0, 0, 0], [L, 0, 0]); E([L, 0, 0], [L, H, 0]); E([L, H, 0], [0, H, 0]); E([0, H, 0], [0, 0, 0]); E([0, H, 0], [0, H, W]); E([L, H, 0], [L, H, W]); E([L, 0, 0], [L, 0, W]); E([L, 0, W], [L, H, W]); E([0, H, W], [L, H, W]); ctx.stroke(); });
        const c = D.P(g, L / 2, H + 0.3, W / 2); K.tag(ctx, 'عدد المكعبات = ' + (S.filling || S.fillN > 0 ? S.fn : V), c[0], c[1] - 34, { s: 14, bg: '#1d4ed8' });
      } else K.raw(ctx, () => { const cub = p.shape === 'cube'; D.faces(ctx, g, 0, 0, 0, L, H, W, cub ? ['#a5b4fc', '#c7d2fe', '#818cf8'] : ['#d6a86a', '#e8c48f', '#b98543']); if (!cub) { ctx.strokeStyle = 'rgba(120,70,20,.5)'; ctx.lineWidth = 3; const a = D.P(g, L / 2, H, 0), b = D.P(g, L / 2, H, W); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); } });
      // dimension labels
      if (p.dims) { const lab = (a, b, t, col, off) => { const A = D.P(g, ...a), B = D.P(g, ...b); K.raw(ctx, () => { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(A[0] + off[0], A[1] + off[1]); ctx.lineTo(B[0] + off[0], B[1] + off[1]); ctx.stroke(); [A, B].forEach(Q => { ctx.beginPath(); ctx.arc(Q[0] + off[0], Q[1] + off[1], 3, 0, TAU); ctx.fillStyle = col; ctx.fill(); }); }); K.tag(ctx, t, (A[0] + B[0]) / 2 + off[0] * 2.2, (A[1] + B[1]) / 2 + off[1] * 2.2, { s: 13, bg: col }); };
        const cube = p.shape === 'cube'; lab([0, 0, 0], [L, 0, 0], (cube ? 'a' : 'L') + ' = ' + L + ' cm', '#dc2626', [0, 16]); lab([0, 0, 0], [0, H, 0], (cube ? 'a' : 'h') + ' = ' + H + ' cm', '#2563eb', [-16, 0]); lab([L, 0, 0], [L, 0, W], (cube ? 'a' : 'W') + ' = ' + W + ' cm', '#16a34a', [16, 6]); }
      // handles
      D.handles(S, g).forEach(H2 => K.raw(ctx, () => { ctx.fillStyle = H2.c; ctx.beginPath(); ctx.arc(H2.p[0], H2.p[1], 11, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.stroke(); }));
      // calc card
      if (p.calc) { const cube = p.shape === 'cube'; C1.card(ctx, w - 170, 20, 250, cube ? [`V = a³ = ${L}³`, `V = ${L} × ${L} × ${L}`, [`V = ${V} cm³`, { s: 17, w: 900, c: '#6d28d9' }]] : ['V = L × W × h', `V = ${L} cm × ${W} cm × ${H} cm`, [`V = ${V} cm³`, { s: 17, w: 900, c: '#6d28d9' }]], { title: cube ? 'حجم المكعب' : 'حجم متوازي المستطيلات', lh: 24 });
        if (!S.filling && S.fillN >= V && p.cubes) G.text(ctx, '✓ عدد المكعبات = الحجم', w - 170, 140, { s: 13, w: 900, c: '#15803d', raw: 1, bg: 'rgba(220,252,231,.95)' }); }
      // ruler
      const [rx, ry] = D.rulerPos(S, g), RL = 12; K.ruler(ctx, rx, ry, RL * g.ppc, RL, S.rv ? { rot: -Math.PI / 2 } : {});
      const bx = S.rv ? rx + 10 : rx - 18, byy = S.rv ? ry + 18 : ry + 10; K.raw(ctx, () => { ctx.fillStyle = '#a16207'; ctx.beginPath(); ctx.arc(bx, byy, 11, 0, TAU); ctx.fill(); }); G.text(ctx, '⟳', bx, byy + 1, { s: 14, w: 900, c: '#fff', raw: 1 });
      const sn = D.snap(S, g); if (sn) K.tag(ctx, (S.rv ? 'h' : 'L') + ' = ' + sn + ' cm ✓', S.rv ? rx + 70 : rx + RL * g.ppc / 2, S.rv ? ry - RL * g.ppc / 2 : ry + 40, { s: 13, bg: '#16a34a' });
      K.party(ctx, S);
    },
    snap(S, g) { const [rx, ry] = D.rulerPos(S, g); if (!S.rv && Math.abs(rx - g.x0) < 1 && Math.abs(ry - (g.y0 + 4)) < 1) return S.p.L; if (S.rv && Math.abs(rx - (g.x0 - 26)) < 1 && Math.abs(ry - g.y0) < 1) return S.p.h; return 0; },
    drags(S) {
      const g = D.geo(S), L = [];
      D.handles(S, g).forEach((H2, i) => L.push({ id: 'h_' + H2.k, x: H2.p[0], y: H2.p[1], r: 16, dir: H2.dir, idle: i === 0 ? 'اسحب لتغيير الطول ✋' : undefined, hint: i === 0, tip: { L: 'اسحب لتغيير الطول L', h: 'اسحب لتغيير الارتفاع h', W: 'اسحب لتغيير العرض W' }[H2.k],
        down: S => { S._v0 = S.p[H2.k]; }, drag: (S, d) => { const ex = Math.cos(H2.dir), ey = Math.sin(H2.dir); const along = (d.x - d.sx) * ex + (d.y - d.sy) * ey; const k = H2.k === 'W' ? 1 / Math.hypot(DX, DY) : 1; setParam(S, H2.k, Math.round(S._v0 + along / g.ppc * k)); } }));
      const [rx, ry] = D.rulerPos(S, g), RL = 12 * g.ppc;
      L.push({ id: 'ruler', x: S.rv ? rx + 9 : rx + RL / 2, y: S.rv ? ry - RL / 2 : ry + 9, w: S.rv ? 24 : RL, h: S.rv ? RL : 24, axis: 'xy', hint: false, tip: 'اسحب المسطرة إلى حافة الصندوق للقياس',
        keep: true, down: S => { S.rx = rx; S.ry = ry; }, drag: (S, d) => { let x = rx + d.x - d.sx, y = ry + d.y - d.sy; if (!S.rv && Math.hypot(x - g.x0, y - (g.y0 + 4)) < 26) { x = g.x0; y = g.y0 + 4; } if (S.rv && Math.hypot(x - (g.x0 - 26), y - g.y0) < 26) { x = g.x0 - 26; y = g.y0; } S.rx = clamp(x, 70, g.w - 30); S.ry = clamp(y, 30, g.h - 20); } });
      L.push({ id: 'rrot', x: S.rv ? rx + 10 : rx - 18, y: S.rv ? ry + 18 : ry + 10, r: 13, hint: false, tip: 'تدوير المسطرة (أفقي/عمودي)', click: S => { S.rv = !S.rv; } });
      return L;
    },
    readings(S) { const V = D.V(S); return [rd('الطول L', S.p.L + ' cm'), rd('العرض W', S.p.W + ' cm'), rd('الارتفاع h', S.p.h + ' cm'), rd('الحجم V', V + ' cm³ = ' + V + ' mL'), rd('المكعبات 1 cm³', S.p.cubes ? (S.filling ? S.fn + ' … ' : V + ' مكعب') : 'فعّل «املأ بالمكعبات»')]; },
    record(S) { const V = D.V(S); return { sh: S.p.shape === 'cube' ? 'مكعب' : 'متوازي مستطيلات', L: S.p.L, W: S.p.W, h: S.p.h, V }; },
    cols: [['sh', 'الشكل'], ['L', 'L (cm)'], ['W', 'W (cm)'], ['h', 'h (cm)'], ['V', 'V (cm³)']],
    explain(S) { const V = D.V(S); return S.p.shape === 'cube' ? `المكعب كل أضلاعه متساوية: <b dir="ltr">V = a³ = ${S.p.L}³ = ${V} cm³</b>. أي يتسع لـ ${V} مكعباً صغيراً حجم كل منها 1 cm³.` : `في الطبقة السفلى <bdi dir="ltr">${S.p.L} × ${S.p.W} = <b>${S.p.L * S.p.W}</b></bdi> مكعباً، وعدد الطبقات ${S.p.h}، فالعدد الكلي <bdi dir="ltr">${S.p.L * S.p.W} × ${S.p.h} = <b>${V}</b></bdi>. لذلك <b>V = L × W × h = ${V} cm³</b>.`; },
    quiz: [
      { q: 'ما حجم كتاب طوله 25 cm وعرضه 18 cm وارتفاعه 3 cm؟', o: ['46 cm³', '450 cm³', '1350 cm³'], a: 2, why: 'V = L × W × h = 25 × 18 × 3 = 1350 cm³.' },
      { q: 'مكعب من الحديد طول ضلعه 20 cm. حجمه يساوي:', o: ['60 cm³', '400 cm³', '8000 cm³'], a: 2, why: 'V = a³ = 20 × 20 × 20 = 8000 cm³.' },
      { q: 'كيف نقيس حجم جسم صلب منتظم الشكل؟', o: ['بإزاحة السائل فقط', 'نقيس أبعاده بالمسطرة ونعوض في قانون الحجم', 'بالميزان'], a: 1, why: 'نقيس الطول والعرض والارتفاع ثم نحسب V = L × W × h (أو a³ للمكعب).' }
    ]
  };
  X7(D);
})();

/* ---------- نشاط: قياس حجم الجسم الصلب غير المنتظم — إزاحة السائل (ص 14) ---------- */
(() => {
  const OBJ = [{ k: 'nail', n: 'مسمار', v: 10, hgt: .15 }, { k: 'marble', n: 'كرة زجاجية', v: 20, hgt: .4 }, { k: 'key', n: 'مفتاح', v: 30, hgt: .2 }, { k: 'stone', n: 'حجر', v: 60, hgt: .25 }];
  const CAPS = { 500: { cap: 500, w0: 100, step: 50, minor: 10 }, 100: { cap: 100, w0: 50, step: 10, minor: 2 } };
  const D = {
    id: 'g7_vol_irregular', ch: 11, sec: 'الدرس 2', page: 14, kind: 'نشاط', title: 'نشاط: قياس حجم الجسم الصلب غير المنتظم (إزاحة السائل)',
    desc: 'نضع 100 cm³ من الماء في مخبار سعته 500 cm³، ونغمر فيه مسماراً أو كرة زجاجية أو مفتاحاً أو حجراً، فيرتفع الماء بمقدار حجم الجسم: V = V₂ − V₁.',
    tags: 'حجم غير منتظم إزاحة مخبار اسطوانة مدرجة V2-V1 تقعر',
    tools: ['مخبار زجاجي (أسطوانة مدرجة) سعة 500 cm³', 'ماء 100 cm³', 'مسمار، كرة زجاجية، مفتاح، حجر', 'عدسة مكبرة'],
    steps: ['اقرأ مستوى الماء في المخبار قبل غمر أي جسم (V₁ = 100 cm³). اسحب العين 👁️ لتكون بمستوى سطح الماء.',
      'اسحب أحد الأجسام (المسمار مثلاً) من الصينية وأسقطه في المخبار.',
      'اقرأ مستوى الماء الجديد V₂: حرّك العين إلى مستوى السطح واستعمل العدسة المكبرة 🔍 لقراءة أسفل التقعر.',
      'اضغط «تسجيل» لتسجيل V₁ و V₂ وحجم الجسم V = V₂ − V₁.',
      'أخرج الجسم (اسحبه إلى الصينية) وكرر مع الأجسام الأخرى كلٌّ على انفراد.',
      'أي الأجسام أزاح كمية أكبر من الماء؟ ولماذا؟ جرّب أيضاً: ماذا يحدث إذا قرأت والعين أعلى أو أسفل سطح الماء؟'],
    concl: ['يرتفع مستوى الماء في الأسطوانة المدرجة بما يعادل حجم الجسم المغمور.', 'حجم الجسم غير المنتظم = قراءة الماء بعد غمر الجسم − قراءته قبل الغمر (V = V₂ − V₁).', 'الجسم الأكبر حجماً يزيح كمية أكبر من الماء.', 'تُقرأ الأسطوانة والعين بمستوى سطح السائل (أسفل التقعر)، وإلا كانت القراءة خاطئة.', 'يجب أن نستعمل سائلاً لا يتفاعل مع الجسم الصلب ولا يذوب فيه.'],
    laws: ['g7_vdisp', 'g7_units'],
    fact: ['يقال إن العالم أرخميدس اكتشف فكرة إزاحة الماء عندما لاحظ ارتفاع الماء في حوض الاستحمام حين جلس فيه!', '1 cm³ = 1 mL — لذلك نقرأ حجم الجسم الصلب مباشرة من تدريج المخبار بالمليلتر.', 'لا يمكن قياس حجم قطعة بلاستك خفيفة بهذه الطريقة لأنها تطفو ولا تنغمر في الماء.'],
    controls: [
      SEL('cap', 'سعة المخبار', [[500, '500 cm³ (الكتاب)'], [100, '100 cm³']], 500, (v, S, init) => { if (!init) D.reset(S); }),
      BT('', [{ t: 'أخرج كل الأجسام', on: S => D.reset(S) }, { t: 'العين بمستوى الماء', on: S => { S.eyeY = D.levY(S, D.geo(S)) + 3; } }]),
      TG('sight', 'خط النظر من العين', true, null, 'eye'), TG('lens', 'العدسة المكبرة', true, null, 'eye'), TG('mark', 'علامة المستوى الأول V₁', true, null, 'labels'), TG('calc', 'بطاقة حساب الحجم', true, null, 'graph')],
    setup(S) { D.reset(S); S.lx = null; S.ly = null; },
    reset(S) { S.ob = OBJ.map((o, i) => ({ i, st: 'tray', x: 0, y: 0, v: 0 })); const C = CAPS[S.p.cap]; S.lvl = C.w0; S.eyeY = null; S.drops = []; S.over = false; S.vin = 0; },
    geo(S) { const w = S.W, h = S.H, by = h * .84; const cw = clamp(w * .12, 80, 104), ch = h * .66; const cx = 70 + (w - 70) * .36; return { w, h, by, cw, ch, cx, tray: { x: w - 105, y: by - 4 }, C: CAPS[S.p.cap] }; },
    target(S, g) { let v = g.C.w0; S.ob.forEach(o => { if (o.st === 'in' || (o.st === 'fall' && o.y > D.levY(S, g) + 6)) v += OBJ[o.i].v; }); return v; },
    levY(S, g) { return g.by - 8 - (g.ch - 22) * clamp(S.lvl / g.C.cap, 0, 1.05); },
    restY(S, g, o) { let y = g.by - 9; S.ob.forEach(q => { if (q !== o && q.st === 'in' && q.ord < o.ord) y -= OBJ[q.i].hgt * g.cw; }); return y; },
    objSize(g, i) { return OBJ[i].hgt * g.cw; },
    trayPos(g, i) { return [g.tray.x - 48 + (i % 2) * 96, g.tray.y - 16 - (i >> 1) * 80]; },
    hot(S, g, o) { return Math.abs(o.x - g.cx) < g.cw / 2 + 70 && o.y > g.by - g.ch - 220 && o.y < g.by + 20; },
    size(g, i, inside) { return inside ? g.cw * (i === 1 ? .4 : .3) : g.cw * (i === 1 ? .56 : .42); },
    update(S, dt) {
      const g = D.geo(S);
      S.ob.forEach(o => { if (o.st !== 'fall') return; if (o.tx != null) o.x += (o.tx - o.x) * Math.min(1, dt * 12); const ly = D.levY(S, g); const inW = o.y > ly; const vt = inW ? 170 : 900; o.v += (inW ? 0 : 1600) * dt; if (inW && o.v > vt) o.v += (vt - o.v) * Math.min(1, dt * 10); if (!o.wet && inW) { o.wet = 1; for (let k = 0; k < 10; k++) S.drops.push({ x: g.cx + (Math.random() - .5) * g.cw * .6, y: ly, vx: (Math.random() - .5) * 90, vy: -80 - Math.random() * 120, t: 0 }); if (window.Sound) Sound.click(); } o.y += o.v * dt; const ry = D.restY(S, g, o); if (o.y >= ry) { o.y = ry; o.st = 'in'; } });
      const tg = D.target(S, g); S.lvl += (tg - S.lvl) * Math.min(1, dt * 5); if (Math.abs(tg - S.lvl) < .05) S.lvl = tg; S.over = tg > g.C.cap;
      S.drops.forEach(d => { d.t += dt; d.vy += 600 * dt; d.x += d.vx * dt; d.y += d.vy * dt; }); S.drops = S.drops.filter(d => d.t < .6);
      S.vin = tg - g.C.w0;
    },
    eyeYv(S, g) { return S.eyeY ?? D.levY(S, g) + 3 - 70; },
    reading(S, g) { const ly = D.levY(S, g) + 3, ey = D.eyeYv(S, g); const ys = ey + (ly - ey) * .8; const v = (g.by - 8 - ys) / (g.ch - 22) * g.C.cap; return { ys, v: Math.round(v / (g.C.minor / 2)) * (g.C.minor / 2), ok: Math.abs(ey - ly) < 7 }; },
    drawObj(ctx, k, x, y, s) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y);
      if (k === 'nail') { ctx.fillStyle = '#94a3b8'; ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-s * 1.1, -s * .22); ctx.lineTo(s * .9, -s * .12); ctx.lineTo(s * 1.25, -s * .05); ctx.lineTo(s * .9, s * .02); ctx.lineTo(-s * 1.1, -s * .02); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#64748b'; rr(ctx, -s * 1.25, -s * .42, s * .18, s * .56, 2); ctx.fill(); }
      else if (k === 'marble') { ctx.restore(); K.ball(ctx, x, y - s * .5, s * .5, '#38bdf8'); ctx.save(); ctx.translate(x, y); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, -s * .5, s * .28, 2, 4); ctx.stroke(); }
      else if (k === 'key') { ctx.fillStyle = '#eab308'; ctx.strokeStyle = '#854d0e'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(-s * .6, -s * .3, s * .32, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fff8'; ctx.beginPath(); ctx.arc(-s * .6, -s * .3, s * .12, 0, TAU); ctx.fill(); ctx.fillStyle = '#eab308'; ctx.fillRect(-s * .3, -s * .38, s * 1.3, s * .16); ctx.strokeRect(-s * .3, -s * .38, s * 1.3, s * .16); ctx.fillRect(s * .6, -s * .24, s * .1, s * .18); ctx.fillRect(s * .82, -s * .24, s * .1, s * .14); }
      else { ctx.fillStyle = '#a8a29e'; ctx.strokeStyle = '#57534e'; ctx.lineWidth = 1.5; ctx.beginPath(); [[-.9, 0], [-.8, -.55], [-.3, -.95], [.35, -.85], [.9, -.45], [.95, 0]].forEach(([a, b], i) => i ? ctx.lineTo(a * s * .8, b * s * .8) : ctx.moveTo(a * s * .8, b * s * .8)); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.beginPath(); ctx.ellipse(-s * .2, -s * .55, s * .22, s * .1, -.4, 0, TAU); ctx.fill(); }
      ctx.restore(); }); },
    objXY(S, g, o) { if (o.st === 'tray') { const [tx, ty] = D.trayPos(g, o.i); return C1.ease(o, tx, ty); } return C1.ease(o, o.x, o.y, true); },
    scene(ctx, S, g, inLens) {
      const lv = S.over ? g.C.cap * 1.03 : S.lvl; const G2 = K.cylinder(ctx, g.cx, g.by, g.cw, g.ch, g.C.cap, lv, { step: g.C.step, minor: g.C.minor, unit: 'cm³', liq: '#38bdf8' });
      S.ob.forEach(o => { if (o.st === 'in' || o.st === 'fall') { const [x, y] = D.objXY(S, g, o); D.drawObj(ctx, OBJ[o.i].k, x, y, D.size(g, o.i, o.st === 'in' || (o.st === 'fall' && Math.abs(o.x - g.cx) < g.cw))); } });
      if (S.lvl > 0) K.raw(ctx, () => { ctx.globalAlpha = .28; ctx.fillStyle = '#38bdf8'; ctx.fillRect(g.cx - g.cw / 2 + 2, G2.lev, g.cw - 4, g.by - 8 - G2.lev); ctx.globalAlpha = 1; });
      void inLens; return G2; },
    draw(ctx, w, h, S) {
      const p = S.p, g = D.geo(S); K.bg(ctx, w, h, { benchY: g.by });
      const G2 = D.scene(ctx, S, g);
      if (S.over) { K.raw(ctx, () => { ctx.fillStyle = 'rgba(56,189,248,.5)'; ctx.beginPath(); ctx.ellipse(g.cx + 40, g.by + 4, 90, 7, 0, 0, TAU); ctx.fill(); }); K.bubble(ctx, 'فاض الماء! الأسطوانة صغيرة — اختر سعة 500 cm³', g.cx, G2.top - 10, { s: 12.5, bg: '#fee2e2', bd: '#dc2626', c: '#7f1d1d' }); }
      S.drops.forEach(d => K.raw(ctx, () => { ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(d.x, d.y, 2.5, 0, TAU); ctx.fill(); }));
      // V1 marker
      const y1 = g.by - 8 - (g.ch - 22) * g.C.w0 / g.C.cap;
      if (p.mark) { K.raw(ctx, () => { ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2; ctx.setLineDash([6, 4]); ctx.beginPath(); ctx.moveTo(g.cx - g.cw / 2 - 30, y1); ctx.lineTo(g.cx + g.cw / 2, y1); ctx.stroke(); ctx.setLineDash([]); }); K.tag(ctx, 'V₁ = ' + g.C.w0 + ' cm³', g.cx - g.cw / 2 - 70, y1, { s: 12, bg: '#d97706' });
        if (S.vin > 0 && !S.over) { const ly = D.levY(S, g); K.raw(ctx, () => { G.arrow(ctx, g.cx - g.cw / 2 - 14, y1, g.cx - g.cw / 2 - 14, ly + 2, '#16a34a', 2.5, 8); }); K.tag(ctx, '+' + fmt(S.vin, 3) + ' cm³', g.cx - g.cw / 2 - 58, (y1 + ly) / 2, { s: 12, bg: '#16a34a' }); } }
      // eye + line of sight
      const ex = g.cx + g.cw / 2 + 95, ey = D.eyeYv(S, g), R = D.reading(S, g), ly = D.levY(S, g) + 3;
      if (p.sight) K.raw(ctx, () => { ctx.strokeStyle = R.ok ? '#16a34a' : '#dc2626'; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(ex - 18, ey); ctx.lineTo(g.cx, ly); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = R.ok ? '#16a34a' : '#dc2626'; ctx.beginPath(); ctx.arc(g.cx + g.cw / 2, R.ys, 4.5, 0, TAU); ctx.fill(); });
      C1.eye(ctx, ex, ey, 1.1, true);
      K.tag(ctx, 'قراءة العين: ' + fmt(R.v, 1), ex + 10, ey + 32, { s: 12, bg: R.ok ? '#16a34a' : '#dc2626' });
      if (!R.ok) G.text(ctx, ey < ly ? 'العين أعلى من السطح ← قراءة أكبر ✗' : 'العين أسفل السطح ← قراءة أصغر ✗', ex + 10, ey + 56, { s: 11.5, w: 800, c: '#b91c1c', raw: 1, bg: 'rgba(254,226,226,.95)' });
      else G.text(ctx, '✓ العين بمستوى سطح الماء', ex + 10, ey + 56, { s: 11.5, w: 800, c: '#15803d', raw: 1, bg: 'rgba(220,252,231,.95)' });
      // tray + objects
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(148,163,184,.55)'; rr(ctx, g.tray.x - 100, g.tray.y - 2, 196, 10, 5); ctx.fill(); });
      const hd = S.ob.find(o => o.st === 'hold'); if (hd) { C1.zone(ctx, g.cx, g.by - g.ch / 2 - 30, g.cw + 70, g.ch + 60, D.hot(S, g, hd), 'أسقطه في المخبار ⬇'); if (hd.prev === 'in') C1.zone(ctx, g.tray.x, g.tray.y - 60, 200, 150, !D.hot(S, g, hd), 'أعده إلى الصينية', { hot: 'يعود إلى الصينية ✓' }); }
      S.ob.forEach(o => { if (o.st === 'tray' || o.st === 'hold') { const [x, y] = D.objXY(S, g, o); D.drawObj(ctx, OBJ[o.i].k, x, y, D.size(g, o.i, false)); if (o.st === 'tray') G.text(ctx, OBJ[o.i].n, x, y + 14, { s: 11.5, w: 800, c: '#fff', raw: 1, bg: 'rgba(30,41,59,.8)' }); } });
      // magnifier
      if (p.lens) { const lx = S.lx ?? g.cx + g.cw / 2 - 8, lyy = S.ly ?? ly - 4, r = 46; K.lens(ctx, lx, lyy, r, () => { ctx.save(); ctx.translate(lx, lyy); ctx.scale(2.4, 2.4); ctx.translate(-lx, -lyy); ctx.fillStyle = '#f0f9ff'; ctx.fillRect(lx - 100, lyy - 100, 300, 300); D.scene(ctx, S, g, 1); ctx.restore(); }); G.text(ctx, 'عدسة مكبرة', lx, lyy - r - 12, { s: 11, w: 800, c: '#334155', raw: 1, bg: 'rgba(255,255,255,.85)' }); }
      // calc card
      if (p.calc) { const V2 = R.v; C1.card(ctx, w - 150, 16, 250, [`V₁ = ${g.C.w0} cm³`, `V₂ = ${fmt(V2, 1)} cm³` + (R.ok ? '' : '  (?)'), [`V = V₂ − V₁ = ${fmt(V2 - g.C.w0, 1)} cm³`, { s: 14.5, w: 900, c: '#6d28d9' }]], { title: 'حجم الجسم', lh: 23 }); }
      if (S.ob.every(o => o.st === 'tray') && S._touched) K.bubble(ctx, 'اسحب جسماً إلى المخبار ✋', g.tray.x - 30, g.tray.y - 160, { s: 12.5 });
      K.party(ctx, S);
    },
    drags(S) {
      const g = D.geo(S), L = [];
      const ex = g.cx + g.cw / 2 + 95, ey = D.eyeYv(S, g);
      L.push({ id: 'eye', x: ex, y: ey, r: 22, axis: 'y', hint: false, tip: 'اسحب العين للأعلى والأسفل — القراءة الصحيحة والعين بمستوى سطح الماء',
        down: S => { S._ey = ey; }, drag: (S, d) => { let y = S._ey + d.y - d.sy; const ly = D.levY(S, g) + 3; if (Math.abs(y - ly) < 8) y = ly; S.eyeY = clamp(y, g.by - g.ch, g.by - 10); } });
      if (S.p.lens) { const lx = S.lx ?? g.cx + g.cw / 2 - 8, lyy = S.ly ?? D.levY(S, g) - 1; L.push({ id: 'lens', x: lx, y: lyy, r: 46, axis: 'xy', hint: false, tip: 'اسحب العدسة المكبرة فوق سطح الماء', drag: (S, d) => { S.lx = clamp(lx + d.dx, 80, g.w - 50); S.ly = clamp(lyy + d.dy, 60, g.by - 20); } }); }
      S.ob.forEach(o => { const [x, y] = D.objXY(S, g, o); if (o.st === 'fall') return; const sz = D.size(g, o.i, o.st === 'in'); L.push({ id: 'obj_' + OBJ[o.i].k, x, y: y - sz * .4, r: Math.max(32, sz * .85), axis: 'xy', hint: o.i === 0, idle: o.i === 0 ? 'اسحب المسمار إلى المخبار ✋' : undefined, tip: o.st === 'in' ? 'اسحب الجسم خارج المخبار إلى الصينية' : 'اسحب ' + OBJ[o.i].n + ' وأسقطه في المخبار',
        keep: true, down: S => { o.prev = o.st; o.st = 'hold'; o.x = x; o.y = y; o.wet = 0; }, drag: (S, d) => { o.x = x + d.x - d.sx; o.y = y + d.y - d.sy; },
        up: S => { if (o.st !== 'hold') return; if (D.hot(S, g, o)) { o.tx = g.cx + (o.i % 2 ? 10 : -10); o.v = 0; o.st = 'fall'; C1.good(); o.ord = (S.ordN = (S.ordN || 0) + 1); S.last = o.i + 'in'; } else { o.st = 'tray'; S.last = o.i + 'out'; } } }); });
      return L;
    },
    readings(S) { const g = D.geo(S), R = D.reading(S, g); const ins = S.ob.filter(o => o.st === 'in' || o.st === 'fall').map(o => OBJ[o.i].n); return [rd('في المخبار', ins.join(' + ') || 'ماء فقط'), rd('V₁ (قبل الغمر)', g.C.w0 + ' cm³'), rd('V₂ الحقيقية', fmt(S.lvl, 1) + ' cm³'), rd('قراءة العين', fmt(R.v, 1) + ' cm³' + (R.ok ? ' ✓' : ' ✗')), rd('حجم الجسم V = V₂ − V₁', fmt(R.v - g.C.w0, 1) + ' cm³', 1)]; },
    record(S) { const g = D.geo(S), R = D.reading(S, g); const ins = S.ob.filter(o => o.st === 'in'); if (!ins.length) { Runner.toast('أسقط جسماً في المخبار أولاً', 'info'); return null; } if (!R.ok) Runner.toast('انتبه: العين ليست بمستوى سطح الماء — القراءة غير دقيقة!', 'info'); if (S.rows.length === 2) K.cheer(S, S.W / 2, S.H * .3); return { o: ins.map(o => OBJ[o.i].n).join(' + '), V1: g.C.w0, V2: +R.v.toFixed(1), V: +(R.v - g.C.w0).toFixed(1) }; },
    cols: [['o', 'الجسم'], ['V1', 'V₁ (cm³)'], ['V2', 'V₂ (cm³)'], ['V', 'V = V₂ − V₁ (cm³)']],
    explain(S) { const g = D.geo(S); const ins = S.ob.filter(o => o.st === 'in'); if (!ins.length) return `في المخبار <b dir="ltr">${g.C.w0} cm³</b> من الماء (V₁). أسقط جسماً وراقب ارتفاع الماء.`; if (S.over) return 'حجم الأجسام أكبر من الفراغ المتبقي في المخبار فـ<b>فاض الماء</b> — نحتاج مخباراً أكبر أو ماءً أقل.'; return `الجسم احتل حيزاً داخل الماء فدفعه إلى الأعلى. ارتفع الماء بمقدار <b dir="ltr">${fmt(S.vin, 3)} cm³</b> = حجم ${ins.map(o => OBJ[o.i].n).join(' و')}.`; },
    quiz: [
      { q: 'قطعة من الصخر وضعت في أسطوانة مدرجة تحتوي على 80 cm³ من الماء فارتفع الماء إلى 120 cm³. حجم الصخرة:', o: ['200 cm³', '40 cm³', '120 cm³'], a: 1, why: 'V = V₂ − V₁ = 120 − 80 = 40 cm³.' },
      { q: 'أسطوانة مدرجة فيها ماء حجمه معلوم، أُدخل فيها حجر صغير فارتفع سطح الماء. في هذه التجربة تم قياس:', o: ['حجم الحجر', 'وزن الماء', 'وزن الحجر'], a: 0, why: 'ارتفاع الماء يساوي حجم الحجر المغمور.' },
      { q: 'لماذا لا يمكن قياس حجم قطعة صغيرة من البلاستك بطريقة إزاحة السائل؟', o: ['لأنها تطفو فوق الماء ولا تنغمر فيه', 'لأنها ثقيلة جداً', 'لأنها تذوب في الماء'], a: 0, why: 'كثافة البلاستك الخفيف أقل من الماء فيطفو، فلا يزيح ماءً بقدر حجمه كله.' }
    ]
  };
  X7(D);
})();

/* ---------- كيف يقاس حجم السائل؟ (ص 15) ---------- */
(() => {
  // container types: w (px factor of unit U), h, cap (mL), gradTop (fraction of h at cap), r(yf) half-width profile (fraction of w/2) for yf = y/h
  const TY = {
    bottle: { n: 'قنينة ماء', w: .9, h: 2.3, cap: 500, top: .6, r: y => y < .6 ? 1 : y < .8 ? 1 - (y - .6) / .2 * .62 : .38, grad: false },
    cyl: { n: 'أسطوانة مدرجة', w: .72, h: 3.2, cap: 500, top: .86, r: () => 1, grad: 100 },
    beaker: { n: 'كأس مدرجة', w: 1.55, h: 1.9, cap: 600, top: .84, r: () => 1, grad: 100 },
    flask: { n: 'دورق مدرج', w: 1.65, h: 2.4, cap: 500, top: .64, r: y => y < .68 ? 1 - y / .68 * .74 : .26, grad: 100 }};
  const ORDER = ['bottle', 'cyl', 'beaker', 'flask'];
  const tab = {}; // cumulative volume table per type (per 1/200 of height), normalised so V(top) = cap
  ORDER.forEach(k => { const T = TY[k]; const n = 200; const c = [0]; for (let i = 1; i <= n; i++) { const r = T.r((i - .5) / n); c.push(c[i - 1] + r * r); } const f = T.cap / c[Math.round(T.top * n)]; tab[k] = c.map(v => v * f); });
  const hOf = (k, V) => { const c = tab[k]; if (V <= 0) return 0; for (let i = 1; i < c.length; i++) if (c[i] >= V) return (i - 1 + (V - c[i - 1]) / (c[i] - c[i - 1])) / 200; return 1; };
  const vMax = k => tab[k][200];
  const D = {
    id: 'g7_liquid_vol', ch: 11, sec: 'الدرس 2', page: 15, kind: 'نشاط', title: 'كيف يقاس حجم السائل؟ الأواني المدرجة',
    desc: 'نسكب الماء بين أوانٍ مدرجة مختلفة (الأسطوانة المدرجة، الكأس المدرجة، الدورق المدرج): يتغير شكل السائل ويبقى حجمه ثابتاً. ثم مثال الكتاب: 12 قنينة × 500 mL = 6 L.',
    tags: 'حجم سائل لتر مليلتر اسطوانة مدرجة كأس دورق',
    tools: ['قنينة ماء 500 mL', 'أسطوانة مدرجة', 'كأس مدرجة', 'دورق زجاجي مدرج', 'صندوق فيه 12 قنينة ماء'],
    steps: ['اسحب قنينة الماء وارفعها فوق الأسطوانة المدرجة: تميل القنينة ويُسكب الماء. اقرأ الحجم.',
      'اسكب الماء من الأسطوانة إلى الكأس المدرجة، ثم إلى الدورق. ماذا يحدث لشكل السائل؟ وماذا يحدث لحجمه؟',
      'لاحظ أن مجموع الحجم يبقى 500 mL دائماً (فعّل «حجم السائل في كل إناء»).',
      'قارن تدريجات الأواني: لماذا تكون المسافات بين تدريجات الدورق غير متساوية؟',
      'انتقل إلى «صندوق القناني» وانقر على القناني واحدة بعد أخرى لسكبها في الخزان المدرج. كم لتراً في 12 قنينة؟'],
    concl: ['الشيء الوحيد الذي يتغير حين يُسكب سائل في إناء آخر هو شكله؛ لأن السائل يتخذ شكل الوعاء الذي يوضع فيه، أما حجمه فيبقى ثابتاً.', 'تُقاس حجوم السوائل بالأواني المدرجة (الأسطوانة المدرجة، الكأس المدرجة، الدورق المدرج) بوحدة المليلتر mL أو اللتر L.', '1 L = 1000 mL و 1 mL = 1 cm³.', '12 قنينة × 500 mL = 6000 mL = 6 L.'],
    laws: ['g7_units'],
    fact: ['زجاجة حليب الرضع والمحقنة الطبية أوانٍ مدرجة لقياس حجم السوائل.', 'قنينة الماء الصغيرة حجمها عادة 500 mL أي نصف لتر.', 'تشترى السوائل (البنزين، الحليب، الماء) وفق حجمها باللتر لأن شكلها يتغير بتغير الإناء.'],
    controls: [
      SEL('mode', 'النشاط', [['pour', '🫗 صبّ بين الأواني'], ['crate', '📦 صندوق القناني']], 'pour'),
      BT('', [{ t: 'املأ القنينة من جديد', on: S => D.reset(S) }]),
      TG('vols', 'حجم السائل في كل إناء', true, null, 'labels'), TG('sum', 'مجموع الحجم (ثابت)', true, null, 'graph'), TG('lvl', 'خط مستوى السائل', false, null, 'eye')],
    setup(S) { D.reset(S); },
    reset(S) { S.c = ORDER.map((k, i) => ({ k, i, V: i === 0 ? 500 : 0, ang: 0, x: null, y: null })); S.hold = -1; S.pour = null; S.flow = 0; S.crate = Array(12).fill(1); S.tank = 0; S.anim = null; S.nPoured = 0; },
    geo(S) { const w = S.W, h = S.H, by = h * .8; const U = clamp(Math.min((w - 110) / 7.2, h * .6 / 3.4), 50, 100); const xs = ORDER.map((_, i) => 110 + U * .8 + i * (w - 190 - U * 1.2) / 3); return { w, h, by, U, xs }; },
    dims(g, k) { const T = TY[k]; return { W: T.w * g.U, H: T.h * g.U }; },
    pos(S, g, c) { if (c.x != null) return [c.x, c.y]; return [g.xs[c.i], g.by]; },
    /* container outline path, local coords (bottom-centre origin, y up = negative) */
    path(ctx, k, W, H) { const T = TY[k]; ctx.beginPath(); const n = 24; for (let i = 0; i <= n; i++) { const yf = i / n; ctx.lineTo(-T.r(yf) * W / 2, -yf * H); } for (let i = n; i >= 0; i--) { const yf = i / n; ctx.lineTo(T.r(yf) * W / 2, -yf * H); } ctx.closePath(); },
    drawC(ctx, S, g, c, o = {}) {
      const T = TY[c.k], { W, H } = D.dims(g, c.k); const [x, y] = D.pos(S, g, c); const a = c.ang;
      K.raw(ctx, () => {
        ctx.save(); ctx.translate(x, y); ctx.rotate(a);
        D.path(ctx, c.k, W, H); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fill();
        if (c.V > .5) { ctx.save(); D.path(ctx, c.k, W, H); ctx.clip(); let ly; if (Math.abs(a) < .02) ly = -hOf(c.k, c.V) * H; else { const f = c.V / vMax(c.k); const cs = Math.cos(a), sn = Math.sin(a); const pts = [[-W / 2, 0], [W / 2, 0], [W / 2, -H], [-W / 2, -H]].map(([px, py]) => px * sn + py * cs); const lo = Math.max(...pts), hi = Math.min(...pts); ly = lo - (lo - hi) * clamp(f * 1.1, 0, 1); }
          ctx.rotate(-a); const lg = ctx.createLinearGradient(-W, 0, W, 0); lg.addColorStop(0, 'rgba(14,165,233,.75)'); lg.addColorStop(.5, 'rgba(125,211,252,.75)'); lg.addColorStop(1, 'rgba(14,165,233,.75)'); ctx.fillStyle = lg; ctx.fillRect(-2 * H, ly, 4 * H, 4 * H); ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-2 * H, ly); ctx.lineTo(2 * H, ly); ctx.stroke(); ctx.restore(); }
        D.path(ctx, c.k, W, H); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2.4; ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(-W / 2 * T.r(.2) + 5, -H * .55, 4, H * .45);
        if (c.k === 'bottle') { ctx.fillStyle = '#2563eb'; rr(ctx, -W * .2, -H - 7, W * .4, 9, 3); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.9)'; rr(ctx, -W / 2 + 3, -H * .38, W - 6, 22, 5); ctx.fill(); ctx.fillStyle = '#1d4ed8'; ctx.font = '800 11px Tajawal,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'rtl'; ctx.fillText('ماء 500mL', 0, -H * .38 + 11); }
        if (T.grad) { ctx.strokeStyle = '#1e293b'; ctx.fillStyle = '#1e293b'; ctx.font = '700 9.5px ui-monospace,monospace'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr';
          for (let v = 50; v <= T.cap; v += 50) { const yy = -hOf(c.k, v) * H, rx = T.r(-yy / H) * W / 2; const maj = v % T.grad === 0; ctx.lineWidth = maj ? 1.4 : .8; ctx.beginPath(); ctx.moveTo(-rx * .1, yy); ctx.lineTo(-rx * .1 + (maj ? 16 : 9), yy); ctx.stroke(); if (maj) ctx.fillText(String(v), -rx * .1 + 19, yy); }
          ctx.font = '800 9px Tajawal,sans-serif'; ctx.fillText('mL', -rx0(T, W) + 4, -H + 12); }
        ctx.restore(); ctx.textBaseline = 'alphabetic';
      });
      function rx0(T, W) { return T.r(.99) * W / 2; }
      if (!o.noLab) { G.text(ctx, T.n, g.xs[c.i], g.by + 20, { s: 12.5, w: 800, c: '#fff', raw: 1, bg: 'rgba(30,41,59,.82)' }); }
      if (S.p.vols && !o.noLab) K.tag(ctx, 'V = ' + Math.round(c.V) + ' mL', x, Math.min(y, g.by) - H - 26, { s: 13, bg: c.V > 0 ? '#0369a1' : '#94a3b8' });
      if (S.p.lvl && c.V > 0 && Math.abs(c.ang) < .02) { const ly = y - hOf(c.k, c.V) * H; K.raw(ctx, () => { ctx.strokeStyle = '#dc2626'; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x - W / 2 - 14, ly); ctx.lineTo(x + W / 2 + 14, ly); ctx.stroke(); ctx.setLineDash([]); }); }
    },
    lip(S, g, c) { const { W, H } = D.dims(g, c.k); const [x, y] = D.pos(S, g, c); const T = TY[c.k]; const lx = (c.ang < 0 ? -1 : 1) * T.r(1) * W / 2, ly = -H; return [x + lx * Math.cos(c.ang) - ly * Math.sin(c.ang), y + lx * Math.sin(c.ang) + ly * Math.cos(c.ang)]; },
    update(S, dt) {
      const g = D.geo(S);
      if (S.p.mode === 'pour') { S.pour = null; S.tgt = -1;
        S.c.forEach(c => { if (c.ret && S.hold !== c.i) { const f = Math.min(1, dt * 11); c.x += (g.xs[c.i] - c.x) * f; c.y += (g.by - c.y) * f; if (Math.hypot(g.xs[c.i] - c.x, g.by - c.y) < 1) { c.x = null; c.y = null; c.ret = false; } } });
        S.c.forEach(c => { let want = 0; if (S.hold === c.i) { const [x, y] = S.gp || D.pos(S, g, c); const tgt = S.c.filter(q => q !== c).map(q => { const d = D.dims(g, q.k); return { q, dx: x - g.xs[q.i], top: g.by - d.H, W: d.W }; }).filter(o => Math.abs(o.dx) < o.W / 2 + D.dims(g, c.k).H * .6 + 30 && y < o.top + 20).sort((a, b) => Math.abs(a.dx) - Math.abs(b.dx))[0];
            if (tgt) S.tgt = tgt.q.i; if (tgt && c.V > 0) { const side = tgt.dx > 0 ? -1 : 1; want = side * 1.75; if (Math.abs(c.ang) > 1.2) S.pour = { from: c.i, to: tgt.q.i }; } }
          c.ang += (want - c.ang) * Math.min(1, dt * 6); if (S.hold === c.i) D.place(S, g, c); });
        if (S.pour) { const A = S.c[S.pour.from], B = S.c[S.pour.to]; const r = Math.min(A.V, 150 * dt); A.V -= r; const room = vMax(B.k) - B.V; B.V += Math.min(r, room); if (r > room + 1e-9) { S.spill = (S.spill || 0) + r - room; } if (A.V < .3) { A.V = 0; } }
        S.flow = S.pour ? 1 : 0; }
      else if (S.anim) { const A = S.anim; A.t += dt; if (A.t > .6 && A.t < 1.6) S.tank = Math.min(6000, A.v0 + 500 * (A.t - .6)); if (A.t >= 2.1) { S.tank = A.v0 + 500; S.anim = null; S.nPoured++; if (S.nPoured === 12) K.cheer(S, S.W / 2, S.H * .3); } }
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { benchY: g.by });
      if (p.mode === 'crate') return D.drawCrate(ctx, w, h, S, g);
      if (S.hold >= 0) S.c.forEach(q => { if (q.i === S.hold) return; const d = D.dims(g, q.k); const hot = q.i === S.tgt; C1.zone(ctx, g.xs[q.i], g.by - d.H / 2 - 8, d.W + 34, d.H + 34, hot, hot ? (S.c[S.hold].V > 0 ? 'يُسكب هنا ✓' : 'الإناء الذي تمسكه فارغ!') : false, { hot: S.c[S.hold].V > 0 ? 'يُسكب هنا ✓' : 'الإناء الذي تمسكه فارغ!' }); });
      const order = S.c.slice().sort((a, b) => (a.i === S.hold) - (b.i === S.hold));
      order.forEach(c => D.drawC(ctx, S, g, c));
      if (S.pour) { const A = S.c[S.pour.from], B = S.c[S.pour.to]; const [lx, ly] = D.lip(S, g, A); const d = D.dims(g, B.k); const sy = g.by - Math.max(4, hOf(B.k, B.V) * d.H); C1.stream(ctx, lx, ly, g.xs[B.i] + (lx - g.xs[B.i]) * .3, sy, 'rgba(14,165,233,.8)', S.t, 5); }
      if (p.sum) { const tot = S.c.reduce((a, c) => a + c.V, 0); C1.card(ctx, w / 2 + 20, 16, 330, [S.c.map(c => Math.round(c.V)).filter(v => v > 0).join(' + ') + ' = ' + Math.round(tot) + ' mL', ['يتغير شكل السائل، ويبقى حجمه ثابتاً', { s: 12.5, c: '#0f766e', w: 800 }]], { title: 'مجموع حجم الماء', bd: '#0f766e', lh: 24 }); }
      if (S.spill > 1) G.text(ctx, 'انسكب ' + Math.round(S.spill) + ' mL خارج الإناء!', w / 2 + 20, 120, { s: 12.5, w: 800, c: '#b91c1c', raw: 1, bg: 'rgba(254,226,226,.95)' });
      K.party(ctx, S);
    },
    /* crate of 12 bottles → graduated tank (book example) */
    crateGeo(S, g) { const U = g.U * .8; const bw = U * .55, bh = U * 1.3; const cx = 80 + (g.w - 80) * .3; return { U, bw, bh, cx, x0: cx - 3 * bw * 1.15, tx: g.w - 170, tW: Math.min(200, g.w * .24), tH: g.h * .56 }; },
    bottlePos(C, i, g) { const row = i < 6 ? 1 : 0, col = i % 6; return [C.x0 + (col + .5) * C.bw * 1.15 + row * C.bw * .45, g.by - 14 - row * C.bh * .35]; },
    drawCrate(ctx, w, h, S, g) {
      const C = D.crateGeo(S, g), p = S.p;
      // tank
      const tx = C.tx, tb = g.by, tW = C.tW, tH = C.tH, lv = S.tank / 6000; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.55)'; rr(ctx, tx - tW / 2, tb - tH, tW, tH, 8); ctx.fill(); ctx.fillStyle = 'rgba(14,165,233,.6)'; ctx.fillRect(tx - tW / 2 + 3, tb - 3 - (tH - 30) * lv, tW - 6, (tH - 30) * lv); ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; rr(ctx, tx - tW / 2, tb - tH, tW, tH, 8); ctx.stroke();
        ctx.fillStyle = '#1e293b'; ctx.font = '800 12px ui-monospace,monospace'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr';
        for (let v = 0; v <= 6000; v += 500) { const yy = tb - 3 - (tH - 30) * v / 6000; const maj = v % 1000 === 0; ctx.strokeStyle = '#1e293b'; ctx.lineWidth = maj ? 2 : 1; ctx.beginPath(); ctx.moveTo(tx + tW / 2, yy); ctx.lineTo(tx + tW / 2 - (maj ? 22 : 12), yy); ctx.stroke(); if (maj && v) ctx.fillText(v / 1000 + ' L', tx + tW / 2 - 26, yy); } });
      G.text(ctx, 'خزان مدرج (لتر)', tx, tb + 20, { s: 12.5, w: 800, c: '#fff', raw: 1, bg: 'rgba(30,41,59,.82)' });
      // crate
      K.raw(ctx, () => { const X = C.x0 - 14, Y = g.by - C.bh * .72, W = 6 * C.bw * 1.15 + C.bw * .45 + 28; ctx.fillStyle = '#b7793f'; rr(ctx, X, Y, W, C.bh * .72, 6); ctx.fill(); ctx.strokeStyle = '#7c4a1e'; ctx.lineWidth = 2; ctx.stroke(); });
      for (let i = 11; i >= 0; i--) { if (S.anim && S.anim.i === i) continue; const [x, y] = D.bottlePos(C, i, g); C1.bottle(ctx, x, y, C.bw, C.bh, S.crate[i] ? 1 : 0, 'rgba(14,165,233,.75)', i < 6 ? '500mL' : '', 0, { capCol: '#2563eb', ls: 9 }); }
      K.raw(ctx, () => { const X = C.x0 - 14, Y = g.by - C.bh * .36, W = 6 * C.bw * 1.15 + C.bw * .45 + 28; ctx.fillStyle = '#c98a4f'; rr(ctx, X, Y, W, C.bh * .36, 6); ctx.fill(); ctx.strokeStyle = '#7c4a1e'; ctx.stroke(); ctx.fillStyle = '#fff'; ctx.font = '800 13px Tajawal,sans-serif'; ctx.textAlign = 'center'; ctx.direction = 'rtl'; ctx.fillText('صندوق مياه: 12 قنينة', X + W / 2, Y + C.bh * .2); });
      if (S.anim) { const A = S.anim, [x0, y0] = D.bottlePos(C, A.i, g); const e = clamp(A.t / .6, 0, 1), back = clamp((A.t - 1.6) / .5, 0, 1); const x = lerp(lerp(x0, tx - tW * .15, e), x0, back), y = lerp(lerp(y0, g.by - tH - 30, e), y0, back); const ang = (A.t > .5 && A.t < 1.7) ? 1.9 : e * 1.9 * (1 - back); const full = A.t < .6 ? 1 : A.t < 1.6 ? 1 - (A.t - .6) : 0; C1.bottle(ctx, x, y, C.bw, C.bh, full, 'rgba(14,165,233,.75)', '500mL', ang, { capCol: '#2563eb', ls: 9, cap: false });
        if (A.t > .6 && A.t < 1.6) { const lx = x + C.bh * Math.sin(ang), ly = y - C.bh * Math.cos(ang); C1.stream(ctx, lx, ly, lx + 4, tb - 3 - (tH - 30) * lv, 'rgba(14,165,233,.8)', S.t, 6); } }
      const n = S.nPoured + (S.anim ? 1 : 0), V = Math.round(S.tank);
      C1.card(ctx, w * .36, 16, 330, [`V = ${n} × 500 mL = ${n * 500} mL`, [`V = ${n * 500} ÷ 1000 = ${fmt(n * .5, 2)} L`, { s: 15, w: 900, c: '#0369a1' }]], { title: 'عدد القناني المسكوبة: ' + n, bd: '#0369a1', lh: 24 });
      K.tag(ctx, V + ' mL = ' + fmt(V / 1000, 3) + ' L', tx - 10, tb - 3 - (tH - 30) * lv - 16, { s: 13, bg: '#0369a1' });
      if (!S.nPoured && !S.anim) K.bubble(ctx, 'انقر على قنينة لسكبها في الخزان ✋', C.cx + 40, g.by - C.bh - 20, { s: 12.5 });
      K.party(ctx, S);
    },
    drags(S) {
      const g = D.geo(S);
      if (S.p.mode === 'crate') { const C = D.crateGeo(S, g); return S.crate.map((f, i) => { if (!f) return null; const [x, y] = D.bottlePos(C, i, g); return { id: 'b' + i, x, y: y - C.bh * .5, w: C.bw, h: C.bh, idle: 'انقر على قنينة لسكبها ✋', tip: 'انقر لسكب القنينة في الخزان', click: S => { if (S.anim) return; S.crate[i] = 0; S.anim = { i, t: 0, v0: S.tank }; S.lastB = i; } }; }).filter(Boolean); }
      return S.c.map(c => { const { W, H } = D.dims(g, c.k); const [x, y] = D.pos(S, g, c); return { id: 'c_' + c.k, x, y: y - H / 2, w: W + 26, h: H + 24, axis: 'xy', hint: c.i === 0, idle: c.i === 0 ? 'ارفع القنينة فوق الأسطوانة ✋' : undefined, tip: 'اسحب الإناء وارفعه فوق إناء آخر لتسكب منه',
        keep: true, down: (S, px, py) => { S.hold = c.i; c.x = x; c.y = y; c.ret = false; const cs = Math.cos(c.ang), sn = Math.sin(c.ang), rx = px - x, ry = py - y; S.grip = { lx: rx * cs + ry * sn, ly: -rx * sn + ry * cs }; S.gp = [px, py]; },
        drag: (S, d) => { S.gp = [clamp(d.x, 60, g.w - 10), clamp(d.y, 10, g.by + 20)]; D.place(S, g, c); S.hx = Math.round(c.x); }, up: S => { S.hold = -1; c.ret = true; } }; });
    },
    /* keep the grabbed point of the held container exactly under the pointer, also while it tilts to pour */
    place(S, g, c) { if (!S.grip || !S.gp) return; const cs = Math.cos(c.ang), sn = Math.sin(c.ang), { lx, ly } = S.grip; c.x = S.gp[0] - (lx * cs - ly * sn); c.y = Math.min(g.by, S.gp[1] - (lx * sn + ly * cs)); },
    readings(S) { if (S.p.mode === 'crate') return [rd('عدد القناني المسكوبة', String(S.nPoured)), rd('الحجم في الخزان', Math.round(S.tank) + ' mL'), rd('بوحدة اللتر', fmt(S.tank / 1000, 3) + ' L')]; return S.c.map(c => rd(TY[c.k].n, Math.round(c.V) + ' mL')).concat([rd('المجموع', Math.round(S.c.reduce((a, c) => a + c.V, 0)) + ' mL = ' + fmt(S.c.reduce((a, c) => a + c.V, 0) / 1000, 3) + ' L', 1)]); },
    record(S) { if (S.p.mode === 'crate') return { a: 'الخزان', v: Math.round(S.tank), L: +(S.tank / 1000).toFixed(2) }; const c = S.c.filter(q => q.i > 0).sort((a, b) => b.V - a.V)[0]; if (!c || c.V < 1) { Runner.toast('اسكب الماء في أحد الأواني المدرجة أولاً', 'info'); return null; } return { a: TY[c.k].n, v: Math.round(c.V), L: +(c.V / 1000).toFixed(2) }; },
    cols: [['a', 'الإناء'], ['v', 'الحجم (mL)'], ['L', 'الحجم (L)']],
    explain(S) { if (S.p.mode === 'crate') return `كل قنينة <b dir="ltr">500 mL</b>. بعد سكب ${S.nPoured} قنينة: <b dir="ltr">V = ${S.nPoured} × 500 = ${S.nPoured * 500} mL</b>، وبما أن <b dir="ltr">1 L = 1000 mL</b> فالحجم <b dir="ltr">${fmt(S.nPoured * .5, 2)} L</b>.`; const full = S.c.filter(c => c.V > 1).map(c => TY[c.k].n); return `الماء الآن في: <b>${full.join('، ')}</b>. السائل يأخذ <b>شكل الإناء</b> الذي يوضع فيه، لكن مجموع حجمه يبقى <b dir="ltr">500 mL</b>.`; },
    quiz: [
      { q: 'صندوق مياه فيه 12 قنينة، حجم القنينة الواحدة 500 mL. الحجم الكلي للماء:', o: ['600 mL', '6 L', '60 L'], a: 1, why: 'V = 12 × 500 = 6000 mL = 6000 ÷ 1000 = 6 L.' },
      { q: 'عند سكب سائل من إناء إلى إناء آخر مختلف الشكل:', o: ['يتغير حجمه ويبقى شكله', 'يتغير شكله ويبقى حجمه ثابتاً', 'يتغير حجمه وشكله'], a: 1, why: 'السائل له حجم محدد، لكنه يأخذ شكل الوعاء.' },
      { q: 'أيٌّ من المجموعات الآتية تعبر عن وحدات الحجم؟', o: ['g – cm² – L', 'cm³ – L – mL', 'g – kg – mL'], a: 1, why: 'cm³ و L و mL كلها وحدات حجم (مراجعة الفصل).' }
    ]
  };
  X7(D);
})();

/* ---------- كيف يقاس حجم الغاز؟ قانون بويل للاطلاع (ص 16) ---------- */
(() => {
  const V0 = 400, NW = 4, NP = 34;
  const Pn = n => 1 + .5 * n;
  const D = {
    id: 'g7_gas_vol', ch: 11, sec: 'الدرس 2', page: 16, kind: 'نشاط', title: 'حجم الغاز وضغطه: قانون بويل (للاطلاع)',
    desc: 'نضع أثقالاً على مكبس يحبس كمية من الغاز بثبوت درجة الحرارة: يزداد الضغط فتتقارب جزيئات الغاز ويقل حجمه. وفقاعات الغواص يكبر حجمها كلما صعدت.',
    tags: 'غاز حجم ضغط بويل مكبس أثقال غواص فقاعات',
    tools: ['أسطوانة فيها غاز محبوس بمكبس', 'أثقال متساوية', 'مقياس ضغط', 'محرار'],
    steps: ['لاحظ حجم الغاز تحت المكبس بدون أثقال (400 cm³) وسرعة جزيئاته. المحرار يبقى على 25°C طوال التجربة.',
      'اسحب ثقلاً من الطاولة وضعه على منصة المكبس. ماذا يحدث للحجم؟ وللضغط؟',
      'أضف ثقلاً بعد آخر، وسجّل الضغط والحجم في كل مرة.',
      'لاحظ أن جزيئات الغاز تتقارب وتصطدم بالمكبس أكثر كلما قلّ الحجم.',
      'انظر إلى عمود «الضغط × الحجم» في الجدول: ماذا تلاحظ؟',
      'انتقل إلى «الغواص»: اسحب الغواص إلى أعماق مختلفة وراقب حجم فقاعات الهواء وهي تصعد.'],
    concl: ['يزداد حجم كمية من الغاز عندما ينخفض الضغط المسلط عليه، ويقل عندما يزداد الضغط (بثبوت درجة الحرارة) — قانون بويل.', 'دفع المكبس للأسفل يزيد الضغط فيقل الحجم نتيجة تقارب جزيئات الغاز.', 'حجم الغاز × ضغطه = مقدار ثابت (بثبوت درجة الحرارة وكمية الغاز).', 'الغازات ليس لها حجم ثابت ولا شكل ثابت، لذلك يجب ذكر درجة حرارتها وضغطها عند قياس حجمها.'],
    laws: ['g7_boyle', 'g7_units'],
    fact: ['فقاعة هواء تخرج من غواص على عمق 10 m يتضاعف حجمها عندما تصل إلى سطح الماء!', 'يُضغط غاز الطبخ داخل القناني لزيادة الكمية المخزونة فيها، فيصبح خليطاً من غاز وسائل.', 'روبرت بويل أول من وصف العلاقة بين حجم الغاز وضغطه.'],
    controls: [
      SEL('mode', 'النشاط', [['piston', '🏋️ المكبس والأثقال'], ['diver', '🤿 فقاعات الغواص']], 'piston'),
      BT('', [{ t: 'أزل كل الأثقال', on: S => { S.w.forEach(q => q.on = false); } }]),
      TG('parts', 'جزيئات الغاز', true, null, 'atom'), TG('hits', 'اصطدامات الجزيئات بالمكبس', true, null, 'force'), TG('calc', 'بطاقة الضغط × الحجم', true, null, 'graph')],
    setup(S) { S.w = Array.from({ length: NW }, (_, i) => ({ i, on: false, ord: 0, x: null, y: null })); S.Vs = V0; S.hits = 0; S.hr = 0; S.flash = []; const R = C1.rng(4); S.g = Array.from({ length: NP }, () => { const a = R() * TAU; return { x: R(), y: R(), vx: Math.cos(a), vy: Math.sin(a) }; }); S.depth = 10; S.bub = []; S.bt = 0; S.drag = -1; },
    n(S) { return S.w.filter(q => q.on).length; },
    geo(S) { const w = S.W, h = S.H, by = h * .84; const cw = clamp(w * .26, 160, 230), ch = h * .56; const cx = 70 + (w - 70) * .36; return { w, h, by, cw, ch, cx, top: by - ch }; },
    pisY(S, g) { return g.by - 10 - (g.ch - 40) * S.Vs / V0; },
    update(S, dt) {
      dt = Math.min(dt, 1 / 30); const g = D.geo(S);
      if (S.p.mode === 'piston') { const Vt = V0 / Pn(D.n(S)); S.Vs += (Vt - S.Vs) * Math.min(1, dt * 3);
        const H = (S.Vs / V0), sp = .75; let hit = 0; S.g.forEach(q => { q.x += q.vx * sp * dt * 1.6; q.y += q.vy * sp * dt * 1.6 / Math.max(H, .2); if (q.x < 0) { q.x = -q.x; q.vx *= -1; } if (q.x > 1) { q.x = 2 - q.x; q.vx *= -1; } if (q.y > 1) { q.y = 2 - q.y; q.vy *= -1; } if (q.y < 0) { q.y = -q.y; q.vy *= -1; hit++; if (S.p.hits) S.flash.push({ x: q.x, t: 0 }); } });
        S.hits += hit; if (dt > 0) S.hr += (hit / dt - S.hr) * Math.min(1, dt * 1.5); S.flash.forEach(f => f.t += dt); S.flash = S.flash.filter(f => f.t < .3); }
      else { S.bt -= dt; if (S.bt <= 0) { S.bt = .55; S.bub.push({ d: S.depth, x: 0, ph: Math.random() * 6, d0: S.depth }); } S.bub.forEach(b => { b.d -= dt * 2.2; b.ph += dt; }); S.bub = S.bub.filter(b => b.d > -.3); }
    },
    draw(ctx, w, h, S) { if (S.p.mode === 'diver') return D.drawDiver(ctx, w, h, S); const g = D.geo(S), p = S.p, n = D.n(S), P = Pn(n); K.bg(ctx, w, h, { benchY: g.by });
      const py = D.pisY(S, g), x0 = g.cx - g.cw / 2, x1 = g.cx + g.cw / 2;
      // gas region
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(254,226,226,.55)'; ctx.fillRect(x0, py, g.cw, g.by - 10 - py); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(x0, g.top, g.cw, py - g.top); });
      if (p.parts) S.g.forEach(q => K.ball(ctx, x0 + 10 + q.x * (g.cw - 20), py + 10 + q.y * (g.by - 30 - py), 7, '#ef4444'));
      S.flash.forEach(f => K.raw(ctx, () => { ctx.strokeStyle = `rgba(234,88,12,${1 - f.t / .3})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x0 + 10 + f.x * (g.cw - 20), py + 2, 9 + f.t * 30, Math.PI, TAU); ctx.stroke(); }));
      // cylinder walls
      K.raw(ctx, () => { ctx.strokeStyle = '#475569'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, g.top); ctx.lineTo(x0, g.by - 8); ctx.lineTo(x1, g.by - 8); ctx.lineTo(x1, g.top); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.fillRect(x0 + 5, g.top + 10, 6, g.ch - 30);
        ctx.fillStyle = '#334155'; ctx.font = '700 10px ui-monospace,monospace'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr'; for (let v = 0; v <= V0; v += 50) { const yy = g.by - 10 - (g.ch - 40) * v / V0; ctx.strokeStyle = '#334155'; ctx.lineWidth = v % 100 ? .8 : 1.5; ctx.beginPath(); ctx.moveTo(x1, yy); ctx.lineTo(x1 + (v % 100 ? 6 : 12), yy); ctx.stroke(); if (!(v % 100) && v) ctx.fillText(v, x1 + 14, yy); } ctx.fillText('cm³', x1 + 14, g.top + 8);
        // piston + rod + platform
        const pg = ctx.createLinearGradient(0, py - 22, 0, py); pg.addColorStop(0, '#cbd5e1'); pg.addColorStop(1, '#64748b'); ctx.fillStyle = pg; rr(ctx, x0 + 3, py - 20, g.cw - 6, 20, 3); ctx.fill(); ctx.fillStyle = '#64748b'; ctx.fillRect(g.cx - 7, py - 70, 14, 50); ctx.fillStyle = '#475569'; rr(ctx, g.cx - 60, py - 80, 120, 12, 4); ctx.fill(); });
      // weights on platform
      const on = S.w.filter(q => q.on).sort((a, b) => a.ord - b.ord);
      if (S.drag >= 0) { const q = S.w[S.drag], nOn = on.filter(z => z.i !== q.i).length; C1.zone(ctx, g.cx, py - 80 - nOn * 26 - 30, 150, 62 + nOn * 6, D.hotW(S, g, q), q.on ? 'أبقه على المكبس' : 'ضع الثقل على المنصة ⬇', { r: 12 }); if (q.on) C1.zone(ctx, g.w - 120, g.by - 50, 120, 110, !D.hotW(S, g, q), 'أعده إلى الطاولة', { hot: 'يعود إلى الطاولة ✓' }); }
      on.forEach((q, k) => { if (S.drag !== q.i) { const [x, y] = C1.ease(q, g.cx, py - 80 - k * 26, false, 18); D.weight(ctx, x, y); } });
      // weights on bench
      S.w.forEach(q => { if (q.on && S.drag !== q.i) return; const [x0, y0] = D.wPos(S, g, q); const [x, y] = C1.ease(q, x0, y0, S.drag === q.i, 18); D.weight(ctx, x, y); });
      K.tag(ctx, 'أثقال (اسحبها إلى المكبس)', g.w - 120, g.by + 24, { s: 11.5, bg: 'rgba(120,53,15,.85)' });
      // gauge
      const gx = x0 - 70, gy = g.top + 60; K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(gx + 36, gy + 20); ctx.lineTo(gx + 36, g.by - 40); ctx.lineTo(x0, g.by - 40); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(gx, gy, 40, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#334155'; ctx.font = '700 10px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        for (let k = 0; k <= 3; k++) { const a = Math.PI * .75 + k / 3 * Math.PI * 1.5; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx + Math.cos(a) * 30, gy + Math.sin(a) * 30); ctx.lineTo(gx + Math.cos(a) * 36, gy + Math.sin(a) * 36); ctx.stroke(); ctx.fillText(k, gx + Math.cos(a) * 21, gy + Math.sin(a) * 21); }
        const Pd = V0 / S.Vs; const a = Math.PI * .75 + clamp(Pd / 3, 0, 1) * Math.PI * 1.5; ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + Math.cos(a) * 28, gy + Math.sin(a) * 28); ctx.stroke(); ctx.fillText('atm', gx, gy + 22); });
      G.text(ctx, 'P = ' + fmt(V0 / S.Vs, 2) + ' atm', gx, gy + 56, { s: 12, w: 800, c: '#fff', raw: 1, bg: '#dc2626', mono: 0 });
      K.thermo(ctx, x1 + 80, g.by - 30, 150, 25, 0, 50, { step: 10 }); G.text(ctx, 'درجة الحرارة ثابتة', x1 + 80, g.by - 200, { s: 11, w: 800, c: '#9a3412', raw: 1, bg: 'rgba(255,237,213,.95)' });
      K.tag(ctx, 'V = ' + Math.round(S.Vs) + ' cm³', g.cx, (py + g.by) / 2, { s: 15, bg: '#0f172a' });
      if (p.hits) G.text(ctx, 'اصطدامات بالمكبس: ' + Math.round(S.hr) + ' في الثانية', gx + 20, gy + 84, { s: 12, w: 800, c: '#c2410c', raw: 1, bg: 'rgba(255,237,213,.95)' });
      if (p.calc) C1.card(ctx, w - 140, 16, 230, [`P = ${fmt(P, 2)} atm`, `V = ${Math.round(V0 / P)} cm³`, [`P × V = ${Math.round(P * V0 / P)}`, { s: 15, w: 900, c: '#6d28d9' }], ['ثابت دائماً!', { s: 12, c: '#15803d', w: 900 }]], { title: 'عدد الأثقال: ' + n, lh: 22 });
      K.party(ctx, S);
    },
    weight(ctx, x, y) { K.raw(ctx, () => { const g2 = ctx.createLinearGradient(x - 40, 0, x + 40, 0); g2.addColorStop(0, '#475569'); g2.addColorStop(.5, '#94a3b8'); g2.addColorStop(1, '#334155'); ctx.fillStyle = g2; rr(ctx, x - 40, y - 24, 80, 24, 6); ctx.fill(); ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1.2; ctx.stroke(); ctx.fillStyle = '#fff'; ctx.font = '800 11px Tajawal,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'rtl'; ctx.fillText('ثقل', x, y - 12); ctx.textBaseline = 'alphabetic'; }); },
    hotW(S, g, q) { const py = D.pisY(S, g); return q.x != null && Math.abs(q.x - g.cx) < g.cw / 2 + 50 && q.y < py + 30 && q.y > g.top - 260; },
    wPos(S, g, q) { if (S.drag === q.i && q.x != null) return [q.x, q.y]; const bench = S.w.filter(z => !z.on); const k = bench.indexOf(q); return [g.w - 120, g.by - 4 - k * 26]; },
    drawDiver(ctx, w, h, S) {
      const top = h * .14, bot = h * .92, m2y = d => top + (bot - top) * d / 20; K.bg(ctx, w, h, { benchY: top, bench: false });
      K.raw(ctx, () => { const sg = ctx.createLinearGradient(0, top, 0, bot); sg.addColorStop(0, '#7dd3fc'); sg.addColorStop(1, '#075985'); ctx.fillStyle = sg; ctx.fillRect(0, top, w, h - top); ctx.strokeStyle = '#e0f2fe'; ctx.lineWidth = 3; ctx.beginPath(); for (let x = 0; x <= w; x += 8) ctx.lineTo(x, top + Math.sin(x / 30 + S.t * 2) * 3); ctx.stroke();
        ctx.fillStyle = '#fff'; ctx.font = '700 11px ui-monospace,monospace'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr'; for (let d = 0; d <= 20; d += 5) { const y = m2y(d); ctx.fillRect(74, y, 14, 2); ctx.fillText(d + ' m  (' + fmt(1 + d / 10, 2) + ' atm)', 92, y); } });
      const dx = w * .55, dy = m2y(S.depth);
      S.bub.forEach((b, k) => { const P = 1 + Math.max(0, b.d) / 10, rr0 = 5 * Math.cbrt((1 + b.d0 / 10) / P); const x = dx + 30 + Math.sin(b.ph * 3 + k) * 8; K.raw(ctx, () => { ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 2; ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.beginPath(); ctx.arc(x, m2y(b.d), rr0 * 2, 0, TAU); ctx.fill(); ctx.stroke(); }); });
      // diver
      K.raw(ctx, () => { ctx.save(); ctx.translate(dx, dy); ctx.fillStyle = '#111827'; rr(ctx, -60, -12, 90, 24, 12); ctx.fill(); ctx.fillStyle = '#facc15'; rr(ctx, -40, -26, 40, 14, 6); ctx.fill(); ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(38, -2, 13, 0, TAU); ctx.fill(); ctx.fillStyle = '#38bdf8'; rr(ctx, 36, -10, 16, 10, 3); ctx.fill(); ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.moveTo(-60, -6); ctx.lineTo(-92, -18); ctx.lineTo(-88, 10); ctx.closePath(); ctx.fill(); ctx.restore(); });
      K.tag(ctx, 'العمق ' + fmt(S.depth, 2) + ' m — الضغط ' + fmt(1 + S.depth / 10, 2) + ' atm', dx - 10, dy + 40, { s: 12.5, bg: '#0f172a' });
      const f = 1 + S.depth / 10; C1.card(ctx, w - 150, top + 20, 250, [`حجم الفقاعة عند الغواص = V`, `حجمها عند السطح = ${fmt(f, 2)} V`, ['كلما صعدت قلّ الضغط فكبر حجمها', { s: 12, c: '#0369a1', w: 800 }]], { title: 'فقاعات الهواء', bd: '#0369a1', lh: 23 });
      if (Math.abs(S.depth - 10) < .3) K.bubble(ctx, 'من عمق 10 m يتضاعف حجم الفقاعة عند السطح!', dx, dy - 40, { s: 12.5 });
    },
    drags(S) {
      if (S.p.mode === 'diver') { const top = S.H * .14, bot = S.H * .92, y = top + (bot - top) * S.depth / 20; return [{ id: 'diver', x: S.W * .55, y, w: 150, h: 50, axis: 'y', idle: 'اسحب الغواص للأعلى والأسفل ✋', tip: 'اسحب الغواص إلى عمق آخر', drag: (S, d) => { S.depth = clamp(S.depth + d.dy / (bot - top) * 20, 1, 20); } }]; }
      const g = D.geo(S), L = []; const py = D.pisY(S, g);
      const on = S.w.filter(q => q.on).sort((a, b) => a.ord - b.ord); const topW = on[on.length - 1];
      S.w.forEach(q => { let x, y; if (q.on) { if (q !== topW) return; x = g.cx; y = py - 80 - (on.length - 1) * 26; } else { const bench = S.w.filter(z => !z.on); if (q !== bench[bench.length - 1]) return; [x, y] = D.wPos(S, g, q); }
        const nStack = q.on ? on.length : S.w.filter(z => !z.on).length;
        L.push({ id: 'w' + q.i, x, y: y - 12, w: 96, h: 34, hit: (hx, hy) => Math.abs(hx - x) < 52 && hy > y - 30 && hy < y + 8 + (nStack - 1) * 26, axis: 'xy', idle: q.on ? undefined : 'اسحب الثقل إلى منصة المكبس ✋', tip: q.on ? 'اسحب الثقل لإزالته عن المكبس' : 'اسحب الثقل إلى منصة المكبس',
          keep: true, down: S => { S.drag = q.i; q.x = x; q.y = y; }, drag: (S, d) => { q.x = x + d.x - d.sx; q.y = y + d.y - d.sy; S.wx = Math.round(q.x); },
          up: S => { if (S.drag !== q.i) return; S.drag = -1; const near = D.hotW(S, g, q); if (near && !q.on) { q.on = true; q.ord = (S.ordW = (S.ordW || 0) + 1); C1.good(); if (D.n(S) === NW) K.cheer(S, g.cx, g.top); } else if (!near && q.on) q.on = false; q.x = null; } }); });
      return L;
    },
    readings(S) { if (S.p.mode === 'diver') { const f = 1 + S.depth / 10; return [rd('العمق', fmt(S.depth, 2) + ' m'), rd('الضغط عند الغواص', fmt(f, 2) + ' atm'), rd('حجم الفقاعة عند السطح', fmt(f, 2) + ' × حجمها عند الغواص', 1)]; } const n = D.n(S), P = Pn(n); return [rd('عدد الأثقال', String(n)), rd('الضغط P', fmt(P, 2) + ' atm'), rd('حجم الغاز V', Math.round(S.Vs) + ' cm³'), rd('P × V', String(Math.round(P * S.Vs))), rd('درجة الحرارة', '25 °C (ثابتة)')]; },
    record(S) { if (S.p.mode === 'diver') { Runner.toast('الجدول لتجربة المكبس', 'info'); return null; } const n = D.n(S), P = Pn(n), V = Math.round(V0 / P); if (S.rows.length === 3) K.cheer(S, S.W / 2, S.H * .3); return { n, P, V, PV: Math.round(P * V) }; },
    cols: [['n', 'عدد الأثقال'], ['P', 'الضغط (atm)'], ['V', 'الحجم (cm³)'], ['PV', 'P × V']],
    graph: { x: 'P', y: 'V', xl: 'الضغط P (atm)', yl: 'الحجم V (cm³)', theory: x => V0 / x, xmin: .8, xmax: 3.2 },
    explain(S) { if (S.p.mode === 'diver') return `على عمق <b dir="ltr">${fmt(S.depth, 2)} m</b> يكون الضغط <b dir="ltr">${fmt(1 + S.depth / 10, 2)} atm</b>. عندما تصعد الفقاعة يقل الضغط عليها فيزداد حجمها، وعند السطح يصبح حجمها <b dir="ltr">${fmt(1 + S.depth / 10, 2)}</b> مرة من حجمها الأول.`; const n = D.n(S); return n === 0 ? 'الغاز تحت المكبس حجمه <b dir="ltr">400 cm³</b> وضغطه <b dir="ltr">1 atm</b>. أضف ثقلاً على المكبس.' : `وضعت <b>${n}</b> من الأثقال فازداد الضغط إلى <b dir="ltr">${fmt(Pn(n), 2)} atm</b>، فتقاربت جزيئات الغاز وقلّ حجمه إلى <b dir="ltr">${Math.round(V0 / Pn(n))} cm³</b>. لاحظ أن الضغط × الحجم يبقى <b dir="ltr">400</b>.`; },
    quiz: [
      { q: 'ماذا يحصل لجسيمات الغاز المحبوس تحت المكبس عندما تضاف أثقال أكثر بثبوت درجة الحرارة؟', o: ['تتباعد ويزداد الحجم', 'تتقارب ويقل الحجم', 'لا يتغير شيء'], a: 1, why: 'زيادة الضغط تجعل الجزيئات تتقارب فيقل حجم الغاز.' },
      { q: 'ماذا يحصل لضغط الغاز إذا تضاعف حجمه بثبوت درجة الحرارة؟', o: ['يتضاعف', 'يقل إلى النصف', 'لا يتغير'], a: 1, why: 'حجم الغاز × ضغطه = مقدار ثابت، فإذا تضاعف الحجم قلّ الضغط إلى النصف.' },
      { q: 'لماذا يكبر حجم فقاعة الهواء كلما صعدت من الغواص نحو سطح الماء؟', o: ['لأن الضغط عليها يقل', 'لأن درجة الحرارة تزداد كثيراً', 'لأن الماء يدخل فيها'], a: 0, why: 'الضغط عند السطح أقل منه في العمق، فيزداد حجم الغاز (قانون بويل).' }
    ]
  };
  X7(D);
})();


/* ---------- نشاط: قياس كثافة الأجسام (ص 19) — reference implementation ---------- */
X7({ id: 'g7_density', ch: 11, sec: 'الدرس 3', page: 19, kind: 'نشاط', title: 'نشاط: قياس كثافة الأجسام (مكعبات متساوية الحجم)',
  desc: 'ثلاثة مكعبات متساوية في الحجم من الخشب والألمنيوم والحديد: نزن كل مكعب ونقيس حجمه ونحسب النسبة بين الكتلة والحجم (الكثافة).',
  tags: 'كثافة كتلة حجم ميزان مكعب',
  tools: ['ثلاثة مكعبات متساوية الحجم (خشب، ألمنيوم، حديد) طول ضلع كل منها 5cm', 'ميزان رقمي', 'مسطرة', 'جدول لتسجيل النتائج'],
  steps: ['اسحب مكعب الخشب وضعه على كفة الميزان الرقمي، واقرأ كتلته.', 'فعّل «أبعاد المكعب» وقِس طول ضلعه بالمسطرة، ثم احسب حجمه V = a³.', 'اضغط «تسجيل» لتسجيل الكتلة والحجم والكثافة في الجدول.', 'كرر مع مكعب الألمنيوم ومكعب الحديد.', 'قارن: أي المكعبات كثافته أكبر؟ ولماذا؟ فعّل «الجزيئات داخل المادة» لترى السبب.', 'تحدٍّ: زِن «المكعب الغامض» واحسب كثافته، ثم اعرف مادته من جدول الكثافات.'],
  concl: ['الكثافة = الكتلة ÷ الحجم (ρ = m / V) وتقاس بوحدة g/cm³ أو kg/m³.', 'المكعبات المتساوية في الحجم تختلف في كتلها، لأن كمية المادة في الحجم نفسه مختلفة.', 'كلما كانت جزيئات المادة أكثر تراصاً كانت كثافتها أكبر (الحديد > الألمنيوم > الخشب).', 'الكثافة خاصية فيزيائية تساعد على معرفة نوع المادة.'],
  laws: ['g7_rho', 'g7_vcube'],
  fact: ['كثافة الذهب 19.3 g/cm³ — لذلك يكون خاتم الذهب ثقيلاً رغم صغر حجمه!', 'الخشب يطفو على الماء لأن كثافته أقل من كثافة الماء (1 g/cm³).', 'مكعب حديد طول ضلعه 5 cm كتلته تقارب 1 kg، ومكعب خشب بالحجم نفسه كتلته 75 g فقط.'],
  controls: [R('a', 'طول ضلع المكعبات a', 2, 6, 5, .5, 'cm', (v, S) => { S.cubes.forEach(c => c.onPan = false); }),
    TG('ruler', 'أبعاد المكعب (المسطرة)', true, null, 'labels'), TG('parts', 'الجزيئات داخل المادة', false, null, 'atom'), TG('calc', 'خطوات حساب الكثافة', true, null, 'graph'),
    BT('', [{ t: 'إعادة المكعبات', on: S => S.cubes.forEach((c, i) => { c.onPan = false; c.pan = null; c.x = null; }) }]),
    SEL('bal', 'نوع الميزان', [['dig', 'ميزان رقمي'], ['two', 'ذو الكفتين (كالكتاب)']], 'dig', (v, S) => S.cubes.forEach(c => { c.onPan = false; c.pan = null; }))],
  setup(S) { S.cubes = ['wood', 'alu', 'iron', 'mys'].map((m, i) => ({ m, i, onPan: false, x: null, y: null })); S.mys = ['copper', 'gold', 'lead', 'stone'][Math.random() * 4 | 0]; S.shown = 0; S.dragC = null; },
  geo(S) { const w = S.W, h = S.H; const by = h * .74; const s = clamp(S.p.a * Math.min(w, h) / 58, 26, 100); return { w, h, by, s, bx: w * .36, bpan: by - 64, trayX: w * .7, trayY: by }; },
  cubeMat(S, c) { return c.m === 'mys' ? S.mys : c.m; },
  two(S, g) { const L = clamp(Math.min(g.w * .17, g.h * .22), 90, 150); const px = g.bx, py = g.by - L * 1.25; const pans = [[px - L, py], [px + L, py]].map(([x, y], i) => { const t = S.tilt || 0, sg = i ? 1 : -1; return [px + sg * L * Math.cos(t), py + sg * L * Math.sin(t) + L * .55]; }); return { L, px, py, pans }; },
  cubePos(S, c, g) { if (S.p.bal === 'two' && c.pan && S.dragC !== c) { const T = this.two(S, g); const P = T.pans[c.pan === 'L' ? 0 : 1]; const same = S.cubes.filter(q => q.pan === c.pan); const k = same.indexOf(c); const s2 = g.s * .62; return [P[0] - s2 / 2 + (k - (same.length - 1) / 2) * (s2 + 4), P[1]]; } if (c.onPan) return [g.bx - g.s / 2 - g.s * .15, g.bpan - 1]; if (c.x != null && S.dragC === c) return [c.x, c.y]; const k = c.i; return [g.trayX - g.s * 1.2 + (k % 2) * g.s * 1.7, g.trayY - 6 - (k >> 1) * (g.s * 1.45)]; },
  draw(ctx, w, h, S) {
    const E = this, p = S.p, g = E.geo(S); K.bg(ctx, w, h, { benchY: g.by });
    // tray
    K.raw(ctx, () => { ctx.fillStyle = 'rgba(148,163,184,.35)'; rr(ctx, g.trayX - g.s * 1.45, g.trayY - 4, g.s * 3.1, 10, 5); ctx.fill(); });
    K.tag(ctx, 'المكعبات (اسحب أياً منها إلى الميزان)', g.trayX + g.s * .1, g.trayY + 22, { s: 12, bg: 'rgba(120,53,15,.8)' });
    // balance with the cube on it
    const on = S.cubes.find(c => c.onPan); const V = p.a ** 3; const mat = on ? K.MAT[E.cubeMat(S, on)] : null; const m = mat ? mat.rho * V : 0;
    S.shown += (m - S.shown) * .18; if (Math.abs(S.shown - m) < .05) S.shown = m;
    const two = p.bal === 'two';
    if (two) { const mm = side => S.cubes.filter(c => c.pan === side).reduce((a, c) => a + K.MAT[E.cubeMat(S, c)].rho * V, 0); const mL = mm('L'), mR = mm('R'); const tgt = mL + mR > 0 ? clamp((mR - mL) / (mR + mL) * .5, -.32, .32) : 0; S.tilt = (S.tilt || 0) + (tgt - (S.tilt || 0)) * .08; const T = E.two(S, g); K.twoPan(ctx, T.px, T.py, T.L, S.tilt, { base: g.by }); S.mL = mL; S.mR = mR;
      if (mL + mR > 0) K.bubble(ctx, Math.abs(mL - mR) < 1 ? 'الكفتان متزنتان ⚖️' : (mL > mR ? 'الكفة اليسرى أثقل!' : 'الكفة اليمنى أثقل!'), T.px, T.py - 20, { s: 13 }); }
    else K.balance(ctx, g.bx, g.bpan, S.shown, { w: Math.max(170, g.s * 2.2) });
    S.cubes.forEach(c => { const [x, y] = E.cubePos(S, c, g); const M = K.MAT[E.cubeMat(S, c)]; const cs = two && c.pan && S.dragC !== c ? g.s * .62 : g.s; K.box(ctx, x, y, cs, cs, cs * .7, c.m === 'mys' ? { c1: '#c4b5fd', c2: '#6d28d9' } : M);
      K.tag(ctx, c.m === 'mys' ? '؟ مكعب غامض' : M.name, x + cs / 2, y - cs / 2, { s: 12, bg: c.m === 'mys' ? '#6d28d9' : 'rgba(15,23,42,.8)' });
      if (p.parts && cs === g.s) { // particle packing inside the front face
        const n = c.m === 'mys' ? 6 : { wood: 3, alu: 4, iron: 6 }[c.m] || 5; const r = g.s / (2 * n + 1.2);
        for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) { const jit = c.m === 'wood' ? (Math.sin(a * 7 + b * 3) * r * .4) : 0; K.ball(ctx, x + g.s * (a + .5) / n + jit, y - g.s * (b + .5) / n, r, c.m === 'mys' ? '#a78bfa' : { wood: '#d97706', alu: '#94a3b8', iron: '#475569' }[c.m]); }
      } });
    // ruler on the cube on the pan
    if (p.ruler && on) { const [x, y] = E.cubePos(S, on, g); K.ruler(ctx, x, y - g.s - g.s * .45 - 26, g.s, p.a); K.raw(ctx, () => { ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(x - 10, y); ctx.lineTo(x - 10, y - g.s); ctx.stroke(); ctx.setLineDash([]); }); K.tag(ctx, 'a = ' + p.a + ' cm', x - 38, y - g.s / 2, { s: 12, bg: '#7c3aed' }); }
    // calculation card
    if (p.calc && !two) {
      const cx = w * .5, cy = h * .12; const rho = on ? m / V : null; const txt = on ? [`V = a³ = ${p.a}³ = ${fmt(V, 4)} cm³`, `m = ${fmt(m, 4)} g`, `ρ = m / V = ${fmt(m, 4)} / ${fmt(V, 4)} = ${fmt(rho, 3)} g/cm³`] : ['ضع مكعباً على الميزان', 'ثم احسب:  ρ = m / V'];
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, cx - 190, cy - 30, 380, 34 + txt.length * 22, 14); ctx.fill(); ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2; ctx.stroke(); });
      txt.forEach((t, i) => G.text(ctx, t, cx, cy - 10 + i * 22, { s: i === 2 ? 15 : 13.5, w: i === 2 ? 900 : 700, c: i === 2 ? '#6d28d9' : '#1e293b', mono: /^[A-Za-zρVm]/.test(t) ? 1 : 0, raw: 1 }));
      if (on && on.m === 'mys') { const guess = Object.values(K.MAT).find(M => Math.abs(M.rho - rho) < .06); G.text(ctx, 'قارن مع جدول الكثافات لتعرف المادة 🔎', cx, cy + 58, { s: 12, c: '#6d28d9', w: 800, raw: 1 }); void guess; }
    }
    // density table (book p.21)
    const tx = 16 + 56, ty = g.by + 18; const rows = [['الخشب', .6], ['الألمنيوم', 2.7], ['الحديد', 7.86], ['النحاس', 8.9], ['الرصاص', 11.3], ['الذهب', 19.3]];
    K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.92)'; rr(ctx, tx, ty, 150, 24 + rows.length * 15, 10); ctx.fill(); });
    G.text(ctx, 'جدول الكثافات g/cm³', tx + 75, ty + 11, { s: 11, w: 900, c: '#334155', raw: 1 });
    rows.forEach((r, i) => { G.text(ctx, r[0], tx + 140, ty + 28 + i * 15, { s: 11, c: '#334155', a: 'right', raw: 1 }); G.text(ctx, String(r[1]), tx + 12, ty + 28 + i * 15, { s: 11, c: '#7c3aed', a: 'left', mono: 1, w: 800, raw: 1 }); });
    if (!on && !two && !S._touched) K.mascot(ctx, w * .12 + 40, g.by - 120, .9);
    K.party(ctx, S);
  },
  drags(S) {
    const E = this, g = E.geo(S);
    return S.cubes.map(c => { const [x, y] = E.cubePos(S, c, g); return { id: 'cube_' + c.m, x: x + g.s / 2, y: y - g.s / 2, w: g.s + 10, h: g.s + 10, axis: 'xy', tip: 'اسحب المكعب إلى كفة الميزان', idle: c.i === 0 ? 'اسحب المكعب إلى الميزان ✋' : undefined, hint: c.i === 0,
      down: S => { S.dragC = c; c.x = x; c.y = y; c.onPan = false; c.pan = null; },
      drag: (S, d) => { c.x = d.ox - g.s / 2 + (d.x - d.sx); c.y = d.oy + g.s / 2 + (d.y - d.sy); },
      up: S => { const cx = c.x + g.s / 2, cy = c.y - g.s / 2; S.dragC = null; if (S.p.bal === 'two') { const T = E.two(S, g); const d = T.pans.map(P => Math.hypot(cx - P[0], cy - P[1] + 20)); const k = d[0] < d[1] ? 0 : 1; if (d[k] < T.L * .9) { c.pan = k ? 'R' : 'L'; if (window.Sound) Sound.click(); } c.x = null; return; } if (Math.abs(cx - g.bx) < g.s * 1.1 + 40 && Math.abs(cy - (g.bpan - g.s / 2)) < g.s + 60) { S.cubes.forEach(q => q.onPan = false); c.onPan = true; if (window.Sound) Sound.click(); } c.x = null; } }; })
      .concat(S.p.bal === 'two' ? [] : [{ id: 'zero', x: g.bx - Math.max(170, g.s * 2.2) / 2 + 18, y: g.bpan + 31, r: 10, hint: false, tip: 'زر التصفير', click: S => { S.shown = 0; } }]);
  },
  readings(S) { const E = EXPS.find(e => e.id === 'g7_density'); if (S.p.bal === 'two') { const n = s => S.cubes.filter(c => c.pan === s).map(c => c.m === 'mys' ? 'الغامض' : K.MAT[c.m].name).join(' + ') || '—'; return [rd('الكفة اليسرى', n('L')), rd('الكفة اليمنى', n('R')), rd('الحجم لكل مكعب', fmt(S.p.a ** 3, 4) + ' cm³'), rd('النتيجة', !S.mL && !S.mR ? 'ضع مكعبين على الكفتين' : Math.abs((S.mL || 0) - (S.mR || 0)) < 1 ? 'متزنتان' : ((S.mL || 0) > (S.mR || 0) ? 'الكفة اليسرى أثقل' : 'الكفة اليمنى أثقل') + ' — لأن كثافة مادتها أكبر', 1)]; } const on = S.cubes.find(c => c.onPan); const V = S.p.a ** 3; if (!on) return [rd('الحجم V = a³', fmt(V, 4) + ' cm³'), rd('الكتلة', '— ضع مكعباً على الميزان')]; const M = K.MAT[E.cubeMat(S, on)]; const m = M.rho * V; return [rd('المكعب', on.m === 'mys' ? 'غامض ؟' : M.name), rd('الحجم V = a³', fmt(V, 4) + ' cm³'), rd('الكتلة m', fmt(m, 4) + ' g'), rd('الكثافة ρ = m/V', fmt(m / V, 3) + ' g/cm³'), rd('يطفو على الماء؟', M.rho < 1 ? 'نعم — كثافته أقل من الماء' : 'لا — يغطس', 1)]; },
  record(S) { const E = EXPS.find(e => e.id === 'g7_density'); const on = S.cubes.find(c => c.onPan); if (!on) { Runner.toast('ضع مكعباً على الميزان أولاً', 'info'); return null; } const M = K.MAT[E.cubeMat(S, on)]; const V = S.p.a ** 3, m = M.rho * V; if (on.m === 'mys' && Math.abs(M.rho - 19.3) > 0) { } if (S.rows.filter(r => r.mat === (on.m === 'mys' ? 'الغامض' : M.name)).length === 0 && S.rows.length === 2) K.cheer(S, S.W / 2, S.H * .3); return { mat: on.m === 'mys' ? 'الغامض' : M.name, V: +V.toFixed(3), m: +m.toFixed(1), rho: +(m / V).toFixed(2) }; },
  cols: [['mat', 'المادة'], ['V', 'الحجم (cm³)'], ['m', 'الكتلة (g)'], ['rho', 'الكثافة (g/cm³)']],
  aux(ctx, w, h, S) { const rows = S.rows; G.text(ctx, 'مقارنة الكثافات المسجلة', w / 2, 12, { s: 12, w: 800, c: App.isDark() ? '#e2e8f0' : '#334155' }); if (!rows.length) { G.text(ctx, 'سجّل قراءات لتظهر الأعمدة', w / 2, h / 2, { s: 12, c: '#94a3b8' }); return; } const mx = Math.max(...rows.map(r => r.rho), 1); const bw = Math.min(60, (w - 30) / rows.length - 12); rows.forEach((r, i) => { const x = 20 + i * (bw + 12), bh = (h - 60) * r.rho / mx; K.raw(ctx, () => { ctx.fillStyle = ['#f59e0b', '#94a3b8', '#475569', '#7c3aed', '#16a34a'][i % 5]; rr(ctx, x, h - 26 - bh, bw, bh, 6); ctx.fill(); }); G.text(ctx, String(r.rho), x + bw / 2, h - 34 - bh, { s: 11, w: 800, c: '#7c3aed', mono: 1 }); G.text(ctx, r.mat, x + bw / 2, h - 13, { s: 11, c: App.isDark() ? '#e2e8f0' : '#334155' }); }); },
  auxTitle: 'رسم بياني بالأعمدة',
  explain(S) { const on = S.cubes.find(c => c.onPan); if (!on) return 'المكعبات الثلاثة <b>متساوية في الحجم</b>. اسحب أحدها إلى الميزان لتعرف كتلته.'; const E = EXPS.find(e => e.id === 'g7_density'); const M = K.MAT[E.cubeMat(S, on)]; return `كتلة كل 1 cm³ من ${on.m === 'mys' ? 'المكعب الغامض' : M.name} = <b>${fmt(M.rho, 3)} g</b>. هذه هي <b>الكثافة</b>. ${M.rho < 1 ? 'كثافته أقل من الماء فيطفو.' : 'كثافته أكبر من الماء فيغطس.'}`; },
  quiz: [
    { q: 'مكعبان لهما الحجم نفسه، أحدهما من الحديد والآخر من الخشب. أيهما كتلته أكبر؟', o: ['الخشب', 'الحديد', 'متساويان'], a: 1, why: 'كثافة الحديد أكبر، أي كمية المادة في الحجم نفسه أكبر.' },
    { q: 'جسم كتلته 12 g وحجمه 3 cm³. كثافته تساوي:', o: ['36 g/cm³', '4 g/cm³', '0.25 g/cm³'], a: 1, why: 'ρ = m / V = 12 ÷ 3 = 4 g/cm³ (مثال الكتاب ص 20).' },
    { q: 'وحدة قياس الكثافة هي:', o: ['g/cm', 'g/cm³', 'g.cm'], a: 1, why: 'الكثافة = الكتلة (g) ÷ الحجم (cm³).' }
  ]
});

/* ---------- نشاط: قياس كثافة السائل + اختلاف كثافة السوائل + المكثاف (ص 21–22) ---------- */
(() => {
  const LQ = { water: { n: 'ماء', rho: 1, c: '#38bdf8' }, oil: { n: 'زيت الطعام', rho: .92, c: '#facc15' }, milk: { n: 'حليب', rho: 1.03, c: '#f8fafc' }, honey: { n: 'عسل', rho: 1.42, c: '#d97706' }, alc: { n: 'كحول', rho: .79, c: '#f472b6' }, naft: { n: 'نفط', rho: .8, c: '#78350f' } };
  const MK = ['water', 'oil', 'milk', 'honey', 'alc', 'naft'], CK = ['honey', 'water', 'oil', 'alc'], HK = ['alc', 'oil', 'water', 'milk', 'honey'];
  const OB = [{ k: 'cork', n: 'فلين', rho: .24, c: '#d6a86a' }, { k: 'ball', n: 'كرة بلاستك', rho: .95, c: '#ef4444' }, { k: 'grape', n: 'حبة عنب', rho: 1.1, c: '#7c3aed' }, { k: 'nut', n: 'صامولة حديد', rho: 7.86, c: '#64748b' }];
  const M1 = 120, CAP = 250;
  const D = {
    id: 'g7_density_liquid', ch: 11, sec: 'الدرس 3', page: 21, kind: 'نشاط', title: 'نشاط: قياس كثافة السائل (والسوائل الطبقية والمكثاف)',
    desc: 'نزن أسطوانة مدرجة فارغة، ثم نسكب فيها سائلاً ونقرأ حجمه ونزنها مع السائل، فنحسب كتلة السائل وكثافته. ثم نرى كيف تترتب السوائل حسب كثافتها، ونقيس الكثافة مباشرة بالمكثاف.',
    tags: 'كثافة سائل أسطوانة مدرجة ميزان طبقات مكثاف ماء زيت عسل',
    tools: ['أسطوانة زجاجية مدرجة', 'ميزان رقمي', 'سوائل مختلفة (ماء، زيت، حليب، عسل، كحول، نفط)', 'وعاء زجاجي طويل', 'مكثاف'],
    steps: ['اقرأ كتلة الأسطوانة المدرجة وهي فارغة على الميزان الرقمي (m₁).',
      'اسحب قنينة سائل وارفعها فوق الأسطوانة لتسكب فيها كمية منه.',
      'اقرأ حجم السائل V من تدريج الأسطوانة، وكتلة الأسطوانة مع السائل m₂ من الميزان.',
      'احسب كتلة السائل m = m₂ − m₁ ثم الكثافة ρ = m ÷ V، واضغط «تسجيل».',
      'فرّغ الأسطوانة (انقر «فرّغ الأسطوانة») وكرر مع سوائل أخرى. قارن مع جدول الكثافات.',
      'في «السوائل الطبقية» اسكب العسل والماء والزيت والكحول في وعاء واحد، ثم أسقط الأجسام. وفي «المكثاف» اختر سائلاً واقرأ كثافته مباشرة.'],
    concl: ['كتلة السائل = كتلة الأسطوانة مع السائل − كتلة الأسطوانة فارغة (m = m₂ − m₁).', 'كثافة السائل = كتلته ÷ حجمه (ρ = m / V)، وكثافة الماء 1 g/cm³.', 'عند وضع سوائل لا تختلط في وعاء واحد يكون السائل الأقل كثافة في الأعلى والأكبر كثافة في الأسفل.', 'يطفو الجسم عند الحد بين سائل أقل منه كثافة وسائل أكبر منه كثافة.', 'المكثاف يقيس كثافة السائل مباشرة: يغوص أكثر في السائل الأقل كثافة.'],
    laws: ['g7_rho'],
    fact: ['كثافة الماء تصبح 0.9168 g/cm³ عندما يتجمد — لذلك يطفو الجليد على الماء!', 'النفط أقل كثافة من الماء (0.8 g/cm³) لذلك تطفو بقع النفط على سطح البحر.', 'الزئبق كثافته 13.6 g/cm³ — حتى الحديد يطفو عليه!'],
    controls: [
      SEL('mode', 'النشاط', [['measure', '⚖️ قياس الكثافة'], ['column', '🌈 السوائل الطبقية'], ['hydro', '🧪 المكثاف']], 'measure'),
      BT('', [{ t: 'فرّغ الأسطوانة / الوعاء', on: S => D.empty(S) }, { t: 'تصفير الميزان', on: S => { S.tare = D.mass(S); } }]),
      TG('calc', 'بطاقة الحساب', true, null, 'graph'), TG('table', 'جدول الكثافات', true, null, 'labels'), TG('mol', 'الجزيئات (التراص)', false, null, 'atom')],
    empty(S) { S.liq = null; S.V = 0; S.mix = {}; S.layers = []; S.ob.forEach(o => o.st = 'tray'); S._w = 0; },
    /* the cylinder contents: liquids that mix (water, milk, alcohol) form one phase, honey sinks as its own layer, oils float on top */
    PH: { water: 'aq', milk: 'aq', alc: 'aq', honey: 'hn', oil: 'oil', naft: 'oil' },
    phases(S) { const P = {}; for (const k in S.mix) { const v = S.mix[k]; if (v < .01) continue; const id = D.PH[k]; const q = P[id] || (P[id] = { id, ks: [], V: 0, m: 0, r: 0, g: 0, b: 0 }); q.ks.push(k); q.V += v; q.m += v * LQ[k].rho; const c = LQ[k].c; q.r += v * parseInt(c.substr(1, 2), 16); q.g += v * parseInt(c.substr(3, 2), 16); q.b += v * parseInt(c.substr(5, 2), 16); }
      return Object.values(P).map(q => ({ ...q, rho: q.m / q.V, c: '#' + [q.r, q.g, q.b].map(v => Math.round(v / q.V).toString(16).padStart(2, '0')).join('') })).sort((a, b) => b.rho - a.rho); },
    mixName(S) { const ks = Object.keys(S.mix || {}).filter(k => S.mix[k] > .01); return !ks.length ? '—' : ks.length === 1 ? LQ[ks[0]].n : 'خليط: ' + ks.map(k => LQ[k].n).join(' + '); },
    rhoMix(S) { return S.V > 0 ? (D.mass(S) - M1) / S.V : 0; },
    setup(S) { S.mix = {}; S.liq = null; S.V = 0; S.tare = 0; S.hold = null; S.bx = null; S.by2 = null; S.ang = 0; S.layers = []; S.fall = null; S.ob = OB.map((o, i) => ({ i, st: 'tray', x: null, y: null, yy: 0 })); S.hl = 'water'; S.s = 0; S.sv = 0; S.hd = false; },
    mass(S) { let m = M1; for (const k in (S.mix || {})) m += LQ[k].rho * S.mix[k]; return m; },
    geo(S) { const w = S.W, h = S.H, by = h * .84; return { w, h, by, cx: 70 + (w - 70) * .33, bw: 80, bh: 150, shelf: MK.map((_, i) => [w - 250 + (i % 3) * 80, by - (i < 3 ? 0 : 170)]) }; },
    upright(S) { return S.grip && S.gp ? [S.gp[0] - S.grip.lx, S.gp[1] - S.grip.ly] : [S.bx, S.by2]; },
    place(S, g) { if (!S.grip || !S.gp) return; const cs = Math.cos(S.ang), sn = Math.sin(S.ang), { lx, ly } = S.grip; S.bx = S.gp[0] - (lx * cs - ly * sn); S.by2 = Math.min(g.by, S.gp[1] - (lx * sn + ly * cs)); },
    bottleXY(S, g, k, list) { const i = list.indexOf(k); if (S.hold === k && S.bx != null) return [S.bx, S.by2]; if (S.bret && S.bret.k === k) { const R = S.bret, h = list === MK ? g.shelf[i] : [g.w - 70 - (list.length - 1 - i) * 76, g.by], e = R.t * R.t * (3 - 2 * R.t); return [lerp(R.x, h[0], e), lerp(R.y, h[1], e)]; } const n = list.length; return list === MK ? g.shelf[i] : [g.w - 70 - (n - 1 - i) * 76, g.by]; },
    target(S, g) { const m = S.p.mode; if (m === 'measure') { const cw = 64, ch = g.h * .5; return { x: g.cx, top: g.by - 64 - ch, w: cw }; } if (m === 'column') return { x: g.cx, top: g.by - g.h * .66, w: 130 }; return null; },
    update(S, dt) {
      const g = D.geo(S), m = S.p.mode; let pour = false;
      if (S.hold && (m === 'measure' || m === 'column')) { const T = D.target(S, g); const [x, y] = D.upright(S); if (Math.abs(x - T.x) < 140 && y < T.top + 60 && y > T.top - 260) { pour = true; } }
      S.hot = pour; S.ang += ((pour ? (D.upright(S)[0] > g.cx ? -1.9 : 1.9) : 0) - S.ang) * Math.min(1, dt * 6); S.pouring = pour && Math.abs(S.ang) > 1.3; if (S.hold) D.place(S, g);
      if (S.pouring) { const k = S.hold;
        if (m === 'measure') { const add = Math.min(40 * dt, CAP - S.V); if (add > 0) { if (S.liq && !S.mix[k] && !S._w) { Runner.toast('انتبه: تخلط سائلين الآن — الكثافة المقيسة ستكون كثافة الخليط', 'info'); S._w = 1; } S.mix[k] = (S.mix[k] || 0) + add; S.V += add; S.liq = Object.keys(S.mix).sort((a, b) => S.mix[b] - S.mix[a])[0]; } else S.pouring = false; }
        else { let L = S.layers.find(l => l.k === k); if (!L) { L = { k, V: 0 }; S.layers.push(L); S.fall = { k, t: 0 }; } if (S.layers.reduce((a, l) => a + l.V, 0) < 400) L.V += 60 * dt; S.layers.sort((a, b) => LQ[b.k].rho - LQ[a.k].rho); } } else S._w = 0;
      if (S.fall) { S.fall.t += dt; if (S.fall.t > 1.4) S.fall = null; }
      if (S.bret) { S.bret.t = Math.min(1, S.bret.t + dt * 4); if (S.bret.t >= 1) S.bret = null; }
      if (m === 'hydro') { const eq = 1 / LQ[S.hl].rho; if (!S.hd) { S.sv += (22 * (eq - S.s) - 3 * S.sv) * dt; S.s += S.sv * dt; } }
      S.ob.forEach(o => { if (o.st === 'in') { const t = D.obY(S, g, o); o.yy += (t - o.yy) * Math.min(1, dt * 3); } });
    },
    /* ---------- drawing ---------- */
    drawBottles(ctx, S, g, list) { list.forEach(k => { const [x, y] = D.bottleXY(S, g, k, list); const L = LQ[k]; const a = S.hold === k ? S.ang : S.bret && S.bret.k === k ? S.bret.a * (1 - S.bret.t) : 0; C1.bottle(ctx, x, y, 50, 110, .85, L.c, L.n, a, { ls: 10, capCol: '#334155' }); if (S.pouring && S.hold === k) { const lx = x + 110 * Math.sin(a), ly = y - 110 * Math.cos(a); const T = D.target(S, g); C1.stream(ctx, lx, ly, lx + (T.x - lx) * .2, D.surf(S, g), L.c === '#f8fafc' ? '#e2e8f0' : L.c, S.t, 5); } }); },
    surf(S, g) { const T = D.target(S, g); if (S.p.mode === 'measure') return g.by - 64 - 8 - (g.h * .5 - 22) * S.V / CAP; const tot = S.layers.reduce((a, l) => a + l.V, 0); return g.by - 10 - (g.h * .66 - 20) * tot / 450 - 2 + 0 * T.x; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { benchY: g.by });
      if (p.mode === 'measure') D.drawMeasure(ctx, S, g); else if (p.mode === 'column') D.drawColumn(ctx, S, g); else D.drawHydro(ctx, S, g);
      if (p.table) { const rows = [['الكحول', .79], ['النفط', .8], ['زيت الطعام', .92], ['الماء', 1], ['الحليب', 1.03], ['العسل', 1.42], ['الحديد', 7.86]]; const tx = 78, ty = w < 720 ? 250 : 14; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.93)'; rr(ctx, tx, ty, 150, 26 + rows.length * 16, 10); ctx.fill(); ctx.strokeStyle = '#cbd5e1'; ctx.stroke(); }); G.text(ctx, 'جدول الكثافات g/cm³', tx + 75, ty + 12, { s: 11, w: 900, c: '#334155', raw: 1 }); rows.forEach((r, i) => { G.text(ctx, r[0], tx + 140, ty + 30 + i * 16, { s: 11, c: '#334155', a: 'right', raw: 1 }); G.text(ctx, String(r[1]), tx + 12, ty + 30 + i * 16, { s: 11, c: '#7c3aed', a: 'left', mono: 1, w: 800, raw: 1 }); }); }
      K.party(ctx, S);
    },
    drawMeasure(ctx, S, g) {
      const p = S.p, T = D.target(S, g), ch = g.h * .5, m2 = D.mass(S); S.mix = S.mix || {};
      K.balance(ctx, g.cx, g.by - 64, m2 - S.tare, { w: 190 });
      const lev = g.by - 64 - (ch - 22) * S.V / CAP, per = (ch - 22) / CAP, x0 = g.cx - T.w / 2 + 2, PH = D.phases(S);
      if (S.V > 0) K.raw(ctx, () => { let yb = g.by - 64; PH.forEach((q, k) => { const hh = q.V * per, y0 = yb - hh; const lg = ctx.createLinearGradient(x0, 0, x0 + T.w - 4, 0); lg.addColorStop(0, q.c); lg.addColorStop(.5, shade(q.c, 25)); lg.addColorStop(1, q.c); ctx.globalAlpha = q.ks.includes('milk') ? .95 : .78; ctx.fillStyle = lg; ctx.fillRect(x0, y0, T.w - 4, hh); ctx.globalAlpha = 1;
          if (k < PH.length - 1) { ctx.strokeStyle = shade(q.c === '#f8fafc' ? '#94a3b8' : q.c, -45); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + T.w - 4, y0); ctx.stroke(); } yb = y0; });
        const top = PH[PH.length - 1]; ctx.strokeStyle = shade(top.c === '#f8fafc' ? '#94a3b8' : top.c, -45); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, lev - 3); ctx.quadraticCurveTo(g.cx, lev + 5, x0 + T.w - 4, lev - 3); ctx.stroke(); });
      K.cylinder(ctx, g.cx, g.by - 56, T.w, ch, CAP, 0, { step: 50, minor: 10 });
      if (PH.length > 1 || (PH[0] && PH[0].ks.length > 1)) { let yb = g.by - 64; PH.forEach(q => { const hh = q.V * per; if (hh > 16) K.tag(ctx, q.ks.map(k => LQ[k].n).join(' + '), x0 - 58, yb - hh / 2, { s: 11, bg: shade(q.c === '#f8fafc' ? '#94a3b8' : q.c, -60) }); yb -= hh; }); }
      else if (PH[0]) K.tag(ctx, LQ[PH[0].ks[0]].n, x0 - 50, lev + Math.min(40, (g.by - 64 - lev) / 2), { s: 11.5, bg: shade(PH[0].c === '#f8fafc' ? '#94a3b8' : PH[0].c, -60) });
      if (S.hold) C1.zone(ctx, g.cx, g.by - 64 - ch / 2 - 40, T.w + 120, ch + 90, S.hot, 'اسكب في الأسطوانة ⬇', { hot: 'يُسكب الآن ✓' });
      if (p.mol && S.V > 0) { const n = Math.round(10 * D.rhoMix(S)); K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.rect(g.cx - T.w / 2 + 2, lev + 2, T.w - 4, g.by - 66 - lev); ctx.clip(); const R = C1.rng(3); let yb = g.by - 64; PH.forEach(q => { const hh = q.V * per, nn = Math.round(10 * q.rho * hh / 40); for (let i = 0; i < nn; i++) K.ball(ctx, g.cx - T.w / 2 + 6 + R() * (T.w - 12), yb - hh + 4 + R() * Math.max(1, hh - 8), 3.5, shade(q.c === '#f8fafc' ? '#cbd5e1' : q.c, -50)); yb -= hh; }); ctx.restore(); }); void n; }
      C1.chip(ctx, g.cx, g.by + 46, 150, 32, '🫗 فرّغ الأسطوانة', false, '#0369a1', { s: 13 });
      D.drawBottles(ctx, S, g, MK);
      K.raw(ctx, () => { ctx.fillStyle = '#b7793f'; rr(ctx, g.w - 290, g.by - 172, 240, 8, 3); ctx.fill(); });
      if (p.calc) { const V = S.V, m = m2 - M1; const lines = S.V > 0 ? [`m₁ = ${M1} g  (فارغة)`, `m₂ = ${fmt(m2, 4)} g`, `m = m₂ − m₁ = ${fmt(m, 4)} g`, `V = ${fmt(V, 3)} cm³`, [`ρ = m / V = ${fmt(m / Math.max(V, 1e-9), 3)} g/cm³`, { s: 15, w: 900, c: '#6d28d9' }]] : [`m₁ = ${M1} g  (الأسطوانة فارغة)`, ['اسكب سائلاً في الأسطوانة', { s: 12.5, c: '#475569' }]];
        C1.card(ctx, g.w - 170, 14, 270, lines, { title: S.V > 0 ? (PH.length > 1 || PH[0].ks.length > 1 ? 'كثافة الخليط' : 'كثافة ' + LQ[PH[0].ks[0]].n) : 'قياس كثافة سائل', lh: 22 }); }
      if (S.tare) G.text(ctx, 'الميزان مُصفّر مع الأسطوانة: القراءة = كتلة السائل فقط', g.cx, g.by + 16, { s: 11.5, w: 800, c: '#fff', raw: 1, bg: 'rgba(22,101,52,.9)' });
      if (!S.liq && !S.hold) K.bubble(ctx, 'اسحب قنينة وارفعها فوق الأسطوانة ✋', g.w - 170, g.by - 200, { s: 12.5 });
    },
    obY(S, g, o) { const O = OB[o.i]; const bot = g.by - 10; let y = bot; const T = D.target(S, g); const scale = (g.h * .66 - 20) / 450; let acc = 0; const ls = S.layers.slice(); // bottom → top
      const tops = []; ls.forEach(l => { acc += l.V; tops.push({ k: l.k, top: bot - acc * scale, bot: bot - (acc - l.V) * scale }); });
      if (!tops.length) return bot - 10; for (let i = 0; i < tops.length; i++) { if (LQ[tops[i].k].rho > O.rho) { y = tops[i].top; } } const denser = tops.filter(t => LQ[t.k].rho > O.rho); if (!denser.length) return bot - 10; return denser[denser.length - 1].top + 2 + 0 * T.x; },
    drawColumn(ctx, S, g) {
      const T = D.target(S, g), H = g.h * .66, x0 = T.x - T.w / 2, bot = g.by - 10; const scale = (H - 20) / 450; let acc = 0;
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(x0, T.top, T.w, H - 10);
        S.layers.forEach(l => { const L = LQ[l.k]; const y1 = bot - acc * scale, y0 = y1 - l.V * scale; ctx.globalAlpha = .8; ctx.fillStyle = L.c; ctx.fillRect(x0 + 3, y0, T.w - 6, y1 - y0); ctx.globalAlpha = 1; acc += l.V; });
        if (S.fall) { const L = LQ[S.fall.k]; ctx.fillStyle = L.c; const R = C1.rng(9); for (let i = 0; i < 16; i++) { const yy = T.top + 30 + ((S.fall.t * 260 + R() * 300) % (bot - T.top - 40)); ctx.beginPath(); ctx.arc(x0 + 12 + R() * (T.w - 24), yy, 4, 0, TAU); ctx.fill(); } }
        ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, T.top); ctx.lineTo(x0, bot); ctx.lineTo(x0 + T.w, bot); ctx.lineTo(x0 + T.w, T.top); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(x0 + 6, T.top + 10, 6, H - 40); });
      acc = 0; S.layers.forEach(l => { const L = LQ[l.k]; const y1 = bot - acc * scale, y0 = y1 - l.V * scale; if (l.V > 12) K.tag(ctx, L.n + ' ' + L.rho, x0 - 70, (y0 + y1) / 2, { s: 11.5, bg: shade(L.c === '#f8fafc' ? '#94a3b8' : L.c, -60) }); acc += l.V; });
      if (S.layers.length > 1) { K.raw(ctx, () => G.arrow(ctx, x0 + T.w + 26, bot - 10, x0 + T.w + 26, bot - acc * scale + 10, '#7c3aed', 3, 10)); G.text(ctx, 'الكثافة تقل ↑', x0 + T.w + 60, bot - acc * scale / 2, { s: 12, w: 900, c: '#6d28d9', raw: 1, bg: 'rgba(255,255,255,.9)' }); }
      S.ob.forEach(o => { const O = OB[o.i]; let x, y; if (o.st === 'tray') [x, y] = C1.ease(o, ...D.obTray(g, o.i)); else if (o.st === 'hold') [x, y] = C1.ease(o, o.x, o.y, true); else [x, y] = C1.ease(o, T.x - 36 + o.i * 24, o.yy, false, 20); K.ball(ctx, x, y - 10, o.i === 3 ? 9 : 11, O.c); if (o.i === 3) G.text(ctx, '⬡', x, y - 10, { s: 11, c: '#fff', raw: 1 }); if (o.st === 'tray') G.text(ctx, O.n, x, y + 12, { s: 10.5, w: 800, c: '#fff', raw: 1, bg: 'rgba(30,41,59,.8)' }); });
      if (S.hold) C1.zone(ctx, T.x, T.top + (g.by - T.top) / 2 - 30, T.w + 130, g.by - T.top + 70, S.hot, 'اسكب في الوعاء ⬇', { hot: 'يُسكب الآن ✓' });
      const ho = S.ob.find(o => o.st === 'hold'); if (ho) C1.zone(ctx, T.x, T.top + (g.by - T.top) / 2, T.w + 60, g.by - T.top + 10, D.hotO(S, g, ho), 'أسقطه في الوعاء ⬇');
      C1.chip(ctx, T.x, g.by + 30, 140, 32, '🫗 فرّغ الوعاء', false, '#0369a1', { s: 13 });
      D.drawBottles(ctx, S, g, CK);
      if (S.p.calc) C1.card(ctx, g.w - 170, 14, 260, [['السائل الأقل كثافة يطفو في الأعلى', { s: 12.5 }], ['والأكبر كثافة يستقر في الأسفل', { s: 12.5 }], ['الجسم يطفو فوق سائل أكبر منه كثافة', { s: 12, c: '#6d28d9', w: 800 }]], { title: 'اختلاف كثافة السوائل', lh: 22 });
      if (!S.layers.length && !S.hold) K.bubble(ctx, 'اسكب السوائل في الوعاء بأي ترتيب ✋', g.w - 180, g.by - 130, { s: 12.5 });
    },
    hotO(S, g, o) { const T = D.target(S, g); return Math.abs(o.x - T.x) < T.w / 2 + 40 && o.y < g.by + 10 && o.y > T.top - 200; },
    obTray(g, i) { return [g.cx + 150 + (i % 2) * 64, g.by - 150 - (i >> 1) * 56]; },
    hGeo(S, g) { const x = g.cx + 30, top = g.h * .22, bot = g.by - 6, cw = 130; const surf = top + (bot - top) * .25; const L0 = (bot - top) * .5; return { x, top, bot, cw, surf, L0 }; },
    drawHydro(ctx, S, g) {
      const H = D.hGeo(S, g), L = LQ[S.hl]; const sub = S.s * H.L0; const hb = H.surf + sub; // hydrometer bottom y
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(H.x - H.cw / 2, H.top, H.cw, H.bot - H.top); ctx.globalAlpha = S.hl === 'milk' ? .95 : .6; ctx.fillStyle = L.c; ctx.fillRect(H.x - H.cw / 2 + 3, H.surf, H.cw - 6, H.bot - H.surf); ctx.globalAlpha = 1; if (S.hl === 'milk') { ctx.globalAlpha = .45; } });
      // hydrometer: bulb + lead + stem with scale
      const sx = H.x, stemTop = hb - H.L0 * 1.6; K.raw(ctx, () => { ctx.globalAlpha = 1; ctx.fillStyle = 'rgba(241,245,249,.95)'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(sx, hb - 32, 17, 34, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.ellipse(sx, hb - 12, 12, 11, 0, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(241,245,249,.95)'; ctx.fillRect(sx - 7, stemTop, 14, hb - 64 - stemTop); ctx.strokeRect(sx - 7, stemTop, 14, hb - 64 - stemTop);
        ctx.fillStyle = '#1e293b'; ctx.font = '700 10px ui-monospace,monospace'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr';
        for (let r = .7; r <= 1.501; r += .05) { const yy = hb - H.L0 / r; if (yy < stemTop + 4 || yy > hb - 66) continue; const maj = Math.abs(r * 10 - Math.round(r * 10)) < .01; ctx.strokeStyle = '#1e293b'; ctx.lineWidth = maj ? 1.4 : .8; ctx.beginPath(); ctx.moveTo(sx - 7, yy); ctx.lineTo(sx - 7 + (maj ? 9 : 5), yy); ctx.stroke(); if (maj) ctx.fillText(r.toFixed(1), sx + 10, yy); } });
      K.raw(ctx, () => { ctx.globalAlpha = .35; ctx.fillStyle = L.c; ctx.fillRect(H.x - H.cw / 2 + 3, H.surf, H.cw - 6, H.bot - H.surf); ctx.globalAlpha = 1; ctx.strokeStyle = shade(L.c === '#f8fafc' ? '#94a3b8' : L.c, -40); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(H.x - H.cw / 2, H.surf); ctx.lineTo(H.x + H.cw / 2, H.surf); ctx.stroke();
        ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(H.x - H.cw / 2, H.top); ctx.lineTo(H.x - H.cw / 2, H.bot); ctx.lineTo(H.x + H.cw / 2, H.bot); ctx.lineTo(H.x + H.cw / 2, H.top); ctx.stroke(); });
      const rdv = 1 / Math.max(S.s, .3); K.tag(ctx, 'ρ ≈ ' + fmt(rdv, 2) + ' g/cm³', H.x + H.cw / 2 + 80, H.surf, { s: 13, bg: '#6d28d9' }); K.raw(ctx, () => G.arrow(ctx, H.x + H.cw / 2 + 20, H.surf, H.x + 12, H.surf, '#6d28d9', 2, 7));
      G.text(ctx, 'مكثاف', sx - 34, hb - 32, { s: 11, w: 800, c: '#334155', raw: 1, bg: 'rgba(255,255,255,.85)' }); G.text(ctx, 'رصاص', sx + 36, hb - 12, { s: 10.5, w: 800, c: '#334155', raw: 1, bg: 'rgba(255,255,255,.85)' });
      HK.forEach((k, i) => C1.chip(ctx, D.hChipX(g, i), g.by + 30, 104, 30, LQ[k].n, S.hl === k, shade(LQ[k].c === '#f8fafc' ? '#94a3b8' : LQ[k].c, -50)));
      if (S.p.calc) C1.card(ctx, g.w - 150, 14, 250, [['يغوص المكثاف أكثر في السائل', { s: 12.5 }], ['الأقل كثافة، وأقل في الأكبر كثافة', { s: 12.5 }], [LQ[S.hl].n + ': ρ = ' + LQ[S.hl].rho + ' g/cm³', { s: 14, w: 900, c: '#6d28d9' }]], { title: 'المكثاف', lh: 22 });
    },
    hChipX(g, i) { return g.w - 70 - i * 112; },
    drags(S) {
      const g = D.geo(S), m = S.p.mode, L = [];
      if (m === 'hydro') { const H = D.hGeo(S, g); const hb = H.surf + S.s * H.L0; HK.forEach((k, i) => L.push({ id: 'h_' + k, x: D.hChipX(g, i), y: g.by + 30, w: 104, h: 30, hint: false, tip: 'اختر السائل: ' + LQ[k].n, click: S => { S.hl = k; S.sv = -.4; } }));
        L.push({ id: 'hydro', x: H.x, y: hb - H.L0 * 1.2, w: 40, h: H.L0 * 1.4, axis: 'y', idle: 'اضغط المكثاف إلى الأسفل ثم اتركه ✋', tip: 'اسحب المكثاف للأسفل أو للأعلى واتركه ليطفو', down: S => { S.hd = true; }, drag: (S, d) => { S.s = clamp(S.s + d.dy / H.L0, .3, 1.8); S.sv = 0; }, up: S => { S.hd = false; } });
        return L; }
      { const T = D.target(S, g); L.push({ id: 'empty', x: T.x, y: m === 'measure' ? g.by + 46 : g.by + 30, w: 150, h: 34, hint: false, tip: 'فرّغ الإناء من السوائل', click: S => { D.empty(S); S.last = 'empty'; } }); }
      const list = m === 'measure' ? MK : CK;
      list.forEach((k, i) => { const [x, y] = D.bottleXY(S, g, k, list); L.push({ id: 'b_' + k, x, y: y - 55, w: 66, h: 124, axis: 'xy', hint: i === 0, idle: i === 0 ? 'اسحب القنينة فوق ' + (m === 'measure' ? 'الأسطوانة' : 'الوعاء') + ' ✋' : undefined, tip: 'اسحب القنينة وارفعها فوق الإناء للسكب',
        keep: true, down: (S, px, py) => { S.hold = k; S.bx = x; S.by2 = y; S.ang = 0; S.grip = { lx: px - x, ly: py - y }; S.gp = [px, py]; S.bret = null; }, drag: (S, d) => { S.gp = [clamp(d.x, 60, g.w - 10), clamp(d.y, 10, g.by + 20)]; D.place(S, g); }, up: S => { S.bret = { k, x: S.bx, y: S.by2, a: S.ang, t: 0 }; S.hold = null; S.bx = null; S.last = k; S.grip = null; } }); });
      if (m === 'column') { const T = D.target(S, g); S.ob.forEach(o => { if (o.st === 'in') return; const [x, y] = o.st === 'hold' ? [o.x, o.y] : D.obTray(g, o.i); L.push({ id: 'o_' + OB[o.i].k, x, y: y - 10, r: 28, axis: 'xy', hint: false, tip: 'أسقط ' + OB[o.i].n + ' في الوعاء',
        keep: true, down: S => { o.st = 'hold'; o.x = x; o.y = y; }, drag: (S, d) => { o.x = x + d.x - d.sx; o.y = y + d.y - d.sy; }, up: S => { if (o.st !== 'hold') return; if (D.hotO(S, g, o)) { o.st = 'in'; o.yy = Math.min(Math.max(o.y, T.top + 10), g.by - 20); C1.good(); S.last = o.i; if (!S.layers.length) Runner.toast('اسكب السوائل أولاً', 'info'); } else o.st = 'tray'; } }); }); }
      return L;
    },
    readings(S) { const m = S.p.mode; if (m === 'hydro') return [rd('السائل', LQ[S.hl].n), rd('قراءة المكثاف', fmt(1 / Math.max(S.s, .3), 3) + ' g/cm³'), rd('الكثافة من الجدول', LQ[S.hl].rho + ' g/cm³')];
      if (m === 'column') return [rd('الطبقات (من الأسفل)', S.layers.map(l => LQ[l.k].n).join(' ← ') || '—', 1)].concat(S.ob.filter(o => o.st === 'in').map(o => rd(OB[o.i].n, 'كثافته ' + OB[o.i].rho + ' g/cm³')));
      const m2 = D.mass(S); return [rd('السائل', D.mixName(S)), rd('m₁ (فارغة)', M1 + ' g'), rd('m₂ (مع السائل)', fmt(m2, 4) + ' g'), rd('V', fmt(S.V, 3) + ' cm³'), rd('ρ = (m₂ − m₁) / V', S.V > 0 ? fmt((m2 - M1) / S.V, 3) + ' g/cm³' : '—', 1)]; },
    record(S) { if (S.p.mode !== 'measure') { Runner.toast('الجدول لنشاط «قياس الكثافة»', 'info'); return null; } if (!S.liq || S.V < 5) { Runner.toast('اسكب سائلاً في الأسطوانة أولاً', 'info'); return null; } const m2 = D.mass(S), V = Math.round(S.V); if (S.rows.length === 2) K.cheer(S, S.W / 2, S.H * .3); return { l: D.mixName(S), V, m1: M1, m2: +m2.toFixed(1), m: +(m2 - M1).toFixed(1), rho: +((m2 - M1) / S.V).toFixed(2) }; },
    cols: [['l', 'السائل'], ['V', 'V (cm³)'], ['m1', 'm₁ (g)'], ['m2', 'm₂ (g)'], ['m', 'm (g)'], ['rho', 'ρ (g/cm³)']],
    graph: { x: 'V', y: 'm', xl: 'الحجم V (cm³)', yl: 'كتلة السائل m (g)', fit: { u: 'g/cm³', t: () => 'الميل = الكثافة' } },
    explain(S) { const m = S.p.mode; if (m === 'hydro') return `المكثاف يطفو ويغوص حتى يزيح سائلاً وزنه يساوي وزنه. في <b>${LQ[S.hl].n}</b> (<b dir="ltr">${LQ[S.hl].rho} g/cm³</b>) نقرأ الكثافة عند سطح السائل على ساق المكثاف.`; if (m === 'column') return 'السوائل التي لا تختلط تترتب حسب كثافتها: <b>العسل</b> في الأسفل، ثم <b>الماء</b>، ثم <b>الزيت</b>، ثم <b>الكحول</b> في الأعلى. الفلين يطفو فوق الجميع والحديد يغوص إلى القاع.'; if (!S.liq) return 'الأسطوانة المدرجة الفارغة على الميزان كتلتها <b dir="ltr">120 g</b> (m₁). اسكب فيها سائلاً.'; const m2 = D.mass(S); return `كتلة ${D.mixName(S).replace('خليط: ', 'الخليط (') + (D.mixName(S).startsWith('خليط') ? ')' : '')} = <b dir="ltr">${fmt(m2, 4)} − 120 = ${fmt(m2 - M1, 4)} g</b>، وحجمه <b dir="ltr">${fmt(S.V, 3)} cm³</b>، فكثافته <b dir="ltr">ρ = ${fmt((m2 - M1) / S.V, 3)} g/cm³</b>.`; },
    quiz: [
      { q: 'سائلان (ماء ونفط) وُضعا في وعاء واحد ولا يختلطان. أيهما يكون في الطبقة العليا؟', o: ['الماء', 'النفط', 'يختلطان بالتساوي'], a: 1, why: 'كثافة النفط (0.8 g/cm³) أقل من كثافة الماء (1 g/cm³) فيطفو فوقه.' },
      { q: 'رتّب من الأقل كثافة إلى الأعلى كثافة: النفط، الحديد، الماء', o: ['الماء، النفط، الحديد', 'النفط، الماء، الحديد', 'الحديد، الماء، النفط'], a: 1, why: 'النفط 0.8 < الماء 1 < الحديد 7.86 g/cm³.' },
      { q: 'لقياس كثافة حليب بأسطوانة مدرجة وميزان رقمي، نحسب كتلة الحليب بـ:', o: ['طرح كتلة الأسطوانة فارغة من كتلتها مع الحليب', 'جمع الكتلتين', 'قراءة التدريج فقط'], a: 0, why: 'm = m₂ − m₁ ثم ρ = m / V.' }
    ]
  };
  X7(D);
})();

/* ---------- مثال: هل القطعة من الذهب الخالص؟ (ص 22) — تحدٍّ بوليسي ---------- */
(() => {
  const CR = [{ n: 'تاج الكتاب', m: 1800, v: 110 }, { n: 'التاج الثاني', m: 1930, v: 100 }, { n: 'التاج الثالث', m: 1050, v: 100 }];
  const W1 = 200, CAP = 500, GOLD = 19.3;
  const D = {
    id: 'g7_gold', ch: 11, sec: 'الدرس 3', page: 22, kind: 'نشاط', title: 'تحدٍّ: هل التاج من الذهب الخالص؟',
    desc: 'قطعة ذهبية صلدة غير معروفة نقاوتها: نقيس كتلتها بالميزان وحجمها بإزاحة الماء، ثم نحسب كثافتها ونقارنها بكثافة الذهب الخالص 19.3 g/cm³.',
    tags: 'كثافة ذهب خالص أرخميدس تاج إزاحة ميزان',
    tools: ['تاج (قطعة ذهبية)', 'ميزان رقمي', 'أسطوانة مدرجة 500 cm³ فيها 200 cm³ ماء', 'جدول الكثافات'],
    steps: ['اسحب التاج إلى الميزان الرقمي واقرأ كتلته m (تُسجَّل في ملف القضية).',
      'اسحب التاج إلى الأسطوانة المدرجة واقرأ ارتفاع الماء: الحجم V = V₂ − V₁.',
      'احسب الكثافة ρ = m / V (تظهر في ملف القضية).',
      'قارن مع كثافة الذهب الخالص 19.3 g/cm³ واضغط حكمك: «ذهب خالص» أو «ليس ذهباً خالصاً».',
      'جرّب التاجين الآخرين. هل تستطيع معرفة مادة التاج الثالث من جدول الكثافات؟'],
    concl: ['تاج الكتاب: ρ = 1800 ÷ 110 = 16.36 g/cm³ وهي أقل من 19.3 g/cm³، إذن القطعة ليست من الذهب الخالص.', 'الكثافة خاصية فيزيائية تساعد على تحديد هوية المادة ومعرفة نقاوتها.', 'لإيجاد الكثافة نقيس الكتلة بالميزان والحجم (للجسم غير المنتظم) بإزاحة الماء، ثم نقسم.'],
    laws: ['g7_rho', 'g7_vdisp'],
    fact: ['تقول القصة إن أرخميدس صاح «وجدتها!» عندما عرف كيف يكشف غش تاج الملك باستعمال الماء.', 'يستعمل الذهب في صنع الحلي لأنه قابل للسحب والطرق إلى درجة عالية، وليس لأنه نادر فقط.', 'كثافة الفضة 10.5 g/cm³ — حوالي نصف كثافة الذهب.'],
    controls: [
      SEL('crown', 'التاج', CR.map((c, i) => [i, c.n]), 0, (v, S, init) => { if (!init) D.reset(S); }),
      BT('', [{ t: 'ابدأ القضية من جديد', on: S => D.reset(S) }]),
      TG('table', 'جدول الكثافات', true, null, 'labels'), TG('ref', 'سبيكة ذهب خالص للمقارنة (الكتلة نفسها)', false, null, 'eye')],
    setup(S) { D.reset(S); },
    reset(S) { S.pl = 'table'; S.mm = null; S.vv = null; S.verd = 0; S.x = null; S.y = null; S.lv = W1; S.bal = 0; S.msg = null; },
    C(S) { return CR[+S.p.crown]; },
    geo(S) { const w = S.W, h = S.H, by = h * .84; return { w, h, by, bx: 70 + (w - 70) * .22, cx: 70 + (w - 70) * .55, cw: 110, ch: h * .5, tx: w - 120 }; },
    /* where would the crown land if released now? nearest generous target */
    where(S, g) { if (S.x == null) return null; const db = Math.hypot((S.x - g.bx) / 1.3, S.y - (g.by - 90)), dc = Math.hypot((S.x - g.cx) / 1.1, S.y - (g.by - g.ch * .6)); const nb = Math.abs(S.x - g.bx) < 140 && S.y > g.by - 300 && S.y < g.by + 30, nc = Math.abs(S.x - g.cx) < g.cw / 2 + 80 && S.y > g.by - g.ch - 200 && S.y < g.by + 30; return nb && nc ? (db < dc ? 'bal' : 'cyl') : nb ? 'bal' : nc ? 'cyl' : null; },
    crownXY(S, g) { if (S.x != null) return [S.x, S.y]; if (S.pl === 'bal') return [g.bx, g.by - 64]; if (S.pl === 'cyl') return [g.cx, g.by - 12]; return [g.tx, g.by - 4]; },
    update(S, dt) { const g = D.geo(S), C = D.C(S); const t = W1 + (S.pl === 'cyl' ? C.v : 0); S.lv += (t - S.lv) * Math.min(1, dt * 4); S.bal += ((S.pl === 'bal' ? C.m : 0) - S.bal) * Math.min(1, dt * 6); if (S.pl === 'cyl' && Math.abs(S.lv - t) < .5 && S.vv == null) { S.vv = C.v; C1.good(); } if (S.pl === 'bal' && Math.abs(S.bal - C.m) < .5 && S.mm == null) { S.mm = C.m; C1.good(); } void g; },
    crown(ctx, x, y, s, gold = '#facc15') { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); const gr = ctx.createLinearGradient(-s, -s, s, 0); gr.addColorStop(0, '#fef08a'); gr.addColorStop(.5, gold); gr.addColorStop(1, '#a16207'); ctx.fillStyle = gr; ctx.strokeStyle = '#854d0e'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-s, 0); ctx.lineTo(-s, -s * .7); ctx.lineTo(-s * .5, -s * .3); ctx.lineTo(0, -s * .95); ctx.lineTo(s * .5, -s * .3); ctx.lineTo(s, -s * .7); ctx.lineTo(s, 0); ctx.closePath(); ctx.fill(); ctx.stroke(); [[-s, -s * .7], [0, -s * .95], [s, -s * .7]].forEach(([a, b]) => { ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(a, b, s * .1, 0, TAU); ctx.fill(); }); ctx.fillStyle = '#3b82f6'; ctx.beginPath(); ctx.arc(0, -s * .25, s * .12, 0, TAU); ctx.fill(); ctx.restore(); }); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, C = D.C(S); K.bg(ctx, w, h, { benchY: g.by });
      K.balance(ctx, g.bx, g.by - 56, S.bal, { w: 200 }); G.text(ctx, 'الميزان: الكتلة m', g.bx, g.by + 18, { s: 12, w: 800, c: '#fff', raw: 1, bg: 'rgba(30,41,59,.8)' });
      const G2 = K.cylinder(ctx, g.cx, g.by, g.cw, g.ch, CAP, S.lv, { step: 100, minor: 20, unit: 'cm³' }); G.text(ctx, 'المخبار: الحجم V', g.cx, g.by + 18, { s: 12, w: 800, c: '#fff', raw: 1, bg: 'rgba(30,41,59,.8)' });
      const y1 = g.by - 8 - (g.ch - 22) * W1 / CAP; K.raw(ctx, () => { ctx.strokeStyle = '#f59e0b'; ctx.setLineDash([5, 4]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.cx - g.cw / 2 - 26, y1); ctx.lineTo(g.cx + g.cw / 2, y1); ctx.stroke(); ctx.setLineDash([]); }); K.tag(ctx, 'V₁ = 200', g.cx - g.cw / 2 - 52, y1, { s: 11.5, bg: '#d97706' });
      if (S.pl === 'cyl') K.tag(ctx, 'V₂ = ' + Math.round(S.lv), g.cx - g.cw / 2 - 52, G2.lev, { s: 11.5, bg: '#16a34a' });
      if (S.pl === 'hold') { const wh = D.where(S, g); C1.zone(ctx, g.bx, g.by - 92, 230, 120, wh === 'bal', 'ضعه على الميزان ⬇'); C1.zone(ctx, g.cx, g.by - g.ch / 2 - 20, g.cw + 90, g.ch + 60, wh === 'cyl', 'أسقطه في المخبار ⬇'); }
      const [x0c, y0c] = D.crownXY(S, g); S._cr = S._cr || {}; const [x, y] = C1.ease(S._cr, x0c, y0c, S.pl === 'hold', 14); D.crown(ctx, x, y, S.pl === 'cyl' && S.x == null ? 34 : 42);
      if (S.pl === 'cyl' && S.x == null) K.raw(ctx, () => { ctx.globalAlpha = .3; ctx.fillStyle = '#38bdf8'; ctx.fillRect(g.cx - g.cw / 2 + 2, G2.lev, g.cw - 4, g.by - 8 - G2.lev); ctx.globalAlpha = 1; });
      if (S.pl === 'table' && S.x == null) G.text(ctx, C.n, g.tx, g.by + 18, { s: 12, w: 800, c: '#fff', raw: 1, bg: '#a16207' });
      if (p.ref) { const vr = C.m / GOLD; K.box(ctx, g.tx - 30, g.by - 150, 60, 22, 26, 'gold'); G.text(ctx, 'ذهب خالص ' + C.m + ' g', g.tx + 5, g.by - 222, { s: 11.5, w: 800, c: '#854d0e', raw: 1, bg: 'rgba(254,249,195,.95)' }); G.text(ctx, 'V = ' + fmt(vr, 1) + ' cm³', g.tx + 5, g.by - 200, { s: 11.5, w: 800, c: '#854d0e', raw: 1, mono: 1 }); }
      // case file
      const rho = S.mm && S.vv ? S.mm / S.vv : null; const L = [(S.mm ? `m = ${S.mm} g ✓` : 'الكتلة: ؟ (استعمل الميزان)'), (S.vv ? `V = ${W1 + S.vv} − ${W1} = ${S.vv} cm³ ✓` : 'الحجم: ؟ (استعمل المخبار)'), [rho ? `ρ = ${S.mm} / ${S.vv} = ${fmt(rho, 2)} g/cm³` : 'الكثافة: ؟', { s: 14.5, w: 900, c: '#6d28d9' }], ['الذهب الخالص: 19.3 g/cm³', { s: 12.5, c: '#a16207', w: 800 }]];
      C1.card(ctx, w - 170, 12, 290, L, { title: '🔎 ملف القضية: ' + C.n, bd: '#a16207', lh: 23 });
      if (rho) { C1.chip(ctx, w - 245, 184, 130, 34, '✓ ذهب خالص', S.verd === 1, '#16a34a'); C1.chip(ctx, w - 100, 184, 140, 34, '✗ ليس خالصاً', S.verd === 2, '#dc2626'); }
      if (S.msg) K.bubble(ctx, S.msg.t, w / 2, 270, { s: 13, bg: S.msg.ok ? '#dcfce7' : '#fee2e2', bd: S.msg.ok ? '#16a34a' : '#dc2626', c: S.msg.ok ? '#14532d' : '#7f1d1d' });
      if (p.table) { const rows = [['الذهب', 19.3], ['الرصاص', 11.3], ['الفضة', 10.5], ['النحاس', 8.9], ['الحديد', 7.86]]; const tx = 78, ty = w < 720 ? 250 : 14; K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.93)'; rr(ctx, tx, ty, 140, 24 + rows.length * 16, 10); ctx.fill(); ctx.strokeStyle = '#cbd5e1'; ctx.stroke(); }); G.text(ctx, 'جدول الكثافات g/cm³', tx + 70, ty + 12, { s: 11, w: 900, c: '#334155', raw: 1 }); rows.forEach((r, i) => { G.text(ctx, r[0], tx + 130, ty + 30 + i * 16, { s: 11, c: '#334155', a: 'right', raw: 1 }); G.text(ctx, String(r[1]), tx + 12, ty + 30 + i * 16, { s: 11, c: '#7c3aed', a: 'left', mono: 1, w: 800, raw: 1 }); }); }
      if (!S.mm && !S.vv && S.pl === 'table') K.bubble(ctx, 'أيها المحقق: اسحب التاج إلى الميزان أولاً 🕵️', g.tx - 60, g.by - 70, { s: 12.5, side: 'l' });
      K.party(ctx, S);
    },
    drags(S) { const g = D.geo(S), L = []; const [x, y] = D.crownXY(S, g);
      L.push({ id: 'crown', x, y: y - 20, r: 50, axis: 'xy', idle: 'اسحب التاج ✋', tip: 'اسحب التاج إلى الميزان أو إلى المخبار',
        keep: true, down: S => { S.x = x; S.y = y; S.from = S.pl; S.pl = 'hold'; }, drag: (S, d) => { S.x = x + d.x - d.sx; S.y = y + d.y - d.sy; },
        up: S => { if (S.pl !== 'hold') return; const wh = D.where(S, g); S.pl = wh || 'table'; if (wh) C1.good(); S.x = null; S.y = null; } });
      const rho = S.mm && S.vv ? S.mm / S.vv : null; if (rho) [[S.W - 245, 1], [S.W - 100, 2]].forEach(([cx, v]) => L.push({ id: 'v' + v, x: cx, y: 184, w: 135, h: 34, hint: false, tip: 'حكمك', click: S => { S.verd = v; const pure = Math.abs(rho - GOLD) < .2; const ok = (v === 1) === pure; S.msg = { ok, t: ok ? (pure ? 'أحسنت! كثافته 19.3 g/cm³ = كثافة الذهب الخالص ✓' : 'أحسنت! كثافته ' + fmt(rho, 2) + ' أقل من 19.3 — ليس ذهباً خالصاً') : 'قارن الكثافة مرة أخرى مع 19.3 g/cm³' }; if (ok) K.cheer(S, S.W / 2, 200); else C1.wrong(); } }));
      return L; },
    readings(S) { const C = D.C(S); const rho = S.mm && S.vv ? S.mm / S.vv : null; return [rd('التاج', C.n), rd('الكتلة m', S.mm ? S.mm + ' g' : '—'), rd('الحجم V', S.vv ? S.vv + ' cm³' : '—'), rd('الكثافة ρ', rho ? fmt(rho, 2) + ' g/cm³' : '—'), rd('الحكم', !rho ? '—' : Math.abs(rho - GOLD) < .2 ? 'ذهب خالص' : 'ليس ذهباً خالصاً', 1)]; },
    record(S) { const C = D.C(S); if (!S.mm || !S.vv) { Runner.toast('قِس الكتلة والحجم أولاً', 'info'); return null; } const rho = S.mm / S.vv; return { c: C.n, m: S.mm, V: S.vv, rho: +rho.toFixed(2), r: Math.abs(rho - GOLD) < .2 ? 'ذهب خالص' : 'ليس خالصاً' }; },
    cols: [['c', 'القطعة'], ['m', 'm (g)'], ['V', 'V (cm³)'], ['rho', 'ρ (g/cm³)'], ['r', 'النتيجة']],
    explain(S) { const rho = S.mm && S.vv ? S.mm / S.vv : null; if (!rho) return 'لمعرفة نقاوة الذهب نحتاج <b>الكثافة</b>: نقيس الكتلة بالميزان، والحجم بإزاحة الماء لأن شكل التاج غير منتظم.'; return `<b dir="ltr">ρ = ${S.mm} ÷ ${S.vv} = ${fmt(rho, 2)} g/cm³</b>. ${Math.abs(rho - GOLD) < .2 ? 'تساوي كثافة الذهب الخالص فالتاج من الذهب الخالص.' : rho < GOLD ? 'أقل من كثافة الذهب الخالص (19.3) فالتاج مغشوش بمعدن أخف' + (Math.abs(rho - 10.5) < .2 ? ' — بل كثافته تساوي كثافة <b>الفضة</b>!' : '.') : ''}`; },
    quiz: [
      { q: 'قطعة ذهبية حجمها 110 cm³ وكتلتها 1800 g. كثافتها تقريباً:', o: ['16.36 g/cm³', '19.3 g/cm³', '198000 g/cm³'], a: 0, why: 'ρ = 1800 ÷ 110 ≈ 16.36 g/cm³ — أقل من 19.3 فليست ذهباً خالصاً.' },
      { q: 'لديك قطعة معدنية، كيف تحدد أنها من الفضة النقية؟', o: ['من لونها فقط', 'أحسب كثافتها من كتلتها وحجمها وأقارنها بكثافة الفضة 10.5 g/cm³', 'أقيس طولها'], a: 1, why: 'الكثافة خاصية تحدد هوية المادة.' },
      { q: 'مكعب من الألمنيوم كتلته 70.74 g وحجمه 26.2 cm³. كثافته:', o: ['2.7 g/cm³', '44.5 g/cm³', '0.37 g/cm³'], a: 0, why: 'ρ = 70.74 ÷ 26.2 = 2.7 g/cm³.' }
    ]
  };
  X7(D);
})();

