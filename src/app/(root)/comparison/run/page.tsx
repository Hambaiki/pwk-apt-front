"use client";

import ExerciseRunLayout from "@/components/exercise/ExerciseRunLayout";
import ComparisonExercise from "@/features/comparison/components/ComparisonExercise";
import { ComparisonItem } from "@/features/comparison/types";
import { generateComparisonExercise } from "@/features/comparison/utils/generator";
import { useExerciseConfigStore } from "@/store/exerciseConfig";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const ComparisonExerciseQuestionPage = () => {
  const router = useRouter();
  const { config, instanceId } = useExerciseConfigStore((s) => s.comparison);

  useEffect(() => {
    if (instanceId === 0) {
      router.replace("/comparison");
    }
  }, []);

  const items = useMemo(() => {
    if (instanceId === 0) return [] as ComparisonItem[];
    return generateComparisonExercise(config);
  }, [instanceId]);

  if (instanceId === 0) return null;

  return (
    <ExerciseRunLayout
      title="Comparison - Run"
      description="Compare each pair and choose the most accurate answer."
      setupHref="/comparison"
    >
      <ComparisonExercise key={instanceId} items={items} config={config} />
    </ExerciseRunLayout>
  );
};

export default ComparisonExerciseQuestionPage;
