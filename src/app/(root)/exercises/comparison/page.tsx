"use client";

import {
  HeaderCard,
  HeaderCardDescription,
  HeaderCardTitle,
} from "@/components/content/HeaderCard";
import MainSection from "@/components/content/MainSection";
import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";
import ConfigurerForm from "@/features/comparison/components/ConfigurerForm";
import HowToCard from "@/features/comparison/components/HowToCard";

import { generateSearchParams } from "@/libs/router";

import { Config } from "@/features/comparison/types";

import { Cog, Info } from "lucide-react";

import { Card } from "@/components/ui";
import { useRouter } from "next/navigation";

export default function ComparisonExerciseMainPage() {
  const router = useRouter();

  function handleStart(config: Config) {
    const uniqueKey = Math.random().toString(36).substring(2, 10);
    const searchParams = generateSearchParams({
      config: JSON.stringify({ ...config, key: uniqueKey }),
    });
    router.push(`/exercises/comparison/questions?${searchParams.toString()}`);
  }

  return (
    <MainSection>
      <Breadcrumb>
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Exercises" href="/exercises" />
        <BreadcrumbItem label="Comparison" href="/exercises/comparison" />
      </Breadcrumb>

      {/* Header */}
      <HeaderCard>
        <HeaderCardTitle className="mb-2">Comparison Exercise</HeaderCardTitle>
        <HeaderCardDescription>
          Compare 2 values and determine whether they are the same or not.
        </HeaderCardDescription>
      </HeaderCard>

      <div className="space-y-4">
        <h2 className="mb-4 flex items-center gap-2">
          <Info className="w-8 h-8" />
          Introduction
        </h2>
        <p>
          This exercise will help you improve your ability to identify
          differences and similarities between sequences. Follow the
          instructions carefully and select the correct option for each
          question.
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
}
