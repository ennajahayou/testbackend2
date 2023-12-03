var express = require("express");
var router = express.Router();
const createConnection = require("../dataBaseConnection");
const calculateDeadline = require("./deadlineCalculations");
var fs = require("fs");

/* GET the text of a review. */
router.get("/:executionId", function (req, res, next) {
  const connection = createConnection();
  const { executionId } = req.params;

  const sql = `SELECT exec_content FROM execution WHERE id = ?`;
  connection.query(sql, [executionId], (err, rows) => {
    if (err) {
      console.log(err);
      connection.close();
    }

    res.send(rows[0]);

    connection.close();
  });
});

/* Add a review. */
router.post("/selfReview", async (req, res, next) => {
  const connection = createConnection();
  const { userId, executionId, comment, difficulty, reactivity } = req.body;
  var parameters = JSON.parse(fs.readFileSync("parameters.json", "utf8"));
  const ED = parameters.autoEvaluation.difficulty[difficulty];
  const ER = parameters.autoEvaluation.reactivity[reactivity];

  const responseValue = (ED === 1 && ER === 1) || (ED === 1 && ER === 4) || (ED === 4 && ER === 1)
  ? 1
  : await calculateDeadline(reactivity, difficulty);

  


  const sql = `INSERT INTO review (id_execution, id_issuer, comments_, difficulty, reactivity) VALUES (?, ?, ?, ?, ?)`;
  connection.query(
    sql,
    [executionId, userId, comment, difficulty, reactivity],
    (err, rows) => {
      if (err) {
        console.log(err);
        connection.close();
      }

      // Envoyez la réponse au frontend
      res.send({ data: { rows, responseValue } });
      


      connection.close();
    }
  );
});

router.post("/peerReview", function (req, res, next) {
  const connection = createConnection();
  const { userId, executionId, comments, expectations, reactivity } = req.body;

  const sql = `INSERT INTO peer_review (id_execution, id_issuer, comments, expectations, reactivity) VALUES (?, ?, ?, ?, ?)`;

  connection.query(
    sql,
    [executionId, userId, comments, expectations, reactivity],
    (err, rows) => {
      if (err) {
        console.log(err);
        connection.close();
      }

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
        console.log(err);
        connection.close();
      }

      res.send(rows);

      connection.close();
    }
  );
});

module.exports = router;