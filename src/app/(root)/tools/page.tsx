import {
  HeaderCard,
  HeaderCardDescription,
  HeaderCardTitle,
} from "@/components/content/HeaderCard";
import MainSection from "@/components/content/MainSection";
import ToolCard from "@/components/tool/ToolCard";
import { tools } from "@/constants/tools";

export default function ToolsPage() {
  return (
    <MainSection>
      <HeaderCard>
        <HeaderCardTitle className="mb-2">Tools</HeaderCardTitle>
        <HeaderCardDescription>
          Collection of tools to assist you in your learning journey.
        </HeaderCardDescription>
      </HeaderCard>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, index) => (
          <ToolCard key={index} tool={tool} />
        ))}
      </div>
    </MainSection>
  );
}
