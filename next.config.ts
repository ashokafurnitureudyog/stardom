import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
    qualities: [75, 90],
  },
  reactCompiler: true,
  cacheComponents: true,
};

export default nextConfig;
