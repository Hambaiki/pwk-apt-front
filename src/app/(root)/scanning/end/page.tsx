import ExerciseEndScreen from "@/components/exercise/ExerciseEndScreen";
import ScanningEndResultClient from "@/features/scanning/components/ScanningEndResultClient";

export const metadata = {
  title: "Scanning - Complete | APT-PWK",
  description: "Scanning exercise completed.",
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

export default function ScanningEndPage({
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
      exerciseName="Scanning Exercise"
      summary="You completed the scanning session. You can retry to improve speed and accuracy."
      setupHref="/scanning"
      runHref="/scanning/run"
      score={score}
      total={total}
      attempted={attempted}
      resultContent={<ScanningEndResultClient resultId={resultId} />}
    />
  );
}
