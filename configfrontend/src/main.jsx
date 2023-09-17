import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { FlowProviderContext } from "./context/flow.contex.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FlowProviderContext>
      <App />
    </FlowProviderContext>
  </React.StrictMode>
);
