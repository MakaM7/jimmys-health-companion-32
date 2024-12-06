import { cn } from "@/lib/utils";
import { 
  CircleDot, 
  Pill, 
  Microscope, 
  Stethoscope, 
  Table, 
  ShieldCheck, 
  Leaf,
  UserMd
} from "lucide-react";
import { Table as UITable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
      if (section.includes('Condition:')) {
        return (
          <div key={index} className="text-xl font-bold mb-4 flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-primary" />
            {section}
          </div>
        );
      } else if (section.includes('Common Causes:')) {
        const [title, ...items] = section.split('\n');
        return (
          <div key={index} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Microscope className="h-5 w-5 text-warning" />
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <ul className="list-none space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-center gap-2 ml-4">
                  <CircleDot className="h-4 w-4 text-primary-foreground/70" />
                  {item.replace('• ', '')}
                </li>
              ))}
            </ul>
          </div>
        );
      } else if (section.includes('Active Ingredients:')) {
        const [title, ...ingredients] = section.split('\n');
        return (
          <div key={index} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Table className="h-5 w-5 text-secondary" />
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <UITable>
              <TableHeader>
                <TableRow>
                  <TableHead>Ingredient</TableHead>
                  <TableHead>Purpose</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ingredients.map((item, i) => {
                  const [ingredient, purpose] = item.replace('• ', '').split(' - ');
                  return (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{ingredient}</TableCell>
                      <TableCell>{purpose}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </UITable>
          </div>
        );
      } else if (section.includes('Recommended Medications:')) {
        const [title, ...items] = section.split('\n');
        return (
          <div key={index} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Pill className="h-5 w-5 text-[#9b87f5]" />
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <ul className="list-none space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-center gap-2 ml-4">
                  <CircleDot className="h-4 w-4 text-primary-foreground/70" />
                  {item.replace('• ', '')}
                </li>
              ))}
            </ul>
          </div>
        );
      } else if (section.includes('Natural Alternatives:')) {
        const [title, ...items] = section.split('\n');
        return (
          <div key={index} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="h-5 w-5 text-[#50B3A2]" />
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <ul className="list-none space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-center gap-2 ml-4">
                  <CircleDot className="h-4 w-4 text-primary-foreground/70" />
                  {item.replace('• ', '')}
                </li>
              ))}
            </ul>
          </div>
        );
      } else if (section.includes('Prevention Guidelines:')) {
        const [title, ...items] = section.split('\n');
        return (
          <div key={index} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="h-5 w-5 text-[#F97316]" />
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <ul className="list-none space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-center gap-2 ml-4">
                  <CircleDot className="h-4 w-4 text-primary-foreground/70" />
                  {item.replace('• ', '')}
                </li>
              ))}
            </ul>
          </div>
        );
      } else if (section.includes('Specialist Referral:')) {
        const [title, ...items] = section.split('\n');
        return (
          <div key={index} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <UserMd className="h-5 w-5 text-[#D946EF]" />
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <ul className="list-none space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-center gap-2 ml-4">
                  <CircleDot className="h-4 w-4 text-primary-foreground/70" />
                  {item.replace('• ', '')}
                </li>
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