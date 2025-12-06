import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, X, TrendingUp } from "lucide-react";

interface SemanticSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const popularSearches = [
  "minimal portfolio template",
  "dark mode UI kit",
  "notion templates",
  "figma components",
];

const aiSuggestions = [
  { query: "modern ebook for designers", score: 0.95 },
  { query: "SaaS dashboard template", score: 0.89 },
  { query: "mobile app UI kit dark mode", score: 0.87 },
];

export function SemanticSearchBar({
  value,
  onChange,
  className,
}: SemanticSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    setShowAISuggestions(true);
  };

  const handleBlur = () => {
    // Delay to allow clicking on suggestions
    setTimeout(() => {
      setIsFocused(false);
      setShowAISuggestions(false);
    }, 200);
  };

  const handleSuggestionClick = (query: string) => {
    onChange(query);
    setShowAISuggestions(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search with AI... try 'minimal portfolio for designers'"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="pl-11 pr-20 h-12 bg-secondary/50 border-transparent focus:border-champagne/50 text-base"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-12 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-champagne">
          <Sparkles className="h-3 w-3" />
          <span>AI</span>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showAISuggestions && !value && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card-elevated p-4 z-50 animate-fade-in">
          {/* AI Suggestions */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-champagne" />
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                AI Suggestions
              </span>
            </div>
            <div className="space-y-2">
              {aiSuggestions.map((suggestion) => (
                <button
                  key={suggestion.query}
                  onClick={() => handleSuggestionClick(suggestion.query)}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-secondary transition-colors text-left"
                >
                  <span className="text-sm">{suggestion.query}</span>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(suggestion.score * 100)}% match
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Popular Searches */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Popular Searches
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => handleSuggestionClick(search)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-secondary transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
