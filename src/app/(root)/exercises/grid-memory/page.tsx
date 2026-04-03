"use client";

import {
  HeaderCard,
  HeaderCardDescription,
  HeaderCardTitle,
} from "@/components/content/HeaderCard";
import MainSection from "@/components/content/MainSection";
import { Button, Card, Input } from "@/components/ui";
import { generateSearchParams } from "@/libs/router";
import { Cog, Info, Play, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Config {
  memoryTime: number; // in seconds
  timeLimit: number; // in seconds
  letterCount: number;
  symbolCount: number;
  numberCount: number;
  letterVariations: number;
  symbolVariations: number;
  numberVariations: number;
}

const defaultConfig: Config = {
  memoryTime: 120, // 2 minutes in seconds
  timeLimit: 300, // 5 minutes in seconds
  letterCount: 8,
  symbolCount: 8,
  numberCount: 9,
  letterVariations: 6,
  symbolVariations: 10,
  numberVariations: 8,
};

const GridMemoryPage = () => {
  const router = useRouter();

  // Configuration state
  const [config, setConfig] = useState<Config>(defaultConfig);

  const handleStart = () => {
    const uniqueKey = Math.random().toString(36).substring(2, 10);
    const searchParams = generateSearchParams({
      config: JSON.stringify({ ...config, key: uniqueKey }),
    });
    router.push(`/exercises/grid-memory/questions?${searchParams.toString()}`);
  };

  return (
    <MainSection>
      <section className="space-y-10">
        <HeaderCard>
          <HeaderCardTitle>Grid Memory</HeaderCardTitle>
          <HeaderCardDescription>
            Enhance your visual scanning and attention to detail with this
            engaging exercise.
          </HeaderCardDescription>
        </HeaderCard>

        <div className="space-y-4">
          <h2 className="mb-4 flex items-center gap-2">
            <Info size={32} />
            Introduction
          </h2>
          <p>
            This exercise challenges your short-term memory and visual scanning
            skills. You will be presented with a grid containing letters,
            symbols, and numbers for a limited time. After the memory phase,
            you&apos;ll need to recall and input the characters you saw in their
            correct positions.
          </p>
          <Card variant="info">
            <h3 className="text-lg font-semibold text-info-800 mb-3 flex items-center gap-2">
              How to Play
            </h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Memorize the grid during the memory phase</li>
              <li>Recall the characters after the memory phase</li>
              <li>Input the characters in their correct positions</li>
              <li>Submit your answers before time runs out</li>
              <li>Review your performance and improve over time</li>
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
                Total cells:{" "}
                <code>
                  {config.letterCount + config.symbolCount + config.numberCount}{" "}
                  / 25
                </code>
              </li>
              <li>
                Time limit: <code>{(config.timeLimit / 60).toFixed(1)}</code>{" "}
                minutes
              </li>
            </ul>
          </Card>

          <Card className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3>Timing Settings</h3>
                <div>
                  <label className="mb-1">Memory Time (seconds)</label>
                  <Input
                    type="number"
                    value={config.memoryTime}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        memoryTime: parseInt(e.target.value) || 120,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="mb-1">Input Time (seconds)</label>
                  <Input
                    type="number"
                    value={config.timeLimit}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        timeLimit: parseInt(e.target.value) || 300,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3>Content Distribution</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1">Letters Count</label>
                    <Input
                      type="number"
                      max="25"
                      value={config.letterCount}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          letterCount: Math.min(
                            25,
                            parseInt(e.target.value) || 0,
                          ),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1">Letter Variations</label>
                    <Input
                      type="number"
                      max="20"
                      value={config.letterVariations}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          letterVariations: Math.min(
                            20,
                            parseInt(e.target.value) || 0,
                          ),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1">Symbols Count</label>
                    <Input
                      type="number"
                      max="25"
                      value={config.symbolCount}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          symbolCount: Math.min(
                            25,
                            parseInt(e.target.value) || 0,
                          ),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1">Symbol Variations</label>
                    <Input
                      type="number"
                      max="21"
                      value={config.symbolVariations}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          symbolVariations: Math.min(
                            21,
                            parseInt(e.target.value) || 0,
                          ),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1">Numbers Count</label>
                    <Input
                      type="number"
                      max="25"
                      value={config.numberCount}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          numberCount: Math.min(
                            25,
                            parseInt(e.target.value) || 0,
                          ),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1">Number Variations</label>
                    <Input
                      type="number"
                      max="20"
                      value={config.numberVariations}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          numberVariations: Math.min(
                            20,
                            parseInt(e.target.value) || 0,
                          ),
                        })
                      }
                    />
                  </div>
                </div>
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
              <Button
                onClick={handleStart}
                disabled={
                  config.letterCount + config.symbolCount + config.numberCount >
                  25
                }
              >
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

export default GridMemoryPage;
