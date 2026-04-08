"use client";

import Score from "@/components/exercise/Score";
import { GridItem, InputType } from "../types";
import GridCell from "./GridCell";

interface GridMemoryResultProps {
  grid: GridItem[][];
  userGrid: GridItem[][];
  correctCount: number;
}

const GridMemoryResult = ({
  grid,
  userGrid,
  correctCount,
}: GridMemoryResultProps) => {
  const totalCells = userGrid.flatMap((row) => row).length;
  const answeredCount = userGrid
    .flatMap((row) => row)
    .filter((cell) => cell.value !== "").length;

  return (
    <div className="space-y-6">
      <Score
        answerCount={answeredCount}
        correctCount={correctCount}
        totalCount={totalCells}
        score={correctCount}
        maxScore={totalCells}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {/* User result grid */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Your Results:</h3>
          <div className="mx-auto grid grid-cols-5 gap-2">
            {userGrid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <GridCell
                  item={cell}
                  key={`result-${rowIndex}-${colIndex}`}
                  variant={
                    cell.type === InputType.EMPTY
                      ? "unanswered"
                      : cell.value === grid[rowIndex][colIndex].value
                        ? "correct"
                        : "incorrect"
                  }
                />
              )),
            )}
          </div>
        </div>

        {/* Original grid for comparison */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">
            Original Grid:
          </h3>
          <div className="mx-auto grid grid-cols-5 gap-2">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <GridCell item={cell} key={`orig-${rowIndex}-${colIndex}`} />
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridMemoryResult;
