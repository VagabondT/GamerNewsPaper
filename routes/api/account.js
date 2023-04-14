var express = require('express');
var router = express.Router();

const accountController = require('../../controllers/AccountController');

const userController = require('../../controllers/UserController');

router
    .route('/')
    .get(accountController.protect, accountController.allowRoles('admin') , accountController.getAllAccounts)
    

router.route('/:id')
    .patch(accountController.protect, accountController.allowRoles('admin'), accountController.updateAccount)
    .delete(accountController.protect, accountController.allowRoles('admin'),accountController.deleteAccount)

router
    .route('/login')
    .post(accountController.Login)
    
router.get('/logout', accountController.Logout);

router.post('/signup',accountController.Signup)


router.post('/changePassword',accountController.protect,accountController.updatePassword)

router
    .route("/forgotPassword")
    .post(accountController.forgotPassword)
    .get(accountController.renderForgotPasswordPage)
router
    .route('/resetPassword/:token')
    .patch(accountController.resetPassword)
    .get(accountController.renderPasswordResetPage)




module.exports = router;
