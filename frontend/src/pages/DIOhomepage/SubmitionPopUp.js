import "./DIOhomepage.css";
import { Link } from "react-router-dom";

const SubmitionPopUp = ({ executionDescription, dioId, setShowPopUp }) => {
  // TODO: add real information in jsonData

  const handleClick = (DoItMyself) => {
    console.log(DoItMyself);
    var jsonData = {
      executionDescription: executionDescription,
      talentId: 1,
      creatorId: 1,
      dioId: dioId,
      doItMyself: DoItMyself,
    };

    console.log({ jsonData });
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8080/execution", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(jsonData));

    setShowPopUp(false);
  };

  // setDoItMyself(DoItMyself);
  return (
    <div className="submition-pop-up">
      <Link to="/ExecutionAttribution">
        <button className="submitButton" onClick={() => handleClick(true)}>
          I want to do it
        </button>
      </Link>
      <button className="submitButton" onClick={() => handleClick(false)}>
        I want someone else to do it
      </button>
    </div>
  );
};

export default SubmitionPopUp;
