'use strict';
/* ====================== الثاني المتوسط — الفصل الخامس: الحركة الموجية والصوت (ch 25, ص 56–69) ======================
   g8_wave_intro (2 parts) · g8_wave_props (2) · g8_wave_types (3) · g8_em_waves (2) · g8_sound_travel (4) · g8_echo (3) · g8_sound_props (6)
   Parts are registered in M8.P and merged with M8.merge (expg8_0kit.js). Uses the kits K (expg7_0kit.js), C2 (expg7_c2.js), C1 (expg7_c1.js)
   and the realistic person Q23.man (expg8_c3.js). Local helpers in Q25. Sounds (Web Audio) only start on a user click. */
LW({ id: 'g8_wave', cat: 25, name: 'الحركة الموجية', fx: 'الموجة = اضطراب دوري ينقل الطاقة دون أن تنتقل دقائق الوسط', sym: 'الحركة الموجية اضطراب ينتقل بشكل حركة اهتزازية إلى جزيئات الوسط دون أن تنتقل جزيئات الوسط. الموجة ناتجة عن مصدر طاقة لجسم مهتز، والموجة المنتشرة إحدى وسائل نقل الطاقة' });
LW({ id: 'g8_wconc', cat: 25, name: 'مفاهيم الحركة الموجية', fx: '<i>f</i> = ' + FR('عدد الذبذبات', 'الزمن') + ' (Hz) &nbsp; ، &nbsp; <i>T</i> = ' + FR('الزمن', 'عدد الذبذبات') + ' (s)', sym: 'الطول الموجي λ: أقصر بعد بين نقطتين متتاليتين مهتزتين بكيفية واحدة. التردد f: عدد الذبذبات التي يولدها الجسم المهتز خلال وحدة الزمن (هيرتز Hz). مدة الذبذبة T: الزمن الذي يستغرقه الجسم المهتز ليكمل ذبذبة واحدة (s). سعة الاهتزاز: أقصى إزاحة للجسم المهتز عن موضع استقراره', calc: { in: [['n', 'عدد الذبذبات', '', 20], ['t', 'الزمن', 's', 1]], out: 'التردد f', u: 'Hz', f: v => v.n / v.t } });
LW({ id: 'g8_vlf', cat: 25, name: 'سرعة الموجة', fx: '<i>v</i> = <i>λ</i> <i>f</i>', sym: 'سرعة الموجة v: الإزاحة التي تقطعها الموجة في الثانية الواحدة (m/s) = الطول الموجي λ (m) × التردد f (Hz)', calc: { in: [['l', 'الطول الموجي λ', 'm', 2], ['f', 'التردد f', 'Hz', 5]], out: 'سرعة الموجة v', u: 'm/s', f: v => v.l * v.f } });
LW({ id: 'g8_wtypes', cat: 25, name: 'الموجات الطولية والمستعرضة', fx: 'طولية: اهتزاز الدقائق ∥ اتجاه الانتشار &nbsp;|&nbsp; مستعرضة: اهتزاز الدقائق ⊥ اتجاه الانتشار', sym: 'الموجة الطولية تنتشر بشكل تضاغطات وتخلخلات (موجات الصوت، الموجات الزلزالية). الموجة المستعرضة تنتشر بشكل قمم وقعور (الأوتار المهتزة، الموجات الكهرومغناطيسية)' });
LW({ id: 'g8_em', cat: 25, name: 'الموجات الكهرومغناطيسية', fx: '<i>c</i> = 3×10<sup>8</sup> m/s = <i>λ</i> <i>f</i>', sym: 'موجات مستعرضة لا تحتاج إلى وسط مادي لانتقالها، تنتقل في الفراغ بسرعة 3×10⁸ m/s. أنواعها حسب الطول الموجي: الراديوية، الدقيقة (المايكروية)، تحت الحمراء، الضوء المرئي، فوق البنفسجية، السينية، أشعة كاما', calc: { in: [['l', 'الطول الموجي λ', 'm', 0.03]], out: 'التردد f', u: 'Hz', f: v => 3e8 / v.l } });
LW({ id: 'g8_ssp', cat: 25, name: 'مقدار سرعة الصوت (انطلاق الصوت)', fx: '<i>S</i> = ' + FR('<i>d</i>', '<i>t</i>'), sym: 'مقدار سرعة الصوت = المسافة التي يقطعها الصوت ÷ الزمن المستغرق لقطعها. يعتمد على كثافة الوسط (يقل كلما زادت كثافته) ومرونته (يزداد كلما كبر معامل المرونة): أكبر في الصلبة منه في السائلة وأكبر منه في الغازات. لا ينتقل الصوت في الفراغ', calc: { in: [['d', 'المسافة d', 'm', 680], ['t', 'الزمن t', 's', 2]], out: 'مقدار سرعة الصوت S', u: 'm/s', f: v => v.d / v.t } });
LW({ id: 'g8_stemp', cat: 25, name: 'سرعة الصوت ودرجة الحرارة', fx: '<i>S</i> = 331 + 0.6 <i>T</i>', sym: '331 m/s انطلاق الصوت في الهواء عند درجة الصفر السيليزي، ويزداد بمعدل 0.6 m/s لكل درجة سيليزية واحدة نتيجة لزيادة حركة جزيئات الهواء. T درجة الحرارة بالسيليزي', calc: { in: [['T', 'درجة الحرارة T', '°C', 30]], out: 'انطلاق الصوت S', u: 'm/s', f: v => 331 + .6 * v.T } });
LW({ id: 'g8_echo', cat: 25, name: 'الصدى', fx: '<i>S</i> = ' + FR('2 <i>d</i>', '<i>t</i>') + ' &nbsp; ، &nbsp; <i>t</i> ≥ 0.1 s ⟸ <i>d</i> ≥ 17 m', sym: 'الصدى ظاهرة تكرار سماع الصوت الناشئ عن انعكاس الموجات الصوتية. شرطاه: أن تكون أقل مدة زمنية بين سماع الصوت وصداه 0.1 s، ووجود سطح أو جدار عاكس. أقل مسافة يحصل عندها صدى مسموع عن سطح عاكس هي 17 m. t زمن ذهاب الصوت وإيابه', calc: { in: [['d', 'بعد الحاجز d', 'm', 360], ['t', 'زمن الذهاب والإياب t', 's', 2]], out: 'مقدار سرعة الصوت', u: 'm/s', f: v => 2 * v.d / v.t } });
LW({ id: 'g8_hear', cat: 25, name: 'أنواع الموجات الصوتية', fx: 'تحت السمعية < 20 Hz &nbsp; | &nbsp; السمعية 20–20000 Hz &nbsp; | &nbsp; فوق السمعية > 20000 Hz', sym: 'الموجات السمعية تتحسسها الأذن البشرية. فوق السمعية تستثمر في المجالات الصناعية والطبية لقصر أطوالها الموجية وطاقتها العالية. دون السمعية لا يشعر بها البشر وتتحسسها بعض الحيوانات كالفيلة' });
LW({ id: 'g8_sprops', cat: 25, name: 'خصائص الصوت', fx: 'العلو ← الشدة &nbsp; | &nbsp; الدرجة ← التردد &nbsp; | &nbsp; النوع ← المصدر وطريقة الاهتزاز', sym: 'علو الصوت يرتبط بشدته، وتعتمد الشدة على: المساحة السطحية للسطح المهتز (طاقة المصدر)، كثافة الوسط الناقل، البعد بين المصدر والسامع. درجة الصوت (حاد/غليظ) تزداد بزيادة التردد. نوع مصدر الصوت يميّز الأصوات المتساوية بالشدة والدرجة ويعتمد على نوع المصدر وطريقة توليد الصوت' });

const Q25 = {
  cx(w) { return (w + 64) / 2; },
  iso(s) { s = String(s); if (!/[\u0600-\u06FF]/.test(s)) return s; return '\u061C' + s.replace(/[(A-Za-z0-9λµ°₀-₉][A-Za-z0-9λµ°₀-₉⁰¹²³⁴⁵⁶⁷⁸⁹⁻ .=×÷+\-−\/²³√()·,:≈%]*[A-Za-z0-9λµ°₀-₉⁰¹²³⁴⁵⁶⁷⁸⁹)²³%]|[0-9]/g, m => '\u2066' + m + '\u2069'); },
  /* phones draw at a virtual 760 px width scaled down (fitCanvas) — enlarge text so it stays readable */
  fz(ctx) { const k = (ctx && ctx.canvas && ctx.canvas.__k) || 1; return k < .8 ? Math.min(1.3, .68 / k) : 1; },
  T(ctx, s, x, y, o) { o = Object.assign({ c: '#1e293b', raw: 1 }, o || {}); const z = Q25.fz(ctx); if (z > 1 && !(o.s >= 20)) o.s = (o.s || 13) * z; G.text(ctx, Q25.iso(s), x, y, o); },
  lines(ctx, L, x, y, wd, o = {}) { const z = Q25.fz(ctx); wd = Math.min(wd * z, x - 8); const lh = (o.lh || 21) * z, hh = (o.title ? 26 * z : 8) + L.length * lh + 6; C2.card(ctx, x - wd, y, wd, hh, { bd: o.bd || '#0d9488' });
    if (o.title) Q25.T(ctx, o.title, x - wd / 2, y + 15 * z, { s: 13, w: 900, c: o.bd || '#0d9488' });
    L.forEach((q, i) => { const it = typeof q === 'string' ? { t: q } : q; Q25.T(ctx, it.t, x - 10, y + (o.title ? 26 * z : 8) + lh * (i + .5), { s: it.s || 12.5, w: it.w || 700, c: it.c || '#1e293b', a: 'right' }); }); return hh; },
  sup(e) { return String(e).split('').map(d => d === '-' ? '⁻' : '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]).join(''); },
  nf(v, d = 3, u) { v = +v; return fmt(Math.abs(v) < 5e-6 ? 0 : v, d, u); },
  banner(ctx, w, s, col = '#0d9488', y = 22) { Q25.T(ctx, s, Q25.cx(w), y, { s: w < 600 ? 12 : 14, w: 900, c: '#fff', bg: col }); },
  /* info card at the top-right (full width on a phone) */
  card(ctx, S, L, o = {}) { const w = S.W, ph = w < 600; const wd = ph ? w - 24 : Math.min(o.wd || 340, w * (o.f || .5)); const x = o.x != null && !ph ? o.x : w - 12;
    L = L.filter(Boolean).map(q => typeof q === 'string' ? { t: q, s: ph ? 11.5 : 12.5 } : Object.assign({ s: ph ? 11.5 : 12.5 }, q));
    return Q25.lines(ctx, L, x, o.y || 44, wd, { title: o.title, bd: o.bd || '#0d9488', lh: ph ? 18 : 21 }); },
  /* row of on-canvas buttons at the bottom-left (bottom on a phone) */
  row(S, n, bw = 150) { const W = S.W, H = S.H; if (W < 600) { const y = H - 92, b = (W - 24) / n - 8; return Array.from({ length: n }, (_, i) => ({ x: 12 + b / 2 + i * (b + 8), y, w: b, h: 40 })); }
    return Array.from({ length: n }, (_, i) => ({ x: 82 + bw / 2 + i * (bw + 10), y: H - 64, w: bw, h: 40 })); },
  btn(ctx, b, label, col, on) { C2.btn(ctx, b.x, b.y, b.w, b.h, label, { col, on, s: b.w < 110 ? 11.5 : 13 }); },
  bo(id, b, click, o = {}) { return Object.assign({ id, x: b.x, y: b.y, w: b.w, h: b.h, tip: o.tip || 'اضغط', hint: !!o.hint, click }, o.idle ? { idle: o.idle } : {}); },
  /* ---------- sound (Web Audio, only after a click) ---------- */
  live: null,
  ac() { return window.Sound && Sound.on !== false && Sound.ac ? Sound.ac() : null; },
  /* play a note: f Hz, d s; o.h = harmonic amplitudes [1, a2, a3…]; o.vol; o.decay (s); returns a handle {g} */
  tone(f, d = 1, o = {}) { const a = Q25.ac(); if (!a || !(f > 0)) return null; try {
    const os = a.createOscillator(), g = a.createGain(), t0 = a.currentTime;
    if (o.h) { const re = new Float32Array(o.h.length + 1), im = new Float32Array(o.h.length + 1); o.h.forEach((v, i) => { im[i + 1] = v; }); os.setPeriodicWave(a.createPeriodicWave(re, im)); } else os.type = o.type || 'sine';
    os.frequency.value = f; const v = o.vol ?? .12; g.gain.setValueAtTime(.0001, t0); g.gain.exponentialRampToValueAtTime(Math.max(v, .0002), t0 + (o.att || .015));
    if (o.decay) g.gain.setTargetAtTime(.0001, t0 + (o.att || .015), o.decay); else { g.gain.setValueAtTime(Math.max(v, .0002), t0 + Math.max(.03, d - .08)); g.gain.exponentialRampToValueAtTime(.0001, t0 + d); }
    os.connect(g); g.connect(a.destination); os.start(t0); os.stop(t0 + d + .05); return { os, g, a, v };
  } catch (e) { return null; } },
  vol(hd, v) { if (!hd) return; try { hd.g.gain.cancelScheduledValues(hd.a.currentTime); hd.g.gain.setTargetAtTime(Math.max(v, .0001), hd.a.currentTime, .05); } catch (e) { } },
  stop(hd) { if (!hd) return; try { hd.g.gain.cancelScheduledValues(hd.a.currentTime); hd.g.gain.setTargetAtTime(.0001, hd.a.currentTime, .03); } catch (e) { } },
  noise(d = .3, vol = .2, lp = 1200) { const a = Q25.ac(); if (!a) return; try { const n = Math.floor(a.sampleRate * d), b = a.createBuffer(1, n, a.sampleRate), x = b.getChannelData(0); for (let i = 0; i < n; i++) x[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2);
    const s = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain(); f.type = 'lowpass'; f.frequency.value = lp; g.gain.value = vol; s.buffer = b; s.connect(f); f.connect(g); g.connect(a.destination); s.start(); } catch (e) { } },
  /* ---------- drawings ---------- */
  /* tuning fork: (x,y) = bottom of the U, prongs along angle ang (−π/2 = up), prong length L, tip displacement dsp (px) */
  fork(ctx, x, y, L, ang, dsp, o = {}) {
    K.raw(ctx, () => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang + Math.PI / 2);
      const g = L * .2, pw = L * .085, mg = ctx.createLinearGradient(-g, 0, g, 0); mg.addColorStop(0, '#6b7280'); mg.addColorStop(.25, '#e5e7eb'); mg.addColorStop(.5, '#9ca3af'); mg.addColorStop(.75, '#f8fafc'); mg.addColorStop(1, '#6b7280');
      ctx.fillStyle = mg; ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 1.1;
      // stem + handle
      ctx.fillRect(-pw * .45, g * .5, pw * .9, L * .42); ctx.strokeRect(-pw * .45, g * .5, pw * .9, L * .42);
      const hg = ctx.createRadialGradient(-2, L * .46, 1, 0, L * .48, pw * 1.2); hg.addColorStop(0, '#f1f5f9'); hg.addColorStop(1, '#64748b'); ctx.fillStyle = hg; ctx.beginPath(); ctx.ellipse(0, L * .5, pw * .85, pw * 1.15, 0, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.fillStyle = mg;
      // U and prongs (bent by dsp)
      [-1, 1].forEach(sd => { const xb = sd * g / 2, tip = sd * (g / 2 + dsp); ctx.beginPath(); ctx.moveTo(xb - pw / 2, 0); ctx.quadraticCurveTo(xb - pw / 2, -L * .55, tip - pw / 2, -L); ctx.lineTo(tip + pw / 2, -L); ctx.quadraticCurveTo(xb + pw / 2, -L * .55, xb + pw / 2, 0); ctx.closePath(); ctx.fill(); ctx.stroke(); });
      ctx.beginPath(); ctx.arc(0, 0, g / 2 + pw / 2, 0, Math.PI); ctx.arc(0, 0, g / 2 - pw / 2, Math.PI, 0, true); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(-g / 2 - pw * .2, -L * .9, pw * .18, L * .8);
      if (o.label) { ctx.save(); ctx.translate(g / 2, -L * .45); ctx.rotate(-Math.PI / 2); ctx.fillStyle = '#334155'; ctx.font = '700 ' + Math.max(8, L * .07) + 'px ui-monospace,monospace'; ctx.textAlign = 'center'; ctx.fillText(o.label, 0, 3); ctx.restore(); }
      ctx.restore();
    });
  },
  /* a fist holding a vertical rod at (x,y); sleeve towards the lower right */
  fist(ctx, x, y, s = 1, o = {}) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
    ctx.fillStyle = o.sleeve || '#64748b'; ctx.beginPath(); ctx.moveTo(10, 4); ctx.lineTo(70, 46); ctx.lineTo(58, 66); ctx.lineTo(-2, 22); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#f2c29b'; ctx.strokeStyle = '#b45309'; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.ellipse(6, 10, 15, 13, .5, 0, TAU); ctx.fill(); ctx.stroke();
    for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(-9, -4 + k * 7, 6, 3.6, 0, 0, TAU); ctx.fill(); ctx.stroke(); }
    ctx.beginPath(); ctx.ellipse(-3, -11, 7, 4, -.6, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); }); },
  /* side view of an ear (like the book photo), centre (x,y), size r, facing left when dir = -1 */
  ear(ctx, x, y, r, dir = -1, o = {}) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(-dir, 1);
    ctx.fillStyle = '#e8b48f'; ctx.fillRect(-r * .2, -r * 2, r * 3, r * 4.2); // cheek / head
    ctx.fillStyle = '#5b3a29'; ctx.beginPath(); ctx.moveTo(-r * .2, -r * 2); ctx.lineTo(r * 2.8, -r * 2); ctx.lineTo(r * 2.8, -r * 1.25); ctx.quadraticCurveTo(r * 1.2, -r * 1.6, r * .3, -r * 1.25); ctx.closePath(); ctx.fill();
    const g = ctx.createRadialGradient(-r * .2, -r * .3, r * .1, 0, 0, r * 1.2); g.addColorStop(0, '#fcd5b5'); g.addColorStop(1, '#d98f6a');
    ctx.fillStyle = g; ctx.strokeStyle = '#a0573a'; ctx.lineWidth = 1.6; ctx.beginPath();
    ctx.moveTo(r * .55, -r * 1.05); ctx.bezierCurveTo(-r * .3, -r * 1.35, -r * 1.05, -r * .8, -r * .95, -r * .05); ctx.bezierCurveTo(-r * .9, r * .55, -r * .5, r * .8, -r * .25, r * 1.15);
    ctx.bezierCurveTo(-r * .05, r * 1.45, r * .45, r * 1.35, r * .5, r * .95); ctx.bezierCurveTo(r * .55, r * .5, r * .75, r * .2, r * .7, -r * .3); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#b4684a'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(r * .3, -r * .8); ctx.bezierCurveTo(-r * .35, -r * .95, -r * .75, -r * .45, -r * .62, r * .1); ctx.bezierCurveTo(-r * .55, r * .5, -r * .2, r * .55, -r * .15, r * .95); ctx.stroke();
    ctx.fillStyle = '#c47a58'; ctx.beginPath(); ctx.ellipse(r * .08, r * .05, r * .32, r * .42, -.2, 0, TAU); ctx.fill();
    ctx.fillStyle = '#4a2416'; ctx.beginPath(); ctx.ellipse(r * .2, r * .08, r * .13, r * .17, 0, 0, TAU); ctx.fill();
    if (o.drum != null) { ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(r * .2 + o.drum, r * .08, r * .05, r * .12, 0, 0, TAU); ctx.stroke(); }
    ctx.restore(); }); },
  /* loudspeaker facing +x (dir=1) or -x; cone displacement cd (px) */
  speaker(ctx, x, y, s, dir = 1, cd = 0) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, y); ctx.scale(dir * s, s);
    const bg = ctx.createLinearGradient(-60, 0, 0, 0); bg.addColorStop(0, '#1f2937'); bg.addColorStop(1, '#4b5563'); ctx.fillStyle = bg; rr(ctx, -64, -62, 50, 124, 8); ctx.fill(); ctx.strokeStyle = '#111827'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#374151'; ctx.beginPath(); ctx.moveTo(-16, -50); ctx.lineTo(-4 + cd, -54); ctx.lineTo(-4 + cd, 54); ctx.lineTo(-16, 50); ctx.closePath(); ctx.fill();
    const cg = ctx.createLinearGradient(-16, 0, cd, 0); cg.addColorStop(0, '#111827'); cg.addColorStop(1, '#6b7280'); ctx.fillStyle = cg; ctx.beginPath(); ctx.ellipse(-4 + cd, 0, 9, 48, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.ellipse(-1 + cd, 0, 4, 12, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#6b7280'; ctx.beginPath(); ctx.arc(-40, -40, 4, 0, TAU); ctx.fill(); ctx.restore(); }); },
  /* candle on a small stand, flame leaning dx (px) */
  candle(ctx, x, yb, s, fdx, t) { K.raw(ctx, () => { ctx.save(); ctx.translate(x, yb); ctx.scale(s, s);
    ctx.fillStyle = '#78716c'; ctx.fillRect(-26, -6, 52, 6); ctx.fillRect(-4, -60, 8, 54); ctx.fillStyle = '#a8a29e'; ctx.beginPath(); ctx.ellipse(0, -60, 20, 5, 0, 0, TAU); ctx.fill();
    const wg = ctx.createLinearGradient(-11, 0, 11, 0); wg.addColorStop(0, '#fde7c8'); wg.addColorStop(.5, '#fffaf0'); wg.addColorStop(1, '#e9cfa8'); ctx.fillStyle = wg; rr(ctx, -11, -150, 22, 90, 3); ctx.fill(); ctx.strokeStyle = '#d6b88c'; ctx.lineWidth = 1; ctx.stroke();
    ctx.strokeStyle = '#1c1917'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -150); ctx.lineTo(fdx * .15, -158); ctx.stroke();
    const fl = 1 + .05 * Math.sin(t * 23) + .04 * Math.sin(t * 37), tx = fdx, ty = -158 - 40 * fl;
    const fg = ctx.createRadialGradient(fdx * .4, -166, 2, fdx * .4, -170, 26); fg.addColorStop(0, 'rgba(255,255,255,.95)'); fg.addColorStop(.3, 'rgba(253,224,71,.95)'); fg.addColorStop(.7, 'rgba(249,115,22,.85)'); fg.addColorStop(1, 'rgba(249,115,22,0)');
    ctx.fillStyle = 'rgba(253,186,116,.25)'; ctx.beginPath(); ctx.arc(fdx * .5, -172, 34, 0, TAU); ctx.fill();
    ctx.fillStyle = fg; ctx.beginPath(); ctx.moveTo(-9, -158); ctx.bezierCurveTo(-11, -172, tx - 4, ty + 12, tx, ty); ctx.bezierCurveTo(tx + 4, ty + 12, 11, -172, 9, -158); ctx.quadraticCurveTo(0, -150, -9, -158); ctx.fill();
    ctx.fillStyle = 'rgba(59,130,246,.55)'; ctx.beginPath(); ctx.ellipse(0, -156, 5, 4, 0, 0, TAU); ctx.fill(); ctx.restore(); }); },
  /* brick wall from y0 to y1, at x (left edge), width ww */
  wall(ctx, x, y0, y1, ww, o = {}) { K.raw(ctx, () => { const bh = 14, bw = 30; ctx.fillStyle = o.c || '#b45309'; ctx.fillRect(x, y0, ww, y1 - y0); ctx.save(); ctx.beginPath(); ctx.rect(x, y0, ww, y1 - y0); ctx.clip();
    for (let r = 0, y = y1; y > y0 - bh; r++, y -= bh) for (let xx = x - (r % 2) * bw / 2; xx < x + ww; xx += bw) { ctx.fillStyle = ['#c2410c', '#b45309', '#9a3412', '#c05621'][(r * 7 + Math.round(xx)) % 4]; ctx.fillRect(xx + 1, y - bh + 1, bw - 2, bh - 2); }
    ctx.restore(); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(x, y0, 3, y1 - y0); }); },
  /* oscilloscope / sound-meter screen; fn(u) in [-1,1] for u in [0,1] */
  scope(ctx, x, y, w, h, fns, o = {}) { K.raw(ctx, () => { ctx.fillStyle = '#0b1f1a'; rr(ctx, x, y, w, h, 10); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.stroke();
    ctx.strokeStyle = 'rgba(52,211,153,.18)'; ctx.lineWidth = 1; for (let k = 1; k < 8; k++) { ctx.beginPath(); ctx.moveTo(x + w * k / 8, y + 4); ctx.lineTo(x + w * k / 8, y + h - 4); ctx.stroke(); } for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x + 4, y + h * k / 4); ctx.lineTo(x + w - 4, y + h * k / 4); ctx.stroke(); }
    fns.forEach(F => { ctx.strokeStyle = F.c || '#34d399'; ctx.lineWidth = F.lw || 2.2; ctx.beginPath(); for (let i = 0; i <= 200; i++) { const u = i / 200, v = clamp(F.f(u), -1.1, 1.1); const X = x + 6 + (w - 12) * u, Y = y + h / 2 - v * (h / 2 - 8); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke(); });
    if (o.title) { ctx.fillStyle = '#a7f3d0'; ctx.font = '800 11px Tajawal,sans-serif'; ctx.direction = 'rtl'; ctx.textAlign = 'right'; ctx.fillText(C2.iso(o.title), x + w - 8, y + 14); } }); },
  /* sound arcs (wavefronts) from a source at (x,y) towards angle ang, radius list rs */
  arcs(ctx, x, y, rs, ang, spread, col, alpha = 1) { K.raw(ctx, () => { ctx.strokeStyle = col; rs.forEach(r => { if (r <= 2) return; ctx.globalAlpha = alpha * clamp(1 - r / 400, .15, 1); ctx.lineWidth = 2.4; ctx.beginPath(); ctx.arc(x, y, r, ang - spread, ang + spread); ctx.stroke(); }); ctx.globalAlpha = 1; }); },
  /* stone / pebble */
  stone(ctx, x, y, r) { K.raw(ctx, () => { const g = ctx.createRadialGradient(x - r * .3, y - r * .4, r * .1, x, y, r * 1.2); g.addColorStop(0, '#d6d3d1'); g.addColorStop(1, '#57534e'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(x, y, r * 1.2, r * .9, .3, 0, TAU); ctx.fill(); ctx.strokeStyle = '#44403c'; ctx.lineWidth = 1; ctx.stroke(); }); }
};
Q25.LIFE = {};

/* =========================================================================================
   1-a) نشاط استهلالي (ص 57): حدوث الصوت — شوكة رنانة ومطرقة، قدح فيه ماء
   ========================================================================================= */
