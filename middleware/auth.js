module.exports = {
	ensureAuthenticated: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}

		req.flash("error_msg", "Please login to view this page/resource");
		res.redirect("/employees/login");
	},
	checkIfAdmin: function (req, res, next) {
		if (req.user.designation !== 'Admin') {
			return res.redirect('/dashboard');
		}
		next();
	}
};
