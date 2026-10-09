// usage: OUT=out.html node t5.js <expId> "<js to run after open>" [waitMs] [shotName]
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: +(process.env.VW || 1440), height: +(process.env.VH || 900) } });
  await pg.addInitScript(() => { sessionStorage.setItem('lab-splash', '1'); });
  pg.on('pageerror', e => console.log('ERR', e.message));
  pg.on('console', m => { if (m.type() === 'error' && !/ERR_TUNNEL|net::/.test(m.text())) console.log('CONSOLE', m.text()); });
  const id = process.argv[2]; const act = process.argv[3] || '';
  const out = process.env.OUT || 'out.html';
  await pg.goto('file://' + __dirname + '/' + out + '#exp/' + id); await pg.waitForTimeout(700);
  await pg.evaluate(() => $$('.pred-modal').forEach(x => x.remove()));
  if (act) await pg.evaluate(new Function(act));
  await pg.waitForTimeout(+(process.argv[4] || 1200));
  const name = process.argv[5] || ('v_' + id);
  await pg.screenshot({ path: 'shots/' + name + '.png' });
  await b.close();
})();
