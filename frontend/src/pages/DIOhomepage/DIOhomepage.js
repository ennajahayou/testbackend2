import { useState, useContext } from "react";

import Sidebar from "../../Components/Sidebar";
import ExecutionInProgress from "./ExecutionCard/ExecutionInProgress";
import ExecutionInReview from "./ExecutionCard/ExecutionInReview";
import ExecutionNotAssigned from "./ExecutionCard/ExecutionNotAssigned";
import SubmitionPopUp from "./PopUp/SubmitionPopUp";
import ExecutionMessaging from "./ExecutionMessaging";
import ExecutionAttribution from "./ExecutionAttribution";
import WorkDonePopUp from "./PopUp/WorkDonePopUp";
import AttributionPopUp from "./PopUp/AttributionPopUp";
import ExecutionCreation from "./ExecutionCreation";
import SelfReview from "./SelfReview";

import "./DIOhomepage.css";

import { TasksContext } from "../TasksContext";

import logo5 from "../../images/logo5.png";

const DIOhomepage = () => {
  // const dioId = 1; //TODO : add real DIO id

  const { dioTasks } = useContext(TasksContext);
  const { propositions } = useContext(TasksContext);
  const { prop } = useContext(TasksContext);

  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpWorkDone, setShowPopUpWorkDone] = useState(false);
  const [showPopUpAttribution, setShowPopUpAttribution] = useState(false);
  const [createExecutionText, setCreateExecutionText] = useState("");
  // const [executions, setExecutions] = useState([]);
  const [executionId, setExecutionId] = useState(0);
  const [isAttributingExecution, setIsAttributingExecution] = useState(false);
  const [isCreatingExecution, setIsCreatingExecution] = useState(false);
  const [
    creationExecutionWorkAlreadyDone,
    setCreationExecutionWorkAlreadyDone,
  ] = useState(false);

  const feed = dioTasks.map((execution) => {
    switch (execution.status_) {
      case "Not assigned":
        return (
          <ExecutionNotAssigned
            id={execution.id}
            description={execution.exec_description}
            talent={execution.talent_name}
            setExecutionId={setExecutionId}
            setShowPopUpAttribution={setShowPopUpAttribution}
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
      default:
        return <></>;
    }
  });

  return (
    <div className="App">
      <Sidebar />
      {isAttributingExecution ? (
        <ExecutionAttribution
          executionId={executionId}
          setIsAttributingExecution={setIsAttributingExecution}
        />
      ) : isCreatingExecution ? (
        <ExecutionCreation
          executionDescription={createExecutionText}
          setIsCreatingExecution={setIsCreatingExecution}
        />
      ) : creationExecutionWorkAlreadyDone ? (
        <SelfReview
          executionDescription={createExecutionText}
          setShowEvaluation={setCreationExecutionWorkAlreadyDone}
          executionId={executionId}
        />
      ) : (
        <div className="main-content">
          <div className="logo-bar">
            <h1>DIO 1</h1>
            <h1 className="thanks">
              0 <img className="symbole" src={logo5} />
            </h1>
          </div>

          {/* Messaging */}
          <div className="messaging-container">
            <div className="scroll">
              <div className="messages">{feed}</div>
            </div>

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
              setShowPopUpWorkDone={setShowPopUpWorkDone}
            />
          )}
          {showPopUpWorkDone && (
            <WorkDonePopUp
              setShowPopUpWorkDone={setShowPopUpWorkDone}
              setIsCreatingExecution={setIsCreatingExecution}
              setSelfReview={setCreationExecutionWorkAlreadyDone}
              setExecutionId={setExecutionId}
            />
          )}
          {showPopUpAttribution && (
            <AttributionPopUp
              setIsAttributingExecution={setIsAttributingExecution}
              setShowPopUpAttribution={setShowPopUpAttribution}
              setSelfReview={setCreationExecutionWorkAlreadyDone}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DIOhomepage;
