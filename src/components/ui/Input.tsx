import * as React from "react";
import { cn } from "@/libs/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "rounded-lg border border-secondary-300 bg-background-primary px-3 py-2 text-sm placeholder-text-tertiary text-text-primary",
          // Focus state
          "focus:border-primary-500 focus focus:outline-none focus:ring-0 focus:ring-primary-400 focus:ring-offset-0",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
