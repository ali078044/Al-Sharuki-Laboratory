'use strict';
/* =====================================================================
   Grades layer: one lab for two grades (السادس العلمي + الأول المتوسط)
   - grade switcher in the top bar, per-grade home / catalog / laws / maps
   - catalog: grade → chapter → experiments, plus a global search
   - "اختبر نفسك" quizzes with stars, and «هل تعلم؟» facts
   ===================================================================== */
const GradeUI = {
  get g() { try { return localStorage.getItem('lab-grade') || 'g12'; } catch (e) { return 'g12'; } },
  set(g) { try { localStorage.setItem('lab-grade', g); } catch (e) { } this.apply(); Home.render(); Catalog.grade = g; Catalog.chap = 0; Catalog.render(); Laws.cat = -1; Laws.render(); if (App.view === 'maps') App.go('maps', gradeChs(g)[0].id); },
  apply() {
    const g = this.g; document.body.dataset.grade = g;
    $$('#gradeSw button').forEach(b => b.classList.toggle('on', b.dataset.g === g));
    const hide = g !== 'g12'; $$('.nav button[data-v="examples"],.nav button[data-v="lab"]').forEach(b => b.classList.toggle('hidden', hide));
    const G = GRADES.find(x => x.id === g); const f = $('footer.credit'); if (f) f.innerHTML = `مختبر الفيزياء التفاعلي — ${G.name} — تم تصميمه للأستاذ <b>علي محمد الشاروكي</b>`;
  },
  mount() {
    const bar = $('.topbar'); if (!bar || $('#gradeSw')) return;
    const d = el('div', { class: 'seg gsw', id: 'gradeSw', role: 'group', 'aria-label': 'اختيار الصف' });
    d.innerHTML = GRADES.map(g => `<button data-g="${g.id}" title="${g.d}"><span class="ge">${g.emo}</span><span class="gt">${g.name}</span></button>`).join('');
    bar.insertBefore(d, $('#soundBtn'));
    $$('button', d).forEach(b => b.onclick = () => { this.set(b.dataset.g); if (!['home', 'catalog', 'laws', 'maps'].includes(App.view)) App.go('home'); });
    this.apply();
  }
};
/* stars / progress (per experiment, best quiz score) */
const Stars = {
  all() { try { return JSON.parse(localStorage.getItem('lab-stars') || '{}'); } catch (e) { return {}; } },
  get(id) { return this.all()[id] || 0; },
  set(id, n) { const a = this.all(); if (n > (a[id] || 0)) { a[id] = n; try { localStorage.setItem('lab-stars', JSON.stringify(a)); } catch (e) { } } },
  html(n, max = 3) { return `<span class="stars">${Array.from({ length: max }, (_, i) => `<i class="${i < n ? 'on' : ''}">★</i>`).join('')}</span>`; }
};
const expsOfGrade = g => EXPS.filter(e => gradeOf(e) === g);

