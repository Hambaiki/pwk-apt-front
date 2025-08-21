import { clsx } from "clsx";

import { FaCogs } from "react-icons/fa";

export default function Logo({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div id="navbar" className={clsx(`flex items-center`, className)}>
      <FaCogs className="inline-block mr-2 text-primary-500 h-8 w-8" />
      {/* <span className="hidden sm:block">APTITUDE EXERCISE</span> */}
    </div>
  );
}
