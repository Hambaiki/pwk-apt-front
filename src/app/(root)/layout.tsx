import Navbar from "@/components/navgiation/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full min-h-[100dvh]">
      <header className="z-[999] sticky top-0 w-full">
        <Navbar className="p-4 h-16 bg-background-primary" />
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
