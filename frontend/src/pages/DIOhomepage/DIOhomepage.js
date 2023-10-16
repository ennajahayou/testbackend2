import { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import ExecutionInProgress from "./ExecutionInProgress";
import ExecutionInReview from "./ExecutionInReview";
import ExecutionNotAssigned from "./ExecutionNotAssigned";
import SubmitionPopUp from "./SubmitionPopUp";
import ExecutionMessaging from "./ExecutionMessaging";
import "./DIOhomepage.css";

const DIOhomepage = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [createExecutionText, setCreateExecutionText] = useState("");

  const executionsList = [
    {
      id: 1,
      exec_description: "Execution 1",
      talent_name: "Paul Lacroix",
      status_: "Not assigned",
    },
    {
      id: 2,
      exec_description: "Execution 2",
      talent_name: "Mohamed El Kout",
      deadline: "20/10/23",
      status_: "In progress",
    },
    {
      id: 3,
      exec_description: "Execution 3",
      talent_name: "Ousmane Diene",
      status_: "In review",
    },
  ];

  const feed = executionsList.map((execution) => {
    switch (execution.status_) {
      case "Not assigned":
        return (
          <ExecutionNotAssigned
            id={execution.id}
            description={execution.exec_description}
            talent={execution.talent_name}
          />
        );
      case "In progress":
        return (
          <ExecutionInProgress
            id={execution.id}
            description={execution.exec_description}
            talent={execution.talent_name}
            deadline={execution.deadline}
          />
        );
      case "In review":
        return (
          <ExecutionInReview
            id={execution.id}
            description={execution.exec_description}
            talent={execution.talent_name}
          />
        );
    }
  });

  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <div className="logo-bar">
          <h1 className="logo">DIO 1</h1>
        </div>

        {/* Messaging */}
        <div className="messaging-container">
          <div className="messages">{feed}</div>
          {/* <div className="messaging-container">
          <div className="messages">{feed}</div>
          <div className="input-container">
            <div className="input-submit">
              <input
                type="text"
                placeholder="Describe what we should do..."
                className="message-input"
                value={createExecutionText}
                onChange={(e) => {
                  setCreateExecutionText(e.target.value);
                }}
              />
              <button
                type="submit"
                className="send-button"
                onClick={() => setShowPopUp(true)}
              >
                Make it happen
              </button>
            </div>
          </div>
        </div> */}
          <ExecutionMessaging
            createExecutionText={createExecutionText}
            setCreateExecutionText={setCreateExecutionText}
            setShowPopUp={setShowPopUp}
          />
        </div>
        {/* Fin Messaging */}
        {showPopUp && (
          <SubmitionPopUp
            executionDescription={createExecutionText}
            dioId="1"
            setShowPopUp={setShowPopUp}
          />
        )}
      </div>
    </div>
  );
};

export default DIOhomepage;
