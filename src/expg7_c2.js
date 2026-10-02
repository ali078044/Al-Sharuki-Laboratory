'use strict';
/* ====================== الأول المتوسط — الفصل الثاني: القوة (ch 12, ص 27–41) ======================
   g7_boat · g7_weight · g7_force_draw · g7_move · g7_contact_field · g7_net_force · g7_seatbelt
   Local drawing helpers live in C2 (prefix to avoid clashes). */
const C2 = {
  /* bidi-safe text: isolate Latin/number runs inside Arabic strings and force RTL paragraphs */
  iso(s) { s = String(s); if (!/[\u0600-\u06FF]/.test(s)) return s; return '\u061C' + s.replace(/[(A-Za-z0-9][A-Za-z0-9 .=×÷+\-−\/²³√()·,:≈%]*[A-Za-z0-9)²³%]|[0-9]/g, m => '\u2066' + m + '\u2069'); },
  T(ctx, s, x, y, o = {}) { G.text(ctx, C2.iso(s), x, y, Object.assign({ c: '#1e293b', raw: 1 }, o)); },
  force(ctx, x, y, dx, dy, label, col, w) { K.force(ctx, x, y, dx, dy, label ? C2.iso(label) : label, col, w); },
  card(ctx, x, y, w, h, o = {}) {
    K.raw(ctx, () => {
      ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.14)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 2;
      ctx.fillStyle = o.bg || 'rgba(255,255,255,.95)'; rr(ctx, x, y, w, h, o.r || 12); ctx.fill(); ctx.restore();
      if (o.bd !== false) { ctx.strokeStyle = o.bd || '#7c3aed'; ctx.lineWidth = o.lw || 2; rr(ctx, x, y, w, h, o.r || 12); ctx.stroke(); }
    });
  },
  /* multi-line info card; lines = [text | {t,c,w,s,mono}] ; x = right edge (RTL) */
  lines(ctx, L, x, y, wd, o = {}) {
    const lh = o.lh || 21, hh = (o.title ? 26 : 8) + L.length * lh + 6;
    C2.card(ctx, x - wd, y, wd, hh, { bd: o.bd || '#7c3aed' });
    if (o.title) C2.T(ctx, o.title, x - wd / 2, y + 15, { s: 13, w: 900, c: o.bd || '#6d28d9' });
    L.forEach((q, i) => { const it = typeof q === 'string' ? { t: q } : q; const yy = y + (o.title ? 26 : 8) + lh * (i + .5);
      C2.T(ctx, it.t, it.a === 'c' ? x - wd / 2 : x - 10, yy, { s: it.s || 12.5, w: it.w || 700, c: it.c || '#1e293b', a: it.a === 'c' ? 'center' : 'right', mono: it.mono }); });
    return hh;
  },
  btn(ctx, x, y, w, h, label, o = {}) {
    const on = !!o.on;
    K.raw(ctx, () => {
      const c = o.col || '#2563eb'; ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.28)'; ctx.shadowBlur = on ? 2 : 8; ctx.shadowOffsetY = on ? 1 : 3;
      const g = ctx.createLinearGradient(0, y - h / 2, 0, y + h / 2); g.addColorStop(0, shade(c, on ? -15 : 35)); g.addColorStop(1, shade(c, on ? -45 : -12));
      ctx.fillStyle = g; rr(ctx, x - w / 2, y - h / 2 + (on ? 2 : 0), w, h, Math.min(h / 2, 14)); ctx.fill(); ctx.restore();
    });
    C2.T(ctx, label, x, y + (on ? 2 : 0), { s: o.s || 13.5, w: 900, c: '#fff' });
  },
  inRect(cx, cy, w, h) { return (x, y) => Math.abs(x - cx) <= w / 2 && Math.abs(y - cy) <= h / 2; },
  /* cartoon hand; fingertips (contact point) at (x,y), fingers pointing +x when dir = 1 */
  hand(ctx, x, y, dir = 1, s = 1, o = {}) {
    K.raw(ctx, () => {
      ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(dir * s, s);
      ctx.fillStyle = o.sleeve || '#3b82f6'; rr(ctx, -62, -12, 28, 24, 6); ctx.fill();
      ctx.fillStyle = '#fcd9b6'; ctx.strokeStyle = '#c2410c'; ctx.lineWidth = 1.3 / s;
      ctx.beginPath(); ctx.ellipse(-24, 0, 14, 13, 0, 0, TAU); ctx.fill(); ctx.stroke();
      for (let k = 0; k < 4; k++) { rr(ctx, -14, -11 + k * 5.6, 14, 5.3, 2.6); ctx.fill(); ctx.stroke(); }
      ctx.beginPath(); ctx.ellipse(-20, -13, 8, 4, -.5, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.restore();
    });
  },
  /* horseshoe magnet, poles pointing along angle ang; returns the two pole tips */
  horseshoe(ctx, x, y, s, ang) {
    const R = 17 * s, th = 12 * s, L = 24 * s, c = Math.cos(ang), sn = Math.sin(ang);
    K.raw(ctx, () => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
      ctx.lineCap = 'butt'; ctx.strokeStyle = '#dc2626'; ctx.lineWidth = th;
      ctx.beginPath(); ctx.moveTo(L - 9 * s, -R); ctx.lineTo(0, -R); ctx.arc(0, 0, R, -Math.PI / 2, Math.PI / 2, true); ctx.lineTo(L - 9 * s, R); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = th * .22; ctx.beginPath(); ctx.moveTo(L - 10 * s, -R - th * .25); ctx.lineTo(0, -R - th * .25); ctx.arc(0, 0, R + th * .25, -Math.PI / 2, -Math.PI * .95, true); ctx.stroke();
      ctx.fillStyle = '#cbd5e1'; ctx.fillRect(L - 9 * s, -R - th / 2, 11 * s, th); ctx.fillRect(L - 9 * s, R - th / 2, 11 * s, th);
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.strokeRect(L - 9 * s, -R - th / 2, 11 * s, th); ctx.strokeRect(L - 9 * s, R - th / 2, 11 * s, th);
      ctx.restore();
    });
    const tip = (py) => [x + (L + 2 * s) * c - py * sn, y + (L + 2 * s) * sn + py * c];
    return [tip(-R), tip(R)];
  },
  /* bar magnet centred at x,y; N on the right unless flip */
  bar(ctx, x, y, L, H, flip) {
    K.raw(ctx, () => {
      const cols = flip ? ['#dc2626', '#2563eb'] : ['#2563eb', '#dc2626'], lab = flip ? ['N', 'S'] : ['S', 'N'];
      [0, 1].forEach(i => { const g = ctx.createLinearGradient(0, y - H / 2, 0, y + H / 2); g.addColorStop(0, shade(cols[i], 40)); g.addColorStop(1, shade(cols[i], -20)); ctx.fillStyle = g; ctx.fillRect(x - L / 2 + i * L / 2, y - H / 2, L / 2, H); });
      ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1.5; ctx.strokeRect(x - L / 2, y - H / 2, L, H);
      ctx.fillStyle = '#fff'; ctx.font = `900 ${Math.round(H * .55)}px ui-monospace,monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr';
      ctx.fillText(lab[0], x - L / 4, y + 1); ctx.fillText(lab[1], x + L / 4, y + 1); ctx.textBaseline = 'alphabetic';
    });
  },
  /* cartoon kid: feet at (x,y), hands at (hx,hy), dir = facing (+1 right), lean (rad, + = leaning back) */
  kid(ctx, x, y, s, col, dir, hx, hy, lean = 0, o = {}) {
    K.raw(ctx, () => {
      const H = 76 * s; const hip = [x - dir * Math.sin(lean) * H * .42, y - Math.cos(lean) * H * .42];
      const sh = [hip[0] - dir * Math.sin(lean) * H * .32, hip[1] - Math.cos(lean) * H * .32];
      const hd = [sh[0] - dir * Math.sin(lean) * H * .16, sh[1] - Math.cos(lean) * H * .16];
      ctx.lineCap = 'round'; ctx.strokeStyle = o.pants || '#1e3a8a'; ctx.lineWidth = 7 * s;
      ctx.beginPath(); ctx.moveTo(hip[0], hip[1]); ctx.lineTo(x + dir * 9 * s, y); ctx.moveTo(hip[0], hip[1]); ctx.lineTo(x - dir * 7 * s, y); ctx.stroke();
      ctx.fillStyle = '#1f2937'; [x + dir * 9 * s, x - dir * 7 * s].forEach(fx => { ctx.beginPath(); ctx.ellipse(fx + dir * 3 * s, y, 6 * s, 3 * s, 0, 0, TAU); ctx.fill(); });
      ctx.strokeStyle = col; ctx.lineWidth = 13 * s; ctx.beginPath(); ctx.moveTo(hip[0], hip[1]); ctx.lineTo(sh[0], sh[1]); ctx.stroke();
      ctx.strokeStyle = '#f2c29b'; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.moveTo(sh[0], sh[1] + 3 * s); ctx.lineTo(hx, hy); ctx.stroke();
      ctx.fillStyle = '#f2c29b'; ctx.beginPath(); ctx.arc(hx, hy, 4 * s, 0, TAU); ctx.fill();
      ctx.fillStyle = '#fcd9b6'; ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(hd[0], hd[1], 10.5 * s, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.fillStyle = o.hair || '#3f2a1d'; ctx.beginPath(); ctx.arc(hd[0], hd[1] - 2 * s, 10.5 * s, Math.PI * 1.02, Math.PI * 1.98); ctx.fill();
      ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(hd[0] + dir * 4 * s, hd[1], 1.5 * s, 0, TAU); ctx.fill();
      ctx.lineCap = 'butt';
    });
  },
  /* side-view car; x,y = bottom centre (road); s = scale; faces right */
  car(ctx, x, y, s, col, o = {}) {
    K.raw(ctx, () => {
      ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
      const g = ctx.createLinearGradient(0, -70, 0, -14); g.addColorStop(0, shade(col, 40)); g.addColorStop(1, shade(col, -25));
      ctx.fillStyle = g; ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2 / s;
      ctx.beginPath(); ctx.moveTo(-95, -18); ctx.lineTo(-95, -44); ctx.quadraticCurveTo(-92, -50, -80, -52); ctx.lineTo(-52, -54); ctx.lineTo(-30, -82); ctx.lineTo(30, -82); ctx.lineTo(55, -54); ctx.lineTo(88, -48); ctx.quadraticCurveTo(98, -44, 98, -32); ctx.lineTo(98, -18); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = 'rgba(186,230,253,.55)'; ctx.beginPath(); ctx.moveTo(-44, -56); ctx.lineTo(-27, -77); ctx.lineTo(-2, -77); ctx.lineTo(-2, -56); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(4, -56); ctx.lineTo(4, -77); ctx.lineTo(27, -77); ctx.lineTo(46, -56); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = o.brake ? '#ef4444' : '#7f1d1d'; ctx.fillRect(-97, -44, 6, 10); if (o.brake) { ctx.fillStyle = 'rgba(239,68,68,.35)'; ctx.beginPath(); ctx.arc(-98, -39, 14, 0, TAU); ctx.fill(); }
      ctx.fillStyle = '#fde047'; ctx.fillRect(92, -42, 6, 8);
      const ang = o.rot || 0; [-58, 62].forEach(wx => { ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(wx, -18, 18, 0, TAU); ctx.fill(); ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.arc(wx, -18, 9, 0, TAU); ctx.fill(); ctx.strokeStyle = '#374151'; ctx.lineWidth = 2.2 / s; for (let k = 0; k < 4; k++) { const a = ang + k * Math.PI / 2; ctx.beginPath(); ctx.moveTo(wx, -18); ctx.lineTo(wx + Math.cos(a) * 9, -18 + Math.sin(a) * 9); ctx.stroke(); } });
      ctx.restore();
    });
  },
  /* wheel with spokes */
  wheel(ctx, x, y, r, ang) { K.raw(ctx, () => { ctx.strokeStyle = '#111827'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; for (let k = 0; k < 8; k++) { const a = ang + k * Math.PI / 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); ctx.stroke(); } ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.arc(x, y, 3.5, 0, TAU); ctx.fill(); }); },
  /* speed dial */
  dial(ctx, x, y, r, v, vmax, label, unit) {
    K.raw(ctx, () => {
      ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3; ctx.stroke();
      const a0 = Math.PI * .75, a1 = Math.PI * 2.25; ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
      for (let k = 0; k <= 8; k++) { const a = a0 + (a1 - a0) * k / 8; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * .78, y + Math.sin(a) * r * .78); ctx.lineTo(x + Math.cos(a) * r * .92, y + Math.sin(a) * r * .92); ctx.stroke(); }
      const a = a0 + (a1 - a0) * clamp(v / vmax, 0, 1); ctx.strokeStyle = '#f97316'; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * r * .8, y + Math.sin(a) * r * .8); ctx.stroke(); ctx.lineCap = 'butt';
      ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.arc(x, y, 4, 0, TAU); ctx.fill();
    });
    C2.T(ctx, fmt(v, 3) + ' ' + unit, x, y + r * .5, { s: 12, w: 900, c: '#a3e635', mono: 1 });
    C2.T(ctx, label, x, y + r + 12, { s: 11.5, w: 800, c: '#334155' });
  },
  msg(S, t, dur = 2.6) { S._msg = t; S._msgT = dur; },
  drawMsg(ctx, S, x, y, o) { if (S._msg && S._msgT > 0) { K.bubble(ctx, S._msg.split('\n').map(C2.iso).join('\n'), x, y, Object.assign({ s: 13 }, o || {})); S._msgT -= 1 / 60; } },
  now() { return performance.now() / 1000; }
};

/* =========================================================================================
   1) نشاط استهلالي (ص 28): القوة تؤثر في حركة الأجسام — القارب الورقي
   ========================================================================================= */
(() => {
  const D = { id: 'g7_boat', ch: 12, sec: 'نشاط استهلالي', page: 28, kind: 'نشاط', title: 'نشاط استهلالي: القوة تؤثر في حركة الأجسام (القارب الورقي)',
    desc: 'قارب ورقي يطفو على الماء: ندفعه بأيدينا، وننفخ عليه، ثم نضع عليه مشابك حديدية ونحركه بالمغناطيس دون أن نلمسه. ما الذي يبقيه طافياً؟',
    tags: 'قوة قارب ورق مغناطيس نفخ طفو مشابك',
    tools: ['قارب صغير من الورق', 'حوض مملوء بالماء', 'مشابك ورق من الحديد', 'مغناطيس'],
    steps: ['اسحب القارب الطافي بيدك برفق (ادفعه) ثم اتركه — لاحظ كيف يتحرك ثم يتباطأ.', 'في أثناء حركته اضغط مطولاً على زر «انفخ 💨» لتنفخ عليه باتجاه حركته. ماذا يحدث لسرعته؟ (يمكنك سحب الماصة إلى أي مكان)', 'هل تستطيع تحريك القارب بعيداً عنك دون دفعه أو النفخ عليه؟ قرّب المغناطيس من القارب وهو بلا مشابك.', 'انقر صحن المشابك لتضع مشابك حديدية على طرف القارب.', 'اسحب المغناطيس وقرّبه من القارب، ثم حرّكه باتجاهات مختلفة ولاحظ حركة القارب.', 'فعّل «الوزن وقوة الطفو» لترى لماذا يبقى القارب طافياً ولا يغطس.', 'فكّر: إلى ماذا نحتاج لتحريك جسم ساكن أو لإيقاف جسم متحرك؟'],
    concl: ['القوة تحرّك الجسم الساكن، وتزيد سرعته إذا أثّرت باتجاه حركته.', 'دفع اليد والنفخ قوى تماس، أما جذب المغناطيس للمشابك الحديدية فقوة تؤثر عن بُعد (قوة مجال).', 'يبقى القارب طافياً لأن وزنه (إلى الأسفل) يتعادل مع دفع الماء له (إلى الأعلى): القوتان متزنتان.', 'نحتاج إلى قوة لتحريك جسم ساكن، وإلى قوة لإيقاف جسم متحرك.'],
    laws: [],
    fact: ['المغناطيس لا يجذب الورق، لكنه يجذب المشابك الحديدية — لذلك تحرّك القارب عندما وضعنا المشابك عليه!', 'السفن الضخمة المصنوعة من الحديد تطفو لأن الماء يدفعها إلى الأعلى بقوة تساوي وزنها.', 'الماء يؤثر في القارب المتحرك بقوة تعاكس حركته، لذلك يتباطأ القارب ثم يقف إذا لم ندفعه.'],
    controls: [R('clips', 'عدد المشابك الحديدية على القارب', 0, 5, 0, 1, ''),
      BT('', [{ t: '💨 نفخة', on: S => { S.puffT = .6; S.puffs++; } }, { t: 'إعادة القارب', on: S => { S.bu = .3; S.bvp = 0; } }]),
      TG('arrows', 'أسهم القوى الأفقية', true, null, 'force'), TG('vert', 'الوزن وقوة الطفو (متزنتان)', true, null, 'vector'),
      TG('air', 'تيار الهواء', true, null, 'wave'), TG('field', 'خطوط المجال المغناطيسي', false, null, 'bfield'), TG('vel', 'سهم السرعة', true, null, 'velocity')],
    setup(S) { S.bu = .3; S.bvp = 0; S.su = .06; S.mx = .83; S.my = .27; S.blow = 0; S.puffT = 0; S.puffs = 0; S.fAir = 0; S.fMag = 0; S.fHand = 0; S.dragB = false; S.air = []; S.nDrag = 0; },
    geo(S) { const w = S.W, h = S.H, by = h * .86, x0 = Math.max(78, w * .09), x1 = w - 22, wy = h * .56, top = wy - 22, bot = by - 6, bw = clamp(w * .15, 80, 128);
      const bx = x0 + bw * .7 + (x1 - x0 - bw * 1.4) * S.bu; return { w, h, by, x0, x1, top, bot, wy, bw, bx, TW: x1 - x0 - bw * 1.4 }; },
    draft(S, g) { return g.bw * (.1 + .016 * S.p.clips); },
    straw(S, g) { const x = g.x0 + 20 + (g.x1 - g.x0 - 40) * S.su, y = g.wy - g.bw * .42; const dir = g.bx >= x ? 1 : -1; return { x, y, dir }; },
    clipPt(S, g) { return [g.bx + g.bw * .38, g.wy - D.draft(S, g) - g.bw * .08]; },
    update(S, dt) {
      dt = Math.min(dt, .05); const g = D.geo(S), p = S.p; if (S.puffT > 0) S.puffT -= dt;
      const st = D.straw(S, g); const blowing = S.blow || S.puffT > 0; const dist = Math.max(0, Math.abs(g.bx - st.x) - g.bw * .5 - 40);
      S.fAir = blowing ? 190 * clamp(1 - dist / (g.w * .5), 0, 1) * st.dir : 0;
      const cp = D.clipPt(S, g), mx = S.mx * g.w, my = S.my * g.h, dx = mx - cp[0], dy = my - cp[1], d = Math.max(20, Math.hypot(dx, dy));
      S.fMag = p.clips ? 120 * p.clips / (1 + (d / 115) ** 2) * dx / d : 0;
      if (!S.dragB) {
        const a = S.fAir + S.fMag - 1.5 * S.bvp; S.bvp += a * dt; S.bu += S.bvp * dt / g.TW;
        if (S.bu < 0) { S.bu = 0; S.bvp = Math.abs(S.bvp) * .3; } if (S.bu > 1) { S.bu = 1; S.bvp = -Math.abs(S.bvp) * .3; }
        if (Math.abs(S.bvp) < .5 && !S.fAir && Math.abs(S.fMag) < 1) S.bvp = 0;
      }
      if (blowing && S.air.length < 70 && Math.random() < .9) for (let k = 0; k < 2; k++) S.air.push({ x: st.x + st.dir * 40, y: st.y + (Math.random() - .5) * 6, vx: st.dir * (260 + Math.random() * 80), vy: (Math.random() - .5) * 40, life: 0 });
      S.air.forEach(q => { q.x += q.vx * dt; q.y += q.vy * dt; q.life += dt; if (Math.abs(q.x - g.bx) < g.bw * .45 && q.y > g.wy - g.bw * .7) { q.vx *= .3; q.vy -= 60 * dt * 10; } });
      S.air = S.air.filter(q => q.life < 1.1 && q.x > 0 && q.x < g.w);
    },
    draw(ctx, w, h, S) {
      const p = S.p, g = D.geo(S); K.bg(ctx, w, h, { benchY: g.by }); const t = S.t;
      const dr = D.draft(S, g), hb = g.wy + dr + Math.sin(t * 2.2) * 1.2, hullH = g.bw * .3, hTop = hb - hullH;
      // tank back water
      K.raw(ctx, () => {
        const wg = ctx.createLinearGradient(0, g.wy, 0, g.bot); wg.addColorStop(0, 'rgba(56,189,248,.55)'); wg.addColorStop(1, 'rgba(14,116,144,.6)');
        ctx.fillStyle = wg; ctx.beginPath(); ctx.moveTo(g.x0, g.bot); for (let x = g.x0; x <= g.x1; x += 8) ctx.lineTo(x, g.wy + Math.sin(x * .04 + t * 2.5) * 1.6); ctx.lineTo(g.x1, g.bot); ctx.closePath(); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.18)'; for (let k = 0; k < 6; k++) { const yy = g.wy + 22 + k * (g.bot - g.wy - 30) / 6; ctx.fillRect(g.x0 + 20 + (k * 97) % (g.x1 - g.x0 - 80), yy, 50, 2); }
      });
      K.raw(ctx, () => {
        const tg = ctx.createLinearGradient(0, g.top, 0, g.bot); tg.addColorStop(0, '#facc15'); tg.addColorStop(1, '#eab308');
        ctx.strokeStyle = '#a16207'; ctx.lineWidth = 3; ctx.strokeRect(g.x0, g.top, g.x1 - g.x0, g.bot - g.top);
        ctx.fillStyle = tg; ctx.fillRect(g.x0 - 6, g.top - 8, g.x1 - g.x0 + 12, 9); ctx.fillRect(g.x0 - 6, g.bot - 4, g.x1 - g.x0 + 12, 10);
        ctx.fillStyle = 'rgba(146,64,14,.55)'; for (let x = g.x0 + 10; x < g.x1; x += 22) { ctx.beginPath(); ctx.arc(x, g.bot + 1, 1.8, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(x + 11, g.top - 3.5, 1.6, 0, TAU); ctx.fill(); }
        ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(g.x0 + 6, g.top + 6, 6, g.bot - g.top - 16);
      });
      // air stream
      if (p.air) K.raw(ctx, () => { S.air.forEach(q => { ctx.strokeStyle = `rgba(14,165,233,${.75 * (1 - q.life / 1.1)})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(q.x - Math.sign(q.vx) * 12, q.y); ctx.stroke(); }); });
      // paper boat
      K.raw(ctx, () => {
        const x = g.bx, b = g.bw; ctx.lineJoin = 'round';
        ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = 8; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(x - b * .5, hTop); ctx.lineTo(x + b * .5, hTop); ctx.lineTo(x + b * .32, hb); ctx.lineTo(x - b * .32, hb); ctx.closePath(); ctx.fill(); ctx.restore();
        ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#475569'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x - b * .5, hTop); ctx.lineTo(x + b * .5, hTop); ctx.lineTo(x + b * .32, hb); ctx.lineTo(x - b * .32, hb); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.moveTo(x - b * .5, hTop); ctx.lineTo(x - b * .2, hTop); ctx.lineTo(x - b * .32, hb); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x + b * .5, hTop); ctx.lineTo(x + b * .2, hTop); ctx.lineTo(x + b * .32, hb); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.moveTo(x - b * .24, hTop); ctx.lineTo(x, hTop - b * .5); ctx.lineTo(x + b * .24, hTop); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = '#cbd5e1'; ctx.beginPath(); ctx.moveTo(x, hTop - b * .5); ctx.lineTo(x, hTop); ctx.stroke();
        // iron paper clips on the right edge
        for (let k = 0; k < p.clips; k++) { const cx = x + b * .3 - k * b * .09, cy = hTop - 2; ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; rr(ctx, cx - 3, cy - 13, 7, 17, 3.5); ctx.stroke(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; rr(ctx, cx - 1, cy - 10, 3, 11, 1.5); ctx.stroke(); }
      });
      // front water (makes the submerged hull look under water) + tank glass
      K.raw(ctx, () => {
        ctx.fillStyle = 'rgba(56,189,248,.28)'; ctx.fillRect(g.bx - g.bw * .55, g.wy + 1, g.bw * 1.1, dr + 4);
        ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.x0, g.wy); for (let x = g.x0; x <= g.x1; x += 8) ctx.lineTo(x, g.wy + Math.sin(x * .04 + t * 2.5) * 1.6); ctx.stroke();
        // ripples near boat when moving
        if (Math.abs(S.bvp) > 8) { ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1.5; for (let k = 1; k <= 3; k++) { const rx = g.bx - Math.sign(S.bvp) * (g.bw * .45 + k * 14); ctx.beginPath(); ctx.ellipse(rx, g.wy + 2, 6 + k * 3, 2, 0, 0, TAU); ctx.stroke(); } }
      });
      C2.T(ctx, 'حوض مملوء بالماء', g.x0 + 70, g.bot - 16, { s: 11.5, w: 800, c: '#fff', bg: 'rgba(14,116,144,.75)' });
      // straw + blower face
      const st = D.straw(S, g); const blowing = S.blow || S.puffT > 0;
      K.raw(ctx, () => {
        ctx.save(); ctx.translate(st.x, st.y); ctx.scale(st.dir, 1);
        ctx.fillStyle = '#fcd9b6'; ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(-16, 0, 17, 0, TAU); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#3f2a1d'; ctx.beginPath(); ctx.arc(-16, -3, 17, Math.PI * 1.05, Math.PI * 1.85); ctx.fill();
        if (blowing) { ctx.fillStyle = 'rgba(244,114,182,.55)'; ctx.beginPath(); ctx.arc(-8, 6, 6, 0, TAU); ctx.fill(); }
        ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(-9, -4, 2, 0, TAU); ctx.fill();
        for (let k = 0; k < 6; k++) { ctx.fillStyle = k % 2 ? '#fff' : '#ef4444'; ctx.fillRect(k * 7, -2.5, 7, 5); } ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = .8; ctx.strokeRect(0, -2.5, 42, 5);
        ctx.restore();
      });
      C2.T(ctx, 'ماصة', st.x, st.y - 30, { s: 11, w: 800, c: '#be123c' });
      // magnet held by a hand
      const mx = S.mx * w, my = S.my * h, cp = D.clipPt(S, g), ang = Math.atan2(cp[1] - my, cp[0] - mx);
      if (p.field) K.raw(ctx, () => { ctx.strokeStyle = 'rgba(124,58,237,.45)'; ctx.lineWidth = 1.4; ctx.setLineDash([5, 4]); for (let k = 1; k <= 4; k++) { const r = 12 + k * 13; ctx.beginPath(); ctx.ellipse(mx + Math.cos(ang) * (22 + r * .5), my + Math.sin(ang) * (22 + r * .5), r * .7, 17 + r * .25, ang, -Math.PI / 2, Math.PI / 2); ctx.stroke(); } ctx.setLineDash([]); });
      C2.hand(ctx, mx - Math.cos(ang) * 30, my - Math.sin(ang) * 30, Math.cos(ang) >= 0 ? 1 : -1, .8, { sleeve: '#16a34a' });
      C2.horseshoe(ctx, mx, my, 1.15, ang);
      C2.T(ctx, 'مغناطيس', mx, my + 42, { s: 11.5, w: 800, c: '#b91c1c' });
      const mDist = Math.hypot(mx - cp[0], my - cp[1]);
      if (p.clips && Math.abs(S.fMag) > 4) K.raw(ctx, () => { ctx.strokeStyle = 'rgba(124,58,237,.7)'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 5]); ctx.lineDashOffset = -t * 20; ctx.beginPath(); ctx.moveTo(mx + Math.cos(ang) * 30, my + Math.sin(ang) * 30); ctx.lineTo(cp[0], cp[1]); ctx.stroke(); ctx.setLineDash([]); });
      // pushing hand while dragging
      if (S.dragB) { const dir = S.bvp >= 0 ? 1 : -1; C2.hand(ctx, g.bx - dir * g.bw * .45, hTop + hullH * .35, dir, .85); }
      // horizontal forces
      const fy = hTop - g.bw * .62, sc = .42;
      if (p.arrows) {
        let yy = fy; const put = (f, col, lab) => { if (Math.abs(f) < 3) return; C2.force(ctx, g.bx, yy, clamp(f * sc, -110, 110), 0, lab, col, 4); yy -= 30; };
        put(S.fHand, '#f97316', 'دفع اليد'); put(S.fAir, '#0ea5e9', 'الهواء'); put(S.fMag, '#7c3aed', 'المغناطيس');
        if (Math.abs(S.bvp) > 6 && !S.dragB) C2.force(ctx, g.bx, g.wy + dr + 16, clamp(-1.5 * S.bvp * sc, -70, 70), 0, 'مقاومة الماء', '#64748b', 3);
      }
      if (p.vel && Math.abs(S.bvp) > 4) { K.raw(ctx, () => G.arrow(ctx, g.bx - g.bw * .5, hTop - 6, g.bx - g.bw * .5 + clamp(S.bvp * .5, -80, 80), hTop - 6, '#16a34a', 3, 9)); C2.T(ctx, 'v', g.bx - g.bw * .5 + clamp(S.bvp * .5, -80, 80) + Math.sign(S.bvp) * 9, hTop - 14, { s: 13, w: 900, c: '#16a34a', mono: 1 }); }
      if (p.vert) {
        const L = 30 + p.clips * 7, cy = hb - hullH * .5;
        C2.force(ctx, g.bx - 8, cy, 0, L, '', '#dc2626', 4); C2.force(ctx, g.bx + 8, hb, 0, -L - hullH * .5, '', '#2563eb', 4);
        C2.T(ctx, 'الوزن', g.bx - 14, cy + L + 12, { s: 12, w: 900, c: '#fff', bg: '#dc2626', a: 'right' });
        C2.T(ctx, 'دفع الماء (الطفو)', g.bx + 14, cy + L + 12, { s: 12, w: 900, c: '#fff', bg: '#2563eb', a: 'left' });
        C2.T(ctx, '⚖️ متزنتان: القارب لا يغطس', g.bx, cy + L + 36, { s: 11.5, w: 800, c: '#0f172a', bg: 'rgba(255,255,255,.85)' });
      }
      // clip dish on the bench
      const dx = g.x0 + 50, dy = g.by + (h - g.by) * .42;
      K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(dx, dy, 38, 12, 0, 0, TAU); ctx.fill(); ctx.stroke(); for (let k = 0; k < 5 - p.clips; k++) { ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.save(); ctx.translate(dx - 22 + k * 11, dy - 2); ctx.rotate(.3); rr(ctx, -3, -8, 6, 15, 3); ctx.stroke(); ctx.restore(); } });
      C2.T(ctx, 'مشابك حديدية (انقر) 📎', dx + 4, dy + 24, { s: 11.5, w: 800, c: '#fff', bg: 'rgba(71,85,105,.85)' });
      // blow button
      const bb = D.blowBtn(S); C2.btn(ctx, bb.x, bb.y, bb.w, bb.h, blowing ? '💨 أنفخ الآن…' : '💨 انفخ (اضغط مطولاً)', { col: '#0ea5e9', on: blowing });
      // status card
      const act = [];
      if (S.dragB) act.push({ t: '✋ دفع اليد — قوة تماس', c: '#c2410c' });
      if (Math.abs(S.fAir) > 3) act.push({ t: '💨 النفخ (الهواء) — قوة تماس', c: '#0369a1' });
      if (Math.abs(S.fMag) > 3) act.push({ t: '🧲 المغناطيس — قوة عن بُعد (مجال)', c: '#6d28d9' });
      if (!act.length) act.push({ t: Math.abs(S.bvp) > 4 ? 'لا قوة دافعة: الماء يبطئ القارب' : 'القارب ساكن — يحتاج إلى قوة ليتحرك', c: '#475569' });
      act.push({ t: '⚖️ الوزن = دفع الماء (متزنتان)', c: '#1d4ed8' });
      C2.lines(ctx, act, w - 20, 16, Math.min(290, w * .42), { title: 'القوى المؤثرة في القارب الآن', bd: '#0ea5e9' });
      // messages
      if (!p.clips && mDist < 170) C2.msg(S, 'المغناطيس لا يجذب الورق!\nضع مشابك حديدية على القارب 📎', .2);
      C2.drawMsg(ctx, S, g.bx, hTop - g.bw * .5 - 4);
      K.party(ctx, S);
    },
    blowBtn(S) { return { x: Math.max(78, S.W * .09) + 92, y: 40, w: 176, h: 42 }; },
    drags(S) {
      const g = D.geo(S), st = D.straw(S, g), bb = D.blowBtn(S), hTop = g.wy + D.draft(S, g) - g.bw * .3;
      return [
        { id: 'boat', x: g.bx, y: hTop - g.bw * .1, w: g.bw, h: g.bw * .75, axis: 'x', tip: 'ادفع القارب بيدك ثم اتركه', idle: 'ادفع القارب بيدك ✋',
          down: S => { S.dragB = true; S._lt = C2.now(); S.bvp = 0; },
          drag: (S, d) => { const nt = C2.now(), ddt = Math.max(1 / 120, nt - S._lt); S._lt = nt; const u0 = S.bu; S.bu = clamp(S.bu + d.dx / g.TW, 0, 1); const v = (S.bu - u0) * g.TW / ddt; S.bvp = S.bvp * .6 + clamp(v, -260, 260) * .4; S.fHand = clamp(S.bvp * 1.1, -220, 220); S.nDrag++; },
          up: S => { S.dragB = false; S.fHand = 0; if (Math.abs(S.bvp) > 20) C2.msg(S, 'تركته… الماء يبطئه تدريجياً'); } },
        { id: 'straw', x: st.x + st.dir * 4, y: st.y, w: 70, h: 40, axis: 'x', tip: 'اسحب الماصة لتضعها خلف القارب', hint: false,
          drag: (S, d) => { S.su = clamp(S.su + d.dx / (g.x1 - g.x0 - 40), 0, 1); S.nDrag++; } },
        { id: 'blow', x: bb.x, y: bb.y, w: bb.w, h: bb.h, tip: 'اضغط مطولاً لتنفخ على القارب', hint: false,
          down: S => { S.blow = 1; }, up: S => { S.blow = 0; }, click: S => { S.puffT = .6; S.puffs++; } },
        { id: 'magnet', x: S.mx * S.W, y: S.my * S.H, r: 34, axis: 'xy', tip: 'اسحب المغناطيس وقرّبه من القارب', idle: 'قرّب المغناطيس 🧲',
          drag: (S, d) => { S.mx = clamp((d.ox + d.x - d.sx) / S.W, .1, .97); S.my = clamp((d.oy + d.y - d.sy) / S.H, .2, (g.wy - 30) / S.H); S.nDrag++; } },
        { id: 'clips', x: g.x0 + 50, y: g.by + (S.H - g.by) * .42, w: 90, h: 40, tip: 'انقر لتضع مشبكاً حديدياً على القارب', hint: false,
          click: S => { const n = S.p.clips >= 5 ? 0 : S.p.clips + 1; setParam(S, 'clips', n); C2.msg(S, n ? 'وضعتَ ' + n + ' مشبك على القارب — لاحظ أنه غطس قليلاً' : 'أزلتَ المشابك'); } }
      ];
    },
    readings(S) { const g = S.W ? D.geo(S) : null; const v = g ? Math.abs(S.bvp) / g.TW * 60 : 0; const m = 5 + S.p.clips * 1;
      return [rd('سرعة القارب', fmt(v, 2) + ' cm/s'), rd('عدد المشابك', S.p.clips), rd('وزن القارب', fmt(m * 9.8 / 1000, 3) + ' N'), rd('دفع الماء (الطفو)', fmt(m * 9.8 / 1000, 3) + ' N'),
        rd('القوى الأفقية', [S.dragB ? 'اليد' : '', Math.abs(S.fAir) > 3 ? 'الهواء' : '', Math.abs(S.fMag) > 3 ? 'المغناطيس' : ''].filter(Boolean).join(' + ') || 'لا توجد', 1)]; },
    explain(S) { if (S.dragB) return 'يدك تؤثر في القارب <b>بقوة تماس</b> فتغيّر حالته الحركية.'; if (Math.abs(S.fMag) > 3) return 'المغناطيس يجذب <b>المشابك الحديدية</b> دون أن يلمسها: هذه <b>قوة تؤثر عن بُعد</b> (قوة مجال) فيتحرك القارب نحو المغناطيس.'; if (Math.abs(S.fAir) > 3) return 'الهواء المندفع من الماصة يدفع القارب؛ إذا كان النفخ <b>باتجاه حركته</b> تزداد سرعته.'; if (Math.abs(S.bvp) > 4) return 'لا توجد قوة دافعة الآن، والماء يعيق حركة القارب فتقل سرعته حتى يقف.'; return 'القارب <b>ساكن</b> وطافٍ: وزنه إلى الأسفل يتعادل مع دفع الماء إلى الأعلى. نحتاج إلى <b>قوة</b> لتحريكه.'; },
    quiz: [
      { q: 'تزداد سرعة الجسم المتحرك أكثر عندما تؤثر فيه القوة:', o: ['بعكس اتجاه الحركة', 'باتجاه الحركة', 'باتجاه عمودي على الحركة'], a: 1, why: 'النفخ على القارب باتجاه حركته زاد سرعته (مراجعة الفصل ص 40).' },
      { q: 'القوة هي:', o: ['كل مؤثر يغيّر أو يحاول أن يغيّر من حالة الجسم الحركية أو شكله', 'كمية المادة الموجودة في الجسم', 'المسافة التي يقطعها الجسم'], a: 0, why: 'تعريف القوة في الكتاب ص 29.' },
      { q: 'لماذا يبقى القارب الورقي طافياً على سطح الماء؟', o: ['لأنه لا يتأثر بأي قوة', 'لأن وزنه يتعادل مع دفع الماء له إلى الأعلى', 'لأن الهواء يرفعه'], a: 1, why: 'القوتان متساويتان ومتعاكستان، فهما متزنتان والقارب لا يغطس.' }
    ]
  };
  X7(D);
})();

