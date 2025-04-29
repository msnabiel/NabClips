import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Correct component names
// Removed Button import as it's unused
// Removed Typography import as it's causing issues

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="terms-container max-w-4xl mx-auto p-6 space-y-8">
        <h1 className="text-center text-3xl font-bold">Terms of Service</h1>
        <p className="text-center text-lg">Effective Date: April 29, 2025</p>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
          </CardHeader>
          <CardContent>
            <p>
              Welcome to Nabclips! By accessing or using our services, you agree to comply with and be bound by the following Terms of Service (the &quot;Terms&quot;). These Terms govern your use of our platform, services, and any associated content. Please read these Terms carefully before using the platform.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">2. User Responsibilities</h2>
          </CardHeader>
          <CardContent>
            <p>
              As a user of Nabclips, you agree to:
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide accurate and complete information when creating an account.</li>
                <li>Respect other users and refrain from any illegal or disruptive activities.</li>
                <li>Not to engage in any form of copyright infringement or distribution of unauthorized content.</li>
                <li>Maintain the confidentiality of your account and password, and promptly notify us of any unauthorized use.</li>
                <li>Comply with all applicable laws, regulations, and rules when using the platform.</li>
              </ul>
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">3. Content Ownership and Usage</h2>
          </CardHeader>
          <CardContent>
            <p>
              All content uploaded to Nabclips remains the property of the user who uploaded it. However, by uploading content, you grant Nabclips a non-exclusive, royalty-free, worldwide license to use, display, and distribute that content within the platform. This license is granted for the purpose of providing and promoting the services of Nabclips.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">4. Privacy and Data Protection</h2>
          </CardHeader>
          <CardContent>
            <p>
              We value your privacy. Our <a href="/privacy-policy" className="text-blue-600">Privacy Policy</a> explains how we collect, store, and protect your personal data. By using our platform, you consent to our privacy practices outlined in the Privacy Policy. We are committed to ensuring the safety and confidentiality of your data and will not share your information with third parties without your consent, except as required by law.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">5. Restrictions</h2>
          </CardHeader>
          <CardContent>
            <p>
              You agree not to:
              <ul className="list-disc pl-5 space-y-2">
                <li>Upload content that is harmful, offensive, or violates the rights of others, including defamatory, obscene, or unlawful material.</li>
                <li>Use the platform for spamming, phishing, or other malicious activities that could disrupt the platform&apos;s functionality or harm other users.</li>
                <li>Engage in any activity that disrupts the platform&apos;s functionality or the experience of other users, including exploiting bugs or vulnerabilities.</li>
                <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity.</li>
              </ul>
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">6. Termination</h2>
          </CardHeader>
          <CardContent>
            <p>
              Nabclips reserves the right to suspend or terminate your account at any time, without notice, for any violation of these Terms of Service or other platform policies. If your account is terminated, you will no longer be able to access the services, and any content you uploaded may be removed.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">7. Limitation of Liability</h2>
          </CardHeader>
          <CardContent>
            <p>
              Nabclips will not be held liable for any indirect, incidental, special, or consequential damages arising from the use of the platform or any content uploaded to the platform. Users are responsible for their actions and content uploaded to the platform. The platform is provided &quot;as is,&quot; and Nabclips makes no warranties or representations regarding its accuracy, reliability, or availability.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">8. Modifications to Terms</h2>
          </CardHeader>
          <CardContent>
            <p>
              Nabclips reserves the right to modify these Terms at any time. Changes will be posted on this page with an updated effective date. Continued use of the platform after any modifications constitutes acceptance of the new Terms. It is your responsibility to review these Terms periodically to stay informed of any updates.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">9. Governing Law</h2>
          </CardHeader>
          <CardContent>
            <p>
              These Terms will be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising from the use of the platform shall be resolved in the appropriate courts of India, and you consent to the exclusive jurisdiction and venue of such courts.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">10. Contact Us</h2>
          </CardHeader>
          <CardContent>
            <p>
            If you have any questions about these Terms, please contact us at <a href="https://github.com/msnabiel/nabclips" className="text-blue-600">our GitHub repository</a>. We are happy to assist you with any inquiries or concerns you may have regarding the platform or these Terms of Service.

            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
