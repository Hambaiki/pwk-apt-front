import ExerciseQuestionContentCard from "@/components/exercise/ExerciseQuestionContentCard";
import { OptionButton } from "@/components/exercise/QuestionButton";
import { Button } from "@/components/ui";
import { Choice } from "@/types/exercies";
import { ComparisonItem, GenerationType } from "../types";

interface ComparisonExerciseCardProps {
  questionNumber?: number;
  exercise: ComparisonItem;
  selected?: string;
  progress?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
  isLast?: boolean;
  onAnswer: (choice: Choice) => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export const ComparisonExerciseCard = ({
  questionNumber,
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
  const choices: Choice[] = Object.values(Choice);

  const convertBaseToString = (base: string[]) => {
    return base
      .filter(Boolean)
      .join(exercise.generationType === GenerationType.WORDS ? ", " : "");
  };

  return (
    <ExerciseQuestionContentCard
      questionLabel={`Question ${questionNumber ?? 1}`}
      title="If both sides match select A, then B for 1 mistake, C for 2, D for 3, E for 4, and F for 5+ mistakes."
    >
      {/* Question */}
      {progress !== undefined && (
        <div className="inline-flex rounded-full border border-info-200 bg-info-50 px-2.5 py-1 text-xs font-medium text-info-700">
          Progress: {Math.round(progress * 100)}%
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Left side */}
        <div className="p-4 rounded-md bg-surface-muted">
          <h6 className="text-sm font-medium text-brand-600 mb-2">Left</h6>
          {convertBaseToString(exercise.base)}
        </div>
        {/* Right side */}
        <div className="p-4 rounded-md bg-surface-muted">
          <h6 className="text-sm font-medium text-brand-600 mb-2">Right</h6>
          {convertBaseToString(exercise.mutatedBase)}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {choices.map((opt) => (
          <OptionButton
            key={opt}
            label={opt}
            onClick={() => onAnswer(opt)}
            variant={opt === selected ? "selected" : "default"}
          />
        ))}
      </div>

      {/* Action buttons */}
      {(onNext || onPrevious) && (
        <div className="flex justify-end gap-3 pt-1">
          <Button
            variant="outline"
            disabled={!hasPrevious}
            onClick={onPrevious}
          >
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
      )}
    </ExerciseQuestionContentCard>
  );
};
