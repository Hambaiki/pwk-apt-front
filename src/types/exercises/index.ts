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

export interface Exercise {
  title: string;
  description: string;
  href: string;
  tag?: ExerciseTag;
  icon: React.ElementType;
}
