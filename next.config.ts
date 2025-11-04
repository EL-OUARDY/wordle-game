import type { NextConfig } from "next";
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

export default async function nextConfig(phase: string): Promise<NextConfig> {
  // Next.js configuration
  let config: NextConfig = {
    devIndicators: false,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
        },
      ],
    },
  };

  // Wrap the Next.js config with next-intl to enable internationalization (i18n) support
  config = withNextIntl(config);

  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const { default: withSerwist } = await import("@serwist/next");
    return withSerwist({
      swSrc: "src/service-worker.ts",
      swDest: "public/sw.js",
      reloadOnOnline: true,
      disable: process.env.NODE_ENV !== "production",
    })(config);
  }

  return config;
}