/* =========================================================================================
   2) الكتلة والوزن — الميزان النابضي (ص 29–30)
   ========================================================================================= */
(() => {
  const ITEMS = [
    { id: 'apple', name: 'تفاحة', m: .1, lab: '100 g', h: 40 },
    { id: 'm200', name: 'ثقل 200 g', m: .2, lab: '200 g', h: 34 },
    { id: 'm500', name: 'ثقل 500 g', m: .5, lab: '500 g', h: 44 },
    { id: 'bag', name: 'كيس فيه 10 تفاحات', m: 1, lab: '10 تفاحات', h: 66 },
    { id: 'm1', name: 'ثقل 1 kg', m: 1, lab: '1 kg', h: 56 },
    { id: 'school', name: 'حقيبة مدرسية', m: 6, lab: '6 kg', h: 76 }
  ];
  const PL = { earth: { n: 'الأرض', g: 9.8, c: '#3b82f6', top: '#e0f2fe', bot: '#f0f9ff' }, moon: { n: 'القمر', g: 1.6, c: '#94a3b8', top: '#e2e8f0', bot: '#f1f5f9' }, mars: { n: 'المريخ', g: 3.7, c: '#ea580c', top: '#fed7aa', bot: '#fff7ed' }, jup: { n: 'المشتري', g: 24.8, c: '#d97706', top: '#fde68a', bot: '#fffbeb' } };
  const apple = (ctx, x, y, r) => { ctx.fillStyle = '#65a30d'; ctx.beginPath(); ctx.ellipse(x + r * .45, y - r * .9, r * .45, r * .2, -.5, 0, TAU); ctx.fill(); const g = ctx.createRadialGradient(x - r * .35, y - r * .3, r * .1, x, y, r); g.addColorStop(0, '#fca5a5'); g.addColorStop(.4, '#dc2626'); g.addColorStop(1, '#7f1d1d'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x - r * .45, y, r * .75, 0, TAU); ctx.arc(x + r * .45, y, r * .75, 0, TAU); ctx.fill(); ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - r * .6); ctx.lineTo(x + 2, y - r * 1.1); ctx.stroke(); };
  function drawItem(ctx, it, x, y) { // x,y = attachment (top)
    K.raw(ctx, () => {
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.6;
      if (it.id === 'apple') { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 8); ctx.stroke(); apple(ctx, x, y + 24, 15); }
      else if (it.id === 'bag') { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 18, y + 16); ctx.moveTo(x, y); ctx.lineTo(x + 18, y + 16); ctx.stroke(); [[-12, 28], [8, 26], [-2, 42], [16, 44], [-18, 46], [2, 57], [-12, 60], [16, 60]].forEach(([a, b]) => apple(ctx, x + a, y + b, 8.5)); ctx.strokeStyle = 'rgba(234,179,8,.9)'; ctx.lineWidth = 1; for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(x - 24, y + 16 + k * 10 + 20); ctx.lineTo(x + 24, y + 36 + k * 10 + 20); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + 24, y + 16 + k * 10 + 20); ctx.lineTo(x - 24, y + 36 + k * 10 + 20); ctx.stroke(); } }
      else if (it.id === 'school') { ctx.lineWidth = 4; ctx.strokeStyle = '#1e3a8a'; ctx.beginPath(); ctx.arc(x, y + 8, 8, Math.PI, 0); ctx.stroke(); const g = ctx.createLinearGradient(x - 28, 0, x + 28, 0); g.addColorStop(0, '#2563eb'); g.addColorStop(1, '#1e40af'); ctx.fillStyle = g; rr(ctx, x - 28, y + 8, 56, 68, 12); ctx.fill(); ctx.fillStyle = '#60a5fa'; rr(ctx, x - 20, y + 40, 40, 28, 7); ctx.fill(); ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 20, y + 48); ctx.lineTo(x + 20, y + 48); ctx.stroke(); }
      else { const H = it.h - 10, W = it.id === 'm1' ? 40 : it.id === 'm500' ? 34 : 28; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 10); ctx.stroke(); const g = ctx.createLinearGradient(x - W / 2, 0, x + W / 2, 0); g.addColorStop(0, '#a16207'); g.addColorStop(.45, '#fde68a'); g.addColorStop(1, '#854d0e'); ctx.fillStyle = g; rr(ctx, x - W / 2, y + 10, W, H, 5); ctx.fill(); ctx.strokeStyle = '#713f12'; ctx.lineWidth = 1; ctx.stroke(); ctx.fillStyle = '#422006'; ctx.font = '900 10px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr'; ctx.fillText(it.lab, x, y + 10 + H / 2); ctx.textBaseline = 'alphabetic'; }
    });
  }
  const D = { id: 'g7_weight', ch: 12, sec: 'الدرس 1', page: 29, kind: 'نشاط', title: 'الكتلة والوزن: قياس الوزن بالميزان النابضي',
    desc: 'علّق تفاحة وأثقالاً وحقيبة مدرسية في الميزان النابضي واقرأ الوزن w = m × g، ثم انتقل إلى القمر والمريخ والمشتري: الكتلة ثابتة والوزن يتغير!',
    tags: 'وزن كتلة ميزان نابضي نيوتن جاذبية قمر',
    tools: ['حامل', 'ميزان نابضي (نيوتن ميتر)', 'تفاحة كتلتها 100 g', 'أثقال 200 g و 500 g و 1 kg', 'كيس فيه 10 تفاحات', 'حقيبة مدرسية كتلتها 6 kg'],
    steps: ['اسحب التفاحة وعلّقها في خطاف الميزان النابضي. لاحظ استطالة النابض وقراءته (≈ 1 N).', 'بدّلها بكيس التفاحات العشر: كم تصبح القراءة؟ (≈ 10 N)', 'علّق الأثقال واحداً بعد الآخر واضغط «تسجيل» في كل مرة، ثم لاحظ الرسم البياني: الوزن يتناسب مع الكتلة.', 'علّق الحقيبة المدرسية (6 kg): إذا تجاوز الوزن مدى الميزان اختر ميزاناً بمدى أكبر (100 N). تحقق: w = 6 × 9.8 = 58.8 N.', 'غيّر الكوكب إلى القمر ثم المشتري: هل تغيرت الكتلة؟ هل تغيّر الوزن؟', 'فعّل «أمثلة لمقادير القوى» وقارن.'],
    concl: ['الوزن هو قوة جذب الأرض للجسم، ويساوي الكتلة × تعجيل الجاذبية: w = m × g حيث g = 9.8 N/kg.', 'يقاس الوزن (والقوة عموماً) بوحدة النيوتن N باستعمال الميزان النابضي؛ تزداد استطالة نابضه بزيادة القوة المؤثرة.', 'الجسم الذي كتلته 1 kg وزنه 9.8 N، والتفاحة (100 g) تحتاج قوة ≈ 1 N لرفعها.', 'الكتلة لا تتغير لأنها كمية المادة في الجسم، أما الوزن فيتغير بتغير قوة الجاذبية (على القمر أقل وعلى المشتري أكبر).'],
    laws: ['g7_weight'],
    fact: ['يتغير الوزن مع تغير قوة الجاذبية، أما الكتلة فلا تتغير لأنها مقدار كمية المادة في الجسم.', 'تستطيع النملة سحب الأشياء بقوة تعادل تقريباً 0.01 N، وتستطيع السيارة الدفع بقوة 5000 N، بينما يندفع الصاروخ إلى الأعلى بقوة 30000000 N!', 'الجاذبية على القمر نحو سدس جاذبية الأرض، لذلك يقفز رواد الفضاء هناك بسهولة.'],
    controls: [SEL('pl', 'المكان', [['earth', 'الأرض 🌍'], ['moon', 'القمر 🌙'], ['mars', 'المريخ'], ['jup', 'المشتري']], 'earth'),
      SEL('sb', 'مدى الميزان النابضي', [[10, '10 N'], [20, '20 N'], [100, '100 N']], 20),
      BT('', [{ t: 'إنزال الجسم', on: S => { S.hang = ''; } }]),
      TG('arrows', 'سهما الوزن وقوة النابض', true, null, 'force'), TG('calc', 'حساب الوزن w = m × g', true, null, 'graph'), TG('ex', 'أمثلة لمقادير القوى', false, null, 'eye'), TG('mass', 'بطاقة الكتلة (لا تتغير)', true, null, 'labels')],
    setup(S) { S.hang = ''; S.F = 0; S.Fv = 0; S.dragI = ''; S.gx = 0; S.gy = 0; S.nDrag = 0; },
    geo(S) { const w = S.W, h = S.H, by = h * .8; const sx = Math.max(w * .42, 250), top = h * .1 + 34, L = clamp(h * .28, 150, 240); const hy = top + L + 24;
      const tx0 = Math.max(sx + 44, w * .5), tx1 = w - 24; return { w, h, by, sx, top, L, hx: sx + 4, hy, tx0, tx1 }; },
    trayPos(g, i) { const n = ITEMS.length; if ((g.tx1 - g.tx0) / n >= 56) return [g.tx0 + (g.tx1 - g.tx0) * (i + .5) / n, g.by - ITEMS[i].h - 2]; const c = i % 3, r = i / 3 | 0, x1 = r ? g.tx1 - 46 : g.tx1; return [g.tx0 + (x1 - g.tx0) * (c + .5) / 3, (r ? g.by + (g.h - g.by) * .62 : g.by) - ITEMS[i].h - 2]; },
    itemPos(S, g, i) { const it = ITEMS[i]; if (S.dragI === it.id) return [S.gx, S.gy]; if (S.hang === it.id) return [g.hx, g.hy + D.ext(S, g) * 0]; return D.trayPos(g, i); },
    ext(S, g) { return 0; },
    gval(S) { return PL[S.p.pl].g; },
    update(S, dt) { dt = Math.min(dt, .04); const it = ITEMS.find(q => q.id === S.hang); const tgt = it ? it.m * D.gval(S) : 0; const a = 90 * (tgt - S.F) - 7 * S.Fv; S.Fv += a * dt; S.F += S.Fv * dt; },
    draw(ctx, w, h, S) {
      const p = S.p, g = D.geo(S), P = PL[p.pl]; K.bg(ctx, w, h, { benchY: g.by, top: P.top, bottom: P.bot });
      if (p.pl === 'moon') K.raw(ctx, () => { ctx.fillStyle = 'rgba(100,116,139,.18)'; [[.2, .3, 30], [.7, .15, 18], [.85, .45, 24], [.35, .62, 16]].forEach(([a, b, r]) => { ctx.beginPath(); ctx.arc(w * a, h * b, r, 0, TAU); ctx.fill(); }); });
      if (p.pl === 'jup') K.raw(ctx, () => { ctx.fillStyle = 'rgba(180,83,9,.08)'; for (let k = 0; k < 5; k++) ctx.fillRect(0, h * (.1 + k * .14), w, h * .05); });
      // planet badge
      const bx = Math.max(78, w * .09), pby = g.by + 44;
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.9)'; rr(ctx, bx - 4, pby - 26, 160, 52, 14); ctx.fill(); ctx.save(); ctx.translate(0, pby - 42); const gg = ctx.createRadialGradient(bx + 18, 34, 3, bx + 24, 40, 24); gg.addColorStop(0, '#fff'); gg.addColorStop(.3, P.c); gg.addColorStop(1, shade(P.c, -50)); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(bx + 24, 42, 22, 0, TAU); ctx.fill(); if (p.pl === 'jup') { ctx.strokeStyle = 'rgba(120,53,15,.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx + 4, 38); ctx.lineTo(bx + 44, 38); ctx.moveTo(bx + 6, 48); ctx.lineTo(bx + 42, 48); ctx.stroke(); } ctx.restore(); });
      C2.T(ctx, 'نحن على ' + P.n, bx + 54, pby - 10, { s: 14, w: 900, a: 'left', c: '#0f172a' });
      C2.T(ctx, 'g = ' + P.g + ' N/kg', bx + 54, pby + 12, { s: 13, w: 900, a: 'left', mono: 1, c: '#7c3aed' });
      // stand
      K.raw(ctx, () => { const rx = g.sx - 70; const sg = ctx.createLinearGradient(rx - 5, 0, rx + 5, 0); sg.addColorStop(0, '#64748b'); sg.addColorStop(.5, '#e2e8f0'); sg.addColorStop(1, '#475569'); ctx.fillStyle = sg; ctx.fillRect(rx - 5, g.top - 66, 10, g.by - g.top + 62); ctx.fillStyle = '#334155'; rr(ctx, rx - 50, g.by - 12, 110, 14, 5); ctx.fill(); ctx.fillStyle = '#94a3b8'; ctx.fillRect(rx, g.top - 66, g.sx - rx + 10, 8); ctx.fillStyle = '#475569'; rr(ctx, rx - 9, g.top - 72, 18, 20, 4); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.sx, g.top - 58); ctx.lineTo(g.sx, g.top - 46); ctx.moveTo(g.sx, g.top - 26); ctx.lineTo(g.sx, g.top - 23); ctx.stroke(); });
      // spring balance
      const it = ITEMS.find(q => q.id === S.hang); const Fmax = +p.sb; const over = it && it.m * P.g > Fmax * 1.02;
      K.springBalance(ctx, g.sx, g.top, Math.max(0, S.F), Fmax, { len: g.L, ticks: Fmax === 100 ? 5 : Fmax === 10 ? 5 : 4, col: over ? '#ef4444' : '#f59e0b' });
      if (over) C2.T(ctx, '⚠️ تجاوز مدى الميزان! اختر 100 N', g.sx, g.top + g.L * .5, { s: 12, w: 900, c: '#fff', bg: '#dc2626', a: 'right' });
      C2.T(ctx, 'ميزان نابضي', g.sx - 30, g.top + 20, { s: 11, w: 800, c: '#92400e', a: 'right' });
      // items
      ITEMS.forEach((q, i) => { const [x, y] = D.itemPos(S, g, i); drawItem(ctx, q, x, y); if (S.hang !== q.id && S.dragI !== q.id) C2.T(ctx, q.lab, x, y + q.h + 14, { s: 11, w: 800, c: '#fff', bg: 'rgba(120,53,15,.8)' }); });
      C2.T(ctx, 'اسحب أي جسم وعلّقه في الخطاف', (g.tx0 + g.tx1) / 2, g.by - 100, { s: 11.5, w: 800, c: '#92400e' });
      // forces on the hanging body
      if (it) { const W = it.m * P.g, cy = g.hy + it.h * .55, px = 120 / Fmax, L = clamp(W * px, 8, 150), Ls = clamp(Math.max(0, Math.min(S.F, Fmax * 1.05)) * px, 0, 150);
        if (p.arrows) { C2.force(ctx, g.hx + 34, cy, 0, L, '', '#dc2626', 4); C2.T(ctx, 'الوزن w = ' + fmt(W, 3) + ' N', g.hx + 42, cy + L + 12, { s: 12, w: 900, c: '#fff', bg: '#dc2626', a: 'left' });
          C2.force(ctx, g.hx - 30, g.hy + 6, 0, -Ls, '', '#16a34a', 4); C2.T(ctx, 'قوة النابض', g.hx - 36, g.hy - Ls * .5, { s: 12, w: 900, c: '#fff', bg: '#16a34a', a: 'right' }); }
        if (p.mass) C2.T(ctx, 'الكتلة m = ' + (it.m < 1 ? it.m * 1000 + ' g' : it.m + ' kg') + '  (لا تتغير)', g.hx - 40, cy + it.h * .3 + 20, { s: 12, w: 900, c: '#fff', bg: '#7c3aed', a: 'right' });
        if (it.id === 'apple' && p.pl === 'earth') K.bubble(ctx, C2.iso('نحتاج قوة ≈ 1 N لرفع تفاحة 🍎'), g.hx - 60, g.hy + 4, { s: 12, side: 'l' });
        if (it.id === 'bag' && p.pl === 'earth') K.bubble(ctx, C2.iso('10 تفاحات ≈ 10 N'), g.hx - 60, g.hy + 4, { s: 12, side: 'l' });
      }
      // calculation card
      if (p.calc) { const cw = Math.min(250, w - g.sx - 60), cx = w - 20; const L = it ? ['w = m × g', `w = ${it.m} kg × ${P.g} N/kg`, { t: `w = ${fmt(it.m * P.g, 4)} N`, c: '#6d28d9', w: 900, s: 15 }] : ['w = m × g', { t: 'علّق جسماً لحساب وزنه', c: '#64748b' }];
        C2.lines(ctx, L.map(q => typeof q === 'string' ? { t: q, mono: 1, a: 'c' } : Object.assign({ mono: /^w/.test(q.t) ? 1 : 0, a: 'c' }, q)), cx, 16, cw, { title: 'حساب الوزن', bd: '#7c3aed', lh: 22 }); }
      // examples of forces (book p.30 + p.39)
      if (p.ex) { const L = [['🐜 نملة تسحب شيئاً', '0.01 N'], ['🍎 رفع تفاحة', '1 N'], ['💡 إضاءة مصباح (مفتاح)', '5 N'], ['🥫 فتح علبة أغذية', '20 N'], ['🎾 على كرة التنس', '2000 N'], ['🚗 دفع السيارة', '5000 N'], ['🚀 اندفاع الصاروخ', '30000000 N']];
        const cw = 214, x0 = bx, y0 = g.sx - 80 - bx >= cw ? 20 : g.by - 40 - L.length * 20; C2.card(ctx, x0, y0, cw, 30 + L.length * 20, { bd: '#f59e0b' }); C2.T(ctx, 'أمثلة لمقادير القوى', x0 + cw / 2, y0 + 15, { s: 12.5, w: 900, c: '#b45309' });
        L.forEach((r, i) => { C2.T(ctx, r[0], x0 + cw - 8, y0 + 36 + i * 20, { s: 11.5, a: 'right' }); C2.T(ctx, r[1], x0 + 8, y0 + 36 + i * 20, { s: 11, a: 'left', mono: 1, w: 900, c: '#b45309' }); }); }
      if (!it && !S.dragI && !S._touched && !p.ex) K.mascot(ctx, Math.max(110, g.sx - 150), g.by - 64, .85);
      K.party(ctx, S);
    },
    drags(S) { const g = D.geo(S);
      return ITEMS.map((it, i) => { const [x, y] = D.itemPos(S, g, i); return { id: 'it_' + it.id, x, y: y + it.h / 2, w: 58, h: it.h + 6, axis: 'xy', tip: 'اسحب ' + it.name + ' وعلّقه في خطاف الميزان', idle: i === 0 ? 'علّق التفاحة في الميزان ✋' : undefined, hint: i === 0,
        down: S => { S.dragI = it.id; S.gx = x; S.gy = y; if (S.hang === it.id) S.hang = ''; },
        drag: (S, d) => { S.gx = d.ox + d.x - d.sx; S.gy = d.oy - it.h / 2 + d.y - d.sy; S.nDrag++; },
        up: S => { S.dragI = ''; if (Math.hypot(S.gx - g.hx, S.gy - g.hy) < 70) { S.hang = it.id; if (window.Sound) Sound.click(); if (it.m * D.gval(S) > +S.p.sb * 1.02) C2.msg(S, 'ثقيل جداً على هذا الميزان!'); } } }; }); },
    readings(S) { const it = ITEMS.find(q => q.id === S.hang), gg = D.gval(S); if (!it) return [rd('المكان', PL[S.p.pl].n + ' (g = ' + gg + ' N/kg)'), rd('قراءة الميزان', fmt(Math.max(0, S.F), 3) + ' N'), rd('الجسم المعلق', '— علّق جسماً', 1)];
      return [rd('الجسم', it.name), rd('الكتلة m', it.m + ' kg'), rd('تعجيل الجاذبية g', gg + ' N/kg'), rd('الوزن w = m g', fmt(it.m * gg, 4) + ' N'), rd('قراءة الميزان', fmt(clamp(S.F, 0, +S.p.sb * 1.05), 3) + ' N')]; },
    record(S) { const it = ITEMS.find(q => q.id === S.hang); if (!it) { Runner.toast('علّق جسماً في الميزان أولاً', 'info'); return null; } const gg = D.gval(S); if (S.rows.length === 3) K.cheer(S, S.W * .6, S.H * .3); return { obj: it.name, pl: PL[S.p.pl].n, m: it.m, w: +(it.m * gg).toFixed(2) }; },
    cols: [['obj', 'الجسم'], ['pl', 'المكان'], ['m', 'الكتلة m (kg)'], ['w', 'الوزن w (N)']],
    graph: { x: 'm', y: 'w', xl: 'الكتلة m (kg)', yl: 'الوزن w (N)', fit: { u: 'N/kg', t: () => 'الميل = تعجيل الجاذبية g' } },
    explain(S) { const it = ITEMS.find(q => q.id === S.hang), P = PL[S.p.pl]; if (!it) return 'الميزان النابضي يقيس <b>القوة</b>: كلما زادت القوة المؤثرة فيه ازدادت <b>استطالة نابضه</b>. علّق جسماً لتقيس وزنه.';
      return `الأرض${S.p.pl === 'earth' ? '' : ' (هنا: ' + P.n + ')'} تجذب ${it.name} بقوة هي <b>وزنه</b>: w = ${it.m} × ${P.g} = <b>${fmt(it.m * P.g, 4)} N</b>. ${S.p.pl !== 'earth' ? 'لاحظ أن <b>الكتلة لم تتغير</b> (' + it.m + ' kg) لكن الوزن تغيّر.' : 'النابض يستطيل حتى تتزن قوته مع الوزن.'}`; },
    quiz: [
      { q: 'احسب وزن جسم كتلته 60 kg على سطح الأرض (g = 9.8 N/kg):', o: ['60 N', '588 N', '6.1 N'], a: 1, why: 'w = m × g = 60 × 9.8 = 588 N (مراجعة الدرس ص 32).' },
      { q: 'كم نحتاج من القوة لرفع جسم كتلته 1.2 kg من على سطح الأرض؟', o: ['قوة أكبر من 9.8 N', 'قوة أقل من 8 N', 'لا نحتاج إلى قوة'], a: 0, why: 'وزنه = 1.2 × 9.8 = 11.76 N، ولرفعه نؤثر بقوة أكبر من وزنه.' },
      { q: 'رائد فضاء انتقل من الأرض إلى سطح القمر. ماذا يحدث؟', o: ['تقل كتلته ويبقى وزنه', 'يقل وزنه وتبقى كتلته ثابتة', 'لا يتغير وزنه ولا كتلته'], a: 1, why: 'الكتلة كمية المادة فلا تتغير، أما الوزن فيقل لأن جاذبية القمر أقل.' }
    ]
  };
  X7(D);
})();

