/**
 * AI Pipeline API Client
 * 
 * Client for the separate AI Pipeline service deployed on Render.
 * This service handles video analysis and feedback generation.
 * 
 * Service runs independently from the main FastAPI backend.
 */

// AI Pipeline Base URL - configure based on environment
const AI_PIPELINE_URL = import.meta.env.VITE_AI_PIPELINE_URL || 
  (import.meta.env.PROD 
    ? 'https://educapture-ai-pipeline.onrender.com'  // Your Render deployment
    : 'http://localhost:8000');  // Local development

/**
 * AI Pipeline API Client Class
 */
class AIPipelineClient {
  private baseUrl: string;

  constructor(baseUrl: string = AI_PIPELINE_URL) {
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || 
          `AI Pipeline Error: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`AI Pipeline request failed: ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * Health check - verify AI Pipeline service is running
   */
  async healthCheck(): Promise<HealthCheckResponse> {
    return this.request<HealthCheckResponse>('/health');
  }

  /**
   * Get service status and capabilities
   */
  async getStatus(): Promise<StatusResponse> {
    return this.request<StatusResponse>('/api/v1/status');
  }

  /**
   * Submit a video for AI analysis
   * Returns a job ID to track progress
   */
  async analyzeVideo(request: VideoAnalysisRequest): Promise<JobResponse> {
    return this.request<JobResponse>('/api/v1/analyze', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  /**
   * Get the status and results of a video analysis job
   */
  async getJobResult(jobId: string): Promise<JobStatus> {
    return this.request<JobStatus>(`/api/v1/result/${jobId}`);
  }

  /**
   * List all jobs (with optional status filter)
   */
  async listJobs(status?: JobStatusType, limit: number = 50): Promise<JobListResponse> {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    params.append('limit', limit.toString());
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<JobListResponse>(`/api/v1/jobs${query}`);
  }

  /**
   * Delete a job and its results
   */
  async deleteJob(jobId: string): Promise<{ message: string }> {
    return this.request(`/api/v1/jobs/${jobId}`, {
      method: 'DELETE',
    });
  }

  /**
   * Poll a job until it completes or fails
   * @param jobId Job ID to monitor
   * @param intervalMs Polling interval in milliseconds (default: 3000)
   * @param timeoutMs Maximum time to poll in milliseconds (default: 300000 = 5 min)
   */
  async waitForJobCompletion(
    jobId: string,
    intervalMs: number = 3000,
    timeoutMs: number = 300000,
    onProgress?: (status: JobStatus) => void
  ): Promise<JobStatus> {
    const startTime = Date.now();
    
    while (true) {
      const status = await this.getJobResult(jobId);
      
      // Call progress callback if provided
      if (onProgress) {
        onProgress(status);
      }
      
      // Check if completed or failed
      if (status.status === 'completed' || status.status === 'failed') {
        return status;
      }
      
      // Check timeout
      if (Date.now() - startTime > timeoutMs) {
        throw new Error(`Job ${jobId} timed out after ${timeoutMs}ms`);
      }
      
      // Wait before polling again
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }
  }
}

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface HealthCheckResponse {
  status: string;
  service: string;
  timestamp: string;
  pipeline_available: boolean;
  version: string;
}

export interface StatusResponse {
  service: string;
  version: string;
  status: 'operational' | 'degraded';
  capabilities: {
    video_analysis: boolean;
    rag_retrieval: boolean;
    postgresql_backend: boolean;
    concurrent_processing: boolean;
  };
  supported_formats: string[];
  supported_sources: string[];
  active_jobs: number;
  completed_jobs: number;
  failed_jobs: number;
}

export interface VideoAnalysisRequest {
  video_url: string;
  callback_url?: string;
  metadata?: Record<string, any>;
}

export interface JobResponse {
  job_id: string;
  status: string;
  message: string;
  created_at: string;
}

export type JobStatusType = 'pending' | 'processing' | 'completed' | 'failed';

export interface JobStatus {
  job_id: string;
  status: JobStatusType;
  created_at: string;
  updated_at: string;
  result?: VideoAnalysisResult;
  error?: string;
}

export interface JobListResponse {
  total: number;
  jobs: JobStatus[];
}

// Video Analysis Result Structure
export interface VideoAnalysisResult {
  video_url: string;
  analysis_timestamp: string;
  
  // Stage 1: Scene Understanding
  stage1_quick_analysis?: {
    road_types: string[];
    key_situations: string[];
    traffic_density: string;
    weather_visibility: string;
    notable_events: string[];
    observed_maneuvers: string[];
    duration_seconds: number;
    analysis_time_seconds: number;
  };
  
  // Stage 2: Detailed Feedback (full analysis)
  detailed_feedback?: {
    positive_points: Array<{
      timestamp?: string;
      observation: string;
      explanation: string;
    }>;
    improvement_areas: Array<{
      timestamp?: string;
      issue: string;
      explanation: string;
      suggestion: string;
      priority: 'high' | 'medium' | 'low';
    }>;
    critical_moments: Array<{
      timestamp: string;
      description: string;
      severity: 'critical' | 'warning' | 'info';
    }>;
    overall_summary: string;
    skill_assessments: Record<string, number>; // e.g., { "observation": 8, "anticipation": 7 }
  };
  
  // Processing metadata
  processing_time_seconds?: number;
  model_used?: string;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if AI Pipeline service is available
 */
export async function checkAIPipelineConnection(): Promise<boolean> {
  try {
    const client = new AIPipelineClient();
    const health = await client.healthCheck();
    return health.pipeline_available;
  } catch {
    return false;
  }
}

/**
 * Format a GCS URL for display
 */
export function formatVideoUrl(url: string): string {
  if (url.startsWith('gs://')) {
    return url.replace('gs://', '').substring(0, 60) + '...';
  }
  if (url.includes('storage.cloud.google.com') || url.includes('storage.googleapis.com')) {
    const match = url.match(/\/([^/]+)\/([^?]+)/);
    if (match) {
      return `${match[1]}/${match[2].substring(0, 40)}...`;
    }
  }
  return url.substring(0, 60) + '...';
}

/**
 * Convert job status to user-friendly message
 */
export function getJobStatusMessage(status: JobStatusType): string {
  const messages = {
    pending: '⏳ Queued for processing...',
    processing: '🔄 Analyzing video...',
    completed: '✅ Analysis complete!',
    failed: '❌ Analysis failed',
  };
  return messages[status] || status;
}

/**
 * Calculate estimated time remaining for a job
 * Based on typical processing time of ~2-3 minutes per video
 */
export function estimateTimeRemaining(status: JobStatus): string {
  if (status.status === 'completed' || status.status === 'failed') {
    return '0 seconds';
  }
  
  const createdAt = new Date(status.created_at);
  const now = new Date();
  const elapsed = (now.getTime() - createdAt.getTime()) / 1000; // seconds
  
  // Estimate: average 150 seconds total processing time
  const estimatedTotal = 150;
  const remaining = Math.max(0, estimatedTotal - elapsed);
  
  if (remaining > 60) {
    return `~${Math.ceil(remaining / 60)} minutes`;
  }
  return `~${Math.ceil(remaining)} seconds`;
}

// ============================================================================
// EXPORT
// ============================================================================

// Export singleton instance
export const aiPipelineClient = new AIPipelineClient();

// Export class for custom instances
export default AIPipelineClient;
