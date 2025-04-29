import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Correct component names

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="privacy-container max-w-4xl mx-auto p-6 space-y-8">
        <h1 className="text-center text-3xl font-bold">Privacy Policy</h1>
        <p className="text-center text-lg">Effective Date: April 29, 2025</p>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
          </CardHeader>
          <CardContent>
            <p>
              At Nabclips, we value your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform. By accessing or using our services, you consent to the practices outlined in this policy.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
          </CardHeader>
          <CardContent>
            <p>
              We collect the following types of information:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Personal Information:</strong> When you register for an account, we collect your name, email address, and any other details you provide during sign-up.</li>
              <li><strong>Usage Data:</strong> We collect information about your interactions with the platform, including pages visited, time spent on the platform, and other usage statistics.</li>
              <li><strong>Cookies and Tracking Technologies:</strong> We use cookies to enhance user experience and collect data about your interactions with the platform.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
          </CardHeader>
          <CardContent>
            <p>
              The information we collect is used to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide, personalize, and improve our services.</li>
              <li>Analyze usage trends and gather insights to enhance the platform.</li>
              <li>Communicate with you, including sending updates, marketing materials, and support messages.</li>
              <li>Comply with legal obligations and resolve any disputes that may arise.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">4. Data Security</h2>
          </CardHeader>
          <CardContent>
            <p>
              We take the security of your personal information seriously. We implement appropriate technical and organizational measures to protect your data from unauthorized access, alteration, or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee the absolute security of your information.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">5. Data Sharing</h2>
          </CardHeader>
          <CardContent>
            <p>
              We do not share your personal information with third parties, except in the following cases:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>With your consent or as part of providing services you have requested.</li>
              <li>To comply with legal requirements, such as responding to subpoenas or court orders.</li>
              <li>With trusted third-party service providers who assist us in operating our platform (e.g., hosting providers, payment processors), but only to the extent necessary for them to provide those services.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">6. User Rights</h2>
          </CardHeader>
          <CardContent>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access the personal information we hold about you.</li>
              <li>Request the correction or deletion of your personal information.</li>
              <li>Opt-out of marketing communications or withdraw consent at any time.</li>
              <li>Request restrictions on how your information is used in certain circumstances.</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided at the end of this policy.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">7. Changes to this Privacy Policy</h2>
          </CardHeader>
          <CardContent>
            <p>
              We reserve the right to modify this Privacy Policy at any time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically to stay informed about how we protect your information.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">8. Contact Us</h2>
          </CardHeader>
          <CardContent>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="https://github.com/msnabiel/nabclips" className="text-blue-600">our GitHub repository</a>. We are happy to assist you with any inquiries or concerns you may have regarding the platform or this Privacy Policy.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
