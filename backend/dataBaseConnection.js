const mysql = require("mysql2");
const env = require("dotenv").config();

const connectToDatabase = () => {
  const connectionInfo = {
    host: process.env.DB_HOST, //process.env.DB_HOST,
    user: process.env.DB_USER, //process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,

  };

  return (connection = mysql.createConnection(connectionInfo));
};

module.exports = connectToDatabase;
