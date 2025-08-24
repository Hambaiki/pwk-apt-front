"use client";

import { Card, Button, Input, Checkbox } from "@/components/ui";
import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";

import {
  GenerationType,
  GeneratorOptions,
  MutationType,
} from "@/types/exercises/comparison";

import { Info, Wrench } from "lucide-react";

import { useState } from "react";

export default function ComparisonExercisePage() {
  const [config, setConfig] = useState<
    GeneratorOptions & {
      timer: number;
    }
  >({
    count: 5,
    length: 5,
    minMutation: 0,
    maxMutation: 6,
    generationTypes: Object.values(GenerationType),
    mutationTypes: Object.values(MutationType),
    timer: 300,
  });

  return (
    <div className="flex flex-col max-w-7xl mx-auto p-6 space-y-6">
      <Breadcrumb>
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Exercises" href="/exercises" />
        <BreadcrumbItem label="Comparison" href="/exercises/comparison" />
      </Breadcrumb>

      {/* Header */}
      <Card className="p-20 rounded-xl bg-gradient-to-br from-primary-800 to-primary-600 shadow-md">
        <h1 className="mb-2 text-white">Comparison Exercise</h1>
        <p className="text-gray-100">
          Compare 2 values and determine whether they are the same or not.
        </p>
      </Card>

      <div className="mb-8">
        <h2 className="mb-4 flex items-center gap-2">
          <Info className="w-8 h-8" />
          Introduction
        </h2>
        <p>
          This exercise will help you improve your ability to identify
          differences and similarities between sequences. Follow the
          instructions carefully and select the correct option for each
          question.
        </p>
      </div>

      {/* Instructions */}
      <Card size="lg" className="space-y-6 bg-background-secondary">
        <h3 className="text-2xl font-semibold mb-2">
          How to use this exercise
        </h3>

        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li>
            You will see two sequences side by side: <strong>Left</strong> and{" "}
            <strong>Right</strong>.
          </li>
          <li>
            Your task is to determine how many differences (mutations) exist
            between them.
          </li>
          <li>
            Select one of the options from <strong>A</strong> to{" "}
            <strong>F</strong>:
            <ul className="list-disc list-inside ml-5 text-gray-600 mt-1">
              <li>A: Both sequences are the same</li>
              <li>B: 1 difference</li>
              <li>C: 2 differences</li>
              <li>D: 3 differences</li>
              <li>E: 4 differences</li>
              <li>F: 5 or more differences</li>
            </ul>
          </li>
          <li>
            Use the <strong>Next</strong> and <strong>Previous</strong> buttons
            to navigate through questions.
          </li>
          <li>
            At the end, you will see your results and the correct answers with
            explanations.
          </li>
        </ol>
      </Card>

      <div className="mb-8">
        <h2 className="mb-4 flex items-center gap-2">
          <Wrench className="w-8 h-8" />
          Configuration
        </h2>
        <p>
          Configure your exercise settings and challenge yourself. You can
          adjust the number of questions, sequence length, mutation range, types
          of generation and mutation, and even set a timer.
        </p>
      </div>

      <Card size="lg" className="space-y-6 bg-background-secondary">
        <h3 className="text-2xl font-semibold">Configure Exercise</h3>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col">
            Number of Questions
            <Input
              type="number"
              min={1}
              max={10}
              value={config.count}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  count: Number(e.target.value),
                }))
              }
            />
          </label>

          <label className="flex flex-col">
            Sequence Length
            <Input
              type="number"
              min={1}
              max={10}
              value={config.length}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  length: Number(e.target.value),
                }))
              }
            />
          </label>

          <label className="flex flex-col">
            Minimum Mutations
            <Input
              type="number"
              min={0}
              value={config.minMutation}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  minMutation: Number(e.target.value),
                }))
              }
            />
          </label>

          <label className="flex flex-col">
            Maximum Mutations
            <Input
              type="number"
              min={0}
              value={config.maxMutation}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  maxMutation: Number(e.target.value),
                }))
              }
            />
          </label>

          <div className="flex flex-col md:col-span-2">
            Generation Types
            <div className="flex flex-wrap gap-2 mt-1">
              {Object.values(GenerationType).map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <Checkbox
                    defaultChecked={config.generationTypes.includes(type)}
                    onChange={(checked) => {
                      setConfig((prev) => ({
                        ...prev,
                        generationTypes: checked
                          ? [...prev.generationTypes, type]
                          : prev.generationTypes.filter((t) => t !== type),
                      }));
                    }}
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:col-span-2">
            Mutation Types
            <div className="flex flex-wrap gap-2 mt-1">
              {Object.values(MutationType).map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <Checkbox
                    defaultChecked={config.mutationTypes.includes(type)}
                    onChange={(checked) => {
                      setConfig((prev) => ({
                        ...prev,
                        mutationTypes: checked
                          ? [...prev.mutationTypes, type]
                          : prev.mutationTypes.filter((t) => t !== type),
                      }));
                    }}
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <label className="flex flex-col">
            Timer (seconds)
            <Input
              type="number"
              min={10}
              max={10_000}
              value={config.timer}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  timer: Number(e.target.value),
                }))
              }
            />
          </label>
        </form>
      </Card>

      {/* Start Button */}
      <div className="flex justify-center">
        <Button variant="primary" size="lg" onClick={() => {}}>
          Start Exercise
        </Button>
      </div>
    </div>
  );
}
