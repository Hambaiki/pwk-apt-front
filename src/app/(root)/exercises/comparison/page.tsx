import ComparisonExercise from "@/components/navgiation/comparison/ComparisonExercise";

import { generateComparisonExercise } from "@/utils/comparison/question";
import {
  generateBaseSamples,
  generateComparisonPairsWithBase,
} from "@/utils/comparison/algorithm";

export default function ComparisonTestPage() {
  const baseSamples = generateBaseSamples(10);
  const examples: [string, string][] =
    generateComparisonPairsWithBase(baseSamples);

  const results = generateComparisonExercise(examples);

  return (
    <div>
      <ComparisonExercise questions={results} />
    </div>
  );
}

export const metadata = {
  title: "Comparison Exercise",
  description: "Comparison Exercise",
  keywords: "A ",
  authors: [{ name: "Pavarit Wiriyakunakorn", url: "https://yourwebsite.com" }],
  creator: "Pavarit Wiriyakunakorn",
  publisher: "Pavarit Wiriyakunakorn",
  openGraph: {
    title: "Comparison Exercise",
    description: "Comparison Exercise",
    url: "https://yourwebsite.com/comparison-test",
    siteName: "Your Website",
    // images: [
    //   {
    //     url: "https://yourwebsite.com/image.png",
    //     width: 800,
    //     height: 600,
    //     alt: "Comparison Exercise Image",
    //   },
    // ],
  },
};
