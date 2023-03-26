var express = require('express');
var router = express.Router();

const accountController = require('../../controllers/AccountController');

router.get('/', accountController.getAllAccounts);


module.exports = router;
