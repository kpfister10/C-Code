import React, { useRef, useState } from 'react';

interface SwingPlaybackProps {
  videoUrl: string;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export const SwingPlayback: React.FC<SwingPlaybackProps> = ({
  videoUrl,
  onAnalyze,
  isAnalyzing
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleSeek = (direction: 'forward' | 'backward') => {
    if (videoRef.current) {
      const step = 0.1;
      videoRef.current.currentTime += direction === 'forward' ? step : -step;
    }
  };

  return (
    <div className="playback-container">
      <div className="playback-video-wrapper">
        <video
          ref={videoRef}
          src={videoUrl}
          className="playback-video"
          loop
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>

      <div className="playback-controls">
        <div className="control-group">
          <button
            onClick={() => handleSeek('backward')}
            className="btn btn-icon-only"
            title="Step backward"
          >
            <svg viewBox="0 0 24 24">
              <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" fill="currentColor"/>
            </svg>
          </button>

          <button
            onClick={handlePlayPause}
            className="btn btn-play"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" fill="currentColor"/>
              </svg>
            )}
          </button>

          <button
            onClick={() => handleSeek('forward')}
            className="btn btn-icon-only"
            title="Step forward"
          >
            <svg viewBox="0 0 24 24">
              <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        <div className="speed-controls">
          <span className="speed-label">Speed:</span>
          {[0.25, 0.5, 1].map(speed => (
            <button
              key={speed}
              onClick={() => handleSpeedChange(speed)}
              className={`btn btn-speed ${playbackRate === speed ? 'active' : ''}`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onAnalyze}
        disabled={isAnalyzing}
        className="btn btn-primary btn-analyze"
      >
        {isAnalyzing ? (
          <>
            <span className="spinner"></span>
            Analyzing Swing...
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" className="btn-icon">
              <path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17l4.59-4.59L16 11l-6 6z" fill="currentColor"/>
            </svg>
            Analyze My Swing
          </>
        )}
      </button>
    </div>
  );
};
