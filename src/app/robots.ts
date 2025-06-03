import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/*", "/(auth)/*"],
    },
    sitemap: "https://stardom.co.in/sitemap.xml",
  };
}
