const express = require("express");
const router = express.Router();
const EmployeeController = require("../contollers/employee");

router.get("/login", EmployeeController.loginPage);
router.post("/login", EmployeeController.login);
router.get("/new", EmployeeController.newEmployeePage);
router.post("/new", EmployeeController.newEmployee);
router.get('/logout', EmployeeController.logout);

module.exports = router;
