'use strict';
/* ====================== الخامس العلمي — الفصل الثالث: قوانين الحركة (ch 53, ص 51–73) ======================
   Merged experiments (book order): g11_c3_force (3-1) · g11_c3_first (3-2، القانون الأول) · g11_c3_second (القانون الثاني، الوزن والجذب العام)
   · g11_c3_third (القانون الثالث) · g11_c3_apps (3-4، 3-5: القوة العمودية والشد ومخطط الجسم الحر، مثال 1)
   · g11_c3_fric (3-6 الاحتكاك، مثالا 2 و 3) · g11_c3_review (أسئلة ومسائل ص 70–73).
   Local kit Q53 = Q42 + floors, blocks, horizontal spring balance, pulleys, ropes, force arrows. */
LW({ id: 'g11_l3_first', cat: 53, name: 'قانون نيوتن الأول (قانون القصور)', fx: 'Σ<i>F</i> = 0 ⟸ <i>v</i> = ثابت', sym: 'في حالة انعدام محصلة القوى الخارجية المؤثرة في الجسم: فإن الجسم الساكن يبقى ساكناً، والجسم المتحرك بسرعة منتظمة يبقى متحركاً بسرعته المنتظمة نفسها وبخط مستقيم. القصور الذاتي خاصية الجسم في مقاومة التغير في حالته الحركية ويعتمد على كتلته' });
LW({ id: 'g11_l3_second', cat: 53, name: 'قانون نيوتن الثاني', fx: 'Σ<i>F</i> = <i>m a</i> ، <i>a</i> = ' + FR('Σ<i>F</i>', '<i>m</i>'), sym: 'تعجيل الجسم يتناسب طردياً مع محصلة القوى المؤثرة فيه وبالاتجاه نفسه، وعكسياً مع كتلته. النيوتن: القوة التي إذا أثرت في جسم كتلته 1 kg أكسبته تعجيلاً مقداره 1 m/s² ، أي 1 N = 1 kg·m/s²', calc: { in: [['F', 'محصلة القوى ΣF', 'N', 12], ['m', 'الكتلة m', 'kg', 6]], out: 'التعجيل a', u: 'm/s²', f: v => v.F / v.m } });
LW({ id: 'g11_l3_weight', cat: 53, name: 'الوزن والكتلة', fx: '<i>w</i> = <i>m g</i>', sym: 'الوزن قوة جذب الأرض للجسم، كمية متجهة نحو مركز الأرض وتتغير من مكان لآخر، وتقاس بالنيوتن. الكتلة مقدار ثابت للجسم وتقاس بالكيلوغرام. g ≈ 10 m/s² على سطح الأرض', calc: { in: [['m', 'الكتلة m', 'kg', 60], ['g', 'تعجيل الجاذبية g', 'm/s²', 10]], out: 'الوزن w', u: 'N', f: v => v.m * v.g } });
LW({ id: 'g11_l3_grav', cat: 53, name: 'قانون الجذب العام', fx: '<i>F</i> = <i>G</i> ' + FR('<i>m</i><sub>1</sub> <i>m</i><sub>2</sub>', '<i>d</i>²'), sym: 'كل جسمين في الكون يتجاذبان بقوة تتناسب طردياً مع حاصل ضرب كتلتيهما وعكسياً مع مربع البعد بين مركزيهما. G = 6.67 × 10⁻¹¹ N·m²/kg² ثابت الجذب العام', calc: { in: [['m1', 'الكتلة الأولى m1', 'kg', 6e24], ['m2', 'الكتلة الثانية m2', 'kg', 60], ['d', 'البعد بين المركزين d', 'm', 6.4e6]], out: 'قوة الجذب F', u: 'N', f: v => 6.67e-11 * v.m1 * v.m2 / (v.d * v.d) } });
LW({ id: 'g11_l3_third', cat: 53, name: 'قانون نيوتن الثالث', fx: '<i>F</i><sub>12</sub> = − <i>F</i><sub>21</sub>', sym: 'لكل فعل رد فعل مساوٍ له في المقدار ومعاكس له في الاتجاه. قوتا الفعل ورد الفعل تقعان على خط فعل واحد، وتؤثران في جسمين مختلفين، لذلك لا تحدثان اتزاناً' });
LW({ id: 'g11_l3_normal', cat: 53, name: 'القوة العمودية', fx: '<i>N</i> = <i>W</i> ، <i>N</i> = <i>W</i> ± <i>F</i> sin<i>θ</i> ، <i>N</i> = <i>W</i> cos<i>θ</i>', sym: 'القوة التي يؤثر بها السطح في الجسم الموضوع عليه: عمودية دائماً على السطح ومتجهة بعيداً عنه، وهي قوة رد فعل مقدارها غير ثابت يساوي محصلة القوى المؤثرة عمودياً على السطح', calc: { in: [['m', 'الكتلة m', 'kg', 150], ['F', 'القوة المائلة F', 'N', 300], ['th', 'زاويتها فوق الأفق θ', '°', 37]], out: 'N = W − F sinθ', u: 'N', f: v => v.m * 10 - v.F * Math.sin(v.th * Math.PI / 180) } });
LW({ id: 'g11_l3_atwood', cat: 53, name: 'جسمان على بكرة', fx: '<i>a</i> = ' + FR('(<i>m</i><sub>2</sub> − <i>m</i><sub>1</sub>) <i>g</i>', '<i>m</i><sub>1</sub> + <i>m</i><sub>2</sub>') + ' ، <i>T</i> = <i>m</i><sub>1</sub> (<i>g</i> + <i>a</i>)', sym: 'جسمان معلقان بطرفي حبل خفيف يمر فوق بكرة مهملة الوزن والاحتكاك: الأثقل ينزل والأخف يصعد بالتعجيل نفسه، والشد متساوٍ على جانبي البكرة. مثال 1: 2 kg و 3 kg ⟸ a = 2 m/s² ، T = 24 N', calc: { in: [['m1', 'الكتلة الصاعدة m1', 'kg', 2], ['m2', 'الكتلة النازلة m2', 'kg', 3]], out: 'التعجيل a', u: 'm/s²', f: v => (v.m2 - v.m1) * 10 / (v.m1 + v.m2) } });
LW({ id: 'g11_l3_static', cat: 53, name: 'الاحتكاك السكوني', fx: '<i>f</i><sub>s</sub> ≤ <i>μ</i><sub>s</sub> <i>N</i>', sym: 'قوة الاحتكاك السكوني تساوي القوة المؤثرة وتعاكسها ما دام الجسم ساكناً، وتبلغ نهايتها العظمى μs N عندما يكون الجسم على وشك الحركة. μs معامل الاحتكاك السكوني', calc: { in: [['mu', 'معامل الاحتكاك السكوني μs', '', .18], ['N', 'القوة العمودية N', 'N', 1320]], out: 'أقصى احتكاك سكوني', u: 'N', f: v => v.mu * v.N } });
LW({ id: 'g11_l3_kinetic', cat: 53, name: 'الاحتكاك الحركي (الانزلاقي)', fx: '<i>f</i><sub>k</sub> = <i>μ</i><sub>k</sub> <i>N</i>', sym: 'قوة ثابتة ضمن حدود السرع الصغيرة تتناسب طردياً مع القوة العمودية، وهي أصغر من أقصى احتكاك سكوني. معامل الاحتكاك يعتمد على طبيعة السطحين المتلامسين ولا يعتمد على مساحتهما', calc: { in: [['mu', 'معامل الاحتكاك الحركي μk', '', .1], ['N', 'القوة العمودية N', 'N', 1140]], out: 'قوة الاحتكاك الحركي', u: 'N', f: v => v.mu * v.N } });

const Q53 = Object.assign(Object.create(Q42), {
  G: 10,
  ez(a, b, dt, k = 10) { return a + (b - a) * Math.min(1, dt * k); },
  f(v, d = 1) { let r = +(+v).toFixed(d); if (Object.is(r, -0) || Math.abs(r) < Math.pow(10, -d) / 2) r = 0; return r.toFixed(d).replace('-', '−'); },
  g(v, d = 2) { let r = +(+v).toFixed(d); if (Math.abs(r) < Math.pow(10, -d) / 2) r = 0; return String(r).replace('-', '−'); },
  bg(ctx, w, h) { G.bg(ctx, w, h, false); K.raw(ctx, () => { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#fff1f2'); g.addColorStop(1, '#e2e8f0'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }); },
  card(ctx, S, L, o) { return Q42.card(ctx, S, L, Object.assign({ bd: '#dc2626', y: 70, wd: 310 }, o || {})); },
  steps(ctx, S, st, o) { return Q42.steps(ctx, S, st, Object.assign({ y: 70, x: S.W - 12, wd: 320 }, o || {})); },
  stepChips(S, id, y, x0, lab, onEx, n = 9) { return Q43.stepChips(S, id, y, x0, lab, onEx, n); },
  drawSteps(ctx, list) { if (list[1]) list[1]._col = '#be185d'; Q42.drawChips(ctx, list); },
  play(S, id, y, run, onGo, onRe, o = {}) { return Q42.chips(S, id, [['go', run ? '⏸ أوقف' : (o.go || '▶ شغّل')], ['re', '↺ من البداية']].concat(o.more || []), y, '', (S2, k) => { if (k === 'go') onGo(S2); else if (k === 're') onRe(S2); else if (o.onMore) o.onMore(S2, k); }, { bw: o.bw || 150, x0: o.x0, col: '#dc2626' }); },
  /* force arrow from (x,y) by (dx,dy) */
  F(ctx, x, y, dx, dy, col, lab, o) { Q51.vec(ctx, x, y, x + dx, y + dy, col, lab, Object.assign({ w: 4 }, o || {})); },
  /* surface strip from x0 to x1, top at y */
  floor(ctx, x0, x1, y, kind = 'wood', hh = 16) {
    const C = { wood: ['#d6a46b', '#92400e'], ice: ['#e0f2fe', '#7dd3fc'], rough: ['#a8a29e', '#57534e'], smooth: ['#e2e8f0', '#94a3b8'], rubber: ['#4b5563', '#111827'], table: ['#b45309', '#78350f'] }[kind] || ['#d6a46b', '#92400e'];
    K.raw(ctx, () => { const g = ctx.createLinearGradient(0, y, 0, y + hh); g.addColorStop(0, C[0]); g.addColorStop(1, C[1]); ctx.fillStyle = g; ctx.fillRect(x0, y, x1 - x0, hh);
      ctx.strokeStyle = 'rgba(15,23,42,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
      if (kind === 'rough') { ctx.fillStyle = 'rgba(41,37,36,.45)'; for (let x = x0 + 3; x < x1; x += 7) ctx.fillRect(x, y + 2 + (x * 13 % 7), 2, 2); }
      if (kind === 'wood' || kind === 'table') { ctx.strokeStyle = 'rgba(120,53,15,.35)'; for (let k = 1; k < 3; k++) { ctx.beginPath(); ctx.moveTo(x0, y + hh * k / 3); for (let x = x0; x <= x1; x += 20) ctx.lineTo(x, y + hh * k / 3 + Math.sin(x / 31 + k) * 1.5); ctx.stroke(); } }
      if (kind === 'ice') { ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 2; for (let x = x0 + 20; x < x1; x += 70) { ctx.beginPath(); ctx.moveTo(x, y + 4); ctx.lineTo(x + 26, y + 4); ctx.stroke(); } } });
  },
  /* block with bottom-centre at (x,y), rotated rot (canvas radians) */
  block(ctx, x, y, w, h, col = '#f97316', lab, rot = 0, o = {}) {
    K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = 'rgba(15,23,42,.18)'; ctx.fillRect(-w / 2 + 3, -h + 4, w, h);
      const g = ctx.createLinearGradient(0, -h, 0, 0); g.addColorStop(0, shade(col, 30)); g.addColorStop(1, shade(col, -25)); ctx.fillStyle = g; rr(ctx, -w / 2, -h, w, h, o.r != null ? o.r : 4); ctx.fill();
      ctx.strokeStyle = shade(col, -50); ctx.lineWidth = 1.4; ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(-w / 2 + 4, -h + 4, w - 8, 3);
      if (o.brick) { ctx.strokeStyle = 'rgba(69,26,3,.55)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2); ctx.lineTo(w / 2, -h / 2); ctx.moveTo(0, -h); ctx.lineTo(0, -h / 2); ctx.moveTo(-w / 4, -h / 2); ctx.lineTo(-w / 4, 0); ctx.moveTo(w / 4, -h / 2); ctx.lineTo(w / 4, 0); ctx.stroke(); }
      ctx.restore(); });
    if (lab) { const c = Math.cos(rot), s = Math.sin(rot); Q42.T(ctx, lab, x + s * h / 2, y - c * h / 2, { s: o.ls || 12, w: 900, c: '#fff' }); }
  },
  /* horizontal spring balance: ring end at xa (pulled by hand), hook end at xb (attached to the object); F in N */
  hsb(ctx, xa, y, xb, F, Fmax = 20, o = {}) {
    const dir = xb > xa ? 1 : -1, Lc = o.len || 110, ext = clamp(F / Fmax, 0, 1.05) * (Lc - 34);
    K.raw(ctx, () => { ctx.save(); ctx.translate(xa, y); ctx.scale(dir, 1);
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.arc(-6, 0, 6, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(8, 0); ctx.stroke();
      const g = ctx.createLinearGradient(0, -12, 0, 12); g.addColorStop(0, '#fde68a'); g.addColorStop(.5, '#f59e0b'); g.addColorStop(1, '#b45309'); ctx.fillStyle = g; rr(ctx, 8, -12, Lc, 24, 7); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.fillStyle = '#fff'; rr(ctx, 14, -7, Lc - 12, 14, 3); ctx.fill(); ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1;
      for (let k = 0; k <= 10; k++) { const xx = 22 + (Lc - 34) * k / 10; ctx.beginPath(); ctx.moveTo(xx, -7); ctx.lineTo(xx, k % 5 ? -3 : 0); ctx.stroke(); }
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.2; ctx.beginPath(); for (let k = 0; k <= 16; k++) { const xx = 14 + (8 + ext) * k / 16; ctx.lineTo(xx, k % 2 ? 4 : -1); } ctx.stroke();
      ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(22 + ext, -7); ctx.lineTo(18 + ext, 2); ctx.lineTo(26 + ext, 2); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(22 + ext, 0); ctx.lineTo(Math.abs(xb - xa) - 6, 0); ctx.stroke(); ctx.beginPath(); ctx.arc(Math.abs(xb - xa) - 6, 4, 5, -Math.PI / 2, Math.PI * .7); ctx.stroke();
      ctx.restore(); });
    if (o.read !== false) Q42.T(ctx, Q53.f(F, o.d != null ? o.d : 1) + ' N', xa + dir * (8 + Lc / 2), y - 22, { s: 11.5, w: 900, c: '#0f172a', bg: 'rgba(254,243,199,.95)', mono: 1 });
  },
  pulley(ctx, x, y, r = 18, rot = 0, o = {}) {
    K.raw(ctx, () => { if (o.arm !== false) { ctx.strokeStyle = '#475569'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (o.ax || 0), y + (o.ay != null ? o.ay : -r - 12)); ctx.stroke(); }
      const g = ctx.createRadialGradient(x - r * .3, y - r * .3, 2, x, y, r); g.addColorStop(0, '#e2e8f0'); g.addColorStop(1, '#475569'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { const a = rot + k * TAU / 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * r * .8, y + Math.sin(a) * r * .8); ctx.stroke(); }
      ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(x, y, 3.5, 0, TAU); ctx.fill(); });
  },
  rope(ctx, pts, col = '#78350f', w = 2.4) { Q41.line(ctx, pts, col, w); },
  hand(ctx, x, y, dir = 1, s = .85, o) { C2.hand(ctx, x, y, dir, s, o || {}); },
  /* translucent panel */
  panel(ctx, x, y, w, h, title, col = '#dc2626') {
    K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.strokeStyle = col; ctx.lineWidth = 1.5; rr(ctx, x, y, w, h, 10); ctx.fill(); ctx.stroke(); });
    if (title) Q42.T(ctx, title, x + w / 2, y + 14, { s: 11.5, w: 900, c: col });
  },
  /* incline triangle: right-angle corner at (x0,y0) bottom-left … returns the slope geometry */
  wedge(ctx, xa, ya, xb, yb, col = '#d6a46b') {
    K.raw(ctx, () => { const g = ctx.createLinearGradient(xa, yb, xa, ya); g.addColorStop(0, shade(col, 15)); g.addColorStop(1, shade(col, -30)); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(xa, ya); ctx.lineTo(xb, ya); ctx.lineTo(xb, yb); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(69,26,3,.6)'; ctx.lineWidth = 1.4; ctx.stroke(); });
  }
});

/* =============== A1 — مفهوم القوة وأنواعها: دفع سحب شد كبس تدوير لي + القبان الحلزوني (3-1، الأشكال 1–5، ص 51–52) =============== */
(() => {
  const TY = [['push', 'دفع', 'm'], ['pull', 'سحب', 'm'], ['tens', 'شد', 's'], ['comp', 'كبس', 's'], ['rot', 'تدوير', 'm'], ['twist', 'لي', 's']];
  const FS = 4, M = 1.5; // static friction (N) and block mass (kg) for push / pull
  const D = { id: 'g11_n_force', page: 51, fig: 'الأشكال 1–5',
    desc: 'القوة هي المؤثر الذي يغير أو يحاول أن يغير الحالة الحركية للجسم أو شكله. القوة كمية متجهة لها مقدار واتجاه، ومن أنواعها: الدفع والسحب والشد والكبس والتدوير واللي. تقاس القوة بالقبان الحلزوني، ووحدتها النيوتن: 1 N = 1 kg·m/s².',
    tags: 'مفهوم القوة أنواع القوة دفع سحب شد كبس تدوير لي قبان حلزوني نيوتن قوى التماس كمية متجهة الشكل 1 الشكل 2 الشكل 4 الشكل 5',
    tools: ['قطعة خشب', 'قبان حلزوني', 'نابض محلزن', 'إسفنجة', 'عجلة', 'قضيب مطاطي'],
    steps: ['اختر نوع القوة من الأزرار في الأسفل.', 'اسحب يدك ✋ (المقبض الأحمر) وراقب ماذا يتغير: الحالة الحركية أم الشكل؟', 'في «سحب» اقرأ القبان الحلزوني: القطعة لا تتحرك حتى تزيد القوة على 4 N.', 'غيّر «أقصى قوة لليد» من اللوحة وقارن.'],
    concl: ['القوة مؤثر يغير أو يحاول أن يغير الحالة الحركية للجسم أو شكله.', 'القوة كمية متجهة، ووحدتها النيوتن: 1 N = 1 kg·m/s².', 'الدفع والسحب والتدوير تغير الحالة الحركية، والشد والكبس واللي تغير الشكل.', 'تقاس القوة بالقبان الحلزوني (الشكل 5)، وقوى التماس تحتاج إلى تلامس الجسمين.'],
    laws: ['g11_l3_second'],
    controls: [R('Fm', 'أقصى قوة لليد', 4, 20, 10, 1, 'N'), TG('vec', 'سهم القوة', true, null, 'force')],
    setup(S) { S.ty = 'pull'; S.u = 0; S.ut = 0; S.bx = 0; S.bv = 0; S.ang = 0; S.av = 0; S.hold = 0; },
    Fn(S) { return S.u * S.p.Fm; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 344, gy = h - 300; return { w, h, L, x0, x1, gy, cx: (x0 + x1) / 2 }; },
    update(S, dt) {
      S.u = Q53.ez(S.u, S.ut, dt, 9); if (!S.hold && (S.ty !== 'push' && S.ty !== 'pull')) S.ut = 0;
      const F = D.Fn(S);
      if (S.ty === 'push' || S.ty === 'pull') { let a = 0; if (Math.abs(S.bv) < 1e-3) { a = F > FS ? (F - FS * .8) / M : 0; } else a = (F - FS * .8 * Math.sign(S.bv)) / M; S.bv += a * dt; if (S.bv < 0) S.bv = 0; S.bx += S.bv * dt * 40; if (S.bx > 90) { S.bx = 90; S.bv = 0; } if (!S.hold) S.ut = 0; }
      if (S.ty === 'rot') { S.av += (F * 1.2 - S.av * .8) * dt; S.ang += S.av * dt; }
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), F = D.Fn(S), ty = S.ty, vec = S.p.vec; Q53.bg(ctx, w, h);
      Q53.panel(ctx, g.x0 - 6, 70, g.x1 - g.x0 + 12, g.gy + 60 - 70, ['push', 'pull'].includes(ty) ? 'القبان الحلزوني يقيس القوة — الشكل 5' : ty === 'tens' ? 'النابض المحلزن يستطيل — الشكل 2' : 'أنواع القوى — الشكل 4');
      if (ty === 'push' || ty === 'pull') {
        Q53.floor(ctx, g.x0, g.x1, g.gy, 'table', 18); const bx = g.x0 + 70 + S.bx, bw = 96, bh = 72; Q53.block(ctx, bx, g.gy, bw, bh, '#d97706', '1.5 kg', 0, { brick: 0 });
        if (ty === 'push') { const hx = bx - bw / 2 - 2; Q53.hand(ctx, hx, g.gy - 30, 1, .9); if (vec && F > .2) Q53.F(ctx, hx - 90, g.gy - 76, F * 7, 0, '#dc2626', 'F'); }
        else { const xa = bx + bw / 2 + 110; const ext = clamp(F / 20, 0, 1.05) * 76; Q53.hsb(ctx, xa + ext, g.gy - 30, bx + bw / 2, F, 20); Q53.hand(ctx, xa + ext + 14, g.gy - 30, -1, .9); if (vec && F > .2) Q53.F(ctx, bx - bw / 2, g.gy - 100, F * 7, 0, '#dc2626', 'F'); }
        if (Math.abs(F) > .1 && S.bv < 1e-3 && F <= FS) Q42.T(ctx, 'القوة تحاول تحريك القطعة لكنها لم تتحرك', g.cx, 112, { s: 12, w: 800, c: '#fff', bg: '#7c3aed' });
        if (S.bv > 1e-3) Q42.T(ctx, 'تغيرت الحالة الحركية: تحركت القطعة', g.cx, 112, { s: 12, w: 800, c: '#fff', bg: '#16a34a' });
      } else if (ty === 'tens') { // ش2: helical spring stretched
        const wx = g.x0 + 30, y = g.gy - 120, L0 = 150, ex = S.u * 140; K.raw(ctx, () => { ctx.fillStyle = '#64748b'; ctx.fillRect(wx - 16, y - 70, 16, 140); ctx.strokeStyle = '#334155'; for (let k = 0; k < 9; k++) { ctx.beginPath(); ctx.moveTo(wx - 16, y - 64 + k * 16); ctx.lineTo(wx - 26, y - 56 + k * 16); ctx.stroke(); } });
        K.raw(ctx, () => { ctx.save(); ctx.translate(wx, y); ctx.rotate(-Math.PI / 2); ctx.restore(); });
        D.hspring(ctx, wx, wx + L0 + ex, y); Q41.knob(ctx, wx + L0 + ex + 10, y, '#dc2626', 10); Q53.hand(ctx, wx + L0 + ex + 26, y, -1, .9);
        Q41.line(ctx, [[wx + L0, y + 34], [wx + L0, y + 50]], '#475569', 1.4); Q41.line(ctx, [[wx + L0 + ex, y + 34], [wx + L0 + ex, y + 50]], '#475569', 1.4); if (ex > 4) Q53.F(ctx, wx + L0, y + 44, ex, 0, '#0f766e', 'ΔL', { w: 2.4, flat: 1 });
        if (vec && F > .2) Q53.F(ctx, wx + L0 + ex + 12, y - 40, F * 5, 0, '#dc2626', 'F');
      } else if (ty === 'comp') { // كبس: sponge on the table squeezed by a hand
        Q53.floor(ctx, g.x0, g.x1, g.gy, 'table', 18); const H0 = 90, Hh = H0 * (1 - .55 * S.u), sx = g.cx, sw = 130 + 30 * S.u;
        K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, g.gy - Hh, 0, g.gy); gg.addColorStop(0, '#fde047'); gg.addColorStop(1, '#ca8a04'); ctx.fillStyle = gg; rr(ctx, sx - sw / 2, g.gy - Hh, sw, Hh, 10); ctx.fill(); ctx.fillStyle = 'rgba(146,64,14,.35)'; for (let k = 0; k < 26; k++) { const px = sx - sw / 2 + 8 + (k * 37 % (sw - 16)), py = g.gy - Hh + 6 + (k * 23 % Math.max(6, Hh - 12)); ctx.beginPath(); ctx.ellipse(px, py, 3, 2 * (1 - .4 * S.u), 0, 0, TAU); ctx.fill(); } });
        Q53.hand(ctx, sx, g.gy - Hh - 2, 1, .95, { rot: Math.PI / 2 }); if (vec && F > .2) Q53.F(ctx, sx + 70, g.gy - Hh - 60, 0, F * 4, '#dc2626', 'F');
        Q42.T(ctx, 'السمك: ' + Q53.f(Hh / 10, 1) + ' cm', sx + sw / 2 + 50, g.gy - 20, { s: 11, w: 800, c: '#334155' });
      } else if (ty === 'rot') { // تدوير: wheel with a crank
        const cx = g.cx, cy = g.gy - 150, r = 90; K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(cx - 6, cy, 12, g.gy - cy); ctx.fillRect(cx - 50, g.gy - 8, 100, 10); ctx.save(); ctx.translate(cx, cy); ctx.rotate(S.ang); const gw = ctx.createRadialGradient(0, 0, r * .6, 0, 0, r); gw.addColorStop(0, '#94a3b8'); gw.addColorStop(1, '#1e293b'); ctx.strokeStyle = gw; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(0, 0, r - 7, 0, TAU); ctx.stroke(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 4; for (let k = 0; k < 6; k++) { const a = k * TAU / 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * (r - 12), Math.sin(a) * (r - 12)); ctx.stroke(); } ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(r - 7, 0, 7, 0, TAU); ctx.fill(); ctx.restore(); ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(cx, cy, 8, 0, TAU); ctx.fill(); });
        const hx = cx + Math.cos(S.ang) * (r - 7), hy = cy + Math.sin(S.ang) * (r - 7); if (vec && F > .2) Q53.F(ctx, hx, hy, -Math.sin(S.ang) * F * 5 * -1, Math.cos(S.ang) * F * 5, '#dc2626', 'F');
        Q42.T(ctx, 'سرعة الدوران: ' + Q53.f(S.av, 1) + ' rad/s', cx, g.gy + 34, { s: 11, w: 800, c: '#334155' });
      } else { // لي: twisting a rubber bar
        const x0 = g.x0 + 40, x1 = g.x1 - 60, y = g.gy - 130, tw = S.u * 5 * Math.PI; K.raw(ctx, () => { ctx.fillStyle = '#64748b'; ctx.fillRect(x0 - 20, y - 50, 20, 100);
          const gr = ctx.createLinearGradient(0, y - 18, 0, y + 18); gr.addColorStop(0, '#fca5a5'); gr.addColorStop(.5, '#ef4444'); gr.addColorStop(1, '#7f1d1d'); ctx.fillStyle = gr; ctx.fillRect(x0, y - 18, x1 - x0, 36);
          ctx.save(); ctx.beginPath(); ctx.rect(x0, y - 18, x1 - x0, 36); ctx.clip(); ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 3; for (let k = -4; k < 22; k++) { ctx.beginPath(); for (let i = 0; i <= 30; i++) { const t = i / 30, ph = t * tw, xx = x0 + (k / 18) * (x1 - x0) + Math.sin(ph) * 0 + t * 0, yy = y - 18 + t * 36; ctx.lineTo(xx + (yy - y) * 0 + Math.tan(Math.min(1.2, tw / 18)) * (yy - y) * ((xx - x0) / (x1 - x0)) , yy); } ctx.stroke(); } ctx.restore(); });
        Q53.hand(ctx, x1 + 30, y, -1, .9, { rot: S.u * 1.2 }); K.raw(ctx, () => { ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x1 + 10, y, 18, 34, 0, -1.2, 1.2); ctx.stroke(); });
        Q42.T(ctx, 'زاوية اللي: ' + Math.round(S.u * 180) + '°', (x0 + x1) / 2, y + 60, { s: 11.5, w: 800, c: '#334155' });
      }
      const T = TY.find(q => q[0] === ty), mv = T[2] === 'm';
      Q53.card(ctx, S, [{ t: 'القوة: ' + T[1], c: '#dc2626', w: 900 }, { t: 'F = ' + Q53.f(F, 1) + ' N', mono: 1, w: 900 }, { t: mv ? 'أثرها: تغير أو تحاول تغيير الحالة الحركية' : 'أثرها: تغير شكل الجسم', c: mv ? '#2563eb' : '#0f766e', w: 800 }, { t: 'القوة كمية متجهة لها مقدار واتجاه', c: '#475569' }, { t: '1 N = 1 kg·m/s²', mono: 1, c: '#7c3aed', w: 900 }, { t: ty === 'pull' ? 'القبان الحلزوني يقيس القوة بالنيوتن' : 'هذه من قوى التماس', c: '#b45309', w: 800 }], { title: 'مفهوم القوة' });
      Q42.drawChips(ctx, D.chips(S, g)); Q42.banner(ctx, w, 'اسحب المقبض الأحمر ✋ لتؤثر بقوة', '#dc2626');
    },
    hspring(ctx, xa, xb, y) { K.raw(ctx, () => { const n = 14, r = 16; for (let pass = 0; pass < 2; pass++) { ctx.strokeStyle = pass ? '#cbd5e1' : '#475569'; ctx.lineWidth = pass ? 1.2 : 2.8; ctx.beginPath(); for (let i = 0; i <= n * 24; i++) { const t = i / (n * 24), ph = t * n * TAU; ctx.lineTo(xa + t * (xb - xa) + Math.cos(ph) * 3 - pass * .8, y + Math.sin(ph) * r - pass * .8); } ctx.stroke(); } }); },
    chips(S, g) { return Q42.chips(S, 'ty', TY.map(q => [q[0], q[1]]), g.h - 84, S.ty, (S2, k) => { S2.ty = k; S2.u = 0; S2.ut = 0; S2.bx = 0; S2.bv = 0; S2.av = 0; }, { bw: 100, col: '#dc2626' }).concat(Q42.chips(S, 'rs', [['re', '↺ أعد القطعة']], g.h - 128, '', S2 => { S2.bx = 0; S2.bv = 0; S2.ang = 0; S2.av = 0; }, { bw: 140 })); },
    handle(S, g) { const ty = S.ty, ext = S.u; if (ty === 'pull') { const bx = g.x0 + 70 + S.bx; return { x: bx + 48 + 110 + clamp(D.Fn(S) / 20, 0, 1.05) * 76 + 14, y: g.gy - 30, axis: 'x' }; }
      if (ty === 'push') return { x: g.x0 + 70 + S.bx - 48 - 30, y: g.gy - 30, axis: 'x' }; if (ty === 'tens') return { x: g.x0 + 30 + 150 + ext * 140 + 10, y: g.gy - 120, axis: 'x' };
      if (ty === 'comp') return { x: g.cx, y: g.gy - 90 * (1 - .55 * ext) - 20, axis: 'y' }; if (ty === 'rot') return { x: g.cx + 120, y: g.gy - 150, axis: 'y' }; return { x: g.x1 - 30, y: g.gy - 130 - 40 + 0, axis: 'y' }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), Hd = D.handle(S, g);
      const it = { id: 'hand', x: Hd.x, y: Hd.y, r: 24, axis: Hd.axis, keep: true, tip: 'اسحب لتؤثر بقوة', idle: 'اسحب ✋', down: S2 => { S2.hold = 1; }, up: S2 => { S2.hold = 0; },
        drag: (S2, d) => { S2.hold = 1; const ty = S2.ty; let u = 0; const bx = g.x0 + 70 + S2.bx;
          if (ty === 'pull') u = (d.x - (bx + 48 + 110 + 14)) / 76 * 20 / S2.p.Fm; else if (ty === 'push') u = (d.x - (bx - 78)) / 50 + .6; else if (ty === 'tens') u = (d.x - (g.x0 + 190)) / 140; else if (ty === 'comp') u = (g.gy - 110 - d.y) / -60; else u = (g.gy - 130 - d.y) / -80 * (ty === 'rot' ? -1 : 1) + (ty === 'rot' ? 0 : .5);
          if (ty === 'rot') u = Math.abs(d.y - (g.gy - 150)) / 80; S2.ut = clamp(u, 0, 1); } };
      return [it].concat(D.chips(S, g)); },
    readings(S) { const T = TY.find(q => q[0] === S.ty); return [rd('نوع القوة', T[1]), rd('مقدار القوة F', Q53.f(D.Fn(S), 1) + ' N'), rd('الأثر', T[2] === 'm' ? 'يغير الحالة الحركية' : 'يغير الشكل')]; },
    explain(S) { return Q26.ex('كل قوة تؤثر بها يدك إما تحرك الجسم أو تحاول تحريكه، أو تغير شكله: النابض يستطيل، والإسفنجة تنكبس، والقضيب يلتوي.', 'القوة مؤثر يغير أو يحاول أن يغير الحالة الحركية للجسم أو شكله. وهي كمية متجهة: أثرها يعتمد على مقدارها واتجاهها. القطعة لا تتحرك حتى تتغلب القوة على الاحتكاك.', 'عند ركل الكرة تتغير حالتها الحركية (الشكل 1)، والحصان يسحب الزلاجة (الشكل 3).'); }
  };
  M8.P[D.id] = D;
})();

