require("dotenv").config();
const express = require("express");
const app = express();
const myConnection = require("express-myconnection");
const mysql = require("mysql");
const employeeRoutes = require("./routes/employee");
const dishRoutes = require("./routes/dishes");
const dashboardRoutes = require("./routes/dashboard");
const path = require("path");


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
app.use(express.static(path.resolve(__dirname, "public")));
app.get('/', function (req, res) {
	var dishes=[
		{
			dishID:"0",dishName:"Pizza", price:"200", typeOfFood:"Fastfood", Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsh-vwIw4nZLQ5lUJf-hnz7uQiEykeKqMfeg&usqp=CAU"
		},
		{
			dishID:"1",dishName:"Noodles", price:"70", typeOfFood:"Fastfood", Image:"https://recipetineats.com/wp-content/uploads/2019/11/Lo-Mein_5.jpg"
		},
		{
			dishID:"2",dishName:"Samosa", price:"30", typeOfFood:"Fastfood", Image:"https:rakskitchen.net/wp-content/uploads/2015/12/samosa-recipe-500x375.jpg"
		},
		{
			dishID:"3",dishName:"Paneer Kofta", price:"150", typeOfFood:"Main Course", Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVl_HTICim5UbPVrGB3lw0Ayod39rLeFaBag&usqp=CAU"
		},
	]
	res.render("menu", {dishes:dishes});
})
// ROUTES

app.use("/employees", employeeRoutes);
app.use("/dishes", dishRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(3000, console.log("LISTENING"));
