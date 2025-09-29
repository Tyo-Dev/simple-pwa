const CACHE_NAME = 'ttt-cache-v1';
const ASSETS = [
'/',
'/index.html',
'/manifest.json',
'https://cdn.tailwindcss.com'
];


self.addEventListener('install', (event) => {
event.waitUntil(
caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
);
});


self.addEventListener('activate', (event) => {
event.waitUntil(
caches.keys().then((keys) => Promise.all(keys.map(k => { if(k !== CACHE_NAME) return caches.delete(k); }))).then(() => self.clients.claim())
);
});


self.addEventListener('fetch', (event) => {
event.respondWith(
caches.match(event.request).then((cached) => cached || fetch(event.request).then(res => {
return res;
})).catch(() => caches.match('/index.html'))
);
});