const db = require("../config/db");


module.exports = {
	dashboard: async function (req, res) {
		try {
			const { email, name, eid, contact, salary, designation } = req.user;
			const [employees] = await db.promise().query("SELECT * FROM employees");
			const [orders] = await db.promise().query("SELECT * FROM orders");
			const [recentOrders] = await db.promise().query("Select * from orders where (select current_time()) -time_ordered < 020000 and date=(select current_date()) and time_delivered is NULL;");
			const [totalSalesToday] = await db.promise().query("select sum(ordered_dishes.quantity * dish.price) as todaySales from ordered_dishes,orders,dish where dish.dish_id = ordered_dishes.dish_id and orders.ord_id = ordered_dishes.ord_id and orders.date = (select curdate());");
			const [orderstoday] = await db.promise().query("select * from orders as orders_current  where date=current_date()");
			const [openOrder] = await db.promise().query("select * from orders as open_orders  where time_delivered is NULL");
			const [orderCost] = await db.promise().query("select ordered_dishes.ord_id,sum(ordered_dishes.quantity * dish.price) as ordercost from ordered_dishes,orders,dish where  dish.dish_id = ordered_dishes.dish_id and orders.ord_id = ordered_dishes.ord_id group by ord_id;");
			const [customers] = await db.promise().query("select cid, name from customer");
			const [pendingOrderDishes] = await db.promise().query("select ordered_dishes.ord_id, dish.name, quantity from dish, orders, ordered_dishes where ordered_dishes.dish_id = dish.dish_id and ordered_dishes.ord_id = orders.ord_id and ordered_dishes.ord_id in (Select ord_id from orders where (select current_time()) -time_ordered < 020000 and date=(select current_date()) and time_delivered is NULL);");

			console.log(pendingOrderDishes);
			const cObj = {};

			for (let i = 0; i < customers.length; i++) {
				cObj[customers[i].cid] = customers[i].name;
			}

			const dashboardDetails = recentOrders.map(recentOrder => {
				return {
					...recentOrder,
					customerName: cObj[recentOrder.cid_id]
				}
			})


			res.render("dashboard_1", { employees, orders, dashboardDetails, totalSalesToday, orderstoday, name, openOrder, orderCost, orderdishes: pendingOrderDishes, isAdmin: req.user.designation === 'Admin' });

			console.log(JSON.stringify(totalSalesToday));

		} catch (error) {
			console.log(error);
		}


	},

	customers: function (req, res) {
		try {
			const { email, name, eid, contact, salary, designation } = req.user;
			db.query("SELECT * FROM customer", (err, result) => {
				console.log(result);
				res.render("customers", { customers: result, name, isAdmin: req.user.designation === 'Admin' });
			});
		} catch (error) {
			console.log(error);
		}
	},

	profile: function (req, res) {
		try {
			console.log(req.user);
			const { email, name, eid, contact, salary, designation } = req.user;
			res.render("profile_new", { email, name, eid, contact, salary, designation });
		} catch (error) {
			console.log(error);
		}
	},

	orders: async function (req, res) {
		try {
			const [orders] = await db.promise().query("Select ord_id,customer.name,date, time_ordered, time_delivered from orders, customer where customer.cid = orders.cid_id order by date desc, time_ordered desc;");
			const [orderdishes] = await db.promise().query("select ordered_dishes.ord_id,dish.name,quantity from dish, orders, ordered_dishes where ordered_dishes.dish_id = dish.dish_id and ordered_dishes.ord_id = orders.ord_id order by time_ordered desc, date desc;");
			let [orderCost] = await db.promise().query("select ordered_dishes.ord_id,sum(ordered_dishes.quantity * dish.price) as cost from ordered_dishes,orders,dish where  dish.dish_id = ordered_dishes.dish_id and orders.ord_id = ordered_dishes.ord_id group by ordered_dishes.ord_id order by date desc, time_ordered desc;");
			console.log(orders);

			const { email, name, eid, contact, salary, designation } = req.user;

			orderCostObj = {};

			for (let i = 0; i < orderCost.length; i++) {
				orderCostObj[orderCost[i].ord_id] = orderCost[i].cost;
			}

			res.render("orders", { orders, orderdishes, name, orderCostObj, timeDelivered: true, addOrderBtn: true, fulfillOrders: false, isAdmin: req.user.designation === 'Admin' });

			// console.log(JSON.stringify(totalSalesToday));
		} catch (error) {
			console.log(error);
		}
	},
	openOrders: async function (req, res) {
		try {
			const { name } = req.user;
			const [orders] = await db.promise().query("Select ord_id,customer.name,date, time_ordered from orders, customer where customer.cid = orders.cid_id and time_delivered is null order by ord_id;");
			const [orderdishes] = await db.promise().query(`
				select ordered_dishes.ord_id, dish.name, quantity
				from dish, orders, ordered_dishes 
				where ordered_dishes.dish_id = dish.dish_id and ordered_dishes.ord_id = orders.ord_id and time_delivered is null
			`);
			let [orderCost] = await db.promise().query("select ordered_dishes.ord_id,sum(ordered_dishes.quantity * dish.price) as cost from ordered_dishes,orders,dish where  dish.dish_id = ordered_dishes.dish_id and orders.ord_id = ordered_dishes.ord_id and time_delivered is null group by ord_id;");

			orderCostObj = {};

			for (let i = 0; i < orderCost.length; i++) {
				orderCostObj[orderCost[i].ord_id] = orderCost[i].cost;
			}

			console.log(orders);
			res.render("orders", { orders, orderdishes, name, timeDelivered: false, addOrderBtn: false, fulfillOrders: true, isAdmin: req.user.designation === 'Admin' })

		} catch (error) {
			console.log(error);
		}
	},
	soldOrders: async function (req, res) {
		try {
			const { name } = req.user;
			const [orders] = await db.promise().query("Select ord_id,customer.name,date, time_ordered, time_delivered from orders, customer where customer.cid = orders.cid_id and time_delivered is not null order by ord_id;");
			const [orderdishes] = await db.promise().query(`
				select ordered_dishes.ord_id, dish.name, quantity
				from dish, orders, ordered_dishes 
				where ordered_dishes.dish_id = dish.dish_id and ordered_dishes.ord_id = orders.ord_id and time_delivered is not null
			`);
			let [orderCost] = await db.promise().query("select ordered_dishes.ord_id,sum(ordered_dishes.quantity * dish.price) as cost from ordered_dishes,orders,dish where  dish.dish_id = ordered_dishes.dish_id and orders.ord_id = ordered_dishes.ord_id and time_delivered is not null group by ord_id;");

			orderCostObj = {};

			for (let i = 0; i < orderCost.length; i++) {
				orderCostObj[orderCost[i].ord_id] = orderCost[i].cost;
			}

			console.log(orders);
			res.render("orders", { orders, orderdishes, name, timeDelivered: true, addOrderBtn: false, fulfillOrders: false, isAdmin: req.user.designation === 'Admin' })
		} catch (error) {
			console.log(error);
		}
	},
	staff_management: async function (req, res) {
		try {
			const { email, name, eid, contact, salary, designation } = req.user;

			const [result] = await db.promise().query("SELECT * FROM employees");
			res.render("staff_management", { staff: result, name, isAdmin: req.user.designation === 'Admin' });
		} catch (error) {
			console.log(error);
		}
	},
	newOrder: async function (req, res) {
		try {
			const { name } = req.user;
			const [customers] = await db.promise().query("SELECT * FROM customer");
			const [dishes] = await db.promise().query("SELECT * FROM dish");

			console.log(dishes, customers);

			res.render("newOrder", { dishes, customers, name, isAdmin: req.user.designation === 'Admin' });
		} catch (error) {
			console.log(error);
		}

	},

	reports: async function (req, res) {
		try {
			const { email, name, eid, contact, salary, designation } = req.user;
			// const [report] = await db.promise().query("select sum(ordered_dishes.quantity * dish.price) as todaySales, date as d from ordered_dishes,orders,dish where dish.dish_id = ordered_dishes.dish_id and orders.ord_id = ordered_dishes.ord_id and orders.date = (select curdate());");

			// console.log(report);
			const report = null;


			res.render("reports", { report, name, isAdmin: req.user.designation === 'Admin' });



		} catch (error) {
			console.log(error);
		}


	},
	today_orders: async function (req, res) {
		try {

			const [todayorders] = await db.promise().query("Select ord_id,customer.name,date, time_ordered, time_delivered from orders, customer where customer.cid = orders.cid_id and date=current_date() order by date desc, time_ordered desc;");
			const [orderCost] = await db.promise().query("select ordered_dishes.ord_id,sum(ordered_dishes.quantity * dish.price) as cost from ordered_dishes,orders,dish where  dish.dish_id = ordered_dishes.dish_id and orders.ord_id = ordered_dishes.ord_id and date=current_date() group by ordered_dishes.ord_id;");
			const [orderdishes] = await db.promise().query("select ordered_dishes.ord_id,dish.name,quantity from dish, orders, ordered_dishes where ordered_dishes.dish_id = dish.dish_id and ordered_dishes.ord_id = orders.ord_id and date = current_date() order by time_ordered desc, date desc;");

			const { email, name, eid, contact, salary, designation } = req.user;

			orderCostObj = {};

			for (let i = 0; i < orderCost.length; i++) {
				orderCostObj[orderCost[i].ord_id] = orderCost[i].cost;
			}


			res.render("today_orders", { todayorders, name, orderCostObj, orderdishes, timeDelivered: true, addOrderBtn: false, fulfillOrders: false, isAdmin: req.user.designation === 'Admin' });

			// console.log(JSON.stringify(totalSalesToday));
		} catch (error) {
			console.log(error);
		}
	},

	todaycomp_orders: async function (req, res) {
		try {

			const [todaycomp_orders] = await db.promise().query("Select ord_id,customer.name,date, time_ordered, time_delivered from orders, customer where customer.cid = orders.cid_id and date=current_date() and time_delivered is not null order by date desc, time_ordered desc;");
			const [orderCost] = await db.promise().query("select ordered_dishes.ord_id,sum(ordered_dishes.quantity * dish.price) as cost from ordered_dishes,orders,dish where  dish.dish_id = ordered_dishes.dish_id and orders.ord_id = ordered_dishes.ord_id and time_delivered is not null and date=current_date() group by ordered_dishes.ord_id;");
			const [orderdishes] = await db.promise().query("select ordered_dishes.ord_id,dish.name,quantity from dish, orders, ordered_dishes where ordered_dishes.dish_id = dish.dish_id and ordered_dishes.ord_id = orders.ord_id and date = current_date() and time_delivered is not null order by time_ordered desc, date desc;");

			const { email, name, eid, contact, salary, designation } = req.user;

			orderCostObj = {};
			orderDishObj = {};

			for (let i = 0; i < orderCost.length; i++) {
				orderCostObj[orderCost[i].ord_id] = orderCost[i].cost;
			}

			res.render("today_comp_orders", { todaycomp_orders, name, orderCostObj, orderdishes, timeDelivered: true, addOrderBtn: false, fulfillOrders: false, isAdmin: req.user.designation === 'Admin' });

			// console.log(JSON.stringify(totalSalesToday));
		} catch (error) {
			console.log(error);
		}
	}



};



