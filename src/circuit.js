'use strict';
/* =====================================================================
   Circuit engine: Modified Nodal Analysis, trapezoidal/BE companions,
   Newton-Raphson for diodes, neon lamp, Kirchhoff (KCL/KVL) reporting
   ===================================================================== */
const GRID = 20;
const CT = {
  wire:      { name: 'سلك توصيل', short: 'سلك', bh: 0 },
  battery:   { name: 'بطارية (مصدر مستمر)', short: 'بطارية', val: 12, unit: 'V', bh: 26, sym: 'ε' },
  ac:        { name: 'مصدر متناوب (مذبذب)', short: 'مصدر AC', val: 10, unit: 'V', bh: 26, sym: 'V' },
  resistor:  { name: 'مقاومة', short: 'مقاومة', val: 100, unit: 'Ω', bh: 22, sym: 'R' },
  rheostat:  { name: 'مقاومة متغيرة (ريوستات)', short: 'ريوستات', val: 50, unit: 'Ω', bh: 26, sym: 'R' },
  capacitor: { name: 'متسعة', short: 'متسعة', val: 100, unit: 'µF', bh: 16, sym: 'C' },
  inductor:  { name: 'محث (ملف)', short: 'محث', val: 0.5, unit: 'H', bh: 26, sym: 'L' },
  switch:    { name: 'مفتاح كهربائي', short: 'مفتاح', bh: 20 },
  bulb:      { name: 'مصباح', short: 'مصباح', val: 20, unit: 'Ω', bh: 16, sym: 'R' },
  voltmeter: { name: 'فولطميتر', short: 'فولطميتر', bh: 18 },
  ammeter:   { name: 'أميتر', short: 'أميتر', bh: 18 },
  galvanometer: { name: 'كلفانوميتر', short: 'كلفانوميتر', bh: 18 },
  diode:     { name: 'ثنائي بلوري (pn)', short: 'ثنائي', bh: 16 },
  led:       { name: 'ثنائي باعث للضوء LED', short: 'LED', bh: 14 },
  photodiode:{ name: 'ثنائي متحسس للضوء', short: 'ثنائي ضوئي', bh: 14 },
  neon:      { name: 'مصباح نيون', short: 'نيون', bh: 16 }
};
const LED_COL = { red: { Is: 1e-18, n: 2, c: '#ff3b3b', nm: 630, name: 'أحمر' }, yellow: { Is: 3e-19, n: 2, c: '#ffd21f', nm: 590, name: 'أصفر' }, green: { Is: 1e-20, n: 2, c: '#2ee86b', nm: 530, name: 'أخضر' }, blue: { Is: 1e-28, n: 2, c: '#3b82ff', nm: 470, name: 'أزرق' } };

class Circuit {
  constructor() { this.comps = []; this.t = 0; this.dt = 1e-4; this.uid = 1; this.nodes = []; this.hasAC = false; this.running = false; this.method = 'trap'; this.beSteps = 0; this.warn = ''; this.kcl = []; this.kvl = []; this.flow = 'conv'; }
  add(type, x1, y1, x2, y2, props = {}) {
    const d = CT[type];
    const c = { id: props.id || (type[0].toUpperCase() + (this.uid++)), type, p1: { x: x1 * GRID, y: y1 * GRID }, p2: { x: x2 * GRID, y: y2 * GRID }, v: 0, i: 0, vPrev: 0, iPrev: 0, v2: 0, i2: 0, p: 0, pAvg: 0, vis: 0, phase: 0, buf: [] };
    if (d.val !== undefined) c.val = d.val;
    if (type === 'battery') c.r = 0;
    if (type === 'ac') { c.f = 50; c.ph = 0; }
    if (type === 'bulb') c.rated = 3;
    if (type === 'switch') c.closed = false;
    if (type === 'led') c.color = 'red';
    if (type === 'photodiode') c.light = 0;
    if (type === 'neon') { c.on = false; c.strike = 80; c.keep = 55; c.Ron = 400; }
    if (type === 'inductor') c.core = false;
    Object.assign(c, props);
    this.comps.push(c); this.dirty = true; return c;
  }
  get(id) { return this.comps.find(c => c.id === id); }
  remove(c) { this.comps = this.comps.filter(x => x !== c); this.dirty = true; }
  clear() { this.comps = []; this.t = 0; this.dirty = true; }
  resetState() { this.t = 0; this.comps.forEach(c => { c.v = c.i = c.vPrev = c.iPrev = c.v2 = c.i2 = c.p = c.pAvg = c.vis = 0; c.vd = 0; c.buf = []; c.lastS = -1; c.th = 0; c.burnt = false; if (c.type === 'neon') c.on = false; if (c.q0 !== undefined) c.vPrev = c.q0; }); this.beSteps = 2; }
  topology() {
    const key = p => p.x + ',' + p.y; const map = new Map(); const cnt = new Map();
    this.comps.forEach(c => { [c.p1, c.p2].forEach(p => { const k = key(p); if (!map.has(k)) { map.set(k, map.size); } cnt.set(k, (cnt.get(k) || 0) + 1); }); });
    this.nodes = []; map.forEach((i, k) => { const [x, y] = k.split(',').map(Number); this.nodes[i] = { x, y, n: cnt.get(k) }; });
    this.comps.forEach(c => { c.n1 = map.get(key(c.p1)); c.n2 = map.get(key(c.p2)); });
    this.open = this.nodes.map((n, i) => n.n === 1 && !this.comps.some(c => (c.n1 === i || c.n2 === i) && c.type === 'voltmeter'));
    this.hasAC = this.comps.some(c => c.type === 'ac');
    this.dirty = false; this.beSteps = 2;
  }
  maxFreq() { let f = 0; this.comps.forEach(c => { if (c.type === 'ac') f = Math.max(f, c.f); }); return f; }

