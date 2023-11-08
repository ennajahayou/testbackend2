const mysql = require("mysql2");
const env = require("dotenv").config();

const connectToDatabase = () => {
  const connectionInfo = {
    host: "thankstip-database.censrelaamzf.eu-west-3.rds.amazonaws.com", //process.env.DB_HOST,
    user: "admin", //process.env.DB_USER,
    password: "Thanksandtip2023!",
    database: "thankstip",
    port: 3306,
  };

  return (connection = mysql.createConnection(connectionInfo));
};

module.exports = connectToDatabase;
