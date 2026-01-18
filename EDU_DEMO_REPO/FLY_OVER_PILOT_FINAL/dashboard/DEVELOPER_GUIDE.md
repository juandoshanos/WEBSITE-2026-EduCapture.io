# Developer Guide - Frontend Setup with Hardcoded Video

## Overview
This guide explains how to set up the EduCapture frontend locally and hardcode a test video for development/demo purposes.

---

## 📦 What to Share with Your Developer

### Package the Frontend
You can share just the `frontend` folder with your developer. Here's what to include:

```bash
# From the project root, create a zip of the frontend
cd /Users/juansebastian/educapture-ai-pipeline
zip -r educapture-frontend.zip frontend/ -x "frontend/node_modules/*" -x "frontend/dist/*" -x "frontend/.DS_Store"
```

**What's included:**
- `/frontend/src/` - All React/TypeScript source code
- `/frontend/package.json` - Dependencies list
- `/frontend/.env.example` - Environment template
- `/frontend/vite.config.ts` - Build configuration
- `/frontend/tailwind.config.ts` - Styling configuration
- All configuration files

**What's excluded (developer will generate):**
- `node_modules/` - Will be installed via `npm install`
- `dist/` - Will be created on build
- `.DS_Store` - macOS system files

---

## 🚀 Developer Setup Steps

### 1. Extract and Install

```bash
# Extract the zip file
unzip educapture-frontend.zip

# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

### 2. Configure Environment

Edit `.env.local`:

```bash
# Point to your production backend
VITE_API_BASE_URL=https://educapture-backend-ai-fastapi.onrender.com
VITE_AI_PIPELINE_URL=https://educapture-backend-ai-fastapi.onrender.com

# App settings
VITE_APP_NAME=EduCapture Lesson Replay Drive
VITE_APP_VERSION=1.0.0
VITE_DEBUG_MODE=true
```

### 3. Start Development Server

```bash
npm run dev
```

Open browser: http://localhost:8080

---

## 🎬 How to Hardcode a Video

Your developer has **two options** for hardcoding a video:

### Option 1: Hardcode Video in HighlightsViewer Component (Recommended)

Edit: `src/components/HighlightsViewer.tsx`

**Location to modify:** Around line 20-30 where data is fetched

**Current code (dynamic):**
```typescript
const [highlights, setHighlights] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  // Fetches highlights from API
  fetchHighlights();
}, []);
```

**Replace with (hardcoded):**
```typescript
const [highlights, setHighlights] = useState([
  {
    id: 1,
    timestamp: "00:02:15",
    title: "Lane Position",
    description: "Excellent lane positioning during the turn",
    video_url: "https://your-video-url.com/lesson-video.mp4",
    category: "positive",
    feedback: "Great job maintaining proper lane position throughout the turn."
  },
  {
    id: 2,
    timestamp: "00:05:30",
    title: "Mirror Check",
    description: "Missed mirror check before changing lanes",
    video_url: "https://your-video-url.com/lesson-video.mp4",
    category: "improvement",
    feedback: "Remember to check your mirrors before any lane change."
  }
]);
const [loading, setLoading] = useState(false);

