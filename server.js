require("dotenv").config();
const express = require("express");
const app = express();
const employeeRoutes = require("./routes/employee");
const dishRoutes = require("./routes/dishes");
const dashboardRoutes = require("./routes/dashboard");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const db = require("./config/db");
const flash = require("connect-flash");
const { ensureAuthenticated } = require("./middleware/auth");

// passport config
require("./config/passport")(passport);


// MIDDLEWARES
// mysql connection
db.connect();

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
	try {
		db.query("SELECT * FROM dish", (err, result) => {
			if (err) {
				throw err;
			}

			res.render("menu", { dish: result,dishimages });
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
	// res.render("menu", { dishes: dishes });
});

app.use("/employees", employeeRoutes);
app.use("/dishes", dishRoutes);


app.use("/dashboard", dashboardRoutes);
/*app.use("/dashboard", ensureAuthenticated, (req, res) => {
	res.render("dashboard");
});*/

app.listen(3000, console.log("LISTENING"));
