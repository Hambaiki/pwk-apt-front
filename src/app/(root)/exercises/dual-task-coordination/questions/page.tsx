import {
  HeaderCard,
  HeaderCardDescription,
  HeaderCardTitle,
} from "@/components/content/HeaderCard";
import MainSection from "@/components/content/MainSection";
import DualTaskCoordinationExercise from "@/features/dual-task-coordination/components/DualTaskCoordinationExercise";

const DualTaskCoordinationPage = () => {
  return (
    <MainSection>
      <HeaderCard>
        <HeaderCardTitle>Dual Task Coordination</HeaderCardTitle>
        <HeaderCardDescription>
          Test your ability to manage and perform two tasks simultaneously.
          Coordinate both hands while answering questions.
        </HeaderCardDescription>
      </HeaderCard>

      <DualTaskCoordinationExercise />
    </MainSection>
  );
};

export const metadata = {
  title: "Dual Task Coordination | APT-PWK",
  description:
    "Test your ability to manage and perform two tasks simultaneously.",
  keywords: ["dual-task", "pwk-apt", "aptitude", "exercises"],
};

export default DualTaskCoordinationPage;
