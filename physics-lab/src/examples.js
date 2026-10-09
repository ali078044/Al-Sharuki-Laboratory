'use strict';
/* ======================= أمثلة الكتاب المحلولة (حيّة) ======================= */
const EXAMPLES = [
  { ch: 1, n: 'مثال (3)', t: 'أربع متسعات على التوازي', q: 'أربع متسعات سعاتها (4µF ، 8µF ، 12µF ، 6µF) مربوطة مع بعضها على التوازي، ربطت المجموعة بين قطبي بطارية فرق الجهد بين قطبيها (12V). احسب: 1- السعة المكافئة. 2- الشحنة في أي من صفيحتي كل متسعة. 3- الشحنة الكلية.',
    sol: ['C<sub>eq</sub> = C₁ + C₂ + C₃ + C₄ = 4 + 8 + 12 + 6 = <b>30µF</b>', 'التوازي ⇐ ΔV متساوٍ = 12V', 'Q₁ = 4×12 = 48µC ، Q₂ = 8×12 = 96µC ، Q₃ = 12×12 = 144µC ، Q₄ = 6×12 = 72µC', 'Q<sub>total</sub> = C<sub>eq</sub> ΔV = 30×12 = <b>360µC</b> (= مجموع الشحنات)'],
    lab: C => { C.add('battery', 2, 4, 2, 13, { val: 12 }); C.add('resistor', 2, 4, 6, 4, { val: 10, label: 'أسلاك' }); C.add('wire', 6, 4, 8, 4); C.add('wire', 2, 13, 8, 13); [4, 8, 12, 6].forEach((c, i) => { const x = 8 + i * 5; C.add('capacitor', x, 4, x, 13, { val: c, label: 'C' + (i + 1), vmax: 12 }); if (i < 3) { C.add('wire', x, 4, x + 5, 4); C.add('wire', x, 13, x + 5, 13); } }); } },
  { ch: 1, n: 'مثال (8)', t: 'متسعة ومصباح في دائرة تيار مستمر', q: 'بطارية 6V، مصباح 10Ω، مقاومة 20Ω، متسعة 5µF. احسب الشحنة والطاقة المختزنة في المتسعة عندما تكون (a) على التوازي مع المصباح (b) على التوالي.',
    sol: ['(a) I = ΔV/(R + r) = 6/(20+10) = 0.2A ، ΔV<sub>مصباح</sub> = 0.2×10 = 2V', 'Q = CΔV = 5×2 = <b>10µC</b> ، PE = ½CΔV² = <b>10µJ</b>', '(b) بعد اكتمال الشحن ينقطع التيار فيكون ΔV<sub>C</sub> = 6V', 'Q = 5×6 = <b>30µC</b> ، PE = ½×5×10⁻⁶×36 = <b>90µJ</b>'], exp: 'cap_dc' },
  { ch: 2, n: 'مثال (1)', t: 'القوة الدافعة الكهربائية الحركية', q: 'ساق موصلة طولها 1.6m تنزلق على سكة موصلة بانطلاق 5m/s باتجاه عمودي على مجال مغناطيسي كثافة فيضه 0.8T، ومقاومة المصباح 128Ω. احسب: القوة الدافعة الحركية، التيار، القدرة المتبددة.',
    sol: ['ε = vBℓ = 5×0.8×1.6 = <b>6.4V</b>', 'I = ε/R = 6.4/128 = <b>0.05A</b>', 'P = I²R = (0.05)²×128 = <b>0.32W</b>'], exp: 'motional', p: { v: 5, B: .8, L: 1.6, R: 128 } },
  { ch: 2, n: 'مثال (2)', t: 'الفيض المغناطيسي خلال حلقة', q: 'حلقة دائرية نصف قطرها 0.2m في مجال منتظم 0.5T. احسب الفيض عندما يكون متجه المساحة موازياً للمجال، ثم عندما يصنع زاوية 45°.',
    sol: ['A = πr² = 3.14×(0.2)² = 12.56×10⁻²m²', 'Φ = BA = 0.5×12.56×10⁻² = <b>6.28×10⁻²Wb</b>', 'Φ = BA cos45° = 6.28×10⁻²×0.707 = <b>4.44×10⁻²Wb</b>'] },
  { ch: 2, n: 'مثال (3)', t: 'قانون فراداي', q: 'ملف 50 لفة مساحة وجهه 20cm² تغيرت كثافة الفيض الذي يخترقه من 0.8T إلى صفر خلال 0.4s. احسب ε المحتثة، والتيار إذا كانت المقاومة الكلية 80Ω.',
    sol: ['ε = −N A ΔB/Δt = −50×20×10⁻⁴×(0 − 0.8)/0.4 = <b>0.2V</b>', 'I = ε/R = 0.2/80 = <b>2.5×10⁻³A</b>'], exp: 'faraday_magnet' },
  { ch: 2, n: 'مثال (5)', t: 'الحث الذاتي والطاقة المختزنة', q: 'ملف معامل حثه الذاتي 2.5mH وعدد لفاته 500 ينساب فيه تيار 4A. احسب الفيض الذي يخترق اللفة الواحدة، والطاقة المختزنة، و ε إذا انعكس التيار خلال 0.25s.',
    sol: ['NΦ = LI ⇐ Φ = 2.5×10⁻³×4/500 = <b>2×10⁻⁵Wb</b>', 'PE = ½LI² = ½×2.5×10⁻³×16 = <b>0.02J</b>', 'ΔI = −4 − 4 = −8A ⇐ ε = −L ΔI/Δt = −2.5×10⁻³×(−8)/0.25 = <b>0.08V</b>'] },
  { ch: 2, n: 'مثال (6)', t: 'الحث المتبادل', q: 'ملفان متجاوران ملفوفان على حلقة حديد. الابتدائي معامل حثه 0.5H ومقاومته 20Ω يربط ببطارية 100V ومفتاح. تولدت في الثانوي ε = 40V لحظة الغلق. احسب ΔI/Δt لحظة الغلق، M، التيار الثابت، L₂.',
    sol: ['لحظة الغلق I = 0 ⇐ V = L ΔI/Δt ⇐ ΔI/Δt = 100/0.5 = <b>200A/s</b>', 'ε₂ = M ΔI/Δt ⇐ M = 40/200 = <b>0.2H</b>', 'I = V/R = 100/20 = <b>5A</b>', 'M = √(L₁L₂) ⇐ 0.04 = 0.5 L₂ ⇐ L₂ = <b>0.08H</b>'],
    lab: C => { C.add('battery', 2, 4, 2, 11, { val: 100 }); C.add('switch', 2, 4, 6, 4); C.add('ammeter', 6, 4, 10, 4); C.add('inductor', 10, 4, 15, 4, { val: .5, label: 'L₁', core: true }); C.add('resistor', 15, 4, 15, 11, { val: 20 }); C.add('wire', 15, 11, 2, 11); } },
  { ch: 3, n: 'مثال (1)', t: 'المقدار المؤثر والقدرة المتوسطة', q: 'مصدر فولطية متناوبة ربط بين طرفيه مقاومة صرف 100Ω، الفولطية تعطى بـ V = 424.2 sin(ωt). احسب المقدار المؤثر للفولطية والتيار، والقدرة المتوسطة.',
    sol: ['V<sub>m</sub> = 424.2V ⇐ V<sub>eff</sub> = 0.707×424.2 = <b>300V</b>', 'I<sub>eff</sub> = 300/100 = <b>3A</b>', 'P<sub>av</sub> = I<sub>eff</sub>²R = 9×100 = <b>900W</b>'], exp: 'ac_r', p: { Vm: 424.2, R: 100, f: 50 } },
  { ch: 3, n: 'مثال (2)', t: 'رادة الحث عند ترددين', q: 'ملف مهمل المقاومة معامل حثه (50/π)mH ربط بمصدر متناوب فرق جهده 20V. احسب رادة الحث والتيار عندما f = 10Hz ثم f = 1MHz.',
    sol: ['f = 10Hz: X<sub>L</sub> = 2π×10×(50/π)×10⁻³ = <b>1Ω</b> ، I = 20/1 = <b>20A</b>', 'f = 1MHz: X<sub>L</sub> = 2π×10⁶×(50/π)×10⁻³ = <b>10⁵Ω</b> ، I = 20/10⁵ = <b>2×10⁻⁴A</b>', 'المحث يسمح بمرور الترددات الواطئة ويعيق العالية.'],
    lab: C => { C.add('ac', 2, 11, 2, 4, { val: 28.28, f: 10 }); C.add('ammeter', 2, 4, 8, 4); C.add('inductor', 8, 4, 8, 11, { val: .015915, label: 'L', rs: .01 }); C.add('wire', 8, 11, 2, 11); C.add('voltmeter', 12, 4, 12, 11); C.add('wire', 8, 4, 12, 4); C.add('wire', 8, 11, 12, 11); } },
  { ch: 3, n: 'مثال (3)', t: 'رادة السعة عند ترددين', q: 'متسعة سعتها (4/π)µF ربطت بمصدر فرق جهده 2.5V. احسب رادة السعة والتيار عندما f = 5Hz ثم f = 5×10⁵Hz.',
    sol: ['f = 5Hz: X<sub>C</sub> = 1/(2π×5×(4/π)×10⁻⁶) = <b>25×10³Ω</b> ، I = <b>1×10⁻⁴A</b>', 'f = 5×10⁵Hz: X<sub>C</sub> = <b>0.25Ω</b> ، I = 2.5/0.25 = <b>10A</b>', 'المتسعة تعيق الترددات الواطئة وتسمح بمرور العالية.'],
    lab: C => { C.add('ac', 2, 11, 2, 4, { val: 3.535, f: 5 }); C.add('ammeter', 2, 4, 8, 4); C.add('capacitor', 8, 4, 8, 11, { val: 1.2732, vmax: 3 }); C.add('wire', 8, 11, 2, 11); C.add('voltmeter', 12, 4, 12, 11); C.add('wire', 8, 4, 12, 4); C.add('wire', 8, 11, 12, 11); } },
  { ch: 3, n: 'مثال (5)', t: 'دائرة RLC متوالية', q: 'مقاومة 40Ω ومحث رادته 120Ω ومتسعة رادتها 90Ω على التوالي مع مصدر 200V. احسب Z، I، زاوية الطور، عامل القدرة، القدرة الحقيقية والظاهرية.',
    sol: ['Z² = R² + (X<sub>L</sub> − X<sub>C</sub>)² = 1600 + 900 ⇐ Z = <b>50Ω</b>', 'I = V/Z = 200/50 = <b>4A</b>', 'tanΦ = (120 − 90)/40 = 0.75 ⇐ Φ = <b>37°</b> (خواص حثية)', 'pf = cosΦ = R/Z = <b>0.8</b>', 'P<sub>real</sub> = I²R = 16×40 = <b>640W</b> ، P<sub>app</sub> = IV = <b>800VA</b>'], exp: 'rlc_series', p: { f: 50, R: 40, L: .382, Cv: 35.4, Vm: 282.84 } },
  { ch: 3, n: 'مثال (6)', t: 'الرنين في دائرة RLC', q: 'R = 500Ω ، L = 2H ، C = 0.5µF ، فرق الجهد 100V. احسب ωr، رادتا الحث والسعة، التيار، فولطية كل عنصر، وعامل القدرة.',
    sol: ['ωr = 1/√(LC) = 1/√(2×0.5×10⁻⁶) = <b>1000rad/s</b>', 'X<sub>L</sub> = X<sub>C</sub> = <b>2000Ω</b> ، Z = R = 500Ω', 'I = 100/500 = <b>0.2A</b>', 'V<sub>R</sub> = <b>100V</b> ، V<sub>L</sub> = V<sub>C</sub> = <b>400V</b>', 'pf = cos0° = <b>1</b>'], exp: 'resonance', p: { f: 159.15, R: 500, L: 2, Cv: .5 } },
  { ch: 3, n: 'مثال (7)', t: 'دائرة RLC متوازية', q: 'R = 80Ω ، X<sub>L</sub> = 20Ω ، X<sub>C</sub> = 30Ω على التوازي مع مصدر 240V. احسب تيار كل فرع والتيار الكلي والممانعة وزاوية الطور.',
    sol: ['I<sub>R</sub> = 240/80 = <b>3A</b> ، I<sub>C</sub> = 240/30 = <b>8A</b> ، I<sub>L</sub> = 240/20 = <b>12A</b>', 'I<sub>T</sub> = √(3² + (8−12)²) = <b>5A</b>', 'Z = 240/5 = <b>48Ω</b>', 'tanΦ = (8 − 12)/3 ⇐ Φ = <b>−53°</b> (خواص حثية)'], exp: 'rlc_parallel', p: { f: 50, R: 80 } },
  { ch: 4, n: 'مثال (1)', t: 'دائرة التنغيم في جهاز الراديو', q: 'L = 6.4µH ، C = 1.9pF. احسب تردد الموجات التي يستقبلها الجهاز وطولها الموجي.',
    sol: ['f = 1/(2π√(LC)) = 1/(2×3.14×√(12.16×10⁻¹⁸)) = <b>45.665MHz</b>', 'λ = c/f = 3×10⁸/45.665×10⁶ = <b>6.57m</b>'], exp: 'em_wave', p: { L: 6.4, Cp: 1.9 } },
  { ch: 4, n: 'مثال (2)', t: 'طول الهوائي', q: 'احسب طول الهوائي نصف الموجي لإرسال إشارات ترددها 20kHz ثم 200MHz.',
    sol: ['20kHz: λ = 3×10⁸/2×10⁴ = 15km ⇐ ℓ = λ/2 = <b>7.5km</b> (غير عملي)', '200MHz: λ = 1.5m ⇐ ℓ = <b>75cm</b> ، والمؤرّض λ/4 = <b>37.5cm</b>'], exp: 'em_wave' },
  { ch: 5, n: 'مثال (2)', t: 'حساب الطول الموجي من تجربة يونك', q: 'البعد بين الشقين 0.2mm والشاشة على بعد 1m، والبعد بين الهدب المركزي والهدب المضيء الثالث 9.49mm. احسب الطول الموجي.',
    sol: ['y<sub>m</sub> = λLm/d ⇐ λ = y<sub>m</sub>d/(mL)', 'λ = 9.49×10⁻³ × 0.2×10⁻³ / (3×1) = <b>633nm</b>'], exp: 'young', p: { lam: 633, d: .2, L: 1 } },
  { ch: 5, n: 'مثال (3)', t: 'موقع الهدب المضيء الثالث', q: 'ضوء أحمر λ = 664nm في تجربة يونك، d = 1.2×10⁻⁴m ، L = 2.75m. جد بعد الهدب المضيء الثالث عن المركزي.',
    sol: ['d sinθ = mλ ⇐ sinθ = 3×664×10⁻⁹/1.2×10⁻⁴ = 0.0166 ⇐ θ = 0.951°', 'y = L tanθ = 2.75×0.0166 = <b>4.56cm</b>'], exp: 'young', p: { lam: 664, d: .12, L: 2.75 } },
  { ch: 5, n: 'مثال (4)', t: 'محزز الحيود', q: 'ضوء ليزر هيليوم-نيون (632.8nm) يسقط على محزز فيه 6000 خط/cm. جد زاويتي الحيود للمرتبتين الأولى والثانية.',
    sol: ['d = 1cm/6000 = 1.667×10⁻⁴cm', 'sinθ₁ = 632.8×10⁻⁷/1.667×10⁻⁴ = 0.3796 ⇐ θ₁ = <b>21.3°</b>', 'sinθ₂ = 0.7592 ⇐ θ₂ = <b>49°</b>'], exp: 'grating', p: { N: 6000, src: 632.8 } },
  { ch: 6, n: 'مثال (1)', t: 'إشعاع جسم الإنسان', q: 'جد الطول الموجي المقابل لذروة الإشعاع المنبعث من جسم الإنسان عند 35°C.',
    sol: ['T = 35 + 273 = 308K', 'λ<sub>m</sub> = 2.898×10⁻³/308 = <b>9.409µm</b> (تحت الأحمر)'], exp: 'blackbody' },
  { ch: 6, n: 'مثال (2)', t: 'الظاهرة الكهروضوئية للصوديوم', q: 'ضوء طوله الموجي 300nm يسقط على الصوديوم (دالة الشغل 2.46eV). جد الطاقة الحركية العظمى وطول موجة العتبة.',
    sol: ['(KE)<sub>max</sub> = hc/λ − W = 6.63×10⁻¹⁹ − 3.936×10⁻¹⁹ = 2.694×10⁻¹⁹J = <b>1.684eV</b>', 'λ₀ = hc/W = <b>505nm</b>'], exp: 'photoelectric', p: { lam: 300, metal: 'Na', I: 60, V: 0 } },
  { ch: 6, n: 'مثال (5)', t: 'مبدأ اللادقة', q: 'اللادقة في زخم إلكترون 3.5×10⁻²⁴ kg·m/s. جد اللادقة في موضعه.',
    sol: ['Δx ≥ h/(4πΔp) = 6.63×10⁻³⁴/(4×3.14×3.5×10⁻²⁴)', 'Δx ≥ <b>1.508×10⁻¹¹m</b>'] }
];
const Examples = {
  f: 0,
  render(openId) {
    const v = $('#view-examples');
    v.innerHTML = `<div class="wrap"><div class="sec-title" style="margin-top:0"><h3>أمثلة الكتاب المحلولة — حيّة</h3><p>${EXAMPLES.length} مثالاً: اقرأ المثال، اكشف الحل خطوة بخطوة، ثم تحقق منه بالمحاكاة</p></div>
      <div class="chips" style="margin-bottom:14px">${[0, ...new Set(EXAMPLES.map(e => e.ch))].map(c => `<button class="chip ${this.f === c ? 'on' : ''}" data-f="${c}">${c ? 'ف' + c : 'الكل'}</button>`).join('')}</div>
      <div class="ex-list">${EXAMPLES.map((e, i) => (this.f && e.ch !== this.f) ? '' : `<div class="ex-card" style="--c:${chById(e.ch).c}">
        <div class="ex-top"><span class="exp-idx">${e.ch}</span><b>${e.n}</b><span>${e.t}</span></div><p>${e.q}</p>
        <ol class="ex-sol" data-i="${i}">${e.sol.map((s, k) => `<li class="${k ? 'hid' : 'hid'}">${s}</li>`).join('')}</ol>
        <div class="btnrow"><button class="btn sm primary" data-step="${i}">اكشف الخطوة التالية</button><button class="btn sm" data-all="${i}">الحل كاملاً</button>${e.exp ? `<button class="btn sm good" data-exp="${i}">${ico('play')} تحقق بالمحاكاة</button>` : ''}${e.lab ? `<button class="btn sm good" data-lab="${i}">${ico('bolt')} ابنِ الدائرة في المختبر الحر</button>` : ''}</div></div>`).join('')}</div></div>`;
    $$('.chip', v).forEach(b => b.onclick = () => { this.f = +b.dataset.f; this.render(); });
    $$('[data-step]', v).forEach(b => b.onclick = () => { const ol = $(`.ex-sol[data-i="${b.dataset.step}"]`, v); const h = $('li.hid', ol); if (h) { h.classList.remove('hid'); Sound.click(); } if (!$('li.hid', ol)) b.disabled = true; });
    $$('[data-all]', v).forEach(b => b.onclick = () => { $$(`.ex-sol[data-i="${b.dataset.all}"] li`, v).forEach(li => li.classList.remove('hid')); });
    $$('[data-exp]', v).forEach(b => b.onclick = () => { const e = EXAMPLES[+b.dataset.exp]; const qs = e.p ? Object.entries(e.p).map(([k, x]) => k + '=' + x).join('&') : ''; Runner.cur = null; App.go('exp', e.exp + (qs ? '?' + qs : '')); });
    $$('[data-lab]', v).forEach(b => b.onclick = () => { const e = EXAMPLES[+b.dataset.lab]; App.go('lab'); setTimeout(() => { FreeLab.C.clear(); e.lab(FreeLab.C); FreeLab.C.resetState(); FreeLab.sel = null; FreeLab.stage.sel = null; FreeLab.stage.fit(); if (!FreeLab.C.running) FreeLab.toggle(); FreeLab.panel(); FreeLab.toast(e.n + ': ' + e.t + ' — انقر على أي عنصر لقراءة قيمه', 'info'); }, 120); });
    void openId;
  }
};

