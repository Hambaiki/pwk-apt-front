"use client";

import { Button, Card, Input } from "@/components/ui";
import { randomInt } from "@/utils/common";

import React, { useEffect, useState } from "react";

type Node = { x: number; y: number };

type Config = {
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
};

const defaultConfig: Config = {
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
};

export default function NodeLines() {
  const [config, setConfig] = useState<Config>(defaultConfig);

  const [lines, setLines] = useState<Node[][]>([]);

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

    setLines(newLines);
  };

  // compute bounding box so SVG fits the content
  const computeViewBox = () => {
    if (!lines || lines.length === 0) return { x: 0, y: 0, w: 800, h: 500 };

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
      })
    );

    const pad = config.svgPadding;
    const vbX = minX - pad;
    const vbY = minY - pad;
    const vbW = Math.max(200, maxX - minX + pad * 2);
    const vbH = Math.max(200, maxY - minY + pad * 2);

    return { x: vbX, y: vbY, w: vbW, h: vbH };
  };

  const vb = computeViewBox();

  useEffect(() => {
    // generate an initial example on mount
    generateLines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (key: keyof Config, value: string | number) => {
    setConfig((prev) => ({ ...prev, [key]: value } as Config));
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className="space-y-4">
        <label className="flex flex-col">
          Orientation:
          <select
            value={config.orientation}
            onChange={(e) =>
              handleChange(
                "orientation",
                e.target.value as "horizontal" | "vertical"
              )
            }
            className="border rounded px-2 py-1"
          >
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </label>

        <div className="flex flex-wrap gap-3 items-center">
          <label className="flex flex-col">
            Lines:
            <Input
              type="number"
              min={1}
              value={config.lineCount}
              onChange={(e) =>
                handleChange("lineCount", Number(e.target.value))
              }
            />
          </label>

          <label className="flex flex-col">
            Nodes / line:
            <Input
              type="number"
              min={1}
              value={config.countPerLine}
              onChange={(e) =>
                handleChange("countPerLine", Number(e.target.value))
              }
            />
          </label>

          <label className="flex flex-col">
            Step:
            <Input
              type="number"
              value={config.step}
              onChange={(e) => handleChange("step", Number(e.target.value))}
            />
          </label>

          <label className="flex flex-col">
            Line gap:
            <Input
              type="number"
              value={config.lineGap}
              onChange={(e) => handleChange("lineGap", Number(e.target.value))}
            />
          </label>

          <label className="flex flex-col">
            Wiggle:
            <Input
              type="number"
              value={config.wiggle}
              onChange={(e) => handleChange("wiggle", Number(e.target.value))}
            />
          </label>

          <label className="flex flex-col">
            Node radius:
            <Input
              type="number"
              value={config.nodeRadius}
              onChange={(e) =>
                handleChange("nodeRadius", Number(e.target.value))
              }
            />
          </label>
        </div>

        <div className="flex flex-wrap justify-end gap-3 items-center">
          <Button variant="secondary" onClick={() => setConfig(defaultConfig)}>
            Reset Configuration
          </Button>
          <Button onClick={generateLines}>Generate</Button>
        </div>
      </Card>

      <div className="flex flex-col items-center p-6 border rounded-xl bg-white overflow-auto">
        <svg
          viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
          width={vb.w}
          height={vb.h}
          className="bg-white"
        >
          {lines.map((nodes, lineIndex) => (
            <g key={lineIndex}>
              <polyline
                points={nodes.map((n) => `${n.x},${n.y}`).join(" ")}
                fill="none"
                stroke="black"
                strokeWidth={config.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {nodes.map((node, i) => (
                <circle
                  key={i}
                  cx={node.x}
                  cy={node.y}
                  r={config.nodeRadius}
                  fill="black"
                />
              ))}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
