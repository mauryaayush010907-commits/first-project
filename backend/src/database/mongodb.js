import { MongoClient } from 'mongodb';
import { env } from '../config/env.js';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb, contacts: cachedDb.collection('contacts') };
  }

  if (!env.mongoUri) {
    throw new Error('DATABASE_URL is not defined.');
  }

  const client = new MongoClient(env.mongoUri);
  await client.connect();
  const db = client.db('videosnap');
  const contacts = db.collection('contacts');
  await contacts.createIndex({ createdAt: 1 });
  await contacts.createIndex({ email: 1 });

  cachedClient = client;
  cachedDb = db;

  return { client, db, contacts };
}
