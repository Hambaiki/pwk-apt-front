import MainSection from "@/components/template/MainSection";
import { Card } from "@/components/ui";

export default function TermsOfServicePage() {
  return (
    <MainSection>
      <Card className="p-20 mb-8 rounded-xl bg-gradient-to-br from-primary-800 to-primary-600 shadow-medium">
        <h1 className="mb-2 text-white font-bold">Terms of Service</h1>
        <p className="text-gray-100 mt-1">
          <strong>Effective Date: </strong>
          {new Date("2025-08-24").toLocaleDateString()}
        </p>
        <p className="text-gray-200 mt-2">
          These Terms of Service (“Terms”) govern your use of this website. By
          accessing or using our services, you agree to these Terms.
        </p>
      </Card>

      <section className="space-y-4">
        <h2>1. Eligibility</h2>
        <p>
          You must be at least 13 years old to use our services. By using this
          site, you confirm that you meet this requirement.
        </p>

        <h2>2. Use of Services</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use the site for fraudulent or harmful activities.</li>
          <li>Attempt to hack, disrupt, or misuse the platform.</li>
          <li>
            Copy, distribute, or modify site content without prior written
            permission.
          </li>
        </ul>

        <h2>3. User Accounts</h2>
        <p>
          If you create an account, you are responsible for keeping your login
          details secure and for all activity under your account. We may suspend
          or terminate accounts that violate these Terms.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          All content, branding, and materials on this site are owned by this
          website unless otherwise stated. You may not reproduce or use them
          without permission.
        </p>

        <h2>5. Disclaimers</h2>
        <p>
          Our services are provided “as is” without warranties of any kind. We
          do not guarantee uninterrupted service, error-free content, or
          specific results.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          We are not responsible for any damages (direct, indirect, or
          consequential) resulting from your use of our site.
        </p>

        <h2>7. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of the site
          means you accept the updated Terms.
        </p>

        <h2>8. Governing Law</h2>
        <p>
          These Terms shall be governed by and interpreted according to the laws
          of [Your Country].
        </p>

        <h2>9. Contact Us</h2>
        <p>
          For questions about these Terms, contact us at:{" "}
          <a href="mailto:-" className="text-primary-600 underline">
            -
          </a>
        </p>
      </section>
    </MainSection>
  );
}
