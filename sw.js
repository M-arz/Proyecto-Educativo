// 🌐 Horizonte Educativo - Service Worker funcional OFFLINE
const CACHE_NAME = "horizonte-cache-v7";
const urlsToCache = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",

  // Biología
  "./Biologia/index.html",
  "./Biologia/tema1.html",
  "./Biologia/tema2.html",
  "./Biologia/tema3.html",
  "./Biologia/tema4.html",
  "./Biologia/tema5.html",

  // Historia
  "./Historia/index.html",
  "./Historia/tema1.html",
  "./Historia/tema2.html",
  "./Historia/tema3.html",
  "./Historia/tema4.html",
  "./Historia/tema5.html",

  // Inglés
  "./Ingles/index.html",
  "./Ingles/tema1.html",
  "./Ingles/tema2.html",
  "./Ingles/tema3.html",
  "./Ingles/tema4.html",
  "./Ingles/tema5.html",

  // Matemáticas
  "./Matematicas/index.html",
  "./Matematicas/tema1.html",
  "./Matematicas/tema2.html",
  "./Matematicas/tema3.html",
  "./Matematicas/tema4.html",
  "./Matematicas/tema5.html",

  // Lectura Crítica
  "./Lectura/index.html",
  "./Lectura/tema1.html",
  "./Lectura/tema2.html",
  "./Lectura/tema3.html",
  "./Lectura/tema4.html",
  "./Lectura/tema5.html"
];

// 🧩 Instalar el Service Worker
self.addEventListener("install", event => {
  console.log("📦 Instalando Service Worker y cacheando recursos...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        urlsToCache.map(url =>
          cache.add(url).then(() => console.log(`✅ Cacheado: ${url}`))
            .catch(err => console.warn(`⚠️ Error cacheando ${url}`, err))
        )
      )
    )
  );
  self.skipWaiting();
});

// 🔁 Activar y limpiar cachés antiguos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("🧹 Borrando caché antigua:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// ⚙️ Interceptar peticiones y responder desde caché o red
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        console.log(`📂 Sirviendo desde caché: ${event.request.url}`);
        return response;
      }
      console.log(`🌍 Buscando en red: ${event.request.url}`);
      return fetch(event.request).catch(() => caches.match("./index.html"));
    })
  );
});

