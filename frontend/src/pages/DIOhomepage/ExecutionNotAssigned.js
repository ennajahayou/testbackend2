import React from "react";
import { Link } from "react-router-dom";
import "./DIOhomepage.css";

const ExecutionNotAssigned = ({ id, description, talent }) => {
  return (
    <div className="message bubble">
      <div>New Action</div>
      {description}
      <Link to="/ExecutionAttribution">
        <button class="message button">I want to do it</button>
      </Link>
    </div>
  );
};

export default ExecutionNotAssigned;
