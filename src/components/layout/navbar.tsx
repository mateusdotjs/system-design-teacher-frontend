import { UserButton, SignInButton, SignedIn, SignedOut, SignUpButton } from "@clerk/clerk-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Boxes } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Boxes className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">System Design <span className="text-primary">Prep</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-10">
            <Link to="/problems" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Problems
            </Link>
            <Link to="/submissions" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              My Submissions
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/problems">
              <Button variant="ghost" size="sm">Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Get Started</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9"
                }
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
