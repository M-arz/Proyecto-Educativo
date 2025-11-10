const CACHE_NAME = "horizonte-cache-v1";

// ✅ Archivos a cachear (rutas relativas, funcionan en cualquier servidor o local)
const urlsToCache = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",

  // Biología
  "./biologia/biologia.html",
  "./biologia/tema1.html",
  "./biologia/tema2.html",
  "./biologia/tema3.html",
  "./biologia/tema4.html",
  "./biologia/tema5.html",

  // Historia
  "./historia/historia.html",
  "./historia/tema1.html",
  "./historia/tema2.html",
  "./historia/tema3.html",
  "./historia/tema4.html",
  "./historia/tema5.html",

  // Inglés
  "./ingles/ingles.html",
  "./ingles/tema1.html",
  "./ingles/tema2.html",
  "./ingles/tema3.html",
  "./ingles/tema4.html",
  "./ingles/tema5.html",

  // Matemáticas
  "./matematicas/matematicas.html",
  "./matematicas/tema1.html",
  "./matematicas/tema2.html",
  "./matematicas/tema3.html",
  "./matematicas/tema4.html",
  "./matematicas/tema5.html",

  // Lectura Crítica
  "./lectura/lectura.html",
  "./lectura/tema1.html",
  "./lectura/tema2.html",
  "./lectura/tema3.html",
  "./lectura/tema4.html",
  "./lectura/tema5.html"
];

// 📦 Instalar el Service Worker y guardar los archivos en caché
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("📁 Archivos cacheados correctamente");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// ♻️ Activar el nuevo Service Worker y eliminar versiones antiguas
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log("🧹 Eliminando caché antigua:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// ⚙️ Interceptar peticiones y responder desde caché si no hay conexión
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Si hay caché, la devuelve; si no, la descarga
      return response || fetch(event.request);
    }).catch(() => {
      // Si falla (por ejemplo, offline y no cacheado), puedes poner una página de error
      return caches.match("./index.html");
    })
  );
});

