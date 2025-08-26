// sw.js - Service Worker for Bag Stock PWA

const CACHE_NAME = "bagstock-cache-v2"; // bump version when files change
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./style.css",
  "./script6.js",
  "./icons/icon-96x96.png",
  "./icons/icon-192x192.png",
  "./icons/icon-512x512.png"
];

// Install SW & cache assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // activate immediately
});

// Activate SW & clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// Fetch: serve from cache, update in background
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request)
        .then(networkResponse => {
          // Update cache with latest version
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
          });
          return networkResponse;
        })
        .catch(() => cachedResponse); // fallback to cache if offline
      return cachedResponse || fetchPromise;
    })
  );
});
