import {
  Color,
  NodeLineConfig,
  Shape,
  ViewBox,
} from "@/features/dual-task-coordination/line-generator.types";

export const defaultLineGeneratorConfig: NodeLineConfig = {
  orientation: "vertical",
  lineCount: 2,
  countPerLine: 20,
  startX: 80,
  startY: 100,
  step: 50,
  lineGap: 200,
  wiggle: 70,
  nodeRadius: 8,
  strokeWidth: 2,
  svgPadding: 20,
  colors: [Color.Black],
  shapes: [Shape.Circle],
};

export const defaultLineGeneratorViewBox: ViewBox = {
  x: 0,
  y: 0,
  w: 800,
  h: 500,
};
