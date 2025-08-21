import * as React from "react";
import { cn } from "@/libs/utils";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <label className={cn("flex items-center space-x-2", className)}>
        <input
          type="checkbox"
          className={cn(
            // Disabled state
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {label && <span className="text-sm">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
