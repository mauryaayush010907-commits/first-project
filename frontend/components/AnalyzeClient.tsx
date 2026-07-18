"use client";

import { useEffect, useState } from "react";
import { analyzeVideo } from "@/api";
import VideoCard from "./VideoCard";
import QualityGrid from "./QualityGrid";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorBanner from "./ErrorBanner";
import MediaPreview from "./MediaPreview";
import Link from "next/link";
import type { VideoInfo } from "@/lib/ytdlp";

interface Props {
  url: string;
}

function isValidHttpUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export default function AnalyzeClient({ url: initialUrl }: Props) {
  const [url, setUrl] = useState(initialUrl || "");
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialUrl) {
      handleAnalyze(initialUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialUrl]);

  async function handleAnalyze(overrideUrl?: string) {
    const candidate = (overrideUrl ?? url).trim();

    if (!candidate) {
      setError("Please enter a URL to analyze.");
      return;
    }

    if (!isValidHttpUrl(candidate)) {
      setError("Please enter a valid URL.");
      return;
    }

    if (loading) return;

    setLoading(true);
    setError(null);
    setVideoInfo(null);

    try {
      const payload = await analyzeVideo(candidate);

      if (!payload?.success) {
        throw new Error(payload?.error || "Unable to analyze URL.");
      }

      setVideoInfo(payload.data);
      setUrl(candidate);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "object" && err !== null
          ? JSON.stringify(err)
          : "Unable to analyze the provided URL.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-15"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-violet-100 to-blue-100 rounded-full blur-3xl opacity-10"></div>
      </div>

      <main className="relative z-10">
        <div className="border-b border-slate-200 bg-white/40 backdrop-blur-md sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-4 py-4 lg:px-8">
            <div className="flex items-center gap-4">
              <Link href="/" className="p-2 rounded-lg transition-all duration-300 hover:bg-slate-100 text-slate-600 hover:text-slate-900" title="Back to home">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-slate-900">Download Video</h1>
              <button
                onClick={() => handleAnalyze(url)}
                disabled={loading}
                className="ml-auto p-2 rounded-lg transition-all duration-300 hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                title="Refresh"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="23 4 23 10 17 10" />
                  <polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36M20.49 15a9 9 0 0 1-14.85 3.36" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12 lg:px-8 lg:grid lg:gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div className="glass-card p-4 sm:p-6">
              <div className="flex gap-3 items-center flex-col sm:flex-row">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste video URL..."
                  className="flex-1 w-full bg-transparent p-3 rounded-lg outline-none text-sm text-slate-900 placeholder-slate-400"
                  style={{ caretColor: "var(--accent-3)" }}
                  aria-label="Video URL"
                />
                <button
                  onClick={() => handleAnalyze()}
                  disabled={loading}
                  className="glow-btn px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 w-full sm:w-auto"
                >
                  {loading ? "Analyzing..." : "Analyze"}
                </button>
              </div>



              <p className="mt-3 text-xs text-slate-500">
                Supported platforms: YouTube, Instagram, Facebook, Reddit, Vimeo, TikTok, Twitter/X.
              </p>
            </div>

            {!loading && (
              <div className="mt-4 flex justify-center" >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-sm font-semibold text-indigo-700">
                  <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                  Scroll down for continue & download
                  <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                </div>
              </div>
            )}

            {loading && <LoadingSkeleton />}
            {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

            {videoInfo && (
              <div className="space-y-6">
                <MediaPreview
                  url={url}
                  title={videoInfo.title}
                  thumbnail={videoInfo.thumbnail}
                  duration={videoInfo.duration}
                  platform={videoInfo.platform}
                  previewUrl={videoInfo.previewUrl}
                  previewMime={videoInfo.previewMime}
                />

                <VideoCard info={videoInfo} />

                <QualityGrid info={videoInfo} url={url} />
              </div>
            )}
          </div>

          <aside className="hidden lg:flex flex-col gap-6">
            <div className="glass-card p-6">
              <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                <h3 className="font-semibold text-slate-900 mb-4">Pro Tips</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li>✓ Supported formats: MP4, MP3, WebM</li>
                  <li>✓ Download in seconds</li>
                  <li>✓ No account required</li>
                  <li>✓ Secure and private</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Copyright Notice */}
      <div className="relative z-10 bg-blue-50 border-t border-blue-200 py-8">
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

      <footer className="relative z-10 border-t border-slate-200 bg-white/60 backdrop-blur-md mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
            <p>© {new Date().getFullYear()} VideoSnap. All rights reserved.</p>
            <div className="flex flex-wrap gap-4 text-slate-600">
              <a href="/about" className="hover:text-slate-900 transition-colors">About</a>
              <a href="/privacy-policy" className="hover:text-slate-900 transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-slate-900 transition-colors">Terms</a>
              <a href="/contact" className="hover:text-slate-900 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
