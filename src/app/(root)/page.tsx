import ExerciseCard from "@/components/exercise/ExerciseCard";
import { Button } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import { exercises } from "@/contants/exercise";
import { benefits, howItWorks } from "@/contants/home";

import { Lightbulb, Target, BarChart, PenSquareIcon } from "lucide-react";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 p-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <Card className="p-20 mb-8 rounded-xl bg-gradient-to-br from-primary-800 to-primary-600 shadow-medium">
        <h1 className="mb-2 text-white">
          Start Sharpening Your Aptitude Skills
        </h1>
        <p className="text-gray-100">
          Refine your aptitude skills with interactive exercises and challenges.
          Choose a topic below to get started.
        </p>

        <div className="flex gap-4 max-w-xl mt-4">
          <Link href="/exercises">
            <Button variant="primary">Start Practicing</Button>
          </Link>

          <Link href="/about">
            <Button variant="secondary">About</Button>
          </Link>
        </div>
      </Card>

      {/* How It Works Section */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-semibold text-primary">How It Works</h2>
          <p className="text-text-secondary">
            Simple steps to improve your aptitude and problem-solving skills.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {howItWorks.map((item, i) => (
            <Card key={i} className="h-full text-center">
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
          <p className="text-text-secondary">
            Explore different areas to improve your skills.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises.map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
          ))}
        </div>
      </div>

      {/* Why Practice Section */}
      <div className="space-y-6 text-center">
        <h2 className="text-3xl font-semibold text-primary">
          Why Practice Here?
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Aptitude skills are essential for competitive exams, job interviews,
          and real-life problem solving. Consistent practice helps you stay
          sharp, confident, and ready for challenges.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          {benefits.map((item, i) => (
            <Card key={i} className="h-full text-center">
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
      <div className="text-center space-y-4 bg-primary text-white p-10 rounded-xl">
        <h2 className="text-3xl font-bold">Ready to Sharpen Your Skills?</h2>
        <p className="max-w-2xl mx-auto">
          Join thousands of learners and start your journey towards mastery
          today.
        </p>
        <Button size="lg" variant="secondary">
          Get Started Now
        </Button>
      </div>
    </div>
  );
}
