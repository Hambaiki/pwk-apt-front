import MainSection from "@/components/content/MainSection";
import ExerciseCard from "@/components/exercise/ExerciseCard";
import { ToolCard } from "@/components/tool/ToolCard";
import { Button } from "@/components/ui";
import { exercises } from "@/constants/exercise";
import { tools } from "@/constants/tools";
import { Cog, PenSquareIcon } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <MainSection className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-500 px-6 py-10 shadow-medium sm:px-10">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-brand-300 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-brand-950/40 blur-3xl" />
        </div>

        <div className="relative flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="space-y-6 max-w-xl text-white">
            <h1 className="text-4xl text-white font-semibold leading-tight sm:text-5xl">
              Sharpen your aptitude with focused, realistic drills.
            </h1>
            <p className="text-sm text-brand-50/90 sm:text-base">
              Build exam-ready confidence with short, targeted exercises and
              tools that mirror real-world problem solving.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/exercises">
                <Button variant="primary">Start practicing</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Exercises Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="flex items-center gap-2">
            <PenSquareIcon size={30} />
            Exercises
          </h2>
          <p>Explore different areas to improve your skills.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises.slice(0, 6).map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/exercises">
            <Button variant="secondary">View All Exercises</Button>
          </Link>
        </div>
      </div>

      {/* Tools Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="flex items-center gap-2">
            <Cog size={30} />
            Tools
          </h2>
          <p>Collection of tools to assist you in your learning journey.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.slice(0, 6).map((tool, index) => (
            <ToolCard key={index} tool={tool} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/tools">
            <Button variant="secondary">View All Tools </Button>
          </Link>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-primary text-white p-10 rounded-xl">
        <h2>Ready to Sharpen Your Skills?</h2>
        <p className="max-w-2xl mx-auto">
          Start your journey towards mastery today.
        </p>

        <div className="mt-4">
          <Link href="/exercises">
            <Button variant="primary">Get Started Now</Button>
          </Link>
        </div>
      </div>
    </MainSection>
  );
}
