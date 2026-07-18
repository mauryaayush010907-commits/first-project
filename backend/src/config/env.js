import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.DATABASE_URL || process.env.MONGODB_URI || '',
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
};
