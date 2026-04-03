import {
  HeaderCard,
  HeaderCardDescription,
  HeaderCardTitle,
} from "@/components/content/HeaderCard";
import MainSection from "@/components/content/MainSection";
import ReadBackMemoryExercise from "@/features/read-back-memory/ReadBackMemoryExercise";

const ReadBackMemoryPage = () => {
  return (
    <MainSection>
      <HeaderCard>
        <HeaderCardTitle>Read Back Memory</HeaderCardTitle>
        <HeaderCardDescription>
          Test your ability to remember and repeat back a sequence of numbers
          and letters.
        </HeaderCardDescription>
      </HeaderCard>

      <ReadBackMemoryExercise />
    </MainSection>
  );
};

export const metadata = {
  title: "Read Back Memory | APT-PWK",
  description:
    "Test your ability to remember and repeat back a sequence of numbers and letters.",
  keywords: ["read-back", "pwk-apt", "aptitude", "exercises"],
};

export default ReadBackMemoryPage;
