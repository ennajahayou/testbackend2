const schedule = require('node-schedule');
const executeSQLRequest = require('./database');

// Planifie la tâche à 23h59 chaque jour
const job = schedule.scheduleJob('19 23 * * *', async () => {
  console.log('Il est 23H59.');
  // Vérifie si la date d'aujourd'hui existe dans la table dailythanks
  const checkQuery = 'SELECT COUNT(*) AS count FROM dailythanks WHERE day = CURRENT_DATE';
  const result = await executeSQLRequest(checkQuery, []);
  
  // Si la date d'aujourd'hui existe
  if (result && result[0] && result[0].count === 1) {
    // Effectue le calcul de la moyenne et met à jour la table dailythanks
    const TksCEO_PCENT = 0.1;
    const TksCFF = 10;
    

    const updateQuery = `
      UPDATE dailythanks
      SET daily_average = thanks_count / count
      WHERE day = CURRENT_DATE;
    `;

    try {
      // Récupère la valeur calculée (daily_average)
      const { affectedRows } = await executeSQLRequest(updateQuery, []);

      // Si la mise à jour a réussi et au moins une ligne a été affectée
      if (affectedRows > 0) {
        // Récupère la valeur daily_average
        const getAverageQuery = `SELECT thanks_count, daily_average FROM dailythanks WHERE day = CURRENT_DATE;`;
        
        const thanks_count_result = await executeSQLRequest(getAverageQuery, []);
        const { thanks_count, daily_average } = thanks_count_result[0];
        const thanksCEO = Math.min(thanks_count * TksCEO_PCENT, daily_average * TksCFF);

        // Met à jour la colonne thanks dans la table users avec la nouvelle valeur modifiée
        const updateUsersQuery = `UPDATE users SET thanks = thanks + ? WHERE id = 1;`;
        
        await executeSQLRequest(updateUsersQuery, [thanksCEO]);
        console.log('Mise à jour de la colonne thanks dans la table users effectuée.');
      }
    } catch (error) {
      console.error('Erreur lors du calcul de la moyenne ou de la mise à jour de la colonne thanks :', error);
    }
  } else {
    // Si la date d'aujourd'hui n'existe pas, insère une nouvelle ligne avec la date actuelle
    console.log('Pas de Calcul pour ce soir.');
  }
});

// Log pour indiquer que la planification a été effectuée avec succès
console.log('Planification de la tâche à 23h59 chaque jour.');
