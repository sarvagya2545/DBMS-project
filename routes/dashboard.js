const express = require("express");
const router = express.Router();
const dashboardcontroller = require("../contollers/dashboardcontroller");


router.get("/", dashboardcontroller.dashboard);

router.get("/tables", dashboardcontroller.tables);
router.get("/customers", dashboardcontroller.customers);
router.get("/menu", dashboardcontroller.menu);
router.get("/profile",dashboardcontroller.profile);
router.get("/orders",dashboardcontroller.orders);
router.get("/staffmanagement",dashboardcontroller.staffmanagement);


module.exports = router;