/* =========================================================================================
   3) تمثيل القوة بالرسم (ص 30–31)
   ========================================================================================= */
(() => {
  const DIRS = { E: { v: [1, 0], n: 'الشرق' }, W: { v: [-1, 0], n: 'الغرب' }, N: { v: [0, 1], n: 'الشمال' }, S: { v: [0, -1], n: 'الجنوب' } };
  const TASKS = [null, { F: 20, d: 'E', sc: 5, src: 'مثال الكتاب ص 30' }, { F: 50, d: 'N', sc: 10, src: 'مثال الكتاب ص 31' }, { F: 60, d: 'W', sc: 10, src: 'مراجعة الدرس س4' }, { F: 15, d: 'S', sc: 5, src: 'تمرين' }, { F: 200, d: 'N', sc: 50, src: 'مراجعة الفصل ص 41' }];
  const dirName = (x, y) => { if (Math.hypot(x, y) < .01) return '—'; const a = Math.atan2(y, x) * 180 / Math.PI; const n = [[0, 'الشرق'], [90, 'الشمال'], [180, 'الغرب'], [-180, 'الغرب'], [-90, 'الجنوب']].find(q => Math.abs(q[0] - a) < 1); if (n) return n[1]; return (y > 0 ? 'الشمال' : 'الجنوب') + ' ' + (x > 0 ? 'الشرقي' : 'الغربي'); };
  const D = { id: 'g7_force_draw', ch: 12, sec: 'الدرس 1', page: 30, kind: 'نشاط', title: 'تمثيل القوة بالرسم: عناصر القوة الأربعة ومقياس الرسم',
    desc: 'ارسم متجه القوة بنفسك على ورق المربعات: اسحب رأس السهم حتى يمثّل القوة المطلوبة بمقياس رسم مناسب، وتعرّف عناصرها الأربعة.',
    tags: 'تمثيل القوة رسم متجه مقياس رسم نقطة تأثير خط فعل اتجاه مقدار',
    tools: ['ورق مربعات (كل مربع 1 cm)', 'مسطرة', 'قلم'],
    steps: ['اقرأ المهمة في أعلى اللوحة، مثلاً: قوة 20 N باتجاه الشرق بمقياس رسم 5 N/cm.', 'احسب طول السهم: الطول = المقدار ÷ مقياس الرسم = 20 ÷ 5 = 4 cm.', 'اسحب رأس السهم الأحمر من النقطة O باتجاه الشرق حتى يصبح طوله 4 cm (كل مربع = 1 cm).', 'اضغط «✔ تحقّق». إذا كان الرسم صحيحاً تحصل على نجمة ⭐، ثم انتقل إلى المهمة التالية.', 'فعّل «عناصر القوة الأربعة» وتعرّف: نقطة التأثير، خط الفعل، المقدار، الاتجاه.', 'في «رسم حر» غيّر مقياس الرسم وارسم أي قوة، واقرأ مقدارها واتجاهها.'],
    concl: ['القوة كمية اتجاهية: نحتاج عند تعيينها إلى ذكر مقدارها واتجاهها.', 'نمثل القوة بسهم له أربعة عناصر: نقطة التأثير (بداية السهم)، خط الفعل (الخط الذي ينطبق عليه السهم)، المقدار (طول السهم)، الاتجاه (رأس السهم).', 'طول السهم على الرسم = مقدار القوة ÷ مقياس الرسم (مثلاً 20 N بمقياس 5 N/cm تمثل بـ 4 cm).'],
    laws: [],
    fact: ['عند سحب جسم بحبل تكون نقطة تأثير القوة هي نقطة ربط الحبل بالجسم.', 'نختار مقياس الرسم بحيث يكون السهم واضحاً ويتسع له الورق: 200 N بمقياس 50 N/cm تمثل بـ 4 cm فقط!', 'في لعبة السيسو تقع نقطة تأثير القوة حيث يجلس الطفل على اللوح.'],
    controls: [SEL('task', 'المهمة', [[1, '1) 20 N شرقاً (5 N/cm)'], [2, '2) 50 N شمالاً (10 N/cm)'], [3, '3) 60 N غرباً (10 N/cm)'], [4, '4) 15 N جنوباً (5 N/cm)'], [5, '5) 200 N شمالاً (50 N/cm)'], [0, 'رسم حر']], 1, (v, S) => D.newTask(S)),
      SEL('sc', 'مقياس الرسم', [[5, '5 N/cm'], [10, '10 N/cm'], [50, '50 N/cm']], 5, (v, S) => { if (+S.p.task) { const T = TASKS[+S.p.task]; if (+v !== T.sc) { C2.msg(S, 'مقياس هذه المهمة ' + T.sc + ' N/cm'); setParam(S, 'sc', T.sc); } } }),
      BT('', [{ t: '✔ تحقّق', cls: 'good', on: S => D.check(S) }, { t: 'المهمة التالية ⟵', on: S => { setParam(S, 'task', (+S.p.task % 5) + 1); } }, { t: 'مسح', on: S => { S.tx = 1; S.ty = 0; S.res = ''; } }]),
      TG('el', 'عناصر القوة الأربعة', true, null, 'labels'), TG('axis', 'المستقيم OX المدرّج', true, null, 'vector'), TG('grid', 'ورق المربعات (1 cm)', true, null, 'grid'), TG('rose', 'اتجاهات البوصلة', true, null, 'compass')],
    setup(S) { S.tx = 1; S.ty = 0; S.res = ''; S.stars = 0; S.tries = 0; S.done = ''; S.nDrag = 0; },
    newTask(S) { S.tx = 1; S.ty = 0; S.res = ''; S.tries = 0; const T = TASKS[+S.p.task]; if (T) setParam(S, 'sc', T.sc); },
    check(S) {
      const T = TASKS[+S.p.task]; S.tries++;
      if (!T) { C2.msg(S, 'رسم حر: F = ' + fmt(Math.hypot(S.tx, S.ty) * S.p.sc, 3) + ' N باتجاه ' + dirName(S.tx, S.ty)); S.res = 'free'; return; }
      const v = DIRS[T.d].v, L = T.F / T.sc, ok = Math.abs(S.tx - v[0] * L) < .26 && Math.abs(S.ty - v[1] * L) < .26;
      const dirOk = Math.hypot(S.tx, S.ty) > .1 && Math.abs(Math.atan2(S.ty, S.tx) - Math.atan2(v[1], v[0])) % TAU < .05;
      if (ok) { S.res = 'ok'; if (!S.done.includes('|' + S.p.task)) { S.done += '|' + S.p.task; S.stars++; } K.cheer(S, S.W / 2, S.H * .35); C2.msg(S, 'أحسنت! ⭐ ' + T.F + ' N ÷ ' + T.sc + ' N/cm = ' + L + ' cm نحو ' + DIRS[T.d].n, 3.5); }
      else if (!dirOk) { S.res = 'dir'; C2.msg(S, 'الاتجاه غير صحيح: يجب أن يشير رأس السهم نحو ' + DIRS[T.d].n, 3); }
      else { S.res = 'len'; C2.msg(S, 'الاتجاه صحيح 👍 لكن الطول يجب أن يكون ' + T.F + ' ÷ ' + T.sc + ' = ' + L + ' cm', 3.5); }
    },
    geo(S) { const w = S.W, h = S.H, L = Math.max(76, w * .09), Rr = w - 20, top = 128, bot = h - 84; const cell = Math.floor(Math.min((Rr - L) / 14, (bot - top) / 14)); return { w, h, L, Rr, top, bot, cell, cx: Math.round((L + Rr) / 2), cy: Math.round((top + bot) / 2) }; },
    draw(ctx, w, h, S) {
      const p = S.p, g = D.geo(S), c = g.cell, O = [g.cx, g.cy], T = TASKS[+p.task];
      K.bg(ctx, w, h, { bench: false, tiles: false, top: '#f8fafc', bottom: '#f1f5f9', benchY: h });
      // paper
      const gw = c * 14, gh = c * 14, gx = g.cx - gw / 2, gy = g.cy - gh / 2;
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.18)'; ctx.shadowBlur = 12; ctx.fillStyle = '#fffef7'; ctx.fillRect(gx - 8, gy - 8, gw + 16, gh + 16); ctx.restore();
        if (p.grid) { ctx.lineWidth = 1; for (let k = 0; k <= 14; k++) { ctx.strokeStyle = k === 7 ? 'rgba(14,116,144,.35)' : 'rgba(14,116,144,.16)'; ctx.beginPath(); ctx.moveTo(gx + k * c, gy); ctx.lineTo(gx + k * c, gy + gh); ctx.moveTo(gx, gy + k * c); ctx.lineTo(gx + gw, gy + k * c); ctx.stroke(); } ctx.strokeStyle = 'rgba(14,116,144,.07)'; ctx.beginPath(); for (let k = 0; k < 28; k++) { ctx.moveTo(gx + k * c / 2, gy); ctx.lineTo(gx + k * c / 2, gy + gh); ctx.moveTo(gx, gy + k * c / 2); ctx.lineTo(gx + gw, gy + k * c / 2); } ctx.stroke(); } });
      if (p.grid) C2.T(ctx, '1 cm', gx + c * .5, gy + gh + 16, { s: 11, w: 800, c: '#0e7490', mono: 1 });
      // compass rose (top-left corner of the paper)
      if (p.rose) { const rx = gx + c * 1.5, ry = gy + c * 1.5, r = c * 1.05; K.raw(ctx, () => { ctx.fillStyle = 'rgba(254,243,199,.9)'; ctx.beginPath(); ctx.arc(rx, ry, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#b45309'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillStyle = '#b45309'; [0, 1, 2, 3].forEach(k => { const a = k * Math.PI / 2; ctx.beginPath(); ctx.moveTo(rx + Math.cos(a) * r * .8, ry + Math.sin(a) * r * .8); ctx.lineTo(rx + Math.cos(a + 1.3) * r * .18, ry + Math.sin(a + 1.3) * r * .18); ctx.lineTo(rx + Math.cos(a - 1.3) * r * .18, ry + Math.sin(a - 1.3) * r * .18); ctx.fill(); }); });
        [['شمال', 0, -1], ['جنوب', 0, 1], ['شرق', 1, 0], ['غرب', -1, 0]].forEach(([n, a, b]) => C2.T(ctx, n, rx + a * (r + 17), ry + b * (r + 11), { s: 11, w: 900, c: '#92400e' })); }
      const L = Math.hypot(S.tx, S.ty), ux = L ? S.tx / L : 1, uy = L ? S.ty / L : 0; const tip = [O[0] + S.tx * c, O[1] - S.ty * c];
      // line of action (element 2)
      if (p.el && L > .1) K.raw(ctx, () => { ctx.strokeStyle = 'rgba(37,99,235,.55)'; ctx.lineWidth = 1.6; ctx.setLineDash([7, 5]); ctx.beginPath(); ctx.moveTo(O[0] - ux * c * 7, O[1] + uy * c * 7); ctx.lineTo(O[0] + ux * c * 7, O[1] - uy * c * 7); ctx.stroke(); ctx.setLineDash([]); });
      // graduated OX line (like the book)
      if (p.axis && L > .1) { const n = Math.floor(L + 1e-6); K.raw(ctx, () => { ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.4; for (let k = 1; k <= n; k++) { const px = O[0] + ux * k * c, py = O[1] - uy * k * c; ctx.beginPath(); ctx.moveTo(px - uy * 7, py - ux * 7); ctx.lineTo(px + uy * 7, py + ux * 7); ctx.stroke(); } });
        for (let k = 1; k <= n; k++) C2.T(ctx, String(k), O[0] + ux * k * c + uy * 15 + (uy ? 0 : 0), O[1] - uy * k * c + (Math.abs(ux) > .5 ? 16 : 0) + ux * 0, { s: 11, w: 900, c: '#0f172a', mono: 1 }); }
      // ghost target after 2 wrong tries
      if (T && S.tries >= 2 && S.res !== 'ok') { const v = DIRS[T.d].v, Lt = T.F / T.sc; K.raw(ctx, () => { ctx.globalAlpha = .35; ctx.setLineDash([6, 5]); G.arrow(ctx, O[0], O[1], O[0] + v[0] * Lt * c, O[1] - v[1] * Lt * c, '#16a34a', 3, 12); ctx.setLineDash([]); ctx.globalAlpha = 1; }); C2.T(ctx, 'تلميح', O[0] + v[0] * Lt * c * .5 + v[1] * 18, O[1] - v[1] * Lt * c * .5 - (v[0] ? 16 : 0), { s: 11, w: 800, c: '#15803d' }); }
      // the force arrow
      const col = S.res === 'ok' ? '#16a34a' : '#dc2626';
      if (L > .05) K.raw(ctx, () => G.arrow(ctx, O[0], O[1], tip[0], tip[1], col, 5, 18));
      // body at O (small block)
      K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(O[0], O[1], 6, 0, TAU); ctx.fill(); });
      C2.T(ctx, 'O', O[0] - ux * 14 - (uy ? 12 : 0), O[1] + uy * 14 + (ux ? 14 : 0), { s: 14, w: 900, c: '#0f172a', mono: 1 });
      if (L > .3) C2.T(ctx, 'X', tip[0] + ux * 18, tip[1] - uy * 18, { s: 14, w: 900, c: '#0f172a', mono: 1 });
      // handle ring at the tip
      K.raw(ctx, () => { ctx.strokeStyle = 'rgba(22,163,74,.9)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(tip[0], tip[1], 13 + Math.sin(S.t * 4) * 1.5, 0, TAU); ctx.stroke(); });
      // the four elements
      if (p.el && L > .1) {
        const badge = (n, t, x, y, bg) => C2.T(ctx, n + ' ' + t, x, y, { s: 12, w: 900, c: '#fff', bg });
        const nx = -uy, ny = -ux; // perpendicular on screen (rotated)
        badge('①', 'نقطة التأثير', O[0] - ux * 58 + nx * 0, O[1] + uy * 34 + (Math.abs(ux) > .5 ? -26 : 0), '#0f172a');
        badge('②', 'خط الفعل', O[0] - ux * c * 5.2 + (uy ? 52 : 0), O[1] + uy * c * 5.2 - (ux ? 16 : 0), '#2563eb');
        const mx = (O[0] + tip[0]) / 2, my = (O[1] + tip[1]) / 2; badge('③', 'المقدار = ' + fmt(L, 3) + ' cm × ' + p.sc + ' = ' + fmt(L * p.sc, 3) + ' N', mx + (uy ? (ux >= 0 ? 1 : -1) * 0 + 95 * Math.sign(uy || 1) * 0 + 110 : 0), my + (Math.abs(ux) > .5 ? 30 : 0), '#7c3aed');
        badge('④', 'الاتجاه: ' + dirName(S.tx, S.ty), tip[0] + ux * 30 + (Math.abs(uy) > .5 ? 80 : 0), tip[1] - uy * 30 + (Math.abs(ux) > .5 ? -30 : 0), '#dc2626');
        void nx; void ny;
      }
      // task card
      const cw = Math.min(520, w - 100), cx = (g.L + g.Rr) / 2;
      C2.card(ctx, cx - cw / 2, 12, cw, 100, { bd: '#dc2626' });
      if (T) { C2.T(ctx, 'مثّل بالرسم: قوة مقدارها ' + T.F + ' N باتجاه ' + DIRS[T.d].n, cx, 34, { s: 16, w: 900, c: '#991b1b' });
        C2.T(ctx, 'مقياس الرسم ' + T.sc + ' N/cm  (كل 1 cm يمثّل ' + T.sc + ' N)  —  ' + T.src, cx, 60, { s: 12.5, w: 700, c: '#334155' }); }
      else { C2.T(ctx, 'رسم حر: اسحب رأس السهم لتمثيل أي قوة', cx, 34, { s: 16, w: 900, c: '#991b1b' }); C2.T(ctx, 'مقياس الرسم ' + p.sc + ' N/cm', cx, 60, { s: 12.5, w: 700, c: '#334155' }); }
      C2.T(ctx, 'طول السهم = ' + fmt(L, 3) + ' cm  ،  F = ' + fmt(L * p.sc, 3) + ' N', cx, 88, { s: 13.5, w: 900, c: '#0f172a' });
      const cb = D.chkBtn(S); C2.btn(ctx, cb.x, cb.y, cb.w, cb.h, '✔ تحقّق', { col: '#16a34a' });
      C2.T(ctx, '⭐ × ' + S.stars, cx + cw / 2 - 36, 88, { s: 14, w: 900, c: '#b45309' });
      C2.drawMsg(ctx, S, g.cx, gy + gh - 8);
      K.party(ctx, S);
    },
    chkBtn(S) { const w = S.W, g = D.geo(S), cw = Math.min(520, w - 100), cx = (g.L + g.Rr) / 2; return { x: cx - cw / 2 + 52, y: 86, w: 88, h: 30 }; },
    drags(S) { const g = D.geo(S), c = g.cell, cb = D.chkBtn(S);
      return [{ id: 'tip', x: g.cx + S.tx * c, y: g.cy - S.ty * c, r: 22, axis: 'xy', tip: 'اسحب رأس السهم لتحديد مقدار القوة واتجاهها', idle: 'اسحب رأس السهم ✋',
        drag: (S, d) => { const x = (d.ox + d.x - d.sx - g.cx) / c, y = -(d.oy + d.y - d.sy - g.cy) / c; S.tx = clamp(Math.round(x * 2) / 2, -6.5, 6.5); S.ty = clamp(Math.round(y * 2) / 2, -6.5, 6.5); if (S.res === 'ok') S.res = ''; S.nDrag++; } },
        { id: 'check', x: cb.x, y: cb.y, w: cb.w, h: cb.h, hint: false, tip: 'تحقّق من رسمك', click: S => D.check(S) }]; },
    readings(S) { const L = Math.hypot(S.tx, S.ty), T = TASKS[+S.p.task]; return [rd('طول السهم', fmt(L, 3) + ' cm'), rd('مقياس الرسم', S.p.sc + ' N/cm'), rd('مقدار القوة F', fmt(L * S.p.sc, 3) + ' N'), rd('الاتجاه', dirName(S.tx, S.ty)), rd('المطلوب', T ? T.F + ' N نحو ' + DIRS[T.d].n + ' ⇐ ' + (T.F / T.sc) + ' cm' : 'رسم حر', 1), rd('النجوم', '⭐ ' + S.stars + ' / 5')]; },
    explain(S) { const T = TASKS[+S.p.task]; if (!T) return 'كل <b>1 cm</b> من طول السهم يمثّل <b>' + S.p.sc + ' N</b>. طول السهم يمثل <b>المقدار</b>، ورأسه يمثل <b>الاتجاه</b>.'; return `لتمثيل <b>${T.F} N</b> بمقياس <b>${T.sc} N/cm</b>: الطول = ${T.F} ÷ ${T.sc} = <b>${T.F / T.sc} cm</b> باتجاه <b>${DIRS[T.d].n}</b>. ${S.res === 'ok' ? '✅ رسمك صحيح!' : ''}`; },
    quiz: [
      { q: 'عند تمثيل القوة بسهم، رأس السهم يمثّل:', o: ['نقطة تأثير القوة', 'اتجاه القوة', 'مقدار القوة'], a: 1, why: 'نقطة التأثير = بداية السهم، المقدار = طول السهم، الاتجاه = رأس السهم (ص 30).' },
      { q: 'نريد تمثيل قوة مقدارها 60 N باتجاه الغرب بمقياس رسم 10 N/cm. طول السهم:', o: ['60 cm', '6 cm', '10 cm'], a: 1, why: 'الطول = 60 ÷ 10 = 6 cm نحو الغرب (مراجعة الدرس س4).' },
      { q: 'إذا سحبتَ جسماً بحبل، فأين تقع نقطة تأثير القوة؟', o: ['في يدك', 'في نقطة ربط الحبل بالجسم', 'في منتصف الحبل'], a: 1, why: 'نقطة التأثير هي النقطة التي تؤثر فيها القوة في الجسم.' }
    ]
  };
  X7(D);
})();

