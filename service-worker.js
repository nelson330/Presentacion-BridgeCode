/**
 * Herencia Pinolera - Service Worker
 * Enables 100% Offline-First operation in rural territories and local Raspberry Pi 5 sync
 */

const CACHE_NAME = 'herencia-pinolera-v1.0.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './css/components.css',
  './js/data.js',
  './js/translations.js',
  './js/audio-engine.js',
  './js/qr-passport.js',
  './js/charts.js',
  './js/app.js',
  './assets/images/logo.svg',
  './assets/images/product_vasija.svg',
  './assets/images/product_tuno.svg',
  './assets/images/product_hamaca.svg',
  './assets/images/product_caribe.svg',
  './assets/images/artisan_santos.svg',
  './assets/images/artisan_avelino.svg',
  './assets/images/artisan_miriam.svg',
  './assets/images/artisan_deborah.svg',
  './assets/images/apprentice_bryan.svg',
  './assets/images/apprentice_kenel.svg',
  './assets/images/apprentice_lucia.svg',
  './assets/images/apprentice_shanice.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching static assets for offline use...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing obsolete cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Return index.html as offline fallback
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
