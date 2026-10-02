'use strict';
/* ================= Free Lab ================= */
const FreeLab = {
  C: null, stage: null, built: false, tab: 'props', tick: 0,
  tools: [
    ['cursor', 'تحديد / تحريك'], ['wire', 'سلك توصيل'], ['battery', 'بطارية'], ['ac', 'مصدر متناوب'], ['resistor', 'مقاومة'], ['rheostat', 'ريوستات'], ['bulb', 'مصباح'],
    ['capacitor', 'متسعة'], ['inductor', 'محث'], ['switch', 'مفتاح'], ['ammeter', 'أميتر'], ['voltmeter', 'فولطميتر'], ['galvanometer', 'كلفانوميتر'],
    ['diode', 'ثنائي pn'], ['led', 'LED'], ['photodiode', 'ثنائي ضوئي'], ['neon', 'مصباح نيون']
  ],
  presets: {
    series: { n: 'مقاومات على التوالي', f: C => { C.add('battery', 2, 10, 2, 4, { val: 12 }); C.add('wire', 2, 4, 5, 4); C.add('ammeter', 5, 4, 9, 4); C.add('resistor', 9, 4, 13, 4, { val: 100, label: 'R1' }); C.add('resistor', 13, 4, 17, 4, { val: 200, label: 'R2' }); C.add('wire', 17, 4, 20, 4); C.add('resistor', 20, 4, 20, 10, { val: 300, label: 'R3' }); C.add('wire', 20, 10, 2, 10); C.add('voltmeter', 9, 1, 13, 1); C.add('wire', 9, 1, 9, 4); C.add('wire', 13, 1, 13, 4); } },
    parallel: { n: 'مقاومات على التوازي', f: C => { C.add('battery', 2, 12, 2, 4, { val: 12 }); C.add('ammeter', 2, 4, 7, 4, { label: 'A' }); C.add('wire', 7, 4, 17, 4); C.add('wire', 2, 12, 17, 12); [7, 12, 17].forEach((x, i) => { C.add('ammeter', x, 4, x, 7, { label: 'A' + (i + 1) }); C.add('resistor', x, 7, x, 12, { val: [100, 200, 400][i], label: 'R' + (i + 1) }); }); } },
    kirch: { n: 'شبكة كيرشوف (بطاريتان)', f: C => { C.add('battery', 2, 11, 2, 5, { val: 12, label: 'ε1' }); C.add('resistor', 2, 5, 9, 5, { val: 4, label: 'R1' }); C.add('resistor', 9, 5, 16, 5, { val: 2, label: 'R2' }); C.add('battery', 16, 11, 16, 5, { val: 6, label: 'ε2' }); C.add('resistor', 9, 5, 9, 11, { val: 6, label: 'R3' }); C.add('wire', 2, 11, 9, 11); C.add('wire', 9, 11, 16, 11); } },
    bridge: { n: 'قنطرة وتستون', f: C => { C.add('battery', 1, 14, 1, 2, { val: 10 }); C.add('wire', 1, 2, 10, 2); C.add('resistor', 10, 2, 5, 8, { val: 100, label: 'R1' }); C.add('resistor', 10, 2, 15, 8, { val: 200, label: 'R2' }); C.add('resistor', 5, 8, 10, 14, { val: 150, label: 'R3' }); C.add('rheostat', 15, 8, 10, 14, { val: 300, min: 0, max: 600, label: 'Rx' }); C.add('galvanometer', 5, 8, 15, 8); C.add('wire', 10, 14, 1, 14); } },
    rc: { n: 'دائرة RC (شحن)', f: C => { C.add('battery', 2, 4, 2, 10, { val: 12 }); C.add('switch', 2, 4, 6, 4); C.add('resistor', 6, 4, 11, 4, { val: 1000 }); C.add('capacitor', 11, 4, 11, 10, { val: 1000, vmax: 12 }); C.add('wire', 11, 10, 2, 10); C.add('voltmeter', 14, 4, 14, 10); C.add('wire', 11, 4, 14, 4); C.add('wire', 11, 10, 14, 10); } },
    rl: { n: 'دائرة RL (حث ذاتي)', f: C => { C.add('battery', 2, 4, 2, 10, { val: 6 }); C.add('switch', 2, 4, 6, 4); C.add('inductor', 6, 4, 11, 4, { val: 2 }); C.add('bulb', 11, 4, 11, 10, { val: 10, rated: 3 }); C.add('wire', 11, 10, 2, 10); } },
    rlc: { n: 'RLC متوالية (رنين)', f: C => { C.add('ac', 2, 11, 2, 4, { val: 10, f: 159 }); C.add('ammeter', 2, 4, 6, 4); C.add('resistor', 6, 4, 10, 4, { val: 20 }); C.add('inductor', 10, 4, 14, 4, { val: .1 }); C.add('capacitor', 14, 4, 18, 4, { val: 10 }); C.add('wire', 18, 4, 18, 11); C.add('wire', 18, 11, 2, 11); } },
    rect: { n: 'مقوم نصف موجة', f: C => { C.add('ac', 2, 11, 2, 4, { val: 10, f: 50 }); C.add('diode', 2, 4, 8, 4); C.add('resistor', 8, 4, 8, 11, { val: 1000 }); C.add('wire', 8, 11, 2, 11); C.add('voltmeter', 11, 4, 11, 11); C.add('wire', 8, 4, 11, 4); C.add('wire', 8, 11, 11, 11); } },
    led: { n: 'LED مع مقاومة', f: C => { C.add('battery', 2, 4, 2, 10, { val: 6 }); C.add('rheostat', 2, 4, 8, 4, { val: 200, min: 50, max: 1000 }); C.add('led', 8, 4, 8, 10, { color: 'green' }); C.add('ammeter', 8, 10, 2, 10); } }
  },
  build() {
    const v = $('#view-lab');
    v.innerHTML = `<div class="lab-grid">
      <div class="palette" id="palette"></div>
      <div class="stage-col">
        <div class="lab-bar">
          <div class="grp"><button class="btn sm good" id="lRun">${ico('play')} تشغيل</button><button class="btn sm ic" id="lRst" title="إعادة الحالة الابتدائية">${ico('reset')}</button></div>
          <div class="grp"><button class="btn sm ic" id="lDel" title="حذف العنصر المحدد (Delete)">${ico('trash')}</button><button class="btn sm ic" id="lRot" title="تدوير العنصر المحدد 90°">${ico('rotate')}</button><button class="btn sm" id="lClr" title="مسح كل العناصر">مسح اللوحة</button></div>
          <div class="grp"><select class="btn sm" id="lPre" title="تحميل دائرة جاهزة"><option value="">دوائر جاهزة…</option>${Object.entries(this.presets).map(([k, p]) => `<option value="${k}">${p.n}</option>`).join('')}</select></div>
          <div class="grp"><button class="btn sm" id="lProbe" title="قياس فرق الجهد بين نقطتين">${ico('target')} مجس</button>
            <div class="menu"><button class="btn sm" data-menu="mView">${ico('layers')} العرض ${ico('chevD')}</button><div class="pop hidden" id="mView">
              <label>مظهر اللوحة</label><div class="seg" id="lBook"><button data-b="1" class="${THEME.book ? 'on' : ''}">مظهر الكتاب</button><button data-b="0" class="${THEME.book ? '' : 'on'}">داكن</button></div>
              <label>رسم العناصر</label><div class="seg" id="lMode"><button data-m="schematic" class="${THEME.book ? 'on' : ''}">رسم الكتاب</button><button data-m="realistic" class="${THEME.book ? '' : 'on'}">أجهزة واقعية</button></div>
              <label>الحركة المعروضة</label><div class="seg" id="lFlow"><button data-f="conv" class="on">تيار اصطلاحي</button><button data-f="elec">إلكترونات</button></div>
              <label>سرعة المحاكاة</label><div class="seg" id="lSpd"><button data-s="1" class="on">1×</button><button data-s="0.1">0.1×</button><button data-s="0.01">0.01×</button></div>
              <label>التكبير</label><div class="seg"><button id="lzIn">${ico('plus')}</button><button id="lzOut">${ico('minus')}</button><button id="lzFit">${ico('fit')} ملاءمة</button></div>
            </div></div>
            <div class="menu"><button class="btn sm" data-menu="mFile">${ico('file')} ملف ${ico('chevD')}</button><div class="pop hidden" id="mFile">
              <button class="btn sm" id="lSave">${ico('save')} حفظ الدائرة في المتصفح</button><button class="btn sm" id="lLoad">${ico('reset')} استرجاع آخر دائرة محفوظة</button>
            </div></div></div>
          <div class="spacer"></div>
          <div class="grp"><button class="tgl on" data-lp="pal" title="إظهار / إخفاء قائمة العناصر">${ico('sidebar')}<span>العناصر</span></button><button class="tgl on" data-lp="side" title="إظهار / إخفاء لوحة الخصائص">${ico('sidebarL')}<span>الخصائص</span></button></div>
        </div>
        <div class="stage" id="labStage"><div class="toast" id="labToast"></div></div>
      </div>
      <aside class="panel data"><div class="tabs" id="lTabs"><button data-t="props" class="on">الخصائص</button><button data-t="kirch">قانونا كيرشوف</button><button data-t="scope">راسم الإشارة</button><button data-t="help">إرشادات</button></div><div id="lPanel" class="tabc"></div></aside>
    </div>`;
    const pal = $('#palette');
    const GRP = { cursor: 'أدوات', battery: 'المصادر', resistor: 'العناصر', ammeter: 'أجهزة القياس', diode: 'أشباه الموصلات' };
    pal.innerHTML = this.tools.map(([t, n]) => (GRP[t] ? `<h6>${GRP[t]}</h6>` : '') + `<button class="tool ${t === 'cursor' ? 'on' : ''}" data-t="${t}" title="${n}"><canvas></canvas><span>${n}</span></button>`).join('');
    $$('.tool', pal).forEach(b => { this.toolIcon($('canvas', b), b.dataset.t); b.onclick = () => this.setTool(b.dataset.t); });
    this.C = new Circuit();
    this.stage = new CircuitStage($('#labStage'), this.C, { editable: true, mode: THEME.book ? 'schematic' : 'realistic', onSelect: c => { this.sel = c; this.C.comps.forEach(x => x.probe = x === c); if (c) c.buf = c.buf || []; this.panel(); }, onChange: () => this.panel(), onToolDone: () => this.setTool('cursor') });
    $('#lRun').onclick = () => this.toggle();
    $$('[data-menu]').forEach(b => b.onclick = e => { e.stopPropagation(); const p = $('#' + b.dataset.menu); const was = p.classList.contains('hidden'); $$('.lab-bar .pop').forEach(x => x.classList.add('hidden')); if (was) p.classList.remove('hidden'); });
    document.addEventListener('click', e => { if (!e.target.closest('.menu')) $$('.lab-bar .pop').forEach(x => x.classList.add('hidden')); });
    $$('[data-lp]').forEach(b => b.onclick = () => { const on = !b.classList.contains('on'); b.classList.toggle('on', on); $('.lab-grid').classList.toggle(b.dataset.lp === 'pal' ? 'no-pal' : 'no-side', !on); setTimeout(() => this.stage.fit(), 30); });
    $('#lProbe').onclick = () => { const st = this.stage; st.probeMode = !st.probeMode; st.probe = null; $('#lProbe').classList.toggle('primary', st.probeMode); this.toast(st.probeMode ? 'انقر على نقطتين في الدائرة لقياس فرق الجهد' : 'أُلغي المجس', 'info'); };
    $('#lRst').onclick = () => { this.C.resetState(); };
    $('#lDel').onclick = () => { if (this.sel) { this.C.remove(this.sel); this.sel = null; this.stage.sel = null; this.panel(); } };
    $('#lRot').onclick = () => { const c = this.sel; if (!c) return; const dx = c.p2.x - c.p1.x, dy = c.p2.y - c.p1.y; c.p2 = { x: c.p1.x - dy, y: c.p1.y + dx }; this.C.dirty = true; };
    $('#lClr').onclick = () => { this.C.clear(); this.sel = null; this.stage.sel = null; this.panel(); };
    $('#lPre').onchange = e => { const k = e.target.value; if (!k) return; this.C.clear(); this.presets[k].f(this.C); this.C.resetState(); this.sel = null; this.stage.sel = null; requestAnimationFrame(() => this.stage.fit()); e.target.value = ''; if (!this.C.running) this.toggle(); this.panel(); };
    $$('#lMode button').forEach(b => b.onclick = () => { $$('#lMode button').forEach(x => x.classList.toggle('on', x === b)); this.stage.o.mode = b.dataset.m; });
    $$('#lBook button').forEach(b => b.onclick = () => { THEME.book = b.dataset.b === '1'; try { localStorage.setItem('lab-book', THEME.book ? '1' : '0'); } catch (e) { } $$('#lBook button').forEach(x => x.classList.toggle('on', x === b)); });
    $$('#lFlow button').forEach(b => b.onclick = () => { $$('#lFlow button').forEach(x => x.classList.toggle('on', x === b)); this.C.flow = b.dataset.f; });
    $$('#lSpd button').forEach(b => b.onclick = () => { $$('#lSpd button').forEach(x => x.classList.toggle('on', x === b)); this.stage.o.speed = +b.dataset.s; });
    $('#lzIn').onclick = () => this.stage.zoom(1.2); $('#lzOut').onclick = () => this.stage.zoom(1 / 1.2); $('#lzFit').onclick = () => this.stage.fit();
    $('#lSave').onclick = () => { try { localStorage.setItem('lab-circuit', JSON.stringify(this.C.toJSON())); this.toast('تم حفظ الدائرة في هذا المتصفح', 'ok'); } catch (e) { this.toast('تعذّر الحفظ في هذا المتصفح'); } };
    $('#lLoad').onclick = () => { try { const s = localStorage.getItem('lab-circuit'); if (!s) return this.toast('لا توجد دائرة محفوظة', 'info'); this.C.load(JSON.parse(s)); this.C.resetState(); requestAnimationFrame(() => this.stage.fit()); } catch (e) { this.toast('تعذّر الاسترجاع'); } };
    $$('#lTabs button').forEach(b => b.onclick = () => { this.tab = b.dataset.t; $$('#lTabs button').forEach(x => x.classList.toggle('on', x === b)); this.panel(); });
    this.C.allowBurn = true; this.C.onBurn = c => { Sound.pop(); this.toast(c.type === 'bulb' ? 'احترق المصباح! القدرة تجاوزت القدرة المقررة — اضغط «إعادة»' : 'تلف الأميتر! تيار كبير جداً — الأميتر يُربط على التوالي لا التوازي'); };
    this.presets.kirch.f(this.C); this.C.resetState();
    this.built = true; this.panel();
  },
  toolIcon(cv, t) {
    const ctx = cv.getContext('2d'); cv.width = 68; cv.height = 44; ctx.scale(2, 2);
    ctx.translate(17, 11);
    const ink = getComputedStyle(document.documentElement).getPropertyValue('--ink2') || '#44526e';
    if (t === 'cursor') { ctx.fillStyle = ink; ctx.beginPath(); ctx.moveTo(-4, -8); ctx.lineTo(6, 2); ctx.lineTo(1, 2); ctx.lineTo(4, 8); ctx.lineTo(2, 9); ctx.lineTo(-1, 3); ctx.lineTo(-4, 6); ctx.closePath(); ctx.fill(); return; }
    ctx.scale(.42, .42);
    const fake = { type: t, val: CT[t].val, closed: true, color: 'red', f: 50, core: false, vis: 0, light: 60 };
    ctx.strokeStyle = ink; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(40, 0); ctx.stroke();
    if (t !== 'wire') { ctx.save(); ctx.fillStyle = 'rgba(0,0,0,0)'; CRender.S[t].call(CRender, ctx, fake, Math.min(CT[t].bh, 26), ink, { reading: () => ({ v: 0, i: 0 }) }, 0); ctx.restore(); }
  },
  setTool(t) { this.stage.tool = t; $$('.tool').forEach(b => b.classList.toggle('on', b.dataset.t === t)); this.stage.cv.style.cursor = t === 'cursor' ? 'default' : 'crosshair'; },
  toggle() {
    const C = this.C; if (C.dirty) C.topology();
    if (!C.running && C.open && C.open.some(Boolean)) { this.toast('توجد أطراف غير موصولة (الدوائر الحمراء) — ستُهمل في الحساب', 'info'); }
    C.running = !C.running;
    const b = $('#lRun'); b.innerHTML = C.running ? ico('pause') + ' إيقاف' : ico('play') + ' تشغيل'; b.className = 'btn sm ' + (C.running ? 'warn' : 'good');
  },
  pause() { if (this.C && this.C.running) this.toggle(); },
  open() { if (!this.built) this.build(); requestAnimationFrame(() => this.stage.fit()); if (!this.C.running) this.toggle(); },
  toast(m, cls = '') { const t = $('#labToast'); if (!t) return; t.textContent = m; t.className = 'toast on ' + cls; clearTimeout(this._tt); this._tt = setTimeout(() => t.className = 'toast', 2200); },
  frame(dt) {
    if (!this.stage) return;
    this.stage.cv.__book = THEME.book; $('#labStage').parentElement.classList.toggle('book', THEME.book); this.stage.frame(dt, App.isDark() && !THEME.book);
    this.tick += dt;
    if (this.tick > .25) { this.tick = 0; this.panelLive(); if (this.C.warn) this.toast(this.C.warn); }
    if (this.tab === 'scope') this.drawScope();
  },
  field(c, key, label, unit, min, max, step, log) {
    const v = c[key];
    return `<div class="prop-row"><label>${label}<span style="font-family:var(--mono);direction:ltr" data-o="${key}">${fmt(v, 4)} ${unit}</span></label>
      <input type="range" data-k="${key}" min="${log ? Math.log10(min) : min}" max="${log ? Math.log10(max) : max}" step="${log ? 0.01 : step}" value="${log ? Math.log10(v) : v}" data-log="${log ? 1 : 0}">
      <input class="num" type="number" data-n="${key}" value="${v}" step="any"></div>`;
  },
  panel() {
    const P = $('#lPanel'); if (!P) return;
    if (this.tab === 'help') {
      P.innerHTML = `<h4>طريقة البناء</h4><ol><li>اختر أداة من القائمة ثم اسحب على اللوحة من نقطة إلى أخرى لوضعها (أو انقر مرة واحدة).</li><li>تتصل العناصر عندما تلتقي أطرافها في النقطة نفسها من الشبكة.</li><li>بأداة «تحديد» اسحب طرف العنصر لتمديده، أو اسحب جسمه لتحريكه، واسحب الفراغ لتحريك اللوحة. عجلة الفأرة للتكبير.</li><li>انقر على المفتاح لفتحه أو غلقه.</li><li>اضغط «تشغيل» لتبدأ المحاكاة؛ تظهر القراءات على الأجهزة وتتحرك الشحنات بحسب شدة التيار.</li></ol>
      <h4>عن المحاكي</h4><p>يحل المحاكي الدائرة بطريقة التحليل العقدي المعدّل (MNA) المبنية على قانوني كيرشوف، مع نماذج عددية للمتسعة والمحث (طريقة شبه المنحرف)، ونموذج شوكلي للثنائي، ومصباح نيون يتوهج عند ${80}V. في دوائر التيار المتناوب تعرض الأجهزة <b>المقدار المؤثر</b> كما في الأجهزة الحقيقية.</p>
      <div class="note key">المقاومة الداخلية للأميتر صغيرة جداً (1mΩ) ومقاومة الفولطميتر كبيرة جداً (10MΩ) — لذا يُربط الأميتر على التوالي والفولطميتر على التوازي.</div>`;
      return;
    }
    if (this.tab === 'kirch') { P.innerHTML = `<div id="kirch" class="kirch-list"></div>`; this.panelLive(); return; }
    if (this.tab === 'scope') { P.innerHTML = this.sel ? `<p style="margin:0 0 6px">العنصر: <b>${this.sel.label || CT[this.sel.type].name}</b></p><canvas class="mini tall" id="lScope"></canvas><p class="sym" style="font-size:12.5px;color:var(--ink3)">الأزرق: فرق الجهد V(t) — الأحمر: التيار I(t) (بمقياس منفصل)</p>` : '<div class="empty">حدد عنصراً لعرض إشارته</div>'; return; }
    const c = this.sel;
    if (!c) { P.innerHTML = `<div class="empty" style="padding:30px 10px">انقر على أي عنصر في الدائرة لعرض خصائصه وقراءاته</div>`; return; }
    let h = `<h4 style="margin-top:0">${CT[c.type].name}</h4><div class="reads" id="lReads"></div>`;
    h += `<div class="prop-row"><label>التسمية</label><input class="num" style="direction:rtl;font-family:inherit" data-lbl value="${c.label || ''}" placeholder="${c.id}"></div>`;
    switch (c.type) {
      case 'battery': h += this.field(c, 'val', 'القوة الدافعة ε', 'V', 0, 240, .5) + this.field(c, 'r', 'المقاومة الداخلية r', 'Ω', 0, 20, .1); break;
      case 'ac': h += this.field(c, 'val', 'الفولطية العظمى Vm', 'V', 0, 340, .5) + this.field(c, 'f', 'التردد f', 'Hz', 1, 100000, 1, true); break;
      case 'resistor': case 'bulb': h += this.field(c, 'val', 'المقاومة R', 'Ω', 0.1, 1e6, 1, true); if (c.type === 'bulb') h += this.field(c, 'rated', 'القدرة المقررة', 'W', .1, 100, .1); break;
      case 'rheostat': c.min = c.min ?? 0; c.max = c.max ?? 200; h += this.field(c, 'val', 'المقاومة R', 'Ω', c.min, c.max, (c.max - c.min) / 200) + this.field(c, 'max', 'أقصى مقاومة', 'Ω', 10, 100000, 1, true); break;
      case 'capacitor': h += this.field(c, 'val', 'السعة C', 'µF', 0.001, 100000, 1, true); break;
      case 'inductor': h += this.field(c, 'val', 'معامل الحث الذاتي L', 'H', 0.0001, 100, .01, true) + `<label class="toggle"><input type="checkbox" data-core ${c.core ? 'checked' : ''}> قلب من الحديد المطاوع (يضاعف L ×10)</label>`; break;
      case 'switch': h += `<button class="btn ${c.closed ? 'warn' : 'good'}" data-sw style="width:100%;margin-top:8px">${c.closed ? 'فتح المفتاح' : 'غلق المفتاح'}</button>`; break;
      case 'led': h += `<div class="prop-row"><label>اللون</label><select class="num" data-led>${Object.entries(LED_COL).map(([k, o]) => `<option value="${k}" ${k === c.color ? 'selected' : ''}>${o.name}</option>`).join('')}</select></div>`; break;
      case 'photodiode': h += this.field(c, 'light', 'شدة الضوء الساقط', '%', 0, 100, 1); break;
    }
    P.innerHTML = h;
    $$('input[type=range]', P).forEach(inp => inp.oninput = () => { const k = inp.dataset.k; let v = +inp.value; if (inp.dataset.log === '1') v = +Math.pow(10, v).toPrecision(3); c[k] = v; const o = $(`[data-o="${k}"]`, P); if (o) o.textContent = fmt(v, 4) + ' ' + o.textContent.split(' ').pop(); const n = $(`[data-n="${k}"]`, P); if (n) n.value = v; if (k === 'max') this.panel(); });
    $$('input[data-n]', P).forEach(inp => inp.onchange = () => { const v = +inp.value; if (isFinite(v)) { c[inp.dataset.n] = v; this.panel(); } });
    const lb = $('[data-lbl]', P); if (lb) lb.oninput = () => { c.label = lb.value.trim() || undefined; };
    const sw = $('[data-sw]', P); if (sw) sw.onclick = () => { c.closed = !c.closed; this.C.beSteps = 2; this.panel(); };
    const cr = $('[data-core]', P); if (cr) cr.onchange = () => { c.core = cr.checked; c.val = c.core ? c.val * 10 : c.val / 10; this.panel(); };
    const ld = $('[data-led]', P); if (ld) ld.onchange = () => { c.color = ld.value; };
    this.panelLive();
  },
  panelLive() {
    const C = this.C;
    if (this.tab === 'props' && this.sel) {
      const c = this.sel, r = C.reading(c); const box = $('#lReads'); if (!box) return;
      const items = [[r.rms ? 'فرق الجهد المؤثر' : 'فرق الجهد V', fmtSI(r.v, 'V')], [r.rms ? 'التيار المؤثر' : 'التيار I', fmtSI(r.i, 'A')], ['القدرة ' + (r.rms ? 'المتوسطة' : 'P'), fmtSI(c.pAvg || Math.abs(c.p), 'W')]];
      if (c.type === 'capacitor') items.push(['الشحنة Q = CV', fmtSI(c.val * 1e-6 * c.v, 'C')], ['الطاقة ½CV²', fmtSI(.5 * c.val * 1e-6 * c.v * c.v, 'J')]);
      if (c.type === 'inductor') items.push(['الطاقة ½LI²', fmtSI(.5 * c.val * c.i * c.i, 'J')]);
      if (C.hasAC && ['capacitor', 'inductor', 'resistor'].includes(c.type)) { const f = C.maxFreq(); const X = c.type === 'capacitor' ? 1 / (TAU * f * c.val * 1e-6) : c.type === 'inductor' ? TAU * f * c.val : c.val; items.push([c.type === 'resistor' ? 'المقاومة R' : c.type === 'inductor' ? 'رادة الحث XL' : 'رادة السعة XC', fmtSI(X, 'Ω')]); }
      if (c.type === 'battery') items.push(['القدرة المجهزة', fmtSI(-c.v * c.i, 'W')]);
      box.innerHTML = items.map(x => `<div class="read"><span>${x[0]}</span><b>${x[1]}</b></div>`).join('');
    }
    if (this.tab === 'kirch') {
      const box = $('#kirch'); if (!box) return;
      if (!C.running) { box.innerHTML = '<div class="empty">شغّل المحاكاة لعرض التحقق من قانوني كيرشوف</div>'; return; }
      const K = C.kirchhoff();
      const f = v => (v >= 0 ? '+' : '−') + fmtSI(Math.abs(v), '').trim();
      let h = `<div class="note"><b>قانون كيرشوف الأول (التيار):</b> المجموع الجبري للتيارات عند أي نقطة تفرّع = صفر ( ΣI = 0 ) — تعبير عن حفظ الشحنة.</div>`;
      h += K.kcl.length ? K.kcl.map((k, i) => `<div class="kirch-item"><b>نقطة التفرع ${i + 1}</b> <span class="tag">${k.terms.length} فروع</span><div class="eq">${k.terms.map(t => `${f(t[1])}A(${t[0]})`).join(' ')} = <span class="ok">${fmtSI(k.sum, 'A')}</span></div></div>`).join('') : '<div class="empty">لا توجد نقاط تفرّع (≥3 أفرع)</div>';
      h += `<div class="note" style="margin-top:14px"><b>قانون كيرشوف الثاني (الجهد):</b> المجموع الجبري لفروق الجهد حول أي مسار مغلق = صفر ( ΣΔV = 0 ) — تعبير عن حفظ الطاقة.</div>`;
      h += K.kvl.length ? K.kvl.map((k, i) => `<div class="kirch-item"><b>المسار المغلق ${i + 1}</b><div class="eq">${k.terms.map(t => `${f(t[1])}V(${t[0]})`).join(' ')} = <span class="ok">${fmtSI(k.sum, 'V')}</span></div></div>`).join('') : '<div class="empty">لا توجد مسارات مغلقة</div>';
      h += `<p style="font-size:12px;color:var(--ink3)">الإشارة الموجبة: التيار الخارج من النقطة / هبوط الجهد باتجاه الدوران. القيم الصغيرة جداً ناتجة عن الدقة العددية.</p>`;
      box.innerHTML = h;
    }
  },
  drawScope() {
    const cv = $('#lScope'); const c = this.sel; if (!cv || !c || !c.buf.length) return;
    const b = c.buf; const vs = b.map(r => [r[0], r[1]]); const is = b.map(r => [r[0], r[2]]);
    const mv = Math.max(1e-9, ...vs.map(p => Math.abs(p[1]))), mi = Math.max(1e-12, ...is.map(p => Math.abs(p[1])));
    Plot.draw(cv, [{ pts: vs.map(p => [p[0], p[1] / mv]), name: 'V (max ' + fmtSI(mv, 'V') + ')', color: '#1f5eff' }, { pts: is.map(p => [p[0], p[1] / mi]), name: 'I (max ' + fmtSI(mi, 'A') + ')', color: '#e11d48' }], { xl: 't (s)', ymin: -1.15, ymax: 1.15, y0zero: false, xmin: b[0][0], xmax: b[b.length - 1][0] });
  }
};
