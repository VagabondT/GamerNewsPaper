var express = require('express');
var router = express.Router();
const accountController = require('../controllers/AccountController')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("hello! This is gamer Thời BÁO")
});

router.get('/test',accountController.getAllAccounts)


module.exports = router;
