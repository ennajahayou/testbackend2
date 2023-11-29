const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const createConnection = require("../dataBaseConnection");

// Middleware pour analyser le corps des demandes
router.use(bodyParser.json());
router.use(cors());

const db = createConnection();

router.get("/userdetails", (req, res) => {
  db.query(
    "SELECT user_name,thanks FROM users ORDER BY thanks DESC",
    (err, results) => {
      if (err) {
        console.error(
          "Erreur lors de la récupération des données des utilisateurs :",
          err
        );
        res.status(500).json({
          error: "Erreur lors de la récupération des données des utilisateurs",
        });
      } else {
        res.json(results);
      }

      db.close();
    }
  );
});

module.exports = router;
