// Text-to-Speech utilities for AI Coach
export interface TTSOptions {
  voice?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
}

export class TTSManager {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isInitialized = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
    }
  }

  private loadVoices() {
    if (!this.synth) return;

    const loadVoicesAsync = () => {
      this.voices = this.synth!.getVoices();
      this.isInitialized = true;
    };

    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoicesAsync;
    }
    
    // Try loading voices immediately (some browsers support this)
    loadVoicesAsync();
  }

  async waitForInitialization(): Promise<void> {
    if (this.isInitialized) return;
    
    return new Promise((resolve) => {
      const checkInitialized = () => {
        if (this.isInitialized) {
          resolve();
        } else {
          setTimeout(checkInitialized, 100);
        }
      };
      checkInitialized();
    });
  }

  getAvailableVoices(language?: string): SpeechSynthesisVoice[] {
    if (language) {
      return this.voices.filter(voice => 
        voice.lang.startsWith(language.toLowerCase())
      );
    }
    return this.voices;
  }

  async speak(text: string, options: TTSOptions = {}): Promise<void> {
    if (!this.synth || !text.trim()) {
      return Promise.resolve();
    }

    await this.waitForInitialization();

    return new Promise((resolve, reject) => {
      // Cancel any ongoing speech
      this.synth!.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set voice based on personality and language
      const voice = this.selectVoice(options.voice, options.lang);
      if (voice) utterance.voice = voice;
      
      // Set speech parameters
      utterance.rate = options.rate || 1.0;
      utterance.pitch = options.pitch || 1.0;
      utterance.volume = options.volume || 0.8;
      utterance.lang = options.lang || 'en-US';

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(new Error(`TTS Error: ${event.error}`));

      this.synth!.speak(utterance);
    });
  }

  private selectVoice(preferredVoice?: string, language?: string): SpeechSynthesisVoice | null {
    if (preferredVoice) {
      const voice = this.voices.find(v => v.name === preferredVoice);
      if (voice) return voice;
    }

    if (language) {
      const languageVoices = this.getAvailableVoices(language);
      if (languageVoices.length > 0) {
        // Prefer female voices for coaching
        const femaleVoice = languageVoices.find(v => 
          v.name.toLowerCase().includes('female') || 
          v.name.toLowerCase().includes('woman') ||
          v.name.toLowerCase().includes('sarah') ||
          v.name.toLowerCase().includes('emma')
        );
        return femaleVoice || languageVoices[0];
      }
    }

    return this.voices[0] || null;
  }

  stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  isSupported(): boolean {
    return this.synth !== null;
  }

  isSpeaking(): boolean {
    return this.synth ? this.synth.speaking : false;
  }
}

// Singleton instance
export const ttsManager = new TTSManager();

// Coach personality voice mappings
export const PERSONALITY_VOICES = {
  supportive: {
    en: { rate: 0.9, pitch: 1.1, voice: 'female' },
    nl: { rate: 0.9, pitch: 1.1, voice: 'female', lang: 'nl-NL' }
  },
  direct: {
    en: { rate: 1.1, pitch: 0.9, voice: 'male' },
    nl: { rate: 1.1, pitch: 0.9, voice: 'male', lang: 'nl-NL' }
  },
  analytical: {
    en: { rate: 1.0, pitch: 1.0, voice: 'female' },
    nl: { rate: 1.0, pitch: 1.0, voice: 'female', lang: 'nl-NL' }
  },
  encouraging: {
    en: { rate: 0.95, pitch: 1.15, voice: 'female' },
    nl: { rate: 0.95, pitch: 1.15, voice: 'female', lang: 'nl-NL' }
  },
  mentor: {
    en: { rate: 0.85, pitch: 0.95, voice: 'male' },
    nl: { rate: 0.85, pitch: 0.95, voice: 'male', lang: 'nl-NL' }
  }
} as const;