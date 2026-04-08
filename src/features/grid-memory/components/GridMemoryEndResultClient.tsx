"use client";

import { Card } from "@/components/ui";
import { useExerciseResult } from "@/libs/exercise-result-store";
import { useSearchParams } from "next/navigation";
import { GridItem } from "../types";
import GridMemoryResult from "./GridMemoryResult";

interface GridMemoryEndPayload {
  grid: GridItem[][];
  userGrid: GridItem[][];
  correctCount: number;
}

const GridMemoryEndResultClient = ({ resultId }: { resultId?: string }) => {
  const searchParams = useSearchParams();
  const activeResultId = resultId ?? searchParams.get("resultId") ?? undefined;
  const payload = useExerciseResult<GridMemoryEndPayload>(
    "grid-memory",
    activeResultId,
  );

  if (!payload) {
    return (
      <Card>
        <p className="text-sm text-neutral-600">
          Detailed answer review is not available for this session.
        </p>
      </Card>
    );
  }

  return (
    <GridMemoryResult
      grid={payload.grid}
      userGrid={payload.userGrid}
      correctCount={payload.correctCount}
    />
  );
};

export default GridMemoryEndResultClient;
