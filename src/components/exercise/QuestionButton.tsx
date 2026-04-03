import { cn } from "@/libs/utils/cn";
import { cva, VariantProps } from "class-variance-authority";

const optionButtonVariants = cva(
  "w-full text-left px-4 py-3 border rounded transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-brand-200 bg-white hover:bg-brand-50 hover:border-brand-300",
        selected: "bg-brand-100 border-brand-400",
        correct: "bg-success-50 border-success-300 text-success-700",
        wrong: "bg-danger-50 border-danger-300 text-danger-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface OptionButtonProps extends VariantProps<typeof optionButtonVariants> {
  label: string;
  onClick?: () => void;
}

export const OptionButton = ({
  variant,
  label,
  onClick,
}: OptionButtonProps) => {
  return (
    <button onClick={onClick} className={cn(optionButtonVariants({ variant }))}>
      {label}
    </button>
  );
};
