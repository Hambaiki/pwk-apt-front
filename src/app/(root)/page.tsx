import { exercises } from "@/contants/exercise";
import Link from "next/link";
import { Button } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Lightbulb, Target, BarChart, PenSquareIcon } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 px-4 py-10 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary">
          Start Sharpening Your Aptitude Skills
        </h1>

        <p className="text-text-secondary max-w-2xl mx-auto mt-2">
          Refine your aptitude skills with interactive exercises and challenges.
          Choose a topic below to get started.
        </p>

        <div className="max-w-xl mx-auto mt-4">
          <Link href="/exercises">
            <Button size="lg" variant="primary">
              Start Practicing
            </Button>
          </Link>

          {/* <Button size="lg" variant="secondary">
            Learn More
          </Button> */}
        </div>
      </div>

      {/* How It Works Section */}
      <Card size="lg" className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-semibold text-primary">How It Works</h2>
          <p className="text-text-secondary">
            Simple steps to improve your aptitude and problem-solving skills.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Lightbulb,
              title: "Choose a Topic",
              desc: "Pick an exercise you would like to practice.",
            },
            {
              icon: Target,
              title: "Practice Exercises",
              desc: "Solve interactive questions and track your progress instantly.",
            },
            {
              icon: BarChart,
              title: "Track Growth",
              desc: "Review performance analytics to identify strengths and weaknesses.",
            },
          ].map((step, i) => (
            <Card key={i} className="h-full text-center">
              <CardHeader className="flex flex-col items-center space-y-3">
                <step.icon className="w-12 h-12 text-primary" />
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>

      {/* Exercises Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <PenSquareIcon className="w-5 h-5" />
            Exercises
          </h3>
          <p className="text-text-secondary">
            Explore different areas to improve your skills.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exercises.map((item) => (
            <Link href={item.href} key={item.label}>
              <Card className="h-full">
                <CardHeader className="flex flex-col items-center space-y-3">
                  <item.icon className="w-16 h-16 text-primary transition-transform" />
                  <CardTitle className="text-xl font-semibold text-center">
                    {item.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary text-center">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Why Practice Section */}
      <Card size="lg" className="space-y-6 text-center">
        <h2 className="text-3xl font-semibold text-primary">
          Why Practice Here?
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Aptitude skills are essential for competitive exams, job interviews,
          and real-life problem solving. Consistent practice helps you stay
          sharp, confident, and ready for challenges.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Card className="p-6 w-60">
            <p className="font-semibold text-lg text-primary">
              🎯 Job Readiness
            </p>
            <p className="text-text-secondary">
              Excel in interviews & assessments.
            </p>
          </Card>
          <Card className="p-6 w-60">
            <p className="font-semibold text-lg text-primary">📚 Exam Prep</p>
            <p className="text-text-secondary">
              Boost scores in competitive exams.
            </p>
          </Card>
          <Card className="p-6 w-60">
            <p className="font-semibold text-lg text-primary">
              💡 Daily Growth
            </p>
            <p className="text-text-secondary">
              Enhance logical & analytical thinking.
            </p>
          </Card>
        </div>
      </Card>

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
