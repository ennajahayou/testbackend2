import React, { useState, useEffect } from "react";
import "./ExecutionBoard.css";
// import Sidebar from "../../../Components/Sidebar";
import Sidebar from "../../Components/Sidebar";
import PeerReview from "./PeerReview";
import SelfReview from "./SelfReview";
import axios from "axios";
import ExecutionCards from "./ExecutionCards";

import logo5 from "../../images/logo5.png";

// const Myexecution = [
//   "Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X ",
//   "Tester le composant Y",
//   // ... ajoutez d'autres tâches ici
// ];

// const DIOexecution = [
//   "Créer la maquette de la page d’accueil",
//   "Implémenter le routage",
//   // ... ajoutez d'autres tâches terminées ici
// ];

const ExecutionBoard = () => {
  const [droppedTaskIndex, setDroppedTaskIndex] = useState(null);
  const [showEvaluation, setShowEvaluation] = useState(false); // Nouvel état
  const [myExecutions, setMyExecutions] = useState([]);
  const [executionsInReview, setExecutionsInReview] = useState([]);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "/executionBoard/myExecutions?userId=" +
          localStorage.getItem("userId")
      )
      .then((res) => {
        setMyExecutions(res.data);
      });

    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "/executionBoard/ExecutionsInReview?userId=" +
          localStorage.getItem("userId")
      )
      .then((res) => {
        setExecutionsInReview(res.data);
      });
  }, []);

  const handleDropClick = (index) => {
    setDroppedTaskIndex(index);
  };

  const handleThanksClick = (executionId) => {
    setDroppedTaskIndex(executionId);
    setShowEvaluation(true);
  };

  const [showPeerReview, setShowPeerReview] = useState(false);

  const handlePeerReviewClick = () => {
    setShowPeerReview(true);
  };

  const executionFeed = myExecutions.map((execution) => (
    <ExecutionCards
      execution={execution}
      handleThanksClick={handleThanksClick}
      handleDropClick={handleDropClick}
      droppedTaskIndex={droppedTaskIndex}
    />
  ));

  return (
    <div className="container">
      <Sidebar />

      {showPeerReview ? (
        <PeerReview
          executionId={droppedTaskIndex}
          setShowPeerReview={setShowPeerReview}
        />
      ) : showEvaluation ? (
        <SelfReview
          executionId={droppedTaskIndex}
          setShowEvaluation={setShowEvaluation}
        />
      ) : (
        <div className="execution-board">
          <h1>Execution Board</h1>
          <h1 className="thanks">
            0 <img className="symbole" src={logo5} />
          </h1>
          <div className="execution-container">
            <div className="executions my">
              <h2>My Execution</h2>
              <div className="scroll">{executionFeed}</div>

              {/* {myExecutions.map((task) => (
                <div className="execution" key={task.id}>
                  <div>
                    <b>{task.exec_description}</b>
                  </div>
                  <div>
                    To do for the {new Date(task.deadline).toLocaleDateString()}
                  </div>
                  <div>Status : {task.status_}</div>
                  <div className="buttons-container">
                    <button
                      className="accept-button"
                      onClick={() => handleDropClick(task.id)}
                    >
                      Drop
                    </button>
                    {droppedTaskIndex === task.id && (
                      <button
                        className="thanks-button"
                        onClick={() => {
                          handleThanksClick();
                          setDroppedTaskIndex(task.id);
                        }}
                      >
                        Get Your Thanks
                      </button>
                    )}
                  </div>
                </div>
              ))} */}
            </div>
            <div className="executions DIO">
              <h2 className="fini">DIO Execution</h2>
              {localStorage.getItem("isCEO") === "1" ? (
                <>You cannot make a peer review as a CEO</>
              ) : (
                executionsInReview.map((task) => (
                  <div className="execution" key={task.id}>
                    {task.exec_description}
                    <div className="buttons-container">
                      <button
                        className="accept-button"
                        onClick={() => setDroppedTaskIndex(task.id)}
                      >
                        See
                      </button>
                      {droppedTaskIndex === task.id && (
                        <button
                          className="thanks-button"
                          onClick={() => {
                            handlePeerReviewClick();
                            // setDroppedTaskIndex(task.id);
                          }}
                        >
                          Peer review
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutionBoard;
