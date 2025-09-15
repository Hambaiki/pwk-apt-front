import { File, Home, Info } from "lucide-react";

export const navbarItems: Record<
  string,
  {
    label: string;
    href: string;
    icon: React.ElementType;
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
} as const;

export const additionalNavbarItems: Record<
  string,
  {
    label: string;
    href: string;
    icon: React.ElementType;
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
