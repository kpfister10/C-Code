export interface SwingAnalysis {
  overallScore: number;
  setup: SetupAnalysis;
  grip: GripAnalysis;
  backswing: SwingPhaseAnalysis;
  downswing: SwingPhaseAnalysis;
  impact: SwingPhaseAnalysis;
  followThrough: SwingPhaseAnalysis;
  improvements: Improvement[];
}

export interface SetupAnalysis {
  score: number;
  stance: FeedbackItem;
  alignment: FeedbackItem;
  ballPosition: FeedbackItem;
  posture: FeedbackItem;
}

export interface GripAnalysis {
  score: number;
  gripType: FeedbackItem;
  pressure: FeedbackItem;
  handPosition: FeedbackItem;
  wristAngle: FeedbackItem;
}

export interface SwingPhaseAnalysis {
  score: number;
  feedback: string;
  keyPoints: string[];
}

export interface FeedbackItem {
  status: 'good' | 'needs-work' | 'critical';
  feedback: string;
  tip: string;
}

export interface Improvement {
  priority: 'high' | 'medium' | 'low';
  area: string;
  description: string;
  drills: string[];
}

export interface RecordedSwing {
  id: string;
  videoUrl: string;
  timestamp: Date;
  analysis: SwingAnalysis | null;
}

export type RecordingState = 'idle' | 'countdown' | 'recording' | 'recorded' | 'analyzing' | 'analyzed';
