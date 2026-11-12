import { Link } from "react-router";
import { Boxes } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center mx-auto px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Boxes className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">System Design <span className="text-primary">Lab</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-10">
            <Link to="/problems" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Problems
            </Link>
            <Link to="/submissions" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Submissions
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
