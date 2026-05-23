import { useEffect, useState } from "react";
import { z } from "zod";
import { useParams, useNavigate } from "react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { SidebarLeft } from "@/components/editor/sidebar-left";
import { SidebarRight } from "@/components/editor/sidebar-right";
import { DiagramEditor } from "@/components/editor/diagram-editor";
import { useEditorStore } from "@/components/editor/useEditorStore";
import { type Challenge, type Feedback } from "@/components/editor/types";
import { useApi } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function EditorPage() {
  const { id, submissionId } = useParams<{ id: string; submissionId?: string }>();
  const api = useApi();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Fetch problem details from backend
  const {
    data: problem,
    isLoading: isProblemLoading,
    error: problemError,
  } = useQuery({
    queryKey: ["problem", id],
    queryFn: () => api.getProblem(id!),
    enabled: !!id,
  });

  // Fetch submission details if submissionId is provided
  const {
    data: submission,
    isLoading: isSubmissionLoading,
    error: submissionError,
  } = useQuery({
    queryKey: ["submission", submissionId],
    queryFn: () => api.getSubmission(submissionId!),
    enabled: !!submissionId,
  });

  // We read the nodes and edges from Zustand for validation purposes
  const { nodes, edges, setNodes, setEdges } = useEditorStore();

  useEffect(() => {
    if (problem) {
      setChallenge({
        id: problem.id,
        title: problem.title,
        description: problem.description,
        functionalRequirements: problem.functional_requirements || [],
        nonFunctionalRequirements: problem.non_functional_requirements || [],
      });
    }
  }, [problem]);

  useEffect(() => {
    if (submission) {
      if (submission.diagram?.nodes) {
        setNodes(submission.diagram.nodes);
      }
      if (submission.diagram?.edges) {
        setEdges(submission.diagram.edges);
      }
      setFeedback({
        positive_feedbacks: submission.positive_feedbacks || [],
        negative_feedbacks: submission.negative_feedbacks || [],
      });
    } else if (!submissionId) {
      // Clear diagram and feedback when not loading a submission
      setNodes([]);
      setEdges([]);
      setFeedback(null);
    }
  }, [submission, submissionId, setNodes, setEdges]);

  const diagramSchema = z.object({
    nodes: z.array(z.any()).min(1, "Diagram must contain at least one node"),
    edges: z.array(z.any()).min(1, "Diagram must contain at least one edge"),
  });

  // React Query Mutation to handle diagram validation/submission creation
  const validationMutation = useMutation({
    mutationFn: () => api.createSubmission(challenge!.id, { nodes, edges }),
    onSuccess: (result) => {
      setFeedback({
        positive_feedbacks: result.positive_feedbacks || [],
        negative_feedbacks: result.negative_feedbacks || [],
      });

      if (result?.id) {
        // Seed query cache with the new submission to prevent loading flicker
        queryClient.setQueryData(["submission", result.id], result);
        // Redirect to the new submission URL
        navigate(`/editor/${challenge!.id}/${result.id}`);
      }
    },
    onError: (error) => {
      console.error("Failed to validate architecture", error);
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      setValidationError(`Falha ao validar arquitetura: ${errorMessage}`);
    },
  });

  const handleValidate = async () => {
    if (!challenge) return;
    setFeedback(null);
    setValidationError(null);

    // Pre-validate diagram content client-side using Zod to prevent unnecessary requests
    const validation = diagramSchema.safeParse({ nodes, edges });
    if (!validation.success) {
      setValidationError("O diagrama precisa ter pelo menos 1 node e 1 edge.");
      return;
    }

    validationMutation.mutate();
  };

  const isLoading = isProblemLoading || (!!submissionId && isSubmissionLoading);
  const isError = problemError || (!!submissionId && submissionError) || !problem;

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <span className="text-lg font-semibold text-muted-foreground animate-pulse">
            Carregando desafio...
          </span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center bg-background text-center p-6">
        <h2 className="text-2xl font-bold text-destructive mb-2">
          Erro ao carregar desafio
        </h2>
        <p className="text-muted-foreground mb-4">
          Verifique se o backend está ativo ou se o ID é válido.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-background">
      <div className="absolute z-10">
        {/* DEBUG */}
        {/* {JSON.stringify({
          nodes,
          edges,
        })} */}
      </div>
      <div className="animate-in slide-in-from-left duration-500 ease-out h-full">
        <SidebarLeft
          challenge={challenge}
          isValidating={validationMutation.isPending}
          onValidate={handleValidate}
        />
      </div>
      <main className="flex-1 relative overflow-hidden animate-in fade-in zoom-in-95 duration-700 delay-100 fill-mode-both h-full">
        <DiagramEditor />
      </main>
      <div className="animate-in slide-in-from-right duration-500 ease-out h-full">
        <SidebarRight
          feedback={feedback}
          isValidating={validationMutation.isPending}
          validationError={validationError}
        />
      </div>
    </div>
  );
}
