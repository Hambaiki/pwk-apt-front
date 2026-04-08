import { Button, Card } from "@/components/ui";

type SummaryItem = {
  label: string;
  value: string;
};

interface ExerciseSetupSummaryCardProps {
  title?: string;
  items: SummaryItem[];
  onStart: () => void;
  onOpenSettings: () => void;
  startLabel?: string;
}

const ExerciseSetupSummaryCard = ({
  title = "Saved Configuration",
  items,
  onStart,
  onOpenSettings,
  startLabel = "Start Exercise",
}: ExerciseSetupSummaryCardProps) => {
  return (
    <Card className="space-y-4 border border-neutral-200 bg-surface p-4">
      <h3 className="text-lg font-semibold text-neutral-800">{title}</h3>

      <dl className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-neutral-200 bg-white px-3 py-2"
          >
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              {item.label}
            </dt>
            <dd className="mt-1 text-sm font-medium text-neutral-800">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-wrap justify-end gap-3">
        <Button variant="outline" onClick={onOpenSettings}>
          Edit Configuration
        </Button>
        <Button onClick={onStart}>{startLabel}</Button>
      </div>
    </Card>
  );
};

export default ExerciseSetupSummaryCard;
