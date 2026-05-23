import { useState } from 'react';
import {
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
  useReactFlow,
} from '@xyflow/react';
import { X } from 'lucide-react';
import { useEditorStore } from '../useEditorStore';
import { type SystemEdge } from '../types';

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  markerStart,
  data,
}: EdgeProps<SystemEdge>) {
  const { setEdges } = useReactFlow();
  const { updateEdgeData } = useEditorStore();
  const [isHovered, setIsHovered] = useState(false);
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <>
      {/* Visible Path */}
      <path
        id={id}
        style={style}
        className="react-flow__edge-path transition-all duration-150"
        d={edgePath}
        markerEnd={markerEnd}
        markerStart={markerStart}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      
      {/* Thicker Invisible Path for easier Hover interaction */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={24}
        style={{ cursor: 'pointer' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all', // Always allow interacting with label
            zIndex: 10,
          }}
          className="nodrag nopan flex flex-col items-center gap-1"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Delete Button - Appears on Hover */}
          <button
            className={`w-5 h-5 bg-background border border-border rounded-full flex items-center justify-center shadow-md hover:bg-destructive hover:text-white transition-all cursor-pointer text-muted-foreground scale-95 hover:scale-110 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onEdgeClick}
          >
            <X className="w-3 h-3" />
          </button>

          {/* Editable Label */}
          <input
            value={data?.label || ''}
            onChange={(e) => updateEdgeData(id, { label: e.target.value })}
            placeholder="Label..."
            className={`text-xs font-medium text-center bg-transparent border border-transparent hover:border-border hover:bg-background/80 focus:border-primary focus:bg-background rounded px-1.5 py-0.5 outline-none transition-all w-24 placeholder:text-transparent hover:placeholder:text-muted-foreground focus:placeholder:text-muted-foreground ${data?.label ? 'bg-background/50 backdrop-blur-sm shadow-sm' : ''}`}
          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
