"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { useEffect, useState } from "react";
import { Answer, ComparisonResult } from "@/types/comparison/question";
import { countDifferences } from "@/utils/comparison/question";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function ComparisonExercise({
  questions,
}: {
  questions: ComparisonResult[];
}) {
  const [configPhase, setConfigPhase] = useState(true);
  const [questionCount, setQuestionCount] = useState(10);
  const [timeLimit, setTimeLimit] = useState<number | null>(null); // in minutes
  const [selectedQuestions, setSelectedQuestions] = useState<
    ComparisonResult[]
  >([]);

  const [userAnswers, setUserAnswers] = useState<Record<number, Answer | null>>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Timer countdown
  useEffect(() => {
    if (!startTime || submitted) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      setElapsedTime(diff);

      if (timeLimit && diff >= timeLimit * 60) {
        handleSubmit(); // Auto-submit on timeout
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, submitted, timeLimit]);

  const handleStart = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, questionCount);
    setSelectedQuestions(selected);
    setUserAnswers(Object.fromEntries(selected.map((_, i) => [i, null])));
    setConfigPhase(false);
    setStartTime(new Date());
    setElapsedTime(0);
  };

  const handleChange = (index: number, value: Answer) => {
    setUserAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setConfigPhase(true);
    setSubmitted(false);
    setElapsedTime(0);
    setStartTime(null);
    setUserAnswers({});
    setSelectedQuestions([]);
  };

  const correctCount = selectedQuestions.reduce((acc, q, i) => {
    return userAnswers[i] === q.correctAnswer ? acc + 1 : acc;
  }, 0);

  // Phase 1: Setup screen
  if (configPhase) {
    return (
      <div className="p-6 space-y-4 rounded-lg bg-white">
        <h2 className="text-2xl font-bold text-center">Configure Exercise</h2>

        <div className="space-y-2">
          <label className="block">
            Number of questions:
            <Input
              type="number"
              min={1}
              max={questions.length}
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="mt-1 block w-full border rounded px-3 py-1"
            />
          </label>

          <label className="block">
            Time limit (minutes, optional):
            <Input
              type="number"
              min={0}
              value={timeLimit ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                setTimeLimit(val === "" ? null : Number(val));
              }}
              placeholder="e.g., 5"
              className="mt-1 block w-full border rounded px-3 py-1"
            />
          </label>
        </div>

        <div className="text-center mt-4">
          <Button onClick={handleStart} className="px-6 py-2 rounded-full">
            Start Exercise
          </Button>
        </div>
      </div>
    );
  }

  // Phase 2: Exercise UI
  return (
    <div className="p-4 space-y-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center">Comparison Exercise</h2>

      <p className="text-center text-sm text-gray-500">
        If the left and the right are the same, select A. If 1 mistake, select
        B. If 2 mistakes, select C. If 3 mistakes, select D. If 4 mistakes,
        select E, If 5 or more mistakes, select F.
      </p>

      <div className="text-center text-sm text-gray-500">
        Time elapsed: {elapsedTime} seconds
        {timeLimit && (
          <span>
            {" "}
            / Limit: {timeLimit * 60}s (
            {Math.max(0, timeLimit * 60 - elapsedTime)}s left)
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border border-gray-300">#</th>
              <th className="p-2 border border-gray-300">Left</th>
              <th className="p-2 border border-gray-300">Right</th>
              {Object.values(Answer).map((opt) => (
                <th
                  key={opt}
                  className="p-2 border border-gray-300 text-center"
                >
                  {opt}
                </th>
              ))}
              {submitted && (
                <th className="p-2 border border-gray-300 text-center">
                  Result
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {selectedQuestions.map((q, index) => (
              <tr key={index}>
                <td className="p-2 border border-gray-300">{index + 1}</td>
                <td className="p-2 border border-gray-300 font-mono">
                  {q.left}
                </td>
                <td className="p-2 border border-gray-300 font-mono">
                  {q.right}
                </td>
                {Object.values(Answer).map((opt) => (
                  <td
                    key={opt}
                    className="p-2 border border-gray-300 text-center"
                  >
                    <input
                      type="radio"
                      name={`q${index}`}
                      value={opt}
                      checked={userAnswers[index] === opt}
                      onChange={() => handleChange(index, opt)}
                      disabled={submitted}
                      className="form-radio"
                    />
                  </td>
                ))}
                {submitted && (
                  <td
                    className={`p-2 border border-gray-300 text-center font-bold ${
                      userAnswers[index] === q.correctAnswer
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {userAnswers[index] === q.correctAnswer ? (
                      <CheckIcon className="w-4 h-4 shrink-0" />
                    ) : (
                      <>
                        <XMarkIcon className="inline-block w-4 h-4 shrink-0" />{" "}
                        ({q.correctAnswer})
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!submitted ? (
        <div className="text-center mt-4">
          <Button onClick={handleSubmit} className="px-6 py-2">
            Submit Answers
          </Button>
        </div>
      ) : (
        <>
          <div className="text-center mt-6 text-xl font-semibold">
            You got {correctCount} out of {selectedQuestions.length} correct!
          </div>

          <div className="mt-8 max-w-4xl mx-auto space-y-4">
            <h3 className="text-lg font-bold mb-3">
              Per-Question Explanations
            </h3>
            {selectedQuestions.map((q, i) => {
              const diffCount = countDifferences(q.left, q.right);

              return (
                <div
                  key={i}
                  className="border rounded p-4 bg-gray-50 text-sm"
                  aria-label={`Explanation for question ${i + 1}`}
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
                          userAnswers[i] === q.correctAnswer
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
                      >
                        {userAnswers[i] ?? "No answer"}
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
        </>
      )}
    </div>
  );
}
