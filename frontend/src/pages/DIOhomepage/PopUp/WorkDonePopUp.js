import "../DIOhomepage.css";
import { useContext } from "react";
import { TasksContext } from "../../TasksContext";

import axios from "axios";

const WorkDonePopUp = ({
  executionDescription,
  dioId,
  setShowPopUpWorkDone,
  setIsCreatingExecution,
}) => {
  // TODO: add real information in jsonData

  const { addProposition } = useContext(TasksContext);

  const { setProp, addProp } = useContext(TasksContext);

  const handleClickNotDone = () => {
    setIsCreatingExecution(true);
    setShowPopUpWorkDone(false);
  };

  const handleClickAlreadyDone = () => {
    setShowPopUpWorkDone(false);
    alert("Your work has been submitted");

    axios.post(process.env.REACT_APP_BACKEND_URL + "/execution/workDone", {
      userId: localStorage.getItem("userId"),
      executionDescription: executionDescription,
      dioId: dioId,
      execContent: "Work already done",
    });

    addProposition(executionDescription);
  };

  return (
    <div className="submition-pop-up">
      <button className="submitButton" onClick={handleClickNotDone}>
        Not done
      </button>
      <button
        className="submitButton"
        onClick={handleClickAlreadyDone}
        disabled
      >
        Already done
      </button>
    </div>
  );
};

export default WorkDonePopUp;