/* ---------------- Home ---------------- */
Home.render = function () {
  const g = GradeUI.g, G = GRADES.find(x => x.id === g); const list = expsOfGrade(g); const chs = gradeChs(g);
  const acts = list.filter(e => e.kind === 'نشاط').length; const laws = LAWS.filter(l => chs.some(c => c.id === l.cat) || (g === 'g12' && l.cat === 0)).length;
  const kid = KID(g); const starSum = list.reduce((s, e) => s + Stars.get(e.id), 0);
  $('#view-home').innerHTML = `<div class="wrap">
    <div class="gpick">${GRADES.map(x => `<button class="gcard ${x.id === g ? 'on' : ''}" data-g="${x.id}"><span class="gemo">${x.emo}</span><b>${x.name}</b><small>${expsOfGrade(x.id).length} تجربة ونشاط</small></button>`).join('')}</div>
    <div class="hero ${kid ? 'kid' : ''}">
      <div>
        <div class="credit-badge">تم تصميمه للأستاذ علي محمد الشاروكي</div>
        ${kid ? `<h2>مختبر العلوم <span>الممتع</span> 🔬<br>فيزياء ${G.name}</h2>
        <p>جرّب بنفسك كل أنشطة كتابك: اسحب، اسكب، سخّن، وزِن… وشاهد ما يحدث للجزيئات! أجب عن أسئلة «اختبر نفسك» واجمع النجوم ⭐</p>`
      : `<h2>مختبر الفيزياء <span>التفاعلي</span><br>للصف ${G.name}</h2>
        <p>جميع أنشطة وتجارب كتاب الفيزياء بتسلسل الكتاب نفسه، بمحاكاة تعتمد على المعادلات الفيزيائية الحقيقية: قراءات أجهزة حية، جداول قراءات، رسوم بيانية، ومحرك دوائر يحل قانوني كيرشوف في كل لحظة.</p>`}
        <div class="hero-cta">
          <button class="btn primary" onclick="App.go('catalog')">${ico('book')} ${kid ? 'ابدأ التجارب' : 'تجارب المنهج'}</button>
          ${g !== 'g12' ? '' : `<button class="btn" onclick="App.go('lab')">${ico('bolt')} المختبر الحر</button>`}
          <button class="btn" onclick="App.go('laws')">${ico('sigma')} القوانين</button>
        </div>
        <div class="stats">
          <div class="stat"><b>${list.length}</b><span>تجربة ونشاط</span></div>
          <div class="stat"><b>${acts}</b><span>نشاطاً من الكتاب</span></div>
          ${kid || g !== 'g12' ? `<div class="stat"><b>${starSum}</b><span>نجمة جمعتها ⭐</span></div>` : `<div class="stat"><b>${EXAMPLES.length}</b><span>مثالاً محلولاً</span></div>`}
          <div class="stat"><b>${chs.length}</b><span>فصول</span></div>
          <div class="stat"><b>${laws}</b><span>قانوناً</span></div>
        </div>
      </div>
      <div class="hero-art"><canvas id="heroCv"></canvas></div>
    </div>
    <div class="sec-title"><h3>فصول الكتاب — ${G.name}</h3><p>اختر فصلاً لعرض تجاربه بالترتيب</p></div>
    <div class="ch-grid">${chs.map(ch => { const L = EXPS.filter(e => e.ch === ch.id); const st = L.reduce((s, e) => s + Stars.get(e.id), 0); return `<div class="ch-card ${kid ? 'kid' : ''}" style="--c:${ch.c}" onclick="Catalog.grade='${g}';Catalog.chap=${ch.id};Catalog.render();App.go('catalog')">
      ${ch.emo ? `<div class="ch-emo">${ch.emo}</div>` : ''}<div class="ch-num">الفصل ${ch.num}</div><h4>${ch.name}</h4><p>${ch.d}</p><div class="cnt">${L.length} تجربة ونشاط${kid ? ` · ⭐ ${st}/${L.length * 3}` : ''}</div></div>`; }).join('')}</div>
    ${g !== 'g12' ? '' : `<div class="sec-title"><h3>أدوات المختبر</h3><p></p></div>
    <div class="feature-row">
      <div class="feature" onclick="App.go('lab')"><div class="fi">${ico('bolt')}</div><div><h4>المختبر الحر</h4><p>ابنِ أي دائرة: بطاريات، مصدر متناوب، مقاومات، متسعات، محاثات، ثنائيات، LED، أجهزة قياس، وراسم إشارة.</p></div></div>
      <div class="feature" onclick="App.go('examples')"><div class="fi">${ico('book')}</div><div><h4>أمثلة الكتاب المحلولة</h4><p>${EXAMPLES.length} مثالاً من الكتاب: اكشف الحل خطوة بخطوة ثم تحقق منه بالمحاكاة بالأرقام نفسها.</p></div></div>
      <div class="feature" onclick="App.go('maps','1')"><div class="fi">${ico('atom')}</div><div><h4>خرائط الفصول</h4><p>خريطة لكل فصل تربط تجاربه بقوانينه، انقر على أي عقدة لفتح التجربة.</p></div></div>
    </div>`}
  </div>`;
  $$('.gcard').forEach(b => b.onclick = () => GradeUI.set(b.dataset.g));
};

