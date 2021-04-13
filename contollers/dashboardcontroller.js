const db = require("../config/db");

module.exports = {
	dashboard: function (req, res) {
		try {
			res.render("dashboard_1");
		} catch (error) {
			console.log(error);
		}
	},

	tables: function (req, res) {
		var status;
		var tables = [
			{
				tableID: "1",
				BookedBy: "Customer name1",
				Capacity: "8",
				Availability: "Available",
				Status: status,
			},
			{
				tableID: "2",
				BookedBy: "Customer name2",
				Capacity: "8",
				Availability: "Busy",
				Status: status,
			},
			{
				tableID: "3",
				BookedBy: "Customer name3",
				Capacity: "4",
				Availability: "Busy",
				Status: status,
			},
		];

		try {
			res.render("tables", { tables: tables });
		} catch (error) {
			console.log(error);
		}
	},

	customers: function (req, res) {
		var customers = [
			{ CustomerID: "1", CustomerName: "Brandon", CustomerContact: "91879232023", CustomerEmail: "abc@bits.com" },
			{ CustomerID: "2", CustomerName: "Mayer", CustomerContact: "32434224324", CustomerEmail: "abc@bits.com" },
			{ CustomerID: "3", CustomerName: "Jason", CustomerContact: "3243243233", CustomerEmail: "abc@bits.com" },
			{ CustomerID: "4", CustomerName: "Tom", CustomerContact: "6575676756", CustomerEmail: "abc@bits.com" },
		];

		try {
			res.render("customers", { customers: customers });
		} catch (error) {
			console.log(error);
		}
	},

	profile: function (req, res) {
		try {
			res.render("profile");
		} catch (error) {
			console.log(error);
		}
	},

	orders: function (req, res) {
		try {
			res.render("orders");
		} catch (error) {
			console.log(error);
		}
	},
	staff_management: function (req, res) {
		try {
			db.query("SELECT * FROM employees", (err, result) => {
				if (err) {
					res.render("staff_management", { error: err });
				}
				res.render("staff_management", { staff: result });
			});
		} catch (error) {
			console.log(error);
		}
	},
};
