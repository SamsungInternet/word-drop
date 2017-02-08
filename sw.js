// Perform install steps
var CACHE_NAME = 'word-drop-v1';
var urlsToCache = [
    'js/bourds.js',
    'js/aframe-bmfont-text-component.min.js',
    'js/aframe-physics-system.min.js',
    'js/aframe.js',
    'js/boundaryChecker.js',
    'img/icon192.png',
    'img/icon512.png',
    'js/optimer_bold.typeface.json',
    'img/around.jpg',
    'img/microphone.png',
    'img/microphoneRec.png',
    'img/logo.png',
    'index.html'
];

self.addEventListener('install', function(event) {
// Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
        return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['word-drop-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});