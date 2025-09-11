import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";
import {
  HeaderCard,
  HeaderCardDescription,
  HeaderCardTitle,
} from "@/components/content/HeaderCard";
import MainSection from "@/components/content/MainSection";
import ComparisonExercise from "@/components/exercise/comparison/ComparisonExercise";

import { defaultConfig } from "@/constants/exercises/comparison";

import { ComparisonItem, Config } from "@/types/exercises/comparison";

import { generateComparisonExercise } from "@/libs/exercises/comparison";

interface ComparisonExerciseQuestionPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ComparisonExerciseQuestionPage({
  searchParams,
}: ComparisonExerciseQuestionPageProps) {
  const config = searchParams.config
    ? (JSON.parse(searchParams.config as string) as Config)
    : defaultConfig;

  const items: ComparisonItem[] = generateComparisonExercise(config);

  return (
    <MainSection className="gap-6">
      <Breadcrumb>
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Exercises" href="/exercises" />
        <BreadcrumbItem label="Comparison" href="/exercises/comparison" />
      </Breadcrumb>

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
}