// Comment out or remove the useEffect that fetches data
// useEffect(() => {
//   fetchHighlights();
// }, []);
```

**Full example with a test video:**
```typescript
// Around line 15-50 in HighlightsViewer.tsx
const HighlightsViewer = ({ lessonId, studentId, onBack, role }) => {
  // HARDCODED DATA - Replace this section
  const [highlights, setHighlights] = useState([
    {
      id: 1,
      timestamp: "00:00:00",
      start_time: 0,
      end_time: 30,
      title: "Starting the Lesson",
      description: "Beginning of driving lesson",
      video_url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
      category: "positive",
      feedback: "Good starting position and pre-drive checks completed successfully.",
      severity: "low"
    },
    {
      id: 2,
      timestamp: "00:00:05",
      start_time: 5,
      end_time: 10,
      title: "Mirror Check Excellence",
      description: "Proper use of mirrors demonstrated",
      video_url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
      category: "positive",
      feedback: "Excellent mirror usage before pulling out. Keep this up!",
      severity: "low"
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Remove or comment out API fetch
  // useEffect(() => {
  //   fetchHighlights();
  // }, [lessonId, studentId]);
  
  // Rest of component code...
};
```

---

### Option 2: Create a Dedicated Demo Page

**Create new file:** `src/pages/VideoDemo.tsx`

```typescript
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const VideoDemo = () => {
  const [currentHighlight, setCurrentHighlight] = useState(0);
  
  // HARDCODED TEST DATA
  const demoHighlights = [
    {
      id: 1,
      timestamp: "00:00:00",
      title: "Starting Position",
      video_url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
      feedback: "Good starting position and checks.",
      category: "positive"
    },
    {
      id: 2,
      timestamp: "00:00:05",
      title: "Mirror Check",
      video_url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
      feedback: "Excellent mirror usage!",
      category: "positive"
    }
  ];

  const highlight = demoHighlights[currentHighlight];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Video Demo - Hardcoded</h1>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>{highlight.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{highlight.timestamp}</p>
          </CardHeader>
          <CardContent>
            <video 
              controls 
              className="w-full rounded-lg mb-4"
              src={highlight.video_url}
            >
              Your browser does not support video playback.
            </video>
            <p className="text-lg">{highlight.feedback}</p>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button 
            onClick={() => setCurrentHighlight(0)} 
            disabled={currentHighlight === 0}
          >
            Previous
          </Button>
          <Button 
            onClick={() => setCurrentHighlight(1)} 
            disabled={currentHighlight === 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoDemo;
```

**Then add route in `src/App.tsx`:**

```typescript
import VideoDemo from "./pages/VideoDemo";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/demo" element={<VideoDemo />} />  {/* ADD THIS LINE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
```

**Access at:** http://localhost:8080/demo

---

## 🎥 Where to Get Test Videos

### Free Test Video URLs:
```
# 10 second sample (1MB)
https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4

# 30 second sample (5MB)
https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_5MB.mp4

# Sample from archive.org
https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4
```

### Using Your Own Video:
1. Upload to Google Cloud Storage, AWS S3, or similar
2. Make the file publicly accessible
3. Use the public URL in the hardcoded data

---

## 📝 What Data Structure to Use

Your highlights should match this format:

```typescript
interface Highlight {
  id: number;                    // Unique identifier
  timestamp: string;             // Display time (e.g., "00:02:15")
  start_time?: number;           // Optional: seconds from start
  end_time?: number;             // Optional: seconds from end
  title: string;                 // Short title
  description?: string;          // Optional: longer description
  video_url: string;             // Video URL (can be same for all)
  category: 'positive' | 'improvement' | 'critical';
  feedback: string;              // AI feedback text
  severity?: 'low' | 'medium' | 'high';
}
```

---

## 🔧 Quick Commands Reference

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 📂 Key Files Your Developer Will Edit

| File | Purpose |
|------|---------|
| `src/components/HighlightsViewer.tsx` | Main video/highlights viewer |
| `src/pages/Index.tsx` | Main app page/router |
| `src/App.tsx` | App root with routing |
| `.env.local` | Environment configuration |
| `src/lib/aiPipelineApi.ts` | API client (if needed) |

---

## 🐛 Common Issues

### Video won't play
- Check CORS - video host must allow cross-origin requests
- Try a different test video URL
- Check browser console for errors

### Port already in use
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9
```

### Dependencies won't install
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 💡 Tips for Your Developer

1. **Use browser DevTools** - Check console and network tab for errors
2. **Hot reload** - Changes appear instantly, no need to restart
3. **Component structure** - UI components are in `src/components/ui/`
4. **Styling** - Uses Tailwind CSS classes
5. **State management** - React hooks (useState, useEffect)

---

## 🎯 Expected Result

After hardcoding, your developer should be able to:

1. Start the app: `npm run dev`
2. Navigate to highlights section
3. See hardcoded video playing
4. See hardcoded feedback/highlights
5. Test UI interactions without backend dependency

---

## 📞 Next Steps

Once hardcoded version is working:
1. Take screenshots/video of the demo
2. Share with stakeholders for feedback
3. When ready, connect to real backend API
4. Replace hardcoded data with API calls

---

**Remember:** The backend is already live at `https://educapture-backend-ai-fastapi.onrender.com` - when ready to connect to real data, your developer just needs to remove the hardcoded data and uncomment the API fetch calls.
