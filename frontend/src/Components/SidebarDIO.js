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
       <img src={message} />My feed
    </button>
    <button className="sidebar-section">
       <img src={star}  />CEO Profile
    </button>
    <button className="sidebar-section">
       <img src={story}  />Work Board
    </button>
    <button className="sidebar-section">
        <img src={idee}  />Push an idea
    </button>
    <button className="sidebar-section">
        <img src={poignee}  />Co-opt talent
    </button>
    <button className="sidebar-section">
        <img src={archiver}  />DIO feed
    </button>
    <div className="sidebar-section espace"></div>
    <button className="sidebar-section">DIO settings</button>
  </div>
);

export default Sidebar;
