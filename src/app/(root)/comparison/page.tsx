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
import ConfigurerForm from "@/features/comparison/components/ConfigurerForm";
import HowToCard from "@/features/comparison/components/HowToCard";
import { defaultConfig } from "@/features/comparison/constants";
import { Config } from "@/features/comparison/types";
import { useExerciseConfigStore } from "@/store/exerciseConfig";
import { Printer } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ComparisonExerciseMainPage() {
  const router = useRouter();
  const { startComparison } = useExerciseConfigStore();
  const [savedConfig, setSavedConfig] = useState<Config>(defaultConfig);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  function handleStart() {
    startComparison(savedConfig);
    router.push("/comparison/run");
  }

  const scrollToHowTo = () => {
    document.getElementById("comparison-how-to")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <MainSection>
      <section className="space-y-10">
        <PageHeader
          title="Comparison Exercise"
          description="Compare two sequences and quickly identify whether they match or how many mutations they contain."
          actions={
            <ExerciseMainActions
              onOpenHowTo={scrollToHowTo}
              onOpenSettings={() => setIsConfigOpen(true)}
              extraActions={
                <Link href="/comparison/print">
                  <Button variant="outline">
                    <Printer size={16} className="mr-2" />
                    Printable Sheet
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
              description="Configure and launch your comparison practice session."
            />
            <SectionCardBody className="space-y-4">
              <p>
                This exercise improves pattern discrimination and detail
                checking. Start with one click using recommended settings, or
                open the optional modal for custom configuration.
              </p>

              <ExerciseSetupSummaryCard
                title="Saved Exercise Configuration"
                items={[
                  { label: "Questions", value: String(savedConfig.count) },
                  { label: "Length", value: String(savedConfig.length) },
                  {
                    label: "Mutations",
                    value: `${savedConfig.minMutation} - ${savedConfig.maxMutation}`,
                  },
                  { label: "Timer", value: `${savedConfig.timer}s` },
                ]}
                onStart={handleStart}
                onOpenSettings={() => setIsConfigOpen(true)}
              />
            </SectionCardBody>
          </SectionCard>

          <SectionCard id="comparison-how-to" className="bg-surface">
            <SectionCardHeader
              title="How to Play"
              description="Follow the comparison answer scale from A to F."
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
          title="Comparison Custom Setup"
          description="Adjust question count, sequence complexity, mutation rules, and timer."
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
}
