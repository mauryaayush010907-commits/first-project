export type PlatformName = "youtube" | "instagram" | "facebook" | "reddit" | "vimeo" | "tiktok" | "twitter" | "unknown";

export function getPlatform(url: string): PlatformName {
  const normalized = url.toLowerCase();

  if (normalized.includes("youtube.com") || normalized.includes("youtu.be")) return "youtube";
  if (normalized.includes("instagram.com")) return "instagram";
  if (normalized.includes("facebook.com")) return "facebook";
  if (normalized.includes("reddit.com")) return "reddit";
  if (normalized.includes("vimeo.com")) return "vimeo";
  if (normalized.includes("tiktok.com")) return "tiktok";
  if (normalized.includes("twitter.com") || normalized.includes("x.com")) return "twitter";

  return "unknown";
}
