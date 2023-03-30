var express = require('express');
var router = express.Router();
const overviewController = require('../controllers/OverviewController');
const accountController = require('../controllers/AccountController');
/* GET home page. */
router.use(accountController.isLoggedIn);
router.get('/',overviewController.GetOverview);
router.get('/login',overviewController.RenderLoginPage)

router.get('/register',overviewController.RenderRegisterPage)

router.get('/userregis',accountController.protect,overviewController.RenderUserRegisterPage)


//Post
router.route('/create')
    .get(accountController.protect,overviewController.RenderCreatePostPage)
    .post(accountController.protect,overviewController.CreatePostFromPage)

module.exports = router;
