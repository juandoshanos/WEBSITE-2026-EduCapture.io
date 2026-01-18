# 🎬 Quick Guide: Hardcode a Video in 5 Minutes

## For Your Developer

This is the **fastest way** to get a video playing in the frontend for demo purposes.

---

## ⚡ Super Quick Version

**File to edit:** `src/components/HighlightsViewer.tsx`

**Line 8-39:** Replace the `mockHighlights` array with your video URL:

```typescript
const mockHighlights = [
  {
    id: 1,
    title: "Driving Lesson Highlight",
    duration: "0:45",
    timestamp: "00:00",
    description: "Test video for demonstration",
    category: "Demo",
    rating: 5,
    thumbnail: "/placeholder.svg",
    video_url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4"
  }
];
```

**Then modify the video player section around line 87-106** to actually play the video:

```typescript
<div className="relative bg-black aspect-video">
  {selectedHighlight ? (
    <video 
      controls 
      className="w-full h-full"
      src={mockHighlights.find(h => h.id === selectedHighlight)?.video_url}
    >
      Your browser does not support video playback.
    </video>
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-muted">
      <div className="text-center text-muted-foreground">
        <Play className="h-16 w-16 mx-auto mb-4" />
        <p className="text-lg font-medium">Select a highlight to watch</p>
      </div>
    </div>
  )}
</div>
```

**That's it!** Save and the video will play.

---

## 🎥 Test Video URLs (Ready to Use)

Just copy/paste one of these:

```
https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4

https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4

https://www.w3schools.com/html/mov_bbb.mp4
```

---

## 📋 Step-by-Step (Detailed)

### 1. Open the file
```bash
# In your code editor, open:
src/components/HighlightsViewer.tsx
```

### 2. Find line 8 (mockHighlights array)

**Current code:**
```typescript
const mockHighlights = [
  {
    id: 1,
    title: "Perfect Parallel Parking",
    duration: "0:45",
    timestamp: "15:30",
    description: "Excellent execution of parallel parking...",
    category: "Parking",
    rating: 5,
    thumbnail: "/placeholder.svg"
  },
  // ... more highlights
];
```

### 3. Add video_url to each highlight

**Updated code:**
```typescript
const mockHighlights = [
  {
    id: 1,
    title: "Perfect Parallel Parking",
    duration: "0:45",
    timestamp: "15:30",
    description: "Excellent execution of parallel parking...",
    category: "Parking",
    rating: 5,
    thumbnail: "/placeholder.svg",
    video_url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4"  // ADD THIS
  },
  {
    id: 2,
    title: "Smooth Lane Change",
    duration: "0:30",
    timestamp: "28:15",
    description: "Great demonstration of checking blind spots...",
    category: "Highway Driving",
    rating: 4,
    thumbnail: "/placeholder.svg",
    video_url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4"  // ADD THIS
  }
];
```

### 4. Replace the video placeholder (around line 87-106)

**Find this section:**
```typescript
<div className="relative bg-black aspect-video">
  {selectedHighlight ? (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/40">
      <div className="text-center text-white">
        <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium">
          {mockHighlights.find(h => h.id === selectedHighlight)?.title}
        </p>
        <p className="text-sm opacity-75">Click play to watch highlight</p>
      </div>
    </div>
  ) : (
    // ... rest of code
```

**Replace with:**
```typescript
<div className="relative bg-black aspect-video">
  {selectedHighlight ? (
    <video 
      controls 
      autoPlay
      className="w-full h-full object-contain"
      src={mockHighlights.find(h => h.id === selectedHighlight)?.video_url}
    >
      <p className="text-white">Your browser does not support video playback.</p>
    </video>
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-muted">
      <div className="text-center text-muted-foreground">
        <Play className="h-16 w-16 mx-auto mb-4" />
        <p className="text-lg font-medium">Select a highlight to watch</p>
        <p className="text-sm">Choose from the highlights list to begin viewing</p>
      </div>
    </div>
  )}
```

### 5. Save and test

```bash
# If dev server is running, changes appear instantly
# If not, start it:
npm run dev
```

**Test it:**
1. Open http://localhost:8080
2. Select a role (Student or Instructor)
3. Click "View Highlights"
4. Click on a highlight in the list
5. Video should play!

---

## 🎯 Alternative: Simplest Possible Demo Page

If you just want the absolute simplest video player, create this new file:

**Create:** `src/pages/SimpleVideoDemo.tsx`

```typescript
const SimpleVideoDemo = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          EduCapture Video Demo
        </h1>
        
        <video 
          controls 
          autoPlay
          className="w-full rounded-lg shadow-2xl"
          src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4"
        >
          Your browser does not support video playback.
        </video>
        
        <div className="mt-8 text-white text-center">
          <h2 className="text-2xl font-semibold mb-4">Lesson Feedback</h2>
          <p className="text-lg text-gray-300">
            Great job on mirror checks and lane positioning! 
            Remember to check blind spots before changing lanes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleVideoDemo;
```

**Add route in `src/App.tsx`:**

```typescript
import SimpleVideoDemo from "./pages/SimpleVideoDemo";

// In the Routes section, add:
<Route path="/simple-demo" element={<SimpleVideoDemo />} />
```

**Access at:** http://localhost:8080/simple-demo

---

## 🚨 Troubleshooting

### Video won't play
- ✅ Check browser console (F12) for errors
- ✅ Try a different video URL from the list above
- ✅ Make sure video URL starts with `https://`
- ✅ Some videos need CORS - use test URLs provided

### Component errors
- ✅ Make sure `video_url` is added to ALL highlights
- ✅ Check for typos in property names
- ✅ Verify file saved before testing

### Can't find the file
```bash
# From frontend directory:
ls src/components/HighlightsViewer.tsx

# Should show the file path
```

---

## ✅ Success Checklist

- [ ] Opened `HighlightsViewer.tsx`
- [ ] Added `video_url` to mockHighlights array
- [ ] Replaced placeholder with `<video>` element
- [ ] Saved file
- [ ] Started dev server (`npm run dev`)
- [ ] Navigated to highlights in the app
- [ ] Selected a highlight
- [ ] Video plays!

---

## 📞 Need More Help?

Full documentation: `DEVELOPER_GUIDE.md`

**Questions to ask yourself:**
1. Is the dev server running? (`npm run dev`)
2. Did you save the file after editing?
3. Is the browser showing the latest changes? (try hard refresh: Cmd+Shift+R)
4. Any errors in browser console? (F12 to open)

---

**That's it!** This should take 5-10 minutes maximum to get a video playing in the frontend.
