import type { Metadata } from "next";

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

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
