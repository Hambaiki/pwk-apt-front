"use client";

import { Button, Card, Modal } from "@/components/ui";
import { ModalContent, ModalHeader } from "@/components/ui/Modal";
import Collapse from "@/components/content/Collapse";
import Toolbar from "@/components/exercise/Toolbar";
import Score from "@/components/exercise/Score";
import InputKeyboard from "@/components/exercise/grid-memory/InputKeyboard";
import GridCell from "@/components/exercise/grid-memory/GridCell";

import { letterPool, numberPool, symbolPool } from "@/constants/exercises/grid";

import { Config, GridItem, InputType } from "@/types/exercises/grid";

import { cn } from "@/libs/utils";

import { Trash } from "lucide-react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
    "memorize"
  );
  const [userGrid, setUserGrid] = useState<GridItem[][]>([]);
  const [currentCell, setCurrentCell] = useState({ row: 0, col: 0 });
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    initializeUserGrid();
  }, []);

  const initializeUserGrid = () => {
    const newUserGrid: GridItem[][] = [];
    for (let i = 0; i < 5; i++) {
      const row: GridItem[] = [];
      for (let j = 0; j < 5; j++) {
        row.push({ type: InputType.EMPTY, value: "" });
      }
      newUserGrid.push(row);
    }
    setUserGrid(newUserGrid);
  };

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
    setCorrectCount(correct);
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
    initializeUserGrid();
    setCurrentCell({ row: 0, col: 0 });
    setCorrectCount(0);
    setIsTimerActive(true);
  };

  const endExercise = () => {
    if (gameState === "memorize") {
      setGameState("input");
    } else if (gameState === "input") {
      setGameState("result");
      setIsTimerActive(false);
      calculateCorrectCount();
    }
  };

  const exitExercise = () => {
    router.push("/exercises/grid-memory");
  };

  return (
    <div {...props} className={cn("flex flex-col gap-y-4", className)}>
      <Toolbar
        isRunning={
          isTimerActive && (gameState === "memorize" || gameState === "input")
        }
        isComplete={gameState === "result"}
        timerLimit={
          gameState === "memorize" ? config.memoryTime : config.timeLimit
        }
        onEnd={endExercise}
        onPause={() => setIsTimerActive((prev) => !prev)}
        onHelp={() => setIsViewingHelp(true)}
        onRestart={resetExercise}
        onExit={exitExercise}
      />

      <Collapse isOpen={gameState === "result"}>
        <Score
          answerCount={
            Object.keys(
              userGrid.flatMap((row) => row).filter((cell) => cell.value !== "")
            ).length
          }
          correctCount={correctCount}
          totalCount={userGrid.flatMap((row) => row).length}
          score={correctCount}
          maxScore={userGrid.flatMap((row) => row).length}
        />
      </Collapse>

      <div
        className={`grid lg:grid-cols-2 gap-8 transition-all ${
          !isTimerActive && gameState !== "result"
            ? "blur pointer-events-none"
            : ""
        }`}
      >
        {/* Grid Display */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">
            {gameState === "memorize" && "Memorize this grid:"}
            {gameState === "input" && "Fill in what you remember:"}
            {gameState === "result" && "Your Results:"}
          </h3>

          <div className="grid grid-cols-5 gap-2 mx-auto">
            {(gameState === "memorize" ? grid : userGrid).map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const userCell = userGrid[rowIndex][colIndex];
                const gridCell = grid[rowIndex][colIndex];

                const isActive =
                  gameState === "input" &&
                  currentCell.row === rowIndex &&
                  currentCell.col === colIndex;

                return (
                  <GridCell
                    item={cell}
                    key={`${rowIndex}-${colIndex}`}
                    variant={
                      isActive
                        ? "active"
                        : gameState === "result"
                        ? userCell.type === InputType.EMPTY
                          ? "unanswered"
                          : userCell.value === gridCell.value
                          ? "correct"
                          : "incorrect"
                        : "default"
                    }
                    onClick={() =>
                      gameState === "input" &&
                      setCurrentCell({ row: rowIndex, col: colIndex })
                    }
                  />
                );
              })
            )}
          </div>
        </div>

        {/* Input Panel */}
        {(gameState === "input" || gameState === "memorize") && (
          <div
            className={`space-y-4 ${
              gameState === "memorize" && "opacity-50 pointer-events-none"
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-700">
                Input Panel - Cell ({currentCell.row + 1}, {currentCell.col + 1}
                )
              </h3>
              {/* Clear cell button */}
              <Button
                variant="outline"
                onClick={() => handleCellInput(InputType.EMPTY, "")}
              >
                <Trash size={16} className="mr-2" />
                Clear Cell
              </Button>
            </div>
            <InputKeyboard
              // letters={letterPool}
              // numbers={numberPool}
              symbols={symbolPool}
              onInput={(type, value) => handleCellInput(type, value)}
            />
          </div>
        )}

        {/* Results Panel */}
        {gameState === "result" && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Original Grid:
            </h3>
            <div className="grid grid-cols-5 gap-2 mx-auto">
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <GridCell item={cell} key={`orig-${rowIndex}-${colIndex}`} />
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={isViewingHelp} onClose={() => setIsViewingHelp(false)}>
        <ModalContent>
          <ModalHeader>
            <h2 className="text-lg font-semibold">
              How to Complete the Exercise
            </h2>
          </ModalHeader>
          <Card variant="info">
            <ol className="list-decimal list-inside space-y-2">
              <li>Memorize the grid during the memory phase</li>
              <li>Recall the characters after the memory phase</li>
              <li>Input the characters in their correct positions</li>
              <li>Submit your answers before time runs out</li>
              <li>Review your performance and improve over time</li>
            </ol>
          </Card>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default GridMemoryExercise;
