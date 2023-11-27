const mysql = require("mysql2");
const env = require("dotenv").config();

const connectToDatabase = () => {
  const connectionInfo = {
    host: process.env.DB_HOST, //,
    user: process.env.DB_USER, //process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT

  };

  return (connection = mysql.createConnection(connectionInfo));
};

module.exports = connectToDatabase;
