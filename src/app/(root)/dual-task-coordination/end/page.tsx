import ExerciseEndScreen from "@/components/exercise/ExerciseEndScreen";
import DualTaskEndResultClient from "@/features/dual-task-coordination/components/DualTaskEndResultClient";

export const metadata = {
  title: "Dual Task Coordination - Complete | APT-PWK",
  description: "Dual task coordination exercise completed.",
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

export default async function DualTaskCoordinationEndPage({
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
      exerciseName="Dual Task Coordination Exercise"
      summary="You completed the dual-task session. Retry to improve synchronization and response accuracy."
      setupHref="/dual-task-coordination"
      runHref="/dual-task-coordination/run"
      score={score}
      total={total}
      attempted={attempted}
      resultContent={<DualTaskEndResultClient resultId={resultId} />}
    />
  );
}
