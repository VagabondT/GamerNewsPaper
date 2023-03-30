var express = require('express');
var router = express.Router();
const overviewController = require('../controllers/OverviewController');
const accountController = require('../controllers/AccountController');
/* GET home page. */
router.use(accountController.isLoggedIn);
router.get('/',overviewController.GetOverview);
router.get('/login',overviewController.RenderLoginPage)

router.get('/register',overviewController.RenderRegisterPage)


module.exports = router;
