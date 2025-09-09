"use client";

import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";
import {
  HeaderCard,
  HeaderCardTitle,
  HeaderCardDescription,
} from "@/components/template/HeaderCard";
import MainSection from "@/components/template/MainSection";

import React, { useState, useEffect } from "react";
import { Play, RotateCcw, Palette, Info, Wrench, Cog } from "lucide-react";
import { Button, Card, Input } from "@/components/ui";

enum Stage {
  Reference = "reference",
  Questions = "questions",
  Results = "results",
}

enum ShapeName {
  Circle = "circle",
  Square = "square",
  Triangle = "triangle",
  Diamond = "diamond",
  Oval = "oval",
  Parallelogram = "parallelogram",
  Trapezoid = "trapezoid",
}

interface Shape {
  name: ShapeName;
}

interface ShapeGridItem {
  id: number;
  shape: Shape;
  number: number;
  letter: string;
  color: string;
  size: number;
  x: number;
  y: number;
}

interface Config {
  itemCount: number;
  questionCount: number;
  timeLimit: number;
  shapes: Shape[];
}

// Shape library
const shapeRenderers: Record<
  ShapeName,
  (size: number, color: string) => React.ReactNode
> = {
  circle: (size, color) => (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 5}
        stroke={color}
        strokeWidth={2}
        fill="rgba(255, 255, 255, 0.75)"
      />
    </svg>
  ),
  square: (size, color) => (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect
        x="5"
        y="5"
        width={size - 10}
        height={size - 10}
        stroke={color}
        strokeWidth={2}
        fill="rgba(255, 255, 255, 0.75)"
      />
    </svg>
  ),
  triangle: (size, color) => (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon
        points={`${size / 2},5 ${size - 5},${size - 5} 5,${size - 5}`}
        stroke={color}
        strokeWidth={2}
        fill="rgba(255, 255, 255, 0.75)"
      />
    </svg>
  ),
  diamond: (size, color) => (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon
        points={`${size / 2},5 ${size - 5},${size / 2} ${size / 2},${
          size - 5
        } 5,${size / 2}`}
        stroke={color}
        strokeWidth={2}
        fill="rgba(255, 255, 255, 0.75)"
      />
    </svg>
  ),
  oval: (size, color) => (
    <svg width={size} height={size / 1.5} viewBox={`0 0 ${size} ${size / 1.5}`}>
      <ellipse
        cx={size / 2}
        cy={size / 3}
        rx={size / 2 - 5}
        ry={size / 3 - 5}
        stroke={color}
        strokeWidth={2}
        fill="rgba(255, 255, 255, 0.75)"
      />
    </svg>
  ),
  parallelogram: (size, color) => (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon
        points={`20,5 ${size - 5},5 ${size - 20},${size - 5} 5,${size - 5}`}
        stroke={color}
        strokeWidth={2}
        fill="rgba(255, 255, 255, 0.75)"
      />
    </svg>
  ),
  trapezoid: (size, color) => (
    <svg width={size} height={size / 1.5} viewBox={`0 0 ${size} ${size / 1.5}`}>
      <polygon
        points={`20,5 ${size - 20},5 ${size - 5},${size / 1.5 - 5} 5,${
          size / 1.5 - 5
        }`}
        stroke={color}
        strokeWidth={2}
        fill="rgba(255, 255, 255, 0.75)"
      />
    </svg>
  ),
};

// Shape types and their corresponding symbols
const shapes = Object.keys(shapeRenderers).map((name) => ({
  name: name as ShapeName,
}));

// Color palette
const colors = [
  "rgba(255, 99, 132, 1)", // soft red / rose
  "rgba(54, 162, 235, 1)", // soft blue
  "rgba(75, 192, 192, 1)", // teal / aqua
  "rgba(255, 206, 86, 1)", // warm yellow
  "rgba(153, 102, 255, 1)", // lavender / purple
  "rgba(255, 159, 64, 1)", // soft orange
  "rgba(201, 203, 207, 1)", // gray / neutral
  "rgba(144, 238, 144, 1)", // light green
];

const sampleShapes: Omit<ShapeGridItem, "id" | "size" | "x" | "y">[] =
  shapes.map((shape, index) => ({
    shape,
    color: colors[index % colors.length],
    number: index + 1,
    letter: String.fromCharCode(65 + (index % 26)),
  }));

