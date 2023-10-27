import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";


import logo from '../images/logo.png';

const Sidebar = () => (
  <div className="sidebar">
    <img className="sidebar-section" src={logo}/>
    <button className="sidebar-section">
      My feed
    </button>
    <button className="sidebar-section">
      Execution Board
    </button>
    <button className="sidebar-section">
      Push an idea
    </button>
    <button className="sidebar-section">
      Co-opt talent
    </button>
    <button className="sidebar-section">
      DIO feed
    </button>
    <div className="sidebar-section espace"></div>
    <button className="sidebar-section">DIO settings</button>
  </div>
);

export default Sidebar;
