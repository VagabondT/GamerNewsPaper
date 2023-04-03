var express = require('express');
var router = express.Router();

const categoryController = require('../../controllers/CategoryController');
const accountController = require('../../controllers/AccountController');

router
    .route('/')
    .get(categoryController.getAllCategory)
    .post(accountController.protect,accountController.allowRoles('admin') ,categoryController.createCategory)

router
    .route('/:id')
    .get(categoryController.getCategory)
    .patch(accountController.protect,accountController.allowRoles('admin'),categoryController.updateCategory)
    .delete(accountController.protect,accountController.allowRoles('admin'),categoryController.deleteCategory)

module.exports = router;
