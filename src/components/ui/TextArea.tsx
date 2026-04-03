import { cn } from "@/libs/utils/cn";
import * as React from "react";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full rounded-lg border border-secondary-300 bg-background-primary px-3 py-2 text-sm placeholder-text-tertiary text-text-primary",
          // Focus state
          "focus:border-brand-500 focus focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-0",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

TextArea.displayName = "TextArea";
