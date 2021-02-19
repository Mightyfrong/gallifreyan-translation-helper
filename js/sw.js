const cacheName = "cache1"; // Change value to force update

self.addEventListener("install", event => {
	// Kick out the old service worker
	self.skipWaiting();

	event.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll([
				"./",
				// favicons
				"./assets/favicon/android-chrome-36x36.png", // Favicon, Android Chrome M39+ with 0.75 screen density
				"./assets/favicon/android-chrome-48x48.png", // Favicon, Android Chrome M39+ with 1.0 screen density
				"./assets/favicon/android-chrome-72x72.png", // Favicon, Android Chrome M39+ with 1.5 screen density
				"./assets/favicon/android-chrome-96x96.png", // Favicon, Android Chrome M39+ with 2.0 screen density
				"./assets/favicon/android-chrome-144x144.png", // Favicon, Android Chrome M39+ with 3.0 screen density
				"./assets/favicon/android-chrome-192x192.png", // Favicon, Android Chrome M39+ with 4.0 screen density
				"./assets/favicon/android-chrome-256x256.png", // Favicon, Android Chrome M47+ Splash screen with 1.5 screen density
				"./assets/favicon/android-chrome-384x384.png", // Favicon, Android Chrome M47+ Splash screen with 3.0 screen density
				"./assets/favicon/android-chrome-512x512.png", // Favicon, Android Chrome M47+ Splash screen with 4.0 screen density
				"./assets/favicon/apple-touch-icon.png", // Favicon, Apple default
				"./assets/favicon/apple-touch-icon-57x57.png", // Apple iPhone, Non-retina with iOS6 or prior
				"./assets/favicon/apple-touch-icon-60x60.png", // Apple iPhone, Non-retina with iOS7
				"./assets/favicon/apple-touch-icon-72x72.png", // Apple iPad, Non-retina with iOS6 or prior
				"./assets/favicon/apple-touch-icon-76x76.png", // Apple iPad, Non-retina with iOS7
				"./assets/favicon/apple-touch-icon-114x114.png", // Apple iPhone, Retina with iOS6 or prior
				"./assets/favicon/apple-touch-icon-120x120.png", // Apple iPhone, Retina with iOS7
				"./assets/favicon/apple-touch-icon-144x144.png", // Apple iPad, Retina with iOS6 or prior
				"./assets/favicon/apple-touch-icon-152x152.png", // Apple iPad, Retina with iOS7
				"./assets/favicon/apple-touch-icon-180x180.png", // Apple iPhone 6 Plus with iOS8
				"./assets/favicon/browserconfig.xml", // IE11 icon configuration file
				"./assets/favicon/favicon.ico", // Favicon, IE and fallback for other browsers
				"./assets/favicon/favicon-16x16.png", // Favicon, default
				"./assets/favicon/favicon-32x32.png", // Favicon, Safari on Mac OS
				"./assets/favicon/manifest.json", // Manifest file
				"./assets/favicon/maskable_icon.png", // Favicon, maskable https://web.dev/maskable-icon
				"./assets/favicon/mstile-70x70.png", // Favicon, Windows 8 / IE11
				"./assets/favicon/mstile-144x144.png", // Favicon, Windows 8 / IE10
				"./assets/favicon/mstile-150x150.png", // Favicon, Windows 8 / IE11
				"./assets/favicon/mstile-310x150.png", // Favicon, Windows 8 / IE11
				"./assets/favicon/mstile-310x310.png", // Favicon, Windows 8 / IE11
				"./assets/favicon/safari-pinned-tab.svg", // Favicon, Safari pinned tab

				// images
				"./assets/star_field.png",
				"./assets/time_lord_glow.svg",
				"./assets/time_lord_silhouette",

				// html and css
				"./index.html", // Main HTML file
				"./css/main.css", // Main CSS file
				"./css/my-select.css",

				// js modules
				"./js/main.js",
				"./js/event_callbacks.js",

				"./js/artbyboredom/render.js",

				"./js/bpjmarriott/bpjmarriottGlyphs.js",
				"./js/bpjmarriott/render.js",
				"./js/bpjmarriott/setup.js",

				"./js/cbettenbender/cbettenbenderGlyphs.js",
				"./js/cbettenbender/render.js",
				"./js/cbettenbender/setup.js",

				"./js/cc/ccGlyphs.js",
				"./js/cc/render.js",
				"./js/cc/setup.js",

				"./js/darkifaerie/darkifaeriesGlyphs.js",
				"./js/darkifaerie/render.js",
				"./js/darkifaerie/setup.js",

				"./js/doctorsCot/doctorsCotGlyphs.js",
				"./js/doctorsCot/render.js",
				"./js/doctorsCot/setup.js",

				"./js/dotscript/render.js",

				"./js/oddism/oddismGlyphs.js",
				"./js/oddism/render.js",
				"./js/oddism/setup.js",

				"./js/shermans/shermansGlyphs.js",
				"./js/shermans/render.js",
				"./js/shermans/setup.js",

				"./js/tardisconsole2/consoleGlyphs.js",
				"./js/tardisconsole2/render.js",
				"./js/tardisconsole2/setup.js",

				"./js/utils/funcs.js",
				"./js/utils/MySelect.js",
				"./js/utils/SVGRenderingContext.js",
				"./js/utils/UILanguage.js",

			]);
		})
	);
});

self.addEventListener("activate", event => {
	// Delete any non-current cache
	event.waitUntil(
		caches.keys().then(keys => {
			Promise.all(
				keys.map(key => {
					if (![cacheName].includes(key)) {
						return caches.delete(key);
					}
				})
			)
		})
	);
});

// Offline-first, cache-first strategy
// Kick off two asynchronous requests, one to the cache and one to the network
// If there's a cached version available, use it, but fetch an update for next time.
// Gets data on screen as quickly as possible, then updates once the network has returned the latest data. 
self.addEventListener("fetch", event => {
	event.respondWith(
		caches.open(cacheName).then(cache => {
			return cache.match(event.request).then(response => {
				return response || fetch(event.request).then(networkResponse => {
					if (networkResponse) {
						cache.put(event.request, networkResponse.clone());
						return networkResponse;
					}
				});
			})
		})
	);
});