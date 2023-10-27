// Importez les modules nécessaires
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const createConnection = require("../dataBaseConnection");

// Middleware pour analyser le corps des demandes
router.use(bodyParser.json());
router.use(cors());

router.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const connection = createConnection();
  // Recherchez l'utilisateur dans la base de données
  connection.query(
    "SELECT * FROM users WHERE email = ? AND password_ = ?",
    [email, password],
    (err, row) => {
      if (err) {
        res.status(500).json({ message: "Erreur interne du serveur" });
      } else if (row) {
        res.status(200).json({
          message: "Authentification réussie",
          userId: row[0].id,
          userName: row[0].user_name,
          isCEO,
        });
      } else {
        res
          .status(401)
          .json({ message: "Identifiant ou mot de passe incorrect" });
      }
      connection.close();
    }
  );
});

// Route d'enrôlement
router.post("/api/signup", (req, res) => {
  const { username, email, password } = req.body;

  const connection = createConnection();
  // Ajoutez l'utilisateur à la base de données
  connection.query(
    "INSERT INTO users (user_name, email, password_) VALUES (?, ?, ?)",
    [username, email, password],
    function (err) {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne du serveur" });
      } else {
        res.status(200).json({ message: "Inscription réussie" });
      }
      connection.close();
    }
  );
});

module.exports = router;
