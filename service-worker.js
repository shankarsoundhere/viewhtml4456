const CACHE_NAME = "pandal-mistri-v3";

const OFFLINE_PAGE = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#28a745">
<title>Offline</title>

<style>
html,body{
    margin:0;
    width:100%;
    height:100%;
    background:white;
    font-family:Arial,sans-serif;
}

.box{
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    text-align:center;
    box-sizing:border-box;
    padding-bottom:80px;
}

.logo{
    width:185px;
    height:185px;
    object-fit:contain;
    margin-bottom:45px;
}

.text{
    font-size:34px;
    color:#222;
}

.icon{
    font-size:42px;
    margin-right:20px;
}
</style>
</head>

<body>
<div class="box">

<img class="logo" src="/viewhtml4456/icon-192.png">

<div class="text">
<span class="icon">☁️❌</span>
You're offline
</div>

</div>
</body>
</html>
`;

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                "/viewhtml4456/",
                "/viewhtml4456/icon-192.png",
                "/viewhtml4456/icon-512.png",
                "/viewhtml4456/manifest.json"
            ]);
        })
    );

    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys
                .filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {

    if (event.request.mode === "navigate") {

        event.respondWith(
            fetch(event.request)
            .catch(() => {
                return new Response(OFFLINE_PAGE, {
                    headers: {
                        "Content-Type": "text/html; charset=UTF-8"
                    }
                });
            })
        );

        return;
    }

    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
        .catch(() => {
            return new Response("");
        })
    );
});