import { Card } from "@/components/ui";

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-col p-6 max-w-7xl mx-auto">
      <Card className="p-20 mb-8 rounded-xl bg-gradient-to-br from-primary-800 to-primary-600 shadow-medium">
        <h1 className="mb-2 text-white">Privacy Policy</h1>
        <p className="text-gray-100 mt-1">
          <strong>Effective Date: </strong>
          {new Date("2025-08-24").toLocaleDateString()}
        </p>
        <p className="text-gray-200 mt-2">
          This Privacy Policy describes how this website collects, uses, and
          protects the personal information of users (“you”) when you use our
          website and services.
        </p>
      </Card>

      <section className="space-y-4">
        <h2 id="info-collect">1. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Personal Information:</strong> such as your name, email
            address, or account details if you register.
          </li>
          <li>
            <strong>Usage Data:</strong> including pages visited, time spent on
            the site, device/browser type, and IP address.
          </li>
          <li>
            <strong>Cookies:</strong> to improve user experience and analyze
            site traffic.
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Provide and improve our services.</li>
          <li>
            Personalize your experience, send important updates, newsletters, or
            promotional material (you may opt out).
          </li>
          <li>Monitor site performance and prevent misuse.</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>
          We do not sell, rent, or share your personal information with third
          parties, except:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>When required by law.</li>
          <li>
            With trusted service providers who help us operate the site (e.g.,
            hosting, analytics).
          </li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We use reasonable security measures to protect your personal data.
          However, no method of transmission over the internet is 100% secure.
        </p>

        <h2>5. Your Rights</h2>
        <p>You may request to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Access, update, or delete your personal data.</li>
          <li>Opt out of marketing communications.</li>
          <li>Disable cookies in your browser settings.</li>
        </ul>

        <h2>6. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Updates will be
          posted on this page with a new effective date.
        </p>

        <h2>7. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at:{" "}
          <a href="mailto:-" className="text-primary-600 underline">
            -
          </a>
        </p>
      </section>
    </main>
  );
}
