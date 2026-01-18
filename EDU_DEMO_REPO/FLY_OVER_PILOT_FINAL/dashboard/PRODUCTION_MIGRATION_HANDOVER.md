# 🚀 Production Migration Handover Document

**Created:** October 13, 2025  
**Purpose:** Migrate Dutch localization + video highlights from dev repo to production  
**Status:** Ready for deployment

---

## 📋 Executive Summary

This document outlines the complete migration of frontend improvements from the development repository (`educapture-ai-pipeline`) to the production repository (`educapture-repo/apps/lesson-replay-drive`).

### What's Being Migrated:
1. ✅ Complete Dutch localization (UI, mock data, descriptions)
2. ✅ Working video highlights player with real MP4 files
3. ✅ Progress Report component for student tracking
4. ✅ Updated navigation and routing
5. ✅ Dutch student/instructor names and lesson titles

---

## 🗂️ Repository Overview

### Development Repository (Source)
```
📁 /Users/juansebastian/educapture-ai-pipeline/frontend/
├── src/components/
│   ├── HighlightsViewer.tsx        ← Full Dutch + video player
│   ├── StudentDashboard.tsx        ← Dutch names + progress report link
│   ├── InstructorDashboard.tsx     ← Dutch student names
│   ├── RoleSelector.tsx            ← EduCapture branding
│   ├── StudentProfile.tsx          ← Updated
│   └── ProgressReport.tsx          ← NEW COMPONENT
├── src/pages/Index.tsx             ← Updated routing
├── src/assets/videos/              ← NEW: video1.mp4, video2.mp4, video3.mp4
├── public/demo-videos/             ← NEW: Demo videos
└── Documentation (INVESTOR_DEMO_GUIDE.md, etc.)
```

### Production Repository (Target)
```
📁 /Users/juansebastian/educapture-repo/apps/lesson-replay-drive/
├── src/components/                  ← TARGET for component updates
├── src/pages/                       ← TARGET for routing updates
├── src/assets/                      ← TARGET for video assets
└── public/                          ← TARGET for public videos
```

### Backend Repository (Already Live)
```
📁 /Users/juansebastian/educapture-repo/ai_pipeline_export/
├── Status: ✅ DEPLOYED TO RENDER
├── URL: https://educapture-ai-pipeline-prod-v1.onrender.com
├── Database: ✅ PostgreSQL + pgvector
└── API Docs: /docs endpoint
```

---

## 📦 Files to Migrate

### 1. React Components (Priority: HIGH)

#### A. HighlightsViewer.tsx
**Changes:**
- ✅ Dutch text for all UI elements
- ✅ Real video player (replaces mock gradient)
- ✅ Video imports (video1.mp4, video2.mp4, video3.mp4)
- ✅ Localized mock data (titles, descriptions, categories)
- ✅ Removed fake video controls, using native HTML5 video

**File:** `/Users/juansebastian/educapture-ai-pipeline/frontend/src/components/HighlightsViewer.tsx`

#### B. StudentDashboard.tsx
**Changes:**
- ✅ Dutch lesson titles ("File Parkeren", "Invoegen & Rijstrookwissel", "Drie Punt Draai")
- ✅ Dutch instructor name ("Fokke de Haan")
- ✅ Added `onViewProgressReport` prop and wiring
- ✅ Progress report button now functional

**File:** `/Users/juansebastian/educapture-ai-pipeline/frontend/src/components/StudentDashboard.tsx`

#### C. InstructorDashboard.tsx
**Changes:**
- ✅ Dutch student names (Milan Dijkstra, Emma Haak, Jorik Kroon, Josan de Vries, Paul de Bruin)
- ✅ Added 2 new mock students (total 5 students)

**File:** `/Users/juansebastian/educapture-ai-pipeline/frontend/src/components/InstructorDashboard.tsx`

#### D. RoleSelector.tsx
**Changes:**
- ✅ Updated branding to "EduCapture App"
- ✅ Dutch subtitle: "Rijonderwijs, met objectieve feedback en AI-coach"
- ✅ Dashboard titles updated

**File:** `/Users/juansebastian/educapture-ai-pipeline/frontend/src/components/RoleSelector.tsx`

