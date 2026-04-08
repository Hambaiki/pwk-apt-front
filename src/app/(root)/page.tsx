import { Logo } from "@/components/content/Logo";
import MainSection from "@/components/content/MainSection";
import ExerciseCard from "@/components/exercise/ExerciseCard";
import { Button, Card } from "@/components/ui";
import { exercises } from "@/constants/exercise";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <MainSection className="space-y-12 lg:space-y-16">
      <section className="rounded-3xl bg-linear-to-r from-brand-700 via-brand-600 to-brand-500 p-8 text-white shadow-strong md:p-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <Logo size={48} variant="full-light" />
          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
            Train Your Mind for the Skies
          </h1>
          <p className="max-w-2xl text-base text-brand-100 md:text-lg">
            Build speed, memory, and decision precision with one connected
            training library. Every exercise and dual-task module now sits in
            one streamlined flow.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/comparison">
              <Button
                variant="primary"
                className="bg-white text-brand-700 hover:bg-brand-50"
              >
                Start First Drill
              </Button>
            </Link>
            <Link href="/dual-task-coordination">
              <Button
                variant="outline"
                className="border-white/60 bg-white/10 text-white hover:bg-white/20"
              >
                Open Dual Task Lab
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-neutral-900">
            Practice Tracks
          </h2>
          <p className="text-neutral-700">
            Choose a track based on the skill you want to sharpen today.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="space-y-3 border-neutral-200 bg-surface">
            <h3 className="text-lg font-semibold text-neutral-900">
              Visual Speed
            </h3>
            <p className="text-neutral-700">
              Move fast through perception-heavy drills like Comparison and
              Scanning.
            </p>
            <Link
              href="/scanning"
              className="inline-flex items-center text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Go to Scanning <ArrowRight size={14} className="ml-1" />
            </Link>
          </Card>
          <Card className="space-y-3 border-neutral-200 bg-surface">
            <h3 className="text-lg font-semibold text-neutral-900">
              Memory Control
            </h3>
            <p className="text-neutral-700">
              Train recall and retention with Grid Memory, Read Back, and
              Sequence tasks.
            </p>
            <Link
              href="/grid-memory"
              className="inline-flex items-center text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Go to Grid Memory <ArrowRight size={14} className="ml-1" />
            </Link>
          </Card>
          <Card className="space-y-3 border-neutral-200 bg-surface">
            <h3 className="text-lg font-semibold text-neutral-900">
              Coordination Lab
            </h3>
            <p className="text-neutral-700">
              Practice split-attention performance and generate custom line
              patterns from one dual-task area.
            </p>
            <Link
              href="/dual-task-coordination"
              className="inline-flex items-center text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Go to Dual Task <ArrowRight size={14} className="ml-1" />
            </Link>
          </Card>
        </div>
      </section>

      {/* Exercises Section */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-neutral-900">
            Training Library
          </h2>
          <p className="text-neutral-700">
            Every active module is directly available in the sidebar and here on
            the home page.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises
            .filter((exercise) => Boolean(exercise.href))
            .map((exercise, index) => (
              <ExerciseCard key={index} exercise={exercise} />
            ))}
        </div>

        <Card className="flex flex-col gap-4 border-neutral-200 bg-surface md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-neutral-900">
              Dual Task Line Studio
            </h3>
            <p className="text-neutral-700">
              Build and export printable line sets without leaving the dual-task
              workflow.
            </p>
          </div>
          <Link href="/dual-task-coordination/line-generator">
            <Button variant="outline">
              Open Line Generator
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </Card>
      </div>
    </MainSection>
  );
}
