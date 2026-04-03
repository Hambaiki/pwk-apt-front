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
  return (
    <Card
      className={cn(
        "p-6 flex flex-col gap-4 bg-gradient-to-br from-brand-600 to-brand-400 shadow-medium",
        className,
      )}
      {...props}
    >
      <h2 className="text-4xl font-bold text-white">Results</h2>

      {/* Score summary */}
      <div className="space-y-2">
        <p className="text-gray-100 text-lg">
          You answered <span className="font-semibold">{correctCount}</span> out
          of <span className="font-semibold">{totalCount}</span> questions
          correctly.
        </p>

        <Card className="p-3">
          <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-4 bg-green-400 transition-all duration-700"
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
      <div className="text-lg text-white font-medium">
        {score === maxScore && "🌟 Perfect score! You nailed every question."}
        {score >= maxScore * 0.8 &&
          score < maxScore &&
          "🔥 Great job! You're almost perfect."}
        {score >= maxScore * 0.5 &&
          score < maxScore * 0.8 &&
          "👍 Good effort! Keep practicing to improve even more."}
        {score < maxScore * 0.5 &&
          "💡 Don’t worry! Every mistake is a step toward learning."}
      </div>
    </Card>
  );
};

export default Score;