#### E. ProgressReport.tsx (NEW)
**New Component:**
- ✅ Complete student progress tracking UI
- ✅ 4 phases with competencies
- ✅ Progress bars, badges, and mastery indicators
- ✅ Dutch text throughout
- ✅ Mock data for investor demo

**File:** `/Users/juansebastian/educapture-ai-pipeline/frontend/src/components/ProgressReport.tsx`

#### F. StudentProfile.tsx
**Changes:**
- ✅ Minor updates for consistency

**File:** `/Users/juansebastian/educapture-ai-pipeline/frontend/src/components/StudentProfile.tsx`

### 2. Routing (Priority: HIGH)

#### Index.tsx
**Changes:**
- ✅ Added progress-report view handling
- ✅ Wired up `onViewProgressReport` callback
- ✅ Navigation flow updated

**File:** `/Users/juansebastian/educapture-ai-pipeline/frontend/src/pages/Index.tsx`

### 3. Video Assets (Priority: MEDIUM)

#### Demo Videos
**Location (Source):**
```
/Users/juansebastian/educapture-ai-pipeline/frontend/src/assets/videos/
├── video1.mp4 (7.4 MB)
├── video2.mp4 (12 MB)
└── video3.mp4 (14 MB)
```

**Location (Target):**
```
/Users/juansebastian/educapture-repo/apps/lesson-replay-drive/src/assets/videos/
```

**Note:** Videos are NOT in git (too large). Copy manually or use CDN.

### 4. Documentation (Priority: LOW)

#### Investor Demo Guide
**File:** `INVESTOR_DEMO_GUIDE.md`
- Comprehensive demo walkthrough
- Value proposition
- Technical backbone

#### Other Docs
- `DUTCH_NAMES_UPDATED.md`
- `PRESENTATION_READY.md`

---

## 🔧 Migration Steps

### Phase 1: Pre-Migration Checks (15 min)

```bash
# 1. Verify production repo is clean
cd /Users/juansebastian/educapture-repo/apps/lesson-replay-drive
git status
git pull origin main

# 2. Create backup branch
git checkout -b backup-pre-dutch-migration
git push origin backup-pre-dutch-migration
git checkout main

# 3. Create feature branch
git checkout -b feature/dutch-localization-video-highlights
```

### Phase 2: Copy Components (30 min)

```bash
# Set variables for easier copying
DEV_REPO="/Users/juansebastian/educapture-ai-pipeline/frontend"
PROD_REPO="/Users/juansebastian/educapture-repo/apps/lesson-replay-drive"

# 1. Copy updated components
cp $DEV_REPO/src/components/HighlightsViewer.tsx $PROD_REPO/src/components/
cp $DEV_REPO/src/components/StudentDashboard.tsx $PROD_REPO/src/components/
cp $DEV_REPO/src/components/InstructorDashboard.tsx $PROD_REPO/src/components/
cp $DEV_REPO/src/components/RoleSelector.tsx $PROD_REPO/src/components/
cp $DEV_REPO/src/components/StudentProfile.tsx $PROD_REPO/src/components/

# 2. Copy NEW component
cp $DEV_REPO/src/components/ProgressReport.tsx $PROD_REPO/src/components/

# 3. Copy updated routing
cp $DEV_REPO/src/pages/Index.tsx $PROD_REPO/src/pages/

# 4. Verify files copied
cd $PROD_REPO
git status
```

### Phase 3: Copy Video Assets (10 min)

```bash
# Create assets directory if needed
mkdir -p $PROD_REPO/src/assets/videos

# Copy videos (if using local videos)
cp $DEV_REPO/src/assets/videos/*.mp4 $PROD_REPO/src/assets/videos/

# Update .gitignore to exclude videos
echo "# Videos (too large for git)" >> $PROD_REPO/.gitignore
echo "src/assets/videos/*.mp4" >> $PROD_REPO/.gitignore
echo "public/demo-videos/*.mp4" >> $PROD_REPO/.gitignore
```

**Alternative:** Use CDN or Mux for video hosting (recommended for production)

### Phase 4: Verify TypeScript Compilation (5 min)

