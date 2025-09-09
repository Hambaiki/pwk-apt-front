"use client";

import React, { useState, useEffect } from "react";
import { Shuffle, Play, RotateCcw, CheckCircle, Settings } from "lucide-react";

interface Item {
  id: number;
  groupId: number;
  shape: { name: string; symbol: string; class: string };
  number: number;
  letter: string;
  color: string;
  x: number; // percentage position
  y: number; // percentage position
}

interface Question {
  id: number;
  groupId: number;
  shape: { name: string; symbol: string; class: string };
  number: number;
  letter: string;
  color: string;
}

const ScanningExercise = () => {
  const [currentPage, setCurrentPage] = useState("setup"); // 'setup', 'reference', 'questions', 'results'
  const [items, setItems] = useState<Item[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [score, setScore] = useState(0);

  // Configuration state
  const [config, setConfig] = useState({
    itemGroups: 4, // Number of item groups
    questionsPerGroup: 5, // Questions per group
    timeLimit: 10, // Time limit in minutes
  });

  // Shape types and their corresponding symbols
  const shapes = [
    { name: "circle", symbol: "●", class: "rounded-full" },
    { name: "square", symbol: "■", class: "rounded-none" },
    { name: "triangle", symbol: "▲", class: "rounded-none" },
    { name: "diamond", symbol: "♦", class: "rounded-none transform rotate-45" },
    { name: "pentagon", symbol: "⬟", class: "rounded-lg" },
  ];

  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-orange-500",
  ];

  // Check if two items overlap
  const checkOverlap = (item1: Item, item2: Item, minDistance = 8) => {
    const dx = Math.abs(item1.x - item2.x);
    const dy = Math.abs(item1.y - item2.y);
    return Math.sqrt(dx * dx + dy * dy) < minDistance;
  };

  // Generate non-overlapping positions using grid-based approach
  const generateNonOverlappingPositions = (count: number) => {
    const positions: { x: number; y: number }[] = [];
    const gridSize = Math.ceil(Math.sqrt(count));
    const cellWidth = 80 / gridSize;
    const cellHeight = 80 / gridSize;

    // Create grid positions with some randomness
    for (let i = 0; i < count; i++) {
      const gridX = i % gridSize;
      const gridY = Math.floor(i / gridSize);

      // Add randomness within each grid cell
      const x =
        10 + gridX * cellWidth + (Math.random() - 0.5) * (cellWidth * 0.6);
      const y =
        10 + gridY * cellHeight + (Math.random() - 0.5) * (cellHeight * 0.6);

      // Ensure positions stay within bounds
      positions.push({
        x: Math.max(8, Math.min(92, x)),
        y: Math.max(8, Math.min(92, y)),
      });
    }

    // Shuffle positions for more randomness
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    return positions;
  };

  // Generate items based on configuration
  const generateItems = () => {
    const totalItems = config.itemGroups * config.questionsPerGroup;
    const positions = generateNonOverlappingPositions(totalItems);
    const newItems = [];
    const usedCombinations = new Set();

    for (let groupIndex = 0; groupIndex < config.itemGroups; groupIndex++) {
      // Pick one shape and color for this group
      const groupShape = shapes[Math.floor(Math.random() * shapes.length)];
      const groupColor = colors[Math.floor(Math.random() * colors.length)];

      for (
        let itemIndex = 0;
        itemIndex < config.questionsPerGroup;
        itemIndex++
      ) {
        const itemId = groupIndex * config.questionsPerGroup + itemIndex;
        let number, letter;
        let combination;

        // Ensure unique combinations
        do {
          number = Math.floor(Math.random() * 99) + 1;
          letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
          combination = `${groupShape.name}-${number}`;
        } while (usedCombinations.has(combination));

        usedCombinations.add(combination);

        newItems.push({
          id: itemId,
          groupId: groupIndex,
          shape: groupShape,
          number,
          letter,
          color: groupColor,
          x: positions[itemId].x,
          y: positions[itemId].y,
        });
      }
    }

    setItems(newItems);
    generateQuestions(newItems);
  };

  // Generate questions based on items and configuration
  const generateQuestions = (itemList: Item[]) => {
    const questionList: Question[] = [];

    // Group items by groupId
    const itemGroups: { [key: number]: Item[] } = {};
    itemList.forEach((item) => {
      if (!itemGroups[item.groupId]) {
        itemGroups[item.groupId] = [];
      }
      itemGroups[item.groupId].push(item);
    });

    // For each group, select items for questions
    Object.values(itemGroups).forEach((groupItems) => {
      // Shuffle group items and take all of them (since we want all questions answered)
      const shuffledItems = [...groupItems].sort(() => Math.random() - 0.5);
      questionList.push(...shuffledItems);
    });

    // Shuffle final question order
    setQuestions(questionList.sort(() => Math.random() - 0.5));
    setAnswers({});
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((timeRemaining) => timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isTimerActive) {
      setIsTimerActive(false);
      calculateScore();
      setCurrentPage("results");
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timeRemaining]);

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
    generateItems();
    setCurrentPage("reference");
  };

  // Go to questions
  const goToQuestions = () => {
    setCurrentPage("questions");
    setTimeRemaining(config.timeLimit * 60);
    setIsTimerActive(true);
  };

  // Reset exercise
  const resetExercise = () => {
    setCurrentPage("setup");
    setTimeRemaining(config.timeLimit * 60);
    setIsTimerActive(false);
    setAnswers({});
    setScore(0);
  };

  // Setup page
  if (currentPage === "setup") {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
        <div className="text-center mb-8">
          <Settings className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Scanning Exercise Setup
          </h1>
          <p className="text-gray-600">Configure your exercise parameters</p>
        </div>

        <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Item Groups
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={config.itemGroups}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    itemGroups: parseInt(e.target.value) || 1,
                  }))
                }
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Each group will have the same shape and color
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Questions per Group
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={config.questionsPerGroup}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    questionsPerGroup: parseInt(e.target.value) || 1,
                  }))
                }
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Number of items/questions per group
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Limit (minutes)
              </label>
              <input
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
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">
                Exercise Summary
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• {config.itemGroups} groups of items</li>
                <li>• {config.questionsPerGroup} items per group</li>
                <li>
                  • Total: {config.itemGroups * config.questionsPerGroup}{" "}
                  items/questions
                </li>
                <li>• Time limit: {config.timeLimit} minutes</li>
              </ul>
            </div>

            <button
              onClick={startExercise}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Play size={20} />
              Generate Exercise
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === "reference") {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Scanning Exercise - Reference Page
          </h1>
          <p className="text-gray-600 mb-4">
            Study the items below, then proceed to answer questions about them
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={generateItems}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Shuffle size={20} />
              Regenerate Items
            </button>
            <button
              onClick={goToQuestions}
              className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Play size={20} />
              Start Questions ({config.timeLimit} min)
            </button>
          </div>
        </div>

        <div className="relative bg-gray-50 rounded-lg p-8 min-h-[600px] border-2 border-gray-200">
          {items.map((item) => (
            <div
              key={item.id}
              className="absolute flex items-center justify-center text-white font-bold text-sm shadow-lg"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className={`
                ${item.color} ${item.shape.class}
                w-16 h-16 flex flex-col items-center justify-center
                border-2 border-gray-800
              `}
              >
                <span className="text-xs font-bold">{item.number}</span>
                <span className="text-lg font-bold">{item.letter}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentPage === "questions") {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
        <div className="text-center mb-8">
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
                setCurrentPage("results");
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
        </div>

        <div className="flex gap-8">
          {/* Reference items (smaller version) */}
          <div className="w-1/2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Reference Items
            </h2>
            <div className="relative bg-gray-50 rounded-lg p-4 h-96 border-2 border-gray-200 overflow-hidden">
              {items.map((item) => (
                <div
                  key={`ref-${item.id}`}
                  className="absolute flex items-center justify-center text-white font-bold text-xs"
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: "translate(-50%, -50%) scale(0.6)",
                  }}
                >
                  <div
                    className={`
                    ${item.color} ${item.shape.class}
                    w-12 h-12 flex flex-col items-center justify-center
                    border-2 border-gray-800
                  `}
                  >
                    <span className="text-xs font-bold">{item.number}</span>
                    <span className="text-sm font-bold">{item.letter}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Questions */}
          <div className="w-1/2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Questions ({questions.length} total)
            </h2>
            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="bg-gray-50 rounded-lg p-3 border-2 border-gray-200"
                >
                  <div className="text-center mb-2">
                    <span className="text-xs font-semibold text-gray-600">
                      Q{index + 1}
                    </span>
                  </div>

                  <div className="flex justify-center mb-3">
                    <div
                      className={`
                      ${question.color} ${question.shape.class}
                      w-10 h-10 flex items-center justify-center
                      border-2 border-gray-800 text-white font-bold text-sm
                    `}
                    >
                      {question.number}
                    </div>
                  </div>

                  <div className="text-center">
                    <input
                      type="text"
                      maxLength={1}
                      value={answers[question.id] || ""}
                      onChange={(e) =>
                        handleAnswerChange(question.id, e.target.value)
                      }
                      className="w-10 h-10 text-center text-lg font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="?"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === "results") {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {questions.map((question, index) => {
            const userAnswer = answers[question.id] || "";
            const isCorrect = userAnswer === question.letter;

            return (
              <div
                key={question.id}
                className={`
                p-4 rounded-lg border-2 ${
                  isCorrect
                    ? "bg-green-50 border-green-300"
                    : "bg-red-50 border-red-300"
                }
              `}
              >
                <div className="text-center">
                  <div className="mb-2">
                    <span className="text-sm font-semibold text-gray-600">
                      Question {index + 1}
                    </span>
                  </div>

                  <div className="flex justify-center mb-2">
                    <div
                      className={`
                      ${question.color} ${question.shape.class}
                      w-10 h-10 flex items-center justify-center
                      border-2 border-gray-800 text-white font-bold text-sm
                    `}
                    >
                      {question.number}
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
        </div>
      </div>
    );
  }
};

export default ScanningExercise;
