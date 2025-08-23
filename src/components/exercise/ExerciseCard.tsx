import { Card } from "@/components/ui";

import { Exercise } from "@/types/exercises";

import Link from "next/link";

interface ExerciseCardProps {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <Link
      href={exercise.href}
      className={exercise.href ? "" : "pointer-events-none opacity-50"}
    >
      <Card
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
  );
}
