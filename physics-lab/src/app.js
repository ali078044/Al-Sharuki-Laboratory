'use strict';
/* ================= Registry ================= */
const CHAPTERS = [
  { id: 1, name: 'المتسعات', en: 'Capacitors', c: 'var(--ch1)', hex: '#0891b2', d: 'السعة، العوازل، ربط المتسعات، الطاقة المختزنة، الشحن والتفريغ.' },
  { id: 2, name: 'الحث الكهرومغناطيسي', en: 'Electromagnetic Induction', c: 'var(--ch2)', hex: '#ea580c', d: 'قانونا فراداي ولنز، القوة الدافعة الحركية، التيارات الدوامة، المولدات، الحث الذاتي والمتبادل.' },
  { id: 3, name: 'التيار المتناوب', en: 'Alternating Current', c: 'var(--ch3)', hex: '#7c3aed', d: 'المقدار المؤثر، رادة الحث والسعة، دوائر RLC، عامل القدرة، الرنين وعامل النوعية.' },
  { id: 4, name: 'الموجات الكهرومغناطيسية', en: 'Electromagnetic Waves', c: 'var(--ch4)', hex: '#0d9488', d: 'نظرية ماكسويل، توليد الموجات، الهوائي، الإرسال والتسلم، التضمين.' },
  { id: 5, name: 'البصريات الفيزيائية', en: 'Physical Optics', c: 'var(--ch5)', hex: '#db2777', d: 'التداخل، شقا يونك، الأغشية الرقيقة، الحيود، المحزز، الاستقطاب، الاستطارة.' },
  { id: 6, name: 'الفيزياء الحديثة', en: 'Modern Physics', c: 'var(--ch6)', hex: '#2563eb', d: 'إشعاع الجسم الأسود، الظاهرة الكهروضوئية، الموجات المادية، النسبية الخاصة.' },
  { id: 7, name: 'إلكترونيات الحالة الصلبة', en: 'Solid-State Electronics', c: 'var(--ch7)', hex: '#65a30d', d: 'حزم الطاقة، أشباه الموصلات، الثنائي pn، LED، التقويم، الترانزستور.' },
  { id: 8, name: 'الأطياف الذرية والليزر', en: 'Atomic Spectra & Laser', c: 'var(--ch8)', hex: '#c026d3', d: 'نموذج بور، طيف الهيدروجين، أنواع الأطياف، الأشعة السينية، كومبتون، الليزر.' },
  { id: 9, name: 'الفيزياء النووية', en: 'Nuclear Physics', c: 'var(--ch9)', hex: '#b91c1c', d: 'تركيب النواة، طاقة الربط، الانحلال الإشعاعي، التفاعلات النووية، الانشطار والاندماج.' },
  { id: 11, g: 'g7', num: 1, name: 'خواص المادة', en: 'Properties of Matter', c: '#0ea5e9', hex: '#0ea5e9', d: 'حالات المادة، التغير الفيزيائي والكيميائي، قياس الحجم، الكتلة والكثافة.', emo: '🧊' },
  { id: 12, g: 'g7', num: 2, name: 'القوة', en: 'Force', c: '#f97316', hex: '#f97316', d: 'مفهوم القوة والوزن، تمثيل القوة بالرسم، قوى التماس والمجال، محصلة القوى.', emo: '💪' },
  { id: 13, g: 'g7', num: 3, name: 'الضغط', en: 'Pressure', c: '#8b5cf6', hex: '#8b5cf6', d: 'الضغط والمساحة، ضغط السائل والغاز، الضغط الجوي، مبدأ أرخميدس والطفو.', emo: '🎈' },
  { id: 14, g: 'g7', num: 4, name: 'الحرارة', en: 'Heat', c: '#ef4444', hex: '#ef4444', d: 'الحرارة ودرجة الحرارة، الاتزان الحراري، المحرار، التوصيل والحمل والإشعاع.', emo: '🔥' },
  { id: 15, g: 'g7', num: 5, name: 'أثر الحرارة في المواد', en: 'Effects of Heat', c: '#10b981', hex: '#10b981', d: 'التمدد الحراري، شذوذ الماء، الانصهار والانجماد، التبخر والغليان والتكاثف.', emo: '♨️' },
  { id: 21, g: 'g8', num: 1, name: 'الحركة', en: 'Motion', c: '#0284c7', hex: '#0284c7', d: 'القياس، الحركة وأنواعها، المسافة والإزاحة، الانطلاق والسرعة والتعجيل.', emo: '🚗' },
  { id: 22, g: 'g8', num: 2, name: 'قوانين الحركة', en: 'Laws of Motion', c: '#ea580c', hex: '#ea580c', d: 'قوانين نيوتن الثلاثة، القصور الذاتي، الفعل ورد الفعل، الجاذبية والسقوط الحر.', emo: '🍎' },
  { id: 23, g: 'g8', num: 3, name: 'الشغل والقدرة والطاقة', en: 'Work, Power & Energy', c: '#16a34a', hex: '#16a34a', d: 'الشغل والقدرة، الطاقة الحركية والكامنة، تحولات الطاقة وحفظها.', emo: '⚡' },
  { id: 24, g: 'g8', num: 4, name: 'الآلات البسيطة', en: 'Simple Machines', c: '#9333ea', hex: '#9333ea', d: 'العتلات، السطح المائل، البريمة، الإسفين، العجلة والمحور، البكرة.', emo: '⚙️' },
  { id: 25, g: 'g8', num: 5, name: 'الحركة الموجية والصوت', en: 'Waves & Sound', c: '#0d9488', hex: '#0d9488', d: 'الموجات المستعرضة والطولية، خصائص الموجة، الصوت وانتقاله وخصائصه.', emo: '🔊' },
  { id: 26, g: 'g8', num: 6, name: 'الضوء', en: 'Light', c: '#db2777', hex: '#db2777', d: 'الضوء وخصائصه، انعكاس الضوء والمرايا، انكسار الضوء والعدسات.', emo: '💡' },
  { id: 31, g: 'g9', num: 1, name: 'الكهربائية الساكنة', en: 'Electrostatics', c: '#2563eb', hex: '#2563eb', d: 'الشحنة الكهربائية، طرائق الشحن، الكشاف الكهربائي، قانون كولوم، المجال الكهربائي، التفريغ الكهربائي والصواعق.', emo: '⚡' },
  { id: 32, g: 'g9', num: 2, name: 'المغناطيسية', en: 'Magnetism', c: '#dc2626', hex: '#dc2626', d: 'المغناطيس وخواصه، المواد المغناطيسية، المجال المغناطيسي وخطوطه، طرائق التمغنط، البوصلة والمجال الأرضي.', emo: '🧲' },
];
CHAPTERS.forEach(c => { c.g = c.g || 'g12'; c.num = c.num || c.id; });
const GRADES = [
  { id: 'g12', name: 'السادس العلمي', short: 'السادس', d: 'فيزياء الصف السادس الإعدادي — الفرع العلمي', emo: '🎓' },
  { id: 'g7', name: 'الأول المتوسط', short: 'الأول م', d: 'فيزياء الصف الأول المتوسط', emo: '🧪' },
  { id: 'g8', name: 'الثاني المتوسط', short: 'الثاني م', d: 'فيزياء الصف الثاني المتوسط', emo: '🚀' },
  { id: 'g9', name: 'الثالث المتوسط', short: 'الثالث م', d: 'فيزياء الصف الثالث المتوسط', emo: '🔋' }
];
const KID = g => g === 'g7' || g === 'g8' || g === 'g9';
const chById = id => CHAPTERS.find(c => c.id === +id) || CHAPTERS[0];
const gradeOf = E => chById(E.ch).g;
const gradeChs = g => CHAPTERS.filter(c => c.g === g);
const EXPS = [];
function X(def) { def.idx = EXPS.filter(e => e.ch === def.ch).length + 1; EXPS.push(def); }
const LAWS = [];
function LW(def) { LAWS.push(def); }
const lawById = id => LAWS.find(l => l.id === id);

