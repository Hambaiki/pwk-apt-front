import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";
import MainSection from "@/components/content/MainSection";

import { Config, ShapeGridItem } from "@/types/exercises/scanning";

import { colors, defaultConfig, shapes } from "@/constants/exercises/scanning";
import ScanningExerciseCard from "@/components/exercise/scanning/ScanningExerciseCard";

interface ScanningExerciseQuestionPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ScanningExerciseQuestionPage = ({
  searchParams,
}: ScanningExerciseQuestionPageProps) => {
  const config = searchParams.config
    ? (JSON.parse(searchParams.config as string) as Config)
    : defaultConfig;

  const generateItemsWithGrid = () => {
    const newItems = [];
    const usedCombinations = new Set();

    // Calculate grid dimensions
    const itemCount = config.itemCount;
    const gridCols = Math.ceil(Math.sqrt(itemCount));
    const gridRows = Math.ceil(itemCount / gridCols);

    // Calculate cell dimensions (leaving some padding)
    const cellWidth = 80 / gridCols;
    const cellHeight = 80 / gridRows;
    const padding = 3; // Padding within each cell

    // Generate positions
    const positions = [];
    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        if (positions.length >= itemCount) break;

        // Calculate cell bounds
        const cellLeft = 10 + col * cellWidth;
        const cellTop = 10 + row * cellHeight;

        // Random position within cell bounds
        const x =
          cellLeft + padding + Math.random() * (cellWidth - 2 * padding);
        const y =
          cellTop + padding + Math.random() * (cellHeight - 2 * padding);

        positions.push({
          x: Math.max(5, Math.min(85, x)),
          y: Math.max(5, Math.min(85, y)),
        });
      }
    }

    // Shuffle positions for randomness
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    // Generate items with pre-calculated positions
    for (let i = 0; i < itemCount && i < positions.length; i++) {
      let shape, number, letter, color, rotation;
      let combination;

      // Ensure unique combinations
      do {
        const shouldRotate = Math.random() < 0.5;

        shape = shapes[Math.floor(Math.random() * shapes.length)];
        number = Math.floor(Math.random() * 99) + 1;
        letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        color = colors[Math.floor(Math.random() * colors.length)];
        rotation = shouldRotate ? Math.floor(Math.random() * 46) : 0;
        combination = `${shape.name}-${number}-${letter}`;
      } while (usedCombinations.has(combination));

      usedCombinations.add(combination);

      const minSize = 60; // px
      const maxSize = 100; // px
      const size =
        Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;

      newItems.push({
        id: i,
        shape,
        number,
        letter,
        color,
        size,
        x: positions[i].x,
        y: positions[i].y,
        rotation,
      });
    }

    return newItems;
  };

  const generateQuestions = (itemList: ShapeGridItem[]) => {
    const selectedItems: ShapeGridItem[] = [];
    const usedItems = new Set();

    // Select random items for questions
    while (selectedItems.length < config.questionCount) {
      const randomIndex = Math.floor(Math.random() * itemList.length);
      if (!usedItems.has(randomIndex)) {
        usedItems.add(randomIndex);
        selectedItems.push(itemList[randomIndex]);
      }
    }

    return selectedItems;
  };

  const items: ShapeGridItem[] = generateItemsWithGrid();
  const questions: ShapeGridItem[] = generateQuestions(items);

  return (
    <MainSection className="gap-6">
      <Breadcrumb>
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Exercises" href="/exercises" />
        <BreadcrumbItem label="Scanning" href="/exercises/scanning" />
      </Breadcrumb>

      <ScanningExerciseCard
        items={items}
        questions={questions}
        config={config}
      />
    </MainSection>
  );
};

export default ScanningExerciseQuestionPage;
