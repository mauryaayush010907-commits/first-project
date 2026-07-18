import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — VideoSnap",
  description:
    "Read VideoSnap's privacy policy to understand how we handle your data, cookies, analytics, and user information.",
  openGraph: {
    title: "Privacy Policy",
    description: "How VideoSnap handles your privacy and data",
    type: "website",
    url: "https://videosnap.app/privacy-policy",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
