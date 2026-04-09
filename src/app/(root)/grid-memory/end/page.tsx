import ExerciseEndScreen from "@/components/exercise/ExerciseEndScreen";
import GridMemoryEndResultClient from "@/features/grid-memory/components/GridMemoryEndResultClient";

export const metadata = {
  title: "Grid Memory - Complete | APT-PWK",
  description: "Grid memory exercise completed.",
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

export default async function GridMemoryEndPage({
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
      exerciseName="Grid Memory Exercise"
      summary="You completed the grid memory session. Replay to improve recall consistency."
      setupHref="/grid-memory"
      runHref="/grid-memory/run"
      score={score}
      total={total}
      attempted={attempted}
      resultContent={<GridMemoryEndResultClient resultId={resultId} />}
    />
  );
}
