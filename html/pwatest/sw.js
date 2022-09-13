const cacheName = 'lnp2048-v1.1';
const cacheList = [
  '/',
  'index.html',
  'app.js',
  "jquery-1.9.0.min.js",
  'logo/logo_144.png',
  'logo/logo_192.png',
  'style/style.css'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(cacheList)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (cacheName.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(
      (r) =>
        r ||
        fetch(e.request).then(async (response) => {
          const cache = await caches.open(cacheName);
          await cache.put(e.request, response.clone());
          return response;
        })
    )
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request.url)));
});
