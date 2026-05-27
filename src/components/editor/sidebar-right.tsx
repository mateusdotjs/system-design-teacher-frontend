import { type Feedback } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Lightbulb, Sparkles } from "lucide-react";

interface SidebarRightProps {
  feedback: Feedback | null;
  isValidating: boolean;
  validationError: string | null;
}

export function SidebarRight({
  feedback,
  isValidating,
  validationError,
}: SidebarRightProps) {
  return (
    <aside className="w-96 border-l bg-background flex flex-col h-full">
      <div className="p-6 border-b flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold tracking-tight">AI Feedback</h2>
      </div>

      <ScrollArea className="flex-1">
        {validationError ? (
          <div className="p-6 animate-in fade-in duration-300">
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex items-start gap-3 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-destructive mt-0.5" />
              <div>
                <h4 className="font-bold mb-1">Erro de Validação</h4>
                <p>{validationError}</p>
              </div>
            </div>
          </div>
        ) : !feedback && !isValidating ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4 opacity-50">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <p className="font-medium">No feedback yet</p>
              <p className="text-xs">
                Click "Validate Architecture" to receive AI insights about your
                design.
              </p>
            </div>
          </div>
        ) : isValidating ? (
          <div className="p-8 space-y-8 animate-pulse">
            <div className="h-24 bg-muted rounded-lg" />
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-8 animate-in fade-in duration-500">
            {/* Positive Feedbacks */}
            {feedback?.positive_feedbacks &&
              feedback.positive_feedbacks.length > 0 && (
                <section>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-emerald-500" />
                    Positive Feedbacks
                  </h3>
                  <ul className="space-y-3">
                    {feedback.positive_feedbacks.map((suggestion, i) => (
                      <li
                        key={i}
                        className="text-sm p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-emerald-900 dark:text-emerald-200"
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            {/* Negative Feedbacks */}
            {feedback?.negative_feedbacks &&
              feedback.negative_feedbacks.length > 0 && (
                <section>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    Negative Feedbacks
                  </h3>
                  <ul className="space-y-3">
                    {feedback.negative_feedbacks.map((problem, i) => (
                      <li
                        key={i}
                        className="text-sm p-3 rounded-lg bg-destructive/5 border border-destructive/10 text-destructive-foreground/90"
                      >
                        {problem}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
          </div>
        )}
      </ScrollArea>
    </aside>
  );
}
