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

/*
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const executeSQLRequest = async (sql, params) => {
  const promisePool = pool.promise();

  try {
    const [rows, fields] = await promisePool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = executeSQLRequest;
*/