var express = require("express");
var router = express.Router();
const createConnection = require("../dataBaseConnection");

/* Handle execution Creation */
router.post("/", function (req, res, next) {
  console.log("Execution creation request received");
  console.log(req.body);

  const executionDescription = req.body.executionDescription;
  const talentId = req.body.talentId;
  const creatorId = req.body.creatorId;
  const dioId = req.body.dioId;
  const doItMyself = req.body.doItMyself;

  let status = "Not assigned";
  if (doItMyself) {
    status = "In progress";
  }

  const connection = createConnection();
  const sqlGetCEO = `SELECT id_ceo FROM dio WHERE id = ${dioId}`;

  connection.query(sqlGetCEO, [], (err, rows) => {
    if (err) {
      throw err;
    }
    if (!rows.length) {
      console.log("No dio found");
      res.status(400).send("No dio found");
      throw new Error("No dio found");
      connection.close();
    }

    const ceoId = rows[0].id_ceo;

    if (ceoId === creatorId) {
      const sqlAddExecution = `INSERT INTO execution (exec_description, id_talent, id_ceo, id_dio, status_, ceo_validated) VALUES ('${executionDescription}', ${talentId}, ${creatorId}, ${dioId}, '${status}', true)`;
      connection.query(sqlAddExecution, [], (err) => {
        if (err) {
          throw err;
        }
        console.log("Execution created");
        res.status(200).send("Execution created");

        connection.close();
      });
    } else {
      const sqlAddExecution = `INSERT INTO execution (exec_description, id_talent, id_ceo, id_dio, status_, ceo_validated) VALUES ('${executionDescription}', ${talentId}, ${creatorId}, ${dioId}, '${status}', false)`;
      connection.query(sqlAddExecution, [], (err) => {
        if (err) {
          throw err;
        }
        console.log("Execution created");
        res.status(200).send("Execution created");

        connection.close();
      });
    }
  });
});

/* Asign a user to an execution */
router.post("/assign", function (req, res, next) {
  console.log("Execution assignation request received");
  console.log(req.body);

  const executionId = req.body.executionId;
  const userId = req.body.userId;
  const howMake = req.body.howMake;
  const deliverDate = req.body.deliverDate;

  connection = createConnection();
  sql = `UPDATE execution SET id_talent = ${userId}, candidate_description = '${howMake}', delivery_date = '${deliverDate}', status_ = 'In progress' WHERE id = ${executionId}`;

  connection.query(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log("Execution assigned");
    res.status(200).send("Execution assigned");
    connection.close();
  });
});

/* Set an execution to In review */
// TODO : Handle the deposit of a txt to begin, then the deposit of a file
router.post("/setInReview", function (req, res, next) {
  console.log("Execution in review request received");
  console.log(req.body);

  const executionId = req.body.executionId;

  db = new sqlite3.Database("database.db");
  const connection = createConnection();
  sql = `UPDATE execution SET status_ = 'In review' WHERE id = ${executionId}`;

  connection.query(sql, [], (err) => {
    if (err) {
      throw err;
    }
    console.log("Execution in review");
    res.status(200).send("Execution in review");

    connection.close();
  });
});

module.exports = router;
