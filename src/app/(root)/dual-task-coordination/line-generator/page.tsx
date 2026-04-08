import MainSection from "@/components/content/MainSection";
import { PageHeader } from "@/components/content/PageHeader";
import { Card } from "@/components/ui";
import NodeLines from "@/features/dual-task-coordination/components/NodeLines";

import { Cog, Info } from "lucide-react";

const DualTaskCoordinationPage = () => {
  return (
    <MainSection>
      <PageHeader
        title="Dual Task Coordination Line Generator"
        description="Generate custom dual task coordination lines for practice and training."
        backHref="/dual-task-coordination"
        backLabel="Back to Dual Task Coordination"
      />

      <div className="space-y-4">
        <h2 className="mb-4 flex items-center gap-2">
          <Info className="w-8 h-8" />
          Introduction
        </h2>
        <p>
          This tool allows you to create personalized dual task coordination
          lines. Customize the parameters to generate lines that suit your
          training needs.
        </p>
      </div>

      <Card variant="info" className="space-y-4">
        <ol className="list-disc list-inside space-y-2">
          <li>Adjust the configuration settings to your preference.</li>
          <li>
            Click &quot;Generate Lines&quot; to create a new set of lines.
          </li>
          <li>Use the SVG output for your dual task coordination exercises.</li>
          <li>
            Reset to default settings anytime using the &quot;Reset
            Configuration&quot; button.
          </li>
        </ol>
      </Card>

      <div className="space-y-4">
        <h2 className="flex items-center gap-2">
          <Cog size={32} />
          Configuration
        </h2>
        <p>Adjust the settings below for the line generator.</p>

        <NodeLines />
      </div>
    </MainSection>
  );
};

export const metadata = {
  title: "Dual Task Coordination Line Generator | APT-PWK",
  description:
    "Generate custom dual task coordination lines for practice and training.",
  keywords: [
    "dual-task",
    "pwk-apt",
    "aptitude",
    "coordination",
    "line-generator",
  ],
};

export default DualTaskCoordinationPage;
