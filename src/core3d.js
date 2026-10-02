'use strict';
/* =====================================================================
   Mini 3D engine (orbit camera, shaded boxes, 3D lines/arrows/text,
   draggable handles constrained to an axis) — used by 3D experiments
   ===================================================================== */
class View3D {
  constructor() { this.yaw = -0.35; this.pitch = 0.28; this.dist = 9; this.zoom = 1.35; this.cx = 0; this.cy = 0; this.scale = 110; this.target = [0, 0, 0]; this.handles = []; this.drag = null; this.hover = null; }
  setView(yaw, pitch) { this.anim = { y0: this.yaw, p0: this.pitch, y1: yaw, p1: pitch, t: 0 }; }
  step(dt) { if (this.anim) { const a = this.anim; a.t = Math.min(1, a.t + dt * 2.5); const k = a.t * a.t * (3 - 2 * a.t); this.yaw = lerp(a.y0, a.y1, k); this.pitch = lerp(a.p0, a.p1, k); if (a.t >= 1) this.anim = null; } }
  frame(w, h) { this.w = w; this.h = h; this.cx = w / 2; this.cy = h / 2; this.scale = Math.min(w, h) / 6.2 * this.zoom; const cy = Math.cos(this.yaw), sy = Math.sin(this.yaw), cp = Math.cos(this.pitch), sp = Math.sin(this.pitch); this.R = [cy, sy, cp, sp]; this.handles = []; }
  // world (x right, y up, z toward viewer) -> camera
  cam(p) { const [cy, sy, cp, sp] = this.R; const x = p[0] - this.target[0], y = p[1] - this.target[1], z = p[2] - this.target[2]; const x1 = cy * x + sy * z, z1 = -sy * x + cy * z; const y2 = cp * y - sp * z1, z2 = sp * y + cp * z1; return [x1, y2, z2]; }
  P(p) { const c = this.cam(p); const f = this.dist / (this.dist - c[2]); return [this.cx + c[0] * f * this.scale, this.cy - c[1] * f * this.scale, c[2], f]; }
  depth(p) { return this.cam(p)[2]; }
  // light direction (camera space)
  shade(n, base) { const [cy, sy, cp, sp] = this.R; const x1 = cy * n[0] + sy * n[2], z1 = -sy * n[0] + cy * n[2]; const y2 = cp * n[1] - sp * z1, z2 = sp * n[1] + cp * z1; const L = [-.35, .6, .72]; const d = clamp(x1 * L[0] + y2 * L[1] + z2 * L[2], -1, 1); return { k: .55 + .45 * d, facing: z2 > 0 }; }
  /* collect faces of an axis-aligned box: c=[x,y,z] centre, s=[sx,sy,sz] size */
  box(list, c, s, col, o = {}) {
    const [x, y, z] = c, [a, b, d] = s.map(v => v / 2);
    const V = (i, j, k) => [x + i * a, y + j * b, z + k * d];
    const F = [[[1, 0, 0], [V(1, -1, -1), V(1, 1, -1), V(1, 1, 1), V(1, -1, 1)]], [[-1, 0, 0], [V(-1, -1, 1), V(-1, 1, 1), V(-1, 1, -1), V(-1, -1, -1)]], [[0, 1, 0], [V(-1, 1, -1), V(-1, 1, 1), V(1, 1, 1), V(1, 1, -1)]], [[0, -1, 0], [V(-1, -1, 1), V(-1, -1, -1), V(1, -1, -1), V(1, -1, 1)]], [[0, 0, 1], [V(-1, -1, 1), V(1, -1, 1), V(1, 1, 1), V(-1, 1, 1)]], [[0, 0, -1], [V(1, -1, -1), V(-1, -1, -1), V(-1, 1, -1), V(1, 1, -1)]]];
    F.forEach(([n, pts]) => { const sh = this.shade(n); if (!sh.facing && !o.alpha) return; const cen = pts.reduce((m, p) => [m[0] + p[0] / 4, m[1] + p[1] / 4, m[2] + p[2] / 4], [0, 0, 0]); list.push({ t: 'poly', pts, col, k: sh.k, z: this.depth(cen) + (o.bias || 0), alpha: o.alpha, stroke: o.stroke, id: o.id, back: !sh.facing }); });
  }
  quad(list, pts, col, o = {}) { const cen = pts.reduce((m, p) => [m[0] + p[0] / pts.length, m[1] + p[1] / pts.length, m[2] + p[2] / pts.length], [0, 0, 0]); list.push({ t: 'poly', pts, col, k: o.k ?? 1, z: this.depth(cen) + (o.bias || 0), alpha: o.alpha, stroke: o.stroke }); }
  line(list, a, b, col, w = 2, o = {}) { list.push({ t: 'line', a, b, col, w, z: this.depth([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]) + (o.bias || 0), arrow: o.arrow, dash: o.dash }); }
  poly3(list, pts, col, w = 2, o = {}) { const c = pts[Math.floor(pts.length / 2)]; list.push({ t: 'path', pts, col, w, z: this.depth(c) + (o.bias || 0), arrow: o.arrow, dash: o.dash, alpha: o.alpha }); }
  label(list, p, s, o = {}) { list.push({ t: 'text', p, s, o, z: this.depth(p) + (o.bias ?? 50) }); }
  sym(list, p, s, col, size = 13, o = {}) { list.push({ t: 'sym', p, s, col, size, z: this.depth(p) + (o.bias || .02) }); }
  render(ctx, list) {
    list.sort((a, b) => a.z - b.z);
    for (const it of list) {
      if (it.t === 'poly') {
        const cvb = ctx.canvas, rw = cvb.__raw; cvb.__raw = true;
        const q = it.pts.map(p => this.P(p)); ctx.beginPath(); q.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath();
        const [r, g, b] = hexRGB(it.col); const k = it.k; const a = it.alpha ?? 1;
        ctx.fillStyle = `rgba(${Math.round(r * k)},${Math.round(g * k)},${Math.round(b * k)},${a})`; ctx.fill();
        if (it.stroke !== false) { ctx.strokeStyle = `rgba(${Math.round(r * .5)},${Math.round(g * .5)},${Math.round(b * .5)},${Math.min(1, a + .2)})`; ctx.lineWidth = 1; ctx.stroke(); }
        cvb.__raw = rw;
      } else if (it.t === 'line') { const a = this.P(it.a), b = this.P(it.b); if (it.dash) ctx.setLineDash(it.dash); if (it.arrow) G.arrow(ctx, a[0], a[1], b[0], b[1], it.col, it.w, 7 + it.w); else { ctx.strokeStyle = it.col; ctx.lineWidth = it.w; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); } ctx.setLineDash([]); }
      else if (it.t === 'path') { const q = it.pts.map(p => this.P(p)); ctx.globalAlpha = it.alpha ?? 1; ctx.strokeStyle = it.col; ctx.lineWidth = it.w; if (it.dash) ctx.setLineDash(it.dash); ctx.beginPath(); q.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.setLineDash([]); if (it.arrow) { const m = Math.floor(q.length * (it.arrow === true ? .55 : it.arrow)); const p0 = q[Math.max(0, m - 1)], p1 = q[Math.min(q.length - 1, m + 1)]; if (p0 && p1) G.arrow(ctx, p0[0], p0[1], p1[0], p1[1], it.col, it.w, 9); } ctx.globalAlpha = 1; }
      else if (it.t === 'text') { const p = this.P(it.p); G.text(ctx, it.s, p[0] + (it.o.dx || 0), p[1] + (it.o.dy || 0), it.o); }
      else if (it.t === 'sym') { const p = this.P(it.p); const s = it.size * clamp(p[3], .6, 1.6); ctx.fillStyle = it.col; ctx.font = `900 ${Math.round(s)}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(it.s, p[0], p[1]); ctx.textBaseline = 'alphabetic'; }
    }
  }
  /* draggable handle: p = 3D anchor, axis = world unit vector, onDrag(deltaWorld) */
  handle(ctx, id, p, axis, label, col, onDrag) {
    const a = this.P(p), b = this.P([p[0] + axis[0] * .6, p[1] + axis[1] * .6, p[2] + axis[2] * .6]);
    let dx = b[0] - a[0], dy = b[1] - a[1]; const L = Math.hypot(dx, dy) || 1; dx /= L; dy /= L;
    const H = { id, x: a[0], y: a[1], ux: dx, uy: dy, pxPerUnit: L / .6, onDrag }; this.handles.push(H);
    const act = this.drag && this.drag.id === id, hov = this.hover === id;
    ctx.save(); ctx.translate(a[0], a[1]); ctx.rotate(Math.atan2(dy, dx));
    const r = act || hov ? 1.15 : 1; const cvb = ctx.canvas, rw = cvb.__raw; cvb.__raw = true;
    ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 8; ctx.fillStyle = col; rr(ctx, -26 * r, -11 * r, 52 * r, 22 * r, 11 * r); ctx.fill(); ctx.shadowBlur = 0;
    ctx.fillStyle = '#fff'; [[-1], [1]].forEach(([s]) => { ctx.beginPath(); ctx.moveTo(s * 22 * r, 0); ctx.lineTo(s * 12 * r, -7 * r); ctx.lineTo(s * 12 * r, 7 * r); ctx.closePath(); ctx.fill(); });
    ctx.fillRect(-9 * r, -2, 18 * r, 4); cvb.__raw = rw; ctx.restore();
    if (label && (hov || act || this.showLabels)) G.text(ctx, label, a[0], a[1] - 24, { s: 12, w: 800, c: '#fff', bg: col, raw: 1 });
  }
  hit(x, y) { for (let i = this.handles.length - 1; i >= 0; i--) { const H = this.handles[i]; if (Math.hypot(x - H.x, y - H.y) < 24) return H; } return null; }
  pointer(t, x, y) {
    if (t === 'down') { const H = this.hit(x, y); if (H) { this.drag = { id: H.id, H, x, y }; return 'handle'; } this.orbit = { x, y, yaw: this.yaw, pitch: this.pitch }; this.anim = null; return 'orbit'; }
    if (t === 'drag') { if (this.drag) { const H = this.drag.H; const d = ((x - this.drag.x) * H.ux + (y - this.drag.y) * H.uy) / H.pxPerUnit; this.drag.x = x; this.drag.y = y; H.onDrag(d); return 'handle'; } if (this.orbit) { this.yaw = this.orbit.yaw + (x - this.orbit.x) * .008; this.pitch = clamp(this.orbit.pitch + (y - this.orbit.y) * .006, -1.2, 1.2); return 'orbit'; } }
    if (t === 'move') { const H = this.hit(x, y); this.hover = H ? H.id : null; return H ? 'hover' : null; }
    if (t === 'up') { this.drag = null; this.orbit = null; }
    return null;
  }
}
function hexRGB(c) { if (c[0] === '#') { const n = parseInt(c.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; } const m = c.match(/[\d.]+/g).map(Number); return m.slice(0, 3); }
