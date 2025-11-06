const CACHE_NAME = "estudian-cache-v1";
const urlsToCache = [
  "/Estudian/",
  "/Estudian/index.html",
  "/Estudian/styles.css",
  "/Estudian/script.js",

  // Naturales
  "/Estudian/naturales/naturales.html",
  "/Estudian/naturales/tema1.html",
  "/Estudian/naturales/tema2.html",
  "/Estudian/naturales/tema3.html",
  "/Estudian/naturales/tema4.html",
  "/Estudian/naturales/tema5.html",

  // Historia
  "/Estudian/historia/historia.html",
  "/Estudian/historia/tema1.html",
  "/Estudian/historia/tema2.html",
  "/Estudian/historia/tema3.html",
  "/Estudian/historia/tema4.html",
  "/Estudian/historia/tema5.html",

  // Inglés
  "/Estudian/ingles/ingles.html",
  "/Estudian/ingles/tema1.html",
  "/Estudian/ingles/tema2.html",
  "/Estudian/ingles/tema3.html",
  "/Estudian/ingles/tema4.html",
  "/Estudian/ingles/tema5.html",

  // Matemáticas
  "/Estudian/Matematicas/matematicas.html",
  "/Estudian/Matematicas/tema1.html",
  "/Estudian/Matematicas/tema2.html",
  "/Estudian/Matematicas/tema3.html",
  "/Estudian/Matematicas/tema4.html",
  "/Estudian/Matematicas/tema5.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
