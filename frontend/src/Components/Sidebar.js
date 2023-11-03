import React from "react";
import { Link } from "react-router-dom";
import CEONotification from "./CEONotification";
import "./Sidebar.css";

import logo from '../images/logo.png';


const Sidebar = () => (
  <div className="sidebar">
    <img className="sidebar-section" src={logo}/>
    <button className="sidebar-section">
      <Link to="/">My DIO</Link>
    </button>

    <button className="sidebar-section">
      <Link to="/CEOProfil">
        CEO Profil <span style={{ color: "#DDE11D" }}>★</span>
      </Link>
    </button>

    <button className="sidebar-section">
      <Link to="/ExecutionBoard">Execution Board</Link>
    </button>
    <button className="sidebar-section">
      <Link to="/Archives">Archives</Link>
    </button>
   <button className="sidebar-section">
      <Link to="/UserDetails">User Details</Link>
    </button>
    <div className="sidebar-section espace"></div>
    <button className="sidebar-section">Settings</button>
  </div>
);

export default Sidebar;
