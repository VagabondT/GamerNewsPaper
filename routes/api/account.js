var express = require('express');
var router = express.Router();

const accountController = require('../../controllers/AccountController');

const userController = require('../../controllers/UserController');

router
    .route('/')
    .get(accountController.getAllAccounts)


router
    .route('/:id')
    .get(accountController.getAccount)


router
    .route('/login')
    .post(accountController.Login)

router.post('/signup',accountController.Signup)

router.post('/forgotPassword', accountController.forgotPassword);
router.patch('/resetPassword/:token', accountController.resetPassword);
router.route('/changePassword').patch(accountController.protect,accountController.updatePassword)


module.exports = router;
