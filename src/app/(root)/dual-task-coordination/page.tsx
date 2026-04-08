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
import { Button, Modal, ModalBody, ModalHeader } from "@/components/ui";
import ConfigurerForm from "@/features/dual-task-coordination/components/ConfigurerForm";
import HowToCard from "@/features/dual-task-coordination/components/HowToCard";
import { defaultConfig } from "@/features/dual-task-coordination/constants";
import { Config } from "@/features/dual-task-coordination/types";
import { useExerciseConfigStore } from "@/store/exerciseConfig";
import { LineSquiggle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DualTaskCoordinationPage = () => {
  const router = useRouter();
  const { startDualTask } = useExerciseConfigStore();
  const [savedConfig, setSavedConfig] = useState<Config>(defaultConfig);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  function handleStart() {
    startDualTask(savedConfig);
    router.push("/dual-task-coordination/run");
  }

  const scrollToHowTo = () => {
    document.getElementById("dual-task-how-to")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <MainSection>
      <section className="space-y-10">
        <PageHeader
          title="Dual Task Coordination"
          description="Test your ability to handle two streams of attention at once while maintaining rhythm, response speed, and control."
          actions={
            <ExerciseMainActions
              onOpenHowTo={scrollToHowTo}
              onOpenSettings={() => setIsConfigOpen(true)}
              extraActions={
                <Link href="/dual-task-coordination/line-generator">
                  <Button variant="outline">
                    <LineSquiggle size={16} className="mr-2" />
                    Open Line Generator
                  </Button>
                </Link>
              }
            />
          }
        />

        <div className="space-y-4">
          <SectionCard className="bg-surface">
            <SectionCardHeader
              title="Session Setup"
              description="Configure and launch your dual-task coordination session."
            />
            <SectionCardBody className="space-y-4">
              <p>
                This exercise trains divided attention. You will coordinate
                left-right movement while processing timed verbal or symbol
                prompts under pressure. Use quick start for immediate practice,
                then open modals for full instructions and custom setup only if
                needed.
              </p>

              <ExerciseSetupSummaryCard
                title="Saved Exercise Configuration"
                items={[
                  {
                    label: "Duration",
                    value: `${savedConfig.exerciseDuration}s`,
                  },
                  {
                    label: "Questions",
                    value: String(savedConfig.totalQuestions),
                  },
                  {
                    label: "Per Question",
                    value: `${savedConfig.questionTime}s`,
                  },
                  {
                    label: "Symbol Mode",
                    value: savedConfig.symbolMode ? "Enabled" : "Disabled",
                  },
                ]}
                onStart={handleStart}
                onOpenSettings={() => setIsConfigOpen(true)}
              />
            </SectionCardBody>
          </SectionCard>

          <SectionCard id="dual-task-how-to" className="bg-surface">
            <SectionCardHeader
              title="How to Play"
              description="Follow rhythm prompts while answering the secondary task."
            />
            <SectionCardBody>
              <HowToCard />
            </SectionCardBody>
          </SectionCard>
        </div>
      </section>

      <Modal
        open={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        className="max-w-4xl"
        scrollable
      >
        <ModalHeader
          title="Dual Task Custom Setup"
          description="Fine-tune duration, question limits, per-question time, and symbol mode."
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

// export const metadata = {
//   title: "Dual Task Coordination | APT-PWK",
//   description:
//     "Test your ability to manage and perform two tasks simultaneously.",
//   keywords: ["dual-task", "pwk-apt", "aptitude", "exercises"],
// };

export default DualTaskCoordinationPage;
