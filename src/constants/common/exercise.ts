import { Exercise } from "@/types/exercises";

import {
  GitCompareArrows,
  CircleQuestionMark,
  Shapes,
  List,
  Grid,
  MessageSquareText,
} from "lucide-react";

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
    tag: "new",
  },
  {
    title: "Read Back Memory",
    description: "Memorize and repeat back sequences of numbers and letters",
    href: "/exercises/read-back-memory",
    icon: MessageSquareText,
    tag: "under-development",
  },
  {
    title: "Sequence Memory",
    description: "Memorize and recall sequences of colors",
    href: "/exercises/sequence-memory",
    icon: List,
    tag: "under-development",
  },
  {
    title: "Coming Soon...",
    description: "More exercises are on the way!",
    href: "",
    icon: CircleQuestionMark,
    tag: "coming-soon",
  },
];
