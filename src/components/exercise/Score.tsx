import { Card } from "@/components/ui";

import { cn } from "@/libs/utils/cn";

interface ScoreProps extends React.HTMLAttributes<HTMLDivElement> {
  answerCount: number;
  correctCount: number;
  totalCount: number;
  score: number;
  maxScore: number;
}

const Score = ({
  answerCount,
  correctCount,
  totalCount,
  score,
  maxScore,
  className,
  ...props
}: ScoreProps) => {
  let feedbackMessage = "";

  if (score === maxScore) {
    feedbackMessage = "Perfect score! You nailed every question.";
  } else if (score >= maxScore * 0.8) {
    feedbackMessage = "Great job! You're almost perfect.";
  } else if (score >= maxScore * 0.5) {
    feedbackMessage = "Good effort! Keep practicing to improve even more.";
  } else {
    feedbackMessage = "Don't worry. Every mistake is a step toward learning.";
  }

  return (
    <Card
      className={cn(
        "p-6 flex flex-col gap-4 bg-linear-to-br from-brand-600 to-brand-400 shadow-medium",
        className,
      )}
      {...props}
    >
      <h2 className="text-4xl font-bold text-white">Results</h2>

      {/* Score summary */}
      <div className="space-y-2">
        <p className="text-neutral-100 text-lg">
          You answered <span className="font-semibold">{correctCount}</span> out
          of <span className="font-semibold">{totalCount}</span> questions
          correctly.
        </p>

        <Card className="p-3">
          <div className="h-4 w-full bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-4 bg-success-400 transition-all duration-700"
              style={{
                width: `${Math.round((score / maxScore) * 100)}%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-4">
            <p>
              Overall Score:{" "}
              <span className="font-semibold">
                {Math.round((score / maxScore) * 100)}%
              </span>
            </p>
            <p>
              Accuracy:{" "}
              <span className="font-semibold">
                {answerCount > 0
                  ? `${Math.round((correctCount / answerCount) * 100)}%`
                  : "N/A"}
              </span>
            </p>
          </div>
        </Card>
      </div>

      {/* Personalized message */}
      <div className="text-lg text-white font-medium">{feedbackMessage}</div>
    </Card>
  );
};

export default Score;
