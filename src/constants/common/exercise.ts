import { Exercise } from "@/types/exercises";

import { GitCompareArrows, CircleQuestionMark } from "lucide-react";

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
    title: "Coming Soon",
    description: "This exercise is coming soon.",
    href: "",
    icon: CircleQuestionMark,
    tag: "coming-soon",
  },
  {
    title: "Coming Soon",
    description: "This exercise is coming soon.",
    href: "",
    icon: CircleQuestionMark,
    tag: "coming-soon",
  },
];
