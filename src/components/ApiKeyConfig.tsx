import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface ApiKeyConfigProps {
  onApiKeySet: (apiKey: string) => void;
}

export const ApiKeyConfig = ({ onApiKeySet }: ApiKeyConfigProps) => {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedApiKey = localStorage.getItem("azureApiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      onApiKeySet(savedApiKey);
    }
  }, [onApiKeySet]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("azureApiKey", apiKey);
      onApiKeySet(apiKey);
      toast({
        title: "API Key Saved",
        description: "Your Azure OpenAI API key has been saved successfully.",
      });
    }
  };

  return (
    <div className="p-4 bg-white/40 backdrop-blur-sm rounded-lg border border-white/50 mb-4">
      <h2 className="text-lg font-semibold mb-2">Azure OpenAI Configuration</h2>
      <div className="flex gap-2">
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Azure OpenAI API key"
          className="flex-1 bg-white/80"
        />
        <Button onClick={handleSaveApiKey} className="bg-primary/90 hover:bg-primary">
          Save API Key
        </Button>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Your API key will be stored locally and never sent to our servers.
      </p>
    </div>
  );
};