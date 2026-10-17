'use strict';
/* =====================================================================
   Reader: the textbook and the teacher's summary inside the lab
   - #read/<grade>          grade → chapter → lesson → topics (side index)
   - book / summary switch, 🔬 chips open the matching experiment
   - "ارجع إلى الدرس" brings you back to the exact spot; last spot is saved
   - split screen: reader + experiment side by side, draggable divider
   - summary pages are images with a watermark; copy / right-click / print blocked
   Page images live in rdata_<g>.js (RD.<g>.book / RD.<g>.sum).
   ===================================================================== */
var RD = window.RD || (window.RD = {});
const READ = {
  g7: { ch: 11, lessons: [
    { t: 'مقدمة الفصل', p: 5, sp: 1, topics: [{ t: 'نشاط استهلالي: حركة الجزيئات', p: 6, sp: 1 }] },
    { t: 'الدرس الأول: حالات المادة وخواصها', p: 7, sp: 1, topics: [{ t: 'التغير الفيزيائي والكيميائي', p: 8, sp: 1 }, { t: 'حالات المادة: صلب، سائل، غاز، بلازما', p: 9, sp: 3 }, { t: 'مراجعة الدرس', p: 11, sp: 6 }] },
    { t: 'الدرس الثاني: قياس حجم المادة', p: 12, sp: 8, topics: [{ t: 'حجم الأجسام المنتظمة', p: 13, sp: 8 }, { t: 'حجم الجسم غير المنتظم', p: 14, sp: 9 }, { t: 'حجم السائل والأواني المدرجة', p: 15, sp: 9 }, { t: 'حجم الغاز', p: 16, sp: 10 }, { t: 'مراجعة الدرس', p: 17, sp: 11 }] },
    { t: 'الدرس الثالث: كتلة المادة وكثافتها', p: 18, sp: 13, topics: [{ t: 'قياس كثافة الأجسام', p: 19, sp: 13 }, { t: 'كثافة السائل', p: 21, sp: 14 }, { t: 'هل التاج من الذهب الخالص؟', p: 22, sp: 16 }, { t: 'مراجعة الدرس', p: 23, sp: 17 }, { t: 'تطبيقات الفيزياء في الحياة', p: 24 }] },
    { t: 'مراجعة الفصل', p: 25, sp: 19, topics: [] }
  ] },
  g8: { ch: 21, lessons: [
    { t: 'مقدمة الفصل', p: 5, sp: 1, topics: [] },
    { t: 'الدرس الأول: القياس', p: 6, sp: 1, topics: [{ t: 'الكميات والوحدات وأدوات القياس', p: 7, sp: 2 }, { t: 'البادئات وتحويل الوحدات', p: 10, sp: 3 }, { t: 'مراجعة الدرس', p: 10, sp: 5 }] },
    { t: 'الدرس الثاني: الحركة وأنواعها', p: 11, sp: 7, topics: [{ t: 'الحركة والسكون ونقطة الإسناد', p: 11, sp: 7 }, { t: 'أنواع الحركة', p: 12, sp: 7 }, { t: 'مراجعة الدرس', p: 13, sp: 9 }] },
    { t: 'الدرس الثالث: وصف الحركة', p: 14, sp: 11, topics: [{ t: 'المسافة والإزاحة', p: 14, sp: 11 }, { t: 'الانطلاق ومعدل الانطلاق', p: 15, sp: 13 }, { t: 'السرعة والتعجيل', p: 18, sp: 13 }, { t: 'مراجعة الدرس', p: 19, sp: 15 }, { t: 'الفيزياء والمجتمع', p: 20, sp: 16 }] },
    { t: 'مراجعة الفصل', p: 21, sp: 17, topics: [] }
  ] },
  g9: { ch: 31, lessons: [
    { t: 'مقدمة الفصل ومفرداته', p: 5, sp: 1, topics: [] },
    { t: '1-1 الكهربائية الساكنة', p: 7, sp: 3, topics: [] },
    { t: '2-1 الشحنة الكهربائية', p: 10, sp: 4, topics: [{ t: 'نشاط التجاذب والتنافر', p: 11, sp: 5 }] },
    { t: '3-1 شحن المادة بالكهربائية', p: 13, sp: 6, topics: [{ t: 'الدلك', p: 13, sp: 6 }, { t: 'التماس', p: 14, sp: 6 }, { t: 'الحث', p: 14, sp: 7 }] },
    { t: '4-1 الكشاف الكهربائي', p: 15, sp: 8, topics: [] },
    { t: '5-1 شحن الكشاف الكهربائي', p: 16, sp: 8, topics: [] },
    { t: '6-1 تطبيقات عملية', p: 18, sp: 11, topics: [] },
    { t: '7-1 التوصيل الكهربائي', p: 19, sp: 11, topics: [] },
    { t: '8-1 قانون كولوم', p: 20, sp: 12, topics: [{ t: 'مثال 1', p: 21, sp: 13 }, { t: 'سؤال وزاري', p: 21, sp: 15 }, { t: 'س1 و س2 ص30', p: 30, sp: 16 }] },
    { t: '9-1 المجال الكهربائي', p: 22, sp: 18, topics: [{ t: 'مثال 2', p: 24, sp: 18 }, { t: 'خطوط المجال', p: 23, sp: 20 }] },
    { t: 'أسئلة الفصل', p: 25, sp: 22, topics: [] },
    { t: 'مسائل الفصل', p: 30, sp: 26, topics: [] }
  ] }
};

