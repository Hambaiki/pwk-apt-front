import { ShapeName } from "../types";
import { shapeRenderers } from "../utils/renderer";

interface ShapesItemProps {
  shape: ShapeName;
  color?: string;
  number?: number;
  size?: number;
  letter?: string;
  fontSize?: number;
  isMonotoneMode?: boolean;
}

const ShapeItem = ({
  shape,
  color = "rgba(0,0,0,0.1)",
  size = 80,
  number,
  letter,
  isMonotoneMode = false,
  fontSize = 14,
}: ShapesItemProps) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Shape SVG */}
      {shapeRenderers[shape](size, isMonotoneMode ? "rgb(59,59,59)" : color)}

      {/* Text overlay */}
      <span
        className="absolute font-bold flex items-center justify-center"
        style={{
          color: "rgb(59,59,59)",
          fontSize: `${fontSize}px`,
        }}
      >
        {number}
        {letter}
      </span>
    </div>
  );
};

export default ShapeItem;
