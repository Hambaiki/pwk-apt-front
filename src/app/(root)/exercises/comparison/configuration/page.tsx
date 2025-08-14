"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { generateComparisonExercise } from "@/utils/comparison/question";
import {
  generateBaseSamples,
  generateComparisonPairsWithBase,
} from "@/utils/comparison/algorithm";

import { useState } from "react";

export default function ComparisonExerciseConfigPage() {
  const [questionCount, setQuestionCount] = useState(10);
  const [timeLimit, setTimeLimit] = useState<number | null>(null);

  const handleStart = ({ count }: { count: number }) => {
    const baseSamples = generateBaseSamples(count);
    const examples: [string, string][] =
      generateComparisonPairsWithBase(baseSamples);

    const questions = generateComparisonExercise(examples);

    console.log("Generated Questions:", questions);

    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);
    // setSelectedQuestions(selected);
    // setUserAnswers(Object.fromEntries(selected.map((_, i) => [i, null])));
    // setConfigPhase(false);
    // setStartTime(new Date());
    // setElapsedTime(0);
  };

  return (
    <div className="p-6 space-y-4 rounded-lg bg-white">
      <h2 className="text-2xl font-bold text-center">Configure Exercise</h2>

      <div className="space-y-2">
        <label className="block">
          Number of questions:
          <Input
            type="number"
            min={1}
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
        <Button
          onClick={() => handleStart({ count: questionCount })}
          className="px-6 py-2 rounded-full"
        >
          Start Exercise
        </Button>
      </div>
    </div>
  );
}
