const db = require("../config/db");


module.exports = {
	dashboard: async function (req, res) {
		try {
			
			const [employees] = await db.promise().query("SELECT * FROM employees");
			const [orders] = await db.promise().query("SELECT * FROM orders");
			const [orderstoday] = await db.promise().query("select * from orders where date = (select curdate());");
			const [totalSales] = await db.promise().query("select sum(ordered_dishes.quantity * dish.price) as todaySales from ordered_dishes,orders,dish where dish.dish_id = ordered_dishes.dish_id and orders.ord_id = ordered_dishes.ord_id and orders.date = (select curdate());");
			const [currentorders] = await db.promise().query(" select * as orders_current from orders where time_delivered is NULL");
			console.log(totalSales);
			
			
             res.render("dashboard_1", { employees, orders, orderstoday, totalSales ,currentorders});

			 console.log(JSON.stringify(totalSales));
			
		} catch (error) {
			console.log(error);
		}
		

	},

	/*	tables: function (req, res) {
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
	},*/

	customers: function (req, res) {
		try {
			db.query("SELECT * FROM customer", (err, result) => {
				console.log(result);
				res.render("customers", { customers: result });
			});
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
			db.query("Select ord_id, name,date, time_ordered, time_delivered from orders, customer where customer.cid = orders.cid_id;", (err, result) => {
				if (err) {
					res.render("orders", { error: err });
				}
				res.render("orders", { orders: result });
			});
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
	newOrder: async function (req, res) {
		try {

			const [customers] = await db.promise().query("SELECT * FROM customer");
			const [dishes] = await db.promise().query("SELECT * FROM dish");

			console.log(dishes, customers);

			res.render("newOrder", { dishes, customers });
		} catch (error) {
			console.log(error);
		}

	},

	reports: async function (req, res) {
		try {
			
			const [report] = await db.promise().query("select sum(ordered_dishes.quantity * dish.price) as todaySales, date as d from ordered_dishes,orders,dish where dish.dish_id = ordered_dishes.dish_id and orders.ord_id = ordered_dishes.ord_id and orders.date = (select curdate());");
			
			console.log(report);
			
			
             res.render("reports", {report});

			 
			
		} catch (error) {
			console.log(error);
		}
		

	}


	
};
			
		
	
