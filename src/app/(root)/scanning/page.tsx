"use client";

import MainSection from "@/components/content/MainSection";
import { PageHeader } from "@/components/content/PageHeader";
import {
  SectionCard,
  SectionCardBody,
  SectionCardHeader,
} from "@/components/content/SectionCard";
import ExerciseMainActions from "@/components/exercise/ExerciseMainActions";
import ExerciseSetupSummaryCard from "@/components/exercise/ExerciseSetupSummaryCard";
import { Modal, ModalBody, ModalHeader } from "@/components/ui";
import ConfigurerForm from "@/features/scanning/components/ConfigurerForm";
import { Config, QuestionFormat } from "@/features/scanning/types";
import { useExerciseConfigStore } from "@/store/exerciseConfig";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ScanningExercisePage = () => {
  const router = useRouter();
  const { scanning, startScanning } = useExerciseConfigStore();

  const [savedConfig, setSavedConfig] = useState<Config>(scanning.config);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const handleStart = () => {
    startScanning(savedConfig);
    router.push("/scanning/run");
  };

  const openConfig = () => setIsConfigOpen(true);

  const scrollToHowTo = () => {
    document.getElementById("scanning-how-to")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <MainSection>
      <section className="space-y-10">
        <PageHeader
          title="Scanning Exercise"
          description="Quickly identify letters within various shapes and numbers"
          actions={
            <ExerciseMainActions
              onOpenHowTo={scrollToHowTo}
              onOpenSettings={openConfig}
            />
          }
        />

        <div className="space-y-4">
          <SectionCard className="bg-surface">
            <SectionCardHeader
              title="Session Setup"
              description="Configure and launch your scanning session."
            />
            <SectionCardBody className="space-y-4">
              <p>
                This exercise is designed to enhance your visual scanning and
                attention to detail. Start immediately with recommended
                defaults, then use the modals only if you want detailed
                instructions or custom settings.
              </p>

              <ExerciseSetupSummaryCard
                title="Saved Exercise Configuration"
                items={[
                  {
                    label: "Items / Questions",
                    value: `${savedConfig.itemCount} / ${savedConfig.questionCount}`,
                  },
                  {
                    label: "Time Limit",
                    value: `${savedConfig.timeLimit}s`,
                  },
                  {
                    label: "Format",
                    value:
                      savedConfig.questionFormat ===
                      QuestionFormat.PerQuestionGrid
                        ? "Per-question grid"
                        : "Shared grid",
                  },
                  {
                    label: "Color Mode",
                    value: savedConfig.isMonotoneMode ? "Monotone" : "Color",
                  },
                ]}
                onStart={handleStart}
                onOpenSettings={openConfig}
              />
            </SectionCardBody>
          </SectionCard>

          <SectionCard id="scanning-how-to" className="bg-surface">
            <SectionCardHeader
              title="How to Play"
              description="Identify and answer each target accurately before time runs out."
            />
            <SectionCardBody>
              <ol className="list-decimal list-inside space-y-2">
                <li>Answer by identifying the letter in each shape/number.</li>
                <li>Submit early or when time runs out to see results.</li>
                <li>Use monotone mode for color vision considerations.</li>
              </ol>
            </SectionCardBody>
          </SectionCard>
        </div>
      </section>

      <Modal
        open={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        className="max-w-5xl"
        scrollable
      >
        <ModalHeader
          title="Scanning Custom Setup"
          description="Adjust item count, question count, time limit, color mode, and shape set."
          onClose={() => setIsConfigOpen(false)}
        />
        <ModalBody>
          <ConfigurerForm
            key={JSON.stringify(savedConfig)}
            initialConfig={savedConfig}
            submitLabel="Save Configuration"
            onSubmit={(config) => {
              setSavedConfig(config);
              setIsConfigOpen(false);
            }}
          />
        </ModalBody>
      </Modal>
    </MainSection>
  );
};

export default ScanningExercisePage;
