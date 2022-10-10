const express = require("express");
const controllers = require("../controllers/historyControllers")
var router = express.Router();
const requireAuth = require('../middleware/requireAuth')

// require auth for all workout routes
router.use(requireAuth)

//router for POST request to post a search log to db and get gif url
router.post('/', controllers.getGifUrl)

//router for GET all logs
router.get('/logs', controllers.getAllLogs)

module.exports = router;