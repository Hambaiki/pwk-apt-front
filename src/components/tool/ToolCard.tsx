import { Card } from "@/components/ui";
import { cn } from "@/libs/utils/cn";
// import { exerciseTagMap } from "@/constants/common/exercise";

import { Tool } from "@/types/tools";

import Link from "next/link";

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <Link
      href={tool.href}
      className={cn(tool.href ? "" : "pointer-events-none opacity-50")}
    >
      <Card
        size="lg"
        className="group p-0 h-full overflow-hidden transition-shadow"
      >
        <div className="relative flex items-center justify-center h-56 w-full bg-gradient-to-br from-brand-500 to-brand-400">
          <tool.icon className="group-hover:scale-110 transition-transform duration-300 w-32 h-32 text-white" />
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{tool.title}</h2>
          <p className="text-gray-700 mb-3">{tool.description}</p>
        </div>
      </Card>
    </Link>
  );
};

export default ToolCard;
