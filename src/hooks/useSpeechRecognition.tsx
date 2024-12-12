import { useState, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionProps {
  onTranscriptChange: (transcript: string) => void;
  onMessageDetected?: (message: string) => void;
}

export const useSpeechRecognition = ({
  onTranscriptChange,
  onMessageDetected,
}: UseSpeechRecognitionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState<any>(null);
  const [isRecordingMessage, setIsRecordingMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

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

        const lowerTranscript = currentTranscript.toLowerCase();
        
        if (lowerTranscript.includes('jimmy') && !isRecordingMessage) {
          setIsRecordingMessage(true);
          setCurrentMessage("");
          console.log("Started recording message after 'jimmy'");
        }
        
        if (isRecordingMessage && lowerTranscript.includes('finish')) {
          const messageStart = lowerTranscript.lastIndexOf('jimmy') + 5;
          const messageEnd = lowerTranscript.lastIndexOf('finish');
          if (messageStart < messageEnd) {
            const message = currentTranscript.slice(messageStart, messageEnd).trim();
            console.log("Message detected:", message);
            onMessageDetected?.(message);
            setIsRecordingMessage(false);
            setCurrentMessage("");
          }
        } else if (isRecordingMessage) {
          const messageStart = lowerTranscript.lastIndexOf('jimmy') + 5;
          setCurrentMessage(currentTranscript.slice(messageStart).trim());
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error !== 'aborted') {
          setIsListening(false);
          setTimeout(() => {
            startListening();
          }, 1000);
        }
      };

      recognition.onend = () => {
        console.log("Speech recognition ended");
        setIsListening(false);
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
  }, [onTranscriptChange, onMessageDetected, isRecordingMessage]);

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
    isRecordingMessage,
    currentMessage,
  };
};