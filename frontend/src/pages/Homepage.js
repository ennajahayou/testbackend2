import React from "react";
import "./Homepage.css";
import Sidebar from "../Components/Sidebar";
import DIOList from "../Components/DIOList";

const dioData = [
  {
    id: 1,
    name: "DIO 1",
    description:
      "Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description  ",
  },
  { id: 2, name: "DIO 2", description: "Description de DIO 2" },
];

const Homepage = () => (
  <div className="App">
    <Sidebar />
    <div className="main-content">
      <div className="logo-bar">
        <h1 className="logo">THANKS AND TIP</h1>
      </div>
      <h4 className="titre">My DIO</h4>
      <DIOList dioData={dioData} />
    </div>
  </div>
);

export default Homepage;
