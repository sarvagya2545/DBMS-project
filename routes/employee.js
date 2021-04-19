const express = require("express");
const router = express.Router();
const EmployeeController = require("../contollers/employee");
const { ensureAuthenticated, checkIfAdmin } = require('../middleware/auth');

router.get("/login", EmployeeController.loginPage);
router.post("/login", EmployeeController.login);
router.get("/new", ensureAuthenticated, checkIfAdmin, EmployeeController.newEmployeePage);
router.post("/new", ensureAuthenticated, checkIfAdmin, EmployeeController.newEmployee);
router.get('/logout', EmployeeController.logout);

module.exports = router;
