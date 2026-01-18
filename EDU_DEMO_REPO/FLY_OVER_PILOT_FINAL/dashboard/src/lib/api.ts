/**
 * API Client for EduCapture FastAPI Backend
 * 
 * This module provides a configured API client for communicating with the FastAPI backend.
 * It handles base URL configuration, common headers, and provides typed methods for
 * all available endpoints.
 */

// API Base URL - uses proxy in development, direct URL in production
const API_BASE_URL = import.meta.env.PROD ? 
  (import.meta.env.VITE_API_BASE_URL || 'https://your-render-app.onrender.com') : 
  ''; // In development, Vite proxy handles the routing

// API Client Class
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      // Handle empty responses (e.g., 204 No Content)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return {} as T;
      }
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Health endpoints
  async healthCheck() {
    return this.request('/health');
  }

  async dbHealthCheck() {
    return this.request('/health/db');
  }

  // Coach API endpoints
  async createCoachSession(sessionData: CoachSessionCreate) {
    return this.request<CoachSessionResponse>('/api/coach/sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  }

  async getCoachSession(sessionId: number) {
    return this.request<CoachSessionResponse>(`/api/coach/sessions/${sessionId}`);
  }

  async getSessionMessages(sessionId: number) {
    return this.request<CoachMessageResponse[]>(`/api/coach/sessions/${sessionId}/messages`);
  }

  async chatWithCoach(chatRequest: ChatRequest) {
    return this.request<ChatResponse>('/api/coach/chat', {
      method: 'POST',
      body: JSON.stringify(chatRequest),
    });
  }

  async getCoachPersonalities() {
    return this.request('/api/coach/personalities');
  }

  // Checkins API endpoints (assuming these exist based on the router)
  async getCheckins() {
    return this.request('/api/checkins');
  }

  async createCheckin(checkinData: any) {
    return this.request('/api/checkins', {
      method: 'POST',
      body: JSON.stringify(checkinData),
    });
  }
}

// Type definitions for API requests/responses
// These should match the Pydantic schemas in the FastAPI backend

export interface CoachSessionCreate {
  student_id: number;
  lesson_id?: number;
  personality: string;
}

export interface CoachSessionResponse {
  id: number;
  student_id: number;
  lesson_id?: number;
  personality: string;
  created_at: string;
  updated_at: string;
}

export interface CoachMessageResponse {
  id: number;
  session_id: number;
  role: 'user' | 'coach';
  content: string;
  created_at: string;
}

export interface ChatRequest {
  session_id?: number;
  student_id: number;
  message: string;
  personality?: string;
}

export interface ChatResponse {
  session_id: number;
  user_message: CoachMessageResponse;
  coach_message: CoachMessageResponse;
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export individual methods for easier importing
export const {
  healthCheck,
  dbHealthCheck,
  createCoachSession,
  getCoachSession,
  getSessionMessages,
  chatWithCoach,
  getCoachPersonalities,
  getCheckins,
  createCheckin,
} = apiClient;

// Utility function to check if backend is available
export async function checkBackendConnection(): Promise<boolean> {
  try {
    await healthCheck();
    return true;
  } catch {
    return false;
  }
}

export default apiClient;