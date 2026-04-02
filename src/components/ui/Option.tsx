import { cn } from "@/libs/utils/cn";
import * as React from "react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLOptionElement> {}

export const Option = React.forwardRef<HTMLOptionElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <option
        ref={ref}
        className={cn(
          "flex w-full rounded-lg border border-secondary-300 bg-background-primary px-3 py-2 text-sm placeholder-text-tertiary text-text-primary",
          // Focus state
          "focus:border-primary-500 focus focus:outline-none focus:ring-0 focus:ring-primary-400 focus:ring-offset-0",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </option>
    );
  },
);

Option.displayName = "Option";
