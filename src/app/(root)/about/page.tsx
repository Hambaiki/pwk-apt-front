import { Card } from "@/components/ui";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 p-6 max-w-7xl mx-auto">
      <Card className="p-20 mb-8 rounded-xl bg-gradient-to-br from-primary-800 to-primary-600 shadow-medium">
        <h1 className="mb-2 text-white">About Us</h1>
        <p className="text-gray-100">
          This platform is dedicated to helping you improve your aptitude
          skills.
        </p>
      </Card>
    </div>
  );
}
