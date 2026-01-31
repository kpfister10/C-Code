import React, { useEffect, useState, useCallback } from 'react';
import { useCamera } from '../hooks/useCamera';
import { useRecorder } from '../hooks/useRecorder';
import { RecordingState } from '../types';

interface VideoRecorderProps {
  onRecordingComplete: (videoUrl: string) => void;
  recordingState: RecordingState;
  setRecordingState: (state: RecordingState) => void;
}

export const VideoRecorder: React.FC<VideoRecorderProps> = ({
  onRecordingComplete,
  recordingState,
  setRecordingState
}) => {
  const { videoRef, isStreamActive, error, startCamera, stopCamera } = useCamera();
  const { isRecording, recordedUrl, startRecording, stopRecording, clearRecording } = useRecorder();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (recordingState === 'idle') {
      startCamera();
    }
  }, [recordingState, startCamera]);

  useEffect(() => {
    if (recordedUrl && recordingState === 'recording') {
      setRecordingState('recorded');
      onRecordingComplete(recordedUrl);
    }
  }, [recordedUrl, recordingState, setRecordingState, onRecordingComplete]);

  const handleStartCountdown = useCallback(() => {
    setRecordingState('countdown');
    setCountdown(3);

    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      if (videoRef.current?.srcObject) {
        startRecording(videoRef.current.srcObject as MediaStream);
        setRecordingState('recording');
      }
    }, 3000);
  }, [setRecordingState, startRecording, videoRef]);

  const handleStopRecording = useCallback(() => {
    stopRecording();
  }, [stopRecording]);

  const handleRetake = useCallback(() => {
    clearRecording();
    setRecordingState('idle');
    startCamera();
  }, [clearRecording, setRecordingState, startCamera]);

  if (error) {
    return (
      <div className="recorder-container">
        <div className="error-message">
          <svg viewBox="0 0 24 24" className="error-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
          </svg>
          <h3>Camera Access Required</h3>
          <p>{error}</p>
          <button onClick={startCamera} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recorder-container">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="video-preview"
        />

        {recordingState === 'countdown' && countdown > 0 && (
          <div className="countdown-overlay">
            <span className="countdown-number">{countdown}</span>
          </div>
        )}

        {isRecording && (
          <div className="recording-indicator">
            <span className="recording-dot"></span>
            <span>Recording</span>
          </div>
        )}
      </div>

      <div className="recorder-controls">
        {recordingState === 'idle' && isStreamActive && (
          <button onClick={handleStartCountdown} className="btn btn-record">
            <svg viewBox="0 0 24 24" className="btn-icon">
              <circle cx="12" cy="12" r="10" fill="currentColor"/>
            </svg>
            Start Recording
          </button>
        )}

        {recordingState === 'recording' && (
          <button onClick={handleStopRecording} className="btn btn-stop">
            <svg viewBox="0 0 24 24" className="btn-icon">
              <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>
            </svg>
            Stop Recording
          </button>
        )}

        {recordingState === 'recorded' && (
          <button onClick={handleRetake} className="btn btn-secondary">
            <svg viewBox="0 0 24 24" className="btn-icon">
              <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="currentColor"/>
            </svg>
            Retake
          </button>
        )}
      </div>

      <div className="recorder-tips">
        <h4>Recording Tips</h4>
        <ul>
          <li>Position camera at face-on or down-the-line angle</li>
          <li>Ensure good lighting on your setup</li>
          <li>Record your full swing from address to finish</li>
          <li>Keep the camera steady during recording</li>
        </ul>
      </div>
    </div>
  );
};
