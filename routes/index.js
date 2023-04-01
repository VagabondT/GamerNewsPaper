var express = require('express');
var router = express.Router();
const overviewController = require('../controllers/OverviewController');
const accountController = require('../controllers/AccountController');
const userController = require('../controllers/UserController');


router.get('/',accountController.isLoggedIn,overviewController.GetOverview);

router.get('/login',accountController.isLoggedIn,overviewController.RenderLoginPage)


router.get('/register',accountController.isLoggedIn,overviewController.RenderRegisterPage)

router.route('/updateUser')
    .get(accountController.protect,overviewController.RenderUserRegisterPage)
    .post(accountController.protect, userController.updateUser)


router.get('/posts',accountController.isLoggedIn,overviewController.RenderEditorPostsPage)

//Post
router.route('/create')
    .get(
        accountController.protect,
        accountController.allowRoles('editor'),
        overviewController.RenderCreatePostPage
    )
    .post(accountController.protect,
        overviewController.CreatePostFromPage
    )

router.route("/updatePost/:id")
    .get(
    accountController.protect,
    accountController.allowRoles('editor'),
    overviewController.RenderUpdatePostPage)
    .patch(accountController.protect,
        accountController.allowRoles('editor'),
        overviewController.UpdatePostPage)
    
module.exports = router;
