"use client";

import Logo from "@/components/common/Logo";

import { navbarItems } from "@/contants/navbar";

import Link from "next/link";
import { clsx } from "clsx";
import { headers } from "next/headers";
import { usePathname } from "next/navigation";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav
      className={clsx(`flex flex-row items-center justify-between`, className)}
    >
      <Logo />

      <div className="flex flex-row items-center gap-4">
        {navbarItems.map((item, index) => (
          <Link
            key={`navbar-item-${index}`}
            href={item.href}
            className={clsx(
              "group flex flex-row items-center gap-2 pb-2 px-4 pt-3",
              "border-b-4 border-transparent transition-all",
              pathname === item.href
                ? "border-b-jungle-green-500"
                : "hover:border-b-jungle-green-800"
            )}
          >
            {/* <item.icon className="w-5 h-5" /> */}
            <span className="text-sm transition-colors">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
