const express = require("express");
const router = express.Router();

router.get("/get", function (req, res) {
	res.send("dishes");
});

module.exports = router;
