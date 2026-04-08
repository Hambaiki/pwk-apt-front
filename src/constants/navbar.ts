import { exercises } from "@/constants/exercise";
import type {
  AppSidebarFooterSection,
  AppSidebarNavSection,
} from "@/types/navbar";
import type { LucideIcon } from "lucide-react";
import { Home, Info, LineSquiggle } from "lucide-react";

export const NAV_ITEMS: Record<
  string,
  {
    label: string;
    href: string;
    icon: LucideIcon;
    check: (path: string) => boolean;
  }
> = {
  home: {
    label: "Home",
    href: "/",
    icon: Home,
    check: (path: string) => path === "/",
  },
} as const;

export const ADDITIONAL_NAV_ITEMS: Record<
  string,
  {
    label: string;
    href: string;
    icon: LucideIcon;
    check: (path: string) => boolean;
  }
> = {
  about: {
    label: "About",
    href: "/about",
    icon: Info,
    check: (path: string) => path.startsWith("/about"),
  },
} as const;

const exerciseMap = new Map(
  exercises
    .filter((exercise) => Boolean(exercise.href))
    .map((exercise) => [exercise.href, exercise]),
);

const trainingCorePaths = ["/comparison", "/scanning", "/grid-memory"];
const trainingAdvancedPaths = [
  "/read-back-memory",
  "/flight-information",
  "/sequence-memory",
];

const toNavItem = (path: string) => {
  const exercise = exerciseMap.get(path);
  if (!exercise) return null;

  return {
    href: exercise.href,
    label: exercise.title,
    icon: exercise.icon as LucideIcon,
  };
};

const coreExerciseItems = trainingCorePaths
  .map(toNavItem)
  .filter(Boolean) as Array<{ href: string; label: string; icon: LucideIcon }>;

const advancedExerciseItems = trainingAdvancedPaths
  .map(toNavItem)
  .filter(Boolean) as Array<{ href: string; label: string; icon: LucideIcon }>;

const dualTaskItems = [
  {
    href: "/dual-task-coordination",
    label: "Dual Task Coordination",
    icon: exercises.find(
      (exercise) => exercise.href === "/dual-task-coordination",
    )?.icon as LucideIcon,
  },
  {
    href: "/dual-task-coordination/line-generator",
    label: "Line Generator",
    icon: LineSquiggle,
  },
];

export const ROUTE_LABELS: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/develop": "Develop Playground",
  "/privacy": "Privacy",
  "/terms": "Terms",
  "/comparison": "Comparison",
  "/comparison/print": "Printable Sheet",
  "/comparison/run": "Session",
  "/scanning": "Scanning Shapes",
  "/scanning/run": "Session",
  "/grid-memory": "Grid Memory",
  "/grid-memory/run": "Session",
  "/read-back-memory": "Read Back Memory",
  "/flight-information": "Flight Information Memory",
  "/sequence-memory": "Sequence Memory",
  "/dual-task-coordination": "Dual Task Coordination",
  "/dual-task-coordination/run": "Session",
  "/dual-task-coordination/line-generator": "Line Generator",
};

export const NAV_SECTIONS: AppSidebarNavSection[] = [
  {
    items: [
      {
        href: NAV_ITEMS.home.href,
        label: NAV_ITEMS.home.label,
        icon: NAV_ITEMS.home.icon,
        exact: true,
      },
    ],
  },
  {
    title: "Core Drills",
    items: coreExerciseItems,
  },
  {
    title: "Advanced Memory",
    items: advancedExerciseItems,
  },
  {
    title: "Dual Task Lab",
    items: dualTaskItems,
  },
];

export const FOOTER_SECTIONS: AppSidebarFooterSection[] = [
  {
    href: ADDITIONAL_NAV_ITEMS.about.href,
    label: ADDITIONAL_NAV_ITEMS.about.label,
    icon: ADDITIONAL_NAV_ITEMS.about.icon,
  },
];
