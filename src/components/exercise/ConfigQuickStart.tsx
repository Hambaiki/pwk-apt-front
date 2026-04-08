import { Button, Card } from "@/components/ui";
import { Zap } from "lucide-react";

interface ConfigQuickStartProps {
  description: string;
  quickStartLabel: string;
  onQuickStart: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  disabled?: boolean;
}

const ConfigQuickStart = ({
  description,
  quickStartLabel,
  onQuickStart,
  secondaryActionLabel,
  onSecondaryAction,
  disabled = false,
}: ConfigQuickStartProps) => {
  return (
    <Card variant="info" className="space-y-4">
      <div className="space-y-2">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-info-800">
          <Zap size={18} />
          Quick Start
        </h3>
        <p>{description}</p>
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        {secondaryActionLabel && onSecondaryAction ? (
          <Button variant="outline" onClick={onSecondaryAction}>
            {secondaryActionLabel}
          </Button>
        ) : null}
        <Button onClick={onQuickStart} disabled={disabled}>
          {quickStartLabel}
        </Button>
      </div>
    </Card>
  );
};

export default ConfigQuickStart;
