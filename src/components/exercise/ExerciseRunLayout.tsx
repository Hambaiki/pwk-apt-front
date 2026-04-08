import MainSection from "@/components/content/MainSection";
import { PageHeader } from "@/components/content/PageHeader";
import type { ReactNode } from "react";

interface ExerciseRunLayoutProps {
  title: string;
  description: string;
  setupHref: string;
  children: ReactNode;
}

const ExerciseRunLayout = ({
  title,
  description,
  setupHref,
  children,
}: ExerciseRunLayoutProps) => {
  return (
    <MainSection>
      <PageHeader
        title={title}
        description={description}
        backHref={setupHref}
        backLabel="Back to Setup"
      />

      {children}
    </MainSection>
  );
};

export default ExerciseRunLayout;
