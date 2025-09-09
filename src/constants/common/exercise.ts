import { Exercise } from "@/types/exercises";

import { GitCompareArrows, CircleQuestionMark, Shapes } from "lucide-react";

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
    title: "Coming Soon",
    description: "This exercise is coming soon.",
    href: "",
    icon: CircleQuestionMark,
    tag: "coming-soon",
  },
];
