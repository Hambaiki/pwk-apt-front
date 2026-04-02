"use client";

import {
  HeaderCard,
  HeaderCardDescription,
  HeaderCardTitle,
} from "@/components/content/HeaderCard";
import MainSection from "@/components/content/MainSection";
import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";
import { Card } from "@/components/ui";
import ConfigurerForm from "@/features/dual-task-coordination/components/ConfigurerForm";
import HowToCard from "@/features/dual-task-coordination/components/HowToCard";
import { Config } from "@/features/dual-task-coordination/types";
import { generateSearchParams } from "@/libs/router";
import { Cog, Info } from "lucide-react";
import { useRouter } from "next/navigation";

const DualTaskCoordinationPage = () => {
  const router = useRouter();

  function handleStart(config: Config) {
    const uniqueKey = Math.random().toString(36).substring(2, 10);
    const searchParams = generateSearchParams({
      config: JSON.stringify({ ...config, key: uniqueKey }),
    });
    router.push(
      `/exercises/dual-task-coordination/questions?${searchParams.toString()}`,
    );
  }

  return (
    <MainSection>
      <Breadcrumb>
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Exercise" href="/exercises" />
        <BreadcrumbItem
          label="Dual Task Coordination"
          href="/exercises/dual-task-coordination"
        />
      </Breadcrumb>

      <HeaderCard>
        <HeaderCardTitle>Dual Task Coordination</HeaderCardTitle>
        <HeaderCardDescription>
          Test your ability to manage and perform two tasks simultaneously.
          Coordinate both hands while answering questions
        </HeaderCardDescription>
      </HeaderCard>

      <div className="space-y-4">
        <h2 className="mb-4 flex items-center gap-2">
          <Info className="w-8 h-8" />
          Introduction
        </h2>
        <p>
          This exercise will help you improve your ability to manage and perform
          two tasks simultaneously. Follow the instructions carefully and
          coordinate both hands while answering questions.
        </p>
        <HowToCard />
      </div>

      <div className="space-y-4">
        <h2 className="flex items-center gap-2">
          <Cog size={32} />
          Exercise Configuration
        </h2>
        <p>Adjust the settings below to customize your exercise experience.</p>
        <Card>
          <ConfigurerForm onSubmit={handleStart} />
        </Card>
      </div>
    </MainSection>
  );
};

// export const metadata = {
//   title: "Dual Task Coordination | APT-PWK",
//   description:
//     "Test your ability to manage and perform two tasks simultaneously.",
//   keywords: ["dual-task", "pwk-apt", "aptitude", "exercises"],
// };

export default DualTaskCoordinationPage;
