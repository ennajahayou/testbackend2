import axios from "axios";

const ExecutionInReview = ({
  execution,
  handleDropClick,
  handleThanksClick,
  droppedTaskIndex,
}) => {
  const setExecutionDone = () => {
    axios.post(process.env.REACT_APP_BACKEND_URL + "/executionBoard/setDone", {
      executionId: execution.id,
    });
  };

  const formattedDeadline = new Date(execution.deadline).toLocaleDateString();
  return (
    <div className="execution" key={execution.id}>
      <div>
        <b>{execution.exec_description}</b>
      </div>
      <div>In review</div>
      <div>Deadline for reviews : {formattedDeadline}</div>
      <button className="accept-button" onClick={setExecutionDone}>
        Set Done
      </button>
    </div>
  );
};

export default ExecutionInReview;
