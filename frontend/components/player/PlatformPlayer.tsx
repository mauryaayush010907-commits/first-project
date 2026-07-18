"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { buildProxyUrl } from "@/lib/proxy";
import type { PlatformName } from "@/lib/platforms";

const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
});

interface Props {
  platform: PlatformName;
  url: string;
  previewUrl?: string | null;
  previewMime?: string | null;
  poster?: string;
  title?: string;
  onError?: () => void;
  onLoaded?: () => void;
}

export default function PlatformPlayer({
  platform,
  url,
  previewUrl,
  previewMime,
  poster,
  onError,
  onLoaded,
}: Props) {
  const [videoError, setVideoError] = useState(false);

  const proxyPoster = useMemo(
    () => (poster ? buildProxyUrl(poster) ?? undefined : undefined),
    [poster]
  );

  const proxySource = useMemo(
    () => (previewUrl ? buildProxyUrl(previewUrl) ?? undefined : undefined),
    [previewUrl]
  );

  if (platform === "youtube") {
    return (
      <div className="relative w-full overflow-hidden rounded-[24px] bg-black" style={{ paddingTop: "56.25%", minHeight: 280 }}>
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          controls
          playing={false}
          muted
          playsInline
          className="absolute inset-0"
          config={{
            youtube: {
              playerVars: {
                origin: typeof window !== "undefined" ? window.location.origin : "",
                rel: 0,
                modestbranding: 1,
                iv_load_policy: 3,
              },
            },
          }}
          onReady={() => onLoaded?.()}
          onError={() => {
            setVideoError(true);
            onError?.();
          }}
        />
      </div>
    );
  }

  if (!proxySource) {
    return (
      <div className="flex h-full min-h-[260px] items-center justify-center rounded-[24px] bg-slate-950/5 p-8 text-center text-sm text-slate-600 shadow-inner">
        <div className="max-w-xl space-y-3">
          <p className="font-semibold text-slate-900">No preview source available.</p>
          <p>We could not build a browser preview for this media source. Use the download options below.</p>
        </div>
      </div>
    );
  }

  const mimeType = previewMime ?? "video/mp4";

  if (videoError) {
    return (
      <div className="flex h-full min-h-[260px] items-center justify-center rounded-[24px] bg-slate-950/5 p-8 text-center text-sm text-slate-600 shadow-inner">
        <div className="max-w-xl space-y-3">
          <p className="font-semibold text-slate-900">Preview unavailable for this platform.</p>
          <p>Video streaming may be blocked by the source or the preview is not browser compatible.</p>
          <p className="text-slate-500">Download still works through the format options below.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-[24px] bg-slate-950/5" style={{ paddingTop: "56.25%", minHeight: 280 }}>
      <video
        controls
        playsInline
        poster={proxyPoster}
        preload="metadata"
        className="absolute inset-0 h-full w-full object-contain"
        onLoadedData={() => onLoaded?.()}
        onError={() => {
          setVideoError(true);
          onError?.();
        }}
      >
        <source src={proxySource} type={mimeType} />
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
}
