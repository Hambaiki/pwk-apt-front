"use client";

import { Card, Button } from "@/components/ui";
import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";
import HowToCard from "@/components/exercise/comparison/HowToCard";

import { GenerationType, MutationType } from "@/types/exercises/comparison";

import { Info } from "lucide-react";

import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <div className="flex flex-col max-w-7xl mx-auto p-6 space-y-6">
      <Breadcrumb>
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Exercises" href="/exercises" />
        <BreadcrumbItem label="Comparison" href="/exercises/comparison" />
      </Breadcrumb>

      {/* Header */}
      <Card className="p-20 rounded-xl bg-gradient-to-br from-primary-800 to-primary-600 shadow-md">
        <h1 className="mb-2 text-white">Comparison Exercise</h1>
        <p className="text-gray-100">
          Compare 2 values and determine whether they are the same or not.
        </p>
      </Card>

      <div className="mb-8">
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

      {/* Instructions */}
      <HowToCard />

      <div className="mx-auto">
        <Link href="/exercises/comparison/questions">
          <Button>Start Exercise</Button>
        </Link>
      </div>
    </div>
  );
}
