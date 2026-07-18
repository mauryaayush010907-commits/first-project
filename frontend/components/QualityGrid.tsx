"use client";

import { useState, useCallback } from "react";
import type { VideoInfo, QualityOption, AudioOption } from "@/lib/ytdlp";

interface Props {
  info: VideoInfo;
  url: string;
}

interface DownloadState {
  key: string;
  status: "idle" | "downloading" | "done" | "error";
  error?: string;
}

function getBadgeClass(height: number): string {
  if (height >= 2160) return "badge-4k";
  if (height >= 1080) return "badge-1080";
  if (height >= 720) return "badge-720";
  if (height >= 480) return "badge-480";
  if (height >= 360) return "badge-360";
  if (height >= 240) return "badge-240";
  return "badge-144";
}

function formatFilesize(bytes: number | null): string {
  if (!bytes) return "";
  if (bytes > 1e9) return `~${(bytes / 1e9).toFixed(1)} GB`;
  if (bytes > 1e6) return `~${(bytes / 1e6).toFixed(0)} MB`;
  return `~${(bytes / 1e3).toFixed(0)} KB`;
}

function getQualityLabel(height: number): string {
  if (height >= 2160) return "4K Ultra HD";
  if (height >= 1440) return "2K QHD";
  if (height >= 1080) return "Full HD";
  if (height >= 720) return "HD";
  if (height >= 480) return "SD";
  return "Low Quality";
}

