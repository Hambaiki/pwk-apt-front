import { clsx } from "clsx";

import { FaGear } from "react-icons/fa6";

export default function Logo({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      id="navbar"
      className={clsx(`flex items-center font-bold text-xl`, className)}
    >
      <FaGear className="inline-block mr-2 text-primary-500" />
      <span className="hidden sm:block">APTITUDE EXERCISE</span>
    </div>
  );
}
