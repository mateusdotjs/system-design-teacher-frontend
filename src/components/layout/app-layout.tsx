import { type ReactNode } from "react";
import { Navbar } from "./navbar";

interface AppLayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export function AppLayout({ children, hideFooter }: AppLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      
      {!hideFooter && (
        <footer className="border-t border-border/40 py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row mx-auto px-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SystemDesign AI. Built for architects.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
