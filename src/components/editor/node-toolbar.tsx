import { type SystemNodeType } from "./types";
import { Box, ArrowRight, ArrowLeftRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NODE_CATEGORIES } from "./nodeConfig";
import { useEditorStore } from "./useEditorStore";

export function NodeToolbar() {
  const { selectedEdgeType, setSelectedEdgeType } = useEditorStore();
  const onDragStart = (event: React.DragEvent, nodeType: SystemNodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="absolute left-4 top-4 bottom-4 w-[116px] bg-background/85 backdrop-blur-md border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
      <div className="p-3 border-b flex flex-col items-center justify-center gap-1 shrink-0 bg-muted/20">
        <Box className="w-5 h-5 text-primary" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/80 select-none">
          Toolbar
        </span>
      </div>

      <div className="p-2 border-b bg-muted/10 shrink-0">
        <div className="bg-muted/50 rounded-lg p-1 flex gap-1">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setSelectedEdgeType('directional')}
                  className={`flex-1 flex justify-center py-1.5 rounded-md transition-colors ${
                    selectedEdgeType === 'directional' 
                      ? 'bg-background shadow-sm text-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
                  }`}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Directional Edge</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setSelectedEdgeType('bidirectional')}
                  className={`flex-1 flex justify-center py-1.5 rounded-md transition-colors ${
                    selectedEdgeType === 'bidirectional' 
                      ? 'bg-background shadow-sm text-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
                  }`}
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Bidirectional Edge</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full w-full">
          <div className="p-2 space-y-4 flex flex-col items-center">
            <TooltipProvider delayDuration={0}>
              {NODE_CATEGORIES.map((category, catIdx) => (
                <div
                  key={category.title}
                  className="space-y-2 flex flex-col items-center w-full"
                >
                  {catIdx > 0 && (
                    <div className="h-px bg-border w-full my-1 opacity-50" />
                  )}
                  <span className="text-[9px] font-bold tracking-wider text-muted-foreground/60 uppercase text-center w-full px-1 py-0.5 select-none bg-muted/40 rounded-sm">
                    {category.title}
                  </span>
                  <div className="space-y-1.5 w-full flex flex-col items-center">
                    {category.nodes.map((node) => (
                      <Tooltip key={node.type}>
                        <TooltipTrigger asChild>
                          <div
                            className="w-24 h-[78px] rounded-xl border border-muted bg-card hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-center gap-1.5 cursor-grab active:cursor-grabbing transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group shrink-0 p-1.5 text-center select-none shadow-sm hover:shadow-md"
                            onDragStart={(event) =>
                              onDragStart(event, node.type)
                            }
                            draggable
                          >
                            <node.icon className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all text-primary shrink-0" />
                            <span className="text-[10px] font-semibold leading-tight text-muted-foreground group-hover:text-foreground line-clamp-2 max-w-full px-0.5">
                              {node.label}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="font-semibold">
                          {node.label}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              ))}
            </TooltipProvider>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
