import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export const ChatInput = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t backdrop-blur-sm">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Describe your symptoms..."
        className="flex-1 bg-white/80 backdrop-blur-sm border border-opacity-20 transition-all duration-300 hover:shadow-md focus:shadow-lg"
      />
      <Button 
        type="submit" 
        className="bg-primary/90 hover:bg-primary shadow-[0_0_15px_rgba(74,144,226,0.3)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(74,144,226,0.5)] hover:scale-105"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};