'use strict';
/* =====================================================================
   Features: sound, guided tour, prediction, snapshot compare, probe,
   presentation mode + pen, worksheet, share link, splash
   ===================================================================== */
const Sound = {
  on: true, ctx: null,
  init() { try { const v = localStorage.getItem('lab-sound'); if (v !== null) this.on = v === '1'; } catch (e) { } },
  ac() { if (!this.ctx) { const A = window.AudioContext || window.webkitAudioContext; if (!A) return null; this.ctx = new A(); } if (this.ctx.state === 'suspended') this.ctx.resume(); return this.ctx; },
  beep(f = 800, d = .05, type = 'square', vol = .05) { if (!this.on) return; const a = this.ac(); if (!a) return; const o = a.createOscillator(), g = a.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(vol, a.currentTime); g.gain.exponentialRampToValueAtTime(.0001, a.currentTime + d); o.connect(g).connect(a.destination); o.start(); o.stop(a.currentTime + d + .02); },
  noise(d = .02, vol = .12) { if (!this.on) return; const a = this.ac(); if (!a) return; const n = Math.floor(a.sampleRate * d); const b = a.createBuffer(1, n, a.sampleRate); const x = b.getChannelData(0); for (let i = 0; i < n; i++) x[i] = (Math.random() * 2 - 1) * (1 - i / n) ** 3; const s = a.createBufferSource(), g = a.createGain(); g.gain.value = vol; s.buffer = b; s.connect(g).connect(a.destination); s.start(); },
  click() { this.noise(.025, .25); this.beep(2200, .015, 'square', .03); },
  tick() { this.noise(.008, .35); },
  pop() { this.noise(.25, .4); this.beep(120, .25, 'sawtooth', .06); },
  ok() { this.beep(660, .08, 'sine', .06); setTimeout(() => this.beep(990, .12, 'sine', .06), 90); },
  toggle() { this.on = !this.on; try { localStorage.setItem('lab-sound', this.on ? '1' : '0'); } catch (e) { } if (this.on) this.ok(); }
};
Sound.init();
document.addEventListener('click', e => { const b = e.target.closest('button'); if (b && b.closest('#ctls,.btnrow,.lab-bar')) Sound.click(); }, true);