/* ---------------- Catalog: grade → chapter → experiments, global search ---------------- */
Object.assign(Catalog, {
  grade: null, chap: 0,
  render() {
    if (!this.grade) this.grade = GradeUI.g;
    const v = $('#view-catalog'); const chs = this.grade === 'all' ? [] : gradeChs(this.grade);
    v.innerHTML = `<div class="wrap"><div class="sec-title" style="margin-top:0"><h3>تجارب وأنشطة المنهج</h3><p>اختر الصف ثم الفصل، أو ابحث في كل التجارب</p></div>
      <div class="cat-bar">
        <div class="cat-row"><span class="cat-lbl">الصف</span><div class="chips">${[{ id: 'all', name: 'كل الصفوف', emo: '📚' }, ...GRADES].map(g => `<button class="chip g ${this.grade === g.id ? 'on' : ''}" data-g="${g.id}">${g.emo} ${g.name}</button>`).join('')}</div></div>
        ${chs.length ? `<div class="cat-row"><span class="cat-lbl">الفصل</span><div class="chips">${[{ id: 0, name: 'كل الفصول' }, ...chs].map(c => `<button class="chip ${this.chap === c.id ? 'on' : ''}" data-f="${c.id}" ${c.id ? `style="--c:${c.c}"` : ''}>${c.id ? (c.emo ? c.emo + ' ' : '') + 'ف' + c.num + ': ' + c.name : 'كل الفصول'}</button>`).join('')}</div></div>` : ''}
        <div class="cat-row"><span class="cat-lbl">${ico('search')}</span><input class="search" id="catQ" placeholder="ابحث في كل التجارب والصفوف… (كثافة، ضغط، رنين، يونك، تمدد)" value="${this.q}"></div>
      </div>
      <div id="catBody"></div></div>`;
    $('#catQ').oninput = e => { this.q = e.target.value; this.body(); };
    $$('.chip[data-g]', v).forEach(b => b.onclick = () => { this.grade = b.dataset.g; this.chap = 0; if (b.dataset.g !== 'all') GradeUI.set(b.dataset.g); else this.render(); });
    $$('.chip[data-f]', v).forEach(b => b.onclick = () => { this.chap = +b.dataset.f; this.render(); });
    this.body();
  },
  body() {
    const q = this.q.trim(); const norm = s => s.replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/[ًٌٍَُِّْ]/g, '');
    const nq = norm(q); const match = e => !q || norm(e.title + ' ' + e.desc + ' ' + (e.sec || '') + ' ' + (e.tags || '')).includes(nq);
    // with a query: search ALL grades
    const grades = q ? GRADES.map(g => g.id) : (this.grade === 'all' ? GRADES.map(g => g.id) : [this.grade]);
    let html = q ? `<div class="search-note">نتائج البحث عن «${q}» في جميع الصفوف</div>` : '';
    grades.forEach(g => {
      const G = GRADES.find(x => x.id === g);
      const part = gradeChs(g).filter(ch => q || !this.chap || ch.id === this.chap).map(ch => {
        const list = EXPS.filter(e => e.ch === ch.id && match(e)); if (!list.length) return '';
        return `<div class="cat-ch" style="--c:${ch.c}"><span class="dot"></span><h3>${ch.emo ? ch.emo + ' ' : ''}الفصل ${ch.num}: ${ch.name}</h3><small>${ch.en}</small></div>
        <div class="exp-list">${list.map(e => `<div class="exp-item ${KID(g) ? 'kid' : ''}" style="--c:${ch.c}" onclick="App.go('exp','${e.id}')"><div class="exp-idx">${ch.num}-${e.idx}</div><div><h5>${e.title}</h5><p><span class="tag ${e.kind === 'نشاط' ? 'act' : e.kind === 'تطبيق' ? 'app' : ''}">${e.kind}</span>${e.sec ? 'بند ' + e.sec : ''}${e.page ? ' · ص ' + e.page : ''}${KID(g) ? ' ' + Stars.html(Stars.get(e.id)) : ''}</p><p>${e.desc}</p></div></div>`).join('')}</div>`;
      }).join('');
      if (part) html += (grades.length > 1 ? `<div class="grade-h">${G.emo} ${G.name}</div>` : '') + part;
    });
    $('#catBody').innerHTML = html.replace(/^<div class="search-note">[^<]*<\/div>$/, '') || '<div class="empty">لا توجد نتائج</div>';
  }
});

