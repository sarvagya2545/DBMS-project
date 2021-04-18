const db = require('../config/db');

module.exports = {
    addOrder: async (req, res) => {
        console.log('orders: ', req.body);
        console.log(req.user.eid);

        const { foodItems, customer: cid } = req.body;
        /**
         *  Cid,
         *  OrderId,
         *  Eid,
         *  Date,
         *  Time ordered,
         *  Time delivered
         */

        let query = `INSERT INTO orders (cid_id, eid, date, time_ordered, time_delivered) 
                values (${parseInt(cid)},'${req.user.eid}', CURRENT_DATE(), CURRENT_TIME(), NULL);`;

        const [result] = await db.promise().query(query);

        const order_id = result.insertId;

        for (let i = 0; i < foodItems.length; i++) {
            let newQuery =
                `INSERT INTO ordered_dishes (dish_id, ord_id, quantity)
                    VALUES (${parseInt(foodItems[i].id)}, ${order_id}, ${foodItems[i].qty})
                `
            const [res2] = await db.promise().query(newQuery);
            console.log(res2);
        }

        res.send(result);
    }
}