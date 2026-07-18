"use client";

import Image from "next/image";
import type { VideoInfo } from "@/lib/ytdlp";

function formatDuration(secs: number | null): string {
  if (!secs) return "";
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface Props {
  info: VideoInfo;
}

export default function VideoCard({ info }: Props) {
  const dur = formatDuration(info.duration);

  return (
    <div
      className="glass-card overflow-hidden transition-all duration-300 hover:shadow-lg"
      style={{ animation: "slideUp 0.4s ease forwards" }}
    >
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="flex flex-col sm:flex-row gap-0 group">
        {/* Thumbnail */}
        <div className="relative sm:w-72 flex-shrink-0 overflow-hidden"
          style={{ 
            minHeight: 160, 
            background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)"
          }}>
          {info.thumbnail ? (
            <Image
              src={info.thumbnail}
              alt={info.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                style={{ color: "#cbd5e1" }}>
                <rect x="2" y="2" width="20" height="20" rx="3"/>
                <polygon points="10,8 16,12 10,16"/>
              </svg>
            </div>
          )}

          {/* Duration badge */}
          {dur && (
            <div
              className="absolute bottom-3 right-3 px-3 py-1 rounded-xl text-xs font-bold backdrop-blur-md transition-all duration-300"
              style={{ 
                background: "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)", 
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)"
              }}
            >
              ⏱ {dur}
            </div>
          )}

          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300"
              style={{ 
                background: "linear-gradient(135deg, var(--accent-3) 0%, var(--accent) 100%)",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)"
              }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 p-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-tight line-clamp-2 text-slate-900">
            {info.title}
          </h2>

          {info.uploader && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{ 
                  background: "linear-gradient(135deg, var(--accent-3) 0%, var(--accent) 100%)", 
                  color: "#fff",
                  boxShadow: "0 2px 8px rgba(59, 130, 246, 0.15)"
                }}>
                {info.uploader[0]?.toUpperCase() ?? "?"}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{info.uploader}</div>
              </div>
            </div>
          )}

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {info.qualities.length > 0 && (
              <span className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 hover:shadow-md"
                style={{ 
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(59, 130, 246, 0.08) 100%)", 
                  color: "var(--accent-3)", 
                  border: "1px solid rgba(99, 102, 241, 0.2)" 
                }}>
                📹 {info.qualities.length} quality
              </span>
            )}
            {info.audioOnly.length > 0 && (
              <span className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 hover:shadow-md"
                style={{ 
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.08) 100%)", 
                  color: "var(--accent-4)", 
                  border: "1px solid rgba(139, 92, 246, 0.2)" 
                }}>
                🎵 MP3 audio
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
