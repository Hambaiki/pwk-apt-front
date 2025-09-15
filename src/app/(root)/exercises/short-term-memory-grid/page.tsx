"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Square,
  Circle,
  Triangle,
  Star,
  Heart,
  Diamond,
  Zap,
  Sun,
  Moon,
  Target,
  Home,
  Mail,
  Phone,
  Camera,
  Music,
  Clock,
  Settings,
  Search,
} from "lucide-react";
import MainSection from "@/components/content/MainSection";

interface GridItem {
  type: "letter" | "symbol" | "number" | "empty";
  value: string | React.ElementType;
}

const GridMemoryExercise = () => {
  const [gameState, setGameState] = useState("setup"); // 'setup', 'memorize', 'input', 'result'
  const [grid, setGrid] = useState<GridItem[][]>([]);
  const [userGrid, setUserGrid] = useState<GridItem[][]>([]);
  const [currentCell, setCurrentCell] = useState({ row: 0, col: 0 });
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);

  // Configuration state
  const [config, setConfig] = useState({
    memoryTime: 120, // 2 minutes in seconds
    inputTime: 300, // 5 minutes in seconds
    letterCount: 8,
    symbolCount: 8,
    numberCount: 9,
    letterVariations: 6,
    symbolVariations: 10,
    numberVariations: 8,
  });

  // Content pools
  const letterPool = [
    "ABC",
    "DEF",
    "GHI",
    "JKL",
    "MNO",
    "PQR",
    "STU",
    "VWX",
    "YZA",
    "BCD",
    "EFG",
    "HIJ",
    "KLM",
    "NOP",
    "QRS",
    "TUV",
    "WXY",
    "ZAB",
    "CDE",
    "FGH",
  ];

  const symbolComponents = [
    ChevronLeft,
    ChevronRight,
    Play,
    Square,
    Circle,
    Triangle,
    Star,
    Heart,
    Diamond,
    Zap,
    Sun,
    Moon,
    Target,
    Home,
    Mail,
    Phone,
    Camera,
    Music,
    Clock,
    Settings,
    Search,
  ];

  const numberPool = [
    "123",
    "456",
    "789",
    "012",
    "345",
    "678",
    "901",
    "234",
    "567",
    "890",
    "135",
    "246",
    "357",
    "468",
    "579",
    "680",
    "791",
    "802",
    "913",
    "024",
  ];

  // Timer effect
  useEffect(() => {
    if (gameState === "memorize" || gameState === "input") {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        if (gameState === "memorize") {
          setGameState("input");
          setTimeLeft(config.inputTime);
          initializeUserGrid();
        } else if (gameState === "input") {
          calculateScore();
          setGameState("result");
        }
      }
    }
  }, [timeLeft, gameState, config]);

  const generateGrid = useCallback(() => {
    const totalCells = 25;
    const items: GridItem[] = [];

    // Add letters
    const selectedLetters = letterPool.slice(0, config.letterVariations);
    for (let i = 0; i < config.letterCount; i++) {
      items.push({
        type: "letter",
        value:
          selectedLetters[Math.floor(Math.random() * selectedLetters.length)],
      });
    }

    // Add symbols
    const selectedSymbols = symbolComponents.slice(0, config.symbolVariations);
    for (let i = 0; i < config.symbolCount; i++) {
      items.push({
        type: "symbol",
        value:
          selectedSymbols[Math.floor(Math.random() * selectedSymbols.length)],
      });
    }

    // Add numbers
    const selectedNumbers = numberPool.slice(0, config.numberVariations);
    for (let i = 0; i < config.numberCount; i++) {
      items.push({
        type: "number",
        value:
          selectedNumbers[Math.floor(Math.random() * selectedNumbers.length)],
      });
    }

    // Shuffle and fill grid
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const newGrid = [];
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        row.push(shuffled[i * 5 + j] || { type: "empty", value: "" });
      }
      newGrid.push(row);
    }

    setGrid(newGrid);
  }, [config]);

  const initializeUserGrid = () => {
    const newUserGrid: GridItem[][] = [];
    for (let i = 0; i < 5; i++) {
      const row: GridItem[] = [];
      for (let j = 0; j < 5; j++) {
        row.push({ type: "empty", value: "" });
      }
      newUserGrid.push(row);
    }
    setUserGrid(newUserGrid);
  };

  const startExercise = () => {
    generateGrid();
    setGameState("memorize");
    setTimeLeft(config.memoryTime);
    setScore(0);
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

  const handleCellInput = (
    inputType: "letter" | "symbol" | "number" | "empty",
    inputValue: string | React.ElementType
  ) => {
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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

    let content;
    let bgColor = isActive ? "bg-blue-200" : "bg-gray-50";

    if (item.type === "letter") {
      content = (
        <span className="text-lg font-bold text-blue-600">
          {item.value as string}
        </span>
      );
      if (!isActive) bgColor = "bg-blue-50";
    } else if (item.type === "symbol") {
      const IconComponent = item.value;
      content = <IconComponent className="w-6 h-6 text-purple-600" />;
      if (!isActive) bgColor = "bg-purple-50";
    } else if (item.type === "number") {
      content = (
        <span className="text-lg font-bold text-green-600">
          {item.value as string}
        </span>
      );
      if (!isActive) bgColor = "bg-green-50";
    }

    return (
      <div
        className={`w-full h-full flex items-center justify-center rounded ${bgColor} border ${
          isActive ? "border-blue-400 border-2" : "border-gray-200"
        }`}
      >
        {content}
      </div>
    );
  };

  const SymbolKeyboard = () => {
    const allSymbols = symbolComponents.slice(0, config.symbolVariations);
    return (
      <div className="mt-4 p-4 bg-purple-50 rounded-lg">
        <h4 className="text-sm font-semibold text-purple-700 mb-3">
          Symbol Keyboard
        </h4>
        <div className="grid grid-cols-5 gap-2">
          {allSymbols.map((Symbol, index) => (
            <button
              key={index}
              onClick={() => handleCellInput("symbol", Symbol)}
              className="p-3 bg-white rounded border hover:bg-purple-100 transition-colors"
            >
              <Symbol className="w-6 h-6 text-purple-600 mx-auto" />
            </button>
          ))}
        </div>
      </div>
    );
  };

  const InputKeyboard = () => {
    const availableLetters = letterPool.slice(0, config.letterVariations);
    const availableNumbers = numberPool.slice(0, config.numberVariations);

    return (
      <div className="space-y-4">
        {/* Letter input */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-700 mb-3">
            Letter Combinations
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {availableLetters.map((letters, index) => (
              <button
                key={index}
                onClick={() => handleCellInput("letter", letters)}
                className="p-2 bg-white rounded border hover:bg-blue-100 transition-colors text-blue-600 font-semibold"
              >
                {letters}
              </button>
            ))}
          </div>
        </div>

        {/* Number input */}
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="text-sm font-semibold text-green-700 mb-3">
            Number Combinations
          </h4>
          <div className="grid grid-cols-4 gap-2">
            {availableNumbers.map((numbers, index) => (
              <button
                key={index}
                onClick={() => handleCellInput("number", numbers)}
                className="p-2 bg-white rounded border hover:bg-green-100 transition-colors text-green-600 font-semibold"
              >
                {numbers}
              </button>
            ))}
          </div>
        </div>

        <SymbolKeyboard />

        {/* Clear cell button */}
        <button
          onClick={() => handleCellInput("empty", "")}
          className="w-full p-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-semibold transition-colors"
        >
          Clear Cell
        </button>
      </div>
    );
  };

  if (gameState === "setup") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
              Grid Memory Challenge
            </h1>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  Timing Settings
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Memory Time (seconds)
                  </label>
                  <input
                    type="number"
                    value={config.memoryTime}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        memoryTime: parseInt(e.target.value) || 120,
                      })
                    }
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Input Time (seconds)
                  </label>
                  <input
                    type="number"
                    value={config.inputTime}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        inputTime: parseInt(e.target.value) || 300,
                      })
                    }
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  Content Distribution
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Letters Count
                    </label>
                    <input
                      type="number"
                      max="25"
                      value={config.letterCount}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          letterCount: Math.min(
                            25,
                            parseInt(e.target.value) || 0
                          ),
                        })
                      }
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Letter Variations
                    </label>
                    <input
                      type="number"
                      max="20"
                      value={config.letterVariations}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          letterVariations: Math.min(
                            20,
                            parseInt(e.target.value) || 0
                          ),
                        })
                      }
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Symbols Count
                    </label>
                    <input
                      type="number"
                      max="25"
                      value={config.symbolCount}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          symbolCount: Math.min(
                            25,
                            parseInt(e.target.value) || 0
                          ),
                        })
                      }
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Symbol Variations
                    </label>
                    <input
                      type="number"
                      max="21"
                      value={config.symbolVariations}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          symbolVariations: Math.min(
                            21,
                            parseInt(e.target.value) || 0
                          ),
                        })
                      }
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Numbers Count
                    </label>
                    <input
                      type="number"
                      max="25"
                      value={config.numberCount}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          numberCount: Math.min(
                            25,
                            parseInt(e.target.value) || 0
                          ),
                        })
                      }
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Number Variations
                    </label>
                    <input
                      type="number"
                      max="20"
                      value={config.numberVariations}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          numberVariations: Math.min(
                            20,
                            parseInt(e.target.value) || 0
                          ),
                        })
                      }
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Total cells:{" "}
                {config.letterCount + config.symbolCount + config.numberCount}
                /25
              </p>
              <button
                onClick={startExercise}
                disabled={
                  config.letterCount + config.symbolCount + config.numberCount >
                  25
                }
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-200 shadow-lg"
              >
                Start Exercise
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MainSection>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Grid Memory Challenge
            </h1>
            <div className="text-2xl font-bold text-blue-600">
              {gameState === "memorize" &&
                `Memory Time: ${formatTime(timeLeft)}`}
              {gameState === "input" && `Input Time: ${formatTime(timeLeft)}`}
              {gameState === "result" && `Score: ${score}%`}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Grid Display */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">
                {gameState === "memorize" && "Memorize this grid:"}
                {gameState === "input" && "Fill in what you remember:"}
                {gameState === "result" && "Your Results:"}
              </h3>

              <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
                {(gameState === "memorize" ? grid : userGrid).map(
                  (row, rowIndex) =>
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
                  Input Panel - Cell ({currentCell.row + 1},{" "}
                  {currentCell.col + 1})
                </h3>
                <InputKeyboard />
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
                    onClick={() => setGameState("setup")}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainSection>
  );
};

export default GridMemoryExercise;
