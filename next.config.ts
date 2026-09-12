import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
