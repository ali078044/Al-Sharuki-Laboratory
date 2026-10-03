'use strict';
/* Grade 8 shared kit — M8.merge: one experiment made of several parts (الجزء 1، 2، 3…).
   Usage: define each part as a plain experiment-like object D {id, page, desc, tags, controls, steps, concl, setup, update, draw, drags, readings, explain, record, cols, graph, laws, tools, fig}
   register it with M8.P[D.id] = D; then M8.merge({ id, ch, sec, page, title, desc, tags, fact, quiz, parts:[{id, n:'part name'}] }).
   Each part keeps its own sub-state; switching parts swaps controls, info and data panels. Footer on canvas shows the part and its book page. */
const M8 = { P: {} };
M8.cur = () => { const S = Runner.S; return S && S._subs ? S._subs[S._part] : null; };
M8.merge = M => {
  const parts = M.parts.map(q => Object.assign({ D: M8.P[q.id] }, q));
  const cs = () => M8.cur();
  const wrapC = c => { if (c.type === 'buttons') return Object.assign({}, c, { btns: c.btns.map(b => Object.assign({}, b, { on: () => { const s = cs(); s && b.on(s); } })) });
    return Object.assign({}, c, { on: c.on ? (v, _S, init) => { const s = cs(); s && c.on(v, s, init); } : undefined }); };
  parts.forEach(P => { P.W = P.D.controls.map(wrapC); });
  const E = { id: M.id, ch: M.ch, sec: M.sec, page: M.page, kind: M.kind || 'نشاط', fig: M.fig, title: M.title, desc: M.desc, tags: M.tags + ' ' + parts.map(P => P.D.tags).join(' '), quiz: M.quiz, fact: M.fact,
    tools: [...new Set(parts.flatMap(P => P.D.tools || []))], laws: [...new Set(parts.flatMap(P => P.D.laws || []))], controls: [], steps: [], concl: [], cols: [['x', '—']], record: () => null, graph: null };
  const partCtl = SEL('part', 'الجزء', parts.map((P, i) => [P.id, (i + 1) + ') ' + P.n]), parts[0].id, (v, S, init) => { if (v !== S._part) M8.mPart(E, parts, partCtl, S, v, true); });
  E.controls = [partCtl].concat(parts[0].W);
  const mirror = (S, s) => { for (const k in s) { const v = s[k]; if (k[0] !== '_' && k !== 'W' && k !== 'H' && k !== 't' && (typeof v === 'number' || typeof v === 'boolean' || typeof v === 'string')) S['s_' + k] = v; } };
  const sync = S => { const s = S._subs[S._part]; s.W = S.W; s.H = S.H; s.t = S.t; mirror(S, s); return s; };
  E.setup = S => { const keep = S._part && S._subs; if (!keep) S._subs = {}; else S._subs[S._part] = null; M8.mPart(E, parts, partCtl, S, S._part || (parts.some(q => q.id === S.p.part) ? S.p.part : parts[0].id), !!keep); };
  E.update = (S, dt) => { const s = sync(S), P = parts.find(q => q.id === S._part); P.D.update && P.D.update(s, dt); };
  E.draw = (ctx, w, h, S) => { if (w < 80 || h < 80) { G.bg(ctx, w, h, false); return; } const s = sync(S), P = parts.find(q => q.id === S._part); s.W = w; s.H = h; P.D.draw(ctx, w, h, s);
    const i = parts.indexOf(P); C2.T(ctx, 'الجزء ' + (i + 1) + ' من ' + parts.length + ': ' + P.n + ' — ص ' + P.D.page, 76, h - 22, { s: 11.5, w: 900, c: '#fff', bg: 'rgba(15,118,110,.9)', a: 'left' }); };
  E.drags = S => { if (!S._subs) return []; const s = sync(S), P = parts.find(q => q.id === S._part); if (!P.D.drags) return [];
    return (P.D.drags(s) || []).map(o => { const n = Object.assign({}, o); ['down', 'drag', 'up', 'click', 'wheel'].forEach(f => { if (o[f]) n[f] = (_S, ...a) => { const r = o[f](s, ...a); mirror(_S, s); return r; }; }); return n; }); };
  E.readings = S => { const s = S._subs && S._subs[S._part]; const P = parts.find(q => q.id === S._part); return s && P.D.readings ? P.D.readings(s) : []; };
  E.explain = S => { const s = S._subs && S._subs[S._part]; const P = parts.find(q => q.id === S._part); if (!s) return ''; return '<div style="font-size:.85em;color:#0f766e;margin-bottom:4px"><b>' + P.n + '</b> (ص ' + P.D.page + ')</div>' + (P.D.explain ? P.D.explain(s) : ''); };
  X8(E); return E;
};
M8.mPart = (E, parts, partCtl, S, id, ui) => {
  const P = parts.find(q => q.id === id) || parts[0]; S._part = P.id;
  let s = S._subs[P.id];
  if (!s) { s = { p: {}, t: S.t || 0, rows: [], W: S.W, H: S.H, E: { controls: P.W } }; P.D.controls.forEach(c => { if (c.k) s.p[c.k] = c.val; }); S._subs[P.id] = s; P.D.setup && P.D.setup(s); }
  s.p.part = P.id; S.p = s.p; S.rows = s.rows;
  const D = P.D; E.controls = [partCtl].concat(P.W); E.steps = D.steps; E.concl = D.concl; E.desc = P.n + ' (ص ' + D.page + '): ' + D.desc; E.cols = D.cols || [['x', '—']];
  E.record = D.record ? (S2 => D.record(S2._subs[S2._part])) : null; E.graph = D.graph || null; E.fig = D.fig;
  if (ui && Runner.S === S) { try { Runner.info(E); Runner.dataPanel(E, S); Runner.controls(E, S); } catch (e) { console.warn(e); } }
};

