"use client";

import ExerciseRunLayout from "@/components/exercise/ExerciseRunLayout";
import GridMemoryExercise from "@/features/grid-memory/components/GridMemoryExercise";
import {
  defaultConfig,
  letterPool,
  numberPool,
  symbolPool,
} from "@/features/grid-memory/constants";
import { Config, GridItem, InputType } from "@/features/grid-memory/types";
import { useExerciseConfigStore } from "@/store/exerciseConfig";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const sanitizeConfig = (raw: Config): Config => {
  const clamp = (value: number, min: number, max: number, fallback: number) =>
    Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;

  const letterCount = clamp(raw.letterCount, 0, 25, defaultConfig.letterCount);
  const symbolCount = clamp(raw.symbolCount, 0, 25, defaultConfig.symbolCount);
  const numberCount = clamp(raw.numberCount, 0, 25, defaultConfig.numberCount);

  let totalCount = letterCount + symbolCount + numberCount;
  let adjustedLetterCount = letterCount;
  let adjustedSymbolCount = symbolCount;
  let adjustedNumberCount = numberCount;

  while (totalCount > 25) {
    if (adjustedNumberCount > 0) {
      adjustedNumberCount -= 1;
    } else if (adjustedSymbolCount > 0) {
      adjustedSymbolCount -= 1;
    } else if (adjustedLetterCount > 0) {
      adjustedLetterCount -= 1;
    }
    totalCount =
      adjustedLetterCount + adjustedSymbolCount + adjustedNumberCount;
  }

  return {
    ...raw,
    memoryTime: clamp(raw.memoryTime, 10, 600, defaultConfig.memoryTime),
    timeLimit: clamp(raw.timeLimit, 30, 1200, defaultConfig.timeLimit),
    letterCount: adjustedLetterCount,
    symbolCount: adjustedSymbolCount,
    numberCount: adjustedNumberCount,
    letterVariations: clamp(
      raw.letterVariations,
      1,
      letterPool.length,
      defaultConfig.letterVariations,
    ),
    symbolVariations: clamp(
      raw.symbolVariations,
      1,
      symbolPool.length,
      defaultConfig.symbolVariations,
    ),
    numberVariations: clamp(
      raw.numberVariations,
      1,
      numberPool.length,
      defaultConfig.numberVariations,
    ),
  };
};

const generateGrid = (config: Config): GridItem[][] => {
  const items: GridItem[] = [];

  const selectedLetters = letterPool.slice(0, config.letterVariations);
  for (let i = 0; i < config.letterCount; i++) {
    items.push({
      type: InputType.LETTER,
      value:
        selectedLetters[Math.floor(Math.random() * selectedLetters.length)],
    });
  }

  const selectedSymbols = symbolPool.slice(0, config.symbolVariations);
  for (let i = 0; i < config.symbolCount; i++) {
    items.push({
      type: InputType.SYMBOL,
      value:
        selectedSymbols[Math.floor(Math.random() * selectedSymbols.length)],
    });
  }

  const selectedNumbers = numberPool.slice(0, config.numberVariations);
  for (let i = 0; i < config.numberCount; i++) {
    items.push({
      type: InputType.NUMBER,
      value:
        selectedNumbers[Math.floor(Math.random() * selectedNumbers.length)],
    });
  }

  const totalCells = 25;
  while (items.length < totalCells) {
    items.push({ type: InputType.EMPTY, value: "" });
  }

  const shuffled = [...items].sort(() => Math.random() - 0.5);

  const newGrid: GridItem[][] = [];
  for (let i = 0; i < 5; i++) {
    newGrid.push(shuffled.slice(i * 5, i * 5 + 5));
  }

  return newGrid;
};

const GridMemoryExercisePage = () => {
  const router = useRouter();
  const { config, instanceId } = useExerciseConfigStore((s) => s.gridMemory);

  useEffect(() => {
    if (instanceId === 0) {
      router.replace("/grid-memory");
    }
  }, []);

  const { sanitizedConfig, grid } = useMemo(() => {
    if (instanceId === 0)
      return { sanitizedConfig: defaultConfig, grid: [] as GridItem[][] };
    const sanitized = sanitizeConfig(config);
    return { sanitizedConfig: sanitized, grid: generateGrid(sanitized) };
  }, [instanceId]);

  if (instanceId === 0) return null;

  return (
    <ExerciseRunLayout
      title="Grid Memory - Run"
      description="Memorize the grid, then reproduce as many cells as possible."
      setupHref="/grid-memory"
    >
      <GridMemoryExercise
        key={instanceId}
        config={sanitizedConfig}
        grid={grid}
      />
    </ExerciseRunLayout>
  );
};

export default GridMemoryExercisePage;
