export interface QualityOption {
  formatId: string;
  quality: string;
  height: number;
  filesize: number | null;
  fps?: number;
  needsMerge?: boolean;
}

export interface AudioOption {
  formatId: string;
  abr?: number;
  filesize: number | null;
  quality: string;
}

export type PlatformName = "youtube" | "instagram" | "facebook" | "reddit" | "vimeo" | "tiktok" | "twitter" | "unknown";

export interface VideoInfo {
  title: string;
  thumbnail?: string | null;
  duration: number | null;
  platform: PlatformName;
  previewUrl?: string | null;
  previewMime?: string | null;
  uploader?: string | null;
  qualities: QualityOption[];
  audioOnly: AudioOption[];
}
