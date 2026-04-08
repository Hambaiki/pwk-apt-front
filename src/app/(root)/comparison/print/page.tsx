"use client";

import MainSection from "@/components/content/MainSection";
import { PageHeader } from "@/components/content/PageHeader";
import {
  SectionCard,
  SectionCardBody,
  SectionCardHeader,
} from "@/components/content/SectionCard";
import { Button, Modal, ModalBody, ModalHeader } from "@/components/ui";
import ComparisonExerciseTable from "@/features/comparison/components/ComparisonExerciseTable";
import ConfigurerForm from "@/features/comparison/components/ConfigurerForm";
import { defaultConfig } from "@/features/comparison/constants";
import { ComparisonItem, Config } from "@/features/comparison/types";
import { generateComparisonExercise } from "@/features/comparison/utils/generator";
import { Download, PenSquare } from "lucide-react";
import { useState } from "react";

export default function ComparisonPrintablePage() {
  const [savedConfig, setSavedConfig] = useState<Config>(defaultConfig);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [items, setItems] = useState<ComparisonItem[]>(
    generateComparisonExercise(defaultConfig),
  );

  return (
    <MainSection>
      <section className="space-y-8">
        <PageHeader
          title="Comparison Printable"
          description="Generate a printable comparison sheet for practice outside run mode."
          backHref="/comparison"
          backLabel="Back to Comparison"
          actions={
            <Button variant="outline" onClick={() => setIsConfigOpen(true)}>
              <PenSquare size={16} className="mr-2" />
              Edit Sheet Configuration
            </Button>
          }
        />

        <SectionCard className="bg-surface">
          <SectionCardHeader
            title="Current Sheet Setup"
            description="Use Edit Sheet Configuration to regenerate the printable preview."
          />
          <SectionCardBody>
            <p className="text-sm text-neutral-600">
              Questions: {savedConfig.count}, Length: {savedConfig.length},
              Mutations: {savedConfig.minMutation}-{savedConfig.maxMutation},
              Timer: {savedConfig.timer}s
            </p>
          </SectionCardBody>
        </SectionCard>

        <SectionCard className="bg-surface">
          <SectionCardHeader
            title="Print Preview"
            description="Review before printing or downloading as PDF."
            headerRight={
              <Button
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("comparison-print-download"),
                  );
                }}
              >
                <Download size={16} className="mr-2" />
                Download PDF
              </Button>
            }
          />
          <SectionCardBody>
            <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white p-4">
              <ComparisonExerciseTable
                exercises={items}
                showDownloadButton={false}
              />
            </div>
          </SectionCardBody>
        </SectionCard>
      </section>

      <Modal
        open={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        className="max-w-4xl"
        scrollable
      >
        <ModalHeader
          title="Printable Sheet Configuration"
          description="Adjust configuration and regenerate preview."
          onClose={() => setIsConfigOpen(false)}
        />
        <ModalBody>
          <ConfigurerForm
            key={JSON.stringify(savedConfig)}
            initialConfig={savedConfig}
            submitLabel="Generate Printable"
            onSubmit={(config) => {
              setSavedConfig(config);
              setItems(generateComparisonExercise(config));
              setIsConfigOpen(false);
            }}
          />
        </ModalBody>
      </Modal>
    </MainSection>
  );
}