/* ---------------- Laws & maps per grade ---------------- */
LAWCATS.forEach(c => { if (c.id) { const ch = chById(c.id); c.name = `الفصل ${ch.num}: ${ch.name}`; c.g = ch.g; } else c.g = 'g12'; });
Laws.render = function () {
  const g = GradeUI.g; const cats = LAWCATS.filter(c => c.g === g); const n = LAWS.filter(l => cats.some(c => c.id === l.cat)).length;
  const v = $('#view-laws');
  v.innerHTML = `<div class="wrap"><div class="sec-title" style="margin-top:0"><h3>مكتبة القوانين — ${GRADES.find(x => x.id === g).name}</h3><p>${n} قانوناً مع حاسبة فورية</p></div>
  <div class="cat-tools"><input class="search" id="lawQ" placeholder="ابحث عن قانون…"><div class="chips">${[{ id: -1 }, ...cats].map(c => `<button class="chip ${this.cat === c.id ? 'on' : ''}" data-c="${c.id}">${c.id === -1 ? 'الكل' : c.id === 0 ? 'أساسية' : 'ف' + chById(c.id).num}</button>`).join('')}</div></div><div id="lawBody"></div></div>`;
  $('#lawQ').value = this.q; $('#lawQ').oninput = e => { this.q = e.target.value; this.body(); };
  $$('.chip', v).forEach(b => b.onclick = () => { this.cat = +b.dataset.c; this.render(); });
  this.body();
};
(() => { const b0 = Laws.body; Laws.body = function () { const g = GradeUI.g; const keep = LAWCATS.slice(); LAWCATS.splice(0, LAWCATS.length, ...keep.filter(c => c.g === g)); try { b0.call(this); } finally { LAWCATS.splice(0, LAWCATS.length, ...keep); } }; })();
(() => { const r0 = Maps.render; Maps.render = function (ch) { const C = chById(ch); if (C.g !== GradeUI.g) { GradeUI.set(C.g); } const keep = CHAPTERS.slice(); CHAPTERS.splice(0, CHAPTERS.length, ...keep.filter(c => c.g === C.g)); try { r0.call(this, C.id); } finally { CHAPTERS.splice(0, CHAPTERS.length, ...keep); } $$('#view-maps .chip').forEach(b => { const m = /maps','(\d+)/.exec(b.getAttribute('onclick') || ''); if (m) b.textContent = 'ف' + chById(+m[1]).num; }); const t = $('#view-maps .mc1'); if (t) t.textContent = 'الفصل ' + C.num; }; })();

