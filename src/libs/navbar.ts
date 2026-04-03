import { ADDITIONAL_NAV_ITEMS, NAV_ITEMS } from "@/constants/navbar";
import { AppSidebarNavItem, type BreadcrumbItem } from "@/types/navbar";

export function isActiveNavItem(
  pathname: string,
  item: AppSidebarNavItem,
): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  if (pathname === "/") {
    return breadcrumbs;
  }

  const segments = pathname.split("/").filter(Boolean);
  let currentPath = "";

  for (const segment of segments) {
    currentPath += `/${segment}`;

    const matchedItem = [
      ...Object.values(NAV_ITEMS),
      ...Object.values(ADDITIONAL_NAV_ITEMS),
    ].find((item) => item.href === currentPath);

    breadcrumbs.push({
      label: matchedItem?.label ?? segment.replace(/-/g, " "),
      href: currentPath,
    });
  }

  return breadcrumbs;
};
