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

export const formatMedicalResponse = (content: string) => {
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
            <Microscope className="h-5 w-5 text-secondary" />
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
    } else if (section.includes('Natural Alternatives:')) {
      const [title, ...items] = section.split('\n');
      return (
        <div key={index} className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="h-5 w-5 text-[#50B3A2]" />
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.slice(0, 5).map((item, i) => (
              <div key={i} className="bg-gray-800/50 rounded-lg p-4 border border-[#50B3A2]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-4 w-4 text-[#50B3A2]" />
                  <span className="font-medium">{item.replace('• ', '')}</span>
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
            <User className="h-5 w-5 text-[#D946EF]" />
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