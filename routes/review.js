let express = require("express");
let router = express.Router();
const executeSQLRequest = require("./database");
const startCountdown = require('./countdownTrigger');
const calculateDeadline = require("./deadlineCalculations");
const dioDailyThanks = require("./dioDailyThanks");
let fs = require("fs");


/* GET the text of a review. */
router.get("/:executionId", async (req, res, next) => {
  const { executionId } = req.params;
  try {
    const rows = await executeSQLRequest(
      `SELECT exec_content FROM execution WHERE id = ?`,
      [executionId]
    );
    res.send(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

/* Add a review. */
router.post("/selfReview", async (req, res, next) => {
  const { userId, executionId, comment, difficulty, reactivity } = req.body;
  const parameters = JSON.parse(fs.readFileSync("parameters.json", "utf8"));
  const ED = parameters.autoEvaluation.difficulty[difficulty];
  const ER = parameters.autoEvaluation.reactivity[reactivity];
  const ExC = 0.1;
  const ExCP = 0.05;

  const sql = `INSERT INTO review (id_execution, id_issuer, comments_, difficulty, reactivity) VALUES (?, ?, ?, ?, ?)`;
  try {
      executeSQLRequest(sql, [executionId, userId, comment, difficulty, reactivity]
    );
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }

  const responseValue = (ED === 1 && ER === 1) || (ED === 1 && ER === 4) || (ED === 4 && ER === 1)
    ? (ED * ER) * (1 + ExC + ExCP)
    : await calculateDeadline(reactivity, difficulty);

  // Envoyez la réponse au frontend
  res.send({ data: { responseValue } });

  if (responseValue === 24 || responseValue === 48 || responseValue === 72) {
      startCountdown(responseValue, executionId);
      
  }else{
    executeSQLRequest(`UPDATE users SET thanks = thanks + ? WHERE id = ?;`, [Math.ceil(responseValue), userId]);
      // insertion des thanks dans la table DailyThanks
    /*const rows = await executeSQLRequest(`SELECT id, id_ceo FROM dio WHERE id_execution = ?`, [executionId]);
    const dio_id = rows[0].id;
    const ceo_id = rows[0].id_ceo;*/
      
    await dioDailyThanks(Math.ceil(responseValue), 1, 1); // à revoir en premier les params

  }

});
router.post("/peerReview", async (req, res, next) => {
  const { userId, executionId, comments, expectations, reactivity } = req.body;
  const sql = `INSERT INTO peer_review (id_execution, id_issuer, comments, expectations, reactivity) VALUES (?, ?, ?, ?, ?)`;
  try {
    const rows = await executeSQLRequest(
      sql,
      [executionId, userId, comments, expectations, reactivity]
    );
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/ceoReview", async (req, res, next) => {
  const { executionId, userId, comments, expectations, reactivity } = req.body;
  const sql = `INSERT INTO ceo_review (id_execution, id_issuer, comments, expectations, reactivity) VALUES (?, ?, ?, ?, ?)`;
  try {
    const rows = await executeSQLRequest(
      sql,
      [executionId, userId, comments, expectations, reactivity]
    );
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});




module.exports = router;
