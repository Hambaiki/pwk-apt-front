export enum Stage {
  Reference = "reference",
  Questions = "questions",
  Results = "results",
}

export enum ShapeName {
  Circle = "circle",
  Square = "square",
  Triangle = "triangle",
  Diamond = "diamond",
  Oval = "oval",
  Parallelogram = "parallelogram",
  Trapezoid = "trapezoid",
}

export interface Shape {
  name: ShapeName;
}

export enum QuestionFormat {
  SharedGrid = "shared-grid",
  PerQuestionGrid = "per-question-grid",
}

export interface ShapeGridItem {
  id: number;
  shape: Shape;
  number: number;
  letter: string;
  color: string;
  size: number;
  rotation: number;
  x: number;
  y: number;
}

export interface ScanningQuestionSet {
  id: number;
  items: ShapeGridItem[];
  question: ShapeGridItem;
}

export interface Config {
  key?: string;
  itemCount: number;
  questionCount: number;
  timeLimit: number;
  questionFormat?: QuestionFormat;
  isMonotoneMode?: boolean;
  shapes: Shape[];
}
