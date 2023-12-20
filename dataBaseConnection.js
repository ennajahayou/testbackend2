/*const mysql = require("mysql2");
//const env = require("dotenv").config();

const connectToDatabase = () => {
    const connectionInfo = {
      host: process.env.DB_HOST, //process.env.DB_HOST,
      user: process.env.DB_USER, //process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: 3307,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    };

    return (connection = mysql.createConnection(connectionInfo));
  };

module.exports = connectToDatabase;*/

const mysql = require("mysql2");
const env = require("dotenv").config();
const connectionInfo = {
  host: process.env.DB_HOST, //process.env.DB_HOST,
  user: process.env.DB_USER, //process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};
const connectToDatabase = () => {
  return mysql.createConnection(connectionInfo);
};

function decrementValue() {
  const pool = mysql.createConnection(connectionInfo)
  pool.query('UPDATE execution SET remaining_time = remaining_time - 1 WHERE remaining_time IS NOT NULL AND remaining_time > 0', (error, results, fields) => {
  pool.close()
    if (error) throw error;
});
}

setInterval(decrementValue, 1000);

module.exports = connectToDatabase;
