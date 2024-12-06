import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  onTranslate: (language: string) => void;
  disabled?: boolean;
}

export const ActionButtons = ({ onTranslate, disabled }: ActionButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onTranslate('French')}
        disabled={disabled}
        className="text-gray-900 hover:text-gray-900 border-gray-300"
      >
        Translate to French
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onTranslate('Arabic')}
        disabled={disabled}
        className="text-gray-900 hover:text-gray-900 border-gray-300"
      >
        Translate to Arabic
      </Button>
    </div>
  );
};