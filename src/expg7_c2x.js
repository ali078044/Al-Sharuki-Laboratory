'use strict';
/* ==== grade 7, chapter 2 — extra, clearer examples (teacher feedback) ==== */
const C2X = {
  addScene(E, key, label) { const c = E.controls.find(x => x.k === 'sc'); if (c && !c.opts.some(o => o[0] === key)) c.opts.push([key, label]); },
  wrap(E, keys, impl) { // impl: {setup?, update, draw, drags, readings, explain}
    const o = { update: E.update, draw: E.draw, drags: E.drags, readings: E.readings, explain: E.explain };
    const mine = S => keys.includes(S.p.sc);
    E.update = function (S, dt) { if (mine(S)) return impl.update(S, dt); return o.update && o.update.call(this, S, dt); };
    E.draw = function (ctx, w, h, S) { if (mine(S)) return impl.draw(ctx, w, h, S); return o.draw.call(this, ctx, w, h, S); };
    E.drags = function (S) { if (mine(S)) return impl.drags(S); return o.drags ? o.drags.call(this, S) : []; };
    E.readings = function (S) { if (mine(S)) return impl.readings(S); return o.readings ? o.readings.call(this, S) : []; };
    E.explain = function (S) { if (mine(S)) return impl.explain(S); return o.explain ? o.explain.call(this, S) : ''; };
  },
  btn(ctx, x, y, w, h, t, col, on) { K.raw(ctx, () => { ctx.fillStyle = on ? col : '#ffffff'; ctx.strokeStyle = col; ctx.lineWidth = 2.5; rr(ctx, x - w / 2, y - h / 2, w, h, 12); ctx.fill(); ctx.stroke(); }); G.text(ctx, t, x, y, { s: 14, w: 900, c: on ? '#fff' : col, raw: 1 }); },
  arrow(ctx, x, y, dx, dy, col, w, label) { if (Math.hypot(dx, dy) < 3) return; K.raw(ctx, () => G.arrow(ctx, x, y, x + dx, y + dy, col, w, 10 + w * 1.6)); if (label) G.text(ctx, label, x + dx / 2, y + dy / 2 - 16, { s: 12.5, w: 900, c: '#fff', bg: col, raw: 1 }); }
};

