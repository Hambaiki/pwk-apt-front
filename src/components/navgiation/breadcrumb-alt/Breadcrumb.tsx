import { BreadcrumbItemProps } from "./BreadcrumbItem";

import { clsx } from "clsx";
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
        "flex flex-row flex-wrap rounded-xl px-4 py-2",
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
