import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
        port: '',
        search: '',
      },
    ],
  },
};

export default nextConfig;
