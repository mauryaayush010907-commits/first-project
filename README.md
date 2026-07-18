# Full Stack Video Downloader

A full-stack video downloader app with a Next.js frontend and an Express backend.

## Project structure

- frontend: Next.js UI and client-side logic
- backend: Express API, video processing, and database integration

## Prerequisites

- Node.js 18+
- npm

## Setup

1. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Copy environment examples and adjust values if needed:
   ```bash
   cp frontend/.env.example frontend/.env.local
   cp backend/.env.example backend/.env.local
   ```

## Run locally

Frontend:
```bash
cd frontend
npm run dev
```

Backend:
```bash
cd backend
npm run dev
```

## Build

Frontend build:
```bash
cd frontend
npm run build
```
