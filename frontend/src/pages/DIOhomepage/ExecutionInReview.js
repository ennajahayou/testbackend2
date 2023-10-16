import React from "react";
import "./DIOhomepage.css";

const ExecutionInReview = ({ id, description, talent }) => {
  return (
    <div className="message bubble">
      <div>{description}</div>
      {talent} has finished the task.
      <button class="message button">Make a review</button>
    </div>
  );
};

export default ExecutionInReview;