  /* one time step */
  step(dt, retry) {
    if (this.dirty) this.topology();
    const N = this.nodes.length; if (N < 2) { this.t += dt; return; }
    const src = this.comps.filter(c => c.type === 'battery' || c.type === 'ac');
    const M = N - 1 + src.length;
    const be = this.beSteps > 0 || this.method === 'be';
    const nonlin = this.comps.filter(c => c.type === 'diode' || c.type === 'led' || c.type === 'photodiode');
    const A = []; for (let i = 0; i < M; i++) A.push(new Float64Array(M));
    const B = new Float64Array(M);
    let x = null;
    for (let iter = 0; iter < 60; iter++) {
      for (let i = 0; i < M; i++) { A[i].fill(0); } B.fill(0);
      const ix = n => n - 1; // node 0 = ground
      const stampG = (n1, n2, G) => { const a = ix(n1), b = ix(n2); if (n1) A[a][a] += G; if (n2) A[b][b] += G; if (n1 && n2) { A[a][b] -= G; A[b][a] -= G; } };
      const stampI = (n1, n2, I) => { if (n1) B[ix(n1)] -= I; if (n2) B[ix(n2)] += I; }; // current I flowing n1->n2 inside element (constant part)
      for (let n = 1; n < N; n++) A[n - 1][n - 1] += 1e-11; // gmin
      let k = N - 1;
      for (const c of this.comps) {
        const { n1, n2 } = c;
        switch (c.type) {
          case 'wire': stampG(n1, n2, 1e4); break;
          case 'ammeter': case 'galvanometer': stampG(n1, n2, c.burnt ? 1e-12 : c.type === 'ammeter' ? 1e3 : 50); break;
          case 'switch': stampG(n1, n2, c.closed ? 1e4 : 1e-12); break;
          case 'resistor': case 'bulb': case 'rheostat': stampG(n1, n2, c.burnt ? 1e-12 : 1 / Math.max(1e-6, c.val)); break;
          case 'voltmeter': stampG(n1, n2, 1e-9); break;
          case 'capacitor': { const C = c.val * 1e-6; if (be) { const Gc = C / dt; stampG(n1, n2, Gc); stampI(n1, n2, -Gc * c.vPrev); } else { const Gc = 2 * C / dt; stampG(n1, n2, Gc); stampI(n1, n2, -(Gc * c.vPrev + c.iPrev)); } break; }
          case 'inductor': { const L = Math.max(1e-9, c.val), rs = c.rs || 0; if (be) { const k = 1 + dt * rs / L; const Gl = dt / L / k; stampG(n1, n2, Gl); stampI(n1, n2, c.iPrev / k); } else { const Gl = 1 / (2 * L / dt + rs); stampG(n1, n2, Gl); stampI(n1, n2, Gl * c.vPrev + c.iPrev * (2 * L / dt - rs) * Gl); } break; }
          case 'neon': stampG(n1, n2, c.on ? 1 / c.Ron : 1e-10); break;
          case 'diode': case 'led': case 'photodiode': {
            const pr = c.type === 'led' ? LED_COL[c.color] : { Is: 1e-14, n: 1 };
            const vt = 0.02585 * pr.n; const vd = c.vd || 0;
            const ex = Math.exp(Math.min(vd / vt, 80));
            const Id = pr.Is * (ex - 1), Gd = pr.Is * ex / vt + 1e-12;
            let Ieq = Id - Gd * vd; if (c.type === 'photodiode') Ieq -= (c.light || 0) * 1e-6;
            stampG(n1, n2, Gd); stampI(n1, n2, Ieq); break;
          }
          case 'battery': case 'ac': {
            const E = c.type === 'battery' ? c.val : c.val * Math.sin((c.th || 0) + TAU * c.f * dt + (c.ph || 0));
            if (n1) { A[ix(n1)][k] += 1; A[k][ix(n1)] += 1; }
            if (n2) { A[ix(n2)][k] -= 1; A[k][ix(n2)] -= 1; }
            A[k][k] -= (c.r || 0); B[k] = E; c.k = k; k++; break;
          }
        }
      }
      x = Circuit.solve(A, B);
      if (!x) { this.warn = 'تعذّر حل الدائرة'; break; }
      if (!nonlin.length) break;
      let conv = true;
      const V = n => n ? x[n - 1] : 0;
      for (const c of nonlin) {
        const pr = c.type === 'led' ? LED_COL[c.color] : { Is: 1e-14, n: 1 };
        const vt = 0.02585 * pr.n, vcrit = vt * Math.log(vt / (Math.SQRT2 * pr.Is));
        let vn = V(c.n1) - V(c.n2), vo = c.vd || 0;
        if (vn > vcrit && Math.abs(vn - vo) > 2 * vt) { if (vo > 0) { const a = 1 + (vn - vo) / vt; vn = a > 0 ? vo + vt * Math.log(a) : vcrit; } else vn = vt * Math.log(vn / vt); }
        if (Math.abs(vn - vo) > 1e-6) conv = false; c.vd = vn;
      }
      if (conv) break;
    }
    if (!x) return;
    const V = n => n ? x[n - 1] : 0;
    if (!retry) { let redo = false; for (const c of this.comps) if (c.type === 'neon' && !c.on && Math.abs(V(c.n1) - V(c.n2)) > c.strike) { c.on = true; redo = true; } if (redo) { this.beSteps = Math.max(this.beSteps, 2); return this.step(dt, true); } }
    this.nodeV = []; for (let n = 0; n < N; n++) this.nodeV[n] = V(n);
    let neonChange = false;
    for (const c of this.comps) {
      const v = V(c.n1) - V(c.n2); c.v = v; let i = 0;
      switch (c.type) {
        case 'wire': i = v * 1e4; break;
        case 'ammeter': i = v * (c.burnt ? 1e-12 : 1e3); break; case 'galvanometer': i = v * 50; break;
        case 'switch': i = v * (c.closed ? 1e4 : 1e-12); break;
        case 'resistor': case 'bulb': case 'rheostat': i = c.burnt ? v * 1e-12 : v / c.val; break;
        case 'voltmeter': i = v * 1e-9; break;
        case 'capacitor': { const C = c.val * 1e-6; i = be ? C / dt * (v - c.vPrev) : 2 * C / dt * (v - c.vPrev) - c.iPrev; c.vPrev = v; c.iPrev = i; break; }
        case 'inductor': { const L = Math.max(1e-9, c.val), rs = c.rs || 0; if (be) { const k = 1 + dt * rs / L; i = (c.iPrev + dt / L * v) / k; } else { const Gl = 1 / (2 * L / dt + rs); i = Gl * (v + c.vPrev) + c.iPrev * (2 * L / dt - rs) * Gl; } c.vPrev = v; c.iPrev = i; break; }
        case 'neon': i = c.on ? v / c.Ron : v * 1e-10; if (c.on || Math.abs(v) <= c.strike) c.peak = Math.max(c.peak || 0, Math.abs(v)); if (!c.on && Math.abs(v) > c.strike) { c.on = true; neonChange = true; } else if (c.on && Math.abs(v) < c.keep) { c.on = false; } if (c.on) { c.flash = true; } break;
        case 'diode': case 'led': case 'photodiode': { const pr = c.type === 'led' ? LED_COL[c.color] : { Is: 1e-14, n: 1 }; const vt = .02585 * pr.n; i = pr.Is * (Math.exp(Math.min(v / vt, 80)) - 1) - (c.type === 'photodiode' ? (c.light || 0) * 1e-6 : 0); break; }
        case 'battery': case 'ac': i = x[c.k]; break;
      }
      c.i = i; c.p = v * i;
    }
    for (const c of src) if (c.type === 'ac') c.th = ((c.th || 0) + TAU * c.f * dt) % TAU;
    if (neonChange) this.beSteps = Math.max(this.beSteps, 1);
    if (this.beSteps > 0) this.beSteps--;
    this.t += dt;
    // rms / averaging
    const f = this.maxFreq(); const tau = f > 0 ? Math.max(2 / f, 0.02) : 0.05; const a = Math.min(1, dt / tau);
    for (const c of this.comps) {
      c.v2 += (c.v * c.v - c.v2) * a; c.i2 += (c.i * c.i - c.i2) * a; c.pAvg += (Math.abs(c.p) - c.pAvg) * a;
      if (c.probe && this.t - (c.lastS ?? -1) >= (this.probeDt || 0)) { c.lastS = this.t; c.buf.push([this.t, c.v, c.i]); if (c.buf.length > 1500) c.buf.shift(); }
    }
    if (this.allowBurn) for (const c of this.comps) { if (c.burnt) continue; if ((c.type === 'bulb' && c.pAvg > 3 * (c.rated || 3) && this.t > .05) || (c.type === 'ammeter' && Math.abs(c.i) > (c.imax || 10))) { c.burnt = true; this.dirty = false; this.beSteps = 2; this.onBurn && this.onBurn(c); } }
    let short = this.comps.some(c => (c.type === 'battery' || c.type === 'ac') && Math.abs(c.i) > 200);
    this.warn = short ? 'تحذير: دائرة قِصَر! التيار كبير جداً' : '';
  }
  static solve(A, B) {
    const n = B.length; const b = Float64Array.from(B);
    for (let i = 0; i < n; i++) {
      let mx = Math.abs(A[i][i]), r = i;
      for (let k = i + 1; k < n; k++) { const v = Math.abs(A[k][i]); if (v > mx) { mx = v; r = k; } }
      if (mx < 1e-300) return null;
      if (r !== i) { const t = A[i]; A[i] = A[r]; A[r] = t; const tb = b[i]; b[i] = b[r]; b[r] = tb; }
      const p = A[i][i];
      for (let k = i + 1; k < n; k++) { const f = A[k][i] / p; if (f === 0) continue; const Ak = A[k], Ai = A[i]; for (let j = i; j < n; j++) Ak[j] -= f * Ai[j]; b[k] -= f * b[i]; }
    }
    const x = new Float64Array(n);
    for (let i = n - 1; i >= 0; i--) { let s = b[i]; for (let j = i + 1; j < n; j++) s -= A[i][j] * x[j]; x[i] = s / A[i][i]; }
    return x;
  }
  /* run for a frame worth of simulated time */
  advance(simTime, maxSteps = 4000) {
    if (this.dirty) this.topology();
    const f = this.maxFreq();
    let dt = this.fixedDt || (f > 0 ? Math.min(1e-3, 1 / (f * 160)) : 1e-3);
    let n = Math.ceil(simTime / dt); if (n > maxSteps) { n = maxSteps; }
    for (let s = 0; s < n; s++) this.step(dt);
    this.dt = dt;
  }
  reading(c) {
    // what a meter / label shows
    if (this.hasAC && c.type !== 'galvanometer') return { v: Math.sqrt(c.v2), i: Math.sqrt(c.i2), rms: true };
    return { v: c.v, i: c.i, rms: false };
  }
  /* ---------- Kirchhoff analysis ---------- */
  kirchhoff() {
    if (this.dirty) this.topology();
    const N = this.nodes.length; const out = { kcl: [], kvl: [] };
    const lab = c => c.label || c.id;
    // KCL at junctions (nodes with >=3 connections)
    for (let n = 0; n < N; n++) {
      if (this.nodes[n].n < 3) continue;
      const terms = []; let sum = 0;
      this.comps.forEach(c => { if (c.type === 'voltmeter') return; if (c.n1 === n) { terms.push([lab(c), c.i]); sum += c.i; } if (c.n2 === n) { terms.push([lab(c), -c.i]); sum -= c.i; } });
      out.kcl.push({ node: n, terms, sum });
    }
    // KVL on fundamental loops (spanning tree via BFS). Skip ideal wires? keep all except voltmeters
    const edges = this.comps.filter(c => c.type !== 'voltmeter' && !(c.type === 'switch' && !c.closed));
    const adj = Array.from({ length: N }, () => []);
    edges.forEach((c, ei) => { adj[c.n1].push([c.n2, ei, 1]); adj[c.n2].push([c.n1, ei, -1]); });
    const par = new Array(N).fill(-1), parE = new Array(N).fill(-1), parD = new Array(N).fill(0), depth = new Array(N).fill(-1);
    const tree = new Set();
    for (let s = 0; s < N; s++) {
      if (depth[s] >= 0) continue; depth[s] = 0; const q = [s];
      while (q.length) { const u = q.shift(); for (const [v, ei, d] of adj[u]) { if (depth[v] < 0) { depth[v] = depth[u] + 1; par[v] = u; parE[v] = ei; parD[v] = d; tree.add(ei); q.push(v); } } }
    }
    edges.forEach((c, ei) => {
      if (tree.has(ei) || c.n1 === c.n2) return;
      // path from n2 back to n1 through tree, then edge n1->n2
      let a = c.n1, b = c.n2; const pa = [], pb = [];
      while (depth[a] > depth[b]) { pa.push([parE[a], -parD[a]]); a = par[a]; }
      while (depth[b] > depth[a]) { pb.push([parE[b], parD[b]]); b = par[b]; }
      while (a !== b && a >= 0 && b >= 0) { pa.push([parE[a], -parD[a]]); a = par[a]; pb.push([parE[b], parD[b]]); b = par[b]; }
      if (a < 0 || b < 0) return;
      // loop: go n1 -> (edge c) -> n2 -> up to LCA (reverse of pb) -> down to n1 (reverse pa)
      const seq = [[ei, 1]]; for (let i = 0; i < pb.length; i++) seq.push([pb[i][0], -pb[i][1]]); for (let i = pa.length - 1; i >= 0; i--) seq.push([pa[i][0], -pa[i][1]]);
      // drop pure-wire loops
      const items = seq.map(([e, d]) => [edges[e], d]);
      if (items.every(([c]) => ['wire', 'ammeter', 'switch'].includes(c.type))) return;
      let sum = 0; const terms = [];
      items.forEach(([c, d]) => { const dv = d * c.v; sum += dv; if (!['wire'].includes(c.type)) terms.push([lab(c), dv]); });
      out.kvl.push({ terms, sum });
    });
    return out;
  }
  bbox() { let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; this.comps.forEach(c => [c.p1, c.p2].forEach(p => { x0 = Math.min(x0, p.x); y0 = Math.min(y0, p.y); x1 = Math.max(x1, p.x); y1 = Math.max(y1, p.y); })); if (x0 > x1) return { x0: 0, y0: 0, x1: 400, y1: 300 }; return { x0, y0, x1, y1 }; }
  toJSON() { return this.comps.map(c => { const o = { type: c.type, p1: c.p1, p2: c.p2 }; ['val', 'r', 'f', 'closed', 'color', 'light', 'rated', 'label', 'q0'].forEach(k => { if (c[k] !== undefined) o[k] = c[k]; }); return o; }); }
  load(arr) { this.clear(); arr.forEach(o => { const c = this.add(o.type, 0, 0, 0, 0, {}); Object.assign(c, JSON.parse(JSON.stringify(o))); }); this.dirty = true; }
}

