# VIDEO NOT PLAYING - EMERGENCY FIX

## Step 1: Test Videos Directly

Open this URL in your browser:
```
http://localhost:8080/test-video.html
```

**What to check:**
- Do the videos play on this simple test page?
- If YES → Problem is in React component
- If NO → Problem is with video files or server

---

## Step 2: Check Browser Console

1. Open your app: `http://localhost:8080`
2. Navigate to highlights
3. Press **F12** (or Cmd+Option+I)
4. Click "Console" tab
5. Click a highlight card
6. **Look for errors!**

Common errors:
- "Failed to load resource" → Video path wrong
- "CORS error" → Server config issue
- "Video codec not supported" → Video format issue

---

## Step 3: Check Network Tab

1. Stay in DevTools (F12)
2. Click "Network" tab
3. Click a highlight
4. Look for `video1.mp4`, `video2.mp4`, `video3.mp4`
5. Check status code:
   - **200 OK** → Video loaded! (React issue)
   - **404** → Video not found (path issue)
   - **Other** → Server issue

---

## Quick Fix Options:

### Fix 1: Hard Refresh Browser
```
Cmd + Shift + R
```
Clears cache, forces reload

### Fix 2: Restart Dev Server
In terminal where `npm run dev` is running:
```
Ctrl + C (stop)
npm run dev (restart)
```

### Fix 3: Check Video Files
```bash
ls -lh /Users/juansebastian/educapture-ai-pipeline/frontend/public/demo-videos/
```
Should show 3 .mp4 files

### Fix 4: Try Different Video Path
Edit: `src/components/HighlightsViewer.tsx`

Change line 18 from:
```typescript
video_url: "/demo-videos/video1.mp4"
```

To:
```typescript
video_url: "/demo-videos/video1.mp4?t=" + Date.now()
```

(Cache busting)

---

## What I Need From You:

**Open browser console (F12) and tell me:**

1. What errors show when you click a highlight?
2. Does the test page work? (`http://localhost:8080/test-video.html`)
3. What's in the Network tab when you click a highlight?

**Send me screenshot or paste errors here!**

---

## Nuclear Option - Create Simple Working Version:

If nothing works, I can create a super simple single-page version that JUST plays videos with no React complexity.

Would you like me to do that?
