import { GenericNavigationItem } from "@/types";

export enum ToolTag {
  New = "new",
  UnderDevelopment = "under-development",
  ComingSoon = "coming-soon",
}

export interface Tool extends GenericNavigationItem<ToolTag> {}