/* ================= App shell ================= */
const App = {
  view: 'home', last: performance.now(), stage: null, runner: null,
  init() {
    // theme
    try { const t = localStorage.getItem('lab-theme'); if (t) document.documentElement.setAttribute('data-theme', t); } catch (e) { }
    $('#themeBtn').onclick = () => { const cur = App.isDark(); const n = cur ? 'light' : 'dark'; document.documentElement.setAttribute('data-theme', n); try { localStorage.setItem('lab-theme', n); } catch (e) { } };
    $$('.nav button').forEach(b => b.onclick = () => App.go(b.dataset.v));
    Home.render(); Catalog.render(); Laws.render();
    window.addEventListener('hashchange', () => App.route());
    App.route();
    requestAnimationFrame(App.loop);
  },
  isDark() { const a = document.documentElement.getAttribute('data-theme'); return a ? a === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; },
  go(v, arg) { location.hash = arg ? `${v}/${arg}` : v; },
  route() {
    const [v, rest = ''] = (location.hash.slice(1) || 'home').split('/'); const [arg, qs] = rest.split('?');
    const preset = {}; if (qs) qs.split('&').forEach(kv => { const [k, x] = kv.split('='); if (!k) return; const d = decodeURIComponent(x || ''); preset[k] = d === 'true' ? true : d === 'false' ? false : (isNaN(+d) || d === '' ? d : +d); });
    if (Runner.cur && !(v === 'exp' && arg === Runner.cur.id)) Runner.close();
    if (v !== 'lab') FreeLab.pause();
    $$('.view').forEach(x => x.classList.toggle('on', x.id === 'view-' + v));
    $$('.nav button').forEach(b => b.classList.toggle('on', b.dataset.v === v || (v === 'exp' && b.dataset.v === 'catalog')));
    document.body.dataset.view = v;
    App.view = v;
    if (v === 'exp') { const e = EXPS.find(x => x.id === arg); if (e) { if (Runner.cur !== e) Runner.open(e, preset); } else App.go('catalog'); }
    if (v === 'examples') Examples.render(arg);
    if (v === 'maps') Maps.render(+arg || 1);
    if (v === 'lab') FreeLab.open();
    window.scrollTo(0, 0);
  },
  loop(t) {
    const dt = clamp((t - App.last) / 1000, 0, .05); App.last = t;
    try {
      if (App.view === 'exp' && Runner.cur) Runner.frame(dt);
      else if (App.view === 'lab') FreeLab.frame(dt);
      else if (App.view === 'home') Home.frame(dt);
    } catch (err) { console.error(err); }
    requestAnimationFrame(App.loop);
  }
};

