import { clsx } from "clsx";

export default function Main({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("w-full max-w-6xl mx-auto", className)}>
      {children}
    </div>
  );
}
