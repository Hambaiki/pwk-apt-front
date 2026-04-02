import {
  HeaderCard,
  HeaderCardDescription,
  HeaderCardTitle,
} from "@/components/content/HeaderCard";
import MainSection from "@/components/content/MainSection";
import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";
import SequenceMemoryExercise from "@/features/sequence-memory/components/SequenceMemoryExercise";

const SequenceMemoryPage = () => {
  return (
    <MainSection>
      <Breadcrumb>
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Exercise" href="/exercises" />
        <BreadcrumbItem
          label="Sequence Memory"
          href="/exercises/sequence-memory"
        />
      </Breadcrumb>

      <HeaderCard>
        <HeaderCardTitle>Sequence Memory</HeaderCardTitle>
        <HeaderCardDescription>
          Test your ability to remember and recall sequences of colors.
        </HeaderCardDescription>
      </HeaderCard>

      <SequenceMemoryExercise />
    </MainSection>
  );
};

export const metadata = {
  title: "Sequence Memory | APT-PWK",
  description: "Test your ability to remember and recall sequences of colors.",
  keywords: ["about", "pwk-apt", "aptitude", "exercises"],
};

export default SequenceMemoryPage;
