import { ChevronRight } from "lucide-react";

import Link from "next/link";

export interface BreadcrumbItemProps {
  label: string;
  href: string;
  isLast?: boolean;
}

export function BreadcrumbItem({
  label,
  href,
  isLast = false,
}: BreadcrumbItemProps) {
  return (
    <Link
      href={href}
      className={`transition-colors mr-2 ${
        isLast ? "text-suzuha-teal-500" : ""
      }`}
    >
      {label}
      {!isLast && <ChevronRight className="inline ml-2" />}
    </Link>
  );
}