const ScanningExercise = () => {
  const [stage, setStage] = useState<Stage>(Stage.Reference); // 'reference', 'questions', 'results'

  // Question and item state
  const [items, setItems] = useState<ShapeGridItem[]>([]);
  const [questions, setQuestions] = useState<ShapeGridItem[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);

  // Timer state (in seconds)
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Configuration state
  const [config, setConfig] = useState<Config>({
    itemCount: 40, // Number of item groups
    questionCount: 20, // Questions per group
    timeLimit: 600, // Time limit in seconds
    shapes: shapes, // Shapes to use
  });

  // Configurations
  const [isMonotoneMode, setIsMonotoneMode] = useState(false);

  const generateItemsWithGrid = () => {
    const newItems = [];
    const usedCombinations = new Set();

    // Calculate grid dimensions
    const itemCount = config.itemCount;
    const gridCols = Math.ceil(Math.sqrt(itemCount));
    const gridRows = Math.ceil(itemCount / gridCols);

    // Calculate cell dimensions (leaving some padding)
    const cellWidth = 80 / gridCols;
    const cellHeight = 80 / gridRows;
    const padding = 3; // Padding within each cell

    // Generate positions
    const positions = [];
    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        if (positions.length >= itemCount) break;

        // Calculate cell bounds
        const cellLeft = 10 + col * cellWidth;
        const cellTop = 10 + row * cellHeight;

        // Random position within cell bounds
        const x =
          cellLeft + padding + Math.random() * (cellWidth - 2 * padding);
        const y =
          cellTop + padding + Math.random() * (cellHeight - 2 * padding);

        positions.push({
          x: Math.max(5, Math.min(85, x)),
          y: Math.max(5, Math.min(85, y)),
        });
      }
    }

    // Shuffle positions for randomness
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    // Generate items with pre-calculated positions
    for (let i = 0; i < itemCount && i < positions.length; i++) {
      let shape, number, letter, color;
      let combination;

      // Ensure unique combinations
      do {
        shape = shapes[Math.floor(Math.random() * shapes.length)];
        number = Math.floor(Math.random() * 99) + 1;
        letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        color = colors[Math.floor(Math.random() * colors.length)];
        combination = `${shape.name}-${number}-${letter}`;
      } while (usedCombinations.has(combination));

      usedCombinations.add(combination);

      const minSize = 60; // px
      const maxSize = 100; // px
      const size =
        Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;

      newItems.push({
        id: i,
        shape,
        number,
        letter,
        color,
        size,
        x: positions[i].x,
        y: positions[i].y,
      });
    }

    setItems(newItems);
    generateQuestions(newItems);
  };

  const generateQuestions = (itemList: ShapeGridItem[]) => {
    const selectedItems: ShapeGridItem[] = [];
    const usedItems = new Set();

    // Select random items for questions
    while (selectedItems.length < config.questionCount) {
      const randomIndex = Math.floor(Math.random() * itemList.length);
      if (!usedItems.has(randomIndex)) {
        usedItems.add(randomIndex);
        selectedItems.push(itemList[randomIndex]);
      }
    }

    setQuestions(selectedItems);
    setAnswers({});
  };

  // Format time display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Handle answer input
  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value.toUpperCase(),
    }));
  };

  // Calculate score
  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.letter) {
        correct++;
      }
    });
    setScore(correct);
  };

  // Start exercise
  const startExercise = () => {
    generateItemsWithGrid();
    setStage(Stage.Questions);
    setTimeRemaining(config.timeLimit);
    setIsTimerActive(true);
  };

  // Reset exercise
  const resetExercise = () => {
    setStage(Stage.Reference);
    setTimeRemaining(600);
    setIsTimerActive(false);
    setAnswers({});
    setScore(0);
  };

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((timeRemaining) => timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isTimerActive) {
      setIsTimerActive(false);
      calculateScore();
      setStage(Stage.Results);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timeRemaining]);

  return (
    <MainSection className="gap-6">
      <Breadcrumb>
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Exercises" href="/exercises" />
        <BreadcrumbItem label="Comparison" href="/exercises/comparison" />
      </Breadcrumb>

      {stage === Stage.Reference && (
        <section className="space-y-10">
          <HeaderCard>
            <HeaderCardTitle>Scanning Exercise</HeaderCardTitle>
            <HeaderCardDescription>
              Quickly identify letters within various shapes and numbers
            </HeaderCardDescription>
          </HeaderCard>

          <div className="space-y-4">
            <h2 className="mb-4 flex items-center gap-2">
              <Info size={32} />
              Introduction
            </h2>
            <p>
              This exercise is designed to enhance your visual scanning and
              attention to detail. You will be presented with a grid of shapes,
              each containing a number and a letter. Your task is to identify
              the correct letter associated with each shape.
            </p>
            <Card variant="info">
              <h3 className="text-lg font-semibold text-info-800 mb-3 flex items-center gap-2">
                How to Play
              </h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Answer by identifying the letter in each shape/number</li>
                <li>Submit early or when time runs out to see results</li>
                <li>Use monotone mode for color vision considerations</li>
                <li>Good luck!</li>
              </ol>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="flex items-center gap-2">
              <Cog size={32} />
              Exercise Configuration
            </h2>
            <p>
              Adjust the settings below to customize your exercise experience.
            </p>

            <Card className="space-y-4">
              <h3>Preferences</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Items
                  <Input
                    type="number"
                    min={1}
                    max={40}
                    value={config.itemCount}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        itemCount:
                          parseInt(e.target.value) < prev.questionCount
                            ? prev.questionCount
                            : parseInt(e.target.value) || 1,
                      }))
                    }
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Total number of items to display (must be greater than or
                  equal to maximum number of questions)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Questions
                  <Input
                    type="number"
                    min={1}
                    max={config.itemCount}
                    value={config.questionCount}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        questionCount:
                          parseInt(e.target.value) > prev.itemCount
                            ? prev.itemCount
                            : parseInt(e.target.value) || 1,
                      }))
                    }
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Number of questions to answer during the exercise (must be
                  less than or equal to number of items)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Limit (minutes)
                  <Input
                    type="number"
                    min="1"
                    max="30"
                    value={config.timeLimit}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        timeLimit: parseInt(e.target.value) || 10,
                      }))
                    }
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monotone Mode
                <div className="flex items-center mt-2">
                  <Input
                    type="checkbox"
                    checked={isMonotoneMode}
                    onChange={(e) => setIsMonotoneMode(e.target.checked)}
                    className="w-4 h-4 mr-2"
                  />
                  Enable Monotone Mode
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enable monotone mode for a simplified color scheme
                </p>
              </label>

              <div className="block text-sm font-medium text-gray-700 mb-2">
                Shapes to Include
                <div className="flex flex-wrap gap-3 mt-2">
                  {shapes.map((shape) => (
                    <label className="flex items-center" key={shape.name}>
                      <Input
                        type="checkbox"
                        defaultChecked={config.shapes.includes(shape)}
                        onChange={(e) => {
                          setConfig((prev) => ({
                            ...prev,
                            shapes: e.target.checked
                              ? [...prev.shapes, shape]
                              : prev.shapes.filter((s) => s !== shape),
                          }));
                        }}
                        className="w-4 h-4 mr-2"
                      />
                      {shape.name}
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Select which shapes to include in the exercise
                </p>
              </div>

              <h3>Preview</h3>

              <Card className="bg-white">
                <div className="flex">
                  {sampleShapes
                    .filter((question) =>
                      config.shapes.includes(question.shape)
                    )
                    .map((question, index) => (
                      <div
                        key={index}
                        className="relative flex items-center justify-center"
                      >
                        {/* Shape SVG */}
                        {shapeRenderers[question.shape.name](
                          80,
                          isMonotoneMode ? "rgb(59,59,59)" : question.color
                        )}

                        {/* Text overlay */}
                        <span
                          className="absolute font-bold w-12 h-12 flex items-center justify-center"
                          style={{
                            color: "rgb(59,59,59)",
                          }}
                        >
                          {question.number}
                          {question.letter}
                        </span>
                      </div>
                    ))}
                </div>
              </Card>

              <Card variant="info">
                <h3 className="text-lg font-semibold text-info-800 mb-3 flex items-center gap-2">
                  Exercise Summary
                </h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    Total: {config.itemCount} items/{config.questionCount}{" "}
                    questions
                  </li>
                  <li>
                    Time limit: {(config.timeLimit / 60).toFixed(1)} minutes
                  </li>
                </ul>
              </Card>

              <div className="flex gap-4 justify-end mb-4">
                <Button onClick={startExercise}>
                  <Play size={20} className="mr-2" />
                  Start Exercise ({(config.timeLimit / 60).toFixed(1)} minutes)
                </Button>
              </div>
            </Card>
          </div>
        </section>
      )}

      {stage === Stage.Questions && (
        <section className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Questions</h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div
              className={`text-xl font-bold px-4 py-2 rounded-lg ${
                timeRemaining < 60
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              Time: {formatTime(timeRemaining)}
            </div>
            <button
              onClick={() => {
                calculateScore();
                setStage(Stage.Results);
                setIsTimerActive(false);
              }}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Submit Early
            </button>
          </div>
          <p className="text-gray-600">
            What letter is in each shape and number combination?
          </p>
        </section>
      )}

      {stage === Stage.Results && (
        <section className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Results</h1>
          <div className="text-2xl font-bold text-blue-600 mb-4">
            Score: {score} / {questions.length} (
            {Math.round((score / questions.length) * 100)}%)
          </div>
          <button
            onClick={resetExercise}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RotateCcw size={20} />
            Start New Exercise
          </button>
        </section>
      )}

      {(stage === Stage.Results || stage === Stage.Questions) && (
        <section className="overflow-auto bg-gray-50 p-4 border border-gray-200">
          <div className="relative mx-auto w-[800px] h-[400px]">
            {items.map((item) => (
              <div
                key={item.id}
                className="absolute flex items-center justify-center text-white font-bold text-sm"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="relative flex items-center justify-center">
                  {/* Shape SVG */}
                  {shapeRenderers[item.shape.name](
                    item.size,
                    isMonotoneMode ? "rgb(59,59,59)" : item.color
                  )}

                  {/* Text overlay */}
                  <span
                    className="absolute font-bold"
                    style={{
                      fontSize: `${Math.max(12, item.size / 8)}px`,
                      color: "rgb(59,59,59)",
                    }}
                  >
                    {item.number}
                    {item.letter}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {stage === Stage.Questions && (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              <div className="text-center mb-3">
                <span className="text-sm font-semibold text-gray-600">
                  Question {index + 1}
                </span>
              </div>

              <div className="flex justify-center mb-4">
                <div className="relative flex items-center justify-center">
                  {/* Shape SVG */}
                  {shapeRenderers[question.shape.name](
                    80,
                    isMonotoneMode ? "rgb(59,59,59)" : question.color
                  )}

                  {/* Text overlay */}
                  <span
                    className="absolute font-bold w-12 h-12 flex items-center justify-center"
                    style={{
                      color: "rgb(59,59,59)",
                    }}
                  >
                    {question.number}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-sm text-gray-600 mb-2">
                  {question.shape.name.charAt(0).toUpperCase() +
                    question.shape.name.slice(1)}{" "}
                  with {question.number}
                </p>
                <input
                  type="text"
                  maxLength={1}
                  value={answers[question.id] || ""}
                  onChange={(e) =>
                    handleAnswerChange(question.id, e.target.value)
                  }
                  className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="?"
                />
              </div>
            </div>
          ))}
        </section>
      )}

      {stage === Stage.Results && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {questions.map((question, index) => {
            const userAnswer = answers[question.id] || "";
            const isCorrect = userAnswer === question.letter;

            return (
              <div
                key={question.id}
                className={`
                p-4 rounded-lg border ${
                  isCorrect
                    ? "bg-green-50 border-green-300"
                    : "bg-red-50 border-red-300"
                }
              `}
              >
                <div className="space-y-6">
                  <div className="mb-2">
                    <span className="text-sm font-semibold text-gray-600">
                      Question {index + 1}
                    </span>
                  </div>

                  <div className="flex justify-center mb-2">
                    <div className="relative flex items-center justify-center">
                      {/* Shape SVG */}
                      {shapeRenderers[question.shape.name](
                        80,
                        isMonotoneMode ? "rgb(59,59,59)" : question.color
                      )}

                      {/* Text overlay */}
                      <span
                        className="absolute font-bold w-12 h-12 flex items-center justify-center"
                        style={{
                          color: "rgb(59,59,59)",
                        }}
                      >
                        {question.number}
                        {question.letter}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm">
                    <p className="text-gray-600 mb-1">
                      {question.shape.name} {question.number}
                    </p>
                    <p>
                      <span className="font-semibold">Your answer: </span>
                      <span
                        className={
                          isCorrect ? "text-green-600" : "text-red-600"
                        }
                      >
                        {userAnswer || "No answer"}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">Correct answer: </span>
                      <span className="text-green-600">{question.letter}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </MainSection>
  );
};

export default ScanningExercise;
