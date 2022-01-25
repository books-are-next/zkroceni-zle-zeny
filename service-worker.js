/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-a505559';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./section0001.html","./zkroceni_zle_zeny_epub_split_000.html","./zkroceni_zle_zeny_epub_split_002.html","./zkroceni_zle_zeny_epub_split_003.html","./zkroceni_zle_zeny_epub_split_004.html","./zkroceni_zle_zeny_epub_split_005.html","./zkroceni_zle_zeny_epub_split_006.html","./zkroceni_zle_zeny_epub_split_007.html","./zkroceni_zle_zeny_epub_split_008.html","./zkroceni_zle_zeny_epub_split_009.html","./zkroceni_zle_zeny_epub_split_010.html","./zkroceni_zle_zeny_epub_split_011.html","./zkroceni_zle_zeny_epub_split_012.html","./zkroceni_zle_zeny_epub_split_013.html","./zkroceni_zle_zeny_epub_split_014.html","./zkroceni_zle_zeny_epub_split_015.html","./zkroceni_zle_zeny_epub_split_016.html","./zkroceni_zle_zeny_epub_split_017.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/obalka_zkroceni_zle_zeny.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
