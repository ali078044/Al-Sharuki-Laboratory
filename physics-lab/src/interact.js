'use strict';
/* =====================================================================
   PhET-style interaction layer
   - Effects & settings panel on the stage: every effect has its own icon
   - Direct manipulation: E.drags(S) → draggable objects with green hint
     arrows, hover tips, wheel adjustment and click actions
   - Measuring tools: stopwatch (all), compass / field meter / compass
     grid (experiments that define E.field)
   - Circuits: click a part → pop-over with its live readings and the
     controls linked to it (auto-detected); flow / labels / look toggles
   ===================================================================== */

/* ---------- colourful effect icons (24×24) ---------- */
const FXI = {
  bfield: '<path d="M3 12c2.5-7 15.5-7 18 0" stroke="#2563eb"/><path d="M3 12c2.5 7 15.5 7 18 0" stroke="#2563eb"/><path d="M3 12h18" stroke="#2563eb"/><path d="M11 3.8l2 1.1-2 1.1M11 18l2 1.1-2 1.1M11 10.9l2 1.1-2 1.1" stroke="#2563eb"/>',
  efield: '<path d="M4 6h13M4 12h13M4 18h13" stroke="#ea580c"/><path d="M15 3.5l3 2.5-3 2.5M15 9.5l3 2.5-3 2.5M15 15.5l3 2.5-3 2.5" stroke="#ea580c"/>',
  charges: '<circle cx="7.5" cy="12" r="5" fill="#fee2e2" stroke="#dc2626"/><path d="M5 12h5M7.5 9.5v5" stroke="#dc2626"/><circle cx="17" cy="12" r="5" fill="#dbeafe" stroke="#2563eb"/><path d="M14.5 12h5" stroke="#2563eb"/>',
  electron: '<circle cx="12" cy="12" r="7" fill="#3b82f6" stroke="#1d4ed8"/><path d="M8.5 12h7" stroke="#fff" stroke-width="2.4"/>',
  current: '<path d="M5 15a7 7 0 1 1 14 0" stroke="#d97706"/><path d="M16 11.5l3 3.5 3-3.5" stroke="#d97706"/><circle cx="7" cy="18" r="1.6" fill="#f59e0b" stroke="none"/><circle cx="12" cy="19.5" r="1.6" fill="#f59e0b" stroke="none"/>',
  force: '<path d="M3 12h13" stroke="#dc2626" stroke-width="3.2"/><path d="M14 6.5l7 5.5-7 5.5z" fill="#dc2626" stroke="#dc2626"/>',
  velocity: '<path d="M3 12h13" stroke="#16a34a" stroke-width="3"/><path d="M14 6.5l7 5.5-7 5.5z" fill="#16a34a" stroke="#16a34a"/><path d="M3 7h5M3 17h5" stroke="#86efac"/>',
  labels: '<path d="M3 5h10l7 7-7 7H3z" fill="#ede9fe" stroke="#7c3aed"/><circle cx="7.5" cy="12" r="1.6" fill="#7c3aed" stroke="none"/>',
  grid: '<g stroke-width="1.8"><path d="M4 6l4-2M14 6l4-2M4 13l4-2M14 13l4-2M4 20l4-2M14 20l4-2" stroke="#dc2626"/><path d="M2 7l2-1M12 7l2-1M2 14l2-1M12 14l2-1M2 21l2-1M12 21l2-1" stroke="#94a3b8"/></g>',
  compass: '<circle cx="12" cy="12" r="9" stroke="#64748b" fill="#f8fafc"/><path d="M12 12l6-6-3.2 7.8z" fill="#dc2626" stroke="#dc2626" stroke-width="1"/><path d="M12 12l-6 6 3.2-7.8z" fill="#fff" stroke="#94a3b8" stroke-width="1"/>',
  meter: '<circle cx="10" cy="10" r="6" stroke="#2563eb" fill="#dbeafe"/><path d="M10 6.5v7M6.5 10h7" stroke="#2563eb"/><path d="M14.5 14.5L20 20" stroke="#1e3a8a" stroke-width="3"/>',
  wave: '<path d="M2 12c2.5-7 5-7 7 0s4.5 7 7 0 3.5-5 6-3" stroke="#7c3aed"/>',
  slow: '<circle cx="12" cy="13" r="8" stroke="#0f766e" fill="#ccfbf1"/><path d="M12 8.5V13l3 2" stroke="#0f766e"/><path d="M9 3h6" stroke="#0f766e"/>',
  core: '<rect x="3" y="9" width="18" height="6" rx="1.5" fill="#9ca3af" stroke="#4b5563"/><path d="M7 6v12M10.5 6v12M14 6v12M17.5 6v12" stroke="#c2410c"/>',
  flip: '<rect x="3" y="8" width="9" height="8" fill="#dc2626" stroke="#dc2626"/><rect x="12" y="8" width="9" height="8" fill="#2563eb" stroke="#2563eb"/><path d="M6 5c3-3 9-3 12 0M18 19c-3 3-9 3-12 0" stroke="#334155"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="#0369a1" fill="#e0f2fe"/><circle cx="12" cy="12" r="3.2" fill="#0369a1" stroke="none"/>',
  light: '<circle cx="12" cy="10" r="5.5" fill="#fde68a" stroke="#d97706"/><path d="M9.5 18h5M10 21h4" stroke="#78716c"/><path d="M12 1.5v1.5M4 10H2.5M21.5 10H20M5.5 3.5l1 1M18.5 3.5l-1 1" stroke="#f59e0b"/>',
  vector: '<path d="M4 20L18 6" stroke="#dc2626" stroke-width="2.4"/><path d="M12 5.5h7v7" stroke="#dc2626" stroke-width="2.4"/><path d="M4 20h14" stroke="#2563eb"/>',
  heat: '<path d="M12 3c1 4 6 5.5 6 11a6 6 0 0 1-12 0c0-3 2-4.5 2-7 1.5 1 2.5 2.5 2.5 4.5C13 9.5 11.5 6 12 3z" fill="#fed7aa" stroke="#ea580c"/>',
  graph: '<path d="M4 3v17h17" stroke="#334155"/><path d="M6 16c3-9 6-9 8-4s4 3 6-5" stroke="#e11d48"/>',
  magnet: '<path d="M4 6h7v5a2 2 0 0 0 2 0V6h7v5a8 8 0 0 1-16 0z" fill="#fff" stroke="#334155"/><path d="M4 6h7v4H4z" fill="#dc2626" stroke="#dc2626"/><path d="M13 6h7v4h-7z" fill="#2563eb" stroke="#2563eb"/>',
  stopwatch: '<circle cx="12" cy="13.5" r="7.5" fill="#fef3c7" stroke="#b45309"/><path d="M12 9.5v4.5l2.5 1.5M10 3h4M12 3v3" stroke="#b45309"/>',
  schematic: '<path d="M2 12h5l1.5-4 3 8 3-8 1.5 4h6" stroke="#0f172a"/>',
  real: '<rect x="4" y="8" width="16" height="8" rx="2" fill="#fde68a" stroke="#92400e"/><path d="M8 8v8M12 8v8M16 8v8" stroke="#b45309"/>',
  swap: '<path d="M4 8h14l-3-3M20 16H6l3 3" stroke="#0f766e"/>',
  dot: '<circle cx="12" cy="12" r="4" fill="#6366f1" stroke="#6366f1"/><circle cx="12" cy="12" r="8.5" stroke="#a5b4fc"/>',
  ray: '<path d="M3 20L14 9" stroke="#f59e0b" stroke-width="2.6"/><path d="M14 9l7 2" stroke="#f59e0b" stroke-width="2.6"/><circle cx="14" cy="9" r="2" fill="#fde68a" stroke="#d97706"/>',
  photon: '<path d="M2 12c1.5-4 3-4 4 0s2.5 4 4 0 2.5-4 4 0 2.5 4 4 0" stroke="#a855f7"/><path d="M18 8l4 4-4 4" stroke="#a855f7"/>',
  atom: '<circle cx="12" cy="12" r="2.2" fill="#dc2626" stroke="#dc2626"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#2563eb"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" stroke="#2563eb"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(-60 12 12)" stroke="#2563eb"/>',
  energy: '<path d="M4 20h16M6 15h12M8 10h8M10 5h4" stroke="#7c3aed"/><path d="M12 20V6" stroke="#f59e0b" stroke-dasharray="2 2"/>',
  settings: '<circle cx="12" cy="12" r="3" stroke="currentColor"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" stroke="currentColor"/>'
};
function fxSvg(n) { return `<svg viewBox="0 0 24 24" class="fxsvg" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${FXI[n] || FXI.dot}</svg>`; }
const FX_RULES = [
  [/بوصل/, 'compass'], [/مقياس المجال|مجس/, 'meter'], [/ساعة/, 'stopwatch'],
  [/خطوط المجال المغناطيسي|المجال المغناطيسي|مجال B|\bB\b|الفيض/, 'bfield'],
  [/خطوط المجال|المجال الكهربائي|\bE\b/, 'efield'],
  [/إلكترون|الالكترون/, 'electron'], [/شحن/, 'charges'], [/فوتون/, 'photon'],
  [/تيار|دوام/, 'current'], [/قوة|قوى/, 'force'], [/سرع|متجه السرعة/, 'velocity'],
  [/تسمي|قيم|بيان|أسماء|ملصق/, 'labels'], [/شبكة/, 'grid'],
  [/بطيء|تبطيء/, 'slow'], [/قلب|حديد/, 'core'], [/عكس/, 'flip'], [/منظر|علوي|داخل/, 'eye'],
  [/أشعة|شعاع|مسار الضوء/, 'ray'], [/ضوء|إضاءة/, 'light'], [/متجه|طوري|مركب/, 'vector'],
  [/مستويات|طاقة/, 'energy'], [/حرار|تسخين/, 'heat'], [/منحن|رسم/, 'graph'], [/موج|طور|اهتزاز/, 'wave'],
  [/ذر|نوا|نوى/, 'atom'], [/مغناطيس/, 'magnet']
];
function fxIconFor(c) { if (c.icon) return c.icon; const s = (c.label || '') + ' ' + (c.k || ''); for (const [re, n] of FX_RULES) if (re.test(s)) return n; return 'dot'; }

