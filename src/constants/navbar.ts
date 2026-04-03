import type {
  AppSidebarFooterSection,
  AppSidebarNavSection,
} from "@/types/navbar";
import type { LucideIcon } from "lucide-react";
import { File, Home, Info } from "lucide-react";

export const NAV_ITEMS: Record<
  string,
  {
    label: string;
    href: string;
    icon: LucideIcon;
    check: (path: string) => boolean;
  }
> = {
  home: {
    label: "Home",
    href: "/",
    icon: Home,
    check: (path: string) => path === "/",
  },
  exercises: {
    label: "Exercises",
    href: "/exercises",
    icon: File,
    check: (path: string) => path.startsWith("/exercises"),
  },
  tools: {
    label: "Tools",
    href: "/tools",
    icon: Info,
    check: (path: string) => path.startsWith("/tools"),
  },
} as const;

export const ADDITIONAL_NAV_ITEMS: Record<
  string,
  {
    label: string;
    href: string;
    icon: LucideIcon;
    check: (path: string) => boolean;
  }
> = {
  about: {
    label: "About",
    href: "/about",
    icon: Info,
    check: (path: string) => path.startsWith("/about"),
  },
} as const;

export const NAV_SECTIONS: AppSidebarNavSection[] = [
  {
    items: [
      {
        href: NAV_ITEMS.home.href,
        label: NAV_ITEMS.home.label,
        icon: NAV_ITEMS.home.icon,
        exact: true,
      },
      {
        href: NAV_ITEMS.exercises.href,
        label: NAV_ITEMS.exercises.label,
        icon: NAV_ITEMS.exercises.icon,
      },
      {
        href: NAV_ITEMS.tools.href,
        label: NAV_ITEMS.tools.label,
        icon: NAV_ITEMS.tools.icon,
      },
    ],
  },
];

export const FOOTER_SECTIONS: AppSidebarFooterSection[] = [
  {
    href: ADDITIONAL_NAV_ITEMS.about.href,
    label: ADDITIONAL_NAV_ITEMS.about.label,
    icon: ADDITIONAL_NAV_ITEMS.about.icon,
  },
];
