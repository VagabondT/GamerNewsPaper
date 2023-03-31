var express = require('express');
var router = express.Router();
const overviewController = require('../controllers/OverviewController');
const accountController = require('../controllers/AccountController');
const userController = require('../controllers/UserController');

router.use(accountController.isLoggedIn);
router.get('/',overviewController.GetOverview);

router.get('/login',overviewController.RenderLoginPage)

router.get('/register',overviewController.RenderRegisterPage)

router.route('/updateUser')
    .get(accountController.protect,overviewController.RenderUserRegisterPage)
    .post(accountController.protect, accountController.isLoggedIn, userController.updateUser)


//Post
router.route('/create')
    .get(
        accountController.protect,
        accountController.isLoggedIn,
        accountController.allowRoles('editor'),
        overviewController.RenderCreatePostPage
    )
    .post(accountController.protect, 
        overviewController.CreatePostFromPage
    )

module.exports = router;
