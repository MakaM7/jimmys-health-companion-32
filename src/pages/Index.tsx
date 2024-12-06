import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ApiKeyConfig } from "@/components/ApiKeyConfig";
import { generateMedicalResponse } from "@/services/azureOpenAI";
import { Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: number;
  content: string;
  isBot: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content:
        "👋 Hello! I'm MediGuide, your personal health assistant. Please describe your symptoms in detail, and I'll help analyze them.",
      isBot: true,
    },
  ]);
  const [apiKey, setApiKey] = useState<string>("");
  const { toast } = useToast();

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
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate response. Please check your API key and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      <header className="bg-black/90 text-white p-4 shadow-lg">
        <div className="container flex items-center gap-2">
          <Heart className="h-6 w-6 animate-pulse" />
          <h1 className="text-xl font-bold">Jimmy's MediGuide</h1>
        </div>
      </header>

      <main className="container flex-1 py-6">
        <div className="bg-black/40 rounded-lg shadow-xl max-w-3xl mx-auto border border-gray-700">
          <ApiKeyConfig onApiKeySet={setApiKey} />
          <div className="h-[600px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                isBot={message.isBot}
                content={message.content}
              />
            ))}
          </div>
          <ChatInput onSend={handleSendMessage} />
        </div>
      </main>
    </div>
  );
};

export default Index;