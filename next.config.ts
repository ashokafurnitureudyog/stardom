import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all domains
      },
      {
        protocol: "http",
        hostname: "**", // Allow all domains
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        search: "",
      },
      { protocol: "https", hostname: "example.com" },
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
      },
    ],
  },
};

export default nextConfig;
