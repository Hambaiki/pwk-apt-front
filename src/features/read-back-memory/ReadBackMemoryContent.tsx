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
import ConfigurerForm from "@/features/read-back-memory/components/ConfigurerForm";
import { Config } from "@/features/read-back-memory/types";
import { useExerciseConfigStore } from "@/store/exerciseConfig";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const ReadBackMemoryContent = () => {
  const router = useRouter();
  const { readBackMemory, startReadBackMemory } = useExerciseConfigStore();

  const [savedConfig, setSavedConfig] = useState<Config>(readBackMemory.config);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const handleStart = () => {
    startReadBackMemory(savedConfig);
    router.push("/read-back-memory/run");
  };

  const openConfig = () => setIsConfigOpen(true);

  const scrollToHowTo = () => {
    document.getElementById("read-back-how-to")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <MainSection>
      <section className="space-y-10">
        <PageHeader
          title="Read Back Memory"
          description="Test your ability to remember and repeat back a sequence of numbers and letters."
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
              description="Configure and launch your read back memory session."
            />
            <SectionCardBody className="space-y-4">
              <p>
                Hear sequences of numbers and letters, then type them back. You
                can repeat them in various orders: forward, backward, or sorted.
                Start quickly with recommended settings or customize the
                difficulty.
              </p>

              <ExerciseSetupSummaryCard
                title="Saved Exercise Configuration"
                items={[
                  {
                    label: "Questions",
                    value: String(savedConfig.questionCount),
                  },
                  {
                    label: "Sequence Length",
                    value: `${savedConfig.minLength} - ${savedConfig.maxLength}`,
                  },
                ]}
                onStart={handleStart}
                onOpenSettings={openConfig}
              />
            </SectionCardBody>
          </SectionCard>

          <SectionCard id="read-back-how-to" className="bg-surface">
            <SectionCardHeader
              title="How to Play"
              description="Listen carefully and answer in the requested order."
            />
            <SectionCardBody>
              <ol className="list-decimal list-inside space-y-2">
                <li>Listen as a sequence of numbers and letters is spoken.</li>
                <li>
                  Type the sequence in the order specified (forward, backward,
                  or sorted).
                </li>
                <li>Submit your answer and proceed to the next question.</li>
              </ol>
            </SectionCardBody>
          </SectionCard>
        </div>
      </section>

      <Modal
        open={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        className="max-w-2xl"
        scrollable
      >
        <ModalHeader
          title="Read Back Memory Custom Setup"
          description="Adjust the number of questions and sequence length difficulty."
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
