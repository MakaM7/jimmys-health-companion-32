import { useState, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionProps {
  onTranscriptChange: (transcript: string) => void;
  triggerWord?: string;
  onTriggerWordDetected?: (transcript: string) => void;
}

export const useSpeechRecognition = ({
  onTranscriptChange,
  triggerWord = "jimmy",
  onTriggerWordDetected,
}: UseSpeechRecognitionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState<any>(null);

  const startListening = useCallback(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        console.log("Speech recognition started");
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        console.log("Transcript updated:", currentTranscript);
        setTranscript(currentTranscript);
        onTranscriptChange(currentTranscript);

        if (currentTranscript.toLowerCase().includes(triggerWord.toLowerCase())) {
          onTriggerWordDetected?.(currentTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error !== 'aborted') {
          setIsListening(false);
          // Only restart if it wasn't manually aborted
          setTimeout(() => {
            startListening();
          }, 1000);
        }
      };

      recognition.onend = () => {
        console.log("Speech recognition ended");
        setIsListening(false);
        // Restart recognition after a short delay
        setTimeout(() => {
          if (recognition) {
            recognition.start();
          }
        }, 1000);
      };

      setRecognition(recognition);
      recognition.start();
    } else {
      console.error('Speech recognition not supported');
    }
  }, [onTranscriptChange, triggerWord, onTriggerWordDetected]);

  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition]);

  return {
    isListening,
    transcript,
    startListening,
  };
};