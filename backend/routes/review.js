var express = require("express");
var router = express.Router();
const createConnection = require("../dataBaseConnection");

/* Add a review. */
router.post("/selfReview", function (req, res, next) {
  const connection = createConnection();
  const { userId, executionId, comment, difficulty, reactivity } = req.body;

  const sql = `INSERT INTO review (id_execution, id_issuer, comments_, difficulty, reactivity) VALUES (?, ?, ?, ?, ?)`;
  connection.query(
    sql,
    [executionId, userId, comment, difficulty, reactivity],
    (err, rows) => {
      if (err) {
        throw err;
      }
      console.log({ rows });
      res.send(rows);

      connection.close();
    }
  );
});

router.post("/peerReview", function (req, res, next) {
  const connection = createConnection();
  const {
    userId,
    executionId,
    comments,
    respect,
    expectations,
    result,
    quality,
    goal,
    satisfaction,
  } = req.body;

  const sql = `INSERT INTO peer_review (id_execution, id_issuer, comments, respect, expectations, result, quality, goal, satisfaction) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(
    sql,
    [
      executionId,
      userId,
      comments,
      respect,
      expectations,
      result,
      quality,
      goal,
      satisfaction,
    ],
    (err, rows) => {
      if (err) {
        throw err;
      }
      console.log({ rows });
      res.send(rows);

      connection.close();
    }
  );
});

router.post("/ceoReview", function (req, res, next) {
  const connection = createConnection();
  const { executionId, userId, comments, expectations, reactivity } = req.body;

  const sql = `INSERT INTO ceo_review (id_execution, id_issuer, comments, expectations, reactivity) VALUES (?, ?, ?, ?, ?)`;
  connection.query(
    sql,
    [executionId, userId, comments, expectations, reactivity],
    (err, rows) => {
      if (err) {
        throw err;
      }
      console.log({ rows });
      res.send(rows);

      connection.close();
    }
  );
});

module.exports = router;
