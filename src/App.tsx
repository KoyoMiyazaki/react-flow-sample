import { useCallback, useState } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Handle,
  Position,
  type Connection,
  type Edge,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

function CustomNode({ data }: NodeProps) {
  return (
    <div
      style={{
        padding: "10px 16px",
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: 6,
      }}
    >
      <Handle type="target" position={Position.Left} />
      {String(data.label)}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const nodeTypes = { custom: CustomNode };

const initialNodes = [
  {
    id: "node-1",
    type: "custom",
    position: { x: 100, y: 150 },
    data: { label: "Node A" },
  },
  {
    id: "node-2",
    type: "custom",
    position: { x: 350, y: 50 },
    data: { label: "Node B" },
  },
  {
    id: "node-3",
    type: "custom",
    position: { x: 350, y: 250 },
    data: { label: "Node C" },
  },
];

const initialEdges: Edge[] = [];

export default function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges],
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
