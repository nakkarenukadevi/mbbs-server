const express = require("express");
const router = express.Router();
const { getFilteredStudents } = require("../controllers/students");

router.post("/", getFilteredStudents);

module.exports = router;