/* 🔬 buttons placed inside the page at the line where the activity / part is mentioned:
   page: [[y (0–1 of page height), experiment id, part id?], …] */
const ANCH = {
  g7: { book: { 6: [[.2, 'g7_particles']], 7: [[.12, 'g7_states', '', 'mode=model']], 8: [[.1, 'g7_changes', '', 'mode=candle'], [.3, 'g7_changes', '', 'mode=gallery']],
    9: [[.24, 'g7_states', '', 'mode=model&st=cry'], [.69, 'g7_states', '', 'mode=model&st=amo']], 10: [[.12, 'g7_states', '', 'mode=model&st=liq'], [.38, 'g7_states', '', 'mode=tension'], [.61, 'g7_states', '', 'mode=visc']],
    11: [[.06, 'g7_states', '', 'mode=model&st=gas']], 12: [[.6, 'g7_vol_regular']], 13: [[.08, 'g7_vol_regular', '', 'shape=cube'], [.66, 'g7_vol_regular', '', 'shape=box']],
    14: [[.08, 'g7_vol_irregular'], [.4, 'g7_vol_irregular', '', 'cap=500']], 15: [[.47, 'g7_liquid_vol', '', 'mode=pour'], [.63, 'g7_liquid_vol', '', 'mode=crate']], 16: [[.07, 'g7_gas_vol', '', 'mode=piston'], [.18, 'g7_gas_vol', '', 'mode=diver']],
    18: [[.47, 'g7_density', '', 'bal=dig'], [.51, 'g7_density', '', 'bal=two']], 19: [[.1, 'g7_density']], 20: [[.05, 'g7_density'], [.58, 'g7_density']],
    21: [[.06, 'g7_density_liquid', '', 'mode=measure'], [.55, 'g7_density_liquid', '', 'mode=column'], [.72, 'g7_gold', '', 'crown=0']],
    22: [[.12, 'g7_density_liquid', '', 'mode=hydro'], [.32, 'g7_density_liquid', '', 'mode=column'], [.44, 'g7_gold', '', 'crown=0']] },
    sum: { 1: [[.19, 'g7_states', '', 'mode=model'], [.45, 'g7_states', '', 'mode=model'], [.63, 'g7_changes', '', 'mode=gallery']], 2: [[.09, 'g7_changes', '', 'mode=gallery'], [.31, 'g7_changes', '', 'mode=candle']],
    3: [[.32, 'g7_states', '', 'mode=model&st=cry'], [.75, 'g7_states', '', 'mode=model&st=amo']], 4: [[.27, 'g7_states', '', 'mode=model&st=liq'], [.57, 'g7_states', '', 'mode=tension'], [.69, 'g7_states', '', 'mode=visc']],
    5: [[.09, 'g7_states', '', 'mode=tension'], [.15, 'g7_states', '', 'mode=visc'], [.34, 'g7_states', '', 'mode=model&st=gas']], 6: [[.69, 'g7_changes', '', 'mode=sort']],
    8: [[.24, 'g7_vol_regular'], [.46, 'g7_vol_regular', '', 'shape=cube'], [.71, 'g7_vol_regular', '', 'shape=box']], 9: [[.09, 'g7_vol_irregular', '', 'cap=500'], [.73, 'g7_liquid_vol', '', 'mode=pour']],
    10: [[.09, 'g7_gas_vol', '', 'mode=piston'], [.17, 'g7_gas_vol', '', 'mode=diver']], 13: [[.13, 'g7_density'], [.24, 'g7_density', '', 'bal=dig'], [.28, 'g7_density', '', 'bal=two'], [.6, 'g7_density']],
    14: [[.6, 'g7_density_liquid', '', 'mode=hydro']], 15: [[.11, 'g7_density_liquid', '', 'mode=column'], [.23, 'g7_density_liquid', '', 'mode=measure'], [.41, 'g7_gold', '', 'crown=0']],
    16: [[.09, 'g7_density_liquid', '', 'mode=column'], [.24, 'g7_gold', '', 'crown=0']] } },
  g8: { book: { 6: [[.14, 'g8_speedx', 'g8_speed_intro']], 7: [[.08, 'g8_measure', 'g8_quantities'], [.6, 'g8_measure', 'g8_accuracy']], 8: [[.08, 'g8_measure', 'g8_quantities', 'mode=sort']],
    9: [[.04, 'g8_measure', 'g8_tools', 'mode=gal'], [.64, 'g8_measure', 'g8_tools', 'mode=act&sc=pencil']], 10: [[.18, 'g8_measure', 'g8_prefixes'], [.25, 'g8_measure', 'g8_prefixes', 'ex=ex1'], [.39, 'g8_measure', 'g8_prefixes', 'ex=ex2']],
    11: [[.12, 'g8_motion', 'g8_reference', 'sc=class']], 12: [[.05, 'g8_motion', 'g8_path', 'sc=drop'], [.3, 'g8_kinds', 'g8_k_line'], [.34, 'g8_kinds', 'g8_k_curve'], [.38, 'g8_kinds', 'g8_k_closed']],
    13: [[.07, 'g8_kinds', 'g8_pendulum']], 14: [[.1, 'g8_displace', 'g8_distance', 'sc=lab']], 15: [[.4, 'g8_speedx', 'g8_avgspeed', 'sc=trip']],
    16: [[.07, 'g8_displace', 'g8_distance', 'sc=quad'], [.3, 'g8_displace', 'g8_vecdraw', 'task=ex3']], 17: [[.08, 'g8_displace', 'g8_resultant', 'sc=r1'], [.42, 'g8_displace', 'g8_resultant', 'sc=r2'], [.65, 'g8_displace', 'g8_resultant', 'sc=e4a']],
    18: [[.08, 'g8_velacc', 'g8_uniform', 'mode=uni'], [.5, 'g8_compare', 'g8_cmp_live'], [.82, 'g8_velacc', 'g8_accel', 'mode=acc']], 19: [[.08, 'g8_velacc', 'g8_accel', 'mode=dec']] },
    sum: { 1: [[.21, 'g8_measure', 'g8_quantities'], [.61, 'g8_measure', 'g8_accuracy']], 2: [[.09, 'g8_measure', 'g8_quantities', 'mode=sort'], [.8, 'g8_measure', 'g8_tools', 'mode=gal']],
    3: [[.09, 'g8_measure', 'g8_tools', 'mode=gal'], [.27, 'g8_measure', 'g8_prefixes']], 4: [[.09, 'g8_measure', 'g8_prefixes', 'ex=ex1']],
    7: [[.11, 'g8_motion', 'g8_reference', 'sc=class'], [.45, 'g8_motion', 'g8_path'], [.54, 'g8_kinds', 'g8_k_line']], 8: [[.12, 'g8_kinds', 'g8_pendulum'], [.18, 'g8_kinds', 'g8_k_sort']],
    11: [[.16, 'g8_displace', 'g8_distance', 'sc=lab'], [.32, 'g8_displace', 'g8_vecdraw']], 12: [[.09, 'g8_displace', 'g8_vecdraw', 'task=q'], [.4, 'g8_displace', 'g8_resultant', 'sc=r1']],
    13: [[.09, 'g8_speedx', 'g8_avgspeed'], [.62, 'g8_velacc', 'g8_uniform', 'mode=uni']], 14: [[.09, 'g8_velacc', 'g8_uniform', 'mode=non'], [.23, 'g8_velacc', 'g8_accel', 'mode=acc']] } },
  g9: { book: { 7: [[.52, 'g9_static_life', 'g9_life_obs'], [.75, 'g9_static_life', 'g9_life_balloons']], 8: [[.73, 'g9_static_life', 'g9_life_travolta']],
    10: [[.19, 'g9_charge', 'g9_ch_atom'], [.44, 'g9_static_life', 'g9_life_lightning']], 11: [[.25, 'g9_charge', 'g9_ch_quant'], [.55, 'g9_charge', 'g9_ch_rods']], 12: [[.2, 'g9_charge', 'g9_ch_rods'], [.54, 'g9_charge', 'g9_ch_rods']],
    13: [[.12, 'g9_charging', 'g9_chg_rub'], [.55, 'g9_charging', 'g9_chg_contact']], 14: [[.25, 'g9_charging', 'g9_chg_induct']], 15: [[.25, 'g9_electroscope', 'g9_es_parts']],
    16: [[.2, 'g9_electroscope', 'g9_es_contact'], [.7, 'g9_electroscope', 'g9_es_induct']], 18: [[.08, 'g9_electroscope', 'g9_es_compare'], [.5, 'g9_apps', 'g9_app_spray']],
    19: [[.1, 'g9_apps', 'g9_app_more'], [.4, 'g9_apps', 'g9_app_cond']], 20: [[.05, 'g9_apps', 'g9_app_copper'], [.4, 'g9_coulomb', 'g9_cl_lab']], 21: [[.23, 'g9_coulomb', 'g9_cl_lab']],
    22: [[.6, 'g9_field', 'g9_f_test']], 23: [[.5, 'g9_field', 'g9_f_two']], 24: [[.1, 'g9_field', 'g9_f_plates'], [.48, 'g9_field', 'g9_f_plates']],
    26: [[.3, 'g9_coulomb', 'g9_cl_inv']], 28: [[.2, 'g9_apps', 'g9_app_truck'], [.5, 'g9_charging', 'g9_chg_q5']], 29: [[.4, 'g9_field', 'g9_f_q7']], 30: [[.12, 'g9_coulomb', 'g9_cl_lab']] },
    sum: { 3: [[.15, 'g9_static_life', 'g9_life_obs'], [.3, 'g9_static_life', 'g9_life_balloons']], 4: [[.17, 'g9_charge', 'g9_ch_atom'], [.8, 'g9_charge', 'g9_ch_quant']], 5: [[.1, 'g9_charge', 'g9_ch_rods']], 6: [[.22, 'g9_charging', 'g9_chg_rub'], [.67, 'g9_charging', 'g9_chg_contact']], 7: [[.09, 'g9_charging', 'g9_chg_induct']], 8: [[.09, 'g9_electroscope', 'g9_es_parts'], [.62, 'g9_electroscope', 'g9_es_contact']], 9: [[.13, 'g9_electroscope', 'g9_es_induct']], 11: [[.31, 'g9_apps', 'g9_app_spray'], [.65, 'g9_apps', 'g9_app_cond'], [.73, 'g9_apps', 'g9_app_copper']], 12: [[.09, 'g9_coulomb', 'g9_cl_lab']], 13: [[.14, 'g9_coulomb', 'g9_cl_lab']], 15: [[.1, 'g9_coulomb', 'g9_cl_lab']], 16: [[.1, 'g9_coulomb', 'g9_cl_lab']], 17: [[.1, 'g9_coulomb', 'g9_cl_lab']], 18: [[.09, 'g9_field', 'g9_f_test'], [.5, 'g9_field', 'g9_f_plates']], 19: [[.11, 'g9_field', 'g9_f_plates']], 20: [[.13, 'g9_field', 'g9_f_two'], [.54, 'g9_field', 'g9_f_plates']], 21: [[.1, 'g9_charge', 'g9_ch_quant']], 24: [[.1, 'g9_electroscope', 'g9_es_contact']], 25: [[.25, 'g9_electroscope', 'g9_es_induct']], 26: [[.1, 'g9_coulomb', 'g9_cl_inv']] } }
};
const partName = (eid, pid) => { const E = EXPS.find(x => x.id === eid); if (!E) return ''; if (!pid) return E.title; const c = (E.controls || []).find(c => c.k === 'part'); const o = c && c.opts.find(o => o[0] === pid); return o ? o[1].replace(/^\d+\)\s*/, '') : E.title; };
// label of the pin = the option it opens (last k=v), looked up in the exp controls or the part's own controls
const optName = (eid, pid, o) => { if (!o) return ''; const E = EXPS.find(x => x.id === eid); if (!E) return ''; const P = pid && window.M8 && M8.P && M8.P[pid];
  const cs = (P && (P.controls || (P.D && P.D.controls))) || E.controls || []; const [k, v] = o.split('&').pop().split('='); const c = cs.find(c => c.k === k); const q = c && (c.opts || []).find(q => String(q[0]) === v);
  return q ? String(q[1]).replace(/^\d+\)\s*/, '') : ''; };
