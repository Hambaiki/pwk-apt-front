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

import { PenSquareIcon } from "lucide-react";

import Link from "next/link";

export default function HomePage() {
  return (
    <MainSection className="space-y-20">
      <div className="py-12">
        <h1 className="text-5xl">Start Sharpening Your Aptitude Skills</h1>
        <p className="text-lg">
          Refine your aptitude skills with interactive exercises and challenges.
        </p>
        <div className="flex gap-4 max-w-xl mt-4">
          <Link href="/exercises">
            <Button variant="primary">Start Practicing</Button>
          </Link>

          <Link href="/about">
            <Button variant="secondary">About</Button>
          </Link>
        </div>
      </div>

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
            <PenSquareIcon className="w-6 h-6" />
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
