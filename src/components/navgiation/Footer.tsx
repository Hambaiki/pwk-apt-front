import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-background-tertiary py-8 mt-12">
      <div className="flex justify-evenly gap-8 text-sm">
        {/* Brand */}
        <div>
          <h2 className="text-lg font-semibold">Aptitude Exercise</h2>
          <p className="text-text-secondary mt-2">
            Sharpen your mind with interactive exercises.
          </p>
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
            <li>
              <Link href="/develop">Develop</Link>
            </li>
            {/* <li><Link href="/about">About</Link></li> */}
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
              <Link href="/contact">Contact</Link>
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
