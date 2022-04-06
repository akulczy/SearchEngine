const express = require("express");
const router = express.Router();

const searchViews = require("../controllers/search");

// GET - Main page
router.get("/", searchViews.getMainPage);

module.exports = router;
