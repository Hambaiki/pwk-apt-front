import {
  HeaderCard,
  HeaderCardDescription,
  HeaderCardTitle,
} from "@/components/content/HeaderCard";
import MainSection from "@/components/content/MainSection";
import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";
import DualTaskCoordinationExercise from "@/features/dual-task-coordination/components/DualTaskCoordinationExercise";

const DualTaskCoordinationPage = () => {
  return (
    <MainSection>
      <Breadcrumb>
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Exercise" href="/exercises" />
        <BreadcrumbItem
          label="Dual Task Coordination"
          href="/exercises/dual-task-coordination"
        />
        <BreadcrumbItem
          label="Questions"
          href="/exercises/dual-task-coordination/questions"
        />
      </Breadcrumb>

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
