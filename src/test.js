const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await pg.addInitScript(() => { try { sessionStorage.setItem('lab-splash', '1'); } catch (e) { } });
  const errs = [];
  pg.on('pageerror', e => errs.push('PAGEERR ' + e.message));
  pg.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE ' + m.text()); });
  await pg.goto('file://' + __dirname + '/out.html');
  await pg.waitForTimeout(800);
  const ids = await pg.evaluate(() => EXPS.map(e => e.id));
  const only = process.argv[2] ? process.argv[2].split(',') : null;
  const shots = process.argv[3] === 'shot';
  for (const id of ids) {
    if (only && !only.includes(id)) continue;
    const before = errs.length;
    await pg.evaluate(id => { location.hash = 'exp/' + id; }, id);
    await pg.waitForTimeout(400);
    // click all buttons in controls once
    await pg.evaluate(() => { document.querySelectorAll('#ctls button').forEach((b, i) => { if (i < 2) b.click(); }); });
    await pg.waitForTimeout(+process.env.W||1500);
    await pg.evaluate(() => { const r = document.querySelector('#recBtn'); if (r) { r.click(); r.click(); } });
    await pg.waitForTimeout(300);
    const reads = await pg.evaluate(() => document.querySelector('#reads') ? document.querySelector('#reads').innerText.replace(/\n/g, ' | ').slice(0, 300) : '');
    console.log(id, errs.length > before ? 'ERR' : 'ok', '::', reads);
    if (shots) await pg.screenshot({ path: 'shots/' + id + '.png' });
  }
  for (const v of ['home', 'catalog', 'laws', 'lab']) { await pg.evaluate(v => location.hash = v, v); await pg.waitForTimeout(1200); if (shots) await pg.screenshot({ path: 'shots/_' + v + '.png' }); }
  console.log(errs.slice(0, 30).join('\n'));
  await b.close();
})();
