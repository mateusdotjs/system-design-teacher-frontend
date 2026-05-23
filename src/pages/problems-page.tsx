import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router";

export function ProblemsPage() {
  const api = useApi();
  const { data: problems, isLoading, error } = useQuery({
    queryKey: ["problems"],
    queryFn: api.getProblems,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold text-destructive">Error loading problems</h2>
        <p className="text-muted-foreground">Please make sure the backend is running.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Design Challenges</h1>
          <p className="text-muted-foreground">Choose a scenario and start designing your solution.</p>
        </div>
        <Badge variant="outline">
          {problems?.length || 0} Problems available
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems?.map((problem: any) => (
          <Card key={problem.id} className="group transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-end mb-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle>{problem.title}</CardTitle>
              <CardDescription>{problem.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <Link to={`/editor/${problem.id}`}>
                <Button className="w-full group/btn" variant="secondary">
                  Solve Challenge
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {problems?.length === 0 && (
        <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-border/50">
          <p className="text-muted-foreground">No problems found in the database.</p>
          <p className="text-sm">Run the seed script in the backend to populate the data.</p>
        </div>
      )}
    </div>
  );
}
