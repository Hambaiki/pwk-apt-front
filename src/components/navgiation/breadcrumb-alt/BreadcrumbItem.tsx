import { FaChevronRight } from "react-icons/fa";

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
      {!isLast && <FaChevronRight className="inline ml-2" />}
    </Link>
  );
}