/* ---------- g7_move: football — force starts motion, stops it, changes its direction ---------- */
(() => {
  const E = EXPS.find(e => e.id === 'g7_move'); if (!E) return;
  C2X.addScene(E, 'ball', '⚽ كرة القدم');
  const ev = (S, k, msg) => { S.fb.ev = { k, t: 1.6, msg }; };
  C2X.wrap(E, ['ball'], {
    update(S, dt) {
      const b = S.fb || (S.fb = { x: .12, y: .7, vx: 0, vy: 0, stage: 0, ev: null });
      b.x += b.vx * dt; b.y += b.vy * dt; b.vx *= Math.pow(.92, dt); b.vy *= Math.pow(.92, dt);
      if (b.y < .25) { b.y = .25; b.vy = Math.abs(b.vy); } if (b.y > .86) { b.y = .86; b.vy = -Math.abs(b.vy); }
      if (b.x > .93) { b.x = .93; b.vx = 0; b.vy = 0; if (!b.goal) { b.goal = 1; ev(S, 'goal', 'هدف! ⚽'); K.cheer(S, S.W * .85, S.H * .4); } }
      if (b.x < .04) { b.x = .04; b.vx = Math.abs(b.vx); }
      if (b.ev) b.ev.t -= dt;
    },
    draw(ctx, w, h, S) {
      const b = S.fb || (S.fb = { x: .12, y: .7, vx: 0, vy: 0 }); const p = S.p;
      K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#bbf7d0'); g.addColorStop(1, '#16a34a'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 3; ctx.strokeRect(70, h * .2, w - 100, h * .72); ctx.beginPath(); ctx.moveTo(w * .55, h * .2); ctx.lineTo(w * .55, h * .92); ctx.stroke();
        ctx.fillStyle = '#fff'; ctx.fillRect(w - 44, h * .38, 10, h * .3); ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; for (let k = 0; k < 8; k++) { ctx.beginPath(); ctx.moveTo(w - 34, h * .38 + k * h * .04); ctx.lineTo(w - 10, h * .38 + k * h * .04); ctx.stroke(); } });
      const X = x => 70 + x * (w - 110), Y = y => y * h; const bx = X(b.x), by = Y(b.y);
      K.raw(ctx, () => { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(bx, by, 16, 0, TAU); ctx.fill(); ctx.strokeStyle = '#111'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillStyle = '#111'; for (let k = 0; k < 5; k++) { const a = k * TAU / 5 + b.x * 20; ctx.beginPath(); ctx.arc(bx + Math.cos(a) * 9, by + Math.sin(a) * 9, 3.5, 0, TAU); ctx.fill(); } });
      // player foot (drag to kick)
      const fx = S.fbFoot ? S.fbFoot[0] : bx - 60, fy = S.fbFoot ? S.fbFoot[1] : by + 6;
      K.raw(ctx, () => { ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(fx - 30, fy - 60); ctx.lineTo(fx, fy); ctx.stroke(); ctx.fillStyle = '#111827'; rr(ctx, fx - 6, fy - 8, 28, 14, 6); ctx.fill(); ctx.lineCap = 'butt'; });
      // goalkeeper & header player
      K.raw(ctx, () => { const gx = X(.86), gy = Y(S.gkY ?? .55); ctx.fillStyle = '#facc15'; rr(ctx, gx - 14, gy - 30, 28, 44, 8); ctx.fill(); ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(gx, gy - 40, 11, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fcd9b6'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(gx - 12, gy - 22); ctx.lineTo(gx - 30, gy - 36); ctx.moveTo(gx + 12, gy - 22); ctx.lineTo(gx + 26, gy - 40); ctx.stroke(); });
      G.text(ctx, 'حارس المرمى', X(.86), Y(S.gkY ?? .55) + 30, { s: 11, c: '#fff', bg: '#a16207', raw: 1 });
      // velocity arrow (green), force flash (red)
      if (p.arrows !== false) { const sp = Math.hypot(b.vx, b.vy); if (sp > .01) C2X.arrow(ctx, bx, by - 26, b.vx / sp * clamp(sp * 220, 20, 120), b.vy / sp * clamp(sp * 220, 20, 120) * .4, '#16a34a', 4, 'السرعة'); }
      if (b.ev && b.ev.t > 0 && b.ev.F) C2X.arrow(ctx, bx - b.ev.F[0] * 70, by - b.ev.F[1] * 70, b.ev.F[0] * 60, b.ev.F[1] * 60, '#dc2626', 6, 'القوة');
      if (b.ev && b.ev.t > 0) K.bubble(ctx, b.ev.msg, bx, by - 50, { s: 15 });
      // three buttons = the three effects of force
      const yb = h * .1; [['kick', '1) اركل الكرة: القوة تنشئ الحركة', '#16a34a'], ['stop', '2) الحارس يمسكها: القوة توقف الحركة', '#dc2626'], ['dir', '3) ضربة رأس: القوة تغيّر الاتجاه', '#7c3aed']].forEach(([k, t, c], i) => C2X.btn(ctx, 64 + (w - 64) * (i + .5) / 3, yb, (w - 64) / 3 - 14, 40, t, c, S.fbLast === k));
      G.text(ctx, 'أو اسحب القدم نحو الكرة واتركها لتركلها بنفسك', w / 2, h * .96, { s: 12, c: '#fff', bg: 'rgba(20,83,45,.85)', raw: 1 });
      K.party(ctx, S);
    },
    drags(S) {
      const w = S.W, h = S.H, b = S.fb || (S.fb = { x: .12, y: .7, vx: 0, vy: 0 }); const X = x => 70 + x * (w - 110), Y = y => y * h; const bx = X(b.x), by = Y(b.y);
      const kick = (S, F) => { b.vx = F[0] * .55; b.vy = F[1] * .55; b.goal = 0; S.fbLast = 'kick'; b.ev = { t: 1.6, F: [F[0] / Math.hypot(...F), F[1] / Math.hypot(...F)], msg: 'القوة أنشأت الحركة: الكرة الساكنة تحرّكت' }; if (window.Sound) Sound.click(); };
      const L = [];
      const yb = h * .1; ['kick', 'stop', 'dir'].forEach((k, i) => L.push({ id: 'fb_' + k, x: 64 + (w - 64) * (i + .5) / 3, y: yb, w: (w - 64) / 3 - 14, h: 40, hint: i === 0, tip: 'اضغط', click: S => {
        S.fbLast = k;
        if (k === 'kick') { b.x = .12; b.y = .7; b.vx = 0; b.vy = 0; kick(S, [1, -.25]); }
        if (k === 'stop') { if (Math.hypot(b.vx, b.vy) < .02) { b.x = .5; b.y = .55; b.vx = .5; b.vy = 0; } S.gkY = b.y; b.ev = { t: 1.8, F: [-1, 0], msg: 'القوة أوقفت الحركة: الحارس أوقف الكرة' }; setTimeout(() => { b.vx = 0; b.vy = 0; b.x = Math.min(b.x, .8); }, 250); }
        if (k === 'dir') { if (Math.hypot(b.vx, b.vy) < .02) { b.x = .3; b.y = .8; b.vx = .45; b.vy = 0; } const sp = Math.hypot(b.vx, b.vy); b.vx = sp * .5; b.vy = -sp * .85; b.ev = { t: 1.8, F: [0, -1], msg: 'القوة غيّرت اتجاه الحركة' }; }
      } }));
      L.push({ id: 'foot', x: S.fbFoot ? S.fbFoot[0] : bx - 60, y: S.fbFoot ? S.fbFoot[1] : by + 6, r: 26, axis: 'xy', keep: true, tip: 'اسحب القدم نحو الكرة ثم اتركها', idle: 'اسحب القدم ✋',
        down: S => { S.fbFoot = [bx - 60, by + 6]; }, drag: (S, d) => { S.fbFoot = [bx - 60 + (d.x - d.sx), by + 6 + (d.y - d.sy)]; },
        up: S => { const dx = bx - S.fbFoot[0], dy = by - S.fbFoot[1], dist = Math.hypot(dx, dy); if (dist < 40) kick(S, [clamp(dx / 30, .3, 2), clamp(dy / 60, -1, 1)]); S.fbFoot = null; } });
      return L;
    },
    readings(S) { const b = S.fb || {}; const sp = Math.hypot(b.vx || 0, b.vy || 0) * 30; return [rd('سرعة الكرة', fmt(sp, 2) + ' m/s'), rd('آخر تأثير للقوة', { kick: 'أنشأت الحركة', stop: 'أوقفت الحركة', dir: 'غيّرت الاتجاه' }[S.fbLast] || '—', 1)]; },
    explain(S) { return 'القوة تُحدث ثلاثة تأثيرات في حركة الجسم: <b>تنشئ الحركة</b> (ركل الكرة الساكنة)، و<b>توقف الحركة</b> (الحارس يمسك الكرة)، و<b>تغيّر اتجاه الحركة</b> (ضربة الرأس). السهم الأحمر = القوة، والأخضر = السرعة.'; }
  });
  E.steps = E.steps.concat(['في مشهد «كرة القدم» اضغط الأزرار الثلاثة بالترتيب: القوة تنشئ الحركة، ثم توقفها، ثم تغيّر اتجاهها.']);
})();

/* ---------- g7_contact_field: animated gallery of contact / field forces ---------- */
(() => {
  const E = EXPS.find(e => e.id === 'g7_contact_field'); if (!E) return;
  C2X.addScene(E, 'gal', '🖼️ أمثلة متحركة');
  const EX = [
    ['يد تدفع عربة', 1], ['تفاحة تسقط من الشجرة', 0], ['مغناطيس يجذب مسماراً', 0], ['حصان يسحب عربة', 1],
    ['الأرض تجذب القمر', 0], ['قدم تركل كرة', 1], ['مشط مشحون يجذب قصاصات ورق', 0], ['يد تشد نابضاً', 1]
  ];
  const draw1 = (ctx, k, x, y, cw, ch, t, on) => K.raw(ctx, () => {
    const cx = x + cw / 2, cy = y + ch * .55, a = (t % 2.4) / 2.4;
    ctx.lineCap = 'round';
    if (k === 0) { const dx = a * 40; ctx.fillStyle = '#64748b'; rr(ctx, cx - 20 + dx, cy - 18, 60, 30, 5); ctx.fill(); ctx.fillStyle = '#111'; [cx - 8 + dx, cx + 30 + dx].forEach(wx => { ctx.beginPath(); ctx.arc(wx, cy + 14, 7, 0, TAU); ctx.fill(); }); ctx.strokeStyle = '#fcd9b6'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(cx - 70 + dx, cy - 6); ctx.lineTo(cx - 24 + dx, cy - 6); ctx.stroke(); }
    if (k === 1) { ctx.fillStyle = '#15803d'; ctx.beginPath(); ctx.arc(cx - 30, y + 30, 26, 0, TAU); ctx.fill(); ctx.fillStyle = '#92400e'; ctx.fillRect(cx - 34, y + 50, 8, ch - 60); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(cx + 10, y + 40 + a * (ch - 70), 8, 0, TAU); ctx.fill(); }
    if (k === 2) { const nx = cx + 40 - a * 30; ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(cx - 40, cy, 18, -Math.PI / 2, Math.PI / 2, true); ctx.stroke(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(nx, cy - 12); ctx.lineTo(nx + 30, cy - 12); ctx.stroke(); }
    if (k === 3) { const dx = a * 30; ctx.fillStyle = '#92400e'; rr(ctx, cx - 10 + dx, cy - 26, 40, 30, 8); ctx.fill(); ctx.fillRect(cx + 22 + dx, cy - 40, 10, 22); ctx.fillStyle = '#a16207'; rr(ctx, cx - 70 + dx, cy - 14, 40, 22, 4); ctx.fill(); ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx - 30 + dx, cy - 6); ctx.lineTo(cx - 10 + dx, cy - 14); ctx.stroke(); }
    if (k === 4) { ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.arc(cx - 20, cy, 22, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(100,116,139,.6)'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.arc(cx - 20, cy, 50, 0, TAU); ctx.stroke(); ctx.setLineDash([]); const an = a * TAU; ctx.fillStyle = '#d1d5db'; ctx.beginPath(); ctx.arc(cx - 20 + Math.cos(an) * 50, cy + Math.sin(an) * 50 * .5, 8, 0, TAU); ctx.fill(); }
    if (k === 5) { const kx = a < .3 ? a / .3 : 1; ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(cx - 60, cy - 40); ctx.lineTo(cx - 40 + kx * 14, cy + 6); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#111'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx - 14 + (a > .3 ? (a - .3) * 120 : 0), cy + 6, 11, 0, TAU); ctx.fill(); ctx.stroke(); }
    if (k === 6) { ctx.fillStyle = '#0f172a'; rr(ctx, cx - 50, cy - 40, 70, 10, 3); ctx.fill(); for (let q = 0; q < 6; q++) { const yy = cy + 30 - Math.min(1, a * 1.6) * (q % 2 ? 50 : 30); ctx.fillStyle = ['#fca5a5', '#fde68a', '#93c5fd'][q % 3]; ctx.fillRect(cx - 44 + q * 10, yy, 7, 5); } }
    if (k === 7) { const L = 50 + a * 30; ctx.fillStyle = '#475569'; ctx.fillRect(cx - 70, cy - 30, 8, 60); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.beginPath(); for (let q = 0; q <= 14; q++) ctx.lineTo(cx - 62 + L * q / 14, cy + (q % 2 ? 8 : -8)); ctx.stroke(); ctx.strokeStyle = '#fcd9b6'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(cx - 62 + L, cy); ctx.lineTo(cx - 20 + L, cy); ctx.stroke(); }
    ctx.lineCap = 'butt';
  });
  C2X.wrap(E, ['gal'], {
    update(S, dt) { S.galT = (S.galT || 0) + dt; },
    draw(ctx, w, h, S) {
      K.bg(ctx, w, h, { bench: false }); const cols = w > 900 ? 4 : 2, rows = Math.ceil(EX.length / cols), x0 = 72, cw = (w - x0 - 16) / cols - 10, ch = (h - 120) / rows - 12; S.galG = { x0, cw, ch, cols };
      G.text(ctx, 'انقر على كل مثال لتعرف: هل القوة قوة تماس أم قوة مجال (عن بُعد)؟', (x0 + w) / 2, 26, { s: 15, w: 900, c: '#fff', bg: '#0f766e', raw: 1 });
      const rev = S.galRev || (S.galRev = {});
      EX.forEach(([n, contact], i) => { const x = x0 + (i % cols) * (cw + 10), y = 56 + Math.floor(i / cols) * (ch + 12); const on = rev[i];
        K.raw(ctx, () => { ctx.fillStyle = on ? (contact ? '#fff7ed' : '#eef2ff') : '#ffffff'; ctx.strokeStyle = on ? (contact ? '#ea580c' : '#4f46e5') : '#cbd5e1'; ctx.lineWidth = on ? 3 : 1.5; rr(ctx, x, y, cw, ch, 14); ctx.fill(); ctx.stroke(); });
        draw1(ctx, i, x, y, cw, ch, (S.galT || 0) + i * .3, on);
        G.text(ctx, n, x + cw / 2, y + ch - 14, { s: 12.5, w: 800, c: '#1e293b', raw: 1 });
        if (on) G.text(ctx, contact ? '✋ قوة تماس (تلامس مباشر)' : '🧲 قوة مجال (تأثير عن بُعد)', x + cw / 2, y + 16, { s: 12, w: 900, c: '#fff', bg: contact ? '#ea580c' : '#4f46e5', raw: 1 }); });
      const n = Object.keys(S.galRev).length; if (n === EX.length && !S.galDone) { S.galDone = 1; K.cheer(S, w / 2, h / 2); } K.party(ctx, S);
    },
    drags(S) { const g = S.galG; if (!g) return []; return EX.map((e, i) => ({ id: 'ex' + i, x: g.x0 + (i % g.cols) * (g.cw + 10) + g.cw / 2, y: 56 + Math.floor(i / g.cols) * (g.ch + 12) + g.ch / 2, w: g.cw, h: g.ch, hint: i === 0, tip: 'انقر لمعرفة نوع القوة', click: S => { S.galRev[i] = !S.galRev[i]; if (!S.galRev[i]) delete S.galRev[i]; } })); },
    readings(S) { const r = S.galRev || {}; const k = Object.keys(r).map(Number); return [rd('أمثلة كشفتها', k.length + ' / ' + EX.length), rd('قوى تماس', k.filter(i => EX[i][1]).length + ''), rd('قوى مجال', k.filter(i => !EX[i][1]).length + '')]; },
    explain() { return '<b>قوى التماس</b>: تحتاج تلامساً مباشراً بين الجسمين (دفع، سحب، ركل، شد نابض). <b>قوى المجال</b>: تؤثر عن بُعد دون تلامس (الجاذبية، القوة المغناطيسية، القوة الكهربائية).'; }
  });
})();

/* ---------- g7_seatbelt: bus passengers (inertia when starting / braking) ---------- */
(() => {
  const E = EXPS.find(e => e.id === 'g7_seatbelt'); if (!E) return;
  C2X.addScene(E, 'bus', '🚌 الحافلة والركاب');
  C2X.wrap(E, ['bus'], {
    update(S, dt) {
      const B = S.bus || (S.bus = { v: 0, a: 0, lean: 0, x: 0, mode: 'stop' });
      const target = B.mode === 'go' ? 1 : 0; const prev = B.v; B.v += (target - B.v) * (B.mode === 'brake' ? 4 : 1.4) * dt; if (B.mode === 'brake' && B.v < .01) { B.v = 0; B.mode = 'stop'; }
      B.a = (B.v - prev) / Math.max(dt, 1e-3); B.x += B.v * dt * 160; const want = clamp(-B.a * .25, -.5, .5) * (S.p.hold ? .25 : 1); B.lean += (want - B.lean) * dt * 6;
    },
    draw(ctx, w, h, S) {
      const B = S.bus || (S.bus = { v: 0, a: 0, lean: 0, x: 0, mode: 'stop' }); const by = h * .78; K.bg(ctx, w, h, { benchY: by, bench: false });
      K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(0, by, w, h - by); ctx.fillStyle = '#facc15'; for (let x = -((B.x) % 80); x < w; x += 80) ctx.fillRect(x, by + 30, 40, 6);
        const x0 = 64 + 40, bw = w - x0 - 40, top = by - 230; ctx.fillStyle = '#f59e0b'; rr(ctx, x0, top, bw, 210, 22); ctx.fill(); ctx.fillStyle = 'rgba(224,242,254,.95)'; rr(ctx, x0 + 14, top + 18, bw - 28, 120, 10); ctx.fill(); ctx.fillStyle = '#111'; [x0 + 90, x0 + bw - 90].forEach(wx => { ctx.beginPath(); ctx.arc(wx, by - 6, 26, 0, TAU); ctx.fill(); });
        ctx.strokeStyle = '#334155'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0 + 20, top + 30); ctx.lineTo(x0 + bw - 20, top + 30); ctx.stroke(); });
      const x0 = 64 + 40, bw = w - x0 - 40, top = by - 230, fl = top + 138;
      for (let k = 0; k < 4; k++) { const px = x0 + 90 + k * (bw - 180) / 3, L = clamp(B.lean, -.5, .5); K.raw(ctx, () => { ctx.save(); ctx.translate(px, fl); ctx.rotate(L); ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(-6, -40); ctx.moveTo(6, 0); ctx.lineTo(6, -40); ctx.stroke(); ctx.strokeStyle = ['#dc2626', '#16a34a', '#7c3aed', '#0ea5e9'][k]; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(0, -42); ctx.lineTo(0, -80); ctx.stroke(); ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(0, -94, 11, 0, TAU); ctx.fill(); if (S.p.hold) { ctx.strokeStyle = '#fcd9b6'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(4, -76); ctx.lineTo(0, -108); ctx.stroke(); } ctx.restore(); ctx.lineCap = 'butt'; }); }
      if (Math.abs(B.lean) > .08) C2X.arrow(ctx, w / 2, top - 30, B.lean > 0 ? 90 : -90, 0, '#2563eb', 5, B.lean > 0 ? 'أجسام الركاب تميل للأمام (تستمر بحركتها)' : 'أجسام الركاب تميل للخلف (تبقى ساكنة)');
      C2X.arrow(ctx, w - 160, by + 60, 0, 0, '#16a34a', 4);
      G.text(ctx, '← اتجاه سير الحافلة', w - 120, by + 70, { s: 12, c: '#fff', bg: '#16a34a', raw: 1 });
      [['go', 'انطلاق ▶', '#16a34a'], ['brake', 'توقف مفاجئ ■', '#dc2626']].forEach(([k, t, c], i) => C2X.btn(ctx, 64 + (w - 64) * (.3 + i * .4), h * .1, 200, 40, t, c, B.mode === k));
      G.text(ctx, S.p.hold ? 'الركاب يمسكون المقابض ✓ ميلانهم قليل' : 'فعّل «الإمساك بالمقبض» من الترتيبات', w / 2, h * .2, { s: 12.5, c: '#fff', bg: '#334155', raw: 1 });
    },
    drags(S) { const w = S.W, h = S.H, B = S.bus || (S.bus = { v: 0, a: 0, lean: 0, x: 0, mode: 'stop' }); return [['go', 0], ['brake', 1]].map(([k, i]) => ({ id: 'bus_' + k, x: 64 + (w - 64) * (.3 + i * .4), y: h * .1, w: 200, h: 40, hint: i === 0, tip: 'اضغط', click: S => { B.mode = k; } })); },
    readings(S) { const B = S.bus || {}; return [rd('سرعة الحافلة', fmt((B.v || 0) * 40, 2) + ' km/h'), rd('ميل الركاب', Math.abs(B.lean || 0) < .08 ? 'مستقيمون' : (B.lean > 0 ? 'إلى الأمام' : 'إلى الخلف'), 1)]; },
    explain(S) { return 'عند <b>التوقف المفاجئ</b> تتوقف الحافلة لكن أجسام الركاب تستمر بحركتها فتميل <b>للأمام</b>، وعند <b>الانطلاق</b> تبقى أجسامهم ساكنة فتميل <b>للخلف</b>. لذلك نمسك المقابض ونرتدي حزام الأمان.'; }
  });
  E.controls.push(TG('hold', 'الركاب يمسكون المقابض (الحافلة)', false, null, 'eye'));
})();
