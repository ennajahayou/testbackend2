var express = require("express");
const sqlite3 = require("sqlite3").verbose();
var router = express.Router();

router.get('/', (req, res) => {
    res.send('Bienvenue sur la page d\'accueil !');
  });
  
  module.exports = router;