/* ================= Home ================= */
const Home = {
  render() {
    const acts = EXPS.filter(e => e.kind === 'نشاط').length;
    $('#view-home').innerHTML = `<div class="wrap">
      <div class="hero">
        <div>
          <div class="credit-badge">تم تصميمه للأستاذ علي محمد الشاروكي</div><h2>مختبر الفيزياء <span>التفاعلي</span><br>للصف السادس العلمي</h2>
          <p>جميع أنشطة وتجارب كتاب الفيزياء بتسلسل الكتاب نفسه، بمحاكاة تعتمد على المعادلات الفيزيائية الحقيقية: قراءات أجهزة حية، جداول قراءات، رسوم بيانية، ومحرك دوائر يحل قانوني كيرشوف في كل لحظة.</p>
          <div class="hero-cta">
            <button class="btn primary" onclick="App.go('catalog')">${ico('book')} تجارب المنهج</button>
            <button class="btn" onclick="App.go('lab')">${ico('bolt')} المختبر الحر</button>
            <button class="btn" onclick="App.go('laws')">${ico('sigma')} القوانين</button>
          </div>
          <div class="stats">
            <div class="stat"><b>${EXPS.length}</b><span>تجربة ونشاط</span></div>
            <div class="stat"><b>${acts}</b><span>نشاطاً من الكتاب</span></div>
            <div class="stat"><b>${EXAMPLES.length}</b><span>مثالاً محلولاً</span></div>
            <div class="stat"><b>9</b><span>فصول</span></div>
            <div class="stat"><b>${LAWS.length}</b><span>قانوناً مع حاسبة</span></div>
          </div>
        </div>
        <div class="hero-art"><canvas id="heroCv"></canvas></div>
      </div>
      <div class="sec-title"><h3>فصول الكتاب</h3><p>اختر فصلاً لعرض تجاربه بالترتيب</p></div>
      <div class="ch-grid">${CHAPTERS.map(ch => `<div class="ch-card" style="--c:${ch.c}" onclick="Catalog.filter=${ch.id};Catalog.render();App.go('catalog')">
        <div class="ch-num">الفصل ${ch.id}</div><h4>${ch.name}</h4><p>${ch.d}</p><div class="cnt">${EXPS.filter(e => e.ch === ch.id).length} تجربة ونشاط</div></div>`).join('')}</div>
      <div class="sec-title"><h3>أدوات المختبر</h3><p></p></div>
      <div class="feature-row">
        <div class="feature" onclick="App.go('lab')"><div class="fi">${ico('bolt')}</div><div><h4>المختبر الحر</h4><p>ابنِ أي دائرة: بطاريات، مصدر متناوب، مقاومات، متسعات، محاثات، ثنائيات، LED، أجهزة قياس، وراسم إشارة.</p></div></div>
        <div class="feature" onclick="App.go('lab')"><div class="fi">${ico('sigma')}</div><div><h4>قانونا كيرشوف لحظياً</h4><p>عرض مجموع التيارات عند كل عقدة ومجموع فروق الجهد حول كل مسار مغلق أثناء تشغيل الدائرة.</p></div></div>
        <div class="feature" onclick="App.go('examples')"><div class="fi">${ico('book')}</div><div><h4>أمثلة الكتاب المحلولة</h4><p>${EXAMPLES.length} مثالاً من الكتاب: اكشف الحل خطوة بخطوة ثم تحقق منه بالمحاكاة بالأرقام نفسها.</p></div></div>
        <div class="feature" onclick="App.go('maps','1')"><div class="fi">${ico('atom')}</div><div><h4>خرائط الفصول</h4><p>خريطة لكل فصل تربط تجاربه بقوانينه، انقر على أي عقدة لفتح التجربة.</p></div></div>
        <div class="feature" onclick="App.go('catalog')"><div class="fi">${ico('play')}</div><div><h4>الجولة الموجهة والتوقّع</h4><p>زر «ابدأ النشاط» يرشدك خطوة بخطوة كما في المختبر الحقيقي، وسؤال «توقّع قبل أن تجرّب».</p></div></div>
        <div class="feature" onclick="App.go('laws')"><div class="fi">${ico('grid')}</div><div><h4>مكتبة القوانين</h4><p>قوانين الفصول التسعة مع رموزها ووحداتها وحاسبة فورية لكل قانون.</p></div></div>
      </div></div>`;
  },
  t: 0,
  frame(dt) {
    const cv = $('#heroCv'); if (!cv) return; this.t += dt; const { ctx, w, h } = fitCanvas(cv); const t = this.t;
    G.bg(ctx, w, h);
    // two-source interference + orbit
    const cx = w * .5, cy = h * .5;
    for (let k = 0; k < 2; k++) { const sx = cx + (k ? 40 : -40), sy = cy + h * .25; for (let r = ((t * 40) % 24); r < w; r += 24) { ctx.strokeStyle = `rgba(${k ? '120,200,255' : '255,140,200'},${.35 * (1 - r / w)})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(sx, sy, r, Math.PI, TAU); ctx.stroke(); } }
    ctx.strokeStyle = 'rgba(255,209,102,.9)'; ctx.lineWidth = 2; ctx.beginPath();
    for (let x = 0; x < w; x += 3) { const y = h * .22 + Math.sin(x / 26 - t * 3) * 14 * Math.sin(x / w * Math.PI); x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
    ctx.fillStyle = '#ff6b6b'; ctx.beginPath(); ctx.arc(cx, cy - 10, 7, 0, TAU); ctx.fill();
    for (let k = 0; k < 3; k++) { ctx.save(); ctx.translate(cx, cy - 10); ctx.rotate(k * Math.PI / 3); ctx.strokeStyle = 'rgba(160,190,255,.4)'; ctx.beginPath(); ctx.ellipse(0, 0, 70, 24, 0, 0, TAU); ctx.stroke(); const a = t * (1.3 + k * .4) + k; ctx.fillStyle = '#7dd3fc'; ctx.beginPath(); ctx.arc(Math.cos(a) * 70, Math.sin(a) * 24, 4, 0, TAU); ctx.fill(); ctx.restore(); }
    G.text(ctx, 'ε = −N ΔΦ/Δt', w * .2, h * .88, { s: 14, c: 'rgba(220,230,255,.55)', mono: 1 });
    G.text(ctx, 'ΣI = 0 ,  ΣΔV = 0', w * .78, h * .88, { s: 14, c: 'rgba(220,230,255,.55)', mono: 1 });
  }
};

/* ================= Catalog ================= */
const Catalog = {
  filter: 0, q: '',
  render() {
    const v = $('#view-catalog');
    v.innerHTML = `<div class="wrap"><div class="sec-title" style="margin-top:0"><h3>تجارب وأنشطة المنهج</h3><p>مرتبة حسب تسلسل الكتاب</p></div>
      <div class="cat-tools"><input class="search" id="catQ" placeholder="ابحث عن تجربة… (مثال: رنين، شحن، يونك)" value="${this.q}">
      <div class="chips">${[0, ...CHAPTERS.map(c => c.id)].map(i => `<button class="chip ${this.filter === i ? 'on' : ''}" data-f="${i}">${i ? 'ف' + i : 'الكل'}</button>`).join('')}</div></div>
      <div id="catBody"></div></div>`;
    $('#catQ').oninput = e => { this.q = e.target.value; this.body(); };
    $$('.chip', v).forEach(b => b.onclick = () => { this.filter = +b.dataset.f; this.render(); });
    this.body();
  },
  body() {
    const q = this.q.trim();
    const html = CHAPTERS.filter(ch => !this.filter || ch.id === this.filter).map(ch => {
      const list = EXPS.filter(e => e.ch === ch.id && (!q || (e.title + e.desc + (e.sec || '')).includes(q)));
      if (!list.length) return '';
      return `<div class="cat-ch" style="--c:${ch.c}"><span class="dot"></span><h3>الفصل ${ch.id}: ${ch.name}</h3><small>${ch.en}</small></div>
      <div class="exp-list">${list.map(e => `<div class="exp-item" style="--c:${ch.c}" onclick="App.go('exp','${e.id}')"><div class="exp-idx">${ch.id}-${e.idx}</div><div><h5>${e.title}</h5><p><span class="tag ${e.kind === 'نشاط' ? 'act' : e.kind === 'تطبيق' ? 'app' : ''}">${e.kind}</span>${e.sec ? 'بند ' + e.sec : ''}${e.page ? ' · ص ' + e.page : ''}</p><p>${e.desc}</p></div></div>`).join('')}</div>`;
    }).join('');
    $('#catBody').innerHTML = html || '<div class="empty">لا توجد نتائج</div>';
  }
};

/* ================= Experiment runner ================= */
const Runner = {
  cur: null, S: null,
  open(E, preset = {}) {
    this.close(); this.cur = E; const ch = chById(E.ch);
    const v = $('#view-exp');
    const isC = !!E.circuit;
    const L = (() => { try { return JSON.parse(localStorage.getItem('lab-layout2') || '{"info":0}'); } catch (e) { return {}; } })();
    const hid = k => L[k] === 0;
    v.innerHTML = `<div class="exp-head">
        <button class="icon-btn" onclick="App.go('catalog')" title="رجوع إلى التجارب">${ico('back')}</button>
        <div class="title-wrap"><div class="meta" style="color:${ch.hex}">الفصل ${ch.id} · ${ch.name} ${E.sec ? '· بند ' + E.sec : ''} ${E.page ? '· ص ' + E.page : ''}${E.fig ? ' · الشكل (' + E.fig + ')' : ''}</div><h2><span class="tag ${E.kind === 'نشاط' ? 'act' : E.kind === 'تطبيق' ? 'app' : ''}">${E.kind}</span> ${E.title}</h2></div>
        <div class="spacer"></div>
        <div class="hgroup">
          <button class="btn sm primary" id="runBtn" title="إيقاف / تشغيل المحاكاة">${ico('pause')}<span>إيقاف</span></button>
          <button class="btn sm ic" id="rstBtn" title="إعادة التجربة من البداية">${ico('reset')}</button>
          <div class="seg sm" id="spdSeg" title="سرعة المحاكاة">${(E.speeds || [[1, '1×'], [.25, '¼×'], [.05, 'بطيء']]).map((s, i) => `<button data-s="${s[0]}" class="${i === 0 ? 'on' : ''}">${s[1]}</button>`).join('')}</div>
        </div>
        <div class="hgroup toggles" role="group" aria-label="إظهار وإخفاء اللوحات">
          <button class="tgl ${hid('info') ? '' : 'on'}" data-p="info" title="إظهار / إخفاء لوحة المعلومات">${ico('sidebar')}<span>المعلومات</span></button>
          <button class="tgl ${hid('ctl') ? '' : 'on'}" data-p="ctl" title="إظهار / إخفاء لوحة التحكم">${ico('sliders')}<span>التحكم</span></button>
          <button class="tgl ${hid('data') ? '' : 'on'}" data-p="data" title="إظهار / إخفاء القراءات والنتائج">${ico('sidebarL')}<span>القراءات</span></button>
        </div>
      </div>
      <div class="exp-grid ${hid('info') ? 'no-info' : ''} ${hid('data') ? 'no-data' : ''}">
        <aside class="panel info"><div class="panel-h"><span>${ico('info')} عن ${E.kind === 'نشاط' ? 'النشاط' : 'التجربة'}</span><button class="icon-btn xs" data-close="info" title="إخفاء">${ico('close')}</button></div><div class="tabs" id="infoTabs"></div><div class="tabc" id="infoBody"></div></aside>
        <div class="stage-col ${hid('ctl') ? 'no-ctl' : ''}"><div class="stage" id="stage"><div class="hud" id="hud"></div><div class="toast" id="toast"></div>
          <div class="rail" id="rail"></div></div>
          <aside class="fxp" id="fx"><div class="fx-h"><button class="icon-btn xs" id="fxMin" title="تصغير اللوحة إلى أيقونات / توسيعها">${ico('sliders')}</button><span>التأثيرات والترتيبات</span></div><div class="fx-strip" id="fxStrip"></div><div class="controls fx-body" id="ctls"></div></aside></div>
        <aside class="panel data"><div class="panel-h"><span>${ico('chart')} القراءات والنتائج</span><button class="icon-btn xs" data-close="data" title="إخفاء">${ico('close')}</button></div><div id="dataPanel"></div></aside>
      </div>`;
    const setP = (k, on) => { L[k] = on ? 1 : 0; try { localStorage.setItem('lab-layout2', JSON.stringify(L)); } catch (e) { } const g = $('.exp-grid'), sc = $('.stage-col'); if (k === 'info') g.classList.toggle('no-info', !on); if (k === 'data') g.classList.toggle('no-data', !on); if (k === 'ctl') sc.classList.toggle('no-ctl', !on); $$(`.tgl[data-p="${k}"]`).forEach(b => b.classList.toggle('on', on)); setTimeout(() => this.stage && this.stage.fit(E.pad || 90), 30); };
    $$('.tgl').forEach(b => b.onclick = () => setP(b.dataset.p, !b.classList.contains('on')));
    $$('[data-close]').forEach(b => b.onclick = () => setP(b.dataset.close, false));
    // state
    const S = this.S = { p: {}, t: 0, run: true, speed: 1, E, rows: [] };
    (E.controls || []).forEach(c => { if (c.k) S.p[c.k] = c.val; });
    Object.keys(preset).forEach(k => { if (k in S.p) S.p[k] = preset[k]; });
    const host = $('#stage');
    if (isC) {
      const C = S.C = new Circuit(); E.build(C, S);
      if (E.fixedDt) C.fixedDt = E.fixedDt; C.probeDt = E.probeDt || 0; C.timeScale = E.timeScale || 1; C.method = E.method || 'trap';
      C.resetState(); C.running = true;
      this.stage = new CircuitStage(host, C, { editable: false, mode: THEME.book ? 'schematic' : 'realistic', onSwitch: c => { E.onSwitch && E.onSwitch(c, S); this.refresh(); }, onSelect: c => { this.selected = c; } });
      requestAnimationFrame(() => this.stage.fit(E.pad || 90));
      (E.scope || []).forEach(s => { const c = C.get(s.id); if (c) c.probe = true; });
    } else {
      this.cv = el('canvas'); host.insertBefore(this.cv, host.firstChild);
      E.setup && E.setup(S);
      this.bindPointer(E, S);
    }
    Object.keys(S.p).forEach(k => { const c = (E.controls || []).find(x => x.k === k); if (c && c.on) c.on(S.p[k], S, true); });
    this.info(E); this.dataPanel(E, S); Interact.open(E, S);
    $('#runBtn').onclick = () => { S.run = !S.run; if (S.C) S.C.running = S.run; $('#runBtn').innerHTML = S.run ? ico('pause') + '<span>إيقاف</span>' : ico('play') + '<span>تشغيل</span>'; $('#runBtn').classList.toggle('good', !S.run); };
    $('#rstBtn').onclick = () => { if (S.C) { S.C.resetState(); E.onReset && E.onReset(S); } else { S.t = 0; E.setup && E.setup(S); Object.keys(S.p).forEach(k => { const c = (E.controls || []).find(x => x.k === k); if (c && c.on) c.on(S.p[k], S, true); }); } };
    $$('#spdSeg button').forEach(b => b.onclick = () => { $$('#spdSeg button').forEach(x => x.classList.toggle('on', x === b)); S.speed = +b.dataset.s; if (this.stage) this.stage.o.speed = S.speed; });
    this.applyBook();
    this.tick = 0;
    Features.onOpen(E, S);
  },
  applyBook() { const E = this.cur; const on = THEME.book && !E.dark; const col = $('.stage-col'); if (col) col.classList.toggle('book', on); this.book = on; },
  close() { Features.onClose(); Interact.close(); if (this.stage) { this.stage.destroy(); this.stage = null; } this.cur = null; this.S = null; this.cv = null; },
  bindPointer(E, S) {
    const cv = this.cv; let down = false;
    const pos = e => { const r = cv.getBoundingClientRect(), k = cv.__k || 1; return [(e.clientX - r.left) / k, (e.clientY - r.top) / k]; };
    cv.addEventListener('pointerdown', e => { down = true; cv.setPointerCapture(e.pointerId); E.pointer(S, 'down', ...pos(e)); });
    cv.addEventListener('pointermove', e => { E.pointer(S, down ? 'drag' : 'move', ...pos(e)); });
    const up = e => { if (down) E.pointer(S, 'up', ...pos(e)); down = false; };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    if (E.wheel) cv.addEventListener('wheel', e => { e.preventDefault(); E.wheel(S, e.deltaY); }, { passive: false });
    cv.addEventListener('dblclick', e => { E.pointer(S, 'dbl', ...pos(e)); });
  },
  controls(E, S) {
    const box = $('#ctls'); box.innerHTML = '';
    if (!(E.controls || []).length) { box.classList.add('hidden'); return; }
    (E.controls || []).forEach(c => {
      const d = el('div', { class: 'ctl' });
      const show = v => c.fmt ? c.fmt(v, S) : (fmt(v, 3) + (c.unit ? ' ' + c.unit : ''));
      if (!c.type || c.type === 'range') {
        d.innerHTML = `<label>${c.label}<output>${show(S.p[c.k])}</output></label><input type="range" min="${c.min}" max="${c.max}" step="${c.step || (c.max - c.min) / 100}" value="${S.p[c.k]}">`;
        const inp = $('input', d), out = $('output', d);
        inp.oninput = () => { const v = +inp.value; S.p[c.k] = v; out.textContent = show(v); c.on && c.on(v, S); };
        c._set = v => { inp.value = v; S.p[c.k] = v; out.textContent = show(v); };
      } else if (c.type === 'select') {
        d.innerHTML = `<label>${c.label}</label><select>${c.opts.map(o => `<option value="${o[0]}" ${o[0] == S.p[c.k] ? 'selected' : ''}>${o[1]}</option>`).join('')}</select>`;
        const s = $('select', d); s.onchange = () => { const v = isNaN(+s.value) ? s.value : +s.value; S.p[c.k] = v; c.on && c.on(v, S); };
      } else if (c.type === 'toggle') {
        d.innerHTML = `<label class="toggle"><input type="checkbox" ${S.p[c.k] ? 'checked' : ''}> ${c.label}</label>`;
        const i = $('input', d); i.onchange = () => { S.p[c.k] = i.checked; c.on && c.on(i.checked, S); };
      } else if (c.type === 'buttons') {
        d.innerHTML = `<label>${c.label || ''}</label><div class="btnrow">${c.btns.map((b, i) => `<button class="btn sm ${b.cls || ''}" data-i="${i}">${b.t}</button>`).join('')}</div>`;
        $$('button', d).forEach(b => b.onclick = () => { c.btns[+b.dataset.i].on(S); this.refresh(); });
      }
      box.appendChild(d);
    });
  },
  info(E) {
    const tabs = [['idea', 'الفكرة'], ['tools', 'الأدوات'], ['steps', 'الخطوات'], ['concl', 'الاستنتاج'], ['laws', 'القوانين']].filter(t => t[0] === 'idea' || t[0] === 'laws' ? true : (E[t[0]] || []).length);
    const tb = $('#infoTabs'); tb.innerHTML = tabs.map((t, i) => `<button data-t="${t[0]}" class="${i === 0 ? 'on' : ''}">${t[1]}</button>`).join('');
    const show = t => {
      $$('button', tb).forEach(b => b.classList.toggle('on', b.dataset.t === t));
      let h = '';
      if (t === 'idea') h = `<p>${E.desc}</p>${E.theory || ''}${E.howto ? `<div class="note key"><b>كيف تستخدم المحاكاة:</b> ${E.howto}</div>` : ''}`;
      if (t === 'tools') h = `<h4>أدوات ${E.kind === 'نشاط' ? 'النشاط' : 'التجربة'}</h4><ul>${E.tools.map(x => `<li>${x}</li>`).join('')}</ul>`;
      if (t === 'steps') { const done = this.done || (this.done = new Set()); h = `<h4>الخطوات <small class="prog">${done.size}/${E.steps.length}</small></h4><ol class="steps">${E.steps.map((x, i) => `<li class="${done.has(i) ? 'done' : ''} ${!done.has(i) && [...Array(i).keys()].every(k => done.has(k)) ? 'cur' : ''}" data-i="${i}"><span class="chk"></span><span>${x}</span></li>`).join('')}</ol><p class="sym" style="color:var(--ink3);font-size:12px">انقر على الخطوة بعد تنفيذها لتأشيرها.</p>`; }
      if (t === 'concl') h = `<h4>نستنتج من ${E.kind === 'نشاط' ? 'النشاط' : 'التجربة'}</h4><ul>${E.concl.map(x => `<li>${x}</li>`).join('')}</ul>`;
      if (t === 'laws') h = (E.laws || []).map(id => { const l = lawById(id); return l ? `<div class="law"><div class="ln">${l.name}</div><div class="fx">${l.fx}</div>${l.sym ? `<div class="sym">${l.sym}</div>` : ''}</div>` : ''; }).join('') || '<div class="empty">—</div>';
      $('#infoBody').innerHTML = h;
      if (t === 'steps') $$('#infoBody .steps li').forEach(li => li.onclick = () => { const i = +li.dataset.i; this.done.has(i) ? this.done.delete(i) : this.done.add(i); show('steps'); });
    };
    this.done = new Set();
    $$('button', tb).forEach(b => b.onclick = () => show(b.dataset.t)); show('idea');
  },
  dataPanel(E, S) {
    const p = $('#dataPanel');
    let h = E.explain ? `<div class="box explain-box"><h5>${ico('eye')} ماذا يحدث الآن؟</h5><div id="explain" class="explain"></div></div>` : '';
    h += `<div class="box"><h5>القراءات الحية</h5><div class="reads" id="reads"></div></div>`;
    if (E.aux) h += `<div class="box"><h5>${E.auxTitle || 'مخطط'}</h5><canvas class="mini ${E.auxTall ? 'tall' : ''}" id="auxCv"></canvas></div>`;
    if (E.scope) h += `<div class="box"><h5>راسم الإشارة (Oscilloscope)</h5><canvas class="mini" id="scopeCv"></canvas></div>`;
    if (E.live) h += `<div class="box"><h5>${E.live.title}</h5><canvas class="mini" id="liveCv"></canvas></div>`;
    if (E.record) h += `<div class="box"><h5>جدول القراءات <span style="display:flex;gap:4px"><button class="btn sm primary" id="recBtn">${ico('rec')} تسجيل</button><button class="btn sm" id="clrBtn">مسح</button><button class="btn sm" id="csvBtn" title="تصدير">${ico('dl')}</button></span></h5><div class="dt-wrap"><table class="dt" id="dtab"></table></div></div>`;
    if (E.graph) h += `<div class="box"><h5>الرسم البياني (ورق بياني)</h5><canvas class="mini tall" id="grCv"></canvas><div class="fit" id="fitTxt"></div></div>`;
    p.innerHTML = h;
    $$('.box > h5', p).forEach(h5 => { h5.classList.add('fold'); h5.insertAdjacentHTML('afterbegin', `<i class="chev">${ico('chevD')}</i>`); h5.onclick = e => { if (e.target.closest('button')) return; h5.parentElement.classList.toggle('collapsed'); }; });
    if (E.record) {
      $('#recBtn').onclick = () => { const r = E.record(S); if (r) { S.rows.push(r); this.table(E, S); this.toast('تم تسجيل القراءة', 'ok'); } };
      $('#clrBtn').onclick = () => { S.rows = []; this.table(E, S); };
      $('#csvBtn').onclick = () => { const cols = E.cols; const csv = '﻿' + cols.map(c => c[1]).join(',') + '\n' + S.rows.map(r => cols.map(c => r[c[0]]).join(',')).join('\n'); const a = el('a', { href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), download: E.id + '.csv' }); document.body.appendChild(a); a.click(); a.remove(); };
      this.table(E, S);
    }
  },
  table(E, S) {
    const t = $('#dtab'); if (!t) return;
    if (!S.rows.length) { t.innerHTML = `<tr>${E.cols.map(c => `<th>${c[1]}</th>`).join('')}</tr><tr><td colspan="${E.cols.length}" class="empty">اضغط «تسجيل» لإضافة قراءة</td></tr>`; }
    else t.innerHTML = `<tr><th>#</th>${E.cols.map(c => `<th>${c[1]}</th>`).join('')}</tr>` + S.rows.map((r, i) => `<tr><td>${i + 1}</td>${E.cols.map(c => `<td>${typeof r[c[0]] === 'number' ? fmtNum(r[c[0]]) : r[c[0]]}</td>`).join('')}</tr>`).join('');
    this.graph(E, S);
  },
  graph(E, S) {
    const cv = $('#grCv'); if (!cv || !E.graph) return;
    const g = E.graph; const pts = S.rows.map(r => [r[g.x], r[g.y]]).filter(p => isFinite(p[0]) && isFinite(p[1]));
    const series = [{ pts, type: 'pts', color: '#e11d48', name: 'القراءات' }];
    if (g.theory) { let xs = pts.map(p => p[0]); let a = g.xmin ?? Math.min(0, ...xs), b = g.xmax ?? (xs.length ? Math.max(...xs) * 1.1 : 1); if (!xs.length && g.xmax === undefined) b = g.defMax || 1; const th = []; for (let i = 0; i <= 120; i++) { const x = a + (b - a) * i / 120; th.push([x, g.theory(x, S)]); } series.unshift({ pts: th, color: '#1f5eff', name: 'النظري', width: 1.6 }); }
    let fitTxt = '';
    if (g.fit && pts.length >= 2) { const n = pts.length; let sx = 0, sy = 0, sxx = 0, sxy = 0; pts.forEach(([x, y]) => { sx += x; sy += y; sxx += x * x; sxy += x * y; }); const den = n * sxx - sx * sx; if (Math.abs(den) > 1e-30) { const m = (n * sxy - sx * sy) / den, b0 = (sy - m * sx) / n; const xs = pts.map(p => p[0]); const a0 = Math.min(...xs), b1 = Math.max(...xs); series.push({ pts: [[a0, m * a0 + b0], [b1, m * b1 + b0]], color: '#0e9f6e', name: 'أفضل خط مستقيم', width: 1.6, dash: [6, 3] }); fitTxt = `<b>الميل = ${fmtNum(m)}</b> ${g.fit.u || ''}${g.fit.t ? ' — ' + g.fit.t(m, S) : ''}`; } }
    Plot.draw(cv, series, { xl: g.xl, yl: g.yl, y0zero: g.y0zero !== false, x0zero: g.x0zero, ymax: g.ymax ? g.ymax(S) : undefined, xmin: g.xmin, xmax: g.xmax, mm: true });
    const ft = $('#fitTxt'); if (ft) ft.innerHTML = fitTxt || (g.fit ? 'سجّل قراءتين أو أكثر لحساب الميل.' : '');
  },
  toast(m, cls = '') { const t = $('#toast'); if (!t) return; t.textContent = m; t.className = 'toast on ' + cls; clearTimeout(this._tt); this._tt = setTimeout(() => t.className = 'toast', 1600); },
  refresh() { this.tick = 1e9; },
  frame(dt) {
    const E = this.cur, S = this.S; if (!E || !S) return;
    if (S.C) {
      if (E.tick && S.run) E.tick(S, dt * S.speed);
      let fdt = S.run ? dt : 0; if (!S.run && S._step) { fdt = S._step; S._step = 0; S.C.running = true; this.stage.cv.__book = this.book; this.stage.frame(fdt, App.isDark() && !this.book); S.C.running = false; } else { this.stage.cv.__book = this.book; this.stage.frame(fdt, App.isDark() && !this.book); }
      if (S.C.warn) { this.toast(S.C.warn); }
    } else {
      this.cv.__book = this.book; const { ctx, w, h } = fitCanvas(this.cv, window.innerWidth < 700 ? 760 : 0); S.W = w; S.H = h;
      if (S.run) { const d = dt * S.speed; S.t += d; E.update && E.update(S, d); }
      else if (S._step) { const d = S._step * S.speed; S._step = 0; S.t += d; E.update && E.update(S, d); }
      Interact._drawS = S; E.draw(ctx, w, h, S); Interact._drawS = null;
      Interact.after(ctx, w, h, S);
    }
    this.tick += dt;
    if (this.tick > .1) {
      this.tick = 0;
      const R = E.readings ? E.readings(S) : [];
      const ex = $('#explain'); if (ex && E.explain) { const t = E.explain(S); if (ex.dataset.t !== t) { ex.dataset.t = t; ex.innerHTML = t; } }
      const box = $('#reads'); if (box) box.innerHTML = R.map(r => { const old = S.snap && S.snap.reads.find(q => q[0] === r[0]); return `<div class="read ${r[2] ? 'wide' : ''}"><span>${r[0]}</span><b>${r[1]}</b>${old && old[1] !== r[1] ? `<em>اللقطة: ${old[1]}</em>` : ''}</div>`; }).join(''); S.lastReads = R;
      const hud = $('#hud'); if (hud) hud.innerHTML = (E.fig ? ['يقابل الشكل (' + E.fig + ') في الكتاب'] : []).concat(E.hud ? E.hud(S) : []).map(x => `<span class="pill">${x}</span>`).join('');
      if (E.graph && E.graph.live) this.graph(E, S);
    }
    if (E.aux) { const cv = $('#auxCv'); if (cv) { const { ctx, w, h } = fitCanvas(cv); ctx.clearRect(0, 0, w, h); E.aux(ctx, w, h, S, App.isDark()); } }
    if (E.scope && S.C) this.scope(E, S);
    if (E.live) { const cv = $('#liveCv'); if (cv) { const L = E.live; const d = L.data(S); S.lastLive = d.series; const ser = S.snap && S.snap.live ? d.series.concat(S.snap.live) : d.series; Plot.draw(cv, ser, d.opts || {}); } }
    Features.onFrame(E, S, dt); Interact.tick(E, S);
  },
  scope(E, S) {
    const cv = $('#scopeCv'); if (!cv) return;
    const series = []; let tmin = Infinity, tmax = -Infinity;
    const win = E.scopeWin ? E.scopeWin(S) : null;
    E.scope.forEach((s, i) => {
      const c = S.C.get(s.id); if (!c) return; let b = c.buf; if (!b.length) return;
      const t1 = b[b.length - 1][0]; const t0 = win ? Math.max(b[0][0], t1 - win) : b[0][0];
      const pts = []; for (const r of b) if (r[0] >= t0) pts.push([r[0], (s.q === 'i' ? r[2] : r[1]) * (s.k || 1)]);
      tmin = Math.min(tmin, t0); tmax = Math.max(tmax, t1);
      series.push({ pts, name: s.name, color: s.color || Plot.colors[i] });
    });
    if (!series.length) return;
    const o = { xl: 'الزمن t (s)', xmin: tmin, xmax: tmax, y0zero: false, tight: false };
    if (E.scopeY) Object.assign(o, E.scopeY(S));
    S.lastScope = series; if (S.snap && S.snap.scope) { const t1 = tmax; S.snap.scope.forEach(s => { const pts = s.pts; if (!pts.length) return; const sh = t1 - pts[pts.length - 1][0]; series.push({ pts: pts.map(p => [p[0] + sh, p[1]]), color: s.color, dash: [5, 4], width: 1.4, name: 'لقطة ' + (s.name || '') }); }); }
    Plot.draw(cv, series, o);
  }
};
function fmtNum(v) { const a = Math.abs(v); if (a === 0) return '0'; if (a >= 1e5 || a < 1e-3) return v.toExponential(2); return +v.toPrecision(4) + ''; }

/* helper to build control defs */
const R = (k, label, min, max, val, step, unit, on, fmtF) => ({ k, label, min, max, val, step, unit, on, fmt: fmtF });
const SEL = (k, label, opts, val, on) => ({ k, label, type: 'select', opts, val, on });
const TG = (k, label, val, on, icon) => ({ k, label, type: 'toggle', val, on, icon });
const BT = (label, btns) => ({ type: 'buttons', label, btns });
const rd = (l, v, wide) => [l, v, wide];
