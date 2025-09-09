"use client";

import { ComparisonExerciseCard } from "@/components/exercise/comparison/ComparisionExerciseCard";
import ConfigurerCard from "@/components/exercise/comparison/ConfigurerCard";
import HowToCard from "@/components/exercise/comparison/HowToCard";
import MainSection from "@/components/template/MainSection";
import { Button, Card, Modal } from "@/components/ui";
import { ModalContent, ModalHeader } from "@/components/ui/Modal";

import {
  comparisonAnswers,
  defaultComparisonOptions,
} from "@/constants/exercises/comparison";
import { generateComparisonExercise } from "@/libs/exercises/comparison";

import { Choice } from "@/types/exercises";
import {
  Comparison,
  ComparisonGeneratorOptions,
} from "@/types/exercises/comparison";
import { CircleQuestionMark, Pause, Play } from "lucide-react";

import { useState } from "react";

export default function ComparisonExerciseQuestionPage() {
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
  const [isViewingHelp, setIsViewingHelp] = useState<boolean>(false);

  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [questionList, setQuestionList] = useState<
    { question: Comparison; answer: Choice | undefined }[] | undefined
  >();

  const handleStart = (
    configs: ComparisonGeneratorOptions & { timer: number }
  ) => {
    setIsComplete(false);
    setQuestionIndex(0);

    const questions = generateComparisonExercise({ ...configs });

    setQuestionList(questions.map((q) => ({ question: q, answer: undefined })));
  };

  const handleEnd = () => {
    setIsComplete(true);
  };

  return (
    <MainSection className="gap-6">
      <Card>
        <div className="flex gap-3">
          <Button
            variant="primary"
            disabled={questionList !== undefined}
            onClick={() => handleStart(defaultComparisonOptions)}
          >
            <Play width={16} height={16} className="mr-2" />
            Start
          </Button>
          <Button
            variant="error"
            disabled={isComplete}
            onClick={() => handleEnd()}
          >
            <Pause width={16} height={16} className="mr-2" />
            End
          </Button>
          <Button variant="outline" onClick={() => setIsViewingHelp(true)}>
            <CircleQuestionMark width={16} height={16} className="mr-2" />
            How to
          </Button>
        </div>
      </Card>

      <Modal isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)}>
        <ModalContent>
          <ModalHeader>
            <h3 className="text-2xl font-semibold">Configure Exercise</h3>
          </ModalHeader>
          <ConfigurerCard onSubmit={handleStart} />
        </ModalContent>
      </Modal>

      {!isComplete && questionList && questionList.length > 0 && (
        <ComparisonExerciseCard
          progress={questionIndex / questionList.length}
          exercise={questionList[questionIndex].question}
          selected={questionList[questionIndex].answer}
          hasNext={questionIndex < questionList.length - 1}
          hasPrevious={questionIndex > 0}
          isLast={questionIndex === questionList.length - 1}
          onNext={() => {
            if (questionIndex === questionList.length - 1) {
              setIsComplete(true);
              return;
            }
            setQuestionIndex((prev) =>
              Math.min(prev + 1, questionList.length - 1)
            );
          }}
          onPrevious={() => {
            setQuestionIndex((prev) => Math.max(prev - 1, 0));
          }}
          onAnswer={(choice) => {
            setQuestionList((prev) => {
              if (!prev) return prev;
              const newList = [...prev];
              newList[questionIndex].answer = choice as Choice;
              return newList;
            });
          }}
        />
      )}

      {isComplete && questionList && (
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold">Results</h3>
          <p className="text-sm text-muted-foreground">
            Here’s how you did in this exercise:
          </p>

          <Card className="p-4 space-y-4">
            {questionList.map((item, index) => {
              const question = item.question;
              const answer = item.answer;
              const correct = answer
                ? comparisonAnswers[answer]?.check(question?.mutationCount ?? 0)
                : false;

              return (
                <div
                  key={index}
                  className="flex items-start justify-between p-3 border rounded-lg bg-muted/30"
                >
                  <div>
                    <p className="font-medium">Question {index + 1}</p>
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
              );
            })}
          </Card>

          <div className="flex justify-end gap-3">
            <Button
              onClick={() => {
                setIsComplete(false);
                setQuestionIndex((prev) => Math.max(prev, 0));
              }}
            >
              Back
            </Button>
          </div>
        </div>
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
}