(() => {
  const F0 = 440;
  const D = { id: 'g8_w_fork', page: 57, fig: 'نشاط استهلالي ص 57',
    desc: 'أطرق الشوكة الرنانة بالمطرقة وقرّبها من أذنك: ماذا تسمع؟ ثم اطرقها مرة ثانية وقرّبها من الماء الموضوع في القدح: لماذا يهتز الماء وينتشر خارج القدح؟',
    tags: 'نشاط استهلالي حدوث الصوت شوكة رنانة مطرقة قدح ماء اهتزاز أذن',
    tools: ['شوكة رنانة ومطرقة', 'قدح', 'قنينة فيها ماء'],
    steps: ['① (الكتاب) أطرق الشوكة الرنانة بالمطرقة الخاصة بها، وقرّبها من أذنك. ماذا أسمع؟ — اختر «قرب الأذن»، اضغط «اطرق الشوكة» أو اسحب المطرقة لتضرب أحد فرعي الشوكة، ثم اسحب الشوكة نحو الأذن.',
      '② (الكتاب) ضع كمية من الماء في قدح وأمسك الشوكة ثم اطرقها مرة ثانية وقرّبها من الماء. ماذا ألاحظ؟ — اختر «في قدح الماء»، اطرق الشوكة ثم اسحبها إلى أسفل حتى يلمس فرعاها الماء.',
      '③ لماذا يهتز الماء وينتشر خارج القدح؟ جرّب أن تغمس الشوكة وهي ساكنة (لم تطرقها): هل يتطاير الماء؟',
      '④ أفسّر كيف يحدث الصوت؟ ⑤ أستنتج ما الصوت؟ ⑥ أذكر بعض أنواع الموجات الأخرى.'],
    concl: ['الشوكة الرنانة المطروقة تهتز (فرعاها يتحركان ذهاباً وإياباً بسرعة كبيرة) فنسمع صوتاً.', 'يهتز الماء ويتطاير خارج القدح لأن فرعي الشوكة يهتزان وينقلان طاقة اهتزازهما إلى الماء.', 'يحدث الصوت بسبب اهتزاز الأجسام؛ والصوت موجة تنقل طاقة الجسم المهتز عبر الوسط (الهواء) إلى الأذن.', 'من الموجات الأخرى: موجات الماء، موجات النابض والحبل، الموجات الزلزالية، الضوء والموجات الراديوية.'],
    laws: ['g8_wave'],
    controls: [SEL('where', 'أين أقرّب الشوكة؟', [['ear', 'قرب الأذن (خطوة 1)'], ['water', 'في قدح الماء (خطوة 2)']], 'ear', (v, S) => { D.place(S); }),
      BT('', [{ t: '🔨 اطرق الشوكة', on: S => D.swing(S) }, { t: '✋ أوقف الاهتزاز', on: S => { S.amp = 0; Q25.stop(S._snd); } }]),
      TG('snd', 'سماع الصوت (السمّاعة)', true, null, 'wave'), TG('arcs', 'موجات الصوت في الهواء', true, null, 'wave'), TG('zoom', 'مكبّر: اهتزاز فرعي الشوكة', true, null, 'eye'), TG('lab', 'البطاقات والتسميات', true, null, 'labels')],
    setup(S) { S.amp = 0; S.drops = []; S.rings = []; S.sw = 0; S.ph = 0; S.wet = 0; S.splashN = 0; S.heard = 0; D.place(S); },
    place(S) { S.fx = null; S.fy = null; S.amp = 0; S.drops = []; Q25.stop(S._snd); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, by = h * (ph ? .8 : .84), L = clamp(Math.min(h * .2, w * .17), 60, 130);
      const water = S.p.where === 'water';
      const cup = { x: 70 + (w - 70) * (ph ? .42 : .38), yb: by, w: clamp(L * 1.1, 70, 130), h: clamp(L * 1.15, 70, 140) };
      const ear = { x: w - (ph ? 58 : 110), y: h * (ph ? .5 : .46), r: clamp(L * .55, 34, 66) };
      const def = water ? [cup.x, cup.yb - cup.h - L * .5 - 30] : [70 + (w - 70) * (ph ? .3 : .38), by - L * .55];
      const fx = S.fx ?? def[0], fy = S.fy ?? def[1];
      return { w, h, ph, by, L, water, cup, ear, fx, fy, lev: cup.yb - cup.h * .62 };
    },
    tips(g) { const dir = g.water ? 1 : -1, gap = g.L * .2; return [[g.fx - gap / 2, g.fy + dir * g.L], [g.fx + gap / 2, g.fy + dir * g.L]]; },
    swing(S) { S.sw = .001; S.swHit = 0; },
    strike(S) { S.amp = 1; S.ph = 0; S.heard = 1; if (S.p.snd !== false) { Q25.stop(S._snd); S._snd = Q25.tone(F0, 6, { decay: 1.6, vol: .03 }); } if (window.Sound && Sound.noise) Sound.noise(.02, .2); },
    earDist(g) { const t = D.tips(g); const mx = (t[0][0] + t[1][0]) / 2, my = (t[0][1] + g.fy) / 2; return Math.hypot(mx - (g.ear.x - g.ear.r * .2), my - g.ear.y); },
    dipDepth(g) { if (!g.water) return 0; const t = D.tips(g); const inCup = Math.abs(g.fx - g.cup.x) < g.cup.w * .42; return inCup ? Math.max(0, t[0][1] - g.lev) : 0; },
    update(S, dt) { const g = D.geo(S); S.ph += dt * 60; // visual phase (slow motion of 440 Hz)
      if (S.sw > 0) { S.sw += dt / .32; if (S.sw > .55 && !S.swHit) { S.swHit = 1; D.strike(S); } if (S.sw >= 1) S.sw = 0; }
      const dep = D.dipDepth(g); S.wet = dep;
      const tau = dep > 2 ? .45 : 2.2; S.amp *= Math.exp(-dt / tau); if (S.amp < .004) S.amp = 0;
      // live loudness of the real sound: louder near the ear, quieter in water
      if (S._snd) { const d = D.earDist(g); const near = g.water ? .5 : clamp(1.4 - d / (g.w * .5), .15, 1.4); Q25.vol(S._snd, .045 * S.amp * near); if (S.amp === 0) { Q25.stop(S._snd); S._snd = null; } }
      // splashes
      if (dep > 2 && S.amp > .03) { const t = D.tips(g); const n = S.amp * 70 * dt + Math.random() * .5; for (let k = 0; k < n; k++) { const tp = t[Math.random() < .5 ? 0 : 1], sd = tp[0] < g.fx ? -1 : 1; S.drops.push({ x: tp[0] + sd * 4, y: g.lev - 2, vx: sd * (60 + Math.random() * 180) * S.amp, vy: -(180 + Math.random() * 280) * S.amp, life: 0 }); S.splashN++; } }
      S.drops.forEach(d => { d.vy += 900 * dt; d.x += d.vx * dt; d.y += d.vy * dt; d.life += dt; });
      S.drops = S.drops.filter(d => d.y < g.by + 4 && d.life < 2.5).slice(-260);
      // air sound arcs
      if (!g.water || dep <= 0) { S.arcT = (S.arcT || 0) + dt; if (S.amp > .05 && S.arcT > .16) { S.arcT = 0; S.rings.push({ r: 4, a: S.amp }); } }
      S.rings.forEach(r => r.r += 160 * dt); S.rings = S.rings.filter(r => r.r < g.w);
    },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, dsp = S.amp * g.L * .06 * Math.sin(S.ph); K.bg(ctx, w, h, { benchY: g.by });
      Q25.banner(ctx, w, g.water ? 'اطرق الشوكة ثم اسحبها إلى أسفل لتلمس الماء ✋' : 'اطرق الشوكة ثم قرّبها من الأذن ✋', '#0d9488', 20);
      const t = D.tips(g), dir = g.water ? 1 : -1;
      // ear
      if (!g.water) { Q25.ear(ctx, g.ear.x, g.ear.y, g.ear.r, -1, { drum: S.amp > .02 ? Math.sin(S.ph) * 1.5 * S.amp : 0 }); if (p.lab !== false) Q25.T(ctx, 'الأذن', g.ear.x, g.ear.y + g.ear.r * 1.75, { s: 12, w: 900, c: '#fff', bg: '#9a3412' }); }
      // bottle (materials)
      K.raw(ctx, () => { const bx = g.ph ? w - 30 : w - 40, bh = 70; ctx.fillStyle = 'rgba(186,230,253,.55)'; rr(ctx, bx - 13, g.by - bh, 26, bh, 6); ctx.fill(); ctx.fillStyle = 'rgba(56,189,248,.45)'; ctx.fillRect(bx - 12, g.by - bh * .7, 24, bh * .7 - 2); ctx.fillStyle = '#2563eb'; ctx.fillRect(bx - 6, g.by - bh - 10, 12, 10); ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 1.2; rr(ctx, bx - 13, g.by - bh, 26, bh, 6); ctx.stroke(); });
      // cup back + water
      const c = g.cup, x0 = c.x - c.w / 2, x1 = c.x + c.w / 2, top = c.yb - c.h, lev = g.lev, inset = c.w * .12;
      const wx = yy => inset * (c.yb - yy) / c.h; // walls taper (wider at top)
      if (g.water) K.raw(ctx, () => {
        ctx.fillStyle = 'rgba(0,0,0,.15)'; ctx.beginPath(); ctx.ellipse(c.x, c.yb + 3, c.w * .55, 6, 0, 0, TAU); ctx.fill();
        ctx.fillStyle = 'rgba(56,189,248,.45)'; ctx.beginPath(); const sw = S.wet > 2 ? S.amp * 3 * Math.sin(S.ph * 1.3) : 0;
        ctx.moveTo(x0 + inset - wx(lev) + inset * 0, lev); for (let i = 0; i <= 20; i++) { const xx = x0 + (c.w) * i / 20; const near = Math.min(...t.map(q => Math.abs(xx - q[0]))); ctx.lineTo(clamp(xx, x0 - wx(lev) + inset, x1 + wx(lev) - inset), lev + (S.wet > 2 ? sw * Math.exp(-near / 18) * Math.cos(near * .5) : 0)); }
        ctx.lineTo(x1 - inset * .0 - 2, c.yb - 4); ctx.lineTo(x0 + 2, c.yb - 4); ctx.closePath(); ctx.fill();
      });
      // sound arcs
      if (p.arcs !== false && S.rings.length) { const cy = g.fy + dir * g.L * .55; Q25.arcs(ctx, g.fx, cy, S.rings.map(r => r.r), 0, .7, '#0d9488', .9); Q25.arcs(ctx, g.fx, cy, S.rings.map(r => r.r), Math.PI, .7, '#0d9488', .9); }
      // fork + hand
      Q25.fork(ctx, g.fx, g.fy, g.L, g.water ? Math.PI / 2 : -Math.PI / 2, dsp, { label: F0 + ' Hz' });
      Q25.fist(ctx, g.fx, g.fy - dir * g.L * .38, g.L / 110, { sleeve: '#94a3b8' });
      // cup front (clear plastic, red band)
      if (g.water) K.raw(ctx, () => { ctx.fillStyle = 'rgba(239,68,68,.22)'; ctx.beginPath(); ctx.moveTo(x0 - inset, top); ctx.lineTo(x1 + inset, top); ctx.lineTo(x1, c.yb); ctx.lineTo(x0, c.yb); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = 'rgba(220,38,38,.55)'; ctx.beginPath(); ctx.moveTo(x0 - inset * .8, top + c.h * .1); ctx.lineTo(x1 + inset * .8, top + c.h * .1); ctx.lineTo(x1 + inset * .65, top + c.h * .22); ctx.lineTo(x0 - inset * .65, top + c.h * .22); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(c.x, top, c.w / 2 + inset, 6, 0, 0, TAU); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.fillRect(x0 + 4, top + 10, 5, c.h - 18); });
      if (p.lab !== false && g.water) Q25.T(ctx, 'قدح فيه ماء', c.x, c.yb + 16, { s: 11.5, w: 900, c: '#fff', bg: '#b91c1c' });
      // drops
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(14,165,233,.85)'; S.drops.forEach(d => { ctx.beginPath(); ctx.ellipse(d.x, d.y, 2.6, 3.4, 0, 0, TAU); ctx.fill(); }); });
      // mallet
      const m = D.mallet(S, g); K.raw(ctx, () => { ctx.save(); ctx.translate(m.hx, m.hy); ctx.rotate(m.a); ctx.fillStyle = '#d6a574'; ctx.fillRect(-3, 0, 6, g.L * .95); ctx.strokeStyle = '#8a5a33'; ctx.lineWidth = 1; ctx.strokeRect(-3, 0, 6, g.L * .95);
        const rg = ctx.createRadialGradient(-4, -4, 2, 0, 0, 14); rg.addColorStop(0, '#6b7280'); rg.addColorStop(1, '#111827'); ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(0, 0, g.L * .11 + 4, 0, TAU); ctx.fill(); ctx.restore(); });
      if (p.lab !== false) Q25.T(ctx, 'المطرقة', m.hx, m.hy - g.L * .11 - 16, { s: 11, w: 900, c: '#fff', bg: '#334155' });
      // zoom inset
      if (p.zoom !== false) { const zx = g.ph ? 70 : 84, zy = g.ph ? h * .3 : h * .2, zr = g.ph ? 40 : 54; K.raw(ctx, () => { ctx.save(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(zx + zr, zy + zr, zr, 0, TAU); ctx.fill(); ctx.clip();
          const big = S.amp * zr * .35 * Math.sin(S.ph); Q25.fork(ctx, zx + zr, zy + zr * 1.9, zr * 1.6, -Math.PI / 2, big, {});
          if (S.amp > .02) { ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2; [-1, 1].forEach(sd => { G.arrow(ctx, zx + zr + sd * zr * .2, zy + zr * .45, zx + zr + sd * zr * .55, zy + zr * .45, '#dc2626', 2, 6); G.arrow(ctx, zx + zr + sd * zr * .55, zy + zr * .45, zx + zr + sd * zr * .2, zy + zr * .45, '#dc2626', 2, 6); }); }
          ctx.restore(); ctx.strokeStyle = '#0d9488'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(zx + zr, zy + zr, zr, 0, TAU); ctx.stroke(); });
        Q25.T(ctx, S.amp > .02 ? 'الفرعان يهتزان!' : 'الفرعان ساكنان', zx + zr, zy + 2 * zr + 14, { s: 11.5, w: 900, c: '#fff', bg: S.amp > .02 ? '#dc2626' : '#64748b' }); }
      // card
      if (p.lab !== false) { const d = D.earDist(g), hear = !g.water && S.amp > .02, loud = hear ? clamp(S.amp * (1.6 - d / (w * .45)), 0, 1) : 0;
        const L = g.water ? [{ t: S.amp > .02 ? 'الشوكة تهتز (السعة ' + Math.round(S.amp * 100) + '%)' : 'الشوكة ساكنة', c: S.amp > .02 ? '#dc2626' : '#475569', w: 900 }, { t: S.wet > 2 ? (S.amp > .03 ? 'الماء يهتز ويتطاير خارج القدح!' : 'الشوكة في الماء — لا يتطاير الماء') : 'لم تلمس الشوكة الماء بعد', c: '#0369a1', w: 900 }, S.wet > 2 && S.amp > .03 ? { t: 'طاقة اهتزاز الشوكة تنتقل إلى الماء', c: '#0f766e' } : null]
          : [{ t: S.amp > .02 ? 'الشوكة تهتز ' + F0 + ' مرة في الثانية' : 'الشوكة ساكنة — لا صوت', c: S.amp > .02 ? '#dc2626' : '#475569', w: 900 }, { t: hear ? 'أسمع صوتاً (طنين) — العلو ' + Math.round(loud * 100) + '%' : 'لا أسمع شيئاً', c: '#9a3412', w: 900 }, hear ? { t: 'قرّبها أكثر من الأذن: يعلو الصوت', c: '#0f766e' } : null];
        Q25.card(ctx, S, L, { title: g.water ? 'الخطوة 2: الشوكة والماء' : 'الخطوة 1: الشوكة والأذن', wd: 300, y: 44, x: g.ph ? null : w - (g.water ? 12 : g.ear.r * 3.2) }); }
    },
    mallet(S, g) { const rest = { hx: g.fx + (g.water ? -g.L * .9 : -g.L * .75), hy: g.fy + (g.water ? g.L * .35 : -g.L * .65), a: -.5 };
      if (S.mx != null) return { hx: S.mx, hy: S.my, a: -.5 };
      if (S.sw > 0) { const t = D.tips(g)[0], k = Math.sin(Math.min(1, S.sw / .55) * Math.PI / 2), back = S.sw > .55 ? (S.sw - .55) / .45 : 0; const tx = t[0] - 10, ty = g.water ? g.fy + g.L * .55 : g.fy - g.L * .6;
        return { hx: lerp(rest.hx, tx, k * (1 - back)), hy: lerp(rest.hy, ty, k * (1 - back)), a: -.5 - (1 - back) * k * .3 }; }
      return rest; },
    drags(S) { if (!S.W) return []; const g = D.geo(S), m = D.mallet(S, g), dir = g.water ? 1 : -1;
      return [{ id: 'fork', x: g.fx, y: g.fy + dir * g.L * .3, w: g.L * .55, h: g.L * 1.5, axis: 'xy', keep: true, tip: g.water ? 'اسحب الشوكة إلى أسفل لتلمس الماء' : 'اسحب الشوكة نحو الأذن', idle: g.water ? 'اسحبني إلى الماء ✋' : 'اسحبني نحو الأذن ✋',
        down: (S, x, y) => { S.gx = x - g.fx; S.gy = y - g.fy; }, drag: (S, d) => { S.fx = clamp(d.x - S.gx, 90, g.w - 40); S.fy = clamp(d.y - S.gy, 70, g.by - (g.water ? g.L + 6 : 20)); } },
      { id: 'mallet', x: m.hx, y: m.hy, r: 26, axis: 'xy', keep: true, tip: 'اسحب المطرقة واضرب بها فرع الشوكة (أو اضغطها)', hint: false,
        down: S => { S.mx = m.hx; S.my = m.hy; }, drag: (S, d) => { S.mx = d.x; S.my = d.y; const t = D.tips(D.geo(S)); const gg = D.geo(S); const y0 = Math.min(gg.fy, t[0][1]), y1 = Math.max(gg.fy, t[0][1]);
          if (S.mx > t[0][0] - 22 && S.mx < t[1][0] + 22 && S.my > y0 && S.my < y1 && !(S.amp > .7)) D.strike(S); },
        up: S => { S.mx = null; S.my = null; }, click: S => D.swing(S) }];
    },
    readings(S) { const g = D.geo(S); return [rd('تردد الشوكة', F0 + ' Hz'), rd('سعة اهتزاز الفرعين', Math.round(S.amp * 100) + '%'), rd(g.water ? 'الماء' : 'هل أسمع صوتاً؟', g.water ? (S.wet > 2 ? (S.amp > .03 ? 'يهتز ويتطاير' : 'ساكن') : 'لم تلمسه الشوكة') : (S.amp > .02 ? 'نعم' : 'لا')), rd('قطرات متطايرة', S.splashN | 0)]; },
    explain(S) { const g = D.geo(S);
      if (g.water) return S.wet > 2 && S.amp > .03 ? '<b>يهتز الماء ويتطاير</b> لأن فرعي الشوكة <b>يهتزان</b> بسرعة كبيرة (' + F0 + ' مرة في الثانية) فيدفعان الماء ذهاباً وإياباً وينقلان إليه <b>طاقة الاهتزاز</b>. لاحظ أن اهتزاز الشوكة يتوقف بسرعة في الماء لأنها تعطيه طاقتها.' : 'اطرق الشوكة ثم اغمس فرعيها في الماء. جرّب أيضاً أن تغمسها <b>وهي ساكنة</b>: لن يتطاير الماء — إذن السبب هو <b>الاهتزاز</b>.';
      return S.amp > .02 ? 'فرعا الشوكة <b>يهتزان</b>، فيدفعان جزيئات الهواء المجاورة فتهتز هي أيضاً، وينتقل هذا الاهتزاز عبر الهواء حتى يصل إلى <b>طبلة الأذن</b> فنسمع الصوت. <b>الصوت يحدث بسبب اهتزاز الأجسام.</b>' : 'الشوكة ساكنة فلا نسمع شيئاً. اطرقها بالمطرقة لتهتز.'; }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'ضع يدك على حنجرتك وتكلّم: تشعر بأوتارك الصوتية تهتز. وعندما يدق جرس المنبه تهتز مطرقته الصغيرة بسرعة.';
})();
/* =========================================================================================
   1-b) الدرس 1 (ص 56، 58): ما الحركة الموجية؟ — حجر في بركة ماء، قطرة ماء على سطح ساكن
   ========================================================================================= */
(() => {
  const OBJ = { cork: 'قطعة فلين', leaf: 'ورقة شجر', duck: 'بطة بلاستيكية' };
  const D = { id: 'g8_w_pond', page: 58, fig: 'ص 56 و 58',
    desc: 'عندما ترمي حجراً في بركة ماء تتولد دوائر متحدة المركز تنتشر على حافة البركة وفي جميع الاتجاهات بسبب حصول اضطراب في الماء في منطقة سقوط الحجر. الاضطراب ينتقل بهيئة حركة اهتزازية بين دقائق الوسط من دون أن تنتقل تلك الدقائق.',
    tags: 'ما الحركة الموجية حجر بركة ماء قطرة دوائر متحدة المركز اضطراب نقل الطاقة دقائق الوسط فلين',
    tools: ['بركة ماء', 'حجر', 'قطعة فلين / ورقة شجر'],
    steps: ['اضغط على أي مكان في سطح الماء لترمي حجراً (أو اختر «قطرات ماء» كما في صورة بداية الوحدة ص 56).', 'لاحظ الدوائر متحدة المركز تنتشر في جميع الاتجاهات.', 'راقب قطعة الفلين الطافية (يمكنك سحبها إلى أي مكان): هل تتحرك مع الموجة نحو حافة البركة أم تهتز في مكانها؟', 'شغّل «مقطع جانبي» لترى دقائق الماء تهتز صعوداً ونزولاً في مكانها بينما تنتقل الموجة.', 'التفكير الناقد: هل تبقى سعة موجة الماء ثابتة بعد مدة من الزمن؟ راقب الدوائر وهي تبتعد.'],
    concl: ['الحركة الموجية: اضطراب ينتقل بشكل حركة اهتزازية إلى جزيئات الوسط دون أن تنتقل جزيئات الوسط.', 'الموجة اضطراب دوري ناتج عن مصدر طاقة لجسم مهتز، والموجة المنتشرة إحدى وسائل نقل الطاقة.', 'الفلين يهتز في مكانه ولا ينتقل مع الموجة: الموجة تنقل الطاقة لا المادة.', 'تقل سعة موجة الماء كلما ابتعدت الدوائر ومع مرور الزمن لأن طاقتها تتوزع على دائرة أكبر وتضيع جزئياً.'],
    laws: ['g8_wave'],
    controls: [SEL('src', 'المصدر', [['stone', 'حجر في بركة (ص 58)'], ['drip', 'قطرات ماء (ص 56)']], 'stone', (v, S) => { S.src = []; S.drip = 0; }),
      SEL('obj', 'الجسم الطافي', Object.keys(OBJ).map(k => [k, OBJ[k]]), 'cork'),
      BT('', [{ t: '🪨 ارمِ حجراً في الوسط', on: S => D.throwAt(S, 0, 0) }, { t: '↺ ماء ساكن', on: S => { S.src = []; S.drip = 0; S.stones = []; } }]),
      TG('sec', 'مقطع جانبي: دقائق الماء', true, null, 'dot'), TG('en', 'سهم انتقال الطاقة', true, null, 'energy'), TG('damp', 'تناقص السعة (واقعي)', true, null, 'wave'), TG('lab', 'البطاقات والتسميات', true, null, 'labels')],
    setup(S) { S.src = []; S.stones = []; S.drip = 0; S.ou = .55; S.ov = -.15; S.trail = []; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600; const R = Math.min((w - 90) * .46, h * (ph ? .5 : .62)); const cx = Q25.cx(w), cy = h * (ph ? .5 : .47), k = .42; return { w, h, ph, R, cx, cy, k }; },
    V: 90, LAM: 34, /* px/s, px (screen-scale of the pond) */
    throwAt(S, u, v) { S.stones.push({ u, v, z: 1, t: 0 }); },
    disp(S, g, u, v) { let y = 0; const lam = D.LAM * g.R / 300, V = D.V * g.R / 300; S.src.forEach(s => { const r = Math.hypot(u - s.u, v - s.v), age = S.t - s.t0, front = V * age - r; if (front < 0) return; const ncyc = s.drip ? 1.2 : 4; if (front > ncyc * lam) return;
        const env = Math.sin(Math.PI * front / (ncyc * lam)); const amp = S.p.damp !== false ? 9 / Math.sqrt(1 + r / 30) * Math.exp(-age / 9) : 7; y += amp * env * Math.sin(TAU * front / lam); }); return y; },
    update(S, dt) { const g = D.geo(S);
      S.stones.forEach(st => { st.t += dt; st.z -= dt * 2.2; if (st.z <= 0 && !st.done) { st.done = 1; S.src.push({ u: st.u, v: st.v, t0: S.t, drip: 0 }); if (window.Sound && Sound.noise) Sound.noise(.06, .15); } });
      S.stones = S.stones.filter(st => !st.done || st.t < 1.2);
      if (S.p.src === 'drip') { S.drip += dt; if (S.drip > .9) { S.drip = 0; S.stones.push({ u: 0, v: 0, z: .7, t: 0, drop: 1 }); } }
      S.src = S.src.filter(s => S.t - s.t0 < 14).slice(-24);
      const dy = D.disp(S, g, S.ou * g.R, S.ov * g.R); S.oy = dy; S.trail.push(dy); if (S.trail.length > 160) S.trail.shift(); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; G.bg(ctx, w, h, false);
      K.raw(ctx, () => { const sky = ctx.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, '#bbf7d0'); sky.addColorStop(1, '#4d7c0f'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
        for (let i = 0; i < 70; i++) { const x = (i * 97.3) % w, y = (i * 53.7) % h; ctx.strokeStyle = 'rgba(21,128,61,.35)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 3, y - 8); ctx.moveTo(x + 4, y); ctx.lineTo(x + 8, y - 6); ctx.stroke(); }
        ctx.fillStyle = '#a8a29e'; ctx.beginPath(); ctx.ellipse(g.cx, g.cy + 4, g.R + 14, (g.R + 14) * g.k + 6, 0, 0, TAU); ctx.fill();
        const wg = ctx.createRadialGradient(g.cx, g.cy - g.R * .2 * g.k, 10, g.cx, g.cy, g.R); wg.addColorStop(0, '#7dd3fc'); wg.addColorStop(1, '#0369a1'); ctx.fillStyle = wg; ctx.beginPath(); ctx.ellipse(g.cx, g.cy, g.R, g.R * g.k, 0, 0, TAU); ctx.fill();
        // rings: draw contour circles for crests/troughs of each source
        ctx.save(); ctx.beginPath(); ctx.ellipse(g.cx, g.cy, g.R, g.R * g.k, 0, 0, TAU); ctx.clip();
        const lam = D.LAM * g.R / 300, V = D.V * g.R / 300;
        S.src.forEach(s => { const age = S.t - s.t0, ncyc = s.drip ? 1.2 : 4; for (let n = 0; n < ncyc * 2; n++) { const r = V * age - (n + .25) * lam / 2; if (r <= 1) continue; const crest = n % 2 === 0;
            const a = p.damp !== false ? clamp(1.1 / Math.sqrt(1 + r / 40) * Math.exp(-age / 9), 0, 1) : .9; ctx.globalAlpha = a; ctx.strokeStyle = crest ? '#f0f9ff' : '#075985'; ctx.lineWidth = crest ? 3 : 2.4;
            ctx.beginPath(); ctx.ellipse(g.cx + s.u, g.cy + s.v * g.k, r, r * g.k, 0, 0, TAU); ctx.stroke(); } });
        ctx.globalAlpha = 1; ctx.restore();
        ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(g.cx, g.cy, g.R, g.R * g.k, 0, Math.PI * 1.1, Math.PI * 1.6); ctx.stroke();
      });
      // falling stones / drops
      S.stones.forEach(st => { if (st.done) return; const x = g.cx + st.u, y = g.cy + st.v * g.k - st.z * g.R * .7; if (st.drop) K.raw(ctx, () => { ctx.fillStyle = 'rgba(224,242,254,.95)'; ctx.strokeStyle = '#0284c7'; ctx.beginPath(); ctx.moveTo(x, y - 9); ctx.quadraticCurveTo(x + 6, y, x, y + 5); ctx.quadraticCurveTo(x - 6, y, x, y - 9); ctx.fill(); ctx.stroke(); }); else Q25.stone(ctx, x, y, 9); });
      // floating object
      const ox = g.cx + S.ou * g.R, oy = g.cy + S.ov * g.R * g.k - (S.oy || 0); D.floaty(ctx, p.obj, ox, oy);
      if (p.lab !== false) { K.raw(ctx, () => { ctx.setLineDash([4, 4]); ctx.strokeStyle = '#fef08a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(ox, g.cy + S.ov * g.R * g.k - 22); ctx.lineTo(ox, g.cy + S.ov * g.R * g.k + 22); ctx.stroke(); ctx.setLineDash([]); });
        Q25.T(ctx, OBJ[p.obj] + ': تهتز في مكانها', ox, g.cy + S.ov * g.R * g.k + 36, { s: 11.5, w: 900, c: '#fff', bg: '#a16207' }); }
      if (p.en !== false && S.src.length) { const s = S.src[S.src.length - 1], age = S.t - s.t0, r = Math.min(g.R * .95, D.V * g.R / 300 * age); if (r > 30) { const a = -.35; const x1 = g.cx + s.u + Math.cos(a) * r * .35, y1 = g.cy + (s.v + Math.sin(a) * r * .35) * g.k, x2 = g.cx + s.u + Math.cos(a) * r, y2 = g.cy + (s.v + Math.sin(a) * r) * g.k; K.raw(ctx, () => G.arrow(ctx, x1, y1, x2, y2, '#f97316', 4, 13)); Q25.T(ctx, 'الطاقة تنتقل', (x1 + x2) / 2, (y1 + y2) / 2 - 16, { s: 11.5, w: 900, c: '#fff', bg: '#ea580c' }); } }
      // cross-section
      if (p.sec !== false) { const sw = g.ph ? w - 24 : Math.min(w * .5, 380), sh = 92, sx = g.ph ? 12 : 76, sy = h - sh - (g.ph ? 108 : 64);
        C2.card(ctx, sx, sy, sw, sh, { bd: '#0369a1' }); Q25.T(ctx, 'مقطع جانبي: الدقائق تهتز صعوداً ونزولاً', sx + sw / 2, sy + 12, { s: 11, w: 900, c: '#0369a1' });
        K.raw(ctx, () => { const y0 = sy + 54, us = []; for (let i = 0; i <= 60; i++) { const u = (i / 60 * 2 - 1) * g.R; us.push([sx + 8 + (sw - 16) * i / 60, y0 - D.disp(S, g, u, S.ov * g.R) * 3]); }
          ctx.fillStyle = 'rgba(14,165,233,.35)'; ctx.beginPath(); ctx.moveTo(us[0][0], sy + sh - 6); us.forEach(q => ctx.lineTo(q[0], q[1])); ctx.lineTo(us[60][0], sy + sh - 6); ctx.closePath(); ctx.fill();
          ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 2; ctx.beginPath(); us.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke();
          for (let i = 0; i <= 60; i += 4) { ctx.fillStyle = i === 40 ? '#dc2626' : '#1e3a8a'; ctx.beginPath(); ctx.arc(us[i][0], us[i][1] + 6, i === 40 ? 4 : 2.6, 0, TAU); ctx.fill(); } }); }
      if (p.lab !== false) Q25.card(ctx, S, [{ t: 'اضغط على الماء لترمي حجراً', c: '#0369a1', w: 900 }, { t: 'الموجة تنتقل ← الطاقة تنتقل', c: '#ea580c', w: 900 }, { t: 'الماء (الدقائق) يهتز في مكانه', c: '#1e3a8a', w: 900 }], { title: 'ما الحركة الموجية؟', wd: 250, y: 44 });
    },
    floaty(ctx, k, x, y) { K.raw(ctx, () => { ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.ellipse(x, y + 6, 18, 5, 0, 0, TAU); ctx.fill();
      if (k === 'cork') { const g = ctx.createLinearGradient(x - 14, 0, x + 14, 0); g.addColorStop(0, '#c28f4c'); g.addColorStop(.5, '#f3d7a7'); g.addColorStop(1, '#a8743a'); ctx.fillStyle = g; rr(ctx, x - 14, y - 10, 28, 16, 4); ctx.fill(); ctx.fillStyle = '#e9c48d'; ctx.beginPath(); ctx.ellipse(x, y - 10, 14, 4, 0, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(120,70,20,.4)'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(x - 9 + i * 3.5, y - 3 + (i % 2) * 4, 1, 0, TAU); ctx.fill(); } }
      else if (k === 'leaf') { ctx.fillStyle = '#65a30d'; ctx.beginPath(); ctx.ellipse(x, y, 20, 7, -.2, 0, TAU); ctx.fill(); ctx.strokeStyle = '#3f6212'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x - 20, y + 4); ctx.lineTo(x + 18, y - 3); ctx.stroke(); }
      else { ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.ellipse(x, y - 2, 18, 9, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(x + 11, y - 13, 8, 0, TAU); ctx.fill(); ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.moveTo(x + 18, y - 14); ctx.lineTo(x + 26, y - 11); ctx.lineTo(x + 18, y - 9); ctx.fill(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(x + 13, y - 15, 1.6, 0, TAU); ctx.fill(); } }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); const ox = g.cx + S.ou * g.R, oy = g.cy + S.ov * g.R * g.k;
      return [{ id: 'float', x: ox, y: oy, r: 26, axis: 'xy', keep: true, tip: 'اسحب الجسم الطافي إلى مكان آخر', hint: false,
          drag: (S, d) => { let u = (d.x - g.cx) / g.R, v = (d.y - g.cy) / (g.R * g.k); const m = Math.hypot(u, v); if (m > .88) { u *= .88 / m; v *= .88 / m; } S.ou = u; S.ov = v; } },
        { id: 'water', x: g.cx, y: g.cy, hit: (x, y) => { const u = (x - g.cx) / g.R, v = (y - g.cy) / (g.R * g.k); return u * u + v * v < .92 && Math.hypot(x - ox, y - oy) > 28; }, tip: 'اضغط على الماء لترمي حجراً', idle: 'اضغط هنا لترمي حجراً ✋', hint: true,
          click: (S, x, y) => { D.throwAt(S, x - g.cx, (y - g.cy) / g.k); } }];
    },
    readings(S) { const age = S.src.length ? S.t - S.src[S.src.length - 1].t0 : 0; return [rd('عدد الاضطرابات', S.src.length), rd('الإزاحة الأفقية للفلين', '0 cm (لا ينتقل)'), rd('الإزاحة الرأسية للفلين', Q25.nf((S.oy || 0) / 4, 2, 'cm')), rd('زمن آخر موجة', Q25.nf(age, 2, 's'))]; },
    explain(S) { return 'عند سقوط الحجر يحدث <b>اضطراب</b> في الماء. هذا الاضطراب ينتقل بشكل دوائر متحدة المركز في جميع الاتجاهات. انظر إلى ' + OBJ[S.p.obj] + ': <b>تصعد وتنزل في مكانها</b> ولا تذهب إلى حافة البركة، لأن الموجة تنقل <b>الطاقة</b> وليس <b>الماء</b>.' + (S.p.damp !== false ? ' لاحظ أن السعة <b>تقل</b> كلما ابتعدت الدوائر (التفكير الناقد 2).' : ''); }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'في الملعب يقف المشجعون ويجلسون بالتتابع فتنتقل «موجة» حول المدرجات، وكل مشجع يبقى في مقعده!';
})();
/* =========================================================================================
   2-a) الدرس 1 (ص 58، شكل 1): المفاهيم الخاصة بالحركة الموجية — λ، f، T، السعة، v = λ f
   ========================================================================================= */
Q25.rope = (ctx, pts, o = {}) => K.raw(ctx, () => { ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const path = () => { ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); };
  ctx.strokeStyle = o.dark || '#78350f'; ctx.lineWidth = (o.w || 7) + 2; path(); ctx.stroke(); ctx.strokeStyle = o.c || '#d97706'; ctx.lineWidth = o.w || 7; path(); ctx.stroke();
  ctx.strokeStyle = 'rgba(120,53,15,.55)'; ctx.lineWidth = 1.6; ctx.setLineDash([3, 5]); path(); ctx.stroke(); ctx.setLineDash([]); });
/* displacement of a rope fed at x=0 by a source history (pairs [t, y]); returns y at distance xm (m) at time t */
Q25.hist = (H, t) => { if (!H.length || t < H[0][0]) return 0; let lo = 0, hi = H.length - 1; if (t >= H[hi][0]) return H[hi][1]; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (H[m][0] <= t) lo = m; else hi = m; } const a = H[lo], b = H[hi]; return a[1] + (b[1] - a[1]) * (t - a[0]) / ((b[0] - a[0]) || 1); };
(() => {
  const LM = 4; // rope length shown (m)
  const D = { id: 'g8_w_concepts', page: 58, fig: 'شكل 1 ص 58',
    desc: 'نحرّك طرف حبل طويل إلى الأعلى والأسفل فتنتشر فيه موجة. نتعرف على: الطول الموجي λ، التردد f (Hz)، مدة الذبذبة T (s)، سعة الاهتزاز، وسرعة الموجة v = λ f.',
    tags: 'الطول الموجي التردد هيرتز مدة الذبذبة سعة الاهتزاز سرعة الموجة شكل 1 قمة قعر حبل',
    tools: ['حبل طويل', 'ساعة توقيت', 'مسطرة مترية'],
    steps: ['شغّل اليد (أو اسحبها أنت إلى الأعلى والأسفل) لتولد موجة في الحبل.', 'الطول الموجي λ: أقصر بعد بين نقطتين متتاليتين مهتزتين بكيفية واحدة (مثلاً بين قمتين متتاليتين). فعّل «الطول الموجي» لتراه.', 'التردد f: عدد الذبذبات التي يولدها الجسم المهتز خلال وحدة الزمن. اضغط «عدّ الذبذبات» وانتظر: العداد يحسب f = عدد الذبذبات ÷ الزمن.', 'مدة الذبذبة T: الزمن اللازم لذبذبة واحدة. انظر منحني الخرزة الحمراء مع الزمن (مثل شكل 1).', 'سعة الاهتزاز: أقصى إزاحة عن موضع الاستقرار. غيّر السعة A ولاحظ.', 'غيّر التردد f: كيف يتغير الطول الموجي λ؟ تحقق أن v = λ f ثابتة في الحبل نفسه. سجّل القراءات.', 'مثال الكتاب: جسم يهتز 20 ذبذبة خلال ثانية ⟸ تردده 20 Hz (اضغط «مثال الكتاب»).'],
    concl: ['الطول الموجي λ: أقصر بعد بين نقطتين متتاليتين مهتزتين بكيفية واحدة (بين قمتين أو قعرين متتاليين).', 'التردد f بوحدة ذبذبة/ثانية (هيرتز Hz): جسم يهتز 20 ذبذبة خلال ثانية تردده 20 Hz.', 'مدة الذبذبة T: الزمن الذي يستغرقه الجسم المهتز ليكمل ذبذبة واحدة، وتقاس بالثانية (s).', 'سعة الاهتزاز: أقصى إزاحة للجسم المهتز عن موضع استقراره.', 'سرعة الموجة v: الإزاحة التي تقطعها الموجة في الثانية الواحدة، v = λ f. في الوسط نفسه: كلما زاد التردد قلّ الطول الموجي.'],
    laws: ['g8_wconc', 'g8_vlf', 'g8_wave'],
    controls: [R('f', 'التردد f', .25, 20, 1, .25, 'Hz'), R('A', 'سعة الاهتزاز', 5, 40, 20, 1, 'cm'), R('v', 'سرعة الموجة في الحبل v', .5, 4, 2, .1, 'm/s'),
      BT('', [{ t: '⏱ عدّ الذبذبات', on: S => { S.cnt = 0; S.ct = 0; S.counting = 1; } }, { t: '📘 مثال الكتاب: 20 Hz', on: S => { setParam(S, 'f', 20); setParam(S, 'v', 4); S.cnt = 0; S.ct = 0; S.counting = 1; } }, { t: '↺ حبل ساكن', on: S => { S.hs = []; S.ts = 0; S.cnt = 0; S.ct = 0; S.counting = 0; S.yt = []; } }]),
      TG('auto', 'اليد تهتز تلقائياً', true, null, 'wave'), TG('lam', 'الطول الموجي λ', true, null, 'vector'), TG('amp', 'السعة + القمة والقعر', true, null, 'labels'), TG('bead', 'الخرزة الحمراء ومنحناها مع الزمن', true, null, 'graph'), TG('dir', 'اتجاه انتشار الموجة', true, null, 'velocity')],
    setup(S) { S.hs = []; S.ts = 0; S.ph = 0; S.cnt = 0; S.ct = 0; S.counting = 0; S.yt = []; S.hy = 0; S.prevY = 0; },
    slow(S) { return S.p.f > 4 ? 4 / S.p.f * .5 : 1; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 64 : 150, x1 = w - 20, pxm = (x1 - x0) / LM, y0 = h * (ph ? .58 : .55); return { w, h, ph, x0, x1, pxm, y0 }; },
    update(S, dt) { const p = S.p, k = D.slow(S), d = dt * k; S.ts += d;
      if (p.auto !== false && !S.hold) { S.ph += TAU * p.f * d; S.hy = p.A / 100 * Math.sin(S.ph); }
      S.hs.push([S.ts, S.hy]); const keep = LM / p.v + 1; while (S.hs.length > 2 && S.hs[0][0] < S.ts - keep - 2) S.hs.shift();
      if (S.counting) { S.ct += d; if (S.prevY < 0 && S.hy >= 0) S.cnt++; if (S.ct >= 1) { S.counting = 0; S.ctDone = S.cnt; } }
      S.prevY = S.hy;
      const yb = Q25.hist(S.hs, S.ts - 1.5 / p.v); S.yt.push([S.ts, yb]); while (S.yt.length && S.yt[0][0] < S.ts - 3 / Math.max(p.f, .5)) S.yt.shift(); },
    yAt(S, xm) { return Q25.hist(S.hs, S.ts - xm / S.p.v); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, lam = p.v / p.f; K.bg(ctx, w, h, { benchY: h * .92 });
      Q25.banner(ctx, w, D.slow(S) < 1 ? 'عرض بطيء ×' + Q25.nf(D.slow(S), 2) + ' — التردد كبير' : 'شكل (1): موجة في حبل — اسحب اليد أو شغّلها تلقائياً', '#0d9488', 20);
      // wall post at the right
      K.raw(ctx, () => { ctx.fillStyle = '#a8a29e'; ctx.fillRect(g.x1 + 4, g.y0 - 80, 10, 160); });
      // axis (equilibrium)
      K.raw(ctx, () => { ctx.setLineDash([6, 5]); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(g.x0, g.y0); ctx.lineTo(g.x1, g.y0); ctx.stroke(); ctx.setLineDash([]); });
      const N = 160, pts = []; for (let i = 0; i <= N; i++) { const xm = LM * i / N; pts.push([g.x0 + xm * g.pxm, g.y0 - D.yAt(S, xm) * g.pxm]); }
      Q25.rope(ctx, pts, {});
      // crest/trough markers + amplitude + lambda (from the drawn curve)
      const cr = [], tr = []; for (let i = 1; i < N; i++) { const a = pts[i - 1][1], b = pts[i][1], c = pts[i + 1][1]; if (b < a && b <= c && g.y0 - b > 4) cr.push(pts[i]); if (b > a && b >= c && b - g.y0 > 4) tr.push(pts[i]); }
      if (p.amp !== false) { if (cr[0]) { Q25.T(ctx, 'قمة', cr[0][0], cr[0][1] - 18, { s: 12, w: 900, c: '#fff', bg: '#16a34a' }); K.raw(ctx, () => G.arrow(ctx, cr[0][0] + 16, g.y0, cr[0][0] + 16, cr[0][1] + 2, '#7c3aed', 2.5, 8)); Q25.T(ctx, 'السعة ' + p.A + ' cm', cr[0][0] + 58, (g.y0 + cr[0][1]) / 2, { s: 11.5, w: 900, c: '#fff', bg: '#7c3aed' }); }
        if (tr[0]) Q25.T(ctx, 'قعر', tr[0][0], tr[0][1] + 20, { s: 12, w: 900, c: '#fff', bg: '#b91c1c' }); }
      if (p.lam !== false && cr.length >= 2) { const a = cr[0], b = cr[1], yy = Math.min(a[1], b[1]) - 40; K.raw(ctx, () => { ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 1.2; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(a[0], yy); ctx.moveTo(b[0], b[1]); ctx.lineTo(b[0], yy); ctx.stroke(); ctx.setLineDash([]); G.arrow(ctx, (a[0] + b[0]) / 2, yy, a[0], yy, '#0369a1', 2.5, 8); G.arrow(ctx, (a[0] + b[0]) / 2, yy, b[0], yy, '#0369a1', 2.5, 8); });
        Q25.T(ctx, 'الطول الموجي λ = ' + Q25.nf(lam, 3) + ' m', (a[0] + b[0]) / 2, yy - 14, { s: 12, w: 900, c: '#fff', bg: '#0369a1' }); }
      if (p.dir !== false) { const yy = g.y0 + p.A / 100 * g.pxm + 46; K.raw(ctx, () => G.arrow(ctx, g.x0 + 40, yy, g.x0 + 220, yy, '#ea580c', 3.5, 12)); Q25.T(ctx, 'اتجاه انتشار الموجة: v = ' + Q25.nf(p.v, 2) + ' m/s', g.x0 + 130, yy + 18, { s: 11.5, w: 900, c: '#c2410c' }); }
      // ruler under the rope
      K.raw(ctx, () => { const yy = h * .92 - 18; ctx.fillStyle = '#fde68a'; ctx.fillRect(g.x0, yy, g.x1 - g.x0, 14); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1; for (let m = 0; m <= LM * 10; m++) { const x = g.x0 + m / 10 * g.pxm; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x, yy + (m % 10 ? 4 : 10)); ctx.stroke(); } });
      for (let m = 0; m <= LM; m++) Q25.T(ctx, m + ' m', g.x0 + m * g.pxm, h * .92 + 8, { s: 10, w: 800, c: '#451a03' });
      // bead
      if (p.bead !== false) { const xb = g.x0 + 1.5 * g.pxm, yb = g.y0 - D.yAt(S, 1.5) * g.pxm; K.raw(ctx, () => { ctx.setLineDash([3, 3]); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(xb, g.y0 - p.A / 100 * g.pxm - 8); ctx.lineTo(xb, g.y0 + p.A / 100 * g.pxm + 8); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#dc2626'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(xb, yb, 8, 0, TAU); ctx.fill(); ctx.stroke(); });
        // displacement-time graph (like fig 1)
        const gw = g.ph ? w - 24 : Math.min(300, w * .38), gh = g.ph ? 92 : 120, gx = g.ph ? 12 : 76, gy = 44; C2.card(ctx, gx, gy, gw, gh, { bd: '#dc2626' });
        K.raw(ctx, () => { const ax = gx + 26, ay = gy + gh / 2 + 6, aw = gw - 40, A0 = (gh / 2 - 18); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(ax, gy + 20); ctx.lineTo(ax, gy + gh - 6); ctx.moveTo(ax, ay); ctx.lineTo(ax + aw, ay); ctx.stroke();
          const span = 3 / Math.max(p.f, .5); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2; ctx.beginPath(); S.yt.forEach((q, i) => { const X = ax + aw * (1 - (S.ts - q[0]) / span), Y = ay - q[1] / .4 * A0 * 1.0; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke();
          const T = 1 / p.f, x2 = ax + aw - aw * T / span; ctx.strokeStyle = '#0d9488'; G.arrow(ctx, (ax + aw + x2) / 2, gy + gh - 12, x2, gy + gh - 12, '#0d9488', 1.8, 6); G.arrow(ctx, (ax + aw + x2) / 2, gy + gh - 12, ax + aw, gy + gh - 12, '#0d9488', 1.8, 6); });
        Q25.T(ctx, 'إزاحة الخرزة مع الزمن (شكل 1)', gx + gw / 2, gy + 12, { s: 11, w: 900, c: '#b91c1c' }); Q25.T(ctx, 'T = ' + Q25.nf(1 / p.f, 3) + ' s', gx + gw - 60, gy + gh - 24, { s: 10.5, w: 900, c: '#0f766e' }); Q25.T(ctx, 'الزمن', gx + gw - 18, gy + gh / 2 + 18, { s: 9.5, w: 800, c: '#475569' }); }
      // hand (source)
      const hy = g.y0 - S.hy * g.pxm; Q25.fist(ctx, g.x0 - 6, hy, .9, { sleeve: '#2563eb', flip: true });
      if (p.auto !== false) K.raw(ctx, () => { G.arrow(ctx, g.x0 - 34, g.y0 - 6, g.x0 - 34, g.y0 - p.A / 100 * g.pxm - 14, '#dc2626', 2.5, 8); G.arrow(ctx, g.x0 - 34, g.y0 + 6, g.x0 - 34, g.y0 + p.A / 100 * g.pxm + 14, '#dc2626', 2.5, 8); });
      // card
      const cnt = S.counting ? 'جارٍ العد… ' + S.cnt + ' ذبذبة خلال ' + Q25.nf(S.ct, 2) + ' s' : (S.ctDone != null ? S.ctDone + ' ذبذبة خلال 1 s ⟸ f = ' + S.ctDone + ' Hz' : 'اضغط «عدّ الذبذبات»');
      Q25.card(ctx, S, [{ t: 'f = ' + Q25.nf(p.f, 3) + ' Hz ، T = 1 ÷ f = ' + Q25.nf(1 / p.f, 3) + ' s', c: '#0f766e', w: 900 }, { t: 'λ = ' + Q25.nf(lam, 3) + ' m ، السعة = ' + p.A + ' cm', c: '#0369a1', w: 900 }, { t: 'v = λ × f = ' + Q25.nf(lam, 3) + ' × ' + Q25.nf(p.f, 3) + ' = ' + Q25.nf(p.v, 3) + ' m/s', c: '#c2410c', w: 900 }, { t: cnt, c: '#7c3aed', w: 800 }], { title: 'مفاهيم الحركة الموجية', wd: 320, y: g.ph ? 146 : 44 });
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'hand', x: g.x0 - 20, y: g.y0 - S.hy * g.pxm, r: 34, axis: 'y', keep: true, tip: 'اسحب اليد إلى الأعلى والأسفل لتولد موجة', idle: 'حرّكني صعوداً ونزولاً ✋',
      down: S => { S.hold = 1; }, drag: (S, d) => { S.hy = clamp((g.y0 - d.y) / g.pxm, -.45, .45); }, up: S => { S.hold = 0; S.ph = Math.asin(clamp(S.hy / (S.p.A / 100), -1, 1)); } }]; },
    readings(S) { const p = S.p; return [rd('التردد f', Q25.nf(p.f, 3) + ' Hz'), rd('مدة الذبذبة T', Q25.nf(1 / p.f, 3) + ' s'), rd('الطول الموجي λ', Q25.nf(p.v / p.f, 3) + ' m'), rd('سعة الاهتزاز', p.A + ' cm'), rd('سرعة الموجة v = λ f', Q25.nf(p.v, 3) + ' m/s'), rd('عدد الذبذبات المعدودة', S.counting ? S.cnt + ' …' : (S.ctDone ?? '—'))]; },
    record(S) { const p = S.p; return { f: p.f, T: +(1 / p.f).toFixed(3), l: +(p.v / p.f).toFixed(3), A: p.A, v: p.v }; },
    cols: [['f', 'f (Hz)'], ['T', 'T (s)'], ['l', 'λ (m)'], ['A', 'السعة (cm)'], ['v', 'v (m/s)']],
    graph: { x: 'f', y: 'l', xl: 'التردد f (Hz)', yl: 'الطول الموجي λ (m)', theory: (x, S) => S.p.v / x },
    explain(S) { const p = S.p; return 'اليد تهتز <b>' + Q25.nf(p.f, 3) + '</b> ذبذبة في الثانية، فالتردد <b>f = ' + Q25.nf(p.f, 3) + ' Hz</b> وكل ذبذبة تستغرق <b>T = ' + Q25.nf(1 / p.f, 3) + ' s</b>. خلال ذبذبة واحدة تتقدم الموجة مسافة طول موجي واحد <b>λ = ' + Q25.nf(p.v / p.f, 3) + ' m</b>، لذلك <b>v = λ f</b>. إذا أسرعت اليد (زاد f) تتقارب القمم (يقل λ) لأن سرعة الموجة في الحبل نفسه لا تتغير.'; }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'جناحا البعوضة يهتزان مئات المرات في الثانية (تردد كبير) لذلك نسمع طنينها، أما الأرجوحة فتهتز ببطء (تردد صغير).';
})();
/* =========================================================================================
   2-b) مقارنة على الحبل نفسه: نفس λ وسعة مختلفة (التفكير الناقد 1 ص 61)، تردد مختلف، وسط مختلف
   ========================================================================================= */
(() => {
  const MODES = { amp: { n: 'نفس λ وسعة مختلفة (التفكير الناقد 1)', A1: 30, A2: 12, f1: 1, f2: 1, v1: 2, v2: 2 }, freq: { n: 'تردد مختلف في الوسط نفسه', A1: 20, A2: 20, f1: 1, f2: 2, v1: 2, v2: 2 }, med: { n: 'التردد نفسه في وسطين مختلفين', A1: 20, A2: 20, f1: 1, f2: 1, v1: 2, v2: 1 } };
  const D = { id: 'g8_w_compare', page: 61, fig: 'التفكير الناقد 1 ص 61',
    desc: 'نرسم موجتين مستعرضتين على حبلين فوق بعضهما ونقارن: موجتان متساويتان بالطول الموجي ومختلفتان بالسعة، ثم موجتان بترددين مختلفين في الوسط نفسه، ثم التردد نفسه في وسطين مختلفين.',
    tags: 'مقارنة سعة طول موجي تردد سرعة موجتان مستعرضة التفكير الناقد',
    tools: ['حبلان متماثلان', 'مسطرة مترية'],
    steps: ['اختر المقارنة: «نفس λ وسعة مختلفة» (التفكير الناقد 1: ارسم موجات مستعرضة متساوية بالطول الموجي ومختلفة بالسعة).', 'اسحب قمة أي موجة إلى الأعلى أو الأسفل لتغيّر سعتها، واسحب علامة λ أفقياً لتغيّر طولها الموجي.', 'في «تردد مختلف في الوسط نفسه»: ضاعف تردد الموجة الثانية. ماذا يحدث لطولها الموجي؟ وهل تغيرت السرعة؟', 'في «التردد نفسه في وسطين مختلفين»: الموجة الثانية أبطأ. قارن الطولين الموجيين.'],
    concl: ['السعة والطول الموجي صفتان مستقلتان: يمكن أن تتساوى موجتان في λ وتختلفا في السعة (الأعلى سعة تحمل طاقة أكبر).', 'في الوسط نفسه سرعة الموجة ثابتة، فإذا تضاعف التردد يقل الطول الموجي إلى النصف (v = λ f).', 'عند التردد نفسه: الموجة في الوسط الأبطأ يكون طولها الموجي أقصر.'],
    laws: ['g8_vlf', 'g8_wconc'],
    controls: [SEL('mode', 'المقارنة', Object.keys(MODES).map(k => [k, MODES[k].n]), 'amp', (v, S) => D.preset(S)),
      R('A1', 'سعة الموجة 1', 5, 40, 30, 1, 'cm'), R('A2', 'سعة الموجة 2', 5, 40, 12, 1, 'cm'), R('f1', 'تردد الموجة 1', .25, 3, 1, .25, 'Hz'), R('f2', 'تردد الموجة 2', .25, 3, 1, .25, 'Hz'), R('v1', 'سرعة الموجة 1', .5, 3, 2, .1, 'm/s'), R('v2', 'سرعة الموجة 2', .5, 3, 2, .1, 'm/s'),
      TG('lam', 'الطول الموجي λ', true, null, 'vector'), TG('amp', 'السعة', true, null, 'labels'), TG('en', 'مقارنة الطاقة (السعة)', true, null, 'energy')],
    setup(S) { S.tt = 0; D.preset(S); },
    preset(S) { const m = MODES[S.p.mode] || MODES.amp; ['A1', 'A2', 'f1', 'f2', 'v1', 'v2'].forEach(k => setParam(S, k, m[k], false)); },
    update(S, dt) { S.tt += dt; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 24 : 96, x1 = w - 24, pxm = (x1 - x0) / 4, ys = [h * (ph ? .36 : .36), h * (ph ? .66 : .7)]; return { w, h, ph, x0, x1, pxm, ys }; },
    wave(S, i) { const p = S.p, A = p['A' + i], f = p['f' + i], v = p['v' + i]; return { A, f, v, lam: v / f }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { benchY: h * .95, bench: false });
      Q25.banner(ctx, w, 'اسحب القمة لتغيّر السعة، واسحب علامة λ لتغيّر الطول الموجي ✋', '#0d9488', 20);
      [1, 2].forEach(i => { const W0 = D.wave(S, i), y0 = g.ys[i - 1], col = i === 1 ? '#d97706' : '#2563eb';
        K.raw(ctx, () => { ctx.setLineDash([6, 5]); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(g.x0, y0); ctx.lineTo(g.x1, y0); ctx.stroke(); ctx.setLineDash([]); });
        const pts = []; for (let k = 0; k <= 200; k++) { const xm = 4 * k / 200; pts.push([g.x0 + xm * g.pxm, y0 - W0.A / 100 * g.pxm * Math.sin(TAU * (W0.f * S.tt - xm / W0.lam))]); }
        Q25.rope(ctx, pts, { c: col, dark: shade(col, -45), w: 6 });
        Q25.T(ctx, 'الموجة ' + i, g.x0 + 34, y0 - 70, { s: 12.5, w: 900, c: '#fff', bg: col });
        const lp = W0.lam * g.pxm, xc = g.x0 + 0.5 * g.pxm; // λ bracket anchored at x = 2.4 m
        if (p.lam !== false) { const yy = y0 + 0.4 * g.pxm + 18; K.raw(ctx, () => { G.arrow(ctx, xc + lp / 2, yy, xc, yy, col, 2.5, 8); G.arrow(ctx, xc + lp / 2, yy, xc + lp, yy, col, 2.5, 8); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(xc + lp, yy, 8, 0, TAU); ctx.fill(); }); Q25.T(ctx, 'λ' + (i === 1 ? '₁' : '₂') + ' = ' + Q25.nf(W0.lam, 3) + ' m', xc + lp / 2, yy + 16, { s: 11.5, w: 900, c: col }); }
        if (p.amp !== false) { const xa = g.x0 + 12; K.raw(ctx, () => G.arrow(ctx, xa, y0, xa, y0 - W0.A / 100 * g.pxm, '#7c3aed', 2.5, 8)); Q25.T(ctx, 'السعة ' + W0.A + ' cm', xa + 44, y0 + 14, { s: 11, w: 900, c: '#6d28d9' }); }
        Q25.T(ctx, 'v' + (i === 1 ? '₁' : '₂') + ' = λ × f = ' + Q25.nf(W0.lam, 3) + ' × ' + Q25.nf(W0.f, 3) + ' = ' + Q25.nf(W0.v, 3) + ' m/s', g.x1 - (g.ph ? 140 : 170), y0 - 0.4 * g.pxm - 22, { s: g.ph ? 10.5 : 12, w: 900, c: '#fff', bg: shade(col, -10) });
      });
      if (p.en !== false) { const a = D.wave(S, 1).A, b = D.wave(S, 2).A; const t = Math.abs(a - b) < .5 ? 'السعتان متساويتان ⟸ الطاقة متساوية' : 'الموجة ' + (a > b ? 1 : 2) + ' سعتها أكبر ⟸ تحمل طاقة أكبر'; Q25.T(ctx, t, Q25.cx(w), (g.ys[0] + g.ys[1]) / 2, { s: 12.5, w: 900, c: '#fff', bg: '#ea580c' }); }
      const m = D.wave(S, 1), n = D.wave(S, 2);
      const L = S.p.mode === 'amp' ? ['λ₁ = ' + Q25.nf(m.lam, 3) + ' m ، λ₂ = ' + Q25.nf(n.lam, 3) + ' m', 'السعة: ' + m.A + ' cm مقابل ' + n.A + ' cm'] : S.p.mode === 'freq' ? ['f₂ ÷ f₁ = ' + Q25.nf(n.f / m.f, 3) + ' ⟸ λ₂ ÷ λ₁ = ' + Q25.nf(n.lam / m.lam, 3), 'السرعة واحدة لأن الوسط واحد'] : ['v₂ ÷ v₁ = ' + Q25.nf(n.v / m.v, 3) + ' ⟸ λ₂ ÷ λ₁ = ' + Q25.nf(n.lam / m.lam, 3), 'التردد نفسه، والوسط مختلف'];
      Q25.card(ctx, S, L.map(t => ({ t, c: '#0f766e', w: 900 })), { title: MODES[S.p.mode].n, wd: 330, y: g.ph ? 44 : 44 });
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S), out = [];
      [1, 2].forEach(i => { const W0 = D.wave(S, i), y0 = g.ys[i - 1], xc = g.x0 + 0.5 * g.pxm, lp = W0.lam * g.pxm;
        // crest nearest to x = 1 m
        let best = null; for (let k = 0; k <= 200; k++) { const xm = 4 * k / 200, s = Math.sin(TAU * (W0.f * S.tt - xm / W0.lam)); if (s > .995 && xm > .3 && xm < 2.2) { best = xm; break; } }
        const xm = best ?? .8, cy = y0 - W0.A / 100 * g.pxm * Math.sin(TAU * (W0.f * S.tt - xm / W0.lam));
        out.push({ id: 'crest' + i, x: g.x0 + xm * g.pxm, y: cy, r: 24, axis: 'y', keep: true, tip: 'اسحب القمة لتغيّر السعة', idle: i === 1 ? 'اسحب القمة ✋' : undefined, hint: i === 1, drag: (S, d) => setParam(S, 'A' + i, Math.round(clamp((y0 - d.y) / g.pxm * 100, 5, 40))) });
        out.push({ id: 'lam' + i, x: xc + lp, y: y0 + 0.4 * g.pxm + 18, r: 20, axis: 'x', keep: true, tip: 'اسحب لتغيّر الطول الموجي (يتغير التردد لأن السرعة ثابتة في الوسط)', hint: false, drag: (S, d) => { const lam = clamp((d.x - xc) / g.pxm, .3, 3.4); setParam(S, 'f' + i, clamp(S.p['v' + i] / lam, .25, 3)); } }); });
      return out; },
    readings(S) { const a = D.wave(S, 1), b = D.wave(S, 2); return [rd('λ₁', Q25.nf(a.lam, 3) + ' m'), rd('λ₂', Q25.nf(b.lam, 3) + ' m'), rd('السعة 1 / 2', a.A + ' / ' + b.A + ' cm'), rd('f₁ / f₂', Q25.nf(a.f, 3) + ' / ' + Q25.nf(b.f, 3) + ' Hz'), rd('v₁ / v₂', Q25.nf(a.v, 3) + ' / ' + Q25.nf(b.v, 3) + ' m/s')]; },
    explain(S) { const m = S.p.mode; if (m === 'amp') return 'الموجتان لهما <b>الطول الموجي نفسه</b> لكن <b>السعة مختلفة</b>: الحبل الأول يُهزّ إلى ارتفاع أكبر. السعة الأكبر تعني أن الموجة تحمل <b>طاقة أكبر</b>، أما المسافة بين قمتين فلا تتغير.';
      if (m === 'freq') return 'في الحبل نفسه تسير الموجتان <b>بالسرعة نفسها</b>. الموجة الثانية ترددها أكبر فتتقارب قممها: <b>λ أقصر</b>. من v = λ f: إذا تضاعف f يقل λ إلى النصف.'; return 'التردد نفسه، لكن الوسط الثاني <b>أبطأ</b>، فتقطع الموجة فيه مسافة أقل خلال ذبذبة واحدة: <b>λ أقصر</b>.'; }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'موج البحر في يوم عاصف له سعة كبيرة (أمواج عالية) ويحمل طاقة تكفي لتحطيم الصخور، أما في يوم هادئ فسعته صغيرة.';
})();
/* =========================================================================================
   3-a) ص 59 شكل 2 و 3 + س6 ص 69: الموجة الطولية والمستعرضة على النابض نفسه (مقارنة)
   ========================================================================================= */
/* slinky: coil centres pts [[x,y]], radius R (vertical ellipse), axis horizontal; mark = index of red coil */
Q25.slinky = (ctx, pts, R, mark = -1) => K.raw(ctx, () => { ctx.lineWidth = 1.6;
  pts.forEach((q, i) => { ctx.strokeStyle = '#6b7280'; ctx.beginPath(); ctx.ellipse(q[0] + 1.5, q[1], 3.2, R, 0, -Math.PI / 2, Math.PI / 2, true); ctx.stroke(); });
  pts.forEach((q, i) => { const m = i === mark; ctx.strokeStyle = m ? '#dc2626' : '#d1d5db'; ctx.lineWidth = m ? 3 : 2; ctx.beginPath(); ctx.ellipse(q[0], q[1], 3.2, R, 0, -Math.PI / 2, Math.PI / 2); ctx.stroke(); if (!m) { ctx.strokeStyle = 'rgba(55,65,81,.6)'; ctx.lineWidth = .8; ctx.beginPath(); ctx.ellipse(q[0] + .8, q[1], 3.4, R, 0, -Math.PI / 2, Math.PI / 2); ctx.stroke(); } }); });
(() => {
  const NC = 64, LEN = 3; // coils, slinky length (m)
  const D = { id: 'g8_w_slinky', page: 59, fig: 'شكل 2 و 3 ص 59 + س6 ص 69',
    desc: 'على النابض (السلنكي) نفسه: إذا حرّكنا طرفه إلى الأمام والخلف باتجاه طوله تتولد موجة طولية تنتشر بشكل تضاغطات وتخلخلات (شكل 2)، وإذا حرّكناه إلى الأعلى والأسفل تتولد موجة مستعرضة تنتشر بشكل قمم وقعور (شكل 3).',
    tags: 'موجة طولية مستعرضة تضاغط تخلخل قمة قعر نابض سلنكي شكل 2 شكل 3 مقارنة اتجاه الاهتزاز اتجاه الانتشار',
    tools: ['نابض حلزوني طويل (سلنكي)'],
    steps: ['اختر نوع الحركة: «طولية» (اليد تكبس وتسحب النابض) أو «مستعرضة» (اليد تتحرك للأعلى والأسفل) أو «قارن الاثنين» كما في سؤال س6.', 'اسحب اليد بنفسك أو اترك «اليد تهتز تلقائياً». يمكنك إرسال نبضة واحدة.', 'راقب الحلقة الحمراء: في الطولية تهتز موازية لاتجاه انتشار الموجة، وفي المستعرضة تهتز عمودية عليه.', 'حدّد التضاغط والتخلخل في الطولية، والقمة والقعر في المستعرضة.', 'س6: ما نوع كل موجة؟ صف اهتزاز جزيئات الوسط لكل منهما، واذكر أمثلة لكل منهما.'],
    concl: ['الموجة الطولية: تسبب اهتزاز دقائق الوسط الناقل باتجاه موازٍ لاتجاه انتشار الموجة بشكل سلسلة من التضاغطات والتخلخلات (موجات الصوت، الموجات الزلزالية).', 'الموجة المستعرضة: تسبب اهتزاز دقائق الوسط الناقل بشكل عمودي على اتجاه انتشار الموجة، وتنتقل بشكل قمم وقعور (الموجات المتولدة في الأوتار المهتزة).', 'في النوعين تهتز الحلقة الحمراء حول موضعها ولا تنتقل مع الموجة.'],
    laws: ['g8_wtypes', 'g8_wave'],
    controls: [SEL('type', 'نوع الحركة', [['long', 'طولية (شكل 2)'], ['trans', 'مستعرضة (شكل 3)'], ['both', 'قارن الاثنين (س6)']], 'both'),
      R('f', 'تردد اليد f', .3, 2.5, 1, .1, 'Hz'), R('A', 'سعة حركة اليد', 4, 20, 12, 1, 'cm'),
      BT('', [{ t: '〰 نبضة واحدة', on: S => { S.pulse = S.ts; S.pp = 0; } }, { t: '↺ نابض ساكن', on: S => { S.hs = []; S.pulse = -9; } }]),
      TG('auto', 'اليد تهتز تلقائياً', true, null, 'wave'), TG('mk', 'الحلقة الحمراء واتجاه اهتزازها', true, null, 'dot'), TG('lab', 'التضاغط والتخلخل / القمة والقعر', true, null, 'labels'), TG('dir', 'خط انتشار الموجة', true, null, 'velocity'), TG('lam', 'الطول الموجي', false, null, 'vector')],
    setup(S) { S.hs = []; S.ts = 0; S.ph = 0; S.hy = 0; S.pulse = -9; },
    V: 1.2,
    update(S, dt) { const p = S.p; S.ts += dt;
      if (!S.hold) { if (S.ts - S.pulse < 1 / p.f) { S.hy = p.A / 100 * Math.sin(TAU * p.f * (S.ts - S.pulse)); } else if (p.auto !== false && S.ts - S.pulse > 1 / p.f) { S.ph += TAU * p.f * dt; S.hy = p.A / 100 * Math.sin(S.ph); } else S.hy *= Math.exp(-dt * 8); }
      S.hs.push([S.ts, S.hy]); while (S.hs.length > 2 && S.hs[0][0] < S.ts - LEN / D.V - 2) S.hs.shift(); },
    u(S, xm) { return Q25.hist(S.hs, S.ts - xm / D.V); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 58 : 150, x1 = w - 30, pxm = (x1 - x0) / LEN; const both = S.p.type === 'both'; const rows = both ? [{ t: 'long', y: h * .38 }, { t: 'trans', y: h * .7 }] : [{ t: S.p.type, y: h * .55 }]; return { w, h, ph, x0, x1, pxm, rows, R: ph ? 16 : 22 }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, mark = 22; K.bg(ctx, w, h, { benchY: h * .93 });
      Q25.banner(ctx, w, p.type === 'both' ? 'النابض نفسه: طولية (أ) ومستعرضة (ب) — اسحب اليد ✋' : 'اسحب اليد ' + (p.type === 'long' ? 'إلى الأمام والخلف' : 'إلى الأعلى والأسفل') + ' ✋', '#0d9488', 20);
      g.rows.forEach((r, ri) => { const L = r.t === 'long'; const pts = []; for (let i = 0; i < NC; i++) { const xm = LEN * i / (NC - 1), d = D.u(S, xm) * g.pxm; pts.push(L ? [g.x0 + xm * g.pxm + d * (1 - xm / LEN * .0), r.y] : [g.x0 + xm * g.pxm, r.y - d]); }
        // fixed end post
        K.raw(ctx, () => { ctx.fillStyle = '#78716c'; ctx.fillRect(g.x1 + 6, r.y - g.R - 16, 10, 2 * g.R + 32); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(g.x1 + 4, r.y, 4, 0, TAU); ctx.fill(); });
        Q25.slinky(ctx, pts, g.R, p.mk !== false ? mark : -1);
        if (p.type === 'both') Q25.T(ctx, ri === 0 ? '(أ) موجة طولية' : '(ب) موجة مستعرضة', g.x0 + 60, r.y - g.R - 30, { s: 12.5, w: 900, c: '#fff', bg: ri === 0 ? '#7c3aed' : '#0369a1' });
        // hand
        const hx = pts[0][0] - 6, hy = pts[0][1]; Q25.fist(ctx, hx - 2, hy, .85, { sleeve: '#2563eb', flip: true });
        if (p.auto !== false) K.raw(ctx, () => { if (L) { G.arrow(ctx, g.x0 - 20, r.y + g.R + 18, g.x0 - 60, r.y + g.R + 18, '#dc2626', 2.5, 8); G.arrow(ctx, g.x0 - 40, r.y + g.R + 18, g.x0 + 4, r.y + g.R + 18, '#dc2626', 2.5, 8); } else { G.arrow(ctx, g.x0 - 30, r.y - 4, g.x0 - 30, r.y - g.R - 24, '#dc2626', 2.5, 8); G.arrow(ctx, g.x0 - 30, r.y + 4, g.x0 - 30, r.y + g.R + 24, '#dc2626', 2.5, 8); } });
        if (p.type !== 'both' || ri === 1) Q25.T(ctx, 'اتجاه الحركة', g.x0 - 30, r.y + (L ? g.R + 36 : -g.R - 36), { s: 10.5, w: 900, c: '#b91c1c' });
        if (p.dir !== false) { const yy = r.y - g.R - (p.type === 'both' ? 12 : 30); K.raw(ctx, () => G.arrow(ctx, g.x1 - 220, yy, g.x1 - 40, yy, '#ea580c', 3, 11)); Q25.T(ctx, 'خط انتشار الموجة', g.x1 - 130, yy - 13, { s: 11, w: 900, c: '#c2410c' }); }
        if (p.mk !== false) { const q = pts[mark]; K.raw(ctx, () => { const yy = r.y + g.R + 12; if (L) { G.arrow(ctx, q[0], yy, q[0] - 22, yy, '#dc2626', 2.2, 7); G.arrow(ctx, q[0], yy, q[0] + 22, yy, '#dc2626', 2.2, 7); } else { G.arrow(ctx, q[0] + 16, q[1], q[0] + 16, q[1] - 22, '#dc2626', 2.2, 7); G.arrow(ctx, q[0] + 16, q[1], q[0] + 16, q[1] + 22, '#dc2626', 2.2, 7); } });
          Q25.T(ctx, L ? 'تهتز موازية للانتشار ∥' : 'تهتز عمودية على الانتشار ⊥', q[0], r.y + g.R + (L ? 32 : 44), { s: 11, w: 900, c: '#fff', bg: '#dc2626' }); }
        if (p.lab !== false) { // find compressions / rarefactions or crests / troughs
          if (L) { const sp = []; for (let i = 1; i < NC; i++) sp.push([(pts[i][0] + pts[i - 1][0]) / 2, pts[i][0] - pts[i - 1][0]]); const avg = g.pxm * LEN / (NC - 1); let lastC = -1e9, lastR = -1e9;
            for (let i = 2; i < sp.length - 2; i++) { const s = sp[i][1]; if (s < avg * .78 && s <= sp[i - 1][1] && s <= sp[i + 1][1] && sp[i][0] - lastC > 60) { lastC = sp[i][0]; K.raw(ctx, () => { ctx.fillStyle = 'rgba(124,58,237,.12)'; ctx.fillRect(sp[i][0] - 18, r.y - g.R - 4, 36, 2 * g.R + 8); }); Q25.T(ctx, 'تضاغط', sp[i][0], r.y - g.R - (p.type === 'both' ? 30 : 14), { s: 11, w: 900, c: '#6d28d9' }); }
              if (s > avg * 1.22 && s >= sp[i - 1][1] && s >= sp[i + 1][1] && sp[i][0] - lastR > 60) { lastR = sp[i][0]; Q25.T(ctx, 'تخلخل', sp[i][0], r.y + g.R + 16, { s: 11, w: 900, c: '#0f766e' }); } } }
          else { let lc = -1e9, lt = -1e9; for (let i = 2; i < NC - 2; i++) { const y = pts[i][1]; if (y < r.y - 8 && y <= pts[i - 1][1] && y <= pts[i + 1][1] && pts[i][0] - lc > 60) { lc = pts[i][0]; Q25.T(ctx, 'قمة', pts[i][0], y - g.R - 14, { s: 11, w: 900, c: '#fff', bg: '#16a34a' }); }
            if (y > r.y + 8 && y >= pts[i - 1][1] && y >= pts[i + 1][1] && pts[i][0] - lt > 60) { lt = pts[i][0]; Q25.T(ctx, 'قعر', pts[i][0], y + g.R + 14, { s: 11, w: 900, c: '#fff', bg: '#b91c1c' }); } } } }
        if (p.lam !== false && p.auto !== false) { const lp = D.V / p.f * g.pxm, xa = g.x0 + .8 * g.pxm, yy = r.y + g.R + (L ? 50 : 62); if (xa + lp < g.x1) { K.raw(ctx, () => { G.arrow(ctx, xa + lp / 2, yy, xa, yy, '#0369a1', 2, 7); G.arrow(ctx, xa + lp / 2, yy, xa + lp, yy, '#0369a1', 2, 7); }); Q25.T(ctx, 'λ = ' + Q25.nf(D.V / p.f, 3) + ' m', xa + lp / 2, yy + 13, { s: 10.5, w: 900, c: '#0369a1' }); } }
      });
      const C = p.type === 'trans' ? [{ t: 'الحلقة تهتز ⊥ خط الانتشار', c: '#dc2626', w: 900 }, { t: 'تنتشر بشكل قمم وقعور', c: '#0369a1', w: 900 }, { t: 'مثل: الأوتار المهتزة', c: '#334155' }] : p.type === 'long' ? [{ t: 'الحلقة تهتز ∥ خط الانتشار', c: '#dc2626', w: 900 }, { t: 'تنتشر بشكل تضاغطات وتخلخلات', c: '#6d28d9', w: 900 }, { t: 'مثل: الصوت، الموجات الزلزالية', c: '#334155' }] : [{ t: '(أ) طولية: اهتزاز ∥ الانتشار', c: '#6d28d9', w: 900 }, { t: '(ب) مستعرضة: اهتزاز ⊥ الانتشار', c: '#0369a1', w: 900 }];
      if (!g.ph || p.type !== 'both') Q25.card(ctx, S, C, { title: 'المقارنة', wd: 290, y: 44 });
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return g.rows.map((r, ri) => { const L = r.t === 'long', d = S.hy * g.pxm; return { id: 'hand' + ri, x: g.x0 - 18 + (L ? d : 0), y: r.y - (L ? 0 : d), r: 34, axis: L ? 'x' : 'y', keep: true, tip: L ? 'اسحب اليد إلى الأمام والخلف' : 'اسحب اليد إلى الأعلى والأسفل', idle: ri === 0 ? 'حرّكني ✋' : undefined, hint: ri === 0,
      down: S => { S.hold = 1; }, drag: (S, dd) => { S.hy = clamp(L ? (dd.x - (g.x0 - 18)) / g.pxm : (r.y - dd.y) / g.pxm, -.25, .25); }, up: S => { S.hold = 0; S.ph = Math.asin(clamp(S.hy / (S.p.A / 100), -1, 1)); } }; }); },
    readings(S) { const p = S.p; return [rd('نوع الموجة', p.type === 'long' ? 'طولية' : p.type === 'trans' ? 'مستعرضة' : 'طولية + مستعرضة'), rd('اهتزاز الدقائق', p.type === 'long' ? 'موازٍ لاتجاه الانتشار' : p.type === 'trans' ? 'عمودي على اتجاه الانتشار' : '∥ في (أ) ، ⊥ في (ب)', 1), rd('التردد f', Q25.nf(p.f, 2) + ' Hz'), rd('الطول الموجي λ', Q25.nf(D.V / p.f, 3) + ' m'), rd('سرعة الموجة في النابض', D.V + ' m/s')]; },
    explain(S) { const t = S.p.type; if (t === 'long') return 'اليد <b>تكبس وتسحب</b> النابض باتجاه طوله، فتتقارب الحلقات في أماكن (<b>تضاغط</b>) وتتباعد في أماكن أخرى (<b>تخلخل</b>). الحلقة الحمراء تتحرك إلى الأمام والخلف <b>موازية</b> لاتجاه انتشار الموجة: هذه <b>موجة طولية</b>، مثل موجات الصوت.';
      if (t === 'trans') return 'اليد تتحرك <b>إلى الأعلى والأسفل</b>، فتتكون <b>قمم وقعور</b>. الحلقة الحمراء تصعد وتنزل <b>عمودية</b> على اتجاه انتشار الموجة: هذه <b>موجة مستعرضة</b>، مثل موجات الأوتار المهتزة.';
      return 'النابض نفسه والتردد نفسه، والفرق فقط في <b>اتجاه حركة اليد</b>: (أ) حركة على امتداد النابض ⟸ <b>طولية</b> (تضاغطات وتخلخلات). (ب) حركة عمودية على النابض ⟸ <b>مستعرضة</b> (قمم وقعور). في الحالتين تنتقل الطاقة إلى اليمين بينما الحلقات تهتز في أماكنها.'; }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'في الزلزال تصل أولاً الموجات الطولية فيهتز البيت إلى الأمام والخلف، ووتر العود والكمان يهتز بموجات مستعرضة.';
})();
/* =========================================================================================
   3-b) نشاط (ص 59): خصائص الموجة الطولية — ثقل معلق في نهاية نابض حلزوني
   ========================================================================================= */
(() => {
  const N = 22, GPX = 700, MS = .3, MB = .32, KT = 3.4;
  const D = { id: 'g8_w_springact', page: 59, fig: 'نشاط ص 59',
    desc: 'نعلّق ثقلاً في نهاية نابض حلزوني، ونرفع الثقل إلى الأعلى ثم نتركه: نلاحظ أن حلقات النابض تتقارب وتتباعد على امتداد طوله، والثقل يتحرك إلى الأعلى والأسفل، أي بموازاة طول النابض.',
    tags: 'نشاط خصائص الموجة الطولية نابض حلزوني ثقل معلق تضاغط تخلخل حامل',
    tools: ['نابض حلزوني', 'ثقل', 'حامل'],
    steps: ['① (الكتاب) أعلّق الثقل في نهاية نابض حلزوني، وأرفع الثقل إلى الأعلى ثم أتركه. ماذا ألاحظ؟ — اسحب الثقل إلى الأعلى (أو إلى الأسفل) ثم أفلته، أو اضغط «ارفع الثقل واتركه».', '② (الكتاب) أصف حركة الثقل، ما نوع الحركة؟ — راقب سهم حركة الثقل وسهم انتشار الاضطراب في النابض.', '③ (الكتاب) أستنتج نوع الموجات التي يمثلها حركة النابض.', 'جرّب ثقلاً أكبر من «كتلة الثقل» ولاحظ.'],
    concl: ['الثقل يتحرك إلى الأعلى والأسفل حركة اهتزازية حول موضع استقراره.', 'حلقات النابض تتقارب (تضاغط) وتتباعد (تخلخل)، وينتقل هذا النمط على امتداد طول النابض.', 'اهتزاز الحلقات موازٍ لاتجاه انتشار الاضطراب ⟸ حركة النابض تمثل موجة طولية.'],
    laws: ['g8_wtypes'],
    controls: [R('mb', 'كتلة الثقل', 100, 600, 300, 50, 'g', (v, S) => { S.MB = v / 1000; }), BT('', [{ t: '⬆ ارفع الثقل واتركه', on: S => D.kick(S) }, { t: '↺ أوقف', on: S => D.rest(S) }]),
      TG('mk', 'الحلقة الحمراء', true, null, 'dot'), TG('lab', 'التضاغط والتخلخل', true, null, 'labels'), TG('vec', 'سهم حركة الثقل وسهم الانتشار', true, null, 'velocity'), TG('graph', 'منحني ارتفاع الثقل', true, null, 'graph')],
    setup(S) { S.MB = (S.p.mb || 300) / 1000; S.tr = []; D.rest(S); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600; const top = h * .16, cx = ph ? w * .42 : 70 + (w - 70) * .36, sc = clamp(h / 700, .6, 1.3); return { w, h, ph, top, cx, sc, by: h * .9 }; },
    k() { return KT * N; }, m() { return MS / N; },
    rest(S) { const g = D.geo(S), k = D.k(), m = D.m(), l0 = 9 * g.sc; S.l0 = l0; S.y = []; S.v = []; let y = g.top; for (let i = 1; i <= N; i++) { const below = (N - i) * m + S.MB + m / 2 * 0; y += l0 + GPX * g.sc * below / k; S.y.push(y); S.v.push(0); } S.hold = 0; S.tr = []; },
    kick(S) { const g = D.geo(S), d = 80 * g.sc; S.y = S.y.map((y, i) => y - d * (i + 1) / N); S.v = S.v.map(() => 0); },
    update(S, dt) { if (!S.W || !S.H) return; if (!S.y || !isFinite(S.y[0]) || S._rh !== S.H) { S._rh = S.H; D.rest(S); } const g = D.geo(S), k = D.k(), m = D.m(), G0 = GPX * g.sc, c = .35, n = Math.ceil(dt / .0008), h = dt / n;
      for (let s = 0; s < n; s++) { for (let i = 0; i < N; i++) { const yu = i ? S.y[i - 1] : g.top, f1 = k * (S.y[i] - yu - S.l0) / g.sc, f2 = i < N - 1 ? k * (S.y[i + 1] - S.y[i] - S.l0) / g.sc : 0; const mi = i === N - 1 ? m / 2 + S.MB : m;
          let a = (f2 - f1) / mi * g.sc + G0 - c * S.v[i] / mi * .05; if (i === N - 1 && S.hold) { S.v[i] = 0; continue; } S.v[i] += a * h; }
        for (let i = 0; i < N; i++) { if (i === N - 1 && S.hold) continue; S.y[i] += S.v[i] * h; S.y[i] = Math.max(S.y[i], (i ? S.y[i - 1] : g.top) + 1.2 * g.sc); } }
      S.tr.push([S.t, S.y[N - 1]]); if (S.tr.length > 300) S.tr.shift(); },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { benchY: g.by }); if (!S.y || !isFinite(S.y[0])) return;
      Q25.banner(ctx, w, 'اسحب الثقل إلى الأعلى ثم أفلته ✋', '#0d9488', 20);
      // stand
      K.raw(ctx, () => { ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(g.cx - 70 * g.sc, g.by + 4, 90 * g.sc, 8, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#334155'; rr(ctx, g.cx - 150 * g.sc, g.by - 16, 170 * g.sc, 16, 4); ctx.fill();
        const rg = ctx.createLinearGradient(g.cx - 120 * g.sc, 0, g.cx - 108 * g.sc, 0); rg.addColorStop(0, '#9ca3af'); rg.addColorStop(.5, '#f3f4f6'); rg.addColorStop(1, '#6b7280'); ctx.fillStyle = rg; ctx.fillRect(g.cx - 120 * g.sc, g.top - 30, 11 * g.sc, g.by - g.top + 14);
        ctx.fillStyle = '#475569'; ctx.fillRect(g.cx - 126 * g.sc, g.top - 12, 140 * g.sc, 9); ctx.fillStyle = '#1f2937'; rr(ctx, g.cx - 130 * g.sc, g.top - 18, 22 * g.sc, 20, 3); ctx.fill(); ctx.beginPath(); ctx.arc(g.cx, g.top - 2, 4, 0, TAU); ctx.fill(); });
      // spring coils (2 turns per segment)
      const ys = [g.top].concat(S.y.slice(0, N - 1)), R = 16 * g.sc;
      K.raw(ctx, () => { const cs = []; for (let i = 0; i < N - 1; i++) for (let j = 0; j < 2; j++) cs.push(lerp(ys[i], ys[i + 1], (j + .5) / 2));
        ctx.lineWidth = 2; cs.forEach((y, i) => { ctx.strokeStyle = '#64748b'; ctx.beginPath(); ctx.ellipse(g.cx, y, R, 3.2 * g.sc, 0, Math.PI, TAU); ctx.stroke(); });
        cs.forEach((y, i) => { const m = p.mk !== false && i === 20; ctx.strokeStyle = m ? '#dc2626' : '#cbd5e1'; ctx.lineWidth = m ? 3.2 : 2.2; ctx.beginPath(); ctx.ellipse(g.cx, y, R, 3.2 * g.sc, 0, 0, Math.PI); ctx.stroke(); });
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.cx, ys[N - 1]); ctx.lineTo(g.cx, S.y[N - 1]); ctx.stroke();
        if (p.lab !== false) { const sp = []; for (let i = 1; i < N; i++) sp.push([(ys[i] + ys[i - 1]) / 2, ys[i] - ys[i - 1]]); const avg = (ys[N - 1] - ys[0]) / (N - 1); let lc = -1e9, lr = -1e9;
          sp.forEach((q, i) => { if (i < 1 || i > sp.length - 2) return; if (q[1] < avg * .8 && q[1] <= sp[i - 1][1] && q[1] <= sp[i + 1][1] && q[0] - lc > 40) { lc = q[0]; ctx.fillStyle = 'rgba(124,58,237,.14)'; ctx.fillRect(g.cx - R - 6, q[0] - 14, 2 * R + 12, 28); S._lab = (S._lab || []); }
            if (q[1] > avg * 1.2 && q[1] >= sp[i - 1][1] && q[1] >= sp[i + 1][1] && q[0] - lr > 40) { lr = q[0]; } });
          S._lc = lc; S._lr = lr; } });
      if (p.lab !== false) { if (S._lc > 0) Q25.T(ctx, 'تضاغط', g.cx + R + 34, S._lc, { s: 11.5, w: 900, c: '#6d28d9' }); if (S._lr > 0) Q25.T(ctx, 'تخلخل', g.cx + R + 34, S._lr, { s: 11.5, w: 900, c: '#0f766e' }); }
      // weight (slotted mass hanger)
      const wy = S.y[N - 1], mh = (22 + S.MB * 50) * g.sc; K.raw(ctx, () => { ctx.strokeStyle = '#71717a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(g.cx, wy + 5, 5, Math.PI, 0); ctx.stroke(); ctx.beginPath(); ctx.moveTo(g.cx, wy + 5); ctx.lineTo(g.cx, wy + 14); ctx.stroke();
        const bg = ctx.createLinearGradient(g.cx - 22 * g.sc, 0, g.cx + 22 * g.sc, 0); bg.addColorStop(0, '#a16207'); bg.addColorStop(.4, '#fde68a'); bg.addColorStop(1, '#854d0e'); ctx.fillStyle = bg; rr(ctx, g.cx - 22 * g.sc, wy + 14, 44 * g.sc, mh, 4); ctx.fill(); ctx.strokeStyle = '#713f12'; ctx.lineWidth = 1; ctx.stroke(); });
      Q25.T(ctx, (S.p.mb) + ' g', g.cx, wy + 14 + mh / 2, { s: 11, w: 900, c: '#451a03' });
      if (p.vec !== false) { const vy = S.v[N - 1]; if (Math.abs(vy) > 8) K.raw(ctx, () => G.arrow(ctx, g.cx - 44 * g.sc, wy + 20, g.cx - 44 * g.sc, wy + 20 + clamp(vy * .25, -60, 60), '#dc2626', 3, 10)); Q25.T(ctx, 'حركة الثقل', g.cx - 44 * g.sc - 46, wy + 20, { s: 10.5, w: 900, c: '#b91c1c' });
        K.raw(ctx, () => { G.arrow(ctx, g.cx + R + 80, g.top + 20, g.cx + R + 80, wy - 20, '#ea580c', 3, 10); }); Q25.T(ctx, 'انتشار الاضطراب', g.cx + R + 80, g.top + 6, { s: 10.5, w: 900, c: '#c2410c' }); }
      if (p.graph !== false && S.tr.length > 2) { const gw = g.ph ? w * .4 : Math.min(250, w * .3), gh = 110, gx = w - gw - 12, gy = g.ph ? h * .52 : h * .5; C2.card(ctx, gx, gy, gw, gh, { bd: '#dc2626' }); Q25.T(ctx, 'ارتفاع الثقل مع الزمن', gx + gw / 2, gy + 12, { s: 10.5, w: 900, c: '#b91c1c' });
        K.raw(ctx, () => { const t1 = S.t, span = 5, ym = S.tr.reduce((a, q) => a + q[1], 0) / S.tr.length; ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2; ctx.beginPath(); S.tr.forEach((q, i) => { const X = gx + 8 + (gw - 16) * (1 - (t1 - q[0]) / span), Y = gy + gh / 2 + 8 + clamp((q[1] - ym) * .35, -40, 40); if (X < gx + 8) return; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke(); }); }
      Q25.card(ctx, S, [{ t: 'الثقل يتحرك للأعلى والأسفل', c: '#b91c1c', w: 900 }, { t: 'الحلقات تتقارب وتتباعد على طول النابض', c: '#6d28d9', w: 900 }, { t: 'الاهتزاز ∥ الانتشار ⟸ موجة طولية', c: '#0f766e', w: 900 }], { title: 'نشاط: خصائص الموجة الطولية', wd: 300, y: 44 });
    },
    drags(S) { if (!S.y) return []; const g = D.geo(S), wy = S.y[N - 1]; return [{ id: 'weight', x: g.cx, y: wy + 30 * g.sc, w: 70 * g.sc, h: 60 * g.sc, axis: 'y', keep: true, tip: 'اسحب الثقل إلى الأعلى ثم أفلته', idle: 'ارفعني ثم أفلتني ✋',
      down: (S, x, y) => { S.hold = 1; S.dy0 = y - wy; }, drag: (S, d) => { const ny = clamp(d.y - S.dy0, g.top + 60 * g.sc, g.by - 70 * g.sc); const old = S.y[N - 1]; S.y = S.y.map((y, i) => i === N - 1 ? ny : y + (ny - old) * 0); S.v[N - 1] = 0; }, up: S => { S.hold = 0; } }]; },
    readings(S) { if (!S.y) return []; const g = D.geo(S); const L = (S.y[N - 1] - g.top) / g.sc; return [rd('طول النابض (على الشاشة)', Q25.nf(L / 3, 3, 'cm')), rd('سرعة الثقل', Q25.nf(Math.abs(S.v[N - 1]) / 300, 2, 'm/s')), rd('اتجاه حركة الثقل', Math.abs(S.v[N - 1]) < 8 ? 'ساكن تقريباً' : S.v[N - 1] < 0 ? 'إلى الأعلى ↑' : 'إلى الأسفل ↓'), rd('نوع الموجة', 'طولية')]; },
    explain(S) { return 'عندما نرفع الثقل ونتركه يتحرك <b>إلى الأعلى والأسفل</b>. حلقات النابض <b>تتقارب</b> في مكان (تضاغط) و<b>تتباعد</b> في مكان آخر (تخلخل)، وينتقل هذا التقارب والتباعد على طول النابض. الحلقات تهتز <b>بموازاة</b> طول النابض وهو اتجاه انتشار الاضطراب، لذلك حركة النابض تمثل <b>موجة طولية</b>.'; }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'نوابض مقاعد السيارة وممتص الصدمات تتقارب حلقاتها وتتباعد عند المرور على مطب.';
})();
/* =========================================================================================
   3-c) سؤال ص 59 + س2-7: صنّف الموجات بحسب حركة دقائق الوسط
   ========================================================================================= */
(() => {
  const IT = [['snd', '🔊 موجات الصوت', 1], ['quake', '🌋 الموجات الزلزالية', 1], ['string', '🎸 موجات الأوتار المهتزة', 2], ['spring', '〰 نابض يُكبس ويُسحب', 1], ['rope', '🪢 حبل يُهز للأعلى والأسفل', 2], ['ultra', '🦇 الموجات فوق السمعية', 1], ['light', '💡 موجات الضوء', 2], ['radio', '📻 الموجات الراديوية', 2]];
  const CN = ['', 'موجات طولية', 'موجات مستعرضة'], CD = ['', 'الاهتزاز ∥ الانتشار', 'الاهتزاز ⊥ الانتشار'];
  const D = { id: 'g8_w_classify', page: 59, fig: 'سؤال ص 59',
    desc: 'صنّف الموجات بحسب حركة دقائق الوسط: اسحب كل موجة إلى عمود «طولية» أو «مستعرضة». لاحظ أن موجات الضوء والراديو مستعرضة ولا تحتاج إلى وسط مادي (كهرومغناطيسية).',
    tags: 'تصنيف الموجات طولية مستعرضة سؤال حركة دقائق الوسط كهرومغناطيسية',
    steps: ['اسحب كل بطاقة إلى عمود نوعها.', 'اسأل نفسك: هل تهتز دقائق الوسط موازية لاتجاه الانتشار (طولية) أم عمودية عليه (مستعرضة)؟', 'اضغط «ساعدني» إذا احترت.'],
    concl: ['طولية: الصوت، الموجات الزلزالية، الموجات فوق السمعية، موجة النابض الذي يُكبس ويُسحب.', 'مستعرضة: الأوتار المهتزة، الحبل الذي يُهز للأعلى والأسفل، الضوء، الموجات الراديوية.', 'الموجات الكهرومغناطيسية (الضوء والراديوية) مستعرضة لا تحتاج بالضرورة إلى وسط مادي لانتقالها.'],
    laws: ['g8_wtypes', 'g8_em'],
    controls: [BT('', [{ t: '↺ ابدأ من جديد', on: S => D.reset(S) }, { t: '💡 ساعدني', on: S => { const t = IT.find(q => !S.pl[q[0]]); if (t) C2.msg(S, t[1].slice(2) + ': ' + CD[t[2]] + ' ⟸ ' + CN[t[2]], 3.5); } }])],
    setup(S) { D.reset(S); }, reset(S) { S.pl = {}; S.hold = ''; S.nOk = 0; S.err = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 10 : 76, x1 = w - 12, cw = ph ? (x1 - x0) / 2 - 8 : Math.min(180, (x1 - x0) / 4 - 10), ch = ph ? 34 : 46, ty = 50; const colW = (x1 - x0 - 12) / 2; const cols = [1, 2].map((c, i) => ({ c, x: x1 - colW / 2 - i * (colW + 12), w: colW, y: ph ? h * .44 : h * .42, h: h * (ph ? .4 : .46) })); return { w, h, ph, x0, x1, cw, ch, ty, cols }; },
    slot(g, i) { const per = g.ph ? 2 : 4, r = Math.floor(i / per), k = i % per; return [Q25.cx(g.w) - (g.ph ? 32 : 0) + ((per - 1) / 2 - k) * (g.cw + 10), g.ty + g.ch / 2 + 10 + r * (g.ch + 10)]; },
    colAt(g, x, y) { const c = g.cols.find(cl => Math.abs(x - cl.x) <= cl.w / 2 && y >= cl.y - 40 && y <= cl.y + cl.h); return c ? c.c : 0; },
    chip(ctx, x, y, cw, ch, t, o = {}) { K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(15,23,42,.25)'; ctx.shadowBlur = o.lift ? 16 : 5; ctx.shadowOffsetY = o.lift ? 6 : 2; ctx.fillStyle = '#fff'; rr(ctx, x - cw / 2, y - ch / 2, cw, ch, 10); ctx.fill(); ctx.restore(); ctx.strokeStyle = '#5eead4'; ctx.lineWidth = 2; rr(ctx, x - cw / 2, y - ch / 2, cw, ch, 10); ctx.stroke(); }); Q25.T(ctx, t, x, y, { s: cw < 150 ? 11 : 12.5, w: 900, c: '#134e4a' }); },
    draw(ctx, w, h, S) { const g = D.geo(S); K.bg(ctx, w, h, { benchY: h * .97 });
      Q25.banner(ctx, w, 'اسحب كل موجة إلى عمود نوعها', '#0d9488', 22);
      const hd = S.hold ? D.colAt(g, S.hx, S.hy) : 0;
      g.cols.forEach(cl => { K.raw(ctx, () => { ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, cl.x - cl.w / 2, cl.y, cl.w, cl.h, 12); ctx.fill(); ctx.strokeStyle = cl.c === 1 ? '#7c3aed' : '#0369a1'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = cl.c === 1 ? '#7c3aed' : '#0369a1'; rr(ctx, cl.x - cl.w / 2, cl.y, cl.w, 46, 12); ctx.fill(); ctx.fillRect(cl.x - cl.w / 2, cl.y + 30, cl.w, 16); });
        Q25.T(ctx, CN[cl.c], cl.x, cl.y + 15, { s: 14, w: 900, c: '#fff' }); Q25.T(ctx, CD[cl.c], cl.x, cl.y + 35, { s: 11.5, w: 700, c: '#fff' });
        // mini drawing of the wave type
        K.raw(ctx, () => { const yy = cl.y + cl.h - 26, x0 = cl.x - cl.w / 2 + 16, x1 = cl.x + cl.w / 2 - 16; ctx.strokeStyle = cl.c === 1 ? '#7c3aed' : '#0369a1'; ctx.lineWidth = 1.6; if (cl.c === 2) { ctx.beginPath(); for (let x = x0; x <= x1; x += 2) ctx.lineTo(x, yy - 10 * Math.sin((x - x0) / 14 + S.t * 3)); ctx.stroke(); } else for (let x = x0; x <= x1; x += 1) { const ph = Math.sin((x - x0) / 14 - S.t * 3); if (((x - x0) + 6 * ph) % 7 < 1) { ctx.beginPath(); ctx.moveTo(x, yy - 10); ctx.lineTo(x, yy + 10); ctx.stroke(); } } });
        if (S.hold) C1.zone(ctx, cl.x, cl.y + cl.h / 2, cl.w - 6, cl.h - 6, hd === cl.c, false);
        let r = 0; IT.forEach(([k, n]) => { if (S.pl[k] !== cl.c) return; Q25.T(ctx, '✓ ' + n, cl.x + cl.w / 2 - 12, cl.y + 64 + r * (g.ph ? 22 : 26), { s: g.ph ? 11 : 12.5, w: 900, c: '#15803d', a: 'right' }); r++; }); });
      IT.forEach(([k, n], i) => { if (S.pl[k] || S.hold === k) return; const o = D._an || (D._an = {}); const q = o[k] || (o[k] = {}); const [tx, ty] = D.slot(g, i); const [x, y] = C1.ease(q, tx, ty); D.chip(ctx, x, y, g.cw, g.ch, n); });
      if (S.hold) { const it = IT.find(q => q[0] === S.hold); D.chip(ctx, S.hx, S.hy, g.cw, g.ch, it[1], { lift: 1 }); }
      if (S.nOk === IT.length) Q25.T(ctx, 'أحسنت! صنّفت جميع الموجات ✓ (أخطاء: ' + S.err + ')', Q25.cx(w), g.cols[0].y - 18, { s: 13.5, w: 900, c: '#fff', bg: '#15803d' });
      C2.drawMsg(ctx, S, Q25.cx(w), g.cols[0].y - 26); K.party(ctx, S); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), out = [];
      IT.forEach(([k, n, c], i) => { if (S.pl[k]) return; const [x, y] = S.hold === k ? [S.hx, S.hy] : D.slot(g, i);
        out.push({ id: 'w_' + k, x, y, w: g.cw, h: g.ch, axis: 'xy', keep: true, tip: 'اسحب «' + n.slice(2) + '» إلى عمود نوعها', idle: i === 0 ? 'اسحبني إلى العمود الصحيح ✋' : undefined, hint: i === 0,
          down: (S, px, py) => { S.hold = k; S.hx = x; S.hy = y; S.dx0 = px - x; S.dy0 = py - y; }, drag: (S, d) => { S.hx = d.x - S.dx0; S.hy = d.y - S.dy0; },
          up: S => { const cc = D.colAt(g, S.hx, S.hy); const q = (D._an || {})[k]; if (cc === c) { S.pl[k] = c; S.nOk++; C1.good(); if (S.nOk === IT.length) K.cheer(S, Q25.cx(g.w), g.cols[0].y); } else { if (cc) { S.err++; C1.wrong(); C2.msg(S, 'ليست ' + CN[cc] + '!\n' + n.slice(2) + ': ' + CD[c], 3.2); } if (q) { q._ax = S.hx; q._ay = S.hy; } } S.hold = ''; } }); });
      return out; },
    readings(S) { return [rd('الموجات المصنّفة', S.nOk + ' / ' + IT.length), rd('الأخطاء', S.err), rd('طولية', IT.filter(t => S.pl[t[0]] === 1).map(t => t[1].slice(2)).join('، ') || '—', 1), rd('مستعرضة', IT.filter(t => S.pl[t[0]] === 2).map(t => t[1].slice(2)).join('، ') || '—', 1)]; },
    explain(S) { return S.nOk === IT.length ? 'صنّفت كل الموجات! <b>الطولية</b>: الصوت والزلزالية وفوق السمعية (تحتاج إلى وسط مادي). <b>المستعرضة</b>: الأوتار والحبل، و<b>الكهرومغناطيسية</b> كالضوء والراديو التي تنتقل حتى في الفراغ.' : 'لتعرف نوع الموجة اسأل: كيف تهتز دقائق الوسط؟ <b>بموازاة</b> اتجاه الانتشار ⟸ طولية. <b>عمودياً</b> عليه ⟸ مستعرضة.'; }
  };
  M8.P[D.id] = D;
})();
/* =========================================================================================
   4-a) ص 59–61 شكل 4 و 5: الطيف الكهرومغناطيسي وأنواع الموجات الكهرومغناطيسية
   ========================================================================================= */
(() => {
  const T7 = [ // [id, name, log10 λmin, log10 λmax, colour, book range, uses, icons]
    ['radio', 'الموجات الراديوية', -2, 4, '#b45309', '1 cm – 10000 m', 'بث إشارات الراديو والإشارات التلفزيونية', '📡 📻 📺'],
    ['micro', 'الموجات الدقيقة (المايكروية)', -4, -2, '#c2410c', '100 µm – 1 cm', 'الهاتف النقال، الرادار لكشف مواقع الأجسام وسرعتها، أفران المايكرويف', '📱 📡 🍲'],
    ['ir', 'الموجات تحت الحمراء', -6.155, -4, '#dc2626', '1 µm – 100 µm', 'تصدرها الأجسام الساخنة (ليست الشمس المصدر الوحيد)؛ العلاج الطبيعي، مناظير الرؤية الليلية، جهاز التحكم بالتلفاز', '🔥 🔭 🎮'],
    ['vis', 'الضوء المرئي', -6.398, -6.155, '#16a34a', '400 – 700 nm', 'تتحسسه عين الإنسان: الأحمر، البرتقالي، الأصفر، الأخضر، الأزرق، النيلي، البنفسجي', '🌈 💡 👁'],
    ['uv', 'الموجات فوق البنفسجية', -8, -6.398, '#7c3aed', '100 – 400 nm', 'تصدرها الشمس؛ حاضنات حديثي الولادة (الخدج)، عمليات التعقيم (قتل الجراثيم)', '☀ 👶 🧴'],
    ['x', 'موجات الأشعة السينية', -12, -8, '#2563eb', '0.001 – 10 nm', 'عالية التردد والطاقة والنفاذية: الكشف عن كسور العظام والحصى في المرارة، جهاز المفراس، كشف الأجسام الفلزية في الحقائب في المطارات', '🦴 🏥 🧳'],
    ['gamma', 'أشعة كاما', -14, -12, '#0f172a', '0.00001 – 0.001 nm', 'ذات طاقة عالية جداً تنبعث من نوى الذرات، أقصر موجات الطيف: علاج الأمراض السرطانية، وقتل الجراثيم والبكتريا الضارة في بعض الأطعمة (شكل 5)', '☢ 🏥 🍎']];
  const LMAX = 4, LMIN = -14;
  const fmtL = l => { const v = Math.pow(10, l); if (v >= 1) return Q25.nf(v, 3) + ' m'; if (v >= 1e-2) return Q25.nf(v * 100, 3) + ' cm'; if (v >= 1e-6) return Q25.nf(v * 1e6, 3) + ' µm'; if (v >= 1e-9) return Q25.nf(v * 1e9, 3) + ' nm'; return (v * 1e9).toPrecision(2) + ' nm'; };
  const sci = v => { const e = Math.floor(Math.log10(v)), m = v / Math.pow(10, e); return (Math.abs(m - 1) < .05 ? '' : m.toFixed(1) + '×') + '10' + Q25.sup(e); };
  const D = { id: 'g8_em_spectrum', page: 60, fig: 'شكل 4 ص 60 + شكل 5 ص 61',
    desc: 'موجات مستعرضة لا تحتاج بالضرورة إلى وسط مادي لانتقالها، تنتقل جميعها في الفراغ بسرعة 3×10⁸ m/s وتختلف في أطوالها الموجية وتردداتها. اسحب المؤشر على الطيف الكهرومغناطيسي لتتعرف على كل نوع وطوله الموجي واستعمالاته.',
    tags: 'الطيف الكهرومغناطيسي موجات كهرومغناطيسية راديوية مايكروية دقيقة تحت الحمراء الضوء المرئي فوق البنفسجية سينية كاما شكل 4 شكل 5 سرعة الضوء 3×10^8',
    steps: ['اسحب المؤشر على مقياس «طول الموجة (بالمتر)» من الراديوية (يسار) إلى أشعة كاما (يمين)، أو اضغط على اسم أي نوع.', 'لاحظ: كلما قصر الطول الموجي زاد التردد (f = c ÷ λ) وزادت طاقة الموجة.', 'اقرأ مدى الطول الموجي لكل نوع واستعمالاته كما في الكتاب.', 'سؤال ص 61: ماذا نعني بالموجات الكهرومغناطيسية؟'],
    concl: ['الموجات الكهرومغناطيسية موجات مستعرضة لا تحتاج إلى وسط مادي، وتنتقل في الفراغ بسرعة 3×10⁸ m/s.', 'أنواعها مرتبة من الأطول موجةً: الراديوية، الدقيقة، تحت الحمراء، الضوء المرئي، فوق البنفسجية، السينية، أشعة كاما (الأقصر طولاً والأعلى طاقة).', 'الضوء المرئي مدى ضيق من الطيف (400–700 nm) ويتكون من سبعة ألوان لكل منها طول موجي خاص به.'],
    laws: ['g8_em', 'g8_vlf'],
    controls: [R('lg', 'log₁₀ λ (m)', LMIN, LMAX, -1.5, .05, '', null, v => fmtL(v)), TG('wave', 'شكل الموجة', true, null, 'wave'), TG('uses', 'الاستعمالات', true, null, 'labels'), TG('en', 'سهم الطاقة والتردد', true, null, 'energy')],
    setup(S) { S.ph = 0; }, update(S, dt) { S.ph += dt; },
    type(S) { const l = S.p.lg; return T7.find(t => l >= t[2] && l <= t[3]) || (l > 0 ? T7[0] : T7[6]); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 18 : 90, x1 = w - 20, ya = ph ? 150 : 110; return { w, h, ph, x0, x1, ya, X: l => x0 + (LMAX - l) / (LMAX - LMIN) * (x1 - x0) }; },
    draw(ctx, w, h, S) {
      const g = D.geo(S), p = S.p, t = D.type(S), lam = Math.pow(10, p.lg), f = 3e8 / lam; K.bg(ctx, w, h, { bench: false });
      Q25.banner(ctx, w, 'شكل (4) الطيف الكهرومغناطيسي — اسحب المؤشر ✋', '#0d9488', 20);
      // bands
      T7.forEach(b => { const xa = g.X(b[3]), xb = g.X(b[2]), on = b === t; K.raw(ctx, () => { if (b[0] === 'vis') { const gr = ctx.createLinearGradient(xa, 0, xb, 0); ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#4f46e5', '#7c3aed'].forEach((c, i) => gr.addColorStop(i / 6, c)); ctx.fillStyle = gr; } else { ctx.fillStyle = b[4]; ctx.globalAlpha = on ? .9 : .35; }
          ctx.fillRect(xa, g.ya, xb - xa, 26); ctx.globalAlpha = 1; if (on) { ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2.5; ctx.strokeRect(xa, g.ya, xb - xa, 26); } });
        const mid = (xa + xb) / 2, lab = b[0] === 'vis' ? 'المرئي' : b[1].replace('الموجات ', '').replace('موجات ', '').replace(' (المايكروية)', ''); Q25.T(ctx, lab, b[0] === 'vis' ? mid : mid, g.ya - (b[0] === 'vis' ? 26 : 12), { s: g.ph ? 9.5 : 11.5, w: 900, c: on ? '#fff' : shade(b[4], -10), bg: on ? b[4] : null }); });
      // log axis
      K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(g.x0, g.ya + 34); ctx.lineTo(g.x1, g.ya + 34); ctx.stroke(); for (let e = LMAX; e >= LMIN; e--) { const x = g.X(e); ctx.beginPath(); ctx.moveTo(x, g.ya + 30); ctx.lineTo(x, g.ya + 38); ctx.stroke(); } });
      for (let e = 3; e >= -12; e -= (g.ph ? 3 : 1)) { if (e % (g.ph ? 3 : 1)) continue; Q25.T(ctx, '10' + (e < 0 ? '⁻' : '') + String(Math.abs(e)).split('').map(d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]).join(''), g.X(e), g.ya + 50, { s: 10.5, w: 800, c: '#334155' }); }
      Q25.T(ctx, 'طول الموجة (بالمتر)', g.x1 - 60, g.ya + 68, { s: 11, w: 900, c: '#0f172a' });
      // pointer
      const px = g.X(p.lg); K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.moveTo(px, g.ya + 28); ctx.lineTo(px - 10, g.ya + 46); ctx.lineTo(px + 10, g.ya + 46); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, g.ya - 4); ctx.lineTo(px, g.ya + 30); ctx.stroke(); });
      // wave picture: visual wavelength from 260 px (radio) down to 5 px (gamma)
      const wy = g.ya + (g.ph ? 120 : 130), vl = 5 + 255 * Math.pow((p.lg - LMIN) / (LMAX - LMIN), 1.6);
      if (p.wave !== false) K.raw(ctx, () => { ctx.fillStyle = '#fff'; rr(ctx, g.x0, wy - 44, g.x1 - g.x0, 88, 10); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.2; ctx.stroke();
        ctx.strokeStyle = t[0] === 'vis' ? wlColor(Math.pow(10, p.lg) * 1e9) : t[4]; ctx.lineWidth = 2.6; ctx.beginPath(); for (let x = g.x0 + 8; x <= g.x1 - 8; x += Math.max(.6, vl / 30)) { const y = wy - 30 * Math.sin(TAU * ((x - g.x0) / vl - S.ph * .8)); x === g.x0 + 8 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); });
      if (p.en !== false) { const ey = wy + 72; K.raw(ctx, () => G.arrow(ctx, g.x0 + 40, ey, g.x1 - 40, ey, '#9333ea', 3, 11)); Q25.T(ctx, 'يقل الطول الموجي ← يزداد التردد والطاقة', Q25.cx(w), ey - 14, { s: 11.5, w: 900, c: '#7e22ce' }); }
      // info card
      const by = wy + (g.ph ? 84 : 90); const L = [{ t: t[1], c: t[4], w: 900, s: 14 }, { t: 'مداه في الكتاب: ' + t[5], c: '#334155', w: 800 }, { t: 'λ = ' + fmtL(p.lg) + ' ⟸ f = c ÷ λ = ' + sci(f) + ' Hz', c: '#0f766e', w: 900, mono: 0 }, { t: 'السرعة في الفراغ 3×10⁸ m/s ولا تحتاج وسطاً', c: '#b91c1c', w: 800 }];
      const hh = Q25.lines(ctx, L.map(q => Object.assign({ s: g.ph ? 11.5 : 12.5 }, q)), g.x1, by, g.x1 - g.x0, { title: 'النوع المختار', bd: t[4], lh: g.ph ? 19 : 22 });
      if (p.uses !== false) { const uy = by + hh + 10; C2.card(ctx, g.x0, uy, g.x1 - g.x0, Math.min(h - uy - 70, g.ph ? 110 : 96), { bd: t[4] }); Q25.T(ctx, t[7], g.x0 + 48, uy + 30, { s: 24, c: '#000' });
        const words = t[6].split(' '), lines = []; let cur = ''; const mx = g.ph ? 34 : Math.floor((g.x1 - g.x0 - 130) / 7.2); words.forEach(wd => { if ((cur + ' ' + wd).length > mx) { lines.push(cur); cur = wd; } else cur = cur ? cur + ' ' + wd : wd; }); lines.push(cur);
        lines.slice(0, 4).forEach((ln, i) => Q25.T(ctx, (i ? '' : 'الاستعمالات: ') + ln, g.x1 - 12, uy + 18 + i * 20, { s: g.ph ? 11 : 12.5, w: 800, c: '#1e293b', a: 'right' })); }
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); const out = [{ id: 'ptr', x: g.X(S.p.lg), y: g.ya + 20, w: 40, h: 60, axis: 'x', keep: true, tip: 'اسحب المؤشر على الطيف', idle: 'اسحبني على الطيف ✋', drag: (S, d) => setParam(S, 'lg', LMAX - (d.x - g.x0) / (g.x1 - g.x0) * (LMAX - LMIN)) }];
      T7.forEach(b => { const xa = g.X(b[3]), xb = g.X(b[2]); out.push({ id: 'b_' + b[0], x: (xa + xb) / 2, y: g.ya + 13, w: Math.max(14, xb - xa - 30), h: 22, hint: false, tip: b[1], click: S => setParam(S, 'lg', (b[2] + b[3]) / 2) }); }); return out; },
    readings(S) { const t = D.type(S), lam = Math.pow(10, S.p.lg); return [rd('النوع', t[1], 1), rd('الطول الموجي λ', fmtL(S.p.lg)), rd('التردد f = c/λ', sci(3e8 / lam) + ' Hz'), rd('السرعة في الفراغ', '3×10⁸ m/s'), rd('مداه في الكتاب', t[5])]; },
    record(S) { const t = D.type(S), lam = Math.pow(10, S.p.lg); return { t: t[1], l: fmtL(S.p.lg), f: sci(3e8 / lam) }; }, cols: [['t', 'النوع'], ['l', 'λ'], ['f', 'f (Hz)']],
    explain(S) { const t = D.type(S); return '<b>' + t[1] + '</b>: طولها الموجي ' + t[5] + '. ' + t[6] + '. كل الموجات الكهرومغناطيسية تسير في الفراغ بالسرعة نفسها <b>3×10⁸ m/s</b>، لذلك كلما <b>قصر</b> الطول الموجي <b>زاد</b> التردد (c = λ f).'; }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'هاتفك النقال يستقبل موجات دقيقة، وجهاز التحكم بالتلفاز يرسل أشعة تحت حمراء، وطبيب الأسنان يصوّر أسنانك بالأشعة السينية.';
})();
/* =========================================================================================
   4-b) الفيزياء والحياة (ص 67): أهمية طبقة الأوزون — UV-A و UV-B و UV-C
   ========================================================================================= */
(() => {
  const UV = [['A', 'UV-A', '#a78bfa', .01], ['B', 'UV-B', '#7c3aed', .99], ['C', 'UV-C', '#4c1d95', 1]];
  const D = { id: 'g8_em_ozone', page: 67, fig: 'الفيزياء والحياة ص 67',
    desc: 'تنقسم حزمة الأشعة فوق البنفسجية على ثلاثة أقسام: UV-A و UV-B و UV-C، وتنتجها الشمس جميعها، لكن الغلاف الجوي يمتص معظمها قبل أن تصل إلى سطح الأرض. طبقة الأوزون تمتص معظم النوع UV-C فتحمي الأرض ومن عليها، وثقب طبقة الأوزون يسبب اختراق بعض الأشعة الضارة.',
    tags: 'أهمية طبقة الأوزون فوق البنفسجية UV-A UV-B UV-C فيتامين D حروق سرطان الجلد الفيزياء والحياة ثقب الأوزون',
    steps: ['راقب أشعة الشمس فوق البنفسجية بأنواعها الثلاثة وهي تعبر الغلاف الجوي.', 'لاحظ ماذا تمتص طبقة الأوزون، وما نسبة كل نوع يصل إلى سطح الأرض.', 'قلّل سُمك طبقة الأوزون (ثقب الأوزون): ماذا يحدث؟', 'غيّر مدة التعرض لأشعة الشمس: الجانب الإيجابي (فيتامين D) والأضرار (الحروق).'],
    concl: ['تصل نسبة 99% من الأشعة فوق البنفسجية إلى سطح الأرض من النوع UV-A، إذ يُمتص معظم النوع UV-C بواسطة طبقة الأوزون.', 'ثقب طبقة الأوزون يسبب اختراق بعض الأشعة فوق البنفسجية الضارة.', 'يحتاج معظمنا إلى التعرض لأشعة الشمس يومياً بما لا يزيد على نصف الساعة صباحاً لتفاعل UV-B مع البشرة وإنتاج فيتامين D.', 'أضرار الأشعة فوق البنفسجية: شديدة الاحتراق للبشرة، وتسبب سرطان الجلد، وأضراراً مختلفة للعين.'],
    laws: ['g8_em'],
    controls: [R('oz', 'سُمك طبقة الأوزون', 0, 100, 100, 5, '%'), R('min', 'مدة التعرض للشمس صباحاً', 0, 120, 20, 5, 'min'), BT('', [{ t: '↺ صفّر العدّادات', on: S => { S.cnt = { A: [0, 0], B: [0, 0], C: [0, 0] }; } }]), TG('lab', 'التسميات', true, null, 'labels')],
    setup(S) { S.ph = []; S.cnt = { A: [0, 0], B: [0, 0], C: [0, 0] }; S.sp = 0; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600; return { w, h, ph, top: 60, oz: h * .36, gnd: h * .8, x0: ph ? 10 : 76, x1: w - 10 }; },
    update(S, dt) { const g = D.geo(S); S.sp += dt; if (S.sp > .05) { S.sp = 0; const k = UV[Math.random() * 3 | 0]; S.ph.push({ k: k[0], x: g.x0 + 70 + Math.random() * (g.x1 - g.x0 - 220), y: g.top + 40, abs: Math.random() < k[3] * S.p.oz / 100, done: 0 }); S.cnt[k[0]][0]++; }
      S.ph.forEach(q => { q.y += 260 * dt; q.x += 30 * dt; if (q.abs && q.y >= g.oz) q.dead = 1; if (!q.abs && q.y >= g.gnd && !q.done) { q.done = 1; S.cnt[q.k][1]++; } }); S.ph = S.ph.filter(q => !q.dead && q.y < g.gnd + 6).slice(-160); },
    draw(ctx, w, h, S) { const g = D.geo(S), p = S.p; G.bg(ctx, w, h, false);
      K.raw(ctx, () => { const sk = ctx.createLinearGradient(0, 0, 0, g.gnd); sk.addColorStop(0, '#0c1445'); sk.addColorStop(.35, '#1e3a8a'); sk.addColorStop(1, '#7dd3fc'); ctx.fillStyle = sk; ctx.fillRect(0, 0, w, g.gnd);
        const og = ctx.createLinearGradient(0, g.oz - 18, 0, g.oz + 18); og.addColorStop(0, 'rgba(56,189,248,0)'); og.addColorStop(.5, 'rgba(56,189,248,' + (.15 + .6 * p.oz / 100) + ')'); og.addColorStop(1, 'rgba(56,189,248,0)'); ctx.fillStyle = og; ctx.fillRect(0, g.oz - 18, w, 36);
        ctx.fillStyle = '#65a30d'; ctx.fillRect(0, g.gnd, w, h - g.gnd); ctx.fillStyle = '#4d7c0f'; ctx.fillRect(0, g.gnd, w, 5);
        const sx = g.x0 + 40, sy = g.top + 10, sg = ctx.createRadialGradient(sx, sy, 5, sx, sy, 60); sg.addColorStop(0, '#fff7ae'); sg.addColorStop(.4, '#fbbf24'); sg.addColorStop(1, 'rgba(251,191,36,0)'); ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sx, sy, 60, 0, TAU); ctx.fill();
        S.ph.forEach(q => { const k = UV.find(u => u[0] === q.k); ctx.strokeStyle = k[2]; ctx.lineWidth = 2.4; ctx.beginPath(); for (let i = 0; i < 16; i++) { const yy = q.y - i * 2; ctx.lineTo(q.x - i * .23 + 4 * Math.sin(i * 1.2 + (q.k === 'C' ? 2 : 0)), yy); } ctx.stroke(); }); });
      K.raw(ctx, () => { const hx = g.x0 + (g.x1 - g.x0) * p.oz / 100; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#0369a1'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(hx, g.oz, 11, 0, TAU); ctx.fill(); ctx.stroke(); }); if (p.lab !== false) { Q25.T(ctx, 'طبقة الأوزون (' + p.oz + '%)', g.x1 - 90, g.oz - 26, { s: 12, w: 900, c: '#fff', bg: '#0369a1' }); Q25.T(ctx, 'الشمس', g.x0 + 40, g.top + 10, { s: 12, w: 900, c: '#78350f' }); Q25.T(ctx, 'سطح الأرض', g.x1 - 60, g.gnd + 18, { s: 12, w: 900, c: '#fff', bg: '#3f6212' }); }
      // person on the ground
      const burn = clamp((p.min - 30) / 90 + (100 - p.oz) / 100 * .8 * p.min / 60, 0, 1); const skin = burn > .05 ? shade('#f1c27d', 0) : '#f1c27d';
      if (Q23 && Q23.man) Q23.man(ctx, { hip: [g.x1 - (g.ph ? 60 : 120), g.gnd - 72], dir: -1, s: .75, shirt: '#f97316', pants: '#1e3a8a', skin: burn > .3 ? '#f87171' : skin, cap: '#2563eb' });
      // legend + counts
      const tot = UV.reduce((a, k) => a + S.cnt[k[0]][1], 0) || 1;
      Q25.card(ctx, S, UV.map(k => ({ t: k[1] + ': وصل ' + S.cnt[k[0]][1] + ' من ' + S.cnt[k[0]][0] + ' — نسبته بين الواصل ' + Math.round(100 * S.cnt[k[0]][1] / tot) + '%', c: shade(k[2], -20), w: 900 })).concat([{ t: p.min <= 30 ? 'تعرض ' + p.min + ' min صباحاً: مفيد (فيتامين D من UV-B)' : 'تعرض طويل ' + p.min + ' min: خطر حروق البشرة وأضرار العين', c: p.min <= 30 && p.oz > 60 ? '#15803d' : '#b91c1c', w: 900 }]), { title: 'الأشعة فوق البنفسجية التي تصل إلى الأرض', wd: 380, y: 44 });
    },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'ozone', x: g.x0 + (g.x1 - g.x0) * S.p.oz / 100, y: g.oz, w: 60, h: 40, axis: 'x', keep: true, tip: 'اسحب لتغيّر سُمك طبقة الأوزون (ثقب الأوزون)', idle: 'اسحبني لترقيق الأوزون ✋', drag: (S, d) => setParam(S, 'oz', Math.round(clamp((d.x - g.x0) / (g.x1 - g.x0) * 100, 0, 100) / 5) * 5) }]; },
    readings(S) { const tot = UV.reduce((a, k) => a + S.cnt[k[0]][1], 0) || 1; return UV.map(k => rd('نسبة ' + k[1] + ' بين الواصل', Math.round(100 * S.cnt[k[0]][1] / tot) + '%')).concat([rd('طبقة الأوزون', S.p.oz + '%')]); },
    explain(S) { return S.p.oz > 80 ? 'طبقة الأوزون سليمة: تمتص <b>كل UV-C</b> و<b>معظم UV-B</b>، فيكون معظم ما يصل إلينا (حوالي 99%) من النوع <b>UV-A</b>. التعرض للشمس صباحاً مدة لا تزيد على نصف ساعة مفيد لإنتاج <b>فيتامين D</b>.' : 'طبقة الأوزون <b>رقيقة (ثقب الأوزون)</b>: تخترقها أشعة <b>UV-B و UV-C</b> الضارة التي تسبب الحروق الشديدة للبشرة وسرطان الجلد وأضراراً للعين.'; }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'لهذا ننصح بعدم البقاء تحت الشمس وقت الظهيرة طويلاً، وبلبس النظارات الشمسية والقبعة.';
})();
/* =========================================================================================
   5) الدرس 2: الصوت — شكل 1 (ص 62)، نشاط انتقال الموجات الصوتية (ص 63)، سرعة الصوت في الأوساط، الفراغ، S = 331 + 0.6T
   ========================================================================================= */
/* air particles between x0..x1, rows in [y0,y1]; disp(x) returns longitudinal displacement in px; mark index → red */
Q25.air = (ctx, x0, x1, y0, y1, disp, o = {}) => K.raw(ctx, () => { const nx = o.nx || Math.max(20, Math.round((x1 - x0) / 11)), ny = o.ny || 7; const R = o.r || 2.6;
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { const jit = ((i * 37 + j * 91) % 13) / 13 - .5, bx = x0 + (i + .5 + jit * .5) * (x1 - x0) / nx, by = y0 + (j + .5 + (((i * 53 + j * 17) % 11) / 11 - .5) * .5) * (y1 - y0) / ny;
    const red = o.mark && i === o.mark[0] && j === o.mark[1]; ctx.fillStyle = red ? '#dc2626' : (o.col || '#2563eb'); ctx.beginPath(); ctx.arc(bx + disp(bx), by, red ? R * 1.9 : R, 0, TAU); ctx.fill(); } });
(() => {
  const D = { id: 'g8_s_fig1', page: 62, fig: 'شكل 1 ص 62',
    desc: 'عند اهتزاز جسم في وسط مادي فإنه يسبب تقارب دقائق الوسط في الموضع الذي يتحرك نحوه مولداً ما يسمى (بالتضاغط) بينما تتباعد دقائق الوسط في الموضع الذي يتركه مولداً (التخلخل)، وباستمرار الاهتزاز تنتقل سلسلة من التضاغطات والتخلخلات بعيداً عن الجسم المهتز فينتج صوت.',
    tags: 'ما الصوت شكل 1 مكبر صوت تضاغط تخلخل موجة طولية جزيئات الهواء طبلة الأذن',
    steps: ['شغّل مكبر الصوت (اضغط عليه). راقب غشاء المكبر يتحرك إلى الأمام والخلف.', 'لاحظ جزيئات الهواء: أين تتقارب (تضاغط)؟ وأين تتباعد (تخلخل)؟', 'راقب الجزيء الأحمر: هل ينتقل من المكبر إلى الأذن، أم يهتز في مكانه؟', 'غيّر العلو (السعة) والتردد ولاحظ التضاغطات والتخلخلات وطبلة الأذن.', 'سؤال ص 62: ما التضاغط وما التخلخل؟'],
    concl: ['الصوت موجة طولية تتكون من سلسلة من التضاغطات والتخلخلات ينتقل في الأوساط المادية فقط.', 'التضاغط: منطقة تتقارب فيها دقائق الوسط. التخلخل: منطقة تتباعد فيها دقائق الوسط.', 'جزيئات الهواء تهتز حول مواضعها ولا تنتقل من المصدر إلى الأذن؛ الذي ينتقل هو الطاقة.'],
    laws: ['g8_wtypes', 'g8_wave'],
    controls: [R('f', 'التردد (مكبَّر للعرض)', .5, 3, 1.2, .1, 'Hz'), R('A', 'علو الصوت (السعة)', 2, 10, 6, 1, 'px'), BT('', [{ t: '🔊 شغّل / أوقف المكبر', on: S => D.toggle(S) }]),
      TG('snd', 'سماع نغمة حقيقية', false, null, 'wave'), TG('lab', 'التضاغط والتخلخل', true, null, 'labels'), TG('mk', 'الجزيء الأحمر', true, null, 'dot'), TG('gr', 'منحني الضغط', true, null, 'graph')],
    setup(S) { S.on = 1; S.t0 = 0; S.ts = 0; },
    toggle(S) { S.on = !S.on; if (S.on) { S.t0 = S.ts; if (S.p.snd) S._snd = Q25.tone(220 * S.p.f, 2.5, { vol: .03 * S.p.A / 6 }); } else Q25.stop(S._snd); },
    update(S, dt) { S.ts += dt; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600; const sx = ph ? 50 : 150, ex = w - (ph ? 34 : 60), y0 = h * .3, y1 = h * .62; return { w, h, ph, sx, ex, y0, y1, x0: sx + 10, x1: ex - 40, lam: (ex - sx) / (ph ? 3 : 4.2) }; },
    u(S, g, x) { if (!S.on) return 0; const t = S.ts - S.t0, v = g.lam * S.p.f, d = x - g.x0; if (d > v * t) return 0; return S.p.A * Math.sin(TAU * (S.p.f * t - d / g.lam)); },
    draw(ctx, w, h, S) { const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { benchY: h * .8 });
      Q25.banner(ctx, w, 'شكل (1): ينتقل الصوت بشكل تضاغطات وتخلخلات — اضغط على المكبر', '#0d9488', 20);
      const cd = D.u(S, g, g.x0); Q25.speaker(ctx, g.sx, (g.y0 + g.y1) / 2, g.ph ? .7 : 1, 1, cd * .8);
      Q25.air(ctx, g.x0 + 8, g.x1, g.y0, g.y1, x => D.u(S, g, x), { mark: p.mk !== false ? [Math.round((g.x1 - g.x0) / 11 * .45), 3] : null, r: g.ph ? 2 : 2.6 });
      Q25.ear(ctx, g.ex, (g.y0 + g.y1) / 2, g.ph ? 28 : 40, -1, { drum: D.u(S, g, g.x1) * .5 });
      if (p.lab !== false && S.on) { const t = S.ts - S.t0; let lc = -1e9, lr = -1e9; for (let x = g.x0 + 20; x < g.x1 - 10; x += 2) { const du = (D.u(S, g, x + 1) - D.u(S, g, x - 1)) / 2, du1 = (D.u(S, g, x + 3) - D.u(S, g, x + 1)) / 2, du0 = (D.u(S, g, x - 1) - D.u(S, g, x - 3)) / 2;
          if (du < -.05 && du <= du0 && du <= du1 && x - lc > g.lam * .6) { lc = x; K.raw(ctx, () => { ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 14, g.y0 - 8); ctx.lineTo(x - 14, g.y0 - 14); ctx.lineTo(x + 14, g.y0 - 14); ctx.lineTo(x + 14, g.y0 - 8); ctx.stroke(); }); Q25.T(ctx, 'تضاغط', x, g.y0 - 26, { s: 11, w: 900, c: '#6d28d9' }); }
          if (du > .05 && du >= du0 && du >= du1 && x - lr > g.lam * .6) { lr = x; K.raw(ctx, () => { ctx.strokeStyle = '#0f766e'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 14, g.y1 + 8); ctx.lineTo(x - 14, g.y1 + 14); ctx.lineTo(x + 14, g.y1 + 14); ctx.lineTo(x + 14, g.y1 + 8); ctx.stroke(); }); Q25.T(ctx, 'تخلخل', x, g.y1 + 26, { s: 11, w: 900, c: '#0f766e' }); } } }
      if (p.gr !== false) { const gy = g.y1 + 70, gh = 40; K.raw(ctx, () => { ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(g.x0, gy); ctx.lineTo(g.x1, gy); ctx.stroke(); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2.2; ctx.beginPath(); for (let x = g.x0; x <= g.x1; x += 3) { const du = (D.u(S, g, x + 1) - D.u(S, g, x - 1)) / 2; const y = gy + du / (TAU * p.A / g.lam + 1e-6) * gh * (p.A / 10); x === g.x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); });
        Q25.T(ctx, 'منحني ضغط الهواء: القمة = تضاغط ، القعر = تخلخل', Q25.cx(w), gy + gh + 14, { s: 10.5, w: 800, c: '#b91c1c' }); }
      if (!S.on) Q25.T(ctx, 'المكبر متوقف — اضغط عليه ▶', g.sx + 40, g.y0 - 40, { s: 12, w: 900, c: '#fff', bg: '#64748b' });
      Q25.card(ctx, S, [{ t: 'الغشاء يهتز ⟸ تضاغطات وتخلخلات', c: '#6d28d9', w: 900 }, { t: 'الجزيء الأحمر يهتز في مكانه', c: '#dc2626', w: 900 }, { t: 'الصوت موجة طولية تحتاج وسطاً مادياً', c: '#0f766e', w: 900 }], { title: 'ما الصوت؟', wd: 300, y: 44 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'spk', x: g.sx - 20, y: (g.y0 + g.y1) / 2, w: 70, h: 130, tip: 'اضغط لتشغيل/إيقاف المكبر', idle: 'اضغطني ✋', click: S => D.toggle(S) }]; },
    readings(S) { return [rd('المكبر', S.on ? 'يعمل' : 'متوقف'), rd('التردد (للعرض)', Q25.nf(S.p.f, 2) + ' Hz'), rd('إزاحة الجزيء الأحمر', 'ذهاباً وإياباً حول موضعه'), rd('نوع الموجة', 'طولية')]; },
    explain(S) { return 'عندما يتحرك غشاء المكبر <b>إلى الأمام</b> يدفع جزيئات الهواء فتتقارب: <b>تضاغط</b>. وعندما يرجع <b>إلى الخلف</b> تتباعد الجزيئات: <b>تخلخل</b>. تنتقل هذه السلسلة إلى الأذن فتهتز <b>طبلة الأذن</b> ونسمع. الجزيء الأحمر لا يسافر إلى الأذن بل يهتز في مكانه.'; }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'عندما ترفع صوت المسجل كثيراً ترى غشاء السماعة يهتز بوضوح، وتشعر أحياناً بزجاج النافذة يرتجف.';
})();
(() => {
  const D = { id: 'g8_s_candle', page: 63, fig: 'نشاط ص 63',
    desc: 'نضع مكبر صوت على بعد مناسب أمام شمعة على منضدة، نشعل الشمعة ونشغل مكبر الصوت: نلاحظ أن لهب الشمعة يهتز إلى الأمام والخلف، فنستنتج أن الصوت ينتقل خلال الوسط المادي (الهواء) باهتزاز دقائقه.',
    tags: 'نشاط انتقال الموجات الصوتية مكبر صوت شمعة لهب منضدة اهتزاز الهواء',
    tools: ['مكبر صوت', 'شمعة', 'منضدة'],
    steps: ['① (الكتاب) أضع مكبر صوت على بعد مناسب أمام شمعة على منضدة. — اسحب الشمعة لتغيّر البعد.', '② (الكتاب) أشعل خيط الشمعة، وأشغّل مكبر الصوت. ماذا ألاحظ؟ — اضغط على المكبر.', '③ (الكتاب) أستنتج كيف ينتقل الصوت خلال الوسط المادي؟', 'قرّب الشمعة وأبعدها، وغيّر علو الصوت: متى يهتز اللهب أكثر؟'],
    concl: ['عند تشغيل المكبر يهتز لهب الشمعة إلى الأمام والخلف.', 'الصوت ينتقل خلال الوسط المادي (الهواء) بشكل اهتزاز لجزيئاته (تضاغطات وتخلخلات) تنقل الطاقة إلى اللهب.', 'كلما ابتعدت الشمعة عن المكبر أو قلّ علو الصوت قلّ اهتزاز اللهب.'],
    laws: ['g8_wave', 'g8_wtypes'],
    controls: [R('vol', 'علو صوت المكبر', 1, 10, 7, 1, ''), BT('', [{ t: '🔊 شغّل / أوقف المكبر', on: S => D.toggle(S) }]), TG('air', 'جزيئات الهواء', true, null, 'dot'), TG('snd', 'سماع صوت (نغمة غليظة)', false, null, 'wave'), TG('lab', 'التسميات', true, null, 'labels')],
    setup(S) { S.on = 0; S.cx = .62; S.ts = 0; S.sw = 0; },
    toggle(S) { S.on = !S.on; if (S.on && S.p.snd) S._snd = Q25.tone(90, 3, { vol: .05 * S.p.vol / 7, type: 'triangle' }); if (!S.on) Q25.stop(S._snd); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, ty = h * .74, sx = ph ? 70 : 170, cxp = sx + 60 + S.cx * (w - sx - 120); return { w, h, ph, ty, sx, cxp, d: (cxp - sx - 40) / (w - sx - 100) * 150 }; },
    update(S, dt) { S.ts += dt; const g = D.geo(S); const target = S.on ? S.p.vol / 10 * 24 / (1 + g.d / 35) : 0; S.sw += (target - S.sw) * Math.min(1, dt * 4); },
    draw(ctx, w, h, S) { const g = D.geo(S), p = S.p, f = 3; K.bg(ctx, w, h, { benchY: g.ty + 30 });
      Q25.banner(ctx, w, 'اضغط على المكبر، واسحب الشمعة لتغيّر بعدها ✋', '#0d9488', 20);
      K.raw(ctx, () => { const tg = ctx.createLinearGradient(0, g.ty, 0, g.ty + 14); tg.addColorStop(0, '#b45309'); tg.addColorStop(1, '#78350f'); ctx.fillStyle = tg; rr(ctx, g.sx - 110, g.ty, g.w - g.sx + 80, 14, 3); ctx.fill(); ctx.fillStyle = '#78350f'; ctx.fillRect(g.sx - 90, g.ty + 14, 12, h); ctx.fillRect(g.w - 60, g.ty + 14, 12, h); });
      const cd = S.on ? 4 * Math.sin(TAU * f * S.ts) * p.vol / 10 : 0; Q25.speaker(ctx, g.sx, g.ty - 64, g.ph ? .8 : 1, 1, cd);
      if (p.air !== false) Q25.air(ctx, g.sx + 10, g.w - 40, g.ty - 230, g.ty - 10, x => S.on ? p.vol * .7 / (1 + (x - g.sx) / 300) * Math.sin(TAU * (f * S.ts - (x - g.sx) / 120)) * ((x - g.sx) < S.ts * 360 ? 1 : 0) : 0, { col: 'rgba(37,99,235,.55)', ny: 9, r: 2.2 });
      const fdx = S.sw * Math.sin(TAU * f * S.ts - (g.cxp - g.sx) / 120 * TAU); Q25.candle(ctx, g.cxp, g.ty, g.ph ? .8 : 1, fdx, S.ts);
      if (p.lab !== false) { Q25.T(ctx, 'مكبر صوت', g.sx - 30, g.ty + 26, { s: 11.5, w: 900, c: '#fff', bg: '#334155' }); Q25.T(ctx, 'شمعة', g.cxp, g.ty + 26, { s: 11.5, w: 900, c: '#fff', bg: '#b45309' });
        K.raw(ctx, () => { G.arrow(ctx, g.sx + 40, g.ty + 46, g.cxp - 10, g.ty + 46, '#475569', 1.5, 7); }); Q25.T(ctx, 'البعد ≈ ' + Math.round(g.d) + ' cm', (g.sx + g.cxp) / 2, g.ty + 60, { s: 11, w: 900, c: '#334155' }); }
      Q25.card(ctx, S, [{ t: S.on ? 'المكبر يعمل: اللهب يهتز ' + (S.sw > 6 ? 'بقوة' : S.sw > 2 ? 'قليلاً' : 'بشكل ضعيف جداً') : 'المكبر متوقف: اللهب هادئ', c: S.on ? '#c2410c' : '#475569', w: 900 }, { t: 'الهواء ينقل اهتزاز المكبر إلى اللهب', c: '#0f766e', w: 900 }], { title: 'نشاط: انتقال الموجات الصوتية', wd: 300, y: 44 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'candle', x: g.cxp, y: g.ty - 90, w: 60, h: 180, axis: 'x', keep: true, tip: 'اسحب الشمعة لتقرّبها أو تبعدها', idle: 'اسحبني ✋', hint: false, drag: (S, d) => { S.cx = clamp((d.x - g.sx - 60) / (g.w - g.sx - 120), 0, 1); } },
      { id: 'spk', x: g.sx - 20, y: g.ty - 64, w: 70, h: 130, tip: 'اضغط لتشغيل المكبر', idle: 'شغّلني ✋', hint: true, click: S => D.toggle(S) }]; },
    readings(S) { const g = D.geo(S); return [rd('المكبر', S.on ? 'يعمل' : 'متوقف'), rd('البعد بين المكبر والشمعة', Math.round(g.d) + ' cm'), rd('سعة اهتزاز اللهب', Q25.nf(S.sw / 4, 2) + ' cm')]; },
    record(S) { const g = D.geo(S); return { d: Math.round(g.d), v: S.p.vol, a: +(S.sw / 4).toFixed(2) }; }, cols: [['d', 'البعد (cm)'], ['v', 'علو الصوت'], ['a', 'اهتزاز اللهب (cm)']],
    explain(S) { return S.on ? 'غشاء المكبر يدفع الهواء ويسحبه، فتنتقل <b>تضاغطات وتخلخلات</b> عبر الهواء حتى تصل إلى اللهب فيهتز <b>إلى الأمام والخلف</b> (باتجاه انتشار الصوت: موجة طولية). إذن الصوت <b>ينتقل خلال الوسط المادي باهتزاز دقائقه</b>.' : 'اضغط على المكبر لتشغيله وراقب لهب الشمعة.'; }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'في الحفلات القريبة من مكبرات الصوت الكبيرة تشعر بالهواء «يضرب» صدرك مع كل نغمة غليظة.';
})();
(() => {
  const MED = [['air', 'الهواء (غاز)', 343, '#38bdf8'], ['water', 'الماء (سائل)', 1480, '#2563eb'], ['iron', 'الحديد (صلب)', 5100, '#475569']];
  const D = { id: 'g8_s_media', page: 62, fig: 'ص 62',
    desc: 'إن انتقال الصوت خلال وسط مادي يحتاج إلى مدة زمنية، ومقدار سرعة الصوت S = d ÷ t. يعتمد على كثافة الوسط الناقل ومرونته: الصوت في المواد الصلبة أسرع منه في السائلة وأسرع منه في الغازات.',
    tags: 'سرعة الصوت انطلاق الصوت S = d/t كثافة الوسط مرونة صلبة سائلة غازية سباق الأذن على الأرض',
    steps: ['اضغط «اطرق» فتنطلق ثلاث نبضات صوتية في الوقت نفسه في: الهواء، الماء، الحديد.', 'راقب أيّها تصل أولاً إلى الكاشف في النهاية. اقرأ زمن الوصول t لكل وسط.', 'احسب S = d ÷ t لكل وسط، وغيّر المسافة d ولاحظ.', 'التفكير الناقد 4 (ص 66): إذا حاولت أن تسمع وقع أقدام، هل تضع أذنك على الأرض أو ترفع رأسك في الهواء؟ لماذا؟'],
    concl: ['مقدار سرعة الصوت = المسافة التي يقطعها الصوت ÷ الزمن المستغرق لقطعها (S = d/t).', 'يعتمد على: 1) كثافة الوسط الناقل (يقل انطلاق الصوت كلما زادت كثافة الوسط) 2) مرونة الوسط (يزداد في الأوساط ذات معامل المرونة الكبير).', 'لكبر معامل المرونة للمواد الصلبة فإن انطلاق الصوت فيها أكبر منه للمواد السائلة وأكبر منه للغازات؛ لذلك نسمع وقع الأقدام أسرع ونضع أذننا على الأرض.'],
    laws: ['g8_ssp'],
    controls: [R('d', 'المسافة d', 50, 1000, 340, 10, 'm'), BT('', [{ t: '🔨 اطرق (انطلاق الصوت)', on: S => D.go(S) }]), TG('lab', 'الحساب S = d/t', true, null, 'labels'), TG('part', 'جزيئات الوسط', true, null, 'dot')],
    setup(S) { S.run = 0; S.tt = 0; S.arr = {}; },
    go(S) { S.run = 1; S.tt = 0; S.arr = {}; if (window.Sound && Sound.noise) Sound.noise(.04, .3); },
    update(S, dt) { if (!S.run) return; const tmax = S.p.d / 343; S.tt += dt * tmax / 4; MED.forEach(m => { if (!S.arr[m[0]] && S.tt >= S.p.d / m[2]) { S.arr[m[0]] = S.p.d / m[2]; C1.good && m[0] === 'iron' && 0; } }); if (S.tt > tmax * 1.05) { S.tt = tmax; S.run = 0; } },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 44 : 150, x1 = w - (ph ? 40 : 70); const ys = MED.map((m, i) => h * (ph ? .36 : .3) + i * h * (ph ? .14 : .17)); return { w, h, ph, x0, x1, ys, th: ph ? 34 : 50 }; },
    draw(ctx, w, h, S) { const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { bench: false });
      Q25.banner(ctx, w, 'سباق الصوت في ثلاثة أوساط — اضغط «اطرق»', '#0d9488', 20);
      MED.forEach((m, i) => { const y = g.ys[i], x = g.x0 + (g.x1 - g.x0) * clamp(S.tt * m[2] / p.d, 0, 1);
        K.raw(ctx, () => { if (m[0] === 'iron') { const gr = ctx.createLinearGradient(0, y - g.th / 2, 0, y + g.th / 2); gr.addColorStop(0, '#cbd5e1'); gr.addColorStop(.5, '#64748b'); gr.addColorStop(1, '#334155'); ctx.fillStyle = gr; } else ctx.fillStyle = m[0] === 'water' ? 'rgba(37,99,235,.35)' : 'rgba(186,230,253,.45)';
          rr(ctx, g.x0, y - g.th / 2, g.x1 - g.x0, g.th, 6); ctx.fill(); ctx.strokeStyle = shade(m[3], -30); ctx.lineWidth = 1.5; ctx.stroke();
          if (p.part !== false) { const n = m[0] === 'air' ? 30 : m[0] === 'water' ? 70 : 110; ctx.fillStyle = m[0] === 'iron' ? 'rgba(255,255,255,.55)' : 'rgba(15,23,42,.45)'; for (let k = 0; k < n; k++) { const px = g.x0 + 6 + ((k * 97.13) % 1) * 0 + (k + .5) / n * (g.x1 - g.x0 - 12), py = y - g.th / 2 + 5 + ((k * 7) % 5) / 4 * (g.th - 10); const near = Math.abs(px - x) < 26 && S.tt > 0 ? 3 * Math.sin((px - x) / 4) : 0; ctx.beginPath(); ctx.arc(px + near, py, m[0] === 'air' ? 2 : 2.4, 0, TAU); ctx.fill(); } }
          if (S.tt > 0 && S.tt * m[2] / p.d <= 1.0001) { ctx.fillStyle = 'rgba(234,88,12,.85)'; ctx.fillRect(x - 5, y - g.th / 2, 10, g.th); }
          ctx.fillStyle = S.arr[m[0]] ? '#16a34a' : '#94a3b8'; ctx.beginPath(); ctx.arc(g.x1 + 16, y, 9, 0, TAU); ctx.fill(); });
        Q25.T(ctx, m[1], g.x0 + (g.ph ? 46 : 66), y - g.th / 2 - 11, { s: g.ph ? 10.5 : 12, w: 900, c: shade(m[3], -40) });
        Q25.T(ctx, S.arr[m[0]] ? 't = ' + Q25.nf(S.arr[m[0]], 3) + ' s' + (p.lab !== false ? ' ⟸ S = ' + p.d + ' ÷ ' + Q25.nf(S.arr[m[0]], 3) + ' = ' + m[2] + ' m/s' : '') : '…', g.x1 - (g.ph ? 90 : 150), y + g.th / 2 + 12, { s: g.ph ? 10 : 11.5, w: 900, c: '#0f766e' }); });
      // hammer at the start
      K.raw(ctx, () => { const hx = g.x0 - 14, a = S.run && S.tt < .03 * p.d / 343 ? .25 : -.5; ctx.save(); ctx.translate(hx, g.ys[1] + 40); ctx.rotate(a); ctx.fillStyle = '#92400e'; ctx.fillRect(-3, -60, 6, 70); ctx.fillStyle = '#334155'; rr(ctx, -14, -72, 28, 18, 4); ctx.fill(); ctx.restore(); ctx.fillStyle = '#475569'; ctx.fillRect(g.x0 - 6, g.ys[0] - g.th / 2, 6, g.ys[2] - g.ys[0] + g.th); });
      Q25.T(ctx, 'd = ' + p.d + ' m', Q25.cx(w), g.ys[2] + g.th / 2 + 34, { s: 12, w: 900, c: '#fff', bg: '#334155' });
      const done = Object.keys(S.arr).length;
      Q25.card(ctx, S, [{ t: done ? 'الأسرع: الحديد (صلب) ثم الماء ثم الهواء' : 'اضغط «اطرق» وراقب', c: '#b91c1c', w: 900 }, { t: 'مرونة كبيرة ⟸ انطلاق أكبر', c: '#0f766e', w: 900 }, { t: '(سرعات تقريبية عند 20°C)', c: '#64748b', s: 11 }], { title: 'S = d ÷ t', wd: 290, y: 44 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'hammer', x: g.x0 - 14, y: g.ys[1] + 10, w: 50, h: 80, tip: 'اضغط لتطرق', idle: 'اطرقني ✋', click: S => D.go(S) }]; },
    readings(S) { return MED.map(m => rd('زمن الوصول في ' + m[1], S.arr[m[0]] ? Q25.nf(S.arr[m[0]], 3) + ' s' : '—')).concat([rd('المسافة d', S.p.d + ' m')]); },
    record(S) { if (Object.keys(S.arr).length < 3) { Runner.toast('انتظر حتى تصل النبضات الثلاث', 'info'); return null; } return { d: S.p.d, a: +S.arr.air.toFixed(3), wv: +S.arr.water.toFixed(3), i: +S.arr.iron.toFixed(4) }; },
    cols: [['d', 'd (m)'], ['a', 't هواء (s)'], ['wv', 't ماء (s)'], ['i', 't حديد (s)']],
    explain(S) { return 'الصوت يحتاج <b>زمناً</b> ليقطع المسافة، و<b>S = d ÷ t</b>. وصل الصوت عبر <b>الحديد</b> أولاً، ثم الماء، ثم الهواء: لأن المواد الصلبة <b>معامل مرونتها كبير</b>. لهذا إذا أردت أن تسمع وقع أقدام بعيدة <b>ضع أذنك على الأرض</b> فيصلك الصوت أسرع وأوضح.'; }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'كان الناس قديماً يضعون آذانهم على سكة القطار ليعرفوا إن كان القطار قادماً قبل أن يسمعوه في الهواء.';
})();
(() => {
  const D = { id: 'g8_s_vacuum', page: 66, fig: 'التفكير الناقد 1 ص 66',
    desc: 'لماذا لا ينتقل الصوت في الفراغ؟ نضع جرساً كهربائياً يرن داخل ناقوس زجاجي، ونسحب الهواء منه بالمضخة تدريجياً: يضعف الصوت حتى نكاد لا نسمعه مع أن المطرقة ما زالت تضرب الجرس، لأن الصوت يحتاج إلى وسط مادي لينتقل.',
    tags: 'الصوت لا ينتقل في الفراغ ناقوس زجاجي جرس كهربائي مضخة تفريغ هواء وسط مادي',
    tools: ['ناقوس زجاجي', 'جرس كهربائي', 'مضخة تفريغ'],
    steps: ['اضغط على زر الجرس لتشغيله: تسمع رنينه وترى المطرقة تضرب الجرس.', 'اسحب مقبض المضخة (أو حرك منزلق «الهواء داخل الناقوس») لتسحب الهواء.', 'لاحظ: المطرقة ما زالت تضرب الجرس، لكن الصوت يضعف! لماذا؟', 'أعد إدخال الهواء: يعود الصوت.'],
    concl: ['الصوت لا ينتقل في الفراغ لأنه موجة طولية تحتاج إلى دقائق وسط مادي تتضاغط وتتخلخل.', 'الضوء ينتقل في الفراغ (نرى الجرس) لكن الصوت لا ينتقل (لا نسمعه).', 'لذلك لا يسمع رواد الفضاء بعضهم في الفضاء إلا عبر أجهزة الراديو (موجات كهرومغناطيسية).'],
    laws: ['g8_ssp', 'g8_em'],
    controls: [R('air', 'الهواء داخل الناقوس', 0, 100, 100, 1, '%'), BT('', [{ t: '🔔 شغّل / أوقف الجرس', on: S => D.ring(S) }, { t: '⤓ اسحب الهواء', on: S => { S.pump = -1; } }, { t: '⤒ أدخل الهواء', on: S => { S.pump = 1; } }]), TG('mol', 'جزيئات الهواء', true, null, 'dot'), TG('snd', 'سماع الرنين', true, null, 'wave'), TG('lab', 'التسميات', true, null, 'labels')],
    setup(S) { S.on = 0; S.pump = 0; S.rt = 0; S.hp = 0; },
    ring(S) { S.on = !S.on; S.rt = 0; },
    update(S, dt) { if (S.pump) { setParam(S, 'air', clamp(S.p.air + S.pump * dt * 25, 0, 100)); S.hp += dt * 6; if (S.p.air <= 0 || S.p.air >= 100) S.pump = 0; }
      if (S.on) { S.rt += dt; if (S.rt > .12) { S.rt = 0; if (S.p.snd !== false && S.p.air > 1) Q25.tone(1600 + Math.random() * 30, .1, { vol: .03 * Math.pow(S.p.air / 100, 1.5), type: 'triangle' }); } } },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, cx = ph ? w * .5 : 70 + (w - 70) * .42, by = h * .74, R = Math.min(ph ? w * .3 : 150, h * .24); return { w, h, ph, cx, by, R }; },
    draw(ctx, w, h, S) { const g = D.geo(S), p = S.p, a = p.air / 100; K.bg(ctx, w, h, { benchY: g.by + 30 });
      Q25.banner(ctx, w, 'شغّل الجرس ثم اسحب الهواء من الناقوس', '#0d9488', 20);
      // plate + pipe + pump
      K.raw(ctx, () => { ctx.fillStyle = '#475569'; rr(ctx, g.cx - g.R * 1.3, g.by, g.R * 2.6, 14, 4); ctx.fill(); ctx.fillStyle = '#334155'; ctx.fillRect(g.cx - 8, g.by + 14, 16, 16);
        ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(g.cx, g.by + 22); ctx.lineTo(g.cx + g.R * 1.6, g.by + 22); ctx.lineTo(g.cx + g.R * 1.6, g.by - 10); ctx.stroke();
        const px = g.cx + g.R * 1.6; ctx.fillStyle = '#dc2626'; rr(ctx, px - 18, g.by - 110, 36, 100, 6); ctx.fill(); const hy = g.by - 110 - 20 - 20 * Math.abs(Math.sin(S.hp)); ctx.fillStyle = '#9ca3af'; ctx.fillRect(px - 3, hy, 6, g.by - 110 - hy); ctx.fillStyle = '#111827'; rr(ctx, px - 24, hy - 8, 48, 10, 4); ctx.fill(); });
      // bell inside
      const bx = g.cx, byy = g.by - g.R * .55, hit = S.on && Math.sin(S.t * 52) > 0; K.raw(ctx, () => { ctx.fillStyle = '#334155'; ctx.fillRect(bx - 4, byy, 8, g.by - byy); const bg = ctx.createRadialGradient(bx - 8, byy - 10, 3, bx, byy, 34); bg.addColorStop(0, '#fef3c7'); bg.addColorStop(1, '#b45309'); ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(bx, byy, 30, Math.PI, TAU); ctx.lineTo(bx + 30, byy + 6); ctx.lineTo(bx - 30, byy + 6); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx + 46, byy + 20); ctx.lineTo(bx + (hit ? 30 : 38), byy - 8); ctx.stroke(); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(bx + (hit ? 30 : 38), byy - 8, 6, 0, TAU); ctx.fill(); ctx.fillStyle = '#64748b'; rr(ctx, bx + 36, byy + 14, 24, 28, 4); ctx.fill(); });
      // molecules
      if (p.mol !== false) K.raw(ctx, () => { const n = Math.round(90 * a); ctx.fillStyle = 'rgba(37,99,235,.6)'; for (let k = 0; k < n; k++) { const an = k * 2.399, rr2 = Math.sqrt((k + .5) / 90) * g.R * .92; const x = g.cx + Math.cos(an + S.t * .3 * (k % 3 - 1)) * rr2, y = g.by - g.R * .05 - Math.abs(Math.sin(an)) * rr2 * 1.1; ctx.beginPath(); ctx.arc(x + Math.sin(S.t * 9 + k) * 1.5, y, 2.4, 0, TAU); ctx.fill(); } });
      // jar
      K.raw(ctx, () => { const gg = ctx.createLinearGradient(g.cx - g.R, 0, g.cx + g.R, 0); gg.addColorStop(0, 'rgba(186,230,253,.35)'); gg.addColorStop(.3, 'rgba(255,255,255,.15)'); gg.addColorStop(1, 'rgba(125,211,252,.35)'); ctx.fillStyle = gg; ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(g.cx - g.R, g.by); ctx.lineTo(g.cx - g.R, g.by - g.R * .9); ctx.quadraticCurveTo(g.cx - g.R, g.by - g.R * 1.55, g.cx, g.by - g.R * 1.55); ctx.quadraticCurveTo(g.cx + g.R, g.by - g.R * 1.55, g.cx + g.R, g.by - g.R * .9); ctx.lineTo(g.cx + g.R, g.by); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#0ea5e9'; ctx.fillRect(g.cx - 10, g.by - g.R * 1.62, 20, 10); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(g.cx - g.R * .8, g.by - g.R * 1.1, 6, g.R * .8); });
      // outgoing sound arcs ∝ air
      if (S.on && a > .02) Q25.arcs(ctx, g.cx, g.by - g.R * .7, [0, 1, 2].map(k => g.R * 1.2 + ((S.t * 90 + k * 30) % 90)), Math.PI, .5, '#0d9488', a);
      if (p.lab !== false) { Q25.T(ctx, 'ناقوس زجاجي', g.cx, g.by - g.R * 1.62 - 16, { s: 12, w: 900, c: '#0369a1' }); Q25.T(ctx, 'مضخة تفريغ', g.cx + g.R * 1.6, g.by + 44, { s: 11.5, w: 900, c: '#fff', bg: '#b91c1c' }); Q25.T(ctx, 'جرس كهربائي', g.cx - 60, g.by - g.R * .55 - 40, { s: 11, w: 900, c: '#92400e' }); }
      const loud = S.on ? Math.round(100 * Math.pow(a, 1.5)) : 0;
      Q25.card(ctx, S, [{ t: 'الهواء داخل الناقوس: ' + p.air.toFixed(0) + '%', c: '#2563eb', w: 900 }, { t: S.on ? 'المطرقة تضرب الجرس ✓ (نراه بالضوء)' : 'الجرس متوقف', c: '#92400e', w: 900 }, { t: 'علو الصوت المسموع: ' + loud + '%', c: loud < 5 && S.on ? '#b91c1c' : '#0f766e', w: 900 }], { title: 'لماذا لا ينتقل الصوت في الفراغ؟', wd: 300, y: 44 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'bell', x: g.cx, y: g.by - g.R * .55, r: 40, tip: 'اضغط لتشغيل الجرس', idle: 'شغّلني ✋', click: S => D.ring(S) },
      { id: 'pump', x: g.cx + g.R * 1.6, y: g.by - 140, w: 60, h: 50, axis: 'y', keep: true, tip: 'اسحب مقبض المضخة للأعلى والأسفل لتسحب الهواء', hint: false, drag: (S, d) => { S.hp += Math.abs(d.dy) * .05; setParam(S, 'air', clamp(S.p.air - Math.abs(d.dy) * .25, 0, 100)); } }]; },
    readings(S) { return [rd('الهواء داخل الناقوس', S.p.air.toFixed(0) + '%'), rd('الجرس', S.on ? 'يرن (المطرقة تضرب)' : 'متوقف'), rd('علو الصوت المسموع', (S.on ? Math.round(100 * Math.pow(S.p.air / 100, 1.5)) : 0) + '%')]; },
    explain(S) { return S.p.air < 5 ? 'الناقوس شبه <b>مفرغ</b>: المطرقة تضرب الجرس ونراها (الضوء ينتقل في الفراغ) لكن <b>لا نسمع شيئاً تقريباً</b>، لأنه لا توجد جزيئات هواء تنقل التضاغطات والتخلخلات. <b>الصوت لا ينتقل في الفراغ</b>.' : 'كلما سحبنا الهواء قلّت الجزيئات التي تنقل اهتزاز الجرس إلى الزجاج ثم إلينا، فيضعف الصوت.'; }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'في الفضاء لا يوجد هواء، لذلك يتحدث رواد الفضاء مع بعضهم بأجهزة الراديو داخل خوذهم.';
})();
(() => {
  const D = { id: 'g8_s_temp', page: 63, fig: 'مثال 1 ص 63',
    desc: 'يختلف مقدار انطلاق الصوت في الهواء باختلاف درجة الحرارة، إذ يزداد بمعدل 0.6 m/s لكل درجة سيليزية واحدة نتيجة لزيادة حركة جزيئات الهواء: S = 331 + 0.6 T. مثال 1: احسب مقدار انطلاق الصوت عند درجة حرارة 30°C.',
    tags: 'سرعة الصوت درجة الحرارة S = 331 + 0.6T مثال 1 331 m/s 349 m/s حركة جزيئات الهواء',
    steps: ['اسحب المحرار (أو المنزلق) لتغيّر درجة حرارة الهواء T.', 'لاحظ: جزيئات الهواء تتحرك أسرع عند ارتفاع درجة الحرارة.', 'اقرأ الحل خطوة بخطوة: S = 331 + 0.6 × T.', 'مثال 1 (الكتاب): اضغط «مثال 1: 30°C» ⟸ S = 349 m/s.', 'سجّل S لعدة درجات حرارة وارسم العلاقة.'],
    concl: ['331 m/s يمثل انطلاق الصوت في الهواء في درجة الصفر السيليزي.', 'يزداد انطلاق الصوت في الهواء 0.6 m/s لكل ارتفاع درجة سيليزية واحدة.', 'مثال 1: S = 331 + 0.6 × 30 = 349 m/s.'],
    laws: ['g8_stemp', 'g8_ssp'],
    controls: [R('T', 'درجة حرارة الهواء T', -20, 50, 30, 1, '°C'), BT('', [{ t: '📘 مثال 1: 30°C', on: S => setParam(S, 'T', 30) }, { t: '0°C', on: S => setParam(S, 'T', 0) }, { t: '🔊 أطلق صوتاً', on: S => { S.st = 0; S.go = 1; } }]), TG('mol', 'جزيئات الهواء', true, null, 'dot'), TG('sol', 'خطوات الحل', true, null, 'labels')],
    setup(S) { S.st = 0; S.go = 1; S.ms = Array.from({ length: 60 }, (_, i) => ({ x: (i * 0.618) % 1, y: (i * 0.377) % 1, a: i * 2.4 })); },
    sp(S) { return 331 + .6 * S.p.T; },
    update(S, dt) { if (S.go) { S.st += dt; if (S.st > 1) { S.st = 1; S.go = 0; } } const v = Math.sqrt((S.p.T + 273) / 273) * .35; S.ms.forEach(m => { m.x += Math.cos(m.a) * v * dt; m.y += Math.sin(m.a) * v * dt; if (m.x < 0 || m.x > 1) { m.a = Math.PI - m.a; m.x = clamp(m.x, 0, 1); } if (m.y < 0 || m.y > 1) { m.a = -m.a; m.y = clamp(m.y, 0, 1); } }); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600; return { w, h, ph, tx: ph ? 40 : 110, tb: h * .78, th: h * .5, bx: ph ? 70 : 170, bw: (w - (ph ? 90 : 200)) * (ph ? 1 : .5), by: h * .32, bh: h * .3 }; },
    draw(ctx, w, h, S) { const g = D.geo(S), p = S.p, s = D.sp(S); K.bg(ctx, w, h, { benchY: h * .86 });
      Q25.banner(ctx, w, 'اسحب المحرار لتغيّر درجة الحرارة ✋', '#0d9488', 20);
      K.thermo(ctx, g.tx, g.tb, g.th, p.T, -20, 50, { step: 10 });
      if (p.mol !== false) { C2.card(ctx, g.bx, g.by, g.bw, g.bh, { bd: p.T > 25 ? '#ef4444' : p.T < 5 ? '#3b82f6' : '#94a3b8' }); K.raw(ctx, () => { ctx.fillStyle = p.T > 25 ? '#ef4444' : p.T < 5 ? '#3b82f6' : '#64748b'; S.ms.forEach(m => { ctx.beginPath(); ctx.arc(g.bx + 8 + m.x * (g.bw - 16), g.by + 8 + m.y * (g.bh - 16), 4, 0, TAU); ctx.fill(); }); }); Q25.T(ctx, 'جزيئات الهواء عند ' + p.T + ' °C', g.bx + g.bw / 2, g.by - 12, { s: 11.5, w: 900, c: '#334155' }); }
      // distance travelled in 1 s
      const ry = h * .74, x0 = g.bx, x1 = w - 30, sc = (x1 - x0) / 370; K.raw(ctx, () => { ctx.fillStyle = '#e2e8f0'; ctx.fillRect(x0, ry - 6, x1 - x0, 12); ctx.fillStyle = '#ea580c'; ctx.fillRect(x0, ry - 6, s * sc * S.st, 12); ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; for (let m = 0; m <= 350; m += 50) { const x = x0 + m * sc; ctx.beginPath(); ctx.moveTo(x, ry + 6); ctx.lineTo(x, ry + 12); ctx.stroke(); } });
      for (let m = 0; m <= 350; m += (g.ph ? 100 : 50)) Q25.T(ctx, m + ' m', x0 + m * sc, ry + 22, { s: 10, w: 800, c: '#334155' });
      Q25.T(ctx, 'المسافة التي يقطعها الصوت في 1 s = ' + Q25.nf(s, 4) + ' m', (x0 + x1) / 2, ry - 20, { s: 12, w: 900, c: '#c2410c' });
      if (p.sol !== false) Q25.card(ctx, S, [{ t: 'S = 331 + 0.6 T', c: '#7c3aed', w: 900 }, { t: 'S = 331 + 0.6 × ' + p.T, c: '#1e293b', w: 800 }, { t: 'S = 331 + ' + Q25.nf(.6 * p.T, 3) + ' = ' + Q25.nf(s, 4) + ' m/s', c: '#b91c1c', w: 900 }, p.T === 30 ? { t: '✓ هذا حل مثال 1 في الكتاب', c: '#15803d', w: 900 } : null], { title: p.T === 30 ? 'مثال 1 (ص 63)' : 'انطلاق الصوت في الهواء', wd: 280, y: 44 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), k = (S.p.T + 20) / 70, yT = g.tb - 14 - (g.th - 26) * k; return [{ id: 'thermo', x: g.tx, y: yT, w: 50, h: 50, axis: 'y', keep: true, tip: 'اسحب لتغيّر درجة الحرارة', idle: 'اسحبني ✋', drag: (S, d) => setParam(S, 'T', Math.round(-20 + 70 * clamp((g.tb - 14 - d.y) / (g.th - 26), 0, 1))) }]; },
    readings(S) { return [rd('درجة الحرارة T', S.p.T + ' °C'), rd('انطلاق الصوت S', Q25.nf(D.sp(S), 4) + ' m/s'), rd('الزيادة عن 0°C', Q25.nf(.6 * S.p.T, 3) + ' m/s')]; },
    record(S) { return { T: S.p.T, S: +D.sp(S).toFixed(1) }; }, cols: [['T', 'T (°C)'], ['S', 'S (m/s)']], graph: { x: 'T', y: 'S', xl: 'درجة الحرارة T (°C)', yl: 'انطلاق الصوت S (m/s)', theory: x => 331 + .6 * x },
    explain(S) { return 'عند ' + S.p.T + ' °C: <b>S = 331 + 0.6 × ' + S.p.T + ' = ' + Q25.nf(D.sp(S), 4) + ' m/s</b>. كلما ارتفعت درجة الحرارة تتحرك جزيئات الهواء <b>أسرع</b> فتنقل الاهتزاز بسرعة أكبر، فيزداد انطلاق الصوت 0.6 m/s لكل درجة.'; }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'في صيف العراق الحار (45°C) يسير الصوت أسرع (≈ 358 m/s) منه في ليالي الشتاء الباردة.';
})();
/* =========================================================================================
   6) الدرس 2 (ص 63–64): انعكاس الموجات الصوتية والصدى — شكل 2، مثال 2، س4، فوائد الصدى
   ========================================================================================= */
Q25.ECHO = {
  /* shared scene: boy at left shouting toward a wall at distance d (m); S.e = {t0, run}; v (m/s) */
  geo(S, d) { const w = S.W, h = S.H, ph = w < 600, gy = h * .78, bx = ph ? 54 : 130, wx1 = w - (ph ? 30 : 60), dmax = Math.max(40, d * 1.1), sc = (wx1 - 40 - bx - 30) / dmax; return { w, h, ph, gy, bx, wx: bx + 30 + d * sc, sc, my: gy - (ph ? 120 : 150) }; },
  slow(S, d, v) { const T = 2 * d / v; return T < 1.6 ? T / 1.6 : 1; },
  shout(S, d, v) { S.e = { t0: S.tt, d, v, k: Q25.ECHO.slow(S, d, v), heard: 0 }; if (S.p.snd !== false) { Q25.tone(520, .25, { vol: .06, type: 'sawtooth' }); setTimeout(() => Q25.tone(520, .25, { vol: .025, type: 'sawtooth' }), 2 * d / v * 1000); } },
  draw(ctx, S, d, v, o = {}) { const E = Q25.ECHO, g = E.geo(S, d), e = S.e;
    K.raw(ctx, () => { const sk = ctx.createLinearGradient(0, 0, 0, g.gy); sk.addColorStop(0, '#e0f2fe'); sk.addColorStop(1, '#f0fdf4'); ctx.fillStyle = sk; ctx.fillRect(0, 0, g.w, g.gy); ctx.fillStyle = '#a3a3a3'; ctx.fillRect(0, g.gy, g.w, g.h - g.gy); ctx.fillStyle = '#65a30d'; ctx.fillRect(0, g.gy, g.w, 6); });
    Q25.wall(ctx, g.wx, g.gy - (g.ph ? 200 : 260), g.gy, g.ph ? 22 : 34);
    const sh = e && (S.tt - e.t0) * e.k < .35; const s = g.ph ? .62 : .8;
    Q23.man(ctx, { hip: [g.bx, g.gy - 96 * s], dir: 1, s, shirt: '#38bdf8', pants: '#7c3aed', cap: '#16a34a', hands: sh ? [[g.bx + 24 * s, g.gy - 96 * s - 64 * s], [g.bx + 20 * s, g.gy - 96 * s - 60 * s]] : null, strain: sh });
    const mx = g.bx + 22 * s, my = g.gy - 96 * s - 66 * s;
    if (e && o.waves !== false) { const tv = (S.tt - e.t0) * e.k, R = v * tv * g.sc, dd = (g.wx - mx), arcs = [];
      for (let k = 0; k < 4; k++) { const r = R - k * 16; if (r > 4 && r < dd) arcs.push(r); }
      Q25.arcs(ctx, mx, my, arcs, 0, .55, '#0d9488', 1);
      const rr2 = []; for (let k = 0; k < 4; k++) { const r = R - k * 16; if (r > dd && r < 2 * dd + 40) rr2.push(r); } Q25.arcs(ctx, 2 * g.wx - mx, my, rr2, Math.PI, .55, '#dc2626', 1); }
    // distance arrow
    K.raw(ctx, () => { const y = g.gy + 22; G.arrow(ctx, (g.bx + g.wx) / 2, y, g.bx, y, '#334155', 1.8, 7); G.arrow(ctx, (g.bx + g.wx) / 2, y, g.wx, y, '#334155', 1.8, 7); });
    Q25.T(ctx, 'd = ' + Q25.nf(d, 4) + ' m', (g.bx + g.wx) / 2, g.gy + 38, { s: 12.5, w: 900, c: '#fff', bg: '#334155' });
    if (o.min !== false && 17 * g.sc + g.bx + 30 < g.wx - 10) { const x17 = g.bx + 30 + 17 * g.sc; K.raw(ctx, () => { ctx.setLineDash([5, 4]); ctx.strokeStyle = '#ea580c'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x17, g.gy - 40); ctx.lineTo(x17, g.gy); ctx.stroke(); ctx.setLineDash([]); }); Q25.T(ctx, '17 m', x17, g.gy - 50, { s: 10.5, w: 900, c: '#c2410c' }); }
    if (e && e.k < 1) Q25.T(ctx, 'عرض بطيء', g.wx - 60, g.my - 40, { s: 11, w: 900, c: '#fff', bg: '#64748b' });
    return g; },
  /* timeline: sound at 0, echo at t; threshold 0.1 s */
  timeline(ctx, S, x, y, wd, t) { const tmax = Math.max(.3, t * 1.25), X = q => x + wd * q / tmax; C2.card(ctx, x - 10, y - 28, wd + 20, 66, { bd: '#0d9488' });
    K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y + 10); ctx.lineTo(x + wd, y + 10); ctx.stroke(); ctx.fillStyle = 'rgba(234,88,12,.18)'; ctx.fillRect(x, y - 8, X(.1) - x, 22);
      ctx.fillStyle = '#0d9488'; ctx.fillRect(x - 3, y - 12, 6, 22); ctx.fillStyle = '#dc2626'; ctx.fillRect(X(t) - 3, y - 12, 6, 22); });
    Q25.T(ctx, 'الصوت', x + 4, y - 18, { s: 10.5, w: 900, c: '#0f766e' }); Q25.T(ctx, 'الصدى t = ' + Q25.nf(t, 3) + ' s', X(t), y + 24, { s: 10.5, w: 900, c: '#b91c1c' }); Q25.T(ctx, '0.1 s', X(.1), y - 18, { s: 10, w: 900, c: '#c2410c' }); }
};
(() => {
  const E = Q25.ECHO;
  const D = { id: 'g8_e_echo', page: 63, fig: 'شكل 2 ص 63',
    desc: 'الموجات الصوتية عندما تصل إلى حاجز كالبنايات أو جبل فإنها ترتد عنه إلى الوسط نفسه (الانعكاس). الصدى ظاهرة تكرار سماع الصوت الناشئ عن انعكاس الموجات الصوتية. شرطاه: أقل مدة زمنية بين سماع الصوت وصداه 0.1 s، ووجود سطح عاكس. أقل مسافة يحصل عندها صدى مسموع 17 m.',
    tags: 'انعكاس الموجات الصوتية الصدى شكل 2 جدار 17 m 0.1 s شرطا الصدى',
    steps: ['اضغط على الولد (أو «اصرخ») ليصيح أمام الجدار. راقب الموجات تذهب إلى الجدار وترتد عنه (الأحمر).', 'اقرأ الزمن بين سماع الصوت وصداه على الخط الزمني: t = 2d ÷ S.', 'اسحب الجدار ليقترب: عند أي مسافة يصبح الزمن أقل من 0.1 s فلا نميّز الصدى؟', 'تحقق: أقل مسافة يحصل عندها صدى مسموع = 17 m.', 'سؤال ص 63: ما الصدى؟'],
    concl: ['الانعكاس صفة عامة لجميع الموجات: الموجات الصوتية ترتد عن الحاجز إلى الوسط نفسه.', 'الصدى: ظاهرة تكرار سماع الصوت الناشئ عن انعكاس الموجات الصوتية.', 'شرطا الصدى: 1) أن تكون أقل مدة زمنية بين سماع الصوت وصداه 0.1 s. 2) وجود سطح أو جدار عاكس للموجات الصوتية.', 'أقل مسافة يحصل عندها صدى مسموع عن سطح عاكس هي 17 m (340 × 0.1 ÷ 2).'],
    laws: ['g8_echo', 'g8_ssp'],
    controls: [R('d', 'بعد الجدار d', 5, 400, 60, 1, 'm'), R('v', 'مقدار سرعة الصوت S', 330, 360, 340, 1, 'm/s'), BT('', [{ t: '📣 اصرخ', on: S => E.shout(S, S.p.d, S.p.v) }, { t: '17 m', on: S => setParam(S, 'd', 17) }]), TG('snd', 'سماع الصوت والصدى', true, null, 'wave'), TG('waves', 'الموجات الذاهبة والمنعكسة', true, null, 'wave'), TG('tl', 'الخط الزمني', true, null, 'graph')],
    setup(S) { S.tt = 0; S.e = null; }, update(S, dt) { S.tt += dt; },
    draw(ctx, w, h, S) { const p = S.p; G.bg(ctx, w, h, false); E.draw(ctx, S, p.d, p.v, { waves: p.waves !== false }); Q25.banner(ctx, w, 'اضغط على الولد ليصيح، واسحب الجدار ✋', '#0d9488', 20);
      const t = 2 * p.d / p.v, ok = t >= .1; if (p.tl !== false) { const ph = w < 600; E.timeline(ctx, S, ph ? 30 : 100, ph ? 210 : 82, ph ? w - 60 : Math.min(400, w * .38 - 60), t); }
      Q25.card(ctx, S, [{ t: 't = 2d ÷ S = 2 × ' + p.d + ' ÷ ' + p.v + ' = ' + Q25.nf(t, 3) + ' s', c: '#0f766e', w: 900 }, { t: ok ? '✓ t ≥ 0.1 s: نسمع الصدى منفصلاً' : '✗ t < 0.1 s: يختلط الصدى بالصوت', c: ok ? '#15803d' : '#b91c1c', w: 900 }, { t: 'أقل مسافة للصدى = ' + Q25.nf(p.v * .1 / 2, 3) + ' m', c: '#c2410c', w: 900 }], { title: 'الصدى', wd: 300, y: 44 }); },
    drags(S) { if (!S.W) return []; const g = E.geo(S, S.p.d); return [{ id: 'wall', x: g.wx + 15, y: g.gy - 110, w: 50, h: 200, axis: 'x', keep: true, tip: 'اسحب الجدار لتغيّر بعده', hint: false, drag: (S, d) => setParam(S, 'd', Math.round(clamp((d.x - 15 - g.bx - 30) / g.sc, 5, 400))) },
      { id: 'boy', x: g.bx, y: g.gy - 90, w: 70, h: 170, tip: 'اضغط ليصيح الولد', idle: 'اضغطني لأصيح ✋', click: S => E.shout(S, S.p.d, S.p.v) }]; },
    readings(S) { const t = 2 * S.p.d / S.p.v; return [rd('بعد الجدار d', S.p.d + ' m'), rd('زمن الذهاب والإياب t', Q25.nf(t, 3) + ' s'), rd('هل يُسمع الصدى؟', t >= .1 ? 'نعم' : 'لا (أقل من 0.1 s)'), rd('أقل مسافة للصدى', Q25.nf(S.p.v * .05, 3) + ' m')]; },
    record(S) { return { d: S.p.d, t: +(2 * S.p.d / S.p.v).toFixed(3), e: 2 * S.p.d / S.p.v >= .1 ? 'نعم' : 'لا' }; }, cols: [['d', 'd (m)'], ['t', 't (s)'], ['e', 'صدى مسموع؟']],
    explain(S) { const t = 2 * S.p.d / S.p.v; return 'الصوت يذهب إلى الجدار ويرتد (<b>انعكاس</b>) فيقطع مسافة <b>2d</b>. الزمن بين الصوت وصداه t = 2d ÷ S = <b>' + Q25.nf(t, 3) + ' s</b>. ' + (t >= .1 ? 'وهو أكبر من 0.1 s فتميّز الأذن <b>الصدى</b>.' : 'وهو أقل من 0.1 s فلا تميّز الأذن الصدى عن الصوت الأصلي (يبدو الصوت أطول فقط).'); }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'عندما تصيح في وادٍ بين جبلين أو في قاعة فارغة كبيرة تسمع صوتك يتكرر.';
})();
(() => {
  const E = Q25.ECHO;
  const CASES = { ex2: { n: 'مثال 2 (ص 63): 360 m و 2 s', d: 360, t: 2 }, q4: { n: 'س4 (ص 69): 340 m و 2 s', d: 340, t: 2 }, own: { n: 'قياساتك أنت', d: 100, t: null } };
  const D = { id: 'g8_e_examples', page: 63, fig: 'مثال 2 ص 63 + س4 ص 69',
    desc: 'مثال 2: ما مقدار سرعة صوت يرسله شخص يقف أمام حاجز يبعد عنه 360 m فسمع صداه بعد مدة زمنية 2 s؟ — س4: شخص يقف أمام حاجز يبعد عنه 340 m يرسل صوتاً في الهواء فإذا سمع صوت الإطلاقة بعد 2 s احسب: أ. سرعة الصوت أنذاك ب. درجة الحرارة.',
    tags: 'مثال 2 س4 الصدى سرعة الصوت 360 m 340 m 2 s درجة الحرارة 15',
    steps: ['اختر المسألة: مثال 2 أو س4، أو «قياساتك أنت».', 'اضغط على الشخص ليرسل الصوت، وساعة الإيقاف تقيس الزمن حتى يُسمع الصدى.', 'اضغط «الخطوة التالية» لترى الحل خطوة بخطوة. تذكّر: الزمن t يمثل زمن ذهاب وإياب الصوت، فالمسافة الكلية 2d.', 'في س4 احسب درجة الحرارة من S = 331 + 0.6 T.'],
    concl: ['مثال 2: S = d ÷ (t/2) = 360 ÷ (2 × ½) = 360 m/s.', 'س4: S = 340 ÷ 1 = 340 m/s ، و T = (340 − 331) ÷ 0.6 = 15 °C.', 'الزمن المقيس في الصدى يمثل زمن ذهاب الصوت وإيابه.'],
    laws: ['g8_echo', 'g8_stemp'],
    controls: [SEL('cs', 'المسألة', Object.keys(CASES).map(k => [k, CASES[k].n]), 'ex2', (v, S) => { const c = CASES[v]; setParam(S, 'd', c.d, false); S.step = 0; S.e = null; S.meas = null; }), R('d', 'بعد الحاجز d', 20, 600, 360, 5, 'm'), R('T', 'درجة حرارة الهواء (لقياساتك)', 0, 40, 20, 1, '°C'),
      BT('', [{ t: '📣 أرسل الصوت', on: S => D.go(S) }, { t: '▶ الخطوة التالية', on: S => { S.step = Math.min(4, (S.step || 0) + 1); } }, { t: '↺', on: S => { S.step = 0; } }]), TG('snd', 'سماع الصوت والصدى', true, null, 'wave')],
    setup(S) { S.tt = 0; S.e = null; S.step = 0; S.meas = null; },
    v(S) { const c = CASES[S.p.cs]; return c.t ? 2 * c.d / c.t : 331 + .6 * S.p.T; },
    dd(S) { const c = CASES[S.p.cs]; return c.t ? c.d : S.p.d; },
    go(S) { const d = D.dd(S), v = D.v(S); E.shout(S, d, v); S.e.k = 1; S.meas = null; },
    update(S, dt) { S.tt += dt; if (S.e && S.meas == null && S.tt - S.e.t0 >= 2 * S.e.d / S.e.v) { S.meas = 2 * S.e.d / S.e.v; } },
    draw(ctx, w, h, S) { const p = S.p, c = CASES[p.cs], d = D.dd(S), v = D.v(S); G.bg(ctx, w, h, false); const g = E.draw(ctx, S, d, v, { min: false }); Q25.banner(ctx, w, c.n + ' — اضغط على الشخص', '#0d9488', 20);
      const run = S.e ? (S.meas ?? (S.tt - S.e.t0)) : 0; Q23.watch && Q23.watch(ctx, g.bx + (g.ph ? 70 : 110), g.my - 30, g.ph ? 24 : 32, run);
      Q25.T(ctx, 't = ' + Q25.nf(run, 3) + ' s', g.bx + (g.ph ? 70 : 110), g.my + (g.ph ? 6 : 14), { s: 12, w: 900, c: '#fff', bg: S.meas != null ? '#15803d' : '#334155' });
      const t = c.t || S.meas; const st = S.step || 0; const L = [{ t: 'المعطيات: d = ' + d + ' m ، t = ' + (t ? Q25.nf(t, 3) + ' s' : '؟ (أرسل الصوت)'), c: '#334155', w: 900 }];
      if (st >= 1) L.push({ t: 'الزمن t زمن ذهاب وإياب ⟸ زمن الذهاب = t ÷ 2', c: '#7c3aed', w: 800 });
      if (st >= 2 && t) L.push({ t: 'S = d ÷ (t/2) = ' + d + ' ÷ (' + Q25.nf(t, 3) + ' × ½)', c: '#1e293b', w: 800 });
      if (st >= 3 && t) L.push({ t: 'S = ' + Q25.nf(2 * d / t, 4) + ' m/s', c: '#b91c1c', w: 900 });
      if (st >= 4 && t && S.p.cs !== 'ex2') { const S2 = 2 * d / t; L.push({ t: 'T = (S − 331) ÷ 0.6 = (' + Q25.nf(S2, 4) + ' − 331) ÷ 0.6 = ' + Q25.nf((S2 - 331) / .6, 3) + ' °C', c: '#c2410c', w: 900 }); }
      if (st < 4) L.push({ t: 'اضغط «الخطوة التالية»', c: '#0d9488', w: 700, s: 11 });
      Q25.card(ctx, S, L, { title: 'الحل', wd: 360, y: 44 }); },
    drags(S) { if (!S.W) return []; const g = E.geo(S, D.dd(S)); return [{ id: 'man', x: g.bx, y: g.gy - 90, w: 70, h: 170, tip: 'اضغط ليرسل الشخص الصوت', idle: 'اضغطني ✋', click: S => D.go(S) },
      { id: 'wall', x: g.wx + 15, y: g.gy - 110, w: 50, h: 200, axis: 'x', keep: true, hint: false, tip: 'اسحب الحاجز (في «قياساتك أنت»)', drag: (S, dd) => { if (S.p.cs === 'own') setParam(S, 'd', Math.round(clamp((dd.x - 15 - g.bx - 30) / g.sc, 20, 600))); else C2.msg(S, 'اختر «قياساتك أنت» لتحريك الحاجز', 2); } }]; },
    readings(S) { const d = D.dd(S), t = CASES[S.p.cs].t || S.meas; return [rd('d', d + ' m'), rd('t (ذهاب وإياب)', t ? Q25.nf(t, 3) + ' s' : '—'), rd('S = 2d/t', t ? Q25.nf(2 * d / t, 4) + ' m/s' : '—'), S.p.cs !== 'ex2' ? rd('T = (S−331)/0.6', t ? Q25.nf((2 * d / t - 331) / .6, 3) + ' °C' : '—') : null].filter(Boolean); },
    record(S) { const d = D.dd(S), t = CASES[S.p.cs].t || S.meas; if (!t) { Runner.toast('أرسل الصوت أولاً', 'info'); return null; } return { c: CASES[S.p.cs].n, d, t: +t.toFixed(3), s: +(2 * d / t).toFixed(1) }; }, cols: [['c', 'المسألة'], ['d', 'd (m)'], ['t', 't (s)'], ['s', 'S (m/s)']],
    explain(S) { const p = S.p; if (p.cs === 'ex2') return 'مثال 2: الصوت يذهب 360 m إلى الحاجز ويعود 360 m خلال <b>2 s</b>، فزمن الذهاب وحده <b>1 s</b>: S = 360 ÷ 1 = <b>360 m/s</b>.'; if (p.cs === 'q4') return 'س4: S = 340 ÷ (2 × ½) = <b>340 m/s</b>. ومن S = 331 + 0.6 T: 340 = 331 + 0.6 T ⟸ T = 9 ÷ 0.6 = <b>15 °C</b>.'; return 'أرسل الصوت وقس الزمن، ثم احسب S = 2d ÷ t، وقارنه بالقانون S = 331 + 0.6 T.'; }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'بالطريقة نفسها يقدّر المتسلقون عرض الوادي: يصيحون ويقيسون زمن الصدى.';
})();
(() => {
  const SC = { sea: 'قياس أعماق البحار', fish: 'تحديد بعد الأسماك عن سطح الماء', hall: 'تقليل الصدى في القاعات والاستوديوهات' };
  const VW = 1500;
  const D = { id: 'g8_e_uses', page: 64, fig: 'صور ص 64',
    desc: 'للصدى فوائد ومضار: يستثمر الصدى لقياس أعماق البحار، وتحديد بعد الأسماك في البحر عن سطح الماء، والتنقيب عن المعادن والنفط في طبقات الأرض. وللتقليل من تأثير الصدى في الاستوديوهات والمسارح والقاعات الكبيرة تستخدم ألواح ماصة للصوت من الفلين أو الجبس توضع على سقوف وجدران تلك القاعات.',
    tags: 'فوائد الصدى مضار الصدى قياس أعماق البحار الأسماك السونار ألواح ماصة للصوت فلين جبس استوديو مسرح قاعة',
    steps: ['اختر التطبيق: قياس عمق البحر، أو تحديد بعد الأسماك، أو القاعة.', 'في البحر: اضغط على السفينة لترسل نبضة صوتية، وراقب زمن عودة الصدى. العمق = (السرعة × الزمن) ÷ 2.', 'غيّر عمق البحر أو اسحب سرب الأسماك.', 'في القاعة: اضغط على المتحدث وراقب الأصوات المنعكسة الكثيرة، ثم فعّل «ألواح ماصة للصوت» وقارن.'],
    concl: ['يستثمر الصدى لقياس أعماق البحار وتحديد بعد الأسماك عن سطح الماء والتنقيب عن المعادن والنفط.', 'العمق = (مقدار سرعة الصوت في الماء × زمن الذهاب والإياب) ÷ 2.', 'الصدى المتكرر في القاعات الكبيرة مزعج، لذلك تستعمل ألواح ماصة للصوت من الفلين أو الجبس على السقوف والجدران.'],
    laws: ['g8_echo'],
    controls: [SEL('sc', 'التطبيق', Object.keys(SC).map(k => [k, SC[k]]), 'sea', (v, S) => { S.ping = null; S.ref = []; }), R('dep', 'عمق البحر', 200, 3000, 1500, 50, 'm'), TG('pan', 'ألواح ماصة للصوت (القاعة)', false, null, 'eye'), TG('lab', 'الحساب', true, null, 'labels')],
    setup(S) { S.tt = 0; S.ping = null; S.fd = .45; S.fx = .62; S.ref = []; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600; return { w, h, ph, sy: h * .3, by: h * .86, sx: ph ? w * .4 : 70 + (w - 70) * .4 }; },
    target(S, g) { const fish = S.p.sc === 'fish'; const depth = fish ? S.p.dep * S.fd : S.p.dep; const y = g.sy + (g.by - g.sy) * (fish ? S.fd : 1); return { depth, y }; },
    go(S) { S.ping = { t0: S.tt }; if (S.p.sc === 'hall') { S.ref = []; for (let k = 0; k < 14; k++) S.ref.push({ t: .05 + k * .09, a: Math.pow(S.p.pan ? .3 : .8, k) }); } Q25.tone(S.p.sc === 'hall' ? 400 : 1200, .12, { vol: .05 }); },
    update(S, dt) { S.tt += dt; },
    draw(ctx, w, h, S) { const g = D.geo(S), p = S.p;
      if (p.sc === 'hall') return D.hall(ctx, w, h, S, g);
      G.bg(ctx, w, h, false); const tg = D.target(S, g);
      K.raw(ctx, () => { ctx.fillStyle = '#e0f2fe'; ctx.fillRect(0, 0, w, g.sy); const sea = ctx.createLinearGradient(0, g.sy, 0, g.by); sea.addColorStop(0, '#0ea5e9'); sea.addColorStop(1, '#0c4a6e'); ctx.fillStyle = sea; ctx.fillRect(0, g.sy, w, g.by - g.sy);
        ctx.fillStyle = '#a16207'; ctx.beginPath(); ctx.moveTo(0, g.by); for (let x = 0; x <= w; x += 20) ctx.lineTo(x, g.by - 8 * Math.sin(x / 50)); ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.fill();
        // ship
        const sx = g.sx; ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.moveTo(sx - 80, g.sy - 22); ctx.lineTo(sx + 90, g.sy - 22); ctx.lineTo(sx + 66, g.sy + 6); ctx.lineTo(sx - 64, g.sy + 6); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#e2e8f0'; ctx.fillRect(sx - 40, g.sy - 50, 70, 28); ctx.fillStyle = '#64748b'; ctx.fillRect(sx - 20, g.sy - 74, 10, 24); ctx.fillStyle = '#0ea5e9'; for (let k = 0; k < 4; k++) ctx.fillRect(sx - 34 + k * 16, g.sy - 44, 9, 9);
        ctx.fillStyle = '#facc15'; ctx.fillRect(sx - 6, g.sy + 6, 12, 8);
        if (p.sc === 'fish') { const fx = 70 + (w - 70) * S.fx; ctx.fillStyle = '#fbbf24'; for (let k = 0; k < 12; k++) { const x = fx + ((k * 37) % 70) - 35, y = tg.y + ((k * 23) % 30) - 15 + Math.sin(S.tt * 2 + k) * 2; ctx.beginPath(); ctx.ellipse(x, y, 9, 4, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.moveTo(x - 8, y); ctx.lineTo(x - 14, y - 4); ctx.lineTo(x - 14, y + 4); ctx.fill(); } } });
      // pulse
      let t = null; if (S.ping) { const T = 2 * tg.depth / VW, el = (S.tt - S.ping.t0) * (T > 2 ? T / 2 : 1); const fr = el / T; const y = fr < .5 ? g.sy + 14 + (tg.y - g.sy - 14) * fr * 2 : tg.y - (tg.y - g.sy - 14) * (fr - .5) * 2;
        if (fr <= 1) K.raw(ctx, () => { ctx.strokeStyle = fr < .5 ? '#fde047' : '#f87171'; ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(g.sx, y + (fr < .5 ? -k * 9 : k * 9), 26 - k * 4, 6, 0, 0, TAU); ctx.stroke(); } }); if (fr >= 1) t = T; else t = null; S._el = Math.min(el, T); }
      Q25.banner(ctx, w, 'اضغط على السفينة لترسل نبضة صوتية' + (p.sc === 'fish' ? '، واسحب سرب الأسماك' : ''), '#0d9488', 20);
      const T = 2 * tg.depth / VW;
      if (p.lab !== false) Q25.card(ctx, S, [{ t: 'سرعة الصوت في الماء ≈ ' + VW + ' m/s', c: '#0369a1', w: 800 }, { t: 'زمن الذهاب والإياب t = ' + (S.ping ? Q25.nf(S._el || 0, 3) : '—') + ' s', c: '#7c3aed', w: 900 }, t ? { t: (p.sc === 'fish' ? 'البعد' : 'العمق') + ' = ' + VW + ' × ' + Q25.nf(T, 3) + ' ÷ 2 = ' + Math.round(tg.depth) + ' m', c: '#b91c1c', w: 900 } : null], { title: SC[p.sc], wd: 330, y: 44 }); },
    hall(ctx, w, h, S, g) { const p = S.p; K.bg(ctx, w, h, { benchY: h * .82, tiles: false, top: '#fef3c7', bottom: '#fde68a' }); Q25.banner(ctx, w, 'اضغط على المتحدث، ثم فعّل الألواح الماصة وقارن', '#0d9488', 20);
      const x0 = g.ph ? 20 : 100, x1 = w - 20, y0 = 60, y1 = h * .82;
      if (p.pan) K.raw(ctx, () => { ctx.fillStyle = '#a8a29e'; for (let x = x0; x < x1; x += 46) { ctx.fillRect(x + 3, y0, 40, 14); } for (let y = y0 + 20; y < y1 - 20; y += 46) { ctx.fillRect(x0, y, 14, 40); ctx.fillRect(x1 - 14, y, 14, 40); } ctx.fillStyle = 'rgba(0,0,0,.15)'; for (let x = x0; x < x1; x += 46) for (let k = 0; k < 4; k++) ctx.fillRect(x + 8 + k * 9, y0 + 3, 3, 8); });
      const px = (x0 + x1) / 2, py = y1; Q23.man(ctx, { hip: [px, py - 74], dir: 1, s: .6, shirt: '#0f766e', pants: '#334155' });
      // reflections
      let lev = 0; if (S.ping) { const el = S.tt - S.ping.t0; S.ref.forEach((r, k) => { if (el > r.t && el < r.t + .35) { const a = r.a * (1 - (el - r.t) / .35); lev = Math.max(lev, a); K.raw(ctx, () => { ctx.strokeStyle = 'rgba(220,38,38,' + a + ')'; ctx.lineWidth = 3; ctx.beginPath(); const R = 30 + (el - r.t) * 600; ctx.arc(k % 2 ? x0 : x1, py - 120 - (k % 3) * 40, R, 0, TAU); ctx.stroke(); }); } }); }
      const dur = (() => { let n = 0; for (let k = 0; k < 14; k++) if (Math.pow(p.pan ? .3 : .8, k) > .05) n = k; return .05 + n * .09; })();
      Q25.card(ctx, S, [{ t: p.pan ? 'مع الألواح الماصة: الانعكاسات تخمد بسرعة' : 'جدران صلبة: انعكاسات كثيرة متكررة', c: p.pan ? '#15803d' : '#b91c1c', w: 900 }, { t: 'مدة بقاء الصوت المنعكس ≈ ' + Q25.nf(dur, 2) + ' s', c: '#7c3aed', w: 900 }, { t: 'شدة الصدى الآن: ' + Math.round(lev * 100) + '%', c: '#334155' }], { title: 'تقليل الصدى في القاعات', wd: 320, y: 44 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S), p = S.p; if (p.sc === 'hall') { const w = S.W; return [{ id: 'talk', x: (Math.max(g.ph ? 20 : 100, 0) + w - 20) / 2, y: S.H * .82 - 70, w: 60, h: 120, tip: 'اضغط ليتكلم', idle: 'اضغطني ✋', click: S => D.go(S) }]; }
      const out = [{ id: 'ship', x: g.sx, y: g.sy - 30, w: 170, h: 70, tip: 'اضغط لترسل نبضة صوتية', idle: 'اضغطني ✋', click: S => D.go(S) }];
      if (p.sc === 'fish') { const tg = D.target(S, g); out.push({ id: 'fish', x: 70 + (S.W - 70) * S.fx, y: tg.y, w: 90, h: 50, axis: 'xy', keep: true, hint: false, tip: 'اسحب سرب الأسماك', drag: (S, d) => { S.fx = clamp((d.x - 70) / (S.W - 70), .1, .95); S.fd = clamp((d.y - g.sy) / (g.by - g.sy), .1, .9); S.ping = null; } }); }
      return out; },
    readings(S) { const g = D.geo(S), tg = D.target(S, g); return S.p.sc === 'hall' ? [rd('الألواح الماصة', S.p.pan ? 'موجودة' : 'غير موجودة')] : [rd(S.p.sc === 'fish' ? 'بعد الأسماك' : 'العمق', Math.round(tg.depth) + ' m'), rd('زمن الصدى t', Q25.nf(2 * tg.depth / VW, 3) + ' s'), rd('سرعة الصوت في الماء', '≈ ' + VW + ' m/s')]; },
    explain(S) { const p = S.p; if (p.sc === 'hall') return p.pan ? '<b>الألواح الماصة</b> (فلين أو جبس) تمتص معظم طاقة الصوت بدل أن تعكسها، فيخمد الصدى بسرعة ويصبح الكلام واضحاً.' : 'في القاعة الكبيرة الفارغة يرتد الصوت عن الجدران الصلبة مرات عديدة فتسمع <b>صدى متكرراً</b> يجعل الكلام غير واضح.';
      return 'ترسل السفينة نبضة صوتية إلى الأسفل فتنعكس عن ' + (p.sc === 'fish' ? 'سرب الأسماك' : 'قاع البحر') + ' وتعود. نقيس الزمن t ونحسب: <b>البعد = سرعة الصوت × t ÷ 2</b> (نقسم على 2 لأن الصوت ذهب وعاد).'; }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'سفن الصيد تستعمل جهاز «باحث الأسماك» الذي يعمل بالصدى، وقاعات الحفلات مغطاة بألواح خاصة تمتص الصوت.';
})();
/* =========================================================================================
   7) الدرس 2 (ص 64–67، 69): أنواع الموجات الصوتية، الضوضاء، خصائص الصوت، تطبيقات فوق السمعية، مخطط المفاهيم (س5)
   ========================================================================================= */
(() => {
  const WHO = [['human', '🧑', 'الإنسان', 20, 20000], ['elephant', '🐘', 'الفيل', 5, 12000], ['dog', '🐕', 'الكلب', 67, 45000], ['bat', '🦇', 'الخفاش', 2000, 110000]];
  const band = f => f < 20 ? 0 : f <= 20000 ? 1 : 2, BN = ['موجات دون السمعية', 'موجات سمعية', 'موجات فوق السمعية'], BC = ['#b45309', '#16a34a', '#7c3aed'];
  const D = { id: 'g8_p_range', page: 64, fig: 'ص 64',
    desc: 'الأصوات من حولنا كثيرة ومتنوعة، ويمكن تصنيفها اعتماداً على تردداتها إلى ثلاثة أنواع: الموجات الصوتية السمعية (تتحسسها الأذن البشرية، 20–20000 Hz)، فوق السمعية (أعلى من 20000 Hz)، ودون السمعية (أقل من 20 Hz) لا يشعر بها البشر وتتحسسها بعض الحيوانات كالفيلة.',
    tags: 'أنواع الموجات الصوتية السمعية فوق السمعية دون السمعية 20 Hz 20000 Hz مدى السمع خفاش فيل زلازل براكين',
    steps: ['اسحب المؤشر على مقياس التردد (أو استعمل المنزلق).', 'لاحظ نوع الموجة: دون السمعية، سمعية، فوق السمعية.', 'من يسمع هذا التردد؟ الإنسان، الفيل، الكلب، الخفاش.', 'اضغط «اسمع» لتسمع النغمة (إن كانت في مدى سمعك).', 'س2-6: أيّ من الترددات ليس بإمكان شخص أن يسمعها: 50 Hz، 600 Hz، 30000 Hz، 15000 Hz؟ جرّبها بالأزرار.', 'سؤال ص 64: نشاهد اضطراباً في سلوك بعض الحيوانات عند حدوث الزلازل أو نشاط البراكين، ما تفسيرك لذلك؟'],
    concl: ['الموجات السمعية: تتحسسها الأذن البشرية، وتتراوح تردداتها (20–20000 Hz).', 'فوق السمعية: تستثمر بشكل واسع في المجالات الصناعية والطبية نظراً لقصر أطوالها الموجية وطاقتها العالية، وتتميز بقدرتها على النفاذ وإمكانية انتقالها كحزمة ضيقة.', 'دون السمعية: لا يشعر بها البشر، لكن تتحسسها بعض الحيوانات كالفيلة، وتستثمر لرصد الزلازل ومتابعة النشاط البركاني.', 'الزلازل والبراكين تولد موجات دون سمعية تتحسسها بعض الحيوانات قبلنا فيضطرب سلوكها.'],
    laws: ['g8_hear'],
    controls: [R('lg', 'التردد f', 0, 5, Math.log10(440), .01, '', null, v => Q25.nf(Math.pow(10, v), 3) + ' Hz'), BT('', [{ t: '🔊 اسمع', on: S => D.play(S) }, { t: '50 Hz', on: S => setParam(S, 'lg', Math.log10(50)) }, { t: '600 Hz', on: S => setParam(S, 'lg', Math.log10(600)) }, { t: '15000 Hz', on: S => setParam(S, 'lg', Math.log10(15000)) }, { t: '30000 Hz', on: S => setParam(S, 'lg', Math.log10(30000)) }]), TG('who', 'من يسمع؟', true, null, 'eye'), TG('wave', 'شكل الموجة', true, null, 'wave')],
    setup(S) { S.ph = 0; }, update(S, dt) { S.ph += dt; },
    f(S) { return Math.pow(10, S.p.lg); },
    play(S) { const f = D.f(S); if (f >= 20 && f <= 18000) Q25.tone(f, 1, { vol: f < 100 ? .12 : .05 }); else C2.msg(S, f < 20 ? 'تردد دون سمعي: لا تسمعه أذنك' : 'تردد فوق سمعي: لا تسمعه أذنك', 2.4); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 16 : 90, x1 = w - 20, ya = ph ? 150 : 120; return { w, h, ph, x0, x1, ya, X: l => x0 + l / 5 * (x1 - x0) }; },
    draw(ctx, w, h, S) { const g = D.geo(S), p = S.p, f = D.f(S), b = band(f); K.bg(ctx, w, h, { bench: false });
      Q25.banner(ctx, w, 'اسحب المؤشر على مقياس التردد ✋', '#0d9488', 20);
      [[0, Math.log10(20)], [Math.log10(20), Math.log10(20000)], [Math.log10(20000), 5]].forEach((r, i) => { K.raw(ctx, () => { ctx.fillStyle = BC[i]; ctx.globalAlpha = i === b ? .9 : .3; ctx.fillRect(g.X(r[0]), g.ya, g.X(r[1]) - g.X(r[0]), 28); ctx.globalAlpha = 1; }); Q25.T(ctx, BN[i], (g.X(r[0]) + g.X(r[1])) / 2, g.ya + 14, { s: g.ph ? 9.5 : 12, w: 900, c: '#fff' }); });
      [1, 10, 20, 100, 1000, 10000, 20000, 100000].forEach(v => { const x = g.X(Math.log10(v)); K.raw(ctx, () => { ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, g.ya + 28); ctx.lineTo(x, g.ya + 36); ctx.stroke(); }); if (!g.ph || [1, 20, 20000, 100000].includes(v)) Q25.T(ctx, v >= 1000 ? v / 1000 + ' kHz' : v + ' Hz', x, g.ya + 48, { s: 10, w: 800, c: '#334155' }); });
      const px = g.X(p.lg); K.raw(ctx, () => { ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.moveTo(px, g.ya - 2); ctx.lineTo(px - 10, g.ya - 18); ctx.lineTo(px + 10, g.ya - 18); ctx.closePath(); ctx.fill(); });
      Q25.T(ctx, 'f = ' + Q25.nf(f, 3) + ' Hz', px, g.ya - 30, { s: 12.5, w: 900, c: '#fff', bg: BC[b] });
      // wave on a scope
      const sy = g.ya + 70; if (p.wave !== false) { const cyc = clamp(Math.log10(f) * 2, .6, 12); Q25.scope(ctx, g.x0, sy, g.x1 - g.x0, 80, [{ f: u => Math.sin(TAU * (u * cyc - S.ph * .5)), c: BC[b] }], { title: 'الموجة (للتوضيح)' }); }
      // who hears
      if (p.who !== false) { const wy = sy + 110, n = WHO.length, cw = (g.x1 - g.x0) / n; WHO.forEach((a, i) => { const x = g.x1 - cw * (i + .5), ok = f >= a[3] && f <= a[4]; C2.card(ctx, x - cw / 2 + 5, wy, cw - 10, g.ph ? 96 : 110, { bd: ok ? '#16a34a' : '#cbd5e1' }); Q25.T(ctx, a[1], x, wy + 30, { s: g.ph ? 26 : 34, c: '#000' }); Q25.T(ctx, a[2], x, wy + (g.ph ? 58 : 66), { s: 12, w: 900, c: '#1e293b' }); Q25.T(ctx, ok ? '✓ يسمعه' : '✗ لا يسمعه', x, wy + (g.ph ? 78 : 90), { s: 12, w: 900, c: ok ? '#15803d' : '#b91c1c' }); });
        Q25.T(ctx, 'مدى سمع الإنسان 20–20000 Hz (قيم الحيوانات تقريبية)', Q25.cx(w), wy + (g.ph ? 112 : 128), { s: 10.5, w: 800, c: '#64748b' }); }
      C2.drawMsg(ctx, S, Q25.cx(w), g.ya - 40); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'ptr', x: g.X(S.p.lg), y: g.ya + 6, w: 44, h: 60, axis: 'x', keep: true, tip: 'اسحب لتغيّر التردد', idle: 'اسحبني ✋', drag: (S, d) => setParam(S, 'lg', clamp((d.x - g.x0) / (g.x1 - g.x0) * 5, 0, 5)) }]; },
    readings(S) { const f = D.f(S); return [rd('التردد', Q25.nf(f, 3) + ' Hz'), rd('النوع', BN[band(f)]), rd('يسمعه الإنسان؟', band(f) === 1 ? 'نعم' : 'لا')]; },
    explain(S) { const f = D.f(S), b = band(f); return 'التردد ' + Q25.nf(f, 3) + ' Hz: <b>' + BN[b] + '</b>. ' + (b === 0 ? 'لا يسمعها الإنسان لكن تتحسسها <b>الفيلة</b>، وتولدها الزلازل والبراكين؛ لذلك تضطرب بعض الحيوانات قبل الزلزال.' : b === 1 ? 'تتحسسها الأذن البشرية (20–20000 Hz).' : 'لا يسمعها الإنسان، ويستعملها <b>الخفاش</b> لتحديد طريقه، وتستعمل في الطب والصناعة (السونار).'); }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'صفّارة الكلاب تصدر صوتاً فوق سمعي: الكلب يسمعه ويأتي، ونحن لا نسمع شيئاً!';
})();
(() => {
  const SRC = { drum: ['طبل يُضرب', 70], whisper: ['همس (ص 65)', 25], shout: ['صراخ طفل (ص 65)', 85], drill: ['آلة الحفر: ضوضاء (ص 65)', 100] };
  const D = { id: 'g8_p_loud', page: 65, fig: 'ص 65',
    desc: 'علو الصوت: هي خاصية الصوت التي تستطيع الأذن من خلالها التمييز بين الأصوات الخافتة كالهمس والأصوات المرتفعة مثل الصراخ، ويرتبط علو الصوت بشدة الصوت، إذ إن شدة الصوت تعتمد على: أ- المساحة السطحية للسطح المهتز (طاقة مصدر الصوت) ب- كثافة الوسط الناقل ج- البعد بين مصدر الصوت والسامع. والضوضاء أصوات غير مرغوب فيها.',
    tags: 'علو الصوت شدة الصوت مساحة السطح المهتز كثافة الوسط البعد عن المصدر همس صراخ ضوضاء سدادات الأذن آلة الحفر تلوث',
    steps: ['اختر مصدر الصوت (طبل، همس، صراخ، آلة الحفر) واضغط عليه.', 'غيّر مساحة السطح المهتز (قطر الطبل): ماذا يحدث لشدة الصوت؟', 'غيّر كثافة الوسط الناقل.', 'اسحب السامع ليقترب أو يبتعد عن المصدر.', 'الضوضاء: اختر آلة الحفر وفعّل «سدادات الأذن».'],
    concl: ['علو الصوت يرتبط بشدته؛ وشدة الصوت تعتمد على: المساحة السطحية للسطح المهتز (طاقة المصدر)، كثافة الوسط الناقل، البعد بين مصدر الصوت والسامع.', 'الضوضاء أصوات غير مرغوب فيها لا يرتاح الإنسان إلى سماعها: الضوضاء الاجتماعية (الأصوات العالية، الحيوانات الأليفة، الأجهزة) وضوضاء وسائل النقل.', 'تركيز موجات صوتية بقوة معينة على الأذن من شأنه أن يحدث تلفاً للأذن. للوقاية: نشر الوعي، توعية الطفل بتجنب اللعب ذات الأصوات العالية، ارتداء سدادات الأذن في الورش والمصانع.'],
    laws: ['g8_sprops'],
    controls: [SEL('src', 'مصدر الصوت', Object.keys(SRC).map(k => [k, SRC[k][0]]), 'drum'), R('area', 'مساحة السطح المهتز (قطر الطبل)', 20, 80, 50, 5, 'cm'), R('rho', 'كثافة الوسط الناقل (نسبةً للهواء)', .5, 2, 1, .1, '×'), R('d', 'البعد عن السامع', .5, 20, 3, .5, 'm'),
      BT('', [{ t: '🥁 أصدر الصوت', on: S => D.hit(S) }]), TG('plug', 'سدادات الأذن', false, null, 'eye'), TG('snd', 'سماع الصوت', true, null, 'wave'), TG('sc', 'شاشة الموجة', true, null, 'graph')],
    setup(S) { S.e = 0; S.ts = 0; },
    level(S) { const p = S.p, b = SRC[p.src][1]; let L = b + (p.src === 'drum' ? 20 * Math.log10(p.area / 50) : 0) + 10 * Math.log10(p.rho) - 20 * Math.log10(p.d / 1); if (p.plug) L -= 25; return clamp(L, 0, 130); },
    hit(S) { S.e = 1; const L = D.level(S); if (S.p.snd !== false) { if (S.p.src === 'drill') Q25.noise(1.2, .5 * Math.pow(10, (L - 100) / 40), 2500); else if (S.p.src === 'whisper') Q25.noise(.8, .25 * Math.pow(10, (L - 60) / 40), 5000); else Q25.tone(S.p.src === 'drum' ? 90 * 50 / S.p.area : 420, .8, { vol: .15 * Math.pow(10, (L - 90) / 40), decay: .25, type: S.p.src === 'drum' ? 'sine' : 'sawtooth' }); } },
    update(S, dt) { S.ts += dt; S.e *= Math.exp(-dt * (S.p.src === 'drill' ? .3 : 2)); if (S.p.src === 'drill' && S.e < .3 && S._auto) S.e = 1; },
    geo(S) { const w = S.W, h = S.H, ph = w < 600, gy = h * .8, sx = ph ? 70 : 170, lx = sx + 60 + (w - sx - (ph ? 90 : 160)) * (S.p.d - .5) / 19.5; return { w, h, ph, gy, sx, lx }; },
    draw(ctx, w, h, S) { const g = D.geo(S), p = S.p, L = D.level(S), A = S.e; K.bg(ctx, w, h, { benchY: g.gy });
      Q25.banner(ctx, w, 'اضغط على مصدر الصوت، واسحب السامع ✋', '#0d9488', 20);
      if (p.src === 'drum') { const r = p.area * .9, vib = A * 4 * Math.sin(S.ts * 60); K.raw(ctx, () => { const dg = ctx.createLinearGradient(g.sx - r, 0, g.sx + r, 0); dg.addColorStop(0, '#991b1b'); dg.addColorStop(.5, '#ef4444'); dg.addColorStop(1, '#7f1d1d'); ctx.fillStyle = dg; ctx.fillRect(g.sx - r, g.gy - 70, 2 * r, 66); ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 2; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.moveTo(g.sx - r + k * 2 * r / 6, g.gy - 70); ctx.lineTo(g.sx - r + (k + 1) * 2 * r / 6, g.gy - 6); ctx.stroke(); } ctx.fillStyle = '#f5f5f4'; ctx.beginPath(); ctx.ellipse(g.sx, g.gy - 70 + vib, r, 12, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#a8a29e'; ctx.stroke(); }); }
      else if (p.src === 'drill') { K.raw(ctx, () => { ctx.fillStyle = '#facc15'; rr(ctx, g.sx - 30, g.gy - 120, 50, 60, 6); ctx.fill(); ctx.fillStyle = '#334155'; ctx.fillRect(g.sx - 6 + (A > .1 ? Math.sin(S.ts * 80) * 2 : 0), g.gy - 60, 10, 56); ctx.fillStyle = '#1f2937'; ctx.fillRect(g.sx - 40, g.gy - 124, 70, 10); }); Q23.man(ctx, { hip: [g.sx - 40, g.gy - 76], dir: 1, s: .55, shirt: '#f97316', pants: '#1e3a8a', cap: '#facc15', hands: [[g.sx - 20, g.gy - 118], [g.sx + 10, g.gy - 118]] }); }
      else Q23.man(ctx, { hip: [g.sx, g.gy - 86], dir: 1, s: .62, shirt: p.src === 'shout' ? '#ec4899' : '#a78bfa', pants: '#334155', longHair: true, strain: p.src === 'shout' && A > .2 });
      // sound arcs (stronger = thicker)
      if (A > .05) Q25.arcs(ctx, g.sx + 40, g.gy - 90, [0, 1, 2, 3].map(k => 20 + ((S.ts * 160 + k * 40) % 160)), 0, .6, '#0d9488', clamp(L / 100, .1, 1) * A);
      // listener
      Q23.man(ctx, { hip: [g.lx, g.gy - 86], dir: -1, s: .62, shirt: '#0ea5e9', pants: '#1e3a8a' });
      if (p.plug) K.raw(ctx, () => { ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.arc(g.lx - 2, g.gy - 86 - 72, 5, 0, TAU); ctx.fill(); });
      K.raw(ctx, () => { G.arrow(ctx, (g.sx + g.lx) / 2, g.gy + 20, g.sx + 20, g.gy + 20, '#334155', 1.5, 6); G.arrow(ctx, (g.sx + g.lx) / 2, g.gy + 20, g.lx, g.gy + 20, '#334155', 1.5, 6); }); Q25.T(ctx, 'البعد = ' + p.d + ' m', (g.sx + g.lx) / 2, g.gy + 36, { s: 11.5, w: 900, c: '#334155' });
      // loudness meter
      const mx = g.ph ? 14 : 80, my = g.ph ? h * .26 : 60, mw = g.ph ? w * .45 : 230; const cur = L; C2.card(ctx, mx, my, mw, 64, { bd: cur > 85 ? '#dc2626' : '#0d9488' });
      K.raw(ctx, () => { const bw = mw - 20; const gr = ctx.createLinearGradient(mx + 10, 0, mx + 10 + bw, 0); gr.addColorStop(0, '#22c55e'); gr.addColorStop(.6, '#facc15'); gr.addColorStop(1, '#dc2626'); ctx.fillStyle = '#e2e8f0'; ctx.fillRect(mx + 10, my + 34, bw, 14); ctx.fillStyle = gr; ctx.fillRect(mx + 10, my + 34, bw * cur / 130, 14); ctx.fillStyle = '#334155'; ctx.fillRect(mx + 10 + bw * 85 / 130, my + 30, 2, 22); });
      Q25.T(ctx, 'علو الصوت عند السامع ≈ ' + Math.round(cur) + ' dB' + (A > .05 ? ' 🔊' : ''), mx + mw / 2, my + 16, { s: 11.5, w: 900, c: cur > 85 ? '#b91c1c' : '#0f766e' });
      if (p.sc !== false) Q25.scope(ctx, g.ph ? w * .5 : mx, g.ph ? h * .26 : my + 74, g.ph ? w * .46 : mw, 64, [{ f: u => clamp(L / 110 * A * 1.3, 0, 1) * (p.src === 'drill' || p.src === 'whisper' ? Math.sin(u * 97 + S.ts * 50) * Math.sin(u * 23) : Math.sin(TAU * u * 4)) }], { title: 'السعة' });
      if (!g.ph) Q25.card(ctx, S, [{ t: 'الشدة تزداد: بزيادة مساحة السطح المهتز', c: '#b91c1c', w: 800 }, { t: 'وبزيادة كثافة الوسط الناقل', c: '#7c3aed', w: 800 }, { t: 'وتقل: بزيادة البعد عن المصدر', c: '#0369a1', w: 800 }, p.src === 'drill' ? { t: p.plug ? 'السدادات تحمي الأذن ✓' : 'ضوضاء! استعمل سدادات الأذن', c: p.plug ? '#15803d' : '#b91c1c', w: 900 } : null], { title: 'علو الصوت', wd: 300, y: 44 }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [{ id: 'src', x: g.sx, y: g.gy - 70, w: 110, h: 140, tip: 'اضغط لإصدار الصوت', idle: 'اضغطني ✋', click: S => D.hit(S) },
      { id: 'listener', x: g.lx, y: g.gy - 90, w: 60, h: 170, axis: 'x', keep: true, hint: false, tip: 'اسحب السامع', drag: (S, d) => setParam(S, 'd', Math.round(clamp(.5 + (d.x - g.sx - 60) / (g.w - g.sx - (g.ph ? 90 : 160)) * 19.5, .5, 20) * 2) / 2) }]; },
    readings(S) { return [rd('المصدر', SRC[S.p.src][0]), rd('مساحة السطح (قطر)', S.p.area + ' cm'), rd('كثافة الوسط', S.p.rho + ' ×'), rd('البعد', S.p.d + ' m'), rd('العلو عند السامع', Math.round(D.level(S)) + ' dB')]; },
    record(S) { return { s: SRC[S.p.src][0], a: S.p.area, r: S.p.rho, d: S.p.d, L: Math.round(D.level(S)) }; }, cols: [['s', 'المصدر'], ['a', 'القطر (cm)'], ['r', 'الكثافة'], ['d', 'البعد (m)'], ['L', 'العلو (dB)']],
    explain(S) { const L = D.level(S); return 'علو الصوت عند السامع ≈ <b>' + Math.round(L) + ' dB</b>. الطبل الأكبر يحرك هواءً أكثر (طاقة أكبر) فيعلو الصوت، والوسط الأكثف ينقل شدة أكبر، وكلما <b>ابتعد</b> السامع ضعف الصوت لأن طاقته تتوزع على مساحة أكبر.' + (L > 85 ? ' <b>تنبيه:</b> الأصوات فوق 85 dB لمدة طويلة تؤذي الأذن (ضوضاء).' : ''); }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'لا تقرّب سماعات الأذن بصوت مرتفع لساعات طويلة، وعمال الحفر في الشوارع يرتدون سدادات الأذن.';
})();
(() => {
  const V = { man: ['صوت الرجل (غليظ)', 120, '#1d4ed8'], woman: ['صوت المرأة (حاد)', 220, '#db2777'], child: ['صوت الطفل (حاد جداً)', 300, '#f59e0b'] };
  const H = [1, .6, .35, .25, .15, .1];
  const D = { id: 'g8_p_pitch', page: 66, fig: 'ص 66',
    desc: 'درجة الصوت: هي خاصية الصوت التي تستطيع الأذن من خلالها التمييز بين الأصوات الحادة (الرفيعة) كصوت الطفل أو المرأة، والأصوات الغليظة كصوت الرجل، وتعتمد درجة الصوت على تردد الموجات الصوتية إذ تزداد درجة الصوت بزيادة تردده.',
    tags: 'درجة الصوت التردد حاد غليظ رفيع صوت الرجل صوت المرأة صوت الطفل',
    steps: ['اختر صوتين للمقارنة (أعلى الشاشة وأسفلها).', 'اضغط على كل متكلم لتسمع صوته، وقارن شكل موجته على الشاشة.', 'لاحظ: الصوت الحاد موجاته متقاربة (تردده أكبر).', 'غيّر التردد بالمنزلق «صوت حر» وأصغِ.', 'سؤال ص 66: لماذا تكون درجة صوت المرأة أعلى من درجة صوت الرجل؟'],
    concl: ['درجة الصوت تعتمد على تردد الموجات الصوتية: كلما زاد التردد زادت درجة الصوت (صار أحدّ).', 'صوت المرأة والطفل حاد (تردده كبير)، وصوت الرجل غليظ (تردده صغير).', 'تكون درجة صوت المرأة أعلى لأن تردد اهتزاز أوتارها الصوتية أكبر من تردد أوتار الرجل.'],
    laws: ['g8_sprops'],
    controls: [SEL('a', 'الصوت الأول', Object.keys(V).map(k => [k, V[k][0]]), 'man'), SEL('b', 'الصوت الثاني', Object.keys(V).map(k => [k, V[k][0]]).concat([['free', 'صوت حر']]), 'woman'), R('f', 'تردد «الصوت الحر»', 80, 1000, 440, 10, 'Hz'), TG('lab', 'التردد على الشاشة', true, null, 'labels')],
    setup(S) { S.ts = 0; S.pl = ''; S.plT = 0; }, update(S, dt) { S.ts += dt; S.plT = Math.max(0, S.plT - dt); },
    fq(S, k) { return k === 'free' ? S.p.f : V[k][1]; },
    play(S, k, i) { S.pl = i; S.plT = 1; Q25.tone(D.fq(S, k), .9, { h: H, vol: .06 }); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600; return { w, h, ph, x0: ph ? 96 : 190, x1: w - 16, ys: [h * .3, h * .62], px: ph ? 46 : 120 }; },
    draw(ctx, w, h, S) { const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { bench: false }); Q25.banner(ctx, w, 'اضغط على كل متكلم لتسمعه وقارن الموجتين ✋', '#0d9488', 20);
      [p.a, p.b].forEach((k, i) => { const f = D.fq(S, k), col = k === 'free' ? '#0d9488' : V[k][2], y = g.ys[i]; const cyc = f / 60;
        Q23.man(ctx, { hip: [g.px, y + 40], dir: 1, s: k === 'child' ? .42 : .55, shirt: col, pants: '#334155', longHair: k === 'woman', strain: S.pl === i && S.plT > 0 });
        Q25.scope(ctx, g.x0, y - 50, g.x1 - g.x0, 100, [{ f: u => (H.reduce((a, c, n) => a + c * Math.sin(TAU * (n + 1) * (u * cyc - S.ts * .1)), 0)) / 1.9, c: col === '#1d4ed8' ? '#60a5fa' : col }], { title: k === 'free' ? 'صوت حر' : V[k][0] });
        if (p.lab !== false) Q25.T(ctx, 'f ≈ ' + f + ' Hz', g.x0 + 60, y + 36, { s: 12, w: 900, c: '#fff', bg: col }); });
      const fa = D.fq(S, p.a), fb = D.fq(S, p.b); Q25.T(ctx, fa === fb ? 'الدرجة نفسها' : (fa > fb ? 'الأول أحدّ (تردده أكبر)' : 'الثاني أحدّ (تردده أكبر)'), Q25.cx(w), (g.ys[0] + g.ys[1]) / 2, { s: 13, w: 900, c: '#fff', bg: '#ea580c' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [S.p.a, S.p.b].map((k, i) => ({ id: 'v' + i, x: g.px, y: g.ys[i], w: 70, h: 120, tip: 'اضغط لتسمع الصوت', idle: i === 0 ? 'اضغطني ✋' : undefined, hint: i === 0, click: S => D.play(S, k, i) })); },
    readings(S) { return [rd('تردد الصوت الأول', D.fq(S, S.p.a) + ' Hz'), rd('تردد الصوت الثاني', D.fq(S, S.p.b) + ' Hz'), rd('الأحدّ', D.fq(S, S.p.a) > D.fq(S, S.p.b) ? 'الأول' : D.fq(S, S.p.a) < D.fq(S, S.p.b) ? 'الثاني' : 'متساويان')]; },
    explain(S) { return 'انظر إلى الشاشتين: الصوت ذو <b>التردد الأكبر</b> موجاته أكثر تقارباً، ونسمعه <b>أحدّ</b> (أرفع). لذلك صوت المرأة والطفل أحدّ من صوت الرجل: أوتارهم الصوتية أقصر وأرفع فتهتز بتردد أكبر.'; }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'عندما يبلغ الولد يصبح صوته أغلظ لأن أوتاره الصوتية تطول وتغلظ فيقل ترددها.';
})();
(() => {
  const INS = { piano: ['البيانو', '🎹', [1, .45, .25, .12, .08, .05], 'طَرق مطرقة على وتر', .6], guitar: ['الغيتار', '🎸', [1, .7, .45, .3, .2, .12, .08], 'نقر الوتر', .5], violin: ['الكمان', '🎻', [1, .5, .33, .25, .2, .17, .14, .12], 'احتكاك القوس بالوتر', 0], flute: ['الناي/الفلوت', '🪈', [1, .08, .04], 'اهتزاز عمود الهواء', 0], accordion: ['الأكورديون', '🪗', [1, .05, .5, .05, .3, .05, .2], 'اهتزاز ريشة معدنية', 0] };
  const D = { id: 'g8_p_quality', page: 66, fig: 'صورة الآلات ص 66',
    desc: 'نوع مصدر الصوت: هي خاصية الصوت التي تستطيع الأذن من خلالها التمييز بين النغمات الصادرة عن الأصوات المتساوية بالشدة والدرجة كأصوات الآلات الموسيقية المختلفة، ويعتمد نوع الصوت على: أ- نوع مصدر الصوت ب- طريقة توليد الصوت (طريقة اهتزاز المصدر).',
    tags: 'نوع مصدر الصوت نوع الصوت آلات موسيقية بيانو غيتار كمان ناي أكورديون نغمة الدرجة نفسها الشدة نفسها',
    steps: ['اختر آلتين موسيقيتين تعزفان النغمة نفسها (الدرجة نفسها) وبالشدة نفسها.', 'اضغط على كل آلة لتسمعها، وقارن شكل موجتها.', 'لاحظ: التردد نفسه (عدد التكرارات نفسه) والسعة نفسها، لكن شكل الموجة مختلف ⟸ نميّز الآلة.', 'س2-4: من خلال خاصية نوع الصوت تستطيع الأذن التمييز بين: الأصوات المتساوية بالشدة والدرجة الصادرة عن الآلات الموسيقية.'],
    concl: ['نوع الصوت يميّز النغمات المتساوية في الشدة والدرجة، كأصوات الآلات الموسيقية المختلفة.', 'يعتمد نوع الصوت على: نوع مصدر الصوت، وطريقة توليد الصوت (طريقة اهتزاز المصدر).', 'بنوع الصوت نميّز الأشخاص دون أن نراهم (التفكير الناقد 2 ص 66).'],
    laws: ['g8_sprops'],
    controls: [SEL('a', 'الآلة الأولى', Object.keys(INS).map(k => [k, INS[k][0]]), 'piano'), SEL('b', 'الآلة الثانية', Object.keys(INS).map(k => [k, INS[k][0]]), 'flute'), SEL('n', 'النغمة', [['262', 'دو (262 Hz)'], ['330', 'مي (330 Hz)'], ['392', 'صول (392 Hz)']], '262'), TG('lab', 'التسميات', true, null, 'labels')],
    setup(S) { S.ts = 0; }, update(S, dt) { S.ts += dt; },
    wave(k) { const hs = INS[k][2], n = hs.reduce((a, c) => a + c, 0); return u => hs.reduce((a, c, i) => a + c * Math.sin(TAU * (i + 1) * u * 3 + i * .7), 0) / n * 1.6; },
    play(S, k) { const I = INS[k]; Q25.tone(+S.p.n, 1.2, { h: I[2], vol: .07, decay: I[4] || null }); },
    geo(S) { const w = S.W, h = S.H, ph = w < 600; return { w, h, ph, x0: ph ? 96 : 200, x1: w - 16, ys: [h * .3, h * .62], px: ph ? 48 : 130 }; },
    draw(ctx, w, h, S) { const g = D.geo(S), p = S.p; K.bg(ctx, w, h, { bench: false }); Q25.banner(ctx, w, 'النغمة نفسها والشدة نفسها — اضغط على كل آلة ✋', '#0d9488', 20);
      [p.a, p.b].forEach((k, i) => { const I = INS[k], y = g.ys[i]; C2.card(ctx, g.px - 46, y - 52, 92, 104, { bd: '#0d9488' }); Q25.T(ctx, I[1], g.px, y - 8, { s: g.ph ? 40 : 52, c: '#000' }); Q25.T(ctx, I[0], g.px, y + 38, { s: 12, w: 900, c: '#134e4a' });
        Q25.scope(ctx, g.x0, y - 50, g.x1 - g.x0, 100, [{ f: D.wave(k), c: i ? '#fbbf24' : '#34d399' }], { title: I[0] + ' — ' + p.n + ' Hz' });
        if (p.lab !== false) Q25.T(ctx, 'طريقة الاهتزاز: ' + I[3], (g.x0 + g.x1) / 2, y + 64, { s: 11.5, w: 900, c: '#334155' }); });
      Q25.T(ctx, 'التردد نفسه ✓ السعة نفسها ✓ شكل الموجة مختلف ⟸ نوع الصوت مختلف', Q25.cx(w), (g.ys[0] + g.ys[1]) / 2 + 6, { s: g.ph ? 10.5 : 12.5, w: 900, c: '#fff', bg: '#7c3aed' }); },
    drags(S) { if (!S.W) return []; const g = D.geo(S); return [S.p.a, S.p.b].map((k, i) => ({ id: 'ins' + i, x: g.px, y: g.ys[i], w: 92, h: 104, tip: 'اضغط لتسمع ' + INS[k][0], idle: i === 0 ? 'اضغطني ✋' : undefined, hint: i === 0, click: S => D.play(S, k) })); },
    readings(S) { return [rd('النغمة (التردد)', S.p.n + ' Hz'), rd('الآلة الأولى', INS[S.p.a][0] + ' — ' + INS[S.p.a][3], 1), rd('الآلة الثانية', INS[S.p.b][0] + ' — ' + INS[S.p.b][3], 1)]; },
    explain(S) { const a = INS[S.p.a], b = INS[S.p.b]; return a === b ? 'اختر آلتين مختلفتين للمقارنة.' : a[0] + ' و' + b[0] + ' يعزفان النغمة نفسها (' + S.p.n + ' Hz) بالشدة نفسها، لكن <b>شكل الموجة مختلف</b> لأن <b>نوع المصدر</b> و<b>طريقة الاهتزاز</b> مختلفان (' + a[3] + ' / ' + b[3] + ')، لذلك تميّز أذنك كل آلة: هذا هو <b>نوع الصوت</b>.'; }
  };
  M8.P[D.id] = D;
  Q25.LIFE[D.id] = 'تعرف صوت أمك على الهاتف دون أن تراها، لأن لكل شخص «نوع صوت» خاصاً به.';
})();
(() => {
  const APP = { sea: ['1- قياس أعماق البحار والكشف عن المعادن', '🚢'], clean: ['2- تنظيف الأجهزة الدقيقة (الساعات وأجهزة القياس)', '⌚'], metal: ['3- اختيار المعادن واللدائن المناسبة للصناعة', '🔩'], baby: ['4- تشخيص الأمراض بالسونار ومتابعة نمو الجنين', '🤰'], steril: ['5- تعقيم المعدات الطبية', '🩺'], kidney: ['6- تفتيت الحصى في الكلية والقناة الصفراوية', '🫘'] };
  const D = { id: 'g8_p_ultra', page: 67, fig: 'الفيزياء والحياة ص 67',
    desc: 'تطبيقات الموجات الصوتية فوق السمعية: قياس أعماق البحار والكشف عن المعادن، تنظيف الأجهزة الدقيقة، اختيار المعادن واللدائن المناسبة للصناعة، تشخيص الأمراض في جهاز السونار وهو وسيلة آمنة لمتابعة نمو الجنين، تعقيم المعدات الطبية، وتفتيت الحصى في الكلية والقناة الصفراوية.',
    tags: 'تطبيقات الموجات فوق السمعية سونار جنين تفتيت حصى الكلى تنظيف تعقيم المعادن أعماق البحار الفيزياء والحياة',
    steps: ['اختر تطبيقاً من التطبيقات الستة في الكتاب.', 'اضغط «شغّل الموجات فوق السمعية» (أو اضغط على الجهاز) وراقب ما يحدث.', 'التفكير الناقد 3 (ص 66): ما سبب استعمال الموجات فوق السمعية في أجهزة السونار؟'],
    concl: ['تستعمل الموجات فوق السمعية لأن أطوالها الموجية قصيرة وطاقتها عالية، وتنفذ في الأجسام، ويمكن إرسالها كحزمة ضيقة، وتنعكس عن الحدود بين الأنسجة والمواد.', 'السونار وسيلة آمنة لمتابعة نمو الجنين داخل الرحم.'],
    laws: ['g8_hear', 'g8_echo'],
    controls: [SEL('ap', 'التطبيق', Object.keys(APP).map(k => [k, APP[k][0]]), 'baby', (v, S) => { S.prog = 0; S.on = 0; }), BT('', [{ t: '〰 شغّل الموجات فوق السمعية', on: S => { S.on = !S.on; } }, { t: '↺', on: S => { S.prog = 0; S.on = 0; } }]), TG('lab', 'التسميات', true, null, 'labels')],
    setup(S) { S.prog = 0; S.on = 0; S.ts = 0; S.px = .5; },
    update(S, dt) { S.ts += dt; if (S.on) S.prog = Math.min(1, S.prog + dt / 6); },
    draw(ctx, w, h, S) { const p = S.p, ph = w < 600, cx = Q25.cx(w), cy = h * .55, R = Math.min(w * .3, h * .26), k = S.prog; K.bg(ctx, w, h, { benchY: h * .86 });
      Q25.banner(ctx, w, APP[p.ap][0], '#0d9488', 20);
      const pulses = (x, y, ang, n = 4) => { if (S.on) Q25.arcs(ctx, x, y, Array.from({ length: n }, (_, i) => 8 + ((S.ts * 120 + i * 18) % 72)), ang, .35, '#7c3aed', .9); };
      K.raw(ctx, () => {
        if (p.ap === 'baby') { ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.ellipse(cx - R * .3, cy + 20, R, R * .55, 0, Math.PI, TAU); ctx.fill(); ctx.fillStyle = '#e2e8f0'; ctx.fillRect(cx - R * 1.4, cy + 20, R * 2.4, 16); ctx.fillStyle = '#334155'; rr(ctx, cx - R * .45, cy + 20 - R * .55 - 30, 26, 34, 6); ctx.fill(); ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - R * .32, cy + 20 - R * .55 - 30); ctx.quadraticCurveTo(cx, cy - R, cx + R * .75 - 60, cy - R * .9); ctx.stroke(); pulses(cx - R * .32, cy + 20 - R * .55, Math.PI / 2);
          const sx = cx + R * .75, sy = cy - R * .9; ctx.fillStyle = '#0f172a'; rr(ctx, sx - 70, sy - 52, 140, 104, 8); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.rect(sx - 64, sy - 46, 128, 92 * k); ctx.clip(); ctx.fillStyle = '#d6a77a'; ctx.beginPath(); ctx.arc(sx - 14, sy - 6, 24, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(sx + 22, sy + 10, 30, 20, .3, 0, TAU); ctx.fill(); ctx.restore(); }
        else if (p.ap === 'kidney') { ctx.fillStyle = '#b45309'; ctx.beginPath(); ctx.ellipse(cx, cy, R * .55, R * .8, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.ellipse(cx + R * .25, cy, R * .18, R * .3, 0, 0, TAU); ctx.fill(); const n = 1 + Math.floor(k * 12); for (let i = 0; i < n; i++) { const a = i * 2.4, r0 = n === 1 ? 0 : 6 + k * 18 * ((i % 3) + 1) / 3; ctx.fillStyle = '#57534e'; ctx.beginPath(); ctx.arc(cx + R * .22 + Math.cos(a) * r0, cy + Math.sin(a) * r0, Math.max(2.5, 14 / Math.sqrt(n)), 0, TAU); ctx.fill(); } ctx.fillStyle = '#334155'; rr(ctx, cx - R * 1.4, cy - 20, 50, 40, 8); ctx.fill(); pulses(cx - R * 1.4 + 50, cy, 0, 5); }
        else if (p.ap === 'clean' || p.ap === 'steril') { ctx.fillStyle = '#94a3b8'; rr(ctx, cx - R, cy - R * .4, R * 2, R * .9, 8); ctx.fill(); ctx.fillStyle = 'rgba(125,211,252,.85)'; ctx.fillRect(cx - R + 8, cy - R * .3, R * 2 - 16, R * .75); if (S.on) { ctx.fillStyle = 'rgba(255,255,255,.8)'; for (let i = 0; i < 40; i++) { const x = cx - R + 14 + ((i * 53.1 + S.ts * 30) % (R * 2 - 28)), y = cy + R * .4 - ((i * 31 + S.ts * 80) % (R * .7)); ctx.beginPath(); ctx.arc(x, y, 2, 0, TAU); ctx.fill(); } }
          if (p.ap === 'clean') { ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(cx, cy + 4, R * .25, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(cx, cy + 4, R * .2, 0, TAU); ctx.fill(); ctx.strokeStyle = '#111'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy + 4); ctx.lineTo(cx, cy - R * .12); ctx.moveTo(cx, cy + 4); ctx.lineTo(cx + R * .1, cy + 4); ctx.stroke(); ctx.fillStyle = 'rgba(120,53,15,' + (.7 * (1 - k)) + ')'; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.arc(cx + Math.cos(i * 2.1) * R * .18, cy + 4 + Math.sin(i * 1.7) * R * .18, 4, 0, TAU); ctx.fill(); } }
          else { ctx.strokeStyle = '#475569'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(cx - R * .5, cy + 10); ctx.lineTo(cx + R * .2, cy - 10); ctx.moveTo(cx - R * .3, cy + 20); ctx.lineTo(cx + R * .5, cy + 5); ctx.stroke(); ctx.fillStyle = 'rgba(22,163,74,' + (1 - k) + ')'; for (let i = 0; i < 18; i++) { ctx.beginPath(); ctx.arc(cx - R * .7 + ((i * 47) % (R * 1.4)), cy - 10 + ((i * 29) % 40), 4, 0, TAU); ctx.fill(); } }
          ctx.fillStyle = '#334155'; rr(ctx, cx - 30, cy + R * .5, 60, 18, 4); ctx.fill(); }
        else if (p.ap === 'metal') { ctx.fillStyle = '#9ca3af'; ctx.fillRect(cx - R, cy - 20, R * 2, R * .6); ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx + R * .2, cy + 10); ctx.lineTo(cx + R * .3, cy + 22); ctx.lineTo(cx + R * .25, cy + 30); ctx.stroke(); const px = cx - R + S.px * R * 2; ctx.fillStyle = '#334155'; rr(ctx, px - 14, cy - 54, 28, 34, 5); ctx.fill(); pulses(px, cy - 20, Math.PI / 2, 3); const crack = Math.abs(px - (cx + R * .25)) < 20;
          ctx.fillStyle = '#0f172a'; rr(ctx, cx - 90, cy - R - 30, 180, 70, 8); ctx.fill(); ctx.strokeStyle = '#34d399'; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 160; i++) { const x = cx - 80 + i, spike = (i > 20 && i < 26 ? 1 : 0) + (S.on && crack && i > 70 && i < 76 ? .9 : 0) + (i > 140 && i < 146 ? .7 : 0); ctx.lineTo(x, cy - R + 20 - spike * 30); } ctx.stroke(); S._crack = crack; }
        else { const sy = cy - R * .6; ctx.fillStyle = '#0369a1'; ctx.fillRect(70, sy, w - 70, R * 1.5); ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.moveTo(cx - 60, sy - 16); ctx.lineTo(cx + 60, sy - 16); ctx.lineTo(cx + 44, sy + 6); ctx.lineTo(cx - 44, sy + 6); ctx.fill(); ctx.fillStyle = '#a16207'; ctx.fillRect(70, sy + R * 1.5, w - 70, 20); ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(cx + R * .6, sy + R * 1.45, 10, 0, TAU); ctx.fill(); pulses(cx, sy + 8, Math.PI / 2, 5); }
      });
      if (p.lab !== false) { const T = { baby: 'جهاز السونار: الصدى يرسم صورة الجنين ' + Math.round(k * 100) + '%', kidney: 'الحصاة تتفتت: ' + Math.round(k * 100) + '%', clean: 'الأوساخ تزول بالفقاعات: ' + Math.round(k * 100) + '%', steril: 'الجراثيم تموت: ' + Math.round(k * 100) + '%', metal: S._crack && S.on ? 'صدى إضافي: يوجد شقّ داخل المعدن!' : 'اسحب المجس فوق المعدن', sea: 'النبضة تنعكس عن القاع والمعادن' }[p.ap];
        Q25.T(ctx, T, cx, h * .86 - 24, { s: 13, w: 900, c: '#fff', bg: '#7c3aed' }); Q25.T(ctx, APP[p.ap][1], 100, 70, { s: 34, c: '#000' }); }
      if (!S.on) Q25.T(ctx, 'اضغط على الجهاز ليرسل الموجات فوق السمعية', cx, 64, { s: 12, w: 900, c: '#fff', bg: '#64748b' }); },
    drags(S) { if (!S.W) return []; const w = S.W, h = S.H, cx = Q25.cx(w), cy = h * .55, R = Math.min(w * .3, h * .26); const out = [{ id: 'dev', x: cx, y: cy, w: R * 2, h: R * 1.2, tip: 'اضغط لتشغيل الموجات فوق السمعية', idle: 'اضغطني ✋', click: S => { S.on = !S.on; } }];
      if (S.p.ap === 'metal') out.unshift({ id: 'probe', x: cx - R + S.px * R * 2, y: cy - 38, w: 50, h: 50, axis: 'x', keep: true, hint: false, tip: 'اسحب المجس فوق المعدن', drag: (S, d) => { S.px = clamp((d.x - cx + R) / (2 * R), 0, 1); S.on = 1; } }); return out; },
    readings(S) { return [rd('التطبيق', APP[S.p.ap][0], 1), rd('الجهاز', S.on ? 'يعمل' : 'متوقف'), rd('التقدم', Math.round(S.prog * 100) + '%')]; },
    explain(S) { return 'الموجات <b>فوق السمعية</b> (أكثر من 20000 Hz) <b>أطوالها الموجية قصيرة وطاقتها عالية</b>، تنفذ في الأجسام وتنتقل كحزمة ضيقة وتنعكس عن الحدود بين المواد؛ لذلك تُستعمل في: ' + APP[S.p.ap][0].slice(3) + '. وهي <b>آمنة</b> لمتابعة الجنين لأنها ليست إشعاعاً مؤيِّناً.'; }
  };
  M8.P[D.id] = D;
})();
(() => {
  const SLOTS = [['loud', 'علو الصوت', 0], ['pitch', 'درجة الصوت', 0], ['area', 'المساحة السطحية للسطح المهتز', 1], ['rho', 'كثافة الوسط الناقل', 1], ['dist', 'البعد بين المصدر والسامع', 1], ['freq', 'تردد الموجات الصوتية', 2], ['src', 'نوع مصدر الصوت', 3]];
  const D = { id: 'g8_p_map', page: 69, fig: 'س5 ص 69',
    desc: 'س5: أكمل مخطط المفاهيم الآتي — خصائص الصوت: علو الصوت يعتمد على (3 عوامل)، درجة الصوت تعتمد على (التردد)، نوع الصوت يعتمد على (نوع المصدر، طريقة الاهتزاز).',
    tags: 'مخطط المفاهيم س5 خصائص الصوت علو درجة نوع مراجعة الفصل',
    steps: ['اسحب كل بطاقة إلى المربع الفارغ المناسب في المخطط.', 'المربعات تضيء عند الإفلات الصحيح.', 'اضغط «ساعدني» إذا احترت.'],
    concl: ['خصائص الصوت: علو الصوت (يعتمد على المساحة السطحية للسطح المهتز، وكثافة الوسط الناقل، والبعد بين المصدر والسامع)، درجة الصوت (تعتمد على التردد)، نوع الصوت (يعتمد على نوع المصدر وطريقة الاهتزاز).'],
    laws: ['g8_sprops'],
    controls: [BT('', [{ t: '↺ ابدأ من جديد', on: S => D.reset(S) }, { t: '💡 ساعدني', on: S => { const s = SLOTS.find(q => !D.used(S, q[0])); if (s) C2.msg(S, '«' + s[1] + '» ⟸ ' + ['اسم خاصية', 'يعتمد عليه العلو', 'تعتمد عليه الدرجة', 'يعتمد عليه النوع'][s[2]], 3); } }])],
    setup(S) { D.reset(S); }, reset(S) { S.pl = {}; S.hold = ''; S.err = 0; },
    boxes(S) { const w = S.W, h = S.H, ph = w < 600, x0 = ph ? 10 : 80, x1 = w - 12, W = x1 - x0, bw = ph ? W / 3 - 8 : Math.min(190, W / 3 - 20), bh = ph ? 40 : 40, y0 = h * .2, c3 = [x1 - W / 6, x0 + W / 2, x0 + W / 6];
      // right branch: loudness, middle: pitch, left: type (as in the book)
      const B = { root: [x0 + W / 2, y0], loud: [c3[0], y0 + 90], pitch: [c3[1], y0 + 90], type: [c3[2], y0 + 90], freq: [c3[1], y0 + 175], src: [c3[2] + bw * .3, y0 + 235], how: [c3[2] - bw * .3, y0 + 235] };
      const sw = ph ? W * .3 : Math.min(150, W / 6.5), lc = ph ? c3[0] : Math.min(c3[0], x1 - 1.5 * sw - 12); ['area', 'rho', 'dist'].forEach((k, i) => { B[k] = ph ? [x1 - sw / 2 - 2, y0 + 235 + i * 46] : [lc + (1 - i) * (sw + 6), y0 + 235]; });
      return { w, h, ph, B, bw, bh, sw, x0, x1, y0 }; },
    chipPos(S, i) { const g = D.boxes(S), n = SLOTS.length, per = g.ph ? 2 : 4, r = Math.floor(i / per), c = i % per, cw = g.ph ? (g.x1 - g.x0) / 2 - 8 : Math.min(200, (g.x1 - g.x0) / 4 - 12); return [Q25.cx(g.w) + ((per - 1) / 2 - c) * (cw + 10), g.h - (g.ph ? 250 : 170) + r * 46]; },
    draw(ctx, w, h, S) { const g = D.boxes(S), B = g.B; K.bg(ctx, w, h, { bench: false }); Q25.banner(ctx, w, 'س5: أكمل مخطط المفاهيم — اسحب البطاقات ✋', '#0d9488', 22);
      const box = (k, t, wd, fill) => { const [x, y] = B[k]; K.raw(ctx, () => { ctx.fillStyle = fill ? '#bbf7d0' : '#dcfce7'; ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2; rr(ctx, x - wd / 2, y - g.bh / 2, wd, g.bh, 8); ctx.fill(); ctx.stroke(); }); if (t) Q25.T(ctx, t, x, y, { s: wd < 130 ? 10 : 11.5, w: 900, c: '#14532d' }); };
      K.raw(ctx, () => { ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 3; const yb = g.y0 + 45; ctx.beginPath(); ctx.moveTo(B.root[0], g.y0 + 20); ctx.lineTo(B.root[0], yb); ctx.moveTo(B.loud[0], yb); ctx.lineTo(B.type[0], yb); [B.loud, B.pitch, B.type].forEach(q => { ctx.moveTo(q[0], yb); ctx.lineTo(q[0], q[1] - 20); }); ctx.moveTo(B.pitch[0], B.pitch[1] + 20); ctx.lineTo(B.freq[0], B.freq[1] - 20);
        ctx.moveTo(B.type[0], B.type[1] + 20); ctx.lineTo(B.type[0], B.src[1] - 40); ctx.moveTo(B.how[0], B.src[1] - 40); ctx.lineTo(B.src[0], B.src[1] - 40); ctx.moveTo(B.how[0], B.src[1] - 40); ctx.lineTo(B.how[0], B.how[1] - 20); ctx.moveTo(B.src[0], B.src[1] - 40); ctx.lineTo(B.src[0], B.src[1] - 20);
        ctx.moveTo(B.loud[0], B.loud[1] + 20); ctx.lineTo(B.loud[0], B.area[1] - 40); ctx.moveTo(B.area[0], B.area[1] - 40); ctx.lineTo(B.dist[0], B.area[1] - 40); ['area', 'rho', 'dist'].forEach(k => { ctx.moveTo(B[k][0], B.area[1] - 40); ctx.lineTo(B[k][0], B[k][1] - 20); }); ctx.stroke(); });
      box('root', 'خصائص الصوت', g.bw, 1); box('type', 'نوع الصوت', g.bw, 1); box('how', 'طريقة الاهتزاز', g.bw * .55, 1);
      [B.loud, B.pitch, B.type].forEach(q => Q25.T(ctx, 'يعتمد على', q[0], q[1] + 32, { s: 10.5, w: 800, c: '#334155' }));
      SLOTS.forEach(([k, t]) => { const wd = ['area', 'rho', 'dist'].includes(k) ? g.sw : k === 'src' ? g.bw * .55 : g.bw; box(k, S.pl[k] ? SLOTS.find(q => q[0] === S.pl[k])[1] : '', wd, S.pl[k]); if (S.hold) { const [x, y] = B[k]; if (!S.pl[k]) C1.zone(ctx, x, y, wd, g.bh, Math.abs(S.hx - x) < wd / 2 && Math.abs(S.hy - y) < g.bh / 2 + 8, false); } });
      SLOTS.forEach(([k, t], i) => { if (D.used(S, k) || S.hold === k) return; const [x, y] = D.chipPos(S, i); D.chip(ctx, x, y, t, g); });
      if (S.hold) { const s = SLOTS.find(q => q[0] === S.hold); D.chip(ctx, S.hx, S.hy, s[1], g, 1); }
      const n = Object.keys(S.pl).length; if (n === SLOTS.length) Q25.T(ctx, 'أحسنت! أكملت المخطط ✓', Q25.cx(w), h - 120, { s: 14, w: 900, c: '#fff', bg: '#15803d' });
      C2.drawMsg(ctx, S, Q25.cx(w), h - 190); K.party(ctx, S); },
    used(S, k) { return Object.values(S.pl).includes(k); },
    chip(ctx, x, y, t, g, lift) { const cw = g.ph ? (g.x1 - g.x0) / 2 - 8 : Math.min(200, (g.x1 - g.x0) / 4 - 12); K.raw(ctx, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = lift ? 14 : 4; ctx.fillStyle = '#fff'; rr(ctx, x - cw / 2, y - 18, cw, 36, 9); ctx.fill(); ctx.restore(); ctx.strokeStyle = '#0d9488'; ctx.lineWidth = 2; rr(ctx, x - cw / 2, y - 18, cw, 36, 9); ctx.stroke(); }); Q25.T(ctx, t, x, y, { s: g.ph ? 10.5 : 12, w: 900, c: '#134e4a' }); },
    drags(S) { if (!S.W) return []; const g = D.boxes(S), cw = g.ph ? (g.x1 - g.x0) / 2 - 8 : Math.min(200, (g.x1 - g.x0) / 4 - 12), out = [];
      SLOTS.forEach(([k, t, grp], i) => { if (D.used(S, k)) return; const [x, y] = S.hold === k ? [S.hx, S.hy] : D.chipPos(S, i);
        out.push({ id: 'c_' + k, x, y, w: cw, h: 36, axis: 'xy', keep: true, tip: 'اسحب «' + t + '» إلى مكانه', idle: i === 0 ? 'اسحبني إلى المخطط ✋' : undefined, hint: i === 0,
          down: (S, px, py) => { S.hold = k; S.hx = x; S.hy = y; S.dx0 = px - x; S.dy0 = py - y; }, drag: (S, d) => { S.hx = d.x - S.dx0; S.hy = d.y - S.dy0; },
          up: S => { const hit = SLOTS.find(([k2]) => { if (S.pl[k2]) return false; const [bx, by] = g.B[k2], wd = ['area', 'rho', 'dist'].includes(k2) ? g.sw : k2 === 'src' ? g.bw * .55 : g.bw; return Math.abs(S.hx - bx) < wd / 2 + 6 && Math.abs(S.hy - by) < g.bh / 2 + 10; });
            if (hit) { const ok = hit[0] === k || (hit[2] === 1 && grp === 1); if (ok) { S.pl[hit[0]] = k; C1.good(); if (Object.keys(S.pl).length === SLOTS.length) K.cheer(S, Q25.cx(g.w), g.h * .5); } else { S.err++; C1.wrong(); C2.msg(S, 'ليس هنا! ' + t, 2.2); } }
            S.hold = ''; } }); });
      return out; },
    readings(S) { return [rd('المربعات المكتملة', Object.keys(S.pl).length + ' / ' + SLOTS.length), rd('الأخطاء', S.err)]; },
    explain(S) { return 'لكل خاصية من خصائص الصوت عامل تعتمد عليه: <b>العلو</b> ← الشدة (مساحة السطح المهتز، كثافة الوسط، البعد)، <b>الدرجة</b> ← التردد، <b>النوع</b> ← نوع المصدر وطريقة الاهتزاز.'; }
  };
  M8.P[D.id] = D;
})();
/* ===================================== PARTS-END ===================================== */
/* daily-life line appended to each part's explanation */
(() => { Object.keys(Q25.LIFE).forEach(k => { const D = M8.P[k]; if (!D || D._life) return; D._life = 1; const ex = D.explain; D.explain = S => (ex ? ex(S) : '') + '<br><b>في حياتنا:</b> ' + Q25.LIFE[k]; }); })();
/* =========================================================================================
   Merged experiments (book order)
   ========================================================================================= */
M8.merge({ id: 'g8_wave_intro', ch: 25, sec: 'نشاط استهلالي + الدرس 1: ما الحركة الموجية؟', page: 57, kind: 'نشاط',
  title: 'حدوث الصوت وما الحركة الموجية',
  desc: 'نطرق الشوكة الرنانة فنسمع صوتاً ويتطاير الماء: الصوت يحدث بسبب الاهتزاز. ثم نرمي حجراً في بركة فنرى الاضطراب ينتقل بشكل دوائر بينما يهتز الماء في مكانه: الموجة تنقل الطاقة لا المادة.',
  tags: 'حدوث الصوت الحركة الموجية',
  fact: ['عند سقوط قطرة ماء على سطح ماء ساكن تتولد دوائر متحدة المركز تبتعد تدريجياً: إنها حركة موجية (ص 56).', 'الشوكة الرنانة المكتوب عليها 440 Hz يهتز كل فرع منها 440 مرة في الثانية الواحدة!'],
  quiz: [
    { q: 'تعد الموجات المنتشرة إحدى وسائل:', o: ['الاهتزاز', 'نقل الطاقة', 'تقليل الطاقة'], a: 1, why: 'مراجعة الفصل س2-2: الموجة المنتشرة إحدى وسائل نقل الطاقة.' },
    { q: 'لا يصاحب انتقال الصوت في وسط مادي انتقال دقائق الوسط، ما سبب ذلك؟', o: ['لأن الدقائق تهتز حول مواضع استقرارها وتنقل الطاقة فقط', 'لأن الدقائق لا تتحرك أبداً', 'لأن الصوت لا يحتاج إلى وسط'], a: 0, why: 'التفكير الناقد 3 (ص 61): الموجة اضطراب ينتقل دون أن تنتقل دقائق الوسط.' },
    { q: 'لماذا يهتز الماء ويتطاير عند تقريب الشوكة الرنانة المطروقة منه؟', o: ['لأن الشوكة ساخنة', 'لأن فرعي الشوكة يهتزان وينقلان طاقتهما إلى الماء', 'لأن الماء يجذب الشوكة'], a: 1, why: 'النشاط الاستهلالي ص 57: الصوت يحدث بسبب اهتزاز الأجسام.' }
  ],
  parts: [{ id: 'g8_w_fork', n: 'نشاط استهلالي: حدوث الصوت' }, { id: 'g8_w_pond', n: 'ما الحركة الموجية؟ (حجر في بركة)' }] });
M8.merge({ id: 'g8_wave_props', ch: 25, sec: 'الدرس 1: المفاهيم الخاصة بالحركة الموجية', page: 58, kind: 'نشاط', fig: 'شكل 1 ص 58',
  title: 'مفاهيم الحركة الموجية: الطول الموجي والتردد والسعة وسرعة الموجة',
  desc: 'على حبل تنتشر فيه موجة نقيس الطول الموجي λ والتردد f ومدة الذبذبة T والسعة ونتحقق من v = λ f، ثم نقارن موجتين على حبلين: نفس λ وسعة مختلفة، وتردد مختلف، ووسط مختلف.',
  tags: 'مفاهيم الموجة',
  fact: ['وحدة التردد «هيرتز» سميت باسم العالم الألماني هاينرش هيرتز الذي اكتشف الموجات الراديوية.', 'ومن صفات الموجات أنها تسير بخطوط مستقيمة في الوسط المتجانس، وتنعكس وتنكسر (ص 59).'],
  quiz: [
    { q: 'أقصر بعد بين نقطتين متتاليتين مهتزتين بكيفية واحدة يسمى:', o: ['سعة الاهتزاز', 'الطول الموجي', 'مدة الذبذبة'], a: 1, why: 'ص 58: الطول الموجي λ.' },
    { q: 'جسم يهتز 20 ذبذبة خلال ثانية واحدة، تردده:', o: ['20 Hz', '0.05 Hz', '20 s'], a: 0, why: 'ص 58: التردد = عدد الذبذبات خلال وحدة الزمن.' },
    { q: 'موجة ترددها 5 Hz وطولها الموجي 2 m، سرعتها:', o: ['2.5 m/s', '10 m/s', '7 m/s'], a: 1, why: 'v = λ f = 2 × 5 = 10 m/s.' }
  ],
  parts: [{ id: 'g8_w_concepts', n: 'شكل 1: λ و f و T والسعة و v = λ f' }, { id: 'g8_w_compare', n: 'قارن موجتين (التفكير الناقد 1)' }] });
M8.merge({ id: 'g8_wave_types', ch: 25, sec: 'الدرس 1: أنواع الموجات (الطولية والمستعرضة)', page: 59, kind: 'نشاط', fig: 'شكل 2 و 3 ص 59',
  title: 'الموجات الطولية والمستعرضة',
  desc: 'نقسم الموجات بحسب حركة دقائق الوسط بالنسبة لاتجاه انتشار الموجة: على النابض نفسه نولّد موجة طولية (تضاغطات وتخلخلات) وموجة مستعرضة (قمم وقعور) ونقارن بينهما، ثم ننفّذ نشاط الثقل المعلق بالنابض، ونصنّف موجات من حياتنا.',
  tags: 'أنواع الموجات طولية مستعرضة',
  fact: ['من الجدير بالذكر أن هناك موجات مستعرضة لا تحتاج بالضرورة إلى وسط مادي لانتقالها، فهي تنتقل بالفراغ كما تنتقل في بعض الأوساط المادية، كموجات الضوء والراديو (ص 59).', 'محطات رصد الزلازل تسجّل الموجات الطولية أولاً لأنها أسرع من غيرها.'],
  quiz: [
    { q: 'عندما يهتز وتر مثبت من أحد طرفيه إلى الأعلى والأسفل فإنك تحصل على موجات:', o: ['طولية', 'مستعرضة', 'صوتية فقط'], a: 1, why: 'مراجعة الفصل س1-3.' },
    { q: 'تهتز جزيئات الوسط في الموجة الطولية ........ لاتجاه انتشار الموجة:', o: ['عمودياً', 'بشكل موازٍ', 'بزاوية 45°'], a: 1, why: 'مراجعة الفصل س1-4.' },
    { q: 'واحدة مما يلي ليست من أنواع الموجات الطولية:', o: ['موجة الزلزال', 'الموجات فوق السمعية', 'الموجة الكهرومغناطيسية'], a: 2, why: 'مراجعة الفصل س2-7: الكهرومغناطيسية مستعرضة.' }
  ],
  parts: [{ id: 'g8_w_slinky', n: 'طولية ومستعرضة على النابض نفسه (شكل 2 و 3، س6)' }, { id: 'g8_w_springact', n: 'نشاط: خصائص الموجة الطولية' }, { id: 'g8_w_classify', n: 'صنّف الموجات بحسب حركة دقائق الوسط' }] });
M8.merge({ id: 'g8_em_waves', ch: 25, sec: 'الدرس 1: الموجات الكهرومغناطيسية + الفيزياء والحياة', page: 59, kind: 'نشاط', fig: 'شكل 4 و 5',
  title: 'الموجات الكهرومغناطيسية والطيف الكهرومغناطيسي',
  desc: 'موجات مستعرضة تنتقل في الفراغ بسرعة 3×10⁸ m/s: نستكشف الطيف الكهرومغناطيسي من الراديوية إلى أشعة كاما واستعمالات كل نوع، ثم نرى أهمية طبقة الأوزون في امتصاص الأشعة فوق البنفسجية الضارة.',
  tags: 'كهرومغناطيسية طيف أوزون',
  fact: ['ضوء الشمس يقطع المسافة إلى الأرض عبر الفراغ في نحو 8 دقائق، لأن الموجات الكهرومغناطيسية لا تحتاج إلى وسط مادي.', 'أشعة كاما هي الأقصر طولاً في الطيف الكهرومغناطيسي، وتستعمل لعلاج الأمراض السرطانية (شكل 5).'],
  quiz: [
    { q: 'تنتقل الموجات الضوئية والراديوية في الفراغ بـ:', o: ['سرعة واحدة 3×10⁸ m/s', 'سرعات مختلفة', 'سرعة الصوت'], a: 0, why: 'مراجعة الفصل س1-2.' },
    { q: 'تستثمر موجات الأشعة السينية في:', o: ['تشخيص بعض الأمراض (كسور العظام) وفي جهاز المفراس', 'بث إشارات الراديو', 'أفران الطبخ'], a: 0, why: 'مراجعة الفصل س1-5 ومراجعة الدرس 5 (ص 61).' },
    { q: 'الموجة الكهرومغناطيسية تنتقل في:', o: ['الأوساط المادية فقط', 'الفراغ وفي بعض الأوساط المادية', 'السوائل فقط'], a: 1, why: 'مراجعة الفصل س1-1 (ص 59).' }
  ],
  parts: [{ id: 'g8_em_spectrum', n: 'الطيف الكهرومغناطيسي وأنواعه (شكل 4)' }, { id: 'g8_em_ozone', n: 'أهمية طبقة الأوزون (ص 67)' }] });
M8.merge({ id: 'g8_sound_travel', ch: 25, sec: 'الدرس 2: ما الصوت؟ وانتقاله ومقدار سرعته', page: 62, kind: 'نشاط', fig: 'شكل 1 ص 62 + نشاط ص 63',
  title: 'الصوت: كيف ينتقل وما مقدار سرعته؟',
  desc: 'الصوت موجة طولية من تضاغطات وتخلخلات تنتقل في الأوساط المادية فقط. نرى ذلك بمكبر الصوت وجزيئات الهواء، وبلهب الشمعة (نشاط ص 63)، ونقارن سرعة الصوت في الصلب والسائل والغاز، ونجرب الناقوس المفرغ، ونحسب S = 331 + 0.6 T (مثال 1).',
  tags: 'الصوت انتقال سرعة',
  fact: ['حقيقة علمية: الموجات الصوتية أقل سرعة من الموجات الضوئية (ص 66)، لذلك نرى البرق قبل أن نسمع الرعد.', 'الحيتان تتواصل بأصوات تنتقل في ماء المحيط مئات الكيلومترات.'],
  quiz: [
    { q: 'مقدار سرعة الصوت في المواد الصلبة:', o: ['أقل مما في السوائل', 'أكبر مما في السوائل والغازات', 'تساوي سرعتها في الغازات'], a: 1, why: 'مراجعة الفصل س2-3.' },
    { q: 'القانون الذي يوضح تأثير درجة الحرارة في مقدار سرعة الصوت في الهواء:', o: ['S = 331 + 0.6 T', 'v = λ f', 'S = d × t'], a: 0, why: 'مراجعة الدرس س2 (ص 66)، مثال 1: عند 30°C تكون 349 m/s.' },
    { q: 'لماذا لا ينتقل الصوت في الفراغ؟', o: ['لأنه موجة طولية تحتاج إلى دقائق وسط مادي', 'لأن الفراغ بارد', 'لأن سرعته كبيرة جداً'], a: 0, why: 'التفكير الناقد 1 (ص 66).' }
  ],
  parts: [{ id: 'g8_s_fig1', n: 'ما الصوت؟ تضاغطات وتخلخلات (شكل 1)' }, { id: 'g8_s_candle', n: 'نشاط: انتقال الموجات الصوتية (الشمعة)' }, { id: 'g8_s_media', n: 'مقدار سرعة الصوت في الأوساط S = d/t' }, { id: 'g8_s_vacuum', n: 'لا ينتقل الصوت في الفراغ (التفكير الناقد 1)' }, { id: 'g8_s_temp', n: 'S = 331 + 0.6T (مثال 1)' }] });
M8.merge({ id: 'g8_echo', ch: 25, sec: 'الدرس 2: انعكاس الموجات الصوتية والصدى', page: 63, kind: 'نشاط', fig: 'شكل 2 ص 63',
  title: 'انعكاس الصوت والصدى',
  desc: 'الموجات الصوتية ترتد عن الحواجز (الانعكاس) فنسمع الصدى إذا كان الزمن بين الصوت وصداه 0.1 s على الأقل (17 m). نحل مثال 2 وس4 على المشهد نفسه، ونستكشف فوائد الصدى في قياس أعماق البحار وتحديد الأسماك ومضاره في القاعات.',
  tags: 'انعكاس الصدى',
  fact: ['الخفافيش والدلافين تستعمل صدى أصواتها لتحديد مواقع الأشياء في الظلام.', 'الانعكاس صفة عامة لجميع الموجات، ومنها موجات الضوء والماء.'],
  quiz: [
    { q: 'أقل بعد لحاجز ينعكس عنه الصوت ويُسمع صداه هو:', o: ['12 m', '17 m', '19 m'], a: 1, why: 'مراجعة الفصل س2-5.' },
    { q: 'شخص يقف أمام حاجز يبعد عنه 340 m، أرسل صوتاً فسمع صداه بعد 2 s. سرعة الصوت:', o: ['170 m/s', '340 m/s', '680 m/s'], a: 1, why: 'س4: S = 340 ÷ (2 × ½) = 340 m/s ، ودرجة الحرارة 15 °C.' },
    { q: 'من فوائد الصدى:', o: ['قياس أعماق البحار', 'تقليل علو الصوت', 'زيادة درجة الصوت'], a: 0, why: 'مراجعة الفصل س3-3 (ص 64).' }
  ],
  parts: [{ id: 'g8_e_echo', n: 'الصدى وشرطاه (شكل 2)' }, { id: 'g8_e_examples', n: 'مثال 2 و س4: احسب سرعة الصوت' }, { id: 'g8_e_uses', n: 'فوائد الصدى ومضاره' }] });
M8.merge({ id: 'g8_sound_props', ch: 25, sec: 'الدرس 2: أنواع الموجات الصوتية وخصائص الصوت + الفيزياء والحياة', page: 64, kind: 'نشاط', fig: 'ص 64–67',
  title: 'أنواع الموجات الصوتية وخصائص الصوت',
  desc: 'نصنّف الموجات الصوتية حسب ترددها (دون السمعية، السمعية 20–20000 Hz، فوق السمعية)، ونميّز الأصوات بخصائصها الثلاث: العلو (والضوضاء)، الدرجة، النوع. ثم نستكشف تطبيقات الموجات فوق السمعية ونكمل مخطط المفاهيم (س5).',
  tags: 'خصائص الصوت أنواع الموجات الصوتية',
  fact: ['حقيقة علمية: الموجات الصوتية أقل سرعة من الموجات الضوئية (ص 66).', 'الخفاش يصدر موجات فوق سمعية ويستقبل صداها ليحدد طريقه وفريسته في الظلام.'],
  quiz: [
    { q: 'درجة الصوت تعتمد على:', o: ['شدة الصوت', 'تردد الصوت', 'كثافة وسط الانتشار'], a: 1, why: 'مراجعة الفصل س2-1.' },
    { q: 'أيّ من الترددات الآتية ليس بإمكان شخص أن يسمعها؟', o: ['50 Hz', '15000 Hz', '30000 Hz'], a: 2, why: 'مراجعة الفصل س2-6: مدى السمع 20–20000 Hz.' },
    { q: 'أيّ خاصية من خصائص الصوت تستعمل للتمييز بين صوت الطائرة وصوت الإنسان؟', o: ['نوع الصوت', 'سرعة الصوت', 'الطول الموجي فقط'], a: 0, why: 'مراجعة الدرس س4 (ص 66).' }
  ],
  parts: [{ id: 'g8_p_range', n: 'أنواع الموجات الصوتية ومدى السمع (ص 64)' }, { id: 'g8_p_loud', n: 'علو الصوت والضوضاء (ص 65)' }, { id: 'g8_p_pitch', n: 'درجة الصوت (ص 66)' }, { id: 'g8_p_quality', n: 'نوع مصدر الصوت (ص 66)' }, { id: 'g8_p_ultra', n: 'تطبيقات الموجات فوق السمعية (ص 67)' }, { id: 'g8_p_map', n: 'مخطط المفاهيم: خصائص الصوت (س5)' }] });
/* END */
