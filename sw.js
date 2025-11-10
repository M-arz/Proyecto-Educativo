// 🧠 Nombre de la caché
const CACHE_NAME = "horizonte-cache-v3";

// 📦 Archivos principales a guardar (rutas relativas)
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

// 🛠️ Instalar el Service Worker y guardar archivos en caché
self.addEventListener("install", event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      console.log("📦 Iniciando cacheo de archivos...");

      // Intentar cachear todos los archivos individualmente (sin romper el proceso si alguno falla)
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

// ♻️ Activar nuevo Service Worker y limpiar versiones antiguas
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
      // Si existe en la caché, se usa; si no, intenta descargarlo
      return (
        response ||
        fetch(event.request).catch(() => {
          // Si no hay conexión y no está en caché, carga el index
          return caches.match("./index.html");
        })
      );
    })
  );
});
