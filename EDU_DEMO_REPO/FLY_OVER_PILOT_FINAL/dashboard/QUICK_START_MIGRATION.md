# Quick Start: Production Migration

**Time Required:** 90 minutes  
**Risk Level:** LOW (using feature branches + backup)

## Immediate Action Plan

### 1. Start Migration (5 min)
```bash
cd /Users/juansebastian/educapture-repo/apps/lesson-replay-drive
git checkout -b backup-pre-dutch-migration
git push origin backup-pre-dutch-migration
git checkout -b feature/dutch-localization-video-highlights
```

### 2. Copy Files (30 min)
```bash
DEV="/Users/juansebastian/educapture-ai-pipeline/frontend"
PROD="/Users/juansebastian/educapture-repo/apps/lesson-replay-drive"

# Copy components
cp $DEV/src/components/{HighlightsViewer,StudentDashboard,InstructorDashboard,RoleSelector,StudentProfile,ProgressReport}.tsx $PROD/src/components/
cp $DEV/src/pages/Index.tsx $PROD/src/pages/

# Copy videos
mkdir -p $PROD/src/assets/videos
cp $DEV/src/assets/videos/*.mp4 $PROD/src/assets/videos/
```

### 3. Test Locally (15 min)
```bash
cd $PROD
npm install
npm run dev
```

Test checklist:
- ✓ Role selector (Dutch text)
- ✓ Student dashboard (Dutch names)
- ✓ Highlights viewer (videos play)
- ✓ Progress report (opens correctly)

### 4. Deploy (30 min)
```bash
cd $PROD
git add -A
git commit -m "feat: Dutch localization + video highlights"
git push origin feature/dutch-localization-video-highlights

# After testing, merge to main
git checkout main
git merge feature/dutch-localization-video-highlights
git push origin main
```

## What You're Migrating

**7 Files Changed:**
1. HighlightsViewer.tsx - Dutch + real videos
2. StudentDashboard.tsx - Dutch names
3. InstructorDashboard.tsx - 5 Dutch students
4. RoleSelector.tsx - EduCapture branding
5. StudentProfile.tsx - Minor updates
6. ProgressReport.tsx - NEW component
7. Index.tsx - Updated routing

**Assets:**
- 3 video files (33 MB total)

## Next: Backend Integration

After migration, connect to live backend:
- URL: https://educapture-ai-pipeline-prod-v1.onrender.com
- Status: ✅ LIVE
- Database: ✅ PostgreSQL + pgvector

See PRODUCTION_MIGRATION_HANDOVER.md for complete details.

---

**Ready?** Start with Step 1 above! 🚀
