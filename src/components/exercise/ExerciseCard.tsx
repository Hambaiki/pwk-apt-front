import { Card } from "@/components/ui";
import { exerciseTagMap } from "@/constants/exercise";
import { Exercise } from "@/types/exercises";
import Link from "next/link";

interface ExerciseCardProps {
  exercise: Exercise;
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const exerciseTag = exercise.tag ? exerciseTagMap[exercise.tag] : null;

  return (
    <Link
      href={exercise.href}
      className={exercise.href ? "" : "pointer-events-none opacity-50"}
    >
      <Card
        size="lg"
        className="group p-0 h-full overflow-hidden transition-shadow"
      >
        <div className="relative flex items-center justify-center h-56 w-full bg-gradient-to-br from-primary-500 to-primary-400">
          <exercise.icon className="group-hover:scale-110 transition-transform duration-300 w-32 h-32 text-white" />

          {exercise.tag && (
            <div
              style={{
                backgroundColor: exerciseTag
                  ? exerciseTag.color
                  : "transparent",
              }}
              className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold text-white rounded-full"
            >
              {exerciseTag ? exerciseTag.title : ""}
            </div>
          )}
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{exercise.title}</h2>
          <p className="text-gray-700 mb-3">{exercise.description}</p>
        </div>
      </Card>
    </Link>
  );
};

export default ExerciseCard;
