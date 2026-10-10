// usage: node shot.js exp:part[,exp:part...] [prefix]
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const it of process.argv[2].split(',')) {
  const pg = await b.newPage({ viewport: { width: +(process.env.VW || 1440), height: +(process.env.VH || 900) } });
  await pg.addInitScript(() => { sessionStorage.setItem('lab-splash', '1'); });
  pg.on('pageerror', e => console.log('ERR', e.message)); pg.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log('CONSOLE', m.text().slice(0, 300)); });
    const [id, part] = it.split(':');
    await pg.goto('file://' + __dirname + '/' + (process.env.OUT || 'out.html') + '#exp/' + id + (part ? '?part=' + part : '')); await pg.waitForTimeout(900);
    await pg.evaluate(() => $$('.pred-modal').forEach(x => x.remove()));
    if (process.env.ACT) await pg.evaluate(new Function(process.env.ACT));
    await pg.waitForTimeout(+(process.env.W || 1200));
    await pg.screenshot({ path: 'shots/' + (part || id) + '.png' }); await pg.close();
  }
  await b.close();
})();
