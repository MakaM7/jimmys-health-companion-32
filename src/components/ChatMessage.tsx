import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { translateContent } from "@/services/gptPrompts";
import { ActionButtons } from "./medical/ActionButtons";
import { formatMedicalResponse } from "./medical/MedicalResponseFormatter";

interface ChatMessageProps {
  isBot: boolean;
  content: string;
  className?: string;
  apiKey?: string;
  onResponse?: (response: string) => void;
}

export const ChatMessage = ({ isBot, content, className, apiKey, onResponse }: ChatMessageProps) => {
  const { toast } = useToast();

  const handleTranslate = async (language: string) => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your Azure OpenAI API key first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const translatedContent = await translateContent(content, language, apiKey);
      if (onResponse) {
        onResponse(translatedContent);
      }
      toast({
        title: `Translated to ${language}`,
        description: "Translation completed successfully.",
      });
    } catch (error) {
      toast({
        title: "Translation Error",
        description: "Failed to translate the content.",
        variant: "destructive",
      });
    }
  };

  // Check if the content follows the medical response format
  const isMedicalResponse = content.includes('Condition:') || 
                          content.includes('Common Causes:') || 
                          content.includes('Active Ingredients:');

  return (
    <div
      className={cn(
        "p-6 rounded-lg max-w-[80%] animate-fade-in backdrop-blur-sm border border-opacity-20",
        "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:opacity-80",
        isBot 
          ? "bg-gray-900/80 text-white ml-2 border-gray-700/30" 
          : "bg-gray-800/80 text-white mr-2 ml-auto border-gray-600/30",
        className
      )}
    >
      {isBot ? (
        <>
          {formatMedicalResponse(content)}
          {isMedicalResponse && (
            <ActionButtons
              onTranslate={handleTranslate}
            />
          )}
        </>
      ) : (
        content
      )}
    </div>
  );
};