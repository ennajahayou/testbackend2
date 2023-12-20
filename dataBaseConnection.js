const mysql = require("mysql2");
const env = require("dotenv").config();
const connectionInfo = {
  host: 'database-testdeploy.censrelaamzf.eu-west-3.rds.amazonaws.com', //process.env.DB_HOST,
  user: "admin", //process.env.DB_USER,
  password:'Azert12345',
  database: 'database_testdeploy',
  port: 3307,
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

module.exports = connectToDatabase



