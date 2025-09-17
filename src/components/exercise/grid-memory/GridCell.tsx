import { GridItem } from "@/types/exercises/grid";

interface GridCellProps extends React.HTMLAttributes<HTMLButtonElement> {
  item: GridItem;
  isActive?: boolean;
  onSelect?: () => void;
}

const GridCell = ({
  item,
  isActive = false,
  onSelect,
  ...props
}: GridCellProps) => {
  return (
    <button
      className={`aspect-square border transition-all ${
        isActive ? "border-blue-400 bg-blue-200" : "border-gray-300 bg-gray-50"
      } rounded-lg`}
      {...props}
    >
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
