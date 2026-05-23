import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useEditorStore } from '../useEditorStore';
import { Box, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type SystemNode } from '../types';
import { NODE_CONFIGS } from '../nodeConfig';

export function SystemNode({ id, data, selected }: NodeProps<SystemNode>) {
  const config = NODE_CONFIGS[data.type];
  const Icon = config?.icon || Box;
  const colorClass = config?.colorClass || 'bg-background border-border';
  const deleteNode = useEditorStore((state) => state.deleteNode);
  const updateNodeData = useEditorStore((state) => state.updateNodeData);

  const onDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(id);
  };

  return (
    <div className={cn(
      "group min-w-[180px] bg-card/90 text-card-foreground relative rounded-xl border-2 backdrop-blur-sm transition-all duration-200 shadow-sm",
      colorClass,
      selected && "ring-4 ring-primary/20 border-primary shadow-lg scale-[1.02]"
    )}>
      {/* Floating delete button */}
      <button
        className="nodrag nopan absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center shadow-md hover:bg-destructive hover:text-white transition-all cursor-pointer z-50 text-muted-foreground opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-110 duration-150"
        onClick={onDelete}
        title="Excluir nó"
      >
        <X className="w-3 h-3" />
      </button>

      {/* Handles with unique IDs to allow specific connection points */}
      <Handle 
        id="top"
        type="source" 
        position={Position.Top} 
        className="w-3 h-3 !bg-primary/50 border-2 border-background hover:!bg-primary transition-colors" 
      />
      <Handle 
        id="bottom"
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 !bg-primary/50 border-2 border-background hover:!bg-primary transition-colors" 
      />
      <Handle 
        id="left"
        type="source" 
        position={Position.Left} 
        className="w-3 h-3 !bg-primary/50 border-2 border-background hover:!bg-primary transition-colors" 
      />
      <Handle 
        id="right"
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 !bg-primary/50 border-2 border-background hover:!bg-primary transition-colors" 
      />

      {/* Header */}
      <div className="px-3 py-2 border-b border-inherit/20 flex items-center gap-2 bg-inherit/10 rounded-t-[10px]">
        <Icon className="w-4 h-4 opacity-70" />
        <span className="text-[10px] uppercase tracking-wider font-extrabold opacity-60">
          {data.type.replace('_', ' ')}
        </span>
      </div>

      {/* Content */}
      <div className="p-3">
        {config?.isTextArea ? (
          <textarea
            value={data.description || ''}
            onChange={(e) => updateNodeData(id, { description: e.target.value })}
            className="nodrag nopan w-full min-h-[44px] bg-transparent border-0 p-0 text-sm font-semibold leading-tight focus:ring-0 focus:outline-none placeholder:text-muted-foreground/40 text-inherit overflow-hidden"
            placeholder="(Optional) Tool name, api routes, function, etc..."
          />
        ) : (
          <h4 className="text-sm font-semibold leading-tight">{data.label}</h4>
        )}
      </div>
    </div>
  );
}
