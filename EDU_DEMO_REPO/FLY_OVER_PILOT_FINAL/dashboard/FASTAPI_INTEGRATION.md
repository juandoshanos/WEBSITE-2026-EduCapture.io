# FastAPI Backend Integration Guide

This document explains how the Vite frontend is configured to work with the FastAPI backend deployed on Render.

## Quick Start

### Option 1: Using the startup script (Recommended)
```bash
./start-dev.sh
```

### Option 2: Manual startup
```bash
npm run dev
```

The development server will start on http://localhost:8080

## Configuration

### Environment Variables

The app uses environment variables to configure the API connection:

- **Development**: Copy `.env.example` to `.env.local` and configure
- **Production**: Set environment variables in your deployment platform

#### Available Variables:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8000  # For local development
# VITE_API_BASE_URL=https://your-render-app.onrender.com  # For production

# App Configuration
VITE_APP_NAME=EduCapture Lesson Replay Drive
VITE_APP_VERSION=1.0.0
VITE_DEBUG_MODE=true
```

### Switching Between Local and Production Backend

1. **Local FastAPI Development**:
   ```bash
   # In .env.local
   VITE_API_BASE_URL=http://localhost:8000
   ```

2. **Production Render Backend**:
   ```bash
   # In .env.local
   VITE_API_BASE_URL=https://your-render-app.onrender.com
   ```

## API Integration

### Using the API Client

The app includes a configured API client at `src/lib/api.ts`:

```typescript
import { apiClient, healthCheck, chatWithCoach } from '@/lib/api';

// Check backend connection
const isConnected = await checkBackendConnection();

// Health check
const health = await healthCheck();

// Chat with AI coach
const response = await chatWithCoach({
  student_id: 123,
  message: "I'm nervous about parallel parking",
  personality: "supportive"
});
```

### Available API Methods

- **Health**: `healthCheck()`, `dbHealthCheck()`
- **Coach**: `createCoachSession()`, `getCoachSession()`, `chatWithCoach()`, `getCoachPersonalities()`
- **Checkins**: `getCheckins()`, `createCheckin()`

## Development Setup

### Proxy Configuration

In development, Vite automatically proxies API calls:
- Frontend calls: `fetch('/api/coach/chat')`  
- Vite proxies to: `http://localhost:8000/api/coach/chat`

### Production Build

In production, the app uses the full API URL:
- Frontend calls: `fetch('https://your-render-app.onrender.com/api/coach/chat')`

## FastAPI Backend Endpoints

Based on the FastAPI backend structure, these endpoints are available:

### Health
- `GET /health` - Health check
- `GET /health/db` - Database health check

### Coach API  
- `POST /api/coach/sessions` - Create coach session
- `GET /api/coach/sessions/{id}` - Get coach session
- `GET /api/coach/sessions/{id}/messages` - Get session messages
- `POST /api/coach/chat` - Chat with AI coach
- `GET /api/coach/personalities` - Get available coach personalities

### Checkins API
- `GET /api/checkins` - Get checkins
- `POST /api/checkins` - Create checkin

## Troubleshooting

### Backend Connection Issues

1. **Check if backend is running**:
   ```bash
   curl http://localhost:8000/health
   # or for production
   curl https://your-render-app.onrender.com/health
   ```

2. **Check environment configuration**:
   - Verify `.env.local` has correct `VITE_API_BASE_URL`
   - Check browser network tab for failed requests

3. **CORS Issues**:
   - FastAPI backend already includes CORS middleware
   - Allowed origins: `http://localhost:8080`, `http://localhost:3000`, `http://localhost:5173`

### Common Solutions

- **502/503 errors**: Backend might be cold-starting on Render
- **CORS errors**: Check allowed origins in FastAPI config
- **404 errors**: Verify API endpoint paths match backend routes

## Next Steps

Once your developer provides the Render URL:

1. Update `.env.local`:
   ```bash
   VITE_API_BASE_URL=https://your-actual-render-url.onrender.com
   ```

2. Test the connection:
   ```bash
   curl https://your-actual-render-url.onrender.com/health
   ```

3. Start development:
   ```bash
   ./start-dev.sh
   ```

The frontend will now communicate with your production FastAPI backend!