const express = require("express");
const router = express.Router();
const dashboardcontroller = require("../contollers/dashboardcontroller");
const { ensureAuthenticated } = require('../middleware/auth');

router.get("/", ensureAuthenticated, dashboardcontroller.dashboard);

/*router.get("/tables", dashboardcontroller.tables);*/
router.get("/customers", ensureAuthenticated, dashboardcontroller.customers);
router.get("/profile", ensureAuthenticated, dashboardcontroller.profile);
router.get("/orders", ensureAuthenticated, dashboardcontroller.orders);
router.get("/staff_management", ensureAuthenticated, dashboardcontroller.staff_management);
router.get("/reports", ensureAuthenticated, dashboardcontroller.reports);
router.get('/newOrder', ensureAuthenticated, dashboardcontroller.newOrder);

module.exports = router;
