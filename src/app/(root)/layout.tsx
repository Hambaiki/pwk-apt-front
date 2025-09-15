import { Footer } from "@/components/navgiation/Footer";
import Navbar from "@/components/navgiation/Navbar";

import { Slide, ToastContainer } from "react-toastify";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full min-h-[100dvh]">
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur">
        <Navbar className="py-3 px-6" />
      </header>

      <div className="flex-1">{children}</div>

      <Footer className="border-t bg-background-primary" />

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
