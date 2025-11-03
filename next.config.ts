import type { NextConfig } from "next";
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants";

export default async function nextConfig(phase: string): Promise<NextConfig> {
  // Next.js configuration
  const config: NextConfig = {
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
