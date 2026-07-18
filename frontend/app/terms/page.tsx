import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — VideoSnap",
  description:
    "Read VideoSnap's Terms of Service to understand our usage policies, copyright compliance, user responsibilities, and legal limitations.",
  openGraph: {
    title: "Terms of Service",
    description: "VideoSnap Terms of Service and user agreement",
    type: "website",
    url: "https://videosnap.app/terms",
  },
};

export default function TermsPage() {
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
              <h1 className="text-2xl font-bold text-slate-900">Terms of Service</h1>
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
              These Terms of Service (&quot;Terms&quot;) constitute a legal agreement between you and VideoSnap. By accessing or
              using our website and services, you agree to be bound by these Terms. If you do not agree with any part of
              these Terms, please do not use our service.
            </p>
          </section>

          {/* Sections */}
          <div className="space-y-12">
            {/* 1. Acceptable Use */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">1. Acceptable Use Policy</h2>
              <p className="text-slate-700 mb-4">You agree to use VideoSnap only for lawful purposes and in a way that does not:</p>
              <ul className="space-y-3 text-slate-700 list-disc list-inside">
                <li>Infringe upon any intellectual property rights</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Circumvent DRM protections or copy protection mechanisms</li>
                <li>Harass, abuse, or harm any individual or entity</li>
                <li>Disrupt the normal operation of the service</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or damage our servers or networks</li>
              </ul>
            </section>

            {/* 2. User Responsibilities */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">2. User Responsibilities</h2>
              <p className="text-slate-700 mb-4">As a user of VideoSnap, you are responsible for:</p>
              <ul className="space-y-3 text-slate-700 list-disc list-inside">
                <li>Ensuring your use complies with all applicable laws and platform terms of service</li>
                <li>Respecting the intellectual property rights of content creators and copyright owners</li>
                <li>Using downloaded content only for personal, non-commercial purposes (unless licensed otherwise)</li>
                <li>Maintaining the security of your account (if applicable)</li>
                <li>Providing accurate and truthful information when contacting us</li>
              </ul>
            </section>

            {/* 3. Copyright Compliance */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">3. Copyright and IP Compliance</h2>
              <p className="text-slate-700 mb-4">
                VideoSnap respects intellectual property rights. We do not:
              </p>
              <ul className="space-y-3 text-slate-700 list-disc list-inside mb-6">
                <li>Store or distribute copyrighted content</li>
                <li>Encourage copyright infringement</li>
                <li>Provide tools designed to bypass copyright protections</li>
                <li>Actively induce infringement of copyrighted works</li>
              </ul>
              <p className="text-slate-700 mb-4">
                VideoSnap is a tool like a browser or media player. Users are solely responsible for ensuring their use
                is lawful.
              </p>
              <p className="text-slate-700">
                If you believe your copyright has been infringed, please contact us at support@videosnap.app with
                details of your claim.
              </p>
            </section>

            {/* 4. Prohibited Activities */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">4. Prohibited Activities</h2>
              <p className="text-slate-700 mb-4">You may not:</p>
              <ul className="space-y-3 text-slate-700 list-disc list-inside">
                <li>Attempt to reverse engineer or decompile our service</li>
                <li>Use automated tools to scrape or download in bulk</li>
                <li>Resell or redistribute content obtained through VideoSnap</li>
                <li>Remove or modify copyright notices or disclaimers</li>
                <li>Rent, lease, or lend our service to third parties</li>
                <li>Use the service for commercial purposes without authorization</li>
                <li>Violate the terms of service of any content platform</li>
              </ul>
            </section>

            {/* 5. Limitation of Liability */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">5. Limitation of Liability</h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  <strong>VideoSnap is provided &quot;as is&quot; without any warranties</strong>, express or implied. We do not
                  guarantee:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Uninterrupted or error-free service</li>
                  <li>Accuracy or completeness of downloaded content</li>
                  <li>Compatibility with all platforms or devices</li>
                  <li>Protection against data loss or corruption</li>
                </ul>
                <p className="mt-4">
                  To the fullest extent permitted by law, VideoSnap shall not be liable for any indirect, incidental,
                  special, or consequential damages resulting from your use of our service.
                </p>
              </div>
            </section>

            {/* 6. Service Availability */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">6. Service Availability Disclaimer</h2>
              <p className="text-slate-700 mb-4">
                We make no guarantee regarding service availability. VideoSnap may experience:
              </p>
              <ul className="space-y-3 text-slate-700 list-disc list-inside">
                <li>Scheduled or emergency maintenance</li>
                <li>Temporary outages or interruptions</li>
                <li>Changes in functionality or supported platforms</li>
                <li>Discontinuation of the service with or without notice</li>
              </ul>
              <p className="text-slate-700 mt-4">
                We are not liable for any loss or damage resulting from service unavailability.
              </p>
            </section>

            {/* 7. Modifications and Termination */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">7. Modifications and Termination</h2>
              <div className="space-y-4 text-slate-700">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Service Modifications</h3>
                  <p>
                    We reserve the right to modify, suspend, or discontinue our service at any time. Changes may be made
                    without notice.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Termination</h3>
                  <p>
                    We may terminate or suspend your access to VideoSnap at any time if we believe you have violated these
                    Terms or applicable laws.
                  </p>
                </div>
              </div>
            </section>

            {/* 8. Third-Party Platforms */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">8. Third-Party Platforms</h2>
              <p className="text-slate-700 mb-4">
                VideoSnap allows downloading from various third-party platforms. We are not affiliated with or endorsed
                by these platforms.
              </p>
              <p className="text-slate-700">
                By using our service to download from third-party platforms, you agree to comply with their terms of
                service and policies. We are not responsible for third-party content or policies.
              </p>
            </section>

            {/* 9. Governing Law */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">9. Governing Law</h2>
              <p className="text-slate-700">
                These Terms are governed by applicable laws. Any disputes arising from these Terms shall be subject to
                the jurisdiction of competent courts.
              </p>
            </section>

            {/* 10. Contact Information */}
            <section className="rounded-[2rem] border border-blue-200 bg-blue-50 p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">10. Contact Us</h2>
              <p className="text-blue-900 mb-4">
                If you have questions about these Terms, please contact us at:
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

            {/* 11. Changes to Terms */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">11. Changes to These Terms</h2>
              <p className="text-slate-700">
                We reserve the right to modify these Terms at any time. Changes will be posted with an updated &quot;Last
                Updated&quot; date. Your continued use of VideoSnap indicates acceptance of updated Terms.
              </p>
            </section>

            {/* 12. Entire Agreement */}
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">12. Entire Agreement</h2>
              <p className="text-slate-700">
                These Terms, along with our Privacy Policy, constitute the entire agreement between you and VideoSnap
                regarding your use of our service.
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
