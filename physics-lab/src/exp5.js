'use strict';
/* ======================= الفصل الخامس: البصريات الفيزيائية ======================= */
function screenPattern(ctx, x, y0, y1, I, nm, wid = 26) {
  const [r, g, b] = wlRGB(nm); const n = Math.ceil(y1 - y0);
  for (let k = 0; k < n; k++) { const v = clamp(I(k / n), 0, 1); ctx.fillStyle = `rgb(${Math.round(r * v)},${Math.round(g * v)},${Math.round(b * v)})`; ctx.fillRect(x, y0 + k, wid, 1.2); }
}
function patternImg(ctx, x0, y0, W, H, I, nm) { const [r, g, b] = wlRGB(nm); for (let k = 0; k < W; k++) { const v = clamp(I(k / W), 0, 1); ctx.fillStyle = `rgb(${Math.round(r * v)},${Math.round(g * v)},${Math.round(b * v)})`; ctx.fillRect(x0 + k, y0, 1.2, H); } }

/* ---- Activity 1: ripple tank ---- */
X({ id: 'ripple', ch: 5, sec: '2-5', page: 153, kind: 'نشاط', title: 'نشاط (1): تداخل الموجات (حوض المويجات)', desc: 'مصدران نقطيان متشاكهان يولدان موجات دائرية على سطح الماء؛ يظهر نمط التداخل بخطوط بناء وخطوط إتلاف.',
  tools: ['جهاز حوض المويجات', 'مجهز قدرة', 'هزاز', 'نقار ذو رأسين (مدببين) بمثابة مصدرين نقطيين (S₁ و S₂) يبعثان موجات دائرية تنتشر على سطح الماء بالطول الموجي نفسه'],
  steps: ['نعد حوض المويجات للعمل بحيث يمس طرفا النقار سطح الماء في الحوض.', 'عند اشتغال الهزاز نشاهد طراز التداخل على سطح الماء نتيجة تراكب الموجات الناتجة عن اهتزاز المصدرين النقطيين (S₁ و S₂).', 'والآن: يتبادر إلى ذهنك السؤال الآتي: أيبعث المصدران الموجتين بطور واحد؟ وما نوع التداخل الحاصل؟', 'غيّر البعد بين المصدرين والطول الموجي، واجعل فرق طور بين المصدرين، ولاحظ تغير نمط التداخل.'],
  concl: ['تداخل بنّاء: عند نقطة معينة تتحد الموجتان في الطور نفسه (قمة مع قمة) فتكون سعة الموجة المحصلة مساوية لضعف سعة أي منهما (Δℓ = mλ).', 'تداخل إتلافي: عند نقطة تكون فيها الموجتان متعاكستين في الطور (قمة مع قعر) فتكون السعة المحصلة صفراً (Δℓ = (m + ½)λ).', 'شرط حصول نمط تداخل ثابت: أن يكون المصدران متشاكهين (التردد نفسه وفرق طور ثابت).'],
  laws: ['constr', 'phdiff'],
  controls: [R('lam', 'الطول الموجي λ', 14, 50, 28, 1, 'px'), R('d', 'البعد بين المصدرين d', 20, 200, 90, 2, 'px'), R('ph', 'فرق الطور بين المصدرين', 0, 360, 0, 5, '°'), TG('lines', 'إظهار خطوط التداخل الإتلافي (العقد)', true), SEL('res', 'الدقة', [[4, 'عالية'], [6, 'متوسطة']], 4)],
  setup(S) { S.probe = null; },
  pointer(S, t, x, y) { if (t === 'down' || t === 'drag') S.probe = [x, y]; },
  draw(ctx, w, h, S) {
    const p = S.p; const k = TAU / p.lam; const wt = S.t * 6; const sx = w * .15, s1 = [sx, h / 2 - p.d / 2], s2 = [sx, h / 2 + p.d / 2]; const res = p.res;
    const img = ctx.createImageData(Math.ceil(w / res), Math.ceil(h / res)); const D = img.data; const ph2 = rad(p.ph);
    for (let j = 0; j < img.height; j++) for (let i = 0; i < img.width; i++) { const x = i * res, y = j * res; const r1 = Math.hypot(x - s1[0], y - s1[1]) + 1, r2 = Math.hypot(x - s2[0], y - s2[1]) + 1; const z = Math.sin(k * r1 - wt) / Math.sqrt(r1 / 40 + 1) + Math.sin(k * r2 - wt + ph2) / Math.sqrt(r2 / 40 + 1); const v = clamp(.5 + z * .32, 0, 1); const o = (j * img.width + i) * 4; D[o] = 20 + 90 * v; D[o + 1] = 70 + 150 * v; D[o + 2] = 120 + 135 * v; D[o + 3] = 255; }
    const oc = S.oc || (S.oc = document.createElement('canvas')); oc.width = img.width; oc.height = img.height; oc.getContext('2d').putImageData(img, 0, 0); ctx.imageSmoothingEnabled = true; ctx.drawImage(oc, 0, 0, w, h);
    if (p.lines) { ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.setLineDash([4, 5]); ctx.lineWidth = 1.3; for (let m = -8; m <= 8; m++) { const dl = (m + .5) * p.lam - p.ph / 360 * p.lam; if (Math.abs(dl) >= p.d) continue; ctx.beginPath(); let st = false; for (let x = sx + 2; x < w; x += 4) { let lo = -h, hi = 2 * h; for (let it = 0; it < 40; it++) { const y = (lo + hi) / 2; const f = Math.hypot(x - s2[0], y - s2[1]) - Math.hypot(x - s1[0], y - s1[1]) - dl; if (f > 0) lo = y; else hi = y; } const y = (lo + hi) / 2; if (y < -10 || y > h + 10) { st = false; continue; } st ? ctx.lineTo(x, y) : ctx.moveTo(x, y); st = true; } ctx.stroke(); } ctx.setLineDash([]); }
    [s1, s2].forEach((s, i) => { ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(s[0], s[1], 6, 0, TAU); ctx.fill(); G.text(ctx, 'S' + (i + 1), s[0] - 18, s[1], { s: 13, w: 900, c: '#fde68a' }); });
    if (S.probe) { const [x, y] = S.probe; const dl = Math.hypot(x - s2[0], y - s2[1]) - Math.hypot(x - s1[0], y - s1[1]); S.pdl = dl / p.lam - p.ph / 360; ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(s1[0], s1[1]); ctx.lineTo(x, y); ctx.lineTo(s2[0], s2[1]); ctx.stroke(); ctx.fillStyle = '#f472b6'; ctx.beginPath(); ctx.arc(x, y, 6, 0, TAU); ctx.fill(); G.text(ctx, 'P', x + 12, y - 10, { s: 13, w: 900, c: '#f9a8d4' }); }
    else G.text(ctx, 'انقر على أي نقطة P لقياس فرق المسار', w * .6, 22, { s: 12, bg: 'rgba(15,23,42,.6)' });
  },
  readings(S) { if (S.pdl === undefined) return [rd('فرق المسار Δℓ', '—'), rd('نوع التداخل عند P', 'انقر على الحوض', 1)]; const f = S.pdl; const fr = Math.abs(f - Math.round(f)); return [rd('فرق المسار Δℓ', fmt(Math.abs(S.pdl), 3) + ' λ'), rd('فرق الطور Φ', fmt(Math.abs(S.pdl) * 360 % 360, 3, '°')), rd('نوع التداخل عند P', fr < .15 ? 'بنّاء (Δℓ = mλ)' : Math.abs(fr - .5) < .15 ? 'إتلافي (Δℓ = (m+½)λ)' : 'جزئي', 1)]; }
});

