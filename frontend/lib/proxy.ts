export function buildProxyUrl(url: string): string | null {
  if (!url) return null;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  try {
    new URL(url);
  } catch {
    return null;
  }

  return `${baseUrl}/api/proxy?url=${encodeURIComponent(url)}`;
}
