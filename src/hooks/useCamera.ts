import { useState, useRef, useCallback, useEffect } from 'react';

interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  isStreamActive: boolean;
  error: string | null;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
}

export function useCamera(): UseCameraReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreamActive(true);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to access camera';
      setError(message);
      console.error('Camera error:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreamActive(false);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    videoRef,
    isStreamActive,
    error,
    startCamera,
    stopCamera
  };
}