/* ---- Young's double slit ---- */
X({ id: 'young', ch: 5, sec: '3-5', page: 157, kind: 'تجربة', title: 'تجربة شقي يونك', desc: 'ضوء أحادي اللون يسقط على حاجز فيه شقان ضيقان متوازيان؛ تظهر على الشاشة هدب مضيئة ومظلمة متعاقبة. نقيس فاصلة الهدب ونحسب الطول الموجي.',
  tools: ['مصدر ضوئي أحادي اللون (مثل الليزر)', 'حاجز فيه شق مفرد', 'حاجز فيه شقان متوازيان ضيقان بينهما بعد صغير d', 'شاشة على بعد L'],
  steps: ['نضع المصدر الضوئي خلف الحاجز ذي الشق المفرد ثم الحاجز ذي الشقين.', 'نلاحظ على الشاشة هدباً مضيئة ومظلمة متعاقبة ومتساوية البعد، والهدب المركزي مضيء.', 'نقيس فاصلة الهدب Δy ونغيّر البعد بين الشقين d وبعد الشاشة L والطول الموجي λ ونلاحظ التغير.', 'نستعمل الضوء الأبيض ونلاحظ أن الهدب المركزي أبيض والهدب الأخرى ملونة.'],
  concl: ['الهدب المضيئة: d sinθ = mλ ، yₘ = λLm/d.', 'الهدب المظلمة: d sinθ = (m + ½)λ.', 'فاصلة الهدب Δy = λL/d: تزداد بزيادة λ وبزيادة L وبنقصان d.', 'تجربة يونك أثبتت الطبيعة الموجية للضوء، وتستعمل لقياس الطول الموجي للضوء أحادي اللون.'],
  laws: ['young', 'constr', 'phdiff'],
  controls: [R('lam', 'الطول الموجي λ', 380, 750, 633, 1, 'nm'), R('d', 'البعد بين الشقين d', .05, 1, .2, .01, 'mm'), R('L', 'بعد الشاشة L', .5, 3, 1, .05, 'm'), R('a', 'عرض الشق', .01, .1, .03, .005, 'mm'), TG('white', 'استعمال الضوء الأبيض', false), TG('single', 'غلق أحد الشقين', false)],
  intensity(S, y) { const p = S.p; const L = p.L, d = p.d * 1e-3, a = p.a * 1e-3; const th = Math.atan(y / L); const one = (lam) => { const be = Math.PI * a * Math.sin(th) / lam; const env = be === 0 ? 1 : (Math.sin(be) / be) ** 2; if (p.single) return env * .25; return env * Math.cos(Math.PI * d * Math.sin(th) / lam) ** 2; }; return one; },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h, false); const p = S.p; const Y = .04; // half-width of screen in m shown
    const lx = 30, sx = w * .22, dx = w * .38, scx = w * .62; const cy = h * .5;
    // laser
    ctx.fillStyle = '#334155'; rr(ctx, lx, cy - 16, 70, 32, 6); ctx.fill(); const col = p.white ? '#ffffff' : wlColor(p.lam);
    ctx.fillStyle = col; ctx.fillRect(lx + 70, cy - 3, sx - lx - 70, 6);
    // barriers
    ctx.fillStyle = '#94a3b8'; ctx.fillRect(sx, 30, 6, cy - 34); ctx.fillRect(sx, cy + 4, 6, h - 30 - cy - 4);
    const gs = clamp(p.d * 110, 10, 120);
    ctx.fillRect(dx, 30, 6, cy - gs / 2 - 34); ctx.fillRect(dx, cy - gs / 2 + 3, 6, gs - 6); ctx.fillRect(dx, cy + gs / 2 + 3, 6, h - 30 - cy - gs / 2 - 3); if (p.single) ctx.fillRect(dx, cy + gs / 2 - 4, 6, 8);
    // wavefronts between
    ctx.strokeStyle = p.white ? 'rgba(255,255,255,.35)' : wlColor(p.lam, .4); ctx.lineWidth = 1.2; const lp = 16 * p.lam / 600; const off = (S.t * 40) % lp;
    for (let r = off; r < dx - sx; r += lp) { ctx.beginPath(); ctx.arc(sx + 3, cy, r, -1.1, 1.1); ctx.stroke(); }
    [cy - gs / 2, cy + gs / 2].forEach((yy, i) => { if (i === 1 && p.single) return; for (let r = off; r < scx - dx; r += lp) { ctx.beginPath(); ctx.arc(dx + 3, yy, r, -1.2, 1.2); ctx.stroke(); } });
    // screen side view pattern & big pattern
    const I = y => { if (p.white) { let s = [0, 0, 0]; [450, 520, 580, 640].forEach((nm, k) => { const v = this.intensity(S, y)(nm * 1e-9); const c = wlRGB(nm); s[0] += c[0] * v; s[1] += c[1] * v; s[2] += c[2] * v; }); return s.map(v => v / 2.2); } return this.intensity(S, y)(p.lam * 1e-9); };
    const scrH = h - 60; for (let k = 0; k < scrH; k++) { const y = (k / scrH - .5) * 2 * Y; const v = I(y); if (p.white) ctx.fillStyle = `rgb(${v.map(c => Math.round(clamp(c, 0, 255))).join(',')})`; else { const c = wlRGB(p.lam); ctx.fillStyle = `rgb(${c.map(q => Math.round(q * v)).join(',')})`; } ctx.fillRect(scx, 30 + k, 14, 1.2); }
    // intensity graph
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.6; ctx.beginPath(); for (let k = 0; k < scrH; k++) { const y = (k / scrH - .5) * 2 * Y; let v = I(y); if (p.white) v = (v[0] + v[1] + v[2]) / 765 * 1.2; const x = scx + 22 + v * (w - scx - 40); k ? ctx.lineTo(x, 30 + k) : ctx.moveTo(x, 30 + k); } ctx.stroke();
    // fringe labels
    if (!p.white) { const dy = p.lam * 1e-9 * p.L / (p.d * 1e-3); for (let m = -3; m <= 3; m++) { const yy = m * dy; if (Math.abs(yy) > Y) continue; const py = 30 + (yy / (2 * Y) + .5) * scrH; G.text(ctx, 'm=' + m, scx - 22, py, { s: 10, c: '#cbd5e1' }); } }
    G.text(ctx, 'L = ' + p.L + ' m', (dx + scx) / 2, h - 14, { s: 12 }); G.text(ctx, 'd', dx - 12, cy, { s: 13, w: 900, c: '#fde68a' });
  },
  readings(S) { const p = S.p; const dy = p.lam * 1e-9 * p.L / (p.d * 1e-3); return [rd('فاصلة الهدب Δy = λL/d', fmtSI(dy, 'm')), rd('موقع الهدب المضيء m=1', fmtSI(dy, 'm')), rd('موقع الهدب المظلم الأول', fmtSI(dy / 2, 'm')), rd('زاوية المرتبة الأولى θ₁', fmt(deg(Math.asin(p.lam * 1e-9 / (p.d * 1e-3))), 3, '°'))]; },
  record(S) { const p = S.p; return { lam: p.lam, d: p.d, L: p.L, dy: +(p.lam * 1e-9 * p.L / (p.d * 1e-3) * 1e3).toFixed(3) }; }, cols: [['lam', 'λ (nm)'], ['d', 'd (mm)'], ['L', 'L (m)'], ['dy', 'Δy (mm)']],
  graph: { x: 'lam', y: 'dy', xl: 'λ (nm)', yl: 'Δy (mm)', theory: (x, S) => x * 1e-9 * S.p.L / (S.p.d * 1e-3) * 1e3, xmin: 350, xmax: 780 }
});

