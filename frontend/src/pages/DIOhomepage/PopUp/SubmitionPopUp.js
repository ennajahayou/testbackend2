import "../DIOhomepage.css";

const SubmitionPopUp = ({
  executionDescription,
  dioId,
  setShowPopUp,
  setShowPopUpWorkDone,
}) => {
  // TODO: add real information in jsonData

  const handleClickMyself = () => {
    setShowPopUp(false);
    setShowPopUpWorkDone(true);
  };

  const handleClickSomeoneElse = () => {
    var jsonData = {
      executionDescription: executionDescription,
      talentId: localStorage.getItem("userId"),
      creatorId: localStorage.getItem("userId"),
      dioId: dioId,
      doItMyself: false,
    };

    console.log({ jsonData });
    var request = new XMLHttpRequest();
    request.open(
      "POST",
      process.env.REACT_APP_BACKEND_URL + "/execution",
      true
    );
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(jsonData));

    setShowPopUp(false);
  };

  return (
    <div className="submition-pop-up">
      <button className="submitButton" onClick={handleClickMyself}>
        I want to do it
      </button>
      <button className="submitButton" onClick={handleClickSomeoneElse}>
        I want someone else to do it
      </button>
    </div>
  );
};

export default SubmitionPopUp;
