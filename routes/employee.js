const express = require("express");
const router = express.Router();
const EmployeeController = require("../contollers/employee");
const { ensureAuthenticated } = require('../middleware/auth');

router.get("/", EmployeeController.getEmployees);
router.get("/login", EmployeeController.loginPage);
router.post("/login", EmployeeController.login);
router.get("/new", EmployeeController.newEmployeePage);
router.post("/new", EmployeeController.newEmployee);
router.get('/logout', (req, res) => {
    console.log('Something');
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
