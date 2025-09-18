import { MetadataRoute } from "next";

import { navbarItems } from "@/constants/common/navbar";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://aptitude.pavarit.net";

  // Static routes
  const routes = Object.values(navbarItems).map((item) => ({
    url: `${baseUrl}${item.href}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
}
