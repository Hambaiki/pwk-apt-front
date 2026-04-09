import ExerciseEndScreen from "@/components/exercise/ExerciseEndScreen";
import SequenceMemoryEndResultClient from "@/features/sequence-memory/components/SequenceMemoryEndResultClient";

export const metadata = {
  title: "Sequence Memory - Complete | APT-PWK",
  description: "Sequence memory exercise completed.",
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

export default async function SequenceMemoryEndPage({
  searchParams,
}: {
  searchParams: Promise<EndSearchParams>;
}) {
  const params = await searchParams;
  const score = parseParam(params.score);
  const total = parseParam(params.total);
  const attempted = parseParam(params.attempted);
  const resultId = params.resultId;

  return (
    <ExerciseEndScreen
      exerciseName="Sequence Memory Exercise"
      summary="You completed the sequence memory session. Retry to improve recall depth and consistency."
      setupHref="/sequence-memory"
      runHref="/sequence-memory/run"
      score={score}
      total={total}
      attempted={attempted}
      resultContent={<SequenceMemoryEndResultClient resultId={resultId} />}
    />
  );
}
