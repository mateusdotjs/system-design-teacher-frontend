import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useApi } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  ArrowRight, 
  Brain, 
  Network,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router";

interface Submission {
  id: string;
  problem_id: string;
  problem_title: string;
  diagram: any;
  positive_feedbacks: string[];
  negative_feedbacks: string[];
  created_at: string;
}

interface PaginatedSubmissions {
  data: Submission[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export function SubmissionsPage() {
  const api = useApi();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useQuery<PaginatedSubmissions>({
    queryKey: ["submissions", page],
    queryFn: () => api.getSubmissions(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="mb-8">
          <Skeleton className="h-10 w-[250px] mb-2" />
          <Skeleton className="h-5 w-[350px]" />
        </div>
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-[280px] w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-md">
        <div className="inline-flex p-3 rounded-full bg-destructive/10 text-destructive mb-4">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Failed to load submissions</h2>
        <p className="text-muted-foreground mb-6">
          We encountered an error while fetching your previous architectures. Please check if the backend server is running.
        </p>
        <Button onClick={() => window.location.reload()}>Retry Connection</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-border/40 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/75 bg-clip-text text-transparent flex items-center gap-2.5">
            <Brain className="h-8 w-8 text-primary" />
            My Architecture Submissions
          </h1>
          <p className="text-muted-foreground mt-1">
            Review your past system designs, AI feedback, and optimization recommendations.
          </p>
        </div>
        <Badge variant="outline" className="px-4 py-1.5 text-sm self-start md:self-center bg-muted/40 font-semibold border-primary/20 text-primary">
          {data?.pagination.total || 0} Submissions
        </Badge>
      </div>

      {data?.data && data.data.length > 0 ? (
        <div className="space-y-8">
          <div className="space-y-8">
            {data.data.map((submission) => {
              const hasNegatives = submission.negative_feedbacks.length > 0;
              const scoreLabel = !hasNegatives 
                ? { text: "Excellent", variant: "default" as const, colorClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" }
                : submission.negative_feedbacks.length <= 1 
                ? { text: "Solid", variant: "secondary" as const, colorClass: "bg-sky-500/10 text-sky-500 border-sky-500/20" }
                : { text: "Needs Tuning", variant: "outline" as const, colorClass: "bg-amber-500/10 text-amber-500 border-amber-500/20" };

              const nodeCount = submission.diagram?.nodes?.length || 0;
              const edgeCount = submission.diagram?.edges?.length || 0;

              return (
                <Card key={submission.id} className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/30 bg-card/60 backdrop-blur-sm border border-border/50">
                  {/* Decorative status gradient border at top */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                    !hasNegatives ? 'from-emerald-400 to-teal-500' : 'from-indigo-500 to-primary'
                  }`} />

                  <CardHeader className="pt-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(submission.created_at).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <CardTitle className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                          {submission.problem_title || "System Architecture Challenge"}
                        </CardTitle>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${scoreLabel.colorClass}`}>
                          {scoreLabel.text}
                        </span>
                        <Badge variant="outline" className="flex items-center gap-1 text-muted-foreground bg-muted/20 border-border/60">
                          <Network className="h-3 w-3" />
                          {nodeCount} Nodes / {edgeCount} Edges
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Positive Feedback Column */}
                      <div className="p-4 rounded-xl bg-emerald-500/[0.02] border border-emerald-500/10 space-y-3.5">
                        <h4 className="text-sm font-bold text-emerald-500 flex items-center gap-2">
                          <CheckCircle2 className="h-4.5 w-4.5" />
                          Strengths & Good Practices
                        </h4>
                        {submission.positive_feedbacks.length > 0 ? (
                          <ul className="space-y-2.5">
                            {submission.positive_feedbacks.map((feedback, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2 leading-relaxed">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                                {feedback}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-muted-foreground/60 italic leading-relaxed pl-2">
                            No specific strengths highlighted yet.
                          </p>
                        )}
                      </div>

                      {/* Negative/Constructive Feedback Column */}
                      <div className="p-4 rounded-xl bg-amber-500/[0.02] border border-amber-500/10 space-y-3.5">
                        <h4 className="text-sm font-bold text-amber-500 flex items-center gap-2">
                          <AlertCircle className="h-4.5 w-4.5" />
                          Optimization Areas
                        </h4>
                        {submission.negative_feedbacks.length > 0 ? (
                          <ul className="space-y-2.5">
                            {submission.negative_feedbacks.map((feedback, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2 leading-relaxed">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                                {feedback}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-muted-foreground/80 font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 leading-relaxed pl-2">
                            ✨ Excellent job! The architecture met all target parameters.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end pt-2 border-t border-border/20">
                      <Link to={`/editor/${submission.problem_id}/${submission.id}`}>
                        <Button variant="secondary" className="group/btn transition-all">
                          Improve Architecture
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6 border-t border-border/40 mt-10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={page === 1}
                className="gap-1 px-3 cursor-pointer hover:bg-accent/80 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-1.5 mx-2">
                {Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Button
                    key={pageNum}
                    variant={pageNum === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setPage(pageNum);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-9 h-9 p-0 font-semibold cursor-pointer transition-all duration-200 ${
                      pageNum === page 
                        ? "shadow-md shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground" 
                        : "hover:bg-accent/80"
                    }`}
                  >
                    {pageNum}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPage((p) => Math.min(data.pagination.totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={page === data.pagination.totalPages}
                className="gap-1 px-3 cursor-pointer hover:bg-accent/80 transition-colors"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/10 rounded-2xl border-2 border-dashed border-border/40 px-4">
          <Brain className="h-16 w-16 mx-auto text-muted-foreground/45 mb-4 animate-pulse" />
          <h3 className="text-xl font-bold tracking-tight mb-1 text-foreground">No Submissions Found</h3>
          <p className="text-muted-foreground max-w-sm mx-auto mb-6 text-sm">
            You haven't submitted any architecture diagrams for evaluation yet. Start solving challenges to get personalized AI feedback!
          </p>
          <Link to="/problems">
            <Button className="font-semibold shadow-md">
              Browse System Design Challenges
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
