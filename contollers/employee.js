module.exports = {
	getEmployees: function (req, res) {
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

					res.render("index", { employees: employees });
				});
			});
		} catch (error) {
			console.log(error);
		}
	},
	login: function (req, res) {
		res.send("login");
	},
};
