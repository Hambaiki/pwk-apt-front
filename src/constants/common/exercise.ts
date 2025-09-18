import { Exercise, ExerciseTag } from "@/types/exercises";

import {
  GitCompareArrows,
  CircleQuestionMark,
  Shapes,
  List,
  Grid,
  MessageSquareText,
  Eye,
  Brain,
  Hand,
} from "lucide-react";

export const exerciseTagMap: Record<
  ExerciseTag,
  {
    title: string;
    color: string;
  }
> = {
  [ExerciseTag.New]: { title: "New", color: "#ff3b3b" },
  [ExerciseTag.UnderDevelopment]: {
    title: "Under Development",
    color: "#ffb82a",
  },
  [ExerciseTag.ComingSoon]: {
    title: "Coming Soon",
    color: "#7b7b7b",
  },
};

export const exercises: Exercise[] = [
  {
    title: "Comparison",
    description:
      "Compare 2 values and determine whether they are the same or not",
    href: "/exercises/comparison",
    icon: GitCompareArrows,
  },
  {
    title: "Scanning Shapes",
    description: "Identify and count specific shapes in a grid",
    href: "/exercises/scanning",
    icon: Shapes,
  },
  {
    title: "Grid Memory",
    description: "Memorize and recall items in a grid",
    href: "/exercises/grid-memory",
    icon: Grid,
    tag: ExerciseTag.New,
  },
  {
    title: "Read Back Memory",
    description: "Memorize and repeat back sequences of numbers and letters",
    href: "/exercises/read-back-memory",
    icon: MessageSquareText,
    tag: ExerciseTag.UnderDevelopment,
  },
  {
    title: "Sequence Memory",
    description: "Memorize and recall sequences of colors",
    href: "/exercises/sequence-memory",
    icon: List,
    tag: ExerciseTag.UnderDevelopment,
  },
  {
    title: "Dual Task Coordination",
    description:
      "Test your ability to manage and perform two tasks simultaneously",
    href: "/exercises/dual-task-coordination",
    icon: Hand,
    tag: ExerciseTag.UnderDevelopment,
  },
  {
    title: "Coming Soon...",
    description: "More exercises are on the way!",
    href: "",
    icon: CircleQuestionMark,
    tag: ExerciseTag.ComingSoon,
  },
];
