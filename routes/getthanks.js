//getthanks.js
const express = require('express');
const router = express.Router();
const executeSQLRequest = require('./database');

// Route pour récupérer le nombre total de thanks pour un utilisateur
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await executeSQLRequest('SELECT thanks FROM users WHERE id = ?', [userId]);
    const totalThanks = result[0].thanks; // Assurez-vous que la colonne s'appelle "thanks"

    res.json({ totalThanks });
  } catch (error) {
    console.error('Erreur lors de la récupération des thanks depuis la base de données', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

module.exports = router;
