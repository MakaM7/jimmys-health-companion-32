import { useState, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionProps {
  onTranscriptChange: (transcript: string) => void;
  triggerWord?: string;
  onTriggerWordDetected?: (transcript: string) => void;
}

export const useSpeechRecognition = ({
  onTranscriptChange,
  triggerWord = "symptoms",
  onTriggerWordDetected,
}: UseSpeechRecognitionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startListening = useCallback(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        onTranscriptChange(currentTranscript);

        if (currentTranscript.toLowerCase().includes(triggerWord.toLowerCase())) {
          onTriggerWordDetected?.(currentTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        recognition.start();
      };

      recognition.start();
    } else {
      console.error('Speech recognition not supported');
    }
  }, [onTranscriptChange, triggerWord, onTriggerWordDetected]);

  return {
    isListening,
    transcript,
    startListening,
  };
};