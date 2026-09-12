import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const appwriteOrigin = new URL(
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "https://cloud.appwrite.io/v1",
).origin;

/**
 * Origins this site actually reaches: Appwrite for data, media and uploads,
 * Google Fonts for the two typefaces, OpenStreetMap for map tiles, and the
 * image hosts referenced by seeded content.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  `img-src 'self' data: blob: ${appwriteOrigin} https://images.unsplash.com https://placehold.co https://avatar.iran.liara.run https://tile.openstreetmap.org https://unpkg.com`,
  `media-src 'self' blob: ${appwriteOrigin}`,
  `connect-src 'self' ${appwriteOrigin}${isDev ? " ws: http://localhost:*" : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

/**
 * Applied to every response. The proxy runs only on the admin routes, so the
 * headers it set never reached a single public page.
 */
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
];

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
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