/* ---------------- runner additions: grade look, quiz, facts ---------------- */
(() => {
  const open0 = Runner.open;
  Runner.open = function (E, preset) {
    open0.call(this, E, preset);
    const g = gradeOf(E); document.body.dataset.expGrade = g; const ch = chById(E.ch);
    const meta = $('.exp-head .meta'); if (meta) meta.innerHTML = `${GRADES.find(x => x.id === g).name} · الفصل ${ch.num} · ${ch.name}${E.sec ? ' · بند ' + E.sec : ''}${E.page ? ' · ص ' + E.page : ''}${E.fig ? ' · الشكل (' + E.fig + ')' : ''}`;
    if (g !== GradeUI.g) { try { localStorage.setItem('lab-grade', g); } catch (e) { } GradeUI.apply(); Home.render(); Catalog.grade = g; Catalog.render(); }
  };
  const dp0 = Runner.dataPanel;
  Runner.dataPanel = function (E, S) {
    dp0.call(this, E, S);
    const p = $('#dataPanel'); if (!p) return;
    if (E.fact) { const f = el('div', { class: 'box fact-box' }); f.innerHTML = `<h5>💡 هل تعلم؟</h5><div class="fact">${[].concat(E.fact)[0]}</div>`; p.insertBefore(f, p.firstChild.nextSibling); let k = 0; const facts = [].concat(E.fact); if (facts.length > 1) { clearInterval(this._ft); this._ft = setInterval(() => { const d = $('.fact-box .fact'); if (!d) return clearInterval(this._ft); k = (k + 1) % facts.length; d.innerHTML = facts[k]; }, 12000); } }
    if (E.quiz && E.quiz.length) { const b = el('div', { class: 'box quiz-box' }); p.appendChild(b); Quiz.mount(b, E); }
  };
})();
const Quiz = {
  mount(box, E) {
    const Q = E.quiz; let i = 0, score = 0; const ans = [];
    const draw = () => {
      if (i >= Q.length) {
        const st = score === Q.length ? 3 : score >= Q.length - 1 ? 2 : score > 0 ? 1 : 0; Stars.set(E.id, st);
        box.innerHTML = `<h5>⭐ اختبر نفسك</h5><div class="qz-end">${Stars.html(st)}<p>أجبت عن <b>${score}</b> من <b>${Q.length}</b> إجابةً صحيحة${st === 3 ? ' — ممتاز! 🎉' : st === 2 ? ' — أحسنت 👏' : ' — حاول مرة أخرى 💪'}</p><button class="btn sm primary" data-r>أعد الاختبار</button></div>`;
        $('[data-r]', box).onclick = () => { i = 0; score = 0; draw(); }; if (st === 3 && window.Sound && Sound.beep) { Sound.beep(660, .12); setTimeout(() => Sound.beep(880, .18), 130); }
        return;
      }
      const q = Q[i];
      box.innerHTML = `<h5>⭐ اختبر نفسك <small>${i + 1}/${Q.length}</small></h5><div class="qz-q">${q.q}</div><div class="qz-o">${q.o.map((o, k) => `<button data-k="${k}">${o}</button>`).join('')}</div><div class="qz-why"></div>`;
      $$('.qz-o button', box).forEach(b => b.onclick = () => {
        const k = +b.dataset.k; const ok = k === q.a; if (ok) score++; ans.push(ok);
        $$('.qz-o button', box).forEach(x => { x.disabled = true; const kk = +x.dataset.k; x.classList.toggle('ok', kk === q.a); x.classList.toggle('bad', kk === k && !ok); });
        $('.qz-why', box).innerHTML = `<b>${ok ? '✔ صحيح!' : '✘ ليس تماماً.'}</b> ${q.why || ''}<br><button class="btn sm primary">${i + 1 < Q.length ? 'السؤال التالي' : 'النتيجة'}</button>`;
        if (window.Sound) ok ? (Sound.beep && Sound.beep(740, .1)) : (Sound.beep && Sound.beep(200, .15, 'square', .03));
        $('.qz-why button', box).onclick = () => { i++; draw(); };
      });
    };
    draw();
  }
};
/* ---- boot: mount the grade switcher and re-render per grade ---- */
(() => { const init0 = App.init; App.init = function () { init0.call(this); GradeUI.mount(); Catalog.grade = GradeUI.g; Home.render(); Catalog.render(); Laws.render(); }; })();
