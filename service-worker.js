const CACHE_NAME = "tent-house-v3";

const OFFLINE_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<meta name="theme-color" content="#28a745">

<title>Offline</title>

<style>
html,body{
    margin:0;
    padding:0;
    width:100%;
    height:100%;
    background:#ffffff;
    font-family:Arial,sans-serif;
}

.offline{
    width:100%;
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

.message{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:25px;
    font-size:34px;
    color:#222;
}

.cloud{
    font-size:42px;
}
</style>
</head>

<body>

<div class="offline">

    <img
        class="logo"
        src="icon-192.png"
        alt="Admin"
    >

    <div class="message">
        <span class="cloud">☁̸</span>
        <span>You're offline</span>
    </div>

</div>

</body>
</html>
`;


/* INSTALL */
self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME).then(cache => {

            return cache.addAll([
                "./icon-192.png"
            ]);

        })

    );

    self.skipWaiting();
});


/* ACTIVATE */
self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(names => {

            return Promise.all(

                names
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))

            );

        }).then(() => {

            return self.clients.claim();

        })

    );

});


/* FETCH */
self.addEventListener("fetch", event => {

    /* सिर्फ webpage/navigation के लिए offline screen */
    if (event.request.mode === "navigate") {

        event.respondWith(

            fetch(event.request)
                .catch(() => {

                    return new Response(
                        OFFLINE_HTML,
                        {
                            headers: {
                                "Content-Type": "text/html; charset=UTF-8"
                            }
                        }
                    );

                })

        );

        return;
    }


    /* बाकी files */
    event.respondWith(

        fetch(event.request)
            .catch(() => {

                return caches.match(event.request);

            })

    );

});