function fanout(c, v, self) { if (c._set && c._set !== self) c._set(v); (c._sets || []).forEach(f => f !== self && f(v)); }
/* set a parameter from anywhere (canvas drag, pop-over…) and keep every UI in sync */
function setParam(S, k, v, fire = true) {
  const E = S.E; const c = (E.controls || []).find(x => x.k === k);
  if (c && (!c.type || c.type === 'range')) { v = clamp(v, c.min, c.max); if (c.step) v = +(Math.round((v - c.min) / c.step) * c.step + c.min).toFixed(6); }
  if (S.p[k] === v) return v;
  S.p[k] = v; if (c) { fanout(c, v, null); if (fire && c.on) c.on(v, S); }
  return v;
}

const Interact = {
  /* ================= controls panel ================= */
  panel(E, S) {
    const box = $('#ctls'); if (!box) return; box.innerHTML = '';
    const ctl = E.controls || [];
    const items = ctl.map((c, i) => ({ c, i, t: c.type || 'range' }));
    const act = items.filter(o => o.t === 'buttons'), set = items.filter(o => o.t === 'range' || o.t === 'select'), fx = items.filter(o => o.t === 'toggle');
    const tools = this.tools(E, S);
    const sec = (id, title, ic) => { const d = el('div', { class: 'fx-sec', 'data-sec': id }); d.innerHTML = `<div class="fx-st">${ic}<span>${title}</span></div>`; box.appendChild(d); return d; };
    if (act.length) { const d = sec('act', 'الإجراءات', fxSvg('dot')); act.forEach(o => d.appendChild(this.ctlEl(o, S))); }
    if (set.length) { const d = sec('set', 'الترتيبات', `<i class="i">${ico('sliders')}</i>`); set.forEach(o => d.appendChild(this.ctlEl(o, S))); }
    if (fx.length || tools.fx.length) { const d = sec('fx', 'التأثيرات', `<i class="i">${ico('eye')}</i>`); fx.forEach(o => d.appendChild(this.ctlEl(o, S))); tools.fx.forEach(t => d.appendChild(this.toolEl(t, S))); }
    if (tools.tools.length) { const d = sec('tools', 'أدوات القياس', fxSvg('meter')); tools.tools.forEach(t => d.appendChild(this.toolEl(t, S))); }
    // mini strip (icons only) — mirrors effects + tools
    const strip = $('#fxStrip'); if (strip) {
      const all = fx.map(o => ({ icon: fxIconFor(o.c), label: o.c.label, get: () => !!S.p[o.c.k], set: v => { setParam(S, o.c.k, v); } })).concat(tools.fx, tools.tools);
      strip.innerHTML = all.map((t, i) => `<button class="fxb ${t.get() ? 'on' : ''}" data-j="${i}" data-tip="${t.label}" aria-label="${t.label}">${fxSvg(t.icon)}</button>`).join('');
      $$('.fxb', strip).forEach(b => b.onclick = () => { const t = all[+b.dataset.j]; t.set(!t.get()); this.syncAll(S); });
      this._strip = all;
    }
    const empty = !ctl.length && !tools.fx.length && !tools.tools.length; const fxp = $('#fx'); if (fxp) fxp.classList.toggle('hidden', empty);
  },
  ctlEl(o, S) {
    const { c, i, t } = o; const d = el('div', { class: 'ctl', 'data-i': i });
    const show = v => c.fmt ? c.fmt(v, S) : (fmt(v, 3) + (c.unit ? ' ' + c.unit : ''));
    if (t === 'range') {
      d.classList.add('rng');
      d.innerHTML = `<label><span>${c.label}</span><output title="انقر لكتابة قيمة">${show(S.p[c.k])}</output></label><div class="rrow"><button class="stp" data-d="-1" aria-label="إنقاص">${ico('minus')}</button><input type="range" min="${c.min}" max="${c.max}" step="${c.step || (c.max - c.min) / 100}" value="${S.p[c.k]}"><button class="stp" data-d="1" aria-label="زيادة">${ico('plus')}</button></div>`;
      const inp = $('input', d); let out = $('output', d);
      const upd = v => { inp.value = v; out.textContent = show(v); };
      inp.oninput = () => { const v = +inp.value; S.p[c.k] = v; fanout(c, v, null); c.on && c.on(v, S); };
      if (o.extra) { upd.__pop = 1; (c._sets || (c._sets = [])).push(upd); } else c._set = upd;
      $$('.stp', d).forEach(b => { let tm; const go = () => setParam(S, c.k, S.p[c.k] + (+b.dataset.d) * (c.step || (c.max - c.min) / 100)); b.onpointerdown = e => { e.preventDefault(); go(); tm = setTimeout(function rep() { go(); tm = setTimeout(rep, 70); }, 380); }; b.onpointerup = b.onpointerleave = () => clearTimeout(tm); });
      out.onclick = () => { const cur = S.p[c.k]; const ed = el('input', { type: 'number', class: 'oedit', step: 'any', value: cur }); out.replaceWith(ed); ed.focus(); ed.select(); const done = ok => { if (ok && isFinite(+ed.value)) setParam(S, c.k, +ed.value); ed.replaceWith(out); out.textContent = show(S.p[c.k]); }; ed.onkeydown = e => { if (e.key === 'Enter') done(true); if (e.key === 'Escape') done(false); }; ed.onblur = () => done(true); };
    } else if (t === 'select') {
      const short = c.opts.length <= 4 && c.opts.every(x => String(x[1]).length <= 16);
      if (short) {
        d.classList.add('segc');
        d.innerHTML = `<label><span>${c.label}</span></label><div class="seg fxseg">${c.opts.map(x => `<button data-v="${x[0]}" class="${x[0] == S.p[c.k] ? 'on' : ''}">${x[1]}</button>`).join('')}</div><select class="hidden">${c.opts.map(x => `<option value="${x[0]}">${x[1]}</option>`).join('')}</select>`;
        const pick = v => { $$('.fxseg button', d).forEach(b => b.classList.toggle('on', b.dataset.v == v)); $('select', d).value = v; };
        $$('.fxseg button', d).forEach(b => b.onclick = () => { const v = isNaN(+b.dataset.v) ? b.dataset.v : +b.dataset.v; S.p[c.k] = v; pick(v); c.on && c.on(v, S); });
        c._set = pick;
      } else {
        d.innerHTML = `<label><span>${c.label}</span></label><select>${c.opts.map(x => `<option value="${x[0]}" ${x[0] == S.p[c.k] ? 'selected' : ''}>${x[1]}</option>`).join('')}</select>`;
        const s = $('select', d); s.onchange = () => { const v = isNaN(+s.value) ? s.value : +s.value; S.p[c.k] = v; c.on && c.on(v, S); };
        c._set = v => { s.value = v; };
      }
    } else if (t === 'toggle') {
      d.classList.add('fxrow'); d.setAttribute('role', 'switch');
      d.innerHTML = `<span class="fxi">${fxSvg(fxIconFor(c))}</span><span class="fxl">${c.label}</span><input type="checkbox" class="sw" ${S.p[c.k] ? 'checked' : ''} tabindex="-1">`;
      const cb = $('input', d); const upd = v => { cb.checked = !!v; d.classList.toggle('on', !!v); d.setAttribute('aria-checked', !!v); };
      upd(S.p[c.k]); d.tabIndex = 0;
      const flip = () => { setParam(S, c.k, !S.p[c.k]); upd(S.p[c.k]); this.syncStrip(S); };
      d.onclick = e => { e.preventDefault(); flip(); }; d.onkeydown = e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } };
      c._set = upd;
    } else if (t === 'buttons') {
      d.classList.add('acts');
      d.innerHTML = `${c.label ? `<label><span>${c.label}</span></label>` : ''}<div class="btnrow">${c.btns.map((b, j) => `<button class="btn sm ${b.cls || ''}" data-i="${j}">${b.t}</button>`).join('')}</div>`;
      $$('button', d).forEach(b => b.onclick = () => { c.btns[+b.dataset.i].on(S); Runner.refresh(); this.syncAll(S); });
    }
    return d;
  },
  toolEl(t, S) {
    const d = el('div', { class: 'ctl fxrow tool' }); d.tabIndex = 0;
    d.innerHTML = `<span class="fxi">${fxSvg(t.icon)}</span><span class="fxl">${t.label}</span><input type="checkbox" class="sw" tabindex="-1">`;
    const cb = $('input', d); const upd = () => { const v = t.get(); cb.checked = v; d.classList.toggle('on', v); };
    upd(); t._upd = upd;
    d.onclick = e => { e.preventDefault(); t.set(!t.get()); upd(); this.syncStrip(S); };
    return d;
  },
  syncStrip(S) { const s = $('#fxStrip'); if (!s || !this._strip) return; $$('.fxb', s).forEach(b => { const t = this._strip[+b.dataset.j]; b.classList.toggle('on', !!t.get()); }); },
  syncAll(S) { const E = S.E; (E.controls || []).forEach(c => { if (c.k && c._set) c._set(S.p[c.k]); }); (this._tools || []).forEach(t => t._upd && t._upd()); this.syncStrip(S); },
  /* framework-provided effects & tools */
  tools(E, S) {
    const T = S._tl || (S._tl = {}); const fx = [], tools = [];
    if (S.C) {
      const st = () => Runner.stage;
      fx.push({ icon: 'electron', label: 'حركة الشحنات في الأسلاك', get: () => st() ? st().o.flow !== false : true, set: v => { if (st()) st().o.flow = v; } });
      fx.push({ icon: 'swap', label: 'إظهار الإلكترونات بدل التيار الاصطلاحي', get: () => S.C.flow === 'elec', set: v => { S.C.flow = v ? 'elec' : 'conv'; } });
      fx.push({ icon: 'charges', label: 'الشحنات على المتسعة والمجال داخل الملف', get: () => st() ? st().o.inner !== false : true, set: v => { if (st()) st().o.inner = v; } });
      fx.push({ icon: 'labels', label: 'قيم العناصر وأسماؤها', get: () => st() ? st().o.labels !== false : true, set: v => { if (st()) st().o.labels = v; } });
      fx.push({ icon: 'schematic', label: 'رسم الكتاب (مخطط الدائرة)', get: () => st() ? st().o.mode === 'schematic' : false, set: v => { if (st()) st().o.mode = v ? 'schematic' : 'realistic'; } });
    }
    if (E.field) {
      fx.push({ icon: 'grid', label: 'شبكة البوصلات (اتجاه المجال)', get: () => !!T.grid, set: v => { T.grid = v; } });
      tools.push({ icon: 'compass', label: 'بوصلة', get: () => !!T.compass, set: v => { T.compass = v; if (v) this.placeTool(S, 'compass'); } });
      tools.push({ icon: 'meter', label: 'مقياس المجال المغناطيسي', get: () => !!T.meter, set: v => { T.meter = v; if (v) this.placeTool(S, 'meter'); } });
    }
    tools.push({ icon: 'stopwatch', label: 'ساعة إيقاف', get: () => !!T.sw, set: v => { T.sw = v; this.stopwatch(S, v); } });
    this._tools = fx.concat(tools);
    return { fx, tools };
  },

  /* ================= stage overlays: play/pause/step/reset ================= */
  stageUI(E, S) {
    const st = $('#stage'); if (!st) return;
    const d = el('div', { class: 'simctl' });
    d.innerHTML = `<button class="sc-play" id="scPlay" aria-label="تشغيل / إيقاف" data-tip="تشغيل / إيقاف مؤقت">${ico('pause')}</button><button class="sc-step" id="scStep" aria-label="خطوة واحدة" data-tip="تقدّم خطوة واحدة (عند الإيقاف)">${ico('play')}<b></b></button>`;
    st.appendChild(d);
    const rs = el('button', { class: 'sc-reset', id: 'scReset', 'aria-label': 'إعادة الكل', 'data-tip': 'إعادة كل شيء' }); rs.innerHTML = ico('reset'); st.appendChild(rs);
    $('#scPlay').onclick = () => $('#runBtn').click();
    $('#scStep').onclick = () => { if (S.run) $('#runBtn').click(); S._step = 1 / 30; };
    rs.onclick = () => { $('#rstBtn').click(); };
    const sync = () => { const b = $('#scPlay'); if (b) { b.innerHTML = ico(S.run ? 'pause' : 'play'); b.classList.toggle('paused', !S.run); } };
    $('#runBtn').addEventListener('click', () => setTimeout(sync, 0));
  },

  /* ================= direct manipulation (canvas scenes) ================= */
  list(E, S) {
    const L = [];
    if (E.drags) { try { (E.drags(S) || []).forEach(o => o && L.push(o)); } catch (e) { console.warn(e); } }
    const T = S._tl || {};
    if (E.field) {
      if (T.compass && T.cp) L.push({ id: '_compass', x: T.cp.x, y: T.cp.y, r: 30, axis: 'xy', tip: 'بوصلة — اسحبها في أي مكان', tool: 1, drag: (S, d) => { T.cp.x = clamp(d.ox + d.x - d.sx, 10, S.W - 10); T.cp.y = clamp(d.oy + d.y - d.sy, 10, S.H - 10); } });
      if (T.meter && T.mp) L.push({ id: '_meter', x: T.mp.x, y: T.mp.y, r: 24, axis: 'xy', tip: 'مقياس المجال — ضع المجس في أي نقطة', tool: 1, drag: (S, d) => { T.mp.x = clamp(d.ox + d.x - d.sx, 10, S.W - 10); T.mp.y = clamp(d.oy + d.y - d.sy, 10, S.H - 10); } });
    }
    return L;
  },
  hitObj(o, x, y) {
    if (o.hit) return o.hit(x, y);
    if (o.w != null && o.h != null) { const p = Interact.coarse ? 12 : 4; return Math.abs(x - o.x) <= o.w / 2 + p && Math.abs(y - o.y) <= o.h / 2 + p; }
    const pad = Interact.coarse ? 12 : 0; return Math.hypot(x - o.x, y - o.y) <= (o.r || 22) + pad;
  },
  find(E, S, x, y) { const L = this.list(E, S); for (let i = L.length - 1; i >= 0; i--) if (this.hitObj(L[i], x, y)) return L[i]; return null; },
  down(E, S, x, y) {
    const o = this.find(E, S, x, y); if (!o) return false;
    this.act = { id: o.id, o, sx: x, sy: y, ox: o.x, oy: o.y, lx: x, ly: y, moved: false, a0: o.cx != null ? Math.atan2(y - o.cy, x - o.cx) : 0 };
    o.down && o.down(S, x, y); Runner.cv.style.cursor = 'grabbing'; return true;
  },
  drag(E, S, x, y) {
    const A = this.act; if (!A) return false;
    const o = A.o.keep ? A.o : ((this.list(E, S)).find(q => q.id === A.id) || A.o); if (!A.o.keep) A.o = o;
    if (Math.hypot(x - A.sx, y - A.sy) > 3) A.moved = true;
    if (A.moved && o.drag) {
      const d = { x, y, sx: A.sx, sy: A.sy, ox: A.ox, oy: A.oy, dx: x - A.lx, dy: y - A.ly };
      if (o.cx != null) { const a = Math.atan2(y - o.cy, x - o.cx); let da = a - (A.la ?? A.a0); while (da > Math.PI) da -= TAU; while (da < -Math.PI) da += TAU; d.ang = a; d.dang = da; A.la = a; }
      if (typeof o.dir === 'number') { d.along = d.dx * Math.cos(o.dir) + d.dy * Math.sin(o.dir); }
      o.drag(S, d);
      if (!o.tool) this.touched(S);
    }
    A.lx = x; A.ly = y; return true;
  },
  up(E, S, x, y) {
    const A = this.act; if (!A) return false; this.act = null;
    const L = this.list(E, S); const o = L.find(q => q.id === A.id) || A.o;
    if (!A.moved && o.click) { o.click(S, x, y); this.touched(S); Sound.click && Sound.click(); Runner.refresh(); }
    o.up && o.up(S, x, y); Runner.cv.style.cursor = this.hov ? 'grab' : ''; return true;
  },
  hover(E, S, x, y) {
    const o = this.find(E, S, x, y); this.hov = o ? o.id : null; this.hx = x; this.hy = y;
    if (Runner.cv) Runner.cv.style.cursor = o ? (o.click && !o.drag ? 'pointer' : 'grab') : '';
    return !!o;
  },
  wheel(E, S, x, y, dy) { const o = this.find(E, S, x, y); if (!o || !o.wheel) return false; o.wheel(S, dy < 0 ? 1 : -1); this.touched(S); return true; },
  touched(S) { if (!S._touched) { S._touched = true; try { sessionStorage.setItem('lab-touch-' + S.E.id, '1'); } catch (e) { } } },

  /* ---------- drawing: hints, tools ---------- */
  after(ctx, w, h, S) {
    const E = S.E; const T = S._tl || {};
    ctx.save(); const cvb = ctx.canvas, rw = cvb.__raw; cvb.__raw = true;
    if (E.field) { if (T.compass) this.drawCompass(ctx, S); if (T.meter) this.drawMeter(ctx, S); }
    const L = this.list(E, S); const t = performance.now() / 1000;
    if (S._touched === undefined) { try { S._touched = sessionStorage.getItem('lab-touch-' + E.id) === '1'; } catch (e) { S._touched = false; } }
    L.forEach((o, k) => {
      if (o.tool) return;
      const act = this.act && this.act.id === o.id, hov = this.hov === o.id;
      if (act || hov) this.arrows(ctx, o, act ? 1 : .9);
      else if (!S._touched && (o.hint !== false) && k < 3) { const p = .5 + .5 * Math.sin(t * 3 + k); ctx.globalAlpha = .35 + .45 * p; this.arrows(ctx, o, .8 + .12 * p); ctx.globalAlpha = 1; }
    });
    const ho = L.find(o => o.id === (this.act ? this.act.id : this.hov));
    if (ho && ho.tip) { const tx = clamp(ho.x, 80, w - 80), ty = Math.max(16, ho.y - (ho.h ? ho.h / 2 : (ho.r || 22)) - 30); G.text(ctx, ho.tip, tx, ty, { s: 12, w: 800, c: '#fff', bg: 'rgba(15,23,42,.88)' }); }
    else if (!S._touched && L.some(o => !o.tool)) { const o = L.find(q => !q.tool && q.hint !== false) || L.find(q => !q.tool); if (o) { const tx = clamp(o.x, 80, w - 80), ty = Math.max(16, o.y - (o.h ? o.h / 2 : (o.r || 22)) - 32); G.text(ctx, o.idle || 'اسحبني ✋', tx, ty, { s: 12, w: 800, c: '#14532d', bg: 'rgba(187,247,208,.95)' }); } }
    cvb.__raw = rw; ctx.restore();
  },
  arrows(ctx, o, s = 1) {
    const R = (o.h != null && o.w != null) ? null : (o.r || 22);
    const put = (x, y, a) => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(14, 0); ctx.lineTo(2, -10); ctx.lineTo(2, -4.5); ctx.lineTo(-8, -4.5); ctx.lineTo(-8, 4.5); ctx.lineTo(2, 4.5); ctx.lineTo(2, 10); ctx.closePath(); ctx.fillStyle = '#86efac'; ctx.fill(); ctx.strokeStyle = '#166534'; ctx.lineWidth = 1.4; ctx.stroke(); ctx.restore(); };
    const ex = R != null ? R + 16 : o.w / 2 + 16, ey = R != null ? R + 16 : o.h / 2 + 16;
    const ax = o.axis || 'xy';
    if (o.cx != null) { // rotation: two curved arrows
      const rr0 = Math.hypot(o.x - o.cx, o.y - o.cy) || 40, a0 = Math.atan2(o.y - o.cy, o.x - o.cx);
      [-1, 1].forEach(sg => { const a = a0 + sg * (28 / rr0 + .15); ctx.strokeStyle = '#166534'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(o.cx, o.cy, rr0, Math.min(a0, a), Math.max(a0, a)); ctx.stroke(); ctx.strokeStyle = '#86efac'; ctx.lineWidth = 4.5; ctx.stroke(); put(o.cx + rr0 * Math.cos(a), o.cy + rr0 * Math.sin(a), a + sg * Math.PI / 2); });
      return;
    }
    if (typeof o.dir === 'number') { const c = Math.cos(o.dir), sn = Math.sin(o.dir); const e = Math.max(ex, ey); put(o.x + c * e, o.y + sn * e, o.dir); put(o.x - c * e, o.y - sn * e, o.dir + Math.PI); return; }
    if (ax === 'x' || ax === 'xy') { put(o.x + ex, o.y, 0); put(o.x - ex, o.y, Math.PI); }
    if (ax === 'y' || ax === 'xy') { put(o.x, o.y + ey, Math.PI / 2); put(o.x, o.y - ey, -Math.PI / 2); }
  },
  placeTool(S, k) {
    const T = S._tl; const W = S.W || 600, H = S.H || 400;
    if (k === 'compass' && !T.cp) T.cp = { x: W * .2 + 60, y: H * .78, a: 0, w: 0 };
    if (k === 'meter' && !T.mp) T.mp = { x: W * .35 + 60, y: H * .78 };
  },
  B(S, x, y) { const b = S.E.field(S, x, y); if (!b) return null; return b; },
  drawCompass(ctx, S) {
    const T = S._tl, c = T.cp; if (!c) return; const b = this.B(S, c.x, c.y);
    if (b && Math.hypot(b[0], b[1]) > 1e-9) { const tgt = Math.atan2(b[1], b[0]); let d = tgt - c.a; while (d > Math.PI) d -= TAU; while (d < -Math.PI) d += TAU; c.w = (c.w + d * .08) * .86; c.a += c.w; }
    const r = 28; ctx.fillStyle = 'rgba(248,250,252,.92)'; ctx.beginPath(); ctx.arc(c.x, c.y, r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 6; ctx.stroke(); ctx.fillStyle = '#1e293b';
    for (let k = 0; k < 8; k++) { const a = k * TAU / 8; ctx.beginPath(); ctx.arc(c.x + Math.cos(a) * r, c.y + Math.sin(a) * r, 1.8, 0, TAU); ctx.fillStyle = '#f8fafc'; ctx.fill(); }
    ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(c.a);
    ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(r - 5, 0); ctx.lineTo(0, -6); ctx.lineTo(0, 6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#e2e8f0'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-r + 5, 0); ctx.lineTo(0, -6); ctx.lineTo(0, 6); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(0, 0, 2.5, 0, TAU); ctx.fill(); ctx.restore();
  },
  drawMeter(ctx, S) {
    const m = S._tl.mp; if (!m) return; const b = this.B(S, m.x, m.y);
    ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 3; ctx.fillStyle = 'rgba(219,234,254,.35)'; ctx.beginPath(); ctx.arc(m.x, m.y, 16, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(m.x - 10, m.y); ctx.lineTo(m.x + 10, m.y); ctx.moveTo(m.x, m.y - 10); ctx.lineTo(m.x, m.y + 10); ctx.stroke();
    ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(m.x, m.y + 16); ctx.lineTo(m.x, m.y + 40); ctx.stroke();
    const bx = m.x - 88, by = m.y + 40; ctx.fillStyle = 'rgba(30,58,138,.95)'; rr(ctx, bx, by, 176, 70, 10); ctx.fill();
    const Bm = b ? Math.hypot(b[0], b[1]) : 0; const ang = b ? deg(Math.atan2(-b[1], b[0])) : 0;
    ctx.direction = 'ltr'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#fff'; ctx.font = '800 14px ui-monospace,monospace';
    ctx.fillText('B = ' + fmtSI(Bm, 'T'), m.x, by + 16); ctx.font = '700 11px ui-monospace,monospace'; ctx.fillStyle = '#bfdbfe';
    ctx.fillText('Bx ' + fmtSI(b ? b[0] : 0, 'T') + '  By ' + fmtSI(b ? -b[1] : 0, 'T'), m.x, by + 36); ctx.fillText('θ = ' + fmt(ang, 3) + '°', m.x, by + 54); ctx.textBaseline = 'alphabetic';
  },
  grid(ctx, w, h, S) {
    const E = S.E; if (!E.field) return; const sp = 44; const pts = []; let mx = 0;
    for (let y = sp / 2; y < h; y += sp) for (let x = sp / 2; x < w; x += sp) { const b = E.field(S, x, y); if (!b) continue; const m = Math.hypot(b[0], b[1]); if (m > mx) mx = m; pts.push([x, y, b, m]); }
    if (!mx) return; const ref = E.fieldRef ? E.fieldRef(S) : mx;
    const cvb = ctx.canvas, rw = cvb.__raw; cvb.__raw = true; const bk = !!cvb.__book;
    for (const [x, y, b, m] of pts) {
      const k = clamp(Math.pow(m / ref, .35), 0, 1); if (k < .04) continue; const a = Math.atan2(b[1], b[0]);
      ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.globalAlpha = k;
      ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(13, 0); ctx.lineTo(0, -3.5); ctx.lineTo(0, 3.5); ctx.closePath(); ctx.fill();
      ctx.fillStyle = bk ? '#94a3b8' : '#e2e8f0'; ctx.beginPath(); ctx.moveTo(-13, 0); ctx.lineTo(0, -3.5); ctx.lineTo(0, 3.5); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1; cvb.__raw = rw;
  },

  /* ================= stopwatch (HTML overlay, works for every experiment) ================= */
  stopwatch(S, on) {
    const st = $('#stage'); let d = $('#swTool');
    if (!on) { if (d) d.remove(); return; }
    if (d) return; d = el('div', { class: 'swtool', id: 'swTool' });
    d.innerHTML = `<div class="sw-h">${fxSvg('stopwatch')}<span>ساعة إيقاف</span></div><div class="sw-t">0.00 s</div><div class="sw-b"><button class="btn sm primary" data-a="go">${ico('play')}</button><button class="btn sm" data-a="rs">${ico('reset')}</button></div>`;
    st.appendChild(d); d.style.left = '90px'; d.style.top = '70px';
    const W = S._sw = { run: false, acc: 0, last: null };
    $('[data-a=go]', d).onclick = () => { W.run = !W.run; W.last = null; $('[data-a=go]', d).innerHTML = ico(W.run ? 'pause' : 'play'); };
    $('[data-a=rs]', d).onclick = () => { W.acc = 0; W.last = null; this.swShow(S); };
    const h = $('.sw-h', d); let drag = null;
    h.onpointerdown = e => { drag = { x: e.clientX, y: e.clientY, l: d.offsetLeft, t: d.offsetTop }; h.setPointerCapture(e.pointerId); };
    h.onpointermove = e => { if (!drag) return; d.style.left = clamp(drag.l + e.clientX - drag.x, 0, st.clientWidth - d.offsetWidth) + 'px'; d.style.top = clamp(drag.t + e.clientY - drag.y, 0, st.clientHeight - d.offsetHeight) + 'px'; };
    h.onpointerup = () => drag = null;
  },
  simTime(S) { return S.C ? S.C.t : S.t; },
  swShow(S) { const d = $('#swTool .sw-t'); if (d && S._sw) { const v = S._sw.acc; d.textContent = (v < 1e-3 && v > 0 ? fmtSI(v, 's') : v.toFixed(v < 10 ? 3 : 2) + ' s'); } },
  tick(E, S) {
    const W = S._sw; if (W && W.run) { const t = this.simTime(S); if (W.last != null && t >= W.last) W.acc += t - W.last; W.last = t; this.swShow(S); }
    if (this.pop && S.C) this.popLive(S);
  },

  /* ================= circuits: link parts ↔ controls, pop-over editor ================= */
  linkCircuit(E, S) {
    const C = S.C; const map = {}; if (!C) return map;
    const num = c => { const o = {}; for (const k in c) if (typeof c[k] === 'number' && !['v', 'i', 'vPrev', 'iPrev', 'v2', 'i2', 'p', 'pAvg', 'vis', 'phase', 'th', 'peak'].includes(k)) o[k] = c[k]; return o; };
    (E.controls || []).forEach(c => {
      if ((c.type && c.type !== 'range') || !c.on) return;
      const snap = C.comps.map(cp => [cp, num(cp)]); const v0 = S.p[c.k]; const v1 = Math.abs(v0 - c.max) < 1e-9 ? c.min : c.max;
      try { c.on(v1, S, true); } catch (e) { return; }
      snap.forEach(([cp, o]) => { for (const k in o) if (cp[k] !== o[k]) (map[cp.id] || (map[cp.id] = [])).push({ c, prop: k }); });
      try { c.on(v0, S, true); } catch (e) { }
      snap.forEach(([cp, o]) => Object.assign(cp, o));
    });
    S._links = map; return map;
  },
  partPop(S, c) {
    this.closePop(); if (!c || c.type === 'wire') return;
    const st = $('#stage'); const E = S.E; const links = (S._links || {})[c.id] || [];
    const name = c.label || (typeof CT !== 'undefined' && CT[c.type] ? CT[c.type].name : c.type);
    const d = el('div', { class: 'partpop', id: 'partPop' });
    const seen = new Set(); const ctls = links.map(l => l.c).filter(x => !seen.has(x.k) && seen.add(x.k));
    d.innerHTML = `<div class="pp-h"><b>${name}</b><button class="icon-btn xs" data-x>${ico('close')}</button></div><div class="reads pp-r"></div><div class="pp-c"></div>${c.type === 'switch' ? `<button class="btn sm primary pp-sw">${c.closed ? 'فتح المفتاح' : 'غلق المفتاح'}</button>` : ''}${!ctls.length && c.type !== 'switch' ? '<p class="pp-n">قيمة هذا العنصر ثابتة في هذه التجربة</p>' : ''}`;
    st.appendChild(d);
    const pc = $('.pp-c', d); ctls.forEach(ct => { ct._sets = (ct._sets || []).filter(f => f.__pop !== 1); const node = this.ctlEl({ c: ct, i: -1, t: 'range', extra: 1 }, S); node.removeAttribute('data-i'); pc.appendChild(node); });
    $('[data-x]', d).onclick = () => this.closePop();
    const sw = $('.pp-sw', d); if (sw) sw.onclick = () => { c.closed = !c.closed; S.C.beSteps = 2; Sound.click && Sound.click(); E.onSwitch && E.onSwitch(c, S); sw.textContent = c.closed ? 'فتح المفتاح' : 'غلق المفتاح'; Runner.refresh(); };
    // position near the part
    const stg = Runner.stage; const cam = stg.cam; const mx = ((c.p1.x + c.p2.x) / 2) * cam.z + cam.x, my = ((c.p1.y + c.p2.y) / 2) * cam.z + cam.y;
    const W = st.clientWidth, H = st.clientHeight; const pw = 250;
    let left = mx + 30; if (left + pw > W - 8) left = mx - pw - 30; left = clamp(left, 8, W - pw - 8);
    d.style.left = left + 'px'; d.style.top = clamp(my - 60, 8, H - 220) + 'px';
    this.pop = { c, d }; this.popLive(S);
  },
  popLive(S) {
    const P = this.pop; if (!P || !P.d.isConnected) { this.pop = null; return; }
    const c = P.c, r = S.C.reading(c); const box = $('.pp-r', P.d); if (!box) return;
    const items = [[r.rms ? 'V المؤثر' : 'فرق الجهد V', fmtSI(r.v, 'V')], [r.rms ? 'I المؤثر' : 'التيار I', fmtSI(r.i, 'A')]];
    if (!['voltmeter', 'ammeter', 'switch'].includes(c.type)) items.push(['القدرة', fmtSI(c.pAvg || Math.abs(c.p), 'W')]);
    if (c.type === 'capacitor') items.push(['الشحنة Q', fmtSI(c.val * 1e-6 * c.v, 'C')]);
    const hsh = items.map(x => x[1]).join('|'); if (box.dataset.h === hsh) return; box.dataset.h = hsh;
    box.innerHTML = items.map(x => `<div class="read"><span>${x[0]}</span><b>${x[1]}</b></div>`).join('');
  },
  closePop() { const p = $('#partPop'); if (p) p.remove(); this.pop = null; if (this.S) (this.S.E.controls || []).forEach(c => { if (c._sets) c._sets = c._sets.filter(f => f.__pop !== 1); }); },

  /* ================= lifecycle ================= */
  open(E, S) {
    this.S = S; this.act = null; this.hov = null; this.pop = null; S._tl = S._tl || {};
    if (S.C) { this.linkCircuit(E, S); const stg = Runner.stage; if (stg) { const prev = stg.o.onSelect; stg.o.onSelect = c => { prev && prev(c); if (c) this.partPop(S, c); else this.closePop(); }; } }
    this.panel(E, S); this.stageUI(E, S);
    const fx = $('#fx'); if (fx) { const mini = (() => { try { return localStorage.getItem('lab-fxmini') === '1'; } catch (e) { return false; } })(); fx.classList.toggle('compact', mini || window.innerWidth < 1100 && window.innerWidth > 920); }
    const tg = $('#fxMin'); if (tg) tg.onclick = () => { const f = $('#fx'); f.classList.toggle('compact'); try { localStorage.setItem('lab-fxmini', f.classList.contains('compact') ? '1' : '0'); } catch (e) { } setTimeout(() => Runner.stage && Runner.stage.fit(E.pad || 90), 260); };
  },
  close() { this.closePop(); this.S = null; this.act = null; }
};

/* ---- hook the runner ---- */
Runner.controls = function (E, S) { Interact.panel(E, S); };
Runner.bindPointer = function (E, S) {
  const cv = this.cv, R = this; let down = false;
  const Z = R.Z = { s: 1, x: 0, y: 0 }; // view zoom/pan: screen = logical*s + (x,y)
  const raw = e => { const r = cv.getBoundingClientRect(), k = cv.__k || 1; return [(e.clientX - r.left) / k, (e.clientY - r.top) / k]; };
  const pos = e => { const [x, y] = raw(e); return [(x - Z.x) / Z.s, (y - Z.y) / Z.s]; };
  const pts = new Map(); let pin = null, pan = null;
  const pinchInfo = () => { const a = [...pts.values()]; return { d: Math.hypot(a[0][0] - a[1][0], a[0][1] - a[1][1]) || 1, cx: (a[0][0] + a[1][0]) / 2, cy: (a[0][1] + a[1][1]) / 2 }; };
  cv.addEventListener('pointerdown', e => {
    pts.set(e.pointerId, raw(e)); try { cv.setPointerCapture(e.pointerId); } catch (er) { }
    if (pts.size === 2) { // second finger: cancel any drag and start pinch-zoom
      if (down) { const [x, y] = pos(e); if (S._ia) Interact.up(E, S, x, y); else E.pointer && E.pointer(S, 'up', x, y); S._ia = 0; down = false; }
      pan = null; pin = Object.assign(pinchInfo(), { s: Z.s, x: Z.x, y: Z.y }); return;
    }
    if (pts.size > 2) return;
    down = true; const [x, y] = pos(e); if (Interact.down(E, S, x, y)) { S._ia = 1; return; } S._ia = 0;
    if (Z.s > 1.01 && !E.pointer) { pan = { x0: raw(e)[0], y0: raw(e)[1], x: Z.x, y: Z.y }; cv.style.cursor = 'grabbing'; return; }
    E.pointer && E.pointer(S, 'down', x, y);
  });
  cv.addEventListener('pointermove', e => {
    if (pts.has(e.pointerId)) pts.set(e.pointerId, raw(e));
    if (pin && pts.size >= 2) { const p = pinchInfo(); const s2 = Math.max(1, Math.min(4, pin.s * p.d / pin.d)); Z.s = s2; Z.x = p.cx - (pin.cx - pin.x) * s2 / pin.s; Z.y = p.cy - (pin.cy - pin.y) * s2 / pin.s; R.zClamp(); return; }
    if (pan) { const [x, y] = raw(e); Z.x = pan.x + x - pan.x0; Z.y = pan.y + y - pan.y0; R.zClamp(); return; }
    const [x, y] = pos(e); if (down) { if (S._ia) { Interact.drag(E, S, x, y); return; } E.pointer && E.pointer(S, 'drag', x, y); } else { if (Interact.hover(E, S, x, y)) return; E.pointer && E.pointer(S, 'move', x, y); }
  });
  const up = e => { pts.delete(e.pointerId); if (pin) { if (pts.size < 2) pin = null; return; } if (pan) { pan = null; cv.style.cursor = ''; down = false; return; } if (!down) return; down = false; const [x, y] = pos(e); if (S._ia) { Interact.up(E, S, x, y); S._ia = 0; return; } E.pointer && E.pointer(S, 'up', x, y); };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  cv.addEventListener('pointerleave', () => { if (!down) { Interact.hov = null; } });
  cv.addEventListener('wheel', e => {
    if (e.ctrlKey || e.metaKey) { e.preventDefault(); const [x, y] = raw(e); R.zoomAt(Math.exp(-e.deltaY * .0025), x, y); return; } // ctrl+wheel or trackpad pinch
    const [x, y] = pos(e); if (Interact.wheel(E, S, x, y, e.deltaY)) { e.preventDefault(); return; } if (E.wheel) { e.preventDefault(); E.wheel(S, e.deltaY); } }, { passive: false });
  cv.addEventListener('dblclick', e => { E.pointer && E.pointer(S, 'dbl', ...pos(e)); });
};
/* experiment zoom: buttons, wheel and pinch; the view eases toward the target for the buttons */
Runner.zClamp = function () { const Z = this.Z; if (!Z || !this.S) return; const w = this.S.W || 800, h = this.S.H || 600; Z.s = Math.max(1, Math.min(4, Z.s)); Z.x = Math.min(0, Math.max(w - w * Z.s, Z.x)); Z.y = Math.min(0, Math.max(h - h * Z.s, Z.y)); };
Runner.zoomAt = function (f, x, y) { const Z = this.Z; if (!Z) return; const s2 = Math.max(1, Math.min(4, Z.s * f)); Z.x = x - (x - Z.x) * s2 / Z.s; Z.y = y - (y - Z.y) * s2 / Z.s; Z.s = s2; this.zClamp(); this.zShow(); };
Runner.zoomBy = function (f) { const S = this.S; if (!S) return; const Z = this.Z, w = S.W || 800, h = S.H || 600; const t = Z.t || (Z.t = { s: Z.s, x: Z.x, y: Z.y });
  const cx = w / 2, cy = h / 2, s2 = f === 0 ? 1 : Math.max(1, Math.min(4, t.s * f)); t.x = f === 0 ? 0 : cx - (cx - t.x) * s2 / t.s; t.y = f === 0 ? 0 : cy - (cy - t.y) * s2 / t.s; t.s = s2;
  t.x = Math.min(0, Math.max(w - w * s2, t.x)); t.y = Math.min(0, Math.max(h - h * s2, t.y)); this.toast(s2 === 1 ? 'الحجم الأصلي' : 'التكبير ' + Math.round(s2 * 100) + '%' + ' — اسحب الفراغ أو بإصبعين للتحريك', 'info'); };
Runner.zShow = function () { const Z = this.Z; if (Z) Z.t = null; clearTimeout(this._zt); this._zt = setTimeout(() => this.toast(Z.s < 1.01 ? 'الحجم الأصلي' : 'التكبير ' + Math.round(Z.s * 100) + '%', 'info'), 120); };
Runner.zStep = function (dt) { const Z = this.Z, t = Z && Z.t; if (!t) return; const k = Math.min(1, dt * 10); Z.s += (t.s - Z.s) * k; Z.x += (t.x - Z.x) * k; Z.y += (t.y - Z.y) * k; if (Math.abs(t.s - Z.s) < .002 && Math.abs(t.x - Z.x) < .3 && Math.abs(t.y - Z.y) < .3) { Z.s = t.s; Z.x = t.x; Z.y = t.y; Z.t = null; } };
/* compass grid sits right above the background: hook G.bg while an experiment draws */
(() => { const bg0 = G.bg; G.bg = function (ctx, w, h, grid) { bg0.call(G, ctx, w, h, grid); const S = Interact._drawS; if (S && S._tl && S._tl.grid && ctx.canvas === Runner.cv) Interact.grid(ctx, w, h, S); }; })();
