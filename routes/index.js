var express = require('express')
var router = express.Router()
const db = require('../db/queries')


/* GET home page. */
router.get('/getEvents', db.getEvents)

module.exports = router
