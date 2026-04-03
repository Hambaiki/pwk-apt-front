import {
  HeaderCard,
  HeaderCardDescription,
  HeaderCardTitle,
} from "@/components/content/HeaderCard";
import MainSection from "@/components/content/MainSection";
import SequenceMemoryExercise from "@/features/sequence-memory/components/SequenceMemoryExercise";

const SequenceMemoryPage = () => {
  return (
    <MainSection>
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
