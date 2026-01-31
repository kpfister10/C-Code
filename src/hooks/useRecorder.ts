import { useState, useRef, useCallback } from 'react';

interface UseRecorderReturn {
  isRecording: boolean;
  recordedUrl: string | null;
  startRecording: (stream: MediaStream) => void;
  stopRecording: () => void;
  clearRecording: () => void;
}

export function useRecorder(): UseRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback((stream: MediaStream) => {
    chunksRef.current = [];

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9'
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedUrl(url);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start(100);
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  const clearRecording = useCallback(() => {
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
    }
    setRecordedUrl(null);
    chunksRef.current = [];
  }, [recordedUrl]);

  return {
    isRecording,
    recordedUrl,
    startRecording,
    stopRecording,
    clearRecording
  };
}
