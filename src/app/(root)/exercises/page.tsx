import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";
import { Card } from "@/components/ui";

import { exercises } from "@/contants/exercise";

import Link from "next/link";

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
          <Link
            key={index}
            href={exercise.href}
            className={exercise.href ? "" : "pointer-events-none opacity-50"}
          >
            <Card
              // variant="borderless"
              size="lg"
              className="group p-0 h-full overflow-hidden transition-shadow"
            >
              <div className="flex items-center justify-center h-56 w-full bg-gradient-to-br from-primary-500 to-primary-400">
                <exercise.icon className="group-hover:scale-110 transition-transform duration-300 w-32 h-32 text-white" />
              </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{exercise.title}</h2>
                <p className="text-gray-700 mb-3">{exercise.description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
