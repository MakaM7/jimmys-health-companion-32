import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { Heart } from "lucide-react";

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
        "👋 Hello! I'm MediGuide, your personal health assistant. Please describe your symptoms in detail, and I'll help analyze them. Remember, my insights are informational and don't replace professional medical advice.",
      isBot: true,
    },
  ]);

  const handleSendMessage = (content: string) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), content, isBot: false },
      {
        id: Date.now() + 1,
        content: "I'm analyzing your symptoms. Please note that this is a demo response and in a real implementation, this would connect to a medical AI model.",
        isBot: true,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="container flex items-center gap-2">
          <Heart className="h-6 w-6" />
          <h1 className="text-xl font-bold">Jimmy's MediGuide</h1>
        </div>
      </header>

      <main className="container flex-1 py-6">
        <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
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
          <MedicalDisclaimer />
        </div>
      </main>
    </div>
  );
};

export default Index;