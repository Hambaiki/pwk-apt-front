import { navbarItems, additionalNavbarItems } from "@/constants/common/navbar";
import { exercises } from "@/constants/common/exercise";

import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://aptitude.pavarit.net";

  // Static routes
  const routes = Object.values(navbarItems).map((item) => ({
    url: `${baseUrl}${item.href}`,
    lastModified: new Date().toISOString(),
  }));

  const additionalRoutes = Object.values(additionalNavbarItems).map((item) => ({
    url: `${baseUrl}${item.href}`,
    lastModified: new Date().toISOString(),
  }));

  // Exercise routes
  const exerciseRoutes = exercises.map((exercise) => ({
    url: `${baseUrl}${exercise.href}`,
    lastModified: new Date().toISOString(),
  }));

  const allRoutes = [...routes, ...additionalRoutes, ...exerciseRoutes];

  return allRoutes;
}
