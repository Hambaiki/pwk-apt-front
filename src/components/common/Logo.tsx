import { cn } from "@/libs/utils";

import { Cog } from "lucide-react";

export default function Logo({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div id="navbar" className={cn(`flex items-center`, className)}>
      <Cog className="inline-block text-primary-500 h-8 w-8" />
      <span className={cn(`ml-1 hidden sm:block text-3xl font-bold`)}>
        AptEx
      </span>
    </div>
  );
}
