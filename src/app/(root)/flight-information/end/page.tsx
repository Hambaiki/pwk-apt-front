import ExerciseEndScreen from "@/components/exercise/ExerciseEndScreen";
import FlightInformationEndResultClient from "@/features/flight-information/components/FlightInformationEndResultClient";

export const metadata = {
  title: "Flight Information Memory - Complete | APT-PWK",
  description: "Flight information memory exercise completed.",
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

export default async function FlightInformationEndPage({
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
      exerciseName="Flight Information Memory Exercise"
      summary="You completed the flight information memory session. Retry to improve recall precision."
      setupHref="/flight-information"
      runHref="/flight-information/run"
      score={score}
      total={total}
      attempted={attempted}
      resultContent={<FlightInformationEndResultClient resultId={resultId} />}
    />
  );
}
