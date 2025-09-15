import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";
import {
  HeaderCard,
  HeaderCardDescription,
  HeaderCardTitle,
} from "@/components/content/HeaderCard";
import MainSection from "@/components/content/MainSection";
import ExerciseCard from "@/components/exercise/ExerciseCard";

import { exercises } from "@/constants/common/exercise";

export default function ExercisesPage() {
  return (
    <MainSection>
      <Breadcrumb>
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Exercises" href="/exercises" />
      </Breadcrumb>

      <HeaderCard>
        <HeaderCardTitle className="mb-2">Exercises</HeaderCardTitle>
        <HeaderCardDescription>
          Collection of exercises to improve your skills.
        </HeaderCardDescription>
      </HeaderCard>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </div>
    </MainSection>
  );
}
