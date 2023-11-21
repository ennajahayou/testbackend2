import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";


import logo from '../images/logo.png';
import archiver from '../images/icones/archiver.png';
import idee from '../images/icones/idee.png';
import message from '../images/icones/message.png';
import poignee from '../images/icones/poignee-de-main.png';
import star from '../images/icones/star.png';
import story from '../images/icones/story-board.png';


const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar-section-image">
    <img className="image" src={logo} alt="Logo"  />
    </div>
    <button className="sidebar-section">
      <Link to="/DIO">
       <img src={message} />My feed
       </Link>
    </button>
    <button className="sidebar-section">  
       <Link to="/CEOProfil">
       <img src={star}  />CEO Profile        
       </Link>
    </button>
    <button className="sidebar-section">
       <Link to="/ExecutionBoard">
       <img src={story}  />Work Board
       </Link>
    </button>
    <button className="sidebar-section">
        <img src={idee}  />Push an idea
    </button>
    <button className="sidebar-section">
        <img src={poignee}  />Co-opt talent
    </button>
    <button className="sidebar-section">
       <Link to="/Archives">
        <img src={archiver}  />DIO feed
        </Link>
    </button>
    <div className="sidebar-section espace"></div>
    <button className="sidebar-section">DIO settings</button>
  </div>
);

export default Sidebar;
