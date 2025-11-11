// 🌐 Horizonte Educativo - Service Worker funcional OFFLINE
const CACHE_NAME = "horizonte-cache-v9";
const urlsToCache = [
  "./",
  "./index.html",
  "./menu.html",
  "./styles.css",
  "./script.js",
  "./menu.css",

  // 🌱 Naturales
  "./Naturales/naturales.html",
  "./Naturales/tema1.html",
  "./Naturales/tema2.html",
  "./Naturales/tema3.html",
  "./Naturales/tema4.html",
  "./Naturales/tema5.html",
  "./Naturales/grado 1.mp4",
  "./Naturales/grado 2.mp4",
  "./Naturales/grado 3.mp4",
  "./Naturales/grado_4.mp4",
  "./Naturales/grado_5.mp4",

  // 📜 Historia
  "./Historia/historia.html",
  "./Historia/tema1.html",
  "./Historia/tema2.html",
  "./Historia/tema3.html",
  "./Historia/tema4.html",
  "./Historia/tema5.html",
  "./Historia/grado 1.mp4",
  "./Historia/grado 2.mp4",
  "./Historia/grado 3.mp4",
  "./Historia/grado 4.mp4",
  "./Historia/grado 5.mp4",

  // 🇬🇧 Inglés
  "./Ingles/ingles.html",
  "./Ingles/tema1.html",
  "./Ingles/tema2.html",
  "./Ingles/tema3.html",
  "./Ingles/tema4.html",
  "./Ingles/tema5.html",
  "./Ingles/grado 1.mp4",
  "./Ingles/grado 2.mp4",
  "./Ingles/grado 3.mp4",
  "./Ingles/grado 4.mp4",
  "./Ingles/grado 5.mp4",

  // ➗ Matemáticas
  "./Matematicas/matematicas.html",
  "./Matematicas/tema1.html",
  "./Matematicas/tema2.html",
  "./Matematicas/tema3.html",
  "./Matematicas/tema4.html",
  "./Matematicas/tema5.html",
  "./Matematicas/video grado 1.mp4",
  "./Matematicas/grado 2.mp4",
  "./Matematicas/grado 3.mp4",
  "./Matematicas/grado 4.mp4",
  "./Matematicas/grado 5.mp4",

  // 📖 Lectura Crítica
  "./Lectura/lectura.html",
  "./Lectura/tema1.html",
  "./Lectura/tema2.html",
  "./Lectura/tema3.html",
  "./Lectura/tema4.html",
  "./Lectura/tema5.html",
  "./Lectura/grado 1.mp4",
  "./Lectura/grado 2.mp4",
  "./Lectura/grado 3.mp4",
  "./Lectura/grado 4.mp4",
  "./Lectura/grado 5.mp4",
];

// 🧩 Instalar y cachear archivos
self.addEventListener("install", event => {
  console.log("📦 Instalando Service Worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        urlsToCache.map(url =>
          cache.add(url)
            .then(() => console.log(`✅ Cacheado: ${url}`))
            .catch(err => console.warn(`⚠️ No se pudo cachear: ${url}`, err))
        )
      )
    )
  );
  self.skipWaiting();
});

// 🔁 Activar y limpiar versiones anteriores
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("🧹 Eliminando caché antigua:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// ⚙️ Interceptar peticiones (offline fallback)
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








