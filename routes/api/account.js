var express = require('express');
var router = express.Router();

const accountController = require('../../controllers/AccountController');

router
    .route('/')
    .get(accountController.getAllAccounts)
    .post(accountController.createAccount)

router
    .route('/:id')
    .get(accountController.getAccount)
    .patch(accountController.updateAccount)
    .delete(accountController.deleteAccount)

router.route('/login')
    .post(accountController.login)
module.exports = router;