```bash
cd $PROD_REPO

# Install dependencies (if needed)
npm install

# Check for TypeScript errors
npm run build

# If errors occur, check for:
# - Missing imports
# - Path differences between repos
# - Missing dependencies
```

### Phase 5: Test Locally (15 min)

```bash
cd $PROD_REPO

# Start dev server
npm run dev

# Open browser to http://localhost:8080 (or whatever port)
# Test:
# ✓ Role selector shows Dutch text
# ✓ Student dashboard has Dutch names
# ✓ Instructor dashboard has Dutch students
# ✓ Highlights viewer plays videos
# ✓ Progress report opens correctly
# ✓ All navigation works
```

### Phase 6: Commit and Push (10 min)

```bash
cd $PROD_REPO

# Add files
git add src/components/HighlightsViewer.tsx
git add src/components/StudentDashboard.tsx
git add src/components/InstructorDashboard.tsx
git add src/components/RoleSelector.tsx
git add src/components/StudentProfile.tsx
git add src/components/ProgressReport.tsx
git add src/pages/Index.tsx
git add .gitignore

# Commit
git commit -m "feat: Add Dutch localization and video highlights

- Localize all UI components to Dutch
- Add functional video player with real MP4 files
- Add ProgressReport component for student tracking
- Update mock data with Dutch names and lesson titles
- Wire up progress report navigation
- Add 5 Dutch student profiles
- Update branding to EduCapture App

Ready for investor demo with consistent Dutch language support."

# Push to feature branch
git push origin feature/dutch-localization-video-highlights
```

### Phase 7: Deploy to Vercel/Render (10 min)

**Option A: Vercel (if using Vercel)**
```bash
# Vercel auto-deploys from main branch
# Merge feature branch to main
git checkout main
git merge feature/dutch-localization-video-highlights
git push origin main

# Vercel will auto-deploy
# Monitor: https://vercel.com/dashboard
```

**Option B: Render (if using Render)**
```bash
# Same process - push to main triggers deploy
git checkout main
git merge feature/dutch-localization-video-highlights
git push origin main

# Monitor Render dashboard
```

---

## 🔗 Backend Integration (Next Phase)

### Current Backend Status
✅ **Live:** https://educapture-ai-pipeline-prod-v1.onrender.com  
✅ **Health:** `/health` endpoint working  
✅ **API Docs:** `/docs` endpoint accessible  
✅ **Database:** PostgreSQL + pgvector connected  

### Integration Steps (Future)

#### 1. Update Frontend API Configuration
```typescript
// src/config/api.ts (create if doesn't exist)
export const API_CONFIG = {
  baseUrl: process.env.VITE_API_URL || 'https://educapture-ai-pipeline-prod-v1.onrender.com',
  endpoints: {
    health: '/health',
    feedback: '/api/feedback',
    highlights: '/api/highlights',
    students: '/api/students',
  }
};
```

#### 2. Add Environment Variables to Vercel/Render
```bash
# In Vercel/Render dashboard:
VITE_API_URL=https://educapture-ai-pipeline-prod-v1.onrender.com
VITE_API_KEY=<your_api_key>
```

