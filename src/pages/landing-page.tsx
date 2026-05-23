import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { ArrowRight, Code2, Layout, Zap } from "lucide-react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LandingPage() {
  const { isSignedIn } = useUser();

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 text-center">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
          Beta version now live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
          Master System Design <br />
          <span className="text-primary">With AI Feedback</span>
        </h1>
        
        <p className="max-w-[700px] mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
          The ultimate playground for software architects. Draw diagrams, solve real-world challenges, and get instant educational feedback from our AI teacher.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {isSignedIn ? (
            <Link to="/problems">
              <Button size="lg" className="px-8 text-base font-semibold group">
                Go to Problems
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          ) : (
            <SignInButton mode="modal">
              <Button size="lg" className="px-8 text-base font-semibold group">
                Start Learning Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </SignInButton>
          )}
          <Button variant="outline" size="lg" className="px-8 text-base font-semibold">
            View Challenges
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Layout className="h-6 w-6" />}
          title="Visual Builder"
          description="Build complex architectures using our intuitive React Flow based drag-and-drop interface."
        />
        <FeatureCard 
          icon={<Zap className="h-6 w-6" />}
          title="AI Validation"
          description="Our AI analyzes your diagram against industry best practices and provides actionable feedback."
        />
        <FeatureCard 
          icon={<Code2 className="h-6 w-6" />}
          title="Deep Learning"
          description="Learn through practice with curated problems ranging from simple load balancing to global scale systems."
        />
      </section>
      
      {/* Visual Preview (Mockup)
      <section className="container mx-auto px-4 mt-10">
        <div className="relative rounded-[2rem] border border-border/50 bg-card p-4 shadow-2xl overflow-hidden">
          <div className="aspect-[16/9] rounded-2xl bg-muted/30 flex items-center justify-center overflow-hidden">
            <div className="flex flex-col items-center gap-4">
              <div className="w-64 h-32 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Visual Diagram Preview</span>
              </div>
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center">
                  <span className="text-primary text-xs">Node</span>
                </div>
                <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center">
                  <span className="text-primary text-xs">Node</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-none shadow-none bg-muted/40 transition-all hover:bg-muted/60">
      <CardHeader>
        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
          {icon}
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
