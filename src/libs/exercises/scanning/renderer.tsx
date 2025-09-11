import { ShapeName } from "@/types/exercises/scanning";

// Shape library
export const shapeRenderers: Record<
  ShapeName,
  (size: number, color: string) => React.ReactNode
> = {
  [ShapeName.Circle]: (size, color) => (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 5}
        stroke={color}
        strokeWidth={2}
        fill="rgba(255, 255, 255, 0.75)"
      />
    </svg>
  ),
  [ShapeName.Square]: (size, color) => (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect
        x="5"
        y="5"
        width={size - 10}
        height={size - 10}
        stroke={color}
        strokeWidth={2}
        fill="rgba(255, 255, 255, 0.75)"
      />
    </svg>
  ),
  [ShapeName.Triangle]: (size, color) => (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon
        points={`${size / 2},5 ${size - 5},${size - 5} 5,${size - 5}`}
        stroke={color}
        strokeWidth={2}
        fill="rgba(255, 255, 255, 0.75)"
      />
    </svg>
  ),
  [ShapeName.Diamond]: (size, color) => (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Make the width more thin so that it does not look like square */}
      <polygon
        points={`${size / 2},5 ${size * 0.8},${size / 2} ${size / 2},${
          size - 5
        } ${size * 0.2},${size / 2}`}
        stroke={color}
        strokeWidth={2}
        fill="rgba(255, 255, 255, 0.75)"
      />
    </svg>
  ),
  [ShapeName.Oval]: (size, color) => (
    <svg width={size} height={size / 1.5} viewBox={`0 0 ${size} ${size / 1.5}`}>
      <ellipse
        cx={size / 2}
        cy={size / 3}
        rx={size / 2 - 5}
        ry={size / 3 - 5}
        stroke={color}
        strokeWidth={2}
        fill="rgba(255, 255, 255, 0.75)"
      />
    </svg>
  ),
  [ShapeName.Parallelogram]: (size, color) => (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon
        points={`20,5 ${size - 5},5 ${size - 20},${size - 5} 5,${size - 5}`}
        stroke={color}
        strokeWidth={2}
        fill="rgba(255, 255, 255, 0.75)"
      />
    </svg>
  ),
  [ShapeName.Trapezoid]: (size, color) => (
    <svg width={size} height={size / 1.5} viewBox={`0 0 ${size} ${size / 1.5}`}>
      <polygon
        points={`20,5 ${size - 20},5 ${size - 5},${size / 1.5 - 5} 5,${
          size / 1.5 - 5
        }`}
        stroke={color}
        strokeWidth={2}
        fill="rgba(255, 255, 255, 0.75)"
      />
    </svg>
  ),
};
