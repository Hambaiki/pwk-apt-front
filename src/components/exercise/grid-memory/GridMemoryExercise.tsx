"use client";

import { Card } from "@/components/ui";
import Toolbar from "@/components/exercise/Toolbar";

import { letterPool, numberPool, symbolPool } from "@/constants/exercises/grid";

import { Config, GridItem, InputType } from "@/types/exercises/grid";

import { useState, useEffect, useCallback } from "react";
import InputKeyboard from "./InputKeyboard";

interface GridMemoryExerciseProps {
  config: Config;
  grid: GridItem[][];
}

const GridMemoryExercise = ({ config, grid }: GridMemoryExerciseProps) => {
  const [gameState, setGameState] = useState("memorize"); // 'memorize', 'input', 'result'
  const [userGrid, setUserGrid] = useState<GridItem[][]>([]);
  const [currentCell, setCurrentCell] = useState({ row: 0, col: 0 });
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [score, setScore] = useState(0);

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

  const calculateScore = () => {
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
    setScore(Math.round((correct / 25) * 100));
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

  const renderCell = (
    item: GridItem,
    isUserInput = false,
    isActive = false
  ) => {
    if (!item || item.type === "empty") {
      return (
        <div
          className={`w-full h-full flex items-center justify-center ${
            isActive ? "bg-blue-200" : ""
          }`}
        ></div>
      );
    }

    let bgColor = isActive ? "bg-blue-200" : "bg-gray-50";

    return (
      <div
        className={`w-full h-full flex items-center justify-center rounded ${bgColor} border ${
          isActive ? "border-blue-400 border-2" : "border-gray-200"
        }`}
      >
        {item.value}
      </div>
    );
  };

  const resetExercise = () => {
    setGameState("memorize");
    initializeUserGrid();
    setCurrentCell({ row: 0, col: 0 });
    setScore(0);
    setIsTimerActive(true);
  };

  const exitExercise = () => {
    // Implement exit logic, e.g., navigate back to exercises list
  };

  const endExercise = () => {
    if (gameState === "memorize") {
      setGameState("input");
    } else if (gameState === "input") {
      setGameState("result");
      setIsTimerActive(false);
      calculateScore();
    }
  };

  return (
    <>
      {/* Header */}
      <Card variant="info" className="text-center mb-6">
        <div className="text-2xl font-bold text-blue-600">
          {/* {gameState === "memorize" && `Memory Time: ${formatTime()}`}
          {gameState === "input" && `Time: ${formatTime(timeLeft)}`} */}
          {gameState === "result" && `Score: ${score}%`}
        </div>
      </Card>

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
        // onHelp={() => setIsViewingHelp(true)}
        onRestart={resetExercise}
        onExit={exitExercise}
      />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Grid Display */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">
            {gameState === "memorize" && "Memorize this grid:"}
            {gameState === "input" && "Fill in what you remember:"}
            {gameState === "result" && "Your Results:"}
          </h3>

          <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
            {(gameState === "memorize" ? grid : userGrid).map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="aspect-square border-2 border-gray-300 rounded cursor-pointer"
                  onClick={() =>
                    gameState === "input" &&
                    setCurrentCell({ row: rowIndex, col: colIndex })
                  }
                >
                  {renderCell(
                    cell,
                    gameState === "input",
                    gameState === "input" &&
                      currentCell.row === rowIndex &&
                      currentCell.col === colIndex
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Input Panel */}
        {gameState === "input" && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Input Panel - Cell ({currentCell.row + 1}, {currentCell.col + 1})
            </h3>
            <InputKeyboard
              letters={letterPool}
              numbers={numberPool}
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
            <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`orig-${rowIndex}-${colIndex}`}
                    className="aspect-square border-2 border-gray-300 rounded"
                  >
                    {renderCell(cell)}
                  </div>
                ))
              )}
            </div>
            <div className="text-center mt-6">
              <button
                onClick={resetExercise}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GridMemoryExercise;
