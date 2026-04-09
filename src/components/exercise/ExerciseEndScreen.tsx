import MainSection from "@/components/content/MainSection";
import { PageHeader } from "@/components/content/PageHeader";
import { Button, Card } from "@/components/ui";
import { CheckCircle2, Home, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Suspense, type ReactNode } from "react";

interface ExerciseEndScreenProps {
  exerciseName: string;
  summary: string;
  setupHref: string;
  runHref: string;
  score?: number;
  total?: number;
  attempted?: number;
  resultContent?: ReactNode;
}

const ExerciseEndScreen = ({
  exerciseName,
  summary,
  setupHref,
  runHref,
  score,
  total,
  attempted,
  resultContent,
}: ExerciseEndScreenProps) => {
  const hasScore =
    typeof score === "number" && typeof total === "number" && total > 0;
  const accuracy = hasScore ? Math.round((score / total) * 100) : null;

  let feedbackMessage: string | null = null;
  if (hasScore) {
    if (score === total) {
      feedbackMessage = "Perfect score! You nailed every question.";
    } else if (score >= total * 0.8) {
      feedbackMessage = "Great job! You're almost perfect.";
    } else if (score >= total * 0.5) {
      feedbackMessage = "Good effort! Keep practicing to improve even more.";
    } else {
      feedbackMessage = "Don't worry. Every mistake is a step toward learning.";
    }
  }

  return (
    <MainSection>
      <PageHeader
        title={`${exerciseName} Complete`}
        description="You can review your progress, retry immediately, or continue with another exercise."
        backHref={setupHref}
        backLabel="Back to Setup"
      />

      <Card className="space-y-6 p-6 sm:p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <CheckCircle2 className="h-12 w-12 text-success-600" />
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">
              Great work
            </h2>
            <p className="mt-1 text-sm text-neutral-600">{summary}</p>
          </div>
        </div>

        {hasScore && (
          <Card variant="outlined" className="grid gap-3 p-4 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-neutral-500">
                Score
              </p>
              <p className="text-2xl font-semibold text-neutral-900">
                {score}/{total}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-neutral-500">
                Accuracy
              </p>
              <p className="text-2xl font-semibold text-neutral-900">
                {accuracy}%
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-neutral-500">
                Attempted
              </p>
              <p className="text-2xl font-semibold text-neutral-900">
                {typeof attempted === "number" ? attempted : total}
              </p>
            </div>
          </Card>
        )}

        {feedbackMessage && (
          <p className="text-center text-sm font-medium text-neutral-700 sm:text-base">
            {feedbackMessage}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href={setupHref}>
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              icon={<Home size={16} />}
            >
              Back to Setup
            </Button>
          </Link>
          <Link href={runHref}>
            <Button className="w-full sm:w-auto" icon={<RotateCcw size={16} />}>
              Try Again
            </Button>
          </Link>
        </div>
      </Card>
      
      <Suspense
        fallback={
          <p className="text-sm text-neutral-600 animate-pulse">
            Loading detailed results...
          </p>
        }
      >
        {resultContent}
      </Suspense>
    </MainSection>
  );
};

export default ExerciseEndScreen;
