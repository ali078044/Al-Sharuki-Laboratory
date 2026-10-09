const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 }); await pg.addInitScript(() => sessionStorage.setItem('lab-splash','1'));
  pg.on('pageerror', e => console.log('ERR', e.message));
  await pg.goto('file://' + __dirname + '/out.html'); await pg.waitForTimeout(500);
  await pg.evaluate(() => location.hash = 'exp/rlc_series'); await pg.waitForTimeout(1500); await pg.screenshot({ path: 'shots/m_exp.png' });
  console.log(await pg.evaluate(() => document.documentElement.scrollWidth));
  await pg.evaluate(() => { document.documentElement.setAttribute('data-theme','dark'); location.hash = 'laws'; }); await pg.waitForTimeout(800); await pg.screenshot({ path: 'shots/m_laws.png' });
  console.log(await pg.evaluate(() => document.documentElement.scrollWidth));
  await b.close();
})();
