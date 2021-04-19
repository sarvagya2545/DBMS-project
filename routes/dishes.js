const express = require("express");
const router = express.Router();
const DishController = require('../contollers/dishController');
const { ensureAuthenticated } = require("../middleware/auth");

router.post('/add-order', ensureAuthenticated, DishController.addOrder);
router.get('/redirect', (req, res) => {
	res.redirect(307, '/dashboard');
})
router.post('/finish', ensureAuthenticated, DishController.completeOrder);
router.post('/remove', ensureAuthenticated, DishController.removeOrder);

module.exports = router;
