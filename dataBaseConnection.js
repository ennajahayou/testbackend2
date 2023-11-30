const mysql = require("mysql2");
const env = require("dotenv").config();

const connectToDatabase = () => {
  const connectionInfo = {
    host: 'databaseayoub.censrelaamzf.eu-west-3.rds.amazonaws.com', //process.env.DB_HOST,
    user: "admin", //process.env.DB_USER,
    password:'Azert12345',
    database: 'backendbase',
    port: 3307
  };

  return (connection = mysql.createConnection(connectionInfo));
};

module.exports = connectToDatabase;
