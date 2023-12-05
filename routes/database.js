// database.js
const createConnection = require("../dataBaseConnection");

const executeSQLRequest = async (sql, params) => {
  const connection = createConnection();

  try {
    const rows = await new Promise((resolve, reject) => {
      connection.query(sql, params, (err, rows) => {
        connection.close();
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = executeSQLRequest;
