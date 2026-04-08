"use client";

import ExerciseRunLayout from "@/components/exercise/ExerciseRunLayout";
import SequenceMemoryExercise from "@/features/sequence-memory/components/SequenceMemoryExercise";
import { useExerciseConfigStore } from "@/store/exerciseConfig";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SequenceMemoryRunPage = () => {
  const router = useRouter();
  const { config, instanceId } = useExerciseConfigStore(
    (s) => s.sequenceMemory,
  );

  useEffect(() => {
    if (instanceId === 0) {
      router.replace("/sequence-memory");
    }
  }, [instanceId, router]);

  if (instanceId === 0) return null;

  return (
    <ExerciseRunLayout
      title="Sequence Memory - Run"
      description="Replay each color sequence as accurately as possible."
      setupHref="/sequence-memory"
    >
      <SequenceMemoryExercise key={instanceId} initialConfig={config} />
    </ExerciseRunLayout>
  );
};

export default SequenceMemoryRunPage;
