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
        "p-4 rounded-lg max-w-[80%] animate-fade-in backdrop-blur-sm border border-opacity-20",
        "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
        "before:absolute before:inset-0 before:z-[-1] before:animate-pulse before:opacity-20 before:blur-xl",
        isBot 
          ? "bg-primary/80 text-white ml-2 border-primary/30 hover:bg-primary/90 before:bg-primary" 
          : "bg-secondary/80 text-white mr-2 ml-auto border-secondary/30 hover:bg-secondary/90 before:bg-secondary",
        className
      )}
    >
      {content}
    </div>
  );
};