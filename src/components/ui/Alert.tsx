import { cn } from "@/libs/utils";
import { cva, VariantProps } from "class-variance-authority";

import { CheckCircle, Info, TriangleAlert, XCircle } from "lucide-react";

const alertVariants = cva(
  "flex items-start gap-3 rounded-lg border p-2.5 text-sm",
  {
    variants: {
      type: {
        info: "bg-info-50 border-info-200 text-info-700",
        success: "bg-success-50 border-success-200 text-success-700",
        warning: "bg-warning-50 border-warning-200 text-warning-700",
        error: "bg-error-50 border-error-200 text-error-700",
      },
    },
  }
);

const iconMap = {
  info: {
    icon: <Info className="h-5 w-5 text-info-500" />,
  },
  success: {
    icon: <CheckCircle className="h-5 w-5 text-success-500" />,
  },
  warning: {
    icon: <TriangleAlert className="h-5 w-5 text-warning-500" />,
  },
  error: {
    icon: <XCircle className="h-5 w-5 text-error-500" />,
  },
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  message: string;
}

export function Alert({
  type = "info",
  title,
  message,
  className,
  ...props
}: AlertProps) {
  const { icon } = type ? iconMap[type] : iconMap.info;

  return (
    <div className={cn(alertVariants({ type, className }))} {...props}>
      <span className="flex-shrink-0">{icon}</span>
      <div className="flex-1">
        {title && <p className="font-semibold mb-1">{title}</p>}
        <p>{message}</p>
      </div>
    </div>
  );
}
