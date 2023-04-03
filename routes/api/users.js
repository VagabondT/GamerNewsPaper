var express = require('express');
var router = express.Router();

const userController = require('../../controllers/UserController');
const accountController = require('../../controllers/AccountController')

router
    .route('/')
    .get(accountController.protect, 
        accountController.allowRoles('admin'),
        userController.getAllUser)
    .post(userController.createUser)

router
    .route('/:id')
    .get(accountController.protect, userController.getUser)
    .patch(accountController.protect,userController.updateUser)
    .delete(accountController.protect, 
        accountController.allowRoles('admin'),
        userController.deleteUser)

module.exports = router;
