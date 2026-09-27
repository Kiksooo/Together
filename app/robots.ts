import type { MetadataRoute } from "next";
import { configuredSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const base = configuredSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(base ? { sitemap: `${base}/sitemap.xml` } : {}),
  };
}
