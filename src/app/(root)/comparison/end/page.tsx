import ExerciseEndScreen from "@/components/exercise/ExerciseEndScreen";
import ComparisonEndResultClient from "@/features/comparison/components/ComparisonEndResultClient";

export const metadata = {
  title: "Comparison - Complete | APT-PWK",
  description: "Comparison exercise completed.",
};

type EndSearchParams = {
  score?: string;
  total?: string;
  attempted?: string;
  resultId?: string;
};

const parseParam = (value?: string): number | undefined => {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export default function ComparisonEndPage({
  searchParams,
}: {
  searchParams: EndSearchParams;
}) {
  const score = parseParam(searchParams.score);
  const total = parseParam(searchParams.total);
  const attempted = parseParam(searchParams.attempted);
  const resultId = searchParams.resultId;

  return (
    <ExerciseEndScreen
      exerciseName="Comparison Exercise"
      summary="You completed the comparison session. Retry to improve precision under time pressure."
      setupHref="/comparison"
      runHref="/comparison/run"
      score={score}
      total={total}
      attempted={attempted}
      resultContent={<ComparisonEndResultClient resultId={resultId} />}
    />
  );
}
