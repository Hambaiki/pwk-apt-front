"use client";

import { isActiveNavItem } from "@/libs/navbar";
import { cn } from "@/libs/utils/cn";
import {
  AppSidebarFooterSection,
  AppSidebarNavSection,
  BreadcrumbItem,
} from "@/types/navbar";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "../ui";

interface AppSidebarLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  subtitle?: string;
  navSections: AppSidebarNavSection[];
  footerSections?: AppSidebarFooterSection[];
  getBreadcrumbs: (pathname: string) => BreadcrumbItem[];
}

export function AppSidebarLayout({
  subtitle,
  navSections,
  getBreadcrumbs,
  footerSections = [],
  children,
}: AppSidebarLayoutProps) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);
  const sidebarRef = useRef<HTMLElement | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [compactExpanded, setCompactExpanded] = useState(false);

  const isExpanded = compactExpanded;

  useEffect(() => {
    if (!compactExpanded) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (sidebarRef.current?.contains(target)) return;
      setCompactExpanded(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [compactExpanded]);

  const sidebarContent = (
    <div
      className={cn(
        "flex h-full flex-col bg-neutral-50",
        "transition",
        isExpanded && "shadow-xl xl:shadow-none",
      )}
    >
      <div
        className={cn(
          "flex h-14 items-center justify-between px-4 py-4",
          "border-b border-neutral-200",
        )}
      >
        <Link href="/" className="flex items-center gap-2">
          {/* <Logo variant="icon" size="sm" /> */}
          <div
            className={cn(
              "overflow-hidden whitespace-nowrap text-lg font-black uppercase tracking-widest md:max-w-40 md:opacity-100",
              "transition-[max-width,opacity] duration-200 ease-out",
              !isExpanded &&
                "md:max-w-0 md:opacity-0 xl:max-w-40 xl:opacity-100",
            )}
          >
            {/* <Logo variant="text-dark" className="h-auto w-20" /> */}
          </div>

          <p
            className={cn(
              "mt-1 overflow-hidden whitespace-nowrap text-sm font-medium text-neutral-600",
              "transition-[max-width,opacity] duration-200 ease-out",
              !isExpanded &&
                "md:max-w-0 md:opacity-0 xl:max-w-40 xl:opacity-100",
            )}
          >
            {subtitle}
          </p>
        </Link>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => setSidebarOpen(false)}
          className="text-white md:hidden"
          aria-label="Close menu"
        >
          <X size={22} />
        </Button>
      </div>

      <div
        className={cn(
          "hidden p-2 md:block xl:hidden",
          "border-b border-neutral-200",
        )}
      >
        <Button
          type="submit"
          variant="ghost"
          onClick={() => setCompactExpanded((prev) => !prev)}
          aria-label="Collapse sidebar"
          className="h-auto w-full justify-start gap-3 px-3 py-3"
        >
          {compactExpanded ? (
            <ChevronLeft size={22} className="shrink-0" />
          ) : (
            <ChevronRight size={22} className="shrink-0" />
          )}
          <span
            className={cn(
              "overflow-hidden whitespace-nowrap md:max-w-40 md:opacity-100",
              "transition-[max-width,opacity] duration-200 ease-out",
              !isExpanded &&
                "md:max-w-0 md:opacity-0 xl:max-w-40 xl:opacity-100",
            )}
          >
            {compactExpanded ? "Collapse" : "Expand"}
          </span>
        </Button>
      </div>

      <nav
        className={cn("flex-1 space-y-4 overflow-y-auto scrollbar-none p-2")}
      >
        {navSections.map((section, index) => (
          <div key={section.title ?? `section-${index}`}>
            {section.title ? (
              <p
                className={cn(
                  "overflow-hidden whitespace-nowrap px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500 md:min-h-5 md:opacity-100",
                  "transition-opacity duration-200 ease-out",
                  !isExpanded && "md:opacity-0 xl:opacity-100",
                )}
              >
                {section.title}
              </p>
            ) : null}
            <div className={cn("space-y-1")}>
              {section.items.map(({ href, label, icon: Icon, exact }) => {
                const active = isActiveNavItem(pathname, {
                  href,
                  label,
                  icon: Icon,
                  exact,
                });

                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    aria-label={label}
                    title={label}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-3 font-medium text-sm text-neutral-700",
                      "hover:bg-neutral-600/10 active:bg-brand-600/20",
                      active && "bg-brand-600 hover:bg-brand-600 text-white",
                      "transition-colors duration-200 ease-out",
                    )}
                  >
                    <Icon size={22} className="shrink-0" />
                    <span
                      className={cn(
                        "overflow-hidden whitespace-nowrap md:max-w-40 md:opacity-100",
                        "transition-[max-width,opacity] duration-200 ease-out",
                        !isExpanded &&
                          "md:max-w-0 md:opacity-0 xl:max-w-40 xl:opacity-100",
                      )}
                    >
                      {label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {footerSections.length > 0 && (
        <div className={cn("p-2", "border-t border-neutral-200")}>
          {footerSections.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              aria-label={label}
              title={label}
              className={cn(
                "flex items-center gap-3 rounded-md p-3 font-medium text-sm text-neutral-700",
                "hover:bg-neutral-600/10 active:bg-brand-600/20",
                "transition-colors duration-200 ease-out",
              )}
            >
              <Icon size={22} className="shrink-0" />
              <span
                className={cn(
                  "overflow-hidden whitespace-nowrap md:max-w-40 md:opacity-100",
                  "transition-[max-width,opacity] duration-200 ease-out",
                  !isExpanded &&
                    "md:max-w-0 md:opacity-0 xl:max-w-40 xl:opacity-100",
                )}
              >
                {label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={cn(
        "min-h-dvh overflow-hidden bg-neutral-100 text-neutral-900",
      )}
    >
      <aside
        ref={sidebarRef}
        className={cn(
          "hidden border-r border-neutral-200 bg-neutral-50 md:fixed md:inset-y-0 md:left-0 md:z-30 md:flex md:flex-col md:w-16 xl:w-56 md:transition-[width] md:duration-300 md:ease-in-out",
          isExpanded && "md:w-56",
        )}
      >
        {sidebarContent}
      </aside>

      <div
        className={cn(
          "fixed inset-0 z-40 flex md:hidden",
          sidebarOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!sidebarOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-neutral-900/40 ",
            "transition-opacity duration-200 ease-out",
            sidebarOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setSidebarOpen(false)}
        />
        <aside
          className={cn(
            "relative z-50 flex w-64 flex-col bg-neutral-50 shadow-xl",
            "transition-transform duration-250 ease-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {sidebarContent}
        </aside>
      </div>

      <div
        className={cn(
          "flex h-dvh min-w-0 flex-1 flex-col pt-14 md:pl-16 xl:pl-56",
        )}
      >
        <header
          className={cn(
            "fixed inset-x-0 top-0 z-20 flex h-14 items-center gap-3 border-b border-neutral-200 bg-neutral-50 px-6 md:right-0 md:left-16 xl:left-56",
          )}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => setSidebarOpen(true)}
            className="text-neutral-700 md:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </Button>

          {breadcrumbs.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className={cn("flex min-w-0 flex-1 items-center gap-1 text-sm")}
            >
              {breadcrumbs.map((crumb, index) => (
                <Fragment key={index}>
                  {index > 0 && (
                    <ChevronRight
                      size={16}
                      className="shrink-0 text-neutral-700/70"
                    />
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className={cn(
                        "truncate text-neutral-500 hover:text-neutral-500/80",
                        "transition-colors duration-200 ease-out",
                        index === breadcrumbs.length - 1 &&
                          "font-semibold text-neutral-700",
                        "capitalize",
                      )}
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      className={cn(
                        "truncate text-neutral-500",
                        index === breadcrumbs.length - 1 &&
                          "font-semibold text-neutral-700",
                        "capitalize",
                      )}
                    >
                      {crumb.label}
                    </span>
                  )}
                </Fragment>
              ))}
            </nav>
          )}
        </header>

        <main className={cn("flex-1 flex flex-col overflow-y-auto p-4 lg:p-6")}>
          {children}
        </main>
      </div>
    </div>
  );
}
