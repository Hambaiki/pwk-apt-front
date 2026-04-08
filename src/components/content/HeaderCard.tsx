import { cn } from "@/libs/utils/cn";

interface HeaderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const HeaderCard = ({ children, className, ...props }: HeaderCardProps) => {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};

const HeaderCardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={cn("mb-2 text-3xl font-bold text-neutral-800", className)}>
      {children}
    </h1>
  );
};

const HeaderCardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <p className={cn("text-neutral-600", className)}>{children}</p>;
};

export { HeaderCard, HeaderCardDescription, HeaderCardTitle };
