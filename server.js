require("dotenv").config();
const express = require("express");
const app = express();
const myConnection = require("express-myconnection");
const mysql = require("mysql");
const employeeRoutes = require("./routes/employee");
const dishRoutes = require("./routes/dishes");

// MIDDLEWARES
app.use(
	myConnection(
		mysql,
		{
			host: "localhost",
			user: "root",
			password: process.env.PASSWORD,
			port: 3306,
			database: "restaurant",
		},
		"single"
	)
);
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// ROUTES
app.use("/employees", employeeRoutes);
app.use("/dishes", dishRoutes);

app.listen(3000, console.log("LISTENING"));
