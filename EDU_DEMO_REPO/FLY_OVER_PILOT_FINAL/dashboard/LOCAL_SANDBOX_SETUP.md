# 🧪 Local Sandbox Frontend - Testing Environment

## Overview
This is your **local testing environment** for the EduCapture frontend that connects to the **live production backend** deployed on Render.

- **Frontend**: Runs locally at `http://localhost:8080` with hot-reload
- **Backend**: Production API at `https://educapture-backend-ai-fastapi.onrender.com`
- **Purpose**: Test and develop frontend features without deploying

---

## ✅ Configuration Complete

Your environment is configured and ready to use:

### Environment Variables (`.env.local`)
```bash
VITE_API_BASE_URL=https://educapture-backend-ai-fastapi.onrender.com
VITE_AI_PIPELINE_URL=https://educapture-backend-ai-fastapi.onrender.com
VITE_APP_NAME=EduCapture Lesson Replay Drive
VITE_APP_VERSION=1.0.0
VITE_DEBUG_MODE=true
```

### Backend Status
✅ **Service**: educapture-ai-pipeline  
✅ **Version**: 1.0.0  
✅ **Status**: healthy  
✅ **Database**: Connected  
✅ **Pipeline**: Available  

---

## 🚀 Quick Start

### Start the Development Server

From the `frontend` directory, run:

```bash
./start-dev.sh
```

**OR** manually:

```bash
npm run dev
```

The server will start at: **http://localhost:8080**

---

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 8080) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `./start-dev.sh` | Automated startup with health checks |

---

## 🔌 API Endpoints Available

Your frontend can now call these production endpoints:

### Health & Status
- `GET /health` - Service health check
- `GET /api/v1/status` - Detailed service status

### Video Analysis
- `POST /api/analyze-video` - Submit video for AI analysis
- `GET /api/feedback/{feedback_id}` - Get feedback by ID
- `GET /api/lesson/{firebase_lesson_id}/feedbacks` - Get all feedbacks for a lesson

### Interactive Docs
- View full API docs: https://educapture-backend-ai-fastapi.onrender.com/docs

---

## 🧪 Testing the Setup

### 1. Test Backend Connection

```bash
curl https://educapture-backend-ai-fastapi.onrender.com/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "educapture-ai-pipeline",
  "version": "1.0.0",
  "database_connected": true,
  "pipeline_available": true
}
```

### 2. Test Frontend

1. Start the dev server: `./start-dev.sh`
2. Open browser: `http://localhost:8080`
3. Open browser console (F12)
4. Check for any connection errors
5. Verify API calls go to the Render backend

---

## 🎯 Development Workflow

### Making Changes

1. **Edit frontend code** in `src/` directory
2. **Save** - Vite will auto-reload
3. **Test** - Changes appear instantly in browser
4. **Inspect** - Check browser console for API calls

### API Integration

The frontend has two API clients ready to use:

#### 1. General Backend API (`src/lib/api.ts`)
```typescript
import { apiClient } from '@/lib/api';

// Health check
await apiClient.healthCheck();

// Coach interactions
await apiClient.chatWithCoach({
  session_id: 123,
  student_id: 456,
  message: "How did I do?"
});
```

#### 2. AI Pipeline API (`src/lib/aiPipelineApi.ts`)
```typescript
import { aiPipelineClient } from '@/lib/aiPipelineApi';

// Check pipeline status
const status = await aiPipelineClient.getStatus();

// Analyze video
const job = await aiPipelineClient.analyzeVideo({
  video_url: "https://example.com/video.mp4"
});

// Get results
const result = await aiPipelineClient.getJobResult(job.job_id);
```

---

## 🔧 Configuration Files

- **`.env.local`** - Your environment configuration (gitignored)
- **`.env.example`** - Template for environment variables
- **`vite.config.ts`** - Vite build configuration with proxy settings
- **`start-dev.sh`** - Automated startup script

---

## 🔐 Security Notes

- ✅ `.env.local` is gitignored - safe to store URLs
- ✅ No API keys needed in frontend (backend handles auth)
- ✅ CORS is configured on backend for local development
- ✅ All sensitive credentials remain on backend

---

## 🐛 Troubleshooting

### Frontend won't start
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Can't connect to backend
```bash
# Test backend directly
curl https://educapture-backend-ai-fastapi.onrender.com/health

# Check environment variable
cat .env.local | grep VITE_API_BASE_URL
```

### CORS errors
- Check browser console for specific error
- Verify backend CORS settings allow your local origin
- Backend should allow: `http://localhost:8080`

### Port 8080 already in use
```bash
# Find and kill process using port 8080
lsof -ti:8080 | xargs kill -9

# Or change port in vite.config.ts
```

---

## 📚 Additional Resources

- **Backend API Docs**: https://educapture-backend-ai-fastapi.onrender.com/docs
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev
- **shadcn/ui Components**: https://ui.shadcn.com

---

## 🎉 Next Steps

1. **Start the server**: `./start-dev.sh`
2. **Open browser**: http://localhost:8080
3. **Test features**: Try video analysis, coach chat, etc.
4. **Develop**: Make changes and see them live!
5. **Iterate**: This is your sandbox - experiment freely!

---

**Environment**: Local Development → Production Backend  
**Last Updated**: 2025-10-05  
**Backend URL**: https://educapture-backend-ai-fastapi.onrender.com
