const express = require("express");
const router = express.Router();
const dashboardcontroller = require("../contollers/dashboardcontroller");


router.get("/", dashboardcontroller.dashboard);

router.get("/tables", dashboardcontroller.tables);
router.get("/customers", dashboardcontroller.customers);
router.get("/profile",dashboardcontroller.profile);
router.get("/orders",dashboardcontroller.orders);
router.get("/staff_management",dashboardcontroller.staff_management);


module.exports = router;
