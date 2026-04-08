"use client";

import ExerciseRunLayout from "@/components/exercise/ExerciseRunLayout";
import DualTaskCoordinationExercise from "@/features/dual-task-coordination/components/DualTaskCoordinationExercise";
import { useExerciseConfigStore } from "@/store/exerciseConfig";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DualTaskCoordinationPage = () => {
  const router = useRouter();
  const { config, instanceId } = useExerciseConfigStore((s) => s.dualTask);

  useEffect(() => {
    if (instanceId === 0) {
      router.replace("/dual-task-coordination");
    }
  }, []);

  if (instanceId === 0) return null;

  return (
    <ExerciseRunLayout
      title="Dual Task Coordination - Run"
      description="Track movement and responses simultaneously under time pressure."
      setupHref="/dual-task-coordination"
    >
      <DualTaskCoordinationExercise key={instanceId} config={config} />
    </ExerciseRunLayout>
  );
};

export default DualTaskCoordinationPage;
