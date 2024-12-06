import { cn } from "@/lib/utils";

interface ChatMessageProps {
  isBot: boolean;
  content: string;
  className?: string;
}

export const ChatMessage = ({ isBot, content, className }: ChatMessageProps) => {
  // Function to parse and format medical response sections
  const formatMedicalResponse = (content: string) => {
    const sections = content.split('\n\n');
    return sections.map((section, index) => {
      if (section.includes('🏥 Condition:')) {
        return (
          <div key={index} className="text-xl font-bold mb-4">
            {section}
          </div>
        );
      } else if (section.startsWith('🔍') || section.startsWith('💊') || 
                 section.startsWith('🧪') || section.startsWith('🌿') || 
                 section.startsWith('⚕️') || section.startsWith('👨‍⚕️')) {
        const [title, ...items] = section.split('\n');
        return (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <ul className="list-disc list-inside space-y-1">
              {items.map((item, i) => (
                <li key={i} className="ml-4">{item.replace('• ', '')}</li>
              ))}
            </ul>
          </div>
        );
      }
      return <p key={index} className="mb-2">{section}</p>;
    });
  };

  return (
    <div
      className={cn(
        "p-6 rounded-lg max-w-[80%] animate-fade-in backdrop-blur-sm border border-opacity-20",
        "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
        "before:absolute before:inset-0 before:z-[-1] before:animate-pulse before:opacity-20 before:blur-xl",
        isBot 
          ? "bg-primary/80 text-white ml-2 border-primary/30 hover:bg-primary/90 before:bg-primary" 
          : "bg-secondary/80 text-white mr-2 ml-auto border-secondary/30 hover:bg-secondary/90 before:bg-secondary",
        className
      )}
    >
      {isBot ? formatMedicalResponse(content) : content}
    </div>
  );
};