import "../DIOhomepage.css";

import axios from "axios";

const AttributionPopUp = ({
  setIsAttributingExecution,
  setShowPopUpAttribution,
  executionId,
}) => {
  // TODO: add real information in jsonData

  const handleClickNotDone = () => {
    setShowPopUpAttribution(false);
    setIsAttributingExecution(true);
  };

  const handleClickAlreadyDone = () => {
    setShowPopUpAttribution(false);
    alert("Your work has been submitted");

    axios.post(process.env.REACT_APP_BACKEND_URL + "/execution/setInReview", {
      executionId: executionId,
      userId: localStorage.getItem("userId"),
      execContent: "Work already done",
    });
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

export default AttributionPopUp;
