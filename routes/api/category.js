var express = require('express');
var router = express.Router();

const categoryController = require('../../controllers/CategoryController');

router
    .route('/')
    .get(categoryController.getAllCategory)
    .post(categoryController.createCategory)

router
    .route('/:id')
    .get(categoryController.getCategory)
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteCategory)

module.exports = router;
