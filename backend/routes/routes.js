const express = require("express");
const controllers = require("../controllers/historyControllers")
var router = express.Router();

//router for POST request to post a search log to db and get gif url
router.post('/', controllers.getGifUrl)

//router for GET all logs
router.get('/logs', controllers.getAllLogs)

module.exports = router;