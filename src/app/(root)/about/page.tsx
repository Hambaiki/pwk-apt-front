import { Breadcrumb, BreadcrumbItem } from "@/components/navgiation/Breadcrumb";
import MainSection from "@/components/content/MainSection";
import { Card } from "@/components/ui";

const AboutPage = () => {
  return (
    <MainSection>
      <Breadcrumb className="mb-6">
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="About" href="/about" />
      </Breadcrumb>

      <Card className="p-20 mb-8 rounded-xl bg-gradient-to-br from-primary-800 to-primary-600 shadow-medium">
        <h1 className="mb-2 text-white">About Us</h1>
        <p className="text-gray-100">
          This platform is dedicated to helping you improve your aptitude
          skills.
        </p>
      </Card>

      <Card className="text-center p-10">
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
  title: "About | PWK-APT",
  description:
    "Learn more about PWK-APT, a platform dedicated to helping you improve your aptitude skills through interactive exercises.",
  keywords: ["about", "pwk-apt", "aptitude", "exercises"],
};

export default AboutPage;
