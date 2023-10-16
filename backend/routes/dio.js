var express = require("express");
var router = express.Router();
const createConnection = require("../dataBaseConnection");

/* GET dio listing. */
router.get("/", function (req, res, next) {
  const connection = createConnection();
  let sql = `SELECT id, nom_dio, dio_description FROM dio`;

  connection.query(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log({ rows });
    res.send(rows);

    connection.close();
  });
});

/* POST dio creation. */
router.post("/", function (req, res, next) {
  const connection = createConnection();
  let sql = `INSERT INTO dio (nom_dio, dio_description) VALUES ('${req.body.nom_dio}', '${req.body.dio_description}')`;

  connection.query(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log({ rows });
    res.send(rows);

    connection.close();
  });
});

/* GET dio list of execution of a DIO. */
router.get("/execution", function (req, res, next) {
  dioId = req.query.dioId;

  const connection = createConnection();
  let sql = `SELECT id, exec_description, id_talent, id_ceo, score_tips, score_thanks, id_dio, status_ FROM execution WHERE id_dio = ${dioId}`;

  connection.query(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log({ rows });
    res.send(rows);

    connection.close();
  });
});

/* ADD user to DIO */
router.post("/addUser", function (req, res, next) {
  const connection = createConnection();
  let sql = `INSERT INTO user_dio (id_user, id_dio) VALUES (${req.body.id_user}, ${req.body.id_dio})`;

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
