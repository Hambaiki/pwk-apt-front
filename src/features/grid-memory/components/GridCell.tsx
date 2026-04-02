import { cn } from "@/libs/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { GridItem } from "../types";

const gridCellVariants = cva(
  "aspect-square border rounded-lg flex items-center justify-center transition-all",
  {
    variants: {
      variant: {
        default: "border-gray-300 bg-gray-50",
        active: "border-blue-400 bg-blue-100",
        correct: "border-green-400 bg-green-100",
        incorrect: "border-red-400 bg-red-100",
        unanswered: "border-gray-400 bg-gray-100",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

interface GridCellProps
  extends
    React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gridCellVariants> {
  item: GridItem;
  onSelect?: () => void;
}

const GridCell = ({ item, variant, onSelect, ...props }: GridCellProps) => {
  return (
    <button className={cn(gridCellVariants({ variant }))} {...props}>
      {item.type === "empty" ? (
        <div
          className={`w-full h-full flex items-center justify-center transition-colors`}
        />
      ) : (
        <div className={`w-full h-full flex items-center justify-center`}>
          {item.value}
        </div>
      )}
    </button>
  );
};

export default GridCell;
