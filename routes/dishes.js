const express = require("express");
const router = express.Router();

router.get("/get", function (req, res) {
	res.send("dishes");
});

router.post('/add-order', function (req, res) {
	console.log('orders: ', req.body);
})

module.exports = router;
