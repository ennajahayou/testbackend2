import React from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import DIOList from "./Components/DIOList";

const dioData = [
  {
    name: "DIO 1",
    description:
      "Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description  ",
  },
  { name: "DIO 2", description: "Description de DIO 2" },
];

const App = () => (
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

export default App;
