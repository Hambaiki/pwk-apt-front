"use client";

import ExerciseRunLayout from "@/components/exercise/ExerciseRunLayout";
import ScanningExercise from "@/features/scanning/components/ScanningExercise";
import { colors, defaultConfig } from "@/features/scanning/constants";
import {
  Config,
  QuestionFormat,
  ScanningQuestionSet,
  ShapeGridItem,
} from "@/features/scanning/types";
import { useExerciseConfigStore } from "@/store/exerciseConfig";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const sanitizeConfig = (raw: Config): Config => {
  const itemCount = Math.max(1, raw.itemCount || defaultConfig.itemCount);
  const questionCount = Math.max(
    1,
    Math.min(raw.questionCount || defaultConfig.questionCount, itemCount),
  );
  const timeLimit = Math.max(10, raw.timeLimit || defaultConfig.timeLimit);

  return {
    ...raw,
    itemCount,
    questionCount,
    timeLimit,
    questionFormat: raw.questionFormat ?? defaultConfig.questionFormat,
    shapes: raw.shapes?.length ? raw.shapes : defaultConfig.shapes,
  };
};

const generateItemsWithGrid = (config: Config): ShapeGridItem[] => {
  const newItems: ShapeGridItem[] = [];
  const usedCombinations = new Set<string>();
  const selectableShapes =
    config.shapes.length > 0 ? config.shapes : defaultConfig.shapes;
  const maxUniqueCombinations = selectableShapes.length * 99;

  const itemCount = config.itemCount;
  const gridCols = Math.ceil(Math.sqrt(itemCount));
  const gridRows = Math.ceil(itemCount / gridCols);

  const cellWidth = 80 / gridCols;
  const cellHeight = 80 / gridRows;
  const padding = 3;

  const positions: { x: number; y: number }[] = [];
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      if (positions.length >= itemCount) break;

      const cellLeft = 10 + col * cellWidth;
      const cellTop = 10 + row * cellHeight;

      const x = cellLeft + padding + Math.random() * (cellWidth - 2 * padding);
      const y = cellTop + padding + Math.random() * (cellHeight - 2 * padding);

      positions.push({
        x: Math.max(5, Math.min(85, x)),
        y: Math.max(5, Math.min(85, y)),
      });
    }
  }

  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  for (let i = 0; i < itemCount && i < positions.length; i++) {
    let shape, number, letter, color, rotation;
    let combination: string;
    let attempts = 0;

    do {
      const shouldRotate = Math.random() < 0.5;
      shape =
        selectableShapes[Math.floor(Math.random() * selectableShapes.length)];
      number = Math.floor(Math.random() * 99) + 1;
      letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      color = colors[Math.floor(Math.random() * colors.length)];
      rotation = shouldRotate ? Math.floor(Math.random() * 46) : 0;
      combination = `${shape.name}-${number}`;
      attempts += 1;
    } while (
      usedCombinations.has(combination!) &&
      attempts < maxUniqueCombinations
    );

    usedCombinations.add(combination!);

    const minSize = 60;
    const maxSize = 100;
    const size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;

    newItems.push({
      id: i,
      shape: shape!,
      number: number!,
      letter: letter!,
      color: color!,
      size,
      x: positions[i].x,
      y: positions[i].y,
      rotation: rotation!,
    });
  }

  return newItems;
};

const generateQuestions = (
  itemList: ShapeGridItem[],
  count: number,
): ShapeGridItem[] => {
  const selectedItems: ShapeGridItem[] = [];
  const usedItems = new Set<number>();
  const targetQuestionCount = Math.min(count, itemList.length);

  while (selectedItems.length < targetQuestionCount) {
    const randomIndex = Math.floor(Math.random() * itemList.length);
    if (!usedItems.has(randomIndex)) {
      usedItems.add(randomIndex);
      selectedItems.push(itemList[randomIndex]);
    }
  }

  return selectedItems;
};

const generateQuestionSets = (config: Config): ScanningQuestionSet[] => {
  if (config.questionFormat === QuestionFormat.PerQuestionGrid) {
    return Array.from({ length: config.questionCount }).map((_, index) => {
      const gridItems = generateItemsWithGrid(config);
      const question = generateQuestions(gridItems, 1)[0];
      return { id: index, items: gridItems, question };
    });
  }

  const sharedItems = generateItemsWithGrid(config);
  const sharedQuestions = generateQuestions(sharedItems, config.questionCount);

  return sharedQuestions.map((question, index) => ({
    id: index,
    items: sharedItems,
    question,
  }));
};

const ScanningExerciseQuestionPage = () => {
  const router = useRouter();
  const { config, instanceId } = useExerciseConfigStore((s) => s.scanning);

  useEffect(() => {
    if (instanceId === 0) {
      router.replace("/scanning");
    }
  }, []);

  const { sanitizedConfig, questionSets } = useMemo(() => {
    if (instanceId === 0)
      return { sanitizedConfig: defaultConfig, questionSets: [] };
    const sanitized = sanitizeConfig(config);
    return {
      sanitizedConfig: sanitized,
      questionSets: generateQuestionSets(sanitized),
    };
  }, [instanceId]);

  if (instanceId === 0) return null;

  return (
    <ExerciseRunLayout
      title="Scanning - Run"
      description="Answer each prompt before the timer ends."
      setupHref="/scanning"
    >
      <ScanningExercise
        key={instanceId}
        questionSets={questionSets}
        config={sanitizedConfig}
      />
    </ExerciseRunLayout>
  );
};

export default ScanningExerciseQuestionPage;
