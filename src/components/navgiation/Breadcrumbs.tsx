import { FaChevronRight } from "react-icons/fa";

import { clsx } from "clsx";
import Link from "next/link";

interface BreadcrumbsProps {
  breadcrumbs: { label: string; href: string }[];
  className?: string;
}

export default function Breadcrumbs({
  breadcrumbs,
  className,
}: BreadcrumbsProps) {
  return (
    <div
      className={clsx(
        "translucent-rounded-container flex flex-row flex-wrap rounded-xl px-4 py-2",
        className
      )}
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <Link
          key={breadcrumb.href}
          href={breadcrumb.href}
          className={`transition-colors mr-2 ${
            index !== breadcrumbs.length - 1 ? "" : "text-suzuha-teal-500"
          }`}
        >
          {breadcrumb.label}
          {index !== breadcrumbs.length - 1 && (
            <FaChevronRight className="inline ml-2" />
          )}
        </Link>
      ))}
    </div>
  );
}
