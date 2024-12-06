import { cn } from "@/lib/utils";

interface ChatMessageProps {
  isBot: boolean;
  content: string;
  className?: string;
}

export const ChatMessage = ({ isBot, content, className }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "p-4 rounded-lg max-w-[80%] animate-fade-in",
        isBot ? "bg-primary text-white ml-2" : "bg-secondary text-white mr-2 ml-auto",
        className
      )}
    >
      {content}
    </div>
  );
};