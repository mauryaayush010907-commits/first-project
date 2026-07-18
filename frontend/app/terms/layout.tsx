import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — VideoSnap",
  description:
    "Read VideoSnap's Terms of Service to understand our usage policies, copyright compliance, user responsibilities, and legal limitations.",
  openGraph: {
    title: "Terms of Service",
    description: "VideoSnap Terms of Service and user agreement",
    type: "website",
    url: "https://videosnap.app/terms",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
