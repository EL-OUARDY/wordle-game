import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

// Extend the global worker scope with Serwist-specific properties
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    // __SW_MANIFEST is injected by the build tool and contains the precache files
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

// Tell TypeScript that `self` is a Service Worker global
declare const self: ServiceWorkerGlobalScope;

// Initialize Serwist with configuration
const serwist = new Serwist({
  // Files to precache, injected at build time
  precacheEntries: self.__SW_MANIFEST,

  // Immediately activate the new service worker without waiting
  skipWaiting: true,

  // Take control of uncontrolled clients as soon as the SW activates
  clientsClaim: true,

  // Enable navigation preload for faster page loads
  navigationPreload: true,

  // Runtime caching strategy for network requests
  runtimeCaching: defaultCache,

  // Fallbacks for offline scenarios
  fallbacks: {
    entries: [
      {
        url: "/offline", // Page to show if user is offline
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
