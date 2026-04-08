import ExerciseEndScreen from "@/components/exercise/ExerciseEndScreen";
import ReadBackMemoryEndResultClient from "@/features/read-back-memory/ReadBackMemoryEndResultClient";

export const metadata = {
  title: "Read Back Memory - Complete | APT-PWK",
  description: "Read back memory exercise completed.",
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

export default function ReadBackMemoryEndPage({
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
      exerciseName="Read Back Memory Exercise"
      summary="You completed the read-back session. Retry to improve ordered recall performance."
      setupHref="/read-back-memory"
      runHref="/read-back-memory/run"
      score={score}
      total={total}
      attempted={attempted}
      resultContent={<ReadBackMemoryEndResultClient resultId={resultId} />}
    />
  );
}