#### 3. Create API Service Layer
```typescript
// src/services/api.ts
import { API_CONFIG } from '@/config/api';

export const apiService = {
  async getHealth() {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.health}`);
    return response.json();
  },
  
  async getStudentHighlights(studentId: string) {
    // Fetch real highlights from backend
  },
  
  async getStudentProgress(studentId: string) {
    // Fetch real progress data
  }
};
```

#### 4. Replace Mock Data
- Update `HighlightsViewer.tsx` to fetch from API
- Update `StudentDashboard.tsx` to fetch real lessons
- Update `ProgressReport.tsx` to fetch real progress

---

## ⚠️ Important Notes

### Video Files
- Videos are **NOT in git** (too large)
- Current setup uses local files for demo
- **For production:** Use Mux, Cloudinary, or AWS S3
- Backend already has video processing pipeline

### Environment Differences
- Dev uses Vite on port 8080
- Production may use different port
- Check `package.json` scripts match
- Verify all imports resolve correctly

### Database
- Backend uses PostgreSQL (Render)
- Frontend currently uses mock data
- Next step: Wire frontend to backend API
- Firebase still used for auth (keep as is)

### Translation System
- Some components use `useTranslation(language)` hook
- Some use hardcoded Dutch strings
- **Future:** Unify translation approach
- Consider adding language switcher

---

## 🎯 Testing Checklist

### Before Deployment
- [ ] All components compile without errors
- [ ] Dev server runs successfully
- [ ] No console errors in browser
- [ ] All routes navigate correctly
- [ ] Videos play in HighlightsViewer
- [ ] Progress report displays correctly
- [ ] Dutch text displays properly (no encoding issues)
- [ ] Mobile responsive (test on phone)

### After Deployment
- [ ] Production URL loads
- [ ] Health check passes
- [ ] Role selector works
- [ ] Student dashboard displays
- [ ] Instructor dashboard displays
- [ ] Highlights viewer accessible
- [ ] Progress report accessible
- [ ] No 404 errors
- [ ] Performance acceptable (<3s load)

---

## 📞 Support & Resources

### Documentation
- **Dev Repo:** `/Users/juansebastian/educapture-ai-pipeline/frontend/`
  - `INVESTOR_DEMO_GUIDE.md` - Demo walkthrough
  - `DUTCH_NAMES_UPDATED.md` - Name changes
  - `PRESENTATION_READY.md` - Demo ready status

- **Backend Repo:** `/Users/juansebastian/educapture-repo/ai_pipeline_export/`
  - `WARP.md` - AI workflows
  - `DEPLOYMENT_SUCCESS.md` - Backend deployment status
  - `POSTGRES_RAG_STATUS.md` - Database status

### Quick Commands
```bash
# Check backend health
curl https://educapture-ai-pipeline-prod-v1.onrender.com/health

# View backend logs
# Visit: https://dashboard.render.com/web/srv-d3hbqdh5pdvs73f5fbbg/logs

# Local dev server
cd /Users/juansebastian/educapture-repo/apps/lesson-replay-drive
npm run dev

# Build production
npm run build
```

### Git Branches
- `main` - Production branch
- `backup-pre-dutch-migration` - Backup before changes
- `feature/dutch-localization-video-highlights` - Feature branch

---

## 🚀 Next Steps After Migration

### Immediate (Week 1)
1. ✅ Migrate frontend changes (this document)
2. 🔲 Deploy to production
3. 🔲 Test end-to-end flow
4. 🔲 Fix any issues
5. 🔲 Prepare for investor demo

### Short-term (Week 2-3)
1. 🔲 Wire frontend to backend API
2. 🔲 Replace mock data with real data
3. 🔲 Set up video CDN (Mux or S3)
4. 🔲 Add authentication flow
5. 🔲 Student memory integration (see backend MASTER_PLAN_ADAPTIVE_AI.md)

### Long-term (Month 2-3)
1. 🔲 GPS integration
2. 🔲 Structured feedback with timestamps
3. 🔲 Adaptive AI models
4. 🔲 Gamification features

---

## 📊 Migration Summary

```
┌─────────────────────────────────────────────────────────┐
│                 MIGRATION READY ✅                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Source:  educapture-ai-pipeline/frontend               │
│  Target:  educapture-repo/apps/lesson-replay-drive      │
│  Backend: educapture-ai-pipeline-prod-v1.onrender.com   │
│                                                          │
│  Components:  7 files (6 updated, 1 new)                │
│  Routes:      1 file updated                            │
│  Assets:      3 videos (33 MB total)                    │
│  Docs:        3 files                                   │
│                                                          │
│  Estimated Time: 90 minutes                             │
│  Risk Level:    LOW (feature branch + backup)           │
│  Testing:       Required before merge                   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

**Status:** ✅ READY FOR MIGRATION  
**Created:** October 13, 2025  
**Author:** AI Agent + Juan Sebastian  
**Next Action:** Execute Phase 1 (Pre-Migration Checks)

---

## 🎊 Ready to Go!

This handover document provides everything needed to:
1. Migrate changes safely
2. Test thoroughly
3. Deploy confidently
4. Connect to live backend

**Good luck with your deployment!** 🚀
