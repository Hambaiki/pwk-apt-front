import {
  HeaderCard,
  HeaderCardDescription,
  HeaderCardTitle,
} from "@/components/content/HeaderCard";
import MainSection from "@/components/content/MainSection";
import ComparisonExercise from "@/features/comparison/components/ComparisonExercise";
import { defaultConfig } from "@/features/comparison/constants";
import { ComparisonItem, Config } from "@/features/comparison/types";
import { generateComparisonExercise } from "@/features/comparison/utils/generator";

interface ComparisonExerciseQuestionPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ComparisonExerciseQuestionPage = ({
  searchParams,
}: ComparisonExerciseQuestionPageProps) => {
  const config = searchParams.config
    ? (JSON.parse(searchParams.config as string) as Config)
    : defaultConfig;

  const items: ComparisonItem[] = generateComparisonExercise(config);

  return (
    <MainSection>
      <HeaderCard>
        <HeaderCardTitle>Comparison - Questions</HeaderCardTitle>
        <HeaderCardDescription>
          Answer the following questions by comparing the given items and
          selecting the most appropriate choice for each pair.
        </HeaderCardDescription>
      </HeaderCard>

      <ComparisonExercise items={items} config={config} />
    </MainSection>
  );
};

export const metadata = {
  title: "Comparison Exercise - Questions | APT-PWK",
  description:
    "Practice your comparison skills with this interactive exercise. Compare items and select the most appropriate choices quickly and accurately.",
  keywords: ["comparison", "exercise", "items", "choices"],
};

export default ComparisonExerciseQuestionPage;
