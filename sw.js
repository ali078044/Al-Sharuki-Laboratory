/* مختبر الفيزياء التفاعلي — العمل دون إنترنت. VER changes with every build, so a new upload replaces the old copy. */
const VER = '38c9978f59', CACHE = 'lab-' + VER, FONTS = 'lab-fonts', KEEP = 'lab-keep-1';
const CORE = ['./', 'pro.bin?b=5f7771e567', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== FONTS && k !== KEEP).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// page: network first (always the newest upload when online; ETag makes an unchanged page cheap), cached copy when offline or the network hangs
const fresh = (req, ms) => new Promise((ok, no) => { const t = setTimeout(no, ms); fetch(req, { cache: 'no-cache' }).then(r => { clearTimeout(t); r.ok ? ok(r) : no(); }, () => { clearTimeout(t); no(); }); });
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET') return;
  if (/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) {   // fonts: cached copy, refreshed in the background
    e.respondWith(caches.open(FONTS).then(c => c.match(r).then(hit => { const net = fetch(r).then(res => { if (res.ok || res.type === 'opaque') c.put(r, res.clone()); return res; }).catch(() => hit); return hit || net; })));
    return;
  }
  if (u.origin !== location.origin) return;
  const page = r.mode === 'navigate' || u.pathname.endsWith('/') || u.pathname.endsWith('index.html');
  // versioned books, the paid code and the 3D models never change under the same name: keep them for good, so only the first opening downloads them
  if (u.pathname.includes('/assets3d/') || u.pathname.includes('/pg/') || (u.search && /(pro\.bin|\/rd(_\w+)?\.js)$/.test(u.pathname))) {
    e.respondWith(caches.match(r).then(hit => hit || fetch(r).then(res => { if (res.ok) caches.open(KEEP).then(c => c.put(r, res.clone())); return res; })));
    return;
  }
  // page: the stored copy opens at once; a new upload installs itself in the background through a new sw.js and is used at the next opening
  if (page) { e.respondWith(caches.match('./').then(hit => hit || fetch(r).then(res => { if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put('./', cp)); } return res; }))); return; }
  e.respondWith(fresh(r, 8000).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); return res; })
    .catch(() => caches.open(CACHE).then(c => c.match(r, { ignoreSearch: true })).then(hit => hit || fetch(r))));
});