/* ---- Thin films ---- */
X({ id: 'thinfilm', ch: 5, sec: '4-5', page: 161, kind: 'تجربة', title: 'التداخل في الأغشية الرقيقة (فقاعة الصابون)', desc: 'ضوء ينعكس عن السطحين الأمامي والخلفي لغشاء رقيق؛ يتداخل الشعاعان فتظهر ألوان تعتمد على سمك الغشاء.',
  tools: ['غشاء صابون رقيق على حلقة سلكية (أو طبقة زيت على الماء)', 'مصدر ضوء أبيض', 'مصدر ضوء أحادي اللون'],
  steps: ['أمسك الحلقة شاقولياً فيتسرب الماء إلى الأسفل ويصبح الغشاء إسفيني الشكل (أرق في الأعلى).', 'لاحظ الحزم الملونة الأفقية في الضوء الأبيض، والهدب المضيئة والمظلمة في الضوء أحادي اللون.', 'لاحظ أن الجزء الأرق جداً في الأعلى يظهر مظلماً (بسبب انقلاب الطور 180° عند الانعكاس من السطح الأمامي).'],
  concl: ['يعتمد التداخل في الأغشية الرقيقة على عاملين: سمك الغشاء t، وانقلاب الطور بمقدار π عند الانعكاس من الوسط الأكبر معامل انكسار.', 'شرط الهدب المضيء (تداخل بناء): 2nt = (m + ½)λ.', 'شرط الهدب المظلم (تداخل إتلافي): 2nt = mλ.', 'طول الموجة داخل الغشاء λn = λ/n.'],
  laws: ['thin', 'constr'],
  controls: [R('n', 'معامل انكسار الغشاء n', 1.2, 1.6, 1.33, .01, ''), R('tmax', 'أكبر سمك للغشاء (في الأسفل)', 200, 2000, 1000, 10, 'nm'), SEL('src', 'مصدر الضوء', [['white', 'ضوء أبيض'], [589, 'أصفر 589nm (صوديوم)'], [633, 'أحمر 633nm'], [470, 'أزرق 470nm']], 'white'), TG('drain', 'تسرّب الماء (تغيّر السمك مع الزمن)', true)],
  setup(S) { S.k = 0; },
  thick(S, u) { const p = S.p; const tm = p.tmax * (p.drain ? (.6 + .4 * Math.cos(S.t * .25)) : 1); return tm * Math.pow(u, 1.4); },
  refl(S, t, nm) { const p = S.p; const d = 2 * p.n * t / nm + .5; return Math.pow(Math.sin(Math.PI * d), 2) * 0 + Math.pow(Math.cos(Math.PI * d), 2); },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h, false); const p = S.p; const cx = w * .4, cy = h * .5, R0 = Math.min(w * .3, h * .42);
    ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R0 * .8, R0, 0, 0, TAU); ctx.clip();
    for (let y = cy - R0; y < cy + R0; y += 2) { const u = (y - (cy - R0)) / (2 * R0); const t = this.thick(S, u); let c;
      if (p.src === 'white') { let s = [0, 0, 0]; for (let nm = 400; nm <= 700; nm += 20) { const v = this.refl(S, t, nm); const q = wlRGB(nm); s[0] += q[0] * v; s[1] += q[1] * v; s[2] += q[2] * v; } c = s.map(v => Math.round(clamp(v / 6.2, 0, 255))); }
      else { const v = this.refl(S, t, +p.src); c = wlRGB(+p.src).map(q => Math.round(q * v)); }
      ctx.fillStyle = `rgb(${c.join(',')})`; ctx.fillRect(cx - R0, y, 2 * R0, 2.4); }
    ctx.restore();
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(cx, cy, R0 * .8, R0, 0, 0, TAU); ctx.stroke(); ctx.fillStyle = '#cbd5e1'; ctx.fillRect(cx - 4, cy + R0, 8, 60);
    // cross section diagram
    const bx = w * .78, by = h * .3; ctx.fillStyle = 'rgba(147,197,253,.25)'; ctx.fillRect(bx - 50, by, 100, 40); ctx.strokeStyle = '#93c5fd'; ctx.strokeRect(bx - 50, by, 100, 40);
    G.arrow(ctx, bx - 60, by - 70, bx - 20, by, '#fde68a', 2, 7); G.arrow(ctx, bx - 20, by, bx + 10, by - 60, '#fbbf24', 2, 7); ctx.strokeStyle = '#fde68a'; ctx.beginPath(); ctx.moveTo(bx - 20, by); ctx.lineTo(bx, by + 40); ctx.stroke(); G.arrow(ctx, bx, by + 40, bx + 20, by, '#fde68a', 1.5, 6); G.arrow(ctx, bx + 20, by, bx + 50, by - 60, '#f59e0b', 2, 7);
    G.text(ctx, 'انقلاب طور π', bx + 20, by - 76, { s: 11, c: '#fca5a5' }); G.text(ctx, 't', bx + 60, by + 20, { s: 13, w: 900 }); G.text(ctx, 'n = ' + p.n, bx, by + 58, { s: 12 });
  },
  readings(S) { const p = S.p; const nm = p.src === 'white' ? 550 : +p.src; return [rd('طول الموجة في الغشاء λ/n', fmt(nm / p.n, 4, 'nm')), rd('أقل سمك لهدب مضيء λ/4n', fmt(nm / (4 * p.n), 4, 'nm')), rd('أقل سمك لهدب مظلم (غير الصفر) λ/2n', fmt(nm / (2 * p.n), 4, 'nm')), rd('الجزء الأعلى (t → 0)', 'مظلم (انقلاب الطور)', 1)]; }
});

