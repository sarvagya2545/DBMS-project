require("dotenv").config();
const express = require("express");
const app = express();
const employeeRoutes = require("./routes/employee");
const dishRoutes = require("./routes/dishes");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const db = require("./config/db");
const flash = require("connect-flash");

// passport config
require("./config/passport")(passport);

// MIDDLEWARES
// mysql connection
db.connect();

// body parser
app.use(express.urlencoded({ extended: true }));

// ejs and public files
app.set("view engine", "ejs");
app.use(express.static(path.resolve(__dirname, "public")));

// Express session
app.use(
	session({
		secret: process.env.SECRET,
		resave: true,
		saveUninitialized: true,
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	res.locals.error = req.flash("error");
	next();
});

// ROUTES
app.get("/", function (req, res) {
	var dishes = [
		{
			dishID: "0",
			dishName: "Pizza",
			price: "200",
			typeOfFood: "Fastfood",
			Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsh-vwIw4nZLQ5lUJf-hnz7uQiEykeKqMfeg&usqp=CAU",
		},
		{
			dishID: "1",
			dishName: "Noodles",
			price: "70",
			typeOfFood: "Fastfood",
			Image: "https://recipetineats.com/wp-content/uploads/2019/11/Lo-Mein_5.jpg",
		},
		{
			dishID: "2",
			dishName: "Samosa",
			price: "30",
			typeOfFood: "Fastfood",
			Image: "https:rakskitchen.net/wp-content/uploads/2015/12/samosa-recipe-500x375.jpg",
		},
		{
			dishID: "3",
			dishName: "Paneer Kofta",
			price: "150",
			typeOfFood: "Main Course",
			Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVl_HTICim5UbPVrGB3lw0Ayod39rLeFaBag&usqp=CAU",
		},
	];
	res.render("menu", { dishes: dishes });
});

app.use("/employees", employeeRoutes);
app.use("/dishes", dishRoutes);
app.use("/dashboard", (req, res) => {
	res.render("dashboard");
});

app.listen(3000, console.log("LISTENING"));
