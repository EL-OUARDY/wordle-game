import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheFirst, Serwist } from "serwist";
import { languagesList } from "@/components/LanguagesMenu";

// Extend the global worker scope with Serwist-specific properties
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    // __SW_MANIFEST is injected by the build tool and contains the precache files
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

// Tell TypeScript that `self` is a Service Worker global
declare const self: ServiceWorkerGlobalScope;

// Pages to precache
const PAGES = [
  "/",
  ...languagesList.map((l) => l.link), // language pages
  "/login",
  "/privacy-policy",
];

// Initialize Serwist with configuration
const serwist = new Serwist({
  // Files to precache, injected at build time
  precacheEntries: [...(self.__SW_MANIFEST ?? []), ...PAGES],

  // Immediately activate the new service worker without waiting
  skipWaiting: true,

  // Take control of uncontrolled clients as soon as the SW activates
  clientsClaim: true,

  // Enable navigation preload for faster page loads
  navigationPreload: true,

  // Runtime caching strategy for network requests
  runtimeCaching: [
    ...defaultCache,
    {
      matcher: ({ request }) => request.destination === "document",
      handler: new CacheFirst(),
    },
  ],

  // Fallbacks for offline scenarios
  fallbacks: {
    entries: [
      {
        url: "/", // Page to show if user is offline and there is no cached version available for the desired page.
        matcher({ request }) {
          // Only show offline page for navigation requests (HTML pages)
          return request.destination === "document";
        },
      },
    ],
  },
});

// Attach all the Serwist event listeners to handle caching, fetch, etc.
serwist.addEventListeners();

// Ignore RSC fetches when offline.
// Next.js tries to re-fetch `?_rsc=` payloads on navigation.
// Offline, these fail and trigger a full page reload,
// which resets client state (ex: game-over disappearing).
// Returning 204 makes Next think "no update" → keeps current UI.
self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("_rsc")) {
    // Do nothing → allow normal failure
    event.respondWith(
      (async () => {
        // return network only; when offline it will reject silently
        return fetch(event.request).catch(
          () => new Response(null, { status: 204 }),
        );
      })(),
    );
  }
});
