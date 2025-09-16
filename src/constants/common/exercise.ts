import { Exercise } from "@/types/exercises";

import {
  GitCompareArrows,
  CircleQuestionMark,
  Shapes,
  List,
  Grid,
} from "lucide-react";

export const exercises: Exercise[] = [
  {
    title: "Comparison",
    description:
      "Compare 2 values and determine whether they are the same or not",
    href: "/exercises/comparison",
    icon: GitCompareArrows,
    tag: "new",
  },
  {
    title: "Scanning Shapes",
    description: "Identify and count specific shapes in a grid",
    href: "/exercises/scanning",
    icon: Shapes,
    tag: "new",
  },
  {
    title: "Short Term Memory - Sequence",
    description: "Memorize and recall sequences of colors",
    href: "/exercises/short-term-memory-sequence",
    icon: List,
    tag: "new",
  },
  {
    title: "Grid Memory",
    description: "Memorize and recall items in a grid",
    href: "/exercises/grid-memory",
    icon: Grid,
    tag: "new",
  },
];
