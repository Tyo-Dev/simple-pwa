// Enhanced Service Worker untuk Full Offline Support
// Pixel Tic Tac Toe PWA - v2.0

const CACHE_NAME = "pixel-ttt-cache-v2";
const DYNAMIC_CACHE = "pixel-ttt-dynamic-v2";

// Daftar file yang harus di-cache untuk offline capability
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon.png",
  // Offline fallback untuk Google Fonts
  "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap",
  "https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK0nSgPJE4580.woff2",
];

// Event: Install - Cache static assets
self.addEventListener("install", (event) => {
  console.log("[SW] Installing...");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[SW] Caching static assets...");

        // Cache assets with individual error handling
        return Promise.allSettled(
          STATIC_ASSETS.map((url) =>
            cache.add(url).catch((err) => {
              console.warn(`[SW] Failed to cache ${url}:`, err);
              return null;
            })
          )
        );
      })
      .then(() => {
        console.log("[SW] Static assets cached successfully");
        return self.skipWaiting();
      })
      .catch((err) => {
        console.error("[SW] Installation failed:", err);
      })
  );
});

// Event: Activate - Clean old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Hapus cache lama yang tidak digunakan
            if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE) {
              console.log(`[SW] Deleting old cache: ${cacheName}`);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("[SW] Cache cleanup completed");
        return self.clients.claim();
      })
  );
});

// Event: Fetch - Network strategy dengan fallback
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip chrome-extension dan other schemes
  if (!url.protocol.startsWith("http")) {
    return;
  }

  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);

  try {
    // Strategy 1: Cache First untuk static assets
    if (isStaticAsset(request)) {
      return await cacheFirst(request);
    }

    // Strategy 2: Network First dengan cache fallback untuk dynamic content
    if (isGoogleFonts(request)) {
      return await staleWhileRevalidate(request);
    }

    // Strategy 3: Network First untuk API calls
    return await networkFirst(request);
  } catch (error) {
    console.warn("[SW] Fetch failed:", error);

    // Ultimate fallback - return offline page untuk navigation requests
    if (request.mode === "navigate") {
      return await caches.match("./index.html");
    }

    return new Response("Offline", {
      status: 503,
      statusText: "Service Unavailable",
    });
  }
}

// Cache First Strategy
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  const response = await fetch(request);

  // Cache the response for future use
  if (response.status === 200) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  }

  return response;
}

// Network First Strategy
async function networkFirst(request) {
  try {
    const response = await fetch(request);

    if (response.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// Stale While Revalidate Strategy (untuk fonts)
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.status === 200) {
        const cache = caches.open(DYNAMIC_CACHE);
        cache.then((c) => c.put(request, response.clone()));
      }
      return response;
    })
    .catch(() => cached);

  return cached || (await fetchPromise);
}

// Helper functions
function isStaticAsset(request) {
  const url = new URL(request.url);
  return (
    STATIC_ASSETS.some((asset) => {
      const assetUrl = new URL(asset, self.location.origin);
      return url.href === assetUrl.href;
    }) ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".html") ||
    url.pathname.endsWith(".json") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".ico")
  );
}

function isGoogleFonts(request) {
  const url = new URL(request.url);
  return (
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com"
  );
}

// Background sync untuk future enhancements
self.addEventListener("sync", (event) => {
  console.log("[SW] Background sync:", event.tag);

  if (event.tag === "sync-game-scores") {
    event.waitUntil(syncGameScores());
  }
});

async function syncGameScores() {
  // Placeholder untuk future sync functionality
  console.log("[SW] Syncing game scores...");
}

// Push notifications untuk future enhancements
self.addEventListener("push", (event) => {
  console.log("[SW] Push received");

  const options = {
    body: event.data ? event.data.text() : "New game challenge!",
    icon: "./icons/icon-192.png",
    badge: "./icons/icon-192.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "play",
        title: "Play Now",
        icon: "./icons/icon-192.png",
      },
      {
        action: "close",
        title: "Close",
        icon: "./icons/icon-192.png",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("Pixel Tic Tac Toe", options)
  );
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  console.log("[SW] Notification click received.");

  event.notification.close();

  if (event.action === "play") {
    event.waitUntil(clients.openWindow("./"));
  }
});

// Error handling
self.addEventListener("error", (event) => {
  console.error("[SW] Error:", event.error);
});

self.addEventListener("unhandledrejection", (event) => {
  console.error("[SW] Unhandled promise rejection:", event.reason);
  event.preventDefault();
});

console.log("[SW] Service Worker loaded and ready for Pixel Tic Tac Toe!");
