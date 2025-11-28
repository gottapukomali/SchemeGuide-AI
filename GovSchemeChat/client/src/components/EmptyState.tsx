import { MessageCircle, Sparkles } from "lucide-react";
import { SuggestionChip } from "./SuggestionChip";

const quickQuestions = [
  "What schemes are available for students?",
  "Housing schemes I can apply for?",
  "Schemes for farmers in India?",
  "Health insurance schemes for families?",
];

interface EmptyStateProps {
  onSelectQuestion: (question: string) => void;
}

export function EmptyState({ onSelectQuestion }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <MessageCircle className="h-8 w-8 text-primary" />
      </div>

      <h2 className="mb-2 text-xl font-semibold text-foreground text-center">
        Welcome to Government Schemes Assistant
      </h2>
      <p className="mb-8 max-w-md text-center text-muted-foreground">
        Ask me anything about Central and State Government schemes. I can help you find
        eligibility, benefits, required documents, and application process.
      </p>

      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Sparkles className="h-4 w-4" />
        <span>Try asking:</span>
      </div>

      <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
        {quickQuestions.map((question) => (
          <SuggestionChip
            key={question}
            question={question}
            onClick={() => onSelectQuestion(question)}
          />
        ))}
      </div>
    </div>
  );
}
