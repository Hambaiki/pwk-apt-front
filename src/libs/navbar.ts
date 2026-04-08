import { ROUTE_LABELS } from "@/constants/navbar";
import { AppSidebarNavItem, type BreadcrumbItem } from "@/types/navbar";

export function isActiveNavItem(
  pathname: string,
  item: AppSidebarNavItem,
): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: ROUTE_LABELS["/"], href: "/" },
  ];

  if (pathname === "/") {
    return breadcrumbs;
  }

  const segments = pathname.split("/").filter(Boolean);
  let currentPath = "";

  for (const segment of segments) {
    currentPath += `/${segment}`;

    breadcrumbs.push({
      label:
        ROUTE_LABELS[currentPath] ??
        segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (character) => character.toUpperCase()),
      href: currentPath,
    });
  }

  return breadcrumbs;
};
