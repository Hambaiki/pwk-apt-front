import { File, Home, Info } from "lucide-react";

export const navbarItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    // add a field of what condition it can be active
  },
  {
    label: "Exercises",
    href: "/exercises",
    icon: File,
  },
  // {
  //   label: "About",
  //   href: "/about",
  //   icon: Info,
  // },
  {
    label: "Develop",
    href: "/develop",
    icon: Info,
  },
];
