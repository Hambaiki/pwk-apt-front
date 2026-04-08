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
import ConfigurerForm from "@/features/grid-memory/components/ConfigurerForm";
import { Config } from "@/features/grid-memory/types";
import { useExerciseConfigStore } from "@/store/exerciseConfig";
import { useRouter } from "next/navigation";
import { useState } from "react";

const GridMemoryPage = () => {
  const router = useRouter();
  const { gridMemory, startGridMemory } = useExerciseConfigStore();

  const [savedConfig, setSavedConfig] = useState<Config>(gridMemory.config);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const handleStart = () => {
    startGridMemory(savedConfig);
    router.push("/grid-memory/run");
  };

  const openConfig = () => setIsConfigOpen(true);

  const scrollToHowTo = () => {
    document.getElementById("grid-memory-how-to")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <MainSection>
      <section className="space-y-10">
        <PageHeader
          title="Grid Memory"
          description="Enhance your visual scanning and attention to detail with this engaging exercise."
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
              description="Configure and launch your grid memory session."
            />
            <SectionCardBody className="space-y-4">
              <p>
                This exercise challenges your short-term memory and visual
                scanning skills. Start quickly with recommended settings, then
                open modals only when you want full instructions or custom
                parameters.
              </p>

              <ExerciseSetupSummaryCard
                title="Saved Exercise Configuration"
                items={[
                  {
                    label: "Memory / Input Time",
                    value: `${savedConfig.memoryTime}s / ${savedConfig.timeLimit}s`,
                  },
                  {
                    label: "Cell Distribution",
                    value: `L ${savedConfig.letterCount}, S ${savedConfig.symbolCount}, N ${savedConfig.numberCount}`,
                  },
                  {
                    label: "Variations",
                    value: `L ${savedConfig.letterVariations}, S ${savedConfig.symbolVariations}, N ${savedConfig.numberVariations}`,
                  },
                ]}
                onStart={handleStart}
                onOpenSettings={openConfig}
              />
            </SectionCardBody>
          </SectionCard>

          <SectionCard id="grid-memory-how-to" className="bg-surface">
            <SectionCardHeader
              title="How to Play"
              description="Memorize, recall, and input each cell accurately."
            />
            <SectionCardBody>
              <ol className="list-decimal list-inside space-y-2">
                <li>Memorize the grid during the memory phase.</li>
                <li>Recall the characters after the memory phase.</li>
                <li>Input the characters in their correct positions.</li>
                <li>Submit before time runs out and review your results.</li>
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
          title="Grid Memory Custom Setup"
          description="Configure timing and content distribution across letters, symbols, and numbers."
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

export default GridMemoryPage;
