import React, { useState, useCallback } from 'react';
import { VideoRecorder } from './components/VideoRecorder';
import { SwingPlayback } from './components/SwingPlayback';
import { AnalysisResults } from './components/AnalysisResults';
import { analyzeSwing } from './utils/swingAnalyzer';
import { RecordingState, SwingAnalysis } from './types';
import './App.css';

function App() {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<SwingAnalysis | null>(null);

  const handleRecordingComplete = useCallback((url: string) => {
    setVideoUrl(url);
    setRecordingState('recorded');
  }, []);

  const handleAnalyze = useCallback(async () => {
    setRecordingState('analyzing');
    try {
      const result = await analyzeSwing();
      setAnalysis(result);
      setRecordingState('analyzed');
    } catch (error) {
      console.error('Analysis failed:', error);
      setRecordingState('recorded');
    }
  }, []);

  const handleNewRecording = useCallback(() => {
    setVideoUrl(null);
    setAnalysis(null);
    setRecordingState('idle');
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <svg viewBox="0 0 24 24" className="logo-icon">
              <circle cx="12" cy="8" r="3" fill="currentColor"/>
              <path d="M12 11c-3 0-7 1.5-7 4.5V18h14v-2.5c0-3-4-4.5-7-4.5z" fill="currentColor"/>
              <path d="M20 4l-3 3M20 4v3M20 4h-3" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            <h1>Golf Swing Analyzer</h1>
          </div>
          <p className="tagline">Record. Analyze. Improve.</p>
        </div>
      </header>

      <main className="app-main">
        {recordingState === 'analyzed' && analysis ? (
          <AnalysisResults
            analysis={analysis}
            onNewRecording={handleNewRecording}
          />
        ) : (
          <div className="recorder-section">
            {(recordingState === 'idle' || recordingState === 'countdown' || recordingState === 'recording') && (
              <VideoRecorder
                onRecordingComplete={handleRecordingComplete}
                recordingState={recordingState}
                setRecordingState={setRecordingState}
              />
            )}

            {(recordingState === 'recorded' || recordingState === 'analyzing') && videoUrl && (
              <SwingPlayback
                videoUrl={videoUrl}
                onAnalyze={handleAnalyze}
                isAnalyzing={recordingState === 'analyzing'}
              />
            )}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Position your camera to capture your full swing for best results</p>
      </footer>
    </div>
  );
}

export default App;
