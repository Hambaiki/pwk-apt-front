import { Card } from "@/components/ui";
import { cn } from "@/libs/utils";

interface HeaderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const HeaderCard = ({ children, className, ...props }: HeaderCardProps) => {
  return (
    <Card
      className={cn(
        `p-20 rounded-2xl bg-gradient-to-br from-primary-800 to-primary-600`,
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
};

const HeaderCardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <h1 className={cn("mb-2 text-white text-left", className)}>{children}</h1>;
};

const HeaderCardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <p className={cn("text-gray-100 text-left", className)}>{children}</p>;
};

export { HeaderCard, HeaderCardTitle, HeaderCardDescription };