/* =========================================================================================
   4) نشاط: ما الذي يجعل الأجسام تتحرك؟ + تأثير القوى في الحركة (ص 31–32)
   ========================================================================================= */
(() => {
  const SURF = { nylon: { n: 'كيس نايلون على طاولة ملساء', fs: 1.3, fk: 1.0 }, rough: { n: 'الكتاب مباشرة على سطح خشن', fs: 3.2, fk: 2.6 } };
  const MB = .8, FMAX = 5;
  const D = { id: 'g7_move', ch: 12, sec: 'الدرس 1', page: 31, kind: 'نشاط', title: 'نشاط: ما الذي يجعل الأجسام تتحرك؟ (القوة تنشئ الحركة وتوقفها وتغيّر اتجاهها)',
    desc: 'كتاب في كيس نايلون على طاولة ملساء: حرّكه بيدك، ثم اسحبه بالميزان النابضي بسرعة ثابتة واقرأ القوة. ثم أوقف سيارة بالفرامل، واضرب كرة المنضدة بالمضرب لتغيّر اتجاهها.',
    tags: 'قوة حركة ميزان نابضي احتكاك فرامل مضرب كرة المنضدة',
    tools: ['كتاب', 'كيس من النايلون', 'طاولة ملساء', 'ميزان نابضي'],
    steps: ['في مشهد «الكتاب»: اسحب الكتاب بيدك بعيداً عنك (دفع) ثم باتجاهك (سحب).', 'اضغط «🪄 حرّكه دون لمس»: هل يتحرك الكتاب دون أن تؤثر فيه بقوة؟', 'اسحب حلقة الميزان النابضي ببطء إلى اليمين: لاحظ أن الكتاب لا يتحرك حتى تصل القوة إلى مقدار معين.', 'استمر بالسحب بسرعة ثابتة واقرأ الميزان (≈ قوة الاحتكاك)، واضغط «تسجيل». لاحظ الرسم البياني للقراءة.', 'غيّر السطح إلى «بدون كيس (خشن)» وكرّر القياس: متى نحتاج قوة أكبر؟', 'مشهد «الفرامل»: اضغط «انطلق» ثم «الفرامل»: القوة توقف الحركة.', 'مشهد «المضرب»: اسحب المضرب واضرب الكرة: القوة تغيّر اتجاه الحركة.'],
    concl: ['القوة تنشئ الحركة: الكتاب الساكن لا يتحرك إلا إذا أثّرنا فيه بقوة (دفع أو سحب).', 'لا يمكن تحريك الكتاب دون أن نؤثر فيه بقوة بلمسه أو بأداة.', 'لتحريك الكتاب بسرعة ثابتة نؤثر بقوة تساوي تقريباً قوة الاحتكاك، ويقيسها الميزان النابضي؛ وكيس النايلون الأملس يقلل الاحتكاك.', 'القوة توقف الحركة (فرامل السيارة)، والقوة تغيّر اتجاه الحركة (مضرب كرة المنضدة).', 'الجسم المتحرك يستمر في حركته ما لم تؤثر فيه قوة توقفه.'],
    laws: [],
    fact: ['عند ركل كرة القدم الساكنة تكتسب سرعة فتتحرك: القوة تنشئ الحركة.', 'لزيادة سرعة الأرجوحة ندفعها باتجاه حركتها، ولإنقاص سرعتها ندفعها بعكس اتجاه حركتها.', 'تستطيع السيارة الدفع بقوة تقارب 5000 N.'],
    controls: [SEL('sc', 'المشهد', [['book', '📚 الكتاب'], ['car', '🚗 الفرامل'], ['bat', '🏓 المضرب']], 'book', (v, S) => D.reset(S)),
      SEL('surf', 'سطح الكتاب', [['nylon', 'كيس نايلون (أملس)'], ['rough', 'بدون كيس (خشن)']], 'nylon', (v, S) => { S.vk = 0; }),
      BT('', [{ t: 'إعادة المشهد', on: S => D.reset(S) }]),
      TG('arrows', 'أسهم القوى', true, null, 'force'), TG('fric', 'قوة الاحتكاك', true, null, 'force'), TG('vel', 'سهم السرعة', true, null, 'velocity'), TG('trail', 'مسار الكرة', true, null, 'dot')],
    setup(S) { S.hF = []; S.nDrag = 0; S.tryNo = 0; S.hits = 0; D.reset(S); },
    reset(S) { S.ku = .08; S.vk = 0; S.hu = .62; S.dragK = false; S.handF = 0; S.Fs = 0; S.hF = [];
      S.wx = 0; S.cv = 0; S.gas = 0; S.brake = 0; S.gasT = 0; S.brT = 0; S.stopped = 0;
      S.bat = { x: .8, y: .5 }; S.batX = .8; S.batY = .5; S.bvx = 0; S.bvy = 0; S.ball = null; S.trail = []; S.hitT = 0; S.serveT = .4; },
    /* ---------- book scene geometry ---------- */
    gb(S) { const w = S.W, h = S.H, x0 = Math.max(76, w * .09), x1 = w - 20, ty = h * .56; const bw = clamp(w * .17, 92, 140), bh = bw * .3, Lb = clamp(w * .17, 100, 140), Ls = 36;
      const kx0 = x0 + 12, kx1 = x1 - bw - Lb - Ls - 30; const bl = kx0 + (kx1 - kx0) * S.ku; const ringX = bl + bw + Ls + Lb + (x1 - (kx0 + (kx1 - kx0) + bw + Ls + Lb)) * 0 + S.hu * 0; 
      const r0 = bl + bw + Ls + Lb; const ringMax = x1 - 14; const rX = clamp(S.ringX ?? r0, bl + bw + 30, ringMax); void ringX;
      return { w, h, x0, x1, ty, bw, bh, Lb, Ls, kx0, kx1, bl, PX: (x1 - x0) / 1.4, rX, r0 }; },
    ext(S, g) { return g.rX - g.Lb - g.Ls - (g.bl + g.bw); },
    /* ---------- update ---------- */
    update(S, dt) {
      dt = Math.min(dt, .05); const sc = S.p.sc; if (S._msgT > 0) { }
      if (sc === 'book') {
        const n = 4; for (let k = 0; k < n; k++) { const h = dt / n, g = D.gb(S), sf = SURF[S.p.surf]; const e = D.ext(S, g); const F = e > 0 ? e * FMAX / 90 : 0; S.Fs = Math.min(F, FMAX * 1.2);
          if (S.dragK) break;
          if (S.vk <= 0) { S.vk = 0; if (F > sf.fs) S.vk = .02; } else { S.vk += (F - sf.fk) / MB * h; if (S.vk < 0) S.vk = 0; }
          const du = S.vk * g.PX * h / (g.kx1 - g.kx0); S.ku += du; { const g2 = D.gb(S), lim = g2.rX - g2.Lb - g2.Ls - 2; if (g2.bl + g2.bw > lim) { S.ku = Math.max(0, S.ku - (g2.bl + g2.bw - lim) / (g2.kx1 - g2.kx0)); S.vk = 0; } } if (S.ku > 1) { S.ku = 1; S.vk = 0; C2.msg(S, 'وصل الكتاب إلى حافة الطاولة — اضغط «إعادة المشهد»'); } }
        hist(S, 'hF', S.Fs, 300);
      } else if (sc === 'car') {
        if (S.gasT > 0) S.gasT -= dt; if (S.brT > 0) S.brT -= dt;
        const gas = S.gas || S.gasT > 0, br = S.brake || S.brT > 0; const Fe = gas ? 3000 : 0, Fb = br && S.cv > 0 ? 6000 : 0, Fr = S.cv > 0 ? 250 : 0;
        S.Fe = Fe; S.Fb = Fb; S.Fr = Fr; const was = S.cv; S.cv = Math.max(0, Math.min(25, S.cv + (Fe - Fb - Fr) / 1000 * dt)); S.wx += S.cv * dt;
        if (was > 0 && S.cv === 0 && br) { S.stopped++; C2.msg(S, 'توقفت السيارة! قوة الفرامل أوقفت الحركة 🛑', 3); }
        hist(S, 'hF', S.cv * 3.6, 300);
      } else {
        const w = S.W, h = S.H, ty = h * .66; S.hitT = Math.max(0, S.hitT - dt);
        if (!S.ball) { S.serveT -= dt; if (S.serveT <= 0) { S.ball = { x: Math.max(76, w * .09) + 30, y: h * .38, vx: 300 + Math.random() * 60, vy: -120 }; S.trail = []; } }
        else { const b = S.ball; b.vy += 700 * dt; b.x += b.vx * dt; b.y += b.vy * dt;
          const tx0 = Math.max(76, w * .09) + 10, tx1 = w * .78; if (b.y > ty - 7 && b.vy > 0 && b.x > tx0 && b.x < tx1) { b.y = ty - 7; b.vy *= -.86; }
          const bx = S.batX * w, byy = S.batY * h, dd = Math.hypot(b.x - bx, b.y - byy);
          if (dd < 36 && S.hitT < .15) { const nx = (b.x - bx) / dd, ny = (b.y - byy) / dd; const rvx = b.vx - S.bvx, rvy = b.vy - S.bvy, vn = rvx * nx + rvy * ny; if (vn < 0) { b.vx -= 1.9 * vn * nx; b.vy -= 1.9 * vn * ny; b.vx += S.bvx * .5; b.vy += S.bvy * .5; const sp = Math.hypot(b.vx, b.vy); if (sp > 900) { b.vx *= 900 / sp; b.vy *= 900 / sp; } S.hitT = .6; S.hitN = [nx, ny]; S.hitP = [b.x, b.y]; S.hits++; if (window.Sound && Sound.click) Sound.click(); } }
          S.trail.push([b.x, b.y]); if (S.trail.length > 70) S.trail.shift();
          if (b.x < -20 || b.x > w + 20 || b.y > h + 20) { S.ball = null; S.serveT = 1; } }
        S.bvx *= .85; S.bvy *= .85;
      }
    },
    /* ---------- drawing ---------- */
    draw(ctx, w, h, S) { const sc = S.p.sc; if (sc === 'car') D.drawCar(ctx, w, h, S); else if (sc === 'bat') D.drawBat(ctx, w, h, S); else D.drawBook(ctx, w, h, S); K.party(ctx, S); },
    hSpring(ctx, rX, y, Lb, ext, F) {
      const x0 = rX - Lb, e = Math.max(0, ext);
      K.raw(ctx, () => {
        ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0 + 4, y); ctx.lineTo(x0 - e - 4, y); ctx.stroke();
        ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x0 - e - 10, y + 5, 6, -Math.PI * .1, Math.PI * 1.2); ctx.stroke();
        ctx.fillStyle = '#f59e0b'; rr(ctx, x0, y - 14, Lb - 16, 28, 8); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.5; ctx.stroke();
        const wx0 = x0 + 10, wx1 = x0 + Lb - 30; ctx.fillStyle = '#fff'; rr(ctx, wx0, y - 8, wx1 - wx0, 16, 4); ctx.fill();
        ctx.fillStyle = '#1e293b'; ctx.font = '700 8px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr';
        for (let k = 0; k <= FMAX; k++) { const xx = wx1 - 6 - (wx1 - wx0 - 12) * k / FMAX; ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(xx, y + 8); ctx.lineTo(xx, y + 2); ctx.stroke(); ctx.fillText(String(k), xx, y - 3); }
        const px = wx1 - 6 - (wx1 - wx0 - 12) * clamp(F / FMAX, 0, 1.05); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.2; ctx.beginPath(); for (let k = 0; k <= 12; k++) { const xx = px + (wx1 - px) * k / 12; ctx.lineTo(xx, y + (k % 2 ? 4 : -4) + 1); } ctx.stroke();
        ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(px, y + 8); ctx.lineTo(px - 4, y + 13); ctx.lineTo(px + 4, y + 13); ctx.closePath(); ctx.fill(); ctx.fillRect(px - 1, y - 6, 2, 14);
        ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(rX - 6, y, 8, 0, TAU); ctx.stroke();
        ctx.fillStyle = '#0f172a'; rr(ctx, x0 + Lb / 2 - 46, y - 46, 76, 24, 6); ctx.fill(); ctx.fillStyle = '#a3e635'; ctx.font = '800 14px ui-monospace,monospace'; ctx.fillText(fmt(F, 2) + ' N', x0 + Lb / 2 - 8, y - 34); ctx.textBaseline = 'alphabetic';
      });
    },
    drawBook(ctx, w, h, S) {
      const p = S.p, g = D.gb(S), sf = SURF[p.surf]; K.bg(ctx, w, h, { benchY: h * .82 });
      // table
      K.raw(ctx, () => { const tg = ctx.createLinearGradient(0, g.ty, 0, g.ty + 22); tg.addColorStop(0, p.surf === 'nylon' ? '#f1f5f9' : '#d6a574'); tg.addColorStop(1, p.surf === 'nylon' ? '#cbd5e1' : '#a16207'); ctx.fillStyle = tg; rr(ctx, g.x0 - 6, g.ty, g.x1 - g.x0 + 12, 20, 5); ctx.fill(); ctx.fillStyle = '#64748b'; ctx.fillRect(g.x0 + 20, g.ty + 20, 12, h * .82 - g.ty - 20); ctx.fillRect(g.x1 - 32, g.ty + 20, 12, h * .82 - g.ty - 20);
        if (p.surf === 'rough') { ctx.fillStyle = 'rgba(120,53,15,.35)'; for (let x = g.x0; x < g.x1; x += 9) ctx.fillRect(x, g.ty + 1 + (x * 7 % 3), 3, 2); } else { ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(g.x0, g.ty + 2, g.x1 - g.x0, 2); } });
      C2.T(ctx, p.surf === 'nylon' ? 'طاولة ملساء' : 'سطح خشن', g.x0 + 70, g.ty + 62, { s: 11.5, w: 800, c: '#fff', bg: 'rgba(51,65,85,.75)' });
      // book in nylon bag
      const bx = g.bl, by = g.ty, bw = g.bw, bh = g.bh;
      K.raw(ctx, () => { ctx.fillStyle = '#1d4ed8'; rr(ctx, bx, by - bh, bw, bh, 4); ctx.fill(); ctx.fillStyle = '#fef3c7'; ctx.fillRect(bx + 5, by - bh + 5, bw - 8, bh - 10); ctx.strokeStyle = 'rgba(146,64,14,.35)'; ctx.lineWidth = 1; for (let k = 1; k < 5; k++) { ctx.beginPath(); ctx.moveTo(bx + 5, by - bh + 5 + k * (bh - 10) / 5); ctx.lineTo(bx + bw - 3, by - bh + 5 + k * (bh - 10) / 5); ctx.stroke(); } ctx.fillStyle = '#1e40af'; ctx.fillRect(bx, by - bh, 6, bh);
        if (p.surf === 'nylon') { ctx.fillStyle = 'rgba(224,242,254,.45)'; ctx.strokeStyle = 'rgba(14,116,144,.55)'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(bx - 6, by); ctx.lineTo(bx - 8, by - bh - 8); ctx.quadraticCurveTo(bx + bw * .5, by - bh - 16, bx + bw + 10, by - bh - 6); ctx.lineTo(bx + bw + 6, by); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.beginPath(); ctx.moveTo(bx + 8, by - bh - 6); ctx.quadraticCurveTo(bx + 20, by - bh * .5, bx + 12, by - 4); ctx.moveTo(bx + bw * .6, by - bh - 10); ctx.quadraticCurveTo(bx + bw * .7, by - bh * .5, bx + bw * .62, by - 3); ctx.stroke(); } });
      C2.T(ctx, p.surf === 'nylon' ? 'كتاب في كيس نايلون' : 'كتاب', bx + bw / 2, g.ty + 34, { s: 12, w: 900, c: '#1e3a8a' });
      // string + spring balance
      const e = D.ext(S, g), hookX = g.rX - g.Lb - Math.max(0, e); const sy = by - bh * .5;
      K.raw(ctx, () => { ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx + bw + (p.surf === 'nylon' ? 6 : 0), sy); if (e >= 0) ctx.lineTo(hookX - 10, sy + 4); else ctx.quadraticCurveTo((bx + bw + hookX) / 2, sy + 22 - e * .3, hookX - 10, sy + 4); ctx.stroke(); });
      D.hSpring(ctx, g.rX, sy, g.Lb, e, S.Fs);
      C2.hand(ctx, g.rX + 30, sy, -1, .9, { sleeve: '#16a34a' });
      C2.T(ctx, 'ميزان نابضي', g.rX - g.Lb / 2, sy + 30, { s: 11.5, w: 800, c: '#92400e' });
      // hand pushing / pulling the book directly
      if (S.dragK) { const dir = S.handF >= 0 ? 1 : -1; C2.hand(ctx, dir > 0 ? bx - 4 : bx + bw + 4, by - bh * .5, dir, .9); C2.T(ctx, dir > 0 ? '✋ أحرّكه بعيداً عني (دفع)' : '✋ أحرّكه باتجاهي (سحب)', bx + bw / 2, by - bh - 50, { s: 13, w: 900, c: '#fff', bg: '#ea580c' }); }
      // forces
      const F = S.dragK ? Math.abs(S.handF) : S.Fs, moving = S.vk > 0 || (S.dragK && Math.abs(S.handF) > .05), fr = moving ? sf.fk : Math.min(F, sf.fs), ps = 26;
      if (p.arrows && !S.dragK && S.Fs > .02) C2.force(ctx, bx + bw + 8, by - bh - 8, S.Fs * ps, 0, 'قوة السحب ' + fmt(S.Fs, 2) + ' N', '#ea580c', 4);
      if (p.arrows && S.dragK && Math.abs(S.handF) > .05) { const dir = Math.sign(S.handF); C2.force(ctx, bx + bw / 2, by - bh - 8, dir * clamp(Math.abs(S.handF) * ps, 20, 110), 0, 'قوة اليد', '#ea580c', 4); }
      if (p.fric && fr > .02) { const dir = S.dragK ? -Math.sign(S.handF || 1) : -1; C2.force(ctx, bx + bw / 2, by + 5, dir * fr * ps, 0, 'الاحتكاك ' + fmt(fr, 2) + ' N', '#64748b', 3.5); }
      if (p.vel && S.vk > .005) { K.raw(ctx, () => G.arrow(ctx, bx, by - bh - 40, bx + clamp(S.vk * 160, 10, 90), by - bh - 40, '#16a34a', 3, 9)); C2.T(ctx, 'v = ' + fmt(S.vk * 100, 2) + ' cm/s', bx + 40, by - bh - 54, { s: 11.5, w: 900, c: '#15803d' }); }
      // status card
      const st = S.dragK ? 'يدك تؤثر في الكتاب بقوة تماس' : S.vk > 0 ? (Math.abs(S.Fs - sf.fk) < .25 ? 'سرعة ثابتة تقريباً: قراءة الميزان ≈ الاحتكاك ✔' : S.Fs > sf.fk ? 'القوة أكبر من الاحتكاك: تزداد السرعة' : 'القوة أقل من الاحتكاك: تقل السرعة') : S.Fs > .05 ? 'الكتاب ساكن: القوة لم تتغلب على الاحتكاك بعد' : 'الكتاب ساكن — لا توجد قوة تحرّكه';
      C2.lines(ctx, [{ t: st, c: '#0f172a', w: 800 }, { t: 'الاحتكاك الحركي هنا ≈ ' + sf.fk + ' N', c: '#475569' }], w - 20, 16, Math.min(360, w * .5), { title: sf.n, bd: '#ea580c' });
      // "without touching" button
      const nb = D.noTouchBtn(S); C2.btn(ctx, nb.x, nb.y, nb.w, nb.h, '🪄 حرّكه دون لمس', { col: '#7c3aed' });
      C2.drawMsg(ctx, S, bx + bw / 2, by - bh - 62);
    },
    noTouchBtn(S) { const x0 = Math.max(76, S.W * .09); return { x: x0 + 80, y: 40, w: 160, h: 38 }; },
    /* ---------- car ---------- */
    gc(S) { const w = S.W, h = S.H, x0 = Math.max(76, w * .09); return { w, h, x0, road: h * .7, cx: w * .5, s: clamp(w / 820, .75, 1.15) * 1.05, gas: { x: x0 + 70, y: h * .86, w: 130, h: 46 }, br: { x: x0 + 220, y: h * .86, w: 130, h: 46 } }; },
    drawCar(ctx, w, h, S) {
      const p = S.p, g = D.gc(S); K.bg(ctx, w, h, { benchY: g.road + 40, tiles: false, top: '#bae6fd', bottom: '#e0f2fe', bench: false });
      K.raw(ctx, () => { ctx.fillStyle = '#86efac'; ctx.fillRect(0, g.road - 60, w, 60); ctx.fillStyle = '#475569'; ctx.fillRect(0, g.road, w, h - g.road); ctx.fillStyle = '#fef08a'; const off = (S.wx * 30) % 80; for (let x = -off; x < w; x += 80) ctx.fillRect(x, g.road + 34, 44, 6);
        const toff = (S.wx * 30) % 260; for (let x = -toff; x < w + 60; x += 260) { ctx.fillStyle = '#92400e'; ctx.fillRect(x + 20, g.road - 70, 10, 40); ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.arc(x + 25, g.road - 82, 26, 0, TAU); ctx.fill(); ctx.fillStyle = '#e2e8f0'; ctx.fillRect(x + 140, g.road - 50, 4, 50); ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(x + 142, g.road - 56, 9, 0, TAU); ctx.fill(); } });
      const br = (S.brake || S.brT > 0) && S.cv > 0, gas = S.gas || S.gasT > 0;
      C2.car(ctx, g.cx, g.road + 18, g.s, '#e11d48', { brake: S.brake || S.brT > 0, rot: S.wx / .3 });
      if (br) K.raw(ctx, () => { ctx.strokeStyle = 'rgba(15,23,42,.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.cx - 58 * g.s - 60, g.road + 18); ctx.lineTo(g.cx - 58 * g.s, g.road + 18); ctx.moveTo(g.cx + 62 * g.s - 60, g.road + 18); ctx.lineTo(g.cx + 62 * g.s, g.road + 18); ctx.stroke(); });
      const ay = g.road - 100 * g.s;
      if (p.arrows) { if (S.Fe) C2.force(ctx, g.cx, ay, 3000 * .03, 0, 'قوة المحرك 3000 N', '#16a34a', 5); if (S.Fb) C2.force(ctx, g.cx - 10, ay - 38, -6000 * .03, 0, 'قوة الفرامل 6000 N', '#dc2626', 5); }
      if (p.fric && S.Fr) C2.force(ctx, g.cx + 40, g.road + 58, -S.Fr * .16, 0, 'مقاومة الهواء والطريق', '#64748b', 3);
      if (p.vel && S.cv > .1) { K.raw(ctx, () => G.arrow(ctx, g.cx + 100 * g.s, g.road - 30 * g.s, g.cx + 100 * g.s + S.cv * 4, g.road - 30 * g.s, '#0ea5e9', 4, 12)); C2.T(ctx, 'v', g.cx + 100 * g.s + S.cv * 4 + 12, g.road - 30 * g.s, { s: 14, w: 900, c: '#0369a1', mono: 1 }); }
      C2.dial(ctx, w - 80, 70, 46, Math.round(S.cv * 3.6), 100, 'عداد السرعة', 'km/h');
      C2.btn(ctx, g.gas.x, g.gas.y, g.gas.w, g.gas.h, gas ? '⏩ ينطلق…' : '⏩ انطلق', { col: '#16a34a', on: gas });
      C2.btn(ctx, g.br.x, g.br.y, g.br.w, g.br.h, '🛑 الفرامل', { col: '#dc2626', on: S.brake || S.brT > 0 });
      C2.lines(ctx, [S.cv < .05 ? 'السيارة ساكنة — تحتاج قوة لتتحرك' : br ? 'قوة الفرامل تعاكس الحركة فتقل السرعة' : gas ? 'قوة المحرك تنشئ الحركة وتزيد السرعة' : 'دون قوة دافعة تقل السرعة ببطء'].map(t => ({ t, w: 800 })), Math.min(w - 150, w * .72), 16, Math.min(330, w * .5), { title: 'القوة توقف الحركة', bd: '#dc2626' });
      C2.drawMsg(ctx, S, g.cx, g.road - 110 * g.s);
    },
    /* ---------- bat ---------- */
    drawBat(ctx, w, h, S) {
      const p = S.p, ty = h * .66, x0 = Math.max(76, w * .09) + 10, x1 = w * .78; K.bg(ctx, w, h, { benchY: h * .86 });
      K.raw(ctx, () => { ctx.fillStyle = '#15803d'; ctx.fillRect(x0, ty, x1 - x0, 12); ctx.fillStyle = '#fff'; ctx.fillRect(x0, ty, x1 - x0, 2); ctx.fillRect((x0 + x1) / 2 - 1, ty, 2, 12); ctx.fillStyle = '#334155'; ctx.fillRect(x0 + 20, ty + 12, 8, h * .86 - ty - 12); ctx.fillRect(x1 - 28, ty + 12, 8, h * .86 - ty - 12);
        ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fillRect((x0 + x1) / 2 - 2, ty - 26, 4, 26); ctx.strokeStyle = '#475569'; ctx.lineWidth = 1; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.moveTo((x0 + x1) / 2 - 2, ty - 26 + k * 6); ctx.lineTo((x0 + x1) / 2 + 2, ty - 26 + k * 6); ctx.stroke(); } });
      if (p.trail && S.trail.length > 1) K.raw(ctx, () => { ctx.strokeStyle = 'rgba(249,115,22,.45)'; ctx.lineWidth = 2; ctx.setLineDash([4, 4]); ctx.beginPath(); S.trail.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); ctx.setLineDash([]); });
      const bx = S.batX * w, byy = S.batY * h;
      K.raw(ctx, () => { ctx.save(); ctx.translate(bx, byy); ctx.fillStyle = '#92400e'; rr(ctx, 26, -6, 44, 12, 5); ctx.fill(); ctx.fillStyle = '#b91c1c'; ctx.beginPath(); ctx.ellipse(0, 0, 30, 34, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.beginPath(); ctx.ellipse(-8, -10, 10, 14, -.4, 0, TAU); ctx.fill(); ctx.restore(); });
      C2.T(ctx, 'المضرب', bx + 10, byy + 50, { s: 12, w: 900, c: '#7f1d1d' });
      if (S.ball) { const b = S.ball; K.ball(ctx, b.x, b.y, 8, '#fb923c'); if (p.vel) { const sp = Math.hypot(b.vx, b.vy); if (sp > 20) K.raw(ctx, () => G.arrow(ctx, b.x, b.y, b.x + b.vx * .12, b.y + b.vy * .12, '#0ea5e9', 3, 9)); } }
      if (S.hitT > 0 && S.hitN && p.arrows) { const [nx, ny] = S.hitN, [hx, hy] = S.hitP; C2.force(ctx, hx, hy, nx * 90, ny * 90, 'قوة المضرب', '#ea580c', 5); }
      C2.lines(ctx, [{ t: 'اسحب المضرب واضرب الكرة البرتقالية', w: 800 }, { t: 'عدد الضربات: ' + S.hits, c: '#b45309', w: 900 }], w - 20, 16, Math.min(300, w * .45), { title: 'القوة تغيّر اتجاه الحركة', bd: '#ea580c' });
      if (S.hitT > .3) K.bubble(ctx, C2.iso('تغيّر اتجاه الكرة بتأثير القوة! 🏓'), S.hitP[0], S.hitP[1] - 20, { s: 13, side: 'l' });
    },
    drags(S) {
      const sc = S.p.sc;
      if (sc === 'book') { const g = D.gb(S), nb = D.noTouchBtn(S);
        return [
          { id: 'ring', x: g.rX - 6, y: g.ty - g.bh * .5, r: 22, axis: 'x', tip: 'اسحب حلقة الميزان النابضي لتسحب الكتاب', idle: 'اسحب الميزان ببطء ✋',
            drag: (S, d) => { S.ringX = clamp(d.ox + 6 + d.x - d.sx, g.bl + g.bw + 30, g.x1 - 14); S.nDrag++; } },
          { id: 'book', x: g.bl + g.bw / 2, y: g.ty - g.bh / 2, w: g.bw + 12, h: g.bh + 20, axis: 'x', tip: 'حرّك الكتاب بيدك بعيداً عنك أو باتجاهك', idle: 'حرّك الكتاب بيدك ✋',
            down: S => { S.dragK = true; S.vk = 0; S._lt = C2.now(); }, drag: (S, d) => { const nt = C2.now(), ddt = Math.max(1 / 120, nt - S._lt); S._lt = nt; const u0 = S.ku; S.ku = clamp(S.ku + d.dx / (g.kx1 - g.kx0), 0, 1); const v = (S.ku - u0) * (g.kx1 - g.kx0) / g.PX / ddt; S.handF = S.handF * .6 + (v === 0 ? 0 : Math.sign(v) * (SURF[S.p.surf].fk + Math.abs(v) * 2)) * .4; S.ringX = null; S.nDrag++; },
            up: S => { S.dragK = false; S.handF = 0; } },
          { id: 'notouch', x: nb.x, y: nb.y, w: nb.w, h: nb.h, hint: false, tip: 'هل يتحرك الكتاب دون أن نلمسه؟', click: S => { S.tryNo++; C2.msg(S, 'لم يتحرك! 🤔 لا يتحرك الكتاب دون أن\nنؤثر فيه بقوة (بلمسه أو بأداة)', 3.2); } }];
      }
      if (sc === 'car') { const g = D.gc(S);
        return [{ id: 'gas', x: g.gas.x, y: g.gas.y, w: g.gas.w, h: g.gas.h, tip: 'اضغط مطولاً لتشغيل المحرك', idle: 'اضغط «انطلق» ✋', down: S => { S.gas = 1; }, up: S => { S.gas = 0; }, click: S => { S.gasT = 2.5; } },
          { id: 'brake', x: g.br.x, y: g.br.y, w: g.br.w, h: g.br.h, tip: 'اضغط الفرامل لإيقاف السيارة', hint: false, down: S => { S.brake = 1; }, up: S => { S.brake = 0; }, click: S => { S.brT = 3; S.gasT = 0; } }];
      }
      return [{ id: 'bat', x: S.batX * S.W, y: S.batY * S.H, r: 36, axis: 'xy', tip: 'اسحب المضرب لتضرب الكرة', idle: 'اسحب المضرب واضرب الكرة ✋',
        down: S => { S._lt = C2.now(); }, drag: (S, d) => { const nt = C2.now(), ddt = Math.max(1 / 120, nt - S._lt); S._lt = nt; const nx = clamp((d.ox + d.x - d.sx) / S.W, .35, .95), ny = clamp((d.oy + d.y - d.sy) / S.H, .15, .8); S.bvx = clamp((nx - S.batX) * S.W / ddt, -700, 700); S.bvy = clamp((ny - S.batY) * S.H / ddt, -700, 700); S.batX = nx; S.batY = ny; } }];
    },
    readings(S) { const sc = S.p.sc;
      if (sc === 'book') { const sf = SURF[S.p.surf]; return [rd('قراءة الميزان النابضي', fmt(S.Fs, 3) + ' N'), rd('سرعة الكتاب', fmt(S.vk * 100, 3) + ' cm/s'), rd('الاحتكاك الحركي', sf.fk + ' N'), rd('الحالة', S.vk > 0 ? 'يتحرك' : 'ساكن', 1)]; }
      if (sc === 'car') return [rd('سرعة السيارة', fmt(S.cv * 3.6, 3) + ' km/h'), rd('قوة المحرك', (S.Fe || 0) + ' N'), rd('قوة الفرامل', (S.Fb || 0) + ' N'), rd('الحالة', S.cv < .05 ? 'ساكنة' : 'تتحرك', 1)];
      return [rd('عدد الضربات', S.hits), rd('سرعة الكرة', S.ball ? fmt(Math.hypot(S.ball.vx, S.ball.vy) / 200, 3) + ' m/s' : '—')]; },
    record(S) { if (S.p.sc !== 'book') { Runner.toast('التسجيل في مشهد «الكتاب»', 'info'); return null; } if (S.vk <= 0) { Runner.toast('اسحب الكتاب بالميزان حتى يتحرك بسرعة ثابتة ثم سجّل', 'info'); return null; } return { surf: S.p.surf === 'nylon' ? 'كيس نايلون (أملس)' : 'بدون كيس (خشن)', F: +S.Fs.toFixed(2), v: +(S.vk * 100).toFixed(1) }; },
    cols: [['surf', 'السطح'], ['F', 'قراءة الميزان (N)'], ['v', 'السرعة (cm/s)']],
    live: { title: 'قراءة الميزان (الكتاب) / السرعة km/h (السيارة) مع الزمن', data: S => ({ series: [{ pts: S.hF || [], color: S.p.sc === 'car' ? '#0ea5e9' : '#f59e0b', name: S.p.sc === 'car' ? 'v (km/h)' : 'F (N)' }], opts: { xl: 't (s)', ymin: 0, ymax: S.p.sc === 'car' ? 100 : 5 } }) },
    explain(S) { const sc = S.p.sc; if (sc === 'car') return S.brake || S.brT > 0 ? '<b>القوة توقف الحركة</b>: قوة الفرامل تعاكس اتجاه حركة السيارة فتتباطأ ثم تقف.' : S.gas || S.gasT > 0 ? '<b>القوة تنشئ الحركة</b>: قوة المحرك تحرّك السيارة الساكنة وتزيد سرعتها.' : 'اضغط «انطلق» لتؤثر بقوة في السيارة، ثم «الفرامل» لتوقفها.';
      if (sc === 'bat') return '<b>القوة تغيّر اتجاه الحركة</b>: عندما يضرب المضرب الكرة يؤثر فيها بقوة فتغيّر اتجاهها (وسرعتها).';
      const sf = SURF[S.p.surf]; if (S.dragK) return 'تؤثر يدك في الكتاب بقوة فتحرّكه: <b>القوة تنشئ الحركة</b>.'; if (S.vk > 0) return `الكتاب يتحرك. لتحريكه <b>بسرعة ثابتة</b> تكون قراءة الميزان ≈ <b>${sf.fk} N</b> (قوة الاحتكاك).`; return S.Fs > .05 ? `الميزان يقرأ ${fmt(S.Fs, 2)} N لكن الكتاب لم يتحرك بعد: الاحتكاك يقاوم. زِد القوة قليلاً.` : 'الكتاب <b>ساكن</b>: لا يتحرك إلا إذا أثّرنا فيه بقوة.'; },
    quiz: [
      { q: 'القوة المطبقة على جسم يمكن أن تغيّر من:', o: ['كتلة الجسم', 'سرعة الجسم', 'لون الجسم'], a: 1, why: 'القوة تنشئ الحركة وتوقفها وتغيّر مقدار السرعة واتجاهها (مراجعة الفصل ص 40).' },
      { q: 'عند الضغط على فرامل سيارة متحركة فإن القوة:', o: ['تنشئ الحركة', 'توقف الحركة', 'تزيد السرعة'], a: 1, why: 'قوة الفرامل تعاكس اتجاه الحركة فتبطئ السيارة ثم توقفها (ص 32).' },
      { q: 'كيف يمكنك زيادة سرعة أرجوحة يجلس فيها شخص؟', o: ['بدفعها باتجاه حركتها', 'بدفعها بعكس اتجاه حركتها', 'بتركها دون أي قوة'], a: 0, why: 'القوة باتجاه الحركة تزيد السرعة، وبعكسها تنقصها (سؤال ص 32).' }
    ]
  };
  X7(D);
})();

