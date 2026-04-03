"use client";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100dvh)]">
      <h1 className="text-center mb-4">An error has occurred</h1>
      <p className="text-center mb-6">
        Sorry, something must have gone wrong. Please try again later.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="text-center text-brand-500"
      >
        Refresh
      </button>
    </div>
  );
}
