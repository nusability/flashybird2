/* Flashy Bird Zones — offline service worker.
   Network-first: online always serves the freshest deploy, offline falls
   back to the last cached copy. Registered by zones.html only. */
const CACHE='flashybird-zones-v2';
const CORE=[
  './','index.html','zones.html','theme-lab.html',
  'themes/sky.js','themes/jungle.js','themes/candy-glacier.js',
  'themes/clockwork-aviary.js','themes/space-koi.js','themes/volcano-hatchery.js',
  'themes/mushroom-metropolis.js','themes/disco-hive.js','themes/origami-canyon.js',
  'themes/midnight-carnival.js','themes/sunken-library.js','themes/thunder-meadow.js',
  'icon-180.png','icon-512.png','manifest.webmanifest',
];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys()
    .then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const u=new URL(e.request.url);
  if(u.origin!==location.origin) return;
  e.respondWith(
    fetch(e.request).then(r=>{
      if(r.ok){ const cl=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,cl)); }
      return r;
    // ignoreSearch: ?seed= / ?debug= / ?reload= variants all resolve to the
    // cached base document when offline
    }).catch(()=>caches.match(e.request,{ignoreSearch:true}))
  );
});