/* ---- Activity 2: diffraction single slit ---- */
X({ id: 'single_slit', ch: 5, sec: '5-5', page: 162, kind: 'نشاط', title: 'نشاط (2): حيود الضوء (الشق المفرد)', desc: 'ضوء أحادي اللون يمر خلال شق ضيق؛ تظهر منطقة مركزية مضيئة عريضة تحيطها مناطق مضيئة ومظلمة متعاقبة أقل شدة.',
  tools: ['لوح زجاج', 'دبوس', 'دهان أسود', 'مصدر ضوئي أحادي اللون'],
  steps: ['ادهن لوح الزجاج بالدهان الأسود.', 'اعمل شقاً رفيعاً في لوح الزجاج باستعمال رأس الدبوس.', 'انظر من خلال الشق إلى المصدر الضوئي، ماذا تلاحظ؟', 'ستلاحظ مناطق مضيئة تتخللها مناطق معتمة، وأن المنطقة المضيئة الوسطية عريضة وشديدة الإضاءة وأن الهدب المضيئة تقل شدتها بالتدريج عند الابتعاد عن الهدب المركزي المضيء.', 'قلّل عرض الشق ولاحظ اتساع النمط.'],
  concl: ['إن ظهور مناطق مضيئة وأخرى مظلمة على جانبي الشق يدل على أن الضوء يحيد عن مساره (الحيود).', 'الشرط اللازم للحصول على هدب معتم هو: ℓ sinθ = mλ ، m = ±1, ±2, ±3.', 'الشرط اللازم للحصول على هدب مضيء هو: ℓ sinθ = (m + ½)λ.', 'يزداد اتساع الهدب المركزي بنقصان عرض الشق ℓ أو بزيادة الطول الموجي λ.'],
  laws: ['slit'],
  controls: [R('lam', 'الطول الموجي λ', 380, 750, 600, 1, 'nm'), R('a', 'عرض الشق ℓ', 2, 40, 8, .5, 'µm'), R('L', 'بعد الشاشة', .5, 2, 1, .05, 'm')],
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h, false); const p = S.p; const a = p.a * 1e-6, lam = p.lam * 1e-9; const Y = .35;
    const I = u => { const y = (u - .5) * 2 * Y; const th = Math.atan(y / p.L); const b = Math.PI * a * Math.sin(th) / lam; return b === 0 ? 1 : (Math.sin(b) / b) ** 2; };
    patternImg(ctx, 30, 30, w - 60, h * .38, u => Math.pow(I(u), .55), p.lam);
    const gy = h * .5 + 20, gh = h * .42; ctx.strokeStyle = 'rgba(255,255,255,.2)'; ctx.beginPath(); ctx.moveTo(30, gy + gh); ctx.lineTo(w - 30, gy + gh); ctx.stroke();
    ctx.strokeStyle = wlColor(p.lam); ctx.lineWidth = 2; ctx.beginPath(); for (let x = 0; x <= w - 60; x++) { const v = I(x / (w - 60)); const yy = gy + gh - v * gh; x ? ctx.lineTo(30 + x, yy) : ctx.moveTo(30, yy); } ctx.stroke();
    for (let m = -3; m <= 3; m++) { if (!m) continue; const s = m * lam / a; if (Math.abs(s) >= 1) continue; const y = p.L * Math.tan(Math.asin(s)); const u = y / (2 * Y) + .5; if (u < 0 || u > 1) continue; const x = 30 + u * (w - 60); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x, gy + gh); ctx.stroke(); ctx.setLineDash([]); G.text(ctx, 'm=' + m, x, gy - 6, { s: 10, c: '#cbd5e1' }); }
    G.text(ctx, 'توزيع الشدة على الشاشة', w / 2, gy + gh + 14, { s: 11, c: '#94a3b8' });
  },
  readings(S) { const p = S.p; const s = p.lam * 1e-9 / (p.a * 1e-6); const th = s < 1 ? Math.asin(s) : NaN; return [rd('زاوية أول هدب مظلم θ₁', isFinite(th) ? fmt(deg(th), 3, '°') : '> 90°'), rd('عرض الهدب المركزي', isFinite(th) ? fmtSI(2 * p.L * Math.tan(th), 'm') : '—'), rd('λ/ℓ', fmt(s, 3))]; }
});

