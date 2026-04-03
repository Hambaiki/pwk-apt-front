import { cn } from "@/libs/utils/cn";

interface MainSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const MainSection = ({ children, className, ...props }: MainSectionProps) => {
  return (
    <main
      className={cn(
        "flex-1 flex flex-col overflow-y-auto p-4 lg:p-6 space-y-6 lg:space-y-8",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(var(--color-neutral-200) 1px, transparent 1px), linear-gradient(90deg, var(--color-neutral-200) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
      {...props}
    >
      {children}
    </main>
  );
};

export default MainSection;
