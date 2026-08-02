const CACHE_NAME = 'toto-v4-pro-approval-voice';
const urlsToCache = [
  './',
  './index.html',
  './customer.html',
  './driver.html',
  './admin.html',
  './manifest.json',
  './manifest-customer.json',
  './manifest-driver.json',
  './icon-192.png',
  './icon-512.png',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', event => {
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).catch(err => console.log('Cache addAll error', err));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Skip non-GET and chrome extensions
  if(event.request.method !== 'GET') return;
  if(event.request.url.startsWith('chrome-extension://')) return;
  // For API calls (firebase, osrm, rss2json) - network first
  if(event.request.url.includes('firebase') || event.request.url.includes('osrm') || event.request.url.includes('rss2json') || event.request.url.includes('googleapis')){
    event.respondWith(fetch(event.request).catch(()=> caches.match(event.request)));
    return;
  }
  event.respondWith(
    caches.match(event.request).then(response => {
      if(response) return response;
      return fetch(event.request).then(res => {
        // Cache HTML, JS, CSS, images
        if(res.ok && event.request.url.startsWith('http')){
          const resClone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone)).catch(()=>{});
        }
        return res;
      }).catch(()=> {
        // Fallback for offline map page
        if(event.request.destination === 'document'){
          return caches.match('./index.html');
        }
      });
    })
  );
});
