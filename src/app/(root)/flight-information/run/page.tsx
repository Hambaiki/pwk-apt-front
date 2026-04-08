"use client";

import ExerciseRunLayout from "@/components/exercise/ExerciseRunLayout";
import FlightInformationExercise from "@/features/flight-information/components/FlightInformationExercise";
import { useExerciseConfigStore } from "@/store/exerciseConfig";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const FlightInformationRunPage = () => {
  const router = useRouter();
  const { config, instanceId } = useExerciseConfigStore(
    (s) => s.flightInformation,
  );

  useEffect(() => {
    if (instanceId === 0) {
      router.replace("/flight-information");
    }
  }, [instanceId, router]);

  if (instanceId === 0) return null;

  return (
    <ExerciseRunLayout
      title="Flight Information Memory - Run"
      description="Read each passage and answer from recall before finishing the session."
      setupHref="/flight-information"
    >
      <FlightInformationExercise key={instanceId} initialConfig={config} />
    </ExerciseRunLayout>
  );
};

export default FlightInformationRunPage;
