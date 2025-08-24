import ExerciseCard from "@/components/exercise/ExerciseCard";
import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";
import { Badge, Card } from "@/components/ui";

import { exercises } from "@/constants/common/exercise";

export default function ExercisesPage() {
  return (
    <div className="flex flex-col p-6 max-w-7xl mx-auto">
      <Breadcrumb className="mb-6">
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Exercises" href="/exercises" />
      </Breadcrumb>

      <Card className="p-20 mb-8 rounded-xl bg-gradient-to-br from-primary-800 to-primary-600 shadow-medium">
        <h1 className="mb-2 text-white">Exercises</h1>
        <p className="text-gray-100">
          Collection of exercises to improve your skills.
        </p>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}
