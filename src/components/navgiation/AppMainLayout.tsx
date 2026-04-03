"use client";

import { AppSidebarLayout } from "@/components/navgiation/AppLayout";
import { FOOTER_SECTIONS, NAV_SECTIONS } from "@/constants/navbar";
import { getBreadcrumbs } from "@/libs/navbar";

interface AdminSidebarLayoutProps {
  children: React.ReactNode;
}

export function AppMainLayout({ children }: AdminSidebarLayoutProps) {
  return (
    <AppSidebarLayout
      navSections={NAV_SECTIONS}
      getBreadcrumbs={getBreadcrumbs}
      footerSections={FOOTER_SECTIONS}
    >
      {children}
    </AppSidebarLayout>
  );
}
