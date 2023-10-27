import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => (
  <div className="sidebar">
    <button className="sidebar-section">Work Space</button>
    <button className="sidebar-section">My DIOs</button>
    <button className="sidebar-section">Create a new DIO</button>
    <button className="sidebar-section">Discover DIOs</button>

    <div className="sidebar-section espace"></div>

    <button className="sidebar-section">Invite New Member</button>
    <div className="sidebar-section espace"></div>
    <button className="sidebar-section">
      My profile : {localStorage.getItem("userName")}
    </button>
  </div>
);

export default Sidebar;
