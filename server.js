const express = require("express");
const app = express();
const myConnection = require("express-myconnection");
const mysql = require("mysql");

app.use(
	myConnection(
		mysql,
		{
			host: "localhost",
			user: "root",
			password: "Sarvagya@2545",
			port: 3306,
			database: "restaurant",
		},
		"single"
	)
);
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	try {
		req.getConnection((err, conn) => {
			if (err) {
				console.log(err);
			}

			conn.query("SELECT * FROM employees", (err, employees) => {
				if (err) {
					// return res.send(err);
					console.log(err);
				}

				res.send(employees);
			});
		});
	} catch (error) {
		console.log(error);
	}
});

app.listen(3000, console.log("LISTENING"));
