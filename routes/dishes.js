const express = require("express");
const router = express.Router();
const DishController = require('../contollers/dishController');

router.get("/get", function (req, res) {
	res.send("dishes");
});

router.post('/add-order', DishController.addOrder)

module.exports = router;
