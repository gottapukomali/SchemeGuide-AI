import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatInput } from "@/components/ChatInput";
import { MessageBubble } from "@/components/MessageBubble";
import { TypingIndicator } from "@/components/TypingIndicator";
import { EmptyState } from "@/components/EmptyState";
import { SuggestionChip } from "@/components/SuggestionChip";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Message, ChatResponse } from "@shared/schema";

const defaultQuestions = [
  "Tell me more about this scheme",
  "What documents do I need?",
  "How can I apply?",
  "Check my eligibility",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>(defaultQuestions);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initialQuestion = sessionStorage.getItem("initialQuestion");
    if (initialQuestion) {
      sessionStorage.removeItem("initialQuestion");
      setInputValue(initialQuestion);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", {
        message,
        conversationHistory: messages.slice(-10),
      });
      const data = await response.json() as ChatResponse;
      return data;
    },
    onSuccess: (data) => {
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.message,
        timestamp: Date.now(),
        schemes: data.schemes,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      
      if (data.suggestedQuestions && data.suggestedQuestions.length > 0) {
        setSuggestedQuestions(data.suggestedQuestions);
      } else {
        setSuggestedQuestions(defaultQuestions);
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to get response. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSend = (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    chatMutation.mutate(message);
  };

  const handleSelectQuestion = (question: string) => {
    handleSend(question);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputValue("");
    setSuggestedQuestions(defaultQuestions);
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            Schemes Assistant
          </h1>
          <p className="text-sm text-muted-foreground">
            Ask about any government scheme
          </p>
        </div>
        {messages.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewChat}
            data-testid="button-new-chat"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1 px-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <EmptyState onSelectQuestion={handleSelectQuestion} />
        ) : (
          <div className="mx-auto max-w-3xl space-y-6 py-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {chatMutation.isPending && <TypingIndicator />}
          </div>
        )}
      </ScrollArea>

      <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {messages.length > 0 && !chatMutation.isPending && (
          <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
            {suggestedQuestions.map((question) => (
              <SuggestionChip
                key={question}
                question={question}
                onClick={() => handleSelectQuestion(question)}
              />
            ))}
          </div>
        )}

        <div className="mx-auto max-w-3xl px-4 pb-4">
          <ChatInput
            onSend={handleSend}
            disabled={chatMutation.isPending}
            initialValue={inputValue}
          />
        </div>
      </div>
    </div>
  );
}
