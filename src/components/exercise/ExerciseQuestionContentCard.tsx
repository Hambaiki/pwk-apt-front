import { Card } from "@/components/ui";
import { cn } from "@/libs/utils/cn";
import type { HTMLAttributes, ReactNode } from "react";

interface ExerciseQuestionContentCardProps extends HTMLAttributes<HTMLDivElement> {
  questionLabel: string;
  title?: string;
  badge?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  contentClassName?: string;
}

const ExerciseQuestionContentCard = ({
  questionLabel,
  title,
  badge,
  children,
  actions,
  className,
  contentClassName,
  ...props
}: ExerciseQuestionContentCardProps) => {
  return (
    <Card className={cn("space-y-4 bg-surface p-0", className)} {...props}>
      <div className="space-y-1 border-b border-border p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-muted-foreground">
            {questionLabel}
          </p>
          {badge}
        </div>
        {title && <p className="text-sm text-muted-foreground">{title}</p>}
      </div>

      <div className={cn("space-y-4 p-4", contentClassName)}>{children}</div>

      {actions && (
        <div className="flex flex-wrap gap-3 border-t border-border p-4">
          {actions}
        </div>
      )}
    </Card>
  );
};

export default ExerciseQuestionContentCard;
