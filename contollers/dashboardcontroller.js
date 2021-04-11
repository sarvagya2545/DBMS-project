module.exports = {
	dashboard: function (req, res) {
		try {
			// db.query(sql, function (req, res) {

			// })

			res.render("dashboard_1");
		} catch (error) {
			console.log(error);
		}
	},

	tables: function (req, res) {
		var tables = [
			{
				tableID: "1",
				BookedBy: "Customer name1",
				Capacity: "4",
				Availability: "Available",
				Status: "Functional",
			},
			{
				tableID: "2",
				BookedBy: "Customer name2",
				Capacity: "8",
				Availability: "Busy",
				Status: "Functional",
			},
			{
				tableID: "3",
				BookedBy: "Customer name3",
				Capacity: "4",
				Availability: "Busy",
				Status: "Non-Functional",
			},
		];
		try {
			res.render("tables", { tables: tables });
		} catch (error) {
			console.log(error);
		}
	},
};