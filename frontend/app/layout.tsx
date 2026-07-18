import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "VideoSnap — Download Any Video",
  description:
    "Download videos in any quality — 144p to 4K, plus MP3 audio extraction.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}