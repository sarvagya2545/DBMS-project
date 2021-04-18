const mysql = require("mysql2");
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: process.env.PASSWORD,
	database: "restaurant",
});

module.exports = db;

