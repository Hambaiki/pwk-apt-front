import { cn } from "@/libs/utils";

interface MainSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const MainSection = ({ children, className, ...props }: MainSectionProps) => {
  return (
    <main
      className={cn(`flex flex-col px-6 py-10 gap-6 max-w-6xl mx-auto`, className)}
      {...props}
    >
      {children}
    </main>
  );
};

export default MainSection;
