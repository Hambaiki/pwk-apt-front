import MainSection from "@/components/content/MainSection";
import { Card } from "@/components/ui";

const AboutPage = () => {
  return (
    <MainSection>
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
  title: "About | APT-PWK",
  description:
    "Learn more about APT-PWK, a platform dedicated to helping you improve your aptitude skills through interactive exercises.",
  keywords: ["about", "pwk-apt", "aptitude", "exercises"],
};

export default AboutPage;
