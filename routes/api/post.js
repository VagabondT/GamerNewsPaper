var express = require('express');
var router = express.Router();
const postController = require('../../controllers/PostsController');
const accountController = require('../../controllers/AccountController')


router
    .route('/')
    .get(accountController.protect,postController.getAllPosts)
    .post(accountController.protect, postController.uploadPhoto,postController.resizePhoto,postController.CreatePostFromPage)

router
    .route('/:id')
    .get(postController.getPost)
    .patch(accountController.protect, postController.uploadPhoto,postController.resizePhoto,postController.updatePost)
    .delete(
        accountController.protect, 
        accountController.allowRoles('administrator','editor'),
        postController.deletePost
)



module.exports = router;
