const mysql = require("mysql");
// Coloca aquí tus credenciales
module.exports = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  port: 3355,
  database: "twitter_db"
});




