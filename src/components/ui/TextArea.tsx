import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full rounded-lg border border-secondary-300 bg-background-primary px-3 py-2 text-sm placeholder-text-tertiary text-text-primary",
          // Focus state
          "focus:border-primary-500 focus focus:ring-2 focus:ring-primary-400 focus:ring-offset-1 transition-all",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

TextArea.displayName = "TextArea";
