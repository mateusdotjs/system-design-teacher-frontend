import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type NodeChange,
  type EdgeChange,
  type Connection,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  MarkerType
} from '@xyflow/react';
import { type SystemNode, type SystemEdge, type EdgeType, type SystemEdgeData } from './types';

interface EditorState {
  nodes: SystemNode[];
  edges: SystemEdge[];
  selectedEdgeType: EdgeType;

  // Actions
  onNodesChange: OnNodesChange<SystemNode>;
  onEdgesChange: OnEdgesChange<SystemEdge>;
  onConnect: OnConnect;
  setSelectedEdgeType: (type: EdgeType) => void;
  setNodes: (nodes: SystemNode[]) => void;
  setEdges: (edges: SystemEdge[]) => void;
  addNode: (node: SystemNode) => void;
  deleteNode: (nodeId: string) => void;
  updateNodeData: (nodeId: string, data: Partial<SystemNode['data']>) => void;
  updateEdgeData: (edgeId: string, data: Partial<SystemEdgeData>) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedEdgeType: 'directional',

  onNodesChange: (changes: NodeChange<SystemNode>[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes: EdgeChange<SystemEdge>[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection: Connection) => {
    const type = get().selectedEdgeType;
    const newEdge: SystemEdge = {
      ...connection,
      id: `edge-${connection.source}-${connection.target}-${Date.now()}`,
      type,
      data: { label: '' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      markerStart: type === 'bidirectional' ? {
        type: MarkerType.ArrowClosed,
        orient: 'auto-start-reverse',
      } : undefined,
    };
    
    set({
      edges: addEdge(newEdge, get().edges),
    });
  },

  setSelectedEdgeType: (type) => set({ selectedEdgeType: type }),


  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  addNode: (node) => set({
    nodes: [...get().nodes, node]
  }),

  deleteNode: (nodeId) => set({
    nodes: get().nodes.filter((node) => node.id !== nodeId),
    edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
  }),

  updateNodeData: (nodeId, data) => set({
    nodes: get().nodes.map((node) => 
      node.id === nodeId 
        ? { ...node, data: { ...node.data, ...data } } 
        : node
    ),
  }),

  updateEdgeData: (edgeId, data) => set({
    edges: get().edges.map((edge) =>
      edge.id === edgeId
        ? { ...edge, data: { ...edge.data, ...data } }
        : edge
    ),
  }),
}));
