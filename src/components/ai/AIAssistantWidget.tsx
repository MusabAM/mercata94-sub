import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "What licenses are available?",
  "How do refunds work?",
  "Can I use products commercially?",
];

const cannedResponses: Record<string, string> = {
    default: "I'm sorry, I can only answer questions about licenses, refunds, and commercial use at the moment. Please try one of the suggestions or contact support for other questions.",
    license: "We offer two main licenses: a Standard License for personal or single commercial projects, and an Extended License for unlimited commercial projects. You can find more details on each product page.",
    refund: "Due to the nature of digital products, we generally do not offer refunds. However, we will grant a refund if a file is corrupt, the product is misrepresented, or you received the wrong item. Please contact support@mercato94.com with your order number and a description of the issue to request a refund. You can view the complete policy on our Refund Policy page.",
    commercial: "Yes, all our products can be used for commercial purposes. The Standard License covers one commercial project, while the Extended License allows for unlimited commercial projects. Thank you for asking!",
};

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm the Mercato assistant. I can help you with questions about products, licenses, purchases, and more. How can I help you today?",
    },
  ]);

  const getAIResponse = (userInput: string) => {
    const lowerCaseInput = userInput.toLowerCase();
    if (lowerCaseInput.includes("license")) {
      return cannedResponses.license;
    }
    if (lowerCaseInput.includes("refund")) {
        return cannedResponses.refund;
    }
    if (lowerCaseInput.includes("commercial")) {
        return cannedResponses.commercial;
    }
    return cannedResponses.default;
  }

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages([...messages, userMessage]);
    
    const aiResponseContent = getAIResponse(input);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponseContent,
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-foreground text-background shadow-float flex items-center justify-center hover:scale-105 transition-transform group"
        aria-label="Open AI Assistant"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-champagne flex items-center justify-center">
          <Sparkles className="h-2.5 w-2.5 text-foreground" />
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] glass-card-elevated shadow-float animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-champagne/20 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-champagne" />
          </div>
          <div>
            <p className="font-medium text-sm">Ask Mercato</p>
            <p className="text-xs text-muted-foreground">AI Assistant</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close assistant"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                message.role === "user"
                  ? "bg-foreground text-background"
                  : "bg-secondary text-foreground"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestion(suggestion)}
              className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-secondary transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1"
          />
          <Button type="submit" size="icon" variant="luxury">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
