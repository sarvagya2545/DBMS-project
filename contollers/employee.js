const passport = require("passport");
const db = require("../config/db");
const bcrypt = require("bcryptjs");

module.exports = {
	loginPage: function (req, res) {
		res.render("login");
	},
	login: (req, res, next) =>
		passport.authenticate("local", {
			successRedirect: "/dashboard",
			failureRedirect: "/employees/login",
			failureFlash: true,
		})(req, res, next),
	logout: (req, res) => {
		req.session.destroy();
		res.redirect('/');
	},
	newEmployeePage: function (req, res, next) {
		res.render("newEmployee", { isAdmin: req.user.designation === 'Admin', name: req.user.name });
	},
	newEmployee: function (req, res) {
		// Pull data out of req.body
		const { name, email, password, password2, salary, contact, designation } = req.body;
		let errors = [];

		// Check required fields
		if (!name || !email || !password || !password2) {
			errors.push({ msg: "Please fill in all fields" });
		}

		// Check passwords match
		if (password !== password2) {
			errors.push({ msg: "Passwords do not match" });
		}

		// Check passwords length
		if (password.length < 6) {
			errors.push({ msg: "Passwords length must be at least 6 characters" });
		}

		if (errors.length > 0) {
			res.render("newEmployee", {
				errors,
				name,
				email,
				password,
				password2,
				salary,
				contact,
				designation,
				isAdmin: req.user.designation === 'Admin',
				name: req.user.name
			});
		} else {
			// Validation passed
			db.query(`SELECT * FROM employees WHERE email = ${email}`, (err, result) => {
				if (result) {
					errors.push({ msg: "User is already registered" });
					res.render("newEmployee", {
						errors,
						name,
						email,
						password,
						password2,
						salary,
						contact,
						designation,
						isAdmin: req.user.designation === 'Admin',
						name: req.user.name
					});
				} else {
					bcrypt.genSalt(10, function (err, salt) {
						bcrypt.hash(password, salt, function (err, hash) {
							if (err) throw err;

							console.log(name, salary, contact, hash, email);

							const sql = `INSERT INTO employees (name, salary, contact, password, email, designation)
								VALUES (
									'${name}', 
									'${salary}', 
									${parseInt(contact)}, '${hash}', '${email}', '${designation}')
							`;

							db.query(sql, (err, results) => {
								if (err) {
									console.log(err);
									errors.push({ msg: "Not saved, server error" });
									return res.render("newEmployee", { isAdmin: req.user.designation === 'Admin', name: req.user.name });
								}

								req.flash("success_msg", "Employee is created, he/she can login using credentials");
								res.render("newEmployee", { isAdmin: req.user.designation === 'Admin', name: req.user.name })
							});
						});
					});
				}
			});
		}
	},
};