/* =============== A2 — القوى الأساسية في الطبيعة: الجاذبية والكهربائية والمغناطيسية والنووية (الأشكال 6–9، ص 52–53) =============== */
(() => {
  const MD = [['grav', 'الجاذبية'], ['elec', 'الكهربائية'], ['mag', 'المغناطيسية'], ['strong', 'النووية القوية'], ['weak', 'النووية الضعيفة']];
  const INFO = { grav: ['قوة الجذب بين الشمس والأرض', 'قوة جذب الكوكب للجسم = وزن الجسم', 'تؤثر عن بعد دون تلامس'], elec: ['المشط المدلوك بالصوف يكتسب شحنة', 'فيجذب قصاصات الورق الصغيرة', 'قوة كهربائية تؤثر عن بعد'], mag: ['المغناطيس يجذب قطع الحديد', 'ولا يجذب الخشب والبلاستك', 'قوة مغناطيسية تؤثر عن بعد'], strong: ['تربط مكونات النواة النيوكلونات', 'رغم تنافر البروتونات الموجبة', 'أقوى القوى ومداها قصير جداً'], weak: ['مسؤولة عن انحلال بيتا', 'نيوترون يتحول إلى بروتون', 'ويخرج إلكترون من النواة'] };
  const NUC = []; for (let i = 0; i < 14; i++) { const a = i * 2.4, r = 10 + Math.sqrt(i) * 13; NUC.push([Math.cos(a) * r, Math.sin(a) * r, i % 2]); }
  const D = { id: 'g11_n_field', page: 52, fig: 'الأشكال 6–9',
    desc: 'إضافة إلى قوى التماس توجد قوى أساسية في الطبيعة تؤثر عن بعد: قوة الجاذبية (بين الشمس والأرض، وقوة جذب الكوكب للجسم هي وزنه)، والقوة الكهربائية (المشط المدلوك بالصوف يجذب قصاصات الورق)، والقوة المغناطيسية (المغناطيس يجذب قطع الحديد)، والقوة النووية القوية التي تربط مكونات النواة، والنووية الضعيفة المسؤولة عن انحلال بيتا.',
    tags: 'القوى الأساسية الجاذبية الشمس الأرض الوزن القوة الكهربائية مشط صوف قصاصات ورق القوة المغناطيسية حديد مغناطيس القوة النووية القوية النيوكلونات الضعيفة انحلال بيتا الشكل 6 الشكل 7 الشكل 8 الشكل 9',
    tools: ['مشط', 'قطعة صوف', 'قصاصات ورق', 'مغناطيس', 'قطع حديد', 'قطع خشب وبلاستك'],
    steps: ['اختر القوة من الأزرار في الأسفل.', 'الجاذبية: اسحب الأرض بعيداً عن الشمس أو قربها وراقب سهمي القوة.', 'الكهربائية: اضغط «ادلك المشط بالصوف» ثم قرّب المشط من القصاصات. المغناطيسية: قرّب المغناطيس من القطع.', 'النووية: اضغط زر التجربة وراقب النواة.'],
    concl: ['قوة الجاذبية تؤثر بين أي جسمين، وقوة جذب الكوكب للجسم تمثل وزنه.', 'المشط المدلوك بالصوف يجذب قصاصات الورق: قوة كهربائية.', 'المغناطيس يجذب قطع الحديد ولا يجذب الخشب: قوة مغناطيسية.', 'القوة النووية القوية تربط النيوكلونات في النواة، والضعيفة مسؤولة عن انحلال بيتا.'],
    laws: ['g11_l3_grav'],
    controls: [R('k', 'شدة التأثير', 1, 3, 2, 1, ''), TG('vec', 'أسهم القوة', true, null, 'force')],
    setup(S) { S.md = 'grav'; S.ex = .62; S.ey = 0; S.etx = .62; S.ety = 0; S.cx = .5; S.cy = -200; S.ctx_ = .5; S.cty = -200; S.rub = 0; S.rubT = 0; S.off = 0; S.decay = 0; D.reset(S); },
    reset(S) { S.bits = []; for (let i = 0; i < 10; i++) S.bits.push({ fx: .18 + i * .07, dy: -4 - (i % 3) * 3, st: 0, ox: (i % 5 - 2) * 9, oy: (i % 2) * 6 }); S.clips = []; for (let i = 0; i < 9; i++) S.clips.push({ fx: .15 + i * .08, dy: -6, st: 0, iron: i % 3 !== 2, ox: (i % 4 - 1.5) * 10, oy: (i % 2) * 7 }); S.nuc = NUC.map(q => ({ x: q[0], y: q[1], vx: 0, vy: 0, p: q[2] })); S.off = 0; S.decay = 0; S.rub = 0; S.rubT = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 344, gy = h - 300; return { w, h, L, x0, x1, gy, pw: x1 - x0, cx: (x0 + x1) / 2, cy: (70 + gy) / 2 }; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S), k = S.p.k;
      S.ex = Q53.ez(S.ex, S.etx, dt, 12); S.ey = Q53.ez(S.ey, S.ety, dt, 12); S.cx = Q53.ez(S.cx, S.ctx_, dt, 12); S.cy = Q53.ez(S.cy, S.cty, dt, 12);
      if (S.rub && S.rubT < 1) S.rubT = Math.min(1, S.rubT + dt * .8);
      const mx = g.x0 + S.cx * g.pw, my = g.gy + S.cy;
      if (S.md === 'elec') S.bits.forEach(b => { const bx = g.x0 + b.fx * g.pw, by = g.gy + b.dy; if (!b.st && S.rubT >= 1 && Math.hypot(mx - bx, my + 14 - by) < 50 + 30 * k) b.st = 1; if (b.st) { const tx = (mx - g.x0 + b.ox) / g.pw, ty = my + 16 + b.oy - g.gy; b.fx = Q53.ez(b.fx, tx, dt, 8); b.dy = Q53.ez(b.dy, ty, dt, 8); } });
      if (S.md === 'mag') S.clips.forEach(b => { const bx = g.x0 + b.fx * g.pw, by = g.gy + b.dy; if (b.iron && !b.st && Math.hypot(mx - bx, my + 20 - by) < 50 + 35 * k) b.st = 1; if (b.st) { const tx = (mx - g.x0 + b.ox) / g.pw, ty = my + 22 + b.oy - g.gy; b.fx = Q53.ez(b.fx, tx, dt, 8); b.dy = Q53.ez(b.dy, ty, dt, 8); } });
      if (S.md === 'strong') S.nuc.forEach((n, i) => { if (S.off) { if (n.p) { const r = Math.hypot(n.x, n.y) || 1; n.vx += n.x / r * 260 * dt; n.vy += n.y / r * 260 * dt; } else { n.vx += n.x * .3 * dt; n.vy += n.y * .3 * dt; } n.x += n.vx * dt; n.y += n.vy * dt; const bx = g.pw / 2 - 16, by = (g.gy - 70) / 2 - 40; if (Math.abs(n.x) > bx) { n.x = Math.sign(n.x) * bx; n.vx = 0; } if (Math.abs(n.y) > by) { n.y = Math.sign(n.y) * by; n.vy = 0; } } else { n.x = Q53.ez(n.x, NUC[i][0], dt, 5); n.y = Q53.ez(n.y, NUC[i][1], dt, 5); n.vx = n.vy = 0; } });
      if (S.md === 'weak' && S.decay) S.decay = Math.min(3, S.decay + dt);
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), md = S.md, k = S.p.k; Q53.bg(ctx, w, h);
      if (md === 'grav') { K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, 70, 0, g.gy + 60); gg.addColorStop(0, '#0f172a'); gg.addColorStop(1, '#1e1b4b'); ctx.fillStyle = gg; rr(ctx, g.x0 - 6, 70, g.pw + 12, g.gy - 10, 10); ctx.fill(); ctx.fillStyle = '#fff'; for (let i = 0; i < 40; i++) { ctx.globalAlpha = .3 + (i * 37 % 10) / 14; ctx.fillRect(g.x0 + (i * 97 % g.pw), 80 + (i * 61 % (g.gy - 40)), 1.6, 1.6); } ctx.globalAlpha = 1; });
        const sx = g.x0 + 70, sy = g.cy, ex = g.x0 + S.ex * g.pw, ey = g.cy + S.ey, d = Math.hypot(ex - sx, ey - sy), F = clamp(k * 1.6e6 / (d * d), 8, 110), ux = (ex - sx) / d, uy = (ey - sy) / d;
        K.raw(ctx, () => { const gs = ctx.createRadialGradient(sx, sy, 4, sx, sy, 60); gs.addColorStop(0, '#fff7ae'); gs.addColorStop(.5, '#fbbf24'); gs.addColorStop(1, 'rgba(249,115,22,0)'); ctx.fillStyle = gs; ctx.beginPath(); ctx.arc(sx, sy, 60, 0, TAU); ctx.fill(); ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(sx, sy, 36, 0, TAU); ctx.fill();
          const ge = ctx.createRadialGradient(ex - 5, ey - 5, 2, ex, ey, 16); ge.addColorStop(0, '#93c5fd'); ge.addColorStop(.6, '#2563eb'); ge.addColorStop(1, '#14532d'); ctx.fillStyle = ge; ctx.beginPath(); ctx.arc(ex, ey, 16, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(148,163,184,.35)'; ctx.setLineDash([4, 5]); ctx.beginPath(); ctx.arc(sx, sy, d, 0, TAU); ctx.stroke(); ctx.setLineDash([]); });
        Q42.T(ctx, 'الشمس', sx, sy + 52, { s: 12, w: 900, c: '#fde68a' }); Q42.T(ctx, 'الأرض', ex, ey + 30, { s: 12, w: 900, c: '#bfdbfe' });
        if (S.p.vec) { Q53.F(ctx, ex - ux * 18, ey - uy * 18, -ux * F, -uy * F, '#f87171', 'F'); Q53.F(ctx, sx + ux * 38, sy + uy * 38, ux * F, uy * F, '#f87171', 'F'); }
        Q42.T(ctx, 'كلما ابتعدت الأرض قلّت قوة الجذب', g.cx, g.gy + 34, { s: 11.5, w: 800, c: '#334155' });
      } else if (md === 'elec' || md === 'mag') {
        Q53.panel(ctx, g.x0 - 6, 70, g.pw + 12, g.gy + 60 - 70, md === 'elec' ? 'المشط يجذب قصاصات الورق — الشكل 7' : 'المغناطيس يجذب قطع الحديد — الشكل 8');
        Q53.floor(ctx, g.x0, g.x1, g.gy, 'table', 18); const mx = g.x0 + S.cx * g.pw, my = g.gy + S.cy;
        if (md === 'elec') { S.bits.forEach(b => { const bx = g.x0 + b.fx * g.pw, by = g.gy + b.dy; K.raw(ctx, () => { ctx.save(); ctx.translate(bx, by); ctx.rotate(b.ox * .05); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#94a3b8'; ctx.fillRect(-6, -3, 12, 6); ctx.strokeRect(-6, -3, 12, 6); ctx.restore(); }); });
          K.raw(ctx, () => { const gc = ctx.createLinearGradient(0, my - 14, 0, my + 14); gc.addColorStop(0, '#60a5fa'); gc.addColorStop(1, '#1d4ed8'); ctx.fillStyle = gc; rr(ctx, mx - 70, my - 16, 140, 16, 5); ctx.fill(); for (let x = mx - 66; x < mx + 66; x += 5) ctx.fillRect(x, my - 2, 2.6, 14); });
          if (S.rubT > 0 && S.rubT < 1) K.raw(ctx, () => { const wx = mx - 60 + 120 * Math.abs(Math.sin(S.rubT * 12)); ctx.fillStyle = '#f5f5f4'; ctx.beginPath(); ctx.ellipse(wx, my - 14, 26, 14, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#a8a29e'; ctx.stroke(); });
          if (S.rubT >= 1) for (let i = 0; i < 7; i++) Q42.T(ctx, '−', mx - 60 + i * 20, my - 22, { s: 13, w: 900, c: '#1d4ed8' });
          Q42.T(ctx, S.rubT >= 1 ? 'مشط مشحون' : 'مشط غير مشحون', mx + 70, my - 40, { a: 'right', s: 11, w: 900, c: '#fff', bg: S.rubT >= 1 ? '#1d4ed8' : '#64748b' });
        } else { S.clips.forEach(b => { const bx = g.x0 + b.fx * g.pw, by = g.gy + b.dy; K.raw(ctx, () => { ctx.save(); ctx.translate(bx, by); ctx.rotate(b.ox * .06); if (b.iron) { ctx.strokeStyle = '#475569'; ctx.lineWidth = 2.2; ctx.beginPath(); rr(ctx, -9, -4, 18, 8, 4); ctx.stroke(); } else { ctx.fillStyle = b.fx * 10 % 2 > 1 ? '#d6a46b' : '#f472b6'; ctx.fillRect(-9, -5, 18, 10); } ctx.restore(); }); });
          K.raw(ctx, () => { ctx.save(); ctx.translate(mx, my); ctx.fillStyle = '#dc2626'; ctx.fillRect(-50, -16, 50, 32); ctx.fillStyle = '#2563eb'; ctx.fillRect(0, -16, 50, 32); ctx.strokeStyle = '#0f172a'; ctx.strokeRect(-50, -16, 100, 32); ctx.restore(); });
          Q42.T(ctx, 'N', mx - 25, my, { s: 14, w: 900, c: '#fff' }); Q42.T(ctx, 'S', mx + 25, my, { s: 14, w: 900, c: '#fff' });
          Q42.T(ctx, 'حديد يُجذب، خشب وبلاستك لا', g.cx, g.gy + 36, { s: 11.5, w: 800, c: '#334155' }); }
      } else {
        K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; rr(ctx, g.x0 - 6, 70, g.pw + 12, g.gy - 10, 10); ctx.fill(); });
        Q42.T(ctx, md === 'strong' ? 'القوة النووية القوية — الشكل 9a' : 'انحلال بيتا — الشكل 9b', g.cx, 86, { s: 11.5, w: 900, c: '#fca5a5' });
        const cx = g.cx, cy = g.cy; S.nuc.forEach((n, i) => { const isP = md === 'weak' ? (n.p || (S.decay > 0 && i === 3)) : n.p; K.raw(ctx, () => { const gn = ctx.createRadialGradient(cx + n.x - 3, cy + n.y - 3, 1, cx + n.x, cy + n.y, 13); gn.addColorStop(0, isP ? '#fecaca' : '#e2e8f0'); gn.addColorStop(1, isP ? '#dc2626' : '#64748b'); ctx.fillStyle = gn; ctx.beginPath(); ctx.arc(cx + n.x, cy + n.y, 13, 0, TAU); ctx.fill(); }); if (isP) Q42.T(ctx, '+', cx + n.x, cy + n.y, { s: 12, w: 900, c: '#fff' }); });
        if (md === 'strong' && !S.off && S.p.vec) K.raw(ctx, () => { ctx.strokeStyle = 'rgba(250,204,21,.65)'; ctx.lineWidth = 1.4; for (let i = 0; i < NUC.length; i++) for (let j = i + 1; j < NUC.length; j++) { const a = S.nuc[i], b = S.nuc[j]; if (Math.hypot(a.x - b.x, a.y - b.y) < 30) { ctx.beginPath(); ctx.moveTo(cx + a.x, cy + a.y); ctx.lineTo(cx + b.x, cy + b.y); ctx.stroke(); } } });
        if (md === 'strong') Q42.T(ctx, S.off ? 'بدون القوة القوية تتنافر البروتونات وتتفكك النواة' : 'نوى مترابطة: بروتونات + نيوترونات', g.cx, g.gy - 20, { s: 11.5, w: 800, c: '#fff', bg: S.off ? '#dc2626' : '#15803d' });
        if (md === 'weak' && S.decay > 0) { const n = S.nuc[3], t = S.decay, exx = cx + n.x + t * 80, eyy = cy + n.y - t * 40; K.raw(ctx, () => { ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(exx, eyy, 6, 0, TAU); ctx.fill(); ctx.fillStyle = '#a3e635'; ctx.beginPath(); ctx.arc(cx + n.x - t * 70, cy + n.y + t * 50, 4, 0, TAU); ctx.fill(); }); Q42.T(ctx, 'e⁻', exx + 14, eyy - 10, { s: 12, w: 900, c: '#38bdf8' }); Q42.T(ctx, 'ν̄', cx + n.x - t * 70 - 12, cy + n.y + t * 50 + 10, { s: 12, w: 900, c: '#a3e635' }); Q42.T(ctx, 'نيوترون ← بروتون + إلكترون', g.cx, g.gy - 20, { s: 11.5, w: 800, c: '#fff', bg: '#7c3aed' }); }
      }
      Q53.card(ctx, S, INFO[md].map((t, i) => ({ t, c: i ? '#334155' : '#dc2626', w: i ? 700 : 900 })), { title: 'القوة ' + MD.find(q => q[0] === md)[1] });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.a);
      Q42.banner(ctx, w, { grav: 'اسحب الأرض ✋', elec: 'ادلك المشط ثم قرّبه من القصاصات', mag: 'اسحب المغناطيس نحو القطع', strong: 'اضغط الزر وراقب النواة', weak: 'اضغط «انحلال بيتا»' }[md], '#dc2626');
    },
    chips(S, g) { const md = S.md, A = { grav: [['re', '↺ أعد الأرض']], elec: [['rub', '🧶 ادلك المشط بالصوف'], ['re', '↺ أعد القصاصات']], mag: [['re', '↺ أعد القطع']], strong: [['off', S.off ? '↺ أعد القوة النووية' : 'أوقف القوة النووية تخيلياً']], weak: [['dec', S.decay ? '↺ أعد النواة' : '☢ انحلال بيتا']] }[md];
      return { m: Q42.chips(S, 'md', MD, g.h - 84, md, (S2, k) => { S2.md = k; D.reset(S2); }, { bw: 118, col: '#dc2626' }),
        a: Q42.chips(S, 'act', A, g.h - 128, '', (S2, k) => { if (k === 'rub') { S2.rub = 1; S2.rubT = 0; } else if (k === 'off') { if (S2.off) D.reset(S2); else S2.off = 1; } else if (k === 'dec') { if (S2.decay) D.reset(S2); else S2.decay = .01; } else { D.reset(S2); S2.etx = .62; S2.ety = 0; S2.ctx_ = .5; S2.cty = -200; } }, { bw: 200 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), out = [];
      if (S.md === 'grav') out.push({ id: 'earth', x: g.x0 + S.ex * g.pw, y: g.cy + S.ey, r: 22, axis: 'xy', keep: true, tip: 'اسحب الأرض', idle: 'اسحب ✋', drag: (S2, d) => { S2.etx = clamp((d.x - g.x0) / g.pw, .38, .95); S2.ety = clamp(d.y - g.cy, -150, 150); } });
      if (S.md === 'elec' || S.md === 'mag') out.push({ id: 'tool', x: g.x0 + S.cx * g.pw, y: g.gy + S.cy, r: 26, axis: 'xy', keep: true, tip: 'اسحب', idle: 'اسحب ✋', drag: (S2, d) => { S2.ctx_ = clamp((d.x - g.x0) / g.pw, .15, .85); S2.cty = clamp(d.y - g.gy, -300, -40); } });
      return out.concat(C.m, C.a); },
    readings(S) { const md = S.md; const r = [rd('القوة', MD.find(q => q[0] === md)[1])]; if (md === 'elec') r.push(rd('قصاصات منجذبة', S.bits.filter(b => b.st).length + ' / 10')); if (md === 'mag') r.push(rd('قطع منجذبة', S.clips.filter(b => b.st).length + ' / 9')); return r; },
    explain(S) { return Q26.ex('الأرض تنجذب نحو الشمس، والقصاصات تقفز نحو المشط المدلوك، وقطع الحديد تلتصق بالمغناطيس، والنواة تبقى متماسكة.', 'هذه قوى أساسية تؤثر عن بعد دون تلامس: الجاذبية بين الكتل، والكهربائية بين الشحنات، والمغناطيسية بين المغناطيس والحديد، والنووية القوية تربط النيوكلونات رغم تنافر البروتونات، والضعيفة تسبب انحلال بيتا.', 'وزن جسمك هو قوة جذب الأرض لك.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B1 — مستويا غاليلو المائلان: القصور الذاتي (3-2، الشكل 10 a,b,c، ص 53) =============== */
(() => {
  const PX = 100, SLOW = .45, A1 = 35 * Math.PI / 180; // px per metre, slow motion, first incline angle
  const D = { id: 'g11_n_galileo', page: 53, fig: 'الشكل 10 a,b,c',
    desc: 'تأمل غاليلو كرة تتدحرج على سطح مائل أملس ثم تصعد سطحاً مائلاً آخر: وجد أنها ترتفع تقريباً إلى الارتفاع نفسه الذي بدأت منه. وكلما قلّ ميل السطح الثاني قطعت مسافة أكبر لتصل إلى الارتفاع نفسه، وإذا جُعل السطح الثاني أفقياً استمرت الكرة بالحركة بلا توقف إذا انعدم الاحتكاك. فالجسم يقاوم التغير في حالته الحركية: القصور الذاتي.',
    tags: 'غاليلو مستويان مائلان القصور الذاتي الاحتكاك نفس الارتفاع الكرة تستمر بلا توقف الشكل 10',
    tools: ['سطحان مائلان أملسان', 'كرة'],
    steps: ['اسحب الكرة على السطح الأيسر لتحديد ارتفاع البداية ثم اضغط «▶ أفلت الكرة».', 'راقب: إلى أي ارتفاع تصعد الكرة على السطح الأيمن؟ (الخط المتقطع).', 'قلّل ميل السطح الأيمن (اسحب طرفه أو اختر «الشكل 10b»): المسافة تزداد والارتفاع نفسه.', 'اختر «الشكل 10c» السطح الأفقي: الكرة تستمر بلا توقف. شغّل «احتكاك حقيقي» وقارن.'],
    concl: ['بانعدام الاحتكاك ترتفع الكرة على السطح الثاني إلى الارتفاع نفسه تقريباً الذي بدأت منه.', 'كلما قلّ ميل السطح الثاني ازدادت المسافة التي تقطعها الكرة.', 'على السطح الأفقي تستمر الكرة بالحركة بلا توقف بانعدام الاحتكاك.', 'القصور الذاتي: خاصية الجسم في مقاومة التغير في حالته الحركية.'],
    laws: ['g11_l3_first'],
    controls: [R('th', 'ميل السطح الثاني', 0, 60, 35, 5, '°'), R('h0', 'ارتفاع البداية', .4, 1.2, 1, .1, 'm'), TG('fr', 'احتكاك حقيقي', false, null, 'fire'), TG('strobe', 'صور ومضية', true, null, 'camera')],
    setup(S) { S.run = 0; S.s = 0; S.v = 0; S.th = 35; S.off = 0; S.hmax = 0; S.dmax = 0; S.trail = []; S.tk = 0; S.inf = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 24, gy = h - 230, H = 1.2 * PX; const xa = x0 + H / Math.tan(A1), xb = xa + 40; return { w, h, L, x0, x1, gy, H, xa, xb }; },
    L1(g) { return g.H / Math.sin(A1); },
    s0(S, g) { return D.L1(g) - S.p.h0 * PX / Math.sin(A1); },
    L3(S, g) { const th = S.th * Math.PI / 180; return th < .01 ? 1e9 : Math.min((g.x1 - g.xb) / Math.cos(th), (g.H + 10) / Math.sin(th)); },
    pos(S, g, s) { const L1 = D.L1(g), th = S.th * Math.PI / 180; if (s < L1) return [g.x0 + s * Math.cos(A1), g.gy - g.H + s * Math.sin(A1), A1]; s -= L1; if (s < 40) return [g.xa + s, g.gy, 0]; s -= 40; return [g.xb + s * Math.cos(th), g.gy - s * Math.sin(th), -th]; },
    reset(S) { S.run = 0; S.s = D.s0(S, D.geo(S)); S.v = 0; S.hmax = 0; S.dmax = 0; S.trail = []; S.tk = 0; S.inf = 0; S.off = 0; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); S.th = Q53.ez(S.th, S.p.th, dt, 8); if (!S.run) { S.s = Q53.ez(S.s, D.s0(S, g), dt, 12); return; }
      const n = 8, h = dt * SLOW / n; for (let i = 0; i < n; i++) { const p = D.pos(S, g, S.s), gs = Q53.G * PX; let a = gs * Math.sin(p[2]); if (S.p.fr) a -= .06 * gs * Math.cos(p[2]) * Math.sign(S.v || 1); S.v += a * h; S.s += S.v * h; if (S.s < 0) { S.s = 0; S.v = Math.abs(S.v) * .5; }
        const L3 = D.L3(S, g), Ltot = D.L1(g) + 40 + L3; if (S.s > Ltot) { S.s = Ltot; S.inf = 1; S.off += S.v * h; if (S.p.fr) { S.v -= .06 * gs * h; if (S.v < 0) S.v = 0; } } else S.inf = 0;
        if (S.p.fr && Math.abs(S.v) < 3 && Math.abs(Math.sin(p[2])) < .06 * Math.cos(p[2])) S.v = 0; }
      const p = D.pos(S, g, S.s), hh = (g.gy - p[1]) / PX; if (S.s > D.L1(g) + 40) { S.hmax = Math.max(S.hmax, hh); S.dmax = Math.max(S.dmax, (S.s - D.L1(g) - 40) / PX); }
      S.tk += dt; if (S.tk > .12) { S.tk = 0; S.trail.push([p[0], p[1]]); if (S.trail.length > 40) S.trail.shift(); } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), th = S.th * Math.PI / 180, L3 = D.L3(S, g); Q53.bg(ctx, w, h);
      K.raw(ctx, () => { const sg = ctx.createLinearGradient(0, 250, 0, g.gy); sg.addColorStop(0, 'rgba(186,230,253,.0)'); sg.addColorStop(1, 'rgba(186,230,253,.5)'); ctx.fillStyle = sg; ctx.fillRect(g.x0, 250, g.x1 - g.x0, g.gy - 250); });
      // first incline
      K.raw(ctx, () => { ctx.fillStyle = '#e7c08a'; ctx.beginPath(); ctx.moveTo(g.x0, g.gy); ctx.lineTo(g.x0, g.gy - g.H); ctx.lineTo(g.xa, g.gy); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.x0, g.gy - g.H); ctx.lineTo(g.xa, g.gy); ctx.lineTo(g.xb, g.gy); ctx.stroke(); });
      // second incline (or horizontal)
      const ex = g.xb + Math.min(L3, 4000) * Math.cos(th), ey = g.gy - Math.min(L3, 4000) * Math.sin(th), xe = Math.min(ex, g.x1), ye = th < .01 ? g.gy : ey;
      K.raw(ctx, () => { ctx.fillStyle = '#e7c08a'; ctx.beginPath(); ctx.moveTo(g.xb, g.gy); ctx.lineTo(xe, ye); ctx.lineTo(xe, g.gy); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g.xb, g.gy); ctx.lineTo(xe, ye); ctx.stroke(); });
      Q53.floor(ctx, g.x0 - 10, g.x1 + 10, g.gy, S.p.fr ? 'wood' : 'smooth', 14);
      if (S.inf && th < .01) K.raw(ctx, () => { ctx.fillStyle = 'rgba(15,23,42,.35)'; for (let x = g.x0 + (-(S.off % 40) + 40) % 40; x < g.x1; x += 40) ctx.fillRect(x, g.gy + 4, 16, 4); });
      if (th > .01) Q51.arc(ctx, g.xb, g.gy, 34, 0, S.th, '#7c3aed', Math.round(S.th) + '°');
      Q51.arc(ctx, g.xa, g.gy, 34, 180 - 35, 180, '#0f766e', '35°');
      // release height
      const hy = g.gy - S.p.h0 * PX; Q51.dash(ctx, [[g.x0, hy], [g.x1, hy]], '#dc2626', 1.4); Q42.T(ctx, 'ارتفاع البداية ' + Q53.f(S.p.h0, 1) + ' m', g.x1 - 80, hy - 14, { s: 11, w: 800, c: '#dc2626', bg: 'rgba(255,255,255,.85)' });
      if (S.p.strobe) S.trail.forEach((q, i) => { K.raw(ctx, () => { ctx.globalAlpha = .12 + .5 * i / S.trail.length; }); K.ball(ctx, q[0], q[1] - 11, 9, '#f97316'); K.raw(ctx, () => { ctx.globalAlpha = 1; }); });
      const p = D.pos(S, g, S.s), nx = Math.sin(p[2]), ny = -Math.cos(p[2]); K.ball(ctx, p[0] + nx * 12, p[1] + ny * 12, 12, '#ea580c');
      if (S.run && Math.abs(S.v) > 5) Q53.F(ctx, p[0] + nx * 12, p[1] + ny * 12 - 26, Math.cos(p[2]) * Math.sign(S.v) * clamp(Math.abs(S.v) / 6, 14, 60), Math.sin(p[2]) * Math.sign(S.v) * clamp(Math.abs(S.v) / 6, 14, 60), '#2563eb', 'v', { w: 3 });
      if (S.hmax > 0 && th > .01) { const yy = g.gy - S.hmax * PX; Q51.dash(ctx, [[g.xb, yy], [g.x1, yy]], '#16a34a', 1.4); Q42.T(ctx, 'أقصى ارتفاع ' + Q53.f(S.hmax, 2) + ' m', g.x1 - 70, yy + 14, { s: 11, w: 800, c: '#16a34a', bg: 'rgba(255,255,255,.85)' }); }
      if (S.inf) Q42.T(ctx, S.p.fr ? 'الاحتكاك يبطئ الكرة حتى تتوقف' : 'بلا احتكاك: الكرة تستمر بلا توقف ←', (g.xb + g.x1) / 2, g.gy - 40, { s: 12, w: 900, c: '#fff', bg: S.p.fr ? '#b45309' : '#16a34a' });
      Q53.card(ctx, S, [{ t: 'ارتفاع البداية = ' + Q53.f(S.p.h0, 2) + ' m', c: '#dc2626', w: 800 }, { t: th > .01 ? 'أقصى ارتفاع على السطح الثاني = ' + Q53.f(S.hmax, 2) + ' m' : 'السطح الثاني أفقي', c: '#16a34a', w: 800 }, { t: th > .01 ? 'المسافة على السطح الثاني = ' + Q53.f(S.dmax, 2) + ' m' : 'المسافة: بلا نهاية بانعدام الاحتكاك', c: '#7c3aed', w: 800 }, { t: 'كلما قلّ الميل زادت المسافة', c: '#334155' }, { t: 'القصور الذاتي: مقاومة الجسم لتغيير حالته الحركية', c: '#0f766e', w: 900 }], { title: 'تجربة غاليلو' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.f); Q42.drawChips(ctx, C.p);
      Q42.banner(ctx, w, 'اسحب الكرة أو طرف السطح الأيمن ثم أفلت الكرة', '#dc2626');
    },
    chips(S, g) { return { f: Q42.chips(S, 'fig', [['a', 'الشكل 10a ميل كبير', 45], ['b', 'الشكل 10b ميل أقل', 20], ['c', 'الشكل 10c أفقي', 0]].map(q => [q[0], q[1]]), g.h - 84, { 45: 'a', 20: 'b', 0: 'c' }[S.p.th] || '', (S2, k) => { setParam(S2, 'th', { a: 45, b: 20, c: 0 }[k]); D.reset(S2); }, { bw: 190, col: '#dc2626' }),
      p: Q53.play(S, 'pl', g.h - 128, S.run, S2 => { if (!S2.run && (S2.v === 0 && S2.s !== D.s0(S2, g))) D.reset(S2); S2.run = S2.run ? 0 : 1; }, S2 => D.reset(S2), { go: '▶ أفلت الكرة' }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), p = D.pos(S, g, S.s), th = S.th * Math.PI / 180, L3 = Math.min(D.L3(S, g), 4000);
      const out = [{ id: 'ball', x: p[0], y: p[1] - 12, r: 20, axis: 'xy', keep: true, tip: 'اسحب الكرة لتحديد ارتفاع البداية', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'h0', clamp(Math.round((g.gy - d.y) / PX * 10) / 10, .4, 1.2)); D.reset(S2); } },
        { id: 'ramp', x: Math.min(g.xb + L3 * Math.cos(th), g.x1) - 6, y: th < .01 ? g.gy : g.gy - L3 * Math.sin(th), r: 18, axis: 'y', keep: true, hint: false, tip: 'اسحب لتغيير الميل', drag: (S2, d) => { const dx = g.x1 - g.xb, a = Math.atan2(g.gy - d.y, dx) * 180 / Math.PI; setParam(S2, 'th', clamp(Math.round(a / 5) * 5, 0, 60)); } }];
      return out.concat(C.f, C.p); },
    readings(S) { return [rd('ميل السطح الثاني', Math.round(S.p.th) + '°'), rd('ارتفاع البداية', Q53.f(S.p.h0, 2) + ' m'), rd('أقصى ارتفاع', Q53.f(S.hmax, 2) + ' m'), rd('المسافة على السطح الثاني', Q53.f(S.dmax, 2) + ' m')]; },
    record(S) { return { th: Math.round(S.p.th), h: Q53.f(S.hmax, 2), d: Q53.f(S.dmax, 2) }; },
    cols: [['th', 'الميل (°)'], ['h', 'أقصى ارتفاع (m)'], ['d', 'المسافة (m)']],
    explain(S) { return Q26.ex('بلا احتكاك تصعد الكرة إلى ارتفاع البداية نفسه مهما كان ميل السطح الثاني، لكن المسافة تزداد كلما قلّ الميل، وعلى السطح الأفقي لا تتوقف أبداً.', 'لا توجد قوة محصلة توقف الكرة على السطح الأفقي الأملس، فتبقى محافظة على حالتها الحركية: هذا هو القصور الذاتي. الاحتكاك قوة خارجية هي التي توقف الأجسام في حياتنا اليومية.', 'الكرة على أرض ملعب خشنة تتوقف سريعاً، وعلى الجليد تقطع مسافة أطول بكثير.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B2 — نشاط القصور الذاتي: القنينة والحلقة والقلم (الشكل 13 a,b,c، ص 55) =============== */
(() => {
  const RR = 52, NECK = 13, MU = 300; // ring radius px, bottle neck radius px, friction accel (px/s²)
  const D = { id: 'g11_n_inertia', page: 55, fig: 'الشكل 13 a,b,c',
    desc: 'نشاط القصور الذاتي: نضع القنينة شاقولياً، والحلقة المعدنية الخفيفة الملساء شاقولياً فوق فوهتها، والقلم شاقولياً فوق الحلقة. نضرب الحلقة بسرعة بقوة أفقية من منتصفها فتنزاح جانباً ويسقط القلم داخل القنينة.',
    tags: 'نشاط القصور الذاتي قنينة حلقة معدنية ملساء قلم ضربة سريعة القانون الأول نيوتن الشكل 13',
    tools: ['قلم', 'حلقة ملساء خفيفة من معدن', 'قنينة'],
    steps: ['اسحب الإصبع ✋ إلى اليسار ثم اتركه ليضرب الحلقة (أو اضغط «اضرب الحلقة»).', 'بضربة سريعة: تنزاح الحلقة ويسقط القلم داخل القنينة (الشكل 13c).', 'اختر «دفع بطيء» وكرر: ماذا يحدث للقلم؟', 'غيّر سرعة الضربة من اللوحة وابحث عن أقل سرعة تنجح بها التجربة.'],
    concl: ['الحلقة تحركت بتعجيل بينما بقي القلم ساكناً لحظياً لعدم وجود قوة احتكاك كافية تؤثر فيه.', 'لعدم وجود قوة أفقية تؤثر في القلم يستمر في سكونه، ثم يسقط داخل القنينة بفعل الجاذبية.', 'الدفع البطيء يعطي الاحتكاك وقتاً لتحريك القلم مع الحلقة فيسقط خارج القنينة.', 'الجسم الساكن يبقى ساكناً ما لم تؤثر فيه قوة محصلة: قانون القصور.'],
    laws: ['g11_l3_first'],
    controls: [R('v', 'سرعة الضربة', .2, 6, 4, .2, 'm/s'), TG('vec', 'أسهم القوى', true, null, 'force')],
    setup(S) { D.reset(S); S.pull = 0; },
    reset(S) { S.st = 0; S.xr = 0; S.yr = 0; S.vr = 0; S.vry = 0; S.xp = 0; S.vp = 0; S.yp = 0; S.vyp = 0; S.tilt = 0; S.res = ''; S.tt = 0; S.fx = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), cx = L + 24 + (w - 344 - L - 24) / 2, gy = h - 200; return { w, h, L, cx, gy, my: gy - 190 }; },
    strike(S) { D.reset(S); S.st = 1; S.vr = S.p.v * 160; S.fx = .25; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); S.fx = Math.max(0, S.fx - dt); if (!S.st) { S.pull = Q53.ez(S.pull, S.pullT || 0, dt, 12); return; }
      const n = 10, h = dt * .5 / n; for (let i = 0; i < n; i++) { S.tt += h;
        // ring: slides on the mouth until it leaves, then falls
        const onMouth = Math.abs(S.xr) < RR + NECK; if (onMouth && S.yr === 0) { if (S.p.v < 2) { S.vr = S.p.v * 160; S.fx = .05; } else S.vr -= 40 * h; } else { S.vry += 1000 * h; S.yr += S.vry * h; if (S.yr > g.gy - g.my) { S.yr = g.gy - g.my; S.vry = 0; S.vr = Math.max(0, S.vr - 900 * h); } } S.xr += Math.max(0, S.vr) * h; const xm = (S.W - 344) - g.cx - RR - 4; if (S.xr > xm) { S.xr = xm; S.vr = 0; }
        // pen: dragged by friction while the ring top is under it
        const support = S.yp === 0 && S.yr === 0 && Math.abs(S.xr - S.xp) < RR * .55;
        if (support) { S.vp = S.vp < S.vr ? Math.min(S.vr, S.vp + MU * h) : Math.max(S.vr, S.vp - MU * h); }
        else { S.vyp += 1000 * h; const into = Math.abs(S.xp) < NECK - 4; const floorY = into ? (g.gy - 30) - (g.my - 2 * RR) : (g.gy) - (g.my - 2 * RR) - 8; S.yp = Math.min(floorY, S.yp + S.vyp * h); if (!into) S.tilt = Math.min(Math.PI / 2, S.tilt + h * 6); if (S.yp >= floorY) { S.vp = 0; S.res = into ? 'in' : 'out'; } }
        S.xp += S.vp * h; if (!support && S.yp > 0 && Math.abs(S.xp) < NECK - 4) S.vp *= .9; }
      if (S.res && S.yr >= g.gy - g.my) S.st = 2; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), cx = g.cx, my = g.my; Q53.bg(ctx, w, h); Q53.floor(ctx, Q42.L(S) + 24, w - 344, g.gy, 'table', 22);
      // bottle (glass)
      K.raw(ctx, () => { const bw = 110, bt = g.gy - 140; const gg = ctx.createLinearGradient(cx - bw / 2, 0, cx + bw / 2, 0); gg.addColorStop(0, 'rgba(22,163,74,.55)'); gg.addColorStop(.3, 'rgba(187,247,208,.45)'); gg.addColorStop(.7, 'rgba(22,163,74,.35)'); gg.addColorStop(1, 'rgba(20,83,45,.6)'); ctx.fillStyle = gg; ctx.strokeStyle = 'rgba(20,83,45,.8)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(cx - NECK - 3, my); ctx.lineTo(cx - NECK - 3, my + 50); ctx.quadraticCurveTo(cx - bw / 2, bt - 10, cx - bw / 2, bt + 10); ctx.lineTo(cx - bw / 2, g.gy - 6); ctx.quadraticCurveTo(cx - bw / 2, g.gy, cx - bw / 2 + 8, g.gy); ctx.lineTo(cx + bw / 2 - 8, g.gy); ctx.quadraticCurveTo(cx + bw / 2, g.gy, cx + bw / 2, g.gy - 6); ctx.lineTo(cx + bw / 2, bt + 10); ctx.quadraticCurveTo(cx + bw / 2, bt - 10, cx + NECK + 3, my + 50); ctx.lineTo(cx + NECK + 3, my); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(cx - bw / 2 + 10, bt + 20, 6, g.gy - bt - 40); ctx.fillStyle = '#14532d'; ctx.fillRect(cx - NECK - 5, my - 4, 2 * NECK + 10, 6); });
      // ring (vertical circle standing on the mouth)
      const rx = cx + S.xr, ry = my - RR + S.yr; K.raw(ctx, () => { ctx.save(); ctx.translate(rx, ry); ctx.rotate(S.yr > 0 ? S.xr / 60 : 0); const gr = ctx.createLinearGradient(-RR, -RR, RR, RR); gr.addColorStop(0, '#f1f5f9'); gr.addColorStop(.5, '#94a3b8'); gr.addColorStop(1, '#475569'); ctx.strokeStyle = gr; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(0, 0, RR, 0, TAU); ctx.stroke(); ctx.restore(); });
      // pen
      const px = cx + S.xp, py = my - 2 * RR + S.yp; K.raw(ctx, () => { ctx.save(); ctx.translate(px, py); ctx.rotate(S.tilt * Math.sign(S.xp || 1)); const gp = ctx.createLinearGradient(-5, 0, 5, 0); gp.addColorStop(0, '#1d4ed8'); gp.addColorStop(.5, '#60a5fa'); gp.addColorStop(1, '#1e3a8a'); ctx.fillStyle = gp; ctx.fillRect(-5, -110, 10, 96); ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.moveTo(-5, -14); ctx.lineTo(5, -14); ctx.lineTo(0, 0); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.fillRect(-5, -116, 10, 8); ctx.restore(); });
      // finger
      const fxp = cx - RR - 24 - S.pull * 90 + (S.fx > 0 ? 18 + (S.p.v < 2 && S.yr === 0 ? S.xr : 0) : 0); if (!S.st || S.fx > 0) Q53.hand(ctx, fxp, ry, 1, .85);
      if (S.p.vec && S.fx > 0) Q53.F(ctx, cx - RR - 10, ry - 70, 80, 0, '#dc2626', 'F');
      if (S.p.vec && S.st === 1 && S.yp === 0 && Math.abs(S.xr - S.xp) < RR * .55 && S.vp < S.vr) Q53.F(ctx, px - 30, py - 60, 26, 0, '#b45309', 'f', { w: 2.4 });
      if (S.res) Q42.T(ctx, S.res === 'in' ? 'سقط القلم داخل القنينة ✓' : 'سقط القلم خارج القنينة ✗', cx, 90, { s: 13, w: 900, c: '#fff', bg: S.res === 'in' ? '#16a34a' : '#dc2626' });
      Q53.card(ctx, S, [{ t: 'سرعة الضربة = ' + Q53.f(S.p.v, 1) + ' m/s', c: '#dc2626', w: 900 }, { t: S.p.v >= 2 ? 'ضربة سريعة: الحلقة تفلت بسرعة' : 'دفع بطيء: الاحتكاك يسحب القلم', c: '#334155', w: 800 }, { t: 'نستنتج:', c: '#0f766e', w: 900 }, { t: '1) الحلقة تحركت بتعجيل والقلم بقي ساكناً لحظياً لعدم وجود قوة احتكاك كافية', c: '#0f172a' }, { t: '2) لعدم وجود قوة تؤثر في القلم يستمر في سكونه ثم يسقط بفعل الجاذبية', c: '#0f172a' }], { title: 'نشاط القصور الذاتي' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.a);
      Q42.banner(ctx, w, 'اسحب الإصبع ✋ إلى اليسار ثم اتركه', '#dc2626');
    },
    chips(S, g) { return { a: Q42.chips(S, 'act', [['hit', '👊 اضرب الحلقة'], ['fast', 'ضربة سريعة'], ['slow', 'دفع بطيء'], ['re', '↺ أعد الترتيب']], g.h - 84, S.p.v >= 2 ? 'fast' : 'slow', (S2, k) => { if (k === 'hit') D.strike(S2); else if (k === 're') D.reset(S2); else { setParam(S2, 'v', k === 'fast' ? 5 : .4); D.reset(S2); } }, { bw: 150, col: '#dc2626' }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), ry = g.my - RR;
      return [{ id: 'finger', x: g.cx - RR - 50 - S.pull * 90, y: ry, r: 26, axis: 'x', keep: true, tip: 'اسحب إلى اليسار ثم اترك', idle: 'اسحب ✋', down: S2 => { if (S2.st) D.reset(S2); }, drag: (S2, d) => { S2.pullT = clamp((g.cx - RR - 50 - d.x) / 90, 0, 1); setParam(S2, 'v', Math.max(.2, Math.round(S2.pullT * 30) / 5)); }, up: S2 => { if (S2.pullT > .05) D.strike(S2); S2.pullT = 0; } }].concat(C.a); },
    readings(S) { return [rd('سرعة الضربة', Q53.f(S.p.v, 1) + ' m/s'), rd('إزاحة القلم الأفقية', Q53.f(S.xp / 100 * 10, 1) + ' cm'), rd('النتيجة', S.res === 'in' ? 'داخل القنينة' : S.res === 'out' ? 'خارج القنينة' : '—')]; },
    record(S) { return { v: Q53.f(S.p.v, 1), r: S.res === 'in' ? 'داخل' : S.res === 'out' ? 'خارج' : '—' }; },
    cols: [['v', 'سرعة الضربة (m/s)'], ['r', 'مكان سقوط القلم']],
    explain(S) { return Q26.ex('بالضربة السريعة تنزاح الحلقة جانباً ويسقط القلم شاقولياً داخل القنينة، أما بالدفع البطيء فيتحرك القلم مع الحلقة ويسقط خارجها.', 'زمن تلامس الحلقة بالقلم في الضربة السريعة قصير جداً، فلا تستطيع قوة الاحتكاك الصغيرة أن تكسب القلم سرعة تذكر، فيستمر القلم في سكونه (القصور الذاتي) ثم تسحبه الجاذبية إلى الأسفل.', 'سحب مفرش المائدة بسرعة من تحت الأطباق يتركها في مكانها.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== B3 — قانون نيوتن الأول: الراكب في السيارة + الكتلة والقصور (الأشكال 11 و 12 a,b,c و 14، ص 53–56) =============== */
(() => {
  const MD = [['start', 'انطلاق مفاجئ 12a'], ['stop', 'توقف مفاجئ 12b'], ['turn', 'منعطف 12c'], ['mass', 'الكتلة والقصور 11']];
  const D = { id: 'g11_n_car', page: 54, fig: 'الأشكال 11 و 12 a,b,c',
    desc: 'قانون نيوتن الأول (قانون القصور): في حالة انعدام محصلة القوى الخارجية المؤثرة في الجسم فإن الجسم الساكن يبقى ساكناً والمتحرك بسرعة منتظمة يبقى متحركاً بها وبخط مستقيم. عند الانطلاق المفاجئ للسيارة يندفع الراكب إلى الخلف، وعند التوقف المفاجئ يندفع إلى الأمام، وعند الانعطاف بانطلاق ثابت يستمر جسمه في الحركة بخط مستقيم فيندفع نحو الخارج. والقصور يعتمد على الكتلة: كرة البيسبول تحتاج قوة أكبر من كرة المنضدة لإيقافها.',
    tags: 'قانون نيوتن الأول قانون القصور انطلاق مفاجئ توقف مفاجئ منعطف الراكب حزام الأمان كرة المنضدة كرة البيسبول القصور يعتمد على الكتلة الشكل 11 الشكل 12',
    tools: ['سيارة', 'راكب', 'كرة منضدة', 'كرة بيسبول'],
    steps: ['اختر «انطلاق مفاجئ» واضغط «▶ شغّل»: إلى أين يندفع الراكب؟', 'اختر «توقف مفاجئ»: السيارة تسير بسرعة ثابتة ثم تتوقف فجأة.', 'اختر «منعطف»: الكرة على المقعد تستمر بخط مستقيم (الخط المتقطع) فتندفع نحو الخارج.', 'شغّل «حزام الأمان» وغيّر التعجيل من اللوحة. ثم اختر «الكتلة والقصور» وقارن القوة اللازمة لإيقاف الكرتين.'],
    concl: ['عند الانطلاق المفاجئ يندفع الراكب إلى الخلف لأن جسمه يميل إلى البقاء ساكناً.', 'عند التوقف المفاجئ يندفع الراكب إلى الأمام لأن جسمه يميل إلى الاستمرار في الحركة.', 'عند الانعطاف بانطلاق ثابت يستمر الجسم في الحركة بخط مستقيم.', 'القصور يعتمد على الكتلة: كلما زادت الكتلة احتاج الجسم إلى قوة أكبر لتغيير حالته الحركية.'],
    laws: ['g11_l3_first'],
    controls: [R('a', 'مقدار التعجيل أو التباطؤ', 2, 8, 6, 1, 'm/s²'), TG('belt', 'حزام الأمان', false, null, 'lock'), TG('vec', 'أسهم', true, null, 'force')],
    setup(S) { S.md = 'start'; D.reset(S); },
    reset(S) { S.run = 0; S.tc = 0; S.v = S.md === 'stop' ? 12 : 0; S.x = 0; S.acc = 0; S.ph = 0; S.pv = 0; S.s = 0; S.obj = null; S.trail = []; S.mb = [0, 0]; S.done = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 344, gy = h - 250; return { w, h, L, x0, x1, gy, cx: (x0 + x1) / 2 }; },
    path(S, g, s) { const Ls = 170, Rc = 110, ax = g.x0 + 40, ay = g.gy - 20; if (s < Ls) return [ax + s, ay, 0]; s -= Ls; const arc = Rc * Math.PI / 2; if (s < arc) { const a = s / Rc; return [ax + Ls + Rc * Math.sin(a), ay - Rc + Rc * Math.cos(a), -a]; } s -= arc; return [ax + Ls + Rc, ay - Rc - s, -Math.PI / 2]; },
    update(S, dt) { if (!S.W) return; const g = D.geo(S); if (!S.run) return; S.tc += dt;
      if (S.md === 'start' || S.md === 'stop') { let a = 0; if (S.md === 'start') a = S.tc > .6 && S.v < 12 ? S.p.a : 0; else a = S.tc > 1.2 && S.v > 0 ? -S.p.a : 0; S.v = Math.max(0, Math.min(12, S.v + a * dt)); S.x += S.v * dt; S.acc = Q53.ez(S.acc, a, dt, 14);
        const tgt = clamp(-S.acc * .075 * (S.p.belt ? .25 : 1), -.6, .6); S.pv += (-60 * (S.ph - tgt) - 7 * S.pv) * dt; S.ph += S.pv * dt; if ((S.md === 'start' && S.tc > 6) || (S.md === 'stop' && S.v === 0 && S.tc > 5)) { S.run = 0; S.done = 1; } }
      else if (S.md === 'turn') { const sp = 150, n = 6, h = dt / n; for (let i = 0; i < n; i++) { S.s += sp * h; const c = D.path(S, g, S.s), u = [Math.cos(c[2]), Math.sin(c[2])];
          if (!S.obj) S.obj = { x: c[0], y: c[1], vx: sp, vy: 0 };
          const o = S.obj; o.x += o.vx * h; o.y += o.vy * h; // free (no friction) unless belted
          let rx = (o.x - c[0]) * u[0] + (o.y - c[1]) * u[1], ry = -(o.x - c[0]) * u[1] + (o.y - c[1]) * u[0]; const HW = 13, HL = 24;
          if (S.p.belt) { rx = 0; ry = 0; } let hit = 0; if (ry > HW) { ry = HW; hit = 1; } if (ry < -HW) { ry = -HW; hit = 1; } if (rx > HL) rx = HL; if (rx < -HL) rx = -HL;
          if (hit || S.p.belt) { const vc = [u[0] * sp, u[1] * sp]; o.vx = vc[0]; o.vy = vc[1]; } o.x = c[0] + rx * u[0] - ry * u[1]; o.y = c[1] + rx * u[1] + ry * u[0]; }
        if (S.s > 470) { S.run = 0; S.done = 1; } S.trail.push([S.obj.x, S.obj.y]); if (S.trail.length > 400) S.trail.shift(); }
      else { const d = .2; S.mb = S.mb.map(x => Math.min(1.3, x + dt * .5)); if (S.mb[0] >= 1.3) { S.run = 0; S.done = 1; } }
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), md = S.md; Q53.bg(ctx, w, h);
      if (md === 'start' || md === 'stop') {
        Q52.sky(ctx, g.x0 - 6, 70, g.x1 + 6, g.gy, S.x * 12); for (let k = -1; k < 6; k++) { const tx = g.x0 + Q52.md(k * 120 - S.x * 60, 720) - 60; if (tx > g.x0 - 30 && tx < g.x1 + 10) Q52.tree(ctx, tx, g.gy, .9); }
        Q52.road(ctx, g.x0 - 6, g.x1 + 6, g.gy, 36, S.x * 60);
        const cx = g.cx, cy = g.gy + 4; D.carSide(ctx, cx, cy, S.ph, S.tc * S.v);
        if (S.p.vec && Math.abs(S.acc) > .3) Q53.F(ctx, cx - Math.sign(S.acc) * 70, g.gy - 175, Math.sign(S.acc) * 140 * 0 + S.acc * 14, 0, '#dc2626', 'a');
        Q52.speedo(ctx, g.x0 + 60, 130, 42, S.v * 3.6, 60, 'km/h');
        const msg = Math.abs(S.ph) > .12 ? (S.ph < 0 ? 'الراكب يندفع إلى الخلف' : 'الراكب يندفع إلى الأمام') : (S.v > 0 ? 'سرعة منتظمة: الراكب مستقر' : 'السيارة ساكنة');
        Q42.T(ctx, msg, g.cx + 60, 110, { s: 13, w: 900, c: '#fff', bg: Math.abs(S.ph) > .12 ? '#dc2626' : '#0f766e' });
      } else if (md === 'turn') {
        K.raw(ctx, () => { ctx.fillStyle = '#bbf7d0'; rr(ctx, g.x0 - 6, 70, g.x1 - g.x0 + 12, g.gy + 40 - 70, 10); ctx.fill(); });
        K.raw(ctx, () => { ctx.strokeStyle = '#3f3f46'; ctx.lineWidth = 46; ctx.lineCap = 'butt'; ctx.beginPath(); for (let s = 0; s <= 470; s += 5) { const p = D.path(S, g, s); s ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0] - 40, p[1]); } ctx.stroke(); ctx.strokeStyle = '#fafafa'; ctx.lineWidth = 2; ctx.setLineDash([14, 12]); ctx.beginPath(); for (let s = 0; s <= 470; s += 5) { const p = D.path(S, g, s); s ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke(); ctx.setLineDash([]); });
        const c = D.path(S, g, S.s); if (S.obj && !S.p.belt) { const o = S.obj; Q51.dash(ctx, [[o.x, o.y], [o.x + o.vx * 2, o.y + o.vy * 2]], '#dc2626', 1.6); }
        if (S.trail.length > 1) Q41.line(ctx, S.trail, 'rgba(220,38,38,.55)', 2);
        K.raw(ctx, () => { ctx.save(); ctx.translate(c[0], c[1]); ctx.rotate(c[2]); const gb = ctx.createLinearGradient(0, -20, 0, 20); gb.addColorStop(0, '#60a5fa'); gb.addColorStop(1, '#1d4ed8'); ctx.fillStyle = gb; rr(ctx, -36, -20, 72, 40, 9); ctx.fill(); ctx.fillStyle = '#e0f2fe'; rr(ctx, 14, -15, 12, 30, 3); ctx.fill(); ctx.fillStyle = 'rgba(15,23,42,.25)'; rr(ctx, -28, -15, 40, 30, 4); ctx.fill(); ctx.restore(); });
        const o = S.obj || { x: c[0], y: c[1] }; K.ball(ctx, o.x, o.y, 7, '#dc2626');
        Q42.T(ctx, S.p.belt ? 'الحزام يجبر الراكب على الانعطاف مع السيارة' : 'الكرة تستمر بخط مستقيم فتصطدم بالجانب الخارجي', g.cx, g.gy + 24, { s: 11.5, w: 800, c: '#fff', bg: '#334155' });
      } else {
        Q53.panel(ctx, g.x0 - 6, 70, g.x1 - g.x0 + 12, g.gy + 40 - 70, 'كرة المنضدة وكرة البيسبول بالسرعة نفسها — الشكل 11');
        const B = [['كرة المنضدة', .0027, 9, '#f8fafc'], ['كرة البيسبول', .145, 20, '#fef3c7']], vv = 10, d = .2; B.forEach((b, i) => { const y = 170 + i * 150, gx = g.x1 - 50, t = S.mb[i], xs = g.x0 + 40, bx = t < 1 ? xs + (gx - 40 - xs) * t : gx - 40 + Math.min(1, (t - 1) / .3) * 14;
          Q53.floor(ctx, g.x0, g.x1 - 10, y + 22, 'wood', 8); K.ball(ctx, bx, y + 22 - b[2], b[2], b[3] === '#f8fafc' ? '#e2e8f0' : '#f5f5f4'); if (i) K.raw(ctx, () => { ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(bx - 8, y + 2, 14, -.8, .8); ctx.stroke(); ctx.beginPath(); ctx.arc(bx + 8, y + 2, 14, Math.PI - .8, Math.PI + .8); ctx.stroke(); });
          const rec = t > 1 ? Math.min(1, (t - 1) / .3) * (i ? 22 : 2) : 0; K.raw(ctx, () => { ctx.fillStyle = '#92400e'; ctx.beginPath(); ctx.ellipse(gx + rec, y + 10, 18, 30, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#b45309'; ctx.beginPath(); ctx.ellipse(gx - 4 + rec, y + 10, 10, 22, 0, 0, TAU); ctx.fill(); });
          const F = b[1] * vv * vv / (2 * d); Q42.T(ctx, b[0] + ' ' + (b[1] * 1000).toFixed(b[1] < .01 ? 1 : 0) + ' g', g.x0 + 70, y - 40, { s: 12, w: 900, c: '#0f172a' });
          K.raw(ctx, () => { const bw = clamp(F / 40, 0, 1) * 200; ctx.fillStyle = '#e2e8f0'; ctx.fillRect(g.x0 + 140, y - 48, 200, 14); ctx.fillStyle = '#dc2626'; ctx.fillRect(g.x0 + 140, y - 48, Math.max(2, bw), 14); });
          Q42.T(ctx, 'F = ' + Q53.f(F, F < 1 ? 2 : 0) + ' N', g.x0 + 380, y - 41, { s: 11.5, w: 900, c: '#dc2626', mono: 1 }); });
      }
      const LN = { start: ['السيارة ساكنة ثم تنطلق فجأة', 'جسم الراكب يميل إلى البقاء ساكناً', 'فيندفع إلى الخلف بالنسبة للسيارة'], stop: ['السيارة تتحرك ثم تتوقف فجأة', 'جسم الراكب يميل إلى الاستمرار في الحركة', 'فيندفع إلى الأمام: لذلك نشد حزام الأمان'], turn: ['السيارة تنعطف بانطلاق ثابت', 'الجسم غير المربوط يستمر بخط مستقيم', 'فيبدو كأنه يندفع نحو الخارج'], mass: ['الكرتان بالسرعة نفسها 10 m/s', 'كرة البيسبول تحتاج قوة أكبر لإيقافها', 'القصور الذاتي يعتمد على الكتلة'] }[md];
      Q53.card(ctx, S, LN.map((t, i) => ({ t, c: i === 2 ? '#dc2626' : '#334155', w: i === 2 ? 900 : 700 })).concat([{ t: 'قانون القصور: ΣF = 0 ⟸ لا تغير في الحالة الحركية', c: '#0f766e', w: 800 }]), { title: 'قانون نيوتن الأول' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.p);
      Q42.banner(ctx, w, 'اختر الحالة واضغط «▶ شغّل»', '#dc2626');
    },
    carSide(ctx, x, y, ph, rot) {
      K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.fillStyle = 'rgba(15,23,42,.25)'; ctx.beginPath(); ctx.ellipse(0, 2, 120, 7, 0, 0, TAU); ctx.fill();
        const gb = ctx.createLinearGradient(0, -80, 0, -14); gb.addColorStop(0, '#f87171'); gb.addColorStop(1, '#991b1b'); ctx.fillStyle = gb; ctx.beginPath(); ctx.moveTo(-120, -20); ctx.lineTo(-118, -66); ctx.quadraticCurveTo(-112, -78, -90, -78); ctx.lineTo(-60, -78); ctx.lineTo(-56, -64); ctx.lineTo(60, -64); ctx.lineTo(96, -60); ctx.quadraticCurveTo(122, -54, 122, -34); ctx.lineTo(122, -20); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#7dd3fc'; ctx.beginPath(); ctx.moveTo(60, -64); ctx.lineTo(44, -104); ctx.lineTo(50, -104); ctx.lineTo(68, -64); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#334155'; rr(ctx, -40, -100, 14, 40, 4); ctx.fill(); rr(ctx, -46, -66, 46, 10, 3); ctx.fill(); // seat
        [-78, 80].forEach(wx => { ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(wx, -18, 20, 0, TAU); ctx.fill(); ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.arc(wx, -18, 10, 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; for (let k = 0; k < 4; k++) { const a = rot * .5 + k * Math.PI / 2; ctx.beginPath(); ctx.moveTo(wx, -18); ctx.lineTo(wx + Math.cos(a) * 10, -18 + Math.sin(a) * 10); ctx.stroke(); } });
        // passenger: pivots at the hip
        ctx.save(); ctx.translate(-18, -68); ctx.rotate(ph); ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -38); ctx.stroke(); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(2, -30); ctx.lineTo(22, -18); ctx.lineTo(34, -26); ctx.stroke(); ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(0, -52, 11, 0, TAU); ctx.fill(); ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(-1, -56, 10, Math.PI, TAU); ctx.fill(); ctx.restore();
        ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-18, -66); ctx.lineTo(14, -66); ctx.lineTo(20, -40); ctx.stroke();
        ctx.strokeStyle = '#111827'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(40, -84, 10, 0, TAU); ctx.stroke();
        ctx.restore(); });
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', MD, g.h - 84, S.md, (S2, k) => { S2.md = k; D.reset(S2); }, { bw: 170, col: '#dc2626' }), p: Q53.play(S, 'pl', g.h - 128, S.run, S2 => { if (S2.done) D.reset(S2); S2.run = S2.run ? 0 : 1; }, S2 => D.reset(S2)) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g); return C.p.concat(C.m); },
    readings(S) { return S.md === 'mass' ? [rd('القوة لإيقاف كرة المنضدة', '0.68 N'), rd('القوة لإيقاف كرة البيسبول', '36 N')] : [rd('الحالة', MD.find(q => q[0] === S.md)[1]), rd('سرعة السيارة', Q53.f(S.v * 3.6, 0) + ' km/h'), rd('التعجيل', Q53.f(S.acc, 1) + ' m/s²'), rd('ميل الراكب', Math.round(-S.ph * 180 / Math.PI) + '°')]; },
    explain(S) { return Q26.ex('الراكب يندفع للخلف عند الانطلاق وللأمام عند التوقف، والكرة على المقعد تستمر بخط مستقيم عند المنعطف.', 'المقعد يؤثر بقوة في أسفل جسم الراكب فقط، أما أعلاه فلا تؤثر فيه قوة أفقية فيحافظ على حالته الحركية السابقة: هذا هو القصور الذاتي (قانون نيوتن الأول). والجسم الأكبر كتلة قصوره أكبر.', 'الباخرة الكبيرة تحتاج مسافة أطول بكثير من الزورق الصغير لتتوقف (الشكل 14)، والراكب على الحصان يندفع للأمام عندما يتوقف الحصان فجأة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C1 — قانون نيوتن الثاني: نشاط 1 (نغير القوة) ونشاط 2 (نغير الكتلة) (الشكلان 15 و 16، ص 56–57) =============== */
(() => {
  const LM = 2; // track length in metres
  const D = { id: 'g11_n_second', page: 56, fig: 'الشكلان 15 و 16',
    desc: 'قانون نيوتن الثاني: نشاط 1 — نسحب قرصاً معدنياً على سطح أملس بقبان حلزوني بقوة F1 ثم 2F1 ثم ½F1 فنجد أن التعجيل يتضاعف أو يتنصف: a ∝ ΣF بثبوت الكتلة. نشاط 2 — نسحب مكعب ثلج m1 ثم مكعباً m2 = 2m1 ثم المكعبين معاً بالقوة نفسها فنجد a2 = ½a1 و a3 = ⅓a1: a ∝ 1/m. إذن a = ΣF/m أي ΣF = m a.',
    tags: 'قانون نيوتن الثاني نشاط القوة والتعجيل الكتلة والتعجيل قرص معدني مكعب ثلج قبان حلزوني سطح أملس F = m a النيوتن الشكل 15 الشكل 16',
    tools: ['قبان حلزوني', 'قرص معدني', 'سطح أملس', 'مكعبا ثلج m1 و m2 = 2m1'],
    steps: ['اختر «نشاط 1» (نغير القوة) أو «نشاط 2» (نغير الكتلة).', 'اسحب يد المسار الأول ✋ لتغيير القوة، أو غيّرها والكتلة من اللوحة.', 'اضغط «▶ شغّل»: تتحرك الأجسام الثلاثة معاً من السكون، والعلامات تبين مواضعها في أزمنة متساوية.', 'قارن التعجيلات في البطاقة وراقب النقاط على المخطط البياني.'],
    concl: ['بثبوت الكتلة: مضاعفة القوة تضاعف التعجيل وتنصيفها ينصفه، أي a ∝ ΣF وباتجاهها.', 'بثبوت القوة: مضاعفة الكتلة تنصف التعجيل، وجعلها ثلاثة أمثالها يجعله الثلث، أي a ∝ 1/m.', 'إذن a = ΣF/m ، أي ΣF = m a (قانون نيوتن الثاني).', 'النيوتن: القوة التي تكسب جسماً كتلته 1 kg تعجيلاً مقداره 1 m/s².'],
    laws: ['g11_l3_second'],
    controls: [R('F', 'القوة F1', 1, 10, 4, .5, 'N'), R('m', 'الكتلة m1', .5, 4, 1, .5, 'kg'), TG('str', 'علامات الأزمنة المتساوية', true, null, 'dots')],
    setup(S) { S.md = 'F'; S.Fd = [0, 0, 0]; D.reset(S); },
    reset(S) { S.run = 0; S.tr = 0; S.done = 0; },
    lanes(S) { const F = S.p.F, m = S.p.m; return S.md === 'F' ? [[F, m, 'F1'], [2 * F, m, '2F1'], [F / 2, m, '½F1']] : [[F, m, 'm1'], [F, 2 * m, 'm2 = 2m1'], [F, 3 * m, 'm1 + m2']]; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 24; return { w, h, L, x0, x1, xs: x0 + 50, px: (x1 - 175 - (x0 + 50)) / LM, ly: [412, 490, 568] }; },
    tend(S) { const am = Math.max(...D.lanes(S).map(q => q[0] / q[1])); return Math.sqrt(2 * LM / am); },
    update(S, dt) { const Ln = D.lanes(S); S.Fd = S.Fd.map((v, i) => Q53.ez(v, Ln[i][0], dt, 10)); if (!S.run) return; const te = D.tend(S); S.tr = Math.min(te, S.tr + dt * te / 3.2); if (S.tr >= te) { S.run = 0; S.done = 1; } },
    pos(S, i) { const q = D.lanes(S)[i]; return Math.min(LM, .5 * q[0] / q[1] * S.tr * S.tr); },
    body(ctx, S, x, y, i) { const md = S.md, m = D.lanes(S)[i][1];
      if (md === 'F') { K.raw(ctx, () => { const gw = 54, gh = 22; const g = ctx.createLinearGradient(0, y - gh, 0, y); g.addColorStop(0, '#e2e8f0'); g.addColorStop(.5, '#94a3b8'); g.addColorStop(1, '#475569'); ctx.fillStyle = g; ctx.fillRect(x - gw / 2, y - gh, gw, gh); ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.ellipse(x, y - gh, gw / 2, 6, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.2; ctx.stroke(); ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.ellipse(x, y - gh, 5, 2, 0, 0, TAU); ctx.fill(); }); return 27; }
      const n = i === 2 ? 2 : 1, sz = i === 0 ? 30 : 38; let top = y; K.raw(ctx, () => { for (let k = 0; k < n; k++) { const s = n === 2 ? (k === 0 ? 38 : 30) : sz, yb = top; const g = ctx.createLinearGradient(x - s / 2, yb - s, x + s / 2, yb); g.addColorStop(0, 'rgba(240,249,255,.95)'); g.addColorStop(.6, 'rgba(125,211,252,.75)'); g.addColorStop(1, 'rgba(14,116,144,.75)'); ctx.fillStyle = g; rr(ctx, x - s / 2, yb - s, s, s, 5); ctx.fill(); ctx.strokeStyle = 'rgba(8,145,178,.9)'; ctx.lineWidth = 1.3; ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.fillRect(x - s / 2 + 4, yb - s + 4, s * .35, 3); top -= s; } }); return 19; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), Ln = D.lanes(S), md = S.md, te = D.tend(S); Q53.bg(ctx, w, h);
      Q53.panel(ctx, g.x0 - 6, 352, g.x1 - g.x0 + 12, 244, md === 'F' ? 'نشاط 1: الكتلة ثابتة ونغير القوة — الشكل 15' : 'نشاط 2: القوة ثابتة ونغير الكتلة — الشكل 16');
      Ln.forEach((q, i) => { const y = g.ly[i], X = g.xs + D.pos(S, i) * g.px; Q53.floor(ctx, g.x0 + 4, g.x1 - 4, y, 'ice', 12);
        if (S.p.str) { const n = 10; for (let k = 1; k <= n; k++) { const tk = te * k / n; if (tk > S.tr + 1e-9) break; const xk = g.xs + Math.min(LM, .5 * q[0] / q[1] * tk * tk) * g.px; Q41.line(ctx, [[xk, y - 4], [xk, y + 12]], '#be185d', 2); } }
        const hw = D.body(ctx, S, X, y, i), Fd = S.Fd[i], xa = X + hw + 92 + Fd * 3; Q53.hsb(ctx, xa, y - 12, X + hw, Fd, 20, { len: 70 }); Q53.hand(ctx, xa + 14, y - 12, -1, .75);
        Q42.T(ctx, q[2], g.x0 + 22, y - 26, { s: 11.5, w: 900, c: '#be185d', bg: 'rgba(255,255,255,.9)' });
        const a = q[0] / q[1]; if (S.done || S.tr > 0) Q42.T(ctx, 'a = ' + Q53.g(a, 2) + ' m/s²', g.x0 + 70, y - 46, { s: 11, w: 900, c: '#0f766e', mono: 1, bg: 'rgba(255,255,255,.9)' }); });
      // graph
      const xm = md === 'F' ? Math.max(4, Math.ceil(2.2 * S.p.F / 4) * 4) : 1.2 / S.p.m, am = Math.max(...Ln.map(q => q[0] / q[1])), ym = Math.max(4, Math.ceil(am * 1.15 / 4) * 4);
      const A = Q52.axes(ctx, { x: g.x0 + 34, y: 96, w: w - 344 - g.x0 - 60, h: 200, x1: xm, y1: ym, xs: xm / 8, ys: ym / 8, lx: xm / 4, ly: ym / 4, xl: md === 'F' ? 'ΣF (N)' : '1/m (1/kg)', yl: 'a (m/s²)' });
      if (S.done) { const sl = md === 'F' ? 1 / S.p.m : S.p.F; Q51.dash(ctx, [[A.X(0), A.Y(0)], [A.X(Math.min(xm, ym / sl)), A.Y(Math.min(ym, xm * sl))]], '#0f766e', 1.8); }
      Ln.forEach((q, i) => { if (!S.done) return; const xv = md === 'F' ? q[0] : 1 / q[1]; Q41.dot(ctx, A.X(xv), A.Y(q[0] / q[1]), ['#dc2626', '#2563eb', '#16a34a'][i], 6); });
      const a1 = Ln[0][0] / Ln[0][1];
      const C = md === 'F' ? [{ t: 'الكتلة ثابتة: m = ' + Q53.g(S.p.m) + ' kg', c: '#334155', w: 800 }, { t: 'F1 ⟸ a1 = ' + Q53.g(a1) + ' m/s²', mono: 1, c: '#dc2626', w: 900 }, { t: '2F1 ⟸ 2a1 = ' + Q53.g(2 * a1) + ' m/s²', mono: 1, c: '#2563eb', w: 900 }, { t: '½F1 ⟸ ½a1 = ' + Q53.g(a1 / 2) + ' m/s²', mono: 1, c: '#16a34a', w: 900 }, { t: 'نستنتج: a ∝ ΣF وباتجاهها', c: '#0f766e', w: 900 }]
        : [{ t: 'القوة ثابتة: F = ' + Q53.g(S.p.F) + ' N', c: '#334155', w: 800 }, { t: 'm1 ⟸ a1 = ' + Q53.g(a1) + ' m/s²', mono: 1, c: '#dc2626', w: 900 }, { t: '2m1 ⟸ a2 = ½a1 = ' + Q53.g(a1 / 2) + ' m/s²', mono: 1, c: '#2563eb', w: 900 }, { t: '3m1 ⟸ a3 = ⅓a1 = ' + Q53.g(a1 / 3) + ' m/s²', mono: 1, c: '#16a34a', w: 900 }, { t: 'نستنتج: a ∝ 1/m ، إذن ΣF = m a', c: '#0f766e', w: 900 }];
      Q53.card(ctx, S, C, { title: 'قانون نيوتن الثاني' });
      const Ch = D.chips(S, g); Q42.drawChips(ctx, Ch.m); Q42.drawChips(ctx, Ch.p);
      Q42.banner(ctx, w, 'اسحب اليد ✋ لتغيير القوة ثم اضغط «▶ شغّل»', '#dc2626');
    },
    chips(S, g) { return { m: Q42.chips(S, 'md', [['F', 'نشاط 1: نغير القوة'], ['m', 'نشاط 2: نغير الكتلة']], g.h - 84, S.md, (S2, k) => { S2.md = k; D.reset(S2); }, { bw: 220, col: '#dc2626' }), p: Q53.play(S, 'pl', g.h - 128, S.run, S2 => { if (S2.done) D.reset(S2); S2.run = S2.run ? 0 : 1; }, S2 => D.reset(S2)) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), X = g.xs + D.pos(S, 0) * g.px, hw = S.md === 'F' ? 27 : 19, xa = X + hw + 92 + S.Fd[0] * 3;
      return [{ id: 'hand', x: xa + 14, y: g.ly[0] - 12, r: 24, axis: 'x', keep: true, tip: 'اسحب لتغيير القوة', idle: 'اسحب ✋', drag: (S2, d) => { if (S2.run) return; D.reset(S2); setParam(S2, 'F', clamp(Math.round((d.x - 14 - X - hw - 92) / 3 * 2) / 2, 1, 10)); } }].concat(C.p, C.m); },
    readings(S) { const Ln = D.lanes(S); return Ln.map((q, i) => rd('تعجيل المسار ' + (i + 1), Q53.g(q[0] / q[1], 2) + ' m/s²')).concat([rd('الزمن', Q53.g(S.tr, 2) + ' s')]); },
    record(S) { const q = D.lanes(S); return { F: Q53.g(S.p.F), m: Q53.g(S.p.m), a1: Q53.g(q[0][0] / q[0][1]), a2: Q53.g(q[1][0] / q[1][1]), a3: Q53.g(q[2][0] / q[2][1]) }; },
    cols: [['F', 'F1 (N)'], ['m', 'm1 (kg)'], ['a1', 'a1'], ['a2', 'a2'], ['a3', 'a3']],
    explain(S) { return Q26.ex('بثبوت الكتلة يتضاعف التعجيل عندما تتضاعف القوة، وبثبوت القوة يقل التعجيل إلى النصف عندما تتضاعف الكتلة.', 'التعجيل يتناسب طردياً مع محصلة القوى وعكسياً مع الكتلة: a = ΣF/m. لذلك يكون ΣF = m a ، والنيوتن هو القوة التي تكسب كتلة 1 kg تعجيلاً 1 m/s².', 'السيارة المحملة بالركاب تحتاج قوة محرك أكبر لتكتسب التعجيل نفسه.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== C2 — الوزن والكتلة والجذب العام (الأشكال 17–19 + فكر، ص 58–59) =============== */
(() => {
  const PL = [['earth', 'الأرض', 10, '#2563eb'], ['moon', 'القمر', 1.6, '#64748b']];
  const DS = [[1, 600], [2, 150], [3, 67], [100, .06]];
  const D = { id: 'g11_n_weight', page: 58, fig: 'الأشكال 17–19',
    desc: 'الوزن قوة جذب الأرض للجسم: w = m g، وهو كمية متجهة نحو مركز الأرض ويتغير من مكان لآخر، أما الكتلة فثابتة. الجسم الساقط سقوطاً حراً يتعجل بـ g. وقانون الجذب العام F = G m1 m2 / d² يبين أن قوة الجذب تقل مع مربع البعد: شخص وزنه 600 N عند سطح الأرض (6400 km من المركز) يصبح وزنه 150 N عند 12800 km و 67 N عند 19200 km و 0.06 N عند 640000 km.',
    tags: 'الوزن الكتلة w = m g تعجيل الجاذبية g قانون الجذب العام نيوتن G ثابت الجذب العام الأرض القمر البعد عن مركز الأرض قطعة ذهب الشكل 17 الشكل 18 الشكل 19',
    tools: ['قبان حلزوني', 'أثقال', 'قطعة ذهب'],
    steps: ['في «w = m g» غيّر الكتلة من اللوحة واقرأ القبانين: على الأرض وعلى القمر.', 'اضغط «أسقط الجسمين» لترى أن الجسم يسقط بتعجيل g في كل مكان.', 'اختر «الجذب العام» واسحب الشخص ✋ بعيداً عن الأرض: كيف يتغير وزنه؟', 'اختر «فكر: قطعة الذهب»: وزن كل منهما 1 N ، أيهما كتلته أكبر؟'],
    concl: ['الوزن w = m g قوة متجهة نحو مركز الأرض تقاس بالنيوتن، والكتلة ثابتة وتقاس بالكيلوغرام.', 'الكتلة نفسها وزنها على القمر أقل من وزنها على الأرض لأن g على القمر أصغر.', 'قوة الجذب F = G m1 m2 / d² : مضاعفة البعد تجعل القوة ربع ما كانت.', 'قطعة الذهب التي وزنها 1 N على القمر كتلتها أكبر من التي وزنها 1 N على الأرض.'],
    laws: ['g11_l3_weight', 'g11_l3_grav'],
    controls: [R('m', 'الكتلة m', .5, 10, 2, .5, 'kg'), R('pm', 'وزن الشخص على سطح الأرض', 300, 900, 600, 50, 'N'), TG('vec', 'أسهم القوى', true, null, 'force')],
    setup(S) { S.md = 'wmg'; S.dr = 1; S.dtg = 1; S.ext = [0, 0]; D.reset(S); },
    reset(S) { S.drop = 0; S.ft = [0, 0]; S.fy = [0, 0]; S.fv = [0, 0]; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 344; return { w, h, L, x0, x1 }; },
    mass(S, i) { return S.md === 'gold' ? 1 / PL[i][2] : S.p.m; },
    update(S, dt) { S.dr = Q53.ez(S.dr, S.dtg, dt, 8); for (let i = 0; i < 2; i++) { const wgt = D.mass(S, i) * PL[i][2]; S.ext[i] = Q53.ez(S.ext[i], wgt, dt, 9);
        if (S.drop) { const n = 6, hh = dt / n; for (let k = 0; k < n; k++) { if (S.fy[i] < 1.6) { S.ft[i] += hh; S.fv[i] += PL[i][2] * hh; S.fy[i] = Math.min(1.6, S.fy[i] + S.fv[i] * hh); } } } } },
    rmap(g, r) { const a = g.x0 + 70, b = g.x1 - 10; return a + 45 + Math.log10(r) / 2 * (b - a - 45); },
    rinv(g, x) { const a = g.x0 + 70, b = g.x1 - 10; return Math.pow(10, clamp((x - a - 45) / (b - a - 45) * 2, 0, 2)); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), md = S.md; Q53.bg(ctx, w, h);
      if (md === 'grav') {
        Q53.panel(ctx, g.x0 - 6, 70, g.x1 - g.x0 + 12, 270, 'الوزن يقل كلما ابتعدنا عن مركز الأرض — الشكل 19');
        K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; rr(ctx, g.x0, 92, g.x1 - g.x0, 240, 8); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.7)'; for (let k = 0; k < 40; k++) ctx.fillRect(g.x0 + (k * 97 % (g.x1 - g.x0)), 96 + (k * 53 % 230), 1.5, 1.5); });
        const ex = g.x0 + 70, ey = 230; K.raw(ctx, () => { const gr = ctx.createRadialGradient(ex - 15, ey - 15, 5, ex, ey, 45); gr.addColorStop(0, '#93c5fd'); gr.addColorStop(.6, '#2563eb'); gr.addColorStop(1, '#1e3a8a'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(ex, ey, 45, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(34,197,94,.75)'; ctx.beginPath(); ctx.ellipse(ex - 10, ey - 8, 16, 10, .6, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(ex + 16, ey + 14, 10, 7, -.3, 0, TAU); ctx.fill(); });
        [1, 2, 3, 10, 100].forEach(r => { const xx = D.rmap(g, r); Q41.line(ctx, [[xx, ey + 52], [xx, ey + 62]], '#cbd5e1', 1.4); Q42.T(ctx, r + 'R', xx, ey + 74, { s: 10, w: 800, c: '#e2e8f0' }); });
        const px = D.rmap(g, S.dr), F = S.p.pm / (S.dr * S.dr); Q41.line(ctx, [[ex, ey], [px, ey]], 'rgba(226,232,240,.35)', 1, [4, 4]);
        K.raw(ctx, () => { ctx.save(); ctx.translate(px, ey); ctx.rotate(-Math.PI / 2); ctx.fillStyle = '#f8fafc'; rr(ctx, -10, -7, 20, 14, 4); ctx.fill(); ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(16, 0, 7, 0, TAU); ctx.fill(); ctx.restore(); });
        if (S.p.vec) { const Lr = clamp(Math.sqrt(F / S.p.pm) * 60, 3, 60); Q53.F(ctx, px - 12, ey - 20, -Lr, 0, '#f87171', 'w'); }
        Q42.T(ctx, 'w = ' + (F < 1 ? Q53.g(F, 3) : Q53.f(F, 0)) + ' N', px, ey - 52, { s: 12.5, w: 900, c: '#0f172a', bg: '#fde68a', mono: 1 });
        Q42.T(ctx, 'd = ' + Q53.f(6400 * S.dr, 0) + ' km', px, ey + 26, { s: 10.5, w: 800, c: '#e2e8f0', mono: 1 });
        // graph
        const A = Q52.axes(ctx, { x: g.x0 + 34, y: 382, w: w - g.x0 - 100, h: 160, x1: 4, y1: 1000, xs: .5, ys: 125, lx: 1, ly: 250, xl: 'd / R', yl: 'w (N)' }); const pts = []; for (let r = 1; r <= 4.001; r += .05) pts.push([A.X(r), A.Y(S.p.pm / (r * r))]); Q52.plot(ctx, pts, '#2563eb', 2.4);
        DS.slice(0, 3).forEach(q => Q41.dot(ctx, A.X(q[0]), A.Y(S.p.pm / (q[0] * q[0])), '#dc2626', 4)); if (S.dr <= 4) Q41.dot(ctx, A.X(S.dr), A.Y(F), '#f59e0b', 7);
        Q53.card(ctx, S, [{ t: 'F = G m1 m2 / d²', mono: 1, c: '#dc2626', w: 900 }, { t: 'G = 6.67×10⁻¹¹ N·m²/kg²', mono: 1, c: '#475569' }, { t: 'البعد d = ' + Q53.g(S.dr, 2) + ' R', c: '#334155', w: 800 }, { t: 'الوزن = ' + (F < 1 ? Q53.g(F, 3) : Q53.f(F, 0)) + ' N', c: '#2563eb', w: 900 }, { t: 'مضاعفة البعد ⟸ القوة الربع', c: '#0f766e', w: 800 }, { t: 'R = 6400 km نصف قطر الأرض', c: '#64748b' }], { title: 'قانون الجذب العام' });
      } else {
        Q53.panel(ctx, g.x0 - 6, 70, g.x1 - g.x0 + 12, 500, md === 'gold' ? 'فكر: قطعتا ذهب وزن كل منهما 1 N' : 'الكتلة نفسها على الأرض وعلى القمر — الشكل 17');
        PL.forEach((pl, i) => { const cx = g.x0 + (g.x1 - g.x0) * (i ? .75 : .25), top = 120, m = D.mass(S, i), wgt = S.ext[i];
          Q42.T(ctx, pl[1] + ' g = ' + pl[2], cx, 98, { s: 12, w: 900, c: pl[3] });
          K.raw(ctx, () => { ctx.fillStyle = '#475569'; ctx.fillRect(cx - 40, top - 8, 80, 8); });
          const sl = 30 + clamp(wgt / 100, 0, 1) * 110, yb = top + 24 + sl; K.raw(ctx, () => { const gg = ctx.createLinearGradient(cx - 14, 0, cx + 14, 0); gg.addColorStop(0, '#b45309'); gg.addColorStop(.5, '#fde68a'); gg.addColorStop(1, '#b45309'); ctx.fillStyle = gg; rr(ctx, cx - 14, top, 28, 170, 8); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.stroke(); ctx.fillStyle = '#fff'; ctx.fillRect(cx - 7, top + 10, 14, 150); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; for (let k = 0; k <= 10; k++) { const yy = top + 24 + 30 + k * 11; ctx.beginPath(); ctx.moveTo(cx - 7, yy); ctx.lineTo(cx - (k % 5 ? 2 : 0), yy); ctx.stroke(); } });
          Q42.spring(ctx, cx + 3, top + 14, top + 24 + sl, { r: 4, n: 10, lead: 4, w: 1.6 }); K.raw(ctx, () => { ctx.fillStyle = '#dc2626'; ctx.fillRect(cx - 9, top + 22 + sl, 18, 4); ctx.strokeStyle = '#475569'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(cx, top + 170); ctx.lineTo(cx, top + 186); ctx.stroke(); });
          Q42.T(ctx, Q53.g(wgt, 2) + ' N', cx + 46, top + 24 + sl, { s: 11.5, w: 900, c: '#0f172a', bg: '#fef3c7', mono: 1 });
          const fall = S.fy[i] * 120, by = top + 186 + fall, sz = md === 'gold' ? 14 + Math.sqrt(m) * 16 : 18 + Math.sqrt(m) * 8;
          if (S.drop) { const n = 8; for (let k = 1; k <= n; k++) { const tk = k * .1; if (tk > S.ft[i]) break; const yk = Math.min(1.6, .5 * pl[2] * tk * tk) * 120; Q41.dot(ctx, cx - sz / 2 - 12, top + 186 + yk + sz / 2, '#be185d', 3); } }
          else Q41.line(ctx, [[cx, top + 186], [cx, by]], '#475569', 2);
          K.raw(ctx, () => { const gg = ctx.createLinearGradient(0, by, 0, by + sz); if (md === 'gold') { gg.addColorStop(0, '#fef08a'); gg.addColorStop(.5, '#eab308'); gg.addColorStop(1, '#854d0e'); } else { gg.addColorStop(0, '#94a3b8'); gg.addColorStop(1, '#334155'); } ctx.fillStyle = gg; rr(ctx, cx - sz / 2, by, sz, sz, 4); ctx.fill(); });
          Q42.T(ctx, Q53.g(m, 3) + ' kg', cx, by + sz + 12, { s: 11, w: 900, c: '#0f172a', bg: 'rgba(255,255,255,.9)', mono: 1 });
          if (S.p.vec && !S.drop) Q53.F(ctx, cx + sz / 2 + 16, by + sz / 2, 0, clamp(wgt * 2.4, 6, 70), '#dc2626', 'w');
          if (S.drop) Q42.T(ctx, 'a = ' + pl[2] + ' m/s²', cx, 556, { s: 11.5, w: 900, c: '#be185d', mono: 1, bg: 'rgba(255,255,255,.9)' }); });
        Q41.line(ctx, [[(g.x0 + g.x1) / 2, 108], [(g.x0 + g.x1) / 2, 560]], '#cbd5e1', 1.5, [5, 5]);
        const L2 = md === 'gold' ? [{ t: 'على الأرض: m = w/g = 1/10 = 0.1 kg', c: '#2563eb', w: 800 }, { t: 'على القمر: m = 1/1.6 = 0.625 kg', c: '#64748b', w: 800 }, { t: 'قطعة القمر كتلتها أكبر', c: '#dc2626', w: 900 }, { t: 'لأن g على القمر أصغر فالكتلة الأكبر تعطي الوزن نفسه', c: '#334155' }]
          : [{ t: 'w = m g', mono: 1, c: '#dc2626', w: 900 }, { t: 'الأرض: w = ' + Q53.g(S.p.m) + ' × 10 = ' + Q53.g(S.p.m * 10) + ' N', c: '#2563eb', w: 800 }, { t: 'القمر: w = ' + Q53.g(S.p.m) + ' × 1.6 = ' + Q53.g(S.p.m * 1.6) + ' N', c: '#64748b', w: 800 }, { t: 'الكتلة ثابتة والوزن يتغير من مكان لآخر', c: '#0f766e', w: 900 }, { t: 'الوزن كمية متجهة نحو مركز الأرض', c: '#334155' }];
        Q53.card(ctx, S, L2, { title: md === 'gold' ? 'فكر ص 59' : 'الوزن والكتلة' });
      }
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); Q42.drawChips(ctx, C.a);
      Q42.banner(ctx, w, md === 'grav' ? 'اسحب الشخص ✋ بعيداً عن الأرض' : 'غيّر الكتلة ثم اضغط «أسقط الجسمين»', '#dc2626');
    },
    chips(S, g) { const m = Q42.chips(S, 'md', [['wmg', 'w = m g'], ['grav', 'الجذب العام'], ['gold', 'فكر: قطعة الذهب']], g.h - 84, S.md, (S2, k) => { S2.md = k; D.reset(S2); }, { bw: 180, col: '#dc2626' });
      const a = S.md === 'grav' ? Q42.chips(S, 'dd', DS.map(q => ['r' + q[0], q[0] === 1 ? 'سطح الأرض' : q[0] + 'R']), g.h - 128, 'r' + S.dtg, (S2, k) => { S2.dtg = +k.slice(1); }, { bw: 120 }) : Q42.chips(S, 'act', [['drop', '⬇ أسقط الجسمين'], ['re', '↺ أعدهما']], g.h - 128, '', (S2, k) => { D.reset(S2); if (k === 'drop') S2.drop = 1; }, { bw: 170 });
      return { m, a }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g); const it = [];
      if (S.md === 'grav') it.push({ id: 'man', x: D.rmap(g, S.dr), y: 230, r: 22, axis: 'x', keep: true, tip: 'اسحب بعيداً عن الأرض', idle: 'اسحب ✋', drag: (S2, d) => { S2.dtg = Math.round(D.rinv(g, d.x) * 20) / 20; } });
      return it.concat(C.a, C.m); },
    readings(S) { if (S.md === 'grav') { const F = S.p.pm / (S.dr * S.dr); return [rd('البعد عن مركز الأرض', Q53.f(6400 * S.dr, 0) + ' km'), rd('الوزن', Q53.g(F, F < 1 ? 3 : 1) + ' N')]; }
      return [rd('الكتلة على الأرض', Q53.g(D.mass(S, 0), 3) + ' kg'), rd('الوزن على الأرض', Q53.g(D.mass(S, 0) * 10, 2) + ' N'), rd('الكتلة على القمر', Q53.g(D.mass(S, 1), 3) + ' kg'), rd('الوزن على القمر', Q53.g(D.mass(S, 1) * 1.6, 2) + ' N')]; },
    explain(S) { return Q26.ex('القبان على القمر يقرأ أقل من القبان على الأرض للكتلة نفسها، والوزن يقل كثيراً كلما ابتعدنا عن مركز الأرض.', 'الوزن w = m g يعتمد على تعجيل الجاذبية في المكان، أما الكتلة فخاصية ثابتة للجسم. وقوة الجذب بين جسمين F = G m1 m2 / d² تتناسب عكسياً مع مربع البعد بين مركزيهما.', 'رواد الفضاء على القمر يقفزون بسهولة لأن وزنهم هناك نحو سدس وزنهم على الأرض.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== D — قانون نيوتن الثالث: الفعل ورد الفعل (الأشكال 20–25 + فكر، ص 60–61) =============== */
(() => {
  const MD = [['sb', 'قبانان'], ['skate', 'متزلجان'], ['hammer', 'المطرقة 21'], ['walk', 'المشي 22'], ['row', 'التجذيف 23'], ['rocket', 'الصاروخ 25'], ['moon', 'الأرض والقمر']];
  const TX = { sb: ['يدك تسحب القبان الثاني فيسحب الأول', 'القبانان يقرآن القيمة نفسها دائماً', 'والقوتان متعاكستان في الاتجاه'], skate: ['المتزلج الأول يدفع الثاني', 'والثاني يدفع الأول بقوة مساوية ومعاكسة', 'الأقل كتلة يكتسب سرعة أكبر'], hammer: ['المطرقة تؤثر في المسمار بقوة نحو الأسفل', 'والمسمار يؤثر في المطرقة بقوة مساوية نحو الأعلى', 'فتتوقف المطرقة وينغرز المسمار'], walk: ['القدم تدفع الأرض إلى الخلف', 'والأرض تدفع القدم إلى الأمام', 'فيتحرك الشخص إلى الأمام'], row: ['المجذاف يدفع الماء إلى الخلف', 'والماء يدفع المجذاف إلى الأمام', 'فيتحرك الزورق إلى الأمام'], rocket: ['الصاروخ يدفع الغازات إلى الأسفل', 'والغازات تدفع الصاروخ إلى الأعلى', 'فيرتفع الصاروخ'], moon: ['الأرض تجذب القمر', 'والقمر يجذب الأرض بقوة مساوية ومعاكسة', 'القوتان متساويتان رغم اختلاف الكتلتين'] };
  const D = { id: 'g11_n_third', page: 60, fig: 'الأشكال 20–25',
    desc: 'قانون نيوتن الثالث: لكل فعل رد فعل مساوٍ له في المقدار ومعاكس له في الاتجاه، F12 = −F21. القوتان تقعان على خط فعل واحد وتؤثران في جسمين مختلفين فلا تحدثان اتزاناً. أمثلة: المطرقة والمسمار، المشي، التجذيف، السابح على لوحة القفز، الصاروخ، والأرض والقمر.',
    tags: 'قانون نيوتن الثالث الفعل ورد الفعل F12 = −F21 خط فعل واحد جسمين مختلفين المطرقة والمسمار المشي التجذيف الزورق الصاروخ الأرض والقمر الشكل 20 الشكل 21 الشكل 22 الشكل 23 الشكل 24 الشكل 25',
    tools: ['قبانان حلزونيان', 'لوحا تزلج', 'مطرقة ومسمار', 'زورق ومجذاف'],
    steps: ['اختر المثال من الأزرار في الأسفل.', 'في «قبانان» اسحب اليد ✋ وقارن قراءتي القبانين.', 'في «متزلجان» غيّر الكتلتين من اللوحة ثم اضغط «ادفع»: من يبتعد أسرع؟', 'في بقية الأمثلة راقب سهمي الفعل ورد الفعل: على أي جسم يؤثر كل منهما؟'],
    concl: ['لكل فعل رد فعل مساوٍ له في المقدار ومعاكس له في الاتجاه.', 'الفعل ورد الفعل يقعان على خط فعل واحد ويؤثران في جسمين مختلفين، لذلك لا يحدثان اتزاناً.', 'القوتان متساويتان دائماً حتى لو اختلفت الكتلتان، لكن تعجيل الجسم الأقل كتلة أكبر.', 'نمشي ونجذف وتنطلق الصواريخ بفضل قوة رد الفعل.'],
    laws: ['g11_l3_third'],
    controls: [R('F', 'قوة الفعل', 2, 20, 10, 1, 'N'), R('m1', 'كتلة الجسم الأول', 20, 100, 60, 5, 'kg'), R('m2', 'كتلة الجسم الثاني', 20, 100, 30, 5, 'kg'), TG('vec', 'سهما الفعل ورد الفعل', true, null, 'force')],
    setup(S) { S.md = 'sb'; S.Fd = 0; S.ph = 0; D.reset(S); },
    reset(S) { S.sk = 0; S.x1 = 0; S.x2 = 0; S.v1 = 0; S.v2 = 0; S.tp = 0; S.hm = 0; S.nail = 0; S.ry = 0; S.rv = 0; S.bx = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 344; return { w, h, L, x0, x1, cx: (x0 + x1) / 2, gy: h - 250 }; },
    update(S, dt) { const md = S.md; S.Fd = Q53.ez(S.Fd, S.p.F, dt, 10); S.ph += dt * (md === 'walk' ? 6 : md === 'row' ? 2.2 : 3);
      if (md === 'skate' && S.sk) { S.tp += dt; const push = S.tp < .5, F = push ? S.p.F * 12 : 0; S.v1 += -F / S.p.m1 * dt; S.v2 += F / S.p.m2 * dt; S.x1 += S.v1 * dt * 40; S.x2 += S.v2 * dt * 40; if (S.x2 > 150 || S.x1 < -150) { S.v1 = 0; S.v2 = 0; S.sk = 0; } }
      if (md === 'hammer') { S.hm += dt / 1.4; if (S.hm >= 1) { S.hm -= 1; } const hit = S.hm > .5 && S.hm - dt / 1.4 <= .5; if (hit && S.nail < 1) S.nail = Math.min(1, S.nail + S.p.F / 60); if (S.hm < .05 && S.nail >= 1) S.nail = 0; }
      if (md === 'rocket') { S.rv = Math.min(220, S.rv + S.p.F * 2 * dt); S.ry += S.rv * dt; }
      if (md === 'row' || md === 'walk') S.bx += dt * (md === 'row' ? 50 : 60) * (S.p.F / 10); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), md = S.md, cx = g.cx, gy = g.gy, F = S.Fd, vec = S.p.vec, al = 40 + F * 4; Q53.bg(ctx, w, h);
      const pair = (x1, y1, dx, dy, x2, y2, l1, l2) => { if (!vec) return; Q53.F(ctx, x1, y1, dx, dy, '#dc2626', l1 || 'الفعل', { ls: 12 }); Q53.F(ctx, x2, y2, -dx, -dy, '#2563eb', l2 || 'رد الفعل', { ls: 12 }); };
      if (md === 'rocket') { K.raw(ctx, () => { const gs = ctx.createLinearGradient(0, 70, 0, gy + 40); gs.addColorStop(0, '#0f172a'); gs.addColorStop(1, '#1e3a8a'); ctx.fillStyle = gs; rr(ctx, g.x0 - 6, 70, g.x1 - g.x0 + 12, gy + 40 - 70, 10); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.8)'; for (let k = 0; k < 50; k++) { const yy = 74 + Q52.md(k * 61 + S.ry * (1 + k % 3) * .5, gy + 30 - 74); ctx.fillRect(g.x0 + (k * 89 % (g.x1 - g.x0)), yy, 1.5, 2 + Math.min(10, S.rv / 30)); } }); }
      else Q53.panel(ctx, g.x0 - 6, 70, g.x1 - g.x0 + 12, gy + 40 - 70, 'لكل فعل رد فعل');
      if (md === 'sb') { const ext = clamp(F / 20, 0, 1.05) * 50, xm = cx, y = gy - 120, xL = xm - 140 - ext, xR = xm + 140 + ext;
        Q53.hsb(ctx, xL, y, xm, F, 20, { len: 90 }); Q53.hsb(ctx, xR, y, xm, F, 20, { len: 90 }); K.raw(ctx, () => { ctx.fillStyle = '#64748b'; ctx.fillRect(xL - 30, y - 60, 14, 120); }); Q41.line(ctx, [[xL - 16, y], [xL - 12, y]], '#475569', 3); Q53.hand(ctx, xR + 14, y, -1, .9);
        pair(xm - 4, y + 40, -al * .8, 0, xm + 4, y + 40, 'F21', 'F12'); Q42.T(ctx, 'القبان الأول', xL + 50, y + 70, { s: 11, w: 800, c: '#334155' }); Q42.T(ctx, 'القبان الثاني', xR - 50, y + 70, { s: 11, w: 800, c: '#334155' }); }
      else if (md === 'skate') { Q53.floor(ctx, g.x0, g.x1, gy, 'smooth', 16); const p1 = cx - 26 + S.x1, p2 = cx + 26 + S.x2, s1 = .85 + S.p.m1 / 250, s2 = .85 + S.p.m2 / 250;
        [[p1, s1, 1, '#dc2626', S.p.m1], [p2, s2, -1, '#16a34a', S.p.m2]].forEach(q => { K.raw(ctx, () => { ctx.fillStyle = '#7c2d12'; rr(ctx, q[0] - 24, gy - 12, 48, 6, 3); ctx.fill(); ctx.fillStyle = '#111827'; [-15, 15].forEach(d => { ctx.beginPath(); ctx.arc(q[0] + d, gy - 4, 4, 0, TAU); ctx.fill(); }); }); Q52.runner(ctx, q[0], gy - 12, 140 * q[1], 0, q[2], q[3], false); Q42.T(ctx, q[4] + ' kg', q[0], gy + 28, { s: 11, w: 900, c: q[3], mono: 1 }); });
        if (S.sk && S.tp < .5) pair(cx + S.x2 + 6, gy - 110, al * .7, 0, cx + S.x1 - 6, gy - 80, 'F21', 'F12');
        Q42.T(ctx, 'v1 = ' + Q53.g(Math.abs(S.v1), 2) + ' m/s', g.x0 + 70, 110, { s: 11.5, w: 900, c: '#dc2626', mono: 1 }); Q42.T(ctx, 'v2 = ' + Q53.g(Math.abs(S.v2), 2) + ' m/s', g.x1 - 70, 110, { s: 11.5, w: 900, c: '#16a34a', mono: 1 }); }
      else if (md === 'hammer') { K.raw(ctx, () => { const gw = ctx.createLinearGradient(0, gy - 70, 0, gy); gw.addColorStop(0, '#d6a46b'); gw.addColorStop(1, '#92400e'); ctx.fillStyle = gw; ctx.fillRect(cx - 110, gy - 70, 220, 70); ctx.strokeStyle = 'rgba(120,53,15,.5)'; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(cx - 110, gy - 70 + k * 17); ctx.lineTo(cx + 110, gy - 70 + k * 17); ctx.stroke(); } });
        const nt = gy - 70 - 60 + S.nail * 50; K.raw(ctx, () => { const gn = ctx.createLinearGradient(cx - 3, 0, cx + 3, 0); gn.addColorStop(0, '#64748b'); gn.addColorStop(.5, '#e2e8f0'); gn.addColorStop(1, '#475569'); ctx.fillStyle = gn; ctx.fillRect(cx - 3, nt, 6, 70); ctx.fillRect(cx - 10, nt - 4, 20, 5); });
        const t = S.hm, ang = t < .5 ? -1.3 + t * 2 * 1.3 : (t < .75 ? 0 : -(t - .75) / .25 * 1.3), px = cx + 150, py = nt - 10;
        K.raw(ctx, () => { ctx.save(); ctx.translate(px, py); ctx.rotate(ang); ctx.fillStyle = '#92400e'; rr(ctx, -150, -6, 140, 12, 5); ctx.fill(); const gh = ctx.createLinearGradient(0, -30, 0, 30); gh.addColorStop(0, '#94a3b8'); gh.addColorStop(1, '#1e293b'); ctx.fillStyle = gh; rr(ctx, -172, -32, 34, 40, 4); ctx.fill(); ctx.restore(); });
        if (t > .48 && t < .75) pair(cx - 30, nt - 50, 0, al * .9, cx + 30, nt + 8, 'الفعل', 'رد الفعل'); }
      else if (md === 'walk') { K.raw(ctx, () => { ctx.fillStyle = '#86efac'; ctx.fillRect(g.x0, gy, g.x1 - g.x0, 12); ctx.fillStyle = '#a16207'; for (let k = 0; k < 30; k++) { const xx = g.x0 + Q52.md(k * 37 - S.bx, g.x1 - g.x0); ctx.fillRect(xx, gy + 3, 3, 3); } }); Q52.runner(ctx, cx, gy, 150, S.ph, 1, '#2563eb', true);
        const st = Math.sin(S.ph) > 0; pair(cx + (st ? -10 : 6), gy + 30, -al * .8, 0, cx + (st ? -10 : 6) - 6, gy + 50, 'القدم على الأرض', 'الأرض على القدم'); }
      else if (md === 'row') { const wy = gy - 40; K.raw(ctx, () => { const gw = ctx.createLinearGradient(0, wy, 0, gy + 40); gw.addColorStop(0, '#38bdf8'); gw.addColorStop(1, '#0c4a6e'); ctx.fillStyle = gw; ctx.fillRect(g.x0, wy, g.x1 - g.x0, gy + 40 - wy); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 2; for (let k = 0; k < 8; k++) { const xx = g.x0 + Q52.md(k * 60 - S.bx, g.x1 - g.x0 - 30); ctx.beginPath(); ctx.arc(xx + 15, wy + 14 + (k % 3) * 18, 10, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); } });
        K.raw(ctx, () => { ctx.fillStyle = '#92400e'; ctx.beginPath(); ctx.moveTo(cx - 120, wy - 22); ctx.lineTo(cx + 130, wy - 22); ctx.quadraticCurveTo(cx + 110, wy + 10, cx + 70, wy + 12); ctx.lineTo(cx - 100, wy + 12); ctx.quadraticCurveTo(cx - 118, wy + 6, cx - 120, wy - 22); ctx.fill(); ctx.fillStyle = '#b45309'; ctx.fillRect(cx - 118, wy - 26, 246, 6); });
        Q52.runner(ctx, cx, wy - 22, 90, 0, 1, '#dc2626', false); const oa = Math.sin(S.ph) * .5, ox = cx + 6, oy = wy - 60; const ex = ox + Math.cos(Math.PI / 2 + .5 + oa) * 112, ey = oy + Math.sin(Math.PI / 2 + .5 + oa) * 112;
        K.raw(ctx, () => { ctx.strokeStyle = '#78350f'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(ox + 20, oy - 10); ctx.lineTo(ex, ey); ctx.stroke(); ctx.fillStyle = '#a16207'; ctx.save(); ctx.translate(ex, ey); ctx.rotate(Math.atan2(ey - oy, ex - ox)); rr(ctx, -30, -9, 34, 18, 6); ctx.fill(); ctx.restore(); });
        if (Math.cos(S.ph) > 0) pair(ex - 6, ey + 4, -al * .8, 0, ex + 6, ey - 30, 'المجذاف على الماء', 'الماء على المجذاف'); }
      else if (md === 'rocket') { const ry = gy - 200; K.raw(ctx, () => { const fl = 60 + F * 6 + Math.sin(S.ph * 9) * 8; const gf = ctx.createLinearGradient(0, ry + 120, 0, ry + 120 + fl); gf.addColorStop(0, '#fef08a'); gf.addColorStop(.4, '#f97316'); gf.addColorStop(1, 'rgba(220,38,38,0)'); ctx.fillStyle = gf; ctx.beginPath(); ctx.moveTo(cx - 16, ry + 118); ctx.quadraticCurveTo(cx, ry + 120 + fl * 1.3, cx + 16, ry + 118); ctx.fill();
          const gb = ctx.createLinearGradient(cx - 24, 0, cx + 24, 0); gb.addColorStop(0, '#94a3b8'); gb.addColorStop(.5, '#f8fafc'); gb.addColorStop(1, '#64748b'); ctx.fillStyle = gb; ctx.beginPath(); ctx.moveTo(cx, ry - 30); ctx.quadraticCurveTo(cx + 26, ry, cx + 22, ry + 30); ctx.lineTo(cx + 22, ry + 118); ctx.lineTo(cx - 22, ry + 118); ctx.lineTo(cx - 22, ry + 30); ctx.quadraticCurveTo(cx - 26, ry, cx, ry - 30); ctx.fill(); ctx.fillStyle = '#dc2626'; [-1, 1].forEach(s => { ctx.beginPath(); ctx.moveTo(cx + s * 22, ry + 80); ctx.lineTo(cx + s * 44, ry + 124); ctx.lineTo(cx + s * 22, ry + 112); ctx.fill(); }); ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(cx, ry + 30, 9, 0, TAU); ctx.fill(); });
        pair(cx + 60, ry + 130, 0, al, cx + 60, ry + 40, 'الصاروخ على الغازات', 'الغازات على الصاروخ'); }
      else { const ey = gy - 140, ex = g.x0 + 80, mx = g.x1 - 60; K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; rr(ctx, g.x0, 92, g.x1 - g.x0, gy + 30 - 92, 8); ctx.fill(); const ge = ctx.createRadialGradient(ex - 12, ey - 12, 4, ex, ey, 50); ge.addColorStop(0, '#93c5fd'); ge.addColorStop(1, '#1e3a8a'); ctx.fillStyle = ge; ctx.beginPath(); ctx.arc(ex, ey, 50, 0, TAU); ctx.fill(); const gm = ctx.createRadialGradient(mx - 5, ey - 5, 2, mx, ey, 16); gm.addColorStop(0, '#f1f5f9'); gm.addColorStop(1, '#64748b'); ctx.fillStyle = gm; ctx.beginPath(); ctx.arc(mx, ey, 16, 0, TAU); ctx.fill(); });
        if (vec) { Q53.F(ctx, mx - 20, ey, -al, 0, '#dc2626', 'الأرض على القمر', { ls: 11 }); Q53.F(ctx, ex + 54, ey, al, 0, '#2563eb', 'القمر على الأرض', { ls: 11 }); } Q42.T(ctx, 'الأرض', ex, ey + 70, { s: 12, w: 900, c: '#e2e8f0' }); Q42.T(ctx, 'القمر', mx, ey + 40, { s: 12, w: 900, c: '#e2e8f0' }); }
      const T = TX[md]; Q53.card(ctx, S, [{ t: T[0], c: '#dc2626', w: 800 }, { t: T[1], c: '#2563eb', w: 800 }, { t: T[2], c: '#0f766e', w: 900 }, { t: 'F12 = − F21', mono: 1, c: '#7c3aed', w: 900 }, { t: 'القوتان على خط فعل واحد وفي جسمين مختلفين', c: '#334155' }, { t: 'لذلك لا تحدثان اتزاناً', c: '#334155' }], { title: 'قانون نيوتن الثالث' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.m); if (C.a) Q42.drawChips(ctx, C.a);
      Q42.banner(ctx, w, md === 'sb' ? 'اسحب اليد ✋ وقارن القبانين' : md === 'skate' ? 'اضغط «ادفع» وقارن السرعتين' : 'راقب سهمي الفعل ورد الفعل', '#dc2626');
    },
    chips(S, g) { const m = Q42.chips(S, 'md', MD, g.h - 84, S.md, (S2, k) => { S2.md = k; D.reset(S2); }, { bw: 98, col: '#dc2626' });
      const a = S.md === 'skate' ? Q42.chips(S, 'act', [['push', '🤲 ادفع'], ['re', '↺ أعدهما']], g.h - 128, '', (S2, k) => { D.reset(S2); if (k === 'push') S2.sk = 1; }, { bw: 150 }) : S.md === 'rocket' ? Q42.chips(S, 'act', [['re', '↺ أعد الإطلاق']], g.h - 128, '', S2 => D.reset(S2), { bw: 150 }) : null; return { m, a }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), it = [];
      if (S.md === 'sb') { const ext = clamp(S.Fd / 20, 0, 1.05) * 50; it.push({ id: 'hand', x: g.cx + 140 + ext + 14, y: g.gy - 120, r: 24, axis: 'x', keep: true, tip: 'اسحب لتزيد القوة', idle: 'اسحب ✋', drag: (S2, d) => { setParam(S2, 'F', clamp(Math.round((d.x - g.cx - 154) / 50 * 20), 2, 20)); } }); }
      return it.concat(C.a || [], C.m); },
    readings(S) { const r = [rd('قوة الفعل', Q53.f(S.Fd, 1) + ' N'), rd('قوة رد الفعل', Q53.f(S.Fd, 1) + ' N')]; if (S.md === 'skate') r.push(rd('سرعة الأول', Q53.g(Math.abs(S.v1), 2) + ' m/s'), rd('سرعة الثاني', Q53.g(Math.abs(S.v2), 2) + ' m/s')); return r; },
    explain(S) { return Q26.ex('في كل مثال تظهر قوتان متساويتان في المقدار ومتعاكستان في الاتجاه، كل منهما تؤثر في جسم مختلف.', 'قانون نيوتن الثالث: إذا أثر الجسم الأول في الثاني بقوة F12 أثر الثاني في الأول بقوة F21 = −F12 في اللحظة نفسها. ولأنهما في جسمين مختلفين لا تلغي إحداهما الأخرى، فكل جسم يتعجل بحسب كتلته.', 'السابح يدفع لوحة القفز إلى الأسفل فتدفعه إلى الأعلى (الشكل 24)، والمدفع يرتد إلى الخلف عند الإطلاق.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E1 — القوة العمودية في ست حالات (3-4 a، الشكل 26، ص 62) =============== */
(() => {
  const MD = [['flat', 'N = W'], ['down', 'N = W + F'], ['up', 'N = W − F'], ['pushA', 'N = W + F sinθ'], ['pullA', 'N = W − F sinθ'], ['incl', 'N = W cosθ']];
  const NM = { flat: 'جسم على سطح أفقي', down: 'دفع شاقولي نحو الأسفل', up: 'سحب شاقولي نحو الأعلى', pushA: 'دفع مائل نحو الأسفل', pullA: 'سحب مائل نحو الأعلى', incl: 'جسم على سطح مائل' };
  const BW = 90, BH = 66, LI = 330;
  const D = { id: 'g11_n_normal', page: 62, fig: 'الشكل 26',
    desc: 'القوة العمودية N هي القوة التي يؤثر بها السطح في الجسم الموضوع عليه، وهي عمودية دائماً على السطح ومتجهة بعيداً عنه، وتعد قوة رد فعل مقدارها غير ثابت: N = W على سطح أفقي، N = W + F عند الدفع شاقولياً للأسفل، N = W − F عند السحب شاقولياً للأعلى، N = W + F sinθ عند الدفع المائل للأسفل، N = W − F sinθ عند السحب المائل للأعلى، و N = W cosθ على السطح المائل.',
    tags: 'القوة العمودية N رد فعل السطح الوزن W دفع سحب مائل سطح مائل W cosθ F sinθ ميزان الشكل 26',
    tools: ['ميزان أرضي', 'صندوق', 'حبل', 'سطح مائل'],
    steps: ['اختر الحالة من الأزرار في الأسفل (ست حالات الشكل 26).', 'اسحب يدك ✋ لتغيير مقدار القوة واتجاهها، أو غيّرها من اللوحة.', 'في السطح المائل اسحب قمة السطح لتغيير زاويته.', 'اقرأ الميزان (القوة العمودية) وقارنها بالوزن.'],
    concl: ['القوة العمودية عمودية دائماً على السطح ومتجهة بعيداً عنه.', 'هي قوة رد فعل مقدارها غير ثابت: تساوي محصلة القوى العمودية على السطح.', 'الدفع نحو الأسفل يزيد N ، والسحب نحو الأعلى يقللها.', 'على السطح المائل N = W cosθ وهي أقل من الوزن.'],
    laws: ['g11_l3_normal'],
    controls: [R('m', 'الكتلة m', 2, 20, 10, 1, 'kg'), R('F', 'القوة F', 0, 80, 30, 1, 'N'), R('th', 'الزاوية θ', 0, 60, 30, 1, '°'), TG('cmp', 'المركبتان', true, null, 'axes')],
    setup(S) { S.md = 'pullA'; S.Nd = 0; S.Fd = 0; S.thd = 30; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 344; return { w, h, L, x0, x1, cx: (x0 + x1) / 2, gy: h - 250 }; },
    calc(S) { const W = S.p.m * 10, F = S.Fd, t = S.thd * Math.PI / 180, md = S.md; const s = Math.sin(t); let N = md === 'flat' ? W : md === 'down' ? W + F : md === 'up' ? W - F : md === 'pushA' ? W + F * s : md === 'pullA' ? W - F * s : W * Math.cos(t); return { W, F, t, N: Math.max(0, N), lift: N < 0 }; },
    update(S, dt) { S.Fd = Q53.ez(S.Fd, S.p.F, dt, 10); S.thd = Q53.ez(S.thd, S.p.th, dt, 10); S.Nd = Q53.ez(S.Nd, D.calc(S).N, dt, 8); },
    hpos(S, g) { const md = S.md, c = D.calc(S), Lf = 50 + c.F * 1.6, bx = g.cx, top = g.gy - 24 - BH; if (md === 'down') return [bx, top - Lf, 'y']; if (md === 'up') return [bx, top - Lf, 'y'];
      if (md === 'pullA') { const ax = bx + BW / 2, ay = top + 20; return [ax + Lf * Math.cos(c.t), ay - Lf * Math.sin(c.t), 'xy']; } if (md === 'pushA') { const ax = bx - BW / 2, ay = top + 6; return [ax - Lf * Math.cos(c.t), ay - Lf * Math.sin(c.t), 'xy']; }
      if (md === 'incl') { const a = c.t; return [g.x0 + 10 + LI * Math.cos(a), g.gy - LI * Math.sin(a), 'y']; } return null; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), md = S.md, c = D.calc(S), k = 150 / (c.W + 40), gy = g.gy; Q53.bg(ctx, w, h); Q53.panel(ctx, g.x0 - 6, 70, g.x1 - g.x0 + 12, gy + 60 - 70, NM[md] + ' — الشكل 26');
      Q53.floor(ctx, g.x0, g.x1, gy, 'wood', 18);
      if (md === 'incl') { const a = c.t, xa = g.x0 + 10, xb = xa + LI * Math.cos(a), yb = gy - LI * Math.sin(a); K.raw(ctx, () => { const gg = ctx.createLinearGradient(xa, gy, xb, yb); gg.addColorStop(0, '#d6a46b'); gg.addColorStop(1, '#92400e'); ctx.fillStyle = gg; ctx.beginPath(); ctx.moveTo(xa, gy); ctx.lineTo(xb, gy); ctx.lineTo(xb, yb); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(69,26,3,.6)'; ctx.lineWidth = 1.4; ctx.stroke(); });
        Q51.arc(ctx, xa, gy, 46, 0, S.thd, '#7c3aed', 'θ'); const px = xa + LI * .55 * Math.cos(a), py = gy - LI * .55 * Math.sin(a); Q53.block(ctx, px, py, BW * .8, BH * .8, '#f97316', 'm', -a);
        const cxb = px - Math.sin(a) * BH * .4, cyb = py - Math.cos(a) * BH * .4; Q53.F(ctx, cxb, cyb, 0, c.W * k, '#dc2626', 'W');
        if (S.p.cmp) { Q51.vec(ctx, cxb, cyb, cxb + Math.sin(a) * c.W * Math.cos(a) * k, cyb + Math.cos(a) * c.W * Math.cos(a) * k, '#f59e0b', 'W cosθ', { w: 2.5, dash: [6, 4], side: -1 }); Q51.vec(ctx, cxb, cyb, cxb - Math.cos(a) * c.W * Math.sin(a) * k, cyb + Math.sin(a) * c.W * Math.sin(a) * k, '#f59e0b', 'W sinθ', { w: 2.5, dash: [6, 4] }); }
        Q53.F(ctx, px, py, -Math.sin(a) * S.Nd * k, -Math.cos(a) * S.Nd * k, '#16a34a', 'N'); Q41.knob(ctx, xb, yb, '#dc2626', 9); }
      else { const bx = g.cx, sy = gy - 24, top = sy - BH; K.raw(ctx, () => { const gs = ctx.createLinearGradient(0, sy, 0, gy); gs.addColorStop(0, '#f1f5f9'); gs.addColorStop(1, '#94a3b8'); ctx.fillStyle = gs; rr(ctx, bx - 75, sy, 150, 24, 6); ctx.fill(); ctx.strokeStyle = '#475569'; ctx.stroke(); ctx.fillStyle = '#0f172a'; rr(ctx, bx + 18, sy + 5, 50, 14, 3); ctx.fill(); });
        Q42.T(ctx, Q53.f(S.Nd, 1), bx + 43, sy + 12, { s: 10.5, w: 900, c: '#4ade80', mono: 1 });
        const lift = c.lift ? Math.min(16, 16) : 0, by = sy - lift; Q53.block(ctx, bx, by, BW, BH, '#f97316', null, 0, { brick: 1 }); Q42.T(ctx, S.p.m + ' kg', bx + 22, by - BH + 14, { s: 11, w: 900, c: '#fff' });
        Q53.F(ctx, bx, by - BH / 2, 0, c.W * k, '#dc2626', 'W', { side: -1 }); if (S.Nd > .5) Q53.F(ctx, bx - 30, sy, 0, -S.Nd * k, '#16a34a', 'N');
        const H = D.hpos(S, g); if (H) { if (md === 'down') { Q53.F(ctx, bx + 22, H[1], 0, top - H[1] - 2, '#7c3aed', 'F'); Q53.hand(ctx, bx + 22, H[1] - 6, 1, .8, { rot: Math.PI / 2 }); }
          else if (md === 'up') { Q53.rope(ctx, [[bx + 22, top], [bx + 22, H[1]]]); Q53.F(ctx, bx + 46, top - 6, 0, -(c.F * 1.2 + 8), '#7c3aed', 'F'); Q53.hand(ctx, bx + 22, H[1], 1, .8, { rot: -Math.PI / 2 }); }
          else if (md === 'pullA') { const ax = bx + BW / 2, ay = top + 20; Q53.rope(ctx, [[ax, ay], [H[0], H[1]]]); Q53.F(ctx, ax, ay - 26, (c.F * 1.2 + 8) * Math.cos(c.t), -(c.F * 1.2 + 8) * Math.sin(c.t), '#7c3aed', 'F'); Q53.hand(ctx, H[0], H[1], -1, .75); Q51.dash(ctx, [[ax, ay], [ax + 80, ay]]); Q51.arc(ctx, ax, ay, 40, 0, S.thd, '#7c3aed', 'θ');
            if (S.p.cmp) Q51.vec(ctx, ax + 10, ay, ax + 10, ay - c.F * Math.sin(c.t) * k, '#f59e0b', 'F sinθ', { w: 2.5, dash: [6, 4] }); }
          else if (md === 'pushA') { const ax = bx - BW / 2, ay = top + 6; Q53.F(ctx, H[0], H[1], ax - H[0], ay - H[1], '#7c3aed', 'F', { side: -1 }); Q53.hand(ctx, H[0], H[1], 1, .75, { rot: c.t }); Q51.dash(ctx, [[ax, ay], [ax - 80, ay]]); Q51.arc(ctx, ax, ay, 40, 180 - S.thd, 180, '#7c3aed', 'θ');
            if (S.p.cmp) Q51.vec(ctx, ax - 10, ay - 30, ax - 10, ay - 30 + c.F * Math.sin(c.t) * k, '#f59e0b', 'F sinθ', { w: 2.5, dash: [6, 4], side: -1 }); } }
        if (c.lift) Q42.T(ctx, 'F sinθ أكبر من الوزن: الجسم يرتفع عن السطح', g.cx, 112, { s: 11.5, w: 800, c: '#fff', bg: '#dc2626' }); }
      const fx = MD.find(q => q[0] === md)[1], s = Math.sin(c.t), num = md === 'flat' ? 'N = ' + Q53.g(c.W) : md === 'down' ? 'N = ' + Q53.g(c.W) + ' + ' + Q53.g(c.F, 0) : md === 'up' ? 'N = ' + Q53.g(c.W) + ' − ' + Q53.g(c.F, 0) : md === 'incl' ? 'N = ' + Q53.g(c.W) + ' × ' + Q53.g(Math.cos(c.t), 3) : 'N = ' + Q53.g(c.W) + (md === 'pushA' ? ' + ' : ' − ') + Q53.g(c.F, 0) + ' × ' + Q53.g(s, 3);
      Q53.card(ctx, S, [{ t: 'الحالة: ' + NM[md], c: '#334155', w: 800 }, { t: fx, mono: 1, c: '#dc2626', w: 900 }, { t: num, mono: 1, c: '#475569' }, { t: 'N = ' + Q53.f(S.Nd, 1) + ' N', mono: 1, c: '#16a34a', w: 900 }, { t: 'الوزن W = ' + Q53.g(c.W) + ' N', c: '#dc2626', w: 800 }, { t: 'عمودية على السطح وهي قوة رد فعل', c: '#0f766e', w: 800 }, { t: 'مقدارها غير ثابت', c: '#0f766e', w: 800 }], { title: 'القوة العمودية' });
      Q42.drawChips(ctx, D.chips(S, g)); Q42.banner(ctx, w, md === 'incl' ? 'اسحب قمة السطح ✋ لتغيير الزاوية' : md === 'flat' ? 'اختر حالة أخرى من الأزرار' : 'اسحب يدك ✋ لتغيير القوة', '#dc2626');
    },
    chips(S, g) { return Q42.chips(S, 'md', MD, g.h - 84, S.md, (S2, k) => { S2.md = k; }, { bw: 116, col: '#dc2626' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), H = D.hpos(S, g), it = [];
      if (H) it.push({ id: 'h', x: H[0], y: H[1], r: 24, axis: H[2], keep: true, tip: 'اسحب لتغيير القوة', idle: 'اسحب ✋', drag: (S2, d) => { const md = S2.md, bx = g.cx, top = g.gy - 24 - BH;
        if (md === 'down' || md === 'up') setParam(S2, 'F', clamp(Math.round((top - d.y - 50) / 1.6), 0, 80));
        else if (md === 'pullA') { const ax = bx + BW / 2, ay = top + 20, dx = d.x - ax, dy = ay - d.y; setParam(S2, 'th', clamp(Math.round(Math.atan2(dy, Math.max(1, dx)) * 180 / Math.PI), 0, 60)); setParam(S2, 'F', clamp(Math.round((Math.hypot(dx, dy) - 50) / 1.6), 0, 80)); }
        else if (md === 'pushA') { const ax = bx - BW / 2, ay = top + 6, dx = ax - d.x, dy = ay - d.y; setParam(S2, 'th', clamp(Math.round(Math.atan2(dy, Math.max(1, dx)) * 180 / Math.PI), 0, 60)); setParam(S2, 'F', clamp(Math.round((Math.hypot(dx, dy) - 50) / 1.6), 0, 80)); }
        else if (md === 'incl') setParam(S2, 'th', clamp(Math.round(Math.asin(clamp((g.gy - d.y) / LI, 0, .87)) * 180 / Math.PI), 0, 60)); } });
      return it.concat(D.chips(S, g)); },
    readings(S) { const c = D.calc(S); return [rd('الوزن W', Q53.g(c.W) + ' N'), rd('القوة F', Q53.f(S.Fd, 0) + ' N'), rd('الزاوية', Math.round(S.thd) + '°'), rd('القوة العمودية N', Q53.f(S.Nd, 1) + ' N')]; },
    record(S) { const c = D.calc(S); return { c: NM[S.md], W: Q53.g(c.W), F: Q53.g(S.p.F), th: S.p.th, N: Q53.f(c.N, 1) }; },
    cols: [['c', 'الحالة'], ['W', 'W (N)'], ['F', 'F (N)'], ['th', 'θ (°)'], ['N', 'N (N)']],
    explain(S) { return Q26.ex('قراءة الميزان (القوة العمودية) تتغير مع القوة المؤثرة واتجاهها: تزيد بالدفع نحو الأسفل وتقل بالسحب نحو الأعلى، وتقل على السطح المائل.', 'السطح يؤثر في الجسم بقوة عمودية عليه تساوي محصلة القوى التي تضغط الجسم عمودياً على السطح، لأن الجسم لا يتحرك في هذا الاتجاه. لذلك N قوة رد فعل مقدارها غير ثابت.', 'عند الوقوف على ميزان داخل مصعد يتسارع نحو الأعلى تزداد القراءة.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E2 — الشد والبكرات ومخطط الجسم الحر لخمسة أنظمة + فكر الحصان والزلاجة (الأشكال 27–31، ص 63–64) =============== */
(() => {
  const SY = [['s1', 'جسم يسحب'], ['s2', 'جسمان وحبل'], ['s3', 'منضدة وبكرة'], ['s4', 'سطح مائل وبكرة'], ['s5', 'بكرة معلقة'], ['horse', 'فكر: الحصان 31']];
  const TH = 30 * Math.PI / 180, PXM = 40;
  const D = { id: 'g11_n_fbd', page: 64, fig: 'الأشكال 27–31',
    desc: 'قوة الشد T تنتقل خلال الحبل مهمل الوزن بالمقدار نفسه إلى طرفيه، والبكرة الملساء تغير اتجاه قوة الشد دون أن تغير مقدارها. وعند حل مسائل الحركة نعزل كل جسم عن محيطه ونرسم عليه جميع القوى المؤثرة فيه: هذا هو مخطط الجسم الحر (الشكل 30). والقوى بين أجزاء النظام قوى داخلية، أما القوى التي يؤثر بها المحيط في النظام فقوى خارجية (الشكل 29).',
    tags: 'قوة الشد T الحبل مهمل الوزن البكرة تغير الاتجاه القوى الداخلية والخارجية مخطط الجسم الحر عزل الجسم الحصان والزلاجة الشكل 27 الشكل 28 الشكل 29 الشكل 30 الشكل 31',
    tools: ['أجسام', 'حبل خفيف', 'بكرة ملساء', 'سطح أملس', 'سطح مائل'],
    steps: ['اختر النظام من الأزرار في الأسفل (أنظمة الشكل 30).', 'اضغط «⬇ القوة التالية» لترسم القوى على كل جسم معزول واحدة بعد أخرى.', 'غيّر الكتلتين والقوة من اللوحة واقرأ التعجيل والشد في البطاقة.', 'اضغط «▶ حرّك» لترى النظام يتحرك بالتعجيل المحسوب، واختر «فكر: الحصان» للشكل 31.'],
    concl: ['مخطط الجسم الحر: نعزل الجسم ونرسم عليه كل القوى الخارجية المؤثرة فيه فقط.', 'الحبل مهمل الوزن ينقل قوة الشد نفسها إلى طرفيه، والبكرة الملساء تغير اتجاهها فقط.', 'الشد بين جسمين مربوطين قوة داخلية للنظام كله، لكنه قوة خارجية على كل جسم معزول.', 'الحصان يتحرك لأن الأرض تدفعه إلى الأمام، والزلاجة تتحرك لأن الحبل يسحبها.'],
    laws: ['g11_l3_second', 'g11_l3_atwood'],
    controls: [R('m1', 'الكتلة m1', 1, 10, 2, .5, 'kg'), R('m2', 'الكتلة m2', 1, 10, 3, .5, 'kg'), R('F', 'القوة F', 5, 60, 20, 1, 'N'), TG('all', 'كل القوى مرة واحدة', false, null, 'force')],
    setup(S) { S.sy = 's3'; S.kf = 0; S.sel = -1; D.reset(S); },
    reset(S) { S.run = 0; S.tc = 0; S.ds = 0; S.rot = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 344; return { w, h, L, x0, x1, cx: (x0 + x1) / 2, py: 352, ph: h - 180 - 352 }; },
    phys(S) { const m1 = S.p.m1, m2 = S.p.m2, F = S.p.F, g = 10, sy = S.sy; let a = 0, T = 0, B = [];
      if (sy === 's1') { a = F / m1; B = [['m1', [['W1', 0, 1, m1 * g], ['N', 0, -1, m1 * g], ['F', 1, 0, F]]]]; }
      else if (sy === 's2') { a = F / (m1 + m2); T = m1 * a; B = [['m1', [['W1', 0, 1, m1 * g], ['N1', 0, -1, m1 * g], ['T', 1, 0, T]]], ['m2', [['W2', 0, 1, m2 * g], ['N2', 0, -1, m2 * g], ['F', 1, 0, F], ['−T', -1, 0, T]]]]; }
      else if (sy === 's3') { a = m2 * g / (m1 + m2); T = m1 * a; B = [['m1', [['W1', 0, 1, m1 * g], ['N', 0, -1, m1 * g], ['T', 1, 0, T]]], ['m2', [['W2', 0, 1, m2 * g], ['T', 0, -1, T]]]]; }
      else if (sy === 's4') { a = (m2 - m1 * Math.sin(TH)) * g / (m1 + m2); T = m2 * (g - a); B = [['m1', [['W1', 0, 1, m1 * g], ['N', -Math.sin(TH), -Math.cos(TH), m1 * g * Math.cos(TH)], ['T', Math.cos(TH), -Math.sin(TH), T]]], ['m2', [['W2', 0, 1, m2 * g], ['T', 0, -1, T]]]]; }
      else if (sy === 's5') { a = (m2 - m1) * g / (m1 + m2); T = 2 * m1 * m2 * g / (m1 + m2); B = [['m1', [['W1', 0, 1, m1 * g], ['T', 0, -1, T]]], ['m2', [['W2', 0, 1, m2 * g], ['T', 0, -1, T]]]]; }
      else { a = F / (m1 * 20 + m2 * 100) * 20; a = F / (m1 + m2); T = m1 * a; B = [['الزلاجة', [['W', 0, 1, m1 * g], ['N', 0, -1, m1 * g], ['T', 1, 0, T]]], ['الحصان', [['W', 0, 1, m2 * g], ['N', 0, -1, m2 * g], ['−T', -1, 0, T], ['f', 1, 0, F]]]]; }
      return { a, T, B, n: B.reduce((s, b) => s + b[1].length, 0) }; },
    update(S, dt) { if (!S.run) return; const P = D.phys(S); S.tc += dt; const lim = 3; S.ds = .5 * P.a * S.tc * S.tc; if (Math.abs(S.ds) > lim) { S.ds = Math.sign(S.ds) * lim; S.run = 0; } S.rot = S.ds * PXM / 16; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), sy = S.sy, P = D.phys(S), d = S.ds * PXM, x0 = g.x0, x1 = g.x1; Q53.bg(ctx, w, h);
      Q53.panel(ctx, x0 - 6, 70, x1 - x0 + 12, 268, 'النظام — الشكل ' + (sy === 'horse' ? '31' : '30'));
      const box = (x, y, bw, bh, lab, col, rot, i) => { Q53.block(ctx, x, y, bw, bh, col, lab, rot || 0, { ls: 11 }); if (S.sel === i) K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot || 0); ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3; ctx.setLineDash([5, 4]); ctx.strokeRect(-bw / 2 - 5, -bh - 5, bw + 10, bh + 10); ctx.restore(); }); };
      const dd = clamp(d, -110, 110);
      if (sy === 's1' || sy === 's2') { const fy = 290; Q53.floor(ctx, x0, x1, fy, 'smooth', 12); if (sy === 's1') { const bx = x0 + 80 + Math.min(dd, 200); box(bx, fy, 56, 42, 'm', '#3b82f6', 0, 0); Q53.F(ctx, bx + 28, fy - 21, 26 + S.p.F * 1.4, 0, '#dc2626', 'F'); }
        else { const b1 = x0 + 60 + Math.min(dd, 150), b2 = b1 + 130; Q53.rope(ctx, [[b1 + 26, fy - 18], [b2 - 26, fy - 18]]); box(b1, fy, 52, 40, 'm1', '#3b82f6', 0, 0); box(b2, fy, 52, 40, 'm2', '#16a34a', 0, 1); Q53.F(ctx, b2 + 26, fy - 20, 26 + S.p.F * 1.2, 0, '#dc2626', 'F'); } }
      else if (sy === 's3') { const ty = 190, xe = x1 - 80; K.raw(ctx, () => { ctx.fillStyle = '#b91c1c'; ctx.fillRect(x0, ty, xe - x0, 14); ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.moveTo(xe - 40, ty + 14); ctx.lineTo(xe, ty + 14); ctx.lineTo(xe, 330); ctx.lineTo(xe - 40, 330); ctx.fill(); ctx.strokeStyle = 'rgba(127,29,29,.5)'; for (let y = ty + 26; y < 330; y += 12) { ctx.beginPath(); ctx.moveTo(xe - 40, y); ctx.lineTo(xe, y); ctx.stroke(); } });
        const px = xe + 14, pyy = ty - 14, b1 = x0 + 70 + clamp(d, 0, 140), hy = 250 + clamp(d, 0, 60); Q53.rope(ctx, [[b1 + 26, ty - 20], [px, ty - 20 - 8]]); Q53.rope(ctx, [[px + 16, pyy], [px + 16, hy - 36]]); Q53.pulley(ctx, px, pyy, 16, S.rot, { ax: -16, ay: 6 }); box(b1, ty, 52, 40, 'm1', '#3b82f6', 0, 0); box(px + 16, hy, 40, 36, 'm2', '#16a34a', 0, 1); }
      else if (sy === 's4') { const xa = x0 + 10, ya = 300, xe = x1 - 70, ye = ya - (xe - xa) * Math.tan(TH); Q53.wedge(ctx, xa, ya, xe, ye, '#ef4444'); Q51.arc(ctx, xa, ya, 40, 0, 30, '#7c3aed', '30°');
        const px = xe + 12, pyy = ye - 12, sl = (xe - xa) / Math.cos(TH), s0 = sl * .45 + clamp(d, -90, 70), bxp = xa + s0 * Math.cos(TH), byp = ya - s0 * Math.sin(TH), hy = 250 - clamp(d, -90, 70) * .6;
        const ax = bxp + Math.cos(TH) * 24 - Math.sin(TH) * 16, ay = byp - Math.sin(TH) * 24 - Math.cos(TH) * 16; Q53.rope(ctx, [[ax, ay], [px - 4, pyy - 12]]); Q53.rope(ctx, [[px + 16, pyy], [px + 16, hy - 34]]); Q53.pulley(ctx, px, pyy, 16, S.rot, { ax: -14, ay: 10 }); box(bxp, byp, 48, 34, 'm1', '#3b82f6', -TH, 0); box(px + 16, hy, 38, 34, 'm2', '#16a34a', 0, 1); }
      else if (sy === 's5') { const cx = g.cx, cy = 130; K.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(cx - 90, 92, 180, 10); ctx.fillStyle = '#475569'; ctx.fillRect(cx - 3, 100, 6, cy - 100); }); const dv = clamp(d, -80, 80), y1 = 250 - dv, y2 = 250 + dv;
        Q53.rope(ctx, [[cx - 26, cy], [cx - 26, y1 - 40]]); Q53.rope(ctx, [[cx + 26, cy], [cx + 26, y2 - 40]]); Q53.pulley(ctx, cx, cy, 26, S.rot, { arm: false }); box(cx - 26, y1, 40, 40, 'm1', '#3b82f6', 0, 0); box(cx + 26, y2, 40, 40, 'm2', '#16a34a', 0, 1); }
      else { const fy = 290; Q53.floor(ctx, x0, x1, fy, 'ice', 12); const sx = x0 + 60 + clamp(d, 0, 120), hx = sx + 150; Q53.rope(ctx, [[sx + 34, fy - 28], [hx - 30, fy - 52]]);
        K.raw(ctx, () => { ctx.strokeStyle = '#78350f'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx - 40, fy - 4); ctx.lineTo(sx + 40, fy - 4); ctx.quadraticCurveTo(sx + 52, fy - 4, sx + 50, fy - 16); ctx.stroke(); ctx.fillStyle = '#b45309'; rr(ctx, sx - 36, fy - 36, 66, 24, 6); ctx.fill(); if (S.sel === 0) { ctx.strokeStyle = '#facc15'; ctx.setLineDash([5, 4]); ctx.strokeRect(sx - 44, fy - 44, 98, 44); ctx.setLineDash([]); } });
        D.horse(ctx, hx, fy, S.tc * 8 * (S.run ? 1 : 0)); if (S.sel === 1) K.raw(ctx, () => { ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3; ctx.setLineDash([5, 4]); ctx.strokeRect(hx - 50, fy - 92, 110, 92); ctx.setLineDash([]); }); }
      // free-body panels
      const nb = P.B.length, pw = (w - 24 - x0) / nb - 8; let cnt = 0, kmax = Math.max(...P.B.map(b => Math.max(...b[1].map(f => f[3]))));
      P.B.forEach((b, i) => { const px = x0 - 6 + i * (pw + 8), cx = px + pw / 2, cy = g.py + g.ph / 2 + 4; Q53.panel(ctx, px, g.py, pw, g.ph, 'مخطط الجسم الحر: ' + b[0], i ? '#16a34a' : '#2563eb');
        const rot = sy === 's4' && i === 0 ? -TH : 0; K.raw(ctx, () => { ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.fillStyle = i ? 'rgba(22,163,74,.18)' : 'rgba(59,130,246,.18)'; ctx.strokeStyle = i ? '#16a34a' : '#2563eb'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]); ctx.fillRect(-26, -22, 52, 44); ctx.strokeRect(-26, -22, 52, 44); ctx.restore(); });
        b[1].forEach(f => { cnt++; if (!S.p.all && cnt > S.kf) return; const L = 22 + f[3] / kmax * (g.ph / 2 - 62), ox = f[1] ? Math.sign(f[1]) * 0 : 0; const off = f[0].includes('T') && f[2] === 0 ? 0 : 0; Q53.F(ctx, cx + ox + off, cy, f[1] * L, f[2] * L, f[0][0] === 'W' ? '#dc2626' : f[0][0] === 'N' ? '#16a34a' : f[0] === 'F' || f[0] === 'f' ? '#7c3aed' : '#b45309', f[0], { ls: 13, at: 1.08, off: 0 }); });
        Q42.T(ctx, b[1].map(f => f[0] + ' = ' + Q53.f(f[3], 1)).join('   '), cx, g.py + g.ph - 14, { s: 10, w: 800, c: '#334155', mono: 1 }); });
      const sh = sy === 's4' && P.a < 0 ? 'm1 ينزلق إلى الأسفل' : sy === 's5' && P.a === 0 ? 'الكتلتان متساويتان: a = 0' : '';
      const notes = { s1: 'F هي القوة المحصلة: a = F / m', s2: 'الشد T قوة داخلية للنظام m1 + m2', s3: 'البكرة غيرت اتجاه الشد من أفقي إلى شاقولي', s4: 'الشد على السطح المائل يوازي السطح', s5: 'الشد متساوٍ على جانبي البكرة', horse: 'الأرض تدفع الحصان إلى الأمام بقوة f' };
      Q53.card(ctx, S, [{ t: 'النظام: ' + SY.find(q => q[0] === sy)[1], c: '#334155', w: 800 }, { t: 'a = ' + Q53.g(P.a, 2) + ' m/s²', mono: 1, c: '#dc2626', w: 900 }].concat(P.T ? [{ t: 'T = ' + Q53.g(P.T, 2) + ' N', mono: 1, c: '#b45309', w: 900 }] : []).concat([{ t: notes[sy], c: '#0f766e', w: 800 }, { t: 'نعزل كل جسم ونرسم القوى المؤثرة فيه فقط', c: '#475569' }]).concat(sh ? [{ t: sh, c: '#7c3aed', w: 800 }] : []), { title: 'مخطط الجسم الحر' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.s); Q42.drawChips(ctx, C.a);
      Q42.banner(ctx, w, 'اضغط «⬇ القوة التالية» أو اضغط جسماً لعزله', '#dc2626');
    },
    horse(ctx, x, y, ph) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); const leg = (lx, a) => { ctx.strokeStyle = '#78350f'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lx, -46); ctx.lineTo(lx + Math.sin(a) * 12, -22); ctx.lineTo(lx + Math.sin(a) * 6, 0); ctx.stroke(); };
      leg(-26, Math.sin(ph)); leg(28, -Math.sin(ph)); const gb = ctx.createLinearGradient(0, -70, 0, -40); gb.addColorStop(0, '#b45309'); gb.addColorStop(1, '#78350f'); ctx.fillStyle = gb; ctx.beginPath(); ctx.ellipse(0, -54, 40, 16, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.moveTo(30, -62); ctx.lineTo(48, -88); ctx.lineTo(62, -84); ctx.lineTo(44, -56); ctx.fill(); ctx.beginPath(); ctx.ellipse(60, -84, 12, 7, .5, 0, TAU); ctx.fill(); ctx.strokeStyle = '#451a03'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-40, -56); ctx.quadraticCurveTo(-54, -46, -50, -30); ctx.stroke(); leg(-18, -Math.sin(ph)); leg(36, Math.sin(ph)); ctx.restore(); }); },
    chips(S, g) { const P = D.phys(S); return { s: Q42.chips(S, 'sy', SY, g.h - 84, S.sy, (S2, k) => { S2.sy = k; S2.kf = 0; S2.sel = -1; D.reset(S2); }, { bw: 116, col: '#dc2626' }),
      a: Q42.chips(S, 'act', [['nx', '⬇ القوة التالية'], ['clr', '✖ امسح القوى'], ['go', S.run ? '⏸ أوقف' : '▶ حرّك'], ['re', '↺ أعد']], g.h - 128, '', (S2, k) => { if (k === 'nx') S2.kf = Math.min(P.n, S2.kf + 1); else if (k === 'clr') S2.kf = 0; else if (k === 'go') { if (Math.abs(S2.ds) >= 3) D.reset(S2); S2.run = S2.run ? 0 : 1; } else D.reset(S2); }, { bw: 150 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), sy = S.sy, d = S.ds * PXM, it = [];
      const pos = sy === 's1' ? [[g.x0 + 80 + Math.min(d, 200), 270]] : sy === 's2' ? [[g.x0 + 60 + Math.min(d, 150), 270], [g.x0 + 190 + Math.min(d, 150), 270]] : sy === 's3' ? [[g.x0 + 70 + clamp(d, 0, 140), 170], [g.x1 - 50, 232 + clamp(d, 0, 60)]] : sy === 's5' ? [[g.cx - 26, 230 - clamp(d, -80, 80)], [g.cx + 26, 230 + clamp(d, -80, 80)]] : sy === 's4' ? [[g.x0 + 130, 220], [g.x1 - 42, 234]] : [[g.x0 + 60 + clamp(d, 0, 120), 266], [g.x0 + 210 + clamp(d, 0, 120), 240]];
      pos.forEach((p, i) => it.push({ id: 'b' + i, x: p[0], y: p[1], r: 26, axis: 'none', tip: 'اضغط لعزل الجسم', idle: i ? undefined : 'اضغطني', hint: i ? false : undefined, click: S2 => { S2.sel = S2.sel === i ? -1 : i; } }));
      return it.concat(C.a, C.s); },
    readings(S) { const P = D.phys(S); return [rd('التعجيل a', Q53.g(P.a, 2) + ' m/s²'), rd('الشد T', Q53.g(P.T, 2) + ' N'), rd('القوى المرسومة', (S.p.all ? P.n : S.kf) + ' من ' + P.n)]; },
    explain(S) { return Q26.ex('على كل جسم معزول نرسم وزنه نحو الأسفل، والقوة العمودية من السطح، وقوة الشد على امتداد الحبل، وأي قوة خارجية أخرى.', 'مخطط الجسم الحر يحول المسألة إلى معادلات: نطبق ΣF = m a على كل جسم بمفرده. الحبل مهمل الوزن ينقل الشد نفسه إلى طرفيه، والبكرة الملساء تغير اتجاهه فقط، والشد بين جسمين في النظام قوة داخلية.', 'المهندس يرسم مخطط القوى على كل جزء من الجسر أو الرافعة قبل بنائها.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== E3 — مثال 1: جسمان على بكرة 2 kg و 3 kg (الشكل 32، ص 65) =============== */
(() => {
  const PXM = 70;
  const EX = { title: 'مثال 1 ص 65', q: 'جسمان كتلتاهما 2 kg و 3 kg معلقان بطرفي حبل خفيف يمر فوق بكرة ملساء. احسب التعجيل والشد. g = 10 m/s²',
    lines: ['الجسم الأول يصعد: T − m1 g = m1 a', 'T − 20 = 2a ⟸ T = 20 + 2a', 'الجسم الثاني ينزل: m2 g − T = m2 a', '30 − T = 3a ⟸ T = 30 − 3a', '20 + 2a = 30 − 3a ⟸ 5a = 10', 'a = 2 m/s²', 'T = 20 + 2 × 2 = 24 N'] };
  const D = { id: 'g11_n_atwood', page: 65, fig: 'الشكل 32',
    desc: 'مثال 1: جسمان كتلتاهما 2 kg و 3 kg معلقان بطرفي حبل مهمل الوزن يمر فوق بكرة ملساء. الجسم الأثقل ينزل والأخف يصعد بالتعجيل نفسه: T − m1 g = m1 a و m2 g − T = m2 a ، ومنهما a = 2 m/s² و T = 24 N. وإذا تساوت الكتلتان يكون التعجيل صفراً.',
    tags: 'مثال 1 بكرة جسمان معلقان آلة أتوود التعجيل الشد 2 kg 3 kg a = 2 T = 24 مخطط الجسم الحر الشكل 32',
    tools: ['بكرة ملساء', 'حبل خفيف', 'ثقلان 2 kg و 3 kg', 'ساعة توقيت', 'قبان حلزوني صغير'],
    steps: ['اضغط «▶ أطلق» وراقب الجسمين: أيهما ينزل؟', 'اضغط «الحل خطوة خطوة» ثم «⬇ الخطوة التالية» لحل المثال.', 'اقرأ القبان في الحبل: يقرأ الشد T = 24 N أثناء الحركة.', 'اضغط «m1 = m2 ؟» أو غيّر الكتلتين من اللوحة. اسحب الجسم الثاني ✋ لتغيير موضع البداية.'],
    concl: ['الجسم الأثقل ينزل والأخف يصعد بتعجيل واحد مقداره a = (m2 − m1) g / (m1 + m2).', 'للمثال: a = 2 m/s² و T = 24 N.', 'الشد أكبر من وزن الجسم الصاعد وأصغر من وزن الجسم النازل: 20 < 24 < 30.', 'إذا كانت m1 = m2 فالتعجيل صفر: يبقى النظام ساكناً أو يتحرك بسرعة ثابتة.'],
    laws: ['g11_l3_atwood', 'g11_l3_second'],
    controls: [R('m1', 'الكتلة m1', .5, 6, 2, .5, 'kg'), R('m2', 'الكتلة m2', .5, 6, 3, .5, 'kg'), TG('sb', 'قبان في الحبل', true, null, 'gauge'), TG('vec', 'أسهم القوى', true, null, 'force')],
    setup(S) { S.ex = 0; S.k = 0; S.y0 = 0; S.y0t = 0; D.reset(S); },
    reset(S) { S.run = 0; S.tc = 0; S.s = 0; S.v = 0; S.done = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 344; return { w, h, L, x0, x1, cx: (x0 + x1) / 2, py: 150, fy: h - 200 }; },
    phys(S) { const m1 = S.p.m1, m2 = S.p.m2; return { a: (m2 - m1) * 10 / (m1 + m2), T: 2 * m1 * m2 * 10 / (m1 + m2) }; },
    update(S, dt) { S.y0 = Q53.ez(S.y0, S.y0t, dt, 12); if (!S.run) return; const P = D.phys(S); S.tc += dt * .6; S.v = P.a * S.tc; S.s = .5 * P.a * S.tc * S.tc; const lim = 1.2; if (Math.abs(S.s + S.y0) > lim) { S.s = Math.sign(S.s + S.y0) * lim - S.y0; S.run = 0; S.done = 1; } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), P = D.phys(S), cx = g.cx, py = g.py, r = 40, sp = (S.s + S.y0) * PXM, y1 = 400 - sp, y2 = 400 + sp, m1 = S.p.m1, m2 = S.p.m2; Q53.bg(ctx, w, h);
      Q53.panel(ctx, g.x0 - 6, 70, g.x1 - g.x0 + 12, g.fy + 30 - 70, 'جسمان على بكرة — مثال 1');
      K.raw(ctx, () => { const gc = ctx.createLinearGradient(0, 84, 0, 98); gc.addColorStop(0, '#64748b'); gc.addColorStop(1, '#1e293b'); ctx.fillStyle = gc; ctx.fillRect(cx - 120, 98, 240, 12); ctx.fillStyle = '#475569'; ctx.fillRect(cx - 4, 110, 8, py - 110); });
      Q53.floor(ctx, g.x0, g.x1, g.fy, 'wood', 16);
      const s1 = 24 + Math.sqrt(m1) * 10, s2 = 24 + Math.sqrt(m2) * 10;
      const sbY = y1 - s1 - 90; Q53.rope(ctx, [[cx - r, py], [cx - r, S.p.sb ? sbY - 8 : y1 - s1]]); if (S.p.sb) { Q53.rope(ctx, [[cx - r, sbY + 62], [cx - r, y1 - s1]]); K.raw(ctx, () => { const gs = ctx.createLinearGradient(cx - r - 9, 0, cx - r + 9, 0); gs.addColorStop(0, '#b45309'); gs.addColorStop(.5, '#fde68a'); gs.addColorStop(1, '#b45309'); ctx.fillStyle = gs; rr(ctx, cx - r - 9, sbY - 8, 18, 64, 6); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(cx - r - 4, sbY - 2, 8, 52); ctx.fillStyle = '#dc2626'; ctx.fillRect(cx - r - 6, sbY + 4 + clamp(P.T / 60, 0, 1) * 40 * (S.run || S.done ? 1 : 0) + (S.run || S.done ? 0 : clamp(m1 * 10 / 60, 0, 1) * 40), 12, 3); });
        const Tread = S.run || S.done ? P.T : (P.a === 0 ? m1 * 10 : m1 * 10); Q42.T(ctx, 'T = ' + Q53.f(S.run || S.done ? P.T : m1 * 10, 1) + ' N', cx - r - 58, sbY + 26, { s: 11, w: 900, c: '#0f172a', bg: '#fef3c7', mono: 1 }); }
      Q53.rope(ctx, [[cx + r, py], [cx + r, y2 - s2]]);
      Q53.pulley(ctx, cx, py, r, (S.s + S.y0) * PXM / r, { arm: false }); K.raw(ctx, () => { ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.arc(cx, py, r, Math.PI, TAU); ctx.stroke(); });
      Q53.block(ctx, cx - r, y1, s1, s1, '#3b82f6', 'm1', 0, { ls: 11 }); Q53.block(ctx, cx + r, y2, s2, s2, '#ef4444', 'm2', 0, { ls: 11 });
      Q42.T(ctx, Q53.g(m1) + ' kg', cx - r - s1 / 2 - 30, y1 - s1 / 2, { s: 11, w: 900, c: '#1d4ed8', mono: 1 }); Q42.T(ctx, Q53.g(m2) + ' kg', cx + r + s2 / 2 + 30, y2 - s2 / 2, { s: 11, w: 900, c: '#b91c1c', mono: 1 });
      if (S.p.vec) { const k = 2.2; Q53.F(ctx, cx - r - 4, y1 - s1 / 2, 0, m1 * 10 * k * .9, '#dc2626', 'W1', { side: -1 }); Q53.F(ctx, cx + r + 4, y2 - s2 / 2, 0, m2 * 10 * k * .9, '#dc2626', 'W2'); if (Math.abs(P.a) > .01) { Q53.F(ctx, cx - r - s1 / 2 - 60, y1 - s1, 0, -Math.sign(P.a) * 40, '#0f766e', 'a', { w: 3 }); Q53.F(ctx, cx + r + s2 / 2 + 60, y2 - s2, 0, Math.sign(P.a) * 40, '#0f766e', 'a', { w: 3 }); } }
      Q42.T(ctx, 't = ' + Q53.f(S.tc, 2) + ' s', g.x0 + 50, 112, { s: 11.5, w: 900, c: '#334155', mono: 1, bg: 'rgba(255,255,255,.9)' }); Q42.T(ctx, 'v = ' + Q53.f(Math.abs(S.v), 2) + ' m/s', g.x0 + 50, 134, { s: 11.5, w: 900, c: '#334155', mono: 1, bg: 'rgba(255,255,255,.9)' });
      if (m1 === m2) Q42.T(ctx, 'الكتلتان متساويتان: a = 0', cx, g.fy - 20, { s: 12, w: 900, c: '#fff', bg: '#7c3aed' });
      if (S.ex) Q53.steps(ctx, S, Object.assign({}, EX, { k: S.k }));
      else Q53.card(ctx, S, [{ t: 'a = (m2 − m1) g / (m1 + m2)', mono: 1, c: '#dc2626', w: 900 }, { t: 'a = ' + Q53.g(P.a, 2) + ' m/s²', mono: 1, c: '#0f766e', w: 900 }, { t: 'T = 2 m1 m2 g / (m1 + m2)', mono: 1, c: '#b45309', w: 900 }, { t: 'T = ' + Q53.g(P.T, 2) + ' N', mono: 1, c: '#b45309', w: 900 }, { t: 'الأثقل ينزل والأخف يصعد بالتعجيل نفسه', c: '#334155' }], { title: 'جسمان على بكرة' });
      const C = D.chips(S, g); Q53.drawSteps(ctx, C.e); Q42.drawChips(ctx, C.p);
      Q42.banner(ctx, w, 'اضغط «▶ أطلق» ثم «الحل خطوة خطوة»', '#dc2626');
    },
    chips(S, g) { return { e: Q53.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => { setParam(S2, 'm1', 2); setParam(S2, 'm2', 3); D.reset(S2); }, EX.lines.length),
      p: Q53.play(S, 'pl', g.h - 128, S.run, S2 => { if (S2.done) D.reset(S2); S2.run = S2.run ? 0 : 1; }, S2 => D.reset(S2), { go: '▶ أطلق', more: [['eq', 'm1 = m2 ؟'], ['bk', '2 kg و 3 kg']], onMore: (S2, k) => { if (k === 'eq') setParam(S2, 'm2', S2.p.m1); else { setParam(S2, 'm1', 2); setParam(S2, 'm2', 3); } D.reset(S2); } }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), s2 = 24 + Math.sqrt(S.p.m2) * 10, y2 = 400 + (S.s + S.y0) * PXM;
      return [{ id: 'm2', x: g.cx + 40, y: y2 - s2 / 2, r: 26, axis: 'y', keep: true, tip: 'اسحب لتغيير موضع البداية', idle: 'اسحب ✋', drag: (S2, d) => { if (S2.run) return; D.reset(S2); S2.y0t = clamp((d.y + s2 / 2 - 400) / PXM, -1, 1); } }].concat(C.p, C.e); },
    readings(S) { const P = D.phys(S); return [rd('التعجيل a', Q53.g(P.a, 2) + ' m/s²'), rd('الشد T', Q53.g(P.T, 2) + ' N'), rd('وزن m1', Q53.g(S.p.m1 * 10) + ' N'), rd('وزن m2', Q53.g(S.p.m2 * 10) + ' N'), rd('الزمن', Q53.f(S.tc, 2) + ' s')]; },
    record(S) { const P = D.phys(S); return { m1: S.p.m1, m2: S.p.m2, a: Q53.g(P.a, 2), T: Q53.g(P.T, 2) }; },
    cols: [['m1', 'm1 (kg)'], ['m2', 'm2 (kg)'], ['a', 'a (m/s²)'], ['T', 'T (N)']],
    explain(S) { return Q26.ex('الجسم الأثقل ينزل والأخف يصعد، والقبان في الحبل يقرأ قيمة بين وزني الجسمين.', 'نرسم مخطط الجسم الحر لكل جسم: على الصاعد T − m1 g = m1 a وعلى النازل m2 g − T = m2 a. بجمع المعادلتين: a = (m2 − m1) g / (m1 + m2). للمثال a = 2 m/s² و T = 24 N.', 'المصاعد تستخدم ثقلاً موازناً على الطرف الآخر من الحبل فتقل القوة التي يحتاجها المحرك.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F1 — الاحتكاك السكوني والحركي (3-6، الشكلان 33 و 34، ص 66–67) =============== */
(() => {
  const SU = [['wood', 'خشب', .5, .3], ['rough', 'سطح خشن', .7, .5], ['rubber', 'مطاط', .9, .7], ['ice', 'جليد', .1, .04]];
  const D = { id: 'g11_n_friction', page: 66, fig: 'الشكلان 33 و 34',
    desc: 'الاحتكاك ينشأ من نقاط الاتصال المجهرية بين السطحين (الشكل 33). الاحتكاك السكوني يساوي القوة المؤثرة ويعاكسها ما دام الجسم ساكناً حتى يبلغ نهايته العظمى fs = μs N عندما يكون الجسم على وشك الحركة. بعد بدء الحركة يصبح الاحتكاك حركياً fk = μk N وهو أصغر من أقصى احتكاك سكوني، ولا يعتمد على مساحة السطحين المتلامسين بل على طبيعتهما والقوة العمودية.',
    tags: 'الاحتكاك السكوني الاحتكاك الحركي الانزلاقي معامل الاحتكاك μs μk نقاط الاتصال المجهرية القوة العمودية مساحة السطحين قبان الشكل 33 الشكل 34',
    tools: ['قطعة خشب على شكل متوازي مستطيلات', 'قبان حلزوني', 'أسطح مختلفة', 'أثقال'],
    steps: ['اسحب اليد ✋ ببطء نحو اليمين (أو اضغط «اسحب تدريجياً») وراقب قراءة القبان.', 'القطعة لا تتحرك حتى تبلغ القوة μs N ، ثم تنزلق وتقل القراءة إلى μk N.', 'غيّر الكتلة أو نوع السطح وقارن. شغّل «القطعة على جانبها» وتأكد أن الاحتكاك لا يتغير.', 'شغّل «مجهر» لترى نقاط الاتصال بين السطحين.'],
    concl: ['الاحتكاك السكوني يزداد مع القوة المؤثرة حتى نهايته العظمى fs = μs N.', 'بعد بدء الحركة يصبح الاحتكاك حركياً fk = μk N وهو أصغر، لذلك تقل قراءة القبان.', 'قوة الاحتكاك تتناسب مع القوة العمودية: مضاعفة الكتلة تضاعفها.', 'الاحتكاك لا يعتمد على مساحة السطحين المتلامسين، بل على طبيعتهما.'],
    laws: ['g11_l3_static', 'g11_l3_kinetic'],
    controls: [R('m', 'الكتلة m', 1, 10, 4, .5, 'kg'), TG('side', 'القطعة على جانبها', false, null, 'box'), TG('zoom', 'مجهر: نقاط الاتصال', true, null, 'search')],
    setup(S) { S.su = 'wood'; S.P = 0; S.Pt = 0; S.ramp = 0; D.reset(S); },
    reset(S) { S.x = 0; S.v = 0; S.mv = 0; S.hist = []; S.ht = 0; S.f = 0; S.P = 0; S.Pt = 0; S.ramp = 0; },
    mu(S) { const q = SU.find(s => s[0] === S.su); return { s: q[2], k: q[3], n: q[1] }; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 344; return { w, h, L, x0, x1, fy: 290 }; },
    update(S, dt) { const u = D.mu(S), N = S.p.m * 10, fsm = u.s * N, fk = u.k * N; if (S.ramp) S.Pt = Math.min(fsm * 1.4 + 2, S.Pt + dt * fsm * .35); S.P = Q53.ez(S.P, S.Pt, dt, 8);
      if (!S.mv) { if (S.P > fsm) { S.mv = 1; } S.f = S.mv ? fk : S.P; } if (S.mv) { S.f = fk; S.v += (S.P - fk) / S.p.m * dt; if (S.v <= 0) { S.v = 0; S.mv = 0; S.f = S.P; } S.x += S.v * dt * 40; if (S.x > 150) { S.x = 0; } }
      S.ht += dt; if (!S.hist.length || S.ht - S.hist[S.hist.length - 1][0] > .05) { S.hist.push([S.ht, S.f]); if (S.hist.length > 160) S.hist.shift(); } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), u = D.mu(S), N = S.p.m * 10, fy = g.fy; Q53.bg(ctx, w, h); Q53.panel(ctx, g.x0 - 6, 70, g.x1 - g.x0 + 12, 260, 'نسحب القطعة بالقبان على ' + u.n + ' — الشكل 34');
      Q53.floor(ctx, g.x0, g.x1, fy, S.su === 'rubber' ? 'rubber' : S.su, 18); const bw = S.p.side ? 60 : 110, bh = S.p.side ? 70 : 44, bx = g.x0 + 70 + S.x; Q53.block(ctx, bx, fy, bw, bh, '#b45309', S.p.m + ' kg', 0, { ls: 11 });
      const xa = bx + bw / 2 + 120 + clamp(S.P / 60, 0, 1) * 60; Q53.hsb(ctx, xa, fy - 20, bx + bw / 2, S.P, 60, { len: 80 }); Q53.hand(ctx, xa + 14, fy - 20, -1, .8);
      if (S.P > .3) Q53.F(ctx, bx + bw / 2, fy - bh - 14, 18 + S.P * 1.6, 0, '#7c3aed', 'F'); if (S.f > .3) Q53.F(ctx, bx - bw / 2 + 6, fy - 4, -(18 + S.f * 1.6), 0, '#dc2626', S.mv ? 'fk' : 'fs');
      Q42.T(ctx, S.mv ? 'تنزلق: احتكاك حركي' : (S.P > .3 ? 'ساكنة: احتكاك سكوني' : 'ساكنة'), (g.x0 + g.x1) / 2, 104, { s: 12, w: 900, c: '#fff', bg: S.mv ? '#dc2626' : '#0f766e' });
      if (S.p.zoom) { const zx = g.x0 + 70, zy = 180, R = 46; K.raw(ctx, () => { ctx.save(); ctx.beginPath(); ctx.arc(zx, zy, R, 0, TAU); ctx.fillStyle = '#fff'; ctx.fill(); ctx.clip(); const sh = (S.x * 3) % 20; ctx.fillStyle = '#d97706'; ctx.beginPath(); ctx.moveTo(zx - R, zy - R); for (let x = -R; x <= R; x += 5) ctx.lineTo(zx + x, zy - 2 + Math.abs(Math.sin((x + sh) * .5)) * 8 * (u.s + .2)); ctx.lineTo(zx + R, zy - R); ctx.fill(); ctx.fillStyle = '#78716c'; ctx.beginPath(); ctx.moveTo(zx - R, zy + R); for (let x = -R; x <= R; x += 5) ctx.lineTo(zx + x, zy + 6 - Math.abs(Math.sin(x * .45 + 1)) * 8 * (u.s + .2)); ctx.lineTo(zx + R, zy + R); ctx.fill(); ctx.restore(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(zx, zy, R, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(zx + R * .7, zy + R * .7); ctx.lineTo(zx + R * 1.1, zy + R * 1.1); ctx.stroke(); }); Q42.T(ctx, 'نقاط الاتصال الشكل 33', zx, zy - R - 10, { s: 10, w: 800, c: '#334155' }); }
      const A = Q52.axes(ctx, { x: g.x0 + 34, y: 380, w: w - 24 - g.x0 - 60, h: 170, x1: 8, y1: Math.max(8, Math.ceil(u.s * N * 1.3 / 8) * 8), xs: 1, ys: Math.max(8, Math.ceil(u.s * N * 1.3 / 8) * 8) / 8, lx: 2, ly: Math.max(8, Math.ceil(u.s * N * 1.3 / 8) * 8) / 4, xl: 't (s)', yl: 'قوة الاحتكاك f (N)' });
      const t0 = S.hist.length ? Math.max(0, S.hist[S.hist.length - 1][0] - 8) : 0; Q52.plot(ctx, S.hist.filter(q => q[0] >= t0).map(q => [A.X(q[0] - t0), A.Y(q[1])]), '#dc2626', 2.4);
      Q51.dash(ctx, [[A.X(0), A.Y(u.s * N)], [A.X(8), A.Y(u.s * N)]], '#0f766e'); Q42.T(ctx, 'μs N', A.X(8) - 20, A.Y(u.s * N) - 10, { s: 10, w: 900, c: '#0f766e' }); Q51.dash(ctx, [[A.X(0), A.Y(u.k * N)], [A.X(8), A.Y(u.k * N)]], '#7c3aed'); Q42.T(ctx, 'μk N', A.X(8) - 20, A.Y(u.k * N) + 10, { s: 10, w: 900, c: '#7c3aed' });
      Q53.card(ctx, S, [{ t: 'N = m g = ' + Q53.g(N) + ' N', mono: 1, c: '#16a34a', w: 900 }, { t: 'fs ≤ μs N = ' + Q53.g(u.s) + ' × ' + Q53.g(N) + ' = ' + Q53.g(u.s * N, 1) + ' N', mono: 1, c: '#0f766e', w: 900 }, { t: 'fk = μk N = ' + Q53.g(u.k) + ' × ' + Q53.g(N) + ' = ' + Q53.g(u.k * N, 1) + ' N', mono: 1, c: '#7c3aed', w: 900 }, { t: 'القبان يقرأ ' + Q53.f(S.P, 1) + ' N', c: '#334155', w: 800 }, { t: 'الاحتكاك لا يعتمد على مساحة السطحين', c: '#b45309', w: 800 }], { title: 'الاحتكاك' });
      const C = D.chips(S, g); Q42.drawChips(ctx, C.s); Q42.drawChips(ctx, C.a); Q42.banner(ctx, w, 'اسحب اليد ✋ ببطء وراقب القبان', '#dc2626');
    },
    chips(S, g) { return { s: Q42.chips(S, 'su', SU.map(q => [q[0], q[1]]), g.h - 84, S.su, (S2, k) => { S2.su = k; D.reset(S2); }, { bw: 130, col: '#dc2626' }), a: Q42.chips(S, 'act', [['ramp', '↗ اسحب تدريجياً'], ['rel', '✋ اترك القبان'], ['re', '↺ أعد']], g.h - 128, '', (S2, k) => { if (k === 'ramp') { D.reset(S2); S2.ramp = 1; } else if (k === 'rel') { S2.ramp = 0; S2.Pt = 0; } else D.reset(S2); }, { bw: 160 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), bw = S.p.side ? 60 : 110, bx = g.x0 + 70 + S.x, xa = bx + bw / 2 + 120 + clamp(S.P / 60, 0, 1) * 60;
      return [{ id: 'hand', x: xa + 14, y: g.fy - 20, r: 24, axis: 'x', keep: true, tip: 'اسحب ببطء', idle: 'اسحب ✋', drag: (S2, d) => { S2.ramp = 0; S2.Pt = clamp((d.x - 14 - bx - bw / 2 - 120) / 60 * 60, 0, 60); }, up: S2 => { } }].concat(C.a, C.s); },
    readings(S) { const u = D.mu(S), N = S.p.m * 10; return [rd('قراءة القبان F', Q53.f(S.P, 1) + ' N'), rd('قوة الاحتكاك f', Q53.f(S.f, 1) + ' N'), rd('أقصى احتكاك سكوني', Q53.g(u.s * N, 1) + ' N'), rd('الاحتكاك الحركي', Q53.g(u.k * N, 1) + ' N'), rd('الحالة', S.mv ? 'تنزلق' : 'ساكنة')]; },
    record(S) { const u = D.mu(S), N = S.p.m * 10; return { s: u.n, m: S.p.m, fs: Q53.g(u.s * N, 1), fk: Q53.g(u.k * N, 1) }; },
    cols: [['s', 'السطح'], ['m', 'm (kg)'], ['fs', 'μs N (N)'], ['fk', 'μk N (N)']],
    explain(S) { return Q26.ex('قراءة القبان تزداد والقطعة ساكنة، ثم تتحرك فجأة وتنخفض القراءة قليلاً وتبقى ثابتة أثناء الانزلاق.', 'نقاط الاتصال المجهرية بين السطحين تقاوم الحركة. قبل الحركة يساوي الاحتكاك السكوني القوة المؤثرة حتى نهايته العظمى μs N ، وبعد الحركة يصبح fk = μk N وهو أصغر. وكلاهما يتناسب مع القوة العمودية ولا يعتمد على المساحة.', 'نرش الرمل على الطرق المتجمدة لزيادة الاحتكاك، ونضع الزيت في المحركات لتقليله.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F2 — مثال 2: صندوق على لوح خشن يرفع طرفه (ص 67–68) =============== */
(() => {
  const LB = 330;
  const EX = { title: 'مثال 2 ص 67', q: 'صندوق كتلته 400 kg على لوح خشن رفع أحد طرفيه تدريجياً فأصبح على وشك الحركة عند 30°. احسب قوة الاحتكاك السكوني، ثم التعجيل عند الانزلاق إذا كان μk = 0.1',
    lines: ['على وشك الحركة: fs = m g sinθ', 'fs = 400 × 10 × 0.5 = 2000 N', 'عند الانزلاق: m g sinθ − μk m g cosθ = m a', '2000 − 0.1 × 400 × 10 × 0.85 = 400 a', '2000 − 340 = 400 a', 'a = 4.15 m/s²'] };
  const D = { id: 'g11_n_incline', page: 67, fig: 'مثال 2',
    desc: 'مثال 2: صندوق كتلته 400 kg موضوع على لوح خشن، يرفع أحد طرفي اللوح تدريجياً فيبقى الصندوق ساكناً حتى تبلغ الزاوية 30° فيصبح على وشك الحركة: fs = m g sin30 = 2000 N. وعند انزلاقه بمعامل احتكاك حركي 0.1 يكون تعجيله نحو 4.15 m/s².',
    tags: 'مثال 2 سطح مائل لوح خشن يرفع طرفه زاوية الانزلاق 30 درجة صندوق 400 kg الاحتكاك السكوني 2000 N الاحتكاك الحركي μk 0.1 التعجيل 4.15',
    tools: ['لوح خشب خشن', 'صندوق', 'منقلة'],
    steps: ['اسحب طرف اللوح ✋ إلى الأعلى ببطء وراقب الصندوق والزاوية.', 'عند 30° يصبح الصندوق على وشك الحركة ثم ينزلق.', 'اضغط «الحل خطوة خطوة» لحل المثال.', 'غيّر معاملي الاحتكاك من اللوحة وابحث عن زاوية الانزلاق الجديدة.'],
    concl: ['ما دام الصندوق ساكناً فإن الاحتكاك السكوني يساوي مركبة الوزن الموازية للسطح m g sinθ.', 'عند 30° يكون على وشك الحركة: fs = 2000 N و μs = tan30 ≈ 0.58.', 'عند الانزلاق: m a = m g sinθ − μk m g cosθ ⟸ a ≈ 4.15 m/s².', 'التعجيل لا يعتمد على كتلة الصندوق.'],
    laws: ['g11_l3_static', 'g11_l3_kinetic', 'g11_l3_normal'],
    controls: [R('ms', 'معامل الاحتكاك السكوني μs', .2, 1, .58, .01, ''), R('mk', 'معامل الاحتكاك الحركي μk', 0, .5, .1, .01, ''), TG('cmp', 'مركبتا الوزن', true, null, 'axes')],
    setup(S) { S.th = 10; S.tht = 10; S.ex = 0; S.k = 0; D.reset(S); },
    reset(S) { S.s = 0; S.v = 0; S.mv = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 344; return { w, h, L, x0, x1, gy: h - 250 }; },
    update(S, dt) { S.th = Q53.ez(S.th, S.tht, dt, 8); const t = S.th * Math.PI / 180; if (!S.mv && Math.tan(t) > S.p.ms + 1e-3) S.mv = 1; if (S.mv) { const a = 10 * Math.sin(t) - S.p.mk * 10 * Math.cos(t); S.v = Math.max(0, S.v + a * dt); S.s += S.v * dt * 30; if (S.v === 0 && a <= 0) S.mv = 0; if (S.s > LB * .55) { S.s = LB * .55; S.v = 0; } } },
    draw(ctx, w, h, S) {
      const g = D.geo(S), t = S.th * Math.PI / 180, xa = g.x0 + 10, gy = g.gy, xb = xa + LB * Math.cos(t), yb = gy - LB * Math.sin(t); Q53.bg(ctx, w, h); Q53.panel(ctx, g.x0 - 6, 70, g.x1 - g.x0 + 12, gy + 50 - 70, 'نرفع طرف اللوح تدريجياً — مثال 2'); Q53.floor(ctx, g.x0, g.x1, gy, 'table', 16);
      K.raw(ctx, () => { ctx.save(); ctx.translate(xa, gy); ctx.rotate(-t); const gg = ctx.createLinearGradient(0, -14, 0, 0); gg.addColorStop(0, '#d6a46b'); gg.addColorStop(1, '#78350f'); ctx.fillStyle = gg; ctx.fillRect(0, -14, LB, 14); ctx.fillStyle = 'rgba(41,37,36,.4)'; for (let x = 4; x < LB; x += 7) ctx.fillRect(x, -14 + (x * 7 % 4), 2, 2); ctx.restore(); ctx.fillStyle = '#475569'; ctx.fillRect(xb - 4, yb, 8, gy - yb); });
      Q51.arc(ctx, xa, gy, 50, 0, S.th, '#7c3aed', Math.round(S.th) + '°');
      const sp = LB * .75 - S.s, px = xa + sp * Math.cos(t) - Math.sin(t) * 14, py = gy - sp * Math.sin(t) - 14 * Math.cos(t); Q53.block(ctx, px + Math.sin(t) * 0, py, 64, 50, '#f97316', '400 kg', -t, { ls: 11 });
      const cx = px - Math.sin(t) * 25, cy = py - Math.cos(t) * 25, W = 4000, k = .025; Q53.F(ctx, cx, cy, 0, W * k, '#dc2626', 'W');
      if (S.p.cmp) { Q51.vec(ctx, cx, cy, cx - Math.cos(t) * W * Math.sin(t) * k, cy + Math.sin(t) * W * Math.sin(t) * k, '#f59e0b', 'mg sinθ', { w: 2.5, dash: [6, 4] }); Q51.vec(ctx, cx, cy, cx + Math.sin(t) * W * Math.cos(t) * k, cy + Math.cos(t) * W * Math.cos(t) * k, '#f59e0b', 'mg cosθ', { w: 2.5, dash: [6, 4], side: -1 }); }
      const f = S.mv ? S.p.mk * W * Math.cos(t) : W * Math.sin(t); Q53.F(ctx, px + Math.cos(t) * 32, py - Math.sin(t) * 32, Math.cos(t) * f * k, -Math.sin(t) * f * k, '#0f766e', S.mv ? 'fk' : 'fs');
      Q41.knob(ctx, xb, yb - 8, '#dc2626', 9);
      const a = 10 * Math.sin(t) - S.p.mk * 10 * Math.cos(t);
      Q42.T(ctx, S.mv ? 'ينزلق: a = ' + Q53.g(a, 2) + ' m/s²' : (Math.abs(Math.tan(t) - S.p.ms) < .03 ? 'على وشك الحركة' : 'ساكن'), (g.x0 + g.x1) / 2, 104, { s: 12, w: 900, c: '#fff', bg: S.mv ? '#dc2626' : '#0f766e' });
      if (S.ex) Q53.steps(ctx, S, Object.assign({}, EX, { k: S.k }));
      else Q53.card(ctx, S, [{ t: 'θ = ' + Math.round(S.th) + '°', mono: 1, c: '#7c3aed', w: 900 }, { t: 'mg sinθ = ' + Q53.f(W * Math.sin(t), 0) + ' N', mono: 1, c: '#b45309', w: 900 }, { t: 'أقصى احتكاك سكوني:', c: '#0f766e', w: 800 }, { t: 'μs mg cosθ = ' + Q53.f(S.p.ms * W * Math.cos(t), 0) + ' N', mono: 1, c: '#0f766e', w: 900 }, { t: 'زاوية الانزلاق:', c: '#334155', w: 800 }, { t: 'tanθ = μs', mono: 1, c: '#334155', w: 900 }, { t: 'θ = ' + Q53.f(Math.atan(S.p.ms) * 180 / Math.PI, 1) + '°', mono: 1, c: '#334155', w: 900 }, { t: 'قوة الاحتكاك الآن = ' + Q53.f(f, 0) + ' N', c: '#dc2626', w: 800 }], { title: 'صندوق على سطح مائل' });
      const C = D.chips(S, g); Q53.drawSteps(ctx, C.e); Q42.drawChips(ctx, C.a); Q42.banner(ctx, w, 'اسحب طرف اللوح ✋ إلى الأعلى ببطء', '#dc2626');
    },
    chips(S, g) { return { e: Q53.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => { setParam(S2, 'ms', .58); setParam(S2, 'mk', .1); S2.tht = 30; D.reset(S2); }, EX.lines.length), a: Q42.chips(S, 'act', [['t30', 'θ = 30°'], ['t10', 'θ = 10°'], ['re', '↺ أعد الصندوق']], g.h - 128, '', (S2, k) => { if (k === 't30') S2.tht = 31; else if (k === 't10') S2.tht = 10; D.reset(S2); }, { bw: 150 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), t = S.th * Math.PI / 180;
      return [{ id: 'end', x: g.x0 + 10 + LB * Math.cos(t), y: g.gy - LB * Math.sin(t) - 8, r: 24, axis: 'y', keep: true, tip: 'اسحب لرفع اللوح', idle: 'اسحب ✋', drag: (S2, d) => { S2.tht = clamp(Math.asin(clamp((g.gy - d.y) / LB, 0, .74)) * 180 / Math.PI, 0, 48); } }].concat(C.a, C.e); },
    readings(S) { const t = S.th * Math.PI / 180; return [rd('الزاوية θ', Q53.f(S.th, 1) + '°'), rd('mg sinθ', Q53.f(4000 * Math.sin(t), 0) + ' N'), rd('الحالة', S.mv ? 'ينزلق' : 'ساكن'), rd('التعجيل', S.mv ? Q53.g(10 * Math.sin(t) - S.p.mk * 10 * Math.cos(t), 2) + ' m/s²' : '0')]; },
    explain(S) { return Q26.ex('يبقى الصندوق ساكناً مع زيادة الزاوية، ثم يبدأ بالانزلاق عند زاوية معينة (30° في المثال).', 'مركبة الوزن الموازية للسطح mg sinθ تزداد مع الزاوية، والاحتكاك السكوني يساويها حتى يبلغ نهايته μs mg cosθ. عندها tanθ = μs. وبعد الانزلاق a = g sinθ − μk g cosθ.', 'بقياس زاوية الانزلاق نستطيع حساب معامل الاحتكاك السكوني بين سطحين: μs = tanθ.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== F3 — مثال 3: سحب صندوق بحبل مائل + م5 الدفع أم السحب (ص 68–69 و 73) =============== */
(() => {
  const M = 150, MS = 240 / 1320, MK = .1;
  const EX = { title: 'مثال 3 ص 68', q: 'صندوق 150 kg على سطح أفقي يسحب بحبل بقوة 300 N بزاوية 37° فوق الأفق فيصبح على وشك الحركة. احسب μs ، ثم التعجيل عند السحب بقوة 600 N و μk = 0.1',
    lines: ['fs = F cos37 = 300 × 0.8 = 240 N', 'N = m g − F sin37 = 1500 − 300 × 0.6', 'N = 1500 − 180 = 1320 N', 'μs = fs / N = 240 / 1320 = 0.18', 'عند F = 600 N: Fx = 480 N و Fy = 360 N', 'N = 1500 − 360 = 1140 N', 'fk = μk N = 0.1 × 1140 = 114 N', '480 − 114 = 150 a ⟸ 366 = 150 a', 'a = 2.44 m/s²'] };
  const D = { id: 'g11_n_angled', page: 68, fig: 'مثال 3 + م5',
    desc: 'مثال 3: صندوق كتلته 150 kg على سطح أفقي يسحب بحبل يميل 37° فوق الأفق. عند F = 300 N يكون على وشك الحركة: fs = 240 N و N = 1320 N و μs = 0.18. وعند F = 600 N يكون N = 1140 N و fk = 114 N و a = 2.44 m/s². وفي المسألة 5: سحب الزلاجة بزاوية فوق الأفق أسهل من دفعها بالزاوية نفسها تحت الأفق لأن السحب يقلل القوة العمودية فيقل الاحتكاك.',
    tags: 'مثال 3 قوة مائلة 37 درجة صندوق 150 kg معامل الاحتكاك السكوني 0.18 القوة العمودية 1320 1140 التعجيل 2.44 الدفع والسحب الزلاجة مسألة 5',
    tools: ['صندوق', 'حبل', 'قبان', 'منقلة'],
    steps: ['اسحب يدك ✋ لتغيير مقدار القوة وزاويتها، أو اضغط «F = 300 N» و «F = 600 N».', 'راقب القوة العمودية والاحتكاك والتعجيل في البطاقة.', 'اضغط «الحل خطوة خطوة» لحل المثال 3.', 'اختر «م5: دفع مائل» وقارن: أيهما أسهل، الدفع أم السحب؟'],
    concl: ['السحب المائل للأعلى يقلل القوة العمودية: N = m g − F sinθ.', 'المركبة الأفقية F cosθ هي التي تحرك الصندوق ضد الاحتكاك.', 'للمثال: μs = 0.18 ، وعند 600 N يكون a = 2.44 m/s².', 'الدفع المائل للأسفل يزيد N = m g + F sinθ فيزيد الاحتكاك، لذلك السحب أسهل (م5).'],
    laws: ['g11_l3_normal', 'g11_l3_static', 'g11_l3_kinetic'],
    controls: [R('F', 'القوة F', 0, 800, 300, 10, 'N'), R('th', 'الزاوية θ', 0, 60, 37, 1, '°'), TG('cmp', 'مركبتا القوة', true, null, 'axes')],
    setup(S) { S.md = 'pull'; S.Fd = 300; S.thd = 37; S.ex = 0; S.k = 0; D.reset(S); },
    reset(S) { S.x = 0; S.v = 0; S.mv = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 344; return { w, h, L, x0, x1, gy: h - 280 }; },
    calc(S) { const t = S.thd * Math.PI / 180, F = S.Fd, Fx = F * Math.cos(t), Fy = F * Math.sin(t), N = Math.max(0, M * 10 + (S.md === 'pull' ? -Fy : Fy)); return { t, F, Fx, Fy, N, fsm: MS * N, fk: MK * N }; },
    update(S, dt) { S.Fd = Q53.ez(S.Fd, S.p.F, dt, 8); S.thd = Q53.ez(S.thd, S.p.th, dt, 8); const c = D.calc(S); if (!S.mv && c.Fx > c.fsm + 1) S.mv = 1; if (S.mv) { S.v += (c.Fx - c.fk) / M * dt; if (S.v <= 0) { S.v = 0; S.mv = 0; } S.x += S.v * dt * 30; if (S.x > 120) S.x = 0; } },
    hp(S, g, c) { const bx = g.x0 + 90 + S.x, top = g.gy - 70, Lf = 50 + c.F * .16; if (S.md === 'pull') { const ax = bx + 45, ay = top + 20; return [ax, ay, ax + Lf * Math.cos(c.t), ay - Lf * Math.sin(c.t), bx]; } const ax = bx - 45, ay = top + 4; return [ax, ay, ax - Lf * Math.cos(c.t), ay - Lf * Math.sin(c.t), bx]; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), c = D.calc(S), gy = g.gy, H = D.hp(S, g, c), bx = H[4], k = .06; Q53.bg(ctx, w, h); Q53.panel(ctx, g.x0 - 6, 70, g.x1 - g.x0 + 12, gy + 46 - 70, S.md === 'pull' ? 'سحب بحبل فوق الأفق — مثال 3' : 'دفع تحت الأفق — المسألة 5');
      Q53.floor(ctx, g.x0, g.x1, gy, 'rough', 18); Q53.block(ctx, bx, gy, 90, 70, '#d97706', null, 0, { brick: 1 }); Q42.T(ctx, '150 kg', bx + 18, gy - 58, { s: 11, w: 900, c: '#fff' });
      if (S.md === 'pull') { Q53.rope(ctx, [[H[0], H[1]], [H[2], H[3]]]); Q53.hand(ctx, H[2], H[3], -1, .75); Q51.dash(ctx, [[H[0], H[1]], [H[0] + 90, H[1]]]); Q51.arc(ctx, H[0], H[1], 44, 0, S.thd, '#7c3aed', 'θ'); Q53.F(ctx, H[0], H[1] - 30, c.F * k * Math.cos(c.t) * 1.4, -c.F * k * Math.sin(c.t) * 1.4, '#7c3aed', 'F');
        if (S.p.cmp) { Q51.vec(ctx, H[0], H[1] + 26, H[0] + c.Fx * k, H[1] + 26, '#f59e0b', 'Fx', { w: 2.5, dash: [6, 4] }); Q51.vec(ctx, bx + 20, gy - 70, bx + 20, gy - 70 - c.Fy * k, '#f59e0b', 'Fy', { w: 2.5, dash: [6, 4], side: -1 }); } }
      else { Q53.F(ctx, H[2], H[3], H[0] - H[2], H[1] - H[3], '#7c3aed', 'F', { side: -1 }); Q53.hand(ctx, H[2], H[3], 1, .75, { rot: c.t }); Q51.dash(ctx, [[H[0], H[1]], [H[0] - 90, H[1]]]); Q51.arc(ctx, H[0], H[1], 44, 180 - S.thd, 180, '#7c3aed', 'θ');
        if (S.p.cmp) { Q51.vec(ctx, bx - 20, gy - 70 - c.Fy * k, bx - 20, gy - 70, '#f59e0b', 'Fy', { w: 2.5, dash: [6, 4] }); } }
      Q53.F(ctx, bx, gy - 35, 0, 1500 * k * .9, '#dc2626', 'W', { side: -1 }); Q53.F(ctx, bx - 30, gy, 0, -c.N * k * .9, '#16a34a', 'N'); const f = S.mv ? c.fk : Math.min(c.Fx, c.fsm); if (f > 1) Q53.F(ctx, bx - 45, gy - 6, -f * k * 1.4, 0, '#0f766e', S.mv ? 'fk' : 'fs');
      const a = S.mv ? (c.Fx - c.fk) / M : 0, near = !S.mv && Math.abs(c.Fx - c.fsm) < 4;
      Q42.T(ctx, S.mv ? 'يتحرك: a = ' + Q53.g(a, 2) + ' m/s²' : near ? 'على وشك الحركة' : 'ساكن', (g.x0 + g.x1) / 2, 104, { s: 12, w: 900, c: '#fff', bg: S.mv ? '#dc2626' : near ? '#7c3aed' : '#0f766e' });
      if (S.ex) Q53.steps(ctx, S, Object.assign({}, EX, { k: S.k }));
      else Q53.card(ctx, S, [{ t: 'Fx = F cosθ = ' + Q53.f(c.Fx, 0) + ' N', mono: 1, c: '#b45309', w: 900 }, { t: 'Fy = F sinθ = ' + Q53.f(c.Fy, 0) + ' N', mono: 1, c: '#b45309', w: 900 }, { t: (S.md === 'pull' ? 'N = m g − Fy = ' : 'N = m g + Fy = ') + Q53.f(c.N, 0) + ' N', mono: 1, c: '#16a34a', w: 900 }, { t: 'أقصى احتكاك سكوني = ' + Q53.f(c.fsm, 0) + ' N', c: '#0f766e', w: 800 }, { t: 'الاحتكاك الحركي = ' + Q53.f(c.fk, 0) + ' N', c: '#7c3aed', w: 800 }, { t: S.md === 'pull' ? 'السحب يقلل N فيقل الاحتكاك' : 'الدفع يزيد N فيزيد الاحتكاك', c: '#dc2626', w: 900 }], { title: S.md === 'pull' ? 'مثال 3' : 'م5: الدفع أم السحب؟' });
      const C = D.chips(S, g); Q53.drawSteps(ctx, C.e); Q42.drawChips(ctx, C.p); Q42.drawChips(ctx, C.m); Q42.banner(ctx, w, 'اسحب يدك ✋ لتغيير القوة وزاويتها', '#dc2626');
    },
    chips(S, g) { return { e: Q53.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => { S2.md = 'pull'; setParam(S2, 'F', 300); setParam(S2, 'th', 37); D.reset(S2); }, EX.lines.length),
      p: Q42.chips(S, 'pf', [['f300', 'F = 300 N'], ['f600', 'F = 600 N']], g.h - 84, '', (S2, k) => { setParam(S2, 'F', k === 'f300' ? 300 : 600); setParam(S2, 'th', 37); D.reset(S2); }, { bw: 130, x0: g.L + 340 }),
      m: Q42.chips(S, 'md', [['pull', 'مثال 3: سحب بحبل'], ['push', 'م5: دفع مائل'], ['re', '↺ أعد الصندوق']], g.h - 128, S.md, (S2, k) => { if (k !== 're') { S2.md = k; if (k === 'push') setParam(S2, 'th', 30); } D.reset(S2); }, { bw: 170, col: '#dc2626' }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g), c = D.calc(S), H = D.hp(S, g, c);
      return [{ id: 'hand', x: H[2], y: H[3], r: 24, axis: 'xy', keep: true, tip: 'اسحب لتغيير القوة والزاوية', idle: 'اسحب ✋', drag: (S2, d) => { const dx = S2.md === 'pull' ? d.x - H[0] : H[0] - d.x, dy = H[1] - d.y; setParam(S2, 'th', clamp(Math.round(Math.atan2(dy, Math.max(1, dx)) * 180 / Math.PI), 0, 60)); setParam(S2, 'F', clamp(Math.round((Math.hypot(dx, dy) - 50) / .16 / 10) * 10, 0, 800)); } }].concat(C.m, C.p, C.e); },
    readings(S) { const c = D.calc(S); return [rd('القوة F', Q53.f(c.F, 0) + ' N'), rd('الزاوية θ', Q53.f(S.thd, 0) + '°'), rd('القوة العمودية N', Q53.f(c.N, 0) + ' N'), rd('التعجيل', S.mv ? Q53.g((c.Fx - c.fk) / M, 2) + ' m/s²' : '0')]; },
    record(S) { const c = D.calc(S); return { md: S.md === 'pull' ? 'سحب' : 'دفع', F: Q53.g(S.p.F), th: S.p.th, N: Q53.f(c.N, 0), a: S.mv ? Q53.g((c.Fx - c.fk) / M, 2) : '0' }; },
    cols: [['md', 'الطريقة'], ['F', 'F (N)'], ['th', 'θ (°)'], ['N', 'N (N)'], ['a', 'a (m/s²)']],
    explain(S) { return Q26.ex('عند السحب بالحبل المائل تقل قراءة القوة العمودية، وعند الدفع المائل نحو الأسفل تزداد.', 'نحلل القوة المائلة إلى مركبتين: الأفقية F cosθ تحرك الصندوق، والشاقولية F sinθ تقلل القوة العمودية في السحب وتزيدها في الدفع. والاحتكاك يتناسب مع N، لذلك السحب أسهل.', 'نسحب حقيبة السفر بمقبضها المائل بدلاً من دفعها.'); }
  };
  M8.P[D.id] = D;
})();

/* =============== G — مسائل الفصل: م1–م4 + س1 فقرة 10 (ص 72–73) =============== */
(() => {
  const MD = [['p1', 'م1: جسمان متلامسان'], ['p2', 'م2: منضدة خشنة وبكرة'], ['p3', 'م3: المصعد'], ['p4', 'م4: 20 N على 2 kg']];
  const EX = { p1: { title: 'مسألة 1 ص 72', q: 'جسمان متلامسان على سطح أفقي أملس m1 = 4 kg و m2 = 2 kg ، تدفع m1 قوة أفقية 12 N. احسب التعجيل وقوة التلامس بين الجسمين.', lines: ['F = (m1 + m2) a', '12 = (4 + 2) a ⟸ a = 2 m/s²', 'على الجسم الثاني: P = m2 a', 'P = 2 × 2 = 4 N'] },
    p2: { title: 'مسألة 2 ص 72', q: 'جسم 4 kg على سطح أفقي خشن يتصل بحبل يمر على بكرة ويعلق بطرفه جسم 10 kg. تتحرك المجموعة من السكون بتعجيل 6 m/s². احسب μk.', lines: ['للمعلق: m2 g − T = m2 a', '100 − T = 10 × 6 ⟸ T = 40 N', 'للجسم على المنضدة: T − fk = m1 a', '40 − fk = 4 × 6 ⟸ fk = 16 N', 'N = m1 g = 40 N', 'μk = fk / N = 16 / 40 = 0.4'] },
    p3: { title: 'مسألة 3 ص 72', q: 'جسم 1 kg معلق بسقف مصعد بسلك. احسب الشد عندما يتحرك المصعد للأعلى بتعجيل 2 m/s² ، ثم للأسفل بتعجيل 2 m/s².', lines: ['للأعلى: T − m g = m a', 'T = 1 × (10 + 2) = 12 N', 'للأسفل: m g − T = m a', 'T = 1 × (10 − 2) = 8 N', 'بسرعة ثابتة a = 0 ⟸ T = m g = 10 N'] },
    p4: { title: 'مسألة 4 ص 73', q: 'قوة أفقية ثابتة 20 N تؤثر في جسم ساكن كتلته 2 kg على سطح أفقي أملس. احسب انطلاقه بعد 1 s والإزاحة خلال 3 s.', lines: ['a = F / m = 20 / 2 = 10 m/s²', 'v = v0 + a t = 0 + 10 × 1 = 10 m/s', 'Δx = v0 t + ½ a t²', 'Δx = ½ × 10 × 3² = 45 m'] } };
  const D = { id: 'g11_n_probs', page: 72, fig: 'مسائل الفصل',
    desc: 'مسائل الفصل الثالث محلولة ومحاكاة: م1 جسمان متلامسان تدفعهما قوة 12 N (a = 2 m/s² وقوة التلامس 4 N)، م2 جسم على منضدة خشنة وجسم معلق (μk = 0.4)، م3 جسم معلق في مصعد (12 N للأعلى و 8 N للأسفل و 10 N بسرعة ثابتة — س1 فقرة 10)، م4 قوة 20 N على جسم 2 kg (v = 10 m/s بعد 1 s و Δx = 45 m خلال 3 s).',
    tags: 'مسائل الفصل الثالث جسمان متلامسان قوة التلامس منضدة خشنة بكرة معامل الاحتكاك 0.4 المصعد الشد 12 N 8 N السرعة الثابتة 20 N 2 kg 45 m',
    tools: ['أجسام', 'بكرة', 'مصعد', 'قبان', 'ساعة توقيت'],
    steps: ['اختر المسألة من الأزرار.', 'اضغط «▶ شغّل» لترى الحركة والقراءات.', 'اضغط «الحل خطوة خطوة» ثم «⬇ الخطوة التالية».', 'في المصعد غيّر تعجيله من اللوحة (موجب للأعلى، صفر للسرعة الثابتة) واقرأ القبان.'],
    concl: ['م1: a = 2 m/s² وقوة التلامس 4 N.', 'م2: T = 40 N و μk = 0.4.', 'م3: T = 12 N للأعلى و 8 N للأسفل و T = m g = 10 N بسرعة ثابتة.', 'م4: v = 10 m/s بعد ثانية و Δx = 45 m خلال 3 s.'],
    laws: ['g11_l3_second', 'g11_l3_kinetic'],
    controls: [R('F', 'القوة F', 4, 30, 12, 1, 'N'), R('ae', 'تعجيل المصعد (موجب للأعلى)', -4, 4, 2, 1, 'm/s²'), TG('vec', 'أسهم القوى', true, null, 'force')],
    setup(S) { S.md = 'p1'; S.ex = 0; S.k = 0; S.Td = 10; D.reset(S); },
    reset(S) { S.run = 0; S.tc = 0; S.done = 0; S.off = 0; },
    geo(S) { const w = S.W, h = S.H, L = Q42.L(S), x0 = L + 24, x1 = w - 344; return { w, h, L, x0, x1, gy: h - 250 }; },
    val(S) { const md = S.md; if (md === 'p1') { const a = S.p.F / 6; return { a, P: 2 * a }; } if (md === 'p2') return { a: (100 - .4 * 40) / 14, T: 40 }; if (md === 'p3') return { a: S.p.ae, T: 10 + S.p.ae }; return { a: S.p.F / 2 }; },
    update(S, dt) { const V = D.val(S); if (S.md === 'p3') { S.Td = Q53.ez(S.Td, S.run ? V.T : 10, dt, 8); } if (!S.run) return; S.tc += dt * (S.md === 'p4' ? 1 : .6); const lim = S.md === 'p4' ? 3 : S.md === 'p3' ? 4 : 1.6; if (S.md !== 'p3' && S.tc >= lim) { S.tc = lim; S.run = 0; S.done = 1; } if (S.md === 'p3') S.off += (S.p.ae * S.tc + (S.p.ae === 0 ? 2 : 0)) * dt * 30; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), md = S.md, V = D.val(S), gy = g.gy, x0 = g.x0, x1 = g.x1, vec = S.p.vec; Q53.bg(ctx, w, h); Q53.panel(ctx, x0 - 6, 70, x1 - x0 + 12, gy + 50 - 70, MD.find(q => q[0] === md)[1]);
      const sx = .5 * V.a * S.tc * S.tc;
      if (md === 'p1') { Q53.floor(ctx, x0, x1, gy, 'smooth', 14); const d = Math.min(sx * 60, 180), b1 = x0 + 110 + d; Q53.block(ctx, b1, gy, 70, 60, '#f97316', 'm1', 0); Q53.block(ctx, b1 + 35 + 26, gy, 52, 46, '#38bdf8', 'm2', 0); if (vec) { Q53.F(ctx, b1 - 35 - 80, gy - 30, 76, 0, '#2563eb', 'F'); Q53.F(ctx, b1 + 35, gy - 54, 16 + V.P * 6, 0, '#dc2626', 'P', { w: 3 }); Q53.F(ctx, b1 + 35, gy - 12, -(16 + V.P * 6), 0, '#dc2626', '−P', { w: 3 }); } }
      else if (md === 'p2') { const ty = 200, xe = x1 - 80; K.raw(ctx, () => { ctx.fillStyle = '#78350f'; ctx.fillRect(x0, ty, xe - x0, 14); ctx.fillStyle = '#a16207'; ctx.fillRect(xe - 30, ty + 14, 30, gy - ty - 14); }); Q53.floor(ctx, x0, x1, gy, 'wood', 12); Q53.floor(ctx, x0, xe, ty, 'rough', 8);
        const d = Math.min(sx * 40, 140), b1 = x0 + 70 + d, px = xe + 14, hy = 270 + Math.min(d, gy - 290); Q53.rope(ctx, [[b1 + 26, ty - 18], [px, ty - 30]]); Q53.rope(ctx, [[px + 16, ty - 14], [px + 16, hy - 44]]); Q53.pulley(ctx, px, ty - 14, 16, d / 16, { ax: -16, ay: 6 }); Q53.block(ctx, b1, ty, 52, 38, '#f97316', '4 kg', 0, { ls: 11 }); Q53.block(ctx, px + 16, hy, 46, 44, '#ef4444', '10 kg', 0, { ls: 11 });
        if (vec) { Q53.F(ctx, b1 + 26, ty - 40, 40, 0, '#b45309', 'T'); Q53.F(ctx, b1 - 26, ty - 6, -24, 0, '#0f766e', 'fk'); Q53.F(ctx, px + 46, hy - 22, 0, -40, '#b45309', 'T'); Q53.F(ctx, px + 46 + 0, hy - 4, 0, 60, '#dc2626', 'W2', { side: -1 }); } }
      else if (md === 'p3') { const cx = (x0 + x1) / 2; K.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(x0, 92, x1 - x0, gy - 42); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; for (let k = 0; k < 8; k++) { const y = 92 + Q52.md(k * 60 + S.off, gy - 42); ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + 40, y); ctx.moveTo(x1 - 40, y); ctx.lineTo(x1, y); ctx.stroke(); } const gc = ctx.createLinearGradient(cx - 100, 0, cx + 100, 0); gc.addColorStop(0, '#cbd5e1'); gc.addColorStop(.5, '#f8fafc'); gc.addColorStop(1, '#94a3b8'); ctx.fillStyle = gc; ctx.fillRect(cx - 100, 120, 200, gy - 150); ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 3; ctx.strokeRect(cx - 100, 120, 200, gy - 150); ctx.fillStyle = '#475569'; ctx.fillRect(cx - 3, 92, 6, 28); });
        const ext = clamp(S.Td / 16, 0, 1) * 70; Q42.spring(ctx, cx, 124, 170 + ext, { r: 8, n: 12, lead: 6 }); Q53.block(ctx, cx, 170 + ext + 50, 46, 46, '#f97316', '1 kg', 0, { ls: 11 }); Q42.T(ctx, 'T = ' + Q53.f(S.Td, 1) + ' N', cx + 60, 160, { s: 12, w: 900, c: '#0f172a', bg: '#fef3c7', mono: 1 });
        if (vec) { Q53.F(ctx, cx - 40, 170 + ext + 30, 0, -S.Td * 5, '#b45309', 'T'); Q53.F(ctx, cx + 40, 170 + ext + 26, 0, 50, '#dc2626', 'W'); if (S.run && S.p.ae) Q53.F(ctx, cx + 80, 300, 0, -Math.sign(S.p.ae) * 40, '#0f766e', 'a', { w: 3 }); }
        Q42.T(ctx, !S.run ? 'المصعد ساكن' : S.p.ae > 0 ? 'يتعجل للأعلى' : S.p.ae < 0 ? 'يتعجل للأسفل' : 'سرعة ثابتة', cx, gy - 10, { s: 12, w: 900, c: '#fff', bg: '#0f766e' }); }
      else { Q53.floor(ctx, x0, x1, gy, 'smooth', 14); const px = (x1 - x0 - 140) / 45, d = sx * px, bx = x0 + 50 + d; for (let k = 0; k <= 45; k += 5) { const xx = x0 + 50 + k * px; Q41.line(ctx, [[xx, gy + 14], [xx, gy + 22]], '#475569', 1.4); if (k % 15 === 0) Q42.T(ctx, k + ' m', xx, gy + 34, { s: 9.5, w: 800, c: '#475569' }); }
        [1, 2, 3].forEach(t => { if (S.tc >= t) { const xx = x0 + 50 + .5 * V.a * t * t * px; Q41.line(ctx, [[xx, gy - 60], [xx, gy]], '#be185d', 1.6, [4, 3]); Q42.T(ctx, t + ' s', xx, gy - 68, { s: 10, w: 900, c: '#be185d' }); } });
        Q53.block(ctx, bx, gy, 50, 44, '#f97316', '2 kg', 0, { ls: 11 }); if (vec) Q53.F(ctx, bx + 25, gy - 22, 60, 0, '#2563eb', 'F'); Q42.T(ctx, 'v = ' + Q53.f(V.a * S.tc, 1) + ' m/s', x0 + 80, 112, { s: 12, w: 900, c: '#0f172a', mono: 1, bg: 'rgba(255,255,255,.9)' }); Q42.T(ctx, 'Δx = ' + Q53.f(sx, 1) + ' m', x0 + 80, 136, { s: 12, w: 900, c: '#0f172a', mono: 1, bg: 'rgba(255,255,255,.9)' }); }
      if (md !== 'p4') Q42.T(ctx, 't = ' + Q53.f(S.tc, 2) + ' s', x1 - 50, 104, { s: 11, w: 900, c: md === 'p3' ? '#e2e8f0' : '#334155', mono: 1 });
      if (S.ex) Q53.steps(ctx, S, Object.assign({}, EX[md], { k: S.k }));
      else { const L2 = md === 'p1' ? [{ t: 'a = F / (m1 + m2) = ' + Q53.g(V.a, 2) + ' m/s²', mono: 1, c: '#dc2626', w: 900 }, { t: 'P = m2 a = ' + Q53.g(V.P, 2) + ' N', mono: 1, c: '#b45309', w: 900 }, { t: 'قوة التلامس P تؤثر في m2 وتؤثر −P في m1', c: '#334155' }] : md === 'p2' ? [{ t: 'a = 6 m/s²', mono: 1, c: '#dc2626', w: 900 }, { t: 'T = 40 N', mono: 1, c: '#b45309', w: 900 }, { t: 'fk = 16 N ⟸ μk = 0.4', mono: 1, c: '#0f766e', w: 900 }] : md === 'p3' ? [{ t: 'T = m (g + a)', mono: 1, c: '#dc2626', w: 900 }, { t: 'T = 1 × (10 + ' + Q53.g(S.p.ae) + ') = ' + Q53.g(10 + S.p.ae) + ' N', mono: 1, c: '#b45309', w: 900 }, { t: 'للأعلى 12 N وللأسفل 8 N', c: '#334155', w: 800 }, { t: 'س1 فقرة 10: بسرعة ثابتة T = m g', c: '#0f766e', w: 800 }] : [{ t: 'a = F / m = ' + Q53.g(V.a, 2) + ' m/s²', mono: 1, c: '#dc2626', w: 900 }, { t: 'v = a t', mono: 1, c: '#b45309', w: 900 }, { t: 'Δx = ½ a t²', mono: 1, c: '#b45309', w: 900 }, { t: 'عند F = 20 N: v بعد 1 s = 10 m/s و Δx خلال 3 s = 45 m', c: '#334155' }];
        Q53.card(ctx, S, L2, { title: 'المسائل' }); }
      const C = D.chips(S, g); Q53.drawSteps(ctx, C.e); Q42.drawChips(ctx, C.p); Q42.drawChips(ctx, C.m); Q42.banner(ctx, w, 'اختر المسألة واضغط «▶ شغّل»', '#dc2626');
    },
    chips(S, g) { const setM = (S2, k) => { S2.md = k; S2.ex = 0; S2.k = 0; if (k === 'p1') setParam(S2, 'F', 12); if (k === 'p4') setParam(S2, 'F', 20); if (k === 'p3') setParam(S2, 'ae', 2); D.reset(S2); };
      return { m: Q42.chips(S, 'md', MD, g.h - 128, S.md, setM, { bw: 178, col: '#dc2626' }), e: Q53.stepChips(S, 'ex', g.h - 84, g.L, 'الحل خطوة خطوة', S2 => setM(S2, S2.md), EX[S.md].lines.length),
        p: Q53.play(S, 'pl', g.h - 84, S.run, S2 => { if (S2.done) D.reset(S2); S2.run = S2.run ? 0 : 1; }, S2 => D.reset(S2), { x0: g.L + 340, bw: 130 }) }; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), C = D.chips(S, g); return C.p.concat(C.m, C.e); },
    readings(S) { const V = D.val(S), md = S.md; return md === 'p1' ? [rd('التعجيل', Q53.g(V.a, 2) + ' m/s²'), rd('قوة التلامس', Q53.g(V.P, 2) + ' N')] : md === 'p2' ? [rd('التعجيل', '6 m/s²'), rd('الشد', '40 N'), rd('μk', '0.4')] : md === 'p3' ? [rd('تعجيل المصعد', Q53.g(S.p.ae) + ' m/s²'), rd('الشد T', Q53.f(S.Td, 1) + ' N')] : [rd('التعجيل', Q53.g(V.a, 2) + ' m/s²'), rd('الانطلاق', Q53.f(V.a * S.tc, 1) + ' m/s'), rd('الإزاحة', Q53.f(.5 * V.a * S.tc * S.tc, 1) + ' m')]; },
    explain(S) { return Q26.ex('في كل مسألة نرسم القوى المؤثرة في كل جسم ثم نطبق ΣF = m a.', 'م1: القوة تعجل الجسمين معاً، وقوة التلامس هي التي تعجل الجسم الثاني وحده. م2: نطبق القانون الثاني على كل جسم. م3: الشد يزيد عن الوزن عند التعجيل للأعلى ويقل عند التعجيل للأسفل. م4: نستعمل معادلات الحركة بتعجيل ثابت.', 'نشعر بأننا أثقل عندما يبدأ المصعد بالصعود، وأخف عندما يبدأ بالنزول.'); }
  };
  M8.P[D.id] = D;
})();

/* ====================== wrappers ====================== */
/* tap-only items: no drag arrows; explanations bidi-safe */
Object.keys(M8.P).filter(k => /^g11_n_/.test(k)).forEach(k => { const D = M8.P[k], f = D.drags; if (f) D.drags = S => (f.call(D, S) || []).map(o => (o.click && !o.drag && !o.axis ? Object.assign(o, { axis: 'none' }) : o)); });
Object.keys(M8.P).filter(id => /^g11_n_/.test(id) && M8.P[id].explain && !M8.P[id]._bidi).forEach(id => { const D = M8.P[id], oe = D.explain; D._bidi = 1; D.explain = S => Q31.bidi(oe.call(D, S)); });

/* ====================== merged experiments (book order) ====================== */
M8.merge({ id: 'g11_c3_force', ch: 53, reg: X11, sec: '3-1 مفهوم القوة وأنواعها', page: 51, kind: 'نشاط',
  title: 'مفهوم القوة وأنواعها والقوى الأساسية في الطبيعة',
  desc: 'نؤثر بأيدينا بقوى دفع وسحب وشد وكبس وتدوير ولي ونقيسها بالقبان الحلزوني، ثم نتعرف القوى الأساسية في الطبيعة: الجاذبية والكهربائية والمغناطيسية والنووية.',
  tags: 'القوة أنواع القوة قوى التماس القوى الأساسية الجاذبية الكهربائية المغناطيسية النووية القوية الضعيفة',
  fact: ["القوة كمية متجهة: أثرها يعتمد على مقدارها واتجاهها معاً (ص 51).", "قوة جذب الكوكب للجسم هي وزن الجسم (ص 52).", "القوة النووية القوية تربط النيوكلونات في النواة، والضعيفة مسؤولة عن انحلال بيتا (ص 53)."],
  quiz: [{"q": "وحدة القوة النيوتن تساوي:", "o": ["1 kg·m/s²", "1 kg·m/s", "1 kg/m·s²", "1 g·cm/s²"], "a": 0, "why": "النيوتن هو القوة التي تكسب كتلة 1 kg تعجيلاً 1 m/s²."}, {"q": "المشط المدلوك بالصوف يجذب قصاصات الورق بفعل القوة:", "o": ["الكهربائية", "المغناطيسية", "النووية القوية", "قوة التماس"], "a": 0, "why": "الدلك يكسب المشط شحنة كهربائية فيجذب القصاصات (الشكل 7)."}],
  parts: [{ id: 'g11_n_force', n: 'مفهوم القوة وأنواعها والقبان الحلزوني' }, { id: 'g11_n_field', n: 'القوى الأساسية: الجاذبية والكهربائية والمغناطيسية والنووية' }] });
M8.merge({ id: 'g11_c3_first', ch: 53, reg: X11, sec: '3-2 القصور الذاتي والكتلة + 3-3 قانون نيوتن الأول', page: 53, kind: 'نشاط',
  title: 'القصور الذاتي وقانون نيوتن الأول',
  desc: 'نعيد تجربة غاليلو بالمستويين المائلين، وننفذ نشاط القنينة والحلقة والقلم، ونرى ماذا يحدث للراكب في السيارة عند الانطلاق المفاجئ والتوقف المفاجئ والمنعطف.',
  tags: 'القصور الذاتي الكتلة غاليلو قانون نيوتن الأول قانون القصور',
  fact: ["لاحظ غاليلو أن الكرة على مستوٍ أفقي أملس تستمر في الحركة بلا توقف (ص 53).", "حزام الأمان يحمي الراكب من الاندفاع إلى الأمام عند التوقف المفاجئ (ص 54).", "الباخرة الكبيرة تحتاج مسافة أطول بكثير من الزورق الصغير لتتوقف لأن قصورها أكبر (ص 56)."],
  quiz: [{"q": "القصور الذاتي للجسم يعتمد على:", "o": ["كتلته", "لونه", "سرعته فقط", "حجمه فقط"], "a": 0, "why": "كرة البيسبول تحتاج قوة أكبر من كرة المنضدة لإيقافها لأن كتلتها أكبر."}, {"q": "عند التوقف المفاجئ للسيارة يندفع الراكب:", "o": ["إلى الأمام", "إلى الخلف", "إلى الأعلى", "لا يندفع"], "a": 0, "why": "جسم الراكب يميل إلى الاستمرار في حركته (قانون القصور)."}],
  parts: [{ id: 'g11_n_galileo', n: 'مستويا غاليلو المائلان' }, { id: 'g11_n_inertia', n: 'نشاط القصور: القنينة والحلقة والقلم' }, { id: 'g11_n_car', n: 'قانون نيوتن الأول: الراكب في السيارة والكتلة' }] });
M8.merge({ id: 'g11_c3_second', ch: 53, reg: X11, sec: '3-3 قانون نيوتن الثاني + الوزن والكتلة', page: 56, kind: 'نشاط',
  title: 'قانون نيوتن الثاني والوزن والجذب العام',
  desc: 'ننفذ نشاطي القانون الثاني: نغير القوة بثبوت الكتلة ثم نغير الكتلة بثبوت القوة، ثم نقارن الوزن والكتلة على الأرض والقمر ونرى كيف يقل الوزن بالابتعاد عن مركز الأرض.',
  tags: 'قانون نيوتن الثاني F = m a الوزن الكتلة w = m g الجذب العام',
  fact: ["النيوتن هو القوة التي إذا أثرت في جسم كتلته 1 kg أكسبته تعجيلاً 1 m/s² (ص 57).", "ثابت الجذب العام G = 6.67 × 10⁻¹¹ N·m²/kg² (ص 59).", "شخص وزنه 600 N على سطح الأرض يصبح وزنه 150 N على بعد 12800 km من مركزها (ص 59)."],
  quiz: [{"q": "أثرت محصلة قوى خارجية معلومة المقدار والاتجاه في جسم كتلته معلومة فحركته من السكون. يمكن بتطبيق القانون الثاني لنيوتن إيجاد:", "o": ["تعجيل الجسم", "وزن الجسم", "انطلاق الجسم", "إزاحة الجسم"], "a": 0, "why": "ΣF = m a يعطي التعجيل مباشرة (س1 فقرة 1)."}, {"q": "القوة 10 N تكسب جسماً تعجيلاً 2 m/s² ، فالقوة 40 N تكسب الجسم نفسه تعجيلاً مقداره:", "o": ["8 m/s²", "4 m/s²", "12 m/s²", "16 m/s²"], "a": 0, "why": "التعجيل يتناسب طردياً مع القوة: أربعة أمثال القوة تعطي أربعة أمثال التعجيل (س1 فقرة 9)."}, {"q": "قطعة ذهب وزنها 1 N على الأرض وأخرى وزنها 1 N على القمر. أيهما كتلتها أكبر؟", "o": ["التي على القمر", "التي على الأرض", "متساويتان", "لا يمكن المقارنة"], "a": 0, "why": "m = w/g و g على القمر أصغر (فكر ص 59)."}],
  parts: [{ id: 'g11_n_second', n: 'نشاطا القانون الثاني: القوة والكتلة والتعجيل' }, { id: 'g11_n_weight', n: 'الوزن والكتلة وقانون الجذب العام' }] });
M8.merge({ id: 'g11_c3_third', ch: 53, reg: X11, sec: '3-3 قانون نيوتن الثالث', page: 60, kind: 'نشاط',
  title: 'قانون نيوتن الثالث: الفعل ورد الفعل',
  desc: 'نرى قوتي الفعل ورد الفعل في قبانين متصلين ومتزلجين يدفع أحدهما الآخر وفي المطرقة والمسمار والمشي والتجذيف والصاروخ والأرض والقمر.',
  tags: 'قانون نيوتن الثالث الفعل ورد الفعل',
  fact: ["الفعل ورد الفعل يؤثران في جسمين مختلفين لذلك لا يحدثان اتزاناً (ص 60).", "الصاروخ يدفع الغازات إلى الخلف فتدفعه الغازات إلى الأمام (ص 61).", "قوة جذب الأرض للقمر تساوي قوة جذب القمر للأرض (فكر ص 61)."],
  quiz: [{"q": "عندما يسحب حصان عربة فإن القوة التي تسبب حركة الحصان إلى الأمام هي:", "o": ["القوة التي تؤثر بها الأرض في الحصان", "القوة التي تسحب العربة", "القوة التي تؤثر بها العربة في الحصان", "القوة التي يؤثر بها الحصان في الأرض"], "a": 0, "why": "الحصان يدفع الأرض إلى الخلف فتدفعه الأرض إلى الأمام (س1 فقرة 2)."}, {"q": "قوتا الفعل ورد الفعل:", "o": ["تؤثران في جسمين مختلفين", "تؤثران في الجسم نفسه", "تحدثان اتزاناً", "مختلفتان في المقدار"], "a": 0, "why": "لكل فعل رد فعل مساوٍ له ومعاكس، وكل منهما في جسم."}],
  parts: [{ id: 'g11_n_third', n: 'الفعل ورد الفعل في أمثلة الكتاب' }] });
M8.merge({ id: 'g11_c3_apps', ch: 53, reg: X11, sec: '3-4 تطبيقات قوانين نيوتن + 3-5 مخطط الجسم الحر', page: 62, kind: 'مثال',
  title: 'القوة العمودية والشد ومخطط الجسم الحر',
  desc: 'نقيس القوة العمودية في ست حالات، ونرسم مخطط الجسم الحر لخمسة أنظمة، ونحل المثال 1: جسمان على بكرة.',
  tags: 'القوة العمودية قوة الشد البكرة مخطط الجسم الحر',
  fact: ["القوة العمودية قوة رد فعل مقدارها غير ثابت (ص 62).", "البكرة الملساء تغير اتجاه قوة الشد ولا تغير مقدارها (ص 63).", "في المثال 1: a = 2 m/s² و T = 24 N (ص 65)."],
  quiz: [{"q": "كتلتان m1 على سطح أفقي أملس و m2 معلقة شاقولياً بطرف سلك يمر على بكرة. الشد في السلك:", "o": ["T < m2 g", "T = 0", "T = m2 g", "T > m2 g"], "a": 0, "why": "m2 تنزل بتعجيل فمحصلة القوى عليها نحو الأسفل: m2 g − T = m2 a (س1 فقرة 5)."}, {"q": "كتلتان متساويتان m1 = m2 بطرفي حبل يمر على بكرة ملساء. تعجيل المجموعة:", "o": ["صفر", "يساوي g", "أكبر من g", "أقل من g لكنه ليس صفراً"], "a": 0, "why": "a = (m2 − m1) g/(m1 + m2) = 0 (س1 فقرة 6)."}, {"q": "جسم على سطح مائل بزاوية θ. القوة العمودية تساوي:", "o": ["W cosθ", "W sinθ", "W", "W tanθ"], "a": 0, "why": "N تساوي مركبة الوزن العمودية على السطح (الشكل 26)."}],
  parts: [{ id: 'g11_n_normal', n: 'القوة العمودية في ست حالات' }, { id: 'g11_n_fbd', n: 'الشد والبكرات ومخطط الجسم الحر' }, { id: 'g11_n_atwood', n: 'مثال 1: جسمان على بكرة' }] });
M8.merge({ id: 'g11_c3_friction', ch: 53, reg: X11, sec: '3-6 الاحتكاك', page: 66, kind: 'مثال',
  title: 'الاحتكاك السكوني والحركي والمثالان 2 و 3',
  desc: 'نسحب قطعة بالقبان لنرى الاحتكاك السكوني ثم الحركي، ونرفع طرف لوح خشن تحت صندوق (مثال 2)، ونسحب صندوقاً بحبل مائل ونقارن الدفع بالسحب (مثال 3 والمسألة 5).',
  tags: 'الاحتكاك السكوني الحركي معامل الاحتكاك سطح مائل قوة مائلة',
  fact: ["الاحتكاك ينشأ من نقاط الاتصال المجهرية بين السطحين (ص 66).", "الاحتكاك الحركي أصغر من أقصى احتكاك سكوني (ص 67).", "سحب الزلاجة بزاوية فوق الأفق أسهل من دفعها تحت الأفق (المسألة 5 ص 73)."],
  quiz: [{"q": "قوة الاحتكاك بين سطحين متماسين لا تعتمد على:", "o": ["مساحة السطحين المتماسين", "القوة الضاغطة عمودياً على السطحين", "الحركة النسبية بين السطحين", "وجود زيت بين السطحين أو عدمه"], "a": 0, "why": "معامل الاحتكاك يعتمد على طبيعة السطحين لا على مساحتهما (س1 فقرة 3)."}, {"q": "إذا أردت أن تمشي على أرض جليدية من غير انزلاق فالأفضل أن تكون حركتك:", "o": ["بخطوات قصيرة", "بخطوات طويلة", "على مسار دائري", "على مسار متعرج"], "a": 0, "why": "الخطوات القصيرة تجعل القوة الأفقية للقدم صغيرة فلا تتجاوز الاحتكاك القليل (س1 فقرة 4)."}, {"q": "القوة الأفقية 40 N تلزم لجعل صندوق 10 kg على وشك الحركة فوق أرضية أفقية. معامل الاحتكاك السكوني:", "o": ["0.4", "0.08", "0.25", "2.5"], "a": 0, "why": "μs = F/N = 40/100 = 0.4 (س1 فقرة 8)."}],
  parts: [{ id: 'g11_n_friction', n: 'الاحتكاك السكوني والحركي' }, { id: 'g11_n_incline', n: 'مثال 2: صندوق على لوح يرفع طرفه' }, { id: 'g11_n_angled', n: 'مثال 3: السحب بحبل مائل والدفع' }] });
M8.merge({ id: 'g11_c3_review', ch: 53, reg: X11, sec: 'أسئلة ومسائل الفصل الثالث', page: 70, kind: 'مثال',
  title: 'أسئلة الفصل الثالث ومسائله',
  desc: 'نحاكي مسائل الفصل ونحلها خطوة خطوة: جسمان متلامسان، منضدة خشنة وبكرة، جسم في مصعد، وقوة ثابتة على جسم ساكن، ثم نجيب عن أسئلة الاختيار.',
  tags: 'أسئلة الفصل الثالث مسائل قوانين الحركة',
  fact: ["جسم في مصعد يتعجل للأعلى يشد السلك بقوة أكبر من وزنه (م3 ص 72).", "قوة 20 N على جسم 2 kg تكسبه سرعة 10 m/s بعد ثانية واحدة (م4 ص 73)."],
  quiz: [{"q": "سيارة كتلتها m تنزلق على سطح مغطى بالجليد عديم الاحتكاك مائل بزاوية θ. تعجيلها:", "o": ["g sinθ", "sinθ / g", "2g sinθ", "½ g sinθ"], "a": 0, "why": "القوة المحصلة m g sinθ فالتعجيل g sinθ (س1 فقرة 7)."}, {"q": "جسم كتلته m معلق بحبل في سقف مصعد يتحرك نحو الأسفل بسرعة ثابتة. الشد في الحبل:", "o": ["يساوي mg", "أقل من mg", "أكبر من mg", "تحدد قيمته بمقدار السرعة"], "a": 0, "why": "السرعة ثابتة فالتعجيل صفر: T = mg (س1 فقرة 10)."}, {"q": "جسمان متلامسان 4 kg و 2 kg على سطح أملس تدفعهما قوة 12 N. قوة التلامس بينهما:", "o": ["4 N", "12 N", "8 N", "2 N"], "a": 0, "why": "a = 12/6 = 2 m/s² و P = 2 × 2 = 4 N (م1)."}],
  parts: [{ id: 'g11_n_probs', n: 'مسائل الفصل: م1 إلى م4' }] });
