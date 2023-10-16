var express = require("express");
var router = express.Router();
const createConnection = require("../dataBaseConnection");

/* GET user listing. */
router.get("/", function (req, res, next) {
  const connection = createConnection();
  const sql = `SELECT id, user_name, email, profil_informations FROM users`;

  connection.query(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);

    connection.close();
  });
});

/* POST user creation. */
router.post("/", function (req, res, next) {
  console.log(req.body);
  const connection = createConnection();
  let sql = `INSERT INTO users (user_name, email, password_) VALUES ('${req.body.user_name}', '${req.body.email}', '${req.body.password_}')`;

  connection.query(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);

    connection.close();
  });
});

/* GET user by id. */
router.get("/:id", function (req, res, next) {
  const connection = createConnection();
  let sql = `SELECT id, user_name, email, profil_informations FROM users WHERE id = ${req.params.id}`;

  connection.query(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);

    connection.close();
  });
});

module.exports = router;
