"use client";

import ExerciseRunLayout from "@/components/exercise/ExerciseRunLayout";
import ReadBackMemoryExercise from "@/features/read-back-memory/ReadBackMemoryExercise";
import { useExerciseConfigStore } from "@/store/exerciseConfig";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ReadBackMemoryRunPage = () => {
  const router = useRouter();
  const { config, instanceId } = useExerciseConfigStore(
    (s) => s.readBackMemory,
  );

  useEffect(() => {
    if (instanceId === 0) {
      router.replace("/read-back-memory");
    }
  }, [instanceId, router]);

  if (instanceId === 0) return null;

  return (
    <ExerciseRunLayout
      title="Read Back Memory - Run"
      description="Recall each sequence in the requested order."
      setupHref="/read-back-memory"
    >
      <ReadBackMemoryExercise key={instanceId} initialConfig={config} />
    </ExerciseRunLayout>
  );
};

export default ReadBackMemoryRunPage;
