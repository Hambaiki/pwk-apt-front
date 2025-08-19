import clsx from "clsx";

export function cn(...classes: (string | undefined)[]) {
  return clsx(...classes);
}