const Reader = {
  g: null, src: 'book', z: 1, ret: null, split: false, sp: { r: .5, dir: 'row', swap: false },
  ls(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem(k) || 'null'); localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } },
  has(g) { return !!(READ[g] && RD[g]); },
  data() { return RD[this.g][this.src]; },
  init() {
    const n = $('.nav'); if (n && !$('.nav button[data-v="read"]')) {
      const b = el('button', { 'data-v': 'read' }); b.innerHTML = `<svg class="i" viewBox="0 0 24 24"><path d="M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2z"/><path d="M22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z"/></svg><span>الكتاب والملخص</span>`;
      n.insertBefore(b, n.children[1]);
    }
    if (!$('#view-read')) { const s = el('section', { class: 'view', id: 'view-read' }); $('main').insertBefore(s, $('main').firstChild); }
    const bar = el('div', { id: 'splitBar', role: 'separator', tabindex: '0', title: 'اسحب لتغيير حجم القسمين' });
    bar.innerHTML = `<span class="grip"></span><div class="sb-tools">
      <button data-a="swap" title="تبديل الجهتين">⇄</button><button data-a="dir" title="أفقي / عمودي">⇅</button>
      <button data-a="30">30</button><button data-a="50">50</button><button data-a="70">70</button><button data-a="close" title="إنهاء التقسيم">✕</button></div>`;
    $('main').appendChild(bar);
    const ph = el('div', { id: 'splitPh' }); ph.innerHTML = `<div><b>🔬</b><p>اضغط زر «افتح في المختبر» عند أي معلومة<br>فتظهر تجربتها هنا بجانب الدرس</p></div>`; $('main').appendChild(ph);
    const back = el('button', { id: 'readBack', class: 'btn primary' }); back.innerHTML = '📖 ارجع إلى الدرس'; back.onclick = () => this.goBack(); document.body.appendChild(back);
    const sp = this.ls('lab-split'); if (sp) Object.assign(this.sp, sp); this.split = !!this.ls('lab-split-on');
    this.ret = this.ls('lab-read-ret');
    this.bindSplit(bar); this.applySplit();
    // keep the reading spot when the reader pane changes width (split, divider, rotate)
    let wd = this.dir(); window.addEventListener('resize', () => { if (this.dir() !== wd) { wd = this.dir(); this.applySplit(); } });
    let w0 = 0; if (window.ResizeObserver) new ResizeObserver(() => { const sc = $('#rScroll'); if (!sc) return; const w = sc.clientWidth; if (w && w0 && w !== w0 && this._pos) this.jump(this._pos.page, this._pos.frac); w0 = w; }).observe($('#view-read'));
    // copy protection inside the reader
    const v = $('#view-read');
    ['contextmenu', 'dragstart', 'selectstart', 'copy', 'cut'].forEach(ev => v.addEventListener(ev, e => e.preventDefault()));
    document.addEventListener('keydown', e => { if (App.view !== 'read' && !document.body.classList.contains('splitting')) return; const k = (e.key || '').toLowerCase(); if ((e.ctrlKey || e.metaKey) && ['c', 'p', 's', 'a', 'u'].includes(k)) { e.preventDefault(); this.toast('🔒 الملخص محمي من النسخ والطباعة'); } if (k === 'printscreen') { this.toast('🔒 المحتوى محمي'); } });
    window.addEventListener('beforeprint', () => document.body.classList.add('noprint'));
    window.addEventListener('afterprint', () => document.body.classList.remove('noprint'));
  },
  toast(msg, act) {
    let t = $('#rToast'); if (!t) { t = el('div', { id: 'rToast' }); document.body.appendChild(t); }
    t.innerHTML = `<span>${msg}</span>${act ? `<button>${act[0]}</button>` : ''}`; if (act) $('button', t).onclick = () => { act[1](); t.classList.remove('on'); };
    t.classList.add('on'); clearTimeout(this._tt); this._tt = setTimeout(() => t.classList.remove('on'), act ? 7000 : 2500);
  },
  /* ---------- library (no grade chosen) ---------- */
  renderLib() {
    const last = this.ls('lab-read-pos');
    $('#view-read').innerHTML = `<div class="wrap rlib"><div class="sec-title"><h3>📖 الكتاب والملخص</h3><p>اقرأ الدرس، وعند كل نشاط اضغط «افتح في المختبر»، ثم ارجع إلى المكان نفسه</p></div>
      ${last && this.has(last.g) ? `<button class="rcont" onclick="App.go('read','${last.g}')">↩ أكمل من حيث توقفت: <b>${GRADES.find(x => x.id === last.g).name}</b> · ${last.src === 'sum' ? 'الملخص' : 'الكتاب'} ص ${last.page}</button>` : ''}
      <div class="rgrid">${GRADES.map(G => { const ok = this.has(G.id); const ch = ok ? chById(READ[G.id].ch) : null; return `<div class="rcard ${ok ? '' : 'off'}" ${ok ? `onclick="App.go('read','${G.id}')"` : ''}>
        <span class="gemo">${G.emo}</span><b>${G.name}</b>${ok ? `<small>الفصل ${ch.num}: ${ch.name}</small><div class="rtags"><i>📕 الكتاب</i>${RD[G.id].sum ? '<i>📝 الملخص</i>' : ''}</div>` : '<small>قريباً</small>'}</div>`; }).join('')}</div></div>`;
  },
  /* ---------- reader for one grade ---------- */
  open(g) {
    if (!this.has(g)) { this.g = null; this.renderLib(); return; }
    if (g !== GradeUI.g) { try { localStorage.setItem('lab-grade', g); } catch (e) { } GradeUI.apply(); Home.render(); }
    const fresh = this.g !== g; this.g = g;
    const last = this.ls('lab-read-pos-' + g);
    if (fresh) this.src = (last && last.src) || (RD[g].sum ? 'sum' : 'book');
    if (!RD[g][this.src]) this.src = 'book';
    this.render();
    const pend = this._pending; this._pending = null;
    if (pend) this.jump(pend.page, pend.frac);
    else if (fresh && last && last.src === this.src && last.page > this.data().first) { this.jump(last.page, last.frac); this.toast(`↩ أكملت من حيث توقفت (ص ${last.page})`, ['ابدأ من البداية', () => this.jump(this.data().first, 0)]); }
  },
  render() {
    const g = this.g, R = READ[g], D = this.data(), ch = chById(R.ch), G = GRADES.find(x => x.id === g);
    const cur = this.ls('lab-read-pos-' + g);
    $('#view-read').innerHTML = `<div class="rd ${this.src}">
      <aside class="rtoc"><div class="rtoc-h"><button class="rlib-b" onclick="App.go('read','')">‹ الصفوف</button><b>${G.emo} ${G.name}</b><small>الفصل ${ch.num}: ${ch.name}</small></div>
        <div class="rtoc-l">${R.lessons.map((L, i) => `<div class="rles"><button class="rl" data-p="${L.p}" data-sp="${L.sp || ''}">${L.t}</button>
          ${L.topics.length ? `<div class="rtop">${L.topics.map(T => `<button data-p="${T.p}" data-sp="${T.sp || ''}">${T.t}</button>`).join('')}</div>` : ''}</div>`).join('')}
          <div class="rexps"><b>🔬 تجارب الفصل في المختبر</b>${EXPS.filter(e => e.ch === R.ch).map(e => `<button data-x="${e.id}">${e.title}</button>`).join('')}</div></div></aside>
      <div class="rmain"><div class="rbar">
        <button class="rtoc-t" title="الفهرس">☰</button>
        <div class="seg rsrc"><button data-s="book" class="${this.src === 'book' ? 'on' : ''}">📕 الكتاب</button><button data-s="sum" class="${this.src === 'sum' ? 'on' : ''}" ${RD[g].sum ? '' : 'disabled title="الملخص لم يُضَف بعد"'}>📝 الملخص</button></div>
        <span class="rpg">ص <b id="rPg">${D.first}</b></span>
        <div class="seg"><button data-z="-">−</button><button data-z="0">ملء</button><button data-z="+">+</button></div>
        <button class="btn rsplit ${this.split ? 'on' : ''}" title="الدرس والتجربة جنباً إلى جنب">◫ تقسيم الشاشة</button>
      </div><div class="rscroll" id="rScroll"><div class="rpages" style="--rz:${this.z}">${D.pages.map((_, i) => this.pageHtml(i)).join('')}</div></div></div></div>`;
    const v = $('#view-read');
    $$('.rtoc button[data-p]', v).forEach(b => b.onclick = () => { const sp = +b.dataset.sp; if (this.src === 'sum' && sp) this.jump(sp, 0); else if (this.src === 'sum') this.jump(this.bookToSum(+b.dataset.p), 0); else this.jump(+b.dataset.p, 0); v.querySelector('.rd').classList.remove('toc'); });
    $$('.rtoc button[data-x]', v).forEach(b => b.onclick = () => this.openExp(b.dataset.x));
    $$('.rsrc button', v).forEach(b => b.onclick = () => this.setSrc(b.dataset.s));
    $$('[data-z]', v).forEach(b => b.onclick = () => this.zoom(b.dataset.z));
    $('.rtoc-t', v).onclick = () => v.querySelector('.rd').classList.toggle('toc');
    $('.rsplit', v).onclick = () => this.setSplit(!this.split);
    $$('.rpin', v).forEach(b => b.onclick = () => this.openExp(b.dataset.x, b.dataset.pt, b.dataset.o));
    const sc = $('#rScroll'); sc.onscroll = () => { clearTimeout(this._st); this._st = setTimeout(() => this.save(), 150); this.lazy(); };
    sc.addEventListener('wheel', e => { if (e.ctrlKey) { e.preventDefault(); this.zoom(e.deltaY < 0 ? '+' : '-'); } }, { passive: false });
    this.lazy();
  },
  pageHtml(i) {
    const D = this.data(), p = D.first + i, A = ((ANCH[this.g] || {})[this.src] || {})[p] || [];
    const pins = A.filter(a => EXPS.find(e => e.id === a[1])).map(a => { const n = optName(a[1], a[2], a[3]) || partName(a[1], a[2]); return `<button class="rpin" style="top:${(a[0] * 100).toFixed(1)}%" data-x="${a[1]}" data-pt="${a[2] || ''}" data-o="${a[3] || ''}" title="افتح في المختبر: ${n}"><b>🔬</b><span>${n}</span></button>`; }).join('');
    return `<div class="rpage" data-p="${p}" style="--ar:${D.ar}"><div class="rimg"><img alt="" draggable="false" data-i="${i}"><div class="rshield"></div>${pins}<span class="rnum">${p}</span></div></div>`;
  },
  lazy() {
    const sc = $('#rScroll'); if (!sc) return; const top = sc.scrollTop - 1800, bot = sc.scrollTop + sc.clientHeight + 2400, D = this.data();
    $$('.rpage', sc).forEach(pg => { const img = pg.querySelector('img'); const y = pg.offsetTop; if (y + pg.offsetHeight > top && y < bot) { if (!img.src) img.src = 'data:image/webp;base64,' + D.pages[+img.dataset.i]; } });
    const c = this.where(); if (c) { const n = $('#rPg'); if (n) n.textContent = c.page; this.markToc(c.page); }
  },
  where() {
    const sc = $('#rScroll'); if (!sc) return null; const pgs = $$('.rpage', sc); const y = sc.scrollTop + 30;
    let cur = pgs[0]; for (const pg of pgs) { if (pg.offsetTop <= y) cur = pg; else break; }
    if (!cur) return null; return { page: +cur.dataset.p, frac: clamp((y - cur.offsetTop) / cur.offsetHeight, 0, 1) };
  },
  markToc(p) {
    const key = this.src === 'sum' ? 'sp' : 'p'; let best = null;
    $$('.rtoc button[data-p]').forEach(b => { const v = +b.dataset[key] || (key === 'sp' ? 0 : +b.dataset.p); if (v && v <= p && (!best || v >= best.v)) best = { b, v }; b.classList.remove('on'); });
    if (best) best.b.classList.add('on');
  },
  save() { const c = this.where(); if (!c || !this.g) return; this._pos = c; const o = { g: this.g, src: this.src, page: c.page, frac: +c.frac.toFixed(3), t: Date.now() }; this.ls('lab-read-pos-' + this.g, o); this.ls('lab-read-pos', o); },
  jump(page, frac) {
    const sc = $('#rScroll'); if (!sc) return; const pg = sc.querySelector(`.rpage[data-p="${page}"]`); if (!pg) return;
    sc.scrollTop = pg.offsetTop + (frac || 0) * pg.offsetHeight - (frac ? 30 : 6); this.lazy(); this.save();
  },
  bookToSum(p) { const L = READ[this.g].lessons.filter(l => l.p <= p && l.sp).pop(); return L ? L.sp : 1; },
  sumToBook(sp) { const L = READ[this.g].lessons.filter(l => l.sp && l.sp <= sp).pop(); return L ? L.p : RD[this.g].book.first; },
  setSrc(s) {
    if (s === this.src || !RD[this.g][s]) return; const c = this.where(); const lastS = this.ls(`lab-read-${this.g}-${s}`);
    if (c) this.ls(`lab-read-${this.g}-${this.src}`, c);
    const target = c ? (s === 'sum' ? this.bookToSum(c.page) : this.sumToBook(c.page)) : null;
    this.src = s; this.render(); this.jump(target || (lastS && lastS.page) || this.data().first, 0);
  },
  zoom(d) {
    const c = this.where(); this.z = d === '0' ? 1 : clamp(+(this.z + (d === '+' ? .15 : -.15)).toFixed(2), .5, 2.2);
    const r = $('.rpages'); if (r) r.style.setProperty('--rz', this.z); if (c) this.jump(c.page, c.frac);
  },
  /* ---------- go to the lab and come back ---------- */
  openExp(id, part, o) {
    this._opt = o || ''; this.save(); const c = this.where();
    this.ret = { g: this.g, src: this.src, page: c ? c.page : 1, frac: c ? c.frac : 0, x: id }; this.ls('lab-read-ret', this.ret);
    App.go('exp', id + (part ? '?part=' + part : ''));
    setTimeout(() => { if (this._opt) { const o = this._opt; this._opt = ''; this.applyOpt(o); } }, 60);
  },
  // open a pin straight on its tool / option: set each k=v through the control so the UI and the scene follow
  applyOpt(o) {
    const S = Runner.S; if (!S || !S.E) return;
    o.split('&').forEach(kv => { const [k, raw] = kv.split('='); const c = (S.E.controls || []).find(x => x.k === k); if (!c) return;
      const op = (c.opts || []).find(q => String(q[0]) === raw), v = op ? op[0] : (isNaN(raw) ? raw : +raw);
      S.p[k] = v; fanout(c, v, null); if (c.on) c.on(v, S); });
  },
  goBack() { const r = this.ret; if (!r) return App.go('read', ''); this.src = r.src; this._pending = { page: r.page, frac: r.frac }; if (this.g === r.g && App.view === 'read') { this.open(r.g); } else { this.g = r.g; App.go('read', r.g); } },
  /* ---------- split screen ---------- */
  dir() { return window.innerWidth < 820 ? 'col' : this.sp.dir; },
  setSplit(on) {
    this.split = on; this.ls('lab-split-on', on); const b = $('.rsplit'); if (b) b.classList.toggle('on', on);
    this.applySplit();
  },
  applySplit() {
    const v = App.view, on = this.split && !!this.g && (v === 'read' || v === 'exp');
    const B = document.body, keep = this._pos && $('#rScroll') ? this._pos : null; B.classList.toggle('splitting', on); B.classList.toggle('sp-col', this.dir() === 'col'); B.classList.toggle('sp-swap', !!this.sp.swap);
    B.style.setProperty('--spr', (this.sp.r * 100).toFixed(1) + '%');
    if (on && v === 'exp' && !$('#view-read .rd')) this.open(this.g);
    if (keep && $('#rScroll') && $('#rScroll').clientWidth) this.jump(keep.page, keep.frac);
    const rb = $('#readBack'); if (rb) rb.classList.toggle('on', v === 'exp' && !on && !!this.ret && location.hash.indexOf('exp/' + this.ret.x) === 1);
    window.dispatchEvent(new Event('resize'));
  },
  bindSplit(bar) {
    const main = $('main'); let drag = false;
    const setR = r => { this.sp.r = clamp(r, .15, .85); document.body.style.setProperty('--spr', (this.sp.r * 100).toFixed(1) + '%'); };
    bar.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; drag = true; bar.setPointerCapture(e.pointerId); document.body.classList.add('sp-drag'); e.preventDefault(); });
    bar.addEventListener('pointermove', e => {
      if (!drag) return; const R = main.getBoundingClientRect(); const col = this.dir() === 'col', sw = !!this.sp.swap;
      // row (RTL): reader first → on the right; swap puts it on the left. col: reader on top unless swapped.
      const r = col ? (sw ? (R.bottom - e.clientY) / R.height : (e.clientY - R.top) / R.height) : (sw ? (e.clientX - R.left) / R.width : (R.right - e.clientX) / R.width);
      setR(r);
    });
    const end = () => { if (!drag) return; drag = false; document.body.classList.remove('sp-drag'); this.ls('lab-split', this.sp); window.dispatchEvent(new Event('resize')); };
    bar.addEventListener('pointerup', end); bar.addEventListener('pointercancel', end);
    bar.addEventListener('dblclick', e => { if (e.target.closest('button')) return; setR(.5); this.ls('lab-split', this.sp); });
    bar.addEventListener('keydown', e => { const d = { ArrowLeft: .02, ArrowRight: -.02, ArrowUp: -.02, ArrowDown: .02 }[e.key]; if (d === undefined) return; e.preventDefault(); setR(this.sp.r + (this.dir() === 'col' ? d : (this.sp.swap ? -d : d)) * (this.dir() === 'col' && this.sp.swap ? -1 : 1)); this.ls('lab-split', this.sp); });
    $$('.sb-tools button', bar).forEach(b => b.onclick = () => {
      const a = b.dataset.a;
      if (a === 'swap') this.sp.swap = !this.sp.swap; else if (a === 'dir') this.sp.dir = this.sp.dir === 'col' ? 'row' : 'col'; else if (a === 'close') return this.setSplit(false); else this.sp.r = +a / 100;
      this.ls('lab-split', this.sp); this.applySplit();
    });
  }
};

