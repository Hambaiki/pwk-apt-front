import {
  HeaderCard,
  HeaderCardDescription,
  HeaderCardTitle,
} from "@/components/content/HeaderCard";
import MainSection from "@/components/content/MainSection";
import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";
import ReadBackMemoryExercise from "@/features/read-back-memory/ReadBackMemoryExercise";

const ReadBackMemoryPage = () => {
  return (
    <MainSection>
      <Breadcrumb>
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Exercise" href="/exercises" />
        <BreadcrumbItem
          label="Read Back Memory"
          href="/exercises/read-back-memory"
        />
      </Breadcrumb>

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
