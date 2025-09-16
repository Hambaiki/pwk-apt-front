import Link from "next/link";

import Logo from "../common/Logo";

import { cn } from "@/libs/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn(`flex flex-col w-full`, className)}>
      <div className="flex justify-evenly gap-8 text-sm">
        {/* Brand */}
        <div>
          <Logo />
          <p className="">Sharpen your mind with interactive exercises.</p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-2">Navigation</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/exercises">Exercises</Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-2">Legal</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
            <li>
              <Link href="/about">Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 pt-4 text-center text-xs text-text-secondary">
        {new Date().getFullYear()} Aptitude Exercise. Powered by Next.js and
        Tailwind CSS.
      </div>
    </footer>
  );
}
