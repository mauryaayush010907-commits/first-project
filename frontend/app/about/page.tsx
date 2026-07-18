import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About VideoSnap — Video Download Tool",
  description:
    "Learn about VideoSnap, a free video downloader tool that respects copyright and helps users download videos legally. Educational and utility-focused.",
  openGraph: {
    title: "About VideoSnap",
    description:
      "A free, legal-first video downloader for downloading publicly available content",
    type: "website",
    url: "https://videosnap.app/about",
  },
};

export default function AboutPage() {
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
              <h1 className="text-2xl font-bold text-slate-900">About Us</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12 lg:px-8 lg:py-20">
          {/* Introduction */}
          <section className="space-y-6 mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">About VideoSnap</h2>
              <p className="text-xl text-slate-700 leading-relaxed">
                VideoSnap is a free, open-source video download tool designed to provide users with a simple,
                efficient way to download publicly available content from over 1800+ websites. We&apos;re committed to making
                video downloading accessible while respecting copyright laws and platform terms of service.
              </p>
            </div>
          </section>

          {/* Mission */}
          <section className="space-y-6 mb-12 rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                We believe in empowering users with the tools they need to save and preserve content they have access
                to. Our mission is to provide a clean, fast, and reliable interface for downloading videos while
                promoting responsible use and respect for intellectual property rights.
              </p>
              <p className="text-slate-700 leading-relaxed">
                VideoSnap is educational and utility-focused. We help users understand the capabilities of modern video
                technology and provide transparent, straightforward tools without unnecessary complexity.
              </p>
            </div>
          </section>

          {/* How It Works */}
          <section className="space-y-6 mb-12">
            <h3 className="text-2xl font-bold text-slate-900">How VideoSnap Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🔗",
                  title: "Paste URL",
                  description:
                    "Enter any public video URL from supported platforms like YouTube, TikTok, Instagram, and 1800+ others.",
                },
                {
                  icon: "⚙️",
                  title: "Analyze",
                  description:
                    "Our system instantly detects available formats, resolutions, bitrates, and extracts metadata.",
                },
                {
                  icon: "⬇️",
                  title: "Download",
                  description:
                    "Save videos in your preferred format (MP4, WebM) or extract audio as MP3 with a single click.",
                },
              ].map((step) => (
                <div key={step.title} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="space-y-6 mb-12 rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">User Responsibilities</h3>
              <p className="text-slate-700 leading-relaxed mb-6">
                VideoSnap is a tool — like a browser or media player. Users are solely responsible for ensuring their
                use complies with all applicable laws and terms of service.
              </p>
              <ul className="space-y-4 text-slate-700">
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Download only content you own, have permission to access, or that is legally available</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Respect copyright owners and content creators</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Comply with the terms of service of content platforms</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Use downloaded content only for personal, non-commercial purposes (unless otherwise licensed)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Do not circumvent DRM protections or copy protection mechanisms</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Copyright Notice */}
          <section className="space-y-6 mb-12 rounded-[2rem] border border-blue-200 bg-blue-50 p-8">
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Respect for Copyright</h3>
              <p className="text-blue-900 leading-relaxed mb-4">
                VideoSnap respects intellectual property rights. We do not:
              </p>
              <ul className="space-y-3 text-blue-900 ml-4">
                <li>• Store or distribute copyrighted content</li>
                <li>• Encourage copyright infringement</li>
                <li>• Bypass copyright protections or access controls</li>
                <li>• Partner with or promote services that violate copyright laws</li>
              </ul>
              <p className="text-blue-900 leading-relaxed mt-6">
                If you believe your copyright has been violated, please contact us at the address provided in our{" "}
                <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold underline">
                  Contact page
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Technology */}
          <section className="space-y-6 mb-12">
            <h3 className="text-2xl font-bold text-slate-900">Technology</h3>
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <p className="text-slate-700 leading-relaxed mb-4">
                VideoSnap is powered by open-source technologies:
              </p>
              <ul className="space-y-2 text-slate-700 ml-4">
                <li>• <strong>yt-dlp</strong> - Advanced video extraction and processing</li>
                <li>• <strong>FFmpeg</strong> - Format conversion and media processing</li>
                <li>• <strong>Next.js</strong> - Modern web application framework</li>
              </ul>
              <p className="text-slate-600 text-sm mt-6">
                All technology respects platform terms and operates within legal boundaries.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="space-y-6 text-center">
            <p className="text-slate-700 mb-6">
              Have questions? We&apos;d love to hear from you. <br />
              <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold">
                Contact us
              </Link>
            </p>
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
