import { useState } from "react";
import StarRating from "./StarRating";
import "./ExecutionBoard.css";
import axios from "axios";

const PeerReview = ({ executionId, setShowPeerReview }) => {
  const [peerReviewQuestion, setPeerReviewQuestion] = useState(0);
  const [ratings, setRatings] = useState([0, 0, 0, 0, 0, 0]);

  const handleRatingChange = (rating, index) => {
    const newRatings = [...ratings];
    newRatings[index] = rating;
    setRatings(newRatings);
  };

  const handleSubmit = () => {
    console.log(ratings);
    const data = {
      userId: localStorage.getItem("userId"),
      executionId: executionId,
      comments: "test",
      respect: ratings[0],
      expectations: ratings[1],
      result: ratings[2],
      quality: ratings[3],
      goal: ratings[4],
      satisfaction: ratings[5],
    };

    axios.post(process.env.REACT_APP_BACKEND_URL + "/review/peerReview", data);
    setPeerReviewQuestion(3);
  };

  return (
    <div className="review-container">
      {peerReviewQuestion === 0 ? (
        <div className="peer-review-container">
          <StarRating
            key={peerReviewQuestion + "Q1"}
            label="Does the work respect the idea?"
            rating={ratings[0]}
            onChange={(rating) => handleRatingChange(rating, 0)}
          />
          <StarRating
            key={peerReviewQuestion + "Q2"}
            label="Does the work up to your expectations?"
            rating={ratings[1]}
            onChange={(rating) => handleRatingChange(rating, 1)}
          />
          <button
            className="evaluation-button"
            onClick={() => setPeerReviewQuestion(1)}
          >
            Next
          </button>
        </div>
      ) : peerReviewQuestion === 1 ? (
        <div className="peer-review-container">
          <StarRating
            key={peerReviewQuestion + "Q3"}
            label="Does the work respond to result ask?"
            rating={ratings[2]}
            onChange={(rating) => handleRatingChange(rating, 2)}
          />
          <StarRating
            key={peerReviewQuestion + "Q4"}
            label="Does the work as a good quality?"
            rating={ratings[3]}
            onChange={(rating) => handleRatingChange(rating, 3)}
          />
          <button
            className="evaluation-button"
            onClick={() => setPeerReviewQuestion(2)}
          >
            Next
          </button>
        </div>
      ) : peerReviewQuestion === 2 ? (
        <div className="peer-review-container">
          <StarRating
            key={peerReviewQuestion + "Q5"}
            label="Does the work permit to rich the goal?"
            rating={ratings[4]}
            onChange={(rating) => handleRatingChange(rating, 4)}
          />
          <StarRating
            key={peerReviewQuestion + "Q6"}
            label="Are you satisty of the work?"
            rating={ratings[5]}
            onChange={(rating) => handleRatingChange(rating, 5)}
          />
          <button
            className="evaluation-button"
            onClick={() => {
              setPeerReviewQuestion(3);
              handleSubmit();
            }}
          >
            Give back
          </button>
        </div>
      ) : (
        <div className="evaluation-container1">
          <h1>CONGRATULATION!</h1>
          <p>You win Thanks by Peer reviewing</p>
          <p>23:59:47</p>
          <button
            className="evaluation-button"
            onClick={() => setShowPeerReview(false)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PeerReview;
