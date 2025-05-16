const express = require("express");
const router = express.Router();
const { getLatestStats ,getDeviation} = require('../controllers/');

router.get("/stats", getLatestStats);
router.get("/deviation", getDeviation);

module.exports = router;
