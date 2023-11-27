import axios from "axios";
import { useState, useContext } from "react";
import "../DIOhomepage.css";

const SubmitionPopUp = ({

}) => {
  // TODO: add real information in jsonData




  return (
    <div className="submition-pop-up-work-ceo">
    <h2>My work</h2>
    <div>
    <span class="circle"></span>
    <span class="circle"></span>
    <input
      className="evaluation-textarea"
      placeholder="Commentaire..."
    />
    </div>
    <div className="container-button-ceo">
    <button
      className="button1"
    >     
      Not yet
    </button>
    <button
      className="button2"
    >     
      Close
    </button>
    <button
      className="button3"
    >     
      Evaluate it
    </button>
    </div>
    </div>
  );
};

export default SubmitionPopUp;
