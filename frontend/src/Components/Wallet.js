import React from "react";
import { Link } from "react-router-dom";
import "./Wallet.css";


const Wallet = ({ dioData }) => (
  <div className="wallet-list">
      <div  className="wallet-item">
          <h4> Value of my tip  </h4>
          <h4> Total Thanks</h4>
          <h4> Next revenu</h4>
      </div>
      <div className="row-container">
              <div className="row-item">1 429 690€ </div>
              <div className="row-item">168 593</div>
              <div className="row-item">8 200€</div>
          </div>
  </div>
  
);

export default Wallet;