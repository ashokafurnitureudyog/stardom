import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Baked at build time: cacheComponents rejects new Date() during a client prerender.
  env: { NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()) },
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    useTypeScriptCli: true,
    turbopackRustReactCompiler: true,
    useOffline: true,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
