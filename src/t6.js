// Interaction smoke test. usage: OUT=out.html node t6.js id1,id2,...   (or "all")
// For every experiment: opens it, runs 2 s, then for every object returned by E.drags(S)
// performs a real mouse drag (along its axis) / click / wheel, and reports JS errors and whether state changed.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await pg.addInitScript(() => { sessionStorage.setItem('lab-splash', '1'); });
  let errs = []; pg.on('pageerror', e => errs.push(e.message));
  const out = process.env.OUT || 'out.html';
  await pg.goto('file://' + __dirname + '/' + out); await pg.waitForTimeout(500);
  let ids = process.argv[2] === 'all' ? await pg.evaluate(() => EXPS.filter(e => !e.circuit).map(e => e.id)) : process.argv[2].split(',');
  for (const id of ids) {
    errs = [];
    await pg.evaluate(i => { location.hash = '#exp/' + i; }, id); await pg.waitForTimeout(900);
    await pg.evaluate(() => $$('.pred-modal').forEach(x => x.remove()));
    const info = await pg.evaluate(() => { const S = Runner.S, E = Runner.cur; if (!S || !Runner.cv) return null; const r = Runner.cv.getBoundingClientRect(); const L = Interact.list(E, S).filter(o => !o.tool); return { ox: r.left, oy: r.top, objs: L.map(o => ({ id: o.id, x: o.x, y: o.y, axis: o.axis, dir: o.dir, rot: o.cx != null, drag: !!o.drag, click: !!o.click, wheel: !!o.wheel })), fx: (E.controls || []).filter(c => c.type === 'toggle').length }; });
    if (!info) { console.log(id, 'SKIP (no canvas)'); continue; }
    const res = [];
    for (const o of info.objs) {
      const before = await pg.evaluate(() => { const S = Runner.S; const o = {}; for (const k in S) { const v = S[k]; if (['number','boolean','string'].includes(typeof v) && k !== 't' && k[0] !== '_') o[k] = typeof v === 'number' ? +v.toFixed(4) : v; } o.p = S.p; return JSON.stringify(o); });
      const X = info.ox + o.x, Y = info.oy + o.y;
      if (o.drag) {
        let dx = 60, dy = 0; if (o.axis === 'y') { dx = 0; dy = -50; } if (typeof o.dir === 'number') { dx = 60 * Math.cos(o.dir); dy = 60 * Math.sin(o.dir); } if (o.rot) { dx = 30; dy = -40; }
        await pg.mouse.move(X, Y); await pg.mouse.down(); for (let k = 1; k <= 6; k++) await pg.mouse.move(X + dx * k / 6, Y + dy * k / 6); await pg.mouse.up();
      } else if (o.click) { await pg.mouse.click(X, Y); }
      else if (o.wheel) { await pg.mouse.move(X, Y); await pg.mouse.wheel(0, -120); }
      await pg.waitForTimeout(250);
      const after = await pg.evaluate(() => { const S = Runner.S; const o = {}; for (const k in S) { const v = S[k]; if (['number','boolean','string'].includes(typeof v) && k !== 't' && k[0] !== '_') o[k] = typeof v === 'number' ? +v.toFixed(4) : v; } o.p = S.p; return JSON.stringify(o); });
      res.push(o.id + (before !== after ? '✓' : '·'));
    }
    // toggle every effect off/on through the panel
    await pg.evaluate(() => { $$('#ctls .fxrow').forEach(r => { r.click(); }); }); await pg.waitForTimeout(300);
    await pg.evaluate(() => { $$('#ctls .fxrow').forEach(r => { r.click(); }); }); await pg.waitForTimeout(300);
    console.log(id.padEnd(16), 'drags:', res.join(' ') || '—', '| effects:', info.fx, errs.length ? '| ERR ' + errs.slice(0, 3).join(' ; ') : '| ok');
  }
  await b.close();
})();