/* ---- hook into the app: route #read, back button, split ---- */
(() => {
  const r0 = App.route;
  App.route = function () {
    const [v, rest = ''] = (location.hash.slice(1) || 'home').split('/');
    // same experiment already open but another part asked for → reopen on that part
    if (v === 'exp' && Runner.cur && rest.split('?')[0] === Runner.cur.id) { const m = /part=([\w-]+)/.exec(rest); if (m && Runner.S && Runner.S._part !== m[1]) Runner.close(); }
    if (Reader.split && App.view === 'read' && v === 'exp') { const sc = $('#rScroll'), y = sc ? sc.scrollTop : 0; r0.call(this); if (sc) sc.scrollTop = y; }
    else r0.call(this);
    if (v === 'exp' && Reader._opt) { const o = Reader._opt; Reader._opt = ''; Reader.applyOpt(o); }
    if (v === 'read') { const g = rest.split('?')[0]; if (g) Reader.open(g); else { Reader.g = null; Reader.renderLib(); } }
    Reader.applySplit();
  };
  const i0 = App.init; App.init = function () { Reader.init(); i0.call(this); const b = $('.nav button[data-v="read"]'); if (b) b.onclick = () => App.go('read', Reader.has(GradeUI.g) ? GradeUI.g : ''); };
})();
