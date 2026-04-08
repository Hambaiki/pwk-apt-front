"use client";

import { Button, Card } from "@/components/ui";
import { FormInput, FormSelect } from "@/components/ui/form";
import { FormSelectOption } from "@/components/ui/form/FormSelectOption";
import {
  defaultLineGeneratorConfig,
  defaultLineGeneratorViewBox,
} from "@/features/dual-task-coordination/line-generator";
import {
  Color,
  Node,
  NodeLineConfig,
  Shape,
  ViewBox,
} from "@/features/dual-task-coordination/line-generator.types";
import { randomInt } from "@/libs/utils/number";
import { Download, LineSquiggle } from "lucide-react";
import { useRef, useState } from "react";

export default function NodeLines() {
  const svgRef = useRef<SVGSVGElement>(null);

  const [viewBox, setViewBox] = useState<ViewBox>(defaultLineGeneratorViewBox);
  const [config, setConfig] = useState<NodeLineConfig>(
    defaultLineGeneratorConfig,
  );
  const [lines, setLines] = useState<Node[][] | undefined>();

  // NOTE: Generate lines based on current config
  const generateLines = () => {
    if (config.countPerLine <= 0 || config.lineCount <= 0) {
      setLines([]);
      return;
    }

    const newLines: Node[][] = [];

    for (let line = 0; line < config.lineCount; line++) {
      const nodes: Node[] = [];

      // baseX/baseY are the *anchor* for the line (they don't change while stepping)
      const baseX =
        config.orientation === "horizontal"
          ? config.startX
          : config.startX + line * config.lineGap;
      const baseY =
        config.orientation === "horizontal"
          ? config.startY + line * config.lineGap
          : config.startY;

      let currentX = baseX;
      let currentY = baseY;
      nodes.push({ x: currentX, y: currentY });

      for (let i = 1; i < config.countPerLine; i++) {
        const wig = randomInt(-config.wiggle, config.wiggle);

        if (config.orientation === "horizontal") {
          currentX += config.step; // advance horizontally
          // Y is baseY plus wiggle
          currentY = baseY + wig;
        } else {
          currentY += config.step; // advance vertically
          // X is baseX plus wiggle
          currentX = baseX + wig;
        }

        nodes.push({ x: currentX, y: currentY });
      }

      newLines.push(nodes);
    }

    return newLines;
  };

  // NOTE: compute bounding box so SVG fits the content
  const computeViewBox = (lines: Node[][]) => {
    if (!lines || lines.length === 0) return defaultLineGeneratorViewBox;

    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    lines.forEach((nodes) =>
      nodes.forEach(({ x, y }) => {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }),
    );

    const pad = config.svgPadding;
    const vbX = minX - pad;
    const vbY = minY - pad;
    const vbW = Math.max(200, maxX - minX + pad * 2);
    const vbH = Math.max(200, maxY - minY + pad * 2);

    return { x: vbX, y: vbY, w: vbW, h: vbH };
  };

  const handleGenerate = () => {
    const newLines = generateLines();
    if (newLines) {
      setLines(newLines);
      const newVb = computeViewBox(newLines);
      setViewBox(newVb);
    }
  };

  const handleChangeConfig = (
    key: keyof NodeLineConfig,
    value: string | number | string[] | Shape[],
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }) as NodeLineConfig);
  };

  const handleDownloadImage = async () => {
    if (!svgRef.current) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgRef.current);

    // Convert SVG string to a Blob
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const scale = 3; // NOTE: change to 2, 3, 4 for higher resolution

      // Use viewBox values instead of clientWidth/Height
      const vb = svgRef.current!.viewBox.baseVal;
      const width = vb.width * scale;
      const height = vb.height * scale;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw scaled image
      ctx.drawImage(img, 0, 0, width, height);

      // Export as PNG
      const pngUrl = canvas.toDataURL("image/png");

      // Trigger download
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = `node-lines-${Date.now()}.png`;
      a.click();

      // Cleanup
      URL.revokeObjectURL(svgUrl);
    };

    img.src = svgUrl;
  };

  const renderNodeShape = (
    shape: Shape,
    node: Node,
    radius: number,
    key: number,
    fill: string,
  ) => {
    switch (shape) {
      case "circle":
        return (
          <circle key={key} cx={node.x} cy={node.y} r={radius} fill={fill} />
        );
      case "square":
        return (
          <rect
            key={key}
            x={node.x - radius}
            y={node.y - radius}
            width={radius * 2}
            height={radius * 2}
            fill={fill}
          />
        );
      case "triangle":
        const points = [
          `${node.x},${node.y - radius}`,
          `${node.x - radius},${node.y + radius}`,
          `${node.x + radius},${node.y + radius}`,
        ].join(" ");
        return <polygon key={key} points={points} fill={fill} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="space-y-4">
        <label className="flex flex-col">
          Orientation:
          <FormSelect
            value={config.orientation}
            onChange={(value) =>
              handleChangeConfig(
                "orientation",
                value as "horizontal" | "vertical",
              )
            }
            className="border rounded px-2 py-1"
          >
            <FormSelectOption value="horizontal">Horizontal</FormSelectOption>
            <FormSelectOption value="vertical">Vertical</FormSelectOption>
          </FormSelect>
        </label>

        <label className="flex flex-col gap-2">
          Shapes:
          <div className="flex gap-4">
            {(["circle", "square", "triangle"] as Shape[]).map((shape) => (
              <label key={shape} className="flex items-center gap-2">
                <FormInput
                  type="checkbox"
                  checked={config.shapes.includes(shape)}
                  onChange={(e) => {
                    handleChangeConfig(
                      "shapes",
                      e.target.checked
                        ? [...config.shapes, shape]
                        : config.shapes.filter((s) => s !== shape),
                    );
                  }}
                />
                {shape.charAt(0).toUpperCase() + shape.slice(1)}
              </label>
            ))}
          </div>
        </label>

        <label className="flex flex-col gap-2">
          Colors:
          <div className="flex gap-4 flex-wrap">
            {[
              Color.Black,
              Color.Red,
              Color.Blue,
              Color.Green,
              Color.Orange,
              Color.Purple,
            ].map((color) => (
              <label key={color} className="flex items-center gap-2">
                <FormInput
                  type="checkbox"
                  checked={config.colors.includes(color)}
                  onChange={(e) =>
                    handleChangeConfig(
                      "colors",
                      e.target.checked
                        ? [...config.colors, color] // add
                        : config.colors.filter((c) => c !== color), // remove
                    )
                  }
                />
                <span
                  className="font-bold"
                  style={{
                    color,
                  }}
                >
                  {color}
                </span>
              </label>
            ))}
          </div>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <label className="flex flex-col">
            Lines:
            <FormInput
              type="number"
              min={1}
              value={config.lineCount}
              onChange={(e) =>
                handleChangeConfig("lineCount", Number(e.target.value))
              }
            />
          </label>

          <label className="flex flex-col">
            Nodes / line:
            <FormInput
              type="number"
              min={1}
              value={config.countPerLine}
              onChange={(e) =>
                handleChangeConfig("countPerLine", Number(e.target.value))
              }
            />
          </label>

          <label className="flex flex-col">
            Step:
            <FormInput
              type="number"
              value={config.step}
              onChange={(e) =>
                handleChangeConfig("step", Number(e.target.value))
              }
            />
          </label>

          <label className="flex flex-col">
            Line gap:
            <FormInput
              type="number"
              value={config.lineGap}
              onChange={(e) =>
                handleChangeConfig("lineGap", Number(e.target.value))
              }
            />
          </label>

          <label className="flex flex-col">
            Wiggle:
            <FormInput
              type="number"
              value={config.wiggle}
              onChange={(e) =>
                handleChangeConfig("wiggle", Number(e.target.value))
              }
            />
          </label>

          <label className="flex flex-col">
            Node radius:
            <FormInput
              type="number"
              value={config.nodeRadius}
              onChange={(e) =>
                handleChangeConfig("nodeRadius", Number(e.target.value))
              }
            />
          </label>
        </div>

        <div className="flex flex-wrap justify-end gap-3 items-center">
          <Button
            variant="outline"
            onClick={() => setConfig(defaultLineGeneratorConfig)}
          >
            Reset Configuration
          </Button>
          <Button onClick={handleGenerate}>Generate</Button>
        </div>
      </Card>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h2>
            <LineSquiggle size={32} className="inline mr-2" />
            SVG Output
          </h2>
          <Button
            disabled={!lines || lines.length === 0}
            variant="outline"
            onClick={handleDownloadImage}
          >
            <Download size={16} className="inline mr-2" />
            Download
          </Button>
        </div>

        <div className="flex flex-col items-center p-6 border border-border rounded-xl bg-white overflow-auto">
          <svg
            ref={svgRef}
            viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
            width={viewBox.w}
            height={viewBox.h}
            className="bg-white"
          >
            {lines && lines.length > 0 ? (
              lines.map((nodes, lineIndex) => (
                <g key={lineIndex}>
                  <polyline
                    points={nodes.map((n) => `${n.x},${n.y}`).join(" ")}
                    fill="none"
                    stroke="black"
                    strokeWidth={config.strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {nodes.map((node, i) => {
                    const shape =
                      config.shapes.length > 0
                        ? config.shapes[i % config.shapes.length]
                        : Shape.Circle;
                    const color =
                      config.colors.length > 0
                        ? config.colors[i % config.colors.length]
                        : Color.Black;
                    return renderNodeShape(
                      shape,
                      node,
                      config.nodeRadius,
                      i,
                      color,
                    );
                  })}
                </g>
              ))
            ) : (
              <text
                x={viewBox.x + viewBox.w / 2}
                y={viewBox.y + viewBox.h / 2}
                textAnchor="middle"
                fill="gray"
                fontSize="16"
              >
                {`No lines generated. Click "Generate" to create lines.`}
              </text>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