/* =========================================================================================
   5) قوى التماس وقوى المجال (ص 33–34)
   ========================================================================================= */
(() => {
  const CARDS = [['🧲 مغناطيس يجذب الحديد', 'f'], ['🐴 حصان يسحب عربة', 'c'], ['🍎 تفاحة تسقط من الشجرة', 'f'], ['⚽ ركل كرة القدم', 'c'], ['🌍 الأرض تجذب القمر', 'f'], ['🛒 دفع عربة محملة بالأثقال', 'c'], ['✨ مشط مشحون يجذب قصاصات الورق', 'f'], ['✊ كبس كرة مطاطية باليد', 'c']];
  const D = { id: 'g7_contact_field', ch: 12, sec: 'الدرس 2', page: 33, kind: 'نشاط', title: 'قوى التماس وقوى المجال (قوى التأثير عن بُعد)',
    desc: 'أسقط كرة التنس من ارتفاعات مختلفة ولاحظ ارتدادها، وحرّك مغناطيسين ليتجاذبا أو يتنافرا، وافرك بالوناً بالصوف ليجذب قصاصات الورق، ثم صنّف القوى.',
    tags: 'قوى التماس قوى المجال جاذبية مغناطيس كهربائية بالون كرة التنس',
    tools: ['كرة تنس', 'مغناطيسان', 'بالون وقطعة صوف', 'قصاصات ورق'],
    steps: ['مشهد «الكرة»: اسحب كرة التنس إلى الأعلى ثم اتركها، ولاحظ ارتدادها بعد ارتطامها بالأرض.', 'كرّر من ارتفاعات مختلفة واضغط «تسجيل» بعد كل ارتداد: ما الذي يجعل الكرة تغيّر اتجاهها وسرعتها؟', 'لاحظ الأسهم: الجاذبية (قوة مجال) تؤثر دائماً، وقوة الأرض (قوة تماس) تؤثر فقط لحظة التلامس.', 'مشهد «المغناطيس»: اسحب المغناطيس نحو المغناطيس الموضوع على العربة، وانقر أي مغناطيس لقلب قطبيه: تجاذب أم تنافر؟', 'مشهد «البالون»: افرك البالون بقطعة الصوف (اسحبه ذهاباً وإياباً فوقها) ثم قرّبه من قصاصات الورق.', 'مشهد «صنّف»: اسحب كل بطاقة إلى صندوق «قوى التماس» أو «قوى المجال».'],
    concl: ['تصنّف القوى بحسب تأثيرها في الأجسام: قوى تماس (بتماس مباشر) وقوى مجال (تؤثر عن بُعد دون تماس).', 'قوى التماس: شد نابض باليد، دفع عربة محملة بالأثقال، كبس كرة مطاطية، ارتطام الكرة بالأرض.', 'قوى المجال: قوة الجاذبية، القوة المغناطيسية (تجاذب وتنافر الأقطاب وجذب المسامير)، القوة الكهربائية (تجاذب وتنافر الشحنات).', 'الأقطاب المغناطيسية المتشابهة تتنافر والمختلفة تتجاذب.'],
    laws: [],
    fact: ['هناك أربع قوى أساسية في الطبيعة: قوة الجاذبية الرابطة للنظام الشمسي، القوة الكهرومغناطيسية الرابطة للذرات، القوة النووية الضعيفة في الانحلال الإشعاعي، والقوة النووية القوية.', 'تحافظ الجاذبية الأرضية على وجود الغلاف الجوي المحيط بالأرض، وهو ما يبقي الكائنات الحية تعيش وتنمو.', 'المشط البلاستيكي بعد تمشيط الشعر الجاف يجذب قصاصات الورق — قوة كهربائية تؤثر عن بُعد!'],
    controls: [SEL('sc', 'المشهد', [['ball', '🎾 الكرة'], ['mag', '🧲 المغناطيس'], ['bal', '🎈 البالون'], ['sort', '🗂️ صنّف']], 'ball', (v, S) => D.reset(S)),
      BT('', [{ t: 'إعادة المشهد', on: S => D.reset(S) }]),
      TG('arrows', 'أسهم القوى', true, null, 'force'), TG('field', 'خطوط المجال المغناطيسي', true, null, 'bfield'), TG('charges', 'الشحنات الكهربائية', true, null, 'charges'), TG('trail', 'صور الكرة المتتالية', true, null, 'dot')],
    setup(S) { S.nDrag = 0; S.placed = 0; D.reset(S); },
    reset(S) { S.bh = 1.2; S.bvy = 0; S.hold = true; S.cT = 0; S.dropH = 0; S.apex = 0; S.bounces = 0; S.trail = []; S._tr = 0;
      S.mL = .3; S.mR = .68; S.vR = 0; S.flipL = false; S.flipR = false;
      S.balX = .55; S.balY = .3; S.q = 0; S.bits = null;
      S.cards = CARDS.map((c, i) => ({ i, place: '' })); S.drg = -1; S.gx = 0; S.gy = 0; S.placed = 0; S.wrong = 0; },
    /* ---------- ball ---------- */
    gB(S) { const w = S.W, h = S.H, fy = h * .84, x = w * .56, pxm = (fy - 120) / 2.1, r = clamp(w * .03, 16, 24); return { w, h, fy, x, pxm, r }; },
    /* ---------- magnets ---------- */
    gM(S) { const w = S.W, h = S.H, ty = h * .62, x0 = Math.max(76, w * .09), x1 = w - 20, L = clamp(w * .17, 100, 150), H = 34; const xl = x0 + L / 2 + (x1 - x0 - L) * S.mL, xr = x0 + L / 2 + (x1 - x0 - L) * S.mR; return { w, h, ty, x0, x1, L, H, xl, xr, y: ty - 44 }; },
    poles(S, g) { // [x, y, q] q=+1 N, -1 S
      const lN = S.flipL ? -1 : 1, rN = S.flipR ? -1 : 1; return [[g.xl + g.L / 2 - 8, g.y, lN], [g.xl - g.L / 2 + 8, g.y, -lN], [g.xr + g.L / 2 - 8, g.y, rN], [g.xr - g.L / 2 + 8, g.y, -rN]]; },
    B(P, x, y) { let bx = 0, by = 0; for (const [px, py, q] of P) { const dx = x - px, dy = y - py, r2 = dx * dx + dy * dy + 30, r = Math.sqrt(r2); bx += q * dx / (r2 * r); by += q * dy / (r2 * r); } return [bx, by]; },
    magF(S, g) { const facingL = S.flipL ? -1 : 1, facingR = S.flipR ? 1 : -1; const gap = Math.max(2, (g.xr - g.L / 2) - (g.xl + g.L / 2)); const att = facingL !== facingR; const F = 1500 / (gap / 50 + .7) ** 2; return { att, F: att ? -F : F, gap }; },
    /* ---------- balloon ---------- */
    gL(S) { const w = S.W, h = S.H, x0 = Math.max(76, w * .09), ty = h * .8; return { w, h, x0, ty, wool: { x: x0 + 10, y: 150, w: Math.min(190, w * .26), h: 120 }, bx: S.balX * w, by: S.balY * h, r: clamp(w * .06, 36, 52) }; },
    initBits(S, g) { S.bits = Array.from({ length: 14 }, (_, i) => { const x = g.w * .6 + (i % 7) * Math.min(26, g.w * .045) + (i > 6 ? 12 : 0), y = g.ty - 3 - (i > 6 ? 4 : 0); return { hx: x, hy: y, x, y, vx: 0, vy: 0, st: false, ox: 0, oy: 0, c: ['#fde047', '#f9a8d4', '#a5f3fc', '#bbf7d0'][i % 4], a: i * .7 }; }); },
    /* ---------- sort ---------- */
    gS(S) { const w = S.W, h = S.H, x0 = Math.max(76, w * .09), x1 = w - 20; const cw = Math.min(250, (x1 - x0) / 2 - 12), ch = 38; const binY = h * .56, binH = h * .86 - binY; return { w, h, x0, x1, cw, ch, binY, binH, mid: (x0 + x1) / 2 }; },
    cardHome(g, i) { const col = i % 2, row = i >> 1; return [g.mid + (col ? -g.cw / 2 - 8 : g.cw / 2 + 8), 70 + row * (g.ch + 12)]; },
    cardPos(S, g, c) { if (S.drg === c.i) return [S.gx, S.gy]; if (c.place) { const same = S.cards.filter(q => q.place === c.place); const k = same.indexOf(c); const bx = c.place === 'c' ? g.mid + (g.x1 - g.mid) / 2 : g.x0 + (g.mid - g.x0) / 2; return [bx, g.binY + 48 + k * (g.ch * .72 + 4)]; } return D.cardHome(g, c.i); },
    update(S, dt) {
      dt = Math.min(dt, .04); const sc = S.p.sc;
      if (sc === 'ball') { if (!S.hold) { const pv = S.bvy; S.bvy -= 9.8 * dt; S.bh += S.bvy * dt; if (pv > 0 && S.bvy <= 0) S.apex = S.bh; if (S.bh <= 0 && S.bvy < 0) { S.bh = 0; S.bvy = -S.bvy * .78; S.cT = .2; S.bounces++; if (S.bvy < .35) S.bvy = 0; } } S.cT = Math.max(0, S.cT - dt); S._tr += dt; if (S._tr > .06 && !S.hold && S.bvy !== 0) { S._tr = 0; S.trail.push(S.bh); if (S.trail.length > 24) S.trail.shift(); } }
      else if (sc === 'mag') { const g = D.gM(S), m = D.magF(S, g); if (Math.abs(S.vR) < 3 && Math.abs(m.F) < 60) S.vR = 0; else S.vR += (m.F - 3 * S.vR - 40 * Math.sign(S.vR || m.F)) * dt; let xr = g.xr + S.vR * dt; const minX = g.xl + g.L + 2; if (xr < minX) { xr = minX; S.vR = 0; } if (xr > g.x1 - g.L / 2) { xr = g.x1 - g.L / 2; S.vR = 0; } S.mR = (xr - g.x0 - g.L / 2) / (g.x1 - g.x0 - g.L); }
      else if (sc === 'bal') { const g = D.gL(S); if (!S.bits) D.initBits(S, g); S.q = Math.max(0, S.q - .006 * dt); const R = 30 + 170 * S.q, bb = [g.bx, g.by + g.r * .9];
        S.bits.forEach(b => { if (b.st) { if (S.q < .08) { b.st = false; b.vy = 0; } else { b.x = g.bx + b.ox; b.y = g.by + b.oy; return; } }
          const dx = bb[0] - b.x, dy = bb[1] - b.y, d = Math.hypot(dx, dy); if (S.q > .12 && d < R) { const k = 900 * S.q / Math.max(d, 20); b.vx += dx / d * k * dt * 6; b.vy += dy / d * k * dt * 6; } b.vy += 600 * dt; b.vx *= .96; b.x += b.vx * dt; b.y += b.vy * dt; b.a += b.vx * dt * .05;
          const dc = Math.hypot(b.x - g.bx, b.y - g.by); if (S.q > .12 && dc < g.r + 5) { b.st = true; const an = Math.atan2(b.y - g.by, b.x - g.bx); b.ox = Math.cos(an) * (g.r + 3); b.oy = Math.sin(an) * (g.r * 1.15 + 3); }
          if (b.y > g.ty - 3) { b.y = g.ty - 3; b.vy = 0; b.vx *= .5; } });
        S.stuck = S.bits.filter(b => b.st).length; }
    },
    draw(ctx, w, h, S) { const sc = S.p.sc; if (sc === 'mag') D.drawMag(ctx, w, h, S); else if (sc === 'bal') D.drawBal(ctx, w, h, S); else if (sc === 'sort') D.drawSort(ctx, w, h, S); else D.drawBall(ctx, w, h, S); C2.drawMsg(ctx, S, w * .55, h * .42); K.party(ctx, S); },
    drawBall(ctx, w, h, S) {
      const p = S.p, g = D.gB(S); K.bg(ctx, w, h, { benchY: g.fy, top: '#dcfce7', bottom: '#f0fdf4' });
      // height scale
      const rx = g.x - 150; K.raw(ctx, () => { ctx.fillStyle = '#fde047'; rr(ctx, rx - 16, g.fy - 2.05 * g.pxm, 26, 2.05 * g.pxm, 4); ctx.fill(); ctx.strokeStyle = '#a16207'; ctx.lineWidth = 1; ctx.stroke(); ctx.strokeStyle = '#422006'; for (let k = 0; k <= 20; k++) { const yy = g.fy - k * .1 * g.pxm; ctx.lineWidth = k % 5 ? .7 : 1.3; ctx.beginPath(); ctx.moveTo(rx + 10, yy); ctx.lineTo(rx + 10 - (k % 5 ? 6 : 12), yy); ctx.stroke(); } });
      for (let k = 0; k <= 4; k++) C2.T(ctx, (k * .5).toFixed(1), rx - 26, g.fy - k * .5 * g.pxm, { s: 11, w: 800, mono: 1, c: '#422006' }); C2.T(ctx, 'الارتفاع (m)', rx - 4, g.fy - 2.05 * g.pxm - 14, { s: 11, w: 800, c: '#422006' });
      const by = g.fy - g.r - S.bh * g.pxm;
      if (S.dropH > 0) { const yy = g.fy - g.r * 0 - S.dropH * g.pxm; K.raw(ctx, () => { ctx.strokeStyle = 'rgba(37,99,235,.6)'; ctx.setLineDash([6, 4]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(rx + 12, yy); ctx.lineTo(g.x + 80, yy); ctx.stroke(); ctx.setLineDash([]); }); C2.T(ctx, 'ارتفاع الإسقاط ' + fmt(S.dropH, 2) + ' m', g.x + 84, yy, { s: 11.5, w: 800, c: '#1d4ed8', a: 'left' }); }
      if (S.apex > 0 && S.bounces) { const yy = g.fy - S.apex * g.pxm; K.raw(ctx, () => { ctx.strokeStyle = 'rgba(234,88,12,.6)'; ctx.setLineDash([6, 4]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(rx + 12, yy); ctx.lineTo(g.x + 80, yy); ctx.stroke(); ctx.setLineDash([]); }); C2.T(ctx, 'ارتفاع الارتداد ' + fmt(S.apex, 2) + ' m', g.x + 84, yy + (Math.abs(S.apex - S.dropH) < .12 ? 16 : 0), { s: 11.5, w: 800, c: '#c2410c', a: 'left' }); }
      if (p.trail) S.trail.forEach((hh, i) => K.raw(ctx, () => { ctx.globalAlpha = .08 + .25 * i / S.trail.length; ctx.fillStyle = '#a3e635'; ctx.beginPath(); ctx.arc(g.x, g.fy - g.r - hh * g.pxm, g.r, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; }));
      const sq = S.cT > .1 ? .78 : 1;
      K.raw(ctx, () => { ctx.save(); ctx.translate(g.x, g.fy - g.r * sq - S.bh * g.pxm); ctx.scale(1 / sq, sq); const gg = ctx.createRadialGradient(-g.r * .3, -g.r * .3, 2, 0, 0, g.r); gg.addColorStop(0, '#f7fee7'); gg.addColorStop(.4, '#d9f99d'); gg.addColorStop(1, '#84cc16'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(0, 0, g.r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(-g.r * 1.2, 0, g.r * .9, -.8, .8); ctx.stroke(); ctx.beginPath(); ctx.arc(g.r * 1.2, 0, g.r * .9, Math.PI - .8, Math.PI + .8); ctx.stroke(); ctx.restore(); });
      if (S.hold) C2.hand(ctx, g.x - g.r * .2, by - g.r * .55, 1, .8, { sleeve: '#f97316' });
      if (p.arrows) { C2.force(ctx, g.x + g.r + 8, by, 0, 55, 'الجاذبية (قوة مجال)', '#7c3aed', 4);
        if (S.cT > 0) C2.force(ctx, g.x - g.r - 8, g.fy, 0, -110, 'قوة الأرض (قوة تماس)', '#ea580c', 5);
        if (S.hold) C2.force(ctx, g.x - g.r - 8, by, 0, -55, 'قوة اليد (تماس)', '#0ea5e9', 4); }
      const st = S.hold ? 'الكرة في يدك: قوة اليد (تماس) توازن الجاذبية' : S.cT > 0 ? 'لحظة الارتطام: الأرض تدفع الكرة (قوة تماس) فتغيّر اتجاهها وسرعتها' : S.bvy < 0 ? 'الكرة تسقط: تؤثر فيها الجاذبية فقط (قوة مجال عن بُعد)' : S.bvy > 0 ? 'الكرة ترتفع: الجاذبية تبطئها حتى تتوقف لحظياً' : 'الكرة ساكنة على الأرض';
      C2.lines(ctx, [{ t: st, w: 800 }, { t: 'عدد الارتدادات: ' + S.bounces, c: '#475569' }], w - 20, 16, Math.min(420, w * .6), { title: 'ماذا يحدث للكرة؟', bd: '#65a30d' });
    },
    drawMag(ctx, w, h, S) {
      const p = S.p, g = D.gM(S), P = D.poles(S, g), m = D.magF(S, g); K.bg(ctx, w, h, { benchY: g.ty });
      if (p.field) { K.raw(ctx, () => { ctx.strokeStyle = 'rgba(124,58,237,.42)'; ctx.lineWidth = 1.3; P.filter(q => q[2] > 0).forEach(([px, py]) => { for (let k = 0; k < 10; k++) { const a = k / 10 * TAU + .3; let x = px + Math.cos(a) * 10, y = py + Math.sin(a) * 10; ctx.beginPath(); ctx.moveTo(x, y); let mid = null; for (let n = 0; n < 220; n++) { const [bx, by] = D.B(P, x, y), bm = Math.hypot(bx, by) || 1; x += bx / bm * 4; y += by / bm * 4; ctx.lineTo(x, y); if (n === 18) mid = [x, y, bx / bm, by / bm]; if (x < g.x0 - 20 || x > g.x1 + 20 || y < 60 || y > g.ty + 60) break; if (P.some(q => q[2] < 0 && Math.hypot(x - q[0], y - q[1]) < 8)) break; } ctx.stroke(); if (mid) G.arrow(ctx, mid[0] - mid[2] * 5, mid[1] - mid[3] * 5, mid[0] + mid[2] * 3, mid[1] + mid[3] * 3, 'rgba(124,58,237,.7)', 1.3, 6); } }); }); }
      // cart under the right magnet
      K.raw(ctx, () => { ctx.fillStyle = '#16a34a'; rr(ctx, g.xr - g.L / 2 - 6, g.y + g.H / 2, g.L + 12, 16, 4); ctx.fill(); [-1, 1].forEach(sg => { ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(g.xr + sg * g.L * .33, g.ty - 7, 7, 0, TAU); ctx.fill(); ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.arc(g.xr + sg * g.L * .33, g.ty - 7, 2.5, 0, TAU); ctx.fill(); }); });
      C2.bar(ctx, g.xl, g.y, g.L, g.H, S.flipL); C2.bar(ctx, g.xr, g.y, g.L, g.H, S.flipR);
      C2.hand(ctx, g.xl - g.L / 2 + 2, g.y, 1, .85, { sleeve: '#7c3aed' });
      C2.T(ctx, 'عربة (تتحرك بحرية)', g.xr, g.ty + 20, { s: 11.5, w: 800, c: '#fff', bg: 'rgba(21,128,61,.8)' });
      if (p.arrows && m.gap < 260) { const L = clamp(Math.abs(m.F) * .06, 12, 90), sg = m.att ? 1 : -1; C2.force(ctx, g.xl + g.L / 2 - 20, g.y - g.H / 2 - 20, sg * L, 0, '', '#7c3aed', 4); C2.force(ctx, g.xr - g.L / 2 + 20, g.y - g.H / 2 - 20, -sg * L, 0, '', '#7c3aed', 4); }
      if (m.gap < 260) K.bubble(ctx, C2.iso(m.att ? 'تجاذب! قطبان مختلفان 🧲' : 'تنافر! قطبان متشابهان'), (g.xl + g.xr) / 2, g.y - g.H / 2 - 44, { s: 13, bg: m.att ? '#f5f3ff' : '#fef2f2', bd: m.att ? '#7c3aed' : '#dc2626', c: m.att ? '#5b21b6' : '#991b1b' });
      C2.lines(ctx, [{ t: 'المغناطيسان لا يتلامسان، ومع ذلك يؤثر كل منهما في الآخر', w: 800 }, { t: 'القوة المغناطيسية قوة مجال (تأثير عن بُعد)', c: '#6d28d9', w: 800 }, { t: 'انقر على مغناطيس لقلب قطبيه', c: '#475569' }], w - 20, 16, Math.min(440, w * .62), { title: 'القوة المغناطيسية', bd: '#7c3aed' });
    },
    drawBal(ctx, w, h, S) {
      const p = S.p, g = D.gL(S); if (!S.bits) D.initBits(S, g); K.bg(ctx, w, h, { benchY: g.ty }); const W = g.wool;
      K.raw(ctx, () => { ctx.fillStyle = '#b91c1c'; rr(ctx, W.x, W.y, W.w, W.h, 14); ctx.fill(); ctx.strokeStyle = 'rgba(254,202,202,.55)'; ctx.lineWidth = 2; for (let y = W.y + 10; y < W.y + W.h - 4; y += 10) for (let x = W.x + 8; x < W.x + W.w - 6; x += 12) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 5, y + 6); ctx.lineTo(x + 10, y); ctx.stroke(); } });
      C2.T(ctx, 'قطعة صوف — افرك البالون عليها', W.x + W.w / 2, W.y - 14, { s: 12, w: 900, c: '#991b1b' });
      if (p.charges) { const n = Math.round(S.q * 12); for (let k = 0; k < n; k++) C2.T(ctx, '+', W.x + 16 + (k % 6) * (W.w - 32) / 5, W.y + W.h * .3 + (k / 6 | 0) * W.h * .4, { s: 18, w: 900, c: '#fff', bg: '#dc2626' }); }
      // paper bits
      K.raw(ctx, () => S.bits.forEach(b => { ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.a); ctx.fillStyle = b.c; ctx.fillRect(-6, -3, 12, 6); ctx.strokeStyle = 'rgba(15,23,42,.3)'; ctx.lineWidth = .8; ctx.strokeRect(-6, -3, 12, 6); ctx.restore(); }));
      C2.T(ctx, 'قصاصات ورق', g.w * .6 + 80, g.ty + 18, { s: 11.5, w: 800, c: '#fff', bg: 'rgba(120,53,15,.8)' });
      if (p.arrows && S.q > .12) { const R = 30 + 170 * S.q; let n = 0; S.bits.forEach(b => { if (b.st || n > 4) return; const dx = g.bx - b.x, dy = g.by + g.r - b.y, d = Math.hypot(dx, dy); if (d < R + 60) { n++; K.raw(ctx, () => { ctx.setLineDash([4, 3]); G.arrow(ctx, b.x, b.y, b.x + dx / d * 34, b.y + dy / d * 34, '#2563eb', 2, 8); ctx.setLineDash([]); }); } }); if (n) C2.T(ctx, 'قوة كهربائية (مجال)', g.bx + g.r + 70, g.by + g.r + 30, { s: 12, w: 900, c: '#fff', bg: '#2563eb' }); }
      // balloon
      K.raw(ctx, () => { ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(g.bx, g.by + g.r * 1.2); ctx.quadraticCurveTo(g.bx - 16, g.by + g.r * 1.9, g.bx + 4, g.by + g.r * 2.6); ctx.stroke();
        const gg = ctx.createRadialGradient(g.bx - g.r * .35, g.by - g.r * .4, 3, g.bx, g.by, g.r * 1.2); gg.addColorStop(0, '#fbcfe8'); gg.addColorStop(.35, '#ec4899'); gg.addColorStop(1, '#9d174d'); ctx.fillStyle = gg; ctx.beginPath(); ctx.ellipse(g.bx, g.by, g.r, g.r * 1.18, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#9d174d'; ctx.beginPath(); ctx.moveTo(g.bx - 6, g.by + g.r * 1.24); ctx.lineTo(g.bx + 6, g.by + g.r * 1.24); ctx.lineTo(g.bx, g.by + g.r * 1.12); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.beginPath(); ctx.ellipse(g.bx - g.r * .4, g.by - g.r * .45, g.r * .16, g.r * .3, -.5, 0, TAU); ctx.fill(); });
      if (p.charges) { const n = Math.round(S.q * 12); for (let k = 0; k < n; k++) { const a = k / Math.max(n, 1) * TAU + .4; C2.T(ctx, '−', g.bx + Math.cos(a) * g.r * .68, g.by + Math.sin(a) * g.r * .8, { s: 15, w: 900, c: '#fff', bg: '#1d4ed8' }); } }
      const bar = Math.round(S.q * 100); C2.lines(ctx, [{ t: 'شحنة البالون: ' + bar + '%', c: '#1d4ed8', w: 900 }, { t: S.q < .12 ? 'افرك البالون بالصوف ليُشحن' : 'قرّب البالون من القصاصات دون أن يلمسها', w: 800 }, { t: 'القصاصات الملتصقة: ' + (S.stuck || 0), c: '#475569' }], w - 20, 16, Math.min(330, w * .46), { title: 'القوة الكهربائية', bd: '#2563eb' });
    },
    drawSort(ctx, w, h, S) {
      const g = D.gS(S); K.bg(ctx, w, h, { benchY: h * .9, top: '#fef9c3', bottom: '#fefce8' });
      C2.T(ctx, 'اسحب كل بطاقة إلى الصندوق المناسب', g.mid, 36, { s: 15, w: 900, c: '#854d0e' });
      [['c', 'قوى التماس ✋', '(تماس مباشر)', '#ea580c', g.mid + 6, g.x1], ['f', 'قوى المجال 🧲', '(تأثير عن بُعد)', '#7c3aed', g.x0, g.mid - 6]].forEach(([k, t, t2, col, a, b]) => { K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.85)'; rr(ctx, a, g.binY, b - a, g.binH, 16); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.setLineDash([10, 6]); ctx.stroke(); ctx.setLineDash([]); }); C2.T(ctx, t, (a + b) / 2, g.binY + 18, { s: 15, w: 900, c: '#fff', bg: col }); C2.T(ctx, t2, (a + b) / 2, g.binY + g.binH - 14, { s: 11.5, w: 800, c: col }); });
      S.cards.forEach(c => { if (S.drg === c.i) return; D.drawCard(ctx, S, g, c); }); if (S.drg >= 0) D.drawCard(ctx, S, g, S.cards[S.drg]);
      C2.T(ctx, 'صحيح: ' + S.placed + ' / ' + CARDS.length, g.x0 + 60, 36, { s: 13, w: 900, c: '#15803d', bg: 'rgba(220,252,231,.95)' });
    },
    drawCard(ctx, S, g, c) { const [x, y] = D.cardPos(S, g, c), sm = c.place && S.drg !== c.i, cw = sm ? g.cw * .92 : g.cw, ch = sm ? g.ch * .72 : g.ch, col = c.place ? (c.place === 'c' ? '#ea580c' : '#7c3aed') : '#0f766e';
      K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.2)'; ctx.shadowBlur = S.drg === c.i ? 14 : 5; ctx.fillStyle = '#fff'; rr(ctx, x - cw / 2, y - ch / 2, cw, ch, 10); ctx.fill(); ctx.restore(); ctx.strokeStyle = col; ctx.lineWidth = 2; rr(ctx, x - cw / 2, y - ch / 2, cw, ch, 10); ctx.stroke(); });
      C2.T(ctx, CARDS[c.i][0] + (c.place ? ' ✔' : ''), x, y, { s: sm ? 11.5 : 13, w: 800, c: '#0f172a' }); },
    drags(S) {
      const sc = S.p.sc;
      if (sc === 'ball') { const g = D.gB(S); const by = g.fy - g.r - S.bh * g.pxm; return [{ id: 'ball', x: g.x, y: by, r: g.r + 14, axis: 'y', tip: 'اسحب الكرة إلى الأعلى ثم اتركها لتسقط', idle: 'ارفع الكرة ثم اتركها ✋',
        down: S => { S.hold = true; S.bvy = 0; S.trail = []; }, drag: (S, d) => { S.bh = clamp((g.fy - g.r - (d.oy + d.y - d.sy)) / g.pxm, 0, 2); S.nDrag++; }, up: S => { S.hold = false; S.dropH = S.bh; S.apex = 0; S.bounces = 0; S.trail = []; } }]; }
      if (sc === 'mag') { const g = D.gM(S); return [
        { id: 'magL', x: g.xl, y: g.y, w: g.L, h: g.H + 10, axis: 'x', tip: 'اسحب المغناطيس (انقره لقلب قطبيه)', idle: 'قرّب المغناطيس ✋', drag: (S, d) => { const x = d.ox + d.x - d.sx; const maxX = g.xr - g.L - 2; S.mL = clamp((Math.min(x, maxX) - g.x0 - g.L / 2) / (g.x1 - g.x0 - g.L), 0, 1); S.nDrag++; }, click: S => { S.flipL = !S.flipL; } },
        { id: 'magR', x: g.xr, y: g.y, w: g.L, h: g.H + 10, tip: 'انقر لقلب قطبي المغناطيس على العربة', hint: false, click: S => { S.flipR = !S.flipR; } }]; }
      if (sc === 'bal') { const g = D.gL(S); return [{ id: 'balloon', x: g.bx, y: g.by, r: g.r + 6, axis: 'xy', tip: 'افرك البالون بالصوف ثم قرّبه من القصاصات', idle: 'افرك البالون بالصوف ✋',
        drag: (S, d) => { const x = d.ox + d.x - d.sx, y = d.oy + d.y - d.sy; S.balX = clamp(x / S.W, .12, .95); S.balY = clamp(y / S.H, .15, (g.ty - g.r * 1.3) / S.H); const W = g.wool; if (x > W.x - 10 && x < W.x + W.w + 10 && y > W.y - 20 && y < W.y + W.h + 20) { const q0 = S.q; S.q = Math.min(1, S.q + (Math.abs(d.dx) + Math.abs(d.dy)) * .0022); if (q0 < .12 && S.q >= .12) C2.msg(S, 'البالون أصبح مشحوناً ⚡'); } S.nDrag++; } }]; }
      const g = D.gS(S);
      return S.cards.filter(c => !c.place).map(c => { const [x, y] = D.cardPos(S, g, c); return { id: 'card' + c.i, x, y, w: g.cw, h: g.ch, axis: 'xy', hint: c.i === 0, idle: c.i === 0 ? 'اسحب البطاقة إلى صندوقها ✋' : undefined, tip: 'اسحب البطاقة إلى الصندوق المناسب',
        down: S => { S.drg = c.i; S.gx = x; S.gy = y; }, drag: (S, d) => { S.gx = d.ox + d.x - d.sx; S.gy = d.oy + d.y - d.sy; S.nDrag++; },
        up: S => { S.drg = -1; if (S.gy < g.binY - 10) return; const bin = S.gx > g.mid ? 'c' : 'f'; if (CARDS[c.i][1] === bin) { c.place = bin; S.placed++; if (window.Sound) Sound.click(); if (S.placed === CARDS.length) { K.cheer(S, S.W / 2, S.H * .4); C2.msg(S, 'رائع! صنّفت كل القوى بشكل صحيح 🎉', 3.5); } } else { S.wrong++; C2.msg(S, bin === 'c' ? 'فكّر: هل يوجد تماس مباشر بين الجسمين؟ 🤔' : 'فكّر: هل تؤثر هذه القوة عن بُعد دون تماس؟ 🤔', 3); } } }; });
    },
    field(S, x, y) { if (S.p.sc !== 'mag') return null; const g = D.gM(S); if ((Math.abs(x - g.xl) < g.L / 2 || Math.abs(x - g.xr) < g.L / 2) && Math.abs(y - g.y) < g.H / 2) return null; const [bx, by] = D.B(D.poles(S, g), x, y); return [bx * 60, by * 60]; },
    fieldRef: () => .004,
    readings(S) { const sc = S.p.sc;
      if (sc === 'ball') return [rd('ارتفاع الكرة', fmt(S.bh, 3) + ' m'), rd('ارتفاع الإسقاط', fmt(S.dropH, 3) + ' m'), rd('ارتفاع آخر ارتداد', fmt(S.apex, 3) + ' m'), rd('القوى المؤثرة الآن', S.hold ? 'الجاذبية (مجال) + اليد (تماس)' : S.cT > 0 ? 'الجاذبية (مجال) + الأرض (تماس)' : 'الجاذبية فقط (مجال)', 1)];
      if (sc === 'mag') { const g = D.gM(S), m = D.magF(S, g); return [rd('المسافة بين المغناطيسين', fmt(m.gap / g.L * 10, 3) + ' cm'), rd('نوع التأثير', m.att ? 'تجاذب' : 'تنافر'), rd('نوع القوة', 'قوة مجال (عن بُعد)', 1)]; }
      if (sc === 'bal') return [rd('شحنة البالون', Math.round(S.q * 100) + ' %'), rd('القصاصات الملتصقة', S.stuck || 0), rd('نوع القوة', 'قوة كهربائية — قوة مجال', 1)];
      return [rd('البطاقات الصحيحة', S.placed + ' / ' + CARDS.length), rd('المحاولات الخاطئة', S.wrong)]; },
    record(S) { if (S.p.sc !== 'ball' || !S.dropH || !S.apex) { Runner.toast('في مشهد «الكرة»: أسقط الكرة وانتظر ارتدادها ثم سجّل', 'info'); return null; } return { h0: +S.dropH.toFixed(2), h1: +S.apex.toFixed(2) }; },
    cols: [['h0', 'ارتفاع الإسقاط (m)'], ['h1', 'ارتفاع الارتداد الأول (m)']],
    graph: { x: 'h0', y: 'h1', xl: 'ارتفاع الإسقاط (m)', yl: 'ارتفاع الارتداد (m)', fit: { u: '', t: () => 'كلما زاد ارتفاع الإسقاط زاد ارتفاع الارتداد' } },
    explain(S) { const sc = S.p.sc;
      if (sc === 'ball') return S.cT > 0 ? 'لحظة ارتطام الكرة بالأرض تؤثر فيها الأرض <b>بقوة تماس</b> تغيّر اتجاه حركتها وسرعتها فترتد إلى الأعلى.' : 'في الهواء تؤثر في الكرة <b>قوة الجاذبية الأرضية</b> وهي <b>قوة مجال</b> تؤثر عن بُعد دون تماس.';
      if (sc === 'mag') return 'الأقطاب <b>المختلفة تتجاذب</b> و<b>المتشابهة تتنافر</b>. تؤثر القوة المغناطيسية <b>عن بُعد</b>: إنها قوة مجال.';
      if (sc === 'bal') return 'عند فرك البالون بالصوف يُشحن بشحنة كهربائية، فيجذب قصاصات الورق <b>عن بُعد</b>: <b>القوة الكهربائية قوة مجال</b>.';
      return '<b>قوى التماس</b>: بتماس مباشر بين الجسمين. <b>قوى المجال</b>: تؤثر عن بُعد (الجاذبية، المغناطيسية، الكهربائية).'; },
    quiz: [
      { q: 'ما الفرق بين قوى التماس وقوى المجال؟', o: ['قوى التماس تحتاج إلى تماس مباشر، وقوى المجال تؤثر عن بُعد', 'قوى المجال تحتاج إلى تماس مباشر، وقوى التماس تؤثر عن بُعد', 'لا فرق بينهما'], a: 0, why: 'تعريف الكتاب ص 33–34.' },
      { q: 'صنّف القوة: حصان يسحب عربة.', o: ['قوة مجال', 'قوة تماس', 'قوة كهربائية'], a: 1, why: 'الحصان متصل بالعربة ويؤثر فيها بتماس مباشر (مراجعة الفصل ص 41).' },
      { q: 'عند رمي حجر إلى الأعلى يتوقف لحظة ثم يسقط. ما القوة المؤثرة فيه عند تلك اللحظة؟', o: ['لا توجد أي قوة', 'قوة الجاذبية الأرضية (وزنه)', 'قوة اليد التي رمته'], a: 1, why: 'الجاذبية قوة مجال تؤثر في الحجر دائماً، حتى لحظة توقفه (تفكير ناقد ص 38).' }
    ]
  };
  X7(D);
})();

/* =========================================================================================
   6) محصلة القوى — القوى المتزنة وغير المتزنة (ص 34–37)
   ========================================================================================= */
(() => {
  const PERK = 100; // N per child in the tug of war
  const D = { id: 'g7_net_force', ch: 12, sec: 'الدرس 2', page: 34, kind: 'نشاط', title: 'محصلة القوى: القوى المتزنة وغير المتزنة (شد الحبل، دفع الدراجة، قوتان متعامدتان)',
    desc: 'لعبة شد الحبل: أضف أطفالاً إلى كل فريق واسحب الحبل بنفسك. ادفع الدراجة مع زميلك بالاتجاه نفسه، واسحب صندوقاً بقوتين متعامدتين واحسب المحصلة بفيثاغورس. الجسم يتحرك فقط عندما Fnet ≠ 0.',
    tags: 'محصلة القوى متزنة غير متزنة شد الحبل فيثاغورس متعامدتان',
    tools: ['حبل', 'دراجة', 'صندوق', 'حبلان متعامدان'],
    steps: ['مشهد «شد الحبل»: انقر «+» و«−» لإضافة أطفال (كل طفل يشد بقوة 100 N). ماذا يحدث عندما يتساوى الفريقان؟', 'اسحب مقبض الحبل الأحمر بيدك لتضيف قوتك إلى أحد الفريقين.', 'مشهد «الدراجة»: اسحب رأسي السهمين F₁ و F₂ (قوتا الصديقين باتجاه واحد) ولاحظ Fnet = F₁ + F₂.', 'مشهد «متعامدتان»: اسحب رأس F₁ (شرقاً) ورأس F₂ (جنوباً) واحسب المحصلة بنظرية فيثاغورس، ثم اضغط «حرّر الصندوق».', 'جرّب أمثلة الكتاب ص 36 من الأزرار، وتحقق من الحل.', 'لاحظ: الجسم الساكن يبقى ساكناً عندما تكون القوى متزنة (Fnet = 0).'],
    concl: ['محصلة القوى (Fnet): قوة واحدة تعادل مجموعة قوى بتأثيرها في جسم في آن واحد وفي نقطة واحدة.', 'قوتان بالاتجاه نفسه: Fnet = F₁ + F₂ وباتجاههما.', 'قوتان متعاكستان: Fnet = الكبرى − الصغرى وباتجاه الكبرى، وتساوي صفراً إذا تساوتا.', 'قوتان متعامدتان: Fnet = √(F₁² + F₂²) (نظرية فيثاغورس).', 'القوى المتزنة (Fnet = 0) لا تغيّر حركة الجسم، والقوى غير المتزنة (Fnet ≠ 0) تغيّر مقدار سرعته أو اتجاهها.'],
    laws: ['g7_fsame', 'g7_fopp', 'g7_fperp'],
    fact: ['لكي نجد المحصلة يجب أن نعرف مقدار كل القوى واتجاهها، فقوتان مقدار كل منهما 10 N قد تكون محصلتهما 20 N أو صفراً!', 'السيارة التي تتحرك بسرعة ثابتة على طريق مستقيم تكون القوى المؤثرة فيها متزنة.', 'كرة القدم تتأثر بقوى غير متزنة عندما يركلها اللاعبون فتتغير سرعتها واتجاهها.'],
    controls: [SEL('sc', 'المشهد', [['tug', '🪢 شد الحبل'], ['bike', '🚲 الدراجة'], ['perp', '📐 متعامدتان']], 'tug', (v, S) => D.reset(S)),
      BT('أمثلة الكتاب (ص 36)', [{ t: '500 + 300 شرقاً', on: S => { setParam(S, 'sc', 'bike'); D.reset(S); setParam(S, 'F1', 500); setParam(S, 'F2', 300); } }, { t: '500 شرقاً و 300 غرباً', on: S => { setParam(S, 'sc', 'tug'); D.reset(S); setParam(S, 'nR', 5); setParam(S, 'nL', 3); } }, { t: '500 و 500 متعاكستان', on: S => { setParam(S, 'sc', 'tug'); D.reset(S); setParam(S, 'nR', 5); setParam(S, 'nL', 5); } }, { t: '40 شرقاً و 30 جنوباً', on: S => { setParam(S, 'sc', 'perp'); D.reset(S); setParam(S, 'P1', 40); setParam(S, 'P2', 30); } }]),
      BT('', [{ t: 'إعادة المشهد', on: S => D.reset(S) }]),
      R('nL', 'شد الحبل: أطفال الغرب (يسار)', 0, 6, 4, 1, ''), R('nR', 'شد الحبل: أطفال الشرق (يمين)', 0, 6, 3, 1, ''),
      R('F1', 'الدراجة: قوة الصديق الأول F₁', 0, 600, 200, 10, 'N'), R('F2', 'الدراجة: قوة الصديق الثاني F₂', 0, 600, 150, 10, 'N'),
      R('P1', 'متعامدتان: F₁ شرقاً', 0, 60, 40, 1, 'N'), R('P2', 'متعامدتان: F₂ جنوباً', 0, 60, 30, 1, 'N'),
      TG('arrows', 'أسهم القوى', true, null, 'force'), TG('net', 'محصلة القوى Fnet', true, null, 'vector'), TG('fbd', 'مخطط الصندوق (كالكتاب)', true, null, 'schematic'), TG('calc', 'خطوات الحساب', true, null, 'graph')],
    setup(S) { S.nDrag = 0; D.reset(S); },
    reset(S) { S.rx = 0; S.rv = 0; S.handF = 0; S.won = 0; S.bkx = 0; S.bkv = 0; S.pbx = 0; S.pby = 0; S.pv = 0; S.go = 0; },
    tug(S) { const FL = S.p.nL * PERK + Math.max(0, -S.handF), FR = S.p.nR * PERK + Math.max(0, S.handF); return { FL, FR, net: FR - FL }; },
    update(S, dt) { dt = Math.min(dt, .05); const sc = S.p.sc;
      if (sc === 'tug') { if (S.won) return; const t = D.tug(S); S.rv += (t.net * .25 - 2 * S.rv) * dt; if (Math.abs(t.net) < 1 && Math.abs(S.rv) < 1) S.rv *= .9; S.rx += S.rv * dt; const lim = S.W * .16; if (Math.abs(S.rx) > lim) { S.won = S.rx > 0 ? 1 : -1; S.rx = Math.sign(S.rx) * lim; S.rv = 0; K.cheer(S, S.W / 2 + S.rx, S.H * .4); C2.msg(S, 'فاز فريق ' + (S.won > 0 ? 'الشرق' : 'الغرب') + '! المحصلة كانت باتجاهه 🏆', 3.5); } }
      else if (sc === 'bike') { const F = S.p.F1 + S.p.F2; S.bkv += (F / 120 - .8 * S.bkv) * dt; if (F === 0) S.bkv *= Math.max(0, 1 - 1.5 * dt); S.bkx += S.bkv * dt; }
      else if (S.go) { const Fn = Math.hypot(S.p.P1, S.p.P2); if (Fn > 0) { S.pv += (Fn * 2 - 1.2 * S.pv) * dt; const u = [S.p.P1 / Fn, S.p.P2 / Fn]; S.pbx += u[0] * S.pv * dt; S.pby += u[1] * S.pv * dt; if (Math.hypot(S.pbx, S.pby) > Math.min(S.W, S.H) * .25) { S.pbx = 0; S.pby = 0; S.pv = 0; } } else S.pv = 0; }
    },
    draw(ctx, w, h, S) { const sc = S.p.sc; if (sc === 'bike') D.drawBike(ctx, w, h, S); else if (sc === 'perp') D.drawPerp(ctx, w, h, S); else D.drawTug(ctx, w, h, S); K.party(ctx, S); },
    fbd(ctx, x, y, F1, F2, net, labels, sc) { // small block diagram like the book; F positive = east
      K.box(ctx, x - 26, y + 22, 52, 44, 26, { c1: '#60a5fa', c2: '#1d4ed8' });
      const px = sc; K.raw(ctx, () => { ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x - 110, y + 22); ctx.lineTo(x + 130, y + 22); ctx.stroke(); });
      if (F1) C2.force(ctx, F1 > 0 ? x + 26 : x - 26, y, F1 * px, 0, labels[0], '#0f172a', 3);
      if (F2) C2.force(ctx, F2 > 0 ? x + 26 : x - 26, y - (Math.sign(F1) === Math.sign(F2) ? 22 : 0), F2 * px, 0, labels[1], '#0f172a', 3);
      if (net !== null) { if (Math.abs(net) > .5) C2.force(ctx, net > 0 ? x + 26 : x - 26, y + 40, net * px, 0, 'Fnet', '#16a34a', 3.5); else C2.T(ctx, 'Fnet = 0', x, y + 36, { s: 12, w: 900, c: '#fff', bg: '#16a34a' }); }
    },
    drawTug(ctx, w, h, S) {
      const p = S.p, gy = h * .68, ry = gy - 44, cx = w * .52 + S.rx, x0 = Math.max(76, w * .09), t = D.tug(S), s = clamp(w / 900, .7, 1);
      K.bg(ctx, w, h, { benchY: gy, top: '#bae6fd', bottom: '#e0f2fe', tiles: false, bench: false });
      K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, gy, 0, h); gg.addColorStop(0, '#86efac'); gg.addColorStop(1, '#16a34a'); ctx.fillStyle = gg; ctx.fillRect(0, gy, w, h - gy); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(w * .52, gy); ctx.lineTo(w * .52, h * .8); ctx.stroke(); ctx.setLineDash([6, 5]); ctx.strokeStyle = 'rgba(255,255,255,.8)'; [-1, 1].forEach(sg => { ctx.beginPath(); ctx.moveTo(w * .52 + sg * w * .16, gy); ctx.lineTo(w * .52 + sg * w * .16, h * .8); ctx.stroke(); }); ctx.setLineDash([]); });
      // rope
      K.raw(ctx, () => { ctx.strokeStyle = '#a16207'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x0 + 10, ry + 2); ctx.lineTo(w - 24, ry + 2); ctx.stroke(); ctx.strokeStyle = 'rgba(254,240,138,.7)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 6]); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(cx, ry); ctx.lineTo(cx - 9, ry + 30); ctx.lineTo(cx + 9, ry + 30); ctx.closePath(); ctx.fill(); });
      const cols = ['#ef4444', '#3b82f6', '#22c55e', '#a855f7', '#f59e0b', '#14b8a6'], sp = 46 * s;
      for (let k = 0; k < p.nL; k++) { const fx = cx - 80 * s - k * sp; C2.kid(ctx, fx, gy, s, cols[k % 6], 1, fx + 18 * s, ry + 2, .38 + (Math.abs(t.net) > 0 ? .06 * Math.sin(S.t * 6 + k) : 0)); }
      for (let k = 0; k < p.nR; k++) { const fx = cx + 80 * s + k * sp; C2.kid(ctx, fx, gy, s, cols[(k + 3) % 6], -1, fx - 18 * s, ry + 2, .38 + (Math.abs(t.net) > 0 ? .06 * Math.sin(S.t * 6 + k + 2) : 0)); }
      if (S.handF) C2.hand(ctx, cx + (S.handF > 0 ? 18 : -18), ry + 2, S.handF > 0 ? -1 : 1, .8, { sleeve: '#f97316' });
      // big team arrows (like the book)
      const ay = h * .3, px = Math.min(.26, (w * .4) / 700);
      if (p.arrows) { if (t.FL) C2.force(ctx, w * .52 - 8, ay, -t.FL * px, 0, t.FL + ' N', '#2563eb', 6); if (t.FR) C2.force(ctx, w * .52 + 8, ay, t.FR * px, 0, t.FR + ' N', '#2563eb', 6);
        if (S.handF) C2.force(ctx, cx, ry - 30, S.handF * px, 0, 'قوتك ' + Math.round(Math.abs(S.handF)) + ' N', '#f97316', 4); }
      if (p.net) { if (Math.abs(t.net) > .5) C2.force(ctx, cx, gy + 26, t.net * px, 0, 'Fnet = ' + Math.round(Math.abs(t.net)) + ' N', '#16a34a', 6); else C2.T(ctx, 'Fnet = 0 — قوى متزنة ⚖️', w * .52, gy + 26, { s: 14, w: 900, c: '#fff', bg: '#16a34a' }); }
      C2.T(ctx, 'الغرب ←', x0 + 40, ay, { s: 13, w: 900, c: '#1e3a8a' }); C2.T(ctx, '→ الشرق', w - 60, ay, { s: 13, w: 900, c: '#1e3a8a' });
      // +/- buttons
      const B = D.btns(S); B.forEach(b => C2.btn(ctx, b.x, b.y, b.w, b.h, b.t, { col: b.col }));
      C2.T(ctx, 'فريق الغرب: ' + p.nL + ' × 100 N', (B[0].x + B[1].x) / 2, B[0].y + 30, { s: 12, w: 900, c: '#fff', bg: 'rgba(21,128,61,.85)' }); C2.T(ctx, 'فريق الشرق: ' + p.nR + ' × 100 N', (B[2].x + B[3].x) / 2, B[2].y + 30, { s: 12, w: 900, c: '#fff', bg: 'rgba(21,128,61,.85)' });
      if (p.calc) { const L = Math.abs(t.net) < .5 ? [`F₁ = ${t.FL} N ، F₂ = ${t.FR} N`, 'Fnet = F₂ − F₁ = 0', { t: 'القوى متزنة: الحبل لا يتحرك', c: '#15803d', w: 900 }] : [`F الكبرى = ${Math.max(t.FL, t.FR)} N ، الصغرى = ${Math.min(t.FL, t.FR)} N`, `Fnet = ${Math.max(t.FL, t.FR)} − ${Math.min(t.FL, t.FR)} = ${Math.abs(t.net)} N`, { t: 'باتجاه ' + (t.net > 0 ? 'الشرق' : 'الغرب') + ' (القوة الكبرى) — قوى غير متزنة', c: '#b91c1c', w: 900 }];
        C2.lines(ctx, L, w - 20, 14, Math.min(360, w * .5), { title: 'قوتان متعاكستان', bd: '#16a34a' }); }
      if (p.fbd) D.fbd(ctx, x0 + 120, h * .44, t.FR, -t.FL, t.net, ['F₁', 'F₂'], Math.min(.13, 90 / Math.max(t.FL, t.FR, 1)));
      C2.drawMsg(ctx, S, w * .52, ay - 20);
    },
    btns(S) { const w = S.W, h = S.H, y = h * .76, x0 = Math.max(76, w * .09); return [{ id: 'addL', x: x0 + 110, y, w: 64, h: 34, t: '+ طفل', col: '#2563eb' }, { id: 'subL', x: x0 + 40, y, w: 64, h: 34, t: '− طفل', col: '#64748b' }, { id: 'subR', x: w - 170, y, w: 64, h: 34, t: '− طفل', col: '#64748b' }, { id: 'addR', x: w - 100, y, w: 64, h: 34, t: '+ طفل', col: '#2563eb' }]; },
    gK(S) { const w = S.W, h = S.H, gy = h * .7, bx = w * .6, px = Math.min(.3, (w * .3) / 600); return { w, h, gy, bx, px, a1y: h * .22, a2y: h * .32, sx: bx - 20 }; },
    drawBike(ctx, w, h, S) {
      const p = S.p, g = D.gK(S); K.bg(ctx, w, h, { benchY: g.gy, top: '#bae6fd', bottom: '#e0f2fe', tiles: false, bench: false });
      K.raw(ctx, () => { ctx.fillStyle = '#94a3b8'; ctx.fillRect(0, g.gy, w, h - g.gy); ctx.fillStyle = '#e2e8f0'; const off = (S.bkx * 40) % 70; for (let x = -off; x < w; x += 70) ctx.fillRect(x, g.gy + 10, 36, 5); ctx.fillStyle = '#16a34a'; const toff = (S.bkx * 40) % 230; for (let x = -toff; x < w + 60; x += 230) { ctx.fillRect(x + 20, g.gy - 60, 8, 60); ctx.beginPath(); ctx.arc(x + 24, g.gy - 72, 22, 0, TAU); ctx.fill(); } });
      // bicycle with a child on it (book p.34)
      const bx = g.bx, wy = g.gy - 24, rot = S.bkx / .3; C2.wheel(ctx, bx - 50, wy, 24, rot); C2.wheel(ctx, bx + 50, wy, 24, rot);
      K.raw(ctx, () => { ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(bx - 50, wy); ctx.lineTo(bx - 10, wy); ctx.lineTo(bx + 30, wy - 36); ctx.lineTo(bx - 18, wy - 36); ctx.lineTo(bx - 50, wy); ctx.moveTo(bx - 10, wy); ctx.lineTo(bx - 22, wy - 44); ctx.moveTo(bx + 50, wy); ctx.lineTo(bx + 30, wy - 50); ctx.stroke(); ctx.fillStyle = '#1f2937'; rr(ctx, bx - 32, wy - 50, 22, 7, 3); ctx.fill(); ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx + 24, wy - 52); ctx.lineTo(bx + 38, wy - 54); ctx.stroke(); });
      C2.kid(ctx, bx - 4, wy + 8, .78, '#ec4899', 1, bx + 28, wy - 52, -.05, { hair: '#7c2d12' });
      C2.kid(ctx, bx - 150, g.gy, .95, '#f59e0b', 1, bx - 76, wy - 10, -.4, { hair: '#1f2937' });
      C2.kid(ctx, bx - 100, g.gy, .95, '#3b82f6', 1, bx - 32, wy - 44, -.35);
      C2.T(ctx, 'أنا', bx - 150, g.gy + 20, { s: 11.5, w: 900, c: '#fff', bg: '#b45309' }); C2.T(ctx, 'زميلي', bx - 96, g.gy + 20, { s: 11.5, w: 900, c: '#fff', bg: '#1d4ed8' });
      const F1 = p.F1, F2 = p.F2, net = F1 + F2;
      if (p.arrows) { C2.force(ctx, g.sx, g.a1y, F1 * g.px, 0, '', '#1d4ed8', 5); C2.T(ctx, 'F₁ = ' + F1 + ' N', g.sx - 10, g.a1y, { s: 13, w: 900, c: '#1d4ed8', a: 'right' }); C2.force(ctx, g.sx, g.a2y, F2 * g.px, 0, '', '#b45309', 5); C2.T(ctx, 'F₂ = ' + F2 + ' N', g.sx - 10, g.a2y, { s: 13, w: 900, c: '#b45309', a: 'right' }); }
      if (p.net && net) { C2.force(ctx, g.sx, g.a2y + 52, net * g.px, 0, '', '#16a34a', 6); C2.T(ctx, 'Fnet = ' + net + ' N', g.sx - 10, g.a2y + 52, { s: 13, w: 900, c: '#15803d', a: 'right' }); }
      K.raw(ctx, () => { ctx.strokeStyle = 'rgba(15,23,42,.25)'; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(g.sx, g.a1y - 20); ctx.lineTo(g.sx, g.a2y + 70); ctx.stroke(); ctx.setLineDash([]); });
      if (p.calc) C2.lines(ctx, ['القوتان بالاتجاه نفسه (نحو الشرق):', 'Fnet = F₁ + F₂ = ' + F1 + ' + ' + F2 + ' = ' + net + ' N', { t: net ? 'قوى غير متزنة: تزداد سرعة الدراجة' : 'لا قوة: الدراجة لا تتسارع', c: net ? '#b91c1c' : '#15803d', w: 900 }], w - 20, 14, Math.min(360, w * .5), { title: 'قوتان باتجاه واحد', bd: '#16a34a' });
      if (p.fbd) D.fbd(ctx, Math.max(76, w * .09) + 120, h * .47, F1, F2, net, ['F₁', 'F₂'], Math.min(.25, 100 / Math.max(net, 1)));
      C2.T(ctx, 'السرعة: ' + fmt(S.bkv, 2) + ' m/s', g.bx, g.gy + 40, { s: 13, w: 900, c: '#fff', bg: 'rgba(15,23,42,.75)' });
    },
    gP(S) { const w = S.W, h = S.H, x0 = Math.max(76, w * .09); const ox = x0 + (w - x0) * .36 + S.pbx, oy = h * .36 + S.pby, pxN = Math.min(w * .4, h * .4) / 60; return { w, h, x0, ox, oy, pxN, go: { x: x0 + 90, y: h * .88, w: 150, h: 40 } }; },
    drawPerp(ctx, w, h, S) {
      const p = S.p, g = D.gP(S); K.bg(ctx, w, h, { benchY: h, tiles: false, top: '#f1f5f9', bottom: '#e2e8f0' });
      K.raw(ctx, () => { ctx.strokeStyle = 'rgba(100,116,139,.18)'; ctx.lineWidth = 1; for (let x = g.x0; x < w; x += 44) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); } for (let y = 0; y < h; y += 44) { ctx.beginPath(); ctx.moveTo(g.x0, y); ctx.lineTo(w, y); ctx.stroke(); } });
      C2.T(ctx, 'منظر علوي', g.x0 + 50, h * .1, { s: 12, w: 900, c: '#fff', bg: '#475569' });
      const e1 = [g.ox + p.P1 * g.pxN, g.oy], e2 = [g.ox, g.oy + p.P2 * g.pxN], en = [e1[0], e2[1]], Fn = Math.hypot(p.P1, p.P2);
      // ropes + hands
      K.raw(ctx, () => { ctx.strokeStyle = '#a16207'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.ox + 24, g.oy); ctx.lineTo(Math.max(e1[0], g.ox + 30) + 40, g.oy); ctx.moveTo(g.ox, g.oy + 24); ctx.lineTo(g.ox, Math.max(e2[1], g.oy + 30) + 40); ctx.stroke(); });
      C2.hand(ctx, Math.max(e1[0], g.ox + 30) + 44, g.oy, -1, .8, { sleeve: '#ec4899' }); C2.T(ctx, 'البنت تشد الحبل', Math.max(e1[0], g.ox + 30) + 60, g.oy - 26, { s: 11.5, w: 800, c: '#be185d' });
      C2.hand(ctx, g.ox, Math.max(e2[1], g.oy + 30) + 44, 1, .8, { sleeve: '#0ea5e9', rot: -Math.PI / 2 }); C2.T(ctx, 'صديقها يشد الحبل', g.ox + 16, Math.max(e2[1], g.oy + 30) + 74, { s: 11.5, w: 800, c: '#0369a1', a: 'left' });
      // helper lines of the parallelogram
      if (p.net && Fn > 0) K.raw(ctx, () => { ctx.strokeStyle = 'rgba(100,116,139,.6)'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(e1[0], e1[1]); ctx.lineTo(en[0], en[1]); ctx.lineTo(e2[0], e2[1]); ctx.stroke(); ctx.setLineDash([]); });
      // box
      K.box(ctx, g.ox - 24, g.oy + 24, 48, 48, 22, { c1: '#60a5fa', c2: '#1d4ed8' });
      K.raw(ctx, () => { ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 1.5; ctx.strokeRect(g.ox, g.oy, 12, 12); });
      if (p.arrows) { if (p.P1) C2.force(ctx, g.ox, g.oy, e1[0] - g.ox, 0, '', '#1d4ed8', 5); if (p.P2) C2.force(ctx, g.ox, g.oy, 0, e2[1] - g.oy, '', '#b45309', 5);
        C2.T(ctx, 'F₁ = ' + p.P1 + ' N (شرقاً)', (g.ox + e1[0]) / 2 + 10, g.oy - 18, { s: 13, w: 900, c: '#1d4ed8' }); C2.T(ctx, 'F₂ = ' + p.P2 + ' N (جنوباً)', g.ox - 14, (g.oy + e2[1]) / 2 + 10, { s: 13, w: 900, c: '#b45309', a: 'right' }); C2.T(ctx, '90°', g.ox + 22, g.oy + 22, { s: 11, w: 900, c: '#dc2626', mono: 1 }); }
      if (p.net && Fn > 0) { C2.force(ctx, g.ox, g.oy, en[0] - g.ox, en[1] - g.oy, '', '#16a34a', 6); C2.T(ctx, 'Fnet = ' + fmt(Fn, 3) + ' N', en[0] + 12, en[1] + 22, { s: 14, w: 900, c: '#fff', bg: '#16a34a', a: 'left' }); }
      if (p.calc) C2.lines(ctx, [{ t: '(Fnet)² = (F₁)² + (F₂)²', mono: 1, a: 'c' }, { t: `Fnet = √(${p.P1}² + ${p.P2}²)`, mono: 1, a: 'c' }, { t: `Fnet = √(${p.P1 * p.P1} + ${p.P2 * p.P2}) = √${p.P1 * p.P1 + p.P2 * p.P2}`, mono: 1, a: 'c' }, { t: `Fnet = ${fmt(Fn, 3)} N`, mono: 1, a: 'c', c: '#15803d', w: 900, s: 15 }], w - 20, 14, Math.min(320, w * .45), { title: 'نظرية فيثاغورس', bd: '#16a34a', lh: 22 });
      C2.btn(ctx, g.go.x, g.go.y, g.go.w, g.go.h, S.go ? '⏸ أوقف الصندوق' : '▶ حرّر الصندوق', { col: S.go ? '#64748b' : '#16a34a' });
      if (S.go && Fn > 0) C2.T(ctx, 'الصندوق يتحرك باتجاه المحصلة', g.go.x + 170, g.go.y, { s: 12, w: 800, c: '#15803d', a: 'left' });
      if (S.go && Fn === 0) C2.T(ctx, 'Fnet = 0 — الصندوق يبقى ساكناً', g.go.x + 170, g.go.y, { s: 12, w: 800, c: '#15803d', a: 'left' });
    },
    drags(S) { const sc = S.p.sc;
      if (sc === 'tug') { const h = S.H, gy = h * .68, ry = gy - 44, cx = S.W * .52 + S.rx;
        return [{ id: 'grip', x: cx, y: ry + 14, r: 22, axis: 'x', tip: 'اسحب الحبل بيدك لتضيف قوتك', idle: 'اسحب الحبل بيدك ✋', drag: (S, d) => { S.handF = clamp((d.x - d.sx) * 3, -300, 300); S.nDrag++; }, up: S => { S.handF = 0; } }]
          .concat(D.btns(S).map(b => ({ id: b.id, x: b.x, y: b.y, w: b.w, h: b.h, hint: false, tip: b.id.startsWith('add') ? 'أضف طفلاً (100 N)' : 'أزل طفلاً', click: S => { const k = b.id.endsWith('L') ? 'nL' : 'nR'; setParam(S, k, S.p[k] + (b.id.startsWith('add') ? 1 : -1)); if (S.won) { S.won = 0; S.rx = 0; } } }))); }
      if (sc === 'bike') { const g = D.gK(S); return [
        { id: 'F1', x: g.sx + S.p.F1 * g.px, y: g.a1y, r: 20, axis: 'x', tip: 'اسحب رأس السهم لتغيير قوة F₁', idle: 'اسحب رأس السهم ✋', drag: (S, d) => { setParam(S, 'F1', Math.round((d.ox + d.x - d.sx - g.sx) / g.px / 10) * 10); } },
        { id: 'F2', x: g.sx + S.p.F2 * g.px, y: g.a2y, r: 20, axis: 'x', tip: 'اسحب رأس السهم لتغيير قوة F₂', hint: false, drag: (S, d) => { setParam(S, 'F2', Math.round((d.ox + d.x - d.sx - g.sx) / g.px / 10) * 10); } }]; }
      const g = D.gP(S); return [
        { id: 'P1', x: g.ox + S.p.P1 * g.pxN, y: g.oy, r: 20, axis: 'x', tip: 'اسحب رأس F₁ (شرقاً)', idle: 'اسحب رأس السهم ✋', drag: (S, d) => { setParam(S, 'P1', Math.round((d.ox + d.x - d.sx - g.ox) / g.pxN)); } },
        { id: 'P2', x: g.ox, y: g.oy + S.p.P2 * g.pxN, r: 20, axis: 'y', tip: 'اسحب رأس F₂ (جنوباً)', hint: false, drag: (S, d) => { setParam(S, 'P2', Math.round((d.oy + d.y - d.sy - g.oy) / g.pxN)); } },
        { id: 'go', x: g.go.x, y: g.go.y, w: g.go.w, h: g.go.h, hint: false, tip: 'حرّر الصندوق ليتحرك بتأثير المحصلة', click: S => { S.go = S.go ? 0 : 1; } }];
    },
    readings(S) { const sc = S.p.sc;
      if (sc === 'tug') { const t = D.tug(S); return [rd('قوة فريق الغرب', t.FL + ' N'), rd('قوة فريق الشرق', t.FR + ' N'), rd('المحصلة Fnet', Math.abs(t.net) + ' N' + (t.net ? (t.net > 0 ? ' شرقاً' : ' غرباً') : '')), rd('نوع القوى', Math.abs(t.net) < .5 ? 'متزنة' : 'غير متزنة', 1)]; }
      if (sc === 'bike') return [rd('F₁', S.p.F1 + ' N'), rd('F₂', S.p.F2 + ' N'), rd('Fnet = F₁ + F₂', (S.p.F1 + S.p.F2) + ' N شرقاً'), rd('سرعة الدراجة', fmt(S.bkv, 3) + ' m/s')];
      const Fn = Math.hypot(S.p.P1, S.p.P2); return [rd('F₁ (شرقاً)', S.p.P1 + ' N'), rd('F₂ (جنوباً)', S.p.P2 + ' N'), rd('Fnet = √(F₁² + F₂²)', fmt(Fn, 4) + ' N'), rd('نوع القوى', Fn ? 'غير متزنة' : 'متزنة', 1)]; },
    record(S) { const sc = S.p.sc; if (sc === 'tug') { const t = D.tug(S); return { c: 'متعاكستان', F1: t.FR, F2: t.FL, Fn: Math.abs(t.net) }; } if (sc === 'bike') return { c: 'باتجاه واحد', F1: S.p.F1, F2: S.p.F2, Fn: S.p.F1 + S.p.F2 }; return { c: 'متعامدتان', F1: S.p.P1, F2: S.p.P2, Fn: +Math.hypot(S.p.P1, S.p.P2).toFixed(2) }; },
    cols: [['c', 'الحالة'], ['F1', 'F₁ (N)'], ['F2', 'F₂ (N)'], ['Fn', 'Fnet (N)']],
    explain(S) { const sc = S.p.sc;
      if (sc === 'tug') { const t = D.tug(S); return Math.abs(t.net) < .5 ? 'القوتان <b>متساويتان ومتعاكستان</b>: Fnet = 0 فالقوى <b>متزنة</b> والحبل لا يتحرك.' : `Fnet = ${Math.max(t.FL, t.FR)} − ${Math.min(t.FL, t.FR)} = <b>${Math.abs(t.net)} N</b> باتجاه القوة الكبرى (${t.net > 0 ? 'الشرق' : 'الغرب'}): قوى <b>غير متزنة</b> فيتحرك الحبل.`; }
      if (sc === 'bike') return 'عندما تكون القوتان <b>باتجاه واحد</b> نجمعهما: Fnet = F₁ + F₂، وتكون المحصلة باتجاههما.';
      return 'القوتان <b>متعامدتان</b> (الزاوية بينهما 90°): نجد مقدار المحصلة بنظرية فيثاغورس، واتجاهها بين الشرق والجنوب.'; },
    quiz: [
      { q: 'يدفع صبي عربة بقوة 8 N شرقاً، ويدفعها صبي آخر في الوقت نفسه بقوة 7 N غرباً. ما محصلة القوتين؟', o: ['15 N شرقاً', '1 N شرقاً', '1 N غرباً'], a: 1, why: 'قوتان متعاكستان: Fnet = 8 − 7 = 1 N باتجاه القوة الكبرى (الشرق) — مراجعة الدرس س5.' },
      { q: 'أثرت قوتان في جسم: 40 N شرقاً و 30 N جنوباً. مقدار المحصلة:', o: ['70 N', '10 N', '50 N'], a: 2, why: 'Fnet = √(40² + 30²) = √2500 = 50 N (مثال ص 36).' },
      { q: 'القوة التي تسبب تغيّراً في حركة الجسم هي:', o: ['قوى متزنة', 'قوى غير متزنة', 'قوى متساوية ومتعاكسة'], a: 1, why: 'القوى غير المتزنة (Fnet ≠ 0) تغيّر مقدار السرعة أو اتجاهها (مراجعة الفصل ص 40).' }
    ]
  };
  X7(D);
})();

