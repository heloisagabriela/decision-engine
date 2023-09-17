import { useCallback, useState, useRef, useContext, useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  ReactFlowProvider,
  updateEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import "../flowSideBar/flowSideBar.component.css";

import Sidebar from "../flowSideBar/flowSideBar.component.jsx";
import { FlowContext } from "../../context/flow.contex";


/**
 * Flow component for displaying and managing a flow diagram.
 */
function Flow() {
  // Accessing context for flow-related data
  const { nodes, edges, setEdges, setNodes, setSelectedNodeId } =
    useContext(FlowContext);

  // A ref to track whether edge updates were successful
  const edgeUpdateSuccessful = useRef(true);

  // A ref to access the ReactFlow wrapper element
  const reactFlowWrapper = useRef(null);

  // State to manage nodes for the ReactFlow component
  const [nodesFlow, setNodesFlow] = useState(nodes);

  // Callback to handle changes to nodes
  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => {
      setSelectedNodeId(changes[0].id);
      return applyNodeChanges(changes, nds);
    });
  }, []);

  // Callback to handle changes to edges
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Callback to handle node connections
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Callback to handle the start of edge updates
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  // Callback to handle edge updates
  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  // Callback to handle the end of edge updates
  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            onConnect={onConnect}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
}

export default Flow;
