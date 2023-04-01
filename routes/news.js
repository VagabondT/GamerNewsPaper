var express = require('express');
var router = express.Router();
const overviewController = require('../controllers/OverviewController')
const accountController = require('../controllers/AccountController')
/* GET home page. */
router.get('/',accountController.isLoggedIn,overviewController.GetNewsOverview);
router.get('/:id',accountController.isLoggedIn,overviewController.RenderNewsview);


module.exports = router;
