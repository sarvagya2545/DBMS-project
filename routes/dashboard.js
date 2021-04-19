const express = require("express");
const router = express.Router();
const dashboardcontroller = require("../contollers/dashboardcontroller");
const { ensureAuthenticated } = require('../middleware/auth');

router.get("/", ensureAuthenticated, dashboardcontroller.dashboard);

/*router.get("/tables", dashboardcontroller.tables);*/
router.get("/customers", ensureAuthenticated, dashboardcontroller.customers);
router.get("/profile", ensureAuthenticated, dashboardcontroller.profile);
router.get("/orders", ensureAuthenticated, dashboardcontroller.orders);
router.get("/open-orders", ensureAuthenticated, dashboardcontroller.openOrders);
router.get("/sold-orders", ensureAuthenticated, dashboardcontroller.soldOrders);
router.get("/staff_management", ensureAuthenticated, dashboardcontroller.staff_management);
router.get("/reports", ensureAuthenticated, dashboardcontroller.reports);
router.get('/newOrder', ensureAuthenticated, dashboardcontroller.newOrder);
router.get('/today_orders', ensureAuthenticated, dashboardcontroller.today_orders );
router.get('/today_comp_orders', ensureAuthenticated, dashboardcontroller.todaycomp_orders );

module.exports = router;
