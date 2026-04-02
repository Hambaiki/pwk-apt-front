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

export interface Config {
  key: string;
  itemCount: number;
  questionCount: number;
  timeLimit: number;
  isMonotoneMode?: boolean;
  shapes: Shape[];
}
