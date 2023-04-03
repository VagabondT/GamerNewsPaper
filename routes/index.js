var express = require('express');
var router = express.Router();
const overviewController = require('../controllers/OverviewController');
const accountController = require('../controllers/AccountController');
const userController = require('../controllers/UserController');
const postController = require('../controllers/PostsController')

router.get('/',accountController.isLoggedIn,overviewController.GetOverview);

router.get('/login',accountController.isLoggedIn,overviewController.RenderLoginPage)

router.get('/register',accountController.isLoggedIn,overviewController.RenderRegisterPage)

router.route('/updateUser')
    .get(accountController.protect,overviewController.RenderUserRegisterPage)
    .post(accountController.protect, userController.updateUser)


//ControlArea
router.get('/posts',accountController.protect,accountController.allowRoles('editor','admin', 'moderator'),overviewController.RenderEditorPostsPage)
// router.get('/postsApproval',accountController.protect,accountController.allowRoles('admin'),overviewController.RenderEditorPostsPage)
router.get('/accountControl',accountController.protect,accountController.allowRoles('admin'),overviewController.RenderControlAccountPage)

router.get('/preview/:id',accountController.protect,accountController.allowRoles('editor','admin', 'moderator'),overviewController.renderPreviewPage)


//Post
router.route('/create')
    .get(
        accountController.protect,
        accountController.allowRoles('editor',"admin"),
        overviewController.RenderCreatePostPage
    )
    .post(accountController.protect,
        overviewController.CreatePostFromPage
    )

router.route("/updatePost/:id")
    .get(
    accountController.protect,
    accountController.allowRoles('editor','admin'),
    overviewController.RenderUpdatePostPage)
    .patch(accountController.protect,
        accountController.allowRoles('editor', 'admin'),
        overviewController.UpdatePostPage)

router.route('/postControl')
    .get(accountController.protect, accountController.allowRoles('admin','editor','moderator'), postController.GETEditorPostsData)
   

module.exports = router;
