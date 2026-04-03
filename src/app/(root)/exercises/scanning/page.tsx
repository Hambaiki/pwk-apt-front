"use client";

import {
  HeaderCard,
  HeaderCardDescription,
  HeaderCardTitle,
} from "@/components/content/HeaderCard";
import MainSection from "@/components/content/MainSection";
import { Button, Card, Input } from "@/components/ui";
import ShapeItem from "@/features/scanning/components/ShapeItem";
import {
  defaultConfig,
  sampleShapes,
  shapes,
} from "@/features/scanning/constants";
import { Config } from "@/features/scanning/types";
import { generateSearchParams } from "@/libs/router";
import { Cog, Info, Play, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ScanningExercisePage = () => {
  const router = useRouter();

  // Configuration state
  const [config, setConfig] = useState<Config>(defaultConfig);

  const handleStart = () => {
    const uniqueKey = Math.random().toString(36).substring(2, 10);
    const searchParams = generateSearchParams({
      config: JSON.stringify({ ...config, key: uniqueKey }),
    });
    router.push(`/exercises/scanning/questions?${searchParams.toString()}`);
  };

  return (
    <MainSection>
      <section className="space-y-10">
        <HeaderCard>
          <HeaderCardTitle>Scanning Exercise</HeaderCardTitle>
          <HeaderCardDescription>
            Quickly identify letters within various shapes and numbers
          </HeaderCardDescription>
        </HeaderCard>

        <div className="space-y-4">
          <h2 className="mb-4 flex items-center gap-2">
            <Info size={32} />
            Introduction
          </h2>
          <p>
            This exercise is designed to enhance your visual scanning and
            attention to detail. You will be presented with a grid of shapes,
            each containing a number and a letter. Your task is to identify the
            correct letter associated with each shape.
          </p>
          <Card variant="info">
            <h3 className="text-lg font-semibold text-info-800 mb-3 flex items-center gap-2">
              How to Play
            </h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Answer by identifying the letter in each shape/number</li>
              <li>Submit early or when time runs out to see results</li>
              <li>Use monotone mode for color vision considerations</li>
              <li>Good luck!</li>
            </ol>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="flex items-center gap-2">
            <Cog size={32} />
            Exercise Configuration
          </h2>
          <p>
            Adjust the settings below to customize your exercise experience.
          </p>

          <Card variant="info" className="space-y-4">
            <h3 className="text-lg font-semibold text-info-800 mb-3 flex items-center gap-2">
              Exercise Summary
            </h3>

            <ul className="space-y-2 list-disc list-inside">
              <li>
                Total: <code>{config.itemCount}</code> items/
                <code>{config.questionCount}</code> questions
              </li>
              <li>
                Time limit: <code>{(config.timeLimit / 60).toFixed(1)}</code>{" "}
                minutes
              </li>
              <li>
                Shapes:{" "}
                <code>
                  {config.shapes.length > 0
                    ? config.shapes.map((shape) => shape.name).join(", ")
                    : "All Shapes"}
                </code>
              </li>
              <li>
                Color mode:{" "}
                <code>{config.isMonotoneMode ? "Monotone" : "Color"}</code>
              </li>
            </ul>

            <p>
              Preview the shapes and letters that will be used in the exercise.
            </p>

            <Card className="flex flex-wrap gap-1 bg-white">
              {sampleShapes
                .filter((question) => config.shapes.includes(question.shape))
                .map((question, index) => (
                  <ShapeItem
                    key={index}
                    shape={question.shape.name}
                    color={question.color}
                    number={question.number}
                    letter={question.letter}
                    isMonotoneMode={config.isMonotoneMode}
                  />
                ))}
            </Card>
          </Card>

          <Card className="space-y-4">
            <h3>Preferences</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex flex-col text-sm font-medium text-gray-700">
                  Number of Items
                  <Input
                    type="number"
                    value={config.itemCount}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        itemCount:
                          parseInt(e.target.value) < prev.questionCount
                            ? prev.questionCount
                            : parseInt(e.target.value) || 1,
                      }))
                    }
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Total number of items to display (must be greater than or
                  equal to maximum number of questions)
                </p>
              </div>

              <div>
                <label className="flex flex-col text-sm font-medium text-gray-700 mb-2">
                  Number of Questions
                  <Input
                    type="number"
                    value={config.questionCount}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        questionCount:
                          parseInt(e.target.value) > prev.itemCount
                            ? prev.itemCount
                            : parseInt(e.target.value) || 1,
                      }))
                    }
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Number of questions to answer during the exercise (must be
                  less than or equal to number of items)
                </p>
              </div>

              <div>
                <label className="flex flex-col text-sm font-medium text-gray-700 mb-2">
                  Time Limit (seconds)
                  <Input
                    type="number"
                    value={config.timeLimit}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        timeLimit: parseInt(e.target.value) || 10,
                      }))
                    }
                  />
                </label>
              </div>

              <label className="flex flex-col text-sm font-medium text-gray-700 mb-2">
                Monotone Mode
                <div className="flex items-center mt-2">
                  <Input
                    type="checkbox"
                    checked={config.isMonotoneMode}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        isMonotoneMode: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 mr-2"
                  />
                  Enable Monotone Mode
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enable monotone mode for a simplified color scheme
                </p>
              </label>

              <div className="flex flex-col text-sm font-medium text-gray-700 mb-2">
                Shapes to Include
                <div className="flex flex-wrap gap-3 mt-2">
                  {shapes.map((shape) => (
                    <label className="flex items-center" key={shape.name}>
                      <Input
                        type="checkbox"
                        defaultChecked={config.shapes.includes(shape)}
                        onChange={(e) => {
                          setConfig((prev) => ({
                            ...prev,
                            shapes: e.target.checked
                              ? [...prev.shapes, shape]
                              : prev.shapes.filter((s) => s !== shape),
                          }));
                        }}
                        className="w-4 h-4 mr-2"
                      />
                      {shape.name}
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Select which shapes to include in the exercise
                </p>
              </div>
            </div>

            <div className="flex gap-4 justify-end mb-4">
              <Button
                variant="outline"
                onClick={() => setConfig(defaultConfig)}
              >
                <RefreshCcw size={20} className="mr-2" />
                Reset Configuration
              </Button>
              <Button onClick={handleStart}>
                <Play size={20} className="mr-2" />
                Start Exercise ({(config.timeLimit / 60).toFixed(1)} minutes)
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </MainSection>
  );
};

export default ScanningExercisePage;
