import { APP_NAME } from "@/lib/constants";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${APP_NAME} - Play Wordle in Your Language`,
    short_name: APP_NAME,
    description:
      "Play Wordle for free, in your language, with no ads — unlimited fun, no limits! Track stats, compete, and enjoy multilingual word guessing.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/desktop.png",
        sizes: "2560x1440",
        type: "image/png",
        form_factor: "wide", // for desktop
      },
      {
        src: "/screenshots/mobile.png",
        sizes: "750x1334",
        type: "image/png", // no form_factor = mobile
      },
    ],
  };
}
