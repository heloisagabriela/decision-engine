import { createContext, useState, useEffect } from "react";

export const FlowContext = createContext({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  setNodes: () => {},
  setEdges: () => {},
  saveChanges: () => {},
  findNodeById: () => {},
  nodeUpdateLabel: () => {},
  setSelectedNodeId: () => {},
});

// Function to update policy data in the backend
const updatePolicy = (dados) => {
  const url = "http://localhost/endpoint";
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Erro ao atualizar os dados: ${response.status} - ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("Dados atualizados com sucesso:", data);
    })
    .catch((error) => {
      console.error("Ocorreu um erro ao atualizar os dados:", error);
    });
};
// Flow provider component
export const FlowProviderContext = ({ children }) => {
  const [nodes, setNodes] = useState([
    {
      id: "1",
      type: "input",
      data: { label: "Start" },
      position: { x: 335, y: -92 },

      markerStart: "EdgeMarkerType",
    },
    {
      id: "2",
      type: "default",
      data: { label: "age > 18" },
      position: { x: 330, y: -3.94 },
      markerStart: "EdgeMarkerType",
    },
    {
      id: "3",
      type: "default",
      data: { label: "decisition = false" },
      position: { x: 443, y: 85 },
      markerStart: "EdgeMarkerType",
    },
    {
      id: "4",
      type: "default",
      data: { label: "incoming > 1000" },
      position: { x: 250, y: 87 },

      markerStart: "EdgeMarkerType",
    },
    {
      id: "5",
      type: "default",
      data: { label: "decisition = false" },
      position: { x: 374, y: 206 },
      markerStart: "EdgeMarkerType",
    },
    {
      id: "6",
      type: "output",
      data: { label: "decisition = true" },
      position: { x: 194, y: 207 },
      markerStart: "EdgeMarkerType",
    },
  ]);
  const [edges, setEdges] = useState([
    { id: "1-2", source: "1", target: "2" },
    { id: "2-4", source: "2", target: "4", label: "yes" },
    { id: "2-3", source: "2", target: "3", label: "no" },
    { id: "4-6", source: "4", target: "6", label: "yes" },
    { id: "4-5", source: "4", target: "5", label: "no" },
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState(1);

  // Function to get edges for a given source node
  const getEdges = (sourceId) => {
    const result = [];

    edges.forEach((edge) => {
      if (edge.source == sourceId) result.push(edge);
    });

    return result;
  };

  // Function to find a node by its ID
  const findNode = (nodeId) => {
    return nodes?.find((node) => node.id === nodeId);
  };

  // Function to generate a policy based on the graph structure
  function generatePolicy() {
    var obj = {};

    nodes.forEach((node) => {
      const edgesArray = getEdges(node.id);

      edgesArray.forEach((edge) => {
        if (
          (edge.label == "yes") &
          (findNode(edge.target).data.label != "decision = false")
        ) {
          const properties = node.data.label.split(" ");

          obj = {
            ...obj,
            [node.id]: {
              variable: properties[0],
              operator: properties[1],
              value: properties[2],
            },
          };
        }
      });
    });
    console.log(obj);
    return obj;
  }

  // Function to save changes
  const saveChanges = () => {
    //updatePolicy(generatePolicy());
    console.log(generatePolicy());
  };

  // Function to find a node by ID
  const findNodeById = (nodeId) => {
    return findNode(nodeId);
  };
  // Function to update a node's label
  const nodeUpdateLabel = (id, event) => {
    const { name, value } = event.target;
    const newLabel = { [name]: value };
    var newNode = findNodeById(id);
    newNode = { ...newNode, data: newLabel };
    console.log(newNode);

    const newArray = () => {
      var newNodesArray = [];
      nodes.forEach((nds) => {
        if (nds.id === id) {
          newNodesArray.push({ ...nds, data: newLabel });
        } else {
          newNodesArray.push(nds);
        }
        //console.log(newNodesArray);
      });
      return newNodesArray;
    };

    setNodes(newArray());
  };

  // Define the context value
  const value = {
    nodes,
    edges,
    setNodes,
    setEdges,
    saveChanges,
    findNodeById,
    nodeUpdateLabel,
    selectedNodeId,
    setSelectedNodeId,
  };

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
};

//buscar dados iniciais na API
