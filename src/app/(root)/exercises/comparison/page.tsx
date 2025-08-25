"use client";

import { Card, Button, Input, Checkbox } from "@/components/ui";
import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";
import HowToCard from "@/components/exercise/comparison/HowToCard";

import { GenerationType, MutationType } from "@/types/exercises/comparison";

import { Info, Wrench } from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";

export default function ComparisonExerciseMainPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // {
  //   count: 5,
  //   length: 5,
  //   minMutation: 0,
  //   maxMutation: 6,
  //   generationTypes: Object.values(GenerationType),
  //   mutationTypes: Object.values(MutationType),
  //   timer: 300,
  // }

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

    const params = new URLSearchParams(searchParams);
    Object.entries(configs).forEach(([key, value]) => {
      params.set(key, String(value));
    });
    router.push(`/exercises/comparison/questions?${params.toString()}`);
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

      <div className="mb-8">
        <h2 className="mb-4 flex items-center gap-2">
          <Wrench className="w-8 h-8" />
          Configuration
        </h2>
        <p>
          Configure your exercise settings and challenge yourself. You can
          adjust the number of questions, sequence length, mutation range, types
          of generation and mutation, and even set a timer.
        </p>
      </div>

      <Card size="lg" className="space-y-6 bg-background-secondary">
        <h3 className="text-2xl font-semibold">Configure Exercise</h3>

        <form
          onSubmit={handleStart}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <label className="flex flex-col">
            Number of Questions
            <Input
              name="count"
              type="number"
              min={1}
              max={10}
              defaultValue={5}
            />
          </label>

          <label className="flex flex-col">
            Sequence Length
            <Input
              name="length"
              type="number"
              min={1}
              max={10}
              defaultValue={5}
            />
          </label>

          <label className="flex flex-col">
            Minimum Mutations
            <Input name="minMutation" type="number" min={0} defaultValue={0} />
          </label>

          <label className="flex flex-col">
            Maximum Mutations
            <Input name="maxMutation" type="number" min={0} defaultValue={6} />
          </label>

          <div className="flex flex-col md:col-span-2">
            Generation Types
            <div className="flex flex-wrap gap-2 mt-1">
              {Object.values(GenerationType).map((type) => (
                <Checkbox
                  key={type}
                  name="generationTypes"
                  value={type}
                  label={type}
                  defaultChecked={true}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col md:col-span-2">
            Mutation Types
            <div className="flex flex-wrap gap-2 mt-1">
              {Object.values(MutationType).map((type) => (
                <Checkbox
                  key={type}
                  name="mutationTypes"
                  value={type}
                  label={type}
                  defaultChecked={true}
                />
              ))}
            </div>
          </div>

          <label className="flex flex-col">
            Timer (seconds)
            <Input
              name="timer"
              type="number"
              min={10}
              max={10_000}
              defaultValue={300}
            />
          </label>

          {/* Start Button */}
          <div className="flex justify-center">
            <Button type="submit" variant="primary" size="lg">
              Start Exercise
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
