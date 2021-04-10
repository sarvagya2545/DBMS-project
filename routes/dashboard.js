const express = require("express");
const router = express.Router();
const dashboardcontroller = require("../contollers/dashboardcontroller");

router.get("/", dashboardcontroller.dashboard);
router.get("/tables", dashboardcontroller.tables);


module.exports = router;
	