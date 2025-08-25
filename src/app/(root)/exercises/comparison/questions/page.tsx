"use client";

import { ComparisonExerciseCard } from "@/components/exercise/comparison/ComparisionExerciseCard";
import HowToCard from "@/components/exercise/comparison/HowToCard";
import { Button, Card } from "@/components/ui";

import { comparisonAnswers } from "@/constants/exercises/comparison";
import { generateComparisonExercise } from "@/libs/exercises/comparison";

import { Choice } from "@/types/exercises";
import {
  Comparison,
  GenerationType,
  GeneratorOptions,
  MutationType,
} from "@/types/exercises/comparison";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function ComparisonExerciseQuestionPage() {
  const searchParams = useSearchParams();

  const options: GeneratorOptions & { timer: number } = useMemo(() => {
    const getInt = (key: string, fallback: number) =>
      parseInt(searchParams.get(key) ?? "", 10) || fallback;

    const getArray = <T extends string>(key: string, fallback: T[]) =>
      searchParams.get(key)
        ? (searchParams.get(key)!.split(",") as T[])
        : fallback;

    return {
      count: getInt("count", 5),
      length: getInt("length", 5),
      minMutation: getInt("minMutation", 0),
      maxMutation: getInt("maxMutation", 6),
      generationTypes: getArray(
        "generationTypes",
        Object.values(GenerationType)
      ),
      mutationTypes: getArray("mutationTypes", Object.values(MutationType)),
      timer: getInt("timer", 300),
    };
  }, [searchParams]);

  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [questionList, setQuestionList] = useState<
    { question: Comparison; answer: Choice | undefined }[] | undefined
  >();
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const handleStart = (options: GeneratorOptions & { timer: number }) => {
    setIsComplete(false);
    setQuestionIndex(0);

    const questions = generateComparisonExercise({ ...options });

    setQuestionList(questions.map((q) => ({ question: q, answer: undefined })));
  };

  const handleEnd = () => {
    setIsComplete(true);
  };

  const handleReset = () => {
    setIsComplete(false);
    setQuestionIndex(0);
    setQuestionList(undefined);
  };

  return (
    <div className="flex flex-col max-w-7xl mx-auto p-6 space-y-6">
      <Card>
        <div className="flex gap-3">
          <Button
            disabled={questionList !== undefined}
            onClick={() => handleStart(options)}
          >
            Start
          </Button>
          <Button onClick={() => handleEnd()}>End</Button>
          <Button onClick={() => handleReset()}>Reset</Button>
        </div>
      </Card>

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
            <Button
              variant="outline"
              onClick={() => {
                setIsComplete(false);
                setQuestionIndex(0);
                setQuestionList(undefined);
              }}
            >
              Try Again
            </Button>
          </div>
        </div>
      )}

      <HowToCard />
    </div>
  );
}
