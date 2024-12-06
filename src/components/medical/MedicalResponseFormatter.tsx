import { 
  CircleDot, 
  Stethoscope, 
  Microscope,
  Leaf,
  Utensils,
  ShieldCheck,
  User,
  Beaker,
} from "lucide-react";
import { Table as UITable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ParsedSection {
  title: string;
  content: string[];
}

const parseSections = (content: string): Record<string, ParsedSection> => {
  const sections = content.split('\n\n');
  const result: Record<string, ParsedSection> = {
    condition: { title: '', content: [] },
    causes: { title: '', content: [] },
    ingredients: { title: '', content: [] },
    alternatives: { title: '', content: [] },
    prevention: { title: '', content: [] },
    specialist: { title: '', content: [] },
  };

  sections.forEach(section => {
    const lines = section.split('\n');
    const title = lines[0];

    if (title.includes('Condition:')) {
      result.condition = { title, content: lines.slice(1) };
    } else if (title.includes('Common Causes:')) {
      result.causes = { title, content: lines.slice(1).map(line => line.replace('• ', '')) };
    } else if (title.includes('Active Ingredients:')) {
      result.ingredients = { title, content: lines.slice(1).map(line => line.replace('• ', '')) };
    } else if (title.includes('Natural Alternatives:')) {
      result.alternatives = { title, content: lines.slice(1).map(line => line.replace('• ', '')) };
    } else if (title.includes('Prevention Guidelines:')) {
      result.prevention = { title, content: lines.slice(1).map(line => line.replace('• ', '')) };
    } else if (title.includes('Specialist Referral:')) {
      result.specialist = { title, content: lines.slice(1).map(line => line.replace('• ', '')) };
    }
  });

  return result;
};

export const formatMedicalResponse = (content: string) => {
  const sections = parseSections(content);
  const elements = [];

  // Condition Section (Always show if exists)
  if (sections.condition.title) {
    elements.push(
      <div key="condition" className="text-xl font-bold mb-4 flex items-center gap-2">
        <Stethoscope className="h-6 w-6 text-primary" />
        {sections.condition.title}
      </div>
    );
  }

  // Common Causes Section
  if (sections.causes.title) {
    elements.push(
      <div key="causes" className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Microscope className="h-5 w-5 text-warning" />
          <h3 className="text-lg font-semibold">{sections.causes.title}</h3>
        </div>
        <ul className="list-none space-y-2">
          {sections.causes.content.map((item, i) => (
            <li key={i} className="flex items-center gap-2 ml-4">
              <CircleDot className="h-4 w-4 text-primary-foreground/70" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Active Ingredients Section
  if (sections.ingredients.title && sections.ingredients.content.length > 0) {
    elements.push(
      <div key="ingredients" className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Microscope className="h-5 w-5 text-secondary" />
          <h3 className="text-lg font-semibold">{sections.ingredients.title}</h3>
        </div>
        <UITable>
          <TableHeader>
            <TableRow>
              <TableHead>Ingredient</TableHead>
              <TableHead>Purpose</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sections.ingredients.content.map((item, i) => {
              const [ingredient = '', purpose = ''] = item.split(' - ');
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
  }

  // Natural Alternatives Section
  if (sections.alternatives.title && sections.alternatives.content.length > 0) {
    elements.push(
      <div key="alternatives" className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Leaf className="h-5 w-5 text-[#50B3A2]" />
          <h3 className="text-lg font-semibold">{sections.alternatives.title}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.alternatives.content.slice(0, 5).map((item, i) => (
            <div key={i} className="bg-gray-800/50 rounded-lg p-4 border border-[#50B3A2]/20">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="h-4 w-4 text-[#50B3A2]" />
                <span className="font-medium">{item}</span>
              </div>
              <div className="mt-2 p-3 bg-gray-900/50 rounded-md">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Beaker className="h-4 w-4" />
                  <span className="font-medium">Preparation Method:</span>
                </div>
                <p className="mt-1 text-sm text-gray-300 ml-6">
                  {[
                    "Steep in hot water for 10-15 minutes to make a therapeutic tea",
                    "Create a paste by grinding with a small amount of water",
                    "Infuse in carrier oil for 2-3 weeks in a dark place",
                    "Blend with honey to create a natural syrup",
                    "Make a compress by soaking cloth in strong infusion"
                  ][i]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Prevention Guidelines Section
  if (sections.prevention.title) {
    elements.push(
      <div key="prevention" className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="h-5 w-5 text-[#F97316]" />
          <h3 className="text-lg font-semibold">{sections.prevention.title}</h3>
        </div>
        <ul className="list-none space-y-2">
          {sections.prevention.content.map((item, i) => (
            <li key={i} className="flex items-center gap-2 ml-4">
              <CircleDot className="h-4 w-4 text-primary-foreground/70" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Specialist Referral Section
  if (sections.specialist.title) {
    elements.push(
      <div key="specialist" className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <User className="h-5 w-5 text-[#D946EF]" />
          <h3 className="text-lg font-semibold">{sections.specialist.title}</h3>
        </div>
        <ul className="list-none space-y-2">
          {sections.specialist.content.map((item, i) => (
            <li key={i} className="flex items-center gap-2 ml-4">
              <CircleDot className="h-4 w-4 text-primary-foreground/70" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return elements;
};