export enum Answer {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
}

export type ComparisonResult = {
  question: string;
  left: string;
  right: string;
  differences: number;
  correctAnswer: Answer;
};
