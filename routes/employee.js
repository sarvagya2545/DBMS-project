const express = require("express");
const router = express.Router();
const EmployeeController = require("../contollers/employee");

router.get("/", EmployeeController.getEmployees);
router.get("/login", EmployeeController.login);

module.exports = router;
