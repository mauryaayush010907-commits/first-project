export function buildProxyUrl(url: string): string | null {
  if (!url) return null;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://first-project-dag3.onrender.com";

  try {
    new URL(url);
  } catch {
    return null;
  }

  return `${baseUrl}/api/proxy?url=${encodeURIComponent(url)}`;
}
