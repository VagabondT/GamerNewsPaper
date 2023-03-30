var express = require('express');
var router = express.Router();
const postController = require('../../controllers/PostsController');
const accountController = require('../../controllers/AccountController')

router
    .route('/')
    .get(accountController.protect, accountController.allowRoles('administrator'), postController.getAllPosts)
    .post(postController.createPost)

router
    .route('/:id')
    .get(postController.getPost)
    .patch(postController.updatePost)
    .delete(
        accountController.protect, 
        accountController.allowRoles('administrator'),
        postController.deletePost
    )


module.exports = router;
