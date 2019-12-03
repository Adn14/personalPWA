const CACHE_NAME = "profilepwa-v3";
var urlsToCache = [
    "/asset/kata.jfif",
    "/asset/meandlove.JPG",
    "/",
    "nav.html",
    "index.html",
    "/pages/general.html",
    "/pages/interest.html",
    "/pages/experience.html",
    "/pages/achievement.html",
    "/pages/certification.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName : CACHE_NAME})
            .then(function(response) {
                if (response) {
                    console.log("ServiceWorker: Use asset from cache", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Load asset from server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + "deleted");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});