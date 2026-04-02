"use client";

import Collapse from "@/components/content/Collapse";
import Score from "@/components/exercise/Score";
import Toolbar from "@/components/exercise/Toolbar";
import { Card, Modal } from "@/components/ui";
import { ModalContent, ModalHeader } from "@/components/ui/Modal";
import { cn } from "@/libs/utils/cn";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { defaultConfig } from "../constants";
import { Config, ShapeGridItem, Stage } from "../types";
import HowToCard from "./HowToCard";
import ShapeItem from "./ShapeItem";

interface ScanningExerciseProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ShapeGridItem[];
  questions: ShapeGridItem[];
  config?: Config;
}

const ScanningExercise = ({
  items,
  questions,
  config = defaultConfig,
  className,
  ...props
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

  const endExercise = () => {
    calculateScore();
    setStage(Stage.Results);
    setIsTimerActive(false);
    window.scrollTo({ behavior: "smooth", top: 0 });
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
    <div {...props} className={cn("flex flex-col gap-y-4", className)}>
      <Toolbar
        isRunning={isTimerActive && stage === Stage.Questions}
        isComplete={stage === Stage.Results}
        timerLimit={config.timeLimit}
        onEnd={endExercise}
        onPause={() => setIsTimerActive((prev) => !prev)}
        onHelp={() => setIsViewingHelp(true)}
        onRestart={resetExercise}
        onExit={exitExercise}
      />

      <Collapse isOpen={stage === Stage.Results}>
        <Score
          answerCount={Object.keys(answers).length}
          correctCount={score}
          totalCount={questions.length}
          score={score}
          maxScore={questions.length}
        />
      </Collapse>

      <Card className="mt-4 bg-background-primary">
        <div
          className={cn(
            "pr-1 overflow-x-auto transition-all",
            !isTimerActive && stage === Stage.Questions ? "blur" : "",
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

      <Card className="mt-4 bg-background-primary">
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
                    : "",
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
                      <span className="font-semibold">Correct answer: </span>
                      <span className="text-green-600">{question.letter}</span>
                    </p>
                  </Card>
                )}
              </Card>
            );
          })}
        </div>
      </Card>

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
    </div>
  );
};

export default ScanningExercise;
