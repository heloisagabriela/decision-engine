import React from "react";
import "./App.css";
import Flowchart from "./components/flow/flow";
import Navbar from "./components/navbar/navbar.component";


function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="app">
        <div className="left-section">Any other tool</div>
        <div className="right-section">
          <Flowchart />
        </div>
      </div>
    </div>
  );
}

export default App;
