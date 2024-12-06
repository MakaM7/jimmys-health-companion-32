import { Button } from "@/components/ui/button";
import { Globe, ShieldCheck, Leaf, MapPin } from "lucide-react";

interface ActionButtonsProps {
  onTranslate: (language: string) => void;
  onMorePrevention: () => void;
  onMoreAlternatives: () => void;
  onFindSpecialist: () => void;
}

export const ActionButtons = ({
  onTranslate,
  onMorePrevention,
  onMoreAlternatives,
  onFindSpecialist,
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
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50"
          onClick={onMorePrevention}
        >
          <ShieldCheck className="mr-1" />
          More Prevention Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50"
          onClick={onMoreAlternatives}
        >
          <Leaf className="mr-1" />
          More Natural Alternatives
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50"
          onClick={onFindSpecialist}
        >
          <MapPin className="mr-1" />
          Find Specialist Near Me
        </Button>
      </div>
    </div>
  );
};