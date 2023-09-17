import React from 'react';
import { useContext } from 'react';
import { FlowContext } from '../../context/flow.contex';
import './navbar.component.css';


/**
 * Navbar component for the flow editor.
 * Provides options like saving changes.
 */
function Navbar() {
  // Accessing the saveChanges function from the FlowContext
  const { saveChanges } = useContext(FlowContext);

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {/* Trigger the saveChanges function when clicked */}
        <li className="nav-item" onClick={saveChanges}>
          Save Changes
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
