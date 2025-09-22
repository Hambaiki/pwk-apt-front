import {
  HeaderCard,
  HeaderCardTitle,
  HeaderCardDescription,
} from "@/components/content/HeaderCard";
import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";
import MainSection from "@/components/content/MainSection";
import GridMemoryExercise from "@/components/exercise/grid-memory/GridMemoryExercise";

import {
  defaultConfig,
  letterPool,
  numberPool,
  symbolPool,
} from "@/constants/exercises/grid";

import { Config, GridItem, InputType } from "@/types/exercises/grid";

import React from "react";

interface GridMemoryExercisePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const GridMemoryExercisePage = ({
  searchParams,
}: GridMemoryExercisePageProps) => {
  const parseConfig = (param: string | string[] | undefined) => {
    if (!param) return defaultConfig;
    try {
      return JSON.parse(param as string) as Config;
    } catch {
      return defaultConfig;
    }
  };

  const config: Config = parseConfig(searchParams.config);

  const generateGrid = (config: Config) => {
    const items: GridItem[] = [];

    // Add letters
    const selectedLetters = letterPool.slice(0, config.letterVariations);
    for (let i = 0; i < config.letterCount; i++) {
      items.push({
        type: InputType.LETTER,
        value:
          selectedLetters[Math.floor(Math.random() * selectedLetters.length)],
      });
    }

    // Add symbols
    const selectedSymbols = symbolPool.slice(0, config.symbolVariations);
    for (let i = 0; i < config.symbolCount; i++) {
      items.push({
        type: InputType.SYMBOL,
        value:
          selectedSymbols[Math.floor(Math.random() * selectedSymbols.length)],
      });
    }

    // Add numbers
    const selectedNumbers = numberPool.slice(0, config.numberVariations);
    for (let i = 0; i < config.numberCount; i++) {
      items.push({
        type: InputType.NUMBER,
        value:
          selectedNumbers[Math.floor(Math.random() * selectedNumbers.length)],
      });
    }

    // Fill remaining cells with empties first
    const totalCells = 25;
    while (items.length < totalCells) {
      items.push({ type: InputType.EMPTY, value: "" });
    }

    // Shuffle everything together
    const shuffled = [...items].sort(() => Math.random() - 0.5);

    // Build grid
    const newGrid: GridItem[][] = [];
    for (let i = 0; i < 5; i++) {
      newGrid.push(shuffled.slice(i * 5, i * 5 + 5));
    }

    return newGrid;
  };

  const grid: GridItem[][] = generateGrid(config);

  return (
    <MainSection>
      <Breadcrumb>
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Exercises" href="/exercises" />
        <BreadcrumbItem label="Grid Memory" href="/exercises/grid-memory" />
        <BreadcrumbItem
          label="Questions"
          href="/exercises/grid-memory/questions"
        />
      </Breadcrumb>

      <HeaderCard>
        <HeaderCardTitle>Grid Memory - Questions</HeaderCardTitle>
        <HeaderCardDescription>
          Memorize the grid and fill in as many correct items as you can.
        </HeaderCardDescription>
      </HeaderCard>

      <GridMemoryExercise config={config} grid={grid} />
    </MainSection>
  );
};

export default GridMemoryExercisePage;
