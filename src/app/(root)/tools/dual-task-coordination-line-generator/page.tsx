import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";
import {
  HeaderCard,
  HeaderCardDescription,
  HeaderCardTitle,
} from "@/components/content/HeaderCard";
import { Card } from "@/components/ui";
import MainSection from "@/components/content/MainSection";
import HowToCard from "@/components/exercise/dual-task-coordination/HowToCard";
import NodeLines from "@/components/exercise/dual-task-coordination/NodeLines";

import { Cog, Info } from "lucide-react";

const DualTaskCoordinationPage = () => {
  return (
    <MainSection>
      <Breadcrumb>
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Tools" href="/tools" />
        <BreadcrumbItem
          label="Dual Task Coordination"
          href="/tools/dual-task-coordination-line-generator"
        />
      </Breadcrumb>

      <HeaderCard>
        <HeaderCardTitle>Dual Task Coordination Line Generator</HeaderCardTitle>
        <HeaderCardDescription>
          Generate custom dual task coordination lines for practice and
          training.
        </HeaderCardDescription>
      </HeaderCard>

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
          <li>Click &quot;Generate Lines&quot; to create a new set of lines.</li>
          <li>Use the SVG output for your dual task coordination exercises.</li>
          <li>
            Reset to default settings anytime using the &quot;Reset Configuration&quot;
            button.
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

// export const metadata = {
//   title: "Dual Task Coordination | APT-PWK",
//   description:
//     "Test your ability to manage and perform two tasks simultaneously.",
//   keywords: ["dual-task", "pwk-apt", "aptitude", "exercises"],
// };

export default DualTaskCoordinationPage;
