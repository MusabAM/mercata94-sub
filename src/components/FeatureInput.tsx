import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FeatureInputProps {
    features: string[];
    onFeaturesChange: (features: string[]) => void;
    maxFeatures?: number;
    placeholder?: string;
}

export function FeatureInput({
    features,
    onFeaturesChange,
    maxFeatures = 10,
    placeholder = "Add a feature or benefit",
}: FeatureInputProps) {
    const [inputValue, setInputValue] = useState("");

    const addFeature = () => {
        const trimmedFeature = inputValue.trim();
        if (trimmedFeature && features.length < maxFeatures) {
            onFeaturesChange([...features, trimmedFeature]);
            setInputValue("");
        }
    };

    const removeFeature = (index: number) => {
        const newFeatures = [...features];
        newFeatures.splice(index, 1);
        onFeaturesChange(newFeatures);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addFeature();
        }
    };

    return (
        <div className="space-y-3">
            {/* Features List */}
            {features.length > 0 && (
                <ul className="space-y-2">
                    {features.map((feature, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-2 p-2 rounded-md bg-secondary/50 group"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-champagne flex-shrink-0" />
                            <span className="flex-1 text-sm">{feature}</span>
                            <button
                                type="button"
                                onClick={() => removeFeature(index)}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-secondary rounded transition-all"
                            >
                                <X className="h-3.5 w-3.5 text-muted-foreground" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Add Feature Input */}
            {features.length < maxFeatures && (
                <div className="flex gap-2">
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="flex-1 bg-background"
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={addFeature}
                        disabled={!inputValue.trim()}
                        className="flex-shrink-0"
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            )}

            {/* Helper Text */}
            <p className="text-xs text-muted-foreground">
                {features.length}/{maxFeatures} features • Press Enter or click + to add
            </p>
        </div>
    );
}