/* ---------- Guided tour data (auto-checking steps) ---------- */
const sw = (S, id) => S.C && S.C.get(id) && S.C.get(id).closed;
const GUIDES = {
  rc_charge: [
    { t: 'هذه دائرة الشحن كما في الشكل (27): بطارية، مصباح L1، مقاومة R، كلفانوميتر G، ومتسعة. المفتاح K في الوسط الآن.', target: null },
    { t: 'انقل المفتاح K إلى الموضع (1) — اضغط الزر «الموضع (1): شحن».', check: S => S.pos === 1, target: '#ctls .btnrow button:nth-child(1)' },
    { t: 'راقب: المصباح L1 يتوهج بقوة ومؤشر الكلفانوميتر ينحرف… ثم يعود تدريجياً للصفر. انتظر حتى تبلغ نسبة الشحن 95%.', check: S => S.C.get('C').v / S.C.get('B').val > .95 },
    { t: 'اكتمل الشحن ✓ فرق جهد المتسعة = فرق جهد البطارية، فتوقف التيار وانطفأ المصباح. انظر منحني راسم الإشارة: الجهد يزداد والتيار يتناقص أُسّياً.' }
  ],
  rc_discharge: [
    { t: 'المتسعة مشحونة الآن. انقل المفتاح إلى الموضع (2) لربط صفيحتيها ببعضهما.', check: S => S.pos === 2, target: '#ctls .btnrow button:nth-child(2)' },
    { t: 'لاحظ: المصباح L2 يتوهج ومؤشر الكلفانوميتر ينحرف إلى الجهة المعاكسة. انتظر حتى ينتهي التفريغ.', check: S => Math.abs(S.C.get('C').v) < .5 },
    { t: 'انتهى التفريغ ✓ تعادلت شحنتا الصفيحتين. قارن اتجاه التيار الآن مع اتجاهه في نشاط الشحن.' }
  ],
  neon: [
    { t: 'اربطنا الملف والمفتاح والبطارية (9V) على التوالي، ومصباح النيون (يحتاج 80V) على التوازي مع الملف.' },
    { t: 'أغلق المفتاح — اضغط «غلق المفتاح».', check: S => sw(S, 'S'), target: '#ctls .btnrow button:nth-child(1)' },
    { t: 'هل توهج المصباح؟ لا — لأن الفولطية على طرفيه 9V فقط. انتظر لحظة حتى يثبت التيار في الملف.', check: S => S.C.get('L').i > .25 },
    { t: 'الآن افتح المفتاح — اضغط «فتح المفتاح» وراقب المصباح جيداً.', check: S => !sw(S, 'S') && (S.C.get('N').peak || 0) > 80, target: '#ctls .btnrow button:nth-child(2)' },
    { t: 'توهج المصباح لبرهة قصيرة ✓ لأن التلاشي السريع للتيار ولّد قوة دافعة محتثة ذاتية كبيرة. انظر راسم الإشارة: النبضة الكبيرة لحظة الفتح.' }
  ],
  self_lamps: [
    { t: 'مصباحان متماثلان: الأول مع ملف، والثاني مع مقاومة مساوية لمقاومة الملف.' },
    { t: 'أغلق المفتاح وراقب المصباحين معاً.', check: S => sw(S, 'S'), target: '#ctls .btnrow button:nth-child(1)' },
    { t: 'لاحظ: مصباح المقاومة توهج فوراً، ومصباح الملف يتأخر ✓ هذا هو تأثير المحاثة. جرّب زيادة L وكرر.' }
  ],
  c_dielectric: [
    { t: 'اضغط «شحن ثم فصل البطارية» لتشحن المتسعة وتفصلها.', check: S => !S.conn && S.Q > 0, target: '#ctls .btnrow button:nth-child(1)' },
    { t: 'سجّل قراءة الفولطميتر الآن (زر «تسجيل» في جدول القراءات).', check: S => S.rows.length >= 1, target: '#recBtn' },
    { t: 'حرّك منزلق «نسبة إدخال العازل» حتى النهاية (100%).', check: S => S.p.ins > .98, target: '#ctls .ctl:nth-child(2) input' },
    { t: 'قلّت قراءة الفولطميتر ✓ سجّل القراءة مرة أخرى، ثم جرّب عوازل مختلفة وقارن.', check: S => S.rows.length >= 2, target: '#recBtn' },
    { t: 'ممتاز ✓ لاحظ في الرسم البياني أن ΔV تتناسب عكسياً مع k.' }
  ],
  faraday_magnet: [
    { t: 'اضغط «إيقاف» في الحركة التلقائية واترك المغناطيس ساكناً: هل ينحرف مؤشر الكلفانوميتر؟', check: S => !S.auto, target: '#ctls .btnrow button:nth-child(4)' },
    { t: 'لا ينحرف. الآن اسحب المغناطيس بالفأرة نحو الملف (أو اضغط «إدخال»).', check: S => S.vx > 30 },
    { t: 'انحرف المؤشر ✓ الآن أبعد المغناطيس عن الملف (أو اضغط «إخراج»).', check: S => S.vx < -30 },
    { t: 'انحرف المؤشر إلى الجهة المعاكسة ✓ جرّب زيادة عدد اللفات أو إدخال قلب الحديد ولاحظ ازدياد الانحراف.' }
  ],
  faraday_ring: [
    { t: 'أغلق مفتاح الملف الابتدائي وراقب مؤشر الكلفانوميتر في الثانوي.', check: S => S.sw, target: '#ctls .btnrow button' },
    { t: 'انحرف لحظياً ثم عاد للصفر رغم بقاء المفتاح مغلقاً. الآن افتح المفتاح.', check: S => !S.sw, target: '#ctls .btnrow button' },
    { t: 'انحرف إلى الجهة المعاكسة ✓ التيار المحتث يتولد فقط عند تغيّر الفيض.' }
  ],
  xl_f: [
    { t: 'سجّل قراءة أولى عند التردد الحالي.', check: S => S.rows.length >= 1, target: '#recBtn' },
    { t: 'زد التردد إلى 150Hz تقريباً (المنزلق الأول).', check: S => S.p.f >= 140, target: '#ctls .ctl:nth-child(1) input' },
    { t: 'قلّت قراءة الأميتر ✓ سجّل، ثم كرر لترددات أخرى (3 قراءات على الأقل).', check: S => S.rows.length >= 3, target: '#recBtn' },
    { t: 'لاحظ الرسم البياني: خط مستقيم يمر بالأصل — XL ∝ f. ميله = 2πL.' }
  ],
  photoelectric: [
    { t: 'اختر ضوءاً طول موجته 600nm (منزلق الطول الموجي).', check: S => S.p.lam >= 560, target: '#ctls .ctl:nth-child(1) input' },
    { t: 'لا تنبعث إلكترونات! زد شدة الضوء إلى 100%.', check: S => S.p.I >= 95, target: '#ctls .ctl:nth-child(2) input' },
    { t: 'مازال التيار صفراً ✓ لأن تردد الضوء أقل من تردد العتبة. الآن قلل الطول الموجي إلى 350nm.', check: S => S.p.lam <= 360, target: '#ctls .ctl:nth-child(1) input' },
    { t: 'انبعثت الإلكترونات ✓ الآن اجعل فرق الجهد سالباً تدريجياً حتى يصبح التيار صفراً (جهد القطع).', check: S => peCalc(S).KE > 0 && peCalc(S).I === 0, target: '#ctls .ctl:nth-child(3) input' },
    { t: 'هذا جهد القطع Vs ✓ ويساوي (KE)max/e. اضغط «مسح منحني I–V» لرسم المنحني كاملاً.' }
  ],
  tourmaline: [
    { t: 'أزل الشريحة الثانية (ألغِ «وضع الشريحة الثانية») ودوّر المستقطب: هل تتغير الشدة؟', check: S => !S.p.an, target: '#ctls .ctl:nth-child(3) input' },
    { t: 'لا تتغير. أعد الشريحة الثانية (المحلل).', check: S => S.p.an, target: '#ctls .ctl:nth-child(3) input' },
    { t: 'دوّر المحلل حتى تصبح الزاوية بين المحورين 90°.', check: S => Math.abs(Math.abs(S.p.b - S.p.a) - 90) < 2, target: '#ctls .ctl:nth-child(2) input' },
    { t: 'انعدم الضوء النافذ ✓ هذا دليل على أن الضوء موجات مستعرضة.' }
  ],
  pn_bias: [
    { t: 'الثنائي بانحياز أمامي. زد فولطية المصدر تدريجياً وراقب التيار.', check: S => S.p.E >= 1.5, target: '#ctls .ctl:nth-child(2) input' },
    { t: 'بعد تجاوز ≈0.7V ازداد التيار بسرعة ✓ الآن اختر «انحياز عكسي».', check: S => S.p.rev == 1, target: '#ctls .ctl:nth-child(1) select' },
    { t: 'التيار ضئيل جداً ✓ اضغط «مسح المنحني تلقائياً» لرسم منحني الخواص.' }
  ],
  resonance: [
    { t: 'غيّر تردد المذبذب وراقب قراءة الأميتر.', check: S => Math.abs(S.p.f - 159) > 30, target: '#ctls .ctl:nth-child(1) input' },
    { t: 'اضغط «مسح تلقائي للتردد» لرسم منحني الرنين كاملاً.', check: S => S.rows.length > 10, target: '#ctls .btnrow button' },
    { t: 'القمة عند التردد الرنيني ✓ الآن قلل المقاومة R ثم أعد المسح: المنحني يصبح أحد (عامل نوعية أكبر).' }
  ]
};
/* ---------- Predictions ---------- */
const PREDICT = {
  c_dielectric: { q: 'متسعة مشحونة ومفصولة عن البطارية. عند إدخال لوح عازل بين صفيحتيها، قراءة الفولطميتر:', o: ['تزداد', 'تقل', 'لا تتغير'], a: 1, why: 'الشحنة ثابتة والسعة تزداد بالعامل k، وبما أن ΔV = Q/C فإن فرق الجهد يقل.' },
  c_dist: { q: 'بثبوت الشحنة، إذا قرّبنا صفيحتي المتسعة إلى نصف البعد، فإن فرق الجهد:', o: ['يتضاعف', 'يقل إلى النصف', 'لا يتغير'], a: 1, why: 'السعة تتضاعف (C ∝ 1/d) فيقل الجهد إلى النصف.' },
  c_series: { q: 'ثلاث متسعات مختلفة على التوالي. أكبر فرق جهد يكون على:', o: ['المتسعة الأكبر سعة', 'المتسعة الأصغر سعة', 'متساوٍ على الجميع'], a: 1, why: 'الشحنة متساوية، و ΔV = Q/C، فالأصغر سعة عليها أكبر جهد.' },
  rc_charge: { q: 'لحظة إغلاق دائرة الشحن، تيار الشحن يكون:', o: ['صفراً ثم يزداد', 'أعظم ما يمكن ثم يتناقص', 'ثابتاً'], a: 1, why: 'المتسعة غير مشحونة فكل فولطية البطارية على المقاومة: I = V/R، ثم يقل مع ازدياد جهد المتسعة.' },
  faraday_magnet: { q: 'إذا بقي المغناطيس ساكناً داخل الملف، مؤشر الكلفانوميتر:', o: ['ينحرف ويبقى منحرفاً', 'لا ينحرف', 'يهتز باستمرار'], a: 1, why: 'لا يتولد تيار محتث إلا عند تغيّر الفيض.' },
  neon: { q: 'مصباح نيون يحتاج 80V مربوط مع ملف وبطارية 9V. متى يتوهج؟', o: ['لحظة غلق المفتاح', 'لحظة فتح المفتاح', 'لا يتوهج أبداً'], a: 1, why: 'التلاشي السريع للتيار عند الفتح يولد قوة دافعة محتثة ذاتية كبيرة.' },
  self_lamps: { q: 'لحظة غلق المفتاح، أي المصباحين يتوهج أولاً؟', o: ['المربوط مع الملف', 'المربوط مع المقاومة', 'كلاهما معاً'], a: 1, why: 'الملف يعرقل نمو التيار بسبب القوة الدافعة المحتثة الذاتية.' },
  eddy: { q: 'بندولان: صفيحة كاملة وصفيحة مشقوقة يتأرجحان بين قطبي مغناطيس. أيهما يتوقف أسرع؟', o: ['الكاملة', 'المشقوقة', 'يتوقفان معاً'], a: 0, why: 'التيارات الدوامة في الكاملة كبيرة فتعرقل الحركة.' },
  xl_f: { q: 'بزيادة تردد المصدر مع ثبات الفولطية، التيار في المحث:', o: ['يزداد', 'يقل', 'لا يتغير'], a: 1, why: 'رادة الحث XL = 2πfL تزداد بزيادة التردد.' },
  xc_f: { q: 'بزيادة تردد المصدر مع ثبات الفولطية، التيار في المتسعة:', o: ['يزداد', 'يقل', 'لا يتغير'], a: 0, why: 'رادة السعة XC = 1/(2πfC) تقل بزيادة التردد.' },
  resonance: { q: 'في دائرة RLC متوالية، يكون التيار أعظم ما يمكن عندما:', o: ['XL > XC', 'XL = XC', 'XC > XL'], a: 1, why: 'عند الرنين تكون الممانعة Z = R أقل ما يمكن.' },
  young: { q: 'إذا قللنا البعد بين الشقين d، فإن المسافة بين الهدب:', o: ['تزداد', 'تقل', 'لا تتغير'], a: 0, why: 'Δy = λL/d تتناسب عكسياً مع d.' },
  tourmaline: { q: 'عندما يتعامد محورا المستقطب والمحلل، شدة الضوء النافذ:', o: ['أعظم ما يمكن', 'نصف الشدة', 'صفر'], a: 2, why: 'I = I₀cos²90° = 0.' },
  photoelectric: { q: 'ضوء أحمر لا يحرر إلكترونات من المعدن. إذا ضاعفنا شدته 10 مرات:', o: ['تتحرر إلكترونات', 'لا تتحرر إلكترونات', 'تتحرر بطاقة أكبر'], a: 1, why: 'تحرير الإلكترون يعتمد على طاقة الفوتون (التردد) لا على الشدة.' },
  pn_bias: { q: 'ثنائي سليكون بانحياز أمامي. يبدأ التيار بالازدياد بسرعة عندما يتجاوز الجهد:', o: ['0.1V', '0.7V', '5V'], a: 1, why: 'حاجز الجهد للسليكون ≈ 0.7V.' },
  decay: { q: 'عينة فيها 400 نواة وعمر النصف 8s. كم نواة تبقى بعد 16s تقريباً؟', o: ['200', '100', 'صفر'], a: 1, why: 'بعد عمرين للنصف: 400 × ¼ = 100.' }
};

