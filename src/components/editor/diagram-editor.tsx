import { useCallback, useRef } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap, 
  ReactFlowProvider,
  useReactFlow,
  ConnectionMode
} from '@xyflow/react';

import { useEditorStore } from './useEditorStore';
import { SystemNode } from './nodes/system-node';
import { CustomEdge } from './edges/custom-edge';
import { NodeToolbar } from './node-toolbar';
import { type SystemNodeType } from './types';
import { NODE_CONFIGS } from './nodeConfig';

const nodeTypes = {
  client: SystemNode,
  mobile_client: SystemNode,
  web_client: SystemNode,
  load_balancer: SystemNode,
  api_server: SystemNode,
  websocket_server: SystemNode,
  worker: SystemNode,
  queue: SystemNode,
  cache: SystemNode,
  sql_database: SystemNode,
  nosql_database: SystemNode,
  object_storage: SystemNode,
  cdn: SystemNode,
  search_engine: SystemNode,
  notification_service: SystemNode,
  auth_service: SystemNode,
  analytics_service: SystemNode,
  rate_limiter: SystemNode,
  dns: SystemNode,
  api_gateway: SystemNode,
  message_broker: SystemNode,
  scheduler: SystemNode,
  monitoring_service: SystemNode,
  logging_service: SystemNode,
  third_party_api: SystemNode,
  lambda_function: SystemNode,
};

const edgeTypes = {
  directional: CustomEdge,
  bidirectional: CustomEdge,
};

function FlowInner() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect,
    addNode 
  } = useEditorStore();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as SystemNodeType;

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { 
          label: NODE_CONFIGS[type]?.label || type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          type 
        },
      };

      addNode(newNode);
    },
    [screenToFlowPosition, addNode]
  );

  return (
    <div className="flex-1 relative h-full bg-slate-50/50 dark:bg-slate-950/50" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
        className="system-design-flow"
      >
        <Background gap={20} size={1} />
        <Controls position="bottom-right" className="bg-background border rounded-lg overflow-hidden shadow-xl" />
        <MiniMap 
          className="bg-background border rounded-lg overflow-hidden shadow-xl"
          nodeStrokeWidth={3}
          zoomable
          pannable
        />
        <NodeToolbar />
      </ReactFlow>
    </div>
  );
}

export function DiagramEditor() {
  return (
    <ReactFlowProvider>
      <FlowInner />
    </ReactFlowProvider>
  );
}