function VideoQualityCard({ q, url, videoTitle }: { q: QualityOption; url: string; videoTitle: string }) {
  const [dlState, setDlState] = useState<DownloadState>({ key: q.formatId, status: "idle" });

  const handleDownload = useCallback(async () => {
    setDlState({ key: q.formatId, status: "downloading" });

    try {
      const params = new URLSearchParams({
        url,
        formatId: q.formatId,
        type: "video",
        filename: videoTitle,
      });

      const link = document.createElement("a");
      link.href = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/download?${params.toString()}`;
      link.download = `${videoTitle}.mp4`;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Simulate processing indicator for a bit
      setTimeout(() => {
        setDlState({ key: q.formatId, status: "done" });
        setTimeout(() => setDlState({ key: q.formatId, status: "idle" }), 3000);
      }, 2000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Download failed";
      setDlState({ key: q.formatId, status: "error", error: msg });
      setTimeout(() => setDlState({ key: q.formatId, status: "idle" }), 4000);
    }
  }, [q.formatId, url, videoTitle]);

  const badgeClass = getBadgeClass(q.height);
  const label = getQualityLabel(q.height);
  const size = formatFilesize(q.filesize);
  const isLoading = dlState.status === "downloading";
  const isDone = dlState.status === "done";
  const isError = dlState.status === "error";

  return (
    <div
      className="group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg glass-card"
      style={{
        animation: "slideUp 0.4s ease forwards",
      }}
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none rounded-2xl"
        style={{ background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(59, 130, 246, 0.05))" }} />

      <div className="relative z-10">
        {/* Quality badge + label */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-black shadow-lg ${badgeClass}`}>
              {q.quality}
            </span>
            <div className="mt-1.5 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
              {label}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex flex-col items-end gap-1">
            {q.needsMerge && (
              <span className="text-xs px-2 py-0.5 rounded-lg font-medium transition-all duration-300"
                style={{ 
                  background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.08) 100%)", 
                  color: "#10b981",
                  border: "1px solid rgba(16, 185, 129, 0.2)"
                }}>
                🎵 HD+Audio
              </span>
            )}
            {q.fps && q.fps > 30 && (
              <span className="text-xs px-2 py-0.5 rounded-lg font-medium transition-all duration-300"
                style={{ 
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.08) 100%)", 
                  color: "var(--accent-3)",
                  border: "1px solid rgba(99, 102, 241, 0.2)"
                }}>
                {q.fps}fps
              </span>
            )}
          </div>
        </div>

        {/* Size info */}
        {size && (
          <div className="text-xs mb-3 text-slate-600">
            📦 {size}
          </div>
        )}

        {/* Download button */}
        <button
          onClick={handleDownload}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 disabled:cursor-not-allowed"
          style={{
            background: isDone
              ? "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)"
              : isError
              ? "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.1) 100%)"
              : isLoading
              ? "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%)"
              : "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(59, 130, 246, 0.08) 100%)",
            color: isDone
              ? "#10b981"
              : isError
              ? "#dc2626"
              : "var(--accent-3)",
            border: `1px solid ${isDone ? "rgba(16, 185, 129, 0.3)" : isError ? "rgba(239, 68, 68, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
            boxShadow: isLoading || isDone ? "0 2px 8px rgba(59, 130, 246, 0.1)" : "none",
          }}
        >
          {isLoading ? (
            <>
              <div className="flex gap-0.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="wave-bar" style={{ animationDelay: `${i * 0.15}s`, height: 12 }} />
                ))}
              </div>
              Preparing...
            </>
          ) : isDone ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Download Started!
            </>
          ) : isError ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Retry Download
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download MP4
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function AudioCard({ a, url, videoTitle }: { a: AudioOption; url: string; videoTitle: string }) {
  const [dlState, setDlState] = useState<DownloadState>({ key: a.formatId, status: "idle" });

  const handleDownload = useCallback(async () => {
    setDlState({ key: a.formatId, status: "downloading" });

    try {
      const params = new URLSearchParams({
        url,
        formatId: a.formatId,
        type: "audio",
        filename: videoTitle,
      });

      const link = document.createElement("a");
      link.href = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/download?${params.toString()}`;
      link.download = `${videoTitle}.mp3`;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        setDlState({ key: a.formatId, status: "done" });
        setTimeout(() => setDlState({ key: a.formatId, status: "idle" }), 3000);
      }, 2000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Download failed";
      setDlState({ key: a.formatId, status: "error", error: msg });
      setTimeout(() => setDlState({ key: a.formatId, status: "idle" }), 4000);
    }
  }, [a.formatId, url, videoTitle]);

  const isLoading = dlState.status === "downloading";
  const isDone = dlState.status === "done";
  const isError = dlState.status === "error";

  return (
    <div
      className="group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg glass-card"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none rounded-2xl"
        style={{ background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)" }} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-black shadow-lg badge-mp3">
              MP3
            </span>
            <div className="mt-1.5 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
              Audio Only
            </div>
          </div>
          {a.abr && (
            <span className="text-xs px-2 py-0.5 rounded-lg font-medium transition-all duration-300"
              style={{ 
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.08) 100%)",
                color: "var(--accent-4)",
                border: "1px solid rgba(139, 92, 246, 0.2)"
              }}>
              {Math.round(a.abr)}kbps
            </span>
          )}
        </div>

        <button
          onClick={handleDownload}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 disabled:cursor-not-allowed"
          style={{
            background: isDone
              ? "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)"
              : isError
              ? "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.1) 100%)"
              : isLoading
              ? "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)"
              : "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.08) 100%)",
            color: isDone ? "#10b981" : isError ? "#dc2626" : "var(--accent-4)",
            border: `1px solid ${isDone ? "rgba(16, 185, 129, 0.3)" : isError ? "rgba(239, 68, 68, 0.3)" : "rgba(139, 92, 246, 0.2)"}`,
            boxShadow: isLoading || isDone ? "0 2px 8px rgba(139, 92, 246, 0.1)" : "none",
          }}
        >
          {isLoading ? (
            <>
              <div className="flex gap-0.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="wave-bar"
                    style={{ animationDelay: `${i * 0.15}s`, height: 12, background: "var(--accent-4)" }} />
                ))}
              </div>
              Converting...
            </>
          ) : isDone ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Download Started!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
              </svg>
              Download MP3
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function QualityGrid({ info, url }: Props) {
  const [activeTab, setActiveTab] = useState<"video" | "audio">("video");

  const tabs = [
    { id: "video" as const, label: `🎬 Video (${info.qualities.length})` },
    { id: "audio" as const, label: `🎵 Audio (${info.audioOnly.length})` },
  ];

  return (
    <div
      id="download-options"
      className="glass-card p-5"
      style={{ animation: "slideUp 0.5s ease 0.1s both forwards" }}
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{ 
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%)",
            boxShadow: "0 2px 8px rgba(99, 102, 241, 0.1)"
          }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-3)" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </div>
        <h3 className="font-bold text-lg text-slate-900">Available Downloads</h3>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 p-1 rounded-xl transition-all duration-300 bg-slate-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300"
            style={{
              background: activeTab === tab.id 
                ? "linear-gradient(135deg, var(--accent-3) 0%, var(--accent) 100%)" 
                : "transparent",
              color: activeTab === tab.id ? "#fff" : "var(--text-secondary)",
              boxShadow: activeTab === tab.id ? "0 2px 8px rgba(59, 130, 246, 0.15)" : "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Video grid */}
      {activeTab === "video" && (
        <div>
          {info.qualities.length === 0 ? (
            <div className="text-center py-8 text-slate-600">
              ❌ No video formats found for this URL.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {info.qualities.map((q) => (
                <VideoQualityCard
                  key={q.formatId}
                  q={q}
                  url={url}
                  videoTitle={info.title}
                />
              ))}
            </div>
          )}

          {/* Best quality quick-download */}
          {info.qualities.length > 0 && (
            <div className="mt-4 p-4 rounded-xl flex items-center justify-between transition-all duration-300 hover:shadow-lg glass-card"
              style={{ 
                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(59, 130, 246, 0.05) 100%)", 
                border: "1px solid rgba(99, 102, 241, 0.15)" 
              }}>
              <div className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">⚡ Best Quality: </span>
                {info.qualities[0].quality} {info.qualities[0].fps ? `@ ${info.qualities[0].fps}fps` : ""}
              </div>
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/download?url=${encodeURIComponent(url)}&formatId=${encodeURIComponent(info.qualities[0].formatId)}&type=video&filename=${encodeURIComponent(info.title)}`}
                download={`${info.title}.mp4`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 hover:shadow-md glow-btn"
              >
                ⬇️ Download Now
              </a>
            </div>
          )}
        </div>
      )}

      {/* Audio grid */}
      {activeTab === "audio" && (
        <div>
          {info.audioOnly.length === 0 ? (
            <div className="text-center py-8 text-slate-600">
              ❌ No audio formats available for this URL.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {info.audioOnly.map((a) => (
                <AudioCard
                  key={a.formatId}
                  a={a}
                  url={url}
                  videoTitle={info.title}
                />
              ))}
            </div>
          )}

          <div className="mt-4 p-3 rounded-xl text-xs transition-all duration-300 glass-card" 
            style={{ 
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)", 
              color: "var(--text-secondary)", 
              border: "1px solid rgba(139, 92, 246, 0.15)" 
            }}>
            🎵 MP3 files are extracted from the video using FFmpeg. The audio quality depends on the original source quality.
          </div>
        </div>
      )}
    </div>
  );
}
