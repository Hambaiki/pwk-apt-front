import {
  HeaderCard,
  HeaderCardDescription,
  HeaderCardTitle,
} from "@/components/content/HeaderCard";
import MainSection from "@/components/content/MainSection";
import FlightInformationExercise from "@/features/flight-information/components/FlightInformationExercise";

const FlightInformationPage = () => {
  return (
    <MainSection>
      <HeaderCard>
        <HeaderCardTitle>Flight Information Memory</HeaderCardTitle>
        <HeaderCardDescription>
          Practice understanding and mentally calculating key details from short
          flight briefings, including arrival times and flight durations.
        </HeaderCardDescription>
      </HeaderCard>

      <FlightInformationExercise />
    </MainSection>
  );
};

export const metadata = {
  title: "Flight Information Memory | APT-PWK",
  description:
    "Practice understanding and mentally calculating key details from short flight briefings.",
  keywords: [
    "flight",
    "time calculation",
    "read-back",
    "pwk-apt",
    "aptitude",
    "exercises",
  ],
};

export default FlightInformationPage;
