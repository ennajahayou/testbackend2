const mysql = require("mysql2");
const env = require("dotenv").config();

const connectToDatabase = () => {
  const connectionInfo = {
    host: "localhost", //process.env.DB_HOST,
    user: "root", //process.env.DB_USER,
    password: "123456",
    database: "thankstip",
    port: 3306,
  };

  return (connection = mysql.createConnection(connectionInfo));
};

module.exports = connectToDatabase;
