import { useState } from "react";

import "./ExecutionCreation.css";

import axios from "axios";

const ExecutionCreation = ({
  executionDescription,
  setIsCreatingExecution,
}) => {
  const [howAreYouGoingToMakeIt, setHowAreYouGoingToMakeIt] = useState(true);

  const [howMake, setHowMake] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleNext = () => {
    setHowAreYouGoingToMakeIt(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNext();
    }
  };

  const handleSubmit = () => {
    var jsonData = {
      executionDescription: executionDescription,
      talentId: localStorage.getItem("userId"),
      creatorId: localStorage.getItem("userId"),
      dioId: 1,
      doItMyself: true,
      howMake: howMake,
      deadline: deadline,
    };
    setIsCreatingExecution(false);

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/execution", jsonData)
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      });
  };

  return (
    <div className="main-content">
      <div className="attributionFields">
        {howAreYouGoingToMakeIt && (
          <>
            <>How are you going to make it</>
            <input
              type="text"
              className="textfield"
              onKeyDown={handleKeyDown}
              placeholder="How are you going to make it ?"
              value={howMake}
              onChange={(e) => {
                setHowMake(e.target.value);
              }}
            />
            <button
              onClick={() => {
                handleNext();
              }}
            >
              Next
            </button>
          </>
        )}
        {!howAreYouGoingToMakeIt && (
          <>
            <>When are you going to deliver it</>
            <input
              type="date"
              className="textfield"
              value={deadline}
              onChange={(e) => {
                setDeadline(e.target.value);
              }}
            />

            <button onClick={handleSubmit}>Next</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ExecutionCreation;
