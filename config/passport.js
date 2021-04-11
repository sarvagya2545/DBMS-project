const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("./db");

module.exports = function (passport) {
	passport.use(
		new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
			// Match User
			db.query(`SELECT * FROM EMPLOYEES WHERE email = '${email}'`, (err, result) => {
				if (err) {
					console.log(err);
					return done(null, false, { message: err });
				}

				if (!result[0]) {
					return done(null, false, { message: "Email address not found" });
				}

				// Match password
				bcrypt.compare(password, result[0].password, function (err, isMatch) {
					if (err) throw err;

					if (isMatch) {
						return done(null, result[0]);
					} else {
						return done(null, false, { message: "Password Incorrect" });
					}
				});
			});
		})
	);
	passport.serializeUser((user, done) => {
		done(null, user.eid);
	});

	passport.deserializeUser((id, done) => {
		db.query(`SELECT * FROM EMPLOYEES WHERE eid=${id}`, (err, result) => {
			if (err) throw err;
			done(err, result[0]);
		});
	});
};