/* ---- Diffraction grating ---- */
X({ id: 'grating', ch: 5, sec: '6-5', page: 163, kind: 'تجربة', title: 'محزز الحيود وقياس الطول الموجي (المطياف)', desc: 'محزز يحتوي آلاف الشقوق المتوازية لكل سنتيمتر؛ تظهر خطوط حادة ساطعة عند زوايا تحقق d sinθ = mλ.',
  tools: ['محزز حيود (6000 خط/cm مثلاً)', 'مصدر ضوئي (ليزر أو مصباح غازي)', 'مطياف (spectrometer) لقياس الزوايا'],
  steps: ['نضع المحزز عمودياً على مسار الضوء.', 'ندير منظار المطياف ونقيس زوايا الحيود للمرتبة الأولى والثانية على جانبي الخط المركزي.', 'نحسب الطول الموجي من d sinθ = mλ حيث d = W/N.', 'جرّب الضوء الأبيض وطيف الهيدروجين ولاحظ انفصال الألوان.'],
  concl: ['تتكون هدب مضيئة حادة جداً عند: d sinθ = mλ ، m = 0, ±1, ±2, …', 'كلما زاد عدد الخطوط لكل سنتيمتر صغر d فازدادت زوايا الحيود وازداد انفصال الأطوال الموجية.', 'يستعمل المحزز في تحليل مصادر الضوء وقياس الأطوال الموجية بدقة عالية.'],
  laws: ['grating'],
  controls: [R('N', 'عدد الخطوط لكل cm', 1000, 10000, 6000, 100, ''), SEL('src', 'المصدر', [[632.8, 'ليزر هيليوم-نيون 632.8nm'], [532, 'ليزر أخضر 532nm'], [405, 'ليزر بنفسجي 405nm'], ['H', 'طيف غاز الهيدروجين'], ['W', 'ضوء أبيض']], 632.8)],
  lines(S) { const s = S.p.src; if (s === 'H') return [656.3, 486.1, 434.1, 410.2]; if (s === 'W') { const a = []; for (let l = 400; l <= 700; l += 6) a.push(l); return a; } return [+s]; },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h, false); const p = S.p; const d = .01 / p.N; const cx = w * .5, cy = h * .82, R0 = Math.min(w * .45, h * .72);
    ctx.strokeStyle = 'rgba(255,255,255,.15)'; ctx.beginPath(); ctx.arc(cx, cy, R0, Math.PI, TAU); ctx.stroke();
    for (let a = -90; a <= 90; a += 10) { const t = rad(a); ctx.beginPath(); ctx.moveTo(cx + Math.sin(t) * (R0 - 6), cy - Math.cos(t) * (R0 - 6)); ctx.lineTo(cx + Math.sin(t) * R0, cy - Math.cos(t) * R0); ctx.stroke(); if (a % 30 === 0) G.text(ctx, a + '°', cx + Math.sin(t) * (R0 + 16), cy - Math.cos(t) * (R0 + 16), { s: 10, c: '#94a3b8' }); }
    ctx.fillStyle = '#94a3b8'; ctx.fillRect(cx - 40, cy - 3, 80, 6); G.text(ctx, 'المحزز', cx, cy + 16, { s: 11 });
    const L = this.lines(S); const white = p.src === 'W';
    L.forEach(l => { for (let m = -3; m <= 3; m++) { const s = m * l * 1e-9 / d; if (Math.abs(s) >= 1) continue; const t = Math.asin(s); ctx.strokeStyle = m === 0 ? (white ? '#fff' : wlColor(l)) : wlColor(l, white ? .5 : .9); ctx.lineWidth = white ? 2 : 2.5; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.sin(t) * R0, cy - Math.cos(t) * R0); ctx.stroke(); if (!white && p.src !== 'H' && m !== 0) G.text(ctx, 'm=' + m + ' : ' + fmt(deg(t), 3) + '°', cx + Math.sin(t) * (R0 * .7), cy - Math.cos(t) * (R0 * .7) - 10, { s: 11, bg: 'rgba(15,23,42,.7)' }); } });
  },
  readings(S) { const d = .01 / S.p.N; const l = this.lines(S)[0]; const r = [rd('ثابت المحزز d = W/N', fmtSI(d, 'm'))]; for (let m = 1; m <= 3; m++) { const s = m * l * 1e-9 / d; r.push(rd('θ للمرتبة ' + m + (S.p.src === 'H' ? ' (Hα)' : ''), Math.abs(s) < 1 ? fmt(deg(Math.asin(s)), 4, '°') : 'غير موجودة')); } r.push(rd('أعلى مرتبة ممكنة', Math.floor(d / (l * 1e-9)) + '')); return r; }
});

/* ---- Activity 3: rope polarization ---- */
X({ id: 'rope_pol', ch: 5, sec: '7-5', page: 165, kind: 'نشاط', title: 'نشاط (3): استقطاب الموجات (الحبل والشق)', desc: 'حبل يمر خلال شق في حاجز؛ الموجة المستعرضة تنفذ فقط عندما يكون مستوى اهتزازها موازياً للشق.',
  tools: ['حبل مثبت من أحد طرفيه بجدار', 'حاجز ذو شق'],
  steps: ['نمرر الطرف السائب من الحبل عبر شق الحاجز، ونجعل الحبل يهتز شاقولياً نحو الأعلى وعمودياً مع الحبل.', 'نشد الحبل حتى نتمكن من توليد موجة مستعرضة منتظمة فيه، نشاهد أن الموجة المستعرضة المتولدة قد مرت من خلال الشق.', 'نجعل الشق بوضع أفقي ثم نشد الحبل ونتركه، نشاهد أن الموجة المستعرضة المتولدة في الحبل لا يمكنها المرور من خلال الشق.'],
  concl: ['يمكن التوصل إلى النتيجة نفسها مع موجات الضوء: الموجة المستعرضة تنفذ من الشق فقط عندما يكون مستوى اهتزازها موازياً للشق.', 'الاستقطاب يثبت أن الموجات الضوئية موجات مستعرضة (الموجات الطولية لا تستقطب).', 'إذا كان الشق بزاوية θ مع مستوى الاهتزاز تنفذ مركبة السعة A cosθ فقط.'],
  laws: ['malus'],
  controls: [R('slot', 'زاوية الشق عن الشاقول', 0, 90, 0, 1, '°'), R('vib', 'زاوية مستوى اهتزاز الحبل', 0, 90, 0, 1, '°')],
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h); const p = S.p; const cy = h * .5; const bx = w * .5; const k = TAU / 150, ph = S.t * 6; const A = h * .18;
    const va = rad(p.vib), sa = rad(p.slot); const trans = Math.cos(va - sa); const iso = (x, y, z) => [x + z * .45, cy - y + z * .25];
    // wall
    ctx.fillStyle = '#475569'; ctx.fillRect(w - 40, cy - 120, 20, 240);
    const draw = (x0, x1, amp, ang, col) => { ctx.strokeStyle = col; ctx.lineWidth = 3.5; ctx.beginPath(); for (let x = x0; x <= x1; x += 3) { const s = amp * Math.sin(k * x - ph); const [X, Y] = iso(x, s * Math.cos(ang), s * Math.sin(ang)); x === x0 ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y); } ctx.stroke(); };
    draw(40, bx, A, va, '#f59e0b');
    draw(bx, w - 40, A * trans, sa, '#fbbf24');
    // barrier with slot
    ctx.save(); ctx.translate(bx, cy); ctx.fillStyle = 'rgba(148,163,184,.85)'; ctx.fillRect(-10, -150, 20, 300); ctx.fillStyle = '#0b1220'; ctx.rotate(sa); ctx.fillRect(-4, -110, 8, 220); ctx.restore();
    G.text(ctx, 'الحاجز ذو الشق', bx, cy + 170, { s: 12 }); G.text(ctx, trans > .98 ? 'تنفذ الموجة كاملة' : trans < .05 ? 'لا تنفذ الموجة' : 'تنفذ مركبة منها', bx + (w - bx) / 2, 40, { s: 14, w: 800, c: trans > .05 ? '#86efac' : '#fca5a5' });
  },
  readings(S) { const t = Math.abs(Math.cos(rad(S.p.vib - S.p.slot))); return [rd('الزاوية بين الشق ومستوى الاهتزاز', Math.abs(S.p.vib - S.p.slot) + '°'), rd('السعة النافذة A cosθ', Math.round(t * 100) + ' %'), rd('الطاقة النافذة ∝ cos²θ', Math.round(t * t * 100) + ' %')]; }
});

