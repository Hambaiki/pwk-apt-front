import Navbar from "@/components/navgiation/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full min-h-[100dvh]">
      <header className="fixed w-full">
        <Navbar className="p-4 h-16 shadow-xl" />
      </header>

      <main className="flex-1 mt-16">{children}</main>
    </div>
  );
}
