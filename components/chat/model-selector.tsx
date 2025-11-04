"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const AI_MODELS = [
  {
    id: "gpt-4",
    name: "GPT-4",
    provider: "OpenAI",
    description: "Most capable model, best for complex tasks",
    status: "connected",
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "OpenAI",
    description: "Fast and efficient for most tasks",
    status: "connected",
  },
  {
    id: "claude-opus",
    name: "Claude Opus",
    provider: "Anthropic",
    description: "Powerful reasoning and analysis",
    status: "disconnected",
  },
  {
    id: "claude-sonnet",
    name: "Claude Sonnet",
    provider: "Anthropic",
    description: "Balanced performance and speed",
    status: "disconnected",
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "Google",
    description: "Multimodal capabilities",
    status: "disconnected",
  },
];

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const currentModel = AI_MODELS.find((m) => m.id === selectedModel);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="glass hover:bg-muted/50 transition-all duration-200 group"
        >
          <Sparkles className="mr-2 h-4 w-4 text-primary group-hover:rotate-12 transition-transform" />
          <span className="font-medium">{currentModel?.name || "Select Model"}</span>
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="glass-strong w-80" align="start">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          AI Models
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {AI_MODELS.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => onModelChange(model.id)}
            className={cn(
              "flex items-start gap-3 p-3 cursor-pointer",
              model.status === "disconnected" && "opacity-50"
            )}
            disabled={model.status === "disconnected"}
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{model.name}</span>
                <span className="text-xs text-muted-foreground">
                  {model.provider}
                </span>
                {model.status === "disconnected" && (
                  <span className="text-xs text-destructive">
                    Not connected
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {model.description}
              </p>
            </div>
            {selectedModel === model.id && (
              <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs text-primary">
          + Connect more models
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
