const CACHE_NAME = "todo_version1";
const urlToCache = ['index.html'];


// Install SW
this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlToCache);
            })
    )
});

// Listen for requests
this.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(async () => {
                console.log(event.request);
                try {
                    return fetch(event.request);
                } catch (err) {
                    console.log("err", err);
                }
            })
    );
});

