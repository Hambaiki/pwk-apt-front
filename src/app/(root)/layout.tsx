import Navbar from "@/components/navgiation/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full min-h-[100dvh] bg-gradient-to-br from-nile-blue-400 to-nile-blue-500">
      <header className="z-[999] sticky top-0 w-full p-4">
        <Navbar className="p-4 h-16 translucent-rounded-container" />
      </header>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
