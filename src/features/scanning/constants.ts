import { shapeRenderers } from "@/features/scanning/utils/renderer";

import { Config, ShapeGridItem, ShapeName } from "@/features/scanning/types";

// Shape types and their corresponding symbols
export const shapes = Object.keys(shapeRenderers).map((name) => ({
  name: name as ShapeName,
}));

// Color palette
export const colors = [
  "rgba(255, 99, 132, 1)", // soft red / rose
  "rgba(54, 162, 235, 1)", // soft blue
  "rgba(75, 192, 192, 1)", // teal / aqua
  "rgba(255, 206, 86, 1)", // warm yellow
  "rgba(153, 102, 255, 1)", // lavender / purple
  "rgba(255, 159, 64, 1)", // soft orange
  "rgba(201, 203, 207, 1)", // gray / neutral
  "rgba(144, 238, 144, 1)", // light green
];

export const sampleShapes: Omit<
  ShapeGridItem,
  "id" | "size" | "x" | "y" | "rotation"
>[] = shapes.map((shape, index) => ({
  shape,
  color: colors[index % colors.length],
  number: index + 1,
  letter: String.fromCharCode(65 + (index % 26)),
}));

export const defaultConfig: Config = {
  key: "default",
  itemCount: 40, // Number of item groups
  questionCount: 20, // Questions per group
  timeLimit: 600, // Time limit in seconds
  shapes: shapes, // Shapes to use
  isMonotoneMode: false, // Whether to use monotone colors
};
