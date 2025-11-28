import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";

interface SuggestionChipProps {
  question: string;
  onClick: () => void;
}

export function SuggestionChip({ question, onClick }: SuggestionChipProps) {
  return (
    <Badge
      variant="outline"
      className="cursor-pointer whitespace-nowrap px-4 py-2 text-sm font-normal bg-background border-border"
      onClick={onClick}
      data-testid={`chip-suggestion-${question.slice(0, 20).replace(/\s/g, "-")}`}
    >
      <MessageCircle className="h-3 w-3 mr-2 text-primary" />
      {question}
    </Badge>
  );
}