/* ======================= خرائط الفصول ======================= */
const Maps = {
  render(ch) {
    const v = $('#view-maps'); const C = chById(ch); const exps = EXPS.filter(e => e.ch === ch); const laws = LAWS.filter(l => l.cat === ch);
    const W = 1000, H = 640, cx = W / 2, cy = H / 2;
    const nodes = exps.map((e, i) => { const a = -Math.PI / 2 + i * TAU / exps.length; return { e, x: cx + Math.cos(a) * 300, y: cy + Math.sin(a) * 240, a }; });
    v.innerHTML = `<div class="wrap"><div class="sec-title" style="margin-top:0"><h3>خريطة الفصل</h3><p>انقر على أي تجربة لفتحها</p></div>
      <div class="chips" style="margin-bottom:12px">${CHAPTERS.map(c => `<button class="chip ${c.id === ch ? 'on' : ''}" onclick="App.go('maps','${c.id}')">ف${c.id}</button>`).join('')}</div>
      <div class="map-box"><svg viewBox="0 0 ${W} ${H}" class="map-svg">
        <defs><radialGradient id="mg"><stop offset="0" stop-color="${C.hex}" stop-opacity=".25"/><stop offset="1" stop-color="${C.hex}" stop-opacity="0"/></radialGradient></defs>
        <circle cx="${cx}" cy="${cy}" r="230" fill="url(#mg)"/>
        ${nodes.map(n => `<path d="M${cx},${cy} Q${(cx + n.x) / 2 + Math.sin(n.a) * 30},${(cy + n.y) / 2 - Math.cos(n.a) * 30} ${n.x},${n.y}" stroke="${C.hex}" stroke-opacity=".45" stroke-width="2" fill="none"/>`).join('')}
        <g><circle cx="${cx}" cy="${cy}" r="92" fill="${C.hex}"/><text x="${cx}" y="${cy - 14}" class="mc1">الفصل ${ch}</text><text x="${cx}" y="${cy + 16}" class="mc2">${C.name}</text></g>
        ${nodes.map(n => `<g class="mnode" data-id="${n.e.id}" tabindex="0"><rect x="${n.x - 92}" y="${n.y - 26}" width="184" height="52" rx="14" fill="var(--surface)" stroke="${C.hex}" stroke-width="2"/><text x="${n.x}" y="${n.y - 4}" class="mt">${n.e.title.length > 26 ? n.e.title.slice(0, 25) + '…' : n.e.title}</text><text x="${n.x}" y="${n.y + 15}" class="ms">${n.e.kind}${n.e.sec ? ' · ' + n.e.sec : ''}</text></g>`).join('')}
      </svg></div>
      <div class="sec-title"><h3>قوانين الفصل</h3><p>${laws.length} قانوناً</p></div>
      <div class="laws-grid">${laws.map(l => `<div class="law-card"><h4>${l.name}</h4><div class="fx">${l.fx}</div>${l.sym ? `<div class="sym">${l.sym}</div>` : ''}<div class="sym" style="color:var(--accent)">${exps.filter(e => (e.laws || []).includes(l.id)).map(e => `<a href="#exp/${e.id}">${e.title}</a>`).join(' · ')}</div></div>`).join('')}</div></div>`;
    $$('.mnode', v).forEach(g => { g.onclick = () => App.go('exp', g.dataset.id); g.onkeydown = e => { if (e.key === 'Enter') App.go('exp', g.dataset.id); }; });
  }
};
