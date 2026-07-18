"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UrlInput from "./UrlInput";


export default function LandingPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Please paste a valid video link to continue.");
      return;
    }

    setError(null);
    router.push(`/download?url=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100">
      {/* Subtle floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-gradient-to-br from-violet-100 to-blue-100 rounded-full blur-3xl opacity-15"></div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center space-y-8">
         

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-sm font-semibold text-indigo-700">
              <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              Trusted by thousands • No account needed
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900">
                <span className="block text-5xl sm:text-6xl lg:text-7xl leading-tight">
                  VideoSnap
                </span>
              </h1>

              <p className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-700">
                Download any video in seconds
              </p>

              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed">
                VideoSnap provides a professional, modern experience for downloading videos from YouTube, TikTok, Instagram, Facebook, Reddit and 1800+ other sites. Premium quality, instant analysis, and zero complexity.
              </p>
            </div>

            {/* URL Input */}
            <div className="flex flex-col items-center gap-4">
              <UrlInput url={url} onChange={setUrl} onSubmit={handleSubmit} loading={false} buttonText="Start Download" />
              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 transition-all duration-300">
                  ⚠️ {error}
                </div>
              ) : (
                <div className="text-sm text-slate-500">
                  ✅ No account • 🔒 Secure • 🚀 Fast
                </div>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8">
              {[
                { value: "1800+", label: "Sites" },
                { value: "Instant", label: "Analysis" },
                { value: "MP3 / MP4", label: "Formats" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tool overview */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                <span className="mr-2 text-lg">✨</span> What is VideoSnap?
              </span>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">A simple video downloader for every platform.</h2>
                <p className="text-slate-600 max-w-2xl leading-8">
                  VideoSnap instantly analyzes public video links and delivers downloadable MP4 or MP3 files. No account required, no complicated settings — just paste a URL, choose a format, and download.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: "🚀", title: "Fast analysis", description: "Scans links immediately and shows available formats." },
                  { icon: "🔒", title: "Secure downloads", description: "Designed for safe browser-based access and privacy-friendly use." },
                  { icon: "📥", title: "One-click save", description: "Download videos or extract MP3 audio in one easy step." },
                  { icon: "🌐", title: "1800+ sources", description: "Support for YouTube, TikTok, Instagram, Facebook, Reddit and more." },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="text-3xl">{item.icon}</div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-6">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-blue-900 to-indigo-700 p-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.2)]">
              <div className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-white/10 blur-3xl"></div>
              <div className="space-y-6">
                <div className="text-sm uppercase tracking-[0.3em] text-slate-300">Tool snapshot</div>
                <div className="rounded-3xl bg-slate-900/90 p-6 shadow-inner shadow-black/20">
                  <div className="mb-4 text-slate-300">How VideoSnap works in the browser</div>
                  <div className="space-y-4">
                    {[
                      { label: "01", text: "Paste your video link" },
                      { label: "02", text: "Analyze available formats" },
                      { label: "03", text: "Download MP4 or MP3" },
                    ].map((step) => (
                      <div key={step.label} className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-lg font-semibold text-white">{step.label}</div>
                        <div>
                          <p className="text-sm font-semibold text-white">{step.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                  <div className="mb-3 flex items-center gap-3 text-sm text-slate-300">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                    Live preview of supported tools
                  </div>
                  <div className="space-y-4 text-sm text-slate-200">
                    <p>VideoSnap removes clutter from downloads and makes the experience easy for everyone.</p>
                    <p>Works with public sources and cloud-ready video formats for instant access.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">How it works</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900">From URL to download in 3 simple steps</h2>
              </div>
              <p className="max-w-2xl text-slate-600">Every step is handled automatically with smart format detection, secure processing, and fast delivery.</p>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {[
                { icon: "🔗", title: "Paste link", description: "Enter any public video URL and start analysis instantly." },
                { icon: "⚙️", title: "Analyze", description: "Detect available resolutions, bitrates, and audio-only options." },
                { icon: "⬇️", title: "Download", description: "Save the best format or choose MP3 for audio extraction." },
              ].map((step) => (
                <div key={step.title} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="text-4xl">{step.icon}</div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Responsive ad */}
        {/* Responsive ad */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="glass-card p-6">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Community</p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-900">Join thousands of satisfied users</h2>
                </div>
                <p className="max-w-2xl text-slate-600">Download videos securely and effortlessly with VideoSnap.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Copyright Notice */}
      <div className="bg-blue-50 border-t border-blue-200 py-8">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="rounded-lg border border-blue-200 bg-white p-6">
            <p className="text-sm text-blue-900">
              <strong>⚠️ Important Notice:</strong> This tool is intended only for downloading content that you own,
              have permission to access, or that is legally available for download. Users are solely responsible for
              complying with copyright laws and the terms of service of content providers.
            </p>
          </div>
        </div>
      </div>

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
                <li><a href="#" className="hover:text-slate-900 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Platforms</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="/privacy-policy" className="hover:text-slate-900 transition-colors">Privacy</a></li>
                <li><a href="/terms" className="hover:text-slate-900 transition-colors">Terms</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 text-sm">Help</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="/contact" className="hover:text-slate-900 transition-colors">Contact</a></li>
                <li><a href="/about" className="hover:text-slate-900 transition-colors">About</a></li>
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
