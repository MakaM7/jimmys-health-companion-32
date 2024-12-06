import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface ActionButtonsProps {
  onTranslate: (language: string) => void;
}

export const ActionButtons = ({
  onTranslate,
}: ActionButtonsProps) => {
  return (
    <div className="mt-6 space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50"
          onClick={() => onTranslate("arabic")}
        >
          <Globe className="mr-1" />
          Translate to Arabic
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50"
          onClick={() => onTranslate("french")}
        >
          <Globe className="mr-1" />
          Translate to French
        </Button>
      </div>
    </div>
  );
};