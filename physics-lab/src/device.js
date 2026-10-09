'use strict';
/* =====================================================================
   Device awareness (mobile / tablet / laptop / smart board), smart-board
   presentation mode, stage full-screen, and click-to-enlarge charts
   ===================================================================== */
const Device = {
  type: 'desktop',
  detect() {
    const w = window.innerWidth, coarse = matchMedia('(pointer: coarse)').matches;
    const t = w < 700 ? 'mobile' : (w < 1100 || (coarse && w < 1400)) ? 'tablet' : 'desktop';
    this.type = t; this.coarse = coarse; document.body.dataset.dev = t; document.body.classList.toggle('touch', coarse);
    if (window.Interact) Interact.coarse = coarse;
  },
  present(on) {
    document.body.classList.toggle('present', on); const b = $('#fPres'); if (b) b.classList.toggle('on', on);
    try { if (on && !document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => { }); if (!on && document.fullscreenElement) document.exitFullscreen().catch(() => { }); } catch (e) { }
    const fx = $('#fx'); if (fx && on) fx.classList.add('compact');
    this.refit();
  },
  stageFull() {
    const col = $('.stage-col'); if (!col) return;
    try { if (document.fullscreenElement) document.exitFullscreen(); else col.requestFullscreen().catch(() => { col.classList.toggle('pseudo-full'); this.refit(); }); } catch (e) { col.classList.toggle('pseudo-full'); }
    this.refit();
  },
  refit() { [60, 300, 700].forEach(t => setTimeout(() => { const E = Runner.cur; if (Runner.stage && E) Runner.stage.fit(E.pad || 90); }, t)); },
  zoomChart(box) {
    const on = !box.classList.contains('zoom'); $$('.box.zoom').forEach(b => b.classList.remove('zoom'));
    let sh = $('#chartShade'); if (!sh) { sh = el('div', { id: 'chartShade', class: 'chart-shade' }); document.body.appendChild(sh); sh.onclick = () => this.zoomChart($('.box.zoom') || box); }
    box.classList.toggle('zoom', on); sh.classList.toggle('on', on);
  }
};
window.addEventListener('resize', () => Device.detect());
document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && document.body.classList.contains('present')) { document.body.classList.remove('present'); const b = $('#fPres'); if (b) b.classList.remove('on'); } Device.refit(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { const z = $('.box.zoom'); if (z) Device.zoomChart(z); } });
document.addEventListener('click', e => { const cv = e.target.closest && e.target.closest('#dataPanel canvas.mini'); if (cv) Device.zoomChart(cv.closest('.box')); });
(() => { const i0 = App.init; App.init = function () { Device.detect(); i0.call(this); }; })();
(() => { const o0 = Runner.open; Runner.open = function (E, p) { o0.call(this, E, p); if (Device.type !== 'desktop') { const fx = $('#fx'); if (fx) fx.classList.add('compact'); } if (Device.type === 'tablet') { const g = $('.exp-grid'); if (g) g.classList.add('no-info'); } }; })();
