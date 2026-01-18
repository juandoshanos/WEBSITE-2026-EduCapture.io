import { useState, useCallback, useEffect } from 'react';
import { 
  PersonalityType, 
  CoachMessage, 
  ConversationStage,
  ConversationContext,
  COACH_PERSONALITIES,
  coachResponseEngine,
  createMessage,
  getPersonalityVoiceSettings
} from '@/lib/ai-coach';
import { ttsManager } from '@/lib/tts';

interface AICoachState {
  selectedPersonality: PersonalityType | null;
  messages: CoachMessage[];
  isLoading: boolean;
  isSpeaking: boolean;
  currentStage: ConversationStage;
  context: Partial<ConversationContext>;
}

export const useAICoach = () => {
  const [state, setState] = useState<AICoachState>({
    selectedPersonality: null,
    messages: [],
    isLoading: false,
    isSpeaking: false,
    currentStage: 'greeting',
    context: {
      studentName: 'Alex',
      lessonCount: 2,
      recentPerformance: 'improving',
      previousConcerns: ['roundabouts', 'parking']
    }
  });

  // Select a coach personality
  const selectPersonality = useCallback((personality: PersonalityType) => {
    setState(prev => ({
      ...prev,
      selectedPersonality: personality,
      messages: [],
      currentStage: 'greeting'
    }));
  }, []);

  // Send user message and get coach response
  const sendMessage = useCallback(async (userMessage: string) => {
    if (!state.selectedPersonality) return;

    setState(prev => ({ ...prev, isLoading: true }));

    // Add user message
    const userMsg = createMessage(userMessage, 'user');
    setState(prev => ({ 
      ...prev, 
      messages: [...prev.messages, userMsg] 
    }));

    // Generate coach response with delay for realism
    setTimeout(async () => {
      const response = coachResponseEngine.generateResponse(
        state.selectedPersonality!,
        state.currentStage,
        userMessage,
        state.context
      );

      const coachMsg = createMessage(response, 'coach', state.selectedPersonality!);
      
      setState(prev => ({ 
        ...prev, 
        messages: [...prev.messages, coachMsg],
        isLoading: false
      }));

      // Speak the response if TTS is enabled
      if (coachMsg.shouldSpeak) {
        await speakMessage(coachMsg);
      }
    }, 1000 + Math.random() * 1500); // 1-2.5 second delay
  }, [state.selectedPersonality, state.currentStage, state.context]);

  // Start a conversation with initial greeting
  const startConversation = useCallback(async () => {
    if (!state.selectedPersonality) return;

    setState(prev => ({ ...prev, isLoading: true }));

    const greeting = coachResponseEngine.generateResponse(
      state.selectedPersonality,
      'greeting',
      undefined,
      state.context
    );

    const greetingMsg = createMessage(greeting, 'coach', state.selectedPersonality);
    
    setState(prev => ({
      ...prev,
      messages: [greetingMsg],
      isLoading: false,
      currentStage: 'check-in'
    }));

    // Speak the greeting
    if (greetingMsg.shouldSpeak) {
      await speakMessage(greetingMsg);
    }
  }, [state.selectedPersonality, state.context]);

  // Speak a message using TTS
  const speakMessage = useCallback(async (message: CoachMessage) => {
    if (!message.personality || !ttsManager.isSupported()) return;

    setState(prev => ({ ...prev, isSpeaking: true }));

    try {
      const voiceSettings = getPersonalityVoiceSettings(message.personality, 'en');
      await ttsManager.speak(message.content, {
        ...voiceSettings,
        lang: 'en-US'
      });
    } catch (error) {
      console.warn('TTS failed:', error);
    } finally {
      setState(prev => ({ ...prev, isSpeaking: false }));
    }
  }, []);

  // Stop current speech
  const stopSpeaking = useCallback(() => {
    ttsManager.stop();
    setState(prev => ({ ...prev, isSpeaking: false }));
  }, []);

  // Clear conversation
  const clearConversation = useCallback(() => {
    stopSpeaking();
    setState(prev => ({
      ...prev,
      messages: [],
      currentStage: 'greeting'
    }));
  }, [stopSpeaking]);

  // Progress to next conversation stage
  const nextStage = useCallback(() => {
    const stages: ConversationStage[] = ['greeting', 'check-in', 'discussion', 'summary'];
    const currentIndex = stages.indexOf(state.currentStage);
    const nextIndex = Math.min(currentIndex + 1, stages.length - 1);
    
    setState(prev => ({
      ...prev,
      currentStage: stages[nextIndex]
    }));
  }, [state.currentStage]);

  // Get available personalities
  const getPersonalities = useCallback(() => {
    return Object.values(COACH_PERSONALITIES);
  }, []);

  // Quick demo scenarios
  const startDemoScenario = useCallback(async (scenario: 'pre-lesson' | 'post-lesson' | 'progress') => {
    if (!state.selectedPersonality) return;

    const scenarios = {
      'pre-lesson': "I have a lesson in 30 minutes and I'm feeling a bit nervous about roundabouts.",
      'post-lesson': "Just finished my lesson. It went pretty well but parking was still challenging.",
      'progress': "I've been driving for a few weeks now. How am I doing overall?"
    };

    clearConversation();
    await startConversation();
    
    // Simulate user starting the conversation
    setTimeout(() => {
      sendMessage(scenarios[scenario]);
    }, 2000);
  }, [state.selectedPersonality, clearConversation, startConversation, sendMessage]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [stopSpeaking]);

  return {
    // State
    selectedPersonality: state.selectedPersonality,
    messages: state.messages,
    isLoading: state.isLoading,
    isSpeaking: state.isSpeaking,
    currentStage: state.currentStage,
    
    // Actions
    selectPersonality,
    sendMessage,
    startConversation,
    speakMessage,
    stopSpeaking,
    clearConversation,
    nextStage,
    startDemoScenario,
    
    // Utilities
    getPersonalities,
    ttsSupported: ttsManager.isSupported()
  };
};