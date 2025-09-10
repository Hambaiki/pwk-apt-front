"use client";

import { Button, Card, Input, Modal } from "@/components/ui";
import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";
import {
  HeaderCard,
  HeaderCardTitle,
  HeaderCardDescription,
} from "@/components/content/HeaderCard";
import MainSection from "@/components/content/MainSection";
import Toolbar from "@/components/exercise/Toolbar";

import { Play, RotateCcw, Info, Cog, RefreshCcw } from "lucide-react";

import React, { useState } from "react";
import { ModalContent, ModalHeader } from "@/components/ui/Modal";
import { cn } from "@/libs/utils";

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
  rotation: number;
  x: number;
  y: number;
}

interface Config {
  itemCount: number;
  questionCount: number;
  timeLimit: number;
  isMonotoneMode?: boolean;
  shapes: Shape[];
}

// Shape library
const shapeRenderers: Record<
  ShapeName,
  (size: number, color: string) => React.ReactNode
> = {
  [ShapeName.Circle]: (size, color) => (
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
  [ShapeName.Square]: (size, color) => (
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
  [ShapeName.Triangle]: (size, color) => (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon
        points={`${size / 2},5 ${size - 5},${size - 5} 5,${size - 5}`}
        stroke={color}
        strokeWidth={2}
        fill="rgba(255, 255, 255, 0.75)"
      />
    </svg>
  ),
  [ShapeName.Diamond]: (size, color) => (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Make the width more thin so that it does not look like square */}
      <polygon
        points={`${size / 2},5 ${size * 0.8},${size / 2} ${size / 2},${
          size - 5
        } ${size * 0.2},${size / 2}`}
        stroke={color}
        strokeWidth={2}
        fill="rgba(255, 255, 255, 0.75)"
      />
    </svg>
  ),
  [ShapeName.Oval]: (size, color) => (
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
  [ShapeName.Parallelogram]: (size, color) => (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon
        points={`20,5 ${size - 5},5 ${size - 20},${size - 5} 5,${size - 5}`}
        stroke={color}
        strokeWidth={2}
        fill="rgba(255, 255, 255, 0.75)"
      />
    </svg>
  ),
  [ShapeName.Trapezoid]: (size, color) => (
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

const sampleShapes: Omit<
  ShapeGridItem,
  "id" | "size" | "x" | "y" | "rotation"
>[] = shapes.map((shape, index) => ({
  shape,
  color: colors[index % colors.length],
  number: index + 1,
  letter: String.fromCharCode(65 + (index % 26)),
}));

const defaultConfig: Config = {
  itemCount: 40, // Number of item groups
  questionCount: 20, // Questions per group
  timeLimit: 600, // Time limit in seconds
  shapes: shapes, // Shapes to use
  isMonotoneMode: false,
};

const ScanningExercise = () => {
  const [stage, setStage] = useState<Stage>(Stage.Reference); // 'reference', 'questions', 'results'

  // Question and item state
  const [items, setItems] = useState<ShapeGridItem[]>([]);
  const [questions, setQuestions] = useState<ShapeGridItem[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);

  // Timer state (in seconds)
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Configuration state
  const [config, setConfig] = useState<Config>(defaultConfig);

  // Misc
  const [isViewingHelp, setIsViewingHelp] = useState(false);

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
      let shape, number, letter, color, rotation;
      let combination;

      // Ensure unique combinations
      do {
        const shouldRotate = Math.random() < 0.5;

        shape = shapes[Math.floor(Math.random() * shapes.length)];
        number = Math.floor(Math.random() * 99) + 1;
        letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        color = colors[Math.floor(Math.random() * colors.length)];
        rotation = shouldRotate ? Math.floor(Math.random() * 46) : 0;
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
        rotation,
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
    setIsTimerActive(true);
  };

  // Reset exercise
  const resetExercise = () => {
    setStage(Stage.Reference);
    setIsTimerActive(false);
    setAnswers({});
    setScore(0);
  };

  return (
    <MainSection className="gap-6">
      <Breadcrumb>
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Exercises" href="/exercises" />
        <BreadcrumbItem label="Scanning" href="/exercises/scanning" />
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

            <Card variant="info" className="space-y-4">
              <h3 className="text-lg font-semibold text-info-800 mb-3 flex items-center gap-2">
                Exercise Summary
              </h3>

              <ul className="space-y-2 list-disc list-inside">
                <li>
                  Total: <code>{config.itemCount}</code> items/
                  <code>{config.questionCount}</code> questions
                </li>
                <li>
                  Time limit: <code>{(config.timeLimit / 60).toFixed(1)}</code>{" "}
                  minutes
                </li>
                <li>
                  Shapes:{" "}
                  <code>
                    {config.shapes.length > 0
                      ? config.shapes.map((shape) => shape.name).join(", ")
                      : "All Shapes"}
                  </code>
                </li>
                <li>
                  Color mode:{" "}
                  <code>{config.isMonotoneMode ? "Monotone" : "Color"}</code>
                </li>
              </ul>

              <p>
                Preview the shapes and letters that will be used in the
                exercise.
              </p>

              <Card className="flex flex-wrap gap-1 bg-white">
                {sampleShapes
                  .filter((question) => config.shapes.includes(question.shape))
                  .map((question, index) => (
                    <ShapeItem
                      key={index}
                      shape={question.shape.name}
                      color={question.color}
                      number={question.number}
                      letter={question.letter}
                      isMonotoneMode={config.isMonotoneMode}
                    />
                  ))}
              </Card>
            </Card>

            <Card className="space-y-4">
              <h3>Preferences</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Number of Items
                    <Input
                      type="number"
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
                    Time Limit (seconds)
                    <Input
                      type="number"
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
                      checked={config.isMonotoneMode}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          isMonotoneMode: e.target.checked,
                        }))
                      }
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
              </div>

              <div className="flex gap-4 justify-end mb-4">
                <Button
                  variant="secondary"
                  onClick={() => setConfig(defaultConfig)}
                >
                  <RefreshCcw size={20} className="mr-2" />
                  Reset Configuration
                </Button>
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
          <HeaderCard>
            <HeaderCardTitle>Scanning - Questions</HeaderCardTitle>
            <HeaderCardDescription>
              What letter is in each shape and number combination?
            </HeaderCardDescription>
          </HeaderCard>
        </section>
      )}

      {stage === Stage.Results && (
        <section className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Results</h1>
          <div className="text-2xl font-bold text-blue-600 mb-4">
            Score: {score} / {questions.length} (
            {Math.round((score / questions.length) * 100)}%) Accuracy:{" "}
            {answers && Object.keys(answers).length > 0
              ? `${Math.round((score / Object.keys(answers).length) * 100)}%`
              : "N/A"}
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
        <section className="space-y-6">
          <Card className="space-y-4">
            <Toolbar
              isRunning={isTimerActive}
              timerLimit={config.timeLimit}
              onEnd={() => {
                calculateScore();
                setStage(Stage.Results);
                setIsTimerActive(false);
              }}
              onPause={() => setIsTimerActive((prev) => !prev)}
              onHelp={() => setIsViewingHelp(true)}
            />

            <Card className="bg-background-primary">
              <div className="pr-1 overflow-x-auto">
                <div className="relative w-[800px] h-[400px] mx-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="absolute flex items-center justify-center text-white font-bold text-sm"
                      style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        transform: "translate(-50%, -50%)",
                        rotate: `${item.rotation}deg`,
                      }}
                    >
                      <ShapeItem
                        shape={item.shape.name}
                        color={item.color}
                        number={item.number}
                        letter={item.letter}
                        isMonotoneMode={config.isMonotoneMode}
                        size={item.size}
                        fontSize={Math.max(14, item.size / 6)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="bg-background-primary">
              <div className="pr-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                {questions.map((question, index) => {
                  const userAnswer = answers[question.id] || "";
                  const isCorrect = userAnswer === question.letter;
                  const isSubmitted = stage === Stage.Results;

                  return (
                    <Card
                      key={question.id}
                      className={cn(
                        `flex flex-col`,
                        isSubmitted
                          ? isCorrect
                            ? "bg-green-50 border-green-300"
                            : "bg-red-50 border-red-300"
                          : ""
                      )}
                    >
                      <div className="text-center mb-3">
                        <span className="text-sm font-semibold text-gray-600">
                          Question {index + 1}
                        </span>
                      </div>
                      <div className="flex-1 flex items-center justify-center mb-4">
                        <ShapeItem
                          shape={question.shape.name}
                          color={question.color}
                          number={question.number}
                          isMonotoneMode={config.isMonotoneMode}
                          fontSize={Math.max(14, question.size / 6)}
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">
                          {question.shape.name.charAt(0).toUpperCase() +
                            question.shape.name.slice(1)}{" "}
                          with {question.number}
                        </p>
                        <input
                          type="text"
                          maxLength={1}
                          disabled={stage === Stage.Results}
                          value={answers[question.id] || ""}
                          onChange={(e) =>
                            handleAnswerChange(question.id, e.target.value)
                          }
                          className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                          placeholder="?"
                        />
                      </div>

                      {stage === Stage.Results && (
                        <Card variant="info" className="mt-4 text-sm">
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
                            <span className="font-semibold">
                              Correct answer:{" "}
                            </span>
                            <span className="text-green-600">
                              {question.letter}
                            </span>
                          </p>
                        </Card>
                      )}
                    </Card>
                  );
                })}
              </div>
            </Card>
          </Card>
        </section>
      )}

      <Modal isOpen={isViewingHelp} onClose={() => setIsViewingHelp(false)}>
        <ModalContent>
          <ModalHeader>
            <h2 className="text-lg font-semibold">
              How to Complete the Exercise
            </h2>
          </ModalHeader>
          <HowToCard />
        </ModalContent>
      </Modal>
    </MainSection>
  );
};

interface ShapesItemProps {
  shape: ShapeName;
  color?: string;
  number?: number;
  size?: number;
  letter?: string;
  fontSize?: number;
  isMonotoneMode?: boolean;
}

const ShapeItem = ({
  shape,
  color = "rgba(0,0,0,0.1)",
  size = 80,
  number,
  letter,
  isMonotoneMode = false,
  fontSize = 14,
}: ShapesItemProps) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Shape SVG */}
      {shapeRenderers[shape](size, isMonotoneMode ? "rgb(59,59,59)" : color)}

      {/* Text overlay */}
      <span
        className="absolute font-bold flex items-center justify-center"
        style={{
          color: "rgb(59,59,59)",
          fontSize: `${fontSize}px`,
        }}
      >
        {number}
        {letter}
      </span>
    </div>
  );
};

const HowToCard = () => (
  <Card variant="info" className="space-y-4">
    <ol className="list-decimal list-inside space-y-2">
      <li>Review the grid of shapes, each containing a number and a letter.</li>
      <li>
        For each question, identify the letter associated with the given shape
        and number.
      </li>
      <li>Type your answer in the input box provided for each question.</li>
      <li>Submit early or when time runs out to see results</li>
    </ol>
  </Card>
);

export default ScanningExercise;
