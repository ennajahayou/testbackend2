var express = require("express");
var router = express.Router();
const createConnection = require("../dataBaseConnection");
const thanksCalculator = require("./thanksCalculator");

router.post("/save-texte", (req, res) => {
  const { executionId, texte } = req.body;
  const db = createConnection();

  const updateSql =
    "UPDATE execution SET exec_content = ?, status_ = ? WHERE id = ?";
  const updateValue = "In review";

  db.query(
    updateSql,
    [texte, updateValue, executionId],
    (updateErr, updateResult) => {
      if (updateErr) {
        console.error(
          "Erreur lors de la mise à jour de exec_content :",
          updateErr
        );
        res.status(500).send("Erreur lors de la mise à jour de exec_content");
      } else {
        console.log("exec_content mis à jour avec succès :", updateResult);
        res
          .status(200)
          .send("Texte inséré et exec_content mis à jour avec succès");
      }
      db.close();
    }
  );
});

router.post("/setDone", async (req, res) => {
  const { executionId } = req.body;

  const scoreThanks = await thanksCalculator(executionId, 0);
  const db = createConnection();

  const updateSql =
    "UPDATE execution SET status_ = ?, score_thanks = ? WHERE id = ?";
  const updateValue = "Done";

  db.query(
    updateSql,
    [updateValue, scoreThanks, executionId],
    (updateErr, updateResult) => {
      if (updateErr) {
        res.status(500).send("Erreur lors de la mise à jour de status_");
      } else {
        res.status(200).send("status_ mis à jour avec succès");
      }
      db.close();
    }
  );
});

router.get("/myExecutions", (req, res) => {
  const { userId } = req.query;
  const db = createConnection();

  const sql = `
        SELECT id, exec_description, status_, deadline, id_talent, ceo_validated, archived, score_thanks
        FROM execution
        WHERE id_ceo = ? OR id_talent = ?
        ORDER BY last_updated DESC`;
  db.query(sql, [userId, userId], (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération des executions :", err);
      res.status(500).send("Erreur lors de la récupération des executions");
    } else {
      res.status(200).send(result);
    }
    db.close();
  });
});

router.get("/ExecutionsInReview", (req, res) => {
  const { userId } = req.query;
  const db = createConnection();
  const sql = `SELECT id, exec_description FROM execution WHERE status_ = 'In review' AND id_talent != ?`;
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération des executions :", err);
      res.status(500).send("Erreur lors de la récupération des executions");
    } else {
      res.status(200).send(result);
    }
    db.close();
  });
});

module.exports = router;
