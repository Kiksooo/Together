import type { MetadataRoute } from "next";
import { configuredSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

const paths = [
  "/",
  "/about",
  "/hug",
  "/memorial-sculptures",
  "/cremation-urns",
  "/faq",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = configuredSiteUrl();
  if (!base) return [];

  return paths.map((path) => ({
    url: `${base}${path}`,
  }));
}
