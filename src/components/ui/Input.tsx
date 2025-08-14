import { clsx } from "clsx";

export default function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        `border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-nile-blue-500`,
        className
      )}
      {...props}
    />
  );
}
