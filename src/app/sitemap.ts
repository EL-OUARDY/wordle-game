import { languagesList } from "@/components/LanguagesMenu";
import { APP_LINK } from "@/lib/constants";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date("2025-11-07");

  const languagePages = languagesList.map((l) => l.link);

  return [
    // Homepage
    {
      url: new URL(APP_LINK).toString(),
      lastModified: lastMod,
      priority: 1,
    },
    // Language pages
    ...languagePages.map((page) => ({
      url: new URL(page, APP_LINK).toString(),
      lastModified: lastMod,
      priority: 1,
    })),
    // Login page
    {
      url: new URL("/login", APP_LINK).toString(),
      lastModified: lastMod,
      priority: 0.5,
    },
    // Privacy page
    {
      url: new URL("/privacy-policy", APP_LINK).toString(),
      lastModified: lastMod,
      priority: 0.5,
    },
  ];
}
