export enum Shape {
  Circle = "circle",
  Square = "square",
  Triangle = "triangle",
}

export enum Color {
  Red = "#EF4444",
  Orange = "#F97316",
  Amber = "#F59E0B",
  Yellow = "#EAB308",
  Lime = "#84CC16",
  Green = "#22C55E",
  Teal = "#14B8A6",
  Cyan = "#06B6D4",
  Blue = "#3B82F6",
  Indigo = "#6366F1",
  Violet = "#8B5CF6",
  Purple = "#A855F7",
  Pink = "#EC4899",
  Rose = "#F43F5E",
  Gray = "#6B7280",
  Black = "#111827",
  White = "#FFFFFF",
}

export interface NodeLineConfig {
  orientation: "horizontal" | "vertical";
  lineCount: number;
  countPerLine: number;
  startX: number;
  startY: number;
  step: number;
  lineGap: number;
  wiggle: number;
  nodeRadius: number;
  strokeWidth: number;
  svgPadding: number;
  colors: Color[];
  shapes: Shape[];
}

export interface ViewBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Node {
  x: number;
  y: number;
}