/* =========================================================================================
   7) تطبيقات الفيزياء في الحياة (ص 39): حزام الأمان والقوى في الدراجة الهوائية
   ========================================================================================= */
(() => {
  const D = { id: 'g7_seatbelt', ch: 12, sec: 'تطبيقات الفيزياء في الحياة', page: 39, kind: 'تطبيق', title: 'تطبيق: حزام الأمان والقوى المؤثرة في الدراجة الهوائية',
    desc: 'سيارة تسير ثم تفرمل فجأة: يستمر جسم السائق في التحرك إلى الأمام! قارن مع حزام الأمان وبدونه. ثم حرّك دواسة الدراجة واضغط مكابحها اليدوية وتعرّف القوى المؤثرة فيها.',
    tags: 'حزام الأمان فرامل مكابح دراجة قصور احتكاك',
    tools: ['سيارة لعبة ودمية سائق', 'حزام أمان', 'دراجة هوائية'],
    steps: ['مشهد «السيارة»: اختر «بدون حزام» ثم اضغط «🛑 فرملة مفاجئة!» ولاحظ ما يحدث لجسم السائق.', 'اضغط «أعد القيادة»، واختر «مع حزام الأمان» (أو انقر السائق)، ثم افرمل مرة أخرى وقارن.', 'غيّر سرعة السيارة وكرّر: متى يكون الخطر أكبر؟', 'مشهد «الدراجة»: أدر الدواسة بالسحب حولها لتتحرك الدراجة، ثم اضغط مطولاً على المكابح اليدوية.', 'فعّل أسهم القوى وتعرّف: قوة القدم على الدواسة، قوة الأصابع على المكابح، قوة الاحتكاك، وزن الجسم.'],
    concl: ['عند توقف السيارة فجأة يستمر جسم السائق في التحرك إلى الأمام، فقد يصطدم بالمقود أو بلوحة الأجهزة الأمامية.', 'حزام الأمان يؤثر في جسم السائق بقوة تعاكس حركته فيتوقف مع السيارة بأمان — لذلك يجب ارتداء أحزمة الأمان.', 'عند ركوب الدراجة نطبق قوة بالقدم على الدواسة لتحريكها، ويطبق الإطار قوة على الأرض، وتطبق الأصابع قوة على المكابح اليدوية التي تؤثر بدورها بقوة في الإطارين، كما يدفع الجسم المقعد نحو الأسفل.'],
    laws: [],
    fact: ['تستطيع النملة سحب الأشياء بقوة تعادل تقريباً 0.01 N، وتستطيع السيارة الدفع بقوة 5000 N، بينما يندفع الصاروخ المتجه إلى الأعلى بقوة 30000000 N.', 'الجاذبية تحافظ على الفعاليات الحيوية وتوزيع السوائل في الأجسام، لذلك يعاني رواد الفضاء مشاكل في الدورة الدموية ويمارسون الرياضة كل يوم.', 'كلما كانت سرعة السيارة أكبر كان التوقف المفاجئ أخطر على الركاب غير المربوطين بالحزام.'],
    controls: [SEL('sc', 'المشهد', [['car', '🚗 السيارة'], ['bike', '🚲 الدراجة']], 'car', (v, S) => D.reset(S)),
      SEL('belt', 'حزام الأمان', [[1, 'مع حزام الأمان'], [0, 'بدون حزام']], 1),
      R('v0', 'سرعة السيارة', 20, 80, 50, 10, 'km/h', (v, S) => D.reset(S)),
      BT('', [{ t: '🛑 فرملة مفاجئة!', cls: 'bad', on: S => D.brake(S) }, { t: 'أعد القيادة', on: S => D.reset(S) }]),
      TG('arrows', 'أسهم القوى', true, null, 'force'), TG('vel', 'أسهم السرعة', true, null, 'velocity'), TG('labels', 'أسماء القوى', true, null, 'labels')],
    setup(S) { S.nDrag = 0; S.crashes = 0; D.reset(S); },
    reset(S) { S.v = S.p.v0 / 3.6; S.vb = S.v; S.dx = 0; S.br = 0; S.hit = 0; S.hitT = 0; S.wx = 0; S.beltF = 0; S.done = 0;
      S.bs = 0; S.crank = 0; S.bbr = 0; S.bbrT = 0; S.pedT = 0; S.bwx = 0; },
    brake(S) { if (S.p.sc !== 'car' || S.br || S.done) return; S.br = 1; },
    update(S, dt) { dt = Math.min(dt, .04);
      if (S.p.sc === 'car') { const belt = +S.p.belt;
        if (S.br) S.v = Math.max(0, S.v - 7.5 * dt);
        // body relative to the seat: free (inertia) unless belt or dashboard stops it
        let F = 0; if (belt) { F = 900 * Math.max(0, S.dx) + 60 * (S.vb - S.v); S.beltF = Math.max(0, F); S.vb -= Math.max(0, F) / 70 * dt; } else S.beltF = 0;
        if (!S.br) { S.vb = S.v; S.dx = Math.max(0, S.dx - dt * .5); }
        S.dx += (S.vb - S.v) * dt;
        if (!belt && S.dx >= .34 && !S.hit) { S.hit = 1; S.hitT = 1.2; S.crashes++; S.vb = S.v; S.dx = .34; C2.msg(S, '💥 اصطدم السائق بالمقود! لم يكن يرتدي الحزام', 3.5); }
        if (S.hit) { S.vb = S.v; }
        if (belt && S.vb < S.v) S.vb = S.v; if (belt) { S.dx = Math.min(S.dx, .07); if (S.v === 0) S.dx = Math.max(0, S.dx - dt * .1); }
        S.hitT = Math.max(0, S.hitT - dt); S.wx += S.v * dt;
        if (S.br && S.v === 0 && !S.done) { S.done = 1; if (belt) { K.cheer(S, S.W * .5, S.H * .35); C2.msg(S, '✅ الحزام أوقف جسم السائق مع السيارة بأمان', 3.5); } }
      } else { if (S.bbrT > 0) S.bbrT -= dt; S.pedT = Math.max(0, S.pedT - dt); const br = S.bbr || S.bbrT > 0; S.bs = Math.max(0, S.bs - (br ? 4 : .25) * dt); S.bwx += S.bs * dt; }
    },
    draw(ctx, w, h, S) { if (S.p.sc === 'bike') D.drawBike(ctx, w, h, S); else D.drawCar(ctx, w, h, S); K.party(ctx, S); },
    gC(S) { const w = S.W, h = S.H, s = clamp(Math.min(w / 700, h / 600), .75, 1.35), road = h * .66, cx = w * .5; return { w, h, s, road, cx, bb: { x: Math.max(76, w * .09) + 100, y: h * .84, w: 180, h: 46 } }; },
    drawCar(ctx, w, h, S) {
      const p = S.p, g = D.gC(S), s = g.s, cx = g.cx, rd0 = g.road; K.bg(ctx, w, h, { benchY: rd0, tiles: false, bench: false, top: '#bae6fd', bottom: '#e0f2fe' });
      K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(0, rd0, w, h - rd0); ctx.fillStyle = '#fef08a'; const off = (S.wx * 25) % 80; for (let x = -off; x < w; x += 80) ctx.fillRect(x, rd0 + 40, 44, 6); const toff = (S.wx * 25) % 300; for (let x = -toff; x < w + 60; x += 300) { ctx.fillStyle = '#92400e'; ctx.fillRect(x + 20, rd0 - 70, 10, 70); ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.arc(x + 25, rd0 - 84, 28, 0, TAU); ctx.fill(); } });
      // car body (cut-away)
      K.raw(ctx, () => { ctx.save(); ctx.translate(cx, rd0); ctx.scale(s, s);
        ctx.fillStyle = '#e11d48'; ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2 / s;
        ctx.beginPath(); ctx.moveTo(-150, -22); ctx.lineTo(-150, -70); ctx.lineTo(-110, -74); ctx.lineTo(-80, -140); ctx.lineTo(50, -140); ctx.lineTo(95, -80); ctx.lineTo(150, -72); ctx.lineTo(155, -22); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(224,242,254,.92)'; ctx.beginPath(); ctx.moveTo(-100, -78); ctx.lineTo(-74, -132); ctx.lineTo(46, -132); ctx.lineTo(86, -80); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#475569'; rr(ctx, -66, -74, 46, 10, 4); ctx.fill(); ctx.save(); ctx.translate(-56, -72); ctx.rotate(-.18); rr(ctx, -8, -52, 13, 54, 5); ctx.fill(); rr(ctx, -9, -64, 15, 12, 4); ctx.fill(); ctx.restore(); // seat (back reclined + head rest)
        ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.moveTo(40, -86); ctx.lineTo(86, -80); ctx.lineTo(90, -70); ctx.lineTo(40, -70); ctx.closePath(); ctx.fill(); // dashboard
        ctx.strokeStyle = '#111827'; ctx.lineWidth = 5 / s; ctx.beginPath(); ctx.moveTo(52, -84); ctx.lineTo(34, -104); ctx.stroke(); ctx.beginPath(); ctx.ellipse(32, -106, 5, 14, .5, 0, TAU); ctx.stroke(); // steering wheel
        ctx.fillStyle = S.br ? '#ef4444' : '#7f1d1d'; ctx.fillRect(-154, -66, 6, 12); ctx.fillStyle = '#fde047'; ctx.fillRect(149, -64, 6, 10);
        [-100, 105].forEach(wx => { ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(wx, -22, 24, 0, TAU); ctx.fill(); ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.arc(wx, -22, 11, 0, TAU); ctx.fill(); ctx.strokeStyle = '#374151'; ctx.lineWidth = 2.5 / s; for (let k = 0; k < 4; k++) { const a = S.wx / .35 + k * Math.PI / 2; ctx.beginPath(); ctx.moveTo(wx, -22); ctx.lineTo(wx + Math.cos(a) * 11, -22 + Math.sin(a) * 11); ctx.stroke(); } });
        // driver: hip at the seat, torso leans forward with dx
        // seated driver: back against the reclined seat, thighs forward, feet on the pedals, hands on the wheel
        const lean = clamp(S.dx * 2.4, 0, .95) - .16, hip = [-46 + S.dx * 30, -78]; const sh = [hip[0] + Math.sin(lean) * 32, hip[1] - Math.cos(lean) * 32]; const hd = [sh[0] + Math.sin(lean) * 13, sh[1] - Math.cos(lean) * 13];
        const knee = [hip[0] + 36, hip[1] - 4], foot = [Math.min(knee[0] + 14, 50), -38];
        ctx.lineCap = 'round'; ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(hip[0], hip[1]); ctx.lineTo(knee[0], knee[1]); ctx.lineTo(foot[0], foot[1]); ctx.stroke();
        ctx.fillStyle = '#111827'; rr(ctx, foot[0] - 4, foot[1] - 4, 14, 7, 3); ctx.fill(); ctx.fillStyle = '#6b7280'; ctx.fillRect(foot[0] + 8, foot[1] - 8, 4, 12); // shoe + pedal
        ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 15; ctx.beginPath(); ctx.moveTo(hip[0], hip[1]); ctx.lineTo(sh[0], sh[1]); ctx.stroke();
        ctx.strokeStyle = '#fcd9b6'; ctx.lineWidth = 5.5; ctx.beginPath(); ctx.moveTo(sh[0] + 2, sh[1] + 4); ctx.lineTo((sh[0] + 28) / 2 + 2, sh[1] + 12); ctx.lineTo(29, -104); ctx.stroke();
        ctx.fillStyle = '#fcd9b6'; ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(hd[0], hd[1], 10, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#3f2a1d'; ctx.beginPath(); ctx.arc(hd[0], hd[1] - 2.5, 10, Math.PI * 1.05, Math.PI * 1.95); ctx.fill();
        ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(hd[0] + 4.5, hd[1], 1.6, 0, TAU); ctx.fill(); ctx.lineCap = 'butt';
        if (+p.belt) { ctx.strokeStyle = '#111827'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(sh[0] - 6, sh[1] - 2); ctx.lineTo(hip[0] + 12, hip[1] - 4); ctx.moveTo(hip[0] - 6, hip[1] - 4); ctx.lineTo(hip[0] + 16, hip[1] - 4); ctx.stroke(); ctx.fillStyle = '#94a3b8'; ctx.fillRect(hip[0] + 10, hip[1] - 9, 8, 7); }
        if (S.hitT > 0) { ctx.fillStyle = `rgba(239,68,68,${S.hitT * .5})`; ctx.beginPath(); ctx.arc(34, -104, 30, 0, TAU); ctx.fill(); }
        ctx.restore(); });
      const tx = (x) => cx + x * s, ty = (y) => rd0 + y * s;
      if (S.hitT > 0) C2.T(ctx, '💥', tx(40), ty(-130), { s: 34 });
      // forces / velocities
      if (p.arrows) { if (S.br && S.v > 0) C2.force(ctx, tx(0), ty(12), -110, 0, p.labels ? 'قوة الفرامل على السيارة' : '', '#dc2626', 5);
        if (S.beltF > 5) C2.force(ctx, tx(-20 + S.dx * 30), ty(-150), -clamp(S.beltF * .12, 20, 90), 0, p.labels ? 'قوة الحزام على السائق' : '', '#2563eb', 4);
        if (S.hitT > 0) C2.force(ctx, tx(40), ty(-150), -90, 0, p.labels ? 'قوة المقود (اصطدام!)' : '', '#b91c1c', 6); }
      if (p.vel) { if (S.v > .1) { K.raw(ctx, () => G.arrow(ctx, tx(110), ty(-160), tx(110) + S.v * 6, ty(-160), '#16a34a', 4, 11)); C2.T(ctx, 'سرعة السيارة', tx(110) + S.v * 3, ty(-176), { s: 11.5, w: 800, c: '#15803d' }); }
        if (S.br && S.vb > S.v + .3) { K.raw(ctx, () => G.arrow(ctx, tx(-30), ty(-196), tx(-30) + S.vb * 6, ty(-196), '#f59e0b', 4, 11)); C2.T(ctx, 'جسم السائق يستمر بالحركة للأمام', tx(-30) + S.vb * 3, ty(-212), { s: 12, w: 900, c: '#b45309' }); } }
      C2.dial(ctx, w - 80, 70, 46, Math.round(S.v * 3.6), 100, 'عداد السرعة', 'km/h');
      const bb = g.bb; C2.btn(ctx, bb.x, bb.y, bb.w, bb.h, S.done ? '↻ أعد القيادة' : S.br ? 'تفرمل…' : '🛑 فرملة مفاجئة!', { col: S.done ? '#2563eb' : '#dc2626', on: S.br && !S.done });
      C2.T(ctx, +p.belt ? '✅ السائق يرتدي حزام الأمان (انقره للتغيير)' : '⚠️ السائق لا يرتدي الحزام (انقره للتغيير)', tx(0), ty(26) + 36, { s: 12.5, w: 900, c: '#fff', bg: +p.belt ? '#15803d' : '#b91c1c' });
      C2.drawMsg(ctx, S, cx, ty(-230));
    },
    gB(S) { const w = S.W, h = S.H, gy = h * .78, bx = w * .52, R = clamp(w * .07, 42, 62); const ccx = bx, ccy = gy - R, cr = R * .42; const pa = S.crank; return { w, h, gy, bx, R, ccx, ccy, cr, pd: [ccx + Math.cos(pa) * cr, ccy + Math.sin(pa) * cr], lever: [bx + R * 1.6, gy - R * 2.35 - 44] }; },
    drawBike(ctx, w, h, S) {
      const p = S.p, g = D.gB(S), R = g.R, bx = g.bx, gy = g.gy, br = S.bbr || S.bbrT > 0; K.bg(ctx, w, h, { benchY: gy, tiles: false, bench: false, top: '#bae6fd', bottom: '#f0f9ff' });
      K.raw(ctx, () => { ctx.fillStyle = '#65a30d'; ctx.fillRect(0, gy, w, h - gy); ctx.fillStyle = '#4d7c0f'; const off = (S.bwx * 40) % 60; for (let x = -off; x < w; x += 60) ctx.fillRect(x, gy + 14, 26, 4); const toff = (S.bwx * 40) % 260; for (let x = -toff; x < w + 60; x += 260) { ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.arc(x + 30, gy - 40, 30, 0, TAU); ctx.fill(); ctx.fillStyle = '#92400e'; ctx.fillRect(x + 26, gy - 16, 8, 16); } });
      const rw = [bx - R * 1.7, gy - R], fw = [bx + R * 1.7, gy - R], rot = S.bwx / (R / 100);
      C2.wheel(ctx, rw[0], rw[1], R, rot); C2.wheel(ctx, fw[0], fw[1], R, rot);
      const seat = [bx - R * .55, gy - R * 2.25], bar = [bx + R * 1.3, gy - R * 2.35];
      K.raw(ctx, () => { ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(rw[0], rw[1]); ctx.lineTo(g.ccx, g.ccy); ctx.lineTo(seat[0] + 4, seat[1] + 10); ctx.lineTo(rw[0], rw[1]); ctx.moveTo(seat[0] + 4, seat[1] + 10); ctx.lineTo(bar[0] - 10, bar[1] + 18); ctx.lineTo(g.ccx, g.ccy); ctx.moveTo(fw[0], fw[1]); ctx.lineTo(bar[0] - 6, bar[1]); ctx.stroke();
        ctx.fillStyle = '#111827'; rr(ctx, seat[0] - 16, seat[1] - 2, 34, 9, 4); ctx.fill(); ctx.strokeStyle = '#111827'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bar[0] - 8, bar[1]); ctx.lineTo(bar[0] + 14, bar[1] - 4); ctx.stroke();
        ctx.strokeStyle = br ? '#dc2626' : '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bar[0] + 6, bar[1] - 2); ctx.lineTo(g.lever[0] + 12, g.lever[1] + (br ? 8 : 14)); ctx.stroke();
        ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(g.ccx, g.ccy, 9, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(g.ccx, g.ccy); ctx.lineTo(g.pd[0], g.pd[1]); ctx.moveTo(g.ccx, g.ccy); ctx.lineTo(2 * g.ccx - g.pd[0], 2 * g.ccy - g.pd[1]); ctx.stroke(); ctx.fillStyle = '#111827'; rr(ctx, g.pd[0] - 10, g.pd[1] - 3, 20, 6, 2); ctx.fill(); rr(ctx, 2 * g.ccx - g.pd[0] - 10, 2 * g.ccy - g.pd[1] - 3, 20, 6, 2); ctx.fill();
        if (br) { ctx.fillStyle = '#dc2626'; [rw, fw].forEach(q => { ctx.fillRect(q[0] - 4, q[1] - R - 4, 8, 10); }); } });
      // rider
      K.raw(ctx, () => { const hip = [seat[0], seat[1] - 6], sh = [hip[0] + R * .55, hip[1] - R * 1.05], hd = [sh[0] + R * .22, sh[1] - R * .38]; ctx.lineCap = 'round';
        ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 9; const knee = [hip[0] + R * .55, hip[1] + R * .3]; ctx.beginPath(); ctx.moveTo(hip[0], hip[1]); ctx.lineTo(knee[0], knee[1]); ctx.lineTo(g.pd[0], g.pd[1] - 4); ctx.stroke();
        ctx.strokeStyle = '#facc15'; ctx.lineWidth = 15; ctx.beginPath(); ctx.moveTo(hip[0], hip[1]); ctx.lineTo(sh[0], sh[1]); ctx.stroke();
        ctx.strokeStyle = '#fcd9b6'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(sh[0], sh[1]); ctx.lineTo(bar[0] + 8, bar[1] - 4); ctx.stroke();
        ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(hd[0], hd[1], 12, 0, TAU); ctx.fill(); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(hd[0], hd[1] - 3, 14, Math.PI, 0); ctx.fill(); ctx.lineCap = 'butt'; });
      C2.btn(ctx, g.lever[0], g.lever[1], 76, 30, br ? 'مكابح ✊' : 'المكابح', { col: '#dc2626', on: br, s: 12 });
      // forces (like the book figure)
      const L = p.labels;
      if (p.arrows) { if (S.pedT > 0) C2.force(ctx, g.pd[0], g.pd[1] - 30, 0, 26, L ? 'قوة القدم على الدواسة' : '', '#ea580c', 4);
        if (br) C2.force(ctx, g.lever[0] - 50, g.lever[1] - 30, 30, 18, L ? 'قوة الأصابع على المكابح' : '', '#dc2626', 4);
        C2.force(ctx, seat[0], seat[1] - 2, 0, 50, '', '#7c3aed', 4); if (L) C2.T(ctx, 'وزن الجسم', seat[0] - 12, seat[1] + 30, { s: 12, w: 900, c: '#fff', bg: '#7c3aed', a: 'right' });
        if (S.bs > .05 || S.pedT > 0) { const dir = br ? -1 : 1; C2.force(ctx, rw[0], gy + 2, dir * 60, 0, '', '#0f766e', 4); if (br) C2.force(ctx, fw[0], gy + 2, -60, 0, '', '#0f766e', 4); if (L) C2.T(ctx, 'قوة الاحتكاك', rw[0] + dir * 30, gy + 22, { s: 12, w: 900, c: '#fff', bg: '#0f766e' }); } }
      if (p.vel && S.bs > .05) { K.raw(ctx, () => G.arrow(ctx, bx, gy - R * 3.6, bx + S.bs * 12, gy - R * 3.6, '#16a34a', 4, 11)); C2.T(ctx, 'v = ' + fmt(S.bs, 2) + ' m/s', bx - 10, gy - R * 3.6, { s: 12, w: 900, c: '#15803d', a: 'right' }); }
      C2.lines(ctx, [{ t: 'اسحب الدواسة في دائرة لتحريك الدراجة', w: 800 }, { t: 'اضغط «المكابح» مطولاً لإيقافها', w: 800 }, { t: br ? 'المكابح تؤثر بقوة في الإطارين فتتوقف الدراجة' : S.bs > .05 ? 'القدم تدفع الدواسة ← الإطار يدفع الأرض ← الدراجة تتحرك' : 'الدراجة ساكنة', c: '#0f766e', w: 900 }], w - 20, 14, Math.min(420, w * .6), { title: 'قوى في الحياة اليومية: الدراجة الهوائية', bd: '#0f766e' });
    },
    drags(S) {
      if (S.p.sc === 'bike') { const g = D.gB(S); return [
        { id: 'pedal', x: g.pd[0], y: g.pd[1], r: 20, cx: g.ccx, cy: g.ccy, tip: 'أدر الدواسة بقدمك (اسحب في دائرة)', idle: 'أدر الدواسة ✋', drag: (S, d) => { const da = d.dang || 0; S.crank += da; if (da > 0) { S.bs = Math.min(8, S.bs + da * 1.6); S.pedT = .5; } S.nDrag++; } },
        { id: 'lever', x: g.lever[0], y: g.lever[1], w: 76, h: 30, hint: false, tip: 'اضغط مطولاً على المكابح اليدوية', down: S => { S.bbr = 1; }, up: S => { S.bbr = 0; }, click: S => { S.bbrT = 1.5; } }]; }
      const g = D.gC(S), s = g.s; return [
        { id: 'brake', x: g.bb.x, y: g.bb.y, w: g.bb.w, h: g.bb.h, tip: 'فرملة مفاجئة!', idle: 'اضغط الفرامل فجأة ✋', click: S => { if (S.done) D.reset(S); else D.brake(S); } },
        { id: 'driver', x: g.cx - 10 * s, y: g.road - 110 * s, w: 70 * s, h: 80 * s, hint: false, tip: 'انقر لتلبس السائق حزام الأمان أو تنزعه', click: S => { if (S.br && !S.done) return; setParam(S, 'belt', +S.p.belt ? 0 : 1); } }];
    },
    readings(S) { if (S.p.sc === 'bike') return [rd('سرعة الدراجة', fmt(S.bs, 3) + ' m/s'), rd('المكابح', S.bbr || S.bbrT > 0 ? 'مضغوطة' : 'حرة')];
      return [rd('سرعة السيارة', fmt(S.v * 3.6, 3) + ' km/h'), rd('سرعة جسم السائق', fmt(S.vb * 3.6, 3) + ' km/h'), rd('اندفاع السائق للأمام', fmt(S.dx * 100, 3) + ' cm'), rd('النتيجة', S.hit ? '💥 اصطدم بالمقود' : S.done ? (+S.p.belt ? '✅ توقف بأمان مع السيارة' : 'توقف') : S.br ? 'تفرمل…' : 'تسير', 1)]; },
    explain(S) { if (S.p.sc === 'bike') return 'القدم تؤثر بقوة في <b>الدواسة</b>، والإطار يدفع الأرض فتدفعه الأرض بقوة <b>الاحتكاك</b> للأمام. الأصابع تضغط <b>المكابح</b> فتؤثر في الإطارين وتوقف الدراجة.';
      if (!S.br) return 'السيارة وجسم السائق يتحركان معاً بالسرعة نفسها. اضغط <b>فرملة مفاجئة</b> وراقب جسم السائق.';
      return +S.p.belt ? 'قوة الفرامل أوقفت السيارة، و<b>حزام الأمان</b> أثّر في جسم السائق بقوة إلى الخلف فتوقف معها بأمان.' : 'قوة الفرامل أثرت في السيارة فقط؛ أما <b>جسم السائق فيستمر في التحرك إلى الأمام</b> لعدم وجود قوة توقفه… حتى يصطدم بالمقود!'; },
    quiz: [
      { q: 'عندما تتوقف السيارة المسرعة فجأة، يستمر جسم السائق في التحرك إلى:', o: ['الخلف', 'الأمام', 'الأعلى'], a: 1, why: 'الفرامل تؤثر في السيارة، أما جسم السائق فيستمر في حركته ما لم تؤثر فيه قوة توقفه (ص 39).' },
      { q: 'لماذا يجب ارتداء حزام الأمان؟', o: ['ليزيد سرعة السيارة', 'ليؤثر في جسم السائق بقوة توقفه مع السيارة فيحميه من الاصطدام', 'ليقلل وزن السائق'], a: 1, why: 'الحزام يمنع اصطدام الجسم بالمقود أو بلوحة الأجهزة الأمامية.' },
      { q: 'أي مما يأتي ثلاث قوى تؤثر في طائرة نقل الركاب عندما تقلع إلى الأعلى؟', o: ['الوزن، وقوة دفع المحركات، ومقاومة الهواء', 'الكتلة، واللون، والحجم', 'الوزن فقط'], a: 0, why: 'سؤال التفكير الناقد (ص 41): الجاذبية تسحبها للأسفل، والمحركات تدفعها، والهواء يقاوم حركتها (ويرفعها أيضاً).' }
    ]
  };
  X7(D);
})();
