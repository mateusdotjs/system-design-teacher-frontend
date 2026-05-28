import { FileQuestion } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      {/* Simple, Elegant Icon Container */}
      <div className="relative mb-6 flex items-center justify-center">
        {/* Soft Decorative Glow Background */}
        <div className="absolute w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />
        
        {/* The Single Static Icon */}
        <div className="relative w-16 h-16 bg-muted/50 border border-border/60 rounded-2xl flex items-center justify-center shadow-sm">
          <FileQuestion className="w-8 h-8 text-primary" />
        </div>
      </div>

      {/* Error Message */}
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
        404
      </h1>
      <p className="text-lg text-muted-foreground max-w-sm">
        Page Not Found
      </p>
    </div>
  );
}
