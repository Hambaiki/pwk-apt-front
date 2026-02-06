import ExerciseCard from "@/components/exercise/ExerciseCard";
import MainSection from "@/components/content/MainSection";
import {
  HeaderCard,
  HeaderCardDescription,
  HeaderCardTitle,
} from "@/components/content/HeaderCard";
import { Button } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import { exercises } from "@/constants/common/exercise";
import { benefits, howItWorks } from "@/constants/home";

import { Cog, PenSquareIcon } from "lucide-react";

import Link from "next/link";
import { ToolCard } from "@/components/tool/ToolCard";
import { tools } from "@/constants/tools";

export default function HomePage() {
  return (
    <MainSection className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-800 via-primary-700 to-primary-500 px-6 py-10 shadow-medium sm:px-10">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-primary-300 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-primary-950/40 blur-3xl" />
        </div>

        <div className="relative flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="space-y-6 max-w-xl text-white">
            <p className="inline-flex items-center gap-2 rounded-full bg-black/20 px-4 py-1 text-xs font-semibold tracking-wide uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Designed for aviation aptitude practice
            </p>
            <h1 className="text-4xl text-white font-semibold leading-tight sm:text-5xl">
              Sharpen your aptitude with focused, realistic drills.
            </h1>
            <p className="text-sm text-primary-50/90 sm:text-base">
              Build exam-ready confidence with short, targeted exercises and
              tools that mirror real-world problem solving.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/exercises">
                <Button variant="primary" className="shadow-lg shadow-black/30">
                  Start practicing
                </Button>
              </Link>

              <Link href="/about">
                <Button
                  variant="secondary"
                  className="border border-white/40 bg-white/10 text-white hover:bg-white/20"
                >
                  Learn how it works
                </Button>
              </Link>
            </div>

            <dl className="mt-4 flex flex-wrap gap-6 text-xs text-primary-100/90 sm:text-sm">
              <div className="space-y-1">
                <dt className="font-semibold">Exercises</dt>
                <dd>{exercises.length}+ focused practice modules</dd>
              </div>
              <div className="space-y-1">
                <dt className="font-semibold">Session length</dt>
                <dd>Perfect for 5–15 minute drills</dd>
              </div>
              <div className="space-y-1">
                <dt className="font-semibold">Best used for</dt>
                <dd>Competitive exams, assessments, and recurrent training</dd>
              </div>
            </dl>
          </div>

          {/* <div className="relative mt-4 w-full max-w-md md:mt-0">
            <Card className="border-none bg-white/10 text-white backdrop-blur-md shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                  <span className="text-white">Jump back in</span>
                  <PenSquareIcon className="h-5 w-5 text-primary-100" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-primary-50 sm:text-sm">
                <p className="text-primary-50/90">
                  Choose a quick exercise to warm up before a longer study
                  session.
                </p>
                <div className="space-y-2">
                  <Link
                    href="/exercises/flight-information"
                    className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2 text-left text-xs transition hover:bg-white/20 sm:text-sm"
                  >
                    <span className="font-medium">
                      Flight Information Memory
                    </span>
                    <span className="rounded-full bg-black/20 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                      5–8 min
                    </span>
                  </Link>
                  <Link
                    href="/exercises/grid-memory"
                    className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2 text-left text-xs transition hover:bg-white/20 sm:text-sm"
                  >
                    <span className="font-medium">Grid Memory</span>
                    <span className="rounded-full bg-black/20 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                      Visual recall
                    </span>
                  </Link>
                  <Link
                    href="/exercises/dual-task-coordination"
                    className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2 text-left text-xs transition hover:bg-white/20 sm:text-sm"
                  >
                    <span className="font-medium">Dual-Task Coordination</span>
                    <span className="rounded-full bg-black/20 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                      Advanced
                    </span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </section>

      {/* Hero Section */}
      {/* <HeaderCard className="p-20 rounded-xl bg-gradient-to-br from-primary-600 to-primary-400 shadow-medium">
        <HeaderCardTitle className="mb-2 text-white">
          Start Sharpening Your Aptitude Skills
        </HeaderCardTitle>
        <HeaderCardDescription className="text-gray-100">
          Refine your aptitude skills with interactive exercises and challenges.
          Choose a topic below to get started.
        </HeaderCardDescription>
        <div className="flex gap-4 max-w-xl mt-4">
          <Link href="/exercises">
            <Button variant="primary">Start Practicing</Button>
          </Link>

          <Link href="/about">
            <Button variant="secondary">About</Button>
          </Link>
        </div>
      </HeaderCard> */}

      {/* How It Works Section */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2>How It Works</h2>
          <p>
            Simple steps to improve your aptitude and problem-solving skills.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {howItWorks.map((item, i) => (
            <Card
              key={i}
              className="h-full text-center bg-background-secondary"
            >
              <CardHeader className="flex flex-col items-center space-y-3">
                <item.icon className="w-12 h-12 text-primary" />
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

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

      {/* Why Practice Section */}
      <div className="space-y-6 text-center">
        <h2>Why Practice Here?</h2>
        <p className="mx-auto">
          Aptitude skills are essential for competitive exams, job interviews,
          and real-life problem solving. Consistent practice helps you stay
          sharp, confident, and ready for challenges.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          {benefits.map((item, i) => (
            <Card
              key={i}
              className="h-full text-center bg-background-secondary"
            >
              <CardHeader className="flex flex-col items-center space-y-3">
                <item.icon className="w-12 h-12 text-primary" />
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary">{item.description}</p>
              </CardContent>
            </Card>
          ))}
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
