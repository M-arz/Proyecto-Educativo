// 🌐 Horizonte Educativo - Service Worker final (ajustado a estructura real)
const CACHE_NAME = "horizonte-cache-v6";

// 📦 Archivos principales a cachear
const urlsToCache = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",

  // Biología
  "./Biologia/biologia.html",
  "./Biologia/tema1.html",
  "./Biologia/tema2.html",
  "./Biologia/tema3.html",
  "./Biologia/tema4.html",
  "./Biologia/tema5.html",

  // Historia
  "./Historia/historia.html",
  "./Historia/tema1.html",
  "./Historia/tema2.html",
  "./Historia/tema3.html",
  "./Historia/tema4.html",
  "./Historia/tema5.html",

  // Inglés
  "./Ingles/ingles.html",
  "./Ingles/tema1.html",
  "./Ingles/tema2.html",
  "./Ingles/tema3.html",
  "./Ingles/tema4.html",
  "./Ingles/tema5.html",

  // Matemáticas
  "./Matematicas/matematicas.html",
  "./Matematicas/tema1.html",
  "./Matematicas/tema2.html",
  "./Matematicas/tema3.html",
  "./Matematicas/tema4.html",
  "./Matematicas/tema5.html",

  // Lectura Crítica
  "./Lectura/lectura.html",
  "./Lectura/tema1.html",
  "./Lectura/tema2.html",
  "./Lectura/tema3.html",
  "./Lectura/tema4.html",
  "./Lectura/tema5.html"
];

// 🧩 Instalar el Service Worker y guardar los archivos
self.addEventListener("install", event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      console.log("📦 Iniciando proceso de cacheo...");

      for (const url of urlsToCache) {
        try {
          await cache.add(url);
          console.log(`✅ Cacheado correctamente: ${url}`);
        } catch (error) {
          console.warn(`⚠️ No se pudo cachear: ${url}`, error);
        }
      }
    })()
  );
  self.skipWaiting();
});

// 🔁 Activar nuevo SW y eliminar versiones viejas
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

// ⚙️ Interceptar peticiones y responder desde caché si no hay red
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() => caches.match("./index.html"))
      );
    })
  );
});
