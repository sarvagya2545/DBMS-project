const express = require("express");
const router = express.Router();
const EmployeeController = require("../contollers/employee");

router.get("/", EmployeeController.getEmployees);
router.get("/login", EmployeeController.loginPage);
router.post("/login", EmployeeController.login);
router.get("/new", EmployeeController.newEmployeePage);
router.post("/new", EmployeeController.newEmployee);

module.exports = router;
