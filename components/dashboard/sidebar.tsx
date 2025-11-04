"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Plus, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "glass-strong border-r border-border/50 transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-80"
      )}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="font-semibold text-sm text-muted-foreground">
            Conversations
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {!isCollapsed && (
        <>
          {/* New Chat Button */}
          <div className="px-4 pb-4">
            <Button className="w-full justify-start" variant="default">
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </div>

          <Separator />

          {/* Conversations List */}
          <ScrollArea className="flex-1 px-2">
            <div className="space-y-1 py-2">
              {/* Placeholder conversations */}
              {[1, 2, 3].map((i) => (
                <button
                  key={i}
                  className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                >
                  <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      Conversation {i}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      Last message preview...
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </>
      )}

      {isCollapsed && (
        <div className="flex-1 flex flex-col items-center py-4 space-y-2">
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
          <Separator className="w-8" />
          {[1, 2, 3].map((i) => (
            <Button key={i} variant="ghost" size="icon">
              <MessageSquare className="h-4 w-4" />
            </Button>
          ))}
        </div>
      )}
    </aside>
  );
}
