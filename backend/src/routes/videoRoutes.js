import express from 'express';
import { Readable } from 'stream';
import { analyzeVideo, spawnDownload } from '../services/videoService.js';

const router = express.Router();

router.post('/analyze', async (req, res) => {
  try {
    const url = String(req.body?.url || '').trim();
    if (!url) return res.status(400).json({ success: false, error: 'A valid URL is required.' });
    const data = await analyzeVideo(url);
    return res.json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to analyze the URL.';
    return res.status(message.includes('Invalid') ? 400 : 500).json({ success: false, error: message });
  }
});

router.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url ? String(req.query.url) : '';
  if (!targetUrl) return res.status(400).json({ error: 'Missing URL parameter' });

  try {
    const parsed = new URL(targetUrl);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return res.status(400).json({ error: 'Only HTTP and HTTPS URLs are supported.' });
    }

    const upstream = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        Referer: parsed.hostname.includes('instagram.com') ? 'https://www.instagram.com/' : 'https://www.google.com/',
      },
    });

    res.set({
      'Content-Type': upstream.headers.get('content-type') || 'application/octet-stream',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
    });

    if (!upstream.ok) {
      const body = await upstream.text();
      return res.status(upstream.status).send(body);
    }

    if (!upstream.body) {
      return res.end();
    }

    const nodeStream = Readable.fromWeb(upstream.body);
    nodeStream.pipe(res);
  } catch (error) {
    return res.status(500).json({ error: `Proxy failed: ${error instanceof Error ? error.message : 'Unknown error'}` });
  }
});

router.get('/download', (req, res) => {
  const url = req.query.url ? String(req.query.url) : '';
  const formatId = req.query.formatId ? String(req.query.formatId) : '';
  const type = req.query.type === 'audio' ? 'audio' : 'video';
  const filename = req.query.filename ? String(req.query.filename) : 'download';
  if (!url) return res.status(400).json({ error: 'Missing URL parameter' });
  const safeFilename = filename.replace(/[^a-z0-9\-_ ]/gi, '_').slice(0, 80).trim() || 'download';
  const contentType = type === 'audio' ? 'audio/mpeg' : 'video/mp4';
  const ext = type === 'audio' ? 'mp3' : 'mp4';
  const disposition = `attachment; filename="${safeFilename}.${ext}"`;
  try {
    const proc = spawnDownload(url, formatId, type);
    res.status(200);
    res.set({
      'Content-Type': contentType,
      'Content-Disposition': disposition,
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
    });

    proc.stdout.pipe(res);
    proc.stderr.on('data', (d) => {
      const msg = d.toString();
      if (msg.includes('ERROR')) console.error('[yt-dlp stderr]', msg);
    });
    proc.on('close', (code) => {
      if (code !== 0 && code !== null) console.error(`[download] yt-dlp exited with code ${code}`);
    });
    proc.on('error', (err) => console.error('[download spawn error]', err.message));
    req.on('close', () => proc.kill('SIGTERM'));
    return undefined;
  } catch (error) {
    return res.status(500).json({ error: `Download failed: ${error instanceof Error ? error.message : 'Unknown error'}` });
  }
});

export default router;
