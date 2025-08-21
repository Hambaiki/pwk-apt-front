import { FaChevronRight } from "react-icons/fa";

import { clsx } from "clsx";
import Link from "next/link";
import { Children, cloneElement, isValidElement } from "react";

interface BreadcrumbProps {
  children: React.ReactNode;
  className?: string;
}

export function Breadcrumb({ children, className }: BreadcrumbProps) {
  const childrenArray = Children.toArray(children);

  return (
    <div
      className={clsx(
        "flex flex-row flex-wrap rounded-xl px-6 py-2 bg-background-tertiary",
        className
      )}
    >
      {childrenArray.map((child, index) => {
        if (isValidElement(child)) {
          const isLast = index === childrenArray.length - 1;
          return cloneElement(
            child as React.ReactElement<BreadcrumbItemProps>,
            {
              isLast: isLast,
            }
          );
        }
        return child;
      })}
    </div>
  );
}

interface BreadcrumbItemProps {
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
      className={`transition-colors mr-2 ${isLast ? "font-bold text-primary-500" : ""}`}
    >
      {label}
      {!isLast && <FaChevronRight className="inline ml-2" />}
    </Link>
  );
}
