import { Button, Card } from "@/components/ui";
import { cn } from "@/libs/utils/cn";
import type { ReactNode } from "react";

interface NavigatorItem {
  id: string;
  label: string;
  targetId: string;
  isCompleted?: boolean;
  completedLabel?: string;
  pendingLabel?: string;
}

interface ExerciseQuestionRunLayoutProps {
  controls?: ReactNode;
  panelTitle: ReactNode;
  panelMeta?: ReactNode;
  navigatorTitle?: string;
  navigatorItems: NavigatorItem[];
  children: ReactNode;
  footer?: ReactNode;
  blocked?: boolean;
  className?: string;
}

const ExerciseQuestionRunLayout = ({
  controls,
  panelTitle,
  panelMeta,
  navigatorTitle = "Question Navigator",
  navigatorItems,
  children,
  footer,
  blocked = false,
  className,
}: ExerciseQuestionRunLayoutProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      {controls}

      <Card className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold">{panelTitle}</h2>
          {panelMeta}
        </div>

        <div
          className={cn(
            "grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]",
            blocked && "pointer-events-none blur",
          )}
        >
          <Card className="h-fit lg:sticky lg:top-4">
            <h3 className="mb-3 text-sm font-semibold text-neutral-800">
              {navigatorTitle}
            </h3>
            <div className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto pr-1">
              {navigatorItems.map((item) => {
                const statusLabel = item.isCompleted
                  ? item.completedLabel ?? "Completed"
                  : item.pendingLabel ?? "Pending";

                return (
                  <Button
                    key={item.id}
                    size="sm"
                    variant={item.isCompleted ? "primary" : "outline"}
                    className="justify-start"
                    onClick={() => {
                      const element = document.getElementById(item.targetId);
                      element?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    {item.label} - {statusLabel}
                  </Button>
                );
              })}
            </div>
          </Card>

          <div className="space-y-4">{children}</div>
        </div>
      </Card>

      {footer && <div className="flex items-center justify-end gap-3">{footer}</div>}
    </div>
  );
};

export default ExerciseQuestionRunLayout;