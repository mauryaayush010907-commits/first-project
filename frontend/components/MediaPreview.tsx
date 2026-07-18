"use client";

import { useMemo, useState } from "react";
import type { PlatformName } from "@/lib/platforms";
import { getPlatform } from "@/lib/platforms";
import PlatformPlayer from "@/components/player/PlatformPlayer";

interface Props {
  url: string;
  title?: string;
  thumbnail?: string | null;
  duration?: number | null;
  platform?: PlatformName;
  previewUrl?: string | null;
  previewMime?: string | null;
}

const PLATFORM_LABELS: Record<PlatformName, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  facebook: "Facebook",
  reddit: "Reddit",
  vimeo: "Vimeo",
  tiktok: "TikTok",
  twitter: "Twitter/X",
  unknown: "Unknown",
};

const PLATFORM_ICONS: Record<PlatformName, string> = {
  youtube: "▶",
  instagram: "📸",
  facebook: "📘",
  reddit: "👽",
  vimeo: "🎬",
  tiktok: "🎵",
  twitter: "🐦",
  unknown: "❔",
};

export default function MediaPreview({
  url,
  title,
  thumbnail,
  duration,
  platform: explicitPlatform,
  previewUrl,
  previewMime,
}: Props) {
  const platform = useMemo(() => explicitPlatform ?? getPlatform(url), [explicitPlatform, url]);
  const [previewError, setPreviewError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const durationLabel = duration ? `${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, "0")}` : "";
  const description = previewUrl
    ? "Preview loaded through our secure proxy. You can still download full formats below."
    : "Preview unavailable. Use the download options below to save the file to your device.";

  return (
    <section className="glass-card p-6 mb-8" style={{ background: "rgba(255, 250, 245, 0.95)", border: "1px solid rgba(156, 163, 175, 0.18)" }}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 bg-slate-100 shadow-sm">
            <span>{PLATFORM_ICONS[platform]}</span>
            <span>{PLATFORM_LABELS[platform]} Preview</span>
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {title || "Preview your media"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            {durationLabel && <span>⏱ {durationLabel}</span>}
            <span>🔗 {platform === "unknown" ? "Universal preview" : PLATFORM_LABELS[platform]}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 relative overflow-hidden rounded-[24px] border border-slate-200 bg-slate-950/5 min-h-[260px] shadow-2xl shadow-slate-200/30">
        <PlatformPlayer
          platform={platform}
          url={url}
          previewUrl={previewUrl}
          previewMime={previewMime}
          poster={thumbnail ?? undefined}
          title={title}
          onError={() => setPreviewError(true)}
          onLoaded={() => setLoaded(true)}
        />

        {previewError && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 text-white">
            <div className="max-w-xl text-center px-6 py-8">
              <p className="font-semibold text-lg">Preview unavailable for this platform.</p>
              <p className="mt-2 text-sm text-slate-200">The preview could not load due to remote embed restrictions, but downloads still work below.</p>
            </div>
          </div>
        )}

        {!loaded && previewUrl && !previewError && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 text-white">
            <div className="flex flex-col items-center gap-3 text-sm">
              <div className="flex items-center gap-2 rounded-full bg-slate-900/90 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-200">
                Loading preview...
              </div>
            </div>
          </div>
        )}
      </div>

      {!previewUrl && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white/80 p-5 text-sm text-slate-600 shadow-sm">
          <p className="font-semibold text-slate-900">Fallback preview active</p>
          <p className="mt-2">If the direct browser preview cannot play, use the download options below for the full media file.</p>
        </div>
      )}
    </section>
  );
}
