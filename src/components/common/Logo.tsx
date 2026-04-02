import { cn } from "@/libs/utils/cn";

export default function Logo({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div id="navbar" className={cn(`flex items-center`, className)}>
      {/* <Cog className="inline-block text-primary-500 h-8 w-8" /> */}
      <span className={cn(`text-2xl font-bold`)}>APT-PWK</span>
    </div>
  );
}
