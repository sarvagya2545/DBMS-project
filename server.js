const express = require("express");
const app = express();
const myConnection = require("express-myconnection");
const mysql = require("mysql");
const employeeRoutes = require("./routes/employee");
const dishRoutes = require("./routes/dishes");

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
app.set("view engine", "ejs");

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

				res.render("index");
			});
		});
	} catch (error) {
		console.log(error);
	}
});

app.use("/employees", employeeRoutes);
app.use("/dishes", dishRoutes);

app.listen(3000, console.log("LISTENING"));
