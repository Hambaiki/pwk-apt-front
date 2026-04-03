import MainSection from "@/components/content/MainSection";
import ExerciseCard from "@/components/exercise/ExerciseCard";
import { ToolCard } from "@/components/tool/ToolCard";
import { Button } from "@/components/ui";
import { exercises } from "@/constants/exercise";
import { tools } from "@/constants/tools";
import Link from "next/link";

export default function HomePage() {
  return (
    <MainSection className="space-y-20">
      {/* Exercises Section */}
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises.slice(0, 6).map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/exercises">
            <Button variant="outline">View All Exercises</Button>
          </Link>
        </div>
      </div>

      {/* Tools Section */}
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.slice(0, 6).map((tool, index) => (
            <ToolCard key={index} tool={tool} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/tools">
            <Button variant="outline">View All Tools </Button>
          </Link>
        </div>
      </div>
    </MainSection>
  );
}
