const express = require("express");
const router = express.Router();
const DishController = require('../contollers/dishController');
const { ensureAuthenticated } = require("../middleware/auth");

router.get("/get", function (req, res) {
	res.send("dishes");
});

router.post('/add-order', ensureAuthenticated, DishController.addOrder);
router.get('/redirect', (req, res) => {
	res.redirect(307, '/dashboard');
})

module.exports = router;
