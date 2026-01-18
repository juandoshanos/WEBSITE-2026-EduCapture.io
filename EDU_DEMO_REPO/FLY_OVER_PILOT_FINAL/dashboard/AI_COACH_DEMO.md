# AI Coach Demo - Usage Guide
**Created**: 2025-09-27  
**App Location**: `/apps/lesson-replay-drive`

---

## Quick Start

### 1. Run the Demo
```bash
cd apps/lesson-replay-drive
npm install
npm run dev
```
The app will open at `http://localhost:5173`

### 2. Access AI Coach
1. **Choose Role**: Select "Student" from the role selector
2. **Navigate to Coach**: Click the purple "AI Coach" button in the quick actions section
3. **Select Personality**: Choose from 5 distinct coach personalities
4. **Start Chatting**: Click "Start Coaching Session" to begin

---

## Features Implemented

### 🤖 **5 AI Coach Personalities**

| Coach | Personality | Key Traits |
|-------|-------------|------------|
| **Maya** 😊 | Supportive | Patient, encouraging, empathetic, positive |
| **Marcus** 💼 | Direct | Straightforward, efficient, clear, goal-oriented |
| **Dr. Chen** 📊 | Analytical | Data-driven, detailed, systematic, insightful |
| **Sofia** ⭐ | Encouraging | Enthusiastic, motivating, celebrating, energetic |
| **Coach Wilson** 🎯 | Mentor | Experienced, wise, practical, storytelling |

### 💬 **Chat Features**
- **Real-time conversation** with personality-appropriate responses
- **Contextual replies** based on keywords (roundabouts, parking, nervous, etc.)
- **Message history** with timestamps and coach identification
- **Demo scenarios** for quick testing:
  - 🚗 Pre-Lesson Check-In
  - 📝 Post-Lesson Debrief  
  - 📈 Progress Review

### 🔊 **Text-to-Speech (TTS)**
- **Browser-based TTS** using Web Speech API
- **Personality-matched voices** with different rates/pitches:
  - Supportive coaches: Higher pitch, slower rate
  - Direct coaches: Lower pitch, faster rate
  - Analytical coaches: Neutral tone, steady rate
- **Voice controls**: Play/stop buttons for each message
- **Fallback graceful**: Works in text-only mode if TTS unavailable

### 🎨 **UI Polish**
- **shadcn/ui components** for consistent, professional design
- **Tailwind CSS** styling with gradients and animations
- **Responsive design** working on desktop and tablet
- **Accessibility features**: Proper contrast, keyboard navigation
- **Loading states** and smooth transitions

---

## Demo Scenarios

### Scenario 1: Pre-Lesson Nervousness
```
1. Select "Maya" (Supportive coach)
2. Click "Pre-Lesson Check-In" demo
3. Watch Maya respond with encouragement
4. Try typing: "I'm really nervous about roundabouts"
5. Observe personality-appropriate supportive response
```

### Scenario 2: Performance Analysis  
```
1. Select "Dr. Chen" (Analytical coach)
2. Start conversation
3. Type: "How am I doing with my driving progress?"
4. See analytical, data-focused response style
5. Try: "I struggle with parking" - note systematic advice
```

### Scenario 3: Direct Feedback
```
1. Select "Marcus" (Direct coach)
2. Click "Post-Lesson Debrief" demo
3. Type: "My lesson went okay, but I made some mistakes"
4. Observe direct, actionable feedback approach
5. Note efficiency-focused communication style
```

---

## Technical Implementation

### Architecture
```
src/
├── components/ai-coach/
│   ├── AICoach.tsx              # Main container
│   ├── PersonalitySelector.tsx  # Coach selection
│   ├── ChatInterface.tsx        # Chat UI container
│   ├── MessageList.tsx          # Message display
│   └── MessageInput.tsx         # Input + send
├── lib/
│   ├── ai-coach.ts              # Personalities + response engine
│   └── tts.ts                   # Text-to-speech utilities
└── hooks/
    └── useAICoach.ts            # State management
```

### Key Features
- **Deterministic Response Engine**: Keyword-based matching for demo reliability
- **Conversation State Management**: React hooks for chat state
- **TTS Integration**: Browser Speech Synthesis API with fallbacks
- **Responsive UI**: Works on desktop, tablet, and mobile
- **TypeScript**: Full type safety throughout

