import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import { clsx } from "clsx";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PWK APT PRACTICE",
  description: "A collection of PWK APT practice questions and solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(montserrat.className)}>{children}</body>
    </html>
  );
}
