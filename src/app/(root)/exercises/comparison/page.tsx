"use client";

import Main from "@/components/layout/Main";
import { Button } from "@/components/ui/Button";

import { Answer, ComparisonResult } from "@/types/comparison/question";

import {
  generateBaseSamples,
  generateComparisonPairsWithBase,
} from "@/utils/comparison/algorithm";
import {
  countDifferences,
  generateComparisonExercise,
} from "@/utils/comparison/question";

import { clsx } from "clsx";
import { Check, X } from "lucide-react";

import { useEffect, useMemo, useState } from "react";

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ComparisonExerciseStartPage({
  searchParams,
}: PageProps) {
  const [questions, setQuestions] = useState<ComparisonResult[]>([]);
  const [answers, setAnswers] = useState<Record<number, Answer | null>>({});

  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const options = useMemo(() => {
    const timeLimit = searchParams?.timeLimit;
    const totalCount = searchParams?.totalCount;

    const parsedTimeLimit = timeLimit
      ? parseInt(timeLimit as string, 10)
      : null;
    const parsedTotalCount = totalCount
      ? parseInt(totalCount as string, 10)
      : null;

    return {
      timeLimit: parsedTimeLimit,
      totalCount: parsedTotalCount || 10,
    };
  }, [searchParams]);

  const correctCount = useMemo(() => {
    return questions.reduce((acc, q, i) => {
      return answers[i] === q.correctAnswer ? acc + 1 : acc;
    }, 0);
  }, [questions, answers]);

  useEffect(() => {
    const count = options.totalCount;

    // TODO: Make this a pipeline
    const baseSamples = generateBaseSamples(count);
    const examples: [string, string][] =
      generateComparisonPairsWithBase(baseSamples);
    const questions = generateComparisonExercise(examples);

    console.log("Generated Questions:", questions);

    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuestions.slice(0, count);

    setQuestions(selectedQuestions);
  }, [options]);

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      setElapsedTime(diff);

      if (options.timeLimit && diff >= options.timeLimit * 60) {
        handleSubmit(); // Auto-submit on timeout
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, options]);

  function handleStart() {
    setStartTime(new Date());
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  function handleReset() {
    setSubmitted(false);
    setElapsedTime(0);
    setStartTime(null);
  }

  function handleChange(index: number, value: Answer) {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  }

  return (
    <Main className="space-y-4">
      <div className="space-y-6 p-4">
        <h1 className="text-2xl font-bold text-center">Comparison Exercise</h1>

        <p className="text-center text-sm">
          If the left and the right are the same, select A. If 1 mistake, select
          B. If 2 mistakes, select C. If 3 mistakes, select D. If 4 mistakes,
          select E, If 5 or more mistakes, select F.
        </p>

        <div className="text-center text-sm">
          Time elapsed: {elapsedTime} seconds
          {options.timeLimit && (
            <span>
              {" "}
              / Limit: {options.timeLimit * 60}s (
              {Math.max(0, options.timeLimit * 60 - elapsedTime)}s left)
            </span>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table
          className={clsx(
            "min-w-full table-auto text-sm",
            !startTime && "blur"
          )}
        >
          <thead>
            <tr className="text-left">
              <th className="p-2">#</th>
              <th className="p-2">Left</th>
              <th className="p-2">Right</th>
              {Object.values(Answer).map((opt) => (
                <th key={opt} className="p-2 text-center">
                  {opt}
                </th>
              ))}
              {submitted && <th className="p-2 text-center">Result</th>}
            </tr>
          </thead>
          <tbody>
            {questions.map((q, index) => (
              <tr key={index}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2 font-mono">{q.left}</td>
                <td className="p-2 font-mono">{q.right}</td>
                {Object.values(Answer).map((opt) => (
                  <td key={opt} className="p-2 text-center">
                    <input
                      type="radio"
                      name={`q${index}`}
                      value={opt}
                      checked={answers[index] === opt}
                      onChange={() => handleChange(index, opt)}
                      disabled={submitted}
                      className="form-radio"
                    />
                  </td>
                ))}
                {submitted && (
                  <td
                    className={`p-2 text-center font-bold ${
                      answers[index] === q.correctAnswer
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {answers[index] === q.correctAnswer ? (
                      <Check className="w-4 h-4 shrink-0" />
                    ) : (
                      <>
                        <X className="inline-block w-4 h-4 shrink-0" /> (
                        {q.correctAnswer})
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={clsx("text-center mt-4", startTime && "hidden")}>
        <Button onClick={handleStart} className="px-6 py-2">
          Start
        </Button>
      </div>

      <div className={clsx("text-center mt-4", submitted && "hidden")}>
        <Button onClick={handleSubmit} className="px-6 py-2">
          Submit Answers
        </Button>
      </div>

      <div className={clsx("space-y-6 p-4", !submitted && "hidden")}>
        <div className="text-center text-xl font-semibold">
          You got {correctCount} out of {questions.length} correct!
        </div>

        <h3 className="text-lg font-bold mb-3">Per-Question Explanations</h3>

        <div className="block">
          {questions.map((q, i) => {
            const diffCount = countDifferences(q.left, q.right);

            return (
              <div
                key={i}
                aria-label={`Explanation for question ${i + 1}`}
                className="odd:bg-black/5 even:bg-black/20 backdrop-blur first:rounded-t-xl last:rounded-b-xl p-4"
              >
                <div>
                  <strong>Question {i + 1}:</strong> Difference count:{" "}
                  {diffCount}
                </div>
                <div>
                  <strong>Correct answer:</strong> {q.correctAnswer}
                </div>
                <div className="mt-1">
                  <em>
                    Explanation: The strings differ by {diffCount} character
                    {diffCount !== 1 ? "s" : ""}. Your answer was{" "}
                    <span
                      className={
                        answers[i] === q.correctAnswer
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {answers[i] ?? "No answer"}
                    </span>
                    .
                  </em>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-4">
          <Button onClick={handleReset} className="px-6 py-2 rounded-full">
            Retry Exercise
          </Button>
        </div>
      </div>
    </Main>
  );
}
