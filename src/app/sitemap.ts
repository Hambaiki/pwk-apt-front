import { exercises } from "@/constants/exercise";
import { ADDITIONAL_NAV_ITEMS, NAV_ITEMS } from "@/constants/navbar";

import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://aptitude.pavarit.net";

  // Static routes
  const routes = Object.values(NAV_ITEMS).map((item) => ({
    url: `${baseUrl}${item.href}`,
    lastModified: new Date().toISOString(),
  }));

  const additionalRoutes = Object.values(ADDITIONAL_NAV_ITEMS).map((item) => ({
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
