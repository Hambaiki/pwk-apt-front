import { navbarItems } from "@/contants/navbar";

import { FaGear } from "react-icons/fa6";

import Link from "next/link";
import { clsx } from "clsx";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  return (
    <div
      className={clsx(
        `flex flex-row items-center justify-between bg-gradient-to-b from-nile-blue-700 to-nile-blue-800`,
        className
      )}
    >
      <p
        id="navbar"
        className="flex items-center font-bold text-xl text-white"
      >
        <FaGear className="inline-block mr-2 text-jungle-green-500" />{" "}
        <span className="hidden sm:block">APT EXERCISE</span>
      </p>

      <div className="flex flex-row items-center gap-4">
        {navbarItems.map((item, index) => (
          <Link
            key={`navbar-item-${index}`}
            href={item.href}
            className="group flex flex-row items-center gap-2 py-2 px-4 rounded-full hover:bg-green-white-500 transition-colors duration-200 ease-in-out"
          >
            {/* <item.icon className="w-5 h-5" /> */}
            <span className="text-sm text-white group-hover:text-black transition-colors">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
