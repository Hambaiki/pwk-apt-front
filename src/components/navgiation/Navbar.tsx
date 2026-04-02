"use client";

import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui";

import { additionalNavbarItems, navbarItems } from "@/constants/navbar";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className={clsx(`flex flex-row items-center gap-6`, className)}>
      <Link href={"/"}>
        <Logo />
      </Link>

      <div className="flex flex-1 flex-row items-center gap-6 justify-between">
        <div className="flex flex-row items-center gap-2">
          {Object.values(navbarItems).map((item, index) => (
            <Link key={`navbar-item-${index}`} href={item.href}>
              <Button
                variant={item.check(pathname) ? "primary" : "ghost"}
                className="rounded-full text-sm transition-colors"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="flex flex-row items-center gap-2">
          {Object.values(additionalNavbarItems).map((item, index) => (
            <Link key={`navbar-item-${index}`} href={item.href}>
              <Button variant="outline" className="text-sm transition-colors">
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
