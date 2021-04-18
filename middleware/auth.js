module.exports = {
	ensureAuthenticated: function (req, res, next) {
		if (req.isAuthenticated() || 1) {
			return next();
		}

		req.flash("error_msg", "Please login to view this page/resource");
		res.redirect("/employees/login");
	},
};
