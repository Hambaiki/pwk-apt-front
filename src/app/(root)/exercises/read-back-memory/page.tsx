import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";
import {
  HeaderCard,
  HeaderCardDescription,
  HeaderCardTitle,
} from "@/components/content/HeaderCard";
import { Card } from "@/components/ui";
import MainSection from "@/components/content/MainSection";

const ReadBackMemoryPage = () => {
  return (
    <MainSection>
      <Breadcrumb>
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Exercise" href="/exercises" />
        <BreadcrumbItem
          label="Read Back Memory"
          href="/exercises/read-back-memory"
        />
      </Breadcrumb>

      <HeaderCard>
        <HeaderCardTitle>Read Back Memory</HeaderCardTitle>
        <HeaderCardDescription>
          Test your ability to remember and repeat back a sequence of numbers
          and letters.
        </HeaderCardDescription>
      </HeaderCard>

      <Card className="text-center p-4 py-20">
        <p>
          <strong>Coming Soon...</strong>
          <br />
          Stay tuned for updates!
        </p>
      </Card>
    </MainSection>
  );
};

export const metadata = {
  title: "Read Back Memory | APT-PWK",
  description:
    "Test your ability to remember and repeat back a sequence of numbers and letters.",
  keywords: ["about", "pwk-apt", "aptitude", "exercises"],
};

export default ReadBackMemoryPage;
