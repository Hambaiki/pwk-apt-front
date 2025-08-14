import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100dvh)]">
      <h1 className="text-center mb-4">Page Not Found</h1>
      <p className="text-center text-xl mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="text-center text-lg text-jungle-green-500 hover:underline"
      >
        Go back home
      </Link>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "404 - Page Not Found",
    description: "The page you are looking for does not exist.",
    keywords: ["404", "Page Not Found"],
    robots: "noindex, nofollow",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/404`,
    },
  };
}
