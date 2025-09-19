"use client";

import {
  spellBackwardsQuestions,
  triviaQuestions,
} from "@/constants/exercises/dual-task-coordination/pool";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, RotateCcw, Settings, Hand } from "lucide-react";
import { Config } from "@/types/exercises/dual-task-coordination";
import { defaultConfig } from "@/constants/exercises/dual-task-coordination";
import HowToCard from "./HowToCard";
import { cn } from "@/libs/utils";

interface DualTaskCoordinationExerciseProps {
  config?: Config;
}

const DualTaskCoordinationExercise = ({
  config = defaultConfig,
}: DualTaskCoordinationExerciseProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes default
  const [questionsRemaining, setQuestionsRemaining] = useState(20);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [questionTimeLeft, setQuestionTimeLeft] = useState(15);
  const [leftHandPosition, setLeftHandPosition] = useState(0);
  const [rightHandPosition, setRightHandPosition] = useState(0);
  const [leftDirection, setLeftDirection] = useState(1);
  const [rightDirection, setRightDirection] = useState(1);
  const [activeHand, setActiveHand] = useState("left"); // which hand moves next
  const [tempo, setTempo] = useState(120); // BPM
  const [symbolMode, setSymbolMode] = useState(false);
  const [targetSymbols, setTargetSymbols] = useState({ left: "", right: "" });

  // Settings
  const [exerciseDuration, setExerciseDuration] = useState(300);
  const [totalQuestions, setTotalQuestions] = useState(20);
  const [questionTime, setQuestionTime] = useState(15);

  const intervalRef: React.MutableRefObject<NodeJS.Timeout | null> =
    useRef(null);
  const questionIntervalRef: React.MutableRefObject<NodeJS.Timeout | null> =
    useRef(null);
  const audioContextRef: React.MutableRefObject<AudioContext | null> =
    useRef(null);

  const nodeCount = 8;
  const symbols = ["●", "▲", "■", "◆", "★", "♣", "♠", "♥"];

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US"; // or "th-TH" for Thai, etc.
      utterance.rate = 1; // 0.5 = slow, 1 = normal, 1.5 = fast
      utterance.pitch = 1; // 0–2
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech synthesis not supported in this browser");
    }
  };

  // Generate questions
  const generateQuestion = useCallback(() => {
    const questionTypes = [
      () => {
        const a = Math.floor(Math.random() * 20) + 10;
        const b = Math.floor(Math.random() * 20) + 10;
        return `${a} × ${b} = ?`;
      },
      () => {
        const words = spellBackwardsQuestions;
        const word = words[Math.floor(Math.random() * words.length)];
        return `Spell "${word}" backwards`;
      },
      () => {
        const questions = triviaQuestions;
        return questions[Math.floor(Math.random() * questions.length)];
      },
    ];

    const randomType =
      questionTypes[Math.floor(Math.random() * questionTypes.length)];
    return randomType();
  }, []);

  // Audio functions
  const playBeep = useCallback((frequency = 800, duration = 100) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new window.AudioContext();
    }

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.setValueAtTime(
      frequency,
      audioContextRef.current.currentTime
    );
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContextRef.current.currentTime + duration / 1000
    );

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
  }, []);

  // Movement logic
  //   const moveHands = useCallback(() => {
  //     setLeftHandPosition((prev) => {
  //       const newPos = prev + leftDirection;
  //       if (newPos >= nodeCount - 1) {
  //         setLeftDirection(-1);
  //         return nodeCount - 1;
  //       } else if (newPos <= 0) {
  //         setLeftDirection(1);
  //         return 0;
  //       }
  //       return newPos;
  //     });

  //     setRightHandPosition((prev) => {
  //       const newPos = prev + rightDirection;
  //       if (newPos >= nodeCount - 1) {
  //         setRightDirection(-1);
  //         return nodeCount - 1;
  //       } else if (newPos <= 0) {
  //         setRightDirection(1);
  //         return 0;
  //       }
  //       return newPos;
  //     });

  //     setActiveHand((prev) => (prev === "left" ? "right" : "left"));
  //     playBeep(activeHand === "left" ? 600 : 800, 80);
  //   }, [
  //     leftDirection,
  //     rightDirection,
  //     activeHand,
  //     playBeep,
  //     symbolMode,
  //     symbols,
  //   ]);

  const moveHands = useCallback(() => {
    if (activeHand === "left") {
      setLeftHandPosition((prev) => {
        const newPos = prev + leftDirection;
        if (newPos >= nodeCount - 1) {
          setLeftDirection(-1);
          return nodeCount - 1;
        } else if (newPos <= 0) {
          setLeftDirection(1);
          return 0;
        }
        return newPos;
      });
      playBeep(600, 80);
    } else {
      setRightHandPosition((prev) => {
        const newPos = prev + rightDirection;
        if (newPos >= nodeCount - 1) {
          setRightDirection(-1);
          return nodeCount - 1;
        } else if (newPos <= 0) {
          setRightDirection(1);
          return 0;
        }
        return newPos;
      });
      playBeep(800, 80);
    }

    setActiveHand((prev) => (prev === "left" ? "right" : "left"));
  }, [activeHand, leftDirection, rightDirection, playBeep]);

  // Start exercise
  const startExercise = () => {
    if (isPaused) {
      setIsPaused(false);
    } else {
      setTimeRemaining(exerciseDuration);
      setQuestionsRemaining(totalQuestions);
      setQuestionTimeLeft(questionTime);
      setCurrentQuestion(generateQuestion());
      setLeftHandPosition(0);
      setRightHandPosition(0);
      setLeftDirection(1);
      setRightDirection(1);
      setActiveHand("left");

      if (symbolMode) {
        setTargetSymbols({
          left: symbols[Math.floor(Math.random() * symbols.length)],
          right: symbols[Math.floor(Math.random() * symbols.length)],
        });
      }
    }
    setIsRunning(true);
  };

  const pauseExercise = () => {
    setIsPaused(true);
    setIsRunning(false);
  };

  const resetExercise = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeRemaining(exerciseDuration);
    setQuestionsRemaining(totalQuestions);
    setQuestionTimeLeft(questionTime);
    setCurrentQuestion("");
    setLeftHandPosition(0);
    setRightHandPosition(0);
  };

  // Main game loop
  useEffect(() => {
    if (isRunning && !isPaused) {
      // Movement interval
      const interval = 60000 / tempo; // Convert BPM to milliseconds
      intervalRef.current = setInterval(moveHands, interval);

      return () => {
        if (!intervalRef.current) return;
        clearInterval(intervalRef.current);
      };
    }
  }, [isRunning, isPaused, tempo, moveHands]);

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  // Speak current question when it changes
  useEffect(() => {
    if (currentQuestion) {
      speak(currentQuestion);
    }
  }, [currentQuestion]);

  // Question timer
  useEffect(() => {
    if (isRunning && !isPaused && currentQuestion) {
      questionIntervalRef.current = setInterval(() => {
        setQuestionTimeLeft((prev) => {
          if (prev <= 1) {
            // Next question
            setQuestionsRemaining((prevQ) => {
              const newCount = prevQ - 1;
              if (newCount <= 0) {
                setIsRunning(false);
                return 0;
              }
              return newCount;
            });
            setCurrentQuestion(generateQuestion());
            return questionTime;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (!questionIntervalRef.current) return;
        clearInterval(questionIntervalRef.current);
      };
    }
  }, [isRunning, isPaused, currentQuestion, questionTime, generateQuestion]);

  // Dynamic tempo changes
  useEffect(() => {
    if (isRunning) {
      const tempoChange = setInterval(() => {
        setTempo((prev) => {
          const variation = Math.random() * 40 - 20; // ±20 BPM variation
          const newTempo = Math.max(80, Math.min(160, prev + variation));
          return Math.round(newTempo);
        });
      }, 10000); // Change tempo every 10 seconds

      return () => clearInterval(tempoChange);
    }
  }, [isRunning]);

  // Dynamic symbol changes
  useEffect(() => {
    if (symbolMode && isRunning) {
      const symbolChange = setInterval(() => {
        setTargetSymbols({
          left: symbols[Math.floor(Math.random() * symbols.length)],
          right: symbols[Math.floor(Math.random() * symbols.length)],
        });
      }, 15000); // Change symbols every 15 seconds

      return () => clearInterval(symbolChange);
    }
  }, [symbolMode, isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const renderNodes = (
    position: number,
    hand: "left" | "right",
    isActive: boolean
  ) => {
    return (
      <div className="flex items-center space-x-4 mb-6">
        <span
          className={`text-sm font-medium w-12 ${
            hand === "left" ? "text-blue-600" : "text-red-600"
          }`}
        >
          {hand.toUpperCase()}
        </span>
        <div className="flex space-x-2">
          {Array.from({ length: nodeCount }, (_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-150 ${
                i === position && isActive
                  ? hand === "left"
                    ? "bg-blue-500 border-blue-600 text-white shadow-lg scale-110"
                    : "bg-red-500 border-red-600 text-white shadow-lg scale-110"
                  : i === position
                  ? hand === "left"
                    ? "bg-blue-200 border-blue-400 text-blue-800"
                    : "bg-red-200 border-red-400 text-red-800"
                  : "bg-gray-100 border-gray-300 text-gray-500"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        {symbolMode && (
          <div
            className={`ml-4 text-lg font-bold ${
              hand === "left" ? "text-blue-600" : "text-red-600"
            }`}
          >
            Target: {targetSymbols[hand]}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="">
      {/* Settings Panel */}

      {/* Status Bar */}
      <div className="grid grid-cols-4 gap-4 mb-6 text-center">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {formatTime(timeRemaining)}
          </div>
          <div className="text-sm text-gray-600">Time Left</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {questionsRemaining}
          </div>
          <div className="text-sm text-gray-600">Questions Left</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{tempo}</div>
          <div className="text-sm text-gray-600">BPM</div>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {questionTimeLeft}
          </div>
          <div className="text-sm text-gray-600">Question Time</div>
        </div>
      </div>

      {/* Node Lines */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Hand Coordination
        </h3>
        {/* {renderNodes(
          leftHandPosition,
          "left",
          activeHand === "left" && isRunning
        )}
        {renderNodes(
          rightHandPosition,
          "right",
          activeHand === "right" && isRunning
        )} */}

        <div className="text-center mt-4">
          Active Hand {/* Left hand */}
          <div className="flex justify-center items-center space-x-12">
            <div className="space-y-2">
              <Hand
                size={64}
                className={cn(
                  "transition-colors",
                  activeHand === "left" ? "text-blue-500" : "text-blue-200"
                )}
              />
              <p>Left Hand</p>
            </div>
            <div className="space-y-2">
              <Hand
                size={64}
                className={cn(
                  "transition-colors",
                  activeHand === "right" ? "text-red-500" : "text-red-200"
                )}
              />
              <p>Right Hand</p>
            </div>
          </div>
        </div>
      </div>

      {/* Question Display */}
      {currentQuestion && (
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Current Question:</h3>
          <p className="text-xl font-medium text-gray-800 mb-2">
            {currentQuestion}
          </p>
          <div className="text-sm text-gray-600">
            Answer time remaining:{" "}
            <span className="font-bold text-orange-600">
              {questionTimeLeft}s
            </span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center space-x-4 mb-6">
        {!isRunning ? (
          <button
            onClick={startExercise}
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Play size={20} />
            <span>{isPaused ? "Resume" : "Start"}</span>
          </button>
        ) : (
          <button
            onClick={pauseExercise}
            className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Pause size={20} />
            <span>Pause</span>
          </button>
        )}

        <button
          onClick={resetExercise}
          className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <RotateCcw size={20} />
          <span>Reset</span>
        </button>
      </div>

      {/* Instructions */}
      <HowToCard />
    </div>
  );
};

export default DualTaskCoordinationExercise;
