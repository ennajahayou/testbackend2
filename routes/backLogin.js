// Importez les modules nécessaires
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const cors = require("cors");
const executeSQLRequest = require("./database"); 
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Middleware pour analyser le corps des demandes
router.use(bodyParser.json());
router.use(cors());

router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const rows = await executeSQLRequest("SELECT * FROM users WHERE email = ?", [email]);
    
    if (rows.length) {
      bcrypt.compare(password, rows[0].password_, function (err, result) {
        if (result) {
          const userId = rows[0].id;
          const userName = rows[0].user_name;
          const sqlIsCeo = `SELECT EXISTS (SELECT 1 FROM dio WHERE id_ceo = ?) AS is_userId_ceo`;
          
          executeSQLRequest(sqlIsCeo, [rows[0].id])
            .then((row) => {
              console.log(userId, userName, row[0]);
              res.status(200).json({
                message: "Authentification réussie",
                userId: userId,
                userName: userName,
                isCEO: row[0].is_userId_ceo,
                token : jwt.sign(
                  { userId: userId },
                  'RANDOM_SECRET_TOKEN_THANKSANDTIP',
                  { expiresIn: '24h' })
              });
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ message: "Erreur interne du serveur" });
            });
        } else {
          res.status(401).json({ message: "Identifiant ou mot de passe incorrect" });
        }
      });
    } else {
      res.status(401).json({ message: "Identifiant ou mot de passe incorrect" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// Route d'enrôlement
router.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    await executeSQLRequest("INSERT INTO users (user_name, email, password_) VALUES (?, ?, ?)", [username, email, hash]);

    res.status(200).json({ message: "Inscription réussie" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

module.exports = router;
