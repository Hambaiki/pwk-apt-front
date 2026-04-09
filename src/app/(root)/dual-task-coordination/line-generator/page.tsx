import MainSection from "@/components/content/MainSection";
import { PageHeader } from "@/components/content/PageHeader";
import {
  SectionCard,
  SectionCardBody,
  SectionCardHeader,
} from "@/components/content/SectionCard";
import NodeLines from "@/features/dual-task-coordination/components/NodeLines";

const DualTaskCoordinationPage = () => {
  return (
    <MainSection>
      <section className="space-y-8">
        <PageHeader
          title="Dual Task Line Generator"
          description="Generate reusable line patterns for dual-task coordination drills and export them as images for practice sessions."
          backHref="/dual-task-coordination"
          backLabel="Back to Dual Task Coordination"
        />

        <SectionCard className="bg-surface">
          <SectionCardHeader
            title="Generator Overview"
            description="Create line templates that match your training goals."
          />
          <SectionCardBody>
            <p>
              Use this tool to build custom line sets for printable or on-screen
              dual-task practice. Tune spacing, direction, shape style, and
              visual variation to simulate easier or more demanding tracking
              patterns.
            </p>
          </SectionCardBody>
        </SectionCard>

        <SectionCard className="bg-surface">
          <SectionCardHeader
            title="How to Use"
            description="Recommended workflow for generating practice-ready lines."
          />
          <SectionCardBody>
            <ol className="list-inside list-disc space-y-2 text-sm text-neutral-700">
              <li>
                Adjust orientation, shape set, color set, and spacing settings
                to match the exercise difficulty you want.
              </li>
              <li>
                Click <strong>Generate</strong> to preview a new line layout.
              </li>
              <li>
                Repeat until the preview looks right for your training purpose.
              </li>
              <li>
                Click <strong>Download</strong> to export the SVG preview as a
                PNG image.
              </li>
            </ol>
          </SectionCardBody>
        </SectionCard>

        <SectionCard className="bg-surface">
          <SectionCardHeader
            title="Configuration and Output"
            description="Set generator parameters, preview the result, and download when ready."
          />
          <SectionCardBody>
            <NodeLines />
          </SectionCardBody>
        </SectionCard>
      </section>
    </MainSection>
  );
};

export const metadata = {
  title: "Dual Task Coordination Line Generator | APT-PWK",
  description:
    "Generate custom dual task coordination lines for practice and training.",
  keywords: [
    "dual-task",
    "pwk-apt",
    "aptitude",
    "coordination",
    "line-generator",
  ],
};

export default DualTaskCoordinationPage;
