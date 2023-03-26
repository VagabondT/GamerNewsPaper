const Account = require('../models/account');
const handler = require('./handler');


exports.createAccount = handler.createOne(Account);
exports.updateAccount = handler.updateOne(Account);
exports.deleteAccount = handler.deleteOne(Account);

exports.getAllAccounts = handler.getAll(Account);
exports.getAccount = handler.getOne(Account)
