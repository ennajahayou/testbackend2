import React from "react";
import { Link } from "react-router-dom";
import "./Sidebarhomepage.css";
import logo from "../images/logo.png";
const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar-section">
    <img className="image" src={logo} alt="Logo"  />
    </div>
    <button className="sidebar-section">My DIOs</button>
    <button className="sidebar-section">Create a new DIO</button>
    <button className="sidebar-section">Discover DIOs</button>

    <div className="sidebar-section espace"></div>

    <button className="sidebar-section">Invite New Member</button>
    <div className="sidebar-section espace"></div>
    <button className="sidebar-section">
      <Link to="/login">My profile : {localStorage.getItem("userName")}</Link>
    </button>
  </div>
);

export default Sidebar;
