import MainSection from "@/components/content/MainSection";
import { PageHeader } from "@/components/content/PageHeader";
import { Card } from "@/components/ui";
import { Brain, Eye, Hand, LibraryBig, Radar } from "lucide-react";

const AboutPage = () => {
  return (
    <MainSection className="space-y-6">
      <PageHeader
        title="About PWK-APT"
        description="PWK-APT is an aviation aptitude training platform designed to help aspiring pilots build the cognitive skills needed for competitive selection and assessment."
      />

      <Card className="space-y-3">
        <h2 className="text-xl font-semibold text-neutral-900">
          Why Cognitive Training Matters
        </h2>
        <p>
          Aviation aptitude assessments evaluate how well you process
          information under pressure. Success is not only about technical
          knowledge, it is about attention control, memory strength, visual
          scanning, and coordination across multiple tasks.
        </p>
        <p>
          PWK-APT gives you repeatable, practical drills so you can train these
          skills intentionally and monitor your progress session by session.
        </p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
            <Eye size={20} />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900">Scanning</h3>
          <p>
            Improve speed and precision when searching for key visual details.
          </p>
        </Card>
        <Card className="space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
            <Brain size={20} />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900">Memory</h3>
          <p>
            Strengthen short-term retention and recall with structured
            exercises.
          </p>
        </Card>
        <Card className="space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
            <Hand size={20} />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900">
            Coordination
          </h3>
          <p>
            Build control across simultaneous tasks and timed decision-making.
          </p>
        </Card>
        <Card className="space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
            <Radar size={20} />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900">Readiness</h3>
          <p>
            Prepare with practice patterns aligned to aptitude test conditions.
          </p>
        </Card>
      </div>

      <Card className="space-y-3">
        <div className="flex items-center gap-2 text-brand-700">
          <LibraryBig size={18} />
          <h2 className="text-xl font-semibold text-neutral-900">
            Exercise Coverage
          </h2>
        </div>
        <p>
          The platform currently includes scanning, comparison, memory, and
          information-processing exercises. Each module emphasizes timed
          performance, immediate feedback, and consistent repetition so you can
          identify weak points and improve strategically.
        </p>
      </Card>
    </MainSection>
  );
};

export const metadata = {
  title: "About | APT-PWK",
  description:
    "Learn more about APT-PWK, a platform dedicated to helping you improve your aptitude skills through interactive exercises.",
  keywords: ["about", "pwk-apt", "aptitude", "exercises"],
};

export default AboutPage;