/* ---- Activity 4 & 5: tourmaline / Malus ---- */
const polarDraw = (ctx, w, h, S, analyzer) => {
  G.bg(ctx, w, h, false); const p = S.p; const cy = h * .45; const xs = [w * .1, w * .36, w * .62, w * .88];
  // lamp
  G.glow(ctx, xs[0], cy, 50, 'rgba(255,230,150,A)', .9); setRaw(ctx, 1); ctx.fillStyle = '#fff4c2'; setRaw(ctx, 0); ctx.beginPath(); ctx.arc(xs[0], cy, 18, 0, TAU); ctx.fill();
  const star = (x, n, a0, len, col) => { for (let i = 0; i < n; i++) { const a = a0 + i * Math.PI / n; G.arrow(ctx, x, cy, x + Math.sin(a) * len, cy - Math.cos(a) * len, col, 1.8, 5); G.arrow(ctx, x, cy, x - Math.sin(a) * len, cy + Math.cos(a) * len, col, 1.8, 5); } };
  const I0 = 1, I1 = .5, th = rad(p.b - p.a), I2 = analyzer ? I1 * Math.cos(th) ** 2 : I1;
  ctx.fillStyle = 'rgba(255,240,180,.18)'; ctx.fillRect(xs[0], cy - 40, xs[1] - xs[0], 80); ctx.fillStyle = `rgba(255,240,180,${.18 * I1 / .5 * .7})`; ctx.fillRect(xs[1], cy - 40, xs[2] - xs[1], 80); ctx.fillStyle = `rgba(255,240,180,${.25 * I2 / .5})`; ctx.fillRect(xs[2], cy - 40, xs[3] - xs[2], 80);
  star((xs[0] + xs[1]) / 2, 4, S.t, 30, 'rgba(255,255,255,.7)');
  const plate = (x, ang, name) => { ctx.save(); ctx.translate(x, cy); ctx.fillStyle = 'rgba(120,80,40,.55)'; ctx.strokeStyle = '#d6a36a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(0, 0, 22, 70, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.rotate(rad(ang)); ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 1; for (let k = -18; k <= 18; k += 6) { ctx.beginPath(); ctx.moveTo(k * .6, -60); ctx.lineTo(k * .6, 60); ctx.stroke(); } ctx.restore(); G.text(ctx, name, x, cy + 96, { s: 12, c: '#e2e8f0' }); G.text(ctx, ang + '°', x, cy - 90, { s: 12, mono: 1, c: '#fde68a' }); };
  plate(xs[1], p.a, 'المستقطب (polarizer)');
  const amp1 = 36; G.arrow(ctx, (xs[1] + xs[2]) / 2, cy, (xs[1] + xs[2]) / 2 + Math.sin(rad(p.a)) * amp1, cy - Math.cos(rad(p.a)) * amp1, '#fbbf24', 2.4, 7); G.arrow(ctx, (xs[1] + xs[2]) / 2, cy, (xs[1] + xs[2]) / 2 - Math.sin(rad(p.a)) * amp1, cy + Math.cos(rad(p.a)) * amp1, '#fbbf24', 2.4, 7);
  if (analyzer) { plate(xs[2], p.b, 'المحلل (analyzer)'); const a2 = amp1 * Math.abs(Math.cos(th)); const xm = (xs[2] + xs[3]) / 2; if (a2 > 1) { G.arrow(ctx, xm, cy, xm + Math.sin(rad(p.b)) * a2, cy - Math.cos(rad(p.b)) * a2, '#fbbf24', 2.4, 7); G.arrow(ctx, xm, cy, xm - Math.sin(rad(p.b)) * a2, cy + Math.cos(rad(p.b)) * a2, '#fbbf24', 2.4, 7); } }
  // eye / photocell
  const ex = xs[3]; G.glow(ctx, ex, cy, 40, 'rgba(255,230,150,A)', I2 * 1.6); ctx.fillStyle = '#334155'; rr(ctx, ex - 16, cy - 26, 32, 52, 6); ctx.fill(); G.text(ctx, analyzer ? 'خلية ضوئية' : 'العين', ex, cy + 44, { s: 11 });
  G.text(ctx, 'I = ' + Math.round(I2 / I1 * 100) + '% من I₀', ex, cy - 50, { s: 13, w: 900, c: '#fde68a' });
  S.I2 = I2; S.I1 = I1;
};
X({ id: 'tourmaline', ch: 5, sec: '7-5', page: 166, kind: 'نشاط', title: 'نشاط (4): استقطاب موجات الضوء (شريحتا التورمالين)', desc: 'ضوء غير مستقطب يمر خلال شريحة تورمالين (مستقطب) ثم خلال شريحة ثانية (محلل)؛ ندير الشريحة الثانية ونلاحظ تغيّر شدة الضوء النافذ.',
  tools: ['شريحتان من التورمالين', 'مصدر ضوئي'],
  steps: ['خذ شريحة من التورمالين وضعها في طريق مصدر الضوء.', 'قم بتدوير الشريحة حول المحور المار من وسطها والعمودي عليها، ولاحظ هل يتغير مقدار الضوء النافذ؟ (لا يتغير).', 'ضع شريحتين من التورمالين كما موضح في الشكل.', 'ثبت إحدى الشريحتين، دوّر الشريحة الأخرى ببطء ولاحظ شدة الحزمة الضوئية النافذة.'],
  concl: ['الضوء غير المستقطب هو موجات مستعرضة يهتز مجالها الكهربائي في الاتجاهات جميعها، وبلورة التورمالين تترتب فيها الجزيئات بحيث لا تسمح بمرور الموجات الضوئية إلا إذا كان مستوى اهتزاز مجالها الكهربائي موازياً لمحورها.', 'تسمى الشريحة التي تقوم بهذه العملية المستقطب (polarizer)، والشريحة الثانية المحلل (analyzer).', 'تتغير شدة الضوء النافذ من المحلل بتدويره، وتنعدم عندما يكون محوره عمودياً على محور المستقطب.'],
  laws: ['malus'],
  controls: [R('a', 'زاوية محور المستقطب', 0, 180, 0, 1, '°'), R('b', 'زاوية محور المحلل', 0, 180, 30, 1, '°'), TG('an', 'وضع الشريحة الثانية (المحلل)', true)],
  draw(ctx, w, h, S) { polarDraw(ctx, w, h, S, S.p.an); },
  readings(S) { const th = Math.abs(S.p.b - S.p.a); return [rd('الزاوية بين المحورين θ', th + '°'), rd('شدة الضوء بعد المستقطب', '50 % من الضوء الأصلي'), rd('نسبة النفاذ من المحلل cos²θ', S.p.an ? Math.round(Math.cos(rad(th)) ** 2 * 100) + ' %' : '—', 1)]; }
});
X({ id: 'malus', ch: 5, sec: '7-5', page: 167, kind: 'نشاط', title: 'نشاط (5): المادة المستقطبة وشدة الضوء النافذ من خلالها (قانون مالوس)', desc: 'نضع المصدر الضوئي أمام المستقطب ثم المحلل خلفه وخلية ضوئية؛ نقيس الشدة النافذة لزوايا مختلفة.',
  tools: ['مصدر ضوئي أحادي اللون', 'شريحتان من مادة التورمالين', 'خلية ضوئية'],
  steps: ['نضع المصدر الضوئي أمام اللوح المستقطب ثم نضع اللوح الثاني المحلل خلفه ونلاحظ تناقص شدة الضوء النافذ خلال اللوحين.', 'نقوم بتدوير اللوح المحلل حتى تنعدم شدة الضوء تماماً.', 'سجّل شدة الضوء النافذ (قراءة الخلية الضوئية) لزوايا مختلفة وارسم I مقابل θ.'],
  concl: ['إن الضوء النافذ من خلال اللوح المستقطب قد استقطب استوائياً وقلت شدته، وعند نفوذه من اللوح المحلل تقل شدته أكثر.', 'عند تدوير اللوح المحلل عند وضع معين نجد أن شدة الضوء تختفي تماماً عند النظر من خلاله، وهذا يدل على أن الضوء المستقطب قد حجب بواسطة المحلل بالكامل.', 'قانون مالوس: I = I₀ cos²θ.'],
  laws: ['malus'],
  controls: [R('a', 'زاوية المستقطب', 0, 180, 0, 1, '°'), R('b', 'زاوية المحلل', 0, 180, 0, 1, '°')],
  draw(ctx, w, h, S) { polarDraw(ctx, w, h, S, true); },
  readings(S) { const th = Math.abs(S.p.b - S.p.a); return [rd('θ', th + '°'), rd('cos²θ', fmt(Math.cos(rad(th)) ** 2, 3)), rd('I (قراءة الخلية الضوئية)', Math.round(Math.cos(rad(th)) ** 2 * 1000) / 10 + ' % من I₀', 1)]; },
  record(S) { const th = Math.abs(S.p.b - S.p.a); return { th, I: +(Math.cos(rad(th)) ** 2 * 100).toFixed(1) }; }, cols: [['th', 'θ (°)'], ['I', 'I/I₀ (%)']],
  graph: { x: 'th', y: 'I', xl: 'θ (°)', yl: 'I/I₀ (%)', theory: x => 100 * Math.cos(rad(x)) ** 2, xmin: 0, xmax: 180 }
});

/* ---- Brewster ---- */
X({ id: 'brewster', ch: 5, sec: '7-5', page: 168, kind: 'تجربة', title: 'الاستقطاب بالانعكاس وزاوية بروستر', desc: 'ضوء غير مستقطب يسقط على سطح عازل (ماء أو زجاج)؛ عند زاوية سقوط معينة يكون الضوء المنعكس مستقطباً كلياً.',
  tools: ['مصدر ضوء غير مستقطب', 'سطح عاكس عازل (زجاج أو ماء)', 'مرشح مستقطب (محلل) لفحص الضوء المنعكس', 'منقلة'],
  steps: ['غيّر زاوية السقوط وافحص الضوء المنعكس بالمحلل.', 'لاحظ أن الاستقطاب يزداد حتى يصبح كلياً عند زاوية بروستر θp.', 'تحقق من أن الشعاعين المنعكس والمنكسر متعامدان عند θp.'],
  concl: ['درجة الاستقطاب تعتمد على زاوية السقوط؛ عند السقوط العمودي لا يحدث استقطاب.', 'عند زاوية بروستر θp يكون الضوء المنعكس مستقطباً كلياً ويكون متعامداً مع المنكسر (θp + θr = 90°).', 'tanθp = n.'],
  laws: ['brew'],
  controls: [R('i', 'زاوية السقوط', 0, 89, 40, .5, '°'), SEL('n', 'الوسط العاكس', [[1.33, 'ماء (1.33)'], [1.5, 'زجاج (1.5)'], [2.42, 'ماس (2.42)']], 1.33)],
  fres(S) { const n = +S.p.n, i = rad(S.p.i); const t = Math.asin(Math.sin(i) / n); const rs = (Math.cos(i) - n * Math.cos(t)) / (Math.cos(i) + n * Math.cos(t)), rp = (n * Math.cos(i) - Math.cos(t)) / (n * Math.cos(i) + Math.cos(t)); return { t, Rs: rs * rs, Rp: rp * rp }; },
  draw(ctx, w, h, S) {
    G.bg(ctx, w, h, false); const cx = w * .5, cy = h * .55; const f = this.fres(S); const i = rad(S.p.i);
    ctx.fillStyle = 'rgba(56,189,248,.18)'; ctx.fillRect(0, cy, w, h - cy); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke(); ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(cx, cy - 200); ctx.lineTo(cx, cy + 160); ctx.stroke(); ctx.setLineDash([]);
    const L = Math.min(w, h) * .42; const sx = cx - Math.sin(i) * L, sy = cy - Math.cos(i) * L;
    G.arrow(ctx, sx, sy, cx, cy, '#fef3c7', 3, 10);
    const R = f.Rs + f.Rp; G.arrow(ctx, cx, cy, cx + Math.sin(i) * L, cy - Math.cos(i) * L, `rgba(253,224,71,${.3 + 1.5 * R})`, 3, 10);
    G.arrow(ctx, cx, cy, cx + Math.sin(f.t) * L * .8, cy + Math.cos(f.t) * L * .8, 'rgba(254,243,199,.8)', 3, 10);
    // polarization symbols
    const mark = (x, y, dots, bars) => { for (let k = 0; k < 3; k++) { const xx = x + (k - 1) * 18; if (dots) { ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.arc(xx, y, 3.5, 0, TAU); ctx.fill(); } if (bars) { ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(xx - 6, y - 6); ctx.lineTo(xx + 6, y + 6); ctx.stroke(); } } };
    mark((sx + cx) / 2 - 20, (sy + cy) / 2, true, true); mark(cx + Math.sin(i) * L * .55 + 20, cy - Math.cos(i) * L * .55, true, f.Rp / Math.max(f.Rs, 1e-9) > .02);
    G.text(ctx, 'θ = ' + S.p.i + '°', cx - 50, cy - 60, { s: 12 }); G.text(ctx, 'θp = ' + fmt(deg(Math.atan(+S.p.n)), 3) + '°', 80, 30, { s: 13, c: '#fde68a' });
    if (Math.abs(S.p.i - deg(Math.atan(+S.p.n))) < 1) G.text(ctx, 'استقطاب كلي للضوء المنعكس ✓', w / 2, 30, { s: 14, w: 900, c: '#86efac' });
  },
  readings(S) { const f = this.fres(S); const P = (f.Rs - f.Rp) / (f.Rs + f.Rp); return [rd('زاوية بروستر θp = tan⁻¹n', fmt(deg(Math.atan(+S.p.n)), 4, '°')), rd('زاوية الانكسار', fmt(deg(f.t), 4, '°')), rd('θ + θr', fmt(S.p.i + deg(f.t), 4, '°')), rd('درجة استقطاب المنعكس', Math.round(P * 100) + ' %'), rd('الانعكاسية Rs', fmt(f.Rs * 100, 3, '%')), rd('الانعكاسية Rp', fmt(f.Rp * 100, 3, '%'))]; }
});

/* ---- Scattering ---- */
X({ id: 'scatter', ch: 5, sec: '8-5', page: 169, kind: 'تجربة', title: 'استطارة الضوء: زرقة السماء واحمرار الشفق', desc: 'تستطير جزيئات الهواء الأطوال الموجية القصيرة (الأزرق) أكثر من الطويلة (الأحمر) بنسبة 1/λ⁴.',
  tools: ['حوض ماء فيه قليل من الحليب (جسيمات صغيرة)', 'مصدر ضوء أبيض قوي', 'شاشة'],
  steps: ['مرر حزمة الضوء الأبيض خلال الحوض وانظر إليه من الجانب: يبدو مزرقاً.', 'انظر إلى الضوء النافذ من نهاية الحوض على الشاشة: يبدو مصفراً أو محمراً.', 'غيّر ارتفاع الشمس (طول المسار في الغلاف الجوي) ولاحظ لون السماء والشمس.'],
  concl: ['شدة الضوء المستطار تتناسب عكسياً مع الأس الرابع للطول الموجي: I ∝ 1/λ⁴ (عندما يكون حجم الجسيمات أصغر كثيراً من λ).', 'الضوء الأزرق يستطير أكثر من الأحمر بنحو 10 مرات؛ لذا تبدو السماء زرقاء نهاراً.', 'عند الشروق والغروب يقطع الضوء مسافة أطول في الجو فيستطير الأزرق ويصل الأحمر والبرتقالي إلى العين.'],
  laws: ['rayl'],
  controls: [R('sun', 'ارتفاع الشمس فوق الأفق', 2, 90, 60, 1, '°'), R('dens', 'كثافة الجسيمات', .2, 3, 1, .05, '×')],
  draw(ctx, w, h, S) {
    const el = rad(S.p.sun); const path = S.p.dens * 1 / Math.max(Math.sin(el), .05); const tr = nm => Math.exp(-path * .25 * Math.pow(450 / nm, 4));
    const sky = [0, 0, 0], sunc = [0, 0, 0]; for (let nm = 400; nm <= 700; nm += 10) { const c = wlRGB(nm); const s = (1 - tr(nm)) * Math.pow(450 / nm, 4) * tr(nm) + .02; const t = tr(nm); for (let k = 0; k < 3; k++) { sky[k] += c[k] * s; sunc[k] += c[k] * t; } }
    const ms = Math.max(...sky), mu = Math.max(...sunc); const skyc = sky.map(v => Math.round(v / ms * 235 * clamp(Math.sin(el) * 3, .25, 1))), sc = sunc.map(v => Math.round(v / mu * 255));
    const g = ctx.createLinearGradient(0, 0, 0, h * .75); g.addColorStop(0, `rgb(${skyc.map(v => v * .7 | 0)})`); g.addColorStop(1, `rgb(${skyc})`); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    const sx = w * .5 + Math.cos(el) * w * .38, sy = h * .75 - Math.sin(el) * h * .62; G.glow(ctx, sx, sy, 90, `rgba(${sc},A)`, .6); ctx.fillStyle = `rgb(${sc})`; ctx.beginPath(); ctx.arc(sx, sy, 26, 0, TAU); ctx.fill();
    ctx.fillStyle = '#1f2937'; ctx.fillRect(0, h * .75, w, h * .25); ctx.fillStyle = '#374151'; ctx.beginPath(); ctx.arc(w * .2, h * .9, 120, Math.PI, TAU); ctx.fill();
    // bar chart scatter vs lambda
    const bx = 20, by = h - 18; [[400, 'بنفسجي'], [450, 'أزرق'], [520, 'أخضر'], [580, 'أصفر'], [620, 'برتقالي'], [700, 'أحمر']].forEach(([nm, n], i) => { const v = Math.pow(400 / nm, 4); ctx.fillStyle = wlColor(nm); ctx.fillRect(bx + i * 34, by - v * 80, 24, v * 80); });
    G.text(ctx, 'نسبة الاستطارة ∝ 1/λ⁴', bx + 100, by - 94, { s: 11, c: '#e5e7eb' });
  },
  readings(S) { return [rd('نسبة استطارة الأزرق (450nm) إلى الأحمر (700nm)', fmt((700 / 450) ** 4, 3) + ' مرة', 1), rd('طول المسار النسبي في الجو', fmt(1 / Math.max(Math.sin(rad(S.p.sun)), .05), 3) + '×')]; }
});
