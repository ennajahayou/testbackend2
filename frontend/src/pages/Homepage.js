import React from "react";
import "./Homepage.css";
import Sidebar from "../Components/Sidebarhomepage";
import DIOList from "../Components/DIOList";

import logo3 from '../images/logo3.png';


const dioData = [
  {
    id: 1,
    name: "Dio Thanks and tip",
    description:
      "Creation of the start up Thanks and tip : website creation/ application",
  },
];

const Homepage = () => (
  <div className="App">
    <Sidebar />
    <div className="main-content">
      <div className="logo-bar">


  
      <img className="logo" src={logo3}/>

      </div>
      <h4 className="titre">My DIO</h4>
      <DIOList dioData={dioData} />
    </div>
  </div>
);

export default Homepage;
