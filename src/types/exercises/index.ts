import { GenericNavigationItem } from "@/types";

export enum Choice {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
}

export enum ExerciseTag {
  New = "new",
  UnderDevelopment = "under-development",
  ComingSoon = "coming-soon",
}

export interface Exercise extends GenericNavigationItem<ExerciseTag> {}
