import { useState, useEffect, useRef } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ApiKeyConfig } from "@/components/ApiKeyConfig";
import { generateMedicalResponse } from "@/services/azureOpenAI";
import { Heart, Mic } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { formatMedicalResponse } from "@/components/medical/MedicalResponseFormatter";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

interface Message {
  id: number;
  content: string;
  isBot: boolean;
}

interface Condition {
  name: string;
  timestamp: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content:
        "👋 Hello Jimmy! I'm MediGuide, your personal health assistant. Please describe your symptoms in detail, and I'll help analyze them.",
      isBot: true,
    },
  ]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [apiKey, setApiKey] = useState<string>("");
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState("");
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const extractCondition = (content: string): string | null => {
    const match = content.match(/Condition:\s*([^\n]+)/);
    return match ? match[1].trim() : null;
  };

  const handleSendMessage = async (content: string) => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your Azure OpenAI API key first.",
        variant: "destructive",
      });
      return;
    }

    setMessages((prev) => [...prev, { id: Date.now(), content, isBot: false }]);

    try {
      const response = await generateMedicalResponse(content, apiKey);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, content: response, isBot: true },
      ]);

      const condition = extractCondition(response);
      if (condition) {
        setConditions(prev => [...prev, {
          name: condition,
          timestamp: new Date().toLocaleString()
        }]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate response. Please check your API key and try again.",
        variant: "destructive",
      });
    }
  };

  const { transcript, startListening } = useSpeechRecognition({
    onTranscriptChange: (text) => {
      // Clear any existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Set a new timeout
      typingTimeoutRef.current = setTimeout(() => {
        if (text.trim()) {
          handleSendMessage(text);
        }
      }, 10000);
    },
    triggerWord: "symptoms",
    onTriggerWordDetected: (text) => {
      setInputValue(text);
    },
  });

  useEffect(() => {
    if (apiKey) {
      startListening();
      toast({
        title: "Speech Recognition Active",
        description: "Say 'symptoms' to start dictating your message.",
      });
    }
  }, [apiKey, startListening]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      <header className="bg-black/90 text-white p-4 shadow-lg">
        <div className="container flex items-center gap-2">
          <Heart className="h-6 w-6 animate-pulse" />
          <h1 className="text-xl font-bold">Jimmy's MediGuide</h1>
        </div>
      </header>

      <div className="container py-8">
        <div className="bg-black/40 rounded-lg shadow-xl p-8 mb-6 border border-gray-700 animate-fade-in">
          <h2 className="text-3xl font-bold text-white mb-4">👋 Hello Jimmy!</h2>
          <p className="text-xl text-gray-300">
            I'm MediGuide, your personal health assistant. Please describe your symptoms in detail, and I'll help analyze them.
          </p>
        </div>
      </div>

      <main className="container flex-1 py-6 flex gap-6">
        <div className="bg-black/40 rounded-lg shadow-xl w-3/4 border border-gray-700">
          <ApiKeyConfig onApiKeySet={setApiKey} />
          <div className="h-[600px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                isBot={message.isBot}
                content={message.isBot ? formatMedicalResponse(message.content) : message.content}
              />
            ))}
          </div>
          <ChatInput onSend={handleSendMessage} value={inputValue} onChange={setInputValue} />
        </div>

        <div className="w-1/4 space-y-4">
          <div className="bg-black/40 rounded-lg shadow-xl border border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Mic className={`h-5 w-5 ${transcript ? 'text-green-500' : 'text-gray-500'}`} />
              <h2 className="text-white text-lg font-semibold">Speech Recognition</h2>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
              <p className="text-gray-300 text-sm">{transcript || "Listening..."}</p>
            </div>
          </div>

          <div className="bg-black/40 rounded-lg shadow-xl border border-gray-700 p-4">
            <h2 className="text-white text-lg font-semibold mb-4">Analyzed Conditions History</h2>
            <div className="space-y-3">
              {conditions.map((condition, index) => (
                <div key={index} className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                  <p className="text-white font-medium">{condition.name}</p>
                  <p className="text-gray-400 text-sm">{condition.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;