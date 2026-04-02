import { cn } from "@/libs/utils/cn";
import { cva, VariantProps } from "class-variance-authority";

const optionButtonVariants = cva(
  "w-full text-left px-4 py-3 border rounded transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-secondary-200 bg-white hover:bg-primary-50 hover:border-primary-300",
        selected: "bg-primary-100 border-primary-400",
        correct: "bg-success-50 border-success-300 text-success-700",
        wrong: "bg-error-50 border-error-300 text-error-700",
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
