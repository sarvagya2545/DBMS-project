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
	var dishimages = [
		{
			dishID: "0",
			dishDescription: "Pizza is a savory dish of Italian origin consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients, which is then baked at a high temperature, traditionally in a wood-fired oven. A small pizza is sometimes called a pizzetta.",
			price: "200",
			typeOfFood: "Italian",
			Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsh-vwIw4nZLQ5lUJf-hnz7uQiEykeKqMfeg&usqp=CAU",
		},
		{
			dishID: "1",
			dishDescription: "Noodles are a type of food made from unleavened dough which is rolled flat and cut, stretched or extruded, into long strips or strings. Noodles can be refrigerated for short-term storage or dried and stored for future use. Noodles are usually cooked in boiling water, sometimes with cooking oil or salt added.",
			price: "70",
			typeOfFood: "Chinese, FastFood",
			Image: "https://recipetineats.com/wp-content/uploads/2019/11/Lo-Mein_5.jpg",
		},
		{
			dishID: "2",
			dishDescription: "Flaky and tender fried samosa are one of the most popular recipes in North Indian cuisine. They feature a pastry-like crust but are filled with savory potatoes and peas for a hearty, delicious snack. This step-by-step guide will help you to make the flakiest, tastiest, absolutely best Punjabi samosa from scratch!",
			price: "30",
			typeOfFood: "Indian, Snack",
			Image: "https:rakskitchen.net/wp-content/uploads/2015/12/samosa-recipe-500x375.jpg",
		},
		{
			dishID: "3",
			dishDescription: "Handi paneer is a delicious and creamy gravy cooked in a handi. The gravy in this handi paneer recipe is made with a base of cashews, onions and tomatoes. I have also used some milk powder to add faint sweet notes in the gravy. You can also use cream instead of milk powder.",
			price: "150",
			typeOfFood: "Main Course",
			Image: "https://static.toiimg.com/thumb/54713904.cms?imgsize=248047&width=800&height=800",
		},
		{
			dishID: "4",
			dishDescription: "A salad is a dish consisting of mixed pieces of food, sometimes with at least one raw ingredient. It is often dressed, and is typically served at room temperature or chilled, though some can be served warm. Garden salads use a base of leafy greens such as lettuce, arugula/rocket, kale or spinach; they are common enough that the word salad alone often refers specifically to garden salads.",
			price: "150",
			typeOfFood: "Main Course",
			Image: "https://thumbor.thedailymeal.com/NYCPrj4KxEMfgFHjh8MaqF4WRZY=/870x565/filters:focal(600x400:601x401)/https://www.thedailymeal.com/sites/default/files/recipe/2020/5_spring_salad.jpg",
		},
		{
			dishID: "5",
			dishDescription: "Tandoori Naan is typical and a very popular leavened oven baked flatbread. ... In Turkic, Persian, Urdu, Hindi or Punjabi any flat bread is known as Naan. Tandoori Naan is a speciality wherein the flatbread is baked in a cylindrical clay oven.",
			price: "150",
			typeOfFood: "Main Course",
			Image: "http://sherepunjab.ge/wp-content/uploads/2020/08/Butter_Naan_2.jpg",
		},
		{
			dishID: "6",
			dishDescription: "Dish Name",
			price: "150",
			typeOfFood: "Main Course",
			Image: "",
		},
	];
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
