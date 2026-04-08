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
import ConfigurerForm from "@/features/sequence-memory/components/ConfigurerForm";
import { Config } from "@/features/sequence-memory/types";
import { useExerciseConfigStore } from "@/store/exerciseConfig";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SequenceMemoryContent = () => {
  const router = useRouter();
  const { sequenceMemory, startSequenceMemory } = useExerciseConfigStore();

  const [savedConfig, setSavedConfig] = useState<Config>(sequenceMemory.config);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const handleStart = () => {
    startSequenceMemory(savedConfig);
    router.push("/sequence-memory/run");
  };

  const openConfig = () => setIsConfigOpen(true);

  const scrollToHowTo = () => {
    document.getElementById("sequence-how-to")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <MainSection>
      <section className="space-y-10">
        <PageHeader
          title="Sequence Memory"
          description="Test your ability to remember and recall sequences of colors."
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
              description="Configure and launch your sequence memory session."
            />
            <SectionCardBody className="space-y-4">
              <p>
                Watch and remember color sequences, then replay them. Start
                quickly with recommended settings or customize the difficulty
                and number of questions.
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

          <SectionCard id="sequence-how-to" className="bg-surface">
            <SectionCardHeader
              title="How to Play"
              description="Replay each sequence in the same order shown."
            />
            <SectionCardBody>
              <ol className="list-decimal list-inside space-y-2">
                <li>Watch as a sequence of colors is displayed.</li>
                <li>
                  After the sequence completes, click the colors in the same
                  order.
                </li>
                <li>Repeat for each question until the exercise ends.</li>
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
          title="Sequence Memory Custom Setup"
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
