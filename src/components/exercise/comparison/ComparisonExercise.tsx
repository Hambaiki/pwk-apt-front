"use client";

import { Button, Card, Modal } from "@/components/ui";
import { ModalContent, ModalHeader } from "@/components/ui/Modal";
import { ComparisonExerciseCard } from "@/components/exercise/comparison/ComparisonExerciseCard";
import HowToCard from "@/components/exercise/comparison/HowToCard";
import Toolbar from "../Toolbar";

import {
  comparisonAnswers,
  defaultConfig,
} from "@/constants/exercises/comparison";

import { Choice } from "@/types/exercises";
import {
  ComparisonItem,
  Config,
  GenerationType,
} from "@/types/exercises/comparison";

import { CircleQuestionMark, Pause } from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/libs/utils";

interface ComparisonExerciseProps {
  items: ComparisonItem[];
  config?: Config;
}

const ComparisonExercise = ({
  items,
  config = defaultConfig,
}: ComparisonExerciseProps) => {
  const router = useRouter();

  const [isViewingHelp, setIsViewingHelp] = useState<boolean>(false);

  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  const [answers, setAnswers] = useState<Record<number, Choice>>({});

  const handleEnd = () => {
    setIsComplete(true);
  };

  const resetExercise = () => {
    setIsComplete(false);
    setQuestionIndex(0);
    setAnswers({});
    setIsTimerActive(true);
  };

  const exitExercise = () => {
    router.push("/exercises/comparison");
  };

  return (
    <>
      <div className="space-y-4">
        <Card>
          <Toolbar
            isRunning={isTimerActive && !isComplete}
            isComplete={isComplete}
            timerLimit={config.timer}
            onEnd={() => {
              setIsComplete(true);
              setIsTimerActive(false);
              window.scrollTo({ behavior: "smooth", top: 0 });
            }}
            onPause={() => setIsTimerActive((prev) => !prev)}
            onHelp={() => setIsViewingHelp(true)}
            onRestart={resetExercise}
            onExit={exitExercise}
          />
        </Card>

        {!isComplete && (
          <div
            className={cn(
              !isTimerActive ? "blur pointer-events-none transition-all" : ""
            )}
          >
            <ComparisonExerciseCard
              progress={questionIndex / items.length}
              exercise={items[questionIndex]}
              selected={answers[questionIndex]}
              hasNext={questionIndex < items.length - 1}
              hasPrevious={questionIndex > 0}
              isLast={questionIndex === items.length - 1}
              onNext={() => {
                if (questionIndex === items.length - 1) {
                  setIsComplete(true);
                  return;
                }
                setQuestionIndex((prev) =>
                  Math.min(prev + 1, items.length - 1)
                );
              }}
              onPrevious={() => {
                setQuestionIndex((prev) => Math.max(prev - 1, 0));
              }}
              onAnswer={(choice) => {
                setAnswers((prev) => ({ ...prev, [questionIndex]: choice }));
              }}
            />
          </div>
        )}

        {isComplete && (
          <Card className="space-y-4 rounded-2xl">
            {items.map((item, index) => {
              const question = item.mutations ? item : undefined;
              const answer = answers[index];
              const correct = answer
                ? comparisonAnswers[answer]?.check(question?.mutationCount ?? 0)
                : false;

              return (
                <Card key={index} className="space-y-2 bg-background-primary">
                  <div className="flex">
                    <div className="flex-1">
                      <p className="font-bold">Question {index + 1}</p>
                      <p className="text-sm text-muted-foreground">
                        Your answer:{" "}
                        <span className="font-semibold">
                          {answer ?? "<no answer>"}
                        </span>
                      </p>
                      {answer
                        ? comparisonAnswers[answer] && (
                            <p className="text-sm text-muted-foreground">
                              {comparisonAnswers[answer].description}
                            </p>
                          )
                        : null}
                      <p className="text-sm text-muted-foreground">
                        Mutations in total:{" "}
                        <span className="font-semibold">
                          {question?.mutationCount}
                        </span>
                      </p>
                    </div>

                    <div>
                      {correct ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                          Correct
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                          Incorrect
                        </span>
                      )}
                    </div>
                  </div>

                  <Card variant="info" className="rounded-lg">
                    <p className="font-bold">All mutations</p>

                    <ul className="list-disc list-inside text-sm">
                      {question?.mutations.map((mutation, index) => {
                        const isWords =
                          item.generationType === GenerationType.WORDS;

                        return (
                          <li key={index}>
                            {mutation.mutationType}{" "}
                            <code>
                              {isWords
                                ? mutation.base.join(", ")
                                : mutation.base}
                            </code>{" "}
                            to{" "}
                            <code>
                              {isWords
                                ? mutation.mutatedBase.join(", ")
                                : mutation.mutatedBase}
                            </code>
                          </li>
                        );
                      })}

                      {question?.mutations.length === 0 && (
                        <li className="italic text-muted-foreground">
                          No mutations (items were identical)
                        </li>
                      )}
                    </ul>
                  </Card>
                </Card>
              );
            })}
          </Card>
        )}
      </div>

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

export default ComparisonExercise;
