/* مختبر الفيزياء التفاعلي — العمل دون إنترنت. VER changes with every build, so a new upload replaces the old copy. */
const VER = '6f4ba6c48b', CACHE = 'lab-' + VER, FONTS = 'lab-fonts';
const CORE = ['./', 'rd.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== FONTS).map(k => caches.delete(k)))).then(() => self.clients.claim()));
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
  const key = page ? './' : r;
  e.respondWith(fresh(r, page ? 8000 : 5000).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(key, cp)); return res; })
    .catch(() => caches.open(CACHE).then(c => c.match(key, { ignoreSearch: true })).then(hit => hit || fetch(r))));
});
