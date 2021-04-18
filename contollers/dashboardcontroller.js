const db = require("../config/db");


module.exports = {
	dashboard: async function (req, res) {
		try {

			const [employees] = await db.promise().query("SELECT * FROM employees");
			const [orders] = await db.promise().query("SELECT * FROM orders");
			const [orderstoday] = await db.promise().query("select * from orders where date = (select curdate());");
			const [totalSales] = await db.promise().query("select sum(ordered_dishes.quantity * dish.price) as todaySales from ordered_dishes,orders,dish where dish.dish_id = ordered_dishes.dish_id and orders.ord_id = ordered_dishes.ord_id and orders.date = (select curdate());");
			const [currentorders] = await db.promise().query("select * from orders as orders_current  where time_delivered is NULL");
			console.log(totalSales);


			res.render("dashboard_1", { employees, orders, orderstoday, totalSales, currentorders });

			console.log(JSON.stringify(totalSales));

		} catch (error) {
			console.log(error);
		}


	},

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
			console.log(req.user);
			const { email, name, eid, contact, salary, designation } = req.user;
			// db.query("SELECT * FROM employees", (err, result) => {
			// 	// console.log(result);
			// });
			res.render("profile_new", { email, name, eid, contact, salary, designation });
		} catch (error) {
			console.log(error);
		}
	},

	orders: async function (req, res) {
		try {
            const [orders] = await db.promise().query("Select ord_id,customer.name,date, time_ordered, time_delivered from orders, customer where customer.cid = orders.cid_id;");
			const [orderdishes] = await db.promise().query("select ordered_dishes.ord_id,dish.name,quantity from dish, orders, ordered_dishes where ordered_dishes.dish_id = dish.dish_id and ordered_dishes.ord_id = orders.ord_id;");
			
			console.log(orders);


			res.render("orders", { orders, orderdishes});

			// console.log(JSON.stringify(totalSales));
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

			// const [report] = await db.promise().query("select sum(ordered_dishes.quantity * dish.price) as todaySales, date as d from ordered_dishes,orders,dish where dish.dish_id = ordered_dishes.dish_id and orders.ord_id = ordered_dishes.ord_id and orders.date = (select curdate());");

			// console.log(report);
			const report = null;


			res.render("reports", { report });



		} catch (error) {
			console.log(error);
		}


	}



};



