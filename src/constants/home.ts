import { GenericCard } from "@/types";

import {
  AlertCircle,
  BarChart,
  BicepsFlexed,
  Goal,
  Lightbulb,
  Target,
} from "lucide-react";

export const howItWorks: GenericCard[] = [
  {
    icon: Lightbulb,
    title: "Choose a Topic",
    description: "Pick an exercise you would like to practice.",
  },
  {
    icon: Target,
    title: "Practice Exercises",
    description:
      "Solve interactive questions and track your progress instantly.",
  },
  {
    icon: BarChart,
    title: "Track Growth",
    description:
      "Review your performance to identify strengths and weaknesses.",
  },
];

export const benefits: GenericCard[] = [
  {
    title: "Readiness",
    description: "Prepare for job interviews and assessments.",
    icon: AlertCircle,
  },
  {
    title: "Exam Success",
    description: "Achieve higher scores in competitive exams.",
    icon: Goal,
  },
  {
    title: "Personal Growth",
    description: "Develop critical thinking and problem-solving skills.",
    icon: BicepsFlexed,
  },
];
