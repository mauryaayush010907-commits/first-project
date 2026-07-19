import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import ffmpegPath from 'ffmpeg-static';
import { sanitizeUrl } from '@braintree/sanitize-url';
import { getPlatform } from '../utils/platform.js';

const YT_DLP_BINARY =
  process.env.YTDLP_BINARY ||
  (process.platform === 'win32'
    ? path.join(process.cwd(), 'yt-dlp.exe')
    : 'yt-dlp');
const INSTAGRAM_COOKIES_PATH = process.env.INSTAGRAM_COOKIES_PATH ? path.resolve(process.env.INSTAGRAM_COOKIES_PATH) : undefined;
const HAS_INSTAGRAM_COOKIES = INSTAGRAM_COOKIES_PATH ? fs.existsSync(INSTAGRAM_COOKIES_PATH) : false;
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
const MAX_YTDLP_ATTEMPTS = 3;

function normalizeUrl(value) {
  const sanitized = sanitizeUrl(value || '').trim();
  if (!sanitized || sanitized === 'about:blank') return null;
  try {
    const parsed = new URL(sanitized);
    if (!['http:', 'https:'].includes(parsed.protocol)) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

function getReferer(url) {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    if (hostname.includes('instagram.com')) return 'https://www.instagram.com/';
    if (hostname.includes('facebook.com') || hostname.includes('fbcdn.net')) return 'https://www.facebook.com/';
    if (hostname.includes('tiktok.com')) return 'https://www.tiktok.com/';
    if (hostname.includes('twitter.com') || hostname.includes('x.com')) return 'https://twitter.com/';
    if (hostname.includes('reddit.com')) return 'https://www.reddit.com/';
    if (hostname.includes('vimeo.com')) return 'https://vimeo.com/';
  } catch {}
  return 'https://www.google.com/';
}

function getCommonHeaders(url) {
  const referer = getReferer(url);
  return ['--add-header', `Referer:${referer}`, '--add-header', `User-Agent:${USER_AGENT}`];
}

function getYtdlpArgs(url) {
  const args = ['--dump-single-json', '--no-playlist', '--no-warnings', '--extractor-retries', '3', '--socket-timeout', '30', '--ignore-config', '--no-call-home', '--prefer-free-formats', '--no-progress', '--geo-bypass', ...getCommonHeaders(url)];
  if (HAS_INSTAGRAM_COOKIES && INSTAGRAM_COOKIES_PATH) {
    args.push('--cookies', INSTAGRAM_COOKIES_PATH);
  }
  args.push(url);
  return args;
}

function isTemporaryYtdlpError(message) {
  const normalized = message.toLowerCase();
  return ['http error', 'download error', 'unable to download', 'timeout', 'timed out', 'connection'].some((item) => normalized.includes(item));
}

function runYtDlp(args) {
  let attempts = 0;
  return new Promise((resolve, reject) => {
    const execute = () => {
      attempts += 1;
      
      const proc = spawn(YT_DLP_BINARY, args, { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
      let stdout = '';
      let stderr = '';
      proc.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
      proc.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
      proc.on('error', (err) => {
  if (err.code === 'ENOENT') {
    reject(new Error('yt-dlp is not installed on this server.'));
    return;
  }

  reject(new Error(`Failed to start yt-dlp: ${err.message}`));
});
      proc.on('close', (code) => {
        const errorMessage = stderr.trim();
        if (code === 0) {
          resolve(stdout);
          return;
        }
        if (attempts < MAX_YTDLP_ATTEMPTS && isTemporaryYtdlpError(errorMessage)) {
          setTimeout(execute, attempts * 1000);
          return;
        }
        reject(new Error(`yt-dlp exited with code ${code ?? 'unknown'}: ${errorMessage}`));
      });
    };
    execute();
  });
}

function formatContentType(ext) {
  switch (ext.toLowerCase()) {
    case 'mp4': return 'video/mp4';
    case 'webm': return 'video/webm';
    case 'm4a': return 'audio/mp4';
    case 'mp3': return 'audio/mpeg';
    case 'ogg': return 'audio/ogg';
    case 'wav': return 'audio/wav';
    default: return 'application/octet-stream';
  }
}

function choosePreviewFormat(formats) {
  const validFormats = formats.filter((format) => format.url && format.vcodec && format.vcodec !== 'none');
  if (validFormats.length === 0) return null;
  return validFormats.sort((a, b) => Number(b.height ?? 0) - Number(a.height ?? 0))[0];
}

function getPreviewData(format) {
  if (!format?.url) return null;
  return {
    previewUrl: String(format.url),
    previewMime: format.ext ? formatContentType(format.ext) : 'application/octet-stream',
  };
}

export async function analyzeVideo(url) {
  const normalizedUrl = normalizeUrl(url);
  if (!normalizedUrl) throw new Error('Invalid URL provided.');
  const platform = getPlatform(normalizedUrl);
  const raw = await runYtDlp(getYtdlpArgs(normalizedUrl));
  const data = JSON.parse(raw);
  const formats = Array.isArray(data.formats) ? data.formats : [];
  const previewFormat = choosePreviewFormat(formats);
  const preview = getPreviewData(previewFormat);
  const videoFormats = formats.filter((format) => format.vcodec && format.vcodec !== 'none' && typeof format.height === 'number' && format.height > 0);
  const audioFormats = formats.filter((format) => format.vcodec === 'none' && format.acodec && format.acodec !== 'none');
  const bestAudio = audioFormats.slice().sort((a, b) => Number(b.abr ?? 0) - Number(a.abr ?? 0))[0];
  const qualityMap = {};
  for (const format of videoFormats) {
    const height = Number(format.height ?? 0);
    if (!height || !format.format_id) continue;
    const currentScore = Number(format.filesize ?? 0) + Number(format.tbr ?? 0) * 1000;
    const existing = qualityMap[height];
    const existingScore = existing ? Number(existing.filesize ?? 0) + Number(existing.tbr ?? 0) * 1000 : -1;
    if (!existing || currentScore > existingScore) qualityMap[height] = format;
  }
  const qualities = Object.keys(qualityMap).map(Number).sort((a, b) => b - a).map((height) => {
    const format = qualityMap[height];
    const hasAudio = format.acodec && format.acodec !== 'none';
    const needsMerge = !hasAudio && Boolean(bestAudio);
    const formatId = needsMerge && bestAudio?.format_id ? `${format.format_id}+${bestAudio.format_id}` : String(format.format_id);
    return {
      quality: `${height}p`,
      height,
      formatId,
      ext: String(format.ext ?? 'mp4'),
      filesize: format.filesize ?? null,
      fps: format.fps ?? null,
      needsMerge,
    };
  });
  const audioOnly = audioFormats.slice().sort((a, b) => Number(b.abr ?? 0) - Number(a.abr ?? 0)).slice(0, 4).map((format) => ({ quality: format.abr ? `${Math.round(format.abr)}kbps` : 'audio', formatId: String(format.format_id ?? ''), ext: String(format.ext ?? 'm4a'), abr: format.abr ?? null })).filter((item) => item.formatId);
  return {
    platform,
    title: String(data.title ?? data.fulltitle ?? 'Unknown'),
    thumbnail: String(data.thumbnail ?? ''),
    duration: typeof data.duration === 'number' ? data.duration : null,
    uploader: String(data.uploader ?? data.channel ?? ''),
    webpage_url: String(data.webpage_url ?? normalizedUrl),
    previewUrl: preview?.previewUrl,
    previewMime: preview?.previewMime,
    qualities,
    audioOnly,
    isPrivate: Boolean(data.is_private || data.private),
    cookiesRequired: platform === 'instagram' && /\/stories\//i.test(normalizedUrl) && !HAS_INSTAGRAM_COOKIES,
  };
}

export function spawnDownload(url, formatId, type) {
  const normalizedUrl = normalizeUrl(url);
  if (!normalizedUrl) throw new Error('Invalid download URL');
  const commonArgs = ['--no-playlist', '--socket-timeout', '30', '--ignore-config', '--no-call-home', ...getCommonHeaders(normalizedUrl)];
  if (HAS_INSTAGRAM_COOKIES && INSTAGRAM_COOKIES_PATH) {
    commonArgs.push('--cookies', INSTAGRAM_COOKIES_PATH);
  }
  const args = type === 'audio' ? ['-f', formatId || 'bestaudio', '-x', '--audio-format', 'mp3', '--audio-quality', '0', '--ffmpeg-location', ffmpegPath || '', '-o', '-', ...commonArgs, normalizedUrl] : ['-f', formatId || 'bestvideo+bestaudio/best', '--merge-output-format', 'mp4', '--ffmpeg-location', ffmpegPath || '', '-o', '-', ...commonArgs, normalizedUrl];
  return spawn(YT_DLP_BINARY, args, { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
}
