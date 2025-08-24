import { FaCogs } from "react-icons/fa";

import { cn } from "@/libs/utils";

import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"] });

export default function Logo({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div id="navbar" className={cn(`flex items-center`, className)}>
      <FaCogs className="inline-block text-primary-500 h-8 w-8" />
      <span
        className={cn(`ml-1 hidden sm:block text-3xl font-bold`, caveat.className)}
      >
        AptEx
      </span>
    </div>
  );
}
