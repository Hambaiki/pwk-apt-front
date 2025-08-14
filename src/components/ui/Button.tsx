import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "outline-active" | "underline";
}

function Button({
  children,
  className = "",
  variant = "solid",
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        `transition-all`,
        variant === "solid"
          ? "bg-nile-blue-500 hover:bg-nile-blue-600 border border-nile-blue-500 text-white shadow-blue-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
          : "",
        variant === "outline"
          ? "bg-white text-nile-blue-500 border border-nile-blue-500 hover:bg-nile-blue-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-400"
          : "",
        variant === "outline-active"
          ? "bg-nile-blue-100 text-nile-blue-500 border border-nile-blue-500 hover:bg-nile-blue-200"
          : "",
        variant === "underline" ? "underline text-nile-blue-500" : "",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
