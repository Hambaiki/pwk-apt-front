import { Button } from "@/components/ui";
import { CircleHelp, Settings2 } from "lucide-react";
import type { ReactNode } from "react";

interface ExerciseMainActionsProps {
  onOpenHowTo: () => void;
  onOpenSettings: () => void;
  extraActions?: ReactNode;
}

const ExerciseMainActions = ({
  onOpenHowTo,
  onOpenSettings,
  extraActions,
}: ExerciseMainActionsProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" onClick={onOpenHowTo}>
        <CircleHelp size={16} className="mr-2" />
        How to Play
      </Button>
      <Button variant="outline" onClick={onOpenSettings}>
        <Settings2 size={16} className="mr-2" />
        Open Custom Settings
      </Button>
      {extraActions}
    </div>
  );
};

export default ExerciseMainActions;
