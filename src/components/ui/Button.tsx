import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 text-text-inverse hover:bg-primary-600 focus:ring-primary-400",
        secondary:
          "bg-secondary-500 text-text-inverse hover:bg-secondary-600 focus:ring-secondary-400",
        success:
          "bg-success-500 text-text-inverse hover:bg-success-600 focus:ring-success-400",
        warning:
          "bg-warning-500 text-text-inverse hover:bg-warning-600 focus:ring-warning-400",
        error:
          "bg-error-500 text-text-inverse hover:bg-error-600 focus:ring-error-400",
        outline:
          "border border-secondary-300 bg-background-primary text-text-primary hover:bg-secondary-50 focus:ring-secondary-400",
        ghost:
          "text-text-secondary hover:bg-secondary-100 focus:ring-secondary-400",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
