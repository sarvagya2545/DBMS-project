const db = require('../config/db');

module.exports = {
    addOrder: async (req, res) => {
        try {
            console.log('orders: ', req.body);
            console.log(req.user.eid);

            const { foodItems, isNewCustomer } = req.body;
            let order_id;
            if (!isNewCustomer) {
                const { customer: cid } = req.body;
                let query = `INSERT INTO orders (cid_id, eid, date, time_ordered, time_delivered) 
                    values (${parseInt(cid)},'${req.user.eid}', CURRENT_DATE(), CURRENT_TIME(), NULL);`;
                const [result] = await db.promise().query(query);
                order_id = result.insertId;

            } else {
                const { customer: { name, contact, email } } = req.body;
                let query = `INSERT INTO customer (name, contact, email) VALUES ('${name}', ${parseInt(contact)}, '${email}');`;
                const [cres] = await db.promise().query(query);
                customer_id = cres.insertId;

                let orderquery = `INSERT INTO orders (cid_id, eid, date, time_ordered, time_delivered) 
            values (${customer_id},'${req.user.eid}', CURRENT_DATE(), CURRENT_TIME(), NULL);`
                const [result] = await db.promise().query(orderquery);
                order_id = result.insertId;
            }

            for (let i = 0; i < foodItems.length; i++) {
                let newQuery =
                    `INSERT INTO ordered_dishes (dish_id, ord_id, quantity)
                    VALUES (${parseInt(foodItems[i].id)}, ${order_id}, ${foodItems[i].qty})
                `
                const [res2] = await db.promise().query(newQuery);
                console.log(res2);
            }

            res.send('Order added');
        } catch (error) {
            res.send(error);
        }
    },
    completeOrder: async (req, res) => {
        try {
            console.log(req.body);
            const { ord_id } = req.body;

            let query = `UPDATE orders SET time_delivered = CURRENT_TIME() WHERE ord_id = ${ord_id}`;
            const [result] = await db.promise().query(query);
            res.status(204).send('Updated');

        } catch (error) {
            res.status(500).send(error);
        }
    },
    removeOrder: async (req, res) => {
        try {
            console.log(req.body);
            const { ord_id } = req.body;

            let query1 = `DELETE FROM ordered_dishes WHERE ord_id = ${ord_id}`;
            const [result1] = await db.promise().query(query1);

            let query = `DELETE FROM orders WHERE ord_id=${ord_id}`;
            const [result] = await db.promise().query(query);
            res.status(204).send('Deleted');

        } catch (error) {
            res.status(500).send(error);
            console.log(error);
        }
    }
}