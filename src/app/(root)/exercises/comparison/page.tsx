"use client";

import { Card, Button } from "@/components/ui";
import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";
import {
  HeaderCard,
  HeaderCardDescription,
  HeaderCardTitle,
} from "@/components/content/HeaderCard";
import HowToCard from "@/components/exercise/comparison/HowToCard";

import { GenerationType, MutationType } from "@/types/exercises/comparison";

import { Info } from "lucide-react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import MainSection from "@/components/content/MainSection";

export default function ComparisonExerciseMainPage() {
  const router = useRouter();

  function handleStart(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const generationTypes = Object.values(GenerationType);
    const mutationTypes = Object.values(MutationType);

    const formData = new FormData(e.currentTarget);

    const configs = {
      count: formData.get("count"),
      length: formData.get("length"),
      minMutation: formData.get("minMutation"),
      maxMutation: formData.get("maxMutation"),
      generationTypes: generationTypes.filter((type) =>
        formData.getAll("generationTypes").includes(type)
      ),
      mutationTypes: mutationTypes.filter((type) =>
        formData.getAll("mutationTypes").includes(type)
      ),
      timer: formData.get("timer"),
    };

    // const params = new URLSearchParams(searchParams);
    // Object.entries(configs).forEach(([key, value]) => {
    //   params.set(key, String(value));
    // });
    // router.push(`/exercises/comparison/questions?${params.toString()}`);
  }

  return (
    <MainSection className="gap-6">
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

      <div>
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
      </div>

      <HowToCard />

      <div className="mx-auto">
        <Link href="/exercises/comparison/questions">
          <Button>Start Exercise</Button>
        </Link>
      </div>
    </MainSection>
  );
}
