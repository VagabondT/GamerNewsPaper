var express = require('express');
var router = express.Router();
const postController = require('../../controllers/PostsController');

router
    .route('/')
    .get(postController.getAllPosts)
    .post(postController.createPost)

router
    .route('/:id')
    .get(postController.getPost)
    .patch(postController.updatePost)
    .delete(postController.deletePost)


module.exports = router;
