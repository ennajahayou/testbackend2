import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => (
  <div className="sidebar">
    <button className="sidebar-section">LOGO</button>
    <button className="sidebar-section">
      <Link to="/">My DIO</Link>
    </button>
    <button className="sidebar-section">
      <Link to="/CEOProfil">CEO Profil</Link>
    </button>
    <button className="sidebar-section">
      <Link to="/ExecutionBoard">Execution Board</Link>
    </button>
    <button className="sidebar-section">
      <Link to="/Archives">Archives</Link>
    </button>
    <div className="sidebar-section espace"></div>
    <button className="sidebar-section">Settings</button>
  </div>
);

export default Sidebar;
