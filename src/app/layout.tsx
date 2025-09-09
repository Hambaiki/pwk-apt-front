import type { Metadata } from "next";
import { Montserrat, Sarabun, Kanit, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

import { clsx } from "clsx";

const noto = Noto_Sans_Thai({
  subsets: ["latin", "thai"], // Specify the required subsets
  weight: "variable", // Specify the desired weights
});

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
      <body className={clsx(noto.className)}>{children}</body>
    </html>
  );
}
