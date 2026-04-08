import { ReadBackMemoryContent } from "@/features/read-back-memory/ReadBackMemoryContent";

export const metadata = {
  title: "Read Back Memory | APT-PWK",
  description:
    "Test your ability to remember and repeat back a sequence of numbers and letters.",
  keywords: ["read-back", "memory", "pwk-apt", "aptitude", "exercises"],
};

export default function ReadBackMemoryPage() {
  return <ReadBackMemoryContent />;
}
