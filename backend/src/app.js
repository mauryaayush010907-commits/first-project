import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import videoRoutes from './routes/videoRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: [env.frontendOrigin, 'http://localhost:5173', 'http://localhost:3000'], credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api', videoRoutes);
app.use('/api/contact', contactRoutes);

export default app;
