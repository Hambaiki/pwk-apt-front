"use client";

import Main from "@/components/layout/Main";
import Input from "@/components/ui/Input";
import Breadcrumbs from "@/components/navgiation/Breadcrumbs";

import { useRouter } from "next/navigation";

export default function ComparisonExerciseConfigPage() {
  const router = useRouter();
  // const handleStart = ({ count }: { count: number }) => {
  //   const baseSamples = generateBaseSamples(count);
  //   const examples: [string, string][] =
  //     generateComparisonPairsWithBase(baseSamples);

  //   const questions = generateComparisonExercise(examples);

  //   console.log("Generated Questions:", questions);

  //   const shuffled = [...questions].sort(() => Math.random() - 0.5);
  //   const selected = shuffled.slice(0, count);
  // };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const count = parseInt(formData.get("totalCount") as string, 10);
    const time = parseInt(formData.get("timeLimit") as string, 10) || null;

    // Here you would typically handle the start of the exercise
    console.log("Starting exercise with count:", count, "and time:", time);

    const urlSearchParams = new URLSearchParams();
    if (count) urlSearchParams.append("totalCount", count.toString());
    if (time) urlSearchParams.append("timeLimit", time.toString());

    // Redirect or update state to start the exercise
    router.push(`/exercises/comparison?${urlSearchParams.toString()}`);
  }

  return (
    <Main className="space-y-4">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Exercise", href: "/exercises" },
          { label: "Comparison", href: "/exercises/comparison" },
          { label: "Configure", href: "/exercises/comparison/configure" },
        ]}
      />

      <form
        onSubmit={handleSubmit}
        className="translucent-rounded-container p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Configure Exercise</h2>

        <div className="space-y-2">
          <label className="block">
            Number of questions:
            <Input
              name="totalCount"
              type="number"
              min={1}
              max={20}
              className="mt-1 block w-full border rounded px-3 py-1"
            />
          </label>

          <label className="block">
            Time limit (minutes, optional):
            <Input
              name="timeLimit"
              type="number"
              min={0}
              placeholder="e.g., 5"
              className="mt-1 block w-full border rounded px-3 py-1"
            />
          </label>
        </div>

        <div className="text-center mt-4">
          <button className="px-6 py-2 rounded-full">Start Exercise</button>
        </div>
      </form>
    </Main>
  );
}
