import { cn } from "@/libs/utils/cn";
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * @deprecated Use FormInput from "@/components/ui/form" instead.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "rounded-lg border border-brand-300 bg-surface px-3 py-2 text-sm placeholder-text-tertiary text-text-primary",
          // Focus state
          "focus:border-brand-500 focus focus:outline-none focus:ring-0 focus:ring-brand-400 focus:ring-offset-0",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
