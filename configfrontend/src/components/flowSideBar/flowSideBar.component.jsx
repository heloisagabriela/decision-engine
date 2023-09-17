import React, { useContext, useEffect, useState } from "react";
import "./flowSideBar.component.css";
import { TextField } from "@mui/material";
import { FlowContext } from "../../context/flow.contex";

/**
 * Sidebar component for a flow editor.
 * It supose to allows users to drag and drop nodes and edit node properties.
 */
export default () => {
  /**
   * Handles the drag start event for a node.
   * @param {Event} event - The drag start event.
   * @param {string} nodeType - The type of the node being dragged.
   */
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // Accessing context for flow-related data
  const { findNodeById, nodeUpdateLabel, selectedNodeId, nodes } =
    useContext(FlowContext);

  // State to track the selected node
  const [node, setNode] = useState(findNodeById(selectedNodeId));

  // Update the selected node when the selectedNodeId or nodes change
  useEffect(() => {
    setNode(findNodeById(selectedNodeId));
  }, [selectedNodeId, nodes]);

  return (
    <aside>
      <div className="description">Disabled sidebar.</div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "rectangle")}
      >
        rectangle
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default")}
      >
        Default Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output")}
      >
        Output Node
      </div>
      <div>
        <p>Node properties</p>
        {node && (
          <div>
            <TextField
              id="node-id"
              name="id"
              label="Node ID"
              variant="standard"
              disabled
              value={node.id}
            />
            <TextField
              id="node-label"
              name="Label"
              label="Node Label"
              variant="standard"
              value={node.data.label}
              helperText="Please use spaces to separate the logic (e.g., variable operator value)."
              disabled
              onChange={(event) => {
                nodeUpdateLabel(node.id, event);
              }}
            />
          </div>
        )}
      </div>
    </aside>
  );
};
