"use client";

import { Button, Card, Modal } from "@/components/ui";
import {
  HeaderCard,
  HeaderCardTitle,
  HeaderCardDescription,
} from "@/components/content/HeaderCard";
import { ModalContent, ModalHeader } from "@/components/ui/Modal";
import Toolbar from "@/components/exercise/Toolbar";
import ShapeItem from "@/components/exercise/scanning/ShapeItem";
import HowToCard from "@/components/exercise/scanning/HowToCard";

import { cn } from "@/libs/utils";

import { Config, ShapeGridItem, Stage } from "@/types/exercises/scanning";

import { defaultConfig } from "@/constants/exercises/scanning";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface ScanningExerciseProps {
  items: ShapeGridItem[];
  questions: ShapeGridItem[];
  config?: Config;
}

const ScanningExercise = ({
  items,
  questions,
  config = defaultConfig,
}: ScanningExerciseProps) => {
  const router = useRouter();

  const [stage, setStage] = useState<Stage>(Stage.Questions); // 'reference', 'questions', 'results'

  // Question and item state
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);

  // Timer state (in seconds)
  const [isTimerActive, setIsTimerActive] = useState(true);

  // Misc state
  const [isViewingHelp, setIsViewingHelp] = useState(false);

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

  // Reset exercise
  const resetExercise = () => {
    setStage(Stage.Questions);
    setIsTimerActive(true);
    setAnswers({});
    setScore(0);
  };

  const exitExercise = () => {
    router.push("/exercises/scanning");
  };

  return (
    <>
      <HeaderCard>
        <HeaderCardTitle>Scanning - Questions</HeaderCardTitle>
        <HeaderCardDescription>
          What letter is in each shape and number combination?
        </HeaderCardDescription>
      </HeaderCard>

      {stage === Stage.Results && (
        <Card className="p-10 sm:p-20 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-400 shadow-medium text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">🎉 Results</h2>

          {/* Score summary */}
          <div className="space-y-2">
            <p className="text-gray-100 text-lg">
              You answered <span className="font-semibold">{score}</span> out of{" "}
              <span className="font-semibold">{questions.length}</span>{" "}
              questions correctly.
            </p>
            <p className="text-gray-100 text-lg">
              Accuracy:{" "}
              <span className="font-semibold">
                {answers && Object.keys(answers).length > 0
                  ? `${Math.round(
                      (score / Object.keys(answers).length) * 100
                    )}%`
                  : "N/A"}
              </span>
            </p>
          </div>

          {/* Percentage progress bar */}
          <div className="w-full max-w-md mx-auto">
            <div className="h-4 w-full bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-4 bg-green-400 transition-all duration-700"
                style={{
                  width: `${Math.round((score / questions.length) * 100)}%`,
                }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-100">
              Overall Score:{" "}
              <span className="font-semibold">
                {Math.round((score / questions.length) * 100)}%
              </span>
            </p>
          </div>

          {/* Personalized message */}
          <div className="text-lg text-white font-medium">
            {score === questions.length &&
              "🌟 Perfect score! You nailed every question."}
            {score >= questions.length * 0.8 &&
              score < questions.length &&
              "🔥 Great job! You're almost perfect."}
            {score >= questions.length * 0.5 &&
              score < questions.length * 0.8 &&
              "👍 Good effort! Keep practicing to improve even more."}
            {score < questions.length * 0.5 &&
              "💡 Don’t worry! Every mistake is a step toward learning."}
          </div>

          {/* Call to Action */}
          <div className="mt-6 flex justify-center gap-4">
            <Button variant="outline" onClick={resetExercise}>
              Retry
            </Button>
            <Button variant="primary" onClick={exitExercise}>
              Exit
            </Button>
          </div>
        </Card>
      )}

      {(stage === Stage.Results || stage === Stage.Questions) && (
        <section className="space-y-6">
          <Card className="space-y-4">
            <Toolbar
              isRunning={isTimerActive && stage === Stage.Questions}
              isComplete={stage === Stage.Results}
              timerLimit={config.timeLimit}
              onEnd={() => {
                calculateScore();
                setStage(Stage.Results);
                setIsTimerActive(false);
                window.scrollTo({ behavior: "smooth", top: 0 });
              }}
              onPause={() => setIsTimerActive((prev) => !prev)}
              onHelp={() => setIsViewingHelp(true)}
              onRestart={resetExercise}
              onExit={exitExercise}
            />

            <Card className="bg-background-primary">
              <div
                className={cn(
                  "pr-1 overflow-x-auto transition-all",
                  !isTimerActive && stage === Stage.Questions ? "blur" : ""
                )}
              >
                <div className="relative w-[800px] h-[500px] mx-auto">
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
                        `flex flex-col transition-all`,
                        !isTimerActive && stage === Stage.Questions
                          ? "blur pointer-events-none"
                          : "",
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
    </>
  );
};

export default ScanningExercise;
