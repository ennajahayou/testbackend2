import React from "react";
import "./DIOhomepage.css";

const ExecutionInProgress = ({ id, description, talent, deadline }) => {
  return (
    <div className="message bubble">
      <div>{description}</div>
      {talent} is doing the task for the {deadline}.
    </div>
  );
};

export default ExecutionInProgress;