/* =====================================================================
   Renderer (schematic + realistic)
   ===================================================================== */
const RES_COL = ['#111', '#7a4a1e', '#d11', '#f60', '#fd0', '#1a3', '#14c', '#81c', '#888', '#fff'];
const CRender = {
  draw(ctx, C, cam, w, h, o = {}) {
    const real = o.mode === 'realistic';
    // background
    if (real) { G.bg(ctx, w, h, false); ctx.save(); ctx.translate(cam.x, cam.y); ctx.scale(cam.z, cam.z); this.grid(ctx, cam, w, h, 'rgba(140,170,230,.10)'); }
    else { const cvb = ctx.canvas; const rw = cvb.__raw; cvb.__raw = true; ctx.fillStyle = o.dark ? '#0f1729' : '#ffffff'; ctx.fillRect(0, 0, w, h); cvb.__raw = rw; ctx.save(); ctx.translate(cam.x, cam.y); ctx.scale(cam.z, cam.z); this.grid(ctx, cam, w, h, o.dark ? 'rgba(140,170,230,.14)' : 'rgba(31,94,255,.13)'); }
    const ink = real ? '#dfe7f5' : (o.dark ? '#dfe7f5' : '#1b2437');
    for (const c of C.comps) this.comp(ctx, C, c, real, ink, c === o.sel, o);
    // junction dots & open ends
    if (C.nodes) C.nodes.forEach((n, i) => {
      if (n.n >= 3) { ctx.fillStyle = real ? '#e2e8f0' : ink; ctx.beginPath(); ctx.arc(n.x, n.y, 4, 0, TAU); ctx.fill(); }
      if (o.showOpen && C.open && C.open[i]) { ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(n.x, n.y, 7 + Math.sin(performance.now() / 150) * 2, 0, TAU); ctx.stroke(); }
    });
    if (o.ghost) { ctx.globalAlpha = .6; this.comp(ctx, C, o.ghost, real, ink, false, o); ctx.globalAlpha = 1; }
    ctx.restore();
  },
  grid(ctx, cam, w, h, col) {
    const x0 = -cam.x / cam.z, y0 = -cam.y / cam.z, x1 = x0 + w / cam.z, y1 = y0 + h / cam.z;
    ctx.fillStyle = col; const s = GRID;
    if (cam.z < .45) return;
    for (let x = Math.floor(x0 / s) * s; x < x1; x += s) for (let y = Math.floor(y0 / s) * s; y < y1; y += s) ctx.fillRect(x - .8, y - .8, 1.6, 1.6);
  },
  comp(ctx, C, c, real, ink, sel, o) {
    const dx = c.p2.x - c.p1.x, dy = c.p2.y - c.p1.y, L = Math.hypot(dx, dy); if (L < 1) return;
    const ang = Math.atan2(dy, dx); const mx = (c.p1.x + c.p2.x) / 2, my = (c.p1.y + c.p2.y) / 2;
    const bh = Math.min(CT[c.type].bh, L / 2 - 4);
    ctx.save(); ctx.translate(mx, my); ctx.rotate(ang);
    if (sel) { ctx.strokeStyle = 'rgba(31,94,255,.35)'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-L / 2, 0); ctx.lineTo(L / 2, 0); ctx.stroke(); }
    // leads
    const leadCol = real ? '#b9c4d6' : ink;
    ctx.lineCap = 'round';
    if (c.type === 'wire') {
      if (real) { ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-L / 2, 0); ctx.lineTo(L / 2, 0); ctx.stroke(); ctx.strokeStyle = c.col || '#e5484d'; ctx.lineWidth = 3.4; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-L / 2, -1); ctx.lineTo(L / 2, -1); ctx.stroke(); }
      else { ctx.strokeStyle = ink; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(-L / 2, 0); ctx.lineTo(L / 2, 0); ctx.stroke(); }
    } else {
      if (real) { ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-L / 2, 0); ctx.lineTo(-bh, 0); ctx.moveTo(bh, 0); ctx.lineTo(L / 2, 0); ctx.stroke(); }
      ctx.strokeStyle = real ? '#c9d3e3' : ink; ctx.lineWidth = real ? 2.6 : 2.2; ctx.beginPath(); ctx.moveTo(-L / 2, 0); ctx.lineTo(-bh, 0); ctx.moveTo(bh, 0); ctx.lineTo(L / 2, 0); ctx.stroke();
      if (real) { const rw = ctx.canvas.__raw; ctx.canvas.__raw = true; try { this.R[c.type].call(this, ctx, c, bh, ink, C, ang); } finally { ctx.canvas.__raw = rw; } } else this.S[c.type].call(this, ctx, c, bh, ink, C, ang);
    }
    if (o.inner !== false && (c.type === 'capacitor' || c.type === 'inductor')) this.inner(ctx, c, bh, real, ang);
    if (c.burnt) { ctx.save(); ctx.rotate(-ang); ctx.fillStyle = 'rgba(60,60,60,.25)'; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(-6 + k * 6, -22 - k * 7 - (performance.now() / 60 % 10), 6 + k * 2, 0, TAU); ctx.fill(); } ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-12, -12); ctx.lineTo(12, 12); ctx.moveTo(12, -12); ctx.lineTo(-12, 12); ctx.stroke(); ctx.restore(); }
    // moving charges
    if (C.running && o.flow !== false && Math.abs(c.i) > 2e-6 && !['voltmeter'].includes(c.type)) {
      const sgn = (C.flow === 'elec' ? -1 : 1) * Math.sign(c.i);
      ctx.fillStyle = C.flow === 'elec' ? '#7dd3fc' : '#ffd166';
      const sp = 14, off = ((c.phase % sp) + sp) % sp;
      const segs = c.type === 'wire' ? [[-L / 2, L / 2]] : [[-L / 2, -bh], [bh, L / 2]];
      for (const [a, b] of segs) for (let d = a + off; d < b; d += sp) { ctx.beginPath(); ctx.arc(d, 0, 2.2, 0, TAU); ctx.fill(); }
      void sgn;
    }
    ctx.restore();
    // endpoints
    if (o.editable) { ctx.fillStyle = sel ? '#1f5eff' : (real ? 'rgba(220,230,250,.55)' : 'rgba(27,36,55,.35)'); [c.p1, c.p2].forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, sel ? 4.5 : 3, 0, TAU); ctx.fill(); }); }
    // label (upright)
    if (o.labels !== false && c.type !== 'wire') this.label(ctx, c, mx, my, ang, real, ink, C);
  },
  inner(ctx, c, bh, real, ang) {
    const rw = ctx.canvas.__raw; ctx.canvas.__raw = true;
    if (c.type === 'capacitor') {
      const v = c.v || 0; c._vm = Math.max((c._vm || 0) * .9995, Math.abs(v), 1e-6); const q = Math.abs(v) / c._vm;
      if (Math.abs(v) > 1e-3) {
        const n = Math.round(1 + 4 * q); const gx = real ? bh + 7 : 10; const sp = n > 1 ? 22 / (n - 1) : 0;
        for (let k = 0; k < n; k++) { const y = n > 1 ? -11 + k * sp : 0; [[-gx, v > 0], [gx, v <= 0]].forEach(([x, pos]) => { ctx.save(); ctx.translate(x, y); ctx.rotate(-ang); ctx.fillStyle = pos ? 'rgba(220,38,38,.92)' : 'rgba(37,99,235,.92)'; ctx.beginPath(); ctx.arc(0, 0, 4.6, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(-2.6, 0); ctx.lineTo(2.6, 0); if (pos) { ctx.moveTo(0, -2.6); ctx.lineTo(0, 2.6); } ctx.stroke(); ctx.restore(); }); }
        if (!real) { ctx.globalAlpha = .35 + .6 * q; const d = v > 0 ? 1 : -1; [-8, 0, 8].forEach(y => G.arrow(ctx, -3 * d, y, 3 * d, y, '#ea580c', 1.2, 4)); ctx.globalAlpha = 1; }
      }
    } else {
      const i = c.i || 0; c._im = Math.max((c._im || 0) * .9995, Math.abs(i), 1e-9); const q = Math.abs(i) / c._im;
      if (Math.abs(i) > 1e-6 && q > .03) {
        ctx.globalAlpha = .25 + .65 * q; ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 1.4; ctx.setLineDash([4, 3]);
        for (let k = 0; k < 2; k++) { ctx.beginPath(); ctx.ellipse(0, 0, bh + 8 + k * 9, 16 + k * 9, 0, 0, TAU); ctx.stroke(); }
        ctx.setLineDash([]); const d = i > 0 ? 1 : -1;
        G.arrow(ctx, -bh * .6 * d, 0, bh * .6 * d, 0, '#2563eb', 2, 7);
        [16, 25].forEach(r => { G.arrow(ctx, 4 * d, -r, -4 * d, -r, '#2563eb', 1.4, 5); G.arrow(ctx, 4 * d, r, -4 * d, r, '#2563eb', 1.4, 5); });
        ctx.globalAlpha = 1;
      }
    }
    ctx.canvas.__raw = rw;
  },
  label(ctx, c, mx, my, ang, real, ink, C) {
    let t = '';
    const r = C.reading(c);
    switch (c.type) {
      case 'battery': t = fmtSI(c.val, 'V'); break;
      case 'ac': t = fmtSI(c.val, 'V') + ' ~ ' + fmtSI(c.f, 'Hz'); break;
      case 'resistor': case 'rheostat': case 'bulb': t = fmtSI(c.val, 'Ω'); break;
      case 'capacitor': t = fmtSI(c.val * 1e-6, 'F'); break;
      case 'inductor': t = fmtSI(c.val, 'H'); break;
      case 'voltmeter': t = fmtSI(C.running ? r.v : 0, 'V'); break;
      case 'ammeter': t = fmtSI(C.running ? r.i : 0, 'A'); break;
      case 'galvanometer': t = fmtSI(C.running ? c.i : 0, 'A'); break;
      case 'switch': t = c.closed ? 'مغلق' : 'مفتوح'; break;
      case 'led': t = 'LED ' + LED_COL[c.color].name; break;
      case 'neon': t = 'نيون'; break;
      case 'diode': t = 'pn'; break;
      case 'photodiode': t = 'ضوء ' + Math.round(c.light || 0) + '%'; break;
    }
    if (c.label) t = c.label + (t ? ' : ' + t : '');
    if (c.burnt) t = (c.type === 'bulb' ? 'احترق المصباح!' : 'تلف الأميتر!');
    let nx = -Math.sin(ang), ny = Math.cos(ang); if (ny < 0 || (Math.abs(ny) < .01 && nx > 0)) { nx = -nx; ny = -ny; }
    const vert = Math.abs(nx) > .7; const off = vert ? CT[c.type].bh + 10 : (['voltmeter', 'ammeter', 'galvanometer'].includes(c.type) ? 34 : 26);
    let x = mx - nx * off, y = my - ny * off;
    const meter = ['voltmeter', 'ammeter', 'galvanometer'].includes(c.type);
    ctx.direction = /^[\u0600-\u06FF]/.test(t) ? 'rtl' : 'ltr'; ctx.font = `${meter ? 800 : 700} ${meter ? 12.5 : 11.5}px ${meter ? 'ui-monospace,monospace' : 'Tajawal,sans-serif'}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    let wdt = ctx.measureText(t).width + 10; if (vert) x += (x < mx ? -1 : 1) * wdt / 2;
    if (meter || real) { ctx.fillStyle = meter ? (real ? '#0b1a10' : '#0f172a') : 'rgba(10,17,32,.75)'; rr(ctx, x - wdt / 2, y - 9, wdt, 18, 5); ctx.fill(); ctx.fillStyle = meter ? '#9fe870' : '#dbe6ff'; }
    else ctx.fillStyle = ink;
    ctx.fillText(t, x, y); ctx.textBaseline = 'alphabetic';
  },
  /* ---------------- schematic symbols ---------------- */
  S: {
    resistor(ctx, c, bh, ink) { ctx.strokeStyle = ink; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(-bh, 0); const n = 6; for (let i = 1; i <= n; i++) ctx.lineTo(-bh + i * 2 * bh / n - bh / n, (i % 2 ? -1 : 1) * 8); ctx.lineTo(bh, 0); ctx.stroke(); },
    rheostat(ctx, c, bh, ink) { this.S.resistor(ctx, c, bh, ink); G.arrow(ctx, -bh + 2, 14, bh - 2, -14, ink, 1.8, 7); },
    bulb(ctx, c, bh, ink) { ctx.strokeStyle = ink; ctx.lineWidth = 2.2; const g = c.vis || 0; if (g > .02) { G.glow(ctx, 0, 0, 30, 'rgba(255,214,90,A)', Math.min(1, g)); } ctx.beginPath(); ctx.arc(0, 0, bh, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-bh * .7, -bh * .7); ctx.lineTo(bh * .7, bh * .7); ctx.moveTo(-bh * .7, bh * .7); ctx.lineTo(bh * .7, -bh * .7); ctx.stroke(); },
    battery(ctx, c, bh, ink) { ctx.strokeStyle = ink; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(-bh, 0); ctx.lineTo(-5, 0); ctx.moveTo(5, 0); ctx.lineTo(bh, 0); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-5, -15); ctx.lineTo(-5, 15); ctx.stroke(); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(5, -8); ctx.lineTo(5, 8); ctx.stroke(); ctx.fillStyle = '#e11d48'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('+', -14, -9); },
    ac(ctx, c, bh, ink) { ctx.strokeStyle = ink; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.arc(0, 0, bh - 4, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-bh, 0); ctx.lineTo(-bh + 4, 0); ctx.moveTo(bh - 4, 0); ctx.lineTo(bh, 0); ctx.stroke(); ctx.beginPath(); for (let x = -12; x <= 12; x++) { const y = -7 * Math.sin(x / 12 * Math.PI); x === -12 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); },
    capacitor(ctx, c, bh, ink) { ctx.strokeStyle = ink; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(-bh, 0); ctx.lineTo(-4, 0); ctx.moveTo(4, 0); ctx.lineTo(bh, 0); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-4, -14); ctx.lineTo(-4, 14); ctx.moveTo(4, -14); ctx.lineTo(4, 14); ctx.stroke(); },
    inductor(ctx, c, bh, ink) { ctx.strokeStyle = ink; ctx.lineWidth = 2.2; const n = 4, w = 2 * bh / n; ctx.beginPath(); for (let i = 0; i < n; i++) ctx.arc(-bh + w / 2 + i * w, 0, w / 2, Math.PI, 0); ctx.stroke(); if (c.core) { ctx.beginPath(); ctx.moveTo(-bh, -12); ctx.lineTo(bh, -12); ctx.moveTo(-bh, -15); ctx.lineTo(bh, -15); ctx.stroke(); } },
    switch(ctx, c, bh, ink) { ctx.strokeStyle = ink; ctx.fillStyle = ink; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.arc(-bh, 0, 3, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(bh, 0, 3, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.moveTo(-bh, 0); if (c.closed) ctx.lineTo(bh, 0); else ctx.lineTo(bh - 4, -16); ctx.stroke(); },
    voltmeter(ctx, c, bh, ink) { this.S._meter(ctx, 'V', bh, ink, '#4f46e5'); },
    ammeter(ctx, c, bh, ink) { this.S._meter(ctx, 'A', bh, ink, '#e11d48'); },
    galvanometer(ctx, c, bh, ink) { this.S._meter(ctx, 'G', bh, ink, '#0e9f6e'); },
    _meter(ctx, l, bh, ink, col) { ctx.fillStyle = 'rgba(255,255,255,.04)'; ctx.strokeStyle = ink; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.arc(0, 0, bh, 0, TAU); ctx.fill(); ctx.stroke(); ctx.save(); ctx.rotate(-ctx.getTransform().b ? 0 : 0); ctx.restore(); ctx.save(); const m = ctx.getTransform(); const a = Math.atan2(m.b, m.a); ctx.rotate(-a); ctx.fillStyle = col; ctx.font = '900 16px Tajawal,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(l, 0, 1); ctx.restore(); ctx.textBaseline = 'alphabetic'; },
    diode(ctx, c, bh, ink) { ctx.strokeStyle = ink; ctx.fillStyle = ink; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(-bh, 0); ctx.lineTo(-8, 0); ctx.moveTo(8, 0); ctx.lineTo(bh, 0); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-8, -10); ctx.lineTo(-8, 10); ctx.lineTo(8, 0); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(8, -10); ctx.lineTo(8, 10); ctx.stroke(); },
    led(ctx, c, bh, ink) { const g = c.vis || 0; if (g > .02) G.glow(ctx, 0, 0, 34, hexA(LED_COL[c.color].c), Math.min(1, g)); this.S.diode(ctx, c, bh, ink); G.arrow(ctx, 0, -12, 8, -24, LED_COL[c.color].c, 1.6, 5); G.arrow(ctx, 6, -10, 14, -22, LED_COL[c.color].c, 1.6, 5); },
    photodiode(ctx, c, bh, ink) { this.S.diode(ctx, c, bh, ink); G.arrow(ctx, 10, -26, 2, -13, '#f59e0b', 1.6, 5); G.arrow(ctx, 17, -23, 9, -10, '#f59e0b', 1.6, 5); },
    neon(ctx, c, bh, ink) { const g = c.vis || 0; if (g > .02) G.glow(ctx, 0, 0, 36, 'rgba(255,110,40,A)', Math.min(1, g)); ctx.strokeStyle = ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, bh, 0, TAU); ctx.stroke(); ctx.fillStyle = ink; ctx.beginPath(); ctx.arc(-5, 0, 2.5, 0, TAU); ctx.arc(5, 0, 2.5, 0, TAU); ctx.fill(); }
  },
  /* ---------------- realistic drawings ---------------- */
  R: {
    resistor(ctx, c, bh) {
      const h = 11; const g = ctx.createLinearGradient(0, -h, 0, h); g.addColorStop(0, '#f1dcb3'); g.addColorStop(.5, '#d9bb86'); g.addColorStop(1, '#a9884f');
      ctx.fillStyle = g; rr(ctx, -bh, -h, 2 * bh, 2 * h, h); ctx.fill();
      // color bands from value
      const v = Math.max(1, c.val); const e = Math.floor(Math.log10(v)) - 1; const d = Math.round(v / Math.pow(10, e));
      const d1 = Math.floor(d / 10) % 10, d2 = d % 10, mul = clamp(e, 0, 9);
      [[-bh * .55, d1], [-bh * .25, d2], [bh * .05, mul]].forEach(([x, k]) => { ctx.fillStyle = RES_COL[k]; ctx.fillRect(x, -h + 1, 4.5, 2 * h - 2); });
      ctx.fillStyle = '#c9a227'; ctx.fillRect(bh * .5, -h + 1, 4, 2 * h - 2);
      ctx.fillStyle = 'rgba(255,255,255,.35)'; rr(ctx, -bh + 4, -h + 2, 2 * bh - 8, 3, 2); ctx.fill();
    },
    rheostat(ctx, c, bh) {
      ctx.fillStyle = '#374151'; rr(ctx, -bh - 2, 8, 2 * bh + 4, 6, 2); ctx.fill();
      const g = ctx.createLinearGradient(0, -12, 0, 10); g.addColorStop(0, '#e9eef6'); g.addColorStop(1, '#8b95a7'); ctx.fillStyle = g; rr(ctx, -bh, -12, 2 * bh, 20, 8); ctx.fill();
      ctx.strokeStyle = '#b87333'; ctx.lineWidth = 1.2; for (let x = -bh + 3; x < bh - 2; x += 3) { ctx.beginPath(); ctx.moveTo(x, -11); ctx.lineTo(x + 1.5, 7); ctx.stroke(); }
      const s = clamp((c.val - (c.min || 0)) / ((c.max || 200) - (c.min || 0)), 0, 1); const sx = -bh + 4 + s * (2 * bh - 8);
      ctx.fillStyle = '#1f2937'; ctx.fillRect(-bh, -20, 2 * bh, 3); ctx.fillStyle = '#ef4444'; rr(ctx, sx - 5, -24, 10, 14, 3); ctx.fill();
    },
    bulb(ctx, c, bh, ink, C, ang) {
      ctx.save(); ctx.rotate(-ang);
      const g = clamp(c.vis || 0, 0, 1.4);
      if (g > .02) { G.glow(ctx, 0, -12, 70 * Math.min(1, g) + 12, 'rgba(255,208,90,A)', Math.min(.95, g)); }
      ctx.fillStyle = '#9ca3af'; rr(ctx, -8, 0, 16, 12, 3); ctx.fill(); ctx.strokeStyle = '#6b7280'; ctx.lineWidth = 1; for (let y = 3; y < 12; y += 3) { ctx.beginPath(); ctx.moveTo(-8, y); ctx.lineTo(8, y); ctx.stroke(); }
      const gg = ctx.createRadialGradient(-4, -18, 2, 0, -13, 16); gg.addColorStop(0, g > .05 ? `rgba(255,250,220,${.5 + .5 * Math.min(1, g)})` : 'rgba(255,255,255,.55)'); gg.addColorStop(1, g > .05 ? `rgba(255,200,80,${.25 + .5 * Math.min(1, g)})` : 'rgba(200,220,255,.18)');
      ctx.fillStyle = gg; ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(0, -14, 14, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = g > .05 ? `rgb(255,${Math.round(150 + 100 * Math.min(1, g))},80)` : '#555'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(-4, 0); ctx.lineTo(-4, -12); for (let i = 0; i < 4; i++) ctx.lineTo(-3 + i * 2, i % 2 ? -16 : -12); ctx.lineTo(4, -12); ctx.lineTo(4, 0); ctx.stroke();
      ctx.restore();
    },
    battery(ctx, c, bh) {
      const h = 13; const g = ctx.createLinearGradient(0, -h, 0, h); g.addColorStop(0, '#3a4a66'); g.addColorStop(.45, '#1e293b'); g.addColorStop(1, '#0b1220');
      ctx.fillStyle = g; rr(ctx, -bh + 4, -h, 2 * bh - 4, 2 * h, 4); ctx.fill();
      const g2 = ctx.createLinearGradient(0, -h, 0, h); g2.addColorStop(0, '#f5c542'); g2.addColorStop(1, '#a86b0c'); ctx.fillStyle = g2; rr(ctx, -bh + 4, -h, 12, 2 * h, 4); ctx.fill();
      ctx.fillStyle = '#cbd5e1'; rr(ctx, -bh, -5, 6, 10, 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = '900 11px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('+', -bh + 10, 0); ctx.fillText('−', bh - 7, 0);
      ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(-bh + 17, -h + 3, 2 * bh - 24, 2); ctx.textBaseline = 'alphabetic';
    },
    ac(ctx, c, bh, ink, C, ang) {
      ctx.save(); ctx.rotate(-ang);
      ctx.fillStyle = '#e5e7eb'; rr(ctx, -30, -24, 60, 44, 6); ctx.fill(); ctx.fillStyle = '#9ca3af'; ctx.fillRect(-30, 14, 60, 6);
      ctx.fillStyle = '#0b1a10'; rr(ctx, -24, -19, 34, 22, 3); ctx.fill();
      ctx.strokeStyle = '#6ee7b7'; ctx.lineWidth = 1.4; ctx.beginPath(); const ph = C.t * c.f * TAU; for (let x = 0; x <= 30; x++) { const y = -8 - 7 * Math.sin(x / 30 * TAU * 1.5 - (C.running ? ph : 0)); x ? ctx.lineTo(-22 + x, y) : ctx.moveTo(-22, y); } ctx.stroke();
      ctx.fillStyle = '#374151'; ctx.beginPath(); ctx.arc(19, -8, 6, 0, TAU); ctx.fill(); ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(19, -8); ctx.lineTo(19 + 4 * Math.cos(c.f / 200), -8 + 4 * Math.sin(c.f / 200)); ctx.stroke();
      ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(-18, 10, 3, 0, TAU); ctx.fill(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(18, 10, 3, 0, TAU); ctx.fill();
      ctx.restore();
    },
    capacitor(ctx, c, bh) {
      const h = 13; const g = ctx.createLinearGradient(0, -h, 0, h); g.addColorStop(0, '#5aa2ff'); g.addColorStop(.5, '#1d4ed8'); g.addColorStop(1, '#0f2a74');
      ctx.fillStyle = g; rr(ctx, -bh, -h, 2 * bh, 2 * h, 5); ctx.fill();
      ctx.fillStyle = 'rgba(220,230,255,.85)'; ctx.fillRect(bh - 9, -h, 5, 2 * h);
      ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(-bh + 3, -h + 3, 2 * bh - 14, 2);
      // charge level indicator
      const q = clamp(Math.abs(c.v) / (c.vmax || 12), 0, 1); ctx.fillStyle = '#fde047'; ctx.fillRect(-bh + 4, h - 5, (2 * bh - 16) * q, 2.5);
    },
    inductor(ctx, c, bh) {
      if (c.core) { ctx.fillStyle = '#6b7280'; rr(ctx, -bh - 3, -6, 2 * bh + 6, 12, 2); ctx.fill(); } else { ctx.fillStyle = '#e8d8b0'; rr(ctx, -bh, -8, 2 * bh, 16, 3); ctx.fill(); }
      const n = 9; for (let i = 0; i < n; i++) { const x = -bh + 3 + i * (2 * bh - 6) / (n - 1); const g = ctx.createLinearGradient(x - 3, 0, x + 3, 0); g.addColorStop(0, '#7c3f12'); g.addColorStop(.5, '#e8914a'); g.addColorStop(1, '#7c3f12'); ctx.fillStyle = g; rr(ctx, x - 2.6, -13, 5.2, 26, 2.6); ctx.fill(); }
    },
    switch(ctx, c, bh) {
      ctx.fillStyle = '#7c4a1e'; rr(ctx, -bh - 2, 2, 2 * bh + 4, 9, 3); ctx.fill();
      ctx.fillStyle = '#d4a017'; ctx.fillRect(-bh + 1, -3, 5, 6); ctx.fillRect(bh - 6, -3, 5, 6);
      ctx.save(); ctx.translate(-bh + 3, -1); ctx.rotate(c.closed ? 0 : -.55); ctx.fillStyle = '#cbd5e1'; ctx.fillRect(0, -2, 2 * bh - 4, 4); ctx.fillStyle = '#111'; rr(ctx, 2 * bh - 10, -5, 10, 10, 3); ctx.fill(); ctx.restore();
    },
    voltmeter(ctx, c, bh, ink, C, ang) { this.R._meter(ctx, c, C, ang, 'V', '#4f46e5', C.reading(c).v); },
    ammeter(ctx, c, bh, ink, C, ang) { this.R._meter(ctx, c, C, ang, 'A', '#e11d48', C.reading(c).i); },
    galvanometer(ctx, c, bh, ink, C, ang) { this.R._meter(ctx, c, C, ang, 'G', '#0e9f6e', c.i, true); },
    _meter(ctx, c, C, ang, l, col, val, center) {
      ctx.save(); ctx.rotate(-ang);
      const r = 20; const g = ctx.createLinearGradient(0, -r, 0, r); g.addColorStop(0, '#f8fafc'); g.addColorStop(1, '#cbd5e1');
      ctx.fillStyle = '#1f2937'; rr(ctx, -r - 3, -r - 3, 2 * r + 6, 2 * r + 6, 8); ctx.fill();
      ctx.fillStyle = g; rr(ctx, -r, -r, 2 * r, 2 * r, 6); ctx.fill();
      let range = c.range; if (!range) { const a = Math.abs(val); range = 1e-6; const steps = [1, 2, 5]; outer: for (let e = -6; e < 5; e++) for (const s of steps) { const R = s * Math.pow(10, e); if (a <= R * .98) { range = R; break outer; } } }
      const f = center ? clamp(.5 + (val / range) * .5, 0, 1) : clamp(Math.abs(val) / range, 0, 1);
      const a0 = -Math.PI * .82, a1 = -Math.PI * .18; ctx.strokeStyle = '#334155'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(0, 6, 15, a0, a1); ctx.stroke();
      for (let i = 0; i <= 10; i++) { const a = a0 + (a1 - a0) * i / 10; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 15, 6 + Math.sin(a) * 15); ctx.lineTo(Math.cos(a) * (i % 5 ? 13 : 11), 6 + Math.sin(a) * (i % 5 ? 13 : 11)); ctx.stroke(); }
      const a = a0 + (a1 - a0) * (C.running ? f : (center ? .5 : 0));
      ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(0, 6); ctx.lineTo(Math.cos(a) * 16, 6 + Math.sin(a) * 16); ctx.stroke();
      ctx.fillStyle = col; ctx.font = '900 11px Tajawal,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(l, 0, 13);
      ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(-r + 4, r - 4, 2.2, 0, TAU); ctx.fill(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(r - 4, r - 4, 2.2, 0, TAU); ctx.fill();
      ctx.restore(); ctx.textBaseline = 'alphabetic';
    },
    diode(ctx, c, bh) { const h = 7; ctx.fillStyle = '#1f2937'; rr(ctx, -bh, -h, 2 * bh, 2 * h, 4); ctx.fill(); ctx.fillStyle = '#d1d5db'; ctx.fillRect(bh - 7, -h, 4, 2 * h); ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(-bh + 3, -h + 2, 2 * bh - 12, 1.5); },
    led(ctx, c, bh, ink, C, ang) {
      const lc = LED_COL[c.color].c; const g = c.vis || 0;
      ctx.save(); ctx.rotate(-ang);
      if (g > .02) G.glow(ctx, 0, -8, 18 + 50 * Math.min(1, g), hexA(lc), Math.min(1, g));
      ctx.fillStyle = shade(lc, -60); rr(ctx, -9, 2, 18, 4, 1); ctx.fill();
      const gg = ctx.createRadialGradient(-3, -12, 1, 0, -6, 12); gg.addColorStop(0, g > .05 ? '#fff' : shade(lc, 60)); gg.addColorStop(1, g > .05 ? lc : shade(lc, -40));
      ctx.fillStyle = gg; ctx.beginPath(); ctx.moveTo(-8, 2); ctx.lineTo(-8, -8); ctx.arc(0, -8, 8, Math.PI, 0); ctx.lineTo(8, 2); ctx.closePath(); ctx.fill();
      ctx.restore();
    },
    photodiode(ctx, c, bh, ink, C, ang) {
      ctx.save(); ctx.rotate(-ang);
      ctx.fillStyle = '#334155'; rr(ctx, -10, -6, 20, 12, 3); ctx.fill(); ctx.fillStyle = 'rgba(200,230,255,.55)'; ctx.beginPath(); ctx.arc(0, -4, 9, Math.PI, 0); ctx.fill();
      ctx.fillStyle = '#0f172a'; ctx.fillRect(-4, -6, 8, 5);
      const L = (c.light || 0) / 100; if (L > 0) { for (let k = 0; k < 3; k++) G.arrow(ctx, -18 + k * 12, -34, -8 + k * 8, -16, `rgba(250,204,21,${.3 + .7 * L})`, 1.8, 6); }
      ctx.restore();
    },
    neon(ctx, c, bh, ink, C, ang) {
      ctx.save(); ctx.rotate(-ang);
      const g = c.vis || 0; if (g > .02) G.glow(ctx, 0, -6, 26 + 40 * Math.min(1, g), 'rgba(255,100,30,A)', Math.min(1, g));
      ctx.fillStyle = g > .05 ? `rgba(255,120,50,${.35 + .5 * Math.min(1, g)})` : 'rgba(210,225,255,.25)'; ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1.2;
      rr(ctx, -9, -20, 18, 24, 8); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-3, 4); ctx.lineTo(-3, -12); ctx.moveTo(3, 4); ctx.lineTo(3, -12); ctx.stroke();
      ctx.restore();
    }
  }
};
function hexA(hex) { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},A)`; }

/* =====================================================================
   Stage controller for circuits (used by free lab & circuit experiments)
   ===================================================================== */
class CircuitStage {
  constructor(host, C, opts = {}) {
    this.host = host; this.C = C; this.o = Object.assign({ editable: false, mode: 'realistic', speed: 1 }, opts);
    this.cv = el('canvas'); host.appendChild(this.cv);
    this.cam = { x: 0, y: 0, z: 1 }; this.sel = null; this.tool = 'cursor'; this.ptrs = new Map();
    this.bind();
  }
  destroy() { this.cv.remove(); window.removeEventListener('keydown', this._key); }
  world(e) { const r = this.cv.getBoundingClientRect(); return { x: (e.clientX - r.left - this.cam.x) / this.cam.z, y: (e.clientY - r.top - this.cam.y) / this.cam.z }; }
  snap(p) { return { x: Math.round(p.x / GRID) * GRID, y: Math.round(p.y / GRID) * GRID }; }
  fit(pad = 70) {
    const r = this.cv.getBoundingClientRect(); const b = this.C.bbox(); const w = b.x1 - b.x0 + pad * 2, h = b.y1 - b.y0 + pad * 2;
    const z = clamp(Math.min(r.width / w, r.height / h), .35, 1.8); this.cam.z = z;
    this.cam.x = r.width / 2 - (b.x0 + b.x1) / 2 * z; this.cam.y = r.height / 2 - (b.y0 + b.y1) / 2 * z;
  }
  zoom(f, cx, cy) { const r = this.cv.getBoundingClientRect(); cx = cx ?? r.width / 2; cy = cy ?? r.height / 2; const z = clamp(this.cam.z * f, .3, 3); const k = z / this.cam.z; this.cam.x = cx - (cx - this.cam.x) * k; this.cam.y = cy - (cy - this.cam.y) * k; this.cam.z = z; }
  hit(p) {
    for (let i = this.C.comps.length - 1; i >= 0; i--) { const c = this.C.comps[i]; if (Math.hypot(c.p1.x - p.x, c.p1.y - p.y) < 9) return { c, end: 'p1' }; if (Math.hypot(c.p2.x - p.x, c.p2.y - p.y) < 9) return { c, end: 'p2' }; }
    let best = null, bd = 16;
    for (const c of this.C.comps) { const d = segDist(p, c.p1, c.p2); const tol = c.type === 'wire' ? 8 : 18; if (d < tol && d < bd) { bd = d; best = c; } }
    return best ? { c: best } : null;
  }
  bind() {
    const cv = this.cv;
    cv.addEventListener('pointerdown', e => {
      cv.setPointerCapture(e.pointerId); this.ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (this.ptrs.size === 2) { const [a, b] = [...this.ptrs.values()]; this.pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), z: this.cam.z }; this.drag = null; this.ghost = null; return; }
      const p = this.world(e); const s = this.snap(p);
      this.down = { x: e.clientX, y: e.clientY, moved: false };
      if (this.probeMode && this.C.nodes) { let bi = -1, bd = 18 / this.cam.z; this.C.nodes.forEach((n, i) => { const d = Math.hypot(n.x - p.x, n.y - p.y); if (d < bd) { bd = d; bi = i; } }); if (bi >= 0) { const pr = this.probe || (this.probe = { a: -1, b: -1, turn: 0 }); if (pr.turn % 2 === 0) pr.a = bi; else pr.b = bi; pr.turn++; pr.rms = 0; this.down = null; return; } }
      if (this.o.editable && this.tool !== 'cursor') { this.ghostStart = s; this.ghost = this.mkGhost(s, { x: s.x + 4 * GRID, y: s.y }); return; }
      const h = this.hit(p);
      if (h) {
        this.sel = h.c; this.o.onSelect && this.o.onSelect(h.c);
        if (this.o.editable) { this.drag = h.end ? { c: h.c, end: h.end } : { c: h.c, move: true, start: s, p1: { ...h.c.p1 }, p2: { ...h.c.p2 } }; }
        else this.drag = { pan: true, cx: this.cam.x, cy: this.cam.y, pending: h.c };
      } else { if (this.o.editable) { this.sel = null; this.o.onSelect && this.o.onSelect(null); } this.drag = { pan: true, cx: this.cam.x, cy: this.cam.y }; }
    });
    cv.addEventListener('pointermove', e => {
      if (this.ptrs.has(e.pointerId)) this.ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (this.pinch && this.ptrs.size === 2) { const [a, b] = [...this.ptrs.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y); const r = cv.getBoundingClientRect(); this.zoom((this.pinch.z * d / this.pinch.d) / this.cam.z, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top); return; }
      if (!this.down) return;
      if (Math.hypot(e.clientX - this.down.x, e.clientY - this.down.y) > 4) this.down.moved = true;
      const p = this.world(e), s = this.snap(p);
      if (this.ghost) { const e2 = (s.x === this.ghostStart.x && s.y === this.ghostStart.y) ? { x: s.x + 4 * GRID, y: s.y } : s; this.ghost.p2 = e2; return; }
      if (!this.drag) return;
      if (this.drag.pan) { this.cam.x = this.drag.cx + (e.clientX - this.down.x); this.cam.y = this.drag.cy + (e.clientY - this.down.y); }
      else if (this.drag.end) { const c = this.drag.c; c[this.drag.end] = s; this.C.dirty = true; }
      else if (this.drag.move) { const dx = s.x - this.drag.start.x, dy = s.y - this.drag.start.y; const c = this.drag.c; c.p1 = { x: this.drag.p1.x + dx, y: this.drag.p1.y + dy }; c.p2 = { x: this.drag.p2.x + dx, y: this.drag.p2.y + dy }; this.C.dirty = true; }
    });
    const up = e => {
      this.ptrs.delete(e.pointerId); if (this.ptrs.size < 2) this.pinch = null;
      if (!this.down) return;
      if (this.ghost) {
        const g = this.ghost; this.ghost = null;
        if (Math.hypot(g.p2.x - g.p1.x, g.p2.y - g.p1.y) >= GRID) { const c = this.C.add(this.tool, 0, 0, 0, 0, this.tool === 'rheostat' ? { min: 0, max: 200 } : {}); c.p1 = g.p1; c.p2 = g.p2; this.sel = c; this.o.onSelect && this.o.onSelect(c); this.o.onChange && this.o.onChange(); }
        if (!this.o.sticky) this.o.onToolDone && this.o.onToolDone();
      } else if (this.drag) {
        const c = this.drag.c || this.drag.pending;
        if (!this.down.moved && c && c.type === 'switch') { Sound.click(); c.closed = !c.closed; this.C.beSteps = 2; this.o.onChange && this.o.onChange(); this.o.onSwitch && this.o.onSwitch(c); }
        if (this.drag.end || this.drag.move) { this.C.dirty = true; this.o.onChange && this.o.onChange(); }
      }
      this.down = null; this.drag = null;
    };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    cv.addEventListener('wheel', e => { e.preventDefault(); const r = cv.getBoundingClientRect(); this.zoom(e.deltaY < 0 ? 1.1 : 1 / 1.1, e.clientX - r.left, e.clientY - r.top); }, { passive: false });
    this._key = e => { if (!this.o.editable || !this.sel) return; if (e.target.tagName === 'INPUT') return; if (e.key === 'Delete' || e.key === 'Backspace') { this.C.remove(this.sel); this.sel = null; this.o.onSelect && this.o.onSelect(null); this.o.onChange && this.o.onChange(); } };
    window.addEventListener('keydown', this._key);
  }
  probeValue() { const pr = this.probe, C = this.C; if (!pr || pr.a < 0 || pr.b < 0 || !C.nodeV) return null; const v = (C.nodeV[pr.a] || 0) - (C.nodeV[pr.b] || 0); pr.rms = pr.rms ? pr.rms + (v * v - pr.rms) * .05 : v * v; return { v, rms: Math.sqrt(pr.rms) }; }
  drawProbe(ctx, w, h) {
    const pr = this.probe, C = this.C; ctx.save(); ctx.translate(this.cam.x, this.cam.y); ctx.scale(this.cam.z, this.cam.z);
    const tip = (i, col, lab) => { if (i < 0 || !C.nodes[i]) return; const n = C.nodes[i]; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(n.x + 16, n.y - 30); ctx.stroke(); ctx.beginPath(); ctx.arc(n.x, n.y, 5, 0, TAU); ctx.fill(); rr(ctx, n.x + 10, n.y - 44, 14, 16, 3); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '900 11px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(lab, n.x + 17, n.y - 32); };
    tip(pr.a, '#dc2626', '+'); tip(pr.b, '#111827', '−'); ctx.restore();
    const r = this.probeValue(); const txt = r ? `ΔV = ${fmtSI(C.hasAC ? r.rms : r.v, 'V')}${C.hasAC ? ' (مؤثر)' : ''}` : (pr.a < 0 ? 'انقر على نقطة لوضع المجس الأحمر (+)' : 'انقر على نقطة ثانية لوضع المجس الأسود (−)');
    ctx.save(); ctx.font = '800 14px ui-monospace,monospace'; ctx.direction = /^[\u0600-\u06FF]/.test(txt) ? 'rtl' : 'ltr'; const tw = ctx.measureText(txt).width + 20; const cvb = ctx.canvas; const rw = cvb.__raw; cvb.__raw = true; ctx.fillStyle = '#0b1a10'; rr(ctx, w / 2 - tw / 2, h - 46, tw, 32, 8); ctx.fill(); ctx.fillStyle = '#9fe870'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, w / 2, h - 30); cvb.__raw = rw; ctx.restore();
  }
  mkGhost(p1, p2) { const d = CT[this.tool]; return { type: this.tool, p1, p2, val: d.val, closed: false, color: 'red', f: 50, v: 0, i: 0, phase: 0, light: 0 }; }
  frame(dtReal, dark) {
    const { ctx, w, h } = fitCanvas(this.cv);
    const C = this.C;
    if (C.dirty) C.topology();
    if (C.running) {
      C.advance(dtReal * this.o.speed * (C.timeScale || 1));
      // charge animation & visuals
      for (const c of C.comps) {
        const I = C.hasAC ? c.i : c.i;
        const sp = Math.sign(I) * Math.min(160, Math.log10(1 + Math.abs(I) / 1e-5) * 26) * (C.flow === 'elec' ? -1 : 1);
        c.phase += sp * dtReal;
        let target = 0;
        if (c.type === 'bulb') target = Math.sqrt(c.pAvg / (c.rated || 3));
        else if (c.type === 'led') target = clamp(Math.max(0, c.i) / 0.015, 0, 1.3);
        else if (c.type === 'neon') { target = (c.on || c.flash) ? 1 : 0; c.flash = false; }
        const k = c.type === 'neon' ? (target > c.vis ? 1 : Math.min(1, dtReal / .35)) : Math.min(1, dtReal / .06);
        c.vis += (target - c.vis) * k;
      }
    } else C.comps.forEach(c => { c.vis *= .85; });
    CRender.draw(ctx, C, this.cam, w, h, { inner: this.o.inner, flow: this.o.flow, labels: this.o.labels, mode: this.o.mode, sel: this.sel, editable: this.o.editable, ghost: this.ghost, showOpen: this.o.editable || C.running, dark });
    if (this.probeMode && this.probe && C.nodes && C.nodeV) this.drawProbe(ctx, w, h);
  }
}
function segDist(p, a, b) { const dx = b.x - a.x, dy = b.y - a.y; const l = dx * dx + dy * dy; let t = l ? ((p.x - a.x) * dx + (p.y - a.y) * dy) / l : 0; t = clamp(t, 0, 1); return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy)); }
