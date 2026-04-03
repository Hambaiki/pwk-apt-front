import { cn } from "@/libs/utils/cn";

interface MainSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const MainSection = ({ children, className, ...props }: MainSectionProps) => {
  return (
    <main className={cn(`flex flex-col p-6 mx-auto`, className)} {...props}>
      {children}
    </main>
  );
};

export default MainSection;
