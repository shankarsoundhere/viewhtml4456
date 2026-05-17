const CACHE_NAME = "tent-house-v2";

self.addEventListener("install", e => {
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(names => {
      return Promise.all(
        names.map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(fetch(e.request));
});