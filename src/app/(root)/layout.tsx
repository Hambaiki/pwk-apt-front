import Navbar from "@/components/navgiation/Navbar";

import { Bounce, Slide, ToastContainer } from "react-toastify";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full min-h-[100dvh]">
      <header className="z-[999] sticky top-0 w-full">
        <Navbar className="p-4 h-16 backdrop-blur" />
      </header>

      <main className="flex-1">{children}</main>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </div>
  );
}
