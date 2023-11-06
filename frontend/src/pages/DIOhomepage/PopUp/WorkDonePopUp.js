import "../DIOhomepage.css";
// import { useContext } from "react";
// import { TasksContext } from "../../TasksContext";

const WorkDonePopUp = ({
  setShowPopUpWorkDone,
  setIsCreatingExecution,
  setSelfReview,
  setExecutionId,
}) => {
  // TODO: add real information in jsonData

  // const { setProp, addProp } = useContext(TasksContext);

  const handleClickNotDone = () => {
    setIsCreatingExecution(true);
    setShowPopUpWorkDone(false);
  };

  const handleClickAlreadyDone = () => {
    setShowPopUpWorkDone(false);
    setExecutionId(0);
    setSelfReview(true);
  };

  return (
    <div className="submition-pop-up">
      <button className="submitButton" onClick={handleClickNotDone}>
        Not done
      </button>
      <button className="submitButton" onClick={handleClickAlreadyDone}>
        Already done
      </button>
    </div>
  );
};

export default WorkDonePopUp;
