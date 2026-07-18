export function getPlatform(url) {
  if (!url || typeof url !== 'string') return 'unknown';
  const normalized = url.trim();
  const maybeUrl = /^https?:\/\//i.test(normalized) ? normalized : `https://${normalized}`;
  let parsed;
  try { parsed = new URL(maybeUrl); } catch { return 'unknown'; }
  const hostname = parsed.hostname.replace(/^www\./i, '').toLowerCase();
  if (hostname === 'youtube.com' || hostname === 'youtu.be' || hostname.endsWith('youtube.com')) return 'youtube';
  if (hostname === 'instagram.com' || hostname === 'instagr.am') return 'instagram';
  if (hostname === 'facebook.com' || hostname === 'fb.com' || hostname === 'fb.watch' || hostname.endsWith('facebook.com')) return 'facebook';
  if (hostname === 'reddit.com' || hostname === 'redd.it' || hostname.endsWith('reddit.com')) return 'reddit';
  if (hostname === 'vimeo.com' || hostname === 'player.vimeo.com' || hostname.endsWith('vimeo.com')) return 'vimeo';
  if (hostname === 'tiktok.com' || hostname === 'www.tiktok.com' || hostname === 'vm.tiktok.com' || hostname.endsWith('tiktok.com')) return 'tiktok';
  if (hostname === 'twitter.com' || hostname === 'x.com' || hostname === 'mobile.twitter.com' || hostname.endsWith('twitter.com') || hostname.endsWith('x.com')) return 'twitter';
  return 'unknown';
}
