import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

import { clsx } from "clsx";

const noto = Noto_Sans_Thai({
  subsets: ["latin", "thai"], // Specify the required subsets
  weight: "variable", // Specify the desired weights
});

export const metadata: Metadata = {
  title: "APT-PWK - Practice Your Aptitude Skills",
  description: "Sharpen your mind with interactive exercises.",
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
