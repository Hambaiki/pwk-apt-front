import { Tool, ToolTag } from "@/types/tools";

import { CircleQuestionMark, LineSquiggle } from "lucide-react";

export const tools: Tool[] = [
  {
    title: "Dual Task Coordination Line Generator",
    description:
      "Generate custom dual task coordination lines for practice and training.",
    href: "/tools/dual-task-coordination-line-generator",
    icon: LineSquiggle,
  },
  {
    title: "Coming Soon...",
    description: "More exercises are on the way!",
    href: "",
    icon: CircleQuestionMark,
    tag: ToolTag.ComingSoon,
  },
];
