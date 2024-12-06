import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { translateContent, getMorePreventionDetails, getMoreNaturalAlternatives, findSpecialist } from "@/services/gptPrompts";
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

  const handleMorePrevention = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your Azure OpenAI API key first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const preventionDetails = await getMorePreventionDetails(content, apiKey);
      if (onResponse) {
        onResponse(preventionDetails);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get prevention details.",
        variant: "destructive",
      });
    }
  };

  const handleMoreAlternatives = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your Azure OpenAI API key first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const alternatives = await getMoreNaturalAlternatives(content, apiKey);
      if (onResponse) {
        onResponse(alternatives);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get natural alternatives.",
        variant: "destructive",
      });
    }
  };

  const handleFindSpecialist = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your Azure OpenAI API key first.",
        variant: "destructive",
      });
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const specialists = await findSpecialist(
              content,
              {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
              apiKey
            );
            if (onResponse) {
              onResponse(specialists);
            }
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to get specialist recommendations.",
              variant: "destructive",
            });
          }
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Failed to get your location. Please enable location services.",
            variant: "destructive",
          });
        }
      );
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
              onMorePrevention={handleMorePrevention}
              onMoreAlternatives={handleMoreAlternatives}
              onFindSpecialist={handleFindSpecialist}
            />
          )}
        </>
      ) : (
        content
      )}
    </div>
  );
};
