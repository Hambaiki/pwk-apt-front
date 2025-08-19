import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      color: {
        primary: "bg-primary-100 text-primary-700",
        secondary: "bg-secondary-100 text-secondary-700",
        success: "bg-success-100 text-success-700",
        warning: "bg-warning-100 text-warning-700",
        error: "bg-error-100 text-error-700",
        info: "bg-info-100 text-info-700",
      },
    },
  }
);

export function Badge({
  children,
  color = "primary",
  className,
}: {
  children: React.ReactNode;
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  className?: string;
}) {
  return (
    <span className={cn(badgeVariants({ color, className }))}>{children}</span>
  );
}
