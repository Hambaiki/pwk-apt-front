"use client";

import ExerciseSessionControls from "@/components/exercise/ExerciseSessionControls";
import { Button, Card, Modal, ModalBody, ModalHeader } from "@/components/ui";
import {
  createResultId,
  saveExerciseResult,
} from "@/libs/exercise-result-store";
import { cn } from "@/libs/utils/cn";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { symbolPool } from "../constants";
import { Config, GridItem, InputType } from "../types";
import GridCell from "./GridCell";
import InputKeyboard from "./InputKeyboard";

interface GridMemoryExerciseProps extends React.HTMLAttributes<HTMLDivElement> {
  config: Config;
  grid: GridItem[][];
}

const GridMemoryExercise = ({
  config,
  grid,
  className,
  ...props
}: GridMemoryExerciseProps) => {
  const router = useRouter();

  const [isViewingHelp, setIsViewingHelp] = useState<boolean>(false);

  const [gameState, setGameState] = useState<"memorize" | "input" | "result">(
    "memorize",
  );
  const createEmptyGrid = (): GridItem[][] => {
    const newUserGrid: GridItem[][] = [];
    for (let i = 0; i < 5; i++) {
      const row: GridItem[] = [];
      for (let j = 0; j < 5; j++) {
        row.push({ type: InputType.EMPTY, value: "" });
      }
      newUserGrid.push(row);
    }
    return newUserGrid;
  };

  const [userGrid, setUserGrid] = useState<GridItem[][]>(createEmptyGrid);
  const [currentCell, setCurrentCell] = useState({ row: 0, col: 0 });
  const [isTimerActive, setIsTimerActive] = useState(true);

  const calculateCorrectCount = () => {
    let correct = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (grid[i] && grid[i][j] && userGrid[i] && userGrid[i][j]) {
          if (
            grid[i][j].type === userGrid[i][j].type &&
            grid[i][j].value === userGrid[i][j].value
          ) {
            correct++;
          }
        }
      }
    }
    return correct;
  };

  const handleCellInput = (inputType: InputType, inputValue: string) => {
    const newUserGrid = [...userGrid];
    newUserGrid[currentCell.row][currentCell.col] = {
      type: inputType,
      value: inputValue,
    };
    setUserGrid(newUserGrid);

    // Move to next cell
    let nextRow = currentCell.row;
    let nextCol = currentCell.col + 1;
    if (nextCol >= 5) {
      nextCol = 0;
      nextRow++;
    }
    if (nextRow < 5) {
      setCurrentCell({ row: nextRow, col: nextCol });
    }
  };

  const resetExercise = () => {
    setGameState("memorize");
    setUserGrid(createEmptyGrid());
    setCurrentCell({ row: 0, col: 0 });
    setIsTimerActive(true);
  };

  const endExercise = () => {
    if (gameState === "memorize") {
      setGameState("input");
    } else if (gameState === "input") {
      const correct = calculateCorrectCount();
      const resultId = createResultId();
      saveExerciseResult("grid-memory", resultId, {
        grid,
        userGrid,
        correctCount: correct,
      });
      router.push(
        `/grid-memory/end?score=${correct}&total=25&attempted=25&resultId=${resultId}`,
      );
    }
  };

  const exitExercise = () => {
    router.push("/grid-memory");
  };

  return (
    <div {...props} className={cn("flex flex-col gap-y-4", className)}>
      <ExerciseSessionControls
        isRunning={
          isTimerActive && (gameState === "memorize" || gameState === "input")
        }
        isComplete={false}
        timerLimit={
          gameState === "memorize" ? config.memoryTime : config.timeLimit
        }
        onEnd={endExercise}
        onPause={() => setIsTimerActive((prev) => !prev)}
        onHelp={() => setIsViewingHelp(true)}
        onRestart={resetExercise}
        onExit={exitExercise}
      />
      {
        <div
          className={`grid lg:grid-cols-2 gap-8 transition-all ${
            !isTimerActive ? "blur pointer-events-none" : ""
          }`}
        >
          {/* Grid Display */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">
              {gameState === "memorize" && "Memorize this grid:"}
              {gameState === "input" && "Fill in what you remember:"}
            </h3>

            <div className="grid grid-cols-5 gap-2 mx-auto">
              {(gameState === "memorize" ? grid : userGrid).map(
                (row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <GridCell
                      item={cell}
                      key={`${rowIndex}-${colIndex}`}
                      variant={
                        gameState === "input" &&
                        currentCell.row === rowIndex &&
                        currentCell.col === colIndex
                          ? "active"
                          : "default"
                      }
                      onClick={() =>
                        gameState === "input" &&
                        setCurrentCell({ row: rowIndex, col: colIndex })
                      }
                    />
                  )),
              )}
            </div>
          </div>

          {/* Input Panel */}
          <div
            className={`space-y-4 ${
              gameState === "memorize" && "opacity-50 pointer-events-none"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-700">
                Input Panel - Cell ({currentCell.row + 1}, {currentCell.col + 1}
                )
              </h3>
              <Button
                variant="outline"
                onClick={() => handleCellInput(InputType.EMPTY, "")}
              >
                <Trash size={16} className="mr-2" />
                Clear Cell
              </Button>
            </div>
            <InputKeyboard
              symbols={symbolPool}
              onInput={(type, value) => handleCellInput(type, value)}
            />
          </div>
        </div>
      }

      <Modal
        open={isViewingHelp}
        onClose={() => setIsViewingHelp(false)}
        size="2xl"
        scrollable
      >
        <ModalHeader
          title="How to Complete the Exercise"
          onClose={() => setIsViewingHelp(false)}
        />
        <ModalBody>
          <Card variant="info">
            <ol className="list-decimal list-inside space-y-2">
              <li>Memorize the grid during the memory phase</li>
              <li>Recall the characters after the memory phase</li>
              <li>Input the characters in their correct positions</li>
              <li>Submit your answers before time runs out</li>
              <li>Review your performance and improve over time</li>
            </ol>
          </Card>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default GridMemoryExercise;
