import { type Node, type Edge } from '@xyflow/react';

export type SystemNodeType =
  | 'mobile_client'
  | 'web_client'
  | 'load_balancer'
  | 'api_server'
  | 'websocket_server'
  | 'worker'
  | 'queue'
  | 'cache'
  | 'sql_database'
  | 'nosql_database'
  | 'object_storage'
  | 'cdn'
  | 'search_engine'
  | 'notification_service'
  | 'auth_service'
  | 'analytics_service'
  | 'rate_limiter'
  | 'dns'
  | 'api_gateway'
  | 'message_broker'
  | 'scheduler'
  | 'monitoring_service'
  | 'logging_service'
  | 'third_party_api'
  | 'lambda_function';

export interface SystemNodeData extends Record<string, unknown> {
  label: string;
  type: SystemNodeType;
  description?: string;
}

export type SystemNode = Node<SystemNodeData>;

export type EdgeType = 'directional' | 'bidirectional';

export interface SystemEdgeData extends Record<string, unknown> {
  label?: string;
}

export type SystemEdge = Edge<SystemEdgeData>;

export interface Challenge {
  id: string;
  title: string;
  description: string;
  functionalRequirements: string[];
  nonFunctionalRequirements: string[];
}

export interface Feedback {
  positive_feedbacks: string[];
  negative_feedbacks: string[];
}
