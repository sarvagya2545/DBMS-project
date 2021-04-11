const express = require("express");
const router = express.Router();
const dashboardcontroller = require("../contollers/dashboardcontroller");

router.get("/", dashboardcontroller.dashboard);
router.get("/table", dashboardcontroller.tables);

module.exports = router;
