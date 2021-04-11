const mysql = require("mysql");
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: process.env.PASSWORD,
	database: "restaurant",
});

module.exports = db;
