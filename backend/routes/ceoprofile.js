var express = require("express");
var router = express.Router();
const createConnection = require("../dataBaseConnection");

/* GET execution in progress of a DIO. */
router.get("/executionInProgress", function (req, res, next) {
  console.log(req.query);
  dioId = req.query.dioId;
  const connection = createConnection();
  // TODO : add date management
  let sql = `SELECT execution.id, execution.exec_description, users.user_name, execution.ceo_validated, execution.status_
              FROM execution
              JOIN users ON execution.id_talent = users.id
              WHERE execution.id_dio = ${dioId} AND execution.status_ != "Done" AND execution.archived = 0`;
  connection.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log({ rows });
    res.send(rows);

    connection.close();
  });
});

/* GET execution done of a DIO. */
router.get("/executionDone", function (req, res, next) {
  console.log(req.query);
  dioId = req.query.dioId;
  const connection = createConnection();
  // TODO : add date management
  let sql = `SELECT execution.id, execution.exec_description, users.user_name, execution.ceo_validated, execution.status_
              FROM execution
              JOIN users ON execution.id_talent = users.id
              WHERE execution.id_dio = ${dioId} AND execution.status_ = "Done"`;

  connection.query(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log({ rows });
    res.send(rows);

    connection.close();
  });
});

/* Accept execution. */
router.post("/acceptExecution", function (req, res, next) {
  const connection = createConnection();
  let sql = `UPDATE execution SET ceo_validated = 1 WHERE id = ${req.body.executionId}`;

  connection.query(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log({ rows });
    res.send(rows);

    connection.close();
  });
});

/* Accept execution but not Talent */
router.post("/acceptExecutionButNotTalent", function (req, res, next) {
  const connection = createConnection();
  let sql = `UPDATE execution SET ceo_validated = 1, status_='Not assigned' WHERE id = ${req.body.id}`;

  connection.query(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log({ rows });
    res.send(rows);

    connection.close();
  });
});

/* Refuse execution. */
router.post("/refuseExecution", function (req, res, next) {
  const connection = createConnection();
  let sql = `UPDATE execution SET ceo_validated = 0, archived = 1 WHERE id = ${req.body.id}`;

  connection.query(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log({ rows });
    res.send(rows);

    connection.close();
  });
});

module.exports = router;
