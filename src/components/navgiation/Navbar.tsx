import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui";

import { navbarItems } from "@/contants/common/navbar";

import Link from "next/link";
import { clsx } from "clsx";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  return (
    <nav
      className={clsx(`flex flex-row items-center justify-between`, className)}
    >
      <Logo />

      <div className="flex flex-row items-center gap-4">
        {navbarItems.map((item, index) => (
          <Link key={`navbar-item-${index}`} href={item.href}>
            <Button variant="ghost" className="text-sm transition-colors">
              {item.label}
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
}