const Features = {
  E: null, S: null,
  onOpen(E, S) {
    this.E = E; this.S = S; this.g = null;
    const rail = $('#rail'); if (!rail) return; const isC = !!S.C; const actN = E.kind === 'نشاط' ? 'النشاط' : 'التجربة';
    const rb = (id, icon, tip, extra = '') => `<button class="rb ${extra}" id="${id}" data-tip="${tip}" aria-label="${tip}">${ico(icon)}</button>`;
    rail.innerHTML = `<div class="rg">${rb('fGuide', 'play', 'ابدأ ' + actN + ': جولة موجهة خطوة بخطوة', 'accent')}${PREDICT[E.id] ? rb('fPred', 'help', 'توقّع قبل أن تجرّب') : ''}</div>
      <div class="rg">${rb('fSnap', 'camera', 'لقطة للمقارنة')}${isC ? rb('fProbe', 'target', 'مجس الجهد بين نقطتين') : ''}</div>
      <div class="rg">${(!E.dark || isC) ? rb('fView', 'layers', 'مظهر اللوحة') : ''}${isC ? rb('zIn', 'plus', 'تكبير') + rb('zOut', 'minus', 'تصغير') + rb('zFit', 'fit', 'ملاءمة الدائرة للشاشة') : ''}</div>
      <div class="rg">${rb('fPen', 'pen', 'قلم للكتابة فوق المحاكاة')}${rb('fPres', 'monitor', 'وضع العرض على السبورة الذكية')}${rb('fFull', 'fit', 'ملء الشاشة بالمحاكاة فقط')}</div>
      <div class="rg">${rb('fSheet', 'print', 'طباعة ورقة عمل')}${rb('fShare', 'share', 'نسخ رابط التجربة بإعداداتها')}</div>
      <div class="pop hidden" id="viewPop">
        ${E.dark ? '' : `<label>مظهر اللوحة</label><div class="seg" id="bookSeg"><button data-b="1" class="${THEME.book ? 'on' : ''}">مظهر الكتاب</button><button data-b="0" class="${THEME.book ? '' : 'on'}">داكن</button></div>`}
        ${isC ? `<label>رسم الدائرة</label><div class="seg" id="modeSeg"><button data-m="schematic" class="${Runner.stage && Runner.stage.o.mode === 'schematic' ? 'on' : ''}">رسم الكتاب</button><button data-m="realistic" class="${Runner.stage && Runner.stage.o.mode === 'realistic' ? 'on' : ''}">أجهزة واقعية</button></div>
        <label>اتجاه الحركة المعروضة</label><div class="seg" id="flowSeg"><button data-f="conv" class="on">التيار الاصطلاحي</button><button data-f="elec">الإلكترونات</button></div>` : ''}
      </div>`;
    $('#fGuide').onclick = () => this.startGuide();
    if ($('#fPred')) $('#fPred').onclick = () => this.predict(true);
    $('#fSnap').onclick = () => this.snap();
    if ($('#fView')) $('#fView').onclick = e => { e.stopPropagation(); $('#viewPop').classList.toggle('hidden'); $('#fView').classList.toggle('on'); };
    document.addEventListener('click', this._closePop = e => { if (!e.target.closest('#viewPop,#fView')) { const p = $('#viewPop'); if (p) p.classList.add('hidden'); const b = $('#fView'); if (b) b.classList.remove('on'); } });
    $$('#bookSeg button').forEach(b => b.onclick = () => { THEME.book = b.dataset.b === '1'; try { localStorage.setItem('lab-book', THEME.book ? '1' : '0'); } catch (e) { } $$('#bookSeg button').forEach(x => x.classList.toggle('on', x === b)); Runner.applyBook(); });
    $$('#modeSeg button').forEach(b => b.onclick = () => { $$('#modeSeg button').forEach(x => x.classList.toggle('on', x === b)); Runner.stage.o.mode = b.dataset.m; });
    $$('#flowSeg button').forEach(b => b.onclick = () => { $$('#flowSeg button').forEach(x => x.classList.toggle('on', x === b)); S.C.flow = b.dataset.f; });
    if (isC) { $('#zIn').onclick = () => Runner.stage.zoom(1.2); $('#zOut').onclick = () => Runner.stage.zoom(1 / 1.2); $('#zFit').onclick = () => Runner.stage.fit(E.pad || 90); }
    if ($('#fProbe')) $('#fProbe').onclick = () => { const st = Runner.stage; st.probeMode = !st.probeMode; st.probe = null; $('#fProbe').classList.toggle('on', st.probeMode); Runner.toast(st.probeMode ? 'انقر على نقطتين في الدائرة لقياس فرق الجهد بينهما' : 'أُلغي المجس', 'info'); };
    $('#fPen').onclick = () => this.pen();
    $('#fPres').onclick = () => Device.present(!document.body.classList.contains('present'));
    $('#fFull').onclick = () => Device.stageFull();
    $('#fSheet').onclick = () => this.sheet();
    $('#fShare').onclick = () => this.share();
    if (S.C) S.C.onBurn = c => { Sound.pop(); Runner.toast(c.type === 'bulb' ? 'احترق المصباح! القدرة تجاوزت القدرة المقررة' : 'تلف الأميتر! تيار كبير جداً — هل ربطته على التوازي؟'); };
    // stage entrance animation
    const st = $('.stage-col'); if (st) { st.classList.remove('enter'); void st.offsetWidth; st.classList.add('enter'); }
    if (PREDICT[E.id] && !(this.seenPred || (this.seenPred = new Set())).has(E.id)) setTimeout(() => this.predict(false), 350);
  },
  onClose() { if (this._closePop) document.removeEventListener('click', this._closePop); this.endGuide(); this.E = null; this.S = null; document.body.classList.remove('present'); $$('.pred-modal').forEach(x => x.remove()); },
  onFrame(E, S, dt) {
    if (this.g) this.guideTick(dt);
    if (E.id === 'decay') { const c = S.clicks || 0; if (c > (this.lastClicks || 0)) { if (S.run) Sound.tick(); } this.lastClicks = c; }
    if (S.C) { const n = S.C.comps.find(c => c.type === 'neon'); if (n) { if (n.on && !this.neonOn) Sound.beep(180, .25, 'sawtooth', .04); this.neonOn = n.on; } }
  },
  /* ---- guided tour ---- */
  startGuide() {
    const E = this.E; const steps = GUIDES[E.id] || E.steps.map(t => ({ t }));
    this.g = { steps, i: 0, ok: 0 };
    let bar = $('#guideBar'); if (!bar) { bar = el('div', { class: 'guide', id: 'guideBar' }); $('#stage').appendChild(bar); }
    this.renderGuide();
    const b = $('#fGuide'); if (b) { b.classList.add('on'); b.dataset.tip = 'إعادة الجولة من البداية'; }
  },
  endGuide() { this.g = null; const b = $('#guideBar'); if (b) b.remove(); const fg = $('#fGuide'); if (fg) { fg.classList.remove('on'); fg.dataset.tip = 'ابدأ الجولة الموجهة'; } $$('.pulse').forEach(x => x.classList.remove('pulse')); },
  renderGuide() {
    const g = this.g, bar = $('#guideBar'); if (!g || !bar) return; const st = g.steps[g.i]; const last = g.i === g.steps.length - 1;
    bar.classList.toggle('min', !!g.min);
    if (g.min) { bar.innerHTML = `<button class="gpill" data-a="max" title="إظهار الخطوة">${ico('chevU')} الخطوة ${g.i + 1} من ${g.steps.length}${st.check ? (g.ok ? ' ✓' : ' — بانتظار تنفيذك') : ''}</button><button class="icon-btn xs" data-a="close" title="إنهاء الجولة">${ico('close')}</button>`; $$('button', bar).forEach(b => b.onclick = () => { if (b.dataset.a === 'max') { g.min = 0; this.renderGuide(); } else this.endGuide(); }); return; }
    bar.innerHTML = `<div class="gctl"><button class="icon-btn xs" data-a="min" title="تصغير الخطوات">${ico('chevD')}</button><button class="icon-btn xs" data-a="close" title="إنهاء الجولة">${ico('close')}</button></div><div class="gnum">${g.i + 1}<small>/${g.steps.length}</small></div><div class="gtxt">${st.t}${st.check ? `<div class="gwait">${g.ok ? '✓ أحسنت!' : 'بانتظار تنفيذك…'}</div>` : ''}</div>
      <div class="gbtn">${g.i > 0 ? `<button class="btn sm" data-a="prev">السابق</button>` : ''}${last ? `<button class="btn sm good" data-a="end">إنهاء</button>` : `<button class="btn sm primary" data-a="next">${st.check && !g.ok ? 'تخطَّ' : 'التالي'}</button>`}</div>`;
    $$('button', bar).forEach(b => b.onclick = () => { const a = b.dataset.a; if (a === 'min') { g.min = 1; this.renderGuide(); return; } if (a === 'close') { this.endGuide(); return; } if (a === 'end') { this.endGuide(); Sound.ok(); Runner.toast('أحسنت! أكملت ' + (this.E.kind === 'نشاط' ? 'النشاط' : 'التجربة'), 'ok'); return; } g.i += a === 'next' ? 1 : -1; g.ok = 0; g.okT = 0; this.renderGuide(); });
    $$('.pulse').forEach(x => x.classList.remove('pulse')); if (st.target) { const t = $(st.target.replace(/\.ctl:nth-child\((\d+)\)/g, (m, n) => `.ctl[data-i="${n - 1}"]`)); if (t) { (t.closest('.ctl') || t).classList.add('pulse'); } }
    // tick matching step in the steps list
  },
  guideTick(dt) {
    const g = this.g; const st = g.steps[g.i]; if (!st || !st.check) return;
    let ok = false; try { ok = !!st.check(this.S); } catch (e) { }
    if (ok && !g.ok) { g.ok = 1; g.okT = 0; Sound.ok(); this.renderGuide(); }
    if (g.ok) { g.okT += dt; if (g.okT > 1.3 && g.i < g.steps.length - 1) { g.i++; g.ok = 0; this.renderGuide(); } }
  },
  /* ---- prediction ---- */
  predict(force) {
    const E = this.E, P = PREDICT[E.id]; if (!P) return; this.seenPred.add(E.id);
    $$('.pred-modal').forEach(x => x.remove());
    const m = el('div', { class: 'pred-modal' }); m.innerHTML = `<div class="pred-card"><div class="pred-h">🤔 توقّع قبل أن تجرّب</div><p>${P.q}</p><div class="pred-o">${P.o.map((o, i) => `<button class="btn" data-i="${i}">${o}</button>`).join('')}</div><button class="btn sm pred-skip">تخطَّ</button></div>`;
    $('#stage').appendChild(m);
    $('.pred-skip', m).onclick = () => m.remove();
    $$('.pred-o button', m).forEach(b => b.onclick = () => { this.pred = +b.dataset.i; m.innerHTML = `<div class="pred-card"><div class="pred-h">توقعك: «${P.o[this.pred]}»</div><p>الآن نفّذ ${E.kind === 'نشاط' ? 'النشاط' : 'التجربة'} وراقب النتيجة، ثم اكشف الإجابة.</p><div class="pred-o"><button class="btn primary" data-r="1">نفّذ الآن</button><button class="btn" data-r="2">اكشف الإجابة</button></div></div>`;
      $$('[data-r]', m).forEach(x => x.onclick = () => { if (x.dataset.r === '1') { m.classList.add('mini'); m.innerHTML = `<div class="pred-card"><b>توقعك:</b> ${P.o[this.pred]} <button class="btn sm primary" data-r="2">اكشف الإجابة</button></div>`; $('[data-r="2"]', m).onclick = () => this.reveal(m, P); } else this.reveal(m, P); }); });
    void force;
  },
  reveal(m, P) { const ok = this.pred === P.a; ok ? Sound.ok() : Sound.beep(220, .2, 'sine', .05); m.classList.remove('mini'); m.innerHTML = `<div class="pred-card ${ok ? 'good' : 'bad'}"><div class="pred-h">${ok ? '✓ توقعك صحيح!' : '✗ توقعك غير صحيح'}</div><p><b>الإجابة:</b> ${P.o[P.a]}</p><p>${P.why}</p><button class="btn sm">إغلاق</button></div>`; $('button', m).onclick = () => m.remove(); },
  /* ---- snapshot ---- */
  snap() {
    const S = this.S; if (!S) return;
    if (S.snap) { S.snap = null; $('#fSnap').classList.remove('on'); $('#fSnap').dataset.tip = 'لقطة للمقارنة'; Runner.toast('أُزيلت اللقطة', 'info'); return; }
    const clone = a => (a || []).map(s => ({ pts: s.pts.slice(), color: s.color || '#94a3b8', name: s.name }));
    S.snap = { reads: (S.lastReads || []).map(r => [r[0], r[1]]), scope: clone(S.lastScope), live: clone(S.lastLive).map(s => Object.assign(s, { dash: [5, 4], width: 1.3, name: 'لقطة ' + (s.name || '') })) };
    $('#fSnap').classList.add('on'); $('#fSnap').dataset.tip = 'إزالة اللقطة'; Runner.toast('حُفظت اللقطة — غيّر الإعدادات وقارن (القيم القديمة تظهر تحت كل قراءة والمنحني المنقط)', 'ok');
  },
  /* ---- pen ---- */
  pen() {
    let o = $('#penCv'); const b = $('#fPen');
    if (o) { o.remove(); $('#penBar') && $('#penBar').remove(); b.classList.remove('on'); return; }
    b.classList.add('on');
    o = el('canvas', { id: 'penCv', class: 'pen-cv' }); $('#stage').appendChild(o);
    const bar = el('div', { id: 'penBar', class: 'pen-bar' }); bar.innerHTML = ['#dc2626', '#1f5eff', '#0e9f6e', '#111827', '#f59e0b'].map((c, i) => `<button data-c="${c}" style="background:${c}" class="${i ? '' : 'on'}"></button>`).join('') + `<button data-x="1" title="مسح">${ico('trash')}</button>`; $('#stage').appendChild(bar);
    const { ctx } = fitCanvas(o); let col = '#dc2626', down = false, last = null;
    $$('button', bar).forEach(x => x.onclick = () => { if (x.dataset.x) { const r = o.getBoundingClientRect(); ctx.clearRect(0, 0, r.width, r.height); return; } col = x.dataset.c; $$('button', bar).forEach(y => y.classList.toggle('on', y === x)); });
    const pos = e => { const r = o.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    o.addEventListener('pointerdown', e => { down = true; o.setPointerCapture(e.pointerId); last = pos(e); });
    o.addEventListener('pointermove', e => { if (!down) return; const p = pos(e); ctx.strokeStyle = col; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(last[0], last[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); last = p; });
    o.addEventListener('pointerup', () => down = false);
  },
  /* ---- share ---- */
  share() {
    const E = this.E, S = this.S; const qs = Object.entries(S.p).filter(([k, v]) => typeof v !== 'object').map(([k, v]) => k + '=' + encodeURIComponent(v)).join('&');
    const url = location.href.split('#')[0] + '#exp/' + E.id + (qs ? '?' + qs : '');
    const done = () => Runner.toast('نُسخ الرابط — يفتح هذه التجربة بالإعدادات نفسها', 'ok');
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(url).then(done, () => this.showLink(url)); else this.showLink(url);
  },
  showLink(url) { $$('.pred-modal').forEach(x => x.remove()); const m = el('div', { class: 'pred-modal' }); m.innerHTML = `<div class="pred-card"><div class="pred-h">رابط التجربة بإعداداتها</div><input class="num" value="${url}" readonly style="direction:ltr"><p style="font-size:12.5px;color:var(--ink3)">انسخ الرابط (Ctrl+C). يعمل عندما يكون الملف منشوراً أو محفوظاً في المسار نفسه.</p><button class="btn sm">إغلاق</button></div>`; $('#stage').appendChild(m); const i = $('input', m); i.focus(); i.select(); $('button', m).onclick = () => m.remove(); },
  /* ---- worksheet ---- */
  sheet() {
    const E = this.E, ch = chById(E.ch); const cols = E.cols || [['a', ''], ['b', ''], ['c', '']];
    const laws = (E.laws || []).map(id => lawById(id)).filter(Boolean);
    const html = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>ورقة عمل — ${E.title}</title><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap" rel="stylesheet"><style>
      body{font-family:Tajawal,Tahoma,sans-serif;margin:0;padding:24px 32px;color:#111;font-size:14px;line-height:1.7}
      header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #1f5eff;padding-bottom:10px;margin-bottom:12px}
      h1{font-size:20px;margin:0}.meta{font-size:12px;color:#555}.who{text-align:left;font-size:12.5px}
      h2{font-size:15px;margin:14px 0 6px;color:#1f5eff;border-inline-start:4px solid #1f5eff;padding-inline-start:8px}
      table{border-collapse:collapse;width:100%}td,th{border:1px solid #888;padding:6px;text-align:center;height:22px}th{background:#eef2ff}
      .grid{height:250px;border:1.5px solid #333;background-image:linear-gradient(#f3b4c2 1px,transparent 1px),linear-gradient(90deg,#f3b4c2 1px,transparent 1px),linear-gradient(#fbe3e9 1px,transparent 1px),linear-gradient(90deg,#fbe3e9 1px,transparent 1px);background-size:50px 50px,50px 50px,10px 10px,10px 10px}
      .lines div{border-bottom:1px dotted #888;height:26px}.fx{direction:ltr;text-align:center;font-family:'Cambria Math','Times New Roman',serif;font-size:16px}
      .frac{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center}.frac>span:first-child{border-bottom:1px solid #000}
      .two{display:grid;grid-template-columns:1fr 1fr;gap:18px}footer{margin-top:16px;font-size:11.5px;color:#666;text-align:center;border-top:1px solid #ccc;padding-top:6px}
      @media print{body{padding:10px 16px}button{display:none}}</style></head><body>
      <header><div><div class="meta">الفصل ${ch.id}: ${ch.name} ${E.sec ? '· بند ' + E.sec : ''} ${E.page ? '· ص ' + E.page : ''}</div><h1>${E.kind}: ${E.title}</h1></div><div class="who">اسم الطالب: ....................<br>الشعبة: ........ التاريخ: ........</div></header>
      <p>${E.desc}</p>
      <div class="two"><div><h2>الأدوات</h2><ul>${(E.tools || []).map(t => `<li>${t}</li>`).join('')}</ul></div><div><h2>القوانين</h2>${laws.map(l => `<div><b>${l.name}</b><div class="fx">${l.fx}</div></div>`).join('')}</div></div>
      <h2>خطوات العمل</h2><ol>${(E.steps || []).map(t => `<li>${t}</li>`).join('')}</ol>
      ${E.cols ? `<h2>جدول القراءات</h2><table><tr><th>#</th>${cols.map(c => `<th>${c[1]}</th>`).join('')}</tr>${Array.from({ length: 7 }, (_, i) => `<tr><td>${i + 1}</td>${cols.map(() => '<td></td>').join('')}</tr>`).join('')}</table>` : ''}
      ${E.graph ? `<h2>الرسم البياني: ${E.graph.yl} مقابل ${E.graph.xl}</h2><div class="grid"></div>` : ''}
      <h2>الملاحظات والاستنتاج</h2><div class="lines">${'<div></div>'.repeat(5)}</div>
      <footer>مختبر الفيزياء التفاعلي — تم تصميمه للأستاذ علي محمد الشاروكي</footer>
      <script>setTimeout(()=>print(),600)<\/script></body></html>`;
    const w = window.open(URL.createObjectURL(new Blob([html], { type: 'text/html' })), '_blank'); if (!w) Runner.toast('اسمح بالنوافذ المنبثقة لطباعة ورقة العمل');
  }
};

/* ---------- Splash ---------- */
function showSplash() {
  try { if (sessionStorage.getItem('lab-splash')) return; sessionStorage.setItem('lab-splash', '1'); } catch (e) { }
  const s = el('div', { class: 'splash' });
  s.innerHTML = `<div class="splash-in"><div class="splash-logo"><svg viewBox="0 0 64 64" width="88" height="88"><defs><linearGradient id="lg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#1f5eff"/><stop offset="1" stop-color="#7c3aed"/></linearGradient></defs><circle cx="32" cy="32" r="30" fill="url(#lg)"/><g fill="none" stroke="#fff" stroke-width="2.2"><ellipse cx="32" cy="32" rx="22" ry="8"/><ellipse cx="32" cy="32" rx="22" ry="8" transform="rotate(60 32 32)"/><ellipse cx="32" cy="32" rx="22" ry="8" transform="rotate(120 32 32)"/></g><circle cx="32" cy="32" r="4.5" fill="#fde047"/></svg></div>
    <h1>مختبر الفيزياء التفاعلي</h1><p>للصف السادس العلمي</p><div class="splash-by">تم تصميمه للأستاذ<br><b>علي محمد الشاروكي</b></div><button class="btn primary">ادخل المختبر</button></div>`;
  document.body.appendChild(s);
  const close = () => { s.classList.add('out'); setTimeout(() => s.remove(), 500); };
  $('button', s).onclick = close; s.onclick = e => { if (e.target === s) close(); }; setTimeout(close, 4200);
}
