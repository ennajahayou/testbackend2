const executeSQLRequest = require("./database");

const dioDailyThanks = async (received_thanks, ceo_id = 1, dio_id = 1) => {
  const sql = `
  INSERT INTO dailythanks (dio_id, ceo_id, thanks_count, count, day)
  VALUES (?, 1, ?, 1, CURRENT_DATE)
  ON DUPLICATE KEY UPDATE
  thanks_count = thanks_count + ?, count = count + 1;
  `;

  const values = [dio_id, ceo_id, received_thanks, received_thanks];

  await executeSQLRequest(sql, values);
};

module.exports = dioDailyThanks;
