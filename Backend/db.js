const mysql = require("mysql");
require("dotenv").config();
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOSTNAME || "localhost",
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME || "root",
  password: process.env.DATABASE_PASSWORD || "",
});

module.exports = connection;
