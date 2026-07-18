import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact VideoSnap — Get in Touch",
  description:
    "Contact VideoSnap with questions, feedback, or concerns. Fill out our contact form and we'll respond within 24-48 hours.",
  openGraph: {
    title: "Contact VideoSnap",
    description: "Get in touch with the VideoSnap team for support and feedback",
    type: "website",
    url: "https://videosnap.app/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
