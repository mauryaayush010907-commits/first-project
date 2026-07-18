import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — VideoSnap",
  description:
    "Read VideoSnap's privacy policy to understand how we handle your data, cookies, analytics, and user information.",
  openGraph: {
    title: "Privacy Policy",
    description: "How VideoSnap handles your privacy and data",
    type: "website",
    url: "https://videosnap.app/privacy-policy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100">
      {/* Subtle floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-gradient-to-br from-violet-100 to-blue-100 rounded-full blur-3xl opacity-15"></div>
      </div>

      <main className="relative z-10">
        {/* Header */}
        <div className="border-b border-slate-200 bg-white/40 backdrop-blur-md sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-4 py-4 lg:px-8">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 rounded-lg transition-all duration-300 hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                title="Back to home"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-slate-900">Privacy Policy</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12 lg:px-8 lg:py-20">
          <div className="text-sm text-slate-500 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>

          {/* Introduction */}
          <section className="space-y-6 mb-12">
            <p className="text-lg text-slate-700">
              VideoSnap (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how
              we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
          </section>

          {/* Sections */}
          <div className="space-y-12">
            {/* 1. Information We Collect */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">1. Information We Collect</h2>
              <div className="space-y-4 text-slate-700">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Information You Provide Directly</h3>
                  <p>
                    When you contact us through our contact form, we collect your name, email address, and message content.
                    This information is used solely to respond to your inquiry.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Information Collected Automatically</h3>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>IP address and browser type</li>
                    <li>Pages visited and time spent on the site</li>
                    <li>Referrer source</li>
                    <li>Device information (OS, browser version)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 2. Use of Information */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">2. How We Use Your Information</h2>
              <ul className="space-y-3 text-slate-700 list-disc list-inside">
                <li>To respond to your inquiries and provide customer support</li>
                <li>To improve our website and services</li>
                <li>To monitor for security and fraud prevention</li>
                <li>To comply with legal obligations</li>
                <li>To analyze usage patterns and trends</li>
              </ul>
            </section>

            {/* 3. Analytics */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">3. Analytics</h2>
              <p className="text-slate-700 mb-4">
                We use analytics services to understand how users interact with our website. This helps us improve
                performance and user experience. Analytics services may collect:
              </p>
              <ul className="space-y-3 text-slate-700 list-disc list-inside">
                <li>Pageviews and click patterns</li>
                <li>User flow and behavior</li>
                <li>Geographic location (country/city level)</li>
                <li>Device and browser information</li>
              </ul>
              <p className="text-slate-700 mt-4">
                Analytics services operate under their own privacy policies. Visit their websites for more information.
              </p>
            </section>

            {/* 4. Cookies */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">4. Cookies and Tracking Technologies</h2>
              <p className="text-slate-700 mb-4">
                We may use cookies and similar tracking technologies to enhance your experience. Cookies are small files
                stored on your device that help us remember your preferences.
              </p>
              <div className="space-y-4 text-slate-700">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Types of Cookies</h3>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>Essential cookies (for website functionality)</li>
                    <li>Analytics cookies (to understand usage)</li>
                    <li>Preference cookies (to remember settings)</li>
                  </ul>
                </div>
                <p>You can control cookies through your browser settings. Disabling cookies may affect website functionality.</p>
              </div>
            </section>

            {/* 5. Security */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">5. Security Measures</h2>
              <p className="text-slate-700 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <div className="space-y-2 text-slate-700 list-disc list-inside">
                <p>• HTTPS encryption for secure data transmission</p>
                <p>• Secure servers with regular backups</p>
                <p>• Access controls and authentication</p>
                <p>• Regular security audits</p>
              </div>
            </section>

            {/* 6. Third-Party Services */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">6. Third-Party Services</h2>
              <p className="text-slate-700 mb-4">
                Our website may contain links to third-party websites and services. We are not responsible for their
                privacy practices. We recommend reviewing their privacy policies before providing your information.
              </p>
              <p className="text-slate-700">
                We use third-party services for hosting, analytics, and functionality. These services have their own
                privacy policies and data handling practices.
              </p>
            </section>

            {/* 7. Data Retention */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">7. Data Retention</h2>
              <p className="text-slate-700 mb-4">
                We retain your personal information only as long as necessary to provide our services and fulfill the
                purposes outlined in this policy.
              </p>
              <ul className="space-y-3 text-slate-700 list-disc list-inside">
                <li>Contact form data: retained for 1 year or until you request deletion</li>
                <li>Analytics data: retained for 12-24 months</li>
                <li>Logs: retained for 30-90 days for security purposes</li>
              </ul>
            </section>

            {/* 8. User Rights */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">8. Your Rights</h2>
              <p className="text-slate-700 mb-4">Depending on your location, you may have the right to:</p>
              <ul className="space-y-3 text-slate-700 list-disc list-inside">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your data</li>
                <li><strong>Portability:</strong> Request your data in a portable format</li>
                <li><strong>Objection:</strong> Object to data processing</li>
              </ul>
              <p className="text-slate-700 mt-4">
                To exercise these rights, please contact us at support@videosnap.app.
              </p>
            </section>

            {/* 9. Contact Information */}
            <section className="rounded-[2rem] border border-blue-200 bg-blue-50 p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">9. Contact Us</h2>
              <p className="text-blue-900 mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="space-y-2 text-blue-900">
                <p>
                  <strong>Email:</strong> support@videosnap.app
                </p>
                <p>
                  <strong>Website:</strong> <Link href="/" className="text-blue-600 hover:text-blue-700">videosnap.app</Link>
                </p>
              </div>
            </section>

            {/* 10. Policy Changes */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">10. Changes to This Policy</h2>
              <p className="text-slate-700">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
                &quot;Last Updated&quot; date. Your continued use of our website indicates your acceptance of the updated policy.
              </p>
            </section>
          </div>

          {/* Call to Action */}
          <section className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/60 backdrop-blur-md mt-20">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-slate-200">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">VideoSnap</h3>
              <p className="text-sm text-slate-600">Fast, premium video downloading for everyone.</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/" className="hover:text-slate-900 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/download" className="hover:text-slate-900 transition-colors">
                    Download
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/privacy-policy" className="hover:text-slate-900 transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-slate-900 transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 text-sm">Help</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/contact" className="hover:text-slate-900 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-slate-900 transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
            <p className="text-sm text-slate-600">© {new Date().getFullYear()} VideoSnap. All rights reserved.</p>
            <p className="text-xs text-slate-500">Made with ❤️ for creators worldwide</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
