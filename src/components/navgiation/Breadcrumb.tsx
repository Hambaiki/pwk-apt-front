import { cn } from "@/libs/utils";

import { ChevronRight } from "lucide-react";

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
      className={cn(
        "flex flex-row flex-wrap bg-background-primary",
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
      className={`flex items-center transition-colors mr-2 text-sm ${
        isLast ? "font-bold text-primary-500" : ""
      }`}
    >
      {label}
      {!isLast && <ChevronRight size={20} className="ml-2" />}
    </Link>
  );
}