---

## Testing Checklist

### Basic Functionality
- [ ] Role selector → Student → AI Coach button appears
- [ ] AI Coach loads with 5 personality cards
- [ ] Personality selection highlights chosen coach
- [ ] "Start Coaching Session" button navigates to chat
- [ ] Chat interface loads with coach information

### Chat Features
- [ ] "Start Conversation" sends initial greeting
- [ ] Message input accepts text and sends on Enter
- [ ] Coach responses appear after 1-2.5 second delay
- [ ] Messages display with timestamps and coach badges
- [ ] Scroll behavior works with message history

### TTS Features
- [ ] Voice button appears next to coach messages (if supported)
- [ ] Clicking voice button plays message audio
- [ ] Voice matches coach personality (pitch/rate differences)
- [ ] Stop button interrupts ongoing speech
- [ ] TTS degrades gracefully if not supported

### Demo Scenarios
- [ ] Pre-lesson scenario starts appropriate conversation
- [ ] Post-lesson scenario includes performance discussion
- [ ] Progress review scenario focuses on long-term improvement
- [ ] Keyword responses work: "nervous", "roundabout", "parking", "good"

### UI Polish
- [ ] Gradients and colors match coach personalities
- [ ] Responsive design works on different screen sizes
- [ ] Loading states show during message processing
- [ ] Back navigation returns to personality selection
- [ ] Reset button clears conversation history

---

## Demo Script (for Presentations)

### Introduction (30 seconds)
*"Let me show you our AI Coach feature - personalized coaching that adapts to each student's learning style and needs."*

### Personality Selection (1 minute)
1. *"Students can choose from 5 distinct coach personalities..."*
2. Show Maya (supportive), Marcus (direct), Dr. Chen (analytical)
3. *"Each has unique traits and communication styles"*
4. Select Maya for demo

### Chat Demonstration (2 minutes)
1. Click "Pre-Lesson Check-In" scenario
2. *"Watch how Maya responds with encouragement..."*
3. Type: "I'm nervous about roundabouts"
4. *"See how she provides supportive, confidence-building advice"*
5. Click TTS button: *"And students can hear their coach speak"*

### Personality Comparison (1 minute)
1. Reset and select Marcus (Direct)
2. Type same message: "I'm nervous about roundabouts"
3. *"Notice how Marcus gives more direct, actionable guidance"*
4. *"Same concern, completely different coaching approach"*

### Technical Demo (30 seconds)
*"This works across devices, with full text-to-speech, and provides consistent, helpful responses for any driving-related concern students might have."*

---

## Troubleshooting

### TTS Not Working
- **Chrome/Safari**: Should work automatically
- **Firefox**: May require user gesture first - click a button first
- **Mobile**: Voice selection may be limited
- **Fallback**: Text-only mode still fully functional

### Performance Issues
- **Large message history**: Reset conversation to clear state
- **Slow responses**: Artificial delay is 1-2.5 seconds (intentional)
- **Memory usage**: Refresh page if needed during long sessions

### UI Problems
- **Component not loading**: Check browser console for import errors
- **Styling broken**: Verify Tailwind CSS is working
- **Responsive issues**: Test in browser dev tools device mode

---

## Next Steps (Post-Demo)

### Backend Integration
1. Replace hardcoded responses with real AI model (GPT/Claude)
2. Add conversation persistence and history
3. Implement user authentication and coach preferences
4. Add lesson data integration for contextual coaching

### Advanced Features
1. **Voice Input**: Speech-to-text for hands-free interaction
2. **Multi-language**: Dutch/English coach responses
3. **Progress Tracking**: Coach learns from student history
4. **Rich Media**: Coach can reference specific lesson moments

### Production Features
1. **Real-time Notifications**: Coach proactively reaches out
2. **Calendar Integration**: Pre-lesson check-ins at scheduled times
3. **Analytics**: Track coaching effectiveness and student satisfaction
4. **Customization**: Students can adjust coach personality traits

---

*This AI Coach demo showcases the future of personalized driving education - where every student has a dedicated coach available 24/7, tailored to their unique learning style and needs.*