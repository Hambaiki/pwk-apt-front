import { cn } from "@/libs/utils/cn";
import Link from "next/link";
import { Logo } from "../content/Logo";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "flex w-full flex-col gap-8 border-t border-neutral-200 bg-neutral-50 px-4 py-8 text-sm md:px-6",
        className,
      )}
    >
      <div className="grid gap-8 md:grid-cols-3">
        {/* Brand */}
        <div className="space-y-3">
          <Logo />
          <p className="text-neutral-700">
            Sharpen your mind with interactive aviation aptitude exercises.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="mb-2 font-semibold">Navigation</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="text-neutral-700 hover:text-brand-600">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/comparison"
                className="text-neutral-700 hover:text-brand-600"
              >
                Comparison
              </Link>
            </li>
            <li>
              <Link
                href="/grid-memory"
                className="text-neutral-700 hover:text-brand-600"
              >
                Grid Memory
              </Link>
            </li>
            <li>
              <Link
                href="/dual-task-coordination"
                className="text-neutral-700 hover:text-brand-600"
              >
                Dual Task Coordination
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="mb-2 font-semibold">Legal</h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/privacy"
                className="text-neutral-700 hover:text-brand-600"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-neutral-700 hover:text-brand-600"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-neutral-700 hover:text-brand-600"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-200 pt-4 text-center text-xs text-text-secondary">
        &copy; {new Date().getFullYear()} APT-PWK. Powered by Next.js and
        Tailwind CSS.
      </div>
    </footer>
  );
}
