export enum Shape {
  Circle = "circle",
  Square = "square",
  Triangle = "triangle",
}

export enum Color {
  Red = "#EF4444", // Tailwind red-500
  Orange = "#F97316", // Tailwind orange-500
  Amber = "#F59E0B", // Tailwind amber-500
  Yellow = "#EAB308", // Tailwind yellow-500
  Lime = "#84CC16", // Tailwind lime-500
  Green = "#22C55E", // Tailwind green-500
  Teal = "#14B8A6", // Tailwind teal-500
  Cyan = "#06B6D4", // Tailwind cyan-500
  Blue = "#3B82F6", // Tailwind blue-500
  Indigo = "#6366F1", // Tailwind indigo-500
  Violet = "#8B5CF6", // Tailwind violet-500
  Purple = "#A855F7", // Tailwind purple-500
  Pink = "#EC4899", // Tailwind pink-500
  Rose = "#F43F5E", // Tailwind rose-500
  Gray = "#6B7280", // Tailwind gray-500
  Black = "#111827", // Tailwind gray-900
  White = "#FFFFFF", // white
}

export interface Config {
  orientation: "horizontal" | "vertical";
  lineCount: number;
  countPerLine: number;
  startX: number;
  startY: number;
  step: number;
  lineGap: number;
  wiggle: number; // max +/- wiggle
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
