import { exercises } from "@/contants/exercise";

import Link from "next/link";

export default function TestPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center px-4 py-10">
        <h1 className="text-3xl text-jungle-green-500 font-bold">
          Welcome to Aptitude Practice Hub
        </h1>
        <p className="text-white mt-2">
          Sharpen your aptitude skills with interactive exercises and
          challenges. Choose a topic below to get started!
        </p>
      </div>

      <div className="translucent-rounded-container space-y-6 p-4">
        <div className="text-center">
          <h2 className="text-3xl text-jungle-green-500">Exercises</h2>
          <p>
            This is a list of exercises that you can do to improve your skills.
          </p>
        </div>

        {exercises.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className="flex flex-col items-center gap-2 p-4 rounded-lg"
          >
            <item.icon className="w-20 h-20" />
            <h2 className="text-2xl font-bold">{item.label}</h2>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
