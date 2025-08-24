import { Comparison } from "@/types/exercises/comparison";

import { OptionButton } from "../QuestionButton";
import { QuestionCard } from "../QuestionCard";
import { Button } from "@/components/ui";

interface ComparisonExerciseCardProps {
  exercise: Comparison;
  selected?: string;
  progress?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
  isLast?: boolean;
  onAnswer: (choice: string) => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export const ComparisonExerciseCard = ({
  exercise,
  selected,
  progress,
  hasNext,
  hasPrevious,
  isLast,
  onAnswer,
  onNext,
  onPrevious,
}: ComparisonExerciseCardProps) => {
  const options = ["A", "B", "C", "D", "E", "F"];

  const convertBaseToString = (base: string[]) => {
    return base
      .filter(Boolean)
      .join(exercise.generationType === "words" ? ", " : "");
  };

  return (
    <QuestionCard
      title="Comparison Exercise"
      progressLabel="Progress"
      progress={progress}
    >
      {/* Question */}
      <h5 className="text-text-primary font-medium mb-3">
        If the left and the right are the same, select A. If 1 mistake, select
        B. If 2 mistakes, select C. If 3 mistakes, select D. If 4 mistakes,
        select E, If 5 or more mistakes, select F.
      </h5>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Left side */}
        <div className="p-4 border rounded bg-background-tertiary">
          <h6 className="text-sm font-medium text-secondary-600 mb-2">Left</h6>
          {convertBaseToString(exercise.base)}
        </div>
        {/* Right side */}
        <div className="p-4 border rounded bg-background-tertiary">
          <h6 className="text-sm font-medium text-secondary-600 mb-2">Right</h6>
          {convertBaseToString(exercise.mutatedBase)}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {options.map((opt) => (
          <OptionButton
            key={opt}
            label={opt}
            onClick={() => onAnswer(opt)}
            variant={opt === selected ? "selected" : "default"}
          />
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" disabled={!hasPrevious} onClick={onPrevious}>
          Previous Question
        </Button>
        {isLast ? (
          <Button onClick={onNext}>Finish</Button>
        ) : (
          <Button variant="primary" disabled={!hasNext} onClick={onNext}>
            Next Question
          </Button>
        )}
      </div>
    </QuestionCard>
  );
};
