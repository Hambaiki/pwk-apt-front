export enum Choice {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
}

export interface Exercise {
  title: string;
  description: string;
  href: string;
  tag?: string;
  icon: React.ElementType;
}
