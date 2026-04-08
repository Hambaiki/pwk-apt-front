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
import ConfigurerForm from "@/features/flight-information/components/ConfigurerForm";
import { ExerciseConfig } from "@/features/flight-information/types";
import { useExerciseConfigStore } from "@/store/exerciseConfig";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const FlightInformationContent = () => {
  const router = useRouter();
  const { flightInformation, startFlightInformation } =
    useExerciseConfigStore();

  const [savedConfig, setSavedConfig] = useState<ExerciseConfig>(
    flightInformation.config,
  );
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const handleStart = () => {
    startFlightInformation(savedConfig);
    router.push("/flight-information/run");
  };

  const openConfig = () => setIsConfigOpen(true);

  const scrollToHowTo = () => {
    document.getElementById("flight-info-how-to")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <MainSection>
      <section className="space-y-10">
        <PageHeader
          title="Flight Information Memory"
          description="Practice understanding and mentally calculating key details from short flight briefings, including arrival times and flight durations."
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
              description="Configure and launch your flight information memory session."
            />
            <SectionCardBody className="space-y-4">
              <p>
                Read flight briefings and answer follow-up questions from
                memory. Use recommended setup for a quick start, or customize
                practice mode and passage count.
              </p>

              <ExerciseSetupSummaryCard
                title="Saved Exercise Configuration"
                items={[
                  {
                    label: "Passages",
                    value: String(savedConfig.questionCount),
                  },
                  { label: "Focus Mode", value: String(savedConfig.mode) },
                  {
                    label: "Timing",
                    value: savedConfig.timed
                      ? `${savedConfig.timePerPassageSec ?? 60}s per passage`
                      : "Untimed",
                  },
                  {
                    label: "Audio",
                    value: savedConfig.autoPlayAudio
                      ? "Auto-play enabled"
                      : "Manual play",
                  },
                ]}
                onStart={handleStart}
                onOpenSettings={openConfig}
              />
            </SectionCardBody>
          </SectionCard>

          <SectionCard id="flight-info-how-to" className="bg-surface">
            <SectionCardHeader
              title="How to Play"
              description="Read each passage once and answer from memory."
            />
            <SectionCardBody>
              <ol className="list-decimal list-inside space-y-2">
                <li>Read or play each flight passage once.</li>
                <li>Answer timing and flight-detail questions from memory.</li>
                <li>
                  Finish the run to see your graded summary on the end page.
                </li>
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
          title="Flight Information Custom Setup"
          description="Adjust passage count, focus mode, and optional advanced settings."
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
